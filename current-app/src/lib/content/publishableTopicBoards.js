export const PUBLISHABLE_TOPIC_BOARDS = {
  1313: {
    act: 'I',
    kicker: 'Exponents 1.0',
    title: 'Exponents are compact multiplication',
    tags: { subject: 'maths', topic: 'exponents-logarithms', concept: 'exponents', ground: 'g0' },
    layers: [
      { text: '<p>An exponent is a shortcut for repeated multiplication. It tells how many times a number is used as a factor.</p>' },
      { text: '<p>So 2<sup>4</sup> means 2 x 2 x 2 x 2. The base is 2, and the exponent is 4.</p>' },
      { text: '<p>This notation keeps large patterns readable. It replaces long multiplication chains with a small, precise instruction.</p>' },
      { text: '<p>Once exponents are understood as repeated multiplication, the laws of exponents stop feeling like magic tricks.</p>' }
    ]
  },
  1314: {
    act: 'I',
    kicker: 'Exponents 1.1',
    title: 'Multiplying powers adds exponents',
    tags: { subject: 'maths', topic: 'exponents-logarithms', concept: 'exponent-laws', ground: 'g0' },
    layers: [
      { text: '<p>When powers have the same base, multiplying them joins their multiplication chains into one longer chain.</p>' },
      { text: '<p>For example, 3<sup>2</sup> x 3<sup>4</sup> means two 3s followed by four more 3s.</p>' },
      { text: '<p>That gives six 3s in total, so 3<sup>2</sup> x 3<sup>4</sup> = 3<sup>6</sup>.</p>' },
      { text: '<p>The rule is simple: same base, multiply powers, add exponents.</p>' }
    ]
  },
  1315: {
    act: 'I',
    kicker: 'Exponents 1.2',
    title: 'Negative exponents mean reciprocal',
    tags: { subject: 'maths', topic: 'exponents-logarithms', concept: 'negative-exponents', ground: 'g0' },
    layers: [
      { text: '<p>A negative exponent does not make the number negative. It moves the power to the other side of a fraction.</p>' },
      { text: '<p>So 2<sup>-3</sup> means 1 over 2<sup>3</sup>, which is 1/8.</p>' },
      { text: '<p>This follows the same exponent pattern. Dividing by 2 again and again moves below 1.</p>' },
      { text: '<p>Negative exponents are a clean way to write tiny repeated divisions.</p>' }
    ]
  },
  1316: {
    act: 'I',
    kicker: 'Exponents 1.3',
    title: 'Fractional exponents are roots',
    tags: { subject: 'maths', topic: 'exponents-logarithms', concept: 'fractional-exponents', ground: 'g1' },
    layers: [
      { text: '<p>A fractional exponent connects powers with roots. The denominator tells which root to take.</p>' },
      { text: '<p>For example, x<sup>1/2</sup> means the square root of x. It is another way to write sqrt(x).</p>' },
      { text: '<p>The expression x<sup>1/3</sup> means the cube root of x, because cubing reverses that operation.</p>' },
      { text: '<p>This makes roots part of the same exponent language instead of a separate topic.</p>' }
    ]
  },
  1317: {
    act: 'I',
    kicker: 'Exponents 1.4',
    title: 'Exponential growth multiplies',
    tags: { subject: 'maths', topic: 'exponents-logarithms', concept: 'exponential-growth', ground: 'g1' },
    layers: [
      { text: '<p>Linear growth adds the same amount each step. Exponential growth multiplies by the same factor each step.</p>' },
      { text: '<p>A population that doubles goes 1, 2, 4, 8, 16. Each new amount becomes the base for the next jump.</p>' },
      { text: '<p>That is why exponential curves can look quiet at first and then rise suddenly.</p>' },
      { text: '<p>Compound interest, viral spread, and chain reactions all use this multiplication pattern.</p>' }
    ]
  },
  1318: {
    act: 'I',
    kicker: 'Exponents 1.5',
    title: 'Exponential decay shrinks by a factor',
    tags: { subject: 'maths', topic: 'exponents-logarithms', concept: 'exponential-decay', ground: 'g1' },
    layers: [
      { text: '<p>Exponential decay is the same pattern in reverse. Instead of multiplying upward, each step keeps a fixed fraction.</p>' },
      { text: '<p>If something halves each hour, 80 becomes 40, then 20, then 10.</p>' },
      { text: '<p>The amount never falls by the same subtraction. It falls by the same proportion.</p>' },
      { text: '<p>Radioactive decay, cooling, and medicine leaving the bloodstream often follow this shape.</p>' }
    ]
  },
  1319: {
    act: 'I',
    kicker: 'Logs 1.0',
    title: 'A logarithm asks what power',
    tags: { subject: 'maths', topic: 'exponents-logarithms', concept: 'logarithms', ground: 'g1' },
    layers: [
      { text: '<p>A logarithm is the reverse question of an exponent. It asks which power produced the number.</p>' },
      { text: '<p>If 10<sup>3</sup> = 1000, then log<sub>10</sub>(1000) = 3.</p>' },
      { text: '<p>The base tells which number was being powered. The answer tells how many powers were needed.</p>' },
      { text: '<p>Logs are not new arithmetic. They are exponents read backward.</p>' }
    ]
  },
  1320: {
    act: 'I',
    kicker: 'Logs 1.1',
    title: 'Logs turn multiplication into addition',
    tags: { subject: 'maths', topic: 'exponents-logarithms', concept: 'log-laws', ground: 'g1' },
    layers: [
      { text: '<p>Because powers add when matching bases multiply, logarithms can turn multiplication into addition.</p>' },
      { text: '<p>That is why log(ab) becomes log(a) + log(b), when the base is the same.</p>' },
      { text: '<p>The log is reading the hidden exponents behind the numbers.</p>' },
      { text: '<p>This is why logarithms became a powerful calculation tool long before calculators existed.</p>' }
    ]
  },
  1321: {
    act: 'I',
    kicker: 'Logs 1.2',
    title: 'The natural base e',
    tags: { subject: 'maths', topic: 'exponents-logarithms', concept: 'natural-exponential', ground: 'g1' },
    layers: [
      { text: '<p>The number e appears when growth is compounded continuously instead of in separate jumps.</p>' },
      { text: '<p>It is about 2.718, but the exact decimal is less important than the behaviour it captures.</p>' },
      { text: '<p>The function e<sup>x</sup> is special because its rate of change matches itself.</p>' },
      { text: '<p>That makes e the natural language of growth, decay, cooling, charging, and many physical systems.</p>' }
    ]
  },
  1322: {
    act: 'I',
    kicker: 'Logs 1.3',
    title: 'Exponents and logs are mirrors',
    tags: { subject: 'maths', topic: 'exponents-logarithms', concept: 'inverse-functions', ground: 'g1' },
    layers: [
      { text: '<p>Exponential functions and logarithmic functions undo each other.</p>' },
      { text: '<p>If an exponential function sends 3 to 1000, the matching logarithm sends 1000 back to 3.</p>' },
      { text: '<p>On a graph, they mirror each other across the line y = x.</p>' },
      { text: '<p>This inverse relationship is what lets logs solve equations where the unknown sits in the exponent.</p>' }
    ]
  },
  1323: {
    act: 'I',
    kicker: 'Electricity 1.0',
    title: 'Charge is the thing that moves',
    tags: { subject: 'physics', topic: 'electricity-circuits', concept: 'charge', ground: 'g0' },
    layers: [
      { text: '<p>Electricity begins with charge. Charge is a property of particles that lets them push and pull through electric forces.</p>' },
      { text: '<p>Electrons carry negative charge. Protons carry positive charge. In metal wires, the mobile charges are mostly electrons.</p>' },
      { text: '<p>A circuit is not made from mysterious energy fluid. It is organised charge movement through a conducting path.</p>' },
      { text: '<p>Once charge can move, current, voltage, and resistance become easier to understand.</p>' }
    ]
  },
  1324: {
    act: 'I',
    kicker: 'Electricity 1.1',
    title: 'Current is charge flow',
    tags: { subject: 'physics', topic: 'electricity-circuits', concept: 'current', ground: 'g0' },
    layers: [
      { text: '<p>Electric current measures how much charge passes a point each second.</p>' },
      { text: '<p>The unit is the ampere. One ampere means one coulomb of charge passing each second.</p>' },
      { text: '<p>In circuit diagrams, current is treated as flowing around the loop through every component on its path.</p>' },
      { text: '<p>Current is not used up by a bulb. Energy is transferred, but charge keeps circulating.</p>' }
    ]
  },
  1325: {
    act: 'I',
    kicker: 'Electricity 1.2',
    title: 'Voltage is energy per charge',
    tags: { subject: 'physics', topic: 'electricity-circuits', concept: 'voltage', ground: 'g0' },
    layers: [
      { text: '<p>Voltage tells how much energy each unit of charge gains or loses between two points.</p>' },
      { text: '<p>A battery gives charges energy. A bulb or resistor transfers that energy into light, heat, or another form.</p>' },
      { text: '<p>Voltage is measured across components, not through them.</p>' },
      { text: '<p>Thinking of voltage as energy per charge is cleaner than thinking of it only as a push.</p>' }
    ]
  },
  1326: {
    act: 'I',
    kicker: 'Electricity 1.3',
    title: 'Resistance slows current',
    tags: { subject: 'physics', topic: 'electricity-circuits', concept: 'resistance', ground: 'g0' },
    layers: [
      { text: '<p>Resistance describes how strongly a component opposes the movement of charge.</p>' },
      { text: '<p>A thin wire, long wire, hot wire, or poor conductor usually has higher resistance.</p>' },
      { text: '<p>Resistance does not destroy charge. It transfers electrical energy into other forms, often heat.</p>' },
      { text: '<p>This is why resistors are useful: they control current and manage energy transfer.</p>' }
    ]
  },
  1327: {
    act: 'I',
    kicker: 'Electricity 1.4',
    title: 'Ohm law links the three',
    tags: { subject: 'physics', topic: 'electricity-circuits', concept: 'ohms-law', ground: 'g0' },
    layers: [
      { text: '<p>Ohm law links voltage, current, and resistance with a simple relationship: V = IR.</p>' },
      { text: '<p>If resistance stays fixed, increasing voltage increases current.</p>' },
      { text: '<p>If voltage stays fixed, increasing resistance reduces current.</p>' },
      { text: '<p>The equation is simple, but it becomes the working grammar of basic circuit analysis.</p>' }
    ]
  },
  1328: {
    act: 'I',
    kicker: 'Electricity 1.5',
    title: 'Series circuits share current',
    tags: { subject: 'physics', topic: 'electricity-circuits', concept: 'series-circuits', ground: 'g1' },
    layers: [
      { text: '<p>In a series circuit, components sit one after another on a single path.</p>' },
      { text: '<p>The same current passes through every component because there is nowhere else for the charge to go.</p>' },
      { text: '<p>The supply voltage is shared between the components.</p>' },
      { text: '<p>Add more resistors in series, and the total resistance rises. The current usually falls.</p>' }
    ]
  },
  1329: {
    act: 'I',
    kicker: 'Electricity 1.6',
    title: 'Parallel circuits share voltage',
    tags: { subject: 'physics', topic: 'electricity-circuits', concept: 'parallel-circuits', ground: 'g1' },
    layers: [
      { text: '<p>In a parallel circuit, the current has more than one path.</p>' },
      { text: '<p>Each branch gets the full supply voltage, because each branch connects across the same two points.</p>' },
      { text: '<p>The total current splits between branches and then recombines.</p>' },
      { text: '<p>This is why home wiring uses parallel branches: one device can turn off while others keep working.</p>' }
    ]
  },
  1330: {
    act: 'I',
    kicker: 'Electricity 1.7',
    title: 'Power is energy transfer rate',
    tags: { subject: 'physics', topic: 'electricity-circuits', concept: 'electrical-power', ground: 'g1' },
    layers: [
      { text: '<p>Electrical power tells how quickly electrical energy is transferred into another form.</p>' },
      { text: '<p>The basic equation is P = IV: power equals current times voltage.</p>' },
      { text: '<p>A high-power heater transfers energy quickly. A small LED transfers energy much more slowly.</p>' },
      { text: '<p>Power connects circuit measurements to real effects: heat, light, motion, and sound.</p>' }
    ]
  },
  1331: {
    act: 'I',
    kicker: 'Electricity 1.8',
    title: 'Kirchhoff rules keep accounts',
    tags: { subject: 'physics', topic: 'electricity-circuits', concept: 'kirchhoff-rules', ground: 'g1' },
    layers: [
      { text: '<p>Kirchhoff current rule says charge does not pile up at a junction.</p>' },
      { text: '<p>Current entering a junction must equal current leaving it.</p>' },
      { text: '<p>Kirchhoff voltage rule says energy is conserved around a closed loop.</p>' },
      { text: '<p>Together, these rules turn messy circuits into bookkeeping: charge in, charge out, energy gained, energy spent.</p>' }
    ]
  },
  1332: {
    act: 'I',
    kicker: 'Electricity 1.9',
    title: 'Capacitors store separated charge',
    tags: { subject: 'physics', topic: 'electricity-circuits', concept: 'capacitance', ground: 'g1' },
    layers: [
      { text: '<p>A capacitor stores energy by separating positive and negative charge on two conducting plates.</p>' },
      { text: '<p>It does not store charge by creating extra charge. It separates charge already present in the circuit.</p>' },
      { text: '<p>When connected, a capacitor can charge, hold energy briefly, and then discharge.</p>' },
      { text: '<p>That makes capacitors useful for timing, smoothing, filtering, and short bursts of stored electrical energy.</p>' }
    ]
  },
  1333: {
    act: 'I',
    kicker: 'Chemistry 1.0',
    title: 'Isotopes are the same element with different mass',
    tags: { subject: 'chemistry', topic: 'structure-reactions', concept: 'isotopes', ground: 'g0' },
    layers: [
      { text: '<p>Atoms of the same element always have the same number of protons.</p>' },
      { text: '<p>Isotopes are atoms of that element with different numbers of neutrons.</p>' },
      { text: '<p>Carbon-12 and carbon-14 are both carbon because both have six protons.</p>' },
      { text: '<p>The neutron difference changes mass, but it does not change the element identity.</p>' }
    ]
  },
  1334: {
    act: 'I',
    kicker: 'Chemistry 1.1',
    title: 'Electron shells explain reactivity',
    tags: { subject: 'chemistry', topic: 'structure-reactions', concept: 'electron-shells', ground: 'g0' },
    layers: [
      { text: '<p>Electrons sit around the nucleus in energy levels often called shells.</p>' },
      { text: '<p>The outer shell matters most in ordinary chemistry.</p>' },
      { text: '<p>Atoms react because their outer electrons can be lost, gained, or shared.</p>' },
      { text: '<p>So chemical behaviour is mostly a story about the outer shell.</p>' }
    ]
  },
  1335: {
    act: 'I',
    kicker: 'Chemistry 1.2',
    title: 'Ions are charged atoms',
    tags: { subject: 'chemistry', topic: 'structure-reactions', concept: 'ions', ground: 'g0' },
    layers: [
      { text: '<p>An atom becomes an ion when it loses or gains electrons.</p>' },
      { text: '<p>Losing electrons leaves more protons than electrons, so the ion becomes positive.</p>' },
      { text: '<p>Gaining electrons gives more electrons than protons, so the ion becomes negative.</p>' },
      { text: '<p>The nucleus has not changed. The charge changed because the electron count changed.</p>' }
    ]
  },
  1336: {
    act: 'I',
    kicker: 'Chemistry 1.3',
    title: 'Ionic bonding is give and take',
    tags: { subject: 'chemistry', topic: 'structure-reactions', concept: 'ionic-bonding', ground: 'g0' },
    layers: [
      { text: '<p>Ionic bonding begins when one atom transfers electrons to another.</p>' },
      { text: '<p>The metal atom usually loses electrons and becomes a positive ion.</p>' },
      { text: '<p>The non-metal atom usually gains electrons and becomes a negative ion.</p>' },
      { text: '<p>The opposite charges attract, pulling the ions into a repeating giant lattice.</p>' }
    ]
  },
  1337: {
    act: 'I',
    kicker: 'Chemistry 1.4',
    title: 'Covalent bonding is sharing',
    tags: { subject: 'chemistry', topic: 'structure-reactions', concept: 'covalent-bonding', ground: 'g0' },
    layers: [
      { text: '<p>Covalent bonding happens when atoms share pairs of electrons.</p>' },
      { text: '<p>This usually happens between non-metal atoms that both need outer-shell electrons.</p>' },
      { text: '<p>A shared pair is attracted to both nuclei, holding the atoms together.</p>' },
      { text: '<p>Water, carbon dioxide, methane, glucose, and DNA all depend on covalent bonding.</p>' }
    ]
  },
  1338: {
    act: 'I',
    kicker: 'Chemistry 1.5',
    title: 'Metallic bonding creates a sea of electrons',
    tags: { subject: 'chemistry', topic: 'structure-reactions', concept: 'metallic-bonding', ground: 'g0' },
    layers: [
      { text: '<p>In a metal, outer electrons are not locked to one atom.</p>' },
      { text: '<p>They move through a lattice of positive metal ions.</p>' },
      { text: '<p>This sea of mobile electrons holds the structure together.</p>' },
      { text: '<p>It also explains why metals conduct electricity, conduct heat, and bend without shattering.</p>' }
    ]
  },
  1339: {
    act: 'I',
    kicker: 'Chemistry 1.6',
    title: 'Molecular shape comes from electron repulsion',
    tags: { subject: 'chemistry', topic: 'structure-reactions', concept: 'molecular-shape', ground: 'g1' },
    layers: [
      { text: '<p>Electron pairs around a central atom repel each other.</p>' },
      { text: '<p>They arrange themselves as far apart as possible in three-dimensional space.</p>' },
      { text: '<p>That simple repulsion predicts shapes such as linear, bent, trigonal planar, and tetrahedral.</p>' },
      { text: '<p>Shape matters because molecules react and interact according to their actual geometry.</p>' }
    ]
  },
  1340: {
    act: 'I',
    kicker: 'Chemistry 1.7',
    title: 'Polarity means uneven sharing',
    tags: { subject: 'chemistry', topic: 'structure-reactions', concept: 'polarity', ground: 'g1' },
    layers: [
      { text: '<p>A covalent bond can share electrons unevenly.</p>' },
      { text: '<p>The atom pulling harder becomes slightly negative, while the other side becomes slightly positive.</p>' },
      { text: '<p>This creates polarity, a small separation of charge inside the molecule.</p>' },
      { text: '<p>Polarity helps explain boiling points, solubility, and why water is such an effective solvent.</p>' }
    ]
  },
  1341: {
    act: 'I',
    kicker: 'Chemistry 1.8',
    title: 'A reaction rearranges atoms',
    tags: { subject: 'chemistry', topic: 'structure-reactions', concept: 'chemical-reactions', ground: 'g0' },
    layers: [
      { text: '<p>A chemical reaction does not create atoms from nothing.</p>' },
      { text: '<p>It breaks old bonds, rearranges atoms, and forms new bonds.</p>' },
      { text: '<p>The substances at the start are reactants. The substances formed are products.</p>' },
      { text: '<p>The atom count is conserved, but the arrangement changes. That is why new substances appear.</p>' }
    ]
  },
  1342: {
    act: 'I',
    kicker: 'Chemistry 1.9',
    title: 'Balancing equations protects atoms',
    tags: { subject: 'chemistry', topic: 'structure-reactions', concept: 'balancing-equations', ground: 'g0' },
    layers: [
      { text: '<p>A chemical equation must have the same number of each atom on both sides.</p>' },
      { text: '<p>Balancing does not change formulas. It changes how many formula units take part.</p>' },
      { text: '<p>Coefficients go in front of formulas because they count whole particles.</p>' },
      { text: '<p>Balanced equations are conservation of matter written in chemical language.</p>' }
    ]
  },
  1343: {
    act: 'II',
    kicker: 'Thermodynamics 1.0',
    title: 'Temperature is not heat',
    tags: { subject: 'physics', topic: 'thermodynamics-heat', concept: 'temperature-vs-heat', ground: 'g0' },
    layers: [
      { text: '<p>Temperature and heat sound similar, but they answer different questions. Temperature describes how energetically particles are moving on average. Heat describes energy transferred because one place is warmer than another.</p>' },
      { text: '<p>A tiny spark can be extremely hot but carry very little energy. A warm bath has a lower temperature, but far more particles, so it can transfer much more heat.</p>' },
      { text: '<p>Temperature is measured in kelvin or degrees Celsius. Heat is measured in joules, the same unit used for energy and work.</p>' },
      { text: '<p>This distinction matters everywhere in thermal physics. A thermometer reads temperature. It does not tell the full amount of thermal energy available to move, warm, melt, or burn something.</p>' }
    ]
  },
  1344: {
    act: 'II',
    kicker: 'Thermodynamics 1.1',
    title: 'Kelvin starts at the cold limit',
    tags: { subject: 'physics', topic: 'thermodynamics-heat', concept: 'kelvin-scale; absolute-zero', ground: 'g0' },
    layers: [
      { text: '<p>Celsius is convenient for daily life: water freezes near 0&deg;C and boils near 100&deg;C at normal pressure. Physics usually needs a scale with a deeper zero.</p>' },
      { text: '<p>The kelvin scale starts at absolute zero, the lowest possible temperature. The size of one kelvin is the same as one Celsius degree, but the starting point is different.</p>' },
      { text: '<p>The conversion is simple: T in kelvin = T in Celsius + 273.15. Room temperature is about 20&deg;C, or about 293 K.</p>' },
      { text: '<p>Gas laws and engine formulas use kelvin because they depend on absolute temperature. Using Celsius inside those equations can produce negative pressures or volumes that make no physical sense.</p>' }
    ]
  },
  1345: {
    act: 'II',
    kicker: 'Thermodynamics 1.2',
    title: 'Heating usually makes things expand',
    tags: { subject: 'physics', topic: 'thermodynamics-heat', concept: 'thermal-expansion', ground: 'g0' },
    layers: [
      { text: '<p>Most materials expand when heated. Their particles vibrate more strongly, and the average spacing between neighbouring particles becomes slightly larger.</p>' },
      { text: '<p>The effect is small for a spoon or a coin, but it becomes serious for railway tracks, bridges, pipes, and power lines stretched across long distances.</p>' },
      { text: '<p>Linear expansion is written as &Delta;L = alpha L0 &Delta;T. The expansion depends on the material, the original length, and the temperature change.</p>' },
      { text: '<p>Engineers leave expansion gaps because the material will move whether anyone wants it to or not. Ignoring thermal expansion can bend rails, crack concrete, and jam moving parts.</p>' }
    ]
  },
  1346: {
    act: 'II',
    kicker: 'Thermodynamics 1.3',
    title: 'Specific heat is thermal stubbornness',
    tags: { subject: 'physics', topic: 'thermodynamics-heat', concept: 'specific-heat-capacity; Q=mc-deltaT', ground: 'g0' },
    layers: [
      { text: '<p>Different materials need different amounts of energy to change temperature. Water is especially stubborn: it takes a lot of energy to warm it even by one degree.</p>' },
      { text: '<p>That is why a metal spoon heats quickly in hot tea while the tea itself changes temperature slowly. Metals often have lower specific heat capacity than water.</p>' },
      { text: '<p>The key equation is Q = mc&Delta;T. Heat transferred equals mass times specific heat capacity times temperature change.</p>' },
      { text: '<p>Specific heat explains kettles, cooking pans, car radiators, oceans, and climate buffering. A material with high specific heat can absorb a lot of energy before its temperature shifts much.</p>' }
    ]
  },
  1347: {
    act: 'II',
    kicker: 'Thermodynamics 1.4',
    title: 'Latent heat changes state',
    tags: { subject: 'physics', topic: 'thermodynamics-heat', concept: 'latent-heat; phase-change', ground: 'g0' },
    layers: [
      { text: '<p>When ice melts, its temperature stays at 0&deg;C until the melting is complete. Energy is still entering, but it is not raising the temperature.</p>' },
      { text: '<p>That energy is used to loosen the structure holding the solid together. During boiling, energy separates liquid molecules into gas instead of simply making them warmer.</p>' },
      { text: '<p>The equation for a phase change is Q = mL. The symbol L is latent heat, the energy needed per kilogram to change state.</p>' },
      { text: '<p>Latent heat is why steam can burn badly. Steam at 100&deg;C releases a large extra store of energy when it condenses back into liquid water.</p>' }
    ]
  },
  1348: {
    act: 'II',
    kicker: 'Thermodynamics 1.5',
    title: 'Calorimetry balances heat',
    tags: { subject: 'physics', topic: 'thermodynamics-heat', concept: 'calorimetry; thermal-equilibrium', ground: 'g0' },
    layers: [
      { text: '<p>Calorimetry is the practice of measuring heat transfer. The usual setup is simple: put warm and cool things together, insulate them, and watch the final temperature.</p>' },
      { text: '<p>A hot metal block dropped into cooler water loses heat. The water gains heat. If the cup is well insulated, those amounts should balance.</p>' },
      { text: '<p>The bookkeeping idea is heat lost = heat gained. In symbols, the total heat change across the insulated system is approximately zero.</p>' },
      { text: '<p>This is how unknown specific heat capacities are measured. It also teaches the habit thermodynamics uses constantly: track where energy enters, where it leaves, and where it is stored.</p>' }
    ]
  },
  1349: {
    act: 'II',
    kicker: 'Thermodynamics 1.6',
    title: 'Matter changes state by rearranging particles',
    tags: { subject: 'physics', topic: 'thermodynamics-heat', concept: 'states-of-matter; particle-model', ground: 'g0' },
    layers: [
      { text: '<p>Solid, liquid, and gas are not different kinds of substance. They are different arrangements and motions of the same particles.</p>' },
      { text: '<p>In a solid, particles vibrate around fixed positions. In a liquid, they stay close but slide past each other. In a gas, they spread out and move freely.</p>' },
      { text: '<p>Temperature measures the average kinetic energy of this random motion. Heating usually makes the particle motion stronger.</p>' },
      { text: '<p>The particle model explains melting, boiling, evaporation, diffusion, and pressure. It is simple, but it gives a microscopic picture behind the everyday behaviour of matter.</p>' }
    ]
  },
  1350: {
    act: 'II',
    kicker: 'Thermodynamics 1.7',
    title: 'An ideal gas is a useful simplification',
    tags: { subject: 'physics', topic: 'thermodynamics-heat', concept: 'ideal-gas-model', ground: 'g0' },
    layers: [
      { text: '<p>Real gases are complicated. Molecules have size, attract each other slightly, and behave differently near condensation. The ideal gas model strips those details away.</p>' },
      { text: '<p>It treats gas particles as tiny points moving randomly, colliding elastically, and exerting no forces except during collisions.</p>' },
      { text: '<p>No gas is perfectly ideal. Many gases behave close to ideal when pressure is low and temperature is reasonably high.</p>' },
      { text: '<p>The model is valuable because it turns a messy molecular swarm into clear relationships between pressure, volume, temperature, and amount of gas.</p>' }
    ]
  },
  1351: {
    act: 'II',
    kicker: 'Thermodynamics 1.8',
    title: 'The gas laws show simple patterns',
    tags: { subject: 'physics', topic: 'thermodynamics-heat', concept: 'boyles-law; charles-law; pressure-law', ground: 'g0' },
    layers: [
      { text: '<p>The early gas laws each freeze one variable and watch how the others change. That makes the pattern easier to see.</p>' },
      { text: '<p>Boyle law says that at constant temperature, squeezing a gas into a smaller volume raises its pressure. A bicycle pump is the everyday version.</p>' },
      { text: '<p>Charles law says that at constant pressure, heating a gas makes its volume increase. The pressure law says that in a fixed container, heating raises pressure.</p>' },
      { text: '<p>Together, these laws say gases are not random in their large-scale behaviour. Pressure, volume, and absolute temperature move in predictable linked ways.</p>' }
    ]
  },
  1352: {
    act: 'II',
    kicker: 'Thermodynamics 1.9',
    title: 'PV = nRT ties the gas together',
    tags: { subject: 'physics', topic: 'thermodynamics-heat', concept: 'ideal-gas-equation; PV=nRT', ground: 'g0' },
    layers: [
      { text: '<p>The ideal gas equation combines the gas laws into one compact relationship: PV = nRT.</p>' },
      { text: '<p>P is pressure, V is volume, n is the amount of gas in moles, R is the gas constant, and T is absolute temperature in kelvin.</p>' },
      { text: '<p>Given any three of those quantities, the fourth can be found. The equation also helps reason qualitatively before calculating.</p>' },
      { text: '<p>If a sealed tyre warms up, volume is almost fixed and n is fixed, so pressure rises. The equation is not only arithmetic; it is a map of cause and effect.</p>' }
    ]
  },
  1353: {
    act: 'II',
    kicker: 'Thermodynamics 1.10',
    title: 'Gas pressure comes from collisions',
    tags: { subject: 'physics', topic: 'thermodynamics-heat', concept: 'kinetic-theory; gas-pressure', ground: 'g1' },
    layers: [
      { text: '<p>A gas pushes on its container because its molecules keep hitting the walls. Each collision is tiny, but the number of collisions is enormous.</p>' },
      { text: '<p>Heating the gas makes molecules move faster. Faster molecules hit the walls more often and with greater impulse, so the pressure increases if the volume is fixed.</p>' },
      { text: '<p>Kinetic theory links the microscopic view to the macroscopic gas law. The average molecular kinetic energy depends only on absolute temperature.</p>' },
      { text: '<p>This is the bridge from invisible motion to readable measurements. A pressure gauge is indirectly reading the violence of molecular impacts inside the container.</p>' }
    ]
  },
  1354: {
    act: 'II',
    kicker: 'Thermodynamics 1.11',
    title: 'The first law keeps energy honest',
    tags: { subject: 'physics', topic: 'thermodynamics-heat', concept: 'first-law; internal-energy', ground: 'g1' },
    layers: [
      { text: '<p>The first law of thermodynamics is conservation of energy applied to heat, work, and internal energy.</p>' },
      { text: '<p>A gas can gain energy by being heated. It can lose energy by pushing a piston outward and doing work on the outside world.</p>' },
      { text: '<p>One common sign convention writes &Delta;U = Q - W. Internal energy rises when heat is added, and falls when the system does work.</p>' },
      { text: '<p>The law prevents magical thinking. Energy does not appear or vanish inside an engine, kettle, refrigerator, or body. It changes account: heat, work, or internal storage.</p>' }
    ]
  },
  1355: {
    act: 'II',
    kicker: 'Thermodynamics 1.12',
    title: 'Processes describe the path',
    tags: { subject: 'physics', topic: 'thermodynamics-heat', concept: 'thermodynamic-processes; PV-diagrams', ground: 'g1' },
    layers: [
      { text: '<p>Thermodynamics cares not only about the starting and ending states, but also about the path taken between them.</p>' },
      { text: '<p>An isothermal process keeps temperature constant. An adiabatic process exchanges no heat. An isobaric process keeps pressure constant. An isochoric process keeps volume constant.</p>' },
      { text: '<p>These names are labels for controlled changes. They make gas problems readable by saying which quantity is being held still.</p>' },
      { text: '<p>On a pressure-volume diagram, the area under the curve represents work done by the gas. The shape of the path matters, not just the endpoints.</p>' }
    ]
  },
  1356: {
    act: 'II',
    kicker: 'Thermodynamics 1.13',
    title: 'Entropy gives time a direction',
    tags: { subject: 'physics', topic: 'thermodynamics-heat', concept: 'second-law; entropy', ground: 'g1' },
    layers: [
      { text: '<p>Some processes happen naturally in one direction. Hot coffee cools in a room. It does not gather scattered heat from the room and become hotter by itself.</p>' },
      { text: '<p>The second law says entropy tends to increase in an isolated system. Energy becomes more spread out and less available for organised work.</p>' },
      { text: '<p>Entropy is often introduced as disorder, but the sharper idea is energy dispersal and the number of microscopic arrangements available.</p>' },
      { text: '<p>This is why time has a thermal arrow. Broken cups do not reassemble, perfume spreads through a room, and useful energy gradually becomes harder to recover.</p>' }
    ]
  },
  1357: {
    act: 'II',
    kicker: 'Thermodynamics 1.14',
    title: 'Heat engines turn heat into work',
    tags: { subject: 'physics', topic: 'thermodynamics-heat', concept: 'heat-engine; carnot-efficiency', ground: 'g1' },
    layers: [
      { text: '<p>A heat engine takes energy from a hot source, turns part of it into useful work, and dumps the rest into a colder place.</p>' },
      { text: '<p>Car engines, steam turbines, and power stations all follow this basic pattern. Heat enters, work comes out, and waste heat must leave.</p>' },
      { text: '<p>The Carnot limit gives the best possible efficiency between two temperatures: eta = 1 - Tc/Th, with temperatures measured in kelvin.</p>' },
      { text: '<p>No real engine reaches that ideal. The point is not to build perfection, but to know the ceiling. Temperature difference is what makes heat engines possible.</p>' }
    ]
  },
  1358: {
    act: 'II',
    kicker: 'AI-era computing 1.0',
    title: 'A computer is a filing system with a brain attached',
    tags: { subject: 'computing', topic: 'ai-era-computing', concept: 'files-folders-computation', ground: 'g0' },
    layers: [
      { text: '<p>Before code, cloud, or AI, a computer has to keep things somewhere. A file is a named block of data. A folder is just a way to give many files an address.</p>' },
      { text: '<p>That sounds ordinary, which is why it is easy to skip. Most useful computer work begins with knowing where the inputs live, where the outputs should go, and which copy is the real one.</p>' },
      { text: '<p>Text, images, spreadsheets, videos, programs, and model weights all become files at some point. The machine does not see a school report or a photograph. It sees bytes with a name and a path.</p>' },
      { text: '<p>People who handle computers well are often good at this unglamorous layer. They name things clearly, keep versions separate, and can find the exact artifact a tool is supposed to read.</p>' }
    ]
  },
  1359: {
    act: 'II',
    kicker: 'AI-era computing 1.1',
    title: 'The path is the address',
    tags: { subject: 'computing', topic: 'ai-era-computing', concept: 'file-paths', ground: 'g0' },
    layers: [
      { text: '<p>A file path is the address of a file inside the machine. It tells the operating system which drive, folder, subfolder, and filename to follow.</p>' },
      { text: '<p>When software says it cannot find a file, it is usually not confused about the file itself. It is looking in the wrong place, or the name does not match exactly.</p>' },
      { text: '<p>There are absolute paths, which start from the root of the system, and relative paths, which start from the folder the program is currently standing in.</p>' },
      { text: '<p>That one idea explains many beginner errors. The program is not reading thoughts. It is walking an address, one folder at a time.</p>' }
    ]
  },
  1360: {
    act: 'II',
    kicker: 'AI-era computing 1.2',
    title: 'The command line is the old control room',
    tags: { subject: 'computing', topic: 'ai-era-computing', concept: 'command-line-shell', ground: 'g0' },
    layers: [
      { text: '<p>A graphical app lets us click visible controls. A shell lets us type commands directly to the operating system.</p>' },
      { text: '<p>The command line feels bare because it removes the buttons. In exchange, it gives exact control: list these files, enter this folder, run this program, copy this output.</p>' },
      { text: '<p>Modern AI tools make the shell more valuable, not less. A model can suggest a command, but the user still needs to know what folder it will affect and what output to expect.</p>' },
      { text: '<p>The first useful shell skill is calm reading. What command ran? From which folder? What did the error actually say?</p>' }
    ]
  },
  1361: {
    act: 'II',
    kicker: 'AI-era computing 1.3',
    title: 'Programs are tools that expect inputs',
    tags: { subject: 'computing', topic: 'ai-era-computing', concept: 'input-output', ground: 'g0' },
    layers: [
      { text: '<p>A program is a machine made of instructions. It waits for inputs, follows its rules, and produces outputs.</p>' },
      { text: '<p>The input might be a file, a typed command, a web request, a mouse click, a sensor reading, or a question sent to an AI model.</p>' },
      { text: '<p>The output might be a saved image, a row in a database, a page on a screen, a sound from a speaker, or another file passed to the next tool.</p>' },
      { text: '<p>Once this pattern is visible, software becomes less mysterious. Many systems are just chains of small programs handing results to one another.</p>' }
    ]
  },
  1362: {
    act: 'II',
    kicker: 'AI-era computing 1.4',
    title: 'Data needs a shape',
    tags: { subject: 'computing', topic: 'ai-era-computing', concept: 'structured-data-json-csv', ground: 'g0' },
    layers: [
      { text: '<p>Computers work best when data has a predictable shape. A spreadsheet uses rows and columns. JSON uses names, brackets, lists, and values.</p>' },
      { text: '<p>Human notes can be loose. Software needs stricter habits. If one record says price and another says cost, a program may treat them as different fields.</p>' },
      { text: '<p>This is why forms, tables, schemas, and validation exist. They keep the data boring enough for a machine to read without guessing.</p>' },
      { text: '<p>AI can help clean messy data, but clean structure still wins. A neat table beats a clever apology from a model.</p>' }
    ]
  },
  1363: {
    act: 'II',
    kicker: 'AI-era computing 1.5',
    title: 'An API is a contract between programs',
    tags: { subject: 'computing', topic: 'ai-era-computing', concept: 'apis', ground: 'g0' },
    layers: [
      { text: '<p>An API is a published way for one program to talk to another. It says what can be asked, what must be sent, and what comes back.</p>' },
      { text: '<p>A weather app does not own every thermometer in the world. It sends a request to a weather service and receives data in a known format.</p>' },
      { text: '<p>The same idea powers payments, maps, login systems, AI models, shipping labels, calendars, and almost every modern web product.</p>' },
      { text: '<p>Good API thinking is precise. Which endpoint? Which method? Which fields? Which error code?</p>' }
    ]
  },
  1364: {
    act: 'II',
    kicker: 'AI-era computing 1.6',
    title: 'Databases remember the state',
    tags: { subject: 'computing', topic: 'ai-era-computing', concept: 'databases-state', ground: 'g0' },
    layers: [
      { text: '<p>An app without storage forgets everything when it closes. A database gives the app memory.</p>' },
      { text: '<p>Users, scores, messages, orders, lessons, subscriptions, and progress all become records. Each record has fields that can be created, read, changed, or deleted.</p>' },
      { text: '<p>The hard part is deciding what should be remembered. Store too little and the app cannot serve the user. Store too much and the system becomes expensive, risky, and hard to change.</p>' },
      { text: '<p>A serious product is often a clean interface sitting on top of a careful database design.</p>' }
    ]
  },
  1365: {
    act: 'II',
    kicker: 'AI-era computing 1.7',
    title: 'A model predicts the next useful piece',
    tags: { subject: 'computing', topic: 'ai-era-computing', concept: 'ai-models', ground: 'g0' },
    layers: [
      { text: '<p>A modern language model reads a sequence of tokens and predicts what should come next. Tokens are small chunks of text, sometimes whole words, sometimes pieces of words.</p>' },
      { text: '<p>During training, the model sees enormous amounts of text and adjusts billions of internal numbers. Those numbers become a compressed map of patterns in language, code, facts, style, and reasoning traces.</p>' },
      { text: '<p>When a prompt arrives, the model is not opening a private library of perfect answers. It is using those learned patterns to continue the sequence in a useful direction.</p>' },
      { text: '<p>That is why wording matters. A vague prompt gives weak steering. A clear task, context, constraints, and examples give the model something firmer to follow.</p>' }
    ]
  },
  1366: {
    act: 'II',
    kicker: 'AI-era computing 1.8',
    title: 'A prompt is a work order',
    tags: { subject: 'computing', topic: 'ai-era-computing', concept: 'prompting-task-design', ground: 'g0' },
    layers: [
      { text: '<p>A prompt is not a magic sentence. It is a work order for a machine that can read, write, transform, classify, plan, and generate code.</p>' },
      { text: '<p>Good work orders name the job. Summarize this contract for a non-lawyer. Find contradictions in this spreadsheet. Rewrite this lesson for a fifteen-year-old without dumbing it down.</p>' },
      { text: '<p>The prompt should also name the materials. Paste the relevant text, describe the audience, specify the format, and say what counts as success.</p>' },
      { text: '<p>When the output is poor, the best response is often not anger. Tighten the work order.</p>' }
    ]
  },
  1367: {
    act: 'II',
    kicker: 'AI-era computing 1.9',
    title: 'Context is working memory',
    tags: { subject: 'computing', topic: 'ai-era-computing', concept: 'context-window', ground: 'g0' },
    layers: [
      { text: '<p>An AI model can only use what fits inside its context window and what its tools can retrieve. Context is the working memory of the conversation.</p>' },
      { text: '<p>If the needed file, rule, date, table, or decision is missing, the model may guess. It may sound confident because language can be fluent even when the ground is thin.</p>' },
      { text: '<p>Strong AI work is mostly context management: provide the right source, remove stale instructions, keep decisions recorded, and ask the model to cite what it used.</p>' },
      { text: '<p>The better the context, the less the model has to invent.</p>' }
    ]
  },
  1368: {
    act: 'II',
    kicker: 'AI-era computing 1.10',
    title: 'Search and AI solve different problems',
    tags: { subject: 'computing', topic: 'ai-era-computing', concept: 'search-vs-ai', ground: 'g0' },
    layers: [
      { text: '<p>Search is good at finding existing pages. AI is good at transforming material once the right material is present.</p>' },
      { text: '<p>For a current fact, search should win. Prices, laws, model names, sports scores, library versions, and company policies can change after a model was trained.</p>' },
      { text: '<p>For synthesis, AI becomes useful. It can compare notes, draft options, spot missing steps, write code, turn rough bullets into a lesson, or explain an error message.</p>' },
      { text: '<p>The skilled habit is choosing the right tool first. Lookup before claiming. Transform after grounding.</p>' }
    ]
  },
  1369: {
    act: 'II',
    kicker: 'AI-era computing 1.11',
    title: 'Embeddings turn meaning into coordinates',
    tags: { subject: 'computing', topic: 'ai-era-computing', concept: 'embeddings-vector-search', ground: 'g1' },
    layers: [
      { text: '<p>An embedding turns a piece of text, image, or audio into a long list of numbers. Similar meanings land near each other in that number space.</p>' },
      { text: '<p>This is how a system can find a document about refunds even if the user searches for getting money back. The words differ. The meaning is close.</p>' },
      { text: '<p>Vector search is built on this idea. Store embeddings for many documents, embed the query, then retrieve the nearest matches.</p>' },
      { text: '<p>Many useful AI apps are built from this quiet trick: find the relevant source first, then ask the model to answer from it.</p>' }
    ]
  },
  1370: {
    act: 'II',
    kicker: 'AI-era computing 1.12',
    title: 'RAG gives a model papers on the desk',
    tags: { subject: 'computing', topic: 'ai-era-computing', concept: 'retrieval-augmented-generation', ground: 'g1' },
    layers: [
      { text: '<p>RAG means retrieval augmented generation. The name is clumsy, but the idea is plain: fetch relevant documents before asking the model to answer.</p>' },
      { text: '<p>A support bot can retrieve the exact refund policy, shipping rule, or troubleshooting guide, then write a response using that source.</p>' },
      { text: '<p>This reduces guessing because the model is not relying only on memory from training. It has the current material sitting in the prompt.</p>' },
      { text: '<p>RAG does not make truth automatic. The retrieved source can be old, incomplete, or wrong. The system still needs good documents and checks.</p>' }
    ]
  },
  1371: {
    act: 'II',
    kicker: 'AI-era computing 1.13',
    title: 'Automation is a saved decision',
    tags: { subject: 'computing', topic: 'ai-era-computing', concept: 'automation-workflows', ground: 'g0' },
    layers: [
      { text: '<p>Automation begins when a repeated decision is written down clearly enough for a machine to perform.</p>' },
      { text: '<p>If an invoice arrives, extract the amount, check the supplier, save the PDF, update the sheet, and send a message if something looks unusual.</p>' },
      { text: '<p>None of those steps is glamorous. Together, they remove hours of dull work and reduce the chance that a tired person misses a detail.</p>' },
      { text: '<p>The best automations start small. One trigger. One action. One check that proves the result is right.</p>' }
    ]
  },
  1372: {
    act: 'II',
    kicker: 'AI-era computing 1.14',
    title: 'Agents are loops with tools',
    tags: { subject: 'computing', topic: 'ai-era-computing', concept: 'ai-agents-tools', ground: 'g1' },
    layers: [
      { text: '<p>An AI agent is usually a loop. Read the goal, decide the next step, use a tool, inspect the result, then decide again.</p>' },
      { text: '<p>The tools might include a browser, a code editor, a terminal, a database, a calendar, or an image generator. The model supplies judgment between tool calls.</p>' },
      { text: '<p>This makes agents powerful and risky. A bad instruction can repeat, overwrite, spend money, leak data, or confidently finish the wrong task.</p>' },
      { text: '<p>Good agent design gives narrow permissions, visible logs, stop points, and tests. Freedom is earned one tool at a time.</p>' }
    ]
  },
  1373: {
    act: 'II',
    kicker: 'AI-era computing 1.15',
    title: 'Privacy starts before upload',
    tags: { subject: 'computing', topic: 'ai-era-computing', concept: 'privacy-security-ai', ground: 'g0' },
    layers: [
      { text: '<p>AI tools often run on servers. That means a pasted document may leave the local machine and travel to another company&apos;s infrastructure.</p>' },
      { text: '<p>Some tasks are safe to outsource. Some require removing names, account numbers, addresses, private keys, passwords, medical details, or client material first.</p>' },
      { text: '<p>The useful question is simple: would this text be acceptable in the wrong inbox? If the answer is no, treat it carefully before uploading.</p>' },
      { text: '<p>Privacy is not fear of technology. It is knowing where the data goes.</p>' }
    ]
  },
  1374: {
    act: 'II',
    kicker: 'AI-era computing 1.16',
    title: 'Git remembers the project',
    tags: { subject: 'computing', topic: 'ai-era-computing', concept: 'git-version-control', ground: 'g0' },
    layers: [
      { text: '<p>Git is a memory system for a folder of work. It records snapshots called commits, each with a message explaining what changed.</p>' },
      { text: '<p>This matters because real projects move through mistakes. A feature breaks. A file is renamed. A teammate edits the same area. Git keeps a trail.</p>' },
      { text: '<p>Branches let people try work separately before merging it back. Pull requests create a place to review the change before it becomes part of the main project.</p>' },
      { text: '<p>In the AI era, Git becomes even more important. Fast code generation needs a strong undo history.</p>' }
    ]
  },
  1375: {
    act: 'II',
    kicker: 'AI-era computing 1.17',
    title: 'Deployment turns code into a service',
    tags: { subject: 'computing', topic: 'ai-era-computing', concept: 'deployment-cloud-hosting', ground: 'g0' },
    layers: [
      { text: '<p>Code on a laptop is private. Deployment puts that code on a server where other people can reach it.</p>' },
      { text: '<p>A deployment platform usually builds the project, copies the finished files or server code, assigns an address, and routes web traffic to it.</p>' },
      { text: '<p>When a site goes live, the problem changes. It now needs environment variables, monitoring, rollbacks, backups, security rules, and a way to ship fixes without panic.</p>' },
      { text: '<p>Launch is not a ceremony. It is the moment the computer has to behave while strangers are watching.</p>' }
    ]
  },
  1376: {
    act: 'II',
    kicker: 'AI-era computing 1.18',
    title: 'Logs are the machine speaking back',
    tags: { subject: 'computing', topic: 'ai-era-computing', concept: 'logs-debugging', ground: 'g0' },
    layers: [
      { text: '<p>When software fails, it often leaves a trail. Logs record what happened: requests, warnings, errors, timings, missing files, rejected permissions, and failed assumptions.</p>' },
      { text: '<p>A beginner sees a wall of red text. An engineer scans for the first real error, the file name, the line number, and the operation that failed.</p>' },
      { text: '<p>AI can help read logs, but it needs the exact message. Paraphrasing an error usually removes the clue that matters.</p>' },
      { text: '<p>Debugging is not guessing in a panic. It is asking the machine what it saw, then believing the evidence.</p>' }
    ]
  },
  1377: {
    act: 'II',
    kicker: 'AI-era computing 1.19',
    title: 'The new computer skill is orchestration',
    tags: { subject: 'computing', topic: 'ai-era-computing', concept: 'human-computer-orchestration', ground: 'g1' },
    layers: [
      { text: '<p>The valuable computer user is changing. Memorising every command matters less than understanding how tools fit together.</p>' },
      { text: '<p>A strong operator can gather data, structure it, ask an AI model for help, verify the result, save the work, ship the change, and recover when something breaks.</p>' },
      { text: '<p>That is orchestration. The human sets the goal, chooses the tools, checks the evidence, and keeps responsibility for the result.</p>' },
      { text: '<p>Computers are becoming more capable. That makes fundamentals more useful, not less.</p>' }
    ]
  },
  1378: {
    act: 'II',
    kicker: 'AI Behind Curtain 1.0',
    title: 'The machine still only has switches',
    tags: { subject: 'computing', topic: 'ai-behind-the-curtain', concept: 'bits-under-ai', ground: 'g0' },
    layers: [
      { text: '<p>When a chatbot replies in smooth English, it can feel as if the computer has finally learned language directly. The old lesson still holds.</p>' },
      { text: '<p>Inside the hardware, everything is still represented by bits. A 1 means one electrical state. A 0 means another. The machine moves those states, not meanings.</p>' },
      { text: '<p>English has to be translated before the hardware can touch it. Letters, words, images, and sounds become numbers, then those numbers become patterns of bits in memory.</p>' },
      { text: '<p>AI is built on that foundation. The surface feels conversational, but underneath it is encoded data, arithmetic, memory, and circuits switching at enormous speed.</p>' }
    ]
  }
};
