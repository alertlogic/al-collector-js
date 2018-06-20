const fs = require('fs');
const assert = require('assert');
const rewire = require('rewire');
const sinon = require('sinon');
const tk = require('timekeeper');
const AimsC = require('../al_servicec').AimsC;
const AzcollectC = require('../al_servicec').AzcollectC;
const m_alMock = require('./al_mock');
const debug = require('debug') ('azcollectc_test');
var servicecRewire = rewire('../al_servicec');
var m_servicec = require('../al_servicec');
var RestServiceClient = require('../al_util').RestServiceClient;

const INITIAL_TS = 1529572769;
const BEFORE_EXPIRED = (INITIAL_TS + 600) * 1000;
const AFTER_EXPIRED = (INITIAL_TS + m_alMock.AIMS_TOKEN_TTL - 600) * 1000;


describe('Unit Tests', function() {

    describe('AimsC', function() {
        var fakeRest;

        beforeEach(function() {
            tk.freeze(new Date(INITIAL_TS * 1000));

            fakeRest = sinon.stub(RestServiceClient.prototype, 'post').callsFake(
                function fakeFn(path, options) {
                    if (path == '/aims/v1/authenticate' &&
                        options.auth.user == m_alMock.AIMS_AUTH.auth.user &&
                        options.auth.password == m_alMock.AIMS_AUTH.auth.password) {
                        return new Promise(function(resolve, reject) {
                            resolve({
                                authentication : {
                                    token : 'token',
                                    account : {
                                        id : m_alMock.CID
                                    },
                                    token_expiration : Math.ceil(Date.now()/1000 + m_alMock.AIMS_TOKEN_TTL)
                                }
                            });
                        });
                    } else {
                        return new Promise(function(resolve, reject) {
                            reject('error');
                        });
                    }
                }
            );
            clean_file_cache(m_alMock.CACHE_FILENAME);
        });

        afterEach(function() {
            fakeRest.restore();
            tk.reset();
        });

        after(function() {
            clean_file_cache(m_alMock.CACHE_FILENAME);
        });

        it('authenticate with cold cache', function(done) {
            var aimsc = new AimsC(m_alMock.AL_API, m_alMock.AIMS_CREDS);
            assert_cache(aimsc, false, false);
            aimsc.authenticate()
            .then(resp => {
                sinon.assert.calledWith(fakeRest,
                    '/aims/v1/authenticate', m_alMock.AIMS_AUTH
                );
                assert_cache(aimsc, true, true);
                done();
            });
        });

        it('check cid is filled after authenticate() is called', function(done) {
            var aimsc = new AimsC(m_alMock.AL_API, m_alMock.AIMS_CREDS);
            assert.equal(aimsc.cid, null);
            aimsc.authenticate()
            .then(resp => {
                assert.equal(aimsc.cid, m_alMock.CID);
                done();
            });
        });

        it('mem cache: test 1) it is used 2) it is renewed after token is expired', function(done) {
            var aimsc = new AimsC(m_alMock.AL_API, m_alMock.AIMS_CREDS);
            assert_cache(aimsc, false, false);
            aimsc.authenticate()
            .then(resp => {
                sinon.assert.calledWith(fakeRest,
                    '/aims/v1/authenticate', m_alMock.AIMS_AUTH
                );
                tk.travel(BEFORE_EXPIRED);
                assert_cache(aimsc, true, true);
                aimsc.authenticate()
                .then(resp => {
                    sinon.assert.callCount(fakeRest, 1);
                    tk.travel(AFTER_EXPIRED);
                    assert_cache(aimsc, false, false);
                    aimsc.authenticate()
                    .then(resp => {
                        sinon.assert.callCount(fakeRest, 2);
                        assert_cache(aimsc, true, true);
                        done();
                    });
                });
            });
        });


        it('file cache: test 1) it is used 2) it is renewed after token is expired', function(done) {
            var aimsc1 = new AimsC(m_alMock.AL_API, m_alMock.AIMS_CREDS);
            assert_cache(aimsc1, false, false);
            aimsc1.authenticate()
            .then(resp => {
                sinon.assert.calledWith(fakeRest,
                    '/aims/v1/authenticate', m_alMock.AIMS_AUTH
                );
                tk.travel(BEFORE_EXPIRED);
                var aimsc2 = new AimsC(m_alMock.AL_API, m_alMock.AIMS_CREDS);
                assert_cache(aimsc1, true, true);
                assert_cache(aimsc2, false, true);
                aimsc2.authenticate()
                .then(resp => {
                    sinon.assert.callCount(fakeRest, 1);
                    assert_cache(aimsc2, true, true);
                    tk.travel(AFTER_EXPIRED);
                    var aimsc3 = new AimsC(m_alMock.AL_API, m_alMock.AIMS_CREDS);
                    assert_cache(aimsc2, false, false);
                    assert_cache(aimsc3, false, false);
                    aimsc3.authenticate()
                    .then(resp => {
                        sinon.assert.callCount(fakeRest, 2);
                        assert_cache(aimsc2, false, true);
                        assert_cache(aimsc3, true, true);
                        done();
                    });
                });
            });
        });

        it('file cache: test case when cache file is broken', function(done) {
            assert_file_cache_absent(m_alMock.CACHE_FILENAME);
            var aimsc1 = new AimsC(m_alMock.AL_API, m_alMock.AIMS_CREDS);
            assert_cache(aimsc1, false, false);
            aimsc1.authenticate()
            .then(resp => {
                tk.travel(BEFORE_EXPIRED);
                assert_cache(aimsc1, true, true);
                malform_cache_file(m_alMock.CACHE_FILENAME);
                var aimsc2 = new AimsC(m_alMock.AL_API, m_alMock.AIMS_CREDS);
                assert_cache(aimsc1, true, false);
                assert_cache(aimsc2, false, false);
                aimsc2.authenticate()
                .then(resp => {
                    sinon.assert.callCount(fakeRest, 2);
                    assert_cache(aimsc1, true, true);
                    assert_cache(aimsc2, true, true);
                    done();
                });
            });
        });

    });
});


function assert_cache(aimsC, expectedMem, expectedFile) {
    assert.equal(aimsC._isTokenMemCached(), expectedMem);
    assert.equal(aimsC._isTokenFileCached(), expectedFile);
}


function malform_cache_file(filename) {
    fs.writeFileSync(filename, "not-a-json");
}

function assert_file_cache_absent(filename) {
    assert.throws(() => {fs.readFileSync(filename);});
}

function clean_file_cache(filename) {
    try {
        fs.unlinkSync(filename);
    } catch (readErrorException) {
        assert.equal(readErrorException.code, 'ENOENT');
    }
}
