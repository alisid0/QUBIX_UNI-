# Verma Volume 2 → Qubix BBs — Batch 7: Heat Transfer (15 BBs for review)

Below are 15 BBs drawn from **Chapter 28** of H.C. Verma's *Concepts of Physics, Volume 2*. These cover conduction, convection, and radiation — the three modes of heat transfer — in full quantitative detail.

**Already covered (don't duplicate):** BB-NEW-260 (temperature vs heat), BB-NEW-261 (temperature scales), BB-NEW-262 (thermal expansion), BB-NEW-263 (specific heat capacity Q=mcΔT), BB-NEW-264 (latent heat), BB-NEW-265 (calorimetry), BB-NEW-266 (kinetic model/states of matter), BB-NEW-267 (ideal gas model), BB-NEW-268 (Boyle/Charles/Gay-Lussac), BB-NEW-269 (PV=nRT), BB-NEW-270 (kinetic theory/RMS speed), BB-NEW-271 (first law ΔU=Q−W), BB-NEW-272 (thermodynamic processes), BB-NEW-273 (second law/entropy), BB-NEW-274 (Carnot engine).

**What's new here:** Fourier's law of conduction, thermal conductivity and its temperature dependence, thermal resistance in series/parallel, convection (natural/forced), Newton's law of cooling, Stefan-Boltzmann radiation law, black body radiation, Kirchhoff's law of radiation, Wien's displacement law, Prevost's theory of exchanges, solar constant, greenhouse effect, and combined-mode heat transfer.

---

## BB-NEW-520 — Conduction: heat moving through a material

**Subject:** physics | **Topic:** thermodynamics | **Concept:** thermal-conduction; Fouriers-law; temperature-gradient | **Ground:** g0 | **Builds on:** [BB-NEW-260, BB-NEW-263]

**Floor 0 (Idea):**
<p>Hold a metal spoon in hot tea. Within seconds, the handle is warm — but the tea didn't touch it. Heat travelled through the metal atom by atom, without the atoms themselves migrating. This is conduction: energy transfer through a material by molecular collisions and free-electron drift, driven purely by a temperature difference.</p>

**Floor 1 (Concrete):**
<p>A copper rod 0.50 m long, cross-section 2.0 × 10⁻⁴ m², has one end in boiling water (100 °C) and the other in ice (0 °C). In steady state, heat flows at a constant rate. Copper's thermal conductivity k ≈ 401 W/m·K. dQ/dt = kA(T_hot − T_cold)/L = 401 × 2.0×10⁻⁴ × (100 − 0) / 0.50 = 16.0 W — 16 joules per second flow through the rod. If the rod were glass (k ≈ 1.0 W/m·K), the heat flow would be 0.04 W — 400 times slower. That's why saucepan handles are plastic or wood, not copper.</p>

**Floor 2 (Definition):**
<p><strong>Fourier's law of thermal conduction:</strong> dQ/dt = −kA (dT/dx). The rate of heat flow through a material is proportional to the cross-sectional area A and the temperature gradient dT/dx, with proportionality constant k — the <strong>thermal conductivity</strong> (W/m·K). The minus sign indicates heat flows from hot to cold. For a uniform slab of thickness L with faces at T₁ and T₂, the steady-state heat current is H = dQ/dt = kA(T₁ − T₂)/L. The SI unit of heat current is the watt (J/s). k is a material property: metals (high k, ~10–400) have free electrons that transport energy efficiently; insulators (low k, ~0.01–1) do not.</p>

**Floor 3 (In action):**
<p>Thermal conductivity explains why a tile floor feels colder than a carpet at the same temperature — tile (k ~ 1.5) conducts heat away from your foot faster than carpet (k ~ 0.04). It's why double-glazed windows trap a layer of stagnant air (k ≈ 0.026) between glass panes. It's why igloos work — compacted snow is a decent insulator. And it's why the heat shield of a spacecraft re-entering the atmosphere uses materials with extremely low k (like silica tiles on the Space Shuttle, which could be glowing white-hot on one side while cool enough to touch on the other). The temperature gradient across the tile can exceed 1000 °C over a few centimetres.</p>

**Image prompt:** A chalk drawing of a rod between hot reservoir (flame, T_hot) and cold reservoir (ice, T_cold). Heat flow H = dQ/dt arrows along the rod. Temperature profile drawn as a straight line sloping from T_hot to T_cold. Equation: H = kA(T_hot − T_cold)/L. Cross-section A and length L labelled. Chalk on dark green board. Square 1:1.


## BB-NEW-521 — Thermal conductivity: why metals feel cold

**Subject:** physics | **Topic:** thermodynamics | **Concept:** thermal-conductivity-values; free-electrons; Wiedemann-Franz | **Ground:** g1 | **Builds on:** [BB-NEW-520]

**Floor 0 (Idea):**
<p>Copper conducts heat 400 times better than glass, and 16,000 times better than air. The reason isn't density or atomic structure — it's free electrons. Metals have a sea of mobile electrons that can zip through the lattice, carrying energy from hot regions to cold regions at enormous speed.</p>

**Floor 1 (Concrete):**
<p>Thermal conductivities at room temperature (W/m·K): Diamond = 2200 (highest known — phonons, not electrons), Silver = 429, Copper = 401, Aluminium = 237, Iron = 80, Stainless steel = 15, Glass = 1.0, Water = 0.6, Wood = 0.1–0.2, Air = 0.026, Aerogel = 0.015 (lowest solid). Diamond's extraordinary k is due to its rigid lattice — vibrations (phonons) travel with little scattering. Copper and silver owe their high k to free electrons — the same electrons that make them excellent electrical conductors. The Wiedemann-Franz law states k/σT = constant (Lorenz number ≈ 2.44 × 10⁻⁸ W·Ω/K²) for metals.</p>

**Floor 2 (Definition):**
<p><strong>Thermal conductivity k</strong> is the rate of heat flow per unit area per unit temperature gradient. Units: W/m·K. For a given ΔT, the heat current H ∝ k. Good conductors have k > 10; insulators have k < 1. In metals, heat is carried primarily by free electrons (~95%); in insulators, by lattice vibrations (phonons). k generally depends on temperature — for pure metals, k decreases with increasing T (electron-phonon scattering increases). For insulators, k may increase with T (phonon population increases). The <strong>thermal diffusivity</strong> α = k/ρc_p (m²/s) measures how quickly a material adjusts to temperature changes — high α means fast thermal response.</p>

**Floor 3 (In action):**
<p>The choice of k drives engineering across every temperature extreme. Diamond's record k (five times copper) makes it ideal for heat-spreading in high-power electronics — synthetic diamond substrates cool laser diodes and microwave transistors. Liquid sodium (k ≈ 70) is used as a coolant in fast breeder nuclear reactors because it conducts heat brilliantly while remaining liquid at high temperature. At the cold extreme, aerogel (k ≈ 0.015, the world's best solid insulator) was used on the Mars rovers to protect electronics from Martian nights at −80 °C. The human body exploits k too: fat has k ≈ 0.2 (insulates), muscle has k ≈ 0.5, and blood circulation actively redistributes heat — conduction alone can't explain body temperature regulation.</p>

