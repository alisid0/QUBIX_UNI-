# Thompson Calculus → Physics Applications — Batch 1: Differentiation in Kinematics (8 BBs)

These 8 BBs apply the differentiation toolkit (BB 580–595) directly to physics. Every concept from the pure-maths batch gets its physics counterpart: velocity as ds/dt, acceleration as dv/dt, jerk, optimisation of projectile range, and the deep relationship between graphs of position, velocity, and acceleration.

**Builds on:** BB-NEW-580–595 (differentiation), BB-NEW-95–104 (kinematics), BB-NEW-24–25 (projectile motion), BB-NEW-21–22 (calculus intro).

---

## BB-NEW-620 — Velocity is the derivative of position: v = ds/dt

**Subject:** physics | **Topic:** calculus | **Concept:** velocity-as-derivative; instantaneous-velocity; slope-of-position | **Ground:** g0 | **Builds on:** [BB-NEW-580]

**Floor 0 (Idea):**
<p>You already know average velocity = Δs/Δt. Calculus gives you the exact velocity at a single instant: v = lim(Δt→0) Δs/Δt = ds/dt. The derivative transforms a position function into a velocity function. Thompson: "ds means a little bit of distance; dt means a little bit of time. Their ratio is the speed."</p>

**Floor 1 (Concrete):**
<p>A car's position is s(t) = 5t² − 2t³ + 10t (metres, seconds). Find its velocity at t = 2 s. v(t) = ds/dt = 10t − 6t² + 10. At t = 2: v(2) = 20 − 24 + 10 = 6 m/s. At t = 1: v(1) = 10 − 6 + 10 = 14 m/s. The car accelerates, then decelerates (the −6t² term eventually dominates). When does it stop? v(t) = 0 → 10t − 6t² + 10 = 0 → 6t² − 10t − 10 = 0 → t ≈ 2.28 s (only positive root). The derivative of position tells you the instantaneous speed at any moment — the number a speedometer shows, updated continuously.</p>

**Floor 2 (Definition):**
<p><strong>Velocity</strong> v(t) is the instantaneous rate of change of position with respect to time: v = ds/dt = s'(t). It is the slope of the tangent to the position-time graph. Units: m/s. If s(t) is given as a function, differentiate to get v(t). The sign of v indicates direction (positive = forward, negative = backward). Speed = |v|. The <strong>displacement</strong> over [t₁, t₂] is s(t₂) − s(t₁) = ∫[t₁,t₂] v(t) dt. Velocity is a vector in 2D/3D: v⃗ = (dx/dt, dy/dt, dz/dt).</p>

**Floor 3 (In action):**
<p>Every motion problem begins with ds/dt. GPS calculates instantaneous speed by differentiating position data. A car's speedometer is an analog differentiator — it measures the rotation rate of the driveshaft, which is proportional to ds/dt. In biomechanics, motion capture systems track markers on an athlete's body and differentiate position data to get joint velocities — revealing the explosive moment of a sprinter's start or a golfer's swing. In seismology, ground velocity during an earthquake is the derivative of displacement; peak ground velocity correlates strongly with structural damage. The derivative of position is arguably the most measured quantity in physics after time itself.</p>

**Image prompt:** A chalk drawing of a position-time graph (curve) with a tangent line drawn at t = 2 s. The slope labelled as v = ds/dt = 6 m/s. Below: the velocity function v(t) = 10t − 6t² + 10 plotted, with the point at t = 2 marked. The chain: s(t) → differentiate → v(t). Chalk on dark green board. Square 1:1.


## BB-NEW-621 — Acceleration is the derivative of velocity: a = dv/dt

**Subject:** physics | **Topic:** calculus | **Concept:** acceleration-as-derivative; second-derivative; d²s/dt² | **Ground:** g0 | **Builds on:** [BB-NEW-620]

**Floor 0 (Idea):**
<p>Velocity tells you how fast position changes. Acceleration tells you how fast velocity changes — it's the derivative of velocity, or the second derivative of position. a = dv/dt = d²s/dt². Positive acceleration means speeding up; negative acceleration (deceleration) means slowing down. The jerk is the third derivative: j = da/dt = d³s/dt³.</p>

