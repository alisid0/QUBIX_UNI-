# Reflection & Refraction — Complete Course (15 BBs)

A rigorous, equation-driven optics course drawn from H.C. Verma's treatment. The core equation — Snell's law n₁ sin θ₁ = n₂ sin θ₂ — is rehearsed in 7 of the 15 BBs until it is second nature. The mirror formula (1/f = 1/v + 1/u) and lens formula appear repeatedly with worked sign-convention examples. The through-line: light travels in straight lines (rays), bounces predictably (reflection), bends at boundaries (refraction), and can be trapped (TIR) or spread into colours (dispersion). Currently 0 BBs exist in this topic.

---

# Part 1 — Foundations

---

## BB-NEW-310 — What is light? The ray model

**Subject:** physics | **Topic:** optics | **Concept:** light; ray-model; speed-of-light; electromagnetic-wave | **Ground:** g0 | **Builds on:** [Card 01]

**Floor 0 (Idea):**
<p>You see this text because light from your screen enters your eyes. Light is an electromagnetic wave — oscillating electric and magnetic fields that travel through space at 3 × 10⁸ m/s, the fastest anything can go. For most of optics, we don't need the full wave description. We can model light as rays — infinitely thin straight lines that show the path light travels. A ray changes direction only when it hits a surface (reflection) or enters a new medium (refraction). The ray model is a simplification, but it predicts the behaviour of mirrors, lenses, and prisms with extraordinary accuracy.</p>

**Floor 1 (Concrete):**
<p>In a dusty room, sunlight streaming through a window appears as a straight beam — you're seeing the path of light rays scattered by dust particles. A laser pointer produces a pencil-thin beam that stays straight for hundreds of metres. A pinhole camera forms an inverted image because light travels in straight lines from each point on the object, through the pinhole, to a specific point on the screen. The ray model says: from every point on an object, light rays travel outward in all directions. Your eye catches a small cone of these rays, and your brain reconstructs the object's position. When you look at a star, the rays entering your eye are essentially parallel — the star is so far away that the cone of rays is a cylinder.</p>

**Floor 2 (Definition):**
<p><strong>Light</strong> is electromagnetic radiation visible to the human eye — wavelengths approximately 400 nm (violet) to 700 nm (red). The <strong>speed of light in vacuum</strong>: c = 2.99792458 × 10⁸ m/s (exactly 299,792,458 m/s by definition of the metre). In any medium, v = c/n, where n ≥ 1 is the <strong>refractive index</strong> of the medium. The <strong>ray model</strong> of light: (1) Light travels in straight lines in a uniform medium. (2) Rays are perpendicular to wavefronts. (3) Rays can intersect without affecting each other (principle of superposition). (4) A ray changes direction only at an interface between two media (reflection or refraction). The ray model fails when light passes through apertures comparable to its wavelength (diffraction) — for that, the full wave model is needed.</p>

