/* -----------------------------------------------------------------------------
 * @copyright (C) 2017, Alert Logic, Inc
 * @doc
 *
 * Helper utilities for  Alert Logic collectors.
 *
 * @end
 * -----------------------------------------------------------------------------
 */

const rp = require('request-promise-native');
const retry = require('retry');

let MAX_CONNS_PER_SERVICE = 128;

/**
 * @default Refer to https://www.npmjs.com/package/retry
 */
let DEFAULT_RETRY = {
    // Default values
    // randomize: false
    factor: 7,
    minTimeout: 300,
    retries: 2,
    maxTimeout: 10000
};

/**
 * @function Default retry callback. 
 *  It doesn't retry 2XX, 3XX and 4XX.
 *  Keeps retrying 5XX HTTP responses and any system level errors
 **/
var defaultRetryCb = function(err){
    if (err && 
        (err.statusCode >= 500 ||
        (err.error && err.error.errno))) {
        return true;
    } else {
        return false;
    }
};

/**
 * @class
 * Rest client.
 *
 * @constructor
 * @param {string} endpoint - hostname/address to sent HTTPS
 * requests to.
 *
 */
class RestServiceClient {
    constructor(endpoint, retryOptions) {
        'use strict';
        this._host = endpoint;
        this._url = 'https://' + endpoint;
        this._pool = {
            maxSockets: MAX_CONNS_PER_SERVICE
        };
        if (retryOptions) {
            this._retryCb = retryOptions.retryCb ? retryOptions.retryCb : defaultRetryCb;
            delete retryOptions.retryCb;
            this._retryOptions = retryOptions ? retryOptions : DEFAULT_RETRY;
        } else {
            this._retryCb = defaultRetryCb;
            this._retryOptions = DEFAULT_RETRY;
        }
    }

    _initRequestOptions(method, path, extra) {
        'use strict';
        const defaultOptions = {
            method: method,
            url: this._url + path,
            json: true,
            headers: {},
            pool: this._pool
        };
        const options = Object.assign({}, defaultOptions, extra);
        const defaultHeaders = {
            'Accept': 'application/json'
        };
        Object.assign(options.headers,
                      defaultHeaders,
                      extra.headers ? extra.headers : {});
        return options;
    }
    request(method, path, extraOptions) {
        'use strict';
        const options = this._initRequestOptions(method, path, extraOptions);
        const retryOptions = this._retryOptions;
        var retryCb = this._retryCb;
        
        var operation = retry.operation(retryOptions);
        
        return new Promise(function(resolve, reject) {
            operation.attempt(function(currentAttempt) {
                rp(options)
                    .then( resp => {
                        // We need opertaion.retry here as we want to check if
                        // the maximum amount of retries has been reached
                        if (retryCb(resp) && operation.retry('retry')) {
                            return;
                        } else {
                            return resolve(resp);
                        }
                    })
                    .catch( err =>{
                        if (retryCb(err) && operation.retry(err)) {
                            return;
                        } else {
                            return reject(err);
                        }
                    });
            });
        });
    }
    post(path, extraOptions) {
        return this.request('POST', path, extraOptions);
    }
    get(path, extraOptions) {
        return this.request('GET', path, extraOptions);
    }
    deleteRequest(path, extraOptions) {
        return this.request('DELETE', path, extraOptions);
    }
    put(path, extraOptions) {
        return this.request('PUT', path, extraOptions);
    }
    get host() {
        return this._host;
    }
    get url() {
        return this._url;
    }
}

module.exports = {
    RestServiceClient: RestServiceClient
};

