/* -----------------------------------------------------------------------------
 * @copyright (C) 2018, Alert Logic, Inc
 * @doc
 *
 * Tests for request retry
 *
 * @end
 * -----------------------------------------------------------------------------
 */

const fs = require('fs');
const assert = require('assert');
const nock = require('nock');
const m_alMock = require('./al_mock');
const m_alService = require('../al_servicec');

describe('HTTP request retry tests', function() {
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

    it('No retries on success', function(done) {
        nock('https://' + m_alMock.AL_API)
            .post('/aims/v1/authenticate')
            .reply(200, m_alMock.AIMS_RESPONSE_200)
            .post('/aims/v1/authenticate')
            .reply(401, {statusCode: 401});
        var retryOptions = {
            minTimeout: 2000,
            retries: 5,
            maxTimeout: 30000
        };
        
        var aimsc = new m_alService.AimsC(
                m_alMock.AL_API, m_alMock.AIMS_CREDS, '/tmp', retryOptions);
        aimsc.authenticate()
            .then(resp => {
                assert.equal(resp.authentication.user.name, 'user-name');
                return done();
            });
    });
    
    it('No retries on success with default retry config', function(done) {
        nock('https://' + m_alMock.AL_API)
            .post('/aims/v1/authenticate')
            .reply(200, m_alMock.AIMS_RESPONSE_200)
            .post('/aims/v1/authenticate')
            .reply(401, {statusCode: 401});
        var aimsc = new m_alService.AimsC(
                m_alMock.AL_API, m_alMock.AIMS_CREDS, '/tmp');
        aimsc.authenticate()
            .then(resp => {
                assert.equal(resp.authentication.user.name, 'user-name');
                return done();
            });
    });
    
    it('Retry 500 with default retry config', function(done) {
        this.timeout(4000);
        nock('https://' + m_alMock.AL_API)
            .post('/aims/v1/authenticate')
            .reply(500, {statusCode: 500})
            .post('/aims/v1/authenticate')
            .reply(201, m_alMock.AIMS_RESPONSE_200);
        
        var aimsc = new m_alService.AimsC(
                m_alMock.AL_API, m_alMock.AIMS_CREDS, '/tmp');
        aimsc.authenticate()
            .then(resp => {
                assert.equal(resp.authentication.user.name, 'user-name');
                return done();
            });
    });
    
    it('Retry errno with default retry config', function(done) {
        this.timeout(4000);
        nock('https://' + m_alMock.AL_API)
            .post('/aims/v1/authenticate')
            .replyWithError({errno: 'ENOTFOUND'})
            .post('/aims/v1/authenticate')
            .reply(201, m_alMock.AIMS_RESPONSE_200);
        
        var aimsc = new m_alService.AimsC(
                m_alMock.AL_API, m_alMock.AIMS_CREDS, '/tmp');
        aimsc.authenticate()
            .then(resp => {
                assert.equal(resp.authentication.user.name, 'user-name');
                return done();
            });
    });
    
    it('Do not retry 4XX with default retry config', function(done) {
        nock('https://' + m_alMock.AL_API)
            .post('/aims/v1/authenticate')
            .reply(401, {statusCode: 401})
            .post('/aims/v1/authenticate')
            .reply(201, m_alMock.AIMS_RESPONSE_200);
        
        var aimsc = new m_alService.AimsC(
                m_alMock.AL_API, m_alMock.AIMS_CREDS, '/tmp');
        
        aimsc.authenticate()
            .then(resp => {
                assert.equal(true, 'Expecting 401');
                return done();
            })
            .catch(err => {
                assert.equal(err.statusCode, 401);
                return done();
            });
    });
    
    it('Test custom retry callback gets called on 200', function(done) {
        var customRetryCode = 111;
        nock('https://' + m_alMock.AL_API)
            .post('/aims/v1/authenticate')
            .reply(200, {retryCode: customRetryCode})
            .post('/aims/v1/authenticate')
            .reply(201, m_alMock.AIMS_RESPONSE_200);
        var customRetry = function(resp) {
            if (resp.retryCode == customRetryCode) {
                return true;
            } else {
                return false;
            }
        };
        var retryOptions = {
                minTimeout: 500,
                retries: 1,
                retryCb: customRetry
            };
        
        var aimsc = new m_alService.AimsC(
                m_alMock.AL_API, m_alMock.AIMS_CREDS, '/tmp', retryOptions);
        
        aimsc.authenticate()
            .then(resp => {
                assert.equal(resp.authentication.user.name, 'user-name');
                return done();
            });
    });
    
    it('Test custom retry callback gets called on error', function(done) {
        var customRetryCode = 'ECUSTOM';
        nock('https://' + m_alMock.AL_API)
            .post('/aims/v1/authenticate')
            .replyWithError({customError: customRetryCode})
            .post('/aims/v1/authenticate')
            .reply(201, m_alMock.AIMS_RESPONSE_200);
        var customRetry = function(resp) {
            if (resp.error.customError == customRetryCode) {
                return false;
            } else {
                return true;
            }
        };
        var retryOptions = {
                minTimeout: 500,
                retries: 1,
                retryCb: customRetry
            };
        
        var aimsc = new m_alService.AimsC(
                m_alMock.AL_API, m_alMock.AIMS_CREDS, '/tmp', retryOptions);
        
        aimsc.authenticate()
            .then(resp => {
                assert.equal(true, 'Expecting an error to happen.');
                return done();
            })
            .catch(err =>{
                assert.equal(err.error.customError, customRetryCode);
                return done();
            });
    });
});
