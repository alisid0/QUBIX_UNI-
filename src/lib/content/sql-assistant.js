import { searchSqlKnowledge, SQL_KNOWLEDGE_COUNT } from './sql-knowledge-index.js';

// Authored tutor responses plus a local course-material retriever. This file
// deliberately contains no model call: learner text stays in the browser.

const lesson = (key, title, config) => Object.freeze({
  key: `sql-read-${key}`,
  eyebrow: 'SQL READING ASSISTANT',
  title,
  search: searchSqlKnowledge,
  knowledgeCount: SQL_KNOWLEDGE_COUNT,
  ...config
});

export const SQL_READING_ASSISTANTS = Object.freeze({
  select: lesson('select', 'Asking a table a question', {
    welcome: 'I am looking at this session with you. I can translate the workshop model into SQL, give a graduated hint, or ask you to explain the idea back to me.',
    explain: 'Think of FROM as opening one labelled cabinet, WHERE as keeping only the drawers that meet a condition, and SELECT as revealing chosen partitions inside every surviving drawer. The exact SQL terms remain table, row and column.',
    hints: Object.freeze([
      'Read the query from its source: begin with FROM. What table supplies the rows?',
      'Next ask which rows survive. That is the job of WHERE.',
      'Only after the rows are settled, ask which columns must be shown. That is SELECT.'
    ]),
    quiz: Object.freeze({
      question: 'Which clause reduces the number of rows without changing what a row represents?',
      answers: Object.freeze(['where', 'filter']),
      success: 'Yes. WHERE removes rows that fail its condition, but every surviving row keeps the original grain.',
      retry: 'Look for the clause that tests every source row against a condition. Try the clause name.'
    }),
    reasoning: Object.freeze({
      prompt: 'In your own words, explain the difference between WHERE and SELECT.',
      terms: Object.freeze(['row', 'column']),
      success: 'That distinction is doing the real work: WHERE changes which rows survive; SELECT changes which columns are visible.',
      retry: 'You have part of it. Make two separate claims: one about rows and one about columns.'
    }),
    terminology: 'Precise version: FROM establishes the source relation, WHERE applies a row predicate, SELECT projects expressions or columns, and ORDER BY defines presentation order. SQL declares a logical result; the optimiser may use a different physical execution plan.',
    rules: Object.freeze([
      Object.freeze({ terms: ['null', 'missing'], response: 'A comparison with NULL evaluates to unknown, not true or false. Test absence with IS NULL or IS NOT NULL rather than = NULL.' }),
      Object.freeze({ terms: ['unique', 'repeat', 'transaction'], response: 'A primary key is unique in its own table. The same account identifier may legitimately repeat as a foreign key in a transaction table because one account can have many events.' })
    ]),
    fallback: 'I can help with FROM, WHERE, SELECT, ordering, NULL, or the difference between a unique master record and repeated transaction events.'
  }),

  group: lesson('group', 'Grouping changes the grain on purpose', {
    welcome: 'I am following the grouping lesson. Ask me to turn the tray analogy into exact SQL, reveal a hint one step at a time, or test whether the grain is clear.',
    explain: 'Each sale begins as one slip. GROUP BY sorts slips under a shared label and returns one summary row per label. WHERE can reject slips before grouping; HAVING can reject completed groups after aggregates exist.',
    hints: Object.freeze([
      'First state what one source row represents.',
      'Now name the column or columns that define one group.',
      'Finally decide whether the condition concerns an original row or a completed group.'
    ]),
    quiz: Object.freeze({
      question: 'Which clause filters groups using a value such as COUNT(*)?',
      answers: Object.freeze(['having']),
      success: 'Correct. HAVING runs after grouping, when an aggregate such as COUNT(*) exists.',
      retry: 'WHERE is too early because the groups and their counts do not exist yet. Try the post-group filter.'
    }),
    reasoning: Object.freeze({
      prompt: 'Explain why GROUP BY branch_id changes the grain.',
      terms: Object.freeze(['branch', 'row']),
      success: 'Exactly: the result now has one row per branch, rather than one row per sale.',
      retry: 'Complete this sentence in your own words: “After grouping, one row represents …”'
    }),
    terminology: 'Precise version: GROUP BY defines equivalence groups from the grouping expressions. Aggregate functions reduce the rows in each group to values. WHERE filters input rows; HAVING filters grouped result rows.',
    rules: Object.freeze([
      Object.freeze({ terms: ['count', 'null'], response: 'COUNT(*) counts rows. COUNT(column) counts rows where that column is not NULL. Those are different questions whenever values are absent.' }),
      Object.freeze({ terms: ['grain'], response: 'The grouping columns define the result grain. GROUP BY branch_id means one result row per branch; adding business_date makes it one branch-day.' })
    ]),
    fallback: 'Ask me about GROUP BY, aggregates, WHERE versus HAVING, NULL in counts, or how grouping changes the grain.'
  }),

  join: lesson('join', 'Joining without changing what a row is', {
    welcome: 'I am looking at the join lesson. I will help you predict cardinality before giving away a result, because a valid query can still multiply rows.',
    explain: 'An event slip carries a copied label—a foreign key. A join uses it to find a master record. If the master label is unique, each event finds at most one match. If it repeats, one event may match several rows and fan out.',
    hints: Object.freeze([
      'Choose the table whose grain you want the result to preserve.',
      'Inspect the join key on the other side. Is it unique there?',
      'Predict zero, one or several matches for each starting row before running the join.'
    ]),
    quiz: Object.freeze({
      question: 'To preserve one sale per row while adding branch details, where must branch_id be unique?',
      answers: Object.freeze(['branch', 'master', 'right', 'one side']),
      success: 'Yes. It must be unique in the branch master—the “one” side—so each sale finds at most one branch row.',
      retry: 'The identifier may repeat across sales. Think about the cabinet that should contain only one record per branch.'
    }),
    reasoning: Object.freeze({
      prompt: 'Explain why repeated branch_id values are acceptable in sales but dangerous in the branch master.',
      terms: Object.freeze(['many', 'one']),
      success: 'Good. Sales are the many side of a legitimate one-to-many relationship; the branch master is the one side and requires uniqueness.',
      retry: 'Frame the relationship explicitly: which table is the “one” side and which is the “many” side?'
    }),
    terminology: 'Precise version: the primary key is unique on the referenced side; the foreign key may repeat on the referencing side. Join cardinality determines whether rows are preserved, removed or multiplied. Join type determines what happens to unmatched rows.',
    rules: Object.freeze([
      Object.freeze({ terms: ['duplicate', 'fan'], response: 'If a join key repeats on the side expected to be unique, each matching left row appears once for every match. This fan-out can inflate later sums without producing a SQL error.' }),
      Object.freeze({ terms: ['left', 'inner'], response: 'An INNER JOIN removes unmatched starting rows. A LEFT JOIN preserves every left row and represents missing matches with NULL values on the right.' })
    ]),
    fallback: 'Ask me about primary and foreign keys, one-to-many relationships, INNER versus LEFT JOIN, unmatched rows, or join fan-out.'
  }),

  verify: lesson('verify', 'Checking a result before believing it', {
    welcome: 'I am looking at the verification lesson. I can help you examine a result without treating successful execution as proof that the answer is correct.',
    explain: 'A query result is a dispatch crate. Before it leaves, label what one row represents, count the rows, check keys and missing matches, and reconcile a known total. Running successfully only means the SQL was executable.',
    hints: Object.freeze([
      'Start with meaning: write one sentence defining one output row.',
      'Compare the actual row count with a prediction made before the query ran.',
      'Then test uniqueness, unmatched rows, NULL values and one independent control total.'
    ]),
    quiz: Object.freeze({
      question: 'What is the first sentence you should be able to write about any query result?',
      answers: Object.freeze(['one row', 'grain', 'represents']),
      success: 'Correct. State what one output row represents—the result grain—before interpreting its count or totals.',
      retry: 'Begin with the unit represented by a single output record.'
    }),
    reasoning: Object.freeze({
      prompt: 'Explain why a query running without an error does not prove its result is correct.',
      terms: Object.freeze(['syntax', 'meaning']),
      success: 'Exactly. Successful execution validates syntax and available objects, not whether the result has the intended meaning.',
      retry: 'Separate what execution proves about syntax from what verification must establish about meaning.'
    }),
    terminology: 'Precise version: verification asserts the result grain, expected cardinality, key uniqueness, unmatched and NULL behaviour, and reconciliation against an independently defined control. Provenance preserves the query, inputs and run date.',
    rules: Object.freeze([
      Object.freeze({ terms: ['row count', 'count'], response: 'A row count is useful only beside an expected count and a grain statement. Equal counts do not prove correctness, but an unexplained difference is a strong warning.' }),
      Object.freeze({ terms: ['prove', 'correct'], response: 'No short checklist proves truth. It tests explicit expectations and catches contradictions; stronger systems automate assertions and compare with independent controls.' })
    ]),
    fallback: 'Ask me about grain statements, expected row counts, key checks, NULL or unmatched rows, reconciliation, or query provenance.'
  })
});

