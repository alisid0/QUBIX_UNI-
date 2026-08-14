# Trigonometry — Complete Course (15 BBs)

A rigorous, repetition-driven trigonometry course. The unit circle is the central engine — every BB returns to it, drilling the exact values of sin/cos/tan at 0°, 30°, 45°, 60°, 90° until they are automatic. The course builds from the unit circle through graphs, identities, and trig equations, then connects to projectiles, vectors, and rotation matrices. Designed for mastery through recurrence — the same values appear in 7 of the 15 BBs.

Existing coverage: Cards 17–20 (intro trig, right triangle, SOH-CAH-TOA, captain's problem), Card 24 (radians intro). This batch assumes those and goes much further.

---

# Part 1 — The unit circle: the engine of trigonometry

---

## BB-NEW-180 — The unit circle: every point is (cos θ, sin θ)

**Subject:** maths | **Topic:** trigonometry | **Concept:** unit-circle; cos-theta-sin-theta; radian-positions | **Ground:** g0 | **Builds on:** [Card 19, Card 24]

**Floor 0 (Idea):**
<p>Forget triangles for a moment. Draw a circle of radius 1 centred at the origin. Pick any point on the circle. Draw a line from the origin to that point. The x-coordinate of that point is cos θ. The y-coordinate is sin θ. This is the unit circle definition of sine and cosine — and it works for any angle, not just the acute ones in a triangle. Every fact about trig lives on this circle.</p>

**Floor 1 (Concrete):**
<p>At θ = 0°, the point is at (1, 0) — the rightmost point of the circle. So cos 0° = 1, sin 0° = 0. At θ = 90°, the point is at (0, 1) — the top. So cos 90° = 0, sin 90° = 1. At θ = 180°, (−1, 0): cos 180° = −1, sin 180° = 0. At θ = 270°, (0, −1): cos 270° = 0, sin 270° = −1. At θ = 360°, back to (1, 0): cos 360° = 1, sin 360° = 0. The angle θ is measured anticlockwise from the positive x-axis. The radius is always 1, so by Pythagoras, x² + y² = 1 — which is exactly cos²θ + sin²θ = 1.</p>

**Floor 2 (Definition):**
<p>On the <strong>unit circle</strong> (circle of radius 1, centre at the origin), for any angle θ measured anticlockwise from the positive x-axis: the point where the terminal ray meets the circle has coordinates <strong>(cos θ, sin θ)</strong>. This extends the definition of sine and cosine beyond 0°–90° to all real angles. <strong>tan θ = sin θ / cos θ</strong> = y/x (undefined when cos θ = 0, i.e. at 90° and 270°). The unit circle definition replaces the right-triangle definition for angles beyond 90°.</p>

**Floor 3 (In action):**
<p>The unit circle is the master diagram of trigonometry. Every identity, every graph, every equation traces back to it. The sign of sin θ is the sign of the y-coordinate — positive above the x-axis, negative below. The sign of cos θ is the sign of the x-coordinate — positive right of the y-axis, negative left. Tan is positive when x and y have the same sign (quadrants I and III), negative when they differ (II and IV). Draw this circle once and you never need to memorise sign rules — you can read them off the axes. This is the single most important diagram in the entire subject.</p>

**Image prompt:** A chalk drawing of the unit circle (radius 1) centred at the origin. Four points labelled: (1,0) at 0°, (0,1) at 90°, (−1,0) at 180°, (0,−1) at 270°. A point at angle θ is marked with coordinates (cos θ, sin θ). The radius from origin to the point is labelled "1." Below: "x² + y² = 1 → cos²θ + sin²θ = 1." Chalk on dark green board. Square 1:1.

---

## BB-NEW-181 — The special angles: where 30°, 45°, and 60° come from

**Subject:** maths | **Topic:** trigonometry | **Concept:** special-angles; 30-60-90-triangle; 45-45-90-triangle; exact-values-derivation | **Ground:** g0 | **Builds on:** [BB-NEW-180]

**Floor 0 (Idea):**
<p>The angles 30°, 45°, and 60° are not arbitrary — they are built into the geometry of two triangles. A square cut along its diagonal gives a 45-45-90 triangle. An equilateral triangle cut in half gives a 30-60-90 triangle. From these two shapes, every exact trig value emerges. You don't need to memorise a table — you need to memorise two triangles.</p>

**Floor 1 (Concrete):**
<p><strong>The 45-45-90 triangle:</strong> A square of side 1, cut along the diagonal. The diagonal has length √(1²+1²) = √2. The triangle has sides 1, 1, √2 and angles 45°, 45°, 90°. So sin 45° = opposite/hypotenuse = 1/√2 = √2/2. cos 45° = adjacent/hypotenuse = 1/√2 = √2/2. tan 45° = opposite/adjacent = 1/1 = 1. Notice: sin 45° = cos 45° — the two legs are equal.</p><p><strong>The 30-60-90 triangle:</strong> An equilateral triangle of side 2, cut in half. The half has base 1, hypotenuse 2, and height √(2²−1²) = √3. The angles are 30°, 60°, 90°. For 30°: opposite = 1, adjacent = √3, hypotenuse = 2. So sin 30° = ½, cos 30° = √3/2, tan 30° = 1/√3 = √3/3. For 60°: opposite = √3, adjacent = 1, hypotenuse = 2. So sin 60° = √3/2, cos 60° = ½, tan 60° = √3. Notice: sin 30° = cos 60° and sin 60° = cos 30° — they swap.</p>

**Floor 2 (Definition):**
<p>The two <strong>special right triangles</strong> that generate exact trig values: (1) <strong>45-45-90</strong> (isosceles right): legs = 1, hypotenuse = √2. (2) <strong>30-60-90</strong> (half-equilateral): sides in ratio 1 : √3 : 2 opposite the 30°, 60°, 90° angles respectively. From these, every exact value of sin, cos, and tan for 0°, 30°, 45°, 60°, and 90° can be derived by writing the appropriate opposite/adjacent/hypotenuse ratios. No other triangles needed.</p>

**Floor 3 (In action):**
<p>These two triangles are the backbone of exact trig. Every time you see sin 30° or cos 45° in a problem, you should mentally picture the triangle, not recall a number from a table. The triangle tells you WHY sin 30° = ½ — because the side opposite 30° is exactly half the hypotenuse. The triangle tells you WHY tan 45° = 1 — because opposite equals adjacent. For the rest of this course, every angle 0°, 30°, 45°, 60°, 90° will be used repeatedly. Draw these triangles now. You'll need them in every section that follows.</p>

**Image prompt:** A chalk drawing of two triangles. Left: a square of side 1 cut diagonally — the 45-45-90 triangle with sides 1, 1, √2, angles labelled. Right: an equilateral triangle of side 2 cut in half — the 30-60-90 triangle with sides 1, √3, 2, angles labelled. Sin/cos/tan values derived from each with arrows pointing to the relevant sides. Chalk on dark green board. Square 1:1.

---

## BB-NEW-182 — The exact values table: your new multiplication table

**Subject:** maths | **Topic:** trigonometry | **Concept:** exact-trig-values; memorisation; pattern-recognition; table | **Ground:** g0 | **Builds on:** [BB-NEW-181]

**Floor 0 (Idea):**
<p>Just as you once memorised the multiplication table, you now memorise the trig table — sin, cos, and tan for 0°, 30°, 45°, 60°, and 90°. These five angles and their three ratios are the vocabulary of trigonometry. Every trig problem you will ever solve draws from this table. Drill it until you can write it from memory in under a minute.</p>

**Floor 1 (Concrete):**
<p>The table, derived from the two special triangles:</p>
<table style="width:100%;text-align:center;margin:1em 0">
<tr><th>θ</th><th>0°</th><th>30°</th><th>45°</th><th>60°</th><th>90°</th></tr>
<tr><td>sin θ</td><td>0</td><td>½</td><td>√2/2</td><td>√3/2</td><td>1</td></tr>
<tr><td>cos θ</td><td>1</td><td>√3/2</td><td>√2/2</td><td>½</td><td>0</td></tr>
<tr><td>tan θ</td><td>0</td><td>√3/3</td><td>1</td><td>√3</td><td>—</td></tr>
</table>
<p>Patterns that make memorisation easier: (1) The sin row reads 0, ½, √2/2, √3/2, 1 — the numerators go √0, √1, √2, √3, √4 all over 2. (2) The cos row is the sin row backwards: 1, √3/2, √2/2, ½, 0. (3) The tan row = sin/cos: 0/1=0, (½)/(√3/2)=1/√3=√3/3, (√2/2)/(√2/2)=1, (√3/2)/(½)=√3, 1/0 = undefined. (4) sin 30° = cos 60° = ½; sin 60° = cos 30° = √3/2.</p>

**Floor 2 (Definition):**
<p>The <strong>exact values</strong> of sin θ, cos θ, and tan θ at the standard angles 0°, 30°, 45°, 60°, 90° (and their radian equivalents 0, π/6, π/4, π/3, π/2) are obtained from the two special triangles. Decimal approximations: sin 30° = 0.5, sin 45° ≈ 0.707, sin 60° ≈ 0.866. Always use the exact surd form (½, √2/2, √3/2) in working — the decimals are for checking, not for solving.</p>

**Floor 3 (In action):**
<p>This table is not negotiable. You will use it when: solving trig equations (sin x = √3/2 → x = 60° or 120°), resolving vectors (a force at 30° has components using sin 30° = ½ and cos 30° = √3/2), computing projectile ranges (sin 2θ uses double angles of these), finding areas of triangles (½ab sin C uses sin 30°, 45°, or 60°), and verifying identities. Every section of this course from here assumes you know these values. Cover the table, write it out, cover it again. Five angles. Three ratios. Fifteen numbers. This is your multiplication table now.</p>

**Image prompt:** A chalk drawing of the exact values table — 5 columns (0°, 30°, 45°, 60°, 90°) × 3 rows (sin, cos, tan). The sin row has the √0/2, √1/2, √2/2, √3/2, √4/2 pattern highlighted. The cos row is the reverse. The tan row = sin/cos. The two special triangles are drawn beside the table as reference. Chalk on dark green board. Square 1:1.

---

## BB-NEW-183 — Angles beyond 90°: the ASTC rule and reference angles

**Subject:** maths | **Topic:** trigonometry | **Concept:** quadrant-angles; ASTC; reference-angle; signs | **Ground:** g0 | **Builds on:** [BB-NEW-180, BB-NEW-182]

**Floor 0 (Idea):**
<p>The right triangle only gives trig values for angles between 0° and 90°. But the unit circle gives them for ALL angles — 150°, 225°, 315°, even 720°. The trick: find the "reference angle" (how far the angle is from the nearest x-axis), look up its value from the 0°–90° table, then apply the correct sign based on which quadrant you're in. ASTC: All, Sin, Tan, Cos — the four quadrants in order.</p>

**Floor 1 (Concrete):**
<p>Find sin 150°. 150° is in quadrant II (between 90° and 180°). Its reference angle = 180° − 150° = 30°. sin 30° = ½. In quadrant II, sin is positive (y > 0). So sin 150° = +½. Find cos 240°. 240° is in quadrant III (180°–270°). Reference angle = 240° − 180° = 60°. cos 60° = ½. In quadrant III, cos is negative (x < 0). So cos 240° = −½. Find tan 315°. 315° is in quadrant IV (270°–360°). Reference angle = 360° − 315° = 45°. tan 45° = 1. In quadrant IV, tan is negative. So tan 315° = −1.</p>

**Floor 2 (Definition):**
<p>For an angle θ in standard position: <strong>Quadrant I</strong> (0°–90°): All positive. <strong>Quadrant II</strong> (90°–180°): Sin (and cosec) positive only — ASTC: All, <strong>S</strong>in, <strong>T</strong>an, <strong>C</strong>os. <strong>Quadrant III</strong> (180°–270°): Tan (and cot) positive only. <strong>Quadrant IV</strong> (270°–360°): Cos (and sec) positive only. The <strong>reference angle</strong> α is the acute angle between the terminal ray and the x-axis: for QII: α = 180°−θ; for QIII: α = θ−180°; for QIV: α = 360°−θ. The trig value of θ = ±(trig value of α), with the sign from ASTC.</p>

**Floor 3 (In action):**
<p>This extends the exact values table to infinity. Every multiple of 30° and 45° has an exact value, instantly available: sin 120° = sin 60° = √3/2. cos 135° = −cos 45° = −√2/2. tan 210° = tan 30° = √3/3. sin 300° = −sin 60° = −√3/2. The reference angle method means you only ever need to know the values for 0°, 30°, 45°, 60°, 90° — everything else is the same numbers with different signs. The ASTC rule tells you the sign. Together, you can produce the exact value of any trig function at any multiple of 30° or 45° in under five seconds.</p>

**Image prompt:** A chalk drawing of the unit circle divided into four quadrants, each labelled with ASTC. In QI: "All +". In QII: "Sin +". In QIII: "Tan +". In QIV: "Cos +". Angles 150°, 240°, 315° are drawn with their reference angles (30°, 60°, 45°) shown as dashed arcs to the x-axis. The exact values with signs are written beside each. Chalk on dark green board. Square 1:1.

---

# Part 2 — Graphs and periodicity

---

## BB-NEW-184 — The sine and cosine graphs: the wave unveiled

**Subject:** maths | **Topic:** trigonometry | **Concept:** sine-graph; cosine-graph; amplitude; period; wave | **Ground:** g0 | **Builds on:** [BB-NEW-180, BB-NEW-182]

**Floor 0 (Idea):**
<p>Unroll the unit circle. As θ increases, the y-coordinate (sin θ) rises and falls in a smooth wave — up to 1, down to −1, back to 1, repeating every full turn. The x-coordinate (cos θ) does the same, just shifted. These are the sine and cosine graphs. They are the mathematical shape of every oscillation in nature: sound, light, tides, pendulums, AC current, and the heartbeat of the universe.</p>

**Floor 1 (Concrete):**
<p>Plot sin θ against θ. At θ = 0°: sin 0° = 0. At 30°: ½ ≈ 0.5. At 45°: √2/2 ≈ 0.707. At 60°: √3/2 ≈ 0.866. At 90°: 1 — peak. At 120°: √3/2 ≈ 0.866. At 135°: √2/2 ≈ 0.707. At 150°: ½ = 0.5. At 180°: 0. At 210°: −½. ... At 270°: −1 — trough. At 330°: −½. At 360°: 0 — back to start. Connect the dots: a smooth, symmetric S-curve that repeats every 360° (2π radians). The cosine graph is identical but shifted 90° left: cos 0° = 1, so it starts at the peak.</p>

**Floor 2 (Definition):**
<p>The graph of y = sin θ is a continuous wave with <strong>amplitude</strong> 1 (max = 1, min = −1), <strong>period</strong> 2π (360°) — it repeats exactly every full turn — and <strong>midline</strong> y = 0. It is an <strong>odd function</strong>: sin(−θ) = −sin θ (symmetric about the origin). The graph of y = cos θ has the same amplitude and period, midline y = 0, but is an <strong>even function</strong>: cos(−θ) = cos θ (symmetric about the y-axis). cos θ = sin(θ + 90°) — the cosine is the sine shifted left by a quarter period.</p>

**Floor 3 (In action):**
<p>The sine wave is the universal language of periodicity. A tuning fork vibrating at 440 Hz traces a sine wave 440 times per second. The voltage from a wall socket is a 50 Hz sine wave. Tides rise and fall sinusoidally with a period of about 12.4 hours. The position of a pendulum bob is sinusoidal. The projection of circular motion onto one axis is sinusoidal — which is why the unit circle definition and the wave are the same thing seen from different angles. Master this graph and you can read the rhythm of any vibrating, rotating, or oscillating system.</p>

**Image prompt:** A chalk graph of y = sin θ from 0° to 720° (two full periods). Key points labelled: (0,0), (30°,½), (45°,√2/2), (60°,√3/2), (90°,1), (180°,0), (270°,−1), (360°,0). Below, y = cos θ on the same axes, shifted. Amplitude 1 and period 2π labelled. Chalk on dark green board. Square 1:1.

---

## BB-NEW-185 — The tangent graph: where things break

**Subject:** maths | **Topic:** trigonometry | **Concept:** tangent-graph; asymptotes; period-of-tan; tan=sin/cos | **Ground:** g0 | **Builds on:** [BB-NEW-182, BB-NEW-184]

**Floor 0 (Idea):**
<p>Sine and cosine are bounded — they live between −1 and 1. Tangent is not. tan θ = sin θ / cos θ, and whenever cos θ = 0 (at 90°, 270°, 450°...), the denominator is zero and tan θ shoots to infinity. The graph has vertical asymptotes at these points — walls that the curve approaches but never touches. Tangent's period is π (180°), not 2π — it repeats twice as fast as sine and cosine.</p>

**Floor 1 (Concrete):**
<p>Plot tan θ: at 0°: tan 0° = 0. At 30°: √3/3 ≈ 0.577. At 45°: 1. At 60°: √3 ≈ 1.732. As θ → 90° from below, tan θ → +∞ — the curve rockets upward. Just past 90°, at 91°, tan θ is a large negative number (because cos θ is tiny and negative). The curve comes up from −∞, passes through tan 135° = −1, tan 150° = −√3/3 ≈ −0.577, tan 180° = 0. Then it repeats: 180° to 270° is a mirror of 0° to 90°. The curve is a stack of identical S-shapes, each climbing from −∞ to +∞, separated by vertical asymptotes every 180°.</p>

**Floor 2 (Definition):**
<p>The graph of y = tan θ has <strong>vertical asymptotes</strong> at θ = 90° + 180°n (π/2 + nπ) for all integers n — wherever cos θ = 0. Its <strong>period</strong> is π (180°) — half the period of sine and cosine. <strong>Range</strong>: all real numbers (−∞, ∞). <strong>Domain</strong>: all real angles except the asymptotes. tan θ is an <strong>odd function</strong>: tan(−θ) = −tan θ. The graph consists of identical branches, each crossing the θ-axis at multiples of 180°.</p>

**Floor 3 (In action):**
<p>Tangent answers "what's the slope?" For a line at angle θ to the horizontal, tan θ is the gradient. At 0°, slope = 0. At 45°, slope = 1. At 60°, slope = √3 — steep. At 89°, slope ≈ 57.3 — nearly vertical. At exactly 90°, the line IS vertical and the slope is undefined — that's the asymptote. Tan connects angles to gradients, and gradients to derivatives. In calculus, the derivative of sin x is cos x, and the derivative of tan x is sec² x — both trace back to the shape of this graph.</p>

**Image prompt:** A chalk graph of y = tan θ from −90° to 270° showing two full periods. Vertical dashed asymptotes at 90° and 270°. The curve climbs from −∞ at each asymptote, through 0 at 0° and 180°, to +∞ at the next asymptote. Key points: (0,0), (45°,1), (135°,−1), (180°,0). Chalk on dark green board. Square 1:1.

---

## BB-NEW-186 — Transforming the wave: amplitude, period, phase, and shift

**Subject:** maths | **Topic:** trigonometry | **Concept:** trig-transformations; y=A-sin(Bx+C)+D; amplitude; period; phase-shift | **Ground:** g1 | **Builds on:** [BB-NEW-184]

**Floor 0 (Idea):**
<p>y = sin x is the raw wave — amplitude 1, period 2π, starting at (0,0). The general form y = A sin(Bx + C) + D gives you four dials to turn. A stretches the wave vertically (amplitude). B compresses it horizontally (period becomes 2π/B). C slides it left or right (phase shift). D lifts the whole wave up or down (vertical shift). Four numbers, total control.</p>

**Floor 1 (Concrete):**
<p>Transform y = sin x into y = 3 sin(2x − 60°) + 1. Dial by dial: A = 3 — the wave now swings from −3 to +3 (amplitude 3). B = 2 — the period shrinks from 360° to 360°/2 = 180°. C = −60° (rewrite as 2(x − 30°)) — the wave shifts RIGHT by 30°. D = 1 — the whole wave lifts up by 1, so the midline is y = 1, and the range is [−2, 4]. The transformed wave crosses the midline at x = 30°, 120°, 210°... — every 90° (half the period). Peak at x = 30°+45° = 75° with y = 4. Trough at 30°+135° = 165° with y = −2.</p>

**Floor 2 (Definition):**
<p>For y = A sin(Bx + C) + D (x in radians or degrees): <strong>Amplitude</strong> = |A| — the distance from midline to peak. <strong>Period</strong> = 2π/|B| (or 360°/|B|). <strong>Phase shift</strong> = −C/B — horizontal translation; positive = right. <strong>Vertical shift</strong> = D — the midline. Range = [D−|A|, D+|A|]. The same transformations apply to y = A cos(Bx + C) + D. Write as y = A sin(B(x − h)) + D where h = phase shift to see the translation clearly.</p>

**Floor 3 (In action):**
<p>Real waves are never pure sin x. A sound wave has an amplitude (loudness), a frequency (pitch — B controls this), a phase (where in the cycle it starts), and may ride on a baseline pressure (D). An AC voltage is V = 170 sin(120πt) — amplitude 170 V (peaks at ±170; RMS is 120 V), angular frequency 120π rad/s (60 Hz). A tide: height = 2 sin(0.506t − 1.2) + 3 — amplitude 2 m (range 1–5 m), period 12.4 hours, shifted to match high tide timing, baseline 3 m above the datum. Four numbers capture the whole rhythm.</p>

**Image prompt:** A chalk graph showing four transformations of y = sin x, each on its own set of axes: (1) 2 sin x (amplitude doubled), (2) sin 2x (period halved), (3) sin(x−30°) (shifted right), (4) sin x + 1 (shifted up). Below, the general form y = A sin(Bx+C)+D with each parameter labelled. Chalk on dark green board. Square 1:1.

---

# Part 3 — Identities

---

## BB-NEW-187 — The mother identity: sin²θ + cos²θ = 1

**Subject:** maths | **Topic:** trigonometry | **Concept:** pythagorean-identity; sin²+cos²=1; unit-circle-proof | **Ground:** g0 | **Builds on:** [BB-NEW-180, BB-NEW-182]

**Floor 0 (Idea):**
<p>On the unit circle, every point satisfies x² + y² = 1. But x = cos θ and y = sin θ. Substitute and you get cos²θ + sin²θ = 1. This is the Pythagorean identity — not an extra fact to memorise, but Pythagoras' theorem wearing trig notation. It holds for every angle, without exception. If you know sin θ, you can find cos θ (up to sign), and vice versa.</p>

**Floor 1 (Concrete):**
<p>Verify with the exact values: at θ = 30°: sin²30° + cos²30° = (½)² + (√3/2)² = ¼ + ¾ = 1 ✓. At θ = 45°: (√2/2)² + (√2/2)² = ½ + ½ = 1 ✓. At θ = 60°: (√3/2)² + (½)² = ¾ + ¼ = 1 ✓. At θ = 150° (QII): sin 150° = ½, cos 150° = −√3/2. (½)² + (−√3/2)² = ¼ + ¾ = 1 ✓ — the identity doesn't care about the sign; squaring removes it. If sin θ = 3/5, then cos θ = ±√(1−9/25) = ±4/5 — positive if θ is in QI or QIV, negative in QII or QIII.</p>

**Floor 2 (Definition):**
<p><strong>sin²θ + cos²θ = 1</strong> is the fundamental Pythagorean identity, true for all real θ. It follows directly from the equation of the unit circle x² + y² = 1 with x = cos θ, y = sin θ. Dividing through by cos²θ gives <strong>1 + tan²θ = sec²θ</strong>. Dividing by sin²θ gives <strong>1 + cot²θ = cosec²θ</strong>. These three are equivalent — the first is the parent; the other two are its children.</p>

**Floor 3 (In action):**
<p>This identity is the universal relationship between sine and cosine. It lets you: (1) Find cos θ given sin θ (and a quadrant). (2) Prove other identities — almost every trig proof uses sin²+cos²=1 at some point. (3) Convert between sin and cos in equations — sin²θ = 1 − cos²θ. (4) Verify your calculations — if sin²+cos² doesn't equal 1, you've made an error. (5) Express parametric curves: x = cos t, y = sin t traces the unit circle BECAUSE x²+y² = cos²t+sin²t = 1. This single equation is the keystone of the entire trig arch.</p>

**Image prompt:** A chalk drawing of the unit circle with a point (cos θ, sin θ) marked. A right triangle is drawn with legs cos θ and sin θ, hypotenuse = 1. The Pythagorean equation cos²θ+sin²θ = 1 appears. Below: the exact values at 30°, 45°, 60° plugged in to verify the identity. Chalk on dark green board. Square 1:1.

---

## BB-NEW-188 — The identity toolkit: tan, sec, cosec, cot, and complementary angles

**Subject:** maths | **Topic:** trigonometry | **Concept:** reciprocal-identities; quotient-identity; complementary-angles; cofunction | **Ground:** g0 | **Builds on:** [BB-NEW-187]

**Floor 0 (Idea):**
<p>Sine, cosine, and tangent are the three you know. Four more are just reciprocals or ratios: sec θ = 1/cos θ, cosec θ = 1/sin θ, cot θ = 1/tan θ = cos θ/sin θ. And a beautiful symmetry: sin(90°−θ) = cos θ — the "co-" in cosine stands for "complementary." The sine of an angle is the cosine of its complement. These are not new facts; they're reorganisations of what you already know.</p>

**Floor 1 (Concrete):**
<p>If sin 30° = ½, then cosec 30° = 2. If cos 60° = ½, then sec 60° = 2. If tan 45° = 1, then cot 45° = 1. Complementary angle test: sin 30° = cos(90°−30°) = cos 60° = ½ ✓. tan 30° = cot(90°−30°) = cot 60°. Check: tan 30° = √3/3, cot 60° = 1/tan 60° = 1/√3 = √3/3 ✓. The exact values table now doubles in size — every value applies to two angles, linked by the complement. sin 30° = cos 60° = ½ is not a coincidence; it's the complement rule.</p>

**Floor 2 (Definition):**
<p>The six trig functions: <strong>sec θ = 1/cos θ</strong>, <strong>cosec θ = 1/sin θ</strong>, <strong>cot θ = 1/tan θ = cos θ/sin θ</strong>. <strong>Quotient identity</strong>: tan θ = sin θ/cos θ. <strong>Cofunction identities</strong> (complementary angle θ → 90°−θ): sin(90°−θ) = cos θ, cos(90°−θ) = sin θ, tan(90°−θ) = cot θ, cot(90°−θ) = tan θ, sec(90°−θ) = cosec θ, cosec(90°−θ) = sec θ. The prefix "co-" in cosine, cotangent, cosecant stands for "complement's."</p>

**Floor 3 (In action):**
<p>These identities expand your solving toolkit. cosec x = 2 means sin x = ½ → x = 30° or 150° (plus periods). sec x = −√2 means cos x = −1/√2 = −√2/2 → x = 135° or 225°. The complementary identities let you convert between sin and cos instantly — if an equation mixes both, replace one with the cofunction of the complement to reduce to a single trig function. These are not extra facts; they're the same facts, recomposed. The toolkit gives you flexibility, but the exact values table is still the source.</p>

**Image prompt:** A chalk drawing showing the six trig functions arranged as three reciprocal pairs: sin↔cosec, cos↔sec, tan↔cot. Below: a right triangle with θ and (90°−θ) labelled, showing sin(90°−θ) = cos θ via the swapped opposite/adjacent sides. Exact values verified: sin 30° = cos 60° = ½. Chalk on dark green board. Square 1:1.

---

## BB-NEW-189 — Compound angles: sin(A±B) and the double-angle formulas

**Subject:** maths | **Topic:** trigonometry | **Concept:** compound-angle; sin(A+B); cos(A+B); double-angle; sin2A; cos2A | **Ground:** g1 | **Builds on:** [BB-NEW-182, BB-NEW-187]

**Floor 0 (Idea):**
<p>sin(A+B) is NOT sin A + sin B. Trig functions don't distribute over addition. Instead, sin(A+B) = sin A cos B + cos A sin B. The compound angle formulas are among the most powerful identities in mathematics — they let you find the trig values of sums and differences, derive double-angle formulas, and ultimately connect trigonometry to complex numbers and rotations.</p>

**Floor 1 (Concrete):**
<p>Find sin 75° without a calculator. 75° = 45° + 30°. sin 75° = sin 45° cos 30° + cos 45° sin 30° = (√2/2)(√3/2) + (√2/2)(½) = √6/4 + √2/4 = (√6+√2)/4 ≈ 0.966. Find cos 15°: 15° = 45° − 30°. cos 15° = cos 45° cos 30° + sin 45° sin 30° = (√2/2)(√3/2) + (√2/2)(½) = (√6+√2)/4 ≈ 0.966 — same value because cos 15° = sin 75° (complementary angles). Exact: sin 75° = cos 15° = (√6+√2)/4.</p>

**Floor 2 (Definition):**
<p><strong>Compound angle formulas:</strong> sin(A+B) = sin A cos B + cos A sin B. sin(A−B) = sin A cos B − cos A sin B. cos(A+B) = cos A cos B − sin A sin B. cos(A−B) = cos A cos B + sin A sin B. tan(A+B) = (tan A + tan B)/(1 − tan A tan B). tan(A−B) = (tan A − tan B)/(1 + tan A tan B). <strong>Double-angle formulas</strong> (set B = A): sin 2A = 2 sin A cos A. cos 2A = cos²A − sin²A = 2 cos²A − 1 = 1 − 2 sin²A. tan 2A = 2 tan A / (1 − tan²A).</p>

**Floor 3 (In action):**
<p>These formulas unlock trigonometry beyond the standard angles. sin 75° = (√6+√2)/4 was impossible without the compound formula. In projectiles, the range formula R = (u² sin 2θ)/g uses sin 2θ — the double-angle formula connects launch angle to range. In calculus, the derivative of sin x is cos x, provable using the compound formula and the limit definition. In complex numbers, e^(iθ) = cos θ + i sin θ — Euler's formula — from which the compound angle formulas fall out as simple exponent addition: e^(i(A+B)) = e^(iA)·e^(iB). These formulas are the bridge from trig to everything above it.</p>

**Image prompt:** A chalk drawing showing the compound angle formulas in a box. Below, a worked example: sin 75° = sin(45°+30°) with the expansion and exact value (√6+√2)/4. Beside it: the double-angle formulas. A geometric proof sketch: two right triangles stacked to form the sum angle. Chalk on dark green board. Square 1:1.

---

# Part 4 — Solving, applying, and cross-topic connections

---

## BB-NEW-190 — Solving trigonometric equations: find ALL the angles

**Subject:** maths | **Topic:** trigonometry | **Concept:** trig-equations; general-solution; periodic-solutions; principal-value | **Ground:** g1 | **Builds on:** [BB-NEW-183, BB-NEW-182]

**Floor 0 (Idea):**
<p>sin x = ½. How many solutions? Infinitely many. x = 30° works, but so does 150° (QII, sin also positive), and adding or subtracting 360° to either gives another — 390°, 510°, −330°... A trig equation doesn't ask for one answer; it asks for the pattern that generates all of them. The general solution captures this pattern in a single compact expression.</p>

**Floor 1 (Concrete):**
<p>Solve sin x = ½ for all x. The principal values (0°–360°): x = 30° (QI) and x = 150° (QII). The general solution: x = 30° + 360°n OR x = 150° + 360°n, where n is any integer (n ∈ ℤ). In radians: x = π/6 + 2πn or x = 5π/6 + 2πn. Solve cos x = −√2/2. cos is negative in QII and QIII. Reference angle: cos⁻¹(√2/2) = 45°. So x = 135° + 360°n or x = 225° + 360°n. Solve tan x = √3. tan 60° = √3. tan period is 180°, so x = 60° + 180°n. In radians: x = π/3 + πn.</p>

**Floor 2 (Definition):**
<p>For <strong>sin x = k</strong> (|k| ≤ 1): let α = sin⁻¹(k), the principal value in [−90°, 90°]. General solution: x = α + 360°n OR x = (180° − α) + 360°n. For <strong>cos x = k</strong> (|k| ≤ 1): let α = cos⁻¹(k) in [0°, 180°]. General solution: x = ±α + 360°n. For <strong>tan x = k</strong>: let α = tan⁻¹(k) in (−90°, 90°). General solution: x = α + 180°n. In radians, replace 360° with 2π and 180° with π. Always express n ∈ ℤ (integer).</p>

**Floor 3 (In action):**
<p>Trig equations appear in every field that uses waves or rotation. "When does the pendulum reach angle 5°?" → solve sin(ωt) = 0.087. "At what times is the AC voltage 0?" → solve 170 sin(120πt) = 0. "Find all x where the projectile's height is 10 m" → solve a quadratic in sin θ. The solution is never just one angle — it's a family of angles separated by the period. Understanding the general solution means understanding the repeating nature of the circle: every answer comes around again, and again, forever.</p>

**Image prompt:** A chalk drawing of the unit circle with points at 30° and 150° marked (sin=½). Below: the general solution x = 30°+360°n and x = 150°+360°n. A timeline shows the repeating pattern: ..., −330°, 30°, 390°, 750°, ... and ..., −210°, 150°, 510°, 870°, ... Chalk on dark green board. Square 1:1.

---

## BB-NEW-191 — The sine and cosine rules: solving any triangle

**Subject:** maths | **Topic:** trigonometry | **Concept:** sine-rule; cosine-rule; solving-triangles; non-right-triangles | **Ground:** g1 | **Builds on:** [BB-NEW-182, BB-NEW-189]

**Floor 0 (Idea):**
<p>SOH-CAH-TOA only works for right triangles. For any triangle — acute, obtuse, scalene — two rules extend trigonometry's reach. The sine rule links sides to the sines of opposite angles. The cosine rule generalises Pythagoras by subtracting a term that accounts for the angle not being 90°. Together, given any three pieces of a triangle (not all angles), you can find the rest.</p>

**Floor 1 (Concrete):**
<p>Triangle ABC: a = 7 cm (opposite A), b = 9 cm (opposite B), angle A = 40°. Find angle B. Sine rule: a/sin A = b/sin B → 7/sin 40° = 9/sin B → sin B = 9 sin 40°/7 ≈ 9(0.643)/7 ≈ 0.826. B = sin⁻¹(0.826) ≈ 55.7° or 124.3°. Which one? Since a < b, A < B, so B must be the larger — 124.3° is too large (A+B would > 180° → C negative). Actually let's check: if B=55.7°, C=180°−40°−55.7°=84.3° — possible. If B=124.3°, C=15.7° — also possible (this is the ambiguous case). Both triangles exist with the given data. The sine rule alone can give two possible triangles.</p>

**Floor 2 (Definition):**
<p><strong>Sine rule:</strong> a/sin A = b/sin B = c/sin C = 2R (where R is the circumradius). Use when you know: two angles + one side (AAS/ASA), or two sides + a non-included angle (SSA — ambiguous case, check for a second solution). <strong>Cosine rule:</strong> a² = b² + c² − 2bc cos A (and cyclic permutations). Use when you know: two sides + included angle (SAS), or three sides (SSS). The cosine rule gives a unique triangle — no ambiguous case. When A = 90°, cos 90° = 0 and the cosine rule reduces to a² = b² + c² — Pythagoras.</p>

**Floor 3 (In action):**
<p>These rules are trigonometry's real-world workhorses. A surveyor measures two angles and one distance — the sine rule gives every other distance. A navigator has two bearings and a known baseline — the sine rule gives the distance to each landmark. An engineer designing a truss knows three side lengths — the cosine rule gives every angle. The ambiguous case of the sine rule is not a flaw; it's geometry's honesty — two different triangles can share two sides and a non-included angle, and the maths tells you about both. The cosine rule, by contrast, is decisive: three sides determine one triangle, no ambiguity.</p>

**Image prompt:** A chalk drawing of a scalene triangle ABC with sides a, b, c labelled opposite vertices A, B, C. The sine rule and cosine rule formulas in separate boxes. Below: a worked example of the ambiguous case — two possible triangles from the same SSA data, one acute, one obtuse. Chalk on dark green board. Square 1:1.

---

## BB-NEW-192 — Trigonometry and projectiles: why 45° gives maximum range

**Subject:** maths | **Topic:** trigonometry | **Concept:** projectile-trig; range-formula; sin2θ; max-range; resolving-velocity | **Ground:** g1 | **Builds on:** [BB-NEW-182, BB-NEW-189, Card 29, BB-NEW-25]

**Floor 0 (Idea):**
<p>A projectile's path is governed by two equations — horizontal coasting and vertical free fall — but the launch angle θ is the master control. It decides how the initial speed splits between horizontal reach and vertical hang time. The range formula R = (u² sin 2θ)/g captures the trade-off. sin 2θ peaks at 1 when 2θ = 90°, so θ = 45° — the perfect compromise between going forward and staying up.</p>

**Floor 1 (Concrete):**
<p>Launch speed u = 20 m/s, g = 10 m/s². Compute the range at different angles using R = (u² sin 2θ)/g. At θ = 15°: sin 30° = ½, R = 400(½)/10 = 20 m. At θ = 30°: sin 60° = √3/2 ≈ 0.866, R = 400(0.866)/10 = 34.6 m. At θ = 45°: sin 90° = 1, R = 400(1)/10 = 40 m — maximum. At θ = 60°: sin 120° = sin 60° = √3/2, R = 34.6 m — same as 30°. At θ = 75°: sin 150° = sin 30° = ½, R = 20 m — same as 15°. The range is symmetrical: complementary angles (θ and 90°−θ) give the same range because sin 2θ = sin(180°−2θ) = sin 2(90°−θ).</p>

**Floor 2 (Definition):**
<p>For a projectile launched from ground level with initial speed u at angle θ: the initial velocity resolves into uₓ = <strong>u cos θ</strong> (horizontal) and uᵧ = <strong>u sin θ</strong> (vertical). Time of flight T = <strong>2u sin θ / g</strong>. Maximum height H = <strong>u² sin² θ / (2g)</strong>. Range R = uₓ × T = <strong>u² (2 sin θ cos θ) / g = u² sin 2θ / g</strong>. The double-angle identity sin 2θ = 2 sin θ cos θ collapses the product into one trig function. Maximum range at θ = 45° (sin 2θ = 1). Two angles summing to 90° give equal ranges.</p>

**Floor 3 (In action):**
<p>Every time you see a thrown ball, a fired cannon, or a long-jumper's arc, you're watching sin 2θ at work. Firefighters aim hoses at 45° for maximum reach. Golfers adjust loft angle for distance — a driver is ~10° (low, long carry), a wedge is ~45° (high, shorter). In artillery, the same target can be hit at a low trajectory (shallow angle, short flight) or a high trajectory (steep angle, long flight) — the two complementary-angle solutions. Trigonometry doesn't just describe the arc; it predicts it, optimises it, and reveals why the compromise at 45° is geometrically perfect.</p>

**Image prompt:** A chalk drawing of projectile trajectories at 15°, 30°, 45°, 60°, 75° from the same launch point. The 45° trajectory has the longest range. 30° and 60° land at the same spot (labelled). Below: the range formula R = u² sin 2θ / g with sin 2θ values for each angle computed. Chalk on dark green board. Square 1:1.

---

## BB-NEW-193 — Trigonometry and vectors: the resolution engine

**Subject:** maths | **Topic:** trigonometry | **Concept:** vector-resolution; sin-cos-components; dot-product-angle; cross-product-sin | **Ground:** g1 | **Builds on:** [BB-NEW-182, BB-NEW-167, BB-NEW-168]

**Floor 0 (Idea):**
<p>Every vector that isn't perfectly horizontal or vertical gets split into components using sine and cosine. The angle a force makes with the horizontal determines its push-right vs lift-up ratio. The angle between two vectors determines their dot product (via cos) and their cross product (via sin). Trigonometry is the translator between a vector's magnitude-and-direction form and its component form. Without it, vectors stop being computable.</p>

**Floor 1 (Concrete):**
<p>A force F⃗ = 100 N at 30° above the horizontal. The horizontal component Fₓ = 100 cos 30° = 100(√3/2) = 50√3 ≈ 86.6 N. The vertical component Fᵧ = 100 sin 30° = 100(½) = 50 N. The angle between F⃗ = 100∠30° and d⃗ = 5∠0° (horizontal displacement) is 30°. The work: W = F⃗·d⃗ = |F||d| cos 30° = 100(5)(√3/2) = 250√3 ≈ 433 J. Only the horizontal component does work — and cos 30° = √3/2 is the fraction of the force that acts horizontally. Sin and cos are not abstract ratios; they are the numerical answer to "how much of this vector points that way?"</p>

**Floor 2 (Definition):**
<p>For a vector of magnitude V at angle θ from the positive x-axis: x-component = <strong>V cos θ</strong>, y-component = <strong>V sin θ</strong>. Magnitude recovery: V = √(Vₓ² + Vᵧ²); direction: θ = tan⁻¹(Vᵧ/Vₓ). The angle between two vectors a⃗ and b⃗ is given by <strong>cos φ = (a⃗·b⃗)/(|a||b|)</strong>. The magnitude of the cross product is <strong>|a⃗ × b⃗| = |a||b| sin φ</strong>. The dot product uses cos (adjacent — how much overlap); the cross product uses sin (opposite — the perpendicular component that produces torque and area).</p>

**Floor 3 (In action):**
<p>Every physics problem that says "a force at 30°" or "velocity at 45°" immediately invokes sin 30° = ½, cos 45° = √2/2 — the exact values table. The connection is bidirectional: given components, tan⁻¹ recovers the angle; given the angle, sin and cos yield the components. In statics, ΣFₓ = 0 produces equations full of cos terms; ΣFᵧ = 0 produces equations full of sin terms. In dynamics, F = ma along each axis uses the same resolution. The trig-vector loop — resolve with sin/cos, compute, reassemble magnitude and direction with Pythagoras and tan⁻¹ — is the most-used workflow in all of mechanics.</p>

**Image prompt:** A chalk drawing of a vector F⃗ = 100 N at 30°. Dashed lines drop to the axes showing Fₓ = 100 cos 30° and Fᵧ = 100 sin 30° with the exact values 50√3 and 50. Beside: the dot product calculation for work using cos 30°. Below: the magnitude-direction ↔ components conversion formulas. Chalk on dark green board. Square 1:1.

---

## BB-NEW-194 — The rotation matrix: trigonometry meets matrices

**Subject:** maths | **Topic:** trigonometry | **Concept:** rotation-matrix; matrix-transformation; trig-in-matrices; transforming-points | **Ground:** g1 | **Builds on:** [BB-NEW-182, BB-NEW-189, BB-NEW-75]

**Floor 0 (Idea):**
<p>Take a point (x, y) and rotate it anticlockwise by angle θ around the origin. Where does it go? The answer is a matrix multiplication: [cos θ, −sin θ; sin θ, cos θ] × [x; y] = [x cos θ − y sin θ; x sin θ + y cos θ]. This 2×2 array of sines and cosines is the rotation matrix — four numbers that encode a pure rotation. It's trigonometry in grid form, and it's the bridge between the triangle and the transformation.</p>

**Floor 1 (Concrete):**
<p>Rotate the point (1, 0) by 90° anticlockwise. Expected result: (0, 1). The rotation matrix for 90°: cos 90° = 0, sin 90° = 1. R₉₀ = [0 −1; 1 0]. Multiply: [0 −1; 1 0] × [1; 0] = [0×1 + (−1)×0; 1×1 + 0×0] = [0; 1] ✓. Rotate (1, 1) by 45°. R₄₅ = [cos 45° −sin 45°; sin 45° cos 45°] = [√2/2 −√2/2; √2/2 √2/2]. New point: [√2/2−√2/2; √2/2+√2/2] = [0; √2] ≈ (0, 1.414). At 45°, the rotated point lies on the y-axis. Rotate by 60°: R₆₀ = [½ −√3/2; √3/2 ½]. (1, 0) → (½, √3/2) ≈ (0.5, 0.866) — the point on the unit circle at 60°, confirming that (cos 60°, sin 60°) = (½, √3/2).</p>

**Floor 2 (Definition):**
<p>The <strong>rotation matrix</strong> for angle θ (anticlockwise) is:</p>
<div class='formula'>R(θ) = [cos θ  −sin θ]<br>       [sin θ   cos θ]<span class='gloss'>Multiplying this matrix by a column vector [x; y] rotates that point by θ about the origin.</span></div>
<p>Properties: R(θ₁) × R(θ₂) = R(θ₁+θ₂) — composing two rotations adds the angles. R(θ)⁻¹ = R(−θ) — the inverse rotates back by the negative angle. The determinant of R(θ) is cos²θ + sin²θ = 1 — rotation preserves area. The columns of R(θ) are the images of î and ĵ after rotation: î → (cos θ, sin θ), ĵ → (−sin θ, cos θ).</p>

**Floor 3 (In action):**
<p>The rotation matrix is why graphics engines, robotics, and physics simulations use matrices. To rotate a 3D model, multiply every vertex by a rotation matrix. To orient a spacecraft, multiply its attitude vectors by rotation matrices — one each for pitch, yaw, and roll. The compound angle formulas are hiding in the composition property: R(α)R(β) = R(α+β) means multiplying the matrices gives [cos(α+β) −sin(α+β); sin(α+β) cos(α+β)], and the matrix multiplication rules produce exactly the compound angle formulas. Trigonometry didn't just meet matrices — they turned out to be the same thing, written in different notation.</p>

**Image prompt:** A chalk drawing of a point (x,y) on a grid. An arrow curves it to its rotated position (x',y'). The rotation matrix R(θ) is shown. Below: R(90°) × (1,0) = (0,1), R(45°) × (1,1) = (0,√2). The matrix multiplication is shown step by step with the exact trig values substituted. Chalk on dark green board. Square 1:1.

---

## BB-NEW-195 — Trigonometry and complex numbers: Euler's formula (preview)

**Subject:** maths | **Topic:** trigonometry | **Concept:** eulers-formula; e^(iθ); cis; complex-plane | **Ground:** g1 | **Builds on:** [BB-NEW-180, BB-NEW-189, BB-NEW-194]

**Floor 0 (Idea):**
<p>e^(iθ) = cos θ + i sin θ. This is Euler's formula — one of the most celebrated equations in mathematics. It says that the exponential function, when given an imaginary input, traces the unit circle. Every point on the unit circle can be written as e^(iθ) — a single complex number that encodes both the angle and the position. Trigonometry and complex numbers are two languages for the same geometry.</p>

**Floor 1 (Concrete):**
<p>e^(i·0) = cos 0 + i sin 0 = 1 + 0i = 1. e^(i·π/2) = cos 90° + i sin 90° = 0 + i = i. e^(iπ) = cos 180° + i sin 180° = −1 + 0i = −1 — so e^(iπ) + 1 = 0, the famous identity linking e, i, π, 1, and 0. e^(i·π/4) = cos 45° + i sin 45° = √2/2 + i(√2/2). e^(i·π/6) = cos 30° + i sin 30° = √3/2 + i(½). The compound angle formulas are hidden in exponent addition: e^(i(A+B)) = e^(iA)·e^(iB) expands to cos(A+B) + i sin(A+B) = (cos A + i sin A)(cos B + i sin B). Multiply the right side, equate real and imaginary parts, and out come sin(A+B) and cos(A+B) — no memorisation required.</p>

**Floor 2 (Definition):**
<p><strong>Euler's formula:</strong> e^(iθ) = cos θ + i sin θ, where i² = −1. This defines the <strong>complex exponential</strong> and maps every real θ to a point on the unit circle in the complex plane. The magnitude |e^(iθ)| = √(cos²θ+sin²θ) = 1 — always on the unit circle. The <strong>argument</strong> (angle) of e^(iθ) is θ. Multiplying complex numbers adds their angles: (e^(iα))(e^(iβ)) = e^(i(α+β)). This encodes both the compound angle formulas and the composition of rotations in one algebraic identity.</p>

**Floor 3 (In action):**
<p>Euler's formula unifies trigonometry, exponentials, and complex numbers into one framework. De Moivre's theorem (e^(iθ))ⁿ = e^(inθ) → (cos θ + i sin θ)ⁿ = cos(nθ) + i sin(nθ) — a formula for sines and cosines of multiples that would be tedious to derive with compound angle formulas. In electrical engineering, AC circuits are analysed using complex impedances — voltage and current are complex numbers rotating on the circle. In quantum mechanics, the wavefunction oscillates as e^(iωt). The sine and cosine you learned from triangles turn out to be the coordinates of a single rotating complex number — and Euler's formula is the key that unlocks this view.</p>

**Image prompt:** A chalk drawing of the unit circle in the complex plane (real axis horizontal, imaginary axis vertical). Points labelled: e^(i·0) = 1, e^(iπ/6) = √3/2+i/2, e^(iπ/4) = √2/2+i√2/2, e^(iπ/3) = 1/2+i√3/2, e^(iπ/2) = i, e^(iπ) = −1. Euler's formula in a box: e^(iθ) = cos θ + i sin θ. Chalk on dark green board. Square 1:1.

---

## Summary

### Part 1 — Unit circle & exact values (4 BBs)
| # | Title | Values drilled? |
|---|-------|:---:|
| 180 | The unit circle: (cos θ, sin θ) | ✅ |
| 181 | The special angles — where they come from | ✅ |
| 182 | The exact values table — your multiplication table | ✅✅✅ |
| 183 | Angles beyond 90°: ASTC and reference angles | ✅ |

### Part 2 — Graphs & periodicity (3 BBs)
| # | Title | Values drilled? |
|---|-------|:---:|
| 184 | The sine and cosine graphs | ✅ |
| 185 | The tangent graph | ✅ |
| 186 | Transforming the wave (A, B, C, D) | — |

### Part 3 — Identities (3 BBs)
| # | Title | Values drilled? |
|---|-------|:---:|
| 187 | sin²θ + cos²θ = 1 | ✅ |
| 188 | The identity toolkit (sec, cosec, cot, cofunctions) | ✅ |
| 189 | Compound angles and double-angle formulas | ✅ |

### Part 4 — Solving & cross-topic connections (5 BBs)
| # | Title | Cross-connection |
|---|-------|-----------------|
| 190 | Solving trig equations | General solutions, periodicity |
| 191 | Sine and cosine rules | Any triangle, surveying, navigation |
| 192 | Trig and projectiles | sin 2θ → max range at 45° |
| 193 | Trig and vectors | Resolution, dot/cross products |
| 194 | The rotation matrix | [[cos θ, −sin θ], [sin θ, cos θ]] |
| 195 | Euler's formula (preview) | e^(iθ) = cos θ + i sin θ |

**16 BBs.** The exact values (sin/cos/tan at 0°, 30°, 45°, 60°, 90°) appear in **9 of the 16 BBs** — the repetition is deliberate. Cross-connections: projectiles (BB 192), vectors (BB 193), matrices (BB 194), complex numbers (BB 195). The table in BB 182 is the linchpin — drill it, and everything else becomes pattern recognition rather than memorisation.
