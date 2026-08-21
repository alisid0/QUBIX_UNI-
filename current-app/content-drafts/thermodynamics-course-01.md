# Thermodynamics — Complete Course (15 BBs)

A rigorous, equation-driven thermodynamics course drawn from H.C. Verma's treatment. Every key equation — Q = mcΔT, Q = mL, PV = nRT, ΔU = Q − W, PV^γ = constant, η = 1 − T_c/T_h — appears in multiple BBs, in multiple contexts, until they are automatic. The course runs from temperature through gas laws through the laws of thermodynamics to the Carnot engine. Currently 0 BBs exist in this topic.

---

# Part 1 — Temperature, heat, and thermal properties

---

## BB-NEW-260 — Temperature and heat are not the same thing

**Subject:** physics | **Topic:** thermodynamics | **Concept:** temperature-vs-heat; thermal-energy; kinetic-theory-preview | **Ground:** g0 | **Builds on:** [Card 01, Card 10]

**Floor 0 (Idea):**
<p>A spark from a campfire is at about 800°C — it won't burn you. A cup of tea at 80°C will scald you badly. Temperature is not heat. Temperature measures how vigorously the particles are jiggling — the average kinetic energy per particle. Heat is the total thermal energy transferred. The spark has high temperature but almost no heat (few particles). The tea has moderate temperature but enormous heat (billions of particles). They are different quantities, measured in different units, answering different questions.</p>

**Floor 1 (Concrete):**
<p>A swimming pool at 25°C contains vastly more thermal energy than a cup of boiling water at 100°C. The pool's water molecules (maybe 10³⁰ of them) each have moderate kinetic energy — the total is staggering. The cup's molecules (maybe 10²⁵) jiggle faster individually but there are far fewer of them. If you pour the boiling water into the pool, the pool's temperature doesn't measurably change — the heat from the cup is trivial compared to the pool's thermal mass. Temperature is intensive (doesn't depend on amount). Heat is extensive (depends on amount). A thermometer reads temperature, not heat. Confusing them is like confusing speed with distance.</p>

**Floor 2 (Definition):**
<p><strong>Temperature</strong> T is a measure of the average random kinetic energy of particles in a substance. It is an <strong>intensive</strong> property — independent of the amount of substance. Measured in kelvin (K), degrees Celsius (°C), or degrees Fahrenheit (°F). <strong>Heat</strong> Q is the energy transferred between systems due to a temperature difference. It is an <strong>extensive</strong> property — proportional to the amount of substance. Measured in joules (J). <strong>Internal energy</strong> U is the total kinetic + potential energy of all particles in a system. Heat is energy in transit; temperature is a state indicator. The relationship: Q = mcΔT (for a given mass m and specific heat capacity c) — heat causes temperature change.</p>

**Floor 3 (In action):**
<p>The temperature/heat distinction is the first conceptual hurdle in thermodynamics. A large iceberg at 0°C contains more heat energy than a burning match at 600°C — melting an iceberg requires staggering energy input despite its low temperature. The specific heat capacity c quantifies how much heat is needed per kilogram per degree. Water's c is very high (4180 J/kg·K) — it takes a lot of heat to change water's temperature, which is why oceans moderate climate and why water is an excellent coolant. Iron's c is about 450 J/kg·K — it heats up and cools down quickly. c is the conversion factor between temperature change and heat. Q = mcΔT. This equation is the first and most-used tool in calorimetry.</p>

**Image prompt:** A chalk drawing of a spark (800°C, tiny mass) beside a cup of tea (80°C, moderate mass). Speech bubbles: spark says "high temperature, almost no heat," tea says "moderate temperature, lots of heat." Below: Q = mcΔT with each term labelled. A table of specific heat capacities: water 4180, iron 450, aluminium 900 J/kg·K. Chalk on dark green board. Square 1:1.

---

## BB-NEW-261 — Temperature scales: Celsius, Kelvin, and absolute zero

**Subject:** physics | **Topic:** thermodynamics | **Concept:** temperature-scales; Celsius; Kelvin; absolute-zero | **Ground:** g0 | **Builds on:** [BB-NEW-260]

**Floor 0 (Idea):**
<p>The Celsius scale sets 0°C at the freezing point of water and 100°C at the boiling point — convenient for daily life, arbitrary for physics. The Kelvin scale sets 0 K at absolute zero — the temperature where particle motion theoretically stops. The size of one kelvin is the same as one Celsius degree. The conversion is T(K) = T(°C) + 273.15. Absolute zero is −273.15°C — the coldest possible temperature, never quite reachable.</p>

**Floor 1 (Concrete):**
<p>Room temperature: ~20°C = 293 K. Body temperature: 37°C = 310 K. Boiling water: 100°C = 373 K. Liquid nitrogen: −196°C = 77 K. Liquid helium: −269°C = 4.2 K. Deep space: ~2.7 K — the cosmic microwave background. Absolute zero (0 K) has never been achieved — the record is a few billionths of a kelvin above zero, where matter behaves in bizarre quantum ways (Bose–Einstein condensates). The Kelvin scale is the SI base unit of temperature. All thermodynamic formulas use kelvin — plugging Celsius into PV = nRT will give nonsense. The conversion is always the same: add 273 (or 273.15 for precision). Never forget this step.</p>

**Floor 2 (Definition):**
<p>The three common temperature scales: <strong>Celsius</strong> (°C) — 0 = water freezes, 100 = water boils (at 1 atm). <strong>Fahrenheit</strong> (°F) — 32 = water freezes, 212 = boils. Conversion: T(°F) = (9/5)T(°C) + 32. <strong>Kelvin</strong> (K) — the SI unit. 0 K = absolute zero = −273.15°C. ΔT of 1 K = ΔT of 1°C. <strong>Absolute zero</strong> is the theoretical lower limit of temperature — the point where a classical ideal gas would have zero volume and zero pressure. In reality, quantum effects dominate near 0 K. All gas law calculations MUST use kelvin. T(K) = T(°C) + 273.15. Use 273 for most problems; 273.15 when precision matters.</p>

**Floor 3 (In action):**
<p>Converting to kelvin is non-negotiable in thermodynamics. A gas at 27°C: T = 27 + 273 = 300 K. A gas cooled by 50°C from 27°C: new T = −23°C = 250 K. The ratio of absolute temperatures is 250/300 = 5/6 — the gas pressure or volume will scale by this ratio (if other variables are held constant). Using Celsius directly gives (−23)/27 = negative ratio — nonsense. In PV = nRT, if you use Celsius by mistake, you'll get absurd answers (negative volume, negative pressure). The kelvin conversion is the first step in every gas law calculation. Do it automatically, without thinking: °C → +273 → K. Every time.</p>

**Image prompt:** A chalk drawing of three thermometers side by side: Celsius (0 to 100), Kelvin (273 to 373), Fahrenheit (32 to 212). Key points labelled: water freezes, water boils, absolute zero (−273°C = 0 K = −459°F). The conversion formulas boxed. A warning: "All gas law calculations use KELVIN." Chalk on dark green board. Square 1:1.

