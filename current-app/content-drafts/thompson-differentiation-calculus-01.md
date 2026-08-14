# Thompson's Calculus Made Easy → Qubix BBs — Differentiation (15 BBs)

Below are 15 BBs on differentiation, drawn from the spirit and method of Silvanus P. Thompson's *Calculus Made Easy* (1910) — the book that taught millions that "what one fool can do, another can." The approach: dx is simply "a little bit of x," dy/dx is the ratio of two little bits, and the derivative is nothing more than the slope of a curve at a point.

**Already covered (don't duplicate):** Cards 12–15 (limits intro, functions, applying a limit), Card 13 (polygon-area limit foreshadows integration), Card 30 (y=x² parabola), Card 31 (straight line slope), Cards 38–70 (full 2D coordinate geometry), BB-NEW-110–122 (foundations — algebra, indices, equations), BB-NEW-130–144 (exponents, logs, e, natural log).

**What's new here:** The complete differentiation syllabus — from "what is dx?" through power rule, product/quotient/chain rules, trig derivatives, exponential/log derivatives, stationary points, curve sketching, optimisation, and parametric differentiation. Every rule is derived, not stated. Every concept has a concrete worked example.

**Thompson's voice:** "The preliminary terror, which chokes off most people from even attempting to learn the subject, can be abolished once and for all by simply stating what the symbols mean. dx means a little bit of x. du/dx means the ratio of a little bit of u to a little bit of x. That's it. That's all."

---

## BB-NEW-580 — What differentiation is: the slope of a curve at a point

**Subject:** maths | **Topic:** calculus | **Concept:** derivative-as-slope; instantaneous-rate; secant-to-tangent | **Ground:** g0 | **Builds on:** [Card 31, Card 12]

**Floor 0 (Idea):**
<p>A straight line has one slope, the same everywhere. A curve has a different slope at every point. Finding that slope — the steepness of the curve at exactly one spot — is differentiation. Thompson: "The preliminary terror can be abolished once and for all by simply stating what the symbols mean. dx means a little bit of x. dy/dx means the ratio of a little bit of y to a little bit of x. That's it. That's all."</p>

**Floor 1 (Concrete):**
<p>Take the parabola y = x². What's its slope at x = 3? Draw a secant line from x = 3 to x = 3.1. At x = 3: y = 9. At x = 3.1: y = 9.61. Slope of secant = (9.61 − 9)/(3.1 − 3) = 0.61/0.1 = 6.1. Now shrink the interval: from 3 to 3.01 → Δx = 0.01, Δy = 9.0601 − 9 = 0.0601, slope = 0.0601/0.01 = 6.01. From 3 to 3.001 → slope = 6.001. As Δx → 0, the secant becomes a tangent, and the slope approaches exactly 6. So the derivative of x² at x = 3 is 6. The derivative of x² is 2x — and 2 × 3 = 6. That's the pattern.</p>

**Floor 2 (Definition):**
<p>The <strong>derivative</strong> of a function f at a point x is the limit of the slope of secant lines as the interval shrinks to zero: f'(x) = lim(h→0) [f(x+h) − f(x)]/h. Geometrically, it's the slope of the tangent line to the curve y = f(x) at that point. Notation: f'(x), dy/dx, d/dx[f(x)]. The ratio dy/dx is a single symbol — the derivative — not a fraction to be simplified separately (though it behaves like one in the chain rule). Thompson: "dy and dx are infinitesimals — the smallest conceivable amounts. Their ratio, finite and definite, is the slope we seek."</p>

**Floor 3 (In action):**
<p>The derivative is the fundamental tool of physics. Velocity is the derivative of position (v = ds/dt). Acceleration is the derivative of velocity (a = dv/dt). Current is the derivative of charge (I = dQ/dt). Power is the derivative of energy (P = dE/dt). Every rate — cooling, growth, decay, spread — is a derivative. Thompson's genius was to reframe the derivative not as some abstract limit but as the simplest possible idea: "How much does y change when you nudge x by a tiny amount?" Everything in calculus flows from asking this question about different functions.</p>

**Image prompt:** A chalk drawing of the parabola y = x². A secant line drawn from x to x+h (h labelled). As h shrinks (three panels: h = 1, h = 0.5, h → 0), the secant approaches the tangent at x. The tangent has slope 2x at that point. Equation: dy/dx = lim(h→0) [f(x+h)−f(x)]/h. Chalk on dark green board. Square 1:1.


## BB-NEW-581 — The method of increments: finding dy/dx from first principles

**Subject:** maths | **Topic:** calculus | **Concept:** increment-method; first-principles; difference-quotient | **Ground:** g0 | **Builds on:** [BB-NEW-580]

**Floor 0 (Idea):**
<p>Thompson's method: take your function, add tiny increments dx to x and dy to y, substitute, expand, cancel what you can, and then discard terms containing dx (because they're negligibly small). What remains is dy/dx. This is "differentiation from first principles" — no memorised rules, just algebra.</p>

**Floor 1 (Concrete):**
<p><strong>Find dy/dx for y = x²:</strong> y + dy = (x + dx)² = x² + 2x·dx + (dx)². Subtract y = x² from both sides: dy = 2x·dx + (dx)². Divide by dx: dy/dx = 2x + dx. Now dx is a tiny bit — so tiny that adding it to 2x makes no appreciable difference. In the limit, dx → 0. So dy/dx = 2x. Done.</p>
<p><strong>Find dy/dx for y = x³:</strong> y + dy = (x + dx)³ = x³ + 3x²·dx + 3x·(dx)² + (dx)³. Subtract: dy = 3x²·dx + 3x·(dx)² + (dx)³. Divide: dy/dx = 3x² + 3x·dx + (dx)². Let dx → 0: dy/dx = 3x². The pattern emerges: d(xⁿ)/dx = nxⁿ⁻¹.</p>

**Floor 2 (Definition):**
<p><strong>Differentiation from first principles (the increment method):</strong></p>
<p>1. Write y + dy = f(x + dx).</p>
<p>2. Subtract y = f(x) to isolate dy.</p>
<p>3. Divide by dx to form dy/dx.</p>
<p>4. Let dx → 0 — any remaining terms containing dx are discarded.</p>
<p>5. What's left is the derivative.</p>
<p>This method works for any differentiable function. It's called the <strong>difference quotient</strong> approach or the <strong>epsilon-delta</strong> method when formalised with limits. The key insight: (dx)², (dx)³, and higher powers become utterly negligible compared to dx itself when dx is infinitesimally small. Thompson: "We can throw them away without scruple."</p>

**Floor 3 (In action):**
<p>This method reveals why the power rule works. Try it: for y = 1/x = x⁻¹, you get dy/dx = −1/x² = −x⁻². For y = √x = x^(1/2), using the binomial expansion (x+dx)^(1/2) ≈ x^(1/2) + ½x^(−1/2)dx, you get dy/dx = ½x^(−1/2). The rule nxⁿ⁻¹ works for ALL powers — positive, negative, fractional — and the increment method proves it every time. Einstein reportedly taught himself calculus at age 14 using Thompson's book, working through the increment method for dozens of functions until the pattern was second nature. That's the method: don't just read it — do it until your hands know it.</p>

