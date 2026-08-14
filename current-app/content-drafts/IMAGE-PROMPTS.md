# IMAGE-PROMPTS.md

> **AUTHORING ARCHIVE — NOT A LIVE QUEUE.** Verify BB/floor presence with
> `pnpm run audit:live-media`. Do not generate technical diagrams from these
> raster prompts; technical media must be deterministic/code-native.
## Pixel-art image prompts for all live BBs — every floor

**Style baseline for every frame (include at start of each prompt):**
> Pixel art, dark navy blue background, 16-bit retro game style, no text

**Rules:**
- One subject per frame. No split scenes.
- 4–5 sequential frames per floor — together they form a GIF.
- Frames progress through the concept shown on that floor.
- No need to specify 1:1 ratio or quality (ChatGPT presets handle it).
- Floors marked **SKIP** already have media in `boardMedia.js`.

---

## THE BIT (Computing)

### BB 1130 — The agreement (information)
*All floors — **SKIP** (GIF already wired in boardMedia.js)*

---

### BB 1131 — Smoke and empty sky (binary)
*All floors — **SKIP** (GIF already wired in boardMedia.js)*

---

### BB 1132 — The atom of information (bit)

**Floor 0** — watchtower → bit swap
→ Frame 1: A stone watchtower standing alone on a hilltop, dark sky.
→ Frame 2: Thick column of black smoke rising from the watchtower.
→ Frame 3: An OFF switch, dark and unlit.
→ Frame 4: The same switch flipped ON, glowing amber.
→ Frame 5: A retro computer terminal with a single blinking cursor.

**Floor 1** — copper wire / electricity check
→ Frame 1: A single copper wire running horizontally across the frame.
→ Frame 2: The wire with no glow — dead circuit, dark.
→ Frame 3: The wire lit up bright yellow — electricity flowing.
→ Frame 4: A tiny toggle switch in the open (0) position.

**Floor 2** — 0 and 1 states
→ Frame 1: A large rocker switch in the OFF position.
→ Frame 2: The switch in the ON position, glowing.
→ Frame 3: A dark sky — empty, clear, no smoke.
→ Frame 4: The same sky with a thick smoke plume rising.

**Floor 3** — the bit defined
→ Frame 1: A single glowing pixel on an otherwise black grid.
→ Frame 2: A simple light bulb — off, filament cold.
→ Frame 3: The same bulb — on, filament glowing bright.
→ Frame 4: A tiny "1" indicator light on a panel, lit up.

**Floor 4** — bit as atom of the digital age
→ Frame 1: A smartphone outline, dark and unlit.
→ Frame 2: A stream of tiny squares flowing into the phone — 0s and 1s represented as dark and lit pixels.
→ Frame 3: A photograph on a screen, made of visible pixel blocks.
→ Frame 4: A single pixel block, isolated, glowing.

---

### BB 1133 — The math of Yes and No (boolean-logic)

**Floor 0** — computers run on 0s and 1s
→ Frame 1: A row of microchip circuits on a motherboard.
→ Frame 2: A single lit LED — on.
→ Frame 3: The same LED — off.
→ Frame 4: A small display showing "0" then "1" alternating.

**Floor 1** — 0 and 1 as state not number
→ Frame 1: A green checkmark symbol, glowing.
→ Frame 2: A red X symbol, glowing.
→ Frame 3: A thumbs-up icon, pixel art style.
→ Frame 4: A thumbs-down icon, pixel art style.

**Floor 2** — True/False, Yes/No
→ Frame 1: A single illuminated YES sign on a dark wall.
→ Frame 2: A single NO sign, unlit.
→ Frame 3: A two-state toggle: TRUE position highlighted.
→ Frame 4: The toggle flipped: FALSE position highlighted.

**Floor 3** — George Boole portrait era
→ Frame 1: A quill pen on a writing desk, candlelit.
→ Frame 2: An open book with symbols on the pages.
→ Frame 3: A brain outline with gears inside — pixel art.
→ Frame 4: A decision diamond (flowchart shape), alone on screen.

**Floor 4** — Boolean Algebra: AND, OR, NOT
→ Frame 1: Two input wires meeting at a single gate symbol.
→ Frame 2: A gate labelled AND — both inputs lit, output lit.
→ Frame 3: A gate labelled OR — one input lit, output lit.
→ Frame 4: A NOT gate — input lit, output dark; input dark, output lit.

---

### BB 1134 — The AND gate

**Floor 0** — wire + switches setup
→ Frame 1: A single bare copper wire running to a light bulb.
→ Frame 2: The wire cut with two gaps — two switches installed.
→ Frame 3: Both switches shown open (off).
→ Frame 4: The bulb unlit, dark.

**Floor 1** — single wire with two switches
→ Frame 1: Wire with Switch 1 closed, Switch 2 open.
→ Frame 2: Electricity stops at the open switch — bulb stays dark.
→ Frame 3: Wire with Switch 2 closed, Switch 1 open.
→ Frame 4: Electricity stops again — bulb still dark.

**Floor 2** — what has to happen?
→ Frame 1: A question mark floating above two switches.
→ Frame 2: Switch 1 highlighted — arrow pointing to it.
→ Frame 3: Switch 2 highlighted — arrow pointing to it.
→ Frame 4: Both switches highlighted together.

**Floor 3** — both switches must be 1
→ Frame 1: Switch 1 flipped to closed (1).
→ Frame 2: Switch 2 flipped to closed (1).
→ Frame 3: Both closed — electricity flows down the full wire.
→ Frame 4: Light bulb glowing bright yellow.

**Floor 4** — AND gate rule: both must say Yes
→ Frame 1: Two input wires, both glowing (1 and 1).
→ Frame 2: AND gate symbol lit up.
→ Frame 3: Output wire glowing — result is 1.
→ Frame 4: One input dark — output goes dark immediately.

**Floor 5** — physical AND gate enforces rule
→ Frame 1: A microchip with tiny gate structures visible.
→ Frame 2: Two input pins on the chip.
→ Frame 3: One pin dark — output pin dark.
→ Frame 4: Both pins lit — output pin lights up.

---

### BB 1135 — The OR gate

**Floor 0** — same two switches, different wiring
→ Frame 1: A wire split into two parallel paths.
→ Frame 2: Switch on top path, switch on bottom path.
→ Frame 3: Both paths reconnecting before a bulb.
→ Frame 4: The bulb unlit — both switches still open.

**Floor 1** — split the wire into a fork
→ Frame 1: A Y-shaped wire junction — top branch and bottom branch.
→ Frame 2: Switch A on the top branch.
→ Frame 3: Switch B on the bottom branch.
→ Frame 4: Both branches rejoining into a single wire.

**Floor 2** — electricity has a choice
→ Frame 1: An arrow pointing both up and down at a fork.
→ Frame 2: Top path highlighted in yellow — electricity choosing top.
→ Frame 3: Bottom path highlighted in yellow — electricity choosing bottom.
→ Frame 4: Both paths highlighted — electricity flowing freely.

**Floor 3** — top OR bottom triggers the bulb
→ Frame 1: Switch A closed — top path glowing — bulb lit.
→ Frame 2: Switch A open, Switch B closed — bottom path glowing — bulb lit.
→ Frame 3: Both closed — both paths glowing — bulb lit.
→ Frame 4: Both open — no path glowing — bulb dark.

**Floor 4** — OR gate built
→ Frame 1: OR gate symbol on a circuit diagram.
→ Frame 2: One input wire glowing — output wire glowing.
→ Frame 3: Other input wire glowing — output still glowing.
→ Frame 4: Both inputs dark — output goes dark.

**Floor 5** — processor is billions of AND/OR gates
→ Frame 1: A single chip on a finger for scale.
→ Frame 2: Magnified view showing a grid of tiny gate symbols.
→ Frame 3: Electricity routing through different paths in the grid.
→ Frame 4: A glowing output emerging from the far end of the chip.

---

### BB 1136 — The invisible water (logic-gates analogy)

**Floor 0** — electricity is invisible
→ Frame 1: A copper wire — no visible flow, just metal.
→ Frame 2: A lit LED suggesting current flows, but the flow itself hidden.
→ Frame 3: A water pipe — flow visibly rushing through clear plastic.
→ Frame 4: Comparison: wire on left, pipe on right, same circuit shape.

**Floor 1** — water as electricity analogy
→ Frame 1: A plastic pipe segment, water visible inside.
→ Frame 2: A plumbing valve on the pipe — open position.
→ Frame 3: Water rushing through the open valve.
→ Frame 4: A faucet at the end of the pipe — water pouring out.

**Floor 2** — pipes and valves = wires and switches
→ Frame 1: A closed valve on a pipe — water blocked.
→ Frame 2: The valve opened — water flowing.
→ Frame 3: Valve shown as "0" (closed) and "1" (open) side-by-side states.
→ Frame 4: A faucet either dry or running based on valve state.

**Floor 3** — valve has two states: open or closed
→ Frame 1: A hand-turned valve, handle pointing horizontal — closed.
→ Frame 2: The valve handle pointing vertical — open.
→ Frame 3: Water rushing out the end of the pipe.
→ Frame 4: No water — pipe dry — valve closed.

---

### BB 1137 — The AND pipe

**Floor 0** — straight pipe with two valves
→ Frame 1: A straight horizontal pipe.
→ Frame 2: Valve 1 installed on the left section of the pipe.
→ Frame 3: Valve 2 installed to the right of Valve 1.
→ Frame 4: A faucet at the far end of the pipe.

**Floor 1** — install two valves in series
→ Frame 1: Valve 1 and Valve 2 both shown closed on the pipe.
→ Frame 2: Water pressure pushing from the left — blocked at Valve 1.
→ Frame 3: Valve 1 open — water reaches Valve 2 — blocked there.
→ Frame 4: Both open — water flows all the way through.

**Floor 2** — main water line turned on
→ Frame 1: Water source tank — full, pressurized.
→ Frame 2: Main line flowing — hitting Valve 1.
→ Frame 3: Valve 1 status: closed — water stopped.
→ Frame 4: Valve 1 status: open — water continues to Valve 2.

**Floor 3** — Valve 1 open but Valve 2 closed
→ Frame 1: Valve 1 in open position.
→ Frame 2: Water flowing through Valve 1.
→ Frame 3: Water hitting closed Valve 2 — blocked.
→ Frame 4: Faucet dry — no output.

**Floor 4** — both valves open = AND logic
→ Frame 1: Valve 1 open, Valve 2 open.
→ Frame 2: Water flowing through both valves unimpeded.
→ Frame 3: Water rushing out the faucet.
→ Frame 4: Close-up of the faucet pouring — AND gate confirmed.

---

### BB 1138 — The OR pipe

**Floor 0** — Y-shaped pipe fork
→ Frame 1: A main pipe splitting into a Y-fork.
→ Frame 2: Top branch with Valve A visible.
→ Frame 3: Bottom branch with Valve B visible.
→ Frame 4: Both branches rejoining — single faucet at the end.

**Floor 1** — Y-shape with two valves
→ Frame 1: Y-junction from above — two equal branches.
→ Frame 2: Valve A on the top branch — closed position.
→ Frame 3: Valve B on the bottom branch — closed position.
→ Frame 4: Faucet at the merge point — currently dry.

**Floor 2** — water installed on valves
→ Frame 1: Water source connected to the main pipe before the Y.
→ Frame 2: Water reaching the Y-junction.
→ Frame 3: Water trying both branches simultaneously.
→ Frame 4: Both valves blocking — no output yet.

**Floor 3** — top valve open sends water through
→ Frame 1: Valve A opened — top branch glowing with water flow.
→ Frame 2: Water rushing through the top branch.
→ Frame 3: Water reaching the merge point.
→ Frame 4: Faucet pouring — OR gate output = 1.

**Floor 4** — OR logic: either valve works
→ Frame 1: Valve A open, Valve B closed — faucet pouring.
→ Frame 2: Valve A closed, Valve B open — faucet pouring.
→ Frame 3: Both valves open — faucet pouring.
→ Frame 4: Both valves closed — faucet dry.

**Floor 5** — rearranging pipes changes the logic
→ Frame 1: The AND pipe (series) next to the OR pipe (parallel) — two separate diagrams.
→ Frame 2: AND pipe — both valves needed, sequential arrangement.
→ Frame 3: OR pipe — either valve works, parallel arrangement.
→ Frame 4: The two gate symbols side by side.

---

### BB 1229 — The physical function (logic-gates)

**Floor 0** — abstract function becomes physical
→ Frame 1: A simple f(x) equation floating in space — abstract symbol.
→ Frame 2: A black-box machine with an input slot and output slot.
→ Frame 3: A copper wire replacing the input/output.
→ Frame 4: Electricity going in, electricity coming out.

**Floor 1** — physical machine acts like f(x)
→ Frame 1: A retro vending machine — input button, output slot.
→ Frame 2: A logic gate chip — two input pins, one output pin.
→ Frame 3: Number "5" going into a machine — "10" emerging.
→ Frame 4: Electrical current going into a gate — current or silence emerging.

**Floor 2** — translate math to electricity
→ Frame 1: A chalkboard with an equation symbol on it.
→ Frame 2: An electrical circuit diagram — same shape as the equation flow.
→ Frame 3: A wire carrying current — the physical "signal".
→ Frame 4: A chip converting input current to output current.

**Floor 3** — inputs are 0 or 1 only
→ Frame 1: A two-position rocker switch — only two states.
→ Frame 2: A toggle marked "0" — dark, off.
→ Frame 3: A toggle marked "1" — lit, on.
→ Frame 4: A pair of such switches feeding into a chip.

**Floor 4** — gates perform the algebra
→ Frame 1: AND gate symbol with 1-and-1 input → 1 output.
→ Frame 2: AND gate with 1-and-0 input → 0 output.
→ Frame 3: OR gate with 0-or-1 input → 1 output.
→ Frame 4: A silicon chip containing millions of such gate structures.

---

### BB 1230 — The Logic Gates

**Floor 0** — logic gates take 1s and 0s and output a decision
→ Frame 1: A gate chip with two input wires and one output wire.
→ Frame 2: Both inputs showing "1" signals (lit).
→ Frame 3: The gate processing — internal glow.
→ Frame 4: Output wire lit — result delivered.

**Floor 1** — AND gate: both must be 1
→ Frame 1: AND gate symbol on its own.
→ Frame 2: Two lit input wires feeding AND — output lit.
→ Frame 3: One lit wire, one dark wire feeding AND — output dark.
→ Frame 4: Both inputs dark — output dark.

**Floor 2** — OR gate: either one works
→ Frame 1: OR gate symbol on its own.
→ Frame 2: One lit input wire — output lit.
→ Frame 3: Other input lit instead — output still lit.
→ Frame 4: Both inputs dark — output dark.

**Floor 3** — NOT gate: flips the input
→ Frame 1: NOT gate (inverter) symbol — triangle with a small circle.
→ Frame 2: Input wire lit (1) → output wire dark (0).
→ Frame 3: Input wire dark (0) → output wire lit (1).
→ Frame 4: Three gates side by side: AND, OR, NOT symbols.

**Floor 4** — gates are literal physical machines
→ Frame 1: A microscopic silicon cross-section — transistors visible.
→ Frame 2: A magnified chip surface showing gate structures.
→ Frame 3: Current entering from the top — routed through structures.
→ Frame 4: Output pin at the bottom — lit or dark based on gate type.

---

### BB 1231 — The composite machine (circuits)

**Floor 0** — single gate makes one decision
→ Frame 1: A single AND gate on a circuit board — isolated.
→ Frame 2: One input wire glowing — one output.
→ Frame 3: A second gate appearing beside it.
→ Frame 4: The two gates not yet connected — separate.

**Floor 1** — composite: output of one feeds input of next
→ Frame 1: AND gate output wire connecting to OR gate input wire.
→ Frame 2: Electricity flowing from AND into OR.
→ Frame 3: The OR gate processing and outputting.
→ Frame 4: A chain of three gates in sequence.

**Floor 2** — AND gate output wired to OR gate input
→ Frame 1: AND gate symbol alone.
→ Frame 2: Output wire of AND extending to the right.
→ Frame 3: That wire plugging into OR gate's left input.
→ Frame 4: OR gate receiving the AND result.

**Floor 3** — chain creates complex circuit
→ Frame 1: A linear chain of 4 gates connected in sequence.
→ Frame 2: Electricity entering the first gate.
→ Frame 3: Signal cascading through each gate.
→ Frame 4: Final output emerging from the last gate.

**Floor 4** — processor = billions of gates in composite
→ Frame 1: A single microchip on a fingertip for scale.
→ Frame 2: Magnified chip surface showing a dense grid of gate structures.
→ Frame 3: Electricity routing through countless paths.
→ Frame 4: A single output signal emerging from the chip edge.

---

### BB 1232 — Adding numbers with electricity (adder)

**Floor 0** — enough gates = arithmetic
→ Frame 1: A chain of AND, OR, NOT gates connected together.
→ Frame 2: Two input signals entering from the left.
→ Frame 3: Electricity cascading through the gate maze.
→ Frame 4: A different output signal emerging — not the same as either input.

**Floor 1** — an Adder circuit
→ Frame 1: A labelled box: "ADDER CIRCUIT" with two input wires.
→ Frame 2: One input wire carrying signal "2".
→ Frame 3: Second input wire carrying signal "3".
→ Frame 4: Both inputs feeding the adder box.

**Floor 2** — hand it 2 and 3 in electrical form
→ Frame 1: Signal pattern representing "2" on a wire (two pulses).
→ Frame 2: Signal pattern representing "3" on a second wire (three pulses).
→ Frame 3: Both wires entering the adder circuit.
→ Frame 4: Electricity routed through the internal gates.

**Floor 3** — gates force current through specific paths
→ Frame 1: Inside the adder — AND gate routing.
→ Frame 2: OR gate combining partial results.
→ Frame 3: NOT gate inverting where needed.
→ Frame 4: Current emerging at a specific output path — "5".

**Floor 4** — output is always mathematically correct
→ Frame 1: Output signal pattern representing "5" on a wire.
→ Frame 2: The adder box with input "2+3" → output "5".
→ Frame 3: The gates — no "thinking" happening, just routing.
→ Frame 4: Same adder circuit — input changes to "4+4" → output "8".

---

### BB 1233 — The universal machine (computing)

**Floor 0** — the secret of the digital age
→ Frame 1: A vast network of interconnected circuits glowing.
→ Frame 2: A single gate — zoomed in, one switch.
→ Frame 3: Zoomed out — that switch is part of a billion-gate chip.
→ Frame 4: The chip powering a screen displaying something complex.

**Floor 1** — every task is mathematics
→ Frame 1: A 3D rendered game scene on a pixel-art screen.
→ Frame 2: A weather map on a display.
→ Frame 3: A search results page on a terminal.
→ Frame 4: All three screens powered by the same chip underneath.

**Floor 2** — mathematics executed by switches
→ Frame 1: A single switch — open.
→ Frame 2: The switch — closed.
→ Frame 3: A row of switches rapidly toggling on and off.
→ Frame 4: The pattern of switches producing a visible output on screen.

**Floor 3** — algebra in 1800s = silicon today
→ Frame 1: A quill writing an equation on paper.
→ Frame 2: The same equation shown as a gate circuit diagram.
→ Frame 3: The circuit diagram shrunk to chip scale.
→ Frame 4: The chip — same rules, physical form.

**Floor 4** — ink on paper vs. flowing electricity: same rules
→ Frame 1: A sheet of paper with mathematical symbols.
→ Frame 2: A microchip with circuit traces.
→ Frame 3: Paper and chip side by side — identical logic structure.
→ Frame 4: Electricity flowing through the chip — the math executing.

---

### BB 1234 — The communication problem (machine-code)

**Floor 0** — processor only understands two words
→ Frame 1: A CPU chip with input/output pins.
→ Frame 2: A binary string of 0s and 1s displayed on a terminal.
→ Frame 3: The word "ON" and word "OFF" — only two options.
→ Frame 4: Everything else — letters, images — reduced to these two words.

**Floor 1** — machine only speaks 0 and 1
→ Frame 1: A single LED — lit or dark, nothing in between.
→ Frame 2: A row of LEDs showing a binary pattern.
→ Frame 3: A terminal displaying raw 0101010001 — unreadable to human eyes.
→ Frame 4: A confused figure silhouette staring at the terminal.

**Floor 2** — human can't speak to machine directly
→ Frame 1: A person's hand reaching toward a terminal keyboard.
→ Frame 2: The keyboard keys — each labelled A-Z, 0-9.
→ Frame 3: The chip receiving the keystroke — converting to binary.
→ Frame 4: Billions of 1s and 0s flooding the chip's internal bus.

**Floor 3** — machine code: millions of 1s and 0s
→ Frame 1: A long scroll of binary code unrolling.
→ Frame 2: A single line of binary — 16 digits — representing one instruction.
→ Frame 3: Millions of such lines stacked up — the full program.
→ Frame 4: A human hand trying to write binary manually — clearly impossible.

**Floor 4** — machine code is unreadable to humans
→ Frame 1: A printed page of binary — dense, indistinguishable pattern.
→ Frame 2: A magnifying glass over the binary — still unreadable.
→ Frame 3: A chip reading the binary effortlessly — lights processing.
→ Frame 4: A wall between the binary chip and the human — the communication gap.

---

### BB 1235 — The translator (programming)

**Floor 0** — the bridge: a programming language
→ Frame 1: Two walls — one labelled "HUMAN", one labelled "MACHINE".
→ Frame 2: A bridge starting to form between them.
→ Frame 3: Words like "IF", "PRINT", "LOOP" appearing on the human side.
→ Frame 4: Binary 0s and 1s on the machine side — same concept, different language.

**Floor 1** — humans write readable language
→ Frame 1: A green-screen terminal with readable English-like code.
→ Frame 2: The word "Python" on the terminal screen.
→ Frame 3: A line of code: simple syntax, clear intent.
→ Frame 4: A keyboard with hands typing.

**Floor 2** — readable instruction example
→ Frame 1: A button on a screen — not yet pressed.
→ Frame 2: The button pressed — action triggered.
→ Frame 3: A simple IF-THEN arrow diagram.
→ Frame 4: The screen turning blue — the visible result.

**Floor 3** — the Compiler: the dictionary
→ Frame 1: An open thick dictionary on a desk.
→ Frame 2: A compiler program box — text going in one side.
→ Frame 3: Binary code coming out the other side of the compiler.
→ Frame 4: The binary feeding into the CPU chip.

**Floor 4** — humans write logic, compiler handles electricity
→ Frame 1: A person writing code at a keyboard — readable text on screen.
→ Frame 2: Compiler program as a processing unit receiving the text.
→ Frame 3: Binary stream emerging from the compiler.
→ Frame 4: CPU executing — outputs on screen.

---

### BB 1236 — The Algorithm (algorithms)

**Floor 0** — algorithm: a step-by-step recipe
→ Frame 1: A recipe card with numbered steps.
→ Frame 2: Step 1 highlighted — a single action.
→ Frame 3: Step 2 highlighted — next action.
→ Frame 4: Final step — result achieved.

**Floor 1** — algorithm defined
→ Frame 1: A flowchart with Start → Step 1 → Step 2 → End.
→ Frame 2: A single numbered instruction in a box.
→ Frame 3: Arrow pointing from one box to the next.
→ Frame 4: A checkered flag at the end — task complete.

