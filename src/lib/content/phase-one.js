// Phase One, as data.
//
// curriculum/11-PHASE-ONE-CURRICULUM.md is the argument. This is the sequence
// in a form the build can check: twenty-six sessions, six modules, each session
// carrying one claim and either pointing at a session that already exists or
// declaring that it does not.
//
// It is deliberately separate from beginner-path.js. That file is the order a
// learner walks *today*, through the 35 sessions that exist. This is what the
// course is being rebuilt into. Keeping them apart means the build queue is
// visible: every entry below is either a rewrite of something live or a blank
// page, and check-phase-one will not let a third state appear.

/**
 * Recognition to judgement, per module. Constant recognition produces fluency
 * without reasoning, so the ratio tapers as the learner gets stronger.
 */
export const RATIO_BY_MODULE = Object.freeze({ 1: '3:1', 2: '3:1', 3: '2:1', 4: '2:1', 5: '1:1', 6: '1:1' });

export const MODULES = Object.freeze([
  Object.freeze({ n: 1, title: 'What one row is', question: 'What is this data actually about?' }),
  Object.freeze({ n: 2, title: 'What a value is', question: 'What does this number mean, and what may I do with it?' }),
  Object.freeze({ n: 3, title: 'What a summary hides', question: 'What did I lose when I summarised?' }),
  Object.freeze({ n: 4, title: 'Asking the data yourself', question: 'How do I get the answer, and what did I actually ask?' }),
  Object.freeze({ n: 5, title: 'Is this real?', question: 'Should I believe this?' }),
  Object.freeze({ n: 6, title: 'Saying it', question: 'What can I honestly claim?' })
]);

/**
 * `from` names the live session this is a rewrite of, as { chapter, session }.
 * `null` means nothing exists and the session must be written from nothing.
 */
export const PHASE_ONE = Object.freeze([
  /* ── 1 · What one row is ──────────────────────────────────────────────── */
  Object.freeze({
    id: '1.1', module: 1, title: 'Twelve rows, seven sales',
    claim: 'A row is not automatically a sale.',
    from: Object.freeze({ chapter: 1, session: 3 }),
    note: 'Asks for both counts rather than manufacturing a wrong answer.'
  }),
  Object.freeze({
    id: '1.2', module: 1, title: 'Four tables, four meanings',
    claim: 'Every table decides what one row means, and it decides it once.',
    from: Object.freeze({ chapter: 3, session: 3 })
  }),
  Object.freeze({
    id: '1.3', module: 1, title: 'The same thing, recorded twice',
    claim: 'Counting one thing twice inflates everything built on the count.',
    from: null
  }),
  Object.freeze({
    id: '1.4', module: 1, title: 'What the till kept',
    claim: 'A row records what happened, not why.',
    from: Object.freeze({ chapter: 1, session: 1 }),
    note: 'Already humanized to three of four sections.'
  }),

  /* ── 2 · What a value is ──────────────────────────────────────────────── */
  Object.freeze({
    id: '2.1', module: 2, title: 'Digits that are not numbers',
    claim: 'A barcode has digits in it and averaging two of them means nothing.',
    from: Object.freeze({ chapter: 3, session: 2 })
  }),
  Object.freeze({
    id: '2.2', module: 2, title: 'Ordered, but not by an amount',
    claim: 'Good is better than Fair, but not by a measurable distance.',
    from: null,
    note: 'Currently a paragraph inside ch01.02. Needs its own session.'
  }),
  Object.freeze({
    id: '2.3', module: 2, title: 'Four what?',
    claim: 'A number without its unit is not yet a fact.',
    from: Object.freeze({ chapter: 2, session: 1 })
  }),
  Object.freeze({
    id: '2.4', module: 2, title: 'Blank is not zero',
    claim: 'A missing value and a zero produce different averages, and only one is true.',
    from: Object.freeze({ chapter: 1, session: 4 }),
    note: 'ch03.01 covers the same ground and merges into this.'
  }),

  /* ── 3 · What a summary hides ─────────────────────────────────────────── */
  Object.freeze({
    id: '3.1', module: 3, title: 'Look at the shape first',
    claim: 'Two very different sets of numbers can have the same average.',
    from: Object.freeze({ chapter: 4, session: 2 }),
    note: 'ch04.01 on distributions merges into this.'
  }),
  Object.freeze({
    id: '3.2', module: 3, title: 'Centre is a choice',
    claim: 'One large basket moves the mean and leaves the median where it was.',
    from: Object.freeze({ chapter: 4, session: 3 }),
    note: 'Carries the approved outlier-pull figure.'
  }),
  Object.freeze({
    id: '3.3', module: 3, title: 'How far apart are they?',
    claim: 'Two branches with the same average can be nothing alike.',
    from: Object.freeze({ chapter: 4, session: 4 })
  }),
  Object.freeze({
    id: '3.4', module: 3, title: 'The strangest row',
    claim: 'The strangest row is either a mistake or the most important thing in the table.',
    from: null,
    note: 'Currently folded into ch04.03. Deserves a session.'
  }),
  Object.freeze({
    id: '3.5', module: 3, title: 'The total that improved while everything got worse',
    claim: 'A total can go up while every group inside it goes down.',
    from: null,
    note: 'Simpson, concretely. Restored to the beginner volume on review.'
  }),

  /* ── 4 · Asking the data yourself ─────────────────────────────────────── */
  Object.freeze({
    id: '4.1', module: 4, title: 'A question, written down',
    claim: 'The answer to a query is a table too, and it has its own grain.',
    from: Object.freeze({ chapter: 5, session: 1 }),
    note: 'Prewritten queries only. Nobody writes SQL until 4.2.'
  }),
  Object.freeze({
    id: '4.2', module: 4, title: 'Choosing rows',
    claim: 'Filtering changes who is in the answer, not what the answer means.',
    from: null,
    note: 'Currently a clause inside ch05.01.'
  }),
  Object.freeze({
    id: '4.3', module: 4, title: 'Grouping moves the grain',
    claim: 'After grouping, one row is one group, and the count counts groups.',
    from: Object.freeze({ chapter: 5, session: 2 }),
    note: 'Carries the approved grain-collapse figure.'
  }),
  Object.freeze({
    id: '4.4', module: 4, title: 'The join that doubled the money',
    claim: 'A join can change what one row means, and then every sum is wrong.',
    from: Object.freeze({ chapter: 5, session: 3 }),
    note: 'Carries the approved join-fanout figure.'
  }),
  Object.freeze({
    id: '4.5', module: 4, title: 'Three checks before you believe it',
    claim: 'Every result needs checking before it leaves your screen.',
    from: Object.freeze({ chapter: 5, session: 4 })
  }),

  /* ── 5 · Is this real? ────────────────────────────────────────────────── */
  Object.freeze({
    id: '5.1', module: 5, title: 'Two things moving together',
    claim: 'Two things moving together may share a cause, run the other way, or be coincidence.',
    from: null
  }),
  Object.freeze({
    id: '5.2', module: 5, title: 'The third thing',
    claim: 'Busy stores get more staff, so more staff does not prove more sales.',
    from: null,
    note: 'Confounding without machinery. Reverses an earlier ruling.'
  }),
  Object.freeze({
    id: '5.3', module: 5, title: 'Different, or different this week?',
    claim: 'A gap this small could easily be an ordinary week.',
    from: null,
    note: 'Noise against signal, without the machinery of testing.'
  }),
  Object.freeze({
    id: '5.4', module: 5, title: 'What would have to be true',
    claim: 'If I cannot test it, I can still say what would have to be true for it to hold.',
    from: null
  }),

  /* ── 6 · Saying it ────────────────────────────────────────────────────── */
  Object.freeze({
    id: '6.1', module: 6, title: 'The machine’s answer',
    claim: 'A confident answer is a claim, and a claim can be checked.',
    from: null,
    note: 'The session that exists because of when this is being taught.'
  }),
  Object.freeze({
    id: '6.2', module: 6, title: 'Finding, meaning, recommendation',
    claim: 'What I found, what I think it means, and what I suggest are three different claims.',
    from: Object.freeze({ chapter: 7, session: 3 })
  }),
  Object.freeze({
    id: '6.3', module: 6, title: 'The axis decides what they see',
    claim: 'A chart makes its argument before anybody reads the numbers.',
    from: Object.freeze({ chapter: 7, session: 2 })
  }),
  Object.freeze({
    id: '6.4', module: 6, title: 'Work somebody else can run',
    claim: 'If they cannot get my number without me, it is not yet a result.',
    from: Object.freeze({ chapter: 7, session: 4 })
  })
]);

