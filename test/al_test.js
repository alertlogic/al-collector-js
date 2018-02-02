
const assert = require('assert');
const rewire = require('rewire');
const sinon = require('sinon');
const m_aimsc = require('../al_servicec').AimsC;
const alMock = require('./al_mock');
const debug = require('debug') ('al_test');
var servicecRewire = rewire('../al_servicec');
var m_servicec = require('../al_servicec');

describe('Unit Tests', function() {

    describe('IngestC', function() {
        var fakePost;

        afterEach(function() {
            fakePost.restore();
        });

        it('Verify secmsgs body', function(done) {
            fakePost = sinon.stub(m_servicec.AlServiceC.prototype, 'post').callsFake(
                function fakeFn(path, extraOptions) {
                    assert.equal(extraOptions.headers['Content-Type'], 'alertlogic.com/cwe-json');
                    assert.equal(path, `/data/secmsgs`);

                    done();
                });

            var ingest = new m_servicec.IngestC(alMock.INGEST_ENDPOINT, alMock.AIMS_CREDS);
            ingest.sendSecmsgs("testing payload");
        });

        it('Verify vpcflow body', function(done) {
            fakePost = sinon.stub(m_servicec.AlServiceC.prototype, 'post').callsFake(
                function fakeFn(path, extraOptions) {
                    assert.equal(extraOptions.headers['Content-Type'], 'alertlogic.com/cwl-json');
                    assert.equal(path, `/data/vpcflow`);

                    done();
                });

            var ingest = new m_servicec.IngestC(alMock.INGEST_ENDPOINT, alMock.AIMS_CREDS);
            ingest.sendVpcFlow("testing payload");
        });

    });
});
