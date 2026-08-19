// 1. A reliable rule
//
// The opening chapter earns the word function before defining it. Draft 1 had
// the right instinct and one page; a chapter needs the idea tested against
// cases that nearly qualify, which is where the definition does its work.

export default {
  id: 1,
  title: 'A reliable rule',
  standfirst: 'A function begins as something that can be trusted.',

  blocks: [
    { t: 'p', text: 'Press the same button on a working machine twice and the same thing happens twice. Turn a tap back to the same position and the same flow returns. Type the same number into a calculator and press the same key, and you are entitled to be annoyed if the answer differs. That entitlement is the whole idea.' },

    { t: 'figure', kind: 'machine', rule: 'double it', input: '3', output: '6', inLabel: 'input', outLabel: 'output',
      caption: 'A rule with something going in and something settled coming out. Everything in this book is a refinement of this picture.' },

    { t: 'p', text: 'In mathematics, a **function** is a rule that assigns exactly one output to every allowed input. Two demands hide inside that sentence, and they are worth separating.' },

    { t: 'list', items: [
      '**Every allowed input gets an output.** The rule does not shrug at some of the inputs it accepts.',
      '**No input gets two.** Ask once, and the answer is settled. Ask again tomorrow, and it is the same answer.'
    ] },

    { t: 'callout', title: 'The promise, stated once', text: 'One allowed input has one settled output. Everything else in this chapter is a test of whether some particular rule keeps that promise.' },

    { t: 'h', text: 'What may go in, and what may come out' },
    { t: 'p', text: 'The input does not have to be a number. It can be a button, a moment in time, a person, a place, or another mathematical object. Nor does the output have to be a number. What matters is not the material but the reliability.' },

    { t: 'table', head: ['Rule', 'Input', 'Output', 'Reliable?'],
      rows: [
        ['double it', 'a number', 'a number', 'yes'],
        ['the floor this lift button calls', 'a button', 'a floor', 'yes'],
        ['the capital city of this country', 'a country', 'a city', 'yes'],
        ['a snack from this vending machine slot', 'a slot code', 'a snack', 'only if the slot is honestly stocked'],
        ['a number bigger than this one', 'a number', 'a number', 'no: nothing settles the answer']
      ] },

    { t: 'lab', kind: 'judge', id: 'reliable',
      label: 'Judge each rule',
      ask: 'A function must give one settled output to every allowed input. Decide before you read the verdict.',
      yes: 'reliable', no: 'not reliable',
      items: [
        { t: 'Double it. Input: a number. Output: a number.', ok: true,
          why: 'Reliable. Every number has exactly one double, and it is the same double tomorrow.' },
        { t: 'The floor this lift button calls.', ok: true,
          why: 'Reliable, and not a number in sight. Button 3 calls floor 3 every time.' },
        { t: 'The capital city of this country.', ok: true,
          why: 'Reliable. One country, one capital. The input and the output are both words, which changes nothing.' },
        { t: 'A number bigger than this one.', ok: false,
          why: 'Not reliable. Give it 3 and it may answer 4, or 5, or 3.1. A rule that leaves you a choice has not answered.' },
        { t: 'A snack from this vending machine slot.', ok: false,
          why: 'Not reliable as stated. If slot B4 gives crisps today and chocolate tomorrow, one input has produced two outputs.' },
        { t: 'The square of this number.', ok: true,
          why: 'Reliable. Both 3 and −3 give 9, but each single input still gets exactly one answer. Sharing is allowed; splitting is not.' }
      ],
      hint: 'The last row is the one worth pausing on. Two inputs arriving at the same output is not a fault, and chapter 2 is about why.',
      caption: 'Six rules, two of which break the promise. The reasons differ: one refuses to settle, the other changes its mind.' },

    { t: 'p', text: 'The last row is the instructive one. "A number bigger than 3" is a perfectly clear instruction and a perfectly useless function, because it does not name an answer. It names a crowd of them. A rule that leaves you a choice has not done its job.' },

    { t: 'h', text: 'A first table' },
    { t: 'p', text: 'The plainest way to record a function is to list what it does. A table cannot show every input, but it can show the pattern.' },

    { t: 'figure', kind: 'table',
      head: ['input x', 'rule', 'output f(x)'],
      rows: [['0', 'double it', '0'], ['1', 'double it', '2'], ['2', 'double it', '4'], ['3', 'double it', '6'], ['4', 'double it', '8']],
      caption: 'A table is a function, not merely a picture of one. If the table is all you are given, the table is the rule.' },

    { t: 'lab', kind: 'frames', id: 'doubler',
      label: 'Feed the doubler',
      frames: [
        { kind: 'machine', rule: 'double it', input: '0', output: '0', pick: '0',
          say: 'Nothing in, nothing out. Zero is an ordinary input and it gets an ordinary answer.' },
        { kind: 'machine', rule: 'double it', input: '1', output: '2', pick: '1',
          say: 'One in, two out.' },
        { kind: 'machine', rule: 'double it', input: '2', output: '4', pick: '2',
          say: 'Two in, four out.' },
        { kind: 'machine', rule: 'double it', input: '3', output: '6', pick: '3',
          say: 'Three in, six out. Press 3 again: it is six again, and it will be six every time you ask.' },
        { kind: 'machine', rule: 'double it', input: '4', output: '8', pick: '4',
          say: 'Four in, eight out. Five presses, five rows of the table above.' },
        { kind: 'machine', rule: 'double it', input: '-3', output: '-6', pick: '−3',
          say: 'The rule never asked whether the input was positive. It doubles whatever it is handed.' }
      ],
      hint: 'Press the same button twice. The promise is that nothing changes, and the only way to believe it is to try.',
      caption: 'The table above, operated one row at a time.' },


    { t: 'example', n: 1,
      ask: 'A rule adds 3 to its input. Build the table for the inputs 0, 4, and −2.',
      steps: [
        'Read the rule as an instruction with a blank in it: *take the input, add 3*.',
        'Put 0 in the blank: 0 + 3 = 3.',
        'Put 4 in the blank: 4 + 3 = 7.',
        'Put −2 in the blank: −2 + 3 = 1. Adding a positive to a negative moves it toward zero and past it.'
      ],
      answer: '0 → 3, 4 → 7, −2 → 1.',
      note: 'Notice that the rule never asked whether the input was positive. A function accepts whatever its domain allows, and −2 is allowed here.',
      show: { kind: 'frames', label: 'The answer, run through the rule',
        frames: [
          { kind: 'machine', rule: 'add 3', input: '0', output: '3', pick: '0', say: '0 + 3 = 3.' },
          { kind: 'machine', rule: 'add 3', input: '4', output: '7', pick: '4', say: '4 + 3 = 7.' },
          { kind: 'machine', rule: 'add 3', input: '-2', output: '1', pick: '−2', say: '−2 + 3 = 1. Adding a positive to a negative moves it toward zero and past it.' }
        ] },
      turn: { ask: 'A rule subtracts 4. Build the table for the inputs 0, 4, and −2.',
        a: '0 → −4, 4 → 0, −2 → −6.' } },

    { t: 'figure', kind: 'blanks', rule: 'take the ⬚, add 3', sub: 'the blank is where the input goes', result: '⬚ + 3',
      caption: 'Reading a rule with a blank in it. Whatever arrives goes in every blank, and nothing else changes. This is a habit worth forming now, because chapter 3 will put an entire expression into the blank.' },

    { t: 'example', n: 2,
      ask: 'A vending machine has given three different snacks for slot B4 this week. Has it broken the promise?',
      steps: [
        'Ask what the input is. It is the slot code B4, the same input each time.',
        'Ask what the outputs were. Three different snacks.',
        'One input, three outputs. The promise is broken.'
      ],
      answer: 'Yes. The machine is not computing a function of the slot code.',
      note: 'A working engineer would say the machine is stocked wrong. A mathematician says the same thing differently: the output depends on something the input does not record, so the true input is not the slot code alone.',
      show: { kind: 'frames', label: 'Press B4 three times',
        frames: [
          { kind: 'machine', rule: 'slot B4', input: 'B4', output: 'crisps', pick: 'Monday', say: 'Monday: crisps. So far nothing is wrong.' },
          { kind: 'machine', rule: 'slot B4', input: 'B4', output: 'nuts', pick: 'Tuesday', say: 'Tuesday: nuts. The same input has produced a second, different output.' },
          { kind: 'machine', rule: 'slot B4', input: 'B4', output: 'gum', pick: 'Friday', say: 'Friday: gum. One input, three outputs, so this is not a function of the slot code.' },
          { kind: 'machine', rule: 'slot B4 + day', input: 'B4,Tue', output: 'nuts', pick: 'repaired', say: 'Repaired by widening the input. The output was never random; it depended on the day, which the slot code alone did not record.' }
        ] },
      turn: { ask: 'A lift button marked 3 has taken you to floor 3 every time for a year. Is that a function of the button pressed?',
        a: 'Yes. One input, one settled output, every time. Reliability over a year is evidence for the promise, though strictly the promise is a claim about every press rather than the ones observed so far.' } },

    { t: 'h', text: 'A function that is not made of numbers' },
    { t: 'p', text: 'It is worth drawing one, because a reader who has only ever seen numeric examples quietly starts believing that numbers are required. The rule below takes a country and returns its capital city.' },

{ t: 'lab', kind: 'frames', id: 'capitals',
      label: 'A function with no numbers in it',
      frames: [
        { kind: 'machine', rule: 'the capital of', input: 'Peru', output: 'Lima', pick: 'Peru',
          say: 'A word in, a word out, and exactly one answer.' },
        { kind: 'machine', rule: 'the capital of', input: 'Japan', output: 'Tokyo', pick: 'Japan',
          say: 'Nothing here can be added, multiplied, or plotted. It is still a function.' },
        { kind: 'machine', rule: 'the capital of', input: 'Iran', output: 'Tehran', pick: 'Iran',
          say: 'The test never mentions numbers: one allowed input, one settled output.' },
        { kind: 'machine', rule: 'a city in', input: 'Peru', output: 'Lima?', pick: 'compare',
          say: 'Change one word and it collapses. "A city in Peru" could answer Lima, or Cusco, or Arequipa. It does not settle, so it is not a function.' }
      ],
      hint: 'The last frame changes the rule, not the input. One word decides whether a rule is a function.',
      caption: 'Four presses. The first three keep the promise and the fourth shows how little it takes to break it.' },

    { t: 'example', n: 3,
      ask: 'A taxi charges £3.20 to start, then £1.40 for each mile. Write the rule in words and find the fare for 0, 3, and 10 miles.',
      steps: [
        'Identify the input and the output. The input is the number of miles; the output is the fare.',
        'Write the rule with a blank: multiply the ⬚ by 1.40, then add 3.20.',
        'At 0 miles: 0 × 1.40 + 3.20 = £3.20. The fare is not zero, because the charge to start does not depend on distance.',
        'At 3 miles: 4.20 + 3.20 = £7.40. At 10 miles: 14.00 + 3.20 = £17.20.'
      ],
      answer: '£3.20, £7.40, and £17.20.',
      note: 'The two numbers in the rule do different jobs. The 1.40 says how fast the fare grows; the 3.20 says where it starts. Chapter 6 names that pair, and chapter 11 shows the 1.40 is the only one a rate of change can see.',
      show: { kind: 'frames', label: 'The three fares',
        frames: [
          { kind: 'machine', rule: '1.40m + 3.20', input: '0', output: '3.20', pick: '0 miles', say: 'The fare is not zero, because the charge to start does not depend on distance.' },
          { kind: 'machine', rule: '1.40m + 3.20', input: '3', output: '7.40', pick: '3 miles', say: '3 × 1.40 = 4.20, then add 3.20.' },
          { kind: 'machine', rule: '1.40m + 3.20', input: '10', output: '17.20', pick: '10 miles', say: '10 × 1.40 = 14.00, then add 3.20. The 1.40 sets how fast the fare grows; the 3.20 sets where it starts.' }
        ] },
      turn: { ask: 'A plumber charges £60 to attend plus £45 an hour. Find the cost for 0, 2, and 4 hours.',
        a: '£60, £150, and £240.' } },

    { t: 'example', n: 4,
      ask: 'Which of these are functions of the stated input? (a) the price of a fixed-price ticket, given the day. (b) the winning lottery number, given the day. (c) the day of the week, given a date.',
      steps: [
        '(a) Each day has one price, and the price is fixed in advance. One input, one settled output.',
        '(b) Each day has one winning number once it is drawn, so it is a function of the day. But it cannot be predicted, which is a different complaint from being ill-defined.',
        '(c) Each date falls on exactly one weekday. One input, one output.',
        'All three qualify. Being unpredictable, or uninteresting, or non-numerical does not disqualify a rule.'
      ],
      answer: 'All three are functions.',
      note: 'Part (b) is the one that catches people. A function must be *settled*, not *guessable*. If you had asked instead for "a number that might win", the answer would have forked, and that would have failed.',
      show: { kind: 'mapping', pairs: [['Mon', 'GBP 9'], ['Tue', 'GBP 9'], ['Wed', 'GBP 9']],
        caption: 'Part (a) drawn: every day has one price, and the price being the same each day is sharing, not splitting.' },
      turn: { ask: 'Is "the tallest person in this room" a function of the room? What would break it?',
        a: 'Yes, provided the room is not empty and no two people are exactly equally tall. A tie forks the output, and an empty room gives no output at all, so both are ways the promise fails.' } }
  ],

  practice: [
    { q: 'A rule adds 3. Complete: 0 → __, 4 → __, −2 → __.', level: 'Calculate',
      a: '3, 7, 1.',
      show: { kind: 'frames', label: 'Each input through the rule',
        frames: [
          { kind: 'machine', rule: 'add 3', input: '0', output: '3', pick: '0', say: '0 + 3 = 3.' },
          { kind: 'machine', rule: 'add 3', input: '4', output: '7', pick: '4', say: '4 + 3 = 7.' },
          { kind: 'machine', rule: 'add 3', input: '-2', output: '1', pick: '−2', say: '−2 + 3 = 1, moving toward zero and past it.' }
        ] } },
    { q: 'A rule multiplies by 5. Complete: 0 → __, 2 → __, −1 → __.', level: 'Calculate',
      a: '0, 10, −5.',
      show: { kind: 'mapping', pairs: [['0', '0'], ['2', '10'], ['-1', '-5']],
        caption: 'Three inputs, three settled outputs, and one arrow each.' } },
    { q: 'A rule squares the input then subtracts 1. Complete: 0 → __, 3 → __, −3 → __.', level: 'Calculate',
      a: '−1, 8, 8. Both 3 and −3 give 8, which is allowed: two inputs may share an output.',
      show: { kind: 'mapping', pairs: [['0', '-1'], ['3', '8'], ['-3', '8']],
        caption: 'Both 3 and −3 land on 8. Two inputs sharing an output is allowed; the arrows still leave each input singly.' } },
    { q: 'Invent a function whose input is not a number, using a real machine.', level: 'Recognise',
      a: 'Answers vary. A lift is the standard one: the input is a button, the output is the floor it calls, and pressing 3 twice must call floor 3 twice. Any answer is right if the same input always gives the same output.',
      show: { kind: 'mapping', pairs: [['btn 1', 'floor 1'], ['btn 2', 'floor 2'], ['btn 3', 'floor 3']],
        caption: 'The standard answer drawn. Nothing here is a number and nothing needs to be: the test is one arrow out of each input.' } },
    { q: 'Explain why repeatability matters, without using the word function.', level: 'Recognise',
      a: 'Because a rule you cannot predict is a rule you cannot build on. If the same question can return different answers, nothing later can rely on the earlier answer, and no calculation, machine, or argument can be trusted to reach the same place twice.',
      show: { kind: 'frames', label: 'Build on it, or cannot',
        frames: [
          { kind: 'chain', stages: ['double it', 'add 1'], input: '3', values: [6, 7], pick: 'repeatable',
            say: 'The second machine can rely on the 6, so the pair has a settled answer.' },
          { kind: 'chain', stages: ['? or ?', 'add 1'], input: '3', values: ['6 or 9', '7 or 10'], pick: 'not repeatable',
            say: 'If the first machine will not settle, nothing downstream can. That is what is lost.' }
        ] } },
    { q: 'Is "a number bigger than x" a reliable rule? Say precisely what fails.', level: 'Recognise',
      a: 'No. It fails the second demand: the input 3 has outputs 4, 5, 3.1, and infinitely many more. It does not settle on one.',
      show: { kind: 'mapping', pairs: [['3', '4', '5', '3.1']], broken: '3',
        caption: 'One input, a crowd of candidate outputs, and no rule to choose between them. It fails the second demand, not the first.' } },
    { q: 'A pay-as-you-go machine charges 40p to start plus 15p per minute. Write the rule in words, then find the cost for 0, 5, and 12 minutes.', level: 'Represent',
      a: '"Multiply the minutes by 15p and add 40p." 40p, 115p, and 220p.',
      show: { kind: 'graph', f: m => 40 + 15 * m, title: 'THE THREE COSTS', note: '15m + 40', x0: 0, x1: 14, y0: 0, y1: 240, w: 280, h: 200,
        marks: [[0, 40], [5, 115], [12, 220]],
        caption: 'The cost at 0 minutes is 40p, not nothing, because the charge to start does not depend on time. That is where the line meets the vertical axis.' } },
    { q: 'Which does the definition guarantee: that the same input always gives the same output, or that different inputs always give different outputs?', level: 'Recognise',
      a: 'Only the first. Different inputs are free to share an output, as question 3 showed. Rules that also satisfy the second are called one-to-one, and chapter 9 needs them.',
      show: { kind: 'frames', label: 'Which is required?',
        frames: [
          { kind: 'mapping', pairs: [['1', '5'], ['2', '5'], ['3', '5']], pick: 'shared outputs',
            say: 'Allowed. Every input still gets exactly one answer, so this is a function.' },
          { kind: 'mapping', pairs: [['1', '5', '9']], broken: '1', pick: 'split output',
            say: 'Forbidden. One input, two answers. Only the first demand is guaranteed by the definition.' }
        ] } },
    { q: 'A table records 1 → 5, 2 → 7, 1 → 5. Is this a function so far?', level: 'Recognise',
      a: 'Yes. The input 1 appears twice but gives the same output both times, so nothing is unsettled. A repeated row is redundant, not contradictory.',
      show: { kind: 'mapping', pairs: [['1', '5'], ['2', '7']],
        caption: 'The repeated row drew the same arrow twice, so there is nothing extra to see. Redundant, not contradictory.' } },
    { q: 'A table records 1 → 5, 2 → 7, 1 → 9. Is this a function? Name the input that breaks it.', level: 'Recognise',
      a: 'No. The input 1 gives both 5 and 9.',
      show: { kind: 'mapping', pairs: [['1', '5', '9'], ['2', '7']], broken: '1',
        caption: 'The input 1 now has two arrows leaving it. One collision is enough, whatever the rest of the table does.' } },
    { q: 'Is "the number of letters in this English word" a function? What must be agreed first?', level: 'Recognise', hard: true,
      a: 'Yes, once the language and spelling are fixed. Without that, *colour* and *color* give 6 and 5 for what a reader might call the same input, so the input has to be the written word rather than the idea behind it.',
      show: { kind: 'mapping', pairs: [['colour', '6'], ['color', '5']],
        caption: 'Two spellings, two answers. The rule is a function of the written word, not of the idea behind it, which is why the convention has to be fixed first.' } },
    { q: 'Is air temperature a function of time? State what must be pinned down before the answer is yes.', level: 'Recognise', hard: true,
      a: 'Yes, once the place and the instrument are fixed. At one thermometer there is one reading at each instant. Across a whole city there are many, so "the temperature" would have to name which one, and until it does the input has not been fully specified.',
      show: { kind: 'mapping', pairs: [['09:00', '14 C'], ['12:00', '19 C'], ['15:00', '21 C']],
        caption: 'At one fixed thermometer, each instant has one reading. Across a whole city the same input would fork, so the place is part of the input.' } },
  ],

  misconception: {
    name: 'a function must be a formula',
    wrong: 'It is easy to read *f(x) = 2x* and conclude that anything without algebra in it is not a real function.',
    why: 'The formula is one representation, not the thing. The lift button, the table above, and the sentence "double it" are all functions, and none of them is algebra. Chapter 3 introduces formulas because they are compact and calculable, not because they are what a function is.'
  },

  review: 'Question 1 needed −2 + 3, and question 3 needed (−3)². If either was uncomfortable, work through signed arithmetic on the prerequisite spine before chapter 3, where every evaluation depends on substituting negatives without hesitation.'
};
