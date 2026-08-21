# Verma Volume 1 → Vectors — Complete Course (12 BBs)

A comprehensive vectors course drawn from Chapter 2 of H.C. Verma's *Concepts of Physics, Volume 1*. Existing coverage (Cards 21–23 and BB 92–94) is narrative/introductory. This batch fills every formal gap: component representation, unit vectors, direction cosines, vector subtraction, scalar multiplication, deep resolution, dot/cross product in component form, vector equations, differentiation, and 3D extension. Designed as a <1-hour workout — each BB is dense and physical.

---

# Part 1 — Vector fundamentals

---

## BB-NEW-160 — The two ways to describe a vector: arrow and algebra

**Subject:** physics | **Topic:** vectors | **Concept:** vector-representation; component-form; aî+bĵ+ck̂ | **Ground:** g0 | **Builds on:** [Card 21, BB 92]

**Floor 0 (Idea):**
<p>You can draw a vector as an arrow — length shows how much, pointing shows which way. But you can also write it as a list of numbers: the amount it reaches along x, the amount along y, the amount along z. This is the component form. The arrow and the algebra describe the same thing — one for seeing, one for calculating.</p>

**Floor 1 (Concrete):**
<p>A force of 10 N pushes at 30° above the horizontal. As an arrow: drawn from the origin, length 10 units, angled at 30°. As algebra: the horizontal component is 10 cos 30° ≈ 8.66, the vertical is 10 sin 30° = 5. Written as F⃗ = 8.66î + 5ĵ newtons. The two forms are equivalent. The arrow lets you see the direction at a glance. The algebra lets you add five forces together without drawing a single arrow — you just add the î-components and ĵ-components separately.</p>

**Floor 2 (Definition):**
<p>A vector in 2D is written as <strong>a⃗ = aₓî + aᵧĵ</strong>, where aₓ and aᵧ are the <strong>components</strong> (scalar projections onto the x and y axes), and î and ĵ are the <strong>unit vectors</strong> (magnitude 1) pointing along the positive x and y directions. In 3D: <strong>a⃗ = aₓî + aᵧĵ + a𝓏k̂</strong>. The components aₓ, aᵧ, a𝓏 can be positive, negative, or zero. A vector is completely specified by its components — no arrow required. This is the algebraic representation: powerful, computable, and the basis of every vector operation that follows.</p>

**Floor 3 (In action):**
<p>The component form is why computers handle vectors effortlessly. A game engine doesn't draw arrows — it stores every velocity, force, and position as three numbers (x, y, z). Adding forces is just adding numbers. Rotating a character is multiplying those numbers by a rotation matrix. Every vector operation in physics — from adding forces on a bridge to computing a spacecraft's trajectory — is done in component form. The arrow is for humans; the components are for machines and mathematics.</p>

**Image prompt:** A chalk drawing of an arrow from origin to point (8.66, 5) at 30°. The arrow is labelled F⃗ = 10 N. Dotted lines drop from the tip to the axes showing aₓ = 10 cos 30° = 8.66 and aᵧ = 10 sin 30° = 5. Beside it: F⃗ = 8.66î + 5ĵ. The two representations are linked with an equals sign. Chalk on dark green board. Square 1:1.

---

## BB-NEW-161 — Magnitude and direction: reading the arrow from the numbers

**Subject:** physics | **Topic:** vectors | **Concept:** vector-magnitude; direction-cosines; Pythagoras-in-3D | **Ground:** g0 | **Builds on:** [BB-NEW-160]

**Floor 0 (Idea):**
<p>Given a vector in component form — 3î + 4ĵ — how long is it, and which way does it point? The magnitude is the length of the arrow: Pythagoras gives |a⃗| = √(3² + 4²) = 5. The direction is given by the angles it makes with each axis. These two numbers — how long, which way — are the essence of any vector.</p>

**Floor 1 (Concrete):**
<p>a⃗ = 3î + 4ĵ + 12k̂. Magnitude: |a⃗| = √(9 + 16 + 144) = √169 = 13. Direction cosines: cos α = aₓ/|a⃗| = 3/13, so α = cos⁻¹(3/13) ≈ 76.7° — the angle between a⃗ and the x-axis. cos β = 4/13, β ≈ 72.1° (with y-axis). cos γ = 12/13, γ ≈ 22.6° (with z-axis). Check: cos²α + cos²β + cos²γ = (9+16+144)/169 = 169/169 = 1 ✓. The direction cosines always square-sum to 1 — they are the coordinates of the unit vector in that direction.</p>

**Floor 2 (Definition):**
<p>The <strong>magnitude</strong> (or modulus) of a⃗ = aₓî + aᵧĵ + a𝓏k̂ is |a⃗| = √(aₓ² + aᵧ² + a𝓏²). The <strong>direction cosines</strong> are l = cos α = aₓ/|a⃗|, m = cos β = aᵧ/|a⃗|, n = cos γ = a𝓏/|a⃗|, where α, β, γ are the angles the vector makes with the positive x, y, z axes. Fundamental identity: l² + m² + n² = 1. Two vectors are <strong>parallel</strong> if their direction cosines are equal (or one is the negative of the other).</p>

