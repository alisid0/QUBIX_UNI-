# Verma Volume 1 → Qubix BBs — Batch 6: Gravitation (15 BBs for review)

Below are 15 BBs drawn from **Chapter 11** of H.C. Verma's *Concepts of Physics, Volume 1*. These cover Newtonian gravitation in full — law, field, potential, escape, Kepler's laws, orbits, satellites, and weightlessness.

**Already covered (don't duplicate):** Card 16 (qualitative intro — "Everything pulls on everything"), Cards 10–11 (energy concepts), BB 85–104 (measurement, kinematics), BB-NEW-21–50 (forces, Newton's laws, circular motion, work/energy, COM/momentum), BB-NEW-280–295 (rotational mechanics, torque, angular momentum).

**What's new here:** Newton's law of gravitation (quantitative), G and Cavendish, g as field strength, weight = mg derived, g variation with height/depth/rotation, gravitational potential energy U = −GMm/r, escape velocity, Kepler's three laws with derivations, orbital velocity/period/energy, geostationary satellites, weightlessness as continuous free fall.

---

## BB-NEW-500 — Newton's law of gravitation: the inverse-square force

**Subject:** physics | **Topic:** mechanics | **Concept:** newtons-law-of-gravitation; inverse-square; universal | **Ground:** g0 | **Builds on:** [Card 16, BB-NEW-26]

**Floor 0 (Idea):**
<p>Every particle in the universe attracts every other particle. The force is proportional to both masses, inversely proportional to the square of the distance between them, and directed along the line joining them. This single law explains falling apples, orbiting moons, and the structure of galaxies.</p>

**Floor 1 (Concrete):**
<p>Two 1 kg masses placed 1 metre apart attract each other with a force of just 6.67 × 10⁻¹¹ N — the weight of a single bacterium. The same law applied to the Earth (5.97 × 10²⁴ kg) and a 70 kg person at the Earth's surface (r = 6.37 × 10⁶ m) gives F = (6.67 × 10⁻¹¹)(5.97 × 10²⁴)(70) / (6.37 × 10⁶)² = 686 N — your weight. Gravity is weak, but planets are enormous. The Earth–Moon force: 1.98 × 10²⁰ N. The Earth–Sun force: 3.54 × 10²² N.</p>

**Floor 2 (Definition):**
<p><strong>Newton's law of universal gravitation:</strong> The gravitational force between two point masses m₁ and m₂ separated by distance r is F = G m₁ m₂ / r², directed along the line joining them and attractive for both. G = 6.674 × 10⁻¹¹ N·m²/kg² (the universal gravitational constant). The law applies to spherically symmetric bodies as if all mass were concentrated at the centre (Newton proved this). The inverse-square dependence means doubling the distance quarters the force; tripling reduces it to one-ninth. The force obeys the superposition principle — net force on a mass is the vector sum of forces from all other masses.</p>

**Floor 3 (In action):**
<p>Newton didn't discover that things fall — he discovered that the same force pulling an apple downward also pulls the Moon into its orbit. The Moon is 60 Earth-radii away, so gravity there should be 1/60² = 1/3600 of surface gravity. And indeed: the Moon's centripetal acceleration (v²/r ≈ 0.00272 m/s²) is exactly g/3600 ≈ 9.8/3600. This calculation — done by Newton around 1666 — was the first proof that celestial and terrestrial physics are the same. The inverse-square law is universal: it governs falling stones, orbiting satellites, binary stars, and the expansion of the universe itself.</p>

**Image prompt:** A chalk drawing of two masses m₁ and m₂ separated by distance r. Force arrows F point toward each other on both masses — equal, opposite, attractive. The equation F = Gm₁m₂/r² written prominently. A small inset: Earth and Moon with the same equation connecting them. Chalk on dark green board. Square 1:1.


## BB-NEW-501 — G: the gravitational constant and the Cavendish experiment

**Subject:** physics | **Topic:** mechanics | **Concept:** gravitational-constant-G; Cavendish-experiment; torsion-balance | **Ground:** g1 | **Builds on:** [BB-NEW-500]

**Floor 0 (Idea):**
<p>Newton knew the form of the gravitational law — F = Gm₁m₂/r² — but he didn't know the value of G. Measuring the gravitational attraction between two ordinary objects is absurdly difficult because gravity is so weak. It took 111 years after Newton's death before anyone succeeded.</p>

**Floor 1 (Concrete):**
<p>Henry Cavendish (1798) used a torsion balance: a light rod with two small lead spheres (0.73 kg each) suspended by a thin wire. Two larger spheres (158 kg each) were brought near the small ones. The gravitational attraction twisted the wire by a tiny angle. By measuring the twist and knowing the wire's stiffness, Cavendish calculated the force. With the masses and distance known, G = Fr²/m₁m₂ ≈ 6.74 × 10⁻¹¹ N·m²/kg² — within 1% of the modern value. From G, Cavendish could also "weigh the Earth": M_Earth = gR²/G ≈ 5.97 × 10²⁴ kg.</p>

**Floor 2 (Definition):**
<p><strong>G = 6.67430 × 10⁻¹¹ N·m²/kg²</strong> is the universal gravitational constant — the same value everywhere in the universe. It is the fundamental constant of gravitational interaction, analogous to k in Coulomb's law. G is extremely small compared to the electromagnetic force constant (k ≈ 9 × 10⁹), which is why gravity is negligible between everyday objects but dominates at astronomical scales. Modern measurements use improved torsion balances and atom interferometry, reaching precision of about 22 parts per million. G is the least precisely known fundamental constant because gravity is so hard to isolate from other forces.</p>

**Floor 3 (In action):**
<p>Knowing G lets us calculate the mass of anything that has something orbiting it. Mass of Earth: measure g and R, then M = gR²/G. Mass of Sun: measure Earth's orbital period (1 year) and orbital radius (1 AU), then M_Sun = 4π²r³/GT² ≈ 2.0 × 10³⁰ kg. Mass of Jupiter: measure the period and radius of one of its moons. Mass of the Milky Way's central black hole: measure the orbits of stars around it (they whip around at 5000 km/s at a distance of about 100 AU — implying M ≈ 4 million solar masses). Every mass in astronomy traces back to G.</p>

