# Problem-Solving Heuristics — Complete Course (16 BBs)

A methodology course drawn from George Polya's *How to Solve It* and Silvanus P. Thompson's *Calculus Made Easy*. Each BB teaches one heuristic, explains it with Thompson's intuitive clarity, and applies it directly to problems from the existing Strata/Qubix BBs. The goal: not new content, but new **skill** — the meta-skill of solving any problem in maths, physics, or chemistry by knowing which mental move to make and when.

Every BB references specific existing BBs so the reader can immediately practice the heuristic on familiar material. Subjects: maths (tagged `maths`), physics (`physics`), or `general`.

---

# Part 1 — The Meta-Method

---

## BB-NEW-400 — Understand the problem: what is the unknown?

**Subject:** general | **Topic:** problem-solving | **Concept:** Polya-step-1; understand-problem; unknown; data; condition | **Ground:** g0 | **Builds on:** []

**Floor 0 (Idea):**
<p>Polya's first step is deceptively simple: <strong>understand the problem</strong>. Not skim it. Not start calculating. Actually understand it. What is the unknown? What are the data? What is the condition that links them? Can you draw a figure? Can you introduce suitable notation? If you can't state the unknown in one sentence, you don't understand the problem yet — and any calculation you do is premature. This step costs nothing and saves everything.</p>

**Floor 1 (Concrete):**
<p>A problem says: "A 10 kg block rests on a 30° slope. The coefficient of static friction is 0.5. Will it slide?" Before any equation: unknown = "does it slide or not?" Data = m=10 kg, θ=30°, μₛ=0.5. Condition = the block slides if the down-slope pull (mg sin θ) exceeds the maximum static friction (μₛ mg cos θ). Draw the slope. Draw the block. Draw mg straight down. Resolve into mg sin θ along the slope and mg cos θ into the slope. Draw friction up the slope. Now you have a figure. Now you can write: mg sin 30° = 10×9.8×0.5 = 49 N. fₛ_max = 0.5 × 10 × 9.8 × 0.866 = 42.5 N. 49 > 42.5 → yes, it slides. The answer took 30 seconds of calculation — after 2 minutes of understanding. If you'd started calculating without drawing the figure and resolving, you'd have used mg=98 N for friction (forgetting the cos θ) and concluded 49 < 49 → no slide. The error was not in the arithmetic; it was in the understanding. Polya's first step catches it.</p>

**Floor 2 (Definition):**
<p><strong>Polya's Step 1 — Understand the Problem:</strong> (1) <strong>What is the unknown?</strong> State it in a complete sentence. "Find the acceleration" or "Determine whether the block slides." (2) <strong>What are the data?</strong> List them explicitly with symbols and units. (3) <strong>What is the condition?</strong> What equation or inequality connects the data to the unknown? (4) <strong>Draw a figure</strong> if possible. Label the known and unknown quantities. (5) <strong>Introduce suitable notation.</strong> Give names to the unknowns. (6) <strong>Separate the parts of the condition.</strong> Can you write them down? A problem well understood is half solved.</p>

**Floor 3 (In action):**
<p>Thompson's *Calculus Made Easy* opens with a disarmingly simple observation: "What one fool can do, another can." The fear of a problem — "this looks too hard" — is almost always a failure of Step 1. Calculus problems look hard because of notation: dy/dx, ∫, limits. But once you understand that dx just means "a tiny bit of x" and dy/dx is just "how much y changes when x changes a tiny bit," the fear dissolves. In our BBs: BB 281 (inclined plane) is trivial if you draw the figure and resolve mg. BB 314 (mirror formula) is trivial if you identify f, u, and the unknown v — and apply the sign convention. BB 220 (mole calculations) is trivial if you identify m (given), M (from the periodic table), and the unknown n — then n=m/M. The pattern: understand first, calculate second. Every error in homework, exams, and real life traces back to skipping this step. Polya's first commandment: <em>don't</em>.</p>

**Image prompt:** A chalk drawing of a person standing before a tangled mess of wires (the problem). The person separates one wire — "What is the unknown?" — and the tangle unravels into a straight line. Below: "Polya Step 1 — Understand the problem. Unknown? Data? Condition? Draw a figure." Chalk on dark green board. Square 1:1.

---

## BB-NEW-401 — The calculus mindset: dx is just a tiny bit of x

**Subject:** maths | **Topic:** problem-solving | **Concept:** calculus-mindset; infinitesimals; Thompson; fear-removal; dodge | **Ground:** g0 | **Builds on:** [BB-NEW-400, Card 12, BB-NEW-19, BB-NEW-22]

**Floor 0 (Idea):**
<p>Silvanus P. Thompson wrote *Calculus Made Easy* in 1910 because he was furious that calculus was taught as something mysterious and difficult. His core message: "What one fool can do, another can." The symbols scare you. d just means "a little bit of." dx is a little bit of x. dy is a little bit of y. dy/dx is how much y changes when x changes a little bit — the slope, the rate. ∫ means "the sum of all the little bits." There is no magic. There is no deep mystery. There is just the method of increments — Thompson called it "the dodge" — and once you see it, calculus becomes mechanical.</p>

**Floor 1 (Concrete):**
<p>Thompson's "dodge" for differentiating y = x²: Give x a tiny increment dx. Then x becomes x + dx, and y becomes y + dy = (x+dx)² = x² + 2x·dx + (dx)². Subtract the original y = x²: dy = 2x·dx + (dx)². Now here's the dodge: (dx)² is a tiny bit of a tiny bit — "a small quantity of the second order of smallness" — negligible compared to 2x·dx. So dy = 2x·dx, and dy/dx = 2x. That's it. That's the derivative of x². No limits, no epsilon-delta, no formal definition. Just "give x a nudge, see how y responds, ignore the negligible bits." This works for x³ (gives 3x²), x⁴ (4x³), and by pattern, xⁿ gives nxⁿ⁻¹. The power rule is not a theorem to memorise — it's a pattern that emerges from the dodge, applied once.</p>

**Floor 2 (Definition):**
<p><strong>Thompson's method of increments (the "dodge"):</strong> (1) Let x increase by a small increment dx. (2) Compute the new value of y: y + dy = f(x+dx). (3) Subtract the original y to find dy. (4) Expand and discard terms containing (dx)² or higher powers — these are "negligibly small" compared to terms with dx. (5) Divide: dy/dx = the remaining coefficient of dx. This gives the derivative. <strong>For integration:</strong> read it backwards. If dy/dx = 2x, then dy = 2x·dx, and summing all the little dy's gives y = x² + C. Integration is "anti-differentiation" — find the function whose derivative is the given one.</p>

**Floor 3 (In action):**
<p>Thompson's mindset applies far beyond calculus. Every intimidating topic has a simple core that notation obscures. In our BBs: Snell's law (BB 317) looks like n₁ sin θ₁ = n₂ sin θ₂ — but the idea is just "light slows down, so it bends." The ideal gas law (BB 269) looks like PV = nRT — but the idea is just "squeeze a gas and it pushes back harder; heat it and it pushes harder still." Kirchhoff's laws (BB 211-212) look like ΣI=0 and ΣV=0 — but the ideas are just "what goes in must come out" and "what goes up must come down." Thompson's gift was refusing to let notation intimidate. His book opens with: "Considering how many fools can calculate, it is surprising that it should be thought either a difficult or a tedious task for any other fool to learn how to master the same tricks." The calculus BBs in our deck (BB-NEW-19, 21, 22, 130-145) all use this spirit. The math is the same; the fear is optional.</p>

**Image prompt:** A chalk drawing of a large, scary-looking "dy/dx" symbol being broken apart — the "d" separates to show "a little bit of" and the "y" and "x" become a small triangle showing rise over run. Below: Thompson's quote "What one fool can do, another can." Chalk on dark green board. Square 1:1.

---

## BB-NEW-402 — Devise a plan: the bridge from known to unknown

**Subject:** general | **Topic:** problem-solving | **Concept:** Polya-step-2; devise-plan; heuristics; connection | **Ground:** g0 | **Builds on:** [BB-NEW-400]

**Floor 0 (Idea):**
<p>You understand the problem. Now: how do you get from the data to the unknown? This is the plan. Polya's step 2 is not a single technique — it's a mental search through your toolkit of heuristics. Have you seen this problem before? Or a related one? Can you restate it? Can you solve a simpler version? Can you introduce an auxiliary element? The plan is the bridge. Without it, you wander. With it, you build.</p>