**Floor 3 (In action):**
<p>In physics, magnitude and direction are never far apart. "A 20 N force" is just a magnitude — incomplete. "At 45° to the horizontal" completes it. From these, the components are computed: F⃗ = 20 cos 45° î + 20 sin 45° ĵ = 14.14î + 14.14ĵ. The reverse: given F⃗ = 10î − 24ĵ from a free body diagram, the magnitude is |F⃗| = √(100 + 576) = 26 N, and the direction is tan⁻¹(24/10) below the x-axis. The arrow → numbers → arrow loop is the constant rhythm of vector problem-solving.</p>

**Image prompt:** A chalk drawing of a 3D vector a⃗ = 3î + 4ĵ + 12k̂ shown as an arrow in a 3D coordinate system. The three direction angles α, β, γ are labelled. The magnitude calculation √(9+16+144) = 13 appears beside. Direction cosines 3/13, 4/13, 12/13 listed. Chalk on dark green board. Square 1:1.

---

## BB-NEW-162 — Unit vectors: the pure direction, stripped of length

**Subject:** physics | **Topic:** vectors | **Concept:** unit-vector; î-ĵ-k̂; normalisation | **Ground:** g0 | **Builds on:** [BB-NEW-160]

**Floor 0 (Idea):**
<p>A vector carries two pieces of information: how much (magnitude) and which way (direction). A unit vector is a vector stripped of the "how much" — its magnitude is exactly 1, so it carries only direction. Any vector can be written as its magnitude multiplied by a unit vector pointing the right way. This is the cleanest split in all of vector algebra.</p>

**Floor 1 (Concrete):**
<p>A velocity v⃗ = 6î + 8ĵ m/s. Its magnitude is |v⃗| = √(36+64) = 10 m/s. The unit vector in that direction is v̂ = v⃗/|v⃗| = (6î + 8ĵ)/10 = 0.6î + 0.8ĵ. Check: |v̂| = √(0.36+0.64) = 1 ✓. So v⃗ = 10 × (0.6î + 0.8ĵ) = (magnitude) × (direction). The special unit vectors î, ĵ, k̂ point along the positive x, y, z axes — they are the building blocks. Every vector in space is just three numbers multiplied by these three directions.</p>

**Floor 2 (Definition):**
<p>A <strong>unit vector</strong> is a vector whose magnitude is exactly 1. Given any non-zero vector a⃗, the unit vector in its direction is <strong>â = a⃗ / |a⃗|</strong> (read "a-hat"). The standard unit vectors along the coordinate axes are î = (1,0,0), ĵ = (0,1,0), k̂ = (0,0,1). Every vector can be uniquely expressed as a⃗ = |a⃗|·â. The components of â are the direction cosines: â = l î + m ĵ + n k̂, where l² + m² + n² = 1.</p>

**Floor 3 (In action):**
<p>Unit vectors separate the physics of "how strong" from "which way." Two forces of 5 N and 100 N acting in the same direction have different magnitudes but the same unit vector. In Coulomb's law F⃗ = kq₁q₂/r² · r̂, the r̂ is the unit vector from one charge to the other — it carries the direction while kq₁q₂/r² carries the magnitude. In a gradient, the direction of steepest ascent is a unit vector. Whenever you need pure direction without caring about strength, you reach for a unit vector.</p>

**Image prompt:** A chalk drawing of a vector v⃗ = 6î + 8ĵ shown as an arrow. Beside it, the same arrow is broken into "magnitude 10 × direction (0.6î+0.8ĵ)." Below, î, ĵ, k̂ are drawn as small arrows of length 1 along the three axes. Chalk on dark green board. Square 1:1.

---

# Part 2 — Vector algebra

---

## BB-NEW-163 — Position and displacement: where it is, and how it moved

**Subject:** physics | **Topic:** vectors | **Concept:** position-vector; displacement-vector; section-formula | **Ground:** g0 | **Builds on:** [BB-NEW-160, BB-NEW-14]

**Floor 0 (Idea):**
<p>A position vector is an arrow from the origin to where something is. A displacement vector is an arrow from where it was to where it is now. The position tells you the address. The displacement tells you the journey — how far, in which direction, from start to finish. They are different vectors with different meanings.</p>

**Floor 1 (Concrete):**
<p>A particle moves from point A(2, 3, 1) to B(5, 7, 4). The position vector of A is r⃗_A = 2î + 3ĵ + 1k̂. Of B: r⃗_B = 5î + 7ĵ + 4k̂. The displacement from A to B is Δr⃗ = r⃗_B − r⃗_A = (5−2)î + (7−3)ĵ + (4−1)k̂ = 3î + 4ĵ + 3k̂. Its magnitude: |Δr⃗| = √(9+16+9) = √34 ≈ 5.83 units. The position depends on where you put the origin; the displacement does not — shift the origin by 10 units and both position vectors change, but their difference stays the same. Displacement is objective; position is relative to a chosen reference.</p>