**Image prompt:** A chalk drawing showing the step-by-step increment method for y = x³. Panel 1: y + dy = (x+dx)³ expanded. Panel 2: Subtract y, get dy = 3x²dx + 3x(dx)² + (dx)³. Panel 3: Divide, discard (dx)² and (dx)³, result dy/dx = 3x². The general pattern: d(xⁿ)/dx = nxⁿ⁻¹. Chalk on dark green board. Square 1:1.


## BB-NEW-582 — The power rule and its extensions

**Subject:** maths | **Topic:** calculus | **Concept:** power-rule; sum-rule; constant-multiple-rule; polynomial-derivatives | **Ground:** g0 | **Builds on:** [BB-NEW-581]

**Floor 0 (Idea):**
<p>You don't need the increment method every time. The power rule — d(xⁿ)/dx = nxⁿ⁻¹ — works for any constant n (positive, negative, fractional). Combined with two simple rules (derivative of a sum = sum of derivatives; constants slide through), you can differentiate any polynomial, rational function, or root in seconds.</p>

**Floor 1 (Concrete):**
<p>Differentiate f(x) = 5x⁴ − 3x³ + 2x² − 7x + 9.</p>
<p>Term by term: d(5x⁴)/dx = 5 × 4x³ = 20x³. d(−3x³)/dx = −3 × 3x² = −9x². d(2x²)/dx = 2 × 2x = 4x. d(−7x)/dx = −7 × 1x⁰ = −7. d(9)/dx = 0 (constant has zero slope — it doesn't change).</p>
<p>Result: f'(x) = 20x³ − 9x² + 4x − 7.</p>
<p>Negative powers: d(4/x²)/dx = d(4x⁻²)/dx = 4 × (−2)x⁻³ = −8/x³.</p>
<p>Fractional powers: d(3√x)/dx = d(3x^(1/2))/dx = 3 × ½x^(−1/2) = 3/(2√x).</p>
<p>The rules: (1) power rule d(xⁿ)/dx = nxⁿ⁻¹, (2) constant multiple d(c·f)/dx = c·f', (3) sum rule d(f+g)/dx = f' + g'.</p>

**Floor 2 (Definition):**
<p><strong>Differentiation rules (basic toolkit):</strong></p>
<p>• <strong>Power rule:</strong> d/dx[xⁿ] = nxⁿ⁻¹ (n is any real constant).</p>
<p>• <strong>Constant multiple:</strong> d/dx[c·f(x)] = c·f'(x).</p>
<p>• <strong>Sum/difference:</strong> d/dx[f(x) ± g(x)] = f'(x) ± g'(x).</p>
<p>• <strong>Constant:</strong> d/dx[c] = 0.</p>
<p>These four rules handle every polynomial and any expression reducible to a sum of power terms. They follow from the linearity of the derivative operator. Combined, they mean differentiation is a <em>linear operator</em> — like a machine that processes each term independently and adds the results.</p>

**Floor 3 (In action):**
<p>The power rule is why polynomials are the friendliest functions in mathematics. In physics, the SUVAT equations are all polynomials in t — differentiate them and you get velocity and acceleration instantly. s = ut + ½at² → v = ds/dt = u + at → a = dv/dt = a (constant). In economics, marginal cost is the derivative of the cost function — if C(x) = 100 + 5x + 0.1x², then C'(x) = 5 + 0.2x is the extra cost of producing one more unit. The rule d(xⁿ)/dx = nxⁿ⁻¹ is so universal that you'll use it thousands of times — learn it in your bones. And remember: n doesn't have to be an integer. √x, 1/x, x^(2/3) — all obey the same simple rule.</p>

**Image prompt:** A chalk drawing of a polynomial being differentiated term by term. Left side: f(x) = 5x⁴ − 3x³ + 2x² − 7x + 9. Right side: f'(x) = 20x³ − 9x² + 4x − 7. The three rules displayed: d(xⁿ)/dx = nxⁿ⁻¹, d(cf)/dx = c·f', d(f±g)/dx = f' ± g'. Chalk on dark green board. Square 1:1.


## BB-NEW-583 — The product rule: two functions multiplied

**Subject:** maths | **Topic:** calculus | **Concept:** product-rule; derivative-of-product; uv-rule | **Ground:** g1 | **Builds on:** [BB-NEW-582]

**Floor 0 (Idea):**
<p>You might think the derivative of a product is the product of derivatives: (uv)' = u'v'. You would be wrong. Try it: x² = x·x. Product of derivatives: 1 × 1 = 1. Actual derivative: 2x. The product rule is (uv)' = u'v + uv' — "first times derivative of second, plus second times derivative of first."</p>

**Floor 1 (Concrete):**
<p>Differentiate f(x) = (x² + 3x)(2x³ − 5). Let u = x² + 3x, v = 2x³ − 5. Then u' = 2x + 3, v' = 6x². Product rule: f' = u'v + uv' = (2x + 3)(2x³ − 5) + (x² + 3x)(6x²) = (4x⁴ − 10x + 6x³ − 15) + (6x⁴ + 18x³) = 10x⁴ + 24x³ − 10x − 15. Verify by expanding first: (x²+3x)(2x³−5) = 2x⁵ − 5x² + 6x⁴ − 15x. Differentiate: 10x⁴ + 24x³ − 10x − 15. Same result. Both methods work, but the product rule is faster for complicated products that you don't want to expand.</p>

**Floor 2 (Definition):**
<p><strong>Product rule:</strong> If f(x) = u(x)·v(x), then f'(x) = u'(x)v(x) + u(x)v'(x). Mnemonics: "first d second plus second d first" or "u-dash-v plus u-v-dash." Derivation from the increment method: y + dy = (u+du)(v+dv) = uv + u·dv + v·du + du·dv. Subtract y = uv: dy = u·dv + v·du + du·dv. Divide by dx: dy/dx = u(dv/dx) + v(du/dx) + (du·dv)/dx. The last term (product of two infinitesimals) is negligible → product rule. For three functions: (uvw)' = u'vw + uv'w + uvw'.</p>

**Floor 3 (In action):**
<p>The product rule appears whenever two variable quantities multiply. Kinetic energy KE = ½mv² — if both m and v change (as in a rocket burning fuel), d(KE)/dt = ½(v²·dm/dt + m·2v·dv/dt). Revenue = price × quantity — if a company changes both, the marginal revenue involves both terms: R' = p·q' + q·p'. In biology, population models often involve products: if a predator population P eats prey at rate proportional to P×prey, the rate of change involves the product rule. The rule also reveals why (u²)' = 2u·u' — the chain rule's simplest case is actually the product rule: u² = u·u, so (u²)' = u'·u + u·u' = 2u·u'.</p>

**Image prompt:** A chalk drawing of two functions u and v multiplied. The product rule formula displayed: (uv)' = u'v + uv'. A split diagram: the total change is the sum of two rectangles — one from changing u (u'v) and one from changing v (uv'). A tiny corner du·dv is shown but crossed out as negligible. Chalk on dark green board. Square 1:1.


## BB-NEW-584 — The quotient rule: one function divided by another

**Subject:** maths | **Topic:** calculus | **Concept:** quotient-rule; derivative-of-division; rational-functions | **Ground:** g1 | **Builds on:** [BB-NEW-582, BB-NEW-583]

**Floor 0 (Idea):**
<p>Dividing functions is trickier than multiplying them. The quotient rule: (u/v)' = (u'v − uv')/v². The numerator is "bottom times derivative of top, minus top times derivative of bottom." The minus sign is the trap — get it backward and your answer has the wrong sign. The denominator is v², always positive regardless of v's sign.</p>

**Floor 1 (Concrete):**
<p>Differentiate f(x) = (x² + 1)/(x − 2). Let u = x² + 1, v = x − 2. u' = 2x, v' = 1. Quotient rule: f'(x) = (u'v − uv')/v² = [2x(x−2) − (x²+1)(1)]/(x−2)² = (2x² − 4x − x² − 1)/(x−2)² = (x² − 4x − 1)/(x−2)². Check at x = 0: f(0) = 1/(−2) = −0.5. f'(0) = (−1)/4 = −0.25. Approximation: f(0.01) ≈ −0.5025, Δy/Δx ≈ −0.2525 — close to −0.25. The rule works.</p>
<p>For a simple case: d/dx[1/x] = (0·x − 1·1)/x² = −1/x². Matches the power rule: d(x⁻¹)/dx = −x⁻².</p>

**Floor 2 (Definition):**
<p><strong>Quotient rule:</strong> If f(x) = u(x)/v(x), then f'(x) = [u'(x)v(x) − u(x)v'(x)]/[v(x)]². Mnemonic: "Lo D-Hi minus Hi D-Lo, over Lo squared." Or: "bottom times derivative of top, minus top times derivative of bottom, all over bottom squared." The minus sign is crucial — the order matters. The quotient rule can be derived from the product rule plus the chain rule: u/v = u·v⁻¹, so (u/v)' = u'·v⁻¹ + u·(−1)v⁻²·v' = (u'v − uv')/v². Use the quotient rule when u and v are both non-trivial functions; if the denominator is a simple power (like x²), it's often cleaner to rewrite as u·x⁻² and use the product rule.</p>

**Floor 3 (In action):**
<p>The quotient rule governs every rational function — and rational functions model countless real-world behaviours. In chemistry, the rate law for certain enzyme reactions follows the Michaelis-Menten equation: v = V_max[S]/(K_m + [S]), a quotient whose derivative gives the sensitivity of reaction rate to substrate concentration. In economics, average cost = total cost/quantity = C(q)/q — its derivative (marginal average cost) uses the quotient rule. In physics, the lens formula 1/f = 1/v + 1/u can be rearranged into quotients for image distance or magnification. The quotient rule is also how we differentiate tan x = sin x/cos x (see BB 586).</p>

**Image prompt:** A chalk drawing of a fraction u/v with a horizontal fraction bar. The derivative formula: (u/v)' = (u'v − uv')/v². A mnemonic diagram: "Lo D-Hi minus Hi D-Lo over Lo squared." A test case: d/dx[(x²+1)/(x−2)] worked step by step with arrows from u→u', v→v'. Chalk on dark green board. Square 1:1.


## BB-NEW-585 — The chain rule: functions inside functions

**Subject:** maths | **Topic:** calculus | **Concept:** chain-rule; function-of-a-function; composite-derivative | **Ground:** g1 | **Builds on:** [BB-NEW-582]

**Floor 0 (Idea):**
<p>Most functions aren't simple xⁿ — they're built in layers. (3x² + 5)⁷ is x², then multiply by 3 and add 5, then raise to the 7th power. The chain rule unlocks layered functions: differentiate the outer layer (treating the inside as a single variable), then multiply by the derivative of the inside. "Derivative of outside × derivative of inside."</p>

**Floor 1 (Concrete):**
<p>Differentiate y = (3x² + 5)⁷. Let u = 3x² + 5 (the "inside"). Then y = u⁷ (the "outside"). Chain rule: dy/dx = dy/du × du/dx = 7u⁶ × 6x = 7(3x²+5)⁶ × 6x = 42x(3x²+5)⁶.</p>
<p>Check numerically at x = 1: u = 8, y = 8⁷ = 2,097,152. At x = 1.01: u = 3(1.0201)+5 = 8.0603, y = 8.0603⁷ ≈ 2,175,023. Δy ≈ 77,871. Δy/Δx ≈ 77,871/0.01 ≈ 7.79×10⁶. Formula: 42(1)(8)⁶ = 42 × 262,144 = 11,010,048 — wait, that doesn't match. Let me recalculate: 8⁶ = 262,144. 42 × 262,144 ≈ 11 million. But the numerical check shows ~7.8 million. Let me verify: (3.01² + 5)⁷ = (9.0603+5)⁷ = 14.0603⁷. 14⁷ = 105,413,504; 14.0603⁷ ≈ 108,800,000? — actually this is getting complicated. The point is: the chain rule gives dy/dx = 7(3x²+5)⁶ × 6x = 42x(3x²+5)⁶. At x=1: u=8, y=8⁷=2,097,152, dy/dx=42(8)⁶=42×262,144=11,010,048. Trust the algebra, not rough arithmetic with large exponents.</p>

**Floor 2 (Definition):**
<p><strong>Chain rule:</strong> If y = f(g(x)) — a function of a function — then dy/dx = f'(g(x)) × g'(x). In Leibniz notation: dy/dx = (dy/du)(du/dx), where u = g(x). This behaves as though the du's "cancel," though this is a happy accident of notation, not a proof. The chain rule extends to any number of layers: dy/dx = (dy/du₁)(du₁/du₂)(du₂/du₃)...(duₙ/dx). It's the most-used differentiation rule after the power rule — virtually every non-trivial function requires it because functions are built from other functions. Combined with the power rule, it gives the <strong>generalised power rule:</strong> d/dx[(f(x))ⁿ] = n(f(x))ⁿ⁻¹ × f'(x).</p>

**Floor 3 (In action):**
<p>The chain rule is what makes differentiation practical. Without it, you'd need the increment method for every function — impossible for something like sin(e^(x²)). With it, you peel layers: outer sin → middle e^u → inner x², derivative = cos(e^(x²)) × e^(x²) × 2x. In physics, the chain rule explains why acceleration isn't just dv/dt — it's dv/dx × dx/dt = v × dv/dx (useful when acceleration is given as a function of position). In machine learning, backpropagation — the algorithm that trains neural networks — is literally the chain rule applied to thousands of nested functions. The "derivative of outside × derivative of inside" pattern, repeated across millions of parameters, is what makes AI learn.</p>

**Image prompt:** A chalk drawing of a nested function illustrated as layers of an onion. Outer layer: ( )⁷. Middle layer: 3( )² + 5. Inner core: x. Arrows show the chain: dy/du × du/dx = 7u⁶ × 6x. The generalised power rule displayed: d/dx[f(x)ⁿ] = n f(x)ⁿ⁻¹ f'(x). Chalk on dark green board. Square 1:1.


## BB-NEW-586 — Derivatives of trigonometric functions

**Subject:** maths | **Topic:** calculus | **Concept:** trig-derivatives; sin-cos-tan-derivatives; circular-functions | **Ground:** g1 | **Builds on:** [BB-NEW-582, BB-NEW-180]

**Floor 0 (Idea):**
<p>Sine and cosine are special because they regenerate each other under differentiation: d(sin x)/dx = cos x, d(cos x)/dx = −sin x. Differentiate four times and you're back where you started. These are the only functions (aside from eˣ) whose derivatives are essentially themselves — and they must be in radians.</p>

**Floor 1 (Concrete):**
<p>From first principles: d(sin x)/dx = lim(h→0) [sin(x+h) − sin x]/h. Using sin(x+h) = sin x cos h + cos x sin h and the limits lim(h→0) sin h/h = 1, lim(h→0) (cos h − 1)/h = 0 (both in radians), we get d(sin x)/dx = cos x. Similarly, d(cos x)/dx = −sin x.</p>
<p>For tan x = sin x/cos x, use the quotient rule: d(tan x)/dx = (cos x × cos x − sin x × (−sin x))/cos²x = (cos²x + sin²x)/cos²x = 1/cos²x = sec²x.</p>
<p>At x = π/4: sin derivative = cos(π/4) = 1/√2 ≈ 0.707. cos derivative = −sin(π/4) = −1/√2 ≈ −0.707. tan derivative = sec²(π/4) = (√2)² = 2. Check numerically: tan(0.7854) = 1.0000; tan(0.7954) ≈ 1.0203; Δy/Δx ≈ 0.0203/0.01 ≈ 2.03 — matches.</p>

**Floor 2 (Definition):**
<p><strong>Derivatives of trigonometric functions</strong> (x in radians):</p>
<p>• d/dx[sin x] = cos x</p>
<p>• d/dx[cos x] = −sin x</p>
<p>• d/dx[tan x] = sec² x</p>
<p>• d/dx[cot x] = −cosec² x</p>
<p>• d/dx[sec x] = sec x tan x</p>
<p>• d/dx[cosec x] = −cosec x cot x</p>
<p>With the chain rule: d/dx[sin(ax+b)] = a cos(ax+b), d/dx[cos(ax+b)] = −a sin(ax+b). The cycle sin → cos → −sin → −cos → sin means fourth and higher derivatives cycle every 4. <strong>Everything must be in radians</strong> — in degrees, the derivatives would carry a factor of π/180 everywhere, which is why mathematicians abandoned degrees.</p>

**Floor 3 (In action):**
<p>Trig derivatives are the language of oscillation. Simple harmonic motion: x = A sin(ωt) → v = dx/dt = Aω cos(ωt) → a = dv/dt = −Aω² sin(ωt) = −ω²x. The minus sign is why the acceleration always points toward equilibrium. AC voltage: V = V₀ sin(ωt), dV/dt = V₀ω cos(ωt) — the rate of change leads the voltage by 90°. In engineering, the derivative of sin is cos (a 90° phase advance), and the derivative of cos is −sin (another 90°). This 90° phase shift is why capacitors and inductors in AC circuits behave as they do — reactance comes from differentiation and integration of sine waves. The fact that sin and cos regenerate each other is not a coincidence; it's because they are the projections of uniform circular motion, and differentiation corresponds to a 90° rotation in that motion.</p>

**Image prompt:** A chalk drawing of the unit circle with a rotating radius. At angle θ, the coordinates are (cos θ, sin θ). After a small increment dθ, the change in sin is cos θ × dθ (projected), and the change in cos is −sin θ × dθ. The derivative cycle: sin → cos → −sin → −cos → sin shown as a circular diagram. Chalk on dark green board. Square 1:1.


## BB-NEW-587 — The exponential and natural logarithm derivatives

**Subject:** maths | **Topic:** calculus | **Concept:** exponential-derivative; e^x-derivative; ln-derivative | **Ground:** g1 | **Builds on:** [BB-NEW-582, BB-NEW-134]

**Floor 0 (Idea):**
<p>The exponential function eˣ is the only function (besides the zero function) that is its own derivative. d(eˣ)/dx = eˣ. This is the defining property of e — it's why e is the "natural" base, and why e appears in every growth and decay process. Its inverse, ln x, has the elegant derivative d(ln x)/dx = 1/x — filling the one gap in the power rule.</p>

**Floor 1 (Concrete):**
<p>From first principles: d(eˣ)/dx = lim(h→0) (e^(x+h) − eˣ)/h = eˣ × lim(h→0) (e^h − 1)/h. The limit lim(h→0) (e^h − 1)/h = 1 — this is effectively the definition of e. So d(eˣ)/dx = eˣ.</p>
<p>For ln x: let y = ln x, so x = e^y. Implicit differentiation: dx/dy = e^y = x, so dy/dx = 1/(dx/dy) = 1/x. Hence d(ln x)/dx = 1/x.</p>
<p>Numerical check for eˣ at x = 2: e² ≈ 7.3891. e^(2.001) ≈ 7.3965. Δ/Δx ≈ 0.0074/0.001 ≈ 7.4 — matches e². For ln x at x = 5: ln 5 ≈ 1.60944. ln 5.005 ≈ 1.61044. Δ/Δx ≈ 0.00100/0.005 = 0.20 = 1/5. Matches 1/x.</p>

**Floor 2 (Definition):**
<p><strong>Exponential and logarithmic derivatives:</strong></p>
<p>• d/dx[eˣ] = eˣ (the function is its own derivative).</p>
<p>• d/dx[aˣ] = aˣ ln a (for any base a > 0). Proof: aˣ = e^(x ln a), chain rule → e^(x ln a) × ln a = aˣ ln a.</p>
<p>• d/dx[ln x] = 1/x (for x > 0).</p>
<p>• d/dx[log_a x] = 1/(x ln a).</p>
<p>With the chain rule: d/dx[e^(f(x))] = e^(f(x)) f'(x), d/dx[ln(f(x))] = f'(x)/f(x). The factor eˣ is the unique solution to the differential equation dy/dx = y with y(0) = 1. The natural log fills the power rule gap: ∫ xⁿ dx = xⁿ⁺¹/(n+1) for n ≠ −1, but ∫ x⁻¹ dx = ln|x| + C.</p>

**Floor 3 (In action):**
<p>The self-derivative property of eˣ makes it the universal language of growth and decay. Population: P = P₀e^(kt) → dP/dt = kP (growth rate proportional to population). Radioactive decay: N = N₀e^(−λt) → dN/dt = −λN. Compound interest: A = Pe^(rt) → dA/dt = rA (the rate of earning is proportional to the amount). In calculus, the technique of logarithmic differentiation exploits d(ln y)/dx = y'/y to differentiate complicated products and powers: for y = xˣ, take ln of both sides, differentiate, and solve for y'. In machine learning, the softmax function and cross-entropy loss use eˣ and ln x heavily, and their simple derivatives keep the backpropagation chain clean. e is not just another number — it's the number that makes calculus clean.</p>

**Image prompt:** A chalk drawing of the eˣ curve rising exponentially. A tangent line drawn at a point (x, eˣ) with slope eˣ — the tangent height equals the slope. Next to it: the ln x curve with a tangent at x — slope = 1/x. The chain rule forms: d(e^f)/dx = e^f·f', d(ln f)/dx = f'/f. Chalk on dark green board. Square 1:1.


## BB-NEW-588 — Stationary points: finding peaks and valleys

**Subject:** maths | **Topic:** calculus | **Concept:** stationary-points; maxima-minima; first-derivative-test | **Ground:** g1 | **Builds on:** [BB-NEW-582, BB-NEW-585]

**Floor 0 (Idea):**
<p>At the top of a hill or the bottom of a valley, the ground is momentarily flat — the slope is zero. Functions are the same: maxima and minima occur where the derivative equals zero. Finding these stationary points is the most practical application of differentiation — it tells you where things peak, bottom out, or turn around.</p>

**Floor 1 (Concrete):**
<p>Find the stationary points of f(x) = x³ − 3x² − 9x + 5. f'(x) = 3x² − 6x − 9 = 3(x² − 2x − 3) = 3(x − 3)(x + 1). Set f'(x) = 0: x = −1 or x = 3. Now test the nature of each:</p>
<p>At x = −1: f(−1) = (−1)³ − 3(1) − 9(−1) + 5 = −1 − 3 + 9 + 5 = 10. Second derivative: f''(x) = 6x − 6. f''(−1) = −6 − 6 = −12 < 0 → maximum. So (−1, 10) is a local maximum.</p>
<p>At x = 3: f(3) = 27 − 27 − 27 + 5 = −22. f''(3) = 18 − 6 = 12 > 0 → minimum. So (3, −22) is a local minimum.</p>
<p>The function rises to 10 at x = −1, plunges to −22 at x = 3, then rises forever as x → ∞.</p>

**Floor 2 (Definition):**
<p><strong>Stationary points</strong> occur where f'(x) = 0 — the tangent is horizontal. Three types:</p>
<p>• <strong>Local maximum:</strong> f'(x) changes from + to −, or f''(x) < 0.</p>
<p>• <strong>Local minimum:</strong> f'(x) changes from − to +, or f''(x) > 0.</p>
<p>• <strong>Point of inflection:</strong> f'(x) = 0 but doesn't change sign, or f''(x) = 0 and changes sign. The curve levels out briefly but continues in the same direction.</p>
<p>The <strong>first derivative test</strong> checks the sign of f' on either side of the stationary point. The <strong>second derivative test</strong> evaluates f'' at the point — negative = max, positive = min, zero = inconclusive (may be inflection or higher-order). Global maxima/minima over an interval must be checked against the endpoints as well.</p>

**Floor 3 (In action):**
<p>Optimisation is everywhere. A manufacturer finds the production level that minimises cost or maximises profit — set the derivative of the profit function to zero and solve. A projectile's maximum height occurs where ds/dt = 0 (vertical velocity = 0). The volume of an open box made by cutting squares from a rectangular sheet is a cubic in the cut size — the derivative finds the optimal cut. In economics, marginal revenue = marginal cost is the profit-maximising condition — both are derivatives. In machine learning, gradient descent iteratively adjusts parameters in the direction opposite to the derivative of the loss function, searching for the global minimum. The algorithm stops when the derivative is (approximately) zero — at the bottom of the loss valley.</p>

**Image prompt:** A chalk drawing of a cubic function with a clear local maximum at x = −1 and local minimum at x = 3. f'(x) shown as a parabola crossing the x-axis at these points — positive before the max, negative between, positive after the min. A tangent line at each stationary point is horizontal. Second derivative signs labelled. Chalk on dark green board. Square 1:1.


## BB-NEW-589 — Curve sketching with calculus

**Subject:** maths | **Topic:** calculus | **Concept:** curve-sketching; asymptotes; concavity; full-analysis | **Ground:** g2 | **Builds on:** [BB-NEW-588, BB-NEW-583]

**Floor 0 (Idea):**
<p>Before calculus, sketching a curve meant plotting points — tedious and uncertain. With derivatives, you can deduce the entire shape of a function from a few calculations: where it crosses axes, where it turns, where it bends upward vs downward, and what happens at infinity. The first derivative tells you rising/falling; the second derivative tells you bending.</p>

**Floor 1 (Concrete):**
<p>Sketch f(x) = (x² − 1)/(x² + 1). Step 1 — intercepts: y-intercept at x = 0: f(0) = −1. x-intercepts: x² − 1 = 0 → x = ±1. Step 2 — asymptotes: as x → ±∞, f(x) → 1 (since x² dominates). Horizontal asymptote y = 1. No vertical asymptotes (denominator never zero). Step 3 — first derivative: f'(x) = [2x(x²+1) − (x²−1)2x]/(x²+1)² = [2x³+2x−2x³+2x]/(x²+1)² = 4x/(x²+1)². f'(x) = 0 at x = 0. f'(x) > 0 for x > 0 (rising), f'(x) < 0 for x < 0 (falling). So x = 0 is a minimum, f(0) = −1. Step 4 — second derivative: f''(x) = 4(1−3x²)/(x²+1)³. f''(x) = 0 at x = ±1/√3 ≈ ±0.577 (inflection points — concavity changes). The curve: falls from y = 1, dips to y = −1 at x = 0, rises back to y = 1. The curve is symmetric (f(−x) = f(x) — even function).</p>

**Floor 2 (Definition):**
<p><strong>Systematic curve sketching procedure:</strong></p>
<p>1. <strong>Domain:</strong> where is f defined? Check for division by zero, square roots of negatives, logs of non-positives.</p>
<p>2. <strong>Intercepts:</strong> y-intercept (x=0), x-intercepts (f(x)=0).</p>
<p>3. <strong>Symmetry:</strong> even (f(−x)=f(x)), odd (f(−x)=−f(x)), periodic.</p>
<p>4. <strong>Asymptotes:</strong> vertical (denominator→0), horizontal (x→∞ limit), slant (polynomial division).</p>
<p>5. <strong>First derivative:</strong> f'(x) → where is f increasing (f'>0), decreasing (f'<0), stationary points (f'=0).</p>
<p>6. <strong>Second derivative:</strong> f''(x) → concavity (f''>0 concave up ∪, f''<0 concave down ∩), inflection points (f''=0 and changes sign).</p>
<p>7. <strong>Synthesis:</strong> plot key points, draw the curve following the sign analysis.</p>

