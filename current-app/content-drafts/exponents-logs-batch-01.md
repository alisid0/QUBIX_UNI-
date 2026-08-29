# Exponents & Logarithms — Complete Course (15 BBs)

A comprehensive introduction to exponential functions, the number e, exponential growth and decay, logarithms as the inverse operation, logarithmic laws, solving exponential equations, logarithmic scales, and the logistic curve. Designed as a 1-hour+ learning sequence. Builds on the indices foundations from BB-NEW-122 (foundations-maths-batch-01).

---

# Part 1 — Beyond basic indices

---

## BB-NEW-130 — Indices revisited: the full rulebook

**Subject:** maths | **Topic:** exponents | **Concept:** index-laws; negative-exponent; fractional-exponent; surds | **Ground:** g0 | **Builds on:** [BB-NEW-122]

**Floor 0 (Idea):**
<p>Before we go further, we need the full toolkit. Indices aren't just a shorthand — they're a language that unifies repeated multiplication, division, roots, and reciprocals under one set of rules. If you understand that x^(1/2) = √x and x⁻¹ = 1/x, then roots and fractions are not separate operations — they're the same operation with different exponents.</p>

**Floor 1 (Concrete):**
<p>Compute 8^(2/3). The denominator 3 means "cube root": ∛8 = 2. The numerator 2 means "square it": 2² = 4. So 8^(2/3) = 4. Order doesn't matter — cube first then square, or square first then cube root, same result. Compute 27^(-2/3): 27^(1/3) = 3, 3² = 9, the negative flips it → 1/9. Compute (16^(1/4))³: fourth root of 16 is 2, 2³ = 8. These are not separate tricks — they all follow from the same index laws, applied in sequence.</p>

**Floor 2 (Definition):**
<p>The seven laws of indices, restated for completeness: For a, b ∈ ℝ and nonzero base x: (1) xᵃ·xᵇ = xᵃ⁺ᵇ. (2) xᵃ/xᵇ = xᵃ⁻ᵇ. (3) (xᵃ)ᵇ = xᵃᵇ. (4) x⁰ = 1 (x ≠ 0). (5) x⁻ᵃ = 1/xᵃ. (6) x^(1/n) = ⁿ√x. (7) x^(m/n) = ⁿ√(xᵐ) = (ⁿ√x)ᵐ. Also: (xy)ᵃ = xᵃyᵃ and (x/y)ᵃ = xᵃ/yᵃ. These laws work for any real exponent.</p>

**Floor 3 (In action):**
<p>Simplify (4x²y⁻³) / (2x⁻¹y²). Handle coefficients: 4/2 = 2. Handle x: x²/x⁻¹ = x²⁻⁽⁻¹⁾ = x³. Handle y: y⁻³/y² = y⁻³⁻² = y⁻⁵. Result: 2x³y⁻⁵ = 2x³/y⁵. Every simplification in algebra that involves powers — and there are many — uses these laws. They're not memorisation for its own sake; they're the reliable machinery that turns messy expressions into clean ones.</p>

**Image prompt:** A chalk drawing of the seven index laws in a grid, each with a small numeric example. Below, a worked simplification: (4x²y⁻³)/(2x⁻¹y²) → 2x³/y⁵, step by step with exponents highlighted. Chalk on dark green board. Square 1:1.

---

## BB-NEW-131 — The exponential function: when the variable goes upstairs

**Subject:** maths | **Topic:** exponents | **Concept:** exponential-function; y=a^x; growth-curve; asymptote | **Ground:** g0 | **Builds on:** [BB-NEW-130]

**Floor 0 (Idea):**
<p>In a polynomial like x², the variable is the base and the exponent is fixed. In an exponential function like 2ˣ, the variable is the exponent. This swap changes everything. Polynomials grow; exponentials explode. A line climbs steadily. A parabola climbs faster. But 2ˣ doubles every time x increases by 1 — and doubling forty times takes you from 1 to over a trillion.</p>

**Floor 1 (Concrete):**
<p>Plot y = 2ˣ. At x = −3: y = 2⁻³ = 1/8 — tiny but positive. At x = −2: 1/4. At x = −1: 1/2. At x = 0: 1. At x = 1: 2. At x = 2: 4. At x = 3: 8. At x = 10: 1024. At x = 20: over a million. The curve hugs the x-axis on the left (never touching — y is never zero or negative), passes through (0,1), and shoots upward on the right. This is the signature shape: flat, flat, flat, then sudden vertical escape.</p>

**Floor 2 (Definition):**
<p>An <strong>exponential function</strong> has the form f(x) = a·bˣ, where b > 0 and b ≠ 1. If b > 1, it's <strong>exponential growth</strong> — the function increases. If 0 < b < 1, it's <strong>exponential decay</strong> — the function decreases toward zero. Key properties: domain = all real numbers; range = (0, ∞) — the output is always positive; y-intercept = (0, a); horizontal asymptote y = 0 as x → −∞ (for growth) or x → ∞ (for decay). The base b is the factor by which the function changes when x increases by 1.</p>

**Floor 3 (In action):**
<p>The exponential function is the mathematical engine of compounding. Money earning interest doesn't grow linearly — it grows exponentially because each year's interest earns interest in subsequent years. A virus spreading through a population doesn't add cases linearly — each infected person infects others, who infect others. The function 2ˣ models ideal doubling: 1, 2, 4, 8, 16, 32... Real-world growth rarely stays exponential forever — it hits limits — but the exponential curve is the starting model for every compounding process.</p>

