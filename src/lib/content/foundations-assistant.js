import { SHARED_FOUNDATIONS } from './shared-foundations.js';
import { SQL_READING_ASSISTANTS } from './sql-assistant.js';

// A transparent, browser-only index for the complete foundations reader. It
// gives every reading session a useful local assistant and supplies grounded
// passages to the optional server-side generative tutor.
const STOP_WORDS = new Set('a an and are as at be because by can did do does for from has have how i if in into is it its me my of on one or our should so than that the their then there these they this to was what when where which who why will with you your'.split(' '));

function tokens(text) {
  return String(text).toLowerCase().replace(/[^a-z0-9\s]+/g, ' ').split(/\s+/)
    .filter(word => word.length > 1 && !STOP_WORDS.has(word));
}

function shorten(text, limit = 270) {
  const value = String(text || '').trim();
  return value.length > limit ? `${value.slice(0, limit - 1).trim()}…` : value;
}

const passages = [];
for (const { chapter, book } of SHARED_FOUNDATIONS) {
  for (const [sessionIndex, session] of book.sessions.entries()) {
    const href = `?mode=game&mission=shared-book&chapter=${chapter}&session=${sessionIndex + 1}`;
    const base = { chapter, sessionId: session.id, session: `Chapter ${chapter} · Session ${session.number} · ${session.title}`, href };
    passages.push({ ...base, id: `${chapter}-${session.id}-objective`, kind: 'concept', section: 'Learning objective', text: `${session.objective}. ${session.opening}` });
    for (const [index, section] of (session.sections || []).entries()) {
      passages.push({ ...base, id: `${chapter}-${session.id}-section-${index}`, kind: 'concept', section: section.heading, text: section.paragraphs.join(' ') });
    }
    if (session.example) {
      passages.push({ ...base, id: `${chapter}-${session.id}-example`, kind: 'example', section: `Worked example · ${session.example.title}`, text: session.example.rows.map(row => row.join(' — ')).join('. ') });
    }
    if (session.workshopLab) {
      passages.push({ ...base, id: `${chapter}-${session.id}-workshop`, kind: 'workshop', section: session.workshopLab.title, text: `${session.workshopLab.mapping?.map(pair => pair.join(' means ')).join('. ') || ''}. ${(session.workshopLab.paragraphs || []).join(' ')}` });
    }
  }
}

const INDEX = passages.map(item => ({ item: Object.freeze(item), terms: tokens(`${item.session} ${item.section} ${item.text}`) }));
export const FOUNDATIONS_KNOWLEDGE_COUNT = INDEX.length;

export function searchFoundationsKnowledge(query, limit = 3) {
  const wanted = [...new Set(tokens(query))];
  if (!wanted.length) return [];
  return INDEX.map(({ item, terms }) => {
    const title = tokens(`${item.session} ${item.section}`);
    const score = wanted.reduce((sum, word) => sum + terms.filter(term => term === word).length + title.filter(term => term === word).length * 2, 0);
    return { ...item, score, excerpt: shorten(item.text) };
  }).filter(result => result.score > 0)
    .sort((a, b) => b.score - a.score || a.id.localeCompare(b.id))
    .slice(0, limit)
    .map(({ score, ...result }) => Object.freeze(result));
}

function importantTerms(session) {
  const words = tokens(`${session.objective} ${(session.sections || []).map(section => section.heading).join(' ')}`);
  return [...new Set(words)].slice(0, 2);
}

export function readingAssistantFor(chapter, session) {
  if (chapter === 5 && SQL_READING_ASSISTANTS[session.id]) return SQL_READING_ASSISTANTS[session.id];

  const firstSection = session.sections?.[0];
  const hints = (session.sections || []).slice(0, 3).map(section => `Return to “${section.heading}”. State its main claim in one sentence, then connect it to the evidence or example in this lesson.`);
  const check = session.check;
  const terms = importantTerms(session);

  return Object.freeze({
    key: `foundations-${chapter}-${session.id}`,
    eyebrow: `CHAPTER ${String(chapter).padStart(2, '0')} READING ASSISTANT`,
    title: session.title,
    indexName: 'Qubix Foundations',
    search: searchFoundationsKnowledge,
    knowledgeCount: FOUNDATIONS_KNOWLEDGE_COUNT,
    welcome: `I am reading “${session.title}” with you. Ask about this lesson, request a hint, or explain your reasoning and I will keep the answer grounded in Qubix Foundations.`,
    explain: `${session.opening} ${firstSection ? `${firstSection.heading}: ${firstSection.paragraphs[0]}` : session.objective}`,
    hints: Object.freeze(hints.length ? hints : [`Use the learning objective as your test: ${session.objective}`]),
    quiz: Object.freeze({
      question: check?.question || `What is the central claim of “${session.title}”?`,
      answers: Object.freeze(check?.options?.filter(option => option[0] === check.answer).flatMap(option => tokens(option[1]).slice(0, 3)) || terms),
      success: check?.explanation || 'Yes. That answer is consistent with the lesson’s learning objective.',
      retry: 'Not yet. Re-read the learning objective and separate what the evidence shows from what it does not establish.'
    }),
    reasoning: Object.freeze({
      prompt: `Explain the main idea of “${session.title}” in your own words and give one example.`,
      terms: Object.freeze(terms.length ? terms : ['data']),
      success: 'Good. You used the lesson’s central terms and connected them to an explanation.',
      retry: `Make the connection explicit. Try using ${terms.map(term => `“${term}”`).join(' and ')} in your explanation.`
    }),
    terminology: `The precise learning objective is: ${session.objective} ${firstSection ? `The first concept is “${firstSection.heading}”.` : ''}`,
    rules: Object.freeze([
      Object.freeze({ terms: ['objective', 'learn', 'goal'], response: `This session’s objective is: ${session.objective}` }),
      Object.freeze({ terms: ['example', 'analogy'], response: session.workshopLab?.paragraphs?.[0] || session.example ? `Use the worked example “${session.example?.title || session.workshopLab.title}” and check exactly where it matches the formal concept.` : `Start with a concrete case, then test it against the lesson objective: ${session.objective}` })
    ]),
    fallback: `Ask me about “${session.title}”, its learning objective, an example, or search for a related idea elsewhere in Qubix Foundations.`
  });
}
