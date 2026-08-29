/**
 * Problem-led workshop experiences. The syllabus name stays hidden until the
 * learner has experimented, stated a rule, and transferred it to a new case.
 *
 * `track` is the workshop subject the experience belongs to, so the shell can
 * open the correct subject rail. `kind` selects the specialised game component
 * in WorkshopLab (logic-vault -> SolveFirst, force-lab -> SolveFirstForces,
 * coordinate-signal -> SolveFirstCoordinates, boundary-runner -> BoundaryRunner,
 * network-routing -> SolveFirstNetworks, fuel-rate -> SolveFirstDifferentiation).
 */
const SOLVE_FIRST = {
  'logic-gates': {
    id: 'lockers-and-or',
    moduleId: 'logic-gates',
    conceptLabel: 'Logic gates',
    pathId: 'BIT_001',
    track: 'computer',
    kind: 'logic-vault',
    eyebrow: 'Unmarked problem 01',
    title: 'Crack the Lockers',
    sub: 'No lesson first. Operate two security systems, prove their rules, then uncover AND and OR.',
    rewardLabel: 'Access Architect'
  },
  'forces-waves': {
    id: 'forces-stop-the-cart',
    moduleId: 'forces-waves',
    conceptLabel: 'Balanced forces',
    pathId: 'PHYS_001',
    track: 'physics',
    kind: 'force-lab',
    eyebrow: 'Unmarked problem 02',
    title: 'Stop the Cart',
    sub: 'No lesson first. Command two opposing thrusters, prove what makes a cart move or hold still, then name the rule.',
    rewardLabel: 'Force Controller'
  },
  'line-core': {
    id: 'coordinate-find-the-signal',
    moduleId: 'line-core',
    conceptLabel: 'Coordinates',
    pathId: 'LINE_001',
    track: 'mathematics',
    kind: 'coordinate-signal',
    eyebrow: 'Unmarked problem 03',
    title: 'Find the Signal',
    sub: 'Inspect a solved route, then use two signed moves to rebuild the map, recover four signals, and route a warehouse robot.',
    rewardLabel: 'Grid Navigator'
  },
  'limits': {
    id: 'limits-recover-the-reading',
    moduleId: 'limits',
    conceptLabel: 'Limits',
    pathId: 'MATH_LIMITS',
    track: 'mathematics',
    kind: 'boundary-runner',
    eyebrow: 'Unmarked problem 04',
    title: 'Boundary Runner',
    sub: 'No lesson first. Command two probe ships from opposite sides of a damaged portal, gather evidence, survive infinite barriers, and complete the safety corridor.',
    rewardLabel: 'Boundary Analyst'
  },
  'differentiation': {
    id: 'differentiation-forecourt-flow',
    moduleId: 'differentiation',
    conceptLabel: 'Differentiation',
    pathId: 'MATH_DIFF',
    track: 'mathematics',
    kind: 'fuel-rate',
    eyebrow: 'Unmarked problem 05',
    title: 'Run the Forecourt',
    sub: 'No lesson first. Refill an underground petrol tank, read how fast its level is changing, and keep the pumps running through rush hour.',
    rewardLabel: 'Flow Controller'
  },
  'networks-cloud': {
    id: 'networks-connect-the-computers',
    moduleId: 'networks-cloud',
    conceptLabel: 'Computer networks',
    pathId: 'COMP_NETWORKS_SECURITY',
    track: 'computer',
    kind: 'network-routing',
    eyebrow: 'Unmarked problem 06',
    title: 'Connect the Computers',
    sub: 'No lesson first. Link two computers, scale to a room, break the network on purpose, and discover which design fits each job.',
    rewardLabel: 'Network Architect'
  },
  'hardware-memory': {
    id: 'hardware-memory-clear-the-rack',
    moduleId: 'hardware-memory',
    conceptLabel: 'Memory allocation',
    pathId: 'COMP_HARDWARE',
    track: 'computer',
    kind: 'memory-allocation',
    eyebrow: 'Unmarked problem 15',
    title: 'The Allocator',
    sub: 'No lesson first. Run one strip of memory addresses: allocate blocks, free them, watch fragmentation block a request, then discover why paging beats compaction.',
    rewardLabel: 'Memory Marshal'
  },
  'matrices': {
    id: 'matrices-warp-the-grid',
    moduleId: 'matrices',
    conceptLabel: 'Matrices',
    pathId: 'MATH_MATRICES',
    track: 'mathematics',
    kind: 'matrix-warp',
    eyebrow: 'Unmarked problem 07',
    title: 'Warp the Grid',
    sub: 'No lesson first. Bend a shape with two guide arrows, prove they decide where every point lands, then name the machine.',
    rewardLabel: 'Space Bender'
  },
  'probability': {
    id: 'probability-trust-the-detector',
    moduleId: 'probability',
    conceptLabel: 'Probability',
    pathId: 'MATH_PROBABILITY',
    track: 'mathematics',
    kind: 'bayes-screen',
    eyebrow: 'Unmarked problem 08',
    title: 'Trust the Detector',
    sub: 'No lesson first. Sweep a treasure field, predict whether a beep is really gold, then watch the rare truth split from a crowd of false alarms.',
    rewardLabel: 'Base-Rate Reader'
  },
  'motion': {
    id: 'motion-trajectory',
    moduleId: 'motion',
    conceptLabel: 'Projectile motion',
    pathId: 'PHY_MOTION_FOUNDATIONS',
    track: 'physics',
    kind: 'projectile-arc',
    eyebrow: 'Unmarked problem 09',
    title: 'Trajectory',
    sub: 'No lesson first. Aim a launcher, arc shots onto flags and over walls, then discover why 45° flies farthest.',
    rewardLabel: 'Range Master'
  },
  'coord-geometry': {
    id: 'coord-geometry-vector-racer',
    moduleId: 'coord-geometry',
    conceptLabel: 'Vectors',
    pathId: 'MATH_COORD',
    track: 'mathematics',
    kind: 'vector-race',
    eyebrow: 'Unmarked problem 10',
    title: 'Vector Racer',
    sub: 'No lesson first. Race a car around a grid track by picking velocity vectors, then discover why momentum makes you plan the racing line.',
    rewardLabel: 'Racing Line'
  },
  'trigonometry': {
    id: 'trigonometry-ramp-rider',
    moduleId: 'trigonometry',
    conceptLabel: 'Trigonometry',
    pathId: 'MATH_TRIG_ADV',
    track: 'mathematics',
    kind: 'ramp-rider',
    eyebrow: 'Unmarked problem 11',
    title: 'Skyhook',
    sub: 'No lesson first. Run a rescue crane, discover that up and across are locked to the angle by two stubborn ratios, then take one shot on intel alone.',
    rewardLabel: 'Ratio Rigger'
  },
  'sine-waves': {
    id: 'sine-waves-signal-hacker',
    moduleId: 'sine-waves',
    conceptLabel: 'Sine waves',
    pathId: 'MATH_TRIG_ADV',
    track: 'mathematics',
    kind: 'signal-hacker',
    eyebrow: 'Unmarked problem 12',
    title: 'The Big Wheel',
    sub: 'No lesson first. A spinning wheel draws its height onto scrolling paper. Recreate the recorded rides, then set the dials from a bare formula — and see why every sine wave is a circle in disguise.',
    rewardLabel: 'Wave Rider'
  },
  'conic-sections': {
    id: 'conic-sections-orbit-architect',
    moduleId: 'conic-sections',
    conceptLabel: 'Conic sections',
    pathId: 'MATH_COORD',
    track: 'mathematics',
    kind: 'orbit-architect',
    eyebrow: 'Unmarked problem 13',
    title: 'Ropeworks',
    sub: 'No lesson first. Two anchors, one rope, a stylus pulled taut — sweep orbits through drifting debris and discover that an ellipse is nothing but a rope length shared between two points.',
    rewardLabel: 'Focus Finder'
  },
  'polar-coordinates': {
    id: 'polar-coordinates-polar-aegis',
    moduleId: 'polar-coordinates',
    conceptLabel: 'Polar coordinates',
    pathId: 'MATH_TRIG_ADV',
    track: 'mathematics',
    kind: 'polar-aegis',
    eyebrow: 'Unmarked problem 14',
    title: 'Radar Nine',
    sub: 'No lesson first. Tag blips by range and bearing, translate the tower\'s language onto the old grid map, then program a rose-curve fence where petal alignment — not petal count — wins the raid.',
    rewardLabel: 'Polar Operator'
  },
  'electricity': {
    id: 'electricity-live-wire',
    moduleId: 'electricity',
    conceptLabel: "Ohm's law",
    pathId: 'PHY_ELECTRICITY',
    track: 'physics',
    kind: 'ohm-circuit',
    eyebrow: 'Unmarked problem 16',
    title: 'Live Wire',
    sub: 'No lesson first. Drive current through a workbench circuit, keep a device from burning out, then uncover the law tying voltage, current, and resistance together.',
    rewardLabel: 'Current Controller'
  }
};

export function getSolveFirst(moduleId) {
  const item = SOLVE_FIRST[moduleId];
  return item ? { ...item } : null;
}

export function getFeaturedSolveFirst() {
  return { ...SOLVE_FIRST['logic-gates'] };
}

/** All Solve First experiences, for the dedicated "Solve First" category. */
export function getAllSolveFirst() {
  return Object.values(SOLVE_FIRST).map((x) => ({ ...x }));
}
