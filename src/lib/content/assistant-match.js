// How Ask Qubix decides whether a learner said the thing.
//
// This used to be `lower.includes(term)` inline in the component, which is fine
// until you notice what it accepts. The SQL quiz asks which clause reduces rows
// without changing what a row represents, and accepts "where". So:
//
//   "where do I even start?"        passed the quiz
//   "I don't know where to look"    passed the quiz
//   "it's not a join"               routed to the join explanation
//
// A learner who is lost is told they are right. That is worse than no assistant,
// because it is confidently wrong at exactly the moment somebody is stuck, and
// every surface the assistant is added to multiplies it.
//
// Three rules fix nearly all of it without pretending to understand language:
//
//   1. Match on word boundaries, so "join" does not fire on "conjoined".
//   2. Ignore a term that is negated, so "not a join" is not a join.
//   3. A question is not an answer. "where do I start?" is a request for help.
//
// Deliberately small and readable. There is no model here and there should not
// be one: the deterministic fallback must remain independently testable even
// when the optional server-side grounded tutor is enabled.

const NEGATORS = new Set([
  'not', 'no', 'never', 'without', 'isnt', 'arent', 'wasnt', 'werent',
  'dont', 'doesnt', 'didnt', 'cant', 'cannot', 'couldnt', 'wouldnt', 'shouldnt'
]);

/** Lower-case, straighten curly apostrophes, and drop them so "don't" is "dont". */
const norm = value => String(value ?? '')
  .toLowerCase()
  .replace(/[‘’]/g, "'")
  .replace(/'/g, '');

const escape = value => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

/**
 * Does the text use this term, as a word, and mean it?
 *
 * Word boundaries are written out rather than using \b because a term can end
 * in punctuation ("group by", "count(*)") where \b does the wrong thing.
 */
export function mentions(text, term) {
  const haystack = norm(text);
  const needle = norm(term).trim();
  if (!haystack || !needle) return false;

  const pattern = new RegExp(`(?:^|[^a-z0-9])${escape(needle)}(?![a-z0-9])`, 'g');
  let match;
  while ((match = pattern.exec(haystack)) !== null) {
    // The three words in front decide whether it was negated.
    const before = haystack.slice(0, match.index).split(/[^a-z0-9]+/).filter(Boolean);
    if (!before.slice(-3).some(word => NEGATORS.has(word))) return true;
  }
  return false;
}

/**
 * Is this a question rather than an answer?
 *
 * A trailing question mark settles it. Failing that, an auxiliary followed by a
 * pronoun ("do I", "should we") is the shape of somebody asking for help, which
 * matters because several correct answers are themselves question words: "where"
 * is the answer to the filtering question and the first word of "where do I
 * start". A bare "where" stays an answer; "where do I start" does not.
 */
export function isQuestion(text) {
  const value = norm(text).trim();
  if (!value) return false;
  if (value.endsWith('?')) return true;
  return /(?:^|[^a-z])(?:do|does|should|can|could|would|shall|will)\s+(?:i|we|you)(?![a-z])/.test(value);
}

/** A quiz is answered when a expected term is asserted, not asked about. */
export function answersQuiz(text, answers = []) {
  if (isQuestion(text)) return false;
  return answers.some(term => mentions(text, term));
}

/** An explanation counts when every required term is present and meant. */
export function explains(text, terms = []) {
  if (!terms.length) return false;
  if (isQuestion(text)) return false;
  return terms.every(term => mentions(text, term));
}

/** The first rule whose terms the learner actually used. */
export function routeFor(text, rules = []) {
  return rules.find(rule => (rule.terms || []).some(term => mentions(text, term))) || null;
}
