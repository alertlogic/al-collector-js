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
const sinon = require('sinon');
const assert = require('assert');
const AimsC = require('../al_servicec').AimsC;
const AlServiceC = require('../al_servicec').AlServiceC;
const m_alMock = require('./al_mock');
const CollectorStatusC = require('../al_servicec').CollectorStatusC;
var RestServiceClient = require('../al_util').RestServiceClient;


describe('Unit Tests', function() {

    describe('AlServiceC', function() {
        var fakeAims;
        var fakeRequest;

        beforeEach(function() {
            fakeAims = sinon.stub(RestServiceClient.prototype, 'post');
            fakeAims.callsFake(
                function fakeFn(path, options) {
                    if (path === '/aims/v1/authenticate' &&
                        options.auth.user === m_alMock.AIMS_AUTH.auth.user &&
                        options.auth.password === m_alMock.AIMS_AUTH.auth.password) {
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

        it('Verify send Status called with correct parameter', function (done) {

            const fakePost = sinon.stub(AlServiceC.prototype, 'put').callsFake(
                function fakeFn(path, extraOptions) {
                    assert.equal(extraOptions.body, m_alMock.SEND_COLLECTOR_STATUS_BODY_DATA);
                    assert.equal(path, `/statuses/${m_alMock.SEND_COLLECTOR_STATUS_BODY_DATA.status_id}/streams/${m_alMock.SEND_COLLECTOR_STATUS_BODY_DATA.stream}`);
                    done();
                });

            var aimsc = new AimsC(m_alMock.AL_API, m_alMock.AIMS_CREDS);
            var collectorStatus = new CollectorStatusC(m_alMock.COLLECTOR_STATUS_API, aimsc);
            collectorStatus.sendStatus(m_alMock.SEND_COLLECTOR_STATUS_BODY_DATA.status_id, m_alMock.SEND_COLLECTOR_STATUS_BODY_DATA.stream, m_alMock.SEND_COLLECTOR_STATUS_BODY_DATA).then(res => {
                fakePost.restore();
            });
        });
    });
});