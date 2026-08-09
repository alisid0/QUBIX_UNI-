// Factory options for "What a Button Does", drafted 2026-08-09 on founder
// direction: introduce functions with something simpler than algebra. A switch,
// a tap, then buttons on a real machine, and only then the rule about one input
// and one output.
//
// This board sits BEFORE "A Number In, A Number Out". Both existing function
// boards open at algebra, which assumes the learner already accepts that a rule
// takes a value to a value. This one earns that.
//
// STATUS. The board is ORIGINAL. No book on the shelf describes a light switch,
// and inventing a Victorian citation for one would be worse than saying so.
// What is not original is the move: Hardy introduces the idea with a physical
// apparatus you can operate, a cylinder closed by a sliding piston, and credits
// it to Carslaw (H6, §20 Examples X.4, printed page 39). Put weight on the
// piston, the volume falls and the pressure rises. A tap is that apparatus with
// the Victorian plumbing taken off. So the board modernises an existing move
// rather than inventing one, and the record should say exactly that.
//
// ON THE WORD. The founder's framing turns on "the function of a button",
// meaning the job it does. That is not a pun exploited for convenience. The
// mathematical term comes from Leibniz, who used functio in an unpublished
// manuscript of 1673 for a magnitude performing a particular duty, from the
// Latin for performance or carrying out. The everyday sense and the
// mathematical one are the same word, and the everyday one came first. This is
// recorded from secondary sources rather than from a transcription we have read,
// so it belongs in a design note and not in sources.js, and the record should
// carry it with that caveat.
//
// THE SEAM WITH THE NEXT BOARD, which needs a founder decision. Section 4 shows
// a machine that fails to give one answer. There are two ways to build that and
// they are not the same failure:
//
//   S4-I1  the button forks to two dispensers and both cups come out at once.
//   S4-I2  the button gives tea sometimes and coffee other times.
//
// The next board's failing rule is "a number whose square is x", which returns
// 3 and −3 every time, reliably, and has no way of choosing between them. That
// is I1. I2 is a machine that is merely unpredictable, which is a different
// fault and one the course never returns to. I1 is drafted as the recommended
// one for that reason, but I2 is the more intuitive picture of "you cannot rely
// on it" and is drafted in full so the two can be compared in place.

export const selections = {};
export const finalised = {};
export const rejected = {};
export const gated = 'Belongs to a proposed pilot that has not been approved, and is ORIGINAL, a status the declaration does not yet carry. Nothing here has been selected yet.';