**Image prompt:** A chalk graph of y = 2ˣ from x = −3 to x = 3. Key points labelled: (−3, 1/8), (−2, 1/4), (−1, 1/2), (0, 1), (1, 2), (2, 4), (3, 8). The horizontal asymptote y = 0 is drawn as a dashed line. The steep rise on the right is annotated "doubling every step." Chalk on dark green board. Square 1:1.

---

## BB-NEW-133 — The number e: nature's own base

**Subject:** maths | **Topic:** exponents | **Concept:** e; natural-base; compound-interest-limit; Euler-number | **Ground:** g0 | **Builds on:** [BB-NEW-131]

**Floor 0 (Idea):**
<p>You could write exponential growth using base 2, base 10, or any positive number. But nature uses a very specific base — approximately 2.71828... — called e. It appears wherever things grow or decay continuously: in compound interest, population models, radioactive decay, and the physics of cooling. e is not an arbitrary choice. It falls out of the mathematics when growth is uninterrupted.</p>

**Floor 1 (Concrete):**
<p>Invest ₹1 at 100% annual interest. After one year: ₹2. Now compound semi-annually: 50% every six months. After one year: (1 + 1/2)² = (1.5)² = ₹2.25. Compound quarterly: (1 + 1/4)⁴ ≈ ₹2.441. Compound monthly: (1 + 1/12)¹² ≈ ₹2.613. Compound daily: (1 + 1/365)³⁶⁵ ≈ ₹2.715. Compound every second... the value approaches ₹2.71828... — exactly e rupees. As the compounding frequency goes to infinity, (1 + 1/n)ⁿ → e. Continuous compounding: A = Pe^(rt).</p>

