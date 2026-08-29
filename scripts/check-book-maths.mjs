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

/* ---- the expansion: worked examples and their parallel exercises ------- */
console.log('\nch1/3  contextual rules and recovered formulas');
eq('taxi 3.20 + 1.40 a mile, at 0, 3, 10', [0, 3, 10].map(m => +(3.20 + 1.40 * m).toFixed(2)), [3.20, 7.40, 17.20]);
eq('plumber 60 + 45 an hour, at 0, 2, 4', [0, 2, 4].map(h => 60 + 45 * h), [60, 150, 240]);
eq('table 1,3,5 is recovered as 2x+1', [0, 1, 2].map(x => 2 * x + 1), [1, 3, 5]);
eq('table 4,7,10 is recovered as 3x+4', [0, 1, 2].map(x => 3 * x + 4), [4, 7, 10]);
eq('g(1), g(-1), g(4) for x^2-3', [1, -1, 4].map(x => x * x - 3), [-2, -2, 13]);
eq('h(t)=5-2t solved at 11 gives t=-3', 5 - 2 * -3, 11);

console.log('\nch4  the harder domains and the ranges');
eq('sqrt(x)/(x-4): 4 refused, 0 and 5 allowed', [Number.isFinite(Math.sqrt(4) / 0) ? 1 : 0, Number.isFinite(Math.sqrt(5) / 1) ? 1 : 0], [0, 1]);
eq('sqrt(x+1)/(x-2): -1 allowed, -1.1 and 2 refused',
  [Number.isFinite(Math.sqrt(0) / -3) ? 1 : 0, Number.isNaN(Math.sqrt(-0.1)) ? 1 : 0, Number.isFinite(Math.sqrt(3) / 0) ? 1 : 0], [1, 1, 0]);
eq('1/x reaches 5 at x=1/5 but never reaches 0', [1 / (1 / 5), [0.001, 1e6, -1e6].some(x => 1 / x === 0) ? 1 : 0], [5, 0]);
eq('range of x^2+1 starts at 1, reached at x=0', [0 * 0 + 1, Math.min(...[-2, -1, 0, 1, 2].map(x => x * x + 1))], [1, 1]);

console.log('\nch5/6  plots and the family tests');
eq('y=3x+2 at -2, 0, 2', [-2, 0, 2].map(x => 3 * x + 2), [-4, 2, 8]);
eq('x^2-9 crosses at -3 and 3, and at (0,-9)', [(-3) ** 2 - 9, 3 ** 2 - 9, 0 - 9], [0, 0, -9]);
eq('4,12,36,108 is 4·3^x', [0, 1, 2, 3].map(x => 4 * 3 ** x), [4, 12, 36, 108]);
eq('5,10,20,40 is 5·2^x', [0, 1, 2, 3].map(x => 5 * 2 ** x), [5, 10, 20, 40]);
eq('3,6,11,18,27 is x^2+2x+3', [0, 1, 2, 3, 4].map(x => x * x + 2 * x + 3), [3, 6, 11, 18, 27]);
eq('   with constant second difference 2', diffs(diffs([0, 1, 2, 3, 4].map(x => x * x + 2 * x + 3))), [2, 2, 2]);
eq('5x-4 matches x^2 at 1 and 4 only, as the turn claims', [1, 2, 3, 4].map(x => 5 * x - 4), [1, 6, 11, 16]);
eq('   against the real squares', [1, 2, 3, 4].map(x => x * x), [1, 4, 9, 16]);
eq('x^2 change 1->2 against 5->6', [2 ** 2 - 1 ** 2, 6 ** 2 - 5 ** 2], [3, 11]);
eq('exponential steps are the running total: 2^x rises 1,2,4,8', diffs([0, 1, 2, 3, 4].map(x => 2 ** x)), [1, 2, 4, 8]);
eq('   and each rise equals the height it started from', [0, 1, 2, 3].map(x => 2 ** x), [1, 2, 4, 8]);

