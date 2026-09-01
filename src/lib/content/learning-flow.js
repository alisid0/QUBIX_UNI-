// The learning floor, as data: Read then Play, all the way down.
//
// Shared Data Truths first, then one of three doors, then the Analyst floor
// where the doors meet. Every step is a pair, and a pair is honest about which
// of its halves exists.
//
// The rule this file exists to enforce is the redesign brief's own:
//
//   "Never infer completion merely because the topic appears in the wiki."
//   "No invented lesson or mission URL is enabled."
//
// So an asset carries a href only when something real is behind it. Everything
// else is `not-written` or `not-built`, has no destination, and is excluded
// from any completion denominator. check-learning-flow refuses a href on an
// asset that is not live, and refuses a live asset whose destination does not
// resolve to a real session or a real mission on the roster.
//
// Two things the supporting documents got wrong, recorded here rather than
// inherited:
//
//   The topic index listed "The Chart Clinic" among 21 core missions and the
//   flow brief marked it Live while nothing of the sort existed here. It was
//   built on 2026-09-01 as the data-visualization mission, so A2 is a complete
//   pair now. The guard is what makes that safe to change: the slug is resolved
//   against the roster rather than trusted.
//
//   Two door steps name a chapter title where a session title was meant
//   ("Numbers, Ratios and Change" and "Chance and Inference" are chapters).
//   They resolve to the session that actually teaches the idea.

/** @typedef {'live'|'reference'|'roadmap'|'planned'} ContentStatus */

export const CONTENT_STATUS = Object.freeze(['live', 'reference', 'roadmap', 'planned']);

/** A reading that exists, addressed the way the router addresses it. */
const read = (id, label, chapter, session) => Object.freeze({
  id, label, kind: 'read', status: 'live',
  href: `/learn/data-foundations/chapter/${chapter}/session/${session}`,
  chapter, session
});

/** A reading nobody has written. No destination, and never counted. */
const unwritten = (id, label, note) => Object.freeze({
  id, label, kind: 'read', status: 'planned', note
});

/** A mission that exists, addressed by its slug. */
const play = (id, label, slug) => Object.freeze({
  id, label, kind: 'play', status: 'live',
  href: `/academy/missions/${slug}`, slug
});

/** A mission nobody has built. No destination, and never counted. */
const unbuilt = (id, label, note) => Object.freeze({
  id, label, kind: 'play', status: 'planned', note
});

const pair = (id, sequence, idea, readAsset, playAsset) =>
  Object.freeze({ id, sequence, idea, read: readAsset, play: playAsset });

/* ── Shared Data Truths ──────────────────────────────────────────────────── */
// The universal starting point. Every learner completes this before choosing a
// door. Nine pairs, and eight of the nine are complete on both sides.

