<script>
  // Local Linearity Studio — zoom into a point and decide what it is up close:
  // a smooth line (finite slope), a sharp corner (two slopes), or a vertical
  // tangent (infinite slope). The viewport is a fixed box but the world window
  // shrinks continuously with zoom (±3/zoom around the point), so smooth curves
  // straighten, |x| stays a self-similar V, and ∛x steepens to a vertical line.
  // A dashed chord across the visible ends makes "it straightened" visceral
  // (curve merges with the chord for smooth points; the chord bridges the kink
  // for corners). One-sided micro-slopes are read out once zoomed in. Bridges
  // average-rate to slope-at-a-point. Contract: prompt in, onDone(1,1) on end.
  export let prompt = 'Up close, a smooth curve looks like a straight line; a corner never does.';
  export let onDone = () => {};
  import LabShell from './LabShell.svelte';

  const reduceMotion = typeof matchMedia !== 'undefined'
    && matchMedia('(prefers-reduced-motion: reduce)').matches;

  const W = 300, H = 240, OX = W / 2, OY = H / 2, VIEW = 100, BASE = 3;

  const STAGES = [
    { name: 'y = x²', fn: (x) => x * x, a: 1.5, kind: 'smooth',
      tip: 'Zoom into the marked point. Does this parabola straighten into a line?' },
    { name: 'y = |x|', fn: (x) => Math.abs(x), a: 0, kind: 'corner',
      tip: 'Same idea at the tip of this V. Keep zooming — does it ever straighten?' },
    { name: 'y = sin x', fn: (x) => Math.sin(x), a: 1, kind: 'smooth',
      tip: 'On a wave now. Straight line up close, or a corner?' },
    { name: 'y = ∛x', fn: (x) => Math.cbrt(x), a: 0, kind: 'vertical',
      tip: 'Last one — the tip of a cube-root curve. Straight, corner, or something else?' }
  ];

  const KINDS = [
    { k: 'smooth', label: 'Smooth line' },
    { k: 'corner', label: 'Sharp corner' },
    { k: 'vertical', label: 'Vertical' }
  ];

  let stageIx = 0;
  let zl = 0;                 // slider value 0..3  ->  zoom 1..1000 (log)
  let matched = false;
  let complete = false;
  let wrongHint = '';

  $: stage = STAGES[stageIx];
  $: fa = stage.fn(stage.a);
  $: zoom = Math.pow(10, zl);
  $: hw = BASE / zoom;
  $: canJudge = zoom >= 100;
  $: showChord = zoom >= 20;

  const sx = (x) => OX + ((x - stage.a) / hw) * VIEW;
  const sy = (y) => OY - ((y - fa) / hw) * VIEW;
  const clampPx = (v) => Math.max(-60, Math.min(H + 60, v));

  $: curve = curvePath(stage, hw);
  function curvePath(s, halfW) {
    const fa0 = s.fn(s.a);
    let d = '';
    const lo = s.a - halfW, hi = s.a + halfW, step = (2 * halfW) / 260;
    for (let x = lo; x <= hi; x += step) {
      const px = OX + ((x - s.a) / halfW) * VIEW;
      const py = clampPx(OY - ((s.fn(x) - fa0) / halfW) * VIEW);
      d += (d ? ' L' : 'M') + px.toFixed(1) + ',' + py.toFixed(1);
    }
    return d;
  }
  // chord across the visible ends
  $: chordY1 = clampPx(sy(stage.fn(stage.a - hw)));
  $: chordY2 = clampPx(sy(stage.fn(stage.a + hw)));

  // one-sided micro-slopes
  $: eps = hw * 0.25;
  $: leftSlope = (stage.fn(stage.a) - stage.fn(stage.a - eps)) / eps;
  $: rightSlope = (stage.fn(stage.a + eps) - stage.fn(stage.a)) / eps;
  $: verdict = readVerdict(leftSlope, rightSlope);
  function readVerdict(l, r) {
    if (Math.abs(l) > 8 && Math.abs(r) > 8 && Math.sign(l) === Math.sign(r))
      return { text: 'both sides shoot straight up — no finite slope', tone: 'accent' };
    if (Math.abs(l - r) < 0.05) return { text: 'left and right line up — one slope', tone: 'green' };
    return { text: 'left and right hit a kink — two slopes', tone: 'yellow' };
  }

  function initStage() { zl = 0; matched = false; wrongHint = ''; }
  function judge(k) {
    if (matched || !canJudge) return;
    if (k === stage.kind) {
      matched = true;
      const delay = reduceMotion ? 0 : 850;
      if (stageIx < STAGES.length - 1) setTimeout(() => { stageIx += 1; initStage(); }, delay);
      else setTimeout(() => { complete = true; }, delay);
    } else {
      wrongHint = 'Look closer — zoom right in and read both sides before deciding.';
    }
  }

  initStage();
</script>

