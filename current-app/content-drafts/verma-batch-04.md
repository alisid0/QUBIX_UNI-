# Verma Volume 1 → Qubix BBs — Batch 4 (15 BBs for review)

Below are 15 BBs drawn from **Chapters 6-9** of H.C. Verma's *Concepts of Physics, Volume 1*. These cover concepts **not already in the existing 84-BB deck**.

**Already covered (don't duplicate):** Card 04 (friction qualitative), Cards 10-11 (energy/conservation basics), Card 05 (F=ma), Card 03 (inertia), Card 07 (N3), Cards 28-29 (free fall/projectile), BB 85-94 (measurement + vectors), BB 95-104 (kinematics batch 2), BB-NEW-21 through BB-NEW-35 (batch 3: calculus/ch 4-5 forces/Newton's laws).

**What's new here:** formal friction (static/kinetic/angle of repose), circular motion (angular velocity, centripetal acceleration/force, banking), work and energy (formal work definition, work-energy theorem, KE derivation, PE, power), centre of mass, conservation of momentum, impulse.

> ⚠️ **Note:** BB-NEW-50 clashes with the lines-numbers-batch-01.md placeholder. Rename one or the other before ingesting.

---

## BB-NEW-36 — Static friction: the force that holds things still

**Subject:** physics | **Topic:** mechanics | **Concept:** static-friction; limiting-friction; coefficient-of-static-friction | **Ground:** g0 | **Builds on:** [Card 04, BB-NEW-26]

**Floor 0 (Idea):**
<p>Push gently on a heavy box and it doesn't budge. Push harder — still nothing. Push hard enough and suddenly it lurches forward. The force holding it still is static friction. It doesn't have one fixed value — it grows to match your push, up to a hard limit. Push past that limit and the box moves.</p>

**Floor 1 (Concrete):**
<p>A 10 kg block sits on a horizontal table. The maximum static friction before it slides is measured at 49 N. That means the coefficient of static friction μₛ = 49 / (10 × 9.8) = 0.50. Push with 10 N and friction pushes back with exactly 10 N — the block stays still. Push with 30 N and friction pushes back with 30 N. Push with 50 N and friction can only return 49 N — the net force is 1 N, and the block begins to slide.</p>

**Floor 2 (Definition):**
<p><strong>Static friction</strong> fₛ is the tangential contact force that prevents two surfaces from sliding relative to each other. It is a self-adjusting force: 0 ≤ fₛ ≤ fₛ_max. The maximum value is <strong>limiting friction</strong>: fₛ_max = μₛ N, where μₛ is the <strong>coefficient of static friction</strong> (dimensionless, depends only on the two surfaces) and N is the normal force. Static friction acts parallel to the contact surface, opposing the attempted relative motion.</p>

**Floor 3 (In action):**
<p>Static friction is what lets you walk — your foot pushes backward on the ground, and static friction pushes you forward. It's what keeps a car's tyres gripping the road instead of spinning. It's why a ladder leaning against a wall doesn't slide down. Without static friction, nothing would stay in place — every object on a slope would slide, every screw would loosen, and walking would be impossible. The limiting friction formula tells you the steepest slope, the tightest turn, and the hardest push before things give way.</p>

**Image prompt:** A chalk drawing of a block on a horizontal surface. A hand pushes with force F, and an equal arrow fₛ points back. Three panels: F = 10 N (fₛ = 10 N), F = 30 N (fₛ = 30 N), F = 50 N (fₛ_max = 49 N, block slides). Below: fₛ_max = μₛN. Chalk on dark green board. Square 1:1.

---

## BB-NEW-37 — Kinetic friction: when sliding takes over

**Subject:** physics | **Topic:** mechanics | **Concept:** kinetic-friction; coefficient-of-kinetic-friction; why-kinetic-is-less | **Ground:** g0 | **Builds on:** [Card 04, BB-NEW-36]

**Floor 0 (Idea):**
<p>Once a box starts sliding, the friction doesn't disappear — it just gets weaker. The force opposing the slide, kinetic friction, is usually less than the maximum static friction that was holding it still. This is why it's harder to get something moving than to keep it moving.</p>

**Floor 1 (Concrete):**
<p>The same 10 kg block from before, once sliding, experiences a kinetic friction of about 39 N (using μₖ = 0.40, which is less than μₛ = 0.50). While static friction could hold back up to 49 N, kinetic friction only pushes back with 39 N regardless of speed — it doesn't grow or shrink. Push with 50 N while it's sliding, and the net force is 50 − 39 = 11 N forward — the block accelerates. The friction is a constant drag, not a self-adjusting opponent.</p>

