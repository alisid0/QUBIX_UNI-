export const DSA_INTRODUCTION_PREVIEW = Object.freeze({
  id: 'DSA-INTRO-000',
  status: 'AI_DRAFT · AUTHORING ONLY',
  title: 'How should the information live?',
  promise: 'Meet DSA as a set of choices about organising information and doing useful work with it.',
  objective: 'Given a real-world problem, identify the important operation and choose an organisation whose shape supports that work.',
  learnerObjective: 'Look at a problem, decide what work matters most, and choose a useful way to organise the information.',
  prerequisites: ['Follow a short sequence of instructions', 'Compare simple real-world arrangements', 'No coding required'],
  structures: Object.freeze([
    Object.freeze({ id: 'row', informal: 'Numbered row', formal: 'Array or list', operation: 'Reach a known position', symbol: '0 · 1 · 2 · 3' }),
    Object.freeze({ id: 'pile', informal: 'Top-only pile', formal: 'Stack', operation: 'Remove the most recent item', symbol: 'TOP ↑' }),
    Object.freeze({ id: 'line', informal: 'Waiting line', formal: 'Queue', operation: 'Serve in arrival order', symbol: 'IN → → OUT' }),
    Object.freeze({ id: 'network', informal: 'Connected map', formal: 'Graph', operation: 'Follow relationships or routes', symbol: 'A — B — C' })
  ]),
  cases: Object.freeze([
    Object.freeze({ id: 'shelf', prompt: 'A picker knows the exact shelf position and must retrieve that item.', question: 'Which organisation makes a known position useful?', answer: 'row', reveal: 'An array or list gives ordered items numbered positions.' }),
    Object.freeze({ id: 'undo', prompt: 'A drawing app must undo the action performed most recently.', question: 'Which organisation keeps the newest action ready?', answer: 'pile', reveal: 'A stack exposes the most recently added item at the top.' }),
    Object.freeze({ id: 'support', prompt: 'Support requests should normally be handled in the order they arrive.', question: 'Which organisation preserves fair arrival order?', answer: 'line', reveal: 'A queue adds at one end and serves from the other.' }),
    Object.freeze({ id: 'route', prompt: 'A travel app must find a route through stations joined by rail lines.', question: 'Which organisation represents connections?', answer: 'network', reveal: 'A graph stores things as nodes and their relationships as edges.' })
  ])
});

