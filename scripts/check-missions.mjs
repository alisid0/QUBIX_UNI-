// Every mission must be answerable only by understanding it.
//
// Why this exists: mission 004 shipped with the correct option first in all
// twelve of its questions. A learner pressing the top button and reading
// nothing scored 100%, and nothing anywhere said so. That is a worse failure
// than a wrong answer, because it looks exactly like a right one.
//
// It also recomputes the arithmetic each mission asserts, the same way the book
// suite recomputes what the prose claims.
//
//   npm run check:missions

import { JOIN_GRAIN_MISSION, answerForJoinCase, joinChangesGrain } from '../src/lib/game/join-grain-mission.js';
import { TABLE_GRAIN_MISSION, answerForGrainCase } from '../src/lib/game/table-grain-mission.js';

let bad = 0;
const ok = (label, pass, detail = '') => {
  if (!pass) bad++;
  console.log(`   ${pass ? 'PASS' : '**FAIL**'}  ${label}${detail ? '  ' + detail : ''}`);
};

console.log('the missions\n');

// A question list is a set of choices, so every choice has to be distinct and
// the right one has to actually be among them.
const questions = [
  ...TABLE_GRAIN_MISSION.cases.flatMap(c => [
    { m: '004', options: c.grainOptions, answer: answerForGrainCase(c, 'grain') },
    { m: '004', options: c.countOptions, answer: answerForGrainCase(c, 'count') }
  ]),
  ...JOIN_GRAIN_MISSION.cases.flatMap(c => [
    { m: '006', options: c.matchOptions, answer: answerForJoinCase(c, 'matches') },
    { m: '006', options: c.grainOptions, answer: answerForJoinCase(c, 'grain') }
  ])
];

for (const id of ['004', '006']) {
  const qs = questions.filter(q => q.m === id);
  const positions = qs.map(q => q.options.indexOf(q.answer));
  ok(`${id}: every answer is among its options`, positions.every(p => p >= 0),
    `${qs.length} questions`);
  ok(`${id}: no duplicate options`, qs.every(q => new Set(q.options).size === q.options.length));
  // The real check, and it has to be stronger than "not always the same".
  // The first fix here turned 000000000000 into 121212121212, which a learner
  // notices just as fast. So: no position may carry more than half, and the
  // sequence may not simply alternate.
  const worst = Math.max(...[0, 1, 2].map(i => positions.filter(p => p === i).length));
  const alternating = positions.length > 3
    && positions.every((p, i) => i < 2 || p === positions[i - 2]);
  ok(`${id}: cannot be beaten by pressing one button`, worst <= Math.ceil(qs.length / 2),
    `worst position holds ${worst} of ${qs.length}`);
  ok(`${id}: the answer position is not a pattern`, !alternating,
    `positions ${positions.join('')}`);
}

console.log('');

// The join arithmetic the mission prints has to be the arithmetic it means.
for (const c of JOIN_GRAIN_MISSION.cases) {
  const many = c.spans > 1;
  ok(`006 ${(c.left + ' x ' + c.right).padEnd(28)} grain ${many ? 'moves' : 'holds'}`,
    joinChangesGrain(c) === (c.resultRows !== c.leftRows) && (many ? c.resultRows !== c.leftRows : true),
    `${c.leftRows.toLocaleString()} -> ${c.resultRows.toLocaleString()}`);
}
// A safe join is the one that leaves the count alone, and there has to be one,
// or the mission only ever teaches suspicion.
const safe = JOIN_GRAIN_MISSION.cases.filter(c => !joinChangesGrain(c));
ok('006 includes joins that are safe as well as joins that are not',
  safe.length >= 2 && safe.length < JOIN_GRAIN_MISSION.cases.length,
  `${safe.length} safe of ${JOIN_GRAIN_MISSION.cases.length}`);

// Every mission has to say where it got this from.
console.log('');
for (const [id, m] of [['004', TABLE_GRAIN_MISSION], ['006', JOIN_GRAIN_MISSION]]) {
  ok(`${id}: cites its sources`, m.sources.length >= 3 && m.sources.every(s => /^https:\/\//.test(s.url)),
    `${m.sources.length} sources`);
}

console.log(`\n${bad ? `${bad} check(s) FAILED` : `all checks pass, ${questions.length} questions`}`);
process.exit(bad ? 1 : 0);
