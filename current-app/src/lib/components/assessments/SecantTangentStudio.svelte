<script>
  // Secant → Tangent Studio — the capstone of the calculus arc. Three stages in
  // one engine, two linked panels (f on top, f' below sharing the x-axis):
  //  1) Collapse: anchor A is fixed; drag probe B toward A and watch the secant
  //     slope settle on one number — the instant it snaps (h→0) it becomes the
  //     tangent and the slope freezes at f'(A).
  //  2) Paint: the tangent is locked; drag A across the curve and the slope
  //     value paints the derivative graph f'(x) in the panel below.
  //  3) Transfer: a new curve — paint its slope, then pick the graph you drew.
  // The one aha: a slope at a single point is just a secant squeezed until the
  // gap vanishes, and those slopes form a brand-new curve. Contract: prompt in,
  // onDone(1,1) on finish.
  import LabShell from './LabShell.svelte';
  export let prompt = 'A slope at a point is a secant squeezed until the gap vanishes — and those slopes make a new curve.';
  export let onDone = () => {};

  const reduceMotion = typeof matchMedia !== 'undefined'
    && matchMedia('(prefers-reduced-motion: reduce)').matches;

  const W = 300, H = 300, PL = 28, PR = 12;
  const plotW = W - PL - PR;
  const XMIN = -3, XMAX = 3;
  const FTOP = 18, FBOT = 150;          // top panel (f) screen band
  const DTOP = 182, DBOT = 276, DMID = (DTOP + DBOT) / 2, DHALF = (DBOT - DTOP) / 2;
  const DRANGE = 6.5;                   // f' shown over [-6.5, 6.5]

  const STAGES = [
    { mode: 'collapse', name: 'Squeeze the gap', fn: (x) => x * x, dfn: (x) => 2 * x, xA: 1,
      tip: 'Drag point B toward the fixed point A. Watch the secant slope settle on one number.' },
    { mode: 'paint', name: 'Paint the slope', fn: (x) => x * x, dfn: (x) => 2 * x,
      tip: 'The slope is now locked to the tangent. Drag A across the curve to paint its slope graph below.' },
    { mode: 'transfer', name: 'Read your graph', fn: (x) => -x * x + 2, dfn: (x) => -2 * x,
      tip: 'A new curve. Sweep A to paint its slope, then tap the graph you just drew.' }
  ];

  let stageIx = 0;
  let xA = 1, xB = 2.6;
  let locked = false;
  let visMin = null, visMax = null;
  let picked = null, wrongPick = false;
  let complete = false;
  let flash = '';
  let active = null;        // 'A' | 'B'
  let svgEl;

  $: stage = STAGES[stageIx];
  $: fRange = fRangeFor(stage);
  $: secSlope = xB === xA ? stage.dfn(xA) : (stage.fn(xB) - stage.fn(xA)) / (xB - xA);
  $: slopeAtA = stage.dfn(xA);
  $: shownSlope = stage.mode === 'collapse' && !locked ? secSlope : slopeAtA;
  // in the transfer stage, force a sweep (paint the slope graph) before picking
  $: canPick = visMin != null && visMax != null && (visMax - visMin) >= 3;

  const sx = (x) => PL + ((x - XMIN) / (XMAX - XMIN)) * plotW;
  const mX = (px) => XMIN + ((px - PL) / plotW) * (XMAX - XMIN);
  $: syF = (v) => FBOT - ((v - fRange.lo) / (fRange.hi - fRange.lo)) * (FBOT - FTOP);
  const syD = (v) => DMID - (Math.max(-DRANGE, Math.min(DRANGE, v)) / DRANGE) * DHALF;

  function fRangeFor(s) {
    let lo = Infinity, hi = -Infinity;
    for (let x = XMIN; x <= XMAX; x += 0.1) { const v = s.fn(x); if (v < lo) lo = v; if (v > hi) hi = v; }
    const pad = (hi - lo) * 0.12 + 0.5;
    return { lo: lo - pad, hi: hi + pad };
  }

  $: fCurve = samplePath(stage.fn, XMIN, XMAX, syF);
  $: dPainted = (visMin != null && visMax != null && visMax > visMin)
    ? samplePath(stage.dfn, visMin, visMax, syD) : '';
  function samplePath(fn, lo, hi, ys) {
    let d = '', step = (hi - lo) / 200;
    if (step <= 0) return '';
    for (let x = lo; x <= hi + 1e-9; x += step) {
      d += (d ? ' L' : 'M') + sx(x).toFixed(1) + ',' + ys(fn(x)).toFixed(1);
    }
    return d;
  }
  // Straight line in mathematical coordinates. The SVG panel clips it at the
  // graph boundary, so it cannot spill into the derivative plot.
  function lineThrough(px, py, m) {
    const y1 = py + m * (XMIN - px), y2 = py + m * (XMAX - px);
    return { x1: sx(XMIN), y1: syF(y1), x2: sx(XMAX), y2: syF(y2) };
  }
  $: sline = stage.mode === 'collapse' && !locked
    ? lineThrough(xA, stage.fn(xA), secSlope)
    : lineThrough(xA, stage.fn(xA), slopeAtA);

  function pt(e) {
    const r = svgEl.getBoundingClientRect();
    return { px: ((e.clientX - r.left) / r.width) * W, py: ((e.clientY - r.top) / r.height) * H };
  }
  function down(e) {
    if (complete) return;
    const { px, py } = pt(e);
    if (stage.mode === 'collapse') {
      if (Math.hypot(px - sx(xB), py - syF(stage.fn(xB))) < 22) active = 'B';
      else return;
    } else {
      if (Math.hypot(px - sx(xA), py - syF(stage.fn(xA))) < 24) active = 'A';
      else return;
    }
    e.target.setPointerCapture?.(e.pointerId);
    e.preventDefault();
  }
  function move(e) {
    if (!active) return;
    const { px } = pt(e);
    let x = Math.max(XMIN, Math.min(XMAX, Math.round(mX(px) * 20) / 20));
    if (active === 'B') {
      if (x === xA) x = xA + 0.05;
      xB = x;
      if (Math.abs(xB - xA) < 0.18 && !locked) collapseNow();
    } else {
      xA = x;
      visMin = visMin == null ? x : Math.min(visMin, x);
      visMax = visMax == null ? x : Math.max(visMax, x);
      checkPaint();
    }
  }
  function up() { active = null; }

  function collapseNow() {
    xB = xA; locked = true; active = null;
    flash = `h → 0, slope → ${stage.dfn(xA)}`;
    const delay = reduceMotion ? 0 : 1100;
    setTimeout(() => { stageIx = 1; initStage(); }, delay);
  }
  function checkPaint() {
    if (stage.mode === 'paint' && visMax - visMin >= 4.8) {
      flash = 'slope graph painted ✓';
      const delay = reduceMotion ? 0 : 900;
      active = null;
      setTimeout(() => { stageIx = 2; initStage(); }, delay);
    }
  }
  function pick(id) {
    if (complete) return;
    picked = id;
    if (id === 'down') { flash = 'that’s f′(x) = −2x ✓'; setTimeout(() => { complete = true; }, reduceMotion ? 0 : 700); }
    else { wrongPick = true; setTimeout(() => { wrongPick = false; picked = null; }, 900); }
  }

  function initStage() {
    const s = STAGES[stageIx];
    flash = '';
    if (s.mode === 'collapse') { xA = s.xA; xB = 2.6; locked = false; }
    else { xA = -2.5; locked = true; visMin = xA; visMax = xA; }
  }
  initStage();
