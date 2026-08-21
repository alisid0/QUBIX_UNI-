# Frye's Applied Physics → Qubix BBs — Batch 05: Newtonian Mechanics (15 BBs)

These 15 BBs cover the same classical mechanics territory as Verma's early batches — but through Frye's lens: a hands-on, engineering-first approach designed for students who need to *use* physics, not just prove theorems. Every BB opens with something observable and works through concrete numbers. The overlap with Verma is intentional: reading the same concept from two different angles doubles recall. Frye teaches you to *do*; Verma teaches you to *understand*. You need both.

**Chapters covered:** Frye 1–3, 7–11 (Introduction, Newton's Laws, Force/Work/Energy, Vectors, Moment, Acceleration, Projectiles, Newton's Second Law in engineering units).

---

## BB-NEW-780 — Why study physics? The world is a machine

**Subject:** physics | **Topic:** mechanics | **Concept:** physics-as-engineering-foundation; measurement; units; physical-quantities | **Ground:** g0 | **Builds on:** [Card 85]

**Floor 0 (Idea):**
<p>Every bridge, every engine, every electrical device, every building that doesn't collapse — all of them work because someone, somewhere, did the physics. Physics is not a subject. It's the rulebook the universe enforces, and engineering is the art of building things that obey the rules. If you want to build anything — a circuit, a structure, a machine — you need to speak the language of forces, energy, and motion. This is that language.</p>

**Floor 1 (Concrete):**
<p>A structural engineer designing a floor beam asks: what's the maximum load? Physics answers with stress = force/area. An electrical engineer designing a motor asks: what torque will it produce? Physics answers with τ = NIAB. A civil engineer designing a dam asks: what force does the water exert? Physics answers with F = ½ρgwh². Every one of these problems starts with measurement: how many metres? how many kilograms? how many seconds? The numbers matter. A beam designed with "about this thick" intuition collapses. A beam designed with σ = F/A and a safety factor stands for a century.</p>

**Floor 2 (Definition):**
<p>Physics is the study of matter, energy, and their interactions, expressed in quantitative laws. <strong>Engineering</strong> is the application of these laws to design and build. The foundation is <strong>measurement:</strong> every physical quantity has a numerical value and a unit. The SI system uses seven base units: metre (m, length), kilogram (kg, mass), second (s, time), ampere (A, current), kelvin (K, temperature), mole (mol, amount of substance), candela (cd, luminous intensity). All other units (newton, joule, watt, pascal) are combinations of these. <strong>Significant figures</strong> matter: writing 5.0 m means something different from 5.00 m — the zeros indicate measurement precision.</p>

**Floor 3 (In action):**
<p>Engineering failures are often unit errors. The Mars Climate Orbiter ($327 million) burned up in the Martian atmosphere in 1999 because one team used metric units (newton-seconds) and another used imperial (pound-seconds). The Gimli Glider (1983) ran out of fuel mid-flight because of a metric-to-imperial conversion error during refuelling — the pilot dead-sticked a 767 onto a disused runway. These disasters trace back to the same root cause: physics doesn't care which units you use, but it does demand consistency. The first lesson of applied physics is: always, always check your units.</p>

**Image prompt:** A chalk drawing of a bridge, a motor, and a dam with their governing equations. A ruler, a scale, and a stopwatch — measurement tools. The SI base units table. A warning sign: "Check your units." Chalk on dark green board. Square 1:1.


## BB-NEW-781 — Newton's first law: why seatbelts exist

**Subject:** physics | **Topic:** mechanics | **Concept:** newtons-first-law; inertia; rest-and-uniform-motion; frames-of-reference | **Ground:** g0 | **Builds on:** [BB-NEW-31]

**Floor 0 (Idea):**
<p>A book on a table stays there. A curling stone on ice slides in a nearly straight line at nearly constant speed. Both are doing the same thing: obeying Newton's first law. An object at rest stays at rest; an object in motion stays in uniform motion — unless a force acts on it. This is inertia: the universe's stubborn refusal to change what it's already doing.</p>

**Floor 1 (Concrete):**
<p>You're in a car travelling at 60 km/h (16.7 m/s). The car hits a wall and stops in 0.10 seconds. Your body, obeying Newton's first law, continues forward at 16.7 m/s until the seatbelt exerts a force to stop you. Your deceleration: a = Δv/Δt = 16.7/0.10 = 167 m/s² ≈ 17g. The force on a 70 kg person: F = ma = 70 × 167 = 11,690 N — over a tonne of force. The seatbelt spreads this force across your chest and pelvis over about 0.3 m of webbing stretch, reducing peak force. Without the seatbelt, you hit the dashboard in ~0.01 s — the force is 10× higher, and the localised pressure ruptures organs.</p>
<p>On ice (nearly frictionless), a hockey puck slides at almost constant speed. The tiny friction from the ice (~0.005 × weight) slowly decelerates it. In deep space, far from any gravity, a spacecraft with engines off maintains exactly constant velocity — forever. Newton's first law is perfect in the absence of forces.</p>

**Floor 2 (Definition):**
<p><strong>Newton's First Law (Law of Inertia):</strong> A body remains at rest or in uniform motion in a straight line unless acted upon by a net external force. <strong>Inertia</strong> is the tendency of an object to resist changes in its velocity — it is proportional to mass. The law defines <strong>inertial reference frames:</strong> frames in which the law holds (non-accelerating frames). In an accelerating car, a coffee cup slides backward across the dashboard even though no horizontal force acts on it — the car is not an inertial frame. The first law is not derivable from the second; it's a separate statement about the existence of inertial frames.</p>

**Floor 3 (In action):**
<p>Every safety device in a vehicle is an application of Newton's first law. Seatbelts, airbags, crumple zones — all exist to apply a controlled force over time to stop your body when the car stops. A rear-facing child seat is safer than forward-facing because the force is distributed across the entire back during a frontal collision. In space, Newton's first law means spacecraft don't need to burn fuel to keep moving — they coast. The Voyager probes, launched in 1977, are still moving at ~17 km/s, and will continue at essentially that speed for billions of years unless they hit something. Newton's first law is why the universe doesn't need a battery.</p>

**Image prompt:** A chalk drawing of a car hitting a wall. The passenger's body continues forward (dashed outline) while the car stops. The seatbelt exerting force F over distance d. Below: a hockey puck on ice with tiny friction arrow, and a spacecraft in deep space with v = constant. "ΣF = 0 ⇔ v = constant." Chalk on dark green board. Square 1:1.


## BB-NEW-782 — Newton's second law: F = ma, the engine of physics