export const func0 = {
  id: 'FCG-FUNC-000',
  title: 'What a Button Does',
  fork: 'Everyday machines first. The rule about one output arrives as the thing that makes a machine usable, not as a definition.',
  structure: 'Four sections, each machine more capable than the last.',
  sections: [
    {
      code: 'S1',
      name: 'A switch has two positions',
      sources: [],
      readings: [
        {
          code: 'S1-A',
          text: 'A light switch has two positions. Put it up and the light comes on. Put it down and the light goes off. Put it up again and the light comes on again, exactly as before. The switch has no moods and no memory. Each position has its own result, and that result does not vary.'
        },
        {
          code: 'S1-B',
          text: 'Every switch in your house does the same small thing: it takes a position and gives back a state. Up gives on, down gives off, and it does so every single time. If a switch gave a different answer on Tuesday you would replace it.'
        }
      ],
      interactions: [
        {
          code: 'S1-I1', kind: 'switch-toggle',
          note: 'A switch, a lamp, and a tally that counts how many times each position has been chosen and what happened each time. The tally is the point rather than decoration: it turns "it does the same thing every time" from a claim into something the learner has counted. Nothing is asserted that the counter does not show.'
        },
        {
          code: 'S1-I2', kind: 'switch-plain',
          note: 'The switch and the lamp, no tally. Cleaner, and the flick is satisfying, but repeatability is then something the learner is told rather than something they have watched accumulate.'
        }
      ],
      exercises: [
        {
          code: 'S1-X1', kind: 'choice',
          prompt: 'You put the switch up and the light comes on. You put it up again. What happens?',
          options: [
            { label: 'The light comes on again', correct: true },
            { label: 'It might do something different', feedback: 'Then it would be a broken switch. The whole use of a switch is that it does not surprise you.' },
            { label: 'Nothing, because it is already on', feedback: 'True of the light, but ask about the switch: the position up still means on.' }
          ],
          successNote: 'Same position, same result. That is the only property this board is really about.',
          revealNote: 'Up means on, and it means on every time.'
        },
        {
          code: 'S1-X2', kind: 'match',
          prompt: 'Match each position to what it gives.',
          bins: ['on', 'off'],
          items: [
            { label: 'up', bin: 'on' },
            { label: 'down', bin: 'off' }
          ],
          successNote: 'Two positions in, two states out, and each position knows which one it gives.'
        },
        {
          code: 'S1-X3', kind: 'choice',
          prompt: 'A switch is found that turns the light on some days and off others, from the same position. What would you say about it?',
          options: [
            { label: 'It is broken', correct: true },
            { label: 'It is a more interesting switch', feedback: 'It is certainly less useful. You could not tell anyone what putting it up does.' },
            { label: 'It has two settings in one', feedback: 'A second setting would be a second position. This one gives two answers from a single position.' }
          ],
          successNote: 'Hold on to this. Section 4 comes back to it, and so does the board after this one.',
          revealNote: 'A switch that will not settle on one result is no use, which is exactly why the rule matters.'
        }
      ]
    },
    {
      code: 'S2',
      name: 'A tap has more than two',
      sources: ['H6'],
      readings: [
        {
          code: 'S2-A',
          text: 'A switch offers two positions. A tap offers every position between shut and wide open, and each one gives its own rate of flow. Turn it a quarter and a trickle comes out. Turn it to the same quarter tomorrow and the same trickle comes out. There are far more positions than a switch has, and the rule is unchanged: each position has one result of its own.'
        },
        {
          code: 'S2-B',
          text: 'Not every machine has only two settings. A tap runs smoothly from shut to fully open, and every position in between gives its own flow. What holds for the switch holds here too, over many more settings: pick a position and the flow that follows is settled.'
        }
      ],
      interactions: [
        {
          code: 'S2-I1', kind: 'tap-valve',
          note: 'A tap dial from shut to full open with the flow shown as a number and as a bar. Founder direction. The step from two settings to many is the step from a table to a rule, and it is worth making with water before it is made with letters. Returning the dial to a setting already visited shows the same flow again, which is the switch tally repeated in a continuous form.'
        },
        {
          code: 'S2-I2', kind: 'tap-piston',
          note: 'Hardy\'s apparatus rather than a tap: weight on a piston, with the volume falling as the pressure rises. Closer to the source and it shows two quantities moving together rather than a setting producing an output, but a gas cylinder is further from a learner\'s hands than a tap is, which is the whole reason for this board.'
        }
      ],
      exercises: [
        {
          code: 'S2-X1', kind: 'choice',
          prompt: 'What does a tap have that a light switch does not?',
          options: [
            { label: 'Many settings rather than two', correct: true },
            { label: 'A result for each setting', feedback: 'The switch has that too. Up gives on, down gives off. Look at how many settings there are.' },
            { label: 'The ability to give two answers at once', feedback: 'Neither of them does that. A tap set to one place gives one flow.' }
          ],
          successNote: 'More settings, same rule. The number of settings is not what makes something a function.',
          revealNote: 'A tap runs through every position between shut and open.'
        },
        {
          code: 'S2-X2', kind: 'choice',
          prompt: 'You set the tap to half open, then shut it, then set it to half open again. What comes out the second time?',
          options: [
            { label: 'The same flow as the first time', correct: true },
            { label: 'Less, because it was shut in between', feedback: 'The tap does not remember being shut. Only its present position decides the flow.' },
            { label: 'It cannot be said', feedback: 'It can. The position settles the flow, and the position is the same.' }
          ],
          successNote: 'What happened before does not enter into it. Only the setting you are on now.',
          revealNote: 'Same setting, same flow, no matter what happened in between.'
        }
      ]
    },
    {
      code: 'S3',
      name: 'What each button does',
      sources: [],
      readings: [
        {
          code: 'S3-A',
          text: 'A drinks machine has a row of buttons. Each one has a job: this button is for tea, that one for coffee, that one for soup. The job a button does is called its function, and the word has been used that way for far longer than it has been used in mathematics. Press a button and one drink arrives. The panel is a list of what goes in, and beside each entry, what comes out.'
        },
        {
          code: 'S3-B',
          text: 'Put several switches side by side, give each one a job, and you have a machine with a panel. Press any button and you get the one thing that button is for. Which button you press is what goes in. Which drink arrives is what comes out.'
        }
      ],
      interactions: [
        {
          code: 'S3-I1', kind: 'machine-panel',
          note: 'Four buttons, four results, and a log that fills as they are pressed. Founder direction: buttons in a machine with more than one control. The log is what makes it more than a toy, because after eight presses the learner is looking at a table of inputs and outputs without having been told that is what a table is. Note that two buttons deliberately give the same drink, so many-to-one is met here as an ordinary fact about machines rather than as a rule to be learned later.'
        },
        {
          code: 'S3-I2', kind: 'machine-labels',
          note: 'The same panel with each button permanently labelled by what it gives, no pressing and no log. Reads faster and makes the pairing obvious, but obvious is the problem: nothing is discovered, and the table arrives already written.'
        }
      ],
      exercises: [
        {
          code: 'S3-X1', kind: 'match',
          prompt: 'Sort each part of the drinks machine by the job it does.',
          bins: ['What goes in', 'What comes out'],
          items: [
            { label: 'the button you press', bin: 'What goes in' },
            { label: 'the drink that arrives', bin: 'What comes out' },
            { label: 'your choice of button', bin: 'What goes in' },
            { label: 'the cup in the tray', bin: 'What comes out' }
          ],
          successNote: 'Every machine on this board splits the same way. Something chosen, and something that follows from the choice.'
        },
        {
          code: 'S3-X2', kind: 'choice',
          prompt: 'Buttons 2 and 4 both give coffee. Is anything wrong with the machine?',
          options: [
            { label: 'No, two buttons may give the same drink', correct: true },
            { label: 'Yes, each button must give something different', feedback: 'Nothing requires that. A machine with a second coffee button is merely convenient.' },
            { label: 'Yes, because you cannot tell which button was pressed', feedback: 'You pressed it, so you know. And the machine is not asked to work backwards.' }
          ],
          successNote: 'Two buttons may share a drink. What no button may do is give two drinks. That difference is the next section.',
          revealNote: 'Nothing stops two buttons doing the same job.'
        },
        {
          code: 'S3-X3', kind: 'choice',
          prompt: 'Why is the job a button does called its function?',
          options: [
            { label: 'Because that is what the word has always meant', correct: true },
            { label: 'Because mathematicians named it after the machine', feedback: 'It went the other way round. The word was already in use for a duty performed.' },
            { label: 'It is a coincidence of language', feedback: 'It is the same word with the same root, meaning a duty carried out.' }
          ],
          successNote: 'The everyday sense came first, and mathematics borrowed it. Nothing here is a play on words.',
          revealNote: 'Function means a duty performed. The mathematical use is the borrowed one.'
        }
      ]
    },
    {
      code: 'S4',
      name: 'A machine you can rely on',
      sources: [],
      readings: [
        {
          code: 'S4-A',
          text: 'Now a machine that will not do this. One of its buttons has been wired to two dispensers at once, so pressing it sends out tea and coffee together. Nothing is broken that you could point at. The button simply has no way of choosing between them. You could not order a drink from it, because there is no answer to the question of what that button gives. A machine is usable when each button gives one result, and one only. That is what mathematics calls a function.'
        },
        {
          code: 'S4-B',
          text: 'A machine is worth having when you can say what each button does before you press it. One result for each button, always the same one. Where a button gives two results, or gives a different one each time, there is nothing to say and nothing to rely on. Mathematics takes that condition and makes it the test: one input, one result, or it is not a function.'
        }
      ],
      interactions: [
        {
          code: 'S4-I1', kind: 'forked-button',
          note: 'Recommended. Two panels side by side: a sound machine, and one whose third button forks to two dispensers so that both cups arrive every time. The failure is reliable rather than random, which matters, because the next board\'s failing rule returns 3 and −3 every time and has no way of choosing between them. Building this failure the same way means the next board recognises something rather than meeting it fresh.'
        },
        {
          code: 'S4-I2', kind: 'flaky-button',
          note: 'The same pair of panels, but the faulty button gives tea sometimes and coffee other times. A more natural picture of not being able to rely on something, and the phrase learners reach for first. It is a different fault, though: unpredictability rather than two answers at once, and the course never returns to it. Drafted so the two can be compared, but choosing it leaves section 4 pointing somewhere the next board does not go.'
        }
      ],
      exercises: [
        {
          code: 'S4-X1', kind: 'choice',
          prompt: 'A button sends out tea and coffee together, every time. Why is that a problem?',
          options: [
            { label: 'There is no answer to what that button gives', correct: true },
            { label: 'It wastes a cup', feedback: 'True and irrelevant. Suppose cups were free; you still could not say what the button does.' },
            { label: 'It is unpredictable', feedback: 'It is entirely predictable: both, every time. The trouble is that both is not an answer to "which".' }
          ],
          successNote: 'Predictable and still unusable. Two answers is a failure even when it never varies.',
          revealNote: 'The question "what does this button give" has no single answer.'
        },
        {
          code: 'S4-X2', kind: 'match',
          prompt: 'Sort each machine by whether it is a function.',
          bins: ['Is a function', 'Is not'],
          items: [
            { label: 'a light switch', bin: 'Is a function' },
            { label: 'a tap', bin: 'Is a function' },
            { label: 'two buttons giving the same drink', bin: 'Is a function' },
            { label: 'one button giving two drinks', bin: 'Is not' }
          ],
          successNote: 'Two buttons sharing a drink is fine. One button giving two is not. Almost every mistake with functions is this pair the wrong way round.'
        },
        {
          code: 'S4-X3', kind: 'choice',
          prompt: 'State the test in your own terms. A machine is a function when:',
          options: [
            { label: 'each thing you can put in gives exactly one result', correct: true },
            { label: 'every result comes from exactly one input', feedback: 'That is the test backwards, and it is not required. Two buttons may give the same drink.' },
            { label: 'it has a result for everything you could put in', feedback: 'Useful, but not the test. A tap that jams above half open still gives one flow for each setting it accepts.' }
          ],
          successNote: 'Exactly one result for each input. The next board takes that sentence and applies it to rules instead of machines.',
          revealNote: 'One input, one result, and always the same one.'
        }
      ]
    }
  ],

  workshops: [
    {
      code: 'W1',
      name: 'The repair bench',
      kind: 'repair-bench',
      blurb: 'Three machines on the bench. Press their buttons as often as you like, then say which can be relied on.',
      machines: [
        { name: 'Machine A', kind: 'sound', buttons: ['tea', 'coffee', 'soup', 'coffee'] },
        { name: 'Machine B', kind: 'forked', buttons: ['tea', 'coffee and soup', 'soup', 'water'] },
        { name: 'Machine C', kind: 'sound', buttons: ['water', 'water', 'water', 'water'] }
      ],
      goals: [
        { id: 'b1', text: 'Press every button on every machine at least once' },
        { id: 'b2', text: 'Find the button that gives two drinks' },
        { id: 'b3', text: 'Pass the two machines that can be relied on' },
        { id: 'b4', text: 'Fail the one that cannot' }
      ],
      note: 'Machine C is the trap. Every one of its buttons gives water, so a learner testing whether the machine is any use will often fail it. It is a perfectly good function: dull, but each input has exactly one result. Machine A has two buttons giving coffee, which is the same point in a milder form. The bench is arranged so that the only real failure is the forked button, and both tempting wrong answers are ordinary functions.'
    }
  ]
};