**Floor 1 (Concrete):**
<p>Continuing from BB 620: s(t) = 5t² − 2t³ + 10t. v(t) = 10t − 6t² + 10. a(t) = dv/dt = 10 − 12t. At t = 0: a = 10 m/s² (accelerating). At t = 1: a = −2 m/s² (already decelerating — the −12t term overtakes). At t = 2: a = −14 m/s² (strong deceleration). The car accelerates initially, then the acceleration goes negative, eventually bringing the car to a stop (v = 0 at t ≈ 2.28 s). Jerk: j(t) = da/dt = −12 m/s³ — constant negative jerk. The constant jerk means the acceleration decreases linearly. In a real car, jerk matters: passengers feel constant acceleration as a steady push, but changing acceleration (jerk) as a lurch.</p>

**Floor 2 (Definition):**
<p><strong>Acceleration</strong> a(t) is the instantaneous rate of change of velocity: a = dv/dt = v'(t) = s''(t) = d²s/dt². Units: m/s². If v(t) is given, differentiate once; if s(t) is given, differentiate twice. Constant acceleration produces linear velocity and quadratic position (SUVAT equations are the integral of constant a). <strong>Jerk</strong> j(t) = da/dt = d³s/dt³ (units: m/s³) measures the rate of change of acceleration — important in ride comfort and mechanical wear. The derivative chain runs both ways: position → velocity → acceleration → jerk → snap → crackle → pop (the rarely-used 4th, 5th, and 6th derivatives).</p>

**Floor 3 (In action):**
<p>Acceleration measurement drives airbag deployment — an accelerometer detects the sudden deceleration of a crash (typically 30–50g) and triggers inflation within ~30 ms. Your phone's accelerometer measures a(t) by tracking the displacement of a tiny proof mass; integrating once gives velocity, twice gives position — that's how step counters work. In rocketry, jerk minimisation is a design constraint: a "soft start" gradually increases thrust to avoid damaging the payload. The Space Shuttle main engines throttled up over ~6 seconds specifically to limit jerk. In roller coaster design, the "thrill profile" is a careful choreography of a(t) and j(t) — sustained 4g is thrilling; rapid changes in g-force (high jerk) are nauseating.</p>

**Image prompt:** A chalk drawing showing the three-level derivative stack: s(t) parabola, v(t) straight line, a(t) horizontal line (for constant a). Beside it: the chain for s(t) = 5t²−2t³+10t — s(t) cubic, v(t) quadratic, a(t) linear, j(t) constant (−12). Arrows: differentiate ↓, integrate ↑. Chalk on dark green board. Square 1:1.


## BB-NEW-622 — The SUVAT equations are derivatives and integrals

**Subject:** physics | **Topic:** calculus | **Concept:** SUVAT-derivation; constant-acceleration; calculus-kinematics | **Ground:** g0 | **Builds on:** [BB-NEW-620, BB-NEW-621]

**Floor 0 (Idea):**
<p>The five SUVAT equations aren't separate facts to memorise — they're the result of integrating constant acceleration. Start with a = constant. Integrate once: v = u + at. Integrate twice: s = ut + ½at². Eliminate t from these and you get the others. Calculus reveals them as one idea, not five.</p>

**Floor 1 (Concrete):**
<p>Starting from a = constant:</p>
<p>1. a = dv/dt → ∫ dv = ∫ a dt → v = at + C. At t = 0, v = u → C = u. So <strong>v = u + at</strong>.</p>
<p>2. v = ds/dt → s = ∫ v dt = ∫ (u + at) dt = ut + ½at² + C. At t = 0, s = 0 → C = 0. So <strong>s = ut + ½at²</strong>.</p>
<p>3. Eliminate t: from v = u + at → t = (v−u)/a. Substitute into s: s = u(v−u)/a + ½a(v−u)²/a² = (uv − u²)/a + (v² − 2uv + u²)/2a = (2uv − 2u² + v² − 2uv + u²)/2a = (v² − u²)/2a. Rearranged: <strong>v² = u² + 2as</strong>.</p>
<p>4. With average velocity: s = ½(u+v)t (since v_avg = (u+v)/2).</p>
<p>5. s = vt − ½at² (rearranging).</p>
<p>All five from a = constant plus two integrations. No memorisation — just calculus.</p>

