# Problem-Solving Heuristics — Batch 2 (16 BBs)

Continuing the Polya–Thompson methodology course. Batch 1 covered the four-step method, core heuristics (working backwards, analogy, drawing, specialization/generalization), deeper heuristics (decomposition, auxiliary elements, variation, completeness check), and applied toolkits for physics and maths. Batch 2 covers advanced Polya heuristics, Thompson's calculus techniques, problem-type recognition, and the journey to mastery. Every BB cross-references existing content BBs.

---

# Part 5 — Advanced Polya Heuristics

---

## BB-NEW-420 — Setting up equations: translating words into symbols

**Subject:** general | **Topic:** problem-solving | **Concept:** setting-up-equations; translation; word-problem; notation | **Ground:** g0 | **Builds on:** [BB-NEW-400, BB-NEW-115]

**Floor 0 (Idea):**
<p>"A train leaves station A at 60 km/h. Thirty minutes later, a second train leaves station A at 90 km/h. When does the second train catch the first?" The hardest part of this problem is not the algebra — it's the translation. Words → symbols. "When does it catch?" means the distances are equal: d₁ = d₂. "Thirty minutes later" means t₂ = t₁ − 0.5. The physics is trivial (d = vt); the difficulty is entirely linguistic. Polya: "To set up equations means to express in mathematical symbols a condition that is stated in words." This is a separate skill — and it's the one most students struggle with most.</p>

**Floor 1 (Concrete):**
<p>The train problem, step by step. <strong>Read:</strong> "A train leaves station A at 60 km/h." → v₁ = 60. "Thirty minutes later" → time offset. Choose t = time since first train departed. Then first train's travel time = t; second train's travel time = t − 0.5. "A second train leaves station A at 90 km/h." → v₂ = 90. "When does the second train catch the first?" → when distances are equal. d₁ = v₁t = 60t. d₂ = v₂(t−0.5) = 90(t−0.5). Set equal: 60t = 90t − 45 → 30t = 45 → t = 1.5 hours. The second train catches the first 1.5 hours after the first departed — i.e., 1.0 hour after the second departed. The translation took four steps: (1) Name the unknown (t). (2) Express each quantity in terms of t. (3) Express the condition as an equation. (4) Solve. The algebra was one line. The translation was the entire problem.</p>

**Floor 2 (Definition):**
<p><strong>Setting up equations — Polya's method:</strong> (1) <strong>State the unknown(s) clearly.</strong> "Let t = the time in hours..." (2) <strong>Express all quantities in terms of the unknown(s).</strong> Distance = speed × time, so d₁ = 60t, d₂ = 90(t−0.5). (3) <strong>Find the condition that links them.</strong> "When the second catches the first, they've travelled the same distance." This is the equation: 60t = 90(t−0.5). (4) <strong>Check that every word has been translated.</strong> "From station A" → same starting point. "30 minutes later" → time offset. "Catches" → equal distances. If any phrase hasn't been used in the equations, re-read — you may have missed a condition. Common translation patterns: "is" → =, "more than" → +, "less than" → −, "twice" → 2×, "per" → ÷, "catches" → equal position/quantity, "overtakes" → equal position.</p>

**Floor 3 (In action):**
<p>Setting up equations is the meta-skill behind every application BB. BB 220 (mole calculations): "How many moles in 80 g of NaOH?" → n = m/M. The word "in" translates to division: moles = mass ÷ molar mass. BB 282 (Atwood machine): "Two masses connected by a string over a pulley" → two F=ma equations linked by equal tension T and equal acceleration magnitude a. The setup IS the solution. BB 287 (ladder): "A ladder leans against a frictionless wall" → ΣF_x=0, ΣF_y=0, Στ=0. Three words → three equations. BB 265 (calorimetry): "A hot metal is dropped into cool water" → m_hot c ΔT_hot = m_cold c ΔT_cold. The hardest part of every word problem is the first 30 seconds: choosing the unknown, naming it, and writing the condition as an equation. Once the equation is set up, the rest is manipulation. Polya: "The main achievement in the solution of a word problem is setting up the equation. After that, algebra does the work."</p>

**Image prompt:** A chalk drawing of a sentence on the left ("A train leaves...") with arrows pointing to symbols on the right (v₁=60, v₂=90, t, d₁=v₁t, d₂=v₂(t−0.5), d₁=d₂). A figure between them labelled "TRANSLATION." Below: "Words → Symbols → Equation → Solution." Chalk on dark green board. Square 1:1.

---

## BB-NEW-421 — Test by dimension: the fastest error detector in physics

**Subject:** physics | **Topic:** problem-solving | **Concept:** dimensional-analysis; units-check; fastest-verification; Polya-test | **Ground:** g0 | **Builds on:** [BB-NEW-403, BB 88, BB 89]

**Floor 0 (Idea):**
<p>You've derived a formula: v = √(2as). Before plugging in numbers, check the dimensions. Left side: v — dimensions [LT⁻¹]. Right side: √(2as) — a has dimensions [LT⁻²], s has [L], so as = [L²T⁻²], √(as) = [LT⁻¹]. Match. The formula passes the dimensional test. If it had failed — if the right side gave [L] or [T] or [M] — the formula would be certainly wrong, and no amount of arithmetic could save it. Dimensional analysis is Polya's "test by dimension." It's the fastest, most reliable error detector in all of physics. Use it before you touch a calculator.</p>

**Floor 1 (Concrete):**
<p>A student derives the time period of a simple pendulum as T = 2π√(g/L). Check dimensions: T is time [T]. g/L: g = [LT⁻²], L = [L], so g/L = [T⁻²], √(g/L) = [T⁻¹]. Right side has dimensions [T⁻¹] but the left side is [T]. Mismatch. The formula is wrong — it should be T = 2π√(L/g). Check: L/g = [L]/[LT⁻²] = [T²], √(L/g) = [T] ✓. The dimensional check caught the inverted fraction instantly. Another example: a student writes F = mv (force equals mass × velocity). Dimensions: F = [MLT⁻²], mv = [M][LT⁻¹] = [MLT⁻¹]. Mismatch — missing a [T⁻¹]. The correct formula is F = ma, with dimensions [M][LT⁻²] = [MLT⁻²] ✓. Dimensional analysis can't tell you the ½ in ½mv², but it CAN tell you that the v must be squared — ½mv would have dimensions [MLT⁻¹] (momentum, not energy), and ½mv² has [ML²T⁻²] (energy) ✓.</p>

**Floor 2 (Definition):**
<p><strong>Dimensional analysis (Polya's "test by dimension"):</strong> (1) Express every quantity in terms of the fundamental dimensions — mass [M], length [L], time [T], current [I], temperature [K], amount [mol], luminous intensity [cd]. (2) Both sides of any valid physical equation MUST have identical dimensions. (3) You can only ADD or SUBTRACT quantities with identical dimensions — you cannot add a speed to a force. (4) Arguments of transcendental functions (sin, cos, ln, exp) MUST be dimensionless. (5) If the dimensions don't match, the equation is certainly wrong. If they do match, the equation MAY be correct (necessary but not sufficient). See BB 88-89 for the full treatment of dimensions and homogeneity.</p>

**Floor 3 (In action):**
<p>Dimensional analysis is the physicist's spell-check. BB 269 (PV=nRT): P×V = (N/m²)(m³) = N·m = J. nRT = (mol)(J/mol·K)(K) = J ✓. BB 274 (Carnot efficiency): η = 1 − T_c/T_h. T_c/T_h is a ratio of temperatures → dimensionless. 1 is dimensionless. η is a ratio → dimensionless ✓. BB 208 (power): P = IV = (C/s)(J/C) = J/s = W ✓. P = I²R = (A²)(Ω) = (A²)(V/A) = A·V = W ✓. P = V²/R = V²/(V/A) = V·A = W ✓. All three forms are dimensionally consistent — they're the same equation with Ohm's law substituted. In BB 317 (Snell's law): n₁ sin θ₁ = n₂ sin θ₂. n is dimensionless (ratio of speeds). sin θ is dimensionless. Both sides dimensionless ✓. Dimensional analysis should be automatic. Before you trust any derived formula, check the dimensions. It takes five seconds and catches half of all physics errors.</p>

**Image prompt:** A chalk drawing of a balance scale. Left pan: the formula being tested with its dimensions written below. Right pan: the expected dimensions. If they balance, a green checkmark. If not, a red X. Below: "Dimension check = 5 seconds. Wrong formula if it fails. Potentially right if it passes." Chalk on dark green board. Square 1:1.

