/* -----------------------------------------------------------------------------
 * @copyright (C) 2021, Alert Logic, Inc
 * @doc
 *
 * Helper log filter utilities for  Alert Logic log collector.
 *
 * @end
 * -----------------------------------------------------------------------------
 */
const where = require('lodash.where');

/**
 *  @function filter messages using JSON like filters.
 *  
 *  @param messages - array of JSON parsed log messages
 *  @param filterString - filter string, for example, '{user: \"a\"}'
 *  
 *  @return array - filtered messages
 *  @NOTE: If json filter  is bad then 'messages' is returned unfiltered.
 */

var filterJson = function (messages, filterString) {
    
    try {
        const filterJ = JSON.parse(filterString);
        return where(messages, filterJ);
    }
    catch (exception) {
        return messages;
    }
};

/**
 *  @function filters messages using regexp
 *  
 *  @param messages - array of JSON parsed log messages
 *  @param filterRegExp - filter string regexp, for example, 'ab+c'
 *  
 *  @return array - filtered messages
 *  @NOTE: If regexp filter is bad then 'messages' is returned unfiltered.
 */

var filterRegExp = function (messages, regExp) {
    try {
        const re = new RegExp(regExp);
        return messages.filter(function(m) { return re.test(m); });
    } catch (exception) {
        return messages;
    }
};

module.exports = {
    filterJson : filterJson,
    filterRegExp : filterRegExp
};

