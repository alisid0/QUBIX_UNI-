// Volume 0, chapter 03. Quality and evidence.
//
// Chapters 01 and 02 established that a record is a representation and that its
// numbers need units and bases. This chapter is about whether the record can be
// believed: what an empty cell means, whether a value is even the right kind of
// thing, whether a row is the thing you think it is, and where the value came
// from. It is the chapter the five Superstore missions were built for, so every
// session ends in one.

export const SHARED_FOUNDATIONS_PART_THREE = Object.freeze({
  id: 'SHARED-FOUNDATIONS-PART-THREE',
  status: 'AI_DRAFT · AUTHORING ONLY',
  title: 'Quality and Evidence',
  subtitle: 'Part Three of Volume 0',
  totalMinutes: 245,
  sessions: Object.freeze([
    Object.freeze({
      id: 'absence', number: '01', title: 'An empty cell does not explain itself', studyMinutes: 30, playMinutes: 25,
      objective: 'Distinguish a recorded zero from the several different reasons a value can be absent.',
      opening: 'A stock count reads 0. Another reads nothing at all. One of those says the shelf was empty. The other says nobody looked, and the two must not be averaged together.',
      sections: Object.freeze([
        Object.freeze({ heading: 'Zero is something somebody measured', paragraphs: Object.freeze([
          'Zero is a reading. Somebody counted the shelf, the count came to none, and that fact is now on the record. A blank is not a reading at all: it says only that no measurement is available, and it does not say why. The two sit in the same column and look equally tidy, but they mean opposite things, because one describes the world and the other describes the record.',
          'The distinction turns up in any measurement you care to take. A rain gauge reading 0 mm means it did not rain, while an empty cell means nobody went out to read the gauge. A balance of £0 means the account is empty, while a blank means the balance did not load. A test score of 0 means the paper was marked and nothing on it was right, while a blank means the student never sat the paper: average that blank in as a zero and the class average falls on a mark nobody earned.',
          'Tools will not settle this for you, and they do not agree with each other. A SUM usually skips blanks, so a total over ten rows with three blanks is really a total over seven. An AVERAGE usually skips them too, and so divides by seven rather than ten. Divide that same sum by a row count of ten yourself and you get a third answer. All three look perfectly ordinary on the page, which is why this is the most common way a number becomes quietly wrong: the behaviour you get depends on the tool rather than on the question you asked.'
        ]) }),
        Object.freeze({ heading: 'Absences have different causes', paragraphs: Object.freeze([
          'Missing and unknown means a value exists in the world but was not captured: the scanner lost power before the count finished. Not applicable means no value could exist: a delivery date on an order that was cancelled before dispatch. Pending means the value is expected later. Not collected by design means a policy decided never to record it.',
          'These four are not interchangeable. Two of them may be filled in later, one never will, and one should not be chased at all. Storing them all as an identical blank throws away the distinction, which is why a reason column beside the value is worth its space.'
        ]) }),
        Object.freeze({ heading: 'The evidence is usually outside the cell', paragraphs: Object.freeze([
          'You cannot tell which kind of absence you are looking at by staring at the cell, because every one of them looks the same. The answer lives in the operational record: a maintenance log, a cancellation flag, a feed that arrived truncated, a policy document.',
          'Deciding what a blank means is therefore an act of investigation rather than a formatting choice, and the decision should be written down beside the data so the next person does not have to repeat it.'
        ]) })
      ]),
      example: Object.freeze({ title: 'Four blanks, four different answers', headers: Object.freeze(['Field', 'Evidence', 'Correct treatment']), rows: Object.freeze([
        Object.freeze(['closing_stock_units', 'scanner outage 20:51–21:18', 'missing and unknown: exclude, flag the feed']),
        Object.freeze(['delivery_date', 'order cancelled before dispatch', 'not applicable: no value can exist']),
        Object.freeze(['returned_units', 'return window still open', 'pending: expected, do not treat as zero']),
        Object.freeze(['customer_age', 'policy: never collected in store', 'not collected: stop asking for it'])
      ]) }),
      figure: Object.freeze({
        kind: 'absence',
        cases: Object.freeze(['returns-zero', 'stock-unknown', 'pickup-distance', 'invoice-pending', 'age-not-collected']),
        caption: 'Figure 1 · Five cells, one measurement',
        note: 'Read straight off mission 003. Four of these are blank and one is a zero, and no amount of staring at the column tells them apart: the difference lives in the operational record, not in the cell.'
      }),
      rehearsal: Object.freeze({
        mission: 'missing-data',
        lead: 'Both of these cells are waiting in the mission at the end of this session. Decide them here first, so the mission is a second look rather than a first.',
        cases: Object.freeze([
          Object.freeze({
            caseId: 'returns-zero',
            facts: Object.freeze([
              Object.freeze(['Where it comes from', 'Checkout · sale_line']),
              Object.freeze(['Field', 'returned_unit_count']),
              Object.freeze(['The cell shows', '0']),
              Object.freeze(['Operational evidence', 'Return-event count: 0 · Feed arrived normally'])
            ]),
            question: 'Is that 0 a measurement, or a gap that happens to look like one?',
            answer: 'A measurement. Keep it.',
            why: 'Zero is observed information here: the count is known and none occurred. Replacing it with a blank would throw away a fact the returns system is certain about.'
          }),
          Object.freeze({
            caseId: 'stock-unknown',
            facts: Object.freeze([
              Object.freeze(['Where it comes from', 'Branch 17 · inventory_snapshot']),
              Object.freeze(['Field', 'closing_stock_units']),
              Object.freeze(['The cell shows', 'NULL']),
              Object.freeze(['Operational evidence', 'Scanner outage: 20:51–21:18 · Closing feed incomplete'])
            ]),
            question: 'Some number of units sat on that shelf at closing. Does the record know it?',
            answer: 'No, and nobody may fill it in with zero.',
            why: 'The quantity exists, but the branch does not know it from this feed. Writing 0 would claim the shelf was empty, which is a measurement nobody took.'
          })
        ]),
        closing: 'Two cells of the same shape, needing opposite treatment. The 0 stays because it is a fact. The NULL stays because inventing a zero would turn a gap into a measurement, and the outage reason is recorded beside it so the next person does not have to rediscover it.'
      }),
      workbook: Object.freeze({ title: 'Fifteen-minute blank hunt', prompt: 'Find a form you have filled in, or a spreadsheet you keep.', steps: Object.freeze([
        'Find three fields left empty.',
        'For each, write which of the four kinds of absence it is.',
        'Write the evidence you used to decide, not just the conclusion.',
        'Mark which of the three could be filled in later and which never can.'
      ]) }),
      check: Object.freeze({
        prompt: 'A branch reports returned_units as blank while its return window is still open. What is it?',
        answer: 'pending',
        options: Object.freeze([
          ['zero', 'A valid zero: no returns have happened'],
          ['pending', 'Pending: a value is expected later'],
          ['not-applicable', 'Not applicable: no value could exist']
        ]),
        explanation: 'No returns have been recorded yet, but the window has not closed, so a value may still arrive. Reading it as zero would freeze an incomplete figure into a report.'
      }),
      practice: Object.freeze({ title: 'Missing Values Are Not Zero', href: '?mode=game&mission=missing-data', instruction: 'Decide what each empty cell means using the operational evidence rather than the cell.' }),
      sources: Object.freeze([
        Object.freeze({ label: 'Government Analysis Function — symbols in tables', url: 'https://analysisfunction.civilservice.gov.uk/policy-store/symbols-in-tables-definitions-and-help/' }),
        Object.freeze({ label: 'PostgreSQL — comparison functions and NULL', url: 'https://www.postgresql.org/docs/current/functions-comparison.html' })
      ])
    }),

    Object.freeze({
      id: 'types', number: '02', title: 'What kind of thing is this value?', studyMinutes: 30, playMinutes: 20,
      objective: 'Classify a column by what it measures, and say which operations that permits.',
      opening: 'A postcode, a shoe size, a satisfaction rating and a temperature are all written with characters, and almost nothing you can do to one of them is legitimate for another.',
      sections: Object.freeze([
        Object.freeze({ heading: 'Categorical and quantitative', paragraphs: Object.freeze([
          'A categorical value names which group something belongs to: a branch, a category, a payment type. A quantitative value records how much or how many, and arithmetic on it means something. The distinction is about what the value represents rather than about how it is stored, which is why a numeric-looking column is not automatically a number.',
          'Branch identifiers B-08 and B-17 could be stored as 8 and 17, and their average would be 12.5, which is not a branch. The database would not object. Only knowing what the column measures prevents it.'
        ]) }),
        Object.freeze({ heading: 'Order, and whether the gaps are equal', paragraphs: Object.freeze([
          'Some categories have a natural order and some do not. Nominal categories are names only, so payment type has no sequence. Ordinal categories can be ranked but the gaps between them are not measured: satisfaction rated poor, fair, good is ordered, yet the distance from poor to fair is not known to equal the distance from fair to good.',
          'This is why averaging a satisfaction rating is a claim, not a calculation. The median and the distribution say what is there; the mean quietly assumes the gaps are equal.'
        ]) }),
        Object.freeze({ heading: 'Interval and ratio', paragraphs: Object.freeze([
          'Within quantitative values the question from chapter 02 returns: does zero mean none. An interval scale has equal gaps but an arbitrary zero, so differences are meaningful and multiples are not. A ratio scale has a true zero, so both are meaningful and it is correct to say one value is twice another.',
          'Units sold, revenue and distance are ratio scales. Calendar year and temperature in Celsius are interval scales. The type of a column is therefore a statement about which sentences you are allowed to write about it.'
        ]) })
      ]),
      example: Object.freeze({ title: 'Four columns, four permissions', headers: Object.freeze(['Column', 'Kind', 'What you may not do']), rows: Object.freeze([
        Object.freeze(['branch_id', 'nominal', 'average it, or say one is larger']),
        Object.freeze(['satisfaction', 'ordinal', 'assume the gaps between ratings are equal']),
        Object.freeze(['business_date', 'interval', 'say one date is twice another']),
        Object.freeze(['units_sold', 'ratio', 'nothing: differences and multiples both hold'])
      ]) }),
      workbook: Object.freeze({ title: 'Fifteen-minute column classification', prompt: 'Take any table with at least five columns: a bank statement, a fixture list, a nutrition label.', steps: Object.freeze([
        'Name what each column measures, in your own words.',
        'Mark each as nominal, ordinal, interval or ratio.',
        'For each, write one operation that would be wrong.',
        'Find a column stored as a number that is really a name.'
      ]) }),
      check: Object.freeze({
        prompt: 'Store satisfaction is recorded as poor, fair, good, excellent. A report shows the mean as 2.7. What is wrong?',
        answer: 'gaps',
        options: Object.freeze([
          ['order', 'The ratings have no order, so they cannot be ranked'],
          ['gaps', 'The gaps between ratings are not known to be equal, so a mean assumes something unmeasured'],
          ['nothing', 'Nothing: converting ratings to numbers is standard practice']
        ]),
        explanation: 'The ratings are ordinal, so ranking them is fine and the median is meaningful. A mean treats the step from poor to fair as the same size as fair to good, which nobody measured.'
      }),
      practice: Object.freeze({ title: 'Classify Store Data', href: '?mode=game&mission=classify-data', instruction: 'Sort the store’s own columns by what they measure, and say what each one permits.' }),
      sources: Object.freeze([
        Object.freeze({ label: 'NIST — SI units', url: 'https://www.nist.gov/pml/owm/metric-si/si-units' }),
        Object.freeze({ label: 'Statistics Canada — statistical units', url: 'https://www150.statcan.gc.ca/n1/pub/11-634-x/2016001/section1/chap3-eng.htm' })
      ])
    }),

    Object.freeze({
      id: 'grain', number: '03', title: 'One row, one thing', studyMinutes: 35, playMinutes: 30,
      objective: 'State a table’s grain precisely enough that a row count answers a real question.',
      opening: 'Someone asks how many sales there were. You count the rows and answer three thousand. Whether that is right depends entirely on what one row of that table represents.',
      sections: Object.freeze([
        Object.freeze({ heading: 'Grain is the meaning of one row', paragraphs: Object.freeze([
          'The grain of a table is what a single row describes, stated with every part needed to tell it from every other row. One completed sale. One product line within one sale. One product at one branch at one observation time. Stating it takes a full sentence, and a sentence that is too short is the beginning of a wrong number.',
          'Counting rows counts things at the grain, whatever anybody wanted it to count. If the grain is product lines, the row count is a number of lines, and calling it a number of sales does not make it one.'
        ]) }),
        Object.freeze({ heading: 'Keys make the grain enforceable', paragraphs: Object.freeze([
          'A key is the column, or the set of columns, whose values are unique at the declared grain. When one column is not enough, a composite key names the combination that is: a branch and a business date, or a sale and a line number. The key is the grain written in a form a database can check.',
          'If the declared key repeats, either the data is wrong or the grain was described wrongly. Both are worth knowing, and the query that finds them is the same one: group by the key and keep the groups that appear more than once.'
        ]) }),
        Object.freeze({ heading: 'A duplicate is not always a mistake', paragraphs: Object.freeze([
          'Two rows sharing a key at the declared grain are a violation. Two rows that look similar but differ in a column that is part of the grain are not duplicates at all: the same product at the same branch measured at two different times is two legitimate observations.',
          'So detection is not permission to delete. Find the repeated keys, then establish why they repeat and which record is authoritative, and preserve the evidence while you do it. Deleting first destroys the only proof of what happened.'
        ]) })
      ]),
      example: Object.freeze({ title: 'Three tables, three row counts', headers: Object.freeze(['Table', 'Grain', 'What 3 rows means']), rows: Object.freeze([
        Object.freeze(['sale', 'one completed sale', 'three transactions']),
        Object.freeze(['sale_line', 'one product line within one sale', 'three lines, perhaps two sales']),
        Object.freeze(['inventory_snapshot', 'one product at one branch at one time', 'three measurements, perhaps one product'])
      ]) }),
      workbook: Object.freeze({ title: 'Twenty-minute grain statement', prompt: 'Take a table you have access to, or the last three rows of any receipt.', steps: Object.freeze([
        'Write one sentence saying what a single row represents.',
        'Underline every part of the sentence that distinguishes one row from another.',
        'Those underlined parts are your candidate key: write it down.',
        'Find two rows that look alike, and say which part of the key tells them apart.'
      ]) }),
      check: Object.freeze({
        prompt: 'inventory_snapshot holds branch B-17 and product QX-CER-001 twice, at 08:00 and at 12:00. Is that a duplicate?',
        answer: 'no',
        options: Object.freeze([
          ['yes', 'Yes: the branch and product repeat, so one row should be removed'],
          ['no', 'No: observation time is part of the grain, so these are two measurements'],
          ['unknown', 'Unknown: there is not enough information to say']
        ]),
        explanation: 'The grain is one product at one branch at one observation time. The times differ, so the key does not repeat and both rows are legitimate records of stock at different moments.'
      }),
      practice: Object.freeze({ title: 'Keys and Duplicate Records', href: '?mode=game&mission=duplicate-records', instruction: 'Choose the key that matches the grain, run the check, and treat what it finds without destroying evidence.' }),
      sources: Object.freeze([
        Object.freeze({ label: 'Statistics Canada — statistical units', url: 'https://www150.statcan.gc.ca/n1/pub/11-634-x/2016001/section1/chap3-eng.htm' }),
        Object.freeze({ label: 'PostgreSQL — SELECT', url: 'https://www.postgresql.org/docs/current/sql-select.html' })
      ])
    }),

    Object.freeze({
      id: 'provenance', number: '04', title: 'Where did this number come from?', studyMinutes: 45, playMinutes: 30,
      objective: 'Trace a reported figure back to the record it came from and the steps that changed it.',
      opening: 'A report says the freezer ran at minus seventeen point eight. Somewhere behind that is a sensor, a reading, a conversion and a decision to publish. Any one of them can be the reason the number is wrong.',
      sections: Object.freeze([
        Object.freeze({ heading: 'Entity, activity and derivation', paragraphs: Object.freeze([
          'Provenance describes where a value came from in three parts. The entity is the source record, identified well enough to find again: a branch, a device and an observation time, not merely a number. The activity is the named, versioned processing that changed it. The derivation is the link that keeps the output connected to both.',
          'A figure with all three can be checked by somebody else. A figure with only its output value can be checked by nobody, however carefully it was calculated.'
        ]) }),
        Object.freeze({ heading: 'Keep the source, add the result', paragraphs: Object.freeze([
          'Every transformation is a chance to lose the evidence. Overwriting a reading with its converted value saves a column and destroys the ability to tell a conversion error from a genuine measurement. Writing the converted value beside the original costs almost nothing and keeps the question answerable.',
          'The same applies to corrections. A corrected row should say what it was, what it became, when it changed and why, because the fact that a value was corrected is itself information about the process that produced it.'
        ]) }),
        Object.freeze({ heading: 'Uncertainty is part of the value', paragraphs: Object.freeze([
          'Very few recorded numbers are exact. A sensor has a tolerance, a survey has a sample, a forecast has a range, and a figure quoted to four decimal places from a source accurate to one is a false claim made by formatting. Reporting a number without its uncertainty invites decisions the evidence does not support.',
          'Carrying uncertainty alongside a value is the last habit of this chapter, and it completes the first. A record is a representation of part of the world, and stating how closely it represents it is part of stating what it says.'
        ]) })
      ]),
      example: Object.freeze({ title: 'One reported figure, traced', headers: Object.freeze(['Part', 'Value', 'Without it']), rows: Object.freeze([
        Object.freeze(['Entity', 'B-08 · FZ-2 · 05:45', 'you cannot find the reading again']),
        Object.freeze(['Activity', 'normalise_temperature_v3', 'you cannot repeat or audit the change']),
        Object.freeze(['Derivation', 'source + activity + output', 'the output is a number with no history'])
      ]) }),
      workbook: Object.freeze({ title: 'Twenty-minute trace', prompt: 'Choose a number that was reported to you: a bill total, a step count, a delivery estimate.', steps: Object.freeze([
        'Write down what was measured, and by what.',
        'Write down every step you believe happened between the measurement and the number you saw.',
        'Mark the steps you could actually verify, and the steps you are assuming.',
        'Write one sentence saying how precise you think the number really is.'
      ]) }),
      check: Object.freeze({
        prompt: 'A pipeline converts Fahrenheit to Celsius and overwrites the original column. What has been lost?',
        answer: 'evidence',
        options: Object.freeze([
          ['nothing', 'Nothing: the converted value contains the same information'],
          ['precision', 'Precision, because the conversion introduces rounding'],
          ['evidence', 'The ability to tell a conversion error from a real measurement']
        ]),
        explanation: 'A wrong conversion produces a plausible-looking Celsius value. With the source gone there is nothing to compare it against, so the error becomes indistinguishable from a genuine reading.'
      }),
      practice: Object.freeze({ title: 'Trace the Number', href: '?mode=game&mission=data-lineage', instruction: 'Name the entity, the activity and the derivation behind one reported value.' }),
      sources: Object.freeze([
        Object.freeze({ label: 'W3C PROV Overview', url: 'https://www.w3.org/TR/prov-overview/' }),
        Object.freeze({ label: 'BIPM — The International System of Units', url: 'https://www.bipm.org/en/publications/si-brochure' })
      ])
    })
  ])
});
