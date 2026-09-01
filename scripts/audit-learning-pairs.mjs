// Do the pairs in the redesign brief resolve to real Qubix material?
//
// The brief names a Read and a Play for every step of Shared Data Truths, the
// three doors and the Analyst floor. Before any of that is built, each half has
// to be checked against what actually exists, because the one thing the brief
// forbids is enabling a destination that was never written:
//
//   "Never infer completion merely because the topic appears in the wiki."
//   "No invented lesson or mission URL is enabled."
//
// So this resolves every named half to a live session or a live mission slug,
// and prints what does not resolve. It reports; it does not fail a build.
//
//   node scripts/audit-learning-pairs.mjs

import { SHARED_FOUNDATIONS } from '../src/lib/content/shared-foundations.js';
import { MISSIONS } from '../src/lib/game/progress.js';

/* Every reading that exists, by title, and where it lives. */
const readings = new Map();
for (const { chapter, book } of SHARED_FOUNDATIONS) {
  book.sessions.forEach((s, i) => {
    readings.set(s.title.toLowerCase(), { ref: `${chapter}.0${i + 1}`, title: s.title });
  });
}
const missions = new Map(MISSIONS.map(m => [m.mission.title.toLowerCase(), m.slug]));

/* Fuzzy on purpose: the brief writes shortened titles for some readings, and a
   near match is a finding to report rather than a silent pass. */
const findReading = name => {
  const key = name.toLowerCase();
  if (readings.has(key)) return { ...readings.get(key), exact: true };
  const words = key.split(/\W+/).filter(w => w.length > 3);
  for (const [title, r] of readings) {
    const hits = words.filter(w => title.includes(w)).length;
    if (words.length && hits / words.length >= 0.6) return { ...r, exact: false };
  }
  return null;
};
const findMission = name => {
  const key = name.toLowerCase();
  if (missions.has(key)) return { slug: missions.get(key), exact: true };
  for (const [title, slug] of missions) {
    if (title.includes(key) || key.includes(title)) return { slug, exact: false };
  }
  return null;
};

const STAGES = [
  ['Shared Data Truths', [
    ['01', 'Event versus record', 'A sale is not its record', 'Process a Sale'],
    ['02', 'Rows and columns', 'Rows and columns', 'Read the Table'],
    ['03', 'Grain', 'What one row represents', 'What Does One Row Represent?'],
    ['04', 'Missingness', 'Zero, blank or missing?', 'Missing Values Are Not Zero'],
    ['05', 'Units', 'Every number needs a unit', 'Units and Measurement'],
    ['06', 'Rates and denominators', 'Ratios, rates and percentages', 'The Rate Desk'],
    ['07', 'Data types', 'A postcode and a price', 'Classify Store Data'],
    ['08', 'Keys and duplicates', 'Does one row mean one sale or one product?', 'Keys and Duplicate Records'],
    ['09', 'Provenance', 'Where did this number come from?', 'Trace the Number']
  ]],
  ['Concepts door', [
    ['C1', 'Numbers and change', 'Numbers, Ratios and Change', 'SUM(quantity)'],
    ['C2', 'Distributions', 'From values to a distribution', 'The Distribution Desk'],
    ['C3', 'Centre and cost', 'Centre is a choice', 'What Does It Cost?'],
    ['C4', 'Samples and boundaries', 'Who is in the data?', 'The Sampling Desk'],
    ['C5', 'Chance and inference', 'Chance and Inference', 'Inference Investigation']
  ]],
  ['Python door', [
    ['P1', 'Values and types', 'Values, names and types', 'Classify Store Data'],
    ['P2', 'Decisions and loops', 'Decisions and repetition', 'Read the Program'],
    ['P3', 'Functions', 'Giving a piece of work a name', 'Function Workshop'],
    ['P4', 'Tables in code', 'Collections, and a table in code', 'Pandas Superstore Lab'],
    ['P5', 'Reproducible notebooks', 'Notebook practice', 'Reproducibility Lab']
  ]],
  ['SQL door', [
    ['S1', 'Select and filter', 'Asking a table a question', 'The SQL Console'],
    ['S2', 'Group and count', 'Grouping changes the grain on purpose', 'The Region That Wasn’t'],
    ['S3', 'Join safely', 'Joining without changing what a row is', 'Join Without Changing the Grain'],
    ['S4', 'Verify and release', 'Checking a result before believing it', 'The Result Checkpoint']
  ]],
  ['Analyst floor', [
    ['A1', 'Readable evidence', 'A table someone can actually read', 'Readable Table Lab'],
    ['A2', 'Honest charts', 'A chart that does not flatter', 'The Chart Clinic'],
    ['A3', 'Finding versus advice', 'Separating what you found from what you think', 'Analyst Decision Desk'],
    ['A4', 'Reproducible handover', 'Work somebody else can run', 'The Handover Pack']
  ]]
];

let pairs = 0, bothLive = 0, readMissing = 0, playMissing = 0, inexact = 0;
const gaps = [];

for (const [stage, rows] of STAGES) {
  console.log(`\n  ${stage.toUpperCase()}\n`);
  for (const [step, idea, readName, playName] of rows) {
    pairs++;
    const r = findReading(readName);
    const p = findMission(playName);
    if (!r) readMissing++;
    if (!p) playMissing++;
    if (r && p) bothLive++;
    if ((r && !r.exact) || (p && !p.exact)) inexact++;
    if (!r || !p) gaps.push({ step, idea, read: r ? r.ref : 'NOT WRITTEN', play: p ? p.slug : 'NOT BUILT' });

    const readCell = r ? `${r.ref}${r.exact ? '' : ' ~'}` : 'not written';
    const playCell = p ? `${p.slug}${p.exact ? '' : ' ~'}` : 'not built';
    console.log(`    ${step}  ${idea.padEnd(26)} read ${readCell.padEnd(12)} play ${playCell}`);
  }
}

console.log(`\n  ${bothLive} of ${pairs} pairs have both halves.`);
console.log(`  ${readMissing} reading(s) missing, ${playMissing} mission(s) missing.`);
console.log(`  ${inexact} half/halves matched on a near title rather than an exact one (~).`);
if (gaps.length) {
  console.log('\n  MUST BE SHOWN DISABLED, NEVER LINKED:');
  for (const g of gaps) console.log(`    ${g.step}  ${g.idea}: read ${g.read}, play ${g.play}`);
}
console.log('');
