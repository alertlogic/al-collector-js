# al-collector-js

[![Build Status](https://secure.travis-ci.org/alertlogic/al-collector-js.png?branch=master)](http://travis-ci.org/alertlogic/al-collector-js)

Alert Logic cloud collector common library.


# Overview

This repository contains the common JavaScript functions used by Node.js collectors in the cloud.  

# HOWTO consume this library in Node.js

`npm install --save @alertlogic/al-collector-js`

# Compiling proto

You will need `pbjs` tool in order to compile protobuf definitions located in [proto](proto):

```
npm install -g protobufjs
make pb-clean
make pb
```

# Debugging

To get a debug trace, set an Node.js environment variable called DEBUG and
specify the JavaScript module/s to debug.

E.g.

```
export DEBUG=*
export DEBUG=index
```

Or set an environment variable called "DEBUG" in your AWS stack (using the AWS 
console) for the "alertlogic-cwe-collector" AWS Lambda function, with 
value "index" or "*".

See [debug](https://www.npmjs.com/package/debug) for further details.

# Known Issues/ Open Questions

- TBD.

# Useful Links

- [Node.js static code analysis tool](http://jshint.com/install/)
- [Node.js rewire testing tool](https://github.com/jhnns/rewire)
- [Node.js sinon testing tool](http://sinonjs.org/)
- [pbjs manual](http://dcode.io/protobuf.js/#pbjs-for-javascript)
