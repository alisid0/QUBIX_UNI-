// Chapter 06 had no game, and it is the hardest chapter to give one to,
// because a Python mission wants a Python runner.
//
// A full interpreter in the browser means shipping megabytes of WebAssembly to
// teach loops and accumulators. A hand-written "expected output" means the code
// on screen and the answer beside it can drift apart, which is the one thing
// this repository refuses everywhere else.
//
// So the program is data. One function renders it as Python source, another
// executes it and records what every name held after every line. The listing
// and the trace come from the same object, so a learner can step through the
// code and watch the values move, and the two can never disagree.
//
// The subset is deliberately small: assignment, arithmetic, comparison, if,
// for-over-a-list, and a print. That is exactly what chapter 06 teaches, and
// nothing here needs more.

/* --------------------------------------------------------------- render -- */

const lit = v => (typeof v === 'string' ? `"${v}"` : v === null ? 'None' : String(v));

/** A small expression, as Python text. */
export function exprText(e) {
  if (e === null || typeof e !== 'object') return lit(e);
  if (e.var) return e.var;
  if (e.add) return e.add.map(exprText).join(' + ');
  if (e.mul) return e.mul.map(exprText).join(' * ');
  if (e.gt) return `${exprText(e.gt[0])} > ${exprText(e.gt[1])}`;
  if (e.lt) return `${exprText(e.lt[0])} < ${exprText(e.lt[1])}`;
  if (e.isNone) return `${exprText(e.isNone)} is None`;
  if (e.field) return `${exprText(e.field[0])}["${e.field[1]}"]`;
  if (e.len) return `len(${exprText(e.len)})`;
  return String(e);
}

/** The program, as the Python a learner reads. One line per statement. */
export function sourceOf(program, indent = 0) {
  const pad = '    '.repeat(indent);
  const lines = [];
  for (const st of program) {
    if (st.set !== undefined) lines.push({ text: `${pad}${st.set} = ${exprText(st.value)}`, node: st });
    else if (st.forEach) {
      lines.push({ text: `${pad}for ${st.as} in ${st.forEach}:`, node: st });
      lines.push(...sourceOf(st.body, indent + 1));
    } else if (st.if) {
      lines.push({ text: `${pad}if ${exprText(st.if)}:`, node: st });
      lines.push(...sourceOf(st.then, indent + 1));
      if (st.else) {
        lines.push({ text: `${pad}else:`, node: st });
        lines.push(...sourceOf(st.else, indent + 1));
      }
    } else if (st.print) lines.push({ text: `${pad}print(${exprText(st.print)})`, node: st });
  }
  return lines;
}

/* -------------------------------------------------------------- execute -- */

class PyTypeError extends Error {}

function value(e, env) {
  if (e === null || typeof e !== 'object') return e;
  if (e.var !== undefined) return env[e.var];
  if (e.field) {
    const row = value(e.field[0], env);
    return row === undefined || row === null ? null : row[e.field[1]];
  }
  if (e.len) return (value(e.len, env) ?? []).length;
  if (e.add) {
    const [a, b] = e.add.map(x => value(x, env));
    // Python refuses to guess between joining and summing, and so does this.
    if (typeof a !== typeof b) throw new PyTypeError(`unsupported operand type(s) for +: '${pyType(a)}' and '${pyType(b)}'`);
    return typeof a === 'string' ? a + b : a + b;
  }
  if (e.mul) return e.mul.map(x => value(x, env)).reduce((a, b) => a * b);
  if (e.gt) { const [a, b] = e.gt.map(x => value(x, env)); return cmp(a, b, '>'); }
  if (e.lt) { const [a, b] = e.lt.map(x => value(x, env)); return cmp(a, b, '<'); }
  if (e.isNone) return value(e.isNone, env) === null;
  return e;
}

const pyType = v => (v === null ? 'NoneType' : typeof v === 'string' ? 'str' : Number.isInteger(v) ? 'int' : 'float');

function cmp(a, b, op) {
  if (a === null || b === null) throw new PyTypeError(`'${op}' not supported between instances of '${pyType(a)}' and '${pyType(b)}'`);
  return op === '>' ? a > b : a < b;
}

/**
 * Runs the program and records the environment after every executed line.
 * Returns the trace, the printed output, and any error, which is what makes a
 * wrong prediction visible rather than merely marked wrong.
 */
