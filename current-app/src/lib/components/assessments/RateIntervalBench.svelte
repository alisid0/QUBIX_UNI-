<script>
  // Rate Interval Bench — average rate of change as a secant slope. On a
  // distance–time curve f(t) = ½t² the learner drags two interval handles a and
  // b; a right triangle (Δt across, Δd up) draws between (a, f(a)) and
  // (b, f(b)) and the HUD reads the live average speed Δd/Δt. Each round asks
  // for an interval hitting a target average speed — and because avg speed here
  // is ½(a+b), several intervals work, which is exactly the point. Sets up the
  // h→0 collapse in the tangent lab. Contract: prompt in, onDone(1,1) on finish.
  export let prompt = 'Average speed over an interval is the slope of the straight line joining its ends.';
  export let onDone = () => {};
  import LabShell from './LabShell.svelte';

  const reduceMotion = typeof matchMedia !== 'undefined'
    && matchMedia('(prefers-reduced-motion: reduce)').matches;

  // first-quadrant plot: time 0..6 (s), distance 0..18 (m)
  const W = 300, H = 280, PL = 40, PR = 14, PT = 14, PB = 30;
  const plotW = W - PL - PR, plotH = H - PT - PB;
  const TMAX = 6, DMAX = 18;
  const f = (t) => 0.5 * t * t;             // ½t²  ->  avg speed on [a,b] = ½(a+b)
  const averageRate = (start, end) => (f(end) - f(start)) / (end - start);
  const sx = (t) => PL + (t / TMAX) * plotW;
  const sy = (d) => (H - PB) - (d / DMAX) * plotH;
  const mt = (px) => ((px - PL) / plotW) * TMAX;
  const clampP = (v, lo, hi) => Math.max(lo, Math.min(hi, v));

  const STAGES = [
    { target: 3, tip: 'Drag the two handles so the average speed reads exactly 3 m/s.' },
    { target: 4, tip: 'Now find an interval averaging 4 m/s. (More than one works — notice which.)' },
    { target: 5, tip: 'Steeper: reach an average of 5 m/s. Later intervals climb faster.' }
  ];

  let stageIx = 0;
  let a = 0, b = 1;
  let matched = false;
  let complete = false;
  let active = null; // 'a' | 'b'
  let svgEl;

  $: stage = STAGES[stageIx];
  $: rate = averageRate(a, b);               // average speed on [a,b]
  $: dy = f(b) - f(a);
  $: dx = b - a;
  $: hit = Math.abs(rate - stage.target) < 0.001;
  $: curve = curvePath();

  function curvePath() {
    let d = '';
    for (let t = 0; t <= TMAX + 0.001; t += 0.06) {
      d += (d ? ' L' : 'M') + sx(t).toFixed(1) + ',' + sy(f(t)).toFixed(1);
    }
    return d;
  }

  function initStage() { a = 0; b = 1; matched = false; }

  function pt(e) {
    const r = svgEl.getBoundingClientRect();
    return { px: ((e.clientX - r.left) / r.width) * W, py: ((e.clientY - r.top) / r.height) * H };
  }
  function down(e) {
    if (matched) return;
    const { px, py } = pt(e);
    const da = Math.hypot(px - sx(a), py - sy(f(a)));
    const db = Math.hypot(px - sx(b), py - sy(f(b)));
    if (da <= db && da < 22) active = 'a';
    else if (db < 22) active = 'b';
    else return;
    e.target.setPointerCapture?.(e.pointerId);
    e.preventDefault();
  }
  function move(e) {
    if (!active || matched) return;
    const { px } = pt(e);
    const t = Math.round(mt(px));
    if (active === 'a') a = clampP(t, 0, b - 1);
    else b = clampP(t, a + 1, TMAX);
    checkMatch();
  }
  function up() { active = null; }

  function checkMatch() {
    // Reactive declarations update after the event handler finishes. Compute
    // from the just-moved endpoints here so releasing on the exact answer is
    // accepted immediately rather than testing the previous drag position.
    const currentRate = averageRate(a, b);
    if (Math.abs(currentRate - stage.target) < 0.001 && !matched) {
      matched = true;
      active = null;
      const delay = reduceMotion ? 0 : 850;
      if (stageIx < STAGES.length - 1) setTimeout(() => { stageIx += 1; initStage(); }, delay);
      else setTimeout(() => { complete = true; }, delay);
    }
  }

  initStage();
</script>

