<script>
  // Motion Lab — the Motion Foundations signature lab. Set a velocity (or
  // acceleration), hit Run, and watch the dot move while the position-time,
  // velocity-time, and acceleration-time graphs draw themselves live. Five
  // stations map to the motion BBs (speed, velocity has direction, steeper =
  // faster, acceleration, reading a graph). Completion gate, scored 1/1.
  import { onDestroy } from 'svelte';

  export let prompt = 'Set the motion, hit Run, and watch the graphs draw themselves.';
  export let onDone = () => {};

  const reduceMotion = typeof matchMedia !== 'undefined'
    && matchMedia('(prefers-reduced-motion: reduce)').matches;

  const STAGES = [
    { id: 'speed',   label: 'Speed' },
    { id: 'dir',     label: 'Direction' },
    { id: 'faster',  label: 'Faster' },
    { id: 'accel',   label: 'Accelerate' },
    { id: 'read',    label: 'Read it' },
  ];
  let stage = 0;
  let stageDone = false;
  let hint = '';
  let complete = false;

  // ── motion state ────────────────────────────────────────────────────────────
  let velocity = 2;       // units/s (stages 0-2)
  let accel = 1;          // units/s² (stage 3)
  let mode = 'velocity';  // 'velocity' | 'accel'
  const RUN_T = 2.5;      // seconds per run
  const X0 = 0;           // start position (centre of track = 0, range -5..5)

  let running = false;
  let t = 0;              // current run time
  let raf = null;
  let ranOnce = false;    // did a run complete this stage?
  let readPick = null;    // stage 4

  // Physics of a run at time tt (seconds).
  function posAt(tt) {
    if (mode === 'accel') return X0 + 0.5 * accel * tt * tt;
    return X0 + velocity * tt;
  }
  function velAt(tt) {
    return mode === 'accel' ? accel * tt : velocity;
  }
  function accAt() {
    return mode === 'accel' ? accel : 0;
  }
  // Clamp the object to the track edges (-5..5).
  const clampX = (x) => Math.max(-5, Math.min(5, x));

  $: dotX = clampX(posAt(t));
  $: curV = velAt(t);

  function run() {
    if (running) return;
    stopRun();
    t = 0; running = true;
    const start = performance.now();
    const step = (now) => {
      t = Math.min(RUN_T, (now - start) / 1000);
      if (t >= RUN_T) { running = false; ranOnce = true; checkStage(); return; }
      raf = requestAnimationFrame(step);
    };
    if (reduceMotion) { t = RUN_T; running = false; ranOnce = true; checkStage(); }
    else raf = requestAnimationFrame(step);
  }
  function stopRun() { if (raf) { cancelAnimationFrame(raf); raf = null; } running = false; }
  onDestroy(stopRun);

  function checkStage() {
    if (stage === 0 && mode === 'velocity' && velocity > 0) { stageDone = true; hint = ''; }
    else if (stage === 1 && mode === 'velocity' && velocity < 0) { stageDone = true; hint = ''; }
    else if (stage === 2 && mode === 'velocity' && velocity >= 4) { stageDone = true; hint = ''; }
    else if (stage === 3 && mode === 'accel' && accel > 0) { stageDone = true; hint = ''; }
    else {
      if (stage === 1) hint = 'Velocity has direction. Drag the slider below zero so the dot moves left.';
      else if (stage === 2) hint = 'Steeper means faster. Push the velocity up to at least 4.';
      else if (stage === 3) hint = 'Acceleration means the velocity keeps growing. Set it above zero and run.';
    }
  }

  function pickRead(ans) {
    if (stageDone) return;
    readPick = ans;
    if (ans === 'speedup') { stageDone = true; hint = ''; }
    else hint = 'A velocity line that climbs means the speed is increasing — the object is speeding up.';
  }

  // ── stage lifecycle ─────────────────────────────────────────────────────────
  function seedStage(i) {
    stopRun();
    stageDone = false; hint = ''; t = 0; ranOnce = false; readPick = null;
    if (i === 0) { mode = 'velocity'; velocity = 2; }
    else if (i === 1) { mode = 'velocity'; velocity = 2; }
    else if (i === 2) { mode = 'velocity'; velocity = 2; }
    else if (i === 3) { mode = 'accel'; accel = 1; }
    else if (i === 4) { mode = 'accel'; accel = 2; t = RUN_T; } // show a completed accel run to read
  }
  seedStage(0);

  function nextStage() {
    if (stage < STAGES.length - 1) { stage += 1; seedStage(stage); }
    else complete = true;
  }

  // ── graph geometry ──────────────────────────────────────────────────────────
  // Track: x -5..5 → screen 20..240 at y=34. Graphs: t 0..RUN_T → x 30..240,
  // value axis centred. Panels stacked.
  const trackX = (x) => 130 + x * 22;
  const gX = (tt) => 30 + (tt / RUN_T) * 210;
  // graph panels: x-t centred at py, v-t below, a-t below (shown by stage)
  function tracePath(fn, cy, scale) {
    const N = 40, upto = Math.max(t, 0.001);
    let d = '';
    for (let k = 0; k <= N; k++) {
      const tt = (k / N) * upto;
      const y = cy - Math.max(-1, Math.min(1, fn(tt) / scale)) * 22;
      d += (k === 0 ? 'M' : 'L') + gX(tt).toFixed(1) + ',' + y.toFixed(1) + ' ';
    }
    return d.trim();
  }
  $: xtPath = tracePath((tt) => clampX(posAt(tt)), 92, 5);
  $: vtPath = tracePath((tt) => velAt(tt), 150, 6);
  $: atPath = tracePath(() => accAt(), 200, 4);

  const fmt = (v) => (v >= 0 ? '+' : '') + v.toFixed(1);
