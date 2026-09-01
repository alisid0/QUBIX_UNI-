// What does the live floor cover of MASTERPLAN-01092026, and what does it not?
//
// The master plan is at Gate 0: "the founder approves or amends this master
// plan and its broad dependency order." That decision needs a number nobody has
// yet. The plan sets out twenty phases and a forty-item production sequence
// while the floor carries twenty-seven pairs written before the plan existed,
// and §1 says the existing material "may later be audited against this plan and
// classified as reusable, amendable, replaceable or outside scope". This is
// that audit.
//
// It reports; it never decides. Three rules keep it honest:
//
//   Nothing is ever printed as "covered". A keyword overlap between a lesson
//   title and a topic bullet is a CANDIDATE for the founder to confirm or
//   reject. Only the founder may approve, and a script that quietly promoted a
//   fuzzy match to coverage would be manufacturing approval.
//
//   Every match shows the word it matched on. Keyword overlap cannot tell
//   "Does one row MEAN one sale" from "MEAN, median and mode", and no threshold
//   ever will, so the term is printed beside the match and a nonsense one is
//   visible as nonsense in the time it takes to read it. That is worth more
//   than a cleverer score, because a score can only be trusted and this can be
//   checked.
//
//   A phase with nothing is stated as a gap, loudly.
//
//   node scripts/audit-masterplan-coverage.mjs [--verbose]

import { readFileSync } from 'node:fs';
import { SHARED_FOUNDATIONS } from '../src/lib/content/shared-foundations.js';
import { MISSIONS } from '../src/lib/game/progress.js';
import { ALL_STAGES, isAvailable } from '../src/lib/content/learning-flow.js';

const PLAN = new URL('../curriculum/MASTERPLAN-01092026.md', import.meta.url);
const verbose = process.argv.includes('--verbose');
const plan = readFileSync(PLAN, 'utf8');

/* ── the plan, parsed ─────────────────────────────────────────────────────── */

