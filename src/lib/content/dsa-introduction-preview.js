export const DSA_INTRODUCTION_PREVIEW = Object.freeze({
  id: 'DSA-INTRO-000',
  status: 'APPROVED · AUTHORING ONLY',
  title: 'How should the information live?',
  promise: 'Meet DSA as a set of choices about organising information and doing useful work with it.',
  objective: 'Given a real-world problem, identify the important operation and choose an organisation whose shape supports that work.',
  learnerObjective: 'Look at a problem, decide what work matters most, and choose a useful way to organise the information.',
  prerequisites: ['Follow a short sequence of instructions', 'Compare simple real-world arrangements', 'No coding required'],
  operationLenses: Object.freeze([
    Object.freeze({ id: 'position', label: 'Reach a known position', verb: 'FIND' }),
    Object.freeze({ id: 'latest', label: 'Remove the newest item', verb: 'REMOVE' }),
    Object.freeze({ id: 'arrival', label: 'Serve the oldest waiting item', verb: 'ORDER' }),
    Object.freeze({ id: 'connections', label: 'Follow relationships', verb: 'CONNECT' })
  ]),
  structures: Object.freeze([
    Object.freeze({ id: 'row', informal: 'Numbered row', formal: 'Array or list', operation: 'Reach a known position', tradeoff: 'Middle insertions may require existing items to move.', symbol: '0 · 1 · 2 · 3' }),
    Object.freeze({ id: 'pile', informal: 'Top-only pile', formal: 'Stack', operation: 'Remove the most recent item', tradeoff: 'The oldest item remains buried beneath newer items.', symbol: 'TOP ↑' }),
    Object.freeze({ id: 'line', informal: 'Waiting line', formal: 'Queue', operation: 'Serve in arrival order', tradeoff: 'A newly arrived urgent item still joins behind earlier work in a basic queue.', symbol: 'IN → → OUT' }),
    Object.freeze({ id: 'network', informal: 'Connected map', formal: 'Graph', operation: 'Follow relationships or routes', tradeoff: 'Finding a route can require exploring several possible connections.', symbol: 'A — B — C' })
  ]),
  cases: Object.freeze([
    Object.freeze({ id: 'shelf', prompt: 'A picker receives shelf position 27 and must retrieve the item stored there.', constraint: 'The position is already known; checking positions 0 to 26 would be wasted work.', question: 'Which organisation makes that address useful?', operation: 'position', answer: 'row', reveal: 'An array or list gives ordered items numbered positions.' }),
    Object.freeze({ id: 'undo', prompt: 'A drawing app must undo the action performed most recently.', constraint: 'Only the newest unfinished action should leave first.', question: 'Which organisation keeps that action ready?', operation: 'latest', answer: 'pile', reveal: 'A stack exposes the most recently added item at the top.' }),
    Object.freeze({ id: 'support', prompt: 'Routine support requests should be handled in the order they arrive.', constraint: 'Earlier requests must not be silently overtaken by later routine requests.', question: 'Which organisation preserves that rule?', operation: 'arrival', answer: 'line', reveal: 'A queue adds at one end and serves from the other.' }),
    Object.freeze({ id: 'route', prompt: 'A travel app must find a route through stations joined by rail lines.', constraint: 'The useful information is not one fixed order; it is which stations connect.', question: 'Which organisation represents those relationships?', operation: 'connections', answer: 'network', reveal: 'A graph stores things as nodes and their relationships as edges.' })
  ]),
  transfer: Object.freeze({
    prompt: 'What is the strongest reason to choose a data structure?',
    answers: Object.freeze([
      Object.freeze({ id: 'familiar', label: 'It is the structure I already know best.' }),
      Object.freeze({ id: 'operation', label: 'Its operations and trade-offs fit the problem.' }),
      Object.freeze({ id: 'universal', label: 'It is considered the best structure overall.' })
    ]),
    correct: 'operation'
  }),
  extension: Object.freeze({
    title: 'Same stations, different work',
    promise: 'The facts can stay the same while their useful organisation changes with the question.',
    stations: Object.freeze(['ASH', 'BEECH', 'CEDAR', 'DOCK']),
    links: Object.freeze([
      Object.freeze(['ASH', 'BEECH']),
      Object.freeze(['ASH', 'CEDAR']),
      Object.freeze(['BEECH', 'DOCK']),
      Object.freeze(['CEDAR', 'DOCK'])
    ]),
    tasks: Object.freeze([
      Object.freeze({
        id: 'display-order',
        desk: 'Passenger display',
        prompt: 'Show the four scheduled stops in their planned order, and let a screen request stop position 2.',
        operation: 'Reach a known position while preserving one order.',
        answer: 'row',
        reveal: 'The numbered row keeps the schedule order visible and gives each stop a position.',
        limitation: 'It does not show every possible rail connection between the stations.'
      }),
      Object.freeze({
        id: 'route-map',
        desk: 'Route planner',
        prompt: 'Find possible journeys from ASH to DOCK using the rail connections that actually exist.',
        operation: 'Follow relationships and compare alternative paths.',
        answer: 'network',
        reveal: 'The connected map preserves which stations are joined, so a route algorithm has relationships to follow.',
        limitation: 'It does not by itself declare one scheduled order or give every station a fixed position.'
      })
    ])
  })
});
