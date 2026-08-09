// BB8 drafts. GATED behind BB1–BB7.
//
// Thompson's ch. VIII is unusually generous here: he supplies the motivating
// question, the definition of rate, and a worked comparison, all in his own
// words. Section 4's exercise is his sentence with nothing added.

export const selections = {};
export const finalised = {};
export const gated = 'Locked by 02-MAIN-CURRICULUM-MAP until BB1–BB7 are approved.';

export const bb8 = {
  id: 'CME-CHANGE-008',
  title: 'When Time Varies',
  fork: 'Time as the independent variable. The derivative becomes a speed.',
  structure: 'Four sections.',
  sections: [
    {
      code: 'S1',
      name: 'Time as the letter you assign',
      sources: ['T10'],
      readings: [
        {
          code: 'S1-A',
          text: 'Many of the most useful problems in calculus are ones where time is the independent variable, and some other quantity changes as the time runs on.'
        },
        { code: 'S1-B', text: 'Until now x has been a side length. It can equally be a time. Call it t, let the distance a train has travelled be s, and s depends on t exactly as area depended on side.' }
      ],
      interactions: [
        { code: 'S1-I1', kind: 'locked-pair', note: 't with a control and s following, identical in structure to x and y so the transfer is visible.' },
        { code: 'S1-I2', kind: 'speed-track', note: 'A train on a track, its position set by elapsed time. The dependence is a thing that moves rather than a pair of cards.' }
      ],
      exercises: [
        {
          code: 'S1-X1', kind: 'choice',
          prompt: 'If distance depends on time, which is the independent variable?',
          options: [
            { label: 'Time', correct: true },
            { label: 'Distance', feedback: 'Distance is what follows. Time is what runs on regardless.' },
            { label: 'Neither; they vary together', feedback: 'They do vary together, but only one of them is free.' }
          ]
        },
        { code: 'S1-X2', kind: 'set-control', prompt: 'Let time run on and watch the distance follow.', above: 2.5, from: 1.5 }
      ]
    },
    {
      code: 'S2',
      name: 'What a rate is',
      sources: ['T12'],
      readings: [
        {
          code: 'S2-A',
          text: 'What is a rate? It is a comparison between something that happens and the length of time it takes to happen.'
        },
        { code: 'S2-B', text: 'A rate compares something that happens with the time it takes to happen. Distance compared with time is a speed. Nothing new is being introduced: this is Δy/Δx with time underneath.' }
      ],
      interactions: [
        { code: 'S2-I1', kind: 'ratio-plain', note: 'Distance over time, with the units shown, in the same layout BB4 used for area over side.' },
        { code: 'S2-I2', kind: 'speed-track', note: 'The train, with distance covered and time elapsed both reading out as it moves.' }
      ],
      exercises: [
        {
          code: 'S2-X1', kind: 'choice',
          prompt: 'A car covers 10 yards in 1 second. What is its rate?',
          options: [
            { label: '10 yards per second', correct: true },
            { label: '10 yards', feedback: 'That is the distance alone. A rate compares it with the time taken.' },
            { label: '1 second', feedback: 'That is the time alone.' }
          ]
        },
        {
          code: 'S2-X2', kind: 'choice',
          prompt: 'Which of these is a rate rather than a quantity?',
          options: [
            { label: 'cm² per cm', correct: true },
            { label: 'cm²', feedback: 'An area. A rate always carries "per something".' },
            { label: 'seconds', feedback: 'A duration.' }
          ]
        }
      ]
    },
    {
      code: 'S3',
      name: 'The same rate, different numbers',
      sources: ['T12'],
      readings: [
        { code: 'S3-A', text: '10 yards per second is the same rate as 600 yards per minute, or a little over 20 miles an hour. Ten yards is not 600 yards and a second is not a minute, yet the rate is unchanged, because the proportion between distance and time is unchanged.' },
        { code: 'S3-B', text: '10 yards per second and 600 yards per minute are the same speed written differently. The pair of numbers changes; the proportion between them does not.' }
      ],
      interactions: [
        { code: 'S3-I1', kind: 'ratio-plain', note: 'The same speed shown in three unit pairs at once, all reducing to one proportion.' },
        { code: 'S3-I2', kind: 'two-bars', note: 'Distance and time as bars in two different unit scales, with the ratio between them holding steady.' }
      ],
      exercises: [
        {
          code: 'S3-X1', kind: 'choice',
          prompt: 'Why is 10 yards per second the same rate as 600 yards per minute?',
          options: [
            { label: 'The proportion of distance to time is the same', correct: true },
            { label: 'Because 600 is a round number', feedback: 'Roundness is irrelevant. What matters is the proportion.' },
            { label: 'They are not the same; the second is faster', feedback: 'A minute is 60 seconds, and 60 × 10 is 600. Same speed.' }
          ]
        },
        {
          code: 'S3-X2', kind: 'choice',
          prompt: 'A rate of 3 metres per second is also…',
          options: [
            { label: '180 metres per minute', correct: true },
            { label: '3 metres per minute', feedback: 'Changing the time unit must change the distance number to keep the proportion.' },
            { label: '60 metres per minute', feedback: 'That is the seconds in a minute, not the distance covered in one.' }
          ]
        }
      ]
    },
    {
      code: 'S4',
      name: 'Speed is a derivative',
      sources: ['T11', 'T12'],
      readings: [
        { code: 'S4-A', text: 'A rate measured over a stretch of time is an average speed, exactly as Δy/Δx was an average. Shrink the stretch and what survives is ds/dt, the speed at one instant. It is the same move made in BB5, with time underneath instead of a side length.' },
        { code: 'S4-B', text: 'Average speed compares a distance with a time. The speed right now is ds/dt: what the comparison settles on as the stretch of time goes to nothing.' }
      ],
      interactions: [
        { code: 'S4-I1', kind: 'speed-track', note: 'The train with an adjustable stretch of time, average speed over the stretch shrinking towards the instantaneous value.' },
        { code: 'S4-I2', kind: 'curve-secant', note: 'Distance against time as a curve, with the line through two instants flattening onto it. The BB5 picture with new axis labels.' }
      ],
      exercises: [
        {
          code: 'S4-X1', kind: 'choice',
          prompt: 'Thompson asks: which is growing at the greater rate, a plant 12 inches high that becomes 14 inches in one month, or a tree 12 feet high that becomes 14 feet in a year?',
          options: [
            { label: 'The plant, because its gain took one month rather than a year', correct: true },
            { label: 'The tree, because feet are larger than inches', feedback: 'Both grew by the same proportion. The difference is the time each took.' },
            { label: 'Neither; both grew from 12 to 14', feedback: 'The same growth over a shorter time is a greater rate. Time is half the comparison.' }
          ]
        },
        {
          code: 'S4-X2', kind: 'choice',
          prompt: 'What does ds/dt mean?',
          options: [
            { label: 'The speed at one instant', correct: true },
            { label: 'The total distance travelled', feedback: 'That is s. ds/dt is the proportion between a bit of s and a bit of t.' },
            { label: 'The time taken', feedback: 'That is t.' }
          ]
        }
      ]
    }
  ]
};