**Floor 2** — baking a cake as algorithm
→ Frame 1: Raw eggs on a counter.
→ Frame 2: Flour being added to a bowl.
→ Frame 3: The bowl going into an oven.
→ Frame 4: A finished cake emerging from the oven.

**Floor 3** — software algorithm: data instead of flour
→ Frame 1: A database of records — rows and columns.
→ Frame 2: An arrow pointing to the first record — Step 1.
→ Frame 3: A search term being checked against the record.
→ Frame 4: A match found — result flagged.

**Floor 4** — search engine executing the recipe
→ Frame 1: A magnifying glass icon — search initiated.
→ Frame 2: A database of pages — algorithm scanning through.
→ Frame 3: Matching pages being identified and ranked.
→ Frame 4: Results appearing on a terminal screen.

---

### BB 1237 — The loop (loops)

**Floor 0** — repeating without human intervention
→ Frame 1: A factory conveyor belt — items moving past a sensor.
→ Frame 2: The sensor checking each item one by one.
→ Frame 3: The belt looping around — same sensor, next item.
→ Frame 4: The loop continuing — same action, repeated endlessly.

**Floor 1** — don't write the command 10,000 times
→ Frame 1: A scroll of paper with 10,000 identical lines — absurdly long.
→ Frame 2: The scroll contrasted with a tiny card with one line and an arrow.
→ Frame 3: The one-line card with a circular arrow: "repeat".
→ Frame 4: The same instruction cycling back to itself.

**Floor 2** — write command once, wrap in a loop
→ Frame 1: A single instruction box in a flowchart.
→ Frame 2: A loop arrow bending back from the bottom to the top.
→ Frame 3: A counter incrementing: 1, 2, 3... (shown as tally marks).
→ Frame 4: The counter reaching the end — loop exits.

**Floor 3** — execute, check if done, repeat if not
→ Frame 1: Flowchart diamond: "Is job done?" with YES and NO paths.
→ Frame 2: NO path curving back up to the top of the loop.
→ Frame 3: YES path pointing to EXIT.
→ Frame 4: The loop cycling with a counter visible on the side.

**Floor 4** — computers loop perfectly, humans tire
→ Frame 1: A human silhouette at a desk, drooping — tired after many repetitions.
→ Frame 2: A CPU chip — no fatigue, still processing.
→ Frame 3: A tally counter showing one billion — machine still going.
→ Frame 4: The machine's output — perfect, unbroken repetition.

---

### BB 1238 — The If-Then branch (conditionals)

**Floor 0** — algorithms must react to environment
→ Frame 1: A crossroads — two paths, one sign with a question.
→ Frame 2: A sensor reading the environment.
→ Frame 3: A decision diamond in a flowchart.
→ Frame 4: Two output paths diverging from the diamond.

**Floor 1** — conditional statements / if-then
→ Frame 1: A large diamond shape: "IF?" at the top.
→ Frame 2: "YES" arrow pointing right — to one result.
→ Frame 3: "NO" arrow pointing left — to other result.
→ Frame 4: A flowchart completed with both branches shown.

**Floor 2** — fork in the road: True or False
→ Frame 1: A fork in a road — two paths diverging.
→ Frame 2: Left path labelled TRUE — leads to one destination.
→ Frame 3: Right path labelled FALSE — leads to another.
→ Frame 4: A traveller at the fork making a choice.

**Floor 3** — password check example
→ Frame 1: A lock icon on a terminal screen.
→ Frame 2: Password input field — text being typed.
→ Frame 3: IF CORRECT → green checkmark / login screen.
→ Frame 4: IF WRONG → red X / error screen.

**Floor 4** — millions of branches = reactive system
→ Frame 1: A massive decision tree — branches spreading in all directions.
→ Frame 2: A game character on screen — responding to player input.
→ Frame 3: A bank app terminal — routing different transactions.
→ Frame 4: The tree reduced to its core: one IF-THEN diamond.

---

### BB 1239 — The physical traffic (hardware)

**Floor 0** — software routes; hardware physically routes electricity
→ Frame 1: A city road intersection with traffic lights.
→ Frame 2: Cars moving along specific lanes — directed by signals.
→ Frame 3: A circuit board with electricity paths (traces) visible.
→ Frame 4: A signal routing down a specific trace on the board.

**Floor 1** — executing IF-THEN physically routes electricity
→ Frame 1: An IF-THEN flowchart.
→ Frame 2: A transistor on a chip — the physical switch that routes.
→ Frame 3: Current directed to Path A when condition is true.
→ Frame 4: Current directed to Path B when condition is false.

**Floor 2** — billions of signals: traffic problem
→ Frame 1: A highway jammed with cars — gridlock.
→ Frame 2: A chip with billions of signals — represented as dense light traces.
→ Frame 3: A signal trying to go backward down the wrong path.
→ Frame 4: A collision point — two signals meeting incorrectly.

**Floor 3** — signal could flow backward: destruction
→ Frame 1: A backwards arrow on a circuit trace — wrong direction.
→ Frame 2: Two signals colliding — spark/burst pixel effect.
→ Frame 3: A logic gate overloaded — error state.
→ Frame 4: A one-way sign — the solution needed.

---

### BB 1240 — The one-way valve (diode)

**Floor 0** — plumbing check valve analogy
→ Frame 1: A water pipe with a check valve — arrow showing allowed direction.
→ Frame 2: Water pushing forward — valve flap opens — water flows.
→ Frame 3: Water trying to reverse — valve flap slams shut.
→ Frame 4: No backflow — pipe protected.

**Floor 1** — the diode: electronic check valve
→ Frame 1: A diode component — the black cylinder with a stripe.
→ Frame 2: Current arrow pointing toward the diode stripe — allowed direction.
→ Frame 3: Current flowing through successfully.
→ Frame 4: Diode symbol: triangle with bar — direction encoded in shape.

**Floor 2** — diode: solid silicon, no moving parts
→ Frame 1: A physical diode component isolated on dark background.
→ Frame 2: Silicon crystal lattice structure — no mechanical parts.
→ Frame 3: Electrons flowing through the silicon structure in one direction.
→ Frame 4: Silicon blocking electrons from the reverse direction.

**Floor 3** — correct direction: silicon lets it pass
→ Frame 1: Forward-biased diode — current flowing through.
→ Frame 2: The silicon "wall" shown as open.
→ Frame 3: Electrons streaming through the open path.
→ Frame 4: Output wire lit — signal delivered.

**Floor 4** — reverse direction: slammed door
→ Frame 1: Reverse-biased diode — current trying to flow backward.
→ Frame 2: The silicon "wall" shown as solid — blocked.
→ Frame 3: Electrons stopped dead — bouncing back.
→ Frame 4: Output wire dark — the diode's job done.

---

### BB 1241 — The mechanical switch problem (vacuum-tubes)

**Floor 0** — early computers used physical switches
→ Frame 1: A wall of mechanical toggle switches — old-fashioned.
→ Frame 2: A hand flipping a switch — slow, physical action.
→ Frame 3: A room-sized computer from the 1940s — cabinets everywhere.
→ Frame 4: A single vacuum tube — glass cylinder glowing.

**Floor 1** — 1940s vacuum tubes: glass bulbs the size of lightbulbs
→ Frame 1: A vacuum tube — glowing filament visible inside glass.
→ Frame 2: A row of vacuum tubes on a rack — many glowing.
→ Frame 3: A vacuum tube physically clicking open — mechanical motion shown.
→ Frame 4: A burned-out vacuum tube — dark, failed.

**Floor 2** — massive heat, slow, constantly burning out
→ Frame 1: A vacuum tube with heat waves rising from it.
→ Frame 2: A scorched tube — burned-out filament.
→ Frame 3: A maintenance person replacing a tube by hand.
→ Frame 4: A whole rack of tubes — some dark, failed.

**Floor 3** — smartphone would need a skyscraper of tubes
→ Frame 1: A modern smartphone outline — compact.
→ Frame 2: The phone's chip shown — billions of switches on a fingernail.
→ Frame 3: A vacuum tube — size of a lightbulb — beside the chip.
→ Frame 4: A towering skyscraper silhouette — how many tubes it would take.

---

### BB 1242 — The Transistor

**Floor 0** — Bell Labs 1947: no moving parts
→ Frame 1: A laboratory workbench — scientific equipment.
→ Frame 2: A small crystal of germanium on the bench.
→ Frame 3: Three wire probes touching the crystal.
→ Frame 4: A single transistor component — first prototype shape.

**Floor 1** — transistor: electrical switch, no moving parts
→ Frame 1: A transistor component isolated — TO-92 package shape.
→ Frame 2: The transistor's three legs: base, collector, emitter.
→ Frame 3: No mechanical parts — solid state, just material.
→ Frame 4: A comparison: vacuum tube (large, fragile) vs transistor (tiny, solid).

**Floor 2** — semiconductor material: normally blocks current
→ Frame 1: A block of silicon — electrons shown as blocked particles.
→ Frame 2: The silicon material shown as a wall — OFF state.
→ Frame 3: The symbol "0" indicating the blocked state.
→ Frame 4: The silicon in its rest state — no current passing.

**Floor 3** — third wire: control gate — zap changes material
→ Frame 1: The transistor's base wire — the control pin.
→ Frame 2: A tiny zap of electricity sent to the base.
→ Frame 3: The silicon material changing — wall dissolving.
→ Frame 4: Current now flowing across the gap — ON state.

**Floor 4** — wall drops: main current flows
→ Frame 1: The silicon "wall" fully open.
→ Frame 2: Main current rushing through the collector-emitter path.
→ Frame 3: Output wire glowing bright — transistor conducting.
→ Frame 4: The "1" state achieved — switch operated without moving parts.

---

### BB 1243 — The engine of the modern world (transistor)

**Floor 0** — no delay: no physical parts to move
→ Frame 1: A transistor switching — no mechanical delay, instant.
→ Frame 2: A stopwatch showing near-zero time — one cycle.
→ Frame 3: The transistor flipping billions of times per second.
→ Frame 4: A time graph showing the rapid on-off pattern.

**Floor 1** — flipped billions of times per second
→ Frame 1: A single transistor cycle — on then off.
→ Frame 2: The cycle counter spinning rapidly.
→ Frame 3: 1,000,000,000 cycles on a display.
→ Frame 4: The transistor still intact — no wear.

**Floor 2** — can be shrunk to microscopic scale
→ Frame 1: A transistor at visible component size — 1mm.
→ Frame 2: The transistor shrunk — too small to see with naked eye.
→ Frame 3: Electron microscope view — nanometer scale transistor.
→ Frame 4: A chip surface — billions of transistors packed together.

**Floor 3** — modern chip: 10 billion transistors, fingernail size
→ Frame 1: A fingernail — actual scale reference.
→ Frame 2: A chip placed on the fingernail — tiny.
→ Frame 3: Magnified chip surface — dense gate structures filling the view.
→ Frame 4: "10,000,000,000" as a count indicator (pixel tally marks).

**Floor 4** — most important invention of 20th century
→ Frame 1: A satellite orbiting — transistors inside.
→ Frame 2: A medical device — heart monitor — transistors inside.
→ Frame 3: A smartphone — transistors inside.
→ Frame 4: All three powered by the same tiny switch — the transistor.

---

### BB 1244 — The Bouncer at the Door (firewall)

**Floor 0** — network ports need filtering
→ Frame 1: A server rack with many glowing ports.
→ Frame 2: Data packets arriving at a port — arrows pointing inward.
→ Frame 3: A bouncer silhouette at a door — pixel art.
→ Frame 4: Some packets let through, some turned away.

**Floor 1** — firewall as digital bouncer
→ Frame 1: A firewall box symbol between the internet cloud and a computer.
→ Frame 2: An incoming data packet — labelled with source address.
→ Frame 3: The firewall inspecting the packet — scanning symbol.
→ Frame 4: A "PASS" or "BLOCK" decision output.

**Floor 2** — checks sender IP and data type
→ Frame 1: A packet with an IP address tag.
→ Frame 2: The firewall's rulebook — a list of allowed addresses.
→ Frame 3: The IP being checked against the rulebook.
→ Frame 4: Match found → green indicator. No match → red indicator.

**Floor 3** — trusted source: passes through
→ Frame 1: A known IP address tag — familiar pattern.
→ Frame 2: The firewall gate opening — green light.
→ Frame 3: Packet sliding through the gate.
→ Frame 4: Data reaching the protected computer — delivered safely.

**Floor 4** — suspicious source: dropped silently
→ Frame 1: An unknown IP address tag — unfamiliar pattern.
→ Frame 2: The firewall gate staying closed — red light.
→ Frame 3: The packet being dropped — disappearing.
→ Frame 4: The computer safe — no breach.

---

### BB 1245 — The Eavesdropper Problem (encryption)

**Floor 0** — firewall protects the machine; not the data in transit
→ Frame 1: A firewall protecting a computer — inside safe.
→ Frame 2: Data leaving the computer as radio waves.
→ Frame 3: The waves spreading out through open air.
→ Frame 4: An eavesdropper antenna picking up the waves — outside the firewall.

**Floor 1** — Wi-Fi as radio waves through open air
→ Frame 1: A Wi-Fi router emitting circular radio waves.
→ Frame 2: The waves spreading in all directions — through walls.
→ Frame 3: A coffee shop setting — multiple devices and people.
→ Frame 4: An antenna catching the waves — anyone can grab them.

**Floor 2** — eavesdropper intercepts plain-text packet
→ Frame 1: A data packet labelled "PASSWORD: 1234" floating in the air.
→ Frame 2: An antenna catching the packet.
→ Frame 3: The eavesdropper reading the plain label — successful theft.
→ Frame 4: A lock icon crossed out — no protection in place.

---

### BB 1246 — The Math of Secrets (encryption)

**Floor 0** — encryption scrambles the 1s and 0s
→ Frame 1: A clear data packet — readable label.
→ Frame 2: The packet entering an encryption box.
→ Frame 3: The packet emerging — label now scrambled, unreadable.
→ Frame 4: The scrambled packet transmitted through the air.

**Floor 1** — mathematical algorithm scrambles data
→ Frame 1: A mathematical lock icon — combination-style.
→ Frame 2: Data stream being fed into the lock.
→ Frame 3: Scrambled output — random pattern emerging.
→ Frame 4: The scrambled data flying through the air — indecipherable.

**Floor 2** — eavesdropper sees only garbage
→ Frame 1: An eavesdropper antenna catching a scrambled packet.
→ Frame 2: The scrambled contents shown — noise pattern.
→ Frame 3: A confused eavesdropper silhouette — unable to read it.
→ Frame 4: The garbage data — worthless without the key.

**Floor 3** — receiver needs the exact key to unscramble
→ Frame 1: A locked box — the scrambled data inside.
→ Frame 2: A key approaching the box.
→ Frame 3: The key inserted — box unlocking.
→ Frame 4: Original data revealed — readable again.

---

### BB 1247 — The Public Key (encryption)

**Floor 0** — paradox: sharing a key in a crowded room
→ Frame 1: A crowded room with many people — pixel art crowd.
→ Frame 2: Two people trying to hand each other a secret key.
→ Frame 3: Eavesdroppers watching the key exchange.
→ Frame 4: The key intercepted — problem demonstrated.

**Floor 1** — browser and server need same key
→ Frame 1: A browser and server — both ends of a connection.
→ Frame 2: A key being created on the server side.
→ Frame 3: The key travelling across the network to the browser.
→ Frame 4: An eavesdropper intercepts it en route.

**Floor 2** — sending the key insecurely defeats encryption
→ Frame 1: A locked chest — the data.
→ Frame 2: The key sent separately — unprotected.
→ Frame 3: Key intercepted — thief now has both key and chest.
→ Frame 4: The lock opened by the thief — encryption broken.

**Floor 3** — 1970s: Public Key Cryptography invented
→ Frame 1: A padlock — can be locked by anyone (public).
→ Frame 2: The same padlock open — only the owner has the key (private).
→ Frame 3: The store broadcasting an open padlock to the world.
→ Frame 4: The buyer locking their message with the padlock — only store can open it.

**Floor 4** — public lock encrypts; private key decrypts
→ Frame 1: An open padlock — the public lock, freely given.
→ Frame 2: A message being locked with the public padlock.
→ Frame 3: The locked message sent across the network.
→ Frame 4: The private key unlocking the message on the receiver's end.

---

### BB 1248 — The Zero-Day Flaw (cybersecurity)

**Floor 0** — software written by humans contains bugs
→ Frame 1: A code editor screen with a long list of lines.
→ Frame 2: A magnified view — one highlighted line with a subtle error.
→ Frame 3: A bug icon (pixel beetle) on the code line.
→ Frame 4: 50 million lines of code represented as a very tall stack.

**Floor 1** — 50M lines of code: bugs inevitable
→ Frame 1: A stack of pages representing the codebase — very tall tower.
→ Frame 2: A single page pulled from the stack — error highlighted.
→ Frame 3: The error as a crack in a wall — structural weakness.
→ Frame 4: A hacker silhouette noticing the crack.

**Floor 2** — bug discovered: lets hacker bypass firewall
→ Frame 1: A firewall wall — solid, protecting the server.
→ Frame 2: A small crack appearing in the wall — the bug.
→ Frame 3: A hacker hand reaching through the crack.
→ Frame 4: The firewall bypassed — hacker inside.

**Floor 3** — hacker finds flaw before creator
→ Frame 1: A race — two silhouettes running toward a finish line.
→ Frame 2: Hacker silhouette reaching the flaw first.
→ Frame 3: Developer silhouette arriving after — too late.
→ Frame 4: A "0 DAYS" counter — the zero-day label.

**Floor 4** — zero-day: creators have 0 days to fix it
→ Frame 1: A calendar showing "Day 0" — no time to patch.
→ Frame 2: The flaw being exploited — data leaking out.
→ Frame 3: A government building silhouette — agencies hoarding these flaws.
→ Frame 4: A dollar sign on the flaw — sold on the black market.

---

### BB 1249 — The Weakest Link (social-engineering)

**Floor 0** — the system is broken by a human
→ Frame 1: A fortress of firewalls and encryption — impenetrable.
→ Frame 2: A single human figure standing outside the fortress.
→ Frame 3: The human opening the front door willingly.
→ Frame 4: The attacker walking through the open door.

**Floor 1** — technical failure rarely the cause
→ Frame 1: A lock picking tool approaching a lock — repelled.
→ Frame 2: A hacker at a keyboard trying complex techniques — failing.
→ Frame 3: A phone receiver — old-fashioned telephone.
→ Frame 4: The same hacker making a phone call — smiling.

**Floor 2** — social engineering: call and pretend to be IT
→ Frame 1: A desk phone ringing.
→ Frame 2: An employee picking up the phone.
→ Frame 3: A caller on the other end — presenting as authority figure.
→ Frame 4: The employee at a keyboard — about to type their password.

**Floor 3** — phishing via email
→ Frame 1: An email inbox with one suspicious message.
→ Frame 2: The email opened — urgent tone, official-looking logo.
→ Frame 3: A link in the email — "Click here".
→ Frame 4: The link clicked — credentials being harvested.

**Floor 4** — human psychology bypasses digital locks
→ Frame 1: A massive steel vault door — physically secure.
→ Frame 2: A person handing over a key to a stranger voluntarily.
→ Frame 3: The stranger — attacker — walking through the vault door.
→ Frame 4: A simple lock and a human brain — the brain is the vulnerability.

---

### BB 1250 — The Local Room (LAN)

**Floor 0** — local networks: small and isolated
→ Frame 1: A living room with a TV, phone, and laptop visible.
→ Frame 2: All three connected by invisible lines to a central hub.
→ Frame 3: The hub — a Wi-Fi router box.
→ Frame 4: A boundary around the room — the LAN bubble.

**Floor 1** — home Wi-Fi LAN
→ Frame 1: A Wi-Fi router on a shelf, broadcasting waves.
→ Frame 2: A laptop catching the waves — connected.
→ Frame 3: A smartphone catching the waves — also connected.
→ Frame 4: A smart TV connected — the local network complete.

**Floor 2** — router as central hub
→ Frame 1: The router isolated — star of the network.
→ Frame 2: Lines extending from the router to each device.
→ Frame 3: Data moving from the phone to the TV via the router.
→ Frame 4: The router managing traffic — a digital traffic director.

**Floor 3** — cable cut: internet gone but LAN intact
→ Frame 1: A thick cable running from the router to the outside world.
→ Frame 2: The cable cut — severed.
→ Frame 3: The router still broadcasting locally — green light.
→ Frame 4: Devices still communicating with each other — LAN alive.

---

### BB 1251 — The Wide Area (WAN)

**Floor 0** — connecting two separate LANs
→ Frame 1: Two separate LAN bubbles — one in New York, one in London.
→ Frame 2: A long cable running between the two cities (undersea).
→ Frame 3: The cable connecting the two routers.
→ Frame 4: Data travelling from one LAN to the other.

**Floor 1** — WAN covers massive distances
→ Frame 1: A globe with two points marked — cities connected.
→ Frame 2: A fibre-optic cable laid across the ocean floor.
→ Frame 3: Light pulses travelling through the fibre.
→ Frame 4: The two LANs now linked — a WAN formed.

**Floor 2** — the internet: biggest WAN
→ Frame 1: A globe covered in interconnected lines — every country linked.
→ Frame 2: A LAN bubble in one country.
→ Frame 3: A LAN bubble in another — connected by the global web.
→ Frame 4: The internet as a vast, chaotic web of lines — the largest WAN.

---

### BB 1252 — The short-range radio (bluetooth)

**Floor 0** — Wi-Fi vs Bluetooth: different jobs
→ Frame 1: A house with Wi-Fi waves filling every room.
→ Frame 2: A single earbud — tiny device.
→ Frame 3: The earbud trying to use Wi-Fi — battery dying.
→ Frame 4: A Bluetooth symbol appearing instead — low-power alternative.

**Floor 1** — Wi-Fi floods a house with high-speed data
→ Frame 1: A router broadcasting wide arcs — covering the whole house.
→ Frame 2: The signal passing through walls — strong, far-reaching.
→ Frame 3: A power meter showing high energy consumption.
→ Frame 4: Multiple devices benefiting — laptop, phone, TV.

**Floor 2** — Wi-Fi drains small batteries
→ Frame 1: A small earbud battery — tiny cell.
→ Frame 2: Wi-Fi signal draining it rapidly — battery meter dropping.
→ Frame 3: The earbud dying — power out.
→ Frame 4: The need for a more efficient protocol shown.

**Floor 3** — Bluetooth: same radio, heavily restricted
→ Frame 1: Bluetooth symbol on a chip — identical frequency band as Wi-Fi.
→ Frame 2: The Bluetooth signal shown as a short, small arc — nearby only.
→ Frame 3: Range limit: just a few meters — shown as a small bubble.
→ Frame 4: The earbud and phone — within the bubble — connected.

**Floor 4** — Bluetooth trades distance for battery efficiency
→ Frame 1: A power meter showing low consumption — Bluetooth active.
→ Frame 2: An earbud battery lasting all day.
→ Frame 3: The phone and earbud connected — a few meters apart.
→ Frame 4: A Wi-Fi router and a Bluetooth chip side by side — size contrast.

---

### BB 1253 — The physical limits of computing (cloud-computing)

