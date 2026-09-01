// A dedicated practice for chapter 07.02.
//
// The Analyst Decision Desk already asks learners to choose a representation,
// but that is one decision inside a larger workflow. This clinic isolates the
// visual question: what comparison is being made, which visual encoding answers
// it, and what must be labelled before the picture can be trusted.

export const DATA_VISUALIZATION_MISSION = Object.freeze({
  id: 'MISSION 103', status: 'AI_DRAFT', role: 'ANALYST', title: 'The Chart Clinic',
  competency: 'Choose a chart from the analytical question, then audit its scale, units, labels and accessibility before sharing it.',
  sources: Object.freeze([
    Object.freeze({ label: 'Government Analysis Function — data visualisation and charts', url: 'https://analysisfunction.civilservice.gov.uk/policy-store/data-visualisation-charts/' }),
    Object.freeze({ label: 'W3C — understanding use of colour', url: 'https://www.w3.org/WAI/WCAG22/Understanding/use-of-color.html' })
  ]),
  cases: Object.freeze([
    Object.freeze({
      id: 'categories', brief: 'Compare revenue across four departments.',
      question: 'Which chart makes the category comparison easiest to judge?',
      answer: 'bar', values: Object.freeze([62, 88, 47, 73]), labels: Object.freeze(['Fresh', 'Home', 'Tech', 'Care']),
      options: Object.freeze([
        Object.freeze({ id: 'pie', label: 'Pie chart', hint: 'angles are harder to compare precisely' }),
        Object.freeze({ id: 'bar', label: 'Bar chart from zero', hint: 'one aligned length for every department' }),
        Object.freeze({ id: 'line', label: 'Line chart', hint: 'joins categories that have no continuous order' })
      ]),
      why: 'Departments are separate categories. Bars share one baseline, so the differences can be read without estimating angles or inventing a sequence.'
    }),
    Object.freeze({
      id: 'time', brief: 'Follow returns per 1,000 sales from January to June.',
      question: 'Which chart shows whether the rate is changing through time?',
      answer: 'line', values: Object.freeze([11.2, 10.8, 11.0, 10.7, 11.1, 10.9]), labels: Object.freeze(['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']),
      options: Object.freeze([
        Object.freeze({ id: 'bar', label: 'Bars of raw return counts', hint: 'confuses a bigger month with a worse rate' }),
        Object.freeze({ id: 'scatter', label: 'Unconnected scatter plot', hint: 'hides the ordered time path' }),
        Object.freeze({ id: 'line', label: 'Line chart of the rate', hint: 'keeps time ordered and the denominator visible' })
      ]),
      why: 'Time has an order and the question is about movement. A line shows that path, while the rate keeps months of different size comparable.'
    }),
    Object.freeze({
      id: 'shape', brief: 'Inspect the shape of 240 customer basket values.',
      question: 'Which chart reveals clusters, gaps and unusual values?',
      answer: 'histogram', values: Object.freeze([7, 18, 38, 62, 51, 31, 19, 9, 4, 1]), labels: Object.freeze(['0', '10', '20', '30', '40', '50', '60', '70', '80', '90+']),
      options: Object.freeze([
        Object.freeze({ id: 'histogram', label: 'Histogram with stated bins', hint: 'shows how often values fall in each range' }),
        Object.freeze({ id: 'line', label: 'Line chart in row order', hint: 'the row order has no analytical meaning' }),
        Object.freeze({ id: 'pie', label: 'Pie chart with ten slices', hint: 'conceals the distribution shape' })
      ]),
      why: 'A distribution is about frequency across value ranges. A histogram makes the shape visible, provided the bin boundaries are stated.'
    }),
    Object.freeze({
      id: 'relationship', brief: 'Test whether longer checkout queues are associated with longer waits.',
      question: 'Which chart shows the relationship between two measurements?',
      answer: 'scatter', values: Object.freeze([1.2, 2.1, 2.4, 3.7, 4.2, 5.6]), second: Object.freeze([2, 3, 4, 5, 6, 8]), labels: Object.freeze(['A', 'B', 'C', 'D', 'E', 'F']),
      options: Object.freeze([
        Object.freeze({ id: 'line', label: 'Two lines against branch name', hint: 'two scales can manufacture a pattern' }),
        Object.freeze({ id: 'scatter', label: 'Scatter plot with both units labelled', hint: 'one point per branch, two measured coordinates' }),
        Object.freeze({ id: 'bar', label: 'Stacked bars', hint: 'adds quantities with incompatible units' })
      ]),
      why: 'Each branch supplies a pair of measurements. A scatter plot preserves those pairs and shows association without claiming that one variable caused the other.'
    })
  ])
});

export const isVisualizationAnswer = (caseRecord, answer) => caseRecord?.answer === answer;