**Floor 2 (Definition):**
<p>The number <strong>e</strong> (Euler's number) is defined as the limit e = lim(n→∞) (1 + 1/n)ⁿ ≈ 2.718281828... It is irrational and transcendental — its decimal expansion never repeats and it is not the root of any polynomial with integer coefficients. The <strong>natural exponential function</strong> is f(x) = eˣ. Its special property: the derivative of eˣ is eˣ — it is its own rate of change. This makes eˣ the fundamental exponential for calculus. The <strong>natural logarithm</strong> ln(x) = log_e(x) is the inverse.</p>

**Floor 3 (In action):**
<p>Every continuous growth or decay process in nature is modelled with e, not 2 or 10. Population growth: P = P₀e^(kt). Radioactive decay: N = N₀e^(−λt). Newton's law of cooling: T − T_ambient = (T₀ − T_ambient)e^(−kt). Capacitor discharge: V = V₀e^(−t/RC). Atmospheric pressure with altitude: P = P₀e^(−h/H). The ubiquity of e is not coincidence — it's the unique base for which the rate of change of the function equals the function itself, and nature's continuous processes demand that property.</p>

**Image prompt:** A chalk drawing of the sequence (1+1/n)ⁿ converging to e. A table: n=1→2, n=2→2.25, n=4→2.441, n=12→2.613, n=365→2.715, n→∞→e≈2.718. Below: the graph of y=eˣ with slope equal to value at every point, annotated. Chalk on dark green board. Square 1:1.

---

# Part 2 — Exponential growth & decay

---

## BB-NEW-134 — Exponential growth: when things feed on themselves

**Subject:** maths | **Topic:** exponents | **Concept:** exponential-growth; doubling; A=A₀e^(kt); population | **Ground:** g0 | **Builds on:** [BB-NEW-131, BB-NEW-133]

**Floor 0 (Idea):**
<p>Linear growth adds the same amount each time: 3, 6, 9, 12... Exponential growth multiplies by the same factor each time: 3, 6, 12, 24, 48... The difference seems small at first. But after 20 steps, linear gives 60; exponential gives over 3 million. Exponential growth is self-feeding — the bigger it gets, the faster it grows.</p>

**Floor 1 (Concrete):**
<p>A single bacterium splits every 20 minutes. Start with 1. After 1 hour (3 doublings): 8. After 2 hours (6): 64. After 4 hours (12): 4,096. After 8 hours (24): about 17 million. After 12 hours (36): about 69 billion. The growth is invisible at first — you don't notice a culture going from 1 to 8 — but by the time it's visible, it's already halfway to filling the dish. This is why bacterial infections seem to appear suddenly: exponential growth hides in the small numbers until it doesn't.</p>

**Floor 2 (Definition):**
<p><strong>Exponential growth</strong> follows A = A₀e^(kt) or equivalently A = A₀·b^t, where k > 0 (or b > 1). The <strong>doubling time</strong> T₂ is the time for the quantity to double: T₂ = ln(2)/k. Every doubling time, the quantity multiplies by 2. After n doubling times, it multiplies by 2ⁿ. Key property: the <strong>relative growth rate</strong> (1/A)(dA/dt) = k is constant — the percentage increase per unit time never changes, but the absolute increase grows as A grows.</p>

**Floor 3 (In action):**
<p>The rule of 70 estimates doubling time: T₂ ≈ 70 / (percentage growth rate). At 7% annual growth, population doubles in about 10 years. At 2%, about 35 years. This works for any exponential: money, bacteria, viral spread, energy consumption. The terrifying thing about exponential growth is not the final number — it's that at the moment you notice a problem, you're only one doubling time away from it being twice as bad. The pond is half-covered with lily pads the day before it's fully covered.</p>

**Image prompt:** A chalk graph of exponential growth: a shallow curve that suddenly steepens. A linear growth line is shown for comparison, becoming flat by comparison. The pond-lily analogy: a sequence of circles showing 1/64, 1/32, 1/16, 1/8, 1/4, 1/2 covered — the last step (full coverage) highlighted with "one doubling time ago it was half full." Chalk on dark green board. Square 1:1.

---

## BB-NEW-135 — Exponential decay: when things bleed away

**Subject:** maths | **Topic:** exponents | **Concept:** exponential-decay; half-life; A=A₀e^(-kt); radioactive | **Ground:** g0 | **Builds on:** [BB-NEW-131, BB-NEW-133]

**Floor 0 (Idea):**
<p>Growth multiplies up; decay divides down. A radioactive sample doesn't lose the same number of atoms each second — it loses the same fraction. Half of what's left decays every fixed interval. After one half-life, half remains. After two, a quarter. After ten, less than a thousandth. The decay never reaches zero, but it gets arbitrarily close.</p>

**Floor 1 (Concrete):**
<p>Iodine-131 has a half-life of 8 days. Start with 100 mg. After 8 days: 50 mg. After 16 days: 25 mg. After 24 days: 12.5 mg. After 80 days (10 half-lives): 100 × (1/2)¹⁰ ≈ 0.098 mg — essentially gone. A cup of coffee at 90°C in a 20°C room cools to about 55°C in 5 minutes, 38°C in 10, 29°C in 15 — halving the temperature difference roughly every 5 minutes. The rate of cooling is proportional to the temperature difference itself.</p>

**Floor 2 (Definition):**
<p><strong>Exponential decay</strong> follows A = A₀e^(−kt) with k > 0. The <strong>half-life</strong> T_half = ln(2)/k is the time for the quantity to reduce to half. After n half-lives, A = A₀(1/2)ⁿ. Key properties: the <strong>absolute</strong> decay rate decreases over time (fewer atoms = fewer decays per second), but the <strong>fractional</strong> decay rate is constant. The probability that any specific atom decays in the next second is the same now as it was an hour ago — atoms don't age.</p>

**Floor 3 (In action):**
<p>Half-life is nature's clock for the very old and the very fast. Carbon-14 (5,730 years) dates archaeological finds up to 50,000 years. Uranium-238 (4.5 billion years) dates the Earth itself. In medicine, the biological half-life of a drug determines dosing intervals — you take the next pill when the concentration drops to half. In a hospital, a patient's temperature returning to normal follows Newton's law of cooling: exponential decay toward the ambient temperature. Decay is not failure — it's the predictable return to equilibrium.</p>

**Image prompt:** A chalk graph of exponential decay: a curve starting high and dropping rapidly, then flattening as it approaches zero (dashed asymptote). Half-lives are marked: after T (50%), 2T (25%), 3T (12.5%), 4T (6.25%). Below: examples — carbon-14 (5,730 yr), iodine-131 (8 days), coffee cooling (5 min halving of temperature difference). Chalk on dark green board. Square 1:1.

---

## BB-NEW-136 — Building and using the exponential model

**Subject:** maths | **Topic:** exponents | **Concept:** exponential-modelling; initial-value; rate-constant; prediction | **Ground:** g1 | **Builds on:** [BB-NEW-134, BB-NEW-135]

**Floor 0 (Idea):**
<p>The equation A = A₀e^(kt) has two numbers you need to find from data: A₀ (the starting amount) and k (the growth or decay constant). Once you have both, the equation predicts the amount at any future time. Two measurements — at two different times — are all you need to pin down the whole curve.</p>

**Floor 1 (Concrete):**
<p>A bacterial culture has 500 cells at t = 0 hours, and 2000 cells at t = 2 hours. Find the growth constant k. A₀ = 500. At t = 2: 2000 = 500e^(2k) → 4 = e^(2k) → ln(4) = 2k → k = ln(4)/2 = ln(2) ≈ 0.693 per hour. The doubling time is T₂ = ln(2)/k = 1 hour. Predict A at t = 5 hours: A = 500e^(0.693×5) = 500e^3.466 ≈ 500 × 32 = 16,000. The model, built from just two data points, predicts the population at any time — accurately, as long as growth remains exponential.</p>

**Floor 2 (Definition):**
<p>To build an exponential model A = A₀e^(kt) from two measurements (t₁, A₁) and (t₂, A₂): (1) A₀ is the value at t = 0 — if not given directly, work backwards using A₀ = A₁e^(−kt₁). (2) The rate constant k = ln(A₂/A₁) / (t₂ − t₁). If k > 0, it's growth. If k < 0, it's decay. (3) The doubling time (growth) is ln(2)/k; the half-life (decay) is ln(2)/|k|. With these, the model is fully determined and can predict A at any t.</p>

**Floor 3 (In action):**
<p>This two-measurement technique is used everywhere. An archaeologist measures the carbon-14 ratio in a bone sample and in a living reference — two numbers give the age. A pharmacologist measures drug concentration in blood at two times after administration — two numbers give the elimination rate and the dosing interval. A materials scientist measures a metal's temperature at two times during cooling — two numbers give the cooling constant. The exponential model is the simplest curve with one parameter beyond the starting value, and the parameter k is always found the same way: take two readings, divide, take the log.</p>

**Image prompt:** A chalk graph showing two measured points (t₁, A₁) and (t₂, A₂) on an exponential curve. The calculation chain: A₂/A₁ → e^(kΔt) → k = ln(A₂/A₁)/Δt. The curve extends forward (predicted values) with a dashed line. Below: the general solution A = A₀e^(kt) with k determined. Chalk on dark green board. Square 1:1.

---

## BB-NEW-137 — Doubling time and half-life: the constants behind the curve

**Subject:** maths | **Topic:** exponents | **Concept:** doubling-time; half-life; ln2; rule-of-70 | **Ground:** g0 | **Builds on:** [BB-NEW-134, BB-NEW-135]

**Floor 0 (Idea):**
<p>Every exponential process has a characteristic time — the interval over which the quantity doubles (if growing) or halves (if decaying). This time is a single number that captures the speed of the whole process. A fast-growing culture has a short doubling time. A slowly decaying isotope has a long half-life. Both come from the same formula: T = ln(2)/|k|.</p>

**Floor 1 (Concrete):**
<p>A population grows at 5% per year. Doubling time: T₂ = ln(2)/0.05 ≈ 0.693/0.05 ≈ 13.9 years. Rule of 70: 70/5 = 14 years — close enough. Caffeine has a half-life of about 5 hours in the human body. At 9 AM you drink a coffee with 200 mg caffeine. At 2 PM: 100 mg left. At 7 PM: 50 mg. At midnight: 25 mg. At 5 AM: 12.5 mg — most people are essentially caffeine-free by morning. The half-life encapsulates the entire elimination curve.</p>

**Floor 2 (Definition):**
<p>For exponential growth A = A₀e^(kt): <strong>doubling time</strong> T₂ = ln(2)/k ≈ 0.693/k. For exponential decay A = A₀e^(−kt): <strong>half-life</strong> T_half = ln(2)/k ≈ 0.693/k. The natural log of 2 (≈ 0.693) is the key constant. The <strong>rule of 70</strong> approximates doubling time or half-life: T ≈ 70 / (percentage rate). After n doubling times, A = A₀·2ⁿ. After n half-lives, A = A₀·(1/2)ⁿ.</p>

**Floor 3 (In action):**
<p>The constancy of doubling time and half-life is what makes exponential processes predictable — and dangerous. A tumour that doubles every 6 months has been growing undetected for years by the time it's visible. A debt growing at 18% annual interest doubles in about 4 years — a ₹10,000 loan becomes ₹20,000, then ₹40,000, then ₹80,000. The time is always the same; the absolute numbers accelerate. Understanding doubling time turns "it's growing" into "it will double in X years" — and that specificity changes decisions.</p>

**Image prompt:** A chalk diagram showing a timeline with equal intervals labelled "doubling time T₂." At each mark: A₀, 2A₀, 4A₀, 8A₀, 16A₀. Alongside, a decay timeline with equal half-life intervals: A₀, A₀/2, A₀/4, A₀/8. Below: T = ln(2)/k, rule of 70. Chalk on dark green board. Square 1:1.

---

# Part 3 — Logarithms

---

## BB-NEW-138 — What is a logarithm? Asking "what power?"

**Subject:** maths | **Topic:** logarithms | **Concept:** logarithm-definition; inverse-of-exponentiation; log-base | **Ground:** g0 | **Builds on:** [BB-NEW-131]

**Floor 0 (Idea):**
<p>Exponentiation asks "what is 2 raised to the 5th power?" → 2⁵ = 32. A logarithm asks the reverse: "2 raised to what power gives 32?" → log₂(32) = 5. A logarithm is just an exponent — the exponent you need to raise the base to, to get the number. That's it. Everything else follows from this one reversal.</p>

**Floor 1 (Concrete):**
<p>log₂(8) = 3 because 2³ = 8. log₃(81) = 4 because 3⁴ = 81. log₁₀(1000) = 3 because 10³ = 1000. log₁₀(0.01) = −2 because 10⁻² = 0.01. log₅(5) = 1 because 5¹ = 5. log₇(1) = 0 because 7⁰ = 1. Every logarithm is a question: "what exponent?" If you can answer that question by thinking about powers, you understand logarithms. The notation log_b(x) means "the exponent that turns b into x."</p>

**Floor 2 (Definition):**
<p>For b > 0, b ≠ 1, and x > 0: <strong>log_b(x) = y</strong> means bʸ = x. b is the <strong>base</strong>, x is the <strong>argument</strong>, and y is the <strong>logarithm</strong>. Logarithms are only defined for positive arguments — you cannot take the log of zero or a negative number, because no real exponent turns a positive base into zero or a negative. The logarithm is the <strong>inverse function</strong> of exponentiation: log_b(bˣ) = x and b^(log_b(x)) = x. They undo each other.</p>

**Floor 3 (In action):**
<p>Logarithms answer "how many doublings?" log₂(1024) = 10 — it takes 10 doublings to go from 1 to 1024. They answer "how many decades?" log₁₀(1,000,000) = 6 — a million is six powers of ten. They compress enormous ranges: the difference between log₁₀(1) = 0 and log₁₀(10¹²) = 12 is only 12 units on the log scale, covering a factor of a trillion. This compression is why logs power the pH scale, the Richter scale, and the decibel — each unit on a log scale represents a factor, not an addition.</p>

**Image prompt:** A chalk drawing showing the equivalence: 2³ = 8 ↔ log₂(8) = 3. A table: log₂(8)=3, log₃(81)=4, log₁₀(1000)=3, log₁₀(0.01)=−2, log₅(5)=1, log₇(1)=0. Below: "log_b(x) = y means bʸ = x." Chalk on dark green board. Square 1:1.

---

## BB-NEW-139 — The laws of logarithms

**Subject:** maths | **Topic:** logarithms | **Concept:** log-laws; product-rule; quotient-rule; power-rule | **Ground:** g0 | **Builds on:** [BB-NEW-138]

**Floor 0 (Idea):**
<p>Logarithms turn multiplication into addition, division into subtraction, and powers into multiplication. This was their original purpose — before calculators, multiplying two large numbers was slow and error-prone; adding their logarithms was fast and reliable. The log laws are not new rules — they are direct translations of the index laws, rewritten in log language.</p>

**Floor 1 (Concrete):**
<p>Compute log₂(8 × 4). Method 1: 8×4 = 32, log₂(32) = 5. Method 2: log₂(8) + log₂(4) = 3 + 2 = 5. Same answer. Compute log₃(81/9): log₃(81) − log₃(9) = 4 − 2 = 2. And indeed 81/9 = 9, log₃(9) = 2. Compute log₁₀(100³): 3 × log₁₀(100) = 3 × 2 = 6. And 100³ = 1,000,000, log₁₀(1,000,000) = 6. These laws work because the index laws work — log(ab) = log a + log b is just log(x^p · x^q) = log(x^(p+q)) = p+q in disguise.</p>

**Floor 2 (Definition):**
<p>The three <strong>laws of logarithms</strong> (valid for any base b): (1) <strong>Product rule</strong>: log_b(MN) = log_b(M) + log_b(N). (2) <strong>Quotient rule</strong>: log_b(M/N) = log_b(M) − log_b(N). (3) <strong>Power rule</strong>: log_b(M^p) = p·log_b(M). Additional: log_b(1) = 0, log_b(b) = 1, log_b(1/M) = −log_b(M). The <strong>change-of-base formula</strong> converts between bases: log_a(x) = log_b(x) / log_b(a).</p>

**Floor 3 (In action):**
<p>The power rule is the one you'll use most. It lets you bring an exponent down from the tower: log(2ˣ) = x·log(2). This transforms an exponential equation into a linear one — 3ˣ = 50 becomes x·log(3) = log(50), so x = log(50)/log(3) ≈ 3.56. Without the power rule, solving 3ˣ = 50 is guesswork. With it, it's a division. This move — take the log of both sides and bring the exponent down — is the universal key to solving exponential equations.</p>

**Image prompt:** A chalk drawing of the three log laws, each with a numeric example. Product: log₂(8×4) = log₂8 + log₂4 = 3+2 = 5. Quotient: log₃(81/9) = 4−2 = 2. Power: log₁₀(100³) = 3×2 = 6. Below: the change-of-base formula in a box. Chalk on dark green board. Square 1:1.

---

## BB-NEW-140 — Common logs and natural logs: the two buttons on your calculator

**Subject:** maths | **Topic:** logarithms | **Concept:** common-logarithm; natural-logarithm; base-10; base-e; ln | **Ground:** g0 | **Builds on:** [BB-NEW-138, BB-NEW-133]

**Floor 0 (Idea):**
<p>Your calculator has two log buttons: "log" and "ln." They're the same operation with different bases. "log" is base 10 — the common logarithm, tied to the decimal system. "ln" is base e — the natural logarithm, tied to continuous growth. Both obey the same laws. You choose between them based on convenience, not correctness — because the change-of-base formula lets you convert any log to any base.</p>

**Floor 1 (Concrete):**
<p>log₁₀(1000) = 3. log₁₀(50) ≈ 1.699 — press the "log" button. ln(e³) = 3. ln(50) ≈ 3.912 — press the "ln" button. Relationship: ln(x) = log₁₀(x) × ln(10) ≈ log₁₀(x) × 2.303. To solve 2ˣ = 50: take ln of both sides → x·ln(2) = ln(50) → x = ln(50)/ln(2) ≈ 3.912/0.693 = 5.64. You could also use log₁₀: x = log₁₀(50)/log₁₀(2) ≈ 1.699/0.301 = 5.64 — same answer. The base cancels out in the division.</p>

**Floor 2 (Definition):**
<p>The <strong>common logarithm</strong> log₁₀(x), written as log(x) on calculators, uses base 10. It answers: "10 to what power gives x?" The <strong>natural logarithm</strong> log_e(x), written as ln(x), uses base e. The conversion: ln(x) = log₁₀(x) / log₁₀(e) ≈ 2.3026 × log₁₀(x). The <strong>change-of-base formula</strong>: log_b(x) = ln(x)/ln(b) = log(x)/log(b). This means any logarithm can be expressed in terms of natural or common logs — you only ever need the ln button.</p>

**Floor 3 (In action):**
<p>Common logs are natural for base-10 thinking: log₁₀(10⁶) = 6 neatly. Natural logs are natural for calculus: the derivative of ln(x) is 1/x, while the derivative of log₁₀(x) has an extra constant (1/(x·ln(10))). In pure maths and physics, "log" almost always means ln. In engineering and chemistry (pH, decibels), it means log₁₀. The notation is inconsistent across fields — always check which base is intended. The change-of-base formula means you can always convert, so the ambiguity is an inconvenience, not a barrier.</p>

**Image prompt:** A chalk drawing of a calculator with "log" and "ln" buttons highlighted. Beside it: log₁₀(100) = 2, ln(e²) = 2. The change-of-base formula in a box: log_b(x) = ln(x)/ln(b). A worked example: log₂(32) = ln(32)/ln(2) = 3.466/0.693 = 5. Chalk on dark green board. Square 1:1.

---

## BB-NEW-141 — Solving exponential equations: the log as the great leveller

**Subject:** maths | **Topic:** logarithms | **Concept:** solving-exponential-equations; taking-logs; unknown-exponent | **Ground:** g0 | **Builds on:** [BB-NEW-139, BB-NEW-140]

**Floor 0 (Idea):**
<p>2ˣ = 10. What is x? You can't isolate x with ordinary algebra — x is stuck in the exponent. The logarithm frees it. Take the log of both sides — any base — and the power rule brings x down: x·log(2) = log(10), so x = log(10)/log(2) ≈ 3.322. One move, and the unknown descends from the exponent to ground level.</p>

**Floor 1 (Concrete):**
<p>Solve 3·2ˣ = 48. Divide by 3: 2ˣ = 16. Spot that 2⁴ = 16, so x = 4 — no log needed. Solve 5·3²ˣ = 405. Divide: 3²ˣ = 81. 3⁴ = 81, so 2x = 4, x = 2. Solve 7ˣ = 20. No nice integer solution. Take ln: x·ln(7) = ln(20) → x = ln(20)/ln(7) ≈ 2.996/1.946 ≈ 1.54. Check: 7^1.54 ≈ 20.0 ✓. For exponential equations without obvious integer answers, the logarithm is the only systematic method.</p>

**Floor 2 (Definition):**
<p>To solve an exponential equation a·b^(cx+d) = k (with k > 0): (1) Isolate the exponential term: b^(cx+d) = k/a. (2) Take the natural log (or any log) of both sides: ln(b^(cx+d)) = ln(k/a). (3) Apply the power rule: (cx+d)·ln(b) = ln(k/a). (4) Solve the resulting linear equation for x. If the equation has exponentials with different bases on both sides, take logs early. Check your answer — exponentials are sensitive to small errors.</p>

**Floor 3 (In action):**
<p>This technique appears wherever an unknown sits in an exponent. Archaeology: 0.35 = e^(−0.000121t) — find t (the age). Finance: 5000 = 2000·(1.08)ᵗ — find t (years to reach the goal). Biology: 100 = 10·2^(t/3) — find t (hours since culture started). The pattern is always the same: isolate the exponential, take ln of both sides, bring the exponent down, solve linearly. The logarithm doesn't make the problem harder — it turns an exponential problem into a linear one, which is exactly the point.</p>

**Image prompt:** A chalk drawing showing the step-by-step solution of 7ˣ = 20. Step 1: ln(7ˣ) = ln(20). Step 2: x·ln(7) = ln(20). Step 3: x = ln(20)/ln(7) ≈ 1.54. Beside it, the general pattern: isolate → take ln → power rule → solve. Chalk on dark green board. Square 1:1.

---

## BB-NEW-142 — Logarithmic scales: when each step means a factor

**Subject:** maths | **Topic:** logarithms | **Concept:** logarithmic-scale; pH; Richter; decibel; order-of-magnitude | **Ground:** g0 | **Builds on:** [BB-NEW-138]

**Floor 0 (Idea):**
<p>The difference between a whisper and a jet engine is a factor of about a trillion in sound intensity. Plot that on a linear scale and the whisper is invisible. Plot it on a logarithmic scale — where each equal step represents a factor of 10 — and the whisper and the jet sit a comfortable 12 units apart. This is why logs power the scales we use for sound, earthquakes, acidity, and stellar brightness.</p>

**Floor 1 (Concrete):**
<p>The <strong>Richter scale</strong> for earthquakes: each increase of 1 means 10 times the ground motion and about 32 times the energy released. A magnitude 5 quake shakes the ground 10 times more than a magnitude 4, and releases 32 times the energy. A magnitude 7 releases about 1000 times the energy of a magnitude 5. The <strong>pH scale</strong>: pH = −log₁₀[H⁺]. A pH of 3 is ten times more acidic than pH 4, a hundred times more than pH 5. Stomach acid (pH 1.5) is about 100,000 times more acidic than blood (pH 7.4). The minus sign makes pH go down as acidity goes up.</p>

**Floor 2 (Definition):**
<p>A <strong>logarithmic scale</strong> maps a quantity Q to log(Q), so multiplication in Q becomes addition on the scale. Common examples: <strong>pH</strong> = −log₁₀[H⁺] (acidity, range ~0–14). <strong>Richter magnitude</strong> M = log₁₀(A/A₀) (earthquake amplitude). <strong>Decibel</strong> dB = 10·log₁₀(I/I₀) (sound intensity — every 10 dB is a factor of 10 in intensity; but perceived loudness roughly doubles every 10 dB). <strong>Apparent magnitude</strong> of stars: each 5 magnitudes = factor of 100 in brightness. In every case, the log compresses an enormous multiplicative range into a compact additive scale.</p>

**Floor 3 (In action):**
<p>Logarithmic scales match human perception. We perceive loudness, brightness, and pitch roughly logarithmically — not linearly. Twice the sound energy doesn't sound twice as loud; it sounds a bit louder. The decibel scale, the musical octave (doubling of frequency), and the stellar magnitude scale all reflect this perceptual reality. In data visualisation, a log scale on a graph turns an exponential curve into a straight line — making growth rates instantly visible as slopes. When you see a straight line on a log plot, you're looking at an exponential process.</p>

**Image prompt:** A chalk drawing of four logarithmic scales side by side: pH (0–14, with lemon juice 2, coffee 5, blood 7.4, bleach 12), Richter (1–9, with examples from "felt by few" to "devastating"), decibels (0–140, whisper to jet engine), stellar magnitudes (brightest stars to faintest visible). Each scale shows the factor-of-10 per unit step. Chalk on dark green board. Square 1:1.

---

# Part 4 — Deeper connections

---

## BB-NEW-143 — Graphs: exponentials and logarithms as mirror images

**Subject:** maths | **Topic:** logarithms | **Concept:** inverse-functions; graph-symmetry; y=x-reflection; domain-range-swap | **Ground:** g0 | **Builds on:** [BB-NEW-131, BB-NEW-138]

**Floor 0 (Idea):**
<p>y = 2ˣ and y = log₂(x) are inverse functions — they undo each other. On a graph, this means they are mirror images across the line y = x. Every point (a, b) on the exponential becomes (b, a) on the logarithm. The exponential's horizontal asymptote becomes the logarithm's vertical asymptote. The exponential's range becomes the logarithm's domain.</p>

**Floor 1 (Concrete):**
<p>Plot y = 2ˣ: passes through (0,1), (1,2), (2,4), (−1, ½). Plot y = log₂(x): passes through (1,0), (2,1), (4,2), (½, −1) — exactly the x and y coordinates swapped from the exponential. The exponential grows explosively to the right, hugs y=0 on the left. The log grows ever more slowly to the right, hugs x=0 (the y-axis) on the left. The log can never touch the y-axis because 2ˣ can never be zero — the domain of log₂(x) is (0, ∞), mirroring the range of 2ˣ.</p>

**Floor 2 (Definition):**
<p>For any base b > 0, b ≠ 1, the functions f(x) = bˣ and g(x) = log_b(x) are <strong>inverse functions</strong>. This means f(g(x)) = x (for x > 0) and g(f(x)) = x (for all x). Graphically, their curves are reflections across the line y = x. Properties swap: the domain of bˣ is ℝ, its range is (0, ∞); the domain of log_b(x) is (0, ∞), its range is ℝ. The horizontal asymptote y = 0 of the exponential becomes the vertical asymptote x = 0 of the logarithm.</p>

**Floor 3 (In action):**
<p>The inverse relationship is the conceptual key to logarithms. Every time you think "log_b(x) = ?", you can mentally convert to "b^? = x" — the exponential form. When solving log equations, you can exponentiate both sides to eliminate the log: log₂(x) = 5 → 2^(log₂(x)) = 2⁵ → x = 32. When solving exponential equations, you take the log. The two operations are a matched pair — one raises, the other asks what was raised — and fluency means moving between them without friction.</p>

**Image prompt:** A chalk graph showing y = 2ˣ (steep curve from bottom-left to top-right through (0,1)) and y = log₂(x) (shallow curve from near the y-axis upward through (1,0)). The line y = x is drawn as a dashed diagonal. Reflection arrows connect corresponding points: (0,1)↔(1,0), (1,2)↔(2,1), (2,4)↔(4,2). Chalk on dark green board. Square 1:1.

---

## BB-NEW-144 — Exponential vs polynomial: why exponentials always win

**Subject:** maths | **Topic:** exponents | **Concept:** exponential-vs-polynomial; growth-comparison; limits-at-infinity | **Ground:** g0 | **Builds on:** [BB-NEW-131]

**Floor 0 (Idea):**
<p>Which grows faster — x¹⁰⁰⁰ or 1.001ˣ? For small x, the enormous power of x dwarfs the tiny base of the exponential. But eventually, the exponential catches up, overtakes, and leaves the polynomial in the dust. No matter how large the power and how close to 1 the exponential base (as long as it exceeds 1), the exponential always wins in the long run.</p>

**Floor 1 (Concrete):**
<p>Compare x³ and 1.2ˣ. At x = 1: 1 vs 1.2 (exp ahead). At x = 5: 125 vs 2.49 (poly ahead). At x = 10: 1000 vs 6.19 (poly crushing). At x = 20: 8000 vs 38.3 (poly still ahead). At x = 30: 27,000 vs 237 (poly way ahead — or is it?). At x = 50: 125,000 vs 9,100 (poly still leading comfortably). At x = 80: 512,000 vs 2,160,000 — the exponential just took the lead. At x = 100: 1,000,000 vs 83,000,000 — the exponential is now 83 times larger. It lagged for 80 steps, then exploded past and never looked back.</p>

**Floor 2 (Definition):**
<p>For any fixed n (no matter how large) and any b > 1 (no matter how close to 1): lim(x→∞) xⁿ / bˣ = 0. This means bˣ eventually grows faster than xⁿ, and by an ever-widening margin. Similarly, for any base b > 1: lim(x→∞) bˣ / xⁿ = ∞. The same is true when comparing exponentials to any fixed power of x, including fractional powers. <strong>Factorials</strong> (n!) eventually outgrow exponentials: lim(n→∞) bⁿ / n! = 0. The growth hierarchy: constants < logarithms < polynomials < exponentials < factorials.</p>

**Floor 3 (In action):**
<p>This hierarchy governs algorithm design in computer science. An O(n²) algorithm is polynomial time — feasible for moderate n. An O(2ⁿ) algorithm is exponential time — useless for n above about 40 regardless of hardware improvements. In cryptography, the security of many systems relies on the exponential difficulty of certain problems — factoring large numbers takes time exponential in the number of digits. In biology, exponential growth of pathogens vs polynomial growth of immune response determines whether an infection is cleared or overwhelms the host. The exponential-versus-polynomial race is not abstract — it's life and death, feasibility and impossibility, writ in mathematics.</p>

**Image prompt:** A chalk graph plotting x³ and 1.2ˣ on the same axes from x=0 to x=100. The polynomial leads for most of the graph; the exponential crosses it around x=80 and then rockets upward. An inset zooms to x=80-100 showing the crossing point. Below: the growth hierarchy table. Chalk on dark green board. Square 1:1.

---

## BB-NEW-145 — The logistic curve: when growth hits a ceiling

**Subject:** maths | **Topic:** exponents | **Concept:** logistic-growth; carrying-capacity; sigmoid; real-world-growth | **Ground:** g0 | **Builds on:** [BB-NEW-134, BB-NEW-131]

**Floor 0 (Idea):**
<p>Pure exponential growth goes to infinity. Real growth doesn't — resources run out, predators arrive, the market saturates. The logistic curve models this: exponential at first, then slowing, then levelling off at a maximum — the carrying capacity. It's an S-shaped curve, and it describes almost every real population, adoption, and saturation process in nature and society.</p>

**Floor 1 (Concrete):**
<p>A lake has a carrying capacity of 1000 fish. The population grows logistically. At first, with few fish and plenty of food, growth is nearly exponential — the curve rises steeply. At 500 fish (half capacity), the growth rate is maximum — the population is large enough to breed fast but the resource pressure hasn't yet bitten. Beyond 500, growth slows — more fish are competing. Near 1000, growth crawls to a halt as births and deaths balance. The curve has three phases: slow start (lag), rapid climb (exponential-like), flattening (saturation).</p>

**Floor 2 (Definition):**
<p>The <strong>logistic function</strong> is P(t) = K / (1 + Ce^(−rt)), where K is the <strong>carrying capacity</strong> (maximum sustainable value), r is the intrinsic growth rate, and C = (K−P₀)/P₀. At low P, growth approximates exponential (dP/dt ≈ rP). At P = K/2, the growth rate is maximum. As P → K, dP/dt → 0 — the population stabilises. The resulting curve is <strong>sigmoid</strong> (S-shaped). The logistic differential equation is dP/dt = rP(1 − P/K) — growth rate proportional to both the current population AND the remaining capacity.</p>

**Floor 3 (In action):**
<p>The logistic curve appears wherever growth meets limits. Technology adoption: smartphones followed an S-curve — slow early adopters, explosive mainstream uptake, then saturation. The spread of a rumour or a meme: logistic. Language learning: vocabulary grows fast then plateaus. Muscle growth from training: exponential newbie gains, then diminishing returns. The logistic is nature's correction to the exponential — it says: yes, things grow by multiplying, but no, they don't grow forever. Every exponential in the real world is just the early stretch of a logistic whose ceiling we haven't yet seen.</p>

**Image prompt:** A chalk graph of the S-shaped logistic curve. Three phases are labelled: "lag phase" (slow start), "exponential phase" (steep climb, labelled "looks like e^(rt)"), "plateau" (flattening at K). The carrying capacity K is drawn as a horizontal dashed line. Below: dP/dt = rP(1 − P/K). Chalk on dark green board. Square 1:1.

---

## Summary

### Part 1 — Beyond basic indices (3 BBs)
| # | Title |
|---|-------|
| 130 | Indices revisited: the full rulebook |
| 131 | The exponential function: y = bˣ |
| 133 | The number e: nature's own base |

### Part 2 — Exponential growth & decay (4 BBs)
| # | Title |
|---|-------|
| 134 | Exponential growth: when things feed on themselves |
| 135 | Exponential decay: when things bleed away |
| 136 | Building and using the exponential model |
| 137 | Doubling time and half-life |

### Part 3 — Logarithms (5 BBs)
| # | Title |
|---|-------|
| 138 | What is a logarithm? |
| 139 | The laws of logarithms |
| 140 | Common logs and natural logs |
| 141 | Solving exponential equations |
| 142 | Logarithmic scales |

### Part 4 — Deeper connections (3 BBs)
| # | Title |
|---|-------|
| 143 | Graphs: exponentials and logs as mirror images |
| 144 | Exponential vs polynomial |
| 145 | The logistic curve |

**15 BBs.** Covers CURRICULUM topic 7 (Exponentials & logarithms). Builds on BB-NEW-122 (indices) and BB-NEW-131 (the number e connects to BB-NEW-133). Deliberately numbered with a gap at 132 — reserved for a future BB if needed (e.g., transformations of exponential graphs).
