export const TOPIC_EXPANSION_BOARDS = {
  1379: {
    act: 'V',
    kicker: 'Trigonometry 2.0',
    title: 'The unit circle holds every angle',
    tags: { subject: 'maths', topic: 'trigonometry', concept: 'unit-circle', ground: 'g0' },
    layers: [
      { text: '<p>A right triangle is a useful starting point, but it only handles angles between 0 and 90 degrees. The unit circle lets trigonometry keep going.</p>' },
      { text: '<p>Draw a circle of radius 1 around the origin. Pick a point on the circle and draw the radius to it. The angle is measured from the positive x-axis.</p>' },
      { text: '<p>The x-coordinate of that point is cos &theta;. The y-coordinate is sin &theta;. One picture now defines sine and cosine for any angle.</p>' },
      { text: '<p>This is why trigonometry becomes bigger than triangles. It becomes a way to describe turning, waves, rotation, and repeating motion.</p>' }
    ]
  },
  1380: {
    act: 'V',
    kicker: 'Trigonometry 2.1',
    title: 'Special angles come from two triangles',
    tags: { subject: 'maths', topic: 'trigonometry', concept: 'special-angles', ground: 'g0' },
    layers: [
      { text: '<p>The famous angles 30, 45, and 60 degrees are not random facts from a table. They come from two clean pieces of geometry.</p>' },
      { text: '<p>Cut a square along its diagonal and a 45-45-90 triangle appears. Its two short sides match, so sine and cosine at 45 degrees match too.</p>' },
      { text: '<p>Cut an equilateral triangle in half and a 30-60-90 triangle appears. Its sides sit in the ratio 1, &radic;3, and 2.</p>' },
      { text: '<p>Those two triangles generate the exact values learners keep seeing. The table is easier to remember when the shapes are understood first.</p>' }
    ]
  },
  1381: {
    act: 'V',
    kicker: 'Trigonometry 2.2',
    title: 'The exact values are a small language',
    tags: { subject: 'maths', topic: 'trigonometry', concept: 'exact-values', ground: 'g0' },
    layers: [
      { text: '<p>Trigonometry has a small core vocabulary: sine, cosine, and tangent at 0, 30, 45, 60, and 90 degrees.</p>' },
      { text: '<p>The sine row climbs from 0 to 1. The cosine row is the same pattern reversed. Tangent is sine divided by cosine.</p>' },
      { text: '<p>Exact values such as 1/2, &radic;2/2, and &radic;3/2 are cleaner than decimal approximations because they keep the geometry visible.</p>' },
      { text: '<p>Once these values are familiar, many later problems stop feeling like new problems. They become old values appearing in new places.</p>' }
    ]
  },
  1382: {
    act: 'V',
    kicker: 'Trigonometry 2.3',
    title: 'Sine and cosine draw waves',
    tags: { subject: 'maths', topic: 'trigonometry', concept: 'sine-cosine-waves', ground: 'g0' },
    layers: [
      { text: '<p>As a point travels around the unit circle, its height rises and falls. Plot that height against the angle, and a sine wave appears.</p>' },
      { text: '<p>Cosine is the horizontal coordinate doing the same dance, shifted in time. It starts high where sine starts at zero.</p>' },
      { text: '<p>Both waves repeat after one full turn. Their amplitude is 1, their middle line is 0, and their period is one complete cycle.</p>' },
      { text: '<p>This is why waves, sound, tides, alternating current, and pendulums keep returning to trigonometry. Repeating motion has a circular shadow.</p>' }
    ]
  },
  1383: {
    act: 'V',
    kicker: 'Trigonometry 2.4',
    title: 'Tangent measures steepness',
    tags: { subject: 'maths', topic: 'trigonometry', concept: 'tangent-slope', ground: 'g0' },
    layers: [
      { text: '<p>Tangent is different from sine and cosine because it is not trapped between -1 and 1. It can grow without limit.</p>' },
      { text: '<p>The reason is simple: tan &theta; equals sin &theta; divided by cos &theta;. When cos &theta; gets close to zero, tangent becomes enormous.</p>' },
      { text: '<p>On a graph, tangent has vertical walls called asymptotes. The curve rushes upward, breaks, then returns from below.</p>' },
      { text: '<p>Tangent also measures slope. A line at 45 degrees has slope 1, while a near-vertical line has a huge slope.</p>' }
    ]
  },
  1384: {
    act: 'V',
    kicker: 'Trigonometry 2.5',
    title: 'Radians let the circle measure itself',
    tags: { subject: 'maths', topic: 'trigonometry', concept: 'radians', ground: 'g0' },
    layers: [
      { text: '<p>Degrees are useful, but they are a human convention. Radians come from the circle itself, which makes them better for serious maths.</p>' },
      { text: '<p>One radian is the angle made when the arc length on the circle equals the radius. The circle is using its own length to measure turning.</p>' },
      { text: '<p>A full turn is 2&pi; radians. Half a turn is &pi; radians. A quarter turn is &pi;/2 radians.</p>' },
      { text: '<p>Radians make formulas cleaner. Arc length becomes s = r&theta;, and calculus with sine and cosine works without extra conversion factors.</p>' }
    ]
  },
  1385: {
    act: 'III',
    kicker: 'Differentiation 1.0',
    title: 'Differentiation finds slope at a point',
    tags: { subject: 'maths', topic: 'differentiation', concept: 'derivative-as-slope', ground: 'g0' },
    layers: [
      { text: '<p>A straight line has one slope everywhere. A curve changes its steepness from point to point, so the question becomes local.</p>' },
      { text: '<p>Differentiation asks for the slope of a curve at exactly one point. It finds the tangent line that just brushes the curve there.</p>' },
      { text: '<p>For y = x<sup>2</sup>, the slope near x = 3 gets closer to 6 as the measuring interval shrinks smaller and smaller.</p>' },
      { text: '<p>The derivative is the limit of those shrinking slopes. It turns a moving curve into a precise rate of change.</p>' }
    ]
  },
  1386: {
    act: 'III',
    kicker: 'Differentiation 1.1',
    title: 'dx means a tiny change',
    tags: { subject: 'maths', topic: 'differentiation', concept: 'differentials', ground: 'g0' },
    layers: [
      { text: '<p>The symbol dx means a very small change in x. The symbol dy means the matching small change in y.</p>' },
      { text: '<p>The expression dy/dx compares those two changes. It asks how much the output changes when the input is nudged.</p>' },
      { text: '<p>If y = x<sup>2</sup>, then changing x by a tiny amount changes y by roughly 2x times that amount.</p>' },
      { text: '<p>That rough statement becomes exact in the limit. The tiny-change language is the doorway into the derivative.</p>' }
    ]
  },
  1387: {
    act: 'III',
    kicker: 'Differentiation 1.2',
    title: 'The power rule is the first shortcut',
    tags: { subject: 'maths', topic: 'differentiation', concept: 'power-rule', ground: 'g0' },
    layers: [
      { text: '<p>Once the pattern is seen, every derivative does not need to be rebuilt from first principles. The power rule gives the first reliable shortcut.</p>' },
      { text: '<p>For x<sup>n</sup>, bring the power down in front, then reduce the power by one. So x<sup>4</sup> becomes 4x<sup>3</sup>.</p>' },
      { text: '<p>Constants travel along for the ride. The derivative of 5x<sup>4</sup> is 20x<sup>3</sup>, while a constant by itself has slope zero.</p>' },
      { text: '<p>This one rule handles polynomials, roots rewritten as powers, and many expressions that look harder than they really are.</p>' }
    ]
  },
  1388: {
    act: 'III',
    kicker: 'Differentiation 1.3',
    title: 'Products and quotients need their own rules',
    tags: { subject: 'maths', topic: 'differentiation', concept: 'product-quotient-rules', ground: 'g1' },
    layers: [
      { text: '<p>The derivative of a product is not the product of the derivatives. Two changing pieces influence the final change together.</p>' },
      { text: '<p>The product rule adds both contributions: the first changes while the second stays, then the second changes while the first stays.</p>' },
      { text: '<p>Division has its own pattern, called the quotient rule. It keeps track of how the numerator and denominator pull the fraction in different directions.</p>' },
      { text: '<p>These rules matter whenever changing quantities multiply or divide: area, revenue, density, average cost, lens equations, and many physical ratios.</p>' }
    ]
  },
  1389: {
    act: 'III',
    kicker: 'Differentiation 1.4',
    title: 'The chain rule handles layers',
    tags: { subject: 'maths', topic: 'differentiation', concept: 'chain-rule', ground: 'g1' },
    layers: [
      { text: '<p>Many functions are built in layers. First square the input, then multiply, then add, then raise the whole result to another power.</p>' },
      { text: '<p>The chain rule says to differentiate the outside layer, then multiply by the derivative of the inside layer.</p>' },
      { text: '<p>For (3x<sup>2</sup> + 5)<sup>7</sup>, the outside contributes 7(3x<sup>2</sup> + 5)<sup>6</sup>, and the inside contributes 6x.</p>' },
      { text: '<p>This rule is everywhere because real systems are layered. It is also the mathematical engine behind backpropagation in neural networks.</p>' }
    ]
  },
  1390: {
    act: 'III',
    kicker: 'Differentiation 1.5',
    title: 'Derivatives describe changing worlds',
    tags: { subject: 'maths', topic: 'differentiation', concept: 'rates-of-change', ground: 'g1' },
    layers: [
      { text: '<p>Calculus becomes powerful because slopes are not only geometry. They are rates of change hiding inside real situations.</p>' },
      { text: '<p>Velocity is the derivative of position. Acceleration is the derivative of velocity. Power is the rate at which energy is transferred.</p>' },
      { text: '<p>In optimisation, a derivative reveals where a quantity is rising, falling, or flattening out. That helps find maxima and minima.</p>' },
      { text: '<p>From rockets to medicine levels to machine learning loss curves, differentiation gives a disciplined way to ask how fast something is changing.</p>' }
    ]
  },
  1391: {
    act: 'I',
    kicker: 'Optics 1.0',
    title: 'Light can be modelled as rays',
    tags: { subject: 'physics', topic: 'optics', concept: 'ray-model', ground: 'g0' },
    layers: [
      { text: '<p>Light is an electromagnetic wave, but many everyday optical problems can be solved with a simpler model: rays.</p>' },
      { text: '<p>A ray is an imaginary line showing the path light takes. In a uniform medium, that path is treated as straight.</p>' },
      { text: '<p>The model works well when mirrors, lenses, screens, and openings are much larger than the wavelength of visible light.</p>' },
      { text: '<p>That simplification explains pinhole cameras, shadows, mirrors, lenses, prisms, fibre optics, and much of how vision works.</p>' }
    ]
  },
  1392: {
    act: 'I',
    kicker: 'Optics 1.1',
    title: 'Reflection follows one clean rule',
    tags: { subject: 'physics', topic: 'optics', concept: 'law-of-reflection', ground: 'g0' },
    layers: [
      { text: '<p>When light hits a smooth mirror, it bounces in a predictable way. The incoming angle equals the outgoing angle.</p>' },
      { text: '<p>Both angles are measured from the normal, an imaginary line standing perpendicular to the surface at the point of contact.</p>' },
      { text: '<p>A rough surface still obeys the same rule at each tiny patch, but the patches face different directions, so light scatters.</p>' },
      { text: '<p>This difference explains why a mirror forms a clear image while paper can be seen from many angles without behaving like a mirror.</p>' }
    ]
  },
  1393: {
    act: 'I',
    kicker: 'Optics 1.2',
    title: 'Plane mirrors make virtual images',
    tags: { subject: 'physics', topic: 'optics', concept: 'plane-mirror', ground: 'g0' },
    layers: [
      { text: '<p>A flat mirror seems to place the image behind the glass, even though no light is actually coming from behind it.</p>' },
      { text: '<p>The reflected rays enter the eye, and the brain traces them backward in straight lines. Their backward extensions meet behind the mirror.</p>' },
      { text: '<p>That image is virtual: it can be seen, but it cannot be caught on a screen placed behind the mirror.</p>' },
      { text: '<p>The image sits as far behind the mirror as the object sits in front. Same size, upright, but laterally reversed.</p>' }
    ]
  },
  1394: {
    act: 'I',
    kicker: 'Optics 1.3',
    title: 'Refraction bends light at boundaries',
    tags: { subject: 'physics', topic: 'optics', concept: 'refraction', ground: 'g0' },
    layers: [
      { text: '<p>A straw in water looks bent because light changes direction when it crosses from one medium into another.</p>' },
      { text: '<p>The cause is speed. Light travels at different speeds in air, water, glass, and other transparent materials.</p>' },
      { text: '<p>When light enters a slower medium at an angle, it bends toward the normal. When it enters a faster medium, it bends away.</p>' },
      { text: '<p>Refraction is the reason lenses focus, pools look shallower, prisms spread colour, and glasses can correct vision.</p>' }
    ]
  },
  1395: {
    act: 'I',
    kicker: 'Optics 1.4',
    title: 'Snell law measures the bend',
    tags: { subject: 'physics', topic: 'optics', concept: 'snells-law', ground: 'g1' },
    layers: [
      { text: '<p>Refraction has an exact rule. Snell law connects the two angles with the two refractive indices of the materials.</p>' },
      { text: '<p>The equation is n<sub>1</sub> sin &theta;<sub>1</sub> = n<sub>2</sub> sin &theta;<sub>2</sub>. The angles are measured from the normal.</p>' },
      { text: '<p>If light goes from air into water, the refractive index rises, the speed falls, and the ray bends toward the normal.</p>' },
      { text: '<p>Designing lenses, cameras, microscopes, fibre optics, and eye corrections depends on applying this relationship again and again.</p>' }
    ]
  },
  1396: {
    act: 'I',
    kicker: 'Optics 1.5',
    title: 'Lenses focus by bending many rays',
    tags: { subject: 'physics', topic: 'optics', concept: 'lenses', ground: 'g1' },
    layers: [
      { text: '<p>A lens is a shaped transparent object that bends different rays by different amounts, bringing them together or spreading them apart.</p>' },
      { text: '<p>A converging lens is thicker in the middle and can bring parallel rays to a focus. A diverging lens spreads rays outward.</p>' },
      { text: '<p>The focal length tells how strongly a lens bends light. Short focal length means strong bending and a focus close to the lens.</p>' },
      { text: '<p>Cameras, spectacles, microscopes, telescopes, projectors, and the eye all use this controlled bending to form useful images.</p>' }
    ]
  },
  1397: {
    act: 'I',
    kicker: 'Quantitative Chemistry 1.0',
    title: 'The mole is chemistry counting at scale',
    tags: { subject: 'chemistry', topic: 'quantitative-chemistry', concept: 'mole', ground: 'g0' },
    layers: [
      { text: '<p>Chemistry needs to count atoms and molecules, but single particles are far too small to count one by one in a lab.</p>' },
      { text: '<p>The mole solves that scale problem. One mole means 6.022 &times; 10<sup>23</sup> particles, whether those particles are atoms, ions, or molecules.</p>' },
      { text: '<p>It is a counting unit, like a dozen, but built for the atomic world. The number is huge because atoms are tiny.</p>' },
      { text: '<p>Once the mole is understood as counting, chemical equations become recipes for particle groups rather than mysterious symbol strings.</p>' }
    ]
  },
  1398: {
    act: 'I',
    kicker: 'Quantitative Chemistry 1.1',
    title: 'Chemists count by weighing',
    tags: { subject: 'chemistry', topic: 'quantitative-chemistry', concept: 'molar-mass', ground: 'g0' },
    layers: [
      { text: '<p>No chemist counts a mole of atoms with tweezers. The practical method is to count by mass.</p>' },
      { text: '<p>The periodic table gives the molar mass: the mass in grams of one mole of that element or compound.</p>' },
      { text: '<p>Carbon has a molar mass close to 12 g/mol. So 12 grams of carbon contains about one mole of carbon atoms.</p>' },
      { text: '<p>This turns an invisible count into a measurement a lab balance can handle. Weighing becomes counting.</p>' }
    ]
  },
  1399: {
    act: 'I',
    kicker: 'Quantitative Chemistry 1.2',
    title: 'n equals m over M is the bridge',
    tags: { subject: 'chemistry', topic: 'quantitative-chemistry', concept: 'moles-mass-equation', ground: 'g0' },
    layers: [
      { text: '<p>The bridge between mass and amount is n = m / M. Amount in moles equals mass divided by molar mass.</p>' },
      { text: '<p>If sodium hydroxide has molar mass 40 g/mol, then 80 grams of it contains 2 moles.</p>' },
      { text: '<p>The mass is what sits on the balance. The molar mass comes from the formula and the periodic table.</p>' },
      { text: '<p>This equation is one of chemistry&apos;s daily workhorses because reactions are planned in moles, not just grams.</p>' }
    ]
  },
  1400: {
    act: 'I',
    kicker: 'Quantitative Chemistry 1.3',
    title: 'Chemical equations are mole recipes',
    tags: { subject: 'chemistry', topic: 'quantitative-chemistry', concept: 'stoichiometry', ground: 'g0' },
    layers: [
      { text: '<p>The large numbers in a balanced chemical equation are not decoration. They are ratios between reacting amounts.</p>' },
      { text: '<p>The equation 2H<sub>2</sub> + O<sub>2</sub> -> 2H<sub>2</sub>O says two moles of hydrogen react with one mole of oxygen.</p>' },
      { text: '<p>Those ratios let a chemist predict how much product can form from the amounts placed in the reaction vessel.</p>' },
      { text: '<p>The usual workflow is mass to moles, mole ratio through the equation, then moles back to mass for the product.</p>' }
    ]
  },
  1401: {
    act: 'I',
    kicker: 'Quantitative Chemistry 1.4',
    title: 'One reactant can run out first',
    tags: { subject: 'chemistry', topic: 'quantitative-chemistry', concept: 'limiting-reactant', ground: 'g1' },
    layers: [
      { text: '<p>A reaction stops when one required reactant runs out. The remaining reactants may still be present, but the recipe can no longer continue.</p>' },
      { text: '<p>That first exhausted reactant is called the limiting reactant. It limits the maximum amount of product that can be made.</p>' },
      { text: '<p>This is like building sandwiches with bread and cheese. Extra cheese does nothing if the bread is gone.</p>' },
      { text: '<p>Limiting reactant calculations protect labs and factories from wasting material, overestimating yield, or misunderstanding why a reaction stopped.</p>' }
    ]
  },
  1402: {
    act: 'I',
    kicker: 'Quantitative Chemistry 1.5',
    title: 'Formulas can be reverse engineered',
    tags: { subject: 'chemistry', topic: 'quantitative-chemistry', concept: 'empirical-molecular-formula', ground: 'g1' },
    layers: [
      { text: '<p>Moles also help chemists work backward from measurements to a formula. Mass percentages alone do not show the true particle ratio.</p>' },
      { text: '<p>Convert each element&apos;s mass into moles, then compare the mole amounts. The simplest whole-number ratio gives the empirical formula.</p>' },
      { text: '<p>If the real molecular mass is larger than the empirical formula mass, the empirical formula is multiplied to reach the molecular formula.</p>' },
      { text: '<p>This is how an unknown substance can be identified from careful measurements rather than from appearance alone.</p>' }
    ]
  }
};
