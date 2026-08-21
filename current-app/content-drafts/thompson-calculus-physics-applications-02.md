# Thompson Calculus → Physics Applications — Batch 2: Differentiation in Circuits, Thermodynamics & Waves (7 BBs)

These 7 BBs extend differentiation into thermal rates, wave motion, fluid flow, and induced EMF. Every concept uses the chain rule and the derivative-as-rate-of-change. Total differentiation BBs now: 15 (pure) + 8 (kinematics) + 7 (circuits/thermo/waves) = 30.

**Builds on:** BB-NEW-580–595 (differentiation), BB-NEW-620–627 (kinematics derivatives), BB-NEW-260–274 (thermo), BB-NEW-200–216 (electricity), BB-NEW-310–324 (optics/waves), BB-NEW-567–574 (EM induction).

---

## BB-NEW-628 — Newton's law of cooling: the exponential temperature curve

**Subject:** physics | **Topic:** calculus | **Concept:** cooling-differential-equation; dT/dt=-k(T-T_s); exponential-approach | **Ground:** g0 | **Builds on:** [BB-NEW-525, BB-NEW-260, BB-NEW-587]

**Floor 0 (Idea):**
<p>Newton's law of cooling is a differential equation: dT/dt = −k(T − T_s). The rate of temperature change is proportional to the difference from ambient. Solve it by separation of variables, and you get exponential decay. Calculus converts a qualitative observation into a precise prediction of temperature at any time.</p>

**Floor 1 (Concrete):**
<p>dT/dt = −k(T − T_s). Separate: dT/(T − T_s) = −k dt. Integrate: ln|T − T_s| = −kt + C. Exponentiate: T − T_s = e^(−kt+C) = Ae^(−kt). At t = 0, T = T₀ → A = T₀ − T_s. Solution: T(t) = T_s + (T₀ − T_s)e^(−kt).</p>
<p>Coffee at 90 °C in a room at 20 °C. After 10 min, T = 60 °C. Find k: 60 = 20 + (90−20)e^(−10k) → 40 = 70 e^(−10k) → e^(−10k) = 4/7 → −10k = ln(4/7) → k = −ln(4/7)/10 ≈ 0.056 min⁻¹. At t = 20 min: T = 20 + 70 e^(−1.12) ≈ 20 + 23.3 = 43.3 °C. The derivative at t = 0: dT/dt = −0.056 × 70 = −3.9 °C/min. At t = 10: dT/dt = −0.056 × 40 = −2.24 °C/min. The cooling rate itself decays exponentially.</p>

**Floor 2 (Definition):**
<p><strong>Newton's law of cooling ODE:</strong> dT/dt = −k(T − T_s). General solution: T(t) = T_s + (T₀ − T_s)e^(−kt). The constant k = hA/mc (depends on surface area A, heat transfer coefficient h, mass m, specific heat c). The solution is an exponential approach to ambient — never quite reaching it. The <strong>time constant</strong> τ = 1/k is the time for the temperature excess to fall to 1/e ≈ 37% of its initial value. After 3τ, ~95% to equilibrium; after 5τ, ~99%. The derivative dT/dt = −k(T₀−T_s)e^(−kt) gives the instantaneous cooling rate — steepest at t = 0, flattening over time.</p>

**Floor 3 (In action):**
<p>The exponential cooling curve is universal. A corpse cools exponentially — forensic pathologists use it to estimate time of death (Glaister equation: time since death ≈ (37.5 − rectal T)/1.5 hours, a linear approximation). Engine blocks after shutdown follow the same curve — manufacturers test cool-down to ensure no warping from thermal gradients. Electronics have thermal time constants: a CPU heats and cools on the scale of seconds (small mass, small τ); a building on the scale of days (large thermal mass). The differential equation dT/dt = −k(T−T_s) is so fundamental that its solution appears in radioactive decay (replace T with N), capacitor discharge (replace T with V, k with 1/RC), and population dynamics. Same math, different physics.</p>

**Image prompt:** A chalk drawing of the temperature curve T(t) = T_s + (T₀−T_s)e^(−kt). The initial drop is steep, flattening toward the horizontal asymptote T_s. Tangent lines at t = 0, t = τ, t = 2τ showing decreasing slope. The ODE dT/dt = −k(T−T_s) displayed. The k formula: k = hA/mc. Chalk on dark green board. Square 1:1.


## BB-NEW-629 — Adiabatic processes: dP/dV from the gas law

