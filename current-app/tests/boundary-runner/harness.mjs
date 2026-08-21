/**
 * Boundary Runner — automated tests v3.
 * Covers: all 6 levels completable, math correctness, scenario families,
 * evidence gates, boundary enforcement, two-stage Far Horizon,
 * valid Safety Corridor deltas, reward contract.
 * Run: node tests/boundary-runner/harness.mjs
 */

import { readFileSync } from 'node:fs';
import { generateLevel, computeReward, seed } from '../../src/lib/content/boundaryRunner.js';

let passed = 0, failed = 0;
function assert(cond, label) { if (cond) passed++; else { failed++; console.error('  FAIL:', label); } }
function assertNear(a, b, tol, label) { assert(Math.abs(a-b) < tol, `${label} (${a} vs ${b})`); }

console.log('\n═══ Boundary Runner Tests v3 ═══\n');

// ── 1. Convergence Run: both sides required ────────────────────
console.log('1. Convergence Run');
seed(42); const l1 = generateLevel(0, 42);
assert(l1.kind === 'converge', 'kind');
[-0.5, -0.1, -0.01, 0.01, 0.1, 0.5].forEach(d =>
  assert(Math.abs(l1.fn(l1.a + d) - l1.L) < 1.5, `approach at ${d}`));
assert(Math.abs(l1.fn(l1.a - 0.01) - l1.L) <= Math.abs(l1.fn(l1.a - 0.5) - l1.L), 'closer tighter');

// ── 2. Ghost Platform: exact point only ────────────────────────
console.log('2. Ghost Platform');
seed(99); const l2 = generateLevel(1, 99);
assert(l2.kind === 'ghost', 'kind');
assert(l2.M !== l2.L, 'M != L');
assert(l2.fn(l2.a) === l2.M, 'exact = M');
assert(Math.abs(l2.fn(l2.a - 0.001) - l2.L) < 0.5, 'nearby-left = L');
assert(Math.abs(l2.fn(l2.a + 0.001) - l2.L) < 0.5, 'nearby-right = L');
assert(Math.abs(l2.fn(l2.a - 0.5) - l2.L) < 1, 'far-left approaches L');
assert(Math.abs(l2.fn(l2.a + 0.5) - l2.L) < 1, 'far-right approaches L');

// ── 3. Split Gate: genuine piecewise jump ──────────────────────
console.log('3. Split Gate');
seed(77); const l3 = generateLevel(2, 77);
assert(l3.kind === 'split', 'kind');
assert(l3.Lleft !== l3.Lright, 'left != right');
assert(l3.fn(l3.a - 0.5) === l3.Lleft, 'left = Lleft');
assert(l3.fn(l3.a + 0.5) === l3.Lright, 'right = Lright');
assert(l3.fn(l3.a) !== l3.Lleft && l3.fn(l3.a) !== l3.Lright, 'at-a is midpoint');

// ── 4. Reactor Wall ────────────────────────────────────────────
console.log('4. Reactor Wall');
seed(13); const l4 = generateLevel(3, 13);
assert(l4.kind === 'reactor', 'kind');
assert(l4.stages.length === 3, '3 stages');
// Each stage has a, fn, answer
l4.stages.forEach((s, i) => {
  assert(typeof s.a === 'number', `stage ${i} a finite`);
  assert(typeof s.fn === 'function', `stage ${i} has fn`);
  assert(['bothPosInf','opposite','finite'].includes(s.answer), `stage ${i} answer valid`);
  assert(Number.isFinite(s.fn(s.a - 0.001)), `stage ${i} fn finite near a`);
});
const bothInf = l4.stages.find(s => s.answer === 'bothPosInf');
const opposite = l4.stages.find(s => s.answer === 'opposite');
const finitePeak = l4.stages.find(s => s.answer === 'finite');
assert(bothInf.fn(bothInf.a - 0.01) > 0 && bothInf.fn(bothInf.a + 0.01) > 0,
  'both-positive stage uses its declared boundary');
assert(Math.abs(bothInf.fn(bothInf.a - 0.01)) > Math.abs(bothInf.fn(bothInf.a - 0.5)),
  'both-positive magnitude grows toward its declared boundary');
