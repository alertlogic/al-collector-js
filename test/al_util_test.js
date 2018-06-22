const assert = require('assert');
const rewire = require('rewire');
const sinon = require('sinon');
const rp = require('request-promise-native');
const req = require('request');
const RestServiceClient = require('../al_util').RestServiceClient;
const m_alMock = require('./al_mock');
const debug = require('debug') ('azcollectc_test');
var servicecRewire = rewire('../al_servicec');
var m_servicec = require('../al_servicec');

describe('Unit Tests', function() {

    describe('RestServiceClient', function() {
        it('check _initRequestOptions', function(done) {
            var restC = new RestServiceClient(m_alMock.AL_API);
            var body = {
                field1 : true,
                field2: 'false'
            };
            var options = restC._initRequestOptions('POST', '/some/path', {
                headers : {'some_header' : 'some_value'},
                body : body
            });
            assert.deepEqual(options, {
                method: 'POST',
                url: 'https://al-api-endpoint.alertlogic.com/some/path',
                json: true,
                headers: {
                    'some_header' : 'some_value',
                    'Accept': 'application/json'
                },
                pool: {
                    maxSockets: 128
                },
                body : body
            });

            done();
        });
    });
});