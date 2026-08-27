import { SQL_READING_ASSISTANTS, sqlConsoleAssistant } from '../src/lib/content/sql-assistant.js';
import { SQL_CONSOLE_MISSION } from '../src/lib/game/sql-console-mission.js';
import { SQL_KNOWLEDGE_COUNT, searchSqlKnowledge } from '../src/lib/content/sql-knowledge-index.js';
import { SHARED_FOUNDATIONS } from '../src/lib/content/shared-foundations.js';
import { FOUNDATIONS_KNOWLEDGE_COUNT, readingAssistantFor, searchFoundationsKnowledge } from '../src/lib/content/foundations-assistant.js';
import { answersQuiz, explains, mentions } from '../src/lib/content/assistant-match.js';
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

const readingSessions = SHARED_FOUNDATIONS.flatMap(({ chapter, book }) => book.sessions.map(session => ({ chapter, session })));
check(readingSessions.length === 31, 'course assistant covers every foundations reading', `${readingSessions.length} sessions`);
for (const { chapter, session } of readingSessions) {
  const spec = readingAssistantFor(chapter, session);
  check(Boolean(spec?.key && spec?.welcome && spec?.fallback), `ch${String(chapter).padStart(2, '0')}.${session.number} has an assistant contract`);
}
check(FOUNDATIONS_KNOWLEDGE_COUNT >= 150, 'course-wide local index covers all seven chapters', `${FOUNDATIONS_KNOWLEDGE_COUNT} passages`);
const courseResults = searchFoundationsKnowledge('difference between mean median and outliers', 5);
check(courseResults.some(result => result.chapter === 4), 'course retrieval finds the statistics chapter');

/* ── a lost learner must not be told they are right ──────────────────────────
   Matching used to be `lower.includes(term)`. The select quiz accepts "where",
   so "where do I even start?" marked itself correct. These cases are the ones
   that were wrong, plus the plain answers that must keep working, because a
   stricter matcher that rejects "where" would be a worse bug than the one it
   replaced.                                                                   */
const selectQuiz = SQL_READING_ASSISTANTS.select.quiz.answers;

const mustReject = [
  'where do I even start?',
  'where do I start',
  "I don't know where to look",
  'no idea, is it where?',
  'what does where do?',
  'should I use where or having?'
];
for (const attempt of mustReject)
  check(!answersQuiz(attempt, selectQuiz), `a lost learner is not marked correct: “${attempt}”`);

const mustAccept = ['where', 'the WHERE clause', 'you filter with where', 'a filter'];
for (const attempt of mustAccept)
  check(answersQuiz(attempt, selectQuiz), `a real answer still counts: “${attempt}”`);

check(!mentions('it is not a join', 'join'), 'a negated term does not route to its explanation');
check(!mentions('conjoined rows', 'join'), 'a term inside a longer word does not match');
check(mentions('the join fans out', 'join'), 'a plain mention still matches');
check(!explains('what is the grain here?', ['grain']), 'asking about a term is not explaining it');
check(explains('the grain is one sale line', ['grain', 'sale']), 'a real explanation is accepted');

const assistantSource = fs.readFileSync(new URL('../src/lib/components/WorkshopAssistant.svelte', import.meta.url), 'utf8');
check(!/lower\.includes\(/.test(assistantSource),
  'the component matches through assistant-match, not bare substring');
const indexSource = `${fs.readFileSync(new URL('../src/lib/content/sql-knowledge-index.js', import.meta.url), 'utf8')}\n${fs.readFileSync(new URL('../src/lib/content/foundations-assistant.js', import.meta.url), 'utf8')}`;
check(!/\bfetch\s*\(|XMLHttpRequest|WebSocket|EventSource/.test(`${assistantSource}\n${indexSource}`), 'local assistant makes no network request');

if (failed) process.exit(1);
console.log('\nall checks pass, Ask Qubix remains lesson-aware, reviewable and hint-first');