**Floor 2 (Definition):**
<p>The <strong>SUVAT equations</strong> describe motion with constant acceleration a: s (displacement), u (initial velocity), v (final velocity), a (acceleration), t (time). They are:</p>
<p>v = u + at · s = ut + ½at² · v² = u² + 2as · s = ½(u+v)t · s = vt − ½at²</p>
<p>All five derive from a = dv/dt = constant via integration. The equations are exact ONLY when a is constant. For variable acceleration, you must integrate the actual a(t) function. The calculus derivation also reveals the vector form: s⃗ = u⃗t + ½a⃗t², valid in 2D/3D with vector a⃗. The equations collapse to one dimension per component.</p>

**Floor 3 (In action):**
<p>The SUVAT equations are the launchpad for all of classical mechanics. A dropped stone: u = 0, a = −9.8 → s = −4.9t². A braking car: u = 20 m/s, a = −6 m/s² → stopping distance = u²/2|a| = 400/12 ≈ 33 m. A sprinter accelerating from rest at 4 m/s² for 3 s covers s = ½(4)(9) = 18 m. In ballistics, a shell fired at 800 m/s at 30° has horizontal range R = u² sin 2θ/g = 640,000 × √3/2 / 9.8 ≈ 56.5 km (ignoring air resistance). The equations also work in reverse: forensic accident reconstruction uses skid marks (s), friction coefficient (→ a), to find u — was the driver speeding? Every one of these uses calculus, but the integrals were done once and the results packaged as SUVAT.</p>

**Image prompt:** A chalk drawing of the a-t graph (horizontal line at a). Below: v-t graph (straight line, slope a, intercept u). Below: s-t graph (parabola). Arrows showing integration ↓ from a to v to s. The five SUVAT equations displayed. The derivation of v² = u² + 2as from the first two equations shown step by step. Chalk on dark green board. Square 1:1.


## BB-NEW-623 — Projectile motion: height maximised by calculus

**Subject:** physics | **Topic:** calculus | **Concept:** projectile-optimisation; maximum-height; range-maximisation | **Ground:** g1 | **Builds on:** [BB-NEW-622, BB-NEW-25, BB-NEW-590]

**Floor 0 (Idea):**
<p>A projectile follows a parabola. To find its maximum height, set its vertical velocity to zero (dy/dt = 0). To find the launch angle that maximises range, differentiate the range formula with respect to θ and set to zero. Calculus reveals why 45° is optimal — and when it isn't.</p>

**Floor 1 (Concrete):**
<p>A projectile launched at speed u at angle θ: x(t) = u cos θ·t, y(t) = u sin θ·t − ½gt². vy(t) = u sin θ − gt. Maximum height when vy = 0: t_peak = u sin θ/g. y_max = u sin θ·(u sin θ/g) − ½g(u sin θ/g)² = u² sin²θ/2g.</p>
<p>Range (y = 0, t ≠ 0): t_flight = 2u sin θ/g. R = u cos θ × 2u sin θ/g = u² sin 2θ/g. To maximise R: dR/dθ = u²/g × 2 cos 2θ = 0 → cos 2θ = 0 → 2θ = 90° → θ = 45°. R_max = u²/g.</p>
<p>On a slope: if launching up a hill of angle α, the optimal angle is θ = 45° + α/2. On level ground, 45°. Uphill, aim higher. Downhill (α negative), aim lower. All from calculus — set dR/dθ = 0 with the modified range equation.</p>