**Floor 0** — every task needs processing power and memory
→ Frame 1: A CPU chip — the processor.
→ Frame 2: RAM chips — the memory.
→ Frame 3: Both on a motherboard together.
→ Frame 4: A heavy task crushing the motherboard — overloaded.

**Floor 1** — processor and RAM
→ Frame 1: A CPU chip isolated — labelled.
→ Frame 2: A RAM stick — labelled.
→ Frame 3: The two communicating via bus lines.
→ Frame 4: A progress bar — task running — memory filling up.

**Floor 2** — complex task crashes a single computer
→ Frame 1: A single desktop computer — working normally.
→ Frame 2: A massive AI training task being assigned to it.
→ Frame 3: RAM overflowing — bar turning red.
→ Frame 4: The computer crashing — screen going dark.

**Floor 3** — companies used private server rooms
→ Frame 1: A back room filled with server racks.
→ Frame 2: Blinking lights on server units — processing.
→ Frame 3: Air conditioning units — cooling the heat.
→ Frame 4: A single company logo on the door — private ownership.

---

### BB 1254 — Someone else's computer (cloud-computing)

**Floor 0** — private server rooms are inefficient
→ Frame 1: A server room during a traffic spike — systems maxed out.
→ Frame 2: The same room during off-hours — machines idle, still consuming power.
→ Frame 3: A power meter showing wasted electricity.
→ Frame 4: A frustrated IT administrator looking at the idle servers.

**Floor 1** — cloud computing: rent someone else's computer
→ Frame 1: A cloud icon — the marketing symbol.
→ Frame 2: Inside the cloud: a vast warehouse of server racks.
→ Frame 3: A company renting a fraction — a small slice highlighted.
→ Frame 4: The rented slice glowing — actively processing for the company.

**Floor 2** — cloud = warehouse of servers
→ Frame 1: A warehouse building exterior.
→ Frame 2: Inside: rows of server racks stretching into the distance.
→ Frame 3: Each rack with blinking status lights.
→ Frame 4: Fibre cables leaving the building — connected to the internet.

**Floor 3** — rent processing power on demand
→ Frame 1: A slider control — "computing power: 1x" → sliding to "100x".
→ Frame 2: The company's workload increasing — bars rising.
→ Frame 3: Cloud servers spinning up — extra capacity appearing.
→ Frame 4: After the work: capacity released — slider back to 1x.

**Floor 4** — click, rent, release when done
→ Frame 1: A single button: "Scale up".
→ Frame 2: The button pressed — server capacity expanding.
→ Frame 3: Task completed — workload done.
→ Frame 4: The "Release" button pressed — capacity returned.

---

### BB 1255 — The outsourced brain (cloud-computing)

**Floor 0** — phone outsources heavy lifting to cloud
→ Frame 1: A smartphone — compact, limited hardware.
→ Frame 2: A voice question being spoken to the phone.
→ Frame 3: The audio being packaged as a data packet.
→ Frame 4: The packet launching from the phone toward a distant server.

**Floor 1** — smartphone powerful but limited
→ Frame 1: A smartphone chip — small but capable.
→ Frame 2: A complex voice-recognition task arriving.
→ Frame 3: The chip struggling — overheating indicator.
→ Frame 4: The phone handing the task off to the network.

**Floor 2** — phone records audio, sends to server
→ Frame 1: A microphone icon on the phone screen.
→ Frame 2: Sound waves being captured — audio recorded.
→ Frame 3: The audio file packaged — small data packet.
→ Frame 4: The packet sent — flying through the network.

**Floor 3** — warehouse server crunches the data
→ Frame 1: The packet arriving at a distant server rack.
→ Frame 2: Multiple CPU chips processing the audio.
→ Frame 3: The result computed — a text response.
→ Frame 4: The response packaged as a tiny text packet.

**Floor 4** — phone = microphone and screen; thinking is elsewhere
→ Frame 1: A phone with just a microphone and screen highlighted.
→ Frame 2: A far-away server rack — the actual brain.
→ Frame 3: The answer packet flying back to the phone.
→ Frame 4: The phone displaying the answer — the illusion of local intelligence.

---

### BB 1256 — The Stored Program (von-neumann)

**Floor 0** — early computers: hardware was the software
→ Frame 1: A 1940s computer — room-sized, with visible cables everywhere.
→ Frame 2: An engineer physically rerouting cables by hand.
→ Frame 3: Hundreds of plugboards and patch cables.
→ Frame 4: Days of rewiring to change the program.

**Floor 1** — 1945: von Neumann's design
→ Frame 1: A blueprint/schematic — labelled "Architecture Diagram".
→ Frame 2: Two boxes: MEMORY and PROCESSOR — connected.
→ Frame 3: The memory box holding both instructions and data.
→ Frame 4: A single unified structure — elegant, simplified.

**Floor 2** — instructions and data stored together as 1s and 0s
→ Frame 1: A memory bank — a grid of cells.
→ Frame 2: Some cells holding data (numbers).
→ Frame 3: Other cells holding instructions (also just numbers).
→ Frame 4: Both types indistinguishable — same format, different meaning.

**Floor 3** — rewrite memory, change behavior in milliseconds
→ Frame 1: A memory grid — current program loaded.
→ Frame 2: New instructions being written — cells flipping.
→ Frame 3: The program changed — no physical rewiring needed.
→ Frame 4: The machine running the new program immediately.

---

### BB 1257 — The Working Grid (RAM)

**Floor 0** — RAM: the workspace
→ Frame 1: A vast grid of tiny squares — the RAM array.
→ Frame 2: Each square either glowing (1) or dark (0).
→ Frame 3: A CPU reading specific squares rapidly.
→ Frame 4: New data written — squares changing state.

**Floor 1** — grid of capacitors: charged = 1, empty = 0
→ Frame 1: A single capacitor — charged, glowing.
→ Frame 2: The same capacitor — empty, dark.
→ Frame 3: A 4x4 grid of capacitors — random on/off pattern.
→ Frame 4: The pattern representing a byte of data.

**Floor 2** — every cell has an address: random access
→ Frame 1: The RAM grid with coordinates on each axis.
→ Frame 2: An address: "Row 4, Column 7" — highlighted cell.
→ Frame 3: The CPU jumping directly to that cell — no scanning.
→ Frame 4: Data retrieved instantly — "random access" demonstrated.

**Floor 3** — RAM is volatile: cut power, all data lost
→ Frame 1: The RAM grid fully lit — data stored.
→ Frame 2: A power plug being pulled.
→ Frame 3: The grid going dark instantly — all cells emptying.
→ Frame 4: A "0000 0000" pattern — everything zeroed out.

**Floor 4** — temporary workspace only
→ Frame 1: RAM labelled "TEMPORARY" — a whiteboard analogy.
→ Frame 2: Data written to RAM — on the whiteboard.
→ Frame 3: Power off — whiteboard erased.
→ Frame 4: A hard drive contrasted — permanent storage.

---

### BB 1258 — The Core (CPU)

**Floor 0** — CPU reads RAM and executes
→ Frame 1: A CPU chip connected to RAM chips via bus lines.
→ Frame 2: An instruction being fetched from RAM.
→ Frame 3: The CPU receiving the instruction.
→ Frame 4: The CPU outputting a result.

**Floor 1** — Control Unit: traffic director
→ Frame 1: The CPU chip with sections highlighted.
→ Frame 2: The Control Unit section lit up — directing.
→ Frame 3: An instruction arriving — CU decoding it.
→ Frame 4: The CU routing the instruction to the correct subsystem.

**Floor 2** — ALU: the math engine
→ Frame 1: The ALU section of the CPU lit up.
→ Frame 2: Two numbers arriving at the ALU.
→ Frame 3: AND/OR gates inside — processing.
→ Frame 4: A result number emerging from the ALU.

**Floor 3** — Registers: ultra-fast storage next to ALU
→ Frame 1: A row of small register cells — directly beside the ALU.
→ Frame 2: A number loaded into a register — instant access.
→ Frame 3: The ALU reaching into the register — no delay.
→ Frame 4: The result stored back in a register.

---

### BB 1259 — The Copper Highway (system-bus)

**Floor 0** — CPU and RAM are separate chips
→ Frame 1: CPU chip on one side of a motherboard.
→ Frame 2: RAM chips on the other side.
→ Frame 3: A gap between them — they must communicate.
→ Frame 4: A dense cluster of copper traces connecting them — the bus.

**Floor 1** — System Bus: cluster of copper traces
→ Frame 1: Microscopic copper traces on a green circuit board — close-up.
→ Frame 2: A bundle of parallel traces running horizontally.
→ Frame 3: Data signals (light pulses) travelling down the traces.
→ Frame 4: The traces arriving at the CPU pins.

**Floor 2** — Address Bus and Data Bus: separate lanes
→ Frame 1: The bus split into two groups: Address lanes and Data lanes.
→ Frame 2: Address lane sending a coordinate to RAM.
→ Frame 3: RAM locating the cell at that address.
→ Frame 4: Data lane carrying the content back to CPU.

**Floor 3** — 64-bit bus: 64 lanes wide
→ Frame 1: A 64-lane highway — each lane a copper trace.
→ Frame 2: 64 bits travelling in parallel — all at once.
→ Frame 3: A narrower 8-lane bus beside it — far slower.
→ Frame 4: The 64-lane bus delivering vastly more data per pulse.

**Floor 4** — wider bus = more data per cycle
→ Frame 1: A single lane road vs a 64-lane highway — pixel art.
→ Frame 2: Cars (data) moving one at a time on the narrow road.
→ Frame 3: 64 cars moving in parallel on the highway.
→ Frame 4: The CPU receiving 64 bits in one clock tick.

---

### BB 1260 — The Heartbeat (clock-cycle)

**Floor 0** — synchronization via clock signal
→ Frame 1: A quartz crystal — small, mineral structure.
→ Frame 2: Electricity applied to the crystal — it starts vibrating.
→ Frame 3: The vibration producing a regular square-wave signal.
→ Frame 4: The signal feeding into the CPU — the heartbeat.

**Floor 1** — quartz crystal vibrates at flawless frequency
→ Frame 1: A quartz crystal isolated — piezoelectric mineral.
→ Frame 2: Vibration lines emanating from the crystal.
→ Frame 3: A perfect square wave — regular, unwavering.
→ Frame 4: The frequency meter: 3,000,000,000 Hz — 3 GHz.

**Floor 2** — every clock pulse = one CPU step
→ Frame 1: A clock pulse arriving — one tick.
→ Frame 2: The CPU executing one step — "FETCH" highlighted.
→ Frame 3: Next tick — "DECODE" highlighted.
→ Frame 4: Next tick — "EXECUTE" highlighted.

**Floor 3** — Fetch-Decode-Execute cycle
→ Frame 1: A three-stage pipeline: FETCH → DECODE → EXECUTE.
→ Frame 2: An instruction moving through FETCH stage.
→ Frame 3: The instruction moving to DECODE.
→ Frame 4: The instruction executing — result produced.

**Floor 4** — 3 GHz = 3 billion cycles per second
→ Frame 1: The clock cycle count: 1 billion, 2 billion, 3 billion — ticking.
→ Frame 2: A single instruction completing in one nanosecond.
→ Frame 3: A human blink — 150 milliseconds — 450 million cycles passed.
→ Frame 4: The CPU still processing — relentless, mechanical precision.

---

### BB 1261 — The Von Neumann Bottleneck (cpu-architecture)

**Floor 0** — CPU fast; RAM can't keep up
→ Frame 1: A high-speed racing car — the CPU.
→ Frame 2: A slow truck delivering fuel — the RAM.
→ Frame 3: The racing car waiting for the truck — stalled.
→ Frame 4: The truck finally arriving — the bottleneck illustrated.

**Floor 1** — CPU executes 3 billion per second
→ Frame 1: The CPU chip — 3 GHz speed shown.
→ Frame 2: Instructions being consumed rapidly — counter spinning.
→ Frame 3: The RAM pipeline feeding instructions.
→ Frame 4: The RAM not keeping pace — gaps appearing.

**Floor 2** — RAM introduces delay: physical distance + capacitor delay
→ Frame 1: The distance between CPU and RAM chips — the copper bus.
→ Frame 2: Light travelling the length of the bus — microscopic delay.
→ Frame 3: A capacitor in RAM — stabilizing before readable.
→ Frame 4: The CPU waiting — idle — during the delay.

**Floor 3** — Von Neumann Bottleneck: CPU idle waiting for data
→ Frame 1: The CPU with a "WAITING" indicator.
→ Frame 2: The RAM still processing — not ready yet.
→ Frame 3: Clock ticks passing — CPU does nothing.
→ Frame 4: The data finally arriving — wasted cycles counted.

**Floor 4** — processor only as fast as its data supply
→ Frame 1: A powerful engine — stopped — no fuel.
→ Frame 2: The CPU — fastest chip — stalled waiting for RAM.
→ Frame 3: A starved CPU vs a well-fed CPU: performance gap.
→ Frame 4: The bottleneck: the highway between CPU and RAM, not the CPU itself.

---

### BB 1262 — The Cache Hierarchy (cache)

**Floor 0** — cache memory built into the CPU
→ Frame 1: The CPU chip with internal sections labelled.
→ Frame 2: A highlighted area close to the ALU — the L1 cache.
→ Frame 3: A larger but more distant section — the L3 cache.
→ Frame 4: RAM far outside the chip boundary — slowest tier.

**Floor 1** — SRAM: faster than regular RAM
→ Frame 1: A standard RAM capacitor grid — must refresh constantly.
→ Frame 2: An SRAM cell — static, no refresh needed.
→ Frame 3: The SRAM access time — faster indicator.
→ Frame 4: SRAM inside the CPU die — on the same silicon.

**Floor 2** — L1, L2, L3 cache levels
→ Frame 1: Three concentric rings around the CPU core.
→ Frame 2: L1 — innermost, smallest, fastest.
→ Frame 3: L2 — middle ring, larger, slightly slower.
→ Frame 4: L3 — outermost, largest, slowest of the three.

**Floor 3** — algorithms predict and pre-fetch needed data
→ Frame 1: A prefetch arrow: data pulled from RAM before the CPU asks.
→ Frame 2: The data arriving in L1 cache — ready and waiting.
→ Frame 3: The CPU asking for the data — already there.
→ Frame 4: Zero wait time — bottleneck bypassed.

**Floor 4** — cache hit: data already next to gates
→ Frame 1: CPU reaches for data — L1 cache responds instantly.
→ Frame 2: A "CACHE HIT" indicator glowing.
→ Frame 3: No bus traffic needed — RAM not consulted.
→ Frame 4: The ALU receiving data at full CPU speed.

---

### BB 1263 — The Assembly Line (pipelining)

**Floor 0** — basic CPU: one instruction at a time
→ Frame 1: A single worker doing all three tasks: FETCH, DECODE, EXECUTE sequentially.
→ Frame 2: Each task taking one clock tick.
→ Frame 3: The DECODE stage idling while EXECUTE runs.
→ Frame 4: Idle time shown as dark gaps in the timeline.

**Floor 1** — pipeline: overlap the stages
→ Frame 1: A factory assembly line — three stations along a conveyor.
→ Frame 2: Station 1 (FETCH) working on Instruction A.
→ Frame 3: Station 2 (DECODE) simultaneously working on Instruction B.
→ Frame 4: Station 3 (EXECUTE) simultaneously working on Instruction C.

**Floor 2** — weld AND, OR, NOT gates run in parallel
→ Frame 1: FETCH circuit active on Instruction 3.
→ Frame 2: DECODE circuit active on Instruction 2 simultaneously.
→ Frame 3: EXECUTE circuit active on Instruction 1 simultaneously.
→ Frame 4: All three stages running in perfect parallel — no idle time.

**Floor 3** — stagger across substructures
→ Frame 1: A timeline with three rows: FETCH, DECODE, EXECUTE.
→ Frame 2: Instructions shown staggered across the timeline.
→ Frame 3: Every clock tick produces one completed instruction.
→ Frame 4: Throughput: 1 result per tick, despite each taking 3 ticks.

**Floor 4** — one completed calculation per tick
→ Frame 1: A completed instruction emerging from the pipeline every single tick.
→ Frame 2: Without pipelining: one instruction per three ticks.
→ Frame 3: With pipelining: one instruction per tick — 3x throughput.
→ Frame 4: The assembly line — the most efficient industrial method, applied to chips.

---

### BB 1264 — The Branch Prediction Guess (branch-prediction)

**Floor 0** — pipeline breaks at IF-THEN
→ Frame 1: A smooth pipeline — instructions flowing.
→ Frame 2: An IF-THEN diamond appearing in the code.
→ Frame 3: The pipeline hitting the branch — uncertainty.
→ Frame 4: The pipeline stalling — no instruction to fetch next.

**Floor 1** — don't know which path until math is done
→ Frame 1: A fork in the pipeline — two possible paths.
→ Frame 2: Path A and Path B — unknown which to follow.
→ Frame 3: The CPU halted — waiting for the condition to resolve.
→ Frame 4: Clock ticks wasted — pipeline empty.

**Floor 2** — Branch Predictor: guess based on history
→ Frame 1: A history log of past branch decisions.
→ Frame 2: The predictor analysing the pattern.
→ Frame 3: A guess made — one path chosen speculatively.
→ Frame 4: Instructions pre-fetched from the guessed path.

**Floor 3** — speculative execution: start before confirmed
→ Frame 1: The CPU executing speculatively — work done in advance.
→ Frame 2: The actual branch condition resolving — correct guess!
→ Frame 3: The speculative work confirmed — pipeline never stalled.
→ Frame 4: Incorrect guess scenario — work flushed, start over.

**Floor 4** — 95%+ accuracy rate: billions of saved cycles
→ Frame 1: A success counter: 95 out of 100 correct.
→ Frame 2: Cycles saved visualised — a large stack of ticks.
→ Frame 3: The 5% wrong: flush and retry — small cost.
→ Frame 4: Net gain: massive throughput improvement from prediction.

---

### BB 1265 — Scaling Sideways (multi-core)

**Floor 0** — clock speed hit physics wall
→ Frame 1: A clock speed meter climbing: 1GHz, 2GHz, 3GHz, 4GHz.
→ Frame 2: The meter approaching 5GHz — warning indicator.
→ Frame 3: Heat waves rising from the chip — thermal danger.
→ Frame 4: The chip at its limit — clock speed cannot go higher.

**Floor 1** — pushing clock to 5GHz: chip melts
→ Frame 1: A chip at 5GHz — overheating.
→ Frame 2: Silicon crystal structure shown — at temperature limit.
→ Frame 3: Thermal runaway — chip degrading.
→ Frame 4: The silicon melting — physical limit reached.

**Floor 2** — scale horizontally: copy the architecture
→ Frame 1: A single CPU core — complete with CU, ALU, L1 cache.
→ Frame 2: A second identical core stamped beside it.
→ Frame 3: A third and fourth core — quad-core layout.
→ Frame 4: All four cores on one piece of silicon.

**Floor 3** — quad-core: four independent CPUs on one chip
→ Frame 1: Four separate core blocks on a die — all labelled CORE 1-4.
→ Frame 2: Each core processing its own pipeline simultaneously.
→ Frame 3: Four streams of instructions executing in parallel.
→ Frame 4: The single chip outputting four results per tick.

**Floor 4** — divide workload: four pipelines simultaneously
→ Frame 1: A large task split into four equal parts.
→ Frame 2: Each part assigned to one core.
→ Frame 3: All four cores working in parallel — finishing together.
→ Frame 4: Total time: one quarter of what a single core needed.

---

## THE ATOM (Chemistry)

### BB 1094 — The smallest piece

**Floor 0** — cutting foil, dividing matter
→ Frame 1: A single sheet of aluminum foil, shiny and intact.
→ Frame 2: The foil cut cleanly in half — two equal pieces.
→ Frame 3: One half cut again — now four pieces.
→ Frame 4: A microscopic pair of scissors hovering over a tiny speck of foil.
→ Frame 5: The speck cut — smaller than the eye can see.

**Floor 1** — ancient debate: can you cut forever?
→ Frame 1: A Greek philosopher in profile, deep in thought, pixel art.
→ Frame 2: An endless staircase descending into darkness — representing infinite division.
→ Frame 3: A solid wall at the bottom — a hard limit, a barrier.
→ Frame 4: A single question mark floating above the wall.

**Floor 2** — atomos, the uncuttable piece
→ Frame 1: Ancient Greek column and scroll, classical era.
→ Frame 2: The word "ATOMOS" carved into stone, pixel style.
→ Frame 3: A chisel striking a block of stone — it will not split further.
→ Frame 4: A single glowing marble, isolated on dark navy — the uncuttable piece.

**Floor 3** — reaching the atom
→ Frame 1: A chain of aluminum atoms arranged in a neat grid.
→ Frame 2: Zooming in — the grid becomes visible as individual spheres.
→ Frame 3: One single aluminum atom isolated — bright and distinct.
→ Frame 4: A chisel attempting to split it — the atom resists, glowing.

---

### BB 1095 — Are we sure?

**Floor 0** — atom as guess, too small for light
→ Frame 1: A scientist at a desk, candle flickering, deep in thought.
→ Frame 2: A wavy line representing a light wave passing above a tiny atom.
→ Frame 3: The light wave completely missing the atom — it's too large a wavelength.
→ Frame 4: A pencil sketch of an atom with a question mark beside it.

**Floor 1** — how do we know?
→ Frame 1: A large question mark floating in a dark void.
→ Frame 2: A microscope silhouette against a lab window.
→ Frame 3: A beam of tiny particles (electrons) bouncing off a surface.
→ Frame 4: The reflected beam creating a pattern on a detector.

**Floor 2** — electron microscopes
→ Frame 1: A massive electron microscope — pixel art, imposing.
→ Frame 2: A tiny beam scanning across a metal surface.
→ Frame 3: The beam bouncing back, revealing bumps in the surface.
→ Frame 4: A monitor screen flickering to life.

**Floor 3** — seeing atoms on screen
→ Frame 1: A computer monitor glowing in a dark lab.
→ Frame 2: Fuzzy shapes appearing on the screen — getting clearer.
→ Frame 3: Rows of fuzzy spheres arranged in a perfect grid — atoms visible.
→ Frame 4: A scientist pointing at the screen — confirmation achieved.

---

### BB 1096 — The absolute smallest?

**Floor 0** — atom has pieces
→ Frame 1: A single atom, whole and intact — a bright sphere.
→ Frame 2: The atom cracking open — a smaller dense center visible inside.
→ Frame 3: Tiny specks flying around the dense center — electrons.
→ Frame 4: The dense center glowing — the nucleus revealed.

**Floor 1** — nucleus and electrons
→ Frame 1: A heavy, dense sphere at center — the nucleus.
→ Frame 2: Tiny glowing dots appearing in orbits around the nucleus.
→ Frame 3: The electrons zipping at incredible speeds — motion lines.
→ Frame 4: The complete atomic model: nucleus + electron cloud.

**Floor 2** — smashing atoms
→ Frame 1: A hammer swinging toward an aluminum atom.
→ Frame 2: The atom shattering into pieces — nucleus fragments and electrons flying.
→ Frame 3: A pile of generic, raw parts — not aluminum anymore.
→ Frame 4: A gold atom being smashed — same generic parts as the aluminum.

