// Factory options for "One Answer, Not Two", the second functions board of the
// proposed Functions and Coordinate Geometry pilot. Drafted 2026-08-09.
//
// The pilot proposal records this board as ORIGINAL, on the grounds that no book
// on the shelf states the property. That is wrong. Hardy states it exactly, at
// §20 printed page 38, as the second of three characteristics, and works the
// failing case at Examples X.3 on page 39 with y² = x.
//
// THE CATCH, which the record must carry and which must not be quietly dropped.
// Hardy lists the one-value property and then immediately refuses to make it
// part of the definition: "they are by no means essential to a function. All
// that is essential is that there should be some relation between x and y such
// that to some values of x at any rate correspond values of y." His 1908
// definition is the relational one. Modern school usage went the other way and
// promoted his second characteristic into the definition itself.
//
// So this board teaches a convention, not a theorem, and the honest form of the
// claim is that present-day usage adopts Hardy's second characteristic as
// definitional. Section 2 is written to say exactly that rather than to pretend
// the source demands it. If the founder would rather the board simply assert the
// modern rule, S2-C is drafted for that and the difference is recorded.
//
// What is new here against every board before it: this is the first thing in the
// course that can fail to be something. Everything so far has been a definition
// to accept or a construction to carry out.

export const selections = {};
export const finalised = {};
export const rejected = {};
export const gated = 'Belongs to a proposed pilot that has not been approved, and rests on a convention the source declines to require. See the header of func2-options.js. Nothing here has been selected yet.';

