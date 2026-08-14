# Thompson Calculus → Physics Applications — Batch 3: Integration in Kinematics & Work (8 BBs)

These 8 BBs apply the integration toolkit (BB 600–615) to physics. Every concept is integration in reverse: from acceleration to velocity to position, from force to work to energy. Integration accumulates; differentiation dissects. Together they are the two hands of physics.

**Builds on:** BB-NEW-600–615 (integration), BB-NEW-620–634 (differentiation physics), BB-NEW-43–50 (work/energy), BB-NEW-95–104 (kinematics).

---

## BB-NEW-640 — From acceleration to velocity: v = ∫ a dt

**Subject:** physics | **Topic:** calculus | **Concept:** velocity-from-acceleration; integrating-a(t); initial-conditions | **Ground:** g0 | **Builds on:** [BB-NEW-600, BB-NEW-621, BB-NEW-601]

**Floor 0 (Idea):**
<p>If you know the acceleration at every instant, integration gives you the velocity: v(t) = v₀ + ∫[0,t] a(s) ds. The definite integral accumulates the area under the a-t curve. The +v₀ is the initial velocity — the constant of integration made physical.</p>

**Floor 1 (Concrete):**
<p>A rocket's acceleration increases linearly: a(t) = 3t m/s² (engines ramping up). Initial velocity v₀ = 10 m/s. v(t) = 10 + ∫[0,t] 3s ds = 10 + [1.5s²]₀ᵗ = 10 + 1.5t². At t = 4 s: v = 10 + 1.5(16) = 34 m/s. The area under the a-t curve from 0 to 4 is a triangle of base 4, height 12 → area = ½(4)(12) = 24 m/s. Add v₀: 10 + 24 = 34 ✓.</p>
<p>A car decelerates at a(t) = −4 (constant braking). v₀ = 25 m/s. v(t) = 25 + ∫[0,t] (−4) ds = 25 − 4t. Time to stop: 0 = 25 − 4t → t = 6.25 s. Distance travelled during braking: s = ∫[0,6.25] (25−4t) dt = [25t − 2t²]₀⁶·²⁵ = 156.25 − 78.125 = 78.125 m.</p>
<p>The pattern: a(t) → integrate → v(t) + C₁ → integrate → s(t) + C₂. Two integrations, two constants (v₀, s₀). The constants are the bridge from mathematics to the specific physical situation.</p>

**Floor 2 (Definition):**
<p><strong>Velocity from acceleration:</strong> v(t) = v₀ + ∫[0,t] a(τ) dτ. The integral accumulates the area under the acceleration-time graph — every little rectangle a(τ)Δτ adds a change in velocity. Graphically: the change in velocity Δv = area under a(t) curve. For constant a: v = v₀ + at (area = rectangle). For variable a: integrate the function. <strong>Position from velocity:</strong> s(t) = s₀ + ∫[0,t] v(τ) dτ. The displacement is the area under the v-t curve. The full chain: a(t) → ∫ → v(t) → ∫ → s(t). Differentiation runs the chain leftward; integration runs it rightward.</p>

**Floor 3 (In action):**
<p>This integration chain is how every navigation system works. An IMU (inertial measurement unit) contains accelerometers and gyroscopes. It measures a(t) in three axes. Integrating once gives velocity; integrating twice gives position. Errors accumulate: a tiny bias in the accelerometer (e.g., 0.001 m/s²) integrated over 100 seconds gives a velocity error of 0.1 m/s, and a position error of 5 m. This is why GPS corrects IMU drift — pure inertial navigation diverges. In seismology, integrating strong-motion accelerograms gives ground velocity and displacement during earthquakes — the peak ground displacement reveals the total slip. In sports science, accelerometers in wearable sensors integrate to track sprint speed, jump height, and swimming stroke rate.</p>

**Image prompt:** A chalk drawing of the integration chain. An a-t graph (line) with shaded area = Δv. Below: v-t graph (parabola for linearly increasing a) with shaded area = Δs. Below: s-t graph (cubic). Arrows: integrate ↓ from a to v to s. The formulas: v = v₀ + ∫ a dt, s = s₀ + ∫ v dt. Chalk on dark green board. Square 1:1.


