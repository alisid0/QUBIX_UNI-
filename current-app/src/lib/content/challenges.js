// Challenge runs — randomized, timed drill generators keyed by WorkshopLab
// module id. Unlike the static workshop arrays in workshops.js (fixed content,
// identical on every replay), every call builds a fresh set of targets, so a
// replay is real practice instead of answer recall. Difficulty ramps within
// each run: early steps small/positive, later steps negatives, ions, isotopes,
// bigger numbers.

// ── random helpers ────────────────────────────────────────────────────────────
const ri = (min, max) => min + Math.floor(Math.random() * (max - min + 1));
const pick = (arr) => arr[ri(0, arr.length - 1)];
const riNot = (min, max, exclude) => {
  let v;
  do { v = ri(min, max); } while (exclude.includes(v));
  return v;
};

// ── maths: The Line (coordinate geometry) ────────────────────────────────────
function genPlotPoint(hard) {
  const x = hard ? riNot(-5, 5, [0]) : ri(1, 5);
  const y = hard ? riNot(-5, 5, [0]) : ri(1, 5);
  return {
    type: 'coorddrill', mode: 'plotPoint',
    prompt: hard ? 'Negative directions count too. Plot it.' : 'Across first, then up. Plot it.',
    targetX: x, targetY: y,
    correctFeedback: `Correct. (${x}, ${y}) locked in.`,
    incorrectFeedback: `That address is ${x} across, ${y} ${y >= 0 ? 'up' : 'down'}.`,
  };
}

function genBuildLine(hard) {
  let m = hard ? riNot(-4, 4, [0]) : ri(2, 3);
  let c = hard ? riNot(-5, 5, [0]) : ri(-2, 2);
  if (m === 1 && c === 0) c = 2; // never the starting position
  return {
    type: 'coorddrill', mode: 'buildLine',
    prompt: 'Match the dashed target line.',
    targetM: m, targetC: c,
    correctFeedback: `Correct. Slope ${m}, intercept ${c}.`,
    incorrectFeedback: `The target climbs ${m} per step across and crosses the y-axis at ${c}.`,
  };
}

function genDistance() {
  // 3-4-5 triangle anchored at a random point, random leg orientation.
  const ax = ri(-2, 1), ay = ri(-2, 1);
  return {
    type: 'coorddrill', mode: 'distance',
    prompt: 'Drag B to the target distance from A.',
    fixedPoint: { x: ax, y: ay }, targetDistance: 5, distanceTolerance: 0.4,
    correctFeedback: 'Correct. A 3-4-5 right triangle hides inside that distance.',
    incorrectFeedback: 'Try 3 across and 4 up from A (or 4 across, 3 up) — that is exactly 5.',
  };
}

function genMidpoint() {
  const ax = ri(-5, 1), ay = ri(-5, 1);
  const bx = ax + 2 * ri(1, 4), by = ay + 2 * ri(1, 4);
  return {
    type: 'coorddrill', mode: 'midpoint',
    prompt: 'Drag M exactly halfway between A and B.',
    pointA: { x: ax, y: ay }, pointB: { x: bx, y: by },
    correctFeedback: 'Correct. Average both x values, average both y values.',
    incorrectFeedback: `Midpoint is ((${ax}+${bx})/2, (${ay}+${by})/2) = (${(ax + bx) / 2}, ${(ay + by) / 2}).`,
  };
}

function lineChallenge() {
  return [
    genPlotPoint(false), genPlotPoint(true),
    genBuildLine(false), genBuildLine(true),
    genMidpoint(), genDistance(),
    genPlotPoint(true), genBuildLine(true),
  ];
}

// ── maths: Matrices ───────────────────────────────────────────────────────────
function genMatrixCell() {
  const matrix = Array.from({ length: 3 }, () => Array.from({ length: 3 }, () => ri(1, 20)));
  const row = ri(1, 3), col = ri(1, 3);
  return {
    type: 'matrixcell',
    prompt: `Tap row ${row}, column ${col}.`,
    matrix, targetRow: row, targetCol: col,
    correctFeedback: `Correct. Row ${row}, column ${col} holds ${matrix[row - 1][col - 1]}.`,
    incorrectFeedback: 'Rows go across, columns go down. Find the row first.',
  };
}

const TRANSFORMS = [
  { m: [[2, 0], [0, 1]], desc: 'doubles x, leaves y alone' },
  { m: [[1, 0], [0, 2]], desc: 'doubles y, leaves x alone' },
  { m: [[-1, 0], [0, 1]], desc: 'flips x across the vertical axis' },
  { m: [[1, 0], [0, -1]], desc: 'flips y across the horizontal axis' },
  { m: [[0, 1], [1, 0]], desc: 'swaps x and y' },
  { m: [[2, 0], [0, 2]], desc: 'doubles both x and y' },
];

function applyM(m, p) {
  return [m[0][0] * p[0] + m[0][1] * p[1], m[1][0] * p[0] + m[1][1] * p[1]];
}

function genMatrixTransform() {
  const t = pick(TRANSFORMS);
  const point = [ri(1, 3), ri(1, 3)];
  const out = applyM(t.m, point);
  // Distractors: other transforms' outputs on the same point, deduped against the answer.
  const options = [out];
  for (const other of TRANSFORMS) {
    if (options.length >= 3) break;
    const alt = applyM(other.m, point);
    if (!options.some(o => o[0] === alt[0] && o[1] === alt[1])) options.push(alt);
  }
  return {
    type: 'matrixtransform',
    prompt: `This matrix ${t.desc}. Where does point (${point[0]}, ${point[1]}) land?`,
    matrix: t.m, inputPoint: point, options,
    correctFeedback: `Correct. (${point[0]}, ${point[1]}) becomes (${out[0]}, ${out[1]}).`,
    incorrectFeedback: `The matrix ${t.desc}: (${point[0]}, ${point[1]}) lands on (${out[0]}, ${out[1]}).`,
  };
}

function matricesChallenge() {
  return [
    genMatrixCell(), genMatrixCell(),
    genMatrixTransform(), genMatrixCell(),
    genMatrixTransform(), genMatrixTransform(),
    genMatrixCell(), genMatrixTransform(),
  ];
}

