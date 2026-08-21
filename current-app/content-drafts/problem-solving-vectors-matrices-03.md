# Problem-Solving Heuristics — Vectors & Matrices (12 BBs)

A direct application of the Polya–Thompson heuristic toolkit to vectors (BB 92–94, 160–172) and matrices (BB 70–82, 194). Each BB identifies which heuristics are most powerful for a specific vector or matrix problem type, demonstrates them on worked examples from existing BBs, and builds the reader's pattern library for these mathematical structures.

---

## BB-NEW-440 — The vector toolkit: which heuristic for which vector problem

**Subject:** physics | **Topic:** problem-solving | **Concept:** vector-heuristics; toolkit; choosing-method; FBD-for-vectors | **Ground:** g0 | **Builds on:** [BB-NEW-414, BB-NEW-160, BB 92]

**Floor 0 (Idea):**
<p>Vectors appear in nearly every physics problem. The heuristics that work best for vectors are specific and learnable. When you see vectors in a problem, your first move is always the same: draw them. Vectors are arrows; arrows are spatial. Your visual system can process them faster than your algebraic system. Then choose: if you need to combine vectors → triangle rule or component addition. If you need to find a component → resolution (dot with unit vector). If you need an angle → dot product. If you need a perpendicular → cross product. If you need to solve for an unknown vector → write vector equations, convert to scalar equations. The toolkit is finite. The choice is deliberate. Never guess — diagnose.</p>

**Floor 1 (Concrete):**
<p>Problem: "A boat heads east at 4 m/s across a river flowing south at 3 m/s. Find the boat's resultant velocity." <strong>Diagnosis:</strong> Two vectors, need their sum. Heuristic: draw them tip-to-tail (triangle rule — BB 92) OR add components (BB 73/160). <strong>Component method:</strong> v⃗_boat = 4î + 0ĵ, v⃗_river = 0î − 3ĵ. v⃗_resultant = 4î − 3ĵ. Magnitude = √(16+9) = 5 m/s. Direction: tan⁻¹(3/4) = 36.9° south of east. <strong>Triangle rule check:</strong> draw the 4 m/s east arrow, then the 3 m/s south arrow from its tip. The hypotenuse is 5 m/s by the 3-4-5 triangle — confirms the calculation. Two methods, same answer. The diagnosis took 5 seconds. "Add vectors" → use components (faster algebraically) or triangle rule (faster geometrically). Either works; choose the one that fits the given information.</p>

**Floor 2 (Definition):**
<p><strong>Vector problem diagnosis flowchart:</strong> (1) <strong>ADDING vectors</strong> (resultant, net force, total displacement) → component addition (add î, ĵ, k̂ separately) OR triangle/parallelogram rule (draw tip-to-tail). (2) <strong>FINDING COMPONENT</strong> (force along a direction, projection) → dot product with unit vector: a⃗·n̂. (3) <strong>FINDING ANGLE</strong> between vectors → cos θ = (a⃗·b⃗)/(|a||b|). (4) <strong>FINDING PERPENDICULAR</strong> (torque, angular momentum, area) → cross product: τ⃗ = r⃗ × F⃗. (5) <strong>SOLVING for unknown vector</strong> → write vector equation, equate components, solve n scalar equations. (6) <strong>CHECKING</strong> → dimensional analysis (all vector components must have same dimensions), special-case test (parallel vectors: result should be along same line; perpendicular: dot product = 0).</p>

**Floor 3 (In action):**
<p>Every vector BB in our deck falls into this flowchart. BB 160 (vector representation): component form is the DEFAULT for calculation; arrow form is for visualisation. BB 92 (triangle rule): use when you can easily draw the vectors — intuitive, geometric. BB 167 (dot product deep): use to find angles and projections — the "how much along" operation. BB 168 (cross product deep): use for torque, angular momentum, area — the "perpendicular to both" operation. BB 169 (vector equations): equate components — one vector equation = 2 or 3 scalar equations. BB 281 (inclined plane): resolve weight into components — mg sin θ and mg cos θ. This is the dot product in disguise: the component along the slope = mg⃗·û_slope. The flowchart removes hesitation. "I have vectors. What do I need? Sum? Component? Angle? Perpendicular? Unknown?" The question dictates the operation. The operation dictates the method. The method produces the answer.</p>

**Image prompt:** A chalk flowchart: "Vectors in problem?" → branches: "Need to ADD?" → Component addition / Triangle rule. "Need COMPONENT?" → Dot with unit vector. "Need ANGLE?" → cos θ = a⃗·b⃗/(|a||b|). "Need PERPENDICULAR?" → Cross product. "Need UNKNOWN VECTOR?" → Equate components. Below: "Diagnose before you calculate." Chalk on dark green board. Square 1:1.

---

## BB-NEW-441 — Resolving vectors: decomposition as the master heuristic

**Subject:** physics | **Topic:** problem-solving | **Concept:** vector-resolution; decomposition-applied; component-method; choosing-axes | **Ground:** g0 | **Builds on:** [BB-NEW-409, BB-NEW-166, Card 23, BB 165]

**Floor 0 (Idea):**
<p>Decomposition (BB 409) is THE master heuristic for vectors. Every vector that isn't aligned with your chosen axes gets split into pieces that ARE aligned. The choice of axes is the most important decision in any vector problem — and it's entirely yours. You can align axes with the slope, with the direction of motion, with the string, with the normal. There is no "correct" axis choice — only more and less convenient ones. The heuristic: align one axis with the acceleration (or with the most complicated direction), and the equations simplify. The perpendicular axis gives the constraint (often ΣF=0). This is decomposition at its most powerful.</p>

**Floor 1 (Concrete):**
<p>A block on a 30° incline, pulled by a rope at 20° above the slope. Multiple forces at multiple angles. Without decomposition: chaos. With decomposition: clarity. <strong>Step 1 — Choose axes:</strong> x along the slope (up), y perpendicular to slope (up). <strong>Step 2 — Resolve EVERY force:</strong> Weight mg: x-component = −mg sin 30° = −0.5mg, y-component = −mg cos 30° = −0.866mg. Tension T (20° above slope): x-component = T cos 20° = 0.940T, y-component = T sin 20° = 0.342T. Normal N: purely y (no x-component). Friction f: purely x, opposing motion direction. <strong>Step 3 — Write ΣF=ma for each axis:</strong> x: 0.940T − 0.5mg − f = ma. y: N + 0.342T − 0.866mg = 0 (no acceleration perpendicular to slope). <strong>Step 4 — Solve.</strong> The decomposition transformed five forces at arbitrary angles into two clean scalar equations. Every force was resolved; every component was accounted for. The algebra handles the rest. Decomposition is the universal solvent for vector complexity.</p>

