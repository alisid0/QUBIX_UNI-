// Chapter 02's game. Its sessions 02 and 03 teach ratios and change, and both
// were borrowing missions written for other chapters.
//
// Every figure here is computed by the functions below, and the view draws with
// the same ones, so a number in the prose cannot drift from the number on the
// chart. That has gone wrong before: four figures in the Distribution Desk once
// disagreed with the statistics the page computed beside them. check-rates
// compares every stated figure against what these functions return.
//
// The skill is three steps, and they are the order a careful person works in:
// name the denominator, compute the figure, then say which sentence it supports.
// Most bad numbers in this chapter come from skipping the first step.

/* ------------------------------------------------------------- arithmetic -- */

/** A rate: how much numerator there is for each `per` of denominator. */
export const rate = (numerator, denominator, per = 1) =>
  (denominator === 0 ? null : (numerator / denominator) * per);

/** Relative change, as a percentage of where it started. */
export const relative = (from, to) => (from === 0 ? null : ((to - from) / from) * 100);

/** Absolute change, in the unit the values were measured in. */
export const absolute = (from, to) => to - from;

/**
 * Change between two percentages, which is a number of percentage points, not a
 * percentage. Confusing the two is the most common mistake in this chapter, and
 * both readings of the same pair are true.
 */
export const points = (from, to) => to - from;

/** A rate over several groups, weighted by how large each group actually is. */
export function combined(groups) {
  const n = groups.reduce((t, g) => t + g.denominator, 0);
  const x = groups.reduce((t, g) => t + g.numerator, 0);
  return n === 0 ? null : (x / n) * 100;
}

/** The mean of the group rates, ignoring their sizes. Usually the wrong one. */
export function unweighted(groups) {
  if (!groups.length) return null;
  return groups.reduce((t, g) => t + (g.numerator / g.denominator) * 100, 0) / groups.length;
}

/** Applying successive percentage changes to a starting value. */
export const compound = (start, ...changes) =>
  changes.reduce((v, pct) => v * (1 + pct / 100), start);

export const round = (v, dp = 1) => (v === null ? null : Math.round(v * 10 ** dp) / 10 ** dp);

/* ----------------------------------------------------------------- cases -- */

