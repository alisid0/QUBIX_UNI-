// BB7 drafts. GATED behind BB1–BB6, same as BB6.
//
// The structure here is the one Thompson uses himself: do the derivation again
// on a second case, then a third, then read the pattern off the results. The
// rule is stated only after the learner has produced the evidence for it.

export const selections = {};
export const finalised = {};
export const gated = 'Locked by 02-MAIN-CURRICULUM-MAP until BB1–BB6 are approved.';

export const bb7 = {
  id: 'CME-CHANGE-007',
  title: 'The Rule for Powers',
  fork: 'Derive twice more, then read the pattern. The rule arrives last, not first.',
  structure: 'Four sections.',
  sections: [
    {
      code: 'S1',
      name: 'Do it again, for x³',
      sources: ['T7', 'T8'],
      readings: [
        { code: 'S1-A', text: 'Nothing about the method was special to squares. Take y = x³. Then y + dy = (x + dx)³ = x³ + 3x²·dx + 3x·(dx)² + (dx)³. Discard every term carrying more than one dx, subtract y = x³, divide by dx, and dy/dx = 3x².' },
        { code: 'S1-B', text: 'Run the same four steps on a cube: expand, discard the bits of bits, subtract the original, divide by dx. The answer is 3x².' }
      ],
      interactions: [
        { code: 'S1-I1', kind: 'rate-formula', note: 'The expansion with the discarded terms visibly struck through, so "second order of smallness" becomes a thing you can see rather than a phrase.' },
        { code: 'S1-I2', kind: 'growth-decomposition', note: 'The cube analogue of Fig. 1: three slabs of x²·dx do the work, the edges and corner are discarded.' }
      ],
      exercises: [
        {
          code: 'S1-X1', kind: 'choice',
          prompt: 'In the expansion of (x + dx)³, which terms are discarded?',
          options: [
            { label: '3x·(dx)² and (dx)³', correct: true },
            { label: 'Only (dx)³', feedback: '3x·(dx)² also carries two bits, so it is small of the second order too.' },
            { label: '3x²·dx', feedback: 'That is the term that survives. It carries exactly one dx.' }
          ]
        },
        {
          code: 'S1-X2', kind: 'choice',
          prompt: 'For y = x³, what is dy/dx?',
          options: [
            { label: '3x²', correct: true },
            { label: '3x', feedback: 'Check the surviving term: 3x²·dx divided by dx.' },
            { label: 'x²', feedback: 'The 3 comes from the three slabs and does not disappear.' }
          ]
        }
      ]
    },
    {
      code: 'S2',
      name: 'Three results, side by side',
      sources: ['T9'],
      readings: [
        { code: 'S2-A', text: 'Set the answers out together. For x², dy/dx is 2x. For x³ it is 3x². For x⁴ it is 4x³. Read the column before reading on: what happened to the power in each case, and where did the number in front come from?' },
        { code: 'S2-B', text: 'Three derivations, three answers: 2x, 3x², 4x³. The pattern is visible in the table before anyone states it as a rule.' }
      ],
      interactions: [
        { code: 'S2-I1', kind: 'power-table', note: 'The powers and their derivatives in a table, with the current row highlighted by the control. The pattern is meant to be noticed here, not told.' },
        { code: 'S2-I2', kind: 'two-cards', note: 'One power and its derivative at a time, so the learner predicts the next before it appears.' }
      ],
      exercises: [
        {
          code: 'S2-X1', kind: 'choice',
          prompt: 'From 2x, 3x² and 4x³, what would you expect for x⁵?',
          options: [
            { label: '5x⁴', correct: true },
            { label: '5x⁵', feedback: 'The power came down by one in every case so far.' },
            { label: 'x⁴', feedback: 'The number in front matched the original power each time.' }
          ]
        },
        { code: 'S2-X2', kind: 'set-control', prompt: 'Step the table up to x⁴ and check the pattern holds.', target: 3, tolerance: 0.3, from: 1.5 }
      ]
    },
    {
      code: 'S3',
      name: 'The rule, stated',
      sources: ['T9'],
      readings: [
        {
          code: 'S3-A',
          verbatim: 'T9',
          text: 'We have arrived at the following rule: To differentiate xⁿ, multiply by the power and reduce the power by one, so giving us nxⁿ⁻¹ as the result.'
        },
        { code: 'S3-B', text: 'The rule for any power: multiply by the power, then reduce the power by one. xⁿ becomes nxⁿ⁻¹. Everything derived so far is a case of it.' }
      ],
      interactions: [
        { code: 'S3-I1', kind: 'power-table', note: 'The same table with the rule applied to each row, so the general statement is checked against the worked cases.' },
        { code: 'S3-I2', kind: 'machine', note: 'xⁿ in, nxⁿ⁻¹ out. The rule as an operation performed on an expression.' }
      ],
      exercises: [
        {
          code: 'S3-X1', kind: 'choice',
          prompt: 'Apply the rule to y = x¹³.',
          options: [
            { label: '13x¹²', correct: true },
            { label: '13x¹³', feedback: 'The power reduces by one after multiplying.' },
            { label: 'x¹²', feedback: 'Multiplying by the power is the first half of the rule.' }
          ]
        },
        {
          code: 'S3-X2', kind: 'choice',
          prompt: 'Apply it to y = x. Writing x as x¹, what is dy/dx?',
          options: [
            { label: '1', correct: true },
            { label: '0', feedback: 'The rule gives 1·x⁰, and x⁰ is 1.' },
            { label: 'x', feedback: 'The power reduces to zero, and anything to the power zero is 1.' }
          ]
        }
      ]
    },
    {
      code: 'S4',
      name: 'A case you have not derived',
      sources: ['T9'],
      readings: [
        { code: 'S4-A', text: 'The test of a rule is a case you did not build it from. Thompson applies it to negative and fractional powers too: x⁻² gives −2x⁻³, and √x, written x^½, gives ½x^−½. The rule does not care that the power is not a whole number.' },
        { code: 'S4-B', text: 'The rule holds for powers that are negative or fractional, not only for counting numbers. That is what makes it worth having.' }
      ],
      interactions: [
        { code: 'S4-I1', kind: 'power-table', note: 'The table extended below x¹ into x⁰, x⁻¹, x⁻², where the pattern continues without interruption.' },
        { code: 'S4-I2', kind: 'machine', note: 'Any power in, its derivative out, including fractional ones.' }
      ],
      exercises: [
        {
          code: 'S4-X1', kind: 'choice',
          prompt: 'Apply the rule to y = x⁻².',
          options: [
            { label: '−2x⁻³', correct: true },
            { label: '−2x⁻¹', feedback: 'Reducing −2 by one gives −3, not −1.' },
            { label: '2x⁻³', feedback: 'The multiplier is the power itself, including its sign.' }
          ]
        },
        {
          code: 'S4-X2', kind: 'choice',
          prompt: 'Why is testing the rule on x⁻² worth doing?',
          options: [
            { label: 'It was not one of the cases the rule was read off from', correct: true },
            { label: 'Negative powers are more important', feedback: 'They are not more important. They are outside the evidence used to form the rule.' },
            { label: 'To check the arithmetic of the earlier cases', feedback: 'Those were already checked. This tests reach, not arithmetic.' }
          ]
        }
      ]
    }
  ]
};