// ── computer: binary & data ───────────────────────────────────────────────────
function genBitPattern() {
  const n = ri(1, 15);
  return {
    type: 'bitpattern',
    prompt: `Flip the switches to show ${n} in binary.`,
    bits: 4, target: n.toString(2).padStart(4, '0'), labels: ['8', '4', '2', '1'],
    correctFeedback: `Correct. ${n.toString(2).padStart(4, '0')} is ${n}.`,
    incorrectFeedback: `${n} = ${[8, 4, 2, 1].filter((v, i) => (n >> (3 - i)) & 1).join(' + ') || '0'}, so the pattern is ${n.toString(2).padStart(4, '0')}.`,
  };
}

function genPixelGrid() {
  // Vertically-symmetric random 4x4 so the target is readable, not noise.
  const rows = Array.from({ length: 4 }, () => {
    const half = `${ri(0, 1)}${ri(0, 1)}`;
    return half + half.split('').reverse().join('');
  });
  // Never all-zero
  if (!rows.join('').includes('1')) rows[1] = '0110';
  return {
    type: 'pixelgrid',
    prompt: 'Paint the grid to match the target exactly.',
    target: rows,
    correctFeedback: 'Matched. Bits become pictures.',
    incorrectFeedback: 'Compare each square against the target, row by row.',
  };
}

function genBitsToNumber(mode) {
  const n = ri(1, 15);
  if (mode === 'read') {
    const options = [n];
    while (options.length < 4) {
      const d = riNot(0, 15, options);
      options.push(d);
    }
    return {
      type: 'bitsnumber', mode: 'read',
      prompt: 'Read the bits. What number is this?',
      shown: n.toString(2).padStart(4, '0'),
      options: options.sort((a, b) => a - b),
      correctFeedback: `Correct. ${n.toString(2).padStart(4, '0')} is ${n}.`,
      incorrectFeedback: `Add up the lit place values — they come to ${n}.`,
    };
  }
  return {
    type: 'bitsnumber', mode: 'build',
    prompt: `Build ${n}. The running total updates as you flip.`,
    bits: 4, target: n,
    correctFeedback: `Correct. ${n} is ${n.toString(2).padStart(4, '0')}.`,
    incorrectFeedback: `Break ${n} into powers of two and flip those switches.`,
  };
}

const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

function genBitsToWord(mode) {
  const letter = LETTERS[ri(0, 25)];
  if (mode === 'read') {
    const options = [letter];
    while (options.length < 4) {
      const d = LETTERS[ri(0, 25)];
      if (!options.includes(d)) options.push(d);
    }
    return {
      type: 'bitsword', mode: 'read',
      prompt: 'Decode the byte. Which letter is it?',
      shown: letter.charCodeAt(0).toString(2).padStart(8, '0'),
      options: options.sort(),
      correctFeedback: `Correct. Code ${letter.charCodeAt(0)} is ${letter}.`,
      incorrectFeedback: `The lit places sum to ${letter.charCodeAt(0)}, which is ${letter}.`,
    };
  }
  return {
    type: 'bitsword', mode: 'build',
    prompt: `Build the byte for ${letter}. Watch the letter card as you flip.`,
    target: letter,
    correctFeedback: `Correct. ${letter} is code ${letter.charCodeAt(0)}.`,
    incorrectFeedback: `${letter} is code ${letter.charCodeAt(0)} — build that number from the place values.`,
  };
}

function binaryChallenge() {
  return [
    genBitsToNumber('build'), genBitPattern(),
    genBitsToNumber('read'), genPixelGrid(),
    genBitsToWord('build'), genBitsToNumber('read'),
    genBitsToWord('read'), genBitPattern(),
  ];
}

// ── computer: logic gates ─────────────────────────────────────────────────────
const GATE_TABLES = {
  AND:  [0, 0, 0, 1], OR: [0, 1, 1, 1], XOR: [0, 1, 1, 0],
  NAND: [1, 1, 1, 0], NOR: [1, 0, 0, 0],
};
const GATE_HINTS = {
  AND: 'on only when both inputs agree at 1',
  OR: 'on when at least one input is 1',
  XOR: 'on only when the inputs disagree',
  NAND: 'the opposite of AND — off only for 1,1',
  NOR: 'the opposite of OR — on only for 0,0',
};

function genGatePick() {
  const names = Object.keys(GATE_TABLES);
  const answer = pick(names);
  const palette = [answer];
  while (palette.length < 4) {
    const g = pick(names);
    if (!palette.includes(g)) palette.push(g);
  }
  // Stable palette order so the answer position isn't a tell.
  palette.sort();
  return {
    type: 'gatebuilder', mode: 'pick',
    prompt: 'Match the truth table. Toggle A and B to test each gate live.',
    chain: 1, palette, targetTable: GATE_TABLES[answer],
    correctFeedback: `Correct. ${answer}: ${GATE_HINTS[answer]}.`,
    incorrectFeedback: `That table is ${answer} — ${GATE_HINTS[answer]}.`,
  };
}

function genGateSolve() {
  const pairs = [
    ['AND', 'OR'], ['OR', 'AND'], ['XOR', 'AND'], ['AND', 'XOR'],
    ['XOR', 'OR'], ['NAND', 'AND'], ['OR', 'XOR'],
  ];
  const [g1, g2] = pick(pairs);
  return {
    type: 'gatebuilder', mode: 'solve',
    prompt: `Light the bulb through ${g1} feeding ${g2}.`,
    chain: 2, gatesLocked: [g1, g2],
    correctFeedback: `Correct. The ${g1} output and C together satisfy the ${g2}.`,
    incorrectFeedback: `Work backwards: what does the ${g2} need, and how does the ${g1} produce it?`,
  };
}

function logicChallenge() {
  return [
    genGatePick(), genGateSolve(),
    genGatePick(), genGatePick(),
    genGateSolve(), genGatePick(),
    genGateSolve(), genGatePick(),
  ];
}

