# Thompson's Calculus Made Easy → Qubix BBs — Integration (15 BBs)

Below are 15 BBs on integration, continuing the Thompson tradition. "Integration is simply the reverse of differentiation. If differentiating x² gives 2x, then integrating 2x must give x² — plus a constant, because constants vanish under differentiation." Every technique has a mirror in the differentiation toolkit (BB 580–595). The approach: antidifferentiation first, area second, mastery through pattern recognition.

**Already covered (don't duplicate):** BB-NEW-580–595 (complete differentiation), BB-NEW-130–144 (exponents/logs/e), BB-NEW-180–195 (trigonometry including identities), BB-NEW-110–122 (foundations/algebra), Cards 12–15 (limits intro).

**What's new here:** The complete integration syllabus — indefinite and definite integrals, fundamental theorem of calculus, power rule, u-substitution, trig integrals, exponential/log integrals, integration by parts, partial fractions, trigonometric substitution, area between curves, volumes of revolution, and a synthesis toolkit.

**Thompson's voice:** "Integration is nothing but the inverse of differentiation. It's like learning to read backwards. Every derivative you can compute forwards, you can also integrate backwards — if you recognise the pattern. The art of integration is pattern-matching: 'Do I know a function whose derivative looks like this?'"

---

## BB-NEW-600 — What integration is: the reverse of differentiation

**Subject:** maths | **Topic:** calculus | **Concept:** integration-as-antidifferentiation; indefinite-integral; plus-C | **Ground:** g0 | **Builds on:** [BB-NEW-580, BB-NEW-582]

**Floor 0 (Idea):**
<p>Differentiation asks: "Given y, what is dy/dx?" Integration asks the opposite: "Given dy/dx, what was y?" The two operations undo each other. Thompson: "Integration is simply the reverse process to differentiation. Just as division undoes multiplication, integration undoes differentiation. The result is the same function you started with — plus an unknown constant."</p>

**Floor 1 (Concrete):**
<p>You know d(x³)/dx = 3x². Therefore ∫ 3x² dx = x³ + C. The +C is the <strong>constant of integration</strong> — any constant differentiates to zero, so x³ + 5, x³ − 100, and x³ + π all have derivative 3x². Without additional information (an initial condition), the constant is undetermined.</p>
<p>Test: differentiate x³ + C → 3x² + 0 = 3x². The integral of 3x² is every function whose derivative is 3x² — a family of curves, all parallel (same shape, different vertical shifts). Notation: ∫ f(x) dx reads "the integral of f(x) with respect to x." The dx is not decorative — it specifies the variable of integration, inherited from dy/dx notation.</p>

**Floor 2 (Definition):**
<p>The <strong>indefinite integral</strong> (antiderivative) of f(x) is any function F(x) such that F'(x) = f(x). We write ∫ f(x) dx = F(x) + C. The constant C represents the entire family of antiderivatives. Integration is <strong>not</strong> a unique operation — it produces a family. The <strong>definite integral</strong> ∫[a,b] f(x) dx is a number — the signed area under the curve from a to b — and does not involve +C. The link between them is the Fundamental Theorem of Calculus (BB 603). Key insight: every differentiation rule is an integration rule in reverse. d(sin x)/dx = cos x → ∫ cos x dx = sin x + C.</p>

**Floor 3 (In action):**
<p>Integration is the engine behind every accumulation problem. If you know velocity v(t), position is s(t) = ∫ v(t) dt + s₀. If you know acceleration a(t), velocity is v(t) = ∫ a(t) dt + v₀. If you know the rate of water flow into a tank, the total volume accumulated is the integral of the flow rate. In economics, total cost is the integral of marginal cost. In probability, the cumulative distribution function is the integral of the probability density function. The +C is not a technicality — it's the initial condition, the starting value, the constant that makes the mathematics match reality. Without it, every integral would be infinitely ambiguous.</p>

**Image prompt:** A chalk drawing of a curve y = 3x² and three antiderivative curves above it: y = x³ − 2, y = x³, y = x³ + 3 — all parallel, same shape, shifted vertically. Arrows showing differentiation (↓) and integration (↑). The +C labelled as "unknown constant." Notation: ∫ 3x² dx = x³ + C. Chalk on dark green board. Square 1:1.


## BB-NEW-601 — The power rule for integration: reversing xⁿ

**Subject:** maths | **Topic:** calculus | **Concept:** integration-power-rule; polynomial-integration; sum-rule | **Ground:** g0 | **Builds on:** [BB-NEW-600, BB-NEW-582]

**Floor 0 (Idea):**
<p>Differentiation's power rule: multiply by the exponent, reduce exponent by 1. Integration reverses it: increase exponent by 1, divide by the new exponent. ∫ xⁿ dx = xⁿ⁺¹/(n+1) + C. This works for every n except n = −1 — where the rule gives division by zero. That one exception is the natural logarithm.</p>

**Floor 1 (Concrete):**
<p>Integrate each of these by pattern recognition:</p>
<p>∫ x⁴ dx = x⁵/5 + C (check: d(x⁵/5)/dx = 5x⁴/5 = x⁴ ✓)</p>
<p>∫ x dx = x²/2 + C (check: d(x²/2)/dx = x ✓)</p>
<p>∫ 3 dx = ∫ 3x⁰ dx = 3x¹/1 + C = 3x + C (check: d(3x)/dx = 3 ✓)</p>
<p>∫ √x dx = ∫ x^(1/2) dx = x^(3/2)/(3/2) + C = (2/3)x^(3/2) + C</p>
<p>∫ 1/x² dx = ∫ x⁻² dx = x⁻¹/(−1) + C = −1/x + C</p>
<p>Sum rule: ∫ (5x³ − 2x² + 7x − 4) dx = 5x⁴/4 − 2x³/3 + 7x²/2 − 4x + C. One constant C covers the whole sum.</p>
<p>The exception: ∫ x⁻¹ dx = ∫ (1/x) dx = ln|x| + C. The absolute value ensures the domain includes negative x.</p>

**Floor 2 (Definition):**
<p><strong>Integration power rule:</strong> ∫ xⁿ dx = xⁿ⁺¹/(n+1) + C, for n ≠ −1. For n = −1: ∫ x⁻¹ dx = ln|x| + C. This rule, combined with the sum rule ∫(f+g) dx = ∫f dx + ∫g dx and the constant multiple rule ∫c·f dx = c ∫f dx, handles every polynomial and any sum of power terms. The rule works for all real n: positive, negative, fractional. <strong>Always check by differentiating your answer.</strong> If you get back the original integrand, the integration is correct. The +C must be included for indefinite integrals; omitting it is a technical error (though it cancels in definite integrals).</p>

**Floor 3 (In action):**
<p>The power rule is the workhorse. In kinematics: a = −9.8 → v = ∫ −9.8 dt = −9.8t + v₀ → s = ∫ (−9.8t + v₀) dt = −4.9t² + v₀t + s₀. Two integrations, two constants (v₀ and s₀), both determined by initial conditions. In economics: marginal cost MC = 3q² − 12q + 30 → total cost C = q³ − 6q² + 30q + FC (fixed cost, the +C determined by C(0)). In any field where you measure a rate and need the accumulated total — water flow, drug concentration, population growth rate — the power rule converts rate to quantity. The single exception 1/x → ln|x| is why the natural logarithm is unavoidable: it's the one function whose derivative is a simple power that the power rule cannot integrate.</p>

**Image prompt:** A chalk drawing of a table showing the power rule in both directions. Left column: differentiation (d/dx). Right column: integration (∫ dx). Entries: x⁵ ↔ x⁶/6, x³ ↔ x⁴/4, x¹ ↔ x²/2, x⁻² ↔ −x⁻¹, x^(1/2) ↔ (2/3)x^(3/2). The gap at n = −1 highlighted with an arrow to ln|x|. The mantra: "Add one to the exponent, divide by the new exponent." Chalk on dark green board. Square 1:1.


## BB-NEW-602 — The definite integral: area under a curve

**Subject:** maths | **Topic:** calculus | **Concept:** definite-integral; Riemann-sum; signed-area; limits-of-integration | **Ground:** g0 | **Builds on:** [BB-NEW-600, BB-NEW-601]

**Floor 0 (Idea):**
<p>The definite integral ∫[a,b] f(x) dx is a number — the net area between the curve and the x-axis from x = a to x = b. Approximate it by thin rectangles (Riemann sum); make them infinitely thin, and the sum converges to the exact area. This is what integration was invented for.</p>

**Floor 1 (Concrete):**
<p>Compute ∫[0,3] x² dx — the area under y = x² from x = 0 to x = 3.</p>
<p><strong>Rectangle approximation:</strong> Divide [0,3] into n equal subintervals of width Δx = 3/n. Right-endpoint heights: f(xᵢ) = (3i/n)² = 9i²/n². Sum: Σ(9i²/n²)(3/n) = 27/n³ Σi². Formula: Σi² = n(n+1)(2n+1)/6. Sum = (27/n³) × [n(n+1)(2n+1)/6] = (27/6) × [(n+1)(2n+1)/n²] = (9/2) × (1 + 1/n)(2 + 1/n). As n → ∞: (9/2) × 1 × 2 = 9. The exact area is 9.</p>
<p><strong>Using antiderivative:</strong> F(x) = x³/3. F(3) − F(0) = 27/3 − 0 = 9. Same answer, trivial effort. The Fundamental Theorem makes this possible.</p>

**Floor 2 (Definition):**
<p>The <strong>definite integral</strong> ∫[a,b] f(x) dx is defined as the limit of Riemann sums: lim(n→∞) Σ f(xᵢ*) Δx, where Δx = (b−a)/n and xᵢ* is a sample point in the i-th subinterval. It represents the <strong>signed area</strong> — area above the x-axis counts positive, area below counts negative. <strong>Properties:</strong> ∫[a,b] f = −∫[b,a] f (reversing limits flips sign). ∫[a,a] f = 0. ∫[a,b] f + ∫[b,c] f = ∫[a,c] f (additivity). If f(x) ≤ g(x) on [a,b], then ∫f ≤ ∫g. The Mean Value Theorem for Integrals: there exists c in [a,b] such that f(c) = (1/(b−a))∫[a,b] f — the average value of f.</p>

**Floor 3 (In action):**
<p>The definite integral answers every "how much in total?" question where the rate varies. Total distance travelled = ∫|v(t)| dt (use absolute value so backward motion doesn't subtract). Total revenue from time 0 to T = ∫ R'(t) dt. Total charge passing through a wire = ∫ I(t) dt. Probability that a measurement falls between a and b = ∫[a,b] f(x) dx (the area under the probability density). The definite integral is also the foundation of every averaging operation: average value of f on [a,b] = (1/(b−a))∫f dx. The mean, the centroid, the root-mean-square — all are definite integrals divided by length or area.</p>

**Image prompt:** A chalk drawing of y = x² with the region under the curve from 0 to 3 shaded. Three panels showing increasing n: n = 4 (chunky rectangles), n = 10 (finer), n → ∞ (perfect curve). The Riemann sum formula Σ f(xᵢ)Δx. The exact answer via antiderivative: ∫₀³ x² dx = [x³/3]₀³ = 9. Chalk on dark green board. Square 1:1.


## BB-NEW-603 — The Fundamental Theorem of Calculus: the bridge

**Subject:** maths | **Topic:** calculus | **Concept:** fundamental-theorem-of-calculus; FTC; differentiation-and-integration-inverse | **Ground:** g1 | **Builds on:** [BB-NEW-600, BB-NEW-602]

**Floor 0 (Idea):**
<p>The two seemingly unrelated problems — finding slopes (differentiation) and finding areas (integration) — turn out to be exact inverses. The Fundamental Theorem of Calculus is the greatest unifying insight in mathematics: differentiation and integration undo each other. Evaluate a definite integral by finding any antiderivative and subtracting at the endpoints. That's it.</p>

**Floor 1 (Concrete):**
<p><strong>FTC Part 2 (Evaluation Theorem):</strong> To compute ∫[a,b] f(x) dx: find any function F such that F'(x) = f(x). Then the integral = F(b) − F(a).</p>
<p>Example: ∫[1,4] (2x + 3) dx. Antiderivative F(x) = x² + 3x (check: F' = 2x + 3). F(4) = 16 + 12 = 28, F(1) = 1 + 3 = 4. Integral = 28 − 4 = 24.</p>
<p><strong>FTC Part 1 (Differentiation of the integral):</strong> Define g(x) = ∫[a,x] f(t) dt. Then g'(x) = f(x). The derivative of the accumulation function is the original function. Example: if g(x) = ∫[0,x] cos(t²) dt, then g'(x) = cos(x²) — no need to actually compute the impossible integral. This means every continuous function has an antiderivative — the integral function itself.</p>

**Floor 2 (Definition):**
<p>The <strong>Fundamental Theorem of Calculus</strong> has two parts:</p>
<p><strong>FTC 1:</strong> If f is continuous on [a,b] and F(x) = ∫[a,x] f(t) dt, then F'(x) = f(x). Integration followed by differentiation returns the original.</p>
<p><strong>FTC 2:</strong> If F is any antiderivative of f on [a,b], then ∫[a,b] f(x) dx = F(b) − F(a) = [F(x)]ₐᵇ. The definite integral is the net change in the antiderivative.</p>
<p>Together, they establish that differentiation and integration are inverse operations — like multiplication and division, or squaring and square-rooting. The notation [F(x)]ₐᵇ means F(b) − F(a). The FTC is not obvious; it's a profound discovery that took Newton and Leibniz (and their predecessors like Barrow) to uncover.</p>

**Floor 3 (In action):**
<p>The FTC is why calculus works. Without it, every definite integral would require a limit of Riemann sums — sometimes possible, often impossible. With it, you just find an antiderivative. The FTC also means that accumulation functions — like total distance from a speedometer, or total rainfall from a rain gauge — are antiderivatives of the rate functions. The Net Change Theorem: ∫[a,b] F'(x) dx = F(b) − F(a) — the integral of a rate of change gives the total change. This applies to population change, energy change, money flow — any quantity that accumulates. The FTC is the reason calculus is a unified subject, not two separate ones. Before Newton and Leibniz, area problems and tangent problems were separate branches of geometry. After, they were the same subject looked at from opposite directions.</p>

**Image prompt:** A chalk drawing showing the FTC bridge. Left side: a curve f(x) with shaded area from a to b. Right side: the antiderivative curve F(x) with points F(a) and F(b) marked. The bridge equation: ∫ₐᵇ f(x) dx = F(b) − F(a). A second diagram shows FTC 1: g(x) = ∫ₐˣ f(t) dt, with g'(x) = f(x). Chalk on dark green board. Square 1:1.


## BB-NEW-604 — Integration by substitution: the reverse chain rule

**Subject:** maths | **Topic:** calculus | **Concept:** u-substitution; reverse-chain-rule; change-of-variable | **Ground:** g1 | **Builds on:** [BB-NEW-601, BB-NEW-585]

**Floor 0 (Idea):**
<p>The chain rule for differentiation: d/dx[f(g(x))] = f'(g(x)) g'(x). Run it backward: if you spot a function and its derivative multiplied together, substitute u = g(x), and the integral collapses to ∫ f'(u) du. This is u-substitution — the single most-used integration technique.</p>

**Floor 1 (Concrete):**
<p><strong>∫ 2x cos(x²) dx.</strong> Let u = x², so du/dx = 2x → du = 2x dx. The integral becomes ∫ cos(u) du = sin(u) + C = sin(x²) + C. Check: d(sin(x²))/dx = cos(x²) × 2x = 2x cos(x²) ✓.</p>
<p><strong>∫ (3x² + 2)⁴ 6x dx.</strong> Let u = 3x² + 2, du = 6x dx. Integral = ∫ u⁴ du = u⁵/5 + C = (3x² + 2)⁵/5 + C.</p>
<p><strong>∫ sin³x cos x dx.</strong> Let u = sin x, du = cos x dx. Integral = ∫ u³ du = u⁴/4 + C = sin⁴x/4 + C.</p>
<p><strong>Definite integral version:</strong> ∫[0,1] 2x e^(x²) dx. Let u = x², du = 2x dx. When x = 0, u = 0. When x = 1, u = 1. Integral = ∫[0,1] e^u du = [e^u]₀¹ = e − 1. The limits of integration change with the substitution — no need to substitute back.</p>

**Floor 2 (Definition):**
<p><strong>Integration by substitution (u-substitution):</strong> ∫ f(g(x)) g'(x) dx = ∫ f(u) du, where u = g(x) and du = g'(x) dx. Procedure: (1) Choose u = some inner function g(x). (2) Compute du = g'(x) dx. (3) Rewrite the entire integral in terms of u (including dx). (4) Integrate with respect to u. (5) Substitute back x (indefinite) or change limits (definite). The art is picking the right u — look for an "inner function" whose derivative appears as a factor. Common patterns: linear inside a power: ∫ (ax+b)ⁿ dx → u = ax+b; exponential/trig of a function: ∫ f'(x) e^(f(x)) dx → u = f(x); rationalising: ∫ f'(x)/f(x) dx = ln|f(x)| + C.</p>

**Floor 3 (In action):**
<p>Substitution is the integrator's Swiss Army knife. In physics: ∫ v(t) dt where v(t) = (3t+2)⁻² → u = 3t+2, becomes simple. In probability: the Gaussian integral ∫ e^(−x²) dx resists elementary methods, but ∫ x e^(−x²) dx yields immediately to u = −x². In differential equations: separation of variables is essentially substitution — dy/dx = f(x)g(y) → ∫ dy/g(y) = ∫ f(x) dx, solved by u = g(y) on the left. The skill is pattern recognition: scanning the integrand for a function and its derivative. With practice, you'll see u-substitutions without writing them — the integral morphs in your mind like a chess move seen three steps ahead.</p>

**Image prompt:** A chalk drawing of the substitution process. Left: the original integral ∫ 2x cos(x²) dx with u = x² and du = 2x dx annotated. Right: the transformed integral ∫ cos u du = sin u + C = sin(x²) + C. A second example with definite limits: ∫₀¹ 2x e^(x²) dx, showing limits changing from [0,1] to [0,1]. Chalk on dark green board. Square 1:1.


## BB-NEW-605 — Integrating trigonometric functions

**Subject:** maths | **Topic:** calculus | **Concept:** trig-integrals; sine-cosine-tangent-integration; trigonometric-identities | **Ground:** g1 | **Builds on:** [BB-NEW-586, BB-NEW-604]

**Floor 0 (Idea):**
<p>Every trig derivative is a trig integral in reverse: ∫ cos x dx = sin x + C, ∫ sin x dx = −cos x + C, ∫ sec²x dx = tan x + C. Powers and products of trig functions require clever use of identities to reshape them into forms where substitution works.</p>

**Floor 1 (Concrete):**
<p><strong>Basic table:</strong> ∫ sin x dx = −cos x + C, ∫ cos x dx = sin x + C, ∫ sec²x dx = tan x + C, ∫ sec x tan x dx = sec x + C, ∫ cosec²x dx = −cot x + C, ∫ cosec x cot x dx = −cosec x + C.</p>
<p><strong>Powers — using identities:</strong></p>
<p>∫ sin²x dx: use cos 2x = 1 − 2sin²x → sin²x = (1 − cos 2x)/2. ∫ sin²x dx = ∫ (1/2 − cos 2x/2) dx = x/2 − sin 2x/4 + C.</p>
<p>∫ cos²x dx: cos²x = (1 + cos 2x)/2 → x/2 + sin 2x/4 + C.</p>
<p><strong>Products — using substitution:</strong></p>
<p>∫ sin³x cos x dx: u = sin x, du = cos x dx → ∫ u³ du = sin⁴x/4 + C.</p>
<p>∫ tan x dx = ∫ sin x/cos x dx: u = cos x, du = −sin x dx → −∫ du/u = −ln|cos x| + C = ln|sec x| + C.</p>
<p>∫ sec x dx = ln|sec x + tan x| + C (a classic — verify by differentiating).</p>

**Floor 2 (Definition):**
<p><strong>Strategy for trig integrals:</strong></p>
<p>1. <strong>Basic forms:</strong> directly from the derivative table — no work needed.</p>
<p>2. <strong>Odd powers:</strong> save one factor for du, convert the rest. For ∫ sinⁿx cosᵐx dx: if m is odd, u = sin x; if n is odd, u = cos x.</p>
<p>3. <strong>Even powers:</strong> use power-reduction identities: sin²x = (1−cos 2x)/2, cos²x = (1+cos 2x)/2. Repeat as needed.</p>
<p>4. <strong>Products of different arguments:</strong> use product-to-sum formulas: sin mx cos nx = ½[sin(m+n)x + sin(m−n)x].</p>
<p>5. <strong>tanᵐx secⁿx:</strong> if n is even, u = tan x, sec²x dx = du; if m is odd, u = sec x, sec x tan x dx = du.</p>
<p>Pattern recognition is everything — scan for derivatives of trig functions hiding in the integrand.</p>

**Floor 3 (In action):**
<p>Trig integrals are the computational backbone of Fourier analysis. Every periodic signal — sound, radio, EEG, stock market cycles — decomposes into sines and cosines, and the Fourier coefficients are integrals like ∫ f(t) sin(nωt) dt. In AC circuit analysis, average power is (1/T)∫ V(t)I(t) dt over a period, where V = V₀ sin ωt and I = I₀ sin(ωt+φ) — a trig integral. The RMS value of a sine wave is √[(1/T)∫ V₀² sin²ωt dt] = V₀/√2 — another trig integral. In quantum mechanics, transition probabilities are integrals of products of wavefunctions, often sines and cosines. The identities that look like "tricks" in a textbook are the daily toolkit of every electrical engineer and physicist.</p>

**Image prompt:** A chalk drawing of the trig integration table. Six standard integrals: sin → −cos, cos → sin, sec² → tan, sec tan → sec, cosec² → −cot, cosec cot → −cosec. Beside it: the strategy for odd/even powers with arrows showing substitution choices. An example: ∫ sin³x cos x dx with u = sin x. Chalk on dark green board. Square 1:1.


## BB-NEW-606 — Integrating exponentials and logarithms

**Subject:** maths | **Topic:** calculus | **Concept:** exponential-integrals; logarithmic-integrals; a^x-integration | **Ground:** g1 | **Builds on:** [BB-NEW-587, BB-NEW-604]

**Floor 0 (Idea):**
<p>Exponentials are the friendliest functions to integrate — they're nearly their own antiderivative. ∫ eˣ dx = eˣ + C. For aˣ, divide by ln a: ∫ aˣ dx = aˣ/ln a + C. The logarithm, which broke the power rule, is integrated by a trick: ∫ ln x dx = x ln x − x + C — a memorable result from integration by parts.</p>

**Floor 1 (Concrete):**
<p><strong>Direct integrals:</strong></p>
<p>∫ eˣ dx = eˣ + C (check: d(eˣ)/dx = eˣ ✓)</p>
<p>∫ e^(kx) dx = e^(kx)/k + C (by u = kx, du = k dx → ∫ e^u (du/k) = e^u/k)</p>
<p>∫ 2ˣ dx = 2ˣ/ln 2 + C (since aˣ = e^(x ln a), ∫ e^(x ln a) dx = e^(x ln a)/ln a = aˣ/ln a)</p>
<p>∫ 1/x dx = ln|x| + C (x ≠ 0)</p>
<p><strong>With substitution:</strong></p>
<p>∫ x e^(x²) dx: u = x², du = 2x dx → (1/2)∫ e^u du = e^(x²)/2 + C.</p>
<p>∫ eˣ cos(eˣ) dx: u = eˣ, du = eˣ dx → ∫ cos u du = sin(eˣ) + C.</p>
<p>∫ (2x+3)/(x²+3x) dx: notice numerator = derivative of denominator. u = x²+3x → ln|x²+3x| + C. The pattern ∫ f'(x)/f(x) dx = ln|f(x)| + C is the most important logarithmic integral.</p>

**Floor 2 (Definition):**
<p><strong>Exponential and logarithmic integrals:</strong></p>
<p>• ∫ eˣ dx = eˣ + C</p>
<p>• ∫ e^(kx) dx = e^(kx)/k + C</p>
<p>• ∫ aˣ dx = aˣ/ln a + C (a > 0, a ≠ 1)</p>
<p>• ∫ 1/x dx = ln|x| + C</p>
<p>• ∫ f'(x)/f(x) dx = ln|f(x)| + C (the "log rule" — incredibly useful)</p>
<p>• ∫ ln x dx = x ln x − x + C (derived via integration by parts in BB 608)</p>
<p>For definite integrals: ∫[0,∞) e^(−kx) dx = 1/k (for k > 0) — the total area under exponential decay is finite. The Gaussian integral ∫[−∞,∞] e^(−x²) dx = √π — cannot be done with elementary antiderivatives, requires a polar coordinates trick.</p>

**Floor 3 (In action):**
<p>Exponential integrals model everything that grows or decays proportionally to its current size. Radioactive decay: N(t) = N₀ − λ∫₀ᵗ N(s) ds → N = N₀e^(−λt). Capacitor discharge: V(t) = V₀e^(−t/RC), with the total energy dissipated = ∫₀^∞ (V²/R) dt = ½CV₀² — matching the stored energy. In probability, the exponential distribution f(x) = λe^(−λx) has CDF F(x) = 1 − e^(−λx) — an integral. The log integral ∫ f'/f appears in every separable differential equation where the rate depends on the quantity: dy/dt = ky → ∫ dy/y = ∫ k dt → ln|y| = kt + C → y = Ce^(kt). The simplicity of exponential integration is why e is the "natural" base — it makes the mathematics vanish.</p>

**Image prompt:** A chalk drawing of the exponential family. eˣ, e^(2x), e^(−x) curves with their integrals labelled beneath. The key formula ∫ e^(kx) dx = e^(kx)/k + C. Beside it: the log rule ∫ f'/f dx = ln|f| + C with an example (2x+3)/(x²+3x) → ln|x²+3x|. Chalk on dark green board. Square 1:1.


## BB-NEW-607 — Area between curves: subtracting one region from another

**Subject:** maths | **Topic:** calculus | **Concept:** area-between-curves; top-minus-bottom; intersection-points | **Ground:** g1 | **Builds on:** [BB-NEW-602, BB-NEW-603]

**Floor 0 (Idea):**
<p>Finding the area between two curves is conceptually simple: area = ∫ [top curve − bottom curve] dx. The challenge is identifying which is top and which is bottom, finding the intersection points (integration limits), and handling cases where they cross.</p>

**Floor 1 (Concrete):**
<p>Find the area between y = x² and y = x + 2. Step 1 — find intersections: x² = x + 2 → x² − x − 2 = 0 → (x−2)(x+1) = 0 → x = −1, 2. Step 2 — which is on top? Test x = 0: 0² = 0, 0+2 = 2. The line is above the parabola. Area = ∫[−1,2] [(x+2) − x²] dx = ∫[−1,2] (x+2−x²) dx = [x²/2 + 2x − x³/3]₋₁² = (2+4−8/3) − (1/2−2+1/3) = (6−8/3) − (−3/2+1/3) = (10/3) − (−7/6) = 10/3 + 7/6 = 20/6 + 7/6 = 27/6 = 4.5 square units.</p>
<p>When curves cross: area between y = x³ and y = x from −1 to 1. They cross at x = −1, 0, 1. Split: area = ∫[−1,0] (x³ − x) dx + ∫[0,1] (x − x³) dx. First: [x⁴/4 − x²/2]₋₁⁰ = (0) − (1/4−1/2) = −(−1/4) = 1/4. Second: [x²/2 − x⁴/4]₀¹ = (1/2−1/4) − 0 = 1/4. Total = 1/2.</p>

**Floor 2 (Definition):**
<p>The <strong>area between two curves</strong> y = f(x) and y = g(x) from x = a to x = b, where f(x) ≥ g(x) on [a,b], is A = ∫[a,b] [f(x) − g(x)] dx. If the curves cross, split the interval at each crossing point and use |f − g| (top minus bottom on each subinterval). For curves given as x = f(y) (functions of y), the formula becomes A = ∫[c,d] [f(y) − g(y)] dy (right minus left). Steps: (1) find intersection points by solving f(x) = g(x); (2) determine which is larger on each subinterval (test a point); (3) integrate the difference.</p>

**Floor 3 (In action):**
<p>Area between curves is the geometric interpretation of many economic and physical measures. Consumer surplus is the area between the demand curve and the price line. Producer surplus is the area between the price line and the supply curve. The Gini coefficient (inequality measure) is twice the area between the Lorenz curve and the line of perfect equality. In physics, work done by a gas is the area between the PV curve and the volume axis on a PV diagram — and the work done in a cycle is the area enclosed by the loop. In probability, the total variation distance between two distributions is half the area between their density curves. The formula is always the same: subtract and integrate.</p>

**Image prompt:** A chalk drawing of two curves y = x² (parabola) and y = x+2 (line) with the region between them from x=−1 to x=2 shaded. The intersection points labelled. The integral expression ∫₋₁² [(x+2) − x²] dx = 4.5. A second smaller diagram shows curves that cross, with the split-interval approach. Chalk on dark green board. Square 1:1.


## BB-NEW-608 — Integration by parts: the reverse product rule

**Subject:** maths | **Topic:** calculus | **Concept:** integration-by-parts; reverse-product-rule; LIATE | **Ground:** g2 | **Builds on:** [BB-NEW-583, BB-NEW-604]

**Floor 0 (Idea):**
<p>The product rule for differentiation: d(uv)/dx = u'v + uv'. Rearranged: uv' = d(uv)/dx − u'v. Integrate both sides: ∫ uv' dx = uv − ∫ u'v dx. This is integration by parts — the second most-used technique after substitution. It trades one integral for (hopefully) a simpler one.</p>

**Floor 1 (Concrete):**
<p><strong>∫ x eˣ dx.</strong> Choose u = x (gets simpler when differentiated — u' = 1), dv = eˣ dx (easy to integrate — v = eˣ). Formula: ∫ u dv = uv − ∫ v du. ∫ x eˣ dx = x eˣ − ∫ eˣ·1 dx = x eˣ − eˣ + C = eˣ(x − 1) + C. Check: d(eˣ(x−1))/dx = eˣ(x−1) + eˣ = x eˣ ✓.</p>
<p><strong>∫ ln x dx.</strong> u = ln x, dv = dx → du = dx/x, v = x. ∫ ln x dx = x ln x − ∫ x·(dx/x) = x ln x − ∫ dx = x ln x − x + C. This is the classic result — one of the few ways to integrate ln x.</p>
<p><strong>∫ x sin x dx.</strong> u = x, dv = sin x dx → du = dx, v = −cos x. ∫ x sin x dx = −x cos x − ∫ (−cos x) dx = −x cos x + sin x + C.</p>

**Floor 2 (Definition):**
<p><strong>Integration by parts:</strong> ∫ u dv = uv − ∫ v du. Equivalent form: ∫ f(x)g'(x) dx = f(x)g(x) − ∫ f'(x)g(x) dx. Procedure: (1) Identify u (something that simplifies when differentiated) and dv (something easy to integrate). (2) Compute du = u' dx and v = ∫ dv. (3) Apply the formula. (4) Evaluate the new integral — it should be simpler.</p>
<p><strong>The LIATE rule</strong> for choosing u (in order of priority): <strong>L</strong>ogarithmic, <strong>I</strong>nverse trig, <strong>A</strong>lgebraic (polynomials), <strong>T</strong>rigonometric, <strong>E</strong>xponential. Choose u from the higher-priority category; dv gets the rest. The rule works because logs and inverse trig simplify dramatically when differentiated, while exponentials and trig barely change.</p>

**Floor 3 (In action):**
<p>Integration by parts is the engine behind every integral involving a product of fundamentally different function types. ∫ xⁿ eˣ dx, ∫ xⁿ sin x dx, ∫ eˣ cos x dx (apply twice and solve for the integral), ∫ arctan x dx (u = arctan x, dv = dx). In physics, expectation values in quantum mechanics are ∫ ψ* Â ψ dV, often requiring parts. In Laplace transforms, ∫ f(t) e^(−st) dt is the definition, and parts generates the transform rules. The technique of "tabular integration" (repeated parts for ∫ xⁿ eˣ dx) is a time-saver when the polynomial degree is high. The key insight: parts doesn't eliminate the integral — it trades it. Your job is to make the trade favourable.</p>

**Image prompt:** A chalk drawing of the integration by parts formula ∫ u dv = uv − ∫ v du. Three examples worked out side by side: ∫ x eˣ dx → eˣ(x−1), ∫ ln x dx → x ln x − x, ∫ x sin x dx → −x cos x + sin x. The LIATE priority list shown as a column. Chalk on dark green board. Square 1:1.


## BB-NEW-609 — Partial fractions: integrating rational functions

**Subject:** maths | **Topic:** calculus | **Concept:** partial-fractions; rational-function-integration; algebraic-decomposition | **Ground:** g2 | **Builds on:** [BB-NEW-601, BB-NEW-118, BB-NEW-121]

**Floor 0 (Idea):**
<p>A rational function — one polynomial divided by another — looks intimidating to integrate. But almost every proper rational function can be decomposed into simpler fractions with linear or quadratic denominators. Each piece integrates to a log or an arctangent. Partial fractions turn algebra into the key that unlocks the integral.</p>

**Floor 1 (Concrete):**
<p><strong>Case 1 — Distinct linear factors:</strong> ∫ (x+3)/[(x−1)(x+2)] dx. Decompose: (x+3)/[(x−1)(x+2)] = A/(x−1) + B/(x+2). Multiply through: x+3 = A(x+2) + B(x−1). At x = 1: 4 = 3A → A = 4/3. At x = −2: 1 = −3B → B = −1/3. Integral = ∫ [4/3(x−1) − 1/3(x+2)] dx = (4/3)ln|x−1| − (1/3)ln|x+2| + C.</p>
<p><strong>Case 2 — Repeated linear factor:</strong> ∫ (2x+1)/(x−1)² dx. Decompose: A/(x−1) + B/(x−1)². 2x+1 = A(x−1) + B. Expand: 2x+1 = Ax − A + B → A = 2, −A+B = 1 → B = 3. Integral = ∫ [2/(x−1) + 3/(x−1)²] dx = 2ln|x−1| − 3/(x−1) + C.</p>
<p><strong>Case 3 — Irreducible quadratic:</strong> ∫ 1/(x²+1) dx = arctan x + C. ∫ (2x+1)/(x²+2x+5) dx — complete the square: x²+2x+5 = (x+1)²+4. Substitution u = x+1 → integral splits into a log and an arctan term.</p>

**Floor 2 (Definition):**
<p><strong>Partial fraction decomposition</strong> rewrites a rational function P(x)/Q(x) (deg P < deg Q) as a sum of simpler fractions. Procedure: (1) Factor Q(x) completely into linear and irreducible quadratic factors. (2) For each linear factor (ax+b)ⁿ, include terms A₁/(ax+b) + A₂/(ax+b)² + ... + Aₙ/(ax+b)ⁿ. (3) For each irreducible quadratic (ax²+bx+c)ᵐ, include (B₁x+C₁)/(ax²+bx+c) + ... + (Bₘx+Cₘ)/(ax²+bx+c)ᵐ. (4) Solve for the unknown constants by multiplying through by Q(x) and equating coefficients or substituting strategic x-values. (5) Integrate each term: linear denominators → logs; repeated linear → logs + power terms; quadratics → arctan + logs after completing the square.</p>

**Floor 3 (In action):**
<p>Partial fractions turn difficult integrals into routine ones. In chemical kinetics, rate laws often involve rational functions of concentration — integrated rate laws for complex reactions use partial fractions. In control theory, transfer functions are ratios of polynomials, and inverse Laplace transforms use partial fractions to recover the time-domain response. In signal processing, the Z-transform inversion uses the same decomposition. The algebraic step — solving for A, B, C — is tedious but deterministic; a computer algebra system does it instantly. The integration step is then mechanical: every piece is a log, an inverse power, or an arctan. The technique is so systematic that it's one of the first things automated in symbolic integration — but understanding the decomposition lets you read the structure of the solution.</p>

**Image prompt:** A chalk drawing showing three cases. Case 1: distinct linear factors (x−1)(x+2) → A/(x−1) + B/(x+2) → logs. Case 2: repeated factor (x−1)² → A/(x−1) + B/(x−1)² → log + power. Case 3: irreducible quadratic x²+2x+5 → complete square → arctan + log. The general P(x)/Q(x) form at the top. Chalk on dark green board. Square 1:1.


## BB-NEW-610 — Trigonometric substitution: radicals become trig

**Subject:** maths | **Topic:** calculus | **Concept:** trigonometric-substitution; sqrt-integrals; right-triangle-method | **Ground:** g2 | **Builds on:** [BB-NEW-604, BB-NEW-605]

**Floor 0 (Idea):**
<p>Integrals containing √(a² − x²), √(a² + x²), or √(x² − a²) resist ordinary u-substitution. The solution: replace x with a trig function. The radical simplifies using a Pythagorean identity. After integration, convert back to x using a right triangle. This technique handles the integrals that ordinary substitution cannot.</p>

**Floor 1 (Concrete):**
<p><strong>Case 1 — √(a² − x²):</strong> Let x = a sin θ, dx = a cos θ dθ. √(a² − x²) = √(a² − a²sin²θ) = a cos θ.</p>
<p>∫ dx/(a² − x²)^(3/2). For a = 2: x = 2 sin θ, dx = 2 cos θ dθ, √(4−x²)³ = (2 cos θ)³ = 8 cos³θ. Integral = ∫ 2 cos θ/(8 cos³θ) dθ = (1/4)∫ sec²θ dθ = (1/4)tan θ + C. Convert back: sin θ = x/2, so tan θ = x/√(4−x²). Answer: x/(4√(4−x²)) + C.</p>
<p><strong>Case 2 — √(a² + x²):</strong> Let x = a tan θ. √(a² + x²) = a sec θ.</p>
<p><strong>Case 3 — √(x² − a²):</strong> Let x = a sec θ. √(x² − a²) = a tan θ.</p>
<p>The right-triangle method: after solving in θ, draw a right triangle with the substitution relation, label the sides, and read off the trig ratios to convert back to x. No memorisation needed.</p>

**Floor 2 (Definition):**
<p><strong>Trigonometric substitution</strong> for radicals:</p>
<p>• <strong>√(a² − x²)</strong> → x = a sin θ, dx = a cos θ dθ, radical becomes a cos θ. Domain: −a ≤ x ≤ a. The triangle has opposite = x, hypotenuse = a, adjacent = √(a²−x²).</p>
<p>• <strong>√(a² + x²)</strong> → x = a tan θ, dx = a sec²θ dθ, radical becomes a sec θ. The triangle has opposite = x, adjacent = a, hypotenuse = √(a²+x²).</p>
<p>• <strong>√(x² − a²)</strong> → x = a sec θ, dx = a sec θ tan θ dθ, radical becomes a tan θ. The triangle has hypotenuse = x, adjacent = a, opposite = √(x²−a²).</p>
<p>The technique works because the Pythagorean identities sin²θ + cos²θ = 1, 1 + tan²θ = sec²θ, sec²θ − 1 = tan²θ respectively eliminate the square roots. After integrating, draw the appropriate right triangle to express the answer in terms of the original variable x.</p>

**Floor 3 (In action):**
<p>Trig substitution appears wherever geometry and integration meet. The area of a circle ∫ √(r²−x²) dx from −r to r yields πr²/2 (semicircle) — multiply by 2 for the full area. The arc length of a parabola involves √(1+(dy/dx)²), often requiring trig substitution. In electrostatics, the electric field of a charged rod at a perpendicular distance involves ∫ dx/(x²+r²)^(3/2) — trig substitution gives a tidy result. In classical mechanics, the period of a pendulum (large amplitude, beyond the small-angle approximation) requires an elliptic integral — and the substitution that begins to crack it is trigonometric. The technique is specific — it only handles these three radical forms — but those forms are everywhere because Pythagoras is everywhere.</p>

**Image prompt:** A chalk drawing of the three cases. Left: x = a sin θ with right triangle (hypotenuse a, opposite x, adjacent √(a²−x²)). Centre: x = a tan θ with triangle (adjacent a, opposite x, hypotenuse √(a²+x²)). Right: x = a sec θ with triangle (adjacent a, hypotenuse x, opposite √(x²−a²)). The Pythagorean identity for each case. Chalk on dark green board. Square 1:1.


## BB-NEW-611 — Volume of revolution: spinning area into solids

**Subject:** maths | **Topic:** calculus | **Concept:** volume-of-revolution; disk-method; shell-method | **Ground:** g2 | **Builds on:** [BB-NEW-602, BB-NEW-603]

**Floor 0 (Idea):**
<p>Take a curve, spin it around an axis, and you get a solid. The volume of that solid is another definite integral. Two methods: the disk method (slice perpendicular to the axis — each slice is a thin disk of area πr²) and the shell method (cylindrical shells parallel to the axis). Same answer from different perspectives.</p>

**Floor 1 (Concrete):**
<p><strong>Disk method:</strong> Revolve y = x² from x = 0 to x = 2 around the x-axis. At each x, the radius is y = x², so disk area = π(x²)² = πx⁴. Volume = π ∫[0,2] x⁴ dx = π[x⁵/5]₀² = 32π/5 ≈ 20.1 cubic units.</p>
<p><strong>Washer method</strong> (region between two curves): Revolve the region between y = x and y = x² from x = 0 to x = 1 around the x-axis. Outer radius R = x, inner radius r = x². Volume = π ∫[0,1] (R² − r²) dx = π ∫[0,1] (x² − x⁴) dx = π[x³/3 − x⁵/5]₀¹ = π(1/3 − 1/5) = 2π/15.</p>
<p><strong>Shell method:</strong> Revolve y = x² from y = 0 to y = 4 around the y-axis. Each cylindrical shell at x has radius x, height 4 − x², thickness dx. Volume = 2π ∫[0,2] x(4−x²) dx = 2π[2x² − x⁴/4]₀² = 2π(8−4) = 8π.</p>

**Floor 2 (Definition):**
<p><strong>Volume of revolution methods:</strong></p>
<p>• <strong>Disk/washer method</strong> (slices perpendicular to rotation axis): V = π ∫ [R(x)² − r(x)²] dx (rotation about x-axis) or V = π ∫ [R(y)² − r(y)²] dy (about y-axis). Each slice is a thin disk (washer if hollow) of thickness dx or dy.</p>
<p>• <strong>Shell method</strong> (cylinders parallel to rotation axis): V = 2π ∫ r·h dx (about y-axis) or 2π ∫ r·h dy (about x-axis), where r is the distance from the axis and h is the height of the shell. Choose the method that makes the integral easier — avoid solving for inverse functions when possible.</p>
<p>The formula ∫ πy² dx for a solid curve comes from summing π(radius)² × thickness — the volume of infinitesimally thin disks. This is the 3D analogue of the Riemann sum: area ≈ Σ f(x)Δx, volume ≈ Σ π[f(x)]² Δx.</p>

**Floor 3 (In action):**
<p>Volumes of revolution appear throughout engineering and physics. The volume of a sphere (V = 4πr³/3) is the revolution of a semicircle: V = π ∫[−r,r] (r²−x²) dx = 4πr³/3. The volume of a cone is the revolution of a line: V = π ∫[0,h] (Rx/h)² dx = πR²h/3 — one-third the circumscribing cylinder, a result known to Archimedes. Toroidal transformer cores, rocket fuel tanks, wine barrels (Kepler's *Nova Stereometria Doliorum*, 1615, used volumes of revolution to measure cask capacity) — all computed by spinning a generating curve. The moment of inertia of a solid also involves a related integral: I = ∫ r² dm, where dm = ρ dV and dV is the disk or shell element.</p>

**Image prompt:** A chalk drawing of a parabola y = x² being revolved around the x-axis, forming a solid (paraboloid). A thin disk slice at x shown with radius y and thickness dx, volume = πy² dx. The integral ∫₀² πx⁴ dx = 32π/5. A second diagram shows the shell method: a cylindrical shell at radius x, height 4−x², thickness dx. Chalk on dark green board. Square 1:1.


## BB-NEW-612 — Improper integrals: when the limits are infinite

**Subject:** maths | **Topic:** calculus | **Concept:** improper-integrals; infinite-limits; convergence-divergence | **Ground:** g2 | **Builds on:** [BB-NEW-602, BB-NEW-603]

**Floor 0 (Idea):**
<p>A definite integral with infinite limits or an unbounded integrand is "improper" — you can't just plug in ∞. Instead, replace ∞ with a variable, integrate, then take the limit. If the limit is finite, the integral converges; if not, it diverges. This determines whether an infinite area actually yields a finite number.</p>

**Floor 1 (Concrete):**
<p><strong>Infinite limit:</strong> ∫[1,∞] 1/x² dx. Replace ∞ with t: ∫[1,t] x⁻² dx = [−x⁻¹]₁ᵗ = −1/t + 1. Take t → ∞: lim(t→∞) (1 − 1/t) = 1. The infinite region has area 1 — finite and tidy.</p>
<p><strong>Divergent case:</strong> ∫[1,∞] 1/x dx. ∫[1,t] 1/x dx = ln t. As t → ∞, ln t → ∞. The area under 1/x from 1 to ∞ is infinite — it diverges.</p>
<p><strong>Unbounded integrand:</strong> ∫[0,1] 1/√x dx. The integrand blows up at x = 0. Replace 0 with ε: ∫[ε,1] x^(−1/2) dx = [2√x]ₑ¹ = 2 − 2√ε. As ε → 0⁺: limit = 2. Converges despite the asymptote.</p>
<p>The rule: ∫[1,∞] 1/xᵖ dx converges for p > 1, diverges for p ≤ 1. The borderline p = 1 is the harmonic threshold.</p>

**Floor 2 (Definition):**
<p><strong>Improper integrals</strong> extend the definite integral to unbounded domains or integrands. Type 1: infinite limit(s). ∫[a,∞] f(x) dx = lim(t→∞) ∫[a,t] f(x) dx. Type 2: unbounded integrand. If f has a vertical asymptote at x = a, ∫[a,b] f(x) dx = lim(ε→0⁺) ∫[a+ε,b] f(x) dx. If both endpoints are problematic, split at an interior point. The integral <strong>converges</strong> if the limit exists and is finite; <strong>diverges</strong> otherwise. Comparison test: if 0 ≤ f(x) ≤ g(x) and ∫g converges, then ∫f converges. If f(x) ≥ g(x) ≥ 0 and ∫g diverges, then ∫f diverges. The p-test: ∫[1,∞] 1/xᵖ dx converges ⇔ p > 1; ∫[0,1] 1/xᵖ dx converges ⇔ p < 1.</p>

**Floor 3 (In action):**
<p>Improper integrals determine whether infinite processes produce finite results. The total energy radiated by a black body: ∫[0,∞] (Planck spectrum) dλ — converges, giving the Stefan-Boltzmann law. The expectation (mean) of the Cauchy distribution is ∫[−∞,∞] x/(π(1+x²)) dx — diverges, meaning the Cauchy distribution has no mean (a famous counterexample). In probability, the normalisation condition for any probability density is ∫[−∞,∞] f(x) dx = 1 — the integral must converge. The Laplace transform F(s) = ∫[0,∞] f(t)e^(−st) dt is an improper integral; its convergence depends on s. In physics, the total work to separate two charges to infinity is ∫[r,∞] kq₁q₂/r² dr — converges (finite binding energy). The distinction between convergence and divergence is the mathematical line between possible and impossible infinite processes.</p>

**Image prompt:** A chalk drawing of y = 1/x² with the region from x = 1 to ∞ shaded. A dashed rectangle shows the finite total area = 1. Beside it: y = 1/x with the region shaded — labelled "infinite area — diverges." The p-test threshold: p > 1 converges, p ≤ 1 diverges. An example with asymptote at x = 0 showing convergent case. Chalk on dark green board. Square 1:1.


## BB-NEW-613 — Arc length: measuring curves with integrals

**Subject:** maths | **Topic:** calculus | **Concept:** arc-length; curve-length-integral; differential-arc-length | **Ground:** g2 | **Builds on:** [BB-NEW-602, BB-NEW-593]

**Floor 0 (Idea):**
<p>The length of a curve is not just Δx + Δy — that's the Manhattan distance. The true length is found by summing infinitesimal hypotenuse segments: ds = √(dx² + dy²). Factor out dx or dy and integrate. This is the Pythagorean theorem applied to differentials.</p>

**Floor 1 (Concrete):**
<p>Arc length formula: L = ∫ √(1 + (dy/dx)²) dx (for y = f(x) from x = a to b) or L = ∫ √((dx/dt)² + (dy/dt)²) dt (parametric).</p>
<p><strong>Straight line check:</strong> y = 2x from (0,0) to (3,6). dy/dx = 2. L = ∫[0,3] √(1 + 4) dx = √5 × 3 = 3√5 ≈ 6.708. Manual: √(3²+6²) = √45 = 3√5 ✓.</p>
<p><strong>Parabola:</strong> y = x² from (0,0) to (2,4). dy/dx = 2x. L = ∫[0,2] √(1 + 4x²) dx. Let 2x = tan θ → x = ½ tan θ, dx = ½ sec²θ dθ. L = ½∫ √(1+tan²θ) sec²θ dθ = ½∫ sec³θ dθ. This requires integration by parts (or a table): ∫ sec³θ dθ = ½(sec θ tan θ + ln|sec θ + tan θ|). After evaluating: L = ½[½(sec θ tan θ + ln|sec θ + tan θ|)] from θ = 0 to arctan(4). Numerically: L ≈ 4.647.</p>
<p><strong>Circle (parametric):</strong> x = r cos t, y = r sin t, 0 to 2π. dx/dt = −r sin t, dy/dt = r cos t. L = ∫[0,2π] √(r²sin²t + r²cos²t) dt = ∫[0,2π] r dt = 2πr — the circumference formula.</p>

**Floor 2 (Definition):**
<p><strong>Arc length formulas:</strong></p>
<p>• Cartesian: L = ∫[a,b] √(1 + [f'(x)]²) dx</p>
<p>• Parametric: L = ∫[t₁,t₂] √([dx/dt]² + [dy/dt]²) dt</p>
<p>• Polar: L = ∫[θ₁,θ₂] √(r² + [dr/dθ]²) dθ</p>
<p>The differential arc length ds = √(dx² + dy²) is the infinitesimal Pythagorean hypotenuse. The formula comes from summing these infinitesimal segments. For most functions, the resulting integral is not elementary — arc length integrals are notoriously difficult and often require numerical methods. Notable exceptions: lines (trivial), circles (trivial), parabolas (doable with trig substitution), catenaries (the hyperbolic cosine yields a surprisingly simple result).</p>

**Floor 3 (In action):**
<p>Arc length is fundamental to geometry and engineering. The perimeter of an ellipse (no closed-form elementary antiderivative — requires elliptic integrals, a whole field of mathematics). The length of a suspension cable (catenary) is L = 2a sinh(x/a), one of the few non-trivial exact formulas. In computer graphics, curves are rendered by approximating their arc length with many short line segments — the integral formula is how you check the accuracy. In robotics, path planning minimises arc length (shortest path subject to constraints). In relativity, the proper time along a worldline is the arc length in Minkowski spacetime: τ = ∫ √(dt² − dx²/c²) — the same formula with a sign change.</p>

**Image prompt:** A chalk drawing of a curve with a small segment ds shown as the hypotenuse of a right triangle with legs dx and dy. ds = √(dx² + dy²). The integral formula L = ∫ √(1 + (dy/dx)²) dx. Three examples: line (√5 × length), circle (2πr), parabola (trig substitution needed). Chalk on dark green board. Square 1:1.


## BB-NEW-614 — Surface area of revolution: spinning a curve into a surface

**Subject:** maths | **Topic:** calculus | **Concept:** surface-area-of-revolution; Pappus-theorem; band-area | **Ground:** g2 | **Builds on:** [BB-NEW-611, BB-NEW-613]

**Floor 0 (Idea):**
<p>Revolve a curve around an axis and you get a surface. The area is not just 2π∫ y dx — that would give the area of the disks, not the curved surface. The correct element is a thin band of width ds (arc length), circumference 2πr. Surface area = ∫ 2πr ds. The ds is crucial — it accounts for the slant of the curve.</p>

**Floor 1 (Concrete):**
<p><strong>Sphere:</strong> Revolve a semicircle y = √(r²−x²) from x = −r to r about the x-axis. dy/dx = −x/√(r²−x²). ds = √(1 + x²/(r²−x²)) dx = √(r²/(r²−x²)) dx = r/√(r²−x²) dx. Surface area = 2π ∫ y ds = 2π ∫[−r,r] √(r²−x²) × (r/√(r²−x²)) dx = 2πr ∫[−r,r] dx = 2πr × 2r = 4πr². The sphere's surface area formula, derived cleanly.</p>
<p><strong>Cone:</strong> Revolve y = (R/h)x from 0 to h about the x-axis. ds = √(1 + R²/h²) dx. Surface area = 2π ∫[0,h] (R/h)x √(1 + R²/h²) dx = 2π(R/h)√(1+R²/h²) [x²/2]₀ʰ = πR√(h²+R²) = πR × slant height. Lateral surface area of a cone = πRl ✓.</p>

**Floor 2 (Definition):**
<p><strong>Surface area of revolution:</strong></p>
<p>• About x-axis: S = ∫ 2πy ds = ∫ 2πy √(1 + [dy/dx]²) dx (for y = f(x))</p>
<p>• About y-axis: S = ∫ 2πx ds = ∫ 2πx √(1 + [dx/dy]²) dy</p>
<p>• Parametric: S = ∫ 2πy √([dx/dt]² + [dy/dt]²) dt (about x-axis)</p>
<p>The key is ds — the arc length element — not dx. Using dx instead of ds would give the area of cylindrical slices, missing the slant. <strong>Pappus's Centroid Theorem</strong> (for surfaces): S = 2π × (distance travelled by centroid) × (arc length). This provides a geometric check: for a semicircle revolved about its diameter, centroid distance = 2r/π, arc = πr → S = 2π(2r/π)(πr) = 4πr².</p>

**Floor 3 (In action):**
<p>Surface area of revolution appears in manufacturing (material needed for a curved vessel), architecture (surface area of domes), and biology (surface-to-volume ratio of cells). Gabriel's Horn — the solid formed by revolving y = 1/x from x = 1 to ∞ — has finite volume (π) but infinite surface area. You could fill it with paint but never paint its surface — a famous paradox illustrating the difference between volume and surface area integrals. In heat transfer, the rate of cooling is proportional to surface area, so finned heat sinks use surfaces of revolution (or close approximations) to maximise area. The ds element is the mathematical reason why a fluted column has more surface area than a smooth one of the same radius — it's longer along the surface.</p>

**Image prompt:** A chalk drawing of a curve being revolved around the x-axis. A thin band at position x shown: radius y, width ds (not dx), surface area of band = 2πy ds. The formula S = ∫ 2πy √(1+(dy/dx)²) dx. Two examples: semicircle → 4πr², line → πRl. Pappus's theorem diagram with centroid path. Chalk on dark green board. Square 1:1.


## BB-NEW-615 — The integration toolkit: everything in one place

**Subject:** maths | **Topic:** calculus | **Concept:** integration-toolkit; full-integral-table; mastery-reference | **Ground:** g1 | **Builds on:** [BB-NEW-600 through BB-NEW-614]

**Floor 0 (Idea):**
<p>After 15 BBs of building the toolkit, here it is — every integration technique in one reference. From the power rule through partial fractions, trigonometric substitution, and volumes of revolution. Master this table, and you have the complete classical integration arsenal. This is the summit.</p>

**Floor 1 (Concrete):**
<p>Test yourself — identify the technique for each:</p>
<p>1. ∫ x⁵ dx → Power rule: x⁶/6 + C</p>
<p>2. ∫ x cos(x²) dx → u-substitution: u = x² → sin(x²)/2 + C</p>
<p>3. ∫ x eˣ dx → Parts: u = x, dv = eˣ → eˣ(x−1) + C</p>
<p>4. ∫ (x+1)/(x²+2x−3) dx → Log rule (f'/f): (1/2)ln|x²+2x−3| + C</p>
<p>5. ∫ sin²x dx → Trig identity: (x − sin 2x/2)/2 + C</p>
<p>6. ∫ 1/√(4−x²) dx → Trig substitution: x = 2 sin θ → arcsin(x/2) + C</p>
<p>7. ∫ (3x−1)/(x²−x−6) dx → Partial fractions → logs</p>
<p>8. ∫[0,2] √(1+4x²) dx → Arc length — requires trig sub or numerical: ≈ 4.647</p>
<p>9. ∫[0,2] πx⁴ dx → Volume (disk method): 32π/5</p>
<p>10. ∫[1,∞] e^(−x) dx → Improper integral: lim(t→∞) (1−e^(−t)) = 1</p>

**Floor 2 (Definition):**
<p><strong>Complete integration toolkit:</strong></p>
<p><strong>Basic rules:</strong> ∫ xⁿ dx = xⁿ⁺¹/(n+1) + C (n≠−1) · ∫ (1/x) dx = ln|x| + C · ∫ eˣ dx = eˣ + C · ∫ aˣ dx = aˣ/ln a + C · ∫ f'/f dx = ln|f| + C</p>
<p><strong>Trig:</strong> ∫ sin x dx = −cos x + C · ∫ cos x dx = sin x + C · ∫ sec²x dx = tan x + C · ∫ sec x tan x dx = sec x + C · ∫ tan x dx = ln|sec x| + C · ∫ sec x dx = ln|sec x+tan x| + C</p>
<p><strong>Inverse trig:</strong> ∫ dx/√(a²−x²) = arcsin(x/a) + C · ∫ dx/(a²+x²) = (1/a)arctan(x/a) + C · ∫ dx/x√(x²−a²) = (1/a)arcsec(x/a) + C</p>
<p><strong>Techniques:</strong> u-substitution · integration by parts · partial fractions · trig substitution · completing the square · trig identities (power-reduction, product-to-sum)</p>
<p><strong>Applications:</strong> area under curve · area between curves · volume of revolution (disk/washer/shell) · arc length · surface area of revolution · improper integrals · average value</p>

**Floor 3 (In action):**
<p>This table is your capstone. Every integral you'll encounter in physics, engineering, economics, or pure mathematics is a combination of these patterns. The art of integration is not memorising every possible integral — it's recognising which of these 10–15 patterns applies. Integration is fundamentally harder than differentiation because it's a search problem: given f(x), find F(x) such that F' = f. There's no guaranteed algorithm — it requires pattern recognition, creativity, and sometimes the realisation that no elementary antiderivative exists (like ∫ e^(−x²) dx or ∫ sin(x²) dx). Knowing when to stop trying and switch to numerical methods is as important as knowing the techniques. With this toolkit, you can integrate virtually anything that has an elementary antiderivative.</p>

**Image prompt:** A chalk drawing of a grand integration table — columns for function, technique, and result. Sections: basic power/exponential/trig rules, inverse trig forms, the three big techniques (substitution, parts, partial fractions), geometric applications (area, volume, arc length). A star next to the log rule ∫ f'/f dx = ln|f| as the most frequently useful pattern. Chalk on dark green board. Square 1:1.
