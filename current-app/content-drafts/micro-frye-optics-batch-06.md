# Micro-Frye — Batch 06: Optics Basics (15 BBs)

These 15 BBs build a visual understanding of light from scratch — how it moves, how it bounces, how it bends, and how lenses and mirrors shape it into images. The approach is Ray Optics: treat light as straight-line rays that reflect and refract, producing everything from a bathroom mirror to a telescope. No prior knowledge assumed beyond having seen things.

---

## BB-NEW-931 — What is light?

**Subject:** physics | **Topic:** optics | **Concept:** light; electromagnetic-wave; speed-of-light; photon | **Ground:** g0 | **Builds on:** [BB-NEW-911]

**Floor 0 (Idea):**
<p>Light is an electromagnetic wave — a travelling oscillation of electric and magnetic fields. It's part of the electromagnetic spectrum, the narrow band our eyes can see (wavelengths about 400–700 nanometres). Light travels at 299,792,458 metres per second in a vacuum — the fastest anything can go. In air, it's slightly slower (about 0.03% slower). In water, it's about 25% slower. In glass, about 33% slower. Light carries energy in packets called photons. A single photon of green light has about 2.3 electron-volts of energy — enough to trigger a chemical reaction in your retina, which is how you see.</p>

**Floor 1 (Concrete):**
<p>Light from the Sun takes about 8 minutes and 20 seconds to reach Earth (150 million km ÷ 300,000 km/s = 500 s). Light from the Moon takes 1.3 seconds. Light from the nearest star (Proxima Centauri) takes 4.2 years. When you look at the Andromeda Galaxy, you're seeing it as it was 2.5 million years ago — before humans existed. In a fibre optic cable, light travels through glass at about 200,000 km/s (n = 1.5). A signal from London to New York via undersea fibre (about 6000 km) takes about 30 milliseconds. A copper wire takes about the same — but fibre can carry vastly more data.</p>

**Floor 2 (Definition):**
<p><strong>Light</strong> is electromagnetic radiation in the visible band (roughly 400–700 nm). Speed in vacuum: c = 299,792,458 m/s (exact). In a medium: v = c/n, where n is the refractive index (n ≥ 1). n_air ≈ 1.0003, n_water ≈ 1.33, n_glass ≈ 1.5–1.9. <strong>Photon:</strong> the quantum of light — a particle with energy E = hf = hc/λ, where h = 6.626 × 10⁻³⁴ J·s. Green light (λ = 550 nm): E ≈ 2.25 eV — in the middle of the visible range. Light exhibits wave behaviour (interference, diffraction) AND particle behaviour (photoelectric effect) — wave-particle duality.</p>

**Image prompt:** A simple chalk drawing of the Sun, an arrow labelled "8 min 20 s", and the Earth. The EM spectrum with the visible band highlighted. A sine wave with E and B fields perpendicular. A photon as a little packet of energy. Chalk on dark green board. Square 1:1.


## BB-NEW-932 — How light travels: rays and shadows

**Subject:** physics | **Topic:** optics | **Concept:** rectilinear-propagation; ray; shadow; umbra-penumbra | **Ground:** g0 | **Builds on:** [BB-NEW-931]

**Floor 0 (Idea):**
<p>In a uniform medium, light travels in straight lines. This is why shadows have sharp edges and why you can aim a torch beam. We model light as rays — thin, straight arrows showing the direction the light travels. A ray diagram is a drawing that traces these straight lines to predict where light goes. The ray model explains shadows, mirrors, and lenses. It only breaks down when light encounters very small obstacles (about the size of the wavelength — then diffraction matters).</p>

**Floor 1 (Concrete):**
<p>A point source of light (like a bare bulb) casts a sharp shadow with a single dark region (umbra). An extended source (like a fluorescent tube) casts a shadow with a dark centre (umbra) and fuzzy edge (penumbra) — this is why shadows on an overcast day are soft and indistinct. A solar eclipse: the Moon's umbra on Earth is only about 100–250 km wide — you must be inside that narrow track to see a total eclipse. Outside the umbra, in the penumbra, you see a partial eclipse. The sharpness of shadows is evidence that light travels in straight lines. A pinhole camera forms an inverted image because rays from the top of the object travel in straight lines to the bottom of the screen.</p>

**Floor 2 (Definition):**
<p><strong>Ray:</strong> a line representing the path of light. <strong>Rectilinear propagation:</strong> light travels in straight lines in a homogeneous medium. <strong>Shadow formation:</strong> opaque object blocks rays. Point source → umbra only. Extended source → umbra + penumbra. <strong>Pinhole camera:</strong> a small aperture forms an inverted, real image because each point on the object sends rays through the pinhole in straight lines to a unique point on the screen. Image size / object size = image distance / object distance. The ray model works when the wavelength is much smaller than the obstacle (geometrical optics).</p>

