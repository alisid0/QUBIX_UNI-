// BB9 and BB10 drafts. GATED, and further out than BB6–BB8: these two sit past
// the end of 02-MAIN-CURRICULUM-MAP, which currently stops at unit 8. Adding
// units to the map is a founder decision and has not been taken.
//
// Together they finish the algebra needed to differentiate any polynomial: a
// constant contributes no rate, and a sum is differentiated term by term.

export const selections = {};
export const finalised = {};
export const gated = 'Beyond the end of the curriculum map, which stops at unit 8. Adding units is a founder decision, not yet taken.';

export const bb9 = {
  id: 'CME-CHANGE-009',
  title: 'The Two Kinds of Constant',
  fork: 'A constant has no rate of its own. Added constants vanish; multiplying constants survive.',
  structure: 'Three sections.',
  sections: [
    {
      code: 'S1',
      name: 'A number that does not change',
      sources: ['T13', 'T1'],
      readings: [
        {
          code: 'S1-A',
          text: 'The next question is what constants do to the process. A constant is a number that does not change when x or y change.'
        },
        { code: 'S1-B', text: 'A constant is a number that stays put while x moves. You met them back in BB2 as the quantities of fixed value. The question now is what they do to a rate.' }
      ],
      interactions: [
        { code: 'S1-I1', kind: 'sorter', note: 'The chips from BB2 return: file each as fixed or able to vary. The distinction BB2 made is the one this BB needs.' },
        { code: 'S1-I2', kind: 'two-cards', note: 'A constant and a variable side by side, one card responding to the control and one refusing to.' }
      ],
      exercises: [
        {
          code: 'S1-X1', kind: 'choice',
          prompt: 'In y = x³ + 5, which part is the constant?',
          options: [
            { label: '5', correct: true },
            { label: 'x³', feedback: 'x³ changes whenever x does.' },
            { label: 'y', feedback: 'y changes as a consequence of x. It is the dependent variable.' }
          ]
        },
        { code: 'S1-X2', kind: 'set-control', prompt: 'Move x and watch which of the two cards responds.', above: 2.4, from: 2 }
      ]
    },
    {
      code: 'S2',
      name: 'An added constant contributes nothing',
      sources: ['T13'],
      readings: [
        { code: 'S2-A', text: 'Take y = x³ + 5 and grow x by a bit. The cube gains 3x²·dx, and the 5 gains nothing, because 5 never moves. Subtracting and dividing leaves dy/dx = 3x², exactly as if the 5 had not been there.' },
        { code: 'S2-B', text: 'Adding a constant lifts the whole curve without tilting it. The height changes everywhere; the steepness changes nowhere. So an added constant disappears when you differentiate.' }
      ],
      interactions: [
        { code: 'S2-I1', kind: 'curve-secant', note: 'Two curves, one lifted above the other by a constant, with the same slope line on each. Height differs, tilt does not.' },
        { code: 'S2-I2', kind: 'rate-formula', note: 'The working with the constant term struck out at the moment it contributes zero.' }
      ],
      exercises: [
        {
          code: 'S2-X1', kind: 'choice',
          prompt: 'For y = x² + 100, what is dy/dx?',
          options: [
            { label: '2x', correct: true },
            { label: '2x + 100', feedback: 'The 100 never grows, so it adds nothing to dy.' },
            { label: '2x + 1', feedback: 'A constant contributes nothing at all, not one.' }
          ]
        },
        {
          code: 'S2-X2', kind: 'choice',
          prompt: 'Why does lifting a curve leave its slope unchanged?',
          options: [
            { label: 'Every point rises by the same amount, so no point rises more than its neighbour', correct: true },
            { label: 'Because slopes are always positive', feedback: 'Slopes can be negative. That is not the reason.' },
            { label: 'Because the constant is small', feedback: 'It works for a constant of any size, including 100.' }
          ]
        }
      ]
    },
    {
      code: 'S3',
      name: 'A multiplying constant survives',
      sources: ['T13'],
      readings: [
        { code: 'S3-A', text: 'Multiplying is different from adding. For y = 7x², every bit of growth is seven times as large, so dy/dx = 7 · 2x = 14x. The constant does not vanish; it scales the rate.' },
        { code: 'S3-B', text: 'A constant in front stretches the curve upward. Stretching does change the steepness, and by exactly the same factor. So a multiplying constant is carried through.' }
      ],
      interactions: [
        { code: 'S3-I1', kind: 'curve-secant', note: 'A curve and its stretched copy, with visibly different slope lines. The contrast with S2 is the lesson.' },
        { code: 'S3-I2', kind: 'machine', note: 'ax^n in, anx^(n−1) out, with the constant travelling through the machine unchanged.' }
      ],
      exercises: [
        {
          code: 'S3-X1', kind: 'choice',
          prompt: 'For y = 7x², what is dy/dx?',
          options: [
            { label: '14x', correct: true },
            { label: '2x', feedback: 'That drops the 7. Multiplying constants are not discarded.' },
            { label: '7x', feedback: 'The power rule still applies to the x² part: 7 × 2x.' }
          ]
        },
        {
          code: 'S3-X2', kind: 'choice',
          prompt: 'Why does an added constant vanish while a multiplying one does not?',
          options: [
            { label: 'Adding shifts every point equally; multiplying scales the growth itself', correct: true },
            { label: 'Because multiplication is stronger than addition', feedback: 'Strength is not the reason. It is what each does to the differences between neighbouring points.' },
            { label: 'It is a convention', feedback: 'Both results come out of the same derivation, not from a convention.' }
          ]
        }
      ]
    }
  ]
};

