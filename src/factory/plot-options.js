// Factory options for the bridge from a function table to its graph.
// Drafted on founder instruction, 2026-08-10. Nothing is selected or approved.
//
// SOURCE REMIX, NOT A SINGLE-TEXT ADAPTATION
// - Wentworth supplies substitution as the act that produces a numerical value.
// - Thompson supplies the relation between coordinates, curve and change.
// - Loney supplies the coordinate-geometry structure of loci and equations.
// - OpenStax is a modern terminology and sequence cross-check only; its wording,
//   examples and diagrams are not adapted here.
// The table, reveal order, examples, diagrams and controls are Qubix-original.

export const selections = {};
export const finalised = {};
export const rejected = {};
export const gated = 'New bridge board drafted for founder selection. It has no selected variants and must not enter the learner build until a complete kept sheet is recorded.';

export const plot = {
  id: 'FCG-GRAPH-001',
  title: 'Plotting a Rule as a Curve',
  fork: 'A table is made one ordered pair at a time; the curve is withheld until the plotted points have earned it.',
  structure: 'Three sections. Two readings, four interactions and four exercises per section.',
  sourceMatrix: [
    {
      work: 'Wentworth, The First Steps in Algebra, ch. I art. 40, printed folio 12',
      role: 'Substitution produces the numerical output for each chosen input.',
      treatment: 'Concept retained; wording and examples rewritten.'
    },
    {
      work: 'Thompson, Calculus Made Easy, ch. X, printed pp. 76–77',
      role: 'Coordinates describe a curve and changes in y accompany changes in x.',
      treatment: 'Historical bridge retained; Thompson’s assumed graphing knowledge is taught explicitly.'
    },
    {
      work: 'S. L. Loney, The Elements of Coordinate Geometry, 1895, chs. I–II',
      role: 'Coordinates, equations and loci provide the geometric structure.',
      treatment: 'Reference only; no prose, exercise or diagram copied.'
    },
    {
      work: 'OpenStax, Algebra and Trigonometry 2e, §2.1',
      role: 'Modern cross-check for ordered pairs, tables and graphing equations by points.',
      treatment: 'Reference only under CC BY-NC-SA; no material enters the learner text.'
    }
  ],
  sections: [
    {
      code: 'S1',
      name: 'A rule makes a table',
      sources: [],
      readings: [
        {
          code: 'S1-A',
          text: 'Choose an input x and apply the rule to find y. Record both numbers in the same row. Repeating this with new inputs builds a table of values made by one rule.'
        },
        {
          code: 'S1-B',
          text: 'A function table is a record of trials. Each row says which number went in and which single number the rule returned. The rows differ, but the rule does not.'
        }
      ],
      interactions: [
        {
          code: 'S1-I1', kind: 'table-plot-step',
          note: 'Run x through y = x² one row at a time. The ordered pair appears only after its output has been produced.'
        },
        {
          code: 'S1-I2', kind: 'table-plot-predict',
          note: 'The next x is shown but y stays hidden until the learner predicts it. Stronger retrieval, but slower when first meeting the table.'
        },
        {
          code: 'S1-I3', kind: 'table-plot-sprint',
          note: 'Add three rows at a time and read each ordered pair aloud. This quicker rhythm is intended for a second or third pass.'
        },
        {
          code: 'S1-I4', kind: 'table-rule-switch',
          note: 'Keep the same inputs but switch among square, double and add-three rules. The table must be rebuilt from the selected rule.'
        }
      ],
      exercises: [
        {
          code: 'S1-X1', kind: 'choice',
          prompt: 'Under the rule y = x², which row belongs with x = 3?',
          options: [
            { label: 'x = 3, y = 9', correct: true },
            { label: 'x = 3, y = 6', feedback: 'That doubles 3. The stated rule squares it.' },
            { label: 'x = 9, y = 3', feedback: 'The input and output have been reversed.' }
          ],
          successNote: 'Substitute 3 for x: y = 3² = 9.'
        },
        {
          code: 'S1-X2', kind: 'match',
          prompt: 'Match each input to its output under y = x².',
          bins: ['y = 0', 'y = 1', 'y = 4'],
          items: [
            { label: 'x = 0', bin: 'y = 0' },
            { label: 'x = 1', bin: 'y = 1' },
            { label: 'x = 2', bin: 'y = 4' }
          ],
          successNote: 'Every row is one substitution into the same rule.'
        },
        {
          code: 'S1-X3', kind: 'choice',
          prompt: 'Under y = 2x, which ordered pair belongs in the table when x = −3?',
          options: [
            { label: '(−3, −6)', correct: true },
            { label: '(−3, 6)', feedback: 'Doubling a negative input keeps the output negative.' },
            { label: '(−6, −3)', feedback: 'The output has been placed before the input.' }
          ],
          successNote: 'Substitute first, then write x before y: (−3, −6).'
        },
        {
          code: 'S1-X4', kind: 'order',
          prompt: 'Put one table row in the order in which it is made.',
          items: ['Choose an x-value', 'Apply the rule', 'Record y', 'Write the ordered pair'],
          startOrder: [2, 0, 3, 1],
          successNote: 'Reliable plotting begins with a reliable table row.'
        }
      ]
    },
    {
      code: 'S2',
      name: 'Each row has a place',
      sources: [],
      readings: [
        {
          code: 'S2-A',
          text: 'Read a table row as an address: x first and y second. The row x = 2, y = 4 becomes the point (2, 4) on the coordinate plane.'
        },
        {
          code: 'S2-B',
          text: 'The two columns of the table are the two coordinates of a point. Plotting a row does not add new information; it gives the same pair a position.'
        }
      ],
      interactions: [
        {
          code: 'S2-I1', kind: 'table-points',
          note: 'Tap a row to move its ordered pair from the table onto the plane. Rows already plotted remain visible.'
        },
        {
          code: 'S2-I2', kind: 'table-points-order',
          note: 'Rows arrive out of numerical order, so the learner must read coordinates rather than follow a prepared path.'
        },
        {
          code: 'S2-I3', kind: 'point-target-drill',
          note: 'Rebuilt 2026-08-17 on founder instruction. Was a 7x9 grid of buttons, so the learner clicked a cell rather than a point, and y ran 0 to 8 with no negative half: a quadrant with the axes drawn on its edge, not a plane. Now a real plane with both axes running through zero, and four candidate points offered on it. Each decoy is a specific error rather than a random wrong answer, and says which mistake it is when tapped, so a learner who swaps x and y is told that rather than merely marked wrong.'
        },
        {
          code: 'S2-I4', kind: 'point-target-shuffle',
          note: 'The same rebuilt plane, with pairs arriving in an irregular order so x-first, y-second becomes a habit rather than a pattern the learner rides. Its decoys lean on the swap error, which is the one this drill exists to catch.'
        }
      ],
      exercises: [
        {
          code: 'S2-X1', kind: 'choice',
          prompt: 'Which point represents the row x = −2, y = 4?',
          options: [
            { label: '(−2, 4)', correct: true },
            { label: '(4, −2)', feedback: 'The table columns keep their order: x first, y second.' },
            { label: '(2, 4)', feedback: 'The sign of the input has been lost.' }
          ],
          successNote: 'A row and an ordered pair carry the same two values in the same order.'
        },
        {
          code: 'S2-X2', kind: 'choice',
          prompt: 'What changes when a table row is plotted?',
          options: [
            { label: 'Its presentation, not its values', correct: true },
            { label: 'The rule that produced it', feedback: 'The point still comes from the same rule.' },
            { label: 'The order of x and y', feedback: 'Their fixed order is what makes the point land correctly.' }
          ],
          successNote: 'The table and graph are two views of the same pairs.'
        },
        {
          code: 'S2-X3', kind: 'choice',
          prompt: 'To plot (−3, 4) from the origin, which movement is correct?',
          options: [
            { label: '3 left, then 4 up', correct: true },
            { label: '3 right, then 4 up', feedback: 'A negative x-coordinate lies left of the vertical axis.' },
            { label: '4 left, then 3 up', feedback: 'Move by x first and y second.' }
          ],
          successNote: 'The signs determine direction; the coordinate order determines which move comes first.'
        },
        {
          code: 'S2-X4', kind: 'order',
          prompt: 'Put the actions for plotting a supplied pair in order.',
          items: ['Read the x-coordinate', 'Move horizontally from the origin', 'Read the y-coordinate', 'Move vertically and mark the point'],
          startOrder: [2, 0, 3, 1],
          successNote: 'Across for x, then up or down for y.'
        }
      ]
    },
    {
      code: 'S3',
      name: 'The points reveal the curve',
      sources: [],
      readings: [
        {
          code: 'S3-A',
          text: 'One point shows one input and output. Several points begin to show the shape made by the rule. For y = x² they bend into a curve rather than lying on one straight line.'
        },
        {
          code: 'S3-B',
          text: 'A graph is not a decoration added to a rule. It is the collection of positions whose coordinates satisfy that rule. More plotted values make its shape easier to see.'
        }
      ],
      interactions: [
        {
          code: 'S3-I1', kind: 'curve-from-points',
          note: 'Points appear one by one from left to right. The curve is offered only after five have been plotted.'
        },
        {
          code: 'S3-I2', kind: 'curve-rule-compare',
          note: 'Swap between square, double and add-three rules. The same x-values stay fixed while the table and graph change together.'
        },
        {
          code: 'S3-I3', kind: 'curve-plot-drill',
          note: 'Four points of y = x² selected from candidates on the rebuilt plane. The curve is drawn only once every point is placed, so it confirms the work rather than giving it away. Decoys here include points that are on the plane but not on the rule, which is a different error from misreading a coordinate and is worth separating.'
        },
        {
          code: 'S3-I4', kind: 'curve-point-check',
          note: 'Four points of y = x + 3 in mixed x-order on the rebuilt plane. Reaches below the axis at x = −3, so a learner has to place a point at y = 0 and cross into the negative half rather than working only in the top right.'
        }
      ],
      exercises: [
        {
          code: 'S3-X1', kind: 'choice',
          prompt: 'Which point is not on the graph of y = x²?',
          options: [
            { label: '(2, 3)', correct: true },
            { label: '(2, 4)', feedback: '2² is 4, so this point satisfies the rule.' },
            { label: '(−2, 4)', feedback: '(−2)² is also 4.' }
          ],
          successNote: 'A point belongs only when its coordinates make the rule true.'
        },
        {
          code: 'S3-X2', kind: 'order',
          prompt: 'Put the graphing process in order.',
          items: ['Choose x', 'Use the rule to find y', 'Write the ordered pair', 'Plot the point'],
          startOrder: [2, 0, 3, 1],
          successNote: 'The graph is built from calculations, one point at a time.'
        },
        {
          code: 'S3-X3', kind: 'choice',
          prompt: 'The points (−2, 4), (−1, 1), (0, 0) and (1, 1) lie on y = x². Which point should be plotted next for x = 2?',
          options: [
            { label: '(2, 4)', correct: true },
            { label: '(2, 2)', feedback: 'The rule squares the input.' },
            { label: '(4, 2)', feedback: 'Keep x first in the ordered pair.' }
          ],
          successNote: 'The matching points on either side of x = 0 help reveal the curve.'
        },
        {
          code: 'S3-X4', kind: 'match',
          prompt: 'Match each rule to a point that must lie on its graph.',
          bins: ['y = x²', 'y = 2x', 'y = x + 3'],
          items: [
            { label: '(−2, 4)', bin: 'y = x²' },
            { label: '(3, 6)', bin: 'y = 2x' },
            { label: '(−1, 2)', bin: 'y = x + 3' }
          ],
          successNote: 'Substitute the x-coordinate and check whether the rule produces the y-coordinate.'
        }
      ]
    }
  ]
};