**Image prompt:** A simple chalk drawing of a torch, an opaque ball, and a screen. Rays traced in straight lines. Umbra (dark centre) and penumbra (fuzzy edges) labelled. A pinhole camera: rays crossing at the pinhole, forming an inverted image. Chalk on dark green board. Square 1:1.


## BB-NEW-933 — Reflection: the law of the mirror

**Subject:** physics | **Topic:** optics | **Concept:** reflection; plane-mirror; angle-of-incidence-equals-angle-of-reflection; virtual-image | **Ground:** g0 | **Builds on:** [BB-NEW-905, BB-NEW-932]

**Floor 0 (Idea):**
<p>Light bounces off a smooth surface at the same angle it arrived. Angle of incidence = angle of reflection. This is why you see your face in a mirror: light from your face hits the mirror, bounces back at the same angle relative to the mirror's surface, and enters your eye. The image appears to be behind the mirror — it's a virtual image, the same size as the object and the same distance behind the mirror as the object is in front. Left and right are swapped.</p>

**Floor 1 (Concrete):**
<p>Stand 1 metre from a flat mirror. Your image appears 1 metre behind the mirror — total distance from you to your image = 2 m. The minimum mirror height needed to see your full body: half your height (because the ray from your feet reflects off the mirror at half the distance between your eye and your feet). A 1.8 m tall person needs a 0.9 m mirror to see their whole body. A mirror doesn't reverse left and right — it reverses front and back (the direction perpendicular to the mirror). Left appears on the left of the image when you hold up your right hand — because your right hand is on the west side of your body, and in the image, a hand on the west side of the image body is its left hand.</p>

**Floor 2 (Definition):**
<p><strong>Law of Reflection:</strong> θ_i = θ_r, measured from the normal (line perpendicular to the surface). Incident ray, reflected ray, and normal all lie in the same plane. <strong>Plane mirror image:</strong> virtual (cannot be projected on a screen), upright, same size as object, laterally inverted, located as far behind the mirror as the object is in front. <strong>Virtual image:</strong> rays appear to diverge from a point but don't actually pass through it. <strong>Real image:</strong> rays actually converge and pass through the image point — can be projected on a screen. Mirrors reverse the component of direction perpendicular to their surface.</p>

**Image prompt:** A simple chalk drawing of a ray hitting a mirror. Incident ray (θ_i), reflected ray (θ_r), normal line. θ_i = θ_r. A person standing in front of a mirror — the virtual image behind, same distance, labelled. "d_i = d_o." Chalk on dark green board. Square 1:1.


## BB-NEW-934 — Curved mirrors: concave and convex

**Subject:** physics | **Topic:** optics | **Concept:** concave-mirror; convex-mirror; focal-point; real-and-virtual-images | **Ground:** g0 | **Builds on:** [BB-NEW-933]

**Floor 0 (Idea):**
<p>A concave mirror curves inward like a bowl. It can focus parallel light rays to a point — the focal point. This is how makeup mirrors magnify, how solar cookers concentrate sunlight, and how reflecting telescopes collect starlight. A convex mirror curves outward — it spreads light rays apart, producing a smaller, wider-angle view. This is the wide-angle "objects in mirror are closer than they appear" mirror on a car. Both work by reflection, but the shape changes where the rays go.</p>

**Floor 1 (Concrete):**
<p>A concave makeup mirror: focal length f = 30 cm. Hold your face 20 cm in front (between f and the mirror). The image is virtual, upright, and magnified — about 3× larger. Hold an object far away (> 2f): the image is real, inverted, and smaller — you can project it on a screen. A shaving mirror at f = 15 cm and an object at 10 cm gives magnification M = f/(f − u) = 15/(15−10) = 3×. A car's convex side mirror: f = −1 m (negative by convention — it diverges rays). The image is always virtual, upright, and smaller — giving a wider field of view at the cost of making objects look farther away. Reflecting telescopes (Newtonian): large concave primary mirror collects light and focuses it to a point where a secondary mirror or eyepiece magnifies it.</p>

**Floor 2 (Definition):**
<p><strong>Concave mirror:</strong> reflecting surface curves inward. Converging — parallel rays meet at the focal point F. Focal length f = R/2 (R = radius of curvature). <strong>Convex mirror:</strong> reflecting surface curves outward. Diverging — parallel rays appear to come from a virtual focal point behind the mirror. <strong>Mirror equation:</strong> 1/f = 1/u + 1/v, where u = object distance, v = image distance, f = focal length. <strong>Magnification:</strong> M = −v/u = h_image/h_object. Sign convention: f is positive for concave, negative for convex. v is positive for real images (in front of the mirror), negative for virtual (behind).</p>

**Image prompt:** A simple chalk drawing of a concave mirror: parallel rays converging to a focal point F. Object between F and mirror → magnified virtual image. Convex mirror: rays diverging, appearing to come from virtual F behind. A car mirror: wide-angle, "objects closer than they appear." Chalk on dark green board. Square 1:1.


