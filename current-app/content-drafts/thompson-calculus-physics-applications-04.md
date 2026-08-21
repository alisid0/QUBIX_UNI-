# Thompson Calculus → Physics Applications — Batch 4: Integration in Fields, Fluids & Probability (7 BBs)

The final 7 BBs complete the physics-integration arc. Gravitational and electric fields, magnetic flux, fluid flow, and the Gaussian integral in kinetic theory and statistics. Total integration physics BBs: 15 (pure) + 8 (kinematics) + 7 (fields/probability) = 30. Combined with differentiation's 30, the full calculus-in-physics library = 60 BBs.

**Builds on:** BB-NEW-600–615 (integration), BB-NEW-640–647 (integration physics), BB-NEW-500–515 (gravitation), BB-NEW-200–216 (electricity), BB-NEW-550–574 (magnetism), BB-NEW-260–274 (thermo).

---

## BB-NEW-648 — Gravitational field of a continuous mass: g = ∫ G dm/r²

**Subject:** physics | **Topic:** calculus | **Concept:** gravitational-field-integral; continuous-mass-distribution; superposition-integral | **Ground:** g2 | **Builds on:** [BB-NEW-500, BB-NEW-502, BB-NEW-600]

**Floor 0 (Idea):**
<p>A point mass M creates gravitational field g = GM/r². For an extended body (a planet, a rod, a spherical shell), you integrate over all its mass elements: g⃗ = G ∫ dm r̂/r². Newton invented calculus largely to solve this integral — to prove that a uniform spherical shell acts like a point mass at its centre to any external point.</p>

**Floor 1 (Concrete):**
<p><strong>Spherical shell:</strong> A thin shell of radius R, mass M. Field at external point distance r > R: each mass element dq (analogy to electric) produces dg = G dm/s² where s is the distance to the field point. By symmetry, the field is radial. The integral (using an angular sweep) gives g = GM/r² for r > R — exactly as if all mass were concentrated at the centre. For r < R (inside the shell): the integral gives g = 0 — the gravitational field inside a uniform spherical shell is exactly zero. Newton proved this geometrically; we prove it by integration.</p>
<p><strong>Solid sphere:</strong> For r < R, only the mass inside radius r contributes: M(r) = M(r/R)³. g(r) = GM(r)/r² = GMr/R³ — the field increases linearly from 0 at centre to GM/R² at surface. For r > R: g = GM/r².</p>
<p><strong>Infinite rod:</strong> linear density λ. g(r) = 2Gλ/r (perpendicular distance r). The 1/r dependence, not 1/r², because the source is a line, not a point.</p>