// ── chemistry: atoms & molecules ─────────────────────────────────────────────
// AtomBuilder caps: protons/electrons ≤ 12, neutrons ≤ 14.
const ELEMENTS = [
  { name: 'Hydrogen', p: 1, n: 0 }, { name: 'Helium', p: 2, n: 2 },
  { name: 'Lithium', p: 3, n: 4 }, { name: 'Beryllium', p: 4, n: 5 },
  { name: 'Boron', p: 5, n: 6 }, { name: 'Carbon', p: 6, n: 6 },
  { name: 'Nitrogen', p: 7, n: 7 }, { name: 'Oxygen', p: 8, n: 8 },
  { name: 'Fluorine', p: 9, n: 10 }, { name: 'Neon', p: 10, n: 10 },
  { name: 'Sodium', p: 11, n: 12 }, { name: 'Magnesium', p: 12, n: 12 },
];
const IONS = [
  { name: 'the Na⁺ ion', base: 'Sodium', p: 11, n: 12, e: 10 },
  { name: 'the Mg²⁺ ion', base: 'Magnesium', p: 12, n: 12, e: 10 },
  { name: 'the O²⁻ ion', base: 'Oxygen', p: 8, n: 8, e: 10 },
  { name: 'the F⁻ ion', base: 'Fluorine', p: 9, n: 10, e: 10 },
  { name: 'the Li⁺ ion', base: 'Lithium', p: 3, n: 4, e: 2 },
];
const ISOTOPES = [
  { name: 'carbon-14 (neutral)', p: 6, n: 8, e: 6 },
  { name: 'deuterium, hydrogen-2 (neutral)', p: 1, n: 1, e: 1 },
  { name: 'carbon-13 (neutral)', p: 6, n: 7, e: 6 },
  { name: 'oxygen-18 (neutral)', p: 8, n: 10, e: 8 },
];

function genAtom(tier) {
  if (tier === 0) {
    const el = pick(ELEMENTS);
    return {
      type: 'atombuilder',
      prompt: `Build a neutral ${el.name} atom.`,
      targetName: el.name, targetProtons: el.p, targetNeutrons: el.n, targetElectrons: el.p,
      correctFeedback: `Correct. ${el.name}: ${el.p} protons define it; neutral means electrons match.`,
      incorrectFeedback: `${el.name} needs ${el.p}p / ${el.n}n / ${el.p}e.`,
    };
  }
  if (tier === 1) {
    const ion = pick(IONS);
    return {
      type: 'atombuilder',
      prompt: `Build ${ion.name}. Charge changes electrons, never protons.`,
      targetName: ion.name, targetProtons: ion.p, targetNeutrons: ion.n, targetElectrons: ion.e,
      correctFeedback: `Correct. Still ${ion.base} (${ion.p} protons) — only the electron count moved.`,
      incorrectFeedback: `${ion.name} keeps ${ion.p} protons; the charge means ${ion.e} electrons.`,
    };
  }
  const iso = pick(ISOTOPES);
  return {
    type: 'atombuilder',
    prompt: `Build ${iso.name}. Isotopes change neutrons, nothing else.`,
    targetName: iso.name, targetProtons: iso.p, targetNeutrons: iso.n, targetElectrons: iso.e,
    correctFeedback: `Correct. Same element, heavier nucleus: ${iso.n} neutrons.`,
    incorrectFeedback: `${iso.name} is ${iso.p}p / ${iso.n}n / ${iso.e}e.`,
  };
}

const MOLECULES = [
  { formula: 'H2O', atoms: { H: 2, O: 1 } },
  { formula: 'CO2', atoms: { C: 1, O: 2 } },
  { formula: 'NH3', atoms: { N: 1, H: 3 } },
  { formula: 'CH4', atoms: { C: 1, H: 4 } },
  { formula: 'O2', atoms: { O: 2 } },
  { formula: 'N2', atoms: { N: 2 } },
  { formula: 'H2O2', atoms: { H: 2, O: 2 } },
  { formula: 'C2H6', atoms: { C: 2, H: 6 } },
];

function genMolecule() {
  const mol = pick(MOLECULES);
  return {
    type: 'moleculebuilder',
    prompt: `Build ${mol.formula}. Subscripts count atoms.`,
    targetFormula: mol.formula, targetAtoms: mol.atoms,
    correctFeedback: `Correct. ${mol.formula} assembled.`,
    incorrectFeedback: `Read the subscripts again: ${mol.formula}.`,
  };
}

function chemistryChallenge() {
  return [
    genAtom(0), genMolecule(),
    genAtom(0), genAtom(1),
    genMolecule(), genAtom(1),
    genAtom(2), genMolecule(),
  ];
}

// ── physics: forces & waves ───────────────────────────────────────────────────
function genForceBalance() {
  const target = pick(['balanced', 'left', 'right']);
  // Random start that does NOT already satisfy the target.
  let l, r;
  do { l = ri(0, 5); r = ri(0, 5); }
  while ((target === 'balanced' && l === r) || (target === 'left' && r < l) || (target === 'right' && r > l));
  return {
    type: 'forcebalance',
    prompt: target === 'balanced' ? 'Make the forces cancel exactly.' : `Make the cart move ${target}.`,
    target, startLeft: l, startRight: r,
    correctFeedback: target === 'balanced' ? 'Correct. Equal and opposite: net force zero.' : `Correct. The bigger push wins — net force points ${target}.`,
    incorrectFeedback: 'Compare the two pushes. The cart follows the bigger one.',
  };
}

function genWaveTuner() {
  const amp = ri(1, 5);
  let freq = ri(1, 5);
  if (amp === 1 && freq === 1) freq = ri(2, 5); // not the starting slider position
  return {
    type: 'wavetuner',
    prompt: 'Tune the wave to sit exactly on the dashed target.',
    targetAmplitude: amp, targetFrequency: freq,
    correctFeedback: `Correct. Height ${amp}, crowding ${freq}.`,
    incorrectFeedback: `The target wave has height ${amp} and ${freq} full waves across.`,
  };
}

function physicsChallenge() {
  return [
    genForceBalance(), genWaveTuner(),
    genForceBalance(), genWaveTuner(),
    genForceBalance(), genWaveTuner(),
    genForceBalance(), genWaveTuner(),
  ];
}

// ── maths: functions ──────────────────────────────────────────────────────────
function shuffleOpts(opts) {
  const s = [...opts];
  for (let i = s.length - 1; i > 0; i--) {
    const j = ri(0, i);
    [s[i], s[j]] = [s[j], s[i]];
  }
  return s;
}