**Image prompt:** A chalk drawing of the Cavendish torsion balance. Two small spheres on a horizontal rod suspended by a vertical wire. Two larger spheres (dashed) brought near them. A curved arrow shows the twist angle. Label: "G = 6.67 × 10⁻¹¹ N·m²/kg²." Chalk on dark green board. Square 1:1.


## BB-NEW-502 — Gravitational field strength g: not just 9.8

**Subject:** physics | **Topic:** mechanics | **Concept:** gravitational-field-strength; g-as-force-per-unit-mass; field-definition | **Ground:** g0 | **Builds on:** [BB-NEW-500]

**Floor 0 (Idea):**
<p>Place a 1 kg mass anywhere in space and measure the gravitational force on it. That force, in newtons per kilogram, is the gravitational field strength at that point. At Earth's surface, it's 9.8 N/kg. The field is a way of describing "how hard gravity pulls" at every location, even without a test mass being there.</p>

**Floor 1 (Concrete):**
<p>At Earth's surface: g = GM/R² = (6.67×10⁻¹¹)(5.97×10²⁴)/(6.37×10⁶)² = 9.80 N/kg. On the Moon's surface: g_Moon = GM_Moon/R_Moon² = (6.67×10⁻¹¹)(7.35×10²²)/(1.74×10⁶)² = 1.62 N/kg — about one-sixth of Earth's. On Mars: g_Mars ≈ 3.71 N/kg. On Jupiter's cloud tops: g_Jupiter ≈ 24.8 N/kg. A 70 kg person weighs 686 N on Earth, 113 N on the Moon, and 1736 N on Jupiter — same mass, completely different weight because g is different.</p>

**Floor 2 (Definition):**
<p>The <strong>gravitational field strength</strong> at a point is the gravitational force per unit mass experienced by a small test mass placed at that point: g⃗ = F⃗/m. For a point mass M (or spherically symmetric body), g = GM/r² directed radially inward. The field is a vector field — it has a magnitude and direction at every point in space. The SI unit is N/kg, which is dimensionally equivalent to m/s². Near Earth's surface, the field is approximately uniform (parallel, equal magnitude) at 9.8 N/kg downward. The field concept, introduced by Faraday for electromagnetism, eliminates "action at a distance" — masses create fields, and fields exert forces on other masses.</p>

**Floor 3 (In action):**
<p>The gravitational field is what lets you calculate the force on any mass without re-deriving. Once you know g⃗ at a point, the force on a mass m at that point is simply F⃗ = mg⃗. This is true on any planet. The "surface gravity" of exoplanets — planets orbiting other stars — is estimated from their mass and radius. Kepler-10c, a "mega-Earth," has about 17 Earth masses and 2.35 Earth radii, giving g ≈ 30 N/kg — three times Earth's. An astronaut there would weigh triple but could never stand up. The field concept is also what lets us map the gravity of the Earth itself — the GRACE satellites measure tiny variations in g to track groundwater, ice melt, and tectonic shifts.</p>

**Image prompt:** A chalk drawing of Earth with field lines (arrows) pointing radially inward, getting shorter as distance increases. At the surface, a 1 kg block with a downward arrow labelled "g = 9.8 N/kg." Beside it: a smaller Moon with field lines, labelled "g = 1.6 N/kg." The vector field concept is shown as g⃗ = F⃗/m. Chalk on dark green board. Square 1:1.


## BB-NEW-503 — Weight = mg: derived, not assumed

**Subject:** physics | **Topic:** mechanics | **Concept:** weight-equals-mg; deriving-weight-from-gravitation; apparent-weight | **Ground:** g0 | **Builds on:** [BB-NEW-500, BB-NEW-502]

**Floor 0 (Idea):**
<p>Your weight is not a fundamental property — it's the gravitational force the Earth exerts on your mass. Weight = mg is not an independent fact; it follows directly from Newton's law of gravitation when you're near the surface of a planet.</p>

**Floor 1 (Concrete):**
<p>Start with Newton's law: F = GMm/R² for a mass m at the surface of a planet of mass M and radius R. Factor out m: F = m × (GM/R²). The term in brackets is the gravitational field strength g. So weight w = mg. For Earth: g = 9.80 N/kg. Your 70 kg body experiences w = 70 × 9.80 = 686 N. But what about apparent weight? In an accelerating lift, the scale reads normal force N. If the lift accelerates upward at 2 m/s², the net force is N − mg = ma, so N = m(g + a) = 70(9.8 + 2) = 826 N — you feel heavier. If the cable snaps (a = −g), N = 0 — you're weightless while falling.</p>

**Floor 2 (Definition):**
<p><strong>Weight</strong> is the gravitational force exerted on a body by the planet (or other astronomical body) it rests on or near: w⃗ = mg⃗. Weight has units of newtons (N), not kilograms — kilograms measure mass, which is invariant. <strong>Apparent weight</strong> is the normal force exerted by a supporting surface (a scale, a floor, a seat). In a non-accelerating frame on the surface, apparent weight = true weight = mg. Under acceleration, apparent weight differs from mg. In free fall, apparent weight = 0 even though true weight = mg still acts. Mass is intrinsic; weight depends on where you are.</p>

**Floor 3 (In action):**
<p>The distinction between mass and weight is deadly serious. A 1 kg bag of sugar has mass 1 kg everywhere — on Earth, on the Moon, in deep space. Its weight on Earth is 9.8 N; on the Moon, 1.6 N; in deep space, nearly 0. Engineers designing spacecraft, roller coasters, and aircraft calculate in newtons, not kilograms, because the forces — not the masses — determine whether structures hold. Astronauts train in "zero-g" aircraft that fly parabolic arcs: during the 25-second free-fall segment, apparent weight drops to zero, but their mass and true weight haven't changed. They're falling with the plane.</p>

**Image prompt:** A chalk drawing of a person standing on a bathroom scale. The scale reads "686 N = 70 kg." Two arrows from the person: mg downward, N upward (equal). A second panel shows the same person in an accelerating lift: N > mg. The derivation chain: F = GMm/R² → F = m(GM/R²) → w = mg. Chalk on dark green board. Square 1:1.