export const RATE_DESK_MISSION = Object.freeze({
  id: 'MISSION 105', status: 'AI_DRAFT', role: 'ANALYST', title: 'The Rate Desk',
  competency: 'Name the denominator under a figure, compute the comparison it allows, and state only the claim it supports.',
  sources: Object.freeze([
    Object.freeze({ label: 'Government Analysis Function — communicating statistics', url: 'https://analysisfunction.civilservice.gov.uk/policy-store/communicating-statistics/' }),
    Object.freeze({ label: 'Office for National Statistics — methodology', url: 'https://www.ons.gov.uk/methodology' }),
    Object.freeze({ label: 'Government Analysis Function — presenting comparisons', url: 'https://analysisfunction.civilservice.gov.uk/policy-store/data-visualisation-charts/' })
  ]),
  cases: Object.freeze([
    Object.freeze({
      id: 'complaints', kind: 'compare',
      asked: 'Which branch has the bigger complaints problem?',
      note: 'Two branches, one quarter of complaints.',
      unit: 'complaints', per: 1000, perLabel: 'per 1,000 transactions',
      groups: Object.freeze([
        Object.freeze({ label: 'Northgate', numerator: 120, denominator: 60000 }),
        Object.freeze({ label: 'Riverside', numerator: 40, denominator: 5000 })
      ]),
      expect: Object.freeze({ rates: Object.freeze([2, 8]) }),
      base: 'transactions',
      baseOptions: Object.freeze([
        ['staff', 'The number of staff at each branch', 'staff do not generate the complaints, customers do'],
        ['branches', 'Nothing: 120 is simply more than 40', 'that compares two branches of very different size'],
        ['transactions', 'The number of transactions each branch handled', 'a complaint can only come from a sale that happened']
      ]),
      baseWhy: 'A complaint has to come from a transaction, so transactions are the population the complaints are drawn from. Northgate handled 60,000 and Riverside 5,000, which is twelve times as many chances to complain.',
      figure: 'riverside4x',
      figureOptions: Object.freeze([
        ['riverside4x', 'Riverside is four times worse', '8.0 against 2.0 per 1,000'],
        ['same', 'They are about the same', 'the two rates differ by a factor of four'],
        ['northgate3x', 'Northgate is three times worse', 'that is the raw count, ignoring size']
      ]),
      figureWhy: 'Northgate is 120 / 60,000 = 2.0 per 1,000. Riverside is 40 / 5,000 = 8.0 per 1,000. The branch with a third of the complaints has four times the rate.',
      claim: 'riverside',
      claimOptions: Object.freeze([
        ['northgate', 'Northgate has the bigger problem, with 120 complaints', 'true count, wrong conclusion'],
        ['riverside', 'Riverside has the bigger problem: 8 complaints per 1,000 transactions against 2', 'the comparison the denominator allows'],
        ['neither', 'Neither: complaint counts cannot be compared across branches', 'they can, once put over the same denominator']
      ]),
      claimWhy: 'Both sentences quote real numbers. Only the second compares like with like, and it reverses which branch you would send help to first.'
    }),

    Object.freeze({
      id: 'points', kind: 'change',
      asked: 'Card payments were 40% of transactions in January and 44% in June. How much did they rise?',
      note: 'A share of transactions, measured twice.',
      unit: '%', isShare: true,
      from: 40, to: 44,
      expect: Object.freeze({ points: 4, relative: 10 }),
      base: 'both',
      baseOptions: Object.freeze([
        ['both', 'It depends which question is asked, and there are two', 'a share measured twice supports two different figures'],
        ['percent', 'The January figure, so the answer is a percentage', 'that is one of two valid readings'],
        ['points', 'Nothing, because both figures are already percentages', 'they are, and the difference still needs naming']
      ]),
      baseWhy: 'Both readings are correct and they are not the same number. The share rose by 4 percentage points. Measured against where it started, it rose by 10%. The word "percent" alone does not say which.',
      figure: 'four-ten',
      figureOptions: Object.freeze([
        ['four-four', '4 percentage points, or a 4% rise', 'the second half turns points into percent'],
        ['four-ten', '4 percentage points, which is a 10% rise', '4 / 40 is a tenth of where it started'],
        ['ten-ten', '10 percentage points, or a 10% rise', 'the gap between 40 and 44 is 4, not 10']
      ]),
      figureWhy: '44 − 40 = 4 percentage points. As a share of the starting figure, 4 / 40 = 10%. Reporting "a 4% rise" states the point difference in the language of relative change, which is a different and smaller claim.',
      claim: 'name',
      claimOptions: Object.freeze([
        ['name', 'Use either, and name which one it is', 'the unit is what makes it readable'],
        ['smaller', 'Use 4%, because it is the more cautious number', 'it is also the one that mislabels points as percent'],
        ['bigger', 'Use 10%, because it is the larger and more impressive number', 'choosing by size is how a figure stops being evidence']
      ]),
      claimWhy: 'Neither figure is dishonest. Reporting one without saying which it is leaves the reader to guess, and they will usually guess the other one.'
    }),

    Object.freeze({
      id: 'smallbase', kind: 'change',
      asked: 'A slow-moving product sold 2 units last month and 6 this month. The report says sales tripled.',
      note: 'One product, two months, a very small base.',
      unit: 'units',
      from: 2, to: 6,
      expect: Object.freeze({ relative: 200, absolute: 4 }),
      base: 'two',
      baseOptions: Object.freeze([
        ['none', 'Nothing: tripling is tripling', 'tripling from 2 and from 2,000 are different events'],
        ['two', 'Two units, which is what the 200% is measured against', 'a tiny denominator makes any change look enormous'],
        ['six', 'Six units, the figure it ended at', 'relative change is measured from the start, not the end']
      ]),
      baseWhy: 'Relative change divides by where it started, and here that is 2. Any movement at all against a base that small produces a large percentage.',
      figure: 'both-true',
      figureOptions: Object.freeze([
        ['absolute-wrong', 'The rise is 6 units', 'that is the new total, not the change'],
        ['wrong', 'The 200% is wrong', '(6 − 2) / 2 is exactly 200%'],
        ['both-true', 'Both are true: up 200%, and up 4 units', 'the absolute change is what puts it in proportion']
      ]),
      figureWhy: '(6 − 2) / 2 = 200%, so the percentage is correct. The absolute change is 4 units. Both describe the same event and only one of them sounds like news.',
      claim: 'both',
      claimOptions: Object.freeze([
        ['hide', 'Say nothing, since 4 units is not worth reporting', 'it may matter; it just needs its scale attached'],
        ['percent', 'Sales tripled, up 200% month on month', 'accurate and unreadable without the counts'],
        ['both', 'Sales rose from 2 units to 6, up 200% from a very small base', 'the reader can size it themselves']
      ]),
      claimWhy: 'A percentage from a small base is not false, it is unreadable on its own. Giving the counts alongside it lets the reader decide whether four units matters.'
    }),

    Object.freeze({
      id: 'weighted', kind: 'compare',
      asked: 'Two weeks of a promotion. What was the conversion rate over the whole run?',
      note: 'Week one was quiet; week two carried nearly all the traffic.',
      unit: '%', asPercent: true,
      groups: Object.freeze([
        Object.freeze({ label: 'Week 1', numerator: 10, denominator: 100 }),
        Object.freeze({ label: 'Week 2', numerator: 180, denominator: 900 })
      ]),
      expect: Object.freeze({ combined: 19, unweighted: 15 }),
      base: 'visits',
      baseOptions: Object.freeze([
        ['weeks', 'The two weeks, averaged', 'that treats 100 visits and 900 visits as equal'],
        ['visits', 'All 1,000 visits across both weeks', 'the rate covers every visit the promotion got'],
        ['orders', 'The 190 orders', 'orders are the numerator, not the population']
      ]),
      baseWhy: 'The question asks about the whole run, so the population is every visit in it: 1,000. Averaging the two weekly rates would give each week the same weight, though one is nine times the size of the other.',
      figure: 'nineteen',
      figureOptions: Object.freeze([
        ['thirty', '30%, the two rates added', 'rates over the same population do not add'],
        ['fifteen', '15%, the average of 10% and 20%', 'that is the unweighted mean of the two rates'],
        ['nineteen', '19%, because week two carries most of the traffic', '190 orders from 1,000 visits']
      ]),
      figureWhy: '10 + 180 = 190 orders from 100 + 900 = 1,000 visits, which is 19%. The mean of the two rates is 15%, and it describes a promotion that did not happen: one where both weeks were the same size.',
      claim: 'weighted',
      claimOptions: Object.freeze([
        ['weighted', 'The promotion converted at 19% across 1,000 visits', 'one rate over the population it covers'],
        ['range', 'The promotion converted at between 10% and 20%', 'true, and it answers a question nobody asked'],
        ['average', 'The promotion converted at 15%', 'averages the rates, not the visits']
      ]),
      claimWhy: 'A rate over several groups has to be rebuilt from the counts, not averaged from the rates. The gap here is four percentage points, and it grows as the groups become more unequal.'
    }),

    Object.freeze({
      id: 'updown', kind: 'change',
      asked: 'A price rose 10% in spring, then fell 10% in autumn. Is it back where it started?',
      note: 'One price, two changes, measured against different bases.',
      unit: '£', start: 20,
      sequence: Object.freeze([10, -10]),
      expect: Object.freeze({ end: 19.8, netPct: -1 }),
      base: 'moving',
      baseOptions: Object.freeze([
        ['final', 'Both are measured against the final price', 'a change is measured from where it began'],
        ['same', 'Both are measured against the original price', 'the second change is applied to the raised price'],
        ['moving', 'Each change is measured against the price at the time', 'the base moves between the two changes']
      ]),
      baseWhy: 'The rise is 10% of £20, which is £2. The fall is 10% of £22, which is £2.20. The percentages match but the amounts do not, because the base moved between them.',
      figure: 'lower',
      figureOptions: Object.freeze([
        ['equal', 'Yes, back to £20', 'that would need the second base to equal the first'],
        ['lower', 'No, it ends at £19.80', 'the fall was taken from a larger number'],
        ['higher', 'No, it ends above £20', 'a 10% fall from £22 lands below £20']
      ]),
      figureWhy: '£20 → £22 → £19.80, which is 1% below where it started. Percentage changes do not cancel, because each one is measured against a different amount.',
      claim: 'net',
      claimOptions: Object.freeze([
        ['zero', 'The changes cancel out to zero percent', 'they cancel in percentage points, not in money'],
        ['cancel', 'The price is unchanged over the year', 'it is 20p lower'],
        ['net', 'The price ended 1% below where it started', 'the only claim the two changes support']
      ]),
      claimWhy: 'Adding percentage changes together is only ever an approximation, and it is wrong in a fixed direction: a rise and an equal fall always end below the start.'
    }),

    Object.freeze({
      id: 'perday', kind: 'compare',
      asked: 'Which delivery route is busier?',
      note: 'Two routes, counted over different lengths of time.',
      unit: 'drops', per: 1, perLabel: 'per working day',
      groups: Object.freeze([
        Object.freeze({ label: 'Route A', numerator: 420, denominator: 28 }),
        Object.freeze({ label: 'Route B', numerator: 180, denominator: 10 })
      ]),
      expect: Object.freeze({ rates: Object.freeze([15, 18]) }),
      base: 'days',
      baseOptions: Object.freeze([
        ['days', 'The number of working days each was counted over', 'a total means nothing until you know how long it took'],
        ['vans', 'The number of vans on each route', 'not recorded, and not what the totals are over'],
        ['drops', 'Nothing: 420 drops beats 180', 'the two were counted over different periods']
      ]),
      baseWhy: 'Route A was counted over 28 working days and Route B over 10. A total collected over a longer period is expected to be larger, so the totals cannot be compared directly.',
      figure: 'b-busier',
      figureOptions: Object.freeze([
        ['b-busier', 'Route B, at 18 drops a day against 15', '180 / 10 against 420 / 28'],
        ['same', 'They are the same once you divide', '15 and 18 are not the same'],
        ['a-busier', 'Route A, with more than twice the drops', 'over nearly three times the days']
      ]),
      figureWhy: '420 / 28 = 15 drops a day. 180 / 10 = 18 drops a day. Route B is busier per day, despite having fewer than half the drops in total.',
      claim: 'perday',
      claimOptions: Object.freeze([
        ['total', 'Route A is busier: 420 drops against 180', 'a longer count, not a busier route'],
        ['perday', 'Route B is busier: 18 drops a day against 15', 'the comparison the denominator allows'],
        ['unknown', 'There is not enough information to say', 'the working days are recorded, so there is']
      ]),
      claimWhy: 'Rates over time are the same move as rates over population: the total is meaningless until it is divided by what it was collected over.'
    })
  ])
});

