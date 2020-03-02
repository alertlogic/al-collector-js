/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

var $protobuf = require("protobufjs/minimal");

// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.common_proto = (function() {

    /**
     * Namespace common_proto.
     * @exports common_proto
     * @namespace
     */
    var common_proto = {};

    common_proto.collect_input = (function() {

        /**
         * Properties of a collect_input.
         * @memberof common_proto
         * @interface Icollect_input
         * @property {string} sourceId collect_input sourceId
         * @property {string|null} [streamId] collect_input streamId
         * @property {Uint8Array|null} [previousStreamState] collect_input previousStreamState
         * @property {number|null} [limit] collect_input limit
         */

        /**
         * Constructs a new collect_input.
         * @memberof common_proto
         * @classdesc Represents a collect_input.
         * @implements Icollect_input
         * @constructor
         * @param {common_proto.Icollect_input=} [properties] Properties to set
         */
        function collect_input(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * collect_input sourceId.
         * @member {string} sourceId
         * @memberof common_proto.collect_input
         * @instance
         */
        collect_input.prototype.sourceId = "";

        /**
         * collect_input streamId.
         * @member {string} streamId
         * @memberof common_proto.collect_input
         * @instance
         */
        collect_input.prototype.streamId = "";

        /**
         * collect_input previousStreamState.
         * @member {Uint8Array} previousStreamState
         * @memberof common_proto.collect_input
         * @instance
         */
        collect_input.prototype.previousStreamState = $util.newBuffer([]);

        /**
         * collect_input limit.
         * @member {number} limit
         * @memberof common_proto.collect_input
         * @instance
         */
        collect_input.prototype.limit = 0;

        /**
         * Creates a new collect_input instance using the specified properties.
         * @function create
         * @memberof common_proto.collect_input
         * @static
         * @param {common_proto.Icollect_input=} [properties] Properties to set
         * @returns {common_proto.collect_input} collect_input instance
         */
        collect_input.create = function create(properties) {
            return new collect_input(properties);
        };

        /**
         * Encodes the specified collect_input message. Does not implicitly {@link common_proto.collect_input.verify|verify} messages.
         * @function encode
         * @memberof common_proto.collect_input
         * @static
         * @param {common_proto.Icollect_input} message collect_input message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        collect_input.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            writer.uint32(/* id 1, wireType 2 =*/10).string(message.sourceId);
            if (message.streamId != null && message.hasOwnProperty("streamId"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.streamId);
            if (message.previousStreamState != null && message.hasOwnProperty("previousStreamState"))
                writer.uint32(/* id 3, wireType 2 =*/26).bytes(message.previousStreamState);
            if (message.limit != null && message.hasOwnProperty("limit"))
                writer.uint32(/* id 4, wireType 0 =*/32).uint32(message.limit);
            return writer;
        };

        /**
         * Encodes the specified collect_input message, length delimited. Does not implicitly {@link common_proto.collect_input.verify|verify} messages.
         * @function encodeDelimited
         * @memberof common_proto.collect_input
         * @static
         * @param {common_proto.Icollect_input} message collect_input message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        collect_input.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a collect_input message from the specified reader or buffer.
         * @function decode
         * @memberof common_proto.collect_input
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {common_proto.collect_input} collect_input
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        collect_input.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.common_proto.collect_input();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.sourceId = reader.string();
                    break;
                case 2:
                    message.streamId = reader.string();
                    break;
                case 3:
                    message.previousStreamState = reader.bytes();
                    break;
                case 4:
                    message.limit = reader.uint32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            if (!message.hasOwnProperty("sourceId"))
                throw $util.ProtocolError("missing required 'sourceId'", { instance: message });
            return message;
        };

        /**
         * Decodes a collect_input message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof common_proto.collect_input
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {common_proto.collect_input} collect_input
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        collect_input.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a collect_input message.
         * @function verify
         * @memberof common_proto.collect_input
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        collect_input.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (!$util.isString(message.sourceId))
                return "sourceId: string expected";
            if (message.streamId != null && message.hasOwnProperty("streamId"))
                if (!$util.isString(message.streamId))
                    return "streamId: string expected";
            if (message.previousStreamState != null && message.hasOwnProperty("previousStreamState"))
                if (!(message.previousStreamState && typeof message.previousStreamState.length === "number" || $util.isString(message.previousStreamState)))
                    return "previousStreamState: buffer expected";
            if (message.limit != null && message.hasOwnProperty("limit"))
                if (!$util.isInteger(message.limit))
                    return "limit: integer expected";
            return null;
        };

        /**
         * Creates a collect_input message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof common_proto.collect_input
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {common_proto.collect_input} collect_input
         */
        collect_input.fromObject = function fromObject(object) {
            if (object instanceof $root.common_proto.collect_input)
                return object;
            var message = new $root.common_proto.collect_input();
            if (object.sourceId != null)
                message.sourceId = String(object.sourceId);
            if (object.streamId != null)
                message.streamId = String(object.streamId);
            if (object.previousStreamState != null)
                if (typeof object.previousStreamState === "string")
                    $util.base64.decode(object.previousStreamState, message.previousStreamState = $util.newBuffer($util.base64.length(object.previousStreamState)), 0);
                else if (object.previousStreamState.length)
                    message.previousStreamState = object.previousStreamState;
            if (object.limit != null)
                message.limit = object.limit >>> 0;
            return message;
        };

        /**
         * Creates a plain object from a collect_input message. Also converts values to other types if specified.
         * @function toObject
         * @memberof common_proto.collect_input
         * @static
         * @param {common_proto.collect_input} message collect_input
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        collect_input.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.sourceId = "";
                object.streamId = "";
                if (options.bytes === String)
                    object.previousStreamState = "";
                else {
                    object.previousStreamState = [];
                    if (options.bytes !== Array)
                        object.previousStreamState = $util.newBuffer(object.previousStreamState);
                }
                object.limit = 0;
            }
            if (message.sourceId != null && message.hasOwnProperty("sourceId"))
                object.sourceId = message.sourceId;
            if (message.streamId != null && message.hasOwnProperty("streamId"))
                object.streamId = message.streamId;
            if (message.previousStreamState != null && message.hasOwnProperty("previousStreamState"))
                object.previousStreamState = options.bytes === String ? $util.base64.encode(message.previousStreamState, 0, message.previousStreamState.length) : options.bytes === Array ? Array.prototype.slice.call(message.previousStreamState) : message.previousStreamState;
            if (message.limit != null && message.hasOwnProperty("limit"))
                object.limit = message.limit;
            return object;
        };

        /**
         * Converts this collect_input to JSON.
         * @function toJSON
         * @memberof common_proto.collect_input
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        collect_input.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return collect_input;
    })();

    common_proto.collect_output = (function() {

        /**
         * Properties of a collect_output.
         * @memberof common_proto
         * @interface Icollect_output
         * @property {string} sourceId collect_output sourceId
         * @property {string|null} [streamId] collect_output streamId
         * @property {Uint8Array} newStreamState collect_output newStreamState
         * @property {boolean} isEndOfStream collect_output isEndOfStream
         * @property {number} collectedEventsCount collect_output collectedEventsCount
         * @property {number|null} [remainingEventsCount] collect_output remainingEventsCount
         * @property {alc_health.Istatus_update|null} [status] collect_output status
         */

        /**
         * Constructs a new collect_output.
         * @memberof common_proto
         * @classdesc Represents a collect_output.
         * @implements Icollect_output
         * @constructor
         * @param {common_proto.Icollect_output=} [properties] Properties to set
         */
        function collect_output(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * collect_output sourceId.
         * @member {string} sourceId
         * @memberof common_proto.collect_output
         * @instance
         */
        collect_output.prototype.sourceId = "";

        /**
         * collect_output streamId.
         * @member {string} streamId
         * @memberof common_proto.collect_output
         * @instance
         */
        collect_output.prototype.streamId = "";

        /**
         * collect_output newStreamState.
         * @member {Uint8Array} newStreamState
         * @memberof common_proto.collect_output
         * @instance
         */
        collect_output.prototype.newStreamState = $util.newBuffer([]);

        /**
         * collect_output isEndOfStream.
         * @member {boolean} isEndOfStream
         * @memberof common_proto.collect_output
         * @instance
         */
        collect_output.prototype.isEndOfStream = false;

        /**
         * collect_output collectedEventsCount.
         * @member {number} collectedEventsCount
         * @memberof common_proto.collect_output
         * @instance
         */
        collect_output.prototype.collectedEventsCount = 0;

        /**
         * collect_output remainingEventsCount.
         * @member {number} remainingEventsCount
         * @memberof common_proto.collect_output
         * @instance
         */
        collect_output.prototype.remainingEventsCount = 0;

        /**
         * collect_output status.
         * @member {alc_health.Istatus_update|null|undefined} status
         * @memberof common_proto.collect_output
         * @instance
         */
        collect_output.prototype.status = null;

        /**
         * Creates a new collect_output instance using the specified properties.
         * @function create
         * @memberof common_proto.collect_output
         * @static
         * @param {common_proto.Icollect_output=} [properties] Properties to set
         * @returns {common_proto.collect_output} collect_output instance
         */
        collect_output.create = function create(properties) {
            return new collect_output(properties);
        };

        /**
         * Encodes the specified collect_output message. Does not implicitly {@link common_proto.collect_output.verify|verify} messages.
         * @function encode
         * @memberof common_proto.collect_output
         * @static
         * @param {common_proto.Icollect_output} message collect_output message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        collect_output.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            writer.uint32(/* id 1, wireType 2 =*/10).string(message.sourceId);
            if (message.streamId != null && message.hasOwnProperty("streamId"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.streamId);
            writer.uint32(/* id 3, wireType 2 =*/26).bytes(message.newStreamState);
            writer.uint32(/* id 4, wireType 0 =*/32).bool(message.isEndOfStream);
            writer.uint32(/* id 5, wireType 0 =*/40).uint32(message.collectedEventsCount);
            if (message.remainingEventsCount != null && message.hasOwnProperty("remainingEventsCount"))
                writer.uint32(/* id 6, wireType 0 =*/48).uint32(message.remainingEventsCount);
            if (message.status != null && message.hasOwnProperty("status"))
                $root.alc_health.status_update.encode(message.status, writer.uint32(/* id 7, wireType 2 =*/58).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified collect_output message, length delimited. Does not implicitly {@link common_proto.collect_output.verify|verify} messages.
         * @function encodeDelimited
         * @memberof common_proto.collect_output
         * @static
         * @param {common_proto.Icollect_output} message collect_output message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        collect_output.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a collect_output message from the specified reader or buffer.
         * @function decode
         * @memberof common_proto.collect_output
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {common_proto.collect_output} collect_output
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        collect_output.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.common_proto.collect_output();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.sourceId = reader.string();
                    break;
                case 2:
                    message.streamId = reader.string();
                    break;
                case 3:
                    message.newStreamState = reader.bytes();
                    break;
                case 4:
                    message.isEndOfStream = reader.bool();
                    break;
                case 5:
                    message.collectedEventsCount = reader.uint32();
                    break;
                case 6:
                    message.remainingEventsCount = reader.uint32();
                    break;
                case 7:
                    message.status = $root.alc_health.status_update.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            if (!message.hasOwnProperty("sourceId"))
                throw $util.ProtocolError("missing required 'sourceId'", { instance: message });
            if (!message.hasOwnProperty("newStreamState"))
                throw $util.ProtocolError("missing required 'newStreamState'", { instance: message });
            if (!message.hasOwnProperty("isEndOfStream"))
                throw $util.ProtocolError("missing required 'isEndOfStream'", { instance: message });
            if (!message.hasOwnProperty("collectedEventsCount"))
                throw $util.ProtocolError("missing required 'collectedEventsCount'", { instance: message });
            return message;
        };

        /**
         * Decodes a collect_output message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof common_proto.collect_output
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {common_proto.collect_output} collect_output
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        collect_output.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a collect_output message.
         * @function verify
         * @memberof common_proto.collect_output
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        collect_output.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (!$util.isString(message.sourceId))
                return "sourceId: string expected";
            if (message.streamId != null && message.hasOwnProperty("streamId"))
                if (!$util.isString(message.streamId))
                    return "streamId: string expected";
            if (!(message.newStreamState && typeof message.newStreamState.length === "number" || $util.isString(message.newStreamState)))
                return "newStreamState: buffer expected";
            if (typeof message.isEndOfStream !== "boolean")
                return "isEndOfStream: boolean expected";
            if (!$util.isInteger(message.collectedEventsCount))
                return "collectedEventsCount: integer expected";
            if (message.remainingEventsCount != null && message.hasOwnProperty("remainingEventsCount"))
                if (!$util.isInteger(message.remainingEventsCount))
                    return "remainingEventsCount: integer expected";
            if (message.status != null && message.hasOwnProperty("status")) {
                var error = $root.alc_health.status_update.verify(message.status);
                if (error)
                    return "status." + error;
            }
            return null;
        };

        /**
         * Creates a collect_output message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof common_proto.collect_output
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {common_proto.collect_output} collect_output
         */
        collect_output.fromObject = function fromObject(object) {
            if (object instanceof $root.common_proto.collect_output)
                return object;
            var message = new $root.common_proto.collect_output();
            if (object.sourceId != null)
                message.sourceId = String(object.sourceId);
            if (object.streamId != null)
                message.streamId = String(object.streamId);
            if (object.newStreamState != null)
                if (typeof object.newStreamState === "string")
                    $util.base64.decode(object.newStreamState, message.newStreamState = $util.newBuffer($util.base64.length(object.newStreamState)), 0);
                else if (object.newStreamState.length)
                    message.newStreamState = object.newStreamState;
            if (object.isEndOfStream != null)
                message.isEndOfStream = Boolean(object.isEndOfStream);
            if (object.collectedEventsCount != null)
                message.collectedEventsCount = object.collectedEventsCount >>> 0;
            if (object.remainingEventsCount != null)
                message.remainingEventsCount = object.remainingEventsCount >>> 0;
            if (object.status != null) {
                if (typeof object.status !== "object")
                    throw TypeError(".common_proto.collect_output.status: object expected");
                message.status = $root.alc_health.status_update.fromObject(object.status);
            }
            return message;
        };

        /**
         * Creates a plain object from a collect_output message. Also converts values to other types if specified.
         * @function toObject
         * @memberof common_proto.collect_output
         * @static
         * @param {common_proto.collect_output} message collect_output
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        collect_output.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.sourceId = "";
                object.streamId = "";
                if (options.bytes === String)
                    object.newStreamState = "";
                else {
                    object.newStreamState = [];
                    if (options.bytes !== Array)
                        object.newStreamState = $util.newBuffer(object.newStreamState);
                }
                object.isEndOfStream = false;
                object.collectedEventsCount = 0;
                object.remainingEventsCount = 0;
                object.status = null;
            }
            if (message.sourceId != null && message.hasOwnProperty("sourceId"))
                object.sourceId = message.sourceId;
            if (message.streamId != null && message.hasOwnProperty("streamId"))
                object.streamId = message.streamId;
            if (message.newStreamState != null && message.hasOwnProperty("newStreamState"))
                object.newStreamState = options.bytes === String ? $util.base64.encode(message.newStreamState, 0, message.newStreamState.length) : options.bytes === Array ? Array.prototype.slice.call(message.newStreamState) : message.newStreamState;
            if (message.isEndOfStream != null && message.hasOwnProperty("isEndOfStream"))
                object.isEndOfStream = message.isEndOfStream;
            if (message.collectedEventsCount != null && message.hasOwnProperty("collectedEventsCount"))
                object.collectedEventsCount = message.collectedEventsCount;
            if (message.remainingEventsCount != null && message.hasOwnProperty("remainingEventsCount"))
                object.remainingEventsCount = message.remainingEventsCount;
            if (message.status != null && message.hasOwnProperty("status"))
                object.status = $root.alc_health.status_update.toObject(message.status, options);
            return object;
        };

        /**
         * Converts this collect_output to JSON.
         * @function toJSON
         * @memberof common_proto.collect_output
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        collect_output.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return collect_output;
    })();

    common_proto.collect_error = (function() {

        /**
         * Properties of a collect_error.
         * @memberof common_proto
         * @interface Icollect_error
         * @property {string} reason collect_error reason
         * @property {string} sourceId collect_error sourceId
         * @property {string|null} [streamId] collect_error streamId
         * @property {boolean|null} [hostWideError] collect_error hostWideError
         * @property {alc_health.Istatus_update|null} [status] collect_error status
         */

        /**
         * Constructs a new collect_error.
         * @memberof common_proto
         * @classdesc Represents a collect_error.
         * @implements Icollect_error
         * @constructor
         * @param {common_proto.Icollect_error=} [properties] Properties to set
         */
        function collect_error(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * collect_error reason.
         * @member {string} reason
         * @memberof common_proto.collect_error
         * @instance
         */
        collect_error.prototype.reason = "";

        /**
         * collect_error sourceId.
         * @member {string} sourceId
         * @memberof common_proto.collect_error
         * @instance
         */
        collect_error.prototype.sourceId = "";

        /**
         * collect_error streamId.
         * @member {string} streamId
         * @memberof common_proto.collect_error
         * @instance
         */
        collect_error.prototype.streamId = "";

        /**
         * collect_error hostWideError.
         * @member {boolean} hostWideError
         * @memberof common_proto.collect_error
         * @instance
         */
        collect_error.prototype.hostWideError = false;

        /**
         * collect_error status.
         * @member {alc_health.Istatus_update|null|undefined} status
         * @memberof common_proto.collect_error
         * @instance
         */
        collect_error.prototype.status = null;

        /**
         * Creates a new collect_error instance using the specified properties.
         * @function create
         * @memberof common_proto.collect_error
         * @static
         * @param {common_proto.Icollect_error=} [properties] Properties to set
         * @returns {common_proto.collect_error} collect_error instance
         */
        collect_error.create = function create(properties) {
            return new collect_error(properties);
        };

        /**
         * Encodes the specified collect_error message. Does not implicitly {@link common_proto.collect_error.verify|verify} messages.
         * @function encode
         * @memberof common_proto.collect_error
         * @static
         * @param {common_proto.Icollect_error} message collect_error message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        collect_error.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            writer.uint32(/* id 1, wireType 2 =*/10).string(message.reason);
            writer.uint32(/* id 2, wireType 2 =*/18).string(message.sourceId);
            if (message.streamId != null && message.hasOwnProperty("streamId"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.streamId);
            if (message.hostWideError != null && message.hasOwnProperty("hostWideError"))
                writer.uint32(/* id 4, wireType 0 =*/32).bool(message.hostWideError);
            if (message.status != null && message.hasOwnProperty("status"))
                $root.alc_health.status_update.encode(message.status, writer.uint32(/* id 5, wireType 2 =*/42).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified collect_error message, length delimited. Does not implicitly {@link common_proto.collect_error.verify|verify} messages.
         * @function encodeDelimited
         * @memberof common_proto.collect_error
         * @static
         * @param {common_proto.Icollect_error} message collect_error message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        collect_error.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a collect_error message from the specified reader or buffer.
         * @function decode
         * @memberof common_proto.collect_error
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {common_proto.collect_error} collect_error
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        collect_error.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.common_proto.collect_error();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.reason = reader.string();
                    break;
                case 2:
                    message.sourceId = reader.string();
                    break;
                case 3:
                    message.streamId = reader.string();
                    break;
                case 4:
                    message.hostWideError = reader.bool();
                    break;
                case 5:
                    message.status = $root.alc_health.status_update.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            if (!message.hasOwnProperty("reason"))
                throw $util.ProtocolError("missing required 'reason'", { instance: message });
            if (!message.hasOwnProperty("sourceId"))
                throw $util.ProtocolError("missing required 'sourceId'", { instance: message });
            return message;
        };

        /**
         * Decodes a collect_error message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof common_proto.collect_error
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {common_proto.collect_error} collect_error
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        collect_error.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a collect_error message.
         * @function verify
         * @memberof common_proto.collect_error
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        collect_error.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (!$util.isString(message.reason))
                return "reason: string expected";
            if (!$util.isString(message.sourceId))
                return "sourceId: string expected";
            if (message.streamId != null && message.hasOwnProperty("streamId"))
                if (!$util.isString(message.streamId))
                    return "streamId: string expected";
            if (message.hostWideError != null && message.hasOwnProperty("hostWideError"))
                if (typeof message.hostWideError !== "boolean")
                    return "hostWideError: boolean expected";
            if (message.status != null && message.hasOwnProperty("status")) {
                var error = $root.alc_health.status_update.verify(message.status);
                if (error)
                    return "status." + error;
            }
            return null;
        };

        /**
         * Creates a collect_error message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof common_proto.collect_error
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {common_proto.collect_error} collect_error
         */
        collect_error.fromObject = function fromObject(object) {
            if (object instanceof $root.common_proto.collect_error)
                return object;
            var message = new $root.common_proto.collect_error();
            if (object.reason != null)
                message.reason = String(object.reason);
            if (object.sourceId != null)
                message.sourceId = String(object.sourceId);
            if (object.streamId != null)
                message.streamId = String(object.streamId);
            if (object.hostWideError != null)
                message.hostWideError = Boolean(object.hostWideError);
            if (object.status != null) {
                if (typeof object.status !== "object")
                    throw TypeError(".common_proto.collect_error.status: object expected");
                message.status = $root.alc_health.status_update.fromObject(object.status);
            }
            return message;
        };

        /**
         * Creates a plain object from a collect_error message. Also converts values to other types if specified.
         * @function toObject
         * @memberof common_proto.collect_error
         * @static
         * @param {common_proto.collect_error} message collect_error
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        collect_error.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.reason = "";
                object.sourceId = "";
                object.streamId = "";
                object.hostWideError = false;
                object.status = null;
            }
            if (message.reason != null && message.hasOwnProperty("reason"))
                object.reason = message.reason;
            if (message.sourceId != null && message.hasOwnProperty("sourceId"))
                object.sourceId = message.sourceId;
            if (message.streamId != null && message.hasOwnProperty("streamId"))
                object.streamId = message.streamId;
            if (message.hostWideError != null && message.hasOwnProperty("hostWideError"))
                object.hostWideError = message.hostWideError;
            if (message.status != null && message.hasOwnProperty("status"))
                object.status = $root.alc_health.status_update.toObject(message.status, options);
            return object;
        };

        /**
         * Converts this collect_error to JSON.
         * @function toJSON
         * @memberof common_proto.collect_error
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        collect_error.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return collect_error;
    })();

    common_proto.collected_message = (function() {

        /**
         * Properties of a collected_message.
         * @memberof common_proto
         * @interface Icollected_message
         * @property {string|null} [hostname] collected_message hostname
         * @property {number|Long} messageTs collected_message messageTs
         * @property {number} priority collected_message priority
         * @property {string|null} [progName] collected_message progName
         * @property {number|Long|null} [pid] collected_message pid
         * @property {string} message collected_message message
         * @property {string} messageType collected_message messageType
         * @property {string|null} [messageTypeId] collected_message messageTypeId
         * @property {number|null} [messageTsUs] collected_message messageTsUs
         * @property {string|null} [applicationId] collected_message applicationId
         */

        /**
         * Constructs a new collected_message.
         * @memberof common_proto
         * @classdesc Represents a collected_message.
         * @implements Icollected_message
         * @constructor
         * @param {common_proto.Icollected_message=} [properties] Properties to set
         */
        function collected_message(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * collected_message hostname.
         * @member {string} hostname
         * @memberof common_proto.collected_message
         * @instance
         */
        collected_message.prototype.hostname = "";

        /**
         * collected_message messageTs.
         * @member {number|Long} messageTs
         * @memberof common_proto.collected_message
         * @instance
         */
        collected_message.prototype.messageTs = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * collected_message priority.
         * @member {number} priority
         * @memberof common_proto.collected_message
         * @instance
         */
        collected_message.prototype.priority = 0;

        /**
         * collected_message progName.
         * @member {string} progName
         * @memberof common_proto.collected_message
         * @instance
         */
        collected_message.prototype.progName = "";

        /**
         * collected_message pid.
         * @member {number|Long} pid
         * @memberof common_proto.collected_message
         * @instance
         */
        collected_message.prototype.pid = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * collected_message message.
         * @member {string} message
         * @memberof common_proto.collected_message
         * @instance
         */
        collected_message.prototype.message = "";

        /**
         * collected_message messageType.
         * @member {string} messageType
         * @memberof common_proto.collected_message
         * @instance
         */
        collected_message.prototype.messageType = "";

        /**
         * collected_message messageTypeId.
         * @member {string} messageTypeId
         * @memberof common_proto.collected_message
         * @instance
         */
        collected_message.prototype.messageTypeId = "";

        /**
         * collected_message messageTsUs.
         * @member {number} messageTsUs
         * @memberof common_proto.collected_message
         * @instance
         */
        collected_message.prototype.messageTsUs = 0;

        /**
         * collected_message applicationId.
         * @member {string} applicationId
         * @memberof common_proto.collected_message
         * @instance
         */
        collected_message.prototype.applicationId = "";

        /**
         * Creates a new collected_message instance using the specified properties.
         * @function create
         * @memberof common_proto.collected_message
         * @static
         * @param {common_proto.Icollected_message=} [properties] Properties to set
         * @returns {common_proto.collected_message} collected_message instance
         */
        collected_message.create = function create(properties) {
            return new collected_message(properties);
        };

        /**
         * Encodes the specified collected_message message. Does not implicitly {@link common_proto.collected_message.verify|verify} messages.
         * @function encode
         * @memberof common_proto.collected_message
         * @static
         * @param {common_proto.Icollected_message} message collected_message message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        collected_message.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.hostname != null && message.hasOwnProperty("hostname"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.hostname);
            writer.uint32(/* id 2, wireType 1 =*/17).fixed64(message.messageTs);
            writer.uint32(/* id 3, wireType 5 =*/29).fixed32(message.priority);
            if (message.progName != null && message.hasOwnProperty("progName"))
                writer.uint32(/* id 4, wireType 2 =*/34).string(message.progName);
            if (message.pid != null && message.hasOwnProperty("pid"))
                writer.uint32(/* id 5, wireType 1 =*/41).fixed64(message.pid);
            writer.uint32(/* id 6, wireType 2 =*/50).string(message.message);
            writer.uint32(/* id 7, wireType 2 =*/58).string(message.messageType);
            if (message.messageTypeId != null && message.hasOwnProperty("messageTypeId"))
                writer.uint32(/* id 8, wireType 2 =*/66).string(message.messageTypeId);
            if (message.messageTsUs != null && message.hasOwnProperty("messageTsUs"))
                writer.uint32(/* id 9, wireType 5 =*/77).fixed32(message.messageTsUs);
            if (message.applicationId != null && message.hasOwnProperty("applicationId"))
                writer.uint32(/* id 10, wireType 2 =*/82).string(message.applicationId);
            return writer;
        };

        /**
         * Encodes the specified collected_message message, length delimited. Does not implicitly {@link common_proto.collected_message.verify|verify} messages.
         * @function encodeDelimited
         * @memberof common_proto.collected_message
         * @static
         * @param {common_proto.Icollected_message} message collected_message message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        collected_message.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a collected_message message from the specified reader or buffer.
         * @function decode
         * @memberof common_proto.collected_message
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {common_proto.collected_message} collected_message
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        collected_message.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.common_proto.collected_message();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.hostname = reader.string();
                    break;
                case 2:
                    message.messageTs = reader.fixed64();
                    break;
                case 3:
                    message.priority = reader.fixed32();
                    break;
                case 4:
                    message.progName = reader.string();
                    break;
                case 5:
                    message.pid = reader.fixed64();
                    break;
                case 6:
                    message.message = reader.string();
                    break;
                case 7:
                    message.messageType = reader.string();
                    break;
                case 8:
                    message.messageTypeId = reader.string();
                    break;
                case 9:
                    message.messageTsUs = reader.fixed32();
                    break;
                case 10:
                    message.applicationId = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            if (!message.hasOwnProperty("messageTs"))
                throw $util.ProtocolError("missing required 'messageTs'", { instance: message });
            if (!message.hasOwnProperty("priority"))
                throw $util.ProtocolError("missing required 'priority'", { instance: message });
            if (!message.hasOwnProperty("message"))
                throw $util.ProtocolError("missing required 'message'", { instance: message });
            if (!message.hasOwnProperty("messageType"))
                throw $util.ProtocolError("missing required 'messageType'", { instance: message });
            return message;
        };

        /**
         * Decodes a collected_message message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof common_proto.collected_message
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {common_proto.collected_message} collected_message
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        collected_message.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a collected_message message.
         * @function verify
         * @memberof common_proto.collected_message
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        collected_message.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.hostname != null && message.hasOwnProperty("hostname"))
                if (!$util.isString(message.hostname))
                    return "hostname: string expected";
            if (!$util.isInteger(message.messageTs) && !(message.messageTs && $util.isInteger(message.messageTs.low) && $util.isInteger(message.messageTs.high)))
                return "messageTs: integer|Long expected";
            if (!$util.isInteger(message.priority))
                return "priority: integer expected";
            if (message.progName != null && message.hasOwnProperty("progName"))
                if (!$util.isString(message.progName))
                    return "progName: string expected";
            if (message.pid != null && message.hasOwnProperty("pid"))
                if (!$util.isInteger(message.pid) && !(message.pid && $util.isInteger(message.pid.low) && $util.isInteger(message.pid.high)))
                    return "pid: integer|Long expected";
            if (!$util.isString(message.message))
                return "message: string expected";
            if (!$util.isString(message.messageType))
                return "messageType: string expected";
            if (message.messageTypeId != null && message.hasOwnProperty("messageTypeId"))
                if (!$util.isString(message.messageTypeId))
                    return "messageTypeId: string expected";
            if (message.messageTsUs != null && message.hasOwnProperty("messageTsUs"))
                if (!$util.isInteger(message.messageTsUs))
                    return "messageTsUs: integer expected";
            if (message.applicationId != null && message.hasOwnProperty("applicationId"))
                if (!$util.isString(message.applicationId))
                    return "applicationId: string expected";
            return null;
        };

        /**
         * Creates a collected_message message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof common_proto.collected_message
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {common_proto.collected_message} collected_message
         */
        collected_message.fromObject = function fromObject(object) {
            if (object instanceof $root.common_proto.collected_message)
                return object;
            var message = new $root.common_proto.collected_message();
            if (object.hostname != null)
                message.hostname = String(object.hostname);
            if (object.messageTs != null)
                if ($util.Long)
                    (message.messageTs = $util.Long.fromValue(object.messageTs)).unsigned = false;
                else if (typeof object.messageTs === "string")
                    message.messageTs = parseInt(object.messageTs, 10);
                else if (typeof object.messageTs === "number")
                    message.messageTs = object.messageTs;
                else if (typeof object.messageTs === "object")
                    message.messageTs = new $util.LongBits(object.messageTs.low >>> 0, object.messageTs.high >>> 0).toNumber();
            if (object.priority != null)
                message.priority = object.priority >>> 0;
            if (object.progName != null)
                message.progName = String(object.progName);
            if (object.pid != null)
                if ($util.Long)
                    (message.pid = $util.Long.fromValue(object.pid)).unsigned = false;
                else if (typeof object.pid === "string")
                    message.pid = parseInt(object.pid, 10);
                else if (typeof object.pid === "number")
                    message.pid = object.pid;
                else if (typeof object.pid === "object")
                    message.pid = new $util.LongBits(object.pid.low >>> 0, object.pid.high >>> 0).toNumber();
            if (object.message != null)
                message.message = String(object.message);
            if (object.messageType != null)
                message.messageType = String(object.messageType);
            if (object.messageTypeId != null)
                message.messageTypeId = String(object.messageTypeId);
            if (object.messageTsUs != null)
                message.messageTsUs = object.messageTsUs >>> 0;
            if (object.applicationId != null)
                message.applicationId = String(object.applicationId);
            return message;
        };

        /**
         * Creates a plain object from a collected_message message. Also converts values to other types if specified.
         * @function toObject
         * @memberof common_proto.collected_message
         * @static
         * @param {common_proto.collected_message} message collected_message
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        collected_message.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.hostname = "";
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.messageTs = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.messageTs = options.longs === String ? "0" : 0;
                object.priority = 0;
                object.progName = "";
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.pid = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.pid = options.longs === String ? "0" : 0;
                object.message = "";
                object.messageType = "";
                object.messageTypeId = "";
                object.messageTsUs = 0;
                object.applicationId = "";
            }
            if (message.hostname != null && message.hasOwnProperty("hostname"))
                object.hostname = message.hostname;
            if (message.messageTs != null && message.hasOwnProperty("messageTs"))
                if (typeof message.messageTs === "number")
                    object.messageTs = options.longs === String ? String(message.messageTs) : message.messageTs;
                else
                    object.messageTs = options.longs === String ? $util.Long.prototype.toString.call(message.messageTs) : options.longs === Number ? new $util.LongBits(message.messageTs.low >>> 0, message.messageTs.high >>> 0).toNumber() : message.messageTs;
            if (message.priority != null && message.hasOwnProperty("priority"))
                object.priority = message.priority;
            if (message.progName != null && message.hasOwnProperty("progName"))
                object.progName = message.progName;
            if (message.pid != null && message.hasOwnProperty("pid"))
                if (typeof message.pid === "number")
                    object.pid = options.longs === String ? String(message.pid) : message.pid;
                else
                    object.pid = options.longs === String ? $util.Long.prototype.toString.call(message.pid) : options.longs === Number ? new $util.LongBits(message.pid.low >>> 0, message.pid.high >>> 0).toNumber() : message.pid;
            if (message.message != null && message.hasOwnProperty("message"))
                object.message = message.message;
            if (message.messageType != null && message.hasOwnProperty("messageType"))
                object.messageType = message.messageType;
            if (message.messageTypeId != null && message.hasOwnProperty("messageTypeId"))
                object.messageTypeId = message.messageTypeId;
            if (message.messageTsUs != null && message.hasOwnProperty("messageTsUs"))
                object.messageTsUs = message.messageTsUs;
            if (message.applicationId != null && message.hasOwnProperty("applicationId"))
                object.applicationId = message.applicationId;
            return object;
        };

        /**
         * Converts this collected_message to JSON.
         * @function toJSON
         * @memberof common_proto.collected_message
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        collected_message.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return collected_message;
    })();

    common_proto.collected_batch = (function() {

        /**
         * Properties of a collected_batch.
         * @memberof common_proto
         * @interface Icollected_batch
         * @property {string} sourceId collected_batch sourceId
         * @property {host_metadata.Imetadata} metadata collected_batch metadata
         * @property {Array.<common_proto.Icollected_message>|null} [message] collected_batch message
         */

        /**
         * Constructs a new collected_batch.
         * @memberof common_proto
         * @classdesc Represents a collected_batch.
         * @implements Icollected_batch
         * @constructor
         * @param {common_proto.Icollected_batch=} [properties] Properties to set
         */
        function collected_batch(properties) {
            this.message = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * collected_batch sourceId.
         * @member {string} sourceId
         * @memberof common_proto.collected_batch
         * @instance
         */
        collected_batch.prototype.sourceId = "";

        /**
         * collected_batch metadata.
         * @member {host_metadata.Imetadata} metadata
         * @memberof common_proto.collected_batch
         * @instance
         */
        collected_batch.prototype.metadata = null;

        /**
         * collected_batch message.
         * @member {Array.<common_proto.Icollected_message>} message
         * @memberof common_proto.collected_batch
         * @instance
         */
        collected_batch.prototype.message = $util.emptyArray;

        /**
         * Creates a new collected_batch instance using the specified properties.
         * @function create
         * @memberof common_proto.collected_batch
         * @static
         * @param {common_proto.Icollected_batch=} [properties] Properties to set
         * @returns {common_proto.collected_batch} collected_batch instance
         */
        collected_batch.create = function create(properties) {
            return new collected_batch(properties);
        };

        /**
         * Encodes the specified collected_batch message. Does not implicitly {@link common_proto.collected_batch.verify|verify} messages.
         * @function encode
         * @memberof common_proto.collected_batch
         * @static
         * @param {common_proto.Icollected_batch} message collected_batch message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        collected_batch.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            writer.uint32(/* id 1, wireType 2 =*/10).string(message.sourceId);
            $root.host_metadata.metadata.encode(message.metadata, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            if (message.message != null && message.message.length)
                for (var i = 0; i < message.message.length; ++i)
                    $root.common_proto.collected_message.encode(message.message[i], writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified collected_batch message, length delimited. Does not implicitly {@link common_proto.collected_batch.verify|verify} messages.
         * @function encodeDelimited
         * @memberof common_proto.collected_batch
         * @static
         * @param {common_proto.Icollected_batch} message collected_batch message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        collected_batch.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a collected_batch message from the specified reader or buffer.
         * @function decode
         * @memberof common_proto.collected_batch
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {common_proto.collected_batch} collected_batch
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        collected_batch.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.common_proto.collected_batch();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.sourceId = reader.string();
                    break;
                case 2:
                    message.metadata = $root.host_metadata.metadata.decode(reader, reader.uint32());
                    break;
                case 3:
                    if (!(message.message && message.message.length))
                        message.message = [];
                    message.message.push($root.common_proto.collected_message.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            if (!message.hasOwnProperty("sourceId"))
                throw $util.ProtocolError("missing required 'sourceId'", { instance: message });
            if (!message.hasOwnProperty("metadata"))
                throw $util.ProtocolError("missing required 'metadata'", { instance: message });
            return message;
        };

        /**
         * Decodes a collected_batch message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof common_proto.collected_batch
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {common_proto.collected_batch} collected_batch
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        collected_batch.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a collected_batch message.
         * @function verify
         * @memberof common_proto.collected_batch
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        collected_batch.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (!$util.isString(message.sourceId))
                return "sourceId: string expected";
            {
                var error = $root.host_metadata.metadata.verify(message.metadata);
                if (error)
                    return "metadata." + error;
            }
            if (message.message != null && message.hasOwnProperty("message")) {
                if (!Array.isArray(message.message))
                    return "message: array expected";
                for (var i = 0; i < message.message.length; ++i) {
                    var error = $root.common_proto.collected_message.verify(message.message[i]);
                    if (error)
                        return "message." + error;
                }
            }
            return null;
        };

        /**
         * Creates a collected_batch message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof common_proto.collected_batch
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {common_proto.collected_batch} collected_batch
         */
        collected_batch.fromObject = function fromObject(object) {
            if (object instanceof $root.common_proto.collected_batch)
                return object;
            var message = new $root.common_proto.collected_batch();
            if (object.sourceId != null)
                message.sourceId = String(object.sourceId);
            if (object.metadata != null) {
                if (typeof object.metadata !== "object")
                    throw TypeError(".common_proto.collected_batch.metadata: object expected");
                message.metadata = $root.host_metadata.metadata.fromObject(object.metadata);
            }
            if (object.message) {
                if (!Array.isArray(object.message))
                    throw TypeError(".common_proto.collected_batch.message: array expected");
                message.message = [];
                for (var i = 0; i < object.message.length; ++i) {
                    if (typeof object.message[i] !== "object")
                        throw TypeError(".common_proto.collected_batch.message: object expected");
                    message.message[i] = $root.common_proto.collected_message.fromObject(object.message[i]);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from a collected_batch message. Also converts values to other types if specified.
         * @function toObject
         * @memberof common_proto.collected_batch
         * @static
         * @param {common_proto.collected_batch} message collected_batch
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        collected_batch.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object.message = [];
            if (options.defaults) {
                object.sourceId = "";
                object.metadata = null;
            }
            if (message.sourceId != null && message.hasOwnProperty("sourceId"))
                object.sourceId = message.sourceId;
            if (message.metadata != null && message.hasOwnProperty("metadata"))
                object.metadata = $root.host_metadata.metadata.toObject(message.metadata, options);
            if (message.message && message.message.length) {
                object.message = [];
                for (var j = 0; j < message.message.length; ++j)
                    object.message[j] = $root.common_proto.collected_message.toObject(message.message[j], options);
            }
            return object;
        };

        /**
         * Converts this collected_batch to JSON.
         * @function toJSON
         * @memberof common_proto.collected_batch
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        collected_batch.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return collected_batch;
    })();

    common_proto.collected_batch_list = (function() {

        /**
         * Properties of a collected_batch_list.
         * @memberof common_proto
         * @interface Icollected_batch_list
         * @property {Array.<common_proto.Icollected_batch>|null} [elem] collected_batch_list elem
         */

        /**
         * Constructs a new collected_batch_list.
         * @memberof common_proto
         * @classdesc Represents a collected_batch_list.
         * @implements Icollected_batch_list
         * @constructor
         * @param {common_proto.Icollected_batch_list=} [properties] Properties to set
         */
        function collected_batch_list(properties) {
            this.elem = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * collected_batch_list elem.
         * @member {Array.<common_proto.Icollected_batch>} elem
         * @memberof common_proto.collected_batch_list
         * @instance
         */
        collected_batch_list.prototype.elem = $util.emptyArray;

        /**
         * Creates a new collected_batch_list instance using the specified properties.
         * @function create
         * @memberof common_proto.collected_batch_list
         * @static
         * @param {common_proto.Icollected_batch_list=} [properties] Properties to set
         * @returns {common_proto.collected_batch_list} collected_batch_list instance
         */
        collected_batch_list.create = function create(properties) {
            return new collected_batch_list(properties);
        };

        /**
         * Encodes the specified collected_batch_list message. Does not implicitly {@link common_proto.collected_batch_list.verify|verify} messages.
         * @function encode
         * @memberof common_proto.collected_batch_list
         * @static
         * @param {common_proto.Icollected_batch_list} message collected_batch_list message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        collected_batch_list.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.elem != null && message.elem.length)
                for (var i = 0; i < message.elem.length; ++i)
                    $root.common_proto.collected_batch.encode(message.elem[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified collected_batch_list message, length delimited. Does not implicitly {@link common_proto.collected_batch_list.verify|verify} messages.
         * @function encodeDelimited
         * @memberof common_proto.collected_batch_list
         * @static
         * @param {common_proto.Icollected_batch_list} message collected_batch_list message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        collected_batch_list.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a collected_batch_list message from the specified reader or buffer.
         * @function decode
         * @memberof common_proto.collected_batch_list
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {common_proto.collected_batch_list} collected_batch_list
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        collected_batch_list.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.common_proto.collected_batch_list();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    if (!(message.elem && message.elem.length))
                        message.elem = [];
                    message.elem.push($root.common_proto.collected_batch.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a collected_batch_list message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof common_proto.collected_batch_list
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {common_proto.collected_batch_list} collected_batch_list
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        collected_batch_list.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a collected_batch_list message.
         * @function verify
         * @memberof common_proto.collected_batch_list
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        collected_batch_list.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.elem != null && message.hasOwnProperty("elem")) {
                if (!Array.isArray(message.elem))
                    return "elem: array expected";
                for (var i = 0; i < message.elem.length; ++i) {
                    var error = $root.common_proto.collected_batch.verify(message.elem[i]);
                    if (error)
                        return "elem." + error;
                }
            }
            return null;
        };

        /**
         * Creates a collected_batch_list message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof common_proto.collected_batch_list
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {common_proto.collected_batch_list} collected_batch_list
         */
        collected_batch_list.fromObject = function fromObject(object) {
            if (object instanceof $root.common_proto.collected_batch_list)
                return object;
            var message = new $root.common_proto.collected_batch_list();
            if (object.elem) {
                if (!Array.isArray(object.elem))
                    throw TypeError(".common_proto.collected_batch_list.elem: array expected");
                message.elem = [];
                for (var i = 0; i < object.elem.length; ++i) {
                    if (typeof object.elem[i] !== "object")
                        throw TypeError(".common_proto.collected_batch_list.elem: object expected");
                    message.elem[i] = $root.common_proto.collected_batch.fromObject(object.elem[i]);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from a collected_batch_list message. Also converts values to other types if specified.
         * @function toObject
         * @memberof common_proto.collected_batch_list
         * @static
         * @param {common_proto.collected_batch_list} message collected_batch_list
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        collected_batch_list.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object.elem = [];
            if (message.elem && message.elem.length) {
                object.elem = [];
                for (var j = 0; j < message.elem.length; ++j)
                    object.elem[j] = $root.common_proto.collected_batch.toObject(message.elem[j], options);
            }
            return object;
        };

        /**
         * Converts this collected_batch_list to JSON.
         * @function toJSON
         * @memberof common_proto.collected_batch_list
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        collected_batch_list.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return collected_batch_list;
    })();

    common_proto.collect_list_input = (function() {

        /**
         * Properties of a collect_list_input.
         * @memberof common_proto
         * @interface Icollect_list_input
         * @property {Array.<common_proto.Icollect_input>|null} [sourcesList] collect_list_input sourcesList
         */

        /**
         * Constructs a new collect_list_input.
         * @memberof common_proto
         * @classdesc Represents a collect_list_input.
         * @implements Icollect_list_input
         * @constructor
         * @param {common_proto.Icollect_list_input=} [properties] Properties to set
         */
        function collect_list_input(properties) {
            this.sourcesList = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * collect_list_input sourcesList.
         * @member {Array.<common_proto.Icollect_input>} sourcesList
         * @memberof common_proto.collect_list_input
         * @instance
         */
        collect_list_input.prototype.sourcesList = $util.emptyArray;

        /**
         * Creates a new collect_list_input instance using the specified properties.
         * @function create
         * @memberof common_proto.collect_list_input
         * @static
         * @param {common_proto.Icollect_list_input=} [properties] Properties to set
         * @returns {common_proto.collect_list_input} collect_list_input instance
         */
        collect_list_input.create = function create(properties) {
            return new collect_list_input(properties);
        };

        /**
         * Encodes the specified collect_list_input message. Does not implicitly {@link common_proto.collect_list_input.verify|verify} messages.
         * @function encode
         * @memberof common_proto.collect_list_input
         * @static
         * @param {common_proto.Icollect_list_input} message collect_list_input message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        collect_list_input.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.sourcesList != null && message.sourcesList.length)
                for (var i = 0; i < message.sourcesList.length; ++i)
                    $root.common_proto.collect_input.encode(message.sourcesList[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified collect_list_input message, length delimited. Does not implicitly {@link common_proto.collect_list_input.verify|verify} messages.
         * @function encodeDelimited
         * @memberof common_proto.collect_list_input
         * @static
         * @param {common_proto.Icollect_list_input} message collect_list_input message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        collect_list_input.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a collect_list_input message from the specified reader or buffer.
         * @function decode
         * @memberof common_proto.collect_list_input
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {common_proto.collect_list_input} collect_list_input
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        collect_list_input.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.common_proto.collect_list_input();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    if (!(message.sourcesList && message.sourcesList.length))
                        message.sourcesList = [];
                    message.sourcesList.push($root.common_proto.collect_input.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a collect_list_input message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof common_proto.collect_list_input
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {common_proto.collect_list_input} collect_list_input
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        collect_list_input.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a collect_list_input message.
         * @function verify
         * @memberof common_proto.collect_list_input
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        collect_list_input.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.sourcesList != null && message.hasOwnProperty("sourcesList")) {
                if (!Array.isArray(message.sourcesList))
                    return "sourcesList: array expected";
                for (var i = 0; i < message.sourcesList.length; ++i) {
                    var error = $root.common_proto.collect_input.verify(message.sourcesList[i]);
                    if (error)
                        return "sourcesList." + error;
                }
            }
            return null;
        };

        /**
         * Creates a collect_list_input message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof common_proto.collect_list_input
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {common_proto.collect_list_input} collect_list_input
         */
        collect_list_input.fromObject = function fromObject(object) {
            if (object instanceof $root.common_proto.collect_list_input)
                return object;
            var message = new $root.common_proto.collect_list_input();
            if (object.sourcesList) {
                if (!Array.isArray(object.sourcesList))
                    throw TypeError(".common_proto.collect_list_input.sourcesList: array expected");
                message.sourcesList = [];
                for (var i = 0; i < object.sourcesList.length; ++i) {
                    if (typeof object.sourcesList[i] !== "object")
                        throw TypeError(".common_proto.collect_list_input.sourcesList: object expected");
                    message.sourcesList[i] = $root.common_proto.collect_input.fromObject(object.sourcesList[i]);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from a collect_list_input message. Also converts values to other types if specified.
         * @function toObject
         * @memberof common_proto.collect_list_input
         * @static
         * @param {common_proto.collect_list_input} message collect_list_input
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        collect_list_input.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object.sourcesList = [];
            if (message.sourcesList && message.sourcesList.length) {
                object.sourcesList = [];
                for (var j = 0; j < message.sourcesList.length; ++j)
                    object.sourcesList[j] = $root.common_proto.collect_input.toObject(message.sourcesList[j], options);
            }
            return object;
        };

        /**
         * Converts this collect_list_input to JSON.
         * @function toJSON
         * @memberof common_proto.collect_list_input
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        collect_list_input.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return collect_list_input;
    })();

    common_proto.collect_list_output = (function() {

        /**
         * Properties of a collect_list_output.
         * @memberof common_proto
         * @interface Icollect_list_output
         * @property {Array.<common_proto.Icollect_output>|null} [collectedSources] collect_list_output collectedSources
         * @property {Array.<common_proto.Icollect_error>|null} [errorSources] collect_list_output errorSources
         */

        /**
         * Constructs a new collect_list_output.
         * @memberof common_proto
         * @classdesc Represents a collect_list_output.
         * @implements Icollect_list_output
         * @constructor
         * @param {common_proto.Icollect_list_output=} [properties] Properties to set
         */
        function collect_list_output(properties) {
            this.collectedSources = [];
            this.errorSources = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * collect_list_output collectedSources.
         * @member {Array.<common_proto.Icollect_output>} collectedSources
         * @memberof common_proto.collect_list_output
         * @instance
         */
        collect_list_output.prototype.collectedSources = $util.emptyArray;

        /**
         * collect_list_output errorSources.
         * @member {Array.<common_proto.Icollect_error>} errorSources
         * @memberof common_proto.collect_list_output
         * @instance
         */
        collect_list_output.prototype.errorSources = $util.emptyArray;

        /**
         * Creates a new collect_list_output instance using the specified properties.
         * @function create
         * @memberof common_proto.collect_list_output
         * @static
         * @param {common_proto.Icollect_list_output=} [properties] Properties to set
         * @returns {common_proto.collect_list_output} collect_list_output instance
         */
        collect_list_output.create = function create(properties) {
            return new collect_list_output(properties);
        };

        /**
         * Encodes the specified collect_list_output message. Does not implicitly {@link common_proto.collect_list_output.verify|verify} messages.
         * @function encode
         * @memberof common_proto.collect_list_output
         * @static
         * @param {common_proto.Icollect_list_output} message collect_list_output message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        collect_list_output.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.collectedSources != null && message.collectedSources.length)
                for (var i = 0; i < message.collectedSources.length; ++i)
                    $root.common_proto.collect_output.encode(message.collectedSources[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            if (message.errorSources != null && message.errorSources.length)
                for (var i = 0; i < message.errorSources.length; ++i)
                    $root.common_proto.collect_error.encode(message.errorSources[i], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified collect_list_output message, length delimited. Does not implicitly {@link common_proto.collect_list_output.verify|verify} messages.
         * @function encodeDelimited
         * @memberof common_proto.collect_list_output
         * @static
         * @param {common_proto.Icollect_list_output} message collect_list_output message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        collect_list_output.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a collect_list_output message from the specified reader or buffer.
         * @function decode
         * @memberof common_proto.collect_list_output
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {common_proto.collect_list_output} collect_list_output
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        collect_list_output.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.common_proto.collect_list_output();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    if (!(message.collectedSources && message.collectedSources.length))
                        message.collectedSources = [];
                    message.collectedSources.push($root.common_proto.collect_output.decode(reader, reader.uint32()));
                    break;
                case 2:
                    if (!(message.errorSources && message.errorSources.length))
                        message.errorSources = [];
                    message.errorSources.push($root.common_proto.collect_error.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a collect_list_output message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof common_proto.collect_list_output
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {common_proto.collect_list_output} collect_list_output
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        collect_list_output.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a collect_list_output message.
         * @function verify
         * @memberof common_proto.collect_list_output
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        collect_list_output.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.collectedSources != null && message.hasOwnProperty("collectedSources")) {
                if (!Array.isArray(message.collectedSources))
                    return "collectedSources: array expected";
                for (var i = 0; i < message.collectedSources.length; ++i) {
                    var error = $root.common_proto.collect_output.verify(message.collectedSources[i]);
                    if (error)
                        return "collectedSources." + error;
                }
            }
            if (message.errorSources != null && message.hasOwnProperty("errorSources")) {
                if (!Array.isArray(message.errorSources))
                    return "errorSources: array expected";
                for (var i = 0; i < message.errorSources.length; ++i) {
                    var error = $root.common_proto.collect_error.verify(message.errorSources[i]);
                    if (error)
                        return "errorSources." + error;
                }
            }
            return null;
        };

        /**
         * Creates a collect_list_output message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof common_proto.collect_list_output
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {common_proto.collect_list_output} collect_list_output
         */
        collect_list_output.fromObject = function fromObject(object) {
            if (object instanceof $root.common_proto.collect_list_output)
                return object;
            var message = new $root.common_proto.collect_list_output();
            if (object.collectedSources) {
                if (!Array.isArray(object.collectedSources))
                    throw TypeError(".common_proto.collect_list_output.collectedSources: array expected");
                message.collectedSources = [];
                for (var i = 0; i < object.collectedSources.length; ++i) {
                    if (typeof object.collectedSources[i] !== "object")
                        throw TypeError(".common_proto.collect_list_output.collectedSources: object expected");
                    message.collectedSources[i] = $root.common_proto.collect_output.fromObject(object.collectedSources[i]);
                }
            }
            if (object.errorSources) {
                if (!Array.isArray(object.errorSources))
                    throw TypeError(".common_proto.collect_list_output.errorSources: array expected");
                message.errorSources = [];
                for (var i = 0; i < object.errorSources.length; ++i) {
                    if (typeof object.errorSources[i] !== "object")
                        throw TypeError(".common_proto.collect_list_output.errorSources: object expected");
                    message.errorSources[i] = $root.common_proto.collect_error.fromObject(object.errorSources[i]);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from a collect_list_output message. Also converts values to other types if specified.
         * @function toObject
         * @memberof common_proto.collect_list_output
         * @static
         * @param {common_proto.collect_list_output} message collect_list_output
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        collect_list_output.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults) {
                object.collectedSources = [];
                object.errorSources = [];
            }
            if (message.collectedSources && message.collectedSources.length) {
                object.collectedSources = [];
                for (var j = 0; j < message.collectedSources.length; ++j)
                    object.collectedSources[j] = $root.common_proto.collect_output.toObject(message.collectedSources[j], options);
            }
            if (message.errorSources && message.errorSources.length) {
                object.errorSources = [];
                for (var j = 0; j < message.errorSources.length; ++j)
                    object.errorSources[j] = $root.common_proto.collect_error.toObject(message.errorSources[j], options);
            }
            return object;
        };

        /**
         * Converts this collect_list_output to JSON.
         * @function toJSON
         * @memberof common_proto.collect_list_output
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        collect_list_output.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return collect_list_output;
    })();

    return common_proto;
})();

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
