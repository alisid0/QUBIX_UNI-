// BB11 and BB12 drafts. GATED, and beyond the curriculum map like BB9–BB10.
//
// These two are the payoff. BB11 gives dy/dx a picture: it is the slope of the
// curve. BB12 uses that picture to do something worth doing, which is to find
// the top or bottom of a curve by asking where the slope is nothing at all.

export const selections = {};
export const finalised = {};
export const gated = 'Beyond the end of the curriculum map, which stops at unit 8. Adding units is a founder decision, not yet taken.';

export const bb11 = {
  id: 'CME-CHANGE-011',
  title: 'The Slope of a Curve',
  fork: 'Give the derivative a picture. It has been a number since BB5; here it becomes steepness.',
  structure: 'Three sections.',
  sections: [
    {
      code: 'S1',
      name: 'Steepness between two points',
      sources: ['T15'],
      readings: [
        {
          code: 'S1-A',
          verbatim: 'T15',
          text: 'Now observe how y changes when x is varied. If x is made to increase by a small increment dx, to the right, it will be observed that y also increases by a small increment dy. Then the ratio of dy to dx is a measure of the degree to which the curve is sloping up between the two points Q and T.'
        },
        { code: 'S1-B', text: 'Move right along a curve by dx and you also move up by dy. How steep the climb feels is the comparison between the two: a large dy for a small dx is steep, and the reverse is gentle.' }
      ],
      interactions: [
        { code: 'S1-I1', kind: 'curve-secant', note: 'Two points on the curve with dx and dy marked as the horizontal and vertical legs between them.' },
        { code: 'S1-I2', kind: 'two-bars', note: 'dy and dx as bars, with steepness read as the ratio. The same comparison BB4 made, now meaning a slope.' }
      ],
      exercises: [
        {
          code: 'S1-X1', kind: 'choice',
          prompt: 'Which describes the steeper climb?',
          options: [
            { label: 'A large dy for a small dx', correct: true },
            { label: 'A large dx for a small dy', feedback: 'That is going a long way sideways for little height, which is gentle.' },
            { label: 'A large dy and a large dx', feedback: 'That depends on the proportion between them, which is exactly the point.' }
          ]
        },
        { code: 'S1-X2', kind: 'set-control', prompt: 'Move to a part of the curve where the climb is steeper.', above: 2.8, from: 1.8 }
      ]
    },
    {
      code: 'S2',
      name: 'Steepness at one point',
      sources: ['T16'],
      readings: [
        {
          code: 'S2-A',
          verbatim: 'T16',
          text: 'If, however, Q and T are so near each other that the small portion QT of the curve is practically straight, then it is true to say that the ratio dy/dx is the slope of the curve.'
        },
        { code: 'S2-B', text: 'A curve has no single steepness across a stretch, because it bends. Bring the two points together until the piece between them is as good as straight, and dy/dx is the slope right there.' }
      ],
      interactions: [
        { code: 'S2-I1', kind: 'curve-secant', note: 'The BB5 mechanic with its geometric meaning stated: as the points close, the line settles onto the curve and its tilt is the slope.' },
        { code: 'S2-I2', kind: 'rate-formula', note: 'dy/dx = 2x evaluated at the current x, read as a steepness rather than as a rate.' }
      ],
      exercises: [
        {
          code: 'S2-X1', kind: 'choice',
          prompt: 'Why can a curve not have one slope across a whole stretch?',
          options: [
            { label: 'It bends, so its steepness differs from point to point', correct: true },
            { label: 'Because dy and dx are too large to measure', feedback: 'Size is not the obstacle. Bending is.' },
            { label: 'It can, if the stretch is short enough', feedback: 'Shortening helps because the bend matters less, but only in the limit is it exact.' }
          ]
        },
        {
          code: 'S2-X2', kind: 'choice',
          prompt: 'For y = x², how steep is the curve at x = 3?',
          options: [
            { label: '6', correct: true },
            { label: '9', feedback: 'That is the height, x². The slope is 2x.' },
            { label: '3', feedback: 'That is x itself.' }
          ]
        }
      ]
    },
    {
      code: 'S3',
      name: 'Slope has a sign',
      sources: ['T3', 'T15'],
      readings: [
        { code: 'S3-A', text: 'On a falling stretch, moving right makes y decrease, so dy is negative while dx is positive and the slope comes out negative. The sign says which way the curve is going, exactly as it did for Δx in BB2.' },
        { code: 'S3-B', text: 'A positive dy/dx means the curve climbs as you move right. A negative one means it falls. Zero means it does neither, which is the whole subject of the next board.' }
      ],
      interactions: [
        { code: 'S3-I1', kind: 'curve-secant', note: 'A curve with a falling stretch and a rising one, the slope line changing sign as it crosses between them.' },
        { code: 'S3-I2', kind: 'rate-formula', note: 'The slope value with its sign, alongside a plain reading of what the sign means.' }
      ],
      exercises: [
        {
          code: 'S3-X1', kind: 'choice',
          prompt: 'A curve is falling as x increases. What is the sign of dy/dx?',
          options: [
            { label: 'Negative', correct: true },
            { label: 'Positive', feedback: 'Moving right increases x but decreases y, so dy is negative.' },
            { label: 'It has no sign', feedback: 'It is a ratio of two signed quantities, so it carries a sign.' }
          ]
        },
        {
          code: 'S3-X2', kind: 'choice',
          prompt: 'What would dy/dx = 0 mean about the curve at that point?',
          options: [
            { label: 'It is momentarily level, neither climbing nor falling', correct: true },
            { label: 'The curve has stopped', feedback: 'Nothing is moving. It is the steepness that is zero, not the position.' },
            { label: 'y is zero there', feedback: 'The height and the slope are different quantities.' }
          ]
        }
      ]
    }
  ]
};