**Image prompt:** A chalk drawing of a bar chart comparing thermal conductivities: Diamond (2200 — far tallest bar), Silver (429), Copper (401), Aluminium (237), Iron (80), Glass (1.0), Wood (0.15), Air (0.026). Two mechanisms illustrated beside: free electrons (small dots with arrows) for metals, lattice vibrations (wiggly lines) for insulators. Wiedemann-Franz: k/σT = L denoted. Chalk on dark green board. Square 1:1.


## BB-NEW-522 — Steady-state conduction through a slab

**Subject:** physics | **Topic:** thermodynamics | **Concept:** steady-state-conduction; temperature-profile; linear-gradient | **Ground:** g0 | **Builds on:** [BB-NEW-520]

**Floor 0 (Idea):**
<p>When one side of a wall is held at a constant hot temperature and the other at a constant cold temperature, a steady state develops. The temperature inside the wall drops linearly from hot to cold, and heat flows at a constant rate. The wall doesn't warm up or cool down — it's in thermal equilibrium with the flow passing through it.</p>

**Floor 1 (Concrete):**
<p>A brick wall 0.30 m thick (k = 0.70 W/m·K) separates a room at 20 °C from outside air at 0 °C. Wall area = 12 m². Heat current: H = kA(T_in − T_out)/L = 0.70 × 12 × (20 − 0) / 0.30 = 560 W. That's the power of about 9 old-style 60 W bulbs — continuously. Over 24 hours: Q = 560 × 86400 = 48.4 MJ ≈ 13.4 kWh. At ₹8/kWh, that's about ₹107 per day just through one wall. The temperature at any distance x from the hot face: T(x) = T_hot − (T_hot − T_cold)(x/L). At x = 0.10 m (one-third through): T = 20 − 20 × (0.10/0.30) = 13.3 °C.</p>

**Floor 2 (Definition):**
<p>In <strong>steady-state conduction</strong>, the temperature at each point in the medium is constant in time (∂T/∂t = 0). For a uniform slab, the heat equation ∇²T = 0 reduces to d²T/dx² = 0, giving a <strong>linear temperature profile</strong>: T(x) = T_hot − (T_hot − T_cold)(x/L). The heat current H = dQ/dt is constant throughout the slab — no energy accumulates. For a <em>composite slab</em> (layers of different materials in series), H is the same through each layer (like current in a series circuit), and the temperature drops are proportional to each layer's thermal resistance.</p>

**Floor 3 (In action):**
<p>Steady-state conduction is the design principle behind every building wall, oven door, and refrigerator cabinet. The linear temperature profile means you can measure the temperature on each side of a wall and calculate the heat loss without knowing anything about the inside — a thermal camera reading the inside wall surface temperature tells you exactly how much heat is escaping. Building codes specify maximum U-values (U = k/L for a single layer, the inverse of thermal resistance) — a typical UK external wall must achieve U < 0.30 W/m²·K, which typically requires cavity insulation. The steady-state assumption holds for long-term average heat loss, though real weather creates transient conditions.</p>

**Image prompt:** A chalk drawing of a wall cross-section. Left face at T_hot (20 °C), right face at T_cold (0 °C). Inside the wall: a straight line temperature profile dropping from 20 to 0. Heat current arrows H flowing left to right. Equation: H = kA(T_hot − T_cold)/L. The temperature at x from hot face: T(x) = T_hot − (ΔT)(x/L). Chalk on dark green board. Square 1:1.


## BB-NEW-523 — Thermal resistance: series and parallel layers

**Subject:** physics | **Topic:** thermodynamics | **Concept:** thermal-resistance; R-value; series-and-parallel-conductors | **Ground:** g1 | **Builds on:** [BB-NEW-522]

**Floor 0 (Idea):**
<p>Heat flowing through a wall is like current flowing through a resistor. Each layer has a thermal resistance R = L/kA. Stack layers in series and their resistances add (like series resistors). Place them side by side and the conductances add (like parallel resistors). The analogy makes composite wall calculations trivial.</p>

**Floor 1 (Concrete):**
<p>A wall has three layers in series: brick (L₁ = 0.10 m, k₁ = 0.70), fibreglass insulation (L₂ = 0.08 m, k₂ = 0.040), plasterboard (L₃ = 0.012 m, k₃ = 0.17). Area = 12 m². Compute resistances: R₁ = 0.10/(0.70×12) = 0.0119 K/W, R₂ = 0.08/(0.04×12) = 0.1667 K/W, R₃ = 0.012/(0.17×12) = 0.0059 K/W. Total R_series = 0.1845 K/W. For ΔT = 20 °C: H = ΔT/R = 20/0.1845 = 108 W — far less than the 560 W through bare brick. The temperature drop across the insulation alone: ΔT₂ = H × R₂ = 108 × 0.1667 = 18.0 °C — nearly the entire drop. Insulation dominates.</p>

**Floor 2 (Definition):**
<p><strong>Thermal resistance</strong> R_th = L/kA (units: K/W). For series layers: R_eq = R₁ + R₂ + R₃ + ... — same heat current through each. The temperature drop across layer i: ΔT_i = H × R_i. For parallel paths (e.g., a wall with a window): 1/R_eq = 1/R₁ + 1/R₂ + ... — same ΔT across each, heat currents add. The <strong>R-value</strong> used in construction is R_th per unit area (m²·K/W). The <strong>U-value</strong> = 1/(R-value) = heat transfer coefficient (W/m²·K). Lower U-value = better insulation. The analogy is exact: ΔT ↔ voltage, H ↔ current, R_th ↔ electrical resistance — but note that thermal "charge" (heat) is not conserved the way electric charge is.</p>

**Floor 3 (In action):**
<p>The thermal resistance model is how every building's energy efficiency is calculated. A typical wall might have R-value = 4.0 m²·K/W (U = 0.25); a triple-glazed window, R ≈ 0.7 (U = 1.4) — windows are always the thermal weak point. The "thermal bridge" problem occurs when a high-conductivity material (like a steel beam) bypasses the insulation, creating a low-resistance parallel path. In electronics, thermal resistance is the standard way to specify heatsinks: a heatsink rated at 5 °C/W means a 10 W chip will run 50 °C above ambient. The CPU cooler in your computer is a series-parallel thermal circuit: die → thermal paste (R_tim) → heatsink (R_sink) → air, possibly with a heat pipe acting as a very-low-resistance bridge.</p>

**Image prompt:** A chalk drawing of a composite wall with three layers: brick (thin), insulation (thick), plasterboard (very thin). The temperature profile is a segmented line — steep drop across insulation, shallow drops across brick and plaster. Below: the equivalent thermal circuit — three resistors in series, labelled R₁, R₂, R₃. H = ΔT/(R₁+R₂+R₃). Chalk on dark green board. Square 1:1.