**Floor 2 (Definition):**
<p><strong>Projectile optimisation via calculus:</strong> y(t) = u sin θ·t − ½gt². Maximum height: set dy/dt = 0 → t = u sin θ/g → y_max = u² sin²θ/2g. Range: R(θ) = u² sin 2θ/g. Maximum range: dR/dθ = 0 → θ = 45° (level ground). For a slope of angle α: R(θ) = (u²/g)[sin(2θ−α) − sin α]/cos²α (uphill). Optimise: θ_opt = 45° + α/2. The envelope of all possible trajectories with fixed u is the parabola y = u²/2g − gx²/2u² — no projectile can reach beyond this curve. Calculus also gives time of flight and impact speed.</p>

**Floor 3 (In action):**
<p>Projectile optimisation is warfare's oldest calculus problem. Artillery tables — computed long before electronic computers — tabulated range vs elevation for every shell type and charge. The 45° rule is taught everywhere but rarely used in practice: real projectiles face air resistance, which shifts the optimum to slightly higher angles (typically 30–35° for rifle bullets due to drag). In sports: a shot put is released from ~2 m above ground, so the optimal angle is ~38°, not 45°. A soccer goal kick for maximum distance: ~45° ignoring air, but ~30–35° with drag. Javelin aerodynamics (lift) push the optimum to ~33°. Calculus gives the framework; the real world adds the correction terms.</p>

**Image prompt:** A chalk drawing of a parabolic trajectory. The peak marked with dy/dt = 0, y_max = u² sin²θ/2g. Range R = u² sin 2θ/g. Beside it: a graph of R vs θ, maximum at θ = 45°. The derivative dR/dθ = 2u²/g cos 2θ, zero at 45°. A second diagram shows uphill launch with α, optimal angle = 45° + α/2. Chalk on dark green board. Square 1:1.


## BB-NEW-624 — Newton's second law as a differential equation

**Subject:** physics | **Topic:** calculus | **Concept:** F=ma-as-ODE; second-order-ODE; acceleration-from-force | **Ground:** g1 | **Builds on:** [BB-NEW-621, BB-NEW-33]

**Floor 0 (Idea):**
<p>F = ma is a differential equation: m(d²x/dt²) = F(x, v, t). The force dictates the acceleration; integrate once for velocity, twice for position. For constant forces, you get SUVAT. For position-dependent forces (springs) or velocity-dependent forces (drag), you get richer motion. Calculus is how Newton's second law actually speaks.</p>

**Floor 1 (Concrete):**
<p><strong>Constant force:</strong> F = mg (gravity). m(d²y/dt²) = −mg → d²y/dt² = −g. Integrate: dy/dt = −gt + v₀. Integrate again: y = −½gt² + v₀t + y₀. Free fall.</p>
<p><strong>Spring force:</strong> F = −kx. m(d²x/dt²) = −kx → d²x/dt² = −(k/m)x. This is a second-order linear ODE. The solution: x(t) = A cos(ωt) + B sin(ωt), where ω = √(k/m). Verify: dx/dt = −Aω sin ωt + Bω cos ωt. d²x/dt² = −Aω² cos ωt − Bω² sin ωt = −ω² x = −(k/m)x ✓. Simple harmonic motion emerges from calculus, not from memorisation.</p>
<p><strong>Drag force:</strong> F = −bv (linear drag). m(dv/dt) = −bv → dv/dt = −(b/m)v. Separate variables: dv/v = −(b/m)dt → ln v = −(b/m)t + C → v = v₀ e^(−bt/m). Exponential decay of velocity.</p>

**Floor 2 (Definition):**
<p><strong>Newton's Second Law as an ODE:</strong> m(d²r⃗/dt²) = F⃗(r⃗, v⃗, t). For 1D: m(d²x/dt²) = F(x, dx/dt, t). Classification: if F depends only on t → directly integrable; if F depends on x → use v(dv/dx) = F/m (energy method); if F depends on v → separation of variables; if F = −kx → linear ODE with sinusoidal solutions. The general solution requires two initial conditions (x₀ and v₀) because it's second-order. The phrase "solving Newton's equations" means integrating this ODE for a given force law.</p>