**Subject:** physics | **Topic:** calculus | **Concept:** adiabatic-process; PV^gamma=constant; implicit-differentiation | **Ground:** g1 | **Builds on:** [BB-NEW-272, BB-NEW-592, BB-NEW-269]

**Floor 0 (Idea):**
<p>An adiabatic process compresses or expands a gas so fast that no heat flows in or out. The relationship PV^γ = constant replaces PV = constant (isothermal). γ = C_p/C_v, the ratio of specific heats. Differentiating this gives the slope of the adiabatic curve — steeper than the isothermal because temperature rises during compression.</p>

**Floor 1 (Concrete):**
<p>For an ideal gas undergoing adiabatic change: PV^γ = constant. Take the differential using implicit differentiation (or the product rule): d(PV^γ) = 0 → V^γ dP + P·γV^(γ−1) dV = 0. Divide by V^(γ−1): V dP + γP dV = 0 → dP/dV = −γP/V.</p>
<p>Compare with isothermal (PV = constant): d(PV) = 0 → V dP + P dV = 0 → dP/dV = −P/V.</p>
<p>Since γ > 1 (γ = 1.4 for diatomic gases like air), |dP/dV|_adiabatic = γ × |dP/dV|_isothermal. The adiabatic curve is steeper by a factor of γ. Numerically: at P = 100 kPa, V = 1 m³, isothermal slope = −100 kPa/m³; adiabatic slope = −140 kPa/m³. The difference is why a bicycle pump heats up — adiabatic compression raises temperature.</p>

**Floor 2 (Definition):**
<p>For a reversible <strong>adiabatic process</strong> (no heat exchange, dQ = 0): TV^(γ−1) = constant, PV^γ = constant, TP^((1−γ)/γ) = constant. γ = C_p/C_v (ratio of molar specific heats). Monatomic gas: γ = 5/3 ≈ 1.67. Diatomic: γ = 7/5 = 1.4. Polyatomic: γ → 1 (approaches isothermal). The slope of the PV curve: dP/dV = −γP/V (adiabatic) vs −P/V (isothermal). The area enclosed by a cycle on a PV diagram is the net work — and adiabatic legs are essential to the Carnot cycle (BB 274). The differentiation also applies to sound waves: the speed of sound c = √(γP/ρ) = √(γRT/M), which is larger than the isothermal prediction because the compressions and rarefactions are adiabatic.</p>

**Floor 3 (In action):**
<p>Adiabatic processes are everywhere in thermodynamics. A diesel engine compresses air to ~500 °C purely by adiabatic compression — no spark plug needed; the fuel auto-ignites. The Earth's atmosphere has an adiabatic lapse rate (~9.8 °C/km) — rising air expands adiabatically and cools. In a thunderstorm, the rising air is warmer than the environmental lapse rate (conditionally unstable), triggering convection. The distinction between adiabatic and isothermal is also critical for pneumatic systems: compressed air stored in a tank cools to ambient (isothermal over time), but the air tool using it experiences near-adiabatic expansion (cold exhaust). The factor γ is a finger-print of molecular structure — you can measure it from the speed of sound.</p>

**Image prompt:** A chalk drawing of a PV diagram with two curves through the same point: an isotherm (PV = constant, shallower) and an adiabat (PV^γ = constant, steeper). The slopes labelled: −P/V vs −γP/V. The differentiation dP/dV derived. A small pressure wave illustrated — compressions are adiabatic, giving c = √(γP/ρ). Chalk on dark green board. Square 1:1.


## BB-NEW-630 — Wave speed on a string: v = √(T/μ) from calculus

**Subject:** physics | **Topic:** calculus | **Concept:** wave-equation-derivative; string-wave-speed; second-derivative-wave | **Ground:** g2 | **Builds on:** [BB-NEW-585, BB-NEW-624]

**Floor 0 (Idea):**
<p>A pulse travels down a stretched string. Its speed depends only on the tension T and the linear density μ. But why v = √(T/μ)? The answer is Newton's second law applied to a tiny curved segment of string, using the small-angle approximation and the second derivative. Calculus reveals the wave equation: ∂²y/∂t² = v² ∂²y/∂x².</p>