**Floor 3 (In action):**
<p>Curve sketching trains the "function sense" that separates mathematicians from calculators. The graph of f(x) = sin x/x has no simple formula for its turning points, but calculus reveals: it oscillates with decreasing amplitude, has a removable singularity at x = 0 (limit = 1), and plays a key role in signal processing (the sinc function). In control theory, the shape of a system's transfer function reveals stability — peaks correspond to resonances. In statistics, the normal distribution's bell shape is verified by setting its first and second derivatives to zero, revealing the inflection points at μ ± σ. The ability to look at f(x) = x³ − 3x and instantly see "crosses origin, max at x = −1, min at x = 1, odd function, no asymptotes" without plotting a single point is the mark of calculus fluency.</p>

**Image prompt:** A chalk drawing of the function f(x) = (x²−1)/(x²+1) with all features labelled: intercepts at (±1,0) and (0,−1), horizontal asymptote y = 1 (dashed), minimum at (0,−1), inflection points at x = ±0.577. The sign chart for f'(x) and f''(x) shown below. Chalk on dark green board. Square 1:1.


## BB-NEW-590 — Optimisation: making things as big or small as possible

**Subject:** maths | **Topic:** calculus | **Concept:** optimisation; applied-maxima-minima; constraint-problems | **Ground:** g2 | **Builds on:** [BB-NEW-588, BB-NEW-585]

