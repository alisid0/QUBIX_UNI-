# Verma Volume 2 → Qubix BBs — Batch 8: Magnetism & Electromagnetic Induction (25 BBs, Ch 34–38)

Below are 25 BBs drawn from **Chapters 34–38** of H.C. Verma's *Concepts of Physics, Volume 2*. These cover the complete magnetism and EM induction sequence — B-fields, Lorentz force, Biot-Savart law, Ampere's law, solenoids, permanent magnets, magnetic materials, Faraday's law, Lenz's law, inductance, and AC generation.

**Already covered (don't duplicate):** BB-NEW-200 (electric charge), BB-NEW-201–213 (current, circuits, Kirchhoff), BB-NEW-214–216 (capacitors), BB-NEW-39–42 (circular motion — needed for charged particle orbits), BB-NEW-284–295 (torque, angular momentum, cross product).

**What's new here:** Lorentz force F = qv × B, right-hand rules, circular motion in B (r = mv/qB), cyclotron, velocity selector, F = BIL, torque on current loop (τ = m × B), Biot-Savart law, B due to straight wire (B = μ₀I/2πr), B on axis of circular loop, Ampere's circuital law, solenoid (B = μ₀nI), toroid, magnetic dipole, Earth's magnetism, magnetic materials (dia-/para-/ferro-), hysteresis, magnetic flux, Faraday's law (ε = −dΦ/dt), Lenz's law, motional EMF (ε = Blv), self and mutual inductance (ε = −L dI/dt), energy in inductor (U = ½LI²), AC generator, eddy currents, and the Maxwell-Faraday unification.

**Rigor focus:** Every right-hand rule is drilled explicitly. Every key equation is derived, not stated. Numerical examples are provided at every step. The three symmetry paths (Biot-Savart integration, Ampere's law, Faraday's law) are taught as complementary tools for different geometries. The conceptual spine is: moving charges create B-fields (Biot-Savart/Ampere) → B-fields exert forces on moving charges (Lorentz) → changing B-fields create E-fields (Faraday) → the cycle closes.

---

## BB-NEW-550 — The magnetic field B: what it is and how we measure it

**Subject:** physics | **Topic:** magnetism | **Concept:** magnetic-field; B-definition; Lorentz-force | **Ground:** g0 | **Builds on:** [BB-NEW-200, BB-NEW-160]

**Floor 0 (Idea):**
<p>An electric field pushes on any charge, moving or still. A magnetic field only pushes on <em>moving</em> charges — and the force is sideways. The magnetic field B is defined by the force it exerts on a test charge q moving at velocity v: F⃗ = qv⃗ × B⃗. This single equation — the Lorentz force law — is the entry point to all of magnetism.</p>

**Floor 1 (Concrete):**
<p>A proton (q = 1.6 × 10⁻¹⁹ C) moves east at 3.0 × 10⁵ m/s in a uniform B = 0.50 T pointing north. The force F = qvB sin θ. Here v⃗ is east, B⃗ is north, so θ = 90°, sin 90° = 1. F = (1.6×10⁻¹⁹)(3.0×10⁵)(0.50) = 2.4 × 10⁻¹⁴ N. Direction: right-hand rule — fingers east (v⃗), curl toward north (B⃗), thumb points <em>upward</em> (F⃗). The proton curves upward. If it were an electron (q negative), the force reverses — F⃗ would be downward. Magnetic force does zero work: F⃗ ⊥ v⃗ always, so KE is constant. B-field changes direction, not speed.</p>

**Floor 2 (Definition):**
<p>The <strong>magnetic field B⃗</strong> (magnetic flux density, units: tesla, T = N/A·m) is a vector field defined by the <strong>Lorentz force law:</strong> F⃗ = q(E⃗ + v⃗ × B⃗). The magnetic part is F⃗_B = qv⃗ × B⃗. Magnitude: F_B = |q|vB sin θ, where θ is the angle between v⃗ and B⃗. Direction: right-hand rule — fingers from v⃗ to B⃗ (through the smaller angle), thumb gives F⃗ for +q; opposite for −q. Key properties: (1) F_B is always perpendicular to both v⃗ and B⃗, (2) F_B does no work (P = F⃗·v⃗ = 0), (3) F_B = 0 when v⃗ ∥ B⃗ (θ = 0). The SI unit 1 T = 10⁴ gauss (the cgs unit). Earth's surface field: ~25–65 µT (0.25–0.65 G). A fridge magnet: ~5 mT. An MRI scanner: 1.5–7 T.</p>

**Floor 3 (In action):**
<p>The Lorentz force is why the aurora exists. Solar wind particles (electrons, protons) stream toward Earth at hundreds of km/s. Earth's magnetic field deflects them — the Lorentz force curves their paths into spirals along field lines toward the poles, where they collide with atmospheric atoms, producing the green and red glow of the northern and southern lights. The same force steers the electron beam in old CRT televisions: coils around the tube neck produce B-fields that scan the beam across the phosphor screen 60 times per second. In a particle accelerator, bending magnets (dipoles) use the Lorentz force to steer protons around the 27 km LHC ring — at 7 TeV, the required B is ~8.3 T, achieved by superconducting niobium-titanium coils cooled to 1.9 K.</p>

**Image prompt:** A chalk drawing of a charge q moving with velocity v⃗ through a region of uniform B⃗ (represented by evenly spaced crosses or dots). The force F⃗ = qv⃗ × B⃗ is an arrow perpendicular to both v⃗ and B⃗. The right-hand rule illustrated: fingers v⃗, curl to B⃗, thumb = F⃗. A curved trajectory shows the charge bending in an arc. Chalk on dark green board. Square 1:1.


## BB-NEW-551 — Right-hand rules: the three you must never confuse

**Subject:** physics | **Topic:** magnetism | **Concept:** right-hand-rules; force-direction; field-direction; grip-rule | **Ground:** g0 | **Builds on:** [BB-NEW-550]

**Floor 0 (Idea):**
<p>Magnetism uses three different right-hand rules, and confusing them is the single most common mistake. Rule 1: find the direction of magnetic force (F⃗ = qv⃗ × B⃗). Rule 2: find the direction of B around a current-carrying wire (grip rule). Rule 3: find the direction of induced current (Lenz/Faraday). Learn to keep them separate.</p>

**Floor 1 (Concrete):**
<p><strong>Rule 1 — Lorentz force (F⃗ × B⃗):</strong> Right hand flat. Fingers point along v⃗. Curl fingers toward B⃗ (through the smaller angle). Thumb = F⃗ for +q. Opposite for −q. Test: proton going east, B north → F upward. Electron going east, B north → F downward.</p>
<p><strong>Rule 2 — Biot-Savart / Ampere (current → B):</strong> Right hand, thumb points along current I⃗. Curled fingers wrap around the wire and show the direction of B⃗ (circles around the wire). Or: grip the wire with right hand, thumb in current direction, fingers give B direction. Test: current upward → B circles counterclockwise viewed from above.</p>
<p><strong>Rule 3 — Faraday/Lenz (changing flux → induced EMF):</strong> Right hand extended, thumb points opposite to the <em>change</em> in flux (Lenz: induced current opposes the change). Fingers curl in direction of induced current. Alternative: point thumb in direction of induced B-field that <em>opposes</em> ΔΦ, fingers curl in direction of induced I.</p>

**Floor 2 (Definition):**
<p>All three right-hand rules follow from the same underlying mathematics — the right-hand orientation of the vector cross product in three dimensions — but they are applied to different physical relationships:</p>
<p>1. <strong>F⃗ = qv⃗ × B⃗</strong> (Lorentz): v⃗ → B⃗ → F⃗ direction.</p>
<p>2. <strong>dB⃗ ∝ Idl⃗ × r̂</strong> (Biot-Savart) or <strong>∮B⃗·dl⃗ = μ₀I</strong> (Ampere): current → B-field circulation direction.</p>
<p>3. <strong>ε = −dΦ/dt</strong> (Faraday): changing flux → induced EMF direction, with Lenz's law giving the minus sign — the induced current creates a flux that <em>opposes</em> the change.</p>
<p>Never use the same hand gesture for different rules. Keep them distinct. Practice each with known cases until the direction is automatic.</p>

**Floor 3 (In action):**
<p>Mixing up the right-hand rules leads to sign errors that cascade through entire problems. A motor uses Rule 1 (current in B-field → force → rotation). A generator uses Rule 3 (rotation → changing flux → induced EMF → current). They're the same device run backward, but the right-hand rule you apply is different. When analysing a solenoid: Rule 2 tells you which way B points (grip the coil, fingers follow current, thumb = B inside). Then Rule 1 tells you the force on a test charge moving through that B. In exams, draw the coordinate axes and label which rule you're using before you apply it. The extra 5 seconds saves the 5 marks.</p>

**Image prompt:** A chalk drawing with three panels. Panel 1: Right hand with fingers straight (v⃗), curling toward B⃗, thumb out (F⃗) — Lorentz force rule. Panel 2: Right hand gripping a wire, thumb along I, fingers wrapping around showing B circles — grip rule. Panel 3: Right hand with thumb opposing flux change, fingers curling — Faraday/Lenz rule. Each labelled with the equation it serves. Chalk on dark green board. Square 1:1.


## BB-NEW-552 — Charged particle in uniform B: the circular orbit

**Subject:** physics | **Topic:** magnetism | **Concept:** circular-motion-in-B; radius-mv/qB; cyclotron-frequency | **Ground:** g1 | **Builds on:** [BB-NEW-550, BB-NEW-551, BB-NEW-40]

**Floor 0 (Idea):**
<p>Fire a charged particle perpendicular to a uniform magnetic field and it moves in a perfect circle. The magnetic force provides the centripetal force. The radius depends on momentum — faster particles make bigger circles. The time to complete one circle is independent of speed. This is the cyclotron principle.</p>

**Floor 1 (Concrete):**
<p>A proton (m = 1.67 × 10⁻²⁷ kg, q = 1.6 × 10⁻¹⁹ C) enters a B = 2.0 T field at v = 1.0 × 10⁶ m/s, perpendicular to B. Magnetic force = centripetal force: qvB = mv²/r → r = mv/qB = (1.67×10⁻²⁷)(1.0×10⁶)/(1.6×10⁻¹⁹ × 2.0) = 1.67×10⁻²¹/3.2×10⁻¹⁹ = 5.22 × 10⁻³ m = 5.2 mm. Period: T = 2πr/v = 2π(5.22×10⁻³)/(1.0×10⁶) = 3.28 × 10⁻⁸ s = 32.8 ns. Angular frequency: ω = v/r = qB/m = (1.6×10⁻¹⁹)(2.0)/(1.67×10⁻²⁷) = 1.92 × 10⁸ rad/s. Notice ω depends only on q, B, m — <em>not on v</em>. Double v to 2×10⁶ m/s: r doubles to 10.4 mm, but ω and T stay exactly the same.</p>

**Floor 2 (Definition):**
<p>For a particle of charge q and mass m moving perpendicular to a uniform B:</p>
<p>• <strong>Radius of circular path:</strong> r = mv/|q|B = p/|q|B (momentum p = mv).</p>
<p>• <strong>Cyclotron (angular) frequency:</strong> ω_c = |q|B/m. Independent of v and r.</p>
<p>• <strong>Period:</strong> T = 2π/ω_c = 2πm/|q|B. Also independent of speed.</p>
<p>• <strong>Kinetic energy:</strong> KE = ½mv² = (q²B²r²)/2m.</p>
<p>If v⃗ has a component parallel to B⃗ (v_∥ = v cos θ), the motion is <strong>helical:</strong> circular motion in the perpendicular plane plus constant drift along B at speed v_∥. The pitch of the helix = v_∥ × T = 2πmv cos θ/|q|B. The particle spirals along the field line.</p>

**Floor 3 (In action):**
<p>The speed-independent frequency is the heart of the cyclotron — Ernest Lawrence's 1931 invention that revolutionised nuclear physics. In a cyclotron, two D-shaped hollow electrodes (dees) with an alternating voltage between them sit in a uniform B-field. Ions spiral outward, gaining energy each time they cross the gap. Because ω_c doesn't depend on speed (in the non-relativistic limit), the AC voltage can run at a fixed frequency — the ions always arrive at the gap at the right moment to be accelerated. The same principle confines plasma in fusion reactors (tokamaks): charged particles spiral along toroidal field lines. And the helical motion of solar wind particles along Earth's field lines channels them to the poles, creating the aurora. The radius formula r ∝ p also means momentum spectrometers can separate particles by momentum in a known B-field — the basis of mass spectrometry.</p>

**Image prompt:** A chalk drawing of a charged particle in a uniform B-field (crosses for B into page). The particle traces a perfect circle. Centripetal force qvB = mv²/r labelled. Radius r = mv/qB. A clock showing period T = 2πm/qB — independent of v. An inset shows helical motion when v has a parallel component. Chalk on dark green board. Square 1:1.


## BB-NEW-553 — The cyclotron: accelerating particles with a constant frequency

**Subject:** physics | **Topic:** magnetism | **Concept:** cyclotron; resonant-acceleration; dees; maximum-energy | **Ground:** g1 | **Builds on:** [BB-NEW-552]

**Floor 0 (Idea):**
<p>A cyclotron accelerates charged particles to high energies using a magnetic field to bend them into circles and an electric field to kick them faster each half-turn. Because the circular frequency doesn't depend on speed (non-relativistically), the accelerating voltage can run at a constant frequency — the particle always arrives at the gap in sync.</p>

**Floor 1 (Concrete):**
<p>A cyclotron with B = 1.5 T, dee radius R = 0.50 m, accelerating deuterons (q = 1.6 × 10⁻¹⁹ C, m = 3.34 × 10⁻²⁷ kg). Cyclotron frequency: f = qB/2πm = (1.6×10⁻¹⁹)(1.5) / (2π × 3.34×10⁻²⁷) = 1.14 × 10⁷ Hz = 11.4 MHz. The AC voltage between dees must match this frequency. Maximum speed when r = R: v_max = qBR/m = (1.6×10⁻¹⁹)(1.5)(0.50)/(3.34×10⁻²⁷) = 3.59 × 10⁷ m/s (~0.12c — still non-relativistic). Maximum KE: ½mv_max² = ½(3.34×10⁻²⁷)(3.59×10⁷)² = 2.15 × 10⁻¹² J = 13.4 MeV. The deuteron makes many turns — each gap crossing adds 2qV of energy. If V = 100 kV, energy gain per turn = 200 keV. Number of turns to reach 13.4 MeV ≈ 67.</p>

**Floor 2 (Definition):**
<p>A <strong>cyclotron</strong> consists of two hollow D-shaped electrodes (dees) in a uniform perpendicular B-field, with an alternating voltage V₀ sin ωt applied between them. The cyclotron (resonance) frequency: f = |q|B/2πm. A particle injected at the centre spirals outward, receiving a kick of up to 2|q|V₀ per full turn. The maximum kinetic energy (non-relativistic): KE_max = q²B²R²/2m, where R is the dee radius. Limitations: (1) relativistic mass increase at v ~ 0.1c detunes the resonance — solved by the synchrocyclotron (frequency modulated) or synchrotron (B and f both varied); (2) vertical focusing required to keep the beam from diverging; (3) maximum energy limited by dee size and B-field strength.</p>

**Floor 3 (In action):**
<p>The cyclotron was the first machine to split the atom. Lawrence's 11-inch cyclotron (1931) achieved 1.2 MeV protons — enough for nuclear reactions — and won him the 1939 Nobel Prize. Modern cyclotrons produce radioisotopes for medical imaging (PET scans): a medical cyclotron (~15 MeV protons) bombards a target to produce ¹⁸F, which is then attached to glucose to make FDG — the tracer that lights up tumours on PET scans. The TRIUMF cyclotron in Vancouver (R = 9 m, 500 MeV protons) is the world's largest. The LHC at CERN is not a cyclotron but a synchrotron — the proton speed is essentially c (ultra-relativistic), so both B and f must ramp up as energy increases. The cyclotron principle — fixed frequency, magnetic bending, repeated acceleration — remains the elegant entry point to all particle accelerator physics.</p>

**Image prompt:** A chalk drawing of a cyclotron: two D-shaped dees with a gap between them. A particle spirals outward from the centre. The magnetic field B (crosses) fills both dees. The AC voltage V₀sinωt shown as a sine wave connected to the dees. Radius labelled: r grows from 0 to R. Equation: f = qB/2πm, KE_max = q²B²R²/2m. Chalk on dark green board. Square 1:1.


## BB-NEW-554 — Velocity selector: crossed E and B fields

**Subject:** physics | **Topic:** magnetism | **Concept:** velocity-selector; crossed-fields; Wien-filter | **Ground:** g1 | **Builds on:** [BB-NEW-550, BB-NEW-200]

**Floor 0 (Idea):**
<p>Want to pick out only particles with a specific speed from a mixed beam? Cross an electric field and a magnetic field at right angles. The electric force qE⃗ pushes one way; the magnetic force qv⃗ × B⃗ pushes the other. When they balance, only particles with v = E/B pass straight through. It's a speed filter.</p>

**Floor 1 (Concrete):**
<p>A beam of ions (various speeds, all +q) enters a region with E⃗ = 5.0 × 10⁴ V/m downward and B⃗ = 0.20 T into the page. Electric force: F_E = qE upward (opposite to E⃗ for +q). Magnetic force: F_B = qvB downward (right-hand rule: v⃗ right, B⃗ into page → F⃗ up for +q? No — let's be careful. v⃗ is right, B⃗ is into page. Right hand: fingers right, curl into page, thumb points UP. So F_B is upward. Then F_E must be downward to balance. E⃗ downward → F_E on +q is downward. So F_E = qE downward, F_B = qvB upward. They balance when qE = qvB → v = E/B = 5.0×10⁴/0.20 = 2.5 × 10⁵ m/s. Only ions at this exact speed exit undeflected through a narrow slit.</p>

**Floor 2 (Definition):**
<p>A <strong>velocity selector</strong> (Wien filter) uses perpendicular electric and magnetic fields (E⃗ ⊥ B⃗ ⊥ v⃗). A charged particle experiences F⃗ = q(E⃗ + v⃗ × B⃗). For specific directions: E⃗ and v⃗ × B⃗ oppose each other. The net force is zero when |q|E = |q|vB → <strong>v = E/B</strong>. This condition is independent of both q and m — it selects purely by speed. Particles with v > E/B are deflected by the magnetic force (which grows with v); particles with v < E/B are deflected by the electric force (which is constant). By placing a slit after the crossed-field region, you extract a monoenergetic beam. The selector can be reversed to pick v by swapping E or B direction.</p>

**Floor 3 (In action):**
<p>The velocity selector is stage 1 of a mass spectrometer. Stage 2: the mono-speed beam enters a uniform B-field region (no E-field). Particles of different mass curve with different radii: r = mv/qB. Since v is fixed by the selector, r ∝ m — heavier particles make bigger circles. A detector at a fixed position counts particles of a specific m/q ratio. This is how J.J. Thomson discovered neon-20 and neon-22 in 1913 — the first evidence of isotopes. Modern mass spectrometers (MALDI-TOF, orbitrap) use different principles but the crossed-field velocity selector remains the pedagogical prototype. The same crossed-field principle appears in the Hall effect: in a conductor carrying current in a B-field, charge carriers are deflected until the resulting E-field balances the magnetic force — producing the Hall voltage V_H = IB/nqt.</p>

**Image prompt:** A chalk drawing of crossed E and B fields. E⃗ downward (parallel plates with + on top, − on bottom). B⃗ into the page (crosses). A particle beam enters from the left. Forces shown: F_E = qE downward, F_B = qvB upward. When v = E/B: straight path through a slit. When v ≠ E/B: curved paths (deflected up or down). Equation v = E/B independent of q and m. Chalk on dark green board. Square 1:1.


## BB-NEW-555 — Magnetic force on a current-carrying wire: F = BIL sin θ

**Subject:** physics | **Topic:** magnetism | **Concept:** force-on-current-carrying-wire; F=BIL; motor-effect | **Ground:** g0 | **Builds on:** [BB-NEW-550, BB-NEW-551]

**Floor 0 (Idea):**
<p>A wire carrying an electric current in a magnetic field experiences a force. This is the motor effect — the basis of every electric motor, loudspeaker, and galvanometer. The force comes from the Lorentz force on individual moving electrons, summed over the entire length of wire.</p>

**Floor 1 (Concrete):**
<p>A straight wire of length L = 0.30 m carries current I = 5.0 A eastward in a uniform B = 0.40 T pointing north. The angle between I⃗ (current direction = conventional, so east) and B⃗ (north) is 90°. Magnitude: F = BIL sin θ = 0.40 × 5.0 × 0.30 × sin 90° = 0.60 N. Direction: right-hand rule — fingers along I⃗ (east), curl toward B⃗ (north), thumb points <em>upward</em>. The wire is pushed upward. If the current flows south instead (θ = 180° with B north — actually opposite), sin 180° = 0 → F = 0. The force is zero when the wire is parallel to B. Maximum force when wire is perpendicular. Derivation: each electron drifts at v_d. Lorentz force per electron = ev_dB. Number of conduction electrons in wire length L = nAL. Total force F = (nAL)(ev_dB) = (neAv_d)LB = ILB.</p>

**Floor 2 (Definition):**
<p>The <strong>magnetic force on a straight current-carrying wire</strong> in a uniform B-field: F⃗ = IL⃗ × B⃗, where L⃗ is a vector of magnitude L in the direction of conventional current I. Magnitude: F = BIL sin θ, where θ is the angle between the wire direction (I⃗) and B⃗. Direction: right-hand rule — fingers I⃗, curl toward B⃗, thumb = F⃗. For a <em>curved wire</em> in a uniform B, the force depends only on the straight-line vector from start to end: F⃗ = I L⃗_net × B⃗. In a <em>non-uniform</em> B-field, integrate: F⃗ = ∫ I dl⃗ × B⃗. The force is always perpendicular to both the wire and B. Note: the wire itself doesn't need to be moving — it's the charge carriers moving <em>inside</em> the wire that experience the Lorentz force, and they transfer that force to the lattice via collisions.</p>

**Floor 3 (In action):**
<p>F = BIL is the equation behind every electromagnetic actuator. A loudspeaker voice coil — a cylindrical coil of wire in the radial B-field of a permanent magnet — experiences F = BIL perpendicular to both current and field, pushing the speaker cone back and forth at audio frequencies. A railgun uses the same force: a sliding armature carrying enormous current (~1 MA) across two rails in a strong B-field accelerates a projectile to hypersonic speeds — F = BIL where L is the rail separation. Circuit breakers use the motor effect to trip: a fault current creates enough force to physically separate contacts. Even the twitch of a frog's leg in Galvani's 1780 experiment was F = BIL — current in the nerve created a force in the Earth's magnetic field. The equation is short; its reach is vast.</p>

**Image prompt:** A chalk drawing of a straight wire of length L carrying current I through a uniform B-field (crosses for B into page, or dots for B out of page — pick one and be consistent). Force F⃗ arrow perpendicular to both I⃗ and B⃗. The right-hand rule hand gesture shown. Derivation: each electron feels ev_dB, total F = (neAv_d)LB = ILB. Chalk on dark green board. Square 1:1.


## BB-NEW-556 — Torque on a current loop: the magnetic moment

**Subject:** physics | **Topic:** magnetism | **Concept:** torque-on-current-loop; magnetic-moment; m=NIA; motor-principle | **Ground:** g1 | **Builds on:** [BB-NEW-555, BB-NEW-284]

**Floor 0 (Idea):**
<p>A rectangular loop of wire carrying current in a magnetic field experiences a torque — not a net force. Opposite sides feel forces in opposite directions, creating a couple that rotates the loop. This is the fundamental mechanism of every DC motor and the reason compass needles align with B.</p>

**Floor 1 (Concrete):**
<p>A rectangular coil: N = 100 turns, area A = 0.050 m × 0.030 m = 1.5 × 10⁻³ m², current I = 2.0 A, in B = 0.80 T. Magnetic moment magnitude: m = NIA = 100 × 2.0 × 1.5×10⁻³ = 0.30 A·m². If the plane of the coil is parallel to B (normal n̂ ⊥ B⃗, θ = 90°): torque τ = mB sin 90° = 0.30 × 0.80 = 0.24 N·m. If the plane is perpendicular to B (n̂ ∥ B⃗, θ = 0): τ = 0 — equilibrium. If the coil is rotated 30° from equilibrium: τ = 0.30 × 0.80 × sin 30° = 0.12 N·m. The torque always acts to align m⃗ with B⃗ — the coil rotates until its magnetic moment points along the field. The two vertical sides experience F = BIL each, opposite directions, separated by the coil width — a pure couple.</p>

**Floor 2 (Definition):**
<p>The <strong>magnetic (dipole) moment</strong> of a planar current loop: m⃗ = NIA n̂, where N = number of turns, I = current, A = loop area, n̂ = unit normal vector (right-hand rule: fingers follow I, thumb = n̂). Units: A·m² (or J/T). The <strong>torque</strong> on a magnetic dipole in a uniform B-field: τ⃗ = m⃗ × B⃗. Magnitude: τ = mB sin θ, where θ is the angle between m⃗ and B⃗. The torque rotates m⃗ toward B⃗. <strong>Potential energy:</strong> U = −m⃗·B⃗ = −mB cos θ. Minimum at θ = 0 (aligned — stable equilibrium). Maximum at θ = 180° (anti-aligned — unstable). This is completely analogous to an electric dipole in an E-field: p⃗ ↔ m⃗, E⃗ ↔ B⃗, U = −p⃗·E⃗ ↔ U = −m⃗·B⃗.</p>

**Floor 3 (In action):**
<p>Every DC motor is a torque-on-a-loop machine. A commutator (split ring) reverses the current direction each half-turn, so the torque always acts in the same rotational direction — otherwise the coil would oscillate and stop at θ = 0. The torque equation τ = NIAB sin θ tells you everything about motor design: increase turns, increase current, increase area, or increase B-field (using permanent magnets or field windings) to get more torque. A galvanometer uses the same principle in reverse: a small coil suspended in a radial B-field (so B is always perpendicular to the coil, giving τ ∝ I regardless of angle) rotates against a spring. The deflection is proportional to current — that's your analog ammeter needle. The magnetic moment of a single electron (spin) is approximately μ_B = 9.27 × 10⁻²⁴ J/T — the Bohr magneton — and the alignment of these microscopic moments is the origin of ferromagnetism.</p>

**Image prompt:** A chalk drawing of a rectangular current loop in a uniform B-field. Two opposite sides (vertical) have force arrows F⃗ in opposite directions = couple. Magnetic moment vector m⃗ perpendicular to the loop plane (right-hand rule). Torque τ⃗ = m⃗ × B⃗. Potential energy U = −m⃗·B⃗ (graph of U vs θ shown — cosine curve, minimum at θ = 0). Chalk on dark green board. Square 1:1.


## BB-NEW-557 — The Biot-Savart law: every current element creates a B-field

**Subject:** physics | **Topic:** magnetism | **Concept:** Biot-Savart-law; dB-from-current-element; inverse-square | **Ground:** g2 | **Builds on:** [BB-NEW-550, BB-NEW-555]

**Floor 0 (Idea):**
<p>A stationary charge produces only an E-field. A <em>moving</em> charge also produces a B-field — magnetism is electricity in motion. The Biot-Savart law gives the B-field created by a tiny segment of current-carrying wire at any point in space. It's the magnetic analogue of Coulomb's law, and just as fundamental.</p>

**Floor 1 (Concrete):**
<p>A short wire segment dl = 2.0 cm = 0.020 m carries current I = 10 A northward. What's the B-field at a point 5.0 cm directly east of the segment's midpoint? Biot-Savart: dB = (μ₀/4π)(I dl⃗ × r̂)/r². μ₀/4π = 10⁻⁷ T·m/A. dl⃗ is north, r̂ is east (from the segment to the field point), so dl⃗ × r̂ = north × east = <em>downward</em> (right-hand rule: fingers north, curl to east, thumb down). Magnitude: dl × r̂ = dl × 1 × sin 90° = 0.020 m. r = 0.050 m. dB = 10⁻⁷ × 10 × 0.020 / (0.050)² = 10⁻⁷ × 10 × 0.020 / 0.0025 = 8.0 × 10⁻⁶ T = 8.0 µT downward. That's the contribution from one tiny segment. The total B from a long wire is the integral over all such segments.</p>

**Floor 2 (Definition):**
<p>The <strong>Biot-Savart law:</strong> the infinitesimal magnetic field dB⃗ at a point P due to a current element I dl⃗ is dB⃗ = (μ₀/4π)(I dl⃗ × r̂)/r², where r⃗ is the vector from the current element to P, r = |r⃗|, and r̂ = r⃗/r. μ₀ = 4π × 10⁻⁷ T·m/A (exactly, by definition in SI prior to 2019) is the <strong>permeability of free space</strong>. The constant μ₀/4π = 10⁻⁷ T·m/A. Direction: right-hand rule — dl⃗ (current direction) crossed into r̂ (from element to field point). dB⃗ is perpendicular to both I⃗ and the line joining the element to P. Magnitude falls off as 1/r², like Coulomb's law. For a moving point charge q with velocity v⃗: B⃗ = (μ₀/4π)(qv⃗ × r̂)/r² — the fundamental source of all magnetic fields.</p>

**Floor 3 (In action):**
<p>Biot-Savart is the "integrate over the geometry" tool — used when symmetry is not enough for Ampere's law. It's how you calculate the B-field on the axis of a circular loop, at the centre of an arc, or from any oddly shaped conductor. In MRI magnet design, Biot-Savart integration over the complex coil geometry determines field homogeneity — essential for imaging. In magnetotellurics (geophysical prospecting), natural currents in the ionosphere induce currents in the Earth, and the resulting B-fields measured at the surface are modelled using Biot-Savart to infer subsurface conductivity. The law applies in magnetostatics (steady currents); for time-varying currents, the full Jefimenko equations or retarded potentials are needed because B-field changes propagate at c, not instantly.</p>

**Image prompt:** A chalk drawing of a current element Idl⃗ (small arrow) at the origin. A point P at position r⃗ (vector from element to P). The dB⃗ vector at P perpendicular to both dl⃗ and r⃗ (right-hand rule shown). The inverse-square dependence: dB ∝ 1/r². The Biot-Savart equation: dB⃗ = (μ₀/4π)(Idl⃗ × r̂)/r². μ₀/4π = 10⁻⁷. Chalk on dark green board. Square 1:1.


## BB-NEW-558 — B due to an infinite straight wire: B = μ₀I/2πr

**Subject:** physics | **Topic:** magnetism | **Concept:** B-field-straight-wire; mu_0-I-over-2pi-r; right-hand-grip-rule | **Ground:** g1 | **Builds on:** [BB-NEW-557, BB-NEW-551]

**Floor 0 (Idea):**
<p>The magnetic field around a long straight wire forms concentric circles centred on the wire. The field strength is proportional to the current and inversely proportional to the distance — double the distance, halve the field. This is the magnetic analogue of the electric field around a line of charge, but with circular geometry.</p>

**Floor 1 (Concrete):**
<p>Integrating Biot-Savart for an infinite straight wire gives B = μ₀I/2πr. A power line carries I = 200 A. At r = 10 m from the line: B = (4π×10⁻⁷ × 200) / (2π × 10) = (2×10⁻⁷ × 200) / 10 = 4.0 × 10⁻⁶ T = 4.0 µT. At r = 1.0 m: B = 40 µT. At r = 0.10 m: B = 400 µT = 0.40 mT. Compare with Earth's field: ~50 µT. So at 10 m, the power line's field is about 8% of Earth's field. Direction: right-hand grip rule — thumb along I, fingers curl around wire giving B direction. For I upward, B circles counterclockwise viewed from above. If I reverses, B direction reverses. The field lines are circles — no beginning, no end. ∮B·dl = μ₀I.</p>

**Floor 2 (Definition):**
<p>The magnetic field at distance r from a <strong>long straight wire</strong> carrying current I (infinite length approximation, valid when r ≪ wire length) has magnitude B = μ₀I/2πr. The direction is tangential to a circle centred on the wire: right-hand grip rule (thumb = current direction, curled fingers = B direction). In vector form, using cylindrical coordinates: B⃗ = (μ₀I/2πr) φ̂, where φ̂ is the azimuthal unit vector. The 1/r dependence means B falls off more slowly than the E-field of a point charge (1/r²) — this is because the wire is an infinite line source. For a <em>finite</em> wire of length L, with the field point at perpendicular distance r from the midpoint: B = (μ₀I/4πr)(sin α + sin β), where α and β are the angles from the field point to the wire ends.</p>

**Floor 3 (In action):**
<p>The B = μ₀I/2πr formula governs power line magnetic fields, which are regulated in some countries due to health concerns (though no causal link to disease has been established at µT levels). The same formula explains why twisting wire pairs (as in Ethernet cables) cancels magnetic interference: adjacent twists carry opposite currents, and their B-fields cancel at distances larger than the twist pitch. In a co-axial cable, the inner and outer conductors carry equal and opposite currents — for r > cable radius, the net B is zero. This is why coax cables don't radiate or pick up magnetic interference. At the microscopic scale, the magnetic field around a single moving electron is given by the same geometry — it's why electron beams self-pinch (the z-pinch effect in fusion research).</p>

**Image prompt:** A chalk drawing of a long straight wire carrying current I upward. Concentric circles around the wire show B-field lines — arrows on circles indicate counterclockwise direction (right-hand grip rule). B magnitude next to three distances: at r₁ (close): B₁ = μ₀I/2πr₁ (large), at r₂: B₂ smaller, at r₃: B₃ even smaller. The 1/r decay shown graphically. Chalk on dark green board. Square 1:1.


## BB-NEW-559 — B on the axis of a circular current loop

**Subject:** physics | **Topic:** magnetism | **Concept:** circular-loop-B-field; axis-field; Helmholtz-coils | **Ground:** g2 | **Builds on:** [BB-NEW-557, BB-NEW-558]

**Floor 0 (Idea):**
<p>A single circular loop of current produces a magnetic field that looks like a bar magnet's — emerging from one face and entering the other. Along the axis, the field is directed along the axis itself, and its strength drops as you move away. At the centre, it's strongest. This is the basic building block of solenoids and Helmholtz coils.</p>

**Floor 1 (Concrete):**
<p>A circular loop: N = 1 turn, radius R = 0.10 m, I = 5.0 A. At the centre (x = 0): B = μ₀I/2R = (4π×10⁻⁷ × 5.0)/(2 × 0.10) = (2π×10⁻⁷ × 5.0)/0.10 = 3.14 × 10⁻⁵ T = 31.4 µT. On the axis at x = R = 0.10 m: B = μ₀IR²/[2(R² + x²)^(3/2)] = (4π×10⁻⁷)(5.0)(0.10)²/[2(0.01 + 0.01)^(3/2)] = (4π×10⁻⁷)(5.0)(0.01)/[2 × 0.00283] = 1.11 × 10⁻⁵ T = 11.1 µT. At x = 2R = 0.20 m: B = (4π×10⁻⁷)(5.0)(0.01)/[2(0.01 + 0.04)^(3/2)] = (4π×10⁻⁷)(5.0)(0.01)/[2 × 0.0112] = 2.81 × 10⁻⁶ T = 2.8 µT. The field falls off roughly as 1/x³ at large distances — like a dipole, which is what the loop is.</p>

**Floor 2 (Definition):**
<p>The magnetic field on the axis of a circular current loop of radius R carrying current I: B(x) = μ₀IR²/[2(R² + x²)^(3/2)], where x is the distance from the centre along the axis. Direction: right-hand rule — curl fingers in direction of I, thumb points along B on the axis. At the centre (x = 0): B_centre = μ₀I/2R. At large distances (x ≫ R): B ≈ μ₀IR²/2x³ = μ₀(IA)/2πx³ = μ₀m/2πx³, where m = IA is the magnetic dipole moment. For N turns: multiply by N. <strong>Helmholtz coils:</strong> two identical coaxial loops separated by R produce a highly uniform B in the central region between them — used for calibration and experiments requiring a known, uniform field.</p>

**Floor 3 (In action):**
<p>The circular loop field formula is the starting point for designing every solenoid, MRI coil, and wireless charging pad. A single-turn coil produces an inhomogeneous field; stacking loops into a solenoid averages the field into near-uniformity inside. The dipole nature of the loop (B ∝ 1/x³ at large x) means the field falls off rapidly — this is why wireless charging requires the phone to sit directly on the pad, not a metre away. In transcranial magnetic stimulation (TMS), a figure-8 coil (two loops with opposite currents) focuses B onto a small region of the brain to stimulate neurons non-invasively — the field geometry is engineered using the Biot-Savart integral over the loop shapes. MRI gradient coils are precisely designed current-loop geometries that produce linear B-field gradients for spatial encoding.</p>

**Image prompt:** A chalk drawing of a circular loop in the plane of the page, current I shown by arrows on the loop. The axis is a horizontal line through the centre. B-field vectors along the axis: largest at centre, decreasing with distance. The field-line pattern around the loop: emerging from the "north" face, looping around to the "south" face — dipole pattern. Equation B(x) = μ₀IR²/[2(R²+x²)^(3/2)]. Chalk on dark green board. Square 1:1.


## BB-NEW-560 — Ampere's circuital law: the symmetry shortcut

**Subject:** physics | **Topic:** magnetism | **Concept:** Amperes-law; line-integral; enclosed-current; symmetry | **Ground:** g2 | **Builds on:** [BB-NEW-558, BB-NEW-557]

**Floor 0 (Idea):**
<p>Biot-Savart always works, but the integration is often brutal. Ampere's law is the magnetic analogue of Gauss's law — a shortcut that gives B in one line when the symmetry is right. The line integral of B around any closed loop equals μ₀ times the current piercing the loop. If you can find a path where B is constant and parallel to dl, the problem solves itself.</p>

**Floor 1 (Concrete):**
<p>Use Ampere's law to find B around a long straight wire. Choose a circular Amperian loop of radius r centred on the wire. By symmetry, B has the same magnitude everywhere on this circle and is tangent to it. So ∮B⃗·dl⃗ = B × (circumference) = B × 2πr. The current enclosed: I. Ampere's law: B × 2πr = μ₀I → B = μ₀I/2πr. Done in one line. Compare with Biot-Savart: set up r̂, dl⃗, cross product, integral over −∞ to +∞, trig substitution — a page of work. Now for a long solenoid with n turns per metre: choose a rectangular Amperian loop with one side inside the solenoid (B = μ₀nI, parallel to the axis) and the other outside (B ≈ 0). ∮B⃗·dl⃗ = B_l — the only contribution is from the inside length l. Enclosed current: nl × I. So B_l = μ₀nIl → B = μ₀nI. Two lines.</p>

**Floor 2 (Definition):**
<p><strong>Ampere's circuital law:</strong> ∮B⃗·dl⃗ = μ₀I_enc, where the line integral is taken around any closed loop and I_enc is the net current passing through the surface bounded by that loop (taking sign by right-hand rule relative to the loop direction). The law is exact for steady currents (magnetostatics). For time-varying fields, Maxwell added the displacement current term: ∮B⃗·dl⃗ = μ₀(I_enc + ε₀ dΦ_E/dt). Ampere's law is powerful when symmetry ensures B is constant along a well-chosen Amperian loop — cylindrical symmetry (straight wire, coaxial cable), planar symmetry (current sheet), or solenoidal symmetry (long solenoid, toroid). If symmetry is absent, you must fall back on Biot-Savart.</p>

**Floor 3 (In action):**
<p>Ampere's law reveals a profound truth: magnetic field lines have no beginning and no end (∇·B⃗ = 0, Gauss's law for magnetism), but they <em>do</em> circulate around currents. This circulation is the magnetic signature of every current-carrying device. A clamp meter (amp clamp) uses Ampere's law: a split ferrite core is clamped around a wire, forming a magnetic circuit. A Hall sensor in the gap measures B, which is proportional to I (since ∮B⃗·dl⃗ ∝ I), giving a non-contact current reading. The same principle is used in residual current devices (RCDs/GFCIs): the live and neutral wires pass through a toroidal core. In normal operation, their currents cancel (I_enc = 0 → B = 0). If there's a ground fault, the currents differ, producing a net B, which induces a voltage that trips the breaker — saving lives.</p>

**Image prompt:** A chalk drawing showing Ampere's law. Left: a circular Amperian loop around a straight wire — B is tangent and constant on the loop, ∮B·dl = B(2πr) = μ₀I. Right: a rectangular Amperian loop through a solenoid — only the inside segment contributes, B_l = μ₀nIl. The general equation ∮B·dl = μ₀I_enc displayed prominently. Chalk on dark green board. Square 1:1.


## BB-NEW-561 — The solenoid: a uniform B-field on demand

**Subject:** physics | **Topic:** magnetism | **Concept:** solenoid; B=mu_0-nI; uniform-field; electromagnet | **Ground:** g1 | **Builds on:** [BB-NEW-560, BB-NEW-559]

**Floor 0 (Idea):**
<p>Coil a wire into a tight helix and pass current through it. The magnetic fields from each turn add up inside to produce a remarkably uniform B-field, while outside the field is nearly zero. The solenoid is the simplest and most widely used electromagnet — B = μ₀nI, where n is turns per metre.</p>

**Floor 1 (Concrete):**
<p>A solenoid: length L = 0.50 m, N = 1000 turns, so n = N/L = 2000 turns/m. Current I = 2.0 A. B inside = μ₀nI = (4π×10⁻⁷)(2000)(2.0) = 5.03 × 10⁻³ T = 5.0 mT. This is about 100× Earth's field inside a handheld device. If a soft iron core (μ_r ≈ 1000) is inserted: B ≈ μ_r μ₀ nI ≈ 5 T — a thousandfold increase, rivalling an MRI magnet (but only while current flows — it's an electromagnet, not a permanent magnet). The field is uniform only for an infinitely long solenoid; for a finite solenoid, the field drops near the ends. At exactly the centre of a finite solenoid: B = μ₀nI × (L/√(L² + 4R²)). For L = 50 cm, R = 2 cm: B_centre ≈ 0.999 μ₀nI — nearly the infinite-solenoid value.</p>

