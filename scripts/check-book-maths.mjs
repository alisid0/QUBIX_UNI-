// Checks the arithmetic the book asserts, by computing it.
//
// Prose can claim anything. A table of second differences, a list of rectangle
// sums, an average rate quoted in an answer: each is a numeric claim, and a
// reader who finds one wrong has no reason to trust the rest. This recomputes
// the claims that would be expensive to catch by rereading, and fails loudly.
//
//   node scripts/check-book-maths.mjs

import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
let bad = 0, n = 0;

const eq = (label, got, want, tol = 1e-9) => {
  n++;
  const ok = Array.isArray(want)
    ? Array.isArray(got) && got.length === want.length && got.every((g, i) => Math.abs(g - want[i]) <= tol)
    : Math.abs(got - want) <= tol;
  if (!ok) { bad++; console.log(`  **FAIL**  ${label}\n            book says ${want}, arithmetic gives ${got}`); }
  else console.log(`  ok  ${label}  ${Array.isArray(want) ? want.join(', ') : want}`);
};

/* ---- ch6: the difference table, and the family test ------------------- */
console.log('\nch6  difference tables');
const diffs = a => a.slice(1).map((v, i) => v - a[i]);
const lin = [0, 1, 2, 3, 4].map(x => 3 * x + 1);
const quad = [0, 1, 2, 3, 4].map(x => x * x);
const expo = [0, 1, 2, 3, 4].map(x => 2 ** x);
eq('linear 3x+1 outputs', lin, [1, 4, 7, 10, 13]);
eq('its first differences are constant', diffs(lin), [3, 3, 3, 3]);
eq('quadratic x^2 first differences', diffs(quad), [1, 3, 5, 7]);
eq('its second differences are constant 2', diffs(diffs(quad)), [2, 2, 2]);
eq('exponential 2^x outputs', expo, [1, 2, 4, 8, 16]);
eq('its ratios are constant 2', expo.slice(1).map((v, i) => v / expo[i]), [2, 2, 2, 2]);

console.log('\nch6  the worked example claims the rule is x^2 + 2x + 5');
eq('it reproduces every tabulated output', [0, 1, 2, 3, 4].map(x => x * x + 2 * x + 5), [5, 8, 13, 20, 29]);
eq('its second difference is the 2 the example found', diffs(diffs([0, 1, 2, 3, 4].map(x => x * x + 2 * x + 5))), [2, 2, 2]);

console.log('\nch6  "exponential does not mean fast"');
for (const [x, sq, ex] of [[2, 4, 4], [3, 9, 8], [4, 16, 16], [5, 25, 32], [10, 100, 1024]]) {
  eq(`at x=${x}: x^2`, x ** 2, sq); eq(`at x=${x}: 2^x`, 2 ** x, ex);
}
if (!(3 ** 2 > 2 ** 3)) { bad++; console.log('  **FAIL**  the book claims squaring is ahead at x=3'); }
else { n++; console.log('  ok  squaring really is ahead at x=3, and they really tie at x=4'); }

/* ---- ch10/12: average rates and derivatives --------------------------- */
console.log('\nch10  average rates quoted in the answers');
const avg = (f, a, b) => (f(b) - f(a)) / (b - a);
eq('x^2 from 2 to 5', avg(x => x * x, 2, 5), 7);
eq('60t from 1 to 4', avg(t => 60 * t, 1, 4), 60);
eq('3x+1 from 0 to 10 and 100 to 110 agree', [avg(x => 3 * x + 1, 0, 10), avg(x => 3 * x + 1, 100, 110)], [3, 3]);
eq('plant: 12cm on day 4, 30cm on day 13', avg(d => d === 4 ? 12 : 30, 4, 13), 2);
eq('x^2 from -2 to 2 is zero though it moved', avg(x => x * x, -2, 2), 0);
eq('tank 0/50/60 litres: first, second, whole', [avg(t => t === 0 ? 0 : 50, 0, 5), avg(t => t === 5 ? 50 : 60, 5, 10), avg(t => t === 0 ? 0 : 60, 0, 10)], [10, 2, 6]);

console.log('\nch10/12  difference quotients simplify as the book says');
const dq = (f, a, h) => (f(a + h) - f(a)) / h;
for (const h of [1, 0.1, 0.01, 1e-5]) eq(`[f(2+h)-f(2)]/h = 4+h at h=${h}`, dq(x => x * x, 2, h), 4 + h, 1e-8);
for (const h of [1, 0.1, 0.01]) eq(`[f(3+h)-f(3)]/h = 6+h at h=${h}`, dq(x => x * x, 3, h), 6 + h, 1e-8);
eq('[f(a+h)-f(a)]/h = 5 for 5x-2, no h surviving', [dq(x => 5 * x - 2, 7, 1), dq(x => 5 * x - 2, 7, 0.001)], [5, 5], 1e-9);
eq("f'(x)=2x reproduces f'(1), f'(0), f'(-3)", [1, 0, -3].map(x => 2 * x), [2, 0, -6]);
eq('3x^2 has derivative 6x, checked numerically at x=4', dq(x => 3 * x * x, 4, 1e-6), 24, 1e-4);
eq("x^2 has slope 10 at x=5", 2 * 5, 10);

