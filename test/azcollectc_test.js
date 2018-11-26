/* -----------------------------------------------------------------------------
 * @copyright (C) 2018, Alert Logic, Inc
 * @doc
 *
 * Tests for Alert Logic Azcollect service client
 *
 * @end
 * -----------------------------------------------------------------------------
 */

const fs = require('fs');
const assert = require('assert');
const sinon = require('sinon');
const AimsC = require('../al_servicec').AimsC;
const AzcollectC = require('../al_servicec').AzcollectC;
const m_alMock = require('./al_mock');
const debug = require('debug') ('azcollectc_test');
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
                        resolve(m_alMock.gen_auth_response());
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
        
        afterEach(function(done) {
            fakePost.restore();
            fakeDel.restore();
            fakeAuth.restore();
            fs.unlink(m_alMock.CACHE_FILENAME, function(err){
                done();
            });
        });
        
        it('register no data type', function(done) {
            var aimsc = new AimsC(m_alMock.AL_API, m_alMock.AIMS_CREDS);
            var azc = new AzcollectC(m_alMock.INGEST_ENDPOINT, aimsc, 'cwe');
            
            const checkinValues = {
                awsAccountId : '1234567890',
                functionName : 'test-function',
                region : 'us-east-1',
                version : '1.0.0',
                stackName : 'test-stack'
                
            };
            azc.register(checkinValues).then( resp => {
                sinon.assert.calledWith(fakePost, '/aws/cwe/1234567890/us-east-1/test-function',
                    { 
                        body: {
                            cf_stack_name: 'test-stack',
                            data_type: 'secmsgs',
                            version: '1.0.0'
                        }
                    });
                
                done();
            });
        });
        
        it('register with data type', function(done) {
            var aimsc = new AimsC(m_alMock.AL_API, m_alMock.AIMS_CREDS);
            var azc = new AzcollectC(m_alMock.INGEST_ENDPOINT, aimsc, 'cwl');
            
            const checkinValues = {
                awsAccountId : '1234567890',
                functionName : 'test-function',
                region : 'us-east-1',
                version : '1.0.0',
                stackName : 'test-stack',
                dataType: 'vpcflow'
                
            };
            azc.register(checkinValues).then( resp => {
                sinon.assert.calledWith(fakePost, '/aws/cwl/1234567890/us-east-1/test-function',
                    { 
                        body: {
                            cf_stack_name: 'test-stack',
                            data_type: 'vpcflow',
                            version: '1.0.0'
                        }
                    });
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
        
        it('checkin (no compression)', function(done) {
            var aimsc = new AimsC(m_alMock.AL_API, m_alMock.AIMS_CREDS);
            var azc = new AzcollectC(m_alMock.INGEST_ENDPOINT, aimsc, 'cwe', false);
            azc.checkin(m_alMock.CHECKIN).then( resp => {
                sinon.assert.calledWith(
                    fakePost,
                    m_alMock.CHECKIN_URL,
                    m_alMock.AZCOLLECT_CHECKIN_QUERY
                );
                done();
            });
        });

        it('checkin (with compression)', function(done) {
            var aimsc = new AimsC(m_alMock.AL_API, m_alMock.AIMS_CREDS);
            var azc = new AzcollectC(m_alMock.INGEST_ENDPOINT, aimsc, 'cwe', true);
            azc.checkin(m_alMock.CHECKIN).then( resp => {
                sinon.assert.calledWith(
                    fakePost,
                    m_alMock.CHECKIN_URL,
                    m_alMock.AZCOLLECT_CHECKIN_QUERY_COMPRESSED
                );
                done();
            });
        });

    });
});
