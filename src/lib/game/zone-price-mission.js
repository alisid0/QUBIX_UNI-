// Mission 018. "What does it cost?" is not a question with one answer.
//
// A buyer asks what Oat Crunch costs. There are at least three defensible
// numbers and they are all different:
//
//   2.85   the national list price on the product master
//   2.97   the average of the five zone prices
//   2.91   the average customers actually paid, weighted by what sold
//
// None of them is wrong. Each answers a different question, and only one of the
// three is what somebody usually means. The 2.97 is the interesting failure: it
// looks like an average price and is really an average of price *zones*, giving
// a shop with one branch the same weight as a zone with seven, and counting a
// price nobody paid.
//
// Because that is the other thing in here. PZ-VALUE lists Oat Crunch at 2.68 and
// sold none of it in this window. The price is real; the sales are absent. A
// learner who filters to "prices we actually charged" by joining through
// sale_line silently loses it.
//
// Figures read from the sample database and asserted by check-zone-price.mjs.

export const ZONE_PRICE_FIGURES = Object.freeze({
  sku: 'QX-CER-001',
  productName: 'Oat Crunch',
  unit: '750 g',
  listPrice: 2.85,
  unitsSold: 68,
  revenue: 197.70,
  meanOfZonePrices: 2.97,
  meanPricePaid: 2.91,
  zones: Object.freeze([
    Object.freeze({ zone: 'PZ-VALUE', name: 'Value', price: 2.68, branches: 2, units: 0 }),
    Object.freeze({ zone: 'PZ-CORE', name: 'Core', price: 2.85, branches: 7, units: 46 }),
    Object.freeze({ zone: 'PZ-URBAN', name: 'Urban', price: 2.96, branches: 4, units: 14 }),
    Object.freeze({ zone: 'PZ-REMOTE', name: 'Remote', price: 3.11, branches: 3, units: 6 }),
    Object.freeze({ zone: 'PZ-METRO', name: 'Metro', price: 3.25, branches: 1, units: 2 })
  ])
});