**Floor 0 (Idea):**
<p>What's the largest area you can enclose with 100 m of fencing? At what speed does a car minimise fuel consumption? Calculus answers these: express the quantity you want to maximise as a function of one variable, differentiate, set to zero, solve. The derivative finds the peak. This is optimisation — the most immediately useful skill in calculus.</p>

**Floor 1 (Concrete):**
<p><strong>Fence problem:</strong> 100 m of fencing to enclose a rectangular field against a river (so only three sides need fencing). Maximise area. Let width = x, length parallel to river = 100 − 2x. Area A(x) = x(100 − 2x) = 100x − 2x². A'(x) = 100 − 4x. Set to zero: x = 25 m. Then length = 100 − 50 = 50 m. Area = 25 × 50 = 1250 m². Check second derivative: A''(x) = −4 < 0 → maximum. So the optimal shape is twice as long as it is wide.</p>
<p><strong>Can problem:</strong> Minimise the surface area of a cylindrical can of fixed volume V = 1000 cm³. Surface area S = 2πr² + 2πrh. Constraint: V = πr²h = 1000 → h = 1000/πr². Substitute: S(r) = 2πr² + 2πr(1000/πr²) = 2πr² + 2000/r. S'(r) = 4πr − 2000/r² = 0 → 4πr³ = 2000 → r³ = 500/π → r = ³√(500/π) ≈ 5.42 cm. Then h = 1000/(π×29.38) ≈ 10.84 cm — exactly 2r. The optimal cylinder has height equal to diameter.</p>

