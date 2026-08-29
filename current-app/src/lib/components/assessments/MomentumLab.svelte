<script>
  // Collision Lab — the Energy & Momentum signature lab. Set the mass and
  // velocity of two carts, choose a sticky (inelastic) or bouncy (elastic)
  // collision, hit Run, and watch them collide on the track while the live
  // momentum and kinetic-energy readouts update. Five stations map to the
  // BBs: momentum = mv, momentum transfer, an elastic velocity swap, kinetic
  // energy grows with v squared, and what is conserved in a sticky collision.
  // Completion gate per station, scored 1/1.
  import { onDestroy } from 'svelte';

  export let prompt = 'Set the carts, pick a collision, hit Run, and watch momentum and energy.';
  export let onDone = () => {};

  const reduceMotion = typeof matchMedia !== 'undefined'
    && matchMedia('(prefers-reduced-motion: reduce)').matches;

  const STAGES = [
    { id: 'momentum', label: 'Momentum' },
    { id: 'transfer', label: 'Transfer' },
    { id: 'elastic',  label: 'Bounce' },
    { id: 'energy',   label: 'Energy' },
    { id: 'conserve', label: 'Conserved?' },
  ];
  let stage = 0;
  let stageDone = false;
  let hint = '';
  let complete = false;

  // ── collision state ─────────────────────────────────────────────────────────
  let mA = 1, vA = 2;         // cart A: mass, launch velocity (→ right)
  let mB = 2, vB = 0;         // cart B: mass, launch velocity
  let ctype = 'stick';        // 'stick' (inelastic) | 'bounce' (elastic)
  let twoCarts = false;       // stages 1,2,4 use both carts; 0,3 use only A
  const RUN_T = 3.0;          // seconds per run
  const RAD = 0.42;           // cart half-width in track units
  const P_TARGET = 6;         // stage 0 target momentum
  const KE_TARGET = 8;        // stage 3 target kinetic energy

  let running = false;
  let raf = null;
  let ranOnce = false;
  let collided = false;
  let consPick = null;        // stage 4

  // live positions + current velocities (mutated during a run)
  let xA = -3, xB = 1;
  let vAc = 0, vBc = 0;

  // Post-collision velocities for the two collision models.
  function resolve() {
    if (ctype === 'stick') {
      const v = (mA * vAc + mB * vBc) / (mA + mB);
      vAc = v; vBc = v;
    } else { // elastic
      const a = ((mA - mB) * vAc + 2 * mB * vBc) / (mA + mB);
      const b = ((mB - mA) * vBc + 2 * mA * vAc) / (mA + mB);
      vAc = a; vBc = b;
    }
  }

  // Live momentum + kinetic energy totals (name every dependency so Svelte
  // tracks them — vAc/vBc change during the run).
  $: pTotal = mA * vAc + (twoCarts ? mB * vBc : 0);
  $: keTotal = 0.5 * mA * vAc * vAc + (twoCarts ? 0.5 * mB * vBc * vBc : 0);
  // Before a run starts, preview the launch values.
  $: pPreview = mA * vA + (twoCarts ? mB * vB : 0);
  $: kePreview = 0.5 * mA * vA * vA + (twoCarts ? 0.5 * mB * vB * vB : 0);

  const clampX = (x) => Math.max(-5, Math.min(5, x));

  function run() {
    if (running) return;
    stopRun();
    // reset to launch state
    xA = twoCarts ? -3.2 : -3;
    xB = 1.4;
    vAc = vA; vBc = twoCarts ? vB : 0;
    collided = false;
    running = true;
    let last = performance.now();
    const step = (now) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      advance(dt);
      if (!running) return;
      raf = requestAnimationFrame(step);
    };
    if (reduceMotion) {
      // fast-forward the simulation without animating
      for (let k = 0; k < 180; k++) { advance(RUN_T / 180); if (!running) break; }
      running = false; ranOnce = true; checkStage();
    } else {
      raf = requestAnimationFrame(step);
    }
    // safety stop
    runStart = performance.now();
  }
  let runStart = 0;

  function advance(dt) {
    xA = xA + vAc * dt;
    xB = xB + vBc * dt;
    // collision when the two carts touch (only once, only with two carts)
    if (twoCarts && !collided && (xA + RAD) >= (xB - RAD) && vAc > vBc) {
      collided = true;
      resolve();
    }
    // walls: a cart that reaches an edge stops there
    if (xA <= -5) { xA = -5; vAc = 0; }
    if (xA >= 5)  { xA = 5;  vAc = 0; }
    if (xB <= -5) { xB = -5; vBc = 0; }
    if (xB >= 5)  { xB = 5;  vBc = 0; }
    // end after RUN_T, or early if everything on screen has stopped
    const elapsed = (performance.now() - runStart) / 1000;
    const settled = Math.abs(vAc) < 0.001 && (!twoCarts || Math.abs(vBc) < 0.001);
    if (elapsed >= RUN_T || (collided && settled)) {
      running = false; ranOnce = true; checkStage();
    }
  }

  function stopRun() { if (raf) { cancelAnimationFrame(raf); raf = null; } running = false; }
  onDestroy(stopRun);

  function checkStage() {
    if (stage === 0) {
      if (Math.abs(mA * vA - P_TARGET) < 0.01) { stageDone = true; hint = ''; }
      else hint = `Momentum is mass times velocity. Set the two sliders so mass × velocity makes exactly ${P_TARGET}.`;
    } else if (stage === 1) {
      if (ctype === 'stick' && vA > 0) { stageDone = true; hint = ''; }
      else hint = 'Choose the sticky collision and give cart A a forward velocity, then run.';
    } else if (stage === 2) {
      if (ctype === 'bounce' && mA === mB && vA > 0) { stageDone = true; hint = ''; }
      else hint = 'Make the masses equal, choose the bouncy collision, and launch A. Watch A stop and B leave.';
    } else if (stage === 3) {
      if (0.5 * mA * vA * vA >= KE_TARGET) { stageDone = true; hint = ''; }
      else hint = `Kinetic energy is ½ m v². Speed counts twice — push the velocity up to reach ${KE_TARGET}.`;
    }
  }

  function pickConserve(ans) {
    if (stageDone) return;
    consPick = ans;
    if (ans === 'momentum') { stageDone = true; hint = ''; }
    else hint = 'Watch the readouts: total momentum is the same before and after, but kinetic energy drops. Momentum is the conserved one.';
  }

  // ── stage lifecycle ─────────────────────────────────────────────────────────
  function seedStage(i) {
    stopRun();
    stageDone = false; hint = ''; ranOnce = false; collided = false; consPick = null;
    if (i === 0)      { twoCarts = false; mA = 1; vA = 2; }
    else if (i === 1) { twoCarts = true;  mA = 2; vA = 3; mB = 2; vB = 0; ctype = 'stick'; }
    else if (i === 2) { twoCarts = true;  mA = 2; vA = 3; mB = 2; vB = 0; ctype = 'bounce'; }
    else if (i === 3) { twoCarts = false; mA = 1; vA = 2; }
    else if (i === 4) { twoCarts = true;  mA = 3; vA = 2; mB = 1; vB = 0; ctype = 'stick'; }
    // rest positions for the static (pre-run) picture
    xA = twoCarts ? -3.2 : -3; xB = 1.4;
    vAc = 0; vBc = 0;
  }
  seedStage(0);

  function nextStage() {
    if (stage < STAGES.length - 1) { stage += 1; seedStage(stage); }
    else complete = true;
  }

  // ── geometry ──────────────────────────────────────────────────────────────
  const trackX = (x) => 130 + x * 22;   // x -5..5 → 20..240
  const CART_W = RAD * 2 * 22;          // px
  $: showConserveQ = stage === 4 && ranOnce;

  const fmt1 = (v) => (v >= 0 ? '' : '') + v.toFixed(1);
  const fmt0 = (v) => Math.round(v).toString();