## BB-NEW-524 — Convection: heat carried by moving fluid

**Subject:** physics | **Topic:** thermodynamics | **Concept:** convection; natural-convection; forced-convection; buoyancy | **Ground:** g0 | **Builds on:** [BB-NEW-520, BB-NEW-260]

**Floor 0 (Idea):**
<p>Conduction can't explain why a radiator heats a whole room — air is a terrible conductor (k ≈ 0.026). The real mechanism is convection: warm fluid expands, becomes less dense, rises, and carries heat with it. The fluid <em>moves</em>, transporting energy far faster than conduction through the same material ever could.</p>

**Floor 1 (Concrete):**
<p>A room radiator at 60 °C in a room at 20 °C. Natural convection: air touching the radiator warms up, expands (density drops from ~1.2 to ~1.1 kg/m³), and buoyancy drives it upward. Typical natural convection speed: ~0.1–0.5 m/s. The heat transfer coefficient for natural convection in air: h ≈ 5–25 W/m²·K. For forced convection (a fan blowing air at 2 m/s): h ≈ 25–100 W/m²·K — roughly 5× more effective. A 1 m² radiator panel at ΔT = 40 °C with h = 10 releases about H = hAΔT = 10 × 1 × 40 = 400 W by convection — plus another ~250 W by radiation.</p>

**Floor 2 (Definition):**
<p><strong>Convection</strong> is heat transfer by the bulk movement of fluid (liquid or gas). In <strong>natural (free) convection</strong>, fluid motion is driven by buoyancy forces from density differences caused by temperature gradients. In <strong>forced convection</strong>, external means (fan, pump, wind) drive the fluid flow. The heat transfer rate is H = hA(T_surface − T_fluid), where h is the <strong>convective heat transfer coefficient</strong> (W/m²·K). h depends on fluid properties (k, viscosity, density, specific heat), flow velocity, and geometry — it's not a pure material constant. The <strong>Nusselt number</strong> Nu = hL/k quantifies the enhancement of heat transfer by convection over pure conduction.</p>

**Floor 3 (In action):**
<p>Convection shapes weather, climate, and engineering. The Earth's entire atmospheric circulation — trade winds, jet streams, monsoons — is convection on a planetary scale: the equator is heated, air rises, flows poleward, cools, and sinks. Ocean currents (thermohaline circulation) are convective on a millennium timescale. In a car engine, forced convection (water pump + radiator fan) removes ~30 kW of waste heat. In a laptop, a tiny fan forces air through finned heat pipes — without forced convection, the CPU would hit 100 °C in seconds. Cooking uses both modes: boiling water (natural convection distributes heat), a convection oven (fan-forced, cooks faster). Even the "wind chill" factor is a convection effect — moving air strips heat from your skin faster than still air.</p>

**Image prompt:** A chalk drawing of a radiator with wavy arrows showing air rising (natural convection). Cool air sinks on the far side of the room, forming a convection cell (circular loop). A second panel shows forced convection: a fan blowing air across a heated surface. Equation: H = hA(T_s − T_f). The convection current in a beaker of heated water also shown (dye streaks rising). Chalk on dark green board. Square 1:1.


## BB-NEW-525 — Newton's law of cooling

**Subject:** physics | **Topic:** thermodynamics | **Concept:** newtons-law-of-cooling; exponential-decay; rate-proportional-to-deltaT | **Ground:** g0 | **Builds on:** [BB-NEW-524, BB-NEW-260]

**Floor 0 (Idea):**
<p>A hot cup of tea cools faster when it's very hot than when it's just warm. Newton's law of cooling states that the rate of heat loss is proportional to the temperature difference between the object and its surroundings. The bigger the gap, the faster the cool-down.</p>

**Floor 1 (Concrete):**
<p>A cup of tea at 90 °C in a room at 20 °C. Newton's law: dT/dt = −k(T − T_surroundings). If T drops from 90 °C to 70 °C in 5.0 minutes, we can find k: ln[(T₁−T_s)/(T₂−T_s)] = k t → ln[(90−20)/(70−20)] = k×5 → ln(70/50) = 0.3365 = 5k → k = 0.0673 min⁻¹. Time to cool from 70 °C to 50 °C: ln[(70−20)/(50−20)] = 0.0673×t → ln(50/30) = 0.5108 = 0.0673t → t = 7.6 min. It takes longer to drop the next 20 °C because ΔT is smaller. Time to reach 30 °C (barely warm): ln[(90−20)/(30−20)] = ln(7) = 1.946 = 0.0673t → t = 28.9 min.</p>

**Floor 2 (Definition):**
<p><strong>Newton's law of cooling:</strong> The rate of heat loss from a body is proportional to the difference between its temperature and the ambient temperature: dQ/dt = −hA(T − T_s), where h is the heat transfer coefficient and A is surface area. In terms of temperature (assuming uniform internal temperature — small Biot number): dT/dt = −k(T − T_s). This is a first-order linear differential equation with solution T(t) = T_s + (T₀ − T_s)e^(−kt), where k = hA/mc. The temperature decays exponentially toward ambient. The law holds for moderate temperature differences (up to ~50–80 °C) where radiation is not dominant and h is approximately constant.</p>

**Floor 3 (In action):**
<p>Newton's law of cooling is why you blow on hot soup — forced convection increases h, making k larger, cooling faster. It's why a corpse's temperature is used to estimate time of death (forensic thanatology: the body cools exponentially toward ambient, with k depending on body mass, clothing, and environment). It's the principle behind every cooling fin and heatsink. The exponential behavior means that "how long to cool completely" is technically infinite — but in practice, reaching within 1% of ambient takes about 4.6/k. The law also explains why small animals lose heat faster than large ones — higher surface-to-volume ratio means larger k (hA/mc is larger when A/m is larger). A mouse must eat constantly to maintain body temperature; an elephant can go much longer.</p>

**Image prompt:** A chalk drawing of a cooling curve: temperature on y-axis, time on x-axis. The curve starts at T₀, drops steeply, then approaches T_s (ambient, dashed horizontal line) asymptotically. The exponential equation T(t) = T_s + (T₀−T_s)e^(−kt). Three time points marked with the ΔT at each. A cup with steam shown at t = 0. Chalk on dark green board. Square 1:1.


## BB-NEW-526 — Thermal radiation: light you can feel but can't see

**Subject:** physics | **Topic:** thermodynamics | **Concept:** thermal-radiation; electromagnetic-spectrum; infrared | **Ground:** g0 | **Builds on:** [BB-NEW-520, BB-NEW-260]

**Floor 0 (Idea):**
<p>Hold your hand near a hot stove — you feel warmth even without touching it and even if the air between is cool. That's thermal radiation: electromagnetic waves emitted by every object above absolute zero. Conduction and convection need matter; radiation travels through vacuum at the speed of light.</p>