---

## BB-NEW-422 — Reductio ad absurdum: prove by assuming the opposite

**Subject:** maths | **Topic:** problem-solving | **Concept:** reductio-ad-absurdum; proof-by-contradiction; indirect-proof | **Ground:** g1 | **Builds on:** [BB-NEW-402]

**Floor 0 (Idea):**
<p>You want to prove something is true. Direct proof seems impossible. Polya's alternative: assume the OPPOSITE of what you want to prove. Then reason forward until you reach a contradiction — something absurd, impossible, or in conflict with a known fact. Since the assumption led to absurdity, the assumption must be false — and therefore, the original statement must be true. This is reductio ad absurdum, or proof by contradiction. It is one of the most elegant and powerful proof techniques in mathematics.</p>

**Floor 1 (Concrete):**
<p>Prove that √2 is irrational. Direct proof? Hard — how do you prove a number CAN'T be written as a fraction? Reductio: ASSUME √2 IS rational — i.e., √2 = p/q, where p and q are integers with no common factor (the fraction is in lowest terms). Square both sides: 2 = p²/q² → p² = 2q². So p² is even, which means p is even. Write p = 2k. Then (2k)² = 2q² → 4k² = 2q² → q² = 2k². So q² is even, which means q is also even. Now both p and q are even — they share a factor of 2. But we assumed the fraction was in lowest terms (no common factor). CONTRADICTION. The assumption "√2 is rational" leads to an impossibility. Therefore, √2 is irrational. The proof is elegant, complete, and requires no construction — only logic starting from a false premise.</p>

**Floor 2 (Definition):**
<p><strong>Reductio ad absurdum</strong> (proof by contradiction): (1) Assume the NEGATION of what you want to prove. (2) Reason logically from this assumption using known facts and valid inferences. (3) Derive a contradiction — a statement that conflicts with a known fact, a given condition, or the assumption itself. (4) Conclude that the negation must be false, and therefore the original statement is true. This technique is valid because in classical logic, a statement is either true or false — if its negation is impossible, the statement must be true. Reductio is particularly powerful for proving: non-existence (no largest prime), irrationality (√2), uniqueness (there is only one solution), and impossibility (a perpetual motion machine cannot exist).</p>

**Floor 3 (In action):**
<p>Reductio appears throughout our BBs, often unnamed. BB 273 (second law of thermodynamics): "No process is possible whose sole result is the complete conversion of heat into work." Proof by contradiction: assume such a process exists. Then you could extract heat from a single reservoir, convert it entirely to work, and use that work to pump heat from a cold body to a hot body — net effect: heat flows from cold to hot with no other change, violating the Clausius statement. Contradiction. Therefore, the assumption is false. BB 144 (exponential vs polynomial): to prove eˣ / xⁿ → ∞ as x → ∞. Assume it doesn't — assume it approaches a finite limit. Repeated application of L'Hôpital's rule reveals the limit must be infinite. Contradiction. BB 120 (quadratic discriminant): if b²−4ac < 0, assume a real solution exists. Plug into the quadratic formula — square root of a negative. Contradiction with the real number system. Therefore, no real solutions. Reductio transforms "prove this is true" into "prove the opposite is absurd." When the direct path is blocked, try the indirect one.</p>

**Image prompt:** A chalk drawing of a logical chain starting from "Assume NOT P" and leading through several steps to an explosion symbol labelled "CONTRADICTION!" From the explosion, an arrow points back: "Therefore, P." Below: "If the opposite leads to absurdity, the original must be true." Chalk on dark green board. Square 1:1.

---

## BB-NEW-423 — The inventor's paradox: why the harder problem might be easier

**Subject:** general | **Topic:** problem-solving | **Concept:** inventors-paradox; ambitious-plan; generalisation-payoff | **Ground:** g1 | **Builds on:** [BB-NEW-408, BB-NEW-402]

**Floor 0 (Idea):**
<p>Polya's most counterintuitive observation: sometimes the MORE AMBITIOUS plan has a better chance of success. The general problem may be easier to solve than the specific one. Why? Because the general problem may have more symmetry, more structure, or a known method that the specific case obscures. This is the inventor's paradox — named after the fact that inventors who aim for a modest improvement often fail, while those who reimagine the entire system sometimes succeed brilliantly. In mathematics: proving a theorem for ALL n may be easier than proving it for n=5, because the general proof uses induction or symmetry that the specific case hides.</p>

**Floor 1 (Concrete):**
<p>Problem: find the sum 1 + 2 + 3 + ... + 100. The specific plan: add them one by one. Tedious, error-prone. The ambitious plan: find the sum of the first n integers for ANY n. Gauss's method (age 7): write the sum forward (1+2+...+n) and backward (n+(n−1)+...+1). Add vertically: each pair sums to (n+1). There are n such pairs. Total = n(n+1). But we've counted every term twice, so S = n(n+1)/2. For n=100: S = 100×101/2 = 5050. The general formula took one line to derive and solved the specific problem instantly — AND solves it for any n. Another example: differentiate y = (x²+1)⁵. The specific plan: expand (x²+1)⁵ into a 6-term polynomial and differentiate each term. The ambitious plan: learn the chain rule — let u = x²+1, then y = u⁵, dy/dx = 5u⁴ × du/dx = 5(x²+1)⁴ × 2x = 10x(x²+1)⁴. The general method is both easier AND more powerful. The inventor's paradox: aiming higher can be the pragmatic choice.</p>

**Floor 2 (Definition):**
<p><strong>The inventor's paradox</strong> (Polya): "The more ambitious plan may have more chances of success." This occurs when: (1) The general problem has a known method (induction, the chain rule, a standard integral form) that the specific case doesn't obviously invite. (2) The general problem has more symmetry — the special case breaks symmetry, making it messy. (3) The general problem forces you to find the structure, which then trivialises all special cases. (4) Solving the specific problem might require ad-hoc tricks that don't generalise, while the general method, once found, is reusable. The paradox is not a guarantee — sometimes the specific IS easier. But when you're stuck on a specific case, ask: "Is there a general version of this that might have a standard solution?"</p>

**Floor 3 (In action):**
<p>The inventor's paradox is the meta-heuristic behind generalisation (BB 408). BB 136 (building the exponential model): you don't solve for one specific t — you find k from two data points and write A = A₀e^(kt), which solves for ANY t. BB 314 (mirror formula): 1/f = 1/v + 1/u works for concave, convex, all object positions. The general formula with sign conventions is EASIER than memorising six separate cases. BB 207 (mixed circuits): the systematic reduction method — find a pure series or parallel section, replace, repeat — works for ANY reducible network. The alternative is ad-hoc reasoning for each circuit, which fails for complex networks. BB 122 (index laws): learning the seven general laws (xᵃxᵇ = xᵃ⁺ᵇ, etc.) is easier than memorising specific results like 2³×2⁴ = 128. Thompson's *Calculus Made Easy* embodies the inventor's paradox: instead of teaching differentiation case by case, he teaches the power rule, the chain rule, and the product rule — three general methods that handle thousands of specific functions. The ambitious plan — learn the method — outperforms the modest plan — learn the answers.</p>

**Image prompt:** A chalk drawing of two figures facing a wall. One tries to climb over with a short ladder (specific method — struggling). The other simply opens a door in the wall labelled "General Method" and walks through. Below: "The more ambitious plan may have more chances of success. — Polya." Chalk on dark green board. Square 1:1.

---

# Part 6 — Thompson's Calculus Toolkit

---

## BB-NEW-424 — The power rule and its family: differentiating xⁿ in one step

**Subject:** maths | **Topic:** problem-solving | **Concept:** power-rule; differentiation; x-to-the-n; Thompson-method | **Ground:** g0 | **Builds on:** [BB-NEW-401, BB-NEW-19]

**Floor 0 (Idea):**
<p>Thompson taught the power rule through pattern recognition. Differentiate x² → 2x. x³ → 3x². x⁴ → 4x³. The pattern: bring the exponent down as a multiplier, then reduce the exponent by 1. d(xⁿ)/dx = nxⁿ⁻¹. This works for any n — positive, negative, fractional. It is the single most-used rule in calculus. Thompson's genius was presenting it not as a theorem to be proved but as a pattern to be noticed — the natural extension of the "dodge" (method of increments) applied once to the general case.</p>