export const SHARED_DATA_TRUTHS = Object.freeze({
  id: 'shared-data-truths',
  title: 'Shared Data Truths',
  lede: 'What a record can and cannot say. Everybody starts here, whichever door they take next.',
  exitOutcome: 'Given an unfamiliar Superstore table, state its grain, units, denominator, '
    + 'missing-value meaning, candidate key and source, then say what it can and cannot support.',
  pairs: Object.freeze([
    pair('sdt-01', 1, 'Event versus record',
      read('r-1-1', 'A sale is not its record', 1, 1),
      play('p-checkout', 'Process a Sale', 'checkout')),
    pair('sdt-02', 2, 'Rows and columns',
      read('r-1-2', 'Rows and columns', 1, 2),
      play('p-read-the-table', 'Read the Table', 'read-the-table')),
    pair('sdt-03', 3, 'Grain',
      read('r-1-3', 'What one row represents', 1, 3),
      play('p-table-grain', 'What Does One Row Represent?', 'table-grain')),
    pair('sdt-04', 4, 'Missingness',
      read('r-1-4', 'Zero, blank or missing?', 1, 4),
      play('p-missing-data', 'Missing Values Are Not Zero', 'missing-data')),
    pair('sdt-05', 5, 'Units',
      read('r-2-1', 'Four what? Every number needs a unit', 2, 1),
      play('p-units', 'Units and Measurement', 'units-measurement')),
    // The brief calls this reading "Ratios, rates and percentages". The session
    // that teaches it is titled for the trap it opens on.
    pair('sdt-06', 6, 'Rates and denominators',
      read('r-2-2', 'Two branches both report 12%, how are they still different?', 2, 2),
      play('p-rate-desk', 'The Rate Desk', 'rate-desk')),
    pair('sdt-07', 7, 'Data types',
      read('r-3-2', 'A postcode and a price can both contain numbers', 3, 2),
      play('p-classify', 'Classify Store Data', 'classify-data')),
    pair('sdt-08', 8, 'Keys and duplicates',
      read('r-3-3', 'Does one row mean one sale or one product?', 3, 3),
      play('p-duplicates', 'Keys and Duplicate Records', 'duplicate-records')),
    pair('sdt-09', 9, 'Provenance',
      read('r-3-4', 'Where did this number come from?', 3, 4),
      play('p-lineage', 'Trace the Number', 'data-lineage'))
  ])
});

/* ── the three doors ─────────────────────────────────────────────────────── */
// The door changes the order, not the standard. All three foundations are
// required before the Analyst floor.

export const DOORS = Object.freeze([
  Object.freeze({
    id: 'concepts',
    title: 'Concepts first',
    lede: 'Numbers, distributions and what a sample can be asked to stand for.',
    pairs: Object.freeze([
      pair('c1', 1, 'Numbers and change',
        read('r-2-3', 'Absolute change, relative change and rate of change', 2, 3),
        play('p-uom', 'SUM(quantity)', 'uom')),
      pair('c2', 2, 'Distributions',
        read('r-4-1', 'From raw values to a distribution', 4, 1),
        play('p-distribution', 'The Distribution Desk', 'distribution-desk')),
      pair('c3', 3, 'Centre and cost',
        read('r-4-3', 'Centre is a choice', 4, 3),
        play('p-zone-price', 'What Does It Cost?', 'zone-price')),
      pair('c4', 4, 'Samples and boundaries',
        read('r-4-5', 'Who is in the data, and who is not', 4, 5),
        play('p-sampling', 'The Sampling Desk', 'sampling-desk')),
      pair('c5', 5, 'Chance and inference',
        read('r-8-4', 'Different, or different this week?', 8, 4),
        unbuilt('p-inference', 'Inference Investigation',
          'Named in the flow brief. No such mission exists.'))
    ])
  }),
  Object.freeze({
    id: 'python',
    title: 'Python first',
    lede: 'A careful machine that does exactly what the table tells it to.',
    pairs: Object.freeze([
      pair('p1', 1, 'Values and types',
        read('r-6-1', 'Values, names and types', 6, 1),
        play('p-classify-py', 'Classify Store Data', 'classify-data')),
      pair('p2', 2, 'Decisions and loops',
        read('r-6-2', 'Decisions and repetition', 6, 2),
        play('p-python-trace', 'Read the Program', 'python-trace')),
      pair('p3', 3, 'Functions',
        read('r-6-3', 'Giving a piece of work a name', 6, 3),
        unbuilt('p-functions', 'Function Workshop', 'Named in the flow brief. Not built.')),
      pair('p4', 4, 'Tables in code',
        read('r-6-4', 'Collections, and a table in code', 6, 4),
        unbuilt('p-pandas', 'Pandas Superstore Lab', 'Named in the flow brief. Not built.')),
      pair('p5', 5, 'Reproducible notebooks',
        unwritten('r-notebooks', 'Notebook practice', 'No such session exists.'),
        unbuilt('p-repro', 'Reproducibility Lab', 'Named in the flow brief. Not built.'))
    ])
  }),
  Object.freeze({
    id: 'sql',
    title: 'SQL first',
    lede: 'Ask a table a question, and know what the answer is a row of.',
    pairs: Object.freeze([
      pair('s1', 1, 'Select and filter',
        read('r-5-1', 'Asking a table a question', 5, 1),
        play('p-sql-console', 'The SQL Console', 'sql-console')),
      pair('s2', 2, 'Group and count',
        read('r-5-2', 'Grouping changes the grain on purpose', 5, 2),
        play('p-region-grain', 'The Region That Wasn’t', 'region-grain')),
      pair('s3', 3, 'Join safely',
        read('r-5-3', 'Joining without changing what a row is', 5, 3),
        play('p-join-grain', 'Join Without Changing the Grain', 'join-grain')),
      pair('s4', 4, 'Verify and release',
        read('r-5-4', 'Checking a result before believing it', 5, 4),
        play('p-checkpoint', 'The Result Checkpoint', 'result-checkpoint'))
    ])
  })
]);