**Floor 1 (Concrete):**
<p>Every object radiates. A human body at 310 K (37 °C) emits mostly in the infrared, peaking around λ_max ≈ 9.3 µm. Total radiated power from skin (ε ≈ 0.97, A ≈ 1.8 m²): P = εσAT⁴ = 0.97 × 5.67×10⁻⁸ × 1.8 × (310)⁴ ≈ 890 W. That's nearly 900 W — but you also absorb radiation from surroundings at ~20 °C (293 K), P_absorb ≈ 0.97 × 5.67×10⁻⁸ × 1.8 × (293)⁴ ≈ 710 W. Net loss ≈ 180 W — close to the resting metabolic rate. The Sun at 5778 K emits mostly in the visible (λ_max ≈ 500 nm, yellow-green), with total power P = εσAT⁴ ≈ 3.85 × 10²⁶ W.</p>

**Floor 2 (Definition):**
<p><strong>Thermal radiation</strong> is electromagnetic radiation emitted by matter due to its temperature. All bodies at T > 0 K radiate. The spectrum and intensity depend on temperature and surface properties. The total power radiated per unit area by a <strong>black body</strong> (perfect emitter) is given by the <strong>Stefan-Boltzmann law:</strong> P/A = σT⁴, where σ = 5.670 × 10⁻⁸ W/m²·K⁴. For a real surface: P/A = εσT⁴, where ε (0 ≤ ε ≤ 1) is the <strong>emissivity</strong> — a black surface has ε close to 1, a shiny metal surface has ε close to 0. Radiation covers all wavelengths; the distribution peaks at a wavelength that depends on temperature (Wien's law).</p>

**Floor 3 (In action):**
<p>Thermal radiation is why the night sky cools the ground faster on clear nights than cloudy ones — clouds radiate infrared back down; clear space doesn't (effective temperature ~3 K). It's how thermal cameras (infrared imaging) see in total darkness. Buildings in hot climates are painted white (low ε for solar radiation, high ε in the infrared for cooling). The vacuum flask (thermos) works by blocking all three modes: the vacuum between double walls stops conduction and convection; the silvered surfaces (low ε) reflect radiation. In space, radiation is the <em>only</em> way to dump waste heat — the ISS has large radiator panels that face deep space, emitting infrared to maintain thermal balance in an environment where conduction and convection are impossible.</p>

**Image prompt:** A chalk drawing of a hot object radiating wavy arrows outward (thermal radiation). The electromagnetic spectrum shown from gamma to radio, with the visible band tiny and the infrared band wide. Two curves: one for T = 5778 K (Sun, peaked in visible), one for T = 310 K (human, peaked in IR). Equation: P = εσAT⁴. Chalk on dark green board. Square 1:1.


## BB-NEW-527 — The Stefan-Boltzmann law: P ∝ T⁴

**Subject:** physics | **Topic:** thermodynamics | **Concept:** Stefan-Boltzmann-law; T^4-dependence; radiative-power | **Ground:** g1 | **Builds on:** [BB-NEW-526]

**Floor 0 (Idea):**
<p>The total power radiated by a hot object is not proportional to its temperature, or even to T² — it's proportional to T⁴. Double the absolute temperature, and the radiated power increases sixteenfold. This extraordinary sensitivity to temperature makes thermal radiation the dominant mode of heat transfer at high temperatures.</p>

**Floor 1 (Concrete):**
<p>Stefan-Boltzmann: P = εσAT⁴. Compare three objects, each with A = 1 m², ε = 1:</p>
<p>• At 300 K (27 °C, warm day): P = 5.67×10⁻⁸ × 1 × (300)⁴ = 459 W — about half a kilowatt, all in the infrared.</p>
<p>• At 1000 K (727 °C, red-hot iron): P = 5.67×10⁻⁸ × 1 × (1000)⁴ = 56,700 W — 56.7 kW. Glowing visibly red because the spectral peak has shifted into the visible.</p>
<p>• At 5778 K (Sun's surface): P = 5.67×10⁻⁸ × 1 × (5778)⁴ = 63.2 MW per square metre. A square metre of the Sun's surface radiates over 60 megawatts — roughly the output of a small power station.</p>
<p>The T⁴ scaling means the ratio of power at 1000 K vs 300 K is (1000/300)⁴ = 3.33⁴ ≈ 123× — not 3.33×.</p>

**Floor 2 (Definition):**
<p>The <strong>Stefan-Boltzmann law</strong> states that the total radiant exitance (power per unit area) of a black body is M = σT⁴, where σ = 2π⁵k⁴/(15h³c²) = 5.670374419 × 10⁻⁸ W/m²·K⁴. For a real (grey) body: M = εσT⁴. The law is derived by integrating Planck's spectral radiance distribution over all wavelengths. The emissivity ε is a function of wavelength and surface condition but is often approximated as constant (grey body assumption). The net radiative heat transfer between a body at T and surroundings at T_s is P_net = εσA(T⁴ − T_s⁴). For small ΔT = T − T_s, this linearises to P_net ≈ 4εσAT_s³ΔT — resembling Newton's cooling but with a ΔT-dependent coefficient.</p>

**Floor 3 (In action):**
<p>The T⁴ law has dramatic consequences. A steel billet at 1200 °C radiates about 200 kW/m² — foundry workers wear reflective suits not for conduction but for radiation. The tungsten filament in an incandescent bulb operates at ~2700 K, radiates mostly in the infrared (~90%), and only ~10% as visible light — which is why they're inefficient and hot. The Sun's T⁴ output is the Earth's primary energy source: 1361 W/m² at the top of the atmosphere (the solar constant). The Earth's equilibrium temperature (~255 K without greenhouse, ~288 K with) is set by balancing absorbed solar radiation (∝ T_Sun⁴ × (R_Sun/r_orbit)²) against outgoing terrestrial radiation (∝ T_Earth⁴). Because of T⁴, small changes in Earth's effective temperature correspond to large changes in radiative balance.</p>

**Image prompt:** A chalk drawing of three objects at different temperatures: warm plate (300 K, dull red glow), red-hot iron (1000 K, bright red glow), the Sun (5778 K, brilliant white-yellow). Power radiated labelled beneath each: 459 W, 56.7 kW, 63.2 MW (per m²). The T⁴ relationship shown as a dramatic curve: P-axis shoots up as T increases. Chalk on dark green board. Square 1:1.


## BB-NEW-528 — Black body radiation: the perfect emitter

**Subject:** physics | **Topic:** thermodynamics | **Concept:** black-body; absorptivity; emissivity; cavity-radiation | **Ground:** g2 | **Builds on:** [BB-NEW-526, BB-NEW-527]

**Floor 0 (Idea):**
<p>A perfect black body absorbs 100% of all radiation that hits it, at every wavelength. It's also the perfect <em>emitter</em> — for any given temperature, no real surface can radiate more powerfully than a black body. A small hole in a hollow cavity is the closest we can get to this ideal, which is why furnace operators see a blindingly bright opening.</p>

**Floor 1 (Concrete):**
<p>Imagine a hollow cavity heated uniformly to 1500 K. The interior walls are rough, so any radiation entering the cavity undergoes multiple reflections, each time being partially absorbed. A small hole in the cavity wall acts as a near-perfect black body (ε ≈ 0.999). Radiation escaping through the hole has the black-body spectrum for 1500 K, regardless of what the walls are made of — copper, graphite, or brick all produce identical radiation if the cavity is in thermal equilibrium. This is how black-body radiation was experimentally studied in the late 19th century, leading to Planck's quantum hypothesis. The walls can be any material; the cavity geometry ensures the radiation field depends only on T, not on surface properties.</p>

**Floor 2 (Definition):**
<p>A <strong>black body</strong> is an idealised object that absorbs all incident electromagnetic radiation (α = 1 at all wavelengths) and, by Kirchhoff's law, is also the most efficient possible thermal emitter (ε = 1 at all wavelengths). <strong>Absorptivity</strong> α(λ) is the fraction of incident radiation at wavelength λ that is absorbed. <strong>Emissivity</strong> ε(λ) is the ratio of radiant power emitted at λ to that of a black body at the same T. For any body in thermal equilibrium: α(λ) = ε(λ) — good absorbers are good emitters. A <strong>grey body</strong> has constant ε < 1 across all wavelengths. A <strong>cavity radiator</strong> (hohlraum) approximates a black body by trapping radiation through multiple internal reflections.</p>

**Floor 3 (In action):**
<p>The black-body concept underlies the entire history of quantum mechanics. Planck's successful derivation of the black-body spectrum (1900) required the radical assumption that energy is quantised — E = hν — the birth of quantum theory. In practice: the cosmic microwave background (CMB) is the most perfect black-body spectrum ever measured (T = 2.725 K, deviations < 1 part in 10⁵). Solar radiation approximates a black body at 5778 K (though absorption lines — Fraunhofer lines — reveal the Sun's atmospheric composition). Infrared thermometers and thermal cameras assume the target is a grey body — a shiny metal surface (low ε) reads deceptively cool because it reflects cold-sky radiation rather than emitting its own. Furnace temperature measurement through a sight glass uses the cavity black-body principle: the hole radiates as if it were at furnace temperature even though the glass is cool.</p>

**Image prompt:** A chalk drawing of a hollow cavity with a small hole. A ray entering the hole bounces multiple times inside (zigzag path), each reflection partially absorbed. The hole emits a spectrum labelled "Black-body spectrum at T." The spectrum curve is shown — smooth, peaking at λ_max. Equation: emissivity ε = absorptivity α for each λ. Chalk on dark green board. Square 1:1.


## BB-NEW-529 — Kirchhoff's law of radiation: good absorber = good emitter

**Subject:** physics | **Topic:** thermodynamics | **Concept:** Kirchhoffs-law-of-radiation; absorptivity-equals-emissivity; thermal-equilibrium | **Ground:** g1 | **Builds on:** [BB-NEW-528]

**Floor 0 (Idea):**
<p>Dark clothes feel hotter in the sun than white clothes. That's not because they "attract" more heat — they absorb more radiation. But the same property that makes them good absorbers also makes them good emitters. At thermal equilibrium, a surface's absorptivity equals its emissivity at every wavelength. This is Kirchhoff's law, and it's a thermodynamic necessity.</p>

**Floor 1 (Concrete):**
<p>A black-painted plate (α ≈ 0.95) and a polished aluminium plate (α ≈ 0.10) are placed in sunlight (1000 W/m²). The black plate absorbs ~950 W/m²; the aluminium absorbs ~100 W/m². If both are initially at ambient temperature, the black plate heats up much faster. But once they reach equilibrium temperature, the black plate also <em>emits</em> more — at 350 K, the black plate radiates εσT⁴ ≈ 0.95 × 5.67×10⁻⁸ × (350)⁴ = 808 W/m², while the shiny plate radiates 0.10 × 5.67×10⁻⁸ × (350)⁴ = 85 W/m². Both reach equilibrium where P_absorbed = P_emitted. The black plate reaches a lower equilibrium temperature than you might guess because it's also radiating efficiently.</p>

**Floor 2 (Definition):**
<p><strong>Kirchhoff's law of thermal radiation:</strong> For an arbitrary body in thermal equilibrium, the spectral absorptivity α_λ equals the spectral emissivity ε_λ at every wavelength and for every direction: α_λ(λ,T) = ε_λ(λ,T). This is a consequence of the second law of thermodynamics — if α_λ ≠ ε_λ, you could construct a perpetual motion machine of the second kind. The law implies that a good absorber is necessarily a good emitter. A perfect reflector (α = 0) is a perfect non-emitter (ε = 0). The law holds at thermal equilibrium; under non-equilibrium conditions (e.g., a surface illuminated by a laser while the bulk material is cold), the equality does not strictly apply.</p>

**Floor 3 (In action):**
<p>Kirchhoff's law has practical consequences everywhere. Solar water heaters use selective surfaces — materials with high α in the visible (to absorb sunlight efficiently) but low ε in the infrared (to minimise re-radiation losses at the panel's operating temperature, ~350 K). This is possible because α and ε are equal <em>at each wavelength</em>, not integrated across the spectrum — the Sun's spectrum (peaked in visible) and the panel's thermal emission (peaked in IR) occupy different wavelength bands. Selective surfaces achieve α_visible ≈ 0.95 and ε_infrared ≈ 0.10 — a violation of Kirchhoff's law? No — α(visible) = ε(visible) and α(IR) = ε(IR) separately; the apparent discrepancy is just the different wavelength ranges being measured. The same principle keeps Earth habitable: the atmosphere is fairly transparent to visible sunlight but strongly absorbing in the thermal infrared — the greenhouse effect.</p>