## BB-NEW-641 — Work as the integral of force: W = ∫ F·dx

**Subject:** physics | **Topic:** calculus | **Concept:** work-integral; variable-force-work; area-under-F-x-curve | **Ground:** g0 | **Builds on:** [BB-NEW-600, BB-NEW-43, BB-NEW-602]

**Floor 0 (Idea):**
<p>You learned work = force × distance for constant forces. For variable forces — a spring that pushes harder the more you compress it — work is the integral of force over distance: W = ∫ F(x) dx. The area under the force-distance curve is the work done. Integration generalises W = Fd to the real world where forces vary.</p>

**Floor 1 (Concrete):**
<p><strong>Spring:</strong> F(x) = kx. Work to stretch from 0 to x: W = ∫[0,x] kx' dx' = ½kx². For k = 500 N/m, stretched 0.20 m: W = ½(500)(0.04) = 10 J. The area under the F-x graph is a triangle — base x, height kx, area = ½kx². Matches the formula.</p>
<p><strong>Inverse-square gravity:</strong> F(r) = GMm/r². Work to lift from r₁ = R (Earth's surface) to r₂ = ∞: W = ∫[R,∞] (GMm/r²) dr = GMm[−1/r]ᵣ^∞ = GMm(0 + 1/R) = GMm/R. For m = 1 kg: W = (6.67×10⁻¹¹)(5.97×10²⁴)/6.37×10⁶ = 6.25×10⁷ J = 62.5 MJ — the energy needed to escape Earth's gravity.</p>
<p><strong>General 1D:</strong> W = ∫[x₁,x₂] F(x) dx. The area under the F-x curve. For constant force: W = F Δx (rectangle). For linear force: W = ½(F₁+F₂)Δx (trapezoid — average force × distance).</p>

**Floor 2 (Definition):**
<p><strong>Work done by a variable force</strong> along a straight line: W = ∫[x₁,x₂] F(x) dx. In 2D/3D, the <strong>line integral:</strong> W = ∫_C F⃗·dr⃗. The work is path-dependent unless the force is conservative (curl-free). The work-energy theorem: W_net = ΔKE = ½mv_f² − ½mv_i². Graphically, work is the signed area under the F-x curve — positive when F and dx are in the same direction, negative when opposite. The spring (F = −kx) does negative work when stretched (force opposes displacement), storing energy as potential: ΔU = −W_spring = ½kx².</p>

**Floor 3 (In action):**
<p>The work integral is the bridge from forces to energy. To find the muzzle velocity of a bullet: integrate the pressure×area force over the barrel length — the area under the pressure-distance curve. In materials testing, the area under a stress-strain curve is the toughness — the energy absorbed before fracture. In cardiology, stroke work (the work done by the left ventricle per beat) is ∮ P dV — the area inside the pressure-volume loop. In electric circuits, the energy delivered to a capacitor is W = ∫ V dq = ∫ (q/C) dq = ½Q²/C = ½CV². Every "area under the curve" in physics is a work or energy calculation — the integral transforms a force law into a number of joules.</p>

**Image prompt:** A chalk drawing of a force-displacement graph. A linear F(x) = kx line from origin to (x, kx). The shaded triangular area = ½kx² labelled as work. Beside: the inverse-square gravity curve F = GMm/r², area under from R to ∞ labelled GMm/R. The integral formula W = ∫ F dx. Chalk on dark green board. Square 1:1.


## BB-NEW-642 — Impulse: the time integral of force

**Subject:** physics | **Topic:** calculus | **Concept:** impulse-integral; momentum-change; F-dt-area; impulse-momentum-theorem | **Ground:** g0 | **Builds on:** [BB-NEW-600, BB-NEW-50, BB-NEW-49]

**Floor 0 (Idea):**
<p>Force applied over time changes momentum. The impulse J = ∫ F(t) dt is the area under the force-time curve. Even if the force is enormous but brief (a bat hitting a ball), the integral gives a finite momentum change. The impulse-momentum theorem: J = Δp = m(v_f − v_i).</p>

**Floor 1 (Concrete):**
<p><strong>Constant force:</strong> F = 50 N applied for 0.20 s. J = 50 × 0.20 = 10 N·s. Δp = 10 kg·m/s. For a 0.15 kg baseball initially at 40 m/s toward the bat: v_f = v_i + J/m = −40 + 10/0.15 = −40 + 66.7 = 26.7 m/s in the opposite direction (exit speed ~27 m/s).</p>
<p><strong>Triangular force pulse:</strong> A collision force rises linearly from 0 to 2000 N over 0.005 s, then drops linearly to 0 over another 0.005 s. The F-t graph is a triangle. J = ½(base)(height) = ½(0.010)(2000) = 10 N·s. Same impulse as the constant 50 N for 0.2 s — but delivered 20× faster with 40× the peak force.</p>
<p><strong>General:</strong> J = ∫[t₁,t₂] F(t) dt. The area under any F-t curve is the impulse. For a graph: count the boxes or integrate the function. SI unit: N·s = kg·m/s.</p>

**Floor 2 (Definition):**
<p><strong>Impulse J</strong> = ∫ F(t) dt (units: N·s). The <strong>impulse-momentum theorem:</strong> J = Δp = p_f − p_i = m(v_f − v_i). This follows from Newton's second law in momentum form: F = dp/dt → dp = F dt → Δp = ∫ F dt. For a constant force: J = F_avg Δt. For variable forces, J is the area under the F-t curve. The integral simplifies collision analysis — you don't need the exact force profile, only the area (total impulse). In a graph, impulse = area under F(t); average force = J/Δt.</p>

**Floor 3 (In action):**
<p>Impulse governs every collision. Car crash tests measure the impulse delivered to crash test dummies — the integral of the force-time trace from load cells. Airbags increase Δt, reducing F_avg for the same J — the impulse is fixed (stopping the occupant), but spreading it over 0.05 s instead of 0.01 s reduces the average force 5×. In sports: a golfer "follows through" to increase contact time, maximising impulse for a given peak force. A karate board break delivers J in ~0.005 s — enormous peak force. In rocketry, the total impulse of a motor (∫ thrust dt) determines the Δv via the rocket equation. The impulse integral is also the foundation of collision detection algorithms in video games — compute J along the collision normal and update velocities accordingly.</p>

**Image prompt:** A chalk drawing of a force-time graph. A triangular pulse shown: force rising to F_max, then falling. The shaded area = impulse J. Beside: a baseball bat hitting a ball — velocity vectors before and after, Δp = J. The integral J = ∫ F dt displayed. Chalk on dark green board. Square 1:1.


## BB-NEW-643 — Centre of mass: the weighted average via integration

**Subject:** physics | **Topic:** calculus | **Concept:** centre-of-mass-integral; weighted-average; continuous-body-COM | **Ground:** g1 | **Builds on:** [BB-NEW-48, BB-NEW-600, BB-NEW-634]

**Floor 0 (Idea):**
<p>The centre of mass of an extended object is the weighted average of position, weighted by mass: x_cm = (∫ x dm)/(∫ dm). For discrete masses, it's a sum. For continuous bodies like rods, plates, and spheres, it's an integral. The COM is where the entire mass could be concentrated without changing the translational dynamics.</p>

**Floor 1 (Concrete):**
<p><strong>Uniform rod:</strong> length L, λ = M/L (constant). x_cm = (1/M)∫[0,L] x·(M/L) dx = (1/L)[x²/2]₀ᴸ = L/2 — at the midpoint.</p>
<p><strong>Non-uniform rod:</strong> λ(x) = kx (linearly increasing density, heavier at one end). Total mass: M = ∫[0,L] kx dx = kL²/2 → k = 2M/L². x_cm = (1/M)∫[0,L] x·(kx) dx = (k/M)[x³/3]₀ᴸ = (k/M)(L³/3). Substitute k: x_cm = (2M/L²)(1/M)(L³/3) = 2L/3. The COM is at 2/3 of the length — shifted toward the denser end.</p>
<p><strong>Triangular plate:</strong> Right triangle of base b, height h. By integration: x_cm = b/3, y_cm = h/3 (from the right-angle vertex). The centroid of a triangle is at the intersection of the medians.</p>
<p><strong>Semicircular disc:</strong> radius R. By integration in polar coordinates: y_cm (from diameter) = 4R/3π ≈ 0.424R.</p>

**Floor 2 (Definition):**
<p><strong>Centre of mass</strong> of a continuous body: x_cm = (1/M)∫ x dm, y_cm = (1/M)∫ y dm, z_cm = (1/M)∫ z dm, where M = ∫ dm and dm = ρ dV (3D), σ dA (2D), or λ dx (1D). The COM is the unique point where the first moment of mass is zero. For symmetrical objects, the COM lies on symmetry axes. <strong>Composite bodies:</strong> M_total x_cm = M₁x₁ + M₂x₂ + ... (discrete) or treat as sum of simple shapes. The COM is the balance point — support an object at its COM and it experiences no net gravitational torque.</p>

**Floor 3 (In action):**
<p>The COM integral is the first thing calculated for any mechanical design. The COM of a car (low and central for stability), an aircraft (must be within limits for controllability — the "CG envelope"), a rocket (shifts upward as fuel burns — must remain ahead of the centre of pressure for aerodynamic stability). In biomechanics, the COM of a high jumper actually passes <em>under</em> the bar while the body arches over it (the Fosbury Flop). In astrophysics, the COM of a binary star system is the focus of both elliptical orbits — the stars orbit their mutual COM. In robotics, a walking robot's COM must remain over the support polygon or it tips. All these are applications of the same integral: x_cm = (∫ x dm)/M.</p>

**Image prompt:** A chalk drawing of three objects with their COM marked. A non-uniform rod: λ(x) = kx, COM at 2L/3. A right triangle: COM at (b/3, h/3). A semicircular disc: COM at 4R/3π from the diameter. The integral formulas: M = ∫ dm, x_cm = (1/M)∫ x dm. Chalk on dark green board. Square 1:1.


## BB-NEW-644 — Moment of inertia: the rotational mass via integration

**Subject:** physics | **Topic:** calculus | **Concept:** moment-of-inertia-integral; rotational-inertia; I=integral-r^2-dm | **Ground:** g1 | **Builds on:** [BB-NEW-288, BB-NEW-600, BB-NEW-643]

**Floor 0 (Idea):**
<p>Just as mass resists linear acceleration (F = ma), moment of inertia resists angular acceleration (τ = Iα). For a point mass, I = mr². For an extended body, I = ∫ r² dm — the integral of (distance from axis)² over all mass elements. Mass farther from the axis contributes much more (r² weighting).</p>

**Floor 1 (Concrete):**
<p><strong>Thin rod about centre:</strong> length L, mass M, λ = M/L. Axis perpendicular through centre. I = ∫[−L/2, L/2] x² (M/L) dx = (M/L)[x³/3]₋ᴸ/₂^ᴸ/₂ = (M/L)(L³/24 + L³/24) = ML²/12.</p>
<p>About end: I = ∫[0,L] x² (M/L) dx = (M/L)(L³/3) = ML²/3. The parallel-axis theorem: I = I_cm + Md². d = L/2 → I_end = ML²/12 + M(L/2)² = ML²/12 + ML²/4 = ML²/3 ✓.</p>
<p><strong>Solid cylinder about axis:</strong> radius R, mass M. Using cylindrical shells: dm = ρ(2πr L dr), ρ = M/πR²L. I = ∫[0,R] r² · ρ(2πrL) dr = 2πρL ∫[0,R] r³ dr = 2πρL(R⁴/4) = ½MR². For a hollow cylinder (all mass at r = R): I = MR².</p>
<p><strong>Solid sphere about diameter:</strong> I = (2/5)MR². This requires a triple integral (or a clever single-integral setup using discs).</p>

**Floor 2 (Definition):**
<p><strong>Moment of inertia</strong> I = ∫ r² dm, where r is the perpendicular distance from the axis of rotation. Units: kg·m². The integral sums mr² for every mass element. Standard results (axis through COM unless noted): rod (centre, ⊥) = ML²/12; rod (end, ⊥) = ML²/3; solid cylinder/disk (axis) = ½MR²; hollow cylinder (axis) = MR²; solid sphere (diameter) = ⅖MR²; spherical shell (diameter) = ⅔MR²; rectangular plate (⊥, through centre) = M(a²+b²)/12. <strong>Parallel-axis theorem:</strong> I = I_cm + Md². <strong>Perpendicular-axis theorem</strong> (for planar objects): I_z = I_x + I_y.</p>

**Floor 3 (In action):**
<p>Moment of inertia governs rotational dynamics everywhere. A flywheel stores energy as ½Iω² — large I and high ω maximise storage. A figure skater spins faster by pulling arms in — I decreases (mass closer to axis), so ω increases to conserve L = Iω. A bicycle wheel's I is concentrated at the rim: I ≈ MR², maximising gyroscopic stability. In structural engineering, I-beams have large I (second moment of area, analogous to mass moment) about the bending axis — the material is placed far from the neutral axis where it contributes most to stiffness. The integral ∫ r² dm is one of the most computed integrals in mechanical engineering — every rotating machine part has its I calculated during design to predict stress, vibration, and power requirements.</p>

**Image prompt:** A chalk drawing of three objects with their I formulas. Left: thin rod about centre (I = ML²/12) and end (I = ML²/3) — the r² weighting shown by the x² integrand. Centre: solid cylinder (I = ½MR²) with cylindrical shell element dr. Right: solid sphere (I = ⅖MR²). The parallel-axis theorem diagram. The integral I = ∫ r² dm. Chalk on dark green board. Square 1:1.


## BB-NEW-645 — Pressure and hydrostatic force: F = ∫ P dA

**Subject:** physics | **Topic:** calculus | **Concept:** hydrostatic-force-integral; pressure-varying-with-depth; force-on-submerged-surface | **Ground:** g1 | **Builds on:** [BB-NEW-600, BB-NEW-602]

**Floor 0 (Idea):**
<p>Pressure in a fluid increases linearly with depth: P = P₀ + ρgh. The force on a submerged vertical surface isn't simply P × area because P varies with depth. You integrate: F = ∫ P dA = ∫ ρgh dA. The total force equals the pressure at the centroid times the area — a result that emerges from the integral.</p>

**Floor 1 (Concrete):**
<p><strong>Vertical rectangular dam:</strong> width w = 50 m, water depth H = 30 m. Pressure at depth y: P(y) = ρgy (gauge, ρ = 1000 kg/m³). Force on a horizontal strip at depth y: dF = P(y) × (w dy) = ρg y w dy. Total force: F = ∫[0,H] ρgw y dy = ρgw[y²/2]₀^H = ½ρgwH² = ½(1000)(9.8)(50)(900) = 2.205 × 10⁸ N ≈ 220 MN. That's about 22,500 tonnes of force.</p>
<p>The centre of pressure (where the equivalent point force acts) is deeper than the centroid because pressure increases with depth: y_cp = (∫ yP dA)/(∫ P dA) = (ρgw H³/3)/(ρgw H²/2) = 2H/3 = 20 m from the surface. The force acts at 2/3 depth, not 1/2.</p>
<p><strong>Triangular plate:</strong> base b at surface, vertex at depth H. Width at depth y: w(y) = b(1 − y/H). F = ∫[0,H] ρgy × b(1−y/H) dy = ρgbH²/6. The integral handles the changing width.</p>

**Floor 2 (Definition):**
<p><strong>Hydrostatic force</strong> on a submerged surface: F = ∫ P dA = ∫ (P₀ + ρgh) dA. For gauge pressure (P₀ = 0): F = ρg ∫ h dA = ρg × (first moment of area). The result: F = ρg h_c A, where h_c is the depth of the centroid. The <strong>centre of pressure</strong> (point of action): h_cp = (∫ h² dA)/(∫ h dA) = (second moment)/(first moment). The centre of pressure is always at or below the centroid because of the h² weighting. For a vertical rectangle extending from depth a to b: F = ½ρgw(b²−a²), h_cp = (2/3)(b³−a³)/(b²−a²).</p>

**Floor 3 (In action):**
<p>Hydrostatic force calculations design every dam, lock gate, submarine hull, and storage tank. The Hoover Dam: height 221 m, crest length 379 m (curved arch — the integral is more complex but the principle is identical). Offshore oil platform legs must withstand hydrostatic pressure at 1000+ m depth — ρgh ≈ 10 MPa, plus wave loading. Submarine pressure hulls are designed using the integral of external pressure over the curved surface. In medicine, blood pressure (≈ 13 kPa at the heart) creates hydrostatic pressure differences in the body — standing up, the pressure in your feet exceeds that in your head by ρgh ≈ 12 kPa (1.7 m height difference). This is why your feet swell on long flights — the integral of pressure over time in the veins.</p>

**Image prompt:** A chalk drawing of a vertical rectangular dam with water on one side. The pressure distribution shown as a triangle (P = 0 at surface, P = ρgH at bottom). A horizontal strip of width w and height dy at depth y. The integral F = ∫ ρgy w dy = ½ρgwH². The centre of pressure at 2H/3 from surface. Chalk on dark green board. Square 1:1.


## BB-NEW-646 — Electric potential from charge distributions: V = ∫ dq/r

**Subject:** physics | **Topic:** calculus | **Concept:** electric-potential-integral; continuous-charge-distribution; superposition-integral | **Ground:** g2 | **Builds on:** [BB-NEW-200, BB-NEW-600, BB-NEW-643]

**Floor 0 (Idea):**
<p>A point charge q creates potential V = kq/r at distance r. For a continuous distribution of charge — a charged rod, ring, or disc — you integrate: V = ∫ k dq/r. The superposition principle becomes an integral. This is how you find the potential (and from it, the electric field) of any charge configuration.</p>

**Floor 1 (Concrete):**
<p><strong>Charged ring:</strong> radius R, total charge Q. Potential at a point on the axis, distance x from centre. Every charge element dq is at distance √(R²+x²) from the point — all equal because of the ring's symmetry. V(x) = ∫ k dq / √(R²+x²) = kQ / √(R²+x²). The integral is trivial because r is constant. E_x = −dV/dx = kQx/(R²+x²)^(3/2).</p>
<p><strong>Charged rod:</strong> length L, charge Q, lying along x-axis from −L/2 to L/2. Potential at a point on the perpendicular bisector at distance y. dq = (Q/L) dx. r = √(x²+y²). V(y) = (kQ/L) ∫[−L/2, L/2] dx/√(x²+y²) = (kQ/L) ln[(L/2 + √((L/2)²+y²))/(−L/2 + √((L/2)²+y²))]. For L → ∞: V(y) diverges logarithmically — an infinite line charge has no finite zero-reference at infinity.</p>
<p><strong>Charged disc:</strong> radius R, surface charge σ. Rings as elements: dq = σ(2πr dr). V(x) = ∫[0,R] k(σ2πr dr)/√(r²+x²) = (σ/2ε₀)[√(R²+x²) − |x|]. For R → ∞: V = (σ/2ε₀)(∞ − |x|) — needs a different reference.</p>

**Floor 2 (Definition):**
<p><strong>Electric potential</strong> of a continuous charge distribution: V(r⃗) = (1/4πε₀) ∫ dq/|r⃗ − r⃗'|. In Cartesian: V(x,y,z) = k ∫∫∫ ρ(x',y',z') dx'dy'dz' / √((x−x')²+(y−y')²+(z−z')²). For line charges: λ = dq/dx (C/m). For surface charges: σ = dq/dA (C/m²). For volume charges: ρ = dq/dV (C/m³). The electric field is E⃗ = −∇V (the negative gradient). The integral V = ∫ k dq/r is the superposition principle for potentials — simpler than E⃗ = ∫ k dq r̂/r² because V is a scalar (no vector addition).</p>