---

## BB-NEW-262 — Thermal expansion: solids, liquids, and gases when heated

**Subject:** physics | **Topic:** thermodynamics | **Concept:** thermal-expansion; linear-expansion; volume-expansion; anomalous-water | **Ground:** g0 | **Builds on:** [BB-NEW-260]

**Floor 0 (Idea):**
<p>Heat something and it gets bigger. The particles vibrate more vigorously, pushing each other slightly further apart. This is thermal expansion — visible in railway tracks that buckle in summer, in the gaps left between bridge sections, and in the liquid rising up a thermometer. The expansion is proportional to the original length (or volume) and the temperature change: ΔL = αL₀ΔT, ΔV = βV₀ΔT. Small coefficients, big consequences.</p>

**Floor 1 (Concrete):**
<p>A steel railway track is 20 m long at 10°C. On a 40°C day, ΔT = 30°C. α_steel ≈ 1.2 × 10⁻⁵ /°C. Expansion: ΔL = 1.2×10⁻⁵ × 20 × 30 = 0.0072 m = 7.2 mm. A single rail expands by over 7 mm — across a kilometre of track, the total expansion is about 36 cm. Without expansion gaps, the rails would buckle. A mercury thermometer: the bulb contains mercury. As temperature rises, the mercury expands more than the glass, so the column rises. Alcohol thermometers use the same principle. In a bimetallic strip (brass + steel bonded together), brass expands more than steel — the strip bends when heated, used in thermostats to switch circuits on and off.</p>

**Floor 2 (Definition):**
<p><strong>Linear expansion:</strong> ΔL = α L₀ ΔT, where α is the <strong>coefficient of linear expansion</strong> (units: /K or /°C). L₀ = original length at reference temperature. <strong>Area expansion:</strong> ΔA ≈ 2α A₀ ΔT. <strong>Volume expansion:</strong> ΔV = β V₀ ΔT, where β is the <strong>coefficient of volume expansion</strong>. For solids, β ≈ 3α. For liquids and gases, β is measured directly. <strong>Water's anomaly:</strong> water contracts when heated from 0°C to 4°C, then expands normally above 4°C — its maximum density is at 4°C. This is why ice floats and lakes freeze from the top down.</p>

**Floor 3 (In action):**
<p>Thermal expansion is engineered into every large structure. Bridge expansion joints, railway gaps, concrete expansion cuts, overhead power lines hung with slack in summer — all accommodate ΔL = αL₀ΔT. Ignore it, and the forces are enormous. The thermal stress in a fully constrained bar heated by ΔT is σ = αEΔT, where E is Young's modulus — for steel, a 30°C rise produces ~70 MPa of stress, enough to buckle an unsupported rail. The bimetallic strip is a simple, elegant application: two metals, different α, bonded. Heat it and it bends — a mechanical temperature sensor with no electronics. Fire sprinklers use a bimetallic strip or a frangible bulb (liquid expansion) to trigger at a fixed temperature. Thermal expansion is simple physics with outsized engineering consequences.</p>

**Image prompt:** A chalk drawing of a railway track with an expansion gap labelled. The calculation ΔL = αL₀ΔT with values for steel. A bimetallic strip shown cold (straight) and hot (bent) with arrows. Below: water's density curve — peak at 4°C, dropping to both sides. Chalk on dark green board. Square 1:1.

---

## BB-NEW-263 — Specific heat capacity: the thermal inertia of matter

**Subject:** physics | **Topic:** thermodynamics | **Concept:** specific-heat-capacity; Q=mcΔT; thermal-inertia; water | **Ground:** g0 | **Builds on:** [BB-NEW-260]

**Floor 0 (Idea):**
<p>Put a metal spoon and a wooden spoon in a pot of boiling water. The metal handle becomes painfully hot within seconds; the wooden handle stays touchable. Both are at the same temperature — but metal has a far lower specific heat capacity. It takes much less heat to raise its temperature, so it heats up (and cools down) quickly. Wood has a higher c — it resists temperature change. Specific heat capacity is the thermal inertia of a substance: how stubbornly it holds its temperature.</p>

**Floor 1 (Concrete):**
<p>How much energy to heat 2 kg of water from 20°C to 100°C? Q = mcΔT = 2 × 4180 × 80 = 668,800 J ≈ 669 kJ. The same energy would heat 2 kg of iron by ΔT = Q/(mc) = 669,000/(2 × 450) ≈ 743°C — iron would glow red-hot with the same energy input. A 100 W immersion heater delivers 100 J/s. To heat 1 kg of water by 10°C: Q = 1 × 4180 × 10 = 41,800 J. Time = 41,800/100 = 418 seconds ≈ 7 minutes. For 1 kg of aluminium (c = 900): Q = 1 × 900 × 10 = 9,000 J. Time = 90 seconds. Aluminium heats about 4.6× faster. This is why aluminium pans heat quickly and why water takes forever to boil.</p>

**Floor 2 (Definition):**
<p><strong>Specific heat capacity</strong> c is the energy required to raise the temperature of 1 kg of a substance by 1 K (or 1°C). The fundamental calorimetry equation: <strong>Q = mcΔT</strong>, where Q = heat transferred (J), m = mass (kg), c = specific heat capacity (J/kg·K), ΔT = temperature change (K or °C). <strong>Heat capacity</strong> C = mc is the energy to raise the whole object by 1 K (J/K). <strong>Molar heat capacity</strong> C_m = Mc (J/mol·K). For gases, c depends on whether heating occurs at constant pressure (c_p) or constant volume (c_v) — c_p > c_v because work is done against the atmosphere during expansion.</p>

**Floor 3 (In action):**
<p>Q = mcΔT is used more than any other equation in thermal physics. In an electric shower: the heater's power rating tells you how fast it can raise water temperature. In a car radiator: water's exceptionally high c (4180) makes it an excellent coolant — it absorbs vast amounts of engine heat without boiling. The same property makes coastal climates milder: the sea absorbs heat slowly in summer and releases it slowly in winter, moderating temperatures. In cooking, a cast-iron pan (moderate c, large mass) holds heat well; a thin aluminium pan (low c, small mass) responds instantly to flame changes. The product mc — heat capacity — is the practical number: how much energy to change this specific object's temperature by 1°C. Multiply by ΔT to get the total energy needed.</p>

**Image prompt:** A chalk drawing of Q = mcΔT in a box, each term labelled with units. Below: a table — water 4180, aluminium 900, iron 450, copper 385, air ~1000 J/kg·K. A worked example: 2 kg water from 20°C to 100°C → Q = 669 kJ. A cooking comparison: copper pan (heats fast, cools fast) vs cast iron (heats slow, holds heat). Chalk on dark green board. Square 1:1.

---

# Part 2 — Change of state and calorimetry

---

## BB-NEW-264 — Latent heat: the energy of changing state