**Floor 2 (Definition):**
<p>The <strong>position vector</strong> r⃗ of a point P(x, y, z) is r⃗ = xî + yĵ + zk̂ — the vector from the origin O to P. The <strong>displacement vector</strong> from point A(r⃗₁) to point B(r⃗₂) is Δr⃗ = r⃗₂ − r⃗₁. Displacement is independent of the choice of origin — it's a free vector. The <strong>section formula</strong> gives the position vector of a point dividing AB in ratio m:n: r⃗ = (n r⃗₁ + m r⃗₂)/(m+n) for internal division, r⃗ = (m r⃗₂ − n r⃗₁)/(m−n) for external division.</p>

**Floor 3 (In action):**
<p>The distinction between position and displacement is the distinction between "where" and "how far from where I started." A GPS gives your position. An odometer reading subtracted from earlier gives distance — scalar, not displacement. Your displacement after driving in a circle is zero; your distance is the circumference. In physics, displacement enters the definition of velocity (v⃗ = Δr⃗/Δt), work (W = F⃗·Δr⃗), and potential energy. Position enters the definition of angular momentum (L⃗ = r⃗ × p⃗) and torque. They are two of the most-used vectors in all of mechanics.</p>

**Image prompt:** A chalk drawing of the origin O, point A(2,3,1), point B(5,7,4). Arrows r⃗_A and r⃗_B from O to each point. The displacement Δr⃗ = r⃗_B − r⃗_A drawn as a separate arrow from A to B. Below: the section formula for a point dividing AB. Chalk on dark green board. Square 1:1.

---

## BB-NEW-164 — Multiplying a vector by a number: stretch, shrink, or reverse

**Subject:** physics | **Topic:** vectors | **Concept:** scalar-multiplication-vector; scaling; parallel-vectors | **Ground:** g0 | **Builds on:** [BB-NEW-160]

**Floor 0 (Idea):**
<p>Multiply a vector by 2 and it doubles in length — same direction, twice the reach. Multiply by ½ and it shrinks to half. Multiply by −1 and it flips to point exactly opposite. Multiply by 0 and it collapses to the zero vector — no length, no direction. This is scalar multiplication: every component gets multiplied by the same number.</p>

**Floor 1 (Concrete):**
<p>A force F⃗ = 3î − 2ĵ + 5k̂ N. Double it: 2F⃗ = 6î − 4ĵ + 10k̂ N — twice the push in every direction. Halve it: ½F⃗ = 1.5î − ĵ + 2.5k̂ N. Reverse it: −F⃗ = −3î + 2ĵ − 5k̂ N — the same strength, opposite direction. If F⃗ pulls east, −F⃗ pulls west. If λ is the scalar: λF⃗ has magnitude |λ|·|F⃗|. If λ > 0, direction unchanged. If λ < 0, direction reversed. Two vectors are parallel if one is a scalar multiple of the other: a⃗ ∥ b⃗ means a⃗ = λb⃗ for some λ.</p>

**Floor 2 (Definition):**
<p><strong>Scalar multiplication</strong> of a vector a⃗ = aₓî + aᵧĵ + a𝓏k̂ by a scalar λ yields λa⃗ = (λaₓ)î + (λaᵧ)ĵ + (λa𝓏)k̂. Properties: (1) |λa⃗| = |λ|·|a⃗|. (2) If λ > 0, direction stays the same. (3) If λ < 0, direction reverses. (4) Distributive: λ(a⃗ + b⃗) = λa⃗ + λb⃗. (5) Associative: (λμ)a⃗ = λ(μa⃗). <strong>Parallel vectors</strong>: a⃗ ∥ b⃗ ⟺ a⃗ = λb⃗ for some λ ≠ 0. <strong>Zero vector</strong> 0⃗ = 0î + 0ĵ + 0k̂ has magnitude 0 and no defined direction.</p>

**Floor 3 (In action):**
<p>Scalar multiplication is everywhere in physics. Newton's second law F⃗ = ma⃗: the acceleration vector is the force vector multiplied by the scalar 1/m. Coulomb's force: multiply the unit vector by kq₁q₂/r². Momentum p⃗ = mv⃗: velocity scaled by mass. The negative sign in Hooke's law F⃗ = −kx⃗: the restoring force is the displacement vector multiplied by −k, reversing its direction. Every time a vector quantity scales up or down without changing direction, scalar multiplication is the operation.</p>

**Image prompt:** A chalk drawing of a vector a⃗ = 2î + 1ĵ (an arrow). Below it: 2a⃗ (same direction, twice as long), ½a⃗ (same direction, half as long), −a⃗ (opposite direction, same length), 0a⃗ (just a dot at the origin labelled 0⃗). Each is labelled with the scalar and the component form. Chalk on dark green board. Square 1:1.

---

## BB-NEW-165 — Vector subtraction: the journey between two arrow tips

**Subject:** physics | **Topic:** vectors | **Concept:** vector-subtraction; relative-position; geometric-interpretation | **Ground:** g0 | **Builds on:** [BB-NEW-160, BB 92]

**Floor 0 (Idea):**
<p>Adding vectors joins them head to tail. Subtraction is addition in reverse: a⃗ − b⃗ = a⃗ + (−b⃗). Geometrically, a⃗ − b⃗ is the arrow from the tip of b⃗ to the tip of a⃗ when both are drawn from the same starting point. This one fact makes subtraction the natural operation for "where is A relative to B?"</p>

