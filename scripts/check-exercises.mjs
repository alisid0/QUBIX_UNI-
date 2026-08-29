// Reader exercises are executable curriculum, not optional decoration. This
// check keeps one applied exercise in every chapter and verifies that every
// answer the interface expects can actually be produced from the choices it
// renders. It also binds the three expanded readings to their new missions.

import { readFileSync } from 'node:fs';
import { SHARED_FOUNDATIONS } from '../src/lib/content/shared-foundations.js';
import { MISSIONS } from '../src/lib/game/progress.js';

let bad = 0;
const ok = (label, pass, detail = '') => {
  if (!pass) bad += 1;
  console.log(`   ${pass ? 'PASS' : '**FAIL**'}  ${label}${detail ? `  ${detail}` : ''}`);
};

const exercises = SHARED_FOUNDATIONS.flatMap(({ chapter, book }) =>
  book.sessions.filter(session => session.exercise).map(session => ({ chapter, session, exercise: session.exercise })));

for (const { chapter } of SHARED_FOUNDATIONS) {
  const count = exercises.filter(item => item.chapter === chapter).length;
  ok(`chapter ${chapter} has applied reader work`, count >= 1, `${count} exercise(s)`);
}

ok('exercise ids are unique', new Set(exercises.map(item => item.exercise.id)).size === exercises.length,
  exercises.map(item => item.exercise.id).join(', '));

for (const { chapter, session, exercise } of exercises) {
  const where = `ch${String(chapter).padStart(2, '0')}.${session.number} ${exercise.id}`;
  ok(`${where} declares a supported type and time`,
    ['classify', 'numeric', 'sequence', 'decision-path', 'distribution-build', 'five-number-build'].includes(exercise.type) && exercise.minutes >= 3,
    `${exercise.type}, ${exercise.minutes} min`);
  ok(`${where} has at least three pieces of work`, (exercise.items || []).length >= 3,
    `${exercise.items?.length || 0} item(s)`);

  if (exercise.type === 'classify') {
    const values = exercise.options.map(option => option[0]);
    ok(`${where} classification answers are offered`,
      exercise.items.every(item => values.includes(item.answer)) && new Set(values).size === values.length);
  } else if (exercise.type === 'decision-path') {
    ok(`${where} decision answers are offered`,
      exercise.items.every(item => item.options?.some(option => option[0] === item.answer)
        && item.why && item.retry));
  } else if (exercise.type === 'distribution-build') {
    ok(`${where} distribution answers are finite and cumulative`,
      exercise.items.every(item => Number.isInteger(item.frequency) && item.frequency >= 0
        && Number.isFinite(item.cumulative) && item.cumulative >= 0 && item.cumulative <= 100)
      && exercise.items.at(-1)?.cumulative === 100);
    ok(`${where} frequencies account for every raw value`,
      exercise.items.reduce((sum, item) => sum + item.frequency, 0) === exercise.values.length,
      `${exercise.values.length} raw values`);
  } else if (exercise.type === 'five-number-build') {
    ok(`${where} five-number answers are finite`,
      exercise.values.length >= 4 && exercise.values.every(Number.isFinite)
      && exercise.items.every(item => Number.isFinite(item.answer)));
    const answers = Object.fromEntries(exercise.items.map(item => [item.id, item.answer]));
    ok(`${where} derived spread agrees with its landmarks`,
      answers.iqr === answers.q3 - answers.q1 && answers.range === answers.max - answers.min,
      `IQR ${answers.iqr}, range ${answers.range}`);
  } else if (exercise.type === 'numeric') {
    ok(`${where} numeric answers are finite`,
      exercise.items.every(item => Number.isFinite(item.answer) && Number.isFinite(item.tolerance ?? 0)));
  } else if (exercise.type === 'sequence') {
    const ids = exercise.items.map(item => item.id);
    ok(`${where} answer is a permutation of its cards`,
      exercise.answer.length === ids.length
      && new Set(exercise.answer).size === ids.length
      && exercise.answer.every(id => ids.includes(id)));
  }
}

const missionTargets = [
  [4, 'sampling', 'sampling-desk'],
  [5, 'verify', 'result-checkpoint'],
  [7, 'reproducible', 'handover-pack']
];
const roster = new Set(MISSIONS.map(item => item.slug));
for (const [chapter, id, slug] of missionTargets) {
  const session = SHARED_FOUNDATIONS.find(item => item.chapter === chapter)?.book.sessions.find(item => item.id === id);
  ok(`ch${String(chapter).padStart(2, '0')} ${id} routes to ${slug}`,
    session?.practice?.href === `?mode=game&mission=${slug}` && session?.rehearsal?.mission === slug && roster.has(slug));
  ok(`${slug} reading names its open-source licence`,
    session?.sources?.some(source => source.licence && /CC BY|Open Government|PostgreSQL|Permissive/.test(source.licence)));
}

const index = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
ok('the loading screen publishes the live mission count',
  index.includes(`${MISSIONS.length} practical missions`) && !/thirteen practical missions/i.test(index),
  `${MISSIONS.length} missions`);

console.log(`\n${bad ? `${bad} check(s) FAILED` : `all checks pass, ${exercises.length} applied exercises and ${missionTargets.length} new read-to-mission routes`}`);
process.exit(bad ? 1 : 0);
