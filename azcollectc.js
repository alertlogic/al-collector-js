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

const zlib = require('zlib');
const AlServiceC = require('./al_servicec').AlServiceC;

const CLOUD_TYPES = {
    AWS: 'aws',
    AZURE: 'azure'
};

const DEFAULT_RETRY_OPTS = {
    factor: 2,
    minTimeout: 300,
    retries: 7,
    maxTimeout: 10000
};

/**
 * @class
 * Helper class for Alert Logic Azcollect.
 *
 * @constructor
 * @param {string} apiEndpoint - Alert Logic API hostname
 * @param {Object} aimsCreds - Alert Logic API credentials object, refer to AimsC.
 * @param {string} [aimsCreds.access_key_id] - Alert Logic API access key id.
 * @param {string} [aimsCreds.secret_key] - Alert Logic API secret key.
 * @param {string} cloudType - type of cloud provider: aws, azure etc
 * @param {string} collectorType - Alert Logic collector type: cwl, cwe, o365 etc
 * @param {string} sendCheckinCompressed - gzip checkin body for transport. Default false.
 * @param {Object} retryOptions - refer to retry#retrytimeoutsoptions of 'retry' npm package.
 *
 */
class AzcollectC extends AlServiceC {
    constructor(apiEndpoint, aimsCreds, cloudType, collectorType, sendCheckinCompressed, retryOptions) {
        const retryOpts = retryOptions ? retryOptions : DEFAULT_RETRY_OPTS;
        super(apiEndpoint, 'azcollect', 'v1', aimsCreds, retryOpts);
        this._sendCheckinCompressed = sendCheckinCompressed ? sendCheckinCompressed : false;
        this._collectorType = collectorType;
        this._cloudType = cloudType;
    }

    _doCheckinAws(checkinValues) {
        const type = this._collectorType;
        var functionName = encodeURIComponent(checkinValues.functionName);
        var checkinUrl = `/aws/${type}/checkin/${checkinValues.awsAccountId}/` +
                         `${checkinValues.region}/${functionName}`;
        return this._doSendCheckin(checkinUrl, checkinValues);
    }

    _doRegistrationAws(registrationValues) {
        const type = this._collectorType;
        var functionName = encodeURIComponent(registrationValues.functionName);
        return this.post(`/aws/${type}/` +
            `${registrationValues.awsAccountId}/${registrationValues.region}/${functionName}`, {body: registrationValues});
    }

     _doDeregistrationAws(registrationValues) {
         const type = this._collectorType;
         var functionName = encodeURIComponent(registrationValues.functionName);
         return this.deleteRequest(`/aws/${type}/` +
             `${registrationValues.awsAccountId}/${registrationValues.region}/${functionName}`, {body: registrationValues});
     }
    
    _doCheckinAzure(checkinInput) {
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

