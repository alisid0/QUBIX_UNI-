# Frye's Applied Physics → Qubix BBs — Batch 07: Optics (15 BBs)

These 15 BBs complete Frye's treatment of light. Unlike Verma's theoretical ray-optics approach, Frye focuses on measurement and practical application: how bright is a light source? (photometry), how do mirrors form images? (reflection), how do lenses bend light? (refraction), and how does a prism split white light into colours? (dispersion). Every BB is built around a concrete scenario — a camera, a projector, a magnifying glass — and the numbers that make them work.

**Chapters covered:** Frye 29–30 (Photometry, Reflection & Refraction, Lenses & Miscellaneous Properties).

**Already covered (don't duplicate):** BB-NEW-310–324 (Verma optics — ray model, mirrors, lenses, Snell's law), BB-NEW-765–771 (Frye 04 — diffraction, thin-film interference, polarization, birefringence, photoelasticity).

**What's new here:** Photometry (luminous intensity, flux, illuminance, inverse-square law for light), the speed of light and its measurement, curved mirrors (concave/convex) with the mirror formula, lens formula and magnification, real vs virtual images, the simple magnifier and compound microscope, dispersion by prisms, and the electromagnetic spectrum from the optics perspective.

---

## BB-NEW-820 — The speed of light: Galileo's lanterns to Fizeau's wheel

**Subject:** physics | **Topic:** optics | **Concept:** speed-of-light; Fizeau-experiment; Michelson; finite-velocity | **Ground:** g0 | **Builds on:** [BB-NEW-310, BB-NEW-753]

**Floor 0 (Idea):**
<p>For most of history, light was thought to travel instantaneously — you uncover a lantern, and the light is immediately there. Galileo tried to measure it in 1638 with two lanterns on hilltops a mile apart. He concluded it was "extraordinarily rapid, if not instantaneous." It took another 200 years to pin down the number: 299,792,458 metres per second — exactly, by definition. The finite speed of light is the universe's speed limit.</p>

**Floor 1 (Concrete):**
<p>In 1849, Hippolyte Fizeau made the first terrestrial measurement. He sent a beam of light through the gaps in a rotating toothed wheel, reflected it off a mirror 8.63 km away, and observed the returning beam through the same wheel. At a rotation speed of 12.6 rev/s (with 720 teeth), the returning light was blocked by the next tooth. The round trip took t = distance/(720 × 12.6) seconds. c = 2d/t = 2 × 8633/(1/9072) ≈ 3.13 × 10⁸ m/s — within 5% of the modern value.</p>
<p>In 1926, Albert Michelson used a rotating octagonal mirror and a 35 km baseline between Mount Wilson and Mount San Antonio, achieving c = 299,796 ± 4 km/s. Today, c is defined exactly as 299,792,458 m/s — the metre is defined as the distance light travels in 1/299,792,458 of a second. Light from the Sun takes 8.3 minutes to reach Earth; from the Moon, 1.28 seconds; from the nearest star (Proxima Centauri), 4.24 years.</p>

**Floor 2 (Definition):**
<p>The <strong>speed of light</strong> in vacuum, c = 299,792,458 m/s (exact), is a fundamental constant of nature. It is the maximum speed at which information or matter can travel. In a medium, light slows to v = c/n, where n is the refractive index (n_air ≈ 1.0003, n_water ≈ 1.33, n_glass ≈ 1.5, n_diamond ≈ 2.42). The <strong>Fizeau-Foucault method</strong> measures c using a rotating mirror or toothed wheel — timing the round trip of a light pulse over a known distance. <strong>Roemer's method</strong> (1676): timing the eclipses of Jupiter's moons — the delay varies with Earth's orbital position, giving c ≈ 2.2 × 10⁸ m/s (about 25% low, but the first proof that light is finite).</p>

**Floor 3 (In action):**
<p>The finite speed of light governs everything from GPS to astronomy. GPS satellites at 20,200 km altitude broadcast timing signals. The signal takes ~67 ms to reach your phone. An error of 1 nanosecond in timing produces a 30 cm position error. Relativistic corrections (special + general relativity) adjust for the satellites' speed and the weaker gravity at altitude — without them, GPS would drift by ~11 km per day. When you look at the Andromeda Galaxy, you're seeing it as it was 2.5 million years ago — before humans existed. The speed of light is not just a number; it's the conversion factor between space and time.</p>

**Image prompt:** A chalk drawing of Fizeau's toothed-wheel experiment. A light source, a rotating wheel with teeth, a distant mirror 8.63 km away. The beam passing through a gap, reflecting, and returning. Rotation speed 12.6 rev/s, 720 teeth. c = 2d/(time per tooth). Michelson's octagonal mirror beside it. Chalk on dark green board. Square 1:1.


## BB-NEW-821 — Photometry: measuring light in numbers

**Subject:** physics | **Topic:** optics | **Concept:** photometry; luminous-flux; luminous-intensity; illuminance; candela | **Ground:** g0 | **Builds on:** [BB-NEW-753, BB-NEW-780]

**Floor 0 (Idea):**
<p>How bright is a light bulb? Not in words — in numbers. Photometry is the science of measuring visible light as perceived by the human eye. It's distinct from radiometry (which measures all electromagnetic radiation equally) because the eye is wildly more sensitive to green light than to red or blue. The base unit is the candela — one candlepower — and from it flow lumens, lux, and the inverse-square law of illumination.</p>

**Floor 1 (Concrete):**
<p>A standard candle (historically a spermaceti candle burning 120 grains per hour) emits about 1 candela (cd). A 60 W incandescent bulb emits about 800 lumens (lm) — roughly 800 cd if the light were uniform in all directions. A 10 W LED bulb emits the same 800 lm for 1/6 the power. The difference: incandescent efficiency ~13 lm/W; LED efficiency ~80–120 lm/W.</p>
<p>At distance r = 2.0 m from a point source of I = 800 cd: illuminance E = I/r² = 800/4 = 200 lux. An office desk should have ~500 lux. Direct sunlight: ~100,000 lux. Full moon: ~0.1 lux. The illuminance falls as 1/r² — double the distance, quarter the light. The total luminous flux from the source: Φ = 4πI = 4π × 800 ≈ 10,050 lm — but only a fraction reaches any given surface.</p>

