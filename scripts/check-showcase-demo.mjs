import { readFileSync } from 'node:fs';
import { paramsForPath, cleanPathForParams } from '../src/lib/routes/clean-paths.js';

let failed = false;
const check = (condition, label, detail = '') => {
  console.log(`   ${condition ? 'PASS' : '**FAIL**'}  ${label}${detail ? `  ${detail}` : ''}`);
  if (!condition) failed = true;
};

const demo = readFileSync(new URL('../src/views/ShowcaseDemo.svelte', import.meta.url), 'utf8');
const steps = [...demo.matchAll(/Object\.freeze\(\{ at: '([^']+)', minutes: (\d+)/g)];
check(steps.length === 8, 'meeting workflow has eight deliberate moments', `${steps.length} moments`);
check(steps.reduce((total, match) => total + Number(match[2]), 0) === 30, 'run of show totals exactly 30 minutes');
for (const phrase of ['WHAT THE USER DOES', 'WHAT TO SAY', 'WHAT THIS PROVES', 'TIME REMAINING']) {
  check(demo.includes(phrase), `presenter console includes “${phrase}”`);
}
check((demo.match(/target="_blank"/g) || []).length === 1, 'live experiences use one reusable launch pattern');
check(demo.includes('completed.length') && demo.includes('percent'), 'presenter can track progress through the meeting');

const routeParams = paramsForPath('/showcase/demo');
check(routeParams.get('mode') === 'showcase-demo', 'clean demo path resolves');
check(cleanPathForParams(new URLSearchParams({ mode: 'showcase-demo' })) === '/showcase/demo', 'demo query alias rewrites cleanly');

const app = readFileSync(new URL('../src/App.svelte', import.meta.url), 'utf8');
for (const slug of ['read-the-table', 'distribution-desk', 'sql-console', 'data-visualization', 'analyst-desk']) {
  check(app.includes(`'${slug}'`), `curated demo can open ${slug}`);
}

const hosting = JSON.parse(readFileSync(new URL('../vercel.json', import.meta.url), 'utf8'));
check(hosting.rewrites.some(rule => rule.source === '/showcase/:path*' && rule.destination === '/index.html'), 'hosting serves direct demo visits');

console.log(failed ? '\n  showcase demo checks failed\n' : '\n  30-minute showcase workflow checks pass\n');
process.exit(failed ? 1 : 0);
