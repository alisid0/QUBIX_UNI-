// The Play for chapter 06.03, "Giving a piece of work a name".
//
// The reading's objective is "package a rule as a named function with stated
// inputs and one clear output", and its check asks why a conversion function
// that returns 0 for None is dangerous. The answer it wants is that zero is a
// plausible reading, so the absence becomes indistinguishable from a
// measurement. That is the whole mission: not "can you write a def", but "what
// does your function do when the input is missing, and what does that do to the
// number somebody reports afterwards".
//
// So the learner does not type code. They choose the function's CONTRACT for
// the awkward input, and the workshop runs their choice over a real batch and
// shows the batch summary move. A wrong contract is not marked wrong; it
// produces a number, and the number is visibly a lie.
//
// The function is built as program data and executed by the chapter 06 runner,
// so the code on screen and the results beside it come from one object and
// cannot drift. That is the same rule python-trace-mission.js was written to
// keep, and the reason `def`, `return`, `raise` and calls were added there
// rather than reimplemented here.

import { sourceOf, runProgram } from './python-trace-mission.js';

/* ---------------------------------------------------------------- cases -- */

/**
 * Each case is one rule stated in words, a batch that contains an awkward
 * value, and four candidate contracts for that value. `verdict` is what the
 * batch summary becomes under each contract, and it is computed, never typed.
 */
export const FUNCTION_WORKSHOP_MISSION = Object.freeze({
  id: 'M06.03',
  title: 'The Function Workshop',
  competency: 'Package a rule as a named function, state what it does with a '
    + 'missing input, and show what that choice does to the figure downstream.',
  sources: Object.freeze([
    Object.freeze({ label: 'Python — defining functions',
      url: 'https://docs.python.org/3/tutorial/controlflow.html#defining-functions' }),
    Object.freeze({ label: 'Python — the None object',
      url: 'https://docs.python.org/3/library/constants.html#None' }),
    Object.freeze({ label: 'Python — raising exceptions',
      url: 'https://docs.python.org/3/tutorial/errors.html#raising-exceptions' })
  ]),
  cases: Object.freeze([
    Object.freeze({
      id: 'to-kg',
      brief: 'Convert a weight to kilograms',
      rule: 'The stockroom records weights in grams. The weekly report wants kilograms, '
        + 'to two decimal places.',
      note: 'One pallet was never weighed. Its weight field is empty.',
      fn: 'to_kg',
      params: ['grams'],
      unit: 'kg',
      body: [{ return: { round: [{ div: [{ var: 'grams' }, 1000] }, 2] } }],
      batch: Object.freeze([
        { label: 'Pallet A', value: 2500 },
        { label: 'Pallet B', value: 1750 },
        { label: 'Pallet C', value: null },
        { label: 'Pallet D', value: 3250 }
      ]),
      summaryLabel: 'Mean weight across the four pallets',
      answer: 'none',
      options: Object.freeze([
        ['zero', 'Return 0 kilograms', 'The pallet is converted to a number.'],
        ['none', 'Return None', 'The pallet has no converted weight.'],
        ['raise', 'Refuse to convert it', 'The batch stops at that row.']
      ]),
      why: Object.freeze({
        zero: 'A pallet that was never weighed now weighs nothing, and nothing in the '
          + 'output says so. The mean drops by a quarter and still looks like a measurement.',
        none: 'The function says "I do not know" rather than inventing a weight. The mean '
          + 'is taken over the three pallets that were actually weighed, and the report says '
          + 'three. Nothing is invented and nothing is hidden.',
        raise: 'Safe, but it stops the whole batch for one missing value. Correct when a '
          + 'missing weight means the data is unusable; too strict when it means "not yet weighed".'
      })
    }),

    Object.freeze({
      id: 'margin',
      brief: 'Work out the margin on a line',
      rule: 'Margin is profit divided by revenue, as a percentage to one decimal place.',
      note: 'One line was a free replacement: revenue is 0.',
      fn: 'margin_pct',
      params: ['profit', 'revenue'],
      unit: '%',
      body: [{ return: { round: [{ mul: [{ div: [{ var: 'profit' }, { var: 'revenue' }] }, 100] }, 1] } }],
      batch: Object.freeze([
        { label: 'Line 1', value: 42, second: 210 },
        { label: 'Line 2', value: 18, second: 90 },
        { label: 'Line 3', value: 0, second: 0 },
        { label: 'Line 4', value: 96, second: 320 }
      ]),
      summaryLabel: 'Mean margin across the four lines',
      answer: 'none',
      guard: 'revenue',
      options: Object.freeze([
        ['none', 'Return None', 'The line has no margin to report.'],
        ['raise', 'Refuse to divide', 'The batch stops at that row.'],
        ['zero', 'Return a margin of 0%', 'The line is counted as a sale at no margin.']
      ]),
      why: Object.freeze({
        zero: 'A free replacement now reports a 0% margin, which reads as "we sold it and '
          + 'made nothing" rather than "we did not sell it". The mean margin falls and the '
          + 'reason is invisible.',
        none: 'A line with no revenue has no margin to report. Saying so, and averaging over '
          + 'the three lines that had revenue, is the only answer that does not invent a sale.',
        raise: 'Defensible: dividing by zero is a real fault. But a free replacement is a '
          + 'normal event, and stopping the report for it is too strong.'
      })
    }),

    Object.freeze({
      id: 'days',
      brief: 'Count days to deliver',
      rule: 'Days to deliver is the delivery day minus the order day.',
      note: 'One order has not been delivered yet, so its delivery day is empty.',
      fn: 'days_to_deliver',
      params: ['delivered_day', 'ordered_day'],
      unit: ' days',
      body: [{ return: { sub: [{ var: 'delivered_day' }, { var: 'ordered_day' }] } }],
      batch: Object.freeze([
        { label: 'Order 118', value: 14, second: 11 },
        { label: 'Order 119', value: 19, second: 12 },
        { label: 'Order 120', value: null, second: 13 },
        { label: 'Order 121', value: 21, second: 18 }
      ]),
      summaryLabel: 'Mean days to deliver',
      answer: 'none',
      options: Object.freeze([
        ['raise', 'Refuse to measure it', 'The batch stops at that row.'],
        ['zero', 'Return 0 days', 'The order is counted as delivered instantly.'],
        ['none', 'Return None', 'The order has no delivery time yet.']
      ]),
      why: Object.freeze({
        zero: 'An order still in transit becomes the fastest delivery on record. This is '
          + 'the worst case of the four, because it does not just lower the mean, it '
          + 'improves it: the missing data flatters the figure.',
        none: 'An undelivered order has no delivery time yet. Reporting the mean over the '
          + 'three that arrived, and saying three, is the honest figure.',
        raise: 'Too strict. An order in transit is not a fault in the data, it is Tuesday.'
      })
    })
  ])
});

