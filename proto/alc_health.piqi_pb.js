/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

var $protobuf = require("protobufjs/minimal");

// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.alc_health = (function() {

    /**
     * Namespace alc_health.
     * @exports alc_health
     * @namespace
     */
    var alc_health = {};

    alc_health.status_update = (function() {

        /**
         * Properties of a status_update.
         * @memberof alc_health
         * @interface Istatus_update
         * @property {alc_health.status} status status_update status
         * @property {number|Long} timestamp status_update timestamp
         * @property {Array.<alc_health.Istatus_update_item>|null} [item] status_update item
         */

        /**
         * Constructs a new status_update.
         * @memberof alc_health
         * @classdesc Represents a status_update.
         * @implements Istatus_update
         * @constructor
         * @param {alc_health.Istatus_update=} [properties] Properties to set
         */
        function status_update(properties) {
            this.item = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * status_update status.
         * @member {alc_health.status} status
         * @memberof alc_health.status_update
         * @instance
         */
        status_update.prototype.status = 0;

        /**
         * status_update timestamp.
         * @member {number|Long} timestamp
         * @memberof alc_health.status_update
         * @instance
         */
        status_update.prototype.timestamp = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

        /**
         * status_update item.
         * @member {Array.<alc_health.Istatus_update_item>} item
         * @memberof alc_health.status_update
         * @instance
         */
        status_update.prototype.item = $util.emptyArray;

        /**
         * Creates a new status_update instance using the specified properties.
         * @function create
         * @memberof alc_health.status_update
         * @static
         * @param {alc_health.Istatus_update=} [properties] Properties to set
         * @returns {alc_health.status_update} status_update instance
         */
        status_update.create = function create(properties) {
            return new status_update(properties);
        };

        /**
         * Encodes the specified status_update message. Does not implicitly {@link alc_health.status_update.verify|verify} messages.
         * @function encode
         * @memberof alc_health.status_update
         * @static
         * @param {alc_health.Istatus_update} message status_update message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        status_update.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            writer.uint32(/* id 1, wireType 0 =*/8).int32(message.status);
            writer.uint32(/* id 2, wireType 0 =*/16).uint64(message.timestamp);
            if (message.item != null && message.item.length)
                for (var i = 0; i < message.item.length; ++i)
                    $root.alc_health.status_update_item.encode(message.item[i], writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified status_update message, length delimited. Does not implicitly {@link alc_health.status_update.verify|verify} messages.
         * @function encodeDelimited
         * @memberof alc_health.status_update
         * @static
         * @param {alc_health.Istatus_update} message status_update message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        status_update.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a status_update message from the specified reader or buffer.
         * @function decode
         * @memberof alc_health.status_update
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {alc_health.status_update} status_update
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        status_update.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.alc_health.status_update();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.status = reader.int32();
                    break;
                case 2:
                    message.timestamp = reader.uint64();
                    break;
                case 3:
                    if (!(message.item && message.item.length))
                        message.item = [];
                    message.item.push($root.alc_health.status_update_item.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            if (!message.hasOwnProperty("status"))
                throw $util.ProtocolError("missing required 'status'", { instance: message });
            if (!message.hasOwnProperty("timestamp"))
                throw $util.ProtocolError("missing required 'timestamp'", { instance: message });
            return message;
        };

        /**
         * Decodes a status_update message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof alc_health.status_update
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {alc_health.status_update} status_update
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        status_update.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a status_update message.
         * @function verify
         * @memberof alc_health.status_update
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        status_update.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            switch (message.status) {
            default:
                return "status: enum value expected";
            case 0:
            case 1:
            case 2:
            case 3:
            case 4:
                break;
            }
            if (!$util.isInteger(message.timestamp) && !(message.timestamp && $util.isInteger(message.timestamp.low) && $util.isInteger(message.timestamp.high)))
                return "timestamp: integer|Long expected";
            if (message.item != null && message.hasOwnProperty("item")) {
                if (!Array.isArray(message.item))
                    return "item: array expected";
                for (var i = 0; i < message.item.length; ++i) {
                    var error = $root.alc_health.status_update_item.verify(message.item[i]);
                    if (error)
                        return "item." + error;
                }
            }
            return null;
        };

        /**
         * Creates a status_update message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof alc_health.status_update
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {alc_health.status_update} status_update
         */
        status_update.fromObject = function fromObject(object) {
            if (object instanceof $root.alc_health.status_update)
                return object;
            var message = new $root.alc_health.status_update();
            switch (object.status) {
            case "STATUS_OK":
            case 0:
                message.status = 0;
                break;
            case "STATUS_WARNING":
            case 1:
                message.status = 1;
                break;
            case "STATUS_ERROR":
            case 2:
                message.status = 2;
                break;
            case "STATUS_OFFLINE":
            case 3:
                message.status = 3;
                break;
            case "STATUS_NEW":
            case 4:
                message.status = 4;
                break;
            }
            if (object.timestamp != null)
                if ($util.Long)
                    (message.timestamp = $util.Long.fromValue(object.timestamp)).unsigned = true;
                else if (typeof object.timestamp === "string")
                    message.timestamp = parseInt(object.timestamp, 10);
                else if (typeof object.timestamp === "number")
                    message.timestamp = object.timestamp;
                else if (typeof object.timestamp === "object")
                    message.timestamp = new $util.LongBits(object.timestamp.low >>> 0, object.timestamp.high >>> 0).toNumber(true);
            if (object.item) {
                if (!Array.isArray(object.item))
                    throw TypeError(".alc_health.status_update.item: array expected");
                message.item = [];
                for (var i = 0; i < object.item.length; ++i) {
                    if (typeof object.item[i] !== "object")
                        throw TypeError(".alc_health.status_update.item: object expected");
                    message.item[i] = $root.alc_health.status_update_item.fromObject(object.item[i]);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from a status_update message. Also converts values to other types if specified.
         * @function toObject
         * @memberof alc_health.status_update
         * @static
         * @param {alc_health.status_update} message status_update
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        status_update.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object.item = [];
            if (options.defaults) {
                object.status = options.enums === String ? "STATUS_OK" : 0;
                if ($util.Long) {
                    var long = new $util.Long(0, 0, true);
                    object.timestamp = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.timestamp = options.longs === String ? "0" : 0;
            }
            if (message.status != null && message.hasOwnProperty("status"))
                object.status = options.enums === String ? $root.alc_health.status[message.status] : message.status;
            if (message.timestamp != null && message.hasOwnProperty("timestamp"))
                if (typeof message.timestamp === "number")
                    object.timestamp = options.longs === String ? String(message.timestamp) : message.timestamp;
                else
                    object.timestamp = options.longs === String ? $util.Long.prototype.toString.call(message.timestamp) : options.longs === Number ? new $util.LongBits(message.timestamp.low >>> 0, message.timestamp.high >>> 0).toNumber(true) : message.timestamp;
            if (message.item && message.item.length) {
                object.item = [];
                for (var j = 0; j < message.item.length; ++j)
                    object.item[j] = $root.alc_health.status_update_item.toObject(message.item[j], options);
            }
            return object;
        };

        /**
         * Converts this status_update to JSON.
         * @function toJSON
         * @memberof alc_health.status_update
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        status_update.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return status_update;
    })();

    /**
     * status enum.
     * @name alc_health.status
     * @enum {string}
     * @property {number} STATUS_OK=0 STATUS_OK value
     * @property {number} STATUS_WARNING=1 STATUS_WARNING value
     * @property {number} STATUS_ERROR=2 STATUS_ERROR value
     * @property {number} STATUS_OFFLINE=3 STATUS_OFFLINE value
     * @property {number} STATUS_NEW=4 STATUS_NEW value
     */
    alc_health.status = (function() {
        var valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "STATUS_OK"] = 0;
        values[valuesById[1] = "STATUS_WARNING"] = 1;
        values[valuesById[2] = "STATUS_ERROR"] = 2;
        values[valuesById[3] = "STATUS_OFFLINE"] = 3;
        values[valuesById[4] = "STATUS_NEW"] = 4;
        return values;
    })();

    alc_health.status_update_item = (function() {

        /**
         * Properties of a status_update_item.
         * @memberof alc_health
         * @interface Istatus_update_item
         * @property {alc_health.status_update_item_type} type status_update_item type
         * @property {string} details status_update_item details
         */

        /**
         * Constructs a new status_update_item.
         * @memberof alc_health
         * @classdesc Represents a status_update_item.
         * @implements Istatus_update_item
         * @constructor
         * @param {alc_health.Istatus_update_item=} [properties] Properties to set
         */
        function status_update_item(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * status_update_item type.
         * @member {alc_health.status_update_item_type} type
         * @memberof alc_health.status_update_item
         * @instance
         */
        status_update_item.prototype.type = 1;

        /**
         * status_update_item details.
         * @member {string} details
         * @memberof alc_health.status_update_item
         * @instance
         */
        status_update_item.prototype.details = "";

        /**
         * Creates a new status_update_item instance using the specified properties.
         * @function create
         * @memberof alc_health.status_update_item
         * @static
         * @param {alc_health.Istatus_update_item=} [properties] Properties to set
         * @returns {alc_health.status_update_item} status_update_item instance
         */
        status_update_item.create = function create(properties) {
            return new status_update_item(properties);
        };

        /**
         * Encodes the specified status_update_item message. Does not implicitly {@link alc_health.status_update_item.verify|verify} messages.
         * @function encode
         * @memberof alc_health.status_update_item
         * @static
         * @param {alc_health.Istatus_update_item} message status_update_item message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        status_update_item.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            writer.uint32(/* id 1, wireType 0 =*/8).int32(message.type);
            writer.uint32(/* id 2, wireType 2 =*/18).string(message.details);
            return writer;
        };

        /**
         * Encodes the specified status_update_item message, length delimited. Does not implicitly {@link alc_health.status_update_item.verify|verify} messages.
         * @function encodeDelimited
         * @memberof alc_health.status_update_item
         * @static
         * @param {alc_health.Istatus_update_item} message status_update_item message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        status_update_item.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a status_update_item message from the specified reader or buffer.
         * @function decode
         * @memberof alc_health.status_update_item
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {alc_health.status_update_item} status_update_item
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        status_update_item.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.alc_health.status_update_item();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.type = reader.int32();
                    break;
                case 2:
                    message.details = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            if (!message.hasOwnProperty("type"))
                throw $util.ProtocolError("missing required 'type'", { instance: message });
            if (!message.hasOwnProperty("details"))
                throw $util.ProtocolError("missing required 'details'", { instance: message });
            return message;
        };

        /**
         * Decodes a status_update_item message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof alc_health.status_update_item
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {alc_health.status_update_item} status_update_item
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        status_update_item.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a status_update_item message.
         * @function verify
         * @memberof alc_health.status_update_item
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        status_update_item.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            switch (message.type) {
            default:
                return "type: enum value expected";
            case 1:
            case 2:
            case 3:
                break;
            }
            if (!$util.isString(message.details))
                return "details: string expected";
            return null;
        };

        /**
         * Creates a status_update_item message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof alc_health.status_update_item
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {alc_health.status_update_item} status_update_item
         */
        status_update_item.fromObject = function fromObject(object) {
            if (object instanceof $root.alc_health.status_update_item)
                return object;
            var message = new $root.alc_health.status_update_item();
            switch (object.type) {
            case "ERROR_UPDATE":
            case 1:
                message.type = 1;
                break;
            case "WARNING_UPDATE":
            case 2:
                message.type = 2;
                break;
            case "INFO_UPDATE":
            case 3:
                message.type = 3;
                break;
            }
            if (object.details != null)
                message.details = String(object.details);
            return message;
        };

        /**
         * Creates a plain object from a status_update_item message. Also converts values to other types if specified.
         * @function toObject
         * @memberof alc_health.status_update_item
         * @static
         * @param {alc_health.status_update_item} message status_update_item
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        status_update_item.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.type = options.enums === String ? "ERROR_UPDATE" : 1;
                object.details = "";
            }
            if (message.type != null && message.hasOwnProperty("type"))
                object.type = options.enums === String ? $root.alc_health.status_update_item_type[message.type] : message.type;
            if (message.details != null && message.hasOwnProperty("details"))
                object.details = message.details;
            return object;
        };

        /**
         * Converts this status_update_item to JSON.
         * @function toJSON
         * @memberof alc_health.status_update_item
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        status_update_item.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return status_update_item;
    })();

    /**
     * status_update_item_type enum.
     * @name alc_health.status_update_item_type
     * @enum {string}
     * @property {number} ERROR_UPDATE=1 ERROR_UPDATE value
     * @property {number} WARNING_UPDATE=2 WARNING_UPDATE value
     * @property {number} INFO_UPDATE=3 INFO_UPDATE value
     */
    alc_health.status_update_item_type = (function() {
        var valuesById = {}, values = Object.create(valuesById);
        values[valuesById[1] = "ERROR_UPDATE"] = 1;
        values[valuesById[2] = "WARNING_UPDATE"] = 2;
        values[valuesById[3] = "INFO_UPDATE"] = 3;
        return values;
    })();

    return alc_health;
})();

module.exports = $root;
