<script>
  // Asymptote Lab — read where a rational curve misbehaves. For
  // f(x) = num/(x − p) + q the curve ROCKETS off near x = p (denominator → 0,
  // a vertical asymptote) and FLATTENS toward y = q far left/right (end
  // behaviour, a horizontal asymptote). The learner drags a vertical "wall"
  // onto the blow-up and a horizontal "line" onto the level-off — reading the
  // asymptotes from the curve's shape, not from the formula (which stays hidden
  // until the reveal). Engine contract: `prompt` in, `onDone(1,1)` on finish.
  export let prompt = 'Read where the curve blows up and where it levels off.';
  export let onDone = () => {};
  import LabShell from './LabShell.svelte';

  const reduceMotion = typeof matchMedia !== 'undefined'
    && matchMedia('(prefers-reduced-motion: reduce)').matches;

  // math space [-6,6] x [-5.6,5.6] -> 300x280 viewBox
  const W = 300, H = 280, S = 25, OX = W / 2, OY = H / 2;
  const XMIN = -6.2, XMAX = 6.2;
  const sx = (x) => OX + x * S;
  const sy = (y) => OY - y * S;
  const mx = (px) => (px - OX) / S;
  const my = (py) => (OY - py) / S;
  const clampP = (v, lo, hi) => Math.max(lo, Math.min(hi, v));

  // Each stage: a rational curve + which asymptote(s) the learner must place.
  const STAGES = [
    { p: 3, q: 0, num: 1, activeV: true, activeH: false, name: 'Find the wall',
      tip: 'The curve rockets off near one x-value — its denominator hits zero there. Drag the amber wall onto it.' },
    { p: -2, q: 2, num: 1, activeV: false, activeH: true, name: 'Find the floor',
      tip: 'Far left and far right, the curve flattens toward one height. Drag the green line onto that level.' },
    { p: 1, q: -2, num: -2, activeV: true, activeH: true, name: 'Both at once',
      tip: 'New curve. Place BOTH: the wall where it blows up, the line where it levels off.' }
  ];

  let stageIx = 0;
  let barrierX = -4;   // learner's vertical-asymptote guess
  let horizonY = -4;   // learner's horizontal-asymptote guess
  let verticalLocked = false;
  let horizontalLocked = false;
  let matched = false;
  let complete = false;
  let active = null;   // 'v' | 'h' | null
  let svgEl;

  $: stage = STAGES[stageIx];

  function initStage() {
    const s = STAGES[stageIx];
    barrierX = -4;
    horizonY = -4;
    verticalLocked = !s.activeV;
    horizontalLocked = !s.activeH;
    matched = false;
  }

  // Two branches of the rational, split across the vertical asymptote so the
  // path never draws a false line through the blow-up.
  function branch(from, to, p, q, num) {
    let d = '';
    for (let x = from; x <= to; x += 0.05) {
      const y = Math.max(-13, Math.min(13, num / (x - p) + q));
      d += (d ? ' L' : 'M') + sx(x).toFixed(1) + ',' + sy(y).toFixed(1);
    }
    return d;
  }
  $: leftBranch = branch(XMIN, stage.p - 0.09, stage.p, stage.q, stage.num);
  $: rightBranch = branch(stage.p + 0.09, XMAX, stage.p, stage.q, stage.num);

  function pt(e) {
    const r = svgEl.getBoundingClientRect();
    return { px: ((e.clientX - r.left) / r.width) * W, py: ((e.clientY - r.top) / r.height) * H };
  }
  function down(e) {
    if (matched) return;
    const { px, py } = pt(e);
    // grab the active vertical line (whole line, forgiving) ...
    if (stage.activeV && !verticalLocked && Math.abs(px - sx(barrierX)) < 16) active = 'v';
    // ... or the active horizontal line
    else if (stage.activeH && !horizontalLocked && Math.abs(py - sy(horizonY)) < 16) active = 'h';
    else return;
    e.target.setPointerCapture?.(e.pointerId);
    e.preventDefault();
  }
  function move(e) {
    if (!active || matched) return;
    const { px, py } = pt(e);
    if (active === 'v') barrierX = clampP(Math.round(mx(px)), -5, 5);
    else horizonY = clampP(Math.round(my(py)), -5, 5);
    checkMatch();
  }
  function up() { active = null; }

  function checkMatch() {
    if (stage.activeV && Math.abs(barrierX - stage.p) < 0.4) verticalLocked = true;
    if (stage.activeH && Math.abs(horizonY - stage.q) < 0.4) horizontalLocked = true;
    if ((active === 'v' && verticalLocked) || (active === 'h' && horizontalLocked)) active = null;

    if (verticalLocked && horizontalLocked && !matched) {
      matched = true;
      const delay = reduceMotion ? 0 : 800;
      if (stageIx < STAGES.length - 1) setTimeout(() => { stageIx += 1; initStage(); }, delay);
      else setTimeout(() => { complete = true; }, delay);
    }
  }

  // reveal formula only after the whole lab is done
  const fmt = (s) => `${s.num}/(x ${s.p > 0 ? '− ' + s.p : s.p < 0 ? '+ ' + -s.p : '− 0'})${s.q > 0 ? ' + ' + s.q : s.q < 0 ? ' − ' + -s.q : ''}`;

  initStage();