## BB-NEW-935 — Refraction: why a straw looks bent

**Subject:** physics | **Topic:** optics | **Concept:** refraction; Snells-law; refractive-index; light-bending | **Ground:** g0 | **Builds on:** [BB-NEW-905, BB-NEW-931]

**Floor 0 (Idea):**
<p>When light passes from one material into another, it changes speed — and as it changes speed, it bends. This bending is refraction. Put a straw in a glass of water and it looks broken at the surface. Air to water: light slows down and bends toward the normal (the perpendicular line). Water to air: light speeds up and bends away. A prism splits white light into colours because each colour (wavelength) slows by a slightly different amount in glass — this is dispersion.</p>

**Floor 1 (Concrete):**
<p>Light from air hits water at 30° to the normal. n_air ≈ 1.0, n_water = 1.33. Snell's Law: n₁ sin θ₁ = n₂ sin θ₂ → 1.0 × sin 30° = 1.33 × sin θ₂ → 0.5 = 1.33 × sin θ₂ → θ₂ = arcsin(0.3759) ≈ 22°. The ray bends 8° toward the normal. Going from water to air: a ray at 30°: 1.33 × sin 30° = 1.0 × sin θ₂ → sin θ₂ = 0.665 → θ₂ ≈ 41.7° — it bends away from the normal. A pool looks 25% shallower than it is (apparent depth = real depth / n = real depth / 1.33). A fish appears to be at 3/4 of its actual depth. Spearfishing: aim below where the fish appears.</p>

**Floor 2 (Definition):**
<p><strong>Refraction:</strong> the bending of light when passing from one medium to another with different refractive index n. <strong>Snell's Law:</strong> n₁ sin θ₁ = n₂ sin θ₂. <strong>Refractive index n = c/v</strong> — how much slower light travels in the medium. n_air ≈ 1.0, n_water = 1.33, n_crown glass ≈ 1.52, n_diamond = 2.42. <strong>Light bends toward the normal when entering a denser medium (higher n), away when entering a rarer medium (lower n).</strong> <strong>Apparent depth = real depth / n</strong> — objects in water appear shallower. Refraction explains lenses, rainbows, mirages, and why your legs look short when you stand in a swimming pool.</p>

**Image prompt:** A simple chalk drawing of a straw in a glass of water — bent at the surface. Ray diagram: air → water, bending toward the normal. Snell's Law written beside. Apparent depth vs real depth. A prism with white light in, rainbow out. Chalk on dark green board. Square 1:1.


## BB-NEW-936 — Total internal reflection: trapped light

**Subject:** physics | **Topic:** optics | **Concept:** total-internal-reflection; critical-angle; fibre-optics; diamond-sparkle | **Ground:** g0 | **Builds on:** [BB-NEW-935]

**Floor 0 (Idea):**
<p>When light inside a dense medium (like glass or water) hits the boundary with a rarer medium (like air) at a steep enough angle, it doesn't escape — it reflects back inside perfectly. This is total internal reflection. It's why diamonds sparkle (light gets trapped and bounces around inside the facets), why fibre optic cables carry light for kilometres, and why looking up from underwater you see a "silvery mirror" at the surface beyond a certain angle.</p>

**Floor 1 (Concrete):**
<p><strong>Critical angle for water (n=1.33) to air (n=1):</strong> θ_c = arcsin(1/1.33) = arcsin(0.7519) ≈ 48.8°. Any ray hitting the surface at >48.8° (measured from the normal) is totally reflected back into the water. If you're underwater, the entire world above is compressed into a 97.6° cone (the "Snell's window") — outside that, you see only a mirror-like reflection of the underwater world. <strong>Fibre optics:</strong> a glass fibre (core n ≈ 1.48, cladding n ≈ 1.46). Light enters, hits the core-cladding boundary at a shallow angle, and undergoes TIR thousands of times per metre, emerging at the other end. Loss is ~0.2 dB/km for modern single-mode fibre — after 50 km, the signal has dropped to only about 10% of its original strength, which amplifiers can restore.</p>

**Floor 2 (Definition):**
<p><strong>Total Internal Reflection (TIR):</strong> occurs when light in a medium with index n₁ > n₂ hits the boundary at an angle greater than the critical angle θ_c. <strong>Critical angle:</strong> θ_c = arcsin(n₂/n₁). For θ > θ_c, 100% of the light is reflected — reflection is lossless (unlike metal mirrors). <strong>Conditions for TIR:</strong> (1) light must be travelling from denser to rarer medium, (2) angle of incidence > θ_c. <strong>Applications:</strong> fibre optics (telecommunications, endoscopes), prism binoculars (right-angle prisms reflect with zero loss), diamond cutting (high n = 2.42 → small θ_c ≈ 24.4° → lots of TIR → sparkle).</p>

