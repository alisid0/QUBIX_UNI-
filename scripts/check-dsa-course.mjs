import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { modules, searchTrace, insertionTrace, appendTrace, answerIsCorrect } from '../src/lib/content/dsa-course.js';
import { paramsForPath, cleanPathForParams } from '../src/lib/routes/clean-paths.js';

// Independent expected outcomes and exhaustive small inputs: catch lost values,
// off-by-one stopping, duplication semantics and incorrect cost accounting.
for (const values of [[],[1],[1,2],[2,1,2],[1,1,1],[3,2,1,0]]) {
  for (const target of [0,1,2,3,9]) {
    const result = searchTrace(values,target);
    const expected = values.findIndex(value => value === target);
    assert.equal(result.result,expected);
    assert.equal(result.steps.length,expected < 0 ? values.length : expected+1);
    for (const step of result.steps.slice(0,-1)) assert.notEqual(step.value,target);
  }
}
for (let n=0;n<=20;n+=1) {
  const original = Array.from({length:n},(_,i)=>`v${i}`);
  for (let i=0;i<=n;i+=1) {
    const trace = insertionTrace(original,i,'X');
    assert.deepEqual(trace.at(-1).slots,[...original.slice(0,i),'X',...original.slice(i)]);
    assert.equal(trace.at(-1).moves,n-i);
    assert.equal(trace.at(-1).writes,n-i+1);
    assert.deepEqual(original,Array.from({length:n},(_,j)=>`v${j}`));
  }
}
assert.throws(()=>insertionTrace(['A'],2,'X'),RangeError);
assert.throws(()=>insertionTrace(['A'],0,'X',1),RangeError);
assert.throws(()=>insertionTrace(['A'],-1,'X'),RangeError);
assert.deepEqual(appendTrace(5).map(x=>x.cost),[1,2,3,1,5]);
assert.deepEqual(appendTrace(5,'one').map(x=>x.cost),[1,2,3,4,5]);
assert.deepEqual(appendTrace(0),[]);
for (let m=1;m<=128;m+=1) {
  const doubled = appendTrace(m).at(-1);
  const unit = appendTrace(m,'one').at(-1);
  assert.ok(doubled.capacity >= m && doubled.capacity < 2*m);
  assert.ok(doubled.writes < 3*m);
  assert.equal(unit.copies,m*(m-1)/2);
  assert.equal(unit.writes,m*(m+1)/2);
}
assert.throws(()=>appendTrace(-1),RangeError);
assert.throws(()=>appendTrace(2,'unknown'),RangeError);
const ids = new Set();
for (const m of modules) {
  assert.equal(m.sections.length,5);
  assert.equal(m.questions.length,4);
  assert.ok(m.reflection && m.rubric.length >= 3 && m.transfer);
  for (const q of m.questions) {
    assert.ok(!ids.has(q.id)); ids.add(q.id);
    assert.ok(q.hint);
    if (q.options) {
      assert.equal(q.options.length,q.feedback.length);
      q.options.forEach((_,i)=>assert.equal(answerIsCorrect(q,i),i === q.correct));
    } else {
      assert.ok(answerIsCorrect(q,String(q.answer)));
      assert.ok(!answerIsCorrect(q,''));
      assert.ok(!answerIsCorrect(q,'nonsense'));
      assert.ok(!answerIsCorrect(q,q.answer+1));
    }
  }
}
assert.equal(paramsForPath('/dsa/course-preview').get('mode'),'dsa-course-preview');
assert.equal(cleanPathForParams(new URLSearchParams('mode=dsa-course-preview')),'/dsa/course-preview');
const app = readFileSync(new URL('../src/App.svelte', import.meta.url), 'utf8');

// This asserted `&& workshop`, keeping the edition out of production entirely.
// The founder asked on 2026-09-05 for it to be readable on the live site so
// that questions can be raised against the real thing, which is the same
// treatment the four approved DSA samples already have.
//
// So the assertion moves rather than goes. Reachable is not released, and the
// three properties that make that true are what is checked now: it is mounted
// on its own explicit route and nothing else, it earns no XP and sits on no
// roster, and it is never offered to a search engine.
assert.match(app, /showDsaCoursePreview = params\.get\('mode'\) === 'dsa-course-preview'/);
assert.ok(!/recordCompletion\(['\`]dsa-course/.test(readFileSync(new URL('../src/views/DsaCoursePreview.svelte', import.meta.url), 'utf8')),
  'the opening edition must not record Academy completion: it is not a rostered mission');
const routes = readFileSync(new URL('./site-routes.mjs', import.meta.url), 'utf8');
assert.match(routes, /\['dsa-course-preview', '[^']+'\]/,
  'the opening edition belongs in DSA_PREVIEWS, which registers it as preview and not indexable');
console.log('DSA course: boundary cases, search contracts, insertion preservation, growth bounds, answer validation and draft routing passed.');
