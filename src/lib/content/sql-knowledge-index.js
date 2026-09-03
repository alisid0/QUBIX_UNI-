import { SHARED_FOUNDATIONS_PART_FIVE as SQL_BOOK } from './shared-foundations-part-five.js';

// A deliberately small, transparent retrieval layer. The structured course is
// turned into searchable passages when the app bundle is built; learner queries
// never leave the browser and there is no vector database or model call.
const STOP_WORDS = new Set('a an and are as at be because by can course did do does for from had has have how i if in into is it its lesson material me my of on one or our should so sql than that the their then there these they this to was what when where which who why will with workshop you your'.split(' '));

const SPELLING = Object.freeze({
  boxes: 'box', containers: 'container', contaners: 'container', partitions: 'partition',
  // `repetative` was written here twice, which JavaScript accepts silently and
  // no review caught. The values were identical so nothing behaved wrongly, but
  // the second slot was clearly meant for another misspelling: two of the same
  // key is a correction that was intended and never made. `repetetive` is the
  // other common one, so it takes the place its duplicate was occupying.
  repetative: 'repetitive', repetetive: 'repetitive', uniquie: 'unique', databse: 'database',
  rows: 'row', columns: 'column', tables: 'table', transactions: 'transaction',
  joins: 'join', groups: 'group', grouped: 'group', grouping: 'group', filters: 'filter',
  duplicates: 'duplicate', repeated: 'repeat', repeating: 'repeat', verified: 'verify'
});

const RELATED = Object.freeze({
  box: ['cabinet', 'table', 'container'], container: ['cabinet', 'table', 'database'], cabinet: ['table', 'container'],
  partition: ['column', 'field'], drawer: ['row', 'record'], slip: ['row', 'record', 'event'],
  room: ['database', 'schema', 'server'], server: ['host', 'database', 'replicated', 'machine'], replica: ['replicated', 'server', 'database'],
  account: ['identifier', 'master', 'transaction', 'foreign', 'key'], bank: ['account', 'transaction', 'identifier'],
  unique: ['primary', 'key', 'master', 'identifier'], repeat: ['foreign', 'key', 'transaction', 'many'], repetitive: ['repeat', 'transaction', 'many'],
  duplicate: ['repeat', 'uniqueness', 'fan', 'multiplication'], key: ['primary', 'foreign', 'identifier', 'unique'],
  filter: ['where', 'having', 'condition', 'predicate'], select: ['column', 'projection'], order: ['sort', 'presentation'],
  group: ['aggregate', 'having', 'grain', 'summary'], count: ['aggregate', 'row', 'null'], average: ['aggregate', 'null'],
  join: ['primary', 'foreign', 'cardinality', 'match', 'fan'], fanout: ['multiplication', 'duplicate', 'join'],
  missing: ['null', 'unknown', 'absence', 'unmatched'], null: ['missing', 'unknown', 'absence'],
  correct: ['verify', 'check', 'reconcile'], trust: ['verify', 'check', 'evidence'], verify: ['grain', 'count', 'unique', 'reconcile', 'provenance']
});

function normaliseWord(word) {
  const clean = word.toLowerCase().replace(/[^a-z0-9*]+/g, '');
  return SPELLING[clean] || clean;
}

function tokens(text) {
  return String(text).split(/\s+/).map(normaliseWord).filter(word => word.length > 1 && !STOP_WORDS.has(word));
}

const passage = (session, id, section, text, kind = 'concept') => Object.freeze({
  id: `${session.id}-${id}`,
  kind,
  sessionId: session.id,
  session: `Session ${session.number} · ${session.title}`,
  section,
  href: `?mode=game&mission=shared-book&chapter=5&session=${Number(session.number)}`,
  text
});