**Image prompt:** A simple chalk drawing of a light ray inside glass hitting the boundary at three angles: less than θ_c (refracts out), exactly θ_c (grazes the surface), greater than θ_c (totally reflected). A fibre optic cable — light zigzagging inside. A diamond — many facets, light bouncing. Chalk on dark green board. Square 1:1.


## BB-NEW-937 — Lenses: convex and concave

**Subject:** physics | **Topic:** optics | **Concept:** convex-lens; concave-lens; converging; diverging; focal-length | **Ground:** g0 | **Builds on:** [BB-NEW-935]

**Floor 0 (Idea):**
<p>A lens is a piece of glass or plastic shaped to bend light in a controlled way by refraction. A convex lens (thicker in the middle) converges parallel rays to a focal point — like a magnifying glass. A concave lens (thinner in the middle) diverges parallel rays — they spread apart. Lenses are the heart of cameras, glasses, microscopes, and telescopes. A convex lens can produce real images (projected on a screen) or virtual images (when the object is very close, like a magnifying glass).</p>

**Floor 1 (Concrete):**
<p>A convex lens with focal length f = 20 cm. Object at 60 cm (beyond 2f = 40 cm): image is real, inverted, smaller, at v = 1/(1/f − 1/u) = 1/(1/20 − 1/60) = 30 cm. Magnification = −30/60 = −0.5 (half size, inverted). Object at 10 cm (between f and lens): image is virtual, upright, magnified — v = 1/(1/20 − 1/10) = −20 cm. Magnification = −(−20)/10 = 2×. A magnifying glass: f = 8 cm, object at 6 cm → v = −24 cm, M = 4×. A concave lens: f = −15 cm (negative — diverging). Any object distance gives a virtual, upright, smaller image. This is what corrects short-sightedness (myopia) — the diverging lens spreads light slightly before it enters the eye.</p>

**Floor 2 (Definition):**
<p><strong>Convex (converging) lens:</strong> thicker centre, converges parallel rays to a real focal point. f > 0. <strong>Concave (diverging) lens:</strong> thinner centre, diverges rays — they appear to come from a virtual focal point. f < 0. <strong>Lens equation:</strong> 1/f = 1/u + 1/v (same form as mirror equation). <strong>Magnification:</strong> M = −v/u. <strong>Power of a lens:</strong> P = 1/f (in dioptres, D). f in metres. A +2 D lens has f = 0.5 m = 50 cm. The human eye has a total power of about 60 D (cornea ~40 D, lens ~20 D).</p>

**Image prompt:** A simple chalk drawing of a convex lens: parallel rays converge to F. Object beyond 2f → real inverted image. Object between f and lens → virtual magnified image. A concave lens: parallel rays diverge — apparent origin at virtual F. The lens equation 1/f = 1/u + 1/v. Chalk on dark green board. Square 1:1.


## BB-NEW-938 — Real images vs virtual images

**Subject:** physics | **Topic:** optics | **Concept:** real-image; virtual-image; image-types; ray-tracing | **Ground:** g0 | **Builds on:** [BB-NEW-933, BB-NEW-934, BB-NEW-937]

**Floor 0 (Idea):**
<p>There are two kinds of images in optics. A <strong>real image</strong> is formed when light rays actually converge at a point — you can project it on a screen. A cinema projector, a camera's sensor, and the image on your retina are all real images. A <strong>virtual image</strong> is formed when rays only appear to diverge from a point — your brain traces them back, but the light never actually goes there. A bathroom mirror, a magnifying glass held close, and the view through a peephole are all virtual images. You can't project a virtual image on a screen.</p>

**Floor 1 (Concrete):**
<p><strong>Concave mirror, object beyond f:</strong> real, inverted image — you can hold a piece of paper at the image position and see the projected picture. <strong>Concave mirror, object inside f (makeup mirror):</strong> virtual, upright, magnified — you can't project it. <strong>Convex lens, object beyond f:</strong> real, inverted — projector, camera. <strong>Convex lens, object inside f (magnifying glass):</strong> virtual, upright, magnified — can't project. <strong>Convex mirror (car wing mirror):</strong> always virtual, upright, smaller. <strong>Concave lens:</strong> always virtual, upright, smaller. The key: if rays actually converge after the optical element, the image is real. If they only appear to diverge from a point when you trace them backward, it's virtual.</p>

**Floor 2 (Definition):**
<p><strong>Real image:</strong> formed by actual convergence of light rays. Can be projected on a screen. Inverted relative to the object. v is positive (on the opposite side of the lens from the object). <strong>Virtual image:</strong> formed by the apparent divergence of rays. Cannot be projected. Upright. v is negative (on the same side of the lens as the object). For mirrors: real image is on the same side as the object (in front), virtual is behind. The brain assumes light travels in straight lines, so it traces diverging rays back to where they appear to originate — creating the illusion of an object behind the mirror or inside the lens.</p>

