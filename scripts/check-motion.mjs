// An animated figure has to be honest and it has to be optional.
//
// docs/MEDIA-RULE.md allows motion for a technical visual only as deterministic
// SVG, computed from the same source the mission uses, and requires four things
// of every animated figure: numbers a guard can check, a complete final state
// with motion disabled, a replay control, and a description in words.
//
// That last group is the part nobody notices is missing. A figure that animates
// beautifully and shows nothing to a reader with reduced motion turned on is
// broken for exactly the people who most need it to be static.
//
//   node scripts/check-motion.mjs

import { readFileSync } from 'node:fs';
import { SHARED_FOUNDATIONS } from '../src/lib/content/shared-foundations.js';
import { JOIN_GRAIN_MISSION } from '../src/lib/game/join-grain-mission.js';
import { DISTRIBUTION_DESK_MISSION } from '../src/lib/game/distribution-desk-mission.js';

const dir = u => new URL(u, import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1');

let failed = false;
const check = (condition, label, detail = '') => {
  console.log(`   ${condition ? 'PASS' : '**FAIL**'}  ${label}${detail ? '  ' + detail : ''}`);
  if (!condition) failed = true;
};

const component = readFileSync(dir('../src/lib/components/JoinFanOut.svelte'), 'utf8');
const sampler = readFileSync(dir('../src/lib/components/SamplingSpread.svelte'), 'utf8');
const ANIMATED = [
  { kind: 'join-fanout', file: 'JoinFanOut.svelte', source: component },
  { kind: 'sampling-spread', file: 'SamplingSpread.svelte', source: sampler }
];

/* ── every animated figure in the volume is one we know about ────────────── */
const animated = SHARED_FOUNDATIONS
  .flatMap(({ chapter, book }) => book.sessions.map(s => ({ chapter, s })))
  .filter(({ s }) => s.figure?.kind === 'join-fanout');

check(animated.length > 0, 'the volume has an animated figure',
  animated.map(({ chapter, s }) => `ch${chapter}.${s.number}`).join(', '));

/* ── its numbers are the mission's, not its own ──────────────────────────── */
for (const { chapter, s } of animated) {
  const source = JOIN_GRAIN_MISSION.cases.find(c => c.id === (s.figure.case ?? 'sale-line'));
  check(Boolean(source), `ch${chapter}.${s.number} names a case the mission has`,
    s.figure.case);
  if (!source) continue;

  const left = source.leftTable.rows.length;
  const out = source.rows.length;
  check(out > left, 'and that case actually fans out, or the figure teaches nothing',
    `${left} rows become ${out}`);

  const keyAt = source.leftTable.columns.indexOf(source.key);
  check(keyAt >= 0, 'the join key is a column of the left table', source.key);

  const copies = source.leftTable.rows.map(row =>
    source.rows.filter(r => r[0] === row[keyAt]).length);
  check(copies.some(n => n > 1),
    'at least one row is copied, which is the thing the motion shows',
    `copies: ${copies.join(', ')}`);
  check(copies.reduce((n, c) => n + c, 0) === out,
    'every joined row traces back to exactly one source row');

  check(source.leftRows < source.resultRows,
    'the full-size figures still show the fan-out',
    `${source.leftRows.toLocaleString()} becomes ${source.resultRows.toLocaleString()}`);
}

/* ── the sampling figure draws what it claims ────────────────────────────────
   Recomputed here with the same seed and the same arithmetic the component
   uses. If the spread ever stopped narrowing with n, the figure would render
   beautifully and teach the opposite of the session it sits in.              */
const spreadSessions = SHARED_FOUNDATIONS
  .flatMap(({ chapter, book }) => book.sessions.map(s => ({ chapter, s })))
  .filter(({ s }) => s.figure?.kind === 'sampling-spread');
check(spreadSessions.length > 0, 'the sampling figure is used by a session',
  spreadSessions.map(({ chapter, s }) => `ch${chapter}.${s.number}`).join(', '));

const seeded = seed => () => {
  seed |= 0; seed = (seed + 0x6d2b79f5) | 0;
  let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};

for (const { chapter, s } of spreadSessions) {
  const population = DISTRIBUTION_DESK_MISSION.cases
    .find(c => c.id === (s.figure.case ?? 'baskets'))?.values;
  check(Array.isArray(population) && population.length > 20,
    `ch${chapter}.${s.number} samples a population big enough to sample from`,
    `${population?.length} values`);
  if (!population) continue;

  const spreads = [4, 10, 25].map((n, r) => {
    const rnd = seeded(0x9e3779b9 + r * 7919);
    const means = [];
    for (let d = 0; d < 24; d++) {
      let total = 0;
      for (let i = 0; i < n; i++) total += population[Math.floor(rnd() * population.length)];
      means.push(total / n);
    }
    return { n, spread: Math.max(...means) - Math.min(...means) };
  });

  const narrowing = spreads.every((row, i) => i === 0 || row.spread < spreads[i - 1].spread);
  check(narrowing, 'and the spread narrows every time the sample grows',
    spreads.map(r => `n=${r.n}: £${r.spread.toFixed(2)}`).join('  '));

  const ratio = spreads[0].spread / spreads.at(-1).spread;
  check(ratio > 1.5 && ratio < 4,
    'by an amount the square-root law would predict, rather than by luck',
    `${ratio.toFixed(1)}x narrower on ${(25 / 4).toFixed(1)}x the data`);
}

/* ── the contract, for every animated figure ─────────────────────────────── */
for (const { file, source } of ANIMATED) {
  check(/prefers-reduced-motion/.test(source), `${file} honours prefers-reduced-motion`);
  check(/matchMedia/.test(source) && /still\s*=/.test(source),
    `${file} jumps to the finished state rather than simply not animating`,
    'a figure that only removes the transition shows step one forever');
  check(/transition:\s*none\s*!important/.test(source),
    `${file} disables transitions rather than shortening them`);
  check(/on:click=\{play\}/.test(source), `${file} can be replayed`);
  check(!/<img|url\(|\.gif|\.png|\.jpg/i.test(source),
    `${file} keeps raster out, per the media rule`);
  check(/<svg/.test(source), `${file} is SVG`);
}

/* ── the sampler is seeded, or it cannot be checked or quoted ────────────── */
check(/Math\.imul/.test(sampler) && !/Math\.random/.test(sampler),
  'the sampling figure draws from a seeded generator, not Math.random',
  'an unseeded figure renders a different picture every time and no guard can hold it');

/* ── it can be replayed and it can be read ───────────────────────────────── */
check(/aria-label=\{description\}/.test(component) || /aria-label=/.test(component),
  'the figure states what it shows in words');
// Match on the interpolated counts rather than on prose. The first version
// looked for the word "becomes" and the sentence says "become", which failed a
// description that was correct.
const described = /\$:\s*description\s*=([\s\S]*?);\n/.exec(component)?.[1] ?? '';
check(/left\.length/.test(described) && /results\.length/.test(described),
  'and that description carries both counts rather than naming the picture');
check(/on:click=\{play\}/.test(component), 'a learner can replay it');

/* ── it is drawn, not pasted ─────────────────────────────────────────────── */
check(!/<img|url\(|\.gif|\.png|\.jpg/i.test(component),
  'nothing raster reaches the figure, per the media rule');
check(/<svg/.test(component), 'it is SVG');

/* ── the rule it cites exists in this repository ─────────────────────────── */
const rule = readFileSync(dir('../docs/MEDIA-RULE.md'), 'utf8');
check(/Raster images and GIFs/.test(rule) && /deterministic/.test(rule),
  'docs/MEDIA-RULE.md states the rule the code cites',
  `${rule.split('\n').length} lines`);

console.log(failed
  ? '\n  an animated figure is not honest or not optional\n'
  : '\n  the animation is computed, describable and skippable\n');
process.exit(failed ? 1 : 0);