/** `### Phase N · Title`, its topic bullets, and its required evidence. */
function readPhases(src) {
  const out = [];
  const heads = [...src.matchAll(/^### Phase (\d+) · (.+)$/gm)];
  heads.forEach((h, i) => {
    const body = src.slice(h.index, heads[i + 1]?.index ?? src.length);
    const topics = [...body.matchAll(/^- (.+?)[;.]?$/gm)]
      .map(m => m[1].replace(/\s+/g, ' ').trim())
      .filter(Boolean);
    const evidence = body.match(/Required evidence: ([\s\S]+?)(?:\n\n|$)/)?.[1]
      .replace(/\s+/g, ' ').trim() || '';
    out.push({ n: Number(h[1]), title: h[2].trim(), topics, evidence });
  });
  return out;
}

/** §15's numbered production sequence: the order framing questions are asked.
    The list does not follow its heading directly, so take the whole section. */
function readSequence(src) {
  const start = src.indexOf('## 15. Proposed production sequence');
  if (start === -1) return [];
  const end = src.indexOf('\n## ', start + 1);
  const block = src.slice(start, end === -1 ? src.length : end);
  return [...block.matchAll(/^(\d+)\. (.+)$/gm)]
    .map(m => ({ n: Number(m[1]), title: m[2].trim() }));
}

const phases = readPhases(plan);
const sequence = readSequence(plan);

/* ── what exists today ────────────────────────────────────────────────────── */
// A pair is the unit the plan works in, so the floor is read as pairs. Sessions
// and missions not on the floor are listed separately: material that exists but
// which no pair currently reaches is a different finding from a plan gap.

const pairs = [];
for (const stage of ALL_STAGES) {
  for (const p of stage.pairs) {
    pairs.push({
      id: p.id, stage: stage.title, idea: p.idea,
      readLive: isAvailable(p.read), playLive: isAvailable(p.play),
      text: `${p.idea} ${p.read.label} ${p.play.label}`
    });
  }
}

const onFloorSessions = new Set();
const onFloorMissions = new Set();
for (const stage of ALL_STAGES) {
  for (const p of stage.pairs) {
    if (p.read.chapter) onFloorSessions.add(`${p.read.chapter}/${p.read.session}`);
    if (p.play.slug) onFloorMissions.add(p.play.slug);
  }
}

const allSessions = [];
for (const { chapter, book } of SHARED_FOUNDATIONS) {
  book.sessions.forEach((s, i) => allSessions.push({
    ref: `ch${chapter}.${String(i + 1).padStart(2, '0')}`,
    title: s.title, onFloor: onFloorSessions.has(`${chapter}/${i + 1}`)
  }));
}
const allMissions = MISSIONS.map(m => ({
  slug: m.slug, title: m.mission.title, onFloor: onFloorMissions.has(m.slug)
}));

/* ── matching, deliberately grudging ──────────────────────────────────────── */
// Scored on distinctive terms only. "data", "value" and "analysis" appear in
// most phases and most lesson titles, so they carry no signal and are dropped;
// a term is distinctive here if a quarter of the phases or fewer use it.

const STOP = new Set(`a an the and or of to in on for with without from into is are be being been
  what which that this these those it its as at by not no than then when where how why
  must may can will each every one two both all any other another same different more most
  learner learners cover covers covered required evidence use used using make makes making
  work works working state states stating name names naming given about between within versus
  data value values analysis analytical analyse analysed thing things part parts level levels
  set sets case cases form forms type types kind kinds`.split(/\s+/).filter(Boolean));

// event/events and distribution/distributions were two tokens each, which
// invented uniqueness and let a single weak word qualify a pair.
// Three letters, not four: a four-letter floor silently dropped SQL, row and
// key, which are among the most load-bearing words in the whole curriculum.
const SHORT_STOP = new Set('the and for are was not but can its one two all any use new see how why has had may per via non out off own has'.split(' '));
const stem = w => w.replace(/ies$/, 'y').replace(/(?:es|s)$/, '').replace(/(?:ing|ed)$/, '');
const terms = text => [...new Set(
  text.toLowerCase().replace(/[^a-z0-9\s-]/g, ' ').split(/\s+/)
    .map(w => w.replace(/^-+|-+$/g, ''))
    .filter(w => w.length >= 3 && !STOP.has(w) && !SHORT_STOP.has(w))
    .map(stem)
    .filter(w => w.length >= 3)
)];

// How many phases use each term, so a term common to many phases is ignored.
const phaseTerms = phases.map(p => new Set(terms(`${p.topics.join(' ')} ${p.evidence}`)));
const spread = new Map();
for (const set of phaseTerms) for (const t of set) spread.set(t, (spread.get(t) || 0) + 1);
const distinctive = t => (spread.get(t) || 0) > 0 && spread.get(t) <= Math.floor(phases.length / 4);

/** Terms shared by an existing item and a phase, distinctive ones only. */
const overlap = (text, i) => terms(text).filter(t => phaseTerms[i].has(t) && distinctive(t));

// One distinctive term is enough to raise, and the term is always printed.
//
// Requiring two dropped "Grain" from Phase 1, which lists "grain and level of
// detail" among its topics: the pair's whole text is six words, so a two-term
// rule was asking short titles to prove more than long ones. Stemming already
// removed the failure that made a one-term rule dangerous the first time round
// -- "event" now resolves to two phases rather than falsely to Probability
// alone -- so the honest design is to surface every hit WITH its evidence and
// let the founder judge it in a second, rather than tune a threshold until the
// number looks agreeable.
const CANDIDATE = hits => hits.length >= 1;

const byPhase = phases.map((p, i) => {
  const scored = pairs.map(pair => ({ pair, shared: overlap(pair.text, i) }));
  return {
    phase: p,
    candidates: scored.filter(x => CANDIDATE(x.shared)).sort((a, b) => b.shared.length - a.shared.length)
  };
});

const homeless = pairs.filter(p =>
  !byPhase.some(b => b.candidates.some(c => c.pair.id === p.id)));

/* ── report ───────────────────────────────────────────────────────────────── */

const bar = (n, of, width = 22) => {
  const filled = of ? Math.round((n / of) * width) : 0;
  return '#'.repeat(filled) + '.'.repeat(width - filled);
};

console.log('\n  MASTERPLAN-01092026 coverage audit');
console.log(`  ${phases.length} phases · ${sequence.length} production items · `
  + `${pairs.length} pairs on the floor\n`);
console.log('  Nothing below is coverage. Every match is a CANDIDATE for Gate 0');
console.log('  review, and only the founder may confirm one.\n');

let touched = 0;
for (const { phase, candidates } of byPhase) {
  if (candidates.length) touched += 1;
  console.log(`  ${candidates.length ? ' ' : '!'} Phase ${String(phase.n).padStart(2)} · ${phase.title}`);
  console.log(`      ${phase.topics.length} topics   ${candidates.length
    ? `${candidates.length} candidate pair(s)`
    : 'NO EXISTING PAIR TOUCHES THIS PHASE'}`);
  for (const c of candidates.slice(0, verbose ? 99 : 3)) {
    const live = c.pair.readLive && c.pair.playLive ? 'both live'
      : c.pair.readLive ? 'read only' : c.pair.playLive ? 'play only' : 'neither live';
    console.log(`      · ${c.pair.idea.padEnd(26)} ${c.pair.stage.padEnd(19)} ${live}`);
    console.log(`          on: ${c.shared.join(', ')}`);
  }
  if (!verbose && candidates.length > 3) console.log(`      · …and ${candidates.length - 3} more`);
  console.log('');
}

console.log('  ── The shape of it ───────────────────────────────────────────\n');
console.log(`  Phases with any candidate   ${bar(touched, phases.length)}  ${touched}/${phases.length}`);
console.log(`  Phases with none            ${bar(phases.length - touched, phases.length)}  ${phases.length - touched}/${phases.length}`);

const untouched = byPhase.filter(b => !b.candidates.length).map(b => b.phase);
if (untouched.length) {
  console.log(`\n  No existing pair touches these ${untouched.length} phases at all:`);
  for (const p of untouched) console.log(`    Phase ${String(p.n).padStart(2)} · ${p.title}  (${p.topics.length} topics)`);
}

if (homeless.length) {
  console.log(`\n  ${homeless.length} pair(s) on the floor match no phase in the plan.`);
  console.log("  Reusable, amendable, replaceable or out of scope is the founder's call:");
  for (const p of homeless) console.log(`    ${p.idea.padEnd(28)} ${p.stage}`);
}

const offFloorSessions = allSessions.filter(s => !s.onFloor);
const offFloorMissions = allMissions.filter(m => !m.onFloor);
console.log(`\n  Written but not on the floor: ${offFloorSessions.length} session(s), `
  + `${offFloorMissions.length} mission(s).`);
if (verbose) {
  for (const s of offFloorSessions) console.log(`    ${s.ref}  ${s.title}`);
  for (const m of offFloorMissions) console.log(`    ${m.slug.padEnd(24)} ${m.title}`);
}

console.log('\n  ── The production sequence (§15) ─────────────────────────────\n');
console.log('  The order framing questions go to the founder. No content is');
console.log('  authorised by it.\n');
let sequenceHits = 0;
for (const item of sequence) {
  const itemTerms = terms(item.title).filter(distinctive);
  const hits = pairs
    .map(pair => ({ pair, shared: itemTerms.filter(t => terms(pair.text).includes(t)) }))
    .filter(x => x.shared.length >= 1)
    .sort((a, b) => b.shared.length - a.shared.length);
  if (hits.length) sequenceHits += 1;
  const title = item.title.length > 44 ? item.title.slice(0, 43) + '…' : item.title;
  console.log(`  ${String(item.n).padStart(2)}. ${title.padEnd(45)}`
    + (hits.length
      ? `~ ${hits[0].pair.idea.padEnd(24)} on: ${hits[0].shared.join(', ')}`
      : '- nothing on the floor'));
}
console.log(`\n  ${sequenceHits} of ${sequence.length} production items have a candidate on the floor.`);

console.log('\n  Read this as a starting point for Gate 0, not a verdict.\n');