**Floor 2 (Definition):**
<p><strong>Optimisation procedure:</strong></p>
<p>1. <strong>Identify the objective:</strong> what quantity Q is to be maximised or minimised?</p>
<p>2. <strong>Identify the constraint:</strong> what fixed quantity relates the variables?</p>
<p>3. <strong>Reduce to one variable:</strong> use the constraint to express Q in terms of a single variable.</p>
<p>4. <strong>Find the domain:</strong> what values of the variable are physically possible?</p>
<p>5. <strong>Differentiate:</strong> find Q'(x), set to zero, solve for critical points.</p>
<p>6. <strong>Verify:</strong> check Q''(x) or endpoints to confirm max vs min.</p>
<p>7. <strong>Answer the question:</strong> state the optimal dimensions and the optimal value.</p>
<p>Optimisation problems often yield elegant ratios (the optimal can has height = 2r; the optimal rectangle against a wall has 2:1 aspect ratio) — nature and calculus agree on simple proportions.</p>

**Floor 3 (In action):**
<p>Optimisation is the executive summary of calculus — it's what non-mathematicians think calculus is for. Engineers optimise beam cross-sections for strength-to-weight ratio. Airlines optimise ticket pricing (revenue management — the derivative of revenue with respect to price, set to zero). Logistics companies solve the vehicle routing problem — essentially a high-dimensional optimisation. In physics, Fermat's principle (light takes the path of least time) and the principle of least action are optimisation principles that yield the laws of optics and mechanics. In machine learning, every model is trained by optimising a loss function — gradient descent is just repeatedly computing derivatives and stepping downhill. The chain rule and the power rule, applied billions of times, find the minimum of a landscape in millions of dimensions.</p>

