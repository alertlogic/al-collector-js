/* -----------------------------------------------------------------------------
 * @copyright (C) 2018, Alert Logic, Inc
 * @doc
 *
 * Tests for log data processing.
 *
 * @end
 * -----------------------------------------------------------------------------
 */

const assert = require('assert');
const sinon = require('sinon');
const alLog = require('../al_log');
const m_alMock = require('./al_mock');
const m_alService = require('../al_servicec');
const m_alUtil = require('../al_util');


describe('Unit Tests', function() {
    describe('Build log payload', function() {
        var clock;
        
        before(function(){
            clock = sinon.useFakeTimers();
        });
        after(function() {
            clock.restore();
        });

        it('Sunny case ', function(done) {
            var hostTypeElem = {
                key: 'host_type',
                value: {str: 'azure_fun'}
            };
            var localHostnameElem = {
                key: 'local_hostname',
                value: {str: 'somename'}
            };
            var hml = [localHostnameElem, hostTypeElem];
            var msgs = [
                'message1',
                'message2'
            ];
            
            var parseFun = function(m) {
                var messagePayload = {
                  messageTs: 1542138053,
                  priority: 11,
                  progName: 'o365webhook',
                  pid: undefined,
                  message: m,
                  messageType: 'json/azure.o365',
                  messageTypeId: 'AzureActiveDirectory',
                  messageTsUs: undefined
                };
                
                return messagePayload;
            };
            var expectedPayload = 'eJzjamHi4izOLy1KTtXNTBGK5mLPyC8uATFFdm6e97ZBfLqW665Nbkkbdic+E771WoJByYJLhosvJz85MScepDQvMTdViEuKozg/NxXE5pLg4gSJx5dUFqQKcUtxJlaVFqXGp5XmSfkIHtV4Hc0ABLLcQEKJO9/YzLQ8NSkjPz/biCM3tbg4MT3V0Io/qzg/Tx+sTQ+kwknEEcR2TC7JLEt1ySxKTS7JL6okzjQjIk0DAFuCVYc=';
            alLog.buildPayload('host-id', 'source-id', hml, msgs, parseFun, function(err, payload){
                assert.equal(expectedPayload, new Buffer(payload).toString('base64'));
                return done();
            });
        });

        it('Too many messages ', function(done) {
            var hostTypeElem = {
                key: 'host_type',
                value: {str: 'azure_fun'}
            };
            var localHostnameElem = {
                key: 'local_hostname',
                value: {str: 'somename'}
            };
            var hml = [localHostnameElem, hostTypeElem];
            var msgs = [];
            for (let i=0; i<70000; i++){
                msgs.push('very-long-message' + Math.random());
            }
            
            var parseFun = function(m) {
                var messagePayload = {
                  messageTs: 1542138053,
                  priority: 11,
                  progName: 'o365webhook',
                  pid: undefined,
                  message: m,
                  messageType: 'json/azure.o365',
                  messageTypeId: 'AzureActiveDirectory',
                  messageTsUs: undefined
                };
                // Let's make a message bigger
                messagePayload.message = JSON.stringify(messagePayload);
                return messagePayload;
            };
            var expectedPayload = '';
            alLog.buildPayload('host-id', 'source-id', hml, msgs, parseFun, function(err, payload){
                sinon.match(err, 'Maximum payload size exceeded');
                return done();
            });
        });

        it('Wrong hostmeta build error ', function(done) {
            var hostTypeElem = {
                value: {str: 'azure_fun'}
            };
            var localHostnameElem = {
                key: 'local_hostname',
                value: {str: 'somename'}
            };
            var hml = [localHostnameElem, hostTypeElem];
            var msgs = [
                'message1',
                'message2'
            ];
            
            var parseFun = function(m) {
                var messagePayload = {
                  messageTs: 1542138053,
                  priority: 11,
                  progName: 'o365webhook',
                  pid: undefined,
                  message: m,
                  messageType: 'json/azure.o365',
                  messageTypeId: 'AzureActiveDirectory',
                  messageTsUs: undefined
                };
                
                return messagePayload;
            };
            alLog.buildPayload('host-id', 'source-id', hml, msgs, parseFun, function(err, payload){
                assert.equal(err, 'elem.key: string expected');
                return done();
            });
        });

        it('Wrong pasred message build error ', function(done) {
            var localHostnameElem = {
                key: 'local_hostname',
                value: {str: 'somename'}
            };
            var hml = [localHostnameElem];
            var msgs = [
                'message1',
                'message2'
            ];
            
            var parseFun = function(m) {
                var messagePayload = {
                  //messageTs: 1542138053,
                  priority: 11,
                  progName: 'o365webhook',
                  pid: undefined,
                  message: m,
                  messageType: 'json/azure.o365',
                  messageTypeId: 'AzureActiveDirectory',
                  messageTsUs: undefined
                };
                
                return messagePayload;
            };
            alLog.buildPayload('host-id', 'source-id', hml, msgs, parseFun, function(err, payload){
                assert.equal(err, 'messageTs: integer|Long expected');
                return done();
            });
        });

    });
});
