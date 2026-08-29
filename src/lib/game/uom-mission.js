// Mission 019. One column, two kinds of number.
//
// `quantity` on a sale line is a count when the thing is sold by the each, and a
// weight when it is sold by the kilogram. `uom` is the only thing that says
// which, and nothing prevents you adding them together.
//
// Chain-wide, SUM(quantity) is 158,313.98. The decimal is the whole tell: you
// cannot buy 0.98 of an item, so the number is not a count of anything. It is
// 148,775 items plus 9,538.98 kilograms, added up as though they were the same
// substance.
//
// What makes this teachable rather than merely wrong is that the right answer
// can be checked. Counting a weighed line as one item gives 157,022, and the
// till's own `items` column on the sale header totals 157,022 as well. Two
// independent routes to the same figure is what confidence in a number looks
// like, and it is available here without leaving the database.
//
// Figures read from the sample database and asserted by check-uom.mjs.

export const UOM_FIGURES = Object.freeze({
  naiveSum: 158313.98,
  unitQuantity: 148775,
  weighedLines: 8247,
  kilograms: 9538.98,
  trueItems: 157022,
  headerItems: 157022,

  basket: Object.freeze({
    saleId: 'S-100007',
    branch: 'B-17',
    date: '2026-05-04',
    total: 28.03,
    naiveSum: 6.307,
    items: 6,
    lines: Object.freeze([
      Object.freeze({ no: 1, sku: 'QX-BAK-994', name: 'Bites Sauce', quantity: 1.821, uom: 'kg', unitPrice: 3.12, lineTotal: 5.68 }),
      Object.freeze({ no: 2, sku: 'QX-DRY-340', name: 'Reserve Rice', quantity: 2, uom: 'unit', unitPrice: 6.29, lineTotal: 12.58 }),
      Object.freeze({ no: 3, sku: 'QX-CHL-098', name: 'Meadow Rice', quantity: 0.486, uom: 'kg', unitPrice: 6.44, lineTotal: 3.13 }),
      Object.freeze({ no: 4, sku: 'QX-DRY-603', name: 'Crunch Coffee', quantity: 2, uom: 'unit', unitPrice: 3.32, lineTotal: 6.64 })
    ])
  })
});

