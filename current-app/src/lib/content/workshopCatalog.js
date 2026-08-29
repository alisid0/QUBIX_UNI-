import { getComputerWorkshopModules, getPhysicsWorkshopModules } from './workshops.js';
import { getSeriesIIModules } from './workshops2.js';

// Navigation-only workshop metadata. Keep this separate from WorkshopLab.svelte:
// topic pages need labels and destinations, not every interactive component.
const module = (id, title, sub, pathId) => ({ id, title, sub, pathId });

const CORE = {
  mathematics: [
    module('line-core', 'Plot, build, and measure', 'Drag real points and lines on a live coordinate plane.', 'LINE_001'),
    module('functions-basics', 'Functions basics', 'Baby steps: rules, one-output, f(x), domain, graphs, shapes, inverses, chains.', 'MATH_FUNCTIONS'),
    module('functions-or-not', 'Function or not?', 'Sort everyday and maths examples: one arrow per input, or a fork?', 'MATH_FUNCTIONS'),
    module('functions', 'Function machine', 'Feed inputs, repair broken rules, graph outputs, reverse machines, and chain functions.', 'MATH_FUNCTIONS'),
    module('transformation-lab', 'Transformation lab', 'Drag a curve onto its target: translate, stretch, and flip any function.', 'MATH_FUNCTIONS'),
    module('exp-logs', 'Exponents and logarithms', 'Read powers, growth, decay, logs, and inverse relationships.', 'MATH_EXP_LOGS'),
    module('matrices', 'Spreadsheet to space machine', 'Read cells, store data, and transform points.', 'MATH_MATRICES'),
    module('trigonometry', 'Unit circle and wave lab', 'Drag the angle, read cos and sin, and unwrap the sine wave.', 'MATH_TRIG_ADV'),
    module('differentiation', 'Derivative control room', 'Use slopes, rules, units, and rates without guesswork.', 'MATH_DIFF'),
    module('rate-interval', 'Rate over an interval', 'Drag an interval on a distance–time curve and read its average speed as a secant slope.', 'MATH_DIFF'),
    module('local-linearity', 'Local linearity', 'Zoom into a curve until it straightens — or stays a sharp corner.', 'MATH_DIFF'),
    module('secant-tangent', 'Secant to tangent', 'Squeeze a secant to h→0 to get the tangent slope, then paint the derivative graph.', 'MATH_DIFF'),
    module('probability', 'The long run', 'Read the odds off a spinner, then spin it and watch the rate settle on the theory.', 'MATH_PROBABILITY'),
    module('coord-geometry', 'Coordinate geometry', 'Plot points, measure distance, find midpoints, and match lines.', 'MATH_COORD'),
    module('coord-maps', 'Coordinate maps', 'Read and write coordinates across all four quadrants.', 'MATH_COORD_MAPS'),
    module('linear-graphs', 'Lines and gradients', 'Build y = mx + c and feel how slope and intercept move a line.', 'MATH_LINEAR_GRAPHS'),
    module('limits', 'Limits and continuity', 'Reason about the value a function approaches, even where it breaks.', 'MATH_LIMITS'),
    module('asymptote-lab', 'Asymptote lab', 'Read where a curve blows up and where it levels off — place the walls and floors.', 'MATH_LIMITS')
  ],
  computer: [
    module('bit-machine', 'Bit machine lab', 'Build numbers, carry bits, and run tiny machine instructions.', 'BIT_001'),
    module('ai-era', 'AI-era computing', 'Sort rule-writing from machine learning, and see what changed.', 'COMP_AI_ERA'),
    module('ai-behind', 'AI behind the curtain', 'Tokens, weights, training vs use, and why models hallucinate.', 'COMP_AI_BEHIND')
  ],
  chemistry: [
    module('atom-foundry', 'Atom Foundry', 'Forge a nucleus, fill the shells, and strip electrons into ions.', 'ATOM_001'),
    module('bond-lab', 'Bond bench', 'Place atoms on the bench and form compounds by sharing or transferring electrons.', 'CHEM_STRUCTURE_REACTIONS'),
    module('equation-balancer', 'Equation Balancer', 'Adjust coefficients and watch each element balance on both sides, live.', 'CHEM_STRUCTURE_REACTIONS'),
    module('chemistry-core', 'Atom and molecule builder', 'Build atoms, ions, isotopes, water, and carbon dioxide.', 'ATOM_001'),
    module('chemistry-structure', 'Chemical structure and reactions', 'Build ions, sort bonding, read molecular shape, and balance reaction logic.', 'CHEM_STRUCTURE_REACTIONS'),
    module('quant-chem', 'Mole and reaction lab', 'Convert mass to moles, read ratios, find limits, and reverse formulas.', 'CHEM_QUANT'),
    module('atomic-structure', 'Atomic structure', 'Build atoms and ions, and see what protons and electrons decide.', 'CHEM_ATOMIC'),
    module('nucleus-isotopes', 'Nucleus and isotopes', 'Change neutrons to build isotopes without changing the element.', 'CHEM_NUCLEUS_ISOTOPES'),
    module('chem-bonding', 'Chemical bonding', 'Share or transfer electrons and watch stable compounds form.', 'CHEM_BONDING'),
    module('bonding-types', 'Bonding types', 'Sort ionic, covalent, and metallic bonding by what electrons do.', 'CHEM_BONDING_TYPES'),
    module('molecular-arch', 'Molecular architecture', 'Build molecules from formulas and read their real shapes.', 'CHEM_ARCH'),
    module('mole-reactions', 'Reactions and the mole', 'Read balanced equations as ratios and build the products.', 'CHEM_MOLE'),
    module('counting-atoms', 'Counting atoms', 'Read a formula as a count and total the atoms in a molecule.', 'CHEM_MOLE_COUNTING'),
    module('biomolecules', 'Biomolecules', 'See why carbon builds life, and assemble the molecules of respiration.', 'CHEM_BIOMOLECULES')
  ],
  physics: [
    module('unit-forge', 'Unit forge lab', 'Measure, convert, build derived units, and catch impossible answers.', 'PHYS_001'),
    module('motion', 'Motion Lab', 'Set a velocity, hit run, and watch the motion graphs draw themselves.', 'PHY_MOTION_FOUNDATIONS'),
    module('momentum', 'Collision Lab', 'Crash two carts, share momentum, and watch kinetic energy grow with speed.', 'PHY_ENERGY_MOMENTUM'),
    module('forces', 'Forces and Newton', 'Balance pushes, then break the balance, and feel all three of Newton’s laws.', 'PHY_FORCES'),
    module('si-scale', 'SI units and scale', 'Cancel units, read prefixes, and keep measurements honest.', 'PHY_SI_SCALE'),
    module('scale-estimation', 'Scale, estimation and errors', 'Round to powers of ten, estimate fast, and read significant figures.', 'PHY_SCALE'),
    module('measurement-limits', 'Measurement limits', 'Sort random from systematic error, and see why precision is bounded.', 'PHY_MEASUREMENT_LIMITS'),
    module('foundations', 'Foundations and frontiers', 'Sort phenomena by scale and see how models earn (and lose) trust.', 'PHY_INTRO'),
    module('electricity', 'Circuit Bench', 'Close the loop, drive the current, and compare series with parallel — live.', 'PHY_ELECTRICITY'),
    module('optics', 'Reflection and refraction bench', 'Trace rays, reason through mirrors, refraction, lenses, and Snell law.', 'PHY_OPTICS')
  ]
};

