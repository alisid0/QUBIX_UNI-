/**
 * Boundary Runner — limits discovery math engine v3.
 *
 * Six levels with seeded scenario families and known ground truth.
 * Every function is deterministic, numerically clean, and viewport-safe.
 *
 *   1. Convergence Run — shared two-sided limit
 *   2. Ghost Platform — limit ≠ exact point value
 *   3. Split Gate — piecewise jump, left ≠ right
 *   4. Reactor Wall — 3 sequential stages: infinite both, opposite, large finite
 *   5. Far Horizon — 2 stages: exponential settling, rational asymptote
 *   6. Safety Corridor — epsilon–delta with valid delta bounds
 */
let _seed = 0;
export function seed(s) {
  _seed = (Number(s) >>> 0) % 2147483647;
  if (_seed === 0) _seed = 1;
}
function rng() { _seed = (_seed * 16807 + 0) % 2147483647; return _seed / 2147483647; }
function pick(arr) { return arr[Math.floor(rng() * arr.length)]; }

// ── Level 1: Convergence Run ───────────────────────────────────
// Scenario families: linear, quadratic-above, quadratic-below
export function generateConvergenceRun() {
  const L = 3 + Math.floor(rng() * 5);
  const a = pick([-2, -1, 0, 1, 2, 3]);
  const family = pick(['quad-up','quad-down','linear']);
  let fn;
  if (family === 'linear') {
    const slope = pick([0.5, -0.5, 1, -1, 2, -2]);
    fn = (x) => Number((L + slope * (x - a)).toFixed(4));
  } else if (family === 'quad-up') {
    fn = (x) => Number((L + (x - a) * (x - a)).toFixed(4));
  } else {
    fn = (x) => Number((L - (x - a) * (x - a)).toFixed(4));
  }
  return { kind:'converge', a, L, fn, family,
    hint: 'Compare the very nearest West and East readings — are they heading the same way?' };
}

// ── Level 2: Ghost Platform ────────────────────────────────────
// Only x===a is displaced; nearby still approaches L.
export function generateGhostPlatform() {
  const L = 2 + Math.floor(rng() * 5);
  const M = L + pick([3, 4, -3, -4]);
  const a = pick([-2, -1, 0, 1, 2]);
  const k = pick([1, -1]);
  const fn = (x) => {
    if (x === a) return M;
    return Number((L + k * (x - a) * (x - a)).toFixed(4));
  };
  return { kind:'ghost', a, L, M, fn,
    hint: 'One reading sits alone. Ignore it — follow the trail the other readings form.' };
}

// ── Level 3: Split Gate ────────────────────────────────────────
// Piecewise: f(x<a)=Lleft, f(x>a)=Lright, f(a)=midpoint.
export function generateSplitGate() {
  const Lleft = 1 + Math.floor(rng() * 4);
  const Lright = Lleft + 3 + Math.floor(rng() * 4);
  const a = pick([-1, 0, 1, 2]);
  const fAtA = Number(((Lleft + Lright) / 2).toFixed(4));
  const fn = (x) => {
    if (x < a) return Lleft;
    if (x > a) return Lright;
    return fAtA;
  };
  return { kind:'split', a, Lleft, Lright, fAtA, fn,
    hint: 'Estimate each side independently. If West says 3 and East says 8, a single "average" fools no one.' };
}

// ── Level 4: Reactor Wall ──────────────────────────────────────
// Three sequential stages, each with its own a/fn/answer.
// Descriptions are neutral — they don't reveal the answer.
export function generateReactorWall() {
  const bothA = pick([-2, 0, 2]);
  const oppositeA = pick([-2, 0, 2]);
  const finiteA = pick([-2, 0, 2]);
  const stages = [
    {
      a: bothA, fn: (x) => Number((1 / ((x - bothA) * (x - bothA))).toFixed(4)),
      answer: 'bothPosInf',
      desc: 'Pressure reading near the forbidden coordinate.',
      label: 'Forbidden coordinate A'
    },
    {
      a: oppositeA, fn: (x) => Number((1 / (x - oppositeA)).toFixed(4)),
      answer: 'opposite',
      desc: 'Pressure reading near the forbidden coordinate.',
      label: 'Forbidden coordinate B'
    },
    {
      a: finiteA,
      fn: (x) => Number((1000 / (1 + 80 * (x - finiteA) * (x - finiteA))).toFixed(1)),
      answer: 'finite',
      desc: 'Pressure reading near the forbidden coordinate.',
      label: 'Forbidden coordinate C'
    }
  ];
  // Shuffle stage order while keeping all three
  const shuffled = [...stages].sort(() => rng() - 0.5);
  return { kind:'reactor', stages:shuffled,
    hint: 'Does the reading keep climbing as you get closer? Or does it level off at a large but finite peak?' };
}

