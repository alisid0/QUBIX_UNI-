// Chapter 05 had no game. Its four sessions all sent the learner to missions
// borrowed from other chapters, which is the gap this closes.
//
// The console is not a quiz about SQL. The learner assembles a query one clause
// at a time and the result is computed from the rows below, live, so the row
// count and the grain change while they watch. That is the thing a book cannot
// do: chapter 05 can say that grouping changes what a row means, and only this
// can let somebody watch twelve sales become three branches.
//
// The dataset is small enough to check by hand, which is deliberate. A learner
// who does not believe the answer can count the rows.

export const SALES = Object.freeze([
  Object.freeze({ sale_id: 'S-1041', branch_id: 'B-17', business_date: '2026-05-04', basket_total: 18.70 }),
  Object.freeze({ sale_id: 'S-1042', branch_id: 'B-17', business_date: '2026-05-04', basket_total: 6.25 }),
  Object.freeze({ sale_id: 'S-1043', branch_id: 'B-08', business_date: '2026-05-04', basket_total: 31.40 }),
  Object.freeze({ sale_id: 'S-1044', branch_id: 'B-17', business_date: '2026-05-05', basket_total: 22.10 }),
  Object.freeze({ sale_id: 'S-1045', branch_id: 'B-02', business_date: '2026-05-05', basket_total: 9.80 }),
  Object.freeze({ sale_id: 'S-1046', branch_id: 'B-08', business_date: '2026-05-05', basket_total: 44.05 }),
  Object.freeze({ sale_id: 'S-1047', branch_id: 'B-17', business_date: '2026-05-05', basket_total: 27.60 }),
  Object.freeze({ sale_id: 'S-1048', branch_id: 'B-02', business_date: '2026-05-06', basket_total: 15.00 }),
  Object.freeze({ sale_id: 'S-1049', branch_id: 'B-08', business_date: '2026-05-06', basket_total: 3.99 }),
  Object.freeze({ sale_id: 'S-1050', branch_id: 'B-17', business_date: '2026-05-06', basket_total: 51.20 }),
  Object.freeze({ sale_id: 'S-1051', branch_id: 'B-17', business_date: '2026-05-06', basket_total: 12.45 }),
  Object.freeze({ sale_id: 'S-1052', branch_id: 'B-02', business_date: '2026-05-06', basket_total: 24.30 })
]);

/**
 * Runs the assembled query against the rows above. Real filtering and real
 * grouping: nothing here is a canned answer, so a learner who counts by hand
 * gets the same number the console prints.
 */
export function runQuery({ where, groupBy, having }) {
  let rows = SALES.map(r => ({ ...r }));

  // Rows are filtered before grouping. That order is the whole of chapter 05.
  if (where === 'over20') rows = rows.filter(r => r.basket_total > 20);
  if (where === 'branch17') rows = rows.filter(r => r.branch_id === 'B-17');
  if (where === 'under10') rows = rows.filter(r => r.basket_total < 10);
  if (where === 'may06') rows = rows.filter(r => r.business_date === '2026-05-06');

  if (!groupBy) {
    return { grain: 'one completed sale', columns: ['sale_id', 'branch_id', 'business_date', 'basket_total'], rows };
  }

  const KEYS = {
    branch: r => r.branch_id,
    date: r => r.business_date,
    'branch-date': r => `${r.branch_id} · ${r.business_date}`
  };
  const key = KEYS[groupBy] || KEYS.branch;
  const map = new Map();
  for (const r of rows) {
    const k = key(r);
    const g = map.get(k) || { group: k, sales: 0, total: 0 };
    g.sales += 1;
    g.total += r.basket_total;
    map.set(k, g);
  }
  let grouped = [...map.values()].map(g => ({ ...g, total: Math.round(g.total * 100) / 100 }));

  // Groups are filtered after grouping, which is why the count can be used
  // here and could not be used above.
  if (having === 'over2') grouped = grouped.filter(g => g.sales > 2);
  if (having === 'over3') grouped = grouped.filter(g => g.sales > 3);
  // A condition on a sum rather than a count: still a group filter, and still
  // impossible to write before the groups exist.
  if (having === 'total50') grouped = grouped.filter(g => g.total > 50);

  const GRAINS = { branch: 'one branch', date: 'one business date', 'branch-date': 'one branch on one business date' };
  const COLS = { branch: 'branch_id', date: 'business_date', 'branch-date': 'branch_id · business_date' };
  const col = COLS[groupBy] || COLS.branch;
  return {
    grain: GRAINS[groupBy] || GRAINS.branch,
    columns: [col, 'sales', 'total'],
    rows: grouped.map(g => ({ [col]: g.group, sales: g.sales, total: g.total }))
  };
}

