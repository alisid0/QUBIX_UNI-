// Pre-Intern 002 — a zero-prerequisite account of computer programs.
// The ebook is the review source for a later interactive adaptation. It does
// not introduce a programming language or grant any curriculum approval.

const chapter = {
  id: 1,
  part: 'PRE-INTERN ACADEMY · DIGITAL FOUNDATIONS',
  title: 'What a computer program does',
  standfirst: 'A program is a stored set of precise instructions that a computer can execute.',

  blocks: [
    { t: 'callout', title: 'Learning objective', text: 'By the end of this book, you should be able to describe a program using input, ordered instructions, output and state; distinguish code from data; and explain why a computer can follow a faulty instruction perfectly.' },
    { t: 'p', text: 'At a Qubix Superstore checkout, a cashier scans a product. The screen finds its price, multiplies by the quantity, adds the result to the basket and displays a new total. Nobody performs those steps by hand for every scan. A computer program carries them out.' },
    { t: 'p', text: 'A **computer program** is a set of instructions written in a form that a computer system can execute. A person decides what the system should accomplish and expresses the necessary rules. The computer performs the implemented steps. Speed does not give it judgment, intention or common sense.' },
    { t: 'figure', kind: 'chain', input: 'scan', stages: ['look up', 'calculate', 'display'], values: ['price', 'total', 'screen'], w: 460,
      caption: 'One checkout path: input enters, ordered instructions process it, and an output appears.' },

    { t: 'h', text: 'Input, processing and output' },
    { t: 'p', text: 'Many programs can first be understood with three questions: what enters, what steps happen, and what comes out? The answer need not be a number. A click may enter and a window may open. A sensor reading may enter and an alarm may sound.' },
    { t: 'table', head: ['Program', 'Input', 'Processing', 'Output or action'], rows: [
      ['checkout', 'product code and quantity', 'find price and calculate', 'updated basket total'],
      ['stock alert', 'recorded stock count', 'compare with threshold', 'alert or no alert'],
      ['daily report', 'sale records', 'group and total', 'branch summary'],
      ['door controller', 'valid access signal', 'check permission', 'unlock or remain locked']
    ] },

    { t: 'example', n: 1, ask: 'A checkout receives product P-1042 and quantity 2. It finds a price of £1.50 per item. Identify the input, processing and output.', steps: [
      'The input is the product code and quantity.', 'The program looks up £1.50 and multiplies it by 2.', 'The output contributed to the basket is £3.00.'
    ], answer: 'Input: P-1042 and 2. Processing: price lookup and multiplication. Output: £3.00.', note: 'The stored price is data. The instructions that retrieve and use it belong to the program.',
      show: { kind: 'chain', input: 'P-1042 × 2', stages: ['look up', 'multiply', 'return'], values: ['£1.50', '£3.00', 'basket'], w: 460 },
      turn: { ask: 'A stock alert receives count 3 and threshold 5, compares them and shows “reorder”. Name the three parts.', a: 'Input: 3 and 5. Processing: compare count with threshold. Output: the reorder alert.' } },

    { t: 'h', text: 'Order matters' },
    { t: 'p', text: 'Instructions form a sequence. “Find the price, multiply by quantity, then add to the basket” is meaningful. “Add to the basket, then find the price” asks the system to use a value it does not yet have. Computers follow execution order, not the order a person probably intended.' },
    { t: 'figure', kind: 'table', head: ['Step', 'Instruction', 'Available afterward'], rows: [
      ['1', 'read product code', 'P-1042'], ['2', 'look up price', '£1.50'], ['3', 'read quantity', '2'],
      ['4', 'multiply price by quantity', '£3.00'], ['5', 'add line amount to basket', 'new basket total']
    ], caption: 'Each step supplies something the next step can use. Moving a step can change the result or make execution impossible.' },

    { t: 'example', n: 2, ask: 'A report must load today’s sales, remove cancelled transactions, then calculate revenue. Why should calculation come last?', steps: [
      'Revenue depends on which records are included.', 'Cancelled transactions must be identified before the total is calculated.',
      'Calculating first would include values that should not contribute.'
    ], answer: 'Calculation comes last because it must operate on the checked set of valid sales.', note: 'A wrong order can produce a plausible number, which makes the error more dangerous.',
      show: { kind: 'chain', input: 'sales', stages: ['load', 'exclude cancelled', 'sum'], values: ['rows', 'valid rows', 'revenue'], w: 460 },
      turn: { ask: 'Put these in order: display receipt, calculate basket total, read basket lines.', a: 'Read basket lines, calculate basket total, display receipt.' } },

    { t: 'h', text: 'Programs make choices and repeat steps' },
    { t: 'p', text: 'A useful program rarely follows only one straight path. A **condition** chooses a path: if stock is below the threshold, create an alert; otherwise continue. A **repetition** applies instructions again: for each sale line, calculate its amount.' },
    { t: 'list', items: ['**Sequence:** perform steps in an order.', '**Selection:** choose a path using a condition.', '**Repetition:** apply steps again while a rule says to continue or for each item in a collection.'] },
    { t: 'figure', kind: 'mapping', pairs: [['stock 3', 'alert'], ['stock 8', 'no alert'], ['stock 0', 'alert']], tag: 'one condition, two possible paths',
      caption: 'The comparison chooses an output for each input. The program does not worry; it evaluates the stated condition.' },

    { t: 'example', n: 3, ask: 'A program examines four basket lines and calculates an amount for each. What is repeating, and what changes?', steps: [
      'The instruction “price multiplied by quantity” repeats once per line.', 'The current product, price and quantity change from line to line.',
      'The running basket total changes after each result is added.'
    ], answer: 'The calculation repeats; the current line data and running total change.', note: 'The value a program retains while it runs is part of its state.',
      show: { kind: 'table', head: ['Line', 'Price × quantity', 'Running total'], rows: [['1', '£2 × 1', '£2'], ['2', '£1 × 3', '£5'], ['3', '£4 × 1', '£9'], ['4', '£2 × 2', '£13']] },
      turn: { ask: 'A program checks every branch file for a missing date. What repeats?', a: 'The same missing-date check repeats for each branch file; the current file and result change.' } },

    { t: 'h', text: 'Code, program, data and state' },
    { t: 'p', text: '**Source code** is the written expression of instructions in a programming language. A running program is those instructions being executed by a computer system. **Data** is what the program reads, creates or changes. **State** is the data the running program currently remembers, such as the basket lines and current total.' },
    { t: 'callout', title: 'One file can play different roles', text: 'A program can read code as data, and programs often generate other programs. The beginner distinction is still useful: ask whether a particular thing is being executed as instructions or handled as a value.' },

    { t: 'example', n: 4, ask: 'A checkout program uses a price table. Which is code and which is data?', steps: [
      'The instruction “look up the scanned product in the price table” is code.', 'The product codes and prices in the table are data.',
      'Changing a price changes the result without changing the lookup instruction.'
    ], answer: 'The lookup rule is code; the price table is data.', note: 'Keeping changing business values out of the instruction itself makes the system easier to maintain and audit.',
      show: { kind: 'table', head: ['Thing', 'Role'], rows: [['look up product code', 'instruction / code'], ['P-1042 → £1.50', 'data'], ['current basket total', 'running state']] },
      turn: { ask: 'A report program reads a CSV file of sales. Which is the program and which is the data?', a: 'The instructions that read and summarise are the program; the sales records in the CSV file are data.' } },

    { t: 'h', text: 'A computer can execute a mistake perfectly' },
    { t: 'p', text: 'A program does what its implemented instructions specify under the conditions it encounters. That is not always what its author wanted. A missing rule, incorrect comparison, wrong unit or misunderstood business definition can produce an incorrect result at great speed.' },
    { t: 'list', items: ['A **syntax error** breaks the language’s writing rules.', 'A **runtime error** occurs while instructions execute.', 'A **logic error** allows execution but produces the wrong behaviour.', 'A **bad input** may make correct instructions produce an unusable result.'] },
    { t: 'callout', title: 'Programs need tests and monitoring', text: 'Check ordinary cases, boundaries, missing inputs and known answers. After release, monitor whether the real system continues to behave as expected.' },

    { t: 'h', text: 'Reference and provenance record' },
    { t: 'p', text: 'Terminology was cross-checked against the NIST Computer Security Resource Center glossary entry for software and its cited source publications, and against the Python Software Foundation’s Python 3.14 tutorial and language documentation (accessed 21 August 2026). These are reference checks; no wording, examples or diagrams were copied. Stable records: https://csrc.nist.gov/glossary/term/software and https://docs.python.org/3/tutorial/' },
    { t: 'p', text: 'The Qubix Superstore checkout, stock alert, report flow, values and questions are original synthetic teaching material. No production retailer program, source code or data was used.' }
  ],

  practice: [
    { q: 'In one sentence, what is a computer program?', level: 'Recall', a: 'A computer program is a stored set of precise instructions that a computer system can execute.' },
    { q: 'A scanner supplies product P-1042. Is that value an instruction or input data?', level: 'Recognise', a: 'It is input data supplied to the checkout program.' },
    { q: 'A screen shows £3.00 after a scan. Is that an input or output?', level: 'Recognise', a: 'It is an output produced by the program’s processing.' },
    { q: 'Name the three parts of the simplest program description used here.', level: 'Recall', a: 'Input, processing or instructions, and output or action.' },
    { q: 'Why does instruction order matter?', level: 'Explain', a: 'A later instruction may depend on a value created by an earlier one, and changing the order can change or prevent the result.' },
    { q: 'Put these in order: add amount to basket, look up price, read product code.', level: 'Apply', a: 'Read product code, look up price, add the calculated amount to the basket.' },
    { q: 'What does a condition allow a program to do?', level: 'Recall', a: 'It allows the program to choose between paths based on whether a stated test is satisfied.' },
    { q: 'What does repetition allow a program to do?', level: 'Recall', a: 'It allows instructions to be applied again, such as once for every sale line or branch file.' },
    { q: 'A program checks “stock below 5”. What output should stock 3 produce?', level: 'Apply', a: 'It should follow the below-threshold path, such as producing a reorder alert.' },
    { q: 'What is source code?', level: 'Recall', a: 'It is the written expression of program instructions in a programming language.' },
    { q: 'What is program state?', level: 'Explain', a: 'It is the data the running program currently remembers, such as the present basket and running total.' },
    { q: 'A price changes from £2 to £2.20 while the lookup rule stays the same. What changed?', level: 'Apply', a: 'The price data changed; the lookup instruction did not.' },
    { q: 'Can a fast program still be wrong?', level: 'Explain', a: 'Yes. It can execute an incorrect rule or use bad input very quickly.' },
    { q: 'What kind of error executes successfully but gives the wrong result?', level: 'Recall', a: 'A logic error.' },
    { q: 'Why test a program with a known answer?', level: 'Explain', a: 'A known answer lets you compare the program’s output with an independently established result.' },
    { q: 'Why test missing input?', level: 'Explain', a: 'Real data can be absent, and the program needs defined safe behaviour instead of crashing or inventing a value.' },
    { q: 'Does a computer understand the business goal merely because it runs the program?', level: 'Decide', a: 'No. It executes implemented instructions; human designers remain responsible for expressing and checking the goal.' },
    { q: 'Give one Superstore example of input, processing and output.', level: 'Reconstruct', a: 'Example: stock count and threshold enter; the program compares them; a reorder alert is produced when the count is lower.' },
    { q: 'What is the difference between code and data in the price-table example?', level: 'Explain', a: 'Code tells the system to perform a lookup; data supplies the product codes and prices being looked up.' },
    { q: 'A program totals cancelled sales because it filters them after calculating. Identify the fault.', level: 'Decide', hard: true, a: 'The instruction sequence is wrong. Cancelled records must be excluded before the revenue calculation.' }
  ],

  misconception: {
    name: 'a computer understands the intention behind its program',
    wrong: 'Because computers respond quickly and consistently, it is easy to imagine that they know what the author meant and will repair an unclear or incomplete instruction.',
    why: 'Execution follows implemented rules and available data. A computer can apply the wrong business definition consistently, making human specification, testing, review and monitoring essential.'
  },

  review: 'Ebook 001 established the difference between an event and recorded data. Return to it if input data, stored prices or output records seem interchangeable with the instructions that process them.'
};

export const meta = {
  series: 'QUBIX UNIVERSITY · DATA SCIENCE FROM ZERO',
  title: 'What a Computer Program Does',
  subtitle: 'Pre-Intern 002 · Digital Foundations',
  blurb: 'Instructions, input, processing, output and state—before the first line of code.',
  status: 'SOURCE-FIRST EBOOK · AI_DRAFT',
  note: 'Founder review required. This ebook creates no interactive lesson and grants no curriculum approval.',
  cover: 'data'
};

export const chapters = [chapter];
