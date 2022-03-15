/* -----------------------------------------------------------------------------
 * @copyright (C) 2021, Alert Logic, Inc
 * @doc
 *
 * Tests for log filtering.
 *
 * @end
 * -----------------------------------------------------------------------------
 */

const assert = require('assert');
const alLogFilter = require('../al_log_filter');


describe('Unit Tests', function() {
    describe('Filter Messages', function() {
        
        const msgJson = [
            { message1: 1, text: 'test1' },
            { message2: 2, text: 'test12'},
            { messageA: "a", text: 'testa'},
            { messageB: {
                childTestMsg: 'childTest',
                childTestValue: 'childValue'
            }, text: 'testb'},
            { messageC: {
                childTestMsg: 'childTest',
                childTestValue: {
                    messageC: "c"
                }
            }, text: 'testb'},
            { messageD: {
                childTestMsg: 'childTestD',
                childTestValue: {
                    messageC: "c"
                }
            }, text: 'testb'}
        ];
        const msgString = [
            'message1',
            'message2',
            'message3'
        ];
        
        before(function(){
        });
        after(function() {
        });

        it('Sunny case ', function(done) {
            assert.deepEqual([{ message1: 1, text: 'test1' }], alLogFilter.filterJson(msgJson, '{"message1":1}'));
            console.log('Filter Regular Expression', alLogFilter.filterRegExp(msgJson, '\/test1'));
            assert.deepEqual(['message1'], alLogFilter.filterRegExp(msgString, '.*1'));
            assert.deepEqual(['message1', 'message2', 'message3'], alLogFilter.filterRegExp(msgString, '^message.*'));
            return done();
        });
        
        it('Wrong JSON filter', function(done) {
            assert.deepEqual(msgJson, alLogFilter.filterJson(msgJson, '{"message1":1'));
            return done();
        });
        
        it('Wrong RegExp filter', function(done) {
            assert.deepEqual(msgString, alLogFilter.filterRegExp(msgString, '['));
            return done();
        });
        
        it('Undefined filters', function (done) {
            assert.deepEqual(msgString, alLogFilter.filterRegExp(msgString, null));
            assert.deepEqual(msgJson, alLogFilter.filterJson(msgJson));
            return done();
        });

        it('Should filter array based on object child property', function (done) {
            assert.deepEqual([{
                messageB: {
                    childTestMsg: 'childTest',
                    childTestValue: 'childValue'
                },
                text: 'testb'
            }], alLogFilter.filterJson(msgJson, '{"messageB":{"childTestMsg":"childTest"}}'));
            return done();
        });

        it('Should filter array based on object child of child property', function (done) {
            assert.deepEqual([{
                messageC: {
                    childTestMsg: 'childTest',
                    childTestValue: {
                        messageC: "c"
                    }
                },
                text: 'testb'
            }], alLogFilter.filterJson(msgJson, '{"messageC":{"childTestMsg": "childTest","childTestValue":{"messageC":"c"}}}'));
            return done();
        });

        it('Should filter array based on array of object with AND case', function (done) {
            assert.deepEqual([{
                messageB: {
                    childTestMsg: 'childTest',
                    childTestValue: 'childValue'
                },
                text: 'testb'
            }, {
                messageC: {
                    childTestMsg: 'childTest',
                    childTestValue: {
                        messageC: "c"
                    }
                },
                text: 'testb'
            }], alLogFilter.filterJson(msgJson, '[{"messageB":{"childTestMsg":"childTest"}}, {"messageC":{"childTestMsg": "childTest","childTestValue":{"messageC":"c"}}}]'));
            return done();
        });

        it('Should filter array based on array of object with OR case', function (done) {
            assert.deepEqual([{
                messageB: {
                    childTestMsg: 'childTest',
                    childTestValue: 'childValue'
                },
                text: 'testb'
            }], alLogFilter.filterJson(msgJson, '[{"messageB":{"childTestMsg":"childTest"}}, {"messageC":{"childTestMsgT": "childTest","childTestValue":{"messageC":"c"}}}]'));
            return done();
        });

        it('Negative case for array based filtering on array of object with OR case(It will behave like AND case)', function (done) {
            assert.deepEqual([{
                messageB: {
                    childTestMsg: 'childTest',
                    childTestValue: 'childValue'
                },
                text: 'testb'
            }, {
                messageC: {
                    childTestMsg: 'childTest',
                    childTestValue: {
                        messageC: "c"
                    }
                },
                text: 'testb'
            }], alLogFilter.filterJson(msgJson, '[{"messageB":{"childTestMsg":"childTest"}}, {"messageC":{"childTestMsg": "childTest","childTestValue":{"messageC":"c"}}}]'));
            return done();
        });
    });
});