export function queryText({ where, groupBy, having }) {
  const NAMED = { branch: 'branch_id', date: 'business_date', 'branch-date': 'branch_id, business_date' };
  const select = groupBy
    ? `SELECT ${NAMED[groupBy]}, COUNT(*) AS sales, SUM(basket_total) AS total`
    : 'SELECT *';
  const lines = [select, 'FROM sale'];
  if (where === 'over20') lines.push('WHERE basket_total > 20');
  if (where === 'branch17') lines.push("WHERE branch_id = 'B-17'");
  if (where === 'under10') lines.push('WHERE basket_total < 10');
  if (where === 'may06') lines.push("WHERE business_date = '2026-05-06'");
  if (groupBy === 'branch') lines.push('GROUP BY branch_id');
  if (groupBy === 'date') lines.push('GROUP BY business_date');
  if (groupBy === 'branch-date') lines.push('GROUP BY branch_id, business_date');
  if (having === 'over2') lines.push('HAVING COUNT(*) > 2');
  if (having === 'over3') lines.push('HAVING COUNT(*) > 3');
  if (having === 'total50') lines.push('HAVING SUM(basket_total) > 50');
  return lines.join('\n');
}

export const SQL_CONSOLE_MISSION = Object.freeze({
  id: 'MISSION 102', status: 'AI_DRAFT', role: 'ANALYST', title: 'The SQL Console',
  competency: 'Assemble a query one clause at a time, across eight tasks, and say what one row of each result represents.',
  sources: Object.freeze([
    Object.freeze({ label: 'PostgreSQL — SELECT', url: 'https://www.postgresql.org/docs/current/sql-select.html' }),
    Object.freeze({ label: 'PostgreSQL — joined tables', url: 'https://www.postgresql.org/docs/current/queries-table-expressions.html' }),
    Object.freeze({ label: 'Statistics Canada — statistical units', url: 'https://www150.statcan.gc.ca/n1/pub/11-634-x/2016001/section1/chap3-eng.htm' })
  ]),
  cases: Object.freeze([
    Object.freeze({
      id: 'filter', slot: 'where',
      brief: 'How many sales were over £20?',
      hint: 'Twelve sales are in the table. Keep the rows that qualify and nothing else.',
      target: { where: 'over20', groupBy: null, having: null },
      expectRows: 6,
      clause: 'over20',
      clauseOptions: Object.freeze([
        ['branch17', "WHERE branch_id = 'B-17'", 'filters by branch, not by size'],
        ['over20', 'WHERE basket_total > 20', 'keeps the rows the question asks for'],
        ['none', 'No filter', 'returns every sale']
      ]),
      clauseWhy: 'Six of the twelve baskets are over £20. Filtering keeps rows and changes nothing about what a row means.',
      grain: 'sale',
      grainOptions: Object.freeze([
        ['sale', 'One completed sale', 'filtering does not change the grain'],
        ['branch', 'One branch', 'nothing has been grouped'],
        ['over20', 'One sale over £20', 'a description of the filter, not the grain']
      ]),
      grainWhy: 'A filter changes which rows are present, never what a row represents. The grain is still one completed sale.'
    }),

    Object.freeze({
      id: 'group', slot: 'groupBy',
      brief: 'How many sales did each branch make?',
      hint: 'Watch the row count while you add the grouping clause.',
      target: { where: null, groupBy: 'branch', having: null },
      expectRows: 3,
      clause: 'branch',
      clauseOptions: Object.freeze([
        ['branch-date', 'GROUP BY branch_id, business_date', 'one row per branch per day, which is more than asked'],
        ['none', 'No grouping', 'leaves one row per sale'],
        ['branch', 'GROUP BY branch_id', 'collapses every sale of a branch into one row']
      ]),
      clauseWhy: 'Twelve sales became three rows, one per branch. The row count is now a number of branches and not a number of sales.',
      grain: 'branch',
      grainOptions: Object.freeze([
        ['sale', 'One completed sale', 'that was the grain before grouping'],
        ['branch', 'One branch', 'the grouping columns are the new grain'],
        ['branch-date', 'One branch on one date', 'that would need the date in the grouping too']
      ]),
      grainWhy: 'Grouping by a column makes that column the grain. Counting rows now counts branches.'
    }),

    Object.freeze({
      id: 'having', slot: 'having',
      brief: 'Which branches made more than three sales?',
      hint: 'The count does not exist until the groups do.',
      target: { where: null, groupBy: 'branch', having: 'over3' },
      expectRows: 1,
      clause: 'over3',
      clauseOptions: Object.freeze([
        ['over2', 'HAVING COUNT(*) > 2', 'keeps branches with three or more'],
        ['where', 'WHERE COUNT(*) > 3', 'rejected: no count exists when rows are filtered'],
        ['over3', 'HAVING COUNT(*) > 3', 'filters the groups, after they are formed']
      ]),
      clauseWhy: 'Only B-17 made more than three sales, so one group survives. The same condition in WHERE is refused, because rows are filtered before any group exists.',
      grain: 'branch',
      grainOptions: Object.freeze([
        ['branch', 'One branch', 'filtering groups does not change what a group is'],
        ['sale', 'One completed sale', 'the grouping already moved past that'],
        ['busy', 'One busy branch', 'a description of the filter, not the grain']
      ]),
      grainWhy: 'Filtering groups removes rows from the result and leaves the grain alone, exactly as filtering rows did in the first case.'
    }),

    Object.freeze({
      id: 'both', slot: 'groupBy',
      brief: 'On which branch-days did a branch take more than two sales over £20?',
      hint: 'Two filters, and they belong on either side of the grouping.',
      target: { where: 'over20', groupBy: 'branch-date', having: 'over2' },
      expectRows: 0,
      clause: 'branch-date',
      clauseOptions: Object.freeze([
        ['branch', 'GROUP BY branch_id', 'loses the day the question asks about'],
        ['none', 'No grouping', 'no groups means no counts to filter'],
        ['branch-date', 'GROUP BY branch_id, business_date', 'one row per branch per day']
      ]),
      clauseWhy: 'With the £20 filter applied first, no branch took more than two qualifying sales on a single day, so the result is empty. An empty result is an answer.',
      grain: 'branch-date',
      grainOptions: Object.freeze([
        ['branch-date', 'One branch on one business date', 'both grouping columns together'],
        ['branch', 'One branch', 'the date is in the grouping too'],
        ['sale', 'One completed sale', 'grouping has happened']
      ]),
      grainWhy: 'Neither column alone identifies a row: a branch appears on several days and a day covers several branches. The pair is the grain.'
    }),

    Object.freeze({
      id: 'date', slot: 'where',
      brief: 'How many sales happened on 6 May?',
      hint: 'The same shape as the first task, against a different column.',
      target: { where: 'may06', groupBy: null, having: null },
      expectRows: 5,
      clause: 'may06',
      clauseOptions: Object.freeze([
        ['under10', 'WHERE basket_total < 10', 'filters by size, not by day'],
        ['may06', "WHERE business_date = '2026-05-06'", 'keeps one day of trading'],
        ['none', 'No filter', 'returns all three days']
      ]),
      clauseWhy: 'Five of the twelve sales fall on 6 May. A date is compared like any other value, and the grain is untouched.',
      grain: 'sale',
      grainOptions: Object.freeze([
        ['date', 'One business date', 'nothing has been grouped by date'],
        ['sale', 'One completed sale', 'still one row per sale'],
        ['branch', 'One branch', 'no grouping at all']
      ]),
      grainWhy: 'Filtering to one day narrows which sales are present. It does not turn the table into a table of days.'
    }),

    Object.freeze({
      id: 'perday', slot: 'groupBy',
      brief: 'How many sales did the shop take each day?',
      hint: 'Group by something other than the branch this time.',
      target: { where: null, groupBy: 'date', having: null },
      expectRows: 3,
      clause: 'date',
      clauseOptions: Object.freeze([
        ['date', 'GROUP BY business_date', 'one row per trading day'],
        ['branch', 'GROUP BY branch_id', 'answers a different question'],
        ['branch-date', 'GROUP BY branch_id, business_date', 'splits each day by branch as well']
      ]),
      clauseWhy: 'Three trading days, so three rows: 3, 4 and 5 sales. The same clause as task 2, pointed at another column.',
      grain: 'date',
      grainOptions: Object.freeze([
        ['branch', 'One branch', 'the branch is not in the grouping'],
        ['sale', 'One completed sale', 'grouping has already happened'],
        ['date', 'One business date', 'the grouping column is the grain']
      ]),
      grainWhy: 'Whatever you group by becomes the grain. Counting rows here counts days, not sales and not branches.'
    }),

    Object.freeze({
      id: 'sum', slot: 'having',
      brief: 'Which branches took more than £50 in total?',
      hint: 'A group filter again, but on a sum rather than a count.',
      target: { where: null, groupBy: 'branch', having: 'total50' },
      expectRows: 2,
      clause: 'total50',
      clauseOptions: Object.freeze([
        ['over2', 'HAVING COUNT(*) > 2', 'filters on how many, not how much'],
        ['where', 'WHERE SUM(basket_total) > 50', 'rejected: no sum exists when rows are filtered'],
        ['total50', 'HAVING SUM(basket_total) > 50', 'filters the groups on their total']
      ]),
      clauseWhy: 'B-17 took £138.30 and B-08 £79.44, so two branches survive. B-02 took £49.10 and does not. A sum is an aggregate, so it belongs where the count did.',
      grain: 'branch',
      grainOptions: Object.freeze([
        ['branch', 'One branch', 'filtering groups leaves the grain alone'],
        ['sale', 'One completed sale', 'the grouping moved past that'],
        ['big', 'One branch over £50', 'a description of the filter, not the grain']
      ]),
      grainWhy: 'Exactly as in task 3: removing groups changes which rows are present and never what a row means.'
    }),

    Object.freeze({
      id: 'compound', slot: 'groupBy',
      brief: 'Which branch-days took more than £50?',
      hint: 'Both parts of the grain, and the filter from the previous task.',
      target: { where: null, groupBy: 'branch-date', having: 'total50' },
      expectRows: 1,
      clause: 'branch-date',
      clauseOptions: Object.freeze([
        ['date', 'GROUP BY business_date', 'loses the branch'],
        ['branch', 'GROUP BY branch_id', 'loses the day'],
        ['branch-date', 'GROUP BY branch_id, business_date', 'both, which is what a branch-day is']
      ]),
      clauseWhy: 'Only B-17 on 6 May clears £50, at £63.65. Grouping by either column alone answers a different question, and both alone looked reasonable.',
      grain: 'branch-date',
      grainOptions: Object.freeze([
        ['date', 'One business date', 'a day covers several branches'],
        ['branch-date', 'One branch on one business date', 'the pair identifies the row'],
        ['branch', 'One branch', 'a branch appears on several days']
      ]),
      grainWhy: 'Neither column alone is unique. The pair is, which is what makes a composite grain necessary rather than tidy.'
    })
  ])
});

export const answerForSql = (c, key) => (key === 'clause' ? c?.clause : c?.grain);
export const optionsForSql = (c, key) => (key === 'clause' ? c?.clauseOptions : c?.grainOptions) || [];
export const whyForSql = (c, key) => (key === 'clause' ? c?.clauseWhy : c?.grainWhy) || '';