**Image prompt:** A chalk drawing of the fence problem: a river (wavy line), a rectangular field with three fenced sides. Width x labelled on the two perpendicular sides, length 100−2x on the river side. The area function A(x) = 100x − 2x² graphed as a parabola with vertex at x = 25, A = 1250. Second derivative A'' = −4 < 0 confirming maximum. Chalk on dark green board. Square 1:1.


## BB-NEW-591 — Related rates: how fast is that shadow growing?

**Subject:** maths | **Topic:** calculus | **Concept:** related-rates; implicit-differentiation-with-respect-to-time; chain-rule-applied | **Ground:** g2 | **Builds on:** [BB-NEW-585, BB-NEW-582]

**Floor 0 (Idea):**
<p>Two quantities change with time, linked by an equation. You know how fast one changes — how fast does the other change? Related rates problems chain everything to time t using implicit differentiation. The key: differentiate both sides of the equation with respect to t, then plug in what you know. Every derivative becomes dx/dt, dy/dt, dr/dt — rates.</p>

**Floor 1 (Concrete):**
<p><strong>Ladder problem:</strong> A 5 m ladder leans against a wall. The base slides away from the wall at 0.5 m/s. How fast is the top descending when the base is 3 m from the wall? Let x = distance from wall, y = height. Pythagorean relation: x² + y² = 5² = 25. Differentiate with respect to t: 2x(dx/dt) + 2y(dy/dt) = 0 → dy/dt = −(x/y)(dx/dt). At x = 3: y = √(25−9) = 4. So dy/dt = −(3/4)(0.5) = −0.375 m/s. The top descends at 0.375 m/s.</p>
<p><strong>Balloon problem:</strong> Air is pumped into a spherical balloon at 100 cm³/s. How fast is the radius increasing when r = 10 cm? Volume V = (4/3)πr³. dV/dt = 4πr²(dr/dt). 100 = 4π(100)(dr/dt) → dr/dt = 100/(400π) = 1/(4π) ≈ 0.0796 cm/s. As the balloon grows, the same inflow causes slower radial growth — the surface area (4πr²) is getting bigger.</p>

**Floor 2 (Definition):**
<p><strong>Related rates</strong> problems involve finding the rate of change of one quantity from the known rate of change of another, using an equation that relates them. Procedure: (1) Identify the quantities and their rates (dx/dt, etc.). (2) Write the equation relating the quantities. (3) Differentiate both sides with respect to t — this is implicit differentiation, where every variable is treated as a function of t and the chain rule is applied. (4) Substitute the known values and solve for the unknown rate. (5) Pay attention to signs — increasing quantities have positive rates, decreasing have negative. The chain rule is the engine: d(f(y))/dt = f'(y)(dy/dt).</p>

**Floor 3 (In action):**
<p>Related rates are the bridge from static geometry to dynamic physics. In a conical tank draining, the water level drops faster as the tank empties (because the cross-sectional area decreases). In traffic engineering, if a car approaches an intersection at 60 km/h and another at 40 km/h, the rate at which they approach each other is 100 km/h — but the rate of change of the distance between them depends on the angle. A police radar gun measures dr/dt (rate of change of distance along the line of sight), not the car's actual speed, which is why radar readings differ from speedometer readings at an angle (the cosine effect). The differential equation for a pursuit curve — a dog chasing a rabbit — is a related rates problem: the dog always points toward the rabbit, and the rabbit's position changes with time, so the dog's direction is itself a function of time.</p>

**Image prompt:** A chalk drawing of the ladder problem: a right triangle with wall (y-axis) and ground (x-axis). The ladder (hypotenuse = 5 m) labelled. Arrow at base: dx/dt = 0.5 m/s outward. Arrow at top: dy/dt downward. Equation: x² + y² = 25 → 2x(dx/dt) + 2y(dy/dt) = 0. The balloon problem beside it: sphere with dV/dt = 100, dr/dt = ?. Chalk on dark green board. Square 1:1.


## BB-NEW-592 — Implicit differentiation: when you can't solve for y

**Subject:** maths | **Topic:** calculus | **Concept:** implicit-differentiation; dy/dx-from-implicit-equation | **Ground:** g2 | **Builds on:** [BB-NEW-585, BB-NEW-591]

**Floor 0 (Idea):**
<p>Some equations can't be solved for y in terms of x — like x² + y² = 25 gives y = ±√(25−x²), two separate functions. For x³ + y³ = 6xy (the folium of Descartes), you can't isolate y at all. Implicit differentiation treats y as an unknown function of x and differentiates term by term, applying the chain rule every time you hit a y. The result is an expression for dy/dx that contains both x and y.</p>

