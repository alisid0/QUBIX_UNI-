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
import { func1, selections as selF1, finalised as finF1, rejected as rejF1, gated as gateF1 } from './func1-options.js';
import { func2, selections as selF2, finalised as finF2, rejected as rejF2, gated as gateF2 } from './func2-options.js';

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
export const registry = [
  { key: 'letter', label: 'Letter', bb: bb1, selections: sel1, finalised: fin1, rejected: rej1 },
  { key: 'gap', label: 'Gap', bb: bb2, selections: sel2, finalised: fin2, rejected: rej2 },
  { key: 'second', label: 'Second Letter', bb: bb3, selections: sel3, finalised: fin3, rejected: rej3 },
  { key: 'rate', label: 'Rate', bb: bb4, selections: sel4, finalised: fin4 },
  { key: 'points', label: 'Two Points', bb: bb5, selections: sel5, finalised: fin5 },
  { key: 'notation', label: 'Notation', bb: bb6, selections: sel6, finalised: fin6, gated: gate6 },
  { key: 'powers', label: 'Powers', bb: bb7, selections: sel7, finalised: fin7, gated: gate7 },
  { key: 'time', label: 'Time', bb: bb8, selections: sel8, finalised: fin8, gated: gate8 },
  { key: 'constants', label: 'Constants', bb: bb9, selections: sel9, finalised: fin9, gated: gate9 },
  { key: 'sum', label: 'Sum', bb: bb10, selections: sel9, finalised: fin9, gated: gate9 },
  { key: 'slope', label: 'Slope', bb: bb11, selections: sel11, finalised: fin11, gated: gate11 },
  { key: 'turning', label: 'Turning', bb: bb12, selections: sel11, finalised: fin11, gated: gate11 },
  // Proposed pilot. These sit at the end of the strip rather than in their
  // teaching position, which is before Rate, until the proposal is approved.
  { key: 'area', label: 'Area', bb: area, selections: selA, finalised: finA, rejected: rejA, gated: gateA },
  { key: 'plane', label: 'Plane', bb: plane, selections: selP, finalised: finP, rejected: rejP, gated: gateP },
  { key: 'machine', label: 'Machine', bb: func1, selections: selF1, finalised: finF1, rejected: rejF1, gated: gateF1 },
  { key: 'oneanswer', label: 'One Answer', bb: func2, selections: selF2, finalised: finF2, rejected: rejF2, gated: gateF2 }
];

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