**Floor 2 (Definition):**
<p><strong>Vector resolution heuristic — the systematic method:</strong> (1) <strong>Choose axes strategically.</strong> Align one axis with the acceleration or with the direction that simplifies the constraints (e.g., along the slope, along the string, perpendicular to the surface). (2) <strong>Resolve EVERY force/vector</strong> into components along your chosen axes. Use F_x = F cos θ, F_y = F sin θ — where θ is the angle between the vector and your chosen x-axis. (3) <strong>Write separate scalar equations</strong> for each axis: ΣF_x = ma_x, ΣF_y = ma_y. (4) <strong>Identify constraints</strong> — often a_x = 0 or a_y = 0 (equilibrium in one direction). (5) <strong>Solve the scalar system.</strong> The key insight: the axes are YOUR choice. Change them and the components change, but the physics doesn't. Choose axes to minimise the number of forces with components on both axes.</p>

**Floor 3 (In action):**
<p>This method is used in nearly every mechanics BB. BB 281 (inclined plane): axes along and perpendicular to the slope — weight has two components, normal and friction have one each. BB 282 (Atwood machine): axes vertical for both masses — tension and weight, no horizontal components. BB 287 (ladder): no single preferred axis for all forces — instead, choose a pivot for torques and use ΣF_x and ΣF_y for forces. BB 192 (projectiles): axes horizontal and vertical — gravity acts only on the y-axis, leaving x as constant velocity. BB 193 (trig and vectors): the dot product IS resolution — the component of a⃗ along direction n̂ is a⃗·n̂. The cross product IS resolution into the perpendicular direction. Resolution is not one heuristic among many for vectors — it IS vector problem-solving. Every other technique (addition, dot product, cross product) is either resolution or a consequence of it. Master resolution, and vectors stop being a topic and become a language.</p>

**Image prompt:** A chalk drawing of a single force vector F⃗ being split by a dashed coordinate system into F_x and F_y components. Below, the same vector split by a DIFFERENT coordinate system (rotated 30°) — different F_x and F_y values, same physics. "Choose axes to simplify. Resolve every force. The algebra does the rest." Chalk on dark green board. Square 1:1.

---

## BB-NEW-442 — Adding vectors: the triangle rule and component method working together

**Subject:** physics | **Topic:** problem-solving | **Concept:** vector-addition-heuristics; triangle-rule; parallelogram-law; component-addition | **Ground:** g0 | **Builds on:** [BB-NEW-406, BB 92, BB-NEW-160]

**Floor 0 (Idea):**
<p>There are two ways to add vectors, and each has its place. The triangle rule (draw tip-to-tail) is visual, intuitive, and unbeatable for understanding what the resultant means. The component method (add î, ĵ, k̂ separately) is algebraic, systematic, and unbeatable for accuracy with many vectors. The skilled problem-solver uses BOTH — the triangle rule to see the geometry, the component method to get the numbers. They check each other. When they agree, confidence doubles. When they disagree, an error has been found.</p>

**Floor 1 (Concrete):**
<p>Three forces act on a point: F₁ = 100 N at 0° (east), F₂ = 150 N at 120° (northwest), F₃ = 80 N at −90° (south). <strong>Triangle/parallelogram method:</strong> Draw F₁ east. From its tip, draw F₂ at 120°. From that tip, draw F₃ south. The resultant is the vector from the start to the final tip. Rough measurement from the sketch: about 130 N at roughly −10° (slightly south of east). Good for intuition; not precise. <strong>Component method:</strong> F₁ = 100î + 0ĵ. F₂ = 150 cos 120° î + 150 sin 120° ĵ = −75î + 129.9ĵ. F₃ = 0î − 80ĵ. Sum: R⃗ = (100−75+0)î + (0+129.9−80)ĵ = 25î + 49.9ĵ. Magnitude: √(25²+49.9²) = √(625+2490) = √3115 ≈ 55.8 N. Direction: tan⁻¹(49.9/25) ≈ 63.4° above east. The component method is exact. The triangle sketch confirmed the rough quadrant. Together, they give both insight and precision.</p>

**Floor 2 (Definition):**
<p><strong>Dual approach to vector addition:</strong> (1) <strong>Triangle/parallelogram method</strong> — draw the vectors tip-to-tail (triangle) or from a common origin (parallelogram). The resultant is the closing side (triangle) or the diagonal (parallelogram). Use for: visualising the problem, estimating the answer, checking the component result for gross errors. (2) <strong>Component method</strong> — add all x-components, add all y-components, add all z-components. Magnitude: |R⃗| = √(R_x²+R_y²+R_z²). Direction: θ = tan⁻¹(R_y/R_x), with quadrant adjustment. Use for: precise calculation, problems with more than two vectors, 3D vectors. The two methods are complementary. The triangle method keeps you oriented; the component method keeps you accurate. Never use one without at least visualising the other.</p>

**Floor 3 (In action):**
<p>This dual approach is embedded in our BBs. BB 92 (triangle rule): the geometry of addition — "lay them head to tail, draw the shortcut." BB 160 (component form): the algebra — "add the î's, add the ĵ's, done." BB 22 (when two things push at once — boat and current): the problem is presented geometrically (the boat goes across, the current goes down, the resultant is diagonal) but solved algebraically (v⃗ = v_boat î + v_current ĵ). BB 165 (vector subtraction): a⃗ − b⃗ is drawn as the vector from b⃗'s tip to a⃗'s tip — the geometric picture. But it's calculated as (a_x−b_x)î + (a_y−b_y)ĵ — the algebraic method. Thompson's approach to calculus applies here too: understanding comes from the visual (the triangle), precision from the algebraic (the components). Never sacrifice one for the other. The dual method — picture + calculation — is the most reliable path to correct vector addition.</p>

**Image prompt:** A chalk drawing showing the same vector addition two ways. Left: triangle rule — three arrows tip-to-tail, resultant as the closing arrow. Right: component addition — columns of x-components and y-components being summed. A double-headed arrow between them labelled "CHECK." Below: "Triangle rule for insight. Component method for precision. Use both." Chalk on dark green board. Square 1:1.

---

## BB-NEW-443 — Dot and cross products: when to use which

**Subject:** physics | **Topic:** problem-solving | **Concept:** dot-vs-cross; product-choice; work-vs-torque; projection-vs-perpendicular | **Ground:** g0 | **Builds on:** [BB-NEW-167, BB-NEW-168, BB-NEW-440]

**Floor 0 (Idea):**
<p>The dot product and cross product are the two ways to multiply vectors — and they answer fundamentally different questions. The dot product asks: "How much of one vector lies along the other?" → a scalar. The cross product asks: "What vector is perpendicular to both?" → a vector. Work is a dot product (force along displacement). Torque is a cross product (force perpendicular to lever arm). Magnetic force is a cross product. Electric flux is a dot product. The choice between dot and cross is determined by the physics, not by taste. Recognise the pattern, and you'll never confuse them.</p>

