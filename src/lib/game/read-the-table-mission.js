// Read the Table: eight small decisions across four familiar tables.
//
// This replaces Classify Store Data as the mission after session 2. That
// mission asked for twenty-four field classifications and taught data types,
// which chapter 3 teaches and chapter 1 has not prepared. The session it
// followed taught rows and columns, so the reading and the doing disagreed.
//
// Two decisions per table, always in the same order: what one row contains,
// then what one column contains. Nothing here classifies a value, and no
// column is ever described as asking a question. A column contains.
//
// The fourth table is a recap. It introduces no vocabulary; its options are
// drawn from the three tables already seen, so the learner has to tell them
// apart rather than pick the only plausible answer on screen.

/** Four tables, each carrying its own two decisions. */
const TABLES = Object.freeze([
    Object.freeze({
      id: 'customers',
      name: 'customers',
      lead: 'Four people who joined the loyalty scheme.',
      headers: Object.freeze(['customer_id', 'name', 'postcode', 'joined']),
      rows: Object.freeze([
        Object.freeze(['C-2041', 'A. Okafor', 'NW1 8QT', '4 March']),
        Object.freeze(['C-2042', 'R. Silva', 'LS2 7HD', '4 March']),
        Object.freeze(['C-2043', 'M. Byrne', 'NW1 3PL', '5 March']),
        Object.freeze(['C-2044', 'J. Haddad', 'BS1 5TR', '6 March'])
      ]),
      row: Object.freeze({
        index: 2,
        prompt: 'One row contains details about…',
        answer: 'customer',
        options: Object.freeze([
          Object.freeze(['visit', 'one visit a customer made to the shop']),
          Object.freeze(['customer', 'one customer']),
          Object.freeze(['everyone', 'every customer in the scheme'])
        ]),
        why: 'The highlighted row is one person: C-2043, M. Byrne. A recorded case like this is called an observation.',
        retry: 'Look at what changes between rows. Each one is a different person, not a different visit.'
      }),
      column: Object.freeze({
        index: 2,
        prompt: 'This column contains…',
        answer: 'postcode',
        options: Object.freeze([
          Object.freeze(['branch', 'the branch each customer shops at']),
          Object.freeze(['one', 'the postcode NW1 3PL']),
          Object.freeze(['postcode', 'the postcode of each customer'])
        ]),
        why: 'Customer postcode is recorded for every row, so it is a variable. It holds one value per customer, not one value for the table.',
        retry: 'A column runs down the whole table. It holds the same kind of detail in every row, not a single value.'
      })
    }),

    Object.freeze({
      id: 'sales',
      name: 'sales',
      lead: 'Four completed sales from one morning.',
      headers: Object.freeze(['sale_id', 'branch', 'items', 'total_paid']),
      rows: Object.freeze([
        Object.freeze(['S-1041', 'Camden', '3', '£18.70']),
        Object.freeze(['S-1042', 'Camden', '1', '£6.25']),
        Object.freeze(['S-1043', 'Leeds', '7', '£41.10']),
        Object.freeze(['S-1044', 'Leeds', '2', '£9.80'])
      ]),
      row: Object.freeze({
        index: 2,
        prompt: 'One row contains details about…',
        answer: 'sale',
        options: Object.freeze([
          Object.freeze(['sale', 'one completed sale']),
          Object.freeze(['product', 'one product that was sold']),
          Object.freeze(['branch', 'one branch of the shop'])
        ]),
        why: 'Everything in the highlighted row belongs to sale S-1043. Seven items were bought, and they are one sale, not seven rows.',
        retry: 'Camden appears twice and Leeds appears twice, so a row is not a branch. Look at what appears exactly once.'
      }),
      column: Object.freeze({
        index: 3,
        prompt: 'This column contains…',
        answer: 'total',
        options: Object.freeze([
          Object.freeze(['takings', 'the total taken by the shop that morning']),
          Object.freeze(['total', 'the total paid for each sale']),
          Object.freeze(['price', 'the price of one product'])
        ]),
        why: 'Total paid is a variable: one value in every row, belonging to that sale. Adding the column would give the morning takings, but the column itself holds four separate totals.',
        retry: 'There are four values in the column, one per sale. That is not one number for the whole morning.'
      })
    }),

    Object.freeze({
      id: 'products',
      name: 'products',
      lead: 'Four products the shop stocks.',
      headers: Object.freeze(['product_id', 'name', 'supplier', 'shelf']),
      rows: Object.freeze([
        Object.freeze(['P-118', 'Oat milk 1L', 'Northvale', 'A3']),
        Object.freeze(['P-119', 'Rye loaf', 'Coombe Bakery', 'B1']),
        Object.freeze(['P-120', 'Free-range eggs 6', 'Marsh Farm', 'B4']),
        Object.freeze(['P-121', 'Tinned tomatoes', 'Northvale', 'C2'])
      ]),
      row: Object.freeze({
        index: 1,
        prompt: 'One row contains details about…',
        answer: 'product',
        options: Object.freeze([
          Object.freeze(['sale', 'one time that product was sold']),
          Object.freeze(['supplier', 'one supplier']),
          Object.freeze(['product', 'one product'])
        ]),
        why: 'The highlighted row is the rye loaf. It stays one row whether it sells once today or four hundred times.',
        retry: 'Northvale appears in two rows, so a row is not a supplier. Look at what each row is a record of.'
      }),
      column: Object.freeze({
        index: 2,
        prompt: 'This column contains…',
        answer: 'supplier',
        options: Object.freeze([
          Object.freeze(['supplier', 'the supplier of each product']),
          Object.freeze(['count', 'how many suppliers the shop uses']),
          Object.freeze(['name', 'the name of each product'])
        ]),
        why: 'Supplier is a variable recorded for every product. Two rows share Northvale, and a variable is allowed to repeat.',
        retry: 'The column holds a supplier in each row. Counting the different ones is something you could do afterwards, not what the column contains.'
      })
    }),

    Object.freeze({
      id: 'deliveries',
      name: 'deliveries',
      lead: 'Four deliveries that arrived last week. Same two questions, no new words.',
      recap: true,
      headers: Object.freeze(['delivery_id', 'supplier', 'arrived', 'boxes']),
      rows: Object.freeze([
        Object.freeze(['D-77', 'Northvale', 'Mon 07:10', '14']),
        Object.freeze(['D-78', 'Marsh Farm', 'Tue 06:45', '6']),
        Object.freeze(['D-79', 'Northvale', 'Thu 07:05', '11']),
        Object.freeze(['D-80', 'Coombe Bakery', 'Fri 06:20', '9'])
      ]),
      row: Object.freeze({
        index: 3,
        prompt: 'One row contains details about…',
        answer: 'delivery',
        options: Object.freeze([
          Object.freeze(['supplier', 'one supplier']),
          Object.freeze(['product', 'one product that was delivered']),
          Object.freeze(['delivery', 'one delivery']),
          Object.freeze(['box', 'one box that was unloaded'])
        ]),
        why: 'One row is one delivery. D-80 brought nine boxes and it is still one row, in the same way S-1043 held seven items and was one sale.',
        retry: 'Nine boxes arrived in the highlighted row and the table has four rows, so a row is not a box.'
      }),
      column: Object.freeze({
        index: 1,
        prompt: 'This column contains…',
        answer: 'supplier',
        options: Object.freeze([
          Object.freeze(['boxes', 'the boxes carried on each delivery']),
          Object.freeze(['arrived', 'the time each delivery arrived']),
          Object.freeze(['deliveries', 'how many deliveries Northvale made']),
          Object.freeze(['supplier', 'the supplier each delivery came from'])
        ]),
        why: 'Supplier is the variable in the highlighted column, and it repeats: Northvale sent two of these four deliveries. The other three answers describe the other columns, or something you would work out from them.',
        retry: 'Check which column is highlighted, then read down it. Three of these answers describe a different column.'
      })
    })
]);