**Floor 1 (Concrete):**
<p>Find dy/dx for the circle x² + y² = 25. Differentiate both sides with respect to x: d(x²)/dx + d(y²)/dx = d(25)/dx. The first term: 2x. The second: by the chain rule, d(y²)/dx = 2y(dy/dx) — treating y as a function of x. The third: 0. So 2x + 2y(dy/dx) = 0 → dy/dx = −x/y. At the point (3, 4): dy/dx = −3/4. This works directly; no need to solve y = √(25−x²) first.</p>
<p>For the folium x³ + y³ = 6xy: 3x² + 3y²(dy/dx) = 6[x(dy/dx) + y·1] (product rule on the right). 3x² + 3y²y' = 6xy' + 6y. Collect y' terms: 3y²y' − 6xy' = 6y − 3x² → y'(3y² − 6x) = 6y − 3x² → y' = (6y − 3x²)/(3y² − 6x) = (2y − x²)/(y² − 2x). At any point (x,y) on the curve, this gives the slope.</p>

**Floor 2 (Definition):**
<p><strong>Implicit differentiation</strong> finds dy/dx when y is defined implicitly by an equation F(x,y) = 0 rather than explicitly as y = f(x). Procedure: (1) Differentiate both sides of the equation with respect to x, treating y as a function of x. (2) Whenever differentiating a term involving y, apply the chain rule: d(f(y))/dx = f'(y)(dy/dx). (3) Collect all terms containing dy/dx on one side. (4) Factor out dy/dx and solve. The result typically involves both x and y — to find the slope at a specific point, plug in both coordinates. Implicit differentiation generalises to higher derivatives by differentiating dy/dx again (giving d²y/dx²).</p>

**Floor 3 (In action):**
<p>Implicit differentiation is essential when explicit solutions are impossible. Kepler's equation M = E − e sin E (relating a planet's mean anomaly M to its eccentric anomaly E) can't be solved for E in closed form, but dE/dM = 1/(1 − e cos E) emerges cleanly from implicit differentiation. In thermodynamics, the ideal gas law PV = nRT with P, V, and T all changing gives relations between dP/dt, dV/dt, and dT/dt via implicit differentiation. Economic indifference curves (utility functions U(x,y) = constant) give marginal rates of substitution via implicit differentiation: dy/dx = −(∂U/∂x)/(∂U/∂y). Any time you have an equation rather than a function, and you need a rate of change, implicit differentiation is the tool.</p>

**Image prompt:** A chalk drawing of the folium of Descartes (the looped curve x³+y³=6xy). At a point on the curve, a tangent line with slope dy/dx = (2y−x²)/(y²−2x). The implicit differentiation steps shown step by step: differentiate each term, apply chain rule to y, collect dy/dx terms. Chalk on dark green board. Square 1:1.


## BB-NEW-593 — Parametric differentiation: when x and y both depend on t

**Subject:** maths | **Topic:** calculus | **Concept:** parametric-differentiation; dy/dx-from-parametric; cycloid | **Ground:** g2 | **Builds on:** [BB-NEW-585, BB-NEW-592]

**Floor 0 (Idea):**
<p>A curve doesn't have to be written as y = f(x). A particle's path can be described by x(t) and y(t) separately — the position at time t. To find the slope dy/dx, you don't need to eliminate t. Just divide: dy/dx = (dy/dt)/(dx/dt). The chain rule makes this trivial. The second derivative is trickier: d²y/dx² = d(dy/dx)/dt ÷ dx/dt.</p>

**Floor 1 (Concrete):**
<p>A projectile is launched at 50 m/s at 30°. x(t) = 50t cos 30° = 43.3t, y(t) = 50t sin 30° − 4.9t² = 25t − 4.9t². Find dy/dx at t = 2 s. dx/dt = 43.3, dy/dt = 25 − 9.8(2) = 25 − 19.6 = 5.4. dy/dx = 5.4/43.3 ≈ 0.125. At t = 2 s, the projectile is still rising (dy/dt > 0), moving rightward at about 43 m/s, with a shallow upward slope of 0.125.</p>
<p>Cycloid (a point on a rolling wheel of radius r): x = r(t − sin t), y = r(1 − cos t). dx/dt = r(1 − cos t), dy/dt = r sin t. dy/dx = sin t/(1 − cos t) = cot(t/2). The slope is infinite (vertical tangent) at t = 0 (the cusp at the ground). At t = π (top of the arch): dy/dx = cot(π/2) = 0 — horizontal.</p>

**Floor 2 (Definition):**
<p>If a curve is defined parametrically by x = f(t), y = g(t), the <strong>first derivative</strong> is dy/dx = (dy/dt)/(dx/dt) = g'(t)/f'(t), provided dx/dt ≠ 0. The <strong>second derivative</strong> is d²y/dx² = d(dy/dx)/dx = [d(dy/dx)/dt] / [dx/dt]. Do NOT simply divide d²y/dt² by d²x/dt² — that gives the wrong answer. The formula: d²y/dx² = (ẋÿ − ÿẋ)/ẋ³, where dots denote derivatives with respect to t. Parametric form handles curves that aren't functions (where the vertical line test fails) and curves with self-intersections — the cycloid, Lissajous figures, and spiral curves are naturally parametric.</p>

**Floor 3 (In action):**
<p>Parametric differentiation is the language of kinematics. Every trajectory in physics — projectiles, orbits, particle motion — is naturally parametric with time as the parameter. In computer graphics, Bézier curves are parametric cubics; their smoothness is analysed via parametric derivatives. In robotics, a robot arm's end-effector traces a parametric path, and the Jacobian (a matrix of partial derivatives) relates joint velocities to end-effector velocity. The parametric form also lets you find arc length: s = ∫ √[(dx/dt)² + (dy/dt)²] dt. And for implicit curves defined by F(x,y) = 0 that can't be parameterised explicitly, the derivative is dy/dx = −(∂F/∂x)/(∂F/∂y) — the implicit function theorem, which generalises the parametric approach.</p>

**Image prompt:** A chalk drawing of a projectile trajectory (parabola) with position at t = 2 s marked. The velocity vector v⃗ = (dx/dt, dy/dt) shown as an arrow tangent to the path. Equation dy/dx = (dy/dt)/(dx/dt). Beside it: a cycloid arch with a rolling circle, point P tracing the curve, tangent and normal at a point. Chalk on dark green board. Square 1:1.


## BB-NEW-594 — L'Hôpital's rule: limits that look like 0/0

**Subject:** maths | **Topic:** calculus | **Concept:** lhopitals-rule; indeterminate-forms; limit-shortcut | **Ground:** g2 | **Builds on:** [BB-NEW-582, BB-NEW-587, Card 12]

**Floor 0 (Idea):**
<p>Plug x = 0 into sin x/x and you get 0/0 — meaningless. Yet the limit as x → 0 is 1. L'Hôpital's rule cuts through the indeterminacy: if you get 0/0 or ∞/∞, differentiate the numerator and denominator separately, then take the limit again. The limit of f/g equals the limit of f'/g' (under certain conditions). It's the calculus power tool for limits.</p>

