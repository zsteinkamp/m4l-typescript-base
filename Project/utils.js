"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.debugFactory = void 0;
function debugFactory(_a) {
    var _b = _a === void 0 ? {} : _a, _c = _b.actuallyLog, actuallyLog = _c === void 0 ? true : _c;
    function debug(_) {
        post(Array.prototype.slice.call(arguments).join(' '), '\n');
    }
    if (!actuallyLog) {
        return function () { };
    }
    return debug;
}
exports.debugFactory = debugFactory;
