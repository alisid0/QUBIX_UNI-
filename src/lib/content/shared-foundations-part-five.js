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
  totalMinutes: 43,
  sessions: Object.freeze([
    Object.freeze({
      id: 'select', number: '01', title: 'Asking a table a question', studyMinutes: 8, playMinutes: 5,
      objective: 'Read a simple query as choosing rows first and columns second.',
      audioSummary: 'Picture a data workshop. The building infrastructure is the server host; a room can represent a database or schema; a labelled cabinet is a table; each drawer is a row; and the labelled partitions in every drawer are columns. A customer or bank-account cabinet keeps one master row per identifier, while a transaction cabinet legitimately repeats the account identifier because every payment is a separate event. In SQL, FROM names the cabinet, WHERE chooses drawers, SELECT chooses visible partitions, and ORDER BY arranges the result. The database still works with logical sets rather than walking physical drawers in this order.',
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
      workshopLab: Object.freeze({
        kind:'select', title:'Open the cabinet, keep drawers, reveal partitions',
        mapping:Object.freeze([
          Object.freeze(['Workshop building','server host']), Object.freeze(['Workshop room','database or schema']), Object.freeze(['Labelled cabinet','table']),
          Object.freeze(['Drawer or slip','row']), Object.freeze(['Labelled partition','column']), Object.freeze(['Unique serial label','primary key'])
        ]),
        paragraphs:Object.freeze([
          'Keep stable things in a master cabinet: one bank account, customer or branch per unique identifier. Keep events in a separate ledger: every payment or sale is another row. The account identifier repeats in transactions because many legitimate events belong to the same account; repetition is not automatically duplication.',
          'Try the controls below. FROM opens the sale container. WHERE removes rows that do not satisfy the condition. SELECT changes which columns are visible. This is the logical result you request—not necessarily the physical order in which the database engine performs the work.'
        ]),
        limit:'A server is not literally one room or even always one machine: a server process or managed service can host several databases, and one database can be replicated across machines. Tables and columns are logical structures, while the query optimiser chooses the physical access plan.'
      }),
      example: Object.freeze({ title: 'One query, read backwards', headers: Object.freeze(['Clause', 'What it does', 'Effect on the result']), rows: Object.freeze([
        Object.freeze(['FROM sale', 'names the table', 'grain: one completed sale']),
        Object.freeze(['WHERE basket_total > 20', 'discards rows', 'fewer rows, same columns']),
        Object.freeze(['SELECT sale_id, branch_id', 'chooses columns', 'same rows, fewer columns']),
        Object.freeze(['ORDER BY basket_total DESC', 'arranges', 'presentation only'])
      ]) }),
      figure: Object.freeze({
        kind: 'query',
        stages: Object.freeze([
          Object.freeze({ clause: 'FROM sales' }),
          Object.freeze({ clause: 'WHERE basket_total > 20', where: 'over20' }),
          Object.freeze({ clause: 'GROUP BY branch_id', where: 'over20', groupBy: 'branch' })
        ]),
        caption: 'Figure 1 · What each clause does to a row',
        note: 'Every count here is the SQL Console actually running that clause over the same twelve sales. Filtering removes rows and leaves each one meaning a sale. Grouping replaces them, and one row now means a branch.'
      }),
      rehearsal: Object.freeze({
        mission: 'sql-console',
        lead: 'The first task in the console at the end of this session is below. The console runs your clause against twelve real sales rows, so decide the clause here and you will already know what the result should be.',
        cases: Object.freeze([
          Object.freeze({
            caseId: 'filter',
            facts: Object.freeze([
              Object.freeze(['The request', 'How many sales were over £20?']),
              Object.freeze(['What you are given', 'Twelve sales are in the table. Keep the rows that qualify and nothing else.']),
              Object.freeze(['Which clause it fills', 'where']),
              Object.freeze(['Rows the console will return', '6'])
            ]),
            question: 'Twelve rows go in and six come out. Has the grain changed: does one row still mean one sale?',
            answer: 'No. One row still means one sale.',
            why: 'Six of the twelve baskets are over £20. Filtering keeps rows and changes nothing about what a row means, which is what separates WHERE from GROUP BY: one removes rows, the other replaces them with rows about groups.'
          })
        ]),
        closing: 'Keep asking that question after every clause you add. A query that has quietly changed what one row represents will still return a number, and the number will still look reasonable.'
      }),
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
      practice: Object.freeze({ title: 'The SQL Console', href: '?mode=game&mission=sql-console', instruction: 'Assemble the query one clause at a time and watch the row count answer you.' }),
      sources: Object.freeze([
        Object.freeze({ label: 'PostgreSQL — SELECT', url: 'https://www.postgresql.org/docs/current/sql-select.html' }),
        Object.freeze({ label: 'PostgreSQL — comparison functions and NULL', url: 'https://www.postgresql.org/docs/current/functions-comparison.html' })
      ])
    }),

    Object.freeze({
      id: 'group', number: '02', title: 'Grouping changes the grain on purpose', studyMinutes: 5, playMinutes: 5,
      objective: 'Say what one row of a grouped result represents, and why filtering happens twice.',
      audioSummary: 'Imagine sorting individual sale slips into work trays labelled by branch. Before sorting, each slip is one sale. After grouping, each tray produces one summary row, so the grain changes to one branch. WHERE decides which original slips enter the sorting process. An aggregate such as COUNT or SUM writes one measurement on each completed tray. HAVING then decides which completed trays remain. SQL does not physically move the stored records; the trays describe the logical grouped result.',
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
      workshopLab: Object.freeze({
        kind:'group', title:'Sort event slips into summary trays',
        mapping:Object.freeze([
          Object.freeze(['Individual sale slip','source row']), Object.freeze(['Tray label','GROUP BY key']), Object.freeze(['Tray tally','aggregate']),
          Object.freeze(['Reject slip first','WHERE']), Object.freeze(['Reject tray later','HAVING']), Object.freeze(['One completed tray','one result row'])
        ]),
        paragraphs:Object.freeze([
          'Grouping is a deliberate repacking of meaning. Four sale slips can become two branch trays. The output is not a shorter list of sales: it is a new table whose rows represent branches and whose measurements summarise the slips inside each group.',
          'Move through the stages. Notice that HAVING cannot judge a tray count before the slips have been grouped and counted. That is why a condition on an aggregate belongs after GROUP BY rather than in WHERE.'
        ]),
        limit:'GROUP BY does not physically rearrange the stored table, and a database may use hashing, sorting or another execution strategy. The tray is a model of the logical grouping. Aggregates can also treat NULL differently, so COUNT(*) and COUNT(column) are not interchangeable.'
      }),
      example: Object.freeze({ title: 'The same table, three grains', headers: Object.freeze(['Query', 'One row is', 'Row count']), rows: Object.freeze([
        Object.freeze(['no grouping', 'one completed sale', '4,312']),
        Object.freeze(['GROUP BY branch_id', 'one branch', '48']),
        Object.freeze(['GROUP BY branch_id, business_date', 'one branch on one date', '1,392'])
      ]) }),
      rehearsal: Object.freeze({
        mission: 'sql-console',
        lead: 'A task from the console at the end of this session. The console runs your clause against the same twelve sales, so you can settle the answer here first.',
        cases: Object.freeze([
          Object.freeze({
            caseId: 'group',
            facts: Object.freeze([
              Object.freeze(['The request', 'How many sales did each branch make?']),
              Object.freeze(['What to watch', 'Watch the row count while you add the grouping clause.']),
              Object.freeze(['Rows the console returns', '3'])
            ]),
            question: 'Twelve rows go in and three come out. Does one row still mean one sale?',
            answer: 'No. One row now means one branch.',
            why: 'Grouping by a column makes that column the grain. Counting rows now counts branches. This is the difference from WHERE, which removed rows and left every survivor still meaning a sale.'
          })
        ]),
        closing: 'Three rows is not a smaller answer to the same question, it is an answer to a different one. Ask what one row means after every clause, because the number will look reasonable either way.'
      }),
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
      practice: Object.freeze({ title: 'The SQL Console', href: '?mode=game&mission=sql-console', instruction: 'Group twelve sales into three branches, and watch the grain move while you do it.' }),
      sources: Object.freeze([
        Object.freeze({ label: 'PostgreSQL — SELECT', url: 'https://www.postgresql.org/docs/current/sql-select.html' }),
        Object.freeze({ label: 'Statistics Canada — statistical units', url: 'https://www150.statcan.gc.ca/n1/pub/11-634-x/2016001/section1/chap3-eng.htm' })
      ])
    }),

    Object.freeze({
      id: 'join', number: '03', title: 'Joining without changing what a row is', studyMinutes: 5, playMinutes: 5,
      objective: 'Predict a join’s effect on the row count before running it.',
      audioSummary: 'A join is like using a label on an event slip to look up a master record in another cabinet. A primary key is unique in the master cabinet. The same value may repeat as a foreign key in the event ledger because one branch or account can have many events. When each event finds exactly one master record, the join adds descriptive columns and preserves the event grain. If the supposed master key repeats, one event finds several matches and the result multiplies. That is join cardinality, and predicting it protects totals from inflation.',
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
      workshopLab: Object.freeze({
        kind:'join', title:'Match event labels to the master cabinet',
        mapping:Object.freeze([
          Object.freeze(['Master serial label','primary key']), Object.freeze(['Label copied onto event','foreign key']), Object.freeze(['Look up matching label','JOIN condition']),
          Object.freeze(['One matching master card','many-to-one join']), Object.freeze(['Several matching cards','row multiplication']), Object.freeze(['No matching card','unmatched row'])
        ]),
        paragraphs:Object.freeze([
          'Uniqueness belongs on the “one” side. A branch identifier should occur once in the branch master and may occur thousands of times in sales. Those repeated foreign keys express a real one-to-many relationship; deleting them would delete legitimate events.',
          'Switch the master cabinet below from unique to duplicated. The SQL remains valid, but each Northgate sale now finds two matching master cards. The result grows and any repeated sale amount would inflate a later total.'
        ]),
        limit:'Real joins are not physical lookups between cabinets and can be one-to-one, one-to-many or many-to-many. INNER, LEFT, RIGHT and FULL joins also make different promises about unmatched rows. A foreign-key constraint can protect references, but it does not by itself guarantee every analytical join preserves grain.'
      }),
      example: Object.freeze({ title: 'Three joins from the same 4,312 sales', headers: Object.freeze(['Join', 'Rows out', 'What happened']), rows: Object.freeze([
        Object.freeze(['sale to branch', '4,312', 'unique key: columns added, grain held']),
        Object.freeze(['sale to sale_line', '11,983', 'key repeats: now one row per line']),
        Object.freeze(['sale to return, inner', '176', 'unmatched sales discarded'])
      ]) }),
      rehearsal: Object.freeze({
        mission: 'join-grain',
        lead: 'The join you will be asked to predict at the end of this session. Predict it here, before the mission shows you the result.',
        cases: Object.freeze([
          Object.freeze({
            caseId: 'sale-line',
            facts: Object.freeze([
              Object.freeze(['Joining', 'sale · sale_line']),
              Object.freeze(['On the key', 'sale_id']),
              Object.freeze(['Rows on each side', '4312 · 11983']),
              Object.freeze(['Why', 'A basket holds several products, and each one is its own line. sale_id repeats down sale_line.'])
            ]),
            question: 'One sale meets how many rows in sale_line, and what does that do to the result?',
            answer: 'Several, one per product line, so the result grows.',
            why: 'sale_id is not unique in sale_line, so one sale meets every line in its basket. The result is 11,983 rows, not 4,312. Summing basket_total here counts each basket once per line and inflates revenue.'
          })
        ]),
        closing: 'The join is not wrong. It answers a question about product lines rather than about sales, and the only way to be caught out by it is to have expected the other one.'
      }),
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
      id: 'verify', number: '04', title: 'Checking a result before believing it', studyMinutes: 5, playMinutes: 5,
      objective: 'Run a short set of checks on any query result before it leaves your screen.',
      audioSummary: 'A completed query is like a packed dispatch from the workshop. The fact that the machinery ran proves only that the instruction was valid. Before dispatch, write what one output row represents, compare the expected and actual row counts, inspect key uniqueness and unmatched records, and reconcile a known count or total. These checks are assertions about meaning, not formatting. A result should leave the workshop only when its grain, population and important totals agree with what the analytical question required.',
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
      workshopLab: Object.freeze({
        kind:'verify', title:'Complete the dispatch manifest',
        mapping:Object.freeze([
          Object.freeze(['Packed dispatch','query result']), Object.freeze(['Contents description','grain statement']), Object.freeze(['Parcel count','row-count check']),
          Object.freeze(['Serial-number audit','key check']), Object.freeze(['Missing component','NULL or unmatched row']), Object.freeze(['Dispatch record','saved query and run date'])
        ]),
        paragraphs:Object.freeze([
          'A workshop does not dispatch a crate merely because the packing machine completed. It checks that the crate contains the expected kind and number of items. A SQL result deserves the same separation between execution and verification.',
          'Complete the manifest below. Each check answers a different failure mode: unexpected grain, row multiplication or loss, broken relationships, and totals that no longer reconcile.'
        ]),
        limit:'A checklist cannot prove an analysis is true. It tests explicit expectations and catches common contradictions. Stronger systems automate these assertions, preserve query versions and test results against independently defined controls.'
      }),
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
      practice: Object.freeze({ title: 'The SQL Console', href: '?mode=game&mission=sql-console', instruction: 'Read every result before believing it: row count, grain, and whether the clause could run at all.' }),
      sources: Object.freeze([
        Object.freeze({ label: 'PostgreSQL — SELECT', url: 'https://www.postgresql.org/docs/current/sql-select.html' }),
        Object.freeze({ label: 'W3C PROV Overview', url: 'https://www.w3.org/TR/prov-overview/' })
      ])
    })
  ])
});
