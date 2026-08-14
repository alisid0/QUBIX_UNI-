<script>
  export let list = [];
  export let combinations = [];
  export let labels = [];
</script>

<div class="evidence">
  <div class="evidence-head"><strong>Security log</strong><span>{list.length}/4 states tested</span></div>
  <div class="evidence-labels"><span>{labels[0]}</span><span>{labels[1]}</span><span>LOCK</span></div>
  <div class="evidence-grid">
    {#each combinations as [a, b]}
      {@const result = list.find((item) => item.a === a && item.b === b)}
      <div class:tested={!!result} class:success={result?.output === 1}>
        <span>{a}</span><span>{b}</span><strong>{result ? (result.output ? 'OPEN' : 'SHUT') : '—'}</strong>
      </div>
    {/each}
  </div>
</div>

<style>
  .evidence { border: 1px solid var(--qx-border); border-radius: 12px; padding: 10px; margin-bottom: 9px; }
  .evidence-head { display: flex; justify-content: space-between; margin-bottom: 7px; }
  .evidence-head strong { font-size: 11px; }
  .evidence-head span { font-size: 9px; color: var(--qx-text-faint); font-weight: 800; }
  .evidence-labels { display: grid; grid-template-columns: 1fr 1fr 1.4fr; text-align: center; font-size: 7px; color: var(--qx-text-faint); font-weight: 900; letter-spacing: .05em; margin-bottom: 4px; }
  .evidence-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 4px; }
  .evidence-grid > div { display: grid; grid-template-columns: 1fr 1fr; grid-template-rows: 1fr auto; text-align: center; border-radius: 7px; padding: 6px 2px; background: var(--qx-surface-2); opacity: .42; }
  .evidence-grid > div.tested { opacity: 1; }
  .evidence-grid > div.success { background: var(--qx-green-soft); color: var(--qx-green-text); }
  .evidence-grid span { font-size: 10px; }
  .evidence-grid strong { grid-column: 1 / -1; margin-top: 2px; font-size: 7px; }
</style>