**Floor 1 (Concrete):**
<p>Apply the power rule to the family of functions. <strong>Positive integer:</strong> d(x⁵)/dx = 5x⁴. <strong>Negative:</strong> d(x⁻²)/dx = −2x⁻³ = −2/x³ (since 1/x² = x⁻², the power rule handles reciprocals). <strong>Fractional:</strong> d(√x)/dx = d(x^(1/2))/dx = ½x^(−1/2) = 1/(2√x). d(∛x)/dx = d(x^(1/3))/dx = ⅓x^(−2/3). <strong>Constant multiple:</strong> d(7x³)/dx = 21x². <strong>Sum:</strong> d(3x⁴ − 5x² + 2x − 7)/dx = 12x³ − 10x + 2 (the −7 vanishes — derivative of a constant is zero). The power rule handles ALL of these without ever returning to the limit definition. Thompson's dodge (BB 401) taught you WHY it works — (x+dx)ⁿ = xⁿ + nxⁿ⁻¹dx + (terms with dx² and higher) → dy = nxⁿ⁻¹dx → dy/dx = nxⁿ⁻¹. The dodge explains; the power rule executes. Together, they make differentiation mechanical.</p>

**Floor 2 (Definition):**
<p>The <strong>power rule</strong>: d(xⁿ)/dx = <strong>nxⁿ⁻¹</strong>, valid for any real exponent n. Extended by linearity: d(axⁿ)/dx = a·nxⁿ⁻¹. d(f + g)/dx = df/dx + dg/dx (the derivative of a sum is the sum of derivatives). The power rule handles monomials. Combined with the sum rule, it handles polynomials. Combined with the chain rule (BB 427), it handles powers of functions: d([f(x)]ⁿ)/dx = n[f(x)]ⁿ⁻¹ · f'(x). Combined with the product rule, it handles products. The power rule is the atomic operation of differentiation — the starting point from which more complex derivatives are built.</p>

**Floor 3 (In action):**
<p>The power rule appears implicitly in many of our BBs where calculus is used. BB 19 (dy/dx): the derivative of s = 2.5t² is ds/dt = 5.0t — power rule with n=2. BB 21 (maxima and minima): to find the peak of y = 20t − 5t², differentiate: dy/dt = 20 − 10t, set to zero — power rule applied to both terms. BB 115 (algebra intro): "if you can differentiate x², you can differentiate any polynomial." BB 130 (indices review): fractional and negative exponents — the power rule handles them seamlessly because x^(1/n) and x⁻ᵃ are just specific exponents. Thompson's entire first half of *Calculus Made Easy* is the power rule applied to increasingly complex expressions: polynomials, then products, then quotients, then functions of functions. Each step adds one new rule. The progression is: power rule → sum rule → product rule → quotient rule → chain rule. Master these five, and you can differentiate essentially any function encountered in first-year calculus and physics.</p>

**Image prompt:** A chalk drawing of the power rule: d(xⁿ)/dx = nxⁿ⁻¹. Below, a "family tree" — x²→2x, x³→3x², x⁻¹→−x⁻², x^(1/2)→½x^(−1/2), x^(3/2)→(3/2)x^(1/2). Each branch labelled with the exponent transformation. Chalk on dark green board. Square 1:1.

---

## BB-NEW-425 — Maxima and minima the Thompson way: turning points without tears

**Subject:** maths | **Topic:** problem-solving | **Concept:** maxima-minima; derivative-test; optimization; Thompson-method | **Ground:** g0 | **Builds on:** [BB-NEW-424, BB-NEW-21]

**Floor 0 (Idea):**
<p>Thompson's treatment of maxima and minima is a masterpiece of clarity. At the peak of a curve, the tangent is horizontal — the derivative is zero. At the trough, same thing. So to find the highest or lowest point of any function: differentiate, set the derivative equal to zero, solve. That's the entire method. Then test whether it's a maximum or minimum by checking the sign of the derivative just before and just after — or, more elegantly, by checking the second derivative. Thompson: "The slope is upward before a maximum and downward after it; the reverse for a minimum." This transforms optimization from a geometric puzzle into a mechanical algebraic procedure.</p>

**Floor 1 (Concrete):**
<p>Find the maximum area of a rectangle with perimeter 20 m. Let sides be x and y. 2x + 2y = 20 → y = 10 − x. Area A = xy = x(10−x) = 10x − x². Differentiate: dA/dx = 10 − 2x. Set to zero: 10 − 2x = 0 → x = 5. Then y = 5. The rectangle is a square. Area = 25 m². Test: d²A/dx² = −2 < 0 → maximum ✓. Now find the minimum surface area of a cylindrical can of volume 1 L (1000 cm³). V = πr²h = 1000 → h = 1000/(πr²). Surface area S = 2πr² + 2πrh = 2πr² + 2πr(1000/(πr²)) = 2πr² + 2000/r. Differentiate: dS/dr = 4πr − 2000/r². Set to zero: 4πr = 2000/r² → r³ = 500/π → r = (500/π)^(1/3) ≈ 5.42 cm. h = 1000/(πr²) ≈ 10.84 cm. The most material-efficient can has height equal to its diameter (h = 2r). Thompson: the method is always the same — write the quantity to optimise as a function of one variable, differentiate, set to zero, verify with the second derivative. The applications change; the algorithm doesn't.</p>

**Floor 2 (Definition):**
<p><strong>Thompson's method for maxima and minima:</strong> (1) Express the quantity Q to be maximised or minimised as a function of ONE variable — eliminate all other variables using the constraints. (2) Differentiate: find dQ/dx. (3) Set dQ/dx = 0 and solve for x — these are the <strong>critical points</strong>. (4) Determine the nature of each critical point: (a) <strong>Second derivative test</strong>: d²Q/dx² < 0 → maximum; d²Q/dx² > 0 → minimum; d²Q/dx² = 0 → inconclusive. (b) <strong>First derivative sign change</strong>: dQ/dx goes + → − → maximum; − → + → minimum. (5) Check endpoints if the domain is bounded. (6) State the maximum/minimum value by plugging x back into the original function. Works for any differentiable function.</p>

**Floor 3 (In action):**
<p>Maxima and minima are the practical payoff of differentiation. BB 21 (maxima/minima): the peak of a projectile — dy/dt=0 at the top. BB 192 (projectile range): R = u² sin 2θ / g. To maximise R: dR/dθ = u²/g × 2 cos 2θ = 0 → cos 2θ = 0 → 2θ = 90° → θ = 45°. The second derivative confirms maximum. BB 274 (Carnot cycle): the maximum theoretical efficiency is derived, not just stated — η = 1 − T_c/T_h is the result of maximising work output for given reservoir temperatures. BB 208 (power transfer): maximum power to a load occurs when load resistance equals internal resistance — found by differentiating P = E²R/(R+r)² with respect to R. Thompson's method — differentiate, set to zero, test — is the universal optimization algorithm. Once you've done it for area, volume, range, power, and efficiency, the pattern is internalised. The problem changes; the derivative doesn't care.</p>

**Image prompt:** A chalk drawing of a curve with a peak and a trough. At the peak: tangent is horizontal, labelled "dy/dx = 0, d²y/dx² < 0." At the trough: tangent horizontal, labelled "dy/dx = 0, d²y/dx² > 0." Below: the algorithm in four boxes — "1. Express in one variable. 2. Differentiate. 3. Set to zero. 4. Test." Chalk on dark green board. Square 1:1.

---

## BB-NEW-426 — Integration as anti-differentiation: the reverse gear

**Subject:** maths | **Topic:** problem-solving | **Concept:** integration; anti-differentiation; reverse-power-rule; Thompson | **Ground:** g0 | **Builds on:** [BB-NEW-424, BB-NEW-22]

**Floor 0 (Idea):**
<p>Thompson taught integration as simply "the reverse of differentiation." If differentiating x³ gives 3x², then integrating 3x² should give x³ (plus a constant). The integral is the anti-derivative. The power rule in reverse: ∫ xⁿ dx = xⁿ⁺¹/(n+1) + C (for n ≠ −1). Add one to the exponent, divide by the new exponent. The "+ C" is the constant of integration — because the derivative of any constant is zero, the anti-derivative is only determined up to an additive constant. Thompson: "Just as multiplication and division are inverse operations, so differentiation and integration are inverse operations. What one does, the other undoes."</p>

