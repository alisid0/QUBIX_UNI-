<script>
  // Transformation Lab — the graph-transformation signature lab. Drag a live
  // curve onto a ghosted target by moving its anchor (translation, c/d) and a
  // stretch point (vertical scale, a). Nine stages isolate right/left and
  // vertical shifts, translation, stretch, compression, and reflection before
  // combining the controls and transferring them to a different parent shape
  // (|x|). Only then is y = a·f(x−c)+d revealed as the shared rule. Contract:
  // `prompt` in, `onDone(score, max)` out; a 1/1 completion gate on finish.
  export let prompt = 'Drag the curve onto its shadow. Move the anchor, then stretch.';
  export let onDone = () => {};
  import LabShell from './LabShell.svelte';

  const reduceMotion = typeof matchMedia !== 'undefined'
    && matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ── Geometry: math space [-6,6] x [-5.6,5.6] mapped to a 300x280 viewBox ─────
  const W = 300, H = 280, S = 25, OX = W / 2, OY = H / 2;
  const XMIN = -6.2, XMAX = 6.2;
  const toX = (x) => OX + x * S;
  const toY = (y) => OY - y * S;
  const toMathX = (px) => (px - OX) / S;
  const toMathY = (py) => (OY - py) / S;
  const clampY = (y) => Math.max(-14, Math.min(14, y)); // keep path coords sane

  // ── Parent functions. All transformed as y = a · f(x − c) + d. ──────────────
  const PARENT = {
    quadratic: { f: (x) => x * x,       label: (a, c, d) => `${a}(x ${sc(c)})² ${sd(d)}` },
    absolute:  { f: (x) => Math.abs(x), label: (a, c, d) => `${a}|x ${sc(c)}| ${sd(d)}` }
  };
  const sc = (c) => (c === 0 ? '' : c > 0 ? `− ${c}` : `+ ${-c}`);
  const sd = (d) => (d === 0 ? '' : d > 0 ? `+ ${d}` : `− ${-d}`);

  // ── Stages: isolate one transformation at a time before combining them. ────
  const STAGES = [
    { type: 'quadratic', name: 'Move right', target: { a: 1, c: 2, d: 0 }, lockA: true, lockC: false, lockD: true,
      tip: 'Move only sideways. Slide the green tip two squares right onto its shadow.',
      success: 'Right by 2: the new input is x − 2.' },
    { type: 'quadratic', name: 'Move left', target: { a: 1, c: -2, d: 0 }, lockA: true, lockC: false, lockD: true,
      tip: 'Try the opposite direction. Move the same parent curve two squares left.',
      success: 'Left by 2: the new input is x + 2.' },
    { type: 'quadratic', name: 'Move up', target: { a: 1, c: 0, d: 3 }, lockA: true, lockC: true, lockD: false,
      tip: 'Now the tip can move only vertically. Lift every output three squares.',
      success: 'Up by 3: +3 is added outside the function.' },
    { type: 'quadratic', name: 'Place the tip', target: { a: 1, c: 2, d: -2 }, lockA: true, lockC: false, lockD: false,
      tip: 'Use both directions. Put the tip at (2, −2) without changing the shape.',
      success: 'The tip is (c, d): c moves sideways; d moves vertically.' },
    { type: 'quadratic', name: 'Stretch taller', target: { a: 2, c: 0, d: 0 }, lockA: false, lockC: true, lockD: true,
      tip: 'Keep the tip fixed. Pull the amber point up until every height is doubled.',
      success: 'Scale 2 doubles every output: 2f(x).' },
    { type: 'quadratic', name: 'Compress', target: { a: 0.5, c: 0, d: 0 }, lockA: false, lockC: true, lockD: true,
      tip: 'Bring the amber point halfway toward the tip. Make the curve wider and shallower.',
      success: 'Scale ½ halves every output: ½f(x).' },
    { type: 'quadratic', name: 'Reflect', target: { a: -1, c: 0, d: 0 }, lockA: false, lockC: true, lockD: true,
      tip: 'Pull the amber point below the tip. A negative scale turns the curve upside down.',
      success: 'A negative scale reverses every output: −f(x).' },
    { type: 'quadratic', name: 'Build the rule', target: { a: -2, c: -2, d: 1 }, lockA: false, lockC: false, lockD: false,
      tip: 'Now combine all three ideas: place the tip, then set the scale and direction.',
      success: 'Together they form y = a·f(x − c) + d.' },
    { type: 'absolute', name: 'Transfer the rule', target: { a: 1.5, c: 1, d: -2 }, lockA: false, lockC: false, lockD: false,
      tip: 'New parent shape: |x|. Use the same three numbers to match its shadow.',
      success: 'Same rule, new parent: transformations work on any function.' }
  ];

  let stageIx = 0;
  let params = { a: 1, c: 0, d: 0 };
  let matched = false;      // current stage matched
  let complete = false;     // whole lab done
  let activeHandle = null;  // 'vertex' | 'stretch' | null
  let svgEl;

  $: stage = STAGES[stageIx];
  $: parent = PARENT[stage.type];
  // Stretch handle sits where f(x−c) = 1 (x = c+1 for x² and |x|), so its height
  // is a + d and dragging it vertically maps straight to the scale a.
  $: stretchX = stage.lockA ? null : params.c + 1;
  $: stretchY = stage.lockA ? null : params.a + params.d;
  $: canMoveAnchor = !stage.lockC || !stage.lockD;
  $: revealRule = stageIx >= 7;

  function initStage() {
    // Start each stage away from the answer so there's something to do.
    const t = STAGES[stageIx].target;
    const s = STAGES[stageIx];
    params = {
      a: s.lockA ? t.a : 1,
      c: s.lockC ? t.c : 0,
      d: s.lockD ? t.d : 0
    };
    matched = false;
  }

  function pathFor(p, type) {
    const f = PARENT[type].f;
    let d = '';
    for (let x = XMIN; x <= XMAX; x += 0.06) {
      const y = clampY(p.a * f(x - p.c) + p.d);
      d += (d ? ' L' : 'M') + toX(x).toFixed(1) + ',' + toY(y).toFixed(1);
    }
    return d;
  }
  $: learnerPath = pathFor(params, stage.type);
  $: targetPath = pathFor(stage.target, stage.type);

  // ── Dragging ────────────────────────────────────────────────────────────────
  function svgPoint(e) {
    const r = svgEl.getBoundingClientRect();
    return {
      px: ((e.clientX - r.left) / r.width) * W,
      py: ((e.clientY - r.top) / r.height) * H
    };
  }
  function down(e) {
    if (matched) return;
    const { px, py } = svgPoint(e);
    const vd = canMoveAnchor ? Math.hypot(px - toX(params.c), py - toY(params.d)) : Infinity;
    const sd_ = stage.lockA ? Infinity : Math.hypot(px - toX(stretchX), py - toY(stretchY));
    if (!stage.lockA && sd_ < vd && sd_ < 20) activeHandle = 'stretch';
    else if (vd < 22) activeHandle = 'vertex';
    else return;
    e.target.setPointerCapture?.(e.pointerId);
    e.preventDefault();
  }
  function move(e) {
    if (!activeHandle || matched) return;
    const { px, py } = svgPoint(e);
    if (activeHandle === 'vertex') {
      if (!stage.lockC) params.c = clampP(Math.round(toMathX(px)), -5, 5);
      if (!stage.lockD) params.d = clampP(Math.round(toMathY(py)), -5, 5);
    } else {
      let a = Math.round((toMathY(py) - params.d) * 2) / 2;
      a = clampP(a, -4, 4);
      if (a === 0) a = toMathY(py) - params.d >= 0 ? 0.5 : -0.5;
      params.a = a;
    }
    params = { ...params };
    checkMatch();
  }
  const clampP = (v, lo, hi) => Math.max(lo, Math.min(hi, v));
  function up() { activeHandle = null; }

  function checkMatch() {
    const t = stage.target;
    const near = Math.abs(params.a - t.a) < 0.25
      && Math.abs(params.c - t.c) < 0.25
      && Math.abs(params.d - t.d) < 0.25;
    if (near && !matched) {
      matched = true;
      activeHandle = null;
      const delay = reduceMotion ? 0 : 1200;
      if (stageIx < STAGES.length - 1) {
        setTimeout(() => { stageIx += 1; initStage(); }, delay);
      } else {
        setTimeout(() => { complete = true; }, delay);
      }
    }
  }

  initStage();
