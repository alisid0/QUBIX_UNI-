<script>
  export let mode = 'selectPoint';
  export let prompt = 'Use the coordinate grid.';
  export let points = [];
  export let targetId = '';
  export let targetCoordinate = null;
  export let targetQuadrant = '';
  export let vector = { x: 0, y: 0 };
  export let axis = 'x';
  export let xRange = [-5, 5];
  export let yRange = [-5, 5];
  export let correctFeedback = 'Correct.';
  export let incorrectFeedback = 'Not quite.';
  export let onDone = () => {};

  const SIZE = 420;
  const PAD = 42;
  const plotSize = SIZE - PAD * 2;
  const palette = ['#ee9362', '#8ee6c7', '#9aa0ff', '#f6d365', '#f58fb0'];

  let svgEl;
  let localPoints = [];
  let selectedId = '';
  let draggingId = null;
  let submitted = false;
  let correct = false;
  let inputX = 0;
  let inputY = 0;

  $: sourceKey = JSON.stringify({ mode, points, targetId, targetCoordinate, targetQuadrant, vector, axis, xRange, yRange });
  let lastSourceKey = '';
  $: if (sourceKey !== lastSourceKey) {
    lastSourceKey = sourceKey;
    localPoints = (points || []).slice(0, 5).map((point, index) => ({
      ...point,
      color: point.color || palette[index % palette.length],
      startX: point.x,
      startY: point.y
    }));
    selectedId = targetId || localPoints.find((point) => !point.locked)?.id || localPoints[0]?.id || '';
    const readPoint = localPoints.find((point) => point.id === (targetId || selectedId)) || localPoints[0];
    inputX = readPoint?.x || 0;
    inputY = readPoint?.y || 0;
    draggingId = null;
    submitted = false;
    correct = false;
  }

  $: xMin = xRange?.[0] ?? -5;
  $: xMax = xRange?.[1] ?? 5;
  $: yMin = yRange?.[0] ?? -5;
  $: yMax = yRange?.[1] ?? 5;
  $: selectedPoint = localPoints.find((point) => point.id === selectedId);
  $: targetPoint = localPoints.find((point) => point.id === targetId) || selectedPoint || localPoints[0];
  $: derivedTarget = getTargetCoordinate();
  $: targetLabel = getTargetLabel();
  $: gridXs = range(xMin, xMax);
  $: gridYs = range(yMin, yMax);
  $: canMove = ['movePoint', 'translatePoint', 'reflectPoint'].includes(mode);
  $: canEditSelected = canMove && selectedPoint && selectedPoint.id === targetPoint?.id && !selectedPoint.locked;

  function range(min, max) {
    const values = [];
    for (let value = Math.ceil(min); value <= Math.floor(max); value++) values.push(value);
    return values;
  }

  function toX(x) { return PAD + ((x - xMin) / (xMax - xMin)) * plotSize; }
  function toY(y) { return PAD + plotSize - ((y - yMin) / (yMax - yMin)) * plotSize; }
  function fromX(x) { return xMin + ((x - PAD) / plotSize) * (xMax - xMin); }
  function fromY(y) { return yMin + ((plotSize - (y - PAD)) / plotSize) * (yMax - yMin); }
  function clamp(value, min, max) { return Math.max(min, Math.min(max, value)); }

  function eventToCoord(event) {
    const rect = svgEl.getBoundingClientRect();
    const scale = SIZE / rect.width;
    return {
      x: clamp(Math.round(fromX((event.clientX - rect.left) * scale)), xMin, xMax),
      y: clamp(Math.round(fromY((event.clientY - rect.top) * scale)), yMin, yMax)
    };
  }

  function movePoint(id, coord) {
    localPoints = localPoints.map((point) => point.id === id ? { ...point, x: coord.x, y: coord.y } : point);
  }

  function getQuadrant(point) {
    if (!point || point.x === 0 || point.y === 0) return 'axis';
    if (point.x > 0 && point.y > 0) return 'I';
    if (point.x < 0 && point.y > 0) return 'II';
    if (point.x < 0 && point.y < 0) return 'III';
    return 'IV';
  }

  function getTargetCoordinate() {
    if (targetCoordinate) return targetCoordinate;
    if (!targetPoint) return null;
    if (mode === 'translatePoint') return { x: targetPoint.startX + (vector?.x || 0), y: targetPoint.startY + (vector?.y || 0) };
    if (mode === 'reflectPoint') return axis === 'y'
      ? { x: -targetPoint.startX, y: targetPoint.startY }
      : { x: targetPoint.startX, y: -targetPoint.startY };
    return null;
  }

  function getTargetLabel() {
    if (mode === 'selectPoint') return targetCoordinate ? `Tap the point at (${targetCoordinate.x}, ${targetCoordinate.y})` : `Tap point ${targetId}`;
    if (mode === 'quadrant') return `Tap a point in Quadrant ${targetQuadrant}`;
    if (mode === 'readPoint') return `Read point ${targetPoint?.label || targetPoint?.id}`;
    if (mode === 'translatePoint') return `Move ${targetPoint?.label || targetPoint?.id} by (${vector?.x || 0}, ${vector?.y || 0})`;
    if (mode === 'reflectPoint') return `Reflect ${targetPoint?.label || targetPoint?.id} across the ${axis}-axis`;
    if (derivedTarget) return `Move ${targetPoint?.label || targetPoint?.id} to (${derivedTarget.x}, ${derivedTarget.y})`;
    return 'Use the grid';
  }

  function handlePointDown(event, point) {
    if (submitted) return;
    event.preventDefault();
    selectedId = point.id;
    if (canMove && point.id === targetPoint?.id && !point.locked) {
      draggingId = point.id;
      svgEl.setPointerCapture(event.pointerId);
    }
  }

  function handleGridDown(event) {
    if (submitted || !canEditSelected) return;
    if (event.target?.dataset?.point === 'true') return;
    movePoint(selectedId, eventToCoord(event));
  }

  function handleMove(event) {
    if (!draggingId || submitted) return;
    movePoint(draggingId, eventToCoord(event));
  }

  function handleUp() {
    draggingId = null;
  }

  function bump(axisName, delta) {
    if (submitted) return;
    if (axisName === 'x') inputX = clamp(inputX + delta, xMin, xMax);
    else inputY = clamp(inputY + delta, yMin, yMax);
  }

  function submit() {
    if (mode === 'selectPoint') {
      correct = targetCoordinate
        ? selectedPoint?.x === targetCoordinate.x && selectedPoint?.y === targetCoordinate.y
        : selectedId === targetId;
    } else if (mode === 'quadrant') {
      correct = getQuadrant(selectedPoint) === targetQuadrant;
    } else if (mode === 'readPoint') {
      correct = inputX === targetPoint?.x && inputY === targetPoint?.y;
    } else {
      correct = !!derivedTarget && targetPoint?.x === derivedTarget.x && targetPoint?.y === derivedTarget.y;
    }
    submitted = true;
  }

  function finish() {
    onDone(correct ? 1 : 0, 1);
  }
