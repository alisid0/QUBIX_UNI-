import { sources } from './sources.js';
import { bb1, selections as sel1, finalised as fin1, rejected as rej1 } from './bb1-options.js';
import { bb2, selections as sel2, finalised as fin2, rejected as rej2 } from './bb2-options.js';
import { bb3, selections as sel3, finalised as fin3, rejected as rej3 } from './bb3-options.js';
import { bb4, selections as sel4, finalised as fin4 } from './bb4-options.js';
import { bb5, selections as sel5, finalised as fin5 } from './bb5-options.js';
import { bb6, selections as sel6, finalised as fin6, gated as gate6 } from './bb6-options.js';
import { bb7, selections as sel7, finalised as fin7, gated as gate7 } from './bb7-options.js';
import { bb8, selections as sel8, finalised as fin8, gated as gate8 } from './bb8-options.js';
import { bb9, bb10, selections as sel9, finalised as fin9, gated as gate9 } from './bb9-options.js';
import { bb11, bb12, selections as sel11, finalised as fin11, gated as gate11 } from './bb11-options.js';
import { area, selections as selA, finalised as finA, rejected as rejA, gated as gateA } from './area-options.js';
import { plane, selections as selP, finalised as finP, rejected as rejP, gated as gateP } from './plane-options.js';
import { plot, selections as selPlot, finalised as finPlot, rejected as rejPlot, gated as gatePlot } from './plot-options.js';
import { lineSlope, selections as selLineSlope, finalised as finLineSlope, rejected as rejLineSlope, gated as gateLineSlope } from './line-slope-options.js';
import { func0, selections as selF0, finalised as finF0, rejected as rejF0, gated as gateF0 } from './func0-options.js';
import { func1, selections as selF1, finalised as finF1, rejected as rejF1, gated as gateF1 } from './func1-options.js';
import { func2, selections as selF2, finalised as finF2, rejected as rejF2, gated as gateF2 } from './func2-options.js';
import { decimal, selections as selDec, finalised as finDec, rejected as rejDec, gated as gateDec } from './decimal-options.js';
import { number, selections as selNum, finalised as finNum, rejected as rejNum, gated as gateNum } from './number-options.js';

export { sources };

