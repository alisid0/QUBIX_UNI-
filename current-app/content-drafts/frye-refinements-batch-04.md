# Frye's Applied Physics → Qubix BBs — Batch 04: Refinements (15 BBs)

The final Frye batch covers three topics that round out the physics curriculum: gyroscopic motion (Frye Ch 12), the qualitative physics of magnetism (Frye Ch 22), and the deeper optical phenomena of diffraction and polarization (Frye Ch 30). These are the "refinement" topics — they don't introduce new fundamental laws but deepen understanding of rotation, fields, and waves.

**Already covered (don't duplicate):** BB-NEW-284–295 (torque, angular momentum — mathematical), BB-NEW-550–574 (magnetism — mathematical, Biot-Savart/Ampere/Faraday), BB-NEW-310–324 (optics — ray model, lenses, mirrors).

**What's new here:** Gyroscopic precession and its engineering applications, the qualitative magnetic theory (domains, earth's field, magnetic materials without heavy math), diffraction gratings and the diffraction equation, thin-film interference, polarization by reflection and by filters, birefringence, and optical activity.

---

## BB-NEW-760 — The gyroscope: why spinning things don't fall over

**Subject:** physics | **Topic:** mechanics | **Concept:** gyroscope; angular-momentum-conservation; precession; rigidity-in-space | **Ground:** g1 | **Builds on:** [BB-NEW-290, BB-NEW-292]

**Floor 0 (Idea):**
<p>Spin a bicycle wheel, hold it by the axle, and try to tilt it. It resists — pushing back as if it has a mind of its own. A spinning object with angular momentum wants to keep its axis pointing in the same direction. This is gyroscopic rigidity. Apply a torque to tilt it, and instead of tilting, it precesses — the axis rotates slowly around a circle. Gyroscopes are how ships, planes, and spacecraft know which way they're pointing.</p>

**Floor 1 (Concrete):**
<p>A bicycle wheel: mass m = 2.0 kg, radius r = 0.35 m, spinning at 10 rev/s (ω = 62.8 rad/s). Approximating the wheel as a hoop (I ≈ mr² = 2.0 × 0.1225 = 0.245 kg·m²). Angular momentum L = Iω = 0.245 × 62.8 = 15.4 kg·m²/s. Support one end of the axle. Gravity exerts a torque τ = mgr = 2.0 × 9.8 × 0.35 = 6.86 N·m about the pivot. The wheel doesn't fall — it precesses. Precession angular velocity: Ω = τ/L = 6.86/15.4 = 0.445 rad/s ≈ 4.2 RPM. The wheel's axis traces a slow circle, and the faster the spin, the slower the precession.</p>

**Floor 2 (Definition):**
<p>A <strong>gyroscope</strong> is a spinning rotor whose axle is free to orient in any direction. Two key behaviours: <strong>rigidity in space</strong> — the spin axis maintains its direction unless acted upon by an external torque (conservation of angular momentum). <strong>Precession</strong> — when a torque is applied perpendicular to the spin axis, the axis rotates (precesses) about a third perpendicular axis rather than tilting in the direction of the torque. Precession rate Ω = τ/L, where τ is the applied torque and L is the angular momentum. The direction: the angular momentum vector chases the torque vector. Increasing spin speed increases L and decreases Ω — a fast-spinning gyroscope is stiffer.</p>

**Floor 3 (In action):**
<p>Gyroscopes navigate everything that moves without roads. Ships use gyrocompasses — a spinning wheel that aligns with true north (not magnetic north) because Earth's rotation acts as a torque. Aircraft use attitude gyros to display pitch, roll, and yaw. The Hubble Space Telescope uses reaction wheels — spinning masses whose angular momentum is exchanged with the spacecraft to point precisely. Smartphones use MEMS gyroscopes — tiny vibrating silicon structures that detect rotation via the Coriolis effect, not actual spinning wheels. The Segway uses gyroscopic sensors to balance; a monorail gyro car from 1909 actually stayed upright on a single rail using a large spinning flywheel. And the stability of a thrown frisbee or a rifled bullet is gyroscopic — spin stabilises the trajectory.</p>

**Image prompt:** A chalk drawing of a bicycle wheel gyroscope. One end of the axle supported, the wheel spinning. Gravity torque τ = mgr downward. Precession Ω = τ/L shown as the axis rotating horizontally. Vectors: L (along spin axis), τ (horizontal, from gravity), Ω (precession direction). Chalk on dark green board. Square 1:1.


## BB-NEW-761 — Gyroscopic precession: torque, spin, and the right-hand rule

**Subject:** physics | **Topic:** mechanics | **Concept:** gyroscopic-precession-direction; right-hand-rule; torque-angular-momentum | **Ground:** g1 | **Builds on:** [BB-NEW-760, BB-NEW-285, BB-NEW-290]

**Floor 0 (Idea):**
<p>Push on a gyroscope and it doesn't move the way you expect. Push it down, it moves sideways. The direction of precession follows a strict rule: the angular momentum vector chases the torque vector. This is entirely counterintuitive — your intuition is built for linear motion, not angular — but it follows directly from τ = dL/dt and the cross product.</p>

**Floor 1 (Concrete):**
<p>A gyroscope spins counterclockwise viewed from above — the angular momentum vector L⃗ points upward. Gravity exerts a torque τ⃗ that points horizontally (out of the page, if the pivot is to the left). The torque vector is horizontal. By τ⃗ = dL⃗/dt, the change in L⃗ is in the direction of τ⃗ — horizontally. So L⃗ rotates horizontally — precession. The spin axis stays horizontal but sweeps in a circle. The right-hand rule: fingers of right hand curl in direction of spin; thumb = L⃗. For the torque: r⃗ (from pivot to centre of mass) × F⃗ (gravity down). Point r⃗ horizontally right, curl fingers down (F⃗), thumb points out of page — that's τ⃗. L⃗ chases τ⃗.</p>
<p>Numerical: precession period T = 2π/Ω = 2πL/τ. For our bicycle wheel (L = 15.4, τ = 6.86): T = 2π × 15.4/6.86 = 14.1 s — a full precession circle every 14 seconds.</p>

**Floor 2 (Definition):**
<p>Gyroscopic precession is governed by <strong>τ⃗ = dL⃗/dt</strong>. The torque vector is perpendicular to both the position vector (from pivot to COM) and the gravity force: τ⃗ = r⃗ × mg⃗. The change in angular momentum dL⃗ is parallel to τ⃗, so L⃗ rotates in the direction of τ⃗ — it "chases" the torque. Precession angular velocity: <strong>Ω = τ/(Iω) = mgr/L</strong> for a simple gyroscope. <strong>Nutation:</strong> if the gyroscope is released from rest tilted, it dips slightly (nutation) before settling into steady precession — the initial transient as L⃗ adjusts. <strong>Gyroscopic couple:</strong> the reaction torque the bearings feel — equal and opposite to the torque causing precession.</p>