**Image prompt:** A chalk drawing split into two panels. Left: a black surface absorbing sunlight (thick incoming arrows) and a shiny surface reflecting (bounce arrows). Right: the same black surface emitting thick IR arrows, shiny surface emitting thin IR arrows. Kirchhoff's law: α = ε at each λ. The selective surface diagram: high α in visible band, low ε in IR band. Chalk on dark green board. Square 1:1.


## BB-NEW-530 — Wien's displacement law: colour tells temperature

**Subject:** physics | **Topic:** thermodynamics | **Concept:** Wiens-displacement-law; lambda-max-T-constant; colour-temperature | **Ground:** g1 | **Builds on:** [BB-NEW-527, BB-NEW-528]

**Floor 0 (Idea):**
<p>A piece of iron in a forge glows dull red, then orange, then yellow-white as it gets hotter. The colour shift is Wien's displacement law in action: the peak wavelength of thermal radiation is inversely proportional to temperature. Hotter objects peak at shorter wavelengths — red → orange → yellow → white → blue.</p>

**Floor 1 (Concrete):**
<p>Wien's law: λ_max T = b = 2.898 × 10⁻³ m·K. For the Sun (T ≈ 5778 K): λ_max = 2.898×10⁻³ / 5778 = 5.01 × 10⁻⁷ m = 501 nm — blue-green, though the Sun appears yellow-white because of atmospheric scattering and the mix of wavelengths. For a human body (T = 310 K): λ_max = 2.898×10⁻³ / 310 = 9.35 × 10⁻⁶ m = 9.35 µm — deep infrared, invisible. For a red-hot iron at 1000 K: λ_max = 2898 nm (IR), but the tail of the spectrum extends into the visible red — hence "red-hot." At 1500 K: λ_max = 1932 nm (IR, but closer to visible — brighter red-orange). At 3000 K (incandescent bulb filament): λ_max = 966 nm (near-IR, with substantial visible emission).</p>