**Floor 3 (In action):**
<p>Every dynamical system in classical physics is a differential equation. The motion of planets (F = −GMm/r²) → conic-section orbits, derived by Newton. The motion of a pendulum (F = −mg sin θ) → elliptic integrals for large amplitude, sin θ ≈ θ for small. The motion of a charged particle in E and B fields → the Lorentz force ODE. Modern computation: numerical ODE solvers (Runge-Kutta, Verlet) integrate F = ma millions of times per second for video game physics, weather prediction, and galaxy simulations. The leap from "F = ma" to actually predicting motion is calculus — without it, Newton's law is a statement; with it, it's a prediction machine.</p>

**Image prompt:** A chalk drawing of three force cases. Left: constant F → v(t) = linear, x(t) = quadratic (free fall). Centre: spring F = −kx → x(t) = sinusoid (SHM). Right: drag F = −bv → v(t) = exponential decay. Each with its ODE: m d²x/dt² = F. The solution forms beneath. Chalk on dark green board. Square 1:1.


## BB-NEW-625 — Optimising physics: minimum time, maximum range

**Subject:** physics | **Topic:** calculus | **Concept:** physics-optimisation; Fermat-principle; brachistochrone; calculus-of-variations-preview | **Ground:** g2 | **Builds on:** [BB-NEW-590, BB-NEW-623]

**Floor 0 (Idea):**
<p>Nature is an optimisation engine. Light takes the path of least time (Fermat's principle). A bead sliding on a wire takes the path of least time — not the straight line, but a cycloid (the brachistochrone problem). Soap films minimise surface area. Physics at its deepest level is calculus finding minima.</p>

**Floor 1 (Concrete):**
<p><strong>Fermat's principle (refraction):</strong> Light travels from A in air to B in water. Speed in air = c, in water = c/n. Time T = (distance in air)/c + (distance in water)/(c/n) = √(x²+h₁²)/c + n√((d−x)²+h₂²)/c. To minimise T: dT/dx = 0 → (1/c)(x/√(x²+h₁²)) − (n/c)((d−x)/√((d−x)²+h₂²)) = 0 → sin θ₁ = n sin θ₂. This is Snell's law — derived from "light minimises time," not from experiment.</p>
<p><strong>Brachistochrone:</strong> Which curve between A and B lets a bead slide in the shortest time (under gravity, no friction)? Galileo thought it was a circular arc. Johann Bernoulli (1696) proved it's a cycloid. Time = ∫ ds/v = ∫ √(1+(dy/dx)²)/√(2gy) dx. Minimising this functional (an integral of a function of y and y') requires the calculus of variations — Euler-Lagrange equation. Result: x = a(θ−sin θ), y = a(1−cos θ) — a cycloid.</p>

**Floor 2 (Definition):**
<p><strong>Physical optimisation principles:</strong></p>
<p>• <strong>Fermat's principle:</strong> light follows the path that minimises travel time → Snell's law (n₁ sin θ₁ = n₂ sin θ₂).</p>
<p>• <strong>Principle of least action:</strong> nature minimises the action S = ∫ L dt (Lagrangian L = T − V) → Euler-Lagrange equations → Newton's laws.</p>
<p>• <strong>Brachistochrone:</strong> the curve of fastest descent under gravity is a cycloid.</p>
<p>• <strong>Minimum potential energy:</strong> stable equilibrium occurs at minima of V(x) — set dV/dx = 0, verify d²V/dx² > 0.</p>
<p>The calculus procedure is universal: express the quantity to minimise as a function (or functional), differentiate (or vary), set to zero, solve. For functions: ordinary derivatives. For functionals (integrals involving unknown curves): calculus of variations.</p>

