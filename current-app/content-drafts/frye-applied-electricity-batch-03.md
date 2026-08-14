# Frye's Applied Physics → Qubix BBs — Batch 03: Applied Electricity (15 BBs)

These 15 BBs cover the practical, hands-on electricity that Frye taught to engineering students: batteries, AC circuits, and radio/radar. This is the "how things actually work" complement to Verma's theoretical treatment of electromagnetism (BB 550–574). Every BB opens with something observable — a battery, a wall socket, a radio dial — and builds the physics from there.

**Already covered (don't duplicate):** BB-NEW-200–216 (charge, current, circuits, Kirchhoff, capacitors, RC), BB-NEW-550–574 (magnetism, EM induction, AC generator, motors, eddy currents).

**What's new here:** Voltaic cells and the electrochemical series, dry cells and alkaline batteries, lead-acid storage batteries, electroplating and Faraday's laws of electrolysis, AC waveforms and RMS values, reactance (capacitive and inductive), impedance and phasor diagrams, series RLC resonance, power factor and its correction, the vacuum tube as amplifier/oscillator/modulator/rectifier, amplitude and frequency modulation, the superheterodyne receiver, and the principles of radar.

---

## BB-NEW-740 — The first battery: Volta's pile

**Subject:** physics | **Topic:** electricity | **Concept:** voltaic-cell; electrochemical-series; electromotive-force; electrode-potential | **Ground:** g0 | **Builds on:** [BB-NEW-202, BB-NEW-200]

**Floor 0 (Idea):**
<p>Before 1800, the only way to produce electricity was to rub amber with fur — static electricity, high voltage but almost no current. Then Alessandro Volta stacked discs of zinc and copper, separated by cardboard soaked in salt water, and produced a steady flow of current. The battery was born. Every battery you've ever used — in a remote control, a phone, a car — is a descendant of that stack of metal discs.</p>

**Floor 1 (Concrete):**
<p>A simple voltaic cell: a zinc plate and a copper plate immersed in dilute sulphuric acid. The zinc dissolves — Zn → Zn²⁺ + 2e⁻ — leaving electrons on the zinc plate (negative electrode). The copper plate collects hydrogen ions from the acid: 2H⁺ + 2e⁻ → H₂ (gas bubbles). The potential difference between the plates is about 1.1 V. Connect a wire between them, and electrons flow from zinc to copper — current in the external circuit. Inside the cell, ions carry the current through the solution.</p>
<p>The <strong>electrochemical series</strong> ranks metals by their tendency to lose electrons: lithium (most reactive, −3.04 V), potassium, sodium, magnesium, aluminium, zinc (−0.76 V), iron, nickel, lead, hydrogen (0 V by definition), copper (+0.34 V), silver, gold (+1.50 V). Pair zinc with copper and you get 0.34 − (−0.76) = 1.10 V. Pair magnesium with copper and you get 0.34 − (−2.37) = 2.71 V — a stronger battery.</p>

**Floor 2 (Definition):**
<p>A <strong>voltaic cell</strong> converts chemical energy directly into electrical energy via a spontaneous redox reaction. The <strong>electromotive force</strong> (EMF) is the maximum potential difference between the terminals when no current is drawn. The <strong>electrochemical series</strong> (standard electrode potentials) predicts cell voltage: E°_cell = E°_cathode − E°_anode (using reduction potentials). A positive E° means the reaction is spontaneous. <strong>Polarisation:</strong> hydrogen bubbles accumulating on the copper electrode increase internal resistance and reduce voltage — the "depolariser" in modern cells (manganese dioxide) oxidises the hydrogen to water.</p>

**Floor 3 (In action):**
<p>The voltaic pile was the first device to produce sustained electric current — it enabled the discovery of electrolysis (splitting water into hydrogen and oxygen), electroplating, and the entire field of electrochemistry. Modern batteries are refinements of the same principle: different electrode pairs and electrolytes optimised for voltage, capacity, and shelf life. A lemon battery (zinc nail + copper penny in a lemon) produces about 0.9 V — the citric acid is the electrolyte. The voltage depends only on the electrode materials, not the size — a watch battery and a car battery can both be 1.5 V (per cell); the difference is the total charge (current × time) they can deliver.</p>

**Image prompt:** A chalk drawing of Volta's pile: alternating discs of zinc and copper with brine-soaked cardboard between them. Arrows showing electron flow from zinc to copper through an external wire. The electrochemical series table: Li −3.04, Zn −0.76, H 0, Cu +0.34, Au +1.50. E_cell = E_cathode − E_anode. Chalk on dark green board. Square 1:1.


## BB-NEW-741 — Dry cells and alkaline batteries

**Subject:** physics | **Topic:** electricity | **Concept:** dry-cell; alkaline-battery; Leclanche-cell; battery-capacity | **Ground:** g0 | **Builds on:** [BB-NEW-740]

**Floor 0 (Idea):**
<p>A voltaic pile leaks acid everywhere. The dry cell — invented in 1866 by Georges Leclanché — solved this by using a moist paste instead of liquid, sealed in a zinc can. The alkaline battery, introduced commercially in the 1960s, uses potassium hydroxide instead of ammonium chloride, roughly doubling the capacity. These are the AA and AAA cells that power your remote controls, clocks, and toys.</p>

**Floor 1 (Concrete):**
<p>A zinc-carbon dry cell (the classic "heavy-duty" battery): anode = zinc can (oxidised: Zn → Zn²⁺ + 2e⁻), cathode = carbon rod surrounded by manganese dioxide (MnO₂) and carbon powder, electrolyte = ammonium chloride (NH₄Cl) paste. EMF = 1.5 V. Capacity of a typical AA: about 1100 mAh (milliamp-hours) — can deliver 1100 mA for 1 hour, or 100 mA for 11 hours. Internal resistance: ~0.5 Ω fresh, rising to several ohms as it depletes.</p>
<p>An alkaline cell: same zinc anode and manganese dioxide cathode, but electrolyte is potassium hydroxide (KOH). The alkaline electrolyte reduces corrosion and allows purer materials, roughly doubling capacity to ~2500 mAh for AA. Shelf life: 5–10 years vs 2–3 years for zinc-carbon.</p>

**Floor 2 (Definition):**
<p>A <strong>dry cell</strong> is a primary (non-rechargeable) battery with a paste electrolyte. <strong>Anode</strong> (negative): zinc — oxidised during discharge. <strong>Cathode</strong> (positive): manganese dioxide — reduced. The <strong>EMF</strong> is fixed by the electrode pair at ~1.5 V per cell. <strong>Capacity</strong> (mAh or Ah) is the total charge the cell can deliver at a specified discharge rate. <strong>Energy density:</strong> alkaline ~150 Wh/kg, lithium (non-rechargeable) ~300 Wh/kg. <strong>Shelf life</strong> is limited by slow self-discharge — the zinc corrodes even when not in use. Batteries in series add voltages (3 × 1.5 V = 4.5 V); batteries in parallel add capacities (same voltage, more current).</p>

**Floor 3 (In action):**
<p>Billions of dry cells are sold annually. The choice between zinc-carbon and alkaline is a cost-capacity tradeoff: alkaline costs ~2× but delivers ~2× the energy. In low-drain devices (clocks, remote controls), zinc-carbon is adequate. In high-drain devices (digital cameras, flashguns), alkaline is essential. Lithium primary cells (1.5–3.7 V, ~300 Wh/kg) power smoke detectors, pacemakers, and military equipment where replacement is difficult or impossible. The environmental cost is significant — most dry cells end up in landfill, leaching zinc and manganese. Recycling programmes recover the metals. The 9 V battery is six tiny 1.5 V cells in series inside a rectangular case — open one up and you'll find six AAAA-sized cells.</p>

**Image prompt:** A cross-section chalk drawing of a zinc-carbon dry cell. Outer zinc can (anode), central carbon rod (cathode), MnO₂ + C paste, NH₄Cl electrolyte. Electron flow arrows. Beside it: an alkaline cell with KOH electrolyte. Table: AA capacity — zinc-carbon 1100 mAh, alkaline 2500 mAh, lithium 3000+ mAh. Chalk on dark green board. Square 1:1.


## BB-NEW-742 — The lead-acid battery: starting your car

**Subject:** physics | **Topic:** electricity | **Concept:** lead-acid-battery; secondary-cell; charging-discharging; specific-gravity | **Ground:** g0 | **Builds on:** [BB-NEW-740, BB-NEW-741]

**Floor 0 (Idea):**
<p>A car battery isn't like the AAs in your remote — it's rechargeable. During discharge, lead and lead dioxide plates react with sulphuric acid to produce lead sulphate and water. During charging, the reaction reverses, regenerating the original materials. The lead-acid battery, invented by Gaston Planté in 1859, is still the most cost-effective way to store large amounts of electrical energy.</p>

**Floor 1 (Concrete):**
<p>A typical car battery: 6 cells in series, each producing ~2.1 V, total ~12.6 V when fully charged. Each cell has lead (Pb) negative plates and lead dioxide (PbO₂) positive plates, immersed in sulphuric acid (H₂SO₄, specific gravity ~1.265 when fully charged). Discharge reaction: Pb + PbO₂ + 2H₂SO₄ → 2PbSO₄ + 2H₂O. The acid is consumed, water is produced — the specific gravity drops to ~1.120 when discharged. Capacity: typically 40–80 Ah (amp-hours). A 60 Ah battery can deliver 60 A for 1 hour, or 3 A for 20 hours. Cold cranking amps (CCA): the current it can deliver at −18°C for 30 seconds while maintaining at least 7.2 V — typically 400–800 A.</p>

**Floor 2 (Definition):**
<p>A <strong>secondary cell</strong> (rechargeable battery) stores energy via reversible chemical reactions. <strong>Lead-acid:</strong> anode = Pb, cathode = PbO₂, electrolyte = H₂SO₄. Cell voltage = 2.1 V. <strong>Charging:</strong> apply a voltage >2.1 V per cell to reverse the reaction — typically 13.8–14.4 V for a 6-cell car battery. Overcharging electrolyses water into hydrogen and oxygen — sealed "maintenance-free" batteries catalyse their recombination. <strong>Specific gravity</strong> (density relative to water) indicates state of charge: 1.265 = full, 1.225 = 75%, 1.190 = 50%, 1.155 = 25%, 1.120 = discharged. <strong>Energy density:</strong> ~30–40 Wh/kg (low, but cheap). <strong>Cycle life:</strong> 200–500 deep cycles. Other rechargeable chemistries: NiCd, NiMH, Li-ion (160–250 Wh/kg).</p>

**Floor 3 (In action):**
<p>Lead-acid batteries start every petrol and diesel vehicle on Earth. The starter motor draws 100–300 A for a few seconds — the battery's low internal resistance (~0.01 Ω) makes this possible. After starting, the alternator recharges the battery. Forklifts, golf carts, and uninterruptible power supplies (UPS) use deep-cycle lead-acid batteries designed to be discharged 80% repeatedly. Grid-scale energy storage uses enormous lead-acid battery banks — a 1 MW installation might contain 2000 cells. The lead-acid battery is 165 years old and still dominant in automotive and backup applications because nothing else matches its cost per watt. The tradeoff: weight. Electric vehicles use lithium-ion because lead-acid would weigh 5× more for the same range.</p>

**Image prompt:** A cross-section chalk drawing of a lead-acid cell. Lead (Pb) negative plate, lead dioxide (PbO₂) positive plate, sulphuric acid electrolyte. Discharge/charge arrows showing the reversible reaction. A hydrometer measuring specific gravity: 1.265 (charged) vs 1.120 (discharged). Battery in engine bay with alternator. Chalk on dark green board. Square 1:1.


## BB-NEW-743 — Electrolysis: using electricity to split molecules

**Subject:** physics | **Topic:** electricity | **Concept:** electrolysis; Faradays-laws-of-electrolysis; electroplating; electrochemical-equivalent | **Ground:** g1 | **Builds on:** [BB-NEW-740, BB-NEW-201]

**Floor 0 (Idea):**
<p>Pass an electric current through water, and it splits into hydrogen and oxygen. Pass it through a solution of copper sulphate, and pure copper plates onto the negative electrode. This is electrolysis — using electricity to drive a chemical reaction that wouldn't happen spontaneously. It's the reverse of a battery: instead of chemicals making electricity, electricity remakes chemicals.</p>

**Floor 1 (Concrete):**
<p><strong>Electrolysis of water:</strong> Two platinum electrodes in water with a little sulphuric acid (to make it conductive). At the cathode: 2H⁺ + 2e⁻ → H₂ (gas). At the anode: 2H₂O → O₂ + 4H⁺ + 4e⁻. Overall: 2H₂O → 2H₂ + O₂. For every 2 volumes of hydrogen collected, 1 volume of oxygen is produced. Energy required: 237 kJ per mole of water (at 25°C). At 1.23 V, Faraday's constant F = 96,485 C/mol tells us that 1 mole of electrons (96,485 C) produces 0.25 mole of O₂ and 0.5 mole of H₂.</p>
<p><strong>Electroplating:</strong> A copper anode and a steel object as cathode in CuSO₄ solution. Current I = 2.0 A for 30 minutes (1800 s). Charge Q = It = 3600 C. Moles of electrons = 3600/96,485 = 0.0373 mol. Cu²⁺ + 2e⁻ → Cu, so 2 electrons deposit 1 Cu atom. Mass deposited = (0.0373/2) × 63.5 = 1.18 g of copper.</p>

**Floor 2 (Definition):**
<p><strong>Electrolysis</strong> is the decomposition of a compound by an electric current. <strong>Faraday's first law:</strong> the mass m of substance liberated is proportional to the charge passed — m = ZQ, where Z is the electrochemical equivalent (kg/C). <strong>Faraday's second law:</strong> for a given charge, the masses of different substances liberated are proportional to their equivalent weights (molar mass/valence). <strong>Faraday's constant</strong> F = 96,485 C/mol is the charge of one mole of electrons. m = (M/n)(Q/F), where M is molar mass and n is the number of electrons per ion. The minimum <strong>decomposition voltage</strong> is the cell EMF in reverse; real cells need additional <strong>overpotential</strong> to overcome kinetic barriers.</p>

**Floor 3 (In action):**
<p>Electrolysis powers entire industries. Aluminium is produced by the Hall-Héroult process — electrolysis of alumina (Al₂O₃) dissolved in molten cryolite at 950°C, consuming about 15 kWh per kilogram of aluminium. Chlorine and sodium hydroxide are co-produced by electrolysis of brine (NaCl solution). Electroplating puts a thin layer of chromium on car bumpers, gold on jewellery, and zinc on steel (galvanisation). Hydrogen for fuel cells can be produced by water electrolysis using renewable electricity — "green hydrogen." In space, electrolysis of water produces breathing oxygen for astronauts. The Apollo 13 crew survived partly because their fuel cells consumed hydrogen and oxygen to produce electricity and water; the reverse process, electrolysis, is how we could refuel on Mars.</p>

**Image prompt:** A chalk drawing of an electrolysis cell. Two electrodes in a beaker of water with acid. Bubbles of H₂ at the cathode, O₂ at the anode. The external battery driving current. Faraday's law: m = (M/n)(Q/F). An electroplating setup: copper anode, steel cathode, Cu²⁺ ions migrating. Chalk on dark green board. Square 1:1.


## BB-NEW-744 — Alternating current: what "230 V, 50 Hz" actually means

**Subject:** physics | **Topic:** electricity | **Concept:** AC-waveform; RMS-voltage; peak-voltage; frequency; phase | **Ground:** g0 | **Builds on:** [BB-NEW-573, BB-NEW-202]

**Floor 0 (Idea):**
<p>Your wall socket delivers alternating current: the voltage swings from +325 V to −325 V, 50 times per second. But it's labelled 230 V. Why? Because 230 V is the <strong>RMS</strong> (root mean square) value — the equivalent DC voltage that would deliver the same average power to a resistor. The peak is √2 ≈ 1.414 times the RMS. AC does this sine-wave dance specifically because rotating generators naturally produce sine waves.</p>

**Floor 1 (Concrete):**
<p>A European wall socket: V(t) = V_peak sin(2πft) = 325 sin(100πt) volts. Frequency f = 50 Hz. Period T = 1/50 = 0.020 s = 20 ms. Peak voltage V_peak = 325 V. RMS voltage V_rms = V_peak/√2 = 325/1.414 = 230 V. Peak-to-peak = 650 V.</p>
<p>For a purely resistive load (R = 100 Ω): I_peak = V_peak/R = 3.25 A. I_rms = 2.30 A. Instantaneous power P(t) = V(t)I(t) = V_peak I_peak sin²(ωt) = (V_peak²/R) sin²(ωt). Average power = V_rms I_rms = 230 × 2.30 = 529 W. This is exactly half the peak power (V_peak²/2R = 1056/2 W). The average of sin² over a full cycle is ½.</p>
<p>In the US: V_rms = 120 V, f = 60 Hz, V_peak = 170 V. The higher European voltage is more efficient for transmission but more dangerous — a compromise.</p>

**Floor 2 (Definition):**
<p><strong>Alternating current</strong> (AC) periodically reverses direction. The standard waveform is sinusoidal: V(t) = V_peak sin(ωt + φ), where ω = 2πf. <strong>RMS value:</strong> V_rms = √[(1/T) ∫₀ᵀ V²(t) dt] = V_peak/√2 (for sine waves). RMS is the value that makes P_avg = V_rms I_rms for a resistor. <strong>Average voltage</strong> of a pure sine wave over a full cycle is zero. <strong>Frequency</strong> f: Europe/Asia/Africa = 50 Hz, Americas/Japan = 60 Hz. <strong>Three-phase</strong> power: three sine waves 120° apart — delivers constant instantaneous power and is the standard for generation and transmission.</p>

**Floor 3 (In action):**
<p>The 50/60 Hz split is a historical accident. European engineers standardised on 50 Hz (metric-friendly, lower eddy-current losses in transformers). American engineers, following Tesla and Westinghouse, standardised on 60 Hz (slightly less flicker in incandescent lights, slightly smaller transformers). The difference means appliances are not universally compatible — a 60 Hz motor runs 20% slower on 50 Hz. Aircraft use 400 Hz AC because transformers and motors can be much smaller and lighter at higher frequencies. The RMS concept applies to any waveform: a square wave has V_rms = V_peak; a triangle wave has V_rms = V_peak/√3. Your multimeter reads RMS (or approximates it) — always know whether it's measuring peak, average, or true RMS.</p>

**Image prompt:** A chalk drawing of a sine wave V(t) = 325 sin(100πt). V_peak = 325 V, V_rms = 230 V marked. The peak-to-peak = 650 V. The sin² power curve below, showing average = V_rms²/R = 529 W. Equation: V_rms = V_peak/√2. Chalk on dark green board. Square 1:1.


## BB-NEW-745 — Reactance: why capacitors and inductors fight AC

**Subject:** physics | **Topic:** electricity | **Concept:** capacitive-reactance; inductive-reactance; impedance; phase-angle | **Ground:** g1 | **Builds on:** [BB-NEW-744, BB-NEW-214, BB-NEW-570]

**Floor 0 (Idea):**
<p>A resistor resists current the same way at all frequencies. A capacitor blocks DC completely but lets high-frequency AC through easily. An inductor passes DC freely but resists high-frequency AC. These frequency-dependent resistances are called reactance — and they're the reason your speakers have crossover circuits and your radio can tune to a specific station.</p>

**Floor 1 (Concrete):**
<p>Capacitor C = 10 µF at f = 50 Hz: X_C = 1/(2πfC) = 1/(2π × 50 × 10×10⁻⁶) = 1/(0.00314) = 318 Ω. At f = 5000 Hz: X_C = 3.18 Ω. The capacitor is a near-short at high frequencies.</p>
<p>Inductor L = 0.10 H at f = 50 Hz: X_L = 2πfL = 2π × 50 × 0.10 = 31.4 Ω. At f = 5000 Hz: X_L = 3140 Ω. The inductor blocks high frequencies.</p>
<p>Series RLC circuit: R = 100 Ω, L = 0.10 H, C = 10 µF, f = 50 Hz. X_L = 31.4 Ω, X_C = 318 Ω. Net reactance X = X_L − X_C = −286.6 Ω (capacitive — negative). Impedance Z = √(R² + X²) = √(100² + 286.6²) = √(10,000 + 82,140) = √92,140 = 303.6 Ω. Phase angle φ = arctan(X/R) = arctan(−2.866) = −70.8° — current leads voltage by 71°.</p>

**Floor 2 (Definition):**
<p><strong>Capacitive reactance:</strong> X_C = 1/(2πfC) = 1/(ωC). Unit: ohm (Ω). Decreases with frequency — capacitor passes AC but blocks DC. Current <strong>leads</strong> voltage by 90° (ICE: I leads V in C). <strong>Inductive reactance:</strong> X_L = 2πfL = ωL. Increases with frequency — inductor passes DC but blocks AC. Current <strong>lags</strong> voltage by 90° (ELI: V leads I in L). <strong>Impedance</strong> Z = √(R² + (X_L − X_C)²) is the generalisation of resistance for AC circuits. <strong>Phase angle</strong> φ = arctan((X_L − X_C)/R). For pure R: φ = 0. For pure L: φ = +90°. For pure C: φ = −90°. AC circuits require complex numbers (phasors) for complete description.</p>

**Floor 3 (In action):**
<p>Reactance is the basis of all frequency filtering. A speaker crossover sends bass to the woofer through an inductor (low-pass: passes low f) and treble to the tweeter through a capacitor (high-pass: passes high f). A radio tuner uses a variable capacitor to adjust X_C until a particular station's frequency resonates with the inductor in the circuit. Power lines have significant inductance: long-distance AC transmission suffers from reactive power losses because the line itself is an inductor. Capacitor banks are installed at substations to offset this — power factor correction. In audio, the tone control on an amplifier is a variable reactance circuit: turn the knob and you're changing the balance of X_C and X_L.</p>

**Image prompt:** A chalk drawing of three circuits: pure R (V and I in phase), pure L (V leads I by 90°), pure C (I leads V by 90°). Graphs of X_C vs f (hyperbola, decreasing) and X_L vs f (straight line, increasing). The impedance triangle: R horizontal, X vertical, Z hypotenuse, φ angle. Chalk on dark green board. Square 1:1.


## BB-NEW-746 — Series resonance: when X_L = X_C

**Subject:** physics | **Topic:** electricity | **Concept:** series-resonance; resonant-frequency; Q-factor; bandwidth | **Ground:** g1 | **Builds on:** [BB-NEW-745, BB-NEW-744]

**Floor 0 (Idea):**
<p>There is one frequency where a capacitor and inductor cancel each other out perfectly — where X_L = X_C and the only opposition to current is the resistance. This is resonance. At the resonant frequency, the current is maximum, and the voltages across L and C can be many times the source voltage. This is how a radio selects one station out of hundreds.</p>

**Floor 1 (Concrete):**
<p>A series RLC circuit: R = 10 Ω, L = 100 µH = 10⁻⁴ H, C = 100 pF = 10⁻¹⁰ F. Resonant frequency: f₀ = 1/(2π√(LC)) = 1/(2π√(10⁻⁴ × 10⁻¹⁰)) = 1/(2π × 10⁻⁷) = 1.59 × 10⁶ Hz = 1.59 MHz — right in the AM radio band. At resonance: X_L = 2πf₀L = 2π(1.59×10⁶)(10⁻⁴) = 1000 Ω, X_C = 1/(2πf₀C) = 1000 Ω. They cancel. Z = R = 10 Ω. Current I = V/Z is maximum.</p>
<p>The <strong>quality factor</strong> Q = X_L/R = 1000/10 = 100. The voltage across L (or C) at resonance: V_L = IX_L = (V/R)X_L = Q × V_source. With 1 V input, V_L = 100 V — a hundredfold voltage magnification. <strong>Bandwidth:</strong> Δf = f₀/Q = 1.59 MHz/100 = 15.9 kHz. The circuit selects a 15.9 kHz wide slice of the spectrum centred at 1.59 MHz.</p>

**Floor 2 (Definition):**
<p><strong>Series resonance</strong> occurs when X_L = X_C, i.e., at f₀ = 1/(2π√(LC)). At resonance: impedance is minimum (Z = R), current is maximum (I = V/R), the circuit is purely resistive (φ = 0). <strong>Quality factor</strong> Q = ω₀L/R = 1/(ω₀CR). High Q means sharp tuning (narrow bandwidth). <strong>Bandwidth</strong> Δf = f₀/Q = f₂ − f₁ (the frequencies where current drops to 1/√2 ≈ 0.707 of maximum). <strong>Selectivity:</strong> a radio with Q = 100 can separate stations 15.9 kHz apart. In a <strong>parallel RLC</strong> circuit, resonance gives <em>maximum</em> impedance and <em>minimum</em> current — the dual behaviour, used in rejection filters.</p>

**Floor 3 (In action):**
<p>Resonance is the operating principle of every radio and television receiver. Turn the tuning knob and you're varying C (or L), moving f₀ across the band until it matches the desired station's carrier frequency. A high-Q circuit rejects adjacent stations; too high a Q cuts into the audio sidebands, losing fidelity. In a Tesla coil, the primary and secondary are tuned to the same resonant frequency — the Q can exceed 100, producing enormous voltage magnification from a modest input. Crystal oscillators in computers use the mechanical resonance of a quartz crystal (Q > 10,000) for precise clock signals. The Tacoma Narrows Bridge collapse (1940) was a resonance disaster — wind-driven oscillations matched the bridge's natural frequency, and the amplitude grew until failure.</p>

**Image prompt:** A chalk drawing of a series RLC circuit with the resonance curve: current vs frequency, sharp peak at f₀. The bandwidth Δf = f₀/Q marked at 0.707 of peak. The impedance triangle at resonance: X_L = X_C, Z = R. Equation f₀ = 1/(2π√(LC)). Chalk on dark green board. Square 1:1.


## BB-NEW-747 — Power in AC circuits: what "real power" means

**Subject:** physics | **Topic:** electricity | **Concept:** AC-power; real-power; reactive-power; apparent-power; power-factor | **Ground:** g1 | **Builds on:** [BB-NEW-745, BB-NEW-744, BB-NEW-208]

**Floor 0 (Idea):**
<p>In a DC circuit, power is simply voltage × current. In AC, it's more complicated: if voltage and current are out of phase, some of the power sloshes back and forth between the source and the load without doing useful work. Only the in-phase component delivers real power. The ratio — real power/apparent power — is the power factor, and utilities charge industrial customers for poor power factor.</p>

**Floor 1 (Concrete):**
<p>A factory motor draws I_rms = 50 A at V_rms = 230 V. The motor is inductive: current lags voltage by φ = 37° (cos φ = 0.80). Apparent power S = V_rms I_rms = 230 × 50 = 11,500 VA (volt-amperes). Real power P = V_rms I_rms cos φ = 11,500 × 0.80 = 9200 W — the power actually turning the shaft. Reactive power Q = V_rms I_rms sin φ = 11,500 × 0.60 = 6900 VAR (volt-amperes reactive) — energy oscillating in the magnetic field, not doing mechanical work.</p>
<p>The power triangle: P² + Q² = S². 9200² + 6900² = 84,640,000 + 47,610,000 = 132,250,000 = 11,500² ✓. To correct the power factor to 0.95, utilities install capacitors that supply Q locally, reducing the current drawn from the grid. Required Q_c = P(tan φ_old − tan φ_new).</p>

**Floor 2 (Definition):**
<p>In AC circuits with sinusoidal waveforms: <strong>instantaneous power</strong> p(t) = v(t)i(t) = V_rms I_rms[cos φ − cos(2ωt − φ)]. <strong>Real (active) power</strong> P = V_rms I_rms cos φ (watts, W) — the average over a cycle, does useful work. <strong>Reactive power</strong> Q = V_rms I_rms sin φ (volt-amperes reactive, VAR) — stored and returned each cycle by inductors (+) and capacitors (−). <strong>Apparent power</strong> S = V_rms I_rms (volt-amperes, VA). <strong>Power factor</strong> PF = cos φ = P/S. Pure resistor: PF = 1. Pure inductor or capacitor: PF = 0 (no net power). Industrial loads are typically inductive; PF correction adds capacitors in parallel.</p>

**Floor 3 (In action):**
<p>Power factor is an enormous economic concern. Generating stations must supply the apparent power, but only real power is billed (for residential customers). Industrial users with PF < 0.95 pay penalties because they waste grid capacity. A 100 MW factory with PF = 0.70 draws 143 MVA — the extra 43 MVA heats the transmission lines without turning a single motor. Capacitor banks at substations provide local reactive power, improving PF and reducing losses. The typical unloaded home has PF ≈ 0.95–1.0 (mostly resistive loads — heaters, incandescent lights). LED drivers and computer power supplies can have PF as low as 0.5–0.6 without correction — modern regulations require active PF correction in supplies over 75 W.</p>

**Image prompt:** A chalk drawing of the power triangle: P (horizontal, real), Q (vertical, reactive), S (hypotenuse, apparent). Angle φ labelled. The waveforms: V(t) and I(t) out of phase, instantaneous power p(t) oscillating. P_avg = V_rms I_rms cos φ. A motor with capacitor bank for PF correction. Chalk on dark green board. Square 1:1.


## BB-NEW-748 — The vacuum tube: how we amplified before transistors

**Subject:** physics | **Topic:** electricity | **Concept:** vacuum-tube; thermionic-emission; triode; amplification; oscillation | **Ground:** g2 | **Builds on:** [BB-NEW-200, BB-NEW-202]

**Floor 0 (Idea):**
<p>Before the transistor, there was the vacuum tube — a glass bulb with the air sucked out, containing a heated filament that boiled electrons into the vacuum, and metal grids and plates that controlled their flow. A tiny voltage on the grid could control a much larger current through the tube. This was amplification: making a small signal big. Every radio, television, and early computer was built from thousands of these glowing glass bottles.</p>

**Floor 1 (Concrete):**
<p>A triode vacuum tube: cathode (heated filament, emits electrons via thermionic emission), grid (a wire mesh between cathode and anode), anode (plate, at high positive voltage ~100–300 V). A small change in grid voltage (say 1 V) changes the anode current by several milliamps. If the anode circuit includes a 50 kΩ resistor, the voltage swing across it is ΔV = ΔI × R ≈ 5 mA × 50 kΩ = 250 V — a voltage amplification of 250×. The tube is a voltage-controlled current source.</p>
<p>As an <strong>oscillator:</strong> feed some of the output back to the input in the correct phase, and the tube produces a continuous AC signal — the basis of radio transmitters. As a <strong>rectifier:</strong> with just cathode and anode (a diode), current flows only one way — AC becomes DC. As a <strong>modulator:</strong> vary the grid voltage with an audio signal, and the carrier amplitude follows the audio.</p>

**Floor 2 (Definition):**
<p>A <strong>vacuum tube</strong> (thermionic valve) controls electron flow in a vacuum. <strong>Thermionic emission:</strong> heating a metal filament gives electrons enough energy to escape into vacuum (Richardson's law: J = AT²e^(−W/kT)). <strong>Diode:</strong> cathode + anode — rectifier. <strong>Triode:</strong> cathode + grid + anode — amplifier. A small grid voltage controls a large plate current. <strong>Amplification factor</strong> μ = ΔV_plate/ΔV_grid (at constant current), typically 10–100. <strong>Transconductance</strong> g_m = ΔI_plate/ΔV_grid. The tube requires high voltages (~100–300 V) and filament heating power (~6 V, ~0.3 A), making it bulky, hot, and inefficient compared to transistors.</p>

**Floor 3 (In action):**
<p>Vacuum tubes dominated electronics from 1906 (Lee De Forest's triode) until the 1960s. The first computers (ENIAC, 1945) used 17,468 vacuum tubes and consumed 150 kW. A tube failed roughly every two days — finding and replacing the dead one was a constant task. Today, tubes survive in niche applications where their unique properties excel: high-power radio transmitters (megawatt-class shortwave stations), guitar amplifiers (musicians prefer the "warm" distortion of overdriven tubes), and microwave ovens (the magnetron is a specialised vacuum tube generating 2.45 GHz microwaves). The cathode ray tube (CRT) in old televisions and oscilloscopes is a vacuum tube with a phosphor screen — an electron beam paints the image line by line.</p>

**Image prompt:** A chalk drawing of a triode vacuum tube cross-section. Heated cathode emitting electrons (dashed lines), grid (mesh), anode (plate). The circuit: small input signal at grid, large amplified output across plate resistor. The three functions: amplification (triode), rectification (diode), oscillation (feedback loop). Chalk on dark green board. Square 1:1.


## BB-NEW-749 — Amplitude modulation: how AM radio carries sound

**Subject:** physics | **Topic:** electricity | **Concept:** amplitude-modulation; carrier-wave; sidebands; AM-radio | **Ground:** g1 | **Builds on:** [BB-NEW-748, BB-NEW-744]

**Floor 0 (Idea):**
<p>A radio wave at 1 MHz can't carry sound directly — sound is 20 Hz to 20 kHz, a thousand times too slow to radiate efficiently. The solution: use a high-frequency "carrier" wave and modify its amplitude to match the audio signal. This is amplitude modulation (AM). The carrier is the vehicle; your voice is the passenger.</p>

**Floor 1 (Concrete):**
<p>A 1 MHz carrier wave: V_c(t) = V_c sin(2π × 10⁶ t). An audio signal at 1 kHz: V_m(t) = V_m sin(2π × 10³ t). The modulated wave: V(t) = (V_c + V_m sin ω_m t) sin ω_c t = V_c sin ω_c t + (V_m/2)[cos(ω_c − ω_m)t − cos(ω_c + ω_m)t]. Three frequencies are transmitted: the carrier (1,000,000 Hz), the lower sideband (999,000 Hz), and the upper sideband (1,001,000 Hz). The audio information is in the sidebands — the carrier carries no information by itself. Total bandwidth: 2 kHz (2 × the highest audio frequency). An AM radio station is allocated 9–10 kHz of bandwidth.</p>

**Floor 2 (Definition):**
<p><strong>Amplitude modulation (AM)</strong> varies the amplitude of a high-frequency carrier wave in proportion to the instantaneous amplitude of the modulating (audio) signal. Modulation index m = V_m/V_c (0 ≤ m ≤ 1). Overmodulation (m > 1) causes distortion. The modulated wave contains the carrier and two sidebands. <strong>Bandwidth</strong> = 2 × f_max (audio). AM is simple to implement — a diode detector can demodulate it with just a few components. Disadvantages: inefficient (carrier carries no information but consumes most of the power — only ~33% maximum efficiency), susceptible to noise (lightning, motors, and electrical interference add directly to the amplitude).</p>

**Floor 3 (In action):**
<p>AM radio (530–1700 kHz) travels hundreds of kilometres at night because the ionosphere reflects medium-wave signals. The first voice broadcast was in 1906 by Reginald Fessenden. AM dominated broadcasting for 50 years. Today, it's mostly talk radio and news — music has moved to FM. The simplicity of AM demodulation means you can build a working AM receiver with a diode, a capacitor, an earphone, and a long wire antenna — no battery required; the radio wave's own power drives the earphone. In aviation, AM is still used for VHF airband (118–137 MHz) because its "capture effect" is weak — if two stations transmit simultaneously, you hear both, which is safer than FM's complete suppression of the weaker signal.</p>

**Image prompt:** A chalk drawing of an AM waveform. The high-frequency carrier with its envelope tracing the audio signal. The spectrum: carrier at f_c, lower sideband at f_c−f_m, upper sideband at f_c+f_m. The modulation index m = V_m/V_c. A simple diode detector circuit. Chalk on dark green board. Square 1:1.


## BB-NEW-750 — Frequency modulation: how FM radio stays clear

**Subject:** physics | **Topic:** electricity | **Concept:** frequency-modulation; FM-radio; capture-effect; noise-immunity | **Ground:** g1 | **Builds on:** [BB-NEW-749, BB-NEW-744]

**Floor 0 (Idea):**
<p>AM varies the amplitude; FM varies the frequency. Instead of making the carrier taller and shorter with the audio, FM makes it faster and slower. The amplitude stays constant, which means lightning and electrical noise — which add to amplitude — are almost completely rejected. This is why FM radio sounds cleaner than AM.</p>

**Floor 1 (Concrete):**
<p>An FM station at 100.0 MHz carries audio up to 15 kHz. The carrier frequency deviates by up to ±75 kHz (the maximum deviation Δf). Modulation index β = Δf/f_m. For a 15 kHz tone at full deviation: β = 75/15 = 5. The modulated signal contains the carrier plus an infinite series of sidebands at f_c ± n f_m, with amplitudes given by Bessel functions. Carson's rule: bandwidth ≈ 2(Δf + f_max) = 2(75 + 15) = 180 kHz. FM stations are spaced 200 kHz apart.</p>
<p>FM is far more immune to noise than AM. A noise spike adds to the amplitude — but the FM receiver clips the amplitude (using a limiter circuit), so the noise spike is erased. The signal-to-noise ratio improvement over AM is roughly 3β² ≈ 75× for broadcast FM. The price: FM uses much more bandwidth per station.</p>

**Floor 2 (Definition):**
<p><strong>Frequency modulation (FM)</strong> varies the instantaneous frequency of the carrier in proportion to the modulating signal: f(t) = f_c + Δf × m(t), where m(t) is the normalised audio signal. <strong>Carrier swing:</strong> ±Δf (maximum deviation). <strong>Modulation index:</strong> β = Δf/f_max. <strong>Bandwidth (Carson's rule):</strong> BW ≈ 2(Δf + f_max). FM <strong>capture effect:</strong> if two signals are received on the same frequency, the receiver locks onto the stronger one and suppresses the weaker — unlike AM. <strong>Pre-emphasis:</strong> a 6 dB/octave treble boost is applied before transmission and de-emphasised at the receiver, further reducing high-frequency noise.</p>

**Floor 3 (In action):**
<p>FM radio (88–108 MHz) was invented by Edwin Armstrong in 1933. He spent years fighting RCA, which had invested heavily in AM and tried to suppress FM. Armstrong won the technical battle but lost the commercial one — he died in 1954, financially ruined, before FM became dominant. Today, FM carries music worldwide because of its superior fidelity. FM's capture effect makes it ideal for aviation navigational aids (VOR, ILS) — precise frequency, no interference. FM synthesis, used in 1980s synthesisers (Yamaha DX7), generates complex timbres by frequency-modulating sine waves. The principle also applies to radar: FM-CW (frequency-modulated continuous wave) radar measures distance by the frequency difference between transmitted and received signals.</p>

**Image prompt:** A chalk drawing of an FM waveform: carrier amplitude constant, frequency varying with the audio signal. The spectrum: carrier at f_c, sidebands spreading 180 kHz wide. Carson's rule: BW = 2(Δf + f_max). A comparison diagram: AM with noise spikes visible, FM with limiter removing them. Chalk on dark green board. Square 1:1.


## BB-NEW-751 — The superheterodyne receiver: how a radio actually works

**Subject:** physics | **Topic:** electricity | **Concept:** superheterodyne; mixing; intermediate-frequency; local-oscillator | **Ground:** g2 | **Builds on:** [BB-NEW-749, BB-NEW-750, BB-NEW-746]

**Floor 0 (Idea):**
<p>A simple radio that tunes to the station's frequency and amplifies it directly is almost impossible to make work well across a wide band. The superheterodyne receiver, invented by Edwin Armstrong in 1918, solves this brilliantly: convert every station to a fixed, lower "intermediate frequency" first, then do all the amplification and filtering at that one frequency. Tune the radio, and you're adjusting a local oscillator, not the amplifier.</p>

**Floor 1 (Concrete):**
<p>An AM radio tuned to 1000 kHz. The antenna receives the weak signal. A local oscillator generates a frequency f_LO = f_signal + f_IF. The IF (intermediate frequency) for AM is typically 455 kHz. So f_LO = 1000 + 455 = 1455 kHz. The mixer multiplies the signal and the LO, producing sum and difference frequencies: 1455 + 1000 = 2455 kHz and 1455 − 1000 = 455 kHz. A tuned filter selects the 455 kHz difference. This 455 kHz signal — now at a fixed frequency regardless of which station is tuned — is amplified and demodulated.</p>
<p>When you turn the dial, both the antenna tuning and the local oscillator change simultaneously (ganged variable capacitors), keeping the difference always at 455 kHz. The IF amplifier is optimised for this one frequency, giving high gain and sharp selectivity. For FM, f_IF = 10.7 MHz.</p>

**Floor 2 (Definition):**
<p>A <strong>superheterodyne receiver</strong> converts the received radio frequency (RF) to a fixed intermediate frequency (IF) for amplification and detection. Stages: antenna → RF amplifier → mixer (combines signal with local oscillator) → IF amplifier → demodulator → audio amplifier. <strong>Image frequency:</strong> a station at f_signal + 2f_IF also produces 455 kHz at the mixer — a source of interference that the RF stage must reject. <strong>Selectivity:</strong> determined by IF filter bandwidth. <strong>Sensitivity:</strong> the weakest signal that can be received, typically a few microvolts. The superheterodyne principle applies to AM, FM, television, radar, and satellite receivers — virtually all radio receivers use it.</p>

**Floor 3 (In action):**
<p>The superheterodyne is the most successful circuit architecture in the history of electronics. Every AM/FM radio, every TV tuner, every WiFi receiver, every mobile phone, and every GPS receiver uses a variant of Armstrong's 1918 design. The frequencies change — a Bluetooth receiver downconverts 2.4 GHz to a few MHz IF — but the principle is identical. Software-defined radio (SDR) does the mixing and filtering in digital signal processing rather than analogue hardware, but the superheterodyne concept remains. Armstrong's invention was so fundamental that the US Patent Office declared it one of the most important patents in radio history.</p>

**Image prompt:** A chalk diagram of the superheterodyne receiver. Stages: antenna → RF amp → mixer ← local oscillator → IF amp (455 kHz) → detector → audio amp → speaker. The frequency conversion: f_signal + f_LO → f_IF = 455 kHz. Image frequency at f_signal + 2f_IF shown as interference. Chalk on dark green board. Square 1:1.


## BB-NEW-752 — Radar: radio waves that see

**Subject:** physics | **Topic:** electricity | **Concept:** radar; pulse-timing; echo-ranging; Doppler-radar | **Ground:** g2 | **Builds on:** [BB-NEW-751, BB-NEW-732, BB-NEW-728]

**Floor 0 (Idea):**
<p>Radar — Radio Detection and Ranging — sends out a short pulse of radio waves and listens for the echo. The time delay tells you the distance; the Doppler shift tells you the speed; the antenna direction tells you the bearing. A radar set is a superheterodyne receiver mated to a powerful transmitter and a precise clock, and it can see planes 300 km away in total darkness.</p>

**Floor 1 (Concrete):**
<p>A radar transmits a 1 µs pulse at 3 GHz (λ = 10 cm). The pulse travels at c = 3 × 10⁸ m/s. An echo returns 200 µs after transmission. Round trip: the signal travelled for 200 µs → distance = c × t/2 = 3×10⁸ × 100×10⁻⁶ = 30,000 m = 30 km. The factor of 2 accounts for the round trip. Range resolution: the ability to separate two targets = c × τ/2, where τ is pulse width. For τ = 1 µs: resolution = 3×10⁸ × 10⁻⁶/2 = 150 m. Shorter pulses = finer resolution but less energy per pulse. Pulse repetition frequency (PRF): typically 1000 Hz (1000 pulses/second). Maximum unambiguous range = c/(2 × PRF) = 3×10⁸/(2000) = 150 km.</p>

**Floor 2 (Definition):**
<p><strong>Radar</strong> transmits electromagnetic pulses and analyses the echoes. Key parameters: range R = ct/2 (t = round-trip time), range resolution = cτ/2 (τ = pulse width), maximum unambiguous range R_max = c/(2 × PRF). <strong>Radar equation:</strong> P_received = P_transmitted × G²λ²σ/((4π)³R⁴), where G is antenna gain, σ is target radar cross-section (m²). The 1/R⁴ dependence (R² out, R² back) means doubling the range requires 16× the power. <strong>Doppler radar:</strong> measures velocity from frequency shift f_d = 2v/λ. <strong>CW radar:</strong> continuous transmission, uses Doppler for speed measurement (police radar). <strong>Phased-array radar:</strong> electronically steered beam, no moving antenna.</p>

**Floor 3 (In action):**
<p>Radar was the secret weapon of WWII. British Chain Home radar detected incoming Luftwaffe raids, giving Fighter Command critical minutes to scramble. The cavity magnetron (invented 1940) produced powerful microwave pulses, making airborne radar and precision navigation possible. Today: air traffic control radar tracks thousands of flights; weather radar maps precipitation; police radar guns measure vehicle speed; ground-penetrating radar finds pipes and archaeological remains; satellite radar (SAR) maps Earth's surface through clouds. The radar equation's 1/R⁴ dependence is brutal — stealth aircraft reduce σ from ~100 m² to ~0.001 m², making detection range 10–20× shorter. Bats use ultrasonic "radar" — their chirps are frequency-modulated pulses, and their brains process the echoes with exquisite precision.</p>

**Image prompt:** A chalk drawing of a radar set: rotating antenna emitting a pulse (curved wavefront). The pulse travelling to an aircraft and back. Timeline showing transmitted pulse and received echo 200 µs later. Range R = ct/2. The radar equation. Doppler shift for speed measurement. Chalk on dark green board. Square 1:1.


## BB-NEW-753 — The electromagnetic spectrum: from radio to gamma rays

**Subject:** physics | **Topic:** electricity | **Concept:** electromagnetic-spectrum; frequency-bands; wavelength-ranges; applications | **Ground:** g0 | **Builds on:** [BB-NEW-526, BB-NEW-530, BB-NEW-749]

**Floor 0 (Idea):**
<p>Radio waves, microwaves, infrared, visible light, ultraviolet, X-rays, and gamma rays are all the same thing — electromagnetic waves — differing only in frequency and wavelength. They are all produced by accelerating charges, they all travel at c in vacuum, and the only thing that changes is how they interact with matter. The spectrum spans 20 orders of magnitude in frequency.</p>

**Floor 1 (Concrete):**
<p>The electromagnetic spectrum, from lowest to highest frequency:</p>
<p>• <strong>Radio:</strong> 3 kHz–300 MHz, λ = 100 km–1 m. AM broadcast (530–1700 kHz), FM broadcast (88–108 MHz), TV (54–806 MHz), shortwave (3–30 MHz, bounces off ionosphere).</p>
<p>• <strong>Microwaves:</strong> 300 MHz–300 GHz, λ = 1 m–1 mm. WiFi (2.4/5 GHz), mobile phones (700 MHz–2.6 GHz), radar (1–100 GHz), microwave ovens (2.45 GHz — water molecules resonate).</p>
<p>• <strong>Infrared:</strong> 300 GHz–400 THz, λ = 1 mm–750 nm. Heat lamps, remote controls, thermal imaging, fibre optics.</p>
<p>• <strong>Visible:</strong> 400–800 THz, λ = 750–380 nm. Violet (380 nm) through red (750 nm). This tiny sliver is all our eyes can see.</p>
<p>• <strong>Ultraviolet:</strong> 800 THz–30 PHz, λ = 380–10 nm. Sunburn, sterilisation, fluorescence, astronomy.</p>
<p>• <strong>X-rays:</strong> 30 PHz–30 EHz, λ = 10–0.01 nm. Medical imaging, crystallography, airport security.</p>
<p>• <strong>Gamma rays:</strong> >30 EHz, λ < 0.01 nm. Nuclear decay, cancer therapy, astrophysics.</p>

**Floor 2 (Definition):**
<p>All EM waves are oscillating electric and magnetic fields propagating at c = 3×10⁸ m/s in vacuum. Wavelength × frequency = c. The energy per photon: E = hf = hc/λ. Radio: low energy (μeV), harmless. UV: high enough to break chemical bonds (eV). X-ray/gamma: keV–MeV, ionising — damage DNA. The boundaries between bands are conventional, not physical. The atmosphere is transparent to visible light and radio waves, largely opaque to UV, X-rays, and much of the infrared (due to water vapour absorption). This "atmospheric window" is why optical and radio astronomy are ground-based; X-ray and gamma-ray astronomy require space telescopes.</p>

**Floor 3 (In action):**
<p>The electromagnetic spectrum is the backbone of modern technology. Your smartphone uses at least six bands simultaneously: cellular (700 MHz–2.6 GHz), WiFi (2.4/5 GHz), Bluetooth (2.4 GHz), GPS (1.2/1.5 GHz), NFC (13.56 MHz), and the screen emits visible light. All coexist because they use different frequencies. The reason your microwave doesn't interfere with WiFi (both at 2.4 GHz) is that the microwave's metal case acts as a Faraday cage. The quietest radio band in nature is 1.4 GHz — the frequency of hydrogen's 21 cm line, protected by international agreement for radio astronomy; SETI searches this band for alien civilisations.</p>

**Image prompt:** A chalk drawing of the electromagnetic spectrum as a long horizontal bar from 10³ to 10²² Hz. Bands labelled: Radio, Microwave, IR, Visible (rainbow wedge), UV, X-ray, Gamma. Below each: typical wavelengths and applications. Equation: c = fλ. Atmospheric opacity curve showing windows. Chalk on dark green board. Square 1:1.


## BB-NEW-754 — The applied electricity toolkit

**Subject:** physics | **Topic:** electricity | **Concept:** applied-electricity-summary; batteries-circuits-radio-synthesis | **Ground:** g1 | **Builds on:** [BB-NEW-740 through BB-NEW-753]

**Floor 0 (Idea):**
<p>After 15 BBs of applied electricity, here is the unified picture. From a lemon battery to a radar set, the same principles govern: chemical energy converts to electrical energy (batteries), electrical energy drives chemical reactions (electrolysis), AC power depends on the phase between voltage and current, resonance selects one frequency among thousands, and electromagnetic waves carry information across oceans and into space.</p>

**Floor 1 (Concrete):**
<p>Identify the principles at work:</p>
<p>1. AA battery: Zn + MnO₂ chemistry → 1.5 V EMF. Capacity ~2500 mAh alkaline.</p>
<p>2. Car battery: Pb + PbO₂ + H₂SO₄ ⇌ 2PbSO₄ + 2H₂O. Rechargeable. 12.6 V, 60 Ah.</p>
<p>3. Electroplating: Faraday's laws — m = (M/n)(Q/F). 1.18 g Cu from 2 A for 30 min.</p>
<p>4. AC socket: V_rms = 230 V = V_peak/√2. f = 50 Hz. 325 V peak.</p>
<p>5. Radio tuner: series RLC resonance — f₀ = 1/(2π√(LC)). Q = X_L/R selects one station.</p>
<p>6. FM radio: frequency modulation — BW = 2(Δf + f_max) = 180 kHz. Noise-immune.</p>
<p>7. Radar: R = ct/2. 30 km from 200 µs echo. 1/R⁴ power falloff.</p>
<p>8. EM spectrum: radio → microwave → IR → visible → UV → X-ray → gamma. All c = fλ.</p>

**Floor 2 (Definition):**
<p><strong>Applied electricity master principles:</strong></p>
<p>• <strong>Batteries:</strong> E_cell = E_cathode − E_anode. Primary (non-rechargeable) vs secondary (rechargeable).</p>
<p>• <strong>Electrolysis:</strong> m = (M/n)(Q/F). Faraday's constant F = 96,485 C/mol.</p>
<p>• <strong>AC circuits:</strong> V_rms = V_peak/√2. X_C = 1/(ωC), X_L = ωL. Z = √(R² + X²). f₀ = 1/(2π√(LC)).</p>
<p>• <strong>AC power:</strong> P = V_rms I_rms cos φ. S = V_rms I_rms. Q = V_rms I_rms sin φ.</p>
<p>• <strong>Modulation:</strong> AM (amplitude), FM (frequency). BW_AM = 2f_max, BW_FM = 2(Δf + f_max).</p>
<p>• <strong>Radar:</strong> R = ct/2. Resolution = cτ/2. Doppler shift f_d = 2v/λ.</p>
<p>• <strong>Superheterodyne:</strong> f_IF = |f_signal − f_LO|. Fixed IF amplification.</p>

**Floor 3 (In action):**
<p>This toolkit explains the electronic world. Your phone contains a lithium-ion battery (3.7 V, ~3000 mAh), a superheterodyne receiver for cellular and WiFi, a tiny speaker (electromagnetic transducer), and a capacitive touchscreen. It converts your voice to digital data, modulates it onto a GHz carrier, and transmits it to a tower kilometres away. The tower relays it through fibre optics (light waves) across continents. A century ago, none of this existed. Today, it's all applied electricity. The principles haven't changed since Faraday, Maxwell, and Tesla — but our ability to implement them at nanoscale has transformed every aspect of human life.</p>

**Image prompt:** A chalk drawing of a grand synthesis: a battery, an AC generator, a radio tower emitting waves, a radar screen with blips, the EM spectrum bar. The master table: EMF, Faraday's laws, RMS, reactance, resonance, modulation, radar equation. The arc from chemistry to communication. Chalk on dark green board. Square 1:1.