**Floor 2 (Definition):**
<p><strong>Wien's displacement law:</strong> The wavelength at which the spectral radiance of a black body is maximum is inversely proportional to temperature: λ_max = b/T, where b = 2.897771955 × 10⁻³ m·K (Wien's displacement constant). The law is derived from Planck's law by setting d/dλ of the spectral radiance to zero. It expresses the shift of the radiation spectrum toward shorter wavelengths with increasing temperature. Important: λ_max refers to the <em>wavelength</em> peak; there is also a frequency peak ν_max, and ν_max T ≠ b/c because the transformation between wavelength and frequency domains is nonlinear — ν_max = (5.879 × 10¹⁰ Hz/K) × T.</p>

**Floor 3 (In action):**
<p>Wien's law is the reason astronomers can measure the temperature of stars just by looking at their colour. A blue star like Rigel (λ_max ~ 240 nm, UV — but the visible tail looks blue) has T ≈ 12,000 K. A red star like Betelgeuse (λ_max ~ 830 nm, IR) has T ≈ 3500 K. The same principle lets an optical pyrometer measure furnace temperatures without contact: match the colour of a calibrated filament to the furnace glow and read off T. The cosmic microwave background (λ_max ≈ 1.06 mm) corresponds to T = 2.725 K — the afterglow of the Big Bang. Wien's law also explains why mammals (T ~ 310 K) can't emit visible light — the peak is at 9.4 µm, and the visible tail is ~10⁻¹⁷ of the total power. No mammal glows in the dark from body heat.</p>

**Image prompt:** A chalk drawing of spectral curves for three temperatures: 3000 K (peak in near-IR, red visible tail), 4500 K (peak in red), 5778 K (peak in green, Sun). The λ_max moves left as T increases. Wien's law: λ_max T = 2.898×10⁻³ m·K. A colour scale bar from red to blue showing the visual appearance at each T. Chalk on dark green board. Square 1:1.


## BB-NEW-531 — Prevost's theory of exchanges

**Subject:** physics | **Topic:** thermodynamics | **Concept:** Prevosts-theory-of-exchanges; radiative-equilibrium; dynamic-balance | **Ground:** g1 | **Builds on:** [BB-NEW-526, BB-NEW-527]

**Floor 0 (Idea):**
<p>Two bodies at the same temperature don't stop radiating — they keep radiating, but they also absorb each other's radiation at exactly the same rate. Thermal equilibrium by radiation is dynamic, not static. Every object is constantly emitting and absorbing; equilibrium means the two rates balance.</p>

**Floor 1 (Concrete):**
<p>A wall at 20 °C and a person at 37 °C face each other. The wall radiates P_wall = εσAT_wall⁴; the person radiates P_person = εσAT_person⁴. Both streams travel simultaneously. The net transfer is P_net = εσA(T_person⁴ − T_wall⁴). The person loses net energy because T_person > T_wall — but they still <em>receive</em> radiation from the wall (~710 W for a 1.8 m² person, as in BB 526). At equilibrium (T_person = T_wall), P_net = 0 — but each body is still radiating hundreds of watts. The radiation field doesn't vanish at equilibrium; it's just that the credit and debit columns of the energy ledger match exactly.</p>

**Floor 2 (Definition):**
<p><strong>Prevost's theory of exchanges</strong> (1791) states that all bodies radiate heat at all temperatures above absolute zero, regardless of their surroundings. A body's rate of emission depends only on its own temperature and surface properties, not on the temperature of its environment. Cooling occurs when emission exceeds absorption; heating when absorption exceeds emission. At thermal equilibrium, emission and absorption rates are equal, but <em>both processes continue</em>. This dynamic view was revolutionary — it replaced the caloric theory's idea of heat as a static fluid with the concept of continuous radiative exchange. Prevost's theory predates Maxwell and Planck but laid the conceptual foundation for all later radiation physics.</p>

**Floor 3 (In action):**
<p>Prevost's exchanges explain why you feel cold near a window in winter even if the room air is warm — your body (~310 K) radiates ~890 W, but the cold window (~5 °C, 278 K) radiates back only ~580 W. The net loss of ~310 W to that direction chills your skin. This is the "cold draft" sensation from windows — which isn't a draft at all (it happens even with perfectly sealed windows). The same principle means that radiant heating panels (warm ceilings or walls) can make a room feel comfortable at a lower air temperature — you absorb more radiation, so you lose less net heat. In space, astronauts on EVA experience extreme radiative asymmetry: the Sun-facing side absorbs ~1361 W/m² while the deep-space-facing side radiates to ~3 K — a net imbalance that the spacesuit's thermal control system must manage actively.</p>

**Image prompt:** A chalk drawing of two bodies at different temperatures facing each other. Arrows go both ways: hot body → cold body (thick arrow, "emission"), cold body → hot body (thin arrow, "emission"). Labels: P_hot = εσAT_hot⁴, P_cold = εσAT_cold⁴, P_net = εσA(T_hot⁴ − T_cold⁴). At equilibrium (T equal): equal-thickness arrows both ways, P_net = 0. Chalk on dark green board. Square 1:1.


## BB-NEW-532 — The solar constant and Earth's radiation budget

**Subject:** physics | **Topic:** thermodynamics | **Concept:** solar-constant; Earths-radiation-budget; radiative-equilibrium-temperature | **Ground:** g1 | **Builds on:** [BB-NEW-527, BB-NEW-526]

**Floor 0 (Idea):**
<p>1361 watts per square metre — that's the solar constant, the Sun's radiant power arriving at the top of Earth's atmosphere. It's the engine of every weather system, ocean current, and photosynthetic cell on the planet. And it lets us calculate Earth's temperature without a thermometer.</p>

**Floor 1 (Concrete):**
<p>The Sun radiates P_Sun = 3.85 × 10²⁶ W uniformly in all directions. At Earth's orbital distance (r = 1.496 × 10¹¹ m), this power is spread over a sphere of area 4πr². The solar constant S = P_Sun / 4πr² = 3.85×10²⁶ / (4π × (1.496×10¹¹)²) = 1361 W/m². Earth intercepts sunlight on its cross-sectional area πR² = π(6.37×10⁶)² = 1.275 × 10¹⁴ m². Total solar power intercepted: S × πR² = 1361 × 1.275×10¹⁴ = 1.735 × 10¹⁷ W (173,500 TW — about 10,000 times humanity's total power consumption). About 30% is reflected (albedo α ≈ 0.30), so absorbed power = (1 − α)SπR² = 1.215 × 10¹⁷ W.</p>

