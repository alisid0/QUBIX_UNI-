// Factory options for BB4. Two founder notes drive this one.
//
// First: the result was being displayed inside a circle. 4.10 cm²/cm is a ratio,
// and a ratio has no shape, so a prominent circle on a screen about area invited
// exactly the reading the founder reported. Every variant here presents the
// result without giving it a geometry.
//
// Second: Thompson's ch. II expansion is the arithmetic underneath. (x + dx)²
// = x² + 2x·dx + (dx)², so Δy = 2x·dx + (dx)² and Δy/Δx = 2x + dx. At x = 2 that
// is 4 + the interval, which is precisely what the app computes.

export const selections = {};
export const finalised = {};

export const bb4 = {
  id: 'CME-CHANGE-004',
  title: 'Average Rate of Change',
  fork: 'Pieces separately: two changes, then the comparison, then the units.',
  structure: 'Three sections.',
  sections: [
    {
      code: 'S1',
      name: 'Two changes, not one',
      sources: ['T3'],
      readings: [
        { code: 'S1-A', text: 'Widen the side and two things change at once. The side gains Δx. The area gains Δy. Thompson notes that the bit added to y will not, except by a miracle, be the same size as the bit added to x.' },
        { code: 'S1-B', text: 'A single move produces two changes: one in the side, one in the area. They are different sizes. Holding both at once is what this section is for.' }
      ],
      interactions: [
        { code: 'S1-I1', kind: 'two-bars', note: 'Δx and Δy as two bars against a common baseline. The size difference is the whole point, and bars show it directly.' },
        { code: 'S1-I2', kind: 'growth-decomposition', note: 'Thompson Fig. 1: the area gain drawn as the two strips plus the corner, so the difference in size has a visible reason.' }
      ],
      exercises: [
        {
          code: 'S1-X1', kind: 'choice',
          prompt: 'The side gains 0.5 cm and the area gains 2.25 cm². Why are they different?',
          options: [
            { label: 'They measure different kinds of quantity', correct: true },
            { label: 'A mistake in the arithmetic', feedback: 'Both are correct. 2.5² − 2² really is 2.25.' },
            { label: 'The area gain should equal 0.5 squared', feedback: '0.25 is only the small corner. Most of the gain is the two strips along the sides.' }
          ]
        },
        { code: 'S1-X2', kind: 'set-control', prompt: 'Widen the side until the area gain passes 3 cm².', above: 2.7, from: 2.1 }
      ]
    },
    {
      code: 'S2',
      name: 'Compare them by dividing',
      sources: ['T4'],
      readings: [
        { code: 'S2-A', text: 'To compare the two changes, divide one by the other: Δy/Δx. From 2 to 2.5 that is 2.25 ÷ 0.5 = 4.5. The area grew four and a half times as fast as the side.' },
        { code: 'S2-B', text: 'Δy/Δx answers a single question: how much area is gained for each centimetre added to the side. Dividing is what turns two separate changes into one number.' }
      ],
      interactions: [
        { code: 'S2-I1', kind: 'ratio-plain', note: 'The fraction with the result in a plain readout, matching the value card used elsewhere. No circle.' },
        { code: 'S2-I2', kind: 'two-bars', note: 'The two bars with the ratio between them stated as a multiple, so division is visibly a comparison.' }
      ],
      exercises: [
        {
          code: 'S2-X1', kind: 'choice',
          prompt: 'Δy is 2.25 and Δx is 0.5. What is Δy/Δx?',
          options: [
            { label: '4.5', correct: true },
            { label: '1.125', feedback: 'That multiplies instead of dividing.' },
            { label: '2.75', feedback: 'That adds the two changes. The comparison is a division.' }
          ]
        },
        {
          code: 'S2-X2', kind: 'choice',
          prompt: 'What does the number 4.5 tell you?',
          options: [
            { label: 'How much area is gained per centimetre of side', correct: true },
            { label: 'The area of the new square', feedback: 'That is 6.25. This is a comparison of two changes, not an area.' },
            { label: 'How much the side grew', feedback: 'That is Δx, which is 0.5.' }
          ]
        }
      ]
    },
    {
      code: 'S3',
      name: 'The answer carries units',
      sources: ['T4'],
      readings: [
        { code: 'S3-A', text: 'The units survive the division: cm² divided by cm leaves cm² per cm. That is why 4.5 is a rate and not an area. A rate has no shape and no size of its own; it is a comparison.' },
        { code: 'S3-B', text: 'An average rate of change is change in output divided by change in input. Here the output is area and the input is a length, so the rate is measured in cm² per cm.' }
      ],
      interactions: [
        { code: 'S3-I1', kind: 'ratio-plain', note: 'Units shown alongside the result, so cm² ÷ cm is visible as it cancels.' },
        { code: 'S3-I2', kind: 'rate-formula', note: 'The algebra live: Δy/Δx = 2x + Δx. At x = 2 the rate is 4 plus whatever the interval is, which is where BB5 begins.' }
      ],
      exercises: [
        {
          code: 'S3-X1', kind: 'choice',
          prompt: 'Why is 4.5 measured in cm² per cm rather than cm²?',
          options: [
            { label: 'It is a comparison of an area change with a length change', correct: true },
            { label: 'Because the square is measured in centimetres', feedback: 'The unit comes from the division, not from the square.' },
            { label: 'It should be cm²; the extra unit is a slip', feedback: 'The unit is real. Dividing cm² by cm cannot leave cm².' }
          ]
        },
        {
          code: 'S3-X2', kind: 'set-control',
          prompt: 'Narrow the interval until the rate drops below 4.3.',
          below: 2.3, from: 2.9
        }
      ]
    }
  ]
};