</script>

<div class="ml-lab">
  {#if complete}
    <div class="ml-complete">
      <div class="ml-complete-mark">✓</div>
      <div class="ml-complete-title">Motion Lab complete</div>
      <p>You can now read a position graph as a journey, see velocity as its slope and direction, tell speeding up from steady, and recognise acceleration on a velocity graph.</p>
      <button class="ml-primary" on:click={() => onDone(1, 1)}>Continue</button>
    </div>
  {:else}
    <div class="ml-prompt">{prompt}</div>

    <div class="ml-stages" aria-label="Lab stations">
      {#each STAGES as s, i}
        <span class="ml-stage-dot" class:done={i < stage} class:cur={i === stage}>{s.label}</span>
      {/each}
    </div>

    <svg class="ml-svg" viewBox="0 0 260 {stage >= 3 ? 225 : 175}" role="img" aria-label="Motion and its graphs">
      <!-- track -->
      <line class="ml-track" x1="20" y1="34" x2="240" y2="34" />
      <circle class="ml-dot" cx={trackX(dotX)} cy="34" r="8" />
      <text class="ml-track-label" x="130" y="18">position</text>

      <!-- x-t graph -->
      <g class="ml-graph">
        <line class="ml-axis" x1="30" y1="92" x2="240" y2="92" />
        <line class="ml-axis" x1="30" y1="62" x2="30" y2="118" />
        <path class="ml-trace xt" d={xtPath} />
        <text class="ml-glabel" x="34" y="70">position vs time</text>
      </g>

      <!-- v-t graph -->
      <g class="ml-graph">
        <line class="ml-axis mid" x1="30" y1="150" x2="240" y2="150" />
        <line class="ml-axis" x1="30" y1="126" x2="30" y2="174" />
        <path class="ml-trace vt" d={vtPath} />
        <text class="ml-glabel" x="34" y="132">velocity vs time</text>
      </g>

      {#if stage >= 3}
        <g class="ml-graph">
          <line class="ml-axis mid" x1="30" y1="200" x2="240" y2="200" />
          <line class="ml-axis" x1="30" y1="180" x2="30" y2="220" />
          <path class="ml-trace at" d={atPath} />
          <text class="ml-glabel" x="34" y="186">acceleration vs time</text>
        </g>
      {/if}
    </svg>

    <div class="ml-readouts">
      <span class="ml-read pos">x = {fmt(dotX)}</span>
      <span class="ml-read vel">v = {fmt(curV)}</span>
      {#if stage >= 3}<span class="ml-read acc">a = {fmt(accAt())}</span>{/if}
    </div>

    <!-- stage controls -->
    {#if stage === 4}
      <div class="ml-instruction">This velocity graph climbs steadily from zero. What is the object doing?</div>
      <div class="ml-options">
        <button class:right={(stageDone || readPick === 'speedup') && true} class:wrong={readPick === 'steady'}
          on:click={() => pickRead('speedup')}>Speeding up</button>
        <button class:wrong={readPick === 'steady'} on:click={() => pickRead('steady')}>Moving steadily</button>
      </div>
      {#if stageDone}<div class="ml-good">Right. A rising velocity line means the speed keeps increasing — that is acceleration.</div>{/if}
    {:else}
      <div class="ml-instruction">
        {#if stage === 0}Set a velocity and hit <strong>Run</strong>. Watch the dot glide and the position graph draw a straight line.
        {:else if stage === 1}Velocity carries <strong>direction</strong>. Drag it below zero so the dot moves left and the velocity graph drops under the axis.
        {:else if stage === 2}A <strong>steeper</strong> position line means more speed. Push the velocity up to 4 or more, then run.
        {:else}Switch to acceleration: the velocity keeps <strong>growing</strong>. Set it above zero and run — watch the velocity line ramp up.
        {/if}
      </div>
      <div class="ml-controls">
        {#if mode === 'velocity'}
          <label class="ml-slider">
            <span>velocity</span>
            <input type="range" min="-5" max="5" step="1" bind:value={velocity} disabled={running} />
            <strong>{fmt(velocity)}</strong>
          </label>
        {:else}
          <label class="ml-slider">
            <span>acceleration</span>
            <input type="range" min="0" max="4" step="1" bind:value={accel} disabled={running} />
            <strong>{fmt(accel)}</strong>
          </label>
        {/if}
        <button class="ml-run" on:click={run} disabled={running}>{running ? 'Running…' : '▶ Run'}</button>
      </div>
      {#if stageDone}<div class="ml-good">
        {#if stage === 0}A steady velocity draws a straight, sloped position line — constant speed.
        {:else if stage === 1}Moving left is negative velocity: the position line slopes down and the velocity sits below zero.
        {:else if stage === 2}Bigger velocity, steeper position line, higher flat velocity line.
        {:else}Acceleration means velocity climbs: the position curve bends and the velocity line ramps up.
        {/if}
      </div>{/if}
    {/if}

    {#if hint && !stageDone}<div class="ml-hint">{hint}</div>{/if}
    {#if stageDone}
      <button class="ml-primary" on:click={nextStage}>{stage === STAGES.length - 1 ? 'Finish the lab' : 'Next station →'}</button>
    {/if}
  {/if}
</div>

<style>
  .ml-lab { width: 100%; max-width: 390px; margin: 0 auto; display: flex; flex-direction: column; align-items: center; gap: 13px; }
  .ml-prompt { color: var(--qx-text); font-size: 15px; font-weight: 780; line-height: 1.42; text-align: center; }

  .ml-stages { display: flex; gap: 5px; flex-wrap: wrap; justify-content: center; }
  .ml-stage-dot {
    font-size: 10px; font-weight: 850; letter-spacing: 0.04em; text-transform: uppercase;
    padding: 4px 9px; border-radius: 999px; border: 1px solid var(--qx-border);
    background: var(--qx-surface-2); color: var(--qx-text-faint);
  }
  .ml-stage-dot.cur { border-color: var(--qx-accent); background: var(--qx-accent-soft); color: var(--qx-accent-text); }
  .ml-stage-dot.done { border-color: var(--qx-green); background: var(--qx-green-soft); color: var(--qx-green-text); }

  .ml-svg {
    width: 100%; max-width: 300px;
    border: 1.5px solid var(--qx-border); border-radius: 8px;
    background: radial-gradient(circle at 50% 30%, var(--qx-surface-2), var(--qx-surface));
  }
  .ml-track { stroke: var(--qx-border-2); stroke-width: 2.5; stroke-linecap: round; }
  .ml-dot { fill: var(--qx-accent); stroke: var(--qx-surface); stroke-width: 2; }
  .ml-track-label { fill: var(--qx-text-faint); font: 700 9px var(--qx-font); text-anchor: middle; text-transform: uppercase; letter-spacing: 0.06em; }
  .ml-axis { stroke: var(--qx-border-2); stroke-width: 1; }
  .ml-axis.mid { stroke-dasharray: 3 3; }
  .ml-trace { fill: none; stroke-width: 2.5; stroke-linecap: round; stroke-linejoin: round; }
  .ml-trace.xt { stroke: var(--qx-accent); }
  .ml-trace.vt { stroke: var(--qx-green); }
  .ml-trace.at { stroke: var(--qx-yellow); }
  .ml-glabel { fill: var(--qx-text-faint); font: 700 8px var(--qx-font); text-transform: uppercase; letter-spacing: 0.05em; }

  .ml-readouts { display: flex; gap: 6px; flex-wrap: wrap; justify-content: center; }
  .ml-read {
    font-size: 12px; font-weight: 850; font-variant-numeric: tabular-nums;
    padding: 5px 11px; border-radius: 999px; border: 1px solid var(--qx-border);
    background: var(--qx-surface-2); color: var(--qx-text-dim);
  }
  .ml-read.pos { border-color: var(--qx-accent); color: var(--qx-accent-text); background: var(--qx-accent-soft); }
  .ml-read.vel { border-color: var(--qx-green); color: var(--qx-green-text); background: var(--qx-green-soft); }
  .ml-read.acc { border-color: var(--qx-yellow); color: var(--qx-yellow-text); background: var(--qx-yellow-soft); }

  .ml-instruction { font-size: 14px; font-weight: 720; color: var(--qx-text); text-align: center; line-height: 1.45; }
  .ml-instruction strong { color: var(--qx-accent-text); }

  .ml-controls { width: 100%; display: flex; flex-direction: column; gap: 10px; align-items: center; }
  .ml-slider {
    width: 100%; display: grid; grid-template-columns: 76px 1fr 38px; align-items: center; gap: 10px;
    border: 1px solid var(--qx-border); border-radius: 8px; background: var(--qx-surface); padding: 10px;
  }
  .ml-slider span { font-size: 12px; font-weight: 820; color: var(--qx-text-faint); text-transform: uppercase; letter-spacing: 0.05em; }
  .ml-slider strong { font-size: 16px; font-weight: 900; color: var(--qx-text); text-align: center; font-variant-numeric: tabular-nums; }
  .ml-slider input { width: 100%; accent-color: var(--qx-accent); }
  .ml-run {
    min-height: 42px; min-width: 130px; border-radius: 999px; border: none;
    background: var(--qx-accent); color: #fff; font-family: var(--qx-font);
    font-size: 14px; font-weight: 850; cursor: pointer;
  }
  .ml-run:disabled { opacity: 0.55; cursor: default; }

  .ml-options { width: 100%; display: flex; gap: 8px; }
  .ml-options button {
    flex: 1; padding: 12px 14px; border-radius: 10px; border: 1.5px solid var(--qx-border-2);
    background: var(--qx-surface); font-family: var(--qx-font); font-size: 14px; font-weight: 800;
    color: var(--qx-text); cursor: pointer;
  }
  .ml-options button.right { border-color: var(--qx-green); background: var(--qx-green-soft); color: var(--qx-green-text); }
  .ml-options button.wrong { border-color: var(--qx-danger); background: var(--qx-danger-soft); color: var(--qx-danger-text); }

  .ml-hint, .ml-good {
    width: 100%; box-sizing: border-box; padding: 10px 12px; border-radius: 8px;
    font-size: 12.5px; font-weight: 700; line-height: 1.45; text-align: center;
  }
  .ml-hint { background: var(--qx-danger-soft); color: var(--qx-danger-text); }
  .ml-good { background: var(--qx-green-soft); color: var(--qx-green-text); }

  .ml-primary {
    min-height: 42px; width: 100%; border-radius: 999px; border: none;
    background: var(--qx-accent); color: #fff; font-family: var(--qx-font);
    font-size: 14px; font-weight: 850; cursor: pointer;
  }

  .ml-complete { display: flex; flex-direction: column; align-items: center; gap: 12px; text-align: center; padding: 28px 0; }
  .ml-complete-mark {
    width: 62px; height: 62px; border-radius: 50%; background: var(--qx-green-soft);
    border: 2px solid var(--qx-green); color: var(--qx-green-text);
    font-size: 30px; font-weight: 900; display: grid; place-items: center;
  }
  .ml-complete-title { font-size: 18px; font-weight: 900; color: var(--qx-text); }
  .ml-complete p { font-size: 13.5px; font-weight: 650; color: var(--qx-text-dim); line-height: 1.5; max-width: 34ch; margin: 0; }
</style>
