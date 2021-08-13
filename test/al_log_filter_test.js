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
        
        it('Undefined filters', function(done) {
            assert.deepEqual(msgString, alLogFilter.filterRegExp(msgString, null));
            assert.deepEqual(msgJson, alLogFilter.filterJson(msgJson));
            return done();
        });
        
    });
});