**Floor 3** — smallest piece with identity
→ Frame 1: An intact aluminum atom — bright, labeled as aluminum.
→ Frame 2: A gold atom beside it — identical electron, same raw parts visible.
→ Frame 3: Both atoms side by side — the electrons look exactly the same.
→ Frame 4: One aluminum atom, whole — the smallest piece that is still aluminum.

---

### BB 1097 — Elements

**Floor 0** — different atoms behave differently
→ Frame 1: A bar of aluminum — silver, solid, lightweight.
→ Frame 2: A bar of iron — dark gray, heavy, solid.
→ Frame 3: A bar of gold — bright yellow, gleaming, dense.
→ Frame 4: All three bars side by side — visually different.

**Floor 1** — heavy center vs light center
→ Frame 1: A hydrogen atom — tiny nucleus, one electron orbiting.
→ Frame 2: An oxygen atom — larger nucleus, eight electrons orbiting.
→ Frame 3: A gold atom — massive nucleus, many electrons in rings.
→ Frame 4: Three atoms side by side, dramatically different sizes.

**Floor 2** — element definition
→ Frame 1: A single hydrogen atom — isolated, bright.
→ Frame 2: A single oxygen atom — different, distinct.
→ Frame 3: The word "ELEMENT" appearing beneath each atom.
→ Frame 4: A grid of identical hydrogen atoms — all the same.

**Floor 3** — gold bar, identical atoms
→ Frame 1: A solid gold bar, gleaming.
→ Frame 2: Zooming into the bar — a grid of identical gold atoms.
→ Frame 3: Further zoom — every atom in the grid is exactly identical.
→ Frame 4: One single gold atom pulled out — identical to all the others.

---

### BB 1098 — The identity badge

**Floor 0** — hydrogen vs oxygen paradox
→ Frame 1: A hydrogen atom — small, single proton glowing in center.
→ Frame 2: An oxygen atom — larger, eight protons in center.
→ Frame 3: Hydrogen gas exploding — fire and flames.
→ Frame 4: A person breathing — oxygen sustaining life.

**Floor 1** — counting
→ Frame 1: A hand holding up one finger — the number 1.
→ Frame 2: The same hand near a hydrogen atom — matching count.
→ Frame 3: Eight fingers held up — the number 8.
→ Frame 4: The hands near an oxygen atom — matching count.

**Floor 2** — protons as identity badge
→ Frame 1: The nucleus of an atom — protons clustered tightly.
→ Frame 2: A single proton highlighted — glowing bright.
→ Frame 3: An ID badge floating beside the nucleus — "IDENTITY".
→ Frame 4: The badge stamped with the proton count.

**Floor 3** — 1 proton = Hydrogen, 8 = Oxygen
→ Frame 1: One proton alone in a nucleus — labeled Hydrogen.
→ Frame 2: Eight protons packed in a nucleus — labeled Oxygen.
→ Frame 3: The hydrogen nucleus with one proton — glowing with identity.
→ Frame 4: The oxygen nucleus — identical structure, just more protons.

**Floor 4** — changing protons = new element
→ Frame 1: A hydrogen atom with one proton.
→ Frame 2: A second proton being forced into the nucleus.
→ Frame 3: The atom transforming — no longer hydrogen.
→ Frame 4: A completely new element — identity changed forever.

---

### BB 1099 — The inventory

**Floor 0** — millions of substances but few elements
→ Frame 1: A vast landscape of objects — trees, rocks, water, metal.
→ Frame 2: Zooming into the rock — revealing atoms in a grid.
→ Frame 3: Zooming into water — revealing H2O molecules.
→ Frame 4: All objects composed of the same small set of atom types.

**Floor 1** — ~100 elements in nature
→ Frame 1: A large number "100" glowing on screen.
→ Frame 2: Empty slots appearing — exactly 100 of them.
→ Frame 3: Atoms filling each slot — each one different.
→ Frame 4: All 100 slots filled — the complete set.

**Floor 2** — Periodic Table as inventory
→ Frame 1: A large grid appearing — rows and columns.
→ Frame 2: Atomic symbols filling the grid squares — H, He, Li, Be.
→ Frame 3: The full Periodic Table — all elements present.
→ Frame 4: A clipboard beside the table — "INVENTORY" written at top.

**Floor 3** — everything from 100 atoms
→ Frame 1: A mountain — massive, solid, geological.
→ Frame 2: A human figure standing beside the mountain.
→ Frame 3: A tree — organic, living, growing.
→ Frame 4: All three built from the same 100 atom types — the Periodic Table overlaying.

---

### BB 1100 — Flesh and bone

**Floor 0** — living things made of atoms?
→ Frame 1: A rock — gray, solid, inorganic.
→ Frame 2: A tree — brown trunk, green leaves.
→ Frame 3: A human figure — warm, alive, thinking.
→ Frame 4: All three side by side — are they made of the same stuff?

**Floor 1** — no special life particle
→ Frame 1: A glowing, mystical particle — labeled "LIFE?" — floating.
→ Frame 2: The particle fading — dissolving into nothing.
→ Frame 3: An X mark through the mystical particle — it does not exist.
→ Frame 4: Ordinary atoms replacing the void — the real building blocks.

**Floor 2** — carbon, hydrogen, oxygen, nitrogen
→ Frame 1: A carbon atom — six protons, dark gray.
→ Frame 2: A hydrogen atom — one proton, light.
→ Frame 3: An oxygen atom — eight protons, blue glow.
→ Frame 4: A nitrogen atom — seven protons, teal glow.

**Floor 3** — same atoms in coal and cells
→ Frame 1: A lump of coal — black, solid carbon.
→ Frame 2: A human cell — organic, complex, alive.
→ Frame 3: Carbon atoms extracted from the coal — glowing.
→ Frame 4: The same carbon atoms now inside the human cell — identical, just rearranged.

---

### BB 1101 — Molecules

**Floor 0** — how do we get millions of substances?
→ Frame 1: A Periodic Table — only ~100 elements visible.
→ Frame 2: A vast warehouse of objects — millions of different substances.
→ Frame 3: An arrow from the small table to the massive warehouse.
→ Frame 4: A question mark — how does this work?

**Floor 1** — atoms bond together
→ Frame 1: A hydrogen atom alone — small, simple.
→ Frame 2: An oxygen atom alone — larger, waiting.
→ Frame 3: The two atoms drifting toward each other.
→ Frame 4: They snap together — now a single unit, a molecule.

**Floor 2** — water as molecule
→ Frame 1: A single oxygen atom — glowing, waiting.
→ Frame 2: A hydrogen atom approaching from the left.
→ Frame 3: A second hydrogen atom approaching from the right.
→ Frame 4: All three bonded — H2O molecule formed, water.

**Floor 3** — H2O properties different from H and O
→ Frame 1: A tank of hydrogen gas — invisible, explosive.
→ Frame 2: A tank of oxygen gas — invisible, feeds fire.
→ Frame 3: The two tanks pouring into a single flask.
→ Frame 4: Water pouring out — a clear liquid, completely different.

---

### BB 1102 — The hookup

**Floor 0** — how do atoms bond?
→ Frame 1: Two atoms facing each other — no hooks, no velcro.
→ Frame 2: A question mark between them — what holds them together?
→ Frame 3: A zoom into the outer edge of one atom — electrons visible.
→ Frame 4: The electron highlighted — this is the key.

**Floor 1** — electrons as the key
→ Frame 1: A single electron orbiting one atom — a glowing dot.
→ Frame 2: A second atom approaching — the electron notices.
→ Frame 3: The electron path wavering — pulled toward the second atom.
→ Frame 4: The electron stretching its orbit — reaching toward the other atom.

**Floor 2** — sharing electrons
→ Frame 1: An electron orbiting one atom in a circular path.
→ Frame 2: A second atom entering the orbit zone.
→ Frame 3: The electron now flying in a figure-eight — orbiting both atoms.
→ Frame 4: Both atoms locked together by the shared electron.

**Floor 3** — chemical bond = shared electron
→ Frame 1: Two atoms tethered by a glowing electron between them.
→ Frame 2: A chain link forged between the atoms — the bond visualized.
→ Frame 3: The atoms pulled slightly apart — the bond stretches but holds.
→ Frame 4: The bond snapping back — atoms locked tight, inseparable.

---

### BB 1103 — Rearranging

**Floor 0** — bonds aren't permanent
→ Frame 1: A molecule — atoms bonded tightly, glowing bonds between them.
→ Frame 2: A flame approaching the molecule — heat radiating.
→ Frame 3: The bonds vibrating — shaking under the heat.
→ Frame 4: One bond snapping — atoms beginning to separate.

**Floor 1** — wood burning
→ Frame 1: A log of wood — solid, brown, intact.
→ Frame 2: A match touching the log — flame catching.
→ Frame 3: The log burning — orange flames, smoke rising.
→ Frame 4: The log reduced to ash — transformed but not destroyed.

**Floor 2** — heat breaking bonds
→ Frame 1: A wood molecule — carbon atoms arranged in a specific pattern.
→ Frame 2: Heat waves hitting the molecule — bonds vibrating.
→ Frame 3: Bonds snapping — atoms freed from their arrangement.
→ Frame 4: The freed atoms floating — no longer wood.

**Floor 3** — atoms rearrange, never destroyed
→ Frame 1: Freed carbon atoms floating in air.
→ Frame 2: Oxygen molecules approaching — O2.
→ Frame 3: Carbon bonding with oxygen — CO2 forming.
→ Frame 4: The same carbon atoms — now in smoke, not wood — matter never destroyed.

---

### BB 1104 — Mostly nothing

**Floor 0** — textbook diagrams are misleading
→ Frame 1: A textbook diagram of an atom — electrons orbiting tightly around nucleus.
→ Frame 2: The diagram cracking — a flaw appearing.
→ Frame 3: A red X over the diagram — it is wrong.
→ Frame 4: The true scale revealed — nucleus tiny, electrons impossibly far.

**Floor 1** — atom scaled to stadium
→ Frame 1: A massive football stadium — pixel art, full size.
→ Frame 2: The 50-yard line highlighted — center of the field.
→ Frame 3: A tiny marble placed on the 50-yard line — the nucleus.
→ Frame 4: The marble barely visible against the massive stadium.

**Floor 2** — nucleus = marble on 50-yard line
→ Frame 1: The stadium from above — the marble invisible at this scale.
→ Frame 2: Zoom into the 50-yard line — the marble becomes visible.
→ Frame 3: The marble glowing — dense, heavy, containing almost all the mass.
→ Frame 4: The marble isolated — this is the entire nucleus.

**Floor 3** — electrons = gnats in upper deck
→ Frame 1: The upper deck of the stadium — highest seats.
→ Frame 2: Tiny specks — gnats — buzzing in the top rows.
→ Frame 3: The gnats zipping at incredible speeds — motion streaks.
→ Frame 4: The marble (nucleus) and gnats (electrons) — nothing between them.

**Floor 4** — 99.9999% empty space
→ Frame 1: The full stadium — marble below, gnats above.
→ Frame 2: The vast empty space between them highlighted — pure vacuum.
→ Frame 3: A human figure standing beside the stadium — also mostly empty space.
→ Frame 4: The figure fading to reveal mostly nothing — atoms are overwhelmingly vacuum.

---

---

## THE UNIT (Physics)

---

### PHY_UNITS path (BBs 1000–1012) — Units & Dimensions

---

### BB 1000 — Why we need standard units

**Floor 0** — the elephant problem
→ Frame 1: A merchant holding a rope — measuring cloth by arm length.
→ Frame 2: Two merchants arguing — their arm lengths are different.
→ Frame 3: A caravan of traders arriving — each with a different body-based ruler.
→ Frame 4: Chaos — goods piled in dispute, numbers meaning nothing.

**Floor 1** — what a unit actually is
→ Frame 1: A single wooden stick laid flat — the agreed reference.
→ Frame 2: A second stick next to the first — identical length.
→ Frame 3: The two sticks side by side — a match: one unit.
→ Frame 4: A row of merchants, each holding the same stick — agreement achieved.

**Floor 2** — global standards and SI
→ Frame 1: A globe with measurement symbols radiating outward.
→ Frame 2: A platinum bar inside a glass case in Paris — the original kilogram.
→ Frame 3: A table of seven symbols: m, kg, s, A, K, mol, cd.
→ Frame 4: Scientists from different countries all pointing at the same table.

---

### BB 1001 — Measuring with a stick

**Floor 0** — the act of measuring
→ Frame 1: A ruler placed along the edge of a wooden plank.
→ Frame 2: A finger marking the end point on the ruler.
→ Frame 3: The number 3 appearing — 3 units long.
→ Frame 4: The plank labelled: 3m.

**Floor 1** — length: one dimension
→ Frame 1: A single straight line on a grid.
→ Frame 2: A ruler laid along the line — counting squares.
→ Frame 3: The number 5 appears — 5 units.
→ Frame 4: An arrow labelling the line: LENGTH.

**Floor 2** — area: two dimensions
→ Frame 1: A flat square on a grid.
→ Frame 2: A grid of smaller squares filling the big square.
→ Frame 3: Counting the grid squares — 9 total.
→ Frame 4: The square labelled: 3x3 = 9 sq units.

**Floor 3** — volume: three dimensions
→ Frame 1: A cube floating in space.
→ Frame 2: The cube sliced into layers of flat squares.
→ Frame 3: The layers stacked — counting 27 small cubes inside.
→ Frame 4: The cube labelled: 3x3x3 = 27 cubic units.

---

### BB 1002 — Derived quantities

**Floor 0** — built from base quantities
→ Frame 1: Two separate blocks labelled LENGTH and TIME.
→ Frame 2: An arrow connecting them — combining.
→ Frame 3: A new block appearing: SPEED = LENGTH / TIME.
→ Frame 4: Speed as a derived quantity — not fundamental, built.

**Floor 1** — area from length x width
→ Frame 1: A rectangle on a grid.
→ Frame 2: One side labelled: 4m. The other: 3m.
→ Frame 3: The grid filling in — 12 squares.
→ Frame 4: The label: AREA = 12 m2.

**Floor 2** — speed from distance / time
→ Frame 1: A car on a road — starting position marked.
→ Frame 2: The car at end position — 100m away.
→ Frame 3: A clock — 10 seconds elapsed.
→ Frame 4: SPEED = 100m / 10s = 10 m/s displayed.

---

### BB 1003 — Base quantities

**Floor 0** — the building blocks
→ Frame 1: A tall tower of derived quantities — speed, force, pressure.
→ Frame 2: The tower's foundation: LENGTH, MASS, TIME.
→ Frame 3: Everything else dissolving back into those three.
→ Frame 4: The three blocks standing alone — the irreducible base.

**Floor 1** — why these three and not others
→ Frame 1: LENGTH block glowing — you cannot express it from mass or time alone.
→ Frame 2: MASS block glowing — independent of length or time.
→ Frame 3: TIME block glowing — cannot be built from the other two.
→ Frame 4: A triangle with LENGTH, MASS, TIME at each corner — independent.

**Floor 2** — other base quantities
→ Frame 1: The original triangle with LENGTH, MASS, TIME.
→ Frame 2: New blocks added: TEMPERATURE, CURRENT, AMOUNT, LUMINOSITY.
→ Frame 3: Seven blocks total forming a circle.
→ Frame 4: The SI symbol table — seven rows, one per base quantity.

---

### BB 1004 — The seven pillars of SI

**Floor 0** — the seven base units named
→ Frame 1: A stone pillar labelled METRE (length).
→ Frame 2: A second pillar: KILOGRAM (mass).
→ Frame 3: Third pillar: SECOND (time). Fourth: AMPERE (current).
→ Frame 4: The full row of seven pillars — a grand arcade.

