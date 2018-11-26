/* -----------------------------------------------------------------------------
 * @copyright (C) 2018, Alert Logic, Inc
 * @doc
 *
 * Tests for base Alert Logic service client
 *
 * @end
 * -----------------------------------------------------------------------------
 */

const fs = require('fs');
const assert = require('assert');
const sinon = require('sinon');
const AimsC = require('../al_servicec').AimsC;
const AzcollectC = require('../al_servicec').AzcollectC;
const AlServiceC = require('../al_servicec').AlServiceC;
const m_alMock = require('./al_mock');
const debug = require('debug') ('azcollectc_test');
var m_servicec = require('../al_servicec');
var RestServiceClient = require('../al_util').RestServiceClient;


describe('Unit Tests', function() {

    describe('AlServiceC', function() {
        var fakeAims;
        var fakeRequest;

        beforeEach(function() {
            fakeAims = sinon.stub(RestServiceClient.prototype, 'post');
            fakeAims.callsFake(
                function fakeFn(path, options) {
                    if (path == '/aims/v1/authenticate' &&
                        options.auth.user == m_alMock.AIMS_AUTH.auth.user &&
                        options.auth.password == m_alMock.AIMS_AUTH.auth.password) {
                        return new Promise(function(resolve, reject) {
                            resolve(m_alMock.gen_auth_response());
                        });
                    } else {
                        return new Promise(function(resolve, reject) {
                            reject('error');
                        });
                    }
                }
            );
            fakeRequest = sinon.stub(RestServiceClient.prototype, 'request').callsFake(
                function fakeFn(method, url, newOptions) {
                    return new Promise(function(resolve, reject) {
                        resolve({response : 'some_response'});
                    });
                }
            );
        });

        afterEach(function(done) {
            fakeRequest.restore();
            fakeAims.restore();
            fs.unlink(m_alMock.CACHE_FILENAME, function(err){
                done();
            });
        });

        it('check request is called with correct headers', function(done) {
            var aimsC = new AimsC(m_alMock.AL_API, m_alMock.AIMS_CREDS);
            var alserviceC = new AlServiceC(m_alMock.AL_API, 'service_name', 'v1', aimsC);
            var body = {
                field1 : true,
                field2: 'false'
            };
            alserviceC.request('POST', '/some/path', {
                body : body
            })
            .then(resp => {
                sinon.assert.calledWith(fakeRequest,
                    'POST', '/' + m_alMock.CID + '/some/path', {
                        headers : {
                            'x-aims-auth-token' : 'token'
                        },
                        body : body
                    }
                );
                done();
            });
        });
    });
});