export const func2 = {
  id: 'FCG-FUNC-002',
  title: 'One Answer, Not Two',
  fork: 'A rule is made to fail before the rule against failing is stated.',
  structure: 'Three sections.',
  sections: [
    {
      code: 'S1',
      name: 'A rule that answers twice',
      sources: ['H4'],
      readings: [
        {
          code: 'S1-A',
          text: 'Here is a rule: give me a number, and I will give you back a number whose square is the one you gave me. Feed it 9 and it answers 3. It also answers −3, because −3 multiplied by itself is 9 as well. Both answers are correct, and the rule has no way of choosing between them.'
        },
        {
          code: 'S1-B',
          text: 'Take the rule "a number whose square is x". Put in 9 and two answers come back, 3 and −3, and each of them is right. Nothing about the rule prefers one to the other. Every machine so far has returned a single answer; this one does not.'
        }
      ],
      interactions: [
        {
          code: 'S1-I1', kind: 'two-answers',
          note: 'The machine from the previous board, with the same body, but the output pipe forks. Step the input up and two answers slide out side by side, except at 0 where the fork collapses to a single 0 and below it where nothing comes out at all. One object carries all three of Hardy\'s cases, and the learner meets them by stepping rather than by being told.'
        },
        {
          code: 'S1-I2', kind: 'square-back',
          note: 'Two panels: the squaring machine going forwards, and the same pairs read backwards. Shows where the second answer comes from, which the fork does not explain. Weaker as an opening because it explains before the learner has felt anything is wrong.'
        }
      ],
      exercises: [
        {
          code: 'S1-X1', kind: 'choice',
          prompt: 'The rule is "a number whose square is x". What does it return for 25?',
          options: [
            { label: '5 and −5', correct: true },
            { label: '5', feedback: 'Correct as far as it goes, but −5 multiplied by itself is also 25. The rule has no reason to leave it out.' },
            { label: '12.5', feedback: 'That is half of 25. Squaring is a number multiplied by itself, not by two.' }
          ],
          successNote: 'Two answers, both correct. That is the difficulty, and it is not a mistake in the arithmetic.',
          revealNote: '5 × 5 = 25 and −5 × −5 = 25, so both qualify.'
        },
        {
          code: 'S1-X2', kind: 'choice',
          prompt: 'For which input does this rule return exactly one answer?',
          options: [
            { label: '0', correct: true },
            { label: '1', feedback: '1 and −1 both square to 1, so that is two answers again.' },
            { label: '4', feedback: '2 and −2 both square to 4, so that is two answers again.' }
          ],
          successNote: 'Nought is its own negative, so the two answers land on top of each other.',
          revealNote: 'Only 0, because 0 and −0 are the same number.'
        },
        {
          code: 'S1-X3', kind: 'choice',
          prompt: 'What does the rule return for −9?',
          options: [
            { label: 'Nothing at all', correct: true },
            { label: '−3', feedback: '−3 multiplied by itself is 9, not −9. Two negatives multiplied give a positive.' },
            { label: '3 and −3', feedback: 'Both of those square to 9. Neither of them squares to −9.' }
          ],
          successNote: 'No number multiplied by itself gives a negative, so for −9 the rule has nothing to say.',
          revealNote: 'There is no such number, so the rule returns nothing.'
        }
      ]
    },
    {
      code: 'S2',
      name: 'One answer, or it is not a function',
      sources: ['H1', 'H2', 'H3'],
      readings: [
        {
          code: 'S2-A',
          text: 'A hundred years ago this rule would still have been called a function, and its two answers described as an awkwardness to be handled. Present-day usage draws the line more tightly: to be a function, a rule must return one answer and one only for each number it accepts. On that reading the rule above is not a function at all. The change is a matter of agreement, not of discovery.'
        },
        {
          code: 'S2-B',
          text: 'The rule that a function returns exactly one answer for each input is a convention rather than a fact. It was written down as one property that most useful functions happen to have, and later hardened into the definition, because rules with a single answer are far easier to work with. Two answers is now enough to disqualify a rule.'
        },
        {
          code: 'S2-C',
          text: 'A function gives exactly one answer for each number it accepts. A rule that returns two answers for the same input is not a function. This is the test, and it is the only test on this board.'
        }
      ],
      interactions: [
        {
          code: 'S2-I1', kind: 'function-or-not',
          note: 'Five rules on cards, each with a test button. Tapping one runs three inputs through it and shows what comes back, then the learner rules on it. Judgement comes after evidence rather than from the wording of the card, which is the only way the test becomes a thing the learner performs rather than recites.'
        },
        {
          code: 'S2-I2', kind: 'verdict-strip',
          note: 'One rule at a time with a verdict switch beneath, worked through in a fixed order ending on the hard case. Tighter, and it controls the order the cases arrive in, but it does not let the learner return to an earlier rule after seeing a later one.'
        }
      ],
      exercises: [
        {
          code: 'S2-X1', kind: 'match',
          prompt: 'Sort each rule by whether it is a function.',
          bins: ['Is a function', 'Is not'],
          items: [
            { label: 'double it', bin: 'Is a function' },
            { label: 'square it', bin: 'Is a function' },
            { label: 'a number whose square is x', bin: 'Is not' },
            { label: 'add three', bin: 'Is a function' }
          ],
          successNote: 'Squaring is a function even though 2 and −2 share an answer. Sharing an answer is allowed; having two is not.'
        },
        {
          code: 'S2-X2', kind: 'choice',
          prompt: 'Squaring sends both 2 and −2 to 4. Does that stop it being a function?',
          options: [
            { label: 'No, because each input still gets one answer', correct: true },
            { label: 'Yes, because two numbers share an answer', feedback: 'The test looks forwards, not backwards. Ask what each input returns, not how many inputs produced an answer.' },
            { label: 'Only when the input is negative', feedback: 'Negative inputs are fine here. −2 goes in and 4 comes out, one answer.' }
          ],
          successNote: 'Many inputs may share one answer. One input may not have many answers. This is the confusion the whole board exists to settle.',
          revealNote: 'Feed in 2, get 4. Feed in −2, get 4. Each input got exactly one answer.'
        },
        {
          code: 'S2-X3', kind: 'choice',
          prompt: 'Why is the one-answer rule described here as an agreement rather than a discovery?',
          options: [
            { label: 'Earlier mathematicians used the word without requiring it', correct: true },
            { label: 'Because it has never been proved', feedback: 'There is nothing to prove. A definition decides what a word covers; it is not the sort of claim that is true or false.' },
            { label: 'Because it is not really true', feedback: 'It is true of functions as the word is now used. What changed is what the word is taken to cover.' }
          ],
          successNote: 'Definitions are decisions. Knowing which parts of mathematics are decisions is worth as much as knowing the results.',
          revealNote: 'The property was named first as something most functions have, and only later made a requirement.'
        }
      ]
    },
    {
      code: 'S3',
      name: 'Some numbers it will not take',
      sources: ['H4', 'H5'],
      readings: [
        {
          code: 'S3-A',
          text: 'There is a second way a rule can fall short. Ask the squaring rule to run backwards from −9 and it returns nothing, because no number multiplied by itself is negative. A rule need not accept every number. Which numbers it will take is part of what the rule is, and has to be stated along with it.'
        },
        {
          code: 'S3-B',
          text: 'Returning two answers is one failing. Returning none is another. The numbers a rule will accept are part of the rule, so saying what a rule does means saying what it will take as well as what it gives back.'
        }
      ],
      interactions: [
        {
          code: 'S3-I1', kind: 'accepted-line',
          note: 'A number line with a marker that can be dragged along it. Where the rule accepts the number the line lights and the answer appears; where it does not the line greys and the machine stays shut. The boundary at 0 is found by dragging rather than announced, and the learner can sit on it.'
        },
        {
          code: 'S3-I2', kind: 'accepted-list',
          note: 'A column of numbers each marked accepted or refused, with the reason beside the refusals. Says more, but a list of eight numbers cannot show that the refusal covers a whole stretch of the line rather than scattered points, which is the actual idea.'
        }
      ],
      exercises: [
        {
          code: 'S3-X1', kind: 'match',
          prompt: 'For the rule "a number whose square is x", sort each input.',
          bins: ['Accepted', 'Refused'],
          items: [
            { label: '16', bin: 'Accepted' },
            { label: '0', bin: 'Accepted' },
            { label: '−1', bin: 'Refused' },
            { label: '−100', bin: 'Refused' }
          ],
          successNote: 'Everything from 0 upwards is accepted and everything below it refused. The refusal is a whole stretch of the line, not a scattering.'
        },
        {
          code: 'S3-X2', kind: 'choice',
          prompt: 'A rule divides 1 by the number you give it. Which input does it refuse?',
          options: [
            { label: '0', correct: true },
            { label: '−1', feedback: '1 divided by −1 is −1. Negative numbers are fine for this rule.' },
            { label: '0.5', feedback: '1 divided by 0.5 is 2. Fractions are fine for this rule.' }
          ],
          successNote: 'A different rule, refusing a different number, and for its own reason. Which numbers are refused depends on the rule.',
          revealNote: 'Nothing can be divided by nought, so 0 is the one input this rule will not take.'
        }
      ]
    }
  ],

  workshops: [
    {
      code: 'W1',
      name: 'The rule inspector',
      kind: 'rule-inspector',
      blurb: 'Five rules on the bench. Test each one and pass or fail it.',
      rules: [
        { name: 'double it', ok: true },
        { name: 'square it', ok: true },
        { name: 'a number whose square is x', ok: false, why: 'two answers' },
        { name: '1 divided by it', ok: true, refuses: '0' },
        { name: 'a number bigger than x', ok: false, why: 'endlessly many answers' }
      ],
      goals: [
        { id: 'r1', text: 'Find a rule that gives two answers' },
        { id: 'r2', text: 'Find a rule that refuses one particular number but is still a function' },
        { id: 'r3', text: 'Find a rule that fails worse than two answers' },
        { id: 'r4', text: 'Pass all three of the rules that are functions' }
      ],
      note: 'Goal 3 is the one that pays. "A number bigger than x" returns endlessly many answers, so the learner meets a failure of the same kind as the square root but far past it in degree, and the point that the count must be exactly one lands without being asserted. Goal 2 separates refusing an input from failing the test, which is the pair of ideas sections 2 and 3 arrive at separately and which the bench puts on one screen.'
    }
  ]
};
