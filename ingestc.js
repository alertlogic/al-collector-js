/* -----------------------------------------------------------------------------
 * @copyright (C) 2020, Alert Logic, Inc
 * @doc
 *
 * HTTP client for Ingest service.
 *
 * @end
 * -----------------------------------------------------------------------------
 */
'use strict';

const AlServiceC = require('./al_servicec').AlServiceC;

/**
 * @class
 * HTTPS client for Alert Logic Ingest service.
 *
 * @constructor
 * @param {string} apiEndpoint - Alert Logic API hostname.
 * @param {Object} aimsCreds - Alert Logic API credentials object, refer to AimsC.
 * @param {string} [aimsCreds.access_key_id] - Alert Logic API access key id.
 * @param {string} [aimsCreds.secret_key] - Alert Logic API secret key.
 *
 */
class IngestC extends AlServiceC {
    constructor(apiEndpoint, aimsCreds, functionType, retryOptions) {
        super(apiEndpoint, 'ingest', 'v1', aimsCreds, retryOptions);
        this._functionType = functionType ? functionType : 'lambda_function';
    }

    sendSecmsgs(data) {
        let payload = {
            json : false,
            headers : {
                'Content-Type': 'alertlogic.com/cwe-json',
                'x-invoked-by' : this._functionType,
                'Content-Encoding' : 'deflate',
                'Content-Length' : Buffer.byteLength(data)
            },
            body : data
        };
        return this.post(`/data/secmsgs`, payload);
    }

    sendVpcFlow(data) {
        let payload = {
            json : false,
            headers : {
                'Content-Type': 'alertlogic.com/cwl-json',
                'x-invoked-by' : this._functionType,
                'Content-Encoding' : 'deflate',
                'Content-Length' : Buffer.byteLength(data)
            },
            body : data
        };
        return this.post(`/data/vpcflow`, payload);
    }
    
    sendLogmsgs(data) {
        let payload = {
            json : false,
            headers : {
                'Content-Type': 'alertlogic.com/lm3-protobuf',
                'x-invoked-by' : this._functionType,
                'Content-Encoding' : 'deflate',
                'Content-Length' : Buffer.byteLength(data)
            },
            body : data
        };
        return this.post(`/data/logmsgs`, payload);
    }
    
    sendAgentstatus(data) {
        let payload = {
            json : false,
            headers : {
                'Content-Type': 'alertlogic.com/json',
                'x-invoked-by' : this._functionType,
                'Content-Encoding' : 'deflate',
                'Content-Length' : Buffer.byteLength(data)
            },
            body : data
        };
        return this.post(`/data/agentstatus`, payload);
    }
}

module.exports = {
    IngestC: IngestC
};

