import { SQL_READING_ASSISTANTS, sqlConsoleAssistant } from '../src/lib/content/sql-assistant.js';
import { SQL_CONSOLE_MISSION } from '../src/lib/game/sql-console-mission.js';
import { SQL_KNOWLEDGE_COUNT, searchSqlKnowledge } from '../src/lib/content/sql-knowledge-index.js';
import fs from 'node:fs';

let failed = false;
const check = (condition, label, detail = '') => {
  console.log(`${condition ? '   PASS' : '   FAIL'}  ${label}${detail ? `  ${detail}` : ''}`);
  if (!condition) failed = true;
};

const lessonKeys = ['select', 'group', 'join', 'verify'];
check(Object.keys(SQL_READING_ASSISTANTS).length === lessonKeys.length, 'one assistant contract per SQL reading');

for (const key of lessonKeys) {
  const spec = SQL_READING_ASSISTANTS[key];
  check(Boolean(spec), `${key} assistant exists`);
  if (!spec) continue;
  check(spec.hints.length >= 3, `${key} gives graduated hints`, `${spec.hints.length} hints`);
  check(spec.quiz.answers.length >= 1 && spec.quiz.success && spec.quiz.retry, `${key} quiz handles success and retry`);
  check(spec.reasoning.terms.length >= 2 && spec.reasoning.success && spec.reasoning.retry, `${key} checks a learner explanation`);
  check(spec.terminology.length >= 100, `${key} returns to precise terminology`, `${spec.terminology.length} characters`);
  check(spec.rules.length >= 2, `${key} handles typed topic questions`, `${spec.rules.length} routes`);
}

const firstCase = SQL_CONSOLE_MISSION.cases[0];
const consoleSpec = sqlConsoleAssistant(firstCase, { key: 'clause', label: 'WRITE', theory: 'Rows are filtered before grouping.' });
check(consoleSpec.key.includes(firstCase.id), 'mission assistant follows the current task');
check(consoleSpec.rules.some(rule => rule.terms.includes('answer') && /not choose/i.test(rule.response)), 'mission assistant refuses to choose an answer');
check(/without selecting an answer/i.test(consoleSpec.welcome), 'mission assistant states its coaching boundary');

check(SQL_KNOWLEDGE_COUNT >= 24, 'local index covers the complete SQL chapter', `${SQL_KNOWLEDGE_COUNT} passages`);
const retrievalCases = [
  ['boxes and partitions in a workshop', 'select'],
  ['why can bank account transactions repeat', 'select'],
  ['when should I use HAVING after grouping', 'group'],
  ['duplicate keys make a join fan out', 'join'],
  ['how do I verify whether a result is correct', 'verify']
];
for (const [query, expectedSession] of retrievalCases) {
  const results = searchSqlKnowledge(query, 3);
  check(results.length > 0, `local retrieval answers “${query}”`, `${results.length} result(s)`);
  check(results.some(result => result.sessionId === expectedSession), `retrieval grounds that question in ${expectedSession}`);
  check(results.every(result => result.href && result.excerpt), 'retrieval returns a deep link and evidence excerpt');
}

const assistantSource = fs.readFileSync(new URL('../src/lib/components/WorkshopAssistant.svelte', import.meta.url), 'utf8');
const indexSource = fs.readFileSync(new URL('../src/lib/content/sql-knowledge-index.js', import.meta.url), 'utf8');
check(!/\bfetch\s*\(|XMLHttpRequest|WebSocket|EventSource/.test(`${assistantSource}\n${indexSource}`), 'local assistant makes no network request');

if (failed) process.exit(1);
console.log('\nall checks pass, Ask Qubix remains lesson-aware, reviewable and hint-first');
