// Chapter 05.01's game. The first table a learner meets, and the first query.
//
// Everything on screen is real. These six people work at Northgate (B-17) in
// data-sample/employee.csv, with their real ids, roles, hours and start dates.
// The masterplan's rule for the learning world is that a lesson must not invent
// parallel rows when the canonical dataset can provide them, and this table is
// small enough that it did not have to.
//
// One fact is worth more than the rest of the mission. Across all 772 employees
// there are only 389 distinct names, so roughly half of them share a name with
// somebody. That is why a primary key is not a formality, and it is checked by
// scripts/check-employee-table.mjs against the file rather than asserted here.

export const EMPLOYEE_ROWS = Object.freeze([
  Object.freeze({ employee_id: 'E-204', name: 'Priya Raman', location_id: 'B-17', role: 'checkout', weekly_hours: 37.5, started: '2019-05-13' }),
  Object.freeze({ employee_id: 'E-311', name: 'Tomas Bihari', location_id: 'B-17', role: 'checkout', weekly_hours: 30, started: '2021-09-06' }),
  Object.freeze({ employee_id: 'E-118', name: 'Aoife Brennan', location_id: 'B-17', role: 'store-manager', weekly_hours: 40, started: '2015-02-02' }),
  Object.freeze({ employee_id: 'E-247', name: 'Marcus Ellery', location_id: 'B-17', role: 'section-lead', weekly_hours: 37.5, started: '2020-11-16' }),
  Object.freeze({ employee_id: 'E-402', name: 'Nadia Oyelaran', location_id: 'B-17', role: 'goods-in', weekly_hours: 37.5, started: '2022-03-28' }),
  Object.freeze({ employee_id: 'E-455', name: 'Callum Frayne', location_id: 'B-17', role: 'night-replen', weekly_hours: 16, started: '2024-01-15' })
]);

export const COLUMNS = Object.freeze(['employee_id', 'name', 'location_id', 'role', 'weekly_hours', 'started']);

/** The result a query returns, worked out from the rows rather than typed out. */
export function runQuery({ columns, where }) {
  const kept = where ? EMPLOYEE_ROWS.filter(where) : EMPLOYEE_ROWS;
  const shown = columns === '*' ? COLUMNS : columns;
  return { headers: shown, rows: kept.map(row => shown.map(column => String(row[column]))) };
}

const before2020 = row => row.started < '2020-01-01';

export const EMPLOYEE_TABLE_MISSION = Object.freeze({
  id: 'MISSION 101',
  status: 'AI_DRAFT',
  role: 'ANALYST',
  title: 'The Employee Table',
  competency: 'Read one table, say what a row and a column mean, name the column that identifies a row, and ask for the columns and rows you want.',
  sources: Object.freeze([
    Object.freeze({ label: 'PostgreSQL — SELECT', url: 'https://www.postgresql.org/docs/current/sql-select.html' }),
    Object.freeze({ label: 'SQLite — SELECT', url: 'https://www.sqlite.org/lang_select.html' })
  ]),
  cases: Object.freeze([
    Object.freeze({
      id: 'row',
      brief: 'What does one row of this table describe?',
      hint: 'Read across a single row and say what the whole line is about.',
      options: Object.freeze([
        ['branch', 'One branch', 'Every row here says B-17, so the branch repeats. It is a fact about the employee, not the subject of the row.'],
        ['employee', 'One employee', 'Read across and every value belongs to the same person.'],
        ['shift', 'One shift', 'Nothing here records a shift. weekly_hours is a contracted figure, not a day worked.']
      ]),
      answer: 'employee',
      why: 'The table stores one kind of thing, and that thing is an employee. Each row is one of them, and each column is one fact about them.',
      query: null
    }),
    Object.freeze({
      id: 'column',
      brief: 'A column called `contract` is added, holding permanent or casual. What has changed?',
      hint: 'Adding a column does not add people.',
      options: Object.freeze([
        ['more-facts', 'Every employee now has one more fact recorded', 'Six employees still, each with one extra thing known about them.'],
        ['more-rows', 'The table now has more rows', 'A column runs down the table. It adds a fact about everybody, not new people.'],
        ['new-table', 'A second table has been created', 'Columns are added to a table. Creating a table is a separate act.']
      ]),
      answer: 'more-facts',
      why: 'Columns decide what can be recorded. Rows hold the recordings. Adding a column widens every row at once.',
      query: null
    }),
    Object.freeze({
      id: 'key',
      brief: 'Which column could not be used to identify one employee?',
      hint: 'A column can only identify a row if no two rows share its value.',
      options: Object.freeze([
        ['employee_id', 'employee_id', 'Every employee has their own. That is what makes it the primary key.'],
        ['started', 'started', 'These six started on different days, but two people hired on the same day would break it.'],
        ['role', 'role', 'Two people here are on checkout, so the value does not pick out one row.']
      ]),
      answer: 'role',
      why: 'Across all 772 employees there are only 389 distinct names, so about half share a name with somebody. role repeats even in these six. employee_id is the primary key because it is the one column that never repeats.',
      query: null
    }),
    Object.freeze({
      id: 'select',
      brief: 'You want a list of names and nothing else. Which query gives you that?',
      hint: 'SELECT names the columns. FROM names the table.',
      options: Object.freeze([
        ['name', 'SELECT name FROM employee;', 'One column named, one column returned.'],
        ['star', 'SELECT * FROM employee;', 'That returns all six columns. You asked for one.'],
        ['from-name', 'SELECT employee FROM name;', 'The table and the column have swapped places.']
      ]),
      answer: 'name',
      why: 'SELECT chooses columns, FROM chooses the table. The table itself is untouched: it still has all six columns, and the result has one.',
      query: { columns: ['name'], where: null }
    }),
    Object.freeze({
      id: 'where',
      brief: 'Now you want only the people who started before 2020, with their role and start date.',
      hint: 'SELECT and FROM choose columns. Something else has to choose rows.',
      options: Object.freeze([
        ['no-where', 'SELECT name, role, started FROM employee;', 'Right columns, every row. Nothing has filtered anybody out.'],
        ['where', "SELECT name, role, started FROM employee WHERE started < '2020-01-01';", 'WHERE gives the database a condition, and only rows that meet it come back.'],
        ['wrong-op', "SELECT name, role, started FROM employee WHERE started > '2020-01-01';", 'That keeps the people who started later, which is the opposite set.']
      ]),
      answer: 'where',
      why: 'SELECT chooses the columns, FROM chooses the table, WHERE chooses the rows. Two of the six started before 2020.',
      query: { columns: ['name', 'role', 'started'], where: before2020 }
    })
  ])
});

/** The result table for a case, or null when the case is not about a query. */
export function resultFor(caseItem) {
  return caseItem?.query ? runQuery(caseItem.query) : null;
}