**Floor 1 (Concrete):**
<p>Two cars: car A at position r⃗_A = 5î + 2ĵ km, car B at r⃗_B = 2î + 3ĵ km. The position of A relative to B is r⃗_A − r⃗_B = (5−2)î + (2−3)ĵ = 3î − ĵ km — "3 km east, 1 km south from B." The position of B relative to A is r⃗_B − r⃗_A = −3î + ĵ km — exactly the opposite. Geometrically: draw both position vectors from the origin. The arrow from B's tip to A's tip is r⃗_A − r⃗_B. Subtraction gives the vector that takes you from B to A. This is what relative velocity uses: v⃗_{A/B} = v⃗_A − v⃗_B.</p>

**Floor 2 (Definition):**
<p><strong>Vector subtraction</strong> a⃗ − b⃗ is defined as a⃗ + (−b⃗). In components: (aₓ − bₓ)î + (aᵧ − bᵧ)ĵ + (a𝓏 − b𝓏)k̂. Geometric meaning: when a⃗ and b⃗ are drawn from the same origin, a⃗ − b⃗ is the vector from the tip of b⃗ to the tip of a⃗. Its magnitude is the distance between the two tips. Vector subtraction is neither commutative nor associative — order matters. The <strong>relative position</strong> of A with respect to B is r⃗_A − r⃗_B.</p>

**Floor 3 (In action):**
<p>Subtraction is the vector operation of comparison. "How far and in which direction is Delhi from Mumbai?" = r⃗_Delhi − r⃗_Mumbai. "What is the velocity of the rain relative to the car?" = v⃗_rain − v⃗_car. "What is the change in velocity?" = v⃗_final − v⃗_initial = Δv⃗, which divided by Δt gives acceleration. In a free body diagram, the net force is ΣF⃗ — a sum — but any individual force like friction is often found by subtraction: f⃗ = ma⃗ − F⃗_applied − N⃗ − W⃗. Subtraction isolates what's left over after you account for everything else.</p>

**Image prompt:** A chalk drawing of two vectors a⃗ and b⃗ drawn from the same origin. The subtraction a⃗ − b⃗ is shown as an arrow from the tip of b⃗ to the tip of a⃗ (dashed, in a different colour). Below: a⃗ − b⃗ = (aₓ−bₓ)î + (aᵧ−bᵧ)ĵ. A note: "a⃗ − b⃗ is the vector from b⃗ to a⃗." Chalk on dark green board. Square 1:1.

---

## BB-NEW-166 — Resolution of vectors: splitting the arrow into pieces

**Subject:** physics | **Topic:** vectors | **Concept:** resolving-vectors; component-along-any-direction; projection | **Ground:** g0 | **Builds on:** [Card 23, BB-NEW-161]

**Floor 0 (Idea):**
<p>Any vector can be split into perpendicular components — Card 23 showed how. But you can also find the component of a vector along any direction you choose, not just the axes. The component of a⃗ along a direction given by unit vector n̂ is a⃗·n̂ — the dot product with the unit vector. This is projection: how much of the arrow points the way you care about.</p>

**Floor 1 (Concrete):**
<p>A force F⃗ = 10î + 5ĵ N acts on a block sliding up a ramp inclined at 30°. What is the component of F⃗ along the ramp? The ramp's direction: a unit vector û = cos 30° î + sin 30° ĵ ≈ 0.866î + 0.5ĵ. The component along the ramp: F⃗·û = 10(0.866) + 5(0.5) = 8.66 + 2.5 = 11.16 N. The perpendicular component is what's left: F⃗ − (F⃗·û)û = (10−9.67)î + (5−5.58)ĵ = 0.33î − 0.58ĵ, with magnitude √(0.33²+0.58²) = 0.67 N — tiny, because F⃗ mostly points along the ramp. The split is clean: one number for the along-ramp push, one for the into-ramp push.</p>

**Floor 2 (Definition):**
<p><strong>Resolution</strong> of a vector a⃗ along a given direction (specified by a unit vector n̂) gives <strong>components</strong>: the <strong>parallel component</strong> a⃗_∥ = (a⃗·n̂)n̂ — the projection of a⃗ onto the direction n̂ — and the <strong>perpendicular component</strong> a⃗_⊥ = a⃗ − a⃗_∥. The magnitude of the parallel component is |a⃗·n̂|. The two components are orthogonal: a⃗_∥ · a⃗_⊥ = 0. a⃗ = a⃗_∥ + a⃗_⊥ always. In 3D, resolve onto three mutually perpendicular directions for a complete decomposition.</p>

**Floor 3 (In action):**
<p>Resolution is the Swiss Army knife of mechanics. On an inclined plane, you resolve weight into along-slope and into-slope components. In circular motion, you resolve acceleration into radial (centripetal) and tangential components. In work calculations, you resolve force along the displacement — that's the dot product W = F⃗·d⃗. In wave optics, you resolve the electric field into perpendicular components to analyse polarisation. Every time a problem has a privileged direction — the slope, the string, the normal, the direction of motion — resolution lets you separate "what matters along that direction" from "what doesn't."</p>

