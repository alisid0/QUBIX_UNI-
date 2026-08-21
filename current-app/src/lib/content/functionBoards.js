/**
 * Functions path fallback boards (MATH_FUNCTIONS · BBs 1219–1228).
 *
 * Baby-step arc toward calculus. Floors are few and dense on purpose —
 * thin swipe cards were merged so each dig teaches something.
 *
 * Live Supabase rows may differ; this module is the bundled offline fallback.
 */
export const FUNCTION_BOARDS = {
  1219: {
    act: 'I',
    kicker: 'Functions 1.0',
    title: 'The mechanical rule',
    tags: { subject: 'maths', topic: 'functions', concept: 'function-as-rule', ground: 'g0' },
    layers: [
      {
        text:
          '<p>Press A1 on a vending machine. A cola drops. Press A1 again. Same cola. The button is the input, the drink is the output, and the wiring in between does not invent a new answer mid-week.</p>'
      },
      {
        text:
          '<p>We can write the same idea as a tiny table. 1 → 2, 2 → 4, 3 → 6. Whatever rule hides there (“double it”), each allowed input gets one output. Mathematics calls that a <strong>function</strong>.</p>'
      },
      {
        text:
          '<p>So we start here: learn to run the machine. Later we will ask how fast the output changes, and what value it is creeping toward. Same object. Harder questions.</p>'
      }
    ]
  },
  1220: {
    act: 'I',
    kicker: 'Functions 1.1',
    title: 'The broken machine',
    tags: { subject: 'maths', topic: 'functions', concept: 'one-input-one-output', ground: 'g0' },
    layers: [
      {
        text:
          '<p>If A1 drops cola on Monday and chips on Tuesday, you stop trusting the machine. A function has the same demand: one input, one output, every time.</p>'
      },
      {
        text:
          '<p>Watch this table carefully. 2 → 5, 3 → 6, then 2 → 9. The second visit to 2 forked. That relation is not a function. Two different inputs may still share one output — A1 and A2 can both give cola — but one input may not split.</p>'
      }
    ]
  },
  1221: {
    act: 'I',
    kicker: 'Functions 1.2',
    title: 'The mathematical shorthand',
    tags: { subject: 'maths', topic: 'functions', concept: 'function-notation', ground: 'g0' },
    layers: [
      {
        text:
          '<p>We get tired of drawing machines. Call the input <em>x</em>, call the rule <em>f</em>, and write <em>f(x)</em> — “f of x.” That is the whole shorthand.</p>'
      },
      {
        text:
          '<p>If the rule doubles, <em>f(x) = 2x</em>. Then <em>f(5) = 10</em>: feed 5, read 10. Another: <em>g(x) = x + 3</em> gives <em>g(4) = 7</em> and <em>g(0) = 3</em>. The number in the brackets is always the input.</p>'
      }
    ]
  },
  1222: {
    act: 'I',
    kicker: 'Functions 1.3',
    title: 'The boundaries',
    tags: { subject: 'maths', topic: 'functions', concept: 'domain-and-range', ground: 'g0' },
    layers: [
      {
        text:
          '<p>A wooden block will not buy a drink. Machines only accept some inputs. The set of inputs a function will take is the <strong>domain</strong>. The outputs it actually produces form the <strong>range</strong>.</p>'
      },
      {
        text:
          '<p>Square the whole numbers 0 through 4. Domain: 0, 1, 2, 3, 4. Outputs: 0, 1, 4, 9, 16 — that list is the range for those inputs. Later, when we talk about limits, we often stand at the fence of a domain and ask what the outputs are doing as we lean toward the edge.</p>'
      }
    ]
  },
  1223: {
    act: 'I',
    kicker: 'Functions 1.4',
    title: 'The visual test',
    tags: { subject: 'maths', topic: 'functions', concept: 'vertical-line-test', ground: 'g0' },
    layers: [
      {
        text:
          '<p>Plot each pair on a grid: input across as <em>x</em>, output up as <em>y</em>. The curve is just the table drawn as a picture.</p>'
      },
      {
        text:
          '<p>Because one <em>x</em> may have only one <em>y</em>, a vertical line should hit the graph at most once. Hit twice and the graph fails the vertical line test — a circle fails, a sideways parabola fails, an ordinary straight line or an upright U-shape passes.</p>'
      }
    ]
  },
  1224: {
    act: 'I',
    kicker: 'Functions 1.5',
    title: 'The straight path',
    tags: { subject: 'maths', topic: 'functions', concept: 'linear-functions', ground: 'g0' },
    layers: [
      {
        text:
          '<p>Start at 1 and keep adding 2: 1, 3, 5, 7. Steady steps. On a grid those points sit on a straight line. A function with a constant rate of change is <strong>linear</strong>.</p>'
      },
      {
        text:
          '<p>We usually write <em>f(x) = mx + c</em>. Here <em>m</em> is how steep the line is, and <em>c</em> is where it crosses the vertical axis. A car locked at 60 km/h is the same idea: each hour adds the same distance, so distance against time is a straight ramp. Curves come later; this is the warm-up where slope never changes.</p>'
      }
    ]
  },
  1225: {
    act: 'I',
    kicker: 'Functions 1.6',
    title: 'The explosion',
    tags: { subject: 'maths', topic: 'functions', concept: 'exponential-functions', ground: 'g0' },
    layers: [
      {
        text:
          '<p>One cell becomes two, two become four, four become eight. The jump itself grows. That is repeated multiplication, not repeated addition.</p>'
      },
      {
        text:
          '<p>A rule like <em>f(x) = 2<sup>x</sup></em> puts the input in the exponent — an <strong>exponential</strong> function. Check: x = 0, 1, 2, 3 → 1, 2, 4, 8. Each step ×2. The differences (1, then 2, then 4) grow too. On a graph it can look shy at first and then shoot up. Unlike a straight line, the steepness keeps changing — which is why derivatives care about these curves.</p>'
      }
    ]
  },
  1226: {
    act: 'I',
    kicker: 'Functions 1.7',
    title: 'The falling object',
    tags: { subject: 'maths', topic: 'functions', concept: 'quadratic-functions', ground: 'g0' },
    layers: [
      {
        text:
          '<p>Throw a ball upward. It slows, hangs, then falls. Height against time is not a straight line.</p>'
      },
      {
        text:
          '<p>Rules that square the input, like <em>f(x) = x<sup>2</sup></em>, are <strong>quadratic</strong>. Their graphs are U-shapes — parabolas. Try x = −2, −1, 0, 1, 2 → 4, 1, 0, 1, 4. Near the bottom the graph is almost flat; on the sides it steepens. Slope is local now, different at each point. That is the doorway into differentiation.</p>'
      }
    ]
  },
  1227: {
    act: 'I',
    kicker: 'Functions 1.8',
    title: 'Running it backward',
    tags: { subject: 'maths', topic: 'functions', concept: 'inverse-functions', ground: 'g0' },
    layers: [
      {
        text:
          '<p>The machine turned 3 into 7 by adding 4. Walking back from 7 means subtract 4. A reverse rule that recovers the original input is an <strong>inverse function</strong>.</p>'
      },
      {
        text:
          '<p>This only works when each output comes from exactly one input. Two buttons both dropping cola leave you stuck: seeing cola does not name the button. So <em>f(x) = 2x</em> undoes with “divide by 2,” but <em>f(x) = x<sup>2</sup></em> on all real numbers does not — both 2 and −2 square to 4.</p>'
      }
    ]
  },
  1228: {
    act: 'I',
    kicker: 'Functions 1.9',
    title: 'Chaining them together',
    tags: { subject: 'maths', topic: 'functions', concept: 'composite-functions', ground: 'g0' },
    layers: [
      {
        text:
          '<p>Fuel burns, heat expands gas, the piston moves. Output of one stage feeds the next. Functions do that too: the output of <em>g</em> becomes the input of <em>f</em>. We write <em>f(g(x))</em> and run the inside machine first.</p>'
      },
      {
        text:
          '<p>Let <em>g(x) = x + 1</em> and <em>f(x) = 2x</em>. Then <em>f(g(3))</em> is 3 → 4 → 8. Flip the order: <em>g(f(3))</em> is 3 → 6 → 7. Same parts, different chain, different answer. Once chaining feels ordinary, the next questions — what a function approaches, how fast it changes — have a language to sit in.</p>'
      }
    ]
  }
};
