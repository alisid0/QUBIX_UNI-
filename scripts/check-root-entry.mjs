import { readFileSync } from 'node:fs';
import { DOORS } from '../src/lib/content/learning-flow.js';

// Line endings normalised before anything is matched against them.
//
// Without this the build was machine-dependent: this file asserts a pattern
// that spans a newline, and a Windows checkout has CRLF where the author's had
// LF, so the same commit passed on one machine and failed on the other. A guard
// that depends on which operating system checked the repository out is telling
// you about the checkout, not the code.
const source = path => readFileSync(new URL(path, import.meta.url), 'utf8').replace(/\r\n/g, '\n');

const page = source('../src/views/LearningFloor.svelte');
const app = source('../src/App.svelte');
let failed = false;
const check = (condition, label, detail = '') => {
  console.log(`   ${condition ? 'PASS' : '**FAIL**'}  ${label}${detail ? `  ${detail}` : ''}`);
  if (!condition) failed = true;
};

check(DOORS.length === 3, 'the root offers concepts, Python and SQL', `${DOORS.length} entry doors`);
check(DOORS.some(door => door.id === 'python') && DOORS.some(door => door.id === 'sql'), 'Python and SQL are first-class choices');
check(page.includes('door-card') && page.includes('d.lede'), 'each choice explains what the route feels like');
check(page.includes('aria-pressed={d.id === selectedDoor}') && page.includes('min-height: 154px'), 'topic choices look and behave like substantial buttons');
check(page.includes('No experience needed') && page.includes('What sounds most interesting today?'), 'the opening explicitly welcomes beginners');
check(page.indexOf('class="resume"') < page.indexOf('class="door-pick"'), 'the returning learner keeps their next step first');
check(!page.includes('stage-page-link'), 'the full homepage does not repeat links to standalone floor pages');
check(page.includes('{#if stage}\n            {#if st.exitOutcome}') && page.includes('{#if st.standard}'),
  'floor standards stay on standalone floor pages instead of crowding the homepage');
check(app.includes('const showLearningFloor') && app.includes("import('./views/LearningFloor.svelte')"), 'the redesigned learning floor is the root experience');
check(page.includes('@media (prefers-reduced-motion: reduce)'), 'root-page motion honours learner preferences');

console.log(failed ? '\n  root entry checks failed\n' : '\n  root entry is inviting and purposeful\n');
process.exit(failed ? 1 : 0);