**Floor 2 (Definition):**
<p><strong>Kinetic friction</strong> (or sliding friction) fₖ is the tangential contact force that opposes the relative motion of two surfaces that are already sliding. Unlike static friction, it is approximately constant: fₖ = μₖ N, where μₖ is the <strong>coefficient of kinetic friction</strong>. For most material pairs, μₖ < μₛ — it takes less force to keep something sliding than to start it sliding. Kinetic friction is independent of speed (for moderate speeds) and independent of contact area.</p>

**Floor 3 (In action):**
<p>The difference between static and kinetic friction is why anti-lock braking systems (ABS) exist. When a wheel locks up and skids, the friction drops from static to kinetic — the car slides further. ABS pulses the brakes, keeping the tyre at the edge of static friction without crossing into a skid. The same principle explains why a cricket fielder drags their foot to stop a rolling ball rather than stomping on it: static friction (rolling without slipping) is stronger than kinetic (skidding).</p>

**Image prompt:** A chalk drawing of a block sliding on a surface. An arrow fₖ points opposite to velocity v. Below: a comparison — static friction region (fₛ up to μₛN, self-adjusting), kinetic friction region (fₖ = μₖN, constant). The transition shows fₛ_max > fₖ. Chalk on dark green board. Square 1:1.

---

## BB-NEW-38 — The angle of repose: when friction balances gravity

**Subject:** physics | **Topic:** mechanics | **Concept:** angle-of-repose; inclined-plane-friction; tan-theta-equals-mu | **Ground:** g0 | **Builds on:** [BB-NEW-27, BB-NEW-36]

**Floor 0 (Idea):**
<p>Tip a plank slowly upward with a block sitting on it. At first the block stays put — static friction holds it. At some critical angle, the block suddenly slides. That angle is the angle of repose, and it is determined entirely by the coefficient of static friction.</p>

**Floor 1 (Concrete):**
<p>A block rests on a plank inclined at angle θ. The component of weight pulling it down the slope is mg sin θ. Static friction pushes up the slope, with maximum value μₛ mg cos θ. The block slides when mg sin θ exceeds μₛ mg cos θ — that is, when tan θ > μₛ. For μₛ = 0.50, the critical angle is tan⁻¹(0.50) ≈ 26.6°. Tilt beyond 26.6° and the block goes.</p>

**Floor 2 (Definition):**
<p>The <strong>angle of repose</strong> θᵣ is the steepest angle of an inclined plane at which an object remains at rest without sliding. It satisfies tan θᵣ = μₛ. At this angle, the downhill component of weight exactly equals the maximum static friction. The angle of repose is independent of the object's mass — a pebble and a boulder with the same μₛ will both start sliding at the same tilt angle.</p>

**Floor 3 (In action):**
<p>The angle of repose is why sand piles form cones with a fixed slope — about 30–35° for dry sand. Pour more sand on top and it avalanches down, maintaining the same angle. In civil engineering, the angle of repose determines the steepest stable slope for road cuttings, embankments, and stockpiles of grain or gravel. A slope steeper than the angle of repose will collapse — nature enforces the friction limit relentlessly.</p>

**Image prompt:** A chalk drawing of a block on an inclined plane at angle θ. Weight mg resolved into mg sin θ (down slope) and mg cos θ (into surface). Normal N = mg cos θ. Friction fₛ points up slope. The equation tan θ = μₛ written beside. Chalk on dark green board. Square 1:1.

---

## BB-NEW-39 — Angular displacement and angular velocity

**Subject:** physics | **Topic:** mechanics | **Concept:** angular-displacement; angular-velocity; radians-in-circular-motion | **Ground:** g0 | **Builds on:** [Card 24, Card 06]

**Floor 0 (Idea):**
<p>When an object moves in a circle, its position isn't described by x and y — it's described by an angle. As it turns, the angle changes. How fast that angle changes is the angular velocity — the spinning analogue of ordinary speed.</p>

**Floor 1 (Concrete):**
<p>A fan blade completes one full rotation in 0.2 seconds. That's 2π radians in 0.2 s, so the angular velocity ω = 2π / 0.2 = 10π ≈ 31.4 rad/s. A point on the blade 0.3 m from the centre traces a circle of circumference 2π × 0.3 ≈ 1.88 m in the same 0.2 s — a linear speed of v = 1.88 / 0.2 = 9.42 m/s. And indeed v = ωr = 31.4 × 0.3 = 9.42 m/s. Angular velocity and linear speed are linked by the radius.</p>

**Floor 2 (Definition):**
<p><strong>Angular displacement</strong> Δθ is the angle swept by a radius vector in a given time interval, measured in radians. <strong>Angular velocity</strong> ω = lim(Δt→0) Δθ/Δt = dθ/dt, measured in rad/s. It is a vector (actually a pseudovector) pointing along the axis of rotation per the right-hand rule. The linear speed v of a point at distance r from the axis is v = ωr. One full revolution = 2π radians; the time for one revolution is the <strong>period</strong> T, and ω = 2π/T = 2πf, where f is the frequency.</p>

