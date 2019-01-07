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
const zlib = require('zlib');
const sinon = require('sinon');
const AimsC = require('../al_servicec').AimsC;
const AzcollectC = require('../azcollectc').AzcollectC;
const m_alMock = require('./al_mock');

describe('Unit Tests', function() {

    describe('AzcollectC AWS functions', function() {
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
        
        it('AWS register no data type', function(done) {
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
        
        it('AWS register with data type', function(done) {
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
        
        it('AWS deregister', function(done) {
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
        
        it('AWS checkin (no compression)', function(done) {
            var aimsc = new AimsC(m_alMock.AL_API, m_alMock.AIMS_CREDS);
            var azc = new AzcollectC(m_alMock.INGEST_ENDPOINT, aimsc, 'cwe', false);
            azc.checkin(m_alMock.AWS_CHECKIN).then( resp => {
                sinon.assert.calledWith(
                    fakePost,
                    m_alMock.AWS_CHECKIN_URL,
                    m_alMock.AZCOLLECT_CHECKIN_QUERY
                );
                done();
            });
        });

        it('AWS checkin (with compression)', function(done) {
            var aimsc = new AimsC(m_alMock.AL_API, m_alMock.AIMS_CREDS);
            var azc = new AzcollectC(m_alMock.INGEST_ENDPOINT, aimsc, 'cwe', true);
            azc.checkin(m_alMock.AWS_CHECKIN).then( resp => {
                sinon.assert.calledWith(
                    fakePost,
                    m_alMock.AWS_CHECKIN_URL,
                    m_alMock.AZCOLLECT_CHECKIN_QUERY_COMPRESSED
                );
                done();
            });
        });

    });
    
    describe('AzcollectC Azure functions', function() {
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
        
        it('Azure register', function(done) {
            var aimsc = new AimsC(m_alMock.AL_API, m_alMock.AIMS_CREDS);
            var azc = new AzcollectC(m_alMock.INGEST_ENDPOINT, aimsc, 'o365');
            var expectedRegisterBody = {
                body: {
                    app_tenant_id: 'azure-tenant-id',
                    client_id: 'azure-client-id',
                    client_secret: 'azure-client-secret',
                    config: {
                      content_streams: '[\"Audit.AzureActiveDirectory\", \"Audit.Exchange\", \"Audit.SharePoint\", \"Audit.General\"]',
                      type: 'o365'
                    },
                    version: '1.0.0'
                }
            };
            
            azc.register(m_alMock.AZURE_REGISTER_VALUES).then( resp => {
                sinon.assert.calledWith(fakePost, '/azure/o365/azure-subscription-id/azure-resource-group/azure-web-app-name',
                        expectedRegisterBody);
                
                done();
            });
        });
        
        it('Azure deregister', function(done) {
            var aimsc = new AimsC(m_alMock.AL_API, m_alMock.AIMS_CREDS);
            var azc = new AzcollectC(m_alMock.INGEST_ENDPOINT, aimsc, 'ehub');
            const deregValues = {
                web_app_name : 'azure-web-app-name',
                app_tenant_id : 'azure-tenant-id',
                source_id: 'source-id',
                app_resource_group : 'azure-resource-group',
                subscription_id : 'azure-subscription-id',
            };
            
            const expectedDeregBody = {
                body: {
                    app_tenant_id : 'azure-tenant-id',
                    source_id: 'source-id'
                }
            };
            
            azc.deregister(deregValues).then( resp => {
                sinon.assert.calledWith(fakeDel, '/azure/ehub/azure-subscription-id/azure-resource-group/azure-web-app-name', expectedDeregBody);
                done();
            });
        });
                
        it('Azure checkin (no compression)', function(done) {
            var aimsc = new AimsC(m_alMock.AL_API, m_alMock.AIMS_CREDS);
            var azc = new AzcollectC(m_alMock.INGEST_ENDPOINT, aimsc, 'ehub', false);
            var expectedCheckinBody = {
                    body: {
                        version : '1.0.0',
                        app_tenant_id : 'azure-tenant-id',
                        status: 'ok',
                        error_code: undefined,
                        details: [],
                        statistics: undefined
                    }
            };
            azc.checkin(m_alMock.AZURE_CHECKIN_VALUES).then( resp => {
                sinon.assert.calledWith(
                    fakePost,
                    '/azure/ehub/checkin/azure-subscription-id/azure-resource-group/azure-web-app-name',
                    expectedCheckinBody);
                done();
            });
         });

        it('Azure checkin compressed', function(done) {
            var aimsc = new AimsC(m_alMock.AL_API, m_alMock.AIMS_CREDS);
            var azc = new AzcollectC(m_alMock.INGEST_ENDPOINT, aimsc, 'ehub', true);
            
            var expectedCheckin = {
                version : '1.0.0',
                app_tenant_id : 'azure-tenant-id',
                status: 'ok',
                error_code: undefined,
                details: [],
                statistics: undefined
            };
            
            var expectedCompressedBody = zlib.deflateSync(JSON.stringify(expectedCheckin));
            var expectedCheckinBody = {
                json : false,
                headers : {
                    'Content-Encoding' : 'deflate',
                    'Content-Length' : Buffer.byteLength(expectedCompressedBody)
                },
                body: expectedCompressedBody
            };
            azc.checkin(m_alMock.AZURE_CHECKIN_VALUES).then( resp => {
                sinon.assert.calledWith(
                    fakePost,
                    '/azure/ehub/checkin/azure-subscription-id/azure-resource-group/azure-web-app-name',
                    expectedCheckinBody);
                done();
            });
         });

    });

});
