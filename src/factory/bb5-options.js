// Factory options for BB5, cut for the founder's reversal of 2026-08-09: the two
// points begin together and the slider drives them apart, so the control reads
// the natural way round.
//
// That reversal changes the argument as well as the mechanism. The old version
// told a convergence story, watching rates settle on 4. This one says 4 is the
// true local rate and every finite interval overstates it, by exactly the width
// of the interval. Thompson's ch. II expansion is why: Δy/Δx = 2x + dx, so at
// x = 2 the average rate is 4 + the interval. The app already computes this.

export const selections = {};
export const finalised = {};

export const bb5 = {
  id: 'CME-CHANGE-005',
  title: 'Instantaneous Rate of Change',
  fork: 'Together first, then driven apart. Founder reversal of 2026-08-09.',
  structure: 'Four sections.',
  sections: [
    {
      code: 'S1',
      name: 'Two points, almost touching',
      sources: ['T3'],
      readings: [
        { code: 'S1-A', text: 'Keep the first point at x = 2 and put the second almost on top of it. With no gap worth speaking of, the line through the two lies flat along the curve.' },
        { code: 'S1-B', text: 'An average rate needs two points. Put them so close together that the interval is nearly nothing, and the line joining them stops being a chord and becomes a line that grazes the curve.' }
      ],
      interactions: [
        { code: 'S1-I1', kind: 'curve-secant', note: 'The parabola with the line through both points, extended past them. When the points coincide a segment between them would be invisible; an extended line reads as the tangent.' },
        { code: 'S1-I2', kind: 'rate-formula', note: 'The algebra alone, with no picture: 2x + Δx at x = 2. Some learners meet this better as arithmetic than as geometry.' }
      ],
      exercises: [
        {
          code: 'S1-X1', kind: 'choice',
          prompt: 'With the two points almost together, what is the average rate?',
          options: [
            { label: 'Almost exactly 4', correct: true },
            { label: 'Zero, because the gap is almost zero', feedback: 'Both Δy and Δx shrink together. Their ratio does not vanish.' },
            { label: 'Undefined', feedback: 'It would be undefined at a gap of exactly zero. Here the gap is small, not nothing.' }
          ]
        },
        { code: 'S1-X2', kind: 'set-control', prompt: 'Bring the two points to the smallest interval available.', target: 0, tolerance: 0.4, from: 4 }
      ]
    },
    {
      code: 'S2',
      name: 'Drive them apart',
      sources: [],
      readings: [
        { code: 'S2-A', text: 'Widen the gap and the average rate climbs: 4.001, then 4.01, 4.1, 4.5, and 5. The line tilts away from the curve as it goes.' },
        { code: 'S2-B', text: 'The further apart the two points, the worse the line matches the curve near x = 2, and the further the average rate sits from 4.' }
      ],
      interactions: [
        { code: 'S2-I1', kind: 'curve-secant', note: 'The same line, now visibly tilting off the curve as the gap opens.' },
        { code: 'S2-I2', kind: 'rate-ladder', note: 'The five intervals and their rates as a list, with the current one marked. Shows the whole sequence at once rather than one value at a time.' }
      ],
      exercises: [
        {
          code: 'S2-X1', kind: 'choice',
          prompt: 'Widening the interval makes the average rate…',
          options: [
            { label: 'Move further above 4', correct: true },
            { label: 'Move further below 4', feedback: 'Check the readout as you drag. The rates run 4.001, 4.01, 4.1, 4.5, 5.' },
            { label: 'Stay at 4', feedback: 'Only the smallest interval is near 4. The rate changes as the gap opens.' }
          ]
        },
        { code: 'S2-X2', kind: 'set-control', prompt: 'Open the interval until the average rate reaches 5.', above: 3.5, from: 0 }
      ]
    },
    {
      code: 'S3',
      name: 'Why it drifts by exactly that much',
      sources: ['T4'],
      readings: [
        { code: 'S3-A', text: 'Square x + Δx and you get x² + 2x·Δx + (Δx)². Take away the original x², then divide by Δx. What is left is 2x + Δx. At x = 2 that is 4 plus the interval, so the drift is not roughly the interval. It is exactly the interval.' },
        { code: 'S3-B', text: 'The average rate here is 2x + dx. The first part depends only on where you are. The second part is the gap itself, which is why every widening pushes the rate up by the same amount you widened it.' }
      ],
      interactions: [
        { code: 'S3-I1', kind: 'rate-formula', note: '4 + Δx shown next to the measured rate, so the prediction and the measurement move together and agree.' },
        { code: 'S3-I2', kind: 'growth-decomposition', note: 'Back to Thompson Fig. 1: the two strips give 2x·dx and the corner gives (dx)². Dividing by dx leaves 2x + dx on the picture itself.' }
      ],
      exercises: [
        {
          code: 'S3-X1', kind: 'choice',
          prompt: 'The average rate is 2x + Δx. At x = 2 with an interval of 0.1, what is it?',
          options: [
            { label: '4.1', correct: true },
            { label: '4.0', feedback: 'That drops the interval term. It is only correct when the interval is nothing.' },
            { label: '2.1', feedback: '2x is 4 at x = 2, not 2.' }
          ]
        },
        {
          code: 'S3-X2', kind: 'choice',
          prompt: 'Which part of 2x + Δx disappears as the points come together?',
          options: [
            { label: 'Δx, the interval', correct: true },
            { label: '2x, because x shrinks too', feedback: 'x stays at 2. Only the gap between the two points is shrinking.' },
            { label: 'Neither; both shrink', feedback: '2x does not depend on the interval at all.' }
          ]
        }
      ]
    },
    {
      code: 'S4',
      name: 'The rate right at a point',
      sources: ['T4'],
      readings: [
        { code: 'S4-A', text: 'Take the interval to nothing and only 2x survives. At x = 2 that is 4. This is the rate right at that point rather than across a stretch, and calculus calls it the derivative.' },
        { code: 'S4-B', text: 'What is left when the interval goes is 2x. It depends on where you stand and on nothing else. That number is the derivative, and the next board gives it its usual notation.' }
      ],
      interactions: [
        { code: 'S4-I1', kind: 'curve-secant', note: 'Back at the smallest interval, with the line lying along the curve. The picture the section is about.' },
        { code: 'S4-I2', kind: 'rate-formula', note: 'The formula with the interval term struck out, leaving 2x = 4.' }
      ],
      exercises: [
        {
          code: 'S4-X1', kind: 'choice',
          prompt: 'At x = 3, what would the rate right at that point be?',
          options: [
            { label: '6', correct: true },
            { label: '9', feedback: 'That is the area, x². The rate is 2x.' },
            { label: '4', feedback: '4 is the rate at x = 2. The rate depends on where you stand.' }
          ]
        },
        {
          code: 'S4-X2', kind: 'choice',
          prompt: 'Why is the derivative a better description of the rate at x = 2 than 4.5 is?',
          options: [
            { label: '4.5 describes a stretch; the derivative describes the point', correct: true },
            { label: '4.5 was calculated wrongly', feedback: '4.5 is correct for the interval from 2 to 2.5. It just is not about the point.' },
            { label: 'Because 4 is a rounder number', feedback: 'Roundness has nothing to do with it. 4 is what survives when the interval goes.' }
          ]
        }
      ]
    }
  ]
};