**Image prompt:** A simple chalk drawing with two clear panels. Left: "Real Image" — rays converging to a point, inverted arrow on a screen. Right: "Virtual Image" — rays appearing to diverge from behind the mirror/lens, upright arrow, dashed lines tracing back. Chalk on dark green board. Square 1:1.


## BB-NEW-939 — The lens formula in action

**Subject:** physics | **Topic:** optics | **Concept:** lens-formula; magnification; 1/f=1/u+1/v; practical-calculations | **Ground:** g0 | **Builds on:** [BB-NEW-937, BB-NEW-938]

**Floor 0 (Idea):**
<p>The lens formula 1/f = 1/u + 1/v is the single equation that governs all thin lenses and mirrors. Know the focal length f and the object distance u, and you can calculate where the image forms (v) and how big it is (M = −v/u). The trick is sign convention: f is positive for converging lenses/concave mirrors, negative for diverging/convex. u is always positive for real objects. v is positive for real images, negative for virtual.</p>

**Floor 1 (Concrete):**
<p><strong>Camera lens:</strong> f = 50 mm. Photographing a mountain 1 km away (u = 1,000,000 mm). 1/v = 1/50 − 1/1,000,000 ≈ 0.02, so v ≈ 50.0025 mm — essentially at the focal plane. The image is tiny: M = −50/1,000,000 = −0.00005. If the mountain is 2 km tall, the image is 0.1 mm — just a speck on the sensor. <strong>Close-up:</strong> same lens, object at 200 mm. 1/v = 1/50 − 1/200 = 0.015, v ≈ 66.7 mm. M = −66.7/200 = −0.33 — the image is one-third size, inverted. <strong>Concave mirror in a telescope:</strong> f = 1 m = 1000 mm. Moon: u ≈ 384,000,000,000 mm. v ≈ f = 1000 mm. Image size = M × moon diameter = (−1000/3.84×10¹¹) × 3,474,000 m ≈ 9 mm. A 9 mm image of the Moon at the focal plane — an eyepiece then magnifies it.</p>

**Floor 2 (Definition):**
<p><strong>Thin lens formula:</strong> 1/f = 1/u + 1/v. Valid for thin lenses (thickness ≪ radii of curvature) and paraxial rays (near the axis, small angles). <strong>Magnification:</strong> M = h'/h = −v/u (negative means inverted). <strong>Lens power:</strong> P = 1/f (dioptres). Sign conventions: converging → f > 0, diverging → f < 0. Real object → u > 0. Real image → v > 0. Virtual image → v < 0. For mirrors: the same formula works with the same sign conventions (concave = converging → f > 0, convex = diverging → f < 0).</p>

**Image prompt:** A simple chalk drawing of the lens formula 1/f = 1/u + 1/v with a lens, object, and image labelled with distances. Three examples: camera photographing a mountain (v≈f, tiny image), close-up (v slightly > f, smaller image), magnifying glass (v negative, bigger image). Chalk on dark green board. Square 1:1.


## BB-NEW-940 — The human eye: a living camera

**Subject:** physics | **Topic:** optics | **Concept:** human-eye; cornea; lens; retina; accommodation; near-point | **Ground:** g0 | **Builds on:** [BB-NEW-937, BB-NEW-938]

**Floor 0 (Idea):**
<p>Your eye is a remarkable optical instrument. Light enters through the cornea (which does most of the focusing), passes through the pupil (the adjustable aperture), through the crystalline lens (which fine-tunes focus), and forms a real, inverted image on the retina. The retina converts the light into electrical signals that travel to the brain — which flips the image right-side up. The lens changes shape to focus on objects at different distances — this is accommodation. The closest you can focus is your near point (about 25 cm for a young adult).</p>

**Floor 1 (Concrete):**
<p>Eye power: cornea ~40 D (dioptres), lens ~20 D (relaxed), total ~60 D. To focus at infinity: lens is relaxed, total power = 60 D. The focal length = 1/60 = 16.7 mm — roughly the eyeball diameter. To focus at 25 cm (0.25 m): additional power needed = 1/0.25 = 4 D. The lens accommodates by rounding up — total power = 64 D. The near point increases with age (presbyopia) because the lens stiffens — by age 50, the near point may be 1 m, requiring reading glasses (+2 to +3 D). The fovea (centre of the retina) has the highest cone density — about 200,000 cones/mm² — giving us sharp central vision. Rods (peripheral, sensitive in low light) number about 120 million; cones (colour) about 6 million.</p>

