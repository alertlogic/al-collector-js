/* -----------------------------------------------------------------------------
 * @copyright (C) 2018, Alert Logic, Inc
 * @doc
 *
 * Helper utilities for  Alert Logic log collector.
 * NOTE: parameters to all functions are passed as (object, callback)
 *
 * @end
 * -----------------------------------------------------------------------------
 */
const crypto = require('crypto');
const async = require('async');
const zlib = require('zlib');

const alLogFilter = require('./al_log_filter');
const alcHealthPb = require('./proto/alc_health.piqi_pb').alc_health;
const commonProtoPb = require('./proto/common_proto.piqi_pb').common_proto;
const dictPb = require('./proto/dict.piqi_pb').alc_dict;
const hostMetadataPb = require('./proto/host_metadata.piqi_pb').host_metadata;

const PAYLOAD_BATCH_SIZE = 10000000;

/**
 *  @function builds incoming log messages into protobuf and compresses it. The payload returned is 
 *  ready to be passed to Ingest client for transport.
 *  
 *  @param hostId - host uuid obtained at collector registration
 *  @param sourceId - source/collector id obtained at collector registration
 *  @param hostmetaElems - a list of hostmeta JSON objects. For example,
 *  var hostTypeElem = {
 *      key: 'host_type',
 *      value: {str: 'azure_fun'}
 *  };
 *  var localHostnameElem = {
 *      key: 'local_hostname',
 *      value: {str: process.env.WEBSITE_HOSTNAME}
 *  };
 *  var hostmetaElems = [hostTypeElem, localHostnameElem];
 *  Consult 'metadata' definition in ./proto/host_metadata.piqi.proto
 *  @param content  - a list of log messages to be ingested. Content should be batched on the caller level.
 *  @param parseCallback(message) - a function to parse a log message into a JSON object which is converted into protobuf.
 *  The parse callback is expected to construct the following object out of each log message:
 *  var parsedMessage = {
 *      messageTs: 1542138053,
 *      priority: 11,
 *      progName: 'o365webhook',
 *      pid: undefined,
 *      message: 'some message string',
 *      messageType: 'json/azure.o365',
 *      messageTypeId: 'AzureActiveDirectory',
 *      messageTsUs: undefined,
 *      applicationId: 'o365'
 *  };
 *  Consult 'collected_message' definition in proto/common_proto.piqi.proto
 *  @param filterJson - JSON parsed object representing key-value pairs which 
 *  should exist in a message. For example, {type: 'Security', category: 'Admin'}.
 *  NOTE: do NOT use json filter if 'content' is an array of strings.
 *  @param filterRegexp - regexp object filter. If content messages are JSON object
 *  then regexp filter if applied to a stringified message value.
 *  @param callback
 *  
 *  @return callback - (error, builtPayload, payloadSize)
 *  @NOTE: Batch size should be tweaked on a caller level in order to avoid "Maximum payload size exceeded" errors.
 *  For an Azure function consult eventHub.maxBatchSize property in host.json.
 *  For an AWS Lambda via kinesis trigger batch size configuration.
 */

var buildPayload = function ({hostId, sourceId, hostmetaElems, content, parseCallback, filterJson, filterRegexp}, mainCallback) {
    async.waterfall([
        function(callback) {
            const params = {
                content: content,
                parseContentFun: parseCallback,
                filterJson: filterJson,
                filterRegexp: filterRegexp
            };
            buildMessages(params, function(err, msg) {
                return callback(err, msg);
            });
        },
        function(msg, callback) {
            const params = {
                hostId: hostId,
                hostmetaElems: hostmetaElems
            };
            buildHostmeta(params, function(err, meta) {
                return callback(err, meta, msg);
            });
        },
        function(meta, msg, callback) {
            const params = {
                sId: sourceId,
                metadata: meta,
                messages:msg
            };
            buildBatch(params, function(err, batch) {
                return callback(err, batch, msg);
            });
        },
        function(batchBuf, msg, callback) {
            const params = {
                batches: batchBuf
            };
            buildBatchList(params, function(err, batchList) {
                return callback(err, batchList, msg);
            });
        },
        function(batchList, msg, callback) {
            let batchListType = commonProtoPb.collected_batch_list;
            let buf = batchListType.encode(batchList).finish();
            return callback(null, buf, msg);
        }],
        function (err, result, msg) {
            if (err) {
                return mainCallback(err);
            } else {
                // calculate the actual collected messages byte size
                let collectedMessageBytes = 0;
                msg.map(eachMessage => {
                    collectedMessageBytes += eachMessage.messageLength;
                });
                zlib.deflate(result, function(defalteErr, compressed) {
                    if (defalteErr) {
                        return mainCallback(defalteErr);
                    } else {
                        let payloadSize = compressed.byteLength;
                        if (payloadSize > PAYLOAD_BATCH_SIZE) {
                            return mainCallback(`Maximum payload size exceeded: ${payloadSize}`, compressed);
                        } else {
                            return mainCallback(null, { payload: compressed, payload_size: payloadSize, raw_count: msg.length, raw_bytes: collectedMessageBytes });
                        }
                    }
                });
            }
        });
};

