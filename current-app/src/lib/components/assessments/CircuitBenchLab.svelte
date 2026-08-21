<script>
  // Circuit Bench — the Electricity signature lab. A live SVG circuit whose
  // current animates (dots race the loop, bulbs glow by brightness) and
  // responds instantly to switches, cells, resistance, and series/parallel
  // layout. Six stations map to the electricity BBs (complete loop → voltage
  // → Ohm's law → series → parallel → break-a-bulb). Completion gate, 1/1.
  import { onDestroy } from 'svelte';

  export let prompt = 'Build the circuit, close the switch, and watch the current flow.';
  export let onDone = () => {};

  const reduceMotion = typeof matchMedia !== 'undefined'
    && matchMedia('(prefers-reduced-motion: reduce)').matches;

  const STAGES = [
    { id: 'loop',       label: 'Loop' },
    { id: 'voltage',    label: 'Volts' },
    { id: 'resistance', label: 'Ohms' },
    { id: 'series',     label: 'Series' },
    { id: 'parallel',   label: 'Parallel' },
    { id: 'break',      label: 'Break it' },
  ];
  let stage = 0;
  let stageDone = false;
  let hint = '';
  let complete = false;

  // ── circuit state ───────────────────────────────────────────────────────────
  let closed = false;     // switch
  let cells = 1;          // voltage = cells * 1.5 V
  let resistance = 1;     // extra resistance units on the (first) bulb
  let layout = 'single';  // 'single' | 'series' | 'parallel'
  let bulbBroken = [false, false]; // which bulbs are unscrewed

  const CELL_V = 1.5;

  // Pure model: takes every input as an argument so the reactive statement that
  // calls it names them all (Svelte only tracks identifiers in the statement's
  // own text, not what a called function reads internally). Returns open-state,
  // per-bulb current, and source current.
  function solve(closed, layout, cells, resistance, bulbBroken) {
    const voltage = cells * CELL_V;
    const R = Math.max(0.4, resistance);
    const open = !closed
      || (layout === 'single' && bulbBroken[0])
      || (layout === 'series' && (bulbBroken[0] || bulbBroken[1]));
    if (open) return { open: true, voltage, i: [0, 0], source: 0 };
    let i0 = 0, i1 = 0;
    if (layout === 'single') i0 = voltage / R;
    else if (layout === 'series') { i0 = i1 = voltage / (R + 1); } // one shared current
    else { i0 = bulbBroken[0] ? 0 : voltage / R; i1 = bulbBroken[1] ? 0 : voltage / 1; } // each full V
    const source = layout === 'parallel' ? i0 + i1 : i0;
    return { open: false, voltage, i: [i0, i1], source };
  }

  $: circ = solve(closed, layout, cells, resistance, bulbBroken);
  $: voltage = circ.voltage;
  $: circuitOpen = circ.open;
  $: sourceCurrent = circ.source;
  const bright = (I) => Math.max(0, Math.min(1, I / 4));
  $: brightness = [bright(circ.i[0]), bright(circ.i[1])];
  // Completion checks call solve() directly with local values (see below), so
  // they never read the lagging reactive derivations.

  const fmt = (v) => v.toFixed(1);

  // ── current animation (rAF; dots race the loop, speed ∝ current) ────────────
  let phase = 0;
  let raf = null;
  function tick() {
    // speed proportional to source current
    phase = (phase + 0.004 * Math.max(0.3, sourceCurrent)) % 1;
    raf = requestAnimationFrame(tick);
  }
  if (!reduceMotion) raf = requestAnimationFrame(tick);
  onDestroy(() => raf && cancelAnimationFrame(raf));

  // Loop geometry: a rounded rectangle path the dots travel. Battery bottom,
  // switch left, bulb(s) top. Perimeter parametrised 0..1.
  // Rectangle corners (SVG 0..260 x 0..200): left=40 right=220 top=45 bot=160.
  const L = 40, Rr = 220, T = 45, B = 160;
  const perim = [
    { x: L, y: B }, { x: Rr, y: B }, { x: Rr, y: T }, { x: L, y: T },
  ];
  function pointAt(t) {
    // 4 equal segments around the rectangle, clockwise from bottom-left.
    const segs = [
      [perim[0], perim[1]], [perim[1], perim[2]], [perim[2], perim[3]], [perim[3], perim[0]],
    ];
    const s = Math.floor(t * 4) % 4;
    const ft = (t * 4) % 1;
    const [a, b] = segs[s];
    return { x: a.x + (b.x - a.x) * ft, y: a.y + (b.y - a.y) * ft };
  }
  const DOTS = 12;
  $: dots = circuitOpen ? [] : Array.from({ length: DOTS }, (_, k) => pointAt((phase + k / DOTS) % 1));

  // ── stage lifecycle ─────────────────────────────────────────────────────────
  let seriesPick = null, parallelPick = null, breakPick = null;

  function seedStage(i) {
    stageDone = false; hint = '';
    closed = false; cells = 1; resistance = 1; bulbBroken = [false, false];
    seriesPick = null; parallelPick = null; breakPick = null;
    if (i === 0) { layout = 'single'; }
    else if (i === 1) { layout = 'single'; closed = true; }
    else if (i === 2) { layout = 'single'; closed = true; cells = 3; }
    else if (i === 3) { layout = 'series'; closed = true; cells = 2; }
    else if (i === 4) { layout = 'parallel'; closed = true; cells = 2; }
    else if (i === 5) { layout = 'series'; closed = true; cells = 2; }
  }
  seedStage(0);

  function nextStage() {
    if (stage < STAGES.length - 1) { stage += 1; seedStage(stage); }
    else complete = true;
  }

  // ── stage actions ───────────────────────────────────────────────────────────
  function toggleSwitch() {
    closed = !closed;
    if (stage === 0 && closed) { stageDone = true; hint = ''; }
  }
  function bumpCells(d) {
    cells = Math.max(1, Math.min(4, cells + d));
    const I = solve(closed, layout, cells, resistance, bulbBroken).i[0];
    if (stage === 1 && I >= 4) { stageDone = true; hint = ''; }   // "bright" target
    else if (stage === 1) hint = '';
  }
  function bumpResistance(d) {
    resistance = Math.max(1, Math.min(6, resistance + d));
    const I = solve(closed, layout, cells, resistance, bulbBroken).i[0];
    if (stage === 2 && I <= 1.0) { stageDone = true; hint = ''; } // "dim it" target
    else if (stage === 2) hint = '';
  }
  function pickSeries(dimmer) {
    if (stageDone) return;
    seriesPick = dimmer;
    if (dimmer) { stageDone = true; hint = ''; }
    else hint = 'Two bulbs in series share one current and split the voltage — each is dimmer than a single bulb.';
  }
  function toggleLayoutSP() {
    layout = layout === 'series' ? 'parallel' : 'series';
  }
  function pickParallel(which) {
    if (stageDone) return;
    parallelPick = which;
    if (which === 'parallel') { stageDone = true; hint = ''; }
    else hint = 'In parallel each branch gets the full voltage, so both bulbs stay bright. Series shares the voltage and dims them.';
  }
  function unscrew(i) {
    bulbBroken[i] = !bulbBroken[i];
    bulbBroken = [...bulbBroken];
  }
  function pickBreak(ans) {
    if (stageDone) return;
    breakPick = ans;
    if (ans === 'all') { stageDone = true; hint = ''; }
    else hint = 'In series there is only one path. Remove any bulb and the loop is broken — everything goes dark.';
  }

  // Bulb screen positions (top edge).
  $: bulbPos = layout === 'single' ? [{ x: 130, y: T }]
    : layout === 'series' ? [{ x: 95, y: T }, { x: 165, y: T }]
    : [{ x: 130, y: 78 }, { x: 130, y: 128 }]; // parallel: two branches (drawn separately)