**Floor 2 (Definition):**
<p>The <strong>solar constant</strong> S = 1361 W/m² (± 0.5 W/m² over the 11-year solar cycle) is the total solar irradiance at the mean Earth-Sun distance, above the atmosphere, on a surface perpendicular to the Sun's rays. For <strong>radiative equilibrium</strong>, the Earth must emit as much power as it absorbs: (1 − α)SπR² = εσ(4πR²)T_eff⁴. This gives the <strong>effective radiating temperature:</strong> T_eff = [(1 − α)S / 4εσ]^(1/4). With α = 0.30 and ε = 1: T_eff = (0.70 × 1361 / (4 × 5.67×10⁻⁸))^(1/4) = (4.20×10⁹)^(1/4) ≈ 255 K = −18 °C. The actual average surface temperature is ~288 K (+15 °C). The 33 °C difference is the <strong>greenhouse effect</strong>.</p>

**Floor 3 (In action):**
<p>The Earth's radiation budget is monitored continuously by satellites (CERES, etc.). The numbers are staggering: Earth absorbs ~1.2 × 10¹⁷ W of solar power — equivalent to about 2 million large nuclear power plants. The delicate balance between incoming solar and outgoing terrestrial radiation sets the climate. A 1% change in albedo (from ice melt, deforestation, or cloud changes) alters the energy budget by ~3.4 W/m² globally — comparable to the radiative forcing from a doubling of CO₂ (~3.7 W/m²). The solar "constant" isn't perfectly constant — it varies by ~0.1% over the solar cycle, and by ~6.8% between perihelion (January, 1414 W/m²) and aphelion (July, 1321 W/m²). The seasons are driven by axial tilt, not by this distance variation, which is why perihelion coincides with Northern Hemisphere winter.</p>

**Image prompt:** A chalk drawing of the Sun (left) radiating in all directions. A spherical shell at Earth's orbit shows power spread over 4πr². Earth intercepts sunlight on its disc area πR², then radiates from its full sphere area 4πR². Energy balance: (1−α)SπR² = εσ4πR²T⁴. The 33 °C greenhouse gap shown between T_eff (−18 °C) and T_surface (+15 °C). Chalk on dark green board. Square 1:1.


## BB-NEW-533 — The greenhouse effect: physics, not politics

**Subject:** physics | **Topic:** thermodynamics | **Concept:** greenhouse-effect; selective-absorption; radiative-forcing | **Ground:** g1 | **Builds on:** [BB-NEW-532, BB-NEW-529]

**Floor 0 (Idea):**
<p>The Earth's surface is 33 °C warmer than its effective radiating temperature — warm enough for liquid water and life. The mechanism is the greenhouse effect: certain atmospheric gases are transparent to visible sunlight but absorb outgoing infrared radiation, trapping heat like a blanket. It's a physical fact, measurable and describable with the Stefan-Boltzmann law and Kirchhoff's law.</p>

**Floor 1 (Concrete):**
<p>Simple one-layer model: the atmosphere is a single isothermal layer at T_atm, transparent to solar radiation but completely absorbing in the thermal infrared. Solar power absorbed by the surface: (1 − α)S/4 = 238 W/m² (averaged over the globe). The surface radiates upward: σT_s⁴. The atmosphere absorbs all of this and radiates σT_atm⁴ both upward (to space) and downward (back to surface). At equilibrium: upward at TOA = σT_atm⁴ = 238 W/m² → T_atm = (238/5.67×10⁻⁸)^(1/4) = 255 K. Surface balance: σT_s⁴ = 238 + σT_atm⁴ = 476 W/m² → T_s = (476/5.67×10⁻⁸)^(1/4) = 303 K = 30 °C. The simple model overshoots (real T_s ~ 288 K) because the atmosphere isn't a perfect IR absorber, but it captures the mechanism: the surface receives radiation from both the Sun and the atmosphere.</p>

**Floor 2 (Definition):**
<p>The <strong>greenhouse effect</strong> is the warming of a planet's surface caused by atmospheric gases that are relatively transparent to incoming shortwave (visible) radiation but absorb and re-emit outgoing longwave (thermal infrared) radiation. Key greenhouse gases: H₂O (water vapour), CO₂, CH₄ (methane), N₂O, O₃ (ozone). Without any greenhouse effect, Earth's surface would average ~255 K (−18 °C, frozen). The natural greenhouse effect adds ~33 °C. This is distinct from the <em>enhanced</em> greenhouse effect — additional warming from human-caused increases in greenhouse gas concentrations. The physics of the effect is incontrovertible; it follows directly from Kirchhoff's law, the Stefan-Boltzmann law, and the atmospheric composition.</p>

