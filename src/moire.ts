autowatch = 1
inlets = 1
outlets = 0

const config = {
  outputLogs: true,
}

import { logFactory } from './utils'
const log = logFactory(config)

const INLET_FOO = 0
const OUTLET_FOO = 0

setinletassist(INLET_FOO, 'Receive messages')

const COLOR_BG = max.getcolor('live_lcd_bg')
const COLOR_LINE = max.getcolor('live_lcd_frame')
const COLOR_TITLE = max.getcolor('live_lcd_title')

const ASPECT = 2
sketch.default2d()
sketch.glloadidentity()

log('reloaded')

type StateVal = number | number[] | boolean

const state: Record<string, StateVal> = {
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
}

function setState(key: keyof typeof state, val: StateVal) {
  state[key] = val
  //log('setState ' + key + ' = ' + val)
  calcLCM()
  draw()
  refresh()
}

function time_base(time_base: number) {
  setState('time_base', time_base)
}
function duration(duration: number) {
  setState('duration', duration)
}
function notes(notes: number) {
  setState('notes', notes)
}
function note_skip(note_skip: number) {
  setState('note_skip', note_skip)
}
function start_steps(start_steps: number) {
  setState('start_steps', start_steps)
}
function step_incr(step_incr: number) {
  setState('step_incr', step_incr)
}
function note_on(noteArr: [number, number]) {
  setState('note_on', noteArr)
}
function note_off(noteOff: boolean) {
  setState('note_off', noteOff)
}
function x_width(x_width: number) {
  setState('x_width', x_width)
}

function LCM(arr: number[]) {
  function gcd(a: number, b: number) {
    if (b === 0) return a
    return gcd(b, a % b)
  }

  let res = arr[0]

  for (let i = 1; i < arr.length; i++) {
    res = (res * arr[i]) / gcd(res, arr[i])
  }

  return res
}

function calcLCM() {
  const start_steps = state.start_steps as number
  const step_incr = state.step_incr as number
  const notes = state.notes as number

  state.steps = []
  for (let i = 0; i < notes; i++) {
    state.steps.push(i * step_incr + start_steps)
  }
  state.lcm = LCM(state.steps)
  log('STEPS: ' + state.steps + ' LCM: ' + state.lcm)
}

function draw() {
  const notes = state.notes as number
  const lcm = state.lcm as number
  const steps = state.steps as number[]
  const x_width = state.x_width as number

  const xStep = 4 / x_width
  const yStep = 2 / notes
  const XMAX = 2
  const XMIN = -2
  let xPos = XMIN
  let yPos = -1
  const gutter = 0.03

  //log('STATE: ' + JSON.stringify(state))
  sketch.glclearcolor(COLOR_BG)
  sketch.glclear()

  sketch.glcolor(COLOR_TITLE)
  for (let row = 0; row < notes; row++) {
    while (xPos < XMAX) {
      sketch.glrect(
        xPos,
        yPos + gutter,
        xPos + Math.max(xStep, gutter / 4.0),
        yPos + Math.max(yStep, gutter / 4.0) - gutter
      )
      xPos = xPos + xStep * steps[row]
    }
    xPos = XMIN
    yPos = yPos + yStep
  }

  sketch.glcolor(COLOR_TITLE)
  sketch.moveto(0, 0)
  sketch.fontsize(11.5)
  sketch.textalign('center', 'center')
  sketch.text(lcm.toString())
}

// NOTE: This section must appear in any .ts file that is directuly used by a
// [js] or [jsui] object so that tsc generates valid JS for Max.
const module = {}
export = {}

draw()
refresh()