**Floor 1 (Concrete):**
<p>Integrate: ∫ 3x² dx. Reverse the power rule: add 1 to the exponent (2→3), divide by the new exponent (3/3=1): x³ + C. Check by differentiating: d(x³)/dx = 3x² ✓. ∫ 5x⁴ dx = 5 × x⁵/5 + C = x⁵ + C ✓. ∫ √x dx = ∫ x^(1/2) dx = x^(3/2)/(3/2) + C = (2/3)x^(3/2) + C ✓. ∫ 1/x² dx = ∫ x⁻² dx = x⁻¹/(−1) + C = −1/x + C ✓. The exception: ∫ 1/x dx = ln|x| + C (power rule would give x⁰/0 — undefined). For definite integrals (with limits): ∫ₐᵇ f(x) dx = F(b) − F(a), where F is any anti-derivative of f. ∫₀² 3x² dx = [x³]₀² = 8 − 0 = 8. This is the area under y = 3x² from x=0 to x=2. The anti-derivative method is vastly simpler than summing rectangles. The Fundamental Theorem of Calculus (FTC) guarantees that the anti-derivative gives the area. Thompson: "The area is the inverse of the slope."</p>

**Floor 2 (Definition):**
<p><strong>Integration as anti-differentiation</strong>: ∫ f(x) dx = F(x) + C, where F'(x) = f(x). The <strong>reverse power rule</strong>: ∫ xⁿ dx = <strong>xⁿ⁺¹/(n+1) + C</strong> (n ≠ −1). Special case: ∫ x⁻¹ dx = ∫ 1/x dx = ln|x| + C. The <strong>Fundamental Theorem of Calculus</strong>: ∫ₐᵇ f(x) dx = F(b) − F(a). Integration is linear: ∫ (af + bg) = a∫f + b∫g. The constant C is determined by an initial or boundary condition — a specific point the function must pass through. Thompson's integration toolkit: reverse power rule, logarithmic integral, exponential integral (∫ eˣ dx = eˣ + C), trigonometric integrals (∫ sin x dx = −cos x + C, ∫ cos x dx = sin x + C).</p>

**Floor 3 (In action):**
<p>Integration as anti-differentiation is used throughout our physics BBs. BB 22 (integration intro): the area under v(t) gives displacement — integrate velocity to get position. BB 170 (differentiating vectors): the relationship is bidirectional — differentiate position to get velocity, integrate acceleration to get velocity. BB 44 (work-energy theorem): W = ∫ F dx — the work is the integral of force over distance. For a spring, F = kx, so W = ∫₀ˣ kx dx = ½kx². Starting from rest, ½mv² = ½kx² — energy conservation. BB 216 (RC circuit): the capacitor voltage V(t) is found by solving dV/dt = −V/RC — a differential equation whose solution V = V₀e^(−t/RC) is found by integration. Thompson's approach — integration is just differentiation backwards — demystifies the integral sign. ∫ is not a mysterious symbol; it's the "anti-d" — what function, when differentiated, gives this? The anti-derivative mindset turns integration from a geometric puzzle into an algebraic search: "I need a function whose derivative is 3x². That's x³. Done."</p>

**Image prompt:** A chalk drawing of the differentiation arrow (x³ → 3x²) and, beside it, the integration arrow going the opposite direction (3x² → x³ + C). Below: the reverse power rule ∫ xⁿ dx = xⁿ⁺¹/(n+1) + C. A note: "Integration = anti-differentiation. Find the function whose derivative is the given one." Chalk on dark green board. Square 1:1.

---

## BB-NEW-427 — The chain rule intuitively: a function of a function

**Subject:** maths | **Topic:** problem-solving | **Concept:** chain-rule; function-of-function; intuitive-differentiation; Thompson | **Ground:** g0 | **Builds on:** [BB-NEW-424, BB-NEW-401]

**Floor 0 (Idea):**
<p>Thompson's "dodge" for the chain rule: differentiate y = (x²+1)⁵. Let u = x²+1 — the "inner function." Then y = u⁵ — the "outer function." By the power rule, dy/du = 5u⁴. And du/dx = 2x. The chain rule says: dy/dx = (dy/du) × (du/dx) = 5u⁴ × 2x = 10x(x²+1)⁴. The du's "cancel" — treating derivatives as fractions is technically an abuse of notation, but it's physically correct (they are limits of genuine fractions dy/du and du/dx) and it makes the chain rule unforgettable. Thompson: "A function of a function — differentiate the outer, keeping the inner unchanged, then multiply by the derivative of the inner."</p>

**Floor 1 (Concrete):**
<p>Differentiate y = sin(x³). Inner u = x³. Outer y = sin u. dy/du = cos u. du/dx = 3x². dy/dx = cos(x³) × 3x² = 3x² cos(x³). Differentiate y = e^(2x+1). Inner u = 2x+1. Outer y = eᵘ. dy/du = eᵘ. du/dx = 2. dy/dx = 2e^(2x+1). Differentiate y = ln(cos x). Inner u = cos x. Outer y = ln u. dy/du = 1/u. du/dx = −sin x. dy/dx = (1/cos x)(−sin x) = −tan x. Differentiate y = √(x²+1). Write as y = (x²+1)^(1/2). Inner u = x²+1. dy/dx = ½(x²+1)^(−1/2) × 2x = x/√(x²+1). The pattern is always: (1) Identify the inner function. (2) Differentiate the outer function with respect to the inner — treat the inner as a single variable. (3) Multiply by the derivative of the inner. Every example follows the same two-step dance. The only skill is recognising where the inner function starts and ends.</p>

**Floor 2 (Definition):**
<p>The <strong>chain rule</strong>: if y = f(g(x)) — "y is a function of g, which is a function of x" — then <strong>dy/dx = f'(g(x)) × g'(x)</strong>. In Leibniz notation: dy/dx = (dy/du)(du/dx), where u = g(x). Thompson's version: "Differentiate the outer function with respect to the inner function (as if the inner were a single variable), then multiply by the derivative of the inner function." The chain rule can be applied repeatedly for deeper nesting: y = f(g(h(x))) → dy/dx = f'(g(h(x))) × g'(h(x)) × h'(x). The chain rule is arguably the most important differentiation rule — combined with the power rule, it handles the vast majority of functions encountered in first-year calculus and physics.</p>

**Floor 3 (In action):**
<p>The chain rule is the secret engine behind many of our BBs. BB 19 (dy/dx): if position is s = 2.5t², velocity v = ds/dt = 5t — this is the power rule, but it's also the chain rule in its simplest form (inner = t, derivative = 1, invisible). BB 170 (vector differentiation): differentiating r⃗(t) component by component is the chain rule applied to each coordinate. BB 186 (trig transformations): differentiating y = sin(2x+30°) uses the chain rule — outer = sin, inner = 2x+30°, dy/dx = 2 cos(2x+30°). BB 136 (exponential model): differentiating A = A₀e^(kt) gives dA/dt = kA₀e^(kt) = kA — the chain rule with inner = kt. Thompson's dodge mentality — "let u = the inner function, then multiply by du/dx" — makes the chain rule feel like common sense rather than a rule to memorise. It IS common sense: a small change in x produces a small change in u (by du/dx), which produces a small change in y (by dy/du). The total effect is the product. That's the chain rule. That's it.</p>

**Image prompt:** A chalk drawing of the chain rule as a two-step machine: an input x enters, is transformed by g into u, then u is transformed by f into y. Below: dy/dx = (dy/du)(du/dx). Three worked examples in columns: (x²+1)⁵ → 10x(x²+1)⁴, sin(x³) → 3x² cos(x³), e^(2x+1) → 2e^(2x+1). Chalk on dark green board. Square 1:1.

---

# Part 7 — Problem Type Recognition

---

## BB-NEW-428 — Problems to find vs problems to prove: two different mindsets

**Subject:** general | **Topic:** problem-solving | **Concept:** find-vs-prove; problem-classification; Polya-distinction | **Ground:** g0 | **Builds on:** [BB-NEW-400, BB-NEW-402]

**Floor 0 (Idea):**
<p>Polya makes a fundamental distinction: "problems to find" and "problems to prove." A problem to find asks: "What is the value of x?" or "Find the acceleration." The answer is a number, an expression, a quantity. A problem to prove asks: "Show that these two triangles are congruent" or "Prove that the sum of angles in a triangle is 180°." The answer is a logical argument. The two types require different mindsets. Find-problems are solved by working forward from data or backward from the unknown. Prove-problems are solved by connecting hypothesis to conclusion through a chain of logical deductions — often with the help of auxiliary elements and reductio ad absurdum.</p>