**Image prompt:** A chalk drawing of a vector F⃗ = 10î + 5ĵ and a sloped line at 30° labelled with unit vector û. The projection F⃗·û is shown as a dashed line onto the slope, labelled F_∥ = 11.16 N. The perpendicular component F_⊥ is a small arrow perpendicular to the slope. Component formulas in a box. Chalk on dark green board. Square 1:1.

---

# Part 3 — Vector products, deeper

---

## BB-NEW-167 — The dot product in depth: angle, projection, and algebra

**Subject:** physics | **Topic:** vectors | **Concept:** dot-product-deep; angle-between-vectors; projection-length; component-form | **Ground:** g1 | **Builds on:** [BB 93, BB-NEW-166]

**Floor 0 (Idea):**
<p>The dot product was introduced as a⃗·b⃗ = |a||b| cos θ. But it has a second life: in component form, a⃗·b⃗ = aₓbₓ + aᵧbᵧ + a𝓏b𝓏. These two definitions are equivalent — and the equivalence is what makes the dot product so powerful. You can find the angle between any two vectors using nothing but their components.</p>

**Floor 1 (Concrete):**
<p>Find the angle between a⃗ = 3î + 4ĵ + 0k̂ and b⃗ = 4î + 3ĵ + 0k̂. Component form: a⃗·b⃗ = 3×4 + 4×3 + 0×0 = 12 + 12 = 24. Magnitudes: |a⃗| = √(9+16) = 5, |b⃗| = √(16+9) = 5. So cos θ = (a⃗·b⃗) / (|a||b|) = 24/25 = 0.96, so θ = cos⁻¹(0.96) ≈ 16.3°. Without the dot product, finding the angle between two 3D vectors requires trigonometry with no obvious triangle. With it, it's four multiplications and a division.</p>

**Floor 2 (Definition):**
<p>The <strong>dot product</strong> (scalar product) of a⃗ = aₓî + aᵧĵ + a𝓏k̂ and b⃗ = bₓî + bᵧĵ + b𝓏k̂ is defined in two equivalent ways: (1) <strong>Geometric</strong>: a⃗·b⃗ = |a||b| cos θ. (2) <strong>Algebraic</strong>: a⃗·b⃗ = aₓbₓ + aᵧbᵧ + a𝓏b𝓏. Equating the two gives cos θ = (aₓbₓ + aᵧbᵧ + a𝓏b𝓏) / (|a||b|). Properties: commutative, distributive over addition. a⃗·a⃗ = |a⃗|². The <strong>projection</strong> of a⃗ onto the direction of b⃗ has length |a⃗| cos θ = |a⃗·b⃗| / |b⃗|.</p>

**Floor 3 (In action):**
<p>The dot product is the angle-finder. Given two lines in space, the angle between them is the angle between their direction vectors, found via the dot product. In 3D geometry, the angle between a line and a plane is 90° minus the angle between the line's direction and the plane's normal. In physics, work W = F⃗·d⃗. Power P = F⃗·v⃗. Magnetic flux Φ = B⃗·A⃗. The dot product answers "how much of this lies along that?" — and the component-form formula means you never need to draw the angle to compute it.</p>

**Image prompt:** A chalk drawing showing two vectors a⃗ = 3î+4ĵ and b⃗ = 4î+3ĵ with the angle θ between them. The calculation: a⃗·b⃗ = 24, |a⃗|=|b⃗|=5, cos θ = 24/25, θ ≈ 16.3°. The projection of a⃗ onto b⃗ is drawn as a dashed line. Below: the two definitions equated. Chalk on dark green board. Square 1:1.

---

## BB-NEW-168 — The cross product in depth: area, direction, and the determinant

**Subject:** physics | **Topic:** vectors | **Concept:** cross-product-deep; determinant-form; area-of-parallelogram; torque | **Ground:** g1 | **Builds on:** [BB 94, BB-NEW-167]

**Floor 0 (Idea):**
<p>The cross product a⃗ × b⃗ = |a||b| sin θ n̂ produces a vector perpendicular to both a⃗ and b⃗. But like the dot product, it has an algebraic form — a determinant of components — that lets you compute it without drawing anything. The magnitude |a⃗ × b⃗| is the area of the parallelogram spanned by the two vectors. The direction is given by the right-hand rule.</p>

**Floor 1 (Concrete):**
<p>a⃗ = 2î + 3ĵ + 1k̂, b⃗ = 1î − 1ĵ + 2k̂. The cross product using the determinant:</p>
<div class='formula'>a⃗ × b⃗ = |î  ĵ  k̂|<br>           |2   3   1|<br>           |1  −1   2|</div>
<p>= î(3×2 − 1×(−1)) − ĵ(2×2 − 1×1) + k̂(2×(−1) − 3×1) = î(6+1) − ĵ(4−1) + k̂(−2−3) = 7î − 3ĵ − 5k̂. Magnitude: √(49+9+25) = √83 ≈ 9.11. This is the area of the parallelogram formed by a⃗ and b⃗. The triangle they span has half that area: ≈ 4.56.</p>