function genFunctionValue() {
  const a = ri(2, 5), b = ri(1, 9), x = ri(0, 6);
  const answer = a * x + b;
  const distractors = [...new Set([x + b, a * x, a + b + x])].filter(v => v !== answer).slice(0, 3);
  return {
    type: 'scenario',
    prompt: `Machine f uses f(x) = ${a}x + ${b}. What is f(${x})?`,
    options: shuffleOpts([
      { id: 'correct', label: String(answer), correct: true },
      ...distractors.map((v, i) => ({ id: `d${i}`, label: String(v), correct: false })),
    ]),
    correctFeedback: 'Correct. Put the input into the rule and calculate the output.',
    incorrectFeedback: `Use ${a} × ${x} + ${b} = ${answer}.`,
  };
}

function genBrokenTable() {
  const brokenIn = ri(1, 5);
  const goodOut = brokenIn + ri(2, 5);
  const badOut = goodOut + ri(1, 4);
  const okIn = riNot(1, 6, [brokenIn]);
  const isABroken = ri(0, 1) === 1;
  const tableFor = (broken) => broken
    ? `${brokenIn}→${goodOut}, ${okIn}→${okIn + 2}, ${brokenIn}→${badOut}`
    : `${brokenIn}→${goodOut}, ${okIn}→${okIn + 2}, ${brokenIn}→${goodOut}`;
  return {
    type: 'scenario',
    prompt: `One of these tables is NOT a function.\n\nTable A: ${tableFor(isABroken)}\nTable B: ${tableFor(!isABroken)}`,
    options: shuffleOpts([
      { id: 'a', label: 'Table A', correct: isABroken },
      { id: 'b', label: 'Table B', correct: !isABroken },
    ]),
    correctFeedback: `Correct. Input ${brokenIn} appears twice with different outputs — the machine is unreliable.`,
    incorrectFeedback: `Look for input ${brokenIn} giving both ${goodOut} and ${badOut} in the broken table.`,
  };
}

function genRangeFromDomain() {
  const domain = [0, ri(1, 2), ri(3, 4)];
  const kind = pick(['square', 'double', 'add']);
  const k = ri(2, 5);
  const fn = kind === 'square' ? (x) => x * x : kind === 'double' ? (x) => k * x : (x) => x + k;
  const rule = kind === 'square' ? 'f(x) = x²' : kind === 'double' ? `f(x) = ${k}x` : `f(x) = x + ${k}`;
  const range = domain.map(fn);
  const wrong1 = domain.join(', ');
  const wrong2 = domain.map(x => fn(x) + 1).join(', ');
  return {
    type: 'scenario',
    prompt: `Domain: {${domain.join(', ')}}. Rule: ${rule}. What is the range?`,
    options: shuffleOpts([
      { id: 'correct', label: `{${range.join(', ')}}`, correct: true },
      { id: 'w1', label: `{${wrong1}}`, correct: false },
      { id: 'w2', label: `{${wrong2}}`, correct: false },
    ]),
    correctFeedback: 'Correct. The range is every output the machine actually produces from its domain.',
    incorrectFeedback: `Apply ${rule} to each domain value: {${range.join(', ')}}.`,
  };
}

function genComposition() {
  const b = ri(1, 4), a = ri(2, 4), x = ri(1, 5);
  const mid = x + b, out = a * mid;
  return {
    type: 'scenario',
    prompt: `g(x) = x + ${b} runs first, then f(x) = ${a}x. What is f(g(${x}))?`,
    options: shuffleOpts([
      { id: 'correct', label: String(out), correct: true },
      { id: 'swap', label: String(a * x + b), correct: false },
      { id: 'gonly', label: String(mid), correct: false },
    ]),
    correctFeedback: `Correct. g makes ${mid}, then f turns it into ${out}.`,
    incorrectFeedback: `Inside machine first: ${x} + ${b} = ${mid}, then ${a} × ${mid} = ${out}.`,
  };
}

function genInverseOp() {
  const k = ri(2, 9);
  const kind = pick(['add', 'multiply']);
  const rule = kind === 'add' ? `f(x) = x + ${k}` : `f(x) = ${k}x`;
  const answer = kind === 'add' ? `subtract ${k}` : `divide by ${k}`;
  const wrongs = kind === 'add'
    ? [`add ${k}`, `divide by ${k}`]
    : [`multiply by ${k}`, `subtract ${k}`];
  return {
    type: 'scenario',
    prompt: `Machine: ${rule}. Which operation runs it backwards?`,
    options: shuffleOpts([
      { id: 'correct', label: answer, correct: true },
      ...wrongs.map((w, i) => ({ id: `w${i}`, label: w, correct: false })),
    ]),
    correctFeedback: 'Correct. The inverse undoes the machine and walks the output back to the input.',
    incorrectFeedback: `To undo "${rule.split('= ')[1]}", ${answer}.`,
  };
}

function functionsChallenge() {
  return [
    genFunctionValue(), genBrokenTable(),
    genRangeFromDomain(), genFunctionValue(),
    genComposition(), genInverseOp(),
    genBrokenTable(), genComposition(),
  ];
}

// ── chemistry: Atom Foundry ────────────────────────────────────────────────────
// Full light-element table with shell configs, for the identity/shell drills.
const FOUNDRY_ELEMENTS = [
  { z: 3, symbol: 'Li', name: 'Lithium', n: 4, shells: [2, 1] },
  { z: 4, symbol: 'Be', name: 'Beryllium', n: 5, shells: [2, 2] },
  { z: 5, symbol: 'B', name: 'Boron', n: 6, shells: [2, 3] },
  { z: 6, symbol: 'C', name: 'Carbon', n: 6, shells: [2, 4] },
  { z: 7, symbol: 'N', name: 'Nitrogen', n: 7, shells: [2, 5] },
  { z: 8, symbol: 'O', name: 'Oxygen', n: 8, shells: [2, 6] },
  { z: 9, symbol: 'F', name: 'Fluorine', n: 10, shells: [2, 7] },
  { z: 10, symbol: 'Ne', name: 'Neon', n: 10, shells: [2, 8] },
  { z: 11, symbol: 'Na', name: 'Sodium', n: 12, shells: [2, 8, 1] },
  { z: 12, symbol: 'Mg', name: 'Magnesium', n: 12, shells: [2, 8, 2] },
  { z: 13, symbol: 'Al', name: 'Aluminium', n: 14, shells: [2, 8, 3] },
  { z: 14, symbol: 'Si', name: 'Silicon', n: 14, shells: [2, 8, 4] },
  { z: 15, symbol: 'P', name: 'Phosphorus', n: 16, shells: [2, 8, 5] },
  { z: 16, symbol: 'S', name: 'Sulfur', n: 16, shells: [2, 8, 6] },
  { z: 17, symbol: 'Cl', name: 'Chlorine', n: 18, shells: [2, 8, 7] },
  { z: 18, symbol: 'Ar', name: 'Argon', n: 22, shells: [2, 8, 8] },
];