**Floor 3 (In action):**
<p>The integral V = ∫ k dq/r is the starting point for electrostatics. The shape of high-voltage insulators is designed by integrating charge distributions to ensure the electric field never exceeds the breakdown strength of air (~3 MV/m). Lightning rods work because the high curvature concentrates charge (high σ → high E near the tip), ionising the air and providing a preferred path. In biology, the membrane potential of a neuron is ~−70 mV, maintained by ion distributions — the Poisson-Boltzmann equation integrates charge density to find the potential profile across the membrane. In particle physics, the potential of a nucleus is modelled by integrating the nuclear charge distribution (Fermi distribution) rather than treating it as a point — this affects electron scattering cross-sections. The scalar potential integral is almost always easier than the vector field integral.</p>

**Image prompt:** A chalk drawing of three charge distributions. Left: a charged ring, all dq at equal distance r = √(R²+x²) → V = kQ/r. Centre: a charged rod, dq at varying distances → logarithmic integral. Right: a charged disc, rings as elements → V ∝ √(R²+x²) − |x|. The general integral V = k ∫ dq/r displayed. Chalk on dark green board. Square 1:1.


## BB-NEW-647 — Integrating power: energy from the P-t curve

**Subject:** physics | **Topic:** calculus | **Concept:** energy-from-power; E=integral-P-dt; kilowatt-hour | **Ground:** g0 | **Builds on:** [BB-NEW-600, BB-NEW-47, BB-NEW-208]

