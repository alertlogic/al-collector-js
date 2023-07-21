/* -----------------------------------------------------------------------------
 * @copyright (C) 2018, Alert Logic, Inc
 * @doc
 *
 * Predefined constants for the tests.
 *
 * @end
 * -----------------------------------------------------------------------------
 */
const zlib = require('zlib');

const AIMS_CREDS = {
    access_key_id: 'test-access-key-id',
    secret_key: 'test-secret-key'
};

const AIMS_AUTH = {
    auth : {
        user: AIMS_CREDS.access_key_id,
        password: AIMS_CREDS.secret_key
    }
};

const AIMS_TOKEN_TTL = 21600; //6 hours
const CACHE_FILENAME = '/tmp/' + AIMS_CREDS.access_key_id + '-token.tmp';

const CID = '12345678';

const AL_API = 'al-api-endpoint.alertlogic.com';
const INGEST_API = 'ingest-api-endpoint.alertlogic.com';
const COLLECTOR_STATUS_API = 'collector-status-api-endpoint.alertlogic.com';

const AWS_CHECKIN_URL = '/aws/cwe/checkin/1234567890/us-east-1/test-function';

const AWS_CHECKIN = {
    awsAccountId : '1234567890',
    functionName : 'test-function',
    region : 'us-east-1',
    version : '1.0.0',
    status : 'ok',
    error_code : undefined,
    details : [],
    statistics : undefined
};

const AZURE_REGISTER_VALUES = {
    version : '1.0.0',
    web_app_name : 'azure-web-app-name',
    app_tenant_id : 'azure-tenant-id',
    app_resource_group : 'azure-resource-group',
    subscription_id : 'azure-subscription-id',
    client_id : 'azure-client-id',
    client_secret : 'azure-client-secret',
    config : {
        type : 'o365',
        content_streams: '[\"Audit.AzureActiveDirectory\", \"Audit.Exchange\", \"Audit.SharePoint\", \"Audit.General\"]'
    }
};

const AZURE_CHECKIN_VALUES = {
    version : '1.0.0',
    web_app_name : 'azure-web-app-name',
    app_tenant_id : 'azure-tenant-id',
    app_resource_group : 'azure-resource-group',
    subscription_id : 'azure-subscription-id',
    status: 'ok',
    error_code: undefined,
    details: [],
    statistics: undefined
};

const AZCOLLECT_CHECKIN_QUERY = {
    body : {
        awsAccountId: '1234567890',
        functionName: 'test-function',
        region: 'us-east-1',
        version: '1.0.0',
        status: 'ok',
        error_code: undefined,
        details: [],
        statistics: undefined
    }
};

const COMPRESSED_CHECKIN_BODY = zlib.deflateSync(
    JSON.stringify(AZCOLLECT_CHECKIN_QUERY.body)
);

const AZCOLLECT_CHECKIN_QUERY_COMPRESSED = {
    json : false,
    headers : {
        'Content-Encoding' : 'deflate',
        'Content-Length' : Buffer.byteLength(COMPRESSED_CHECKIN_BODY)
    },
    body : COMPRESSED_CHECKIN_BODY
};

const SEND_COLLECTOR_STATUS_BODY_DATA = {
    status: "error",
    inst_type: "collector",
    stream: "Audit.Exchange",
    status_id: "FC561097-E51D-4CB6-AB86-2A90CFFE60C7",
    timestamp: 1685377308,
    reported_by: "paws",
    collection_type: "o365",
    errorinfo: {
        code: "500",
        description: "server error",
        details: "failed to send logmsgs"
    }
};

const AIMS_RESPONSE_200 = {
        'authentication': {
            'user': {
              'id': '9166F39C-7EE9-44C2-9975-7229E4A220F4',
              'account_id': '134274125',
              'name': 'user-name',
              'email': 'username@gmail.com',
              'active': true,
              'locked': false,
              'version': 2,
              'linked_users': [
                {
                  'user_id': 2100000140,
                  'location': 'defender-us-ashburn'
                }
              ],
              'created': {
                'at': 1504004320,
                'by': 'B860236A-000F-4608-BCDD-5878BF815A9B'
              },
              'modified': {
                'at': 1504004321,
                'by': 'B860236A-000F-4608-BCDD-5878BF815A9B'
              }
            },
            'account': {
              'id': '134274125',
              'name': 'RCS-LM-Test',
              'active': true,
              'version': 6,
              'accessible_locations': [
                'defender-us-ashburn',
                'insight-us-virginia'
              ],
              'default_location': 'defender-us-ashburn',
              'created': {
                'at': 1502279387,
                'by': '702DDB3B-BEE0-4565-93D6-D525034C9DFD'
              },
              'modified': {
                'at': 1505926844,
                'by': 'CBE203A9-168D-4E8D-8B73-5E20F38B47A1'
              }
            },
            'token': 'some-token',
            'token_expiration': 1542318145
          }
        };

const SERVER_ERROR_500 = {
    statusCode: 500,
    message: "Internal Server Error"
};
function gen_auth_response() {
    return {
        authentication : {
            token : 'token',
            account : {
                id : CID
            },
            token_expiration : Math.ceil(Date.now()/1000 + AIMS_TOKEN_TTL)
        }
    };
}

module.exports = {
    AIMS_CREDS : AIMS_CREDS,
    AIMS_AUTH : AIMS_AUTH,
    AIMS_TOKEN_TTL : AIMS_TOKEN_TTL,
    CACHE_FILENAME : CACHE_FILENAME,
    CID : CID,
    AL_API : AL_API,
    INGEST_API : INGEST_API,
    AWS_CHECKIN_URL : AWS_CHECKIN_URL,
    AWS_CHECKIN : AWS_CHECKIN,
    AZCOLLECT_CHECKIN_QUERY : AZCOLLECT_CHECKIN_QUERY,
    AZCOLLECT_CHECKIN_QUERY_COMPRESSED : AZCOLLECT_CHECKIN_QUERY_COMPRESSED,
    AIMS_RESPONSE_200: AIMS_RESPONSE_200,
    AZURE_REGISTER_VALUES: AZURE_REGISTER_VALUES,
    AZURE_CHECKIN_VALUES: AZURE_CHECKIN_VALUES,
    SEND_COLLECTOR_STATUS_BODY_DATA: SEND_COLLECTOR_STATUS_BODY_DATA,
    COLLECTOR_STATUS_API: COLLECTOR_STATUS_API,
    SERVER_ERROR_500: SERVER_ERROR_500,

    gen_auth_response : gen_auth_response
};

