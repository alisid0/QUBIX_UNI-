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
    ['classify', 'numeric', 'sequence', 'decision-path', 'distribution-build', 'five-number-build', 'rate-compare', 'value-role', 'duplicate-check', 'evidence-trail'].includes(exercise.type) && exercise.minutes >= 3,
    `${exercise.type}, ${exercise.minutes} min`);
  // rate-compare runs its own rounds, so its work is in `cases`.
  const work = exercise.items || exercise.cases || exercise.steps || [];
  ok(`${where} has at least three pieces of work`, work.length >= 3, `${work.length} item(s)`);

  if (exercise.type === 'evidence-trail') {
    ok(`${where} every stage names a phase, a title and a detail`,
      exercise.steps.every(s => s.phase && s.title && s.detail));
    ok(`${where} every stage names an answer it offers`,
      exercise.steps.every(s => s.options[s.correct] !== undefined));
    ok(`${where} it names the figure being traced`,
      Boolean(exercise.target?.name && exercise.target?.value));

    // The trail runs source, filter, standardise, summarise, preserve. That
    // order is the lesson: you cannot standardise before you have chosen a
    // source, and preserving comes last or there is nothing to preserve.
    const PHASES = ['Source', 'Filter', 'Standardise', 'Summarise', 'Preserve'];
    ok(`${where} the stages run source to preserved result`,
      exercise.steps.map(s => s.phase).join(',') === PHASES.join(','),
      exercise.steps.map(s => s.phase).join(' → '));

    // The point of the whole session: the original records survive. If the
    // correct final answer ever became "replace" or "delete", the activity
    // would be teaching the opposite of what it says.
    const final = exercise.steps.at(-1);
    ok(`${where} the last decision keeps the source records`,
      /keep the source/i.test(final.options[final.correct]),
      final.options[final.correct]);
    ok(`${where} discarding the source is offered and wrong`,
      final.options.some((o, i) => /replace|delete/i.test(o) && i !== final.correct));

    const at = exercise.steps.map(s => s.correct);
    const worst = Math.max(...at.map(p => at.filter(q => q === p).length));
    ok(`${where} the answer is not always in the same place`,
      worst <= Math.ceil(at.length / 2), at.join(''));
  }

  if (exercise.type === 'duplicate-check') {
    ok(`${where} every pair shows exactly two rows`,
      exercise.cases.every(c => c.rows.length === 2));
    ok(`${where} every row has a value for every column`,
      exercise.cases.every(c => c.rows.every(r => r.length === c.columns.length)));
    // The method is comparing the identifying columns, so every pair must name
    // its grain and its key, including the one whose key is absent.
    ok(`${where} every pair names its grain and its identifying columns`,
      exercise.cases.every(c => c.table && c.grain && c.key));

    // The three answers a learner has to be able to reach. If the activity
    // never uses one of them, it is not teaching the distinction it claims to.
    const used = new Set(exercise.cases.map(c => c.correct));
    ok(`${where} all three verdicts are reachable`, used.size === 3,
      `verdicts used: ${[...used].sort().join(', ')}`);

    // "Not enough evidence" must be the answer only where the key is genuinely
    // missing, otherwise it teaches shrugging rather than judgement.
    ok(`${where} not-enough-evidence is used only where the key is absent`,
      exercise.cases.every(c => c.correct !== 2 || /not included|missing|absent/i.test(c.key)));
    ok(`${where} a duplicate verdict has both key columns matching`,
      exercise.cases.filter(c => c.correct === 1).every(c =>
        c.columns.every((col, i) => !col.key || c.rows[0][i] === c.rows[1][i])));
    ok(`${where} a two-different-records verdict has a key column that differs`,
      exercise.cases.filter(c => c.correct === 0).every(c =>
        c.columns.some((col, i) => col.key && c.rows[0][i] !== c.rows[1][i])));

    const at = exercise.cases.map(c => c.correct);
    const worst = Math.max(...at.map(p => at.filter(q => q === p).length));
    ok(`${where} the answer is not always in the same place`,
      worst <= Math.ceil(at.length / 2), at.join(''));
  }

  if (exercise.type === 'value-role') {
    ok(`${where} every value names an answer it offers`,
      exercise.cases.every(c => c.options[c.correct] !== undefined));
    // The role is chosen first and the formal term is the reveal. A choice that
    // already contains the term would hand the learner the answer.
    const TERMS = ['nominal', 'ordinal', 'discrete', 'continuous'];
    ok(`${where} no choice gives away the term it teaches`,
      exercise.cases.every(c => c.options.every(o => !TERMS.some(t => o.toLowerCase().includes(t)))));
    ok(`${where} every value is named afterwards`,
      exercise.cases.every(c => c.term && c.explanation));
    const at = exercise.cases.map(c => c.correct);
    const worst = Math.max(...at.map(p => at.filter(q => q === p).length));
    ok(`${where} the answer is not always in the same place`,
      worst <= Math.ceil(at.length / 2), at.join(''));
  }

  if (exercise.type === 'rate-compare') {
    ok(`${where} every comparison names a real answer`,
      exercise.cases.every(c => c.correct === 2 || c.branches[c.correct]),
      exercise.cases.map(c => c.correct).join(', '));
    // Two branches and an "equal" option means three positions. If the answer
    // sits in the same one every time, the activity is a button, not a choice.
    const spread = new Set(exercise.cases.map(c => c.correct));
    ok(`${where} the answer is not always in the same place`, spread.size >= 2,
      `positions used: ${[...spread].sort().join(', ')}`);
    ok(`${where} every comparison hides its rate behind a decision`,
      exercise.cases.every(c => c.branches.every(b => b.rate && b.numerator && b.denominator)));
    ok(`${where} feedback names both sides`,
      exercise.cases.every(c => c.feedback && c.feedback.length > 40));
  }

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