**Subject:** physics | **Topic:** mechanics | **Concept:** newtons-second-law; F=ma; mass-vs-weight; engineering-units | **Ground:** g0 | **Builds on:** [BB-NEW-33, BB-NEW-26]

**Floor 0 (Idea):**
<p>Push a shopping cart: it accelerates. Push harder: it accelerates more. Fill it with bricks: the same push produces less acceleration. Newton's second law quantifies this: F = ma. The acceleration is proportional to the force and inversely proportional to the mass. This one equation predicts the motion of everything from falling apples to orbiting planets.</p>

**Floor 1 (Concrete):**
<p>A 1200 kg car accelerates from 0 to 100 km/h (27.8 m/s) in 8.0 seconds. Acceleration a = Δv/Δt = 27.8/8.0 = 3.47 m/s². Net force required: F = ma = 1200 × 3.47 = 4167 N — about 425 kg of thrust. The engine produces this force at the wheels via friction with the road. If the car's mass were 1800 kg (loaded with passengers): the same engine force would produce a = F/m = 4167/1800 = 2.31 m/s², and 0–100 would take 27.8/2.31 = 12.0 seconds.</p>
<p>In the British engineering system, mass is measured in slugs: 1 slug = 14.59 kg. A force of 1 pound (lb) accelerates 1 slug at 1 ft/s². An American car weighing 3200 lb has a mass of 3200/32.2 ≈ 99.4 slugs (since g = 32.2 ft/s²). Frye emphasises: pounds are force, not mass. Your "weight" in pounds is a force — the Earth pulling on your mass.</p>

**Floor 2 (Definition):**
<p><strong>Newton's Second Law:</strong> The acceleration of an object is directly proportional to the net force acting on it and inversely proportional to its mass: a⃗ = F⃗_net/m, or equivalently <strong>F⃗ = ma⃗</strong>. Force is measured in newtons (N): 1 N = 1 kg·m/s². The law is vector: acceleration is in the direction of the net force. <strong>Mass</strong> (kg) measures inertia — resistance to acceleration. <strong>Weight</strong> (N) is the gravitational force on a mass: w = mg. Do not confuse them. In <strong>engineering units:</strong> 1 slug = 1 lb·s²/ft, 1 lb = 1 slug × 1 ft/s². The conversion: 1 lb ≈ 4.448 N.</p>

**Floor 3 (In action):**
<p>F = ma is the most-used equation in physics. It tells a rocket engineer how much thrust is needed to achieve a desired acceleration. It tells a structural engineer the maximum force a floor must withstand during an earthquake (a = ground acceleration, m = building mass). It tells a sports scientist the force a sprinter's legs exert during the starting block push. In accident reconstruction, F = ma works backward: measure the skid marks (→ deceleration from friction), find a, and you know the pre-braking speed. The same equation that launched Sputnik also determines whether your bookshelf bracket will hold.</p>

**Image prompt:** A chalk drawing of a shopping cart being pushed. Three panels: empty cart (small m, large a), half-full (medium), full of bricks (large m, small a). The equation F = ma. A force diagram: F_net arrow, a arrow in same direction. Mass in kg (SI) and slugs (engineering). Chalk on dark green board. Square 1:1.


## BB-NEW-783 — Newton's third law: you can't push without being pushed

**Subject:** physics | **Topic:** mechanics | **Concept:** newtons-third-law; action-reaction; force-pairs; propulsion | **Ground:** g0 | **Builds on:** [BB-NEW-34, BB-NEW-26]

**Floor 0 (Idea):**
<p>Lean against a wall. You push the wall, and the wall pushes you back with exactly the same force — that's why you don't fall through. Jump off a boat onto a dock, and the boat slides backward. Every force is part of a pair: A pushes B, B pushes A, equal in magnitude, opposite in direction. There are no solo forces in the universe.</p>

**Floor 1 (Concrete):**
<p>You stand on a bathroom scale. Your weight (686 N for a 70 kg person) pushes down on the scale. The scale pushes up on you with 686 N — that's the reading. The forces are equal and opposite, but they act on <em>different objects</em> (you on scale, scale on you), so they don't cancel in a free-body diagram of either object alone.</p>
<p>A rifle fires a 10 g bullet at 800 m/s. The bullet's momentum: p = 0.010 × 800 = 8.0 kg·m/s. The rifle (mass 4.0 kg) recoils with equal and opposite momentum: v_rifle = 8.0/4.0 = 2.0 m/s. The force on your shoulder: if the recoil is absorbed over 0.05 m, F = Δp/Δt. Δt ≈ 0.05/2.0 = 0.025 s, so F ≈ 8.0/0.025 = 320 N — a solid shove. The bullet and rifle experience equal and opposite forces for the same duration.</p>

**Floor 2 (Definition):**
<p><strong>Newton's Third Law:</strong> When object A exerts a force on object B, object B simultaneously exerts a force on object A equal in magnitude and opposite in direction: F⃗_AB = −F⃗_BA. The forces act on <em>different</em> objects — they do not cancel. Common misconception: "If forces are equal, why does the bullet accelerate more than the rifle?" Because a = F/m, and the bullet's mass is 400× smaller. Same force, vastly different acceleration. The third law applies to all forces: contact (normal, friction, tension) and field (gravity, electric, magnetic). It is the foundation of conservation of momentum and the principle of rocket propulsion.</p>

**Floor 3 (In action):**
<p>Rockets are pure Newton's third law. The engine expels exhaust gases backward at high speed; the gases push the rocket forward with equal and opposite force. In the vacuum of space, there's nothing to push against — the rocket pushes against its own exhaust. A helicopter pushes air down; the air pushes the helicopter up. A squid jets through the ocean by expelling water. You walk by pushing the Earth backward with your foot — the Earth pushes you forward. The Earth does accelerate backward (F = ma), but its mass is 6 × 10²⁴ kg, so the acceleration is unmeasurably tiny. Every step you take literally moves the planet.</p>

**Image prompt:** A chalk drawing of a person pushing a wall. Force arrows: person on wall (F), wall on person (−F). A rifle firing: bullet velocity v_b forward, rifle velocity v_r backward. The action-reaction pair labelled. A rocket: exhaust gases down, thrust up. "For every action, there is an equal and opposite reaction." Chalk on dark green board. Square 1:1.


## BB-NEW-784 — Force, work, and power: the energy trilogy

**Subject:** physics | **Topic:** mechanics | **Concept:** force-work-power; mechanical-energy; units-and-conversions | **Ground:** g0 | **Builds on:** [BB-NEW-43, BB-NEW-47]

