<script>
  export let samples = [];
  export let centerValue = null;
  export let centerLabel = 'sensor offline';
  export let targetValue = null;
  export let formal = false;
  export let caption = 'Sensor readings around an unavailable checkpoint';
  export let minY = 0;
  export let maxY = 10;

  const xPos = (x) => 50 + x * 9.5;
  const yPos = (y) => 92 - ((y - minY) / Math.max(1, maxY - minY)) * 82;
</script>

<div class="plot" role="img" aria-label={caption}>
  <div class="grid" aria-hidden="true"></div>
  <div class="axis horizontal" aria-hidden="true"></div>
  <div class="axis vertical" aria-hidden="true"></div>
  <div class="fault" aria-hidden="true"><span>{formal ? 'a' : 'failed point'}</span></div>

  {#if targetValue !== null}
    <div class="target-line" style={`--target-y:${yPos(targetValue)}%;`} aria-hidden="true">
      <span>{formal ? `L = ${targetValue}` : `recovered ${targetValue}`}</span>
    </div>
  {/if}

  {#each samples as sample}
    <div
      class="sample"
      class:left={sample.x < 0}
      class:right={sample.x > 0}
      class:latest={sample.latest}
      style={`--sample-x:${xPos(sample.x)}%; --sample-y:${yPos(sample.y)}%;`}
      aria-hidden="true"
    >
      <i></i>
      {#if sample.latest}<span>{sample.y}</span>{/if}
    </div>
  {/each}

  <div
    class="center-reading"
    class:available={centerValue !== null}
    style={`--center-y:${centerValue === null ? 50 : yPos(centerValue)}%;`}
    aria-hidden="true"
  >
    <i></i>
    <span>{centerValue === null ? centerLabel : centerValue}</span>
  </div>

  <span class="axis-label input">{formal ? 'x' : 'probe position'}</span>
  <span class="axis-label output">{formal ? 'f(x)' : 'reading'}</span>
</div>

<style>
  .plot {
    position: relative;
    width: 100%;
    aspect-ratio: 1.45;
    min-height: 210px;
    overflow: hidden;
    border: 1px solid var(--qx-border);
    border-radius: 14px;
    background: var(--qx-surface-elevated);
  }

  .grid {
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(to right, var(--qx-border) 1px, transparent 1px),
      linear-gradient(to bottom, var(--qx-border) 1px, transparent 1px);
    background-size: 10% 100%, 100% 20%;
    opacity: .45;
  }

  .axis {
    position: absolute;
    background: var(--qx-text-faint);
  }

  .horizontal { left: 5%; right: 5%; bottom: 8%; height: 1px; }
  .vertical { left: 5%; top: 5%; bottom: 8%; width: 1px; }

  .fault {
    position: absolute;
    left: 50%;
    top: 5%;
    bottom: 8%;
    width: 0;
    border-left: 2px dashed var(--qx-danger);
  }

  .fault span {
    position: absolute;
    left: 6px;
    top: 5px;
    color: var(--qx-danger-text);
    font-size: 9px;
    font-weight: 850;
    white-space: nowrap;
  }

  .sample {
    position: absolute;
    left: var(--sample-x);
    top: var(--sample-y);
    transform: translate(-50%, -50%);
    display: grid;
    place-items: center;
  }

  .sample i {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--qx-accent);
    border: 2px solid var(--qx-surface-elevated);
    box-shadow: 0 0 0 1px var(--qx-accent);
  }

  .sample.right i { background: var(--qx-pink); box-shadow: 0 0 0 1px var(--qx-pink); }
  .sample.latest i { width: 11px; height: 11px; }

  .sample span {
    position: absolute;
    bottom: 12px;
    border: 1px solid var(--qx-border);
    border-radius: 999px;
    padding: 2px 5px;
    background: var(--qx-surface);
    color: var(--qx-text);
    font-size: 9px;
    font-weight: 900;
  }

  .center-reading {
    position: absolute;
    left: 50%;
    top: var(--center-y);
    transform: translate(-50%, -50%);
    display: grid;
    justify-items: center;
    gap: 3px;
  }

  .center-reading i {
    width: 12px;
    height: 12px;
    border: 2px solid var(--qx-danger);
    border-radius: 50%;
    background: var(--qx-surface-elevated);
  }

  .center-reading.available i {
    background: var(--qx-danger);
  }

  .center-reading span {
    border-radius: 999px;
    padding: 3px 6px;
    background: var(--qx-danger-soft);
    color: var(--qx-danger-text);
    font-size: 8.5px;
    font-weight: 900;
    white-space: nowrap;
  }

  .target-line {
    position: absolute;
    left: 5%;
    right: 5%;
    top: var(--target-y);
    border-top: 1.5px dashed var(--qx-green);
  }

  .target-line span {
    position: absolute;
    right: 2px;
    bottom: 4px;
    color: var(--qx-green-text);
    font-size: 9px;
    font-weight: 900;
  }

  .axis-label {
    position: absolute;
    color: var(--qx-text-faint);
    font-size: 9px;
    font-weight: 800;
  }

  .axis-label.input { right: 6%; bottom: 1.5%; }
  .axis-label.output { left: 7%; top: 3%; }

  @media (prefers-reduced-motion: reduce) {
    .sample { transition: none; }
  }
</style>
