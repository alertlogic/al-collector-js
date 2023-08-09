/* -----------------------------------------------------------------------------
 * @copyright (C) 2017, Alert Logic, Inc
 * @doc
 *
 * Base class for communication to Alert Logic services.
 *
 * @end
 * -----------------------------------------------------------------------------
 */
'use strict';

const debug = require('debug')('al_servicec');
const fs = require('fs');
const path = require('path');
const m_alUtil = require('./al_util');

const DEFAULT_CACHE_DIR = '/tmp';

const TOKEN_EXPIRATION_SAFE_PERIOD = 600; //10 minutes

/**
 * @class
 * Helper class for Alert Logic API requests authentication.
 *
 * @constructor
 * @param {string} apiEndpoint - Alert Logic API hostname
 * @param {Object} aimsCreds - Alert Logic API credentials.
 * @param {string} [aimsCreds.access_key_id] - Alert Logic API access key id.
 * @param {string} [aimsCreds.secret_key] - Alert Logic API secret key.
 *
 */
class AimsC extends m_alUtil.RestServiceClient {
    constructor(apiEndpoint, aimsCreds, cacheDir, retryOptions, cid) {
        super(apiEndpoint, retryOptions);
        this._cid = cid;
        this._aimsAuth = {
            username: aimsCreds.access_key_id,
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
                this._cid = this._cid ? this._cid : resp.authentication.account.id;
                this._aimsResponse = resp;
                fs.writeFileSync(this._tokenCacheFile, JSON.stringify(resp));
                return resp;
            });
    }

    _isTokenExpired(aimsToken) {
        return aimsToken.authentication.token_expiration <=
               (Date.now()/1000 + TOKEN_EXPIRATION_SAFE_PERIOD);
    }

    _isTokenMemCached() {
        if (this._aimsResponse) {
            return !this._isTokenExpired(this._aimsResponse);
        } else {
            return false;
        }
    }

    _isTokenFileCached() {
        var filename = this._tokenCacheFile;
        try {
            var fileContent = fs.readFileSync(filename);
            var tokenJson = JSON.parse(fileContent);
            if (this._isTokenExpired(tokenJson)) {
                return false;
            } else {
                this._cid = this._cid ? this._cid : tokenJson.authentication.account.id;
                this._aimsResponse = tokenJson;
                return true;
            }
        } catch (e) {
            try {
                if (e instanceof SyntaxError || ((e instanceof Error) && 
                e.code !== 'ENOENT' && 
                e.code !== 'EMFILE' 
                )) {
                    fs.unlinkSync(filename);
                }
                return false;
            }
            catch (err) {
                console.error(`Failed to unlink cache due to: ${err}, cache read failure: ${e}, file name: ${filename}`);
                return false;
            }
        }
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
    constructor(apiEndpoint, name, version, aimsCreds, retryOptions) {
        super(apiEndpoint, retryOptions);
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
 * HTTPS client for Alert Logic Endpoints service.
 *
 * @constructor
 * @param {string} apiEndpoint - Alert Logic API hostname.
 * @param {Object} aimsCreds - Alert Logic API credentials object, refer to AimsC.
 * @param {string} [aimsCreds.access_key_id] - Alert Logic API access key id.
 * @param {string} [aimsCreds.secret_key] - Alert Logic API secret key.
 *
 */
class EndpointsC extends AlServiceC {
    constructor(apiEndpoint, aimsCreds, retryOptions) {
        super(apiEndpoint, 'endpoints', 'v1', aimsCreds, retryOptions);
    }
    getEndpoint(serviceName, residency) {
        return this.get(`/residency/${residency}/services/${serviceName}/endpoint`, {});
    }
}


module.exports = {
    AlServiceC: AlServiceC,
    AimsC: AimsC,
    EndpointsC: EndpointsC
};

