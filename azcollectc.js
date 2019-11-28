/* -----------------------------------------------------------------------------
 * @copyright (C) 2017, Alert Logic, Inc
 * @doc
 *
 * Base class for communication to Alert Logic services.
 *
 * @end
 * -----------------------------------------------------------------------------
 */

const zlib = require('zlib');
const AlServiceC = require('./al_servicec').AlServiceC;

const COLLECTOR_TYPES = {
    CWE: 'cwe',
    CWL: 'cwl',
    O365: 'o365',
    EHUB: 'ehub',
    PAWS: 'paws'
};

const CLOUD_TYPES = {
        AWS: 'aws',
        Azure: 'azure'
    };

/**
 * @class
 * Helper class for Alert Logic Azcollect.
 *
 * @constructor
 * @param {string} apiEndpoint - Alert Logic API hostname
 * @param {Object} aimsCreds - Alert Logic API credentials object, refer to AimsC.
 * @param {string} [aimsCreds.access_key_id] - Aert Logic API access key id.
 * @param {string} [aimsCreds.secret_key] - Alert Logic API secret key.
 * @param {string} collectorType - Al collector type: cwl, cwe, o365 etc
 *
 */
class AzcollectC extends AlServiceC {
    constructor(apiEndpoint, aimsCreds, collectorType, sendCheckinCompressed, retryOptions) {
        'use strict';
        super(apiEndpoint, 'azcollect', 'v1', aimsCreds, retryOptions);
        this._sendCheckinCompressed = sendCheckinCompressed ? sendCheckinCompressed : false;
        switch (collectorType){
            case COLLECTOR_TYPES.CWE:
            case COLLECTOR_TYPES.CWL:
            case COLLECTOR_TYPES.PAWS:
                this._collectorType = collectorType;
                this._cloudType = CLOUD_TYPES.AWS;
                break;
            case COLLECTOR_TYPES.O365:
            case COLLECTOR_TYPES.EHUB:
                this._collectorType = collectorType;
                this._cloudType = CLOUD_TYPES.AZURE;
                break;
            default:
                // Keep for backward compatibility
                this._collectorType = COLLECTOR_TYPES.CWE;
                this._cloudType = CLOUD_TYPES.AWS;
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
        'use strict';
        let checkinBody = {
            version : checkinValues.version,
            status : checkinValues.status,
            error_code : checkinValues.error_code,
            details : checkinValues.details,
            statistics : checkinValues.statistics
        };
        const type = this._collectorType;
        var functionName = encodeURIComponent(checkinValues.functionName);
        var checkinUrl = `/aws/${type}/checkin/${checkinValues.awsAccountId}/` +
                         `${checkinValues.region}/${functionName}`;
        return this._doSendCheckin(checkinUrl, checkinBody);
    }

    _doRegistrationAws(registrationValues) {
        'use strict';
        const type = this._collectorType;
        var functionName = encodeURIComponent(registrationValues.functionName);
        return this.post(`/aws/${type}/` +
            `${registrationValues.awsAccountId}/${registrationValues.region}/${functionName}`, {body: registrationValues});
    }

     _doDeregistrationAws(registrationValues) {
         'use strict';
         const type = this._collectorType;
         var functionName = encodeURIComponent(registrationValues.functionName);
         return this.deleteRequest(`/aws/${type}/` +
             `${registrationValues.awsAccountId}/${registrationValues.region}/${functionName}`);
     }
    
    _doCheckinAzure(checkinInput) {
        'use strict';
        var checkinBody = Object.assign({}, checkinInput);
        const type = this._collectorType;
        var functionName = encodeURIComponent(checkinBody.web_app_name);
        var checkinUrl = `/azure/${type}/checkin/${checkinInput.subscription_id}/` +
                         `${checkinInput.app_resource_group}/${functionName}`;
        delete checkinBody.app_resource_group;
        delete checkinBody.subscription_id;
        delete checkinBody.web_app_name;
        return this._doSendCheckin(checkinUrl, checkinBody);
    }
    
    _doRegistrationAzure(regInput) {
        'use strict';
        var regBody = Object.assign({}, regInput);
        const collectorType = this._collectorType;
        const functionName = encodeURIComponent(regInput.web_app_name);
        delete regBody.app_resource_group;
        delete regBody.subscription_id;
        delete regBody.web_app_name;
        return this.post(`/azure/${collectorType}/` +
                `${regInput.subscription_id}/${regInput.app_resource_group}/${functionName}`, {body: regBody});
    }
    
    _doDeregistrationAzure(deregInput) {
        'use strict';
        var deregBody = Object.assign({}, deregInput);
        const collectorType = this._collectorType;
        var functionName = encodeURIComponent(deregBody.web_app_name);
        delete deregBody.app_resource_group;
        delete deregBody.subscription_id;
        delete deregBody.web_app_name;
        return this.deleteRequest(`/azure/${collectorType}/` +
            `${deregInput.subscription_id}/${deregInput.app_resource_group}/${functionName}`, {body: deregBody});
    }
    
    _doSendCheckin(checkinUrl, checkinBody) {
        if (this._sendCheckinCompressed) {
            var data = zlib.deflateSync(JSON.stringify(checkinBody));
            let payload = {
                json : false,
                headers : {
                    'Content-Encoding' : 'deflate',
                    'Content-Length' : Buffer.byteLength(data)
                },
                body : data
            };
            return this.post(checkinUrl, payload);
        } else {
            let payload = {
                 body : checkinBody
            };
            return this.post(checkinUrl, payload);
        }
    }
    
    checkin(checkinValues) {
        'use strict';
        switch(this._cloudType) {
            case CLOUD_TYPES.AWS:
                return this._doCheckinAws(checkinValues);
            case CLOUD_TYPES.AZURE:
                return this._doCheckinAzure(checkinValues);
            default:
                break;
        }
    }
    
    register(registrationValues) {
        'use strict';
        switch(this._cloudType) {
            case CLOUD_TYPES.AWS:
                return this._doRegistrationAws(registrationValues);
            case CLOUD_TYPES.AZURE:
                return this._doRegistrationAzure(registrationValues);
            default:
                break;
        }
    }
    
    deregister(registrationValues) {
        'use strict';
        switch(this._cloudType) {
            case CLOUD_TYPES.AWS:
                return this._doDeregistrationAws(registrationValues);
            case CLOUD_TYPES.AZURE:
                return this._doDeregistrationAzure(registrationValues);
            default:
                break;
        }
    }

}

module.exports = {
    AzcollectC: AzcollectC
};