</script>

<div class="coord-workbook">
  <div class="prompt">{prompt}</div>
  <div class="target">{targetLabel}</div>

  <div class="stage">
    <svg
      bind:this={svgEl}
      viewBox="0 0 {SIZE} {SIZE}"
      role="img"
      aria-label="Interactive coordinate grid"
      on:pointerdown={handleGridDown}
      on:pointermove={handleMove}
      on:pointerup={handleUp}
      on:pointerleave={handleUp}
    >
      <rect x="0" y="0" width={SIZE} height={SIZE} rx="8" class="plane-bg" />

      {#each gridXs as x}
        <line x1={toX(x)} y1={PAD} x2={toX(x)} y2={SIZE - PAD} class="grid-line" />
      {/each}
      {#each gridYs as y}
        <line x1={PAD} y1={toY(y)} x2={SIZE - PAD} y2={toY(y)} class="grid-line" />
      {/each}

      <line x1={PAD} y1={toY(0)} x2={SIZE - PAD} y2={toY(0)} class="axis" />
      <line x1={toX(0)} y1={PAD} x2={toX(0)} y2={SIZE - PAD} class="axis" />

      {#each gridXs as x}
        {#if x !== 0}
          <text x={toX(x)} y={toY(0) + 18} text-anchor="middle" class="tick">{x}</text>
        {/if}
      {/each}
      {#each gridYs as y}
        {#if y !== 0}
          <text x={toX(0) - 9} y={toY(y) + 4} text-anchor="end" class="tick">{y}</text>
        {/if}
      {/each}
      <text x={toX(0) - 7} y={toY(0) + 18} text-anchor="end" class="tick">0</text>

      {#if selectedPoint}
        <line x1={toX(selectedPoint.x)} y1={toY(0)} x2={toX(selectedPoint.x)} y2={toY(selectedPoint.y)} class="guide" />
        <line x1={toX(0)} y1={toY(selectedPoint.y)} x2={toX(selectedPoint.x)} y2={toY(selectedPoint.y)} class="guide" />
      {/if}

      {#if canMove && derivedTarget}
        <circle cx={toX(derivedTarget.x)} cy={toY(derivedTarget.y)} r="10" class="target-ring" />
      {/if}

      {#each localPoints as point}
        <g class:selected={point.id === selectedId}>
          <circle
            data-point="true"
            cx={toX(point.x)}
            cy={toY(point.y)}
            r="19"
            class="touch"
            on:pointerdown={(event) => handlePointDown(event, point)}
          />
          <circle
            data-point="true"
            cx={toX(point.x)}
            cy={toY(point.y)}
            r={point.id === selectedId ? 8 : 6}
            fill={point.color}
            class="point"
            on:pointerdown={(event) => handlePointDown(event, point)}
          />
          <text x={toX(point.x) + 12} y={toY(point.y) - 12} class="point-label">{point.label || point.id}</text>
        </g>
      {/each}
    </svg>
  </div>

  <div class="readout">
    {#if selectedPoint}
      <span>Selected</span>
      <strong>{selectedPoint.label || selectedPoint.id}</strong>
      <em>({selectedPoint.x}, {selectedPoint.y})</em>
    {:else}
      <span>Select a point</span>
    {/if}
  </div>

  {#if mode === 'readPoint'}
    <div class="steppers">
      <div class="stepper">
        <span>x</span>
        <button on:click={() => bump('x', -1)} aria-label="Decrease x">-</button>
        <strong>{inputX}</strong>
        <button on:click={() => bump('x', 1)} aria-label="Increase x">+</button>
      </div>
      <div class="stepper">
        <span>y</span>
        <button on:click={() => bump('y', -1)} aria-label="Decrease y">-</button>
        <strong>{inputY}</strong>
        <button on:click={() => bump('y', 1)} aria-label="Increase y">+</button>
      </div>
    </div>
  {/if}

  {#if !submitted}
    <button class="submit-btn" on:click={submit}>Check</button>
  {:else}
    <div class="feedback" class:correct class:incorrect={!correct}>
      {correct ? correctFeedback : incorrectFeedback}
    </div>
    <button class="continue-btn" on:click={finish}>Continue</button>
  {/if}
</div>

<style>
  .coord-workbook {
    width: 100%;
    max-width: 390px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 12px;
    align-items: center;
  }

  .prompt {
    color: var(--qx-text);
    font-size: 15px;
    font-weight: 780;
    line-height: 1.42;
    text-align: center;
  }

  .target,
  .readout {
    width: 100%;
    box-sizing: border-box;
    border: 1px solid var(--qx-border);
    border-radius: 8px;
    background: var(--qx-surface-2);
    color: var(--qx-text-dim);
  }

  .target {
    padding: 9px 11px;
    font-size: 12px;
    font-weight: 780;
    text-align: center;
  }

  .stage {
    width: 100%;
    aspect-ratio: 1;
  }

  svg {
    width: 100%;
    height: 100%;
    display: block;
    border-radius: 8px;
    border: 1.5px solid var(--qx-border-2);
    touch-action: none;
    user-select: none;
  }

  .plane-bg { fill: var(--qx-surface-2); }
  .grid-line { stroke: var(--qx-border); stroke-width: 0.7; stroke-dasharray: 3 4; }
  .axis { stroke: var(--qx-text-2); stroke-width: 1.7; }
  .tick {
    fill: var(--qx-text-dim);
    font-family: var(--qx-font);
    font-size: 11px;
    font-weight: 650;
  }
  .guide {
    stroke: var(--qx-text-faint);
    stroke-width: 1.3;
    stroke-dasharray: 5 5;
  }
  .target-ring {
    fill: none;
    stroke: var(--qx-accent);
    stroke-width: 2.5;
    stroke-dasharray: 5 4;
  }
  .touch {
    fill: transparent;
    cursor: pointer;
  }
  .point {
    stroke: var(--qx-surface-2);
    stroke-width: 2.5;
    cursor: pointer;
  }
  g.selected .point {
    stroke: var(--qx-text);
    stroke-width: 3;
  }
  .point-label {
    fill: var(--qx-text);
    font-family: var(--qx-font);
    font-size: 13px;
    font-weight: 900;
    pointer-events: none;
  }

  .readout {
    min-height: 40px;
    padding: 8px 10px;
    display: grid;
    grid-template-columns: 1fr auto auto;
    gap: 8px;
    align-items: center;
    font-size: 12px;
    font-weight: 780;
  }
  .readout strong { color: var(--qx-text); font-size: 15px; }
  .readout em { color: var(--qx-accent); font-style: normal; font-variant-numeric: tabular-nums; }

  .steppers {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 8px;
  }

  .stepper {
    display: grid;
    grid-template-columns: 20px 34px 1fr 34px;
    gap: 6px;
    align-items: center;
    padding: 8px;
    border-radius: 8px;
    border: 1px solid var(--qx-border);
    background: var(--qx-surface);
  }
  .stepper span {
    color: var(--qx-text-faint);
    font-size: 12px;
    font-weight: 900;
  }
  .stepper strong {
    color: var(--qx-text);
    font-size: 20px;
    font-weight: 900;
    text-align: center;
    font-variant-numeric: tabular-nums;
  }
  .stepper button {
    width: 34px;
    height: 34px;
    border-radius: 50%;
    border: 1px solid var(--qx-border-2);
    background: var(--qx-surface-2);
    color: var(--qx-text);
    font: 900 18px/1 var(--qx-font);
    cursor: pointer;
  }

  .submit-btn,
  .continue-btn {
    min-height: 42px;
    width: 100%;
    border-radius: 999px;
    border: none;
    background: var(--qx-accent);
    color: #fff;
    font-family: var(--qx-font);
    font-size: 14px;
    font-weight: 850;
    cursor: pointer;
  }

  .feedback {
    width: 100%;
    box-sizing: border-box;
    padding: 12px;
    border-radius: 8px;
    font-size: 13px;
    font-weight: 720;
    line-height: 1.45;
    text-align: center;
  }
  .feedback.correct {
    background: var(--qx-green-soft);
    color: var(--qx-green-text);
  }
  .feedback.incorrect {
    background: var(--qx-danger-soft);
    color: var(--qx-danger-text);
  }
</style>