**Floor 2 (Definition):**
<p><strong>Gravitational field of a continuous mass distribution:</strong> g⃗(r⃗) = G ∫ dm (r⃗' − r⃗)/|r⃗' − r⃗|³, where the integral is over all mass elements dm at positions r⃗'. For 1D (line): dm = λ dx. For 2D (sheet): dm = σ dA. For 3D (volume): dm = ρ dV. <strong>Shell theorem:</strong> A uniform spherical shell produces g = 0 inside and g = GM/r² outside (as if a point mass). <strong>Solid sphere:</strong> g_inside = GMr/R³, g_outside = GM/r². The field is the negative gradient of the potential: g⃗ = −∇V, where V = −G ∫ dm/r. Calculating the vector integral for g⃗ is harder than the scalar integral for V followed by differentiation.</p>

**Floor 3 (In action):**
<p>The shell theorem is why you'd be weightless at Earth's centre — g = 0. It's also why gravity is slightly weaker down a deep mine (the mass above you pulls upward, partially cancelling). In geophysics, gravity surveys measure tiny variations in g (milligals) to map subsurface density — oil, gas, and mineral deposits show as negative anomalies; dense ore bodies as positive. The data is inverted using the integral g = G ∫ ρ(r') (z'−z)/|r'−r|³ d³r' — a computationally intensive 3D integration. The same integral, with G → 1/(4πε₀), gives the electric field of any charge distribution. The shell theorem has an electromagnetic twin: a uniformly charged spherical shell produces E = 0 inside and E = kQ/r² outside.</p>

**Image prompt:** A chalk drawing of a spherical shell with mass elements dm distributed on its surface. A field point outside (distance r > R) showing the radial g = GM/r². A field point inside showing g = 0. The solid sphere with g(r) graph: linear increase from 0 to surface, then 1/r² decay. The integral g⃗ = G ∫ dm r̂/r². Chalk on dark green board. Square 1:1.


## BB-NEW-649 — Magnetic flux as a surface integral: Φ = ∫ B·dA

**Subject:** physics | **Topic:** calculus | **Concept:** magnetic-flux-integral; surface-integral; Gauss-law-magnetism | **Ground:** g2 | **Builds on:** [BB-NEW-566, BB-NEW-567, BB-NEW-600]

**Floor 0 (Idea):**
<p>Magnetic flux Φ = BA cos θ only works for uniform B and flat surfaces. For curved surfaces in non-uniform fields, you need the surface integral: Φ = ∫∫ B⃗·dA⃗. Each tiny patch dA has its own B and its own orientation. Summing them all gives the total flux — which, through any closed surface, is always exactly zero (Gauss's law for magnetism).</p>

**Floor 1 (Concrete):**
<p><strong>Uniform B, flat surface:</strong> B = 0.50 T, area A = 0.10 m², angle 30° between B and surface normal. Φ = BA cos 30° = 0.50 × 0.10 × 0.866 = 0.0433 Wb. The integral reduces to multiplication.</p>
<p><strong>Non-uniform B:</strong> B(r) = k/r (field around a wire). Flux through a rectangular loop of width w from r₁ to r₂: Split into vertical strips of width dr. dA = w dr, B(r) = μ₀I/2πr. Φ = ∫[r₁,r₂] (μ₀I/2πr)(w dr) = (μ₀Iw/2π) ln(r₂/r₁). The 1/r dependence gives a logarithmic flux.</p>
<p><strong>Gauss's law for magnetism:</strong> Through any closed surface, ∮ B⃗·dA⃗ = 0. For a bar magnet: every field line that exits the north pole eventually enters the south pole — the net flux is zero. For a closed surface around a current loop: flux in = flux out. There are no magnetic monopoles to create net flux.</p>

**Floor 2 (Definition):**
<p><strong>Magnetic flux</strong> through a surface: Φ = ∫∫_S B⃗·dA⃗. dA⃗ = n̂ dA, where n̂ is the unit normal to the surface element. For a closed surface: Φ_net = ∮ B⃗·dA⃗ = 0 (Gauss's law for magnetism — one of Maxwell's equations). For an open surface bounded by a loop, Φ is the flux linking the loop — the quantity in Faraday's law ε = −dΦ/dt. The surface integral handles curved surfaces (spheres, cylinders) and non-uniform fields. In Cartesian: dA = dx dy (xy-plane), dx dz (xz-plane), dy dz (yz-plane) with appropriate sign from orientation.</p>

**Floor 3 (In action):**
<p>Magnetic flux integrals are central to electrical engineering. Transformer design calculates Φ = ∫ B·dA through the core cross-section — the flux must not saturate the iron (B < B_sat ≈ 1.5 T). MRI machines map B₀ uniformity by measuring flux through arrays of small pickup coils — inhomogeneity > 10 ppm requires shimming. In fusion reactors (tokamaks), the poloidal flux ψ = ∫ B_θ dA determines the magnetic surfaces that confine the plasma. The fact that ∮ B·dA = 0 over any closed surface is tested to extraordinary precision — searches for magnetic monopoles continue, and any detection would rewrite physics. Gauss's law for magnetism is the statement that magnetic field lines have no beginning and no end.</p>

**Image prompt:** A chalk drawing of a curved surface in a non-uniform B-field. Small patches dA with B vectors at each, varying in magnitude and direction. The surface integral Φ = ∫∫ B·dA. A closed surface around a bar magnet with flux lines entering and exiting — net = 0. A rectangular loop near a wire with B ∝ 1/r, flux ∝ ln(r₂/r₁). Chalk on dark green board. Square 1:1.


## BB-NEW-650 — Fluid flow rate: volumetric flux Q = ∫ v·dA

**Subject:** physics | **Topic:** calculus | **Concept:** volumetric-flow-rate-integral; flux-integral; discharge | **Ground:** g1 | **Builds on:** [BB-NEW-600, BB-NEW-632]

**Floor 0 (Idea):**
<p>If water flows through a pipe, the volumetric flow rate Q = Av (area × average velocity). But if the velocity varies across the cross-section — faster in the centre, slower near the walls — you integrate: Q = ∫ v dA. The integral sums the flow through each tiny patch of the cross-sectional area.</p>

**Floor 1 (Concrete):**
<p><strong>Parabolic velocity profile (laminar flow in a pipe):</strong> v(r) = v_max(1 − r²/R²), where R is the pipe radius. The flow through a thin ring of radius r, thickness dr: dA = 2πr dr. dQ = v(r) dA = v_max(1 − r²/R²)(2πr dr). Q = ∫[0,R] v_max 2πr (1 − r²/R²) dr = 2πv_max ∫[0,R] (r − r³/R²) dr = 2πv_max[R²/2 − R⁴/(4R²)] = 2πv_max(R²/2 − R²/4) = ½πR²v_max. The average velocity v_avg = Q/A = v_max/2 — half the centreline speed. For turbulent flow, the profile is flatter and v_avg ≈ 0.8v_max.</p>
<p><strong>River cross-section:</strong> Depth varies; velocity varies with depth. Q = ∫∫ v(y,z) dy dz. Measured by dividing the cross-section into vertical strips, measuring depth and velocity in each, and summing (or numerically integrating).</p>

**Floor 2 (Definition):**
<p><strong>Volumetric flow rate (discharge):</strong> Q = ∫_A v⃗·dA⃗ = ∫∫ v dA (for flow normal to the area). Units: m³/s. For variable velocity over a cross-section, Q = ∫ v dA. The average velocity: v_avg = Q/A. <strong>Mass flow rate:</strong> ṁ = ∫ ρv dA (kg/s). For incompressible flow in a pipe network, continuity demands Q_in = Q_out at each junction (Kirchhoff's current law analogue). The integral form of the continuity equation: ∂/∂t ∫ ρ dV + ∮ ρv⃗·dA⃗ = 0 — the rate of change of mass in a control volume equals net inflow.</p>

**Floor 3 (In action):**
<p>Flow rate integrals are measured continuously in every water treatment plant, oil pipeline, and hydroelectric dam. A Venturi meter measures Q by creating a constriction — the pressure difference ΔP ∝ Q² (from Bernoulli). In medicine, cardiac output (CO ≈ 5 L/min) is the integral of blood velocity over the aortic cross-section, measured by Doppler ultrasound. River gauging stations measure Q to forecast floods — a stage-discharge relationship (rating curve) converts water level to flow rate. In aeronautics, the mass flow through a jet engine determines thrust: F = ṁ(v_exhaust − v_inlet). Every "how much flows?" question is a surface integral of velocity over area.</p>

**Image prompt:** A chalk drawing of a pipe cross-section with the parabolic velocity profile v(r) = v_max(1−r²/R²). A thin ring element of radius r and thickness dr shown: dA = 2πr dr. The integral Q = ∫ v dA = ½πR²v_max. The average velocity v_avg = v_max/2. Chalk on dark green board. Square 1:1.


## BB-NEW-651 — The Gaussian integral: ∫ e^(−x²) dx and its physics

**Subject:** physics | **Topic:** calculus | **Concept:** gaussian-integral; normal-distribution; kinetic-theory-integral | **Ground:** g2 | **Builds on:** [BB-NEW-600, BB-NEW-612, BB-NEW-270]

**Floor 0 (Idea):**
<p>The integral ∫[−∞,∞] e^(−x²) dx = √π ≈ 1.77245 is the most famous definite integral in physics. It cannot be evaluated by finding an elementary antiderivative — there is none. The trick: square it, convert to polar coordinates, and integrate. This integral appears everywhere: kinetic theory, quantum mechanics, statistics, and diffusion.</p>

**Floor 1 (Concrete):**
<p><strong>The classic derivation:</strong> Let I = ∫[−∞,∞] e^(−x²) dx. Then I² = ∫[−∞,∞] e^(−x²) dx ∫[−∞,∞] e^(−y²) dy = ∫∫[−∞,∞]² e^(−(x²+y²)) dx dy. Convert to polar: x²+y² = r², dx dy = r dr dθ. I² = ∫[0,2π] ∫[0,∞] e^(−r²) r dr dθ = 2π ∫[0,∞] r e^(−r²) dr. Let u = r², du = 2r dr: I² = 2π ∫[0,∞] e^(−u)(du/2) = π ∫[0,∞] e^(−u) du = π(1) = π. So I = √π.</p>
<p><strong>Scaled version:</strong> ∫[−∞,∞] e^(−ax²) dx = √(π/a). By letting u = x√a.</p>
<p><strong>Maxwell-Boltzmann speed distribution:</strong> f(v) = 4π(m/2πkT)^(3/2) v² e^(−mv²/2kT). Normalisation: ∫[0,∞] f(v) dv = 1 — verified using the Gaussian integral and its moment ∫[0,∞] v² e^(−av²) dv = √π/(4a^(3/2)). The average kinetic energy ⟨½mv²⟩ = (3/2)kT emerges from these integrals.</p>

**Floor 2 (Definition):**
<p>The <strong>Gaussian integral:</strong> ∫[−∞,∞] e^(−ax²) dx = √(π/a) for a > 0. <strong>Moments:</strong> ∫[−∞,∞] x²ⁿ e^(−ax²) dx = (2n−1)!!/2ⁿ × √(π/a^(2n+1)) for integer n. Odd moments (x^(2n+1)) = 0 by symmetry. The <strong>error function</strong> erf(x) = (2/√π)∫[0,x] e^(−t²) dt tabulates the partial integral. The Gaussian is the only function (up to scaling) whose Fourier transform is itself — a deep symmetry that makes it central to quantum mechanics and signal processing.</p>

**Floor 3 (In action):**
<p>The Gaussian integral powers statistical physics. The partition function Z = ∫ e^(−E/kT) dΩ often contains Gaussian integrals for quadratic energies (kinetic energy, harmonic oscillators). In quantum mechanics, the ground state of the harmonic oscillator is ψ₀(x) ∝ e^(−mωx²/2ħ), and ⟨x²⟩ = ∫ x²|ψ₀|² dx = ħ/2mω — a Gaussian integral. The uncertainty principle Δx Δp ≥ ħ/2 is saturated by Gaussian wavefunctions. In statistics, the normal distribution N(μ,σ²) has PDF f(x) = (1/√(2πσ²))e^(−(x−μ)²/2σ²), and ∫ f dx = 1 by the Gaussian integral. In diffusion, a point-source spreads as a Gaussian: c(x,t) = (M/√(4πDt))e^(−x²/4Dt). The √π is everywhere.</p>

**Image prompt:** A chalk drawing of the Gaussian bell curve y = e^(−x²). The area shaded from −∞ to ∞ = √π. The polar coordinates trick illustrated: I² = ∫∫ e^(−(x²+y²)) dx dy → 2π ∫ r e^(−r²) dr = π. The Maxwell-Boltzmann distribution curve with the integral normalisation. Chalk on dark green board. Square 1:1.


## BB-NEW-652 — Entropy and the integral of dQ/T

**Subject:** physics | **Topic:** calculus | **Concept:** entropy-integral; Clausius-inequality; reversible-process | **Ground:** g2 | **Builds on:** [BB-NEW-273, BB-NEW-600, BB-NEW-272]

**Floor 0 (Idea):**
<p>Entropy S is the integral of dQ_rev/T — the heat added in a reversible process, divided by temperature, summed over the path. ΔS = ∫ dQ_rev/T. Unlike heat and work, which depend on the path, the entropy change between two states is path-independent. The integral is evaluated along any reversible path connecting them.</p>

**Floor 1 (Concrete):**
<p><strong>Isothermal reversible expansion</strong> of an ideal gas: T constant. Q = W = nRT ln(V₂/V₁) (since ΔU = 0 for ideal gas isothermal). ΔS = Q/T = nR ln(V₂/V₁). For 1 mole expanding from 10 L to 20 L at 300 K: ΔS = (1)(8.314) ln(2) = 5.76 J/K.</p>
<p><strong>Heating at constant pressure:</strong> dQ_rev = nC_p dT. ΔS = ∫[T₁,T₂] nC_p dT/T = nC_p ln(T₂/T₁). For 1 mole of diatomic gas (C_p = 7R/2) heated from 300 K to 600 K: ΔS = (1)(29.1) ln(2) = 20.2 J/K.</p>
<p><strong>Phase change</strong> (reversible, isothermal): ΔS = mL/T. Melting 1 kg of ice at 273 K: ΔS = (1)(334,000)/273 = 1223 J/K. Boiling 1 kg of water at 373 K: ΔS = (1)(2,260,000)/373 = 6059 J/K. Enormous entropy increase — the gas phase is vastly more disordered.</p>

**Floor 2 (Definition):**
<p><strong>Entropy change:</strong> ΔS = ∫[i→f] dQ_rev/T. The integral must be evaluated along a <strong>reversible</strong> path between the initial and final states. Since entropy is a state function, any reversible path gives the same ΔS. The <strong>Clausius inequality:</strong> ∮ dQ/T ≤ 0 for any cyclic process (= 0 for reversible, < 0 for irreversible). For an isolated system, ΔS ≥ 0 (second law). The integral is evaluated by expressing dQ_rev in terms of state variables: for ideal gases, dQ_rev = nC_v dT + P dV (first law with dW = P dV). Then ΔS = nC_v ln(T₂/T₁) + nR ln(V₂/V₁).</p>

**Floor 3 (In action):**
<p>Entropy integrals quantify irreversibility. A hot metal block cooling in air: the metal loses entropy ΔS_metal = mc ln(T_f/T_i) < 0; the air gains entropy ΔS_air = Q/T_air > 0; the net ΔS_universe > 0. Every real process increases universal entropy. Mixing of two different gases increases entropy by ΔS = −nR(x₁ ln x₁ + x₂ ln x₂) — the entropy of mixing. In information theory, Shannon entropy H = −Σ p_i log p_i is the same mathematical form (log instead of ln, probabilities instead of mole fractions). The integral ∫ dQ/T is the bridge from macroscopic thermodynamics (heat engines) to statistical mechanics (Boltzmann's S = k ln W).</p>

**Image prompt:** A chalk drawing of a PV diagram with an isothermal expansion path (hyperbola). The area under the curve = Q = W = nRT ln(V₂/V₁). The entropy change ΔS = Q/T. A second path: isobaric heating on a TS diagram — area under the curve = ΔS = nC_p ln(T₂/T₁). The integral formula ΔS = ∫ dQ_rev/T. Chalk on dark green board. Square 1:1.


## BB-NEW-653 — Probability density: expectation as an integral

**Subject:** physics | **Topic:** calculus | **Concept:** probability-integral; expectation-value; continuous-random-variable | **Ground:** g2 | **Builds on:** [BB-NEW-600, BB-NEW-651]

**Floor 0 (Idea):**
<p>When a quantity is continuously distributed (position of a gas molecule, lifetime of a radioactive nucleus, measurement error), its average is an integral: ⟨x⟩ = ∫ x f(x) dx, where f(x) is the probability density function. The integral replaces the discrete sum Σ x_i P(x_i). All of statistical physics is integration over probability distributions.</p>

**Floor 1 (Concrete):**
<p><strong>Exponential distribution</strong> (radioactive decay): f(t) = λe^(−λt) for t ≥ 0. Mean lifetime: ⟨t⟩ = ∫[0,∞] t·λe^(−λt) dt = 1/λ. (Integration by parts: u = t, dv = λe^(−λt) → 1/λ). Standard deviation also 1/λ. For ¹⁴C (half-life 5730 y): λ = ln 2/5730 ≈ 1.21×10⁻⁴ y⁻¹, ⟨t⟩ = 8270 y.</p>
<p><strong>Maxwell-Boltzmann speed distribution:</strong> f(v) = 4π(m/2πkT)^(3/2) v² e^(−mv²/2kT). Mean speed: ⟨v⟩ = ∫[0,∞] v f(v) dv = √(8kT/πm). RMS speed: v_rms = √⟨v²⟩ = √(3kT/m). Most probable speed (mode): v_mp = √(2kT/m). Three different averages — all from integrals of the same distribution.</p>
<p><strong>Quantum mechanics:</strong> For a particle with wavefunction ψ(x), the probability density is |ψ(x)|². ⟨x⟩ = ∫ x |ψ(x)|² dx. ⟨p⟩ = ∫ ψ*(−iħ d/dx)ψ dx. Expectation values are integrals weighted by the probability density.</p>

**Floor 2 (Definition):**
<p>For a continuous random variable X with PDF f(x) (f(x) ≥ 0, ∫ f(x) dx = 1): <strong>Expectation</strong> (mean) E[X] = ⟨x⟩ = ∫ x f(x) dx. <strong>Variance:</strong> Var(X) = ⟨(x−μ)²⟩ = ∫ (x−μ)² f(x) dx = ⟨x²⟩ − ⟨x⟩². <strong>General moment:</strong> ⟨xⁿ⟩ = ∫ xⁿ f(x) dx. The integral formulation unifies discrete probability (sum) and continuous probability (integral). Normalisation: ∫[all space] f(x) dx = 1 is required for a valid PDF. In physics, ⟨Q⟩ = ∫ Q(x) ρ(x) dx where ρ is the probability density in phase space.</p>

**Floor 3 (In action):**
<p>Every statistical prediction in physics is an integral. The pressure of an ideal gas: P = (1/3)nm⟨v²⟩ — the average of v² over the Maxwell-Boltzmann distribution. The energy density of black-body radiation: u = ∫ Planck spectrum dν — integrating over frequency gives the Stefan-Boltzmann law. In quantum field theory, the vacuum expectation value of an operator is a path integral over all field configurations. In finance, the fair price of an option is the discounted expected payoff: C = e^(−rT) ∫ max(S−K,0) f(S) dS. The integral of a function against a probability density is the prototypical "weighted average" — and it's how physics connects microscopic randomness to macroscopic observables.</p>

**Image prompt:** A chalk drawing of a probability density f(x) plotted. The shaded area under the curve = 1 (normalisation). The mean ⟨x⟩ marked as a vertical line — the balance point of the distribution. The Maxwell-Boltzmann distribution with ⟨v⟩, v_rms, and v_mp marked. The integral formulas: ∫ f dx = 1, ⟨x⟩ = ∫ x f dx, ⟨x²⟩ = ∫ x² f dx. Chalk on dark green board. Square 1:1.


## BB-NEW-654 — Calculus in physics: the unified picture

**Subject:** physics | **Topic:** calculus | **Concept:** calculus-unification; derivative-vs-integral-physics; master-key | **Ground:** g1 | **Builds on:** [BB-NEW-620 through BB-NEW-653]

**Floor 0 (Idea):**
<p>After 35 BBs of calculus applied to physics, here is the unified picture. Differentiation asks "how fast?" — the rate of change at an instant. Integration asks "how much?" — the accumulation over an interval. They are inverse operations, and together they describe every rate-and-accumulation relationship in the physical world.</p>

**Floor 1 (Concrete):**
<p>Here is the master table — every physics relationship that is a derivative/integral pair:</p>
<p>Position ←∫→ Velocity ←∫→ Acceleration: s(t) = ∫ v dt, v = ds/dt, v(t) = ∫ a dt, a = dv/dt.</p>
<p>Momentum ←∫→ Force: p = ∫ F dt, F = dp/dt. Work ←∫→ Power: W = ∫ F dx, P = dW/dt. Energy ←∫→ Power: E = ∫ P dt, P = dE/dt.</p>
<p>Charge ←→ Current: Q = ∫ I dt, I = dQ/dt. Flux ←→ EMF: Φ = ∫ B·dA, ε = −dΦ/dt.</p>
<p>Mass ←→ Density: M = ∫ ρ dV, ρ = dM/dV. Centre of mass: x_cm = (∫ x dm)/M. Moment of inertia: I = ∫ r² dm.</p>
<p>Entropy: ΔS = ∫ dQ_rev/T. Probability: ⟨x⟩ = ∫ x f(x) dx. Electric potential: V = ∫ k dq/r.</p>
<p>Every one of these is either: (a) a derivative expressing an instantaneous rate, or (b) an integral accumulating over space or time. The two columns are mirrors — differentiation and integration are the forward and backward directions of the same physical relationships.</p>

**Floor 2 (Definition):**
<p><strong>The calculus duality in physics:</strong> Every fundamental law can be expressed in two equivalent forms: an instantaneous (differential) form and an accumulated (integral) form.</p>
<p>• Newton II: F = dp/dt (differential) ⇔ J = Δp = ∫ F dt (integral).</p>
<p>• Maxwell-Faraday: ∇×E = −∂B/∂t (differential) ⇔ ε = −dΦ/dt (integral).</p>
<p>• Continuity: ∇·J = −∂ρ/∂t (differential) ⇔ ∮ J·dA = −dQ/dt (integral).</p>
<p>The differential form tells you what happens at a point; the integral form tells you what happens over a region. They are equivalent by the Fundamental Theorem of Calculus and its multidimensional generalisations (Stokes' theorem, divergence theorem).</p>

**Floor 3 (In action):**
<p>This unified picture is the operating system of physics. When a new theory is developed, the first question is: "What is the differential equation, and what are the integrals that solve it?" Classical mechanics: d²x/dt² = F/m → x(t) = ∫∫ (F/m) dt dt. Electromagnetism: Maxwell's four differential equations → integral forms (Gauss, Ampere, Faraday) for macroscopic problems. Quantum mechanics: Schrödinger's equation iħ∂ψ/∂t = Ĥψ → ψ(t) = e^(−iĤt/ħ)ψ(0). General relativity: Einstein's field equations G_μν = 8πGT_μν are differential; their solutions (Schwarzschild, FLRW) are integrals. The calculus toolkit — the 60 BBs from 580 to 654 — is the language in which physics is written. Every derivative and integral you've learned has a physical counterpart. The map is complete.</p>

**Image prompt:** A chalk drawing of a grand table. Left column: "Differentiation — How fast?" with entries: v = ds/dt, a = dv/dt, F = dp/dt, I = dQ/dt, ε = −dΦ/dt, P = dE/dt. Right column: "Integration — How much?" with entries: s = ∫ v dt, v = ∫ a dt, Δp = ∫ F dt, Q = ∫ I dt, Φ = ∫ B·dA, E = ∫ P dt. Arrows between the columns labelled "FTC." The title: "CALCULUS IN PHYSICS." Chalk on dark green board. Square 1:1.