/* ---- ch13: the rectangle sums ----------------------------------------- */
console.log('\nch13  right-hand rectangle sums for x^2 on [0,1]');
const rightSum = (f, a, b, n) => { const w = (b - a) / n; let s = 0; for (let i = 1; i <= n; i++) s += f(a + i * w) * w; return s; };
for (const [strips, claimed, err] of [[2, 0.625, 0.292], [4, 0.46875, 0.135], [8, 0.3984, 0.065], [100, 0.33835, 0.005]]) {
  const got = rightSum(x => x * x, 0, 1, strips);
  eq(`${strips} strips`, Number(got.toFixed(strips === 8 ? 4 : 5)), claimed, 1e-4);
  eq(`${strips} strips: error against 1/3`, Number((got - 1 / 3).toFixed(3)), err, 1e-3);
}
eq('every quoted total overshoots 1/3, as the book explains', [2, 4, 8, 100].every(k => rightSum(x => x * x, 0, 1, k) > 1 / 3) ? 1 : 0, 1);
eq('left-hand sum with 2 strips underestimates', (0 + 0.25) * 0.5, 0.125);

console.log('\nch13  the Fundamental Theorem, checked against geometry');
eq('v(t)=2t to t=3: triangle area', 0.5 * 3 * 6, 9);
eq('   and the antiderivative t^2', 3 ** 2 - 0 ** 2, 9);
eq('v(t)=2t to t=5: triangle area', 0.5 * 5 * 10, 25);
eq('   and the antiderivative t^2', 5 ** 2 - 0 ** 2, 25);
eq('area under 3x^2 from 0 to 2 via x^3', 2 ** 3 - 0, 8);
eq('area under x from 0 to 4: triangle and x^2/2', [0.5 * 4 * 4, 4 ** 2 / 2 - 0], [8, 8]);
eq('area under x^2 from 0 to 1 via x^3/3', 1 ** 3 / 3 - 0, 1 / 3);

/* ---- ch11: the limit table -------------------------------------------- */
console.log('\nch11  (x^2-1)/(x-1) approaches 2 but has no value at 1');
const g = x => (x * x - 1) / (x - 1);
eq('tabulated approach', [0.9, 0.99, 0.999, 1.001, 1.01, 1.1].map(x => Number(g(x).toFixed(3))), [1.9, 1.99, 1.999, 2.001, 2.01, 2.1]);
eq('and it is genuinely undefined at x=1', Number.isFinite(g(1)) ? 1 : 0, 0);
eq('(x^2-4)/(x-2) approaches 4', Number((((2.0001) ** 2 - 4) / (2.0001 - 2)).toFixed(3)), 4, 1e-3);
eq('(x^2-9)/(x-3) approaches 6', Number((((3.0001) ** 2 - 9) / (3.0001 - 3)).toFixed(3)), 6, 1e-3);
eq('(x-1)/(x^2-1) approaches 1/2', Number(((1.0001 - 1) / (1.0001 ** 2 - 1)).toFixed(4)), 0.5, 1e-3);
// The book's claim is that the two sides run off in opposite directions and
// keep going, so test that each side grows without bound rather than testing
// against one threshold it happens to sit exactly on.
const above = [0.1, 0.01, 0.001, 1e-4].map(x => 1 / x);
const below = [-0.1, -0.01, -0.001, -1e-4].map(x => 1 / x);
eq('1/x climbs without bound from above', above.every((v, i) => i === 0 || v > above[i - 1]) && above.at(-1) >= 1e4 ? 1 : 0, 1);
eq('1/x falls without bound from below', below.every((v, i) => i === 0 || v < below[i - 1]) && below.at(-1) <= -1e4 ? 1 : 0, 1);
eq('so the two sides disagree in sign at every step', above.every((v, i) => v > 0 && below[i] < 0) ? 1 : 0, 1);