**Floor 3 (In action):**
<p>These principles unify physics. The law of reflection (angle of incidence = angle of reflection) follows from Fermat's principle — the straight-line-plus-reflection path has the shortest total distance. The shape of a hanging chain (catenary) minimises potential energy — y = a cosh(x/a). The shape of a water droplet minimises surface area for a given volume — a sphere. In general relativity, planets follow geodesics — paths that maximise proper time. In quantum mechanics, Feynman's path integral formulation sums over all possible paths, with the classical path emerging as the one where the action is stationary (the phases constructively interfere). Nature's preference for extrema is so universal that Michael Gauss supposedly wrote: "I have for a long time believed that the quantity of action is always a maximum or a minimum in natural phenomena."</p>

**Image prompt:** A chalk drawing showing Fermat's principle: two paths from A (air) to B (water) — the straight line and the actual refracted path. The time T(x) function plotted, minimum marked. Beside: the brachistochrone problem — a cycloid curve from A to B, labelled "fastest descent." Snell's law derived: sin θ₁ = n sin θ₂. Chalk on dark green board. Square 1:1.


## BB-NEW-626 — Related rates in physics: expanding, draining, charging

**Subject:** physics | **Topic:** calculus | **Concept:** physics-related-rates; implicit-differentiation-applied; chain-rule-physics | **Ground:** g1 | **Builds on:** [BB-NEW-591, BB-NEW-585]

**Floor 0 (Idea):**
<p>Differentiation shines when quantities are linked by physical laws and change simultaneously. A capacitor charges — how fast does the voltage rise? A cone-shaped tank drains — at what rate does the depth drop? The chain rule links the rates: differentiate the governing equation with respect to time, plug in known rates, solve for the unknown.</p>

**Floor 1 (Concrete):**
<p><strong>Charging capacitor:</strong> In an RC circuit, q = CV₀(1 − e^(−t/RC)). The current I = dq/dt = (V₀/R)e^(−t/RC). At t = 0: I = V₀/R (maximum). At t = RC: I = V₀/(Re) ≈ 0.37 V₀/R. The rate of charge accumulation is the current itself — I is the derivative of q.</p>
<p><strong>Draining tank:</strong> Torricelli's law: outflow speed v = √(2gh). A conical tank (radius R at top, height H) drains through a hole of area a at the bottom. Volume: V = (π/3)(R/H)² h³. dV/dt = π(R/H)² h² dh/dt. Also dV/dt = −a√(2gh) (outflow). Equate: π(R/H)² h² dh/dt = −a√(2gh). Solve for dh/dt = −(a/π)(H/R)² √(2g/h³). The water level drops faster as it gets shallower (h smaller → larger dh/dt magnitude).</p>
<p><strong>Charging balloon:</strong> dV/dt given (pump rate). V = (4/3)πr³ → dV/dt = 4πr² dr/dt → dr/dt = (dV/dt)/(4πr²). As r grows, dr/dt shrinks — the balloon inflates more slowly in radius even at constant volume rate.</p>

**Floor 2 (Definition):**
<p><strong>Related rates in physics:</strong> Procedure — (1) Write the equation linking the quantities (geometry, physical law). (2) Differentiate both sides with respect to time t (implicit differentiation). (3) Substitute the known rates and instantaneous values. (4) Solve for the unknown rate. The chain rule is the engine: d(f(y))/dt = f'(y)(dy/dt). Common patterns: expanding/contracting volumes (dV/dt → dr/dt), filling/draining (Torricelli), charging/discharging (I = dq/dt), heating/cooling (Newton's law: dT/dt ∝ T − T_env). In every case, two or more rates are locked together by a constraint equation, and calculus extracts the one you want.</p>

**Floor 3 (In action):**
<p>Related rates are the calculus of interconnected systems. In pharmacokinetics, a drug's concentration in the bloodstream C(t) follows dC/dt = input rate − elimination rate (elimination ∝ C). The differential equation relates the rates; solving it gives the concentration curve. In ecology, predator-prey models (Lotka-Volterra) link dP/dt and dH/dt through coupled ODEs. In climate science, the rate of temperature change dT/dt links to CO₂ concentration, albedo, and solar input via energy balance. These are all related-rates problems scaled up. The chain rule is the thread that ties them together — differentiate the constraint, substitute the knowns, solve for the unknown rate. The same four-step process works from a leaking bucket to a warming planet.</p>