function genForgeElement() {
  const el = pick(FOUNDRY_ELEMENTS);
  return {
    type: 'atombuilder',
    prompt: `Build a neutral ${el.name} atom from scratch.`,
    targetName: el.name, targetProtons: el.z, targetNeutrons: el.n, targetElectrons: el.z,
    correctFeedback: `Correct. ${el.z} protons define ${el.name}; neutral means the electrons match.`,
    incorrectFeedback: `${el.name} needs ${el.z}p / ${el.n}n / ${el.z}e.`,
  };
}

function genIdentityQuiz() {
  const el = pick(FOUNDRY_ELEMENTS);
  const charge = pick([-2, -1, 0, 1, 2]);
  const e = el.z - charge;
  if (e < 0 || e > 18) return genForgeElement(); // guard rare invalid electron count
  const chSign = charge === 0 ? 'neutral' : charge > 0 ? `${el.symbol}${charge === 1 ? '⁺' : charge + '⁺'}` : `${el.symbol}${charge === -1 ? '⁻' : Math.abs(charge) + '⁻'}`;
  const correct = charge === 0 ? `${el.name}, neutral` : `${el.name} ion (${chSign})`;
  const other = pick(FOUNDRY_ELEMENTS.filter(x => x.z !== el.z));
  return {
    type: 'scenario',
    prompt: `An atom reads ${el.z}p / ${el.n}n / ${e}e. What is it?`,
    options: shuffleOpts([
      { id: 'correct', label: correct, correct: true },
      { id: 'wrongel', label: `${other.name}, neutral`, correct: false },
      { id: 'wrongch', label: charge === 0 ? `${el.name} ion` : `${el.name}, neutral`, correct: false },
    ]),
    correctFeedback: `Correct. ${el.z} protons is ${el.name}; ${el.z} − ${e} electrons gives charge ${charge === 0 ? '0' : charge > 0 ? '+' + charge : charge}.`,
    incorrectFeedback: `${el.z} protons names it ${el.name}. Charge = ${el.z} − ${e} = ${charge === 0 ? '0' : charge > 0 ? '+' + charge : charge}.`,
  };
}

function genShellConfig() {
  const el = pick(FOUNDRY_ELEMENTS);
  const near = FOUNDRY_ELEMENTS.filter(x => Math.abs(x.z - el.z) <= 2 && x.z !== el.z);
  const [d1, d2] = shuffleOpts(near).slice(0, 2);
  return {
    type: 'scenario',
    prompt: `A neutral atom has the shell pattern ${el.shells.join(', ')}. Which element is it?`,
    options: shuffleOpts([
      { id: 'correct', label: el.name, correct: true },
      { id: 'd1', label: (d1 || FOUNDRY_ELEMENTS[0]).name, correct: false },
      { id: 'd2', label: (d2 || FOUNDRY_ELEMENTS[1]).name, correct: false },
    ]),
    correctFeedback: `Correct. Shells ${el.shells.join(', ')} sum to ${el.z} electrons — that is ${el.name}.`,
    incorrectFeedback: `Add the shell counts: ${el.shells.join(' + ')} = ${el.z} electrons, which is ${el.name}.`,
  };
}

function atomFoundryChallenge() {
  // Order per brief B.7: forge, identity, ion, shell, isotope, identity, ion, forge.
  return [
    genForgeElement(), genIdentityQuiz(),
    genAtom(1), genShellConfig(),
    genAtom(2), genIdentityQuiz(),
    genAtom(1), genForgeElement(),
  ];
}

// ── maths: trigonometry (unit circle) ─────────────────────────────────────────
// Exact reference values on the unit circle.
const TRIG_TABLE = [
  { deg: 0,  rad: '0',    cos: '1',      sin: '0',      tan: '0' },
  { deg: 30, rad: 'π/6',  cos: '√3/2',   sin: '1/2',    tan: '1/√3' },
  { deg: 45, rad: 'π/4',  cos: '√2/2',   sin: '√2/2',   tan: '1' },
  { deg: 60, rad: 'π/3',  cos: '1/2',    sin: '√3/2',   tan: '√3' },
  { deg: 90, rad: 'π/2',  cos: '0',      sin: '1',      tan: 'undefined' },
];

function genTrigValue() {
  const row = pick(TRIG_TABLE.filter(r => r.deg !== 90));
  const fn = pick(['cos', 'sin']);
  const answer = row[fn];
  const pool = [...new Set(TRIG_TABLE.map(r => r[fn]))].filter(v => v !== answer && v !== 'undefined');
  const distractors = shuffleOpts(pool).slice(0, 2);
  return {
    type: 'scenario',
    prompt: `On the unit circle, what is ${fn} ${row.deg}°?`,
    options: shuffleOpts([
      { id: 'correct', label: answer, correct: true },
      ...distractors.map((v, i) => ({ id: `d${i}`, label: v, correct: false })),
    ]),
    correctFeedback: `Correct. ${fn} ${row.deg}° = ${answer}.`,
    incorrectFeedback: `${fn} ${row.deg}° = ${answer} — read it straight off the unit circle.`,
  };
}

function genQuadrantSign() {
  const q = ri(1, 4);
  const fn = pick(['sin', 'cos']);
  // sin > 0 in Q1,Q2; cos > 0 in Q1,Q4.
  const positive = fn === 'sin' ? (q === 1 || q === 2) : (q === 1 || q === 4);
  const roman = ['I', 'II', 'III', 'IV'][q - 1];
  return {
    type: 'scenario',
    prompt: `In quadrant ${roman}, is ${fn} θ positive or negative?`,
    options: shuffleOpts([
      { id: 'pos', label: 'Positive', correct: positive },
      { id: 'neg', label: 'Negative', correct: !positive },
    ]),
    correctFeedback: `Correct. ${fn} is the ${fn === 'sin' ? 'height' : 'across'} value; in quadrant ${roman} that is ${positive ? 'above/right of' : 'below/left of'} the axis.`,
    incorrectFeedback: `${fn} θ is ${positive ? 'positive' : 'negative'} in quadrant ${roman}. Picture where the point sits.`,
  };
}