/* -------------------------------------------------------------- assembly -- */

/** The guard clause for a contract, as program statements. */
function guardFor(choice, c) {
  const subject = c.guard ? { var: c.guard } : { var: c.params[0] };
  const test = c.guard ? { isZero: subject } : { isNone: subject };
  if (choice === 'raise') return [{ if: test, then: [{ raise: missingMessage(c) }] }];
  if (choice === 'zero') return [{ if: test, then: [{ return: 0 }] }];
  if (choice === 'none') return [{ if: test, then: [{ return: null }] }];
  return [];
}

const missingMessage = c => (c.guard ? 'no revenue to divide by'
  : c.id === 'days' ? 'not delivered yet' : 'weight is missing');

/** The whole function, for a chosen contract, as program data. */
export function programFor(c, choice) {
  return [{ def: c.fn, params: c.params, body: [...guardFor(choice, c), ...c.body] }];
}

/** That function rendered as the Python a learner reads. */
export const sourceFor = (c, choice) => sourceOf(programFor(c, choice));

/**
 * Runs the chosen function across the whole batch.
 *
 * Returns one row per item with the value the function gave back, plus the
 * summary under that contract. The summary is what makes the choice matter:
 * three of the four contracts produce a number, and two of those numbers are
 * wrong in a way no error message would reveal.
 */
export function runBatch(c, choice) {
  const program = programFor(c, choice);
  const rows = c.batch.map(item => {
    const args = c.params.length === 2 ? [item.value, item.second] : [item.value];
    const call = [...program, { set: 'out', value: { call: c.fn, args } }];
    const r = runProgram(call);
    return { label: item.label, input: item.value, second: item.second, out: r.env.out, error: r.error };
  });

  const failed = rows.find(r => r.error);
  if (failed) {
    return { rows, summary: null, count: 0, error: failed.error,
      note: 'The batch stopped at the first refusal. Nothing after it was converted.' };
  }

  // A mean is taken over the values that exist, and always reports how many
  // that was. Not a kindness to the learner: it is the rule this whole mission
  // argues for, so the workshop has to follow it too.
  const usable = rows.filter(r => r.out !== null && r.out !== undefined);
  const total = usable.reduce((n, r) => n + r.out, 0);
  const mean = usable.length ? Math.round((total / usable.length) * 100) / 100 : null;
  return { rows, summary: mean, count: usable.length, error: null, note: null };
}

/** The truthful summary: computed over the values that were actually measured. */
export function truthFor(c) {
  const honest = runBatch(c, 'none');
  return { summary: honest.summary, count: honest.count, of: c.batch.length };
}

export const CONTRACT_STEPS = Object.freeze([
  { key: 'answer', prompt: 'What should the function do with that input?' }
]);
