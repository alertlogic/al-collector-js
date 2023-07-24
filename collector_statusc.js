/* -----------------------------------------------------------------------------
 * @copyright (C) 2023, Alert Logic, Inc
 * @doc
 *
 * HTTP client for Collector status service.
 *
 * @end
 * -----------------------------------------------------------------------------
 */
'use strict';

const AlServiceC = require('./al_servicec').AlServiceC;

/**
 * @class
 * HTTPS client for Alert Logic Collector_status service.
 *
 * @constructor
 * @param {string} apiEndpoint - Alert Logic API hostname.
 * @param {Object} aimsCreds - Alert Logic API credentials object, refer to AimsC.
 * @param {*} retryOptions
 */
class CollectorStatusC extends AlServiceC {
    constructor(apiEndpoint, aimsCreds, retryOptions) {
        super(apiEndpoint, 'collectors_status', 'v1', aimsCreds, retryOptions);
    }
    sendStatus(statusId, stream, data) {
        let payload = {
            headers: {
                'Content-Type': 'application/json'
            },
            body: data
        };
        // Few collector stream contain `/` which not excepted by collectors_status service. so Encode the stream before making the api call.It will encodes special characters including: , / ? : @ & = + $ # 
        const encodedStream = encodeURIComponent(stream);
        return this.put(`/statuses/${statusId}/streams/${encodedStream}`, payload);
    }
}

module.exports = {
    CollectorStatusC: CollectorStatusC
};