**Floor 3 (In action):**
<p>Precession explains why a spinning top doesn't fall over — it precesses, and the friction at the tip gradually slows the spin, increasing Ω until the top wobbles and topples. A motorbike at speed is gyroscopically stabilised by its wheels — lean left and the front wheel precesses to steer left, self-correcting. Ship stabilisers use large gyroscopes (hundreds of tonnes) to counteract rolling in heavy seas — the precession torque opposes the wave-induced roll. The Earth itself precesses — its spin axis traces a circle in the sky every 26,000 years due to the gravitational torque from the Sun and Moon on Earth's equatorial bulge. This "precession of the equinoxes" means Polaris won't be the North Star forever — in 12,000 years, Vega will be the pole star.</p>

**Image prompt:** A chalk drawing of the vector diagram for gyroscopic precession. L⃗ (up, along spin axis), τ⃗ (horizontal, from gravity), dL⃗ = τ dt (horizontal). L⃗ rotates toward τ⃗ — precession. The right-hand rules for L (spin direction) and τ (r × F). Precession circle with Ω = τ/L. Chalk on dark green board. Square 1:1.


## BB-NEW-762 — Magnetic domains: why some things are magnets

**Subject:** physics | **Topic:** magnetism | **Concept:** magnetic-domains; ferromagnetism; Curie-temperature; alignment | **Ground:** g0 | **Builds on:** [BB-NEW-563, BB-NEW-564]

**Floor 0 (Idea):**
<p>Why is a paperclip attracted to a magnet, but a copper penny isn't? The answer is inside the atoms. In iron, nickel, and cobalt, each atom is a tiny magnet — the spin of its unpaired electrons creates a magnetic moment. In an unmagnetised piece of iron, these atomic magnets point in random directions, cancelling out. In a magnet, they're aligned. The regions of aligned atoms are called domains — and the physics of how they align and stay aligned is the story of permanent magnetism.</p>

**Floor 1 (Concrete):**
<p>A bar of iron contains roughly 10²² atoms. Each iron atom has 4 unpaired electrons, each contributing a magnetic moment of about 1 Bohr magneton (μ_B = 9.27 × 10⁻²⁴ J/T). If all were aligned, a 1 cm³ cube would have a magnetic moment of about 1.7 × 10⁶ A·m² and would produce a field of about 2.2 T — comparable to a strong electromagnet. In reality, the domains are randomly oriented, and the net field is near zero.</p>
<p>Bring a permanent magnet near the iron: the domains aligned with the external field grow at the expense of others — domain walls move. Remove the magnet: some domains stay aligned (remanence). Heat the iron above its Curie temperature (770°C for iron) and thermal agitation destroys the alignment — the iron becomes paramagnetic. Cool it back down, and it can be re-magnetised.</p>

**Floor 2 (Definition):**
<p><strong>Ferromagnetism</strong> arises from the quantum mechanical exchange interaction, which aligns neighbouring atomic magnetic moments parallel, creating <strong>magnetic domains</strong> — microscopic regions (typically 1–100 µm) of uniform magnetisation. In an unmagnetised sample, domain orientations are random. An external field causes domains aligned with the field to grow. <strong>Domain walls</strong> (Bloch walls) are the transition regions between domains, typically 100–300 atoms wide. <strong>Curie temperature</strong> T_C: above this, thermal energy exceeds exchange energy, and ferromagnetism disappears. T_C (iron) = 1043 K (770°C), nickel = 627 K, cobalt = 1400 K. <strong>Antiferromagnetism:</strong> neighbouring spins anti-align — net moment zero despite ordering.</p>

**Floor 3 (In action):**
<p>Domain theory explains why hammering or heating a magnet demagnetises it — the mechanical shock or thermal energy disrupts domain alignment. Recording tape and hard drives store information by magnetising tiny regions (bits) — the write head creates a field strong enough to flip a domain, and the bit stays flipped for decades. The read head senses the magnetic field of each bit. Magnetic nanoparticles are used in medicine — injected into a tumour and heated by an alternating magnetic field to destroy cancer cells (magnetic hyperthermia). Earth's magnetic field is generated not by a permanent magnet but by a self-sustaining dynamo in the liquid iron outer core — the motion of conducting fluid generates and maintains the field.</p>

**Image prompt:** A chalk drawing of magnetic domains in a bar of iron. Left: random orientations, net B = 0. Right: aligned by an external magnet, net B strong. Domain walls shown as thin boundaries. The Curie temperature diagram: below T_C (ferromagnetic), above T_C (paramagnetic, random). Chalk on dark green board. Square 1:1.


## BB-NEW-763 — The earth's magnetic field: a compass in 3D

**Subject:** physics | **Topic:** magnetism | **Concept:** earth-magnetism; declination; inclination; dynamo-theory | **Ground:** g0 | **Builds on:** [BB-NEW-563, BB-NEW-762]

**Floor 0 (Idea):**
<p>Earth is a giant magnet — but not a simple bar magnet. The magnetic poles wander, the field reverses polarity every few hundred thousand years, and the field at any location has three components: horizontal intensity, vertical intensity, and the angles of declination (horizontal deviation from true north) and inclination (dip angle from horizontal). A compass needle aligns with the local field, not with the geographic pole.</p>

**Floor 1 (Concrete):**
<p>In London (2024): declination ≈ 0.5° East (magnetic north is 0.5° east of true north — nearly aligned). Inclination ≈ 67° (the field points steeply downward into the ground). Horizontal intensity H ≈ 18 µT. Total field B ≈ 49 µT. Vertical component Z ≈ 46 µT downward. In Singapore (near the equator): inclination ≈ 0° (field is horizontal). At the magnetic poles: inclination = 90° (field points straight down/up).</p>
<p>The field approximates a dipole tilted about 11° from the rotation axis, offset from Earth's centre by about 500 km toward the Pacific. The dipole moment m ≈ 7.8 × 10²² A·m², decreasing by about 5% per century. The South Magnetic Pole currently lies in the Southern Ocean off Antarctica; the North Magnetic Pole is in the Canadian Arctic, drifting toward Siberia at about 50–60 km/year.</p>

**Floor 2 (Definition):**
<p>The geomagnetic field at any point is described by: <strong>declination D</strong> (angle between magnetic north and true north), <strong>inclination I</strong> (dip angle from horizontal — positive downward in the northern hemisphere), <strong>horizontal intensity H</strong> = B cos I, <strong>vertical intensity Z</strong> = B sin I. The field is measured in nanotesla (nT) — 1 nT = 10⁻⁹ T. Surface field ranges from ~25 µT (equator) to ~65 µT (poles). The field is generated by the <strong>geodynamo</strong>: convection of molten iron in the outer core, driven by heat from the solid inner core, creates electric currents that sustain the magnetic field.</p>

**Floor 3 (In action):**
<p>Compass navigation requires knowing the local declination — maps include declination diagrams, and pilots and sailors apply corrections. The wandering magnetic pole forces periodic updates to runway numbering (runways are numbered by their magnetic heading). The field reversal record — preserved in magnetised minerals in seafloor basalt — was the key evidence for plate tectonics. Animals from sea turtles to homing pigeons to magnetotactic bacteria sense Earth's field for navigation. In space, the magnetosphere deflects solar wind particles, protecting the atmosphere from erosion. During a magnetic storm (coronal mass ejection), the field at the surface can fluctuate by hundreds of nT, inducing currents in power lines that can trip circuit breakers — as happened in Quebec in 1989, blacking out the province for 9 hours.</p>