**Floor 2 (Definition):**
<p>The <strong>cross product</strong> of a⃗ = aₓî + aᵧĵ + a𝓏k̂ and b⃗ = bₓî + bᵧĵ + b𝓏k̂ is <strong>a⃗ × b⃗ = (aᵧb𝓏 − a𝓏bᵧ)î − (aₓb𝓏 − a𝓏bₓ)ĵ + (aₓbᵧ − aᵧbₓ)k̂</strong> — memorised via the 3×3 determinant with î, ĵ, k̂ in the top row. Properties: anti-commutative (a⃗×b⃗ = −b⃗×a⃗), distributive. Magnitude = |a||b| sin θ = area of parallelogram. Right-hand rule for direction. a⃗ × a⃗ = 0⃗.</p>

**Floor 3 (In action):**
<p>Torque: τ⃗ = r⃗ × F⃗ — the cross product of the lever arm and the force. Angular momentum: L⃗ = r⃗ × p⃗. The magnetic force on a moving charge: F⃗ = q(v⃗ × B⃗). The area of a triangle in 3D with vertices A, B, C: ½|(B−A) × (C−A)|. Every quantity involving rotation, twist, or perpendicularity in 3D uses the cross product. The determinant form means you never need to draw or measure the angle — the components do all the work.</p>

**Image prompt:** A chalk drawing of two vectors a⃗ = 2î+3ĵ+1k̂ and b⃗ = î−ĵ+2k̂. The parallelogram they span is shaded, its area labelled |a⃗×b⃗| = √83. The cross product vector 7î−3ĵ−5k̂ is drawn perpendicular to the parallelogram. Below: the 3×3 determinant expansion. Chalk on dark green board. Square 1:1.

---

## BB-NEW-169 — Solving vector equations: turning one vector equation into three scalar equations

**Subject:** physics | **Topic:** vectors | **Concept:** vector-equations; equating-components; solving-unknowns | **Ground:** g1 | **Builds on:** [BB-NEW-160, BB-NEW-167]

**Floor 0 (Idea):**
<p>Two vectors are equal only when all their components are equal. One vector equation — a⃗ = b⃗ — unpacks into three scalar equations: aₓ = bₓ, aᵧ = bᵧ, a𝓏 = b𝓏. This is the key to solving for unknown vectors: turn the vector equation into a system of scalar equations and solve them one component at a time.</p>

**Floor 1 (Concrete):**
<p>Given a⃗ + b⃗ = 3î + 7ĵ and a⃗ − b⃗ = î + 3ĵ, find a⃗ and b⃗. Add the two equations: (a⃗+b⃗) + (a⃗−b⃗) = 2a⃗ = (3+1)î + (7+3)ĵ = 4î + 10ĵ, so a⃗ = 2î + 5ĵ. Subtract: (a⃗+b⃗) − (a⃗−b⃗) = 2b⃗ = (3−1)î + (7−3)ĵ = 2î + 4ĵ, so b⃗ = î + 2ĵ. Verify: a⃗ + b⃗ = 3î + 7ĵ ✓, a⃗ − b⃗ = î + 3ĵ ✓. The vector equations were solved exactly like scalar equations — because vector addition is component-wise.</p>

**Floor 2 (Definition):**
<p>A <strong>vector equation</strong> is an equation where the unknowns are vectors. To solve: (1) Express each vector in component form. (2) Use the fact that a⃗ = b⃗ ⟺ aₓ = bₓ, aᵧ = bᵧ, a𝓏 = b𝓏 — equating components converts the vector equation into 2 or 3 independent scalar equations. (3) Solve the scalar system. Vector equations obey the same algebraic rules as scalar equations — you can add, subtract, multiply by scalars, and substitute — because all operations are component-wise.</p>

**Floor 3 (In action):**
<p>In a statics problem, ΣF⃗ = 0⃗ unpacks into ΣFₓ = 0 and ΣFᵧ = 0 — the two equilibrium conditions. In relative velocity, v⃗_{A/B} = v⃗_A − v⃗_B gives two scalar equations for the components. In collisions, momentum conservation m₁v⃗₁ + m₂v⃗₂ = m₁u⃗₁ + m₂u⃗₂ unpacks into x and y conservation equations. Every vector equation in physics is secretly a set of scalar equations — and solving them component by component is the standard method, not a shortcut.</p>

**Image prompt:** A chalk drawing of the vector equations a⃗+b⃗ = 3î+7ĵ and a⃗−b⃗ = î+3ĵ. The solution steps: add → 2a⃗ = 4î+10ĵ → a⃗ = 2î+5ĵ; subtract → 2b⃗ = 2î+4ĵ → b⃗ = î+2ĵ. Verification with component-by-component addition. Chalk on dark green board. Square 1:1.

---

# Part 4 — Advanced: calculus, 3D, and the full picture

---

## BB-NEW-170 — Differentiating vectors: how arrows change over time

**Subject:** physics | **Topic:** vectors | **Concept:** vector-differentiation; velocity; acceleration; component-wise | **Ground:** g1 | **Builds on:** [BB-NEW-160, BB-NEW-163]

