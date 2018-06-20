const assert = require('assert');
const rewire = require('rewire');
const sinon = require('sinon');
const AimsC = require('../al_servicec').AimsC;
const AzcollectC = require('../al_servicec').AzcollectC;
const EndpointsC = require('../al_servicec').EndpointsC;
const m_alMock = require('./al_mock');
const debug = require('debug') ('azcollectc_test');
var servicecRewire = rewire('../al_servicec');
var m_servicec = require('../al_servicec');
var RestServiceClient = require('../al_util').RestServiceClient;

describe('Unit Tests', function() {

    describe('EndpointC', function() {
        var fakeGet;
        var fakeAuth;

        beforeEach(function() {
            fakeAuth = sinon.stub(AimsC.prototype, 'authenticate').callsFake(
                function fakeFn() {
                    return new Promise(function(resolve, reject) {
                        resolve({authentication : {token : 'token'}});
                    });
            });

            fakeGet = sinon.stub(EndpointsC.prototype, 'get').callsFake(
                function fakeFn(path, options) {
                    return new Promise(function(resolve, reject) {
                        resolve('ok');
                    });
            });
        });

        afterEach(function() {
            fakeGet.restore();
            fakeAuth.restore();
        });

        it('getEndpoint', function(done) {
            var aimsc = new AimsC(m_alMock.AL_API, m_alMock.AIMS_CREDS);
            var endpointsC = new EndpointsC(m_alMock.AL_API, aimsc, 'cwe');

            endpointsC.getEndpoint('azcollect', 'default').then( resp => {
                sinon.assert.calledWith(fakeGet,
                    '/residency/default/services/azcollect/endpoint', {}
                );
                done();
            });
        });

    });
});
