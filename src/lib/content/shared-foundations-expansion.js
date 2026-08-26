// Applied work added after the first complete draft of Volume 0.
//
// The chapter files remain the readable spine of the book. This companion holds
// the activities that cut across that spine: one substantial reader exercise
// per chapter, and the three preflights that prepare newly added missions. The
// chapter and session id together form the key because names such as `tables`
// and `functions` are deliberately reused in different subjects.

const freezeOptions = values => Object.freeze(values.map(value => Object.freeze(value)));
const freezeItems = values => Object.freeze(values.map(value => Object.freeze(value)));

export const SESSION_EXPANSIONS = Object.freeze({
  '1:rows-grain': Object.freeze({
    exercise: Object.freeze({
      id: 'grain-from-records', type: 'classify', minutes: 5,
      title: 'Name the row before touching the numbers',
      instruction: 'For each extract, choose the only grain statement precise enough to tell two rows apart.',
      options: freezeOptions([
        ['transaction', 'one row per checkout transaction'],
        ['sale-line', 'one row per product line within a transaction'],
        ['branch-day', 'one row per branch per calendar day']
      ]),
      items: freezeItems([
        { id: 'receipt', prompt: 'Columns: transaction_id, paid_at, total_gbp. Transaction T-884 appears once.', answer: 'transaction', why: 'The transaction identifier distinguishes the rows and the total belongs to the whole checkout.' },
        { id: 'basket-lines', prompt: 'Columns: transaction_id, line_number, sku, quantity. T-884 appears three times with line numbers 1–3.', answer: 'sale-line', why: 'A row is not a whole transaction: the composite identity is transaction plus line number.' },
        { id: 'daily-stock', prompt: 'Columns: branch_id, business_date, closing_stock_units. Branch B-17 appears once on each date.', answer: 'branch-day', why: 'The same branch returns on a new day, so both branch and date define one observation.' }
      ])
    })
  }),

  '2:change': Object.freeze({
    exercise: Object.freeze({
      id: 'change-calculator', type: 'numeric', minutes: 5,
      title: 'Calculate the change, then name its denominator',
      instruction: 'Enter numbers only. Percent answers allow a tolerance of 0.1 percentage points.',
      items: freezeItems([
        { id: 'absolute', prompt: 'Weekly damaged units move from 40 to 52. What is the absolute change?', answer: 12, tolerance: 0, suffix: 'units', why: '52 − 40 = 12 units.' },
        { id: 'relative', prompt: 'Using 40 as the baseline, what is the relative increase?', answer: 30, tolerance: 0.1, suffix: '%', why: '12 ÷ 40 × 100 = 30%. The old value is the denominator.' },
        { id: 'rate', prompt: 'A team resolves 54 cases in 4.5 hours. What is the rate?', answer: 12, tolerance: 0.01, suffix: 'cases/hour', why: '54 ÷ 4.5 = 12 cases for each hour.' }
      ])
    })
  }),

  '3:absence': Object.freeze({
    exercise: Object.freeze({
      id: 'absence-register', type: 'classify', minutes: 5,
      title: 'Diagnose the blank from its process',
      instruction: 'The visible cell is empty in every row. Use the collection process to distinguish the reason.',
      options: freezeOptions([
        ['not-collected', 'not collected'],
        ['not-applicable', 'not applicable'],
        ['not-yet', 'not arrived yet'],
        ['known-zero', 'known zero']
      ]),
      items: freezeItems([
        { id: 'age', prompt: 'The loyalty form never asks for exact age, but the export contains an age field.', answer: 'not-collected', why: 'No upstream activity could have produced the value.' },
        { id: 'distance', prompt: 'A customer collected the order in store; delivery_distance_km is blank.', answer: 'not-applicable', why: 'Delivery distance does not apply to a collection order.' },
        { id: 'invoice', prompt: 'The shipment arrived this morning; the supplier invoice file lands overnight.', answer: 'not-yet', why: 'The value may be valid later, but it is not available at this cutoff.' },
        { id: 'returns', prompt: 'The returns system confirms that no units from this sale were returned.', answer: 'known-zero', why: 'Zero is an observed count, not missingness.' }
      ])
    })
  }),

  '4:sampling': Object.freeze({
    missionBriefing: Object.freeze({
      title: 'Before the Sampling Desk',
      paragraphs: Object.freeze([
        'A percentage does not inherit a population merely because its sample is large. The route into the data—the frame, invitation and response process—sets the boundary of the claim. Ten thousand voluntary web responses can be less representative than two hundred randomly invited customers.',
        'In the mission you will write that boundary explicitly: population, frame, missing groups and the strongest sentence the evidence can support. The scenarios are original Qubix cases informed by the sampling distinctions in OpenStax; none of its examples or answer wording is copied.'
      ])
    }),
    exercise: Object.freeze({
      id: 'claim-boundary', type: 'classify', minutes: 6,
      title: 'Set the boundary of each claim',
      instruction: 'Judge the relationship between the stated claim and the route by which the sample was obtained.',
      options: freezeOptions([
        ['supported', 'supported as written'],
        ['limited', 'supportable only with a narrower population'],
        ['unsupported', 'not supportable from this sample']
      ]),
      items: freezeItems([
        { id: 'members', prompt: 'Claim: 38% of loyalty members use click-and-collect. Sample: a random draw from the complete active-member list.', answer: 'supported', why: 'The frame and population match; sampling uncertainty still needs reporting.' },
        { id: 'web', prompt: 'Claim: 92% of all customers found checkout easy. Sample: people who completed web checkout and chose to answer.', answer: 'unsupported', why: 'Customers who failed or used other channels could never appear, and response was self-selected.' },
        { id: 'midday', prompt: 'Claim: 64% of lunchtime shoppers waited under five minutes. Sample: every tenth till receipt from 12:00–14:00.', answer: 'supported', why: 'The frame matches the deliberately narrow lunchtime population.' },
        { id: 'cardholders', prompt: 'Claim: 51% of all shoppers buy fresh produce. Sample: a random draw of loyalty-card transactions.', answer: 'limited', why: 'It can describe recorded loyalty-card transactions, not shoppers outside that frame.' }
      ])
    }),
    rehearsal: Object.freeze({
      mission: 'sampling-desk',
      lead: 'The Sampling Desk opens with a claim that sounds stronger than the route into its data. Mark the boundary before you play.',
      cases: Object.freeze([
        Object.freeze({
          caseId: 'web-ease',
          facts: freezeOptions([
            ['Claim', '92% of all customers found checkout easy.'],
            ['Population claimed', 'All Qubix customers'],
            ['Sample frame', 'Completed web checkouts that accepted the survey invitation'],
            ['Missing from the frame', 'Failed web checkouts, store shoppers and non-responders']
          ]),
          question: 'Which group has no route into this percentage, even though the sentence claims to describe it?',
          answer: 'Customers who failed web checkout—and every other shopper outside the web-completion frame.',
          why: 'The sample can describe its respondents. It cannot silently expand to people who could not be sampled.'
        })
      ]),
      closing: 'In the mission you will narrow the sentence, repair the sampling plan and record the limitation instead of hiding it.'
    }),
    practice: Object.freeze({ title: 'The Sampling Desk', href: '?mode=game&mission=sampling-desk', instruction: 'Audit four claims by naming the population, frame, missing groups and the strongest defensible release sentence.' }),
    sourceAdditions: Object.freeze([
      Object.freeze({ label: 'OpenStax — Data, Sampling, and Variation', url: 'https://openstax.org/books/introductory-statistics/pages/1-2-data-sampling-and-variation-in-data-and-sampling', licence: 'CC BY 4.0' })
    ])
  }),

  '5:verify': Object.freeze({
    missionBriefing: Object.freeze({
      title: 'Before the Result Checkpoint',
      paragraphs: Object.freeze([
        'Verification starts before the query runs. Write the expected grain, plausible row count, date boundary and one total that can be reconciled independently. Those expectations turn a surprising result into a diagnosable failure instead of an argument after publication.',
        'The mission uses original store queries and outputs. PostgreSQL documentation supplies the behaviour of filters, groups and joins; the cases, numbers and explanations here are newly authored for Qubix.'
      ])
    }),
    exercise: Object.freeze({
      id: 'verification-order', type: 'sequence', minutes: 6,
      title: 'Build a release check in the right order',
      instruction: 'Select the cards from first commitment to final handover. You can undo the last card before checking.',
      items: freezeItems([
        { id: 'expect', label: 'State the expected grain, date range and rough row count.' },
        { id: 'structure', label: 'Check row count, key uniqueness and NULL profile.' },
        { id: 'reconcile', label: 'Reconcile an aggregate against an independent known total.' },
        { id: 'inspect', label: 'Inspect boundary rows and a small sample of records.' },
        { id: 'record', label: 'Record the checks, outcomes and remaining limitations.' }
      ]),
      answer: Object.freeze(['expect', 'structure', 'reconcile', 'inspect', 'record']),
      why: 'Expectations come first so the checks are not chosen to excuse the output. Structural and reconciliation checks then find broad failures; record inspection diagnoses them; the audit note preserves what was established.'
    }),
    rehearsal: Object.freeze({
      mission: 'result-checkpoint',
      lead: 'One release has a perfectly plausible total and the wrong number of rows. Read the expected and observed grains before opening the checkpoint.',
      cases: Object.freeze([
        Object.freeze({
          caseId: 'join-inflation',
          facts: freezeOptions([
            ['Query', 'weekly branch sales joined to promotion labels'],
            ['Expected grain', 'one row per branch-week'],
            ['Observed grain', 'one row per branch-week-promotion label'],
            ['Observed total', '£184,320 against ledger £153,600']
          ]),
          question: 'Which two checks would expose the failure before anybody debates the total?',
          answer: 'Compare row count and key uniqueness before and after the join, then reconcile the sum to the ledger.',
          why: 'The join multiplied branch-week rows when several promotion labels matched. Both the grain check and the independent total show the result cannot be released.'
        })
      ]),
      closing: 'At the checkpoint you will diagnose the failure, choose the smallest decisive verification and write the release decision.'
    }),
    practice: Object.freeze({ title: 'The Result Checkpoint', href: '?mode=game&mission=result-checkpoint', instruction: 'Challenge four query outputs with grain, boundary, NULL and reconciliation checks before releasing a number.' }),
    sourceAdditions: Object.freeze([
      Object.freeze({ label: 'PostgreSQL — Table Expressions', url: 'https://www.postgresql.org/docs/current/queries-table-expressions.html', licence: 'PostgreSQL Licence' }),
      Object.freeze({ label: 'PostgreSQL — Licence', url: 'https://www.postgresql.org/about/licence/', licence: 'Permissive open source' })
    ])
  }),

  '6:decisions': Object.freeze({
    exercise: Object.freeze({
      id: 'trace-a-loop', type: 'sequence', minutes: 5,
      title: 'Trace the state, not the intention',
      instruction: 'A loop adds only positive values from [12, -4, 9]. Put the machine states in execution order.',
      items: freezeItems([
        { id: 'start', label: 'total is assigned 0' },
        { id: 'add12', label: '12 passes the test; total becomes 12' },
        { id: 'skip4', label: '-4 fails the test; total stays 12' },
        { id: 'add9', label: '9 passes the test; total becomes 21' },
        { id: 'return', label: 'the program returns 21' }
      ]),
      answer: Object.freeze(['start', 'add12', 'skip4', 'add9', 'return']),
      why: 'Execution follows the program one value at a time. The negative value changes control flow but does not change total.'
    })
  }),

  '7:reproducible': Object.freeze({
    missionBriefing: Object.freeze({
      title: 'Before the Handover Pack',
      paragraphs: Object.freeze([
        'A handover is a contract with a future runner. It names the input snapshot, code version, environment, single run command, expected checks and owner of any manual or restricted step. “The files are in my folder” satisfies none of those conditions.',
        'Government RAP guidance recommends minimising and documenting manual steps, version-controlling code and documentation, and building quality assurance into the process. The mission turns those principles into original Qubix handover cases rather than reproducing the guidance text.'
      ])
    }),
    exercise: Object.freeze({
      id: 'handover-register', type: 'classify', minutes: 6,
      title: 'Decide what belongs in the run contract',
      instruction: 'Classify each handover item by what it contributes to a reproducible run.',
      options: freezeOptions([
        ['required', 'required run evidence'],
        ['context', 'useful context, not sufficient alone'],
        ['risk', 'hidden dependency or risk']
      ]),
      items: freezeItems([
        { id: 'command', prompt: 'README: run `python -m report --snapshot 2026-08-01`; expected output rows: 42.', answer: 'required', why: 'It makes the entry point and a testable expectation explicit.' },
        { id: 'purpose', prompt: 'A short note explains who uses the report and the decision it supports.', answer: 'context', why: 'Purpose helps reviewers, but it cannot recreate the calculation.' },
        { id: 'desktop', prompt: 'Step 4 says “copy the corrected workbook from Sam’s desktop”.', answer: 'risk', why: 'The input is neither shared, versioned nor identifiable by a future runner.' },
        { id: 'versions', prompt: 'A dependency file pins the package versions used by the run.', answer: 'required', why: 'The same code can behave differently under a different environment.' }
      ])
    }),
    rehearsal: Object.freeze({
      mission: 'handover-pack',
      lead: 'The first pack produces a number today, but nobody else can locate the data transformation that made it. Audit what is missing.',
      cases: Object.freeze([
        Object.freeze({
          caseId: 'pasted-workbook',
          facts: freezeOptions([
            ['Deliverable', 'board_sales_pack.xlsx'],
            ['Run instruction', 'Open the workbook and refresh the pivots'],
            ['Hidden step', 'Weekly totals are pasted from an analyst’s local workbook'],
            ['Evidence retained', 'No source snapshot or transformation log']
          ]),
          question: 'What prevents a second analyst from establishing that the same inputs and method produce the same totals?',
          answer: 'The decisive transformation is a manual paste from an unshared file, with neither the input nor the operation retained.',
          why: 'Refreshing the visible workbook reproduces only the last step. The calculation that created its pasted totals is outside the pack.'
        })
      ]),
      closing: 'In the mission you will expose the hidden dependency, choose a repair and decide whether the pack is ready for an independent run.'
    }),
    practice: Object.freeze({ title: 'The Handover Pack', href: '?mode=game&mission=handover-pack', instruction: 'Audit four analytical handovers for inputs, versions, manual steps, tests and a runnable entry point.' }),
    sourceAdditions: Object.freeze([
      Object.freeze({ label: 'Government Analysis Function — RAP strategy', url: 'https://analysisfunction.civilservice.gov.uk/policy-store/reproducible-analytical-pipelines-strategy/', licence: 'Open Government Licence 3.0' }),
      Object.freeze({ label: 'Government Analysis Function — RAP learning pathway', url: 'https://analysisfunction.civilservice.gov.uk/learning-development/learning-pathways/reproducible-analytical-pipelines-rap-learning-pathway/', licence: 'Open Government Licence 3.0' })
    ])
  })
});

export function expansionFor(chapter, sessionId) {
  return SESSION_EXPANSIONS[`${chapter}:${sessionId}`] || null;
}