## BB-NEW-504 — Variation of g with height: why gravity weakens as you climb

**Subject:** physics | **Topic:** mechanics | **Concept:** g-variation-with-height; binomial-approximation; g-at-altitude | **Ground:** g1 | **Builds on:** [BB-NEW-502, BB-NEW-503]

**Floor 0 (Idea):**
<p>Climb a mountain and you weigh slightly less. At the altitude of the International Space Station, gravity is still about 90% of surface value — astronauts float not because gravity is gone, but because they're in free fall.</p>

**Floor 1 (Concrete):**
<p>At height h above Earth's surface: g(h) = GM/(R + h)² = g₀ × R²/(R + h)², where g₀ = 9.80 N/kg. At the top of Mount Everest (h ≈ 8.85 km): g ≈ 9.80 × (6371/6380)² ≈ 9.77 N/kg — a drop of 0.3%, reducing a 70 kg person's weight from 686 N to about 684 N. At the ISS altitude (h ≈ 400 km): g ≈ 9.80 × (6371/6771)² ≈ 8.67 N/kg — still 88% of surface g! At 10,000 km: g ≈ 9.80 × (6371/16371)² ≈ 1.48 N/kg. For h ≪ R, use the binomial approximation: g(h) ≈ g₀(1 − 2h/R). At 100 km: g ≈ 9.80(1 − 200/6371) ≈ 9.49 N/kg.</p>

**Floor 2 (Definition):**
<p><strong>Variation of g with height:</strong> For a spherical Earth, g(h) = GM/(R + h)² = g₀ [R/(R + h)]², where g₀ = GM/R² is the surface value. For h ≪ R (up to ~100 km), the binomial approximation gives g(h) ≈ g₀(1 − 2h/R). The fractional decrease is Δg/g₀ ≈ −2h/R. At 1 km altitude, g drops by about 0.03%. At geostationary orbit (h = 35,786 km), g ≈ g₀(6371/42157)² ≈ 0.224 N/kg — just 2.3% of surface gravity. The inverse-square law means g falls off rapidly at first, then more gradually at large distances.</p>

**Floor 3 (In action):**
<p>This explains the most common misunderstanding about space. "Zero gravity" doesn't exist in low Earth orbit — the ISS experiences 88% of surface gravity. Astronauts float because the ISS is constantly falling toward Earth, and they're falling with it. The same principle applies to the Vomit Comet training aircraft and to skydivers before the parachute opens. The variation with height also matters for precision: a pendulum clock calibrated at sea level runs slow in Denver (the "mile-high city," h ≈ 1600 m, g about 0.05% smaller). GPS satellites must account for both the weaker gravity at 20,200 km altitude and relativistic time dilation — without these corrections, GPS would drift by about 11 km per day.</p>

**Image prompt:** A chalk drawing of Earth with g(h) plotted as a curve decreasing with height. Three altitude markers: Everest (g = 0.997g₀), ISS (g = 0.88g₀), geostationary (g = 0.023g₀). A dashed arrow shows the orbit path at each altitude. Equation: g(h) = g₀ R²/(R+h)². Chalk on dark green board. Square 1:1.


## BB-NEW-505 — Variation of g with depth and Earth's rotation

**Subject:** physics | **Topic:** mechanics | **Concept:** g-variation-with-depth; shell-theorem; g-variation-with-latitude | **Ground:** g2 | **Builds on:** [BB-NEW-504]

**Floor 0 (Idea):**
<p>If you could drill into the Earth, gravity would decrease — not increase. At the centre, g = 0. And because the Earth spins, you weigh slightly less at the equator than at the poles. These are two independent effects that both modify surface g.</p>