// Every BB currently in the Factory, in curriculum order. Each carries its own
// selection and finalisation maps so one BB's decisions never leak into another.
//
// Boards are identified by name rather than by number. A number is a position in
// a sequence, and the pilot proposal would move most of these: inserting the two
// geometry boards renumbers everything after BB5, so BB7 would silently become a
// different board. A name survives that. The board number still exists as the
// running order below and in the curriculum map; it is simply no longer what the
// board is called.
//
// The permanent identifier is still bb.id (CME-CHANGE-007, FCG-AREA-001). Those
// are per-strand and unaffected by renumbering, so they are not touched here.
// Boards belong to a unit. Founder direction of 2026-08-09: the three function
// boards are one thing, not three, because each is unusable without the one
// before it. The switch earns the machine and the machine earns the rule.
//
// A unit is not a bigger board. Each of its boards is still selected, recorded
// and approved on its own. What the unit says is that they may not be reordered
// or split up, and that a learner meets them in this order or not at all.
export const registry = [
  // Foundations. Repairs of prerequisites the course has assumed since its first
  // board and has never taught. Not a new topic; a hole the map already records.
  { key: 'number', unit: 'foundations', label: 'Number', bb: number, selections: selNum, finalised: finNum, rejected: rejNum, gated: gateNum },
  { key: 'decimal', unit: 'foundations', label: 'Decimals', bb: decimal, selections: selDec, finalised: finDec, rejected: rejDec, gated: gateDec },
  { key: 'letter', unit: 'variables', label: 'Letter', bb: bb1, selections: sel1, finalised: fin1, rejected: rej1 },
  { key: 'gap', unit: 'variables', label: 'Gap', bb: bb2, selections: sel2, finalised: fin2, rejected: rej2 },
  { key: 'second', unit: 'variables', label: 'Second Letter', bb: bb3, selections: sel3, finalised: fin3, rejected: rej3 },
  // Functions. One sequence, three boards, strictly in this order.
  { key: 'button', unit: 'functions', label: 'Button', bb: func0, selections: selF0, finalised: finF0, rejected: rejF0, gated: gateF0 },
  { key: 'machine', unit: 'functions', label: 'Machine', bb: func1, selections: selF1, finalised: finF1, rejected: rejF1, gated: gateF1 },
  { key: 'oneanswer', unit: 'functions', label: 'One Answer', bb: func2, selections: selF2, finalised: finF2, rejected: rejF2, gated: gateF2 },
  { key: 'area', unit: 'geometry', label: 'Area', bb: area, selections: selA, finalised: finA, rejected: rejA, gated: gateA },
  { key: 'plane', unit: 'geometry', label: 'Plane', bb: plane, selections: selP, finalised: finP, rejected: rejP, gated: gateP },
  { key: 'plot', unit: 'geometry', label: 'Plot', bb: plot, selections: selPlot, finalised: finPlot, rejected: rejPlot, gated: gatePlot },
  { key: 'line-slope', unit: 'geometry', label: 'Line slope', bb: lineSlope, selections: selLineSlope, finalised: finLineSlope, rejected: rejLineSlope, gated: gateLineSlope },
  // The differential calculus. The pilot proposal moves these out of the first
  // course and makes them the opening of the next one.
  { key: 'rate', unit: 'rates', label: 'Rate', bb: bb4, selections: sel4, finalised: fin4 },
  { key: 'points', unit: 'rates', label: 'Two Points', bb: bb5, selections: sel5, finalised: fin5 },
  { key: 'notation', unit: 'rates', label: 'Notation', bb: bb6, selections: sel6, finalised: fin6, gated: gate6 },
  { key: 'powers', unit: 'rates', label: 'Powers', bb: bb7, selections: sel7, finalised: fin7, gated: gate7 },
  { key: 'time', unit: 'rates', label: 'Time', bb: bb8, selections: sel8, finalised: fin8, gated: gate8 },
  { key: 'constants', unit: 'rates', label: 'Constants', bb: bb9, selections: sel9, finalised: fin9, gated: gate9 },
  { key: 'sum', unit: 'rates', label: 'Sum', bb: bb10, selections: sel9, finalised: fin9, gated: gate9 },
  { key: 'slope', unit: 'rates', label: 'Slope', bb: bb11, selections: sel11, finalised: fin11, gated: gate11 },
  { key: 'turning', unit: 'rates', label: 'Turning', bb: bb12, selections: sel11, finalised: fin11, gated: gate11 }
];

export const UNITS = [
  { key: 'foundations', name: 'Foundations', blurb: 'Prerequisites the course assumes and has never taught.' },
  { key: 'variables', name: 'Variables', blurb: 'What a letter is, and what changing one means.' },
  { key: 'functions', name: 'Functions', blurb: 'One sequence. The switch earns the machine, and the machine earns the rule.' },
  { key: 'geometry', name: 'Coordinate geometry', blurb: 'Counting a surface, then finding a place on one.' },
  { key: 'rates', name: 'Rates and derivatives', blurb: 'Proposed to leave this course and open the next.' }
];

// The strip is drawn from this, so a board with no unit cannot silently vanish.
export const byUnit = UNITS.map(u => ({
  ...u,
  boards: registry.filter(e => e.unit === u.key)
}));

// Links written before the rename used ?bb=7. Kept so the founder's saved URLs
// and anything quoted in the curriculum documents still open the right board.
const LEGACY_KEYS = {
  '1': 'letter', '2': 'gap', '3': 'second', '4': 'rate', '5': 'points', '6': 'notation',
  '7': 'powers', '8': 'time', '9': 'constants', '10': 'sum', '11': 'slope', '12': 'turning'
};

export const entryFor = key =>
  registry.find(e => e.key === key) ||
  registry.find(e => e.key === LEGACY_KEYS[key]) ||
  registry[0];
