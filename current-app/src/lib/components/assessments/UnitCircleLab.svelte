<script>
  // Unit Circle — the Trigonometry signature lab. Drag the angle around a live
  // unit circle and watch cos/sin/tan respond; six stations map to the trig BBs
  // (unit circle → special angles → tangent-as-slope → the sine wave → radians).
  // Each station retries until correct — a completion gate scored 1/1 on finish.
  export let prompt = 'Drag the angle around the unit circle and watch it turn.';
  export let onDone = () => {};

  const reduceMotion = typeof matchMedia !== 'undefined'
    && matchMedia('(prefers-reduced-motion: reduce)').matches;

  const CX = 130, CY = 130, R = 95;
  const TAU = Math.PI * 2;

  const STAGES = [
    { id: 'explore',  label: 'Explore' },
    { id: 'park',     label: 'Park it' },
    { id: 'special',  label: 'Angles' },
    { id: 'tangent',  label: 'Tangent' },
    { id: 'wave',     label: 'Wave' },
    { id: 'radians',  label: 'Radians' },
  ];
  let stage = 0;
  let stageDone = false;
  let hint = '';
  let complete = false;

  // Single source of truth: the angle in radians, [0, TAU).
  let theta = Math.PI / 6; // start at 30° so the point is clearly off-axis
  let svgEl;
  let dragging = false;

  // ── derived readouts (display only; completion checks compute locally) ──────
  $: cos = Math.cos(theta);
  $: sin = Math.sin(theta);
  $: deg = Math.round((theta * 180 / Math.PI) % 360);
  $: tanVal = Math.abs(cos) < 1e-3 ? null : sin / cos;
  $: px = CX + R * cos;
  $: py = CY - R * sin;               // screen y is flipped
  $: radLabel = radiansLabel(theta);

  function radiansLabel(t) {
    // Nearest clean multiple of π/6 or π/4, else decimals.
    const targets = [
      [0, '0'], [Math.PI / 6, 'π/6'], [Math.PI / 4, 'π/4'], [Math.PI / 3, 'π/3'],
      [Math.PI / 2, 'π/2'], [2 * Math.PI / 3, '2π/3'], [3 * Math.PI / 4, '3π/4'],
      [5 * Math.PI / 6, '5π/6'], [Math.PI, 'π'], [7 * Math.PI / 6, '7π/6'],
      [5 * Math.PI / 4, '5π/4'], [4 * Math.PI / 3, '4π/3'], [3 * Math.PI / 2, '3π/2'],
      [5 * Math.PI / 3, '5π/3'], [7 * Math.PI / 4, '7π/4'], [11 * Math.PI / 6, '11π/6'],
    ];
    for (const [v, s] of targets) if (Math.abs(t - v) < 0.02) return s;
    return `${t.toFixed(2)}`;
  }
  const fmt = (v) => (v === null ? '∞' : (Math.abs(v) < 0.005 ? '0.00' : v.toFixed(2)));

  // ── drag mechanics ──────────────────────────────────────────────────────────
  function pointerAngle(e) {
    const rect = svgEl.getBoundingClientRect();
    const scale = 260 / rect.width;
    const mx = (e.clientX - rect.left) * scale;
    const my = (e.clientY - rect.top) * scale;
    let a = Math.atan2(-(my - CY), mx - CX); // flip y
    if (a < 0) a += TAU;
    return a;
  }
  function down(e) {
    dragging = true;
    svgEl.setPointerCapture?.(e.pointerId);
    updateAngle(pointerAngle(e));
  }
  function moveEv(e) { if (dragging) updateAngle(pointerAngle(e)); }
  function up() { dragging = false; onRelease(); }

  // ── per-stage state ─────────────────────────────────────────────────────────
  let quadrantsSeen = new Set();     // stage 0
  let parkIdx = 0;                    // stage 1
  let sweepMax = 0, sweepStart = null; // stage 4 (continuous sweep)
  let specialPick = null;            // stage 2
  let tangentPick = null;            // stage 3
  let showRadians = false;           // stage 5 toggle
  let radIdx = 0;                     // stage 5

  const PARK = [
    { label: 'sin θ = 1', check: (t) => near(t, Math.PI / 2), tol: 0.1 },
    { label: 'cos θ = −1', check: (t) => near(t, Math.PI), tol: 0.1 },
    { label: 'sin θ = −1', check: (t) => near(t, 3 * Math.PI / 2), tol: 0.1 },
  ];
  const RAD_TARGETS = [
    { label: 'a quarter turn, π/2', ang: Math.PI / 2 },
    { label: 'half a turn, π', ang: Math.PI },
    { label: 'three-quarters, 3π/2', ang: 3 * Math.PI / 2 },
  ];
  const SPECIAL = { deg: 45, ang: Math.PI / 4, q: 'cos 45°',
    options: ['√2 / 2  (0.71)', '1 / 2  (0.50)', '√3 / 2  (0.87)'], answer: 0 };

  function near(t, target, tol = 0.08) {
    let d = Math.abs(t - target);
    d = Math.min(d, TAU - d);
    return d < tol;
  }

  function updateAngle(a) {
    // Stage 2 snaps magnetically to special angles for a crisp read.
    if (stage === 2) {
      const snaps = [0, Math.PI / 6, Math.PI / 4, Math.PI / 3, Math.PI / 2];
      for (const s of snaps) if (near(a, s, 0.13)) { a = s; break; }
    }
    theta = a;
    trackStage(a);
  }

  function trackStage(a) {
    if (stage === 0) {
      const q = a < Math.PI / 2 ? 1 : a < Math.PI ? 2 : a < 3 * Math.PI / 2 ? 3 : 4;
      quadrantsSeen.add(q);
      quadrantsSeen = quadrantsSeen; // reactivity
      if (quadrantsSeen.size === 4) { stageDone = true; hint = ''; }
    } else if (stage === 1) {
      const p = PARK[parkIdx];
      if (p.check(a)) {
        if (parkIdx === PARK.length - 1) { stageDone = true; hint = ''; }
        else { parkIdx += 1; flash(); }
      }
    } else if (stage === 4) {
      // Continuous sweep: track the furthest angle reached without wrapping back.
      if (sweepStart === null) sweepStart = a;
      let rel = a - sweepStart;
      if (rel < 0) rel += TAU;
      if (rel > sweepMax) sweepMax = rel;
      if (sweepMax >= TAU - 0.15) { stageDone = true; hint = ''; }
    }
  }

  function onRelease() {
    // Stage 3 uses release-to-check-near-90 handled via button; nothing here.
  }

  let flashOn = false;
  function flash() { flashOn = true; setTimeout(() => { flashOn = false; }, 400); }

  // ── stage 2/3/5 button answers ──────────────────────────────────────────────
  function pickSpecial(i) {
    if (stageDone) return;
    specialPick = i;
    if (i === SPECIAL.answer) { stageDone = true; hint = ''; }
    else hint = 'The 45° triangle is isosceles, so cos and sin are equal there: √2 / 2 ≈ 0.71.';
  }
  function pickTangent(d) {
    if (stageDone) return;
    tangentPick = d;
    if (d === 90) { stageDone = true; hint = ''; }
    else hint = 'tan θ = sin θ / cos θ. It explodes where cos θ = 0 — that is 90°.';
  }
  function checkRadian() {
    if (stageDone) return;
    const p = RAD_TARGETS[radIdx];
    if (near(theta, p.ang, 0.12)) {
      if (radIdx === RAD_TARGETS.length - 1) { stageDone = true; hint = ''; }
      else { radIdx += 1; flash(); }
    } else {
      hint = `Not there yet — drag until the readout shows ${p.label.split(', ')[1]}.`;
    }
  }

  // ── stage lifecycle ─────────────────────────────────────────────────────────
  function seedStage(i) {
    stageDone = false; hint = '';
    if (i === 0) { theta = Math.PI / 6; quadrantsSeen = new Set([1]); }
    else if (i === 1) { theta = 0; parkIdx = 0; }
    else if (i === 2) { theta = Math.PI / 4; specialPick = null; }
    else if (i === 3) { theta = Math.PI / 3; tangentPick = null; }
    else if (i === 4) { theta = 0; sweepMax = 0; sweepStart = null; }
    else if (i === 5) { theta = 0; showRadians = true; radIdx = 0; }
  }

  function nextStage() {
    if (stage < STAGES.length - 1) { stage += 1; seedStage(stage); }
    else complete = true;
  }

  // Sine-wave trace path for stage 4 (angle 0..sweepMax mapped to a strip right of circle).
  $: wavePath = (() => {
    if (stage !== 4) return '';
    const x0 = 236, w = 0, amp = R, span = Math.max(sweepMax, 0.001);
    // Draw within the same viewBox is tight; instead we draw a compact wave under the circle.
    let d = '';
    const N = 60;
    for (let k = 0; k <= N; k++) {
      const ang = (k / N) * span;
      const x = 20 + (ang / TAU) * 220;
      const y = 245 - Math.sin(ang) * 14;
      d += (k === 0 ? 'M' : 'L') + x.toFixed(1) + ',' + y.toFixed(1) + ' ';
    }
    return d.trim();
  })();
