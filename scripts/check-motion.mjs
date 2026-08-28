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
import { createHash } from 'node:crypto';
import { SHARED_FOUNDATIONS } from '../src/lib/content/shared-foundations.js';
import { JOIN_GRAIN_MISSION } from '../src/lib/game/join-grain-mission.js';
import { DISTRIBUTION_DESK_MISSION, summarise } from '../src/lib/game/distribution-desk-mission.js';
import { runQuery } from '../src/lib/game/sql-console-mission.js';

const dir = u => new URL(u, import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1');
// Git records source as LF, but a Windows checkout may present the same file
// with CRLF. Approval digests protect content, not the host's newline format.
const readText = path => readFileSync(path, 'utf8').replace(/\r\n/g, '\n');

let failed = false;
const check = (condition, label, detail = '') => {
  console.log(`   ${condition ? 'PASS' : '**FAIL**'}  ${label}${detail ? '  ' + detail : ''}`);
  if (!condition) failed = true;
};

const component = readText(dir('../src/lib/components/JoinFanOut.svelte'));
const sampler = readText(dir('../src/lib/components/SamplingSpread.svelte'));
const collapse = readText(dir('../src/lib/components/GrainCollapse.svelte'));
const alarm = readText(dir('../src/lib/components/BaseRateAlarm.svelte'));
const pull = readText(dir('../src/lib/components/OutlierPull.svelte'));
const ANIMATED = [
  { kind: 'join-fanout', file: 'JoinFanOut.svelte', source: component },
  { kind: 'sampling-spread', file: 'SamplingSpread.svelte', source: sampler },
  { kind: 'grain-collapse', file: 'GrainCollapse.svelte', source: collapse },
  { kind: 'base-rate', file: 'BaseRateAlarm.svelte', source: alarm }
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

/* ── grouping folds rows rather than removing them ───────────────────────────
   The figure's whole claim. If GROUP BY ever stopped accounting for every row,
   the picture would be showing a filter and calling it a grouping.           */
const collapseSessions = SHARED_FOUNDATIONS
  .flatMap(({ chapter, book }) => book.sessions.map(s => ({ chapter, s })))
  .filter(({ s }) => s.figure?.kind === 'grain-collapse');
check(collapseSessions.length > 0, 'the grouping figure is used by a session',
  collapseSessions.map(({ chapter, s }) => `ch${chapter}.${s.number}`).join(', '));

if (collapseSessions.length) {
  const flat = runQuery({ where: null, groupBy: null, having: null });
  const grouped = runQuery({ where: null, groupBy: 'branch_id', having: null });

  check(grouped.rows.length < flat.rows.length, 'grouping returns fewer rows',
    `${flat.rows.length} becomes ${grouped.rows.length}`);
  check(flat.grain !== grouped.grain, 'and one row stops meaning what it meant',
    `${flat.grain} to ${grouped.grain}`);

  const accounted = grouped.rows.reduce((n, g) => n + g.sales, 0);
  check(accounted === flat.rows.length,
    'every sale is still accounted for, which is the difference from a filter',
    `${accounted} sales across ${grouped.rows.length} branches`);

  const totalled = grouped.rows.reduce((n, g) => n + g.total, 0);
  const raw = flat.rows.reduce((n, r) => n + r.basket_total, 0);
  check(Math.abs(totalled - raw) < 0.005, 'and the money reconciles across the fold',
    `£${totalled.toFixed(2)}`);
}

/* ── the alarm grid must reproduce the chapter's own table ───────────────────
   The figure derives its counts from the rates. The example table beside it was
   written by hand. If those two ever disagree, a learner sees a grid saying one
   thing and a table saying another, on the same page, and neither is marked as
   the authority.                                                             */
const alarmSessions = SHARED_FOUNDATIONS
  .flatMap(({ chapter, book }) => book.sessions.map(s => ({ chapter, s })))
  .filter(({ s }) => s.figure?.kind === 'base-rate');
check(alarmSessions.length > 0, 'the base-rate figure is used by a session',
  alarmSessions.map(({ chapter, s }) => `ch${chapter}.${s.number}`).join(', '));

for (const { chapter, s } of alarmSessions) {
  const { days, failureIn, catchRate, falseRate } = s.figure;
  const failing = Math.round(days / failureIn);
  const fine = days - failing;
  const trueAlarms = Math.round(failing * catchRate);
  const falseAlarms = Math.round(fine * falseRate);
  const alarms = trueAlarms + falseAlarms;

  // The table prints [label, failing, fine, total] per row.
  const table = new Map(s.example.rows.map(r => [r[0], r]));
  const sounds = table.get('Alarm sounds');
  const silent = table.get('Alarm silent');
  const totals = table.get('Total');
  check(Boolean(sounds && silent && totals),
    `ch${chapter}.${s.number} has the two-by-two the figure must match`);
  if (!sounds) continue;

  const num = v => Number(String(v).replace(/,/g, ''));
  check(num(sounds[1]) === trueAlarms && num(sounds[2]) === falseAlarms && num(sounds[3]) === alarms,
    'the alarms the figure draws are the alarms the table prints',
    `figure ${trueAlarms}/${falseAlarms}/${alarms}, table ${sounds[1]}/${sounds[2]}/${sounds[3]}`);
  check(num(silent[1]) === failing - trueAlarms && num(silent[2]) === fine - falseAlarms,
    'and so are the quiet days',
    `figure ${failing - trueAlarms}/${fine - falseAlarms}, table ${silent[1]}/${silent[2]}`);
  check(num(totals[1]) === failing && num(totals[2]) === fine && num(totals[3]) === days,
    'and the population adds up', `${failing} + ${fine} = ${days}`);

  check(falseAlarms > trueAlarms,
    'false alarms still outnumber real ones, which is the entire lesson',
    `${falseAlarms} false against ${trueAlarms} real`);
  const precision = trueAlarms / alarms;
  check(precision < 0.2 && catchRate > 0.9,
    'the alarm is still accurate and still usually wrong',
    `${Math.round(catchRate * 100)}% accurate, ${Math.round(precision * 100)}% precise`);
}

/* ── one marker must move and the other must not ─────────────────────────────
   The entire subject. If the mean ever stopped shifting, or the median started,
   the figure would animate smoothly and demonstrate nothing.                 */
const pullSessions = SHARED_FOUNDATIONS
  .flatMap(({ chapter, book }) => book.sessions.map(s => ({ chapter, s })))
  .filter(({ s }) => s.figure?.kind === 'outlier-pull');
check(pullSessions.length > 0, 'the outlier figure is used by a session',
  pullSessions.map(({ chapter, s }) => `ch${chapter}.${s.number}`).join(', '));

for (const { chapter, s } of pullSessions) {
  const all = DISTRIBUTION_DESK_MISSION.cases
    .find(c => c.id === (s.figure.case ?? 'baskets'))?.values;
  check(Array.isArray(all) && all.length > 10,
    `ch${chapter}.${s.number} has values to add an outlier to`, `${all?.length} values`);
  if (!all) continue;

  const outlier = all[all.length - 1];
  const before = summarise(all.slice(0, -1));
  const after = summarise(all);

  check(outlier > before.mean * 2,
    'the added value is genuinely extreme, or nothing would move',
    `£${outlier} against a mean of £${before.mean.toFixed(2)}`);
  check(after.mean - before.mean > 1,
    'the mean is dragged by it',
    `£${before.mean.toFixed(2)} to £${after.mean.toFixed(2)}`);
  check(after.median === before.median,
    'and the median does not move at all, which is the whole point',
    `£${before.median} both before and after`);
}

// Deliberately a still. It was built as an animation and reads better with both
// mean positions on the page at once, because an animation asks the reader to
// hold the first one in memory while the second appears. Asserted so it cannot
// drift back into motion without somebody deciding to.
check(!/transition\s*:/.test(pull) && !/setTimeout|setInterval/.test(pull),
  'the outlier figure carries no motion, which is a decision rather than an omission',
  'both mean positions are drawn at once and the gap between them is the figure');
check(!/on:click/.test(pull),
  'and offers no replay, because there is nothing to replay');

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

/* ── approved figures may not change silently ────────────────────────────────
   The review protocol's last line: AI must not silently alter already approved
   learner-facing text, and any proposed change returns that item to
   AMENDMENTS_REQUIRED until the founder reviews it again. A digest is the only
   way that rule can be enforced rather than remembered.                       */
const approvals = JSON.parse(readText(dir('../curriculum/APPROVED-FIGURES.json')));
for (const figure of approvals.figures) {
  const path = dir('../' + figure.component);
  const actual = createHash('sha256').update(readText(path), 'utf8').digest('hex');
  check(actual === figure.sha256,
    `${figure.id} is unchanged since the founder approved it on ${figure.approvedOn}`,
    actual === figure.sha256
      ? `${figure.session} · ${actual.slice(0, 16)}`
      : `digest moved to ${actual.slice(0, 16)}. Mark it AMENDMENTS_REQUIRED and have it reviewed again, `
        + 'or update the record deliberately if the founder approved the change.');
}

/* ── the rule it cites exists in this repository ─────────────────────────── */
const rule = readText(dir('../docs/MEDIA-RULE.md'));
check(/Raster images and GIFs/.test(rule) && /deterministic/.test(rule),
  'docs/MEDIA-RULE.md states the rule the code cites',
  `${rule.split('\n').length} lines`);

console.log(failed
  ? '\n  an animated figure is not honest or not optional\n'
  : '\n  the animation is computed, describable and skippable\n');
process.exit(failed ? 1 : 0);