function genSpecialAngle() {
  const row = pick(TRIG_TABLE.filter(r => r.deg !== 0 && r.deg !== 90));
  const fn = pick(['sin', 'cos']);
  const val = row[fn];
  const others = TRIG_TABLE.filter(r => r.deg !== row.deg && r.deg !== 90);
  const distractors = shuffleOpts(others).slice(0, 2).map(r => `${r.deg}°`);
  return {
    type: 'scenario',
    prompt: `Which angle has ${fn} θ = ${val}?`,
    options: shuffleOpts([
      { id: 'correct', label: `${row.deg}°`, correct: true },
      ...distractors.map((d, i) => ({ id: `d${i}`, label: d, correct: false })),
    ]),
    correctFeedback: `Correct. ${fn} ${row.deg}° = ${val}.`,
    incorrectFeedback: `${fn} θ = ${val} at ${row.deg}°.`,
  };
}

function genRadianConvert() {
  const row = pick(TRIG_TABLE.filter(r => r.deg !== 0));
  const toRad = ri(0, 1) === 1;
  if (toRad) {
    const wrong = TRIG_TABLE.filter(r => r.deg !== row.deg && r.deg !== 0).map(r => r.rad);
    return {
      type: 'scenario',
      prompt: `${row.deg}° is how many radians?`,
      options: shuffleOpts([
        { id: 'correct', label: row.rad, correct: true },
        ...shuffleOpts(wrong).slice(0, 2).map((w, i) => ({ id: `d${i}`, label: w, correct: false })),
      ]),
      correctFeedback: `Correct. ${row.deg}° = ${row.rad} radians.`,
      incorrectFeedback: `${row.deg}° = ${row.rad}. A full turn (360°) is 2π.`,
    };
  }
  const wrong = TRIG_TABLE.filter(r => r.deg !== row.deg && r.deg !== 0).map(r => `${r.deg}°`);
  return {
    type: 'scenario',
    prompt: `${row.rad} radians is how many degrees?`,
    options: shuffleOpts([
      { id: 'correct', label: `${row.deg}°`, correct: true },
      ...shuffleOpts(wrong).slice(0, 2).map((w, i) => ({ id: `d${i}`, label: w, correct: false })),
    ]),
    correctFeedback: `Correct. ${row.rad} = ${row.deg}°.`,
    incorrectFeedback: `${row.rad} radians = ${row.deg}°. Remember π = 180°.`,
  };
}

function trigChallenge() {
  return [
    genTrigValue(), genQuadrantSign(),
    genSpecialAngle(), genRadianConvert(),
    genTrigValue(), genQuadrantSign(),
    genRadianConvert(), genSpecialAngle(),
  ];
}

// ── physics: electricity (Circuit Bench) ──────────────────────────────────────
function genOhm() {
  const kind = pick(['I', 'V', 'R']);
  const V = ri(2, 12), R = ri(1, 6);
  if (kind === 'I') {
    const I = +(V / R).toFixed(2);
    return {
      type: 'scenario',
      prompt: `A ${V} V supply drives a ${R} Ω resistor. What is the current? (I = V / R)`,
      options: shuffleOpts([
        { id: 'correct', label: `${I} A`, correct: true },
        { id: 'mul', label: `${V * R} A`, correct: false },
        { id: 'swap', label: `${+(R / V).toFixed(2)} A`, correct: false },
      ]),
      correctFeedback: `Correct. I = V / R = ${V} / ${R} = ${I} A.`,
      incorrectFeedback: `I = V / R = ${V} / ${R} = ${I} A.`,
    };
  }
  if (kind === 'V') {
    const I = ri(1, 4);
    const Vans = I * R;
    return {
      type: 'scenario',
      prompt: `A current of ${I} A flows through a ${R} Ω resistor. What is the voltage across it? (V = I × R)`,
      options: shuffleOpts([
        { id: 'correct', label: `${Vans} V`, correct: true },
        { id: 'div', label: `${+(I / R).toFixed(2)} V`, correct: false },
        { id: 'sum', label: `${I + R} V`, correct: false },
      ]),
      correctFeedback: `Correct. V = I × R = ${I} × ${R} = ${Vans} V.`,
      incorrectFeedback: `V = I × R = ${I} × ${R} = ${Vans} V.`,
    };
  }
  const I = ri(1, 4);
  const Vv = I * ri(2, 6);
  const Rans = +(Vv / I).toFixed(1);
  return {
    type: 'scenario',
    prompt: `${Vv} V pushes ${I} A through a component. What is its resistance? (R = V / I)`,
    options: shuffleOpts([
      { id: 'correct', label: `${Rans} Ω`, correct: true },
      { id: 'mul', label: `${Vv * I} Ω`, correct: false },
      { id: 'swap', label: `${+(I / Vv).toFixed(2)} Ω`, correct: false },
    ]),
    correctFeedback: `Correct. R = V / I = ${Vv} / ${I} = ${Rans} Ω.`,
    incorrectFeedback: `R = V / I = ${Vv} / ${I} = ${Rans} Ω.`,
  };
}

function genSeriesParallel() {
  const series = ri(0, 1) === 1;
  const q = series
    ? { prompt: 'Two identical bulbs are in series with one battery. Compared with a single bulb, each is:',
        correct: 'Dimmer', wrong: 'Brighter',
        cf: 'Correct. Series shares one current and splits the voltage, so each bulb is dimmer.',
        icf: 'Series splits the voltage and adds resistance — each bulb is dimmer.' }
    : { prompt: 'Two identical bulbs are in parallel across one battery. Compared with a single bulb, each is:',
        correct: 'Same brightness', wrong: 'Dimmer',
        cf: 'Correct. Each parallel branch gets the full voltage, so each bulb is as bright as one alone.',
        icf: 'Parallel gives each branch the full voltage — each bulb stays at full brightness.' };
  return {
    type: 'scenario',
    prompt: q.prompt,
    options: shuffleOpts([
      { id: 'correct', label: q.correct, correct: true },
      { id: 'wrong', label: q.wrong, correct: false },
    ]),
    correctFeedback: q.cf,
    incorrectFeedback: q.icf,
  };
}

