// Pre-Intern 001 — the first source-first ebook in the Data Science series.
// Status is deliberately AI_DRAFT. The founder must read and amend the book
// before it can become APPROVED or supply learner-facing interactive material.

const chapter = {
  id: 1,
  part: 'PRE-INTERN ACADEMY · DATA FOUNDATIONS',
  title: 'What data is and why people use it',
  standfirst: 'Data begins when something about the world is recorded so it can be examined later.',

  blocks: [
    { t: 'callout', title: 'Learning objective', text: 'By the end of this book, you should be able to distinguish an event from its record, recognise several forms of data, explain why context matters, and trace recorded evidence into a decision.' },
    { t: 'p', text: 'A customer places a carton of milk on a checkout counter. The scanner reads a product code. The checkout records a time, a branch, a quantity and a price. The sale happened in the world; the stored facts are **data about the sale**.' },
    { t: 'p', text: 'Data is recorded evidence. It can describe an event, object, place, process or measurement. A number can be data, but so can a word, date, image, sound or yes/no answer. What makes it useful is not its shape. It is the connection between the recorded value and what that value is meant to describe.' },
    { t: 'figure', kind: 'chain', input: 'sale', stages: ['record', 'organise', 'use'], values: ['facts', 'table', 'decision'], w: 460,
      caption: 'The central movement of the book: something happens, facts about it are recorded, records are organised, and people use the evidence.' },

    { t: 'h', text: 'The event is not the record' },
    { t: 'p', text: 'A checkout record is not the sale itself. It is a deliberately limited description of the sale. It may record the product and price but not whether the customer was in a hurry. Every record includes some facts and leaves others out.' },
    { t: 'callout', title: 'A useful question', text: 'Whenever you meet data, ask: what happened in the world, what was recorded, who recorded it, when was it recorded, and what was left out?' },
    { t: 'table', head: ['World event', 'Recorded value', 'Meaning'], rows: [
      ['a product crosses the scanner', 'P-1042', 'the product identifier'],
      ['the sale completes', '18:42', 'the recorded checkout time'],
      ['two cartons are sold', '2', 'the recorded quantity'],
      ['payment succeeds', 'card', 'the payment category']
    ] },

    { t: 'example', n: 1, ask: 'A checkout receipt says product P-1042, quantity 2, time 18:42. Which part is the event and which parts are data?', steps: [
      'Identify what happened: two units of a product were purchased at a checkout.',
      'Identify what was retained: the product identifier, quantity and recorded time.',
      'Keep the two ideas separate. The values describe the event; they are not the physical event.'
    ], answer: 'The purchase is the event. P-1042, 2 and 18:42 are recorded data about it.', note: 'A record can be incomplete or wrong even when the event truly occurred.',
      show: { kind: 'table', head: ['Event', 'Recorded data'], rows: [['two cartons are purchased', 'P-1042 · quantity 2 · 18:42']] },
      turn: { ask: 'A temperature sensor stores 6°C at 07:00. Name the event and the recorded data.', a: 'The event is the sensor taking a temperature measurement. The recorded data is 6°C together with the time 07:00; the sensor and location are also needed as context.' } },

    { t: 'h', text: 'Data takes many forms' },
    { t: 'p', text: 'A common beginner mistake is to equate data with numbers. Qubix Superstore uses quantities and prices, but it also uses branch names, product categories, timestamps, delivery photographs and written incident notes. Each form can preserve evidence.' },
    { t: 'figure', kind: 'table', head: ['Form', 'Example', 'What it describes'], rows: [
      ['number', '14', 'units sold'], ['text', 'North', 'region name'], ['date', '2026-08-21', 'business date'],
      ['yes/no', 'yes', 'promotion active'], ['image', 'shelf photo', 'visible shelf condition']
    ], caption: 'Data is not defined by being numerical. It is defined by what has been recorded and what that record means.' },

    { t: 'example', n: 2, ask: 'Classify these as possible data: a price, a branch name, a delivery photograph and a spoken customer comment.', steps: [
      'Do not ask whether the item is a number.', 'Ask whether it records something that can be examined later.',
      'All four retain evidence: an amount, a category, a visual condition and spoken words.'
    ], answer: 'All four can be data.', note: 'Later topics will distinguish structured and unstructured data. This book needs only the broader idea.',
      show: { kind: 'table', head: ['Record', 'Form'], rows: [['£3.20', 'number'], ['Central', 'text'], ['shelf.jpg', 'image'], ['audio note', 'sound']] },
      turn: { ask: 'Are a calendar date and a yes/no inspection result data even though neither is a measurement like height?', a: 'Yes. Each records evidence in a defined form.' } },

    { t: 'h', text: 'A value without context can mislead' },
    { t: 'p', text: 'Suppose someone sends you the number **14**. It could mean fourteen items, fourteen pounds, branch fourteen, fourteen minutes, or a temperature of fourteen degrees. The digits are present, but their meaning is missing.' },
    { t: 'list', items: ['A **label** says what was recorded.', 'A **unit** says how a quantity was measured.', 'A **time** says when it was true.', 'A **source** says where it came from.', 'A **grain** says what one complete record describes.'] },
    { t: 'figure', kind: 'mapping', pairs: [['14', 'units sold', 'minutes late', 'branch ID']], broken: '14', tag: 'one value, several possible meanings',
      caption: 'The number alone does not settle its meaning. Labels, units, time and source supply the missing context.' },

    { t: 'example', n: 3, ask: 'A message says only “14”. What must you ask before using it in a branch report?', steps: [
      'Ask what the value describes.', 'Ask for its unit if it is a measurement.', 'Ask which branch or product it belongs to.',
      'Ask when it was observed and which system produced it.'
    ], answer: 'Request the label, unit, subject, time and source before treating 14 as evidence.', note: 'Guessing the missing meaning manufactures data that was never supplied.',
      show: { kind: 'mapping', pairs: [['14', '14 units'], ['14', '14 minutes'], ['14', 'branch 14']], broken: '14', tag: 'context must choose one meaning' },
      turn: { ask: 'A table contains the value 6. What two questions would you ask first?', a: 'What does 6 describe, and in what unit or category is it recorded? Time, source and subject usually follow.' } },

    { t: 'h', text: 'Why people record data' },
    { t: 'p', text: 'People record data because memory is limited and decisions need evidence. A single branch manager can remember that a delivery was late. A company with 48 branches needs consistent records to find repeated delays, compare suppliers and decide where to intervene.' },
    { t: 'list', ordered: true, items: ['**Remember:** preserve evidence after an event has passed.', '**Describe:** state what is happening now.', '**Compare:** examine differences across time, products or branches.', '**Monitor:** notice when a process moves outside an expected condition.', '**Decide:** choose an action using the available evidence.', '**Learn:** test whether an action produced the intended result.'] },

    { t: 'example', n: 4, ask: 'Branch B014 records a stockout for milk at 18:42. How can that one record support a decision?', steps: [
      'The record preserves the event after the shelf has been refilled.', 'Combined with other records, it can reveal how often the product is unavailable.',
      'The branch can compare stockouts with deliveries and sales.', 'A manager can change an order only after checking that the evidence is accurate and relevant.'
    ], answer: 'The record becomes useful when it is combined with context and related evidence to support a replenishment decision.', note: 'Data supports a decision; it does not make the decision automatically.',
      show: { kind: 'chain', input: 'stockout', stages: ['record', 'compare', 'decide'], values: ['18:42', 'pattern', 'reorder'], w: 460 },
      turn: { ask: 'A supplier arrives late once. What should be recorded before deciding that the supplier is unreliable?', a: 'Record the supplier, order, promised time, actual arrival time, branch or hub, and relevant circumstances; then compare with other deliveries rather than judging from an isolated memory.' } },

    { t: 'h', text: 'Data can be wrong, incomplete or harmful' },
    { t: 'p', text: 'Recorded does not mean true. A scanner can fail, a person can mistype a code, a clock can be wrong and a field can be left blank. Data can also expose people or be collected without a fair purpose. Good data work therefore keeps evidence of uncertainty, protects privacy and documents corrections rather than quietly inventing values.' },
    { t: 'callout', title: 'Do not repair by guessing', text: 'If a value is missing, mark it as missing and investigate. Zero is a recorded quantity. Missing means the quantity was not recorded or is not available. They are not interchangeable.' },

    { t: 'h', text: 'Reference and provenance record' },
    { t: 'p', text: 'Terminology was cross-checked against David M. Lane and collaborators, *Online Statistics Education: An Interactive Multimedia Course of Study*, Introduction and “Variables,” OnlineStatBook/Rice University. The source site states that the work is in the public domain and requests citation. Stable records: https://onlinestatbook.com/2/index.html and https://onlinestatbook.com/2/introduction/variables.html (accessed 21 August 2026).' },
    { t: 'p', text: 'The Qubix Superstore company, event trail, identifiers, records, examples and questions are original synthetic teaching material. They describe no real customer, employee, branch or retailer.' }
  ],

  practice: [
    { q: 'A customer buys bread. The checkout stores product B-12 and quantity 1. What is the event?', level: 'Recognise', a: 'The event is the customer purchasing one bread product. The stored identifier and quantity are data about it.' },
    { q: 'In the same example, name two recorded data values.', level: 'Recognise', a: 'B-12 and 1.' },
    { q: 'Is a branch name data even though it is text?', level: 'Recognise', a: 'Yes. It records which branch is being described.' },
    { q: 'Is a shelf photograph capable of being data?', level: 'Recognise', a: 'Yes. It can preserve visible evidence about the shelf at a particular time and place.' },
    { q: 'Explain why the number 27 is not useful by itself.', level: 'Explain', a: 'Its label, unit, subject, time and source are unknown, so its meaning is unsettled.' },
    { q: 'What is the difference between a sale and a sale record?', level: 'Explain', a: 'The sale is the real-world event. The sale record is a limited stored description of that event.' },
    { q: 'A record says “North, 08:00, 6°C”. What does the unit contribute?', level: 'Explain', a: 'The °C tells us that 6 is a temperature measured on the Celsius scale rather than a count, identifier or another quantity.' },
    { q: 'Give one reason people record data rather than rely on memory.', level: 'Explain', a: 'Records preserve evidence after events pass and allow consistent comparison across many events, places or times.' },
    { q: 'Which is a safer response to a blank stock count: enter zero or mark it missing and investigate?', level: 'Decide', a: 'Mark it missing and investigate. Zero asserts that no stock existed; a blank does not establish that.' },
    { q: 'A checkout clock is ten minutes fast. Can its timestamps still be recorded data?', level: 'Decide', a: 'Yes, but they are inaccurate records of the true time. Recorded does not guarantee correct.' },
    { q: 'Name two forms of data that are not ordinary numbers.', level: 'Recall', a: 'Any two of text, dates, yes/no categories, images, sound or video.' },
    { q: 'What does a source tell you?', level: 'Recall', a: 'It tells you where a value or record came from, such as a checkout, sensor, survey or supplier system.' },
    { q: 'Why should a correction retain evidence of what changed?', level: 'Explain', a: 'So another person can trace the original record, understand the correction and audit the result instead of trusting an unexplained replacement.' },
    { q: 'A manager sees one late delivery and dismisses the supplier. What is weak about the evidence?', level: 'Decide', a: 'One event may not represent the supplier’s usual performance, and the manager has not checked context or compared other deliveries.' },
    { q: 'List the four steps in the book’s central data flow.', level: 'Recall', a: 'Event, record, organised table or collection, and use in a decision.' },
    { q: 'Does data make a decision automatically?', level: 'Explain', a: 'No. Data supplies evidence. People or defined systems still interpret it, consider limitations and choose an action.' },
    { q: 'A field contains “card”. What kind of thing might it record?', level: 'Apply', a: 'It might record a payment category. The field label and documentation are needed to confirm that interpretation.' },
    { q: 'Why can two records of the same event disagree?', level: 'Explain', a: 'They may use different clocks, instruments, definitions or entry processes, or one may contain an error.' },
    { q: 'What privacy question should be asked before collecting a new field?', level: 'Decide', a: 'Is the field genuinely needed for a stated fair purpose, and can that purpose be achieved with less personal data?' },
    { q: 'In one sentence, define data for this course.', level: 'Reconstruct', hard: true, a: 'Data is recorded evidence about an event, object, place, process or measurement that can be examined later with its context.' }
  ],

  misconception: {
    name: 'data means numbers that are automatically true',
    wrong: 'A value looks objective once it appears in a table, so it is easy to treat every number as a fact and every word or image as something else.',
    why: 'Numbers, words, dates and images can all be data. Any of them can also be inaccurate, incomplete, badly defined or detached from context. Recording creates evidence, not certainty.'
  },

  review: 'This is the entry point and assumes no earlier data-science topic. If event, record, label, unit, time or source still feel interchangeable, reread the checkout example before moving to files, tables, rows and columns.'
};

export const meta = {
  series: 'QUBIX UNIVERSITY · DATA SCIENCE FROM ZERO',
  title: 'What Data Is and Why People Use It',
  subtitle: 'Pre-Intern 001 · Data Foundations',
  blurb: 'From a Superstore sale to a recorded fact, an organised table and a defensible decision.',
  status: 'SOURCE-FIRST EBOOK · AI_DRAFT',
  note: 'Founder review required. No lesson, interaction, promotion or curriculum approval is implied by this generated book.',
  cover: 'data'
};

export const chapters = [chapter];