**Floor 0 (Idea):**
<p>A vector that changes with time — a moving position, a changing velocity — can be differentiated. The derivative of a vector is just the derivative of each component separately. If r⃗(t) = x(t)î + y(t)ĵ + z(t)k̂, then dr⃗/dt = (dx/dt)î + (dy/dt)ĵ + (dz/dt)k̂ = v⃗(t). The derivative of position is velocity. The derivative of velocity is acceleration. Vector calculus is component-wise calculus.</p>

**Floor 1 (Concrete):**
<p>A particle's position: r⃗(t) = (2t)î + (3t²)ĵ + (t³)k̂. Velocity: v⃗ = dr⃗/dt = 2î + 6tĵ + 3t²k̂. At t = 2: v⃗ = 2î + 12ĵ + 12k̂, speed = √(4+144+144) = √292 ≈ 17.1. Acceleration: a⃗ = dv⃗/dt = 0î + 6ĵ + 6tk̂. At t = 2: a⃗ = 6ĵ + 12k̂, magnitude = √(36+144) = √180 ≈ 13.4. Each derivative is taken component by component. The vector nature carries through — you differentiate three scalar functions, then reassemble the result into one vector function.</p>

**Floor 2 (Definition):**
<p>The <strong>derivative of a vector function</strong> r⃗(t) = x(t)î + y(t)ĵ + z(t)k̂ with respect to t is dr⃗/dt = (dx/dt)î + (dy/dt)ĵ + (dz/dt)k̂, provided the component derivatives exist. Key rules: d/dt(a⃗ + b⃗) = da⃗/dt + db⃗/dt. d/dt(λa⃗) = (dλ/dt)a⃗ + λ(da⃗/dt) — the product rule for scalar times vector. d/dt(a⃗·b⃗) = da⃗/dt·b⃗ + a⃗·db⃗/dt. d/dt(a⃗ × b⃗) = da⃗/dt × b⃗ + a⃗ × db⃗/dt. All follow from component-wise differentiation.</p>

**Floor 3 (In action):**
<p>Vector differentiation is the language of kinematics. Given r⃗(t), differentiate once to get v⃗(t). Differentiate again to get a⃗(t). Inversely, integrate a⃗(t) to get v⃗(t), integrate v⃗(t) to get r⃗(t) — with initial conditions providing the constants. Every trajectory problem in physics — projectile, orbit, oscillation — runs on this chain. A planet's elliptical orbit is r⃗(t); its velocity v⃗ = dr⃗/dt is tangent to the ellipse; its acceleration a⃗ = dv⃗/dt points toward the sun. Three derivatives connect the geometry of the orbit to the physics of gravity.</p>

**Image prompt:** A chalk drawing of a curved trajectory (a parabola) with three time snapshots: t=0, t=1, t=2. At each: the position vector r⃗(t), velocity vector v⃗(t) as tangent arrows, acceleration a⃗ as a downward arrow (constant). Below: the differentiation chain r⃗ → v⃗ → a⃗ in component form. Chalk on dark green board. Square 1:1.

---

## BB-NEW-171 — Vectors in three dimensions: going off the flat page

**Subject:** physics | **Topic:** vectors | **Concept:** 3d-vectors; space-geometry; distance-in-3d; octants | **Ground:** g0 | **Builds on:** [BB-NEW-160, BB-NEW-163]

**Floor 0 (Idea):**
<p>The grid covered so far is flat — x and y, two dimensions, a plane. The real world has three. A third axis — the z-axis — pokes straight out of the page. A point in space needs three numbers (x, y, z). A vector in space needs three components. Everything you know about vectors in 2D extends to 3D — the only difference is one more column of numbers to keep track of.</p>

**Floor 1 (Concrete):**
<p>A room's corner is the origin. The floor is the xy-plane. A point 3 m along one wall, 4 m along the other, and 2 m up from the floor is at (3, 4, 2). Its position vector: r⃗ = 3î + 4ĵ + 2k̂ m. Distance from the origin: √(9+16+4) = √29 ≈ 5.39 m. Distance from a point at (1, 1, 5): √((3−1)² + (4−1)² + (2−5)²) = √(4+9+9) = √22 ≈ 4.69 m. The distance formula gains a (z₂−z₁)² term, but the logic is unchanged. Three dimensions is two dimensions with an extra column.</p>

**Floor 2 (Definition):**
<p>In <strong>three-dimensional rectangular coordinate space</strong>, three mutually perpendicular axes (x, y, z) meet at the origin. Every point has an ordered triple (x, y, z). Space is divided into eight <strong>octants</strong> based on the signs of x, y, z. The <strong>distance</strong> between (x₁,y₁,z₁) and (x₂,y₂,z₂) is √((x₂−x₁)² + (y₂−y₁)² + (z₂−z₁)²). The <strong>midpoint</strong> is ((x₁+x₂)/2, (y₁+y₂)/2, (z₁+z₂)/2). The <strong>section formula</strong> extends identically. Coordinate planes (xy, yz, zx) divide space — a point on the xy-plane has z = 0.</p>

**Floor 3 (In action):**
<p>Every real-world vector problem is 3D. A GPS satellite's position is (x, y, z) in an Earth-centred frame. A drone's velocity has three components — forward, sideways, vertical. A bridge's forces must balance in all three directions — ΣFₓ = 0, ΣFᵧ = 0, ΣF𝓏 = 0. The good news: every vector operation — addition, dot product, cross product, differentiation — works identically in 3D, just with three components instead of two. Nothing new to learn except adding the z column. The jump from 2D to 3D is size, not complexity.</p>

