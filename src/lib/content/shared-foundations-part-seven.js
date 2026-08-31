// Volume 0, chapter 07. Explain what you found.
//
// The volume closes where the work actually ends: with somebody else reading
// it. Everything earlier is undone by a table nobody can read, a chart that
// flatters, a claim that outruns its evidence, or an analysis nobody can run
// again. This chapter is deliberately the one that says a learner may be
// finished with Volume 0 and still not be ready to be believed.

export const SHARED_FOUNDATIONS_PART_SEVEN = Object.freeze({
  id: 'SHARED-FOUNDATIONS-PART-SEVEN',
  status: 'AI_DRAFT · AUTHORING ONLY',
  title: 'Explain What You Found',
  subtitle: 'Part Seven of Volume 0',
  totalMinutes: 58,
  sessions: Object.freeze([
    Object.freeze({
      id: 'tables', number: '01', title: 'A table someone can actually read', studyMinutes: 5, playMinutes: 5,
      objective: 'Lay out a table so its meaning survives being sent to somebody else.',
      opening: 'The analysis was right and the table was unreadable, so a decision was made from the one row somebody happened to understand.',
      sections: Object.freeze([
        Object.freeze({ heading: 'Say what a row is, in the table', paragraphs: Object.freeze([
          'A table sent to a reader needs its grain stated somewhere they will see it, because they cannot ask the query what one row means. A title such as "Sales by branch and business date" does more work than any amount of formatting, and it prevents the row count being read as something it is not.',
          'Units belong in the column headings rather than in the cells, and they belong there even when they feel obvious to whoever built it. Obvious is a property of the author, not of the table.'
        ]) }),
        Object.freeze({ heading: 'Show absence rather than hiding it', paragraphs: Object.freeze([
          'A blank cell in a published table is ambiguous in exactly the way chapter 03 described, and the reader has no evidence to resolve it. Marking absences explicitly, with a note saying what the mark means, turns a silent gap into a stated fact.',
          'The same applies to figures that have been suppressed or rounded. A number withheld for a good reason is fine; a number withheld invisibly is a table that misleads by omission.'
        ]) }),
        Object.freeze({ heading: 'One table, one job', paragraphs: Object.freeze([
          'A table trying to serve every possible question serves none of them. It is better to publish the small table that answers the question asked and keep the full extract available for anybody who needs it.',
          'Order rows by whatever the reader will look for first, usually size or time rather than alphabet, and keep the number of decimal places to what the measurement can actually support.'
        ]) })
      ]),
      example: Object.freeze({ title: 'Two versions of one table', headers: Object.freeze(['Element', 'Weak version', 'Readable version']), rows: Object.freeze([
        Object.freeze(['Title', '"Data"', '"Sales by branch and business date"']),
        Object.freeze(['Heading', 'weight', 'weight_kg']),
        Object.freeze(['Empty cell', 'blank', '[z] not collected, with a key']),
        Object.freeze(['Precision', '18.70431', '18.70'])
      ]) }),
      workbook: Object.freeze({ title: 'Fifteen-minute table rewrite', prompt: 'Find a table in a report, an app or a bill.', steps: Object.freeze([
        'Write what one row of it represents, from the table alone.',
        'List every column whose unit you had to guess.',
        'Find an empty cell and say what you think it means.',
        'Rewrite the title so the first two answers become unnecessary.'
      ]) }),
      check: Object.freeze({
        prompt: 'A published table has several blank cells and no notes. What has the reader been left to do?',
        answer: 'guess',
        options: Object.freeze([
          ['ignore', 'Ignore those rows, which is the standard convention'],
          ['guess', 'Guess whether the value is zero, missing, suppressed or not applicable'],
          ['zero', 'Read them as zero, since a blank means nothing was recorded']
        ]),
        explanation: 'Those four possibilities look identical in an empty cell and lead to different conclusions. Only the author has the evidence to distinguish them, so only the author can resolve it, with a mark and a key.'
      }),
      practice: Object.freeze({ title: 'Missing Values Are Not Zero', href: '?mode=game&mission=missing-data', instruction: 'Name the kind of absence, then decide how it should appear to a reader.' }),
      sources: Object.freeze([
        Object.freeze({ label: 'Government Analysis Function — releasing statistics in spreadsheets', url: 'https://analysisfunction.civilservice.gov.uk/policy-store/releasing-statistics-in-spreadsheets/' }),
        Object.freeze({ label: 'Government Analysis Function — symbols in tables', url: 'https://analysisfunction.civilservice.gov.uk/policy-store/symbols-in-tables-definitions-and-help/' })
      ])
    }),

    Object.freeze({
      id: 'charts', number: '02', title: 'A chart that does not flatter', studyMinutes: 5, playMinutes: 10,
      objective: 'Choose a chart for the comparison being made, and label it so it cannot mislead.',
      opening: 'The same two numbers can be a modest difference or a dramatic one, and the difference between those two pictures is where the axis was cut.',
      sections: Object.freeze([
        Object.freeze({ heading: 'The comparison decides the chart', paragraphs: Object.freeze([
          'Pick the chart from the question. Comparing amounts across categories is a bar chart. Following a quantity through time is a line. Looking at the shape of many values is a histogram. Relating two measurements is a scatter. Choosing by appearance instead produces a picture that answers a question nobody asked.',
          'Charts with many slices or many overlapping lines usually mean too many comparisons at once. Splitting into several small charts is almost always clearer than one crowded picture.'
        ]) }),
        Object.freeze({ heading: 'Axes make claims', paragraphs: Object.freeze([
          'A bar chart whose axis does not start at zero exaggerates differences, because the length of the bar no longer represents the quantity. For lines showing change over time a truncated axis can be legitimate, provided the break is visible and labelled.',
          'The general rule is that every choice which changes the impression must be visible to the reader: the range, the break, the scale, and whether the values are raw counts or rates.'
        ]) }),
        Object.freeze({ heading: 'A chart with no labels is a decoration', paragraphs: Object.freeze([
          'Both axes need a name and a unit, the source and date belong on the chart, and the title should say what the reader is meant to take from it rather than merely naming the variables. Colour needs to survive being printed in grey and being seen by somebody who does not distinguish red from green, so it should never be the only thing carrying meaning.',
          'This is the same standard the rest of this product holds itself to: a picture computed from data still has to state what it is showing, or it is asking to be trusted rather than read.'
        ]) })
      ]),
      example: Object.freeze({ title: 'Four decisions that change the impression', headers: Object.freeze(['Decision', 'Misleading', 'Honest']), rows: Object.freeze([
        Object.freeze(['Bar axis', 'starts at 95', 'starts at 0']),
        Object.freeze(['Counts or rates', 'raw counts across branches of different sizes', 'per thousand transactions']),
        Object.freeze(['Colour', 'red against green only', 'shape or label as well as colour']),
        Object.freeze(['Title', '"Branch performance"', '"Returns per 1,000 sales, 2026"'])
      ]) }),
      workbook: Object.freeze({ title: 'Twenty-minute chart critique', prompt: 'Find a chart in a news article or a company report.', steps: Object.freeze([
        'Write the question you think it is answering.',
        'Check whether the chart type suits that question.',
        'Note where each axis starts, and whether that is stated.',
        'Rewrite the title so it says the finding rather than the variables.'
      ]) }),
      check: Object.freeze({
        prompt: 'A bar chart compares two branches, with the vertical axis running from 95 to 100. What is the effect?',
        answer: 'exaggerates',
        options: Object.freeze([
          ['fine', 'None: zooming in shows the detail more clearly'],
          ['exaggerates', 'Bar lengths no longer represent the quantities, so a small difference looks large'],
          ['understates', 'It makes the difference look smaller than it is']
        ]),
        explanation: 'A bar communicates through length. Cutting the axis makes a bar of 99 twice the length of one at 97, so the picture asserts a difference the numbers do not support.'
      }),
      practice: Object.freeze({ title: 'The Big Sheet of Graphs', href: '/library/big-sheet-of-graphs.html', instruction: 'Look at the equal-scaling and distorted-scaling plates: the axes are the claim.' }),
      sources: Object.freeze([
        Object.freeze({ label: 'Government Analysis Function — data visualisation and charts', url: 'https://analysisfunction.civilservice.gov.uk/policy-store/data-visualisation-charts/' }),
        Object.freeze({ label: 'Government Analysis Function — releasing statistics in spreadsheets', url: 'https://analysisfunction.civilservice.gov.uk/policy-store/releasing-statistics-in-spreadsheets/' })
      ])
    }),

    Object.freeze({
      id: 'reasoning', number: '03', title: 'Separating what you found from what you think', studyMinutes: 5, playMinutes: 9,
      objective: 'Write a finding, an interpretation and a recommendation as three distinct statements.',
      opening: 'Returns rose four per cent. Returns rose because the new packaging is weak. We should change supplier. Only the first of those is in the data.',
      sections: Object.freeze([
        Object.freeze({ heading: 'Three different kinds of sentence', paragraphs: Object.freeze([
          'A finding is what the data shows, stated with its population, period and uncertainty. An interpretation is a proposed explanation, which is a claim about causes and always goes beyond the numbers. A recommendation is a course of action, which brings in cost, risk and priorities that no dataset contains.',
          'Blurring them is the most common failure in analytical writing, and it is usually accidental. Writing them as three separate sentences, labelled, makes the joins visible and lets a reader disagree with one without discarding the others.'
        ]) }),
        Object.freeze({ heading: 'Things that move together need not be related', paragraphs: Object.freeze([
          'Two quantities rising together may be connected, may both follow something else, or may coincide. A dataset showing an association cannot tell you which, and stating a cause requires either an experiment or an argument that rules out the alternatives.',
          'The honest form is to state the association, name the most plausible alternative explanations, and say what evidence would separate them. That is a stronger position than a confident cause, because it survives contact with somebody who knows the business.'
        ]) }),
        Object.freeze({ heading: 'State the limits before you are asked', paragraphs: Object.freeze([
          'Every analysis has a boundary: the period covered, the branches included, the rows excluded, the assumptions made where the data was silent. Writing them down is not a weakness in the work; it is what tells a reader how far the conclusion can be carried.',
          'Chapter 04 gave a specific form of this. A figure from a small group will move for reasons that have nothing to do with the thing measured, and saying so is part of reporting the figure.'
        ]) })
      ]),
      figure: Object.freeze({
        kind: 'decision-cycle',
        caption: 'Where a finding sits in the work',
        note: 'The finding is one stage of seven. What it means and what to do about it come after it and are separate from it, which is the whole distinction this session draws.'
      }),
      example: Object.freeze({ title: 'One result, three sentences', headers: Object.freeze(['Kind', 'Statement']), rows: Object.freeze([
        Object.freeze(['Finding', 'Returns per 1,000 sales rose from 11 to 15 at B-17 between March and May 2026.']),
        Object.freeze(['Interpretation', 'The rise begins in the week the new packaging arrived, which is one plausible explanation.']),
        Object.freeze(['Recommendation', 'Inspect returned items from that range before committing to a supplier change.']),
        Object.freeze(['Limit', 'One branch, three months; other branches did not change.'])
      ]) }),
      workbook: Object.freeze({ title: 'Twenty-minute three-sentence exercise', prompt: 'Take any claim you have read this week that draws a conclusion from numbers.', steps: Object.freeze([
        'Write the finding it actually establishes.',
        'Write the interpretation it is offering.',
        'Write the recommendation it is making, if any.',
        'Name one alternative explanation the piece did not mention.'
      ]) }),
      check: Object.freeze({
        prompt: 'Ice cream sales and drowning incidents both rise in the same months. What does the data establish?',
        answer: 'association',
        options: Object.freeze([
          ['cause', 'That ice cream sales contribute to drownings'],
          ['association', 'That the two move together, with the season as an obvious common cause'],
          ['nothing', 'Nothing at all, since the two are unrelated']
        ]),
        explanation: 'The association is real and worth stating. What the data cannot do is choose between explanations, and here a third factor, warm weather, plainly drives both.'
      }),
      practice: Object.freeze({ title: 'Analyst Decision Desk', href: '?mode=game&mission=analyst-desk', instruction: 'Eight requests, each one asking you to separate what the evidence shows from what you would like to say about it.' }),
      sources: Object.freeze([
        Object.freeze({ label: 'Government Analysis Function — communicating uncertainty', url: 'https://analysisfunction.civilservice.gov.uk/policy-store/communicating-quality-uncertainty-and-change/' }),
        Object.freeze({ label: 'Statistics Canada — statistical units', url: 'https://www150.statcan.gc.ca/n1/pub/11-634-x/2016001/section1/chap3-eng.htm' })
      ])
    }),

    Object.freeze({
      id: 'reproducible', number: '04', title: 'Work somebody else can run', studyMinutes: 5, playMinutes: 5,
      objective: 'Package an analysis so another person can reproduce the number without asking you.',
      opening: 'The number was right. Four months later nobody could produce it again, including the person who made it, and it stopped being evidence.',
      sections: Object.freeze([
        Object.freeze({ heading: 'A result is only as good as its trail', paragraphs: Object.freeze([
          'Reproducibility is provenance from chapter 03, applied to your own work. The source data has to be identified with enough precision to fetch again, the steps that transformed it have to exist as code or written instructions rather than as remembered clicks, and the output has to be linked to both.',
          'Manual steps are where reproducibility is lost. A spreadsheet edited by hand cannot be re-run, and the edit is invisible to everybody who receives the file afterwards.'
        ]) }),
        Object.freeze({ heading: 'What to keep with the answer', paragraphs: Object.freeze([
          'Keep the query or script, the date it was run, the version of the data it read, the assumptions made where the data was silent, and any rows excluded with the reason. That list is short and it is almost always sufficient.',
          'Version control is the ordinary tool for this. Its value here is not collaboration but the ability to say what the code was on the day a number was produced, which is the question that always gets asked later.'
        ]) }),
        Object.freeze({ heading: 'Handling data responsibly', paragraphs: Object.freeze([
          'Personal data carries obligations regardless of how interesting the analysis is: collect only what is needed, keep it only as long as it is needed, restrict who can reach it, and aggregate before publishing so individuals cannot be identified. A small group in a published table can identify a person even when no name appears.',
          'The last habit of the volume is the plainest. If you would not be comfortable explaining to the people in the dataset how their data was used, that is the finding to act on first.'
        ]) })
      ]),
      example: Object.freeze({ title: 'What travels with the number', headers: Object.freeze(['Kept', 'Question it answers later']), rows: Object.freeze([
        Object.freeze(['the query or script', 'how was it calculated']),
        Object.freeze(['the run date and data version', 'what did it read']),
        Object.freeze(['excluded rows and why', 'who is not in this figure']),
        Object.freeze(['assumptions made', 'where did the data not say'])
      ]) }),
      workbook: Object.freeze({ title: 'Twenty-minute handover test', prompt: 'Take a calculation you have done before: a budget, a personal total, a work figure.', steps: Object.freeze([
        'Write instructions precise enough for somebody else to reproduce it.',
        'Mark every step that relies on something only you know.',
        'Note where you edited anything by hand.',
        'Rewrite those steps so they could be repeated without you.'
      ]) }),
      check: Object.freeze({
        prompt: 'An analysis is delivered as a spreadsheet with several cells corrected by hand. What has been lost?',
        answer: 'rerun',
        options: Object.freeze([
          ['accuracy', 'Accuracy, since manual edits are usually wrong'],
          ['rerun', 'The ability to re-run it, and any record of what was changed or why'],
          ['nothing', 'Nothing, provided the final numbers are correct']
        ]),
        explanation: 'The edits may be entirely correct. The problem is that they exist nowhere except in the cells, so the work cannot be repeated on new data and nobody can see what was changed.'
      }),
      practice: Object.freeze({ title: 'Trace the Number', href: '?mode=game&mission=data-lineage', instruction: 'End as the volume began: name the entity, the activity and the derivation behind the figure you are about to send.' }),
      sources: Object.freeze([
        Object.freeze({ label: 'W3C PROV Overview', url: 'https://www.w3.org/TR/prov-overview/' }),
        Object.freeze({ label: 'Government Analysis Function — releasing statistics in spreadsheets', url: 'https://analysisfunction.civilservice.gov.uk/policy-store/releasing-statistics-in-spreadsheets/' })
      ])
    })
  ])
});