**Floor 3 (In action):**
<p>The greenhouse effect is not unique to Earth. Venus has a runaway greenhouse: surface T ≈ 737 K (464 °C) — hotter than Mercury despite being farther from the Sun — because its CO₂-dominated atmosphere (96.5%, surface pressure 92 bar) is almost perfectly opaque in the IR. Mars has a thin CO₂ atmosphere (95%, but only 0.006 bar) producing a greenhouse effect of only ~5 °C. Titan (Saturn's moon) has a methane greenhouse. The greenhouse effect on Earth is delicately balanced: CO₂ absorbs strongly around 15 µm (the ν₂ bending mode), exactly where Earth's thermal emission peaks (λ_max ~ 10 µm at 288 K). A change in CO₂ concentration directly changes the atmosphere's IR opacity — a fact first calculated by Svante Arrhenius in 1896, who estimated that doubling CO₂ would warm Earth by ~4 °C, remarkably close to modern estimates (~3 °C).</p>

**Image prompt:** A chalk drawing of the Earth with atmosphere as a translucent shell. Shortwave (visible) arrows from the Sun pass through to the surface. Longwave (IR) arrows from the surface are partially absorbed by the atmosphere and re-radiated in all directions — some upward (to space), some downward (back to surface). The one-layer model equations: σT_atm⁴ = 238, σT_s⁴ = 238 + σT_atm⁴. Temperature labels: T_s = 303 K, T_eff = 255 K. Chalk on dark green board. Square 1:1.


## BB-NEW-534 — Combined heat transfer: all three modes at once

**Subject:** physics | **Topic:** thermodynamics | **Concept:** combined-heat-transfer; conduction-convection-radiation; overall-heat-transfer-coefficient | **Ground:** g1 | **Builds on:** [BB-NEW-522, BB-NEW-524, BB-NEW-526]

**Floor 0 (Idea):**
<p>In the real world, conduction, convection, and radiation rarely operate alone. A hot pipe loses heat through all three simultaneously: conduction through the pipe wall, convection to the surrounding air, and radiation to the walls of the room. The total heat loss is the sum — and each mode has its own physics.</p>

**Floor 1 (Concrete):**
<p>A steam pipe: outer diameter 0.10 m, length 5.0 m, surface temperature 150 °C (423 K), in a room at 25 °C (298 K). Surface area A = πDL = π × 0.10 × 5.0 = 1.57 m². Heat loss:</p>
<p>• Convection (natural, h ≈ 10 W/m²·K): H_conv = hA(T_s − T_air) = 10 × 1.57 × (150 − 25) = 1963 W.</p>
<p>• Radiation (ε ≈ 0.85 for oxidised steel): H_rad = εσA(T_s⁴ − T_walls⁴) = 0.85 × 5.67×10⁻⁸ × 1.57 × (423⁴ − 298⁴) = 0.85 × 5.67×10⁻⁸ × 1.57 × (3.20×10¹⁰ − 7.89×10⁹) = 0.85 × 5.67×10⁻⁸ × 1.57 × 2.41×10¹⁰ = 1825 W.</p>
<p>Total: H_total = 1963 + 1825 ≈ 3788 W. Radiation is nearly half the total — you can't ignore it even at moderate temperatures. Insulating the pipe (adding conduction resistance) reduces all downstream losses.</p>

**Floor 2 (Definition):**
<p>In <strong>combined-mode heat transfer</strong>, the total heat current is the sum of contributions from each active mode. In many geometries, the three modes operate <em>in parallel</em> between the same two temperature reservoirs: H_total = H_conduction + H_convection + H_radiation. However, they often operate <em>in series</em> too — e.g., conduction through a wall followed by convection and radiation from the outer surface to the environment. The overall heat transfer coefficient U combines all series and parallel resistances. For a wall: 1/U = 1/h_inner + L/k + 1/h_outer, where h values incorporate both convective and radiative contributions (h_total = h_conv + h_rad).</p>

**Floor 3 (In action):**
<p>Combined heat transfer governs every thermal engineering design. A domestic radiator releases about 60% of its heat by convection and 40% by radiation — both are designed for (radiator panels are large and often textured to increase surface area). A car engine block loses heat by forced convection to coolant (~70%), radiation from the block (~15%), and conduction through mounts (~15%). Building energy models solve combined heat transfer equations for every wall, window, and roof surface hour by hour. The human body in a 20 °C room loses heat roughly as: radiation ~60%, convection ~25%, evaporation ~12%, conduction ~3%. In cold water, convection dominates (~80%) because water's h is far larger than air's — which is why hypothermia sets in 25× faster in 10 °C water than in 10 °C air.</p>

**Image prompt:** A chalk drawing of a hot pipe showing all three modes simultaneously: conduction arrows through the pipe wall (from inside steam to outside surface), convection wavy arrows lifting from the surface, radiation wavy arrows emanating outward in all directions. The three equations: H_cond = kAΔT/L, H_conv = hAΔT, H_rad = εσA(T_s⁴−T_env⁴). H_total = sum. Chalk on dark green board. Square 1:1.


## BB-NEW-535 — The thermos flask: defeating all three modes

**Subject:** physics | **Topic:** thermodynamics | **Concept:** vacuum-flask; Dewar; minimising-heat-transfer | **Ground:** g0 | **Builds on:** [BB-NEW-522, BB-NEW-524, BB-NEW-526]

**Floor 0 (Idea):**
<p>A thermos flask keeps coffee hot for 12 hours. It doesn't use a heater or a power source — it simply blocks all three modes of heat transfer nearly to zero. The vacuum between double walls stops conduction and convection; the silvered surfaces reflect radiation. It's the most elegant thermal design most people use every day.</p>

**Floor 1 (Concrete):**
<p>A typical thermos: two glass (or stainless steel) walls separated by a vacuum gap of ~5 mm. Glass k ≈ 1.0 W/m·K, but with a vacuum gap, conduction through the residual gas is nearly zero — at 10⁻³ Pa pressure, the mean free path of gas molecules (~5 cm) far exceeds the gap, so gas conduction is negligible. Convection requires fluid motion — no fluid, no convection. Radiation: without silvering, two glass surfaces at 370 K and 290 K would exchange P_rad ≈ σ(T₁⁴ − T₂⁴)A/(1/ε₁ + 1/ε₂ − 1) ≈ 5.67×10⁻⁸(370⁴−290⁴)A/(1/0.9+1/0.9−1) ≈ 150 W/m². With silvering (ε ≈ 0.03): P_rad ≈ σ(T₁⁴ − T₂⁴)A/(1/0.03+1/0.03−1) ≈ 5.67×10⁻⁸(370⁴−290⁴)A/65.7 ≈ 2.5 W/m² — a 60× reduction. The only remaining heat leak: conduction through the thin neck and the stopper.</p>

**Floor 2 (Definition):**
<p>The <strong>vacuum flask</strong> (Dewar flask, invented by James Dewar in 1892) suppresses heat transfer by:</p>
<p>1. <strong>Conduction and convection:</strong> eliminated by the vacuum between double walls (no medium for conduction or fluid motion).</p>
<p>2. <strong>Radiation:</strong> minimised by low-emissivity (ε ≪ 1) reflective coatings (silver, aluminium) on the vacuum-facing surfaces. The radiative heat transfer between two infinite parallel plates is P/A = σ(T₁⁴ − T₂⁴)/(1/ε₁ + 1/ε₂ − 1).</p>
<p>3. <strong>Residual conduction:</strong> through the neck (the only solid conduction path connecting inner and outer vessels) — minimised by making the neck long, thin, and of low-k material. The stopper adds additional insulation. The flask works equally well for hot and cold contents — it blocks heat flow in both directions.</p>

**Floor 3 (In action):**
<p>The Dewar flask is one of those inventions that quietly changed the world. Liquid nitrogen (77 K), liquid oxygen (90 K), and liquid helium (4.2 K) are stored and transported in Dewar vessels — without them, low-temperature physics, superconductivity, MRI machines, and industrial gas supply would be impossible. Large-scale Dewars (cryogenic tanks) use the same principles at industrial scale: vacuum + multilayer insulation (alternating reflective foil and spacer layers). The James Webb Space Telescope's sunshield is essentially a one-sided Dewar: five layers of reflective Kapton film, creating a 300 °C temperature difference between the Sun-facing side (~85 °C) and the cold side (~−233 °C) — all passively, with no power. And your morning coffee stays hot because of James Dewar's insight that nothing conducts through nothing.</p>

**Image prompt:** A chalk drawing of a cross-section of a thermos flask. Two concentric walls with a vacuum gap labelled "vacuum — no conduction, no convection." The inner surfaces of the vacuum gap are silvered (labelled "ε = 0.03"). Heat-flow arrows: conduction blocked at the vacuum, convection blocked, radiation reflected. The only remaining path: a thin arrow through the neck. Equation: P_rad, net = σ(T₁⁴−T₂⁴)A/(1/ε₁+1/ε₂−1). Chalk on dark green board. Square 1:1.