export const READ_THE_TABLE_MISSION = Object.freeze({
  id: 'read-the-table',
  title: 'Read the Table',
  brief: 'Four tables from the shop. For each one, say what a row contains and what a column contains.',
  teaches: 'What one row contains, and what one column records across every row.',
  tables: TABLES,

  // The two words this mission puts a name to, both defined by statistical
  // bodies rather than by us, and both used here in exactly their sense.
  sources: Object.freeze([
    Object.freeze({ label: 'Statistics Canada: observations and variables',
      url: 'https://www150.statcan.gc.ca/n1/edu/power-pouvoir/ch1/definitions/5214853-eng.htm' }),
    Object.freeze({ label: 'Australian Bureau of Statistics: data units and records',
      url: 'https://www.abs.gov.au/statistics/understanding-statistics/statistical-terms-and-concepts/data' })
  ]),

  // The eight decisions as one flat list, in the order they are met.
  //
  // check-missions reads this to test that the correct answer is not always in
  // the same position, and it can only do that if every decision is visible at
  // one level. It caught this mission with all eight answers sitting at index
  // zero, where the top button would have been right every time.
  cases: Object.freeze(TABLES.flatMap(table => [
    Object.freeze({ id: `${table.id}-row`, table: table.id, part: 'row',
      headers: table.headers, rows: table.rows, ...table.row }),
    Object.freeze({ id: `${table.id}-column`, table: table.id, part: 'column',
      headers: table.headers, rows: table.rows, ...table.column })
  ]))
});

export const DECISION_COUNT = READ_THE_TABLE_MISSION.tables.length * 2;

export const tableById = id => READ_THE_TABLE_MISSION.tables.find(t => t.id === id) || null;

/** The decision at a given place: table index plus which of the two questions. */
export const decisionAt = (tableIndex, part) => {
  const table = READ_THE_TABLE_MISSION.tables[tableIndex];
  return table ? table[part] : null;
};

export const isCorrect = (tableIndex, part, value) =>
  decisionAt(tableIndex, part)?.answer === value;
