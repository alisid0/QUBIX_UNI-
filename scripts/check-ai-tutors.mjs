import fs from 'node:fs';
import {
  buildTutorInput,
  cleanSources,
  extractOutputText,
  instructionsFor,
  questionIsInScope
} from '../api/tutor.js';
import tutorHandler from '../api/tutor.js';

let failed = false;
const check = (condition, label) => {
  console.log(`   ${condition ? 'PASS' : 'FAIL'}  ${label}`);
  if (!condition) failed = true;
};

check(questionIsInScope('learner', 'Why does the median resist an outlier?'),
  'learner gate admits a data-science question');
check(questionIsInScope('learner', 'What is a lookup?'),
  'learner gate admits a database lookup question without lesson context');
check(questionIsInScope('learner', 'How does a derivative measure change?'),
  'learner gate admits a mathematics question');
check(questionIsInScope('learner', 'How do I join two tables in SQL?'),
  'learner gate admits a SQL question');
check(!questionIsInScope('learner', 'Write me a recipe for lasagne'),
  'learner gate refuses an unrelated request');
check(questionIsInScope('learner', 'why?', 'A Qubix lesson about table grain', [{ excerpt: 'One row is one sale line.' }]),
  'learner gate admits a grounded follow-up');
check(!questionIsInScope('learner', 'write a poem', 'A Qubix lesson about data', [{ excerpt: 'A row is a record.' }]),
  'page context cannot smuggle an unrelated request through the scope gate');
check(questionIsInScope('builder', 'Frame the next Qubix Read and Play pair'),
  'builder gate admits curriculum construction');
check(!questionIsInScope('builder', 'Plan my holiday'),
  'builder gate refuses unrelated personal work');

const sources = cleanSources(new Array(8).fill(null).map((_, index) => ({
  id: `s-${index}`,
  session: 'Qubix session',
  excerpt: `Evidence ${index}`,
  href: '/learn'
})));
check(sources.length === 4, 'only four grounded passages can enter one request');
check(buildTutorInput('builder', 'Audit probability', 'Master plan', sources).includes('AI_DRAFT'),
  'builder input carries the curriculum authority boundary');
check(/mathematics, statistics, probability, data science/i.test(instructionsFor('learner'))
  && /does not need to match the current\s+lesson exactly/i.test(instructionsFor('learner')),
  'learner instructions state the broad subject boundary without requiring an exact lesson match');
check(/two purposes/i.test(instructionsFor('learner'))
  && /Think of it like/i.test(instructionsFor('learner'))
  && /Read next:/i.test(instructionsFor('learner')),
  'learner instructions require reasoning, an analogy and the matching reading');
check(/only person who may mark curriculum APPROVED or RELEASED/i.test(instructionsFor('builder')),
  'builder instructions preserve founder authority');
check(extractOutputText({ output: [{ content: [{ type: 'output_text', text: 'Grounded answer' }] }] }) === 'Grounded answer',
  'Responses API text is extracted without assuming one output position');

async function callTutor(request) {
  const result = { status: 0, headers: {}, body: null };
  const response = {
    setHeader(name, value) { result.headers[name] = value; },
    status(value) { result.status = value; return this; },
    json(value) { result.body = value; return result; }
  };
  await tutorHandler({ headers: {}, socket: {}, ...request }, response);
  return result;
}

const status = await callTutor({ method: 'GET' });
check(status.status === 200 && typeof status.body.configured === 'boolean' && status.body.model,
  'status endpoint reveals capability but never a credential');
const refused = await callTutor({ method: 'POST', body: { mode: 'learner', question: 'Write me a recipe' } });
check(refused.status === 200 && refused.body.refused === true && refused.body.model === 'Qubix scope gate',
  'HTTP endpoint refuses an unrelated learner request before any model call');

const component = fs.readFileSync(new URL('../src/lib/components/WorkshopAssistant.svelte', import.meta.url), 'utf8');
const builder = fs.readFileSync(new URL('../src/views/QubixBuilder.svelte', import.meta.url), 'utf8');
const app = fs.readFileSync(new URL('../src/App.svelte', import.meta.url), 'utf8');
const env = fs.readFileSync(new URL('../.env.example', import.meta.url), 'utf8');
const vercel = JSON.parse(fs.readFileSync(new URL('../vercel.json', import.meta.url), 'utf8'));

check(component.includes("fetch('/api/tutor'"), 'Ask Qubix sends open questions to the server tutor');
check(component.includes('localResponse'), 'Ask Qubix retains its deterministic local fallback');
check(component.includes('with a useful analogy') && component.includes('to the Qubix reading'),
  'Ask Qubix states its two learner-facing purposes');
check(builder.includes("'X-Qubix-Builder-Key'"), 'Builder sends its access proof only to the server');
check(!component.includes('OPENAI_API_KEY') && !builder.includes('OPENAI_API_KEY'),
  'no OpenAI secret name appears in either browser component');
check(app.includes("params.get('mode') === 'builder'") && app.includes("import('./views/QubixBuilder.svelte')"),
  'the Builder is mounted only on its explicit route');
check(vercel.rewrites.some(route => route.source === '/builder' && route.destination === '/index.html'),
  'Vercel sends the clean Builder route to the application');
check(env.includes('OPENAI_API_KEY=') && env.includes('QUBIX_BUILDER_KEY=')
  && !env.includes('VITE_OPENAI') && !env.includes('VITE_QUBIX_BUILDER'),
  'AI secrets are documented as server-only variables');

console.log(failed
  ? '\nAI tutor checks failed\n'
  : '\nboth Qubix assistants remain scoped, grounded and server-keyed\n');
process.exit(failed ? 1 : 0);