/**
 * 
 * Private functions
 * 
 */

function buildType({type, payload}, callback) {
    let verify = type.verify(payload);
    if (verify)
        return callback(verify);

    return callback(null, type.create(payload));
}

/**
 *  @function build hostmeta protobuf out of a list of {key, value} metadata pairs.
 *  
 *  @param hostId - a host uuid obtain at collector registration.
 *  @param hostmetaElems - a list of metadata JSON objects. For example,
 *  var hostTypeElem = {
 *      key: 'host_type',
 *      value: {str: 'azure_fun'}
 *  };
 *  var localHostnameElem = {
 *      key: 'local_hostname',
 *      value: {str: process.env.WEBSITE_HOSTNAME}
 *  };
 *  var hostmetaElems = [hostTypeElem, localHostnameElem];
 *  
 *  @param callback
 *  @returns callback
 */

function buildHostmeta({hostId, hostmetaElems}, callback) {
    let hostmetaType = hostMetadataPb.metadata;
    let hostmeta = {
        elem : hostmetaElems
    };
    const paramsDict = {
        type: dictPb.dict,
        payload: hostmeta
    };
    
    buildType(paramsDict, function(err, hostmetaData){
        if (err) {
            return callback(err);
        } else {
            let meta = {
                hostUuid : hostId,
                data : hostmetaData,
                dataChecksum : Buffer.from('')
            };
            let sha = crypto.createHash('sha1');
            let hashPayload = hostmetaType.encode(meta).finish();
            let hashValue = sha.update(hashPayload).digest();
            
            let metadataPayload = {
                hostUuid : hostId,
                dataChecksum : hashValue,
                timestamp : Math.floor(Date.now() / 1000),
                data : hostmetaData
            };
    
            const paramsHostmeta = {
                type: hostmetaType,
                payload: metadataPayload
            };
            return buildType(paramsHostmeta, callback);
        }
    });
}

/** 
 * @function builds protobuf out of JSON definition of a log message
 * @param content - raw log messages retrieved from a source.
 * @param parseContentFun - function to parse a single message into a json structure. For example,
 * var parsedMessage = {
 *      messageTs: 1542138053,
 *      priority: 11,
 *      progName: 'o365webhook',
 *      pid: undefined,
 *      message: 'some message string',
 *      messageType: 'json/azure.o365',
 *      messageTypeId: 'AzureActiveDirectory',
 *      messageTsUs: undefined,
 *      applicationId: 'o365'
 *  };
 *  Consult 'collected_message' definition in proto/common_proto.piqi.proto
 * @param filterJson - JSON parsed object representing key-value pairs which 
 * should exist in a message. For example, {type: 'Security', category: 'Admin'}.
 * @param filterRegexp - regexp object filter. If content messages are JSON object
 * then regexp filter if applied to a stringified message value.
 * @param callback
 * @returns
 */

function buildMessages({content, parseContentFun, filterJson, filterRegexp}, callback) {
    const jsonFilteredContent = alLogFilter.filterJson(content, filterJson);
    const reFilter = alLogFilter.initRegExpFilter(filterRegexp);
    
    async.reduce(jsonFilteredContent, [], function(memo, item, asyncCallback) {
        let messageType = commonProtoPb.collected_message;
        let messagePayload = parseContentFun(item);
        if (messagePayload && messagePayload.message) {
            // Apply RegExp filter
            const passFilter = reFilter ? reFilter.test(messagePayload.message) : true;
            if (passFilter) {
                const paramsMessage = {
                    type: messageType,
                    payload: messagePayload
                };
                buildType(paramsMessage, function(err, buf) {
                    if (err) {
                        return asyncCallback(err);
                    } else {
                        buf.messageLength = buf.message.length;
                        memo.push(buf);
                        return asyncCallback(err, memo);
                    }
                });
            } else {
                return asyncCallback(null, memo);
            }
        } else {
            return asyncCallback(null, memo);
        }
    },
    callback);
}

function buildBatch({sId, metadata, messages}, callback) {
    const batchPayload = {
        sourceId: sId,
        metadata: metadata,
        message: messages
    };

    const params = {
        type: commonProtoPb.collected_batch,
        payload: batchPayload
    };
    buildType(params, callback);
}

function buildBatchList({batches}, callback) {
    const batchListPayload = {
        elem: [batches]
    };

    const params = {
        type: commonProtoPb.collected_batch_list,
        payload: batchListPayload
    };
    buildType(params, callback);
}


module.exports = {
    AlcHealthPb : alcHealthPb,
    CommonProto : commonProtoPb,
    DictPb : dictPb,
    HostMetadataPb : hostMetadataPb,
    buildPayload : buildPayload,
    PAYLOAD_BATCH_SIZE : PAYLOAD_BATCH_SIZE
};

