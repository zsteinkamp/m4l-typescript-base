autowatch = 1;
inlets = 1;
outlets = 1;
var utils_1 = require("./utils");
var debug = (0, utils_1.debugFactory)({ actuallyLog: true });
var INLET_FOO = 0;
var OUTLET_FOO = 0;
setinletassist(INLET_FOO, 'Description of Inlet');
setoutletassist(OUTLET_FOO, 'Description of Outlet');
debug('reloaded');
// NOTE: This section must appear in any .ts file that is directuly used by a
// [js] or [jsui] object so that tsc generates valid JS for Max.
var module = {};
module.exports = {};