**Floor 1** — defined by physical constants since 2019
→ Frame 1: The old platinum kilogram bar inside its vault.
→ Frame 2: The bar dissolving — replaced by equations.
→ Frame 3: A physics constant symbol (h, Planck's constant) glowing.
→ Frame 4: The kilogram redefined by locking Planck's constant — a new foundation.

**Floor 2** — prefixes multiply the unit
→ Frame 1: A base unit block labelled METRE.
→ Frame 2: KILO prefix added — the block grows 1000x.
→ Frame 3: MILLI prefix — the block shrinks 1000x.
→ Frame 4: A table: kilo=10^3, mega=10^6, milli=10^-3, micro=10^-6.

---

### BB 1005 — Measuring the universe

**Floor 0** — quasars at the edge of the observable universe
→ Frame 1: A deep space scene — stars fading into darkness.
→ Frame 2: A single brilliant point — a quasar, brighter than a galaxy.
→ Frame 3: A scale bar: 13 billion light-years.
→ Frame 4: The quasar shrinking to a dot as the universe-map zooms out.

**Floor 1** — Le Grand K: the kilogram problem
→ Frame 1: A glass bell jar — the platinum-iridium cylinder inside.
→ Frame 2: A scale reading — the cylinder's mass in 1889.
→ Frame 3: The same scale decades later — the reading has drifted by 50 micrograms.
→ Frame 4: A red warning symbol — the standard was changing.

**Floor 2** — metre defined by the speed of light
→ Frame 1: A laser beam crossing a vacuum chamber.
→ Frame 2: A clock measuring exactly 1/299,792,458 of a second.
→ Frame 3: The distance the light travels in that time highlighted.
→ Frame 4: The label: 1 METRE — defined by light, not a stick.

**Floor 3** — the atomic second: Cesium-133
→ Frame 1: A Cesium-133 atom glowing.
→ Frame 2: Microwave radiation tickling the atom — it vibrates.
→ Frame 3: A counter ticking: 9,192,631,770 vibrations.
→ Frame 4: The counter stopping at that exact number — 1 SECOND achieved.

---

### BB 1006 — Dimension vs unit

**Floor 0** — same thing, different names
→ Frame 1: A ruler labelled METRES. A second ruler labelled MILES.
→ Frame 2: Both rulers measuring the same stretch of road.
→ Frame 3: The road labelled: 1.6 km OR 1 mile — same length, different units.
→ Frame 4: A label above: DIMENSION = LENGTH. Unit = your choice.

**Floor 1** — dimension is the type; unit is the amount
→ Frame 1: A container labelled TEMPERATURE — a category.
→ Frame 2: The same container: could be filled with C or K or F.
→ Frame 3: A container labelled LENGTH — could be metres, feet, cubits.
→ Frame 4: The distinction: DIMENSION = what it measures, UNIT = how much.

**Floor 2** — dimensions can be combined
→ Frame 1: LENGTH box and TIME box side by side.
→ Frame 2: An arrow: LENGTH / TIME.
→ Frame 3: A new box: VELOCITY — a derived dimension.
→ Frame 4: The equation: [v] = L T^-1.

**Floor 3** — different units, same dimension
→ Frame 1: A kilogram weight and a gram weight on a balance.
→ Frame 2: Both labelled MASS — same dimension.
→ Frame 3: The conversion: 1 kg = 1000 g — different units, same type.
→ Frame 4: A crossmark on mixing dimensions: MASS is not LENGTH.

---

### BB 1007 — Dimensions: the fingerprint

**Floor 0** — every quantity has a dimensional formula
→ Frame 1: A force arrow pushing a box.
→ Frame 2: The force broken down: MASS x ACCELERATION.
→ Frame 3: Acceleration broken down: LENGTH / TIME^2.
→ Frame 4: Force's fingerprint: [F] = M L T^-2.

**Floor 1** — dimensional formula for force
→ Frame 1: The symbol F in a circle.
→ Frame 2: Expanding: F = ma = M x L/T^2.
→ Frame 3: Brackets written: [F] = [M][L][T]^-2.
→ Frame 4: The dimensional formula like a barcode — unique to force.

**Floor 2** — using the fingerprint
→ Frame 1: An unknown equation on a blackboard.
→ Frame 2: Replacing each symbol with its dimensional formula.
→ Frame 3: Both sides of the equation checked — dimensions match.
→ Frame 4: A green checkmark — the equation is dimensionally valid.

---

### BB 1008 — The homogeneity principle

**Floor 0** — you cannot add apples to oranges
→ Frame 1: A speed value (10 m/s) and a force value (5 N) side by side.
→ Frame 2: A plus sign between them — an attempt to add.
→ Frame 3: A red X — cannot add different dimensions.
→ Frame 4: The rule: quantities can only be added if they share the same dimension.

**Floor 1** — the kinematics check
→ Frame 1: The equation v = u + at written out.
→ Frame 2: v: [LT^-1]. u: [LT^-1]. a: [LT^-2]. t: [T].
→ Frame 3: at = [LT^-2][T] = [LT^-1] — matches v and u.
→ Frame 4: All three terms share [LT^-1] — equation is homogeneous.

**Floor 2** — catching errors with homogeneity
→ Frame 1: A wrong equation: v = u + a (missing t).
→ Frame 2: Checking dimensions: u=[LT^-1], a=[LT^-2] — mismatch.
→ Frame 3: A red flag — the units don't agree.
→ Frame 4: The fix: add t so both terms become [LT^-1].

**Floor 3** — the principle stated
→ Frame 1: A balance scale — left side equals right side.
→ Frame 2: Both pans labelled with the same dimension symbol.
→ Frame 3: A formula crossing a courtroom: every term must share one dimension.
→ Frame 4: The law engraved: HOMOGENEITY OF DIMENSIONS.

---

### BB 1009 — Dimensional analysis

**Floor 0** — using dimensions to find a formula
→ Frame 1: A simple pendulum — bob hanging on a string.
→ Frame 2: The question: what determines the period T?
→ Frame 3: Candidates listed: length L, mass m, gravity g.
→ Frame 4: Dimension analysis beginning — what combination gives [T]?

**Floor 1** — ruling out mass
→ Frame 1: The mass m on one side of a balance.
→ Frame 2: Checking [m] = M — time has no mass dimension.
→ Frame 3: Mass crossed out — it cannot appear in the formula.
→ Frame 4: Only L and g remain as candidates.

**Floor 2** — the result: T proportional to root(L/g)
→ Frame 1: L and g combined: [L]/[g] = [L] / [LT^-2] = [T^2].
→ Frame 2: Square root taken — root([T^2]) = [T]. Correct dimension.
→ Frame 3: The formula: T proportional to root(L/g) emerging from dimensional reasoning.
→ Frame 4: The pendulum swinging — period predicted without a single experiment.

---

### BB 1010 — Finishing the formula

**Floor 0** — dimensional analysis leaves one gap
→ Frame 1: The formula T proportional to root(L/g) on a board.
→ Frame 2: A question mark: what is the constant of proportionality?
→ Frame 3: Dimensions cannot determine pure numbers — only a measurement can.
→ Frame 4: A single experiment: one pendulum, one stopwatch.

**Floor 1** — one measurement nails the constant
→ Frame 1: A pendulum of known length L = 1m.
→ Frame 2: A stopwatch — timing ten swings.
→ Frame 3: Dividing by 10 — period T = 2.0 seconds.
→ Frame 4: Plugging in: 2.0 = C x root(1/9.8). Solving: C = 2pi.

**Floor 2** — the complete formula: T = 2pi root(L/g)
→ Frame 1: The final equation written: T = 2pi root(L/g).
→ Frame 2: A different pendulum — different L — applying the formula.
→ Frame 3: The prediction checked against the stopwatch — it matches.
→ Frame 4: The formula standing alone — complete, verified, universal.

**Floor 3** — what dimensional analysis gave us
→ Frame 1: The journey: unknown, then dimension check, then shape of formula, then one measurement, then done.
→ Frame 2: Comparing: guessing blindly vs guided by dimensions.
→ Frame 3: The infinite space of wrong guesses eliminated by dimensions.
→ Frame 4: The one correct formula isolated — dimensional analysis as a filter.

---

### BB 1011 — Buckingham's pi theorem

**Floor 0** — scaling with physics (narrative)
→ Frame 1: A full-size Boeing 747 silhouette in a hangar.
→ Frame 2: A tiny scale model of the same plane in a wind tunnel.
→ Frame 3: Airflow hitting the model — force measured.
→ Frame 4: The result scaled up via the pi theorem — predicting the real plane's drag.

---

### BB 1012 — Recap: units and dimensions

**Floor 0** — the summary
→ Frame 1: Seven pillars, each labelled with a base unit (m, kg, s, A, K, mol, cd).
→ Frame 2: Derived units branching from the pillars — speed, force, energy.
→ Frame 3: A dimensional formula [F] = MLT^-2 as a fingerprint.
→ Frame 4: A balance scale — homogeneity principle — both sides the same dimension.

---

### PHY_SCALE path (BBs 1013–1018) — Scale, Estimation & Errors

---

### BB 1013 — Order of magnitude

**Floor 0** — powers of ten
→ Frame 1: The number 1 in the centre.
→ Frame 2: Multiplying by 10 — the number grows: 10, 100, 1000.
→ Frame 3: Each step is one order of magnitude — a jump of 10x.
→ Frame 4: A scale bar from 10^-15 (nucleus) to 10^26 (universe).

**Floor 1** — Fermi estimation
→ Frame 1: A city skyline — the question floating above: how many piano tuners?
→ Frame 2: Estimating population: roughly 1 million people in the city.
→ Frame 3: Fraction owning pianos, times tunings per year, times time per tuning.
→ Frame 4: Answer: roughly 100 piano tuners — order of magnitude: 10^2.

**Floor 2** — logarithmic scales
→ Frame 1: A normal number line — cramped, large numbers squished off the edge.
→ Frame 2: A log scale — each tick is 10x the previous.
→ Frame 3: Bacteria, ant, human, whale, Earth all fitting on one line.
→ Frame 4: The log scale revealing structure that a linear scale hides.

**Floor 3** — estimation as a tool
→ Frame 1: An engineer at a whiteboard — rough calculation, no calculator.
→ Frame 2: Rounding everything to the nearest power of ten.
→ Frame 3: A quick answer: within a factor of 10, good enough to decide.
→ Frame 4: The exact answer checked — same order of magnitude as the estimate.

---

### BB 1014 — Structure of the world

**Floor 0** — the hierarchy of scale
→ Frame 1: A single atom — 10^-10 m.
→ Frame 2: Atoms forming a molecule — 10^-9 m.
→ Frame 3: Molecules forming a cell — 10^-5 m.
→ Frame 4: The ladder: atom, molecule, cell, organism, city, planet, galaxy.

**Floor 1** — from atom to organism
→ Frame 1: An atom glowing — a single hydrogen.
→ Frame 2: Atoms bonding into a water molecule.
→ Frame 3: Molecules aggregating into a cell membrane.
→ Frame 4: The cell — alive, complex, made entirely of atoms following physics.

**Floor 2** — from organism to galaxy
→ Frame 1: A human figure — 10^0 m scale.
→ Frame 2: Zooming out — a city block, 10^3 m.
→ Frame 3: Zooming further — the planet Earth, 10^7 m.
→ Frame 4: The Milky Way — 10^21 m. Same laws, vastly different scales.

**Floor 3** — emergence at each level
→ Frame 1: Individual water molecules — no wetness.
→ Frame 2: Billions of molecules together — a river, wet and flowing.
→ Frame 3: The concept WETNESS appearing only at the collective level.
→ Frame 4: Each scale has properties invisible at the level below — emergence.

---

### BB 1015 — Errors in measurement

**Floor 0** — no measurement is perfect
→ Frame 1: A ruler measuring a pencil — 14.7 cm.
→ Frame 2: The same pencil re-measured — 14.6 cm.
→ Frame 3: Measured again — 14.8 cm. Values scatter.
→ Frame 4: The spread of values — the measurement has uncertainty.

**Floor 1** — random vs systematic error
→ Frame 1: A dartboard — darts scattered around the centre (random error).
→ Frame 2: A second dartboard — darts clustered in one corner, far from centre (systematic error).
→ Frame 3: Comparing the two boards side by side.
→ Frame 4: RANDOM = scatter around true value. SYSTEMATIC = consistent offset.

**Floor 2** — accuracy vs precision
→ Frame 1: A bullseye — darts close to centre, spread out (accurate, imprecise).
→ Frame 2: A bullseye — darts in tight cluster but away from centre (precise, inaccurate).
→ Frame 3: A bullseye — tight cluster at centre (accurate AND precise).
→ Frame 4: The four combinations shown as a 2x2 grid.

**Floor 3** — standard deviation
→ Frame 1: Five measurements plotted on a number line: 14.6, 14.7, 14.7, 14.8, 14.7.
→ Frame 2: The mean calculated: 14.7.
→ Frame 3: Deviations from the mean — each point's distance.
→ Frame 4: Standard deviation — the typical scatter. Small sigma = precise.

---

### BB 1016 — Law of diminishing returns

**Floor 0** — halving uncertainty costs four times the effort (narrative)
→ Frame 1: A scale with a reading — uncertainty plus or minus 1 gram.
→ Frame 2: Taking more measurements — the uncertainty dropping slowly.
→ Frame 3: A graph: measurements on x-axis, uncertainty on y-axis — curves flatten.
→ Frame 4: The rule: to halve the uncertainty, you need four times as many readings.

---

### BB 1017 — Frames of reference

**Floor 0** — motion is relative to the observer
→ Frame 1: A passenger sitting still on a train.
→ Frame 2: A tree outside the window — to the passenger, the tree moves backwards.
→ Frame 3: The tree's perspective — it stands still, the train rushes past.
→ Frame 4: Two observers, two valid descriptions of the same event.

**Floor 1** — train and platform
→ Frame 1: A train moving right at 30 m/s. A platform observer standing still.
→ Frame 2: A ball dropped inside the train — falls straight down to the passenger.
→ Frame 3: The same ball from the platform observer — it traces a curved arc.
→ Frame 4: Both descriptions correct — frame determines what you see.

**Floor 2** — choosing a convenient frame
→ Frame 1: A complex motion — hard to describe from the ground.
→ Frame 2: Switching to the object's rest frame — suddenly simple.
→ Frame 3: The physics unchanged — only the description changes.
→ Frame 4: A physicist labelling the chosen frame: REFERENCE FRAME.

**Floor 3** — all inertial frames are equivalent
→ Frame 1: Two trains moving at constant velocity — one to the left, one to the right.
→ Frame 2: Each claims to be stationary — both are correct.
→ Frame 3: A physics equation working identically in both frames.
→ Frame 4: The principle: no preferred reference frame in physics.

---

### BB 1018 — Relative velocity

**Floor 0** — combining velocities
→ Frame 1: A train moving right at 30 m/s.
→ Frame 2: A passenger walking right inside the train at 2 m/s.
→ Frame 3: From the platform: passenger moves at 32 m/s.
→ Frame 4: The addition: v_total = v_train + v_passenger.

**Floor 1** — walking backward on a moving train
→ Frame 1: The same train at 30 m/s.
→ Frame 2: The passenger walking left (backward) at 2 m/s relative to train.
→ Frame 3: From platform: 30 minus 2 = 28 m/s rightward.
→ Frame 4: Velocity subtracted when directions oppose.

**Floor 2** — rain falling at an angle in a moving car
→ Frame 1: Rain falling straight down in still air.
→ Frame 2: A car driving into the rain at speed.
→ Frame 3: The driver's view: rain appears to angle toward the windscreen.
→ Frame 4: The vector triangle: rain velocity plus car velocity = apparent rain direction.

**Floor 3** — closing speed
→ Frame 1: Two cars approaching head-on — each at 20 m/s.
→ Frame 2: From one car's frame: the other approaches at 40 m/s.
→ Frame 3: From the road frame: both move at 20 m/s.
→ Frame 4: Closing speed = sum of speeds when moving toward each other.

---

### PHY_INTRO path (BBs 1019–1021) — Foundations & Frontiers

---

### BB 1019 — What physics studies

**Floor 0** — a dropped cup
→ Frame 1: A ceramic cup balanced on a table edge.
→ Frame 2: The cup tipping — beginning to fall.
→ Frame 3: The cup in freefall — a parabolic arc.
→ Frame 4: The cup shattering on the floor — the same rules that govern galaxies.

**Floor 1** — the same rules at all scales
→ Frame 1: The fallen cup on the floor — tiny scale.
→ Frame 2: The same gravity equation written above it: F = mg.
→ Frame 3: The Earth orbiting the Sun — enormous scale.
→ Frame 4: The same equation describing both — F = GMm/r^2.

---

### BB 1020 — On the frontier (narrative)

**Floor 0** — the simulation hypothesis and the edge of knowledge
→ Frame 1: A physicist standing at the edge of a cliff — beyond: fog.
→ Frame 2: Known physics on one side of the cliff: equations, solved problems.
→ Frame 3: Beyond the fog: question marks — quantum gravity, dark matter, consciousness.
→ Frame 4: The frontier — where physics ends and the unknown begins.

---

### BB 1021 — What holds a still ship still?

**Floor 0** — a cargo ship sitting motionless
→ Frame 1: A massive cargo ship on a flat ocean — perfectly still.
→ Frame 2: The question: why doesn't it sink? Why doesn't it fly upward?
→ Frame 3: Arrows appearing — gravity pulling down, buoyancy pushing up.
→ Frame 4: The arrows equal and opposite — the ship goes nowhere.

**Floor 1** — gravity and buoyancy in balance
→ Frame 1: The ship from the side — gravity arrow pointing down.
→ Frame 2: Water pressing up under the hull — buoyancy arrow pointing up.
→ Frame 3: The two arrows exactly matching — same length, opposite direction.
→ Frame 4: Net force = zero. The ship sits still by law, not coincidence.

**Floor 2** — friction keeps it from drifting
→ Frame 1: A gentle wind pushing the ship sideways.
→ Frame 2: Water drag and anchor tension pushing back.
→ Frame 3: Three horizontal forces — wind, drag, anchor — cancelling out.
→ Frame 4: Zero net horizontal force — ship holds position.

**Floor 3** — balanced forces are everywhere
→ Frame 1: A book resting on a table.
→ Frame 2: Gravity pulling the book down. The table pushing up.
→ Frame 3: A person standing on the ground — same balance, invisible.
→ Frame 4: The world — objects at rest because forces cancel, not because nothing acts.

---

### PHY_FORCES path (BBs 1022–1034, 1037) — Forces & Newton's Laws

---

### BB 1022 — Matter and mass

**Floor 0** — matter occupies space and has mass
→ Frame 1: A wooden block sitting on a table.
→ Frame 2: The block occupying space — other objects cannot share it.
→ Frame 3: The block on a scale — it has mass.
→ Frame 4: MATTER = stuff that takes up space and resists being moved.

**Floor 1** — mass measured by resistance to acceleration
→ Frame 1: A small block — a gentle push accelerates it quickly.
→ Frame 2: A large boulder — the same push barely moves it.
→ Frame 3: The comparison: more mass = more resistance to the same force.
→ Frame 4: Mass as inertia — the measure of how hard it is to change motion.

**Floor 2** — mass vs weight
→ Frame 1: An astronaut holding a barbell on Earth — heavy.
→ Frame 2: The same astronaut on the Moon holding the same barbell.
→ Frame 3: The barbell feels lighter on the Moon — weight changed, mass did not.
→ Frame 4: MASS = same everywhere. WEIGHT = mass times local gravity.

**Floor 3** — the Higgs field
→ Frame 1: Empty space — a field rippling across it like a pond surface.
→ Frame 2: A particle moving through the field — it drags against it.
→ Frame 3: The drag giving the particle its mass — resistance to motion.
→ Frame 4: The Higgs boson — the ripple in the field, discovered 2012.

---

### BB 1023 — Inertia and Newton's first law

**Floor 0** — a car coasting on a flat road
→ Frame 1: A car engine switched off — still moving at 40 km/h.
→ Frame 2: The car rolling along — no force applied.
→ Frame 3: Gradually slowing — friction from road and air.
→ Frame 4: The lesson: without friction, it would roll forever.

**Floor 1** — brakes stop it, not the absence of motion
→ Frame 1: The driver pressing the brake pedal.
→ Frame 2: Brake pads gripping the disc — friction force.
→ Frame 3: The car decelerating — force applied, motion changed.
→ Frame 4: Without the brake, no force = no change in motion.

**Floor 2** — the seatbelt
→ Frame 1: Car travelling at speed — passenger moving with it.
→ Frame 2: Car brakes hard — car decelerates.
→ Frame 3: Passenger's body continues forward — inertia.
→ Frame 4: The seatbelt applies force — stopping the passenger with the car.

**Floor 3** — Aristotle's error
→ Frame 1: A rolling ball slowing to a stop on a rough floor.
→ Frame 2: Aristotle's claim: motion requires constant force.
→ Frame 3: A smooth ice surface — the same ball rolling much farther.
→ Frame 4: The truth: friction was deceiving him. No force = no change in motion.

---

### BB 1024 — The asteroid

**Floor 0** — asteroid in deep space: speed
→ Frame 1: An asteroid tumbling through empty space.
→ Frame 2: No friction, no air — it moves at constant speed forever.
→ Frame 3: A speedometer label: 20 km/s.
→ Frame 4: The asteroid continuing — unchanged, no force acting.

**Floor 1** — asteroid plus direction: velocity
→ Frame 1: The asteroid with a speed label: 20 km/s.
→ Frame 2: An arrow added — pointing directly toward Earth.
→ Frame 3: VELOCITY = speed plus direction. Both matter.
→ Frame 4: The asteroid locked on course.

**Floor 2** — entering Earth's gravity: acceleration begins
→ Frame 1: The asteroid approaching Earth — still far away.
→ Frame 2: Earth's gravity pulling — an arrow growing toward Earth.
→ Frame 3: The asteroid speeding up — acceleration building.
→ Frame 4: The velocity arrow growing longer every second.

**Floor 3** — impact
→ Frame 1: The asteroid blazing through the atmosphere.
→ Frame 2: A fireball — atmospheric compression heating it.
→ Frame 3: The crater impact — a column of fire and debris.
→ Frame 4: The resulting crater — testimony to millions of years of acceleration.

---

### BB 1025 — What if the asteroid had farther to fall?

**Floor 0** — more distance = more time under acceleration
→ Frame 1: Two asteroids — one starting close to Earth, one starting far.
→ Frame 2: Both begin falling toward Earth — same gravitational acceleration.
→ Frame 3: The far one falls longer — accumulates more velocity.
→ Frame 4: The far one hits faster — same acceleration, longer time.

**Floor 1** — velocity accumulates over time
→ Frame 1: A velocity meter at zero — asteroid just starting to fall.
→ Frame 2: The meter rising — 1 second of fall, plus 9.8 m/s.
→ Frame 3: After 10 seconds: plus 98 m/s. After 100 seconds: plus 980 m/s.
→ Frame 4: The accumulation: v = at. Velocity piles up with time.

**Floor 2** — acceleration is constant at the surface
→ Frame 1: Two objects dropped from the same height — a feather and a rock (in vacuum).
→ Frame 2: Both accelerating at the same rate — 9.8 m/s^2.
→ Frame 3: Both hitting the ground simultaneously.
→ Frame 4: Gravitational acceleration independent of mass — a key insight.

**Floor 3** — hitting faster from farther
→ Frame 1: Two impact craters — one small, one massive.
→ Frame 2: The small crater: short fall, low impact velocity.
→ Frame 3: The large crater: long fall, high impact velocity.
→ Frame 4: Impact energy scales with velocity squared — distance matters enormously.

---

### BB 1026 — Speed, velocity and acceleration

**Floor 0** — a city bus
→ Frame 1: A bus driving through city streets.
→ Frame 2: The speedometer showing 40 km/h — speed only.
→ Frame 3: The bus turning a corner — same speed, new direction.
→ Frame 4: Speed is a number; direction adds information to make velocity.

**Floor 1** — speed: scalar (magnitude only)
→ Frame 1: A runner on a track — 8 m/s.
→ Frame 2: The number 8 displayed — no arrow, no direction.
→ Frame 3: The runner reversing — still 8 m/s on the display.
→ Frame 4: SCALAR = magnitude only. Direction irrelevant.

**Floor 2** — velocity: vector (magnitude plus direction)
→ Frame 1: The runner with an arrow: 8 m/s to the right.
→ Frame 2: Runner reverses — arrow flips: 8 m/s to the left.
→ Frame 3: Same speed, different velocity — the direction changed.
→ Frame 4: VECTOR = magnitude with direction. Sign matters.

**Floor 3** — acceleration: rate of velocity change
→ Frame 1: A car at rest. One second later: 10 m/s. Two seconds: 20 m/s.
→ Frame 2: The velocity changing by 10 m/s every second.
→ Frame 3: ACCELERATION = change in velocity / time.
→ Frame 4: Even a direction change at constant speed is acceleration.

---

### BB 1027 — Newtonian physics: the clockwork universe

**Floor 0** — forces to acceleration to velocity to position
→ Frame 1: A force arrow on an object.
→ Frame 2: The object accelerating — velocity building.
→ Frame 3: The velocity carrying the object to a new position.
→ Frame 4: The chain: FORCE, then ACCELERATION, then VELOCITY, then POSITION.

**Floor 1** — deterministic: know now, know future
→ Frame 1: A clockwork mechanism — gears turning predictably.
→ Frame 2: The state of the clock at 12:00:00 precisely known.
→ Frame 3: The state at 12:00:01 calculated from Newton's laws.
→ Frame 4: The entire future of the mechanism predictable from initial conditions.

**Floor 2** — eclipse prediction 100 years ahead
→ Frame 1: An astronomer at a telescope — 1850.
→ Frame 2: Newton's laws applied to the Moon and Sun positions.
→ Frame 3: A calendar printed: ECLIPSE — 1950, exact time.
→ Frame 4: The eclipse occurring on schedule — Newtonian prediction confirmed.

**Floor 3** — the relativity limit
→ Frame 1: A spaceship accelerating — approaching the speed of light.
→ Frame 2: Newton's equations predicting speed exceeding light — a contradiction.
→ Frame 3: Einstein's relativity correcting the prediction near light speed.
→ Frame 4: Newton works for slow things; relativity takes over near light speed.

**Floor 4** — the quantum limit
→ Frame 1: An electron in an atom — Newton predicts a definite orbit.
→ Frame 2: The electron appearing as a probability cloud — no definite position.
→ Frame 3: Newton's determinism breaks down at atomic scale.
→ Frame 4: Quantum mechanics replaces Newton below roughly 10^-9 m.

---

### BB 1028 — From words to equations

**Floor 0** — F = ma stated precisely
→ Frame 1: Newton's second law in words: force equals mass times acceleration.
→ Frame 2: The equation: F = ma — three symbols.
→ Frame 3: Precise: change one symbol, the equation still works.
→ Frame 4: The power of precision — ambiguity replaced by calculation.

**Floor 1** — predicting a car's acceleration
→ Frame 1: A car of mass 1000 kg.
→ Frame 2: Engine applies force: 3000 N.
→ Frame 3: F = ma, so a = F/m = 3000/1000 = 3 m/s^2.
→ Frame 4: The car accelerating at exactly 3 m/s^2 — predicted in advance.

**Floor 2** — Le Verrier finds Neptune
→ Frame 1: Uranus's orbit — slightly off from Newton's prediction.
→ Frame 2: Le Verrier calculating: something is pulling Uranus.
→ Frame 3: He predicts the position of the unseen planet.
→ Frame 4: Astronomers point a telescope there — Neptune found, 1846.

**Floor 3** — what the equation actually means
→ Frame 1: The equation F = ma as a balance.
→ Frame 2: Doubling F with same m — acceleration doubles.
→ Frame 3: Doubling m with same F — acceleration halves.
→ Frame 4: The equation as a precise machine for relating three quantities.

---

### BB 1029 — The edge of Newton's law: Vulcan (narrative)

**Floor 0** — Mercury's orbit and the ghost planet
→ Frame 1: Mercury orbiting the Sun — a small, fast planet.
→ Frame 2: Its orbit precessing — the ellipse slowly rotating each lap.
→ Frame 3: Newton's law predicts less precession than observed — a discrepancy.
→ Frame 4: Le Verrier's solution: another planet, Vulcan, must be pulling it.

---

### BB 1030 — Mass, weight and units

**Floor 0** — weight = mass times gravity
→ Frame 1: A 1 kg block on Earth.
→ Frame 2: The equation: W = mg = 1 x 9.8 = 9.8 N.
→ Frame 3: Weight expressed in Newtons — a force, not a mass.
→ Frame 4: The block labelled: mass = 1 kg, weight = 9.8 N.

**Floor 1** — on the Moon, weight is 1/6
→ Frame 1: An astronaut standing on the Moon holding a 10 kg dumbbell.
→ Frame 2: Moon gravity: g = 1.6 m/s^2. Weight = 10 x 1.6 = 16 N.
→ Frame 3: On Earth the same dumbbell: weight = 10 x 9.8 = 98 N.
→ Frame 4: Same mass, 6x less weight on the Moon.

**Floor 2** — the bathroom scale misleads
→ Frame 1: A person standing on a bathroom scale — reads 70 kg.
→ Frame 2: The scale is measuring force (weight) and displaying mass.
→ Frame 3: On the Moon the same person — scale would read roughly 12 kg.
→ Frame 4: The scale measures force. It assumes Earth gravity to show kg.

**Floor 3** — hammer and feather fall the same in vacuum
→ Frame 1: An astronaut on the Moon — holding a hammer and a feather.
→ Frame 2: Both released simultaneously.
→ Frame 3: Both falling — at the same rate, without air drag.
→ Frame 4: Both hitting the ground together — gravity accelerates all masses equally.

---

### BB 1031 — Newton's first law (net force = 0)

**Floor 0** — steel block under a press
→ Frame 1: A massive steel block sitting on a workshop floor.
→ Frame 2: An industrial press pushing down on it — enormous force.
→ Frame 3: The floor pushing back — equally enormous, upward.
→ Frame 4: The block does not move — net force = zero.

**Floor 1** — net force: the sum of all forces
→ Frame 1: A box with three arrows: 10N right, 6N left, 4N left.
→ Frame 2: Adding the lefts: 6 plus 4 = 10 N left.
→ Frame 3: Net = 10N right minus 10N left = 0.
→ Frame 4: Net force = 0 means no acceleration — box stays still or constant velocity.

**Floor 2** — motion as a readout of net force
→ Frame 1: A puck sliding on frictionless ice at constant velocity.
→ Frame 2: No friction, no air — no net force. The puck keeps going.
→ Frame 3: A hand pushes — now there is a net force. The puck accelerates.
→ Frame 4: Motion tells you about force: constant velocity means net force = 0.

**Floor 3** — equilibrium is not no forces, just balanced
→ Frame 1: A chandelier hanging from a ceiling — not moving.
→ Frame 2: Gravity pulling it down with enormous force.
→ Frame 3: The cable pulling up with the exact same force.
→ Frame 4: Equilibrium = forces cancel. Many forces acting, net = zero.

---

### BB 1032 — Newton's second law (F = ma)

**Floor 0** — shopping trolley
→ Frame 1: An empty shopping trolley — a small push, it accelerates quickly.
→ Frame 2: The trolley loaded with heavy goods — the same push, slower acceleration.
→ Frame 3: Doubling the push on the loaded trolley — acceleration returns.
→ Frame 4: The pattern: a = F/m. More mass, less acceleration for the same force.

**Floor 1** — F = ma the equation
→ Frame 1: The three symbols: F, m, a.
→ Frame 2: F = ma written — force equals mass times acceleration.
→ Frame 3: Rearranged: a = F/m. Acceleration depends on both.
→ Frame 4: Rearranged: m = F/a. You can find mass from force and acceleration.

**Floor 2** — rocket sizing
→ Frame 1: A rocket on a launch pad — mass = 500,000 kg.
→ Frame 2: Required acceleration: 15 m/s^2 (to escape gravity).
→ Frame 3: F = ma = 500,000 x 15 = 7,500,000 N thrust needed.
→ Frame 4: Engineers sizing the engines from this calculation.

**Floor 3** — braking distance
→ Frame 1: A car at 30 m/s — driver hits brakes.
→ Frame 2: Braking force: 6000 N. Car mass: 1200 kg.
→ Frame 3: a = F/m = 5 m/s^2 deceleration.
→ Frame 4: Using kinematics: stopping distance = v^2/(2a) = 90 m.

---

### BB 1033 — Newton's third law

**Floor 0** — the ledger analogy
→ Frame 1: A double-entry ledger — every debit matched by a credit.
→ Frame 2: Force A acting on B — entered on one side.
→ Frame 3: Reaction force B on A — entered on the other side.
→ Frame 4: The ledger always balances — every force has an equal, opposite partner.

**Floor 1** — the trampoline
→ Frame 1: A child jumping down onto a trampoline.
→ Frame 2: The trampoline deforming under the force.
→ Frame 3: The trampoline pushing back — the child flying upward.
→ Frame 4: Action and reaction: child pushes down, trampoline pushes up.

**Floor 2** — F_AB equals negative F_BA
→ Frame 1: Object A and Object B facing each other.
→ Frame 2: A pushes B with force F_AB (arrow pointing right).
→ Frame 3: B pushes A with force F_BA (arrow pointing left, same magnitude).
→ Frame 4: The equation: F_AB = negative F_BA. Equal magnitude, opposite direction.

**Floor 3** — the book-on-table confusion
→ Frame 1: A book sitting on a table.
→ Frame 2: Two force pairs identified: gravity-earth pair and book-table pair.
→ Frame 3: The table's normal force is NOT the reaction to gravity — it reacts to the book.
→ Frame 4: The third-law pairs: Earth pulls book down AND book pulls Earth up. Book pushes table AND table pushes book.

**Floor 4** — rifle recoil and walking
→ Frame 1: A rifle firing — bullet exits the barrel.
→ Frame 2: The rifle kicks backward — recoil.
→ Frame 3: Bullet is tiny, rifle is large — large mass, small recoil velocity.
→ Frame 4: Walking: foot pushes Earth backward, Earth pushes foot forward.

---

### BB 1034 — Vindicated: Goddard's rocket (narrative)

**Floor 0** — mocked then proven right
→ Frame 1: A newspaper headline: MOON ROCKET FOOLISH — scientist mocked.
→ Frame 2: Robert Goddard alone in a field — a small rocket on a launch stand.
→ Frame 3: The rocket firing — exhaust pushing down, rocket rising.
→ Frame 4: The New York Times retraction, 1969 — the day after Apollo 11 launch.

---

### BB 1037 — The mind behind the grid: Descartes (narrative)

**Floor 0** — a fly on the ceiling
→ Frame 1: Rene Descartes lying in bed, staring at the ceiling.
→ Frame 2: A fly walking across the ceiling.
→ Frame 3: Descartes thinking: I can describe where the fly is with two numbers.
→ Frame 4: The coordinate grid appearing on the ceiling — the Cartesian plane invented.


---

### PHYS_001 path (BBs 1139–1200) — Physics Starting Path

---

### BB 1139 — A world without rulers

**Floor 0** — no measurement means no physics
→ Frame 1: A physicist at a bench — no instruments, just objects.
→ Frame 2: Trying to describe a falling ball — how fast? No way to say.
→ Frame 3: Two scientists arguing — no shared scale to compare.
→ Frame 4: Without measurement, physics is just storytelling.

**Floor 1** — the moment measurement appears
→ Frame 1: The physicist holding a ruler for the first time.
→ Frame 2: The falling ball timed — a stopwatch.
→ Frame 3: A number written: 3.2 m/s^2. Reproducible. Shareable.
→ Frame 4: Physics begins: a number attached to an observation.

---

### BB 1140 — The agreement

**Floor 0** — the need for a standard
→ Frame 1: Two traders, each using their own arm length to measure cloth.
→ Frame 2: Their measurements disagree — conflict.
→ Frame 3: A third object produced — a stick everyone accepts.
→ Frame 4: The stick: the standard. Both now get the same number.

**Floor 1** — a unit is a shared agreement
→ Frame 1: The standard stick being copied — distributed to each trader.
→ Frame 2: Each copy identical — the unit travels with the agreement.
→ Frame 3: A measurement made with a copy: 3 units of cloth.
→ Frame 4: Both traders nod — the number means the same thing to both.

**Floor 2** — units allow communication across distance
→ Frame 1: A message sent: the pole is 4 units long.
→ Frame 2: The receiver, far away, has the same unit.
→ Frame 3: They cut a pole of exactly that length — without seeing the original.
→ Frame 4: The unit as a shared language for physical quantities.

---

### BB 1141 — Different tools for different quantities

**Floor 0** — you cannot measure heartbeat with a ruler
→ Frame 1: A ruler laid against a beating heart — useless.
→ Frame 2: A stopwatch measuring the time between beats — perfect tool.
→ Frame 3: A thermometer measuring temperature — ruler useless here too.
→ Frame 4: Each quantity needs its own kind of tool.

**Floor 1** — matching tool to quantity
→ Frame 1: A table: LENGTH = ruler, TIME = clock, MASS = scale.
→ Frame 2: TEMPERATURE = thermometer. CURRENT = ammeter.
→ Frame 3: Using the wrong tool — gibberish output.
→ Frame 4: The principle: every quantity has its proper instrument.

---

### BB 1142 — The seven stones

**Floor 0** — seven base quantities
→ Frame 1: A large stone labelled LENGTH.
→ Frame 2: A second stone: MASS. Third: TIME.
→ Frame 3: Four more: TEMPERATURE, CURRENT, AMOUNT, LUMINOSITY.
→ Frame 4: Seven stones in a circle — the foundation of all measurement.

**Floor 1** — all other quantities built from these seven
→ Frame 1: The seven stones in the centre.
→ Frame 2: Speed growing from LENGTH and TIME.
→ Frame 3: Force growing from MASS, LENGTH, TIME.
→ Frame 4: Hundreds of derived quantities branching outward from the seven.

**Floor 2** — the stones are irreducible
→ Frame 1: Trying to express LENGTH from the other six — impossible.
→ Frame 2: Trying to express MASS from the others — impossible.
→ Frame 3: Each stone is independent — cannot be built from its siblings.
→ Frame 4: The seven are the atoms of measurement.

---

### BB 1143 — Mixing the ingredients

**Floor 0** — speed as a combination
→ Frame 1: A LENGTH ingredient and a TIME ingredient on a workbench.
→ Frame 2: Dividing: LENGTH / TIME.
→ Frame 3: A new substance appearing: SPEED.
→ Frame 4: SPEED is not fundamental — it is made from two base ingredients.

**Floor 1** — area as a combination
→ Frame 1: Two LENGTH ingredients.
→ Frame 2: Multiplying: LENGTH x LENGTH.
→ Frame 3: AREA appearing — square metres.
→ Frame 4: AREA = LENGTH^2 — a derived quantity from one ingredient used twice.

**Floor 2** — the recipe book
→ Frame 1: A book labelled DERIVED QUANTITIES.
→ Frame 2: Speed: L/T. Area: L^2. Force: ML/T^2.
→ Frame 3: Every page is a recipe — base quantities as ingredients.
→ Frame 4: An infinite number of derived quantities from seven base ones.

---

### BB 1144 — The revolution of measurement

**Floor 0** — pre-metric chaos
→ Frame 1: A map of France — each region using different units.
→ Frame 2: A merchant crossing a border — different foot, different yard.
→ Frame 3: Weights and measures chaotic — trade impossible.
→ Frame 4: The French Revolution: a demand for a single, rational system.

**Floor 1** — the metric system
→ Frame 1: The metre defined — one ten-millionth of the Earth's meridian.
→ Frame 2: The kilogram — the mass of one litre of water.
→ Frame 3: Base ten everywhere — 1000 metres = 1 kilometre.
→ Frame 4: The metric system spreading across Europe.

**Floor 2** — the platinum bar in Paris
→ Frame 1: A platinum-iridium bar inside a glass dome.
→ Frame 2: Labelled: THE KILOGRAM — the international prototype.
→ Frame 3: Every country's kilogram calibrated against this one bar.
→ Frame 4: The world's mass standard — one object, guarded in a vault.

---

### BB 1145 — Le Grand K

**Floor 0** — the kilogram was a physical object
→ Frame 1: The original platinum kilogram bar inside its bell jar.
→ Frame 2: The year: 1889. Sealed and stored.
→ Frame 3: Six official copies made and sent to countries worldwide.
→ Frame 4: The standard: whatever this bar weighs IS one kilogram.

**Floor 1** — it started drifting
→ Frame 1: The original bar and its copies — compared every 40 years.
→ Frame 2: A scale: original vs copy — slight mismatch: 50 micrograms.
→ Frame 3: Which one is right? The original? A copy? No way to tell.
→ Frame 4: The standard was shifting — the definition of mass was unstable.

**Floor 2** — the problem of a physical standard
→ Frame 1: The bar being cleaned by scientists in gloves.
→ Frame 2: Cleaning removes or deposits atoms — mass changes.
→ Frame 3: The bar in a disaster scenario — fire, earthquake, theft.
→ Frame 4: A physical object cannot be the eternal standard.

**Floor 3** — the solution: a constant of nature
→ Frame 1: Planck's constant h appearing on a board.
→ Frame 2: h is the same everywhere in the universe — never drifts.
→ Frame 3: The kilogram redefined: fix h to an exact number, redefine mass from it.
→ Frame 4: 2019 — Le Grand K retired. The kilogram is now a law of physics.

---

### BB 1146 — Flipping the script on light

**Floor 0** — the old metre: a physical bar
→ Frame 1: A platinum bar in Paris — 1 metre marked on it.
→ Frame 2: Comparing rulers across countries — small errors creeping in.
→ Frame 3: The metre as a physical object — vulnerable to the same problems as the kilogram.
→ Frame 4: Scientists asking: can we do better?

**Floor 1** — the speed of light is constant
→ Frame 1: A laser beam in a vacuum chamber.
→ Frame 2: The measurement: 299,792,458 m/s.
→ Frame 3: Measured again in a different lab — same number.
→ Frame 4: Measured from a distant galaxy — still the same. The speed of light is fixed.

**Floor 2** — freeze the speed of light, redefine the metre
→ Frame 1: The speed of light value declared exact: 299,792,458 m/s.
→ Frame 2: Now metre is defined: the distance light travels in 1/299,792,458 of a second.
→ Frame 3: No bar needed — any lab can reproduce it with a laser and a clock.
→ Frame 4: The metre becomes indestructible — defined by nature, not by an object.

**Floor 3** — what this means
→ Frame 1: A ruler labelled METRE in a lab in Tokyo.
→ Frame 2: A ruler labelled METRE in a lab in Nairobi.
→ Frame 3: Both defined by the same speed of light — identical.
→ Frame 4: No calibration trips to Paris needed. The metre is everywhere.

---

### BB 1147 — The atomic pendulum

**Floor 0** — the problem with the second
→ Frame 1: The Earth spinning — one rotation = one day.
→ Frame 2: A second defined as 1/86,400 of a day.
→ Frame 3: The Earth's spin slightly irregular — days vary by milliseconds.
→ Frame 4: An unreliable clock — the Earth is a bad timekeeper.

**Floor 1** — atoms as perfect clocks
→ Frame 1: A Cesium-133 atom glowing.
→ Frame 2: Microwave radiation exciting the atom — it vibrates at a fixed frequency.
→ Frame 3: The frequency: 9,192,631,770 vibrations per second — always exactly this.
→ Frame 4: Atoms are identical — every Cesium-133 atom vibrates at the same rate.

**Floor 2** — the atomic second defined
→ Frame 1: A counter starting at zero — measuring Cesium vibrations.
→ Frame 2: The counter reaching 9,192,631,770.
→ Frame 3: A bell rings — exactly one second has passed.
→ Frame 4: The atomic second: reproducible in any lab with a Cesium-133 atom.

**Floor 3** — how accurate is it?
→ Frame 1: The atomic clock — a box of lasers and Cesium atoms.
→ Frame 2: Accuracy: off by 1 second in 300 million years.
→ Frame 3: GPS satellites depend on this precision — 1 microsecond error = 300m position error.
→ Frame 4: Your phone knows where it is because of Cesium atoms.

---

### BB 1148 — The final vote

**Floor 0** — the Kibble balance
→ Frame 1: A precision balance with electromagnetic coils.
→ Frame 2: Weighing a mass against electromagnetic force.
→ Frame 3: The electromagnetic force calculated from Planck's constant h.
→ Frame 4: The Kibble balance: a machine that links mass to a quantum constant.

**Floor 1** — measuring Planck's constant
→ Frame 1: The Kibble balance measuring the same kilogram bar repeatedly.
→ Frame 2: Each measurement refining the value of h.
→ Frame 3: After thousands of measurements — h pinned to 10 significant figures.
→ Frame 4: Enough precision to swap the definition: fix h, define kg from it.

**Floor 2** — the 2018 vote
→ Frame 1: Scientists gathered in Versailles — the General Conference on Weights and Measures.
→ Frame 2: A vote called: should we redefine the seven base units?
→ Frame 3: The vote result — unanimous YES.
→ Frame 4: A historic moment: the SI system overhauled.

**Floor 3** — 2019: all seven units tied to constants
→ Frame 1: The seven base units in a circle.
→ Frame 2: Each connected by an arrow to a physical constant: h, c, e, k, NA, etc.
→ Frame 3: The constants are fixed — exact, by definition.
→ Frame 4: The seven units now as permanent as the laws of physics.

---

### BB 1149 — The alphabet of units

**Floor 0** — seven base units like 26 letters
→ Frame 1: The 26 letters of the alphabet arranged in a grid.
→ Frame 2: The seven SI base units arranged the same way: m, kg, s, A, K, mol, cd.
→ Frame 3: Just as words are built from letters, all physical quantities are built from these seven.
→ Frame 4: The alphabet of physics — small set, infinite combinations.

**Floor 1** — combinations are derived units
→ Frame 1: The letters m, s combined into a word.
→ Frame 2: The units m, s combined: m/s (speed).
→ Frame 3: The units kg, m, s combined: kg times m/s^2 (force).
→ Frame 4: Derived units = words built from the seven-letter alphabet.

---

### BB 1150 — The Big Three

**Floor 0** — metre, kilogram, second
→ Frame 1: Three large pillars standing: METRE, KILOGRAM, SECOND.
→ Frame 2: A ruler (metre), a weight on a scale (kilogram), a clock (second).
→ Frame 3: Most everyday physics uses only these three — the MKS system.
→ Frame 4: The MKS trio: the workhorse of classical mechanics.

**Floor 1** — what they cover
→ Frame 1: A car trip — measured in metres, kilograms of fuel, seconds of travel.
→ Frame 2: A thrown ball — position (m), mass (kg), time (s).
→ Frame 3: Newton's second law F=ma — needs only kg, m, s.
→ Frame 4: The Big Three handle almost everything in everyday physics.

**Floor 2** — when they fall short
→ Frame 1: An electric circuit — MKS has no unit for current.
→ Frame 2: A chemistry lab — no unit for amount of substance.
→ Frame 3: A temperature gauge — Kelvin not in MKS.
→ Frame 4: The Big Three plus four more: the full SI system.

---

### BB 1151 — The Other Four

**Floor 0** — Ampere: electric current
→ Frame 1: A wire carrying current — electrons flowing.
→ Frame 2: The Ampere defined: 1 coulomb of charge per second.
→ Frame 3: A circuit diagram with 2A labelled — 2 coulombs per second.
→ Frame 4: The Ampere as the unit that brings electricity into SI.

**Floor 1** — Kelvin: thermodynamic temperature
→ Frame 1: A thermometer showing 0 degrees C = 273.15 K.
→ Frame 2: Absolute zero: 0 K — no lower temperature possible.
→ Frame 3: The Kelvin scale starting at absolute zero, not a human choice.
→ Frame 4: Why Kelvin: physics equations need a scale starting from zero heat.

**Floor 2** — Mole and Candela
→ Frame 1: A mole of substance: 6.022 x 10^23 particles in a container.
→ Frame 2: The mole as a counting unit — like a dozen but for atoms.
→ Frame 3: The Candela: luminous intensity — how bright a light source appears to the human eye.
→ Frame 4: All four combined with MKS — the complete SI system of seven.

---

### BB 1152 — Snapping them together

**Floor 0** — speed from metre and second
→ Frame 1: A metre ruler and a clock — two base units.
→ Frame 2: Combining: metres per second = m/s.
→ Frame 3: A car speedometer — 30 m/s displayed.
→ Frame 4: Speed's unit built by combining two base units.

**Floor 1** — area from metre squared
→ Frame 1: A single metre ruler.
→ Frame 2: Squared: m x m = m^2.
→ Frame 3: A square on a grid — 1 m on each side = 1 m^2.
→ Frame 4: Area needs no new unit — just metres used twice.

**Floor 2** — force from kg, m, s
→ Frame 1: Mass (kg), acceleration (m/s^2) combined.
→ Frame 2: F = ma means unit = kg x m/s^2.
→ Frame 3: This combination has its own name: the Newton.
→ Frame 4: 1 N = 1 kg times m/s^2 — a named derived unit.

**Floor 3** — the pattern
→ Frame 1: A factory: base units go in, derived units come out.
→ Frame 2: Speed, area, volume, density — all built in the factory.
→ Frame 3: Force, energy, pressure, power — more complex combinations.
→ Frame 4: Seven base units give unlimited derived units.

---

### BB 1153 — The disguise

**Floor 0** — named units are dressed-up combinations
→ Frame 1: The Newton (N) — just a name tag on kg times m/s^2.
→ Frame 2: The Joule (J) — just a name tag on kg times m^2/s^2.
→ Frame 3: The Pascal (Pa) — just a name tag on kg/(m times s^2).
→ Frame 4: Named units are convenience — the physics is still base units underneath.

**Floor 1** — the Newton unmasked
→ Frame 1: A force arrow labelled 1 N.
→ Frame 2: Peeling the label — underneath: 1 kg times m/s^2.
→ Frame 3: F = ma confirmed: kg x m/s^2 = kg times m/s^2.
→ Frame 4: The Newton is not fundamental — it is mass x acceleration.

**Floor 2** — the Joule unmasked
→ Frame 1: An energy label: 1 J.
→ Frame 2: Energy = force x distance = N x m = (kg times m/s^2) x m.
→ Frame 3: Joule = kg times m^2/s^2.
→ Frame 4: Every named unit peels away to base units eventually.

**Floor 3** — why give them names?
→ Frame 1: Writing kg times m^2/s^3 for power — clunky, error-prone.
→ Frame 2: Writing W (Watt) instead — clean, memorable.
→ Frame 3: The name does not change the physics — only the notation.
→ Frame 4: Named units: shorthand that hides complexity without hiding truth.

---

### BB 1154 — The built-in lie detector

**Floor 0** — wrong units = wrong answer
→ Frame 1: A speed calculation returning the answer: 12 kg times m.
→ Frame 2: The units checked: kg times m is not m/s. Not a speed.
→ Frame 3: A red alert — the calculation must be wrong.
→ Frame 4: You do not need to know the correct answer to know this is wrong.

**Floor 1** — dimensional analysis as a check
→ Frame 1: The equation v = Ft/m.
→ Frame 2: Substituting units: (kg times m/s^2)(s) / kg.
→ Frame 3: Cancelling: kg cancels, s^2 x s^-1 = s^1, leaves m/s.
→ Frame 4: The answer has units of m/s — correct for velocity. Equation passes.

**Floor 2** — catching formula errors
→ Frame 1: A student writes: E = mv (energy = mass x velocity).
→ Frame 2: Check: kg x m/s = kg times m/s. Not an energy unit.
→ Frame 3: Energy should be kg times m^2/s^2. The formula is wrong.
→ Frame 4: The lie detector catches the error before any number is used.

**Floor 3** — what dimensional analysis cannot catch
→ Frame 1: The formula E = 2mv^2 — dimensionally correct.
→ Frame 2: But the true formula is (1/2)mv^2 — the factor 2 is wrong.
→ Frame 3: Pure numbers have no dimensions — they pass through invisibly.
→ Frame 4: Dimensional analysis finds wrong types; it does not find wrong numbers.

---

### BB 1155 — The problem with the metre

**Floor 0** — the Moon is 384 million metres away
→ Frame 1: The Earth and Moon — the gap between them.
→ Frame 2: The label: 384,000,000 metres.
→ Frame 3: The number stretching across the screen — impractically long.
→ Frame 4: Scientists shaking their heads — a better way is needed.

**Floor 1** — large numbers become unwieldy
→ Frame 1: The radius of the Earth: 6,371,000 m — seven digits.
→ Frame 2: The distance to the Sun: 149,600,000,000 m — twelve digits.
→ Frame 3: Writing these numbers — error-prone, slow.
→ Frame 4: The cry for a scaling system — prefixes.

**Floor 2** — the solution: prefixes
→ Frame 1: The prefix KILO appearing — x1000.
→ Frame 2: 384,000,000 m becomes 384,000 km. Shorter already.
→ Frame 3: MEGA — x1,000,000. 384 Mm. Even shorter.
→ Frame 4: The prefix system: same unit, scaled for the size of the problem.

---

### BB 1156 — The sliding scale

**Floor 0** — prefixes multiply or divide
→ Frame 1: A base unit block: 1 METRE.
→ Frame 2: KILO attached — block grows 1000x: 1 KILOMETRE.
→ Frame 3: MILLI attached — block shrinks 1000x: 1 MILLIMETRE.
→ Frame 4: The same unit sliding up and down a scale.

**Floor 1** — kilo = x1000
→ Frame 1: 1 km on a road sign.
→ Frame 2: Expanding: 1 km = 1000 m.
→ Frame 3: A person walking 1 km — 1000 steps of roughly 1 m.
→ Frame 4: KILO: the most common prefix in everyday use.

**Floor 2** — milli = divide by 1000
→ Frame 1: A ruler with 1 mm marked.
→ Frame 2: Expanding: 1 mm = 0.001 m = 10^-3 m.
→ Frame 3: A human hair: roughly 0.07 mm. An ant: roughly 1 mm.
→ Frame 4: MILLI: for small things that still need a number.

**Floor 3** — the full prefix table
→ Frame 1: Prefix table upper end: tera (10^12), giga (10^9), mega (10^6), kilo (10^3).
→ Frame 2: Continuation: base (10^0), milli (10^-3), micro (10^-6), nano (10^-9).
→ Frame 3: Pico (10^-12) — atom scale. Femto (10^-15) — nuclear scale.
→ Frame 4: The prefix ladder: 27 orders of magnitude in a clean system.

---

### BB 1157 — Orders of magnitude

**Floor 0** — jumps of 10
→ Frame 1: The number 1. Multiply by 10 gives 10. Multiply again gives 100.
→ Frame 2: Each multiplication: one order of magnitude.
→ Frame 3: 10 orders of magnitude = 10 billion times larger.
→ Frame 4: Orders of magnitude as a ruler for comparing vastly different sizes.

**Floor 1** — whale vs dog vs mouse
→ Frame 1: A blue whale — 30 m long.
→ Frame 2: A dog — 0.5 m long.
→ Frame 3: A mouse — 0.05 m long.
→ Frame 4: Whale to mouse: about 3 orders of magnitude. 1000x size difference.

**Floor 2** — why it matters
→ Frame 1: An engineer given two options — one costs 1000x more than the other.
→ Frame 2: Three orders of magnitude difference in cost — completely different proposals.
→ Frame 3: Without order-of-magnitude thinking, you can waste time on the wrong option.
→ Frame 4: Order of magnitude: the first question before any detailed calculation.

---

### BB 1158 — The blindfolded walk

**Floor 0** — distance without direction is incomplete
→ Frame 1: A person blindfolded — told to walk 10 metres.
→ Frame 2: They walk north 10 metres.
→ Frame 3: They could have walked east 10 metres — totally different location.
→ Frame 4: 10 metres: a distance, not a destination. Direction was missing.

**Floor 1** — the compass and direction
→ Frame 1: A compass rose — north, south, east, west.
→ Frame 2: "Walk 10 metres north" — now unambiguous.
→ Frame 3: The person arriving at the correct location.
→ Frame 4: DIRECTION is the missing ingredient that turns distance into displacement.

**Floor 2** — when direction matters
→ Frame 1: A ship — 20 km from port, but in which direction?
→ Frame 2: 20 km north: safe harbour. 20 km south: rocky reef.
→ Frame 3: Without direction, position is useless.
→ Frame 4: All navigation requires direction, not just distance.

---

### BB 1159 — Scalars and vectors

**Floor 0** — scalar: amount only
→ Frame 1: A thermometer — 22 degrees C.
→ Frame 2: No direction needed — temperature is just a number.
→ Frame 3: Mass, speed, temperature, time — all just numbers.
→ Frame 4: SCALAR = one number. No direction required.

**Floor 1** — vector: amount with direction
→ Frame 1: A force arrow — 10 N.
→ Frame 2: The arrow pointing north. 10 N northward.
→ Frame 3: The same arrow pointing east — different vector, same magnitude.
→ Frame 4: VECTOR = magnitude plus direction. Both required.

**Floor 2** — everyday scalars
→ Frame 1: A scale showing 70 kg — mass, no direction.
→ Frame 2: A thermometer — 37 degrees C — no direction.
→ Frame 3: A clock — 5 seconds — no direction.
→ Frame 4: Scalars are the simpler quantities: just a number and a unit.

**Floor 3** — everyday vectors
→ Frame 1: Wind: 20 km/h from the northwest — direction essential.
→ Frame 2: Gravity: 9.8 m/s^2 downward — direction defines which way.
→ Frame 3: Velocity: 30 m/s eastward — not just how fast, but where going.
→ Frame 4: Vectors: the quantities where direction changes everything.

---

### BB 1160 — Speed vs velocity

**Floor 0** — a car driving in a circle
→ Frame 1: A car on a circular track — constant speed, 60 km/h on the speedometer.
→ Frame 2: The car at the top of the circle — moving left.
→ Frame 3: The car at the bottom — moving right.
→ Frame 4: Same speed everywhere, different velocity — direction keeps changing.

**Floor 1** — speed is a scalar
→ Frame 1: The speedometer — 60 km/h.
→ Frame 2: No arrow, no direction — just a number.
→ Frame 3: Speed can be added like numbers: 30 plus 30 = 60 km/h.
→ Frame 4: SPEED: how fast, not where going.

**Floor 2** — velocity is a vector
→ Frame 1: Velocity arrow at the top of the circle — pointing left.
→ Frame 2: Velocity arrow at the right — pointing down.
→ Frame 3: Same magnitude (60 km/h), different direction — different velocity.
→ Frame 4: VELOCITY: how fast AND in which direction.

**Floor 3** — changing velocity without changing speed
→ Frame 1: The car turning — speed unchanged, direction changing.
→ Frame 2: Velocity changing even though the speedometer is steady.
→ Frame 3: A force must be acting to change velocity — centripetal force.
→ Frame 4: Acceleration can happen without speeding up or slowing down.

---

### BB 1161 — The map problem

**Floor 0** — a line segment: no direction
→ Frame 1: A horizontal line segment on a map.
→ Frame 2: The question: which way does it go? Left or right?
→ Frame 3: A segment has length but no direction — ambiguous.
→ Frame 4: The problem: to represent displacement, direction must be added.

**Floor 1** — a ray has direction but no endpoint
→ Frame 1: A ray starting at a point — extending infinitely to the right.
→ Frame 2: Direction clear, but no defined endpoint — where does it stop?
→ Frame 3: A displacement must have a starting and ending point — a ray alone fails.
→ Frame 4: Vectors need both: defined length AND direction.

**Floor 2** — the vector solution
→ Frame 1: A line segment with an arrowhead added to one end.
→ Frame 2: The arrowhead indicating direction: this is where it points.
→ Frame 3: Fixed length (magnitude) and fixed direction — both captured.
→ Frame 4: The vector arrow: the solution to the map problem.

**Floor 3** — vectors on a map
→ Frame 1: A map with a displacement vector: 5 km northeast.
→ Frame 2: The arrow starting at a city, ending at a destination.
→ Frame 3: Magnitude: 5 km. Direction: northeast. Both readable from the arrow.
→ Frame 4: The vector is the language of navigation.

---

### BB 1162 — The dumb stick

**Floor 0** — a segment has length but no direction
→ Frame 1: A line segment — 5 cm long.
→ Frame 2: The segment flipped — still 5 cm, but now pointing the other way.
→ Frame 3: Same segment, same length — but totally different meaning on a map.
→ Frame 4: The segment is dumb: it cannot distinguish left from right.

**Floor 1** — why this is a problem for physics
→ Frame 1: Displacement of 5 km east — drawn as a segment.
→ Frame 2: Displacement of 5 km west — same segment.
→ Frame 3: The physics is completely different — the segment fails to show it.
→ Frame 4: Physics needs directed quantities — segments are insufficient.

**Floor 2** — the fix is already known
→ Frame 1: The segment sitting alone — passive, directionless.
→ Frame 2: An arrowhead approaching — about to be added.
→ Frame 3: The arrowhead snapped onto one end — transformation complete.
→ Frame 4: A vector: the dumb stick, made smart.

---

### BB 1163 — The hack

**Floor 0** — adding an arrowhead
→ Frame 1: A plain line segment on a grid.
→ Frame 2: A small arrowhead drawn at the right end.
→ Frame 3: The segment now has a definite direction — left to right.
→ Frame 4: The hack: one small mark, one enormous new capability.

**Floor 1** — the arrowhead convention
→ Frame 1: An arrow pointing right — the "tip" end.
→ Frame 2: The tail end (no arrowhead) — the starting point.
→ Frame 3: Convention: direction = from tail to tip.
→ Frame 4: The same segment reversed — arrow now points left. Different vector.

**Floor 2** — equal vectors can be anywhere on the page
→ Frame 1: An arrow pointing right — 3 cm long.
→ Frame 2: A second arrow — same length, same direction — but placed elsewhere.
→ Frame 3: Both represent the same vector: same magnitude, same direction.
→ Frame 4: Position on the page is irrelevant — only length and direction define a vector.

---

### BB 1164 — Drawing reality

**Floor 0** — longer arrow = greater magnitude
→ Frame 1: A slow car — a short arrow representing its velocity.
→ Frame 2: A fast car — a longer arrow, same direction.
→ Frame 3: The length encodes the magnitude — longer = faster.
→ Frame 4: The arrow is a visual representation of the physical quantity.

**Floor 1** — arrow direction = direction of motion
→ Frame 1: A car moving right — arrow pointing right.
→ Frame 2: The same car turning — arrow now points up-right.
→ Frame 3: The car reversing — arrow now points left.
→ Frame 4: The arrow tracks reality: direction changes, arrow changes.

**Floor 2** — forces drawn as arrows
→ Frame 1: A box on a table — a downward arrow: gravity.
→ Frame 2: An upward arrow — normal force from the table.
→ Frame 3: Both arrows same length — forces balanced.
→ Frame 4: If gravity arrow were longer — box would accelerate downward.

---

### BB 1165 — The broken math

**Floor 0** — 1 plus 1 can equal 0
→ Frame 1: Two people pushing a box from opposite sides.
→ Frame 2: Each pushing with force 1 N — opposite directions.
→ Frame 3: Net force: 1 plus negative 1 = 0. The box does not move.
→ Frame 4: With vectors, 1 plus 1 = 0 is not wrong — it depends on direction.

**Floor 1** — why ordinary arithmetic fails
→ Frame 1: Two displacement arrows — each 5 km, but opposite directions.
→ Frame 2: Adding like regular numbers: 5 plus 5 = 10 km. Wrong.
→ Frame 3: Correct: 5 km right plus 5 km left = 0 displacement.
→ Frame 4: Vectors must be added with direction, not just magnitude.

**Floor 2** — the range of possible sums
→ Frame 1: Two vectors — each 3 units long, same direction. Sum = 6 units.
→ Frame 2: Same two vectors — opposite directions. Sum = 0 units.
→ Frame 3: Same two vectors — perpendicular. Sum = root(18) approximately 4.2 units.
→ Frame 4: The sum of two equal vectors can be anything from 0 to 6 depending on angle.

---

### BB 1166 — The shortcut

**Floor 0** — tip-to-tail addition
→ Frame 1: Vector A drawn — an arrow pointing northeast.
→ Frame 2: Vector B placed with its tail at A's tip — pointing east.
→ Frame 3: The resultant: drawn from A's tail to B's tip.
→ Frame 4: The shortcut: place vectors tip-to-tail, the resultant closes the triangle.

**Floor 1** — the resultant vector
→ Frame 1: Vector A: 3 km north. Vector B: 4 km east.
→ Frame 2: Placed tip-to-tail on a grid.
→ Frame 3: The resultant arrow closing the triangle.
→ Frame 4: Length by Pythagoras: root(3^2 + 4^2) = 5 km northeast.

**Floor 2** — why it works for any direction
→ Frame 1: Two vectors at an awkward angle — neither north nor east.
→ Frame 2: Tip-to-tail placement — the resultant closing the triangle.
→ Frame 3: No special grid needed — the method works for any two vectors.
→ Frame 4: The parallelogram law: same result, different visual approach.

---

### BB 1167 — The number list

**Floor 0** — a vector as a list of numbers
→ Frame 1: A vector arrow on a 2D grid — pointing northeast.
→ Frame 2: Measuring its east component: 3 units.
→ Frame 3: Measuring its north component: 4 units.
→ Frame 4: The vector = [3, 4]. A list of two numbers replaces the arrow.

**Floor 1** — why lists are better for computers
→ Frame 1: An arrow on a screen — hard to process.
→ Frame 2: The same vector as numbers: [3, 4] — easy to store and calculate.
→ Frame 3: Adding vectors: [3,4] plus [1,2] = [4,6]. Ordinary addition per component.
→ Frame 4: A computer adding millions of vectors in a second — all as number lists.

**Floor 2** — into the computer
→ Frame 1: A physics simulation — objects with position vectors [x, y].
→ Frame 2: Each frame: [x, y] updated by adding velocity [vx, vy].
→ Frame 3: The object moving across the screen — powered by vector arithmetic.
→ Frame 4: Every video game, every flight simulator, every physics engine: vectors as lists.

---

### BB 1168 — Stepping off the paper

**Floor 0** — 2D to 3D
→ Frame 1: A vector on a flat 2D grid: [3, 4].
→ Frame 2: A third axis rising from the page: z.
→ Frame 3: A 3D vector: [3, 4, 7].
→ Frame 4: Same rules — just one more number in the list.

**Floor 1** — beyond 3D
→ Frame 1: A 3D vector [x, y, z].
→ Frame 2: A fourth number added: [x, y, z, w]. 4D.
→ Frame 3: A thousand numbers: [x1, x2, ... x1000]. 1000D.
→ Frame 4: The computer doesn't care — it just processes a list.

**Floor 2** — high-dimensional spaces
→ Frame 1: A 2D map — you can visualise it.
→ Frame 2: A 3D space — you can still visualise it.
→ Frame 3: A 1000D space — impossible to picture but perfectly well-defined mathematically.
→ Frame 4: High-dimensional vectors: the language of machine learning and physics simulations.

---

### BB 1169 — The AI map

**Floor 0** — a face as a 128-number vector
→ Frame 1: A face captured by a camera.
→ Frame 2: A neural network processing the face — measuring 128 features.
→ Frame 3: The output: [0.7, 0.2, 0.9, ...] — 128 numbers.
→ Frame 4: The face is now a point in 128-dimensional space.

**Floor 1** — facial recognition as geometry
→ Frame 1: Two face-vectors in the 128D space — represented as points.
→ Frame 2: The distance between them calculated — like Pythagoras in 128D.
→ Frame 3: Small distance = similar faces. Large distance = different faces.
→ Frame 4: Face matching: geometry in high-dimensional vector space.

**Floor 2** — vectors are everywhere in AI
→ Frame 1: A word: "king" — represented as a 300-number vector.
→ Frame 2: "king" minus "man" plus "woman" gives approximately "queen" — vector arithmetic on words.
→ Frame 3: A song: a vector of audio features — feeding a recommendation engine.
→ Frame 4: AI's secret: it turns everything into vectors and does geometry.

---

### BB 1174 — Motion in the sky

**Floor 0** — asteroid intro
→ Frame 1: An asteroid tumbling silently in deep space.
→ Frame 2: Earth visible in the distance.
→ Frame 3: The asteroid's path plotted — heading toward Earth.
→ Frame 4: The scene set: an object in motion, a collision course.

**Floor 1** — speed, velocity, acceleration are distinct
→ Frame 1: The asteroid with a speed label: 20 km/s.
→ Frame 2: A direction arrow added — now it's a velocity.
→ Frame 3: Earth's gravity pulling — the velocity changing: now it's accelerating.
→ Frame 4: Three separate concepts, each more information than the last.

---

### BB 1175 — The target

**Floor 0** — speed is a scalar
→ Frame 1: The asteroid with a speed readout: 20 km/s.
→ Frame 2: The number alone — no direction.
→ Frame 3: Another asteroid at 20 km/s — moving in a completely different direction.
→ Frame 4: Same speed, different story — speed does not tell you where it's going.

**Floor 1** — velocity is directed
→ Frame 1: The asteroid with a velocity arrow: 20 km/s toward Earth.
→ Frame 2: The arrow pinning the direction — no ambiguity.
→ Frame 3: A deflection mission changing the arrow's direction.
→ Frame 4: Same speed, different direction — now it misses Earth. Velocity changed; speed did not.

**Floor 2** — the importance of direction in prediction
→ Frame 1: A radar tracking an object at 20 km/s.
→ Frame 2: Without direction — the object could be anywhere on a sphere.
→ Frame 3: With direction — its future position predicted precisely.
→ Frame 4: Direction is the key that unlocks prediction from speed.

---

### BB 1176 — The buildup

**Floor 0** — gravity accelerates the asteroid
→ Frame 1: The asteroid far from Earth — moving slowly.
→ Frame 2: Earth's gravity field extending outward.
→ Frame 3: The asteroid entering the field — beginning to speed up.
→ Frame 4: Acceleration: the asteroid gaining speed every second.

**Floor 1** — acceleration accumulates into velocity
→ Frame 1: Velocity at t=0: 20 km/s.
→ Frame 2: After 1 hour: 20.035 km/s — gravity adding speed.
→ Frame 3: After 10 hours: 20.35 km/s — still building.
→ Frame 4: The accumulation is relentless — the closer it gets, the faster it accelerates.

**Floor 2** — the impact
→ Frame 1: The asteroid hitting the atmosphere — a fireball.
→ Frame 2: The impact at final velocity — far faster than it started.
→ Frame 3: The crater forming — releasing enormous energy.
→ Frame 4: All that energy: built up by gravitational acceleration over millions of kilometres.

---

### BB 1177 — The city bus

**Floor 0** — speed: what the dashboard shows
→ Frame 1: A city bus at a stop — passengers boarding.
→ Frame 2: The bus pulling away — the speedometer needle rising.
→ Frame 3: The speedometer showing 40 km/h.
→ Frame 4: SPEED: the single number on the dashboard.

**Floor 1** — velocity: speed plus lane
→ Frame 1: The bus at 40 km/h heading north on a street.
→ Frame 2: A second bus at 40 km/h — heading east.
→ Frame 3: Same speed, totally different paths — different velocities.
→ Frame 4: VELOCITY: speed plus the direction it's heading.

**Floor 2** — acceleration: the speedometer changing
→ Frame 1: The bus at a red light — speedometer at 0.
→ Frame 2: Green light — the needle rising: 10, 20, 30, 40 km/h.
→ Frame 3: Braking — the needle falling: 40, 30, 20, 10, 0.
→ Frame 4: ACCELERATION: how fast the speedometer's number is changing.

**Floor 3** — all three at once
→ Frame 1: The bus in motion — a speed number, a direction arrow, a changing speedometer.
→ Frame 2: Speed: 40 km/h (scalar).
→ Frame 3: Velocity: 40 km/h north (vector).
→ Frame 4: Acceleration: the rate the velocity changes — zero at constant speed, positive when speeding up.

---

### BB 1178 — The illusion of friction

**Floor 0** — a car coasting to a stop
→ Frame 1: A car engine switched off on a flat road — moving at 30 km/h.
→ Frame 2: The car gradually slowing without any braking.
→ Frame 3: The car coming to rest — it stopped without intervention.
→ Frame 4: Aristotle's instinct: motion fades naturally. But why?

**Floor 1** — friction is responsible
→ Frame 1: The car's tyres on the road — a friction force shown.
→ Frame 2: The friction opposing motion — arrow pointing backward.
→ Frame 3: The friction draining the car's velocity each second.
→ Frame 4: Friction, not natural decay — the car stopped because a force acted.

**Floor 2** — on ice, motion persists
→ Frame 1: A hockey puck sliding on smooth ice.
→ Frame 2: Very little friction — the puck glides for a long distance.
→ Frame 3: In a vacuum with no friction — it would never stop.
→ Frame 4: Without friction, the illusion dissolves: motion does not naturally fade.

**Floor 3** — Newton's insight
→ Frame 1: The car again — but now with friction arrows visible.
→ Frame 2: Remove friction mentally — the car would coast forever.
→ Frame 3: The real world has friction everywhere — making it seem like motion ends.
→ Frame 4: Newton saw through the illusion: friction was hiding the truth.

---

### BB 1179 — The stubbornness of matter

**Floor 0** — things hold on to their motion
→ Frame 1: A marble rolling across a smooth floor.
→ Frame 2: No force applied — it keeps rolling.
→ Frame 3: A gentle nudge sideways — the marble changes course slightly.
→ Frame 4: Matter resists change — it wants to keep doing what it's doing.

**Floor 1** — inertia defined
→ Frame 1: A large boulder — very hard to start moving.
→ Frame 2: A feather — easy to start moving.
→ Frame 3: The same boulder in motion — very hard to stop.
→ Frame 4: INERTIA: the tendency of matter to resist changes in its state of motion.

**Floor 2** — Newton's first law
→ Frame 1: An object at rest — no force, stays at rest.
→ Frame 2: An object in motion — no force, continues in motion.
→ Frame 3: A force applied — and only then does the motion change.
→ Frame 4: First Law: without a net force, nothing changes.

---

### BB 1180 — The hidden tug-of-war

**Floor 0** — the cargo ship at rest
→ Frame 1: A massive cargo ship sitting perfectly still on a calm ocean.
→ Frame 2: The question: what is holding it up? What is holding it in place?
→ Frame 3: Invisible force arrows appearing — gravity, buoyancy, water tension.
→ Frame 4: The ship is not simply sitting — it is at the centre of a tug-of-war.

**Floor 1** — gravity and buoyancy
→ Frame 1: Gravity arrow — enormous, pointing straight down.
→ Frame 2: Buoyancy arrow — equally enormous, pointing straight up.
→ Frame 3: The arrows identical in length — perfectly matched.
→ Frame 4: Net vertical force: zero. The ship neither sinks nor rises.

**Floor 2** — horizontal forces cancel too
→ Frame 1: Wind pushing the ship eastward — a force arrow.
→ Frame 2: Water drag resisting the push — opposite arrow.
→ Frame 3: Anchor tension — any remaining drift corrected.
→ Frame 4: Horizontal net force: zero. The ship does not drift.

**Floor 3** — equilibrium everywhere
→ Frame 1: A bridge — under enormous tension and compression simultaneously.
→ Frame 2: Every force pair cancelling — the bridge stands motionless.
→ Frame 3: A standing person — gravity and ground reaction cancelling.
→ Frame 4: Stillness is not the absence of forces — it is forces in balance.

---

### BB 1181 — Breaking the balance

**Floor 0** — the engine fires
→ Frame 1: The cargo ship at rest — all forces balanced.
→ Frame 2: The engine starting — a thrust force arrow appearing.
→ Frame 3: Thrust exceeds water drag — the balance breaks.
→ Frame 4: The ship begins to accelerate — an unbalanced force acting.

**Floor 1** — unbalanced force leads to acceleration
→ Frame 1: Force arrows before engine: gravity=buoyancy, drag=0. Net=0.
→ Frame 2: Engine adds 50,000 N forward thrust.
→ Frame 3: Net force = 50,000 N forward — not zero.
→ Frame 4: The ship accelerates at a = F/m — slowly, given its mass.

**Floor 2** — reaching a new balance
→ Frame 1: The ship accelerating — building speed.
→ Frame 2: As speed increases, water drag increases.
→ Frame 3: At a certain speed: drag equals thrust — balance restored.
→ Frame 4: The ship holds this speed — a new equilibrium at cruising velocity.

---

### BB 1182 — The exact price of speed

**Floor 0** — a shopping cart
→ Frame 1: An empty shopping cart — a gentle push, quick acceleration.
→ Frame 2: The same cart loaded with bricks — same push, much slower.
→ Frame 3: The pattern: more mass = less acceleration for same force.
→ Frame 4: The relationship is exact, not vague — F = ma.

**Floor 1** — F = ma: the equation
→ Frame 1: Three dials: Force (N), Mass (kg), Acceleration (m/s^2).
→ Frame 2: Set F=10N, m=2kg: a = 5 m/s^2.
→ Frame 3: Double the mass: m=4kg, F=10N: a = 2.5 m/s^2.
→ Frame 4: The equation is a machine: turn one dial, another dial moves.

**Floor 2** — bricks halve the acceleration
→ Frame 1: A cart — mass 10 kg. Force 20 N. Acceleration = 2 m/s^2.
→ Frame 2: Bricks added — mass 20 kg. Same force 20 N.
→ Frame 3: New acceleration = 20/20 = 1 m/s^2. Exactly half.
→ Frame 4: Doubling the mass halves the acceleration — a precise, predictable law.

**Floor 3** — the price of speed in rockets
→ Frame 1: A rocket burning fuel — getting lighter as it climbs.
→ Frame 2: Same thrust, decreasing mass — acceleration increases over time.
→ Frame 3: The rocket accelerating faster as it burns fuel — the mass shrinking.
→ Frame 4: Same thrust, less mass — acceleration grows as fuel burns.

---

### BB 1183 — Nature's balance sheet

**Floor 0** — every force has a counter
→ Frame 1: A ledger — two columns: ACTION and REACTION.
→ Frame 2: A force entered in the action column.
→ Frame 3: An equal and opposite force entered automatically in the reaction column.
→ Frame 4: Nature's ledger always balances — no force exists without its partner.

**Floor 1** — a rock pushed into the ground
→ Frame 1: A boot pressing down on a rock — a downward force.
→ Frame 2: The rock pressing back up on the boot — the reaction.
→ Frame 3: Both forces exist simultaneously — you cannot have one without the other.
→ Frame 4: Push the Earth: the Earth pushes you back. Always.

**Floor 2** — Third Law: F_AB = negative F_BA
→ Frame 1: Object A and Object B facing each other.
→ Frame 2: A pushes B: force vector pointing right.
→ Frame 3: B pushes A: force vector pointing left, same magnitude.
→ Frame 4: The equation: force on B by A = negative (force on A by B). Equal, opposite, simultaneous.

**Floor 3** — no one-sided forces exist
→ Frame 1: A magnet attracting a nail.
→ Frame 2: The nail also attracting the magnet — equally.
→ Frame 3: The force is mutual — both objects feel it.
→ Frame 4: In nature, all forces come in pairs. There are no one-sided forces.

---

### BB 1184 — The trap of equal forces

**Floor 0** — if forces cancel, why does anything move?
→ Frame 1: A hand pushing a wall — force applied.
→ Frame 2: The wall pushing back — equal and opposite.
→ Frame 3: A student confused: if they cancel, nothing should move?
→ Frame 4: The trap: the forces act on DIFFERENT objects. They don't cancel each other.

**Floor 1** — forces on different objects
→ Frame 1: A skater pushing a wall.
→ Frame 2: Wall pushes skater back — the reaction.
→ Frame 3: The reaction force is on the SKATER, not the wall.
→ Frame 4: Forces of a Third Law pair never act on the same object.

**Floor 2** — the skater moves, the wall does not
→ Frame 1: The skater pushing the wall — wall attached to the Earth.
→ Frame 2: The wall pushes the skater backward — skater accelerates.
→ Frame 3: The Earth also accelerates — by an imperceptible amount.
→ Frame 4: Different masses: same force, vastly different accelerations.

**Floor 3** — separating the pairs
→ Frame 1: A free-body diagram of just the skater — one force: wall's push backward.
→ Frame 2: A free-body diagram of just the wall — one force: skater's push forward.
→ Frame 3: Neither diagram shows both — each object gets its own analysis.
→ Frame 4: The key: always draw the forces on ONE object at a time.

---

### BB 1185 — Unequal results

**Floor 0** — rifle and bullet
→ Frame 1: A rifle loaded and aimed — held by a shooter.
→ Frame 2: The trigger pulled — the bullet launching forward.
→ Frame 3: The rifle kicking backward — recoil.
→ Frame 4: Same force magnitude on bullet and rifle — very different outcomes.

**Floor 1** — same force, different mass
→ Frame 1: The bullet: mass 10 g. The rifle: mass 4 kg.
→ Frame 2: Same force applied to both — Third Law.
→ Frame 3: Bullet: a = F/0.01 = enormous acceleration.
→ Frame 4: Rifle: a = F/4 = tiny acceleration. Same force, 400x mass difference.

**Floor 2** — walking pushes the Earth
→ Frame 1: A person taking a step — foot pushing backward on the ground.
→ Frame 2: The ground pushing the person forward — they walk.
→ Frame 3: The ground's reaction also pushes the Earth backward.
→ Frame 4: The Earth recoils — immeasurably small, but real.

**Floor 3** — consequences of mass asymmetry
→ Frame 1: Two ice skaters — one large, one small — pushing off each other.
→ Frame 2: Same force on both.
→ Frame 3: Small skater flies back fast. Large skater drifts back slowly.
→ Frame 4: The Third Law is equal in force — never equal in acceleration.

---

### BB 1186 — Shifting the momentum

**Floor 0** — momentum defined
→ Frame 1: A moving truck — heavy and fast.
→ Frame 2: Momentum = mass x velocity = p = mv.
→ Frame 3: The truck's momentum: large mass x significant speed = enormous momentum.
→ Frame 4: A ping-pong ball at the same speed — tiny momentum. Mass matters.

**Floor 1** — conservation of momentum
→ Frame 1: Two billiard balls — one stationary, one moving.
→ Frame 2: The moving ball hits the stationary one — collision.
→ Frame 3: After collision: the first ball stops, the second moves.
→ Frame 4: Total momentum before = total after. The momentum shifted accounts.

**Floor 2** — momentum can only shift, not vanish
→ Frame 1: A ledger: total momentum column — constant throughout.
→ Frame 2: Ball A loses 5 kg·m/s. Ball B gains 5 kg·m/s.
→ Frame 3: No momentum created or destroyed — only transferred.
→ Frame 4: Conservation of momentum: a closed account that never empties.

---

### BB 1187 — Pushing against nothing

**Floor 0** — the newspaper mocks Goddard
→ Frame 1: A 1920 newspaper headline: ROCKET SCIENTIST IGNORES LAWS OF PHYSICS.
→ Frame 2: The editorial: a rocket needs air to push against — in space it will do nothing.
→ Frame 3: Goddard in his workshop, reading the headline.
→ Frame 4: He knows something the editors do not — rockets push against their own exhaust.

**Floor 1** — a rocket pushes its own exhaust
→ Frame 1: A rocket in space — no air, no ground.
→ Frame 2: Exhaust gases ejected downward at high speed.
→ Frame 3: Third Law: the rocket pushed down on the gas, the gas pushes the rocket up.
→ Frame 4: No air required — the rocket is its own source of thrust.

**Floor 2** — works in vacuum
→ Frame 1: A rocket in deep space — no atmosphere.
→ Frame 2: Exhaust gases blasting out the back — the rocket accelerating.
→ Frame 3: The vacuum is irrelevant — what matters is the exhaust, not the surrounding medium.
→ Frame 4: The newspaper was wrong. Newton's Third Law works in vacuum.

**Floor 3** — Apollo retraction
→ Frame 1: Apollo 11 launching — 1969.
→ Frame 2: The New York Times printing a retraction: it is now established that a rocket can function in a vacuum.
→ Frame 3: The editors acknowledging: Newton was right. Goddard was right.
→ Frame 4: 49 years between Goddard's paper and the retraction.

---

### BB 1188 — The amount of stuff

**Floor 0** — mass: how hard to get moving
→ Frame 1: A feather on a surface — a breath of air sends it flying.
→ Frame 2: A lead weight — a significant push barely moves it.
→ Frame 3: The difference: not size, not material — mass.
→ Frame 4: Mass = the quantity that determines resistance to acceleration.

**Floor 1** — mass vs volume
→ Frame 1: A balloon — large volume, tiny mass.
→ Frame 2: A lead ball — small volume, large mass.
→ Frame 3: Same size objects of different materials — very different masses.
→ Frame 4: Mass is not size — it is the amount of matter, regardless of how spread out.

**Floor 2** — mass never changes
→ Frame 1: An astronaut on Earth — mass 70 kg.
→ Frame 2: The same astronaut on the Moon — mass still 70 kg.
→ Frame 3: In deep space — mass still 70 kg.
→ Frame 4: Mass is an intrinsic property — it does not depend on location.

---

### BB 1189 — The local gravity

**Floor 0** — weight = force of gravity
→ Frame 1: A 1 kg bag of sugar on a scale.
→ Frame 2: Earth's gravity pulling it down: F = mg = 1 x 9.8 = 9.8 N.
→ Frame 3: The scale reading the force — 9.8 Newtons.
→ Frame 4: WEIGHT is a force — measured in Newtons, not kilograms.

**Floor 1** — on the Moon: g = 1.6 m/s^2
→ Frame 1: The same bag of sugar on a Moon surface scale.
→ Frame 2: Weight = 1 x 1.6 = 1.6 N. Only 1/6 of Earth weight.
→ Frame 3: The bag feels lighter — not because it changed, but because gravity changed.
→ Frame 4: Weight depends on local gravity. Mass does not.

**Floor 2** — the bathroom scale misleads
→ Frame 1: A bathroom scale showing 70 kg.
→ Frame 2: The scale is measuring force (weight) and converting using Earth's g.
→ Frame 3: On the Moon the same scale would show roughly 12 kg — still measuring force.
→ Frame 4: The scale lies: it shows kg but measures Newtons.

**Floor 3** — hammer and feather in vacuum
→ Frame 1: An Apollo astronaut on the Moon — holding a hammer and a feather.
→ Frame 2: Both released simultaneously.
→ Frame 3: In vacuum, no air drag — both fall at identical rate.
→ Frame 4: g is the same for all objects — gravity accelerates all masses equally.

---

### BB 1190 — The moving baseline

**Floor 0** — a cup still on a moving train
→ Frame 1: A train moving at 100 km/h — a cup sitting on the tray table.
→ Frame 2: From the passenger's view: the cup is perfectly still.
→ Frame 3: From the platform: the cup is moving at 100 km/h.
→ Frame 4: Both descriptions correct — the reference frame determines what is "still."

**Floor 1** — the frame of reference
→ Frame 1: The passenger as an observer — the train is their reference frame.
→ Frame 2: The platform observer — the ground is their reference frame.
→ Frame 3: Both describing the cup's motion — neither is wrong.
→ Frame 4: FRAME OF REFERENCE: the chosen point from which motion is measured.

**Floor 2** — switching frames changes the description
→ Frame 1: The passenger stands and walks forward in the train — 1 m/s relative to train.
→ Frame 2: From inside the train: they walk at 1 m/s.
→ Frame 3: From the platform: they move at 101 km/h.
→ Frame 4: The frame transforms the description — but not the underlying physics.

**Floor 3** — the physics is the same in all frames
→ Frame 1: The cup falling from the tray in the train — both observers see it fall.
→ Frame 2: The equations governing the fall — identical in both frames.
→ Frame 3: Different numbers, same laws.
→ Frame 4: Physics is frame-independent even when descriptions are frame-dependent.

---

### BB 1191 — Adding the velocities

**Floor 0** — train and passenger combined
→ Frame 1: A train moving right at 10 m/s.
→ Frame 2: A passenger walking right inside the train at 2 m/s.
→ Frame 3: From the platform: 10 plus 2 = 12 m/s.
→ Frame 4: Velocities add when directions match.

**Floor 1** — walking backward on the train
→ Frame 1: The same train at 10 m/s.
→ Frame 2: The passenger walking backward at 2 m/s relative to train.
→ Frame 3: Platform view: 10 minus 2 = 8 m/s.
→ Frame 4: Velocities subtract when directions oppose.

**Floor 2** — the general rule
→ Frame 1: Object velocity relative to frame A: shown as v_AO.
→ Frame 2: Frame A velocity relative to ground: shown as v_AG.
→ Frame 3: Object velocity relative to ground = v_AO plus v_AG.
→ Frame 4: The Galilean velocity addition rule — add the frame velocities.

**Floor 3** — the limit: near light speed
→ Frame 1: A rocket at 90 percent of light speed.
→ Frame 2: A second rocket launched from it at 90 percent of light speed.
→ Frame 3: Galilean rule says: 1.8 times light speed. Impossible.
→ Frame 4: Einstein's correction: relativistic addition keeps the result below light speed.

---

### BB 1192 — The slanted rain

**Floor 0** — rain falls straight in still air
→ Frame 1: Rain falling straight down — vertical lines of droplets.
→ Frame 2: A person standing still — rain hits the top of their umbrella.
→ Frame 3: The umbrella held vertical — perfect protection.
→ Frame 4: No horizontal component to the rain — it falls purely downward.

**Floor 1** — a car drives into the rain
→ Frame 1: The car moving right — rain still falling straight down.
→ Frame 2: From inside the car: the rain now appears to angle toward the windscreen.
→ Frame 3: The car's rightward velocity added to the rain's downward velocity.
→ Frame 4: In the car's frame, rain has a horizontal component — it comes from the front.

**Floor 2** — the vector triangle
→ Frame 1: Rain velocity vector: straight down.
→ Frame 2: Car velocity vector: rightward.
→ Frame 3: In the car's frame: apparent rain velocity points diagonally — from ahead and above.
→ Frame 4: The resultant: a vector angled toward the front of the car.

**Floor 3** — tilting the umbrella
→ Frame 1: A cyclist in rain — holding umbrella vertical.
→ Frame 2: As they speed up, rain appears more angled forward.
→ Frame 3: They tilt the umbrella forward — maintaining protection.
→ Frame 4: The required tilt angle depends on the ratio of cyclist speed to rain speed.

---

### BB 1193 — The limit of the instrument

**Floor 0** — repeated measurements scatter
→ Frame 1: A precision scale — measuring the same metal block five times.
→ Frame 2: Readings: 100.1 g, 99.8 g, 100.3 g, 99.9 g, 100.0 g.
→ Frame 3: The values scattered around 100 g.
→ Frame 4: This scatter is random error — unavoidable, even with care.

**Floor 1** — the mean as the best estimate
→ Frame 1: The five readings plotted on a number line.
→ Frame 2: The mean calculated: (100.1+99.8+100.3+99.9+100.0)/5 = 100.02 g.
→ Frame 3: The mean is the best single estimate — closer to true than any individual reading.
→ Frame 4: More readings means mean gets closer to the true value.

**Floor 2** — standard deviation measures spread
→ Frame 1: The five readings — deviations from the mean calculated.
→ Frame 2: Standard deviation sigma = 0.17 g — typical scatter.
→ Frame 3: Small sigma = precise instrument. Large sigma = noisy instrument.
→ Frame 4: The uncertainty of the mean = sigma/root(n) — decreases with more readings.

---

### BB 1194 — The baked-in bias

**Floor 0** — systematic error stays put
→ Frame 1: A scale with a thumb pressing on it — the reading is always too high.
→ Frame 2: Measuring the block five times — all readings consistently high.
→ Frame 3: The average is also too high — more readings don't fix it.
→ Frame 4: SYSTEMATIC ERROR: a consistent bias in one direction.

**Floor 1** — accuracy vs precision
→ Frame 1: Target practice — shots clustered tightly in one corner: precise but inaccurate.
→ Frame 2: Shots spread around the bullseye: accurate but imprecise.
→ Frame 3: Shots tightly clustered at the bullseye: both accurate and precise.
→ Frame 4: ACCURACY = closeness to truth. PRECISION = closeness to each other.

**Floor 2** — systematic error kills accuracy
→ Frame 1: A thermometer reading 2 degrees C too high — always.
→ Frame 2: Ten measurements: all wrong by exactly 2 degrees. No scatter.
→ Frame 3: Perfect precision, zero accuracy.
→ Frame 4: Systematic errors are invisible to statistics — they must be found and corrected.

**Floor 3** — finding and fixing systematic errors
→ Frame 1: A scale calibrated with a known 100 g weight — reading 102 g.
→ Frame 2: The offset identified: plus 2 g systematic error.
→ Frame 3: All future readings corrected by subtracting 2 g.
→ Frame 4: Calibration: the method for hunting systematic errors.

---

### BB 1195 — The law of diminishing returns

**Floor 0** — farm labour analogy
→ Frame 1: A farm field — one worker harvesting. Good yield per worker.
→ Frame 2: Two workers — better total, but each worker is slightly less productive.
→ Frame 3: Ten workers — the field getting crowded, each adding less.
→ Frame 4: Diminishing returns: each additional unit of input yields less additional output.

**Floor 1** — halving uncertainty needs 4x readings
→ Frame 1: Ten measurements — uncertainty in the mean: sigma/root(10).
→ Frame 2: To halve the uncertainty: need sigma/root(40) — that needs 40 measurements.
→ Frame 3: Four times the readings for half the uncertainty.
→ Frame 4: The uncertainty decreases as root(n) — not as n.

**Floor 2** — build a better instrument instead
→ Frame 1: A researcher doing 1000 measurements — slow, expensive.
→ Frame 2: Uncertainty: only root(10) better than 10 measurements.
→ Frame 3: A new instrument with 10x lower sigma — achieves the same improvement instantly.
→ Frame 4: At some point, the smarter move is to improve the tool, not count more data.

**Floor 3** — the threshold decision
→ Frame 1: A graph: number of measurements (x-axis) vs uncertainty (y-axis) — a curve flattening.
→ Frame 2: The curve dropping steeply at first, then barely falling.
→ Frame 3: The inflection point: where more data stops being worth the effort.
→ Frame 4: The practical wisdom: know when to measure more — and when to find a better ruler.

---

### BB 1196 — The hierarchy of scale

**Floor 0** — sand grain to atom
→ Frame 1: A sand grain — visible to the naked eye, roughly 1 mm.
→ Frame 2: Zooming in: the grain is made of silicon-oxygen molecules.
→ Frame 3: Zooming further: molecules made of atoms — 10^-10 m.
→ Frame 4: A ladder from mm to nm — four orders of magnitude in one grain of sand.

**Floor 1** — city to universe
→ Frame 1: A city viewed from above — 10 km across.
→ Frame 2: Zooming out: a continent, then Earth — 10,000 km.
→ Frame 3: The solar system: 10^12 m. The galaxy: 10^21 m.
→ Frame 4: From city to galaxy: 18 orders of magnitude.

**Floor 2** — same laws, different behaviors
→ Frame 1: A single water molecule — no surface tension.
→ Frame 2: A glass of water — surface tension visible.
→ Frame 3: An ocean — waves, currents, weather systems.
→ Frame 4: Same molecules, same laws — dramatically different phenomena at each scale.

---

### BB 1197 — The empty solid

**Floor 0** — a table feels solid
→ Frame 1: A hand pressing on a wooden table — solid, unyielding.
→ Frame 2: The table appears continuous — no gaps.
→ Frame 3: The sensation: solid. The question: is it?
→ Frame 4: Zooming into the table — something unexpected.

**Floor 1** — atoms are mostly empty
→ Frame 1: Zooming into the wood — molecules, then atoms.
→ Frame 2: A single atom — the nucleus at the centre.
→ Frame 3: The electron cloud far out — mostly space between nucleus and electrons.
→ Frame 4: The atom is 99.9999 percent empty space.

**Floor 2** — the stadium analogy
→ Frame 1: A massive stadium.
→ Frame 2: A marble placed on the 50-yard line — the nucleus.
→ Frame 3: Electrons as gnats in the upper deck — far from the marble.
→ Frame 4: Between the marble and the gnats: nothing. Empty.

---

### BB 1198 — The blazing heart

**Floor 0** — a quasar
→ Frame 1: Deep space — a point of light far brighter than anything else.
→ Frame 2: That point: a quasar — brighter than an entire galaxy.
→ Frame 3: The source: a supermassive black hole consuming matter.
→ Frame 4: As matter falls in, it heats to millions of degrees and radiates light.

**Floor 1** — outshines a galaxy
→ Frame 1: A quasar next to a galaxy for scale.
→ Frame 2: The quasar: more luminous than 100 billion stars.
→ Frame 3: The energy source: the gravitational energy of infalling matter.
→ Frame 4: The most luminous sustained objects in the universe.

**Floor 2** — 13 billion light-years away
→ Frame 1: A light-year scale bar — 1 ly = distance light travels in one year.
→ Frame 2: The quasar: 13 billion light-years distant.
→ Frame 3: The light left 13 billion years ago — near the beginning of time.
→ Frame 4: Observing a quasar = looking 13 billion years into the past.

**Floor 3** — looking back in time
→ Frame 1: A telescope aimed at the quasar.
→ Frame 2: The light entering the telescope — 13 billion years old.
→ Frame 3: The universe when this light left: young, chaotic, active.
→ Frame 4: Astronomy is time travel — every distant object is a window into the past.

---

### BB 1199 — More is different

**Floor 0** — particles behave one way, crowds another
→ Frame 1: A single water molecule — H2O in isolation.
→ Frame 2: The question: is it wet? No — wetness requires many molecules together.
→ Frame 3: A trillion molecules collected — now wet, now able to flow.
→ Frame 4: Something new appeared at the collective level that wasn't there before.

**Floor 1** — from atoms to molecules to cells
→ Frame 1: Individual atoms — hydrogen and oxygen.
→ Frame 2: Combined: water molecules. New properties: polarity, hydrogen bonding.
→ Frame 3: Water molecules arranged: a cell membrane. New properties: selective permeability.
→ Frame 4: Each level has properties impossible to predict from the level below.

**Floor 2** — temperature: meaningless for one atom
→ Frame 1: A single helium atom in a box.
→ Frame 2: The question: what is its temperature? Meaningless.
→ Frame 3: A trillion helium atoms in the box — now temperature is defined: their average kinetic energy.
→ Frame 4: Temperature is a collective property — it does not exist at the single-atom level.

---

### BB 1200 — Why the sciences separate

**Floor 0** — Philip Anderson: More is Different (1972)
→ Frame 1: A physicist at a desk — writing a paper.
→ Frame 2: The title: More is Different — Philip Anderson, Nobel laureate.
→ Frame 3: The argument: you cannot predict the behaviour of a trillion atoms from one.
→ Frame 4: Reductionism has limits — collective behaviour is not merely the sum of parts.

**Floor 1** — chemistry cannot be derived from physics alone
→ Frame 1: Quantum mechanics — rules for single particles.
→ Frame 2: A chemist's lab — molecules reacting, bonds forming.
→ Frame 3: The chemist cannot simply apply quantum mechanics from scratch to every molecule.
→ Frame 4: Chemistry has its own laws, its own concepts — not reducible to physics in practice.

**Floor 2** — biology cannot be derived from chemistry alone
→ Frame 1: A cell — made of molecules, following chemistry.
→ Frame 2: The cell is alive — it metabolises, replicates, responds.
→ Frame 3: No chemistry textbook predicts life from the equations of bonding.
→ Frame 4: Life is a level of organisation with its own laws.

**Floor 3** — the sciences as a ladder
→ Frame 1: Physics at the base — the most fundamental level.
→ Frame 2: Chemistry above it — built from physics but not reducible to it.
→ Frame 3: Biology above chemistry. Psychology above biology. Sociology above psychology.
→ Frame 4: Each rung is real and irreducible — the ladder of emergence.

---
