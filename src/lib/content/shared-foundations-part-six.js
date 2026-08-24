// Volume 0, chapter 06. Python foundations.
//
// Written for someone who has never programmed. The order is deliberate: a
// value, then a name for it, then a decision, then a repetition, then a name
// for a piece of work, then a collection, and only at the end a table. Every
// example is a Superstore one, so the code is doing work the learner already
// understands from earlier chapters rather than printing squares of numbers.

export const SHARED_FOUNDATIONS_PART_SIX = Object.freeze({
  id: 'SHARED-FOUNDATIONS-PART-SIX',
  status: 'AI_DRAFT · AUTHORING ONLY',
  title: 'Python Foundations',
  subtitle: 'Part Six of Volume 0',
  totalMinutes: 250,
  sessions: Object.freeze([
    Object.freeze({
      id: 'values', number: '01', title: 'Values, names and types', studyMinutes: 35, playMinutes: 25,
      objective: 'Say what kind of thing a value is, and why a name is not the value.',
      opening: 'A program has no idea what a basket is. It has numbers, pieces of text and true-or-false answers, and everything else is built from those.',
      sections: Object.freeze([
        Object.freeze({ heading: 'A few kinds of value', paragraphs: Object.freeze([
          'Whole numbers and decimals are separate kinds, because a count of items and a price behave differently. Text is a sequence of characters, and it is a different kind even when it looks like a number: the text "3" and the number 3 are not interchangeable, which is why a quantity read from a file has to be converted before it can be added.',
          'There is also a true-or-false kind, and a special value meaning nothing is here, which is the same absence that chapter 03 was about. Python calls it None, a database calls it null, and both mean the value is not present rather than zero.'
        ]) }),
        Object.freeze({ heading: 'A name points at a value', paragraphs: Object.freeze([
          'Assigning gives a name to a value so it can be used again. The name is not the value; it refers to it, and pointing the same name at something else later does not change what the first value was. Names should say what the thing is: unit_price rather than p, because a program is read far more often than it is written.',
          'This is the same idea as a column heading. A column called weight is ambiguous for the same reason a variable called w is, and the fix in both places is to say what it measures and in what unit.'
        ]) }),
        Object.freeze({ heading: 'Types decide what operations mean', paragraphs: Object.freeze([
          'The kind of a value decides what an operator does. Adding two numbers sums them; adding two pieces of text joins them end to end. Multiplying a price by a quantity is meaningful; multiplying two prices produces a number with no unit anybody wants.',
          'Most early errors are type errors wearing a disguise: a quantity that arrived as text, a total that became text because it was joined to a label, a comparison against nothing. Reading the error message rather than guessing is the single fastest habit to acquire.'
        ]) })
      ]),
      example: Object.freeze({ title: 'Four values from one basket line', headers: Object.freeze(['Value', 'Kind', 'Why it matters']), rows: Object.freeze([
        Object.freeze(['2', 'whole number', 'a count: adding it makes sense']),
        Object.freeze(['3.40', 'decimal', 'a price: keep it separate from counts']),
        Object.freeze(['"QX-CER-001"', 'text', 'an identifier: never do arithmetic on it']),
        Object.freeze(['None', 'nothing', 'absent, not zero'])
      ]) }),
      workbook: Object.freeze({ title: 'Fifteen-minute type sort', prompt: 'Write down eight values from a receipt or a delivery note.', steps: Object.freeze([
        'Mark each as a whole number, a decimal, text or true-or-false.',
        'Circle any that look like numbers but are really identifiers.',
        'Give each one a name you would be happy to read in six months.',
        'Say which two could sensibly be multiplied together.'
      ]) }),
      check: Object.freeze({
        prompt: 'A quantity read from a file arrives as the text "2", and is added to the number 3. What happens?',
        answer: 'error',
        options: Object.freeze([
          ['five', 'The result is 5, because Python converts text automatically'],
          ['error', 'An error, because adding text to a number is not defined'],
          ['twentythree', 'The result is "23", because the values are joined']
        ]),
        explanation: 'Python refuses to guess what you meant between joining and summing, so it raises an error. The quantity has to be converted to a number first, which is also where an unexpected value gets caught.'
      }),
      practice: Object.freeze({ title: 'Classify Store Data', href: '?mode=game&mission=classify-data', instruction: 'The same question in a different language: what kind of thing is this value, and what does that permit?' }),
      sources: Object.freeze([
        Object.freeze({ label: 'Python — the tutorial', url: 'https://docs.python.org/3/tutorial/index.html' }),
        Object.freeze({ label: 'Python — built-in types', url: 'https://docs.python.org/3/library/stdtypes.html' })
      ])
    }),

    Object.freeze({
      id: 'decisions', number: '02', title: 'Decisions and repetition', studyMinutes: 35, playMinutes: 25,
      objective: 'Express a rule as a condition, and apply it to every row without writing it out repeatedly.',
      opening: 'Every data rule you have met so far is a decision applied many times. Flag the reading if it is above the threshold. Do that for four hundred thousand readings.',
      sections: Object.freeze([
        Object.freeze({ heading: 'A condition is a question with two answers', paragraphs: Object.freeze([
          'A condition compares values and produces true or false, and the program takes one path or the other. Conditions can be combined with and, or and not, and the combination is where care is needed: not above the threshold is not the same as below it when the value might be absent.',
          'This is chapter 03 again, in code. A comparison against a missing value is not simply false, and a rule written without thinking about absence will put those rows silently on one side of the decision.'
        ]) }),
        Object.freeze({ heading: 'A loop applies a rule to everything', paragraphs: Object.freeze([
          'A loop takes a collection and does the same work for each item in turn. This is what makes a rule useful: the decision is written once and applied to every row, and the code does not grow when the data does.',
          'Almost every data task has this shape. Read the rows, decide something about each, and accumulate a result. Recognising the shape is more valuable than memorising the syntax, because every language expresses it slightly differently.'
        ]) }),
        Object.freeze({ heading: 'Accumulating an answer', paragraphs: Object.freeze([
          'A running total, a count of exceptions, a list of the rows that failed a check: all of them start empty before the loop and grow inside it. Starting them in the wrong place is a classic error, and it produces a total that resets or one that never does.',
          'It is worth counting what you skipped as well as what you kept. A loop that quietly ignores rows it could not handle gives an answer that looks complete, and the number of skipped rows is often the most interesting output.'
        ]) })
      ]),
      example: Object.freeze({ title: 'One rule over many readings', headers: Object.freeze(['Step', 'In words', 'Why it is there']), rows: Object.freeze([
        Object.freeze(['start', 'kept = 0, skipped = 0', 'accumulators begin outside the loop']),
        Object.freeze(['for each reading', 'take the next one', 'the rule is written once']),
        Object.freeze(['if value is None', 'skipped = skipped + 1', 'absence is handled, not compared']),
        Object.freeze(['elif value > −18', 'kept = kept + 1', 'the actual decision'])
      ]) }),
      workbook: Object.freeze({ title: 'Twenty-minute rule in words', prompt: 'Take a rule you already follow: which emails to archive, which receipts to keep.', steps: Object.freeze([
        'Write the rule as a single condition.',
        'Write what happens when the information needed is missing.',
        'Write the loop in plain language: for each thing, do this.',
        'Name the two counters you would keep, including one for skipped items.'
      ]) }),
      check: Object.freeze({
        prompt: 'A loop sums a column but the running total is declared inside the loop. What is the result?',
        answer: 'last',
        options: Object.freeze([
          ['correct', 'The correct total, since it is still added up each time'],
          ['last', 'The total resets every row, so it ends as the last value only'],
          ['error', 'An error, because the total is not defined before use']
        ]),
        explanation: 'Declaring the accumulator inside the loop resets it on every pass, so the final answer reflects only the last row. Accumulators belong outside the loop that fills them.'
      }),
      practice: Object.freeze({ title: 'Read the Program', href: '?mode=game&mission=python-trace', instruction: 'Predict what the loop leaves in each name, then step through it one line at a time and watch the values move.' }),
      sources: Object.freeze([
        Object.freeze({ label: 'Python — the tutorial', url: 'https://docs.python.org/3/tutorial/index.html' }),
        Object.freeze({ label: 'Python — control flow tools', url: 'https://docs.python.org/3/tutorial/controlflow.html' })
      ])
    }),

    Object.freeze({
      id: 'functions', number: '03', title: 'Giving a piece of work a name', studyMinutes: 35, playMinutes: 25,
      objective: 'Package a rule as a named function with stated inputs and one clear output.',
      opening: 'The conversion from Fahrenheit to Celsius appeared three times in the pipeline and two of them were subtly different. That is what a function is for.',
      sections: Object.freeze([
        Object.freeze({ heading: 'Inputs in, one thing out', paragraphs: Object.freeze([
          'A function takes named inputs, does one job and returns a result. This is the same definition as chapter 02: a rule that turns each input into exactly one output. Writing it once means the rule exists in one place, so correcting it corrects everything that uses it.',
          'The name should say what it produces rather than how. celsius_from_fahrenheit tells a reader what they will get. convert does not, and a codebase full of convert is a codebase nobody can read.'
        ]) }),
        Object.freeze({ heading: 'Small functions can be checked', paragraphs: Object.freeze([
          'A function that does one thing can be tested by calling it with a known input and comparing the output with a known answer. Freezing point in Fahrenheit is thirty-two and should come back as nought. A handful of such cases catches most mistakes immediately and permanently.',
          'This is the same discipline as the checks in the earlier chapters, applied to code instead of data. A rule you cannot state a known answer for is a rule you do not yet understand well enough to write.'
        ]) }),
        Object.freeze({ heading: 'Decide what it does with bad input', paragraphs: Object.freeze([
          'Real inputs include absent values, text where a number was expected and readings outside any plausible range. A function must decide what to do: return nothing, raise an error, or substitute a default. All three are legitimate and the wrong one is deciding by accident.',
          'Returning a plausible number for input the function did not understand is the worst option, because the problem then travels downstream disguised as a measurement.'
        ]) })
      ]),
      example: Object.freeze({ title: 'One conversion, three test cases', headers: Object.freeze(['Input', 'Expected', 'What it proves']), rows: Object.freeze([
        Object.freeze(['32', '0.0', 'the offset is right']),
        Object.freeze(['212', '100.0', 'the scale is right']),
        Object.freeze(['0', '−17.8', 'the freezer case from chapter 03']),
        Object.freeze(['None', 'None, not 0', 'absence survives the conversion'])
      ]) }),
      workbook: Object.freeze({ title: 'Twenty-minute function design', prompt: 'Choose a calculation you do by hand: a tip, a unit price, a pace per kilometre.', steps: Object.freeze([
        'Name the inputs, with units.',
        'Name the output, with its unit.',
        'Write three test cases where you already know the answer.',
        'Decide what should happen if an input is missing.'
      ]) }),
      check: Object.freeze({
        prompt: 'A conversion function is given None and returns 0. Why is that dangerous?',
        answer: 'plausible',
        options: Object.freeze([
          ['slow', 'It makes the function slower to run'],
          ['plausible', 'Zero is a plausible reading, so the absence becomes indistinguishable from a measurement'],
          ['crash', 'It will crash later when the value is used']
        ]),
        explanation: 'Zero degrees is a temperature a freezer could really report. Substituting it for an absence hides the fact that nothing was measured, and every later calculation treats it as evidence.'
      }),
      practice: Object.freeze({ title: 'Units and Measurement', href: '?mode=game&mission=units-measurement', instruction: 'Convert a value without losing the original, and decide what the conversion does with an absence.' }),
      sources: Object.freeze([
        Object.freeze({ label: 'Python — defining functions', url: 'https://docs.python.org/3/tutorial/controlflow.html' }),
        Object.freeze({ label: 'Python — the tutorial', url: 'https://docs.python.org/3/tutorial/index.html' })
      ])
    }),

    Object.freeze({
      id: 'tables', number: '04', title: 'Collections, and a table in code', studyMinutes: 40, playMinutes: 30,
      objective: 'Represent rows and columns in code, and keep the grain intact while working on them.',
      opening: 'A table in code is a collection of rows, and a row is a collection of named values. Once that clicks, everything from chapter 03 arrives intact.',
      sections: Object.freeze([
        Object.freeze({ heading: 'Ordered lists and named lookups', paragraphs: Object.freeze([
          'A list holds items in order and is what a set of rows naturally is. A dictionary holds values under names and is what a single row naturally is: sale_id, branch_id, basket_total. A table is therefore a list of dictionaries, which is a sentence worth rereading because it is most of what data work in code looks like.',
          'Order matters in a list and does not in a dictionary, which is the same distinction as chapter 05 made about tables: rows have no inherent order, columns are reached by name.'
        ]) }),
        Object.freeze({ heading: 'Working on a table without breaking it', paragraphs: Object.freeze([
          'Filtering keeps some rows and changes nothing else. Adding a derived column changes every row and keeps their number. Grouping collapses rows and changes the grain. These are the same three operations as the previous chapter, and they behave the same way, which is the point of learning them in that order.',
          'A library such as pandas gives these operations short names and makes them fast, but it does not change what they mean. Knowing what they do to the grain is what makes the library safe to use rather than a way to produce wrong answers quickly.'
        ]) }),
        Object.freeze({ heading: 'Reading a file is where reality arrives', paragraphs: Object.freeze([
          'Loading a real file is the first moment code meets the world. Numbers come in as text, empty cells become an absence or an empty string depending on the reader, dates arrive in whatever format the source used, and a column heading may have a trailing space nobody can see.',
          'Check the shape immediately: how many rows, how many columns, what kind each column came in as, and how many absences per column. Four lines of checking at the top of a script prevents most of what goes wrong below it.'
        ]) })
      ]),
      example: Object.freeze({ title: 'The same three operations, in both languages', headers: Object.freeze(['Operation', 'In SQL', 'Effect on the grain']), rows: Object.freeze([
        Object.freeze(['keep some rows', 'WHERE', 'unchanged']),
        Object.freeze(['add a computed column', 'SELECT expression', 'unchanged']),
        Object.freeze(['collapse to one row per group', 'GROUP BY', 'changed, deliberately'])
      ]) }),
      workbook: Object.freeze({ title: 'Twenty-minute table by hand', prompt: 'Take five rows from any real table: a receipt, a timetable, a scoreboard.', steps: Object.freeze([
        'Write each row as a set of name-and-value pairs.',
        'Write the whole table as a list of those rows.',
        'Write the grain of your table in one sentence.',
        'Describe a filter, a derived column and a grouping, and say what each does to the row count.'
      ]) }),
      check: Object.freeze({
        prompt: 'A CSV is loaded and the quantity column comes in as text. What is the first thing to check before converting it?',
        answer: 'values',
        options: Object.freeze([
          ['speed', 'Whether the file is large enough to need a faster reader'],
          ['values', 'Which values are not numbers, since those are what forced the column to text'],
          ['order', 'Whether the rows are in the right order']
        ]),
        explanation: 'A numeric column arriving as text usually means some rows are not numeric: a blank, a dash, a footnote marker or a thousands separator. Those rows are the information, and converting blindly discards it.'
      }),
      practice: Object.freeze({ title: 'Read the Program', href: '?mode=game&mission=python-trace', instruction: 'A list of dictionaries is still a table: trace a loop that sums one field, and read its grain off the code.' }),
      sources: Object.freeze([
        Object.freeze({ label: 'Python — data structures', url: 'https://docs.python.org/3/tutorial/datastructures.html' }),
        Object.freeze({ label: 'Python — reading and writing files', url: 'https://docs.python.org/3/tutorial/inputoutput.html' })
      ])
    })
  ])
});