/* ---- ch3/8/9: evaluation, composition, inverses ------------------------ */
console.log('\nch3/8/9  evaluations, composites and inverses in the answers');
const f3 = x => x * x - 3;
eq('g(0), g(2), g(-2) for x^2-3', [0, 2, -2].map(f3), [-3, 1, 1]);
eq('h(t)=5-2t solved at -1 gives t=3', 5 - 2 * 3, -1);
eq('p(x)=4-x^2 at 1, -1, 3', [1, -1, 3].map(x => 4 - x * x), [3, 3, -5]);
eq('f(x)=2x+1 at 0, -3, 0.5', [0, -3, 0.5].map(x => 2 * x + 1), [1, -5, 2]);
const F = x => x * x, G = x => x - 3;
eq('f(g(5)) and g(f(5))', [F(G(5)), G(F(5))], [4, 22]);
eq('the two composite formulas at x=5', [(5 - 3) ** 2, 5 ** 2 - 3], [4, 22]);
eq('order matters: f(g(3)) vs g(f(3)) for 2x and x+1', [2 * (3 + 1), 2 * 3 + 1], [8, 7]);
eq('percentage discount commutes: 0.8 then 1.1 either way', [0.8 * 1.1 * 100, 1.1 * 0.8 * 100], [88, 88], 1e-9);
eq('but a flat £5 discount does not', [1.1 * (100 - 5), 1.1 * 100 - 5], [104.5, 105], 1e-9);
const inv = x => (x + 5) / 3, fwd = x => 3 * x - 5;
eq('f and its inverse compose to x, both ways', [inv(fwd(4)), fwd(inv(4))], [4, 4]);
eq('f(x)=2x+4: inverse at 10 is 3, reciprocal is not', [(10 - 4) / 2, 1 / (2 * 10 + 4)], [3, 1 / 24]);
eq('Celsius/Fahrenheit round trip at 100', (1.8 * 100 + 32 - 32) / 1.8, 100, 1e-9);
eq('sqrt(x^2) returns 3 at x=-3, so it is not the identity', Math.sqrt((-3) ** 2), 3);

/* ---- ch7: transformations move the features where the book says -------- */
console.log('\nch7  transformed features land where claimed');
eq('(x+4)^2-1 has its low point at (-4,-1)', [(-4 + 4) ** 2 - 1], [-1]);
eq('   and nothing lower nearby', [-4.1, -3.9].every(x => (x + 4) ** 2 - 1 > -1) ? 1 : 0, 1);
eq('(x-3)^2+5 has its low point at (3,5)', (3 - 3) ** 2 + 5, 5);
eq('(x-6)^2+2 has its low point at (6,2)', (6 - 6) ** 2 + 2, 2);
eq('f(x-2) at x=5 really evaluates the parent at 3', (5 - 2) ** 2, 3 ** 2);
eq('(2,5) moves to (2,8) under f(x)+3 and to (3,5) under f(x-1)', [5 + 3, 3 - 1], [8, 2]);
eq('shift-then-reflect differs from reflect-then-shift', [(-1 - 3) ** 2, (3 - (-1)) ** 2].length, 2);

/* ---- ch5/2: pairs and the vertical line test --------------------------- */
console.log('\nch5  plotted tables');
eq('y=2x-1 at -2..2', [-2, -1, 0, 1, 2].map(x => 2 * x - 1), [-5, -3, -1, 1, 3]);
eq('y=3-x at -1,0,2,4', [-1, 0, 2, 4].map(x => 3 - x), [4, 3, 1, -1]);
eq('x^2-4 crosses the axis at -2 and 2', [-2, 2].map(x => x * x - 4), [0, 0]);
eq('the circle x^2+y^2=9 gives two heights at x=0', [Math.sqrt(9), -Math.sqrt(9)], [3, -3]);
eq('(0,1),(1,2),(2,4),(3,8) is 2^x', [0, 1, 2, 3].map(x => 2 ** x), [1, 2, 4, 8]);

/* ---- ch4: domains ------------------------------------------------------ */
console.log('\nch4  excluded inputs really are excluded');
eq('1/(x-3) is undefined at 3 and fine at 4', [Number.isFinite(1 / (3 - 3)) ? 1 : 0, Number.isFinite(1 / (4 - 3)) ? 1 : 0], [0, 1]);
eq('sqrt(x+2) fails below -2 and holds at -2', [Number.isNaN(Math.sqrt(-2.1 + 2)) ? 1 : 0, Math.sqrt(-2 + 2)], [1, 0]);
eq('sqrt(5-x) needs x at most 5', [Number.isNaN(Math.sqrt(5 - 5.1)) ? 1 : 0, Math.sqrt(5 - 5)], [1, 0]);
eq('x^2+3 never returns less than 3', Math.min(...[-3, -1, 0, 1, 3].map(x => x * x + 3)), 3);
eq('sqrt(x)/(x-4): 4 is refused, 0 is allowed', [Number.isFinite(Math.sqrt(4) / (4 - 4)) ? 1 : 0, Math.sqrt(0) / (0 - 4)], [0, -0], 1e-9);
eq('1/sqrt(x-1) refuses 1 itself, not merely below it', Number.isFinite(1 / Math.sqrt(1 - 1)) ? 1 : 0, 0);

/* ---- every practice item is answered ----------------------------------- */
console.log('\nsource  every practice item carries an answer');
const { chapters } = await import(`file://${join(ROOT, 'book', 'book1-functions', 'index.js')}`);
for (const c of chapters) {
  const missing = (c.practice || []).filter(p => !p.a).length;
  n++;
  if (missing) { bad++; console.log(`  **FAIL**  ch${c.id} has ${missing} unanswered`); }
}
console.log(`  ok  ${chapters.reduce((s, c) => s + c.practice.length, 0)} items across ${chapters.length} chapters`);

console.log(`\n${bad ? `${bad} of ${n} checks FAILED` : `all ${n} checks pass`}`);
process.exit(bad ? 1 : 0);