</script>

<div class="fl">
  <LabShell eyebrow={complete ? 'One rule, any shape' : stage.name}
            stage={stageIx} total={STAGES.length} done={complete} />
  {#if complete}
    <div class="fl-rule">
      <span>The pattern you built</span>
      <strong>y = a · f(x − c) + d</strong>
      <small><b>a</b> scales or reflects · <b>c</b> moves sideways · <b>d</b> moves vertically</small>
    </div>
  {:else if revealRule}
    <div class="fl-eq">
      y =
      <span class="p-a">{params.a}</span>{stage.type === 'absolute' ? '|x' : '(x'}
      <span class="p-c">{sc(params.c) || '− 0'}</span>{stage.type === 'absolute' ? '|' : ')²'}
      <span class="p-d">{sd(params.d) || '+ 0'}</span>
    </div>
  {:else}
    <div class="fl-observe">
      <span>parent <b>y = {stage.type === 'absolute' ? '|x|' : 'x²'}</b></span>
      <span>tip <b>({params.c}, {params.d})</b></span>
      {#if !stage.lockA}<span>scale <b>{params.a}</b></span>{/if}
    </div>
  {/if}

  <div class="fl-stage-tip">{complete ? prompt : stage.tip}</div>

  <div class="fl-canvas" class:matched>
    <svg bind:this={svgEl} viewBox="0 0 {W} {H}"
         on:pointerdown={down} on:pointermove={move} on:pointerup={up} on:pointerleave={up}>
      <!-- grid -->
      {#each Array(13) as _, i}
        <line class="grid" x1={toX(i - 6)} y1="0" x2={toX(i - 6)} y2={H} />
        <line class="grid" x1="0" y1={toY(i - 6)} x2={W} y2={toY(i - 6)} />
      {/each}
      <!-- axes -->
      <line class="axis" x1="0" y1={OY} x2={W} y2={OY} />
      <line class="axis" x1={OX} y1="0" x2={OX} y2={H} />
      <!-- target (ghost) -->
      <path class="ghost" d={targetPath} />
      <!-- learner curve -->
      <path class="curve" class:matched d={learnerPath} />
      {#if !complete}
        <!-- stretch handle (a) -->
        {#if !stage.lockA}
          <line class="lead" x1={toX(params.c)} y1={toY(params.d)} x2={toX(stretchX)} y2={toY(stretchY)} />
          <circle class="handle stretch" class:active={activeHandle === 'stretch'}
                  cx={toX(stretchX)} cy={toY(stretchY)} r="8" />
        {/if}
        <!-- vertex / anchor handle (c, d) -->
        {#if canMoveAnchor}
          <circle class="handle vertex" class:active={activeHandle === 'vertex'}
                  cx={toX(params.c)} cy={toY(params.d)} r="9" />
        {:else if !stage.lockA}
          <circle class="anchor-fixed" cx={toX(params.c)} cy={toY(params.d)} r="5" />
        {/if}
      {/if}
    </svg>
    {#if matched && !complete}<div class="fl-flash">{stage.success}</div>{/if}
  </div>

  <div class="fl-foot">
    {#if complete}
      <button class="fl-primary" on:click={() => onDone(1, 1)}>Continue</button>
    {:else}
      <span class="fl-legend">
        {#if canMoveAnchor}<span class="k vertex"></span>{stage.lockD ? 'move sideways' : stage.lockC ? 'move vertically' : 'move the tip'}{/if}
        {#if canMoveAnchor && !stage.lockA}&nbsp; · &nbsp;{/if}
        {#if !stage.lockA}<span class="k stretch"></span>scale / reflect{/if}
      </span>
    {/if}
  </div>
</div>

<style>
  .fl { display: flex; flex-direction: column; gap: 10px; align-items: stretch; }

  .fl-eq {
    font-family: ui-monospace, "SF Mono", Menlo, monospace;
    font-size: 15px; font-weight: 700; color: var(--qx-text); white-space: nowrap;
  }
  .fl-observe {
    display: flex; flex-wrap: wrap; gap: 6px;
    font-family: ui-monospace, "SF Mono", Menlo, monospace;
  }
  .fl-observe span {
    color: var(--qx-text-dim); background: var(--qx-surface-2);
    border: 1px solid var(--qx-border); border-radius: 8px;
    font-size: 11.5px; font-weight: 700; padding: 4px 8px;
  }
  .fl-observe b { color: var(--qx-text); font-weight: 900; }
  .fl-rule {
    display: flex; flex-direction: column; align-items: center; gap: 4px;
    border: 1px solid var(--qx-green); border-radius: 10px;
    background: var(--qx-green-soft); padding: 8px 12px; text-align: center;
  }
  .fl-rule span {
    color: var(--qx-green-text); font-size: 9.5px; font-weight: 850;
    letter-spacing: 0.08em; text-transform: uppercase;
  }
  .fl-rule strong {
    color: var(--qx-text); font-family: ui-monospace, "SF Mono", Menlo, monospace;
    font-size: 17px;
  }
  .fl-rule small { color: var(--qx-text-dim); font-size: 10.5px; font-weight: 650; }
  .fl-rule small b { color: var(--qx-green-text); }
  .p-a { color: var(--qx-yellow-text); font-weight: 800; }
  .p-c, .p-d { color: var(--qx-green-text); font-weight: 800; }

  .fl-stage-tip {
    font-size: 13px; font-weight: 600; color: var(--qx-text-dim); line-height: 1.35; min-height: 34px;
  }

  .fl-canvas { position: relative; border: 1.5px solid var(--qx-border); border-radius: 12px; overflow: hidden; background: var(--qx-surface); }
  svg { display: block; width: 100%; height: auto; touch-action: none; cursor: grab; }
  svg:active { cursor: grabbing; }

  .grid { stroke: var(--qx-border); stroke-width: 1; opacity: 0.5; pointer-events: none; }
  .axis { stroke: var(--qx-text-faint); stroke-width: 1.4; pointer-events: none; }
  .ghost { fill: none; stroke: var(--qx-text-faint); stroke-width: 3; stroke-dasharray: 7 7; opacity: 0.7; pointer-events: none; }
  .curve { fill: none; stroke: var(--qx-accent); stroke-width: 3.5; stroke-linecap: round; stroke-linejoin: round; pointer-events: none; transition: stroke 0.2s; }
  .curve.matched { stroke: var(--qx-green); }
  .lead { stroke: var(--qx-yellow); stroke-width: 1.5; stroke-dasharray: 3 3; opacity: 0.8; pointer-events: none; }

  .handle { stroke: var(--qx-surface); stroke-width: 2.5; cursor: grab; }
  .handle.vertex { fill: var(--qx-green); }
  .handle.stretch { fill: var(--qx-yellow); }
  .handle.active { stroke: var(--qx-text); }
  .anchor-fixed { fill: var(--qx-green); stroke: var(--qx-surface); stroke-width: 2; opacity: 0.75; pointer-events: none; }

  .fl-flash {
    position: absolute; top: 10px; left: 50%; transform: translateX(-50%);
    background: var(--qx-green-soft); color: var(--qx-green-text); border: 1.5px solid var(--qx-green);
    width: max-content; max-width: calc(100% - 24px); text-align: center;
    font-size: 12px; line-height: 1.25; font-weight: 800; padding: 6px 14px; border-radius: 999px;
  }

  .fl-foot { display: flex; justify-content: center; min-height: 40px; align-items: center; }
  .fl-legend { display: inline-flex; align-items: center; gap: 4px; font-size: 12px; font-weight: 650; color: var(--qx-text-faint); }
  .fl-legend .k { width: 10px; height: 10px; border-radius: 50%; display: inline-block; }
  .fl-legend .k.vertex { background: var(--qx-green); }
  .fl-legend .k.stretch { background: var(--qx-yellow); }
  .fl-primary {
    border: none; border-radius: 999px; background: var(--qx-accent); color: #fff;
    font-family: var(--qx-font); font-size: 14px; font-weight: 850; min-height: 40px; padding: 0 26px; cursor: pointer;
  }
</style>
