# Frye's Applied Physics → Qubix BBs — Batch 06: Rotation, Heat & Conservation (15 BBs)

These 15 BBs complete Frye's treatment of classical mechanics and begin thermal physics. Rotation of rigid bodies, the conservation laws of momentum and energy (with the startling fact that mass is not conserved), heat as disordered motion, and the measurement of thermal energy through calorimetry. Again, the overlap with Verma's thermodynamics batches is deliberate: Frye's engineering-first approach provides the concrete intuition that Verma's mathematical rigour builds upon.

**Chapters covered:** Frye 13–14 (Dynamics of Rotation, Conservation Laws), 18–21 (Heat & Temperature, Heat Transfer expansion is covered in Frye 01, Calorimetry).

---

## BB-NEW-800 — Moment of inertia: why a spinning skater speeds up

**Subject:** physics | **Topic:** mechanics | **Concept:** moment-of-inertia; rotational-inertia; I=Sigma-mr^2; angular-kinetic-energy | **Ground:** g1 | **Builds on:** [BB-NEW-288, BB-NEW-644, BB-NEW-289]

**Floor 0 (Idea):**
<p>Linear motion: F = ma. Rotational motion: τ = Iα. Torque replaces force; angular acceleration replaces linear acceleration; and moment of inertia I replaces mass. Just as mass resists being accelerated in a straight line, moment of inertia resists being spun. And just as KE = ½mv² for linear motion, KE_rot = ½Iω² for rotation. The further the mass is from the axis, the larger I — and the harder it is to spin.</p>

**Floor 1 (Concrete):**
<p>A spinning figure skater with arms extended: arms at 0.8 m from axis, torso at 0.15 m. Roughly, I_extended ≈ 3.5 kg·m². She pulls her arms in to 0.2 m from axis: I_tucked ≈ 1.2 kg·m². Angular momentum L = Iω is conserved (no external torque). So ω_tucked/ω_extended = I_extended/I_tucked = 3.5/1.2 ≈ 2.9. She spins nearly 3× faster just by pulling her arms in. Kinetic energy: KE = ½Iω² = L²/(2I). Since L is constant, KE ∝ 1/I. When I drops, KE <em>increases</em> — the skater does work pulling her arms inward against centrifugal force, and that work becomes rotational KE.</p>

**Floor 2 (Definition):**
<p><strong>Moment of inertia</strong> I = Σ m_i r_i² = ∫ r² dm (kg·m²). It depends on the axis of rotation and the mass distribution. Standard formulas (axis through centre of mass unless specified): solid cylinder/disk = ½MR², hollow cylinder = MR², solid sphere = ⅖MR², thin rod (⊥ through centre) = ML²/12, thin rod (⊥ through end) = ML²/3. <strong>Parallel-axis theorem:</strong> I = I_cm + Md² (d = distance from CM to new axis). <strong>Rotational KE:</strong> KE = ½Iω². <strong>Angular momentum:</strong> L = Iω. <strong>Newton's second law for rotation:</strong> τ = Iα = dL/dt. <strong>Work:</strong> W = τ θ. <strong>Power:</strong> P = τ ω.</p>

**Floor 3 (In action):**
<p>Moment of inertia governs every spinning object. A flywheel stores energy: a 100 kg, 1 m radius cylinder at 3000 RPM (ω = 314 rad/s) stores KE = ½(½ × 100 × 1²)(314²) = ½(50)(98,596) ≈ 2.46 MJ — enough to power a house for about 40 minutes. A helicopter's tail rotor counteracts the torque from the main rotor — without it, the fuselage would spin in the opposite direction (conservation of angular momentum). A diver tucks into a ball to spin faster; extends to enter the water cleanly. A neutron star, formed when a massive star's core collapses from ~10⁶ km to ~10 km, conserves angular momentum — its rotation period drops from weeks to milliseconds. The fastest known pulsar spins at 716 Hz — its equator moves at ~0.24c.</p>

**Image prompt:** A chalk drawing of a figure skater in two positions: arms extended (large I, slow ω) and arms tucked (small I, fast ω). Arrows showing L = Iω constant. The parallel-axis theorem: a rod about end vs centre. A flywheel with KE = ½Iω². Chalk on dark green board. Square 1:1.


## BB-NEW-801 — Angular momentum conservation: the spinning universe

**Subject:** physics | **Topic:** mechanics | **Concept:** conservation-of-angular-momentum; L=Iω-constant; rotational-collisions | **Ground:** g1 | **Builds on:** [BB-NEW-800, BB-NEW-292, BB-NEW-290]

**Floor 0 (Idea):**
<p>Spin an office chair while holding heavy books. Pull the books in and you spin faster; push them out and you slow down. No one pushed you — your angular momentum L = Iω stayed constant. When I decreased, ω increased. Conservation of angular momentum is as fundamental as conservation of energy. It's why galaxies are flat discs and why neutron stars spin hundreds of times per second.</p>

**Floor 1 (Concrete):**
<p>A 50 kg child runs at 3 m/s and jumps onto a stationary merry-go-round of radius 2.0 m and mass 100 kg (I = ½MR² = 200 kg·m²). The child's angular momentum about the centre: L = mvr = 50 × 3 × 2 = 300 kg·m²/s. After jumping on: combined I = I_merry + m_child r² = 200 + 50 × 4 = 400 kg·m². Final angular velocity: ω = L/I = 300/400 = 0.75 rad/s. The merry-go-round spins at about 7 RPM.</p>
<p>A clutch connects two rotating shafts. Shaft A: I_A = 5.0 kg·m², ω_A = 200 rad/s. Shaft B: I_B = 10.0 kg·m², ω_B = 0. After engagement: L_before = 5 × 200 = 1000. I_total = 15. ω_after = 1000/15 = 66.7 rad/s. Energy before: ½(5)(40000) = 100 kJ. After: ½(15)(4444) = 33.3 kJ. Lost: 66.7 kJ — dissipated as heat in the clutch plates.</p>

**Floor 2 (Definition):**
<p><strong>Angular momentum</strong> L⃗ = r⃗ × p⃗ = Iω⃗ (for a rigid body about a fixed axis). <strong>Conservation of angular momentum:</strong> if net external torque is zero, total angular momentum is constant — ΣL_initial = ΣL_final. This is a vector law — direction is conserved as well as magnitude. <strong>Rotational impulse:</strong> ∫ τ dt = ΔL. <strong>Rotational collisions:</strong> L conserved (no external torque), but rotational KE is generally not conserved (energy dissipated as heat). The principle applies at all scales: from electrons in atoms (orbital angular momentum is quantised) to galaxies (conservation of the primordial rotation of the gas cloud that formed them).</p>

**Floor 3 (In action):**
<p>Conservation of angular momentum explains everything that spins. A cat dropped upside-down rotates its front and back halves in opposite directions, conserving net L, and lands on its feet. A helicopter with a failed tail rotor will spin uncontrollably — the main rotor's torque has no counter. The Hubble Space Telescope uses reaction wheels: electric motors spin internal flywheels; the equal and opposite reaction torque precisely points the telescope. Hubble's pointing accuracy: 0.007 arcseconds — the width of a human hair seen from 1.5 km away. Gyroscopes in submarines and spacecraft use angular momentum conservation to maintain orientation without external references. The Earth-Moon system conserves angular momentum: as tidal friction slows Earth's rotation, the Moon recedes at ~3.8 cm/year.</p>

