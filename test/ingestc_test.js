/* -----------------------------------------------------------------------------
 * @copyright (C) 2018, Alert Logic, Inc
 * @doc
 *
 * Tests for Alert Logic Ingest service client
 *
 * @end
 * -----------------------------------------------------------------------------
 */
const fs = require('fs');
const assert = require('assert');
const sinon = require('sinon');
const AimsC = require('../al_servicec').AimsC;
const IngestC = require('../al_servicec').IngestC;
const m_alMock = require('./al_mock');
const debug = require('debug') ('ingestc_test');
var m_servicec = require('../al_servicec');

describe('Unit Tests', function() {

    describe('IngestC', function() {
        var fakePost;
        var fakeAuth;
        
        beforeEach(function(){
            fakeAuth = sinon.stub(AimsC.prototype, 'authenticate').callsFake(
                function fakeFn() {
                    return new Promise(function(resolve, reject) {
                        resolve(m_alMock.gen_auth_response());
                    });
            });
        });
        afterEach(function(done) {
            fakePost.restore();
            fakeAuth.restore();
            fs.unlink(m_alMock.CACHE_FILENAME, function(err){
                done();
            });
        });

        it('Verify secmsgs body', function(done) {
            fakePost = sinon.stub(m_servicec.AlServiceC.prototype, 'post').callsFake(
                function fakeFn(path, extraOptions) {
                    assert.equal(extraOptions.headers['Content-Type'], 'alertlogic.com/cwe-json');
                    assert.equal(path, '/data/secmsgs');

                    done();
                });

            var aimsc = new AimsC(m_alMock.AL_API, m_alMock.AIMS_CREDS);
            var ingest = new IngestC(m_alMock.INGEST_ENDPOINT, aimsc);
            ingest.sendSecmsgs('testing payload');
        });

        it('Verify vpcflow body', function(done) {
            fakePost = sinon.stub(m_servicec.AlServiceC.prototype, 'post').callsFake(
                function fakeFn(path, extraOptions) {
                    assert.equal(extraOptions.headers['Content-Type'], 'alertlogic.com/cwl-json');
                    assert.equal(path, '/data/vpcflow');

                    done();
                });

            var aimsc = new AimsC(m_alMock.AL_API, m_alMock.AIMS_CREDS);
            var ingest = new IngestC(m_alMock.INGEST_ENDPOINT, aimsc);
            ingest.sendVpcFlow('testing payload');
        });
        
        it('Verify aicspmsgs body', function(done) {
            fakePost = sinon.stub(m_servicec.AlServiceC.prototype, 'post').callsFake(
                function fakeFn(path, extraOptions) {
                    assert.equal(extraOptions.headers['Content-Type'], 'alertlogic.com/pass-through');
                    assert.equal(path, '/data/aicspmsgs');

                    done();
                });

            var aimsc = new AimsC(m_alMock.AL_API, m_alMock.AIMS_CREDS);
            var ingest = new IngestC(m_alMock.INGEST_ENDPOINT, aimsc);
            ingest.sendAicspmsgs('testing payload');
        });

    });
});