assert(opposite.fn(opposite.a - 0.01) < 0 && opposite.fn(opposite.a + 0.01) > 0,
  'opposite stage changes sign across its declared boundary');
assertNear(finitePeak.fn(finitePeak.a), 1000, 0.1,
  'finite peak is centred on its declared boundary');
// At least one stage is finite, at least one is infinite
const answers = l4.stages.map(s => s.answer);
assert(answers.includes('finite'), 'has finite stage');
assert(answers.some(a => a === 'bothPosInf' || a === 'opposite'), 'has infinite stage');

// ── 5. Far Horizon: two stages ─────────────────────────────────
console.log('5. Far Horizon');
seed(55); const l5 = generateLevel(4, 55);
assert(l5.kind === 'farHorizon', 'kind');
assert(l5.a === 0, 'a=0');
assert(Math.abs(l5.fn1(100) - l5.L) < 2, 'exp stage: L approached');
assert(Math.abs(l5.fn2(1000) - l5.L2) < 2, 'rational stage: L2 approached');
assert(l5.L !== l5.L2 || Math.abs(l5.fn1(10) - l5.L) < Math.abs(l5.fn1(1) - l5.L), 'stages distinct');
// Stage 1 cannot directly reach Stage 2 without clearing Stage 1
// (this is a component-level test; here we verify the data model supports it)
assert(typeof l5.L === 'number' && typeof l5.L2 === 'number', 'both limits defined');

// ── 6. Safety Corridor: valid deltas ───────────────────────────
console.log('6. Safety Corridor');
seed(1); const l6 = generateLevel(5, 1);
assert(l6.kind === 'safetyCorridor', 'kind');
assert(l6.rounds.length === 3, '3 rounds');
l6.rounds.forEach((r, i) => {
  assert(r.deltaMin < r.passDelta && r.passDelta < r.deltaMax, `round ${i} pass delta in range`);
  assert(r.deltaMin > 0, `round ${i} deltaMin > 0`);
});
// Verify passDelta actually works
const r0 = l6.rounds[0];
let pass = true;
for (let i = 0; i < 100; i++) {
  const tx = r0.x0 - r0.passDelta + 2 * r0.passDelta * (i / 99);
  if (Math.abs(r0.fn(tx) - r0.L) >= r0.epsilon) pass = false;
}
assert(pass, 'passDelta works for round 0');
// A wide delta fails
let fail = false;
for (let i = 0; i < 100; i++) {
  const tx = r0.x0 - 2.5 + 5 * (i / 99);
  if (Math.abs(r0.fn(tx) - r0.L) >= r0.epsilon) fail = true;
}
assert(fail, 'wide delta fails round 0');
// Round 2 (epsilon=0.1) has a working passDelta
const r2 = l6.rounds[2];
let passR2 = true;
for (let i = 0; i < 100; i++) {
  const tx = r2.x0 - r2.passDelta + 2 * r2.passDelta * (i / 99);
  if (Math.abs(r2.fn(tx) - r2.L) >= r2.epsilon) passR2 = false;
}
assert(passR2, 'round 2 passDelta works');
const selectablePass = Number(
  (r2.deltaMin + Math.round((r2.passDelta - r2.deltaMin) / r2.deltaStep) * r2.deltaStep).toFixed(10)
);
assertNear(selectablePass, r2.passDelta, 1e-10, 'round 2 passDelta is selectable by the slider');
assert(Math.abs(r2.fn(r2.x0 + r2.epsilon / 2) - r2.L) >= r2.epsilon - 1e-10,
  'strict epsilon boundary is rejected');

// ── All 6 generatable ──────────────────────────────────────────
console.log('\n7. All levels');
for (let i = 0; i < 6; i++) {
  const lv = generateLevel(i, i * 100 + 1);
  assert(lv !== null, `level ${i} non-null`);
  assert(typeof lv.kind === 'string', `level ${i} has kind`);
}

// ── Scenario families ──────────────────────────────────────────
console.log('\n8. Scenario variety');
const families = new Set();
for (let i = 0; i < 20; i++) {
  const l1a = generateLevel(0, i);
  if (l1a.family) families.add(l1a.family);
}
assert(families.size >= 2, 'multiple converge families: ' + [...families]);