**Floor 3 (In action):**
<p>A car's speedometer and tachometer measure two different things: the speedometer reads v (linear speed of the car), the tachometer reads ω (angular speed of the engine crankshaft). The gearbox converts one to the other. In a CD player, the disc spins at a varying ω so that v = ωr stays constant at the laser pickup — faster near the centre, slower at the edge. Every rotating machine, from a hard drive to a wind turbine, is designed around the relationship v = ωr.</p>

**Image prompt:** A chalk drawing of a circle with centre O. A radius r sweeps through an angle Δθ. The arc length Δs = rΔθ labelled. An arrow for angular velocity ω points out of the page (right-hand rule). Below: ω = dθ/dt, v = ωr. Chalk on dark green board. Square 1:1.

---

## BB-NEW-40 — Centripetal acceleration: why turning is accelerating

**Subject:** physics | **Topic:** mechanics | **Concept:** centripetal-acceleration; v²/r; direction-change | **Ground:** g0 | **Builds on:** [Card 25, BB-NEW-39]

**Floor 0 (Idea):**
<p>Drive around a curve at constant speed. Your speedometer doesn't budge, but you're pushed against the door. You're accelerating — not because your speed is changing, but because your direction is. Circular motion is accelerated motion, even when the speed is perfectly steady.</p>

**Floor 1 (Concrete):**
<p>A particle moves at constant speed v around a circle of radius r. At one instant it's at the top, velocity v⃗₁ pointing right. A moment later at the right edge, velocity v⃗₂ points down. Both have the same length v, but different directions. The change Δv⃗ = v⃗₂ − v⃗₁ points toward the centre. The acceleration a = Δv/Δt also points toward the centre, and its magnitude is v²/r. For a car at 20 m/s around a 50 m radius curve, a = 400/50 = 8 m/s² — nearly 1 g of sideways push.</p>

**Floor 2 (Definition):**
<p><strong>Centripetal acceleration</strong> a_c is the acceleration of an object moving at constant speed in a circle. Its magnitude is a_c = v²/r = ω²r, and it always points toward the centre of the circle — perpendicular to the velocity. It is not a separate force; it is the acceleration required for circular motion. Any object moving in a circle, at any speed, has this acceleration. If the speed also changes, there is an additional tangential acceleration a_t = dv/dt.</p>

**Floor 3 (In action):**
<p>The centripetal acceleration of the Earth around the Sun is tiny: v ≈ 30,000 m/s, r ≈ 1.5 × 10¹¹ m, so a_c ≈ (3 × 10⁴)² / (1.5 × 10¹¹) ≈ 0.006 m/s² — barely perceptible. A washing machine spinning at 1200 rpm with a drum radius of 0.25 m: ω = 1200 × 2π/60 ≈ 126 rad/s, so a_c = (126)² × 0.25 ≈ 4,000 m/s² — about 400 g. The clothes are pressed against the drum with 400 times their own weight. That's why they dry — the water is flung out through the holes.</p>

**Image prompt:** A chalk drawing of a circle. Two velocity vectors v⃗₁ (top, pointing right) and v⃗₂ (right, pointing down). The difference Δv⃗ = v⃗₂ − v⃗₁ is drawn pointing toward the centre. Below: a_c = v²/r, direction: toward centre. Chalk on dark green board. Square 1:1.

---

## BB-NEW-41 — Centripetal force: what keeps it in the circle

**Subject:** physics | **Topic:** mechanics | **Concept:** centripetal-force; F=mv²/r; source-of-centripetal-force | **Ground:** g0 | **Builds on:** [Card 05, BB-NEW-40]

**Floor 0 (Idea):**
<p>Centripetal acceleration demands a centripetal force — a real, physical push or pull toward the centre. Without it, the object flies off in a straight line. The force can come from tension, gravity, friction, or a normal force — but something must provide mv²/r, or the circle breaks.</p>

**Floor 1 (Concrete):**
<p>Swing a stone tied to a string in a horizontal circle. The string pulls the stone inward — that tension is the centripetal force. Let go of the string and the stone flies off along a tangent, not radially outward. There is no "centrifugal force" throwing it outward — there is simply no more inward force, and Newton's first law takes over. The stone continues in a straight line as soon as the centripetal force disappears.</p>

**Floor 2 (Definition):**
<p>The <strong>centripetal force</strong> F_c is the net force toward the centre required to keep an object in circular motion: F_c = mv²/r = mω²r. It is not a new type of force — it is a role played by an existing force (tension, gravity, friction, normal). In any circular motion problem, identify the force pointing toward the centre, set it equal to mv²/r, and solve. If the net inward force is less than mv²/r, the radius increases; if greater, it decreases.</p>