export const DESK_STEPS = Object.freeze([
  Object.freeze({ key: 'base', label: 'DENOMINATOR', question: 'What does this number need to be divided by?',
    theory: 'A count on its own compares nothing. Before computing anything, name the population it came out of, because that choice decides every figure after it.' }),
  Object.freeze({ key: 'figure', label: 'FIGURE', question: 'What is the number, once divided?',
    theory: 'Now the arithmetic. The chart is computed from the same values, so you can check the working rather than take it on trust.' }),
  Object.freeze({ key: 'claim', label: 'CLAIM', question: 'Which sentence does the figure support?',
    theory: 'Several true sentences can be written from one calculation, and they do not all lead to the same decision. Pick the one a reader could not misread.' })
]);

export const answerForRate = (c, key) => c?.[key];
export const optionsForRate = (c, key) => c?.[`${key}Options`] || [];
export const whyForRate = (c, key) => c?.[`${key}Why`] || '';

/** What the view draws, computed rather than declared. */
export function readingsFor(c) {
  if (!c) return null;
  if (c.kind === 'compare') {
    const rows = c.groups.map(g => ({
      label: g.label, numerator: g.numerator, denominator: g.denominator,
      value: c.asPercent ? rate(g.numerator, g.denominator, 100) : rate(g.numerator, g.denominator, c.per)
    }));
    const whole = c.asPercent
      ? { label: 'All together', value: combined(c.groups), naive: unweighted(c.groups) }
      : null;
    return { kind: 'compare', rows, whole };
  }
  if (c.sequence) {
    let v = c.start;
    const steps = [{ label: 'Start', value: v }];
    for (const pct of c.sequence) { v = compound(v, pct); steps.push({ label: `${pct > 0 ? '+' : ''}${pct}%`, value: v }); }
    return { kind: 'sequence', steps, end: v, net: relative(c.start, v) };
  }
  return {
    kind: 'change', from: c.from, to: c.to,
    absolute: absolute(c.from, c.to),
    relative: relative(c.from, c.to),
    points: c.isShare ? points(c.from, c.to) : null
  };
}
