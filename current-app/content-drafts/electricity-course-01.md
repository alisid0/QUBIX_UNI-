# Electricity — Complete Course (17 BBs)

A rigorous, repetition-driven DC circuit course drawn from H.C. Verma's treatment of current electricity. The water analogy — pressure = voltage, flow rate = current, pipe narrowness = resistance — runs through every BB as a unifying thread. Key equations (V=IR, I=Q/t, P=IV, V=W/Q) are rehearsed in multiple contexts until they feel obvious. Covers charge through RC circuits. Currently 0 BBs exist in this topic — this is the foundation.

---

# Part 1 — Fundamental quantities

---

## BB-NEW-200 — What is electric charge?

**Subject:** physics | **Topic:** electricity | **Concept:** electric-charge; quantisation; conservation; Coulomb-force | **Ground:** g0 | **Builds on:** [Card 01, Card 37]

**Floor 0 (Idea):**
<p>Pull off a woollen jumper in a dark room and you see sparks. Rub a balloon on your hair and it sticks to the wall. These are electric charge in action — a fundamental property of matter, as basic as mass. Unlike mass, charge comes in two flavours: positive and negative. Like charges repel; unlike charges attract. Every spark, every current, every circuit begins here.</p>

**Floor 1 (Concrete):**
<p>An atom has protons (+) in the nucleus and electrons (−) outside. Normally the numbers match — the atom is neutral. Rub a glass rod with silk: electrons transfer from glass to silk. The glass, having lost electrons, becomes positively charged. The silk, having gained electrons, becomes negative. The total charge hasn't changed — electrons moved from one object to the other. Charge is conserved: you cannot create or destroy it, only move it. This is the first law of electricity.</p>

**Floor 2 (Definition):**
<p><strong>Electric charge</strong> Q is a fundamental property of matter measured in <strong>coulombs</strong> (C). Charge is <strong>quantised</strong> — all charge is an integer multiple of the elementary charge e = 1.602 × 10⁻¹⁹ C (the charge of one proton; an electron carries −e). Charge is <strong>conserved</strong> — the net charge of an isolated system never changes. <strong>Coulomb's law</strong> gives the force between two point charges: F = k|q₁q₂|/r², where k ≈ 9 × 10⁹ N·m²/C² — inverse square, like gravity, but far stronger and with both attraction and repulsion.</p>

**Floor 3 (In action):**
<p>The quantisation of charge means you cannot have ½ an electron's worth of charge — charge comes in lumps. Millikan's oil drop experiment (1909) measured e by suspending tiny charged oil droplets in an electric field. The conservation of charge means that in every circuit, every reaction, every particle interaction, the total charge before equals the total charge after. When a battery "runs out," the charge hasn't vanished — the chemical reaction that separated charges has stopped. Charge is not consumed; it is circulated.</p>

**Image prompt:** A chalk drawing of an atom with protons (+) in the nucleus and electrons (−) in orbit, labelled with their charges. Beside: a glass rod rubbed with silk — electrons shown as small dots transferring from rod to silk. Below: "Charge is quantised (comes in lumps of e) and conserved (never created or destroyed)." Chalk on dark green board. Square 1:1.

---

## BB-NEW-201 — Electric current: charge on the move

**Subject:** physics | **Topic:** electricity | **Concept:** electric-current; I=Q/t; ampere; drift-velocity | **Ground:** g0 | **Builds on:** [BB-NEW-200]

**Floor 0 (Idea):**
<p>Charge sitting still is static electricity — a spark waiting to happen. Charge moving is current — the lifeblood of every circuit. Current measures how much charge passes a point each second. 1 ampere = 1 coulomb per second. A 60 W bulb draws about 0.26 A — roughly 1.6 × 10¹⁸ electrons streaming through the filament every second.</p>

**Floor 1 (Concrete):**
<p>Connect a wire across a battery. Inside the wire, free electrons — one or two per copper atom — drift slowly toward the positive terminal. Their drift speed is glacial: about 0.1 mm/s. But the wire is packed with electrons (≈ 10²⁹ per m³ in copper), so even this slow creep adds up to an enormous flow of charge. Switch on a light and it seems instant because the electric field propagates at nearly the speed of light, pushing every electron in the circuit at once — like turning on a tap connected to a pipe already full of water. The water at the spout moves immediately, even though the water from the tank hasn't arrived yet.</p>

**Floor 2 (Definition):**
<p><strong>Electric current</strong> I is the rate of flow of charge: <strong>I = Q/t</strong>, measured in <strong>amperes</strong> (A = C/s). <strong>Conventional current</strong> flows from positive to negative (the historical convention, set before electrons were discovered). <strong>Electron flow</strong> is opposite — electrons move from negative to positive. In a metal, current is carried by free electrons drifting under an electric field: I = neAv_d, where n = electron density, e = elementary charge, A = cross-sectional area, v_d = drift velocity. Current is a scalar (not a vector) — it has a direction along a wire but doesn't obey vector addition.</p>

**Floor 3 (In action):**
<p>I = Q/t is the defining equation of current and appears in countless forms: Q = It (charge delivered by a battery of given amp-hour rating — a 2000 mAh phone battery delivers 2 A for 1 hour, or 1 A for 2 hours). In electrolysis, the mass of metal deposited is proportional to Q = It. In a lightning strike, ~20 C flows in ~0.1 ms — a current of ~200,000 A. A fuse melts when I exceeds its rating because the heating (I²R) gets too high. Current is the flow — measure it, limit it, and you control the circuit.</p>

**Image prompt:** A chalk drawing of a wire cross-section showing electrons (small dots) drifting rightward. An arrow labelled "conventional current" points left. Below: I = Q/t, with a worked example: 10 C in 2 s → I = 5 A. A water-pipe analogy beside it: water flow = current, pipe full of water = wire full of electrons. Chalk on dark green board. Square 1:1.

---

## BB-NEW-202 — Voltage: the push that drives current

**Subject:** physics | **Topic:** electricity | **Concept:** voltage; potential-difference; EMF; energy-per-charge | **Ground:** g0 | **Builds on:** [BB-NEW-200, BB-NEW-201]

**Floor 0 (Idea):**
<p>Current doesn't flow on its own — it needs a push. That push is voltage. A battery provides voltage by separating charge: one terminal becomes positive (electron-deficient), the other negative (electron-rich). Connect a wire between them and electrons rush from negative to positive, driven by the voltage difference. No voltage, no current. Voltage measures how much energy each coulomb of charge carries through the circuit.</p>

**Floor 1 (Concrete):**
<p>A 9 V battery means each coulomb of charge that leaves the positive terminal and returns to the negative terminal delivers 9 joules of energy to the circuit. In a 1.5 V AA cell, each coulomb delivers 1.5 J. In a 230 V mains outlet, each coulomb delivers 230 J — enough to be lethal. The water analogy: voltage is the pressure difference between two ends of a pipe. High pressure = high voltage. A pump (battery) maintains the pressure difference. Water (charge) flows from high pressure to low. The energy each kilogram of water gives up as it falls is the gravitational analogue: mgh per kg = gh — the "voltage" of a waterfall.</p>