**Image prompt:** A chalk drawing of Earth as a dipole magnet. Field lines emerging from the south magnetic pole and converging at the north magnetic pole. The 11° tilt from the rotation axis shown. A compass rose with declination D. A dip needle showing inclination I. Components H, Z, and total B vector at a point. Chalk on dark green board. Square 1:1.


## BB-NEW-764 — Diamagnetism and paramagnetism: everything is magnetic

**Subject:** physics | **Topic:** magnetism | **Concept:** diamagnetism; paramagnetism; universal-magnetism; susceptibility | **Ground:** g0 | **Builds on:** [BB-NEW-762, BB-NEW-564]

**Floor 0 (Idea):**
<p>Everything — water, wood, your hand, a frog — responds to a magnetic field. Most materials are very weakly magnetic. Diamagnetic materials (water, copper, bismuth) are slightly repelled. Paramagnetic materials (aluminium, liquid oxygen, platinum) are slightly attracted. Ferromagnetism (iron) is the flashy exception; diamagnetism and paramagnetism are the quiet rule.</p>

**Floor 1 (Concrete):**
<p><strong>Diamagnetism</strong> (χ < 0, very small): Water χ = −9.0 × 10⁻⁶. Copper χ = −9.6 × 10⁻⁶. Bismuth χ = −1.66 × 10⁻⁴ (strongest elemental diamagnet). In a 16 T magnetic field (strong laboratory magnet), a 1 cm³ bismuth cube experiences a repulsive force of about 0.02 N — enough to feel but not to lift. A frog, which is mostly water, was levitated by Andre Geim in a 16 T field in 2000 — the diamagnetic repulsion balanced gravity. Geim won the Nobel Prize in 2010 for graphene, not the frog.</p>
<p><strong>Paramagnetism</strong> (χ > 0, small): Aluminium χ = +2.2 × 10⁻⁵. Liquid oxygen χ = +3.5 × 10⁻³ — visible attraction to a strong magnet. Gadolinium χ ≈ +0.5 at room temperature (ferromagnetic below 293 K — its Curie point is 293 K, which is why it's so strongly paramagnetic at room temperature).</p>

**Floor 2 (Definition):**
<p><strong>Diamagnetism</strong> is a universal property of all materials, arising from Lenz's law applied to electron orbits: an applied magnetic field induces circulating currents that produce an opposing field. χ_dia ≈ −10⁻⁵ to −10⁻⁶, independent of temperature. It is the ONLY magnetic response for materials with all electrons paired (noble gases, most organic compounds). <strong>Paramagnetism</strong> arises from unpaired electron spins aligning with the applied field. χ_para > 0, typically 10⁻⁵ to 10⁻³. Follows <strong>Curie's law:</strong> χ = C/T (decreases with increasing temperature as thermal agitation disrupts alignment). <strong>Superparamagnetism:</strong> ferromagnetic nanoparticles that behave like giant paramagnets — each particle is a single domain with a huge moment, but they flip randomly.</p>

**Floor 3 (In action):**
<p>Diamagnetism is the basis of magnetic levitation (maglev) for non-ferrous materials — used in materials processing to handle molten metals without contamination. MRI scanners (1.5–7 T) are strong enough that the diamagnetism of water in human tissue produces a very small but measurable effect. Paramagnetic contrast agents (gadolinium compounds) are injected to enhance MRI images — they locally increase the magnetic susceptibility of tissue, altering the relaxation times. Liquid oxygen's strong paramagnetism was discovered in 1893 — it clings to the poles of a magnet. In astronomy, the Zeeman effect (splitting of spectral lines in a magnetic field) measures the magnetic fields of sunspots — fields of 0.1–0.4 T, far stronger than Earth's.</p>

**Image prompt:** A chalk drawing of a diamagnetic material (bismuth) being repelled from a magnet, and a paramagnetic material (aluminium) being attracted. The electron orbit illustration: applied B-field induces circulating current that opposes the field (Lenz). Curie's law graph: χ vs T, hyperbolic decay. Chalk on dark green board. Square 1:1.


## BB-NEW-765 — Diffraction: when light bends around corners

**Subject:** physics | **Topic:** optics | **Concept:** diffraction; single-slit; diffraction-grating; grating-equation | **Ground:** g1 | **Builds on:** [BB-NEW-724, BB-NEW-321, BB-NEW-725]

**Floor 0 (Idea):**
<p>Light travels in straight lines — until it hits an edge or a narrow opening. Then it spreads. This is diffraction. Pass light through a single narrow slit, and it fans out into a pattern of bright and dark bands. Pass it through many parallel slits — a diffraction grating — and it separates into a spectrum of colours, each wavelength bent at a precise angle. Diffraction is the proof that light is a wave.</p>

**Floor 1 (Concrete):**
<p><strong>Single slit:</strong> Width a = 0.10 mm = 10⁻⁴ m, illuminated by red laser (λ = 650 nm = 6.5 × 10⁻⁷ m). The first dark fringe occurs at sin θ = λ/a = 6.5×10⁻⁷/10⁻⁴ = 0.0065 → θ ≈ 0.37°. The central bright band is about 1.3 cm wide on a screen 1 m away. Angular width of central maximum = 2λ/a.</p>
<p><strong>Diffraction grating:</strong> 500 lines/mm → line spacing d = 1/500,000 = 2.0 × 10⁻⁶ m = 2000 nm. For λ = 500 nm (green), first-order maximum (m = 1) at sin θ = mλ/d = 500/2000 = 0.25 → θ = 14.5°. Second order (m = 2): sin θ = 1000/2000 = 0.50 → θ = 30°. Third order (m = 3): sin θ = 1500/2000 = 0.75 → θ = 48.6°. The grating separates white light into a rainbow — red (700 nm) at a larger angle than violet (400 nm).</p>

**Floor 2 (Definition):**
<p><strong>Diffraction</strong> is the spreading of waves when they encounter an obstacle or aperture. <strong>Single-slit diffraction:</strong> minima at a sin θ = mλ (m = ±1, ±2, ...). Central maximum width = 2λ/a. <strong>Diffraction grating:</strong> maxima at <strong>d sin θ = mλ</strong> (m = 0, ±1, ±2, ...), where d is the line spacing. The <strong>resolving power</strong> R = λ/Δλ = mN, where N is the number of illuminated lines. A grating with 500 lines/mm across 50 mm has N = 25,000 lines and R ≈ 50,000 in first order — it can distinguish wavelengths 0.01 nm apart. <strong>Circular aperture:</strong> (telescope, eye) — first dark ring at sin θ ≈ 1.22 λ/D, where D is aperture diameter. This is the <strong>Rayleigh criterion</strong> for resolution.</p>

**Floor 3 (In action):**
<p>Diffraction gratings are the heart of spectroscopy. A spectrometer uses a grating to spread light into its component wavelengths, revealing the chemical composition of stars, the structure of molecules, and the purity of pharmaceuticals. The rainbow you see from a CD or DVD is diffraction — the spiral track acts as a reflection grating with d ≈ 1.6 µm. Holograms are diffraction gratings encoded with phase information. The resolution of a telescope is set by diffraction — the Hubble Space Telescope (2.4 m mirror) can resolve 0.05 arcseconds; a 10 m Keck telescope reaches 0.01 arcseconds. Your eye's pupil (2–8 mm diameter) limits resolution to about 1 arcminute (20/20 vision). X-ray crystallography uses diffraction from atomic planes (d ≈ 0.1 nm) to determine molecular structure — Rosalind Franklin's X-ray diffraction image of DNA was the key evidence for the double helix.</p>

**Image prompt:** A chalk drawing of a single-slit diffraction pattern: central bright maximum, alternating dark and bright fringes. The grating equation d sin θ = mλ with rays from adjacent slits at angle θ. The spectrum: white light in, rainbow out. Rayleigh criterion: two Airy discs just resolved. Chalk on dark green board. Square 1:1.


## BB-NEW-766 — Thin-film interference: why soap bubbles shimmer

**Subject:** physics | **Topic:** optics | **Concept:** thin-film-interference; optical-path-difference; constructive-destructive-colours | **Ground:** g1 | **Builds on:** [BB-NEW-725, BB-NEW-310]

**Floor 0 (Idea):**
<p>A soap bubble in sunlight shimmers with iridescent colours — pink, green, gold, blue — that shift as you move. The colours come from interference between light reflected from the front surface of the thin soap film and light reflected from the back surface. The film is only a few hundred nanometres thick — comparable to the wavelength of light. Depending on the film thickness and the viewing angle, some colours interfere constructively (bright) and others destructively (dark).</p>

**Floor 1 (Concrete):**
<p>A soap film (n = 1.33) in air. Light strikes the film. Ray 1 reflects off the front surface — a phase change of π (180°) occurs because the reflection is from a lower-to-higher index medium. Ray 2 enters, reflects off the back surface (higher-to-lower — no phase change), and exits. The optical path difference is 2nt (twice the film thickness × refractive index) plus the half-wavelength from the phase change. Constructive interference (bright) when 2nt = (m + ½)λ. Destructive (dark) when 2nt = mλ.</p>
<p>For λ = 550 nm (green): film appears green when 2(1.33)t = (m + ½)(550). For m = 0: t = 0.25 × 550/(2 × 1.33) ≈ 52 nm. For a 200 nm film: 2(1.33)(200) = 532 nm. This is approximately mλ for m = 1 (532 ≈ 550), so green is destructively interfered — the film appears magenta (white minus green).</p>

**Floor 2 (Definition):**
<p><strong>Thin-film interference</strong> occurs when light reflects from the top and bottom surfaces of a thin transparent film. The optical path difference (OPD) = 2nt cos θ (for angle θ in the film). Phase changes: a π shift occurs upon reflection from a lower-to-higher index interface. <strong>Constructive:</strong> 2nt cos θ = (m + ½)λ (with one phase change) or mλ (with zero or two). <strong>Destructive:</strong> the opposite. Different colours appear at different angles because the effective path length changes. Applications: anti-reflection coatings (quarter-wave films: t = λ/4n, destructive interference eliminates reflection), dichroic filters (precise thickness layers select specific wavelengths), and the iridescence of butterfly wings, peacock feathers, and pearl.</p>

**Floor 3 (In action):**
<p>Thin-film interference is the reason camera lenses have a bluish or purplish sheen — the anti-reflection coating is optimised for green (the eye's most sensitive colour), so it reflects slightly in blue and red. Eyeglasses use similar coatings. The colours of oil slicks on wet pavement are thin-film interference — the oil layer varies from nanometres to micrometres thick, producing a swirling rainbow. In semiconductor manufacturing, the colour of an oxide layer on silicon reveals its thickness — a quality-control technique called colourimetry. The tapetum lucidum in animal eyes (the reflective layer behind the retina that makes eyes glow in headlights) uses thin-film interference to enhance night vision.</p>

**Image prompt:** A chalk drawing of a thin film with two rays. Ray 1 reflecting off the top (phase change π). Ray 2 entering, reflecting off the bottom, and exiting. Optical path difference = 2nt. Constructive: 2nt = (m+½)λ. A colour wheel showing which wavelengths are reinforced at different thicknesses. Chalk on dark green board. Square 1:1.


## BB-NEW-767 — Polarization: light has a direction

**Subject:** physics | **Topic:** optics | **Concept:** polarization; polarizing-filter; Malus-law; Brewster-angle | **Ground:** g0 | **Builds on:** [BB-NEW-723, BB-NEW-310, BB-NEW-311]

**Floor 0 (Idea):**
<p>Light is a transverse wave — the electric field oscillates perpendicular to the direction of travel. In ordinary sunlight, the oscillations are in all directions (unpolarised). A polarising filter selects only one direction. Two filters at 90° block all light — the second extinguishes what the first passes. This is the clearest proof that light is a transverse wave; longitudinal waves (like sound) cannot be polarised.</p>

**Floor 1 (Concrete):**
<p><strong>Malus's law:</strong> unpolarised light passes through a polariser — intensity is halved (I = I₀/2). This now-polarised light passes through a second polariser (analyser) at angle θ to the first. Transmitted intensity I = I₀/2 × cos²θ. For θ = 0°: I = I₀/2 (maximum). For θ = 45°: I = I₀/2 × 0.5 = I₀/4. For θ = 90°: I = 0 — crossed polarisers block everything.</p>
<p><strong>Brewster's angle:</strong> light reflecting off water or glass at a specific angle is perfectly polarised horizontally. For water (n = 1.33): θ_B = arctan(1.33) = 53°. At this angle, the reflected and refracted rays are perpendicular. The reflected beam contains only the component parallel to the surface — polarised sunglasses exploit this to block glare from water and roads.</p>

**Floor 2 (Definition):**
<p><strong>Polarization</strong> describes the direction of the electric field oscillation in an EM wave. <strong>Linear polarization:</strong> E⃗ oscillates along a fixed line. <strong>Circular polarization:</strong> E⃗ rotates — used in 3D cinema glasses. <strong>Malus's law:</strong> I = I₀ cos²θ for polarised light passing through an analyser. <strong>Brewster's angle:</strong> tan θ_B = n₂/n₁; at this angle, reflected light is fully polarised. <strong>Methods of producing polarized light:</strong> absorption (Polaroid film — aligned iodine crystals in PVA), reflection (Brewster), scattering (sky light is partially polarised), birefringence (calcite splits light into two polarised beams with different speeds).</p>

**Floor 3 (In action):**
<p>Polarised sunglasses reduce glare by blocking horizontally polarised light reflected from horizontal surfaces. LCD screens work by sandwiching a liquid crystal layer between crossed polarisers — applying a voltage rotates the polarisation, controlling pixel brightness. Photographers use polarising filters to darken skies and reduce reflections. Radio antennas are polarised: FM broadcast uses circular polarisation for better reception regardless of antenna orientation. Bees detect polarisation patterns in the sky to navigate — even on a cloudy day, they know where the Sun is. Stress analysis in engineering uses polarised light passed through transparent plastic models — the stress patterns appear as coloured fringes (photoelasticity).</p>

**Image prompt:** A chalk drawing of unpolarised light passing through a polariser (intensity halved), then through an analyser at angle θ (I = I₀/2 cos²θ). Malus's law curve: I vs θ. Brewster's angle: unpolarised incident, reflected ray fully polarised, refracted partially polarised. θ_B + θ_refracted = 90°. Chalk on dark green board. Square 1:1.


## BB-NEW-768 — Birefringence: when one ray becomes two

**Subject:** physics | **Topic:** optics | **Concept:** birefringence; double-refraction; ordinary-extraordinary-rays; calcite | **Ground:** g1 | **Builds on:** [BB-NEW-767, BB-NEW-316]

**Floor 0 (Idea):**
<p>Place a clear calcite crystal over a printed word and you see two images — the crystal splits light into two beams. This is double refraction, or birefringence. Inside the crystal, the speed of light depends on its polarisation and direction of travel. One ray (the ordinary ray) obeys Snell's law normally; the other (the extraordinary ray) bends in unexpected ways. The two rays emerge with perpendicular polarisations.</p>

**Floor 1 (Concrete):**
<p>Calcite (CaCO₃) is the classic birefringent crystal. Refractive indices: n_o = 1.658 (ordinary), n_e = 1.486 (extraordinary). The difference Δn = 0.172 is large enough to visibly separate the images. A calcite rhomb 2 cm thick displaces the extraordinary image by about 1 mm. For a quarter-wave plate (λ/4 retarder): thickness d = λ/(4Δn). For λ = 589 nm (sodium D-line), d = 589/(4 × 0.172) = 856 nm — less than a micrometre. Such thin plates are made by cleaving mica or stretching polymer films.</p>
<p>Liquid crystal displays use birefringence: the elongated molecules align with an applied electric field, changing Δn and thus the polarisation state of transmitted light. Between crossed polarisers, this modulates brightness.</p>

**Floor 2 (Definition):**
<p><strong>Birefringence</strong> (double refraction) occurs in anisotropic materials where the refractive index depends on polarisation and propagation direction. The <strong>ordinary ray</strong> (o-ray) obeys Snell's law and has speed independent of direction; the <strong>extraordinary ray</strong> (e-ray) has speed and refraction that vary with direction. The difference Δn = n_e − n_o (can be positive or negative). <strong>Wave plates</strong> exploit birefringence: quarter-wave (λ/4) converts linear to circular polarisation; half-wave (λ/2) rotates linear polarisation. Birefringence is caused by asymmetry in the crystal lattice (calcite, quartz) or induced by stress (photoelasticity) or electric fields (Kerr effect, Pockels effect).</p>

**Floor 3 (In action):**
<p>Birefringence enables the entire LCD industry — every flat-panel screen, calculator, and digital watch. Polarising microscopes identify minerals by their birefringence colours — geologists use this to analyse rock thin sections. Optical fibre sensors measure strain and temperature by monitoring stress-induced birefringence. The Pockels cell (voltage-controlled wave plate) is used as an ultra-fast optical shutter in laser systems — switching in nanoseconds. In biology, many tissues exhibit birefringence — muscle fibres, collagen, and amyloid plaques all show characteristic patterns under polarised light, aiding diagnosis.</p>

**Image prompt:** A chalk drawing of a calcite rhomb placed over a line of text, producing two images. Ray diagram: unpolarised light entering, splitting into ordinary (obeys Snell) and extraordinary (bends anomalously) rays with perpendicular polarisations. The refractive index ellipsoid. Wave plate converting linear to circular polarisation. Chalk on dark green board. Square 1:1.


## BB-NEW-769 — Scattering: why the sky is blue and sunsets are red

**Subject:** physics | **Topic:** optics | **Concept:** Rayleigh-scattering; Mie-scattering; wavelength-dependence; blue-sky-red-sunset | **Ground:** g0 | **Builds on:** [BB-NEW-310, BB-NEW-321]

**Floor 0 (Idea):**
<p>Sunlight is white — a mix of all colours. Yet the sky is blue and sunsets are red. This is scattering: air molecules are much smaller than the wavelength of visible light, and they scatter short wavelengths (blue) far more efficiently than long wavelengths (red). Rayleigh scattering goes as 1/λ⁴ — blue (450 nm) is scattered about 5× more than red (700 nm). When the Sun is overhead, scattered blue light dominates the sky. When it's low, sunlight travels through more atmosphere, and the blue is scattered away, leaving reds and oranges.</p>

**Floor 1 (Concrete):**
<p>Rayleigh scattering intensity I ∝ 1/λ⁴. Ratio of scattering for blue (450 nm) to red (700 nm): (700/450)⁴ = (1.556)⁴ ≈ 5.9. Blue is scattered nearly 6× more than red. The scattering cross-section for N₂ molecules at sea level: σ ≈ 5 × 10⁻³¹ m². The mean free path for visible light in the atmosphere is about 50–100 km at sea level in the visible — most light reaches the ground unscattered. At sunset, sunlight traverses roughly 10× more atmosphere than at noon — the path is oblique. The blue is depleted; only reds and oranges survive to reach your eye.</p>
<p><strong>Mie scattering</strong> (larger particles — water droplets, dust, pollen): roughly independent of wavelength. Clouds are white because all colours are scattered equally.</p>

**Floor 2 (Definition):**
<p><strong>Rayleigh scattering</strong> occurs when the scattering particles are much smaller than the wavelength (d < λ/10). Intensity I ∝ 1/λ⁴. Polarisation: scattered light is partially polarised at 90° to the incident direction. <strong>Mie scattering</strong> (d ≈ λ): weak wavelength dependence, forward-peaked — explains white clouds and the white glare around the Sun. <strong>Geometric scattering</strong> (d ≫ λ): rainbows, halos — ray optics. The atmosphere's transparency in the visible is a product of the "window" between UV absorption by ozone and IR absorption by water vapour and CO₂.</p>

**Floor 3 (In action):**
<p>Scattering explains the colour of everything you see outdoors. The blue of distant mountains is Rayleigh scattering from the air column between you and the mountain. The blue of the ocean is partly reflected sky, partly water's weak absorption of red light. The green flash sometimes seen at sunset is the last sliver of the Sun's disc, with reds absorbed and blues scattered, leaving only green. Astronaut photographs of Earth from orbit show a thin blue limb — the atmosphere scattering sunlight. On Mars, the sky is butterscotch-coloured because the thin CO₂ atmosphere scatters less, and suspended dust (Mie scattering) dominates. If Earth had no atmosphere, the sky would be black even in daytime — as the Apollo astronauts saw from the Moon.</p>

**Image prompt:** A chalk drawing of sunlight entering the atmosphere. Short blue arrows scattering in all directions, long red arrows continuing straight. The 1/λ⁴ graph: intensity vs wavelength, sharp drop. An observer at noon (blue sky overhead) and at sunset (red sun, long atmospheric path). Chalk on dark green board. Square 1:1.


## BB-NEW-770 — The diffraction grating as a spectrometer

**Subject:** physics | **Topic:** optics | **Concept:** grating-spectrometer; resolving-power; dispersion; spectral-analysis | **Ground:** g2 | **Builds on:** [BB-NEW-765, BB-NEW-753]

**Floor 0 (Idea):**
<p>A diffraction grating is the most precise tool for measuring the wavelength of light. Pass white light through it and it fans out into a spectrum. Measure the angle of each bright line with a protractor, and the grating equation tells you its wavelength to nanometre precision. This is spectroscopy — the technique that revealed the composition of the Sun, the expansion of the universe, and the structure of DNA.</p>

**Floor 1 (Concrete):**
<p>A transmission grating with d = 2.0 µm (500 lines/mm) is illuminated by a sodium lamp. Two bright yellow lines appear in first order (m = 1): one at θ₁ = 17.0°, one at θ₂ = 17.3°. λ = d sin θ. For θ₁ = 17.0°: λ = 2000 × sin(17.0°) = 2000 × 0.2924 = 584.8 nm. For θ₂ = 17.3°: λ = 2000 × 0.2974 = 594.8 nm. These are the famous sodium D-lines — 589.0 nm and 589.6 nm — the doublet that gives sodium streetlights their yellow glow. The grating resolves them easily with Δλ = 0.6 nm.</p>
<p>Resolving power R = λ/Δλ = mN. With N = 10,000 illuminated lines (10 mm of grating at 1000 lines/mm) and m = 2: R = 20,000. At λ = 500 nm, Δλ_min = 0.025 nm — enough to see the hyperfine structure of atomic spectra.</p>

**Floor 2 (Definition):**
<p>A <strong>diffraction grating spectrometer</strong> uses the grating equation d sin θ = mλ to measure wavelengths. <strong>Angular dispersion:</strong> dθ/dλ = m/(d cos θ) — the rate at which angle changes with wavelength. <strong>Linear dispersion:</strong> dx/dλ = f × dθ/dλ at the focal plane (f = focal length). <strong>Resolving power:</strong> R = λ/Δλ_min = mN. <strong>Free spectral range:</strong> the wavelength interval between successive orders at the same angle — FSR = λ/m. Order overlap: a filter or cross-disperser is needed to separate orders. Blazed gratings concentrate light into a specific order by shaping the grooves.</p>

**Floor 3 (In action):**
<p>Spectroscopy is the most productive technique in the history of science. Helium was discovered in the solar spectrum (1868) before it was found on Earth. The redshift of galaxy spectra revealed the expansion of the universe (Hubble, 1929). Raman spectroscopy uses inelastic scattering to identify molecular vibrations. Fibre-optic spectrometers the size of a matchbox now fit inside smartphones for colour measurement and food analysis. In astronomy, the radial velocity method detects exoplanets by measuring the tiny Doppler shift of a star's spectrum as it wobbles. A shift of 0.001 nm at 500 nm corresponds to a velocity of about 600 m/s — resolvable by modern echelle spectrographs with R > 100,000.</p>

**Image prompt:** A chalk drawing of a grating spectrometer. Collimated white light hitting a transmission grating, fanning into spectra at m = 0 (straight through), m = 1 (first order on both sides), m = 2. The sodium D-lines shown as a doublet. The grating equation d sin θ = mλ. A graph of intensity vs wavelength showing two peaks at 589.0 and 589.6 nm. Chalk on dark green board. Square 1:1.


## BB-NEW-771 — Photoelasticity: seeing stress in colour

**Subject:** physics | **Topic:** optics | **Concept:** photoelasticity; stress-birefringence; isochromatic-fringes; polariscope | **Ground:** g2 | **Builds on:** [BB-NEW-767, BB-NEW-768, BB-NEW-707]

**Floor 0 (Idea):**
<p>Place a transparent plastic model of a bridge or a beam between two crossed polarising filters. Apply a load. Instantly, the stressed regions blaze with colour — rainbow fringes that map the stress distribution. This is photoelasticity: stress induces birefringence in transparent materials, and polarised light reveals the pattern. It's one of the most beautiful experimental techniques in physics.</p>

**Floor 1 (Concrete):**
<p>A rectangular beam of photoelastic material (epoxy or polycarbonate) is loaded at its centre. Viewed through crossed polarisers with monochromatic light (λ = 589 nm, sodium lamp): dark fringes appear wherever the principal stress difference σ₁ − σ₂ = N f_σ / t, where N = 1, 2, 3... is the fringe order, f_σ is the material fringe constant, and t is the thickness. Each fringe is a contour of constant stress difference. With white light, the fringes become coloured — each wavelength has its own fringe pattern, and where they overlap, you see a rainbow.</p>
<p>For a circular disc under diametral compression: the stress at the centre is σ_centre = 8F/(πDt), where F is the load and D is the diameter. The fringe order at the centre gives F directly from the colour.</p>

**Floor 2 (Definition):**
<p><strong>Photoelasticity</strong> is the property of some transparent materials (glass, polycarbonate, epoxy) to become birefringent under mechanical stress. The refractive index difference Δn is proportional to the principal stress difference: Δn = C(σ₁ − σ₂), where C is the stress-optic coefficient. In a polariscope (two polarisers with the sample between them): the intensity I = I₀ sin²(πΔn t/λ) = I₀ sin²(πC(σ₁−σ₂)t/λ). Dark fringes occur when πΔn t/λ = Nπ → σ₁ − σ₂ = Nλ/(Ct). With white light, the fringes are coloured. <strong>Isochromatic fringes:</strong> contours of constant σ₁ − σ₂. <strong>Isoclinic fringes:</strong> contours where principal stress directions align with the polariser axes.</p>

**Floor 3 (In action):**
<p>Before finite element analysis (FEA) software, photoelasticity was the primary method for stress analysis of complex shapes. Engineers built scale models of bridges, turbine blades, and pressure vessels in epoxy, loaded them, and photographed the fringe patterns. The technique is still used to validate FEA models for critical components. In medicine, photoelasticity analyses stress in dental implants and bone prostheses. In geology, photoelastic models simulate fault stresses to understand earthquake mechanics. The technique is elegantly simple: a light source, two polarising filters, and a transparent model reveal stresses that would otherwise require hundreds of strain gauges. The colours are not decorative — they are a quantitative map of force flowing through matter.</p>

**Image prompt:** A chalk drawing of a polariscope setup: light source → polariser → loaded beam → analyser (crossed) → camera. The beam showing a pattern of coloured fringes (isochromatics) concentrated at the load point. The stress-optic law: Δn = C(σ₁−σ₂). A sketch of fringe patterns for a disc under compression. Chalk on dark green board. Square 1:1.


## BB-NEW-772 — The magnetometer: measuring the invisible

**Subject:** physics | **Topic:** magnetism | **Concept:** magnetometer; fluxgate; proton-precession; SQUID; magnetic-measurement | **Ground:** g2 | **Builds on:** [BB-NEW-763, BB-NEW-566, BB-NEW-565]

**Floor 0 (Idea):**
<p>How do you measure something you can't see, touch, or hear? A magnetometer detects magnetic fields — from the 50 µT field of Earth to the femtotesla fields of brain activity. There are many types, each exploiting a different physical principle: a compass needle is the simplest; a SQUID (Superconducting Quantum Interference Device) is the most sensitive, capable of detecting fields a billionth of Earth's.</p>

**Floor 1 (Concrete):**
<p><strong>Fluxgate magnetometer:</strong> a core of high-permeability material is driven into saturation by an AC current. An external DC field shifts the saturation point, producing a second-harmonic signal proportional to the field. Sensitivity: ~0.1 nT. Used in spacecraft, submarines, and geophysical surveys.</p>
<p><strong>Proton precession magnetometer:</strong> a bottle of water (or hydrocarbon) is placed in a strong polarising field. The protons (hydrogen nuclei) align. The field is removed, and the protons precess around Earth's field at the Larmor frequency f = γB/(2π), where γ = 2.675 × 10⁸ rad/T·s for protons. For B = 50 µT: f ≈ 2128 Hz — in the audible range. Measure the frequency precisely, and you know B to ~0.1 nT.</p>
<p><strong>SQUID:</strong> a superconducting ring with a Josephson junction. It measures magnetic flux in units of the flux quantum Φ₀ = h/2e = 2.07 × 10⁻¹⁵ Wb. Sensitivity: ~1 fT (10⁻¹⁵ T). A SQUID can detect the magnetic field of a nerve impulse in a single neuron.</p>

**Floor 2 (Definition):**
<p>Magnetometers measure magnetic field strength (B, in tesla) and sometimes direction. Types: <strong>mechanical</strong> (compass — direction only, 1°), <strong>fluxgate</strong> (vector, ~0.1 nT), <strong>proton precession</strong> (scalar, ~0.01 nT, absolute — needs no calibration), <strong>optically pumped</strong> (scalar, ~0.001 nT, uses alkali metal vapour), <strong>SQUID</strong> (vector, ~1 fT, requires cryogenic cooling), <strong>Hall-effect</strong> (semiconductor, ~1 µT, compact and cheap — in your phone). The dynamic range spans 15 orders of magnitude: from 10⁻¹⁵ T (SQUID, brain) to 10 T (MRI).</p>

**Floor 3 (In action):**
<p>Magnetometers are everywhere. Your phone's compass is a 3-axis Hall-effect magnetometer. Submarines navigate by matching measured magnetic field maps to known seabed maps — inertial navigation, corrected by magnetometry. Archaeologists use magnetometers to find buried kilns, hearths, and walls — fired clay carries a thermoremanent magnetisation aligned with Earth's field at the time of firing. Spacecraft carry fluxgate magnetometers to map the magnetic fields of planets — Voyager discovered Uranus's tilted, offset field; Juno is mapping Jupiter's dynamo. SQUIDs are used in magnetoencephalography (MEG) to map brain activity non-invasively — the magnetic fields of neural currents are about 10⁻¹³ T, a billionth of Earth's field.</p>

**Image prompt:** A chalk drawing of three magnetometers. Fluxgate: toroidal core with drive and sense windings. Proton precession: bottle of water, solenoid, signal at Larmor frequency. SQUID: superconducting ring with Josephson junction, flux quantum Φ₀. A scale: Earth's field 50 µT, heart 50 pT, brain 0.1 pT. Chalk on dark green board. Square 1:1.


## BB-NEW-773 — The Hall effect: measuring magnetic fields with semiconductors

**Subject:** physics | **Topic:** magnetism | **Concept:** Hall-effect; Hall-voltage; charge-carrier-density; Lorentz-force-balance | **Ground:** g1 | **Builds on:** [BB-NEW-554, BB-NEW-550, BB-NEW-203]

**Floor 0 (Idea):**
<p>Pass a current through a thin slab of semiconductor in a magnetic field, and a voltage appears across the sides — perpendicular to both the current and the field. This is the Hall effect. The magnetic force deflects charge carriers to one side until the resulting electric field balances it. The Hall voltage reveals the type of charge carrier (positive or negative) and their density — it's a window into the microscopic world of conduction.</p>

**Floor 1 (Concrete):**
<p>A copper strip (thickness t = 0.10 mm, width w = 5.0 mm) carries current I = 10 A in a B = 1.0 T field. For copper, the charge carrier density n ≈ 8.5 × 10²⁸ m⁻³ (one free electron per atom). Hall voltage: V_H = IB/(net) = 10 × 1.0/(8.5×10²⁸ × 1.6×10⁻¹⁹ × 0.0001) = 10/(1.36×10⁶) ≈ 7.4 × 10⁻⁶ V = 7.4 µV — tiny, but measurable.</p>
<p>For a semiconductor with n = 10²² m⁻³ (a million times fewer carriers): V_H = IB/(net) with the same I, B, t produces V_H ≈ 0.6 V — easily measured. This is why Hall sensors use semiconductors: low carrier density gives large Hall voltage.</p>
<p>The sign of V_H reveals the sign of the charge carriers. In metals and n-type semiconductors: negative (electrons). In p-type semiconductors: positive (holes). The Hall effect was the first experimental proof that current in some materials is carried by positive charges — a surprise in 1879.</p>

**Floor 2 (Definition):**
<p>The <strong>Hall effect</strong> produces a transverse voltage V_H in a conductor carrying current I perpendicular to a magnetic field B. V_H = IB/(net) for a rectangular slab of thickness t and charge carrier density n. Derivation: Lorentz force qvB deflects carriers → charge builds up on one side → electric field E_H = V_H/w builds up → equilibrium when qE_H = qvB. Using I = nevA = nev(wt): V_H = IB/(net). The <strong>Hall coefficient</strong> R_H = V_H t/(IB) = 1/(ne) (for a single carrier type). Measuring R_H gives n and the sign of the carriers. The Hall effect is used to measure magnetic fields (Hall probe), detect position (proximity sensors), and measure current non-invasively (clamp meter — Ampere's law + Hall sensor).</p>

**Floor 3 (In action):**
<p>Hall sensors are in your car (crankshaft position, ABS wheel speed), your phone (compass, flip-cover detection), and your keyboard (some mechanical switches use Hall effect for contactless, wear-free sensing). The clamp meter an electrician uses to measure current without breaking the circuit is a Hall sensor measuring the B-field around the wire, calibrated to display amps. In research, the quantum Hall effect (von Klitzing, 1980, Nobel 1985) revealed that at low temperatures and high fields, the Hall resistance is quantised in exact integer fractions of h/e² — now used as the international standard for electrical resistance. The fractional quantum Hall effect (Tsui, Störmer, Laughlin, Nobel 1998) revealed quasiparticles with fractional charge — a new state of matter.</p>

**Image prompt:** A chalk drawing of a rectangular semiconductor slab. Current I along x, magnetic field B into page (along z). Charge carriers deflected to one side, building up charge. Hall voltage V_H across y-direction. Equation V_H = IB/(net). The Hall coefficient R_H = 1/(ne). A Hall probe measuring B: known I, measure V_H → B. Chalk on dark green board. Square 1:1.


## BB-NEW-774 — The cyclotron: accelerating particles with a magnet

**Subject:** physics | **Topic:** magnetism | **Concept:** cyclotron; particle-accelerator; resonance-acceleration; D-shaped-dees | **Ground:** g1 | **Builds on:** [BB-NEW-552, BB-NEW-553, BB-NEW-745]

**Floor 0 (Idea):**
<p>How do you accelerate a proton to millions of electron volts without a million-volt power supply? The cyclotron does it with a magnetic field and a modest alternating voltage. The magnetic field bends the particles into circles; each time they cross the gap between two D-shaped electrodes, the electric field gives them a kick. The beauty: the circular frequency doesn't depend on speed (non-relativistically), so a fixed-frequency AC source keeps accelerating them as they spiral outward. Ernest Lawrence built the first one in 1931 for about $25 in materials.</p>

**Floor 1 (Concrete):**
<p>A cyclotron with B = 1.50 T accelerates protons (m = 1.67 × 10⁻²⁷ kg, q = 1.60 × 10⁻¹⁹ C). Cyclotron frequency: f = qB/(2πm) = (1.6×10⁻¹⁹)(1.5)/(2π × 1.67×10⁻²⁷) = 2.29 × 10⁷ Hz = 22.9 MHz. The AC voltage between the dees (V ≈ 100 kV) must match this frequency. Maximum energy when the particle reaches the dee edge (radius R = 0.50 m): KE_max = q²B²R²/(2m) = (1.6×10⁻¹⁹)²(1.5)²(0.5)²/(2 × 1.67×10⁻²⁷) = 2.16 × 10⁻¹² J = 13.5 MeV. The proton makes ~135 orbits, gaining ~100 keV per crossing. Each turn adds 200 keV (two gap crossings).</p>
<p>Relativistic correction: as v approaches c, the relativistic mass increase detunes the resonance. For protons, this becomes significant above ~20 MeV. The synchrocyclotron varies the RF frequency to compensate. The synchrotron varies both B and f.</p>

**Floor 2 (Definition):**
<p>A <strong>cyclotron</strong> uses a uniform magnetic field to bend charged particles into circular paths and an alternating electric field to accelerate them. <strong>Cyclotron frequency:</strong> f = qB/(2πm) — independent of speed (non-relativistic). <strong>Maximum energy:</strong> KE_max = q²B²R²/(2m). <strong>Dee voltage</strong> V determines the energy gain per gap crossing (qV). The number of turns to reach max energy: N = KE_max/(2qV). <strong>Limitations:</strong> relativistic mass increase detunes resonance; vertical focusing (achieved by shaping the magnetic field to be slightly weaker at larger radii). The <strong>synchrotron</strong> overcomes relativistic limits by varying B and f synchronously — the LHC (CERN) accelerates protons to 7 TeV using this principle.</p>

**Floor 3 (In action):**
<p>Cyclotrons produce radioisotopes for medicine. A medical cyclotron (~15–30 MeV protons) bombards a target to produce ¹⁸F (for PET scans), ⁶⁷Ga (tumour imaging), ¹¹¹In, and ²⁰¹Tl. There are over 1,200 medical cyclotrons worldwide. Larger cyclotrons (TRIUMF in Canada, 500 MeV; PSI in Switzerland, 590 MeV) produce intense beams for materials science and particle physics. Lawrence's first cyclotron was 11 cm in diameter and produced 1.2 MeV protons — he won the 1939 Nobel Prize. His 1931 prototype cost about $25; today a 230 MeV proton therapy cyclotron costs ~$20 million. The principle has not changed: a magnet, two dees, and a radio-frequency oscillator.</p>

**Image prompt:** A chalk drawing of a cyclotron. Two D-shaped hollow electrodes (dees) with a gap between them. A proton spiral path from centre to edge. The uniform B-field into the page. The AC voltage source V₀ sin ωt connected to the dees. Equation: f = qB/(2πm), KE_max = q²B²R²/(2m). Chalk on dark green board. Square 1:1.


## BB-NEW-775 — The refinements toolkit

**Subject:** physics | **Topic:** synthesis | **Concept:** refinements-summary; gyro-magnetism-optics-synthesis | **Ground:** g1 | **Builds on:** [BB-NEW-760 through BB-NEW-774]

**Floor 0 (Idea):**
<p>These 15 BBs have filled the remaining gaps in the physics curriculum: the strange behaviour of spinning objects, the invisible architecture of magnetic fields, and the deeper wave phenomena of diffraction and polarisation. Together with the previous three Frye batches (Applied Mechanics, Oscillations & Acoustics, Applied Electricity), this completes a 60-BB applied physics library.</p>

**Floor 1 (Concrete):**
<p>Test yourself — identify the principle:</p>
<p>1. A spinning top: gyroscopic precession — Ω = τ/L = mgr/(Iω).</p>
<p>2. A compass: Earth's magnetic field — declination, inclination, total intensity ~50 µT.</p>
<p>3. A magnetised screwdriver: ferromagnetic domains — aligned by the external field, some remain aligned (remanence).</p>
<p>4. A CD rainbow: diffraction grating — d sin θ = mλ. Track spacing ~1.6 µm.</p>
<p>5. Polarised sunglasses: Brewster's angle + Malus's law — block horizontally polarised glare.</p>
<p>6. A blue sky: Rayleigh scattering — I ∝ 1/λ⁴. Blue scattered 6× more than red.</p>
<p>7. An MRI scanner: proton precession — f = γB/(2π). At 3 T: f ≈ 128 MHz.</p>
<p>8. A phone compass: Hall effect sensor — V_H = IB/(net). Measures B directly.</p>

**Floor 2 (Definition):**
<p><strong>Refinements master principles:</strong></p>
<p>• <strong>Gyroscope:</strong> L = Iω. Precession Ω = τ/L. Nutation: transient wobble. Gyrocompass: aligns with Earth's rotation axis.</p>
<p>• <strong>Magnetism qualitative:</strong> Domains (regions of aligned spins), Curie temperature T_C. Earth's field: dipole ~50 µT, declination + inclination + intensity. Diamagnetism (χ < 0, universal), paramagnetism (χ > 0, Curie law χ = C/T), ferromagnetism (χ ≫ 0). Hall effect: V_H = IB/(net).</p>
<p>• <strong>Diffraction:</strong> Single slit: a sin θ = mλ. Grating: d sin θ = mλ. Resolving power R = mN. Circular aperture: 1.22 λ/D.</p>
<p>• <strong>Polarization:</strong> Malus's law I = I₀ cos²θ. Brewster's angle tan θ_B = n₂/n₁. Birefringence Δn. Photoelasticity: Δn = C(σ₁−σ₂).</p>
<p>• <strong>Scattering:</strong> Rayleigh (d ≪ λ): I ∝ 1/λ⁴. Mie (d ≈ λ): weak dependence.</p>

**Floor 3 (In action):**
<p>This completes the Frye-Verma synthesis: 241 physics BBs spanning classical mechanics, thermodynamics, electricity, magnetism, optics, acoustics, and applied engineering physics. From the lever to the laser, from the pendulum to the proton cyclotron, the principles are now in place. The next generation of BBs will build on this foundation — quantum mechanics, relativity, condensed matter, and beyond. But the classical foundation, laid by Galileo, Newton, Maxwell, and their successors, and codified by teachers like Verma and Frye, is complete.</p>

**Image prompt:** A chalk drawing of a grand synthesis: a gyroscope (Ω = τ/L), a compass with declination/inclination, a diffraction grating spectrum, crossed polarisers with coloured stress patterns, Rayleigh scattering diagram, a Hall sensor, and a cyclotron spiral. The unified table of principles. "CLASSICAL PHYSICS" at the top. Chalk on dark green board. Square 1:1.