**Floor 0 (Idea):**
<p>Force is a push or pull. Work is what happens when that push moves something: force × distance. Power is how fast that work gets done: work ÷ time. These three concepts — force, work, power — are the vocabulary of every machine ever built. A bulldozer exerts enormous force; the work it does is force × the distance it pushes the dirt; the power of its engine determines how quickly it does that work.</p>

**Floor 1 (Concrete):**
<p>A crane lifts a 2000 kg steel beam 30 m vertically in 15 seconds. The force needed: F = mg = 2000 × 9.8 = 19,600 N (the weight). Work done: W = Fd = 19,600 × 30 = 588,000 J = 588 kJ. Power output: P = W/t = 588,000/15 = 39,200 W = 39.2 kW (about 53 horsepower).</p>
<p>If the crane's motor is 80% efficient, the electrical power input is P_in = P_out/η = 39.2/0.80 = 49.0 kW. The wasted 9.8 kW becomes heat in the motor and gearbox.</p>
<p>Units: 1 joule (J) = 1 newton × 1 metre. 1 watt (W) = 1 J/s. 1 kilowatt-hour (kWh) = 3.6 × 10⁶ J. 1 horsepower (hp) = 746 W (approximately). An average human can sustain about 75 W of mechanical output — roughly 0.1 horsepower.</p>

**Floor 2 (Definition):**
<p><strong>Force</strong> F is an interaction that changes an object's motion (N). <strong>Work</strong> W = Fd cos θ — the component of force parallel to displacement times displacement (J). Work is done only if there is displacement; holding a heavy box stationary does zero work (even though it's exhausting — your muscles are doing internal biological work). <strong>Energy</strong> is the capacity to do work. <strong>Power</strong> P = W/t = Fv (for constant force parallel to velocity). <strong>Efficiency</strong> η = useful work output / total energy input × 100%. The <strong>principle of conservation of energy:</strong> energy cannot be created or destroyed, only converted between forms.</p>

**Floor 3 (In action):**
<p>Power ratings determine cost. A 2 kW electric heater running for 5 hours consumes 10 kWh — at ₹8/kWh, that's ₹80. A 10 W LED bulb running for the same time costs ₹0.40. Electric vehicles are rated in kWh/100 km — a Tesla Model 3 uses about 15 kWh/100 km, costing roughly ₹120 for 100 km (at ₹8/kWh), compared to ₹600–800 for a petrol car. The difference is efficiency: electric motors are ~90% efficient; petrol engines are ~25%. The energy trilogy — force, work, power — is the accountant's ledger of the physical world.</p>

**Image prompt:** A chalk drawing of a crane lifting a beam. Force F = mg downward, displacement d upward. Work W = Fd. Stopwatch: 15 s. Power P = W/t = 39.2 kW. A pie chart: 80% useful work, 20% heat loss. The energy conversion chain: electrical → mechanical → gravitational potential. Chalk on dark green board. Square 1:1.


## BB-NEW-785 — Kinetic and potential energy: the two bank accounts

**Subject:** physics | **Topic:** mechanics | **Concept:** kinetic-energy; potential-energy; energy-conservation; transformations | **Ground:** g0 | **Builds on:** [BB-NEW-45, BB-NEW-46, BB-NEW-784]

**Floor 0 (Idea):**
<p>Energy comes in two fundamental mechanical forms: kinetic (the energy of motion) and potential (the energy of position). A swinging pendulum constantly converts one into the other — at the bottom, all kinetic; at the top, all potential. The total stays constant (ignoring friction). This is conservation of mechanical energy: the universe has a fixed energy balance, and energy moves between accounts but never disappears.</p>

**Floor 1 (Concrete):**
<p>A 0.50 kg mass swings on a 1.0 m string, released from a height 0.20 m above the lowest point. At release: v = 0, KE = 0. PE_grav = mgh = 0.50 × 9.8 × 0.20 = 0.98 J. Total mechanical energy E = 0.98 J. At the lowest point: all energy is kinetic. ½mv² = 0.98 → v = √(2 × 0.98/0.50) = √3.92 = 1.98 m/s. At any intermediate point, KE + PE = 0.98 J — the sum is invariant.</p>
<p>A 1000 kg car travelling at 20 m/s (72 km/h) has KE = ½mv² = ½ × 1000 × 400 = 200,000 J = 200 kJ. This is the energy the brakes must dissipate to stop. At 40 m/s (144 km/h): KE = 800 kJ — four times the energy for twice the speed. This is why high-speed crashes are so much more destructive: energy scales with v².</p>

