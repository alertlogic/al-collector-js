/* -----------------------------------------------------------------------------
 * @copyright (C) 2021, Alert Logic, Inc
 * @doc
 *
 * Helper log filter utilities for  Alert Logic log collector.
 *
 * @end
 * -----------------------------------------------------------------------------
 */
const lodashFilter = require('lodash.filter');

/**
 *  @function initializes JSON filter
 *
 *  @param filter - string or object, for example, '{"a": 1}', {a:1}
 *
 *  @return filter - inited Json filter or null if json is incorrect
 */
var initJsonFilter = function (filter) {
    if (typeof filter === 'string') {
        try {
            return JSON.parse(filter);
        } catch (exception) {
            return null;
        }
    } else {
        return filter;
    }
};

/**
 *  @function filter messages using JSON like filters.
 *  
 *  @param messages - array of JSON parsed log messages
 *  @param filterString - filter string/object, for example, '{user: \"a\"}'
 *  
 *  @return array - filtered messages
 *  @NOTE: If json filter  is bad then 'messages' is returned unfiltered.
 */

var filterJson = function (messages, filter) {
    const filterJ = initJsonFilter(filter);
    let result = [];
    if (filterJ) {
        if (Array.isArray(filterJ)) {
            filterJ.forEach(function (e) {
                result = result.concat(lodashFilter(messages, e));
            });
        } else {
            result = result.concat(lodashFilter(messages, filterJ));
        }
        return result;
    } else {
        return messages;
    }
};

/**
 *  @function initializes reg exp filter
 *  
 *  @param filter - string or regexp, for example, 'ab+c', /ab+c/
 *  
 *  @return filter - inited regexp or null if regexp is incorrect
 */
var initRegExpFilter = function (filter) {
    if (typeof filter === 'string') {
        try {
            return new RegExp(filter);
        } catch (exception) {
            return null;
        }
    } else {
        return filter;
    }
};

/**
 *  @function filters messages using regexp
 *  
 *  @param messages - array of JSON parsed log messages
 *  @param filter - filter string regexp or regexp object, for example, 'ab+c', /ab+c/
 *  
 *  @return array - filtered messages
 *  @NOTE: If regexp filter is bad then 'messages' is returned unfiltered.
 */

var filterRegExp = function (messages, filter) {
    const re = initRegExpFilter(filter);
    if (re) {
        return messages.filter(function (m) {
            return re.test(m);
        });
    } else {
        return messages;
    }
};


module.exports = {
    filterJson: filterJson,
    filterRegExp: filterRegExp,
    initRegExpFilter: initRegExpFilter,
    initJsonFilter: initJsonFilter
};

