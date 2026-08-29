# Frye's Applied Physics → Qubix BBs — Batch 02: Oscillations & Acoustics (15 BBs)

These 15 BBs are drawn from Royal M. Frye's *Essentials of Applied Physics* (1947, Chapters 15–17) — simple harmonic motion, pendulums, wave properties, and sound. Frye's approach: before you can understand quantum mechanics or radio, you need to understand a swing, a ripple, and a tuning fork. These BBs build that foundation with accessible, observation-first explanations.

**Already covered (don't duplicate):** BB-NEW-631 (SHM derivatives — calculus treatment), BB-NEW-624 (Newton's Second Law as ODE — spring case), BB-NEW-630 (wave speed on a string — calculus derivation). This batch is the <em>qualitative and algebraic</em> treatment — accessible to a learner who hasn't yet reached calculus.

**What's new here:** Radial acceleration (why circular motion feels like SHM from the side), the simple pendulum (T = 2π√(L/g) derived without calculus), the compound pendulum and its use in measuring moments of inertia, transverse vs longitudinal waves, reflection/refraction/diffraction/interference of waves, stationary waves on strings, sound speed and its temperature dependence, Doppler effect, harmonics and timbre, Kundt's tube, organ pipes, and the energy of sound waves.

---

## BB-NEW-720 — Back-and-forth: what simple harmonic motion is

**Subject:** physics | **Topic:** mechanics | **Concept:** simple-harmonic-motion; oscillation; restoring-force; equilibrium | **Ground:** g0 | **Builds on:** [BB-NEW-30, BB-NEW-714]

**Floor 0 (Idea):**
<p>Push a child on a swing. She goes forward, slows, stops, comes back, slows, stops — over and over. That's oscillation. Simple harmonic motion is the purest kind: the restoring force pulling her back toward the centre is exactly proportional to how far she is from it. Twice as far from centre = twice the force pulling her back. The result is a motion that traces a perfect sine wave in time.</p>

**Floor 1 (Concrete):**
<p>A 0.50 kg mass hangs on a spring (k = 8.0 N/m). Pull it down 0.10 m and release. The restoring force at maximum stretch: F = kx = 8.0 × 0.10 = 0.80 N — about the weight of 80 grams. The period (time for one complete back-and-forth): T = 2π√(m/k) = 2π√(0.50/8.0) = 2π × 0.25 = 1.57 s. Frequency f = 1/T = 0.637 Hz. The motion is exactly the same whether the amplitude is 10 cm or 1 cm — period depends only on mass and spring stiffness, not on amplitude. This is why a guitar string plays the same note whether you pluck it softly or hard.</p>

**Floor 2 (Definition):**
<p><strong>Simple harmonic motion (SHM)</strong> occurs when the restoring force is proportional to displacement and opposite in direction: F = −kx. The equation of motion: a = −(k/m)x = −ω²x, where ω = 2πf = √(k/m). The solution (with calculus): x(t) = A cos(ωt + φ). <strong>Period:</strong> T = 1/f = 2π/ω = 2π√(m/k) for a spring-mass system. <strong>Key properties:</strong> T is independent of amplitude (isochronism); the motion is sinusoidal; energy alternates between kinetic (maximum at centre) and potential (maximum at extremes); total energy E = ½kA² is constant. SHM is the projection of uniform circular motion onto a diameter — a point moving in a circle, viewed from the side, executes SHM.</p>

**Floor 3 (In action):**
<p>SHM is the fundamental rhythm of the physical world. Atoms in a crystal vibrate around their lattice positions with SHM — the frequency determines the speed of sound in the material. A quartz crystal in a watch oscillates at 32,768 Hz (exactly 2¹⁵) — divide by two fifteen times and you get the 1 Hz tick. The suspension of a car is a damped spring-mass system — the spring provides SHM, the shock absorber removes energy to prevent endless bouncing. Seismometers use SHM: a heavy mass on a weak spring stays nearly stationary while the ground shakes around it, recording the earthquake. Even the gravitational dance of binary stars is approximately SHM when the orbits are nearly circular — the same equation, cosmic scale.</p>

**Image prompt:** A chalk drawing of a mass on a spring oscillating. Three positions shown: maximum stretch, equilibrium, maximum compression. The restoring force F = −kx arrow at each. A sine wave plotted — position vs time — with amplitude A and period T labelled. Equation: T = 2π√(m/k). Chalk on dark green board. Square 1:1.


## BB-NEW-721 — The simple pendulum: timing the swing

**Subject:** physics | **Topic:** mechanics | **Concept:** simple-pendulum; period-T=2pi-sqrt(L/g); isochronism | **Ground:** g0 | **Builds on:** [BB-NEW-720, BB-NEW-500]

**Floor 0 (Idea):**
<p>Tie a weight to a string and let it swing. The time it takes to go back and forth — the period — depends only on the string's length and the strength of gravity. It doesn't depend on the weight of the bob, and (for small swings) it barely depends on the amplitude. A 1-metre pendulum takes about 2 seconds to complete a full swing, no matter what you hang from it.</p>

**Floor 1 (Concrete):**
<p>A pendulum of length L = 1.00 m. Period T = 2π√(L/g) = 2π√(1.00/9.8) = 2π × 0.319 = 2.01 s. Half-period (one swing from left to right) = 1.00 s — which is why grandfather clocks use roughly metre-long pendulums. On the Moon (g = 1.62 m/s²): T = 2π√(1.00/1.62) = 4.95 s — the clock runs much slower. Mass of the bob: irrelevant — a 10 g washer and a 10 kg cannonball on the same 1 m string both take 2.01 s. The restoring force (mg sin θ) increases with mass, but so does inertia (m), and they cancel.</p>