**Floor 1 (Concrete):**
<p><strong>Find-problem:</strong> "A ball is thrown upward at 20 m/s. How high does it go?" Data: u=20, a=−g=−9.8, v=0 at the top. Unknown: s. Equation: v² = u² + 2as → 0 = 400 − 19.6s → s = 20.4 m. The solution is a number. The method is: identify the right equation, plug in, solve. <strong>Prove-problem:</strong> "Prove that the range of a projectile is maximised at 45°." Hypothesis: R = (u² sin 2θ)/g. Conclusion: R is maximised when θ=45°. Proof: differentiate with respect to θ — dR/dθ = (u²/g)(2 cos 2θ). Set to zero: cos 2θ = 0 → 2θ = 90° → θ = 45°. Second derivative: d²R/dθ² = (u²/g)(−4 sin 2θ) — at θ=45°, sin 90°=1 → negative → maximum. The solution is a chain of reasoning: R depends on θ → derivative → set to zero → solve → verify max → QED. Both problems involve the same physics, but the find-problem asks for a value, the prove-problem asks for a justification. The strategies differ. The find-problem uses the given equation directly. The prove-problem must derive an optimal condition.</p>

**Floor 2 (Definition):**
<p><strong>Problems to find</strong> have: (1) Data (given quantities). (2) Unknown (what you must find). (3) Condition (the equation or relationship linking them). Strategy: work forward from the data, or backward from the unknown, until they connect. <strong>Problems to prove</strong> have: (1) Hypothesis (the "if" part — what is assumed). (2) Conclusion (the "then" part — what must be shown). Strategy: transform the hypothesis using known theorems and definitions until the conclusion emerges. Key difference: in find-problems, the "answer" is a quantity; in prove-problems, the "answer" is a logical argument. Polya: "The solution of a problem to prove consists in finding a logical connection between the hypothesis and the conclusion."</p>

**Floor 3 (In action):**
<p>Our BBs contain both types. Find-problems: BB 220 (how many moles?), BB 314 (where is the image?), BB 265 (final temperature?), BB 141 (solve 7ˣ=20). Prove-problems: BB 187 (prove sin²θ+cos²θ=1), BB 144 (prove exponential dominates polynomial), BB 273 (prove perpetual motion is impossible — the second law), BB 422 (prove √2 is irrational). The distinction matters because students often approach prove-problems with the wrong mindset — trying to "find the answer" rather than "build the argument." A prove-problem solved by plugging into a formula is not a proof; it's a verification. The proof requires starting from the hypothesis and deriving the conclusion through valid steps. Recognising which type of problem you're facing is the first decision in your strategy. Polya: "The nature of the problem suggests the nature of the solution."</p>

**Image prompt:** A chalk drawing of two doors. Left door: "PROBLEMS TO FIND" — a treasure chest (the unknown quantity), a map (the condition), a compass (working forward/backward). Right door: "PROBLEMS TO PROVE" — a chain of logical links from Hypothesis to Conclusion, with auxiliary constructions and reductio marked along the chain. Chalk on dark green board. Square 1:1.

---

## BB-NEW-429 — Signs of progress: how to know you're getting warmer

**Subject:** general | **Topic:** problem-solving | **Concept:** signs-of-progress; intermediate-results; direction-indicators; Polya | **Ground:** g0 | **Builds on:** [BB-NEW-402, BB-NEW-412]

**Floor 0 (Idea):**
<p>You're in the middle of a long problem. You've written some equations, made some substitutions. You're not stuck, but you're not sure you're on the right path. Polya offers "signs of progress" — indicators that tell you whether your approach is working. The solution is becoming more organised, not more chaotic. The expressions are simplifying, not complicating. You can see how the data connects to the unknown, even if the connection isn't complete yet. You've used more of the given data. The remaining gap is smaller than when you started. Progress is not binary — it has a direction. Learn to read the signs.</p>

**Floor 1 (Concrete):**
<p>Problem: simplify (x⁴−16)/(x²−4). First attempt: try to factor x⁴−16 as (x²−4)(x²+4). That works — it's a difference of squares applied twice. The expression becomes (x²−4)(x²+4)/(x²−4) = x²+4 (for x²≠4). Sign of progress: the expression dramatically simplified — from a quartic-over-quadratic to a simple quadratic. That's a good sign. Second attempt (wrong path): try polynomial long division. Much messier — signs of regress. The work gets more complicated instead of simpler. Abandon that path. Problem: solve 2^(x+1) = 8^(x−2). First attempt: write 8 = 2³, so 8^(x−2) = (2³)^(x−2) = 2^(3x−6). Now the equation is 2^(x+1) = 2^(3x−6). Since the bases are equal, x+1 = 3x−6 → 7 = 2x → x = 3.5. Sign of progress: the equation reduced from "different bases" to "same base → equate exponents" to a simple linear equation. Each step simplified the structure. That's a clear positive signal.</p>

**Floor 2 (Definition):**
<p><strong>Polya's signs of progress:</strong> (1) <strong>Simplification</strong> — the expressions are getting simpler, not more complex. (2) <strong>Structure emergence</strong> — the problem is revealing its underlying form (a quadratic, a known identity, a standard integral). (3) <strong>Closer connection</strong> — the gap between data and unknown is visibly shrinking. (4) <strong>More data used</strong> — you've incorporated previously unused conditions. (5) <strong>Symmetry exploitation</strong> — you've found and used a symmetry that reduces the work. (6) <strong>Sub-problems solved</strong> — you've broken off a piece and solved it independently. <strong>Signs of regress</strong> (abandon the path): algebraic expressions bloating, fractions becoming nested, the number of terms multiplying, you're introducing more variables than you're eliminating, you've stopped using the problem's given structure.</p>

**Floor 3 (In action):**
<p>Signs of progress are the problem-solver's inner compass. In BB 282 (Atwood machine): you write two F=ma equations. The expressions contain T — an unwanted intermediate. Sign of progress: you realise you can ADD the equations to eliminate T. The T disappears. The expression simplifies to a = g(m₂−m₁)/(m₂+m₁). Each step removed complexity. In BB 207 (mixed circuits): you identify a parallel pair. Reduce it to a single equivalent resistance. The circuit has fewer components. Sign of progress. You repeat. Fewer still. Eventually one resistor. Done. In BB 120 (quadratics): you try to factor x²+7x+12. You test factor pairs of 12: (3,4) → sum=7 ✓. Sign of progress: the factors work. The equation becomes (x+3)(x+4)=0. Solutions drop out. In Thompson's *Calculus Made Easy*, every worked example shows signs of progress: after substitution, the integral matches a standard form. After applying the chain rule, the derivative is in its simplest form. After maximising, the second derivative confirms. Progress leaves traces. Learn to read them, and you'll waste less time on dead ends.</p>

**Image prompt:** A chalk drawing of a path through a foggy landscape. Signposts along the path: "Expression simplifying ✓," "Structure emerging ✓," "More data used ✓," "Gap shrinking ✓." A fork in the road: one path goes uphill into thicker fog ("Expressions bloating ✗"), the other downhill into clarity. Below: "Polya: learn to read the signs of progress." Chalk on dark green board. Square 1:1.

---

## BB-NEW-430 — Pattern libraries: building your mental catalogue of solved forms

**Subject:** general | **Topic:** problem-solving | **Concept:** pattern-recognition; mental-library; solved-forms; template-matching | **Ground:** g0 | **Builds on:** [BB-NEW-405, BB-NEW-408]

**Floor 0 (Idea):**
<p>Expert problem-solvers don't derive everything from first principles. They recognise patterns. "This is an Atwood machine." "This is a quadratic in disguise." "This is a standard integral — ∫ 1/(x²+a²) dx = (1/a)tan⁻¹(x/a)." These recognitions come from a mental library built through practice. Each solved problem adds a template to the library. Each new problem is compared against the library: "Have I seen something like this before?" The larger your library, the faster you solve — because you're recognising rather than reinventing. Polya: "Have you seen it before? Or have you seen the same problem in a slightly different form?"</p>

**Floor 1 (Concrete):**
<p>Solve: ∫ dx/(x²+4). Pattern library: this matches ∫ dx/(x²+a²) = (1/a)tan⁻¹(x/a) + C. Here a=2. Answer: (1/2)tan⁻¹(x/2) + C. Without the template, you'd need a trigonometric substitution. With it, the answer is instantaneous. Solve: x⁴ − 5x² + 4 = 0. Pattern library: this is a quadratic in disguise. Let y = x². y² − 5y + 4 = 0 → (y−1)(y−4)=0 → y=1,4 → x=±1,±2. Solve: differentiate f(x) = x²eˣ. Pattern library: this is a product — use the product rule. f'(x) = 2x·eˣ + x²·eˣ = x eˣ(2+x). Each of these solutions was a pattern match before it was a calculation. The library entry was loaded, the template was applied, the specific numbers were substituted. The template does 90% of the intellectual work. The specific numbers do the remaining 10%.</p>