</script>

<div class="mo-lab">
  {#if complete}
    <div class="mo-complete">
      <div class="mo-complete-mark">✓</div>
      <div class="mo-complete-title">Collision Lab complete</div>
      <p>You can now read momentum as mass times velocity, see it pass between carts, tell a sticky collision from a bouncy one, feel why kinetic energy grows with the square of speed, and say what a collision conserves.</p>
      <button class="mo-primary" on:click={() => onDone(1, 1)}>Continue</button>
    </div>
  {:else}
    <div class="mo-prompt">{prompt}</div>

    <div class="mo-stages" aria-label="Lab stations">
      {#each STAGES as s, i}
        <span class="mo-stage-dot" class:done={i < stage} class:cur={i === stage}>{s.label}</span>
      {/each}
    </div>

    <svg class="mo-svg" viewBox="0 0 260 96" role="img" aria-label="Two carts on a track">
      <line class="mo-track" x1="20" y1="60" x2="240" y2="60" />
      <line class="mo-wall" x1="20" y1="44" x2="20" y2="76" />
      <line class="mo-wall" x1="240" y1="44" x2="240" y2="76" />
      <!-- cart A -->
      <g class="mo-cart a">
        <rect x={trackX(clampX(xA)) - CART_W / 2} y={48} width={CART_W} height={24} rx="4" />
        <text x={trackX(clampX(xA))} y={64} class="mo-cart-label">A</text>
      </g>
      {#if twoCarts}
        <g class="mo-cart b">
          <rect x={trackX(clampX(xB)) - CART_W / 2} y={48} width={CART_W} height={24} rx="4" />
          <text x={trackX(clampX(xB))} y={64} class="mo-cart-label">B</text>
        </g>
      {/if}
    </svg>

    <div class="mo-readouts">
      <span class="mo-read p">momentum {fmt1(running || ranOnce ? pTotal : pPreview)}</span>
      <span class="mo-read e">energy {fmt1(running || ranOnce ? keTotal : kePreview)}</span>
    </div>

    {#if showConserveQ}
      <div class="mo-instruction">The carts stuck together and slowed. Compare the readouts before and after. What stayed the same?</div>
      <div class="mo-options">
        <button class:right={stageDone} class:wrong={consPick === 'energy'}
          on:click={() => pickConserve('momentum')}>Momentum</button>
        <button class:wrong={consPick === 'energy'}
          on:click={() => pickConserve('energy')}>Kinetic energy</button>
      </div>
      {#if stageDone}<div class="mo-good">Right. Momentum is always conserved in a collision. In a sticky one, some kinetic energy turns to heat and sound, so energy drops while momentum holds.</div>{/if}
    {:else}
      <div class="mo-instruction">
        {#if stage === 0}Momentum is <strong>mass × velocity</strong>. Set both sliders so the momentum reads {P_TARGET}, then run.
        {:else if stage === 1}Launch A into a resting B with the <strong>sticky</strong> collision. Watch A's momentum pass into the pair.
        {:else if stage === 2}Equal masses, <strong>bouncy</strong> collision: A hands all its motion to B and stops dead. Set the masses equal and run.
        {:else if stage === 3}Kinetic energy is <strong>½ m v²</strong> — velocity counts twice. Push the speed up until the energy reads {KE_TARGET}.
        {/if}
      </div>

      <div class="mo-controls">
        <label class="mo-slider">
          <span>A mass</span>
          <input type="range" min="1" max="3" step="1" bind:value={mA} disabled={running} />
          <strong>{fmt0(mA)}</strong>
        </label>
        <label class="mo-slider">
          <span>A vel</span>
          <input type="range" min="0" max="5" step="1" bind:value={vA} disabled={running} />
          <strong>{fmt0(vA)}</strong>
        </label>
        {#if twoCarts}
          <label class="mo-slider">
            <span>B mass</span>
            <input type="range" min="1" max="3" step="1" bind:value={mB} disabled={running} />
            <strong>{fmt0(mB)}</strong>
          </label>
          <div class="mo-toggle" role="group" aria-label="Collision type">
            <button class:sel={ctype === 'stick'} on:click={() => (ctype = 'stick')} disabled={running}>Sticky</button>
            <button class:sel={ctype === 'bounce'} on:click={() => (ctype = 'bounce')} disabled={running}>Bouncy</button>
          </div>
        {/if}
        <button class="mo-run" on:click={run} disabled={running}>{running ? 'Running…' : '▶ Run'}</button>
      </div>

      {#if stageDone}<div class="mo-good">
        {#if stage === 0}That is momentum: {fmt0(mA)} × {fmt0(vA)} = {P_TARGET}. Heavier or faster both raise it.
        {:else if stage === 1}The pair moves off slower than A came in, but the total momentum is unchanged — it was shared, not lost.
        {:else if stage === 2}Equal masses in an elastic hit swap velocities: A stops, B leaves with A's speed. That is Newton's cradle.
        {:else if stage === 3}Energy reads {fmt0(0.5 * mA * vA * vA)}. Doubling the speed makes four times the energy, because v is squared.
        {/if}
      </div>{/if}
    {/if}

    {#if hint && !stageDone}<div class="mo-hint">{hint}</div>{/if}
    {#if stageDone}
      <button class="mo-primary" on:click={nextStage}>{stage === STAGES.length - 1 ? 'Finish the lab' : 'Next station →'}</button>
    {/if}
  {/if}
</div>

<style>
  .mo-lab { width: 100%; max-width: 390px; margin: 0 auto; display: flex; flex-direction: column; align-items: center; gap: 13px; }
  .mo-prompt { color: var(--qx-text); font-size: 15px; font-weight: 780; line-height: 1.42; text-align: center; }

  .mo-stages { display: flex; gap: 5px; flex-wrap: wrap; justify-content: center; }
  .mo-stage-dot {
    font-size: 10px; font-weight: 850; letter-spacing: 0.04em; text-transform: uppercase;
    padding: 4px 9px; border-radius: 999px; border: 1px solid var(--qx-border);
    background: var(--qx-surface-2); color: var(--qx-text-faint);
  }
  .mo-stage-dot.cur { border-color: var(--qx-accent); background: var(--qx-accent-soft); color: var(--qx-accent-text); }
  .mo-stage-dot.done { border-color: var(--qx-green); background: var(--qx-green-soft); color: var(--qx-green-text); }

  .mo-svg {
    width: 100%; max-width: 300px;
    border: 1.5px solid var(--qx-border); border-radius: 8px;
    background: radial-gradient(circle at 50% 40%, var(--qx-surface-2), var(--qx-surface));
  }
  .mo-track { stroke: var(--qx-border-2); stroke-width: 2.5; stroke-linecap: round; }
  .mo-wall { stroke: var(--qx-border-2); stroke-width: 3; stroke-linecap: round; }
  .mo-cart rect { stroke: var(--qx-surface); stroke-width: 1.5; }
  .mo-cart.a rect { fill: var(--qx-accent); }
  .mo-cart.b rect { fill: var(--qx-green); }
  .mo-cart-label { fill: #fff; font: 900 11px var(--qx-font); text-anchor: middle; }

  .mo-readouts { display: flex; gap: 6px; flex-wrap: wrap; justify-content: center; }
  .mo-read {
    font-size: 12px; font-weight: 850; font-variant-numeric: tabular-nums;
    padding: 5px 11px; border-radius: 999px; border: 1px solid var(--qx-border);
    background: var(--qx-surface-2); color: var(--qx-text-dim);
  }
  .mo-read.p { border-color: var(--qx-accent); color: var(--qx-accent-text); background: var(--qx-accent-soft); }
  .mo-read.e { border-color: var(--qx-yellow); color: var(--qx-yellow-text); background: var(--qx-yellow-soft); }

  .mo-instruction { font-size: 14px; font-weight: 720; color: var(--qx-text); text-align: center; line-height: 1.45; }
  .mo-instruction strong { color: var(--qx-accent-text); }

  .mo-controls { width: 100%; display: flex; flex-direction: column; gap: 10px; align-items: center; }
  .mo-slider {
    width: 100%; display: grid; grid-template-columns: 76px 1fr 30px; align-items: center; gap: 10px;
    border: 1px solid var(--qx-border); border-radius: 8px; background: var(--qx-surface); padding: 10px;
  }
  .mo-slider span { font-size: 12px; font-weight: 820; color: var(--qx-text-faint); text-transform: uppercase; letter-spacing: 0.05em; }
  .mo-slider strong { font-size: 16px; font-weight: 900; color: var(--qx-text); text-align: center; font-variant-numeric: tabular-nums; }
  .mo-slider input { width: 100%; accent-color: var(--qx-accent); }

  .mo-toggle { width: 100%; display: flex; gap: 8px; }
  .mo-toggle button {
    flex: 1; padding: 10px; border-radius: 8px; border: 1.5px solid var(--qx-border-2);
    background: var(--qx-surface); font-family: var(--qx-font); font-size: 13px; font-weight: 820;
    color: var(--qx-text-dim); cursor: pointer;
  }
  .mo-toggle button.sel { border-color: var(--qx-accent); background: var(--qx-accent-soft); color: var(--qx-accent-text); }
  .mo-toggle button:disabled { opacity: 0.55; cursor: default; }

  .mo-run {
    min-height: 42px; min-width: 130px; border-radius: 999px; border: none;
    background: var(--qx-accent); color: #fff; font-family: var(--qx-font);
    font-size: 14px; font-weight: 850; cursor: pointer;
  }
  .mo-run:disabled { opacity: 0.55; cursor: default; }

  .mo-options { width: 100%; display: flex; gap: 8px; }
  .mo-options button {
    flex: 1; padding: 12px 14px; border-radius: 10px; border: 1.5px solid var(--qx-border-2);
    background: var(--qx-surface); font-family: var(--qx-font); font-size: 14px; font-weight: 800;
    color: var(--qx-text); cursor: pointer;
  }
  .mo-options button.right { border-color: var(--qx-green); background: var(--qx-green-soft); color: var(--qx-green-text); }
  .mo-options button.wrong { border-color: var(--qx-danger); background: var(--qx-danger-soft); color: var(--qx-danger-text); }

  .mo-hint, .mo-good {
    width: 100%; box-sizing: border-box; padding: 10px 12px; border-radius: 8px;
    font-size: 12.5px; font-weight: 700; line-height: 1.45; text-align: center;
  }
  .mo-hint { background: var(--qx-danger-soft); color: var(--qx-danger-text); }
  .mo-good { background: var(--qx-green-soft); color: var(--qx-green-text); }

  .mo-primary {
    min-height: 42px; width: 100%; border-radius: 999px; border: none;
    background: var(--qx-accent); color: #fff; font-family: var(--qx-font);
    font-size: 14px; font-weight: 850; cursor: pointer;
  }

  .mo-complete { display: flex; flex-direction: column; align-items: center; gap: 12px; text-align: center; padding: 28px 0; }
  .mo-complete-mark {
    width: 62px; height: 62px; border-radius: 50%; background: var(--qx-green-soft);
    border: 2px solid var(--qx-green); color: var(--qx-green-text);
    font-size: 30px; font-weight: 900; display: grid; place-items: center;
  }
  .mo-complete-title { font-size: 18px; font-weight: 900; color: var(--qx-text); }
  .mo-complete p { font-size: 13.5px; font-weight: 650; color: var(--qx-text-dim); line-height: 1.5; max-width: 34ch; margin: 0; }
</style>