export function runProgram(program, data = {}) {
  const env = { ...data };
  const trace = [];
  const output = [];
  let error = null;

  const step = (label, node) => trace.push({ label, node, env: { ...env } });

  const exec = block => {
    for (const st of block) {
      if (st.set !== undefined) {
        env[st.set] = value(st.value, env);
        step(`${st.set} = ${lit(env[st.set])}`, st);
      } else if (st.forEach) {
        const items = env[st.forEach] ?? [];
        for (const item of items) {
          env[st.as] = item;
          step(`${st.as} = ${lit(item)}`, st);
          exec(st.body);
        }
      } else if (st.if) {
        const took = value(st.if, env);
        step(`${exprText(st.if)} → ${took}`, st);
        if (took) exec(st.then);
        else if (st.else) exec(st.else);
      } else if (st.print) {
        const v = value(st.print, env);
        output.push(lit(v));
        step(`print → ${lit(v)}`, st);
      }
    }
  };

  try { exec(program); }
  catch (e) {
    if (!(e instanceof PyTypeError)) throw e;
    error = `TypeError: ${e.message}`;
    step(error, null);
  }
  return { trace, output, error, env };
}

/* ----------------------------------------------------------------- cases -- */

export const PYTHON_TRACE_MISSION = Object.freeze({
  id: 'MISSION 104', status: 'AI_DRAFT', role: 'ANALYST', title: 'Read the Program',
  competency: 'Predict what a small program leaves in each name, and explain the value it produced.',
  sources: Object.freeze([
    Object.freeze({ label: 'Python — the tutorial', url: 'https://docs.python.org/3/tutorial/index.html' }),
    Object.freeze({ label: 'Python — control flow tools', url: 'https://docs.python.org/3/tutorial/controlflow.html' }),
    Object.freeze({ label: 'Python — built-in types', url: 'https://docs.python.org/3/library/stdtypes.html' })
  ]),
  cases: Object.freeze([
    Object.freeze({
      id: 'accumulate',
      brief: 'What does this print?',
      note: 'Four basket totals, summed.',
      data: Object.freeze({ baskets: Object.freeze([18, 6, 22, 9]) }),
      program: Object.freeze([
        Object.freeze({ set: 'total', value: 0 }),
        Object.freeze({ forEach: 'baskets', as: 'b', body: Object.freeze([
          Object.freeze({ set: 'total', value: Object.freeze({ add: Object.freeze([Object.freeze({ var: 'total' }), Object.freeze({ var: 'b' })]) }) })
        ]) }),
        Object.freeze({ print: Object.freeze({ var: 'total' }) })
      ]),
      answer: '55',
      answerOptions: Object.freeze([
        ['9', '9', 'the last basket, if the total were reset each time'],
        ['55', '55', 'every basket added to a total that survives the loop'],
        ['4', '4', 'the number of baskets']
      ]),
      answerWhy: 'total starts at 0 outside the loop and keeps its value between passes, so it ends at 18 + 6 + 22 + 9.',
      idea: 'outside',
      ideaOptions: Object.freeze([
        ['inside', 'It would count the baskets instead', 'that is len(), a different thing'],
        ['nothing', 'Nothing: it is the same either way', 'the value would reset on every pass'],
        ['outside', 'It would print 9, the last basket only', 'the accumulator has to live longer than the loop']
      ]),
      ideaWhy: 'Moving total = 0 inside the loop resets it on every pass, so the final answer reflects only the last item. Accumulators belong outside the loop that fills them.'
    }),

    Object.freeze({
      id: 'types',
      brief: 'What happens when this runs?',
      note: 'A quantity read from a file arrives as text.',
      data: Object.freeze({}),
      program: Object.freeze([
        Object.freeze({ set: 'quantity', value: '2' }),
        Object.freeze({ set: 'extra', value: 3 }),
        Object.freeze({ set: 'total', value: Object.freeze({ add: Object.freeze([Object.freeze({ var: 'quantity' }), Object.freeze({ var: 'extra' })]) }) }),
        Object.freeze({ print: Object.freeze({ var: 'total' }) })
      ]),
      answer: 'error',
      answerOptions: Object.freeze([
        ['five', 'It prints 5', 'Python would have to guess that the text is a number'],
        ['error', 'It stops with a TypeError', 'adding text to a number is not defined'],
        ['twentythree', 'It prints "23"', 'that is what joining two strings would give']
      ]),
      answerWhy: 'Python refuses to choose between joining and summing, so it raises rather than guessing. The trace stops on the line that tried.',
      idea: 'convert',
      ideaOptions: Object.freeze([
        ['convert', 'Convert the text to a number first, and handle what fails', 'the conversion is where a bad value gets caught'],
        ['ignore', 'Skip rows that raise', 'silently drops data and reports a smaller total'],
        ['concat', 'Make both text and join them', 'produces "23", which is not a quantity']
      ]),
      ideaWhy: 'int(quantity) is where an unexpected value announces itself. Skipping the row hides it, and joining produces something that looks like a number and is not.'
    }),

    Object.freeze({
      id: 'absent',
      brief: 'What does this print?',
      note: 'One reading in the feed is missing.',
      data: Object.freeze({ readings: Object.freeze([4, null, 9, 2]) }),
      program: Object.freeze([
        Object.freeze({ set: 'kept', value: 0 }),
        Object.freeze({ set: 'skipped', value: 0 }),
        Object.freeze({ forEach: 'readings', as: 'r', body: Object.freeze([
          Object.freeze({ if: Object.freeze({ isNone: Object.freeze({ var: 'r' }) }),
            then: Object.freeze([Object.freeze({ set: 'skipped', value: Object.freeze({ add: Object.freeze([Object.freeze({ var: 'skipped' }), 1]) }) })]),
            else: Object.freeze([Object.freeze({ set: 'kept', value: Object.freeze({ add: Object.freeze([Object.freeze({ var: 'kept' }), 1]) }) })]) })
        ]) }),
        Object.freeze({ print: Object.freeze({ var: 'skipped' }) })
      ]),
      answer: '1',
      answerOptions: Object.freeze([
        ['0', '0', 'only if None never appeared'],
        ['4', '4', 'that is every reading'],
        ['1', '1', 'one of the four readings is None']
      ]),
      answerWhy: 'The absence is tested for directly rather than compared, so it lands in skipped and the other three land in kept.',
      idea: 'count',
      ideaOptions: Object.freeze([
        ['count', 'Because a total over three readings is not a total over four', 'the skipped count is part of the answer'],
        ['speed', 'Because counting is faster than summing', 'it is not about speed'],
        ['style', 'Because two counters read more clearly', 'true, and not the reason']
      ]),
      ideaWhy: 'A loop that quietly ignores what it cannot handle returns a number that looks complete. How many rows were skipped is often the most useful output.'
    }),

    Object.freeze({
      id: 'compare',
      brief: 'What happens when this runs?',
      note: 'The same feed, compared rather than tested.',
      data: Object.freeze({ readings: Object.freeze([4, null, 9, 2]) }),
      program: Object.freeze([
        Object.freeze({ set: 'high', value: 0 }),
        Object.freeze({ forEach: 'readings', as: 'r', body: Object.freeze([
          Object.freeze({ if: Object.freeze({ gt: Object.freeze([Object.freeze({ var: 'r' }), 3]) }),
            then: Object.freeze([Object.freeze({ set: 'high', value: Object.freeze({ add: Object.freeze([Object.freeze({ var: 'high' }), 1]) }) })]) })
        ]) }),
        Object.freeze({ print: Object.freeze({ var: 'high' }) })
      ]),
      answer: 'error',
      answerOptions: Object.freeze([
        ['two', 'It prints 2', 'only if the None had been dealt with first'],
        ['error', 'It stops with a TypeError on the None', 'a comparison against an absent value is not defined'],
        ['three', 'It prints 3', 'that would count the None as high']
      ]),
      answerWhy: 'The first two readings pass, then r is None and the comparison has nothing to compare. This is the same absence as the previous case, met by a rule that did not expect it.',
      idea: 'first',
      ideaOptions: Object.freeze([
        ['guard', 'Compare anyway and catch the error', 'works, and buries the reason in a handler'],
        ['first', 'Test for the absence before comparing', 'the check that decides what absence means'],
        ['zero', 'Replace None with 0 before the loop', 'invents a reading nobody took']
      ]),
      ideaWhy: 'Deciding what an absent value means is a decision to make deliberately. Replacing it with zero makes it a measurement, which is the mistake mission 003 is about.'
    }),

    Object.freeze({
      id: 'rows',
      brief: 'What does this print?',
      note: 'A table in code: a list of rows, each a set of named values.',
      data: Object.freeze({ rows: Object.freeze([
        Object.freeze({ sku: 'QX-CER-001', qty: 2 }),
        Object.freeze({ sku: 'QX-DRK-014', qty: 1 }),
        Object.freeze({ sku: 'QX-TIN-032', qty: 3 })
      ]) }),
      program: Object.freeze([
        Object.freeze({ set: 'units', value: 0 }),
        Object.freeze({ forEach: 'rows', as: 'row', body: Object.freeze([
          Object.freeze({ set: 'units', value: Object.freeze({ add: Object.freeze([Object.freeze({ var: 'units' }), Object.freeze({ field: Object.freeze([Object.freeze({ var: 'row' }), 'qty']) })]) }) })
        ]) }),
        Object.freeze({ print: Object.freeze({ var: 'units' }) })
      ]),
      answer: '6',
      answerOptions: Object.freeze([
        ['3', '3', 'that is the number of rows, which is len(rows)'],
        ['6', '6', 'the quantities added: 2 + 1 + 3'],
        ['1', '1', 'the last quantity only']
      ]),
      answerWhy: 'Each row is reached by name, so row["qty"] is the quantity rather than the row. Three rows, six units, and the two numbers answer different questions.',
      idea: 'grain',
      ideaOptions: Object.freeze([
        ['grain', 'One row is one product line, not one unit', 'counting rows counts lines'],
        ['order', 'The rows might be in a different order', 'true, and it does not change the sum'],
        ['type', 'qty might arrive as text', 'a real risk, and not what these two numbers differ about']
      ]),
      ideaWhy: 'This is the grain question from mission 004, in code. len(rows) is a number of lines and the sum is a number of units, and calling either "how much did we sell" needs saying which.'
    }),

    Object.freeze({
      id: 'function',
      brief: 'What does this print?',
      note: 'The conversion from mission 008, written once.',
      data: Object.freeze({}),
      program: Object.freeze([
        Object.freeze({ set: 'fahrenheit', value: 32 }),
        Object.freeze({ set: 'celsius', value: Object.freeze({ mul: Object.freeze([Object.freeze({ add: Object.freeze([Object.freeze({ var: 'fahrenheit' }), -32]) }), 0.5556]) }) }),
        Object.freeze({ print: Object.freeze({ var: 'celsius' }) })
      ]),
      answer: '0',
      answerOptions: Object.freeze([
        ['0', '0', 'freezing point, which is the case worth testing'],
        ['32', '32', 'the input, unconverted'],
        ['17.8', '17.8', 'that is what 0 °F converts to']
      ]),
      answerWhy: '32 °F is freezing point, so the conversion must return 0. A known input with a known answer is what a test is, and this is the first one to write.',
      idea: 'known',
      ideaOptions: Object.freeze([
        ['once', 'So it is written in one place', 'true, and it is not what a test gives you'],
        ['known', 'So a known input can be checked against a known answer', 'the rule becomes checkable'],
        ['faster', 'So it runs faster', 'a function is not faster than the same arithmetic']
      ]),
      ideaWhy: 'A rule you cannot state a known answer for is a rule you do not yet understand well enough to write. 32 → 0 and 212 → 100 catch most mistakes immediately and permanently.'
    })
  ])
});

export const TRACE_STEPS = Object.freeze([
  Object.freeze({ key: 'answer', label: 'PREDICT', question: 'What does this program do?',
    theory: 'Read it as the machine will: one line at a time, keeping track of what each name holds. Predict before running, because a prediction you have to commit to is the only one you learn from.' }),
  Object.freeze({ key: 'idea', label: 'EXPLAIN', question: 'Why does it behave that way?',
    theory: 'The output is the symptom. The rule underneath it is the thing worth carrying to the next program you read.' })
]);

export const answerForTrace = (c, key) => c?.[key];
export const optionsForTrace = (c, key) => c?.[`${key}Options`] || [];
export const whyForTrace = (c, key) => c?.[`${key}Why`] || '';