**Floor 3 (In action):**
<p>The ray model is the entire foundation of geometric optics — mirrors, lenses, prisms, fibre optics, cameras, telescopes, and your eyes. It works because the wavelength of visible light (~500 nm) is far smaller than the apertures and objects we typically deal with (>1 mm). Diffraction effects are negligible at these scales. The model is predictive: given the position of an object, the shape of a mirror, and the law of reflection, you can trace rays to find exactly where the image forms. Given the shape of a lens, its material, and Snell's law, you can predict exactly how it will focus light. The ray model doesn't explain WHY light bends (that's the wave model, via Huygens' principle) or what light IS (that's electromagnetism). But for designing optical instruments and understanding vision, it's the right tool at the right level.</p>

**Image prompt:** A chalk drawing of a candle, a pinhole, and an inverted image on a screen — straight rays from the candle's top and bottom through the pinhole. Below: a laser beam in a dusty room showing a straight line. "Light travels in straight lines — the ray model." Chalk on dark green board. Square 1:1.

---

## BB-NEW-311 — The law of reflection: the simplest rule in optics

**Subject:** physics | **Topic:** optics | **Concept:** law-of-reflection; angle-of-incidence; angle-of-reflection; specular-vs-diffuse | **Ground:** g0 | **Builds on:** [BB-NEW-310]

**Floor 0 (Idea):**
<p>Look in a mirror. Your face appears behind the glass, reversed left to right. This is reflection — light bouncing off a surface. The rule is the simplest in all of optics: the angle of incidence equals the angle of reflection. θ_i = θ_r. Both angles are measured from the normal — an imaginary line perpendicular to the surface at the point where the ray hits. The incident ray, the reflected ray, and the normal all lie in the same plane. That's it. That's the entire law.</p>

**Floor 1 (Concrete):**
<p>Shine a laser at a flat mirror at 30° to the normal. The reflected beam leaves at exactly 30° on the other side of the normal. Tilt the mirror by 10° and the reflected beam swings by 20° — because both the incidence angle (relative to the new normal) and the reflection angle change. A pool player uses the law of reflection: to sink a bank shot, the ball must hit the cushion at the angle that sends it to the pocket — the angle of incidence equals the angle of reflection (approximately, accounting for spin and cushion deformation). On a rough surface like paper, the law still holds at each microscopic point, but because the surface is bumpy, the normals point in all directions — light reflects in all directions. This is <strong>diffuse reflection</strong>, and it's why you can see this page from any angle. A mirror has a smooth surface — all normals point the same way, so parallel incident rays stay parallel after reflection. This is <strong>specular reflection</strong>.</p>

**Floor 2 (Definition):**
<p>The <strong>law of reflection</strong>: (1) The incident ray, the reflected ray, and the normal to the surface at the point of incidence all lie in the <strong>same plane</strong>. (2) The <strong>angle of incidence</strong> (θ_i, measured from the normal to the incident ray) equals the <strong>angle of reflection</strong> (θ_r, measured from the normal to the reflected ray): <strong>θ_i = θ_r</strong>. The normal is a line perpendicular to the surface at the point of contact. <strong>Specular reflection</strong> — from a smooth surface, parallel rays stay parallel (mirror). <strong>Diffuse reflection</strong> — from a rough surface, rays scatter in all directions (paper, walls, most everyday objects). Both obey the law of reflection at the microscopic level.</p>

**Floor 3 (In action):**
<p>The law of reflection is the entire operating principle of mirrors. Every ray diagram — for plane mirrors, concave mirrors, convex mirrors — traces two or three rays from an object to its image using θ_i = θ_r. Corner reflectors (three mutually perpendicular mirrors, like a cube corner) use the law of reflection three times to send light back exactly the way it came — used in bicycle reflectors, road studs, and the retroreflectors left on the Moon by Apollo astronauts (lunar laser ranging still measures the Earth-Moon distance to centimetre precision using these). Periscopes use two mirrors at 45° to shift the line of sight. The law of reflection is so simple it seems trivial — but combined with curved surfaces, it produces the entire science of image formation by mirrors.</p>

**Image prompt:** A chalk drawing of a ray hitting a flat mirror. Normal drawn as a dashed perpendicular line. θ_i and θ_r labelled as equal angles. Incident and reflected rays shown. Below: smooth surface → parallel rays stay parallel (specular). Rough surface → rays scatter (diffuse, but θ_i=θ_r at each micro-facet). Chalk on dark green board. Square 1:1.

---

# Part 2 — Reflection deep dive

---

## BB-NEW-312 — Plane mirrors: virtual images and lateral inversion

**Subject:** physics | **Topic:** optics | **Concept:** plane-mirror; virtual-image; lateral-inversion; image-distance | **Ground:** g0 | **Builds on:** [BB-NEW-311]

**Floor 0 (Idea):**
<p>A plane mirror produces an image that appears to be behind the mirror — as far behind as the object is in front. The image is virtual: light rays don't actually come from behind the mirror; your brain extrapolates the reflected rays backward and interprets them as originating there. The image is the same size as the object, upright, and laterally inverted — your left hand appears to be the image's right hand. All of these properties follow from the law of reflection applied to a flat surface.</p>

**Floor 1 (Concrete):**
<p>Stand 1 metre in front of a plane mirror. Your image appears 1 metre behind the mirror — total apparent distance from you to your image is 2 metres. To see your full body, the mirror needs to be only half your height — because the ray from your feet to your eyes reflects from a point halfway between your feet and your eye level in the mirror. A mirror 0.8 m tall placed at the right height lets a 1.6 m person see their full body. Two parallel plane mirrors facing each other produce infinite reflections — each image acts as an object for the other mirror. Three mutually perpendicular mirrors form a corner reflector — look into one and you see yourself as others see you (not laterally inverted), because the three reflections cancel the reversal.</p>

**Floor 2 (Definition):**
<p>For a <strong>plane mirror</strong>: (1) The image is <strong>virtual</strong> — it cannot be projected onto a screen; light rays only appear to diverge from it. (2) The image distance equals the object distance: <strong>v = u</strong> (using the convention that v and u have opposite signs for a plane mirror, or treating the image as being behind the mirror). (3) Image size = object size (magnification m = +1). (4) The image is <strong>erect</strong> (upright). (5) The image is <strong>laterally inverted</strong> — left and right are swapped. (6) The image is located on the line perpendicular from the object to the mirror, at equal distance behind the mirror. Ray diagram: from the object, draw one ray perpendicular to the mirror (reflects straight back) and one ray at an arbitrary angle (reflects at θ_i = θ_r). Extend reflected rays backward behind the mirror — they meet at the image point.</p>

**Floor 3 (In action):**
<p>Plane mirrors are the most common optical device in daily life: bathroom mirrors, rear-view mirrors (though these are often slightly convex for a wider field), dressing room mirrors, and the mirrors in laser cavities. An ambulance is written in mirror-writing on the front so drivers see it correctly in their rear-view mirrors. A kaleidoscope uses multiple plane mirrors at angles to create symmetric patterns — the angle between mirrors determines the number of reflections and the symmetry of the pattern. The image in a plane mirror is a perfect 3D replica — if you wink your right eye, your image winks ITS right eye, which appears on YOUR left. This is lateral inversion, and it's why text looks backwards in a mirror and why a corner reflector (three perpendicular mirrors) is needed to see yourself without the swap.</p>

**Image prompt:** A chalk drawing of a person standing in front of a plane mirror. Rays traced from the person's head and feet to the eye, reflecting at θ_i=θ_r. The virtual image behind the mirror at equal distance. Below: the half-height rule — a mirror half your height is enough to see your full body. Chalk on dark green board. Square 1:1.

---

## BB-NEW-313 — Spherical mirrors: the concave and the convex

**Subject:** physics | **Topic:** optics | **Concept:** spherical-mirrors; concave; convex; focus; centre-of-curvature | **Ground:** g0 | **Builds on:** [BB-NEW-311]

**Floor 0 (Idea):**
<p>Curve a mirror inward like a bowl — concave. Parallel rays from a distant source reflect and converge to a single point: the focus. This is why a concave mirror can start a fire — it concentrates sunlight. Curve a mirror outward like the back of a spoon — convex. Parallel rays reflect and diverge as if coming from a point BEHIND the mirror: the virtual focus. Concave mirrors converge light — they can form real images on a screen. Convex mirrors diverge light — they always form virtual, diminished images, giving a wider field of view.</p>

**Floor 1 (Concrete):**
<p><strong>Concave mirror:</strong> Hold it close to your face — you see a magnified, upright, virtual image (like a shaving mirror). Move it farther away — at some distance the image flips and becomes real, inverted, and can be projected onto a wall. At the focus, no image forms — the reflected rays are parallel. <strong>Convex mirror:</strong> Look at the back of a shiny spoon — your image is always upright, smaller than you, and covers a wider area than a plane mirror would. This is why convex mirrors are used as security mirrors in shops and as side-view mirrors on cars ("Objects in the mirror are closer than they appear" — the convex mirror makes them look smaller and therefore farther away). The key points: <strong>pole</strong> (P) — the centre of the mirror's surface. <strong>Centre of curvature</strong> (C) — the centre of the sphere the mirror is a part of. <strong>Focus</strong> (F) — the point where parallel rays converge (concave) or appear to diverge from (convex), located halfway between P and C: f = R/2, where R = radius of curvature.</p>

**Floor 2 (Definition):**
<p>A <strong>spherical mirror</strong> is a section of a reflective sphere. <strong>Concave mirror</strong> — reflecting surface is the inside of the sphere. Parallel rays converge to the <strong>principal focus</strong> F. f = R/2 (for small apertures, where the mirror is a small section of the sphere — the paraxial approximation). <strong>Convex mirror</strong> — reflecting surface is the outside. Parallel rays diverge; their extensions backward meet at the virtual focus F behind the mirror. f = −R/2 (using sign conventions). Key points on the principal axis: P (pole), F (focus, f from P), C (centre of curvature, 2f from P). The <strong>paraxial approximation</strong>: rays must be close to the principal axis and make small angles with it, otherwise spherical aberration occurs — rays far from the axis focus at a slightly different point.</p>

**Floor 3 (In action):**
<p>Concave mirrors concentrate energy: solar furnaces use large concave mirrors to focus sunlight to thousands of degrees. Reflecting telescopes (Newtonian, Cassegrain) use a concave primary mirror to collect and focus starlight — larger mirrors collect more light, and mirrors don't suffer from chromatic aberration (different colours focusing at different points) the way lenses do. All the world's largest telescopes are reflectors. Convex mirrors expand the field of view: security mirrors in shops, blind-spot mirrors on vehicles, and the passenger-side mirror on cars. Dentists use concave mirrors to magnify teeth (object inside the focus, magnified virtual image). Makeup mirrors are concave with the face inside the focus. The distinction between concave (converging, can form real images) and convex (diverging, always virtual diminished images) is the most fundamental split in mirror optics.</p>

**Image prompt:** A chalk drawing of a concave mirror (left) and a convex mirror (right). Concave: parallel rays converge to F. Key points P, F, C labelled with f = R/2. Convex: parallel rays diverge; dashed extensions meet at virtual F behind the mirror. Below: real-life examples — shaving mirror (concave, magnified when close), security mirror (convex, wide view). Chalk on dark green board. Square 1:1.

---

## BB-NEW-314 — The mirror formula: 1/f = 1/v + 1/u

**Subject:** physics | **Topic:** optics | **Concept:** mirror-formula; sign-conventions; Cartesian-convention; magnification | **Ground:** g1 | **Builds on:** [BB-NEW-313]

**Floor 0 (Idea):**
<p>You know the mirror's focal length f. You know where the object is (u, measured from the pole). The mirror formula tells you where the image forms (v): 1/f = 1/v + 1/u. One equation, valid for both concave and convex mirrors, for all object positions. The sign convention handles the differences. Master the sign convention, and the same equation works for everything.</p>

**Floor 1 (Concrete):**
<p>A concave mirror has f = +20 cm (positive by the Cartesian sign convention for concave mirrors — focus is in front, where real images form). An object is placed at u = −30 cm (negative — object is always on the same side as the incident light, which is the negative side in the Cartesian convention). Actually — let's use the standard Cartesian sign convention consistently: (1) Pole is origin. (2) Incident light travels left to right. (3) Distances measured in the direction of incident light are positive; opposite direction are negative. For the common Indian textbook convention: u is negative for real objects in front of the mirror, f is negative for concave (focus is in front, on the same side as the object). Let me use a consistent convention: f = −20 cm (concave, focus in front), u = −30 cm (object in front). 1/v = 1/f − 1/u = 1/(−20) − 1/(−30) = −1/20 + 1/30 = −3/60 + 2/60 = −1/60. v = −60 cm. Negative v means the image is in front of the mirror — it's a REAL image. Magnification m = −v/u = −(−60)/(−30) = −2. Negative magnification means inverted. |m| = 2 means the image is twice the object size. So: real, inverted, magnified 2×, located 60 cm in front of the mirror. Object between F and C — this is the classic projector configuration.</p>

**Floor 2 (Definition):**
<p>The <strong>mirror formula</strong>: <strong>1/f = 1/v + 1/u</strong>, where f = focal length, v = image distance from pole, u = object distance from pole. <strong>Sign convention</strong> (Cartesian): (1) Incident light travels left to right. (2) Pole is origin. (3) Distances measured in the direction of incident light are positive; opposite are negative. For mirrors: u is always negative (real objects are in front). f is negative for concave (focus in front), positive for convex (focus behind). v is negative for real images (in front), positive for virtual images (behind). <strong>Magnification</strong>: <strong>m = −v/u = h_i/h_o</strong> (h_i = image height, h_o = object height). m > 0: erect. m < 0: inverted. |m| > 1: magnified. |m| < 1: diminished.</p>

**Floor 3 (In action):**
<p>The mirror formula solves every spherical mirror problem. For a convex security mirror with f = +15 cm and a customer at u = −100 cm: 1/v = 1/15 − 1/(−100) = 1/15 + 1/100 = (20+3)/300 = 23/300 → v = +13.0 cm. Positive v → virtual image behind the mirror. m = −13/(−100) = 0.13 — upright, diminished to 13% of actual size. The customer looks small and far away — exactly the convex mirror effect. For a dentist's concave mirror: f = −5 cm, tooth at u = −3 cm (object inside the focus). 1/v = 1/(−5) − 1/(−3) = −1/5 + 1/3 = (−3+5)/15 = 2/15 → v = +7.5 cm. Positive v → virtual image behind the mirror. m = −7.5/(−3) = +2.5 — erect, magnified 2.5×. The dentist sees an enlarged upright image. Same formula, different object positions — the sign convention handles everything.</p>

**Image prompt:** A chalk drawing of the mirror formula 1/f = 1/v + 1/u in a box. Three worked examples in columns: (1) Concave — object beyond C → real, inverted, diminished. (2) Concave — object between F and C → real, inverted, magnified (projector). (3) Convex — object anywhere → virtual, erect, diminished. Each with ray diagram and numerical solution. Chalk on dark green board. Square 1:1.

---

## BB-NEW-315 — Mirror ray diagrams: the three rays that find every image

**Subject:** physics | **Topic:** optics | **Concept:** ray-diagrams; principal-rays; image-characteristics; mirror | **Ground:** g0 | **Builds on:** [BB-NEW-313, BB-NEW-314]

**Floor 0 (Idea):**
<p>You don't always need the formula to find an image. Two rays from the same point on the object, reflected according to the law of reflection, intersect (or appear to intersect) at the image point. There are three "special" rays that are easy to draw for spherical mirrors: (1) A ray parallel to the principal axis reflects through the focus. (2) A ray through the focus reflects parallel. (3) A ray through the centre of curvature reflects straight back along itself. Any two of these three rays locate the image. The ray diagram tells you instantly whether the image is real or virtual, magnified or diminished, erect or inverted.</p>

**Floor 1 (Concrete):**
<p>For a concave mirror (f = 20 cm), object at u = 50 cm (beyond C, since C = 40 cm). Ray 1: from the object's tip, travel parallel to the principal axis, hit the mirror, reflect through F (at 20 cm). Ray 2: from the object's tip, pass through F, hit the mirror, reflect parallel. Ray 3: from the object's tip, pass through C (at 40 cm), hit the mirror, reflect straight back. Rays 1, 2, and 3 all intersect at a point between F and C — that's the image. It's real (rays actually converge there), inverted (below the axis), and diminished (smaller than the object). Formula check: 1/v = 1/f − 1/u → the image is at v ≈ 33 cm, magnification ≈ −0.67. The diagram and formula agree. Object between F and pole: the reflected rays diverge — they never meet in front of the mirror. But their extensions backward meet behind the mirror. The image is virtual, erect, and magnified. This is the makeup mirror configuration. For a convex mirror: no matter where the object is, the reflected rays always diverge. Their extensions backward always form a virtual, erect, diminished image behind the mirror. <strong>Convex mirrors always produce virtual, erect, diminished images. Always.</strong> There is no object position that produces a real image from a convex mirror.</p>

**Floor 2 (Definition):**
<p>Three <strong>principal rays</strong> for spherical mirror ray diagrams: (1) <strong>Parallel ray</strong> — incident parallel to the principal axis, reflects through (or appears to come from) the focus F. (2) <strong>Focal ray</strong> — incident through (or directed toward) F, reflects parallel to the principal axis. (3) <strong>Radial ray</strong> — incident through (or directed toward) C, reflects back along itself. Use any two rays; the third is for confirmation. For a virtual image (behind the mirror), extend the reflected rays backward as dashed lines — they meet behind the mirror. A ray diagram instantly reveals the <strong>nature</strong> (real/virtual), <strong>orientation</strong> (erect/inverted), <strong>size</strong> (magnified/same/diminished), and <strong>position</strong> (relative to F and C) of the image.</p>

**Floor 3 (In action):**
<p>Ray diagrams are the qualitative counterpart to the mirror formula. Before you plug numbers into 1/f = 1/v + 1/u, sketch a quick ray diagram. It tells you what SIGN to expect for v and m — catching sign errors before they happen. If the formula gives a negative v (real image) but your diagram shows a virtual image, something's wrong. The six canonical cases for concave mirrors — object at infinity, beyond C, at C, between C and F, at F, inside F — each produce a characteristic image, and drawing them once embeds the pattern. For convex mirrors, there's only one case — virtual, erect, diminished — which is why convex mirrors are so predictable. The three-ray method works for any mirror, any object position, every time. It's the visual vocabulary of geometric optics.</p>

**Image prompt:** A chalk drawing of the six object positions for a concave mirror, each with its ray diagram and image description: beyond C (real, inverted, diminished), at C (real, inverted, same size), between C and F (real, inverted, magnified), at F (no image — rays parallel), inside F (virtual, erect, magnified). One diagram for convex mirror (always virtual, erect, diminished). Chalk on dark green board. Square 1:1.

---

# Part 3 — Refraction deep dive

---

## BB-NEW-316 — What is refraction? Why light bends

**Subject:** physics | **Topic:** optics | **Concept:** refraction; bending; optical-density; speed-change | **Ground:** g0 | **Builds on:** [BB-NEW-310]

**Floor 0 (Idea):**
<p>A straw in a glass of water looks bent at the surface. A swimming pool looks shallower than it is. These are refraction — light changing direction when it crosses from one medium into another. The cause: light travels at different speeds in different media. In vacuum, 3 × 10⁸ m/s. In water, about 2.25 × 10⁸ m/s. In glass, about 2 × 10⁸ m/s. When a light ray enters a slower medium at an angle, the part of the wavefront that enters first slows down first, turning the whole ray. It's like a car driving from a paved road onto sand at an angle — the wheel that hits the sand first slows, pivoting the car.</p>

**Floor 1 (Concrete):**
<p>Light enters water from air at an angle of 30° to the normal. It bends TOWARD the normal — the angle in water is about 22°. Going from water into air at 30°, it bends AWAY from the normal — the angle in air is about 41°. Going from a faster medium to a slower one → bends TOWARD the normal. Going from a slower medium to a faster one → bends AWAY from the normal. When light enters perpendicular to the surface (θ_i = 0°), it does NOT bend — it slows down but continues straight. The bending is maximum at glancing angles and zero at normal incidence. And there's a critical angle: when going from a slower medium (water, n=1.33) to a faster one (air, n=1.00) at a steep enough angle, the light doesn't exit at all — it reflects entirely back into the water. This is total internal reflection — the topic of BB-NEW-319.</p>

**Floor 2 (Definition):**
<p><strong>Refraction</strong> is the change in direction of a light ray when it passes from one transparent medium to another, caused by the change in the speed of light. <strong>Optically denser</strong> medium — higher refractive index n, slower light speed. Light bends <strong>toward the normal</strong> when entering a denser medium. Bends <strong>away from the normal</strong> when entering a rarer (less dense) medium. <strong>Normal incidence</strong> (θ_i = 0°) → no bending, just speed change. The refractive index n = c/v, where c = speed in vacuum, v = speed in medium. n_air ≈ 1.0003, n_water ≈ 1.33, n_glass ≈ 1.5–1.9, n_diamond ≈ 2.42. The higher n is, the more the light slows down and the more it bends. Diamond's high n (2.42) combined with its dispersion is what gives it exceptional brilliance — light enters, bends sharply, reflects internally many times, and emerges in different directions and colours.</p>

**Floor 3 (In action):**
<p>Refraction is why your legs look short and stubby in a swimming pool — light from your feet bends away from the normal as it exits the water, making them appear higher than they are (apparent depth < real depth). It's why a fish appears closer to the surface than it is — spearfishers must aim BELOW the apparent position. It's why a lens can focus light — the curved surface means different parts of the beam hit at different angles and are bent by different amounts, all converging to a point. It's why the sky is blue and sunsets are red — shorter wavelengths (blue) are scattered more by the atmosphere (Rayleigh scattering, not refraction per se, but the two often travel together in optics). Refraction is the physical basis of every lens, every prism, every optical fibre, and every rainbow.</p>

**Image prompt:** A chalk drawing of a straw in a glass of water — the straw appears bent at the water surface. A ray diagram beside it: ray from air to water, bending toward the normal. Below: the car-on-sand analogy — a car entering sand at an angle, the wheel hitting first slows, pivoting the car. "Light slows in denser media → bends toward the normal." Chalk on dark green board. Square 1:1.

---

## BB-NEW-317 — Snell's Law: the exact relationship, n₁ sin θ₁ = n₂ sin θ₂

**Subject:** physics | **Topic:** optics | **Concept:** Snells-law; refractive-index; sines; Willebrord-Snell | **Ground:** g1 | **Builds on:** [BB-NEW-316]

**Floor 0 (Idea):**
<p>The law of reflection is θ_i = θ_r. The law of refraction is n₁ sin θ₁ = n₂ sin θ₂ — Snell's Law. It tells you exactly how much the light bends, given the two refractive indices and the incident angle. If you know n₁, n₂, and θ₁, you can calculate θ₂ precisely. The sine function is not arbitrary — it emerges from the geometry of the wavefront as it encounters the boundary. Snell's law is tested every time you look through a window, a lens, or a glass of water, and it has never been observed to fail.</p>

**Floor 1 (Concrete):**
<p>Light travels from air (n₁ = 1.00) into water (n₂ = 1.33) at θ₁ = 45°. Snell: 1.00 sin 45° = 1.33 sin θ₂. sin 45° = √2/2 ≈ 0.7071. 0.7071 = 1.33 sin θ₂ → sin θ₂ = 0.5317 → θ₂ = sin⁻¹(0.5317) ≈ 32.1°. The ray bends toward the normal by about 13°. Now reverse: light goes from water (n₁ = 1.33) to air (n₂ = 1.00) at θ₁ = 32.1°. 1.33 sin 32.1° = 1.00 sin θ₂. 1.33 × 0.5317 = 0.7071 = sin θ₂ → θ₂ = 45° — exactly the reverse. The path of light is reversible. If the ray in water arrives at θ₁ = 50°: 1.33 sin 50° = 1.33 × 0.7660 = 1.019. This exceeds 1.00, so sin θ₂ > 1 — impossible. There is no transmitted ray at this angle. The light is totally internally reflected. This happens when θ₁ exceeds the critical angle: sin θ_c = n₂/n₁ = 1.00/1.33 = 0.7519 → θ_c ≈ 48.8°. At 50°, the light doesn't exit the water — it reflects. This is total internal reflection. TIR is not a separate law — it falls directly out of Snell's law when sin θ₂ would exceed 1.</p>

**Floor 2 (Definition):**
<p><strong>Snell's Law</strong>: <strong>n₁ sin θ₁ = n₂ sin θ₂</strong>, where n₁ and n₂ are the refractive indices of the first and second media, and θ₁ and θ₂ are the angles the ray makes with the normal in each medium. The law can also be written as <strong>sin θ₁ / sin θ₂ = n₂ / n₁ = v₁ / v₂</strong> — the ratio of sines equals the inverse ratio of refractive indices, which equals the ratio of light speeds. <strong>Refractive index</strong> n of a medium is defined as n = c/v (absolute RI) or n₂₁ = v₁/v₂ = n₂/n₁ (relative RI of medium 2 with respect to medium 1). Snell's law follows from Fermat's principle (light takes the path of least time) or Huygens' principle (each point on a wavefront acts as a source of secondary wavelets). It was discovered experimentally by Willebrord Snellius in 1621.</p>

**Floor 3 (In action):**
<p>Snell's law is the single most important equation in optics — used literally millions of times in the design of every lens, every optical fibre, every prism, and every camera. In ophthalmology, it predicts how light is refracted by the cornea and lens — and how corrective lenses compensate for errors. In oceanography, it explains why underwater objects appear distorted. In gemmology, a gem's refractive index is its primary identifier — measured with a refractometer by finding the critical angle of a known medium in contact with the gem. Snell's law governs every boundary crossing in every optical system. Master it, and you understand why and how much light bends, every time.</p>

**Image prompt:** A chalk drawing of Snell's law: n₁ sin θ₁ = n₂ sin θ₂ in a box. A ray crossing from air to water — angles θ₁ and θ₂ labelled from the normal. The worked example: air→water at 45° → θ₂=32.1°. Reverse: water→air at 32.1° → θ₂=45°. The critical angle case: water→air at 50° → sin θ₂>1 → TIR. Chalk on dark green board. Square 1:1.

---

## BB-NEW-318 — Refraction through a slab and apparent depth

**Subject:** physics | **Topic:** optics | **Concept:** refraction-slab; lateral-shift; apparent-depth; real-vs-apparent | **Ground:** g0 | **Builds on:** [BB-NEW-317]

**Floor 0 (Idea):**
<p>Look through a thick glass window at an angle — objects appear slightly shifted sideways. This is lateral displacement. Look straight down into a swimming pool — the bottom looks closer than it is. This is apparent depth. Both are consequences of Snell's law applied twice (entering and exiting). For a parallel-sided slab, the emergent ray is parallel to the incident ray — just shifted. For apparent depth, the ratio is real depth / apparent depth = n (the refractive index of the denser medium relative to air). Water (n=1.33) makes a 2 m deep pool look 1.5 m deep.</p>

**Floor 1 (Concrete):**
<p>A glass slab of thickness t = 3 cm, n = 1.5. A ray enters at θ₁ = 30° from air. At the first surface: 1.00 sin 30° = 1.5 sin θ₂ → 0.5 = 1.5 sin θ₂ → sin θ₂ = 0.3333 → θ₂ = 19.5°. Inside the glass, the ray travels at 19.5° from the normal. At the second surface (glass to air): n₁ sin θ₁ = n₂ sin θ₂ → 1.5 sin 19.5° = 1.00 sin θ₃ → 1.5 × 0.3333 = 0.5 = sin θ₃ → θ₃ = 30°. The emergent ray is at 30° — parallel to the incident ray. Lateral shift d = t sin(θ₁−θ₂)/cos θ₂ = 3 × sin(10.5°)/cos(19.5°) = 3 × 0.1822/0.9426 ≈ 0.58 cm. The ray exits 0.58 cm to the side of where it would have exited without the slab. For apparent depth: a fish at actual depth 1.0 m in water (n=1.33) appears at 1.0/1.33 ≈ 0.75 m. The formula: apparent depth = real depth / n (for viewing from directly above, small angles). At larger viewing angles, the apparent depth is even less — objects appear even closer to the surface.</p>

**Floor 2 (Definition):**
<p>For a <strong>plane-parallel slab</strong> of thickness t and refractive index n: (1) The emergent ray is <strong>parallel</strong> to the incident ray. (2) <strong>Lateral shift</strong> d = t sin(θ₁−θ₂)/cos θ₂. (3) At normal incidence (θ₁=0°), d = 0 — no shift. For <strong>apparent depth</strong> when viewing from a rarer medium into a denser one: <strong>apparent depth = real depth / n</strong> (for near-normal viewing). The object appears closer to the surface than it actually is. For a denser medium viewed from rarer: the apparent shift is real depth × (1−1/n). For multiple layers of different n, the apparent shift is t₁(1−1/n₁) + t₂(1−1/n₂) + ...</p>

**Floor 3 (In action):**
<p>Apparent depth is why swimming pools have "NO DIVING" signs in the shallow end — 1.5 m of water looks like about 1.1 m, and a dive into what looks like adequate depth can result in spinal injury. It's why a straw in a drink looks bent — the submerged portion appears at a different apparent depth than the part in air. It's why microscope slides with cover slips have the specimen appear slightly displaced — the cover slip glass (n≈1.5) shifts the apparent position. In gemmology, the apparent depth of inclusions inside a gemstone is used to estimate the stone's refractive index. The lateral shift through a slab is used in beam displacers in optics labs — a precise glass plate shifts a laser beam by a known amount without changing its direction, useful for interferometry and alignment.</p>

**Image prompt:** A chalk drawing of a ray passing through a glass slab: incident at θ₁, refracts to θ₂ (toward normal), then refracts back to θ₁ (emergent ray parallel to incident). Lateral shift d labelled. Below: apparent depth — a fish at real depth 1 m, apparent depth 0.75 m, with ray diagram showing why (rays bend away from normal exiting water, brain extrapolates straight back). Chalk on dark green board. Square 1:1.

---

## BB-NEW-319 — Total internal reflection: when light can't escape

**Subject:** physics | **Topic:** optics | **Concept:** total-internal-reflection; critical-angle; θ_c=sin⁻¹(n₂/n₁); TIR | **Ground:** g0 | **Builds on:** [BB-NEW-317]

**Floor 0 (Idea):**
<p>Shine a laser from underwater toward the surface. At a shallow angle, the beam exits into the air, bending away from the normal. Increase the angle. At some point — the critical angle — the refracted beam skims along the surface at exactly 90° to the normal. Increase the angle just slightly more, and the beam doesn't exit at all. It reflects entirely back into the water — as if the surface were a perfect mirror. This is total internal reflection. It occurs when light tries to go from a denser medium to a rarer one at an angle exceeding the critical angle. No light is transmitted. 100% is reflected. It's the most efficient reflection in nature.</p>

**Floor 1 (Concrete):**
<p>Water to air: n_water = 1.33, n_air = 1.00. Critical angle: sin θ_c = n_air/n_water = 1.00/1.33 = 0.7519. θ_c = sin⁻¹(0.7519) ≈ 48.8°. At 48.8°, the ray exits exactly along the surface. At 50°, the ray is totally internally reflected. At 60°, it reflects — and keeps reflecting. Divers looking up see a circular "window" above them (Snell's window) — everything within ~49° of the vertical lets in light from the sky; beyond that, the surface is a mirror reflecting the underwater world. Glass to air: n_glass = 1.5. θ_c = sin⁻¹(1.0/1.5) = sin⁻¹(0.6667) ≈ 41.8°. Diamond to air: n_diamond = 2.42. θ_c = sin⁻¹(1.0/2.42) ≈ 24.4°. Diamond's exceptionally small critical angle means light entering a diamond is likely to hit a facet at > 24.4° and be internally reflected many times before escaping — this is why diamonds sparkle. The light bounces around inside, and when it finally exits, it does so at different angles depending on its path, creating the brilliant display.</p>

**Floor 2 (Definition):**
<p><strong>Total internal reflection (TIR)</strong> occurs when light travels from a medium of higher refractive index n₁ to one of lower index n₂ (n₁ > n₂) at an angle of incidence greater than the <strong>critical angle</strong> θ_c. The critical angle is given by <strong>sin θ_c = n₂ / n₁</strong> (with n₁ > n₂). TIR conditions: (1) Light must go from denser to rarer medium. (2) θ_i must exceed θ_c. When θ_i = θ_c, the refracted ray grazes the surface at 90°. When θ_i > θ_c, there is no transmitted ray — 100% reflection. TIR obeys the law of reflection (θ_i = θ_r). Unlike metallic reflection (which always absorbs some light), TIR is lossless in an ideal transparent medium.</p>

**Floor 3 (In action):**
<p>TIR is the principle behind optical fibres — the backbone of the internet. A hair-thin glass fibre has a core (high n) surrounded by cladding (lower n). Light launched into the core at a shallow enough angle strikes the core-cladding boundary at > θ_c and is totally internally reflected, over and over, travelling kilometres with minimal loss. A single fibre can carry terabytes of data as modulated light pulses. TIR is also how prismatic binoculars work — roof prisms use TIR to fold the light path, making the binoculars compact. Diamond cutters design facets so that light entering the top of the stone undergoes multiple TIRs, bouncing around inside and emerging through the top with maximum brilliance. Retroreflectors use TIR inside glass beads (road marking paint, projection screens) to return light to its source. TIR is the only way to achieve near-perfect reflection without metal mirrors — and it's the reason fibre optics can transmit light across oceans without amplifiers every few hundred metres.</p>

**Image prompt:** A chalk drawing of three rays from water to air: (1) θ < θ_c — ray exits, bending away from normal. (2) θ = θ_c — ray grazes the surface. (3) θ > θ_c — ray totally internally reflected. The critical angle formula sin θ_c = n₂/n₁. Below: an optical fibre with the core-cladding structure — ray bouncing via TIR along the core. Chalk on dark green board. Square 1:1.

---

## BB-NEW-320 — Optical fibres and prisms: TIR in practice

**Subject:** physics | **Topic:** optics | **Concept:** optical-fibre; prism; TIR-applications; acceptance-angle | **Ground:** g0 | **Builds on:** [BB-NEW-319]

**Floor 0 (Idea):**
<p>Total internal reflection is not just a lab curiosity — it's the operating principle behind two of the most important optical technologies: optical fibres (communications) and prisms (image manipulation). An optical fibre traps light in a glass core using TIR at the core-cladding boundary. A right-angled prism uses TIR at 45° to reflect light with 100% efficiency, replacing mirrors in binoculars, periscopes, and SLR cameras. Both exploit the same physics: n₁ > n₂, θ_i > θ_c, and the light stays in.</p>

**Floor 1 (Concrete):**
<p><strong>Optical fibre:</strong> A core (n₁ ≈ 1.48) surrounded by cladding (n₂ ≈ 1.46). The critical angle at the core-cladding interface: sin θ_c = 1.46/1.48 = 0.9865 → θ_c ≈ 80.6°. This means light must strike the boundary at a grazing angle (>80.6° from the normal) to stay trapped. This is achieved by launching light into the fibre within its <strong>acceptance angle</strong> (or numerical aperture NA = √(n₁²−n₂²)). For this fibre, NA ≈ √(1.48²−1.46²) ≈ 0.24. The maximum angle (in air) at which light can enter and still be guided: sin θ_a = NA = 0.24 → θ_a ≈ 14°. Any light entering within a 14° cone stays trapped. <strong>Prism:</strong> A 45°-45°-90° glass prism (n=1.5). Light enters perpendicular to one short face, hits the hypotenuse at 45° internally. θ_c for glass-air ≈ 41.8°. 45° > 41.8° → TIR. The light reflects through 90° (or 180° depending on which face it enters). A Porro prism (used in binoculars) uses two 45°-45°-90° prisms oriented at 90° to each other to flip an inverted image right-side-up AND correct the left-right reversal — four TIRs total.</p>

**Floor 2 (Definition):**
<p>An <strong>optical fibre</strong> consists of a cylindrical core (higher n) surrounded by cladding (lower n). Light is guided by repeated TIR at the core-cladding boundary. The <strong>acceptance angle</strong> θ_a is the maximum angle (measured from the fibre axis in air) at which light can enter and still be guided: sin θ_a = NA = √(n_core² − n_clad²). <strong>Step-index fibre</strong>: uniform core n. <strong>Graded-index fibre</strong>: core n decreases parabolically from centre to edge, causing rays to curve rather than zigzag — reducing modal dispersion. <strong>Prism reflectors</strong>: use TIR at > θ_c to reflect light with near 100% efficiency, unlike metallic mirrors which absorb 5–15% per reflection. Common configurations: 90° deviation, 180° deviation.</p>

**Floor 3 (In action):**
<p>Optical fibres carry >99% of intercontinental internet traffic. A transatlantic fibre cable (about the diameter of a human hair, protected by layers of armour) carries laser pulses that travel ~5,000 km with amplification every ~80 km. The low loss of modern fibres (~0.2 dB/km — meaning half the light remains after 15 km) is an extraordinary materials achievement. Prism-based TIR is used in SLR camera viewfinders (the pentaprism flips the lens image right-side up), in binoculars, in rifle scopes, and in the reflectors on the Moon left by Apollo missions (corner-cube prisms that return light exactly to its source). TIR-based devices have no moving parts, no metal coatings to corrode, and theoretically infinite lifetime — the physics of the critical angle never wears out.</p>

**Image prompt:** A chalk drawing of an optical fibre: core (n₁) and cladding (n₂) with a ray zigzagging via TIR. The acceptance cone shown at the entrance. Below: a 45°-45°-90° prism with a ray entering one face, reflecting via TIR at the hypotenuse (45° > θ_c), and exiting the other face — 90° deviation. Chalk on dark green board. Square 1:1.

---

## BB-NEW-321 — Dispersion: white light isn't one colour

**Subject:** physics | **Topic:** optics | **Concept:** dispersion; prism-spectrum; rainbow; wavelength-dependence-of-n | **Ground:** g0 | **Builds on:** [BB-NEW-317]

**Floor 0 (Idea):**
<p>White light is a mixture of all visible colours. The refractive index n of a material is not the same for all colours — it's slightly higher for violet (shorter wavelength) and slightly lower for red (longer wavelength). So when white light enters a prism, violet bends more than red. The colours spread out into a spectrum — red, orange, yellow, green, blue, indigo, violet. This is dispersion. It's why a prism produces a rainbow from sunlight, and it's also why simple lenses suffer from chromatic aberration — different colours focus at slightly different points.</p>

**Floor 1 (Concrete):**
<p>A beam of white light strikes a triangular glass prism (n_red ≈ 1.51, n_violet ≈ 1.53). The angle of deviation (total bending) depends on n. Violet, with higher n, deviates more. For a 60° equilateral prism, the minimum deviation angle δ_m is given by n = sin((A+δ_m)/2) / sin(A/2). With A=60°: for red (n=1.51): δ_m ≈ 37.6°. For violet (n=1.53): δ_m ≈ 39.0°. The angular spread is about 1.4° — small but clearly visible on a screen a metre away. The same physics produces rainbows: sunlight enters a water droplet, refracts (dispersion separates colours), reflects off the back of the droplet (TIR), and refracts again on exit. Each colour exits at a slightly different angle — red at ~42° from the incoming direction, violet at ~40°. Millions of droplets at the right angles form the arc. A secondary rainbow (fainter, colours reversed) comes from two internal reflections inside the droplet — red at ~50°, violet at ~53°.</p>

**Floor 2 (Definition):**
<p><strong>Dispersion</strong> is the variation of refractive index n with wavelength λ. Generally, n decreases as λ increases (normal dispersion) — violet light is slowed more and bent more. <strong>Angular dispersion</strong> = dθ/dλ — the spread of emerging light with wavelength. For a prism at minimum deviation, angular dispersion = (dδ_m/dn)(dn/dλ). <strong>Dispersive power</strong> ω = (n_v − n_r)/(n_y − 1), where n_v, n_r, n_y are indices for violet, red, and yellow. <strong>Chromatic aberration</strong> in lenses is a consequence of dispersion — different colours focus at different distances, producing coloured fringes. Corrected by combining converging and diverging lenses of different glass types (achromatic doublet).</p>

**Floor 3 (In action):**
<p>Dispersion is both a problem and a tool. In lenses, it's a problem — chromatic aberration degrades images unless corrected (expensive camera lenses use multiple elements of different glasses). In spectroscopy, it's the tool — a prism or diffraction grating spreads light into its spectrum, and the pattern of bright and dark lines identifies the chemical composition of stars, the purity of pharmaceuticals, and the presence of pollutants. Newton's famous 1666 experiment — passing sunlight through a prism and then recombining the spectrum with a second prism to form white light — proved that white light is a mixture, not a pure substance modified by the prism. Dispersion is why gemstones have "fire" — the coloured flashes as a diamond disperses white light into its spectral colours. The higher the dispersion, the more colourful flashes. Diamond has moderate dispersion; moissanite (synthetic) has even higher dispersion and shows more fire — which is how jewellers distinguish them.</p>

**Image prompt:** A chalk drawing of a prism with a beam of white light entering, spreading into a spectrum (ROYGBIV) exiting. The deviation angles for red and violet labelled. Below: a raindrop with the ray path — refraction, internal reflection, refraction — with red and violet rays separating. The 42° rainbow angle shown. Chalk on dark green board. Square 1:1.

---

# Part 4 — Lenses and applications

---

## BB-NEW-322 — Convex and concave lenses: converging and diverging light

**Subject:** physics | **Topic:** optics | **Concept:** lenses; converging; diverging; focus; optical-centre | **Ground:** g0 | **Builds on:** [BB-NEW-317, BB-NEW-313]

**Floor 0 (Idea):**
<p>A lens is a piece of transparent material (usually glass or plastic) with at least one curved surface, designed to bend light by refraction. A convex lens is thicker in the middle — parallel rays entering it converge to a focus. A concave lens is thinner in the middle — parallel rays diverge as if coming from a virtual focus. Lenses are the optical analogue of mirrors, but they work by refraction rather than reflection, and light passes THROUGH them rather than bouncing off.</p>

**Floor 1 (Concrete):**
<p>A magnifying glass is a convex lens. Hold it close to a page — the text appears larger. The lens is forming a virtual, erect, magnified image (object inside the focal point). Move the lens farther away and the image flips — real, inverted. A projector uses a convex lens with the object (the slide or LCD panel) between F and 2F, producing a real, inverted, magnified image on the screen. A camera lens is a convex (actually compound) lens with the object beyond 2F, forming a real, inverted, diminished image on the sensor. Concave lenses always produce virtual, erect, diminished images — just like convex mirrors. Myopia (nearsightedness) is corrected with concave lenses — they diverge light slightly before it enters the eye, pushing the image back onto the retina. Hyperopia (farsightedness) is corrected with convex lenses — they converge light, pulling the image forward. The lens formula is the same as the mirror formula but with different sign conventions: 1/f = 1/v − 1/u. Actually, in the Cartesian convention with proper signs, both mirror and lens formulas reduce to the same form. The key: lenses have two focal points (one on each side), both at distance f from the optical centre. Light can pass through a lens from either side, and the lens behaves symmetrically.</p>

**Floor 2 (Definition):**
<p>A <strong>lens</strong> is a transparent refracting medium bounded by two curved surfaces (or one curved and one plane). <strong>Convex lens</strong> (converging) — thicker at centre. Parallel rays converge to the <strong>principal focus</strong> F. f > 0 (real focus). <strong>Concave lens</strong> (diverging) — thinner at centre. Parallel rays diverge; extensions meet at virtual focus. f < 0. Key points: <strong>optical centre</strong> O (a ray through O passes undeviated), principal axis, F and 2F on both sides. <strong>Lens maker's formula</strong>: 1/f = (n−1)(1/R₁ − 1/R₂), where R₁, R₂ are radii of curvature (positive if centre of curvature is on the outgoing-light side). <strong>Power</strong> of a lens: P = 1/f (in dioptres, D, when f is in metres). P > 0 for convex, P < 0 for concave.</p>

**Floor 3 (In action):**
<p>Lenses are the most widespread optical devices. Every camera, from a phone to a cinema rig, uses a compound lens system. Every pair of spectacles is a lens (or lenses) designed to compensate for the eye's focal errors. Every microscope and telescope is a lens (and mirror) system. Contact lenses float on the tear film of the eye — a convex or concave lens just millimetres from the cornea. The Fresnel lens (used in lighthouses and overhead projectors) collapses a thick convex lens into concentric rings, reducing weight and thickness while maintaining focusing power. Intraocular lenses — implanted after cataract surgery to replace the eye's natural lens — are a medical miracle of applied optics. The lens formula 1/f = 1/v − 1/u, with proper sign conventions, predicts the image position for every one of these devices.</p>

**Image prompt:** A chalk drawing of a convex lens (left) and concave lens (right). Convex: parallel rays converge to F on the far side. Key points O, F (both sides), 2F (both sides) labelled. Concave: parallel rays diverge; dashed extensions meet at virtual F on the incident side. Below: the human eye with myopia (corrected by concave lens) and hyperopia (corrected by convex lens). Chalk on dark green board. Square 1:1.

---

## BB-NEW-323 — The lens formula and magnification

**Subject:** physics | **Topic:** optics | **Concept:** lens-formula; 1/f=1/v−1/u; magnification; power; applications | **Ground:** g1 | **Builds on:** [BB-NEW-322, BB-NEW-314]

**Floor 0 (Idea):**
<p>The lens formula is 1/f = 1/v − 1/u (using the Cartesian sign convention). It looks similar to the mirror formula (1/f = 1/v + 1/u) but the minus sign before 1/u reflects a different convention — or, if using the same consistent convention for both, they are effectively the same equation. The lens formula, like the mirror formula, is a one-size-fits-all relationship. Given f and u, it gives v — the image position. Magnification m = v/u tells you the size and orientation. The sign conventions do the heavy lifting — they automatically handle real/virtual, erect/inverted.</p>

**Floor 1 (Concrete):**
<p>A convex lens has f = +15 cm. Object at u = −20 cm. Using the Cartesian convention (light travels left to right, origin at lens, object to left → u is negative for real objects, focus to right → f is positive for convex lenses): 1/v = 1/f + 1/u = 1/15 + 1/(−20) = 1/15 − 1/20 = (4−3)/60 = 1/60. v = +60 cm. Positive v: image is real, on the opposite side of the lens from the object. Magnification m = v/u = 60/(−20) = −3. Negative m: inverted. |m| = 3: magnified 3×. This is the projector configuration — object between F and 2F. Object at u = −10 cm (inside F): 1/v = 1/15 + 1/(−10) = 1/15 − 1/10 = (2−3)/30 = −1/30. v = −30 cm. Negative v: image is virtual, on the SAME side as the object. m = (−30)/(−10) = +3. Positive m: erect. This is the magnifying glass — object inside F, image virtual, erect, magnified. A concave lens (f = −15 cm) with object at u = −30 cm: 1/v = 1/(−15) + 1/(−30) = −1/15 − 1/30 = (−2−1)/30 = −3/30. v = −10 cm. Negative v: virtual, on same side as object. m = (−10)/(−30) = +1/3. Erect, diminished to 1/3 size. Concave lenses always produce virtual, erect, diminished images. Always. The sign convention encodes this: f is negative for concave, so v is always negative for real objects, and |v| < |u| always.</p>

**Floor 2 (Definition):**
<p>The <strong>lens formula</strong>: <strong>1/f = 1/v − 1/u</strong> (Cartesian sign convention — but be aware that many textbooks, especially in India, use 1/f = 1/v − 1/u with their own sign convention, which is equivalent). Using the standard Cartesian convention: (1) Light travels left to right. (2) Origin at the optical centre. (3) Distances in the direction of light are positive; opposite are negative. For lenses: u is negative for real objects (left of lens). f is positive for convex, negative for concave. v is positive for real images (on the right/transmitted side), negative for virtual images (on the left/incident side). <strong>Magnification</strong>: <strong>m = h_i/h_o = v/u</strong>. m > 0: erect. m < 0: inverted. |m| > 1: magnified. <strong>Power</strong>: P = 1/f in dioptres (f in metres). For a combination of thin lenses in contact: 1/F = 1/f₁ + 1/f₂.</p>

**Floor 3 (In action):**
<p>An optometrist writes a prescription: "OD: −2.00 D, OS: −1.50 D." These are lens powers in dioptres. OD (right eye): P = −2.00 D → f = 1/P = −0.5 m = −50 cm. This is a concave lens — the patient is myopic. OS (left eye): P = −1.50 D → f ≈ −66.7 cm — also concave, less severe myopia. A reading glasses prescription of +2.50 D means f = 1/2.5 = 0.4 m = 40 cm convex lens — hyperopia correction. A camera with a 50 mm lens has P = 1/0.05 = +20 D. For a distant object (u ≈ ∞), 1/v = 1/f → v = f = 50 mm — the sensor is 50 mm behind the lens. For an object at 1 m: 1/v = 1/0.05 − 1/(−1.0) = 20 + 1 = 21 → v ≈ 47.6 mm. The lens must move 2.4 mm further from the sensor to focus — this is focusing. The lens formula governs every adjustable-focus optical system.</p>

**Image prompt:** A chalk drawing of the lens formula with three worked examples in columns: (1) Convex — object beyond 2F → real, inverted, diminished (camera). (2) Convex — object inside F → virtual, erect, magnified (magnifying glass). (3) Concave — object anywhere → virtual, erect, diminished. Each with ray diagram and sign-convention calculation. Chalk on dark green board. Square 1:1.

---

## BB-NEW-324 — The human eye and optical instruments

**Subject:** physics | **Topic:** optics | **Concept:** human-eye; accommodation; vision-defects; microscope; telescope | **Ground:** g0 | **Builds on:** [BB-NEW-322, BB-NEW-323]

**Floor 0 (Idea):**
<p>The human eye is a self-adjusting convex lens system. The cornea provides most of the focusing power (~43 D). The crystalline lens provides the rest (~15–20 D) and, crucially, can CHANGE its focal length by changing shape — this is accommodation. Muscles pull the lens flatter for distant objects and let it bulge for near objects. The image is formed on the retina — a screen of photoreceptors. The near point (closest comfortable focus) is ~25 cm for a young adult, receding with age (presbyopia). The far point is infinity for a normal eye. Every optical instrument — microscope, telescope, camera — is designed to work with or extend the capabilities of the human eye.</p>

**Floor 1 (Concrete):**
<p><strong>Myopia</strong> (nearsighted): the eyeball is too long or the cornea too curved. Distant objects focus in front of the retina. Corrected with a concave lens (negative power) that diverges light slightly, pushing the focus back. Far point of a −3 D myope: 1/f = 1/v − 1/u → with the corrective lens, the far point object at infinity (u = ∞) forms a virtual image at the eye's actual far point. 1/(−0.333) = 0 − 1/u_fp → u_fp = −33.3 cm. Without glasses, this person sees clearly only within 33 cm. A −3 D lens restores distance vision. <strong>Hyperopia</strong> (farsighted): eyeball too short, near objects focus behind the retina. Corrected with convex lens. <strong>Simple microscope</strong> (magnifying glass): a convex lens of short focal length. Object at the near point of the eye, lens forms an enlarged virtual image at 25 cm. Angular magnification M = 1 + D/f, where D = 25 cm (near point). For f = 5 cm: M = 1 + 25/5 = 6×. <strong>Compound microscope</strong>: objective lens (short f) forms a real, magnified image inside the focal point of the eyepiece (longer f), which further magnifies it. Total M = M_obj × M_eye ≈ (L/f_obj) × (D/f_eye). <strong>Astronomical telescope</strong> (refracting): large objective lens (long f) collects light and forms a real image at its focus; eyepiece (short f) magnifies. M = f_obj / f_eye. A 1 m objective and 2 cm eyepiece give M = 50×.</p>

**Floor 2 (Definition):**
<p>The <strong>human eye</strong>: cornea (fixed ~43 D) + crystalline lens (variable, accommodation). The image is formed on the light-sensitive <strong>retina</strong>. The <strong>near point</strong> is ~25 cm (young adult), <strong>far point</strong> is ∞ (normal). <strong>Visual angle</strong> subtended by an object determines perceived size. <strong>Angular magnification</strong> M = θ_image/θ_object — the ratio of angles subtended at the eye with and without the instrument. For a <strong>simple microscope</strong>: M = 1 + D/f (image at near point) or M = D/f (image at infinity). For a <strong>compound microscope</strong>: M ≈ (L × D)/(f_obj × f_eye). For a <strong>refracting telescope</strong>: M = f_obj / f_eye.</p>

**Floor 3 (In action):**
<p>The eye's accommodation range is extraordinary — from infinity to ~7 cm (young child) to ~25 cm (young adult) to ~100 cm (60-year-old with presbyopia). When the lens loses flexibility with age, reading glasses (+dioptre convex lenses) restore the near point. LASIK surgery reshapes the cornea with a laser to correct myopia, hyperopia, and astigmatism — permanently changing the eye's effective focal length. The compound microscope opened the cellular world; the telescope opened the cosmos. Galileo's telescope (1609) had M ≈ 20× and revealed Jupiter's moons, lunar craters, and the phases of Venus — enough to overturn the geocentric model. Modern optical telescopes have M limited not by optics but by atmospheric turbulence — which is why the best telescopes are in space (Hubble, JWST) or use adaptive optics to correct the atmosphere in real time. The physics of lenses, forged in the 17th century, still governs how we see the universe.</p>

**Image prompt:** A chalk drawing of the human eye cross-section: cornea, lens, retina labelled. Myopic eye (too long — image focused in front of retina, corrected with concave lens). Hyperopic eye (too short — corrected with convex lens). Below: ray diagrams for simple microscope (magnifying glass) and compound microscope. Angular magnification formulas. Chalk on dark green board. Square 1:1.

---

## Summary

### Part 1 — Foundations (2 BBs)
| # | Title | Core |
|---|-------|------|
| 310 | What is light? | Ray model, c = 3×10⁸ m/s, straight lines |
| 311 | Law of reflection | **θ_i = θ_r**, specular vs diffuse |

### Part 2 — Reflection deep (4 BBs)
| # | Title | Core equation |
|---|-------|--------------|
| 312 | Plane mirrors | v = u, virtual, erect, laterally inverted |
| 313 | Spherical mirrors | Concave (converging), convex (diverging), f = R/2 |
| 314 | The mirror formula | **1/f = 1/v + 1/u**, m = −v/u |
| 315 | Mirror ray diagrams | 3 principal rays, 6 cases for concave, 1 for convex |

### Part 3 — Refraction deep (6 BBs)
| # | Title | Core equation |
|---|-------|--------------|
| 316 | What is refraction? | Light slows in denser media → bends toward normal |
| 317 | Snell's Law | **n₁ sin θ₁ = n₂ sin θ₂** |
| 318 | Slab & apparent depth | d = t sin(θ₁−θ₂)/cos θ₂, app depth = real/n |
| 319 | Total internal reflection | **sin θ_c = n₂/n₁**, TIR when θ > θ_c |
| 320 | Fibres & prisms | NA = √(n_core²−n_clad²), TIR at 45° in prism |
| 321 | Dispersion | n varies with λ, prism spectrum, rainbow at ~42° |

### Part 4 — Lenses & applications (3 BBs)
| # | Title | Core equation |
|---|-------|--------------|
| 322 | Convex & concave lenses | Convex converges (f>0), concave diverges (f<0) |
| 323 | Lens formula | **1/f = 1/v − 1/u**, m = v/u, P = 1/f |
| 324 | Eye & instruments | M_simple = D/f, M_telescope = f_obj/f_eye |

**15 BBs.** Snell's law n₁ sin θ₁ = n₂ sin θ₂ is rehearsed in BBs 317, 318, 319 (critical angle derivation), 320 (fibre acceptance angle), 321 (dispersion — n varies with λ), 322 (lens bending), and 323 (sign-convention limits). That's 7 BBs. The mirror and lens formulas are drilled with sign-convention examples. Total optics BBs: 0 → 15. Covers P5 in CONTENT-MAP.