**Floor 2 (Definition):**
<p>A <strong>simple pendulum</strong> consists of a point mass m suspended by a massless, inextensible string of length L. For small angles (θ < ~15°), the motion is approximately SHM with period <strong>T = 2π√(L/g)</strong>. Derivation: restoring force = mg sin θ ≈ mgθ for small θ; torque = −mgLθ; angular acceleration α = −(g/L)θ → ω = √(g/L) → T = 2π/ω. <strong>Isochronism:</strong> T is independent of amplitude (Galileo's discovery, allegedly from watching a swinging chandelier in Pisa Cathedral). For large amplitudes, T increases: T = 2π√(L/g) × (1 + θ₀²/16 + ...) where θ₀ is the maximum angle in radians. At 30°, the correction is about 1.7%.</p>

**Floor 3 (In action):**
<p>The pendulum was the world's most accurate timekeeper for nearly 300 years. Christiaan Huygens built the first pendulum clock in 1656, achieving accuracy of about 15 seconds per day — a revolution in navigation (longitude requires precise time). Foucault's pendulum (1851) demonstrated Earth's rotation: a 67-metre pendulum in the Panthéon in Paris visibly rotated its plane of swing by 11° per hour. The pendulum also measures g: geophysicists use precise pendulum timing to map variations in Earth's gravity, revealing underground ore deposits and oil fields. A child on a swing is a pendulum — pumping her legs at the resonant frequency (matching the natural period) amplifies the motion through resonance.</p>

**Image prompt:** A chalk drawing of a pendulum of length L. The bob displaced by angle θ. Forces: weight mg downward, tension T along string. The restoring force mg sin θ labelled. Equation: T = 2π√(L/g). A small table: L = 0.25 m → T = 1.0 s; L = 1.0 m → T = 2.0 s. Chalk on dark green board. Square 1:1.


## BB-NEW-722 — The compound pendulum: any swinging object

**Subject:** physics | **Topic:** mechanics | **Concept:** compound-pendulum; physical-pendulum; moment-of-inertia-measurement | **Ground:** g1 | **Builds on:** [BB-NEW-721, BB-NEW-644, BB-NEW-289]

**Floor 0 (Idea):**
<p>A real pendulum isn't a point mass on a massless string — it's a cricket bat, a door, a swinging leg. Any rigid object that swings about a pivot is a compound (physical) pendulum. Its period depends on its moment of inertia and the distance from the pivot to its centre of mass. Measure the period, and you can calculate the moment of inertia — a technique engineers use to characterise irregular objects.</p>

**Floor 1 (Concrete):**
<p>A uniform metre stick (mass M = 0.150 kg, length L = 1.00 m) is pivoted at one end and swings as a pendulum. For a rod pivoted at one end: moment of inertia I = ML²/3 = 0.150 × 1²/3 = 0.050 kg·m². Distance from pivot to centre of mass: d = L/2 = 0.50 m. Period: T = 2π√(I/(Mgd)) = 2π√(0.050/(0.150 × 9.8 × 0.50)) = 2π√(0.050/0.735) = 2π × 0.261 = 1.64 s. Compare with a simple pendulum of length L_eq = I/(Md) = 0.050/(0.150 × 0.50) = 0.667 m — this is the <strong>equivalent length</strong>. A simple pendulum of 0.667 m has the same period.</p>

**Floor 2 (Definition):**
<p>A <strong>compound pendulum</strong> (physical pendulum) is any rigid body swinging about a fixed horizontal axis. Period: <strong>T = 2π√(I/(Mgd))</strong>, where I is the moment of inertia about the pivot, M is the mass, g is gravity, and d is the distance from pivot to centre of mass. The <strong>equivalent length</strong> L_eq = I/(Md) is the length of a simple pendulum with the same period. Every compound pendulum has a <strong>centre of oscillation</strong> — the point at distance L_eq from the pivot along the line through the COM. If you pivot the pendulum at the centre of oscillation, the period is the same (the pivot and centre of oscillation are interchangeable). This principle was used by Captain Henry Kater in 1817 to measure g to high precision — the Kater reversible pendulum.</p>

**Floor 3 (In action):**
<p>Compound pendulums measure moments of inertia without calculation. Suspend an irregularly shaped object (a connecting rod, a propeller blade) from a pivot, time the swing, and T = 2π√(I/(Mgd)) gives I directly. This technique was used in early aircraft design to verify the calculated moments of inertia of wings and control surfaces. A cricket bat swung as a pendulum reveals its "sweet spot" — the centre of percussion, where impact produces no reaction at the pivot (your hands). A door is a compound pendulum — the hinges are the pivot, and the period determines how fast it swings shut. A metronome is an adjustable compound pendulum: sliding the weight changes d and thus the tempo.</p>

**Image prompt:** A chalk drawing of a uniform rod pivoted at one end, swinging. The pivot, centre of mass (marked at L/2), and distance d labelled. The moment of inertia I = ML²/3. Equation T = 2π√(I/Mgd). The equivalent simple pendulum of length L_eq = I/(Md) shown beside it. Chalk on dark green board. Square 1:1.


## BB-NEW-723 — Transverse and longitudinal waves

**Subject:** physics | **Topic:** mechanics | **Concept:** transverse-wave; longitudinal-wave; wave-propagation; medium | **Ground:** g0 | **Builds on:** [BB-NEW-630, BB-NEW-720]

**Floor 0 (Idea):**
<p>Flick a rope and a bump travels along it. The rope moves up and down; the wave moves sideways. That's a transverse wave — the medium moves perpendicular to the wave's direction. Clap your hands and a pulse of compressed air travels outward — the air molecules move back and forth along the wave's direction. That's longitudinal. Every wave is one of these two types, or a combination.</p>

**Floor 1 (Concrete):**
<p>On a stretched rope of length 5 m, tension 50 N, linear density 0.02 kg/m: wave speed v = √(T/μ) = √(50/0.02) = √2500 = 50 m/s. A pulse travels the 5 m in 0.1 s. The individual particles of rope move vertically (transverse) — they do not travel with the wave. If you tie a ribbon to the rope, it bobs up and down but stays in place.</p>
<p>In air at 20°C, the speed of sound is 343 m/s. This is a longitudinal wave: air molecules oscillate back and forth along the direction of travel, creating alternating regions of compression (high pressure) and rarefaction (low pressure). In 0.001 seconds, a sound pulse travels 34.3 cm. The molecules themselves move only about 0.0001 mm — the disturbance travels, not the air.</p>

**Floor 2 (Definition):**
<p><strong>Waves</strong> transfer energy through a medium without transferring matter. In <strong>transverse waves</strong>, particle displacement is perpendicular to wave direction (e.g., waves on a string, water surface waves, electromagnetic waves). In <strong>longitudinal waves</strong>, particle displacement is parallel to wave direction (e.g., sound in fluids, P-waves in earthquakes). <strong>Surface waves</strong> (water waves) are a combination: particles move in circular orbits. Wave speed v = distance/time = λf = wavelength × frequency. The speed depends on the medium's elastic and inertial properties, not on the frequency (for most media — dispersion occurs when this fails). <strong>Key insight:</strong> the wave is a pattern moving through the medium; the medium itself oscillates locally.</p>

**Floor 3 (In action):**
<p>The distinction between transverse and longitudinal determines what waves can travel where. S-waves (shear, transverse) from earthquakes cannot travel through Earth's liquid outer core — only P-waves (compression, longitudinal) can. This is how we know the outer core is liquid. Ultrasound imaging uses longitudinal waves in tissue. Sonar uses longitudinal waves in water. Fibre optics use transverse electromagnetic waves in glass. In a tsunami, the wave is transverse at the surface but involves the entire water column — at 4000 m depth, the wave speed is √(gh) ≈ 200 m/s, about the speed of a jetliner. That's why tsunamis cross oceans in hours. The wave that destroys the coast started as a gentle swell in deep water, barely noticeable to a ship.</p>

**Image prompt:** A chalk drawing of a rope with a transverse wave pulse travelling rightward. Arrows show particle motion (up-down) perpendicular to wave direction (right). Beside it: a spring with coils compressed and expanded, showing longitudinal wave — particle motion parallel to wave direction. Labels: wavelength λ, amplitude A. Chalk on dark green board. Square 1:1.


## BB-NEW-724 — Reflection, refraction, and diffraction of waves

**Subject:** physics | **Topic:** mechanics | **Concept:** wave-reflection; wave-refraction; wave-diffraction; Huygens-principle | **Ground:** g0 | **Builds on:** [BB-NEW-723, BB-NEW-311]

**Floor 0 (Idea):**
<p>Waves don't just travel — they interact with obstacles and boundaries. When a wave hits a wall, it bounces back (reflection). When it crosses into a different medium, it bends (refraction). When it passes through a narrow opening, it spreads out (diffraction). All three behaviours are characteristics of waves — and all three can be explained by the same simple idea: every point on a wavefront acts as a source of new circular ripples.</p>

**Floor 1 (Concrete):**
<p><strong>Reflection:</strong> A pulse on a rope hits a fixed end and returns inverted — the wall pulls the rope down as the pulse arrives. Hit a free end (a ring sliding on a pole) and the pulse returns upright. The angle of incidence equals the angle of reflection — true for water waves, sound, and light.</p>
<p><strong>Refraction:</strong> Water waves travel slower in shallow water. When they cross from deep to shallow at an angle, the part that hits first slows down, bending the wavefront. Snell's law for waves: sin θ₁/v₁ = sin θ₂/v₂. A lens focuses light by delaying the centre more than the edges.</p>
<p><strong>Diffraction:</strong> Water waves passing through a harbour entrance spread into a semicircular pattern. The narrower the gap, the more they spread. When the gap width ≈ wavelength, the spreading is dramatic. This is why you can hear someone talking in the next room even though you can't see them — sound waves (λ ≈ 0.1–1 m) diffract around doorways; light waves (λ ≈ 0.0005 mm) do not.</p>

**Floor 2 (Definition):**
<p><strong>Huygens' principle:</strong> Every point on a wavefront acts as a source of secondary spherical wavelets. The envelope of these wavelets forms the new wavefront. This single principle explains all three behaviours. <strong>Reflection:</strong> secondary wavelets from a flat surface reconstruct a reflected wave at equal angle. <strong>Refraction:</strong> wavelets travel at different speeds in different media, bending the envelope. <strong>Diffraction:</strong> when a wavefront is partially blocked, the wavelets at the edges spread into the shadow region. The amount of spreading ≈ λ/w (wavelength/gap width). Significant diffraction requires the gap to be comparable to or smaller than the wavelength.</p>

**Floor 3 (In action):**
<p>These three behaviours are the foundation of optics, acoustics, and radio. Concert hall design uses reflection (sound reflects off walls and ceilings) and diffusion (irregular surfaces scatter sound) to create good acoustics. Ultrasound imaging uses reflection — the probe sends pulses and listens for echoes from tissue boundaries. AM radio (λ ≈ 300 m) diffracts around buildings and hills — you can hear it in valleys. FM radio (λ ≈ 3 m) does not — it's line-of-sight. The reason your WiFi signal drops when you walk into another room is diffraction-limited shadowing: the doorway is a gap, and the 2.4 GHz wavelength (12.5 cm) spreads somewhat, but walls absorb. Sonar uses refraction: sound bends downward in deep water because pressure increases speed, creating "shadow zones" where submarines can hide.</p>

**Image prompt:** A chalk drawing of three wave behaviours. Left: reflection — a straight wavefront hitting a wall and bouncing at equal angle. Centre: refraction — wavefronts bending as they enter shallow water. Right: diffraction — plane waves passing through a narrow gap and spreading into circular arcs. Huygens' principle illustrated with secondary wavelets. Chalk on dark green board. Square 1:1.


## BB-NEW-725 — Interference: when waves meet

**Subject:** physics | **Topic:** mechanics | **Concept:** wave-interference; constructive-destructive; superposition; beats | **Ground:** g0 | **Builds on:** [BB-NEW-723, BB-NEW-724]

**Floor 0 (Idea):**
<p>Two ripples meet on a pond. Where they overlap, they don't collide or bounce — they pass right through each other, and while they overlap, the water surface is the sum of both. This is superposition. If the crests align, they add (constructive interference — bigger wave). If a crest meets a trough, they cancel (destructive interference — flat water). Interference is the signature of wave behaviour.</p>

**Floor 1 (Concrete):**
<p>Two identical speakers emit a 440 Hz tone (wavelength λ = v/f = 343/440 ≈ 0.78 m). You stand 3.00 m from speaker A and 3.39 m from speaker B. Path difference = 0.39 m = λ/2. The waves arrive out of phase — crest from A meets trough from B. Destructive interference: you hear almost nothing. Move 0.39 m to the side, making the distances equal, and the sound is loud — constructive interference. Walk along a line and you hear alternating loud and quiet zones spaced λ/2 apart.</p>
<p><strong>Beats:</strong> Two tuning forks at 440 Hz and 442 Hz struck simultaneously. The interference alternates between constructive (in phase) and destructive (out of phase) at 2 Hz — you hear a "wah-wah-wah" twice per second. Beat frequency = |f₁ − f₂|. Musicians use beats to tune instruments — when the beats disappear, the frequencies match.</p>

**Floor 2 (Definition):**
<p><strong>Superposition principle:</strong> When two or more waves overlap, the resultant displacement at any point is the algebraic sum of the individual displacements. <strong>Constructive interference</strong> occurs when the path difference is an integer number of wavelengths (ΔL = nλ): crests align. <strong>Destructive interference</strong> occurs when ΔL = (n + ½)λ: crest meets trough. The pattern of alternating maxima and minima is an <strong>interference pattern</strong>. For two sources, the angular positions of maxima satisfy d sin θ = nλ, where d is the source separation. <strong>Beats</strong> occur when two waves of slightly different frequencies interfere: f_beat = |f₁ − f₂|. Beats are interference in time rather than space.</p>

**Floor 3 (In action):**
<p>Interference is everywhere. Noise-cancelling headphones use a microphone to pick up ambient sound, invert it, and play it through the speaker — the inverted wave destructively interferes with the original, producing silence. Concert hall designers avoid parallel walls to prevent standing-wave interference patterns (dead spots and hot spots). The colours of an oil slick on water are thin-film interference — light reflecting from the top and bottom of the oil film constructively interferes for some wavelengths, destructively for others. Radio telescopes use interferometry — combining signals from dishes hundreds of kilometres apart — to achieve the resolution of a single dish that size. The LIGO gravitational wave detector uses laser interference to measure changes in distance smaller than a proton's diameter, caused by black holes colliding billions of light-years away.</p>

**Image prompt:** A chalk drawing of two circular wave patterns overlapping. Where crests meet: larger peaks (constructive — labelled). Where crest meets trough: flat (destructive — labelled). Path difference ΔL = nλ (constructive) and (n+½)λ (destructive) shown. Two sine waves of slightly different frequencies producing beats at f_beat = |f₁−f₂|. Chalk on dark green board. Square 1:1.


## BB-NEW-726 — Stationary waves: the reason strings play notes

**Subject:** physics | **Topic:** mechanics | **Concept:** stationary-wave; standing-wave; nodes-antinodes; harmonics | **Ground:** g1 | **Builds on:** [BB-NEW-725, BB-NEW-723, BB-NEW-630]

**Floor 0 (Idea):**
<p>Pluck a guitar string. It doesn't just vibrate randomly — it settles into a pattern of stationary waves. The ends are fixed (can't move), so the wave bounces back and forth, and the forward and reflected waves interfere to create a pattern that appears to stand still. Points that never move (nodes) alternate with points of maximum motion (antinodes). The pitch depends on the string length, tension, and density.</p>