// ── Level 5: Far Horizon ───────────────────────────────────────
// Two sequential stages with known ground truth.
// a=0 is the start-of-view anchor. fxScale sets the viewport.
export function generateFarHorizon() {
  const L = 20 + Math.floor(rng() * 30);
  const start = L + 40 + Math.floor(rng() * 40);
  const decay = 0.3 + rng() * 0.5;
  const fn1 = (t) => Number((L + (start - L) * Math.exp(-decay * t)).toFixed(2));
  const L2 = 5 + Math.floor(rng() * 10);
  const fn2 = (x) => Number(((L2 * x + 3) / (x + 1)).toFixed(4));
  return { kind:'farHorizon', a:0, L, L2, fn1, fn2,
    hint: 'Check readings at larger and larger inputs — what number do they creep toward?' };
}

// ── Level 6: Safety Corridor ───────────────────────────────────
// Three rounds with valid delta bounds per round.
// For f(x)=2x+1, L=5: choosing delta<epsilon/2 guarantees
// |f(x)-5|<epsilon whenever 0<|x-2|<delta.
export function generateSafetyCorridor() {
  const rounds = [
    { epsilon:1.0, x0:2, fn:(x)=>2*x+1, L:5, label:'Tolerance ±1.0',
      deltaMin:0.02, deltaMax:3, deltaStep:0.02, passDelta:0.48 },
    { epsilon:0.5, x0:2, fn:(x)=>2*x+1, L:5, label:'Tolerance ±0.5',
      deltaMin:0.02, deltaMax:2, deltaStep:0.02, passDelta:0.24 },
    { epsilon:0.1, x0:2, fn:(x)=>2*x+1, L:5, label:'Tolerance ±0.1',
      deltaMin:0.01, deltaMax:1, deltaStep:0.01, passDelta:0.04 }
  ];
  return { kind:'safetyCorridor', rounds,
    hint: 'A tighter output band normally needs a tighter input corridor. Try halving delta when epsilon halves.' };
}

// ── Level catalog ──────────────────────────────────────────────
export const LEVEL_NAMES = [
  'Convergence Run','Ghost Platform','Split Gate',
  'Reactor Wall','Far Horizon','Safety Corridor'
];
export const LEVEL_DESCRIPTIONS = [
  'Two probes approach from opposite sides. Close in and recover the shared destination.',
  'Nearby readings converge, but the exact point reports a different value.',
  'Left and right probes head toward different destinations. A single value cannot survive.',
  'Readings near forbidden coordinates. Distinguish unbounded growth from a large finite peak — three checks.',
  'Send probes outward. What does the system settle to over long distance? Two stages.',
  'Choose an input corridor. Challenge probes tested inside it must land within the output band. Three rounds.',
];

// ── Hints per level (used by the component) ────────────────────
export const LEVEL_HINTS = [
  'Compare the nearest West and East readings — do they agree?',
  'One dot sits far from the others. Follow the trail, not the loner.',
  'Estimate each side on its own first. If they disagree, no single number works.',
  'Watch the magnitude as you close in — does it keep doubling, or settle?',
  'Check readings at larger and larger inputs. What number do they approach?',
  'When epsilon halves, the safe delta usually halves too. Try matching them.'
];

export function generateLevel(ix, rngSeed) {
  seed(rngSeed);
  const gens = [
    generateConvergenceRun, generateGhostPlatform, generateSplitGate,
    generateReactorWall, generateFarHorizon, generateSafetyCorridor
  ];
  return gens[ix] ? gens[ix]() : null;
}

export function computeReward(levelResults, hintUsed) {
  const c = levelResults.filter(r=>r.cleared).length;
  const p = levelResults.filter(r=>r.perfect).length;
  const performance = Math.min(13, 4 + c + Math.floor(p / 2));
  return performance + (hintUsed ? 0 : 2);
}
