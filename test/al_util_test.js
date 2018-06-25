const assert = require('assert');
const rewire = require('rewire');
const sinon = require('sinon');
const nock = require('nock');
const rp = require('request-promise-native');
const req = require('request');
const RestServiceClient = require('../al_util').RestServiceClient;
const m_alMock = require('./al_mock');
const debug = require('debug') ('azcollectc_test');
var servicecRewire = rewire('../al_servicec');
var m_servicec = require('../al_servicec');

const TEST_PATH = '/some/path';
const TEST_BODY = {
    field1 : true,
    field2: 'false'
};


describe('Unit Tests', function() {

    describe('RestServiceClient', function() {
        it('test request', function(done) {
            var restC = new RestServiceClient(m_alMock.AL_API);
            var restMock = nock('https://' + m_alMock.AL_API, {
                    reqheaders : {
                        'accept': 'application/json',
                        'host': m_alMock.AL_API,
                        'content-type': 'application/json',
                        'some_header' : 'some_value'
                    }
                })
                .post(TEST_PATH, TEST_BODY)
                .times(1)
                .reply(204);
            restC.request('POST', TEST_PATH, {
                headers : {'some_header' : 'some_value'},
                body : TEST_BODY
            })
            .then(resp => {
                assert.ok(restMock.isDone());
                done();
            });
        });

        it('test post', function(done) {
            var restC = new RestServiceClient(m_alMock.AL_API);
            var restMock = nock('https://' + m_alMock.AL_API, {
                    reqheaders : {
                        'accept': 'application/json',
                        'host': m_alMock.AL_API,
                        'content-type': 'application/json',
                        'some_header' : 'some_value'
                    }
                })
                .post(TEST_PATH, TEST_BODY)
                .times(1)
                .reply(204);
            restC.post(TEST_PATH, {
                headers : {'some_header' : 'some_value'},
                body : TEST_BODY
            })
            .then(resp => {
                assert.ok(restMock.isDone());
                done();
            });
        });

        it('test get', function(done) {
            var restC = new RestServiceClient(m_alMock.AL_API);
            var restMock = nock('https://' + m_alMock.AL_API, {
                    reqheaders : {
                        'accept': 'application/json',
                        'host': m_alMock.AL_API,
                        'some_header' : 'some_value'
                    }
                })
                .get(TEST_PATH)
                .times(1)
                .reply(204);
            restC.get(TEST_PATH, {
                headers : {'some_header' : 'some_value'}
            })
            .then(resp => {
                assert.ok(restMock.isDone());
                done();
            });
        });

        it('test deleteRequest', function(done) {
            var restC = new RestServiceClient(m_alMock.AL_API);
            var restMock = nock('https://' + m_alMock.AL_API, {
                    reqheaders : {
                        'accept': 'application/json',
                        'host': m_alMock.AL_API,
                        'some_header' : 'some_value'
                    }
                })
                .delete(TEST_PATH)
                .times(1)
                .reply(204);
            restC.deleteRequest(TEST_PATH, {
                headers : {'some_header' : 'some_value'}
            })
            .then(resp => {
                assert.ok(restMock.isDone());
                done();
            });
        });

        it('test getters', function(done) {
            var restC = new RestServiceClient(m_alMock.AL_API);
            assert.equal(restC.host, m_alMock.AL_API);
            assert.equal(restC.url, 'https://' + m_alMock.AL_API);
            done();
        });

    });
});
