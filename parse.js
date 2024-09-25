/* -----------------------------------------------------------------------------
 * @copyright (C) 2019, Alert Logic, Inc
 * @doc
 *
 * Message parse utilities common for collector functions.
 * Message timestamp and type property paths are based on Azure event schema definitions
 * https://docs.microsoft.com/en-us/azure/azure-monitor/platform/activity-log-schema#mapping-to-diagnostic-logs-schema
 * https://docs.microsoft.com/en-us/azure/azure-monitor/platform/tutorial-dashboards
 *
 * @end
 * -----------------------------------------------------------------------------
 */

/*
 * For the ISO8601 timestamp, '2018-12-19T08:18:21.1834546Z'
 */
const ISO8601_MICROSEC_OFFSET = 20;
const MILLISECONDS_SINCE_EPOCH = 1000000000000;
const MAX_MILLISECONDS_SINCE_EPOCH = 9999999999999;
const SECONDS_SINCE_EPOCH = 1000000000;

var getProp = function(path, obj, defaultVal = null) {
    var reduceFun = function(xs, x) {
        return (xs && (xs[x] || xs[x] === 0)) ? xs[x] : defaultVal;
    };
    return path.reduce(reduceFun, obj);
};

var defaultTs = function() {
    return {
        sec: Math.floor(Date.now() / 1000),
        usec: null
    };
};

var parseTs = function (ts) {
    // Handle numeric timestamp (seconds or milliseconds)
    if (typeof ts === 'number') {
        if (ts >= MILLISECONDS_SINCE_EPOCH && ts <= MAX_MILLISECONDS_SINCE_EPOCH) {
            return {
                sec: Math.floor(ts / 1000),
                usec: (ts % 1000) * 1000 || null
            };
        }
        if (ts >= SECONDS_SINCE_EPOCH && ts <= MILLISECONDS_SINCE_EPOCH) {
            return {
                sec: ts,
                usec: null
            };
        }
        return defaultTs();
    } else {
        const milli = Date.parse(ts);
        const micro = parseTsUsec(ts);
        if (isNaN(milli)) {
            return defaultTs();
        }
        return {
            sec: Math.floor(milli / 1000),
            usec: micro
        };
    }
};

var parseTsUsec = function(ts) {
    var micro = null;
    try {
        // extracts microseconds from ISO8601 timestamp, like '2018-12-19T08:18:21.1834546Z'
        if (ts.length > ISO8601_MICROSEC_OFFSET) {
            var microStr = ts.slice(ISO8601_MICROSEC_OFFSET, ISO8601_MICROSEC_OFFSET + 6).replace(/Z|\+.*$/g, '');
            while (microStr && microStr.length > 0 && microStr.length < 6) {
                microStr += '0';
            }
            micro = Number.parseInt(microStr);
            micro = Number.isInteger(micro) ? micro : null;
        }
        return micro;
    } catch (err) {
        // Unable to get microseconds from a timestamp. Do nothing.
        return null;
    }
};

var iteratePropPaths = function(paths, msg) {
    return paths.reduce(function(acc, v) {
        if (acc || acc === 0) {
            return acc;
        } else {
            const propVal = getProp(v.path, msg);
            if (v.override) {
                return propVal ? v.override : propVal;
            } else {
                return propVal;
            }
        }
    }, null);
};

var getMsgTs = function(msg, tsPaths) {
    var msgTs = iteratePropPaths(tsPaths, msg);
    return msgTs ? parseTs(msgTs) : defaultTs();
};

var getMsgTypeId = function(msg, typeIdPaths, defaultVal = null) {
    var msgType = iteratePropPaths(typeIdPaths, msg);
    return msgType || msgType === 0 ? msgType : defaultVal;
};

module.exports = {
    iteratePropPaths: iteratePropPaths,
    getMsgTs: getMsgTs,
    getMsgTypeId: getMsgTypeId
};