**Floor 2 (Definition):**
<p>An <strong>ideal solenoid</strong> is a helical coil of wire, closely wound, with length much greater than radius (L ≫ R). The magnetic field inside is uniform and axial: <strong>B = μ₀nI</strong>, where n = N/L is the number of turns per unit length. Direction: right-hand rule — fingers follow current in the coils, thumb points along B⃗ inside (from south to north). The field outside an ideal solenoid is zero (or negligible for a practical solenoid). The uniformity arises because each turn produces a B-field on axis (from BB 559) and the contributions from all turns sum to cancel radial variations. Inserting a ferromagnetic core (μ_r ≫ 1) multiplies B by μ_r. The solenoid is the magnetic analogue of a parallel-plate capacitor: uniform field inside, fringe field outside.</p>

**Floor 3 (In action):**
<p>The solenoid is everywhere. Every electromechanical relay, contactor, and solenoid valve uses a solenoid to convert electrical current into linear motion — the iron plunger is pulled into the coil when current flows. The starter solenoid in your car engages the starter motor. MRI machines use a solenoid (the main magnet coil, superconducting) to produce the 1.5–7 T field that aligns protons for imaging. Particle physics detectors (like ATLAS and CMS at CERN) use enormous solenoids — the CMS solenoid is 13 m long, 6 m in diameter, produces 3.8 T, and stores 2.6 GJ of magnetic energy. The uniform B-field bends charged particles, and their curvature radius reveals their momentum. A solenoid's field is uniform enough that you can measure particle momenta to fractions of a percent.</p>