**Floor 1 (Concrete):**
<p><strong>When to use DOT product:</strong> (1) Work: W = F⃗·d⃗ — the component of force along displacement. (2) Power: P = F⃗·v⃗ — force along velocity. (3) Angle between vectors: cos θ = a⃗·b⃗/(|a||b|). (4) Projection: component of a⃗ along n̂ is a⃗·n̂. (5) Testing perpendicularity: a⃗·b⃗ = 0 ⟺ a⃗ ⟂ b⃗. <strong>When to use CROSS product:</strong> (1) Torque: τ⃗ = r⃗ × F⃗ — perpendicular to both lever arm and force. (2) Angular momentum: L⃗ = r⃗ × p⃗ — perpendicular to position and momentum. (3) Magnetic force: F⃗ = q(v⃗ × B⃗) — perpendicular to velocity and magnetic field. (4) Area of parallelogram: |a⃗ × b⃗|. (5) Finding a perpendicular vector: n⃗ = a⃗ × b⃗ is perpendicular to both. The mnemonic: DOT = how much ALONG (adjacent, cos). CROSS = how much PERPENDICULAR (opposite, sin). If the physics involves something turning or twisting → cross product. If it involves something being projected or aligned → dot product.</p>

**Floor 2 (Definition):**
<p><strong>Dot product decision tree:</strong> Does the physical quantity you're computing involve the component of one vector ALONG another? Is the result a SCALAR (energy, power, flux, work)? Use DOT. a⃗·b⃗ = |a||b| cos θ = a_x b_x + a_y b_y + a_z b_z. <strong>Cross product decision tree:</strong> Does the quantity involve something PERPENDICULAR to two vectors? Is the result a VECTOR (torque, angular momentum, magnetic force)? Use CROSS. a⃗ × b⃗ = |a||b| sin θ n̂ (direction by right-hand rule). <strong>Memory anchors:</strong> DOT rhymes with "hot" → scalar (a number, like temperature). CROSS has an "X" → "X marks the spot" → a direction in space. Work = Fd cos θ (dot). Torque = Fr sin θ (cross).</p>

**Floor 3 (In action):**
<p>Every vector product in our BBs follows this choice logic. BB 167 (dot product): W = F⃗·d⃗ — the force along the displacement does the work. BB 168 (cross product): τ⃗ = r⃗ × F⃗ — the force perpendicular to the lever arm produces the torque. BB 193 (trig and vectors): cos θ appears in the dot product because adjacent/hypotenuse is cos. sin θ appears in the cross product because opposite/hypotenuse is sin. BB 92–94 (vector operations): addition, subtraction, dot, cross — four operations, each with a distinct geometric meaning. The key transfer (BB 435 in action): recognising "this is a projection problem" triggers the dot product. Recognising "this is a twist/turn problem" triggers the cross product. The pattern library (BB 430) stores these templates: work → dot, torque → cross, angle → dot, area → cross. Once the pattern is recognised, the operation is automatic.</p>

**Image prompt:** A chalk drawing of two columns. LEFT column: "DOT PRODUCT (·)" — examples: W=F⃗·d⃗, projection, cos θ, testing perpendicular (a⃗·b⃗=0). RIGHT column: "CROSS PRODUCT (×)" — examples: τ⃗=r⃗×F⃗, L⃗=r⃗×p⃗, F⃗=qv⃗×B⃗, area of parallelogram, right-hand rule. Below: "DOT = along (scalar). CROSS = perpendicular (vector)." Chalk on dark green board. Square 1:1.

---

## BB-NEW-444 — Solving vector equations: one vector equation = many scalar equations

**Subject:** physics | **Topic:** problem-solving | **Concept:** vector-equations-solving; component-equating; unknowns | **Ground:** g1 | **Builds on:** [BB-NEW-420, BB-NEW-169, BB-NEW-440]

**Floor 0 (Idea):**
<p>A single vector equation like a⃗ + b⃗ = 3î + 7ĵ contains TWO scalar equations hidden inside: a_x + b_x = 3 and a_y + b_y = 7. This is the translation heuristic (BB 420) applied to vectors. The unknowns are vectors; the strategy is to convert one vector equation into 2 (or 3 in 3D) scalar equations by equating components. Each component is independent — î terms must equal î terms, ĵ terms must equal ĵ terms, k̂ terms must equal k̂ terms. The result is a system of scalar equations that can be solved by substitution, elimination, or matrix methods.</p>

**Floor 1 (Concrete):**
<p>Problem: "Given a⃗ + b⃗ = 3î + 7ĵ and a⃗ − b⃗ = î + 3ĵ, find a⃗ and b⃗." This is two vector equations with two vector unknowns — four scalar unknowns total (a_x, a_y, b_x, b_y). <strong>Method 1 — Component equating:</strong> From first equation: a_x + b_x = 3, a_y + b_y = 7. From second: a_x − b_x = 1, a_y − b_y = 3. Solve each pair. x-components: adding gives 2a_x = 4 → a_x = 2, so b_x = 1. y-components: adding gives 2a_y = 10 → a_y = 5, so b_y = 2. Result: a⃗ = 2î + 5ĵ, b⃗ = î + 2ĵ. Check: a⃗+b⃗ = 3î+7ĵ ✓. <strong>Method 2 — Direct vector manipulation:</strong> Add the two original equations: (a⃗+b⃗)+(a⃗−b⃗) = 2a⃗ = 4î + 10ĵ → a⃗ = 2î + 5ĵ. Subtract: (a⃗+b⃗)−(a⃗−b⃗) = 2b⃗ = 2î + 4ĵ → b⃗ = î + 2ĵ. Same answer, fewer steps. The direct vector manipulation is possible because vector addition is linear — the same algebra works on whole vectors as on scalars. Both methods are valid. Choose the one that uses the given structure most elegantly.</p>

**Floor 2 (Definition):**
<p><strong>Solving vector equations — the toolkit:</strong> (1) <strong>Component equating</strong> — a⃗ = b⃗ ⟺ a_x = b_x, a_y = b_y, a_z = b_z. Converts n vector equations into 2n (2D) or 3n (3D) scalar equations. Always works. (2) <strong>Direct vector algebra</strong> — add, subtract, multiply by scalars — treating the vectors as atomic objects. Works when the equations are linear in the unknown vectors. (3) <strong>Constraints</strong> — if a vector is known to be parallel to a given direction, write it as λ times the unit vector. If perpendicular, use dot product = 0. These constraints reduce the number of scalar unknowns. (4) <strong>Geometric reasoning</strong> — if the vectors satisfy known geometric relationships (forming a triangle, a parallelogram), use geometry (law of cosines, law of sines) instead of components.</p>