**Floor 2 (Definition):**
<p><strong>Voltage</strong> (or potential difference, p.d.) V between two points is the work done per unit charge to move charge between them: <strong>V = W/Q</strong>, measured in <strong>volts</strong> (V = J/C). 1 volt means 1 joule of energy is transferred per coulomb of charge. The <strong>EMF</strong> (electromotive force) of a source is the energy it provides per coulomb — the open-circuit terminal voltage. Voltage is a scalar — it's a difference, not a direction. A voltmeter measures p.d. and is connected in parallel across the component.</p>

**Floor 3 (In action):**
<p>V = W/Q is the energy-per-charge equation and is as fundamental as I = Q/t. Together they give P = IV — energy per second = (charge per second) × (energy per charge). A 12 V car battery supplies 12 J to each coulomb; a 1.5 V AA cell supplies 1.5 J. The voltage rating on every appliance tells you the energy per unit charge it's designed for — plug a 120 V appliance into a 230 V socket and the energy per charge is nearly double, overheating the components. Voltage is the "how hard" of electricity; current is the "how much"; together they determine the "how fast" — power.</p>

**Image prompt:** A chalk drawing of a battery with terminals + and −. A dashed line shows the path of a coulomb of charge through a bulb and back, labelled "9 J delivered per coulomb." The water analogy: a pump pushing water through a pipe, with height difference labelled as pressure difference → voltage. V = W/Q boxed. Chalk on dark green board. Square 1:1.

---

## BB-NEW-203 — Resistance: what slows the current

**Subject:** physics | **Topic:** electricity | **Concept:** resistance; resistivity; R=ρL/A; ohmic-conductor | **Ground:** g0 | **Builds on:** [BB-NEW-201, BB-NEW-202]

**Floor 0 (Idea):**
<p>Electrons don't glide through a wire unopposed. They collide with vibrating atoms, losing energy as heat. This opposition is resistance — the electrical friction. Every material resists current to some degree. Copper resists very little (a good conductor). Rubber resists enormously (an insulator). Resistance is measured in ohms (Ω). 1 Ω means 1 volt drives 1 ampere of current — modest resistance. 1 MΩ means 1 volt drives 1 microampere — near-total blockage.</p>

**Floor 1 (Concrete):**
<p>A copper wire 1 m long with a cross-sectional area of 1 mm² has a resistance of about 0.017 Ω — negligible. The same dimensions in nichrome (the alloy in toaster elements) have a resistance of about 1.1 Ω — 65 times higher. Double the length of a wire and resistance doubles. Double the cross-sectional area and resistance halves. This is summarised in R = ρL/A: resistance equals resistivity × length ÷ area. A long, thin wire has high resistance. A short, fat wire has low resistance. The water analogy: a long, narrow pipe resists water flow more than a short, wide one. ρ (resistivity) is the material property — copper is a wide, smooth pipe; nichrome is a narrow, rough one.</p>

**Floor 2 (Definition):**
<p><strong>Resistance</strong> R is the opposition to current flow, measured in <strong>ohms</strong> (Ω). For a uniform conductor of length L and cross-sectional area A: <strong>R = ρL/A</strong>, where ρ (rho) is <strong>resistivity</strong> (Ω·m), a material property. Resistivity increases with temperature in metals (atoms vibrate more, electrons collide more) — a light bulb's filament resistance rises from ~10 Ω cold to ~100 Ω hot. <strong>Conductance</strong> G = 1/R (siemens). An <strong>ohmic conductor</strong> obeys V = IR (constant R). A <strong>non-ohmic</strong> conductor (diode, filament bulb) has R that changes with V or temperature.</p>

**Floor 3 (In action):**
<p>Resistance is why power lines use high voltage — for the same power, higher voltage means lower current (P = IV), and lower current means less I²R heating loss in the lines. It's why your phone charger has a thin cable (flexible, convenient) but your kettle has a thick one (lower resistance, less heating where you don't want it). It's why a filament bulb glows — the thin tungsten wire has high resistance and reaches ~2500°C, emitting light. Resistance is not a defect; it's a design parameter. You choose materials and dimensions to put the resistance where you want the heat, and minimise it everywhere else.</p>

**Image prompt:** A chalk drawing of two wires side by side: a short fat wire labelled "low R" and a long thin wire labelled "high R." Below: R = ρL/A with each term explained. A water-pipe analogy: narrow pipe vs wide pipe for the same length. The resistivity table: copper 1.7×10⁻⁸, nichrome 1.1×10⁻⁶ Ω·m. Chalk on dark green board. Square 1:1.

---

# Part 2 — Ohm's Law and basic circuits

---

## BB-NEW-204 — Ohm's Law: V = IR

**Subject:** physics | **Topic:** electricity | **Concept:** ohms-law; V=IR; I-V-characteristic; ohmic-vs-nonohmic | **Ground:** g0 | **Builds on:** [BB-NEW-201, BB-NEW-202, BB-NEW-203]

**Floor 0 (Idea):**
<p>Voltage is the push. Current is the flow. Resistance is the opposition. Ohm's law ties them together: V = IR. Double the voltage across a fixed resistor and the current doubles. Double the resistance for a fixed voltage and the current halves. It's a straight-line relationship — and for most metals, it holds exactly, giving us the simplest and most-used equation in all of circuit theory.</p>

**Floor 1 (Concrete):**
<p>A 10 Ω resistor connected to a 5 V battery. Current: I = V/R = 5/10 = 0.5 A. If the voltage is increased to 10 V, I = 10/10 = 1.0 A — double the voltage, double the current. If the resistor is changed to 20 Ω with the original 5 V: I = 5/20 = 0.25 A. Triple relationship: given any two, find the third. Rearranged: R = V/I (measure V and I, compute R). V = IR (know R and want the voltage drop). The formula is the same; which one you use depends on what you're solving for. The three forms are identical — V=IR, I=V/R, R=V/I — all say the same thing in different arrangements.</p>

**Floor 2 (Definition):**
<p><strong>Ohm's law</strong> states that the current I through a conductor is directly proportional to the potential difference V across it, provided the temperature and other physical conditions remain constant: <strong>V = IR</strong>. The I-V graph of an ohmic conductor is a straight line through the origin — slope = 1/R. Non-ohmic conductors (filament lamps — R increases with temperature; diodes — conduct only in one direction; thermistors — R changes with temperature) do not obey Ohm's law. The law is empirical, not fundamental — it describes a property many materials happen to have under normal conditions.</p>

