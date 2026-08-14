# Verma Volume 1 → Qubix BBs — Batch 3 (15 BBs for review)

Below are 15 BBs drawn from **Chapters 2-5** of H.C. Verma's *Concepts of Physics, Volume 1*. These cover concepts **not already in the existing 84-BB deck**.

**Already covered (don't duplicate):** Card 03 (inertia/N1), Card 04 (friction), Card 05 (F=ma), Card 06 (speed/velocity/acceleration), Card 07 (N3), Card 08-09 (impulse/crumple zones), Cards 25-29 (kinematics in 1D/2D/projectile/grid), BB 76 (velocity/acceleration as rates), BB 85-94 (measurement + vectors batch 1), BB 95-104 (kinematics batch 2).

**What's new here:** maxima/minima, integration, measurement errors, relative velocity, projectile formal treatment, force types, free body diagrams, weight/normal, tension, Hooke's law, Newton's laws in formal/momentum form, equilibrium.

---

## BB-NEW-21 — Maxima and minima: the peaks and valleys of a function

**Subject:** maths | **Topic:** calculus | **Concept:** maxima; minima; derivative-zero; slope-test | **Ground:** g0 | **Builds on:** [Card 14, BB-NEW-19]

**Floor 0 (Idea):**
<p>A thrown ball climbs, pauses for an invisible instant at the top, then falls. At the very peak, the ball's vertical speed is exactly zero — it is neither rising nor falling. The derivative, which measures the rate of change, hits zero at that moment. This is how calculus finds the highest and lowest points of anything.</p>

**Floor 1 (Concrete):**
<p>The height of a ball thrown upward is y = 20t − 5t² (using g = 10 m/s²). The derivative dy/dt = 20 − 10t. Set it to zero: 20 − 10t = 0, so t = 2 seconds. That's when the ball peaks. Plug t = 2 back into the original: y = 20(2) − 5(4) = 40 − 20 = 20 m. The derivative found the peak without ever graphing the curve.</p>

**Floor 2 (Definition):**
<p>At a local <strong>maximum</strong> or <strong>minimum</strong> of a differentiable function f(x), the derivative f'(x) = 0 — the tangent is horizontal. To confirm which: if f'(x) changes from positive to negative across the point, it's a maximum; from negative to positive, it's a minimum. If f'(x) does not change sign, it's a point of inflection. The second derivative f''(x) provides a shorter test: f'' < 0 confirms a maximum, f'' > 0 confirms a minimum.</p>

**Floor 3 (In action):**
<p>Maxima and minima are everywhere in physics. The peak of a projectile is a maximum of y(t). The equilibrium position of a spring is a minimum of potential energy. The most efficient angle for a ramp trades height gained against distance travelled — another optimisation. In each case, you write a function for the quantity you care about, differentiate, set the derivative to zero, and solve. The calculus does the searching for you.</p>

**Image prompt:** A chalk graph of a parabola y = 20t − 5t² peaking at t = 2, y = 20. The tangent at the peak is horizontal and labelled "dy/dt = 0". Arrows on either side show the slope going from positive to negative. Chalk on dark green board. Square 1:1.

---

## BB-NEW-22 — Integration: finding the area under a changing curve

**Subject:** maths | **Topic:** calculus | **Concept:** integration; area-under-curve; antiderivative | **Ground:** g0 | **Builds on:** [Card 14, BB-NEW-19]

**Floor 0 (Idea):**
<p>The derivative breaks a whole into instants — the speed right now. Integration does the reverse: it adds up all the instants to recover the whole. Given how fast something was moving at every moment, integration tells you how far it went.</p>

**Floor 1 (Concrete):**
<p>The area under a speed–time graph is the distance travelled. If speed is constant at 5 m/s for 10 seconds, the graph is a flat rectangle: area = 5 × 10 = 50 m, trivially. But if speed grows as v = 2t, the graph is a sloping line — a triangle. The area under it from t = 0 to t = 4 is ½ × base × height = ½ × 4 × 8 = 16 m. Integration generalises this to any shape: it finds the area under any curve by summing an infinite number of vanishingly thin rectangular strips.</p>

**Floor 2 (Definition):**
<p>The <strong>definite integral</strong> ∫ₐᵇ f(x) dx is the signed area between the curve y = f(x) and the x-axis from x = a to x = b. It is the limit of a sum of n rectangles of width Δx as n → ∞ and Δx → 0. The <strong>Fundamental Theorem of Calculus</strong> links integration to differentiation: if F'(x) = f(x), then ∫ₐᵇ f(x) dx = F(b) − F(a). Integration is the inverse of differentiation — an <strong>antiderivative</strong>.</p>

**Floor 3 (In action):**
<p>In physics, integration recovers position from velocity: x = ∫ v dt. It recovers velocity from acceleration: v = ∫ a dt. It finds work done by a varying force: W = ∫ F dx. It finds the mass of a rod with varying density. It finds the charge stored on a capacitor. Every time a quantity accumulates at a changing rate, integration sums the pieces. The derivative and the integral are a matched pair — one splits, the other reunites.</p>

**Image prompt:** A chalk graph of v = 2t (a straight sloping line). The area under it from t = 0 to t = 4 is shaded with thin vertical strips, with one strip labelled "v dt". The total area 16 m is labelled. Chalk on dark green board. Square 1:1.

---

## BB-NEW-23 — Errors in measurement: no instrument tells the exact truth

**Subject:** physics | **Topic:** measurement | **Concept:** measurement-error; systematic-error; random-error; accuracy-vs-precision | **Ground:** g0 | **Builds on:** [BB 85, BB-NEW-20]

**Floor 0 (Idea):**
<p>No measurement is perfect. Every instrument has a limit, every reading carries some uncertainty. The question is not whether there is error — there always is. The question is how much, and of what kind.</p>

**Floor 1 (Concrete):**
<p>Weigh the same object five times on a sensitive balance: 12.34 g, 12.36 g, 12.33 g, 12.35 g, 12.37 g. The readings cluster around 12.35 g but never settle on a single number. The spread is random — maybe from air currents, slight vibrations, or the balance's internal noise. If the balance itself is consistently reading 0.05 g too high because it was poorly zeroed, that's a different kind of error — systematic, not random — and it won't show up in the spread.</p>

**Floor 2 (Definition):**
<p><strong>Random errors</strong> scatter readings around the true value — they are equally likely to overestimate or underestimate. They can be reduced by averaging many trials. <strong>Systematic errors</strong> shift all readings in one direction — a faulty calibration, a zero error, a consistent bias. Averaging does not reduce them. <strong>Accuracy</strong> is closeness to the true value. <strong>Precision</strong> is how tightly repeated readings cluster, regardless of whether they are accurate. A measurement can be precise but inaccurate (tight cluster, wrong target).</p>

**Floor 3 (In action):**
<p>The mean of repeated readings is the best estimate of the true value. The <strong>standard deviation</strong> σ = √[Σ(xᵢ − x̄)² / (n − 1)] measures the spread — a small σ means tight readings. Reported results should include the uncertainty: "12.35 ± 0.02 g." The ± notation tells the reader how much to trust the last digit. In labs, error bars on graphs do the same visual work — they show the range within which the true value likely lies.</p>

**Image prompt:** A chalk drawing of a target with four clusters of bullet holes. One cluster is tight and centred ("accurate and precise"), one tight but off-centre ("precise but not accurate"), one scattered around centre ("accurate but not precise"), one scattered off-centre ("neither"). Chalk on dark green board. Square 1:1.

---

## BB-NEW-24 — Relative velocity: motion depends on who is watching

**Subject:** physics | **Topic:** kinematics | **Concept:** relative-velocity; change-of-frame; velocity-addition | **Ground:** g0 | **Builds on:** [BB-NEW-11, BB-NEW-14]

**Floor 0 (Idea):**
<p>Two cars on a highway, both doing 80 km/h. To someone on the roadside, both are moving fast. But to the driver of one car, the other car is standing still — they share the same speed and direction. Velocity is always relative to the observer. Change the observer and the velocity changes too.</p>

**Floor 1 (Concrete):**
<p>A train moves east at 10 m/s relative to the ground. A passenger walks toward the front at 2 m/s relative to the train. To someone on the platform, the passenger moves at 10 + 2 = 12 m/s east. Now the passenger turns and walks toward the rear at 2 m/s. To the platform observer, the passenger moves at 10 − 2 = 8 m/s east — still going forward, just slower. The formula: v(person relative to ground) = v(person relative to train) + v(train relative to ground).</p>

**Floor 2 (Definition):**
<p>If object A has velocity v⃗_A relative to the ground, and object B has velocity v⃗_B relative to the ground, then the velocity of A relative to B is v⃗_{A/B} = v⃗_A − v⃗_B. Swapping: v⃗_{B/A} = −v⃗_{A/B}. In one dimension, this reduces to subtracting speeds with appropriate signs. In two dimensions, it is vector subtraction: draw both velocity vectors from a common origin, and the vector from the tip of B to the tip of A is v⃗_{A/B}.</p>

**Floor 3 (In action):**
<p>Raindrops fall vertically at 5 m/s. You're in a car moving at 20 m/s. To you, the rain appears to come at you diagonally — the vector sum of the rain's downward 5 and your forward 20 (in the rain's frame, your car is moving). The apparent direction is tan⁻¹(20/5) ≈ 76° from the vertical. Relative velocity explains why umbrellas tilt forward in a moving car, why a boat drifts downstream when crossing a river, and why head-on collisions are so much worse than rear-end ones — the relative speed adds up.</p>

**Image prompt:** A chalk diagram showing two frames. Left: ground frame — train moving east at 10 m/s, passenger inside walking at 2 m/s. Right: the velocity addition: 10 + 2 = 12 m/s for forward, 10 − 2 = 8 m/s for backward. Arrows labelled. Chalk on dark green board. Square 1:1.

---

## BB-NEW-25 — Projectile motion: the formal treatment

**Subject:** physics | **Topic:** kinematics | **Concept:** projectile-motion; range; time-of-flight; maximum-height; launch-angle | **Ground:** g1 | **Builds on:** [Card 29, BB-NEW-18, BB-NEW-16]

**Floor 0 (Idea):**
<p>A cannon fires at an angle. The ball rises, curves, and lands somewhere downrange. Given the launch speed and the angle, three numbers pin the entire flight: how high it goes, how long it stays up, and how far away it lands. All three follow directly from splitting the initial velocity into horizontal and vertical pieces.</p>

**Floor 1 (Concrete):**
<p>A ball is launched from ground level at speed u = 20 m/s at 30° above the horizontal. Resolve: uₓ = u cos 30° = 17.3 m/s, uᵧ = u sin 30° = 10 m/s. Vertically, it's free fall: time to peak = uᵧ/g = 1.0 s. Total flight time = 2 × 1.0 = 2.0 s. Maximum height = uᵧ²/(2g) = 100/20 = 5.0 m. Horizontally, it coasts: range = uₓ × total time = 17.3 × 2.0 = 34.6 m. The whole flight is determined by two numbers, u and θ.</p>

**Floor 2 (Definition):**
<p>For a projectile launched from ground level at speed u and angle θ (with g ≈ 10 m/s² or 9.8 exactly):</p>
<div class='formula'>T = 2u sin θ / g  (time of flight)<br>H = u² sin² θ / (2g)  (maximum height)<br>R = u² sin 2θ / g  (range)<span class='gloss'>The three key quantities of projectile motion — all derived from the SUVAT equations applied to the x and y axes separately.</span></div>

**Floor 3 (In action):**
<p>The range formula R = u² sin 2θ / g reveals two things. First, for a given launch speed, range is maximum when sin 2θ = 1, which means 2θ = 90°, so θ = 45°. Second, sin 2θ = sin(180° − 2θ), so two launch angles that sum to 90° — say 30° and 60° — give the same range. The steeper angle gives a higher, longer flight; the shallower angle gives a flatter, quicker one. Same landing spot, different paths.</p>

**Image prompt:** A chalk drawing of two parabolic trajectories from the same launch point. One at 30° (lower, shorter flight time), one at 60° (higher, longer flight time), both landing at the same spot (same range). The 45° trajectory shown in pale yellow as the maximum-range path. Axes labelled x and y. Chalk on dark green board. Square 1:1.

---

## BB-NEW-26 — Contact forces and field forces

**Subject:** physics | **Topic:** mechanics | **Concept:** contact-force; field-force; action-at-a-distance | **Ground:** g0 | **Builds on:** [Card 01, Card 03]

**Floor 0 (Idea):**
<p>Push a book and your hand touches it. Drop the book and the Earth pulls it without touching it at all. Forces come in two kinds: those that need contact, and those that reach across empty space.</p>

**Floor 1 (Concrete):**
<p>Place a book on a table. The table pushes up on the book — a <strong>contact force</strong>. The Earth pulls the book down — a <strong>field force</strong> (gravity). Both act simultaneously. The book doesn't fall through the table because the two forces balance. Now tie a string to the book and pull — the string transmits your pull through tension, another contact force. Push a trolley — your hand exerts a normal contact force. Rub your hand across the table — friction resists, also contact.</p>

**Floor 2 (Definition):**
<p><strong>Contact forces</strong> arise from physical contact between two bodies: normal force, friction, tension, air resistance, spring force. They result from electromagnetic interactions between the atoms at the surfaces, but at the macroscopic scale they are modelled as forces that act at the point of contact. <strong>Field forces</strong> (or action-at-a-distance forces) act without physical contact: gravitational force, electrostatic force, magnetic force. They are mediated by fields that permeate space.</p>

**Floor 3 (In action):**
<p>Every force in a mechanics problem is either contact or field. Gravity is always a field force. Normal forces, tension, and friction are always contact. When drawing a free body diagram, a field force (weight) acts at the centre of mass; contact forces act at the point of contact. This distinction matters because contact forces can disappear — remove the table and the normal force vanishes instantly — while field forces cannot be switched off.</p>

**Image prompt:** A chalk drawing of a book on a table. A downward arrow labelled "weight (field force)" acts at the book's centre. An upward arrow labelled "normal (contact force)" acts at the book-table boundary. To the side, a magnet pulling a nail without touching — labelled "magnetic force (field force)". Chalk on dark green board. Square 1:1.

---

## BB-NEW-27 — Free body diagrams: drawing every force

**Subject:** physics | **Topic:** mechanics | **Concept:** free-body-diagram; force-isolation; FBD | **Ground:** g0 | **Builds on:** [BB-NEW-26]

**Floor 0 (Idea):**
<p>A single object can have five or six forces acting on it at once — gravity pulling down, a surface pushing up, a string pulling sideways, friction dragging back. To sort out what happens, isolate the object and draw every force on it as an arrow. This is a free body diagram — the first step in solving almost any mechanics problem.</p>

**Floor 1 (Concrete):**
<p>A block rests on a rough slope at 30°. Draw the block alone — a dot or a box. Add arrows: weight mg straight down. The normal force N perpendicular to the slope, pushing the block away from the surface. Friction f pointing up the slope, stopping the block from sliding down. That's three forces. No other objects touch the block (no string, no push), so no more contact forces. The diagram is complete. The block is stationary, so the three arrows must sum to zero.</p>

**Floor 2 (Definition):**
<p>A <strong>free body diagram</strong> (FBD) is a sketch showing a single body isolated from its surroundings, with every force acting ON that body represented as a labelled arrow. Rules: (1) Only forces ON the body — never forces the body exerts on others. (2) Every force has an identifiable source — gravity from Earth, normal from the surface, tension from the string, etc. (3) Draw forces starting from the point where they act. (4) Choose a coordinate system, usually aligning one axis with the direction of acceleration.</p>

**Floor 3 (In action):**
<p>The FBD turns a messy physical situation into a clean maths problem. Once all forces are drawn, write Newton's second law for each axis: ΣFₓ = maₓ, ΣFᵧ = maᵧ. If the object is in equilibrium, both sums equal zero, and the forces simply balance. If it's accelerating, the net force in the direction of acceleration is non-zero. The FBD is not optional — skipping it is the most common cause of sign errors and missed forces in mechanics.</p>

**Image prompt:** A chalk drawing of a block on an inclined plane (slope at 30°). The block is isolated to the right as a dot with three arrows: mg straight down, N perpendicular to slope, f up the slope. Coordinate axes x (along slope) and y (perpendicular to slope) are drawn. Chalk on dark green board. Square 1:1.

---

## BB-NEW-28 — Weight and the normal force

**Subject:** physics | **Topic:** mechanics | **Concept:** weight; normal-force; apparent-weight | **Ground:** g0 | **Builds on:** [BB 02, BB-NEW-26]

**Floor 0 (Idea):**
<p>Stand on a bathroom scale. It reads your weight — or so you think. The scale actually measures the normal force pushing up on your feet. If you're stationary on level ground, that normal force equals your weight. But step into a lift that accelerates upward, and the reading jumps — your weight hasn't changed, but the normal force has.</p>

**Floor 1 (Concrete):**
<p>Stand on a scale in a lift. At rest or moving at constant speed: the scale reads your true weight mg. As the lift accelerates upward at a = 2 m/s²: the scale must push harder to accelerate you upward, so it reads m(g + a) — you feel heavier. As the lift accelerates downward at 2 m/s²: the scale reads m(g − a) — you feel lighter. If the lift cable snaps and it falls freely (a = g), the scale reads zero — you are weightless, even though gravity is still pulling on you.</p>

**Floor 2 (Definition):**
<p><strong>Weight</strong> W = mg is the gravitational force the Earth exerts on an object — it acts downward from the centre of mass and never disappears as long as the object is near Earth. The <strong>normal force</strong> N is the contact force a surface exerts perpendicular to itself, preventing an object from passing through it. The normal force adjusts to whatever is needed — it is not a fixed property of the object. <strong>Apparent weight</strong> is what a scale reads: the magnitude of the normal force acting on the object.</p>

**Floor 3 (In action):**
<p>The normal force is a constraint force — it takes whatever value is necessary to prevent penetration, up to the breaking point of the surface. On a flat surface with no other vertical forces, N = mg. Add a hand pushing down, and N = mg + F_push. In a turning car, the normal force from the seat tilts to provide centripetal acceleration. The normal force is not mg — it is the answer to "how hard does the surface have to push to keep this object where it is?"</p>

**Image prompt:** A chalk drawing of a person standing on a scale inside a lift. Three scenarios side by side: lift at rest (scale reads mg), lift accelerating up (scale reads > mg), lift in free fall (scale reads 0). Arrows show N and mg in each case. Chalk on dark green board. Square 1:1.

---

## BB-NEW-29 — Tension: force through a string

**Subject:** physics | **Topic:** mechanics | **Concept:** tension; massless-string; pulley | **Ground:** g0 | **Builds on:** [BB-NEW-26, BB-NEW-27]

**Floor 0 (Idea):**
<p>Tie a rope to a box and pull. The force travels from your hand, through the rope, to the box. The rope is the middleman — it transmits your pull without storing or losing any of it (if we idealise it as massless). This transmitted pull is called tension.</p>

**Floor 1 (Concrete):**
<p>Two blocks connected by a light string lie on a frictionless table. You pull the front block with a force F. The string tightens and pulls the rear block forward. If the string is massless, the tension is the same at both ends — the string pulls equally on both blocks. The whole system accelerates together. The tension is less than F because F pulls the front block directly AND indirectly (through the string) — the net force on each block, divided by its mass, must equal the common acceleration.</p>

**Floor 2 (Definition):**
<p><strong>Tension</strong> is the pulling force transmitted through a string, rope, cable, or chain when it is pulled tight by forces acting from opposite ends. For an ideal massless and inextensible string: (1) tension is the same at every point along the string, (2) tension pulls equally on the objects at both ends, (3) the direction of tension is always along the string, pulling away from the object. If the string passes over a frictionless pulley, tension remains unchanged across the pulley.</p>

**Floor 3 (In action):**
<p>In a typical pulley problem — a mass hanging from a string looped over a frictionless pulley, with the other end attached to a mass on a table — tension is the unknown that links the two objects. Write F = ma for each mass with T in the equation, then solve simultaneously. The tension is always less than the hanging weight (if the system accelerates) — some of the gravitational force goes into accelerating the hanging mass itself, not just pulling the other one.</p>

**Image prompt:** A chalk drawing of two blocks on a frictionless table connected by a string. A hand pulls the front block with force F. The string is labelled with tension T at both ends. Below: FBDs for each block showing T and F. Chalk on dark green board. Square 1:1.

---

## BB-NEW-30 — Hooke's law: the spring that pushes back in proportion

**Subject:** physics | **Topic:** mechanics | **Concept:** hookes-law; spring-force; restoring-force; spring-constant | **Ground:** g0 | **Builds on:** [BB-NEW-26]

**Floor 0 (Idea):**
<p>Pull a spring and it pulls back. Compress it and it pushes back. The harder you stretch or squash it, the harder it fights — and the relationship is perfectly proportional. Double the stretch, double the force. This is Hooke's law, and it makes the spring the simplest force-machine in physics.</p>

**Floor 1 (Concrete):**
<p>Hang a spring vertically. Attach a 1 kg mass and the spring stretches by 2 cm. Attach a 2 kg mass — it stretches by 4 cm. Attach 3 kg — 6 cm. Every extra kilogram adds the same extra stretch. The spring's behaviour is captured by one number: its <strong>spring constant</strong> k, the ratio of force to extension. For this spring, k = (1 kg × 10 m/s²) / 0.02 m = 500 N/m.</p>

**Floor 2 (Definition):**
<p><strong>Hooke's law</strong> states that the force exerted by an ideal spring is proportional to its extension or compression from its natural length, and acts in the direction that restores the natural length: F = −kx. Here, x is the displacement from equilibrium, k is the <strong>spring constant</strong> (N/m), and the minus sign means the spring always pushes or pulls toward equilibrium. Hooke's law holds for most springs within their <strong>elastic limit</strong> — stretch too far and the spring deforms permanently, breaking the law.</p>

**Floor 3 (In action):**
<p>Hooke's law appears far beyond springs. A guitar string, a diving board, the suspension of a car, a beam in a bridge — all behave as springs for small displacements. The restoring force in simple harmonic motion (pendulums, vibrating molecules, AC circuits) springs directly from F = −kx. Even the forces between atoms in a solid approximate Hooke's law near equilibrium. Robert Hooke published it in 1676 as the anagram "ceiiinosssttuv" — he later revealed it unscrambled as "ut tensio, sic vis": as the extension, so the force.</p>

**Image prompt:** A chalk drawing of a spring hanging vertically. Three diagrams side by side: no mass (natural length), 1 kg (stretched 2 cm), 2 kg (stretched 4 cm). An arrow labelled F = kx points up from each mass alongside mg pointing down. The formula F = −kx is written below. Chalk on dark green board. Square 1:1.

---

## BB-NEW-31 — Newton's first law: the formal statement

**Subject:** physics | **Topic:** mechanics | **Concept:** newtons-first-law; inertia; inertial-frame | **Ground:** g0 | **Builds on:** [Card 03, BB-NEW-11]

**Floor 0 (Idea):**
<p>Leave something alone and it keeps doing exactly what it was doing. A rock at rest stays at rest. A spaceship coasting through deep space stays coasting — same speed, same direction, forever. The natural state of an object is not rest; it's no change.</p>

**Floor 1 (Concrete):**
<p>A puck on frictionless ice, given one push, slides in a straight line at constant speed. It doesn't slow down, it doesn't turn, it doesn't speed up. It just continues. The only reason real pucks stop is friction — an outside force. Newton's first law says: without an outside force, the puck would never stop. Not because it has an engine, but because stopping (a change in velocity) requires a cause, and without a cause, there is no change.</p>

**Floor 2 (Definition):**
<p><strong>Newton's first law of motion:</strong> Every body continues in its state of rest, or of uniform motion in a straight line, unless compelled by an external force to change that state. This property — the resistance of a body to a change in its velocity — is called <strong>inertia</strong>. Mass is the quantitative measure of inertia. The first law also defines what an <strong>inertial frame of reference</strong> is: a frame in which the first law holds — one that is not accelerating.</p>

**Floor 3 (In action):**
<p>The first law is not just a special case of the second law (with F = 0). It serves a different purpose: it defines the arena in which the other laws operate. Without the first law, you can't tell whether an object is accelerating because of a real force or because your reference frame itself is accelerating. A coffee cup sliding across a dashboard when a car brakes is not being pushed — the car is decelerating, which is not an inertial frame. The first law says: find an inertial frame first, then apply the other laws.</p>

**Image prompt:** A chalk drawing showing a puck on three surfaces: rough pavement (stops quickly), ice (slides long), frictionless void (keeps going forever, shown with dashed line and "..."). Below: "Every body continues in its state of rest or uniform motion in a straight line, unless..." Chalk on dark green board. Square 1:1.

---

## BB-NEW-32 — Momentum: the quantity Newton cared about

**Subject:** physics | **Topic:** mechanics | **Concept:** momentum; mass-times-velocity; vector | **Ground:** g0 | **Builds on:** [Card 05, BB-NEW-14]

**Floor 0 (Idea):**
<p>A cricket ball and a truck, both moving at the same speed — which would you rather stop? The truck, obviously, because it has more mass. A cricket ball at 5 m/s and at 150 km/h — which is harder to catch? The fast one. The quantity that captures both mass and speed together is momentum.</p>

**Floor 1 (Concrete):**
<p>A 0.16 kg cricket ball travels at 40 m/s. Its momentum is 0.16 × 40 = 6.4 kg·m/s. A 2000 kg truck crawls at 0.0032 m/s. Its momentum is also 6.4 kg·m/s. They have the same momentum — it would take the same impulse (force × time) to stop either one. But the ball's energy (½mv² = 128 J) is vastly different from the truck's (½ × 2000 × 0.0032² ≈ 0.01 J). Momentum and energy are different quantities, and they answer different questions.</p>

**Floor 2 (Definition):**
<p><strong>Momentum</strong> p⃗ of a particle is the product of its mass and its velocity: p⃗ = mv⃗. It is a vector — magnitude mv, direction same as velocity. The SI unit is kg·m/s. The momentum of a system of particles is the vector sum of the momenta of all particles. Momentum, unlike kinetic energy, has no separate form for rotation or heat — it is always just mass × velocity, summed over everything.</p>

**Floor 3 (In action):**
<p>Newton actually stated his second law in terms of momentum: "The rate of change of momentum of a body is proportional to the applied force and takes place in the direction of that force." F⃗ = dp⃗/dt. When mass is constant, this reduces to F⃗ = ma⃗. But for a rocket ejecting fuel — where mass changes — only the momentum form works. Momentum is also the central conserved quantity in collisions: the total momentum before a collision equals the total after, regardless of energy loss, crumpling, or fragmentation.</p>

**Image prompt:** A chalk drawing showing two objects with equal momentum: a small fast cricket ball (0.16 kg, 40 m/s) and a massive slow truck (2000 kg, 0.0032 m/s). Arrows labelled p = 6.4 kg·m/s above both. Below: p = mv. Chalk on dark green board. Square 1:1.

---

## BB-NEW-33 — Newton's second law: the momentum form

**Subject:** physics | **Topic:** mechanics | **Concept:** newtons-second-law; momentum-form; F=dp-dt; variable-mass | **Ground:** g1 | **Builds on:** [Card 05, BB-NEW-32]

**Floor 0 (Idea):**
<p>F = ma is the textbook form of Newton's second law. But Newton wrote it differently: force equals the rate at which momentum changes, not mass times acceleration. For a rocket that loses mass as it burns fuel, these two versions give different answers — and only Newton's original version is correct.</p>

**Floor 1 (Concrete):**
<p>A conveyor belt drops sand onto a moving cart at a steady rate. The cart's mass increases over time, yet it must maintain constant speed. The force required is not ma (which is zero at constant speed) but v × (dm/dt) — the speed times the rate at which mass is being added. Each grain of sand, as it lands, must be accelerated from rest to the cart's speed. The force to do that is dp/dt, not ma.</p>

**Floor 2 (Definition):**
<p><strong>Newton's second law in its most general form:</strong> F⃗ = dp⃗/dt — the net external force on a body equals the rate of change of its momentum. When mass is constant, dp⃗/dt = m(dv⃗/dt) = ma⃗, recovering the familiar form. When mass changes (rocket ejecting exhaust, conveyor adding or removing mass), both terms contribute: F⃗ = m(dv⃗/dt) + v⃗(dm/dt). The second term has no analogue in F = ma.</p>

**Floor 3 (In action):**
<p>A rocket in space: no external forces (F⃗ = 0), but velocity changes because mass is ejected backward. The rocket equation v = u ln(m₀/m) follows directly from dp/dt = 0 applied to the rocket-plus-exhaust system. The forward thrust comes from the backward momentum carried away by the exhaust. F = ma cannot predict this — it would say "no force, no acceleration" — but the rocket accelerates anyway because the mass it's losing was carrying momentum. The momentum form of the second law handles both constant-mass and variable-mass systems correctly.</p>

**Image prompt:** A chalk drawing of a rocket in space. Exhaust gases shoot backward (small arrows). The rocket moves forward (large arrow). In a box: F = dp/dt. Below: the rocket equation v = u ln(m₀/m). Chalk on dark green board. Square 1:1.

---

## BB-NEW-34 — Newton's third law: action-reaction pairs

**Subject:** physics | **Topic:** mechanics | **Concept:** newtons-third-law; action-reaction-pairs; contact-forces | **Ground:** g0 | **Builds on:** [Card 07, BB-NEW-26]

**Floor 0 (Idea):**
<p>Push on a wall and the wall pushes back — exactly as hard, at exactly the same moment. That's Newton's third law. Forces never come alone; they come in pairs. The Earth pulls on you, and you pull on the Earth with exactly the same force.</p>

**Floor 1 (Concrete):**
<p>A horse pulls a cart. Someone objects: "By Newton's third law, the cart pulls the horse back equally — so the horse can never move the cart." The flaw: the action-reaction pair acts on different bodies. The horse pulls the cart forward. The cart pulls the horse backward. But the horse also pushes the ground backward, and the ground pushes the horse forward — that's the force that actually moves the horse-cart system. The cart's backward pull on the horse is real, but it's not the only force on the horse.</p>

**Floor 2 (Definition):**
<p><strong>Newton's third law:</strong> To every action there is always an equal and opposite reaction — or, the mutual actions of two bodies upon each other are always equal in magnitude and opposite in direction. Key properties: (1) action and reaction act on DIFFERENT bodies — they never cancel within a free body diagram. (2) They are always of the same type — both gravitational, both contact, both tension. (3) They occur simultaneously — neither is the cause or effect of the other.</p>

**Floor 3 (In action):**
<p>When you walk, your foot pushes backward on the ground (action). The ground pushes forward on your foot (reaction). That forward push is what accelerates you — without it, walking on a frictionless surface would be impossible. When a gun fires, the bullet is pushed forward and the gun is pushed backward (recoil) with equal momentum. When a bat hits a ball, the force on the bat equals the force on the ball — but the ball's smaller mass means it accelerates far more. Every interaction in the universe respects this symmetry.</p>

**Image prompt:** A chalk drawing of the horse-cart system. Left: horse pulls cart (F_hc), cart pulls horse (F_ch) — equal, opposite, different bodies. Right: FBD of horse showing ground pushing horse forward, cart pulling horse backward. FBD of cart showing horse pulling cart forward. Chalk on dark green board. Square 1:1.

---

## BB-NEW-35 — Equilibrium: when all forces cancel

**Subject:** physics | **Topic:** mechanics | **Concept:** equilibrium; static-equilibrium; net-force-zero | **Ground:** g0 | **Builds on:** [BB-NEW-27, BB-NEW-33]

**Floor 0 (Idea):**
<p>A lamp hangs from the ceiling, motionless. A book sits on a table. A bridge holds trucks without budging. These are all in equilibrium — the forces on them sum to zero. Nothing accelerates. Nothing changes. It's not that no forces act; it's that they perfectly cancel.</p>

**Floor 1 (Concrete):**
<p>A traffic light weighing 100 N hangs from two cables angled at 45° to the horizontal. The light is stationary, so the net force is zero. Vertically: the upward components of both tensions must equal the weight downward. Horizontally: the leftward component of one cable must exactly cancel the rightward component of the other. Solving: each cable's tension is about 71 N — more than half the weight, because pulling at an angle is inefficient at providing vertical support.</p>

**Floor 2 (Definition):**
<p>A body is in <strong>translational equilibrium</strong> when the vector sum of all external forces acting on it is zero: ΣF⃗ = 0. This gives two scalar conditions: ΣFₓ = 0 and ΣFᵧ = 0 (three in 3D). A body in equilibrium has zero acceleration — it may be at rest (<strong>static equilibrium</strong>) or moving at constant velocity (<strong>dynamic equilibrium</strong>). Rotational equilibrium additionally requires the net torque to be zero: Στ = 0.</p>

**Floor 3 (In action):**
<p>Equilibrium problems follow a standard recipe: (1) draw the FBD, (2) choose axes, (3) resolve all forces into components, (4) set ΣFₓ = 0 and ΣFᵧ = 0, (5) solve the resulting equations. Most structures — bridges, cranes, shelves, tents — are designed to be in static equilibrium under expected loads. The analysis tells you the tension in each cable, the compression in each beam, and the load at each joint. When equilibrium fails, things accelerate — and the second law takes over.</p>

**Image prompt:** A chalk drawing of a traffic light suspended from two angled cables (both at 45°). The weight mg = 100 N points down. Tension vectors T₁ and T₂ are resolved into horizontal and vertical components. ΣFₓ = 0 and ΣFᵧ = 0 written beside. Chalk on dark green board. Square 1:1.

---

## Summary

| Placeholder | Title | Subject | Topic | Ground | Builds on |
|---|---|---|---|---|---|
| BB-NEW-21 | Maxima and minima: peaks and valleys | maths | calculus | g0 | Card 14, BB-NEW-19 |
| BB-NEW-22 | Integration: area under a changing curve | maths | calculus | g0 | Card 14, BB-NEW-19 |
| BB-NEW-23 | Errors in measurement | physics | measurement | g0 | BB 85, BB-NEW-20 |
| BB-NEW-24 | Relative velocity | physics | kinematics | g0 | BB-NEW-11, BB-NEW-14 |
| BB-NEW-25 | Projectile motion: formal treatment | physics | kinematics | g1 | Card 29, BB-NEW-18, BB-NEW-16 |
| BB-NEW-26 | Contact forces and field forces | physics | mechanics | g0 | Card 01, Card 03 |
| BB-NEW-27 | Free body diagrams | physics | mechanics | g0 | BB-NEW-26 |
| BB-NEW-28 | Weight and the normal force | physics | mechanics | g0 | BB 02, BB-NEW-26 |
| BB-NEW-29 | Tension | physics | mechanics | g0 | BB-NEW-26, BB-NEW-27 |
| BB-NEW-30 | Hooke's law | physics | mechanics | g0 | BB-NEW-26 |
| BB-NEW-31 | Newton's first law: formal statement | physics | mechanics | g0 | Card 03, BB-NEW-11 |
| BB-NEW-32 | Momentum | physics | mechanics | g0 | Card 05, BB-NEW-14 |
| BB-NEW-33 | Newton's second law: momentum form | physics | mechanics | g1 | Card 05, BB-NEW-32 |
| BB-NEW-34 | Newton's third law: action-reaction pairs | physics | mechanics | g0 | Card 07, BB-NEW-26 |
| BB-NEW-35 | Equilibrium: when forces cancel | physics | mechanics | g0 | BB-NEW-27, BB-NEW-33 |

---

## Progress toward 50

- **Batches 01+02 ingested:** 20 BBs (BB-NEW-01 through BB-NEW-20 → cards 85–104)
- **Batch 03 (this file):** 15 BBs (BB-NEW-21 through BB-NEW-35 → will become cards 105–119)
- **Running total:** 35 BBs | **Remaining to 50:** 15 BBs

### What's left for Batch 4 (aiming for 15 more, pushing past Ch 5):

- Friction — formal treatment (Ch 6): static friction, kinetic friction, μₛ, μₖ, angle of repose
- Circular motion (Ch 7): angular velocity, centripetal acceleration, banking of roads
- Work and energy (Ch 8): formal work definition, work-energy theorem, power
- Centre of mass (Ch 9): definition, COM of discrete particles, COM of continuous bodies
- Linear momentum conservation (Ch 9): collisions, impulse-momentum theorem
