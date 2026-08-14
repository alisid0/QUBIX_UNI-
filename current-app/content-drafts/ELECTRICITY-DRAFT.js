/* ============================================================
   ELECTRICITY & CIRCUITS — new standalone physics path
   DRAFT BATCH — Editor Mode (see AUTHORING.md), except EL1-EL5
   and EL9, which are LOCKED — run through the real Loop with
   the author. Internal index: EL# (temporary, same convention
   as CG# in Coordinate Geometry — the real term is BB once
   locked).
   ============================================================ */

const TIER_00_CHARGE_AND_CURRENT = [

  // EL1 — LOCKED. Bridges from Card 11 (conservation of energy).
  C("V","EL1","A pulse that already exists in nature",[
    "<p>We already know energy can't be created or destroyed, only moved from one form into another. But energy can sometimes turn into something very fast — a very strong pulse, one that moves easily through metals.</p><p>This form of energy occurs naturally. You sometimes see it when thunderbolts flash through the sky. This energy is called electricity.</p>"
  ],null,{subject:"physics",topic:"electricity",concept:"electricity-intro",ground:"g0",buildsOn:["Card 11"]}),

  // EL2 — LOCKED. The copper-wire electron-cloud speed paradox.
  C("V","EL2","Crawling electrons, an instant light",[
    "<p>A single centimetre of copper wire holds more free-roaming electrons than there are grains of sand on every beach on Earth combined. And yet each individual electron, drifting through the metal, moves slower than a snail — millimetres per second.</p><p>So how does flicking a light switch turn the bulb on almost instantly, if the electrons themselves are barely crawling?</p>"
  ],null,{subject:"physics",topic:"electricity",concept:"electron-drift-speed-paradox",ground:"g0",buildsOn:["EL1","Card 37"]}),

  // EL3 — LOCKED. Electric potential, via the boulder/tyre analogy, plus conventional current.
  C("V","EL3","Charge flows downhill too",[
    "<p>You already know a boulder at the top of a hill holds energy, waiting. Let it go and it rolls down, never up — nothing pushes it down except the simple fact that \"down\" is lower than \"up.\" Air does something similar: puncture a tyre and the air inside doesn't decide to escape, it just does, moving from the high-pressure inside to the low-pressure outside, never spontaneously reversing. A rock and a gas, completely different things, sharing the same one-way shape: movement from more \"push\" to less, on its own, never backwards.</p>",
    "<p>Charge behaves the same way. The \"height\" or \"pressure\" equivalent for charge is called <strong>electric potential</strong>, measured in volts. Charge moves from a point of higher potential to a point of lower potential, exactly the way the boulder rolls downhill or air rushes out of the tyre. The size of that drop between two points is called <strong>potential difference</strong> — the everyday word for it is \"voltage.\" A 9V battery has a bigger potential difference across it than a 1.5V battery: a bigger drop, a bigger push.</p>",
    "<p>Long before anyone knew what was actually inside a wire, Benjamin Franklin had to pick a name. In the 1750s, studying static electricity and lightning, he called one kind of charge \"positive\" and the other \"negative\" — a labeling choice, made with no way of knowing what was physically moving. It was a guess, the same way you'd have to guess before opening the hood of a car you'd never seen.</p><p>Almost 150 years later, electrons were discovered, and it turned out they're what's actually drifting through a wire. By then, though, \"positive flows from high potential to low potential\" was already baked into every equation and diagram in use. So that convention — called <strong>conventional current</strong> — stuck, even though we now know the real moving particles, the electrons, drift the opposite way. It's not an error anyone needs to fix. It's just a label chosen before the full picture was known, kept because changing it now would mean rewriting everything built on top of it.</p>"
  ],null,{subject:"physics",topic:"electricity",concept:"electric-potential; potential-difference; voltage-intro; conventional-current",ground:"g0",buildsOn:["Card 11","EL2"]}),

  // EL4 — LOCKED. Like repels, opposite attracts. Opens with why electrons actually flow opposite to conventional current.
  C("V","EL4","The one rule that explains the trick",[
    "<p>Electrons moving through a wire is what current actually is — not the conventional, imaginary positive flow from before, the real electrons themselves, drifting.</p><p>And they drift in a very particular direction. Crowd too many electrons into one place and they push each other apart — the same repulsion you'd expect between any two negative charges. Meanwhile, a region that's short on electrons is, relatively, more positive — and positive pulls negative toward it. So electrons move away from where they're crowded together and toward where they're scarce: away from too much negative, toward relatively positive. That's the real direction of current — opposite to the conventional one Franklin guessed at.</p>",
    "<p>Zoom out from \"high and low potential\" and the same single rule covers it: two positives push apart, two negatives push apart, a positive and a negative pull together. That's the entire rulebook for how charges treat each other.</p><p>Rub a balloon on your hair and electrons strip off your hair onto the balloon, leaving the balloon negative and your hair short of electrons. Hold the balloon near a wall and it sticks, since the wall's surface electrons get pushed back slightly, leaving it locally positive nearby. Hold it near a second balloon rubbed the same way and they push apart instead.</p>"
  ],null,{subject:"physics",topic:"electricity",concept:"like-repel-opposite-attract",ground:"g0",buildsOn:["EL3"]}),

  // SNIPPET-EL — Franklin's guess, history aside (matches SNIPPET-T0's pattern in Coordinate Geometry)
  C("V","SNIPPET-EL","Did you know? The 50/50 guess we never undid",[
    "<p>Benjamin Franklin's kite-and-key experiment in 1752 proved lightning was electrical — and along the way, he had to name the two states of charge something. He picked \"positive\" and \"negative\" with literally no way of knowing which one was the thing actually moving. A coin flip, dressed up as a label.</p><p>It took until 1897 for J.J. Thomson to find the actual particle — the electron — in his cathode ray tube experiments, and a decade after that for Robert Millikan to measure its exact charge with his oil-drop experiment. By then, every circuit diagram and equation already used Franklin's labeling.</p><p>Nobody ever rewired the convention. The maths works out identically either way as long as you're consistent, so \"conventional current\" stayed the taught standard — meaning the textbook arrow has been pointing the wrong way for over a century, on purpose, because fixing it would cost more than it's worth.</p>"
  ],null,{subject:"physics",topic:"electricity",concept:"history-franklin",kind:"snippet",ground:"g0",buildsOn:["EL3"]}),

  // EL5 — LOCKED. Conductors vs insulators, via the electrical-cord scenario.
  C("V","EL5","Some materials let charge wander, some don't",[
    "<p>Every electrical cord you've ever held has a thin strand of metal inside, wrapped in a layer of soft plastic or rubber. You can grab that plastic sheath with both bare hands, even while the cord is plugged in and carrying current, and feel nothing. Strip that plastic away anywhere along the cord, exposing the bare metal wire underneath, and touching it would give you a shock from that same current.</p><p>That layer of plastic is the only thing standing between the current and your skin. Take it away, and there's nothing stopping the current at all.</p><p>Why does plastic block it while metal lets it straight through?</p>",
    "<p>In the metal wire, some electrons aren't tied to any single atom — they roam freely through the whole piece of metal, the same free-roaming electrons from the copper wire in EL2. Any push from a potential difference sends them drifting, and that drift is current. A material like this is a <strong>conductor</strong>.</p><p>In the plastic, every electron stays locked to its own atom, with nowhere to roam. No free electrons means nothing to drift, so no current gets through no matter how hard you push. A material like this is an <strong>insulator</strong>. That's the whole reason cords are built this way: metal inside to carry the current, plastic outside to keep it from reaching you.</p>"
  ],null,{subject:"physics",topic:"electricity",concept:"conductors-insulators",ground:"g0",buildsOn:["EL2"]}),

  // EL6 — What electric current is (was EL5)
  C("V","EL6","Charge on the move",[
    "<p>A charged balloon sitting still is just charge parked in one place. Get a huge number of charges all drifting in the same direction through a conductor, and that flow has a name: <strong>electric current</strong>.</p><p>It's the same idea as water current in a river — not the water itself, but the fact that it's moving. No movement, no current, even if the charge is still there.</p>"
  ],null,{subject:"physics",topic:"electricity",concept:"electric-current",ground:"g0",buildsOn:["EL5"]}),

  // EL7 — Current measured in amperes (was EL6)
  C("V","EL7","Counting how much charge passes per second",[
    "<p>Current is a rate: how much charge flows past a point in a wire, per second. The unit is the <strong>ampere</strong> (A) — one ampere means one coulomb of charge (a fixed, large number of electrons) passing every second.</p><div class='formula'>I = Q / t<span class='gloss'>Current equals charge divided by time.</span></div><p>A phone charger pushing 2 amperes is moving twice as much charge per second through the cable as one pushing 1 ampere.</p>"
  ],null,{subject:"physics",topic:"electricity",concept:"ampere; current-formula",ground:"g0",buildsOn:["EL6"]}),

  // EL8 — What voltage is (was EL7)
  C("V","EL8","The push behind the flow",[
    "<p>Charge doesn't drift through a wire on its own — something has to push it. That push is <strong>voltage</strong> (also called potential difference), measured in volts.</p><p>A 9V battery pushes harder than a 1.5V battery. Connect either to the same wire and the higher voltage drives more current through it — voltage is the cause, current is the effect.</p>"
  ],null,{subject:"physics",topic:"electricity",concept:"voltage; potential-difference",ground:"g0",buildsOn:["EL7"]}),

  // EL9 — LOCKED. The lineman's bare-hand technique, reinforcing that current needs a potential difference, not just contact.
  C("V","EL9","Touching a live wire on purpose",[
    "<p>Linemen regularly climb into an insulated bucket, ride a boom right up next to a live high-voltage transmission line carrying tens of thousands of volts, and then reach out and touch the wire with a bare hand — on purpose, as routine maintenance — and walk away unharmed.</p><p>The voltage hasn't changed. So what's actually protecting them?</p>",
    "<p>Before touching the line, the worker bonds themselves to that same wire, bringing their body to the wire's exact potential. That potential sits thousands of volts above the ground, but the difference between hand and wire itself is zero. The boom that lifts the bucket is made of fiberglass, with no metal path connecting the bucket to the grounded truck below, so that elevated potential has nowhere to drain to earth.</p><p>With zero potential difference across the body and no route to ground either, there's nothing to push current anywhere — the same reason a crow can sit on a single power line unharmed. Linemen train on exactly this rule: never bridge two points sitting at different potentials at the same time, whether that's a wire and the ground or two separate wires, since a potential difference is what current actually needs to move.</p>"
  ],null,{subject:"physics",topic:"electricity",concept:"potential-difference-vs-contact; grounding",ground:"g0",buildsOn:["EL3","EL6"]}),

];

