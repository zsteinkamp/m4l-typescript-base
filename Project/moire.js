"use strict";
autowatch = 1;
inlets = 1;
outlets = 0;
var config = {
    outputLogs: true,
};
var utils_1 = require("./utils");
var log = (0, utils_1.logFactory)(config);
var INLET_FOO = 0;
var OUTLET_FOO = 0;
setinletassist(INLET_FOO, 'Receive messages');
var COLOR_BG = max.getcolor('live_lcd_bg');
var COLOR_LINE = max.getcolor('live_lcd_frame');
var COLOR_TITLE = max.getcolor('live_lcd_title');
var ASPECT = 2;
sketch.default2d();
sketch.glloadidentity();
log('reloaded');
var state = {
    time_base: 250,
    duration: 125,
    notes: 8,
    note_skip: 1,
    start_steps: 4,
    step_incr: 1,
    steps: [],
    lcm: 12,
    note_on: [60, 127],
    note_off: true,
    x_width: 100,
};
function setState(key, val) {
    state[key] = val;
    //log('setState ' + key + ' = ' + val)
    calcLCM();
    draw();
    refresh();
}
function time_base(time_base) {
    setState('time_base', time_base);
}
function duration(duration) {
    setState('duration', duration);
}
function notes(notes) {
    setState('notes', notes);
}
function note_skip(note_skip) {
    setState('note_skip', note_skip);
}
function start_steps(start_steps) {
    setState('start_steps', start_steps);
}
function step_incr(step_incr) {
    setState('step_incr', step_incr);
}
function note_on(noteArr) {
    setState('note_on', noteArr);
}
function note_off(noteOff) {
    setState('note_off', noteOff);
}
function x_width(x_width) {
    setState('x_width', x_width);
}
function LCM(arr) {
    function gcd(a, b) {
        if (b === 0)
            return a;
        return gcd(b, a % b);
    }
    var res = arr[0];
    for (var i = 1; i < arr.length; i++) {
        res = (res * arr[i]) / gcd(res, arr[i]);
    }
    return res;
}
function calcLCM() {
    var start_steps = state.start_steps;
    var step_incr = state.step_incr;
    var notes = state.notes;
    state.steps = [];
    for (var i = 0; i < notes; i++) {
        state.steps.push(i * step_incr + start_steps);
    }
    state.lcm = LCM(state.steps);
    log('STEPS: ' + state.steps + ' LCM: ' + state.lcm);
}
function draw() {
    var notes = state.notes;
    var lcm = state.lcm;
    var steps = state.steps;
    var x_width = state.x_width;
    var xStep = 4 / x_width;
    var yStep = 2 / notes;
    var XMAX = 2;
    var XMIN = -2;
    var xPos = XMIN;
    var yPos = -1;
    var gutter = 0.03;
    //log('STATE: ' + JSON.stringify(state))
    sketch.glclearcolor(COLOR_BG);
    sketch.glclear();
    sketch.glcolor(COLOR_TITLE);
    for (var row = 0; row < notes; row++) {
        while (xPos < XMAX) {
            sketch.glrect(xPos, yPos + gutter, xPos + Math.max(xStep, gutter / 4.0), yPos + Math.max(yStep, gutter / 4.0) - gutter);
            xPos = xPos + xStep * steps[row];
        }
        xPos = XMIN;
        yPos = yPos + yStep;
    }
    sketch.glcolor(COLOR_TITLE);
    sketch.moveto(0, 0);
    sketch.fontsize(11.5);
    sketch.textalign('center', 'center');
    sketch.text(lcm.toString());
}
// NOTE: This section must appear in any .ts file that is directuly used by a
// [js] or [jsui] object so that tsc generates valid JS for Max.
var module = {};
draw();
refresh();
module.exports = {};
