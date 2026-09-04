// The SQL workshop is a teaching model, not decorative copy. Every SQL lesson
// must carry the model back to precise database vocabulary and state where the
// analogy stops being literal.

import { SHARED_FOUNDATIONS } from '../src/lib/content/shared-foundations.js';

let bad = 0;
const ok = (label, pass, detail = '') => {
  if (!pass) bad += 1;
  console.log(`   ${pass ? 'PASS' : '**FAIL**'}  ${label}${detail ? `  ${detail}` : ''}`);
};

const sql = SHARED_FOUNDATIONS.find(item => item.chapter === 5)?.book;
// One kind per session, named after the session it belongs to. 'first-table'
// joined on 2026-09-04 with chapter 05.01, which teaches what a table, a row,
// a column and a key are before any of the four clause sessions arrive.
const expected = ['first-table', 'select', 'group', 'join', 'verify'];

ok('SQL chapter exists', Boolean(sql), sql?.title || 'missing');
ok('every SQL session has one workshop interaction',
  sql?.sessions.every(session => session.workshopLab),
  `${sql?.sessions.filter(session => session.workshopLab).length || 0} of ${sql?.sessions.length || 0}`);

for (const session of sql?.sessions || []) {
  const lab = session.workshopLab;
  if (!lab) continue;
  const where = `ch05.${session.number} ${session.id}`;
  ok(`${where} uses its intended interaction`, lab.kind === session.id && expected.includes(lab.kind), lab.kind);
  ok(`${where} translates at least six workshop objects`, lab.mapping?.length >= 6, `${lab.mapping?.length || 0} mappings`);
  ok(`${where} maps both sides explicitly`, lab.mapping.every(pair => pair.length === 2 && pair.every(Boolean)));
  ok(`${where} explains the model before interaction`, lab.paragraphs?.length >= 2);
  ok(`${where} states where the analogy stops`, Boolean(lab.limit) && lab.limit.split(/\s+/).length >= 20,
    `${lab.limit?.split(/\s+/).length || 0} words`);
  ok(`${where} includes an audio bridge`, Boolean(session.audioSummary));
}

console.log(`\n${bad ? `${bad} workshop problem(s)` : 'all checks pass, SQL analogy remains paired with real terminology and explicit limits'}`);
process.exit(bad ? 1 : 0);