**Floor 1 (Concrete):**
<p>At depth d below the surface: only the mass of the sphere of radius (R − d) contributes to gravity — the outer shell cancels (Newton's shell theorem). For uniform density, g(d) = g₀(1 − d/R). At d = R/2 (halfway to centre): g = g₀/2. At the centre (d = R): g = 0. Now the rotation effect: at latitude λ, the centripetal acceleration is ω²R cos λ. The effective g' = g − ω²R cos²λ. At the equator (λ = 0°): g' = g₀ − ω²R = 9.80 − (7.27×10⁻⁵)²(6.37×10⁶) = 9.80 − 0.034 = 9.766 N/kg. At the poles (λ = 90°): g' = 9.832 N/kg. The equator-to-pole difference is about 0.066 N/kg — about 0.7% of g₀.</p>

**Floor 2 (Definition):**
<p><strong>Variation with depth:</strong> For a uniform sphere, g(d) = g₀(1 − d/R) inside the Earth. This follows from the shell theorem: the gravitational force inside a uniform spherical shell is zero. Only the mass inside radius (R − d) contributes. <strong>Variation with rotation:</strong> g' = g − ω²R cos²λ, where ω = 2π/(86400 s) = 7.27 × 10⁻⁵ rad/s is Earth's angular velocity, R is Earth's radius, and λ is latitude. The correction is maximum at the equator (cos λ = 1) and zero at the poles. The actual Earth is not a perfect sphere (it bulges at the equator), which adds a further latitude-dependent correction.</p>

**Floor 3 (In action):**
<p>The depth variation of g was confirmed in mine shafts and the deep Homestake gold mine in South Dakota (g decreases with depth — the shell theorem works). The equatorial bulge means Earth's radius is about 21 km larger at the equator than at the poles, combining with rotation to make equatorial g about 0.5% smaller than polar g. This matters for everything from pendulum clocks to sports records — a pole-vaulter weighs less at the equator, so in principle they should jump higher there. In reality, the effect is swamped by wind, temperature, and technique, but the physics is real. The fact that g = 0 at Earth's centre means that if you fell through a tunnel through the Earth, you'd oscillate back and forth — simple harmonic motion — with a period of about 84 minutes.</p>

**Image prompt:** A chalk drawing split into two panels. Left: cross-section of Earth showing depth d, with only the inner sphere (radius R−d) shaded as contributing mass. Equation: g(d) = g₀(1−d/R). Right: Earth rotating, with latitude λ marked. Two arrows at a point on the surface: g downward, ω²Rcosλ outward. The resultant g' is the vector sum. Chalk on dark green board. Square 1:1.


## BB-NEW-506 — Gravitational potential energy: U = −GMm/r

**Subject:** physics | **Topic:** mechanics | **Concept:** gravitational-potential-energy; negative-U; zero-at-infinity | **Ground:** g2 | **Builds on:** [BB-NEW-500, BB-NEW-46]

**Floor 0 (Idea):**
<p>You learned gravitational potential energy as mgh — the energy of height. That formula only works near Earth's surface, where g is roughly constant. The true potential energy of two masses separated by distance r is U = −GMm/r — negative, because gravity is attractive, and zero only at infinite separation.</p>

**Floor 1 (Concrete):**
<p>For a 70 kg person at Earth's surface: U = −GMm/R = −(6.67×10⁻¹¹)(5.97×10²⁴)(70)/(6.37×10⁶) = −4.38 × 10⁹ J. That's negative four billion joules — the energy you'd need to provide to escape Earth's gravity entirely. Compare with mgh: if you lift the same person by h = 100 m, mgh = 70 × 9.8 × 100 = 68,600 J. The change in U using the full formula: ΔU = −GMm/(R+h) + GMm/R. For h ≪ R, this simplifies to mgh. The mgh formula is the first-order approximation — good for skyscrapers, useless for satellites.</p>

**Floor 2 (Definition):**
<p><strong>Gravitational potential energy</strong> for two point masses: U(r) = −GMm/r, where r is the separation and the zero of potential energy is chosen at r → ∞. The negative sign means the system is bound — energy must be added to separate the masses. For a mass m in the field of a spherical body M, the same formula applies with r measured from the centre. The change in potential energy when moving from r₁ to r₂ is ΔU = −GMm(1/r₂ − 1/r₁). For small height changes near the surface (Δr = h ≪ R), this reduces to ΔU ≈ mgh, recovering the familiar near-Earth formula.</p>

**Floor 3 (In action):**
<p>The negative potential energy is not a mathematical quirk — it's the reason satellites stay in orbit. A satellite with total energy E = K + U < 0 is bound to Earth; with E ≥ 0, it escapes. The transition from bound (elliptical orbit) to unbound (hyperbolic trajectory) happens at E = 0, which corresponds to the escape speed. This also explains why rockets need so much fuel: to go from Earth's surface (deep in the negative potential well) to infinity takes about 63 MJ per kilogram — the specific orbital energy. Interplanetary missions budget every metre per second of Δv against this potential well. The gravitational well of the Sun is even deeper — escaping the solar system from Earth's orbit requires 42.1 km/s relative to the Sun.</p>

**Image prompt:** A chalk drawing of U(r) = −GMm/r plotted as a curve. The vertical axis is U, the horizontal axis is r. The curve starts at large negative values at small r and approaches zero from below as r → ∞. A horizontal dashed line at U = 0. A mass m near the Earth is shown deep in the well. The mgh approximation is shown as a linear tangent at r = R. Chalk on dark green board. Square 1:1.


## BB-NEW-507 — Escape velocity: fast enough to leave forever

**Subject:** physics | **Topic:** mechanics | **Concept:** escape-velocity; binding-energy; v_esc-derivation | **Ground:** g1 | **Builds on:** [BB-NEW-506, BB-NEW-45]

**Floor 0 (Idea):**
<p>Throw a ball upward and it falls back. Throw it at 11.2 km/s and it never returns. Escape velocity is the minimum speed an object needs to break free of a planet's gravity — to coast to infinity with zero remaining speed.</p>

**Floor 1 (Concrete):**
<p>Derivation: at escape, the total mechanical energy at infinity is zero (K = 0, U = 0). At launch (r = R, speed = v_e): ½mv_e² + (−GMm/R) = 0. Solving: v_e = √(2GM/R). For Earth: v_e = √(2 × 6.67×10⁻¹¹ × 5.97×10²⁴ / 6.37×10⁶) = √(1.25×10⁸) = 11.2 km/s = 40,320 km/h. Using g: v_e = √(2gR) = √(2 × 9.8 × 6.37×10⁶) = 11.2 km/s. Escape velocity from the Moon: 2.38 km/s. From Mars: 5.03 km/s. From Jupiter: 59.5 km/s. From the Sun's surface: 618 km/s. From a black hole's event horizon: c (300,000 km/s).</p>

**Floor 2 (Definition):**
<p><strong>Escape velocity</strong> v_e is the minimum initial speed required for an object to escape a planet's (or other body's) gravitational field — that is, to reach r → ∞ with v → 0, starting from the surface. It is given by v_e = √(2GM/R) = √(2gR). Escape velocity does <em>not</em> depend on the mass of the escaping object, nor on the direction of launch (as long as the trajectory doesn't intersect the planet). It assumes no further propulsion after launch (ballistic escape) and no atmospheric drag. The object's kinetic energy at launch must equal its gravitational binding energy: ½mv_e² = GMm/R.</p>

**Floor 3 (In action):**
<p>Escape velocity determines the economics of spaceflight. Low Earth orbit requires about 7.8 km/s (orbital velocity); escape from Earth requires an additional 3.4 km/s — the difference is the "escape increment." The Apollo missions accelerated to nearly Earth escape velocity, then used the Moon's gravity to slow down. The Voyager probes, launched in 1977, are on hyperbolic trajectories — they exceeded solar escape velocity from Earth's orbit and are now interstellar. For a black hole, escape velocity exceeds c at the event horizon (Schwarzschild radius r_s = 2GM/c²). Nothing, not even light, can escape from within.</p>

**Image prompt:** A chalk drawing of Earth with three trajectories: a short arc falling back (v < v_e), a longer arc going into orbit (v = v_orb < v_e), and a straight path curving slightly but continuing to infinity (v ≥ v_e). Speeds labelled: 8 km/s (orbit), 11.2 km/s (escape). Derivation: ½mv² = GMm/R → v = √(2GM/R). Chalk on dark green board. Square 1:1.


## BB-NEW-508 — Kepler's First Law: planets move in ellipses

**Subject:** physics | **Topic:** mechanics | **Concept:** keplers-first-law; elliptical-orbits; conic-sections | **Ground:** g1 | **Builds on:** [BB-NEW-500, BB-NEW-39]

**Floor 0 (Idea):**
<p>For nearly 2000 years, everyone believed orbits were circles — the "perfect" shape. Kepler, analysing Tycho Brahe's meticulous data on Mars (1609), discovered the truth: planetary orbits are ellipses, with the Sun at one focus. The circle was a beautiful lie.</p>

**Floor 1 (Concrete):**
<p>An ellipse with semi-major axis a and eccentricity e: the distance from the centre to each focus is ae. For Earth's orbit: a ≈ 1.496 × 10¹¹ m (1 AU), e ≈ 0.0167. The Sun is offset from the centre by ae ≈ 2.5 × 10⁹ m — only 1.67% of a. Earth is closest to the Sun (perihelion) at 147.1 million km in early January and farthest (aphelion) at 152.1 million km in early July. For Mars: e ≈ 0.0934 — more noticeably elliptical. For Halley's Comet: e ≈ 0.967 — a highly elongated ellipse, coming within 0.59 AU of the Sun and receding to 35 AU, beyond Neptune.</p>

**Floor 2 (Definition):**
<p><strong>Kepler's First Law (Law of Ellipses):</strong> Every planet moves in an elliptical orbit with the Sun at one focus. An ellipse is defined by: the sum of distances from any point on the curve to two fixed points (foci) is constant (= 2a, the major axis). The eccentricity e measures the deviation from a circle: e = 0 gives a circle; 0 < e < 1 gives an ellipse; e = 1 gives a parabola (escape trajectory); e > 1 gives a hyperbola (flyby trajectory). Newton later derived that the 1/r² force law necessarily produces conic-section orbits — Kepler's first law is a consequence of the inverse-square attraction.</p>

**Floor 3 (In action):**
<p>The elliptical shape of orbits has practical consequences. Earth's Southern Hemisphere receives about 6.8% more solar radiation in its summer (perihelion occurs near the December solstice) than the Northern Hemisphere in its summer. But because the Southern Hemisphere is mostly ocean, the climate effect is moderated. Exoplanet hunters use eccentricity to infer planetary system history — high eccentricities suggest past gravitational encounters. Halley's Comet, last seen in 1986, has been observed every 75–76 years since 240 BC because its elliptical orbit is precisely determined by the same Kepler-Newton laws. It returns next in 2061.</p>

**Image prompt:** A chalk drawing of an ellipse with the Sun (filled circle) at one focus. Semi-major axis a, semi-minor axis b, and eccentricity e = √(1−b²/a²) labelled. Distances r₁ + r₂ = 2a shown from an arbitrary point. Earth's orbit drawn with its mild eccentricity (nearly circular); Pluto's orbit with higher eccentricity beside it. Chalk on dark green board. Square 1:1.


## BB-NEW-509 — Kepler's Second Law: equal areas in equal times

**Subject:** physics | **Topic:** mechanics | **Concept:** keplers-second-law; area-velocity; conservation-of-angular-momentum | **Ground:** g1 | **Builds on:** [BB-NEW-508, BB-NEW-290]

**Floor 0 (Idea):**
<p>A planet moves faster when it's closer to the Sun and slower when it's farther away. The line from the Sun to the planet sweeps out equal areas in equal times — a natural consequence of angular momentum conservation.</p>

**Floor 1 (Concrete):**
<p>Earth's orbital speed varies from 30.3 km/s at perihelion (closest to Sun, early January) to 29.3 km/s at aphelion (farthest, early July). The area swept per unit time — the areal velocity — is constant: dA/dt = L/2m, where L is the angular momentum. For Earth: L/m ≈ 4.46 × 10¹⁵ m²/s, so dA/dt ≈ 2.23 × 10¹⁵ m²/s. The total area of the orbit (πab) swept in one year is consistent: π(1.496×10¹¹)(1.496×10¹¹√(1−0.0167²)) ≈ 7.03×10²² m². At 2.23×10¹⁵ m²/s, that takes 3.16×10⁷ s ≈ 365.25 days.</p>

**Floor 2 (Definition):**
<p><strong>Kepler's Second Law (Law of Equal Areas):</strong> The radius vector from the Sun to a planet sweeps out equal areas in equal intervals of time. The <strong>areal velocity</strong> dA/dt = ½r²(dθ/dt) = ½r²ω is constant. This is a direct consequence of conservation of angular momentum: in a central force field (force directed toward a fixed point), torque τ⃗ = r⃗ × F⃗ = 0, so L⃗ = r⃗ × p⃗ = constant. The magnitude L = mr²ω is constant, so r²ω = constant, and dA/dt = L/2m = constant. The second law does not require an inverse-square force — it holds for <em>any</em> central force.</p>

**Floor 3 (In action):**
<p>Kepler's second law is why Northern Hemisphere winters are about 2 days shorter than summers — Earth moves faster near perihelion (which coincides with early January). It's also why comets seem to appear suddenly: Halley's Comet spends most of its 76-year period in the outer reaches of its orbit, then whips around the Sun in a few months. The equal-area law also governs binary star systems, where two stars orbit their common centre of mass — both sweep equal areas in equal times about the COM. And it's the principle behind gravitational slingshots: a spacecraft approaching a planet gains speed from the planet's orbital motion through the precise geometry of the encounter.</p>

**Image prompt:** A chalk drawing of an elliptical orbit with the Sun at one focus. Two wedges of equal area are shaded: one near perihelion (wide angle, short radius — fast), one near aphelion (narrow angle, long radius — slow). The equation dA/dt = ½r²ω = constant. An arrow showing the velocity vector longer at perihelion, shorter at aphelion. Chalk on dark green board. Square 1:1.


## BB-NEW-510 — Kepler's Third Law: T² ∝ a³

**Subject:** physics | **Topic:** mechanics | **Concept:** keplers-third-law; period-semimajor-axis-relation; deriving-K3-from-Newton | **Ground:** g1 | **Builds on:** [BB-NEW-508, BB-NEW-509]

**Floor 0 (Idea):**
<p>The square of a planet's orbital period is proportional to the cube of its semi-major axis. Planets farther from the Sun take disproportionately longer to orbit — not just because the path is longer, but because they move slower. Kepler found this pattern in 1619; Newton derived it from the inverse-square law in 1687.</p>

**Floor 1 (Concrete):**
<p>For a circular orbit of radius r: centripetal force = gravitational force, so mv²/r = GMm/r², giving v = √(GM/r). The period T = circumference/speed = 2πr/v = 2πr √(r/GM) = 2π √(r³/GM). Squaring: T² = (4π²/GM) r³. So T² ∝ r³ — Kepler's third law. For Earth: T = 365.25 days, r = 1 AU. For Mars: r = 1.524 AU, so T = (1.524)^(3/2) = 1.881 years — matching observation. For Jupiter: r = 5.203 AU, T = (5.203)^(3/2) = 11.86 years. For elliptical orbits, replace r with the semi-major axis a. The constant 4π²/GM depends only on the central mass — it's the same for all objects orbiting the Sun.</p>

**Floor 2 (Definition):**
<p><strong>Kepler's Third Law (Law of Periods):</strong> T² ∝ a³, where T is the orbital period and a is the semi-major axis. For the special case of circular orbits, T² = (4π²/GM) r³. For elliptical orbits, T² = (4π²/GM) a³. The proportionality constant depends only on the central mass M and G. For the Solar System: T²(in years) = a³(in AU) when orbiting the Sun. In a two-body system, the reduced mass correction gives T² = 4π²a³/G(M + m). The third law is derivable from Newton's law of gravitation and is not independent — it confirms the inverse-square nature of gravity.</p>

**Floor 3 (In action):**
<p>Kepler's third law is the workhorse of astronomy. Measure a moon's orbital period and radius around its planet, and you get the planet's mass. Measure a binary star's period and separation, and you get the stars' masses. The supermassive black hole at the centre of the Milky Way (Sagittarius A*) was "weighed" by tracking the star S2, which orbits it with a period of 16 years and a semi-major axis of about 970 AU — giving M ≈ 4.1 million solar masses. The third law also predicted the existence of Neptune: perturbations in Uranus's orbit led Le Verrier and Adams to calculate where an eighth planet should be — and Galle found it in 1846, within 1° of the prediction.</p>

**Image prompt:** A chalk drawing of the Solar System with the Sun at centre. Three orbits shown: Earth, Mars, Jupiter. Beside each: a small table showing r (AU), T² (years²), and r³ (AU³). The ratio T²/r³ is the same for all. The derived equation T² = (4π²/GM)r³. Chalk on dark green board. Square 1:1.


## BB-NEW-511 — Orbital velocity and time period

**Subject:** physics | **Topic:** mechanics | **Concept:** orbital-velocity; circular-orbit-speed; orbital-period | **Ground:** g1 | **Builds on:** [BB-NEW-507, BB-NEW-510]

**Floor 0 (Idea):**
<p>To stay in orbit, a satellite must move fast enough that the Earth's surface curves away beneath it as fast as it falls. The orbital velocity depends only on the distance from Earth's centre — closer means faster. This is why the ISS zips around Earth in 90 minutes while the Moon takes a month.</p>

**Floor 1 (Concrete):**
<p>For a circular orbit: mv²/r = GMm/r² → v_orb = √(GM/r). For the ISS at h = 400 km (r = 6771 km): v_orb = √(6.67×10⁻¹¹ × 5.97×10²⁴ / 6.771×10⁶) = 7.67 km/s. Period: T = 2πr/v = 2π(6.771×10⁶)/7670 ≈ 5550 s ≈ 92.5 minutes. At the Moon's distance (r = 384,400 km): v_orb = √(GM/r) ≈ 1.02 km/s. Period: T = 2πr/v ≈ 27.3 days. At geostationary orbit (r = 42,164 km): v_orb ≈ 3.07 km/s, T = 23 h 56 min 4 s — exactly one sidereal day. Fact: orbital velocity at the surface (ignoring atmosphere) would be √(gR) = √(9.8 × 6.37×10⁶) = 7.91 km/s.</p>

**Floor 2 (Definition):**
<p><strong>Orbital velocity</strong> v_orb for a circular orbit of radius r around a body of mass M: v_orb = √(GM/r) = √(gR²/r), where R is the planet's radius and g is surface gravity. The orbital period is T = 2πr/v_orb = 2π √(r³/GM). Note that v_esc = √2 × v_orb — escape velocity is always √2 ≈ 1.414 times the circular orbital speed at the same radius. For a satellite: v_orb decreases with increasing r (closer = faster). This is counterintuitive: to reach a higher orbit, you accelerate, but once there, you move slower than before.</p>

**Floor 3 (In action):**
<p>The relationship between orbital velocity and altitude governs all satellite operations. The ISS at 400 km completes 15.5 orbits per day. GPS satellites at 20,200 km orbit twice per day. The James Webb Space Telescope sits at the L2 Lagrange point, 1.5 million km from Earth, where it orbits the Sun in sync with Earth. A satellite in low Earth orbit (~200 km) orbits in about 88 minutes. Hohmann transfer orbits — the most fuel-efficient way to move between two circular orbits — use precisely calculated velocity changes (Δv) at each end: fire engines to enter an elliptical transfer orbit, then fire again to circularise at the new altitude.</p>

**Image prompt:** A chalk drawing of Earth with three concentric circular orbits: LEO (400 km, v = 7.67 km/s, T = 92 min), MEO (20,200 km, v = 3.87 km/s, T = 12 h), GEO (35,786 km, v = 3.07 km/s, T = 24 h). The formula v_orb = √(GM/r) displayed. Arrows showing velocity direction (tangential) and gravity (radial). Chalk on dark green board. Square 1:1.


## BB-NEW-512 — Energy of an orbiting satellite

**Subject:** physics | **Topic:** mechanics | **Concept:** orbital-energy; kinetic-plus-potential; bound-energy | **Ground:** g2 | **Builds on:** [BB-NEW-506, BB-NEW-511]

**Floor 0 (Idea):**
<p>A satellite in a circular orbit has negative total energy — it's gravitationally bound. Remarkably, its kinetic energy is exactly half the magnitude of its potential energy. And to move to a higher orbit, you need to add energy — despite the fact that the satellite ends up moving slower.</p>

**Floor 1 (Concrete):**
<p>For a circular orbit of radius r: KE = ½mv² = ½m(GM/r) = GMm/2r. PE = −GMm/r. Total energy: E = KE + PE = −GMm/2r. So |KE| = |E| and |PE| = 2|E|. For the ISS (m ≈ 420,000 kg, r ≈ 6771 km): KE ≈ ½(4.2×10⁵)(7670)² ≈ 1.24 × 10¹³ J. PE ≈ −2.47 × 10¹³ J. E ≈ −1.24 × 10¹³ J. To boost the ISS from 400 km to 500 km: ΔE = E₂ − E₁ = −GMm/2r₂ + GMm/2r₁ = (GMm/2)(1/r₁ − 1/r₂). With r₁ = 6771 km, r₂ = 6871 km: ΔE ≈ +3.6 × 10¹¹ J — about 100,000 kWh, or the energy in about 8.6 tonnes of rocket fuel.</p>

**Floor 2 (Definition):**
<p>For a satellite of mass m in a <strong>circular orbit</strong> of radius r around a body of mass M (M ≫ m):</p>
<p>KE = ½mv² = GMm/2r</p>
<p>PE = −GMm/r</p>
<p>E_total = −GMm/2r</p>
<p>The total energy is negative — the satellite is bound. KE = |E|, PE = −2KE. For <strong>elliptical orbits</strong>, the total energy is E = −GMm/2a, where a is the semi-major axis. This is independent of eccentricity — two orbits with the same semi-major axis have the same total energy. A satellite with E < 0 is in a bound orbit (elliptical or circular); E = 0 gives a parabolic escape trajectory; E > 0 gives a hyperbolic flyby.</p>

**Floor 3 (In action):**
<p>The total energy formula explains why satellites don't stay in low Earth orbit forever — atmospheric drag does negative work, reducing E (making it more negative), which means r must decrease. The satellite spirals inward, converting gravitational potential energy to kinetic energy and heat. This is also why launching to geostationary orbit is a two-step process: first launch to a low parking orbit, then fire engines at perigee to enter an elliptical transfer orbit (raising apogee to GEO altitude), then fire again at apogee to circularise. Each burn adds energy, and the satellite ends up with higher (less negative) total energy — even though its final orbital speed at GEO (3.07 km/s) is slower than at LEO (7.67 km/s). The paradox dissolves when you realise KE is only half the story.</p>

**Image prompt:** A chalk drawing of a satellite in circular orbit. Energy bars: KE (positive, half-height), PE (negative, full-height), E_total (negative, half-height). The relationship: KE = −E, PE = 2E. Below: an elliptical orbit with the same semi-major axis a, showing E = −GMm/2a independent of e. Chalk on dark green board. Square 1:1.


## BB-NEW-513 — Geostationary satellites: parked in the sky

**Subject:** physics | **Topic:** mechanics | **Concept:** geostationary-orbit; synchronous-orbit; 24-hour-period | **Ground:** g1 | **Builds on:** [BB-NEW-511, BB-NEW-512]

**Floor 0 (Idea):**
<p>Imagine a satellite that hovers motionless in the sky — always above the same point on the equator, 24 hours a day. This isn't science fiction. It happens when the satellite's orbital period exactly matches Earth's rotation period, at a very specific altitude: 35,786 km.</p>

**Floor 1 (Concrete):**
<p>Condition: orbital period T = 23 h 56 min 4 s = 86,164 s (one sidereal day). From Kepler's third law: r = (GMT²/4π²)^(1/3) = [(6.67×10⁻¹¹)(5.97×10²⁴)(86164)² / 4π²]^(1/3) = (7.53×10²²)^(1/3) = 4.2164 × 10⁷ m = 42,164 km from Earth's centre. Altitude h = r − R = 42,164 − 6371 = 35,793 km ≈ 35,800 km. Orbital speed: v = 2πr/T = 2π(4.2164×10⁷)/86,164 ≈ 3,075 m/s = 3.07 km/s. The orbit must be equatorial (inclination = 0°) and circular (e = 0), with the satellite moving west to east — matching Earth's rotation direction.</p>

**Floor 2 (Definition):**
<p>A <strong>geostationary orbit</strong> (GEO) is a circular equatorial orbit with a period equal to one sidereal day, so the satellite appears stationary in the sky to an observer on the ground. The orbital radius is r = 42,164 km (altitude ~35,786 km). A <strong>geosynchronous orbit</strong> has the same period but may be inclined and/or elliptical — the satellite returns to the same position in the sky each day but traces a figure-8 analemma from the ground. GEO satellites are placed in the "Clarke belt" (named after Arthur C. Clarke, who proposed them in 1945). The finite capacity of the GEO arc has led to international coordination through the ITU.</p>

**Floor 3 (In action):**
<p>Geostationary satellites are everywhere in modern life — you just don't see them. TV broadcast satellites (DTH — direct-to-home), weather satellites (INSAT, GOES, Meteosat) that provide the cloud images on news forecasts, and some communication relays all use GEO. A single GEO satellite covers about one-third of Earth's surface; three equally spaced satellites cover nearly the entire globe (except the poles, which are out of line-of-sight). The downside: the 35,800 km distance creates a ~240 ms signal delay (round trip), which is why satellite internet has lag and why Starlink uses much lower orbits (~550 km). Launching to GEO costs significantly more than LEO — the rocket must provide enough energy to climb out of the deep part of the gravity well.</p>

**Image prompt:** A chalk drawing of Earth (tilted, showing equator) with a satellite at 35,786 km altitude. A dashed circle shows the GEO radius of 42,164 km. The satellite's orbital period is labelled "T = 23 h 56 min." Three equally spaced satellites at GEO cover the globe (coverage arcs shown). A small antenna on the ground points at the satellite (no tracking needed). Chalk on dark green board. Square 1:1.


## BB-NEW-514 — Weightlessness: what it actually is

**Subject:** physics | **Topic:** mechanics | **Concept:** weightlessness; free-fall; apparent-weight-zero; microgravity | **Ground:** g0 | **Builds on:** [BB-NEW-503, BB-NEW-507]

**Floor 0 (Idea):**
<p>Astronauts on the ISS aren't in "zero gravity" — gravity there is 88% of surface strength. They float because they are in continuous free fall. Weightlessness is not the absence of gravity; it's the absence of a supporting force. You and your spacecraft are falling together.</p>

**Floor 1 (Concrete):**
<p>The ISS at 400 km altitude experiences g = 8.67 N/kg. A 70 kg astronaut's true weight is still 607 N. But the scale reads zero because the scale is falling at the same acceleration as the astronaut — the scale can't push up on them because it's not supported by anything either. Apparent weight w_app = m(g − a). When a = g (free fall), w_app = 0. The same effect happens in a freely falling lift, a parabolic-flight aircraft (the "Vomit Comet"), or during the first moments of a skydive. The sensation isn't "no gravity" — it's "no normal force." Your internal organs float because they're no longer compressed against each other.</p>

**Floor 2 (Definition):**
<p><strong>Weightlessness</strong> (or microgravity) is the condition where the apparent weight of an object is zero or nearly zero. It occurs when an object is in free fall — accelerating at g⃗ with no other forces (like normal force or tension) acting perpendicular to the fall direction. True weight w = mg still acts; the object is weightless only in the operational sense (a scale reads zero). In orbit, weightlessness is not because r is large (gravity still ~90% of surface) but because the spacecraft and everything in it are in continuous free fall around Earth. The term "microgravity" reflects the fact that tiny residual forces (atmospheric drag, spacecraft vibrations, gravity gradient across the craft) produce apparent accelerations on the order of 10⁻⁶ g.</p>

**Floor 3 (In action):**
<p>Weightlessness is both a challenge and an opportunity. Astronauts' bones lose density (~1% per month) because the skeleton is no longer resisting weight — the body adapts to the absence of load. Muscles atrophy. The vestibular system (inner ear balance) goes haywire, causing space sickness. But weightlessness also enables unique science: protein crystals grow larger and more perfectly without convection; combustion behaves differently without buoyancy-driven airflow; fluids form perfect spheres. The ISS is a national laboratory for microgravity research. And the romantic vision of "floating in space" is real — just not for the reason most people think. You float because you are falling, endlessly, and so is your ship.</p>

**Image prompt:** A chalk drawing of the ISS in orbit. A cutaway shows an astronaut floating inside. Two force diagrams overlaid: the astronaut's true weight mg (downward, labelled "607 N"), but apparent weight = 0. Equation: w_app = m(g − a), with a = g. A dashed trajectory shows the continuous free-fall path that "misses" Earth because of tangential velocity. Chalk on dark green board. Square 1:1.


## BB-NEW-515 — Tidal forces: why the ocean has two bulges

**Subject:** physics | **Topic:** mechanics | **Concept:** tidal-forces; differential-gravity; two-tidal-bulges | **Ground:** g1 | **Builds on:** [BB-NEW-500, BB-NEW-504]

**Floor 0 (Idea):**
<p>The Moon pulls on the Earth — but it pulls harder on the near side than on the far side, and harder on the centre than on the far side. This differential stretching is the tidal force. It produces two ocean bulges: one facing the Moon (pulled toward it) and one on the opposite side (left behind as Earth is pulled away).</p>

**Floor 1 (Concrete):**
<p>The gravitational force from the Moon at Earth's centre: F_c = GM_m M_E / r², where r = 384,400 km. At the near point (r − R_E): F_near = GM_m M_E / (r − R_E)². The tidal force is the difference: ΔF = F_near − F_c ≈ 2GM_m M_E R_E / r³. Numerically: the Moon's tidal force on Earth is about 1.13 × 10⁻⁷ N/kg per metre — tiny, but applied across an ocean basin thousands of kilometres wide, it adds up. The Sun's tidal force is about 0.46 times the Moon's (the Sun is 27 million times more massive but 390 times farther away — and tidal forces fall off as 1/r³, not 1/r²). Spring tides (Sun and Moon aligned) produce the highest tides; neap tides (Sun and Moon at right angles) produce the lowest.</p>

**Floor 2 (Definition):**
<p><strong>Tidal forces</strong> arise from the <em>difference</em> in gravitational pull across an extended body. For a body of size d at distance r from a mass M, the tidal acceleration scales as Δa ≈ 2GMd/r³. Unlike the direct gravitational force (∝ 1/r²), tidal forces fall off as <strong>1/r³</strong>. The two-bulge pattern is a consequence of the differential: the near side is pulled more strongly toward M than the centre is; the far side is pulled less strongly than the centre, so relative to the centre it appears pushed outward. The result is stretching along the Earth-Moon line and compression perpendicular to it.</p>

**Floor 3 (In action):**
<p>Tidal forces shape the universe. The Moon's tidal friction slows Earth's rotation (the day lengthens by about 1.7 ms per century) and pushes the Moon outward (about 3.8 cm/year — measured by lunar laser ranging). Io, Jupiter's innermost large moon, is heated by tidal flexing so intensely that it's the most volcanically active body in the Solar System. Tidal forces can tear a moon apart if it ventures inside its planet's Roche limit — the rings of Saturn may be the debris of a destroyed moon. On a more extreme scale, a black hole's tidal forces (spaghettification) would stretch an approaching astronaut into a thin strand long before they reached the event horizon. The 1/r³ scaling means small r packs a devastating differential.</p>

**Image prompt:** A chalk drawing of Earth with two ocean bulges: one on the Moon-facing side, one on the opposite side. The Moon is shown to the right. Force arrows: near side pulled strongest (longest arrow), centre pulled moderately, far side pulled weakest (shortest arrow). The differential ΔF ∝ 1/r³ labelled. Below: spring tide (Sun-Moon aligned) vs neap tide (Sun-Moon perpendicular) diagrams. Chalk on dark green board. Square 1:1.
