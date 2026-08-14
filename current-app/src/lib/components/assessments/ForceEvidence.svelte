<script>
  // Compact run log for the Stop the Cart force lab. Each entry records the two
  // pushes and where the cart ended, and the three contrasting outcome classes
  // (still / left / right) light up as the learner produces them. Mirrors the
  // SecurityEvidence pattern so the two Solve First experiences feel related.
  export let runs = [];
  export let seen = { still: false, left: false, right: false };

  const classes = [
    { key: 'left', label: 'Drifted left' },
    { key: 'still', label: 'Held still' },
    { key: 'right', label: 'Drifted right' }
  ];
</script>

<div class="evidence">
  <div class="evidence-head">
    <strong>Run log</strong>
    <span>{runs.length} {runs.length === 1 ? 'run' : 'runs'}</span>
  </div>

  <div class="evidence-classes" aria-label="Outcome classes discovered">
    {#each classes as item}
      <div class:got={seen[item.key]}>
        <b>{seen[item.key] ? '✓' : '—'}</b>
        <span>{item.label}</span>
      </div>
    {/each}
  </div>

  {#if runs.length}
    <ul class="run-list">
      {#each runs.slice(-4).reverse() as run}
        <li class:still={run.outcome === 'still'}>
          <span class="push">FROM L {run.left}</span>
          <span class="push">FROM R {run.right}</span>
          <strong>{run.outcome === 'still' ? 'held still' : run.outcome === 'left' ? 'moved left' : 'moved right'}</strong>
        </li>
      {/each}
    </ul>
  {/if}
</div>

<style>
  .evidence { border: 1px solid var(--qx-border); border-radius: 12px; padding: 10px; margin-bottom: 9px; }
  .evidence-head { display: flex; justify-content: space-between; margin-bottom: 8px; }
  .evidence-head strong { font-size: 11px; }
  .evidence-head span { font-size: 9px; color: var(--qx-text-faint); font-weight: 800; }
  .evidence-classes { display: grid; grid-template-columns: repeat(3, 1fr); gap: 5px; }
  .evidence-classes > div { display: grid; grid-template-rows: auto auto; gap: 2px; justify-items: center; text-align: center; border-radius: 8px; padding: 7px 3px; background: var(--qx-surface-2); opacity: .5; }
  .evidence-classes > div.got { opacity: 1; background: var(--qx-green-soft); }
  .evidence-classes b { font-size: 12px; color: var(--qx-text-faint); }
  .evidence-classes > div.got b { color: var(--qx-green-text); }
  .evidence-classes span { font-size: 8.5px; font-weight: 850; color: var(--qx-text-dim); letter-spacing: .02em; }
  .evidence-classes > div.got span { color: var(--qx-green-text); }
  .run-list { list-style: none; margin: 8px 0 0; padding: 0; display: grid; gap: 4px; }
  .run-list li { display: grid; grid-template-columns: auto auto 1fr; gap: 7px; align-items: center; border-radius: 7px; padding: 5px 8px; background: var(--qx-surface-2); }
  .run-list li.still { background: var(--qx-green-soft); }
  .run-list .push { font-size: 9px; font-weight: 900; color: var(--qx-text-faint); font-variant-numeric: tabular-nums; }
  .run-list strong { text-align: right; font-size: 9.5px; font-weight: 850; color: var(--qx-text-dim); }
  .run-list li.still strong { color: var(--qx-green-text); }
</style>
