// Volume 0, chapter 05. SQL foundations.
//
// SQL is taught here as the language for asking a question of a table without
// changing what the table means. Everything in chapter 03 about grain and keys
// becomes operational: the clauses are learned in the order the database runs
// them, because that order is what makes GROUP BY and WHERE behave the way they
// do, and it is the part that is almost never explained.

export const SHARED_FOUNDATIONS_PART_FIVE = Object.freeze({
  id: 'SHARED-FOUNDATIONS-PART-FIVE',
  status: 'AI_DRAFT · AUTHORING ONLY',
  title: 'SQL Foundations',
  subtitle: 'Part Five of Volume 0',
  totalMinutes: 255,
  sessions: Object.freeze([
    Object.freeze({
      id: 'select', number: '01', title: 'Asking a table a question', studyMinutes: 35, playMinutes: 25,
      objective: 'Read a simple query as choosing rows first and columns second.',
      opening: 'A query is not a program that walks through the table. It is a description of the result you want, and the database decides how to get it.',
      sections: Object.freeze([
        Object.freeze({ heading: 'Rows, then columns', paragraphs: Object.freeze([
          'A basic query names a table, a condition that keeps some of its rows, and the columns to show. It is written SELECT columns FROM table WHERE condition, but it is easier to understand read backwards: start with the table, discard the rows that fail the condition, then keep the columns asked for.',
          'Selecting columns never changes how many rows come back, and filtering rows never changes which columns exist. Keeping those two effects separate in your head prevents most early confusion about why a result has the shape it has.'
        ]) }),
        Object.freeze({ heading: 'Conditions and the third answer', paragraphs: Object.freeze([
          'Conditions compare values: equal, greater, between, in a list. The complication is the one from chapter 03. A comparison against an absent value is neither true nor false but unknown, so a row where the column is null fails both a condition and its opposite.',
          'This is why counting rows where a value is above a threshold, plus rows where it is not, may come to less than the table holds. The missing rows are not lost; they never answered. Testing for absence needs its own clause rather than a comparison.'
        ]) }),
        Object.freeze({ heading: 'Order is a presentation, not a property', paragraphs: Object.freeze([
          'A table has no inherent order. Rows come back in whatever order is convenient unless an ordering is requested, and that order can change between runs as the data grows or the plan changes. A report that depends on unsorted output is a report that will eventually be wrong without anybody changing it.',
          'Sorting and limiting are also a common source of quiet error: taking the first ten rows without saying what they are first by returns ten arbitrary rows, which looks exactly like a top ten.'
        ]) })
      ]),
      example: Object.freeze({ title: 'One query, read backwards', headers: Object.freeze(['Clause', 'What it does', 'Effect on the result']), rows: Object.freeze([
        Object.freeze(['FROM sale', 'names the table', 'grain: one completed sale']),
        Object.freeze(['WHERE basket_total > 20', 'discards rows', 'fewer rows, same columns']),
        Object.freeze(['SELECT sale_id, branch_id', 'chooses columns', 'same rows, fewer columns']),
        Object.freeze(['ORDER BY basket_total DESC', 'arranges', 'presentation only'])
      ]) }),
      workbook: Object.freeze({ title: 'Fifteen-minute query in words', prompt: 'Take any table you can picture: a contacts list, a bank statement, a fixture list.', steps: Object.freeze([
        'Write a question you would ask it, in plain language.',
        'Underline the part that decides which rows.',
        'Circle the part that decides which columns.',
        'Write the query in SQL order, then check nothing you underlined ended up in SELECT.'
      ]) }),
      check: Object.freeze({
        prompt: 'A table has 500 rows. 300 have basket_total above 20, 150 have it below, and 50 have it null. What does the count for "above 20" plus "not above 20" come to?',
        answer: '450',
        options: Object.freeze([
          ['500', '500, because every row is one or the other'],
          ['450', '450, because rows with a null answer neither condition'],
          ['550', '550, because null rows are counted twice']
        ]),
        explanation: 'A comparison with null is unknown, not false, so those 50 rows are excluded by both conditions. They have to be asked for explicitly with a test for absence.'
      }),
      practice: Object.freeze({ title: 'What Does One Row Represent?', href: '?mode=game&mission=table-grain', instruction: 'Before writing a query, state the grain of the table you are querying.' }),
      sources: Object.freeze([
        Object.freeze({ label: 'PostgreSQL — SELECT', url: 'https://www.postgresql.org/docs/current/sql-select.html' }),
        Object.freeze({ label: 'PostgreSQL — comparison functions and NULL', url: 'https://www.postgresql.org/docs/current/functions-comparison.html' })
      ])
    }),

    Object.freeze({
      id: 'group', number: '02', title: 'Grouping changes the grain on purpose', studyMinutes: 35, playMinutes: 30,
      objective: 'Say what one row of a grouped result represents, and why filtering happens twice.',
      opening: 'Grouping is the first thing in SQL that changes what a row means. Before it, one row was one sale. After it, one row is one branch, and everything you can ask has changed with it.',
      sections: Object.freeze([
        Object.freeze({ heading: 'The group is the new grain', paragraphs: Object.freeze([
          'Grouping by a column collapses every row sharing a value into one output row. The columns named in the grouping survive as themselves; everything else has to be reduced to a single value by an aggregate such as a count, a sum, a minimum or an average.',
          'This is the grain statement from chapter 03, written as a clause. Group by branch and one row is one branch. Group by branch and business date and one row is one branch-day. Naming the new grain out loud is the check that the result answers the question you asked.'
        ]) }),
        Object.freeze({ heading: 'Filtering before and after', paragraphs: Object.freeze([
          'Rows are filtered before grouping, and groups are filtered after. Discarding refunded sales is a decision about which rows go into the groups. Keeping only branches with more than a hundred sales is a decision about which groups survive, and it cannot be made until the groups exist.',
          'Putting an aggregate in the row filter is the classic error, and the database refuses it for a real reason: at the moment rows are filtered, no group has been formed and the count does not yet exist.'
        ]) }),
        Object.freeze({ heading: 'Counting what you meant to count', paragraphs: Object.freeze([
          'Counting rows counts rows at the current grain, which after grouping is not the grain you started with. Counting distinct values of a column is a different question and often the one intended: how many branches appear, rather than how many sales they made between them.',
          'Aggregates also ignore absent values, so an average is over the rows that had one. That is usually right and occasionally very wrong, and it is invisible unless you also count how many rows contributed.'
        ]) })
      ]),
      example: Object.freeze({ title: 'The same table, three grains', headers: Object.freeze(['Query', 'One row is', 'Row count']), rows: Object.freeze([
        Object.freeze(['no grouping', 'one completed sale', '4,312']),
        Object.freeze(['GROUP BY branch_id', 'one branch', '48']),
        Object.freeze(['GROUP BY branch_id, business_date', 'one branch on one date', '1,392'])
      ]) }),
      workbook: Object.freeze({ title: 'Twenty-minute grouping plan', prompt: 'Use the same table you described in the previous session.', steps: Object.freeze([
        'Write a question that needs one answer per group.',
        'Name the grouping columns, and write the new grain as a sentence.',
        'Decide which filters apply to rows and which to groups.',
        'Say what your count is counting, at the new grain.'
      ]) }),
      check: Object.freeze({
        prompt: 'You group sales by branch and want only branches with more than 100 sales. Where does that condition belong?',
        answer: 'after',
        options: Object.freeze([
          ['before', 'In the row filter, alongside the other conditions'],
          ['after', 'In the group filter, because the count does not exist until groups are formed'],
          ['either', 'Either: the database will produce the same result']
        ]),
        explanation: 'Rows are filtered before grouping, so no count exists at that point. A condition on an aggregate has to wait until the groups have been formed, which is what the HAVING clause is for.'
      }),
      practice: Object.freeze({ title: 'Keys and Duplicate Records', href: '?mode=game&mission=duplicate-records', instruction: 'Group by a key and keep the groups appearing more than once: the duplicate check is a grouping query.' }),
      sources: Object.freeze([
        Object.freeze({ label: 'PostgreSQL — SELECT', url: 'https://www.postgresql.org/docs/current/sql-select.html' }),
        Object.freeze({ label: 'Statistics Canada — statistical units', url: 'https://www150.statcan.gc.ca/n1/pub/11-634-x/2016001/section1/chap3-eng.htm' })
      ])
    }),

    Object.freeze({
      id: 'join', number: '03', title: 'Joining without changing what a row is', studyMinutes: 40, playMinutes: 30,
      objective: 'Predict a join’s effect on the row count before running it.',
      opening: 'Two tables, one key, and a query that succeeds. The row count went from four thousand to twelve thousand, nothing raised an error, and the revenue figure computed afterwards is now three times too large.',
      sections: Object.freeze([
        Object.freeze({ heading: 'A join is a matching rule', paragraphs: Object.freeze([
          'Joining takes each row of one table and finds the rows of another whose key matches. If every left row matches exactly one right row, the result has the same number of rows and simply gains columns. That is the safe shape, and it happens when the key is unique in the table on the right.',
          'If the key repeats on the right, a left row matches several and appears several times. Nothing is wrong with the data or the query. The result is simply at a new grain, and every total computed from it is computed at that new grain.'
        ]) }),
        Object.freeze({ heading: 'Which rows survive', paragraphs: Object.freeze([
          'An inner join keeps only rows that matched, which quietly discards the ones that did not. Joining sales to returns with an inner join answers a question about returns, however the query is named, because every sale never returned has vanished.',
          'A left join keeps every row of the first table and fills the missing side with nulls. That preserves the original population and hands you the absence problem from chapter 03: the nulls now mean no match, which is a different thing from a value that was never recorded.'
        ]) }),
        Object.freeze({ heading: 'Check the count, every time', paragraphs: Object.freeze([
          'The cheapest habit in SQL is to count the rows before the join and after it, and to have a prediction in mind before looking. Equal means the grain held. Larger means the right side repeated. Smaller means an inner join dropped rows that did not match.',
          'Each of those three is fine when it is what you intended. The failure is not knowing which happened, because every one of them returns a result that looks perfectly reasonable.'
        ]) })
      ]),
      example: Object.freeze({ title: 'Three joins from the same 4,312 sales', headers: Object.freeze(['Join', 'Rows out', 'What happened']), rows: Object.freeze([
        Object.freeze(['sale to branch', '4,312', 'unique key: columns added, grain held']),
        Object.freeze(['sale to sale_line', '11,983', 'key repeats: now one row per line']),
        Object.freeze(['sale to return, inner', '176', 'unmatched sales discarded'])
      ]) }),
      workbook: Object.freeze({ title: 'Twenty-minute join prediction', prompt: 'Take any two lists that share an identifier: orders and items, people and addresses.', steps: Object.freeze([
        'Write how many rows each list has.',
        'Decide whether the identifier repeats in the second list.',
        'Predict the row count after joining, and write it down before checking.',
        'Write one sentence saying what a row of the result represents.'
      ]) }),
      check: Object.freeze({
        prompt: 'You join 2,140 products to a price history where each product has several dated prices. What comes back?',
        answer: 'more',
        options: Object.freeze([
          ['same', '2,140 rows, one per product, with the price attached'],
          ['more', 'More than 2,140: one row per price version of each product'],
          ['fewer', 'Fewer than 2,140, because products without prices are dropped']
        ]),
        explanation: 'The key repeats in the price history, once per version, so each product meets every one of its prices. To get one row per product you must first say which date you meant.'
      }),
      practice: Object.freeze({ title: 'Join Without Changing the Grain', href: '?mode=game&mission=join-grain', instruction: 'Predict the cardinality and the result grain for six joins before seeing the answer.' }),
      sources: Object.freeze([
        Object.freeze({ label: 'PostgreSQL — joined tables', url: 'https://www.postgresql.org/docs/current/queries-table-expressions.html' }),
        Object.freeze({ label: 'PostgreSQL — SELECT', url: 'https://www.postgresql.org/docs/current/sql-select.html' })
      ])
    }),

    Object.freeze({
      id: 'verify', number: '04', title: 'Checking a result before believing it', studyMinutes: 35, playMinutes: 25,
      objective: 'Run a short set of checks on any query result before it leaves your screen.',
      opening: 'The query ran. That is evidence about the syntax and nothing else. Whether the answer is right is a separate question, and it has to be asked deliberately.',
      sections: Object.freeze([
        Object.freeze({ heading: 'The result is a table with a grain', paragraphs: Object.freeze([
          'Everything from chapter 03 applies to a query result exactly as it applies to a stored table. It has a grain, it may have duplicate keys, it may contain absences, and a row count means something only once the grain is stated. The result of a query is not automatically cleaner than what went into it.',
          'So the first check is to say what one row of the result represents. If that sentence is hard to write, the query is doing something you have not understood yet, and no amount of formatting will fix it.'
        ]) }),
        Object.freeze({ heading: 'Cheap checks that catch most errors', paragraphs: Object.freeze([
          'Count the rows and compare with what you expected. Count the distinct values of the key and see whether it equals the row count. Look for nulls in the columns you are about to sum. Compare a total against a known figure from another route, even a rough one.',
          'None of these needs new skills, and together they catch the majority of everyday mistakes. They take a minute, which is far less than the time spent explaining a wrong number after it has been circulated.'
        ]) }),
        Object.freeze({ heading: 'Keep the query with the answer', paragraphs: Object.freeze([
          'A figure quoted without the query that produced it cannot be checked or repeated, which is the provenance problem from chapter 03 in a new setting. The query is the activity; the tables are the entities; the number is the derivation.',
          'Saving the query alongside the result, with the date it was run, costs nothing and is what makes a number an answer rather than an assertion.'
        ]) })
      ]),
      example: Object.freeze({ title: 'Four checks on any result', headers: Object.freeze(['Check', 'What it catches']), rows: Object.freeze([
        Object.freeze(['row count against expectation', 'a join that changed the grain']),
        Object.freeze(['distinct keys against row count', 'duplicates introduced by the query']),
        Object.freeze(['nulls in summed columns', 'an average over fewer rows than you think']),
        Object.freeze(['total against a known figure', 'everything else'])
      ]) }),
      workbook: Object.freeze({ title: 'Fifteen-minute checklist', prompt: 'Take any number that was given to you recently at work or in the news.', steps: Object.freeze([
        'Write the grain of the table it must have come from.',
        'Write which of the four checks you could apply if you had the data.',
        'Name the one that would most likely catch an error.',
        'Write the one question you would ask the person who produced it.'
      ]) }),
      check: Object.freeze({
        prompt: 'After a join, the row count is unchanged but the revenue total has doubled. What is the most likely cause?',
        answer: 'columns',
        options: Object.freeze([
          ['grain', 'The join changed the grain, so rows were multiplied'],
          ['columns', 'The total is summing a column that now appears from both tables, or a different column than before'],
          ['nulls', 'Nulls were introduced by the join']
        ]),
        explanation: 'An unchanged row count rules out the fan-out. If the rows did not multiply but the total did, the arithmetic is being done over different columns than it was before.'
      }),
      practice: Object.freeze({ title: 'Trace the Number', href: '?mode=game&mission=data-lineage', instruction: 'Keep the query with the answer: the entity, the activity and the derivation, in SQL.' }),
      sources: Object.freeze([
        Object.freeze({ label: 'PostgreSQL — SELECT', url: 'https://www.postgresql.org/docs/current/sql-select.html' }),
        Object.freeze({ label: 'W3C PROV Overview', url: 'https://www.w3.org/TR/prov-overview/' })
      ])
    })
  ])
});