export const ZONE_PRICE_MISSION = Object.freeze({
  id: 'MISSION 018',
  status: 'AI_DRAFT',
  role: 'ANALYST',
  title: 'What Does It Cost?',
  competency: 'Give a price the grain it needs, and choose a weighting that answers the question actually asked.',
  brief: 'A buyer asks what Oat Crunch costs. Every number you can defend is a different number.',

  sources: Object.freeze([
    Object.freeze({ label: 'PostgreSQL — aggregate functions', url: 'https://www.postgresql.org/docs/current/functions-aggregate.html' }),
    Object.freeze({ label: 'ONS — price index methodology', url: 'https://www.ons.gov.uk/economy/inflationandpriceindices/methodologies/consumerpriceindicestechnicalmanual2019' }),
    Object.freeze({ label: 'Kimball — dimensional modelling techniques', url: 'https://www.kimballgroup.com/data-warehouse-business-intelligence-resources/kimball-techniques/dimensional-modeling-techniques/' })
  ]),

  cases: Object.freeze([
    Object.freeze({
      id: 'list',
      brief: 'You look up QX-CER-001 in the product master. list_price is 2.85. Is that what it costs?',
      hint: 'Ask what the product master is a record of.',
      options: Object.freeze([
        'Yes. The product table is the source of truth for price.',
        'It is the national list price. What a branch charges depends on its price zone.',
        'No. list_price is the cost we pay the supplier, not the shelf price.',
        'Only if the product is not on promotion this week.'
      ]),
      answer: 'It is the national list price. What a branch charges depends on its price zone.',
      why: 'The master carries one national list price. Every branch belongs to a price zone, '
        + 'and zone_price holds what that zone charges. 2.85 happens to be the Core zone price '
        + 'too, which is exactly why it is easy to look up the master and believe you are done.'
    }),
    Object.freeze({
      id: 'five',
      brief: 'zone_price gives five prices for this product: 2.68, 2.85, 2.96, 3.11 and 3.25. Which is the right one?',
      hint: 'Look at what each row is keyed by.',
      options: Object.freeze([
        'The lowest, 2.68. A customer will always find the cheapest.',
        'The most common, 2.85, since the Core zone has the most branches.',
        'All five. The question needs a branch before it has an answer.',
        'None. Five prices for one product means the table is broken.'
      ]),
      answer: 'All five. The question needs a branch before it has an answer.',
      why: 'A row in zone_price is one product in one zone, so a price is only a fact once you '
        + 'say where. "What does it cost" is underspecified in the same way "sales by region" '
        + 'was: the missing word is not in the data, it is in the request.'
    }),
    Object.freeze({
      id: 'average',
      brief: 'Somebody averages the five zone prices and reports 2.97 as the average price. What is wrong with it?',
      hint: 'Count what is being averaged, and what it is not.',
      options: Object.freeze([
        'Nothing. Five prices, one mean, correctly calculated.',
        'It should have used the median, because prices are skewed.',
        'It is out of date. Prices change, so any average is wrong by the time it is read.',
        'It averages zones rather than sales, so a zone with one branch counts as much as a zone with seven.'
      ]),
      answer: 'It averages zones rather than sales, so a zone with one branch counts as much as a zone with seven.',
      why: 'The arithmetic is right and the meaning is not. Metro has one branch and sold two '
        + 'units; Core has seven branches and sold forty-six. An unweighted mean over zones is '
        + 'a real number about the price list, and it is not a number about what anybody paid.'
    }),
    Object.freeze({
      id: 'paid',
      brief: 'Weighted by units sold, customers paid 2.91 on average. Why is that lower than the 2.97?',
      hint: 'Which zones did the volume come from?',
      options: Object.freeze([
        'Because most of the volume sold in the cheaper zones, so the cheap prices carry more weight.',
        'Because promotions reduced some of the prices below the zone price.',
        'Because the weighted mean always comes out below the unweighted one.',
        'Because returns were subtracted from the revenue.'
      ]),
      answer: 'Because most of the volume sold in the cheaper zones, so the cheap prices carry more weight.',
      why: 'Forty-six of the sixty-eight units went through Core at 2.85, and only two through '
        + 'Metro at 3.25. Weighting by what sold pulls the average toward the price most people '
        + 'actually met. A weighted mean is not always lower: it moves toward wherever the volume is.'
    }),
    Object.freeze({
      id: 'absent',
      brief: 'The Value zone lists this product at 2.68 and sold none of it in this window. If you compute prices by joining zone_price to sale_line, what happens to that row?',
      hint: 'An inner join keeps rows that match.',
      options: Object.freeze([
        'It is kept, with a quantity of zero.',
        'It is kept, because zone_price is the left table.',
        'It disappears, and the cheapest price we charge vanishes from the answer.',
        'The query fails, because there is nothing to join to.'
      ]),
      answer: 'It disappears, and the cheapest price we charge vanishes from the answer.',
      why: 'No sale line means no match, and an inner join drops the row without saying so. The '
        + 'price is real and the sales are absent, which are different things. Reporting a price '
        + 'range from that join understates the bottom of it and nothing looks wrong.'
    }),
    Object.freeze({
      id: 'ask',
      brief: 'The buyer wants one number for a negotiation. What do you give them?',
      hint: 'The useful answer names its own grain.',
      options: Object.freeze([
        'The average price paid, 2.91, stated as weighted by units over the window.',
        'The list price, 2.85, because it is the official figure.',
        'The range, 2.68 to 3.25, and nothing else.',
        'The highest, 3.25, so the negotiation starts from strength.'
      ]),
      answer: 'The average price paid, 2.91, stated as weighted by units over the window.',
      why: 'A number that carries its own definition can be checked, argued with and reproduced. '
        + 'The range is worth giving too, but on its own it does not answer what was asked. What '
        + 'makes this defensible is not the figure, it is the clause after it.'
    })
  ])
});

/** The three answers, so the view and the guard cannot disagree about them. */
export function competingAnswers() {
  const f = ZONE_PRICE_FIGURES;
  return [
    { label: 'List price on the product master', value: f.listPrice, note: 'one national figure' },
    { label: 'Mean of the five zone prices', value: f.meanOfZonePrices, note: 'averages zones, not sales' },
    { label: 'Mean price customers paid', value: f.meanPricePaid, note: `weighted by ${f.unitsSold} units` }
  ];
}
