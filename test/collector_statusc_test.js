/* -----------------------------------------------------------------------------
 * @copyright (C) 2023, Alert Logic, Inc
 * @doc
 *
 * Tests for base Alert Logic Collectors Status client
 *
 * @end
 * -----------------------------------------------------------------------------
 */

const fs = require('fs');
const sinon = require('sinon');
const assert = require('assert');
const AimsC = require('../al_servicec').AimsC;
const AlServiceC = require('../al_servicec').AlServiceC;
const m_alMock = require('./al_mock');
const CollectorStatusC = require('../collector_statusc').CollectorStatusC;


describe('Unit Tests', function () {

    describe('Collector_statusc', function () {
        var fakeAuth;
        let fakePut;
        beforeEach(function () {
            fakeAuth = sinon.stub(AimsC.prototype, 'authenticate').callsFake(
                function fakeFn() {
                    return new Promise(function (resolve, reject) {
                        resolve(m_alMock.gen_auth_response());
                    });
                });
        });
        afterEach(function (done) {
            fakeAuth.restore();
            fakePut.restore();
            fs.unlink(m_alMock.CACHE_FILENAME, function (err) {
                done();
            });
        });

        it('Verify send Status called with correct parameter', function (done) {

            fakePut = sinon.stub(AlServiceC.prototype, 'put').callsFake(
                function fakeFn(path, extraOptions) {
                    assert.equal(extraOptions.body, m_alMock.SEND_COLLECTOR_STATUS_BODY_DATA);
                    assert.equal(path, `/statuses/${m_alMock.SEND_COLLECTOR_STATUS_BODY_DATA.status_id}/streams/${m_alMock.SEND_COLLECTOR_STATUS_BODY_DATA.stream}`);
                    done();
                });

            var aimsc = new AimsC(m_alMock.AL_API, m_alMock.AIMS_CREDS);
            var collectorStatus = new CollectorStatusC(m_alMock.COLLECTOR_STATUS_API, aimsc);
            collectorStatus.sendStatus(m_alMock.SEND_COLLECTOR_STATUS_BODY_DATA.status_id, m_alMock.SEND_COLLECTOR_STATUS_BODY_DATA.stream, m_alMock.SEND_COLLECTOR_STATUS_BODY_DATA).then(res => {
                fakePut.restore();
            });
        });

        it('If sequence of parameter is not correct then api throw the error', function (done) {
            const error = {
                "errorinfo": {
                    "error_id": "246A66D0-2910-46E1-9C1F-24359B6714A0",
                    "description": "Stream does not match payload",
                    "code": "stream_mismatch"
                }
            };
            fakePut = sinon.stub(AlServiceC.prototype, 'put').callsFake(
                function fakeFn(path, extraOptions) {
                    return new Promise(function (resolve, reject) {
                        reject(error);
                    });
                });

            var aimsc = new AimsC(m_alMock.AL_API, m_alMock.AIMS_CREDS);
            var collectorStatus = new CollectorStatusC(m_alMock.COLLECTOR_STATUS_API, aimsc);
            collectorStatus.sendStatus(m_alMock.SEND_COLLECTOR_STATUS_BODY_DATA.stream, m_alMock.SEND_COLLECTOR_STATUS_BODY_DATA.status_id, m_alMock.SEND_COLLECTOR_STATUS_BODY_DATA).then(res => {
            }).catch(err => {
                assert.deepEqual(err, error);
                done();
            });
        });

        it('collection_type and inst_type value should be within the defined enum else throw error', function (done) {
            const error = {
                "errorinfo": {
                    "error_id": "5BC87CAB-8CC7-4B36-9B09-3E26B3088F77",
                    "details": {
                        "schema_validation_error": [
                            {
                                "invalid": "data",
                                "schema": {
                                    "type": "string",
                                    "enum": [
                                        "o365",
                                        "auth0",
                                        "Carbonblack",
                                        "Ciscoamp",
                                        "Ciscoduo",
                                        "crowdstrike",
                                        "googlestackdriver",
                                        "gsuite",
                                        "Mimecast",
                                        "salesforce",
                                        "aws_elb_classic",
                                        "s3_audit_logs",
                                        "redshift_connection_logs",
                                        "redshift_user_activity_logs",
                                        "redshift_user_logs",
                                        "vpc_flow_logs_v2",
                                        "aws_elb_application",
                                        "aws_elb_network",
                                        "aws_network_firewall",
                                        "carbon_black_edr",
                                        "aws_eks_log_cwl_export",
                                        "crowdstrike_fdr",
                                        "aws_waf"
                                    ]
                                },
                                "error": "not_in_enum",
                                "data": "CiscoMeraki",
                                "path": [
                                    "collection_type"
                                ]
                            }
                        ]
                    },
                    "description": "JSON Schema Validation error",
                    "code": "schema_validation_error"
                }
            };
            fakePut = sinon.stub(AlServiceC.prototype, 'put').callsFake(
                function fakeFn(path, extraOptions) {
                    return new Promise(function (resolve, reject) {
                        reject(error);
                    });
                });

            var aimsc = new AimsC(m_alMock.AL_API, m_alMock.AIMS_CREDS);
            var collectorStatus = new CollectorStatusC(m_alMock.COLLECTOR_STATUS_API, aimsc);
            m_alMock.SEND_COLLECTOR_STATUS_BODY_DATA.collection_type = 'CiscoMeraki';
            collectorStatus.sendStatus(m_alMock.SEND_COLLECTOR_STATUS_BODY_DATA.stream, m_alMock.SEND_COLLECTOR_STATUS_BODY_DATA.status_id, m_alMock.SEND_COLLECTOR_STATUS_BODY_DATA).then(res => {
            }).catch(err => {
                assert.deepEqual(err.code, error.code);
                done();
            });
        });
    });
});