**Floor 1 (Concrete):**
<p>Consider a small segment of string of length Δx, under tension T at both ends. The segment is curved — the tension forces at each end point in slightly different directions. The net vertical force: F_y ≈ T sin θ₂ − T sin θ₁ ≈ T(tan θ₂ − tan θ₁) = T(∂y/∂x|_{x+Δx} − ∂y/∂x|_{x}) ≈ T (∂²y/∂x²) Δx.</p>
<p>Mass of segment: μ Δx. Newton's second law: μ Δx (∂²y/∂t²) = T (∂²y/∂x²) Δx. Cancel Δx: ∂²y/∂t² = (T/μ) ∂²y/∂x². This is the <strong>wave equation</strong>, with wave speed v = √(T/μ).</p>
<p>For a guitar string: T ≈ 70 N, μ ≈ 0.005 kg/m (steel, 0.3 mm diameter). v = √(70/0.005) = √14000 ≈ 118 m/s. The fundamental frequency f = v/2L = 118/(2 × 0.65) ≈ 91 Hz (low E, approximately). Tighten to T = 140 N → v = √(28000) ≈ 167 m/s → f ≈ 128 Hz (C below middle C). Tuning is differentiation in action — changing d²y/dx² changes the restoring force.</p>

**Floor 2 (Definition):**
<p>The <strong>classical wave equation:</strong> ∂²y/∂t² = v² ∂²y/∂x². This second-order PDE describes waves on strings, sound in air, light in vacuum, and countless other phenomena. The wave speed v = √(restoring force parameter/inertia parameter). For strings: v = √(T/μ). For sound: v = √(B/ρ) (bulk modulus B). For light: v = c = 1/√(ε₀μ₀). The d'Alembert solution: any function y(x,t) = f(x−vt) + g(x+vt) satisfies the wave equation — f is rightward-travelling, g leftward. The second derivative with respect to x (curvature) drives the second derivative with respect to t (acceleration). Curvature → acceleration — the essence of wave propagation.</p>