</script>

<div class="cb-lab">
  {#if complete}
    <div class="cb-complete">
      <div class="cb-complete-mark">✓</div>
      <div class="cb-complete-title">Circuit Bench complete</div>
      <p>You can now close a loop to start current, drive it with voltage, choke it with resistance, and predict how series and parallel change brightness — and what happens when a bulb breaks.</p>
      <button class="cb-primary" on:click={() => onDone(1, 1)}>Continue</button>
    </div>
  {:else}
    <div class="cb-prompt">{prompt}</div>

    <div class="cb-stages" aria-label="Lab stations">
      {#each STAGES as s, i}
        <span class="cb-stage-dot" class:done={i < stage} class:cur={i === stage}>{s.label}</span>
      {/each}
    </div>

    <svg class="cb-svg" viewBox="0 0 260 200" role="img" aria-label="Live circuit">
      <!-- wires: the loop -->
      {#if layout !== 'parallel'}
        <rect class="cb-wire" x={L} y={T} width={Rr - L} height={B - T} rx="8" />
      {:else}
        <!-- parallel: outer loop + a middle branch -->
        <path class="cb-wire" d={`M ${L} ${B} L ${Rr} ${B} L ${Rr} ${T} L ${L} ${T} Z`} />
        <path class="cb-wire" d={`M ${L} 103 L ${Rr} 103`} />
      {/if}

      <!-- battery (bottom edge) -->
      <g class="cb-battery">
        <line x1="118" y1={B - 7} x2="118" y2={B + 7} class="cb-cell-long" />
        <line x1="128" y1={B - 4} x2="128" y2={B + 4} class="cb-cell-short" />
        <line x1="138" y1={B - 7} x2="138" y2={B + 7} class="cb-cell-long" />
        <text x="128" y={B + 22} class="cb-label">{voltage.toFixed(1)}V</text>
      </g>

      <!-- switch (left edge) -->
      <g class="cb-switch" on:click={toggleSwitch} on:keydown={(e) => e.key === 'Enter' && toggleSwitch()}
        role="switch" aria-checked={closed} aria-label="Circuit switch" tabindex="0">
        <circle cx={L} cy="118" r="4" class="cb-node" />
        <circle cx={L} cy="88" r="4" class="cb-node" />
        <line x1={L} y1="118" x2={closed ? L : L + 16} y2={closed ? 88 : 96} class="cb-lever" />
        <text x={L + 14} y="112" class="cb-label sm">{closed ? 'on' : 'off'}</text>
      </g>

      <!-- current dots -->
      {#each dots as d}
        <circle class="cb-current" cx={d.x} cy={d.y} r="3" />
      {/each}

      <!-- bulbs -->
      {#if layout !== 'parallel'}
        {#each bulbPos as p, i}
          <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
          <g class="cb-bulb" class:broken={bulbBroken[i]} on:click={() => stage === 5 && unscrew(i)}
            on:keydown={(e) => e.key === 'Enter' && stage === 5 && unscrew(i)}
            role={stage === 5 ? 'button' : 'img'} tabindex={stage === 5 ? 0 : -1}
            aria-label={`Bulb ${i + 1}${bulbBroken[i] ? ' (removed)' : ''}`}>
            <circle cx={p.x} cy={p.y} r="13" class="cb-glow" style={`opacity:${bulbBroken[i] ? 0 : brightness[i]}`} />
            <circle cx={p.x} cy={p.y} r="9" class="cb-bulb-body" class:lit={brightness[i] > 0.05 && !bulbBroken[i]} />
            {#if bulbBroken[i]}<text x={p.x} y={p.y + 4} class="cb-x">✕</text>{/if}
          </g>
        {/each}
      {:else}
        {#each [0, 1] as i}
          {@const px = 130}
          {@const py = i === 0 ? 78 : 128}
          <!-- branch stubs -->
          <line class="cb-wire branch" x1={px} y1={i === 0 ? T : 103} x2={px} y2={py} />
          <line class="cb-wire branch" x1={px} y1={py} x2={px} y2={i === 0 ? 103 : B} />
          <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
          <g class="cb-bulb" class:broken={bulbBroken[i]} on:click={() => stage === 5 && unscrew(i)}
            on:keydown={(e) => e.key === 'Enter' && stage === 5 && unscrew(i)}
            role={stage === 5 ? 'button' : 'img'} tabindex={stage === 5 ? 0 : -1}
            aria-label={`Bulb ${i + 1}${bulbBroken[i] ? ' (removed)' : ''}`}>
            <circle cx={px} cy={py} r="13" class="cb-glow" style={`opacity:${bulbBroken[i] ? 0 : brightness[i]}`} />
            <circle cx={px} cy={py} r="9" class="cb-bulb-body" class:lit={brightness[i] > 0.05 && !bulbBroken[i]} />
            {#if bulbBroken[i]}<text x={px} y={py + 4} class="cb-x">✕</text>{/if}
          </g>
        {/each}
      {/if}
    </svg>

    <div class="cb-readouts">
      <span class="cb-read v">{voltage.toFixed(1)} V</span>
      <span class="cb-read i">{fmt(sourceCurrent)} A</span>
      {#if stage >= 2}<span class="cb-read r">R {resistance}</span>{/if}
    </div>

    <!-- stage controls -->
    {#if stage === 0}
      <div class="cb-instruction">A circuit needs a complete loop. <strong>Tap the switch</strong> to close it and start the current.</div>
      {#if stageDone}<div class="cb-good">The loop is closed, so charge can flow all the way round — current starts and the bulb lights.</div>{/if}

    {:else if stage === 1}
      <div class="cb-instruction">The battery pushes the charge. <strong>Add cells</strong> to raise the voltage until the bulb glows brightly.</div>
      <div class="cb-controls">
        <button on:click={() => bumpCells(-1)} disabled={cells <= 1}>− cell</button>
        <button class="cb-accent" on:click={() => bumpCells(1)} disabled={cells >= 4}>+ cell</button>
      </div>
      {#if stageDone}<div class="cb-good">More voltage means more push per charge, so more current flows and the bulb burns brighter.</div>{/if}

    {:else if stage === 2}
      <div class="cb-instruction">Voltage is fixed. <strong>Add resistance</strong> and watch Ohm's law (I = V / R) choke the current down and dim the bulb.</div>
      <div class="cb-controls">
        <button on:click={() => bumpResistance(-1)} disabled={resistance <= 1}>− resistance</button>
        <button class="cb-accent" on:click={() => bumpResistance(1)} disabled={resistance >= 6}>+ resistance</button>
      </div>
      {#if stageDone}<div class="cb-good">Same voltage, more resistance: I = V / R falls, so the current drops and the bulb fades.</div>{/if}

    {:else if stage === 3}
      <div class="cb-instruction">Two bulbs sit one after another — a <strong>series</strong> circuit. Compared with a single bulb, are they brighter or dimmer?</div>
      <div class="cb-options">
        <button class:right={(stageDone || seriesPick === true) && true} class:wrong={seriesPick === false}
          on:click={() => pickSeries(true)}>Dimmer</button>
        <button class:wrong={seriesPick === false} on:click={() => pickSeries(false)}>Brighter</button>
      </div>
      {#if stageDone}<div class="cb-good">One shared current, voltage split between them, higher total resistance — both bulbs are dimmer.</div>{/if}

    {:else if stage === 4}
      <div class="cb-instruction">Now the bulbs are on separate branches. Flip the layout and compare. Which one keeps <strong>both bulbs bright</strong>?</div>
      <div class="cb-controls">
        <button class="cb-accent" on:click={toggleLayoutSP}>Flip to {layout === 'series' ? 'parallel' : 'series'}</button>
        <span class="cb-nowlayout">now: {layout}</span>
      </div>
      <div class="cb-options">
        <button class:right={(stageDone || parallelPick === 'parallel') && true} class:wrong={parallelPick === 'series'}
          on:click={() => pickParallel('parallel')}>Parallel</button>
        <button class:wrong={parallelPick === 'series'} on:click={() => pickParallel('series')}>Series</button>
      </div>
      {#if stageDone}<div class="cb-good">Each parallel branch gets the full voltage, so both bulbs stay at full brightness.</div>{/if}

    {:else if stage === 5}
      <div class="cb-instruction">These two bulbs are in <strong>series</strong>. Tap a bulb to unscrew it. What happens to the other one?</div>
      <div class="cb-options">
        <button class:right={(stageDone || breakPick === 'all') && true} class:wrong={breakPick === 'one'}
          on:click={() => pickBreak('all')}>Both go dark</button>
        <button class:wrong={breakPick === 'one'} on:click={() => pickBreak('one')}>Other stays lit</button>
      </div>
      {#if stageDone}<div class="cb-good">Series has a single path: remove one bulb and the loop breaks, so every bulb goes out. (Parallel would keep the others lit — that is how fairy lights survive.)</div>{/if}
    {/if}

    {#if hint && !stageDone}<div class="cb-hint">{hint}</div>{/if}
    {#if stageDone}
      <button class="cb-primary" on:click={nextStage}>{stage === STAGES.length - 1 ? 'Finish the bench' : 'Next station →'}</button>
    {/if}
  {/if}
</div>

<style>
  .cb-lab { width: 100%; max-width: 390px; margin: 0 auto; display: flex; flex-direction: column; align-items: center; gap: 13px; }
  .cb-prompt { color: var(--qx-text); font-size: 15px; font-weight: 780; line-height: 1.42; text-align: center; }

  .cb-stages { display: flex; gap: 5px; flex-wrap: wrap; justify-content: center; }
  .cb-stage-dot {
    font-size: 10px; font-weight: 850; letter-spacing: 0.04em; text-transform: uppercase;
    padding: 4px 9px; border-radius: 999px; border: 1px solid var(--qx-border);
    background: var(--qx-surface-2); color: var(--qx-text-faint);
  }
  .cb-stage-dot.cur { border-color: var(--qx-accent); background: var(--qx-accent-soft); color: var(--qx-accent-text); }
  .cb-stage-dot.done { border-color: var(--qx-green); background: var(--qx-green-soft); color: var(--qx-green-text); }

  .cb-svg {
    width: 100%; max-width: 300px;
    border: 1.5px solid var(--qx-border); border-radius: 8px;
    background: radial-gradient(circle at 50% 40%, var(--qx-surface-2), var(--qx-surface));
  }
  .cb-wire { fill: none; stroke: var(--qx-text-dim); stroke-width: 2.5; }
  .cb-wire.branch { stroke-width: 2.5; }
  .cb-cell-long { stroke: var(--qx-text); stroke-width: 2.5; }
  .cb-cell-short { stroke: var(--qx-text); stroke-width: 4; }
  .cb-node { fill: var(--qx-text-dim); }
  .cb-lever { stroke: var(--qx-accent); stroke-width: 3; stroke-linecap: round; }
  .cb-label { fill: var(--qx-text-dim); font: 800 11px var(--qx-font); text-anchor: middle; }
  .cb-label.sm { font-size: 9px; text-anchor: start; }
  .cb-switch { cursor: pointer; }
  .cb-switch:focus-visible .cb-lever { stroke-width: 4; }

  .cb-current { fill: var(--qx-yellow); }

  .cb-bulb { cursor: default; }
  .cb-glow { fill: #ffd75e; filter: blur(3px); }
  .cb-bulb-body { fill: var(--qx-surface); stroke: var(--qx-text-dim); stroke-width: 2; }
  .cb-bulb-body.lit { fill: #ffe08a; stroke: #e2a93b; }
  .cb-bulb.broken .cb-bulb-body { stroke-dasharray: 3 2; }
  .cb-x { fill: var(--qx-danger-text); font: 900 12px var(--qx-font); text-anchor: middle; }

  .cb-readouts { display: flex; gap: 6px; flex-wrap: wrap; justify-content: center; }
  .cb-read {
    font-size: 12px; font-weight: 850; font-variant-numeric: tabular-nums;
    padding: 5px 11px; border-radius: 999px; border: 1px solid var(--qx-border);
    background: var(--qx-surface-2); color: var(--qx-text-dim);
  }
  .cb-read.v { border-color: var(--qx-accent); color: var(--qx-accent-text); background: var(--qx-accent-soft); }
  .cb-read.i { border-color: var(--qx-yellow); color: var(--qx-yellow-text); background: var(--qx-yellow-soft); }

  .cb-instruction { font-size: 14px; font-weight: 720; color: var(--qx-text); text-align: center; line-height: 1.45; }
  .cb-instruction strong { color: var(--qx-accent-text); }

  .cb-controls { display: flex; gap: 8px; flex-wrap: wrap; justify-content: center; align-items: center; }
  .cb-controls button {
    min-height: 42px; padding: 0 16px; border-radius: 999px;
    border: 1.5px solid var(--qx-border-2); background: var(--qx-surface); color: var(--qx-text);
    font-family: var(--qx-font); font-size: 14px; font-weight: 850; cursor: pointer;
  }
  .cb-controls button:disabled { opacity: 0.4; cursor: default; }
  .cb-controls button.cb-accent { border-color: var(--qx-accent); background: var(--qx-accent-soft); color: var(--qx-accent-text); }
  .cb-nowlayout { font-size: 12px; font-weight: 800; color: var(--qx-text-faint); text-transform: capitalize; }

  .cb-options { width: 100%; display: flex; gap: 8px; }
  .cb-options button {
    flex: 1; padding: 12px 14px; border-radius: 10px; border: 1.5px solid var(--qx-border-2);
    background: var(--qx-surface); font-family: var(--qx-font); font-size: 14px; font-weight: 800;
    color: var(--qx-text); cursor: pointer;
  }
  .cb-options button.right { border-color: var(--qx-green); background: var(--qx-green-soft); color: var(--qx-green-text); }
  .cb-options button.wrong { border-color: var(--qx-danger); background: var(--qx-danger-soft); color: var(--qx-danger-text); }

  .cb-hint, .cb-good {
    width: 100%; box-sizing: border-box; padding: 10px 12px; border-radius: 8px;
    font-size: 12.5px; font-weight: 700; line-height: 1.45; text-align: center;
  }
  .cb-hint { background: var(--qx-danger-soft); color: var(--qx-danger-text); }
  .cb-good { background: var(--qx-green-soft); color: var(--qx-green-text); }

  .cb-primary {
    min-height: 42px; width: 100%; border-radius: 999px; border: none;
    background: var(--qx-accent); color: #fff; font-family: var(--qx-font);
    font-size: 14px; font-weight: 850; cursor: pointer;
  }

  .cb-complete { display: flex; flex-direction: column; align-items: center; gap: 12px; text-align: center; padding: 28px 0; }
  .cb-complete-mark {
    width: 62px; height: 62px; border-radius: 50%; background: var(--qx-green-soft);
    border: 2px solid var(--qx-green); color: var(--qx-green-text);
    font-size: 30px; font-weight: 900; display: grid; place-items: center;
  }
  .cb-complete-title { font-size: 18px; font-weight: 900; color: var(--qx-text); }
  .cb-complete p { font-size: 13.5px; font-weight: 650; color: var(--qx-text-dim); line-height: 1.5; max-width: 34ch; margin: 0; }
</style>