export const bb10 = {
  id: 'CME-CHANGE-010',
  title: 'Term by Term',
  fork: 'One rule, one section of evidence, one section of practice.',
  structure: 'Three sections.',
  sections: [
    {
      code: 'S1',
      name: 'Two functions added together',
      sources: ['T14'],
      readings: [
        {
          code: 'S1-A',
          text: 'What about the sum of two or more functions? The answer is simpler than it looks: differentiate them one after the other.'
        },
        { code: 'S1-B', text: 'An expression is often several pieces added together. Each piece grows at its own rate, and the growth of the whole is those growths added up. So differentiate the pieces one at a time.' }
      ],
      interactions: [
        { code: 'S1-I1', kind: 'two-bars', note: 'Two growths as separate bars and their total as a third, so adding rates is a thing you watch rather than a rule you accept.' },
        { code: 'S1-I2', kind: 'power-table', note: 'Each term of an expression with its own derivative alongside, assembled into the answer.' }
      ],
      exercises: [
        {
          code: 'S1-X1', kind: 'choice',
          prompt: 'For y = x² + x³, what is dy/dx?',
          options: [
            { label: '2x + 3x²', correct: true },
            { label: '2x · 3x²', feedback: 'The terms were added, so their rates add too.' },
            { label: '5x⁵', feedback: 'Powers are not combined by adding them. Differentiate each term as it stands.' }
          ]
        },
        {
          code: 'S1-X2', kind: 'choice',
          prompt: 'For y = x⁴ − x², what is dy/dx?',
          options: [
            { label: '4x³ − 2x', correct: true },
            { label: '4x³ + 2x', feedback: 'A subtraction stays a subtraction.' },
            { label: '2x³', feedback: 'Each term keeps its own derivative; they are not merged.' }
          ]
        }
      ]
    },
    {
      code: 'S2',
      name: 'Why term by term is allowed',
      sources: ['T14'],
      readings: [
        { code: 'S2-A', text: 'Let y = u + v, where u and v are each functions of x. Grow x by dx: u gains du, v gains dv, and y gains both. So dy = du + dv, and dividing by dx gives dy/dx = du/dx + dv/dx. Nothing is assumed; it falls out of the same four steps used since BB6.' },
        { code: 'S2-B', text: 'The rule is not a convenience. If y is u plus v, then the bit added to y is the bit added to u plus the bit added to v, and dividing through by dx gives the sum of the two rates.' }
      ],
      interactions: [
        { code: 'S2-I1', kind: 'rate-formula', note: 'y = u + v carried through the four steps, so the general case is done once rather than asserted.' },
        { code: 'S2-I2', kind: 'two-bars', note: 'du and dv stacked to make dy, then all three divided by the same dx.' }
      ],
      exercises: [
        {
          code: 'S2-X1', kind: 'choice',
          prompt: 'The derivation relies on one fact about u and v. Which?',
          options: [
            { label: 'Both are functions of the same x', correct: true },
            { label: 'Both are powers of x', feedback: 'The derivation never uses their form. u and v can be anything that depends on x.' },
            { label: 'Both are positive', feedback: 'Sign plays no part in it.' }
          ]
        },
        {
          code: 'S2-X2', kind: 'choice',
          prompt: 'Would the same argument work for u × v?',
          options: [
            { label: 'No, because the bit added to a product is not the sum of the bits', correct: true },
            { label: 'Yes, products behave like sums', feedback: 'They do not. Expanding (u + du)(v + dv) leaves a term neither piece contributes alone.' },
            { label: 'Yes, provided u and v are powers', feedback: 'Their form is not the problem. Multiplication is.' }
          ]
        }
      ]
    },
    {
      code: 'S3',
      name: 'Everything so far, at once',
      sources: ['T9', 'T13', 'T14'],
      readings: [
        { code: 'S3-A', text: 'Three rules now cover any polynomial. Differentiate each term with the power rule, carry multiplying constants through, and drop added constants. For y = 3x⁴ − 5x² + 9 that gives dy/dx = 12x³ − 10x.' },
        { code: 'S3-B', text: 'Take the terms one at a time. Multiply by the power and reduce it, keep any number in front, and let a lone number go. That handles every polynomial you will meet for a long while.' }
      ],
      interactions: [
        { code: 'S3-I1', kind: 'machine', note: 'A whole polynomial in, its derivative out, with each term processed visibly in turn.' },
        { code: 'S3-I2', kind: 'power-table', note: 'The three rules listed against a worked example, each term traced to the rule that handled it.' }
      ],
      exercises: [
        {
          code: 'S3-X1', kind: 'choice',
          prompt: 'For y = 3x⁴ − 5x² + 9, what is dy/dx?',
          options: [
            { label: '12x³ − 10x', correct: true },
            { label: '12x³ − 10x + 9', feedback: 'The 9 is an added constant and contributes nothing.' },
            { label: '12x³ − 10x + 1', feedback: 'A constant contributes nothing at all, not one.' }
          ]
        },
        {
          code: 'S3-X2', kind: 'choice',
          prompt: 'Which rule handles the −5x² term?',
          options: [
            { label: 'The power rule, with the multiplying constant carried through', correct: true },
            { label: 'The added-constant rule', feedback: '−5 multiplies x²; it is not added on its own.' },
            { label: 'None; that term is dropped', feedback: 'Only lone numbers are dropped. This one contains x.' }
          ]
        }
      ]
    }
  ]
};