**Floor 2 (Definition):**
<p>Building a <strong>pattern library</strong>: (1) After solving a problem, REFLECT on its structure — don't just check the answer. (2) Ask: "What TYPE of problem was this? What made it solvable?" (3) Abstract the template: "∫ 1/(x²+a²) → (1/a)tan⁻¹(x/a)." Not "∫ 1/(x²+4) → (1/2)tan⁻¹(x/2)." The general, not the specific. (4) Create cross-references: "This is structurally similar to that problem I solved last week." The library entries should be organised by: equation form (quadratic, linear, exponential), problem type (optimization, related rates, area), and technique (substitution, integration by parts, separation of variables). The library grows with every solved problem — IF you reflect after solving. Solve without reflecting = no library growth. Solve + reflect = one new template.</p>

**Floor 3 (In action):**
<p>Every BB in our deck is a template for the library. BB 282 (Atwood machine): template = "two masses, string, pulley → write F=ma for each, eliminate T, solve for a." BB 281 (inclined plane): template = "block on slope → resolve mg into sin and cos, N = mg cos θ, friction along slope, ΣF=ma." BB 314 (mirror formula): template = "1/f = 1/v + 1/u, sign conventions, m = −v/u." BB 221 (empirical formula): template = "% → g → mol → ratio → empirical formula → n = M/molecular → molecular formula." Each BB is explicitly or implicitly a template. The entire problem-solving course (BB 400–435) is designed to make template extraction conscious: "After solving this, what's the general method?" The student who builds their library deliberately — who stops after each solved problem to say "this is an instance of X" — will outpace the student who solves twice as many problems but never reflects. The library is the difference between 1000 isolated facts and one organised structure. Templates are the compression algorithm of expertise.</p>

**Image prompt:** A chalk drawing of a library with labelled shelves: "Quadratics," "Trig Integrals," "Atwood Variants," "Inclined Planes," "Circuit Reduction," "Empirical Formulas." A figure pulls a book from the "Quadratics" shelf — the book cover shows x²+bx+c=0 → (x+p)(x+q). Below: "Every solved problem = one template for the library. Reflect to file it. Recognise to retrieve it." Chalk on dark green board. Square 1:1.

---

## BB-NEW-431 — Estimation and Fermi problems: the art of being roughly right

**Subject:** general | **Topic:** problem-solving | **Concept:** estimation; Fermi-problems; order-of-magnitude; approximation | **Ground:** g0 | **Builds on:** [BB-NEW-421, BB 90, BB-NEW-114]

**Floor 0 (Idea):**
<p>"How many piano tuners are there in Chicago?" Enrico Fermi asked his students this question — not to get an exact answer, but to teach estimation. Break the problem into pieces you CAN estimate: population of Chicago (~3 million), households (~1 million), fraction owning pianos (~1/20 → 50,000 pianos), tunings per piano per year (~1), tunings per tuner per year (~200 working days × 2/day = 400), number of tuners = 50,000/400 ≈ 125. The actual number is about 150. Fermi was within 20% using only rough estimates. Estimation is the art of being approximately right rather than precisely wrong. Thompson's "negligibly small" — discarding (dx)² terms — is estimation at the infinitesimal scale.</p>

**Floor 1 (Concrete):**
<p>Estimate the number of heartbeats in a human lifetime. Average heart rate: ~70 beats/min. Minutes in a year: 60 × 24 × 365 ≈ 525,600. Heartbeats per year: 70 × 525,600 ≈ 3.68 × 10⁷. Average lifespan: ~75 years. Total: 3.68×10⁷ × 75 ≈ 2.8 × 10⁹ — about 3 billion heartbeats. This estimate is within ~20% of the accepted figure. Estimate the mass of the Earth's atmosphere. Surface area: 4πR² ≈ 4 × 3.14 × (6.37×10⁶)² ≈ 5.1 × 10¹⁴ m². Atmospheric pressure: ~10⁵ Pa = 10⁵ N/m². Weight of atmosphere = pressure × area ≈ 5.1 × 10¹⁹ N. Mass = weight/g ≈ 5.2 × 10¹⁸ kg. The actual mass is ~5.15 × 10¹⁸ kg. The estimate is within 1%. Estimation works because errors in different pieces tend to cancel — some overestimates, some underestimates — and the product of rough numbers often lands close to the truth. This is the central insight of Fermi problems.</p>

**Floor 2 (Definition):**
<p><strong>Fermi estimation method:</strong> (1) Break the unknown quantity into pieces you CAN estimate. (2) Estimate each piece to the nearest order of magnitude (power of 10) or with one significant digit. (3) Combine the pieces to get the answer. (4) Check: does the answer make sense? Is it within an order of magnitude of plausibility? <strong>Key estimation tools:</strong> (a) Round aggressively — 3.14 → 3, 9.8 → 10. (b) Use powers of 10 for very large/small numbers. (c) Remember common benchmarks: world population ~8×10⁹, Earth radius ~6.4×10⁶ m, speed of light 3×10⁸ m/s, 1 year ≈ π×10⁷ seconds. (d) Errors multiply — if two estimates are each within a factor of 2, the product is within a factor of 4. <strong>Thompson's approximation principle:</strong> when a quantity is small compared to another, its square (or higher power) is "negligibly small." This is the mathematical basis for discarding (dx)² in differentiation and for truncating series expansions.</p>

**Floor 3 (In action):**
<p>Estimation is the physicist's first tool. BB 90 (order of magnitude): the mass of an electron (10⁻³⁰ kg) vs a galaxy (10⁴¹ kg) — the exponent IS the information. BB 114 (estimation and number sense): 98 × 53 ≈ 100 × 50 = 5000 — the estimate catches calculator errors. BB 263 (specific heat): Q = mcΔT — before calculating, estimate: 2 kg water from 20°C to 100°C should take about 2×4000×80 ≈ 640 kJ. The exact answer is 669 kJ — estimate within 5%. BB 274 (Carnot efficiency): T_h=873 K, T_c=373 K → η ≈ 1 − 0.43 = 57%. The second law says this is the absolute ceiling — no engine can exceed it. Before designing an engine, estimate its theoretical limit. In Thompson's calculus, every application of the "dodge" uses estimation: (dx)² is "a small quantity of the second order of smallness" — negligible compared to dx. This is not mathematical sloppiness; it's the insight that makes calculus work. The limit process formalises what Thompson's intuition captured: in the limit, the negligible terms vanish exactly. Estimation is not a compromise — it's often the only way to get an answer at all, and a good estimate is worth more than a bad exact calculation.</p>

**Image prompt:** A chalk drawing of a piano with a question mark — "How many piano tuners in Chicago?" Broken into boxes: Population (3M) → Households (1M) → Pianos (50k) → Tunings/year (50k) → Tunings/tuner (400) → Answer (~125). Below: "Fermi estimation: break it, estimate pieces, combine. Being roughly right beats being precisely wrong." Chalk on dark green board. Square 1:1.

---

# Part 8 — Mastery and Beyond

---

## BB-NEW-432 — Examine your guess: the hypothesis-testing loop

**Subject:** general | **Topic:** problem-solving | **Concept:** guess-and-check; hypothesis-testing; iterative-refinement; Polya | **Ground:** g0 | **Builds on:** [BB-NEW-403, BB-NEW-407]

**Floor 0 (Idea):**
<p>Polya: "Guessing is a respectable art." A good guess, tested and refined, is often the fastest path to a solution. The process is: guess → check → refine → repeat. If your guess satisfies all the conditions, you're done. If it violates some condition, the nature of the violation tells you how to adjust. This is the hypothesis-testing loop — the same method that drives the scientific method. In mathematics, it's trial and error elevated to a systematic technique. The key is not to guess randomly, but to make an educated guess — one that satisfies SOME of the conditions — and then fix what's wrong.</p>

