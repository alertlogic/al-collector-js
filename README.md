# al-collector-js

[![Build Status](https://secure.travis-ci.org/alertlogic/al-collector-js.png?branch=master)](http://travis-ci.org/alertlogic/al-collector-js) ![ALPS build](https://ci.pipelineservices.alertlogic.com/v1/badges/alertlogic/al-collector-js/npm?github=true)


Alert Logic cloud collector common library.


# Overview

This repository contains the common JavaScript functions used by Node.js collectors in the cloud.  

# HOWTO consume this library in Node.js

To install:

`npm install --save @alertlogic/al-collector-js`

and in your file:
```javascript
const {
    AimsC,
    AlServiceC,
    IngestC,
    AzcollectC,
    EndpointsC,
    AlLog,
    Parse ,
    RestServiceClient,
    CollectorStatusC
} = require('@alertlogic/al-collector-js');
```


# API

## AimsC
* @param {string} apiEndpoint - Alert Logic API hostname
* @param {Object} aimsCreds - Alert Logic API credentials.
* @param {string} [aimsCreds.access_key_id] - Alert Logic API access key id.
* @param {string} [aimsCreds.secret_key] - Alert Logic API secret key.
* @param {string} cacheDir(optional) - Cache directory. defaults to '/tmp'
* @param {Object} retryOptions(optional) - Retry Options.

```javascript
const aimsClient = new AimsC(endPoint, aimsCredsi, cacheDir, retryOption);
```

## AlServiceC
* @param {string} apiEndpoint - Alert Logic API hostname. 
* @param {string} name - Alert Logic service name.
* @param {string} version - Alert Logic service HTTP API version.
* @param {Object} aimsCreds - Alert Logic API credentials object, refer to AimsC.
* @param {Object} retryOptions(optional) - Retry Options.

```javascript
const alServiceClient = new AlServiceC(apiEndpoint, name, version, aimsCreds, retryOptions);
```

## IngestC
* @param {string} apiEndpoint - Alert Logic API hostname. 
* @param {Object} aimsCreds - Alert Logic API credentials object, refer to AimsC.
* @param {string} [aimsCreds.access_key_id] - Alert Logic API access key id.
* @param {string} [aimsCreds.secret_key] - Alert Logic API secret key.
* @param {string} functionType(optional) - Function type. Defaults to 'lambda_function'
* @param {Object} retryOptions(optional) - Retry Options.

```javascript
const alIngestClient = new IngestC(apiEndpoint, aimsCreds, functionType, retryOption);
```

## AzcollectC
* @param {string} apiEndpoint - Alert Logic API hostname
* @param {Object} aimsCreds - Alert Logic API credentials object, refer to AimsC.
* @param {string} [aimsCreds.access_key_id] - Aert Logic API access key id.
* @param {string} [aimsCreds.secret_key] - Alert Logic API secret key.
* @param {string} collectorType - Al collector type: cwl, cwe, o365 etc
* @param {boolean} sendCheckinCompressed - Whether to compress checkin payload
* @param {Object} retryOptions(optional) - Retry Options.

```javascript
const azCollectClient = new AzcollectC(apiEndpoint, aimsCreds, collectorType, sendCheckinCompressed, retryOptions);
```

## EndpointsC
* @param {string} apiEndpoint - Alert Logic API hostname.
* @param {Object} aimsCreds - Alert Logic API credentials object, refer to AimsC.
* @param {string} [aimsCreds.access_key_id] - Alert Logic API access key id.
* @param {string} [aimsCreds.secret_key] - Alert Logic API secret key.
* @param {Object} retryOptions(optional) - Retry Options.

```javascript
const alEndpointsClient = EndpointsC(apiEndpoint, aimsCreds, retryOption);
```
## CollectorStatusC
* @param {string} apiEndpoint - Alert Logic API hostname.
* @param {Object} aimsCreds - Alert Logic API credentials object, refer to AimsC.
* @param {*} retryOptions.

```javascript
const alCollectorStatusClient = CollectorStatusC(apiEndpoint, aimsCreds, retryOption);
```

## AlLog
*  @param hostId - host uuid obtained at collector registration
*  @param sourceId - source/collector id obtained at collector registration
*  @param hostmetaElems - a list of hostmeta JSON objects. For example,
```javascript
  var hostTypeElem = {
      key: 'host_type',
      value: {str: 'azure_fun'}
  };
  var localHostnameElem = {
      key: 'local_hostname',
      value: {str: process.env.WEBSITE_HOSTNAME}
  };

  var hostmetaElems = [hostTypeElem, localHostnameElem];
```
Consult 'metadata' definition in ./proto/host_metadata.piqi.proto
*  @param content  - a list of log messages to be ingested. Content should be batched on the caller level.
*  @param parseCallback(message) - a function to parse a log message into a JSON object which is converted into protobuf.
The parse callback is expected to construct the following object out of each log message:
```javascript
  var parsedMessage = {
      messageTs: 1542138053,
      priority: 11,
      progName: 'o365webhook',
      pid: undefined,
      message: 'some message string',
      messageType: 'json/azure.o365',
      messageTypeId: 'AzureActiveDirectory',
      messageTsUs: undefined
  };
```
Consult 'collected_message' definition in proto/common_proto.piqi.proto
@param callback
 
@return callback - (error, builtPayload, payloadSize)
@NOTE: Batch size should be tweaked on a caller level in order to avoid "Maximum payload size exceeded" errors.
For an Azure function consult eventHub.maxBatchSize property in host.json.
For an AWS Lambda via kinesis trigger batch size configuration.

## Parse

### getMsgTs
Get timestamp from Azure management API event. Returns the first match from the paths array. Returns the current timestamp if none of the paths are found. 

* @param {object}message - an Azure managment API event message
* @param {Array(string)}paths - an array of possible timestamp paths(dot-delimeted). e.g. "foo.bar"
* @return {object}time
* @return {number} [time.sec] - timestamp in seconds
* @return {number | null} [time.usec] - timestamp in microseconds

### getMsgTypeId
Get the message Type ID of an Azure management API event message.
* @param {object}message - an Azure managment API event message
* @param {Array(string)}paths - an array of possible timestamp paths(dot-delimeted). e.g. "foo.bar"
* @param {string}defaultValue(optional) - The value if none of the paths are found. Defaults to `null`.

# Compiling proto

You will need `pbjs` tool in order to compile protobuf definitions located in [proto](proto):

```
npm install -g protobufjs
make pb-clean
make pb
```

# Debugging

To get a debug trace, set an Node.js environment variable called DEBUG and
specify the JavaScript module/s to debug.

E.g.

```
export DEBUG=*
export DEBUG=index
```

Or set an environment variable called "DEBUG" in your AWS stack (using the AWS 
console) for the "alertlogic-cwe-collector" AWS Lambda function, with 
value "index" or "*".

See [debug](https://www.npmjs.com/package/debug) for further details.

# Known Issues/ Open Questions

- TBD.

# Useful Links

- [Node.js static code analysis tool](http://jshint.com/install/)
- [Node.js rewire testing tool](https://github.com/jhnns/rewire)
- [Node.js sinon testing tool](http://sinonjs.org/)
- [pbjs manual](http://dcode.io/protobuf.js/#pbjs-for-javascript)