<div class="ll">
  <LabShell eyebrow={complete ? 'Smooth, corner, or vertical — all by eye' : `${stage.name}  ·  x = ${stage.a}`}
            stage={stageIx} total={STAGES.length} done={complete} />

  <div class="ll-tip" class:warn={wrongHint}>
    {#if complete}{prompt}{:else if wrongHint}{wrongHint}{:else}{stage.tip}{/if}
  </div>

  <div class="ll-canvas">
    <svg viewBox="0 0 {W} {H}">
      <line class="cross" x1={OX - 9} y1={OY} x2={OX + 9} y2={OY} />
      <line class="cross" x1={OX} y1={OY - 9} x2={OX} y2={OY + 9} />
      {#if showChord}
        <line class="chord" x1={OX - VIEW} y1={chordY1} x2={OX + VIEW} y2={chordY2} />
      {/if}
      <path class="curve" class:hit={matched} d={curve} />
      <circle class="pt" cx={OX} cy={OY} r="4.5" />
    </svg>
    <div class="ll-zoomtag">{Math.round(zoom)}×</div>
    {#if matched && !complete}<div class="ll-flash">{KINDS.find((x) => x.k === stage.kind).label} ✓</div>{/if}
  </div>

  <div class="ll-slopes" class:live={canJudge}>
    {#if canJudge}
      left <b>{leftSlope > 8 ? 'steep' : leftSlope.toFixed(2)}</b> · right <b>{rightSlope > 8 ? 'steep' : rightSlope.toFixed(2)}</b>
      <span class="ll-verdict {verdict.tone}">{verdict.text}</span>
    {:else}
      slide to zoom ≥ 100× to read the slope on each side
    {/if}
  </div>

  <div class="ll-zoomrow">
    <span class="zlab">zoom</span>
    <input class="zoom" type="range" min="0" max="3" step="0.01" bind:value={zl}
           aria-label="Zoom into the point" aria-valuetext="{Math.round(zoom)} times" />
    <span class="zval">{Math.round(zoom)}×</span>
  </div>

  <div class="ll-foot">
    {#if complete}
      <button class="ll-primary" on:click={() => onDone(1, 1)}>Continue</button>
    {:else}
      <div class="ll-judge">
        {#each KINDS as opt}
          <button class="jbtn {opt.k}" disabled={!canJudge || matched} on:click={() => judge(opt.k)}>{opt.label}</button>
        {/each}
      </div>
    {/if}
  </div>
</div>

<style>
  .ll { display: flex; flex-direction: column; gap: 9px; }

  .ll-tip { font-size: 13px; font-weight: 600; color: var(--qx-text-dim); line-height: 1.35; min-height: 34px; }
  .ll-tip.warn { color: var(--qx-yellow-text); }

  .ll-canvas { position: relative; border: 1.5px solid var(--qx-border); border-radius: 12px; overflow: hidden; background: var(--qx-surface); }
  svg { display: block; width: 100%; height: auto; }
  .cross { stroke: var(--qx-text-faint); stroke-width: 1.2; }
  .chord { stroke: var(--qx-text-faint); stroke-width: 1.6; stroke-dasharray: 5 5; opacity: 0.9; }
  .curve { fill: none; stroke: var(--qx-accent); stroke-width: 3.5; stroke-linecap: round; stroke-linejoin: round; }
  .curve.hit { stroke: var(--qx-green); }
  .pt { fill: var(--qx-green); stroke: var(--qx-surface); stroke-width: 2; }
  .ll-zoomtag { position: absolute; top: 8px; right: 10px; font-family: ui-monospace, Menlo, monospace; font-size: 12px; font-weight: 800; color: var(--qx-text-dim); background: var(--qx-surface-2); border-radius: 6px; padding: 2px 7px; }
  .ll-flash { position: absolute; top: 8px; left: 50%; transform: translateX(-50%); background: var(--qx-green-soft); color: var(--qx-green-text); border: 1.5px solid var(--qx-green); font-size: 13px; font-weight: 800; padding: 4px 13px; border-radius: 999px; }

  .ll-slopes { font-family: ui-monospace, Menlo, monospace; font-size: 12px; font-weight: 650; color: var(--qx-text-faint); text-align: center; min-height: 30px; }
  .ll-slopes.live { color: var(--qx-text-dim); }
  .ll-slopes b { color: var(--qx-text); }
  .ll-verdict { display: block; font-size: 11.5px; font-weight: 700; margin-top: 1px; }
  .ll-verdict.green { color: var(--qx-green-text); }
  .ll-verdict.yellow { color: var(--qx-yellow-text); }
  .ll-verdict.accent { color: var(--qx-accent-text); }

  .ll-zoomrow { display: flex; align-items: center; gap: 10px; }
  .zlab { font-size: 11px; font-weight: 800; letter-spacing: 0.05em; color: var(--qx-text-faint); text-transform: uppercase; }
  .zval { font-family: ui-monospace, Menlo, monospace; font-size: 12px; font-weight: 800; color: var(--qx-text-dim); min-width: 44px; text-align: right; }
  .zoom { flex: 1; accent-color: var(--qx-accent); height: 22px; }

  .ll-foot { display: flex; justify-content: center; align-items: center; min-height: 42px; }
  .ll-judge { display: flex; gap: 8px; flex-wrap: wrap; justify-content: center; }
  .jbtn { border-radius: 999px; font-family: var(--qx-font); font-size: 13px; font-weight: 800; min-height: 40px; padding: 0 15px; cursor: pointer; border: 1.5px solid var(--qx-border-2); background: var(--qx-surface); color: var(--qx-text); }
  .jbtn:disabled { opacity: 0.45; cursor: default; }
  .jbtn.smooth:not(:disabled) { border-color: var(--qx-green); color: var(--qx-green-text); }
  .jbtn.corner:not(:disabled) { border-color: var(--qx-yellow); color: var(--qx-yellow-text); }
  .jbtn.vertical:not(:disabled) { border-color: var(--qx-accent); color: var(--qx-accent-text); }
  .ll-primary { border: none; border-radius: 999px; background: var(--qx-accent); color: #fff; font-family: var(--qx-font); font-size: 14px; font-weight: 850; min-height: 40px; padding: 0 26px; cursor: pointer; }
</style>