**Floor 2 (Definition):**
<p><strong>Kinetic energy:</strong> KE = ½mv² (J). Energy of motion. <strong>Gravitational potential energy:</strong> PE = mgh (near Earth's surface). Energy of position in a gravitational field. <strong>Elastic potential energy:</strong> PE_spring = ½kx². <strong>Conservation of mechanical energy:</strong> in the absence of non-conservative forces (friction, air resistance), KE + PE = constant. <strong>Work-energy theorem:</strong> W_net = ΔKE — the net work done on an object equals its change in kinetic energy. <strong>Energy</strong> is a scalar (no direction), measured in joules. 1 J = 1 kg·m²/s².</p>

**Floor 3 (In action):**
<p>Energy conservation is the universal accountant. A hydropower dam converts gravitational PE of water into KE of turbines into electrical energy. A roller coaster's first climb stores PE (the lift hill); the rest of the ride converts it to KE and back, with friction slowly draining the total. A regenerative braking system in an EV captures KE during deceleration and stores it back in the battery — reversing the usual waste. The v² in KE explains why speed limits save lives: a crash at 50 km/h has 56% more energy than at 40 km/h, not 25%. Energy is never lost — it just moves somewhere you didn't intend, usually as heat.</p>

**Image prompt:** A chalk drawing of a pendulum at three positions: highest (PE max, KE = 0), middle (PE + KE), lowest (PE = 0, KE max). The energy bar chart: KE (red) + PE (blue) = constant (green line). A roller coaster profile with PE → KE → PE conversions. Chalk on dark green board. Square 1:1.


## BB-NEW-786 — Vectors: the arrow language of physics

**Subject:** physics | **Topic:** mechanics | **Concept:** vectors; scalars; triangle-method; parallelogram-method; components | **Ground:** g0 | **Builds on:** [BB-NEW-160, BB-NEW-161]

**Floor 0 (Idea):**
<p>Some quantities are just numbers: mass (5 kg), temperature (25°C), time (10 s). These are scalars. Others have direction too: velocity (50 km/h north), force (100 N downward), displacement (3 m east). These are vectors. You can't add vectors like ordinary numbers — 3 N east + 4 N north is not 7 N. It's 5 N northeast. Vectors need their own arithmetic.</p>

**Floor 1 (Concrete):**
<p>You walk 3.0 km east, then 4.0 km north. Your displacement (straight-line distance from start to finish) is not 7 km. Draw a triangle: the east leg is 3, the north leg is 4. The hypotenuse (resultant) is √(3² + 4²) = 5.0 km, at an angle tan⁻¹(4/3) = 53° north of east. This is the <strong>triangle method</strong> of vector addition: place the tail of the second vector at the head of the first, and draw the resultant from start to finish.</p>
<p>Alternatively, the <strong>parallelogram method:</strong> draw both vectors from the same starting point, complete the parallelogram, and the diagonal from the start is the resultant. Both methods give the same answer. For more than two vectors: chain them head-to-tail.</p>

**Floor 2 (Definition):**
<p><strong>Scalars</strong> have magnitude only (mass, time, temperature, energy). <strong>Vectors</strong> have magnitude and direction (displacement, velocity, acceleration, force, momentum). <strong>Vector addition:</strong> R⃗ = A⃗ + B⃗. Methods: triangle (tip-to-tail), parallelogram, or <strong>resolution into components</strong> (Aₓ = A cos θ, A_y = A sin θ). Then Rₓ = ΣAₓ, R_y = ΣA_y, R = √(Rₓ² + R_y²), θ = tan⁻¹(R_y/Rₓ). <strong>Subtraction:</strong> A⃗ − B⃗ = A⃗ + (−B⃗) — reverse B and add. <strong>Scalar multiplication:</strong> cA⃗ = vector with magnitude |c|A in the same (c > 0) or opposite (c < 0) direction. Vectors are the language of forces, velocities, and fields — you cannot do physics without them.</p>

**Floor 3 (In action):**
<p>Vectors resolve every directional problem. A plane flying at 500 km/h north into a 100 km/h east wind: the ground track is √(500² + (−100)² if wind is tailwind? Actually: plane's velocity relative to air is 500 N; wind velocity is 100 E. Resultant: √(500² + 100²) = 510 km/h at tan⁻¹(100/500) = 11.3° east of north. The pilot must aim slightly west of north to fly a true north track. A cable-stayed bridge: the tension in each cable is a vector — the vertical components support the deck, the horizontal components cancel. Every truss, every frame, every free-body diagram is vector addition. If you can't add vectors, you can't design a structure that stands up.</p>

**Image prompt:** A chalk drawing of the triangle method: two vectors A⃗ and B⃗ tip-to-tail, resultant R⃗ from start to finish. The parallelogram method beside it. Component resolution: A⃗ broken into Aₓ = A cos θ and A_y = A sin θ. A plane with wind vector addition. Chalk on dark green board. Square 1:1.


## BB-NEW-787 — Adding forces: the resultant

**Subject:** physics | **Topic:** mechanics | **Concept:** resultant-force; equilibrium; force-resolution; net-force | **Ground:** g0 | **Builds on:** [BB-NEW-786, BB-NEW-26, BB-NEW-27]

**Floor 0 (Idea):**
<p>A chandelier hangs from two chains. Each chain pulls at an angle. The chandelier doesn't move, so the net force is zero — the upward components of both chains exactly balance the weight. Finding that balance means resolving each force into components and adding them as vectors. The resultant is the single force that replaces all the individual forces and has the same effect.</p>

**Floor 1 (Concrete):**
<p>A 200 N sign hangs from two cables making 30° with the horizontal. Each cable's tension T pulls up and sideways. Vertical equilibrium: 2 × T sin 30° = 200 → 2T × 0.5 = 200 → T = 200 N. Each cable pulls with 200 N — the combined vertical component (200 N) balances the weight. The horizontal components (T cos 30° = 173 N each) pull in opposite directions and cancel.</p>
<p>Three people pull on a ring: 50 N east, 80 N north, 60 N at 45° south of west. Resolve: (50, 0) + (0, 80) + (−60 cos 45°, −60 sin 45°) = (50 − 42.4, 80 − 42.4) = (7.6, 37.6). Resultant = √(7.6² + 37.6²) = 38.4 N at tan⁻¹(37.6/7.6) = 78.6° north of east. A single 38.4 N force at 78.6° would replace all three.</p>

**Floor 2 (Definition):**
<p>The <strong>resultant</strong> of a system of forces is the single force that produces the same effect as all the individual forces acting together. <strong>Equilibrium</strong> exists when the resultant is zero: ΣF⃗ = 0. For a particle in 2D: ΣFₓ = 0 and ΣF_y = 0. Procedure: (1) Draw a free-body diagram. (2) Resolve all forces into x and y components. (3) Sum each column. (4) Resultant magnitude R = √(Rₓ² + R_y²), direction θ = tan⁻¹(R_y/Rₓ). <strong>Tip:</strong> choose coordinate axes to minimise the number of components — align one axis with the most complicated force or with the direction of motion.</p>

**Floor 3 (In action):**
<p>Force resolution is how every structure stays up. A crane's jib is in compression, its tie cable in tension — the forces must balance at every joint. A suspension bridge's main cable sags in a catenary curve; at each tower, the horizontal component of cable tension is constant, while the vertical component carries the weight of the deck. A rock climber hanging from two anchors uses a "load-distributing" or "equalised" anchor — the angle between the slings determines the force on each anchor. At 30°, each anchor sees ~52% of the load. At 120°, each anchor sees 100% — an American Death Triangle can multiply force catastrophically. Vector addition is not abstract — it's the difference between a safe anchor and a snapped rope.</p>

**Image prompt:** A chalk drawing of a sign hanging from two cables at 30°. Forces resolved: T sin 30° (vertical), T cos 30° (horizontal). ΣF_y = 0: 2T sin 30° = 200 N. A free-body diagram with all forces as vectors. Three-force addition: 50 E + 80 N + 60 SW → resultant 38.4 N. Chalk on dark green board. Square 1:1.


## BB-NEW-788 — Moment of force: why wrenches have long handles

**Subject:** physics | **Topic:** mechanics | **Concept:** moment-of-force; torque; lever-arm; rotational-equilibrium | **Ground:** g0 | **Builds on:** [BB-NEW-284, BB-NEW-700]

**Floor 0 (Idea):**
<p>Push on a door near the hinge and it barely moves. Push at the edge and it swings easily. The force is the same — the distance from the pivot makes the difference. A moment (or torque) is force × perpendicular distance from the pivot. The longer the lever arm, the greater the turning effect for the same force. This is why wrenches have long handles.</p>

**Floor 1 (Concrete):**
<p>A bolt requires 50 N·m of torque to tighten. With a 0.30 m wrench, the force needed: F = τ/d = 50/0.30 = 167 N (about 17 kg). With a 0.50 m wrench: F = 50/0.50 = 100 N. The longer handle saves 40% of the effort. A "cheater bar" (a pipe slipped over the wrench handle) extends the lever arm — 1.0 m needs only 50 N, easily applied with one hand. The danger: the bolt or wrench may snap because the torque exceeds the material strength.</p>
<p>A 3.0 m seesaw balances a 30 kg child on one end and a 45 kg adult on the other. For balance: the moments must be equal. 30g × d_child = 45g × d_adult. If d_adult = 1.0 m from the pivot, d_child = 45 × 1.0/30 = 1.5 m. The lighter child sits farther from the pivot.</p>

**Floor 2 (Definition):**
<p>A <strong>moment</strong> (torque) τ is the turning effect of a force: τ = Fd sin θ, where d is the distance from the pivot to the line of action of the force, and θ is the angle between the force and the lever arm. Units: N·m (not joules — torque is not energy). The <strong>lever arm</strong> (moment arm) is the perpendicular distance from the pivot to the line of action. <strong>Rotational equilibrium:</strong> Στ = 0 — the sum of clockwise and anticlockwise moments about any point is zero. <strong>Principle of moments:</strong> for a body in equilibrium, total clockwise moment = total anticlockwise moment. The moment of a couple (two equal, opposite, parallel forces) is Fd, independent of the pivot choice.</p>

**Floor 3 (In action):**
<p>Moments are why all tools are designed the way they are. A long screwdriver handle gives more torque. A ratchet with an extendable handle is a variable-torque tool. A cyclist's pedal crank (typically 170–175 mm) is a lever — standing on the pedal applies your full weight at that radius, generating torque to climb hills. A torque wrench clicks at a preset value — overtightening strips threads; undertightening risks failure. Centre of gravity is where the entire weight of an object can be considered to act — if the CG is outside the base of support, the object tips. A leaning tower topples when its CG moves beyond its base. The moment is the rotational analogue of force — and just as universal.</p>

**Image prompt:** A chalk drawing of a wrench on a bolt. Force F at distance d from the bolt centre. Torque τ = Fd. Three wrenches: 0.3 m (needs 167 N), 0.5 m (100 N), 1.0 m (50 N). A seesaw with 30 kg child at 1.5 m and 45 kg adult at 1.0 m — moments balanced. Chalk on dark green board. Square 1:1.


## BB-NEW-789 — Centre of gravity: where the weight lives

**Subject:** physics | **Topic:** mechanics | **Concept:** centre-of-gravity; stability; base-of-support; tipping | **Ground:** g0 | **Builds on:** [BB-NEW-788, BB-NEW-48]

**Floor 0 (Idea):**
<p>Balance a ruler on your finger. The point where it doesn't tip is its centre of gravity — the single point where the entire weight of the object can be considered to act. For symmetrical objects, it's at the geometric centre. For irregular ones, it's where the weight is evenly distributed. An object tips over when its CG moves outside its base of support.</p>

**Floor 1 (Concrete):**
<p>A uniform 5.0 m plank of mass 20 kg rests on two supports, one at each end. A 60 kg person stands 1.5 m from the left end. Find the reaction forces at the supports. Take moments about the left support: clockwise moment = (60g × 1.5) + (20g × 2.5) = 900g + 500g = 1400g N·m. This must equal the anticlockwise moment = R_right × 5.0. R_right = 1400g/5.0 = 280g = 2744 N. R_left = (80g) − 2744 = 784 − 2744 = 5096 N? Actually weight = 80 × 9.8 = 784 N. Wait — let me recalculate. 20 kg plank + 60 kg person = 80 kg total, total weight 784 N. R_right = (60 × 9.8 × 1.5 + 20 × 9.8 × 2.5)/5.0 = (882 + 490)/5 = 274.4 N. R_left = 784 − 274.4 = 509.6 N. The left support carries ~65% of the load.</p>

**Floor 2 (Definition):**
<p>The <strong>centre of gravity</strong> (CG) of an object is the point where the entire weight can be considered to act. For a uniform gravitational field, CG = centre of mass (COM). The CG is found by: (1) symmetry — at the geometric centre for uniform symmetric objects, (2) calculation — x_CG = Σ(m_i x_i)/Σm_i for discrete masses, (3) experiment — suspend the object from two different points; the CG lies at the intersection of the vertical lines. <strong>Stability:</strong> an object is stable if its CG is within its base of support. The <strong>stability margin</strong> is the distance the CG must move to reach the edge. A lower CG and wider base increase stability.</p>

**Floor 3 (In action):**
<p>The CG determines whether a vehicle rolls over. An SUV has a higher CG than a sedan — in a sharp turn, the centrifugal force effectively shifts the CG outward, and if it moves beyond the wheels, the vehicle flips. Double-decker buses have a low CG (heavy engine and chassis at the bottom) despite their height, keeping them stable. A forklift carries its load low and close to the mast. In construction, a crane's load chart shows the maximum safe load at each radius — beyond that, the CG of the crane-load system shifts beyond the outriggers, and the crane tips. The Leaning Tower of Pisa (CG about 2.3 m from centre) has been stabilised by adding counterweights and extracting soil — keeping its CG inside its base for a few more centuries.</p>

**Image prompt:** A chalk drawing of a plank on two supports with a person standing off-centre. The CG of the system marked. Reaction forces R_left and R_right calculated. A leaning block: CG inside base (stable), CG at edge (imminent tipping), CG outside (fallen). The formula x_CG = Σ(m_i x_i)/Σm_i. Chalk on dark green board. Square 1:1.


## BB-NEW-790 — Acceleration: how speed changes

**Subject:** physics | **Topic:** mechanics | **Concept:** acceleration; uniform-acceleration; kinematic-equations; graphical-representation | **Ground:** g0 | **Builds on:** [BB-NEW-100, BB-NEW-621]

**Floor 0 (Idea):**
<p>Speed tells you how fast you're going. Acceleration tells you how quickly that speed is changing. If you go from 0 to 100 km/h in 8 seconds, your acceleration is about 3.5 m/s² — every second, your speed increases by 3.5 m/s. Acceleration can be positive (speeding up), negative (slowing down — deceleration), or zero (cruising at constant speed).</p>

**Floor 1 (Concrete):**
<p>A car accelerates uniformly from rest to 25 m/s (90 km/h) in 10 seconds. a = Δv/Δt = 25/10 = 2.5 m/s². Distance travelled: s = v_avg × t = (0 + 25)/2 × 10 = 125 m. Using s = ut + ½at²: s = 0 + ½(2.5)(100) = 125 m ✓. The velocity-time graph is a straight line from (0,0) to (10,25); the area under it (triangle) = ½ × 10 × 25 = 125 m — the displacement.</p>
<p>Graphical interpretation: on a v-t graph, the slope = acceleration (steeper = faster acceleration). On an s-t graph, the slope = velocity (steeper = faster). A curved s-t graph means changing velocity — accelerating or decelerating. A straight s-t line means constant velocity.</p>

**Floor 2 (Definition):**
<p><strong>Acceleration</strong> a = Δv/Δt (m/s²). <strong>Uniform acceleration</strong> means a is constant. The <strong>kinematic equations</strong> for constant a: (1) v = u + at, (2) s = ut + ½at², (3) v² = u² + 2as, (4) s = ½(u+v)t. These are the SUVAT equations (u = initial velocity, v = final, a = acceleration, s = displacement, t = time). They work only when a is constant. <strong>Graphical:</strong> a-t graph is a horizontal line; v-t graph is a straight line with slope a; s-t graph is a parabola (curved). <strong>Average velocity:</strong> v_avg = (u+v)/2 (only for constant a). <strong>Instantaneous velocity:</strong> the slope of the tangent to the s-t curve. <strong>Acceleration due to gravity:</strong> g = 9.8 m/s² downward (near Earth's surface).</p>

**Floor 3 (In action):**
<p>Acceleration numbers define vehicle performance. A family car: 0–100 km/h in ~10 s (a ≈ 2.8 m/s², ~0.3g). A sports car: ~4 s (a ≈ 7 m/s², ~0.7g). A Formula 1 car: ~2.5 s (a ≈ 11 m/s², ~1.1g). A top-fuel dragster: 0–530 km/h in 3.7 s (a ≈ 40 m/s², ~4g). Fighter pilots in hard turns experience 7–9g — at 9g, a 70 kg pilot weighs 630 kg equivalent; blood drains from the brain, and a G-suit inflates to push it back. The human tolerance limit is about 10g sustained; John Stapp survived 46g for 1.1 seconds on a rocket sled in 1954, proving seatbelts save lives. Acceleration is not just a number — it's the physical stress your body endures.</p>

**Image prompt:** A chalk drawing of three graphs: a-t (horizontal line at 2.5 m/s²), v-t (straight line from 0 to 25 m/s), s-t (parabola). The area under v-t = displacement (shaded triangle). SUVAT equations displayed. A car with speedometer and stopwatch. Chalk on dark green board. Square 1:1.


## BB-NEW-791 — Projectiles: the path of a cannonball

**Subject:** physics | **Topic:** mechanics | **Concept:** projectile-motion; trajectory; range; maximum-height; independence-of-motions | **Ground:** g0 | **Builds on:** [BB-NEW-25, BB-NEW-790, BB-NEW-786]

**Floor 0 (Idea):**
<p>Fire a cannonball at an angle. It curves up, slows, stops rising, and curves down — tracing a parabola. The magic of projectile motion: the horizontal and vertical motions are completely independent. Gravity pulls down; nothing pushes horizontally (ignoring air). So the horizontal speed stays constant while the vertical speed changes exactly like free fall. Combine them and you get that graceful arc.</p>

**Floor 1 (Concrete):**
<p>A projectile is launched at 50 m/s at 40° above horizontal. Initial components: v₀x = 50 cos 40° = 38.3 m/s, v₀y = 50 sin 40° = 32.1 m/s. Time to reach peak (v_y = 0): t_peak = v₀y/g = 32.1/9.8 = 3.28 s. Maximum height: h_max = v₀y²/(2g) = 32.1²/(19.6) = 52.6 m. Total flight time: t_total = 2t_peak = 6.55 s. Range: R = v₀x × t_total = 38.3 × 6.55 = 251 m.</p>
<p>Maximum range occurs at 45° (on level ground, no air resistance). At 30° or 60°, range is the same — they are complementary angles. R_max = v₀²/g = 50²/9.8 = 255 m. With air resistance, the optimum is lower — about 30–35° for a rifle bullet.</p>

**Floor 2 (Definition):**
<p><strong>Projectile motion</strong> under uniform gravity (no air resistance): horizontal motion is constant velocity (a_x = 0, v_x = v₀x = constant, x = v₀x t). Vertical motion is constant acceleration (a_y = −g, v_y = v₀y − gt, y = v₀y t − ½gt²). The trajectory is a parabola: y = x tan θ − gx²/(2v₀² cos²θ). <strong>Range:</strong> R = v₀² sin(2θ)/g. <strong>Maximum height:</strong> H = v₀² sin²θ/(2g). <strong>Time of flight:</strong> T = 2v₀ sin θ/g. The independence of horizontal and vertical motions is Galileo's principle of compound motion.</p>

**Floor 3 (In action):**
<p>Projectile calculations design artillery, sports, and fireworks. A cricket ball thrown from the boundary at 30° and 25 m/s travels about 55 m — a direct hit. A goalkeeper's punt at 45° and 20 m/s reaches ~41 m — half the pitch. A golf drive at 70 m/s and 12° (optimised for backspin lift) carries ~270 m. In military ballistics, a 155 mm howitzer shell at 800 m/s and 45° would theoretically reach 65 km — in practice, air resistance limits it to ~30 km. Firework shells burst at the peak of their trajectory, calculated to explode exactly at apogee for maximum visual spread. The projectile equations are exact only in a vacuum — the real world adds drag, wind, and spin, but the parabola is the starting point for every trajectory.</p>

**Image prompt:** A chalk drawing of a parabolic trajectory. Initial velocity v₀ resolved into v₀x (constant) and v₀y (changing). Peak marked: v_y = 0, h_max = v₀y²/(2g). Range R = v₀² sin(2θ)/g. Three trajectories at 30°, 45°, 60° showing equal ranges for complementary angles. Chalk on dark green board. Square 1:1.


## BB-NEW-792 — Centripetal force: the inward pull that keeps things turning

**Subject:** physics | **Topic:** mechanics | **Concept:** centripetal-force; circular-motion; F=mv²/r; banking | **Ground:** g0 | **Builds on:** [BB-NEW-40, BB-NEW-41, BB-NEW-790]

**Floor 0 (Idea):**
<p>Tie a stone to a string and whirl it in a circle. The stone wants to fly off in a straight line — Newton's first law. The string pulls it inward, constantly changing its direction. This inward pull is centripetal force: F = mv²/r. The faster you whirl, the harder the string must pull. Let go, and the stone flies off <em>tangent</em> to the circle — not outward, but straight ahead from the point of release.</p>

**Floor 1 (Concrete):**
<p>A 0.50 kg stone on a 1.0 m string is whirled at 3.0 revolutions per second. Angular velocity ω = 2πf = 2π × 3.0 = 18.85 rad/s. Linear speed v = ωr = 18.85 × 1.0 = 18.85 m/s. Centripetal force: F = mv²/r = 0.50 × 18.85²/1.0 = 0.50 × 355.3 = 177.7 N — about 18 kg of tension. Double the speed to 6 rev/s: v doubles, v² quadruples, F = 710 N — a force that would snap most strings.</p>
<p>A 1200 kg car rounds a curve of radius 50 m at 20 m/s (72 km/h). Required centripetal force: F = mv²/r = 1200 × 400/50 = 9600 N. This force comes from friction between tyres and road. Maximum friction: f_max = μ_s N = μ_s mg. If μ_s = 0.80 on dry asphalt: f_max = 0.80 × 1200 × 9.8 = 9408 N — barely enough. On wet asphalt (μ_s ≈ 0.50): f_max = 5880 N — the car slides off the road at this speed.</p>

**Floor 2 (Definition):**
<p><strong>Centripetal force</strong> is the net force directed toward the centre of a circular path, required to keep an object moving in that circle: F_c = mv²/r = mω²r. It is not a new type of force — it is provided by tension (string), gravity (orbit), friction (car tyre), or normal force (banked curve). <strong>Centripetal acceleration:</strong> a_c = v²/r = ω²r, always directed toward the centre. <strong>Centrifugal force</strong> is a fictitious force experienced in the rotating frame — the "outward push" you feel in a turning car is your body's inertia resisting the centripetal acceleration, not a real force. <strong>Banking angle:</strong> tan θ = v²/(rg) — the ideal angle at which no friction is needed.</p>

**Floor 3 (In action):**
<p>Every curve you drive is a centripetal-force problem. Highway off-ramps are banked to reduce reliance on friction. A velodrome's banked turns (up to 45°) let cyclists corner at high speed without sliding. Washing machines use centripetal force to spin water out of clothes — the drum walls provide the force on the clothes, but the water escapes through holes and flies off tangentially. A centrifuge separates blood components: the denser red cells experience greater centripetal force requirements and migrate outward. At 3000 RPM in a 10 cm radius centrifuge, the acceleration is ~10,000g — a 1 g sample effectively weighs 10 kg.</p>

**Image prompt:** A chalk drawing of a stone on a string in circular motion. Velocity vector v tangent to the circle, centripetal force F_c arrow pointing inward. F_c = mv²/r. A car on a banked curve: normal force N and weight mg, with components showing how N sin θ provides centripetal force. Chalk on dark green board. Square 1:1.


## BB-NEW-793 — Newton's second law in engineering: slugs, pounds, and poundals

**Subject:** physics | **Topic:** mechanics | **Concept:** engineering-units; slug; pound-force; pound-mass; poundal; unit-systems | **Ground:** g1 | **Builds on:** [BB-NEW-782, BB-NEW-780]

**Floor 0 (Idea):**
<p>In SI, it's simple: force in newtons, mass in kilograms, acceleration in m/s². In the old British engineering system, it's a mess: there are pounds-force (lbf), pounds-mass (lbm), slugs, and poundals. A pound-force is the weight of a pound-mass at standard gravity. But F = ma only works directly if you use slugs for mass or poundals for force. Engineers in the US and UK used these units for centuries — and some still do.</p>

**Floor 1 (Concrete):**
<p>The British gravitational system: the unit of force is the pound-force (lbf), defined as the weight of a standard pound-mass at g = 32.174 ft/s². The unit of mass is the SLUG: 1 slug = 1 lbf·s²/ft. A mass of 1 slug accelerates at 1 ft/s² under 1 lbf. A 150 lb person has a mass of 150/32.174 ≈ 4.66 slugs. In F = ma: F (lbf) = m (slugs) × a (ft/s²).</p>
<p>The British absolute system: the unit of mass is the pound-mass (lbm). The unit of force is the POUNDAL: 1 pdl = 1 lbm·ft/s². 1 lbf = 32.174 pdl. Conversions: 1 lbf ≈ 4.448 N. 1 slug ≈ 14.59 kg. 1 lbm ≈ 0.4536 kg. 1 ft/s² = 0.3048 m/s².</p>

**Floor 2 (Definition):**
<p>Three unit systems for mechanics:</p>
<p>• <strong>SI:</strong> mass (kg), force (N = kg·m/s²). g = 9.8 m/s². Clean — no conversion factor.</p>
<p>• <strong>British gravitational:</strong> force (lbf), mass (slug = lbf·s²/ft). F (lbf) = m (slug) × a (ft/s²). Confusion: "pound" means both force and mass in everyday speech.</p>
<p>• <strong>British absolute:</strong> mass (lbm), force (poundal = lbm·ft/s²). 1 lbf = g_c × 1 lbm, where g_c = 32.174 lbm·ft/lbf·s². Many US engineering texts write F = ma/g_c to handle mixed units.</p>
<p>The key: always check whether "pound" means force or mass. If it's a weight, it's force. If it's a quantity of material, it's mass.</p>

**Floor 3 (In action):**
<p>The unit confusion has real consequences. The Mars Climate Orbiter disaster: Lockheed Martin used lbf·s for thruster impulses; NASA's JPL used N·s. The conversion factor of 4.448 was missing from the software. Each thruster firing was 4.448× too small, and the spacecraft slowly drifted off course over months. The $327 million probe burned up. In aviation, fuel is measured in pounds (force — it's the weight of fuel, not its mass, because lift must overcome weight). Pilots calculate weight and balance in pounds. An aircraft's maximum takeoff weight is a force limit, not a mass limit — but the two are interchangeable at 1g. Knowing which unit system you're in is not pedantry — it's the difference between orbit and oblivion.</p>

**Image prompt:** A chalk drawing of three unit system tables side by side: SI (kg, N), British gravitational (slug, lbf), British absolute (lbm, pdl). Conversion arrows: 1 slug = 14.59 kg, 1 lbf = 4.448 N. A warning: "POUND = force" with a weight icon, "POUND = mass" with a balance scale. Chalk on dark green board. Square 1:1.


## BB-NEW-794 — Conservation of momentum: the crash investigator's tool

**Subject:** physics | **Topic:** mechanics | **Concept:** conservation-of-momentum; impulse; collisions; elastic-inelastic | **Ground:** g0 | **Builds on:** [BB-NEW-49, BB-NEW-50, BB-NEW-783]

**Floor 0 (Idea):**
<p>When two objects collide — cars, billiard balls, atoms — the total momentum before the collision equals the total momentum after, provided no external forces act. This is conservation of momentum, a direct consequence of Newton's third law. It's the single most powerful tool for analysing crashes, explosions, and any interaction where forces are brief and intense.</p>

**Floor 1 (Concrete):**
<p>A 1500 kg car travelling at 20 m/s (72 km/h) rear-ends a stationary 1000 kg car. They lock together (perfectly inelastic collision). Momentum before: p_before = 1500 × 20 + 1000 × 0 = 30,000 kg·m/s. After: combined mass 2500 kg moves at v. 30,000 = 2500v → v = 12 m/s (43 km/h). The collision dissipated kinetic energy: KE_before = ½(1500)(400) = 300 kJ. KE_after = ½(2500)(144) = 180 kJ. Lost: 120 kJ — went into crumpling metal, heat, and sound.</p>
<p>A 50 g bullet at 400 m/s embeds in a 2.0 kg wooden block at rest on a frictionless surface. Momentum: 0.050 × 400 = 20 kg·m/s. After: (2.05)v = 20 → v = 9.76 m/s. The block slides away at ~10 m/s. This is a ballistic pendulum — measuring v tells you the bullet's speed.</p>

**Floor 2 (Definition):**
<p><strong>Momentum</strong> p⃗ = mv⃗ (kg·m/s). <strong>Conservation of momentum:</strong> in the absence of external forces, total momentum is constant — Σp⃗_before = Σp⃗_after. <strong>Impulse</strong> J = F_avg Δt = Δp — the change in momentum equals the area under the force-time curve. <strong>Elastic collision:</strong> both momentum and kinetic energy conserved. <strong>Inelastic collision:</strong> momentum conserved, KE not conserved (converted to heat, sound, deformation). <strong>Perfectly inelastic:</strong> objects stick together after collision. The law applies in all directions independently: Σp_x,before = Σp_x,after, Σp_y,before = Σp_y,after.</p>

**Floor 3 (In action):**
<p>Conservation of momentum reconstructs accidents. A car skids into a wall: measure the skid marks to find pre-impact speed. A two-car collision: the post-impact trajectories (from road markings, CCTV, dashcam) give velocities; work backward to find who was speeding. In particle physics, momentum conservation reveals invisible particles — a neutrino is detected by the missing momentum in a decay. Rocket propulsion: the rocket's forward momentum equals the exhaust's backward momentum. A 500-tonne Saturn V at liftoff expelled 15 tonnes of exhaust per second at 2500 m/s, generating 37.5 MN of thrust. Every action has an equal and opposite reaction — that's conservation of momentum, not just a slogan.</p>

**Image prompt:** A chalk drawing of two cars colliding. Before: car 1 moving at v₁, car 2 at rest. After: both moving together at v. The momentum equation: m₁v₁ = (m₁+m₂)v. A ballistic pendulum: bullet embeds in block, block swings up. KE before and after compared with "lost" energy as heat/sound. Chalk on dark green board. Square 1:1.


## BB-NEW-795 — The Newtonian mechanics toolkit

**Subject:** physics | **Topic:** mechanics | **Concept:** newtonian-mechanics-summary; forces-motion-energy-synthesis | **Ground:** g1 | **Builds on:** [BB-NEW-780 through BB-NEW-794]

**Floor 0 (Idea):**
<p>After 15 BBs of Newtonian mechanics through the Frye lens, here is the unified picture. Classical mechanics rests on three laws, two conservation principles (energy and momentum), and one universal force (gravity). Every machine, every structure, every vehicle is an application of these few principles. The equations are simple; the skill is knowing which one to use.</p>

**Floor 1 (Concrete):**
<p>Identify the principle for each scenario:</p>
<p>1. Seatbelt stops you in a crash — Newton I (inertia) + Newton II (F = ma, the belt force).</p>
<p>2. Rocket launch — Newton III (action-reaction) + conservation of momentum.</p>
<p>3. Crane lifting a beam — Work = Fd, Power = W/t, Efficiency = P_out/P_in.</p>
<p>4. Pendulum swing — KE ↔ PE conversion, conservation of mechanical energy.</p>
<p>5. Boat crossing a river — vector addition (boat velocity + current velocity).</p>
<p>6. Tightening a bolt — torque τ = Fd, lever arm principle.</p>
<p>7. Car rounding a curve — centripetal force F = mv²/r, friction provides it.</p>
<p>8. Cannonball trajectory — projectile motion, x = v₀ₓt, y = v₀yt − ½gt².</p>

**Floor 2 (Definition):**
<p><strong>Newtonian mechanics master principles:</strong></p>
<p>• <strong>Newton I:</strong> ΣF = 0 ⇒ v = constant. Inertial frames.</p>
<p>• <strong>Newton II:</strong> F = ma = dp/dt. N = kg·m/s². Engineering: lbf = slug × ft/s².</p>
<p>• <strong>Newton III:</strong> F_AB = −F_BA. Action-reaction pairs on different objects.</p>
<p>• <strong>Work-Energy:</strong> W = Fd cos θ, KE = ½mv², PE = mgh, P = W/t. Conservation: KE + PE = constant (no friction).</p>
<p>• <strong>Momentum:</strong> p = mv, Σp_before = Σp_after. Impulse J = Δp = F_avg Δt.</p>
<p>• <strong>Kinematics:</strong> v = u + at, s = ut + ½at², v² = u² + 2as. Projectile: x = v₀ₓt, y = v₀yt − ½gt².</p>
<p>• <strong>Vectors:</strong> R = √(Rₓ² + R_y²). Add tip-to-tail. Resolve into components.</p>
<p>• <strong>Rotation:</strong> τ = Fd, Στ = 0 for equilibrium. CG: point where weight acts.</p>

**Floor 3 (In action):**
<p>This is the operating system of the visible world. Everything from a falling leaf to a skyscraper obeys these laws. The beauty is that the same equations predict a cricket ball's trajectory, a satellite's orbit, and a bridge's deflection. The numbers change — the principles don't. Frye's contribution is to show that these are not abstract theorems to be admired from a distance. They are tools — as practical and reliable as a spanner. Learn to reach for the right one, and you can analyse any mechanical system you encounter.</p>

**Image prompt:** A chalk drawing of a grand synthesis: a car crash (momentum), a crane (work/power), a pendulum (energy conservation), a projectile (kinematics), a wrench (torque), a rocket (Newton III). The master equation table. "NEWTONIAN MECHANICS" at top. Chalk on dark green board. Square 1:1.