**Floor 3 (In action):**
<p>Different situations, same mv²/r: a car turning on a flat road — friction is the centripetal force (μₛmg = mv²/r). The Moon orbiting Earth — gravity is the centripetal force (GMm/r² = mv²/r). A charged particle in a magnetic field — magnetic force is centripetal (qvB = mv²/r). In each case, the force law that applies is set equal to mv²/r. The formula is always the same; only the source of the inward force changes.</p>

**Image prompt:** A chalk drawing of a stone on a string swinging in a horizontal circle. Tension T points toward the centre. The stone's velocity v is tangent. Dashed line shows the stone flying off tangentially if the string breaks. Below: F_c = mv²/r, identified as tension. Chalk on dark green board. Square 1:1.

---

## BB-NEW-42 — Banking of roads: using the normal force to turn

**Subject:** physics | **Topic:** mechanics | **Concept:** banking-of-curves; banked-turn; optimum-speed | **Ground:** g1 | **Builds on:** [BB-NEW-41, BB-NEW-28]

**Floor 0 (Idea):**
<p>A flat road relies entirely on friction to turn a car. On a wet or icy day, that friction may not be enough. The solution: tilt the road, so the normal force itself provides part of the centripetal force. This is banking — and at one special speed, no friction is needed at all.</p>

**Floor 1 (Concrete):**
<p>A curve of radius 100 m is banked at 15°. At the optimum speed, the horizontal component of the normal force alone provides the centripetal force — the car could turn on glare ice. Resolving: N sin θ = mv²/r horizontally, and N cos θ = mg vertically. Dividing: tan θ = v²/(rg). So v = √(rg tan θ) = √(100 × 9.8 × tan 15°) ≈ √(100 × 9.8 × 0.268) ≈ 16.2 m/s ≈ 58 km/h. At this speed, the car needs no friction to hold the curve.</p>

**Floor 2 (Definition):**
<p>For a curve of radius r banked at angle θ, the <strong>optimum speed</strong> v₀ at which no friction is required is given by v₀ = √(rg tan θ). Below this speed, friction must act up the slope to prevent sliding down. Above it, friction must act down the slope to prevent sliding up and out. The maximum safe speed with friction is v_max = √[rg (μₛ + tan θ) / (1 − μₛ tan θ)]. Banking reduces the reliance on friction — it doesn't eliminate the need for it at all speeds.</p>

**Floor 3 (In action):**
<p>Motorway exit ramps, velodrome tracks, and railway curves are all banked. On a velodrome, the banking can exceed 40° — at racing speeds, the cyclist rides perpendicular to the track surface, not to the ground. The same physics governs an aeroplane banking into a turn: the lift force from the wings tilts, and its horizontal component provides the centripetal force. Banking is the universal trick for turning without slipping, whether the surface is road, track, or air.</p>

**Image prompt:** A chalk drawing of a car on a banked curve, viewed from behind. The road is tilted at angle θ. Normal force N is perpendicular to the road. N is resolved into N sin θ (horizontal, toward centre) and N cos θ (vertical, balancing mg). Below: tan θ = v²/(rg). Chalk on dark green board. Square 1:1.

---

## BB-NEW-43 — Work: force times displacement (and when it's zero)

**Subject:** physics | **Topic:** mechanics | **Concept:** work; force-times-displacement; zero-work-cases | **Ground:** g0 | **Builds on:** [Card 10, BB-NEW-33]

**Floor 0 (Idea):**
<p>In everyday language, holding a heavy bag still is hard work. In physics, it's zero work. Physics defines work narrowly: a force does work only when it moves something — and only the part of the force along the direction of motion counts.</p>