**Floor 0 (Idea):**
<p>Power is the rate of energy transfer: P = dE/dt. To find the total energy over a time interval, integrate: E = ∫ P(t) dt. The area under the power-time curve is the energy consumed. Your electricity bill charges for kilowatt-hours — the integral of kilowatts over hours.</p>

**Floor 1 (Concrete):**
<p><strong>Constant power:</strong> A 60 W bulb runs for 5 hours. E = P × t = 60 × (5 × 3600) = 1.08 × 10⁶ J = 0.3 kWh. At ₹8/kWh: cost ≈ ₹2.40.</p>
<p><strong>Variable power:</strong> A wind turbine's output varies as P(t) = P₀ sin²(πt/12) MW over a 12-hour period (zero at dawn/dusk, peak at midday). Total energy: E = ∫[0,12] P₀ sin²(πt/12) dt = P₀ ∫[0,12] ½(1 − cos(πt/6)) dt = ½P₀[t − (6/π)sin(πt/6)]₀¹² = ½P₀(12 − 0) = 6P₀ MWh. The average power is P_avg = E/12 = P₀/2 MW — for a sinusoidally varying source, the average is half the peak.</p>
<p><strong>Charging a capacitor:</strong> Through a resistor, P(t) = (V₀²/R)e^(−2t/RC). Total energy delivered: E = ∫[0,∞] (V₀²/R)e^(−2t/RC) dt = (V₀²/R)(RC/2) = ½CV₀² — exactly the energy stored in the capacitor. The integral of exponential power gives the familiar ½CV².</p>