**Floor 1 (Concrete):**
<p>Problem: "Find the acceleration of a solid cylinder rolling without slipping down a 30° incline." Data: M, R, θ=30°, rolling (so a = αR). Unknown: a. Plan: (1) This is a combined translation+rotation problem — I've seen this pattern in BB 291 (rolling motion). (2) I need two equations: F=ma for translation and τ=Iα for rotation. (3) For translation along the slope: mg sin θ − f = Ma, where f is static friction. (4) For rotation about the COM: torque from friction τ = fR = Iα. I = ½MR² for a solid cylinder. (5) Constraint: a = αR → α = a/R. (6) From (4): fR = ½MR² × a/R → f = ½Ma. (7) Substitute into (3): mg sin θ − ½Ma = Ma → mg sin θ = (3/2)Ma → a = (2/3)g sin 30° = (2/3)×9.8×0.5 = 3.27 m/s². The plan was: recognise the problem type, recall the two governing equations, write the constraint, solve simultaneously. Every step was chosen deliberately. No step was random.</p>

**Floor 2 (Definition):**
<p><strong>Polya's Step 2 — Devise a Plan:</strong> Find the connection between data and unknown. If you can't find a direct connection, consider: (1) <strong>Have you seen it before?</strong> Or a related problem? (2) <strong>Restate the problem</strong> — use different words, different notation, a different perspective. (3) <strong>Solve a related problem</strong> — a simpler version, a special case, an analogous problem. (4) <strong>Introduce auxiliary elements</strong> — a new unknown, a construction line, a clever substitution. (5) <strong>Work backwards</strong> — start from the unknown and ask what would give you that. (6) <strong>Decompose</strong> — break into smaller problems you CAN solve. The plan may not be perfect. A good plan, imperfectly executed, beats no plan.</p>

**Floor 3 (In action):**
<p>Polya's heuristics are the thinking tools between "I understand the problem" and "I have the answer." In our BBs, you've used them constantly without naming them. When you draw a free body diagram (BB 281), you're using "draw a figure" and "decomposition." When you choose the pivot to eliminate an unknown force (BB 285), you're using "auxiliary elements." When you use energy conservation instead of kinematics (BB 291 — mgh = ½mv²+½Iω² instead of F=ma and τ=Iα), you're using "restate the problem" — the same physics, a different path. When you solve a quadratic by factoring rather than the formula (BB 120), you're using "do you know a related problem?" — both methods work; one is faster for this particular equation. The heuristics are not a formula to follow blindly. They're a mental checklist to run through when you're stuck. And the more you use them, the faster you recognise which one fits which situation.</p>

**Image prompt:** A chalk drawing of a person standing at one side of a river (Data) looking at the other side (Unknown). Between them, stepping stones labelled: "Seen it before?", "Restate?", "Simpler case?", "Work backwards?", "Draw it?", "Decompose?" — the heuristics as a bridge. Chalk on dark green board. Square 1:1.

---

## BB-NEW-403 — Carry out the plan AND look back

**Subject:** general | **Topic:** problem-solving | **Concept:** Polya-step-3-4; execute; verify; look-back; check | **Ground:** g0 | **Builds on:** [BB-NEW-402]

**Floor 0 (Idea):**
<p>Polya's Step 3: carry out the plan. Check each step. Can you prove it's correct? Polya's Step 4: look back. Examine the solution. Can you check the result? Can you check the reasoning? Can you derive it differently? Can you use the result or the method for some other problem? Most students stop at Step 3 — "I got an answer" — and move on. Polya says: the most valuable learning happens at Step 4. The answer is not the end. The answer is the beginning of understanding.</p>