**Floor 3 (In action):**
<p>The wave equation is one of the most important PDEs in physics. Seismologists solve it to locate earthquake epicentres from arrival-time differences of P and S waves. Ultrasound imaging sends pulses into the body and times the echoes — tissue stiffness (shear modulus) affects v, allowing tumours (stiffer) to be distinguished. In music, the harmonic series of a plucked string (frequencies f, 2f, 3f, ...) comes from solving the wave equation with fixed-end boundary conditions. The equation also appears in electromagnetism (Maxwell derived c = 1/√(ε₀μ₀) ≈ 3×10⁸ m/s from first principles), in fluid dynamics (water waves), and in quantum mechanics (Schrödinger's equation is a diffusion equation with an imaginary diffusion constant). The pattern is universal: curvature in space drives acceleration in time.</p>

**Image prompt:** A chalk drawing of a stretched string with a small segment of length Δx highlighted. Tension forces T at both ends, angles θ₁ and θ₂ labelled. The net vertical force derivation shown: T(∂²y/∂x²)Δx. The wave equation ∂²y/∂t² = v² ∂²y/∂x² displayed prominently. Speed v = √(T/μ). Chalk on dark green board. Square 1:1.


## BB-NEW-631 — Faraday's law: EMF as the derivative of flux

**Subject:** physics | **Topic:** calculus | **Concept:** Faraday-law-derivative; epsilon=-dPhi/dt; time-varying-flux | **Ground:** g1 | **Builds on:** [BB-NEW-567, BB-NEW-580, BB-NEW-586]

**Floor 0 (Idea):**
<p>Faraday's law ε = −dΦ/dt is the single most important derivative in electrical engineering. The induced voltage is the rate of change of magnetic flux. If flux changes sinusoidally (Φ = Φ₀ sin ωt), the EMF is its derivative: ε = −ωΦ₀ cos ωt. The faster the change, the larger the voltage. This is AC power generation in one equation.</p>

**Floor 1 (Concrete):**
<p>A coil of N = 100 turns, area A = 0.020 m², rotates at f = 50 Hz (ω = 314 rad/s) in B = 0.50 T. The flux: Φ(t) = NBA cos ωt = 100 × 0.50 × 0.020 × cos(314t) = 1.0 cos(314t) Wb. Induced EMF: ε = −dΦ/dt = −(−314 × 1.0 sin 314t) = 314 sin(314t) V. Peak EMF = 314 V. RMS = 314/√2 = 222 V. This is roughly how your wall outlet works.</p>
<p>If the same coil experiences a linearly changing B-field: B(t) = 0.50 + 0.10t (increasing at 0.10 T/s). Φ(t) = 100 × (0.50+0.10t) × 0.020 = 1.0 + 0.20t. ε = −dΦ/dt = −0.20 V — a constant DC voltage. A steady rate of flux change produces a steady EMF.</p>
<p>Transformer: primary voltage V_p = −N_p dΦ/dt. The same flux threads the secondary: V_s = −N_s dΦ/dt. Ratio: V_s/V_p = N_s/N_p. The derivative cancels — the turns ratio alone determines voltage transformation.</p>

**Floor 2 (Definition):**
<p><strong>Faraday's law in differential form:</strong> ε = −dΦ/dt. The EMF (in volts) equals the negative rate of change of magnetic flux (in webers per second). For a coil of N turns: ε = −N dΦ/dt. If Φ varies sinusoidally, ε leads by 90° (cos → sin). The magnitude depends on: rate of change of B, rate of change of area, or rate of change of angle. The minus sign is Lenz's law — the induced current opposes the flux change. In Maxwell's equations, the differential form is ∇ × E⃗ = −∂B⃗/∂t — the curl of the electric field equals the negative time derivative of the magnetic field.</p>

**Floor 3 (In action):**
<p>Every power plant on Earth uses Faraday's law. A steam turbine spins a magnet inside coils — the derivative of flux with respect to time is the output voltage. A guitar pickup is a Faraday-law sensor: the vibrating steel string changes the magnetic flux through a coil, and the derivative produces the audio signal. Metal detectors use Faraday's law: a transmitter coil creates an AC B-field; a metal object distorts it; a receiver coil picks up the derivative signal. Magnetic flow meters (used in chemical plants) measure the EMF induced when a conducting fluid flows through a B-field — the derivative is with respect to position, via the fluid's motion. The EMF is proportional to flow rate. Every time you flip a light switch, the tiny spark is a Faraday-law transient — the collapsing magnetic field of the house wiring induces a brief high voltage.</p>

**Image prompt:** A chalk drawing of a coil in a changing B-field. The flux Φ(t) shown as a sine wave. The EMF ε(t) = −dΦ/dt shown as a cosine wave (shifted 90°). Peak values labelled. A second diagram: a transformer with primary and secondary coils, flux Φ shared, V_s/V_p = N_s/N_p. The derivative relationship ∇ × E = −∂B/∂t. Chalk on dark green board. Square 1:1.


## BB-NEW-632 — Fluid flow: continuity and Bernoulli via derivatives

**Subject:** physics | **Topic:** calculus | **Concept:** continuity-equation; Bernoulli-derivation; fluid-dynamics-calculus | **Ground:** g2 | **Builds on:** [BB-NEW-585, BB-NEW-624]

**Floor 0 (Idea):**
<p>Fluid dynamics is calculus in pipes. The continuity equation (A₁v₁ = A₂v₂) comes from mass conservation: the derivative of mass in a control volume equals inflow minus outflow. Bernoulli's equation (P + ½ρv² + ρgh = constant) comes from integrating Euler's equation along a streamline. Both are calculus statements.</p>

**Floor 1 (Concrete):**
<p><strong>Continuity:</strong> For incompressible flow, the volume flow rate Q = Av is constant along a streamline. A₁v₁ = A₂v₂. If a pipe narrows from radius 5 cm (A₁ = 0.00785 m²) to 2 cm (A₂ = 0.00126 m²), with v₁ = 2 m/s, then v₂ = v₁(A₁/A₂) = 2 × 6.25 = 12.5 m/s. The velocity derivative dv/dx is negative (deceleration) before a widening, positive (acceleration) before a narrowing. The maximum dv/dx occurs where the cross-section changes most rapidly.</p>
<p><strong>Bernoulli:</strong> Along a streamline: P + ½ρv² + ρgh = constant. Derivation from Newton's second law for a fluid element: (P + dP)A − PA − ρgA dz = ρA dx (dv/dt). Using dv/dt = v dv/dx (chain rule), this simplifies to dP + ρv dv + ρg dz = 0. Integrate: P + ½ρv² + ρgz = constant. Each term is an energy density (J/m³): pressure energy, kinetic energy, potential energy.</p>

**Floor 2 (Definition):**
<p><strong>Continuity equation</strong> (incompressible): ∂(Av)/∂x = 0 → A₁v₁ = A₂v₂. For compressible flow: ρ₁A₁v₁ = ρ₂A₂v₂. <strong>Bernoulli's equation</strong> (steady, inviscid, incompressible, along a streamline): P + ½ρv² + ρgh = constant. The derivative form: dP/dx = −ρv dv/dx − ρg dh/dx — pressure decreases where velocity increases (Venturi effect). Applications: aerofoil lift (faster air over top → lower pressure → upward force), atomisers (fast air draws liquid up), Pitot tubes (measure airspeed from pressure difference). The calculus unifies continuity (conservation of mass) and Bernoulli (conservation of energy) into a complete description of ideal fluid flow.</p>

**Floor 3 (In action):**
<p>The Venturi effect — a direct consequence of Bernoulli — is used in carburettors (fuel drawn into airflow), paint sprayers, and ventricular assist devices (medical pumps). The narrowing of a river (rapids) accelerates flow; the widening (pool) decelerates it. In weather, wind accelerating through a mountain pass (Venturi) creates low pressure and strong winds. Aircraft wings exploit Bernoulli: the curved upper surface forces air to travel faster, lowering pressure above the wing, generating lift. The Pitot-static tube on every aircraft measures airspeed by comparing stagnation pressure (½ρv²) to static pressure. The derivative relationship between area, velocity, and pressure is the daily toolkit of aeronautical, chemical, and civil engineers.</p>

**Image prompt:** A chalk drawing of a pipe narrowing and widening. At the wide section: large A, small v, high P. At the narrow section: small A, large v, low P. The continuity equation A₁v₁ = A₂v₂. Bernoulli's equation P + ½ρv² + ρgh = constant. A streamline with pressure, velocity, and height annotated at three points. Chalk on dark green board. Square 1:1.


## BB-NEW-633 — Simple harmonic motion: position, velocity, acceleration as derivatives

**Subject:** physics | **Topic:** calculus | **Concept:** SHM-derivatives; sinusoidal-kinematics; phase-relationships | **Ground:** g1 | **Builds on:** [BB-NEW-621, BB-NEW-586, BB-NEW-624]

**Floor 0 (Idea):**
<p>Simple harmonic motion is the purest expression of calculus in mechanics. Position x = A cos ωt. Differentiate once: v = −Aω sin ωt. Differentiate again: a = −Aω² cos ωt = −ω²x. Each derivative shifts the phase by 90° and scales by ω. The acceleration is proportional to the negative of position — the hallmark of SHM.</p>

**Floor 1 (Concrete):**
<p>A mass m = 0.50 kg on a spring with k = 200 N/m. ω = √(k/m) = √(400) = 20 rad/s. Period T = 2π/ω = 0.314 s. Amplitude A = 0.10 m.</p>
<p>x(t) = 0.10 cos(20t). At t = 0: x = 0.10 m (maximum). v = −0.10 × 20 sin(0) = 0. a = −0.10 × 400 cos(0) = −40 m/s² (maximum restoring force).</p>
<p>At t = T/4 = 0.0785 s (20t = π/2): x = 0.10 cos(π/2) = 0. v = −2.0 sin(π/2) = −2.0 m/s (max speed). a = −40 cos(π/2) = 0.</p>
<p>The phase relationships: velocity leads position by 90° (v is max when x = 0). Acceleration leads velocity by another 90° (and is 180° out of phase with x — opposite direction). Energy: KE = ½mv² = ½(0.5)(4 sin²20t) = sin²20t J. PE = ½kx² = ½(200)(0.01 cos²20t) = cos²20t J. Total E = 1 J (constant). The derivative x → v → a reveals the complete dynamics.</p>

**Floor 2 (Definition):**
<p><strong>SHM kinematics via calculus:</strong> x(t) = A cos(ωt + φ). v(t) = dx/dt = −Aω sin(ωt + φ) = Aω cos(ωt + φ + π/2). a(t) = dv/dt = d²x/dt² = −Aω² cos(ωt + φ) = −ω² x. The defining ODE: d²x/dt² + ω²x = 0. ω = √(k/m) for springs, ω = √(g/L) for simple pendulums, ω = √(mgd/I) for physical pendulums. Maximum speed v_max = Aω (at equilibrium). Maximum acceleration a_max = Aω² (at extremes). The derivative chain scales by ω at each step: multiply amplitude by ω, advance phase by π/2.</p>

**Floor 3 (In action):**
<p>SHM is the universal language of oscillation. The balance wheel of a mechanical watch oscillates at ω = √(κ/I) (torsion constant κ). A quartz crystal oscillates piezoelectrically at 32,768 Hz — exactly 2¹⁵, so a 15-stage binary divider produces a 1 Hz tick. Car suspension: m ≈ 300 kg/wheel, k ≈ 30,000 N/m → ω ≈ 10 rad/s → f ≈ 1.6 Hz. The shock absorber provides damping (adds a −bv term, changing the ODE to d²x/dt² + (b/m)dx/dt + ω²x = 0). Seismic vibration isolators for buildings use massive concrete blocks on rubber bearings — tuned to ω ≪ earthquake frequencies. Every oscillating system — from a tuning fork to a neutrino oscillation — is described by the same second-order ODE and the same derivative relationships.</p>

**Image prompt:** A chalk drawing of a mass-spring system. Three graphs stacked vertically: x(t) = A cos ωt, v(t) = −Aω sin ωt, a(t) = −Aω² cos ωt. Phase shifts of 90° marked between each. The chain: differentiate ↓ from x to v to a. The ODE d²x/dt² + ω²x = 0. ω = √(k/m). Chalk on dark green board. Square 1:1.


## BB-NEW-634 — The continuum: from discrete masses to continuous distributions

**Subject:** physics | **Topic:** calculus | **Concept:** continuous-mass-distributions; linear-density; area-density; from-summation-to-integration | **Ground:** g1 | **Builds on:** [BB-NEW-600, BB-NEW-602, BB-NEW-48]

**Floor 0 (Idea):**
<p>A textbook problem gives you point masses. Real objects are continuous — mass spread over a volume. To handle them, you replace the discrete sum Σ m_i with the integral ∫ dm, where dm = λ dx (linear), σ dA (areal), or ρ dV (volumetric). The derivative of mass with respect to position gives the density: λ = dm/dx, σ = dm/dA, ρ = dm/dV.</p>

**Floor 1 (Concrete):**
<p><strong>Centre of mass of a non-uniform rod:</strong> A rod of length L = 2.0 m has linear density λ(x) = 3 + 2x kg/m (heavier at one end). Total mass: M = ∫[0,L] λ(x) dx = ∫[0,2] (3+2x) dx = [3x + x²]₀² = 6 + 4 = 10 kg. Centre of mass: x_cm = (1/M)∫ x dm = (1/M)∫[0,2] x·λ(x) dx = (1/10)∫[0,2] (3x + 2x²) dx = (1/10)[3x²/2 + 2x³/3]₀² = (1/10)(6 + 16/3) = (1/10)(34/3) ≈ 1.13 m. The COM is shifted toward the heavier end.</p>
<p>Compare with uniform rod (λ = constant = 5): M = 5 × 2 = 10 kg, x_cm = (1/10) × 5 × [x²/2]₀² = (1/10) × 10 = 1.0 m — exactly at the centre.</p>

**Floor 2 (Definition):**
<p><strong>Density as derivative:</strong> Linear density λ = dm/dx (kg/m) — the rate at which mass accumulates along a line. Areal density σ = dm/dA (kg/m²). Volumetric density ρ = dm/dV (kg/m³). For a uniform object, λ, σ, ρ are constants and M = λL, σA, ρV. For non-uniform objects, M = ∫ dm = ∫ λ(x) dx (1D), ∫∫ σ dA (2D), ∫∫∫ ρ dV (3D). The integral converts the continuous distribution into an equivalent total mass. The derivative in reverse: given M(x) = mass from 0 to x, then λ(x) = dM/dx — the density is the derivative of the cumulative mass function.</p>

**Floor 3 (In action):**
<p>The density-as-derivative concept appears across physics. Charge density: λ = dQ/dx, σ = dQ/dA, ρ = dQ/dV — the integral ∫ ρ dV gives total charge, and the electric field of a continuous charge distribution is a triple integral. Current density J = dI/dA — the current through a surface is the surface integral of J. Probability density: f(x) = dF/dx where F is the CDF — the PDF is the derivative of the cumulative distribution. In fluid dynamics, mass flow rate ṁ = ∫ ρv dA. The conceptual jump from "sum of discrete pieces" to "integral of continuous distribution" is the single most important application of integration in physics — it turns textbook idealisations into real-world calculations.</p>

**Image prompt:** A chalk drawing of a non-uniform rod with λ(x) = 3+2x labelled along its length. The density increasing linearly (more dots per unit length at the right end). The integrals: M = ∫ λ dx, x_cm = (1/M)∫ xλ dx. A comparison with a uniform rod (constant λ). The derivative relationship: λ = dM/dx. Chalk on dark green board. Square 1:1.