// ── Reward contract ────────────────────────────────────────────
console.log('\n9. Reward');
const clr = [{cleared:true,perfect:true},{cleared:true,perfect:false},{cleared:true,perfect:true}];
const rNh = computeReward(clr, false);
assert(rNh > 8 && rNh <= 15, 'reward reasonable');
assert(computeReward(clr, true) < rNh, 'hint reduces');
assert(computeReward(clr, false) === computeReward(clr, false), 'pure');
const perfectRun = Array.from({ length: 6 }, () => ({ cleared:true, perfect:true }));
assert(computeReward(perfectRun, false) === 15, 'perfect independent run earns 15');
assert(computeReward(perfectRun, true) === 13, 'hint trade-off remains visible on a perfect run');

// ── Determinism ────────────────────────────────────────────────
seed(42); const d1 = generateLevel(0, 42); seed(42); const d2 = generateLevel(0, 42);
assert(d1.L === d2.L && d1.a === d2.a, 'same seed = same level');
const wallClockSeed = generateLevel(0, 0xffffffff);
assert(Number.isFinite(wallClockSeed.a) && Number.isFinite(wallClockSeed.L),
  'large wall-clock seeds normalize to valid scenario values');

// ── Full simulated journey: all 6 completable ──────────────────
console.log('\n10. Data-model journey');
for (let i = 0; i < 6; i++) {
  const lv = generateLevel(i, i * 42);
  let ok = false;
  if (lv.kind === 'converge') ok = Math.abs(lv.fn(lv.a - 0.01) - lv.L) < 1;
  if (lv.kind === 'ghost') ok = lv.fn(lv.a) !== lv.L && Math.abs(lv.fn(lv.a + 0.01) - lv.L) < 0.5;
  if (lv.kind === 'split') ok = lv.Lleft !== lv.Lright;
  if (lv.kind === 'reactor') ok = lv.stages.length === 3 && lv.stages.every(s => s.a != null);
  if (lv.kind === 'farHorizon') ok = lv.a === 0 && typeof lv.fn2 === 'function';
  if (lv.kind === 'safetyCorridor') ok = lv.rounds.length === 3 && lv.rounds[2].deltaMin < lv.rounds[2].passDelta;
  assert(ok, `level ${i} (${lv.kind}) completable`);
}

// ── No NaN coordinates ─────────────────────────────────────────
console.log('\n11. Component wiring');
const componentSource = readFileSync(
  new URL('../../src/lib/components/assessments/BoundaryRunner.svelte', import.meta.url),
  'utf8'
);
assert(componentSource.includes("farStage === 0 ? level.fn1 : level.fn2"),
  'Far Horizon Stage 1 is wired to fn1 and Stage 2 to fn2');
assert(componentSource.includes("!farEvidenceReady"),
  'Far Horizon prediction is guarded by evidence');
assert(componentSource.includes("!evidenceReady"),
  'finite-boundary answers are guarded by evidence');
assert(componentSource.includes("hintVisible = !hintVisible"),
  'hint control can show and hide');
assert(componentSource.includes(">= epsilon - 1e-10"),
  'Safety Corridor enforces the strict epsilon boundary');
assert(componentSource.includes("let samples = []"),
  'sample collection is initialized before reactive filters run');

console.log('\n12. No NaN');
for (let i = 0; i < 6; i++) {
  const lv = generateLevel(i, i * 7);
  const testX = lv.a || 0;
  if (lv.kind === 'reactor') {
    lv.stages.forEach((s, j) => {
      const y = s.fn(s.a + 0.1);
      assert(!isNaN(y) && isFinite(y), `reactor stage ${j} fn finite`);
    });
  } else if (lv.fn) {
    const y = lv.fn(testX + 0.5);
    assert(!isNaN(y) && isFinite(y), `level ${i} fn finite at test point`);
  }
}

console.log(`\n═══ Results: ${passed} passed, ${failed} failed ═══\n`);
process.exit(failed ? 1 : 0);