</script>

<div class="uc-lab">
  {#if complete}
    <div class="uc-complete">
      <div class="uc-complete-mark">✓</div>
      <div class="uc-complete-title">Unit Circle complete</div>
      <p>You can now read cos and sin as coordinates, place the special angles, see why tangent explodes at 90°, unwrap the circle into a wave, and measure turns in radians.</p>
      <button class="uc-primary" on:click={() => onDone(1, 1)}>Continue</button>
    </div>
  {:else}
    <div class="uc-prompt">{prompt}</div>

    <div class="uc-stages" aria-label="Lab stations">
      {#each STAGES as s, i}
        <span class="uc-stage-dot" class:done={i < stage} class:cur={i === stage}>{s.label}</span>
      {/each}
    </div>

    <svg class="uc-svg" viewBox="0 0 260 260" bind:this={svgEl}
      on:pointerdown={down} on:pointermove={moveEv} on:pointerup={up} on:pointerleave={up}
      role="application" aria-label="Draggable unit circle">
      <!-- axes -->
      <line class="uc-axis" x1="15" y1={CY} x2="245" y2={CY} />
      <line class="uc-axis" x1={CX} y1="15" x2={CX} y2="225" />
      <!-- the circle -->
      <circle class="uc-circle" cx={CX} cy={CY} r={R} />
      <!-- projections: cos (x) and sin (y) -->
      <line class="uc-proj cos" x1={px} y1={py} x2={px} y2={CY} />
      <line class="uc-proj sin" x1={px} y1={py} x2={CX} y2={py} />
      <!-- radius line (and its extension = tangent slope on stage 3) -->
      <line class="uc-radius" x1={CX} y1={CY} x2={px} y2={py} />
      {#if stage === 3}
        <line class="uc-slope" x1={CX - (px - CX) * 1.4} y1={CY - (py - CY) * 1.4}
          x2={CX + (px - CX) * 1.4} y2={CY + (py - CY) * 1.4} />
      {/if}
      <!-- the draggable point -->
      <circle class="uc-point" cx={px} cy={py} r="8" />
      <!-- angle arc -->
      <path class="uc-arc" d={`M ${CX + 26} ${CY} A 26 26 0 ${theta > Math.PI ? 1 : 0} 0 ${CX + 26 * cos} ${CY - 26 * sin}`} />

      {#if stage === 4}
        <path class="uc-wave" d={wavePath} />
        <line class="uc-axis wave-base" x1="20" y1="245" x2="240" y2="245" />
      {/if}
    </svg>

    <div class="uc-readouts">
      <span class="uc-read cos">cos θ = {fmt(cos)}</span>
      <span class="uc-read sin">sin θ = {fmt(sin)}</span>
      {#if stage === 3}<span class="uc-read tan">tan θ = {fmt(tanVal)}</span>{/if}
      <span class="uc-read ang">{showRadians ? `θ = ${radLabel}` : `θ = ${deg}°`}</span>
    </div>

    <!-- stage instructions + controls -->
    {#if stage === 0}
      <div class="uc-instruction">Drag the dot around the circle. The point is always <strong>(cos θ, sin θ)</strong> — visit all four quarters.</div>
      <div class="uc-note">{quadrantsSeen.size}/4 quadrants visited</div>
      {#if stageDone}<div class="uc-good">That is the whole idea: every angle lands on a point whose coordinates are cos θ across and sin θ up.</div>{/if}

    {:else if stage === 1}
      <div class="uc-instruction">Drag the dot to where <strong>{PARK[parkIdx].label}</strong>.</div>
      <div class="uc-note">{parkIdx + (stageDone ? 1 : 0)}/{PARK.length} parked</div>
      {#if stageDone}<div class="uc-good">Reading sin and cos straight off the coordinates — no triangle needed.</div>{/if}

    {:else if stage === 2}
      <div class="uc-instruction">The dot snaps to the special angles. You are parked at <strong>45°</strong>. What is <strong>{SPECIAL.q}</strong>?</div>
      <div class="uc-options">
        {#each SPECIAL.options as opt, i}
          <button class:right={(stageDone || specialPick === i) && i === SPECIAL.answer}
            class:wrong={specialPick === i && i !== SPECIAL.answer}
            on:click={() => pickSpecial(i)}>{opt}</button>
        {/each}
      </div>
      {#if stageDone}<div class="uc-good">At 45° the triangle is isosceles: cos and sin are both √2 / 2.</div>{/if}

    {:else if stage === 3}
      <div class="uc-instruction">The long line is the radius extended — its slope is <strong>tan θ</strong>. Drag toward 90° and watch tan θ. At which angle does it explode to infinity?</div>
      <div class="uc-options three">
        {#each [45, 60, 90] as d}
          <button class:right={(stageDone || tangentPick === d) && d === 90}
            class:wrong={tangentPick === d && d !== 90}
            on:click={() => pickTangent(d)}>{d}°</button>
        {/each}
      </div>
      {#if stageDone}<div class="uc-good">At 90° the line is vertical: cos θ = 0, so tan θ = sin θ / 0 is undefined — it shoots to infinity.</div>{/if}

    {:else if stage === 4}
      <div class="uc-instruction">Sweep the dot all the way around. The height (sin θ) drawn against the angle traces the <strong>sine wave</strong> below.</div>
      <div class="uc-note">{Math.round((sweepMax / TAU) * 100)}% of one full turn</div>
      {#if stageDone}<div class="uc-good">One trip around the circle is exactly one wave. That is why sine repeats every 2π.</div>{/if}

    {:else if stage === 5}
      <div class="uc-instruction">Radians measure the turn itself: a full turn is <strong>2π</strong>. Drag to <strong>{RAD_TARGETS[radIdx].label}</strong>.</div>
      <button class="uc-primary uc-check" on:click={checkRadian} disabled={stageDone}>Check angle</button>
      <div class="uc-note">{radIdx + (stageDone ? 1 : 0)}/{RAD_TARGETS.length} placed</div>
      {#if stageDone}<div class="uc-good">Quarter, half, three-quarter turns are π/2, π, 3π/2 — angle measured by how far around you have gone.</div>{/if}
    {/if}

    {#if hint && !stageDone}<div class="uc-hint">{hint}</div>{/if}

    {#if stageDone}
      <button class="uc-primary" on:click={nextStage}>
        {stage === STAGES.length - 1 ? 'Finish the lab' : 'Next station →'}
      </button>
    {/if}
  {/if}
</div>

<style>
  .uc-lab {
    width: 100%;
    max-width: 390px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 13px;
  }
  .uc-prompt { color: var(--qx-text); font-size: 15px; font-weight: 780; line-height: 1.42; text-align: center; }

  .uc-stages { display: flex; gap: 5px; flex-wrap: wrap; justify-content: center; }
  .uc-stage-dot {
    font-size: 10px; font-weight: 850; letter-spacing: 0.04em; text-transform: uppercase;
    padding: 4px 9px; border-radius: 999px; border: 1px solid var(--qx-border);
    background: var(--qx-surface-2); color: var(--qx-text-faint);
  }
  .uc-stage-dot.cur { border-color: var(--qx-accent); background: var(--qx-accent-soft); color: var(--qx-accent-text); }
  .uc-stage-dot.done { border-color: var(--qx-green); background: var(--qx-green-soft); color: var(--qx-green-text); }

  .uc-svg {
    width: 100%; max-width: 260px;
    border: 1.5px solid var(--qx-border); border-radius: 8px;
    background: radial-gradient(circle at 50% 45%, var(--qx-surface-2), var(--qx-surface));
    touch-action: none; user-select: none; cursor: grab;
  }
  .uc-svg:active { cursor: grabbing; }
  .uc-axis { stroke: var(--qx-border-2); stroke-width: 1; }
  .uc-axis.wave-base { stroke-dasharray: 3 3; }
  .uc-circle { fill: none; stroke: var(--qx-text-dim); stroke-width: 1.5; }
  .uc-proj { stroke-width: 2; stroke-dasharray: 4 3; }
  .uc-proj.cos { stroke: var(--qx-accent); }
  .uc-proj.sin { stroke: var(--qx-green); }
  .uc-radius { stroke: var(--qx-text); stroke-width: 2; }
  .uc-slope { stroke: var(--qx-yellow); stroke-width: 2; stroke-dasharray: 6 4; opacity: 0.85; }
  .uc-point { fill: var(--qx-accent); stroke: var(--qx-surface); stroke-width: 2; }
  .uc-arc { fill: none; stroke: var(--qx-accent); stroke-width: 2; }
  .uc-wave { fill: none; stroke: var(--qx-green); stroke-width: 2.5; stroke-linecap: round; stroke-linejoin: round; }

  .uc-readouts { display: flex; gap: 6px; flex-wrap: wrap; justify-content: center; }
  .uc-read {
    font-size: 12px; font-weight: 850; font-variant-numeric: tabular-nums;
    padding: 5px 10px; border-radius: 999px; border: 1px solid var(--qx-border);
    background: var(--qx-surface-2); color: var(--qx-text-dim);
  }
  .uc-read.cos { border-color: var(--qx-accent); color: var(--qx-accent-text); background: var(--qx-accent-soft); }
  .uc-read.sin { border-color: var(--qx-green); color: var(--qx-green-text); background: var(--qx-green-soft); }
  .uc-read.tan { border-color: var(--qx-yellow); color: var(--qx-yellow-text); background: var(--qx-yellow-soft); }

  .uc-instruction { font-size: 14px; font-weight: 720; color: var(--qx-text); text-align: center; line-height: 1.45; }
  .uc-instruction strong { color: var(--qx-accent-text); }

  .uc-options { width: 100%; display: flex; flex-direction: column; gap: 8px; }
  .uc-options.three { flex-direction: row; }
  .uc-options.three button { flex: 1; }
  .uc-options button {
    padding: 12px 14px; border-radius: 10px; border: 1.5px solid var(--qx-border-2);
    background: var(--qx-surface); font-family: var(--qx-font); font-size: 14px;
    font-weight: 800; color: var(--qx-text); cursor: pointer; text-align: center;
  }
  .uc-options button.right { border-color: var(--qx-green); background: var(--qx-green-soft); color: var(--qx-green-text); }
  .uc-options button.wrong { border-color: var(--qx-danger); background: var(--qx-danger-soft); color: var(--qx-danger-text); }

  .uc-note { font-size: 12px; font-weight: 700; color: var(--qx-text-faint); }

  .uc-hint, .uc-good {
    width: 100%; box-sizing: border-box; padding: 10px 12px; border-radius: 8px;
    font-size: 12.5px; font-weight: 700; line-height: 1.45; text-align: center;
  }
  .uc-hint { background: var(--qx-danger-soft); color: var(--qx-danger-text); }
  .uc-good { background: var(--qx-green-soft); color: var(--qx-green-text); }

  .uc-primary {
    min-height: 42px; width: 100%; border-radius: 999px; border: none;
    background: var(--qx-accent); color: #fff; font-family: var(--qx-font);
    font-size: 14px; font-weight: 850; cursor: pointer;
  }
  .uc-primary:disabled { opacity: 0.45; cursor: default; }
  .uc-check { max-width: 200px; }

  .uc-complete { display: flex; flex-direction: column; align-items: center; gap: 12px; text-align: center; padding: 28px 0; }
  .uc-complete-mark {
    width: 62px; height: 62px; border-radius: 50%; background: var(--qx-green-soft);
    border: 2px solid var(--qx-green); color: var(--qx-green-text);
    font-size: 30px; font-weight: 900; display: grid; place-items: center;
  }
  .uc-complete-title { font-size: 18px; font-weight: 900; color: var(--qx-text); }
  .uc-complete p { font-size: 13.5px; font-weight: 650; color: var(--qx-text-dim); line-height: 1.5; max-width: 34ch; margin: 0; }
</style>