**Image prompt:** A chalk drawing of a child jumping onto a merry-go-round. Before: child running with v, angular momentum L = mvr. After: child on board, both rotating at ω. L = Iω = constant. A reaction wheel: flywheel spinning inside spacecraft, equal and opposite torque on spacecraft. Chalk on dark green board. Square 1:1.


## BB-NEW-802 — Conservation of energy: the unbreakable law

**Subject:** physics | **Topic:** mechanics | **Concept:** conservation-of-energy; energy-transformations; first-law-of-thermodynamics; mass-energy | **Ground:** g0 | **Builds on:** [BB-NEW-785, BB-NEW-271, BB-NEW-11]

**Floor 0 (Idea):**
<p>Energy cannot be created or destroyed. It can only change form — from chemical to thermal to mechanical to electrical and back. This is the single most powerful law in physics. Every machine is an energy converter: a car engine converts chemical energy to kinetic; a solar panel converts light to electricity; your body converts food to heat and motion. The total energy of an isolated system never changes.</p>

**Floor 1 (Concrete):**
<p>A 0.50 kg apple falls 5.0 m from a tree. At the top: PE = mgh = 0.50 × 9.8 × 5.0 = 24.5 J, KE = 0. Total = 24.5 J. Just before hitting the ground: PE = 0, KE = 24.5 J, v = √(2 × 24.5/0.50) = √98 = 9.9 m/s. The energy transformed from gravitational potential to kinetic. On impact: the 24.5 J becomes thermal energy (the apple and ground warm slightly — immeasurably, but calculably) and sound.</p>
<p>A 60 W incandescent bulb running for 1 hour: electrical energy input = 60 × 3600 = 216,000 J. Output: ~10,800 J as visible light (5% efficiency), ~205,200 J as heat (infrared radiation and convection). The energy is all accounted for — none is lost, just converted to forms we didn't want.</p>

**Floor 2 (Definition):**
<p><strong>Conservation of energy:</strong> In an isolated system, total energy is constant — ΔE = 0. Energy can change form (kinetic ↔ potential ↔ thermal ↔ chemical ↔ electrical ↔ nuclear) but cannot appear from nowhere or vanish. The <strong>First Law of Thermodynamics:</strong> ΔU = Q − W — the change in internal energy equals heat added minus work done. <strong>Mass-energy equivalence:</strong> E = mc² — mass itself is a form of energy. In nuclear reactions, measurable mass is converted to energy; in chemical reactions, the mass change is too small to measure. <strong>Perpetual motion machines of the first kind</strong> (create energy from nothing) are impossible.</p>

**Floor 3 (In action):**
<p>Energy accounting governs civilisation. Global primary energy consumption: ~600 exajoules per year (6 × 10²⁰ J). Source breakdown: oil 31%, coal 27%, gas 24%, nuclear 4%, hydro 7%, renewables 7%. Every joule is tracked from extraction to end use. An electric car converts ~90% of battery energy to motion; a petrol car converts ~25%. The difference isn't magic — the 75% lost in a petrol engine becomes heat in the exhaust and radiator. The Sun fuses 600 million tonnes of hydrogen per second, converting 4 million tonnes of mass to energy — E = mc² in action. The energy reaching Earth from the Sun in one hour exceeds all of humanity's energy use for an entire year. The law is simple: energy doesn't care what form it takes, but it always takes a form.</p>

**Image prompt:** A chalk drawing of an energy flow diagram. Sun → plants → coal → power plant → electricity → light bulb → heat/light. Each arrow labelled with energy form. The First Law equation: ΔU = Q − W. A pie chart of global energy sources. E = mc². Chalk on dark green board. Square 1:1.


## BB-NEW-803 — Heat as energy: the great discovery of the 19th century

**Subject:** physics | **Topic:** thermodynamics | **Concept:** heat-as-energy; mechanical-equivalent-of-heat; Joule-experiment; caloric-theory | **Ground:** g0 | **Builds on:** [BB-NEW-260, BB-NEW-271, BB-NEW-802]

**Floor 0 (Idea):**
<p>For centuries, people thought heat was a fluid — "caloric" — that flowed from hot objects to cold ones. James Prescott Joule proved otherwise in the 1840s: heat is energy. He stirred water with a paddle wheel driven by a falling weight and measured the temperature rise. The mechanical work done by gravity exactly equalled the heat generated. Heat is not a substance — it's disordered molecular motion, measurable in joules.</p>

**Floor 1 (Concrete):**
<p>Joule's experiment: a falling weight of 10 kg descends 2.0 m, turning a paddle in an insulated container of 1.0 kg of water. Work done: W = mgh = 10 × 9.8 × 2.0 = 196 J. Temperature rise of water: ΔT = 0.047°C. The quantity of heat: Q = mcΔT = 1.0 × 4186 × 0.047 = 196.7 J — matching the mechanical work to within 1%. Joule repeated this experiment with different weights, distances, and fluids, always finding the same equivalence.</p>
<p>The <strong>mechanical equivalent of heat</strong>: 1 calorie (the heat to raise 1 g of water by 1°C) = 4.186 J. This number was discovered by Joule and is now defined exactly: 1 cal = 4.184 J (thermochemical). The SI unit for all energy — mechanical, thermal, electrical, chemical — is the joule. Heat is just energy in transit due to a temperature difference.</p>

**Floor 2 (Definition):**
<p><strong>Heat</strong> Q is energy transferred between systems due to a temperature difference. It is measured in joules (J). It is NOT a property of a system — a system has internal energy, not "heat content." <strong>Temperature</strong> T measures the average kinetic energy of particles. <strong>Internal energy</strong> U is the total energy (kinetic + potential) of all particles in a system. <strong>Heat capacity:</strong> C = Q/ΔT (J/K). <strong>Specific heat capacity:</strong> c = Q/(mΔT) (J/kg·K). Water: c = 4186 J/kg·K — exceptionally high, which is why oceans moderate climate. The <strong>First Law:</strong> ΔU = Q − W. Heat and work are both energy transfers; they are equivalent and interchangeable.</p>

**Floor 3 (In action):**
<p>Joule's insight unified physics. Before him, heat was measured in calories, work in foot-pounds, electricity in its own units — three separate ledgers. After him, everything was joules. The brakes on a train convert kinetic energy to heat: stopping a 200-tonne train from 100 km/h dissipates ~77 MJ — enough to boil 200 litres of water. A human at rest generates ~100 W of heat from metabolism — that's ~8.6 MJ per day, the energy equivalent of about 2000 food calories (actually kilocalories — dietary "calories" are kcal). The entire field of thermodynamics — engines, refrigerators, power plants — rests on the equivalence of heat and work that Joule proved with a paddle wheel and a thermometer.</p>