**Image prompt:** A chalk drawing of a solenoid — a helical coil with many turns. Current I arrows on the wire. Magnetic field lines inside: straight, parallel, evenly spaced (uniform). Outside: field lines spread and weaken. Equation B = μ₀nI. Cross-section view showing the field lines looping through the solenoid and returning outside (weak). Right-hand rule for direction. Chalk on dark green board. Square 1:1.


## BB-NEW-562 — The toroid: B confined entirely within

**Subject:** physics | **Topic:** magnetism | **Concept:** toroid; B-inside-toroid; Amperes-law-toroid; no-external-field | **Ground:** g1 | **Builds on:** [BB-NEW-560, BB-NEW-561]

**Floor 0 (Idea):**
<p>Bend a solenoid into a circle and you get a toroid — a doughnut-shaped coil. The magnetic field is entirely confined within the toroid's core. There is no external field at all. This is the ideal geometry for an inductor where you don't want magnetic interference leaking out.</p>

**Floor 1 (Concrete):**
<p>A toroid: N = 500 turns, mean radius R = 0.15 m, current I = 3.0 A. Apply Ampere's law with a circular Amperian loop of radius r inside the toroid (R_inner < r < R_outer). By symmetry, B is tangential and has constant magnitude on this circle. ∮B⃗·dl⃗ = B × 2πr. I_enc = NI (each of the N turns pierces the loop once). So B × 2πr = μ₀NI → B = μ₀NI/2πr. At the mean radius r = R: B = (4π×10⁻⁷)(500)(3.0)/(2π × 0.15) = (2×10⁻⁷)(1500)/0.15 = 2.0 × 10⁻³ T = 2.0 mT. B varies as 1/r inside — slightly stronger near the inner radius. For an Amperian loop outside the toroid: I_enc = 0 (each turn's current goes through the loop twice — once up, once down — cancelling), so B = 0 outside. For a loop inside the inner radius: I_enc = 0, so B = 0 there too.</p>