**Floor 2 (Definition):**
<p><strong>Energy from power:</strong> E = ∫[t₁,t₂] P(t) dt. The area under the P-t curve. Units: joule (J) = watt-second. Practical unit: kilowatt-hour (kWh) = 3.6 × 10⁶ J. For AC: P(t) = V(t)I(t) and E = ∫ V(t)I(t) dt over the desired interval. For a periodic waveform, E per cycle = ∫[0,T] P(t) dt, and average power P_avg = E/T. The RMS value is defined so that P_avg = V_rms I_rms for sinusoidal waveforms. The integral converts the instantaneous rate (power) into the accumulated quantity (energy).</p>

**Floor 3 (In action):**
<p>The power integral governs energy economics. A solar panel's daily output is ∫ P(t) dt from sunrise to sunset — the area under the insolation curve. Grid operators integrate the total demand curve to forecast required generation. In fitness, a power meter on a bicycle measures instantaneous watts, and the total work (kJ) is the integral over the ride — a metric of training load. In battery technology, the capacity (mAh or Wh) is the integral of discharge current or power over time until cutoff voltage. Electric vehicle range is E_battery ÷ consumption (Wh/km). The difference between peak power (kW) and energy capacity (kWh) is the difference between a sprinter and a marathoner — same integral, different time spans.</p>

**Image prompt:** A chalk drawing of a power-time graph. A sinusoidal curve P(t) = P₀ sin²(πt/12) over 12 hours. The shaded area = total energy = 6P₀ MWh. Below: an exponential decay P(t) = (V²/R)e^(−2t/RC) for a capacitor, total area = ½CV². The integral E = ∫ P dt. A kilowatt-hour diagram: 1 kW × 1 h = 3.6 MJ. Chalk on dark green board. Square 1:1.