**Floor 1 (Concrete):**
<p>Push a box with a force of 50 N and it slides 3 m across the floor. The work done is 50 × 3 = 150 J. Now push at a 60° angle to the horizontal — only the horizontal component (50 cos 60° = 25 N) moves the box, so the work is 25 × 3 = 75 J. Now hold the box stationary above your head — the force is real (you're fighting gravity), but the displacement is zero, so the work is zero. Carry the box horizontally at constant speed — the upward force you apply is perpendicular to the motion, so again, zero work.</p>

**Floor 2 (Definition):**
<p><strong>Work</strong> W done by a constant force F⃗ on an object that undergoes displacement s⃗ is W = F⃗ · s⃗ = F s cos θ, where θ is the angle between the force and displacement vectors. Work is a scalar, measured in joules (J = N·m). Work is positive when the force helps the motion (θ < 90°), negative when it opposes it (θ > 90°), and zero when the force is perpendicular to the motion (θ = 90°) or when there is no displacement.</p>

**Floor 3 (In action):**
<p>The work definition's "cos θ" catches a subtlety: only the force component along the displacement does work. A waiter carrying a tray across a room does zero work on the tray (the upward normal force is perpendicular to the horizontal motion) — the tray's gravitational potential energy doesn't change. A friction force always does negative work because it always opposes motion (θ = 180°, cos 180° = −1). The sign of work tracks whether energy is being added to or drained from the object.</p>

**Image prompt:** A chalk drawing showing three scenarios: (1) force parallel to displacement → W = Fs, (2) force at angle θ → W = Fs cos θ with F resolved into components, (3) force perpendicular to displacement → W = 0, with a person carrying a tray horizontally. Chalk on dark green board. Square 1:1.

---

## BB-NEW-44 — The work-energy theorem

**Subject:** physics | **Topic:** mechanics | **Concept:** work-energy-theorem; net-work-equals-change-in-KE | **Ground:** g0 | **Builds on:** [BB-NEW-43, BB-NEW-32]

**Floor 0 (Idea):**
<p>Work is not just a bookkeeping number. The total work done on an object — by all forces combined — equals the change in its kinetic energy. Push on something and make it speed up: the work you did became extra energy of motion. This is the work-energy theorem, and it's one of the most direct links between force and motion.</p>

**Floor 1 (Concrete):**
<p>A 2 kg block at rest on a frictionless table is pushed by a 10 N force over 4 m. The work done: W = 10 × 4 = 40 J. The block's final speed: using F = ma, a = 10/2 = 5 m/s². With v² = 0 + 2(5)(4) = 40, so v = √40 ≈ 6.32 m/s. Its kinetic energy: ½mv² = ½ × 2 × 40 = 40 J — exactly the work done. The 40 J of work became 40 J of kinetic energy.</p>

**Floor 2 (Definition):**
<p>The <strong>work-energy theorem</strong> states that the net work done by all forces acting on a particle equals the change in its kinetic energy: W_net = ΔK = ½mv²_f − ½mv²_i. This is not a new law — it follows directly from Newton's second law integrated over a displacement. It holds for any net force, constant or variable, conservative or non-conservative. The theorem turns a force-and-distance problem into an energy-difference problem, often bypassing the need to find acceleration.</p>

**Floor 3 (In action):**
<p>The work-energy theorem is most useful when forces vary or when the path is complicated — you don't need to integrate the equations of motion. A block sliding down a curved frictionless track: the only force doing work is gravity (the normal force is always perpendicular to the motion). W_net = mgh (the work done by gravity), so ½mv² = mgh, and v = √(2gh) — the same speed as if it fell straight down. The path shape doesn't matter, only the height change. This is the seed of energy conservation.</p>

**Image prompt:** A chalk drawing of a block sliding down a curved frictionless track. The block's height drops by h. An arrow labelled mg points down. The normal force N is drawn perpendicular to the track at one point. Below: W_net = ΔK → mgh = ½mv². Chalk on dark green board. Square 1:1.

---

## BB-NEW-45 — Kinetic energy: ½mv², where the formula comes from

**Subject:** physics | **Topic:** mechanics | **Concept:** kinetic-energy; half-mv-squared; derivation | **Ground:** g0 | **Builds on:** [Card 10, BB-NEW-44]

**Floor 0 (Idea):**
<p>A moving object carries energy by virtue of its motion — kinetic energy. Knock down a pin with a bowling ball and you see it directly: the ball's motion becomes the pin's motion. The formula is ½mv². Why the half? Why the square? Both answers drop out of the work-energy theorem.</p>

**Floor 1 (Concrete):**
<p>To accelerate a 1 kg object from rest to 10 m/s, you must do work. From the SUVAT equation v² = u² + 2as, the distance covered is s = v²/(2a). The force is F = ma. Work W = F × s = ma × v²/(2a) = ½mv² = ½ × 1 × 100 = 50 J. So the work you put in — 50 J — becomes the kinetic energy the object now carries. The ½ and the v² both come from the kinematics: v² = 2as gives the v², and the 2 in the denominator gives the ½.</p>

**Floor 2 (Definition):**
<p><strong>Kinetic energy</strong> K of a particle of mass m moving at speed v is K = ½mv². It is the energy associated with the particle's motion — always non-negative, zero when v = 0. The SI unit is the joule. For a system of particles, the total kinetic energy is the sum of individual ½mv² terms — it is NOT ½MV² where M is total mass and V is the speed of the centre of mass, because the particles may also be moving relative to the centre of mass.</p>

**Floor 3 (In action):**
<p>Kinetic energy depends on the square of speed, which has a striking consequence: doubling the speed quadruples the energy. A car at 60 km/h has four times the kinetic energy of the same car at 30 km/h — which is why braking distance is roughly four times longer, not twice. A 1-gram insect at 1 m/s has 0.0005 J of kinetic energy. A 1000 kg car at 20 m/s has 200,000 J — 400 million times more. Speed is squared: small changes at the high end matter enormously.</p>

**Image prompt:** A chalk drawing showing the derivation chain: F = ma → W = Fs = ma × v²/(2a) → W = ½mv². A block starts at rest, is pushed over distance s, reaches speed v. The formula ½mv² is circled. Chalk on dark green board. Square 1:1.

---

## BB-NEW-46 — Potential energy: stored by position

**Subject:** physics | **Topic:** mechanics | **Concept:** potential-energy; gravitational-PE; conservative-force | **Ground:** g0 | **Builds on:** [Card 11, BB-NEW-44]

**Floor 0 (Idea):**
<p>Lift a book from the floor to a shelf. You do work against gravity. That work hasn't disappeared — it's stored in the book's position. Drop the book and the stored energy pours back out as kinetic energy. Energy stored by position is potential energy.</p>

**Floor 1 (Concrete):**
<p>Lift a 2 kg book from the floor to a shelf 1.5 m high. The work done against gravity is mgh = 2 × 9.8 × 1.5 = 29.4 J. That 29.4 J is now stored as gravitational potential energy. Drop the book: just before it hits the floor, its kinetic energy equals ½mv² = mgh = 29.4 J, so v = √(2 × 9.8 × 1.5) ≈ 5.4 m/s. The energy flowed from your muscles → stored position → motion, without any loss in the ideal case.</p>

**Floor 2 (Definition):**
<p><strong>Potential energy</strong> U is energy stored in a system due to the positions of its parts. It is defined only for <strong>conservative forces</strong> — forces for which the work done around any closed path is zero. For gravity near Earth's surface: U = mgh (taking h = 0 at an arbitrary reference level). For a spring obeying Hooke's law: U = ½kx² (taking x = 0 at the natural length). For Newtonian gravity: U = −GMm/r. Only <strong>changes</strong> in potential energy are physically meaningful.</p>

**Floor 3 (In action):**
<p>The choice of reference level for potential energy is arbitrary because only differences matter. In a rollercoaster problem, you can set U = 0 at the ground, at the top of the first hill, or at the centre of the Earth — the predicted speeds and motions won't change. This is because the work done by gravity depends only on height differences, not absolute heights. The same is true for any conservative force: the potential energy is a bookkeeping tool that tracks how much work the force can do as positions change.</p>

**Image prompt:** A chalk drawing of a book on a shelf (labelled U = mgh) and a book on the floor (U = 0). An arrow shows the lifting path. Below: the book falling, with energy bar showing PE converting to KE. Chalk on dark green board. Square 1:1.

---

## BB-NEW-47 — Power: the rate of doing work

**Subject:** physics | **Topic:** mechanics | **Concept:** power; work-per-time; watt | **Ground:** g0 | **Builds on:** [BB-NEW-43]

**Floor 0 (Idea):**
<p>Two engines lift the same load to the same height. Both do the same work. But one does it in 5 seconds, the other in 30. The faster engine is more powerful — not because it does more work, but because it does the same work faster. Power is the rate of doing work.</p>

**Floor 1 (Concrete):**
<p>Lift a 50 kg crate vertically at a steady 2 m/s. The force required is mg = 50 × 9.8 = 490 N. Each second, the crate rises 2 m, so the work done per second is 490 × 2 = 980 J. That's 980 W, or about 1.3 horsepower. If the same crate were lifted at 0.5 m/s, the power would be 490 × 0.5 = 245 W — a quarter of the power, even though the total work (over the same height) is identical. The more powerful motor gets it done sooner.</p>

**Floor 2 (Definition):**
<p><strong>Power</strong> P is the rate at which work is done: P = dW/dt. For a constant force F⃗ acting on an object moving with velocity v⃗, the instantaneous power is P = F⃗ · v⃗ = F v cos θ. The SI unit is the <strong>watt</strong> (W = J/s). Common multiples: kilowatt (10³ W), megawatt (10⁶ W), gigawatt (10⁹ W). An older unit, the horsepower (hp), equals approximately 746 W. Power should not be confused with force or energy — it's how fast energy is transferred.</p>

**Floor 3 (In action):**
<p>A car's engine power determines its top speed, not its acceleration. At top speed, the forward force from the engine balances air resistance. Since P = Fv, and air resistance grows roughly as v², the power required grows as v³. To double a car's top speed takes roughly eight times the engine power. A 100 W light bulb converts 100 J of electrical energy into light and heat every second. The Sun outputs about 3.8 × 10²⁶ W — the ultimate power rating in our neighbourhood.</p>

**Image prompt:** A chalk drawing showing two cranes lifting identical crates. One lifts fast (label: P = 980 W), one lifts slow (label: P = 245 W). Both lift through same height h. Below: P = W/t = Fv. Chalk on dark green board. Square 1:1.

---

## BB-NEW-48 — Centre of mass: the balance point

**Subject:** physics | **Topic:** mechanics | **Concept:** centre-of-mass; COM; weighted-average | **Ground:** g0 | **Builds on:** [Card 05, BB-NEW-32]

**Floor 0 (Idea):**
<p>A cricket bat has one special point — balance it there on one finger and it doesn't tip. That point is the centre of mass. It's the average position of all the mass in the object, and it moves as if all the mass and all the external forces were concentrated there.</p>

**Floor 1 (Concrete):**
<p>Two masses, 2 kg at x = 0 and 3 kg at x = 5 m. The centre of mass is the weighted average: x_com = (2 × 0 + 3 × 5) / (2 + 3) = 15/5 = 3 m. The COM is closer to the heavier mass — 3 m from the 2 kg mass, 2 m from the 3 kg mass. If you placed a pivot at x = 3 m, the system would balance. In two dimensions, you find x_com and y_com separately using the same weighted-average formula.</p>

**Floor 2 (Definition):**
<p>The <strong>centre of mass</strong> (COM) of a system of particles is the point r⃗_com = (Σ mᵢ r⃗ᵢ) / M, where M = Σ mᵢ is the total mass. For a continuous body, the sum becomes an integral: r⃗_com = (1/M) ∫ r⃗ dm. The COM moves as a single particle of mass M under the net external force: F⃗_ext = M a⃗_com. Internal forces between particles do not affect the motion of the COM — only external forces do.</p>

**Floor 3 (In action):**
<p>The COM is why you can treat a complex object as a point particle for many problems. A spinning hammer thrown through the air traces a perfect parabola at its COM, even though the handle and head whirl around it. A high-jumper's COM actually passes under the bar while their body arches over it — the Fosbury Flop. A rocket in space can rotate around its COM but its COM continues in a straight line at constant speed unless an external force acts — internal engine burns don't move the COM of the rocket-plus-exhaust system.</p>

**Image prompt:** A chalk drawing showing two masses on a line: 2 kg at x = 0, 3 kg at x = 5. The COM is marked at x = 3. Below: a hammer in flight — the COM traces a smooth parabola while the hammer tumbles around it. Chalk on dark green board. Square 1:1.

---

## BB-NEW-49 — Conservation of linear momentum

**Subject:** physics | **Topic:** mechanics | **Concept:** conservation-of-momentum; isolated-system; collision | **Ground:** g0 | **Builds on:** [BB-NEW-32, BB-NEW-34]

**Floor 0 (Idea):**
<p>When two objects interact — collide, push apart, or pull together — with no outside forces involved, the total momentum before equals the total momentum after. This is conservation of momentum, and it is one of the most unbreakable laws in physics. It holds in every collision, every explosion, every interaction, no matter how messy.</p>

**Floor 1 (Concrete):**
<p>A 5 kg cart moves at 3 m/s and collides with a stationary 2 kg cart. They stick together (perfectly inelastic collision). Momentum before: 5 × 3 + 2 × 0 = 15 kg·m/s. Momentum after: (5 + 2) × v = 7v. Equating: 7v = 15, so v ≈ 2.14 m/s. The speed dropped — the combined mass is larger. Kinetic energy before: ½ × 5 × 9 = 22.5 J. After: ½ × 7 × (2.14)² ≈ 16.1 J. Energy is lost (to heat, sound, deformation), but momentum is exactly conserved.</p>

**Floor 2 (Definition):**
<p><strong>Conservation of linear momentum:</strong> If the net external force on a system is zero, the total linear momentum of the system remains constant. Σ p⃗_i (initial) = Σ p⃗_f (final). This follows directly from Newton's second and third laws: internal forces come in equal-and-opposite pairs, so they cannot change the total momentum — only external forces can. The law is a vector conservation law — it holds independently for each component (x, y, z).</p>

**Floor 3 (In action):**
<p>Momentum conservation powers everything from rocket propulsion to billiards. A gun recoils because the bullet and gun start with zero total momentum — the bullet goes forward, the gun goes backward with equal and opposite momentum. A rocket in deep space accelerates by ejecting exhaust backward — the forward momentum gained equals the backward momentum of the exhaust. In particle physics, conservation of momentum is how we detect invisible particles like neutrinos: if the visible particles' momenta don't add up, something unseen carried away the balance.</p>

**Image prompt:** A chalk drawing of two carts: before collision (one moving, one stationary), after collision (both moving together). Momentum vectors labelled: p = 5×3 = 15 before, p = 7×2.14 = 15 after. Below: Σp = constant when ΣF_ext = 0. Chalk on dark green board. Square 1:1.

---

## BB-NEW-50 — Impulse and the impulse-momentum theorem

**Subject:** physics | **Topic:** mechanics | **Concept:** impulse; impulse-momentum-theorem; force-times-time | **Ground:** g0 | **Builds on:** [BB-NEW-32, BB-NEW-49]

**Floor 0 (Idea):**
<p>A large force acting for a short time can produce the same change in momentum as a small force acting for a long time. The product of force and the time it acts — the impulse — is what changes momentum. A kick and a gentle shove can have the same effect if their impulses match.</p>

**Floor 1 (Concrete):**
<p>A 0.15 kg cricket ball arrives at 30 m/s and is struck back at 40 m/s in the opposite direction. Change in momentum: final momentum = 0.15 × (−40) = −6 kg·m/s (taking the return direction as negative). Initial momentum = 0.15 × 30 = 4.5 kg·m/s. Δp = −6 − 4.5 = −10.5 kg·m/s. If the bat-ball contact lasts 0.01 s, the average force is F = Δp/Δt = 10.5 / 0.01 = 1050 N — over 700 times the ball's weight. A shorter contact time would mean an even larger force for the same impulse.</p>

**Floor 2 (Definition):**
<p><strong>Impulse</strong> J⃗ is the product of a force and the time interval over which it acts: J⃗ = ∫ F⃗ dt. For a constant force, J⃗ = F⃗ Δt. The <strong>impulse-momentum theorem</strong> states that the impulse of the net force equals the change in momentum: J⃗ = Δp⃗ = mv⃗_f − mv⃗_i. This is just Newton's second law integrated over time. Impulse has the same units as momentum: kg·m/s, or equivalently N·s.</p>

**Floor 3 (In action):**
<p>The impulse-momentum theorem explains why airbags, crash mats, and catching a ball with "soft hands" work. A given Δp is fixed — the speed change from moving to stopped cannot be altered. But by increasing Δt (the time over which the stop occurs), the average force F = Δp/Δt is reduced. An airbag stretches a 0.01 s dashboard collision into a 0.1 s cushion — reducing the force on the passenger by a factor of 10. This is the same physics as Card 08 but now in the formal language of impulse and momentum change.</p>

**Image prompt:** A chalk drawing of a cricket bat striking a ball. The ball approaches with momentum p_i, and leaves with momentum p_f in the opposite direction. The force-time graph shows a sharp peak lasting Δt, with area = J = Δp. Below: J = FΔt = Δp. Chalk on dark green board. Square 1:1.

---

## Summary

| Placeholder | Title | Subject | Topic | Ground | Builds on |
|---|---|---|---|---|---|
| BB-NEW-36 | Static friction | physics | mechanics | g0 | Card 04, BB-NEW-26 |
| BB-NEW-37 | Kinetic friction | physics | mechanics | g0 | Card 04, BB-NEW-36 |
| BB-NEW-38 | Angle of repose | physics | mechanics | g0 | BB-NEW-27, BB-NEW-36 |
| BB-NEW-39 | Angular displacement & velocity | physics | mechanics | g0 | Card 24, Card 06 |
| BB-NEW-40 | Centripetal acceleration | physics | mechanics | g0 | Card 25, BB-NEW-39 |
| BB-NEW-41 | Centripetal force | physics | mechanics | g0 | Card 05, BB-NEW-40 |
| BB-NEW-42 | Banking of roads | physics | mechanics | g1 | BB-NEW-41, BB-NEW-28 |
| BB-NEW-43 | Work: force × displacement | physics | mechanics | g0 | Card 10, BB-NEW-33 |
| BB-NEW-44 | The work-energy theorem | physics | mechanics | g0 | BB-NEW-43, BB-NEW-32 |
| BB-NEW-45 | Kinetic energy: ½mv² | physics | mechanics | g0 | Card 10, BB-NEW-44 |
| BB-NEW-46 | Potential energy | physics | mechanics | g0 | Card 11, BB-NEW-44 |
| BB-NEW-47 | Power | physics | mechanics | g0 | BB-NEW-43 |
| BB-NEW-48 | Centre of mass | physics | mechanics | g0 | Card 05, BB-NEW-32 |
| BB-NEW-49 | Conservation of linear momentum | physics | mechanics | g0 | BB-NEW-32, BB-NEW-34 |
| BB-NEW-50 | Impulse & impulse-momentum theorem | physics | mechanics | g0 | BB-NEW-32, BB-NEW-49 |

---

## Grand total across all Verma batches

| Batch | BBs | Cards |
|-------|-----|-------|
| Batch 01 (BB-NEW-01–10) | 10 | BB 85–94 |
| Batch 02 (BB-NEW-11–20) | 10 | BB 95–104 |
| Batch 03 (BB-NEW-21–35) | 15 | BB 105–119 |
| Batch 04 (BB-NEW-36–50) | 15 | BB 120–134 |
| **Total** | **50** | **BB 85–134** |

> ⚠️ **Placeholder collision:** BB-NEW-50 is used both here and in `lines-numbers-batch-01.md`. Rename the placeholder in one file before ingesting both. Suggested: change the lines-numbers batch to use BB-NEW-53/54/55, or rename this BB to BB-NEW-51 and shift the lines-numbers ones to BB-NEW-55/56/57.