</script>

<div class="st">
  <LabShell eyebrow={complete ? 'Secant → tangent → the derivative' : stage.name}
            stage={stageIx} total={STAGES.length} done={complete} />
  {#if !complete}
    <div class="st-read">
      {#if stage.mode === 'collapse'}
        <span class="chip">Δx <b>{(xB - xA).toFixed(2)}</b></span>
        <span class="chip">Δy <b>{(stage.fn(xB) - stage.fn(xA)).toFixed(2)}</b></span>
        <span class="chip slope" class:lock={locked}>slope <b>{shownSlope.toFixed(2)}</b></span>
      {:else}
        <span class="chip slope">slope at A <b>{slopeAtA.toFixed(2)}</b></span>
      {/if}
    </div>
  {/if}

  <div class="st-tip">{complete ? prompt : (flash || stage.tip)}</div>

  <div class="st-canvas">
    <svg bind:this={svgEl} viewBox="0 0 {W} {H}"
         on:pointerdown={down} on:pointermove={move} on:pointerup={up} on:pointerleave={up}>
      <defs>
        <clipPath id="st-top-panel">
          <rect x={PL} y={FTOP} width={plotW} height={FBOT - FTOP} />
        </clipPath>
        <clipPath id="st-derivative-panel">
          <rect x={PL} y={DTOP} width={plotW} height={DBOT - DTOP} />
        </clipPath>
      </defs>

      <!-- panel labels + divider -->
      <text class="plab" x={PL} y={FTOP - 4}>f(x)</text>
      <line class="divider" x1="0" y1="166" x2={W} y2="166" />
      <text class="plab" x={PL} y={DTOP - 4}>f′(x) — the slope graph</text>

      <!-- One x-scale shared by both panels. -->
      {#each Array(7) as _, i}
        {@const x = XMIN + i}
        <line class="grid" x1={sx(x)} y1={FTOP} x2={sx(x)} y2={FBOT} />
        <line class="grid" x1={sx(x)} y1={DTOP} x2={sx(x)} y2={DBOT} />
        <text class="xtick" x={sx(x)} y={DBOT + 12} text-anchor="middle">{x}</text>
      {/each}

      <g clip-path="url(#st-top-panel)">
        {#if fRange.lo < 0 && fRange.hi > 0}<line class="axis" x1={PL} y1={syF(0)} x2={W - PR} y2={syF(0)} />{/if}
        <line class="axis" x1={sx(0)} y1={FTOP} x2={sx(0)} y2={FBOT} />

        <path class="curve" d={fCurve} />
        <line class="sline" class:tan={locked || stage.mode !== 'collapse'}
              x1={sline.x1} y1={sline.y1} x2={sline.x2} y2={sline.y2} />

        <!-- The secant's rise/run triangle uses the same data coordinates as
             A, B, and the slope calculation. -->
        {#if stage.mode === 'collapse' && !locked}
          <line class="construction" x1={sx(xA)} y1={syF(stage.fn(xA))}
                x2={sx(xB)} y2={syF(stage.fn(xA))} />
          <line class="construction" x1={sx(xB)} y1={syF(stage.fn(xA))}
                x2={sx(xB)} y2={syF(stage.fn(xB))} />
        {/if}

        <circle class="anchor" cx={sx(xA)} cy={syF(stage.fn(xA))} r="6" />
        <text class="ptl" x={sx(xA) + 8} y={syF(stage.fn(xA)) - 6}>A</text>
        {#if stage.mode === 'collapse' && !locked}
          <circle class="probe" class:active={active === 'B'} cx={sx(xB)} cy={syF(stage.fn(xB))} r="8" />
          <text class="ptl" x={sx(xB) + 8} y={syF(stage.fn(xB)) - 6}>B</text>
        {/if}
      </g>

      <g clip-path="url(#st-derivative-panel)">
        <line class="axis" x1={PL} y1={DMID} x2={W - PR} y2={DMID} />
        <line class="axis" x1={sx(0)} y1={DTOP} x2={sx(0)} y2={DBOT} />
        {#if dPainted}<path class="dcurve" d={dPainted} />{/if}
        {#if stage.mode !== 'collapse'}
          <circle class="phead" cx={sx(xA)} cy={syD(stage.dfn(xA))} r="4.5" />
        {/if}
      </g>
    </svg>
  </div>

  <div class="st-foot">
    {#if complete}
      <button class="st-primary" on:click={() => onDone(1, 1)}>Continue</button>
    {:else if stage.mode === 'transfer'}
      <div class="st-picks" class:wrong={wrongPick}>
        <span class="pick-q">{canPick ? 'Which slope graph did you paint?' : 'Sweep A across to paint the slope graph first…'}</span>
        <div class="pick-row">
          <button class="pick" class:sel={picked === 'up'} disabled={!canPick} on:click={() => pick('up')} aria-label="upward line">
            <svg viewBox="0 0 60 40"><line x1="6" y1="34" x2="54" y2="6" /></svg>
          </button>
          <button class="pick" class:sel={picked === 'down'} disabled={!canPick} on:click={() => pick('down')} aria-label="downward line">
            <svg viewBox="0 0 60 40"><line x1="6" y1="6" x2="54" y2="34" /></svg>
          </button>
          <button class="pick" class:sel={picked === 'u'} disabled={!canPick} on:click={() => pick('u')} aria-label="parabola">
            <svg viewBox="0 0 60 40"><path d="M6,8 Q30,44 54,8" /></svg>
          </button>
        </div>
      </div>
    {:else}
      <span class="st-legend">{stage.mode === 'collapse' ? 'drag B onto A' : 'drag A along the curve'}</span>
    {/if}
  </div>
</div>

<style>
  .st { display: flex; flex-direction: column; gap: 9px; }
  .st-read { display: flex; flex-wrap: wrap; gap: 6px; }
  .chip {
    font-family: ui-monospace, Menlo, monospace; font-size: 11.5px; font-weight: 700;
    color: var(--qx-text-dim); background: var(--qx-surface-2);
    border: 1px solid var(--qx-border); border-radius: 8px; padding: 3px 8px;
  }
  .chip b { color: var(--qx-text); font-weight: 900; font-variant-numeric: tabular-nums; }
  .chip.slope { border-color: color-mix(in srgb, var(--qx-accent) 45%, var(--qx-border)); }
  .chip.slope b { color: var(--qx-accent-text); }
  .chip.slope.lock { border-color: var(--qx-green); background: var(--qx-green-soft); }
  .chip.slope.lock b { color: var(--qx-green-text); }

  .st-tip { font-size: 13px; font-weight: 600; color: var(--qx-text-dim); line-height: 1.35; min-height: 34px; }

  .st-canvas { border: 1.5px solid var(--qx-border); border-radius: 12px; overflow: hidden; background: var(--qx-surface); }
  svg { display: block; width: 100%; height: auto; touch-action: none; cursor: grab; }
  svg:active { cursor: grabbing; }
  .plab { fill: var(--qx-text-faint); font-size: 9.5px; font-weight: 800; pointer-events: none; }
  .divider { stroke: var(--qx-border); stroke-width: 1; pointer-events: none; }
  .grid { stroke: var(--qx-border); stroke-width: 1; opacity: 0.32; pointer-events: none; }
  .xtick { fill: var(--qx-text-faint); font-size: 8.5px; font-weight: 700; pointer-events: none; }
  .axis { stroke: var(--qx-text-faint); stroke-width: 1.1; opacity: 0.8; pointer-events: none; }
  .curve { fill: none; stroke: var(--qx-accent); stroke-width: 3.2; stroke-linecap: round; stroke-linejoin: round; pointer-events: none; }
  .sline { stroke: var(--qx-text-dim); stroke-width: 2; pointer-events: none; }
  .sline.tan { stroke: var(--qx-yellow); stroke-width: 3; }
  .construction { stroke: var(--qx-yellow); stroke-width: 1.5; stroke-dasharray: 4 4; opacity: 0.9; pointer-events: none; }
  .dcurve { fill: none; stroke: var(--qx-green); stroke-width: 3; stroke-linecap: round; pointer-events: none; }
  .phead { fill: var(--qx-green); stroke: var(--qx-surface); stroke-width: 1.5; pointer-events: none; }
  .anchor { fill: var(--qx-accent); stroke: var(--qx-surface); stroke-width: 2; }
  .probe { fill: var(--qx-yellow); stroke: var(--qx-surface); stroke-width: 2.5; cursor: grab; }
  .probe.active { stroke: var(--qx-text); }
  .ptl { fill: var(--qx-text-dim); font-size: 10px; font-weight: 800; pointer-events: none; }

  .st-foot { display: flex; justify-content: center; align-items: center; min-height: 56px; }
  .st-legend { font-size: 12px; font-weight: 650; color: var(--qx-text-faint); }
  .st-picks { display: flex; flex-direction: column; align-items: center; gap: 6px; }
  .st-picks.wrong .pick.sel { border-color: var(--qx-yellow); }
  .pick-q { font-size: 12px; font-weight: 700; color: var(--qx-text-dim); }
  .pick-row { display: flex; gap: 10px; }
  .pick { width: 62px; height: 44px; border: 1.5px solid var(--qx-border-2); border-radius: 10px; background: var(--qx-surface); cursor: pointer; padding: 0; }
  .pick:disabled { opacity: 0.4; cursor: default; }
  .pick svg { width: 100%; height: 100%; }
  .pick svg line, .pick svg path { stroke: var(--qx-text); stroke-width: 3; fill: none; stroke-linecap: round; }
  .pick.sel { border-color: var(--qx-green); }
  .st-primary { border: none; border-radius: 999px; background: var(--qx-accent); color: #fff; font-family: var(--qx-font); font-size: 14px; font-weight: 850; min-height: 40px; padding: 0 26px; cursor: pointer; }
</style>
