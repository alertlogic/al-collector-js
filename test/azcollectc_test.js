
const assert = require('assert');
const rewire = require('rewire');
const sinon = require('sinon');
const AimsC = require('../al_servicec').AimsC;
const AzcollectC = require('../al_servicec').AzcollectC;
const m_alMock = require('./al_mock');
const debug = require('debug') ('azcollectc_test');
var servicecRewire = rewire('../al_servicec');
var m_servicec = require('../al_servicec');
var RestServiceClient = require('../al_util').RestServiceClient;

describe('Unit Tests', function() {

    describe('AzcollectC', function() {
        var fakePost;
        var fakeDel;
        var fakeAuth;
        
        beforeEach(function() {
            fakeAuth = sinon.stub(AimsC.prototype, 'authenticate').callsFake(
                function fakeFn() {
                    return new Promise(function(resolve, reject) {
                        resolve({authentication : {token : 'token'}});
                    });
            });
            
            fakePost = sinon.stub(AzcollectC.prototype, 'post').callsFake(
                function fakeFn(path, options) {
                    return new Promise(function(resolve, reject) {
                        resolve('ok');
                    });
            });
            
            fakeDel = sinon.stub(AzcollectC.prototype, 'deleteRequest').callsFake(
                    function fakeFn(path, options) {
                        return new Promise(function(resolve, reject) {
                            resolve('ok');
                        });
                });
        });
        
        afterEach(function() {
            fakePost.restore();
            fakeDel.restore();
            fakeAuth.restore();
        });

        it('register', function(done) {
            var aimsc = new AimsC(m_alMock.AL_API, m_alMock.AIMS_CREDS);
            var azc = new AzcollectC(m_alMock.INGEST_ENDPOINT, aimsc, 'cwe');
            
            const checkinValues = {
                awsAccountId : '1234567890',
                functionName : 'test-function',
                region : 'us-east-1'
            };
            azc.register(checkinValues).then( resp => {
                sinon.assert.calledWith(fakePost, '/aws/cwe/1234567890/us-east-1/test-function');
                done();
            });
        });
        
        it('deregister', function(done) {
            var aimsc = new AimsC(m_alMock.AL_API, m_alMock.AIMS_CREDS);
            var azc = new AzcollectC(m_alMock.INGEST_ENDPOINT, aimsc, 'cwe');
            const checkinValues = {
                awsAccountId : '1234567890',
                functionName : 'test-function',
                region : 'us-east-1'
            };
            
            azc.deregister(checkinValues).then( resp => {
                sinon.assert.calledWith(fakeDel, '/aws/cwe/1234567890/us-east-1/test-function');
                done();
            });
        });
        
        it('checkin', function(done) {
            var aimsc = new AimsC(m_alMock.AL_API, m_alMock.AIMS_CREDS);

            var azc = new AzcollectC(m_alMock.INGEST_ENDPOINT, aimsc, 'cwe');
            const checkinValues = {
                awsAccountId : '1234567890',
                functionName : 'test-function',
                region : 'us-east-1'
            };
            azc.checkin(checkinValues).then( resp => {
                sinon.assert.calledWith(fakePost, '/aws/cwe/checkin/1234567890/us-east-1/test-function');
                done();
            });
        });

    });
});
