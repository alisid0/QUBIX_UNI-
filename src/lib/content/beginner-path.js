// The order a complete beginner walks the book in.
//
// The book is stored in eight chapters and, until this existed, was walked in
// chapter order with next and previous confined inside a chapter. Somebody
// finishing the last session of chapter 1 was handed no next button at all and
// had to find their own way back to the contents. That is not a flow.
//
// This is the sequence the founder settled: six parts, easy things first, and
// the tools late because a query that returns rows looks like success before a
// beginner can tell a good result from a bad one.
//
// It deliberately crosses chapters. Units live in chapter 2 and data types in
// chapter 3, but both belong in part one, so the path picks them up there. The
// chapters remain exactly as they are; only the walking order changes.

/** Each entry is a real session, named by the chapter and session it lives in. */
export const BEGINNER_PATH = Object.freeze([
  Object.freeze({
    part: 1,
    title: 'What data is',
    promise: 'Look at a table and say what it is describing.',
    sessions: Object.freeze([
      Object.freeze({ chapter: 1, session: 1 }),   // a sale is not its record
      Object.freeze({ chapter: 1, session: 2 }),   // rows, columns and types
      Object.freeze({ chapter: 1, session: 3 }),   // grain
      Object.freeze({ chapter: 1, session: 4 }),   // zero, blank or missing
      Object.freeze({ chapter: 3, session: 1 }),   // a blank cell does not mean zero
      Object.freeze({ chapter: 2, session: 1 }),   // every number needs a unit
      Object.freeze({ chapter: 3, session: 2 }),   // a postcode and a price both contain numbers
      Object.freeze({ chapter: 1, session: 5 })    // what decision are we helping with
    ])
  }),
  Object.freeze({
    part: 2,
    title: 'Describing what you have',
    promise: 'Summarise a set of numbers without lying about it.',
    sessions: Object.freeze([
      Object.freeze({ chapter: 4, session: 1 }),   // raw values to a distribution
      Object.freeze({ chapter: 4, session: 2 }),   // look at the shape first
      Object.freeze({ chapter: 4, session: 3 }),   // centre is a choice
      Object.freeze({ chapter: 4, session: 4 }),   // measuring spread
      Object.freeze({ chapter: 7, session: 2 })    // a chart that does not flatter
    ])
  }),
  Object.freeze({
    part: 3,
    title: 'A little Python',
    promise: 'Write the steps down so they run again.',
    sessions: Object.freeze([
      Object.freeze({ chapter: 6, session: 1 }),
      Object.freeze({ chapter: 6, session: 2 }),
      Object.freeze({ chapter: 6, session: 3 }),
      Object.freeze({ chapter: 6, session: 4 })
    ])
  }),
  Object.freeze({
    part: 4,
    title: 'SQL, and the shaping that belongs with it',
    promise: 'Ask a table a question and know what the answer counts.',
    sessions: Object.freeze([
      Object.freeze({ chapter: 5, session: 1 }),   // asking a table a question
      Object.freeze({ chapter: 5, session: 2 }),   // grouping changes the grain
      Object.freeze({ chapter: 5, session: 3 }),   // joining without changing what a row is
      Object.freeze({ chapter: 3, session: 3 }),   // one sale or one product
      Object.freeze({ chapter: 5, session: 4 })    // checking a result before believing it
    ])
  }),
  Object.freeze({
    part: 5,
    title: 'Working properly',
    promise: 'Hand your work to somebody else and have it survive.',
    sessions: Object.freeze([
      Object.freeze({ chapter: 3, session: 4 }),   // where did this number come from
      Object.freeze({ chapter: 7, session: 4 })    // work somebody else can run
    ])
  })
]);

/**
 * Sessions that exist and are not on the beginner path, each with the reason.
 *
 * This list is the point of the file. Without it a session can fall off the
 * path silently, and nobody notices until a learner never meets an idea the
 * course claims to teach. check-beginner-path asserts that every session in
 * the book appears either on the path or here.
 */
export const NOT_ON_PATH = Object.freeze([
  Object.freeze({ chapter: 2, session: 2, why: 'Ratios and rates. Awaiting a founder ruling.' }),
  Object.freeze({ chapter: 2, session: 3, why: 'Kinds of change. Awaiting a founder ruling.' }),
  Object.freeze({ chapter: 2, session: 4, why: 'Table to rule to graph. Awaiting a founder ruling.' }),
  Object.freeze({ chapter: 4, session: 5, why: 'Who is in the data. Belongs with sampling, which is deferred.' }),
  Object.freeze({ chapter: 4, session: 6, why: 'The language of chance. Probability is deferred.' }),
  Object.freeze({ chapter: 7, session: 1, why: 'A table someone can read. Awaiting a founder ruling.' }),
  Object.freeze({ chapter: 7, session: 3, why: 'Finding against interpretation. Awaiting a founder ruling.' }),
  Object.freeze({ chapter: 8, session: 1, why: 'Probability is deferred.' }),
  Object.freeze({ chapter: 8, session: 2, why: 'Conditional probability is deferred.' }),
  Object.freeze({ chapter: 8, session: 3, why: 'Sampling is deferred.' }),
  Object.freeze({ chapter: 8, session: 4, why: 'Hypothesis testing is deferred.' })
]);

/** The path as one flat ordered list, which is what walking it needs. */
export function pathSteps() {
  const steps = [];
  for (const part of BEGINNER_PATH) {
    for (const [index, at] of part.sessions.entries()) {
      steps.push({
        chapter: at.chapter,
        session: at.session,
        part: part.part,
        partTitle: part.title,
        firstOfPart: index === 0,
        step: steps.length + 1
      });
    }
  }
  return steps;
}

export const PATH_LENGTH = pathSteps().length;

/** Where a given session sits on the path, or null if it is not on it. */
export function stepFor(chapter, session) {
  return pathSteps().find(s => s.chapter === chapter && s.session === session) || null;
}

/** The step after this one, or null at the end of the path. */
export function nextStep(chapter, session) {
  const steps = pathSteps();
  const at = steps.findIndex(s => s.chapter === chapter && s.session === session);
  return at >= 0 && at < steps.length - 1 ? steps[at + 1] : null;
}

/** The step before this one, or null at the start. */
export function previousStep(chapter, session) {
  const steps = pathSteps();
  const at = steps.findIndex(s => s.chapter === chapter && s.session === session);
  return at > 0 ? steps[at - 1] : null;
}