**Floor 2 (Definition):**
<p>A <strong>toroid</strong> is a coil wound on a ring-shaped (toroidal) core. Using Ampere's law with a circular path of radius r inside the core: <strong>B = μ₀NI/2πr</strong>. The field is azimuthal (circumferential), varies as 1/r radially, and is zero everywhere outside the toroid (r < R_inner or r > R_outer). The toroid is the magnetic equivalent of a Faraday cage — the field is perfectly contained. In practice, a toroidal core wound with wire forms an inductor with zero external magnetic field, no electromagnetic interference, and high inductance per volume. The containment is because each turn's B-field circulates within the core rather than fringing into space. The B-field inside is <em>not</em> uniform — it's stronger at smaller r — so toroids are not used when field uniformity is required.</p>

**Floor 3 (In action):**
<p>The toroidal geometry solves the biggest problem with solenoids: magnetic interference. A toroidal transformer (used in audio equipment, medical devices, and precision electronics) has virtually no external leakage field — it won't induce hum in nearby circuits. Toroidal inductors are standard in power supplies and RF circuits for the same reason. The tokamak fusion reactor design wraps a toroidal solenoid around a plasma-filled torus — the toroidal B-field confines the plasma. But a pure toroidal field isn't enough (particle drifts cause loss), so additional poloidal and vertical fields are superimposed. The fact that B = 0 outside a toroid (for a perfectly wound one) is also the principle behind "bucking" coils that cancel stray magnetic fields in sensitive experiments — like the magnetic shielding around electron microscopes and SQUID magnetometers.</p>