**Floor 1 (Concrete):**
<p>Problem solved: "The critical angle for water-air is 48.8°" (from Snell's law: sin θ_c = n₂/n₁ = 1.00/1.33 = 0.7519, θ_c = 48.75°). Step 3 check: Did I use the correct indices? Water→air means n₁=1.33, n₂=1.00. Yes. Is sin θ_c < 1? 0.7519 — yes, valid. Did I take sin⁻¹ correctly? sin⁻¹(0.7519) ≈ 48.8° — yes. Step 4 look back: Can I check this? If θ_c ≈ 49°, then a ray at 45° (less than critical) should exit — and indeed, it does. A ray at 50° (greater than critical) should be totally reflected — TIR occurs. Can I derive it differently? Yes — from the wave perspective, the transmitted wave becomes evanescent at >θ_c. Can I use this result? The critical angle for glass (n=1.5) would be sin⁻¹(1/1.5) = 41.8° — a smaller critical angle because glass is denser. Diamond (n=2.42): θ_c ≈ 24.4° — tiny, which is why diamond sparkles. The single calculation for water unlocked predictions for every transparent material.</p>

**Floor 2 (Definition):**
<p><strong>Polya's Step 3 — Carry Out the Plan:</strong> (1) Check each step as you go. Is it correct? Can you prove it? (2) Is each algebraic manipulation valid? (Divide by zero? Squared both sides without checking sign? Dropped a solution?) (3) Are the units consistent? (4) Does each intermediate result make physical sense? <strong>Polya's Step 4 — Look Back:</strong> (1) Can you <strong>check the result</strong>? Plug it into the original equation. Test limiting cases. (2) Can you <strong>check the reasoning</strong>? Is there a different way to get the same answer? (3) Can you <strong>use the result</strong>? Does it solve a related problem? (4) Can you <strong>use the method</strong>? Where else does this technique apply? Step 4 is where the problem teaches you something beyond itself.</p>

**Floor 3 (In action):**
<p>Thompson ends many sections of *Calculus Made Easy* with exercises — not just answers, but remarks like "Can you verify this by differentiating your answer?" That's Step 4. In our BBs, every worked example ends with a check: "Is the image real? The formula gives v negative — yes, real and inverted" (BB 314). "Does the efficiency exceed 1? No — η = 57% is less than 100%, consistent with the second law" (BB 274). "Does the answer make sense dimensionally? Force = N, and mg sin θ gives kg·m/s² = N — yes" (BB 281). Step 4 is also where the method crystallises into memory. When you solved the ladder problem (BB 287) by choosing the foot as pivot, the method — "choose the pivot to eliminate unknowns" — became available for beam problems, crane problems, and any static equilibrium. The problem is the vehicle; the method is the destination. Step 4 is where you get out and look at the map.</p>

**Image prompt:** A chalk drawing of a completed bridge (from Data to Unknown) with a person standing at the far end looking back. Speech bubble: "Can I check this? Can I use this method elsewhere? Is there a simpler way?" Below: the four-step cycle — Understand → Plan → Execute → Look Back → (return to Understand for the next problem). Chalk on dark green board. Square 1:1.

---

# Part 2 — Core Heuristics

---

## BB-NEW-404 — Working backwards: from answer to question

**Subject:** general | **Topic:** problem-solving | **Concept:** working-backwards; reverse-engineering; synthesis | **Ground:** g0 | **Builds on:** [BB-NEW-402]

**Floor 0 (Idea):**
<p>Most problems are solved forward: data → unknown. But sometimes the path forward is unclear, and the path backward is obvious. Working backwards means: assume you had the answer. What would have to be true just before that? And just before that? Trace the chain of dependencies backward until you hit something you know. This is Polya's most distinctive heuristic, and it's the natural mode of thinking for analysis, debugging, and proof.</p>

**Floor 1 (Concrete):**
<p>Problem: "How much water at 20°C must be added to 200 g of water at 80°C to bring the final temperature to 30°C?" Work backwards from the final state: at T_f=30°C, the hot water has cooled by 50°C and the cold water has warmed by 10°C. Heat lost by hot water = heat gained by cold water. Hot water: Q_lost = m_hot × c × ΔT_hot = 0.2 × 4180 × 50 = 41,800 J. Cold water: Q_gained = m_cold × 4180 × 10. Setting equal: 41,800 = m_cold × 41,800 → m_cold = 1.0 kg. Forward: hard. Backward: the final temperature dictates the ΔT for each component, and the heat lost must equal heat gained. Actually, let me rework: the backward approach is: (1) The mixture is at 30°C. (2) The hot water contributed heat = 0.2×4180×(80−30) = 41,800 J. (3) The cold water absorbed that exact amount to warm from 20°C to 30°C. (4) So m_cold = 41,800/(4180×10) = 1.0 kg. The backward chain: final T → energy from hot → mass of cold. Each step asks "what must be true for this to happen?"</p>

**Floor 2 (Definition):**
<p><strong>Working backwards</strong> (regressive analysis, synthesis): (1) Start from the unknown — the thing you want to find. (2) Ask: "What would give me this?" — what earlier quantity, if known, would determine the unknown? (3) Treat that new quantity as the unknown of a new, smaller problem. (4) Repeat until you reach a known datum. (5) Now reverse direction — solve forward through the chain. This heuristic is especially powerful for: finding constructions in geometry ("to find X, I would need Y; to find Y, I would need Z; Z I know"), solving equations ("to get x, I need to undo the operations around it"), and debugging ("the output is wrong, so the input to this stage must have been wrong, so...").</p>

**Floor 3 (In action):**
<p>Working backwards is the engine of algebraic problem-solving. In BB 282 (connected bodies — Atwood's machine), you work backwards: "I want a. To get a, I need the net force on each mass. The net force depends on tension T. T is unknown. I can eliminate T by adding the two F=ma equations." The backward chain: a → (T, mg) → eliminate T → a = g(m₂−m₁)/(m₂+m₁). In BB 136 (building the exponential model), you work backwards from two data points: "I want k. k = ln(A₂/A₁) / Δt. I have A₂, A₁, and Δt. Done." In chemistry BB 221 (empirical formulas), you work backwards from composition percentages: "% → grams → moles → simplest ratio → empirical formula." The forward path would be: "I have a compound — somehow it has this formula." The backward path is: "Given the percentages, what must the formula be?" Working backwards turns "what is the answer?" into "what must the answer be, given what I know?" — and that single reframing unlocks an entire class of problems.</p>

**Image prompt:** A chalk drawing of a maze with a person at the entrance (Data) looking confused, and a second person at the exit (Unknown) tracing a path backwards to the entrance. The backward path is highlighted. Below: "Start from what you want. Ask: what would give me that? Repeat until you hit something known." Chalk on dark green board. Square 1:1.

---

## BB-NEW-405 — Analogy: translation is to rotation as X is to Y

**Subject:** general | **Topic:** problem-solving | **Concept:** analogy; structural-similarity; transfer; translational-rotational-pairs | **Ground:** g0 | **Builds on:** [BB-NEW-402, BB-NEW-289]

**Floor 0 (Idea):**
<p>Polya's most powerful heuristic: <strong>analogy</strong>. Two problems may look different on the surface but share the same deep structure. If you've solved one, you've essentially solved the other — you just need to translate the solution. The entire force/torque course (BB 280–295) is built on one massive analogy: translational motion and rotational motion have identical mathematical structure. F ↔ τ, m ↔ I, a ↔ α, v ↔ ω, p=mv ↔ L=Iω, F=ma ↔ τ=Iα, ½mv² ↔ ½Iω². Every equation in one column has a twin in the other. Learn one; you've learned both.</p>

**Floor 1 (Concrete):**
<p>Analogy in action: you know how to solve a block sliding down a frictionless incline (BB 281). Translation: mg sin θ = ma → a = g sin θ. Now a solid sphere rolls down the same incline without slipping (BB 291). The analogous problem uses energy: mgh = ½mv² + ½Iω². But the structure is the same — "initial energy = final energy" with the rotational term as the analogue of a second translational degree of freedom. Another analogy: solving a circuit with Kirchhoff's laws (BB 213) is structurally identical to solving a system of linear equations (BB 119). The currents are the unknowns. The loop equations are the linear equations. Gaussian elimination works for both. The problems look different — wires vs equations on paper — but the solution method is identical. Finding an analogy is finding the skeleton under the skin.</p>

**Floor 2 (Definition):**
<p><strong>Analogy</strong> as a problem-solving heuristic: (1) Identify a problem you've already solved that shares the <strong>structural</strong> features of the current problem — not surface features (topic, notation), but deep features (the type of relationship, the form of the equation, the logical structure). (2) Map the elements: "this quantity in the old problem corresponds to that quantity in the new problem." (3) Transfer the solution method across the mapping. (4) Verify that the analogy holds — are there any structural differences that would break it? The translational–rotational analogy is a perfect example: every element maps, every equation maps, every conservation law maps. Partial analogies are still useful: "this circuit problem is LIKE a system of linear equations, except the unknowns are currents and the coefficients are resistances."</p>

**Floor 3 (In action):**
<p>Analogies are everywhere in our BBs. The exponential RC charging curve (BB 216): V(t) = V₀(1−e^(−t/τ)) is structurally identical to Newton's law of cooling (thermodynamics), to radioactive decay (BB 135), and to population approaching carrying capacity. Same equation, different variables — recognising the analogy means you don't need to learn four separate things. Snell's law n₁ sin θ₁ = n₂ sin θ₂ (BB 317) is structurally analogous to the conservation of the component of momentum parallel to an interface in mechanics — a photon entering a denser medium is like a particle entering a region of different potential. The exponential vs polynomial growth comparison (BB 144) is a specific case of a broader analogy: whenever you compare growth rates, you're asking "which function eventually dominates?" The method transfers to comparing any two functions — exponentials beat polynomials, polynomials beat logarithms. An analogy is a reusable solution pattern. The more analogies you build, the fewer truly new problems you face.</p>

**Image prompt:** A chalk drawing of a two-column table: LEFT column labelled "Translation" — F, m, a, v, p=mv, F=ma, KE=½mv². RIGHT column labelled "Rotation" — τ, I, α, ω, L=Iω, τ=Iα, KE=½Iω². A double-headed arrow between the columns labelled "ANALOGY — same structure, different names." Chalk on dark green board. Square 1:1.

---

## BB-NEW-406 — Draw a figure: the universal solvent of confusion

**Subject:** general | **Topic:** problem-solving | **Concept:** visualisation; diagram; FBD; graph | **Ground:** g0 | **Builds on:** [BB-NEW-400, BB-NEW-27]

**Floor 0 (Idea):**
<p>"Draw a figure" is Polya's most-repeated advice, and for good reason. The human brain processes spatial information far better than symbolic information. A diagram externalises the problem — it puts the relationships in front of your eyes instead of inside your working memory. A free body diagram (BB 27) forces you to account for every force. A ray diagram (BB 315) makes the image location visible before you calculate it. A circuit diagram (BB 205–207) reveals series and parallel relationships that are hidden in a verbal description. Drawing is not decoration; drawing is thinking.</p>

**Floor 1 (Concrete):**
<p>Problem without a figure: "A 5 m ladder of weight 200 N leans against a frictionless wall at 60° to the horizontal. The ground has friction. Find the forces." With figure: draw the wall (vertical line). Draw the ground (horizontal line). Draw the ladder at 60°. Mark the contact points. Draw weight W = 200 N downward from the ladder's centre. Draw normal force N_w from the wall, horizontal to the right (the wall is frictionless — no vertical component). Draw normal force N_g from the ground, vertically upward. Draw friction f from the ground, horizontally to the left (opposing the slip). The figure instantly reveals: there are four forces, three are unknown (N_w, N_g, f), the weight is known. The torque equation about the foot eliminates N_g and f — directly visible in the figure because those forces pass through the pivot. Without the figure, you'd be juggling four abstract symbols and likely adding a non-existent force or missing the friction direction. With the figure, the physics is visible. The equations write themselves.</p>

**Floor 2 (Definition):**
<p><strong>Drawing a figure</strong> as a heuristic: (1) Sketch the physical situation — a rough sketch is fine; it doesn't need to be to scale. (2) Mark all known quantities (lengths, angles, masses, charges). (3) Mark all unknown quantities — give them symbols. (4) Draw all forces/rays/fields/currents as arrows — direction matters enormously. (5) Choose and mark a coordinate system or a pivot point. (6) The figure should be simple enough to hold in your mind, but complete enough to contain every relevant element. <strong>Types of figures:</strong> Free body diagram (mechanics), ray diagram (optics), circuit diagram (electricity), PV diagram (thermodynamics), number line (algebra/inequalities), graph (any functional relationship). Every subject has its canonical figure type.</p>

**Floor 3 (In action):**
<p>In our BBs, figures are everywhere — explicitly described in image prompts, implicitly suggested in the text. BB 281 (inclined plane): draw the slope, resolve mg, draw friction. BB 315 (mirror ray diagram): the three principal rays find the image. BB 268 (gas law graphs): P vs V, V vs T, P vs T — the straight lines and hyperbolae tell the story. BB 120 (quadratic equation): the parabola crossing the x-axis — the roots are visible. BB 213 (Wheatstone bridge): the diamond circuit — no amount of text can replace seeing the four resistors and the galvanometer. Thompson's *Calculus Made Easy* constantly uses graphs to show what dy/dx means — the slope of the tangent at a point. His "dodge" (BB 401) is geometric: a tiny triangle under the curve, with sides dx and dy. The figure is not an afterthought. It IS the understanding. If you can't draw it, you haven't understood it.</p>

**Image prompt:** A chalk drawing of a blank piece of paper transforming — first, a rough sketch appears, then annotations, then arrows, then coordinate axes — evolving into a complete FBD. Below: "A problem without a figure is a problem half-attempted. Draw it. Label it. The equations will follow." Chalk on dark green board. Square 1:1.

---

## BB-NEW-407 — Specialization: replace variables with numbers to see the pattern

**Subject:** general | **Topic:** problem-solving | **Concept:** specialization; concrete-instance; pattern-recognition; plug-numbers | **Ground:** g0 | **Builds on:** [BB-NEW-402]

**Floor 0 (Idea):**
<p>You're staring at a general formula: a = g sin θ / (1 + I/(MR²)). It's opaque. Specialize: what if the object is a solid sphere? I = ⅖MR², so I/(MR²) = ⅖. a = g sin θ / (1+⅖) = g sin θ / (7/5) = (5/7)g sin θ. What if it's a hoop? I = MR², so I/(MR²) = 1. a = g sin θ / 2 = ½g sin θ. Now you can SEE the pattern: the solid sphere accelerates at (5/7)g sin θ, the hoop at half that — ½g sin θ. The general formula was hiding this. Specialization reveals it. Replace symbols with numbers. Test extreme cases. Polya calls this "the method of the typical instance" — if you can't understand the general case, understand a specific case first.</p>

**Floor 1 (Concrete):**
<p>The general formula for the critical angle is sin θ_c = n₂/n₁. Specialize: water→air: sin θ_c = 1.00/1.33 = 0.7519 → θ_c ≈ 49°. Glass→air: sin θ_c = 1.00/1.50 = 0.6667 → θ_c ≈ 42°. Diamond→air: sin θ_c = 1.00/2.42 = 0.4132 → θ_c ≈ 24°. Pattern: as n₁ increases, θ_c decreases. The denser the medium, the more easily light is trapped. Diamond (θ_c=24°) traps light at almost any angle — which is why it sparkles. Glass (θ_c=42°) traps light less readily. Water (θ_c=49°) traps light only at steep angles. The general formula doesn't tell you this directly. The specialized values make it obvious. Now the general formula is not just symbols — it's a family of specific numbers you've seen.</p>

**Floor 2 (Definition):**
<p><strong>Specialization</strong> as a heuristic: (1) Take the general problem or formula. (2) Replace the variables with specific, convenient numbers. (3) Work through the specific case — understand it completely. (4) Look for patterns in the specific result. (5) Generalize BACK — what does this specific case tell you about the general formula? <strong>Extreme specialization</strong>: test the formula at extreme values — zero, infinity, the boundary. If the formula makes sense at extremes, it's probably correct. If it breaks, you've found a constraint. <strong>Specialization to check</strong>: plug your answer into a specific case where you already know the answer. If the formula doesn't reproduce the known case, it's wrong.</p>

**Floor 3 (In action):**
<p>Specialization is the bridge between abstract formulas and concrete understanding. In BB 274 (Carnot efficiency): η = 1 − T_c/T_h. Specialize: T_h=600K, T_c=300K → η=50%. T_h=1200K, T_c=300K → η=75%. Pattern: raising T_h increases η — but diminishing returns; T_h=∞ gives η=100%, impossible. T_c=0K gives η=100%, also impossible. The specialization reveals the physics: you can never reach 100% efficiency. In BB 141 (solving 7ˣ=20): the general method is "take ln of both sides." Specialize: 2ˣ=8 → x=3 (obvious). 2ˣ=10 → x=ln10/ln2≈3.32. Pattern: if the answer isn't a nice integer, logs are the only systematic method. In BB 112 (equivalent fractions): 1/2 = 2/4 = 3/6 = 50/100. The pattern: multiply numerator and denominator by the same number. The general rule "a/b = ka/kb" is visible in the specific instances. When a formula feels abstract, specialize. Plug in 1, 0, or a familiar number. The concrete reveals the general.</p>

**Image prompt:** A chalk drawing of a general formula sin θ_c = n₂/n₁ in a box. Below: three specific instances — water→air (49°), glass→air (42°), diamond→air (24°). An arrow from each specific value points back to the general formula: "Specialize to understand. Generalize to apply." Chalk on dark green board. Square 1:1.

---

## BB-NEW-408 — Generalization: from a solved example to a universal method

**Subject:** general | **Topic:** problem-solving | **Concept:** generalization; pattern-extraction; method-formation | **Ground:** g0 | **Builds on:** [BB-NEW-407, BB-NEW-402]

**Floor 0 (Idea):**
<p>Specialization goes from general to specific. Generalization goes the other way: from a specific solved problem to the general method it exemplifies. You solved one inclined plane problem. Now you can solve ALL inclined plane problems — because the method (resolve mg into mg sin θ and mg cos θ, write ΣF=ma along and perpendicular to the slope) is general. You solved one mirror problem with 1/f = 1/v + 1/u. Now you can solve any spherical mirror problem — because the formula and sign convention are general. Generalization is the extraction of method from instance. It's what turns practice into mastery.</p>

**Floor 1 (Concrete):**
<p>You solved: 2x + 3 = 11 → 2x = 8 → x = 4. Generalize: any linear equation ax + b = c solves as x = (c−b)/a. You solved: x² + 5x + 6 = 0 by factoring → (x+2)(x+3)=0 → x=−2 or x=−3. Generalize: any quadratic x² + bx + c = 0 can be factored if you find two numbers that multiply to c and add to b. If factoring fails, the quadratic formula x = [−b ± √(b²−4ac)]/2a always works. The specific solved problem gave you the general method. In physics: you solved a block being pushed up a ramp. Generalize: the method — draw FBD, resolve forces, write ΣF=ma — works for ANY object on ANY surface at ANY angle with ANY set of applied forces. The details change; the method doesn't. In chemistry: you balanced C₃H₈ + O₂ → CO₂ + H₂O. Generalize: start with the element appearing in fewest compounds, save O and H for last, never change subscripts. The method balances every combustion equation.</p>

**Floor 2 (Definition):**
<p><strong>Generalization</strong> as a heuristic: (1) After solving a specific problem, ask: "What did I do that would work for a different but similar problem?" (2) Identify which steps were contingent on the specific numbers and which steps were the <strong>method</strong>. (3) Express the method in terms of the general variables, not the specific values. (4) Test the generalization on a new specific case. If it works, you've extracted a reusable technique. <strong>Levels of generalization:</strong> (a) Within a topic — "this is how you solve ALL inclined plane problems." (b) Across topics — "choosing a pivot to eliminate an unknown" works for ladders, beams, cranes. (c) Across subjects — "isolate the unknown by undoing operations" works for algebra, Kirchhoff's laws, and calorimetry.</p>

**Floor 3 (In action):**
<p>Every BB in our deck is an instance of a general method waiting to be extracted. BB 119 (solving linear equations): the method is "do the same thing to both sides, undoing operations in reverse order." That method generalises to solving for any variable in any formula — v = u + at → t = (v−u)/a; PV = nRT → T = PV/(nR). BB 207 (mixed circuits): the method is "find a pure series or parallel section, reduce it, repeat." That generalises to simplifying any hierarchical structure. BB 221 (empirical formulas): the method is "% → mass → moles → ratio." That generalises to any compositional analysis. The student who solves one problem and moves on gains one fact. The student who solves one problem and generalises gains a method that solves a hundred. Thompson's *Calculus Made Easy* teaches exactly this: "After learning to differentiate x², x³, and x⁴, you can differentiate xⁿ for any n — the method is the same." Generalization is the difference between knowing and understanding.</p>

**Image prompt:** A chalk drawing of a single solved problem on the left (specific numbers, specific situation). An arrow labelled "Generalize" leads to a box on the right containing the method expressed in variables: "For ANY problem of this type: Step 1, Step 2, Step 3." Below: "One solved problem → one general method. The method is the treasure." Chalk on dark green board. Square 1:1.

---

# Part 3 — Deeper Heuristics

---

## BB-NEW-409 — Decomposition: break it until each piece is solvable

**Subject:** general | **Topic:** problem-solving | **Concept:** decomposition; divide-and-conquer; subsystems; constraints | **Ground:** g0 | **Builds on:** [BB-NEW-402, BB-NEW-282, BB-NEW-283]

**Floor 0 (Idea):**
<p>Some problems are too big to solve all at once. Decomposition says: break it into parts. Solve each part separately. Then reassemble. An Atwood machine (BB 282) is two masses — solve F=ma for each, link via tension. A mixed circuit (BB 207) is a network — find a pure series section, reduce it, then a parallel section, reduce it, repeat. A projectile's motion (BB 192) is two independent motions — horizontal (constant speed) and vertical (free fall) — solve separately, linked only by time. Decomposition is Polya's "divide and conquer." If you can't solve the whole, solve its pieces.</p>

**Floor 1 (Concrete):**
<p>Problem: "A 5 kg block on a frictionless table is connected by a string over a pulley to a 3 kg hanging mass. The pulley is a solid disc of mass 2 kg and radius 0.1 m. Find the acceleration." Decompose into THREE subsystems: (1) Block on table (translating): T₁ = 5a. (2) Hanging mass (translating): 3g − T₂ = 3a. (3) Pulley (rotating): τ = (T₂−T₁)R = Iα, with I = ½MR² and α = a/R. Now link: from (3), (T₂−T₁)R = ½(2)R² × a/R → T₂−T₁ = ½(2)a = a. From (1): T₁ = 5a. From (2): T₂ = 3g − 3a. Substitute: (3g−3a) − 5a = a → 3g − 9a = a → 3g = 10a → a = 0.3g = 2.94 m/s². The problem looked complicated — three objects, translation and rotation. Decomposition reduced it to three F=ma/τ=Iα equations and two constraints. Each piece was trivial. The whole was the sum of trivial pieces.</p>

**Floor 2 (Definition):**
<p><strong>Decomposition</strong> (divide and conquer): (1) Identify the natural subsystems — each object, each region, each phase. (2) For each subsystem, write the governing equation(s) using the relevant physics (F=ma, τ=Iα, conservation laws, Kirchhoff's laws). (3) Identify the <strong>constraints</strong> that link the subsystems — shared tension, same acceleration, shared voltage, shared time. (4) Count equations and unknowns — they must match. (5) Solve the system. Decomposition works because the laws of physics are LOCAL — what happens to one object depends primarily on forces acting ON that object, and the interactions between objects are captured by a small set of linking variables (tension, normal force, current).</p>

**Floor 3 (In action):**
<p>Decomposition is the master heuristic for multi-body systems. BB 169 (vector equations): one vector equation decomposes into 2 or 3 scalar equations. BB 213 (mesh analysis): a circuit decomposes into loops; each loop gives one KVL equation; the system solves simultaneously. BB 265 (calorimetry): a mixture problem decomposes into heat-lost and heat-gained terms; sum to zero. BB 239 (oxidation numbers): a redox reaction decomposes into oxidation and reduction half-reactions; balance electrons, recombine. In every case, the strategy is identical: find the natural pieces, solve each piece, link via constraints. The pieces are always easier than the whole. The skill is recognising where to cut. With practice, you develop an eye for the seams — the points where the system naturally separates into nearly independent subsystems. Decomposition is not just a problem-solving trick; it's the fundamental organising principle of analysis itself.</p>

**Image prompt:** A chalk drawing of a complex machine (gears, pulleys, strings) with dashed boxes drawn around each component — block, pulley, hanging mass. Inside each box: a simplified FBD or equation. Arrows between boxes labelled "T" (tension), "a" (acceleration) — the constraints. Below: "Break it. Solve each piece. Link them. The whole surrenders." Chalk on dark green board. Square 1:1.

---

## BB-NEW-410 — Auxiliary elements: introduce something that isn't there

**Subject:** general | **Topic:** problem-solving | **Concept:** auxiliary-elements; construction; clever-addition | **Ground:** g1 | **Builds on:** [BB-NEW-402, BB-NEW-285]

**Floor 0 (Idea):**
<p>Sometimes the problem as stated is missing something. The data and the unknown don't connect. Polya's solution: introduce an auxiliary element — something not mentioned in the problem, but which creates a bridge. In geometry: draw a construction line. In mechanics: choose a pivot point. In algebra: add and subtract the same quantity (completing the square). In calculus: multiply and divide by the same expression. The auxiliary element is a mental scaffolding — it doesn't change the problem, but it makes the solution visible.</p>

**Floor 1 (Concrete):**
<p>Problem: "A uniform beam of weight W and length L rests on two supports. A load P sits at distance x from the left end. Find the reaction forces." The auxiliary element: choose a pivot point. The clever choice — the left support — makes the unknown reaction R₁ produce ZERO torque about that point (r=0). This eliminates R₁ from the torque equation, leaving only R₂ to solve. The pivot is not in the problem statement. You introduce it. You choose it strategically. The problem is transformed from "two equations, two unknowns, messy" to "one equation for R₂, then one for R₁ — trivial." Another example: in BB 187 (sin²θ+cos²θ=1), the auxiliary element is the unit circle. The problem is "prove this identity." The circle — radius 1, x²+y²=1, x=cos θ, y=sin θ — makes the proof a one-line substitution. The circle isn't in the identity; you introduce it. The auxiliary element is the master key.</p>

**Floor 2 (Definition):**
<p><strong>Auxiliary elements</strong> are objects, quantities, or constructions that you introduce into a problem to create a connection between the data and the unknown. Examples: (1) <strong>Geometric</strong> — a construction line, an auxiliary circle, a normal (in optics — the normal is always auxiliary). (2) <strong>Algebraic</strong> — adding and subtracting the same term, multiplying by a clever form of 1 (e.g., conjugate/conjugate), introducing a substitution variable. (3) <strong>Physical</strong> — choosing a pivot point, defining a system boundary, introducing a reference frame. (4) <strong>Conceptual</strong> — introducing an intermediate unknown that you'll eliminate later. The auxiliary element should: (a) be permissible (not violate any condition), (b) be helpful (actually create a path to the solution), and (c) ideally eliminate complexity (make something vanish or simplify).</p>

**Floor 3 (In action):**
<p>Auxiliary elements are everywhere in our BBs. BB 168 (cross product determinant): the auxiliary element is the 3×3 determinant with î, ĵ, k̂ in the top row — not part of the original vectors, but it organises the calculation. BB 243 (Hess's Law): the auxiliary element is the enthalpy cycle — the triangle connecting reactants, products, and combustion products. The cycle isn't in the reaction; you construct it from reactions you DO know. BB 120 (completing the square): x² + bx = (x + b/2)² − (b/2)². The added-and-subtracted (b/2)² is the auxiliary element — it creates a perfect square. BB 319 (critical angle): the auxiliary element is the normal line — you introduce it to measure angles from it. In Polya's words: "Auxiliary elements are the bright idea that makes the solution work. They are the most characteristic mark of an intelligent problem-solver." The pivot point in statics. The normal in optics. The Gaussian surface in electrostatics. The substitution u = sin x in integration. Each is an auxiliary element — not given, chosen. The art is in the choosing.</p>

**Image prompt:** A chalk drawing of a disconnected bridge between two cliffs — Data on one side, Unknown on the other. A dashed line is being drawn as an arch connecting them — labelled "Auxiliary Element (the pivot, the normal, the substitution)." The bridge becomes solid where the auxiliary element touches it. Chalk on dark green board. Square 1:1.

---

## BB-NEW-411 — Variation of the problem: change it to understand it

**Subject:** general | **Topic:** problem-solving | **Concept:** variation; what-if; parameter-change; extreme-cases | **Ground:** g0 | **Builds on:** [BB-NEW-407, BB-NEW-402]

**Floor 0 (Idea):**
<p>Polya: "If you cannot solve the proposed problem, try to solve some related problem first." Variation of the problem means: change something — the data, the unknown, the condition — to create a new problem that is easier, more familiar, or more revealing. What if friction were zero? What if the angle were 90°? What if the mass were the same? What if I drop one of the conditions? The variation reveals which features of the problem are essential and which are incidental. It isolates the core difficulty.</p>

**Floor 1 (Concrete):**
<p>Problem: "A block of mass m slides down a rough incline of angle θ with coefficient of kinetic friction μₖ. Find the acceleration." Variation 1 — remove friction: μₖ = 0 → a = g sin θ. This is the frictionless case (BB 281). Variation 2 — make the surface horizontal: θ = 0° → a = −μₖg (if pushed) or 0 (if at rest). The incline case reduces to a known case. Variation 3 — make the surface vertical: θ = 90° → a = g − μₖ(0) = g (friction disappears because N=0). Free fall. The general formula a = g(sin θ − μₖ cos θ) must reproduce all three variations. Check: θ=0 → a = g(0−μₖ) = −μₖg ✓. θ=90° → a = g(1−0) = g ✓. μₖ=0 → a = g sin θ ✓. The variations verify the formula AND reveal its structure: the sin θ term is the gravitational drive; the μₖ cos θ term is the frictional brake. The two compete. At the angle of repose, sin θ = μₖ cos θ → tan θ = μₖ (BB 38). The formula encodes a competition; variation makes the competition visible.</p>

**Floor 2 (Definition):**
<p><strong>Variation of the problem</strong> as a heuristic: (1) <strong>Drop a condition</strong> — what if friction were zero? What if the pulley were massless? What if the gas were ideal? (2) <strong>Change the data</strong> — what if the angle were 90°? The mass were 1 kg? The temperature were 0 K? (3) <strong>Change the unknown</strong> — instead of finding the acceleration, what if I wanted the time? The stopping distance? (4) <strong>Extremise</strong> — take a variable to 0, ∞, or its boundary. (5) <strong>Symmetrise</strong> — what if the two masses were equal? The two resistances were equal? (6) <strong>Generalise</strong> — what if there were n masses instead of 2? The variation should produce a problem you CAN solve, whose solution illuminates the original.</p>

**Floor 3 (In action):**
<p>Variation is the laboratory of understanding. In BB 274 (Carnot engine): vary T_c. If T_c = 0 K, η = 1 — perfect efficiency, but impossible (third law). If T_c = T_h, η = 0 — no work can be extracted. The endpoints define the domain. In BB 144 (exponential vs polynomial): vary the exponent n and the base b. For n=1000, b=1.001 — the polynomial leads for a long time, but the exponential eventually wins. The variation reveals the crossing point. In BB 30 (Dot's parabola — y=x²): vary the coefficient — y=2x² is narrower; y=½x² is wider. Vary the sign — y=−x² opens downward (the trajectory of a projectile). The simple variation "change a coefficient" produces a whole family of related curves. Polya's advice: "The variation of the problem is the most fertile source of new discoveries. By varying a problem, we often obtain new, interesting, and accessible results." Every "what if?" is a path to deeper understanding.</p>

**Image prompt:** A chalk drawing of a central problem (a block on an incline) with branching arrows to variations: "No friction?", "Vertical? (θ=90°)", "Horizontal? (θ=0°)", "Push uphill?", "Add a second block?". Each variation shows its simplified equation. The original problem's equation g(sin θ − μₖ cos θ) is circled — all variations consistent. Chalk on dark green board. Square 1:1.

---

## BB-NEW-412 — Did you use all the data? The unused datum is the key

**Subject:** general | **Topic:** problem-solving | **Concept:** used-all-data; completeness-check; missing-condition | **Ground:** g0 | **Builds on:** [BB-NEW-400, BB-NEW-403]

**Floor 0 (Idea):**
<p>You've been staring at a problem for ten minutes. You have partial progress — some equations, some relationships — but you're stuck. Polya's diagnostic question: "Did you use all the data?" Look at the problem statement. Is there a number, a condition, a constraint that you haven't incorporated yet? The unused datum is almost always the key. Nature doesn't provide irrelevant information — if it's in the problem, it's there to be used. If you haven't used it, your solution is incomplete.</p>

**Floor 1 (Concrete):**
<p>Problem: "A stone is thrown from the top of a 50 m cliff with speed 20 m/s at 30° above the horizontal. Find where it lands." You've written the equations: x = (20 cos 30°)t, y = 50 + (20 sin 30°)t − ½gt². Two equations, three unknowns (x, y, t). Stuck? Ask: "Did I use all the data?" The cliff height (50 m) is used in y₀. The initial speed (20 m/s) and angle (30°) are used. g = 9.8 is used. What haven't I used? The condition: "where it lands" means y = 0 (ground level). That's the missing piece. Set y = 0, solve for t (the positive root), then x = (20 cos 30°)t. The fact that the stone LANDS — that it hits the ground — was implicit in the problem statement, and you hadn't translated it into an equation. The unused condition, once stated as y=0, completes the system.</p>

**Floor 2 (Definition):**
<p><strong>"Did you use all the data?"</strong> — Polya's diagnostic for stuckness. (1) List every number, every condition, every constraint in the problem statement. (2) Check off which ones you've incorporated into equations. (3) Any unchecked item is a candidate for the missing equation. (4) Some data may be redundant — given for context, not computation. But assume redundancy is rare; assume every datum is needed. (5) Also check: did you use the <strong>implicit</strong> data? That the object starts from rest? That the collision is elastic? That the surface is frictionless? That the image is real? That the gas is ideal? These conditions are as important as the numbers. The heuristic is also a <strong>completeness check</strong>: if you've used all the data and all the conditions, and the system is still underdetermined, re-read the problem — there's a condition you missed.</p>

**Floor 3 (In action):**
<p>This heuristic catches the most common error in problem-solving: assuming you've used everything when you haven't. In BB 282 (Atwood machine), the implicit condition is "the string doesn't stretch" → a₁ = a₂. If you haven't used that, you can't solve. In BB 287 (ladder), the implicit condition is "the wall is frictionless" → the wall force is purely horizontal. If you add a vertical component, you've introduced an extra unknown. In BB 221 (empirical formula), the implicit condition is "the percentages sum to 100%" — if you're given C, H, and O percentages, the O percentage may be determined by difference. In BB 216 (RC circuit), the initial condition V(0)=0 is used to determine the constant of integration. In Thompson's *Calculus Made Easy*, every integration problem ends with "+ C" — and every applied problem uses a boundary condition ("the curve passes through (2,5)") to find C. The missing condition is the one that turns a family of solutions into a single answer. If you haven't used it, you're not done.</p>

**Image prompt:** A chalk drawing of a detective's evidence board. Pins and strings connect clues. One clue is circled in red — "UNUSED!" — with an arrow pointing to it. Below: "Did you use all the data? The unused datum is the key. Check the implicit conditions too." Chalk on dark green board. Square 1:1.

---

# Part 4 — The Toolkit Applied

---

## BB-NEW-413 — The problem-solver's checklist: a consolidated workflow

**Subject:** general | **Topic:** problem-solving | **Concept:** checklist; workflow; method; consolidated | **Ground:** g0 | **Builds on:** [BB-NEW-400, BB-NEW-401, BB-NEW-402, BB-NEW-403]

**Floor 0 (Idea):**
<p>You now have a toolkit of a dozen heuristics. But when you face a new problem, you don't have time to try all of them. You need a workflow — a default sequence that works for most problems. Polya's four steps provide the skeleton. Thompson's anti-fear mindset provides the spirit. The specific heuristics (draw a figure, decompose, work backwards, etc.) are the tools you reach for when the default approach stalls. A pilot uses a pre-flight checklist. A surgeon uses a pre-surgery checklist. A problem-solver uses a pre-solving checklist. It routinises the obvious so your mind is free for the non-obvious.</p>

**Floor 1 (Concrete):**
<p>Problem: "A 2 μF capacitor is charged to 100 V, then disconnected from the battery and connected across a 5 kΩ resistor. How long until the voltage drops to 20 V?" Run the checklist: <strong>1. Understand:</strong> Unknown = time t. Data: C=2 μF, V₀=100 V, R=5 kΩ, V(t)=20 V. Condition: RC discharge, V(t) = V₀e^(−t/RC). <strong>2. Draw:</strong> Sketch the RC circuit — capacitor, resistor, switch. Arrows showing current direction during discharge. <strong>3. Plan:</strong> Use the discharge equation. τ = RC = (5×10³)(2×10⁻⁶) = 0.01 s. V(t)/V₀ = 20/100 = 0.2 = e^(−t/0.01). Take ln: −t/0.01 = ln(0.2) = −1.609. t = 0.0161 s = 16.1 ms. <strong>4. Execute:</strong> Compute. <strong>5. Look back:</strong> Check — after 1τ (0.01 s), V = 100e⁻¹ ≈ 36.8 V. After another 0.0061 s (total 0.0161 s), V = 100e^(−1.61) ≈ 20 V ✓. τ=RC — seconds = Ω×F = (10³)(10⁻⁶) = 10⁻³ → 0.01 s is plausible. The checklist caught everything: the discharge formula (not charging — "disconnected from battery" is the clue), the time constant, the natural log. No step was skipped. No step was improvised.</p>

**Floor 2 (Definition):**
<p><strong>The Problem-Solver's Checklist:</strong> (1) <strong>READ</strong> — Read the entire problem. Don't start solving halfway through reading. (2) <strong>IDENTIFY</strong> — Unknown? Data? Condition? (Polya Step 1). (3) <strong>DRAW</strong> — Figure, diagram, graph. Label unknowns and knowns. (4) <strong>PLAN</strong> — What physics/chemistry/maths principles apply? What equations? Have you seen this before? (Polya Step 2). (5) <strong>EXECUTE</strong> — Do the algebra, plug in numbers. Check units at each step. (Polya Step 3). (6) <strong>CHECK</strong> — Does the answer make sense? Units? Magnitude? Limiting cases? Alternative method? (Polya Step 4). <strong>If stuck:</strong> (a) Did you use all the data? (b) Can you solve a simpler version? (c) Can you work backwards? (d) Can you introduce an auxiliary element? (e) Can you decompose the problem? (f) Take a break — the subconscious continues working (Polya notes this too).</p>

**Floor 3 (In action):**
<p>The checklist is not optional — it's what separates systematic problem-solving from guesswork. In our BBs, every worked example implicitly follows this checklist. BB 287 (ladder) follows it: identify the four forces, draw the ladder, plan — choose the foot as pivot, execute the torque equation, check with ΣF=0. BB 317 (Snell's law) follows it: identify n₁, n₂, θ₁, draw the ray and the normal, plan — use n₁ sin θ₁ = n₂ sin θ₂, execute, check — does θ₂ make sense (bending toward normal in denser medium)? The checklist is not exciting. It's not clever. It's reliable. And reliability — doing the right thing every time — matters more than cleverness. Thompson's motto "What one fool can do, another can" is a checklist in spirit: the method is accessible to anyone willing to follow it. Polya's four steps are a checklist. Every master problem-solver uses one, whether they write it down or not. The difference between the expert and the novice is not that the expert skips the checklist — it's that the expert has internalised it so deeply they don't notice they're using it.</p>

**Image prompt:** A chalk drawing of a pilot's pre-flight checklist — but the items are: "1. Read. 2. Unknown? Data? 3. Draw. 4. Plan. 5. Execute. 6. Check. If stuck: All data used? Simpler version? Work backwards? Auxiliary element? Decompose?" Below: "The checklist doesn't limit you. It frees you." Chalk on dark green board. Square 1:1.

---

## BB-NEW-414 — Heuristics in physics: which tool for which problem

**Subject:** physics | **Topic:** problem-solving | **Concept:** physics-heuristics; FBD; conservation-laws; sign-conventions; limiting-cases | **Ground:** g0 | **Builds on:** [BB-NEW-413, BB-NEW-295]

**Floor 0 (Idea):**
<p>Physics problems have their own flavour of difficulty — and their own set of go-to heuristics. The free body diagram is the universal first step. Conservation laws are the universal shortcut. Sign conventions are the universal pitfall. Dimensional analysis is the universal sanity check. Limiting cases are the universal verification. These five tools solve the vast majority of physics problems you'll encounter in mechanics, electricity, thermodynamics, and optics. Physics rewards the methodical. It punishes the casual.</p>

**Floor 1 (Concrete):**
<p>Problem-solving in physics follows a hierarchy of approaches. <strong>Level 1 — Direct force/field equations:</strong> F=ma, τ=Iα, F=qvB, F=kq₁q₂/r². These are always valid but often messy. <strong>Level 2 — Conservation laws (when applicable):</strong> Energy, momentum, angular momentum, charge. These bypass forces entirely and are often far simpler. BB 291 (rolling down an incline): energy conservation (mgh = ½mv²+½Iω²) is a two-line solution. F=ma + τ=Iα is four equations. <strong>Level 3 — Symmetry and special cases:</strong> If the problem has symmetry (spherical, cylindrical, planar), exploit it. If it asks for a special case, solve the general case and then specialise. <strong>Level 4 — Numerical/graphical when analytical fails:</strong> Not all physics problems have closed-form solutions. Know when to switch to approximation or numerical methods. The skilled problem-solver moves fluidly between levels.</p>

**Floor 2 (Definition):**
<p><strong>Physics-specific heuristics:</strong> (1) <strong>Free body diagram</strong> — always. Even if you think you don't need one. (2) <strong>Choose your system boundaries</strong> — what's "the system" for conservation laws? Include everything that exchanges energy/momentum with the part you care about. (3) <strong>Choose your pivot/axis/origin wisely</strong> — eliminate unknowns. (4) <strong>Check dimensions</strong> — if the units don't match, the equation is wrong. (5) <strong>Test limiting cases</strong> — zero, infinity, equality. Does the formula reduce to a known result? (6) <strong>Sign conventions</strong> — define them explicitly at the start. Never change mid-problem. (7) <strong>Use conservation laws first</strong> — if energy/momentum/charge is conserved, try that before force equations. (8) <strong>Exploit approximations</strong> — sin θ ≈ θ (small angles), ideal gas, frictionless, massless — when they're justified.</p>

**Floor 3 (In action):**
<p>Every physics BB in our deck embeds these heuristics. BB 281 (inclined plane): FBD first, choose axes along and perpendicular to slope, resolve EVERY force, write ΣF=ma. BB 274 (Carnot engine): the efficiency formula η = 1 − T_c/T_h is independent of the working substance — a symmetry/conservation result from the second law. BB 287 (ladder): choose the pivot at the foot — the auxiliary element heuristic. BB 269 (PV=nRT): dimensional check — PV has units (N/m²)(m³) = N·m = J; nRT has units (mol)(J/mol·K)(K) = J ✓. BB 317 (Snell's law): limiting case — at normal incidence (θ₁=0°), Snell gives θ₂=0° — no bending, as expected. The heuristics are not separate from the physics; they ARE the physics — the meta-knowledge of how to deploy the laws. A student who knows F=ma but not how to draw an FBD and choose a coordinate system cannot solve an inclined plane problem. The content and the heuristics are inseparable.</p>

**Image prompt:** A chalk drawing of a physicist's tool belt with labelled pockets: "FBD," "Conservation Laws," "Dimensional Analysis," "Limiting Cases," "Sign Conventions," "Symmetry," "Approximations." Below: "Physics rewards the methodical. Draw the FBD. Check the units. Test the extreme." Chalk on dark green board. Square 1:1.

---

## BB-NEW-415 — Heuristics in maths: algebra, calculus, and the art of substitution

**Subject:** maths | **Topic:** problem-solving | **Concept:** maths-heuristics; substitution; factoring; pattern-recognition; identity-use | **Ground:** g0 | **Builds on:** [BB-NEW-413, BB-NEW-401]

**Floor 0 (Idea):**
<p>Maths problems have their own characteristic difficulties and their own heuristics. Algebra: the art of substitution and manipulation. Calculus: differentiation and integration as inverse operations, plus a library of standard forms. Trigonometry: identities as transformation tools — sin²+cos²=1 is not just a fact, it's a weapon. The mathematical heuristics are less about physics and more about form: recognising patterns, choosing the right identity, making the clever substitution that collapses the problem.</p>

**Floor 1 (Concrete):**
<p>Solve ∫ sin³x cos x dx. Heuristic: <strong>substitution</strong>. Let u = sin x. Then du = cos x dx. The integral becomes ∫ u³ du = u⁴/4 + C = sin⁴x/4 + C. The substitution didn't change the problem — it revealed its structure. Solve x⁴ − 5x² + 4 = 0. Heuristic: <strong>let y = x²</strong>. Then y² − 5y + 4 = 0 → (y−1)(y−4) = 0 → y=1 or y=4 → x=±1 or x=±2. The substitution turned a quartic into a quadratic. Solve 2cos²x − cos x − 1 = 0. Substitution: let u = cos x. 2u² − u − 1 = 0 → (2u+1)(u−1)=0 → u = −½ or u = 1 → cos x = −½ (x=120°, 240°) or cos x = 1 (x=0°, 360°). The same substitution heuristic works across algebra, trig, and calculus. The surface changes; the deep structure is "replace a complicated expression with a single variable."</p>

**Floor 2 (Definition):**
<p><strong>Maths-specific heuristics:</strong> (1) <strong>Substitution</strong> — let u = (the complicated part). The most powerful single technique in algebra, calculus, and trig. (2) <strong>Pattern recognition</strong> — does this look like a²−b²? A quadratic in disguise? A standard integral? (3) <strong>Identities as tools</strong> — sin²+cos²=1, (a+b)², ln(ab)=ln a+ln b, log laws, index laws. These transform expressions into recognisable forms. (4) <strong>Factorisation</strong> — if an expression equals zero and you can factor it, each factor gives a solution. (5) <strong>Working from both ends</strong> — simplify the left side, simplify the right side, meet in the middle. (6) <strong>Checking by differentiation</strong> (for integration) and <strong>checking by substitution</strong> (for solved equations). (7) <strong>Graphical reasoning</strong> — is the answer plausible? Does the function have the right number of roots? Is the integral positive? (8) <strong>Symmetry</strong> — even/odd functions, periodic functions, complementary angles.</p>

**Floor 3 (In action):**
<p>Every maths BB in our deck uses these heuristics. BB 120 (quadratics): substitution u = x² in disguised quadratics, factorisation, the quadratic formula as the fallback. BB 189 (compound angles): the identity sin(A+B) = sin A cos B + cos A sin B is a TRANSFORMATION tool — it turns sin 75° into sin(45°+30°) = known values. BB 141 (solving exponentials): the substitution is implicit — taking ln of both sides transforms 7ˣ=20 into x·ln7=ln20. BB 122 (index laws): the laws ARE transformation tools — x^(3/2) = (√x)³ = √(x³). Thompson's *Calculus Made Easy* is basically a book of substitution heuristics: integration by substitution, differentiation by the chain rule (which IS substitution — let u = the inner function), and recognising standard forms. The mathematical heuristics are not tricks to memorise — they are habits of mind. When you see a complicated expression, you automatically ask: "Can I substitute? Can I factor? Is there an identity that simplifies this? Have I seen this pattern before?" The more maths you do, the more these questions become automatic — and the faster you recognise which answer applies.</p>

**Image prompt:** A chalk drawing of a tangled algebraic expression on the left. A hand draws a circle around a sub-expression and writes "Let u = this." The expression transforms into a clean, simple form that is easily solved. Below: "Substitution. Factorisation. Identities. Pattern recognition. The mathematical toolkit." Chalk on dark green board. Square 1:1.

---

## BB-NEW-416 — The growth mindset: Polya and Thompson on learning

**Subject:** general | **Topic:** problem-solving | **Concept:** growth-mindset; learning-from-errors; deliberate-practice; Thompson-motto | **Ground:** g0 | **Builds on:** [BB-NEW-413]

**Floor 0 (Idea):**
<p>Polya and Thompson share a deep conviction: problem-solving is a skill, not a talent. It is learned through practice, not bestowed by genetics. Thompson: "What one fool can do, another can." Polya: "Solving problems is a practical art, like swimming or playing the piano. You learn it by imitation and practice." Every error is feedback. Every stuck moment is an opportunity to learn a new heuristic. The growth mindset — the belief that ability develops through effort — is the meta-heuristic behind all heuristics. If you believe you can get better, you will. If you believe you can't, you won't.</p>

**Floor 1 (Concrete):**
<p>Thompson's book is an extended argument against the mystification of calculus. He opens by mocking textbooks that begin with formal definitions of limits, making "the easy difficult." His approach: start with the simplest case (differentiate x² by the method of increments), build confidence, then generalise. The reader who successfully differentiates x² is more willing to attempt x³. The reader who successfully integrates x² is more willing to attempt a substitution. Thompson understood that mathematical confidence is built in small, successful steps — not in grand theoretical leaps. Polya understood the same: "If you cannot solve the proposed problem, try to solve some related problem first. Do not give up. There are problems, and there is the problem. The problem you are working on may be solved, but new problems will arise. The important thing is to learn the method."</p>

**Floor 2 (Definition):**
<p><strong>Principles of the problem-solving growth mindset:</strong> (1) <strong>Difficulty is information</strong> — being stuck tells you which skill to develop. (2) <strong>Errors are data</strong> — every mistake reveals a gap in understanding; fix the gap, don't hide the mistake. (3) <strong>Progressive challenge</strong> — start with problems you CAN solve; increase difficulty gradually. (4) <strong>Imitation before innovation</strong> — study worked examples. Reproduce them. THEN vary them. (5) <strong>Deliberate practice</strong> — focus on your weak points. If you always solve the same kind of problem, you're not improving. (6) <strong>The method matters more than the answer</strong> — a wrong answer with a sound method is closer to success than a right answer obtained by luck. (7) <strong>Teaching reinforces learning</strong> — explain your solution to someone else. If you can't explain it clearly, you haven't fully understood it.</p>

**Floor 3 (In action):**
<p>Every BB in this course — and in the entire Strata/Qubix deck — is an invitation to practice. The references to other BBs are deliberate: they create a network of problems at graduated difficulty. BB 281 (inclined plane — basic) builds to BB 282 (connected bodies — intermediate) builds to BB 295 (combined translation and rotation — advanced). The progression is designed. The problems are chosen so that each new BB uses tools from earlier BBs in a slightly more complex configuration. This is deliberate practice, Polya-style: progressively harder variations on a theme. Thompson would approve: start simple (x²), move to the power rule (xⁿ), then the chain rule (compositions), then applications (maxima and minima). The method is always the same — increments, negation of higher-order terms — but the applications grow in power. Both authors knew that the secret to learning is not intelligence but persistence. The student who works through every example, checks every answer, and asks "why?" at every step will master the material. The student who skims and memorises formulas will not. The content is the same. The approach is everything.</p>

**Image prompt:** A chalk drawing of a staircase — each step labelled with increasingly complex problems: "x²," "xⁿ," "chain rule," "maxima/minima," "differential equations." A figure climbing the stairs, each step a small success. Above: Thompson — "What one fool can do, another can." Polya — "Solving problems is a practical art." Chalk on dark green board. Square 1:1.

---

## Summary

### Part 1 — The Meta-Method (4 BBs)
| # | Title | Source |
|---|-------|--------|
| 400 | Understand the problem | Polya Step 1 |
| 401 | The calculus mindset — dx is a tiny bit of x | Thompson |
| 402 | Devise a plan | Polya Step 2 |
| 403 | Carry out AND look back | Polya Steps 3–4 |

### Part 2 — Core Heuristics (5 BBs)
| # | Title | Key move |
|---|-------|---------|
| 404 | Working backwards | Start from the unknown; ask "what would give me this?" |
| 405 | Analogy | Translation ↔ Rotation; same structure, different names |
| 406 | Draw a figure | The universal solvent — FBD, ray diagram, circuit, graph |
| 407 | Specialization | Replace variables with numbers to see the pattern |
| 408 | Generalization | Extract the method from a solved example |

### Part 3 — Deeper Heuristics (4 BBs)
| # | Title | Key move |
|---|-------|---------|
| 409 | Decomposition | Break into subsystems; solve each; link via constraints |
| 410 | Auxiliary elements | Introduce the pivot, the normal, the substitution |
| 411 | Variation of the problem | Change a condition; what if friction were zero? |
| 412 | Did you use all the data? | The unused datum is the missing equation |

### Part 4 — The Toolkit Applied (4 BBs)
| # | Title | Scope |
|---|-------|-------|
| 413 | The problem-solver's checklist | Consolidated workflow — READ → DRAW → PLAN → EXECUTE → CHECK |
| 414 | Heuristics in physics | FBD, conservation laws, dimensional analysis, limiting cases |
| 415 | Heuristics in maths | Substitution, factoring, identities, pattern recognition |
| 416 | The growth mindset | Thompson + Polya on learning — difficulty is information |

**16 BBs.** Each BB cross-references specific existing BBs (281, 287, 291, 314, 317, etc.) so the reader can immediately practice the heuristic on familiar material. This course transforms the Strata/Qubix deck from a collection of facts into a training ground for problem-solving skill.