**Image prompt:** A chalk drawing of Joule's paddle-wheel experiment. A falling weight turning a paddle in a water-filled insulated container. A thermometer showing ΔT. Equation: W = mgh = mcΔT = Q. 1 cal = 4.186 J. The caloric theory crossed out; "HEAT IS ENERGY" written beneath. Chalk on dark green board. Square 1:1.


## BB-NEW-804 — The two laws of thermodynamics: what heat can and cannot do

**Subject:** physics | **Topic:** thermodynamics | **Concept:** first-law; second-law; entropy; heat-engines; perpetual-motion | **Ground:** g1 | **Builds on:** [BB-NEW-271, BB-NEW-273, BB-NEW-803]

**Floor 0 (Idea):**
<p>You cannot win. You cannot break even. You cannot get out of the game. This is the sardonic summary of the laws of thermodynamics. First law: energy is conserved — you can't create it from nothing (no free lunch). Second law: heat flows spontaneously from hot to cold, never the reverse, and some energy is always degraded into unusable waste heat — you can't even break even. These two laws govern every engine, every power plant, and the fate of the universe.</p>

**Floor 1 (Concrete):**
<p>A power plant takes heat Q_H = 1000 MJ from burning coal at T_H = 800 K and dumps waste heat Q_C into a river at T_C = 300 K. The maximum possible efficiency (Carnot): η_max = 1 − T_C/T_H = 1 − 300/800 = 0.625 = 62.5%. Maximum work output: W_max = 625 MJ. Minimum waste heat: Q_C,min = 375 MJ. A real plant achieves ~35–40% efficiency — the rest is irreversibilities (friction, turbulence, heat loss). The second law says the 375 MJ <em>must</em> be dumped — you cannot convert all heat to work, even in principle.</p>
<p>A refrigerator is a heat engine run backward. To extract Q_C = 1000 J from the cold interior at 270 K and dump it into a 300 K kitchen, the minimum work required is W_min = Q_C(T_H/T_C − 1) = 1000(300/270 − 1) = 111 J. Real fridges use 2–3× this.</p>

**Floor 2 (Definition):**
<p><strong>First Law:</strong> ΔU = Q − W. Energy is conserved. A <strong>perpetual motion machine of the first kind</strong> (creates energy) is impossible. <strong>Second Law</strong> (Clausius): Heat cannot spontaneously flow from a colder body to a hotter body. (Kelvin-Planck): No process can convert heat entirely into work without other effect. <strong>Entropy S:</strong> ΔS = ∫ dQ_rev/T. In an isolated system, ΔS ≥ 0 — entropy never decreases. <strong>Carnot efficiency:</strong> η_max = 1 − T_C/T_H (temperatures in kelvin). This is the theoretical maximum for any heat engine operating between these temperatures. The Second Law explains why perpetual motion machines of the second kind (100% efficient engines) are impossible.</p>

**Floor 3 (In action):**
<p>The second law is why your car's radiator exists. The engine produces heat; some becomes work, most must be dumped. Without the radiator, the engine would seize. The second law is why power plants are always near water — rivers, lakes, or cooling towers — to dump waste heat. It's why laptop fans run — the processor generates heat that must be removed. On a cosmic scale, the second law predicts the heat death of the universe: as entropy increases toward a maximum, all temperature differences will equalise, and no more work can be extracted. The universe will end not with a bang but as a uniform, tepid, featureless soup. The first law says you can't win; the second law says you can't break even; the third law (absolute zero is unreachable) says you can't get out of the game.</p>

**Image prompt:** A chalk drawing of a heat engine diagram: hot reservoir at T_H, Q_H in, W out, Q_C dumped to cold reservoir at T_C. Carnot efficiency η = 1 − T_C/T_H. A refrigerator: work W in, Q_C extracted from cold, Q_H dumped to hot. Entropy arrow: "ΔS ≥ 0." Chalk on dark green board. Square 1:1.


## BB-NEW-805 — Specific heat: why some things heat up faster

**Subject:** physics | **Topic:** thermodynamics | **Concept:** specific-heat-capacity; Q=mcΔT; thermal-inertia; water | **Ground:** g0 | **Builds on:** [BB-NEW-263, BB-NEW-803]

**Floor 0 (Idea):**
<p>Put a metal spoon and a wooden spoon in a pot of boiling water. The metal handle gets too hot to touch in seconds; the wooden handle stays comfortable for minutes. Both are at the same temperature, but metal has a much lower specific heat capacity — it takes less energy to raise its temperature. Water has one of the highest specific heats of any common substance, which is why oceans take months to warm up and cool down.</p>

**Floor 1 (Concrete):**
<p>Specific heat capacities (J/kg·K): Water = 4186, Ice = 2100, Steam = 2000, Aluminium = 900, Iron/Steel = 450, Copper = 385, Gold = 129, Lead = 128, Air = 1000, Wood ≈ 1700, Glass ≈ 840.</p>
<p>To heat 1.0 kg of water from 20°C to 100°C: Q = mcΔT = 1.0 × 4186 × 80 = 334,880 J ≈ 335 kJ. To heat 1.0 kg of iron through the same range: Q = 1.0 × 450 × 80 = 36,000 J — about 9× less energy. A 2000 W electric kettle heats 1.0 L of water from 20°C to boiling in 335,000/2000 = 168 seconds ≈ 2.8 minutes. A 200 W immersion heater would take 28 minutes.</p>

**Floor 2 (Definition):**
<p><strong>Specific heat capacity</strong> c is the energy required to raise the temperature of 1 kg of a substance by 1 K (or 1°C). Formula: <strong>Q = mcΔT</strong>. Units: J/kg·K. The <strong>heat capacity</strong> C = mc (J/K) is the energy per degree for a specific object. <strong>Molar heat capacity</strong> C_m (J/mol·K) = c × M (molar mass). For gases, c depends on whether heating occurs at constant volume (c_v) or constant pressure (c_p), with c_p − c_v = R for ideal gases. Water's exceptionally high c (4186) is due to hydrogen bonding — energy goes into breaking bonds, not just increasing molecular speed. This makes water an excellent coolant and thermal regulator.</p>

**Floor 3 (In action):**
<p>Specific heat drives climate. The ocean's high heat capacity means coastal areas have milder winters and cooler summers than inland areas at the same latitude. San Francisco (coastal) averages 10–22°C year-round; Wichita (inland, same latitude) ranges from −5°C to 34°C. A watermelon left in the sun stays cool inside because of its high water content. Car engines use water cooling because water absorbs a lot of heat per degree of temperature rise — a small radiator can handle the heat. In cooking, a cast-iron pan (high c × high mass) holds heat well for searing; a thin aluminium pan heats and cools quickly. The specific heat of building materials determines thermal comfort: a concrete floor stores heat during the day and releases it at night — passive solar design.</p>

**Image prompt:** A chalk drawing of two pots on a stove. Metal spoon (red — hot) and wooden spoon (brown — cool to touch). The specific heat table: water 4186, wood 1700, iron 450, copper 385. A graph: temperature vs time for water and iron heated with same power — water rises slowly, iron steeply. Equation Q = mcΔT. Chalk on dark green board. Square 1:1.


## BB-NEW-806 — Latent heat: the hidden energy of phase changes

