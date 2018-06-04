/* -----------------------------------------------------------------------------
 * @copyright (C) 2017, Alert Logic, Inc
 * @doc
 *
 * Base class for communication to Alert Logic services.
 *
 * @end
 * -----------------------------------------------------------------------------
 */

const debug = require('debug') ('al_servicec');
const fs = require('fs');
const path = require('path');
const m_alUtil = require('./al_util');

const DEFAULT_CACHE_DIR = '/tmp';

const COLLECTOR_TYPES = {
    CWE : 'cwe',
    CWL : 'cwl',
    O365 : 'o365'
};


/**
 * @class
 * Helper class for Alert Logic API requests authentication.
 *
 * @constructor
 * @param {string} apiEndpoint - Alert Logic API hostname
 * @param {Object} aisCreds - Alert Logic API credentials.
 * @param {string} [aisCreds.access_key_id] - Alert Logic API access key id.
 * @param {string} [aisCreds.secret_key] - Alert Logic API secret key.
 *
 */
class AimsC extends m_alUtil.RestServiceClient {
    constructor(apiEndpoint, aimsCreds, cacheDir) {
        super(apiEndpoint);
        this._cid = null;
        this._aimsAuth = {
            user: aimsCreds.access_key_id,
            password: aimsCreds.secret_key
        };
        var cache = cacheDir ? cacheDir : DEFAULT_CACHE_DIR;
        this._tokenCacheFile = path.join(cache,
                aimsCreds.access_key_id + '-token.tmp');
    }

    _makeAuthRequest() {
        if (this._isTokenMemCached()) {
            return Promise.race([this._aimsResponse]);
        }
        if (this._isTokenFileCached()) {
            return Promise.race([this._aimsResponse]);
        }
        return super.post('/aims/v1/authenticate', {auth: this._aimsAuth})
            .then(resp => {
                this._cid = resp.authentication.account.id;
                this._aimsResponse = resp;
                fs.writeFileSync(this._tokenCacheFile, JSON.stringify(resp));
                return resp;
            });
    }

    _isTokenExpired(aimsToken) {
        return aimsToken.authentication.token_expiration > (Date.now()/1000 + 600);
    }

    _isTokenMemCached() {
        return this._aimsResponse && this._isTokenExpired(this._aimsResponse);
    }

    _isTokenFileCached() {
        var filename = this._tokenCacheFile;
        fs.readFile(filename, (readError, fileContent) => {
            if (readError) {
                if ( readError.code !== 'ENOENT' ) {
                    fs.unlinkSync(filename);
                }
                return false;
            }
            try {
                var tokenJson = JSON.parse(fileContent);
                if (this._isTokenExpired(tokenJson)) {
                    return false;
                } else {
                    this._aimsResponse = tokenJson;
                    return true;
                }
            } catch (exception) {
                // Delete the cache file with malformed data.
                fs.unlinkSync(filename);
                return false;
            }
        });

    }

    get cid() {
        return this._cid;
    }

    authenticate() {
        return this._makeAuthRequest();
    }

}

/**
 * @class
 * Base class for all Alert Logic service clients which always uses
 * Alerlogic API request authentication headers and constructs AL services'
 * base paths.
 *
 * @constructor
 * @param {string} apiEndpoint - Alert Logic API hostname.
 * @param {string} name - Alert Logic service name.
 * @param {string} version - Alert Logic service HTTP API version.
 * @param {Object} aimsCreds - Alert Logic API credentials object, refer to AimsC.
 *
 */
class AlServiceC extends m_alUtil.RestServiceClient {
    constructor(apiEndpoint, name, version, aimsCreds) {
        super(apiEndpoint);
        this._url = this._url + '/' + name + '/' + version;
        this._aimsc = aimsCreds;
    }

    request(method, path, extraOptions) {
        return this._aimsc.authenticate()
            .then(resp => {
                const newOptions = Object.assign({}, extraOptions);
                newOptions.headers = newOptions.headers ?
                                     newOptions.headers :
                                     {};
                newOptions.headers['x-aims-auth-token'] = resp.authentication.token;
                var url = '/' + this._aimsc.cid + path;
                debug(`DEBUG0001: request - method: ${method} path: ${url}`);              
                return super.request(method, url, newOptions);
            });
    }
}


/**
 * @class
 * HTTPS client for Alert Logic Ingest service.
 *
 * @constructor
 * @param {string} apiEndpoint - Alert Logic API hostname.
 * @param {Object} aisCreds - Alert Logic API credentials object, refer to AimsC.
 * @param {string} [aisCreds.access_key_id] - Alert Logic API access key id.
 * @param {string} [aisCreds.secret_key] - Alert Logic API secret key.
 *
 */