**Floor 2 (Definition):**
<p><strong>The eye as an optical system:</strong> cornea (n ≈ 1.38, fixed, ~40 D) + aqueous humour + lens (n ≈ 1.40, variable, 20–24 D) + vitreous humour → real inverted image on retina. <strong>Accommodation:</strong> ciliary muscles change lens shape to adjust power. <strong>Near point:</strong> closest distance of clear focus (25 cm young, 50 cm at 45, 100 cm at 55). <strong>Far point:</strong> farthest distance (∞ for normal vision). <strong>Common defects:</strong> myopia (short-sighted, eyeball too long or cornea too curved — diverging lens corrects), hyperopia (long-sighted, eyeball too short — converging lens corrects), presbyopia (age-related loss of accommodation — converging lens for reading).</p>

**Image prompt:** A simple chalk drawing of a cross-section of the human eye. Light rays entering, cornea bending them, lens fine-tuning, focused on the retina. Labels: cornea (40D), lens (20D), retina, pupil/iris, optic nerve. Near point at 25 cm — lens rounded up to 24D. Chalk on dark green board. Square 1:1.


## BB-NEW-941 — The magnifying glass and microscope

**Subject:** physics | **Topic:** optics | **Concept:** magnifier; simple-microscope; compound-microscope; angular-magnification | **Ground:** g0 | **Builds on:** [BB-NEW-937, BB-NEW-939]

**Floor 0 (Idea):**
<p>A magnifying glass is a convex lens held close to an object. The lens produces a virtual, upright, magnified image that your eye then focuses on. The magnification is angular — it makes the object subtend a larger angle at your eye, so it fills more of your retina. A compound microscope uses two lenses in series: an objective lens that produces a real, magnified image, and an eyepiece (another magnifying glass) that further magnifies the real image. Two lenses multiply magnification: total = M_objective × M_eyepiece.</p>

**Floor 1 (Concrete):**
<p><strong>Simple magnifier:</strong> a lens with f = 5 cm. Angular magnification M = 25/f (assuming near point 25 cm) = 25/5 = 5×. This means the object appears 5× larger than when viewed unaided at 25 cm. <strong>Compound microscope:</strong> objective f_o = 4 mm = 0.4 cm. Object distance u ≈ 0.42 cm (slightly beyond f_o). Real image at the tube length (typically 16 cm from the objective). M_objective ≈ tube_length/f_o = 16/0.4 = 40×. Eyepiece f_e = 2.5 cm. M_eyepiece = 25/2.5 = 10×. Total magnification = 40 × 10 = 400×. At 400×, a 0.1 mm cell appears 40 mm across — visible in detail. A research-grade microscope with a 100× oil-immersion objective and 10× eyepiece gives 1000× — the practical limit for optical microscopy (limited by diffraction).</p>

**Floor 2 (Definition):**
<p><strong>Angular magnification M = angle subtended by image / angle subtended by object at near point.</strong> <strong>Simple magnifier:</strong> M = 25/f (with lens close to eye, image at ∞) or M = 1 + 25/f (image at near point). <strong>Compound microscope:</strong> M = M_o × M_e, where M_o ≈ L/f_o (L = tube length, ~160 mm standard), M_e = 25/f_e. <strong>Resolution limit:</strong> about 0.2 μm for visible light (λ/2NA) — you can't see details smaller than about half the wavelength of light. Electron microscopes use electron beams (much shorter effective wavelength) to achieve nanometre resolution.</p>

**Image prompt:** A simple chalk drawing of a magnifying glass with f = 5 cm, showing M = 25/f = 5×. A compound microscope: objective lens → real enlarged image → eyepiece → virtual further-enlarged image. M = M_o × M_e labelled. A cell before and after magnification. Chalk on dark green board. Square 1:1.


## BB-NEW-942 — The telescope: bringing distant things close

**Subject:** physics | **Topic:** optics | **Concept:** telescope; refracting; reflecting; angular-magnification; gathering-light | **Ground:** g0 | **Builds on:** [BB-NEW-934, BB-NEW-937, BB-NEW-941]

**Floor 0 (Idea):**
<p>A telescope's main job is to collect lots of light and make distant objects subtend a larger angle at your eye. There are two main kinds. <strong>Refracting telescope:</strong> uses a large convex objective lens to form a real image, which a smaller eyepiece lens magnifies (like a microscope but for far-away things). <strong>Reflecting telescope:</strong> uses a large concave mirror instead of a lens — cheaper to make large, and no chromatic aberration. Magnification = f_objective / f_eyepiece. The bigger the objective, the more light it gathers and the fainter the things you can see.</p>

