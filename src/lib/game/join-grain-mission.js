// Mission 006. The sequel to grain and to keys: what a join does to the row.
//
// The mistake this mission exists for is the one that survives into working
// analyst jobs. A learner joins two tables, gets more rows than they started
// with, and reports the new number as if it still counted sales. Nothing warns
// them, because the query succeeded.
//
// Each case asks two questions in the order they matter. First how many rows on
// the right can match one row on the left, which is a question about the data
// and not about SQL. Then what one row of the result represents, which decides
// whether any number computed afterwards means anything.
//
// Six cases: two safe joins and four dangerous ones, dangerous for four
// different reasons. Repeating line items, optional events, time-versioned
// records, and a many-to-many bridge.
//
// The correct option is at a different position in every list. Mission 004
// ships with its answer first in all twelve of its questions, which can be
// beaten by pressing the top button and never reading anything.

export const JOIN_GRAIN_MISSION = Object.freeze({
  id: 'MISSION 006', status: 'AI_DRAFT', role: 'PRE-INTERN', title: 'Join Without Changing the Grain',
  competency: 'Predict what a join does to a table’s grain and row count before running it.',
  sources: Object.freeze([
    Object.freeze({ label: 'PostgreSQL — joined tables', url: 'https://www.postgresql.org/docs/current/queries-table-expressions.html' }),
    Object.freeze({ label: 'PostgreSQL — SELECT', url: 'https://www.postgresql.org/docs/current/sql-select.html' }),
    Object.freeze({ label: 'Statistics Canada — statistical units', url: 'https://www150.statcan.gc.ca/n1/pub/11-634-x/2016001/section1/chap3-eng.htm' })
  ]),
  cases: Object.freeze([
    Object.freeze({
      id: 'sale-branch',
      left: 'sale', right: 'branch', key: 'branch_id',
      leftGrain: 'one completed sale', leftRows: 4312, rightRows: 48,
      columns: ['sale_id', 'branch_id', 'basket_total', 'branch_name'],
      rows: [['S-1041', 'B-17', '18.70', 'Northgate'], ['S-1042', 'B-17', '6.25', 'Northgate'], ['S-1043', 'B-08', '31.40', 'Eastfield']],
      context: 'Every sale happens at exactly one branch, and a branch has one row in the branch table.',
      spans: 1, resultRows: 4312,
      matchAnswer: 'exactly one',
      matchOptions: ['exactly one', 'several, one per line', 'none, one, or several'],
      grain: 'one completed sale, with its branch name attached',
      grainOptions: ['one branch', 'one sale line', 'one completed sale, with its branch name attached'],
      matchExplanation: 'branch_id is unique in branch, so each sale finds exactly one match. This is the safe shape.',
      grainExplanation: 'The row count is unchanged at 4,312. A many-to-one join adds columns without adding rows.'
    }),
    Object.freeze({
      id: 'sale-line',
      left: 'sale', right: 'sale_line', key: 'sale_id',
      leftGrain: 'one completed sale', leftRows: 4312, rightRows: 11983,
      columns: ['sale_id', 'basket_total', 'line_no', 'sku'],
      rows: [['S-1041', '18.70', '1', 'QX-CER-001'], ['S-1041', '18.70', '2', 'QX-DRK-014'], ['S-1042', '6.25', '1', 'QX-TIN-032']],
      context: 'A basket holds several products, and each one is its own line. sale_id repeats down sale_line.',
      spans: 3, resultRows: 11983,
      matchAnswer: 'several, one per product line',
      matchOptions: ['exactly one', 'none or one', 'several, one per product line'],
      grain: 'one product line within one sale',
      grainOptions: ['one product line within one sale', 'one completed sale', 'one product'],
      matchExplanation: 'sale_id is not unique in sale_line, so one sale meets every line in its basket.',
      grainExplanation: 'The result is 11,983 rows, not 4,312. Summing basket_total here counts each basket once per line and inflates revenue.'
    }),
    Object.freeze({
      id: 'line-product',
      left: 'sale_line', right: 'product', key: 'sku',
      leftGrain: 'one product line within one sale', leftRows: 11983, rightRows: 2140,
      columns: ['sale_id', 'sku', 'quantity', 'product_name'],
      rows: [['S-1041', 'QX-CER-001', '1', 'Oat Crunch'], ['S-1041', 'QX-DRK-014', '2', 'Orchard Juice'], ['S-1042', 'QX-TIN-032', '3', 'Garden Peas']],
      context: 'The product master holds one current row for each SKU that has ever been sold.',
      spans: 1, resultRows: 11983,
      matchAnswer: 'exactly one',
      matchOptions: ['one per price change', 'exactly one', 'several, one per category'],
      grain: 'one product line within one sale, named',
      grainOptions: ['one product SKU', 'one product line within one sale, named', 'one completed sale'],
      matchExplanation: 'sku is the primary key of product, so every line finds one row and no line finds two.',
      grainExplanation: 'Still 11,983 rows. Attaching a name to something does not change what the something is.'
    }),
    Object.freeze({
      id: 'sale-return',
      left: 'sale', right: 'return', key: 'sale_id',
      leftGrain: 'one completed sale', leftRows: 4312, rightRows: 176,
      columns: ['sale_id', 'basket_total', 'return_id', 'refunded'],
      rows: [['S-1041', '18.70', 'R-0091', '3.40'], ['S-1044', '22.10', 'R-0092', '22.10'], ['S-1044', '22.10', 'R-0093', '0.00']],
      context: 'Most sales are never returned. A few are returned once, and a few are returned more than once.',
      spans: 2, resultRows: 176,
      matchAnswer: 'none, one, or several',
      matchOptions: ['exactly one', 'none, one, or several', 'always at least one'],
      grain: 'one return against one sale',
      grainOptions: ['one completed sale', 'one refunded amount', 'one return against one sale'],
      matchExplanation: 'A sale can have no return at all, which is why an inner join here throws away 4,136 sales that were perfectly fine.',
      grainExplanation: 'An inner join returns 176 rows, one per return. The joined table is about returns now, whatever it is named.'
    }),
    Object.freeze({
      id: 'product-price',
      left: 'product', right: 'price_history', key: 'sku',
      leftGrain: 'one product SKU', leftRows: 2140, rightRows: 9605,
      columns: ['sku', 'product_name', 'valid_from', 'unit_price'],
      rows: [['QX-CER-001', 'Oat Crunch', '2025-01-01', '3.10'], ['QX-CER-001', 'Oat Crunch', '2026-02-14', '3.40'], ['QX-DRK-014', 'Orchard Juice', '2025-06-30', '1.85']],
      context: 'Prices change through time, and every change keeps the old row rather than overwriting it.',
      spans: 4, resultRows: 9605,
      matchAnswer: 'one per price version',
      matchOptions: ['exactly one', 'one per branch', 'one per price version'],
      grain: 'one price version of one product',
      grainOptions: ['one price version of one product', 'one product SKU', 'one product on one date'],
      matchExplanation: 'sku repeats down price_history, once per version. This is the trap that looks safest, because product looks like a master table.',
      grainExplanation: 'The result is 9,605 rows for 2,140 products. To get one row per product you must first say which date you meant.'
    }),
    Object.freeze({
      id: 'promotion-product',
      left: 'promotion', right: 'promotion_product', key: 'promotion_id',
      leftGrain: 'one promotion campaign', leftRows: 63, rightRows: 1874,
      columns: ['promotion_id', 'promotion_name', 'sku', 'discount_pct'],
      rows: [['P-014', 'Autumn Breakfast', 'QX-CER-001', '15'], ['P-014', 'Autumn Breakfast', 'QX-CER-002', '15'], ['P-021', 'Juice Week', 'QX-DRK-014', '20']],
      context: 'A campaign covers many products, and a product can be in many campaigns. The bridge table records which pairs exist.',
      spans: 5, resultRows: 1874,
      matchAnswer: 'one per product in the campaign',
      matchOptions: ['one per product in the campaign', 'exactly one', 'one per branch in scope'],
      grain: 'one product within one promotion',
      grainOptions: ['one promotion campaign', 'one product within one promotion', 'one discounted sale'],
      matchExplanation: 'This is a many-to-many relationship, and the bridge table is what makes it answerable at all.',
      grainExplanation: '1,874 rows for 63 campaigns. Counting rows here counts campaign-product pairs, which is not a number of campaigns and not a number of products.'
    })
  ])
});

/** What the learner has to pick, for whichever half of the case they are on. */
export function answerForJoinCase(caseRecord, step) {
  if (!caseRecord) return undefined;
  return step === 'matches' ? caseRecord.matchAnswer : caseRecord.grain;
}

/** True when the join moves the row off the grain it started on. */
export function joinChangesGrain(caseRecord) {
  return caseRecord.resultRows !== caseRecord.leftRows;
}
