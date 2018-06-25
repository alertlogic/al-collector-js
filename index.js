/* -----------------------------------------------------------------------------
 * @copyright (C) 2018, Alert Logic, Inc
 * @doc
 *
 * Classes for communication to Alert Logic services.
 *
 * @end
 * -----------------------------------------------------------------------------
 */

module.exports = {
    AimsC : require('./al_servicec').AimsC,
    AlServiceC : require('./al_servicec').AlServiceC,
    IngestC : require('./al_servicec').IngestC,
    AzcollectC : require('./al_servicec').AzcollectC,
    EndpointsC : require('./al_servicec').EndpointsC
};