**Subject:** physics | **Topic:** thermodynamics | **Concept:** latent-heat; fusion; vaporisation; Q=mL; phase-change | **Ground:** g0 | **Builds on:** [BB-NEW-260, BB-NEW-263]

**Floor 0 (Idea):**
<p>Heat ice at −10°C. Its temperature rises — Q = mcΔT. At 0°C, it stops warming. You keep adding heat — 334,000 joules per kilogram — and the temperature stays at exactly 0°C until all the ice has melted. This energy is the latent heat of fusion: it goes into breaking the rigid hydrogen-bonded lattice, not into speeding up molecules. Once melted, the water's temperature rises again — until 100°C, where it pauses again, absorbing 2,260,000 J/kg to vaporise. Latent heat is the energy of rearrangement, not of warming.</p>

**Floor 1 (Concrete):**
<p>Melt 500 g of ice at 0°C to water at 0°C. Q = mL_f = 0.5 × 334,000 = 167,000 J = 167 kJ. The temperature doesn't change — all 167 kJ goes into breaking bonds. Now heat the resulting water from 0°C to 100°C: Q = mcΔT = 0.5 × 4180 × 100 = 209,000 J = 209 kJ. Now boil it to steam at 100°C: Q = mL_v = 0.5 × 2,260,000 = 1,130,000 J = 1,130 kJ. Notice the hierarchy: melting takes significant energy (334 kJ/kg), warming takes energy (418 kJ for 0→100°C), vaporising takes enormous energy (2,260 kJ/kg). Steam at 100°C contains far more energy than water at 100°C — which is why steam burns are so severe. The steam condenses on your skin, releasing that latent heat.</p>

**Floor 2 (Definition):**
<p><strong>Latent heat</strong> L is the energy absorbed or released during a phase change at constant temperature. <strong>Latent heat of fusion</strong> L_f: solid ↔ liquid. For water, L_f = 334 kJ/kg (or 334 J/g). <strong>Latent heat of vaporisation</strong> L_v: liquid ↔ gas. For water, L_v = 2260 kJ/kg (or 2260 J/g). The equation: <strong>Q = mL</strong>, where m = mass. During a phase change, temperature is constant — all energy goes into breaking/rearranging intermolecular bonds. The latent heat for vaporisation is always larger than for fusion (breaking completely free takes more energy than just loosening). <strong>Sublimation</strong> (solid → gas, e.g., dry ice) also has a latent heat.</p>

**Floor 3 (In action):**
<p>Latent heat is the reason sweating cools you. Water evaporating from your skin absorbs 2260 J per gram from your body — an extraordinarily effective cooling mechanism. It's why a pot of boiling water never exceeds 100°C no matter how high the flame — the extra energy goes into vaporisation, not temperature rise. It's why steam engines work: the latent heat in steam is released when it condenses, doing mechanical work. It's why ice in a drink keeps it cold: the ice absorbs 334 J/g melting, cooling the drink far more effectively than cold water alone would. Q = mL is as fundamental as Q = mcΔT — one covers phase changes, the other covers temperature changes. Together they describe every heating and cooling process.</p>

**Image prompt:** A chalk drawing of a heating curve for water: temperature (y-axis) vs heat added (x-axis). Flat sections at 0°C (melting — Q=mL_f) and 100°C (boiling — Q=mL_v). Sloping sections for solid warming, liquid warming, gas warming (each Q=mcΔT with different c values). All Q values labelled. Below: L_f = 334 kJ/kg, L_v = 2260 kJ/kg. Chalk on dark green board. Square 1:1.

---

## BB-NEW-265 — Calorimetry: measuring heat exchange

**Subject:** physics | **Topic:** thermodynamics | **Concept:** calorimetry; thermal-equilibrium; heat-lost-equals-heat-gained; mixture-problems | **Ground:** g0 | **Builds on:** [BB-NEW-263, BB-NEW-264]

**Floor 0 (Idea):**
<p>Mix hot water with cold water. The hot water cools down; the cold water warms up. Eventually they reach the same temperature — thermal equilibrium. The key principle: in an insulated system, heat lost by the hot body equals heat gained by the cold body. m₁c₁ΔT₁ = m₂c₂ΔT₂. This is the calorimetry equation, and it's the basis for measuring specific heat capacities, latent heats, and final temperatures in any thermal mixing problem.</p>

**Floor 1 (Concrete):**
<p>200 g of aluminium at 100°C is dropped into 300 g of water at 20°C in an insulated container. Find the final temperature T. Heat lost by Al = m_Al × c_Al × (100 − T) = 0.2 × 900 × (100−T). Heat gained by water = m_w × c_w × (T − 20) = 0.3 × 4180 × (T−20). Set equal: 180(100−T) = 1254(T−20). 18,000 − 180T = 1254T − 25,080. 43,080 = 1434T. T ≈ 30.0°C. The aluminium dropped 70°C; the water rose only 10°C — because water's mc product (0.3×4180=1254) is about 7× larger than aluminium's (0.2×900=180). The substance with the larger heat capacity dominates the final temperature.</p>

**Floor 2 (Definition):**
<p><strong>Calorimetry</strong> is the measurement of heat exchange. The fundamental principle: in a thermally isolated system, <strong>ΣQ = 0</strong> — the sum of all heat transfers is zero (heat lost = heat gained). For simple mixing: m₁c₁(T_f − T₁) + m₂c₂(T_f − T₂) = 0, solved for T_f. If a phase change is involved (ice melting, steam condensing), include Q = mL terms. A <strong>calorimeter</strong> is an insulated container (often a polystyrene cup or Dewar flask) that minimises heat exchange with the surroundings. The <strong>method of mixtures</strong>: a hot sample is added to a known mass of cool water; the temperature change of the water gives the sample's specific heat capacity.</p>

**Floor 3 (In action):**
<p>Calorimetry is the experimental foundation of thermochemistry. The specific heat capacity of a new alloy is found by the method of mixtures. The energy content of food is measured in a bomb calorimeter — the food is burned in pure oxygen inside a sealed container surrounded by water; the water's temperature rise gives the energy released. The latent heat of vaporisation of a refrigerant determines its effectiveness in an air conditioner. Every Q = mcΔT and Q = mL calculation ultimately traces back to calorimetry experiments that measured c and L in the first place. The equation is simple — m₁c₁ΔT₁ + m₂c₂ΔT₂ = 0 — but it's the gateway to every thermal energy calculation.</p>

**Image prompt:** A chalk drawing of a calorimeter setup: an insulated cup with thermometer and stirrer, hot metal block being added to cool water. The calculation: m_Al c_Al (100−T) = m_w c_w (T−20). Solved step by step to T ≈ 30°C. Below: ΣQ = 0 in a box — "heat lost = heat gained." Chalk on dark green board. Square 1:1.

---

## BB-NEW-266 — The three states and the kinetic model

**Subject:** physics | **Topic:** thermodynamics | **Concept:** states-of-matter; kinetic-model; intermolecular-forces; Brownian-motion | **Ground:** g0 | **Builds on:** [BB-NEW-260, BB-NEW-264, BB-NEW-228]

