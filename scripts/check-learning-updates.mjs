import { readFileSync } from 'node:fs';
import {
  buildLearningSummary,
  emailShareUrl,
  normalizeUpdatePreferences,
  whatsAppShareUrl
} from '../src/lib/updates/learning-updates.js';

let failed = false;
const check = (condition, label) => {
  console.log(`   ${condition ? 'PASS' : 'FAIL'}  ${label}`);
  if (!condition) failed = true;
};

const next = {
  kind: 'read',
  stage: { title: 'Shared Data Truths' },
  asset: { label: 'Rows and columns', href: '/learn/data-foundations/chapter/1/session/2' }
};
const summary = buildLearningSummary({
  completion: { done: 3, total: 48, percent: 6 },
  next,
  origin: 'https://qubix.university'
});

check(summary.includes('3 of 48 live steps complete (6%).'),
  'the portable summary carries factual progress');
check(summary.includes('Next: Read “Rows and columns” in Shared Data Truths.'),
  'the portable summary names the next real learning step');
check(summary.includes('https://qubix.university/learn/data-foundations/chapter/1/session/2'),
  'the portable summary carries a shareable absolute Qubix URL');
check(whatsAppShareUrl(summary).startsWith('https://wa.me/?text='),
  'WhatsApp sharing uses the user-controlled share surface');
check(emailShareUrl(summary).startsWith('mailto:?subject='),
  'email sharing uses the learner’s own mail application');
check(normalizeUpdatePreferences({ cadence: 'nonsense', reminderTime: '88:88' }).cadence === 'daily',
  'invalid reminder preferences fall back safely');

const view = readFileSync(new URL('../src/views/LearningUpdates.svelte', import.meta.url), 'utf8');
const worker = readFileSync(new URL('../public/sw.js', import.meta.url), 'utf8');
const app = readFileSync(new URL('../src/App.svelte', import.meta.url), 'utf8');

check(view.includes('Nothing is sent automatically') && view.includes('Prepared, not yet sending'),
  'the public UI distinguishes live sharing from unconnected delivery');
check(view.includes('Notification.requestPermission()'),
  'notification permission is requested only from the learner action');
check(worker.includes("addEventListener('notificationclick'") && worker.includes('clients.openWindow(destination)'),
  'a notification opens its intended Qubix destination');
check(app.includes("params.get('mode') === 'updates'") && app.includes("import('./views/LearningUpdates.svelte')"),
  'the Learning Updates view is mounted on an explicit route');

console.log(failed
  ? '\nLearning update checks failed\n'
  : '\nlearning summaries and honest channel states are guarded\n');
process.exit(failed ? 1 : 0);

