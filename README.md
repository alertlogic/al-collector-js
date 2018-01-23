# al-collector-js

[![Build Status](https://secure.travis-ci.org/alertlogic/al-collector-js.png?branch=master)](http://travis-ci.org/alertlogic/al-collector-js)

Alert Logic cloud collector common library.


# Overview

This repository contains the common JavaScript functions used by Node.js collectors in the cloud.  

# HOWTO consume this library in Node.js

Create a `package.json` file for [npm](https://www.npmjs.com/) 2.7.0 (or greater) 
in the root of your Node.js directory.  Include this repo in the 
`dependencies` and `devDependencies` section as required.  

For example:

```
{
  "name": "al-my-collector",
  "version": "1.0.0",
  "description": "Alert Logic My Collector",
  "repository": {},
  "private": true,
  "scripts": {
    "start": "node index.js",
    "lint": "jshint --exclude \"./node_modules/*\" **/*.js",
    "test": "JUNIT_REPORT_PATH=./test/report.xml nyc --reporter=cobertura mocha --colors --reporter mocha-jenkins-reporter"
  },
  "devDependencies": {
    "dotenv": "*",
    "clone": "*",
    "jshint": "^2.9.5",
    "mocha": "^3.5.3",
    "mocha-jenkins-reporter": "^0.3.10",
    "nyc": "^11.3.0",
    "rewire": "^2.5.2",
    "sinon": "^3.3.0"
  },
  "dependencies": {
    "async": "*",
    "moment": "^2.19.2",
    "request": "*",
    "request-promise-native": "*",
    "al-collector-js": "git://github.com/alertlogic/al-collector-js#master"
  },
  "author": "Alert Logic Inc."
}
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
