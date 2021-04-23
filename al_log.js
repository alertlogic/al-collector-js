/* -----------------------------------------------------------------------------
 * @copyright (C) 2018, Alert Logic, Inc
 * @doc
 *
 * Helper utilities for  Alert Logic log collector.
 *
 * @end
 * -----------------------------------------------------------------------------
 */
const crypto = require('crypto');
const async = require('async');
const zlib = require('zlib');

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
 *  @param callback
 *  
 *  @return callback - (error, builtPayload, payloadSize)
 *  @NOTE: Batch size should be tweaked on a caller level in order to avoid "Maximum payload size exceeded" errors.
 *  For an Azure function consult eventHub.maxBatchSize property in host.json.
 *  For an AWS Lambda via kinesis trigger batch size configuration.
 */

var buildPayload = function (hostId, sourceId, hostmetaElems, content, parseCallback, mainCallback) {
    async.waterfall([
        function(callback) {
            buildMessages(content, parseCallback, function(err, msg) {
                return callback(err, msg);
            });
        },
        function(msg, callback) {
            buildHostmeta(hostId, hostmetaElems, function(err, meta) {
                return callback(err, meta, msg);
            });
        },
        function(meta, msg, callback) {
            buildBatch(sourceId, meta, msg, function(err, batch) {
                return callback(err, batch, msg);
            });
        },
        function(batchBuf, msg, callback) {
            buildBatchList(batchBuf, function(err, batchList) {
                return callback(err, batchList, msg);
            });
        },
        function(batchList, msg, callback) {
            var batchListType = commonProtoPb.collected_batch_list;
            var buf = batchListType.encode(batchList).finish();
            return callback(null, buf, msg);
        }],
        function (err, result, msg) {
            if (err) {
                return mainCallback(err);
            } else {
                // calculate the actual collected Mssage byte
                var collectedMessageBytes = 0;
                msg.map(eachMessage => {
                    collectedMessageBytes += eachMessage.messageLength;
                });
                zlib.deflate(result, function(defalteErr, compressed) {
                    if (defalteErr) {
                        return mainCallback(defalteErr);
                    } else {
                        var payloadSize = compressed.byteLength;
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

function buildType(type, payload, callback) {
    var verify = type.verify(payload);
    if (verify)
        return callback(verify);

    var payloadCreated = type.create(payload);

    return callback(null, payloadCreated);
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

function buildHostmeta(hostId, hostmetaElems, callback) {
    var hostmetaType = hostMetadataPb.metadata;
    var hostmeta = {
        elem : hostmetaElems
    };
    buildType(dictPb.dict, hostmeta, function(err, hostmetaData){
        if (err) {
            return callback(err);
        } else {
            var meta = {
                hostUuid : hostId,
                data : hostmetaData,
                dataChecksum : new Buffer('')
            };
            var sha = crypto.createHash('sha1');
            var hashPayload = hostmetaType.encode(meta).finish();
            var hashValue = sha.update(hashPayload).digest();
            
            var metadataPayload = {
                hostUuid : hostId,
                dataChecksum : hashValue,
                timestamp : Math.floor(Date.now() / 1000),
                data : hostmetaData
            };
    
            return buildType(hostmetaType, metadataPayload, callback);
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
 * @param callback
 * @returns
 */

function buildMessages(content, parseContentFun, callback) {
    async.reduce(content, [], function(memo, item, asyncCallback) {
        var messageType = commonProtoPb.collected_message;
        var messagePayload = parseContentFun(item);
        buildType(messageType, messagePayload, function(err, buf) {
            if (err) {
                return asyncCallback(err);
            } else {
                buf.messageLength = buf.message.length;
                memo.push(buf);
                return asyncCallback(err, memo);
            }
        });
    },
    callback);
}

function buildBatch(sId, metadata, messages, callback) {
    var batchType = commonProtoPb.collected_batch;

    var batchPayload = {
        sourceId: sId,
        metadata: metadata,
        message: messages
    };

    buildType(batchType, batchPayload, callback);
}

function buildBatchList(batches, callback) {
    var batchListType = commonProtoPb.collected_batch_list;

    var batchListPayload = {
        elem: [batches]
    };

    buildType(batchListType, batchListPayload, callback);
}


module.exports = {
    AlcHealthPb : alcHealthPb,
    CommonProto : commonProtoPb,
    DictPb : dictPb,
    HostMetadataPb : hostMetadataPb,
    buildPayload : buildPayload,
    PAYLOAD_BATCH_SIZE : PAYLOAD_BATCH_SIZE
};