<div class="rb">
  <LabShell eyebrow={complete ? 'Secant slope = average speed' : `Reach ${stage.target} m/s`}
            stage={stageIx} total={STAGES.length} done={complete} />
  {#if !complete}
    <div class="rb-read">
      <span class="rb-target">target {stage.target} m/s</span>
      <span class="rb-now" class:hit>now <b>{rate.toFixed(2)}</b> m/s</span>
    </div>
  {/if}

  <div class="rb-tip">{complete ? prompt : stage.tip}</div>

  <div class="rb-canvas">
    <svg bind:this={svgEl} viewBox="0 0 {W} {H}"
         on:pointerdown={down} on:pointermove={move} on:pointerup={up} on:pointerleave={up}>
      <!-- axes -->
      <line class="axis" x1={PL} y1={PT} x2={PL} y2={H - PB} />
      <line class="axis" x1={PL} y1={H - PB} x2={W - PR} y2={H - PB} />
      {#each Array(TMAX + 1) as _, i}
        <line class="grid" x1={sx(i)} y1={PT} x2={sx(i)} y2={H - PB} />
        <text class="tick" x={sx(i)} y={H - PB + 12} text-anchor="middle">{i}</text>
      {/each}
      <text class="axlab" x={W - PR} y={H - PB + 12} text-anchor="end">t (s)</text>
      <text class="axlab" x={PL - 4} y={PT + 4} text-anchor="end">d (m)</text>

      <!-- curve -->
      <path class="curve" d={curve} />

      <!-- right triangle (Δt across, Δd up) + secant -->
      <line class="leg" x1={sx(a)} y1={sy(f(a))} x2={sx(b)} y2={sy(f(a))} />
      <line class="leg" x1={sx(b)} y1={sy(f(a))} x2={sx(b)} y2={sy(f(b))} />
      <line class="secant" class:hit x1={sx(a)} y1={sy(f(a))} x2={sx(b)} y2={sy(f(b))} />
      <text class="dlab" x={(sx(a) + sx(b)) / 2} y={sy(f(a)) + 13} text-anchor="middle">Δt={dx}</text>
      <text class="dlab" x={sx(b) + 6} y={(sy(f(a)) + sy(f(b))) / 2}>Δd={dy}</text>

      {#if !complete}
        <circle class="handle" class:active={active === 'a'} cx={sx(a)} cy={sy(f(a))} r="8" />
        <circle class="handle" class:active={active === 'b'} cx={sx(b)} cy={sy(f(b))} r="8" />
      {/if}
    </svg>
    {#if matched && !complete}<div class="rb-flash">Matched ✓</div>{/if}
  </div>

  <div class="rb-foot">
    {#if complete}
      <button class="rb-primary" on:click={() => onDone(1, 1)}>Continue</button>
    {:else}
      <span class="rb-legend"><span class="k"></span>drag either end of the interval</span>
    {/if}
  </div>
</div>

<style>
  .rb { display: flex; flex-direction: column; gap: 10px; }
  .rb-read { display: flex; align-items: baseline; gap: 12px; font-family: ui-monospace, Menlo, monospace; }
  .rb-target { font-size: 13px; font-weight: 700; color: var(--qx-text-dim); }
  .rb-now { font-size: 14px; font-weight: 700; color: var(--qx-text); }
  .rb-now b { color: var(--qx-yellow-text); }
  .rb-now.hit, .rb-now.hit b { color: var(--qx-green-text); }

  .rb-tip { font-size: 13px; font-weight: 600; color: var(--qx-text-dim); line-height: 1.35; min-height: 34px; }

  .rb-canvas { position: relative; border: 1.5px solid var(--qx-border); border-radius: 12px; overflow: hidden; background: var(--qx-surface); }
  svg { display: block; width: 100%; height: auto; touch-action: none; cursor: grab; }
  svg:active { cursor: grabbing; }

  .grid { stroke: var(--qx-border); stroke-width: 1; opacity: 0.4; pointer-events: none; }
  .axis { stroke: var(--qx-text-faint); stroke-width: 1.4; pointer-events: none; }
  .tick, .axlab { fill: var(--qx-text-faint); font-size: 9px; font-weight: 700; pointer-events: none; }
  .curve { fill: none; stroke: var(--qx-accent); stroke-width: 3.5; stroke-linecap: round; stroke-linejoin: round; pointer-events: none; }
  .leg { stroke: var(--qx-text-faint); stroke-width: 1.4; stroke-dasharray: 4 4; pointer-events: none; }
  .dlab { fill: var(--qx-text-dim); font-size: 9.5px; font-weight: 800; pointer-events: none; }
  .secant { stroke: var(--qx-yellow); stroke-width: 3; pointer-events: none; }
  .secant.hit { stroke: var(--qx-green); }
  .handle { fill: var(--qx-green); stroke: var(--qx-surface); stroke-width: 2.5; cursor: grab; }
  .handle.active { stroke: var(--qx-text); }

  .rb-flash {
    position: absolute; top: 10px; left: 50%; transform: translateX(-50%);
    background: var(--qx-green-soft); color: var(--qx-green-text); border: 1.5px solid var(--qx-green);
    font-size: 13px; font-weight: 800; padding: 5px 14px; border-radius: 999px;
  }
  .rb-foot { display: flex; justify-content: center; align-items: center; min-height: 40px; }
  .rb-legend { display: inline-flex; align-items: center; gap: 5px; font-size: 12px; font-weight: 650; color: var(--qx-text-faint); }
  .rb-legend .k { width: 10px; height: 10px; border-radius: 50%; background: var(--qx-green); display: inline-block; }
  .rb-primary {
    border: none; border-radius: 999px; background: var(--qx-accent); color: #fff;
    font-family: var(--qx-font); font-size: 14px; font-weight: 850; min-height: 40px; padding: 0 26px; cursor: pointer;
  }
</style>