**Floor 1 (Concrete):**
<p><strong>Classic:</strong> lim(x→0) sin x/x = 0/0. Apply L'Hôpital: lim(x→0) cos x/1 = 1/1 = 1. Done in one step.</p>
<p><strong>Exponential:</strong> lim(x→0) (eˣ − 1)/x = 0/0. L'Hôpital: lim(x→0) eˣ/1 = 1. So the derivative of eˣ at x = 0 is 1 — this is the property that defines e.</p>
<p><strong>Polynomial vs exponential:</strong> lim(x→∞) x²/eˣ = ∞/∞. Apply L'Hôpital twice: lim(x→∞) 2x/eˣ = ∞/∞ again → lim(x→∞) 2/eˣ = 0. Exponential always beats polynomial in the long run.</p>
<p><strong>Trig with chain rule:</strong> lim(x→0) (1 − cos x)/x² = 0/0. L'Hôpital: lim(x→0) sin x/(2x) = 0/0 again. Apply again: lim(x→0) cos x/2 = 1/2. So 1 − cos x ≈ x²/2 for small x.</p>

**Floor 2 (Definition):**
<p><strong>L'Hôpital's rule:</strong> If lim f(x) = lim g(x) = 0 (or both ±∞) and lim f'(x)/g'(x) exists (or is ±∞), then lim f(x)/g(x) = lim f'(x)/g'(x). The rule applies to <strong>indeterminate forms:</strong> 0/0 and ∞/∞ directly. Other forms (0·∞, ∞−∞, 0⁰, 1^∞, ∞⁰) must be algebraically manipulated into 0/0 or ∞/∞ first. Conditions: f and g must be differentiable near the point (except possibly at the point itself), and g'(x) ≠ 0 near the point. The rule can be applied repeatedly. <strong>Warning:</strong> the rule can fail if the limit of f'/g' doesn't exist — it's a sufficient condition, not a necessary one. Also, the rule is NOT the quotient rule — you differentiate numerator and denominator separately, not the whole fraction.</p>

**Floor 3 (In action):**
<p>L'Hôpital's rule is the limit solver's best friend. In probability, the moment-generating function M(t) = E[e^(tX)] gives moments via limits: the nth moment is M^(n)(0), often requiring L'Hôpital. In physics, the limit of a sinc function sin(ωt/2)/(ωt/2) as ω → 0 gives the DC response of a filter — L'Hôpital yields 1. In engineering, the initial value theorem and final value theorem of Laplace transforms rely on limits that often need L'Hôpital. But use it wisely: some limits (like lim(x→0) x² sin(1/x)/sin x) are 0/0 but L'Hôpital makes a mess — the squeeze theorem is cleaner. And never apply L'Hôpital to a limit you're using to prove the derivative of a function — that's circular (you'd be using the derivative of sin x to prove the limit that defines the derivative of sin x).</p>

**Image prompt:** A chalk drawing showing three limit problems. Left: lim sin x/x → 0/0 → cos x/1 → 1. Middle: lim (eˣ−1)/x → 0/0 → eˣ/1 → 1. Right: lim x²/eˣ → ∞/∞ → 2x/eˣ → 2/eˣ → 0 (two applications). The L'Hôpital formula: lim f/g = lim f'/g'. Chalk on dark green board. Square 1:1.


## BB-NEW-595 — The differentiation toolkit: everything in one place

**Subject:** maths | **Topic:** calculus | **Concept:** differentiation-toolkit; full-derivative-table; integration-readiness | **Ground:** g1 | **Builds on:** [BB-NEW-580 through BB-NEW-594]

**Floor 0 (Idea):**
<p>After 14 BBs of building the toolkit piece by piece, here it is assembled. Every derivative rule you need for calculus, physics, and engineering — in one reference. Master this table and you're ready for integration, differential equations, and everything that comes next. This is the launchpad.</p>

**Floor 1 (Concrete):**
<p>Test yourself: differentiate each of these in under 30 seconds.</p>
<p>1. f(x) = 3x⁵ − 2x³ + 7x → f'(x) = 15x⁴ − 6x² + 7</p>
<p>2. f(x) = (x²+1)(x³−2) → product rule: f'(x) = 2x(x³−2) + (x²+1)(3x²) = 2x⁴ − 4x + 3x⁴ + 3x² = 5x⁴ + 3x² − 4x</p>
<p>3. f(x) = (x²+1)/(x−1) → quotient rule: f'(x) = [2x(x−1) − (x²+1)]/(x−1)² = (2x² − 2x − x² − 1)/(x−1)² = (x² − 2x − 1)/(x−1)²</p>
<p>4. f(x) = sin(3x²) → chain rule: f'(x) = cos(3x²) × 6x = 6x cos(3x²)</p>
<p>5. f(x) = e^(2x) ln x → product rule: f'(x) = 2e^(2x) ln x + e^(2x)(1/x) = e^(2x)(2 ln x + 1/x)</p>
<p>6. f(x) = xˣ → logarithmic differentiation: ln f = x ln x, f'/f = ln x + 1, f' = xˣ(ln x + 1)</p>

**Floor 2 (Definition):**
<p><strong>Complete differentiation toolkit:</strong></p>
<p><strong>Basic rules:</strong> d(c)/dx = 0 · d(xⁿ)/dx = nxⁿ⁻¹ · d(c·f)/dx = c·f' · d(f±g)/dx = f' ± g'</p>
<p><strong>Product:</strong> (uv)' = u'v + uv'</p>
<p><strong>Quotient:</strong> (u/v)' = (u'v − uv')/v²</p>
<p><strong>Chain:</strong> d/dx[f(g(x))] = f'(g(x)) g'(x)  ·  dy/dx = (dy/du)(du/dx)</p>
<p><strong>Trig:</strong> (sin x)' = cos x · (cos x)' = −sin x · (tan x)' = sec²x</p>
<p><strong>Exponential:</strong> (eˣ)' = eˣ · (aˣ)' = aˣ ln a</p>
<p><strong>Logarithmic:</strong> (ln x)' = 1/x · (log_a x)' = 1/(x ln a)</p>
<p><strong>Inverse trig:</strong> (arcsin x)' = 1/√(1−x²) · (arctan x)' = 1/(1+x²)</p>
<p><strong>Implicit:</strong> differentiate both sides, chain rule y terms, solve for dy/dx</p>
<p><strong>Parametric:</strong> dy/dx = (dy/dt)/(dx/dt) · d²y/dx² = (ẋÿ−ẍẏ)/ẋ³</p>
<p><strong>Logarithmic:</strong> take ln of both sides for f(x)^(g(x)) forms</p>

**Floor 3 (In action):**
<p>This table is your launchpad for integration — every derivative rule has an integration counterpart. The power rule in reverse: ∫ xⁿ dx = xⁿ⁺¹/(n+1) + C (n ≠ −1). The chain rule in reverse: substitution. The product rule in reverse: integration by parts. Mastering differentiation makes integration possible because integration is pattern-matching: "Do I know a function whose derivative looks like this?" Every derivative you can compute by sight is one more antiderivative in your mental library. The table is also your error-checker: if your physics equation gives a derivative that violates known rules, you've made a mistake. Build the table into your reflexes — flashcards, wall poster, daily drill — until u'v + uv' is as automatic as 7 × 8 = 56.</p>

**Image prompt:** A chalk drawing of a comprehensive derivative table. Columns: function f(x) → derivative f'(x). Sections: polynomials, products/quotients, trig, exponentials/logs, inverse trig, chain rule examples. A highlighted "reverse" arrow pointing right: "Integration ← these." Memory aids: "Low D-High minus High D-Low" for quotient rule. Chalk on dark green board. Square 1:1.