/**
 * Live sessions that Phase One does not carry forward, with the reason.
 *
 * Without this the rebuild would quietly drop work that took weeks. Every one
 * of the 35 live sessions is either the source of a Phase One session or is
 * named here.
 */
export const LEAVES_PHASE_ONE = Object.freeze([
  Object.freeze({ chapter: 1, session: 2, why: 'Rows and columns, and types. Splits between 1.2 and 2.2 rather than surviving whole.' }),
  Object.freeze({ chapter: 1, session: 5, why: 'Framing the question. Embedded into missions rather than taught as a session.' }),
  Object.freeze({ chapter: 2, session: 2, why: 'Ratios and rates. Awaiting a founder ruling.' }),
  Object.freeze({ chapter: 2, session: 3, why: 'Kinds of change. Awaiting a founder ruling.' }),
  Object.freeze({ chapter: 2, session: 4, why: 'Table to rule to graph. Awaiting a founder ruling.' }),
  Object.freeze({ chapter: 3, session: 1, why: 'A blank cell is not zero. Merges into 2.4.' }),
  Object.freeze({ chapter: 3, session: 4, why: 'Where did this number come from. Lineage, deferred.' }),
  Object.freeze({ chapter: 4, session: 1, why: 'Raw values to a distribution. Merges into 3.1.' }),
  Object.freeze({ chapter: 4, session: 5, why: 'Who is in the data. Belongs with sampling, deferred.' }),
  Object.freeze({ chapter: 4, session: 6, why: 'The language of chance. Probability deferred.' }),
  Object.freeze({ chapter: 6, session: 1, why: 'Python. Phase Two.' }),
  Object.freeze({ chapter: 6, session: 2, why: 'Python. Phase Two.' }),
  Object.freeze({ chapter: 6, session: 3, why: 'Python. Phase Two.' }),
  Object.freeze({ chapter: 6, session: 4, why: 'Python. Phase Two.' }),
  Object.freeze({ chapter: 7, session: 1, why: 'A table someone can read. Awaiting a founder ruling.' }),
  Object.freeze({ chapter: 8, session: 1, why: 'Probability deferred.' }),
  Object.freeze({ chapter: 8, session: 2, why: 'Conditional probability deferred. Carries an approved figure.' }),
  Object.freeze({ chapter: 8, session: 3, why: 'Sampling deferred. Carries an approved figure.' }),
  Object.freeze({ chapter: 8, session: 4, why: 'Hypothesis testing deferred.' })
]);

/** Sessions to rewrite, in order. */
export const rewrites = () => PHASE_ONE.filter(s => s.from);
/** Sessions to write from nothing, in order. */
export const blanks = () => PHASE_ONE.filter(s => !s.from);

export const PHASE_ONE_LENGTH = PHASE_ONE.length;