**Subject:** physics | **Topic:** thermodynamics | **Concept:** latent-heat; heat-of-fusion; heat-of-vaporisation; phase-change | **Ground:** g0 | **Builds on:** [BB-NEW-264, BB-NEW-805]

**Floor 0 (Idea):**
<p>Heat ice at 0°C. It absorbs energy — but the temperature doesn't rise until all the ice is melted. That hidden energy is the latent heat of fusion: the energy required to break the crystalline bonds holding water molecules in a solid lattice. Boiling water behaves the same way: it stays at 100°C, absorbing enormous energy, until every drop has vaporised. Phase changes absorb or release energy without changing temperature.</p>

**Floor 1 (Concrete):**
<p>Latent heats for water: fusion L_f = 334 kJ/kg (at 0°C). Vaporisation L_v = 2260 kJ/kg (at 100°C). To melt 2.0 kg of ice at 0°C into water at 0°C: Q = mL_f = 2.0 × 334,000 = 668 kJ. This is the same energy as heating that water from 0°C to 160°C — if it didn't boil first. To boil 2.0 kg of water at 100°C into steam at 100°C: Q = mL_v = 2.0 × 2,260,000 = 4,520 kJ. That's enough energy to heat the same mass of water from 0°C to over 540°C. Phase changes are enormously energy-intensive.</p>
<p>Condensation and freezing release the same energy. A steam burn at 100°C is far worse than a water burn at 100°C because the steam condenses on your skin, releasing 2260 kJ/kg of latent heat. 1 g of steam at 100°C condensing on skin delivers 2260 J — roughly the energy to heat 1 g of water from 0°C to 540°C.</p>

**Floor 2 (Definition):**
<p><strong>Latent heat</strong> L is the energy absorbed or released during a phase change at constant temperature. <strong>Heat of fusion</strong> L_f: solid ↔ liquid. <strong>Heat of vaporisation</strong> L_v: liquid ↔ gas. Q = mL. During a phase change, the energy goes into breaking or forming intermolecular bonds, not into increasing kinetic energy, so temperature remains constant. The <strong>triple point</strong> is the unique temperature and pressure where solid, liquid, and gas coexist in equilibrium — for water: 273.16 K, 611 Pa. The <strong>critical point</strong> (water: 647 K, 22.1 MPa) is where the distinction between liquid and gas disappears.</p>

**Floor 3 (In action):**
<p>Latent heat is why sweating cools you. As sweat evaporates, it absorbs 2260 kJ/kg from your skin — your body's primary cooling mechanism. On a hot, humid day, evaporation is slow (air already saturated), and sweating becomes less effective — the "feels like" temperature rises. A refrigerator works by evaporating a refrigerant in the cold compartment (absorbing latent heat) and condensing it outside (releasing it). An ice pack at 0°C absorbs 334 kJ/kg as it melts — five times more effective than a cold pack at the same temperature. Power plants use evaporative cooling towers: water absorbs vast amounts of heat as it evaporates, cooling the condenser water. The latent heat of water is an evolutionary miracle — no other common liquid has such enormous phase-change energies.</p>

**Image prompt:** A chalk drawing of a heating curve: temperature vs heat added. Flat sections at 0°C (melting) and 100°C (boiling) with Q = mL_f and Q = mL_v labelled. A block of ice at 0°C, water at 0°C, steam at 100°C. The molecular picture: solid (ordered lattice), liquid (disordered), gas (free molecules). Chalk on dark green board. Square 1:1.


## BB-NEW-807 — Calorimetry: measuring heat in the lab

**Subject:** physics | **Topic:** thermodynamics | **Concept:** calorimetry; heat-exchange; thermal-equilibrium; calorimeter | **Ground:** g0 | **Builds on:** [BB-NEW-265, BB-NEW-805, BB-NEW-806]

**Floor 0 (Idea):**
<p>You can't measure heat directly — there's no "heat meter." But you can measure temperature, mass, and specific heat, and use conservation of energy: in an insulated container, the heat lost by hot objects equals the heat gained by cold objects. This is calorimetry — the art of tracking heat flow by its effects on temperature.</p>

**Floor 1 (Concrete):**
<p>A 200 g piece of aluminium at 150°C is dropped into 300 g of water at 20°C in an insulated cup (calorimeter). Aluminium c = 900 J/kg·K, water c = 4186 J/kg·K. Final temperature: heat lost by Al = heat gained by water. 0.200 × 900 × (150 − T_f) = 0.300 × 4186 × (T_f − 20). 180(150 − T_f) = 1256(T_f − 20). 27,000 − 180T_f = 1256T_f − 25,120. 52,120 = 1436T_f. T_f = 36.3°C.</p>
<p>To find the specific heat of an unknown metal: a 150 g sample at 100°C is dropped into 200 g of water at 25°C in a 50 g aluminium calorimeter cup at 25°C. Final temperature 30.5°C. Heat gained: water: 0.200 × 4186 × 5.5 = 4605 J. Cup: 0.050 × 900 × 5.5 = 248 J. Total gained: 4853 J. Heat lost by metal: 0.150 × c × (100 − 30.5) = 0.150c × 69.5 = 10.425c. 10.425c = 4853 → c ≈ 466 J/kg·K. The metal is likely iron (c = 450).</p>

**Floor 2 (Definition):**
<p><strong>Calorimetry</strong> measures heat exchange using the principle of conservation of energy: in an isolated system, ΣQ = 0 — heat lost = heat gained. A <strong>calorimeter</strong> is an insulated container that minimises heat exchange with the environment. The <strong>water equivalent</strong> of the calorimeter is the mass of water that would absorb the same heat as the calorimeter for a given temperature rise. Procedure: (1) measure initial temperatures of all components, (2) mix, (3) measure final equilibrium temperature, (4) apply Q_lost = Q_gained. For phase changes: account for latent heat separately (Q = mL) before applying mcΔT. Calorimetry determines specific heats, latent heats, and the energy content of fuels and foods.</p>