export function sqlConsoleAssistant(c, step) {
  const grouping = Boolean(c?.target?.groupBy);
  return Object.freeze({
    key: `sql-console-${c?.id || 'complete'}-${step?.key || 'done'}`,
    eyebrow: 'SQL CONSOLE ASSISTANT',
    title: c?.brief || 'Console complete',
    search: searchSqlKnowledge,
    knowledgeCount: SQL_KNOWLEDGE_COUNT,
    welcome: c
      ? `I can see the current task and the ${step.label.toLowerCase()} step. I will help you inspect the result without selecting an answer for you.`
      : 'You completed the console. I can help you summarise what changed across filtering, grouping and group filtering.',
    explain: c
      ? `${c.hint} The useful evidence is already on screen: compare the clause, row count and grain before deciding.`
      : 'Across the console, WHERE changed which source rows survived, GROUP BY changed what one result row represented, and HAVING filtered those grouped rows.',
    hints: Object.freeze(c ? [
      step.key === 'clause' ? 'Name the thing the condition tests: an original row, a grouping key, or an aggregate that exists only after grouping.' : 'Ignore the filter description. Complete only this sentence: “One row of this result represents …”',
      c.hint,
      grouping ? 'Look at the columns named by GROUP BY. Together, they define the result grain.' : 'No grouping has occurred, so filtering cannot change what the original row represents.'
    ] : ['Compare filtering, grouping and HAVING.', 'Say the grain before and after each clause.', 'Use row counts as evidence, not as meaning by themselves.']),
    quiz: Object.freeze({
      question: grouping ? 'Has this task grouped the source sales into a new grain? Answer yes or no, then say why.' : 'Can filtering alone change what one source row represents? Answer yes or no.',
      answers: Object.freeze(grouping ? ['yes', 'group'] : ['no']),
      success: grouping ? 'Yes. The grouping column or columns define a new result grain.' : 'Correct. Filtering changes which rows survive, not what each surviving row represents.',
      retry: 'Use the visible GROUP BY clause—or its absence—as your evidence.'
    }),
    reasoning: Object.freeze({
      prompt: 'State what the row count tells you and what the grain tells you. Keep them as two separate claims.',
      terms: Object.freeze(['row', 'represent']),
      success: 'Good separation. Row count tells you how many result records exist; grain tells you what each record represents.',
      retry: 'Use both phrases: “the row count…” and “one row represents…”'
    }),
    terminology: step?.theory || 'A SQL result has both cardinality—the number of rows—and grain—the meaning of one row. Neither substitutes for the other.',
    rules: Object.freeze([
      Object.freeze({ terms: ['answer', 'which option'], response: 'I will not choose the option, but I will help you decide: identify whether the condition acts on source rows or on groups, then inspect the live row count.' }),
      Object.freeze({ terms: ['grain', 'row'], response: grouping ? 'Because GROUP BY is present, use its column or column pair to finish: “one row represents …”' : 'Because no GROUP BY is present, the result keeps the source grain: each surviving row is still an original sale.' })
    ]),
    fallback: 'I can help you interpret the current clause, row count and grain. I will guide the decision without selecting the mission answer.'
  });
}