**Floor 1 (Concrete):**
<p>A guitar string: length L = 0.65 m, tension T = 70 N, linear density μ = 0.005 kg/m. Wave speed v = √(T/μ) = √(70/0.005) = √14,000 ≈ 118.3 m/s. Fundamental frequency (first harmonic): f₁ = v/(2L) = 118.3/1.30 = 91.0 Hz (roughly F#₂, the low E string's neighbour). The string has nodes at both ends and an antinode in the middle. Second harmonic: f₂ = 2f₁ = 182 Hz — a node in the middle, two antinodes. Third harmonic: f₃ = 3f₁ = 273 Hz. These integer multiples — the harmonic series — are present simultaneously when you pluck the string, and their relative strengths determine the timbre (why a guitar sounds different from a piano playing the same note).</p>

**Floor 2 (Definition):**
<p><strong>Stationary (standing) waves</strong> form when a travelling wave and its reflection interfere. For a string fixed at both ends: the boundary conditions (displacement = 0 at x = 0 and x = L) allow only wavelengths λ_n = 2L/n, where n = 1, 2, 3, ... The corresponding frequencies are f_n = n v/(2L) = n f₁. <strong>Nodes</strong> (zero displacement) occur at x = 0, L/n, 2L/n, ..., L. <strong>Antinodes</strong> (maximum displacement) occur midway between nodes. The <strong>fundamental</strong> (n = 1) is the lowest frequency; <strong>overtones</strong> (n ≥ 2) are integer multiples. For a pipe open at both ends: same pattern (antinodes at ends, pressure nodes). For a pipe closed at one end: only odd harmonics (n = 1, 3, 5, ...), λ_n = 4L/n.</p>

**Floor 3 (In action):**
<p>Stationary waves are the physics behind every musical instrument. A violin string produces the fundamental plus a rich spectrum of overtones. A flute (open at both ends) produces all harmonics. A clarinet (approximately closed at one end) produces only odd harmonics, giving it its characteristic hollow timbre. Microwave ovens create standing electromagnetic waves — the turntable moves food through the antinodes where the electric field is strongest, preventing cold spots. In quantum mechanics, an electron in an atom is a standing wave around the nucleus — only certain wavelengths (and thus energies) fit, which is why atomic energy levels are quantised. The Schrödinger equation for a particle in a box has the same mathematical form as the standing wave on a string.</p>

**Image prompt:** A chalk drawing of a vibrating string fixed at both ends. The fundamental (n=1): one antinode in the middle. Second harmonic (n=2): two antinodes, node in middle. Third harmonic (n=3): three antinodes. Wavelengths labelled: λ_n = 2L/n. Frequencies f_n = n v/(2L). A pipe diagram beside it: open-open vs open-closed boundary conditions. Chalk on dark green board. Square 1:1.


## BB-NEW-727 — The speed of sound: why thunder lags behind lightning

**Subject:** physics | **Topic:** mechanics | **Concept:** speed-of-sound; sound-in-air; temperature-dependence; sound-in-solids-liquids | **Ground:** g0 | **Builds on:** [BB-NEW-723, BB-NEW-710]

**Floor 0 (Idea):**
<p>Light travels almost instantly. Sound plods along at about 340 metres per second — a leisurely stroll by physics standards. Count the seconds between the flash and the thunder, divide by three, and you have the distance in kilometres. Sound needs a medium — it can't travel through vacuum — and its speed depends on what it's travelling through and how warm that medium is.</p>

**Floor 1 (Concrete):**
<p>Sound in air at 0°C: v = 331 m/s. At 20°C: v ≈ 331 + 0.6 × 20 = 343 m/s. At 40°C (desert): v ≈ 355 m/s. The temperature dependence is roughly v = 331 + 0.6T (T in °C). The formula v = √(γRT/M) gives the exact value: for air (γ = 1.4, R = 8.314, T = 293 K, M = 0.029 kg/mol), v = √(1.4 × 8.314 × 293 / 0.029) = √(3409/0.029) = √117,551 ≈ 343 m/s.</p>
<p>Sound in water at 20°C: v ≈ 1480 m/s (about 4.3× faster than air — water is denser but also far less compressible; the bulk modulus dominates). Sound in steel: v ≈ 5000–6000 m/s (about 15× faster than air). Sound in helium: v ≈ 1000 m/s (low molecular mass → high speed — which is why your voice sounds squeaky after inhaling helium; your vocal cords produce the same frequencies, but the resonant frequencies of your vocal tract shift up).</p>

**Floor 2 (Definition):**
<p>The <strong>speed of sound</strong> in a fluid (gas or liquid) is v = √(B/ρ), where B is the bulk modulus and ρ is density. For an ideal gas, this becomes v = √(γRT/M), where γ = C_p/C_v (≈ 1.4 for diatomic gases), R is the gas constant, T is absolute temperature, and M is molar mass. In solids, v_longitudinal = √((B + 4G/3)/ρ) and v_transverse = √(G/ρ). Key facts: sound speed increases with temperature (for gases), is independent of pressure at constant temperature, and is generally 3–15× faster in liquids and solids than in gases. The temperature dependence accounts for about 0.6 m/s per °C in air.</p>

**Floor 3 (In action):**
<p>The speed of sound limits how fast information can travel through matter. In earthquakes, P-waves (~6 km/s in crust) arrive before S-waves (~3.5 km/s), and both arrive before the destructive surface waves. The time gap tells you the distance to the epicentre. Sonar uses sound speed in water (~1500 m/s) to measure depth — a ping returning in 2 seconds means the seafloor is 1500 m down. Ultrasound imaging measures tissue density by timing echoes — the machine assumes v ≈ 1540 m/s in soft tissue. In music, the speed of sound causes a noticeable delay in large venues — sound from the stage takes about 0.1 s to reach the back of a 34 m hall, which is why orchestras need a conductor to stay synchronised.</p>

**Image prompt:** A chalk drawing of a lightning bolt and a person counting. "1... 2... 3..." seconds = 1 km distance. The speed formula v = √(γRT/M). A table: air 343 m/s, water 1480 m/s, steel 5000 m/s, helium 1000 m/s. Temperature effect v ≈ 331 + 0.6T. Chalk on dark green board. Square 1:1.


## BB-NEW-728 — The Doppler effect: why sirens change pitch

**Subject:** physics | **Topic:** mechanics | **Concept:** Doppler-effect; frequency-shift; moving-source; moving-observer | **Ground:** g0 | **Builds on:** [BB-NEW-727, BB-NEW-723]

**Floor 0 (Idea):**
<p>An ambulance races toward you — its siren sounds high-pitched. The moment it passes, the pitch drops. The siren isn't changing; the distance between wavefronts is. As the source moves toward you, each successive wave crest is emitted closer to the previous one — the wavelength is compressed, the frequency is higher. Moving away, the waves are stretched, and the pitch drops.</p>

**Floor 1 (Concrete):**
<p>An ambulance siren emits f₀ = 800 Hz. Ambulance speed v_s = 30 m/s (108 km/h) toward you. Speed of sound c = 343 m/s. For a moving source approaching a stationary observer: f' = f₀ × c/(c − v_s) = 800 × 343/(343 − 30) = 800 × 343/313 ≈ 877 Hz — almost a semitone sharp. As it recedes: f' = 800 × 343/(343 + 30) = 800 × 343/373 ≈ 736 Hz — about a tone and a half flat. The total shift is roughly 140 Hz.</p>
<p>If you were moving at 30 m/s toward a stationary siren: f' = f₀ × (c + v_o)/c = 800 × 373/343 ≈ 870 Hz. Moving away: 800 × 313/343 ≈ 730 Hz. The formulas differ slightly — for sound, it matters whether the source or the observer is moving, because the medium (air) provides an absolute reference frame.</p>

**Floor 2 (Definition):**
<p>The <strong>Doppler effect</strong> is the change in observed frequency when the source and observer are in relative motion. For sound: <strong>source moving toward observer:</strong> f' = f₀ × c/(c − v_s). <strong>Source moving away:</strong> f' = f₀ × c/(c + v_s). <strong>Observer moving toward source:</strong> f' = f₀ × (c + v_o)/c. <strong>Observer moving away:</strong> f' = f₀ × (c − v_o)/c. For <strong>light</strong> (relativistic): f' = f₀ √((c±v)/(c∓v)) — only the relative velocity matters; there is no medium. Redshift (moving away, f ↓) and blueshift (approaching, f ↑) are used in astronomy. The effect applies to all waves: sound, light, water waves.</p>

**Floor 3 (In action):**
<p>Doppler radar measures the speed of a car by bouncing a radio wave off it and measuring the frequency shift — the speed gun a police officer uses. Weather radar uses Doppler shift to measure wind speed inside storms — the rotation signature of a tornado appears as adjacent regions of strong approach and recession. In medicine, Doppler ultrasound measures blood flow velocity — narrowing of arteries produces higher velocities. Astronomers measure the redshift of distant galaxies to calculate their recession speed — Edwin Hubble used this in 1929 to discover the expansion of the universe. Bats and dolphins use Doppler shifts in their echolocation clicks to determine not just distance but relative speed of prey.</p>

**Image prompt:** A chalk drawing of an ambulance moving right. Circular wavefronts compressed in front (shorter λ, higher f) and stretched behind (longer λ, lower f). The formulas: f' = f₀ c/(c−v_s) approaching, f' = f₀ c/(c+v_s) receding. A radar gun bouncing waves off a car with shifted return frequency. Chalk on dark green board. Square 1:1.


## BB-NEW-729 — Pitch, loudness, and timbre: the three qualities of sound

**Subject:** physics | **Topic:** mechanics | **Concept:** pitch; loudness; timbre; harmonic-series; decibel-scale | **Ground:** g0 | **Builds on:** [BB-NEW-723, BB-NEW-726]

**Floor 0 (Idea):**
<p>Three things distinguish one sound from another: how high or low it is (pitch = frequency), how loud it is (loudness = amplitude, measured in decibels), and what makes a piano sound different from a violin playing the same note (timbre = the mix of overtones). Every sound you hear is a combination of these three physical properties.</p>

**Floor 1 (Concrete):**
<p>A piano plays middle C (262 Hz). A violin plays the same note. Both are at 60 dB. They sound completely different because of their harmonic content. The piano's 262 Hz tone contains overtones at 524 Hz (2nd harmonic, strong), 786 Hz (3rd, weaker), 1048 Hz (4th, moderate), etc. The violin has a different recipe: strong 2nd, very weak 3rd, prominent 5th and 7th. The fundamental is the same; the spectrum of overtones differs. A tuning fork produces almost a pure sine wave — only the fundamental, almost no overtones — which is why it sounds dull and electronic.</p>
<p>Loudness: 0 dB is the threshold of hearing (10⁻¹² W/m²). Normal conversation ≈ 60 dB. A rock concert ≈ 110 dB (pain threshold). Jet engine at 30 m ≈ 140 dB. Every 10 dB increase sounds roughly twice as loud. The decibel scale is logarithmic: dB = 10 log₁₀(I/I₀). A 3 dB increase doubles the intensity (power per area) but is just barely noticeable.</p>

**Floor 2 (Definition):**
<p><strong>Pitch</strong> is the subjective perception of frequency. The human ear can hear approximately 20 Hz to 20,000 Hz (20 kHz), with peak sensitivity around 3–4 kHz. <strong>Loudness</strong> is the subjective perception of intensity. The decibel scale: sound intensity level = 10 log₁₀(I/I₀) dB, where I₀ = 10⁻¹² W/m². Each 10 dB is a factor of 10 in intensity. <strong>Timbre</strong> (tone colour) is determined by the harmonic spectrum — the relative amplitudes of the fundamental and its integer-multiple overtones. A pure tone has no overtones; most musical instruments have rich harmonic spectra. The <strong>attack</strong> and <strong>decay</strong> (how quickly the sound starts and stops) also contribute to timbre.</p>

**Floor 3 (In action):**
<p>Timbre is why you can identify a friend's voice on the phone — the telephone transmits only 300–3400 Hz, but the relative harmonic pattern within that band is enough for recognition. MP3 compression works by discarding harmonics that the ear is less sensitive to (psychoacoustic masking). A sound engineer EQing a mix is adjusting the harmonic balance. Sonar operators are trained to distinguish whale species by the timbre of their calls. The Stradivarius violin's legendary sound is partly its harmonic spectrum — strong high overtones give it "brilliance." And in speech, vowels are distinguished by the frequencies of formants (resonant peaks in the vocal tract), which are essentially a timbre fingerprint.</p>

**Image prompt:** A chalk drawing of a piano key and a violin playing the same note (262 Hz). Below each: a frequency spectrum showing the fundamental and harmonics at different heights. The decibel scale: 0 dB (hearing threshold), 60 dB (conversation), 110 dB (rock concert), 140 dB (jet). Equation: dB = 10 log₁₀(I/I₀). Chalk on dark green board. Square 1:1.


## BB-NEW-730 — Kundt's tube: making sound visible

**Subject:** physics | **Topic:** mechanics | **Concept:** Kundts-tube; standing-sound-waves; speed-of-sound-measurement | **Ground:** g1 | **Builds on:** [BB-NEW-726, BB-NEW-727]

**Floor 0 (Idea):**
<p>Sound waves are invisible — you can hear them but not see them. In 1866, August Kundt devised a way to make standing sound waves visible. A glass tube, a pinch of fine powder, and a loud tone: the powder dances and settles into little piles at the nodes, where the air is still. The distance between the piles is half a wavelength. Measure it, multiply by the frequency, and you have the speed of sound — no electronics required.</p>

**Floor 1 (Concrete):**
<p>A Kundt's tube is a horizontal glass tube about 1 m long, closed at one end with a movable piston. A loudspeaker (or a rod stroked with a resin-coated cloth) generates a pure tone at the open end. Fine cork dust or lycopodium powder is sprinkled along the bottom. When the piston is adjusted to create a standing wave (resonance), the powder gathers in small heaps at the displacement nodes — the points where the air is not moving. The distance between adjacent heaps = λ/2. With f = 1000 Hz and λ/2 = 0.171 m, λ = 0.342 m, so c = fλ = 1000 × 0.342 = 342 m/s — the speed of sound at room temperature.</p>

**Floor 2 (Definition):**
<p><strong>Kundt's tube</strong> is a device for measuring the speed of sound in a gas (or a solid, via a rod extending into the tube). A standing longitudinal wave is established in the tube. Fine powder collects at the displacement nodes (pressure antinodes), making the waveform visible. The distance between adjacent nodes = λ/2. With a known frequency f, v = fλ. The tube can also measure the speed of sound in different gases by filling it with that gas. For a solid rod: the rod is stroked longitudinally to produce a standing wave, and the powder pattern in the gas inside the tube reveals the wavelength in the gas, from which the speed in the solid can be calculated using the frequency match.</p>

**Floor 3 (In action):**
<p>Kundt's tube was the standard laboratory method for measuring the speed of sound for over a century, replaced only by electronic timing in the late 20th century. It's still used in teaching labs because it makes an invisible phenomenon visible. The principle — standing waves in a column — is the same as in an organ pipe. In industrial settings, ultrasonic standing waves are used to levitate small objects and to agglomerate particles in smokestacks (acoustic agglomeration). The pattern of nodes and antinodes also explains why some positions in a room have "dead spots" for certain bass frequencies — the room dimensions create standing waves, and at the nodes, the sound cancels.</p>

**Image prompt:** A chalk drawing of a glass tube with powder heaps at regular intervals. The distance λ/2 between adjacent heaps labelled. A loudspeaker at one end, a movable piston at the other. The standing wave pattern: displacement nodes (powder heaps) and antinodes (clean areas) alternating. Equation: v = fλ. Chalk on dark green board. Square 1:1.


## BB-NEW-731 — Organ pipes and wind instruments

**Subject:** physics | **Topic:** mechanics | **Concept:** organ-pipe; open-pipe; closed-pipe; wind-instrument-physics | **Ground:** g1 | **Builds on:** [BB-NEW-726, BB-NEW-727]

**Floor 0 (Idea):**
<p>An organ pipe is a standing-wave machine. Blow air across the mouth and it sets the air column vibrating at its resonant frequencies. An open pipe (both ends open) produces all harmonics — 1, 2, 3, 4... A closed pipe (one end stopped) produces only odd harmonics — 1, 3, 5... This is why a clarinet (closed pipe) sounds hollow and woody while a flute (open pipe) sounds bright and clear.</p>

**Floor 1 (Concrete):**
<p>An open organ pipe of length L = 0.78 m. Fundamental: f₁ = v/(2L) = 343/(2 × 0.78) = 343/1.56 ≈ 220 Hz (A₃, the A below middle C). Harmonics: f₂ = 440 Hz (A₄), f₃ = 660 Hz (E₅), f₄ = 880 Hz (A₅). All harmonics present.</p>
<p>A stopped (closed) pipe of the same length: f₁ = v/(4L) = 343/(4 × 0.78) = 343/3.12 ≈ 110 Hz (A₂, an octave lower). But only odd harmonics exist: f₃ = 330 Hz (E₄), f₅ = 550 Hz (C♯₅), no f₂, no f₄. A stopped pipe sounds an octave lower than an open pipe of the same length and has a different timbre.</p>
<p>The flute (open at both ends) produces all harmonics. The clarinet (roughly closed at the reed end) produces odd harmonics. The saxophone (conical bore) behaves like an open pipe despite being closed at the reed — the cone shape tricks the physics into producing all harmonics.</p>

**Floor 2 (Definition):**
<p>For a cylindrical pipe: <strong>open at both ends:</strong> displacement antinodes at both ends, f_n = n v/(2L), n = 1, 2, 3, ... All harmonics. <strong>Closed at one end:</strong> displacement node at closed end, antinode at open end, f_n = n v/(4L), n = 1, 3, 5, ... Only odd harmonics. The <strong>fundamental</strong> wavelength for an open pipe is λ = 2L; for a closed pipe, λ = 4L. <strong>End correction:</strong> the effective length is slightly longer than the physical length — the antinode sits about 0.6 × radius beyond the open end. For a flue pipe (organ), the air jet oscillates at the lip, driving the standing wave. For a reed pipe, the reed vibration drives the column.</p>

**Floor 3 (In action):**
<p>Every wind instrument is an application of standing waves. A flute changes pitch by opening and closing holes, effectively changing L. A trombone extends a slide to lengthen the pipe. A trumpet uses valves to route air through additional tubing. The human voice uses the vocal tract as a pipe — vowels are shaped by tongue position changing the resonant frequencies (formants). A didgeridoo is a naturally closed pipe (lips vibrate at one end, open at the other), producing a drone with rich odd harmonics. Cathedral organs with 32-foot pipes (about 10 m) produce frequencies around 16 Hz — near the lower limit of human hearing, felt as much as heard.</p>

**Image prompt:** A chalk drawing of two pipes. Top: open at both ends — standing wave with antinodes at both ends, λ = 2L, all harmonics. Bottom: closed at one end — node at closed end, antinode at open, λ = 4L, only odd harmonics. The harmonic series for each shown as spectral lines. Chalk on dark green board. Square 1:1.


## BB-NEW-732 — The Doppler effect at the speed of a bullet: shock waves

**Subject:** physics | **Topic:** mechanics | **Concept:** shock-wave; sonic-boom; Mach-number; supersonic | **Ground:** g1 | **Builds on:** [BB-NEW-728, BB-NEW-727]

**Floor 0 (Idea):**
<p>When an object moves faster than sound, the wavefronts pile up and merge into a single intense shock wave — a sonic boom. The object outruns its own sound. The shock wave forms a cone behind the object; the angle of the cone depends on the speed. This is the extreme limit of the Doppler effect — the frequency shift goes to infinity, and the mathematics of smooth compression gives way to a discontinuity.</p>

**Floor 1 (Concrete):**
<p>A fighter jet flies at Mach 2 (twice the speed of sound, about 686 m/s at altitude where c ≈ 343 m/s). The sound waves it produces cannot propagate ahead of it — they pile up along a conical shock front. The half-angle of the Mach cone: sin θ = c/v = 1/M = 1/2 → θ = 30°. A person on the ground hears nothing until the shock wave passes — then a sudden sharp crack (the sonic boom) as the entire accumulated wavefront hits in an instant. The boom is not just one event; it's a continuous pressure pulse that travels along the ground.</p>
<p>For a bullet at 900 m/s: M ≈ 2.6, θ = arcsin(1/2.6) ≈ 22.6°. The crack you hear is a miniature sonic boom. The "crack" of a whip is also a sonic boom — the tip of the whip briefly exceeds the speed of sound.</p>

**Floor 2 (Definition):**
<p>When a source moves at speed v > c (the speed of sound in that medium), it creates a <strong>shock wave</strong>. The wavefronts cannot propagate upstream and merge into a conical envelope: the <strong>Mach cone</strong>. The half-angle is given by <strong>sin θ = c/v = 1/M</strong>, where M = v/c is the Mach number. The shock is a thin region (a few mean free paths thick) where pressure, density, and temperature change almost discontinuously. <strong>Sonic boom</strong> is the audible manifestation — a double bang (bow shock and tail shock) from an aircraft, or a single sharp crack from a bullet. For M < 1, the Doppler shift is finite and the waves remain smooth. At M = 1 (transonic), the waves pile up at the source — the "sound barrier."</p>

**Floor 3 (In action):**
<p>Shock waves are everywhere in high-speed physics. The crack of lightning (thunder) is a shock wave from the rapid thermal expansion of air heated to ~30,000 K by the lightning channel. The space shuttle re-entering the atmosphere at Mach 25 created a shock wave that ionised the air — the resulting plasma blackout blocked radio communication for several minutes. In medicine, lithotripsy uses focused shock waves to break up kidney stones without surgery. In astrophysics, supernova remnants expand as shock waves into the interstellar medium, heating gas to millions of degrees. The solar wind forms a bow shock where it meets Earth's magnetosphere — a standing shock wave in space, protecting us from the full force of the solar particle stream.</p>

**Image prompt:** A chalk drawing of a supersonic aircraft with Mach cone behind it. Circular wavefronts emitted at successive positions pile up along the cone. The half-angle θ labelled: sin θ = c/v = 1/M. A person on the ground with sound rays arriving simultaneously as a sonic boom. Chalk on dark green board. Square 1:1.


## BB-NEW-733 — Sound energy: how much power is in a whisper

**Subject:** physics | **Topic:** mechanics | **Concept:** sound-energy; sound-intensity; acoustic-power; spherical-spreading | **Ground:** g1 | **Builds on:** [BB-NEW-729, BB-NEW-47, BB-NEW-647]

**Floor 0 (Idea):**
<p>Sound carries energy. A whisper is about a billionth of a watt. A symphony orchestra at full blast puts out about 10 watts of acoustic power — the same as a nightlight. The ear is extraordinarily sensitive: it can detect vibrations smaller than the diameter of a hydrogen atom. The energy spreads over the surface of a sphere, so intensity falls as 1/r².</p>

**Floor 1 (Concrete):**
<p>A point source emits 1.0 W of acoustic power uniformly in all directions. At distance r = 10 m, the power is spread over a sphere of area 4πr² = 4π × 100 ≈ 1257 m². Intensity I = P/A = 1/1257 ≈ 8.0 × 10⁻⁴ W/m². Sound level = 10 log₁₀(8.0×10⁻⁴/10⁻¹²) = 10 log₁₀(8.0×10⁸) = 10 × 8.9 ≈ 89 dB. At r = 100 m: I falls by 100× to 8.0 × 10⁻⁶ W/m² → 69 dB. Doubling the distance reduces intensity to 1/4 and drops the level by 6 dB.</p>
<p>Comparison of acoustic powers: whisper ≈ 10⁻⁹ W, normal speech ≈ 10⁻⁵ W, shouting ≈ 10⁻³ W, piano ≈ 0.1 W, full orchestra ≈ 1–10 W, rock band ≈ 10–100 W, jet engine (acoustic output) ≈ 1000 W. Even a jet engine converts only about 1% of its mechanical power into sound — most goes into thrust.</p>

**Floor 2 (Definition):**
<p><strong>Sound intensity</strong> I = P/A is the power per unit area (W/m²). For a point source in free space: I = P/(4πr²) — the inverse-square law. <strong>Sound intensity level</strong> L_I = 10 log₁₀(I/I₀) dB, where I₀ = 10⁻¹² W/m². The <strong>total acoustic power</strong> P = ∫ I dA over a closed surface. The ear's sensitivity spans 12 orders of magnitude in intensity — from 10⁻¹² W/m² (hearing threshold) to 1 W/m² (pain). The <strong>energy density</strong> in a sound wave u = I/c (J/m³) — for normal speech at 60 dB, u ≈ 3 × 10⁻¹¹ J/m³, astonishingly small.</p>

**Floor 3 (In action):**
<p>The inverse-square law explains why a concert sounds different in the front row versus the back. Outdoor venues use line arrays — vertical stacks of speakers that produce cylindrical rather than spherical wavefronts, so intensity falls as 1/r instead of 1/r², reaching farther. Sonar systems must account for spherical spreading plus absorption in seawater (which increases with frequency — limiting long-range sonar to low frequencies). In biology, the faintest sounds a bat can detect at 20 m from its prey have intensities around 10⁻¹² W/m² — exactly at the threshold of hearing. The bat compensates by emitting intense pulses (~100 W/m² at 10 cm from the mouth) and using the returning echo, which has travelled a round trip and fallen off as 1/r⁴.</p>

**Image prompt:** A chalk drawing of a point source radiating spherical wavefronts. At r₁ = 10 m, a sphere of area 4πr₁², intensity I₁. At r₂ = 100 m, a larger sphere, I₂ = I₁/100. The table of acoustic powers: whisper 10⁻⁹ W → orchestra 10 W. Equation: I = P/(4πr²). Chalk on dark green board. Square 1:1.


## BB-NEW-734 — Reverberation: why cathedrals echo

**Subject:** physics | **Topic:** mechanics | **Concept:** reverberation; echo; reverberation-time; Sabine-formula | **Ground:** g1 | **Builds on:** [BB-NEW-733, BB-NEW-724]

**Floor 0 (Idea):**
<p>Clap your hands in an empty room. You hear the direct sound, then a rapid series of reflections from the walls, floor, and ceiling, each slightly quieter than the last. This is reverberation. In a cathedral, it lasts for seconds; in a recording studio, it's suppressed to milliseconds. The reverberation time — how long it takes sound to decay by 60 dB — determines whether a room feels "live" or "dead."</p>

**Floor 1 (Concrete):**
<p>A concert hall has dimensions 30 m × 20 m × 15 m (volume V = 9000 m³). Total surface area S ≈ 3000 m². The average absorption coefficient ᾱ (fraction of sound energy absorbed per reflection) is about 0.20 for a well-designed hall at mid-frequencies. Sabine's formula: T₆₀ = 0.161 V/(Sᾱ) = 0.161 × 9000/(3000 × 0.20) = 1449/600 ≈ 2.4 seconds. This is ideal for symphonic music — rich, full sound. For speech, the ideal is about 1.0–1.5 seconds. A recording studio (heavy absorption, ᾱ ≈ 0.5) might have T₆₀ ≈ 0.3 s. A cathedral (stone walls, ᾱ ≈ 0.05, huge volume) can have T₆₀ > 10 seconds — you hear the last syllable of a word long after it was spoken.</p>

**Floor 2 (Definition):**
<p><strong>Reverberation time</strong> RT₆₀ is the time required for sound to decay by 60 dB after the source stops. <strong>Sabine's formula:</strong> T₆₀ = 0.161 V/(Σ S_i α_i), where V is volume (m³), S_i is the area of each surface (m²), and α_i is its absorption coefficient (0 = perfect reflection, 1 = perfect absorption). The formula assumes a diffuse sound field (sound energy uniform and isotropic). <strong>Absorption coefficients</strong> vary with frequency: heavy curtains absorb treble well; bass traps (porous panels, Helmholtz resonators) are needed for low frequencies. An <strong>echo</strong> is a distinct reflection arriving more than ~50 ms after the direct sound; reverberation is a continuous decay of innumerable overlapping reflections.</p>

**Floor 3 (In action):**
<p>Reverberation design separates good halls from bad ones. The Sydney Opera House's original acoustics were criticised; subsequent renovations adjusted absorption to achieve a T₆₀ of about 2.0 s. Boston Symphony Hall (opened 1900) is considered one of the finest in the world — its "shoebox" shape and plaster surfaces give a T₆₀ of about 1.9 s. Recording studios use diffusers (irregular surfaces that scatter sound) to avoid flutter echoes while maintaining some liveness. The anechoic chamber at Orfield Labs in Minnesota has a T₆₀ of about 0.1 s — so quiet you can hear your own heartbeat and the blood moving in your veins. Standing in it for more than a few minutes is disorienting; the absence of reverberation feels unnatural.</p>

**Image prompt:** A chalk drawing of a concert hall cross-section. Sound rays bouncing off walls, ceiling, and floor. The direct sound and multiple reflections labelled. A decay curve: sound level vs time, dropping 60 dB in T₆₀ seconds. Sabine's formula: T₆₀ = 0.161 V/(Sᾱ). Table of T₆₀ values: studio 0.3 s, speech 1.0 s, music 2.0 s, cathedral 10 s. Chalk on dark green board. Square 1:1.


## BB-NEW-735 — The oscillations and acoustics toolkit

**Subject:** physics | **Topic:** mechanics | **Concept:** oscillations-acoustics-summary; SHM-waves-sound-synthesis | **Ground:** g1 | **Builds on:** [BB-NEW-720 through BB-NEW-734]

**Floor 0 (Idea):**
<p>After 15 BBs of oscillations and acoustics, here is the unified picture. Everything that vibrates — a spring, a pendulum, a guitar string, a column of air, the surface of the Sun — obeys the same few principles: restoring force proportional to displacement (SHM), wave speed determined by medium properties, and the universal behaviours of reflection, refraction, diffraction, and interference. Sound is just the particular case where the medium is air and the receiver is a human ear.</p>

**Floor 1 (Concrete):**
<p>Test yourself — identify the principle at work:</p>
<p>1. A pendulum clock: T = 2π√(L/g). Length sets the tempo. Isochronism makes it reliable.</p>
<p>2. A tuning fork: SHM. Pure tone — almost no overtones. Used for calibration.</p>
<p>3. A guitar string: standing waves. f_n = n v/(2L). Harmonics = integer multiples of fundamental.</p>
<p>4. An organ pipe: standing waves in air. Open = all harmonics. Closed = odd only.</p>
<p>5. Thunder lag: speed of sound. Distance (km) = seconds/3. Temperature-dependent.</p>
<p>6. A passing siren: Doppler effect. f' = f₀ c/(c ± v). Pitch shift reveals speed.</p>
<p>7. A concert hall: reverberation. T₆₀ = 0.161 V/(Sᾱ). Absorption controls decay time.</p>
<p>8. Noise-cancelling headphones: destructive interference. Inverted wave + original = silence.</p>

**Floor 2 (Definition):**
<p><strong>Oscillations and acoustics master principles:</strong></p>
<p>• <strong>SHM:</strong> F = −kx, T = 2π√(m/k) (spring), T = 2π√(L/g) (simple pendulum), T = 2π√(I/Mgd) (compound pendulum).</p>
<p>• <strong>Waves:</strong> v = fλ. Transverse (rope, EM) vs longitudinal (sound). v_string = √(T/μ), v_sound = √(γRT/M).</p>
<p>• <strong>Wave behaviours:</strong> reflection (θ_i = θ_r), refraction (Snell: sin θ/v = constant), diffraction (spreading ≈ λ/w), interference (constructive: ΔL = nλ; destructive: ΔL = (n+½)λ).</p>
<p>• <strong>Standing waves:</strong> string fixed at both ends: λ_n = 2L/n. Pipe open: f_n = n v/(2L). Pipe closed: f_n = n v/(4L), n odd.</p>
<p>• <strong>Doppler:</strong> f' = f₀ c/(c ± v_s) (source moving), f' = f₀ (c ± v_o)/c (observer moving).</p>
<p>• <strong>Sound energy:</strong> I = P/(4πr²). dB = 10 log₁₀(I/10⁻¹²). T₆₀ = 0.161 V/(Sᾱ).</p>

**Floor 3 (In action):**
<p>This toolkit explains every sound you've ever heard. A symphony orchestra: the strings are standing waves on stretched strings, the brass and woodwinds are standing waves in air columns, the timpani are vibrating membranes. The conductor's baton sets the tempo — a human pendulum. The hall's shape and materials determine whether the sound wraps around you warmly or dies in a muddy echo. A bat navigating in darkness emits ultrasonic pulses (f ≈ 50 kHz, λ ≈ 7 mm) and hears the echoes — using Doppler shift to track insect speed, time delay for distance, and binaural differences for direction. The principles are the same whether the wave is on a string, in air, or in the plasma of the Sun's corona. Oscillation is nature's default mode of energy storage and release.</p>

**Image prompt:** A chalk drawing of a grand synthesis diagram. A spring (SHM), a pendulum, a guitar string with harmonics, an organ pipe, a ripple tank showing reflection/refraction/diffraction, a Doppler ambulance, a concert hall with reverberation rays. The master table of equations. Chalk on dark green board. Square 1:1.
