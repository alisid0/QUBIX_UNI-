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

    { t: 'p', text: 'The last row is the instructive one. "A number bigger than 3" is a perfectly clear instruction and a perfectly useless function, because it does not name an answer. It names a crowd of them. A rule that leaves you a choice has not done its job.' },

    { t: 'h', text: 'A first table' },
    { t: 'p', text: 'The plainest way to record a function is to list what it does. A table cannot show every input, but it can show the pattern.' },

    { t: 'figure', kind: 'table',
      head: ['input x', 'rule', 'output f(x)'],
      rows: [['0', 'double it', '0'], ['1', 'double it', '2'], ['2', 'double it', '4'], ['3', 'double it', '6'], ['4', 'double it', '8']],
      caption: 'A table is a function, not merely a picture of one. If the table is all you are given, the table is the rule.' },

    { t: 'example', n: 1,
      ask: 'A rule adds 3 to its input. Build the table for the inputs 0, 4, and −2.',
      steps: [
        'Read the rule as an instruction with a blank in it: *take the input, add 3*.',
        'Put 0 in the blank: 0 + 3 = 3.',
        'Put 4 in the blank: 4 + 3 = 7.',
        'Put −2 in the blank: −2 + 3 = 1. Adding a positive to a negative moves it toward zero and past it.'
      ],
      answer: '0 → 3, 4 → 7, −2 → 1.',
      note: 'Notice that the rule never asked whether the input was positive. A function accepts whatever its domain allows, and −2 is allowed here.' },

    { t: 'example', n: 2,
      ask: 'A vending machine has given three different snacks for slot B4 this week. Has it broken the promise?',
      steps: [
        'Ask what the input is. It is the slot code B4, the same input each time.',
        'Ask what the outputs were. Three different snacks.',
        'One input, three outputs. The promise is broken.'
      ],
      answer: 'Yes. The machine is not computing a function of the slot code.',
      note: 'A working engineer would say the machine is stocked wrong. A mathematician says the same thing differently: the output depends on something the input does not record, so the true input is not the slot code alone.' }
  ],

  practice: [
    { q: 'A rule adds 3. Complete: 0 → __, 4 → __, −2 → __.', level: 'Calculate',
      a: '3, 7, 1.' },
    { q: 'A rule multiplies by 5. Complete: 0 → __, 2 → __, −1 → __.', level: 'Calculate',
      a: '0, 10, −5.' },
    { q: 'A rule squares the input then subtracts 1. Complete: 0 → __, 3 → __, −3 → __.', level: 'Calculate',
      a: '−1, 8, 8. Both 3 and −3 give 8, which is allowed: two inputs may share an output.' },
    { q: 'Invent a function whose input is not a number, using a real machine.', level: 'Recognise',
      a: 'Answers vary. A lift is the standard one: the input is a button, the output is the floor it calls, and pressing 3 twice must call floor 3 twice. Any answer is right if the same input always gives the same output.' },
    { q: 'Explain why repeatability matters, without using the word function.', level: 'Recognise',
      a: 'Because a rule you cannot predict is a rule you cannot build on. If the same question can return different answers, nothing later can rely on the earlier answer, and no calculation, machine, or argument can be trusted to reach the same place twice.' },
    { q: 'Is "a number bigger than x" a reliable rule? Say precisely what fails.', level: 'Recognise',
      a: 'No. It fails the second demand: the input 3 has outputs 4, 5, 3.1, and infinitely many more. It does not settle on one.' },
    { q: 'A pay-as-you-go machine charges 40p to start plus 15p per minute. Write the rule in words, then find the cost for 0, 5, and 12 minutes.', level: 'Represent',
      a: '"Multiply the minutes by 15p and add 40p." 40p, 115p, and 220p.' },
    { q: 'Which does the definition guarantee: that the same input always gives the same output, or that different inputs always give different outputs?', level: 'Recognise',
      a: 'Only the first. Different inputs are free to share an output, as question 3 showed. Rules that also satisfy the second are called one-to-one, and chapter 9 needs them.' },
    { q: 'A table records 1 → 5, 2 → 7, 1 → 5. Is this a function so far?', level: 'Recognise',
      a: 'Yes. The input 1 appears twice but gives the same output both times, so nothing is unsettled. A repeated row is redundant, not contradictory.' },
    { q: 'A table records 1 → 5, 2 → 7, 1 → 9. Is this a function? Name the input that breaks it.', level: 'Recognise',
      a: 'No. The input 1 gives both 5 and 9.' },
    { q: 'Is "the number of letters in this English word" a function? What must be agreed first?', level: 'Recognise', hard: true,
      a: 'Yes, once the language and spelling are fixed. Without that, *colour* and *color* give 6 and 5 for what a reader might call the same input, so the input has to be the written word rather than the idea behind it.' },
    { q: 'Is air temperature a function of time? State what must be pinned down before the answer is yes.', level: 'Recognise', hard: true,
      a: 'Yes, once the place and the instrument are fixed. At one thermometer there is one reading at each instant. Across a whole city there are many, so "the temperature" would have to name which one, and until it does the input has not been fully specified.' }
  ],

  misconception: {
    name: 'a function must be a formula',
    wrong: 'It is easy to read *f(x) = 2x* and conclude that anything without algebra in it is not a real function.',
    why: 'The formula is one representation, not the thing. The lift button, the table above, and the sentence "double it" are all functions, and none of them is algebra. Chapter 3 introduces formulas because they are compact and calculable, not because they are what a function is.'
  },

  review: 'Question 1 needed −2 + 3, and question 3 needed (−3)². If either was uncomfortable, work through signed arithmetic on the prerequisite spine before chapter 3, where every evaluation depends on substituting negatives without hesitation.'
};