**Floor 1 (Concrete):**
<p>A small refractor: objective f_o = 1000 mm, eyepiece f_e = 10 mm. M = 1000/10 = 100×. Point it at the Moon (angular diameter ~0.5°). At 100×, the Moon fills about 50° of your field of view — roughly the width of two handspans at arm's length. Jupiter's moons appear as tiny dots but are clearly separated. A larger amateur reflector: 200 mm (8-inch) mirror, f_o = 1200 mm. With the same eyepiece: M = 120×. The light-gathering power goes with area (∝ D²), so the 200 mm gathers 4× as much light as a 100 mm — revealing fainter stars and nebulae. Hubble Space Telescope: D = 2.4 m, f_o = 57.6 m. At M = 1000×, it resolves details on Pluto that ground-based telescopes couldn't — and it's in space, above the atmosphere's distortion.</p>

**Floor 2 (Definition):**
<p><strong>Refracting telescope:</strong> objective = convex lens. f_o and f_e both positive. Image is inverted (terrestrial telescopes add an erecting prism or lens). <strong>Reflecting telescope:</strong> objective = concave mirror. Newtonian: primary mirror + flat secondary + eyepiece on the side. <strong>Angular magnification:</strong> M = f_o/f_e (when viewing at infinity). <strong>Light-gathering power</strong> ∝ D² (D = objective diameter). <strong>Resolving power:</strong> minimum angular separation = 1.22 λ/D (Rayleigh criterion) — a bigger mirror gives sharper images. The largest optical telescopes today have mirrors of 10 m diameter (Keck, Gran Canarias).</p>

**Image prompt:** A simple chalk drawing of a refracting telescope: long tube, objective lens (f_o), eyepiece (f_e), light rays from a distant star converging. M = f_o/f_e. A reflecting telescope: concave primary mirror, flat secondary, eyepiece. Both pointed at the Moon. Chalk on dark green board. Square 1:1.


## BB-NEW-943 — Colour: why a rose is red

**Subject:** physics | **Topic:** optics | **Concept:** colour; reflection; absorption; RGB; additive-and-subtractive | **Ground:** g0 | **Builds on:** [BB-NEW-911, BB-NEW-931]

**Floor 0 (Idea):**
<p>Colour is not a property of objects — it's a property of light. A red rose looks red because its petals absorb blue and green light and reflect red. White objects reflect all colours roughly equally. Black objects absorb most light. The retina has three types of cones, sensitive to red, green, and blue — any colour you perceive is your brain's interpretation of how much each cone type is stimulated. This is RGB. Screens produce colour by adding red, green, and blue light (additive mixing). Paints and inks produce colour by subtracting colours from white light (subtractive mixing).</p>

**Floor 1 (Concrete):**
<p><strong>Additive (light):</strong> Red + Green = Yellow. Red + Blue = Magenta. Green + Blue = Cyan. Red + Green + Blue = White. Your phone screen has millions of tiny RGB subpixels. <strong>Subtractive (paint/ink):</strong> Cyan absorbs red. Magenta absorbs green. Yellow absorbs blue. Mix all three: black (ideally — in practice, a murky brown; real printing adds separate black ink — CMYK: Cyan, Magenta, Yellow, Key/Black). A banana is yellow because it absorbs blue and reflects red + green = yellow. The sky is blue because air molecules scatter blue light more than red (Rayleigh scattering) — the blue you see is scattered sunlight.</p>

**Floor 2 (Definition):**
<p><strong>Colour</strong> is the perception of light of different wavelengths. <strong>Visible spectrum:</strong> ~380 nm (violet) to ~750 nm (red). <strong>RGB (additive):</strong> primary colours of light — mixing produces brighter colours, eventually white. Used in displays. <strong>CMY(K) (subtractive):</strong> primary colours of pigment — mixing produces darker colours, eventually black. Used in printing. <strong>Cone cells:</strong> S-cones (short wavelength, blue, peak ~420 nm), M-cones (medium, green, peak ~534 nm), L-cones (long, red, peak ~564 nm). Colour blindness: deficiency in one or more cone types — about 8% of males have red-green colour blindness.</p>

**Image prompt:** A simple chalk drawing of a rose under white light — absorbing blue and green, reflecting red. Additive mixing: overlapping red, green, blue circles producing yellow, cyan, magenta, white. Subtractive mixing: overlapping cyan, magenta, yellow producing blue, red, green, black. Chalk on dark green board. Square 1:1.


## BB-NEW-944 — Dispersion: the rainbow in white light

**Subject:** physics | **Topic:** optics | **Concept:** dispersion; prism; rainbow; wavelength-dependence-of-n; spectrum | **Ground:** g0 | **Builds on:** [BB-NEW-935, BB-NEW-943]

**Floor 0 (Idea):**
<p>White light contains all colours. A prism separates them because glass's refractive index varies slightly with wavelength — blue light bends more than red. A prism spreads white light into a continuous spectrum: red, orange, yellow, green, blue, indigo, violet. A rainbow is a natural spectrum formed by sunlight refracting into water droplets, reflecting off the back, and refracting out — each colour emerging at a slightly different angle. The full colours of sunlight are always there; dispersion just reveals them.</p>

