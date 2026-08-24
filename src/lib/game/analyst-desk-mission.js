// Volume I companion game, made playable.
//
// The role-game page described a four-step loop and let you click the four
// steps to read a sentence about each. This is that loop as decisions.
//
// A branch leader arrives with a question that is not yet answerable. The
// learner fixes the unit of analysis, chooses the evidence that settles it,
// chooses how to represent it, and then chooses which sentence the evidence
// actually supports. Every step has a wrong answer that is plausible and
// common, which is the point: none of these are trick questions.
//
// The chart in the Represent step is drawn from the case's own numbers, so
// choosing a misleading representation draws the misleading picture rather
// than being told it would have been misleading.

export const ANALYST_DESK_MISSION = Object.freeze({
  id: 'MISSION 101', status: 'AI_DRAFT', role: 'ANALYST', title: 'Analyst Decision Desk',
  competency: 'Turn an unclear question into a unit of analysis, evidence, a representation and a defensible sentence.',
  sources: Object.freeze([
    Object.freeze({ label: 'Government Analysis Function — data visualisation and charts', url: 'https://analysisfunction.civilservice.gov.uk/policy-store/data-visualisation-charts/' }),
    Object.freeze({ label: 'Government Analysis Function — communicating uncertainty', url: 'https://analysisfunction.civilservice.gov.uk/policy-store/communicating-quality-uncertainty-and-change/' }),
    Object.freeze({ label: 'Statistics Canada — statistical units', url: 'https://www150.statcan.gc.ca/n1/pub/11-634-x/2016001/section1/chap3-eng.htm' })
  ]),
  cases: Object.freeze([
    Object.freeze({
      id: 'returns',
      asked: 'Are returns getting worse at Northgate?',
      from: 'Branch leader, B-17 Northgate',
      note: 'B-17 is the largest branch in the region and had a promotion in May.',
      // Two series the chart can draw. Counts rise; the rate barely moves.
      series: Object.freeze([
        Object.freeze({ label: 'Mar', count: 132, sales: 12000 }),
        Object.freeze({ label: 'Apr', count: 148, sales: 13400 }),
        Object.freeze({ label: 'May', count: 191, sales: 17600 })
      ]),
      unit: 'per-sales',
      unitOptions: Object.freeze([
        ['per-sales', 'Returns per 1,000 sales', 'a rate, so months of different size compare'],
        ['per-branch', 'Returns per branch', 'B-17 is one branch, so this is the same as counting'],
        ['count', 'One return', 'count the returns each month']
      ]),
      unitWhy: 'May was a bigger month. A count cannot separate more returns from more shopping, and a rate can.',
      evidence: 'both',
      evidenceOptions: Object.freeze([
        ['returns', 'The returns table alone', 'gives the numerator and nothing to divide by'],
        ['both', 'Returns joined to sales, at branch and month', 'gives both halves of the rate'],
        ['may', 'May in detail', 'answers a different question than "getting worse"']
      ]),
      evidenceWhy: 'A rate needs its denominator from the same branch and the same month, which means both tables at the same grain.',
      chart: 'line-rate',
      chartOptions: Object.freeze([
        ['bar-count', 'Bar chart of monthly return counts', 'rising bars: 132, 148, 191'],
        ['line-rate', 'Line of returns per 1,000 sales', '11.0, 11.0, 10.9'],
        ['bar-truncated', 'Bar chart of counts, axis from 120', 'the same counts, exaggerated']
      ]),
      chartWhy: 'The rate is flat: 11.0, 11.0 and 10.9 per thousand. The counts rose because the month was bigger.',
      sentence: 'finding',
      sentenceOptions: Object.freeze([
        ['cause', '"The promotion caused more returns."', 'a claim about cause, from data that shows none'],
        ['alarm', '"Returns rose 45% in May."', 'true of the count, and misleading as an answer'],
        ['finding', '"Returns per 1,000 sales held at about 11 while volume grew 47%."', 'the finding, with its denominator']
      ]),
      sentenceWhy: 'The honest answer is that the rate did not move. The count did, because May was larger, and saying so prevents a supplier review nobody needs.'
    }),

    Object.freeze({
      id: 'satisfaction',
      asked: 'Which region has the happiest customers?',
      from: 'Regional director',
      note: 'Satisfaction is recorded as poor, fair, good or excellent on a till receipt code.',
      series: Object.freeze([
        Object.freeze({ label: 'North', count: 41, sales: 52 }),
        Object.freeze({ label: 'South', count: 388, sales: 610 }),
        Object.freeze({ label: 'East', count: 402, sales: 655 })
      ]),
      unit: 'share',
      unitOptions: Object.freeze([
        ['total', 'Total positive responses', 'rewards whichever region has most customers'],
        ['mean', 'Mean rating per region', 'treats the four ratings as numbers 1 to 4'],
        ['share', 'Share rating good or excellent, with the response count', 'a proportion, and the base it came from']
      ]),
      unitWhy: 'The ratings are ordinal, so the gaps between them were never measured and a mean assumes they are equal. A share of positive ratings makes no such assumption.',
      evidence: 'base',
      evidenceOptions: Object.freeze([
        ['base', 'Responses per region, and how many customers were asked', 'shows which regions can support a comparison'],
        ['top', 'The highest-scoring region only', 'answers the question by assuming it'],
        ['trend', 'Last twelve months of ratings', 'useful later, but not what was asked']
      ]),
      evidenceWhy: 'North has 52 responses against 655 in the East. Without the response counts the comparison looks equally solid everywhere.',
      chart: 'bar-share',
      chartOptions: Object.freeze([
        ['bar-count', 'Bars of positive response counts', 'a chart of region size, not satisfaction'],
        ['bar-truncated', 'Bars of share, axis from 55%', 'a five-point gap drawn as a landslide'],
        ['bar-share', 'Bars of positive share, labelled with response counts', '79%, 64%, 61% on 52, 610, 655']
      ]),
      chartWhy: 'The share is the comparison, and the response count is what tells the reader how much to trust each bar.',
      sentence: 'caution',
      sentenceOptions: Object.freeze([
        ['caution', '"The North scores highest at 79%, on 52 responses, so the lead is not yet reliable."', 'the finding and its limit'],
        ['none', '"The data cannot tell us anything."', 'discards evidence that is genuinely informative'],
        ['winner', '"The North has the happiest customers."', 'a ranking built on 52 responses']
      ]),
      sentenceWhy: 'The figure is real and worth reporting. What it cannot yet support is a ranking, and saying so is more useful than either extreme.'
    }),

    Object.freeze({
      id: 'stockouts',
      asked: 'Did the new replenishment rule reduce stockouts?',
      from: 'Supply chain lead',
      note: 'The rule went live at 14 branches in April. The other 34 kept the old rule.',
      series: Object.freeze([
        Object.freeze({ label: 'Before', count: 96, sales: 14 }),
        Object.freeze({ label: 'After', count: 61, sales: 14 }),
        Object.freeze({ label: 'Control', count: 148, sales: 34 })
      ]),
      unit: 'per-branch',
      unitOptions: Object.freeze([
        ['total', 'Total stockouts', 'the two groups are different sizes'],
        ['per-branch', 'Stockouts per branch per month', 'comparable across groups of 14 and 34'],
        ['count', 'One stockout', 'the event, not yet a measure']
      ]),
      unitWhy: '14 branches cannot be compared with 34 by totals. Per branch per month puts both groups on the same footing.',
      evidence: 'control',
      evidenceOptions: Object.freeze([
        ['after', 'The 14 branches after the change', 'no comparison at all'],
        ['before', 'The 14 branches before and after', 'cannot separate the rule from the season'],
        ['control', 'Both groups, before and after', 'lets the unchanged branches show what would have happened anyway']
      ]),
      evidenceWhy: 'The 34 unchanged branches are the control. Without them, any seasonal fall looks exactly like the rule working.',
      chart: 'bar-groups',
      chartOptions: Object.freeze([
        ['bar-groups', 'Before and after for both groups, per branch', '6.9 to 4.4, against 4.9 to 4.4'],
        ['line-single', 'Line of stockouts in the 14 branches', 'a fall, with nothing to compare it against'],
        ['bar-truncated', 'Before and after, axis from 55', 'a modest fall drawn as a collapse']
      ]),
      chartWhy: 'Drawn per branch, the changed group falls from 6.9 to 4.4 and the control sits at 4.4. Both end up in the same place.',
      sentence: 'limit',
      sentenceOptions: Object.freeze([
        ['fails', '"The rule had no effect."', 'stronger than the evidence, in the other direction'],
        ['limit', '"Stockouts fell to the level the unchanged branches were already at, so the rule has not yet shown a benefit."', 'the comparison, stated'],
        ['works', '"The new rule cut stockouts by 36%."', 'true of the group, and silent about the control']
      ]),
      sentenceWhy: 'The changed branches started worse and converged on the control. That is consistent with the rule helping, and also with regression to the usual level, and one month cannot separate them.'
    }),

    Object.freeze({
      id: 'basket',
      asked: 'Is the average basket falling?',
      from: 'Finance',
      note: 'A wholesale account placed three very large orders through the till in February.',
      series: Object.freeze([
        Object.freeze({ label: 'Jan', count: 21, sales: 20 }),
        Object.freeze({ label: 'Feb', count: 34, sales: 21 }),
        Object.freeze({ label: 'Mar', count: 22, sales: 21 })
      ]),
      unit: 'median',
      unitOptions: Object.freeze([
        ['total', 'Total revenue', 'a different question entirely'],
        ['mean', 'Mean basket value', 'moved by three unusual orders'],
        ['median', 'Median basket value, with the mean beside it', 'the typical basket, and the gap as evidence']
      ]),
      unitWhy: 'Three wholesale orders lifted February’s mean to £34 while the median stayed at £21. The gap between them is the signal.',
      evidence: 'distribution',
      evidenceOptions: Object.freeze([
        ['distribution', 'The distribution of basket values each month', 'shows the shape and the outliers'],
        ['top', 'The largest baskets', 'explains February and not the question'],
        ['monthly', 'Monthly means', 'the summary that caused the confusion']
      ]),
      evidenceWhy: 'Looking at the shape first is the habit from chapter 04. The three large orders are visible immediately and the rest of the distribution is unchanged.',
      chart: 'line-both',
      chartOptions: Object.freeze([
        ['line-mean', 'Line of the monthly mean', 'a rise then a fall that never happened'],
        ['line-both', 'Mean and median on the same axes', '21/34/22 against 21/21/21'],
        ['bar-truncated', 'Bars of the mean, axis from 18', 'the artefact, exaggerated']
      ]),
      chartWhy: 'The median is flat at £21 across all three months. Only the mean moves, and only in the month with the wholesale orders.',
      sentence: 'artefact',
      sentenceOptions: Object.freeze([
        ['exclude', '"We should remove wholesale orders from all reporting."', 'a recommendation, not a finding'],
        ['falling', '"The average basket fell 35% in March."', 'true of the mean, and describes an artefact'],
        ['artefact', '"The typical basket held at £21; February’s mean was lifted by three wholesale orders."', 'the finding and its cause']
      ]),
      sentenceWhy: 'Nothing happened to the typical customer. Reporting the fall would send finance looking for a cause that does not exist.'
    })
  ])
});