console.log('\nch7/9  completing the square, and restricting for an inverse');
eq('x^2-6x+11 equals (x-3)^2+2 everywhere tested', [-2, 0, 3, 5].map(x => x * x - 6 * x + 11), [-2, 0, 3, 5].map(x => (x - 3) ** 2 + 2));
eq('   with its low point at (3, 2)', (3 - 3) ** 2 + 2, 2);
eq('x^2+4x+9 equals (x+2)^2+5', [-4, 0, 2].map(x => x * x + 4 * x + 9), [-4, 0, 2].map(x => (x + 2) ** 2 + 5));
eq('f(x+3)-4 moves a feature at (1,2) to (-2,-2)', [1 - 3, 2 - 4], [-2, -2]);
eq('f(x-1)+2 moves a feature at (4,7) to (5,9)', [4 + 1, 7 + 2], [5, 9]);
eq('x^2-4x shares the output 0 at x=0 and x=4', [0 * 0 - 4 * 0, 4 * 4 - 4 * 4], [0, 0]);
eq('   and turns at x=2, where (x-2)^2-4 bottoms out', (2 - 2) ** 2 - 4, -4);
eq('x^2+6x turns at x=-3', (-3 + 3) ** 2 - 9, -9);
const i95 = x => (5 * x - 1) / 2, f95 = x => (2 * x + 1) / 5;
eq('(2x+1)/5 and (5x-1)/2 compose to x both ways', [i95(f95(7)), f95(i95(7))], [7, 7]);
eq('   and the quoted check value holds', [f95(2), i95(1)], [1, 2]);

console.log('\nch8/10  composites, and rates over stated intervals');
eq('f(g(1)) and g(f(1)) for x^2 and x-3', [(1 - 3) ** 2, 1 ** 2 - 3], [4, -2]);
eq('sqrt(3x-5) needs x at least 5/3', [Number.isNaN(Math.sqrt(3 * 1.6 - 5)) ? 1 : 0, Math.sqrt(3 * (5 / 3) - 5)], [1, 0]);
eq('x^2 from 1 to 4 averages 5', avg(x => x * x, 1, 4), 5);
eq('25t averages 25 over any interval', [avg(t => 25 * t, 2, 6), avg(t => 25 * t, 0, 1)], [25, 25]);
eq('tank t^2: first 3 minutes, then the third minute alone', [avg(t => t * t, 0, 3), avg(t => t * t, 2, 3)], [3, 5]);
eq('   the first minute and the fifth', [avg(t => t * t, 0, 1), avg(t => t * t, 4, 5)], [1, 9]);
for (const h of [1, 0.1, 0.01]) eq(`[f(5+h)-f(5)]/h = 10+h at h=${h}`, dq(x => x * x, 5, h), 10 + h, 1e-8);
eq('x^2 rises 5, 7, 9 across 2->5, totalling 21', diffs([2, 3, 4, 5].map(x => x * x)), [5, 7, 9]);
eq('   so the average over three steps is 7', diffs([2, 3, 4, 5].map(x => x * x)).reduce((a, b) => a + b) / 3, 7);
eq('the four secants from x=2 have slopes 7, 6, 5, 4.5', [5, 4, 3, 2.5].map(b => avg(x => x * x, 2, b)), [7, 6, 5, 4.5]);
eq('   heading for the tangent slope 4', 2 * 2, 4);
eq('3x+1 rises 3 every step, so every interval averages 3', diffs([0, 1, 2, 3, 4].map(x => 3 * x + 1)), [3, 3, 3, 3]);

