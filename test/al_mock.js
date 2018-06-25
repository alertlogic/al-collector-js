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

const CHECKIN_URL = '/aws/cwe/checkin/1234567890/us-east-1/test-function';

const CHECKIN = {
    awsAccountId : '1234567890',
    functionName : 'test-function',
    region : 'us-east-1',
    version : '1.0.0',
    status : 'ok',
    error_code : undefined,
    details : [],
    statistics : undefined
};

const AZCOLLECT_CHECKIN_QUERY = {
    body : {
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
    CHECKIN_URL : CHECKIN_URL,
    CHECKIN : CHECKIN,
    AZCOLLECT_CHECKIN_QUERY : AZCOLLECT_CHECKIN_QUERY,
    AZCOLLECT_CHECKIN_QUERY_COMPRESSED : AZCOLLECT_CHECKIN_QUERY_COMPRESSED,

    gen_auth_response : gen_auth_response
};