**Floor 1 (Concrete):**
<p>Problem: find two numbers whose sum is 20 and product is 96. Guess: 10 and 10. Sum = 20 ✓. Product = 100 — too high by 4. Adjust: make one number larger and the other smaller while keeping the sum at 20. Try 12 and 8. Sum = 20 ✓. Product = 96 ✓. Done. The first guess satisfied the sum condition. The error in the product (off by 4) told us which direction to adjust. Problem: factor x² + 5x + 6. Guess: the factors are (x+?)(x+??). The constant term 6 suggests pairs (1,6) or (2,3). Guess (x+2)(x+3): expand → x²+5x+6 ✓. Guess confirmed. If we'd guessed (x+1)(x+6): x²+7x+6 — the x coefficient is 7, not 5. The error tells us: reduce the larger number, increase the smaller → (2,3). The hypothesis-testing loop is: propose a candidate solution → test it against the conditions → if it fails, use the failure pattern to generate a better candidate. Each cycle narrows the search space.</p>

**Floor 2 (Definition):**
<p><strong>Polya's "examine your guess" heuristic:</strong> (1) Make an <strong>educated guess</strong> — use partial information, analogy, or specialization to propose a candidate solution. (2) <strong>Test the guess</strong> against ALL the conditions of the problem. (3) If the guess satisfies all conditions, it's a solution — you're done. (4) If it fails, <strong>analyse the failure</strong>: which condition(s) does it violate? By how much? In which direction? (5) <strong>Refine the guess</strong> using the failure information. (6) Repeat until convergence. This is essentially the Newton–Raphson method in numerical analysis, the guess-and-check method in algebra, and the iterative design process in engineering. Polya: "A wise guess, tested and adjusted, is often the shortest road to the solution." The educated guess is not a shot in the dark — it's a hypothesis grounded in partial understanding, and the testing makes that understanding more complete.</p>

**Floor 3 (In action):**
<p>Guess-and-refine appears throughout our BBs. BB 118 (factorising): "Find two numbers that multiply to 12 and add to 7." Guess pairs: (1,12)→13, (2,6)→8, (3,4)→7 ✓. Each wrong guess eliminates possibilities and points toward the right one. BB 120 (quadratics): the quadratic formula x = [−b ± √(b²−4ac)]/2a is the endpoint of guess-and-refine — it solves the problem in one step. But the formula itself was discovered by completing the square on the general quadratic — a systematic refinement of the guess "x = something involving b and a." BB 265 (calorimetry): guess the final temperature. If the guess is too high, the hot water would need to lose more heat than the cold water can absorb — adjust down. BB 314 (mirror): guess whether the image is real or virtual based on object position relative to F. The sign convention then confirms or refutes. Thompson's *Calculus Made Easy* encourages this: "Guess the derivative before calculating." For y = sin x, guess: it should be something periodic that peaks where sin peaks in slope — cos x. Then verify by the dodge. The guess is educated by understanding; the check makes the understanding rigorous. Guessing is not cheating — it's reasoning under uncertainty, which is what problem-solving always is.</p>

**Image prompt:** A chalk drawing of a target. An arrow labelled "Guess 1" misses to the left. Arrows labelled "Adjust" and "Guess 2" come closer. Finally, "Guess 3" hits the bullseye. Below: "Guess → Check → Analyse failure → Refine → Repeat. Polya: 'Guessing is a respectable art.'" Chalk on dark green board. Square 1:1.

---

## BB-NEW-433 — Pedantry vs mastery: Polya on deep understanding

**Subject:** general | **Topic:** problem-solving | **Concept:** mastery-vs-rote; deep-understanding; Polya-pedantry; transfer | **Ground:** g0 | **Builds on:** [BB-NEW-416, BB-NEW-408]

**Floor 0 (Idea):**
<p>Polya distinguishes between "pedantry" and "mastery." The pedant knows the rules and follows them rigidly — they can solve problems that exactly match the template. The master understands WHY the rules work, can adapt them to novel situations, and can explain their reasoning to others. The pedant solves 100 problems the same way; the master solves 10 problems in 5 different ways and extracts principles that solve 1000. The difference is not in the number of problems solved but in the depth of reflection on each. Polya: "Pedantry is the letter; mastery is the spirit."</p>

**Floor 1 (Concrete):**
<p>The pedant solves a projectile problem: "u=20, θ=30°, find the range." They plug into R = u² sin 2θ / g = 400 × sin 60° / 9.8 = 400 × 0.866 / 9.8 = 35.3 m. Correct answer. Next problem: "u=20, θ=30°, but launched from a 10 m cliff." The pedant is stuck — the range formula doesn't apply. The master recognises that the formula was derived for launch from ground level. They return to first principles: resolve velocity, write x = ut cos θ, y = 10 + ut sin θ − ½gt², set y=0, solve for t, find x. The master didn't memorise a cliff formula — they understood the method that generates ALL projectile solutions. The pedant has a formula; the master has a framework. The formula fails at the cliff; the framework doesn't. The pedant says "I haven't been taught this." The master says "This is just the same physics with a different initial condition."</p>

**Floor 2 (Definition):**
<p><strong>Polya's pedantry vs mastery:</strong> <strong>Pedantry</strong> — knowing rules and applying them mechanically. Works for routine problems; fails when the problem deviates from the template. Characterised by: memorising formulas without derivation, following procedures without understanding why they work, inability to adapt to novel situations, discomfort with "why" questions. <strong>Mastery</strong> — understanding principles and reasoning from them. Works for routine AND novel problems. Characterised by: deriving formulas from first principles when needed, adapting methods to new contexts, being able to explain the reasoning to others, comfort with multiple solution paths. The bridge from pedantry to mastery is REFLECTION — after solving, asking "Why did this work? What was the key step? How would I solve it differently? What if the conditions changed?"</p>

**Floor 3 (In action):**
<p>Every BB in our deck is designed to push toward mastery. The worked examples don't just show the answer — they show the reasoning. The cross-references connect methods across topics. The "Look back" step (BB 403) is the master's habit — "Can I derive this differently? Can I use this result elsewhere?" BB 295 (the complete mechanics toolkit) explicitly states that F=ma and τ=Iα are not separate topics but two halves of one framework — the master's view. BB 194 (rotation matrix) shows that the compound angle formulas and matrix multiplication are the same mathematics — the master sees the unity beneath the surface. Thompson's *Calculus Made Easy* is a manifesto for mastery over pedantry. He rages against textbooks that start with epsilon-delta definitions, calling them "the folly of trying to make the easy difficult." Instead, he starts with the dodge — the intuitive core — and builds outward. Mastery is not about knowing more formulas. It's about knowing WHY the formulas work, so you can reconstruct them when memory fails, adapt them when conditions change, and recognise them when they appear in disguise.</p>

**Image prompt:** A chalk drawing of two figures facing the same problem (a block on an unusual curved surface). Left figure (Pedant): holding a formula sheet, looking confused — "This isn't in the book." Right figure (Master): drawing an FBD, resolving forces, smiling — "Same physics. Different geometry." Below: "Pedantry is the letter. Mastery is the spirit. — Polya." Chalk on dark green board. Square 1:1.

---

## BB-NEW-434 — The problem-solving dialogue: asking yourself the right questions

**Subject:** general | **Topic:** problem-solving | **Concept:** self-dialogue; Socratic-method; internal-monologue; Polya-questions | **Ground:** g0 | **Builds on:** [BB-NEW-400, BB-NEW-402, BB-NEW-403]

**Floor 0 (Idea):**
<p>Polya's book is written as a dialogue — a teacher guiding a student through problems by asking questions. "What is the unknown?" "Have you seen a related problem?" "Can you check the result?" This is not just a pedagogical style. It's the internal dialogue that every skilled problem-solver runs silently in their head. You become your own teacher. When you're stuck, you ask yourself the same questions Polya would ask. The Socratic method, internalised, is the engine of independent problem-solving. The questions are the heuristics. Asking them of yourself is the skill.</p>

**Floor 1 (Concrete):**
<p>Internal dialogue during a problem: "A uniform beam of length 4 m and weight 200 N rests on two supports. A 600 N weight sits 1 m from the left end. Find the reactions." <em>What is the unknown?</em> R₁ and R₂. <em>What are the data?</em> L=4 m, W=200 N at 2 m, P=600 N at 1 m. <em>What is the condition?</em> Static equilibrium — ΣF=0, Στ=0. <em>Have I seen this before?</em> Yes — BB 285, the beam problem. <em>What made it solvable there?</em> I chose the left support as pivot — R₁ disappeared from the torque equation. <em>Let me try that.</em> Pivot at left support. Torques: W×2 + P×1 − R₂×4 = 0 → 200×2 + 600×1 = 4R₂ → R₂ = 250 N. Now ΣF=0: R₁ + 250 − 200 − 600 = 0 → R₁ = 550 N. <em>Can I check this?</em> Choose the RIGHT support as pivot. Torques: R₁×4 − W×2 − P×3 = 0 → 4R₁ = 400 + 1800 → R₁ = 550 N ✓. The internal dialogue wasn't rambling — it was structured. Each question had a purpose. Each answer moved the solution forward. The Polya questions are the scaffolding of independent thought.</p>