function genBreak() {
  const series = ri(0, 1) === 1;
  return {
    type: 'scenario',
    prompt: `Three bulbs are wired in ${series ? 'series' : 'parallel'}. One bulb is unscrewed. What happens to the others?`,
    options: shuffleOpts([
      { id: 'correct', label: series ? 'They all go dark' : 'They stay lit', correct: true },
      { id: 'wrong', label: series ? 'They stay lit' : 'They all go dark', correct: false },
    ]),
    correctFeedback: series
      ? 'Correct. Series has one path — a single break opens the loop and all bulbs die.'
      : 'Correct. Parallel branches are independent, so removing one leaves the others lit.',
    incorrectFeedback: series
      ? 'Series is a single loop: break it anywhere and every bulb goes out.'
      : 'Parallel branches are independent — the others keep their own full path.',
  };
}

function genPower() {
  const I = ri(1, 5), V = ri(2, 12);
  const P = I * V;
  return {
    type: 'scenario',
    prompt: `A device draws ${I} A at ${V} V. What power does it use? (P = I × V)`,
    options: shuffleOpts([
      { id: 'correct', label: `${P} W`, correct: true },
      { id: 'sum', label: `${I + V} W`, correct: false },
      { id: 'div', label: `${+(V / I).toFixed(1)} W`, correct: false },
    ]),
    correctFeedback: `Correct. P = I × V = ${I} × ${V} = ${P} W.`,
    incorrectFeedback: `P = I × V = ${I} × ${V} = ${P} W.`,
  };
}

function circuitChallenge() {
  return [
    genOhm(), genSeriesParallel(),
    genOhm(), genBreak(),
    genPower(), genOhm(),
    genSeriesParallel(), genBreak(),
  ];
}

// ── physics: motion ───────────────────────────────────────────────────────────
function genSpeedVsVelocity() {
  const scalar = ri(0, 1) === 1;
  const q = scalar
    ? { prompt: 'Which of these is a scalar (size only, no direction)?', correct: 'Speed', wrong: 'Velocity' }
    : { prompt: 'Which of these is a vector (has a direction)?', correct: 'Velocity', wrong: 'Speed' };
  return {
    type: 'scenario',
    prompt: q.prompt,
    options: shuffleOpts([
      { id: 'correct', label: q.correct, correct: true },
      { id: 'wrong', label: q.wrong, correct: false },
    ]),
    correctFeedback: 'Correct. Speed is size only; velocity is speed with a direction.',
    incorrectFeedback: 'Speed is a scalar (size only). Velocity is a vector (size and direction).',
  };
}

function genGraphRead() {
  const kind = pick([
    { g: 'a flat position-time line', ans: 'At rest (not moving)', wrong: ['Speeding up', 'Moving fast'] },
    { g: 'a straight, sloped position-time line', ans: 'Constant velocity', wrong: ['Accelerating', 'At rest'] },
    { g: 'a velocity-time line climbing from zero', ans: 'Speeding up', wrong: ['Constant speed', 'At rest'] },
    { g: 'a flat velocity-time line above zero', ans: 'Constant velocity', wrong: ['Speeding up', 'Slowing down'] },
    { g: 'a velocity-time line below the axis', ans: 'Moving backwards', wrong: ['At rest', 'Speeding up'] },
  ]);
  return {
    type: 'scenario',
    prompt: `A motion shows ${kind.g}. What is the object doing?`,
    options: shuffleOpts([
      { id: 'correct', label: kind.ans, correct: true },
      ...kind.wrong.map((w, i) => ({ id: `w${i}`, label: w, correct: false })),
    ]),
    correctFeedback: `Correct. ${kind.g.charAt(0).toUpperCase() + kind.g.slice(1)} means: ${kind.ans.toLowerCase()}.`,
    incorrectFeedback: `${kind.g.charAt(0).toUpperCase() + kind.g.slice(1)} means the object is: ${kind.ans.toLowerCase()}.`,
  };
}

function genKinematics() {
  const kind = pick(['speed', 'accel', 'relative']);
  if (kind === 'speed') {
    const d = ri(20, 100), t = ri(2, 10);
    const v = +(d / t).toFixed(1);
    return {
      type: 'scenario',
      prompt: `An object covers ${d} m in ${t} s at a steady rate. What is its speed? (speed = distance / time)`,
      options: shuffleOpts([
        { id: 'correct', label: `${v} m/s`, correct: true },
        { id: 'mul', label: `${d * t} m/s`, correct: false },
        { id: 'swap', label: `${+(t / d).toFixed(2)} m/s`, correct: false },
      ]),
      correctFeedback: `Correct. speed = ${d} / ${t} = ${v} m/s.`,
      incorrectFeedback: `speed = distance / time = ${d} / ${t} = ${v} m/s.`,
    };
  }
  if (kind === 'accel') {
    const dv = ri(4, 20), t = ri(2, 5);
    const a = +(dv / t).toFixed(1);
    return {
      type: 'scenario',
      prompt: `Velocity rises by ${dv} m/s over ${t} s. What is the acceleration? (a = change in v / time)`,
      options: shuffleOpts([
        { id: 'correct', label: `${a} m/s²`, correct: true },
        { id: 'mul', label: `${dv * t} m/s²`, correct: false },
        { id: 'swap', label: `${+(t / dv).toFixed(2)} m/s²`, correct: false },
      ]),
      correctFeedback: `Correct. a = ${dv} / ${t} = ${a} m/s².`,
      incorrectFeedback: `a = change in velocity / time = ${dv} / ${t} = ${a} m/s².`,
    };
  }
  // relative velocity: two objects, same or opposite direction
  const a = ri(3, 12), b = ri(2, 8), same = ri(0, 1) === 1;
  const rel = same ? Math.abs(a - b) : a + b;
  return {
    type: 'scenario',
    prompt: `Two cars move at ${a} m/s and ${b} m/s in the ${same ? 'same' : 'opposite'} direction. How fast does one see the other approach or recede?`,
    options: shuffleOpts([
      { id: 'correct', label: `${rel} m/s`, correct: true },
      { id: 'other', label: `${same ? a + b : Math.abs(a - b)} m/s`, correct: false },
    ]),
    correctFeedback: same
      ? `Correct. Same direction: subtract — ${a} − ${b} = ${rel} m/s relative.`
      : `Correct. Opposite directions: add — ${a} + ${b} = ${rel} m/s relative.`,
    incorrectFeedback: same
      ? `Same direction means subtract the velocities: ${rel} m/s.`
      : `Opposite directions means add the velocities: ${rel} m/s.`,
  };
}