**Image prompt:** A chalk drawing of a toroid — a ring-shaped core with wire wound around it (shown as evenly spaced turns). Cross-section view showing the Amperian loop inside: circle of radius r. B-field arrows tangential to this circle. Equation: B = μ₀NI/2πr. Three loops shown: inside inner radius (I_enc = 0, B = 0), inside core (I_enc = NI, B = μ₀NI/2πr), outside toroid (I_enc = 0, B = 0). Chalk on dark green board. Square 1:1.


## BB-NEW-563 — Bar magnets and the magnetic dipole field

**Subject:** physics | **Topic:** magnetism | **Concept:** bar-magnet; magnetic-dipole; field-lines; Earths-magnetism | **Ground:** g0 | **Builds on:** [BB-NEW-550]

**Floor 0 (Idea):**
<p>A bar magnet's field looks exactly like a current loop's field from a distance — it's a magnetic dipole. There are no magnetic monopoles (isolated north or south poles). Cut a bar magnet in half and you get two smaller bar magnets, each with its own north and south. The dipole nature is fundamental.</p>

**Floor 1 (Concrete):**
<p>A bar magnet of magnetic moment m = 2.0 A·m² produces a B-field. On the axis at distance x from the centre (x ≫ length), B ≈ μ₀(2m)/4πx³ = (10⁻⁷)(4.0)/x³. At x = 0.20 m: B ≈ 4.0×10⁻⁷/0.008 = 5.0 × 10⁻⁵ T = 50 µT — comparable to Earth's field. On the equatorial line at the same distance: B ≈ μ₀m/4πx³ = half the axial value = 25 µT. Earth's magnetic field at the surface: B ≈ 25–65 µT depending on latitude. It approximates a dipole tilted ~11° from the rotational axis, with the south magnetic pole near the geographic north pole (which is why a compass's "north" end points north — it's attracted to Earth's south magnetic pole). The dipole moment of Earth: m_Earth ≈ 8.0 × 10²² A·m².</p>

**Floor 2 (Definition):**
<p>A <strong>magnetic dipole</strong> (bar magnet, current loop, or any source with a north-south axis and no net monopole moment) produces a field pattern described by the dipole formula. In spherical coordinates (r, θ from the dipole axis):</p>
<p>B_r = (μ₀/4π)(2m cos θ)/r³</p>
<p>B_θ = (μ₀/4π)(m sin θ)/r³</p>
<p>On the axis (θ = 0): B_axial = μ₀(2m)/4πr³. On the equator (θ = 90°): B_equatorial = μ₀m/4πr³. The field falls as 1/r³ — faster than a point charge (1/r²) because the dipole's positive and negative poles partially cancel. <strong>Gauss's law for magnetism:</strong> ∮B⃗·dA⃗ = 0 — the net magnetic flux through any closed surface is zero, reflecting the absence of magnetic monopoles.</p>

**Floor 3 (In action):**
<p>Earth's magnetic field has been a navigation tool for millennia. The magnetic compass, invented in China around 200 BC, works because a magnetised needle aligns with the local B-field. The field is not static — the magnetic poles wander (~55 km/year), and the field reverses polarity every few hundred thousand years (recorded in magnetised seafloor rocks — the Vine-Matthews-Morley hypothesis, 1963, which confirmed plate tectonics). The field also protects us: it deflects the solar wind, creating the magnetosphere, without which the atmosphere would be stripped away (as happened on Mars). Migrating birds, sea turtles, and even bacteria (magnetotactic bacteria with internal magnetite crystals) sense Earth's B-field for navigation. The 1/r³ dipole falloff means interplanetary spacecraft leave Earth's magnetic influence within about 10 Earth radii.</p>

**Image prompt:** A chalk drawing of a bar magnet with N and S poles. Field lines emerge from N, curve outward, and enter S. The dipole field pattern is shown — symmetric, with lines closer together near the poles. Below: Earth as a bar magnet, tilted ~11° from rotation axis, with field lines emerging near the south geographic pole and converging near the north geographic pole. Dipole equations: B_r ∝ 2cosθ/r³, B_θ ∝ sinθ/r³. Chalk on dark green board. Square 1:1.


## BB-NEW-564 — Diamagnetism, paramagnetism, and ferromagnetism

**Subject:** physics | **Topic:** magnetism | **Concept:** magnetic-materials; susceptibility; permeability; domains | **Ground:** g1 | **Builds on:** [BB-NEW-563]

**Floor 0 (Idea):**
<p>All materials respond to magnetic fields, but in three profoundly different ways. Diamagnets weakly repel (water, copper — everything, actually, at some level). Paramagnets weakly attract (aluminium, liquid oxygen). Ferromagnets strongly attract and can become permanent magnets (iron, nickel, cobalt). The difference is in the atomic magnetic moments — whether they exist at all, and whether they talk to each other.</p>

**Floor 1 (Concrete):**
<p>Susceptibility χ = M/H (dimensionless in SI). Relative permeability μ_r = 1 + χ.</p>
<p>• <strong>Diamagnetic:</strong> χ ≈ −10⁻⁵ (negative, tiny). Water: χ = −9.0 × 10⁻⁶. Copper: χ = −9.6 × 10⁻⁶. Bismuth: χ = −1.66 × 10⁻⁴ (strongest diamagnet). A diamagnet in a non-uniform B-field is repelled from the strong-field region.</p>
<p>• <strong>Paramagnetic:</strong> χ ≈ +10⁻⁵ to +10⁻³ (positive, small). Aluminium: χ = +2.2 × 10⁻⁵. Liquid oxygen: χ ≈ +3.5 × 10⁻³ (strong enough to be visibly attracted to a magnet — a classic demonstration). Paramagnets are attracted to strong-field regions.</p>
<p>• <strong>Ferromagnetic:</strong> χ ≈ +10³ to +10⁵ (positive, enormous). Iron: μ_r ≈ 1000–5000 (χ ≈ 10³–5×10³). Permalloy (Fe-Ni): μ_r ≈ 100,000. Supermalloy: μ_r ≈ 1,000,000. Ferromagnets concentrate B-field lines enormously and can retain magnetisation when the external field is removed (hysteresis).</p>

**Floor 2 (Definition):**
<p>The magnetic response of a material is characterised by the <strong>magnetic susceptibility</strong> χ = M/H, where M is magnetisation (magnetic dipole moment per unit volume, A/m) and H is the magnetic field intensity (A/m). B = μ₀(H + M) = μ₀(1 + χ)H = μ₀μ_r H = μH.</p>
<p>• <strong>Diamagnetism:</strong> universal — all materials have a diamagnetic contribution from Lenz's law acting on electron orbits. It's the only response for materials with no unpaired electrons. χ < 0, |χ| ≪ 1, temperature-independent.</p>
<p>• <strong>Paramagnetism:</strong> requires unpaired electron spins. χ > 0, |χ| ≪ 1. Follows Curie's law: χ = C/T (decreases with temperature as thermal agitation disrupts alignment).</p>
<p>• <strong>Ferromagnetism:</strong> requires unpaired spins <em>plus</em> quantum-mechanical exchange interaction that aligns neighbouring spins into domains. χ ≫ 1, strongly temperature-dependent, disappears above the Curie temperature T_C (iron: 1043 K) where the material becomes paramagnetic.</p>

**Floor 3 (In action):**
<p>Diamagnetism can levitate: a live frog was levitated in a 16 T B-field (Andre Geim, 2000 — he later won a Nobel for graphene). Water's diamagnetism means you — mostly water — are weakly repelled by a strong magnet. Paramagnetic oxygen is why liquid oxygen sticks to a magnet (a striking demo). Ferromagnetism runs civilisation: every transformer, motor, generator, and hard drive relies on ferromagnetic cores to multiply B-fields by factors of 10³–10⁵. The magnetic stripe on your credit card uses ferromagnetic particles; a write head magnetises tiny regions. A hard disk drive (HDD) stores bits as the direction of magnetisation in nanoscale ferromagnetic grains — reading them back via giant magnetoresistance (GMR), a quantum effect that earned the 2007 Nobel Prize. Without ferromagnetism, the electrical age wouldn't exist.</p>

**Image prompt:** A chalk drawing with three panels. Panel 1 (Diamagnetic): atoms with paired electrons, a weak B-field opposing the external field — material slightly repelled. Panel 2 (Paramagnetic): atoms with unpaired spins randomly oriented, aligning partially with external B — material slightly attracted. Panel 3 (Ferromagnetic): domains (small regions) with aligned spins, domain walls moving, moments adding — huge enhancement. χ values: ~−10⁻⁵ (dia), +10⁻³ (para), +10³–10⁵ (ferro). Chalk on dark green board. Square 1:1.


## BB-NEW-565 — The hysteresis loop: memory in a magnet

**Subject:** physics | **Topic:** magnetism | **Concept:** hysteresis; B-H-curve; coercivity; retentivity; hard-vs-soft | **Ground:** g2 | **Builds on:** [BB-NEW-564]

**Floor 0 (Idea):**
<p>Apply a magnetic field to iron, then remove it. The iron stays magnetised — it remembers. The plot of B versus H forms a loop, not a line. This hysteresis loop is the fingerprint of a ferromagnetic material, and its shape — wide or narrow — determines whether the material is good for permanent magnets or for transformers.</p>

**Floor 1 (Concrete):**
<p>A ferromagnetic sample starts unmagnetised (B = 0, H = 0). Increase H: B rises along the initial magnetisation curve, saturating at B_s. Reduce H back to zero: B doesn't return to zero — it retains <strong>remanence</strong> B_r (retentivity). Reverse H to drive B back to zero: the reverse field required is the <strong>coercivity</strong> H_c. Continue reversing: B saturates in the opposite direction. Cycle back: the loop closes. For soft iron (transformer steel): H_c ≈ 80 A/m (low — easy to demagnetise), B_r ≈ 0.8 T, loop area small (low energy loss per cycle). For Alnico (permanent magnet alloy): H_c ≈ 50,000 A/m (high — hard to demagnetise), B_r ≈ 1.2 T, loop area large (high energy product BH_max). The area of the loop = energy dissipated as heat per unit volume per cycle.</p>

**Floor 2 (Definition):**
<p>The <strong>hysteresis loop</strong> (B-H curve) characterises ferromagnetic materials. Key parameters:</p>
<p>• <strong>Saturation magnetisation M_s:</strong> maximum possible magnetisation (all domains aligned).</p>
<p>• <strong>Remanence (retentivity) B_r:</strong> B remaining when H returns to zero — how much memory the material has.</p>
<p>• <strong>Coercivity H_c:</strong> reverse H needed to reduce B to zero — how hard it is to demagnetise.</p>
<p>• <strong>Energy product (BH)_max:</strong> maximum B × H on the demagnetisation curve (second quadrant) — figure of merit for permanent magnets (kJ/m³).</p>
<p><strong>Soft magnetic materials:</strong> narrow loop, low H_c, low hysteresis loss — used in transformers, motors, electromagnets (iron, silicon steel, ferrites). <strong>Hard magnetic materials:</strong> wide loop, high H_c, high (BH)_max — used in permanent magnets (Alnico, SmCo, NdFeB). The loop area per cycle is the energy lost to heat, J/m³.</p>

**Floor 3 (In action):**
<p>Hysteresis governs device design choices. Power transformers use grain-oriented silicon steel (low H_c, high μ_r, thin laminations) because hysteresis loss is proportional to the loop area × frequency — minimising it is critical for grid efficiency (transformers hum at 50/60 Hz; that hum is magnetostriction from the cycling B-field). Permanent magnets need high H_c to resist demagnetisation: neodymium-iron-boron (NdFeB) magnets, invented in 1984, have (BH)_max ~ 400 kJ/m³ — the strongest commercially available, used in hard drive voice coils, EV motors, wind turbine generators, and headphones. Magnetic recording exploits hysteresis: the write head's field exceeds H_c, flipping the grain's magnetisation to store a 0 or 1. The grain stays flipped (B_r) until deliberately overwritten — magnetic memory is literally metastable hysteresis.</p>

**Image prompt:** A chalk drawing of a B-H hysteresis loop. Axes: B (vertical) vs H (horizontal). The loop: starting at origin, rising to saturation B_s, falling to remanence B_r as H → 0, crossing H-axis at coercivity H_c, saturating in reverse, closing. Key points labelled: B_s, B_r, H_c. A second, narrower loop (soft material) overlaid for comparison. Chalk on dark green board. Square 1:1.


## BB-NEW-566 — Magnetic flux: counting field lines through a surface

**Subject:** physics | **Topic:** magnetism | **Concept:** magnetic-flux; Φ=B·A; weber; flux-linkage | **Ground:** g0 | **Builds on:** [BB-NEW-550]

**Floor 0 (Idea):**
<p>Magnetic flux Φ is the total B-field passing through a surface — the number of field lines piercing it. If the surface is perpendicular to B, flux is simply B × area. Tilt the surface and less flux passes through. Flux is the currency of electromagnetic induction: change the flux through a loop, and you generate an EMF.</p>

**Floor 1 (Concrete):**
<p>A square loop of side a = 0.10 m (area A = 0.010 m²) sits in a uniform B = 0.50 T. When the loop's plane is perpendicular to B (normal parallel to B, θ = 0): Φ = BA cos 0 = 0.50 × 0.010 × 1 = 5.0 × 10⁻³ Wb (webers). When the loop is tilted 60° (θ = 60°): Φ = 0.50 × 0.010 × cos 60° = 0.50 × 0.010 × 0.50 = 2.5 × 10⁻³ Wb — half the flux. When the loop is edge-on to B (θ = 90°): Φ = 0 — no field lines pierce the loop, even though B is still there. A coil of N = 200 turns: flux linkage = NΦ = 200 × 5.0×10⁻³ = 1.0 Wb-turn. SI unit of flux: weber (Wb). 1 Wb = 1 T·m².</p>

**Floor 2 (Definition):**
<p><strong>Magnetic flux</strong> Φ through a surface is Φ = ∫ B⃗·dA⃗. For a uniform B and a flat area A: Φ = BA cos θ = B⃗·A⃗, where θ is the angle between B⃗ and the surface normal vector A⃗ (A⃗ magnitude = area, direction perpendicular to the surface). For a coil of N turns, the <strong>flux linkage</strong> is NΦ (assuming the same flux threads each turn — a good approximation for a tightly wound coil). If B varies over the surface, integrate: Φ = ∫ B dA cos θ. Flux can be changed by: (1) changing B magnitude, (2) changing the area, (3) changing the angle (rotating the loop), or (4) any combination. The time derivative dΦ/dt is the central quantity in Faraday's law.</p>

**Floor 3 (In action):**
<p>Magnetic flux is why power grids use AC. A static B-field through a stationary loop produces exactly zero EMF — no matter how strong B is. Only <em>changing</em> flux induces voltage. This is why a transformer only works with AC: the alternating current in the primary creates an alternating flux in the core, and the changing flux induces EMF in the secondary. Flux is also why generator designers maximise dΦ/dt: spin coils faster, use more turns, use stronger magnets. The unit, the weber, honours Wilhelm Weber, who (with Gauss) built the first electromagnetic telegraph in 1833. In particle physics, the magnetic flux through a superconducting ring is quantised — the flux quantum Φ₀ = h/2e ≈ 2.07 × 10⁻¹⁵ Wb — a macroscopic quantum effect used in SQUIDs, the most sensitive magnetometers ever built.</p>

**Image prompt:** A chalk drawing of a rectangular loop in a uniform B-field. Three angles shown: θ = 0 (plane ⊥ B, maximum flux = BA), θ = 60° (Φ = BA cos 60° = BA/2), θ = 90° (plane ∥ B, Φ = 0). The area vector A⃗ (perpendicular to loop) and B⃗ with angle θ between them. Equation: Φ = B⃗·A⃗ = BA cos θ. Flux linkage NΦ. Chalk on dark green board. Square 1:1.


## BB-NEW-567 — Faraday's law: changing flux creates EMF

**Subject:** physics | **Topic:** magnetism | **Concept:** Faradays-law; induced-EMF; dΦ/dt; electromagnetic-induction | **Ground:** g1 | **Builds on:** [BB-NEW-566]

**Floor 0 (Idea):**
<p>Move a magnet near a coil and a voltage appears across the coil's ends. No battery, no power supply — the voltage comes from the changing magnetic flux through the coil. Faraday's law: the induced EMF equals the negative rate of change of magnetic flux. This single equation drives every generator, transformer, and induction charger on Earth.</p>

**Floor 1 (Concrete):**
<p>A coil of N = 50 turns, area A = 0.020 m², sits in a B-field that drops linearly from 0.80 T to 0.20 T in Δt = 0.30 s. The field is perpendicular to the coil (θ = 0). Initial flux: Φ_i = BA = 0.80 × 0.020 = 0.0160 Wb. Final flux: Φ_f = 0.20 × 0.020 = 0.0040 Wb. ΔΦ = −0.0120 Wb. Average induced EMF: ε = −N ΔΦ/Δt = −50 × (−0.0120/0.30) = 50 × 0.040 = 2.0 V. If the coil is part of a circuit with resistance R = 10 Ω, the induced current I = ε/R = 0.20 A (while the field is changing — after that, I = 0). The faster the field changes, the larger the EMF: if Δt = 0.10 s instead, ε = 50 × (0.0120/0.10) = 6.0 V. Instantaneous EMF: ε = −N dΦ/dt.</p>

**Floor 2 (Definition):**
<p><strong>Faraday's law of electromagnetic induction:</strong> The induced EMF in a closed loop equals the negative rate of change of magnetic flux through the loop: ε = −dΦ/dt. For a coil of N turns with the same flux through each: <strong>ε = −N dΦ/dt</strong>. The EMF (voltage) drives a current if the loop is closed — converting mechanical energy (changing flux) into electrical energy. The induced EMF exists regardless of whether a current can flow; an open-circuited coil still has an EMF across its terminals. The flux can change because: (1) B changes with time (transformer EMF), (2) the loop moves or changes shape (motional EMF), (3) the loop rotates (generator EMF), or (4) any combination. Faraday discovered this in 1831 after a decade of searching for the symmetric effect to Oersted's discovery (1820) that current creates B.</p>

**Floor 3 (In action):**
<p>Faraday's law changed civilisation. Before 1831, the only sources of electricity were batteries (chemical, low power) and static generators (high voltage, no current). Faraday's law enabled the dynamo — mechanical rotation → changing flux → continuous AC/DC current — and the electrical age began. Today, every power plant (coal, nuclear, hydro, wind, gas) ultimately uses Faraday's law: something spins a magnet near coils or coils near a magnet. A wind turbine's blades spin a shaft that rotates magnets past stationary coils — pure Faraday. Even solar panels don't use Faraday, but the inverter that converts their DC to AC does (via transistors switching current through inductors, where V = L dI/dt is the dual of Faraday). The minus sign in ε = −dΦ/dt is Lenz's law — the subject of the next BB.</p>

**Image prompt:** A chalk drawing of a coil connected to a voltmeter. A bar magnet approaches the coil (motion arrow). The voltmeter needle deflects. When the magnet stops, the needle returns to zero. When the magnet is withdrawn, the needle deflects in the opposite direction. The three ways to change flux illustrated: changing B (magnet moving), changing area (loop deforming), changing angle (loop rotating). Equation: ε = −N dΦ/dt. Chalk on dark green board. Square 1:1.


## BB-NEW-568 — Lenz's law: nature hates a change in flux

**Subject:** physics | **Topic:** magnetism | **Concept:** Lenzs-law; induced-current-opposes-change; minus-sign-in-Faraday | **Ground:** g1 | **Builds on:** [BB-NEW-567, BB-NEW-551]

**Floor 0 (Idea):**
<p>Faraday's law has a minus sign: ε = −dΦ/dt. That minus sign is Lenz's law — the induced current always flows in a direction that <em>opposes</em> the change in flux that produced it. Nature pushes back. This is not an extra rule; it's a direct consequence of energy conservation.</p>

**Floor 1 (Concrete):**
<p>A bar magnet's north pole approaches a conducting loop. The flux through the loop increases (more field lines from the approaching N pole pierce the loop). Lenz: the induced current must create a flux that <em>opposes</em> this increase — i.e., a flux pointing <em>away</em> from the approaching N pole. So the induced B_ind must point to the left (repelling the incoming N). Right-hand grip rule: to create B_ind pointing left through the loop, the induced current must flow counterclockwise (viewed from the magnet). This current makes the loop act like a bar magnet with its N pole facing the incoming N — repulsion. If the magnet is <em>withdrawn</em>, flux decreases. Lenz: induced current now <em>supports</em> the flux — B_ind points toward the retreating N, current flows clockwise, the loop's S pole faces the N magnet — attraction. The loop always resists the motion.</p>

**Floor 2 (Definition):**
<p><strong>Lenz's law:</strong> The direction of the induced current is such that it opposes the change in magnetic flux that produced it. This is the physical meaning of the minus sign in Faraday's law. To apply Lenz's law: (1) Determine the direction of the external B⃗ through the loop. (2) Determine whether flux Φ is increasing or decreasing. (3) The induced B_ind opposes the <em>change</em> — if Φ increases, B_ind is opposite to B⃗; if Φ decreases, B_ind is in the same direction as B⃗. (4) Use the right-hand grip rule to find the induced current direction that produces B_ind. Lenz's law is a consequence of energy conservation: if the induced current <em>reinforced</em> the change, you'd get a runaway positive feedback — infinite energy from nothing. The minus sign prevents perpetual motion.</p>

**Floor 3 (In action):**
<p>Lenz's law explains magnetic braking. Drop a strong magnet through a copper pipe (a non-magnetic conductor). The falling magnet changes flux in the pipe wall, inducing currents (eddy currents, see BB 572) that, per Lenz, oppose the motion. The magnet falls in slow motion — taking seconds instead of milliseconds. This is used in some roller coaster brakes (eddy current braking — no contact, no wear, failsafe because it works even if power fails). Lenz's law also explains why generators get harder to turn when you draw current: the induced current creates a B-field that opposes the rotation — you feel the back-torque. This is the physical origin of the "load" on a power plant: every light bulb you switch on makes the generator slightly harder to spin, requiring more steam/water/wind to maintain speed. Lenz's law is the reason electricity isn't free.</p>

**Image prompt:** A chalk drawing of a bar magnet approaching a conducting loop (N pole toward loop). Flux increasing (Φ ↑). Induced B_ind pointing opposite to the magnet's B (to oppose increase). Induced current I_ind shown counterclockwise. Second panel: magnet withdrawing — flux decreasing (Φ ↓), B_ind pointing with the magnet's B, I_ind clockwise. Lenz's law "Nature opposes the change in flux." Chalk on dark green board. Square 1:1.


## BB-NEW-569 — Motional EMF: ε = Blv

**Subject:** physics | **Topic:** magnetism | **Concept:** motional-EMF; epsilon-equals-Blv; sliding-rod; flux-cutting | **Ground:** g1 | **Builds on:** [BB-NEW-567, BB-NEW-555]

**Floor 0 (Idea):**
<p>A conducting rod moving through a magnetic field has an EMF induced across its ends — even without a complete circuit. The rod's free electrons experience a magnetic force qv⃗ × B⃗, which pushes them to one end. The resulting charge separation creates an electric field that balances the magnetic force. This is motional EMF.</p>

**Floor 1 (Concrete):**
<p>A conducting rod of length L = 0.50 m moves at v = 10 m/s perpendicular to a uniform B = 0.30 T. The rod, its velocity, and B are mutually perpendicular (optimal geometry). Motional EMF: ε = Blv = 0.30 × 0.50 × 10 = 1.5 V. This is the voltage between the rod's ends — measurable with a voltmeter connected via stationary rails. If the rod slides on frictionless conducting rails connected by a resistor R = 5.0 Ω, the induced current I = ε/R = 1.5/5.0 = 0.30 A. The magnetic force on the current-carrying rod: F = BIL = 0.30 × 0.30 × 0.50 = 0.045 N, opposing the motion (Lenz). To maintain constant speed, you must push with 0.045 N. Mechanical power input: P_mech = Fv = 0.045 × 10 = 0.45 W. Electrical power output: P_elec = ε²/R = (1.5)²/5.0 = 0.45 W. Perfect conversion — Faraday and Lenz guarantee energy conservation.</p>

**Floor 2 (Definition):**
<p><strong>Motional EMF</strong> is the EMF induced when a conductor moves through a magnetic field. For a straight rod of length L moving at velocity v⃗ perpendicular to both its length and B⃗: <strong>ε = Blv</strong>. More generally: ε = ∫ (v⃗ × B⃗)·dl⃗ along the conductor. The EMF arises because magnetic force F⃗_B = qv⃗ × B⃗ separates charges until the resulting electrostatic force qE⃗ balances it: qE = qvB → E = vB. The potential difference across length L is ΔV = EL = Blv. This can also be derived from Faraday's law: in time dt, the rod sweeps area dA = L(v dt), so dΦ = B dA = BLv dt → ε = dΦ/dt = Blv. The two derivations (Lorentz force and flux change) are equivalent for motional EMF.</p>

**Floor 3 (In action):**
<p>Motional EMF drives the simplest generators. A coil rotating in a B-field is just motional EMF applied to each side: ε = NBAω sin ωt for a coil of N turns, area A, rotating at angular speed ω. The AC voltage at your wall socket (230 V, 50 Hz) traces back to motional EMF in the power station's generator coils. The Earth's motion through the interplanetary magnetic field produces a motional EMF across long conductors — the Trans-Alaska Pipeline experiences up to several volts of induced EMF during geomagnetic storms. The tethered satellite experiment (TSS-1, 1992) deployed a 20 km conducting tether from the Space Shuttle; the motional EMF from orbital motion through Earth's B-field was expected to generate ~5 kV — but the tether broke before full deployment. MHD (magnetohydrodynamic) generators use motional EMF in a conducting fluid (plasma) flowing through a B-field — no moving mechanical parts.</p>

**Image prompt:** A chalk drawing of a conducting rod of length L sliding on two parallel conducting rails. Velocity v⃗ of the rod to the right. B⃗ into the page (crosses). Charges in the rod separate: + at top, − at bottom (or vice versa — right-hand rule). Induced EMF ε = Blv labelled between the rod ends. A resistor R completes the circuit. Force F⃗ on the rod points left (opposing motion). Chalk on dark green board. Square 1:1.


## BB-NEW-570 — Self-inductance: a coil's electrical inertia

**Subject:** physics | **Topic:** magnetism | **Concept:** self-inductance; L; back-EMF; epsilon=-L-dI/dt | **Ground:** g1 | **Builds on:** [BB-NEW-567, BB-NEW-561]

**Floor 0 (Idea):**
<p>Change the current through a coil and the coil's own changing flux induces an EMF that opposes the current change. This is self-induction — electrical inertia. The coil resists changes in current just as mass resists changes in velocity. The quantity that measures this inertia is inductance L.</p>

**Floor 1 (Concrete):**
<p>A solenoid: N = 400 turns, length l = 0.20 m, radius r = 0.025 m, area A = πr² = 1.96 × 10⁻³ m². n = N/l = 2000 turns/m. Inductance: L = μ₀n²Al = (4π×10⁻⁷)(2000)²(1.96×10⁻³)(0.20) = (4π×10⁻⁷)(4×10⁶)(3.92×10⁻⁴) = 1.97 × 10⁻³ H ≈ 2.0 mH. If the current changes from 0 to 3.0 A in 0.050 s (dI/dt ≈ 60 A/s): induced back-EMF = −L(dI/dt) = −2.0×10⁻³ × 60 = −0.12 V. The minus sign means the EMF opposes the increase. When you open a switch in an inductive circuit: dI/dt can be enormous (~10⁶ A/s as the arc extinguishes), producing a back-EMF of hundreds or thousands of volts — this is why switches spark, and why inductive loads need snubber diodes.</p>

**Floor 2 (Definition):**
<p><strong>Self-inductance L</strong> (or simply inductance) of a coil is defined by the relationship between the flux linkage and the current: NΦ = LI, where Φ is the flux per turn produced by the coil's own current. Units: henry (H). 1 H = 1 Wb/A = 1 V·s/A. The induced EMF from self-induction is <strong>ε_L = −L dI/dt</strong>. The back-EMF opposes changes in current (Lenz): it's negative when I increases, positive when I decreases. For a long solenoid: L = μ₀n²Al = μ₀N²A/l. For a toroid of mean radius R, cross-section A: L = μ₀N²A/2πR. Inductance is the magnetic analogue of capacitance: just as C stores energy in the electric field (U_E = ½CV²), L stores energy in the magnetic field (U_B = ½LI²). Inductance depends only on geometry and core material, not on current (for air-core or linear materials).</p>

**Floor 3 (In action):**
<p>Inductance is the reason your lights dim momentarily when a large motor starts — the motor's high inductance resists the sudden current draw. Inductive "kick" (the high-voltage spike when current is interrupted) is used deliberately in automotive ignition coils: ~12 V from the battery charges the coil, then the points open, dI/dt spikes, and L dI/dt produces ~20–40 kV — enough to arc across the spark plug gap. Inductors in switch-mode power supplies store energy in their B-field during the "on" time and release it during the "off" time, enabling efficient voltage conversion (buck, boost converters). The inductance of power transmission lines limits how fast power flow can change — grid operators must manage dI/dt to avoid voltage collapse. And in superconducting magnetic energy storage (SMES), a giant superconducting coil stores megajoules with near-zero loss — releasing it instantly when needed for grid stabilisation.</p>

**Image prompt:** A chalk drawing of a coil (inductor) in a circuit. Current I increasing (dI/dt > 0). The coil's self-flux Φ = LI/n, back-EMF ε = −L dI/dt shown opposing the applied voltage (polarity marked + and − across the coil). Mechanical analogy: a flywheel with moment of inertia L, angular velocity analogous to I. Equation: V = L dI/dt (for ideal inductor). Chalk on dark green board. Square 1:1.


## BB-NEW-571 — Mutual inductance: when two coils talk

**Subject:** physics | **Topic:** magnetism | **Concept:** mutual-inductance; transformer-principle; M; flux-coupling | **Ground:** g2 | **Builds on:** [BB-NEW-570, BB-NEW-567]

**Floor 0 (Idea):**
<p>Place two coils near each other. Change the current in one, and the changing flux links the other, inducing an EMF. This is mutual inductance — the principle of every transformer. The two coils don't touch; they communicate purely through their shared magnetic field.</p>

**Floor 1 (Concrete):**
<p>Two solenoids wound on the same cylindrical form. Primary: N₁ = 1000 turns, length l = 0.30 m, radius r = 0.020 m. Secondary: N₂ = 200 turns, wound over the primary. Area A = π(0.020)² = 1.257 × 10⁻³ m². The primary's B-field: B₁ = μ₀N₁I₁/l. Flux through each secondary turn when I₁ flows: Φ₂₁ = B₁A = μ₀N₁I₁A/l. Mutual inductance: M = N₂Φ₂₁/I₁ = μ₀N₁N₂A/l = (4π×10⁻⁷)(1000)(200)(1.257×10⁻³)/0.30 = 1.05 × 10⁻³ H = 1.05 mH. If the primary current changes at dI₁/dt = 100 A/s, the induced EMF in the secondary: ε₂ = −M dI₁/dt = −1.05×10⁻³ × 100 = −0.105 V. If the coils share a high-μ_r iron core, M multiplies by μ_r ≈ 1000 → M ≈ 1.05 H, ε₂ ≈ 105 V — a practical transformer.</p>

**Floor 2 (Definition):**
<p><strong>Mutual inductance M</strong> between two circuits is defined by the flux linkage in circuit 2 per unit current in circuit 1: N₂Φ₂₁ = M I₁. Equivalently, N₁Φ₁₂ = M I₂ — M is symmetric (M₁₂ = M₂₁ = M). Units: henry (H), same as self-inductance. The induced EMF in circuit 2 due to changing current in circuit 1: <strong>ε₂ = −M dI₁/dt</strong>. Similarly, ε₁ = −M dI₂/dt. The <strong>coupling coefficient</strong> k = M/√(L₁L₂), where 0 ≤ k ≤ 1. k = 1 for perfect coupling (all flux from one coil links the other — ideal transformer). k < 1 in practice due to leakage flux. M depends on geometry, number of turns, relative position, and the core material (if any). For two coaxial solenoids on the same core: M = μ₀N₁N₂A/l (air core), or μ₀μ_r N₁N₂A/l (with core).</p>

**Floor 3 (In action):**
<p>Mutual inductance is the operating principle of every transformer on the grid. The primary and secondary windings share a laminated iron core (k ≈ 0.98–0.995). The turns ratio determines voltage transformation: V₂/V₁ = N₂/N₁ (ideal). A step-down transformer (N₂ < N₁) reduces voltage for safe domestic use; a step-up transformer (N₂ > N₁) increases voltage for efficient long-distance transmission. Wireless charging (Qi standard) uses resonant mutual inductance: an AC current in the charging pad's coil creates a changing flux that induces voltage in the phone's receiver coil — air-core, so k ≈ 0.3–0.5, requiring resonance to achieve efficient power transfer. RFID tags are powered by mutual inductance from the reader's coil. And in metal detectors, a change in mutual inductance between two coils signals the presence of a metallic object — the eddy currents in the metal alter the effective M.</p>

**Image prompt:** A chalk drawing of two coaxial solenoids (primary and secondary) wound on the same core. Primary current I₁ creates B-field (flux lines through both coils). Changing I₁ → changing flux → induced EMF ε₂ in secondary. Equation: ε₂ = −M dI₁/dt, M = μ₀N₁N₂A/l. Transformer turns ratio V₂/V₁ = N₂/N₁. Coupling coefficient k = M/√(L₁L₂). Chalk on dark green board. Square 1:1.


## BB-NEW-572 — Energy stored in an inductor: U = ½LI²

**Subject:** physics | **Topic:** magnetism | **Concept:** magnetic-energy; inductor-energy; energy-density; u=B²/2μ₀ | **Ground:** g1 | **Builds on:** [BB-NEW-570]

**Floor 0 (Idea):**
<p>Charging a capacitor stores energy in the electric field (½CV²). Building up current in an inductor stores energy in the magnetic field (½LI²). The energy isn't in the wires — it's in the B-field in the space around them. Every inductor is a magnetic battery.</p>

**Floor 1 (Concrete):**
<p>An inductor L = 5.0 H carries I = 3.0 A. Stored energy: U = ½LI² = ½ × 5.0 × (3.0)² = 22.5 J. If this inductor discharges into a resistor, that 22.5 J is released as heat. For a solenoid (L = μ₀n²Al) with n = 1000 turns/m, l = 0.50 m, A = 0.010 m², I = 5.0 A: L = (4π×10⁻⁷)(10⁶)(0.010)(0.50) = 6.28 × 10⁻³ H. U = ½(6.28×10⁻³)(5.0)² = 0.0785 J. That doesn't sound like much — but the energy density tells a different story. B = μ₀nI = (4π×10⁻⁷)(1000)(5.0) = 6.28 × 10⁻³ T. Energy density u_B = B²/2μ₀ = (6.28×10⁻³)²/(2 × 4π×10⁻⁷) = 3.94×10⁻⁵/(2.51×10⁻⁶) ≈ 15.7 J/m³. Over the solenoid volume (0.005 m³): U ≈ 0.079 J — matches.</p>

**Floor 2 (Definition):**
<p>The <strong>energy stored in an inductor</strong> carrying current I is U = ½LI². This can be derived from the work done by the external source against the back-EMF during the current build-up: dW = ε dq = L(dI/dt)(I dt) = LI dI. Integrating from 0 to I: W = ½LI². The energy resides in the <strong>magnetic field</strong>. The magnetic energy density (energy per unit volume) is <strong>u_B = B²/2μ₀</strong> (in vacuum) or u_B = B²/2μ (in a medium). This is the magnetic analogue of the electric energy density u_E = ½ε₀E². For a volume V: U = ∫ u_B dV = ∫ (B²/2μ₀) dV. The expression U = ½LI² is equivalent to this volume integral for any inductor geometry.</p>

**Floor 3 (In action):**
<p>Magnetic energy storage is inherently limited by material properties. A 1 T field stores u_B ≈ 400,000 J/m³ — about the same energy density as a 1-atmosphere compressed gas tank. Superconducting magnetic energy storage (SMES) uses B-fields of 5–10 T in large superconducting coils to store grid-scale energy (megajoules to gigajoules) with near-100% round-trip efficiency. The CMS solenoid at CERN stores 2.6 GJ — enough to melt 6 tonnes of copper. All of it is in the B-field, not the coil. Compare with capacitors: a typical electrolytic capacitor stores ~0.01 J/cm³; a lithium-ion battery stores ~2000 J/cm³; an inductor at 1 T stores ~0.4 J/cm³. Inductors are low-density but can release their energy in microseconds, making them ideal for pulsed power. The energy density u = B²/2μ₀ also means that doubling B quadruples the stored energy — a key scaling law for fusion reactor magnetic confinement.</p>

**Image prompt:** A chalk drawing of an inductor in a circuit, current I flowing. The B-field lines through and around the coil. Energy U = ½LI² labelled. A bar chart comparing energy densities: capacitor (~10⁴ J/m³ at breakdown), inductor at 1 T (~4×10⁵ J/m³), battery (~2×10⁹ J/m³). Equation for magnetic energy density: u_B = B²/2μ₀. Chalk on dark green board. Square 1:1.


## BB-NEW-573 — The AC generator: Faraday's law in continuous rotation

**Subject:** physics | **Topic:** magnetism | **Concept:** AC-generator; sinusoidal-EMF; epsilon=NBAω-sin-ωt; alternator | **Ground:** g1 | **Builds on:** [BB-NEW-569, BB-NEW-566, BB-NEW-556]

**Floor 0 (Idea):**
<p>Spin a coil in a uniform magnetic field, and the flux through it varies sinusoidally. The induced EMF is a sine wave — alternating current in its purest form. Every power station on Earth, from coal to nuclear to wind, uses this same principle: mechanical rotation → sinusoidal EMF.</p>

**Floor 1 (Concrete):**
<p>A rectangular coil: N = 200 turns, area A = 0.050 m × 0.030 m = 1.5 × 10⁻³ m², rotating at f = 50 Hz (ω = 2πf = 314 rad/s) in B = 0.60 T. Flux at angle θ = ωt: Φ(t) = NBA cos θ = NBA cos ωt = 200 × 0.60 × 1.5×10⁻³ × cos 314t = 0.18 cos 314t Wb. Induced EMF: ε(t) = −dΦ/dt = NBAω sin ωt = 0.18 × 314 × sin 314t = 56.5 sin 314t volts. Peak EMF ε₀ = NBAω = 56.5 V. RMS EMF = ε₀/√2 = 40.0 V. This is a single-phase generator. The output is a pure sine wave at 50 Hz. If the coil is connected to a load R = 20 Ω, the RMS current I_rms = 40.0/20 = 2.0 A, and average power = I_rms²R = 2.0² × 20 = 80 W (or equivalently ε_rms × I_rms × power factor, which is 1 for resistive load).</p>

**Floor 2 (Definition):**
<p>An <strong>AC generator</strong> (alternator) converts mechanical rotation into alternating EMF via Faraday's law. For a coil of N turns, area A, rotating at angular velocity ω in a uniform B-field: the magnetic flux is Φ(t) = NBA cos ωt (taking Φ maximum at t = 0). The induced EMF is <strong>ε(t) = NBAω sin ωt = ε₀ sin ωt</strong>, where ε₀ = NBAω is the peak EMF. The frequency f = ω/2π (50 Hz for most grids, 60 Hz in North America). In practice, generators use a rotating field magnet (rotor) with stationary armature coils (stator) — this avoids slip rings for the high-power output. Three-phase generators have three coils at 120° intervals, producing three sine waves 120° apart — the standard for power transmission (more efficient, constant instantaneous power for balanced loads).</p>

**Floor 3 (In action):**
<p>The AC generator's sine wave is the heartbeat of civilisation. A thermal power plant's turbine spins at 3000 RPM (50 Hz) or 3600 RPM (60 Hz), locked to the grid frequency — every generator on a synchronous grid spins in unison. If demand exceeds supply, the turbines slow slightly, frequency drops, and automatic controls increase steam/water flow. A drop below ~49.8 Hz triggers load shedding to prevent cascade failure. Wind turbines use gearboxes or direct-drive permanent-magnet generators and power electronics to match the grid frequency regardless of wind speed. In a car, the alternator (a three-phase generator with a rectifier) charges the battery and powers all electronics while the engine runs. The same rotating-coil principle in reverse is the synchronous motor — apply three-phase AC and the rotor spins at exactly the grid frequency. Generator and motor are the same machine, time-reversed.</p>

**Image prompt:** A chalk drawing of a rectangular coil rotating between the poles of a magnet (N and S). The coil is shown at four positions: θ = 0 (plane ⊥ B, Φ = max, ε = 0), θ = 90° (plane ∥ B, Φ = 0, ε = ε₀), θ = 180° (Φ = −max, ε = 0), θ = 270° (Φ = 0, ε = −ε₀). The output waveform ε(t) = ε₀ sin ωt. Θ labelled as ωt. Equation ε₀ = NBAω. Chalk on dark green board. Square 1:1.


## BB-NEW-574 — Eddy currents: the hidden brake

**Subject:** physics | **Topic:** magnetism | **Concept:** eddy-currents; induction-in-bulk-conductors; magnetic-braking; lamination | **Ground:** g1 | **Builds on:** [BB-NEW-568, BB-NEW-569]

**Floor 0 (Idea):**
<p>Faraday's law doesn't just work in neat wire loops — it works in any conductor. When a bulk piece of metal moves through a changing B-field, swirling currents are induced throughout its volume. These eddy currents, per Lenz's law, oppose the motion. They're a nuisance in transformers and a blessing in brakes.</p>

**Floor 1 (Concrete):**
<p>A copper disc of radius R = 0.10 m, thickness d = 5.0 mm, rotates at ω = 100 rad/s. A magnet with B = 0.50 T is placed near the rim, over an area A ≈ 1.0 cm² = 1.0 × 10⁻⁴ m². As the disc spins, the flux through the region under the magnet alternates. Induced EMF around a loop in the disc: ε ≈ dΦ/dt. Flux change as the disc enters/exits the B-field region: ΔΦ ≈ BA = 0.50 × 1.0×10⁻⁴ = 5.0 × 10⁻⁵ Wb. Time for the region to pass: Δt ≈ width/v = 0.01 m/(ωR) = 0.01/(100 × 0.10) = 1.0 × 10⁻³ s. Induced EMF: ε ≈ 5.0×10⁻⁵ / 1.0×10⁻³ = 0.050 V. The resistance of the eddy current path in copper is very low (~mΩ), so the induced current can be tens of amps — producing significant I²R heating and a strong magnetic braking force opposing the motion.</p>

**Floor 2 (Definition):**
<p><strong>Eddy currents</strong> (Foucault currents) are circulating currents induced in a bulk conductor by a changing magnetic flux. Unlike currents in a defined wire loop, eddy currents flow in closed paths entirely within the conductor volume, dissipating energy as I²R heat. Their direction is given by Lenz's law — they always oppose the change in flux. Eddy currents cause: (1) <strong>magnetic braking</strong> — a drag force proportional to velocity (used in some trains, roller coasters, and exercise bikes); (2) <strong>induction heating</strong> — used deliberately in induction cooktops and metal melting furnaces; (3) <strong>core losses</strong> in transformers and motors — minimised by <strong>lamination</strong> (splitting the iron core into thin, insulated sheets that interrupt eddy current paths) and using high-resistivity ferrites at high frequencies.</p>

**Floor 3 (In action):**
<p>Eddy current braking is used where friction brakes would wear or fail: some high-speed trains (ICE-3 in Germany), amusement park drop towers, and even some trucks use eddy current retarders. The braking force is proportional to speed, so it can't bring something to a complete stop — friction brakes handle the last few km/h. Induction cooktops use eddy currents: a 25 kHz AC in a coil under the ceramic top induces eddy currents directly in the iron pan, heating it by I²R — the cooktop itself stays cool. Metal detectors use eddy currents: the detector's coil creates an AC B-field, which induces eddy currents in buried metal, which in turn produce their own B-field, which the detector senses. And in transformers, lamination isn't optional — a solid iron core would heat to destruction in seconds. The laminated silicon steel core (thin sheets ~0.3 mm, insulated with varnish) restricts eddy current paths, keeping core loss manageable.</p>

**Image prompt:** A chalk drawing of a solid metal disc rotating between the poles of a magnet. Eddy current paths shown as swirling loops inside the disc (arrows showing direction). The drag force F_brake opposing the motion. A second panel shows a laminated transformer core: thin insulated sheets with interrupted eddy paths — small local loops instead of one large one. Lenz's law: eddy currents oppose the flux change. Chalk on dark green board. Square 1:1.