**Floor 2 (Definition):**
<p><strong>The Polya self-dialogue questions, organised by phase:</strong> <strong>Understanding:</strong> What is the unknown? What are the data? What is the condition? Is it possible to satisfy the condition? Draw a figure. Introduce suitable notation. <strong>Planning:</strong> Have you seen it before? Do you know a related problem? Can you restate the problem? Can you solve a simpler version? Can you introduce an auxiliary element? Can you work backwards? <strong>Executing:</strong> Is each step correct? Can you prove it? <strong>Looking back:</strong> Can you check the result? Can you check the reasoning? Can you derive it differently? Can you use the result or the method for another problem? The dialogue should become automatic — you ask the questions without thinking about asking them. This is the internalisation of the heuristics.</p>

**Floor 3 (In action):**
<p>This dialogue is the invisible structure behind every worked example in our BBs. When BB 287 solves the ladder problem, the text says "Choose the left support as the pivot" — that's the answer to "What auxiliary element would simplify this?" When BB 207 reduces a mixed circuit, the text says "First, the parallel pair" — that's the answer to "Can I decompose this into simpler sub-problems?" When BB 317 applies Snell's law, the text says "1.00 sin 45° = 1.33 sin θ₂" — that's the answer to "What equation links the data and the unknown?" The questions are the invisible scaffolding. The answers are the visible text. A student who reads the text passively gets the answer. A student who reconstructs the questions that led to the answer gets the method. The goal of the problem-solving course is to make the dialogue explicit — so readers can first follow it in the worked examples, then run it silently in their own heads, and eventually customise it with their own questions. The ultimate aim: to become your own Polya.</p>

**Image prompt:** A chalk drawing of a person with a thought bubble above their head. Inside the bubble, a smaller version of themselves asking questions: "What's the unknown?" "Seen this before?" "Simpler version?" "Check the units?" The thought-bubble figure is holding a solved problem. Below: "The internal dialogue — Polya's questions, asked of yourself." Chalk on dark green board. Square 1:1.

---

## BB-NEW-435 — Transfer: using today's solution on tomorrow's problem

**Subject:** general | **Topic:** problem-solving | **Concept:** transfer; cross-context-application; reusable-methods; meta-learning | **Ground:** g0 | **Builds on:** [BB-NEW-405, BB-NEW-408, BB-NEW-433]

**Floor 0 (Idea):**
<p>The ultimate test of understanding is transfer: can you apply what you learned in one context to a different context? The kinematics equations (v=u+at, s=ut+½at²) apply to a falling rock. They also apply — with different symbols — to a charging capacitor (V=V₀e^(−t/RC)), population growth, and Newton's law of cooling. The exponential function is the same; the variables have different names. The student who sees only the rock sees one problem. The student who sees the exponential sees a hundred problems unified by one structure. Transfer is the difference between learning topics and learning principles.</p>

**Floor 1 (Concrete):**
<p>The exponential function eˣ appears in: radioactive decay (N = N₀e^(−λt) — BB 135), RC circuits (V = V₀e^(−t/RC) — BB 216), compound interest (A = Pe^(rt) — BB 133), population growth (P = P₀e^(kt) — BB 134), Newton's law of cooling (T−T_ambient = (T₀−T_ambient)e^(−kt) — thermodynamics), and atmospheric pressure with altitude. Five different topics. One equation: Q(t) = Q₀e^(kt). The structure is identical: the rate of change of the quantity is proportional to the quantity itself. The method for solving ANY such problem is identical: find Q₀, find k (from two data points or from the half-life/time constant), plug into the equation. The student who recognises the exponential template solves problems in five different subjects with one method. The student who treats each as a separate formula memorises five sets of symbols and five procedures. Transfer is the ultimate efficiency.</p>

**Floor 2 (Definition):**
<p><strong>Transfer</strong> is the application of knowledge, skills, or methods learned in one context to a different context. <strong>Near transfer</strong>: applying the same method to a very similar problem (e.g., one inclined plane problem to another). <strong>Far transfer</strong>: applying a principle across different subjects (e.g., the exponential function in biology, physics, and finance). Transfer is facilitated by: (1) <strong>Abstracting the template</strong> — focusing on the STRUCTURE, not the surface features. (2) <strong>Identifying analogies</strong> — "this RC circuit is structurally identical to that cooling problem." (3) <strong>Using consistent notation across contexts</strong> — or deliberately varying notation to test understanding. (4) <strong>Solving varied problems</strong> that share deep structure but differ in surface features. Transfer doesn't happen automatically — it must be practised deliberately.</p>

**Floor 3 (In action):**
<p>Transfer is the organising principle behind many of our cross-references. The translation-rotation analogy (BB 405) is a deliberate transfer scaffold — every translational concept has a rotational twin. BB 216 (RC circuits) explicitly connects the exponential charge/discharge to radioactive decay (BB 135) and population growth (BB 134). BB 142 (logarithmic scales) connects pH, Richter, decibels, and stellar magnitudes — four different fields, one log scale. BB 295 (complete mechanics toolkit) shows that F=ma and τ=Iα are instances of the same pattern: net influence = inertia × acceleration. Thompson's *Calculus Made Easy* teaches transfer by example: after teaching the chain rule on (x²+1)⁵, he immediately applies it to sin(x³), e^(2x+1), and ln(cos x). The surface changes; the method doesn't. Polya's entire heuristic dictionary is a transfer toolkit — each heuristic (working backwards, drawing a figure, decomposing) transfers across every subject. The ultimate goal of education is not to fill a mind with facts but to build a mind that transfers — that sees the abstract structure beneath the concrete surface and applies yesterday's solution to today's problem in tomorrow's disguise.</p>

**Image prompt:** A chalk drawing of a central equation "Q(t) = Q₀e^(kt)" with radiating arrows to different contexts: a radioactive atom (decay), an RC circuit, a population graph, a cup of coffee (cooling), a banknote (compound interest). Each context shows the same equation with different variable names. Below: "Transfer — one structure, many disguises. The method transfers. Only the symbols change." Chalk on dark green board. Square 1:1.

---

## Summary

### Part 5 — Advanced Polya Heuristics (4 BBs)
| # | Title | Core idea |
|---|-------|----------|
| 420 | Setting up equations | Words → symbols. The translation IS the solution |
| 421 | Test by dimension | 5-second error detector. Dimensions must match |
| 422 | Reductio ad absurdum | Assume the opposite → derive contradiction → original is true |
| 423 | The inventor's paradox | The more ambitious plan may be easier |

### Part 6 — Thompson's Calculus Toolkit (4 BBs)
| # | Title | Core idea |
|---|-------|----------|
| 424 | The power rule | d(xⁿ)/dx = nxⁿ⁻¹ — the atomic operation of differentiation |
| 425 | Maxima and minima | Differentiate → set to zero → test. Universal optimizer |
| 426 | Integration as anti-differentiation | ∫ xⁿ dx = xⁿ⁺¹/(n+1) + C. Reverse the power rule |
| 427 | The chain rule | dy/dx = (dy/du)(du/dx). Function of a function |

### Part 7 — Problem Type Recognition (4 BBs)
| # | Title | Core idea |
|---|-------|----------|
| 428 | Find vs prove | Two problem types, two different strategies |
| 429 | Signs of progress | Simplification, structure emergence, gap shrinking |
| 430 | Pattern libraries | Build a mental catalogue of solved forms |
| 431 | Estimation and Fermi problems | Break it, estimate pieces, be roughly right |

### Part 8 — Mastery and Beyond (4 BBs)
| # | Title | Core idea |
|---|-------|----------|
| 432 | Examine your guess | Guess → check → analyse failure → refine → repeat |
| 433 | Pedantry vs mastery | Formulas vs frameworks. The letter vs the spirit |
| 434 | The problem-solving dialogue | Internalise Polya's questions — become your own teacher |
| 435 | Transfer | One structure, many disguises. The method transfers |

**16 BBs.** Combined with Batch 1 (BB 400–416), the complete problem-solving course is **32 BBs** — Polya's entire heuristic dictionary and Thompson's entire calculus toolkit, applied to the existing Strata/Qubix content BBs. Every heuristic is demonstrated on problems the reader has already studied, creating a deliberate practice loop: learn the heuristic → apply it to familiar material → recognise where it transfers.
