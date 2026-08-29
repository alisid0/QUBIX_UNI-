<script>
  // LabShell — the in-drill sibling of ArcadeShell. A drop-in header that gives
  // the calculus/graph labs the same premium chrome the arcade games use: a tiny
  // uppercase stage eyebrow + a glowing accent→green progress bar, replacing
  // plain stage dots. Header-only (the lab keeps its own body layout); labs
  // render inside Workshop.svelte's card so there's no exit/score here.
  export let eyebrow = '';   // current stage name (or a completion label)
  export let stage = 0;      // 0-based index of the current stage
  export let total = 1;      // number of stages
  export let done = false;

  $: pct = done ? 100 : Math.max(7, Math.min(100, (stage / total) * 100));
</script>

<div class="lab-prog">
  <div class="lab-meta">
    <span class="lab-eyebrow">{eyebrow}</span>
    <b>{done ? 'Concept unlocked' : `Step ${Math.min(stage + 1, total)} / ${total}`}</b>
  </div>
  <div class="lab-track" aria-label={`Lab progress ${Math.round(pct)}%`}>
    <i style={`width:${pct}%`}></i>
  </div>
</div>

<style>
  .lab-prog { display: flex; flex-direction: column; gap: 5px; }
  .lab-meta { display: flex; align-items: center; justify-content: space-between; gap: 10px; }
  .lab-eyebrow {
    color: var(--qx-text-faint); font-size: 9px; font-weight: 900;
    letter-spacing: 0.1em; text-transform: uppercase; overflow: hidden;
    text-overflow: ellipsis; white-space: nowrap;
  }
  .lab-meta b {
    color: var(--qx-accent-text); font-size: 9px; font-weight: 900;
    font-variant-numeric: tabular-nums; white-space: nowrap; flex-shrink: 0;
  }
  .lab-track { height: 5px; overflow: hidden; border-radius: 999px; background: var(--qx-surface-3); }
  .lab-track i {
    display: block; height: 100%; border-radius: inherit;
    background: linear-gradient(90deg, var(--qx-accent), var(--qx-green));
    box-shadow: 0 0 12px color-mix(in srgb, var(--qx-accent) 65%, transparent);
    transition: width 0.35s ease;
  }
</style>