**Floor 3 (In action):**
<p>A bomb calorimeter measures the energy content of food. A weighed sample is burned in pure oxygen inside a sealed steel bomb immersed in water. The temperature rise of the water (and the bomb's known water equivalent) gives the energy released. A gram of fat yields ~37 kJ (9 kcal); carbohydrate or protein yields ~17 kJ (4 kcal). The "calories" on food labels are actually kilocalories — 2000 kcal/day = 8.4 MJ/day, the energy output of a 100 W light bulb running 24 hours. Calorimetry also measures the efficiency of fuels: a 1 g sample of petrol releases ~46 kJ. A car that covers 15 km on 1 L of petrol (0.74 kg) uses 34 MJ to travel 15 km — about 2.3 MJ/km, or 230 kJ per 100 m. Much of that becomes heat, not motion.</p>

**Image prompt:** A chalk drawing of a calorimeter setup. A metal sample at T_hot dropped into water at T_cold in an insulated cup. Thermometer, stirrer. Equation: m₁c₁(T_hot − T_f) = m₂c₂(T_f − T_cold) + m_cup c_cup(T_f − T_cold). A bomb calorimeter beside it: sample burning in oxygen, water jacket, thermometer. Chalk on dark green board. Square 1:1.


## BB-NEW-808 — The triple point: where ice, water, and steam coexist

**Subject:** physics | **Topic:** thermodynamics | **Concept:** triple-point; phase-diagram; critical-point; sublimation | **Ground:** g1 | **Builds on:** [BB-NEW-806, BB-NEW-269, BB-NEW-268]

**Floor 0 (Idea):**
<p>At a very specific temperature and pressure — 0.01°C and 611 pascals (about 0.006 atmospheres) — water can exist as ice, liquid, and steam simultaneously, in equilibrium. This is the triple point. Change the pressure slightly and one phase wins; change the temperature slightly and another does. The triple point is a unique fingerprint for every substance, and it's used to define the kelvin temperature scale.</p>

**Floor 1 (Concrete):**
<p>Water's phase diagram: Pressure vs Temperature. At 1 atm (101 kPa), ice melts at 0°C, water boils at 100°C. At 0.006 atm (611 Pa), the only point where all three phases coexist: 273.16 K (the triple point). Below 611 Pa, liquid water cannot exist — ice sublimates directly to vapour (freeze-drying). Above 22.1 MPa (the critical point, 374°C), liquid and gas are indistinguishable — it's a supercritical fluid.</p>
<p>Carbon dioxide's triple point: 216.6 K (−56.6°C) at 518 kPa (5.1 atm). At atmospheric pressure (101 kPa), CO₂ sublimes directly from solid to gas — that's why dry ice doesn't melt; it vanishes into fog. Liquid CO₂ can only exist above 5.1 atm — inside a CO₂ fire extinguisher, it's liquid. When released, it flashes to gas and solid snow.</p>

**Floor 2 (Definition):**
<p>The <strong>triple point</strong> is the unique temperature and pressure where solid, liquid, and gas phases coexist in thermodynamic equilibrium. It is defined by the intersection of the sublimation, fusion, and vaporisation curves on a <strong>phase diagram</strong>. The kelvin is defined by setting the triple point of water at exactly 273.16 K. The <strong>critical point</strong> is the temperature and pressure above which distinct liquid and gas phases do not exist. <strong>Sublimation</strong> is the direct transition solid → gas (dry ice, freeze-drying, frost on a cold morning). <strong>Deposition</strong> is gas → solid (frost formation). The phase diagram is a map of a substance's existence — every point on it tells you what form the substance takes.</p>

**Floor 3 (In action):**
<p>The triple point of water is the most precisely realised fixed point in metrology. Until 2019, the kelvin was defined by it; now the kelvin is defined by Boltzmann's constant, but the triple point remains the primary calibration standard. Freeze-drying uses the sublimation region: food is frozen, then placed in a vacuum below the triple-point pressure — the ice sublimes directly to vapour, leaving the food's structure intact. Coffee, astronaut food, and pharmaceuticals are preserved this way. On Mars, the atmospheric pressure is ~600 Pa — barely above water's triple point. In some regions and seasons, liquid water could theoretically exist briefly on the surface before boiling away or freezing. The phase diagram explains why: Mars sits right at the boundary.</p>

**Image prompt:** A chalk drawing of a phase diagram (P vs T). The three curves meeting at the triple point (273.16 K, 611 Pa). Regions labelled Solid, Liquid, Gas. The critical point marked. Sublimation arrow: solid → gas below triple point. A second diagram for CO₂ showing why dry ice sublimates at 1 atm. Chalk on dark green board. Square 1:1.


## BB-NEW-809 — Expansion: why bridges need expansion joints

**Subject:** physics | **Topic:** thermodynamics | **Concept:** thermal-expansion; linear-expansion; volume-expansion; bimetallic-strip | **Ground:** g0 | **Builds on:** [BB-NEW-262, BB-NEW-805]

**Floor 0 (Idea):**
<p>Everything expands when heated and contracts when cooled — solids, liquids, and gases. A steel bridge 100 metres long grows by several centimetres between winter and summer. If the bridge is rigidly fixed at both ends, the thermal stress would buckle it. Expansion joints are gaps built into the structure that absorb the seasonal breathing of steel and concrete.</p>

**Floor 1 (Concrete):**
<p>A steel bridge is 200 m long at −10°C in winter. At 40°C in summer, ΔT = 50°C. Coefficient of linear expansion for steel: α = 12 × 10⁻⁶ /°C. Expansion ΔL = α L₀ ΔT = (12×10⁻⁶)(200)(50) = 0.12 m = 12 cm. The expansion joint must accommodate at least 12 cm of movement. The thermal stress if constrained: σ = E α ΔT. E for steel = 200 GPa. σ = (200×10⁹)(12×10⁻⁶)(50) = 120 MPa — enough to yield mild steel. Expansion joints prevent this.</p>
<p>A glass baking dish (α ≈ 9 × 10⁻⁶) at 20°C is placed in a 200°C oven. The outside expands faster than the inside, creating thermal shock. Pyrex (borosilicate glass) has α ≈ 3 × 10⁻⁶ — a third of ordinary glass — reducing thermal stress. Rapid uneven heating is why ordinary glass shatters in the oven.</p>

**Floor 2 (Definition):**
<p><strong>Thermal expansion</strong> is the increase in dimensions with temperature. <strong>Linear expansion:</strong> ΔL = α L₀ ΔT, where α is the coefficient of linear expansion (/°C or /K). <strong>Area expansion:</strong> ΔA ≈ 2α A₀ ΔT. <strong>Volume expansion:</strong> ΔV ≈ 3α V₀ ΔT for solids, β V₀ ΔT for liquids (β = coefficient of volume expansion). For gases: V ∝ T at constant pressure (Charles's law). <strong>Bimetallic strip:</strong> two metals with different α bonded together — when heated, they curve toward the metal with lower α. Used in thermostats, thermometers, and circuit breakers. <strong>Anomalous expansion of water:</strong> water expands when cooled from 4°C to 0°C (maximum density at 4°C) — ice floats, and lakes freeze from the top down.</p>

**Floor 3 (In action):**
<p>Thermal expansion shapes engineering design. Railway tracks have gaps (or are continuously welded with expansion absorbed by the ballast). Power lines sag more in summer — they're longer. A bimetallic strip in a thermostat bends with temperature, making or breaking a contact to control heating. The mercury or alcohol in a thermometer expands linearly with temperature — the column height is ΔV = β V₀ ΔT. Concrete and steel have closely matched α (≈ 12 × 10⁻⁶), which is why reinforced concrete doesn't tear itself apart with temperature changes. The Eiffel Tower is 330 m tall in summer but about 15 cm shorter in winter — it's an enormous steel thermometer.</p>

**Image prompt:** A chalk drawing of a bridge with an expansion joint. Before: gap closed in summer heat. After: gap open in winter cold. ΔL = α L₀ ΔT calculation. A bimetallic strip bending when heated. Glass baking dish with thermal shock cracks. Chalk on dark green board. Square 1:1.


## BB-NEW-810 — Boyle's law revisited: PV = constant at constant temperature

**Subject:** physics | **Topic:** thermodynamics | **Concept:** Boyles-law; isothermal-compression; gas-laws; kinetic-explanation | **Ground:** g0 | **Builds on:** [BB-NEW-268, BB-NEW-711, BB-NEW-803]

**Floor 0 (Idea):**
<p>Trapped air is a spring. Push a piston into a sealed cylinder and the air pushes back — the harder you push, the smaller the volume gets, but the product P × V stays constant (at constant temperature). Boyle discovered this in 1662 using a J-shaped glass tube and a column of mercury. It was the first quantitative gas law, and it remains the simplest entry point to the behaviour of gases.</p>

**Floor 1 (Concrete):**
<p>A bicycle pump with cross-section 5.0 cm² contains air at atmospheric pressure (101 kPa). The initial volume of trapped air is 100 cm³. You push the piston 10 cm, reducing the volume to 50 cm³. Boyle's law: P₁V₁ = P₂V₂ → 101 × 100 = P₂ × 50 → P₂ = 202 kPa. The force on the piston: F = P × A = 202,000 × 0.0005 = 101 N — about 10 kg. Push further to 25 cm³: P = 404 kPa, F = 202 N. The air gets stiffer as you compress — it's a nonlinear spring.</p>
<p>Kinetic explanation: pressure comes from molecules hitting the walls. Halving the volume doubles the number of collisions per second — twice the pressure. The temperature (average molecular KE) stays constant because the compression is slow enough for heat to escape (isothermal).</p>

**Floor 2 (Definition):**
<p><strong>Boyle's law:</strong> For a fixed mass of gas at constant temperature, P ∝ 1/V, or PV = constant. Equivalently: P₁V₁ = P₂V₂. It is a consequence of the ideal gas law PV = nRT when T and n are constant. The law assumes the gas is ideal (negligible intermolecular forces, point-like particles). Real gases deviate at high pressures and low temperatures. <strong>Isothermal process:</strong> temperature constant, PV = constant, ΔU = 0 for ideal gas (since U depends only on T). The P-V curve is a hyperbola — higher isotherms correspond to higher temperatures. Boyle's law is one of three historical gas laws, along with Charles's law (V ∝ T at constant P) and Gay-Lussac's law (P ∝ T at constant V).</p>

**Floor 3 (In action):**
<p>Boyle's law explains every pneumatic device. A car tyre at 200 kPa (2 bar, ~29 psi) contains twice as many air molecules per unit volume as the outside air — that's why the gauge reads 200 kPa. A scuba diver's tank at 200 bar contains air compressed to 1/200 of its surface volume — a 10 L tank holds 2000 L of breathable air. As the diver breathes it down to 50 bar, the remaining volume is ¼ of the original — the pressure gauge is a Boyle's law calculator. In medicine, a syringe draws fluid by increasing the barrel volume (lowering pressure) — the atmospheric pressure pushes fluid in. Boyle's law is why your ears pop in a plane: the trapped air expands as cabin pressure drops, pushing against the eardrum.</p>

**Image prompt:** A chalk drawing of a sealed cylinder with a piston. Position 1: V₁ = 100 cm³, P₁ = 101 kPa. Position 2: V₂ = 50 cm³, P₂ = 202 kPa. The PV hyperbola graph. Molecular view: fewer volume → more collisions → higher pressure. A bicycle pump and a scuba tank. Chalk on dark green board. Square 1:1.


## BB-NEW-811 — The ideal gas law: PV = nRT

**Subject:** physics | **Topic:** thermodynamics | **Concept:** ideal-gas-law; PV=nRT; universal-gas-constant; molar-volume | **Ground:** g0 | **Builds on:** [BB-NEW-268, BB-NEW-269, BB-NEW-810]

**Floor 0 (Idea):**
<p>Three scientists, working decades apart, discovered three laws: Boyle (P ∝ 1/V at constant T), Charles (V ∝ T at constant P), Gay-Lussac (P ∝ T at constant V). Combine them and you get the ideal gas law: PV = nRT. One equation unifies pressure, volume, temperature, and the number of molecules. It's the equation of state for an ideal gas — and a remarkably good approximation for real gases under everyday conditions.</p>

**Floor 1 (Concrete):**
<p>Calculate the volume of 1 mole of ideal gas at STP (Standard Temperature and Pressure: T = 273.15 K, P = 101.325 kPa). R = 8.314 J/mol·K. V = nRT/P = 1 × 8.314 × 273.15 / 101,325 = 0.02241 m³ = 22.41 L. This is the molar volume — 22.4 L of any ideal gas at STP.</p>
<p>A car tyre: volume ~30 L = 0.030 m³. Temperature 300 K, gauge pressure 200 kPa → absolute pressure = 301 kPa. Moles of air: n = PV/RT = 301,000 × 0.030 / (8.314 × 300) = 9030/2494 ≈ 3.62 mol. Mass: air molar mass ≈ 0.029 kg/mol, so m = 3.62 × 0.029 = 0.105 kg — about 105 g of air. At 250 kPa (higher pressure): n = 250,000 × 0.030/2494 ≈ 3.01 mol extra, ~87 g more air.</p>

**Floor 2 (Definition):**
<p>The <strong>ideal gas law:</strong> PV = nRT, where P is absolute pressure (Pa), V is volume (m³), n is number of moles, R = 8.314 J/mol·K (universal gas constant), T is absolute temperature (K). Alternate forms: PV = NkT (N = number of molecules, k = 1.38 × 10⁻²³ J/K — Boltzmann's constant). An <strong>ideal gas</strong> is one where molecules have negligible volume and no intermolecular forces (except during elastic collisions). The law holds for real gases at low pressures and high temperatures. It fails at high pressures (molecular volume matters) and low temperatures (intermolecular forces cause condensation). The law unifies the three historical gas laws and is the foundation of thermodynamics and kinetic theory.</p>

**Floor 3 (In action):**
<p>PV = nRT governs everything from weather balloons to internal combustion engines. A weather balloon expands as it rises because P decreases — at 30 km altitude, P is about 1% of sea level, so the balloon's volume increases ~100× (adjusted for the temperature drop). An engine cylinder compresses the fuel-air mixture from ~500 cm³ to ~50 cm³ (10:1 compression ratio) — by PV = nRT, the temperature rises to ~700 K before ignition, enabling diesel engines to auto-ignite. Aerosol cans warn against heating because P ∝ T at constant V — throwing one into a fire can cause a BLEVE (boiling liquid expanding vapour explosion). The ideal gas law is the simplest equation of state, but it's accurate enough to design most gas-handling equipment.</p>

**Image prompt:** A chalk drawing of the three historical laws combining into PV = nRT. Boyle: PV curve at constant T. Charles: VT line at constant P. Gay-Lussac: PT line at constant V. The unified equation. A car tyre, weather balloon, and engine cylinder as applications. Chalk on dark green board. Square 1:1.


## BB-NEW-812 — Charles's law and absolute zero

**Subject:** physics | **Topic:** thermodynamics | **Concept:** Charles-law; Gay-Lussacs-law; absolute-zero; Kelvin-scale | **Ground:** g0 | **Builds on:** [BB-NEW-811, BB-NEW-261, BB-NEW-268]

**Floor 0 (Idea):**
<p>Heat a balloon and it expands. Cool it and it shrinks. Jacques Charles (1787) discovered that at constant pressure, the volume of a gas is directly proportional to its absolute temperature. Plot volume against temperature for any gas, and the line extrapolates to zero volume at the same temperature: −273.15°C. That is absolute zero — the temperature at which molecular motion would theoretically cease. Lord Kelvin built the temperature scale on this insight.</p>

**Floor 1 (Concrete):**
<p>A helium balloon has volume 2.00 L at 20°C (293 K). Cooled to −73°C (200 K): V₂ = V₁ × T₂/T₁ = 2.00 × 200/293 = 1.37 L. Heated to 100°C (373 K): V₂ = 2.00 × 373/293 = 2.55 L. The volume change is linear with absolute temperature.</p>
<p>Extrapolating to V = 0: the V-T line for any gas at constant P crosses the temperature axis at approximately −273°C. Lord Kelvin (William Thomson) proposed in 1848 that this is the true zero of temperature — an absolute scale where 0 K = −273.15°C. The kelvin scale starts at absolute zero and uses the same size degree as Celsius: T(K) = T(°C) + 273.15.</p>

**Floor 2 (Definition):**
<p><strong>Charles's law:</strong> At constant pressure, V ∝ T (absolute), or V₁/T₁ = V₂/T₂. <strong>Gay-Lussac's law:</strong> At constant volume, P ∝ T (absolute), or P₁/T₁ = P₂/T₂. Together with Boyle's law, these yield the ideal gas law. <strong>Absolute zero</strong> (0 K = −273.15°C = −459.67°F) is the theoretical temperature at which an ideal gas would have zero volume (real gases liquefy or solidify first) and molecular kinetic energy would reach its minimum (quantum zero-point energy remains). The <strong>kelvin</strong> is the SI base unit of temperature; 1 K = 1°C in size. The Kelvin scale is defined by Boltzmann's constant: k = 1.380649 × 10⁻²³ J/K, which sets the size of the degree.</p>

**Floor 3 (In action):**
<p>Absolute zero is unreachable — the third law of thermodynamics — but we've gotten astonishingly close. Laser cooling and magnetic evaporation have achieved temperatures of ~100 pK (10⁻¹⁰ K) in dilute atomic gases. At these temperatures, atoms move at millimetres per second and exhibit Bose-Einstein condensation — they lose individual identity and behave as a single quantum object. Liquid nitrogen (77 K, −196°C) is used to freeze warts, preserve biological samples, and cool infrared sensors. Liquid helium (4.2 K) cools MRI magnets. The CMB (cosmic microwave background) is at 2.725 K — the entire universe is a gas that has cooled to near absolute zero since the Big Bang.</p>

**Image prompt:** A chalk drawing of a V-T graph for three gases. Three straight lines converging at the same point on the T-axis: −273.15°C. The kelvin scale alongside Celsius. A balloon expanding when heated, shrinking when cooled. Equation: V₁/T₁ = V₂/T₂. Chalk on dark green board. Square 1:1.


## BB-NEW-813 — The kinetic theory of gases: pressure from bouncing molecules

**Subject:** physics | **Topic:** thermodynamics | **Concept:** kinetic-theory; molecular-speed; pressure-derivation; RMS-speed | **Ground:** g1 | **Builds on:** [BB-NEW-270, BB-NEW-811, BB-NEW-266]

**Floor 0 (Idea):**
<p>What IS pressure? It's billions of molecules smashing into the walls of their container, each collision delivering a tiny impulse. The kinetic theory of gases derives the ideal gas law from Newton's laws applied to individual molecules. Pressure emerges from the average kinetic energy of the molecules — heat them up, they move faster, they hit harder and more often, pressure rises.</p>

**Floor 1 (Concrete):**
<p>Nitrogen molecules (N₂, mass = 4.65 × 10⁻²⁶ kg) in air at 20°C (293 K). Average kinetic energy: KE_avg = (3/2)kT = (3/2)(1.38×10⁻²³)(293) = 6.06 × 10⁻²¹ J. RMS speed: v_rms = √(3kT/m) = √(3 × 1.38×10⁻²³ × 293 / 4.65×10⁻²⁶) = √(3 × 4060/4.65×10⁻³) = √(2.62×10⁵) ≈ 512 m/s. That's 1840 km/h — faster than a jetliner. At 0°C: v_rms = √(3kT/m) with T = 273 → v_rms ≈ 493 m/s. At 100°C: v_rms ≈ 570 m/s.</p>
<p>Pressure derivation: Consider N molecules in a cube of side L. One molecule of mass m, velocity v_x, hits a wall every Δt = 2L/v_x seconds. Force = change in momentum per collision / time = 2mv_x / (2L/v_x) = mv_x²/L. Summing over all molecules: P = F/A = (N/V) × m⟨v_x²⟩. Using ½m⟨v²⟩ = (3/2)kT gives P = NkT/V = nRT/V. The ideal gas law emerges from mechanics.</p>

**Floor 2 (Definition):**
<p><strong>Kinetic theory assumptions:</strong> (1) Gas consists of a large number of identical molecules in random motion. (2) Molecules are point particles — negligible volume compared to container. (3) Collisions are perfectly elastic. (4) No intermolecular forces except during collisions. (5) Newton's laws apply. <strong>Key results:</strong> P = (1/3)(N/V) m⟨v²⟩. Average translational KE = ½m⟨v²⟩ = (3/2)kT. <strong>RMS speed:</strong> v_rms = √(3kT/m) = √(3RT/M). <strong>Mean free path:</strong> λ = 1/(√2 π d² n_v) — average distance between collisions (≈ 70 nm for air at STP). <strong>Maxwell-Boltzmann distribution:</strong> f(v) = 4π(m/2πkT)^(3/2) v² e^(−mv²/2kT).</p>

**Floor 3 (In action):**
<p>The kinetic theory connects the microscopic and macroscopic worlds. The speed of sound in a gas is about 0.68 × v_rms — sound propagates via molecular collisions, so faster molecules mean faster sound. Diffusion: a perfume molecule takes hours to cross a room because it undergoes billions of collisions — its path is a random walk, not a straight line. The kinetic theory explains why light gases diffuse faster (Graham's law: rate ∝ 1/√M) — uranium enrichment exploits this to separate ²³⁵UF₆ from ²³⁸UF₆ using the minuscule mass difference. The Maxwell-Boltzmann distribution explains why Earth's atmosphere has almost no hydrogen or helium — their RMS speeds at atmospheric temperatures exceed escape velocity, so they leak into space.</p>

**Image prompt:** A chalk drawing of a cube containing gas molecules as bouncing spheres. One molecule's trajectory shown: bouncing between walls. Force = 2mv_x/Δt on each collision. The Maxwell-Boltzmann distribution curve: probability vs speed, with v_mp, v_avg, v_rms marked. Equation: v_rms = √(3kT/m). Chalk on dark green board. Square 1:1.


## BB-NEW-814 — Refrigeration: the heat pump in your kitchen

**Subject:** physics | **Topic:** thermodynamics | **Concept:** refrigeration; heat-pump; coefficient-of-performance; vapour-compression-cycle | **Ground:** g0 | **Builds on:** [BB-NEW-804, BB-NEW-806, BB-NEW-271]

**Floor 0 (Idea):**
<p>A refrigerator is a heat pump: it extracts heat from a cold space (the interior) and dumps it into a warm space (your kitchen). It does this by exploiting the latent heat of vaporisation. A refrigerant liquid evaporates inside the cold compartment, absorbing heat. It's then compressed, condensed outside (releasing the heat), and expanded back to low pressure to repeat the cycle. The compressor does work; the refrigerant does the heavy lifting.</p>

**Floor 1 (Concrete):**
<p>A typical refrigerator maintains an interior at 3°C (276 K) while the kitchen is at 25°C (298 K). The refrigerant (historically CFC-12, now R-134a or R-600a) has a boiling point around −26°C at atmospheric pressure. The cycle: (1) Compressor raises the refrigerant vapour pressure to ~1 MPa, heating it to ~50°C. (2) Hot vapour condenses in the external coils, releasing heat to the kitchen. (3) Liquid passes through an expansion valve, dropping pressure — and temperature — to ~−20°C. (4) Cold liquid evaporates in the internal coils, absorbing heat from the fridge interior. The cycle repeats.</p>
<p>Coefficient of performance (COP): for a Carnot refrigerator, COP_max = T_C/(T_H − T_C) = 276/(298 − 276) = 276/22 = 12.5. A real fridge achieves COP ≈ 3–5. To remove 100 J from the cold space, the compressor uses ~25 J of electricity, and 125 J is dumped into the kitchen.</p>

**Floor 2 (Definition):**
<p>A <strong>refrigerator</strong> (or heat pump) moves heat from a cold reservoir to a hot reservoir using external work. <strong>Coefficient of Performance:</strong> COP = Q_C/W (cooling mode) or COP_hp = Q_H/W (heating mode). Carnot COP_max = T_C/(T_H − T_C). A refrigerator is a reversed heat engine. The <strong>vapour-compression cycle</strong> has four stages: compression (work in), condensation (heat out), expansion (pressure drop), evaporation (heat in). The <strong>refrigerant</strong> must have a boiling point below the cold space temperature at low pressure and above the hot space temperature at high pressure. The cycle exploits the latent heat of vaporisation — the phase change absorbs or releases far more energy than a temperature change alone.</p>

**Floor 3 (In action):**
<p>Refrigeration changed civilisation. Before mechanical refrigeration, ice was harvested from frozen lakes in winter and stored in insulated icehouses through summer. The first practical vapour-compression refrigerator was built in 1834 by Jacob Perkins; domestic units appeared in the 1920s. Today, ~1.5 billion refrigerators and air conditioners run worldwide. A heat pump (reverse-cycle air conditioner) heats a house in winter by extracting heat from cold outside air — even at 0°C, the air contains enormous thermal energy relative to absolute zero. COP of 3–5 means for every 1 kWh of electricity, you get 3–5 kWh of heating. The environmental cost: early refrigerants (CFCs) destroyed ozone; replacements (HFCs) are potent greenhouse gases. The search for efficient, environmentally benign refrigerants continues.</p>

**Image prompt:** A chalk drawing of the vapour-compression cycle. Four stages in a loop: compressor → condenser (outside, hot) → expansion valve → evaporator (inside, cold). Heat Q_C absorbed inside, Q_H = Q_C + W dumped outside. COP = Q_C/W. A house with a heat pump extracting heat from winter air. Chalk on dark green board. Square 1:1.


## BB-NEW-815 — The kinetic theory and heat toolkit

**Subject:** physics | **Topic:** thermodynamics | **Concept:** thermodynamics-summary; gas-laws-heat-engines-synthesis | **Ground:** g1 | **Builds on:** [BB-NEW-800 through BB-NEW-814]

**Floor 0 (Idea):**
<p>After 15 BBs spanning rotational dynamics and thermal physics, the picture is complete. The macroscopic behaviour of heat — temperature, pressure, expansion, phase change — is the collective result of microscopic molecular motion. The laws of thermodynamics are statistical certainties arising from the mechanics of quadrillions of particles. This is the bridge from Newton's world to the atomic age.</p>

**Floor 1 (Concrete):**
<p>Identify the principle:</p>
<p>1. Figure skater spinning faster: I decreases → ω increases. L = Iω conserved.</p>
<p>2. Car engine: heat Q_H → work W + waste Q_C. η < 1 − T_C/T_H.</p>
<p>3. Pressure cooker: P ∝ T at constant V. Higher T → higher P → higher boiling point.</p>
<p>4. Melting ice: Q = mL_f = 334 kJ/kg. Temperature stays at 0°C until all ice is gone.</p>
<p>5. Hot air balloon: V ∝ T at constant P. Heated air expands, density drops, buoyancy lifts.</p>
<p>6. Bicycle pump heating: adiabatic compression. Work → heat. PV^γ = constant.</p>
<p>7. Fridge: heat pump. COP = Q_C/W. Extracts heat from cold, dumps it in kitchen.</p>

**Floor 2 (Definition):**
<p><strong>Thermal physics master principles:</strong></p>
<p>• <strong>Kinetic theory:</strong> P = (1/3)(N/V)m⟨v²⟩. KE_avg = (3/2)kT. v_rms = √(3kT/m).</p>
<p>• <strong>Ideal gas law:</strong> PV = nRT = NkT. Boyle (PV = const), Charles (V ∝ T), Gay-Lussac (P ∝ T) are special cases.</p>
<p>• <strong>First law:</strong> ΔU = Q − W. Heat and work are equivalent energy transfers.</p>
<p>• <strong>Second law:</strong> ΔS ≥ 0. Carnot efficiency η = 1 − T_C/T_H. Heat flows hot → cold.</p>
<p>• <strong>Phase changes:</strong> Q = mL. Fusion (melt/freeze), vaporisation (boil/condense). Latent heat is bond-breaking energy.</p>
<p>• <strong>Calorimetry:</strong> Q_lost = Q_gained. Thermal equilibrium T_f from energy balance.</p>
<p>• <strong>Refrigeration:</strong> COP = Q_C/W. Reversed heat engine. Vapour-compression cycle.</p>

**Floor 3 (In action):**
<p>Thermal physics is the science of energy transformation. Every power plant, every engine, every refrigerator, every living cell operates on these principles. The Sun's fusion core at 15 million K radiates energy that drives Earth's weather, photosynthesis, and the entire food chain. The heat death of the universe — the final state of maximal entropy — is the ultimate prediction of thermodynamics. Between the birth of stars and the final darkness, every thermal process is governed by the same few laws. Frye's contribution is to show that these laws are not abstractions: they are operational instructions for building engines, preserving food, and keeping warm in winter.</p>

**Image prompt:** A chalk drawing of a grand synthesis: a spinning skater (L = Iω), an engine (Q_H → W + Q_C), a pressure cooker (P ∝ T), ice melting (Q = mL), a hot air balloon (V ∝ T), a fridge (heat pump). The master equation table. "KINETIC THEORY & HEAT" at top. Chalk on dark green board. Square 1:1.
