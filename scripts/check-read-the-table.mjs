// Read the Table must stay the mission session 2 actually earned.
//
// It replaced Classify Store Data, which taught data types after a session
// about rows and columns. The failure mode is that the old vocabulary creeps
// back one word at a time, so the words are named here and the build refuses
// them.
//
//   node scripts/check-read-the-table.mjs

import { readFileSync } from 'node:fs';
import { READ_THE_TABLE_MISSION, DECISION_COUNT } from '../src/lib/game/read-the-table-mission.js';
import { SHARED_FOUNDATIONS } from '../src/lib/content/shared-foundations.js';
import { CHAPTER_ONE_ROUTE, routeProgress } from '../src/lib/content/chapter-route.js';
import { MISSIONS } from '../src/lib/game/progress.js';

let bad = 0;
const ok = (label, pass, detail = '') => {
  if (!pass) bad++;
  console.log(`   ${pass ? 'PASS' : '**FAIL**'}  ${label}${detail ? '  ' + detail : ''}`);
};

const M = READ_THE_TABLE_MISSION;
const session = SHARED_FOUNDATIONS.find(c => c.chapter === 1)
  .book.sessions.find(s => s.id === 'observations-variables');

/* ── shape ───────────────────────────────────────────────────────────────── */
ok('four tables', M.tables.length === 4, M.tables.map(t => t.name).join(', '));
ok('eight decisions', DECISION_COUNT === 8 && M.cases.length === 8);
ok('every table asks the row question then the column question',
  M.tables.every(t => t.row && t.column));

ok('every highlighted row is inside its table',
  M.tables.every(t => t.row.index >= 0 && t.row.index < t.rows.length));
ok('every highlighted column is inside its table',
  M.tables.every(t => t.column.index >= 0 && t.column.index < t.headers.length));
ok('every row has a value in every column',
  M.tables.every(t => t.rows.every(r => r.length === t.headers.length)));

ok('every answer is one of its own options',
  M.cases.every(c => c.options.some(o => o[0] === c.answer)),
  M.cases.filter(c => !c.options.some(o => o[0] === c.answer)).map(c => c.id).join(', '));

ok('every decision explains itself both ways',
  M.cases.every(c => c.why && c.retry));

ok('the recap is the last table and adds no new table after it',
  M.tables.findIndex(t => t.recap) === M.tables.length - 1,
  M.tables.filter(t => t.recap).map(t => t.name).join(', ') || 'none marked');

/* ── the vocabulary it must not use ──────────────────────────────────────── */
// Chapter 3 teaches these. Chapter 1 has not prepared any of them, and the
// whole reason this mission exists is that its predecessor taught them here.
const BANNED = [
  'nominal', 'ordinal', 'categorical', 'quantitative', 'discrete', 'continuous',
  'data type', 'datatype', 'barcode', 'interval scale', 'ratio scale'
];
const surfaces = {
  'the mission data': JSON.stringify(M),
  'the mission view': readFileSync(new URL('../src/views/ReadTheTableMission.svelte', import.meta.url), 'utf8'),
  'session 2': JSON.stringify(session)
};
for (const [where, text] of Object.entries(surfaces)) {
  const hits = BANNED.filter(w => new RegExp(w, 'i').test(text));
  ok(`${where} teaches no data types`, hits.length === 0, hits.join(', '));
}

// A column contains. It does not interrogate anybody.
for (const [where, text] of Object.entries(surfaces)) {
  ok(`${where} does not say a column asks a question`,
    !/column[^.]{0,40}\b(asks|asking|puts that question)\b/i.test(text));
}

/* ── it is wired where it says it is ─────────────────────────────────────── */
ok('session 2 sends the learner here',
  session.practice.href === '?mode=game&mission=read-the-table',
  session.practice.href);

ok('session 2 rehearses this mission',
  session.rehearsal?.mission === 'read-the-table');

ok('nothing in chapter one still links to classify-data',
  !JSON.stringify(SHARED_FOUNDATIONS.find(c => c.chapter === 1).book).includes('classify-data'));

const step4 = CHAPTER_ONE_ROUTE.find(s => s.step === 4);
ok('route step 4 is this mission and is marked built',
  step4.mission === 'read-the-table' && step4.built === true,
  `${step4.mission}, built ${step4.built}`);

ok('the mission is on the roster, so completion can be recorded',
  MISSIONS.some(m => m.slug === 'read-the-table'));

/* ── a learner who was part-way through must not be sent back ────────────── */
// Book progress is keyed by session id, not by mission slug, so replacing the
// mission behind session 2 leaves an existing learner's step 4 intact. That is
// the migration: nothing moves, and this proves it rather than assuming it.
const wasHere = { study: ['observations-variables'], exercises: [],
  practice: ['observations-variables'], notes: {} };
const sessions = SHARED_FOUNDATIONS.find(c => c.chapter === 1).book.sessions;
const after = routeProgress(wasHere, sessions);
ok('progress made against the old mission still completes step 4',
  after.done.has(3) && after.done.has(4),
  `steps done: ${[...after.done].join(', ')}`);

// And the old mission is still reachable where it now belongs, so nobody who
// completed it loses the XP for it.
ok('classify-data survives as the chapter 3 mission',
  MISSIONS.some(m => m.slug === 'classify-data' && m.reading.chapter === 3));

/* The answer-position check in check-missions only sees `cases`, and it caught
   this mission with all eight answers at index zero. Keep it visible. */
const positions = M.cases.map(c => c.options.findIndex(o => o[0] === c.answer));
const worst = Math.max(...positions.map(p => positions.filter(q => q === p).length));
ok('the top button is not the answer every time', worst <= 4, positions.join(''));

console.log(`\n${bad ? `${bad} problem(s)` : 'all checks pass'}, `
  + `${M.tables.length} tables and ${DECISION_COUNT} decisions`);
process.exit(bad ? 1 : 0);
