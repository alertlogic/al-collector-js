/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

var $protobuf = require("protobufjs/minimal");

// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.host_metadata = (function() {

    /**
     * Namespace host_metadata.
     * @exports host_metadata
     * @namespace
     */
    var host_metadata = {};

    host_metadata.metadata = (function() {

        /**
         * Properties of a metadata.
         * @memberof host_metadata
         * @interface Imetadata
         * @property {string|null} [hostUuid] metadata hostUuid
         * @property {Uint8Array} dataChecksum metadata dataChecksum
         * @property {number|Long|null} [timestamp] metadata timestamp
         * @property {alc_dict.Idict|null} [data] metadata data
         */

        /**
         * Constructs a new metadata.
         * @memberof host_metadata
         * @classdesc Represents a metadata.
         * @implements Imetadata
         * @constructor
         * @param {host_metadata.Imetadata=} [properties] Properties to set
         */
        function metadata(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * metadata hostUuid.
         * @member {string} hostUuid
         * @memberof host_metadata.metadata
         * @instance
         */
        metadata.prototype.hostUuid = "";

        /**
         * metadata dataChecksum.
         * @member {Uint8Array} dataChecksum
         * @memberof host_metadata.metadata
         * @instance
         */
        metadata.prototype.dataChecksum = $util.newBuffer([]);

        /**
         * metadata timestamp.
         * @member {number|Long} timestamp
         * @memberof host_metadata.metadata
         * @instance
         */
        metadata.prototype.timestamp = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

        /**
         * metadata data.
         * @member {alc_dict.Idict|null|undefined} data
         * @memberof host_metadata.metadata
         * @instance
         */
        metadata.prototype.data = null;

        /**
         * Creates a new metadata instance using the specified properties.
         * @function create
         * @memberof host_metadata.metadata
         * @static
         * @param {host_metadata.Imetadata=} [properties] Properties to set
         * @returns {host_metadata.metadata} metadata instance
         */
        metadata.create = function create(properties) {
            return new metadata(properties);
        };

        /**
         * Encodes the specified metadata message. Does not implicitly {@link host_metadata.metadata.verify|verify} messages.
         * @function encode
         * @memberof host_metadata.metadata
         * @static
         * @param {host_metadata.Imetadata} message metadata message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        metadata.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.hostUuid != null && message.hasOwnProperty("hostUuid"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.hostUuid);
            writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.dataChecksum);
            if (message.timestamp != null && message.hasOwnProperty("timestamp"))
                writer.uint32(/* id 3, wireType 0 =*/24).uint64(message.timestamp);
            if (message.data != null && message.hasOwnProperty("data"))
                $root.alc_dict.dict.encode(message.data, writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified metadata message, length delimited. Does not implicitly {@link host_metadata.metadata.verify|verify} messages.
         * @function encodeDelimited
         * @memberof host_metadata.metadata
         * @static
         * @param {host_metadata.Imetadata} message metadata message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        metadata.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a metadata message from the specified reader or buffer.
         * @function decode
         * @memberof host_metadata.metadata
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {host_metadata.metadata} metadata
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        metadata.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.host_metadata.metadata();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.hostUuid = reader.string();
                    break;
                case 2:
                    message.dataChecksum = reader.bytes();
                    break;
                case 3:
                    message.timestamp = reader.uint64();
                    break;
                case 4:
                    message.data = $root.alc_dict.dict.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            if (!message.hasOwnProperty("dataChecksum"))
                throw $util.ProtocolError("missing required 'dataChecksum'", { instance: message });
            return message;
        };

        /**
         * Decodes a metadata message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof host_metadata.metadata
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {host_metadata.metadata} metadata
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        metadata.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a metadata message.
         * @function verify
         * @memberof host_metadata.metadata
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        metadata.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.hostUuid != null && message.hasOwnProperty("hostUuid"))
                if (!$util.isString(message.hostUuid))
                    return "hostUuid: string expected";
            if (!(message.dataChecksum && typeof message.dataChecksum.length === "number" || $util.isString(message.dataChecksum)))
                return "dataChecksum: buffer expected";
            if (message.timestamp != null && message.hasOwnProperty("timestamp"))
                if (!$util.isInteger(message.timestamp) && !(message.timestamp && $util.isInteger(message.timestamp.low) && $util.isInteger(message.timestamp.high)))
                    return "timestamp: integer|Long expected";
            if (message.data != null && message.hasOwnProperty("data")) {
                var error = $root.alc_dict.dict.verify(message.data);
                if (error)
                    return "data." + error;
            }
            return null;
        };

        /**
         * Creates a metadata message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof host_metadata.metadata
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {host_metadata.metadata} metadata
         */
        metadata.fromObject = function fromObject(object) {
            if (object instanceof $root.host_metadata.metadata)
                return object;
            var message = new $root.host_metadata.metadata();
            if (object.hostUuid != null)
                message.hostUuid = String(object.hostUuid);
            if (object.dataChecksum != null)
                if (typeof object.dataChecksum === "string")
                    $util.base64.decode(object.dataChecksum, message.dataChecksum = $util.newBuffer($util.base64.length(object.dataChecksum)), 0);
                else if (object.dataChecksum.length)
                    message.dataChecksum = object.dataChecksum;
            if (object.timestamp != null)
                if ($util.Long)
                    (message.timestamp = $util.Long.fromValue(object.timestamp)).unsigned = true;
                else if (typeof object.timestamp === "string")
                    message.timestamp = parseInt(object.timestamp, 10);
                else if (typeof object.timestamp === "number")
                    message.timestamp = object.timestamp;
                else if (typeof object.timestamp === "object")
                    message.timestamp = new $util.LongBits(object.timestamp.low >>> 0, object.timestamp.high >>> 0).toNumber(true);
            if (object.data != null) {
                if (typeof object.data !== "object")
                    throw TypeError(".host_metadata.metadata.data: object expected");
                message.data = $root.alc_dict.dict.fromObject(object.data);
            }
            return message;
        };

        /**
         * Creates a plain object from a metadata message. Also converts values to other types if specified.
         * @function toObject
         * @memberof host_metadata.metadata
         * @static
         * @param {host_metadata.metadata} message metadata
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        metadata.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.hostUuid = "";
                if (options.bytes === String)
                    object.dataChecksum = "";
                else {
                    object.dataChecksum = [];
                    if (options.bytes !== Array)
                        object.dataChecksum = $util.newBuffer(object.dataChecksum);
                }
                if ($util.Long) {
                    var long = new $util.Long(0, 0, true);
                    object.timestamp = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.timestamp = options.longs === String ? "0" : 0;
                object.data = null;
            }
            if (message.hostUuid != null && message.hasOwnProperty("hostUuid"))
                object.hostUuid = message.hostUuid;
            if (message.dataChecksum != null && message.hasOwnProperty("dataChecksum"))
                object.dataChecksum = options.bytes === String ? $util.base64.encode(message.dataChecksum, 0, message.dataChecksum.length) : options.bytes === Array ? Array.prototype.slice.call(message.dataChecksum) : message.dataChecksum;
            if (message.timestamp != null && message.hasOwnProperty("timestamp"))
                if (typeof message.timestamp === "number")
                    object.timestamp = options.longs === String ? String(message.timestamp) : message.timestamp;
                else
                    object.timestamp = options.longs === String ? $util.Long.prototype.toString.call(message.timestamp) : options.longs === Number ? new $util.LongBits(message.timestamp.low >>> 0, message.timestamp.high >>> 0).toNumber(true) : message.timestamp;
            if (message.data != null && message.hasOwnProperty("data"))
                object.data = $root.alc_dict.dict.toObject(message.data, options);
            return object;
        };

        /**
         * Converts this metadata to JSON.
         * @function toJSON
         * @memberof host_metadata.metadata
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        metadata.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return metadata;
    })();

    return host_metadata;
})();

$root.alc_dict = (function() {

    /**
     * Namespace alc_dict.
     * @exports alc_dict
     * @namespace
     */
    var alc_dict = {};

    alc_dict.dict = (function() {

        /**
         * Properties of a dict.
         * @memberof alc_dict
         * @interface Idict
         * @property {Array.<alc_dict.Ielem>|null} [elem] dict elem
         */

        /**
         * Constructs a new dict.
         * @memberof alc_dict
         * @classdesc Represents a dict.
         * @implements Idict
         * @constructor
         * @param {alc_dict.Idict=} [properties] Properties to set
         */
        function dict(properties) {
            this.elem = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * dict elem.
         * @member {Array.<alc_dict.Ielem>} elem
         * @memberof alc_dict.dict
         * @instance
         */
        dict.prototype.elem = $util.emptyArray;

        /**
         * Creates a new dict instance using the specified properties.
         * @function create
         * @memberof alc_dict.dict
         * @static
         * @param {alc_dict.Idict=} [properties] Properties to set
         * @returns {alc_dict.dict} dict instance
         */
        dict.create = function create(properties) {
            return new dict(properties);
        };

        /**
         * Encodes the specified dict message. Does not implicitly {@link alc_dict.dict.verify|verify} messages.
         * @function encode
         * @memberof alc_dict.dict
         * @static
         * @param {alc_dict.Idict} message dict message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        dict.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.elem != null && message.elem.length)
                for (var i = 0; i < message.elem.length; ++i)
                    $root.alc_dict.elem.encode(message.elem[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified dict message, length delimited. Does not implicitly {@link alc_dict.dict.verify|verify} messages.
         * @function encodeDelimited
         * @memberof alc_dict.dict
         * @static
         * @param {alc_dict.Idict} message dict message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        dict.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a dict message from the specified reader or buffer.
         * @function decode
         * @memberof alc_dict.dict
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {alc_dict.dict} dict
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        dict.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.alc_dict.dict();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    if (!(message.elem && message.elem.length))
                        message.elem = [];
                    message.elem.push($root.alc_dict.elem.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a dict message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof alc_dict.dict
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {alc_dict.dict} dict
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        dict.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a dict message.
         * @function verify
         * @memberof alc_dict.dict
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        dict.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.elem != null && message.hasOwnProperty("elem")) {
                if (!Array.isArray(message.elem))
                    return "elem: array expected";
                for (var i = 0; i < message.elem.length; ++i) {
                    var error = $root.alc_dict.elem.verify(message.elem[i]);
                    if (error)
                        return "elem." + error;
                }
            }
            return null;
        };

        /**
         * Creates a dict message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof alc_dict.dict
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {alc_dict.dict} dict
         */
        dict.fromObject = function fromObject(object) {
            if (object instanceof $root.alc_dict.dict)
                return object;
            var message = new $root.alc_dict.dict();
            if (object.elem) {
                if (!Array.isArray(object.elem))
                    throw TypeError(".alc_dict.dict.elem: array expected");
                message.elem = [];
                for (var i = 0; i < object.elem.length; ++i) {
                    if (typeof object.elem[i] !== "object")
                        throw TypeError(".alc_dict.dict.elem: object expected");
                    message.elem[i] = $root.alc_dict.elem.fromObject(object.elem[i]);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from a dict message. Also converts values to other types if specified.
         * @function toObject
         * @memberof alc_dict.dict
         * @static
         * @param {alc_dict.dict} message dict
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        dict.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object.elem = [];
            if (message.elem && message.elem.length) {
                object.elem = [];
                for (var j = 0; j < message.elem.length; ++j)
                    object.elem[j] = $root.alc_dict.elem.toObject(message.elem[j], options);
            }
            return object;
        };

        /**
         * Converts this dict to JSON.
         * @function toJSON
         * @memberof alc_dict.dict
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        dict.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return dict;
    })();

    alc_dict.elem = (function() {

        /**
         * Properties of an elem.
         * @memberof alc_dict
         * @interface Ielem
         * @property {string} key elem key
         * @property {alc_dict.Ivalue|null} [value] elem value
         */

        /**
         * Constructs a new elem.
         * @memberof alc_dict
         * @classdesc Represents an elem.
         * @implements Ielem
         * @constructor
         * @param {alc_dict.Ielem=} [properties] Properties to set
         */
        function elem(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * elem key.
         * @member {string} key
         * @memberof alc_dict.elem
         * @instance
         */
        elem.prototype.key = "";

        /**
         * elem value.
         * @member {alc_dict.Ivalue|null|undefined} value
         * @memberof alc_dict.elem
         * @instance
         */
        elem.prototype.value = null;

        /**
         * Creates a new elem instance using the specified properties.
         * @function create
         * @memberof alc_dict.elem
         * @static
         * @param {alc_dict.Ielem=} [properties] Properties to set
         * @returns {alc_dict.elem} elem instance
         */
        elem.create = function create(properties) {
            return new elem(properties);
        };

        /**
         * Encodes the specified elem message. Does not implicitly {@link alc_dict.elem.verify|verify} messages.
         * @function encode
         * @memberof alc_dict.elem
         * @static
         * @param {alc_dict.Ielem} message elem message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        elem.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            writer.uint32(/* id 1, wireType 2 =*/10).string(message.key);
            if (message.value != null && message.hasOwnProperty("value"))
                $root.alc_dict.value.encode(message.value, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified elem message, length delimited. Does not implicitly {@link alc_dict.elem.verify|verify} messages.
         * @function encodeDelimited
         * @memberof alc_dict.elem
         * @static
         * @param {alc_dict.Ielem} message elem message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        elem.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an elem message from the specified reader or buffer.
         * @function decode
         * @memberof alc_dict.elem
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {alc_dict.elem} elem
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        elem.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.alc_dict.elem();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.key = reader.string();
                    break;
                case 2:
                    message.value = $root.alc_dict.value.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            if (!message.hasOwnProperty("key"))
                throw $util.ProtocolError("missing required 'key'", { instance: message });
            return message;
        };

        /**
         * Decodes an elem message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof alc_dict.elem
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {alc_dict.elem} elem
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        elem.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an elem message.
         * @function verify
         * @memberof alc_dict.elem
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        elem.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (!$util.isString(message.key))
                return "key: string expected";
            if (message.value != null && message.hasOwnProperty("value")) {
                var error = $root.alc_dict.value.verify(message.value);
                if (error)
                    return "value." + error;
            }
            return null;
        };

        /**
         * Creates an elem message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof alc_dict.elem
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {alc_dict.elem} elem
         */
        elem.fromObject = function fromObject(object) {
            if (object instanceof $root.alc_dict.elem)
                return object;
            var message = new $root.alc_dict.elem();
            if (object.key != null)
                message.key = String(object.key);
            if (object.value != null) {
                if (typeof object.value !== "object")
                    throw TypeError(".alc_dict.elem.value: object expected");
                message.value = $root.alc_dict.value.fromObject(object.value);
            }
            return message;
        };

        /**
         * Creates a plain object from an elem message. Also converts values to other types if specified.
         * @function toObject
         * @memberof alc_dict.elem
         * @static
         * @param {alc_dict.elem} message elem
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        elem.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.key = "";
                object.value = null;
            }
            if (message.key != null && message.hasOwnProperty("key"))
                object.key = message.key;
            if (message.value != null && message.hasOwnProperty("value"))
                object.value = $root.alc_dict.value.toObject(message.value, options);
            return object;
        };

        /**
         * Converts this elem to JSON.
         * @function toJSON
         * @memberof alc_dict.elem
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        elem.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return elem;
    })();

    alc_dict.value = (function() {

        /**
         * Properties of a value.
         * @memberof alc_dict
         * @interface Ivalue
         * @property {alc_dict.Idict|null} [dict] value dict
         * @property {alc_dict.Ilist|null} [list] value list
         * @property {string|null} [str] value str
         * @property {boolean|null} [b] value b
         * @property {number|null} [i] value i
         */

        /**
         * Constructs a new value.
         * @memberof alc_dict
         * @classdesc Represents a value.
         * @implements Ivalue
         * @constructor
         * @param {alc_dict.Ivalue=} [properties] Properties to set
         */
        function value(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * value dict.
         * @member {alc_dict.Idict|null|undefined} dict
         * @memberof alc_dict.value
         * @instance
         */
        value.prototype.dict = null;

        /**
         * value list.
         * @member {alc_dict.Ilist|null|undefined} list
         * @memberof alc_dict.value
         * @instance
         */
        value.prototype.list = null;

        /**
         * value str.
         * @member {string} str
         * @memberof alc_dict.value
         * @instance
         */
        value.prototype.str = "";

        /**
         * value b.
         * @member {boolean} b
         * @memberof alc_dict.value
         * @instance
         */
        value.prototype.b = false;

        /**
         * value i.
         * @member {number} i
         * @memberof alc_dict.value
         * @instance
         */
        value.prototype.i = 0;

        /**
         * Creates a new value instance using the specified properties.
         * @function create
         * @memberof alc_dict.value
         * @static
         * @param {alc_dict.Ivalue=} [properties] Properties to set
         * @returns {alc_dict.value} value instance
         */
        value.create = function create(properties) {
            return new value(properties);
        };

        /**
         * Encodes the specified value message. Does not implicitly {@link alc_dict.value.verify|verify} messages.
         * @function encode
         * @memberof alc_dict.value
         * @static
         * @param {alc_dict.Ivalue} message value message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        value.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.dict != null && message.hasOwnProperty("dict"))
                $root.alc_dict.dict.encode(message.dict, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            if (message.list != null && message.hasOwnProperty("list"))
                $root.alc_dict.list.encode(message.list, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            if (message.str != null && message.hasOwnProperty("str"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.str);
            if (message.b != null && message.hasOwnProperty("b"))
                writer.uint32(/* id 4, wireType 0 =*/32).bool(message.b);
            if (message.i != null && message.hasOwnProperty("i"))
                writer.uint32(/* id 5, wireType 0 =*/40).sint32(message.i);
            return writer;
        };

        /**
         * Encodes the specified value message, length delimited. Does not implicitly {@link alc_dict.value.verify|verify} messages.
         * @function encodeDelimited
         * @memberof alc_dict.value
         * @static
         * @param {alc_dict.Ivalue} message value message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        value.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a value message from the specified reader or buffer.
         * @function decode
         * @memberof alc_dict.value
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {alc_dict.value} value
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        value.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.alc_dict.value();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.dict = $root.alc_dict.dict.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.list = $root.alc_dict.list.decode(reader, reader.uint32());
                    break;
                case 3:
                    message.str = reader.string();
                    break;
                case 4:
                    message.b = reader.bool();
                    break;
                case 5:
                    message.i = reader.sint32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a value message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof alc_dict.value
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {alc_dict.value} value
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        value.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a value message.
         * @function verify
         * @memberof alc_dict.value
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        value.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.dict != null && message.hasOwnProperty("dict")) {
                var error = $root.alc_dict.dict.verify(message.dict);
                if (error)
                    return "dict." + error;
            }
            if (message.list != null && message.hasOwnProperty("list")) {
                var error = $root.alc_dict.list.verify(message.list);
                if (error)
                    return "list." + error;
            }
            if (message.str != null && message.hasOwnProperty("str"))
                if (!$util.isString(message.str))
                    return "str: string expected";
            if (message.b != null && message.hasOwnProperty("b"))
                if (typeof message.b !== "boolean")
                    return "b: boolean expected";
            if (message.i != null && message.hasOwnProperty("i"))
                if (!$util.isInteger(message.i))
                    return "i: integer expected";
            return null;
        };

        /**
         * Creates a value message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof alc_dict.value
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {alc_dict.value} value
         */
        value.fromObject = function fromObject(object) {
            if (object instanceof $root.alc_dict.value)
                return object;
            var message = new $root.alc_dict.value();
            if (object.dict != null) {
                if (typeof object.dict !== "object")
                    throw TypeError(".alc_dict.value.dict: object expected");
                message.dict = $root.alc_dict.dict.fromObject(object.dict);
            }
            if (object.list != null) {
                if (typeof object.list !== "object")
                    throw TypeError(".alc_dict.value.list: object expected");
                message.list = $root.alc_dict.list.fromObject(object.list);
            }
            if (object.str != null)
                message.str = String(object.str);
            if (object.b != null)
                message.b = Boolean(object.b);
            if (object.i != null)
                message.i = object.i | 0;
            return message;
        };

        /**
         * Creates a plain object from a value message. Also converts values to other types if specified.
         * @function toObject
         * @memberof alc_dict.value
         * @static
         * @param {alc_dict.value} message value
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        value.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.dict = null;
                object.list = null;
                object.str = "";
                object.b = false;
                object.i = 0;
            }
            if (message.dict != null && message.hasOwnProperty("dict"))
                object.dict = $root.alc_dict.dict.toObject(message.dict, options);
            if (message.list != null && message.hasOwnProperty("list"))
                object.list = $root.alc_dict.list.toObject(message.list, options);
            if (message.str != null && message.hasOwnProperty("str"))
                object.str = message.str;
            if (message.b != null && message.hasOwnProperty("b"))
                object.b = message.b;
            if (message.i != null && message.hasOwnProperty("i"))
                object.i = message.i;
            return object;
        };

        /**
         * Converts this value to JSON.
         * @function toJSON
         * @memberof alc_dict.value
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        value.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return value;
    })();

    alc_dict.list = (function() {

        /**
         * Properties of a list.
         * @memberof alc_dict
         * @interface Ilist
         * @property {Array.<alc_dict.Ivalue>|null} [elem] list elem
         */

        /**
         * Constructs a new list.
         * @memberof alc_dict
         * @classdesc Represents a list.
         * @implements Ilist
         * @constructor
         * @param {alc_dict.Ilist=} [properties] Properties to set
         */
        function list(properties) {
            this.elem = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * list elem.
         * @member {Array.<alc_dict.Ivalue>} elem
         * @memberof alc_dict.list
         * @instance
         */
        list.prototype.elem = $util.emptyArray;

        /**
         * Creates a new list instance using the specified properties.
         * @function create
         * @memberof alc_dict.list
         * @static
         * @param {alc_dict.Ilist=} [properties] Properties to set
         * @returns {alc_dict.list} list instance
         */
        list.create = function create(properties) {
            return new list(properties);
        };

        /**
         * Encodes the specified list message. Does not implicitly {@link alc_dict.list.verify|verify} messages.
         * @function encode
         * @memberof alc_dict.list
         * @static
         * @param {alc_dict.Ilist} message list message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        list.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.elem != null && message.elem.length)
                for (var i = 0; i < message.elem.length; ++i)
                    $root.alc_dict.value.encode(message.elem[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified list message, length delimited. Does not implicitly {@link alc_dict.list.verify|verify} messages.
         * @function encodeDelimited
         * @memberof alc_dict.list
         * @static
         * @param {alc_dict.Ilist} message list message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        list.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a list message from the specified reader or buffer.
         * @function decode
         * @memberof alc_dict.list
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {alc_dict.list} list
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        list.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.alc_dict.list();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    if (!(message.elem && message.elem.length))
                        message.elem = [];
                    message.elem.push($root.alc_dict.value.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a list message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof alc_dict.list
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {alc_dict.list} list
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        list.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a list message.
         * @function verify
         * @memberof alc_dict.list
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        list.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.elem != null && message.hasOwnProperty("elem")) {
                if (!Array.isArray(message.elem))
                    return "elem: array expected";
                for (var i = 0; i < message.elem.length; ++i) {
                    var error = $root.alc_dict.value.verify(message.elem[i]);
                    if (error)
                        return "elem." + error;
                }
            }
            return null;
        };

        /**
         * Creates a list message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof alc_dict.list
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {alc_dict.list} list
         */
        list.fromObject = function fromObject(object) {
            if (object instanceof $root.alc_dict.list)
                return object;
            var message = new $root.alc_dict.list();
            if (object.elem) {
                if (!Array.isArray(object.elem))
                    throw TypeError(".alc_dict.list.elem: array expected");
                message.elem = [];
                for (var i = 0; i < object.elem.length; ++i) {
                    if (typeof object.elem[i] !== "object")
                        throw TypeError(".alc_dict.list.elem: object expected");
                    message.elem[i] = $root.alc_dict.value.fromObject(object.elem[i]);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from a list message. Also converts values to other types if specified.
         * @function toObject
         * @memberof alc_dict.list
         * @static
         * @param {alc_dict.list} message list
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        list.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object.elem = [];
            if (message.elem && message.elem.length) {
                object.elem = [];
                for (var j = 0; j < message.elem.length; ++j)
                    object.elem[j] = $root.alc_dict.value.toObject(message.elem[j], options);
            }
            return object;
        };

        /**
         * Converts this list to JSON.
         * @function toJSON
         * @memberof alc_dict.list
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        list.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return list;
    })();

    return alc_dict;
})();

module.exports = $root;