**Floor 0 (Idea):**
<p>Solid, liquid, gas — the same substance, three different personalities. The difference is not in the molecules themselves but in how much energy they have and how they're arranged. In a solid, molecules vibrate in fixed positions — locked in a lattice. In a liquid, they slide past each other but stay close — the lattice is gone but they're still touching. In a gas, they fly freely — far apart, colliding occasionally, filling whatever container they're in. Temperature is the measure of their average kinetic energy. Phase changes are the transitions between these personalities.</p>

**Floor 1 (Concrete):**
<p>Water molecules (H₂O) are identical whether they're in ice, liquid water, or steam. In ice (solid): each molecule forms ~4 hydrogen bonds in a rigid hexagonal lattice. The molecules vibrate but can't leave their positions — ice holds its shape. Add energy (334 kJ/kg): the H-bonds break partially, the lattice collapses, molecules can slide — liquid water, which takes the shape of its container. Add more energy (2260 kJ/kg): the remaining H-bonds break completely, molecules fly apart — steam, which expands to fill any volume. The molecules are the same throughout; the structure and energy are what change. The process is reversible: remove energy and steam condenses, water freezes.</p>

**Floor 2 (Definition):**
<p>The <strong>kinetic particle model</strong> describes the three states: <strong>Solid</strong> — particles in fixed positions, strong intermolecular forces, vibrate about fixed points, definite shape and volume. <strong>Liquid</strong> — particles close together but free to move, weaker forces, definite volume but takes shape of container. <strong>Gas</strong> — particles far apart, negligible forces except during collisions, no definite shape or volume, fills container. <strong>Brownian motion</strong> (observed pollen grains jiggling in water) provided the first direct evidence for the kinetic model — the grains were being bombarded by invisible water molecules. <strong>Diffusion</strong> (smell spreading through a room) is a direct consequence — gas particles move randomly and mix.</p>