const passages = [];
for (const session of SQL_BOOK.sessions) {
  passages.push(passage(session, 'objective', 'Learning objective', `${session.objective} ${session.opening}`));
  session.sections.forEach((section, index) => {
    passages.push(passage(session, `section-${index + 1}`, section.heading, section.paragraphs.join(' ')));
  });
  if (session.workshopLab) {
    const mapping = session.workshopLab.mapping.map(([workshop, sql]) => `${workshop} means ${sql}`).join('. ');
    passages.push(passage(session, 'workshop', `Interactive workshop · ${session.workshopLab.title}`, `${mapping}. ${session.workshopLab.paragraphs.join(' ')}`, 'workshop'));
    passages.push(passage(session, 'analogy-limit', 'Where the analogy stops', session.workshopLab.limit, 'boundary'));
  }
  if (session.example) {
    const rows = session.example.rows.map(row => row.join(' — ')).join('. ');
    passages.push(passage(session, 'example', `Worked example · ${session.example.title}`, rows, 'example'));
  }
}

export const SQL_KNOWLEDGE_PASSAGES = Object.freeze(passages);
export const SQL_KNOWLEDGE_COUNT = SQL_KNOWLEDGE_PASSAGES.length;

const indexed = SQL_KNOWLEDGE_PASSAGES.map(item => {
  const titleTokens = tokens(`${item.session} ${item.section}`);
  const bodyTokens = tokens(item.text);
  return { item, titleTokens, bodyTokens };
});

const documentFrequency = new Map();
for (const doc of indexed) {
  for (const term of new Set([...doc.titleTokens, ...doc.bodyTokens])) {
    documentFrequency.set(term, (documentFrequency.get(term) || 0) + 1);
  }
}

function queryTerms(query) {
  const direct = tokens(query);
  const weighted = new Map(direct.map(term => [term, 3]));
  for (const term of direct) {
    for (const related of RELATED[term] || []) weighted.set(related, Math.max(weighted.get(related) || 0, 1));
  }
  return weighted;
}

function excerpt(text, query) {
  const sentences = text.match(/[^.!?]+[.!?]+|[^.!?]+$/g) || [text];
  const wanted = queryTerms(query);
  const ranked = sentences.map((sentence, index) => ({
    sentence: sentence.trim(), index,
    hits: tokens(sentence).reduce((total, term) => total + (wanted.get(term) || 0), 0)
  }));
  ranked.sort((a, b) => b.hits - a.hits || a.index - b.index);
  const selected = ranked.filter(item => item.hits > 0).slice(0, 2);
  selected.sort((a, b) => a.index - b.index);
  const chosen = selected.length ? selected.map(item => item.sentence).join(' ') : (ranked[0]?.sentence || text);
  return chosen.length > 270 ? `${chosen.slice(0, 267).trim()}…` : chosen;
}

export function searchSqlKnowledge(query, limit = 3) {
  const terms = queryTerms(query);
  if (!terms.size) return [];
  const phrase = String(query).trim().toLowerCase();

  return indexed.map(doc => {
    const titleCounts = new Map();
    const bodyCounts = new Map();
    doc.titleTokens.forEach(term => titleCounts.set(term, (titleCounts.get(term) || 0) + 1));
    doc.bodyTokens.forEach(term => bodyCounts.set(term, (bodyCounts.get(term) || 0) + 1));
    let score = 0;
    for (const [term, queryWeight] of terms) {
      const frequency = (titleCounts.get(term) || 0) * 3 + (bodyCounts.get(term) || 0);
      if (!frequency) continue;
      const idf = Math.log((SQL_KNOWLEDGE_COUNT + 1) / ((documentFrequency.get(term) || 0) + 1)) + 1;
      score += queryWeight * (1 + Math.log(frequency)) * idf;
    }
    if (phrase.length > 5 && `${doc.item.section} ${doc.item.text}`.toLowerCase().includes(phrase)) score += 12;
    return { ...doc.item, score, excerpt: excerpt(doc.item.text, query) };
  }).filter(result => result.score >= 2.2)
    .sort((a, b) => b.score - a.score || a.id.localeCompare(b.id))
    .slice(0, limit)
    .map(({ score, ...result }) => Object.freeze(result));
}
