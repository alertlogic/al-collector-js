/* -----------------------------------------------------------------------------
 * @copyright (C) 2018, Alert Logic, Inc
 * @doc
 *
 * Mainly tests for REST service client
 *
 * @end
 * -----------------------------------------------------------------------------
 */

const fs = require('fs');
const assert = require('assert');
const nock = require('nock');
const RestServiceClient = require('../al_util').RestServiceClient;
const m_alMock = require('./al_mock');

const TEST_PATH = '/some/path';
const TEST_BODY = {
    field1 : true,
    field2: 'false'
};


describe('Unit Tests', function() {

    describe('RestServiceClient', function() {
        beforeEach(function(done) {
            if (!nock.isActive()) {
                nock.activate();
            }
            done();
        });
        afterEach(function(done) {
            nock.cleanAll();
            fs.unlink(m_alMock.CACHE_FILENAME, function(err){
                done();
            });
        });
        
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
                .reply(204, m_alMock.AIMS_RESPONSE_200);
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
                .reply(204, m_alMock.AIMS_RESPONSE_200);
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
                .reply(204, m_alMock.AIMS_RESPONSE_200);
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
                .reply(204, m_alMock.AIMS_RESPONSE_200);
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