**Floor 3 (In action):**
<p>The kinetic model unifies the observable (ice melts, water boils) with the molecular. It explains why solids are rigid (locked lattice), why liquids flow (mobile particles), why gases are compressible (mostly empty space). It explains why evaporation cools — the fastest molecules escape, lowering the average kinetic energy of those left behind. It explains why increasing pressure raises boiling point — molecules need more energy to overcome the external pressure. The model is a simplification (real gases aren't ideal, real solids have defects), but it captures the essential physics: matter is made of particles in constant motion, and temperature measures the vigour of that motion. Everything else — expansion, phase change, pressure, diffusion — follows from this single idea.</p>

**Image prompt:** A chalk drawing of the three states at the molecular level: solid (ordered lattice, arrows showing vibration), liquid (disordered, close-packed, arrows showing sliding), gas (widely spaced, arrows showing free flight with collisions). Below: the heating curve with phase transitions labelled, linking each flat section to the molecular picture. Chalk on dark green board. Square 1:1.

---

# Part 3 — The ideal gas

---

## BB-NEW-267 — The ideal gas: a useful fiction

**Subject:** physics | **Topic:** thermodynamics | **Concept:** ideal-gas-model; assumptions; real-vs-ideal | **Ground:** g0 | **Builds on:** [BB-NEW-266]

**Floor 0 (Idea):**
<p>Real gases are messy — molecules have size, attract each other, and don't always bounce perfectly. The ideal gas is a simplified model that ignores all of that. It assumes molecules are point particles (zero volume), with no attractive forces between them, colliding perfectly elastically. No real gas is truly ideal — but at high temperatures and low pressures, most gases come close enough that the model makes accurate predictions. The ideal gas is the frictionless pulley of thermodynamics: unrealistic but extraordinarily useful.</p>

**Floor 1 (Concrete):**
<p>Nitrogen gas (N₂) at room temperature and atmospheric pressure behaves almost ideally — the N₂ molecules are far apart (~10 molecular diameters) and moving fast enough that intermolecular attractions are negligible. Compress it to 100 atmospheres and cool it to −100°C, and it deviates significantly — the molecules are closer together and moving slower, so attractions and finite size matter. Real gases deviate most near their condensation point — where the ideal gas model would predict they remain gaseous but they actually liquefy. The ideal gas assumptions break down when: (1) pressure is high (molecules close together), (2) temperature is low (molecules slow, attractions significant), (3) the gas is near its boiling point. For air at room conditions, the ideal gas model is accurate to better than 0.1%.</p>

**Floor 2 (Definition):**
<p>An <strong>ideal gas</strong> obeys the following assumptions: (1) Molecules are point particles — zero volume. (2) No intermolecular forces except during elastic collisions. (3) Collisions are perfectly elastic (no energy loss). (4) The gas consists of a very large number of identical molecules in random motion. (5) Newton's laws apply to the motion of individual molecules. Under these assumptions, the gas obeys <strong>PV = nRT</strong> (the ideal gas law) and the kinetic theory prediction that average kinetic energy per molecule = (3/2)k_B T. Real gases approximate ideal behaviour at <strong>high temperature</strong> and <strong>low pressure</strong>. The van der Waals equation, (P + a(n/V)²)(V − nb) = nRT, corrects for intermolecular forces (a) and molecular volume (b).</p>

**Floor 3 (In action):**
<p>The ideal gas model is the starting point for all of gas-phase thermodynamics. It's accurate enough for designing internal combustion engines, predicting weather balloon ascent, calculating scuba tank durations, and sizing industrial compressors. When deviations matter — in cryogenics, high-pressure chemistry, or near the critical point — the van der Waals equation or more sophisticated equations of state take over. But for the vast majority of engineering and everyday situations, PV = nRT is sufficient. The genius of the ideal gas model is not its realism but its simplicity: five assumptions that strip away all complications, leaving a single equation that relates the four most important macroscopic variables — pressure, volume, amount, and temperature.</p>

**Image prompt:** A chalk drawing of an ideal gas: tiny dots (molecules) in a box, widely spaced, with arrows showing random velocities. Beside it: the assumptions listed — point particles, no forces, elastic collisions, random motion. Below: a PV diagram comparing ideal gas (hyperbola) with real gas (deviating near liquefaction). Chalk on dark green board. Square 1:1.

---

## BB-NEW-268 — The gas laws: Boyle, Charles, and the pressure law

**Subject:** physics | **Topic:** thermodynamics | **Concept:** Boyles-law; Charles-law; Gay-Lussac-law; gas-laws | **Ground:** g0 | **Builds on:** [BB-NEW-267, BB-NEW-261]

**Floor 0 (Idea):**
<p>Before the full ideal gas law, there were three experimental discoveries — each holding one variable constant to reveal the relationship between the other two. Boyle: at constant T, P ∝ 1/V (pressure and volume are inversely proportional). Charles: at constant P, V ∝ T (volume is proportional to absolute temperature). Gay-Lussac (pressure law): at constant V, P ∝ T (pressure is proportional to absolute temperature). Together: PV/T = constant. These are the three pillars that underpin PV = nRT.</p>

**Floor 1 (Concrete):**
<p><strong>Boyle's law in action:</strong> A bicycle pump. Push the plunger down (decrease V) and the pressure rises — P₁V₁ = P₂V₂. If V halves, P doubles. <strong>Charles's law in action:</strong> A hot air balloon. Heat the air inside (increase T) and it expands (increase V) — some air is pushed out, the density decreases, and the balloon floats. V₁/T₁ = V₂/T₂. <strong>Pressure law in action:</strong> A sealed aerosol can in a fire. As T rises, P rises — P₁/T₁ = P₂/T₂ — until the can bursts. Each law is a special case of PV = nRT with two variables held constant. Combined: P₁V₁/T₁ = P₂V₂/T₂ (for a fixed mass of gas, n constant). This is the combined gas law — the workhorse equation for any process where n doesn't change.</p>

**Floor 2 (Definition):**
<p><strong>Boyle's law</strong> (T constant, n constant): P ∝ 1/V, so <strong>P₁V₁ = P₂V₂</strong>. Graph: P vs V is a rectangular hyperbola; P vs 1/V is a straight line through the origin. <strong>Charles's law</strong> (P constant, n constant): V ∝ T (in kelvin), so <strong>V₁/T₁ = V₂/T₂</strong>. Graph: V vs T is a straight line — extrapolated backward, it hits V=0 at T=0 K (absolute zero). <strong>Gay-Lussac's law</strong> (pressure law) (V constant, n constant): P ∝ T (in kelvin), so <strong>P₁/T₁ = P₂/T₂</strong>. <strong>Combined gas law</strong> (n constant): <strong>P₁V₁/T₁ = P₂V₂/T₂</strong>. All temperatures MUST be in kelvin.</p>

**Floor 3 (In action):**
<p>The combined gas law P₁V₁/T₁ = P₂V₂/T₂ solves almost any fixed-mass gas problem. A weather balloon contains 2000 m³ of helium at 20°C and 1 atm. It rises to where pressure is 0.5 atm and temperature is −40°C. New volume: V₂ = P₁V₁T₂/(P₂T₁) = (1×2000×233)/(0.5×293) ≈ 3,180 m³. The balloon expands — and will eventually burst if the material can't stretch. Scuba divers use the combined gas law to calculate air consumption at depth. A diver's lungs at 30 m depth (4 atm) contain air at 4× the surface density — if they hold their breath and ascend, the expanding air can rupture lung tissue (pulmonary barotrauma). The gas laws are not abstract — they are survival physics at depth and altitude.</p>

**Image prompt:** A chalk drawing of three graphs: (1) P vs V — hyperbola, labelled Boyle's law. (2) V vs T — straight line through origin (K), extrapolating to 0 K, labelled Charles's law. (3) P vs T — straight line through origin (K), labelled pressure law. Below: the combined gas law P₁V₁/T₁ = P₂V₂/T₂ with a worked weather balloon example. "All T in KELVIN." Chalk on dark green board. Square 1:1.

---

## BB-NEW-269 — The ideal gas equation: PV = nRT

**Subject:** physics | **Topic:** thermodynamics | **Concept:** ideal-gas-equation; PV=nRT; universal-gas-constant; molar-volume | **Ground:** g0 | **Builds on:** [BB-NEW-267, BB-NEW-268]

**Floor 0 (Idea):**
<p>Boyle, Charles, and Gay-Lussac each held one variable constant. Combine all three and you get the master equation: PV = nRT. Pressure × Volume = moles × gas constant × temperature. Four variables, one equation. Given any three, find the fourth. The gas constant R = 8.31 J/(mol·K) is universal — the same for every ideal gas, from hydrogen to xenon. This equation is the foundation of gas-phase thermodynamics.</p>

**Floor 1 (Concrete):**
<p>How many moles of air in a 25 m³ room at 20°C and 1 atm (101,300 Pa)? n = PV/(RT) = (101,300 × 25) / (8.31 × 293) = 2,532,500 / 2,435 ≈ 1,040 moles. Mass of air: 1,040 × 0.029 kg/mol ≈ 30 kg — the air in a medium-sized room weighs about 30 kg. What pressure does 2 moles of gas exert in a 10 L container at 300 K? P = nRT/V = (2 × 8.31 × 300) / 0.010 = 498,600 Pa ≈ 4.92 atm. A scuba tank at 200 atm contains 200× the gas that would fill the tank at 1 atm. The number of moles actually in the tank: n = PV/(RT). With V = 10 L = 0.01 m³, P = 200×101,300 = 2.026×10⁷ Pa, T = 293 K: n ≈ 83 moles ≈ 2.4 kg of air.</p>

**Floor 2 (Definition):**
<p>The <strong>ideal gas equation</strong>: <strong>PV = nRT</strong>, where P = pressure (Pa), V = volume (m³), n = amount of substance (mol), R = <strong>universal gas constant</strong> = 8.314 J/(mol·K), T = absolute temperature (K). Alternative forms: PV = Nk_B T, where N = number of molecules and k_B = Boltzmann constant = 1.38×10⁻²³ J/K. Also: P = ρRT/M, where ρ = density (kg/m³) and M = molar mass (kg/mol). At <strong>STP</strong> (standard temperature and pressure: 0°C = 273 K, 1 atm = 101.3 kPa), 1 mole of any ideal gas occupies <strong>22.4 dm³</strong> (22.4 L). This is the molar volume at STP.</p>

**Floor 3 (In action):**
<p>PV = nRT governs every closed gas system. A car tyre: P = nRT/V — as you drive, the tyre heats up, T rises, P rises. The manufacturer's recommended pressure is for cold tyres. An aerosol can thrown into a fire: T rises dramatically, P rises proportionally — the can explodes. A helium balloon rises because the density of helium (M = 4 g/mol) is less than air (M ≈ 29 g/mol) at the same P and T — from P = ρRT/M, ρ ∝ M. A deep breath at the surface and a panicked ascent: P decreases, so V must increase (if T is roughly constant) — Boyle's law in the lungs. PV = nRT is not just an equation to solve; it's a relationship to reason with. If one variable changes, which way must the others go? The equation tells you. Always use kelvin. Always use consistent units (Pa + m³, or atm + L with R = 0.08206 L·atm/(mol·K)).</p>

**Image prompt:** A chalk drawing of PV = nRT in a large box at centre. Each variable labelled: P (Pa), V (m³), n (mol), R = 8.31 J/(mol·K), T (K). Surrounding it: rearrangements — P = nRT/V, V = nRT/P, n = PV/(RT), T = PV/(nR). Worked examples: room air (~1040 mol), scuba tank, car tyre. "ALWAYS use KELVIN." Chalk on dark green board. Square 1:1.

---

## BB-NEW-270 — Kinetic theory: pressure from molecular collisions

**Subject:** physics | **Topic:** thermodynamics | **Concept:** kinetic-theory; pressure; rms-speed; KE-avg=(3/2)k_BT | **Ground:** g1 | **Builds on:** [BB-NEW-267, BB-NEW-269]

**Floor 0 (Idea):**
<p>What IS pressure, at the molecular level? It's the relentless battering of gas molecules against the container walls. Each collision delivers a tiny impulse; billions of collisions per second sum to a steady force per unit area — pressure. Kinetic theory connects the macroscopic (P, V, T) to the microscopic (molecular mass, speed, number). The key result: the average translational kinetic energy of a gas molecule is (3/2)k_B T — directly proportional to absolute temperature. This single equation explains everything from why gases expand when heated to why lighter gases diffuse faster.</p>

**Floor 1 (Concrete):**
<p>Calculate the RMS (root-mean-square) speed of nitrogen molecules in air at 20°C (293 K). M(N₂) = 0.028 kg/mol. m = M/N_A = 0.028/(6.022×10²³) = 4.65×10⁻²⁶ kg. From KE_avg = (3/2)k_B T: ½mv²_rms = (3/2)k_B T. v_rms = √(3k_B T/m) = √(3RT/M). v_rms = √(3 × 8.314 × 293 / 0.028) = √(7310/0.028) = √261,000 ≈ 511 m/s — about 1,840 km/h, faster than a speeding bullet. Hydrogen molecules (M = 0.002 kg/mol) at the same T: v_rms = √(3×8.31×293/0.002) ≈ 1,910 m/s — nearly 4× faster because they're 14× lighter. This is why Earth's atmosphere has almost no free hydrogen — at these speeds, hydrogen molecules exceed escape velocity and leak into space.</p>

**Floor 2 (Definition):**
<p><strong>Kinetic theory of gases</strong> derives macroscopic properties from molecular motion. Key results for an ideal gas: (1) <strong>Pressure:</strong> P = (1/3)ρ(v²)_avg = (1/3)(N/V)m(v²)_avg — pressure is ⅓ × density × mean square speed. (2) <strong>Average kinetic energy per molecule:</strong> KE_avg = ½m(v²)_avg = <strong>(3/2)k_B T</strong>, where k_B = 1.38×10⁻²³ J/K. (3) <strong>RMS speed:</strong> v_rms = √(3k_B T/m) = <strong>√(3RT/M)</strong>. (4) <strong>Total internal energy</strong> of n moles of monatomic ideal gas: <strong>U = (3/2)nRT</strong> (translational KE only — ½k_B T per degree of freedom, 3 translational degrees). For diatomic gases, rotational degrees add: U = (5/2)nRT at moderate temperatures.</p>

**Floor 3 (In action):**
<p>Kinetic theory gives meaning to temperature: T is proportional to the average kinetic energy per molecule. Absolute zero is the temperature at which this kinetic energy would reach its minimum (zero in classical theory; quantum effects prevent zero). It explains Graham's law of effusion: lighter molecules effuse faster, rate ∝ 1/√M — used to separate uranium isotopes (UF₆ gas, mass difference of 235 vs 238). It explains why the speed of sound in a gas is proportional to √T — sound waves are pressure disturbances that propagate via molecular collisions, and the molecular speed sets the limit. Kinetic theory is the bridge from "a gas exerts pressure" to "a gas is a swarm of independent molecules in chaotic motion." Once you cross that bridge, all of thermal physics has a face.</p>

**Image prompt:** A chalk drawing of gas molecules colliding with a wall. Each collision shows a tiny impulse vector. The sum of billions of impulses = pressure force F. Below: the key equations — P=(1/3)ρ(v²)_avg, KE_avg=(3/2)k_B T, v_rms=√(3RT/M). A worked calculation: N₂ at 293 K → v_rms ≈ 511 m/s. Chalk on dark green board. Square 1:1.

---

# Part 4 — The laws of thermodynamics

---

## BB-NEW-271 — The first law of thermodynamics: ΔU = Q − W

**Subject:** physics | **Topic:** thermodynamics | **Concept:** first-law; internal-energy; work; heat; conservation | **Ground:** g1 | **Builds on:** [BB-NEW-260, Card 11, BB-NEW-269]

**Floor 0 (Idea):**
<p>Energy is conserved — you already know this. The first law of thermodynamics is just energy conservation applied to thermal systems: the change in internal energy of a system equals the heat added to it minus the work done BY it. ΔU = Q − W. Heat in (Q positive) increases U. Work done BY the system (W positive — gas expanding, pushing a piston) decreases U. The sign conventions matter, but the idea doesn't: you can't get more energy out than you put in.</p>

**Floor 1 (Concrete):**
<p>A gas in a cylinder absorbs 500 J of heat from a flame. It expands, pushing the piston and doing 300 J of work on the surroundings. The change in internal energy: ΔU = Q − W = 500 − 300 = +200 J. The gas's internal energy increased by 200 J — its temperature rose because not all the heat went into doing work. Now compress the gas: 200 J of work is done ON the gas (W = −200 J, if we use the convention that work done BY the gas is positive — careful here; different textbooks use different conventions). If no heat is exchanged (Q = 0, adiabatic), ΔU = 0 − (−200) = +200 J using W_by = −200. The internal energy increases by 200 J — the gas heats up. Compressing a gas heats it; expanding cools it. This is why a bicycle pump gets warm and why releasing compressed air from a can feels cold.</p>

**Floor 2 (Definition):**
<p>The <strong>first law of thermodynamics</strong>: <strong>ΔU = Q − W</strong>, where ΔU = change in internal energy (J), Q = heat added TO the system (J, positive if added), W = work done BY the system (J, positive if system does work on surroundings). Alternative convention (chemistry/engineering): ΔU = Q + W, with W = work done ON the system. Both are correct — just be consistent. For a gas expanding against an external pressure P_ext: W = ∫ P_ext dV. For constant external pressure: W = P_ext ΔV. <strong>Internal energy</strong> U of an ideal gas depends only on temperature: ΔU = nC_vΔT (monatomic: C_v = (3/2)R; diatomic: (5/2)R at moderate T).</p>

**Floor 3 (In action):**
<p>The first law is the accountant of thermodynamics. Every joule is tracked: heat in, work out, internal energy change. In a car engine: fuel burns (chemical energy → heat Q), gas expands and pushes the piston (work W done BY the gas), the gas cools (ΔU decreases). The energy originally in the fuel ends up as mechanical work (moving the car) and waste heat (exhaust, radiator). The first law says these must balance — the efficiency of any engine is ultimately limited by how much of Q can be converted to useful W. In an isothermal expansion (constant T, ΔU = 0 for ideal gas): Q = W — all added heat is converted to work. In an adiabatic expansion (Q = 0): W = −ΔU — the gas does work at the expense of its internal energy, cooling it. The first law is the master equation of all thermodynamic processes.</p>

**Image prompt:** A chalk drawing of a gas-filled cylinder with a movable piston. Arrows: Q (heat) going in, W (work) coming out as piston moves, ΔU = Q − W annotated inside the cylinder. Below: three special cases — isochoric (ΔV=0, W=0, ΔU=Q), isothermal (ΔT=0, ΔU=0, Q=W), adiabatic (Q=0, ΔU=−W). Chalk on dark green board. Square 1:1.

---

## BB-NEW-272 — Thermodynamic processes: isothermal, adiabatic, isobaric, isochoric

**Subject:** physics | **Topic:** thermodynamics | **Concept:** thermodynamic-processes; isothermal; adiabatic; isobaric; isochoric; PV-diagrams | **Ground:** g1 | **Builds on:** [BB-NEW-271, BB-NEW-269]

**Floor 0 (Idea):**
<p>A gas can change its state (P, V, T) in four fundamentally different ways, depending on what you hold constant. Isothermal: T constant (slow expansion, good thermal contact). Adiabatic: Q = 0 (fast expansion, perfectly insulated). Isobaric: P constant. Isochoric: V constant. Each process has its own PV relationship and its own energy consequences. The PV diagram — pressure vs volume — is the map on which every thermodynamic journey is plotted.</p>

**Floor 1 (Concrete):**
<p><strong>Isothermal expansion</strong> (T constant): PV = constant (Boyle's law). The PV graph is a hyperbola. As the gas expands, it must absorb heat to maintain T — Q = W (ΔU = 0 for ideal gas). <strong>Adiabatic expansion</strong> (Q = 0): PV^γ = constant, where γ = c_p/c_v (monatomic: γ = 5/3; diatomic: 7/5). The adiabatic curve is steeper than the isothermal — the gas cools as it expands. <strong>Isobaric expansion</strong> (P constant): W = PΔV, and Q = nC_pΔT. <strong>Isochoric heating</strong> (V constant): W = 0, so ΔU = Q = nC_vΔT. Compare: to raise a gas's temperature by the same ΔT, you need MORE heat at constant pressure (Q = nC_pΔT) than at constant volume (Q = nC_vΔT) because at constant P, some energy goes into expansion work. Hence C_p > C_v.</p>

**Floor 2 (Definition):**
<p>Four fundamental processes for an ideal gas: (1) <strong>Isothermal</strong> (T const): PV = nRT = const. ΔU = 0, Q = W. Work: W = nRT ln(V₂/V₁). (2) <strong>Adiabatic</strong> (Q = 0): <strong>PV^γ = const</strong>, TV^(γ−1) = const, T^γ P^(1−γ) = const. γ = C_p/C_v > 1. ΔU = −W = nC_vΔT. (3) <strong>Isobaric</strong> (P const): V/T = const (Charles). W = PΔV. Q = nC_pΔT. (4) <strong>Isochoric</strong> (V const): P/T = const (Gay-Lussac). W = 0. Q = ΔU = nC_vΔT. <strong>PV diagram:</strong> area under the curve = work done. A closed cycle's enclosed area = net work per cycle.</p>

**Floor 3 (In action):**
<p>The PV diagram is the thinking tool of thermodynamics. Each process traces a specific path. A cycle — a closed loop — represents a heat engine (clockwise: net work done BY the gas) or a refrigerator/heat pump (anticlockwise: net work done ON the gas). The area enclosed by the cycle is the net work output per cycle. The efficiency η = W_net / Q_in. The Otto cycle (petrol engine) and Diesel cycle are plotted on PV diagrams. The Carnot cycle — two isothermals + two adiabatics — is the theoretical maximum-efficiency cycle, and its efficiency η = 1 − T_c/T_h depends only on the temperatures of the hot and cold reservoirs, not on the working substance. These four processes, combined in cycles, are how every heat engine and refrigerator in the world works.</p>

**Image prompt:** A chalk PV diagram showing all four processes from the same initial point: isothermal (hyperbola), adiabatic (steeper hyperbola), isobaric (horizontal line), isochoric (vertical line). Each labelled with its equation. Below: a Carnot cycle — two isotherms + two adiabats — with the enclosed area shaded as W_net. Chalk on dark green board. Square 1:1.

---

## BB-NEW-273 — The second law: entropy and the arrow of time

**Subject:** physics | **Topic:** thermodynamics | **Concept:** second-law; entropy; reversible; irreversible; heat-flow | **Ground:** g1 | **Builds on:** [BB-NEW-271, BB-NEW-272]

**Floor 0 (Idea):**
<p>The first law says energy is conserved — but it doesn't say what CAN happen, only what CAN'T (create or destroy energy). The second law fills the gap. It says: heat flows spontaneously from hot to cold, never the reverse. A cup of tea cools down — it never spontaneously heats up by drawing heat from the colder room. This directionality — the arrow of time — is encoded in a quantity called entropy. In any spontaneous process, the total entropy of the universe increases. The second law is the reason perpetual motion machines are impossible, the reason engines need exhaust, and the reason time has a direction.</p>

**Floor 1 (Concrete):**
<p>Drop an ice cube into warm water. Heat flows from the water (hot) to the ice (cold) — cooling the water, melting the ice. The reverse never happens: you never see a glass of lukewarm water spontaneously separating into an ice cube and a warm spot. Entropy explains why. The water molecules lose some kinetic energy (their entropy decreases slightly). The ice lattice breaks apart into freely moving water molecules — the entropy increase of the melting ice far outweighs the entropy decrease of the cooling water. Total entropy of the universe increases. The process is irreversible. To reverse it, you'd need a refrigerator — which requires work input and dumps even more waste heat (increasing total entropy even more). There is no free lunch, and there is no free reversal.</p>

**Floor 2 (Definition):**
<p>The <strong>second law of thermodynamics</strong> has several equivalent formulations: (Clausius) Heat cannot spontaneously flow from a colder body to a hotter body. (Kelvin–Planck) No process is possible whose sole result is the complete conversion of heat into work. (Entropy) In any spontaneous process, the total entropy of the universe increases: <strong>ΔS_universe > 0</strong>. <strong>Entropy</strong> S is a measure of disorder or the number of accessible microstates: ΔS = Q_rev/T (for a reversible process at constant T). For an ideal gas, ΔS = nC_v ln(T₂/T₁) + nR ln(V₂/V₁). A <strong>reversible</strong> process is an idealised, infinitely slow process where the system is always in equilibrium — ΔS_universe = 0. Real processes are <strong>irreversible</strong> — ΔS_universe > 0.</p>

**Floor 3 (In action):**
<p>Entropy explains why energy degrades. A lump of coal has low entropy — concentrated chemical energy. Burn it: the same total energy now exists as dispersed heat and CO₂ — high entropy. The energy is still there (first law), but it's spread out and can't do useful work anymore (second law). The universe is running down — not in energy, but in the availability of energy. This is the heat death of the universe: all energy uniformly distributed at the same temperature, no gradients to drive any process. Entropy also explains why refrigerators need electricity: moving heat from cold to hot (decreasing entropy locally) requires work, and the work done generates more entropy than was decreased. The net entropy of the universe always rises. The second law is not a suggestion — it's a statistical certainty, and it's the closest physics comes to explaining why time moves forward.</p>

**Image prompt:** A chalk drawing of two scenarios: (1) ice cube in warm water — arrow of heat from water to ice, melting, "ΔS > 0, spontaneous." (2) The reverse — arrow from ice to water with a red X, "ΔS < 0, never happens spontaneously." Below: the Clausius and entropy statements boxed. An arrow of time labelled "entropy always increases." Chalk on dark green board. Square 1:1.

---

## BB-NEW-274 — Heat engines and the Carnot cycle: the ultimate efficiency limit

**Subject:** physics | **Topic:** thermodynamics | **Concept:** heat-engine; Carnot-cycle; efficiency; η=1−T_c/T_h | **Ground:** g1 | **Builds on:** [BB-NEW-271, BB-NEW-272, BB-NEW-273]

**Floor 0 (Idea):**
<p>A heat engine takes heat from a hot reservoir, converts some of it to work, and dumps the rest into a cold reservoir. The second law says you can't convert all the heat to work — some must be rejected. The maximum possible efficiency of any heat engine operating between temperatures T_h (hot) and T_c (cold) is given by the Carnot efficiency: η = 1 − T_c/T_h. This is an absolute limit — no engine, no matter how cleverly designed, can exceed it. It depends only on the temperatures, in kelvin. Real engines fall short; the Carnot engine is the unattainable ideal.</p>

**Floor 1 (Concrete):**
<p>A steam turbine operates between 600°C (873 K) and 100°C (373 K). Carnot efficiency: η_Carnot = 1 − 373/873 = 1 − 0.427 = 0.573 = 57.3%. This is the theoretical maximum — the real efficiency is about 35–40% due to friction, heat losses, and irreversibilities. A car engine operates between ~2500 K (combustion temperature) and ~300 K (ambient air). Carnot efficiency: 1 − 300/2500 = 88%. Real petrol engine efficiency: ~25–30%. The gap between Carnot and real is enormous — but Carnot tells you which direction to push: raise T_h (hotter combustion, better materials) or lower T_c (colder exhaust, limited by ambient temperature). For a refrigerator (heat pump running in reverse): the coefficient of performance COP = T_c/(T_h − T_c). To keep a fridge at 4°C (277 K) in a 25°C (298 K) room, the ideal COP = 277/(298−277) = 277/21 ≈ 13.2. Real fridges achieve COP ≈ 3–5.</p>

**Floor 2 (Definition):**
<p>A <strong>heat engine</strong> operates in a cycle, absorbing heat Q_h from a hot reservoir at T_h, doing work W, and rejecting waste heat Q_c to a cold reservoir at T_c. By the first law: W = Q_h − Q_c. <strong>Efficiency</strong>: <strong>η = W / Q_h = 1 − Q_c/Q_h</strong>. The <strong>Carnot cycle</strong> (two isothermal + two adiabatic processes) is the most efficient reversible cycle operating between T_h and T_c. For a Carnot engine: Q_c/Q_h = T_c/T_h, so <strong>η_Carnot = 1 − T_c/T_h</strong> (temperatures in KELVIN). This is the maximum possible efficiency for ANY heat engine between these temperatures. Key consequences: (1) η < 1 always — some heat must be rejected. (2) To increase η, increase T_h or decrease T_c. (3) η = 1 only if T_c = 0 K — impossible.</p>

**Floor 3 (In action):**
<p>The Carnot efficiency is the ruthless scorekeeper of energy technology. A coal power plant: T_h ≈ 850 K (superheated steam), T_c ≈ 300 K (cooling tower). η_Carnot = 65%. Real: ~40%. A nuclear reactor: same T_h and T_c — same limit. The only way to beat it is higher T_h — which is why gas turbines (T_h ≈ 1800 K) are more efficient than steam turbines, and combined-cycle plants (gas turbine + steam turbine) approach 60% real efficiency. Geothermal power: T_h is low (~400 K), so η_Carnot is low (~25%) — but the heat is free. In reverse, heat pumps exploit the same equation: to heat a house, move heat from the cold outside (T_c = 273 K) to the warm inside (T_h = 293 K). For each unit of work, you can deliver T_h/(T_h−T_c) = 293/20 ≈ 14.7 units of heat — far more efficient than resistive heating. Heat engines and heat pumps are two sides of the same thermodynamic coin, and η = 1 − T_c/T_h is the number printed on both.</p>

**Image prompt:** A chalk drawing of a heat engine: a hot reservoir (T_h), an engine (circle), a cold reservoir (T_c). Arrows: Q_h in, W out, Q_c out. Below: η = 1 − T_c/T_h (Carnot). Worked examples: steam turbine (T_h=873K, T_c=373K → η=57%), car engine (T_h=2500K, T_c=300K → η=88% theoretical). A note: "Real engines always fall below Carnot. Raise T_h to improve." Chalk on dark green board. Square 1:1.

---

## Summary

### Part 1 — Temperature, heat, and thermal properties (4 BBs)
| # | Title | Core equation |
|---|-------|--------------|
| 260 | Temperature vs heat | Q = mcΔT |
| 261 | Temperature scales | T(K) = T(°C) + 273 |
| 262 | Thermal expansion | ΔL = α L₀ ΔT, ΔV = β V₀ ΔT |
| 263 | Specific heat capacity | **Q = mcΔT** (drilled) |

### Part 2 — Change of state and calorimetry (3 BBs)
| # | Title | Core equation |
|---|-------|--------------|
| 264 | Latent heat | **Q = mL** (L_f = 334 kJ/kg, L_v = 2260 kJ/kg) |
| 265 | Calorimetry | m₁c₁ΔT₁ + m₂c₂ΔT₂ = 0 |
| 266 | Three states & kinetic model | KE_avg ∝ T |

### Part 3 — The ideal gas (4 BBs)
| # | Title | Core equation |
|---|-------|--------------|
| 267 | The ideal gas model | Assumptions → PV = nRT |
| 268 | Boyle, Charles, Gay-Lussac | P₁V₁/T₁ = P₂V₂/T₂ |
| 269 | Ideal gas equation | **PV = nRT** (drilled in all rearrangements) |
| 270 | Kinetic theory | KE_avg = (3/2)k_B T, v_rms = √(3RT/M) |

### Part 4 — The laws of thermodynamics (4 BBs)
| # | Title | Core equation |
|---|-------|--------------|
| 271 | First law | **ΔU = Q − W** |
| 272 | Thermodynamic processes | Isothermal: PV=const, Adiabatic: PV^γ=const, Isobaric, Isochoric |
| 273 | Second law & entropy | ΔS_universe > 0 |
| 274 | Carnot engine | **η = 1 − T_c/T_h** |

**15 BBs.** The four equations drilled hardest: **Q = mcΔT, Q = mL, PV = nRT, η = 1 − T_c/T_h**. Every worked example uses kelvin — the conversion T(K) = T(°C) + 273 is forced into automaticity. Covers CONTENT-MAP P8 completely.
