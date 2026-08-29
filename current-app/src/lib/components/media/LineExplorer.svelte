<script>
  const SIZE = 420;
  const MIN = 28;
  const MAX = SIZE - MIN;

  let svg;
  let angle = -0.55;
  let dragging = null;
  let explored = false;

  function boundaryDistance(x, y, dx, dy) {
    const tx = dx > 0 ? (MAX - x) / dx : dx < 0 ? (MIN - x) / dx : Infinity;
    const ty = dy > 0 ? (MAX - y) / dy : dy < 0 ? (MIN - y) / dy : Infinity;
    return Math.min(tx, ty);
  }

  $: extendedLine = (() => {
    const dx = Math.cos(angle);
    const dy = Math.sin(angle);
    const cx = SIZE / 2;
    const cy = SIZE / 2;
    const forward = boundaryDistance(cx, cy, dx, dy);
    const backward = boundaryDistance(cx, cy, -dx, -dy);
    return {
      x1: cx - dx * backward,
      y1: cy - dy * backward,
      x2: cx + dx * forward,
      y2: cy + dy * forward
    };
  })();

  function startDrag(event, end) {
    event.preventDefault();
    event.stopPropagation();
    dragging = end;
    svg?.setPointerCapture?.(event.pointerId);
  }

  function movePoint(event) {
    if (dragging === null || !svg) return;
    event.preventDefault();
    event.stopPropagation();
    const rect = svg.getBoundingClientRect();
    const scale = SIZE / rect.width;
    const x = (event.clientX - rect.left) * scale;
    const y = (event.clientY - rect.top) * scale;
    const pointerAngle = Math.atan2(y - SIZE / 2, x - SIZE / 2);
    angle = dragging === 'start' ? pointerAngle + Math.PI : pointerAngle;
    explored = true;
  }

  function stopDrag(event) {
    if (dragging !== null) event?.stopPropagation?.();
    dragging = null;
  }

  function turnWithKeyboard(event, end) {
    const turn = { ArrowLeft: -1, ArrowDown: -1, ArrowRight: 1, ArrowUp: 1 }[event.key];
    if (!turn) return;
    event.preventDefault();
    const direction = end === 'start' ? -turn : turn;
    angle += direction * (event.shiftKey ? 0.14 : 0.06);
    explored = true;
  }

  function reset() {
    angle = -0.55;
    explored = false;
  }
</script>

<div class="line-explorer">
  <div class="explorer-head">
    <div class="title-lockup"><span>INTERACTIVE MODEL</span><strong>An infinite line</strong></div>
    <button class="reset" on:click|stopPropagation={reset}>Reset</button>
  </div>
  <div class="instruction"><span aria-hidden="true"></span>Drag either arrowhead to turn the line.</div>
  <div class="canvas">
    <svg
      bind:this={svg}
      viewBox="0 0 {SIZE} {SIZE}"
      role="img"
      aria-label="An infinite line with draggable arrowheads"
      on:pointermove={movePoint}
      on:pointerup={stopDrag}
      on:pointercancel={stopDrag}
      on:pointerleave={stopDrag}
    >
      <defs>
        <pattern id="line-grid" width="24" height="24" patternUnits="userSpaceOnUse"><path d="M24 0H0V24" fill="none" stroke="var(--qx-border)" stroke-width=".7" opacity=".55" /></pattern>
        <marker id="line-arrow" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto-start-reverse">
          <path d="M 0 0 L 8 4 L 0 8 z" fill="var(--qx-accent)" />
        </marker>
      </defs>
      <rect x={MIN} y={MIN} width={MAX - MIN} height={MAX - MIN} rx="18" class="stage" />
      <rect x={MIN} y={MIN} width={MAX - MIN} height={MAX - MIN} rx="18" fill="url(#line-grid)" />
      <line
        x1={extendedLine.x1} y1={extendedLine.y1}
        x2={extendedLine.x2} y2={extendedLine.y2}
        class="infinite-line"
        marker-start="url(#line-arrow)"
        marker-end="url(#line-arrow)"
      />
      <circle
        cx={extendedLine.x1} cy={extendedLine.y1} r="27" class="arrow-handle"
        class:active={dragging === 'start'} role="button" tabindex="0"
        aria-label="Move the first arrowhead"
        on:pointerdown={(event) => startDrag(event, 'start')}
        on:keydown={(event) => turnWithKeyboard(event, 'start')}
      />
      <circle
        cx={extendedLine.x2} cy={extendedLine.y2} r="27" class="arrow-handle"
        class:active={dragging === 'end'} role="button" tabindex="0"
        aria-label="Move the second arrowhead"
        on:pointerdown={(event) => startDrag(event, 'end')}
        on:keydown={(event) => turnWithKeyboard(event, 'end')}
      />
    </svg>
    <div class="result" aria-live="polite">
      {explored ? 'Direction changed. The defining property did not.' : 'Two arrowheads show that neither direction has an endpoint.'}
    </div>
  </div>
  <div class="hint"><span aria-hidden="true">↔</span> The arrowheads are the controls—there are no endpoint dots.</div>
