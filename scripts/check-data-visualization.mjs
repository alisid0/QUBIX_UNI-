import { readFileSync } from 'node:fs';
import { DATA_VISUALIZATION_MISSION as M, isVisualizationAnswer } from '../src/lib/game/data-visualization-mission.js';
import { paramsForPath, cleanPathForParams } from '../src/lib/routes/clean-paths.js';

let failed = false;
const check = (condition, label, detail = '') => {
  console.log(`   ${condition ? 'PASS' : '**FAIL**'}  ${label}${detail ? `  ${detail}` : ''}`);
  if (!condition) failed = true;
};

check(M.status === 'AI_DRAFT', 'mission keeps its curriculum status explicit');
check(M.sources.length >= 2 && M.sources.every(source => source.url.startsWith('https://')), 'mission records source provenance');
check(M.cases.length === 4, 'four visual questions are practised', `${M.cases.length} cases`);
check(new Set(M.cases.map(item => item.answer)).size === 4, 'bar, line, histogram and scatter are all required');
check(M.cases.every(item => item.options.some(option => isVisualizationAnswer(item, option.id))), 'every answer is present among its choices');
check(M.cases.every(item => new Set(item.options.map(option => option.id)).size === item.options.length), 'no case repeats a chart choice');

const view = readFileSync(new URL('../src/views/DataVisualizationMission.svelte', import.meta.url), 'utf8');
for (const label of ['Scale and zero are honest', 'Axes name the measure and unit', 'Colour is not the only key']) {
  check(view.includes(label), `chart audit includes “${label}”`);
}

const showcase = readFileSync(new URL('../src/views/Showcase.svelte', import.meta.url), 'utf8');
check(showcase.includes('/academy/missions/data-visualization?showcase=1'), 'showcase links to the chart clinic demo');
check(showcase.includes('Potential learners') && showcase.includes('Universities') && showcase.includes('Training teams'), 'showcase speaks to each requested audience');
const app = readFileSync(new URL('../src/App.svelte', import.meta.url), 'utf8');
check(app.includes("['read-the-table', 'data-visualization', 'analyst-desk'].includes(mission)"), 'presentation bypass is limited to curated showcase missions');

const showcaseParams = paramsForPath('/showcase');
check(showcaseParams.get('mode') === 'showcase', 'clean showcase path resolves');
check(cleanPathForParams(new URLSearchParams({ mode: 'showcase' })) === '/showcase', 'showcase query alias rewrites cleanly');

console.log(failed ? '\n  data visualisation checks failed\n' : '\n  data visualisation and showcase checks pass\n');
process.exit(failed ? 1 : 0);