export const UOM_MISSION = Object.freeze({
  id: 'MISSION 019',
  status: 'AI_DRAFT',
  role: 'ANALYST',
  title: 'SUM(quantity)',
  competency: 'Check that a column means one thing before aggregating it, and find a second route to the answer.',
  brief: 'Somebody reports 158,313.98 items sold. Nobody has ever bought 0.98 of an item.',

  sources: Object.freeze([
    Object.freeze({ label: 'PostgreSQL — aggregate functions', url: 'https://www.postgresql.org/docs/current/functions-aggregate.html' }),
    Object.freeze({ label: 'BIPM — the International System of Units', url: 'https://www.bipm.org/en/publications/si-brochure' }),
    Object.freeze({ label: 'Eurostat — quality reporting and units of measure', url: 'https://ec.europa.eu/eurostat/web/quality/european-quality-standards' })
  ]),

  cases: Object.freeze([
    Object.freeze({
      id: 'decimal',
      brief: 'A report says the chain sold 158,313.98 items in the window. What is the first thing to notice?',
      hint: 'Read the number itself before reading the query.',
      options: Object.freeze([
        'The figure is too large for the window.',
        'It should have been rounded before it was reported.',
        'A count cannot have a fractional part, so it is not counting what it claims to.',
        'Nothing. Averages produce decimals all the time.'
      ]),
      answer: 'A count cannot have a fractional part, so it is not counting what it claims to.',
      why: 'Nobody buys 0.98 of an item. A decimal in something labelled a count is the cheapest '
        + 'possible signal that the column is not what the label says, and it costs nothing to see. '
        + 'Rounding it would have hidden the only clue on the page.'
    }),
    Object.freeze({
      id: 'basket',
      brief: 'Basket S-100007 has four lines. Its quantities add to 6.307, and the receipt says 6 items. Where does the 0.307 come from?',
      hint: 'Two of the four lines are not counts.',
      options: Object.freeze([
        'Two lines are weighed goods, so their quantity is a weight in kilograms.',
        'A line was cancelled and partially refunded.',
        'The receipt rounds its item count down.',
        'One item was sold at a fraction of its normal price.'
      ]),
      answer: 'Two lines are weighed goods, so their quantity is a weight in kilograms.',
      why: '1.821 kg of one thing and 0.486 kg of another are two items at the till and 2.307 in '
        + 'the quantity column. The column holds counts and weights in the same place, and only '
        + 'uom distinguishes them.'
    }),
    Object.freeze({
      id: 'fix',
      brief: 'How do you count items correctly?',
      hint: 'A weighed line is one item however much it weighs.',
      options: Object.freeze([
        'ROUND(SUM(quantity)) — the fraction is small enough to ignore.',
        'SUM(quantity) WHERE uom = \'unit\' — only count the countable things.',
        'COUNT(*) — one line is one item.',
        'SUM(CASE WHEN uom = \'kg\' THEN 1 ELSE quantity END) — a weighed line counts as one.'
      ]),
      answer: 'SUM(CASE WHEN uom = \'kg\' THEN 1 ELSE quantity END) — a weighed line counts as one.',
      why: 'Filtering to units drops 8,247 weighed lines entirely and undercounts. COUNT(*) counts '
        + 'lines, not items, so two tins on one line become one. Rounding keeps the error and hides '
        + 'the evidence. Only the CASE says what a weighed line is worth.'
    }),
    Object.freeze({
      id: 'check',
      brief: 'That gives 157,022. The sale table has its own items column, recorded by the till, and it totals 157,022 as well. What has that bought you?',
      hint: 'Ask where the second number came from.',
      options: Object.freeze([
        'Nothing. The two figures come from the same rows, so of course they agree.',
        'A second, independent route to the same answer, which is what makes it trustworthy.',
        'Proof that the sale_line table is redundant and could be dropped.',
        'A reason to prefer the items column and stop computing it.'
      ]),
      answer: 'A second, independent route to the same answer, which is what makes it trustworthy.',
      why: 'The till wrote items when the sale happened; you derived the same figure from the lines '
        + 'afterwards. Two paths that were not copied from each other landing on the same number is '
        + 'the strongest cheap evidence available. Had they disagreed, you would have a real problem '
        + 'worth finding rather than a number worth reporting.'
    }),
    Object.freeze({
      id: 'weight',
      brief: 'Is the 9,538.98 kg from the weighed lines a useless number?',
      hint: 'It is not meaningless. It is just not items.',
      options: Object.freeze([
        'Yes. Mixed units make the whole column unusable.',
        'Yes, unless every product is converted to a common unit first.',
        'No. It is a perfectly good total of weight, and only becomes wrong when added to counts.',
        'No, but only if it is divided by the number of weighed lines.'
      ]),
      answer: 'No. It is a perfectly good total of weight, and only becomes wrong when added to counts.',
      why: 'Nine and a half tonnes of loose produce is a real figure that a buyer would want. The '
        + 'fault was never the weights, it was the addition. Splitting the column by uom gives two '
        + 'true numbers where adding it gave one false one.'
    }),
    Object.freeze({
      id: 'rule',
      brief: 'What is the general rule this leaves you with?',
      hint: 'Think about what the uom column is doing next to quantity.',
      options: Object.freeze([
        'A measure with a unit column beside it is more than one measure, and cannot be aggregated until you say which.',
        'Never use SUM on a column that allows decimals.',
        'Always store weights in a separate table from counts.',
        'Trust the source system’s own totals over anything you calculate.'
      ]),
      answer: 'A measure with a unit column beside it is more than one measure, and cannot be aggregated until you say which.',
      why: 'The unit column is not decoration and it is not metadata. It is part of the value. '
        + 'Wherever one exists, an aggregate that ignores it is adding unlike things, and the '
        + 'database will do it without complaint.'
    })
  ])
});

/** The basket, with the two readings of it, so the view cannot invent either. */
export function basketReadings() {
  const b = UOM_FIGURES.basket;
  return {
    ...b,
    weighedLines: b.lines.filter(l => l.uom === 'kg').length,
    weighedTotal: Math.round(b.lines.filter(l => l.uom === 'kg')
      .reduce((n, l) => n + l.quantity, 0) * 1000) / 1000
  };
}