const COMPUTER_PATHS = {
  'binary-data': 'BIT_001',
  'logic-gates': 'BIT_001',
  'code-algorithms': 'COMP_CODE_COMMAND',
  'hardware-memory': 'COMP_HARDWARE',
  'networks-cloud': 'COMP_NETWORKS_SECURITY',
  'security-architecture': 'COMP_SYSTEM_DESIGN'
};

const TRACK_LABELS = {
  mathematics: 'Mathematics',
  computer: 'Computer Science',
  chemistry: 'Chemistry',
  physics: 'Physics'
};

const lightweight = (entry, fallbackPath) => ({
  id: entry.id,
  title: entry.title,
  sub: entry.sub,
  pathId: entry.pathId || fallbackPath
});

const CATALOG = {
  mathematics: [...CORE.mathematics, ...getSeriesIIModules('mathematics').map((entry) => lightweight(entry))],
  computer: [
    ...CORE.computer,
    ...getComputerWorkshopModules().map((entry) => lightweight(entry, COMPUTER_PATHS[entry.id] || 'BIT_001')),
    ...getSeriesIIModules('computer').map((entry) => lightweight(entry))
  ],
  chemistry: [...CORE.chemistry, ...getSeriesIIModules('chemistry').map((entry) => lightweight(entry))],
  physics: [
    ...CORE.physics,
    ...getPhysicsWorkshopModules().map((entry) => lightweight(entry, 'PHYS_001')),
    ...getSeriesIIModules('physics').map((entry) => lightweight(entry))
  ]
};

export function getWorkshopsForPath(pathId) {
  const matches = [];
  for (const [track, modules] of Object.entries(CATALOG)) {
    for (const item of modules) {
      if (item.pathId === pathId) {
        matches.push({ ...item, track, trackLabel: TRACK_LABELS[track] });
      }
    }
  }
  return matches;
}