</script>

<div class="al">
  <LabShell eyebrow={complete ? 'Asymptotes mapped' : stage.name}
            stage={stageIx} total={STAGES.length} done={complete} />

  <div class="al-tip">
    {#if complete}
      {prompt} Last curve: f(x) = {fmt(STAGES[STAGES.length - 1])}.
    {:else}
      {stage.tip}
    {/if}
  </div>

  <div class="al-canvas">
    <svg bind:this={svgEl} viewBox="0 0 {W} {H}"
         on:pointerdown={down} on:pointermove={move} on:pointerup={up} on:pointerleave={up}>
      {#each Array(13) as _, i}
        <line class="grid" x1={sx(i - 6)} y1="0" x2={sx(i - 6)} y2={H} />
        <line class="grid" x1="0" y1={sy(i - 6)} x2={W} y2={sy(i - 6)} />
      {/each}
      <line class="axis" x1="0" y1={OY} x2={W} y2={OY} />
      <line class="axis" x1={OX} y1="0" x2={OX} y2={H} />

      <!-- the curve (two branches, never joined across the blow-up) -->
      <path class="curve" d={leftBranch} />
      <path class="curve" d={rightBranch} />

      <!-- horizontal asymptote line (green) -->
      {#if stage.activeH}
        <line class="hline" class:locked={horizontalLocked}
              x1="0" y1={sy(horizonY)} x2={W} y2={sy(horizonY)} />
        <circle class="knob h" class:active={active === 'h'} class:locked={horizontalLocked} cx={sx(5)} cy={sy(horizonY)} r="8" />
      {/if}

      <!-- vertical asymptote wall (amber) -->
      {#if stage.activeV}
        <line class="vline" class:locked={verticalLocked}
              x1={sx(barrierX)} y1="0" x2={sx(barrierX)} y2={H} />
        <circle class="knob v" class:active={active === 'v'} class:locked={verticalLocked} cx={sx(barrierX)} cy={sy(5)} r="8" />
      {/if}
    </svg>
    {#if matched && !complete}<div class="al-flash">Locked ✓</div>{/if}
  </div>

  <div class="al-foot">
    {#if complete}
      <button class="al-primary" on:click={() => onDone(1, 1)}>Continue</button>
    {:else}
      <span class="al-legend">
        {#if stage.activeV}
          <span class="k v"></span>{verticalLocked ? `wall locked at x = ${barrierX}` : 'drag the wall (x blows up)'}&nbsp;
        {/if}
        {#if stage.activeH}
          <span class="k h"></span>{horizontalLocked ? `line locked at y = ${horizonY}` : 'drag the line (curve levels off)'}
        {/if}
      </span>
    {/if}
  </div>
</div>

<style>
  .al { display: flex; flex-direction: column; gap: 10px; }

  .al-tip { font-size: 13px; font-weight: 600; color: var(--qx-text-dim); line-height: 1.35; min-height: 36px; }

  .al-canvas { position: relative; border: 1.5px solid var(--qx-border); border-radius: 12px; overflow: hidden; background: var(--qx-surface); }
  svg { display: block; width: 100%; height: auto; touch-action: none; cursor: grab; }
  svg:active { cursor: grabbing; }

  .grid { stroke: var(--qx-border); stroke-width: 1; opacity: 0.5; pointer-events: none; }
  .axis { stroke: var(--qx-text-faint); stroke-width: 1.4; pointer-events: none; }
  .curve { fill: none; stroke: var(--qx-accent); stroke-width: 3.5; stroke-linecap: round; stroke-linejoin: round; pointer-events: none; }

  .vline { stroke: var(--qx-yellow); stroke-width: 2; stroke-dasharray: 6 6; pointer-events: none; }
  .hline { stroke: var(--qx-green); stroke-width: 2; stroke-dasharray: 6 6; pointer-events: none; }
  .vline.locked, .hline.locked { stroke-dasharray: none; stroke-width: 2.5; }

  .knob { stroke: var(--qx-surface); stroke-width: 2.5; cursor: grab; }
  .knob.v { fill: var(--qx-yellow); }
  .knob.h { fill: var(--qx-green); }
  .knob.active { stroke: var(--qx-text); }
  .knob.locked { stroke: var(--qx-text); }

  .al-flash {
    position: absolute; top: 10px; left: 50%; transform: translateX(-50%);
    background: var(--qx-green-soft); color: var(--qx-green-text); border: 1.5px solid var(--qx-green);
    font-size: 13px; font-weight: 800; padding: 5px 14px; border-radius: 999px;
  }

  .al-foot { display: flex; justify-content: center; align-items: center; min-height: 40px; }
  .al-legend { display: inline-flex; align-items: center; gap: 5px; font-size: 12px; font-weight: 650; color: var(--qx-text-faint); }
  .al-legend .k { width: 10px; height: 10px; border-radius: 3px; display: inline-block; }
  .al-legend .k.v { background: var(--qx-yellow); }
  .al-legend .k.h { background: var(--qx-green); }
  .al-primary {
    border: none; border-radius: 999px; background: var(--qx-accent); color: #fff;
    font-family: var(--qx-font); font-size: 14px; font-weight: 850; min-height: 40px; padding: 0 26px; cursor: pointer;
  }
</style>