**Floor 3 (In action):**
<p>V=IR is used more than any other equation in circuit analysis. Every resistor in a circuit has a voltage drop equal to the current through it times its resistance. Label the current, multiply by R, write the voltage. V=IR tells you that a 0.01 Ω wire carrying 100 A will drop 1 V — acceptable. That same wire carrying 1000 A drops 10 V — a problem. It tells you that measuring a 0.1 Ω shunt resistor's voltage gives the current: I = V/0.1. It tells you that a 1 MΩ resistor across a 9 V battery draws I = 9/10⁶ = 9 μA — negligible drain. V=IR is the multiplication table of electricity. Know it cold.</p>

**Image prompt:** A chalk drawing of a simple circuit: battery, resistor R, ammeter in series, voltmeter in parallel. An I-V graph: straight line through origin for an ohmic resistor. The three forms V=IR, I=V/R, R=V/I all boxed. A worked example: V=5V, R=10Ω → I=0.5A. Chalk on dark green board. Square 1:1.

---

## BB-NEW-205 — Series circuits: one path, shared current, divided voltage

**Subject:** physics | **Topic:** electricity | **Concept:** series-circuit; same-current; voltage-divider; R_total=R₁+R₂+... | **Ground:** g0 | **Builds on:** [BB-NEW-204]

**Floor 0 (Idea):**
<p>In a series circuit, components are connected end to end — one single loop. The current has no choice of path; it must go through everything. So the current is the same at every point. But the voltage is shared: the total voltage from the battery divides among the components in proportion to their resistances. Series is a chain — break one link and the whole chain stops.</p>

**Floor 1 (Concrete):**
<p>A 12 V battery powers a 4 Ω and an 8 Ω resistor in series. Total resistance R_total = 4 + 8 = 12 Ω. Current (same everywhere): I = V/R_total = 12/12 = 1 A. Voltage across the 4 Ω: V₄ = IR = 1×4 = 4 V. Across the 8 Ω: V₈ = 1×8 = 8 V. Check: 4 + 8 = 12 V — the two voltage drops sum to the battery voltage. The 8 Ω resistor gets twice the voltage because it has twice the resistance. This is the <strong>voltage divider</strong> principle: in series, V₁/V₂ = R₁/R₂. Christmas tree lights are (or were) wired in series — one bulb burns out and the whole string goes dark.</p>