**Floor 2 (Definition):**
<p><strong>Photometry</strong> measures visible light weighted by the eye's spectral sensitivity (the luminosity function). Key quantities: <strong>Luminous intensity</strong> I (candela, cd) — power per solid angle, the base SI unit. <strong>Luminous flux</strong> Φ (lumen, lm = cd·sr) — total visible power emitted. <strong>Illuminance</strong> E (lux, lx = lm/m²) — flux per unit area falling on a surface. <strong>Inverse-square law:</strong> E = I/r² for a point source at normal incidence. <strong>Lambert's cosine law:</strong> E = I cos θ / r² for oblique incidence. Photometry is distinct from <strong>radiometry</strong> (which measures total radiant power in watts, irrespective of wavelength). The conversion: 1 W of 555 nm (green) light = 683 lm (the peak of the eye's sensitivity).</p>

**Floor 3 (In action):**
<p>Photometry governs lighting design. An office at 500 lux prevents eye strain; a surgical theatre at 10,000–20,000 lux gives surgeons detail. A football stadium broadcast requires ~1500 lux; a night match ~500 lux. Street lighting aims for 10–30 lux. Your phone's ambient light sensor adjusts screen brightness by measuring illuminance. Camera exposure settings balance aperture (f-stop), shutter speed, and ISO against the scene illuminance. The inverse-square law is why a speedlight flash falls off so rapidly — a subject at 2 m gets 1/4 the light of one at 1 m. In astronomy, the apparent magnitude scale is logarithmic photometry: a difference of 5 magnitudes = factor of 100 in brightness.</p>

**Image prompt:** A chalk drawing of a lamp radiating light in all directions. At distance r, the light is spread over a sphere of area 4πr². Illuminance E = I/r². The spectral luminosity curve (bell-shaped, peaking at 555 nm). A table: candle 1 cd, 60 W bulb 800 lm, office 500 lx, sunlight 100,000 lx. Chalk on dark green board. Square 1:1.


## BB-NEW-822 — The inverse-square law for light

**Subject:** physics | **Topic:** optics | **Concept:** inverse-square-law; point-source; illumination-distance | **Ground:** g0 | **Builds on:** [BB-NEW-821, BB-NEW-733]

**Floor 0 (Idea):**
<p>A candle looks bright up close and dim across the room. That's not because the light "wears out" — it spreads. Light from a point source radiates uniformly in all directions, forming an expanding sphere. The same total energy is spread over a larger and larger area, so the intensity drops as the square of the distance. Double the distance, quarter the brightness. This is the inverse-square law — and it governs everything from light bulbs to stars.</p>

**Floor 1 (Concrete):**
<p>A 100 W incandescent bulb (I ≈ 1300 cd) illuminates a book. At 0.5 m: E = I/r² = 1300/0.25 = 5200 lx — bright enough to read fine print. At 2.0 m: E = 1300/4 = 325 lx — acceptable. At 5.0 m: E = 1300/25 = 52 lx — dim. At 10 m: E = 13 lx — barely useful. The light doesn't "fade"; it spreads over a sphere of area 4πr². At r = 10 m, the sphere area is 4π × 100 ≈ 1257 m² — the 100 W of visible light (about 1600 lm) is spread razor-thin.</p>
<p>Photographers use this: a flash at 2.8 m gives correct exposure. At 5.6 m (twice the distance), the light is 1/4 as bright — you need to open the aperture two stops (e.g., f/8 to f/4) or quadruple the ISO. The law is exact for a point source; real sources (softboxes, reflectors) deviate from it.</p>

**Floor 2 (Definition):**
<p><strong>Inverse-square law for illuminance:</strong> E = I/r², where E is illuminance (lux), I is luminous intensity (cd), and r is distance (m). It follows from geometry: the light from a point source passes through successive spheres of area 4πr². The flux (lumens) is constant, so the flux per unit area ∝ 1/r². <strong>For a line source:</strong> E ∝ 1/r (cylindrical spreading — fluorescent tubes). <strong>For an infinite plane:</strong> E is constant (no falloff — overcast sky). The law assumes a point source in a non-absorbing medium. In real air, scattering and absorption cause additional attenuation. The inverse-square law applies to all radiation from point sources: light, sound, gravity, radio.</p>

**Floor 3 (In action):**
<p>The inverse-square law is the photographer's constant companion. Studio lighting uses it to control falloff: place a light close to the subject and the background goes dark; move it far away and the whole scene is evenly lit. In astronomy, the inverse-square law determines how far we can see: a star identical to the Sun at 10 parsecs (32.6 light-years) appears 100 billion times fainter. The magnitude system operationalises the law: m₁ − m₂ = −2.5 log₁₀(I₁/I₂), where m is apparent magnitude. The Sun (−26.7) would be magnitude 4.8 at 10 pc — barely visible to the naked eye. The Hubble Space Telescope can detect objects at magnitude 31 — about 10¹⁰ times fainter than the naked-eye limit.</p>

**Image prompt:** A chalk drawing of a point source with concentric spheres at r, 2r, 3r. The same total flux distributed over 4πr², 16πr², 36πr². Intensity labels: I, I/4, I/9. Equation E = I/r². A photographer's setup: flash at 2.8 m and 5.6 m with aperture compensation. Chalk on dark green board. Square 1:1.


## BB-NEW-823 — The reflection of light: mirrors and the law of reflection

**Subject:** physics | **Topic:** optics | **Concept:** law-of-reflection; plane-mirror; specular-vs-diffuse; image-formation | **Ground:** g0 | **Builds on:** [BB-NEW-311, BB-NEW-312, BB-NEW-724]

**Floor 0 (Idea):**
<p>Look in a mirror. You see yourself — but the image is behind the glass, reversed left-to-right, and the same distance behind the mirror as you are in front. Light bounces off your face, hits the mirror, and bounces into your eyes. The angle of reflection equals the angle of incidence — always. This law is so simple and so reliable that it's the basis of every mirror, every periscope, and every reflective optical instrument.</p>

**Floor 1 (Concrete):**
<p>A plane mirror: you stand 1.5 m in front of it. Your image appears 1.5 m behind the mirror — total 3.0 m from you to your image. The mirror needs to be only half your height to see your full body (top edge at eye level minus half the distance to your hairline; bottom edge at half the distance to your feet). The image is virtual (light doesn't actually come from behind the mirror — your brain extrapolates the rays backward) and laterally inverted (your left hand is the image's right).</p>
<p>A periscope uses two mirrors at 45° — the first reflects light downward, the second reflects it horizontally to your eye. The total deviation is 180° with no image inversion. Corner reflectors (three mutually perpendicular mirrors, like a cube corner) reflect light back exactly parallel to its original direction, regardless of the angle of incidence. A bicycle reflector and the retroreflectors left on the Moon by Apollo astronauts use this principle.</p>

**Floor 2 (Definition):**
<p>The <strong>law of reflection:</strong> the angle of incidence equals the angle of reflection, measured from the normal (perpendicular to the surface). θ_i = θ_r. The incident ray, reflected ray, and normal all lie in the same plane. <strong>Specular reflection</strong> (smooth surface, e.g., mirror, calm water): parallel incident rays remain parallel. <strong>Diffuse reflection</strong> (rough surface, e.g., paper, wall): rays scatter in all directions — this is why you can see a wall from any angle. A <strong>plane mirror</strong> produces a virtual, upright, laterally inverted image the same distance behind as the object is in front. The image is the same size as the object. For multiple mirrors, the number of images depends on the angle between them.</p>

**Floor 3 (In action):**
<p>Mirrors are the simplest optical instruments. A bathroom mirror is flat glass with a reflective coating (aluminium or silver) on the back. A one-way mirror is partially reflective — the brightly lit side reflects; the dark side transmits (interrogation rooms). Corner reflectors on the Moon (Apollo 11, 14, 15) are arrays of 100–300 small cube-corner prisms. Earth-based lasers fire pulses at them; the round-trip time measures the Earth-Moon distance to millimetre precision — the Moon is receding at 3.8 cm/year. A mirrored telescope (Newtonian reflector) uses a concave primary mirror to collect light and a small secondary mirror to redirect it to the eyepiece — Isaac Newton built the first in 1668.</p>

**Image prompt:** A chalk drawing of a plane mirror with incident ray, reflected ray, and normal. θ_i = θ_r labelled. A person in front of a mirror with image behind — equal distances d marked. Diffuse reflection from a rough surface (scattered rays). Specular from a smooth surface. A periscope with two 45° mirrors. Chalk on dark green board. Square 1:1.


## BB-NEW-824 — Curved mirrors: concave and convex

**Subject:** physics | **Topic:** optics | **Concept:** spherical-mirrors; focal-length; mirror-equation; real-virtual-images | **Ground:** g1 | **Builds on:** [BB-NEW-313, BB-NEW-314, BB-NEW-315, BB-NEW-823]

**Floor 0 (Idea):**
<p>A flat mirror shows you a same-sized image. A curved mirror changes the game. Concave mirrors (curving inward like a bowl) can focus light to a point — they're used in telescopes and shaving mirrors to magnify. Convex mirrors (bulging outward) spread light — they give a wider field of view and are used in car side mirrors and security mirrors. The focal length is half the radius of curvature.</p>

**Floor 1 (Concrete):**
<p>A concave mirror has radius of curvature R = 40 cm. Focal length f = R/2 = 20 cm (for a spherical mirror — the mirror formula f = R/2 assumes paraxial rays close to the axis). Object at 30 cm (beyond f but inside R): 1/f = 1/u + 1/v → 1/20 = 1/30 + 1/v → 1/v = 1/20 − 1/30 = (3−2)/60 = 1/60 → v = 60 cm. The image is real, inverted, and magnified: m = −v/u = −60/30 = −2 (twice the size). Object at 10 cm (inside f): 1/v = 1/20 − 1/10 = (1−2)/20 = −1/20 → v = −20 cm. Negative v means virtual image — behind the mirror, upright, magnified 2×. This is the shaving mirror mode.</p>
<p>A convex mirror with f = −15 cm (negative by convention — the focal point is behind the mirror). Object at 30 cm: 1/v = 1/(−15) − 1/30 = −1/15 − 1/30 = −3/30 → v = −10 cm. Image is virtual, upright, and reduced: m = −(−10)/30 = +1/3 — one-third the size. The field of view is wider than a plane mirror.</p>

**Floor 2 (Definition):**
<p>The <strong>mirror equation:</strong> 1/f = 1/u + 1/v, where f = focal length, u = object distance (positive for real objects in front of the mirror), v = image distance (positive = real image in front, negative = virtual behind). <strong>Sign convention</strong> (Cartesian): distances measured from the mirror pole; incident light travels left to right. For <strong>concave mirrors:</strong> f > 0, R > 0. For <strong>convex mirrors:</strong> f < 0, R < 0. <strong>Magnification:</strong> m = −v/u (positive = upright, negative = inverted). <strong>Focal length:</strong> f = R/2 (paraxial approximation). The mirror formula assumes small angles; spherical aberration causes blur for wide beams — parabolic mirrors avoid this.</p>

**Floor 3 (In action):**
<p>Concave mirrors collect and focus light. The Hubble Space Telescope's primary mirror is a 2.4 m concave hyperboloid, polished to an accuracy of 10 nanometres. The James Webb Space Telescope uses a 6.5 m segmented concave mirror to collect infrared light from the early universe. Solar thermal power plants use fields of concave mirrors (heliostats) to focus sunlight onto a central receiver, heating molten salt to 565°C to drive a steam turbine. A car's side mirror ("Objects in mirror are closer than they appear") is convex — the wider field of view comes at the cost of distance perception. Dentists use tiny concave mirrors to focus light and magnify teeth — the object (tooth) placed inside f for a magnified virtual image.</p>

**Image prompt:** A chalk drawing of a concave mirror with principal axis, focal point F, centre of curvature C. Ray diagram: ray parallel to axis reflects through F; ray through C reflects back on itself. Object beyond C → real, inverted, reduced image. Object between F and mirror → virtual, upright, enlarged. Convex mirror beside it: virtual, upright, reduced image behind mirror. Mirror equation 1/f = 1/u + 1/v. Chalk on dark green board. Square 1:1.


## BB-NEW-825 — Refraction: why a straw looks bent in water

**Subject:** physics | **Topic:** optics | **Concept:** refraction; Snells-law; refractive-index; apparent-depth | **Ground:** g0 | **Builds on:** [BB-NEW-316, BB-NEW-317, BB-NEW-711]

**Floor 0 (Idea):**
<p>Put a straw in a glass of water, and it looks broken at the surface. It isn't — the light rays bend as they cross from water into air. This bending is refraction: light changes speed when it enters a different medium. The ratio of the speeds (or the sines of the angles) is the refractive index. Water has n = 1.33 — light travels 1.33× slower in water than in air. Glass has n ≈ 1.5. Diamond has n = 2.42 — which is why diamonds sparkle: light bounces around inside, bent and reflected at steep angles.</p>

**Floor 1 (Concrete):**
<p>Light travels from air (n₁ ≈ 1.00) into water (n₂ = 1.33) at an incidence angle of 30°. Snell's law: n₁ sin θ₁ = n₂ sin θ₂ → 1.00 × sin 30° = 1.33 × sin θ₂ → 0.500 = 1.33 sin θ₂ → sin θ₂ = 0.376 → θ₂ = 22.1°. The ray bends <em>toward</em> the normal when entering a denser medium.</p>
<p>Apparent depth: a fish at actual depth 2.0 m appears at depth d_app = d/n = 2.0/1.33 = 1.50 m. A spearfisherman must aim below the apparent image. The speed of light in water: v = c/n = 3.00×10⁸/1.33 = 2.26 × 10⁸ m/s — about 75% of c.</p>

**Floor 2 (Definition):**
<p><strong>Refraction</strong> is the bending of light when it crosses an interface between media of different refractive indices. <strong>Snell's law:</strong> n₁ sin θ₁ = n₂ sin θ₂. The <strong>refractive index</strong> n = c/v (the ratio of the speed of light in vacuum to the speed in the medium). n ≥ 1 always; n_air ≈ 1.0003 (often taken as 1), n_water = 1.33, n_crown glass ≈ 1.52, n_diamond = 2.42. <strong>Apparent depth:</strong> d_app = d_actual/n (for near-normal viewing). <strong>Dispersion:</strong> n varies with wavelength — shorter wavelengths (blue) refract more than longer (red), causing white light to split into a spectrum.</p>

**Floor 3 (In action):**
<p>Refraction is the basis of all lens-based optics. Your eye's cornea and lens refract light to focus it on the retina — the lens changes shape (accommodation) to adjust focus. A swimming pool looks shallower than it is — the bottom appears at about ¾ of its actual depth. A diamond's brilliance comes from its high n = 2.42: the critical angle for total internal reflection is only 24°, so light entering the top of a diamond bounces multiple times before exiting, spreading into a rainbow of colours (dispersion). Fibre optics trap light in a glass core (n ≈ 1.48) surrounded by a cladding of slightly lower n (1.46) — the light repeatedly undergoes total internal reflection, travelling kilometres with minimal loss.</p>

**Image prompt:** A chalk drawing of a ray bending at an air-water interface. Angles θ₁ and θ₂ measured from the normal. Snell's law: n₁ sin θ₁ = n₂ sin θ₂. A fish at actual depth d and apparent depth d/n. The spectrum: white light entering a prism, emerging as a rainbow (dispersion — n varies with λ). Chalk on dark green board. Square 1:1.


## BB-NEW-826 — Total internal reflection: trapped light

**Subject:** physics | **Topic:** optics | **Concept:** total-internal-reflection; critical-angle; optical-fibre; diamond-brilliance | **Ground:** g0 | **Builds on:** [BB-NEW-318, BB-NEW-319, BB-NEW-825]

**Floor 0 (Idea):**
<p>When light travels from a denser medium to a less dense one (e.g., water to air), it bends away from the normal. At a steep enough angle, it doesn't escape at all — it reflects back entirely. This is total internal reflection (TIR). The angle at which it happens is the critical angle, and it depends only on the ratio of the two refractive indices. TIR is why diamonds sparkle, why fibre optics carry the internet, and why a swimming pool surface looks like a mirror from underwater.</p>

**Floor 1 (Concrete):**
<p>Light in water (n₁ = 1.33) hitting the surface. Critical angle: sin θ_c = n₂/n₁ = 1.00/1.33 = 0.752 → θ_c = 48.8°. Any ray striking the surface at more than 48.8° from the normal is totally reflected back into the water. For glass (n = 1.50) to air: θ_c = arcsin(1/1.5) = 41.8°. For diamond (n = 2.42): θ_c = arcsin(1/2.42) = 24.4° — so light entering a diamond is trapped unless it hits a facet at less than 24°, which is why diamonds are cut with precise angles to maximise internal reflections.</p>
<p>A step-index optical fibre: core (n₁ = 1.48), cladding (n₂ = 1.46). Critical angle: θ_c = arcsin(1.46/1.48) = 80.6°. This means only rays travelling nearly parallel to the axis (within ~9.4° of it) are guided — they bounce along the core by TIR with extremely low loss.</p>

**Floor 2 (Definition):**
<p><strong>Total internal reflection</strong> occurs when light in a medium of higher refractive index strikes an interface with a lower-index medium at an angle exceeding the <strong>critical angle</strong>: θ_c = arcsin(n₂/n₁). Conditions: (1) light must travel from higher n to lower n, (2) angle of incidence must exceed θ_c. At the critical angle, the refracted ray grazes the surface (90° to the normal). Above it, no transmission — 100% reflection (ignoring the evanescent wave, which decays exponentially within ~wavelength of the surface but carries no net energy). TIR is more efficient than metallic reflection — no absorption, no heating. <strong>Applications:</strong> optical fibres, prisms (90° and 180° reflectors), binoculars, endoscopes, and the sparkle of gemstones.</p>

**Floor 3 (In action):**
<p>Optical fibre is the backbone of the internet. A single fibre carries over 100 terabits per second across oceans. The signal is attenuated by ~0.2 dB/km — after 100 km, about 1% of the original power remains, and an erbium-doped fibre amplifier boosts it. The 1.4 million km of submarine cables on the ocean floor carry 99% of intercontinental data. In medicine, endoscopes use fibre bundles to peer inside the body — thousands of fibres, each carrying one pixel of the image. A prism binocular uses TIR in Porro prisms to fold the light path, making the binoculars compact while maintaining a long effective focal length. The critical angle principle also explains why you can't see above the surface when swimming underwater unless you look straight up — your field of view is compressed into a 97° cone.</p>

**Image prompt:** A chalk drawing of a ray hitting a water-air interface at an increasing angle. Below θ_c: partial reflection + transmission. At θ_c: refracted ray at 90°. Above θ_c: total internal reflection. An optical fibre cross-section: core (n₁), cladding (n₂), ray bouncing by TIR. Diamond: light entering, bouncing, exiting with dispersion. Chalk on dark green board. Square 1:1.


## BB-NEW-827 — Real and virtual images: what "focus" means

**Subject:** physics | **Topic:** optics | **Concept:** real-image; virtual-image; converging-diverging; image-formation | **Ground:** g0 | **Builds on:** [BB-NEW-824, BB-NEW-324, BB-NEW-312]

**Floor 0 (Idea):**
<p>A real image is one you can project onto a screen — light rays actually converge at that point. A movie projector casts a real image onto the screen. A virtual image is one that appears to be somewhere but isn't — light rays only appear to diverge from that point. A bathroom mirror shows a virtual image. The distinction is physical: real images can be captured on film or a sensor; virtual images can only be seen by looking through the optical system.</p>

**Floor 1 (Concrete):**
<p>A converging lens (convex, f = 10 cm) with object at 30 cm: 1/v = 1/f − 1/u = 1/10 − 1/30 = 2/30 → v = 15 cm. v is positive — real image, on the opposite side of the lens from the object. It can be projected onto a screen. Magnification: m = −v/u = −15/30 = −0.5 — inverted, half size. Object at 5 cm (inside f): 1/v = 1/10 − 1/5 = −1/10 → v = −10 cm. v negative — virtual image, on the same side as the object. Magnification: m = −(−10)/5 = +2 — upright, double size. This is a magnifying glass — the image can't be projected, but your eye sees it by looking through the lens.</p>
<p>A diverging lens (concave, f = −10 cm) with object at 20 cm: 1/v = 1/(−10) − 1/20 = −1/10 − 1/20 = −3/20 → v = −6.67 cm. Always virtual, upright, reduced. The image is on the same side as the object, smaller, and can't be projected.</p>

**Floor 2 (Definition):**
<p>A <strong>real image</strong> is formed when light rays actually converge at a point. It can be projected onto a screen or captured by a sensor/film. In the lens/mirror formula, v > 0 for real images (by the Cartesian sign convention). A <strong>virtual image</strong> is formed when light rays only appear to diverge from a point — they don't actually pass through it. v < 0 for virtual images. <strong>Converging</strong> elements (convex lens, concave mirror) can produce both real and virtual images, depending on object distance. <strong>Diverging</strong> elements (concave lens, convex mirror) always produce virtual, upright, reduced images for real objects.</p>

**Floor 3 (In action):**
<p>The real/virtual distinction governs every optical instrument. A camera lens casts a real image onto the sensor. A projector casts a real image onto the screen. Your eye's cornea and lens cast a real image onto the retina. A magnifying glass produces a virtual image — the lens is placed so the object is inside the focal point, and your relaxed eye sees it as if it were at infinity. A microscope produces a real intermediate image (objective lens) and then a virtual final image (eyepiece) — a two-stage system. A telescope does the same: the objective forms a real image, and the eyepiece magnifies it as a virtual image. The sign of v tells you instantly whether the image can be caught on a screen or only seen by eye.</p>

**Image prompt:** A chalk drawing of a convex lens with object beyond f (real, inverted image on far side) and object inside f (virtual, upright, enlarged image on same side). Concave lens: virtual, upright, reduced. Ray diagrams with principal rays. The lens equation 1/f = 1/u + 1/v. Chalk on dark green board. Square 1:1.


## BB-NEW-828 — The lens formula: 1/f = 1/u + 1/v

**Subject:** physics | **Topic:** optics | **Concept:** lens-formula; thin-lens-equation; magnification; lens-power | **Ground:** g1 | **Builds on:** [BB-NEW-322, BB-NEW-323, BB-NEW-827]

**Floor 0 (Idea):**
<p>Every lens — the one in your eye, in your phone camera, in a microscope — obeys the same equation: 1/f = 1/u + 1/v. The focal length f is fixed by the lens shape and material. The object distance u and image distance v adjust to satisfy the equation. The lens does the algebra: move the object closer, and the image moves further away, growing larger. This is the lens formula, and it's the single most useful equation in geometrical optics.</p>

**Floor 1 (Concrete):**
<p>A camera lens with f = 50 mm. To focus on a distant mountain (u ≈ ∞): 1/v = 1/f − 1/∞ = 1/50 → v = 50 mm. The sensor must be 50 mm behind the lens. To focus on a subject at 1.0 m (1000 mm): 1/v = 1/50 − 1/1000 = (20−1)/1000 = 19/1000 → v = 52.6 mm. The lens must move forward by 2.6 mm. To focus at 0.25 m (close-up): 1/v = 1/50 − 1/250 = (5−1)/250 = 4/250 → v = 62.5 mm — the lens extends 12.5 mm. This is why lenses get longer when focusing close. Magnification: m = v/u. At 1 m: m = 52.6/1000 = 0.0526 — the image on the sensor is 1/19 of actual size.</p>
<p>Lens power in dioptres: P = 1/f (f in metres). A 50 mm lens has P = 1/0.050 = +20 D (converging). A −25 mm diverging lens: P = 1/(−0.025) = −40 D. The eye has P ≈ 60 D — its focal length is about 17 mm.</p>

**Floor 2 (Definition):**
<p>The <strong>thin lens equation:</strong> 1/f = 1/u + 1/v. <strong>Sign convention</strong> (Cartesian): f > 0 for converging (convex), f < 0 for diverging (concave). u > 0 for real objects (on the incoming light side). v > 0 for real images (opposite side from object), v < 0 for virtual images (same side). <strong>Magnification:</strong> m = −v/u (linear; negative = inverted). <strong>Lens power:</strong> P = 1/f (dioptres, D). <strong>Lens maker's formula:</strong> 1/f = (n−1)(1/R₁ − 1/R₂), where n is refractive index and R₁, R₂ are radii of curvature (positive for convex surfaces, negative for concave). The formula applies to thin lenses in air. For thick lenses and lens systems, more complex matrix methods are used.</p>

**Floor 3 (In action):**
<p>The lens formula governs every camera, every pair of glasses, every telescope. Myopia (nearsightedness) is corrected with diverging lenses (negative P) — they spread light slightly so the eye's too-strong lens can focus it on the retina. Hyperopia (farsightedness) needs converging lenses (positive P). An optometrist's prescription of −2.50 D means a diverging lens with f = 1/2.5 = 0.40 m = 40 cm. A smartphone camera has a tiny lens — typical f ≈ 4 mm, P = 250 D — and focuses by moving the lens assembly a fraction of a millimetre. The James Webb Space Telescope's primary mirror has f = 131.4 m — the light from distant galaxies converges to a focus 131 m behind the mirror, folded by secondary and tertiary mirrors into the instrument bay.</p>

**Image prompt:** A chalk drawing of a thin lens with principal axis, focal points F and F'. Object at u, image at v. Ray diagram: ray parallel to axis → through F'; ray through centre → undeviated. The lens equation 1/f = 1/u + 1/v. A camera lens extending to focus close. A glasses prescription: −2.50 D, f = 40 cm. Chalk on dark green board. Square 1:1.


## BB-NEW-829 — The magnifying glass and the compound microscope

**Subject:** physics | **Topic:** optics | **Concept:** simple-magnifier; compound-microscope; angular-magnification; objective-eyepiece | **Ground:** g1 | **Builds on:** [BB-NEW-828, BB-NEW-827, BB-NEW-324]

**Floor 0 (Idea):**
<p>A magnifying glass is the simplest optical instrument: a single converging lens held close to the eye, with the object placed inside the focal point. The lens produces a virtual, enlarged image at the near point of the eye (25 cm). The angular magnification tells you how much bigger the object <em>looks</em> compared to holding it at 25 cm without the lens. A compound microscope uses two lenses — an objective and an eyepiece — to achieve much higher magnification by cascading two stages of enlargement.</p>

**Floor 1 (Concrete):**
<p><strong>Simple magnifier:</strong> lens f = 5.0 cm. Object placed just inside f (at ~4.8 cm) → virtual image at 25 cm. Angular magnification M = 25/f + 1 = 25/5 + 1 = 6× (for image at near point). If the eye is relaxed (image at infinity, object at f): M = 25/f = 5×. A 10× jeweller's loupe has f = 2.5 cm.</p>
<p><strong>Compound microscope:</strong> objective f_o = 0.40 cm, eyepiece f_e = 2.5 cm. Tube length L = 16 cm (distance between focal points). Objective forms a real intermediate image at the eyepiece's focal point. Magnification: M_o = L/f_o = 16/0.40 = 40×. M_e = 25/f_e = 25/2.5 = 10×. Total M = 40 × 10 = 400×. Using a 100× oil-immersion objective (f_o ≈ 0.16 cm): M_o = 16/0.16 = 100×, total 1000×. This is the practical limit for light microscopy — diffraction limits resolution to about 0.2 µm.</p>

**Floor 2 (Definition):**
<p><strong>Angular magnification</strong> M = θ'/θ, where θ' is the angle subtended by the image at the eye and θ is the angle subtended by the object at the near point (25 cm) without the lens. For a <strong>simple magnifier:</strong> M = 25/f (image at infinity, relaxed eye) or M = 25/f + 1 (image at near point). For a <strong>compound microscope:</strong> M = M_o × M_e = (L/f_o) × (25/f_e). The <strong>objective</strong> is a short-focus lens placed close to the specimen; it forms a real, enlarged intermediate image. The <strong>eyepiece</strong> acts as a simple magnifier to view that image. Resolution is limited by diffraction: minimum resolvable distance d ≈ λ/(2 NA), where NA = n sin θ is the numerical aperture.</p>

**Floor 3 (In action):**
<p>Microscopes opened the microscopic world. Robert Hooke's *Micrographia* (1665) revealed cells, fleas, and plant structures for the first time. Antonie van Leeuwenhoek achieved ~300× with single-lens microscopes, discovering bacteria, spermatozoa, and blood cells. Modern research microscopes use infinity-corrected optics, fluorescence, confocal scanning, and electron beams. An electron microscope uses magnetic lenses (solenoids) to focus electrons with wavelengths of ~0.004 nm, achieving sub-nanometre resolution — enough to image individual atoms. The same two-lens principle scales from a child's magnifying glass to instruments that see the machinery of life.</p>

**Image prompt:** A chalk drawing of a simple magnifier: lens, object inside f, virtual enlarged image at 25 cm. Ray diagram. M = 25/f. A compound microscope: objective (short f_o), intermediate image, eyepiece (f_e), final virtual image at near point. M = (L/f_o)(25/f_e). Chalk on dark green board. Square 1:1.


## BB-NEW-830 — The astronomical telescope: bringing the stars closer

**Subject:** physics | **Topic:** optics | **Concept:** refracting-telescope; reflecting-telescope; angular-magnification; resolving-power | **Ground:** g1 | **Builds on:** [BB-NEW-324, BB-NEW-828, BB-NEW-829]

**Floor 0 (Idea):**
<p>A telescope doesn't make things look bigger the way a magnifying glass does — it makes them look <em>closer</em>. A distant star is a point of light; no amount of magnification will make it larger. What a telescope does is collect vastly more light than your eye and concentrate it into a bright, detailed image. The angular magnification makes Jupiter's disc visible and Saturn's rings distinct. Galileo's first telescope in 1609 had 3× magnification; modern observatories achieve 1000× or more.</p>

**Floor 1 (Concrete):**
<p><strong>Refracting telescope</strong> (Keplerian): objective f_o = 1.00 m, eyepiece f_e = 10 mm = 0.010 m. Angular magnification M = f_o/f_e = 1.00/0.010 = 100×. The objective forms a real image at its focal plane; the eyepiece is positioned so this image is at its focal point, sending parallel rays to the eye (relaxed viewing). The telescope tube is roughly f_o + f_e = 1.01 m long. A 100 mm aperture collects (100/7)² ≈ 200× more light than the dark-adapted human eye (7 mm pupil) — enough to see stars 5–6 magnitudes fainter.</p>
<p><strong>Reflecting telescope</strong> (Newtonian): concave primary mirror f_o = 1.20 m, eyepiece f_e = 15 mm. M = 1200/15 = 80×. Reflectors avoid chromatic aberration (colour fringing) because reflection doesn't disperse light. The largest refractor ever built (Yerkes Observatory, 1897) has a 1.02 m objective; the largest reflectors exceed 10 m.</p>

**Floor 2 (Definition):**
<p>An <strong>astronomical telescope</strong> collects light from a distant object and presents a magnified virtual image to the eye. <strong>Angular magnification:</strong> M = f_o/f_e (for a simple two-lens system, object at infinity, relaxed eye). <strong>Light-gathering power:</strong> proportional to aperture area = π(D/2)². <strong>Resolving power:</strong> minimum angular separation = 1.22 λ/D (Rayleigh criterion). A 10 m telescope at λ = 550 nm can resolve 0.014 arcseconds. <strong>Refractor:</strong> uses lenses (objective + eyepiece). Suffers chromatic aberration unless corrected (achromatic doublet, apochromat). <strong>Reflector:</strong> uses mirrors — no chromatic aberration, can be built much larger. Modern large telescopes are reflectors.</p>

**Floor 3 (In action):**
<p>Galileo's 1609 telescope (20 mm aperture, 20×) discovered lunar craters, Jupiter's moons, and the phases of Venus — evidence that shattered the geocentric model. The Hubble Space Telescope (2.4 m, f/24) has imaged galaxies 13.4 billion light-years away. The Extremely Large Telescope (under construction in Chile, 39 m primary mirror) will directly image exoplanets. Amateur astronomers with a 200 mm Dobsonian reflector can see Saturn's rings, Jupiter's cloud bands, and hundreds of deep-sky objects. The principle is unchanged since Galileo: a large light-collector, a small eyepiece, and the ratio of their focal lengths determines the view.</p>

**Image prompt:** A chalk drawing of a refracting telescope. Objective lens (f_o = 1 m), eyepiece (f_e = 10 mm). Rays from a distant star entering parallel, converging at objective focal plane, then entering eyepiece and emerging parallel to the eye. M = f_o/f_e = 100×. A Newtonian reflector beside it: concave mirror, flat secondary, eyepiece. Chalk on dark green board. Square 1:1.


## BB-NEW-831 — Dispersion: white light is a rainbow in disguise

**Subject:** physics | **Topic:** optics | **Concept:** dispersion; prism; spectrum; chromatic-aberration; rainbow | **Ground:** g0 | **Builds on:** [BB-NEW-321, BB-NEW-825, BB-NEW-753]

**Floor 0 (Idea):**
<p>White light isn't pure — it's a mixture of all visible wavelengths, from violet (~380 nm) to red (~750 nm). Pass it through a prism, and the different wavelengths refract at slightly different angles — blue bends more than red. The result is a rainbow: the solar spectrum, first demonstrated by Newton in 1666. This is dispersion, and it's why diamonds flash colour and why cheap binoculars have coloured fringes around bright objects.</p>

**Floor 1 (Concrete):**
<p>Crown glass refractive index: n_violet (380 nm) ≈ 1.53, n_red (750 nm) ≈ 1.51. The difference Δn = 0.02 is the dispersion. A 60° prism splits white light: the deviation angle for violet is about 0.8° larger than for red — enough to spread a beam into a visible spectrum at a distance.</p>
<p><strong>Rainbow:</strong> sunlight enters a spherical water droplet, refracts (disperses), reflects off the back inner surface, and refracts again on exit. The rainbow angle is ~42° for red, ~40° for violet — the 2° spread creates the coloured bands. A secondary rainbow (53°, colours reversed) is a double reflection inside the drop. The dark band between them is Alexander's dark band — angles where no light is reflected to the observer.</p>

**Floor 2 (Definition):**
<p><strong>Dispersion</strong> is the variation of refractive index with wavelength: n(λ). Most transparent materials have <strong>normal dispersion</strong> — n decreases as λ increases (blue bends more than red). <strong>Abbe number</strong> V_d = (n_d − 1)/(n_F − n_C) quantifies dispersion; high V_d = low dispersion (good optics). <strong>Chromatic aberration:</strong> a single lens focuses blue light closer than red, producing coloured fringes. Corrected by achromatic doublets (crown + flint glass) or apochromatic triplets. <strong>Rainbow formation:</strong> refraction → dispersion → internal reflection → refraction. Primary bow: 1 internal reflection, 40–42°. Secondary bow: 2 reflections, 50–53°, reversed colours. <strong>Supernumerary bows:</strong> interference fringes inside the primary bow, caused by wave effects.</p>

**Floor 3 (In action):**
<p>Dispersion is exploited and fought. A spectrometer uses a prism (or diffraction grating) to spread light into its spectrum — measuring the intensity at each wavelength reveals chemical composition, temperature, and velocity. Jewellers cut diamonds to maximise dispersion — the "fire" of a diamond is the spectral colours from its high dispersion (n_violet − n_red ≈ 0.044). Camera lenses use achromatic doublets to suppress chromatic aberration — without them, colour photos would have coloured halos. The sky is blue and sunsets are red because of Rayleigh scattering (λ⁻⁴), which is a kind of natural dispersion — the atmosphere acts as a prism, spreading sunlight into colours, scattering blue and leaving red.</p>

**Image prompt:** A chalk drawing of a prism splitting white light into a spectrum. Rays of different colours bending at different angles — violet most, red least. A raindrop cross-section: sunlight entering, dispersing, reflecting, exiting — primary rainbow at 42°. A chromatic aberration diagram: lens focusing blue closer than red. Chalk on dark green board. Square 1:1.


## BB-NEW-832 — Chromatic and spherical aberration: why lenses aren't perfect

**Subject:** physics | **Topic:** optics | **Concept:** chromatic-aberration; spherical-aberration; optical-aberrations; lens-design | **Ground:** g1 | **Builds on:** [BB-NEW-831, BB-NEW-828, BB-NEW-824]

**Floor 0 (Idea):**
<p>A simple lens doesn't form a perfect image. Two problems plague it. Chromatic aberration: different colours focus at different distances because the glass's refractive index varies with wavelength. Blue focuses closer than red. Spherical aberration: rays hitting the edge of a spherical lens focus closer than rays near the centre. Both blur the image. Correcting them is the art of lens design — and it's why good camera lenses have a dozen elements.</p>

**Floor 1 (Concrete):**
<p><strong>Chromatic aberration:</strong> a crown glass lens (n_d = 1.52, Abbe number V = 59) of focal length 100 mm for green light. For blue (n = 1.524), f ≈ 98 mm. For red (n = 1.517), f ≈ 101 mm. The 3 mm focus shift produces a coloured halo around high-contrast edges. An achromatic doublet pairs a crown glass positive lens (low dispersion) with a flint glass negative lens (high dispersion) — the flint's opposite power and higher dispersion cancel the crown's colour spread. The result: red and blue focus at the same point.</p>
<p><strong>Spherical aberration:</strong> a plano-convex lens with f = 100 mm, diameter 50 mm. Paraxial rays (near axis) focus at 100.0 mm. Marginal rays (at the edge) focus at about 98.5 mm — a 1.5 mm blur circle. Using an aspheric surface (not a perfect sphere) corrects this. Stopping down the aperture (using only the central part of the lens) reduces spherical aberration but also reduces light.</p>

**Floor 2 (Definition):**
<p><strong>Optical aberrations</strong> are deviations from ideal image formation. <strong>Chromatic aberration:</strong> longitudinal (different colours focus at different distances) and lateral (different colours magnified differently). Corrected by achromatic doublets (two glasses with different dispersion) or apochromats (three or more glasses). <strong>Spherical aberration:</strong> rays at different distances from the axis focus at different points. Corrected by aspheric surfaces, multiple lens elements, or stopping down. Other Seidel aberrations: coma (off-axis points smear), astigmatism (different focal lengths for different orientations), field curvature (image is curved not flat), distortion (pincushion/barrel). Modern lens design balances all seven Seidel aberrations using multiple elements of different glasses, shapes, and spacings.</p>

**Floor 3 (In action):**
<p>Every camera lens is a battle against aberrations. A kit zoom lens (18–55 mm) has ~9–15 elements, many of which exist solely to correct aberrations. A prime lens (fixed focal length) can be simpler — 5–7 elements. An apochromatic telescope objective costs many times an achromat because the extra correction requires exotic glasses (fluorite, ED glass). The Hubble Space Telescope's primary mirror was ground to the wrong shape — a spherical aberration error of 2.2 µm at the edge, producing blurry images. COSTAR, installed in 1993, added corrective optics (small mirrors the size of coins) that compensated for the error — essentially putting corrective glasses on a $1.5 billion telescope.</p>

**Image prompt:** A chalk drawing of a lens showing chromatic aberration: parallel white light entering, blue ray focusing closer than red. Achromatic doublet beside it: crown + flint, both colours converging at the same point. Spherical aberration: marginal rays focusing closer than paraxial rays. Aspheric surface correcting it. Chalk on dark green board. Square 1:1.


## BB-NEW-833 — The human eye: nature's camera

**Subject:** physics | **Topic:** optics | **Concept:** human-eye; accommodation; near-point; far-point; vision-defects | **Ground:** g0 | **Builds on:** [BB-NEW-324, BB-NEW-828, BB-NEW-827]

**Floor 0 (Idea):**
<p>Your eye is a self-focusing, self-cleaning, auto-exposing camera built from jelly and water. Light enters through the cornea (the main focusing element, ~43 dioptres), passes through the pupil (a variable aperture), and is fine-focused by the crystalline lens (~17 dioptres) onto the retina — a curved sensor of 120 million rod cells and 6 million cone cells. The image is inverted; your brain flips it. The entire assembly fits in a 24 mm sphere.</p>

**Floor 1 (Concrete):**
<p>The relaxed eye focuses on distant objects (far point = infinity). To focus closer, the ciliary muscles contract, allowing the lens to become more curved — this is <strong>accommodation</strong>. A young adult's near point (closest focusable distance) is about 10 cm; by age 50, it's ~50 cm (presbyopia — the lens stiffens). The eye's total power: P = P_cornea + P_lens ≈ 43 + 17 = 60 D, giving f ≈ 17 mm. The retina has about the area of a postage stamp. The fovea (the central 1.5 mm of the retina, packed with cones) provides ~120 arcseconds of angular resolution — about 20/20 vision.</p>
<p><strong>Myopia</strong> (nearsighted): the eyeball is too long, or the cornea too curved. Distant objects focus in front of the retina. Corrected with diverging lenses. <strong>Hyperopia</strong> (farsighted): eyeball too short — near objects focus behind the retina. Corrected with converging lenses. <strong>Astigmatism:</strong> the cornea is not spherical — different meridians have different curvatures. Corrected with cylindrical lenses.</p>

**Floor 2 (Definition):**
<p>The <strong>human eye</strong> is a compound optical system. <strong>Cornea:</strong> P ≈ 43 D (fixed). <strong>Crystalline lens:</strong> P ≈ 17–30 D (variable, controlled by ciliary muscles). <strong>Pupil:</strong> diameter 2–8 mm, controlling light entry (area ratio 16:1). <strong>Retina:</strong> photoreceptors — rods (low light, monochrome, 120 million) and cones (colour, detail, 6 million). <strong>Accommodation:</strong> the ability to change lens power to focus at different distances. <strong>Near point:</strong> closest distance of clear focus — recedes with age. <strong>Far point:</strong> farthest — infinity for emmetropic (normal) vision. <strong>Visual acuity:</strong> 20/20 = resolve 1 arcminute. Angular resolution limit from diffraction: θ = 1.22 λ/D ≈ 1.22 × 550×10⁻⁹/0.004 ≈ 0.6 arcminute for a 4 mm pupil — close to the theoretical limit.</p>

**Floor 3 (In action):**
<p>LASIK surgery reshapes the cornea with a laser, changing its power to correct myopia, hyperopia, and astigmatism. A typical myopic correction removes 10–20 µm of corneal tissue. Cataract surgery replaces the clouded natural lens with a plastic intraocular lens — chosen to give the patient emmetropia at distance. The lens formula explains why: IOL power is calculated from the eye's axial length and corneal power. The eye's dynamic range — from starlight to full sunlight — spans about 10¹² in intensity. The pupil and retinal chemistry (dark adaptation) manage this range. No camera matches the human eye for simultaneous wide dynamic range, resolution, and colour discrimination in a self-repairing, self-cleaning package.</p>

**Image prompt:** A chalk drawing of the eye cross-section. Cornea, pupil (variable aperture), crystalline lens, retina. Rays from a distant object converging on the retina. Myopic eye: rays converging in front of retina, corrected with diverging lens. Hyperopic: converging behind, corrected with converging lens. Near point receding with age graph. Chalk on dark green board. Square 1:1.


## BB-NEW-834 — Camera and projector: real images in practice

**Subject:** physics | **Topic:** optics | **Concept:** camera; projector; aperture; depth-of-field; f-number | **Ground:** g1 | **Builds on:** [BB-NEW-828, BB-NEW-827, BB-NEW-821]

**Floor 0 (Idea):**
<p>A camera and a projector are the same optical system run in opposite directions. A camera takes a large, distant scene and shrinks it onto a tiny sensor. A projector takes a tiny transparent image and blows it up onto a large screen. Both form real images using a converging lens. The camera's f-number controls how much light enters and how much of the scene is in focus. The projector's lens must be bright and sharp across the entire frame.</p>

**Floor 1 (Concrete):**
<p><strong>Camera:</strong> lens f = 50 mm, aperture diameter D = 25 mm. f-number = f/D = 50/25 = f/2. At f/2, the aperture area is π(12.5)² = 491 mm². At f/8 (D = 6.25 mm), area = 31 mm² — 16× less light. Exposure time must increase 16× (e.g., 1/60 s → 1/4 s). <strong>Depth of field:</strong> at f/2, a subject at 3 m has ~0.3 m in focus; at f/16, ~3 m in focus. The hyperfocal distance: H = f²/(Nc), where c is the circle of confusion (~0.03 mm for 35 mm format). At f/8 with 50 mm lens: H = 50²/(8 × 0.03) ≈ 10.4 m. Focus at H, and everything from H/2 to infinity is acceptably sharp.</p>
<p><strong>Projector:</strong> a 35 mm slide (24 × 36 mm) projected to 2.4 × 3.6 m screen — magnification 100×. Required lens focal length: f = d/(m+1) ≈ d/m for large m. For d = 5 m throw: f = 5/100 = 50 mm. The illumination on the screen: E = Φ/A. A 500 W lamp producing 10,000 lm through the slide gives E ≈ 10,000/(2.4×3.6) ≈ 1160 lux — bright enough in a darkened room.</p>

**Floor 2 (Definition):**
<p>The <strong>f-number</strong> (f-stop) is the ratio of focal length to aperture diameter: N = f/D. Each full stop (f/1.4, f/2, f/2.8, f/4, f/5.6, f/8, f/11, f/16, f/22) halves or doubles the light. Smaller f-number = larger aperture = more light, shallower depth of field. <strong>Depth of field</strong> is the range of distances that appear acceptably sharp. It increases with smaller aperture (larger f-number), shorter focal length, and greater subject distance. The <strong>circle of confusion</strong> is the largest blur spot that still appears as a point — typically 0.03 mm for 35 mm format. <strong>Exposure</strong> is controlled by aperture, shutter speed, and sensor/film sensitivity (ISO).</p>

**Floor 3 (In action):**
<p>Photography is applied optics. A portrait at f/1.4 isolates the subject with a blurred background. A landscape at f/11 keeps everything sharp from foreground to horizon. Sports photography uses wide apertures (f/2.8) for fast shutter speeds (1/1000 s) to freeze motion. A smartphone camera (f ≈ 4 mm, f/1.8) has a tiny sensor — the short focal length gives enormous depth of field even at wide apertures, which is why phones struggle to blur backgrounds optically (they use software). The projector equation explains why a short-throw projector can cast a huge image from a few centimetres away: it uses a very short focal length lens and a wide-angle design.</p>

**Image prompt:** A chalk drawing of a camera: lens, aperture diaphragm, sensor/film plane. Rays from subject converging to real image. f-number = f/D. Depth of field diagram: near limit, far limit, subject. A projector: lamp, slide, lens, screen — image enlarged. Chalk on dark green board. Square 1:1.


## BB-NEW-835 — The optics toolkit

**Subject:** physics | **Topic:** optics | **Concept:** optics-summary; light-measurement-images-synthesis | **Ground:** g1 | **Builds on:** [BB-NEW-820 through BB-NEW-834]

**Floor 0 (Idea):**
<p>After 15 BBs of optics through the Frye lens, the picture is complete. Light is a wave travelling at 3×10⁸ m/s. It reflects at equal angles, refracts according to Snell's law, disperses into colours, focuses through lenses and mirrors to form images, and carries energy that diminishes with the square of distance. Every optical instrument — from your eye to the Hubble Space Telescope — is a combination of these few principles.</p>

**Floor 1 (Concrete):**
<p>Identify the principle:</p>
<p>1. A mirror: θ_i = θ_r. Image is virtual, same distance behind as object is in front.</p>
<p>2. A lens: 1/f = 1/u + 1/v. Real image if v > 0, virtual if v < 0. m = −v/u.</p>
<p>3. A prism: dispersion — n(λ) varies, blue bends more than red.</p>
<p>4. Fibre optic: total internal reflection — θ > θ_c = arcsin(n₂/n₁).</p>
<p>5. Camera: f-number = f/D. Exposure, depth of field, hyperfocal distance.</p>
<p>6. Microscope: M = (L/f_o)(25/f_e). Two-stage magnification.</p>
<p>7. Telescope: M = f_o/f_e. Light-gathering ∝ D². Resolution ∝ 1/D.</p>
<p>8. The eye: dynamic lens (accommodation), fixed sensor (retina), 60 D total power.</p>

**Floor 2 (Definition):**
<p><strong>Geometrical optics master principles:</strong></p>
<p>• <strong>Reflection:</strong> θ_i = θ_r. Plane mirror: virtual, same size, same distance behind.</p>
<p>• <strong>Refraction:</strong> n₁ sin θ₁ = n₂ sin θ₂. n = c/v. Bends toward normal in denser medium.</p>
<p>• <strong>TIR:</strong> θ_c = arcsin(n₂/n₁). Requires n₁ > n₂. 100% reflection.</p>
<p>• <strong>Mirrors:</strong> 1/f = 1/u + 1/v. f = R/2. Concave: f > 0. Convex: f < 0.</p>
<p>• <strong>Lenses:</strong> 1/f = 1/u + 1/v. P = 1/f (D). Converging: f > 0. Diverging: f < 0.</p>
<p>• <strong>Magnification:</strong> m = −v/u. Simple magnifier: M = 25/f.</p>
<p>• <strong>Photometry:</strong> I (cd), Φ (lm), E (lx). E = I/r². 1 W at 555 nm = 683 lm.</p>
<p>• <strong>Dispersion:</strong> n(λ) — blue > red. Chromatic aberration: corrected by achromats.</p>

**Floor 3 (In action):**
<p>Optics is the oldest precision science. The ancient Greeks had burning-glasses (convex lenses to focus sunlight). Alhazen (Ibn al-Haytham) in the 11th century correctly described vision as light entering the eye. Galileo's telescope shattered the geocentric cosmos. Newton's prism revealed the spectrum. Fizeau measured the speed of light. Today, a smartphone contains six or more cameras — each a precision optical assembly designed using these same equations. The James Webb Space Telescope, costing $10 billion, is an optical instrument operating at 40 K, imaging the infrared universe with mirrors aligned to nanometre precision. The principles haven't changed since Alhazen. Only our ability to execute them has.</p>

**Image prompt:** A chalk drawing of a grand synthesis: a plane mirror, concave/convex mirrors, converging/diverging lenses, a prism dispersing light, a fibre optic with TIR, an eye cross-section, a camera, a telescope. The master equation table. "GEOMETRICAL OPTICS" at top. Chalk on dark green board. Square 1:1.