**Image prompt:** A chalk drawing of three related-rate scenarios. Left: RC circuit — q(t) curve, I = dq/dt tangent. Centre: conical tank draining — h(t) decreasing, dh/dt shown as a steeper slope for smaller h. Right: balloon inflating — dr/dt smaller as r grows. Each with the constraint equation and its time derivative. Chalk on dark green board. Square 1:1.


## BB-NEW-627 — Power, current, and energy rates in circuits

**Subject:** physics | **Topic:** calculus | **Concept:** electrical-power-derivatives; P=dE/dt; I=dQ/dt; reactive-power | **Ground:** g1 | **Builds on:** [BB-NEW-208, BB-NEW-211, BB-NEW-591]

**Floor 0 (Idea):**
<p>In electricity, every important quantity is a derivative. Current I = dQ/dt (charge flowing per second). Power P = dE/dt = IV (energy delivered per second). In a capacitor, I = C dV/dt. In an inductor, V = L dI/dt. Electrical engineering is differentiation and integration applied to circuits.</p>

**Floor 1 (Concrete):**
<p><strong>Instantaneous power in AC:</strong> V(t) = V₀ sin ωt, I(t) = I₀ sin(ωt − φ). Instantaneous power: P(t) = V(t)I(t) = V₀I₀ sin ωt sin(ωt−φ) = ½V₀I₀[cos φ − cos(2ωt−φ)]. Average power over a cycle: P_avg = ½V₀I₀ cos φ = V_rms I_rms cos φ. The cos φ is the power factor — purely resistive (φ = 0) gives maximum average power; purely reactive (φ = 90°) gives zero average power (energy oscillates between source and load).</p>
<p><strong>Capacitor:</strong> Q = CV → I = dQ/dt = C dV/dt. If V = V₀ sin ωt, I = ωCV₀ cos ωt = I₀ cos ωt. Current leads voltage by 90°.</p>
<p><strong>Inductor:</strong> V = L dI/dt. If I = I₀ sin ωt, V = ωL I₀ cos ωt = V₀ cos ωt. Voltage leads current by 90°. These phase relationships come directly from differentiation of sine waves.</p>

**Floor 2 (Definition):**
<p><strong>Electrical derivatives:</strong> Current I = dQ/dt (the defining equation — 1 A = 1 C/s). Power P = dE/dt = IV (instantaneous). Capacitor: I = C dV/dt (current proportional to rate of voltage change). Inductor: V = L dI/dt (voltage proportional to rate of current change). In AC circuits, differentiation of sin ωt produces cos ωt = sin(ωt + 90°) — a 90° phase advance. Integration produces −cos ωt = sin(ωt − 90°) — a 90° phase lag. These phase shifts are the physical origin of reactance: X_C = 1/ωC (capacitive), X_L = ωL (inductive).</p>

**Floor 3 (In action):**
<p>Power factor correction saves billions. Industrial motors are inductive loads (current lags voltage, φ > 0, cos φ < 1). The power company must supply the apparent power V_rms I_rms, but only the real power P_avg does useful work. Capacitor banks bring φ closer to 0, reducing wasted current. The derivative relationship in capacitors (I = C dV/dt) is also how snubber circuits protect switches — the capacitor absorbs the voltage spike from a switched-off inductor by limiting dV/dt. In power electronics, PWM (pulse-width modulation) creates variable DC from fixed DC by switching on/off rapidly — the current through an inductor is the integral of voltage, so average current is controlled by duty cycle. Every power supply in every device is a calculus machine.</p>

**Image prompt:** A chalk drawing of an AC circuit with V(t) and I(t) sine waves, offset by phase φ. The instantaneous power P(t) = VI shown as a waveform oscillating at 2ω. The average power P_avg = V_rms I_rms cos φ marked as a horizontal line. Below: the capacitor relation I = C dV/dt and inductor relation V = L dI/dt with phase diagrams (phasors) showing 90° shifts. Chalk on dark green board. Square 1:1.