/* ── the Analyst floor ───────────────────────────────────────────────────── */

export const ANALYST_FLOOR = Object.freeze({
  id: 'analyst',
  title: 'The Analyst floor',
  lede: 'Where the three doors meet. One standard, whichever way a learner arrived.',
  pairs: Object.freeze([
    pair('a1', 1, 'Readable evidence',
      read('r-7-1', 'A table someone can actually read', 7, 1),
      unbuilt('p-readable-table', 'Readable Table Lab', 'Named in the flow brief. Not built.')),
    // The flow brief marks this Live and the topic index counts it among 21
    // missions. It does not exist here, so it is shown disabled.
    pair('a2', 2, 'Honest charts',
      read('r-7-2', 'A chart that does not flatter', 7, 2),
      play('p-chart-clinic', 'The Chart Clinic', 'data-visualization')),
    pair('a3', 3, 'Finding versus advice',
      read('r-7-3', 'Separating what you found from what you think', 7, 3),
      play('p-analyst-desk', 'Analyst Decision Desk', 'analyst-desk')),
    pair('a4', 4, 'Reproducible handover',
      read('r-7-4', 'Work somebody else can run', 7, 4),
      play('p-handover', 'The Handover Pack', 'handover-pack'))
  ]),
  standard: Object.freeze([
    'State grain and units.',
    'Reject an invalid denominator.',
    'Distinguish zero, unknown, pending and not applicable.',
    'Understand keys and join or merge fanout.',
    'Retrieve evidence with foundation-level SQL.',
    'Transform and check data reproducibly with Python.',
    'Inspect distributions before summarising them.',
    'Separate observation, interpretation and recommendation.',
    'Communicate uncertainty and evidential limits.',
    'Hand reproducible work to another person.'
  ])
});

/* ── helpers ─────────────────────────────────────────────────────────────── */

export const ALL_STAGES = Object.freeze([SHARED_DATA_TRUTHS, ...DOORS, ANALYST_FLOOR]);
export const allPairs = () => ALL_STAGES.flatMap(s => s.pairs);
export const allAssets = () => allPairs().flatMap(p => [p.read, p.play]);

/** Available means live and actually pointing somewhere. Nothing else. */
export const isAvailable = asset => asset.status === 'live' && Boolean(asset.href);

/**
 * How much of the live material a learner has finished.
 *
 * Only available assets are in the denominator, so roadmap and planned material
 * can never lower the percentage. That is a rule from the brief, and it is the
 * reason completion is computed here rather than from a count of pairs.
 */
export const liveCompletion = (completedAssetIds = [], stages = ALL_STAGES) => {
  const assets = stages.flatMap(s => s.pairs).flatMap(p => [p.read, p.play]).filter(isAvailable);
  const done = assets.filter(a => completedAssetIds.includes(a.id)).length;
  return { done, total: assets.length, percent: assets.length ? Math.round((done / assets.length) * 100) : 0 };
};