export const bb12 = {
  id: 'CME-CHANGE-012',
  title: 'Highest and Lowest Points',
  fork: 'The first thing the derivative is used for rather than explained by.',
  structure: 'Three sections.',
  sections: [
    {
      code: 'S1',
      name: 'Why anyone wants this',
      sources: ['T17'],
      readings: [
        {
          code: 'S1-A',
          verbatim: 'T17',
          text: 'One of the principal uses of the process of differentiating is to find out under what conditions the value of the thing differentiated becomes a maximum, or a minimum. This is often exceedingly important in engineering questions, where it is most desirable to know what conditions will make the cost of working a minimum, or will make the efficiency a maximum.'
        },
        { code: 'S1-B', text: 'Most practical questions are not "what is the value" but "what setting makes it best": cheapest to run, strongest for its weight, furthest for the fuel. Those ask for the highest or lowest point of a curve.' }
      ],
      interactions: [
        { code: 'S1-I1', kind: 'curve-secant', note: 'A curve with a clear low point, the question posed before any method is offered.' },
        { code: 'S1-I2', kind: 'two-cards', note: 'A setting and its cost, the cost falling then rising as the setting changes, with no formula in sight yet.' }
      ],
      exercises: [
        {
          code: 'S1-X1', kind: 'choice',
          prompt: 'Which of these is a maximum-or-minimum question?',
          options: [
            { label: 'What tin shape uses the least metal for a given volume?', correct: true },
            { label: 'How much metal does this tin use?', feedback: 'That asks for a value, not for the best setting.' },
            { label: 'What is the volume of this tin?', feedback: 'Also a single value. Nothing is being chosen.' }
          ]
        },
        {
          code: 'S1-X2', kind: 'set-control',
          prompt: 'Find roughly where the curve is at its lowest.',
          target: 2, tolerance: 0.25, from: 3.4
        }
      ]
    },
    {
      code: 'S2',
      name: 'Level at the turn',
      sources: ['T17', 'T16'],
      readings: [
        { code: 'S2-A', text: 'Approach a low point from the left and the curve is falling, so dy/dx is negative. Leave it to the right and the curve is climbing, so dy/dx is positive. In between it passes through zero, and that is what marks the turn.' },
        { code: 'S2-B', text: 'At the very bottom the curve is momentarily level. Its slope is neither negative nor positive but nothing at all, so the condition to look for is dy/dx = 0.' }
      ],
      interactions: [
        { code: 'S2-I1', kind: 'curve-secant', note: 'The slope line dragged through the turning point, flattening to horizontal exactly at the bottom and tilting the other way past it.' },
        { code: 'S2-I2', kind: 'rate-formula', note: 'The value of dy/dx tracked as x passes through the turn, changing sign through zero.' }
      ],
      exercises: [
        {
          code: 'S2-X1', kind: 'choice',
          prompt: 'What is true of dy/dx at a lowest point?',
          options: [
            { label: 'It is zero', correct: true },
            { label: 'It is at its smallest', feedback: 'The slope is zero there, but a slope can be more negative elsewhere.' },
            { label: 'It is undefined', feedback: 'It is perfectly well defined. It is zero.' }
          ]
        },
        {
          code: 'S2-X2', kind: 'choice',
          prompt: 'Just to the left of a lowest point, the slope is…',
          options: [
            { label: 'Negative, because the curve is still falling', correct: true },
            { label: 'Positive, because the low point is ahead', feedback: 'What is ahead does not set the slope. The curve is still coming down.' },
            { label: 'Zero, because it is close to the turn', feedback: 'Only at the turn itself is it zero.' }
          ]
        }
      ]
    },
    {
      code: 'S3',
      name: 'Solving for the turn',
      sources: ['T17'],
      readings: [
        { code: 'S3-A', text: 'Thompson works y = x² − 4x + 7. Differentiating gives dy/dx = 2x − 4. Setting that to zero gives x = 2, and putting x = 2 back into the original gives y = 3. So the lowest point sits at (2, 3), found by algebra rather than by hunting along the curve.' },
        { code: 'S3-B', text: 'Differentiate, set the result to zero, solve for x. For y = x² − 4x + 7 that is 2x − 4 = 0, so x = 2. The method replaces guessing with a single equation.' }
      ],
      interactions: [
        { code: 'S3-I1', kind: 'curve-secant', note: 'The worked curve with the solved point marked, and the slope line horizontal there.' },
        { code: 'S3-I2', kind: 'machine', note: 'Expression in, derivative out, set to zero, x out. The three steps as one pipeline.' }
      ],
      exercises: [
        {
          code: 'S3-X1', kind: 'choice',
          prompt: 'For y = x² − 6x + 1, where is the turning point?',
          options: [
            { label: 'x = 3', correct: true },
            { label: 'x = 6', feedback: 'dy/dx = 2x − 6, and that is zero when x is 3, not 6.' },
            { label: 'x = 1', feedback: '1 is the constant term, which contributes nothing to the slope.' }
          ]
        },
        {
          code: 'S3-X2', kind: 'choice',
          prompt: 'Why does the constant term never affect where the turn is?',
          options: [
            { label: 'It lifts the curve without tilting it, so it contributes nothing to the slope', correct: true },
            { label: 'Because it is usually small', feedback: 'Its size is irrelevant; it could be 1000.' },
            { label: 'It does affect it, when it is negative', feedback: 'Sign makes no difference. An added constant contributes nothing to dy/dx either way.' }
          ]
        }
      ]
    }
  ]
};