</div>

<style>
  .line-explorer {height:100%;width:100%;min-height:400px;box-sizing:border-box;display:flex;flex-direction:column;overflow:hidden;border:1px solid color-mix(in srgb,var(--qx-accent) 24%,var(--qx-border-2));border-radius:20px;background:linear-gradient(145deg,color-mix(in srgb,var(--qx-surface) 94%,var(--qx-accent) 6%),var(--qx-surface-2));color:var(--qx-text);box-shadow:0 16px 42px rgba(24,22,17,.09),inset 0 1px 0 rgba(255,255,255,.55);user-select:none}
  .explorer-head{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:16px 18px 14px;border-bottom:1px solid color-mix(in srgb,var(--qx-border-2) 72%,transparent);background:linear-gradient(90deg,color-mix(in srgb,var(--qx-accent) 9%,transparent),transparent 65%)}
  .title-lockup{display:grid;gap:3px}.title-lockup span{font-size:9px;font-weight:900;letter-spacing:.16em;color:var(--qx-accent-text)}.title-lockup strong{font-size:18px;letter-spacing:-.025em}.reset{border:1px solid var(--qx-border-2);border-radius:999px;background:var(--qx-surface);color:var(--qx-text-dim);padding:7px 12px;font:800 10px var(--qx-font);cursor:pointer}.reset:hover{border-color:var(--qx-accent);color:var(--qx-accent-text)}
  .instruction{display:flex;align-items:flex-start;justify-content:center;gap:8px;padding:11px 18px;color:var(--qx-text-dim);text-align:center;font-size:12px;font-weight:650}.instruction span{width:7px;height:7px;margin-top:4px;border-radius:50%;background:var(--qx-accent);box-shadow:0 0 0 5px var(--qx-accent-soft)}
  .canvas{display:grid;grid-template-rows:minmax(0,1fr) auto;flex:1;gap:10px;padding:14px;margin:0 12px;border:1px solid var(--qx-border-2);border-radius:16px;background:var(--qx-surface);box-shadow:inset 0 1px 10px rgba(24,22,17,.035)}
  .result{justify-self:center;min-height:17px;padding:10px 15px;border:1px solid color-mix(in srgb,var(--qx-accent) 28%,var(--qx-border));border-radius:11px;background:var(--qx-accent-soft);color:var(--qx-accent-text);text-align:center;font-size:12px;font-weight:800}
  .hint{display:flex;align-items:center;justify-content:center;gap:7px;padding:11px 16px 13px;color:var(--qx-text-faint);font-size:10px;font-weight:700}.hint span{font-size:15px;color:var(--qx-accent)}
  svg { width: 100%; height: 100%; min-height: 230px; touch-action: none; overflow: visible; filter:drop-shadow(0 7px 12px rgba(24,22,17,.05)); }
  .stage { fill: var(--qx-surface); stroke: var(--qx-border-2); stroke-width: 1.5; }
  .infinite-line { stroke: var(--qx-accent); stroke-width: 4; stroke-linecap: round; filter:drop-shadow(0 3px 4px color-mix(in srgb,var(--qx-accent) 30%,transparent)); }
  .arrow-handle { fill: transparent; stroke: transparent; cursor: grab; outline: none; }
  .arrow-handle:active, .arrow-handle.active { cursor: grabbing; }
  .arrow-handle:focus-visible { stroke: var(--qx-accent); stroke-width: 2; stroke-dasharray: 4 4; }
  @media(max-width:520px){.line-explorer{min-height:380px;border-radius:17px}.canvas{margin:0 8px}.title-lockup strong{font-size:16px}.hint{font-size:9px}}
  @media(prefers-reduced-motion:reduce){*{transition:none!important}}
</style>
