// The Rate Desk states figures in its prose and draws them on a chart. This
// checks that the prose agrees with the arithmetic.
//
// It exists because that has already gone wrong once: four figures written into
// the Distribution Desk's explanations disagreed with the statistics the page
// computed right beside them, and every guard passed, because no guard was
// looking at the prose. A mission that teaches people to check numbers cannot
// print numbers nobody checked.
//
// Two passes. First, each case declares what its arithmetic should produce, and
// that is compared against the functions. Second, every number appearing in the
// explanations is looked for among the values those functions return, so a
// figure cannot be typed into a sentence without existing in the working.
//
//   npm run check:rates

import { RATE_DESK_MISSION as M, readingsFor, round, combined, unweighted, relative } from '../src/lib/game/rate-desk-mission.js';

let bad = 0;
const ok = (label, pass, detail = '') => {
  if (!pass) bad++;
  console.log(`   ${pass ? 'PASS' : '**FAIL**'}  ${label}${detail ? '  ' + detail : ''}`);
};

const near = (a, b) => a !== null && b !== null && Math.abs(a - b) < 0.051;

let checked = 0;

for (const c of M.cases) {
  const r = readingsFor(c);
  const e = c.expect;

  // Pass one: the declared arithmetic.
  if (c.kind === 'compare' && e.rates) {
    const got = r.rows.map(x => round(x.value, 2));
    const same = got.length === e.rates.length && got.every((v, i) => near(v, e.rates[i]));
    ok(`${c.id} rates are what dividing gives`, same, `${got.join(' / ')} vs declared ${e.rates.join(' / ')}`);
    checked += got.length;
  }
  if (e.combined !== undefined) {
    ok(`${c.id} combined rate`, near(round(combined(c.groups), 2), e.combined), `${round(combined(c.groups), 2)}%`);
    ok(`${c.id} unweighted mean differs from it`, !near(round(unweighted(c.groups), 2), e.combined),
      `mean of the rates is ${round(unweighted(c.groups), 2)}%`);
    checked += 2;
  }
  if (e.points !== undefined) {
    ok(`${c.id} percentage points`, near(r.points, e.points), `${r.points} points`);
    ok(`${c.id} relative change`, near(round(r.relative, 2), e.relative), `${round(r.relative, 2)}%`);
    checked += 2;
  }
  if (e.absolute !== undefined) {
    ok(`${c.id} absolute change`, near(r.absolute, e.absolute), `${r.absolute} ${c.unit}`);
    checked += 1;
  }
  if (e.relative !== undefined && e.points === undefined) {
    ok(`${c.id} relative change`, near(round(r.relative, 2), e.relative), `${round(r.relative, 2)}%`);
    checked += 1;
  }
  if (e.end !== undefined) {
    ok(`${c.id} sequence ends where stated`, near(round(r.end, 2), e.end), `${round(r.end, 2)}`);
    ok(`${c.id} net change`, near(round(r.net, 2), e.netPct), `${round(r.net, 2)}%`);
    checked += 2;
  }

  // Pass two: every number written into an explanation must exist in the working.
  const universe = new Set();
  const add = v => { if (v === null || v === undefined || Number.isNaN(v)) return;
    for (const dp of [0, 1, 2]) universe.add(round(v, dp)); };
  if (r.kind === 'compare') {
    add(c.per);  // "per 1,000" is the basis the rate is quoted on, so it is working too
    for (const row of r.rows) { add(row.value); add(row.numerator); add(row.denominator); }
    if (r.whole) { add(r.whole.value); add(r.whole.naive); }
    add(c.groups.reduce((t, g) => t + g.numerator, 0));
    add(c.groups.reduce((t, g) => t + g.denominator, 0));
    const [a, b] = r.rows.map(x => x.value);
    add(b / a); add(a / b);
    add(c.groups[1].denominator / c.groups[0].denominator);
    add(c.groups[0].denominator / c.groups[1].denominator);
  } else if (r.kind === 'sequence') {
    for (const s of r.steps) add(s.value);
    add(r.net); add(Math.abs(r.net));
    for (const pct of c.sequence) { add(pct); add(Math.abs(pct)); }
    for (let i = 1; i < r.steps.length; i++) add(Math.abs(r.steps[i].value - r.steps[i - 1].value));
  } else {
    add(r.from); add(r.to); add(r.absolute); add(r.relative); add(r.points);
    add(Math.abs(r.relative));
  }
  // Percentages of a base that the prose may legitimately quote.
  if (c.from !== undefined) add(relative(c.from, c.to));

  const prose = ['baseWhy', 'figureWhy', 'claimWhy'].map(k => c[k]).join(' ');
  // Numbers with thousands separators, decimals, or plain.
  const found = [...prose.matchAll(/(?<![\w/])(\d[\d,]*(?:\.\d+)?)/g)].map(m => Number(m[1].replace(/,/g, '')));
  const missing = found.filter(n => ![0, 1, 2].some(dp => universe.has(round(n, dp))));
  ok(`${c.id} every figure in its prose comes from the working`, !missing.length,
    missing.length ? `not computed anywhere: ${[...new Set(missing)].join(', ')}` : `${found.length} figures`);
  checked += found.length;
}

console.log(`\n${bad ? `${bad} problem(s)` : 'all checks pass'}, ${checked} figures checked across ${M.cases.length} cases`);
process.exit(bad ? 1 : 0);
