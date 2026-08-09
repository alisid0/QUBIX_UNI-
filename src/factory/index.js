import { sources } from './sources.js';
import { bb1, selections as sel1, finalised as fin1 } from './bb1-options.js';
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

export { sources };

// Every BB currently in the Factory, in curriculum order. Each carries its own
// selection and finalisation maps so one BB's decisions never leak into another.
export const registry = [
  { key: '1', label: 'BB1', bb: bb1, selections: sel1, finalised: fin1 },
  { key: '2', label: 'BB2', bb: bb2, selections: sel2, finalised: fin2, rejected: rej2 },
  { key: '3', label: 'BB3', bb: bb3, selections: sel3, finalised: fin3, rejected: rej3 },
  { key: '4', label: 'BB4', bb: bb4, selections: sel4, finalised: fin4 },
  { key: '5', label: 'BB5', bb: bb5, selections: sel5, finalised: fin5 },
  { key: '6', label: 'BB6', bb: bb6, selections: sel6, finalised: fin6, gated: gate6 },
  { key: '7', label: 'BB7', bb: bb7, selections: sel7, finalised: fin7, gated: gate7 },
  { key: '8', label: 'BB8', bb: bb8, selections: sel8, finalised: fin8, gated: gate8 },
  { key: '9', label: 'BB9', bb: bb9, selections: sel9, finalised: fin9, gated: gate9 },
  { key: '10', label: 'BB10', bb: bb10, selections: sel9, finalised: fin9, gated: gate9 },
  { key: '11', label: 'BB11', bb: bb11, selections: sel11, finalised: fin11, gated: gate11 },
  { key: '12', label: 'BB12', bb: bb12, selections: sel11, finalised: fin11, gated: gate11 },
  // Proposed pilot. No board number until the map is approved and the existing
  // BB6 to BB12 are renumbered.
  { key: 'area', label: 'Area', bb: area, selections: selA, finalised: finA, rejected: rejA, gated: gateA },
  { key: 'plane', label: 'Plane', bb: plane, selections: selP, finalised: finP, rejected: rejP, gated: gateP }
];

export const entryFor = key => registry.find(e => e.key === key) || registry[0];