**Floor 1 (Concrete):**
<p>A prism: white light enters. n(glass) for red light ~1.510, for violet ~1.530. The difference in δ (deviation angle) is about 1–2°. The spectrum spreads from red (least deviated) to violet (most deviated). A rainbow: Sun behind you, water droplets in front. Light enters a droplet, refracts (disperses), reflects off the back, and refracts again on exit. Red emerges at ~42° from the incoming direction, violet at ~40°. The rainbow is always an arc of 42° radius centred on the antisolar point (the shadow of your head). Secondary rainbow: two internal reflections — dimmer, colours reversed, radius ~51°. You can never reach the end of a rainbow — it moves as you move.</p>

**Floor 2 (Definition):**
<p><strong>Dispersion:</strong> the variation of refractive index with wavelength. Results from the fact that n depends on how close the light frequency is to the natural resonant frequencies of the material's electrons. <strong>Normal dispersion:</strong> n decreases with increasing λ (red has lower n than blue). <strong>Anomalous dispersion:</strong> occurs near absorption bands. <strong>Chromatic aberration:</strong> a lens focuses different colours at slightly different points — a problem in cheap camera lenses and refracting telescopes, corrected with achromatic doublets (two lenses of different glass types).</p>

**Image prompt:** A simple chalk drawing of a prism with white light entering from the left and a rainbow spectrum fanning out to the right. Red at the top (least bent), violet at the bottom (most bent). A raindrop cross-section: sunlight → refract → reflect → refract → spectrum to observer. The 42° angle marked. Chalk on dark green board. Square 1:1.


## BB-NEW-945 — The optics toolkit

**Subject:** physics | **Topic:** optics | **Concept:** optics-summary; reflection-refraction-lenses-mirrors-eye-instruments-colour | **Ground:** g0 | **Builds on:** [BB-NEW-931 through BB-NEW-944]

**Floor 0 (Idea):**
<p>Optics is the study of light. Light travels in straight lines (rays) and at 300,000 km/s in vacuum — slower in materials. It reflects (θ_i = θ_r), refracts (n₁ sin θ₁ = n₂ sin θ₂), and can be totally internally reflected at steep angles. Mirrors and lenses form images — real (projectable) and virtual (not). The eye is a living lens system. Instruments (magnifier, microscope, telescope) chain lenses together to multiply magnification. Colour is wavelength — white light contains all colours, and dispersion (prism, rainbow) separates them.</p>

**Floor 1 (Concrete):**
<p>Key numbers to carry:</p>
<p>• Speed of light c = 3 × 10⁸ m/s (vacuum), ~2.25 × 10⁸ m/s (water), ~2 × 10⁸ m/s (glass).</p>
<p>• Refractive indices: water 1.33, crown glass ~1.52, diamond 2.42.</p>
<p>• Critical angle (water→air): 48.8°. (glass→air): ~41°.</p>
<p>• Human near point: ~25 cm (young adult). Eye power: ~60 D.</p>
<p>• Lens formula: 1/f = 1/u + 1/v. M = −v/u.</p>
<p>• Magnifier: M = 25/f (cm). Microscope: M = M_o × M_e.</p>
<p>• Telescope: M = f_o/f_e.</p>
<p>• Rainbow: 42° radius, red outside, violet inside.</p>
<p>• Visible spectrum: 380–750 nm.</p>

**Floor 2 (Definition):**
<p><strong>Optics toolkit:</strong></p>
<p>• <strong>Ray model:</strong> light travels in straight lines. Shadows, pinhole camera.</p>
<p>• <strong>Reflection:</strong> θ_i = θ_r (plane mirror), 1/f = 1/u + 1/v (curved).</p>
<p>• <strong>Refraction:</strong> n₁ sin θ₁ = n₂ sin θ₂. n = c/v.</p>
<p>• <strong>TIR:</strong> θ_c = arcsin(n₂/n₁). Fibre optics, prisms.</p>
<p>• <strong>Lenses:</strong> convex (converging, f > 0), concave (diverging, f < 0).</p>
<p>• <strong>Images:</strong> real (rays converge, v > 0), virtual (rays appear to diverge, v < 0).</p>
<p>• <strong>Eye:</strong> cornea (~40 D) + lens (~20 D). Retina = sensor. Accommodation.</p>
<p>• <strong>Instruments:</strong> Magnifier M = 25/f. Microscope M = M_o × M_e. Telescope M = f_o/f_e.</p>
<p>• <strong>Colour:</strong> RGB additive (light), CMY subtractive (pigment). Dispersion.</p>

**Image prompt:** A simple chalk drawing of the grand optics summary. Centre: "LIGHT" with a sunbeam splitting into rays. Branching out: reflection (mirror), refraction (lens), TIR (fibre), eye cross-section, microscope, telescope, prism with rainbow. Key formulas and numbers scattered around. Chalk on dark green board. Square 1:1.
