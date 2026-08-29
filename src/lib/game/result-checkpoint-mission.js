const options = rows => Object.freeze(rows.map(row => Object.freeze(row)));
const freezeCase = value => Object.freeze({
  ...value,
  facts: options(value.facts),
  diagnosisOptions: options(value.diagnosisOptions),
  verificationOptions: options(value.verificationOptions),
  releaseOptions: options(value.releaseOptions)
});

export const RESULT_CHECKPOINT_MISSION = Object.freeze({
  id: 'MISSION 107', status: 'AI_DRAFT', role: 'ANALYST', title: 'The Result Checkpoint',
  competency: 'Test a query result against expected grain, boundaries, NULL behaviour and an independent total before releasing it.',
  summaryKey: 'release',
  steps: Object.freeze([
    Object.freeze({ key: 'diagnosis', label: 'Diagnose', question: 'What failure best explains this result?', theory: 'Read the expected grain and boundaries before inspecting the headline total. Plausible numbers can be structurally wrong.' }),
    Object.freeze({ key: 'verification', label: 'Verify', question: 'Which check will decide the issue?', theory: 'Choose a check with a known expectation: uniqueness, boundary rows, NULL profile or an independent reconciliation.' }),
    Object.freeze({ key: 'release', label: 'Release', question: 'What should happen to the result now?', theory: 'Release only what the checks established. Block or qualify the rest and record the evidence.' })
  ]),
  sources: Object.freeze([
    Object.freeze({ label: 'PostgreSQL — Queries and table expressions', url: 'https://www.postgresql.org/docs/current/queries-table-expressions.html', licence: 'PostgreSQL Licence' }),
    Object.freeze({ label: 'The Aqua Book — quality analysis in government', url: 'https://www.gov.uk/government/publications/the-aqua-book-guidance-on-producing-quality-analysis-for-government', licence: 'Open Government Licence 3.0' })
  ]),
  cases: Object.freeze([
    freezeCase({
      id: 'join-inflation', title: 'The promotion join',
      brief: 'A weekly branch result grows after joining a table where one sale can match several promotion labels.',
      facts: [
        ['Query', 'weekly branch sales joined to promotion labels'],
        ['Expected grain', 'one row per branch-week'],
        ['Observed grain', 'one row per branch-week-promotion label'],
        ['Observed total', '£184,320 against ledger £153,600']
      ],
      diagnosis: 'multiplication',
      diagnosisOptions: [
        ['multiplication', 'The join multiplied rows before aggregation', 'one sale can match several labels'],
        ['rounding', 'Currency rounding created £30,720', 'rounding cannot create that scale of change'],
        ['timezone', 'The branch week is in the wrong time zone', 'the observed grain already exposes a different fault']
      ],
      diagnosisWhy: 'The result grain contains promotion label, so a branch-week appears repeatedly and its sales can be counted once per match.',
      verification: 'keys-and-total',
      verificationOptions: [
        ['visual', 'Look at the first ten rows and decide by eye', 'a sample may miss the repeated keys'],
        ['keys-and-total', 'Compare row count and branch-week uniqueness before/after the join, then reconcile to the ledger', 'tests structure and value independently'],
        ['sort', 'Sort the final total descending', 'sorting cannot establish correctness']
      ],
      verificationWhy: 'Uniqueness detects multiplication at the declared grain; the independent ledger quantifies the resulting overstatement.',
      release: 'block',
      releaseOptions: [
        ['release', 'Release £184,320 because the query completed successfully.', 'execution is not verification'],
        ['average', 'Average the two totals and release £168,960.', 'there is no basis for averaging conflicting systems'],
        ['block', 'Block release, repair the join cardinality and rerun both checks.', 'the result has failed decisive checks']
      ],
      releaseWhy: 'The output is known to be structurally and financially inconsistent. It must be repaired, not caveated.'
    }),
    freezeCase({
      id: 'end-date', title: 'The missing final day',
      brief: 'A monthly query returns a plausible total but uses a strict less-than boundary against midnight on the last date.',
      facts: [
        ['Filter', "sale_at >= '2026-07-01' AND sale_at < '2026-07-31'"],
        ['Expected period', '1 July through 31 July 2026'],
        ['Maximum returned timestamp', '2026-07-30 23:59:41'],
        ['Daily control total on 31 July', '£22,480']
      ],
      diagnosis: 'boundary',
      diagnosisOptions: [
        ['nulls', 'NULL values sort last', 'sorting is not the filter shown'],
        ['boundary', 'The exclusive upper bound starts too early', '31 July is excluded at midnight'],
        ['grouping', 'GROUP BY has added a day', 'the result is missing a day']
      ],
      diagnosisWhy: 'For a half-open interval covering July, the exclusive upper bound should be 1 August, not 31 July.',
      verification: 'min-max',
      verificationOptions: [
        ['count-columns', 'Count how many columns the query returns', 'column count does not test time coverage'],
        ['rename', 'Rename the output “July-ish”', 'a label cannot repair the boundary'],
        ['min-max', 'Check minimum and maximum timestamps and reconcile each boundary day to daily controls', 'directly tests coverage at both ends']
      ],
      verificationWhy: 'Boundary rows show whether the intended interval is present, and daily controls reveal the exact value omitted.',
      release: 'repair',
      releaseOptions: [
        ['repair', 'Change the upper bound to 1 August, rerun, and record the boundary checks.', 'fixes and verifies the stated period'],
        ['qualify', 'Release the figure as July with a footnote.', 'the title would remain false'],
        ['add', 'Add £22,480 manually to the final cell.', 'a hidden patch breaks the query’s audit trail']
      ],
      releaseWhy: 'The query should encode the intended period so later reruns cannot lose the final day again.'
    }),
    freezeCase({
      id: 'branch-summary', title: 'The result that passes',
      brief: 'A grouped query returns one row for every governed branch, unique identifiers, and a total that reconciles to the sales ledger.',
      facts: [
        ['Expected grain', 'one row per active branch'],
        ['Expected row count', '42 active branches'],
        ['Observed', '42 rows; branch_id unique; no NULL branch_id'],
        ['Reconciliation', '£2,410,882.17 in query and ledger']
      ],
      diagnosis: 'passes',
      diagnosisOptions: [
        ['duplicate', 'The result contains duplicate branch rows', 'uniqueness passed'],
        ['proof', 'The checks prove every business definition is correct', 'checks establish less than total semantic truth'],
        ['passes', 'The result passes its named structural and value checks', 'state exactly what has been tested']
      ],
      diagnosisWhy: 'Grain, row count, identifier completeness and total reconciliation all match explicit expectations.',
      verification: 'sample',
      verificationOptions: [
        ['sample', 'Inspect boundary and unusual branches, then save the executed checks with the result', 'adds record-level and audit evidence'],
        ['none', 'Delete the checks because the total matches', 'that removes the evidence'],
        ['round', 'Round the total until differences disappear', 'the totals already agree']
      ],
      verificationWhy: 'A small targeted inspection can expose definition mistakes hidden by a matching grand total, and the saved checks make the release reviewable.',
      release: 'qualified-pass',
      releaseOptions: [
        ['perfect', 'Release as unquestionably correct in every respect.', 'the tests do not establish every possible property'],
        ['qualified-pass', 'Release with the grain, period and passed checks recorded in the run note.', 'states the evidence without overclaiming'],
        ['block', 'Block every result unless each source row is manually reviewed.', 'that is neither proportionate nor reproducible']
      ],
      releaseWhy: 'A release note should preserve what was checked and the scope those checks cover, not claim certainty beyond them.'
    }),
    freezeCase({
      id: 'null-returns', title: 'The zero-return denominator',
      brief: 'A query counts sales with returned_unit_count = 0 and calls them all non-returned sales, although older records contain NULL.',
      facts: [
        ['Predicate', 'WHERE returned_unit_count = 0'],
        ['Source rows', '80,000 sales'],
        ['Profile', '72,400 zero; 2,100 positive; 5,500 NULL'],
        ['Draft denominator', '74,500, excluding every NULL']
      ],
      diagnosis: 'null-exclusion',
      diagnosisOptions: [
        ['null-exclusion', 'The predicate excludes unknown return counts', 'NULL is neither equal nor unequal to zero'],
        ['duplicate', 'Every return is duplicated', 'the profile gives no duplication evidence'],
        ['overflow', 'The row count exceeds an integer limit', '80,000 is not the issue']
      ],
      diagnosisWhy: 'The query treats missing history as if it were outside the population, silently changing the denominator.',
      verification: 'profile',
      verificationOptions: [
        ['coalesce', 'Immediately replace every NULL with zero', 'that invents non-returns before validation'],
        ['sample-zero', 'Inspect only records already equal to zero', 'that cannot explain the excluded group'],
        ['profile', 'Reconcile total, zero, positive and NULL counts, then inspect NULL coverage by source period', 'tests the denominator and the missingness process']
      ],
      verificationWhy: 'The four counts must reconcile to 80,000. Profiling NULL by period can reveal whether missingness is an old-system boundary.',
      release: 'two-rates',
      releaseOptions: [
        ['clean', 'Report 0% returns for every NULL sale.', 'unknown is not zero'],
        ['two-rates', 'Report the rate among known outcomes and the 6.9% unknown share separately.', 'keeps numerator, known denominator and missingness visible'],
        ['drop', 'Delete the NULL rows without mentioning them.', 'hides a material coverage limit']
      ],
      releaseWhy: 'Separating known outcomes from unknown coverage prevents the missing group from being mistaken for a clean non-return.'
    })
  ])
});