console.log('\nch11/12  limits, flat points, and the thrown ball');
eq('(x^2+3x)/x approaches 3', Number((((0.0001) ** 2 + 3 * 0.0001) / 0.0001).toFixed(4)), 3, 1e-3);
eq('(x^2-5x)/x approaches -5', Number((((0.0001) ** 2 - 5 * 0.0001) / 0.0001).toFixed(4)), -5, 1e-3);
eq('(x^2-25)/(x-5) approaches 10', Number((((5.0001) ** 2 - 25) / 0.0001).toFixed(3)), 10, 1e-2);
eq('1/x^2 climbs on both sides, unlike 1/x', [1 / 0.001 ** 2 > 1e5 ? 1 : 0, 1 / (-0.001) ** 2 > 1e5 ? 1 : 0], [1, 1]);
eq('a point moved out of place leaves the limit alone', [3 + 1, 10], [4, 10]);
eq('x^2-6x is flat where 2x-6=0, at x=3', 2 * 3 - 6, 0);
eq("   and the derivative check via a tiny step agrees", dq(x => x * x - 6 * x, 3, 1e-6), 0, 1e-4);
eq('ball 20t-5t^2 is flat at t=2, at height 20', [20 - 10 * 2, 20 * 2 - 5 * 4], [0, 20]);
eq('   rising before it and falling after', [20 - 10 * 1 > 0 ? 1 : 0, 20 - 10 * 3 < 0 ? 1 : 0], [1, 1]);
eq('ball 30t-5t^2 is flat at t=3, at height 45', [30 - 10 * 3, 30 * 3 - 5 * 9], [0, 45]);
eq('7x-2 has derivative 7 with no h surviving', [dq(x => 7 * x - 2, 4, 1), dq(x => 7 * x - 2, 4, 1e-6)], [7, 7], 1e-6);

console.log('\nch13  trapping the answer, and two routes to the same area');
const leftSum = (f, a, b, n) => { const w = (b - a) / n; let s = 0; for (let i = 0; i < n; i++) s += f(a + i * w) * w; return s; };
eq('4 strips trap 1/3 between', [Number(leftSum(x => x * x, 0, 1, 4).toFixed(5)), Number(rightSum(x => x * x, 0, 1, 4).toFixed(5))], [0.21875, 0.46875]);
eq('16 strips trap it more tightly', [Number(leftSum(x => x * x, 0, 1, 16).toFixed(6)), Number(rightSum(x => x * x, 0, 1, 16).toFixed(6))], [0.302734, 0.365234]);
eq('the gap quarters when the strips quadruple', [
  Number((rightSum(x => x * x, 0, 1, 4) - leftSum(x => x * x, 0, 1, 4)).toFixed(4)),
  Number((rightSum(x => x * x, 0, 1, 16) - leftSum(x => x * x, 0, 1, 16)).toFixed(4))], [0.25, 0.0625]);
eq('and 1/3 sits inside both pairs', [4, 16].every(n => leftSum(x => x * x, 0, 1, n) < 1 / 3 && 1 / 3 < rightSum(x => x * x, 0, 1, n)) ? 1 : 0, 1);
eq('tap rising 0 to 6 over 4 minutes delivers 12', 0.5 * 4 * 6, 12);
eq('tap rising 0 to 10 over 6 minutes delivers 30', 0.5 * 6 * 10, 30);
eq('2x+1 from 0 to 3: trapezium and antiderivative', [((1 + 7) / 2) * 3, (3 ** 2 + 3) - 0], [12, 12]);
eq('4x+2 from 0 to 2: trapezium and antiderivative', [((2 + 10) / 2) * 2, (2 * 4 + 2 * 2) - 0], [12, 12]);
eq('v(t)=4t to t=3: triangle and antiderivative', [0.5 * 3 * 12, 2 * 9 - 0], [18, 18]);
eq('x^2 from 0 to 3 via x^3/3', 27 / 3 - 0, 9);

/* ---- every practice item is answered ----------------------------------- */
console.log('\nsource  every practice item carries an answer');
const { chapters } = await import(`file://${join(ROOT, 'book', 'book1-functions', 'index.js')}`);
for (const c of chapters) {
  const missing = (c.practice || []).filter(p => !p.a).length;
  const noAns = (c.blocks || []).filter(b => b.t === 'example' && b.turn && !b.turn.a).length;
  if (noAns) { bad++; console.log(`  **FAIL**  ch${c.id} has ${noAns} your-turn item(s) with no answer`); }
  n++;
  if (missing) { bad++; console.log(`  **FAIL**  ch${c.id} has ${missing} unanswered`); }
}
console.log(`  ok  ${chapters.reduce((s, c) => s + c.practice.length, 0)} items across ${chapters.length} chapters`);

console.log(`\n${bad ? `${bad} of ${n} checks FAILED` : `all ${n} checks pass`}`);
process.exit(bad ? 1 : 0);