**Floor 3 (In action):**
<p>BB 169 (solving vector equations) covers the direct algebraic method. BB 213 (Kirchhoff's laws) applies the component method implicitly — ΣV=0 around each loop is a scalar equation for each component direction. BB 77 (writing systems as Ax=b) is the matrix version: one matrix equation = m scalar equations. BB 120 (quadratics) is the scalar analogue: one equation, one unknown. BB 169 is the vector analogue: one equation, multiple unknowns — break into components. The translation heuristic (BB 420) is at work: "Given a⃗ + b⃗ = ..." is a sentence in vector language; translating it to component form is the setup. After that, it's simultaneous equations — a familiar pattern. The meta-lesson: vector equations are NOT harder than scalar equations. They're scalar equations in batches of 2 or 3, with the added convenience that you can sometimes manipulate them as whole vectors and skip the component breakdown entirely. The choice is yours — component equating is the fallback; vector algebra is the elegant shortcut when the structure permits.</p>

**Image prompt:** A chalk drawing of two vector equations a⃗+b⃗=... and a⃗−b⃗=... on the left. An arrow labelled "Translate" leads to four scalar equations in a 2×2 grid. An alternative arrow labelled "Direct vector algebra" shows the equations being added and subtracted as whole vectors. Below: "One vector equation = 2 (or 3) scalar equations. Solve by components OR by vector algebra." Chalk on dark green board. Square 1:1.

---

# Part 2 — Matrices + Heuristics

---

## BB-NEW-445 — The matrix toolkit: which heuristic for which matrix problem

**Subject:** maths | **Topic:** problem-solving | **Concept:** matrix-heuristics; toolkit; choosing-operation; ledger-analogy | **Ground:** g0 | **Builds on:** [BB-NEW-440, BB-NEW-70, BB-NEW-75]

**Floor 0 (Idea):**
<p>Matrices are the most structured mathematical objects you'll encounter. Every matrix problem falls into a small set of types, and each type has a preferred heuristic. Are you solving a system of equations? → Gaussian elimination or inverse. Are you transforming points? → Matrix multiplication. Are you finding properties of the transformation? → Determinant, trace, eigenvalues. Are you reorganising data? → Row operations. The matrix toolkit is finite, but the operations are powerful. The key diagnostic question is always: "What is the matrix DOING in this problem — storing data, transforming space, or encoding equations?" The answer determines everything.</p>

**Floor 1 (Concrete):**
<p>Problem: Solve 2x+3y=8, 4x+5y=13. <strong>Diagnosis:</strong> This is a system of equations encoded in matrix form. The matrix A = [2 3; 4 5] is the coefficient matrix. The unknown is x⃗ = [x; y]. The equation is Ax⃗ = b⃗. <strong>Heuristic choice:</strong> (a) Gaussian elimination (BB 80) — systematic, works for any size. (b) Inverse matrix (BB 82) — elegant if A⁻¹ is easy to find. For a 2×2: A⁻¹ = (1/(ad−bc))[d −b; −c a] = (1/(10−12))[5 −3; −4 2] = (−1/2)[5 −3; −4 2] = [−2.5 1.5; 2 −1]. x⃗ = A⁻¹b⃗ = [−2.5 1.5; 2 −1][8; 13] = [−20+19.5; 16−13] = [−0.5; 3]. Check: 2(−0.5)+3(3) = −1+9 = 8 ✓. <strong>Different problem — different diagnosis:</strong> Rotate the point (1,0) by 30°. This is a transformation. Matrix: R = [cos30° −sin30°; sin30° cos30°] = [√3/2 −1/2; 1/2 √3/2]. Multiply: [√3/2 −1/2; 1/2 √3/2][1; 0] = [√3/2; 1/2] ≈ (0.866, 0.5). The diagnosis ("transformation") selected multiplication without hesitation. The diagnosis drives everything.</p>

**Floor 2 (Definition):**
<p><strong>Matrix problem diagnosis flowchart:</strong> (1) <strong>Solving Ax=b</strong> (systems of equations) → Gaussian elimination (systematic) or A⁻¹ (if invertible and small). (2) <strong>Transforming points/shapes</strong> (rotation, scaling, reflection) → Matrix-vector multiplication. Watch order: R(v⃗) = R × v⃗. (3) <strong>Combining transformations</strong> (rotate THEN scale) → Matrix-matrix multiplication. Order matters: AB ≠ BA in general. (4) <strong>Finding properties</strong> (does A collapse space? is A invertible?) → Determinant. det(A)=0 → singular, no inverse. det(A)≠0 → invertible. (5) <strong>Data manipulation</strong> (reorganising rows/columns, finding patterns) → Row operations. (6) <strong>Verification</strong> (did I get the right inverse? right solution?) → Multiply A⁻¹A — should equal I. Multiply A × (proposed x⃗) — should equal b⃗.</p>

**Floor 3 (In action):**
<p>Every matrix BB in our deck addresses one branch of this flowchart. BB 70–72 (matrix intro, dimensions, isolation): "what is a matrix?" — the data-storage view. BB 75–76 (multiplication, why row×column): the transformation and equation-encoding views. BB 77 (Ax=b): the bridge from equations to matrices. BB 78–80 (row operations, Gaussian elimination): the systematic solver. BB 81 (identity matrix): the "do nothing" transformation — I×A = A. BB 82 (inverse): the "undo" transformation — A⁻¹A = I. BB 194 (rotation matrix): the transformation view par excellence — trigonometry in matrix form. The flowchart unifies them: every matrix problem starts with "what role is the matrix playing?" and proceeds to "which operation answers the question?" The heuristics don't change. Only the matrix dimensions do.</p>

**Image prompt:** A chalk flowchart: "Matrix in problem?" → "Solving Ax=b?" → Gaussian elimination / A⁻¹. "Transforming points?" → Matrix-vector multiply. "Combining transformations?" → Matrix-matrix multiply. "Checking if invertible?" → det(A). "Verifying?" → Multiply to get I or b⃗. Below: "Diagnose the matrix's role. The operation follows." Chalk on dark green board. Square 1:1.

---

## BB-NEW-446 — Gaussian elimination: decomposition as systematic tidying

**Subject:** maths | **Topic:** problem-solving | **Concept:** Gaussian-elimination-heuristic; row-reduction; systematic-tidying; decomposition | **Ground:** g1 | **Builds on:** [BB-NEW-409, BB-NEW-80, BB-NEW-78]

**Floor 0 (Idea):**
<p>Gaussian elimination is decomposition (BB 409) applied to matrices. A messy augmented matrix [A|b] is a problem that's too complex to solve directly. The heuristic: tidy ONE column at a time, working left to right, using row operations that preserve the solution. Each column cleanup is a sub-problem. Each row operation is a small, verifiable step. The method is mechanical — it never requires insight, only discipline. This is the matrix version of "break it into solvable pieces." And it's the oldest algorithm still in daily use, dating to Gauss's tracking of the asteroid Ceres in 1801.</p>

**Floor 1 (Concrete):**
<p>Solve the system: x + 2y + z = 3, 2x + 5y + 2z = 4, x + 3y + 3z = 6. <strong>Augmented matrix:</strong> [1 2 1 | 3; 2 5 2 | 4; 1 3 3 | 6]. <strong>Column 1 cleanup (eliminate x from rows 2 and 3):</strong> R₂ → R₂ − 2R₁: [1 2 1 | 3; 0 1 0 | −2; 1 3 3 | 6]. R₃ → R₃ − R₁: [1 2 1 | 3; 0 1 0 | −2; 0 1 2 | 3]. Column 1 is now clean — zeros below the pivot. <strong>Column 2 cleanup (eliminate y from row 3):</strong> R₃ → R₃ − R₂: [1 2 1 | 3; 0 1 0 | −2; 0 0 2 | 5]. Column 2 is clean — zero below the pivot. <strong>Back-substitution:</strong> Row 3: 2z = 5 → z = 2.5. Row 2: y = −2. Row 1: x + 2(−2) + 2.5 = 3 → x = 4.5. Solution: (4.5, −2, 2.5). Each column cleanup was an independent sub-problem. The row operations were mechanical — multiply a row, subtract from another, repeat. No insight needed. Just discipline. The decomposition heuristic reduced a 3×3 system to three trivial 1×1 back-substitutions.</p>

**Floor 2 (Definition):**
<p><strong>Gaussian elimination as decomposition:</strong> (1) Write the system as an augmented matrix [A|b]. (2) For each column from left to right: (a) Identify the <strong>pivot</strong> — the diagonal entry (or the first non-zero entry below it if the diagonal is zero). (b) Use row operations to create zeros BELOW the pivot. (c) Move to the next column. (3) The result is <strong>row-echelon form</strong> — a staircase of pivots with zeros below. (4) <strong>Back-substitute</strong> from the last row upward to find the unknowns. <strong>Heuristics within Gaussian elimination:</strong> (a) If a pivot is zero, swap rows (auxiliary element — you introduce a row swap to fix the problem). (b) If a pivot is small, consider partial pivoting (swap with the row having the largest entry in that column — numerical stability). (c) Always do the same thing to the augmented column — it's part of the row. Gaussian elimination reduces an n×n system to n trivial 1-variable equations — decomposition in its purest form.</p>

**Floor 3 (In action):**
<p>BB 80 (Gaussian elimination) is the full treatment. BB 78 (row operations) covers the three legal moves — swap, scale, replace — which are the sub-operations of the decomposition. BB 79 (row ops as bookkeeping) frames each operation as a ledger action: swap = reorder, scale = convert units, replace = consolidate accounts. BB 213 (Kirchhoff's laws — mesh analysis) uses Gaussian elimination under the hood — the simultaneous equations from KVL are solved by elimination, whether the student realises it or not. BB 169 (vector equations) — when converted to scalar components, the resulting system can be solved by Gaussian elimination. The method transfers across every topic where linear equations appear. The decomposition heuristic — tidy one column at a time, mechanical steps, back-substitute — is identical whether the equations come from circuits, forces, or geometry. Gaussian elimination is decomposition embodied in an algorithm.</p>

**Image prompt:** A chalk drawing of an augmented matrix transforming step by step into row-echelon form. Each step: a column is "cleaned" (zeros below the pivot), highlighted. The back-substitution arrows trace upward from the bottom row. Below: "Decomposition — tidy one column at a time. Mechanical. Systematic. Unfailing." Chalk on dark green board. Square 1:1.

---

## BB-NEW-447 — Matrix multiplication: pattern recognition for the row×column rule

**Subject:** maths | **Topic:** problem-solving | **Concept:** matrix-multiplication-pattern; row-times-column; visualisation; dimensions-check | **Ground:** g0 | **Builds on:** [BB-NEW-430, BB-NEW-75, BB-NEW-76]

**Floor 0 (Idea):**
<p>Matrix multiplication feels unnatural at first — row from the first, column from the second, multiply pairwise, sum. But like any pattern, it becomes second nature with recognition. The key heuristics: (1) Check dimensions FIRST — A(m×n) × B(n×p) = C(m×p). If the inner dimensions don't match, multiplication is impossible. (2) Visualise the operation — your finger runs across a row of A while running down a column of B. (3) Recognise special cases — multiplying by the identity leaves things unchanged; multiplying by a diagonal matrix scales each row; multiplying by a permutation matrix swaps rows. Pattern recognition transforms matrix multiplication from a memorised rule into a collection of recognisable templates.</p>

**Floor 1 (Concrete):**
<p>Multiply A = [2 1 0; 3 0 1] (2×3) by B = [1 0; 2 1; 0 3] (3×2). <strong>Dimension check:</strong> 2×3 × 3×2 → inner 3 matches → product is 2×2. Legal. <strong>Entry (1,1):</strong> Row 1 of A = [2,1,0], column 1 of B = [1;2;0]. 2×1 + 1×2 + 0×0 = 4. <strong>Entry (1,2):</strong> Row 1 of A, column 2 of B = [0;1;3]. 2×0 + 1×1 + 0×3 = 1. <strong>Entry (2,1):</strong> Row 2 of A = [3,0,1], column 1 of B. 3×1 + 0×2 + 1×0 = 3. <strong>Entry (2,2):</strong> Row 2 of A, column 2 of B. 3×0 + 0×1 + 1×3 = 3. C = [4 1; 3 3]. <strong>Special case check:</strong> If B were the identity, C would equal A. If B were a zero matrix, C would be zero. The pattern is: row i of A "dots" with column j of B to give entry (i,j) of C. Recognise this, and every multiplication is just a loop over the pattern.</p>

**Floor 2 (Definition):**
<p><strong>Matrix multiplication heuristics:</strong> (1) <strong>Dimension check:</strong> A(m×n) × B(p×q) is only defined if n = p. Result is m×q. (2) <strong>The row×column pattern:</strong> (AB)_{ij} = Σ_k A_{ik} B_{kj} — row i of A, column j of B, multiply elementwise, sum. (3) <strong>Visualisation:</strong> your left index finger moves across row i of A; your right index finger moves down column j of B; you multiply the numbers your fingers are on and add. (4) <strong>Special forms:</strong> identity (I×A = A×I = A), diagonal (scales each row), permutation (swaps rows), zero matrix (annihilates). (5) <strong>Non-commutativity:</strong> AB ≠ BA in general. Always check multiplication order. (6) <strong>Transpose rule:</strong> (AB)^T = B^T A^T — the order reverses. Recognising these patterns turns matrix multiplication from a chore into a reflex.</p>

**Floor 3 (In action):**
<p>BB 75 (matrix multiplication intro) teaches the row×column rule with worked examples. BB 76 (why row×column) explains that the rule is designed to make Ax=b represent a system of equations — each row of A dotted with x gives one equation. BB 194 (rotation matrix) applies multiplication to transform points: R × [x; y] = [x cos θ − y sin θ; x sin θ + y cos θ]. BB 167–168 (dot/cross products) — the dot product is the fundamental operation inside matrix multiplication! Each entry (AB)_{ij} is the dot product of the i-th row of A with the j-th column of B. Matrix multiplication is a batch dot-product operation. The pattern connects: dot product (BB 167) → matrix multiplication (BB 75) → linear systems (BB 77) → Gaussian elimination (BB 80). Each builds on the previous. Recognising the dot product inside matrix multiplication makes the operation feel familiar rather than foreign.</p>

**Image prompt:** A chalk drawing of a 2×3 matrix A and a 3×2 matrix B. Two hands — one running across a row of A, one down a column of B — meet at the multiplication and sum. The result C appears below. "Dimension check first. Then row × column = dot product. Recognise the pattern." Chalk on dark green board. Square 1:1.

---

## BB-NEW-448 — Matrices as transformations: the analogy heuristic

**Subject:** maths | **Topic:** problem-solving | **Concept:** matrix-transformations; analogy; geometry-of-matrices; linear-map | **Ground:** g1 | **Builds on:** [BB-NEW-405, BB-NEW-194, BB-NEW-75]

**Floor 0 (Idea):**
<p>A matrix is not just a grid of numbers. It's an instruction for transforming space — stretching, rotating, reflecting, shearing. Multiplying a matrix by a vector applies that transformation to the vector. This is the analogy heuristic (BB 405) at its most powerful: a matrix IS a transformation. The entries are the instructions. The columns of the matrix are where the basis vectors î and ĵ land after the transformation. This geometric view makes matrix multiplication intuitive: AB means "apply transformation B, then apply transformation A." The order matters because transformations don't commute — rotate then stretch is different from stretch then rotate.</p>

**Floor 1 (Concrete):**
<p>The rotation matrix R(30°) = [cos30° −sin30°; sin30° cos30°] = [√3/2 −1/2; 1/2 √3/2]. Where does î = [1;0] go? Multiply: R×[1;0] = [√3/2; 1/2] — this is exactly the first COLUMN of R. Where does ĵ = [0;1] go? R×[0;1] = [−1/2; √3/2] — the second column. The columns of ANY matrix are the images of the basis vectors. The scaling matrix S = [2 0; 0 3] sends î → (2,0) and ĵ → (0,3) — stretches x by 2, y by 3. Now compose: first rotate by 30°, then scale: S × R = [2 0; 0 3] × [√3/2 −1/2; 1/2 √3/2] = [√3 −1; 3/2 (3√3)/2]. This is a NEW transformation — scale-then-rotate (actually rotate-then-scale in application order). First apply R, then S. The matrix product encodes the composition. The geometry of the columns makes every transformation visible: the first column is where î goes; the second column is where ĵ goes. The grid follows.</p>

**Floor 2 (Definition):**
<p><strong>Matrix-as-transformation heuristic:</strong> (1) The columns of a 2×2 matrix A = [a b; c d] are the images of the standard basis vectors: A×[1;0]^T = [a;c]^T (first column); A×[0;1]^T = [b;d]^T (second column). (2) The <strong>determinant</strong> det(A) = ad−bc is the factor by which areas are scaled. det(A)=0 means the transformation collapses the plane to a line or point — not invertible. (3) <strong>Composition</strong>: AB means apply B first, then A. The product matrix's columns are A applied to B's columns. (4) <strong>Special transformations:</strong> Rotation (orthogonal, det=1), reflection (orthogonal, det=−1), scaling (diagonal), shear (triangular with 1s on diagonal). (5) The <strong>analogy</strong>: just as functions transform numbers (f(x)), matrices transform vectors (Av⃗). Functions compose: f(g(x)). Matrices compose: AB v⃗ = A(Bv⃗). The algebra is identical.</p>

**Floor 3 (In action):**
<p>BB 194 (rotation matrix) is the purest example of the transformation view. BB 75 (multiplication) introduces the algebraic rule; BB 194 reveals what the rule MEANS geometrically. BB 30–32 (Dot, Dash, and the kissing curves) use functions (f(x)=x², f(x)=mx+c) to transform numbers — matrices do the same for vectors. The analogy (BB 405) is explicit: functions → matrices, numbers → vectors, composition → multiplication. BB 82 (inverse matrix): if A is a transformation, A⁻¹ is the transformation that undoes it. If A rotates by 30°, A⁻¹ rotates by −30°. If A scales by 2, A⁻¹ scales by ½. If A has det=0, there IS no inverse — the transformation collapsed a dimension, and you can't recover what was lost. The transformation view makes every matrix fact geometrically obvious. Why does (AB)⁻¹ = B⁻¹A⁻¹? Because to undo "B then A," you must undo A first, then undo B. The order reverses — exactly like putting on socks then shoes: the reverse order is shoes off, then socks off. The transformation analogy makes the abstract algebra feel like common sense.</p>

**Image prompt:** A chalk drawing of a grid (the plane) being transformed. Left: original grid with î and ĵ. Right: transformed grid — î has moved to column 1 of the matrix, ĵ to column 2. A box in the original grid becomes a parallelogram in the transformed grid — area scaled by |det(A)|. Below: "A matrix IS a transformation. The columns are where î and ĵ go." Chalk on dark green board. Square 1:1.

---

## BB-NEW-449 — Checking your matrix work: verification heuristics

**Subject:** maths | **Topic:** problem-solving | **Concept:** matrix-verification; checking-inverse; checking-solution; error-detection | **Ground:** g1 | **Builds on:** [BB-NEW-403, BB-NEW-82, BB-NEW-80]

**Floor 0 (Idea):**
<p>Matrix calculations are error-prone. A single sign mistake in Gaussian elimination propagates through every subsequent step. Verification heuristics are essential — and matrices offer uniquely powerful checks. If you've found A⁻¹, multiply it by A — you must get I. If you've solved Ax⃗=b⃗, multiply A by your solution — you must get b⃗. If you've computed a determinant and it's zero, the matrix has no inverse — check that your problem even HAS a unique solution. These checks take seconds and catch almost all errors. Never skip them.</p>

**Floor 1 (Concrete):**
<p>You've found the inverse of A = [2 3; 4 5] as A⁻¹ = [−2.5 1.5; 2 −1]. <strong>Check:</strong> A⁻¹A = [−2.5 1.5; 2 −1] × [2 3; 4 5]. Top-left: (−2.5)(2) + (1.5)(4) = −5 + 6 = 1 ✓. Top-right: (−2.5)(3) + (1.5)(5) = −7.5 + 7.5 = 0 ✓. Bottom-left: (2)(2) + (−1)(4) = 4 − 4 = 0 ✓. Bottom-right: (2)(3) + (−1)(5) = 6 − 5 = 1 ✓. A⁻¹A = I. The inverse is correct. You've solved Ax⃗ = b⃗ and got x⃗ = [−0.5; 3]. <strong>Check:</strong> A × x⃗ = [2 3; 4 5] × [−0.5; 3] = [2(−0.5)+3(3); 4(−0.5)+5(3)] = [−1+9; −2+15] = [8; 13] = b⃗ ✓. <strong>Check determinant:</strong> For the system 2x+3y=8, 4x+6y=13. A = [2 3; 4 6]. det(A) = 12−12 = 0. The matrix is singular — no unique solution. Indeed, row 2 is 2× row 1, but the right-hand sides (8 and 13) are not in the same ratio. The system is inconsistent — NO solution. The determinant warned before any solving was attempted.</p>

**Floor 2 (Definition):**
<p><strong>Matrix verification heuristics:</strong> (1) <strong>Inverse check:</strong> Compute A⁻¹A and AA⁻¹. Both must equal I. If they don't, the inverse is wrong. (2) <strong>Solution check:</strong> Compute Ax⃗ using your proposed solution. Must equal b⃗. (3) <strong>Determinant pre-check:</strong> Before attempting to invert or solve uniquely, compute det(A). If det(A)=0, the matrix is singular — no unique inverse, no unique solution. (4) <strong>Dimension check:</strong> In matrix multiplication, the inner dimensions must match. If they don't, the multiplication is meaningless. (5) <strong>Trace check:</strong> For a 2×2, tr(A) = a+d. The trace of A⁻¹ should be tr(A)/det(A) if you want a quick sanity check (for 2×2: A⁻¹ = (1/det)[d −b; −c a]). (6) <strong>Row sum check:</strong> After Gaussian elimination, plug the solution back into the ORIGINAL equations — not the transformed ones, because you might have made a row-operation error.</p>

**Floor 3 (In action):**
<p>Verification is Polya's Step 4 (BB 403) applied to matrices. BB 82 (inverse) emphasises A⁻¹A = I. BB 80 (Gaussian elimination) emphasises back-substitution verification. BB 169 (vector equations): after solving, reconstruct the original vector equation and check. The dimension check (BB 71) is Polya's "test by dimension" (BB 421) — the inner dimensions of a matrix product must match, just as the dimensions of physical quantities must match in an equation. Pattern: every matrix operation has a corresponding inverse operation that serves as verification. Multiplication → check dimensions. Inversion → multiply to get I. Solving → multiply to get b⃗. Row operations → substitute into original system. The verification is not optional. A matrix answer without verification is a guess. With verification, it's a solution.</p>

**Image prompt:** A chalk drawing of a matrix inverse calculation with a red circle around the verification step: A⁻¹A = I. A Gaussian elimination with a green checkmark: Ax⃗ = b⃗ verified. Below: "Verify every matrix result. A⁻¹A must equal I. Ax⃗ must equal b⃗. det(A)=0 means no unique solution." Chalk on dark green board. Square 1:1.

---

## BB-NEW-450 — The determinant: the single number that diagnoses a matrix

**Subject:** maths | **Topic:** problem-solving | **Concept:** determinant; matrix-diagnosis; area-scaling; invertibility-test | **Ground:** g1 | **Builds on:** [BB-NEW-421, BB-NEW-82, BB-NEW-449]

**Floor 0 (Idea):**
<p>The determinant of a matrix is a single number that encodes a wealth of information. For a 2×2 matrix, det([a b; c d]) = ad − bc. This number tells you: (1) Is the matrix invertible? (det ≠ 0 → yes; det = 0 → no.) (2) By what factor does the transformation scale areas? (|det| = area scale factor.) (3) Does the transformation preserve orientation? (det > 0 → orientation preserved; det < 0 → orientation reversed — a reflection is involved.) (4) Are the rows (or columns) linearly independent? (det ≠ 0 → yes.) The determinant is Polya's "test by dimension" applied to matrices — a one-number diagnostic that catches errors before you invest time in a solution that doesn't exist.</p>

**Floor 1 (Concrete):**
<p>Matrix A = [2 3; 4 6]. det(A) = 12−12 = 0. <strong>Diagnosis:</strong> Singular. The rows are multiples of each other (row 2 = 2 × row 1). The columns are multiples of each other (column 2 = 1.5 × column 1). The transformation collapses the plane to a line. There is no A⁻¹. The system Ax⃗ = b⃗ either has no solution or infinitely many. <strong>Check the system:</strong> 2x+3y=8, 4x+6y=13. det=0, but the RHS are not in the same ratio (8×2=16≠13) → no solution. <strong>Matrix B = [3 1; 1 2]:</strong> det(B) = 6−1 = 5. Non-zero → invertible. The transformation scales areas by a factor of 5. The area of any shape, multiplied by B, becomes 5× larger. B⁻¹ exists. The system Bx⃗=b⃗ has a unique solution for any b⃗. The determinant took 2 seconds to compute and answered every preliminary question. For a rotation matrix R(θ) = [cosθ −sinθ; sinθ cosθ]: det(R) = cos²θ + sin²θ = 1. Rotation preserves area and orientation — as expected. For a reflection matrix [1 0; 0 −1]: det = −1. Areas are preserved (|det|=1) but orientation is reversed — consistent with a mirror reflection.</p>

**Floor 2 (Definition):**
<p>The <strong>determinant</strong> of a 2×2 matrix A = [a b; c d] is <strong>det(A) = ad − bc</strong>. Properties: (1) det(A) ≠ 0 ⟺ A is invertible (non-singular). (2) det(A) = 0 ⟺ A is singular — rows/columns are linearly dependent. (3) |det(A)| = factor by which the transformation scales areas. (4) sign(det(A)) indicates orientation: + preserves, − reverses. (5) det(AB) = det(A) × det(B). (6) det(A⁻¹) = 1/det(A). (7) det(A^T) = det(A). (8) For a triangular matrix, det = product of diagonal entries. For larger matrices, det is computed by expansion by minors or row reduction. <strong>Heuristic:</strong> before inverting or solving, compute the determinant. If zero, stop — the problem either has no unique solution or needs a different approach (least squares, pseudoinverse).</p>

**Floor 3 (In action):**
<p>The determinant is the matrix analogue of dimensional analysis. BB 82 (inverse) uses det to determine invertibility and to write A⁻¹ = (1/det)[d −b; −c a]. BB 194 (rotation matrix): det(R)=1 — every rotation matrix has determinant 1, a quick verification. BB 168 (cross product): the magnitude of a⃗ × b⃗ equals the area of the parallelogram they span. The area of the parallelogram formed by the columns of a 2×2 matrix A equals |det(A)|. The cross product magnitude and the determinant are the same geometric quantity — area — computed differently. This is transfer (BB 435) in action. BB 80 (Gaussian elimination): row operations change the determinant in predictable ways — swapping rows flips the sign, scaling a row scales the det, adding a multiple of one row to another leaves det unchanged. These properties are used to compute determinants efficiently for large matrices. The determinant is the silent sentinel of linear algebra — always computed first, always informative, never wrong.</p>

**Image prompt:** A chalk drawing of a 2×2 matrix with det = ad−bc computed. Three cases: det=5 (invertible, area ×5, orientation preserved), det=0 (singular, collapses plane, no inverse), det=−3 (invertible, area ×3, orientation reversed). Below: "The determinant — one number, four diagnoses. Compute it first." Chalk on dark green board. Square 1:1.

---

## BB-NEW-451 — Vectors and matrices together: the transfer heuristic

**Subject:** maths | **Topic:** problem-solving | **Concept:** vectors-matrices-unified; linear-transformations; transfer; solving-systems | **Ground:** g1 | **Builds on:** [BB-NEW-435, BB-NEW-194, BB-NEW-169, BB-NEW-77]

**Floor 0 (Idea):**
<p>Vectors and matrices are not separate topics. A vector is a one-column matrix. A matrix is a collection of column vectors. Systems of equations (Ax⃗=b⃗), transformations (y⃗=Ax⃗), and vector operations (dot product, cross product) are all instances of the same underlying structure: linear algebra. The transfer heuristic (BB 435) says: recognise the unity beneath the surface. Solving a system of equations by Gaussian elimination is the SAME operation as finding the vector x⃗ that A transforms into b⃗. The inverse matrix A⁻¹ is the transformation that undoes A — the same way subtracting undoes adding. Vectors, equations, transformations, matrices — they are one subject, seen from different angles.</p>

**Floor 1 (Concrete):**
<p>Three problems, one structure. <strong>Problem 1 (equations):</strong> Solve 2x+3y=8, 4x+5y=13. Matrix form: [2 3; 4 5][x; y] = [8; 13]. Solve by Gaussian elimination → x=−0.5, y=3. <strong>Problem 2 (transformation):</strong> What vector, when transformed by A = [2 3; 4 5], gives b⃗ = [8; 13]? This is the SAME question as Problem 1. The answer is A⁻¹b⃗ = [−0.5; 3]. <strong>Problem 3 (system of vector equations):</strong> Find a⃗ and b⃗ such that a⃗+b⃗ = 3î+7ĵ and a⃗−b⃗ = î+3ĵ. In matrix form: [1 1; 1 −1][a⃗; b⃗] = [3î+7ĵ; î+3ĵ]. Each entry of the unknown is a vector, but the coefficient matrix is scalar. The same Gaussian elimination works on the components. All three problems are Ax⃗=b⃗ in different notation. The solution method — Gaussian elimination or A⁻¹ — is identical. The transfer is complete: vectors are columns, matrices are transformations, equations are the bridge.</p>

**Floor 2 (Definition):**
<p><strong>The unified linear algebra framework:</strong> (1) A <strong>vector</strong> is an n×1 column matrix. (2) A <strong>matrix</strong> A represents a linear transformation: input vector x⃗, output vector Ax⃗. (3) The <strong>equation</strong> Ax⃗ = b⃗ asks: "what input x⃗, when transformed by A, produces output b⃗?" (4) <strong>Gaussian elimination</strong> solves Ax⃗ = b⃗ by systematically reversing the transformation. (5) The <strong>inverse</strong> A⁻¹ is the transformation that exactly undoes A: A⁻¹(Ax⃗) = x⃗. (6) The <strong>determinant</strong> det(A) tells you whether A is invertible (det≠0) or collapses space (det=0). (7) <strong>Composition</strong> of transformations is matrix multiplication: doing B then A is AB. This framework unifies: vector algebra, systems of equations, geometric transformations, and data operations. The notation changes; the mathematics doesn't.</p>

**Floor 3 (In action):**
<p>Our BBs were designed for this unification. BB 70–82 (matrices) and BB 160–172 (vectors) are two halves of one story. BB 77 (Ax=b) is the bridge. BB 194 (rotation matrix) shows matrices AS transformations — the geometric view. BB 169 (vector equations) shows that vector equations decompose into scalar equations — the same scalar equations that matrix methods solve. BB 443 (dot vs cross) shows that the dot product IS the operation inside matrix multiplication. BB 446 (Gaussian elimination) is the universal solver. The transfer (BB 435) is not metaphorical — it's literal. A vector equation and a matrix equation are the SAME equation in different notation. Solving by components and solving by Gaussian elimination are the SAME method in different execution. The student who sees the unity spends half the effort for twice the understanding. Thompson's principle applies: "what one fool can learn as separate topics, another can learn as one." The unity is the mastery.</p>

**Image prompt:** A chalk drawing of a central equation Ax⃗=b⃗ with three radiating views: (1) System of equations (rows = equations). (2) Transformation (A acts on x⃗ to produce b⃗). (3) Column picture (x⃗ is the combination of columns of A that gives b⃗). All three views annotated with references to specific BBs. Below: "Vectors and matrices — one subject, three perspectives. The method transfers." Chalk on dark green board. Square 1:1.

---

## Summary

### Part 1 — Vectors + Heuristics (5 BBs)
| # | Title | Core heuristic |
|---|-------|---------------|
| 440 | The vector toolkit | Diagnosis flowchart — add? resolve? angle? perpendicular? unknown? |
| 441 | Resolving vectors | Decomposition — choose axes, resolve EVERY force |
| 442 | Adding vectors | Dual method — triangle rule (insight) + components (precision) |
| 443 | Dot vs cross | Pattern recognition — along (dot, cos, scalar) vs perpendicular (cross, sin, vector) |
| 444 | Solving vector equations | Translation — one vector eq = 2/3 scalar eqs; direct algebra shortcut |

### Part 2 — Matrices + Heuristics (6 BBs)
| # | Title | Core heuristic |
|---|-------|---------------|
| 445 | The matrix toolkit | Diagnosis — solving? transforming? properties? verifying? |
| 446 | Gaussian elimination | Decomposition — tidy one column at a time, back-substitute |
| 447 | Matrix multiplication | Pattern recognition — dimension check, row×column = dot product |
| 448 | Matrices as transformations | Analogy — columns are where î and ĵ go, composition = multiplication |
| 449 | Checking matrix work | Verification — A⁻¹A=I, Ax⃗=b⃗, det pre-check, dimension check |
| 450 | The determinant | Diagnostic — one number: invertible? area scaling? orientation? |

### Part 3 — Unified Framework (1 BB)
| # | Title | Core heuristic |
|---|-------|---------------|
| 451 | Vectors and matrices together | Transfer — one subject, three views (equations, transformations, vector algebra) |

**12 BBs.** Every heuristic from the problem-solving course (BB 400–435) is applied to concrete vector and matrix operations from our existing content BBs. The diagnosis flowchart (BB 440, 445) makes choosing the right operation automatic. The cross-references create deliberate practice loops: learn the heuristic → apply it to known BBs → recognise the pattern → transfer to new problems.
