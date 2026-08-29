<script>
  export let mode = 'and';
  const states = [[0, 0], [0, 1], [1, 0], [1, 1]];
</script>

<div class="truth-mini">
  {#each states as [a, b]}
    {@const out = mode === 'and' ? a && b : a || b}
    <span class:lit={out}>{a} · {b} → {out ? 1 : 0}</span>
  {/each}
</div>

<style>
  .truth-mini { width: 100%; display: grid; grid-template-columns: 1fr 1fr; gap: 3px; margin-top: 8px; }
  .truth-mini span { padding: 4px 1px; border-radius: 5px; background: var(--qx-surface); color: var(--qx-text-faint); font-size: 7.5px; font-weight: 800; }
  .truth-mini span.lit { background: var(--qx-green-soft); color: var(--qx-green-text); }
</style>