/** The four steps, in the order the desk works through them. */
export const DESK_STEPS = Object.freeze([
  Object.freeze({ key: 'unit', label: 'BRIEF', question: 'What is the unit of analysis?',
    theory: 'The question as asked has no unit. Fixing what one number will measure decides everything after it, and is where most disagreements about a figure actually live.' }),
  Object.freeze({ key: 'evidence', label: 'INSPECT', question: 'What evidence settles it?',
    theory: 'A rate needs its denominator, a comparison needs something to compare against, and a summary needs the shape behind it. Ask what the answer would look like if it were the opposite.' }),
  Object.freeze({ key: 'chart', label: 'REPRESENT', question: 'How should it be drawn?',
    theory: 'The chart is an argument. Choosing the axis, the measure and the comparison decides what the reader concludes before they read a word of your text.' }),
  Object.freeze({ key: 'sentence', label: 'RECOMMEND', question: 'Which sentence does the evidence support?',
    theory: 'A finding states what the data shows. An interpretation proposes a cause. A recommendation proposes an action. Only the first is in the numbers.' })
]);

export const answerFor = (caseRecord, stepKey) => caseRecord?.[stepKey];
export const optionsFor = (caseRecord, stepKey) => caseRecord?.[`${stepKey}Options`] || [];
export const whyFor = (caseRecord, stepKey) => caseRecord?.[`${stepKey}Why`] || '';