function motionChallenge() {
  return [
    genSpeedVsVelocity(), genGraphRead(),
    genKinematics(), genGraphRead(),
    genKinematics(), genSpeedVsVelocity(),
    genGraphRead(), genKinematics(),
  ];
}

// ── registry ──────────────────────────────────────────────────────────────────
const CHALLENGES = {
  'line-core': { build: lineChallenge, timeLimitSec: 150 },
  'functions': { build: functionsChallenge, timeLimitSec: 150 },
  'trigonometry': { build: trigChallenge, timeLimitSec: 150 },
  'electricity': { build: circuitChallenge, timeLimitSec: 150 },
  'motion': { build: motionChallenge, timeLimitSec: 150 },
  'matrices': { build: matricesChallenge, timeLimitSec: 120 },
  'binary-data': { build: binaryChallenge, timeLimitSec: 120 },
  'logic-gates': { build: logicChallenge, timeLimitSec: 150 },
  'atom-foundry': { build: atomFoundryChallenge, timeLimitSec: 150 },
  'chemistry-core': { build: chemistryChallenge, timeLimitSec: 180 },
  'forces-waves': { build: physicsChallenge, timeLimitSec: 120 },
  // Tier A coverage modules reuse existing randomized generators.
  'coord-geometry': { build: lineChallenge, timeLimitSec: 150 },
  'coord-maps': { build: lineChallenge, timeLimitSec: 150 },
  'linear-graphs': { build: lineChallenge, timeLimitSec: 150 },
  'atomic-structure': { build: chemistryChallenge, timeLimitSec: 180 },
  'nucleus-isotopes': { build: chemistryChallenge, timeLimitSec: 180 },
  'chem-bonding': { build: chemistryChallenge, timeLimitSec: 180 },
  'bonding-types': { build: chemistryChallenge, timeLimitSec: 180 },
  'molecular-arch': { build: chemistryChallenge, timeLimitSec: 180 },
  // Tier B coverage modules.
  'momentum': { build: physicsChallenge, timeLimitSec: 120 },
  'mole-reactions': { build: chemistryChallenge, timeLimitSec: 180 },
  'counting-atoms': { build: chemistryChallenge, timeLimitSec: 180 },
  'biomolecules': { build: chemistryChallenge, timeLimitSec: 180 },
  'forces': { build: physicsChallenge, timeLimitSec: 120 },
  'si-scale': { build: physicsChallenge, timeLimitSec: 120 },
  'scale-estimation': { build: physicsChallenge, timeLimitSec: 120 },
  // Series II modules reuse the topic-matched generators.
  'functions-2': { build: functionsChallenge, timeLimitSec: 150 },
  'trig-2': { build: trigChallenge, timeLimitSec: 150 },
  'coord-geometry-2': { build: lineChallenge, timeLimitSec: 150 },
  'linear-graphs-2': { build: lineChallenge, timeLimitSec: 150 },
  'binary-2': { build: binaryChallenge, timeLimitSec: 120 },
  'logic-2': { build: logicChallenge, timeLimitSec: 150 },
  'atomic-2': { build: chemistryChallenge, timeLimitSec: 180 },
  'bonding-2': { build: chemistryChallenge, timeLimitSec: 180 },
  'mole-2': { build: chemistryChallenge, timeLimitSec: 180 },
  'counting-2': { build: chemistryChallenge, timeLimitSec: 180 },
  'biomolecules-2': { build: chemistryChallenge, timeLimitSec: 180 },
  'motion-2': { build: motionChallenge, timeLimitSec: 150 },
  'forces-2': { build: physicsChallenge, timeLimitSec: 120 },
  'electricity-2': { build: circuitChallenge, timeLimitSec: 150 },
  'momentum-2': { build: physicsChallenge, timeLimitSec: 120 },
  'si-2': { build: physicsChallenge, timeLimitSec: 120 },
  'thermo-2': { build: physicsChallenge, timeLimitSec: 120 },
  // Series III modules with topic-matched generators.
  'line-2': { build: lineChallenge, timeLimitSec: 150 },
  'matrices-2': { build: matricesChallenge, timeLimitSec: 120 },
  'coord-maps-2': { build: lineChallenge, timeLimitSec: 150 },
  'isotopes-2': { build: chemistryChallenge, timeLimitSec: 180 },
  'bonding-types-2': { build: chemistryChallenge, timeLimitSec: 180 },
  'arch-2': { build: chemistryChallenge, timeLimitSec: 180 },
  'quant-2': { build: chemistryChallenge, timeLimitSec: 180 },
  'units-2': { build: physicsChallenge, timeLimitSec: 120 },
  'optics-2': { build: physicsChallenge, timeLimitSec: 120 },
  'waves-2': { build: physicsChallenge, timeLimitSec: 120 },
  'estimation-2': { build: physicsChallenge, timeLimitSec: 120 },
  'measure-2': { build: physicsChallenge, timeLimitSec: 120 },
  // Series IV modules with topic-matched generators.
  'functions-3': { build: functionsChallenge, timeLimitSec: 150 },
  'trig-3': { build: trigChallenge, timeLimitSec: 150 },
  'coord-geometry-3': { build: lineChallenge, timeLimitSec: 150 },
  'binary-3': { build: binaryChallenge, timeLimitSec: 120 },
  'logic-3': { build: logicChallenge, timeLimitSec: 150 },
  'structure-2': { build: chemistryChallenge, timeLimitSec: 180 },
  'atomic-3': { build: chemistryChallenge, timeLimitSec: 180 },
  'bonding-3': { build: chemistryChallenge, timeLimitSec: 180 },
  'mole-3': { build: chemistryChallenge, timeLimitSec: 180 },
  'counting-3': { build: chemistryChallenge, timeLimitSec: 180 },
  'motion-3': { build: motionChallenge, timeLimitSec: 150 },
  'electricity-3': { build: circuitChallenge, timeLimitSec: 150 },
  'momentum-3': { build: physicsChallenge, timeLimitSec: 120 },
};

/** Fresh randomized challenge for a WorkshopLab module, or null if none exists. */
export function getChallengeForModule(moduleId) {
  const entry = CHALLENGES[moduleId];
  if (!entry) return null;
  return { interactions: entry.build(), timeLimitSec: entry.timeLimitSec };
}