**Image prompt:** A chalk drawing of a 3D coordinate system with the three axes labelled x, y, z. A point P(3,4,2) is shown with dashed lines dropping to the coordinate planes. Its position vector r⃗ = 3î+4ĵ+2k̂ is drawn as an arrow from the origin. The eight octants are labelled with sign patterns (+,+,+), (−,+,+), etc. Chalk on dark green board. Square 1:1.

---

## BB-NEW-172 — The full vectors toolkit: putting it all together

**Subject:** physics | **Topic:** vectors | **Concept:** vectors-review; full-workflow; problem-solving | **Ground:** g1 | **Builds on:** [BB-NEW-160, BB-NEW-171]

**Floor 0 (Idea):**
<p>You now have the complete vectors toolkit: representation, addition, subtraction, scalar multiplication, dot product, cross product, resolution, differentiation, and 3D extension. Every vector problem in classical mechanics can be solved by choosing the right tool from this kit and applying it methodically. The art is knowing which tool to reach for.</p>

**Floor 1 (Concrete):**
<p>Problem: A particle at position r⃗ = 2tî + (3t−t²)ĵ + 5k̂. Find its velocity, speed, and acceleration at t = 1. Also find the angle between its velocity and acceleration at that moment. Step 1 — differentiate: v⃗ = dr⃗/dt = 2î + (3−2t)ĵ + 0k̂. At t=1: v⃗ = 2î + 1ĵ. Step 2 — differentiate again: a⃗ = dv⃗/dt = 0î − 2ĵ + 0k̂. Step 3 — magnitude (speed): |v⃗| = √(4+1) = √5. Step 4 — angle between v⃗ and a⃗: v⃗·a⃗ = 2(0) + 1(−2) + 0(0) = −2. |v⃗| = √5, |a⃗| = 2. cos θ = −2/(2√5) = −1/√5. θ = cos⁻¹(−1/√5) ≈ 116.6° — the particle is slowing down because the angle is > 90° (the acceleration opposes the velocity). One problem, five tools, clean solution.</p>

**Floor 2 (Definition):**
<p>The vectors toolkit summary: <strong>Representation</strong> — component form a⃗ = aₓî + aᵧĵ + a𝓏k̂. <strong>Magnitude</strong> — |a⃗| = √(aₓ²+aᵧ²+a𝓏²). <strong>Unit vector</strong> — â = a⃗/|a⃗|. <strong>Addition</strong> — add components. <strong>Subtraction</strong> — subtract components. <strong>Scalar multiplication</strong> — multiply each component. <strong>Dot product</strong> — a⃗·b⃗ = aₓbₓ+aᵧbᵧ+a𝓏b𝓏 = |a||b| cos θ. <strong>Cross product</strong> — determinant form. <strong>Resolution</strong> — component along n̂ is a⃗·n̂. <strong>Differentiation</strong> — differentiate each component.</p>

**Floor 3 (In action):**
<p>This toolkit is sufficient for every vector problem in first-year university physics and engineering. The same operations, in the same component form, work for 2D and 3D, for kinematics and dynamics, for electricity and magnetism. The workflow is always: (1) write vectors in component form, (2) choose the operation that answers the question, (3) compute component by component, (4) interpret the result as magnitude and direction. Vectors are not a separate topic — they are the operating system on which mechanics runs. Mastering them now pays off in every chapter that follows.</p>

**Image prompt:** A chalk drawing of the "vectors toolkit" as a labelled toolbox: inside are labelled tools — addition (+), subtraction (−), dot product (·), cross product (×), scalar mult (λ), resolution (projection), differentiation (d/dt). Below: a worked kinematics problem where each tool is used in sequence. Chalk on dark green board. Square 1:1.

---

## Summary

### Part 1 — Vector fundamentals (3 BBs)
| # | Title |
|---|-------|
| 160 | The two ways to describe a vector: arrow and algebra |
| 161 | Magnitude and direction |
| 162 | Unit vectors: pure direction |

### Part 2 — Vector algebra (4 BBs)
| # | Title |
|---|-------|
| 163 | Position and displacement vectors |
| 164 | Multiplying a vector by a number |
| 165 | Vector subtraction |
| 166 | Resolution of vectors — deeper |

### Part 3 — Vector products, deeper (3 BBs)
| # | Title |
|---|-------|
| 167 | The dot product in depth |
| 168 | The cross product in depth |
| 169 | Solving vector equations |

### Part 4 — Advanced (3 BBs)
| # | Title |
|---|-------|
| 170 | Differentiating vectors |
| 171 | Vectors in three dimensions |
| 172 | The full vectors toolkit |

**13 BBs.** Builds on existing Cards 21–23 (narrative vectors) and BB 92–94 (intro dot/cross/addition). Together, these 16 vector BBs form a complete course from arrow drawing to 3D vector calculus. Covers CURRICULUM topic 9 (Vectors 2D→3D) thoroughly — previously 🟡 partial, now ✅.
