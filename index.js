/* -----------------------------------------------------------------------------
 * @copyright (C) 2018, Alert Logic, Inc
 * @doc
 *
 * Base library for all Alert Logic collectors .
 *
 * @end
 * -----------------------------------------------------------------------------
 */

module.exports = {
    AimsC : require('./al_servicec').AimsC,
    AlServiceC : require('./al_servicec').AlServiceC,
    IngestC : require('./al_servicec').IngestC,
    AzcollectC : require('./azcollectc').AzcollectC,
    EndpointsC : require('./al_servicec').EndpointsC,
    AlLog : require('./al_log')
};

