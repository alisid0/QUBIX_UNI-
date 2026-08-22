// Every mission must be answerable only by understanding it.
//
// Mission 004 shipped with the correct option first in all twelve of its
// questions: press the top button, read nothing, score 100%. That is a worse
// failure than a wrong answer, because it looks exactly like a right one.
//
// It was fixed, and then it came straight back in two new missions, because the
// first version of this file named the two missions it knew about. A guard that
// has to be extended by hand is a guard that will be out of date the next time
// somebody is in a hurry. So this one discovers questions by convention:
//
//   <base>Options  is answered by  <base>  or  <base>Answer
//   options        is answered by  answer
//
// and an option may be a plain value, or an object carrying `value` or `id`.
// A mission that offers choices and cannot be read this way fails rather than
// passing quietly, because silence is how the flaw returned.
//
//   npm run check:missions

import { readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const GAME = join(dirname(fileURLToPath(import.meta.url)), '..', 'src', 'lib', 'game');

let bad = 0;
const ok = (label, pass, detail = '') => {
  if (!pass) bad++;
  console.log(`   ${pass ? 'PASS' : '**FAIL**'}  ${label}${detail ? '  ' + detail : ''}`);
};

const valueOf = o => (o && typeof o === 'object' ? (o.value ?? o.id ?? JSON.stringify(o)) : o);
const same = (a, b) => valueOf(a) === valueOf(b)
  || (Array.isArray(a) && Array.isArray(b) && JSON.stringify(a) === JSON.stringify(b));

/** Every (options, answer) pair a mission offers, however it happens to spell it. */
function questionsIn(item) {
  const found = [];
  for (const [key, options] of Object.entries(item)) {
    if (!Array.isArray(options) || options.length < 2) continue;
    if (!/Options$|^options$/.test(key)) continue;
    const base = key === 'options' ? 'answer' : key.replace(/Options$/, '');
    const answer = item[base] ?? item[`${base}Answer`];
    if (answer === undefined) continue;
    const at = options.findIndex(o => same(o, answer));
    found.push({ key, options, answer, at });
  }
  return found;
}

/**
 * data-classification builds its choices from a step map it does not export, so
 * the reader above cannot see them. Its option order is fixed per step, which
 * means the flaw shows up as answers clustering on one value rather than on one
 * index. Checked explicitly, because a clever heuristic here would misfire on
 * ordinary fields like `table` or `colour`.
 */
async function checkClassification() {
  const { CLASSIFICATION_MISSION: C } = await import(`file://${join(GAME, 'data-classification-mission.js')}`);
  const variables = C.variations.flatMap(v => v.variables);
  for (const field of ['primary', 'subtype', 'scale']) {
    const values = variables.map(v => v[field]).filter(Boolean);
    const counts = [...new Set(values)].map(v => values.filter(x => x === v).length);
    ok(`${'data-classification'.padEnd(22)} ${field} answers are spread`,
      values.length > 0 && Math.max(...counts) <= Math.ceil(values.length / 2),
      `${new Set(values).size} distinct over ${values.length}, worst ${Math.max(...counts)}`);
  }
}

const files = readdirSync(GAME).filter(f => f.endsWith('-mission.js')).sort();
console.log(`the missions (${files.length} modules)\n`);

let totalQuestions = 0;
for (const file of files) {
  const module = await import(`file://${join(GAME, file)}`);
  const mission = Object.values(module).find(v => v && v.id && (v.cases || v.steps || v.variations || v.order));
  const name = file.replace('-mission.js', '');
  if (!mission) { ok(`${name.padEnd(22)} exports a mission`, false); continue; }

  const items = mission.cases || mission.steps || mission.variations || [];
  const questions = items.flatMap(questionsIn);

  // Some missions offer one shared list to every case rather than a list per
  // case. The flaw is the same shape there: if the answers cluster at one index
  // of the shared list, the top button still wins. Any module-level array whose
  // members cover a field on every case is treated as that field's options.
  const shared = Object.values(module).filter(v => Array.isArray(v) && v.length > 1
    && v.every(o => o && (typeof o === 'string' || typeof o === 'object')));
  for (const options of shared) {
    const keys = new Set(items.flatMap(Object.keys));
    for (const key of keys) {
      if (!items.every(i => i[key] !== undefined && options.some(o => same(o, i[key])))) continue;
      for (const item of items) {
        questions.push({ key, options, answer: item[key], at: options.findIndex(o => same(o, item[key])) });
      }
    }
  }

  totalQuestions += questions.length;

  if (!questions.length) {
    // Not every mission is a quiz. One that offers no choices at all is fine;
    // one that offers them in a shape this cannot read is not.
    const offersChoices = items.some(i => Object.entries(i)
      .some(([k, v]) => /Options$|^options$/.test(k) && Array.isArray(v) && v.length > 1));
    ok(`${name.padEnd(22)} covered`, !offersChoices,
      offersChoices ? 'offers options this check cannot read' : 'no multiple choice');
    continue;
  }

  const missing = questions.filter(q => q.at < 0);
  ok(`${name.padEnd(22)} every answer is among its options`, missing.length === 0,
    missing.length ? `${missing.length} of ${questions.length} missing` : `${questions.length} questions`);
  ok(`${name.padEnd(22)} no duplicate options`,
    questions.every(q => new Set(q.options.map(valueOf)).size === q.options.length));

  const positions = questions.filter(q => q.at >= 0).map(q => q.at);
  const worst = Math.max(...[...new Set(positions)].map(v => positions.filter(x => x === v).length));
  // Not merely "not always the same": the first fix here turned 000000000000
  // into 121212121212, which a learner notices just as fast.
  const alternating = positions.length > 3 && positions.every((p, i) => i < 2 || p === positions[i - 2]);
  ok(`${name.padEnd(22)} cannot be beaten by pressing one button`,
    worst <= Math.ceil(positions.length / 2), `worst position holds ${worst} of ${positions.length}`);
  ok(`${name.padEnd(22)} the answer position is not a pattern`, !alternating, positions.join(''));

  ok(`${name.padEnd(22)} cites its sources`,
    (mission.sources || []).length >= 2 && mission.sources.every(s => /^https:\/\//.test(s.url)),
    `${(mission.sources || []).length} sources`);
  console.log('');
}

await checkClassification();
console.log('');

// The arithmetic mission 006 prints has to be the arithmetic it means.
const { JOIN_GRAIN_MISSION, joinChangesGrain } = await import(`file://${join(GAME, 'join-grain-mission.js')}`);
for (const c of JOIN_GRAIN_MISSION.cases) {
  ok(`006 ${(c.left + ' x ' + c.right).padEnd(26)} grain ${c.spans > 1 ? 'moves' : 'holds'}`,
    joinChangesGrain(c) === (c.resultRows !== c.leftRows) && (c.spans > 1 ? c.resultRows !== c.leftRows : true),
    `${c.leftRows.toLocaleString()} -> ${c.resultRows.toLocaleString()}`);
}
const safe = JOIN_GRAIN_MISSION.cases.filter(c => !joinChangesGrain(c));
ok('006 teaches safe joins as well as dangerous ones',
  safe.length >= 2 && safe.length < JOIN_GRAIN_MISSION.cases.length,
  `${safe.length} safe of ${JOIN_GRAIN_MISSION.cases.length}`);

console.log(`\n${bad ? `${bad} check(s) FAILED` : `all checks pass, ${totalQuestions} questions across ${files.length} missions`}`);
process.exit(bad ? 1 : 0);
