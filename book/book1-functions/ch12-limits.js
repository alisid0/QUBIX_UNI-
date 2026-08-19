// 11. Limits: what is approached
//
// Part II. These three chapters open Books 2, 3 and 4 rather than completing
// them, but they are taught rather than trailed: a reader should finish Book 1
// able to evaluate a simple limit, not merely able to describe one.

export default {
  id: 12,
  part: 'PART II - THE NEXT BOOKS',
  title: 'Limits: what is approached',
  standfirst: 'A limit asks where the outputs are heading, and declines to ask what happens on arrival.',

  blocks: [
    { t: 'p', text: 'Chapter 11 ended with a quotient that behaved well for every h except 0, where it collapsed into 0/0. That is not a defect in the arithmetic. It is the ordinary situation, and limits are the tool built for it.' },
    { t: 'p', text: 'Consider the rule below. At x = 1 the denominator is zero, so the expression has no value there at all.' },
    { t: 'formula', text: 'f(x) = (x^2 - 1)/(x - 1)' },

    { t: 'figure', kind: 'table',
      head: ['x', 'f(x)'],
      rows: [['0.9', '1.9'], ['0.99', '1.99'], ['0.999', '1.999'], ['1', 'no value'], ['1.001', '2.001'], ['1.01', '2.01'], ['1.1', '2.1']],
      caption: 'Approaching from both sides. The outputs crowd around 2 without the input ever arriving at 1.' },

    { t: 'p', text: 'The outputs are not merely near 2; they can be forced as near to 2 as anyone demands by choosing x near enough to 1. That is the content of the statement written:' },
    { t: 'formula', text: 'limit as x -> 1 of f(x) = 2' },

    { t: 'figure', kind: 'graph', f: x => (x * x - 1) / (x - 1), title: 'A HOLE, AND A LIMIT', note: '(x^2-1)/(x-1)',
      x0: -2, x1: 4, y0: -1, y1: 6, w: 280, h: 200, holes: [[1, 2]],
      caption: 'The open circle marks a point the graph does not contain. The curve arrives at its edge from both directions, which is why the limit exists although the value does not.' },

    { t: 'h', text: 'Why the hole is there, and why it does not matter' },
    { t: 'p', text: 'Factor the numerator: x² − 1 = (x − 1)(x + 1). So for every x other than 1, the expression simplifies to x + 1. It is a straight line with one point punched out. At x = 1 the cancellation is illegal, because it divides by zero, and that single forbidden step is the entire hole.' },
    { t: 'callout', title: 'A limit never asks about the point itself',
      text: 'The definition speaks only of inputs near the target, never of the target. So a function may be undefined there, or defined with a value that disagrees with the limit, and the limit is unaffected either way.' },

    { t: 'example', n: 1,
      ask: 'Evaluate the limit of (x^2 - 4)/(x - 2) as x approaches 2.',
      steps: [
        'Substitute first, to see what kind of problem this is: (4 − 4)/(2 − 2) = 0/0, which names no number.',
        'That form is a signal to factor, not a verdict. x² − 4 = (x − 2)(x + 2).',
        'Cancel the common factor, legally, because x is near 2 but never equal to it: the expression is x + 2.',
        'Now the outputs plainly crowd around 2 + 2 = 4.'
      ],
      answer: '4.',
      note: 'The expression still has no value at x = 2. The limit is 4 regardless, and that gap between value and limit is the whole subject.',
      show: { kind: 'graph', f: x => (x * x - 4) / (x - 2), title: 'A HOLE AT x = 2', note: '(x^2-4)/(x-2)', x0: -1, x1: 5, y0: 0, y1: 8, w: 280, h: 205, holes: [[2, 4]],
        caption: 'The line x + 2 with one point punched out. The curve arrives at the edge of the hole from both sides, which is why the limit is 4 although the value does not exist.' },
      turn: { ask: 'Evaluate the limit of (x^2 - 25)/(x - 5) as x approaches 5.', a: '10, by factoring to (x − 5)(x + 5) and cancelling.' } },

    { t: 'example', n: 2,
      ask: 'Does 1/x have a limit as x approaches 0?',
      steps: [
        'Approach from above: 1/0.1 = 10, 1/0.01 = 100, 1/0.001 = 1000. The outputs climb without bound.',
        'Approach from below: 1/(−0.1) = −10, then −100, then −1000. They plunge without bound.',
        'The two sides do not head for a common destination, and neither side heads for any number at all.',
        'So there is no limit. Saying "the limit is infinity" would be a description of the failure, not a value.'
      ],
      answer: 'No limit exists at 0.',
      note: 'Compare with the first example. Both expressions are undefined at the point in question; one has a limit there and the other has none. Being undefined settles nothing.',
      show: { kind: 'graph', f: x => 1 / x, title: 'THE TWO SIDES DISAGREE', note: '1/x', x0: -3, x1: 3, y0: -8, y1: 8, w: 280, h: 215,
        caption: 'Approaching zero from the right the curve climbs off the top; from the left it falls off the bottom. There is no number both sides are heading for.' },
      turn: { ask: 'Does 1/x^2 have a limit as x approaches 0? How does it differ from 1/x?',
        a: 'It has no limit either, but for a different reason: both sides climb without bound rather than disagreeing. The two sides agree on the direction and still settle on no number.' } },

    { t: 'h', text: 'What Book 2 does with this' },
    { t: 'p', text: 'Approach from a table, then on a graph, then one side at a time. Then holes and jumps, which is continuity. Then limits that run off to infinity, then the algebraic methods that replace tables. The sequence ends where chapter 13 begins, with the limit that defines a derivative.' },

    { t: 'h', text: 'Zooming in' },
    { t: 'p', text: 'A limit is a claim about what happens arbitrarily close to a point, so the honest way to look at one is to keep closing in. Each frame below is the same rule, in a narrower window around x = 1.' },

    { t: 'figure', kind: 'zoom', f: x => (x * x - 1) / (x - 1), at: 1, holeAt: 2, spans: [2, 0.5, 0.1],
      caption: 'The window narrows from ±2 to ±0.1 and the hole never fills. What does happen is that the curve either side of it becomes indistinguishable from the height 2, which is exactly what "the limit is 2" asserts.' },

    { t: 'callout', title: 'What zooming can and cannot show',
      text: 'Zooming builds the right intuition and proves nothing. However far you go, you have looked at finitely many windows, and a limit is a claim about all of them. Book 2 replaces the picture with a definition that settles it.' },

    { t: 'example', n: 3,
      ask: 'Evaluate the limit of (x^2 + 3x)/x as x approaches 0.',
      steps: [
        'Substitute to classify: (0 + 0)/0 = 0/0, so more work is needed.',
        'Factor the numerator: x² + 3x = x(x + 3).',
        'Cancel the x, legally, because x is near 0 but never equal to it: the expression is x + 3.',
        'The outputs crowd around 0 + 3 = 3.'
      ],
      answer: '3.',
      note: 'The rule still has no value at 0. The graph is the line x + 3 with a hole punched at (0, 3).',
      show: { kind: 'graph', f: x => (x * x + 3 * x) / x, title: 'A HOLE AT x = 0', note: '(x^2+3x)/x', x0: -4, x1: 4, y0: -2, y1: 8, w: 280, h: 205, holes: [[0, 3]],
        caption: 'The line x + 3, missing exactly one point. Cancelling the x was legal everywhere except at the point the cancellation removed.' },
      turn: { ask: 'Evaluate the limit of (x^2 - 5x)/x as x approaches 0.',
        a: '−5. Factor to x(x − 5), cancel the x, and the outputs crowd around −5.' } },

    { t: 'example', n: 4,
      ask: 'A function is defined as f(x) = x + 1 for every x except x = 3, where f(3) = 10. Find the limit at 3, and the value at 3.',
      steps: [
        'For the limit, look only at inputs near 3 and not at 3 itself.',
        'Near 3 the rule is x + 1, so the outputs crowd around 4.',
        'For the value, read the definition: it says f(3) = 10.',
        'Both exist, and they disagree.'
      ],
      answer: 'The limit is 4; the value is 10.',
      note: 'This is a function with a single point lifted out of place. It has a limit everywhere, a value everywhere, and one point where the two differ, which is precisely what discontinuity at a point means.',
      show: { kind: 'graph', f: x => x + 1, title: 'LIMIT 4, VALUE 10', note: 'lifted at x = 3', x0: 0, x1: 6, y0: 0, y1: 11, w: 280, h: 210, holes: [[3, 4]], marks: [[3, 10]],
        caption: 'The hollow circle is where the curve is heading; the solid one is where the function actually is. Both exist and they disagree, which is what discontinuity at a point looks like.' },
      turn: { ask: 'g(x) = 2x for every x except x = 5, where g(5) = 0. What is the limit at 5, and the value?',
        a: 'The limit is 10 and the value is 0. The definition at the point cannot affect the limit.' } }
  ],

  practice: [
    { q: 'From the table above, what value is f(x) approaching as x approaches 1?', level: 'Analyse change',
      a: '2.',
      show: { kind: 'graph', f: x => (x * x - 1) / (x - 1), title: 'CROWDING AROUND 2', note: '(x^2-1)/(x-1)', x0: -2, x1: 4, y0: -1, y1: 6, w: 280, h: 205, holes: [[1, 2]],
        caption: 'The tabulated values approach the hollow circle from both sides without ever landing on it.' } },
    { q: 'Explain how a function can have a limit where it has no value.', level: 'Recognise',
      a: 'Because the limit is determined entirely by inputs near the point and never by the point itself. If the nearby outputs crowd around a single number, that number is the limit, whether or not anything is defined at the target.',
      show: { kind: 'zoom', f: x => (x * x - 1) / (x - 1), at: 1, holeAt: 2, spans: [2, 0.5, 0.1],
        caption: 'Zoom as far as you like and the hole never fills, while the curve either side becomes indistinguishable from the height 2. The limit is about the neighbours, never the point.' } },
    { q: 'Sketch a graph with a hole at x = 2 but a limit of 5 there.', level: 'Represent',
      a: 'Any curve passing smoothly through height 5 at x = 2, with that one point drawn as an open circle. For instance y = x + 3 with x = 2 removed.',
      show: { kind: 'graph', f: x => x + 3, title: 'A HOLE AT x = 2, LIMIT 5', note: 'y=x+3 with (2,5) removed', x0: -1, x1: 5, y0: 0, y1: 8, w: 280, h: 205, holes: [[2, 5]],
        caption: 'One valid answer. Any curve passing smoothly through height 5 at x = 2, with that single point drawn hollow, does the job.' } },
    { q: 'Evaluate the limit of (x^2 − 4)/(x − 2) as x approaches 2.', level: 'Calculate',
      a: '4, by factoring to (x − 2)(x + 2) and cancelling.',
      show: { kind: 'graph', f: x => (x * x - 4) / (x - 2), title: 'LIMIT 4', note: '(x^2-4)/(x-2)', x0: -1, x1: 5, y0: 0, y1: 8, w: 280, h: 205, holes: [[2, 4]],
        caption: 'Factoring turned it into x + 2 everywhere except at 2, where the cancellation would have divided by zero. That one forbidden step is the entire hole.' } },
    { q: 'Evaluate the limit of (x^2 − 9)/(x − 3) as x approaches 3.', level: 'Calculate',
      a: '6. Factor to (x − 3)(x + 3), cancel, and substitute 3 into x + 3.',
      show: { kind: 'graph', f: x => (x * x - 9) / (x - 3), title: 'LIMIT 6', note: '(x^2-9)/(x-3)', x0: 0, x1: 6, y0: 2, y1: 10, w: 280, h: 205, holes: [[3, 6]],
        caption: 'The same manoeuvre one number along: the expression is x + 3 with the point at 3 removed.' } },
    { q: 'Evaluate the limit of 3x + 1 as x approaches 2. Why is this one easy?', level: 'Calculate',
      a: '7. Substitution works directly because the rule has no gap at x = 2, which is what it means for a function to be continuous there.',
      show: { kind: 'graph', f: x => 3 * x + 1, title: 'NO GAP TO WORRY ABOUT', note: 'y=3x+1', x0: -1, x1: 4, y0: -2, y1: 12, w: 280, h: 200, marks: [[2, 7]],
        caption: 'The point is filled, not hollow. Where a function has no gap, substitution simply works, and that is what continuity at a point means.' } },
    { q: 'Does 1/x have a limit as x approaches 0? Justify using both sides.', level: 'Analyse change',
      a: 'No. From above the outputs grow without bound; from below they fall without bound. The two sides disagree and neither settles.',
      show: { kind: 'graph', f: x => 1 / x, title: 'THE SIDES DISAGREE', note: '1/x', x0: -3, x1: 3, y0: -8, y1: 8, w: 280, h: 215,
        caption: 'From the right the curve climbs off the top of the frame; from the left it drops off the bottom. Neither side settles on a number, so there is no limit to report.' } },
    { q: 'A function is defined to be 7 at x = 1, but nearby outputs crowd around 2. What is the limit at 1?', level: 'Recognise', hard: true,
      a: '2. The value at the point is irrelevant to the limit. Here the limit exists, the value exists, and they disagree, which is exactly what it means for a function to be discontinuous at that point.',
      show: { kind: 'graph', f: x => x + 1, title: 'LIMIT 2, VALUE 7', note: 'lifted at x = 1', x0: -1, x1: 4, y0: 0, y1: 8, w: 280, h: 205, holes: [[1, 2]], marks: [[1, 7]],
        caption: 'The hollow circle is where the curve is heading; the solid one is where the function has been defined to be. The value at the point never affects the limit.' } },
    { q: 'Evaluate the limit of (x − 1)/(x^2 − 1) as x approaches 1.', level: 'Calculate', hard: true,
      a: '1/2. Factor the denominator to (x − 1)(x + 1) and cancel, leaving 1/(x + 1), which crowds around 1/2.',
      show: { kind: 'graph', f: x => 1 / (x + 1), title: 'LIMIT ONE HALF', note: '(x-1)/(x^2-1)', x0: -0.5, x1: 4, y0: 0, y1: 1.2, w: 280, h: 200, holes: [[1, 0.5]],
        caption: 'Cancelling the common factor leaves 1/(x + 1), which crowds around one half. The hole is where the cancellation was illegal.' } },
    { q: 'Why is 0/0 called an indeterminate form rather than an error?', level: 'Recognise', hard: true,
      a: 'Because it does not decide the answer. Questions 4, 5 and 9 all substitute to 0/0 and have the limits 4, 6 and 1/2. The form tells you only that more work is needed, which is usually factoring.',
      show: { kind: 'frames', label: 'The same form, three different answers',
        frames: [
          { kind: 'graph', f: x => (x * x - 4) / (x - 2), title: 'LIMIT 4', note: '0/0 at x=2', x0: 0, x1: 4, y0: 2, y1: 7, w: 250, h: 185, holes: [[2, 4]], pick: 'gives 4',
            say: 'Substituting gives 0/0, and the answer is 4.' },
          { kind: 'graph', f: x => (x * x - 9) / (x - 3), title: 'LIMIT 6', note: '0/0 at x=3', x0: 1, x1: 5, y0: 4, y1: 9, w: 250, h: 185, holes: [[3, 6]], pick: 'gives 6',
            say: 'Same form, and the answer is 6.' },
          { kind: 'graph', f: x => 1 / (x + 1), title: 'LIMIT ONE HALF', note: '0/0 at x=1', x0: 0, x1: 4, y0: 0, y1: 1.2, w: 250, h: 185, holes: [[1, 0.5]], pick: 'gives 1/2',
            say: 'Same form again, and now the answer is a half. The form decides nothing, which is why it is called indeterminate rather than wrong.' }
        ] } },
    { q: 'For f(x) = x^2, use the difference quotient at x = 3 to write a limit whose answer is the local rate.', level: 'Analyse change', hard: true,
      a: 'The limit as h approaches 0 of [(3 + h)² − 9]/h, which simplifies to 6 + h and so approaches 6. Chapter 11 question 7 did the algebra; this writes it as the limit it always was.',
      show: { kind: 'secants', f: x => x * x, a: 3, bs: [5, 4.2, 3.6, 3.2], x0: 1, x1: 6, y0: 0, y1: 28, w: 320, h: 230,
        caption: 'The limit as h approaches 0 of [(3 + h)\u00b2 \u2212 9]/h. Each secant is one value of the quotient, and they close on 6.' } },
    { q: 'A function jumps from 3 to 8 at x = 4, with no gradual change. Does it have a limit at 4?', level: 'Analyse change', hard: true,
      a: 'No. Approaching from the left the outputs head for 3 and from the right for 8. A limit requires both sides to agree, so a jump has no limit even though the function has a value everywhere.',
      show: { kind: 'graph', f: x => x < 4 ? 3 : 8, title: 'A JUMP AT x = 4', note: 'left 3, right 8', x0: 1, x1: 7, y0: 0, y1: 11, w: 280, h: 205, holes: [[4, 3]], marks: [[4, 8]],
        caption: 'From the left the outputs head for 3, from the right for 8. Both sides settle, and they settle on different numbers, so there is no limit even though the function has a value everywhere.' } },
  ],

  misconception: {
    name: 'undefined at a point means no limit at that point',
    wrong: 'The expression has no value at x = 1, so there is nothing to say about its behaviour there.',
    why: 'Being undefined at the point and having a limit at the point are independent facts. Example 1 is undefined at 2 and has the limit 4; example 2 is undefined at 0 and has no limit. The value at the point never enters the question. Question 8 completes the picture: a function can be defined there, have a limit there, and have the two disagree.'
  },

  review: 'Chapter 4 insisted that a domain be stated precisely and promised the reason would arrive later. This is the reason: the interesting question at a missing point is what the function approaches, and it can only be asked once you know which points are missing.'
};