class IngestC extends AlServiceC {
    constructor(apiEndpoint, aimsCreds, functionType) {
        super(apiEndpoint, 'ingest', 'v1', aimsCreds);
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

    sendVpcFlow(data, invokedBy) {
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
    
    sendAicspmsgs(data, invokedBy) {
        let payload = {
            json : false,
            headers : {
                'Content-Type': 'alertlogic.com/pass-through',
                'x-invoked-by' : this._functionType,
                'Content-Encoding' : 'deflate',
                'Content-Length' : Buffer.byteLength(data)
            },
            body : data
        };
        return this.post(`/data/aicspmsgs`, payload);
    }
}


/**
 * @class
 * Helper class for Alert Logic Azcollect.
 *
 * @constructor
 * @param {string} apiEndpoint - Alert Logic API hostname
 * @param {Object} aimsCreds - Alert Logic API credentials object, refer to AimsC.
 * @param {string} [aisCreds.access_key_id] - Aert Logic API access key id.
 * @param {string} [aisCreds.secret_key] - Alert Logic API secret key.
 * @param {string} collectorType - Al collector type: cwl, cwe, o365 etc
 *
 */
class AzcollectC extends AlServiceC {
    constructor(apiEndpoint, aimsCreds, collectorType) {
        super(apiEndpoint, 'azcollect', 'v1', aimsCreds);
        switch (collectorType){
            case COLLECTOR_TYPES.CWE:
            case COLLECTOR_TYPES.CWL:
            case COLLECTOR_TYPES.O365:
                this._collectorType = collectorType;
                break;
            default:
                // Keep for backward compatibility
                this._collectorType = COLLECTOR_TYPES.CWE;
                break;
                // TODO: Should have exception here when cwe-collector is migrated
                // throw `Unknown collector type: ${collectorType}`;
        }
    }

    doCheckin(checkinValues) {
        // Deprecated:
        return this._doCheckinAws(checkinValues);
    }
    
    doRegistration(registrationValues) {
        // Deprecated:
       return this._doRegistrationAws(registrationValues);
    }

    doDeregistration(registrationValues) {
        // Deprecated:
        return this._doDeregistrationAws(registrationValues);
    }

    _doCheckinAws(checkinValues) {
        let statusBody = {
            version : checkinValues.version,
            status : checkinValues.status,
            error_code : checkinValues.error_code,
            details : checkinValues.details,
            statistics : checkinValues.statistics
        };
        var functionName = encodeURIComponent(checkinValues.functionName);
        return this.post(`/aws/${checkinValues.collectorType}/checkin/` +
            `${checkinValues.awsAccountId}/${checkinValues.region}/${functionName}`, {body: statusBody});
    }
    
    _doRegistrationAws(registrationValues) {
        let statusBody = Object.assign({
             cf_stack_name : registrationValues.stackName,
             version : registrationValues.version
         }, registrationValues.custom_fields);
         var functionName = encodeURIComponent(registrationValues.functionName);
         return this.post(`/aws/${registrationValues.collectorType}/` +
             `${registrationValues.awsAccountId}/${registrationValues.region}/${functionName}`, {body: statusBody});
     }

     _doDeregistrationAws(registrationValues) {
         var functionName = encodeURIComponent(registrationValues.functionName);
         return this.deleteRequest(`/aws/${registrationValues.collectorType}/` +
             `${registrationValues.awsAccountId}/${registrationValues.region}/${functionName}`);
     }
    
    _doCheckinAzure(checkinValues) {
        throw '_doCheckinAzure not implemented';
    }
    
    _doRegistrationAzure(registrationValues) {
        throw '_doRegistrationAzure not implemented';
    }
    
    _doDeregistrationAzure(registrationValues) {
        throw '_doDeregistrationAzure not implemented';
    }
    
    checkin(checkinValues) {
        switch(this._collectorType) {
            case COLLECTOR_TYPES.CWE:
            case COLLECTOR_TYPES.CWL:
                return this._doCheckinAws(checkinValues);
                break;
            case COLLECTOR_TYPES.O365:
                return this._doCheckinAzure(checkinValues);
            default:
                break;
        }
    }
    
    register(registrationValues) {
        switch(this._collectorType) {
            case COLLECTOR_TYPES.CWE:
            case COLLECTOR_TYPES.CWL:
                return this._doRegistrationAws(registrationValues);
                break;
            case COLLECTOR_TYPES.O365:
                return this._doRegistrationAzure(registrationValues);
            default:
                break;
        }
    }
    
    deregister(registrationValues) {
        switch(this._collectorType) {
            case COLLECTOR_TYPES.CWE:
            case COLLECTOR_TYPES.CWL:
                return this._doDeregistrationAws(registrationValues);
                break;
            case COLLECTOR_TYPES.O365:
                return this._doDeregistrationAzure(registrationValues);
            default:
                break;
        }
    }

}


/**
 * @class
 * HTTPS client for Alert Logic Endpoints service.
 *
 * @constructor
 * @param {string} apiEndpoint - Alert Logic API hostname.
 * @param {Object} aimsCreds - Alert Logic API credentials object, refer to AimsC.
 * @param {string} [aisCreds.access_key_id] - Alert Logic API access key id.
 * @param {string} [aisCreds.secret_key] - Alert Logic API secret key.
 *
 */
class EndpointsC extends AlServiceC {
    constructor(apiEndpoint, aimsCreds) {
        super(apiEndpoint, 'endpoints', 'v1', aimsCreds);
    }
    getEndpoint(serivceName, residency) {
        return this.get(`/residency/${residency}/services/${serivceName}/endpoint`, {});
    }
}


exports.AlServiceC = AlServiceC;
exports.AimsC = AimsC;
exports.IngestC = IngestC;
exports.EndpointsC = EndpointsC;
exports.AzcollectC = AzcollectC;