/* ============================================================
   ELECTRICITY & CIRCUITS — Tier 1: Resistance, Ohm's Law, circuits
   DRAFT BATCH — Editor Mode (see AUTHORING.md)
   ============================================================ */

const TIER_01_RESISTANCE_AND_CIRCUITS = [

  // EL10 — Water-pipe analogy (was EL8) — flagged by author as not working well, revisit
  C("V","EL10","A circuit is a loop of pipes",[
    "<p>Picture a pump pushing water through a loop of pipe. The pump's strength is like <strong>voltage</strong>. How much water flows per second is like <strong>current</strong>. And a narrow, kinked section of pipe that fights the flow is like <strong>resistance</strong>.</p><p>Squeeze the pipe narrower (more resistance) and less water gets through for the same pump strength. That single picture carries almost the whole of circuit behaviour.</p>"
  ],null,{subject:"physics",topic:"electricity",concept:"water-pipe-analogy",ground:"g0",buildsOn:["EL8"]}),

  // EL11 — What resistance is (was EL10) — LOCKED, Instance 1+2 from the real Loop
  C("V","EL11","Why every material fights the flow a little",[
    "<p>Take a plain copper wire and connect it to a small battery, the kind you'd find in a TV remote or a child's toy. Current starts flowing through it, exactly as before. Now compare two ways of making heat: a metal heating coil glowing on a stove, and a piece of wood burning in a fire. Both give off heat. Both use up energy. But a burnt piece of wood can never be wood again, while that same metal coil can be switched on and off, glowing again and again, indefinitely.</p><p>Burning wood is a chemical change: the wood reacts with oxygen in the air and turns into entirely different substances, ash and smoke and gas. The wood you started with is simply gone. A heated metal coil is only a physical change. Switch the current off and it cools right back down to the exact same metal, ready to repeat.</p>",
    "<p>So why does the metal heat up at all, if nothing about it is changing? As electrons drift through it, they keep colliding with the atoms in their way, and each collision hands over a little energy as heat. That opposition to the flow, the metal fighting back a little, is called <strong>resistance</strong>, measured in ohms (Ω). Nothing is consumed. The energy just converts from electrical to heat, one collision at a time.</p><p>Every wire in the world carries some resistance built in, even a plain copper wire with no separate \"resistor\" anywhere in sight — you don't need a special component to have resistance, the same way you don't need an oxygen mask to breathe under ordinary conditions on Earth. A thin, long wire has more resistance than a thick, short one, simply because there are more atoms in the way to collide with. A heating element is just a material deliberately chosen to have a lot more of it than an ordinary wire.</p>"
  ],null,{subject:"physics",topic:"electricity",concept:"resistance; ohms; chemical-vs-physical-change",ground:"g0",buildsOn:["EL10","EL2"]}),

  // EL12 — Ohm's Law (was EL11)
  C("V","EL12","Voltage, current, and resistance, tied together",[
    "<p>For most conductors, voltage, current, and resistance are locked together by one exact relationship, <strong>Ohm's Law</strong>.</p><div class='formula'>V = I × R<span class='gloss'>Voltage equals current multiplied by resistance.</span></div><p>Push harder (more V) and more current flows, for the same resistance. Add more resistance and the same push drives less current through.</p>"
  ],null,{subject:"physics",topic:"electricity",concept:"ohms-law",ground:"g0",buildsOn:["EL11"]}),

  // EL13 — Worked example (was EL12)
  C("V","EL13","Putting numbers through the formula",[
    "<p>A 12V battery is connected across a 4Ω resistor. How much current flows?</p><div class='formula'>I = V / R = 12 / 4 = 3A<span class='gloss'>Rearranging V = IR to solve for current.</span></div><p>Double the resistance to 8Ω with the same battery: I = 12 / 8 = 1.5A — half the current, for double the resistance, exactly as the formula predicts.</p>"
  ],null,{subject:"physics",topic:"electricity",concept:"ohms-law-worked-example",ground:"g0",buildsOn:["EL12"]}),

  // EL14 — Series circuits (was EL13)
  C("V","EL14","One loop, no branches",[
    "<p>In a <strong>series circuit</strong>, every component sits along a single loop with no other path available. Whatever current leaves the battery has nowhere else to go, so the exact same current flows through every component in that loop, one after another.</p><p>Unscrew one old-style Christmas light from a series string and the whole string goes dark — there's no other path for the current to take.</p>"
  ],null,{subject:"physics",topic:"electricity",concept:"series-circuits",ground:"g0",buildsOn:["EL12"]}),

  // EL15 — Parallel circuits (was EL14)
  C("V","EL15","Several paths, one starting push",[
    "<p>In a <strong>parallel circuit</strong>, components sit on separate branches that reconnect at both ends. Each branch is wired straight across the same two points, so every branch feels the exact same voltage, even though the current can split unevenly between them depending on each branch's resistance.</p><p>Unscrew one bulb in a household parallel wiring setup and the others stay lit — each branch still has its own complete path back to the supply.</p>"
  ],null,{subject:"physics",topic:"electricity",concept:"parallel-circuits",ground:"g0",buildsOn:["EL12"]}),

  // EL16 — Resistors in series (was EL15)
  C("V","EL16","Series resistances simply add",[
    "<p>Put resistors one after another in a series loop and their resistances just add up, since the current has to fight through all of them, one after another, with nowhere to skip ahead.</p><div class='formula'>R_total = R1 + R2 + ...<span class='gloss'>Series resistances add directly.</span></div><p>A 3Ω and a 5Ω resistor in series behave exactly like one 8Ω resistor. Connected to a 16V battery, the current is I = 16 / 8 = 2A through the whole loop.</p>"
  ],null,{subject:"physics",topic:"electricity",concept:"series-resistance-formula",ground:"g0",buildsOn:["EL14","EL13"]}),

  // EL17 — Resistors in parallel (was EL16)
  C("V","EL17","Parallel paths make the total resistance drop",[
    "<p>Add a second branch next to an existing one and you've handed the current a second route through — the combined resistance can only go down, never up, however big the new branch's own resistance is.</p><div class='formula'>1/R_total = 1/R1 + 1/R2 + ...<span class='gloss'>Take the reciprocal of each resistance, add them, then take the reciprocal of the result.</span></div><p>Two 4Ω resistors in parallel: 1/R = 1/4 + 1/4 = 1/2, so R_total = 2Ω — lower than either resistor on its own, since the current now has two equally easy ways through.</p>"
  ],null,{subject:"physics",topic:"electricity",concept:"parallel-resistance-formula",ground:"g0",buildsOn:["EL15","EL13"]}),

];
