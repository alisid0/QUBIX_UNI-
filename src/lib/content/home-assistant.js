// Ask Qubix on the front door.
//
// The assistant inside a lesson is a coach: it hints, it quizzes, it checks your
// reasoning. None of that is what somebody wants on the home page. They have not
// started anything yet, so they cannot be stuck; they want to know what this is,
// where to begin, how long it takes, and whether it is worth their evening.
//
// So this is a different contract with the same component: no hints, no quiz, no
// reasoning check. Wayfinding, and then honest retrieval into the course for
// anything else.
//
// Every number below is derived from the course rather than typed, because a
// front page that overstates what exists is the one place it matters most. If a
// chapter is added, the assistant says so without anybody remembering to edit it.

import { SHARED_FOUNDATIONS } from './shared-foundations.js';
import { FOUNDATIONS_KNOWLEDGE_COUNT, searchFoundationsKnowledge } from './foundations-assistant.js';
import { MISSIONS } from '../game/progress.js';

const chapters = SHARED_FOUNDATIONS.length;
const sessions = SHARED_FOUNDATIONS.reduce((n, part) => n + part.book.sessions.length, 0);
const minutes = SHARED_FOUNDATIONS.reduce((n, part) => n + part.book.totalMinutes, 0);
const missions = MISSIONS.length;

const hours = Math.floor(minutes / 60);
const spare = minutes % 60;
const readingTime = `${hours} h ${String(spare).padStart(2, '0')} min`;

const first = SHARED_FOUNDATIONS[0].book;
const firstSession = first.sessions[0];

const chapterList = SHARED_FOUNDATIONS
  .map(part => `${part.chapter}. ${part.book.title}`)
  .join('\n');

/**
 * The status line.
 *
 * Volume 0 is an AI draft under founder review and nothing in it is approved.
 * Saying so on the front page costs a little enthusiasm and buys the only thing
 * that matters here, which is that the first thing the site tells somebody is
 * true. It is also the standing rule: a draft is never dressed as a release.
 */
const STATUS = 'Volume 0 is written and playable, and it is an AI draft under review. '
  + 'Nothing in it is approved curriculum yet, so treat it as a course you can '
  + 'take rather than a certificate you can hold.';

export const HOME_ASSISTANT = Object.freeze({
  key: 'home',
  eyebrow: 'QUBIX UNIVERSITY',
  title: 'Ask Qubix',

  welcome: `Qubix teaches data science by running a supermarket. You read a short `
    + `session, then play a mission that makes you use it on the shop's own data.\n\n`
    + `Volume 0 is ${chapters} chapters, ${sessions} sessions and ${missions} missions, `
    + `about ${readingTime} of reading plus the play. Ask me where to start, or what `
    + `any of it covers.`,

  explain: `Most data courses teach you to answer a question. Qubix spends as much `
    + `time on which question is answerable.\n\nYou work at Qubix Superstore: `
    + `48 branches, 2,140 products, a quarter of trading. The data has real faults in `
    + `it on purpose, so "the stock count is blank" and "the stock count is zero" are `
    + `different things you have to tell apart, and a total that looks fine can be `
    + `wrong for a reason you can find.`,

  terminology: `A Volume is a whole course; Volume 0 is the shared foundations `
    + `everybody starts with. A Chapter groups sessions on one idea. A Session is one `
    + `sitting: a short reading with a worked example. A Mission is the playable half, `
    + `where you do the thing rather than read about it. Ask Qubix is this window, and `
    + `it only ever quotes Qubix material back at you.`,

  labels: { explain: 'What is Qubix?', terms: 'What the words mean' },

  rules: [
    {
      terms: ['start', 'begin', 'first', 'where do i', 'new here', 'beginner'],
      response: `Start at Chapter 1, "${first.title}", and its first session, `
        + `"${firstSession.title}". It assumes nothing: no SQL, no Python, no statistics. `
        + `Each session is a short read and then a mission that uses it.`
    },
    {
      terms: ['how long', 'time', 'hours', 'duration', 'how many hours'],
      response: `About ${readingTime} of reading across ${sessions} sessions, plus the `
        + `${missions} missions, which take longer than reading because you are doing `
        + `the work rather than following it. Sessions are built to be one sitting each.`
    },
    {
      terms: ['what will i learn', 'cover', 'syllabus', 'curriculum', 'chapters', 'contents', 'topics'],
      response: `Volume 0 is ${chapters} chapters:\n\n${chapterList}\n\nIt ends with you `
        + `able to take a question, get the data, check whether the answer is trustworthy, `
        + `and explain it to somebody who will not read your code.`
    },
    {
      terms: ['prerequisite', 'need to know', 'maths', 'math', 'experience', 'qualification', 'hard'],
      response: `Nothing. Chapter 1 starts at what a row in a table is. The maths stays at `
        + `arithmetic and proportion, and both SQL and Python are taught from the beginning `
        + `in their own chapters. If you can read a receipt you can start.`
    },
    {
      terms: ['mission', 'game', 'play', 'interactive'],
      response: `A mission is the half where you do it. There are ${missions}: a checkout, `
        + `a rate desk, a distribution desk, a SQL console, a sampling desk and more. They `
        + `are scored, they unlock in order, and they use the same supermarket the reading `
        + `describes, so the numbers are the ones you have already met.`
    },
    {
      terms: ['sql', 'query', 'database'],
      response: `Chapter 5 is SQL, from "what is a table" to joins that change what a row `
        + `means. There is also a data console where your SQL runs for real against 54 `
        + `tables of the Superstore's own quarter, rather than against a worked example.`
    },
    {
      terms: ['python', 'code', 'programming'],
      response: `Chapter 6 is Python: values and types, decisions and repetition, writing a `
        + `function, and holding a table in code. It is taught for data work rather than as `
        + `software engineering.`
    },
    {
      terms: ['free', 'cost', 'price', 'pay', 'subscription'],
      response: `Nothing to pay and no account needed to read. ${STATUS}`
    },
    {
      terms: ['finished', 'ready', 'complete', 'approved', 'beta', 'draft', 'released'],
      response: STATUS + ' Volumes 1 to 4 are planned and not written.'
    },
    {
      terms: ['who', 'made', 'built', 'behind', 'company', 'arcave'],
      response: `Qubix is built by Arcave Technologies. The Superstore, its branches, its `
        + `suppliers and its data are all invented, which is what lets the data have exactly `
        + `the faults a lesson needs.`
    },
    {
      terms: ['ai', 'chatgpt', 'model', 'llm', 'language model'],
      response: `This window is not a language model and does not call one. It matches what `
        + `you type against Qubix's own material and shows you the passage it came from, `
        + `which is why it will say it does not know rather than invent an answer. Nothing `
        + `you type leaves your browser.`
    }
  ],

  fallback: {
    text: `I could not find that in the Qubix material, so I would rather say so than `
      + `guess. Try asking where to start, how long it takes, what it covers, or a `
      + `question about something in the course.`
  },

  search: searchFoundationsKnowledge,
  knowledgeCount: FOUNDATIONS_KNOWLEDGE_COUNT,
  indexName: 'Qubix Volume 0',

  // Numbers exposed so a guard can check the page and the assistant agree.
  facts: Object.freeze({ chapters, sessions, minutes, missions, readingTime })
});
