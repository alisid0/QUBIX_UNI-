// Factory options for the slope of a straight line.
// Drafted on founder instruction, 2026-08-10. Nothing is selected or approved.
//
// SOURCE REMIX
// - Thompson supplies dy/dx as a measure of sloping between two points.
// - Loney supplies the straight-line coordinate structure.
// - OpenStax supplies a modern terminology and misconception cross-check.
// - The Gap Between Two Values supplies Qubix's already-established delta move.
// All learner language, examples, diagrams and controls below are new.

export const selections = {};
export const finalised = {};
export const rejected = {};
export const gated = 'New bridge board drafted for founder selection. It must remain outside the learner build until Plotting a Rule as a Curve is selected and this board has a complete kept sheet.';

export const lineSlope = {
  id: 'FCG-SLOPE-001',
  title: 'The Slope of a Line',
  fork: 'Slope is built as vertical change against horizontal change before the quotient is named.',
  structure: 'Three sections. Positive, zero and negative slopes are all encountered by moving one endpoint.',
  sourceMatrix: [
    {
      work: 'Thompson, Calculus Made Easy, ch. X, printed page 77',
      role: 'The ratio dy/dx measures how a curve slopes between two nearby points.',
      treatment: 'The ratio is first established on a straight line, with new wording and examples.'
    },
    {
      work: 'S. L. Loney, The Elements of Coordinate Geometry, 1895, ch. III',
      role: 'Straight lines, coordinates and their equations provide the geometric structure.',
      treatment: 'Reference only; no exercise, diagram or prose copied.'
    },
    {
      work: 'OpenStax, Algebra and Trigonometry 2e, §§2.1 and 4.1',
      role: 'Modern cross-check for slope language, signs and vertical-line exceptions.',
      treatment: 'Reference only under CC BY-NC-SA; no material enters the learner text.'
    },
    {
      work: 'Qubix, The Gap Between Two Values, AI_DRAFT',
      role: 'Reuses the learner’s existing understanding of Δ as new minus old.',
      treatment: 'Internal dependency, not an external source.'
    }
  ],
  sections: [
    {
      code: 'S1',
      name: 'Rise and run',
      sources: [],
      readings: [
        {
          code: 'S1-A',
          text: 'Choose two points on a line. The horizontal change from the first point to the second is the run, Δx. The vertical change is the rise, Δy.'
        },
        {
          code: 'S1-B',
          text: 'Moving from one point to another makes two changes at once: across and up or down. Record them separately before comparing them.'
        }
      ],
      interactions: [
        {
          code: 'S1-I1', kind: 'rise-run-line',
          note: 'Move the second endpoint with arrow controls. A right-angled change path labels Δx and Δy directly on the grid.'
        },
        {
          code: 'S1-I2', kind: 'rise-run-ghost',
          note: 'The previous endpoint remains as a ghost after each move, making both coordinate changes visible but adding more visual load.'
        }
      ],
      exercises: [
        {
          code: 'S1-X1', kind: 'choice',
          prompt: 'From (1, 1) to (4, 3), what are the run and rise?',
          options: [
            { label: 'run 3, rise 2', correct: true },
            { label: 'run 4, rise 3', feedback: 'Those are the final coordinates, not the changes.' },
            { label: 'run 2, rise 3', feedback: 'Horizontal change is read first: 4 − 1 = 3.' }
          ],
          successNote: 'Δx = 4 − 1 = 3 and Δy = 3 − 1 = 2.'
        },
        {
          code: 'S1-X2', kind: 'match',
          prompt: 'Sort each change by its direction.',
          bins: ['Horizontal', 'Vertical'],
          items: [
            { label: 'Δx', bin: 'Horizontal' },
            { label: 'run', bin: 'Horizontal' },
            { label: 'Δy', bin: 'Vertical' },
            { label: 'rise', bin: 'Vertical' }
          ],
          successNote: 'Two names for each of the two changes.'
        }
      ]
    },
    {
      code: 'S2',
      name: 'One vertical change for each horizontal unit',
      sources: [],
      readings: [
        {
          code: 'S2-A',
          text: 'Slope compares the two changes by division: slope = Δy ÷ Δx. It tells how much vertical change belongs to one unit of horizontal change.'
        },
        {
          code: 'S2-B',
          text: 'The same line may be measured with a large triangle or a small one. The rise and run both change size, but their ratio stays the same.'
        }
      ],
      interactions: [
        {
          code: 'S2-I1', kind: 'slope-ratio',
          note: 'The endpoint moves while rise, run and their quotient update together. Equivalent triangles are shown on demand.'
        },
        {
          code: 'S2-I2', kind: 'slope-triangles',
          note: 'Two differently sized right triangles sit on the same line and reduce to the same ratio. Clearer invariance, less direct control.'
        }
      ],
      exercises: [
        {
          code: 'S2-X1', kind: 'choice',
          prompt: 'A line rises 6 units while running 3. What is its slope?',
          options: [
            { label: '2', correct: true },
            { label: '3', feedback: 'That is the run. Divide the rise by it.' },
            { label: '9', feedback: 'Slope compares by division, not addition.' }
          ],
          successNote: '6 ÷ 3 = 2 vertical units for each horizontal unit.'
        },
        {
          code: 'S2-X2', kind: 'choice',
          prompt: 'A smaller triangle on the same straight line has half the rise and half the run. What happens to the slope?',
          options: [
            { label: 'It stays the same', correct: true },
            { label: 'It is halved', feedback: 'Both parts of the ratio were halved, so the quotient is unchanged.' },
            { label: 'It doubles', feedback: 'The line has not changed direction or steepness.' }
          ],
          successNote: 'Different triangles can measure the same line.'
        }
      ]
    },
    {
      code: 'S3',
      name: 'Positive, zero and negative slope',
      sources: [],
      readings: [
        {
          code: 'S3-A',
          text: 'Read the line from left to right. If it rises, its slope is positive. If it stays level, the slope is zero. If it falls, the slope is negative.'
        },
        {
          code: 'S3-B',
          text: 'The sign of the slope records direction. A negative slope does not mean a line is less steep; it means y falls as x increases.'
        }
      ],
      interactions: [
        {
          code: 'S3-I1', kind: 'slope-sign',
          note: 'Move one endpoint through rising, level and falling positions. The sign changes exactly as the endpoint crosses the horizontal.'
        },
        {
          code: 'S3-I2', kind: 'slope-target',
          note: 'A target slope is given and the learner adjusts rise and run to make it. More game-like and suitable for the final workshop.'
        }
      ],
      exercises: [
        {
          code: 'S3-X1', kind: 'choice',
          prompt: 'A line falls 4 units while running 2 units to the right. What is its slope?',
          options: [
            { label: '−2', correct: true },
            { label: '2', feedback: 'The size is right, but falling makes the rise negative.' },
            { label: '−4', feedback: 'That is the vertical change before dividing by the run.' }
          ],
          successNote: '−4 ÷ 2 = −2.'
        },
        {
          code: 'S3-X2', kind: 'match',
          prompt: 'Match each description to the sign of its slope.',
          bins: ['Positive', 'Zero', 'Negative'],
          items: [
            { label: 'rises left to right', bin: 'Positive' },
            { label: 'horizontal', bin: 'Zero' },
            { label: 'falls left to right', bin: 'Negative' }
          ],
          successNote: 'The sign records the direction of vertical change as x increases.'
        }
      ]
    }
  ]
};