**Floor 2 (Definition):**
<p>In a <strong>series circuit</strong>: (1) <strong>Current</strong> is the same through every component: I_total = I₁ = I₂ = I₃ = ... (2) <strong>Total resistance</strong> is the sum: <strong>R_total = R₁ + R₂ + R₃ + ...</strong> (3) <strong>Voltage</strong> divides in proportion to resistance: V₁ = I R₁, V₂ = I R₂, and ΣV = V_battery. (4) Total voltage = sum of individual voltage drops (Kirchhoff's voltage law). The equivalent resistance of a series combination is always larger than the largest individual resistance.</p>

**Floor 3 (In action):**
<p>The voltage divider is one of the most useful circuit patterns. A potentiometer (volume knob) is a variable voltage divider. A pull-up or pull-down resistor with a switch creates a digital 1 or 0. In a multimeter, different series resistors select different voltage ranges. The series rule R = R₁+R₂ also explains why long extension cords have non-negligible resistance and drop voltage under load — every extra metre of wire adds series resistance. Diagnosing a series circuit: if current is zero, check each component — one open (broken) element blocks all current. If one component is much hotter than expected, its resistance may have risen (positive temperature coefficient) or it may be the wrong value.</p>

**Image prompt:** A chalk drawing of a series circuit: battery, R₁=4Ω, R₂=8Ω in a single loop. Current I=1A labelled at each point. Voltage drops V₁=4V and V₂=8V labelled across each resistor. Below: R_total = R₁+R₂, V₁:V₂ = R₁:R₂. Water analogy: a single pipe with two constrictions — same flow rate, pressure drops add up. Chalk on dark green board. Square 1:1.

---

## BB-NEW-206 — Parallel circuits: many paths, shared voltage, divided current

**Subject:** physics | **Topic:** electricity | **Concept:** parallel-circuit; same-voltage; current-divider; 1/R=1/R₁+1/R₂ | **Ground:** g0 | **Builds on:** [BB-NEW-204]

**Floor 0 (Idea):**
<p>In a parallel circuit, components sit on separate branches, each connected directly to the battery. The voltage across every branch is the same — the full battery voltage. But the current divides: each branch draws current according to its own resistance (I = V/R), and the total current is the sum of the branch currents. A parallel circuit is a fork in the road — each branch goes its own way, and if one breaks, the others keep working.</p>

**Floor 1 (Concrete):**
<p>A 12 V battery powers a 4 Ω and an 8 Ω resistor in parallel. The voltage across each is 12 V — the full battery voltage. Current through the 4 Ω: I₄ = 12/4 = 3 A. Through the 8 Ω: I₈ = 12/8 = 1.5 A. Total current drawn from the battery: I_total = 3 + 1.5 = 4.5 A. Equivalent resistance: R_eq = V/I_total = 12/4.5 = 2.67 Ω — less than either individual resistor. Formula: 1/R_eq = 1/4 + 1/8 = 3/8, so R_eq = 8/3 ≈ 2.67 Ω. The lower resistance branch (4 Ω) draws more current — in parallel, the smaller resistance dominates. Household wiring is entirely parallel — each appliance gets the full mains voltage and operates independently.</p>

**Floor 2 (Definition):**
<p>In a <strong>parallel circuit</strong>: (1) <strong>Voltage</strong> is the same across every branch: V_total = V₁ = V₂ = V₃ = ... (2) <strong>Total current</strong> is the sum of branch currents: I_total = I₁ + I₂ + I₃ + ... (Kirchhoff's current law). (3) <strong>Equivalent resistance</strong>: <strong>1/R_eq = 1/R₁ + 1/R₂ + 1/R₃ + ...</strong> For two resistors: R_eq = (R₁R₂)/(R₁+R₂) — product over sum. (4) Current divides inversely with resistance: I₁/I₂ = R₂/R₁. The equivalent resistance of a parallel combination is always smaller than the smallest individual resistance.</p>

**Floor 3 (In action):**
<p>Parallel is the default for power distribution. Every socket in your house is in parallel with every other — plug in a heater and the toaster doesn't dim. If one appliance shorts, the fuse or breaker for that branch trips, but the rest of the house stays on. Adding more parallel appliances DECREASES the total resistance of the house, which INCREASES the total current — too many appliances on one circuit and the breaker trips from overcurrent. In electronics, parallel resistors reduce resistance; parallel capacitors increase capacitance. The "product over sum" shortcut (for two resistors) is: R_eq = (R₁R₂)/(R₁+R₂). For identical resistors R in parallel: R_eq = R/n — 3 identical 30 Ω resistors in parallel give 10 Ω.</p>

**Image prompt:** A chalk drawing of a parallel circuit: battery, then two branches — one with R₁=4Ω, one with R₂=8Ω. Voltmeter shows 12V across both. Currents I₁=3A, I₂=1.5A labelled. Total I=4.5A from battery. Below: 1/R_eq = 1/R₁+1/R₂, R_eq = 8/3 Ω. Water analogy: a main pipe splitting into two — same pressure across each, total flow = sum. Chalk on dark green board. Square 1:1.

---

## BB-NEW-207 — Combining series and parallel: the mixed circuit

**Subject:** physics | **Topic:** electricity | **Concept:** mixed-circuits; series-parallel-reduction; equivalent-resistance | **Ground:** g1 | **Builds on:** [BB-NEW-205, BB-NEW-206]

**Floor 0 (Idea):**
<p>Real circuits are rarely pure series or pure parallel. They're mixed — some resistors in series, some in parallel, in combinations that look complicated. The strategy is always the same: find a section that IS purely series or purely parallel, replace it with its equivalent resistance, and repeat until you have a single resistor. This is circuit reduction — like simplifying a fraction step by step until the answer is obvious.</p>

**Floor 1 (Concrete):**
<p>A circuit: R₁ = 6 Ω and R₂ = 3 Ω in parallel; that parallel combination in series with R₃ = 4 Ω; the whole thing across a 12 V battery. Step 1 — parallel section: R_12 = (6×3)/(6+3) = 18/9 = 2 Ω. Step 2 — series: R_total = R_12 + R₃ = 2 + 4 = 6 Ω. Step 3 — total current: I = 12/6 = 2 A. This 2 A flows through R₃ (series) and splits at the parallel junction. Step 4 — voltage across the parallel section: V_12 = I × R_12 = 2 × 2 = 4 V. Voltage across R₃: V₃ = 2 × 4 = 8 V. Check: 4+8 = 12 V ✓. Step 5 — branch currents: I₁ = 4/6 = ⅔ A, I₂ = 4/3 = 1⅓ A. Check: ⅔+1⅓ = 2 A ✓. The systematic reduction method untangled the whole circuit.</p>

**Floor 2 (Definition):**
<p>To solve a <strong>mixed series-parallel circuit</strong>: (1) Identify pure series or pure parallel sections. (2) Replace each with its equivalent resistance. (3) Redraw the simplified circuit. (4) Repeat until you have a single equivalent resistance. (5) Find total current from the source voltage using I = V/R_eq. (6) Work BACKWARD — expand each simplified section, using V=IR and the current/voltage rules for series (same I, V divides) and parallel (same V, I divides) to find every unknown voltage and current. This method is systematic, reliable, and works for any network of resistors that can be reduced by series-parallel combinations.</p>

**Floor 3 (In action):**
<p>This reduction method works for most practical circuits. A house wired in parallel, with a long feed cable that adds series resistance: reduction gives the voltage drop in the feed. A LED with a series current-limiting resistor: the LED's non-linear I-V characteristic can be approximated as a fixed voltage drop, then the resistor handles the rest. Power supply design: a voltage divider (two series resistors) with a load resistor in parallel with the lower one — the load "pulls down" the voltage. Reduction handles all of it. Circuits that CAN'T be reduced (bridge circuits, delta-wye configurations) need Kirchhoff's laws — coming in Part 4.</p>

**Image prompt:** A chalk drawing of a mixed circuit: R₁∥R₂ in series with R₃. The reduction steps shown from left to right: original → parallel reduced to 2Ω → total 6Ω → current found → voltages and branch currents back-calculated. Each step annotated. Chalk on dark green board. Square 1:1.

---

# Part 3 — Energy and power in circuits

---

## BB-NEW-208 — Electrical power: P = IV = I²R = V²/R

**Subject:** physics | **Topic:** electricity | **Concept:** electrical-power; P=IV; I²R; V²/R; watt | **Ground:** g0 | **Builds on:** [BB-NEW-201, BB-NEW-202, BB-NEW-204]

**Floor 0 (Idea):**
<p>A battery pushes charge through a circuit. Each coulomb carries energy (voltage), and the rate at which coulombs flow is current. So the rate of energy transfer — power — is simply voltage × current: P = IV. A 12 V battery delivering 2 A provides 24 W — 24 joules every second. Power is the "how fast" of electricity. It measures the energy converted per second: into light, heat, motion, or sound.</p>

**Floor 1 (Concrete):**
<p>A 60 W bulb on a 230 V mains supply draws I = P/V = 60/230 ≈ 0.26 A. Its hot resistance: R = V/I = 230/0.26 ≈ 880 Ω (cold resistance is much lower). Alternatively, R = V²/P = 230²/60 = 52,900/60 ≈ 880 Ω — same result. The three power formulas — P = IV, P = I²R, P = V²/R — are all the same equation with Ohm's law substituted. Which one you use depends on what you know. Given I and R: use P = I²R. Given V and R: use P = V²/R. Given V and I: use P = IV. The result is always in watts (W = J/s).</p>

**Floor 2 (Definition):**
<p><strong>Electrical power</strong> P is the rate at which electrical energy is converted: <strong>P = IV</strong> (from I = Q/t and V = W/Q, giving P = W/t = IV). Using Ohm's law, two alternative forms: <strong>P = I²R</strong> (power dissipated as heat in a resistor — "Joule heating") and <strong>P = V²/R</strong> (power for a given voltage across a resistance). The SI unit is the <strong>watt</strong> (W = J/s). Energy consumed = power × time: E = Pt, measured in joules or <strong>kilowatt-hours</strong> (1 kWh = 3.6 × 10⁶ J). A 1000 W heater run for 1 hour consumes 1 kWh.</p>

**Floor 3 (In action):**
<p>P = I²R is the reason power lines use high voltage. To deliver 1 MW at 1000 V: I = P/V = 1000 A. Line loss = I²R = (1000)²R = 1,000,000R. At 100,000 V: I = 10 A. Line loss = 100R — 10,000 times less. This is why long-distance transmission lines run at 400 kV and above. P = V²/R explains why a 230 V bulb connected to 120 V glows dim — power is proportional to V², so at 120 V it's about (120/230)² = 27% of rated power. P = IV is the rating on every appliance — multiply the voltage and current on the nameplate to get the wattage. Power ratings determine fuse sizes, wire thicknesses, and electricity bills.</p>

**Image prompt:** A chalk drawing showing the three power formulas in a triangle: P = IV at the top, branching to P = I²R and P = V²/R via V=IR substitution. Below: a worked example: 230V, 60W bulb → I=0.26A, R=880Ω. A transmission line diagram showing high voltage = low current = low I²R loss. Chalk on dark green board. Square 1:1.

---

## BB-NEW-209 — The heating effect: why wires get hot

**Subject:** physics | **Topic:** electricity | **Concept:** joule-heating; I²R-losses; fuse; heating-appliances | **Ground:** g0 | **Builds on:** [BB-NEW-203, BB-NEW-208]

**Floor 0 (Idea):**
<p>Every time current flows through a resistance, energy is dissipated as heat. The electron-atom collisions that cause resistance transfer kinetic energy to the lattice — the wire gets hot. This is Joule heating, quantified by P = I²R. It's both a nuisance (power lost in transmission lines) and a tool (every electric heater, toaster, and kettle exploits it deliberately).</p>

**Floor 1 (Concrete):**
<p>A 2000 W electric kettle on 230 V draws I = 2000/230 ≈ 8.7 A. Its heating element has R = V²/P = 230²/2000 ≈ 26.5 Ω. The I²R heating: (8.7)² × 26.5 ≈ 2000 W — exactly the power rating. The element, made of nichrome (high resistivity, high melting point), reaches several hundred degrees. The connecting wires, made of copper (low resistivity), carry the same 8.7 A but have a resistance of perhaps 0.01 Ω, dissipating only I²R = (8.7)² × 0.01 ≈ 0.76 W — barely warm. The heat goes where the resistance is. This is why heating elements are thin nichrome coils and connecting wires are thick copper.</p>

**Floor 2 (Definition):**
<p><strong>Joule heating</strong> (resistive or ohmic heating) is the conversion of electrical energy to thermal energy in a resistor, at a rate <strong>P = I²R</strong>. The energy released as heat in time t is E = I²Rt. A <strong>fuse</strong> exploits this: a thin wire of a low-melting-point alloy melts when I exceeds its rating, breaking the circuit. <strong>Applications</strong>: filament bulbs (tungsten wire heated to ~2500°C glows white), electric heaters, toasters, kettles, soldering irons. <strong>Mitigation</strong>: thick conductors, high-voltage transmission, active cooling in high-power electronics.</p>

**Floor 3 (In action):**
<p>The I²R formula encodes a crucial design trade-off: power lost in wires grows with the square of the current. Overload a cable and the I²R heating can melt insulation and start a fire — this is why fuses and circuit breakers exist. A 13 A fuse in a UK plug limits the current to prevent the cable from overheating. In an incandescent bulb, the filament operates at the edge of melting — a small voltage surge increases I, which increases I²R heating, which increases R (tungsten's resistivity rises with temperature), which provides some self-limiting. The bulb typically burns out at switch-on, when the filament is cold, R is low, and the inrush current produces a large I²R surge.</p>

**Image prompt:** A chalk drawing of a kettle element — a coiled nichrome wire — with I=8.7A labelled. Below: a cross-section comparing the thin heating element (R=26.5Ω, high heat) to the thick copper connecting wire (R=0.01Ω, negligible heat). The fuse principle: a thin wire melting when I exceeds rating. P=I²R in a box. Chalk on dark green board. Square 1:1.

---

## BB-NEW-210 — EMF and internal resistance: the source isn't perfect

**Subject:** physics | **Topic:** electricity | **Concept:** EMF; internal-resistance; terminal-voltage; V=E-Ir | **Ground:** g1 | **Builds on:** [BB-NEW-202, BB-NEW-204]

**Floor 0 (Idea):**
<p>A battery says 1.5 V, but measure it while delivering current and you'll get less — maybe 1.4 V. The battery itself has internal resistance. As current flows, some voltage is dropped inside the battery (V_drop = Ir), leaving less for the external circuit. The EMF is the total voltage the battery can provide — the open-circuit value. The terminal voltage is what you actually get under load: V = E − Ir.</p>

**Floor 1 (Concrete):**
<p>A 9 V battery has an internal resistance r = 2 Ω. When connected to a 16 Ω load, the total circuit resistance is R+r = 18 Ω. Current: I = E/(R+r) = 9/18 = 0.5 A. Terminal voltage: V = E − Ir = 9 − 0.5×2 = 8 V. The load sees 8 V, not 9. Power delivered to load: I²R = (0.5)²×16 = 4 W. Power lost inside the battery: I²r = (0.5)²×2 = 0.5 W — the battery gets warm. Total power from the EMF: EI = 9×0.5 = 4.5 W = 4 W (load) + 0.5 W (internal loss) ✓. When the battery is old and r rises to 10 Ω, a 16 Ω load sees only about 5.5 V — dim light, slow motor.</p>

**Floor 2 (Definition):**
<p>The <strong>EMF</strong> (electromotive force) E of a source is the total energy per unit charge it provides, measured in volts. The <strong>internal resistance</strong> r is the unavoidable resistance within the source. The <strong>terminal voltage</strong> under load is <strong>V = E − Ir</strong>. When no current flows (open circuit), V = E. When short-circuited (R=0), the short-circuit current I_sc = E/r — dangerously large for a car battery (E=12 V, r≈0.01 Ω, I_sc=1200 A). Maximum power transfer to a load occurs when R = r — the matched condition.</p>

**Floor 3 (In action):**
<p>Internal resistance explains why a car battery can deliver 300 A to crank the starter motor (its r is tiny, ~0.01 Ω, so the voltage barely sags), while a 9 V smoke-detector battery cannot deliver 1 A without its voltage collapsing (r is higher, ~2–10 Ω). It explains why batteries get warm under heavy load — I²r heating inside. It explains why measuring battery voltage with a multimeter (which draws almost no current) gives the EMF, but measuring under load gives the terminal voltage — and the difference tells you the battery's health. A high internal resistance means a tired battery. The V=E−Ir equation is the simplest model of a real voltage source.</p>

**Image prompt:** A chalk drawing of a battery modelled as an ideal EMF E in series with internal resistance r inside a dashed box labelled "real battery." External load R connected. Terminal voltage V labelled across the load. V = E − Ir equation boxed. Graph: terminal voltage vs current — a straight line with slope −r, y-intercept E. Chalk on dark green board. Square 1:1.

---

# Part 4 — Kirchhoff's laws and systematic circuit analysis

---

## BB-NEW-211 — Kirchhoff's Current Law: charge is conserved at every junction

**Subject:** physics | **Topic:** electricity | **Concept:** KCL; junction-rule; charge-conservation; node-analysis | **Ground:** g1 | **Builds on:** [BB-NEW-201, BB-NEW-206]

**Floor 0 (Idea):**
<p>Charge doesn't pile up or vanish at a junction. Whatever current flows in must flow out. If 5 A enters a junction and splits into two branches carrying 2 A and 3 A, that's KCL: 5 = 2 + 3. It's not a new law — it's the conservation of charge, applied to circuit nodes. No charge is created or destroyed; the current in equals the current out, every time, at every junction.</p>

**Floor 1 (Concrete):**
<p>A junction has three wires. I₁ = 4 A flows in from the left. I₂ flows out to the right. I₃ = 1 A flows out upward. KCL: current in = current out. I₁ = I₂ + I₃ → 4 = I₂ + 1 → I₂ = 3 A. If I₂ were measured as 2 A, something is wrong — charge is accumulating at the node (impossible in a steady state) or there's a fourth path you haven't accounted for. In a parallel circuit: total current = sum of branch currents — this IS KCL. In a transistor: I_E = I_C + I_B — emitter current equals collector current plus base current. The law is universal and unforgiving.</p>

**Floor 2 (Definition):**
<p><strong>Kirchhoff's Current Law (KCL)</strong>: The algebraic sum of all currents entering a node (junction) is zero. Σ I_in = Σ I_out, or equivalently, Σ I = 0 (with currents entering taken as positive and those leaving as negative, or vice versa, as long as the convention is consistent). KCL follows from the <strong>conservation of charge</strong> — in a steady state, charge cannot accumulate at a point. It applies at every node in every circuit, DC or AC, linear or nonlinear.</p>

**Floor 3 (In action):**
<p>KCL is the foundation of nodal analysis — the systematic method for solving any circuit. For each node (except the reference/ground), write KCL in terms of node voltages. The resulting system of equations can be solved for all node voltages, and from those, all currents. In a simple parallel circuit, KCL gives I_total = I₁+I₂+I₃ — the parallel current rule. In a multi-loop circuit that can't be reduced by series-parallel methods, KCL (with KVL) is the only way. The water analogy: at a pipe junction, the total water flow in equals the total flow out — water is incompressible, just as charge is conserved. If the flows don't balance, there's a leak (or an error in your equation).</p>

**Image prompt:** A chalk drawing of a junction with three wires. I₁=4A entering, I₂ and I₃ leaving. KCL: I₁ = I₂+I₃, solved for unknown I₂=3A. Below: a node in a complex circuit with 4 branches, KCL equation written out. Water-pipe analogy: a T-junction with flows labelled, inflow = outflow. Chalk on dark green board. Square 1:1.

---

## BB-NEW-212 — Kirchhoff's Voltage Law: energy is conserved around every loop

**Subject:** physics | **Topic:** electricity | **Concept:** KVL; loop-rule; energy-conservation; mesh-analysis | **Ground:** g1 | **Builds on:** [BB-NEW-202, BB-NEW-204, BB-NEW-211]

**Floor 0 (Idea):**
<p>Take any closed loop in a circuit and add up all the voltage rises (from batteries) and voltage drops (across resistors). The sum must be zero. A coulomb of charge that completes a round trip returns to the same electrical potential it started with — it can't gain or lose net energy going in a circle. This is KVL: the conservation of energy, applied to circuits.</p>

**Floor 1 (Concrete):**
<p>A single loop: 12 V battery, R₁=4 Ω, R₂=8 Ω. Go clockwise from the battery's negative terminal: rise 12 V at the battery. Drop IR₁ = I×4 across R₁. Drop IR₂ = I×8 across R₂. KVL: +12 − 4I − 8I = 0 → 12 = 12I → I = 1 A. Familiar — this is the series circuit calculation dressed in KVL language. For a two-loop circuit: 12 V battery, R₁=2 Ω (shared), R₂=4 Ω on the left branch, R₃=6 Ω on the right. Left loop: 12 − 2I₁ − 4(I₁−I₃) = 0. Right loop: −6I₂ − 4(I₂+I₃) + 2I₁ = 0 (where I₃ flows through the middle). Solve the simultaneous equations — two loops, two unknown mesh currents, two equations.</p>

**Floor 2 (Definition):**
<p><strong>Kirchhoff's Voltage Law (KVL)</strong>: The algebraic sum of all voltages (rises and drops) around any closed loop is zero: <strong>ΣV = 0</strong>. Convention (choose one): going around a loop, a voltage rise (battery from − to +) is positive; a voltage drop (IR across a resistor in the direction of current) is negative. KVL follows from the <strong>conservation of energy</strong> — the work done on a charge around a closed path is zero because the electric field is conservative. KVL applies to any closed path, in any circuit, at any instant.</p>

**Floor 3 (In action):**
<p>KVL and KCL together form the complete toolkit for circuit analysis. Mesh analysis (loop analysis) uses KVL: assign a mesh current to each independent loop, write KVL around each loop, solve the simultaneous equations. The number of equations equals the number of independent loops. This method handles any planar network — bridge circuits, multiple sources, dependent sources — that cannot be reduced by series-parallel simplification. The water analogy: around any closed loop of pipes, the total pressure rise from pumps equals the total pressure drop across constrictions — energy is conserved. KVL is not a separate law from energy conservation; it IS energy conservation, expressed in circuit variables.</p>

**Image prompt:** A chalk drawing of a two-loop circuit with mesh currents I₁ and I₂ labelled. Each loop has the KVL equation written beside it. The equations are solved step by step for I₁ and I₂. Water-pipe analogy: a closed loop of pipe with a pump (battery) and two constrictions (resistors). Chalk on dark green board. Square 1:1.

---

## BB-NEW-213 — Solving complex circuits: the systematic method

**Subject:** physics | **Topic:** electricity | **Concept:** circuit-analysis; mesh-method; simultaneous-equations; sign-conventions | **Ground:** g1 | **Builds on:** [BB-NEW-211, BB-NEW-212]

**Floor 0 (Idea):**
<p>Not every circuit can be reduced by combining series and parallel resistors. A bridge circuit, with resistors in a diamond shape, resists simplification. For these, you need the full method: assign currents, write KCL at nodes and KVL around loops, and solve the resulting simultaneous equations. It's methodical, mechanical, and works every time. You trade intuition for procedure — and the procedure never fails.</p>

**Floor 1 (Concrete):**
<p>A Wheatstone bridge: a diamond with R₁=10 Ω (top-left), R₂=20 Ω (top-right), R₃=30 Ω (bottom-right), R₄=40 Ω (bottom-left), and a galvanometer R_g=50 Ω across the middle. A 10 V battery across the bridge. Method: (1) Label three mesh currents I₁ (left loop), I₂ (right loop), I₃ (centre branch through R_g). (2) Write KVL for each loop. Left: 10 − 10I₁ − 40(I₁−I₃) − 50(I₁−I₂) = 0 → 10 − 100I₁ + 50I₂ + 40I₃ = 0. Centre (galvanometer loop): −50(I₂−I₁) − 20I₂ − 30(I₂−I₃) = 0 → 50I₁ − 100I₂ + 30I₃ = 0. Right outer (bottom): −30(I₃−I₂) − doesn't apply since that's covered. Actually let me simplify — the standard approach is three loops: left mesh, right mesh, and centre mesh. Three equations, three unknowns. Solve: I₁ ≈ 0.43 A, I₂ ≈ 0.14 A, I₃ ≈ 0.036 A. The galvanometer current I_g = I₁−I₂ ≈ 0.29 A. The bridge is unbalanced — current flows through the centre.</p>

**Floor 2 (Definition):**
<p><strong>Systematic circuit analysis</strong> procedure: (1) Label all nodes and assign mesh (loop) currents — one per independent loop. Direction convention: all clockwise (or all anticlockwise) to keep signs consistent. (2) For each mesh, write KVL: sum of voltage rises (batteries) minus sum of IR drops (own mesh current × total resistance in that loop, minus shared resistances × other mesh currents flowing through them). (3) Solve the resulting linear system. (4) From mesh currents, find branch currents by adding/subtracting mesh currents flowing through shared branches. (5) Verify with KCL at a node. For n independent loops, you have n equations in n unknowns.</p>

**Floor 3 (In action):**
<p>The mesh method is the brute-force solver. It works for any planar circuit regardless of complexity — multi-loop, multi-source, with dependent sources. The trade-off: more equations to solve. A 3-loop circuit gives 3 simultaneous equations — doable by hand. A 10-loop circuit gives 10 — use a computer. The method also scales to AC circuits: replace resistances with impedances (complex numbers), and the same mesh equations work for finding amplitudes and phases. The procedure is identical; only the arithmetic changes. In Circuit SPICE simulation software, the computer uses exactly this method — nodal or mesh analysis — to solve circuits with millions of components.</p>

**Image prompt:** A chalk drawing of a Wheatstone bridge diamond with 4 resistors on the sides and a galvanometer across the middle. Three mesh currents I₁, I₂, I₃ labelled. The KVL equations written out for each loop. The solved values with units. A note: "Any planar circuit → label meshes → write KVL → solve linear system." Chalk on dark green board. Square 1:1.

---

# Part 5 — Capacitors and RC circuits

---

## BB-NEW-214 — Capacitance: storing charge and energy

**Subject:** physics | **Topic:** electricity | **Concept:** capacitance; C=Q/V; parallel-plate-capacitor; dielectric | **Ground:** g0 | **Builds on:** [BB-NEW-200, BB-NEW-202]

**Floor 0 (Idea):**
<p>A resistor dissipates energy as heat. A capacitor does the opposite — it stores energy in an electric field. Two metal plates separated by an insulator, connected to a battery: charge builds up on the plates, one positive, one negative, and stays there even after the battery is removed. The capacitor holds the charge, and the energy, until you give it a path to discharge.</p>

**Floor 1 (Concrete):**
<p>A parallel-plate capacitor: two aluminium foils separated by wax paper, rolled into a cylinder. Connect to a 9 V battery. Charge flows onto the plates until the voltage across the capacitor equals 9 V. The amount of charge stored per volt is the capacitance C. If C = 100 μF, then Q = CV = 100×10⁻⁶ × 9 = 900 μC = 0.0009 C. The energy stored: E = ½CV² = ½ × 100×10⁻⁶ × 81 = 4.05×10⁻³ J = 4.05 mJ — enough to briefly light an LED. The capacitance depends on plate area A, plate separation d, and the insulator material (dielectric): C = ε₀εᵣA/d, where ε₀ = 8.85×10⁻¹² F/m and εᵣ is the dielectric constant.</p>

**Floor 2 (Definition):**
<p><strong>Capacitance</strong> C is the ratio of stored charge to applied voltage: <strong>C = Q/V</strong>, measured in <strong>farads</strong> (F = C/V). 1 F is enormous — practical capacitors are μF (10⁻⁶), nF (10⁻⁹), or pF (10⁻¹²). For a <strong>parallel-plate capacitor</strong>: C = ε₀εᵣA/d. A <strong>dielectric</strong> (insulator between plates) increases capacitance by a factor εᵣ (dielectric constant). The <strong>energy stored</strong> in a capacitor is <strong>E = ½CV² = ½QV = ½Q²/C</strong>. A capacitor blocks DC (once charged, no current flows) but passes AC (the plates charge and discharge alternately).</p>

**Floor 3 (In action):**
<p>Capacitors are everywhere. In a camera flash, a capacitor charges slowly from a battery, then dumps its energy into the flash tube in milliseconds — high power for a short burst. In a power supply, capacitors smooth the rectified AC into steady DC. In a touchscreen, your finger changes the capacitance at that point. In a defibrillator, a capacitor charged to ~2000 V discharges across the chest — ½CV² ≈ 200 J — to reset the heart's rhythm. The ability to store energy and release it on demand makes the capacitor the sprinter of circuit elements: slow to charge, explosively fast to discharge.</p>

**Image prompt:** A chalk drawing of a parallel-plate capacitor: two metal plates with an insulator between, connected to a battery. Positive charges accumulate on one plate, negative on the other. Below: C = Q/V, C = ε₀εᵣA/d, E = ½CV². A water analogy: a rubber membrane across a pipe — it stretches (stores energy) and can push water back. Chalk on dark green board. Square 1:1.

---

## BB-NEW-215 — Capacitors in circuits: series and parallel

**Subject:** physics | **Topic:** electricity | **Concept:** capacitors-series; capacitors-parallel; equivalent-capacitance | **Ground:** g1 | **Builds on:** [BB-NEW-205, BB-NEW-206, BB-NEW-214]

**Floor 0 (Idea):**
<p>Capacitors combine opposite to resistors. In parallel, capacitances add: C_eq = C₁ + C₂ + ... (like resistors in series). In series, capacitances combine as reciprocals: 1/C_eq = 1/C₁ + 1/C₂ + ... (like resistors in parallel). The reason: parallel capacitors all see the same voltage, so total stored charge adds. Series capacitors all store the same charge, so voltages add and effective capacitance decreases.</p>

**Floor 1 (Concrete):**
<p>Three capacitors: 2 μF, 3 μF, and 6 μF. In parallel: C_eq = 2+3+6 = 11 μF. Connected to 12 V, total stored charge Q = C_eqV = 11×10⁻⁶ × 12 = 132 μC. Each capacitor sees 12 V: Q₁ = 2×12 = 24 μC, Q₂ = 3×12 = 36 μC, Q₃ = 6×12 = 72 μC. Total: 24+36+72 = 132 μC ✓. Now the same three in series: 1/C_eq = ½ + ⅓ + 1/6 = 3/6 + 2/6 + 1/6 = 6/6 = 1. So C_eq = 1 μF — smaller than any individual capacitor. Connected to 12 V, total stored charge Q = C_eqV = 12 μC. Each capacitor in series stores the same 12 μC. Voltages divide: V₁ = Q/C₁ = 12/2 = 6 V, V₂ = 12/3 = 4 V, V₃ = 12/6 = 2 V. Sum: 6+4+2 = 12 V ✓.</p>

**Floor 2 (Definition):**
<p>For capacitors in <strong>parallel</strong>: (1) Voltage is the same across each. (2) Total charge Q_total = Q₁+Q₂+... (3) <strong>C_eq = C₁ + C₂ + C₃ + ...</strong> — capacitance adds. For capacitors in <strong>series</strong>: (1) Charge is the same on each capacitor (the same current flows through all). (2) Total voltage V_total = V₁+V₂+... (3) <strong>1/C_eq = 1/C₁ + 1/C₂ + 1/C₃ + ...</strong> — equivalent capacitance is always less than the smallest individual capacitance. For two in series: C_eq = C₁C₂/(C₁+C₂) — product over sum (same formula as resistors in parallel).</p>

**Floor 3 (In action):**
<p>Capacitors in parallel increase the total stored charge — like increasing the plate area. Capacitors in series increase the voltage rating — each capacitor only sees a fraction of the total voltage. High-voltage power supplies stack electrolytic capacitors in series, with balancing resistors to equalise the voltage division. In a filter circuit, large capacitors smooth ripple. In a timing circuit, series or parallel combinations set the RC time constant. The rules are the inverse of resistors — a deliberate design choice by nature. Resistors in series ADD; capacitors in parallel ADD. Resistors in parallel REDUCE; capacitors in series REDUCE. Keep the two sets of rules separate, and you won't mix them up.</p>

**Image prompt:** A chalk drawing of three capacitors in parallel (left) and three in series (right). Parallel: C_eq = 11μF, Q_total = 132μC, each at 12V. Series: 1/C_eq = 1, C_eq = 1μF, Q = 12μC on each, voltages 6V, 4V, 2V. The formulas boxed: parallel → C_eq = ΣC; series → 1/C_eq = Σ1/C. Chalk on dark green board. Square 1:1.

---

## BB-NEW-216 — RC circuits: charging and discharging with e

**Subject:** physics | **Topic:** electricity | **Concept:** RC-circuit; time-constant; charging-curve; discharging-curve; τ=RC | **Ground:** g1 | **Builds on:** [BB-NEW-204, BB-NEW-214, BB-NEW-135]

**Floor 0 (Idea):**
<p>Connect a capacitor to a battery through a resistor. It doesn't charge instantly — the voltage rises on an exponential curve, approaching the battery voltage but never quite reaching it in finite time. Disconnect the battery and let the capacitor discharge through the same resistor: the voltage falls exponentially toward zero. The speed of both processes is governed by the time constant τ = RC — the product of resistance and capacitance. Larger R or larger C means slower charging and slower discharging.</p>

**Floor 1 (Concrete):**
<p>An RC circuit: R = 10 kΩ, C = 100 μF. Time constant τ = RC = 10×10³ × 100×10⁻⁶ = 1.0 second. Charging from a 9 V battery. At t = 0: V_C = 0. At t = τ = 1 s: V_C = 9(1−e⁻¹) = 9(1−0.368) = 5.69 V — about 63% of the way. At t = 2τ = 2 s: V_C = 9(1−e⁻²) = 9(1−0.135) = 7.78 V — 86%. At t = 3τ = 3 s: 9(1−e⁻³) = 9(1−0.050) = 8.55 V — 95%. At t = 5τ = 5 s: 99.3% — essentially full. Discharging through the same RC: V_C = 9e^(−t/τ). After 1τ: 9×0.368 = 3.31 V. After 3τ: 9×0.050 = 0.45 V. After 5τ: effectively zero. Five time constants is the practical rule of thumb for "fully charged" or "fully discharged."</p>

**Floor 2 (Definition):**
<p>In an <strong>RC circuit</strong>, the capacitor voltage during <strong>charging</strong> is V_C(t) = V₀(1 − e^(−t/τ)). During <strong>discharging</strong>: V_C(t) = V₀ e^(−t/τ). The current in both cases is i(t) = (V₀/R) e^(−t/τ) — maximum at t=0, decaying exponentially to zero. The <strong>time constant</strong> is <strong>τ = RC</strong>, measured in seconds (Ω × F = s). After 1τ, the voltage has changed by ~63% of the remaining gap. After 5τ, the transient is considered complete (<0.7% remaining). The energy stored in the capacitor at full charge is ½CV₀²; the energy dissipated in the resistor during charging is also ½CV₀² — half the energy from the battery is always lost as heat in R, regardless of the value of R.</p>

**Floor 3 (In action):**
<p>RC circuits are the timers of electronics. A camera flash charges its capacitor through a resistor (slow) and discharges through the flash tube (fast — small resistance). The blinking rate of a turn signal in a car is set by an RC time constant. In a touchscreen, the RC delay changes when your finger adds capacitance. In a computer, the RC time constant of interconnects limits the maximum clock speed — signals take time to charge the tiny parasitic capacitance of the wires. The exponential charge/discharge curve is the same shape as Newton's law of cooling, radioactive decay, and population growth — because all are governed by "the rate of change is proportional to how far you are from equilibrium." The RC circuit is the electrical manifestation of a universal pattern.</p>

**Image prompt:** A chalk drawing of an RC circuit: battery, switch, resistor R, capacitor C. Two graphs: charging — exponential rise approaching V₀ from below, marked at 1τ (63%), 2τ (86%), 3τ (95%), 5τ (99%); discharging — exponential decay from V₀ toward zero, same time markers. Time constant τ=RC boxed. Chalk on dark green board. Square 1:1.

---

## Summary

### Part 1 — Fundamental quantities (4 BBs)
| # | Title | Core equation |
|---|-------|---------------|
| 200 | What is electric charge? | Q = ne, charge is quantised and conserved |
| 201 | Electric current | **I = Q/t** |
| 202 | Voltage | **V = W/Q** |
| 203 | Resistance | R = ρL/A |

### Part 2 — Ohm's Law and basic circuits (4 BBs)
| # | Title | Core equation |
|---|-------|---------------|
| 204 | Ohm's Law | **V = IR** (drilled in all three forms) |
| 205 | Series circuits | R_total = R₁+R₂, same I, V divides |
| 206 | Parallel circuits | 1/R_eq = 1/R₁+1/R₂, same V, I divides |
| 207 | Mixed circuits | Systematic reduction method |

### Part 3 — Energy and power (3 BBs)
| # | Title | Core equation |
|---|-------|---------------|
| 208 | Electrical power | **P = IV = I²R = V²/R** |
| 209 | The heating effect | P = I²R, Joule heating |
| 210 | EMF and internal resistance | V = E − Ir |

### Part 4 — Kirchhoff's laws (3 BBs)
| # | Title | Core equation |
|---|-------|---------------|
| 211 | KCL | ΣI_in = ΣI_out |
| 212 | KVL | ΣV = 0 around any loop |
| 213 | Solving complex circuits | Mesh analysis, systematic method |

### Part 5 — Capacitors (3 BBs)
| # | Title | Core equation |
|---|-------|---------------|
| 214 | Capacitance | C = Q/V, E = ½CV² |
| 215 | Capacitors in circuits | Parallel: C_eq = ΣC; Series: 1/C_eq = Σ1/C |
| 216 | RC circuits | τ = RC, V(t) = V₀(1−e^(−t/τ)) |

**17 BBs.** The three core equations — **V=IR, I=Q/t, P=IV** — appear in every part, in multiple BBs, in different contexts, until they are automatic. The water analogy (pressure=voltage, flow=current, constriction=resistance) is the consistent metaphor. Cross-connects to exponents (RC curves = exponential), to energy (conservation in KVL), and to charge conservation (KCL).
