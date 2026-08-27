<script>
  export let spec;

  let activeKind = '';
  let stage = 0;
  let joinShape = 'safe';
  let checks = [];

  $: if (spec?.kind && spec.kind !== activeKind) {
    activeKind = spec.kind;
    stage = 0;
    joinShape = 'safe';
    checks = [];
  }

  const sales = Object.freeze([
    { id: 'S-01', branch: 'B-08', total: 18 },
    { id: 'S-02', branch: 'B-17', total: 46 },
    { id: 'S-03', branch: 'B-17', total: 31 },
    { id: 'S-04', branch: 'B-17', total: 62 }
  ]);
  const branches = Object.freeze([
    { id: 'B-08', name: 'Eastfield' },
    { id: 'B-17', name: 'Northgate' }
  ]);
  const duplicatedBranches = Object.freeze([...branches, { id: 'B-17', name: 'Northgate · old copy' }]);

  $: selectedSales = stage >= 1 ? sales.filter(row => row.total > 20) : sales;
  $: grouped = [
    { branch: 'B-08', count: sales.filter(row => row.branch === 'B-08').length },
    { branch: 'B-17', count: sales.filter(row => row.branch === 'B-17').length }
  ];
  $: visibleGroups = stage >= 2 ? grouped.filter(row => row.count > 1) : grouped;
  $: rightRows = joinShape === 'safe' ? branches : duplicatedBranches;
  $: joined = sales.flatMap(sale => rightRows.filter(branch => branch.id === sale.branch)
    .map(branch => ({ ...sale, name: branch.name })));

  const checkItems = Object.freeze([
    ['grain', 'State what one output row represents'],
    ['count', 'Compare expected and actual row counts'],
    ['keys', 'Check key uniqueness and unmatched records'],
    ['totals', 'Reconcile a known count or total']
  ]);

  function toggleCheck(id) {
    checks = checks.includes(id) ? checks.filter(item => item !== id) : [...checks, id];
  }
</script>

<section class="workshop" aria-labelledby={`workshop-${spec.kind}`}>
  <header>
    <div><span>INTERACTIVE DATA WORKSHOP</span><h3 id={`workshop-${spec.kind}`}>{spec.title}</h3></div>
    <b>ANALOGY ↔ SQL</b>
  </header>

  <div class="translation">
    {#each spec.mapping as [workshop, database]}
      <div><span>{workshop}</span><i aria-hidden="true">→</i><b>{database}</b></div>
    {/each}
  </div>

  {#each spec.paragraphs as paragraph}<p>{paragraph}</p>{/each}

  {#if spec.kind === 'select'}
    <div class="controls" aria-label="Query stages">
      {#each [['FROM',0],['WHERE total > 20',1],['SELECT id, branch',2]] as [label, value]}
        <button class:active={stage === value} on:click={() => stage = value}>{label}</button>
      {/each}
    </div>
    <div class="cabinet select-lab">
      <div class="cabinet-label"><span>CONTAINER</span><b>sale table</b><small>one drawer = one completed sale</small></div>
      <div class="rows">
        {#each sales as row}
          <div class:hidden={!selectedSales.includes(row)}>
            <b>{row.id}</b><span>{row.branch}</span>{#if stage < 2}<span>£{row.total}</span>{/if}
          </div>
        {/each}
      </div>
    </div>
    <div class="result-strip" role="status"><b>{selectedSales.length} rows</b><span>{stage === 0 ? 'FROM opens the container.' : stage === 1 ? 'WHERE removes drawers; their structure stays the same.' : 'SELECT hides a partition; the number of drawers stays the same.'}</span></div>

  {:else if spec.kind === 'group'}
    <div class="controls" aria-label="Grouping stages">
      {#each [['RAW SALES',0],['GROUP BY branch',1],['HAVING count > 1',2]] as [label, value]}
        <button class:active={stage === value} on:click={() => stage = value}>{label}</button>
      {/each}
    </div>
    {#if stage === 0}
      <div class="slips">{#each sales as row}<div><b>{row.id}</b><span>{row.branch}</span><small>one sale</small></div>{/each}</div>
    {:else}
      <div class="trays">{#each visibleGroups as row}<div><span>WORK TRAY</span><b>{row.branch}</b><strong>{row.count} sales</strong><small>one output row = one branch</small></div>{/each}</div>
    {/if}
    <div class="result-strip" role="status"><b>{stage === 0 ? 4 : visibleGroups.length} rows</b><span>{stage === 0 ? 'The grain is one sale.' : stage === 1 ? 'GROUP BY replaces sale slips with branch summaries.' : 'HAVING filters completed group summaries, not original sale slips.'}</span></div>

  {:else if spec.kind === 'join'}
    <div class="controls" aria-label="Join shape">
      <button class:active={joinShape === 'safe'} on:click={() => joinShape = 'safe'}>UNIQUE BRANCH CABINET</button>
      <button class:active={joinShape === 'duplicate'} on:click={() => joinShape = 'duplicate'}>DUPLICATED B-17 LABEL</button>
    </div>
    <div class="join-lab">
      <div class="mini-cabinet"><span>REPEATING EVENT TABLE</span><b>sale</b>{#each sales as row}<i>{row.id} · <strong>{row.branch}</strong></i>{/each}</div>
      <div class="join-arrow"><b>JOIN</b><span>branch_id</span><i aria-hidden="true">→</i></div>
      <div class="mini-cabinet"><span>MASTER TABLE</span><b>branch</b>{#each rightRows as row}<i><strong>{row.id}</strong> · {row.name}</i>{/each}</div>
    </div>
    <div class="result-strip" class:risk={joined.length !== sales.length} role="status"><b>{sales.length} → {joined.length} rows</b><span>{joined.length === sales.length ? 'Each sale label finds exactly one master record. Columns are added and the sale grain holds.' : 'B-17 now finds two master records. Its sale rows multiply; any sale total would be counted twice.'}</span></div>

  {:else if spec.kind === 'verify'}
    <div class="manifest">
      <div class="manifest-head"><span>DISPATCH MANIFEST</span><b>{checks.length} / {checkItems.length} checks recorded</b></div>
      {#each checkItems as [id, label], index}
        <button class:done={checks.includes(id)} aria-pressed={checks.includes(id)} on:click={() => toggleCheck(id)}><i>{checks.includes(id) ? '✓' : index + 1}</i><span>{label}</span></button>
      {/each}
    </div>
    <div class="result-strip" class:risk={checks.length < checkItems.length} role="status"><b>{checks.length === checkItems.length ? 'READY TO DISPATCH' : 'NOT YET VERIFIED'}</b><span>{checks.length === checkItems.length ? 'The query ran and its result has now been checked against an expected meaning.' : 'Successful SQL syntax only proves the instruction could run.'}</span></div>
  {/if}

  <aside><b>WHERE THE ANALOGY STOPS</b><p>{spec.limit}</p></aside>
</section>

<style>
  .workshop{margin:30px 0 0;padding:22px;border:2px solid #20241f;background:#e8e1d3;color:#20241f;box-shadow:7px 7px 0 #20241f}.workshop>header{display:flex;align-items:start;justify-content:space-between;gap:16px;padding-bottom:16px;border-bottom:2px solid #20241f}.workshop>header span{color:#b85530;font:900 11px var(--qx-font);letter-spacing:.13em}.workshop>header h3{margin:5px 0 0;font:400 25px/1.08 Georgia,serif}.workshop>header>b{padding:6px 8px;border:1px solid #20241f;font:900 11px var(--qx-font);letter-spacing:.08em}.workshop>p{margin:14px 0 0;color:#55584f;font:600 13.5px/1.55 var(--qx-font)}
  .translation{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:1px;margin-top:16px;border:1px solid #20241f;background:#20241f}.translation div{display:grid;grid-template-columns:1fr auto 1fr;align-items:center;gap:7px;min-width:0;padding:9px;background:#f7f3e9}.translation span,.translation b{font:800 11.5px/1.3 var(--qx-font)}.translation span{color:#8a4931}.translation i{font-style:normal}
  .controls{display:flex;gap:6px;margin-top:18px}.controls button{min-height:40px;padding:8px 11px;border:1px solid #20241f;background:#f7f3e9;color:#20241f;font:900 11px/1.25 var(--qx-font);cursor:pointer}.controls button.active{background:#315f48;color:#fff;box-shadow:3px 3px 0 #20241f}
  .cabinet{margin-top:12px;border:2px solid #20241f;background:#20241f}.cabinet-label{display:grid;grid-template-columns:auto 1fr auto;align-items:center;gap:10px;padding:10px 12px;background:#20241f;color:#fff}.cabinet-label span{color:#e4a37c;font:900 11px var(--qx-font);letter-spacing:.1em}.cabinet-label b{font:700 17px Georgia,serif}.cabinet-label small{font:700 11px var(--qx-font)}.rows{display:grid;gap:1px}.rows>div{display:grid;grid-template-columns:1fr 1fr 1fr;padding:10px 12px;background:#f7f3e9;transition:opacity .2s}.rows>div.hidden{display:none}.rows b,.rows span{font:750 12px ui-monospace,Menlo,Consolas,monospace}
  .result-strip{display:flex;align-items:center;gap:14px;margin-top:10px;padding:11px 13px;background:#315f48;color:#fff}.result-strip.risk{background:#8d3b27}.result-strip b{flex:none;font:900 12px var(--qx-font);letter-spacing:.06em}.result-strip span{font:650 12px/1.4 var(--qx-font)}
  .slips,.trays{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:8px;margin-top:12px}.slips>div,.trays>div{display:grid;gap:3px;padding:12px;border:1px solid #20241f;background:#f7f3e9}.slips b,.slips span{font:800 12px ui-monospace,monospace}.slips small,.trays small{color:#64665e;font:650 11px var(--qx-font)}.trays{grid-template-columns:repeat(2,minmax(0,1fr))}.trays>div{border:2px solid #20241f;box-shadow:3px 3px 0 #20241f}.trays span,.mini-cabinet>span{color:#b85530;font:900 11px var(--qx-font);letter-spacing:.1em}.trays b{font:700 18px Georgia,serif}.trays strong{font:850 13px var(--qx-font)}
  .join-lab{display:grid;grid-template-columns:1fr auto 1fr;gap:12px;align-items:center;margin-top:12px}.mini-cabinet{display:grid;gap:1px;border:2px solid #20241f;background:#20241f}.mini-cabinet>span,.mini-cabinet>b,.mini-cabinet>i{padding:8px 10px;background:#f7f3e9}.mini-cabinet>b{font:700 18px Georgia,serif}.mini-cabinet>i{font:750 11.5px ui-monospace,monospace;font-style:normal}.join-arrow{display:grid;justify-items:center;gap:2px}.join-arrow b{font:900 11px var(--qx-font)}.join-arrow span{font:750 11px ui-monospace,monospace}.join-arrow i{font:900 22px var(--qx-font);font-style:normal}
  .manifest{display:grid;gap:1px;margin-top:18px;border:2px solid #20241f;background:#20241f}.manifest-head{display:flex;justify-content:space-between;gap:12px;padding:10px 12px;background:#20241f;color:#fff}.manifest-head span{color:#e4a37c;font:900 11px var(--qx-font);letter-spacing:.1em}.manifest-head b{font:800 11px var(--qx-font)}.manifest button{display:grid;grid-template-columns:30px 1fr;align-items:center;gap:10px;min-height:49px;padding:9px 12px;border:0;background:#f7f3e9;color:#20241f;text-align:left;cursor:pointer}.manifest button.done{background:#e3eadf}.manifest i{display:grid;place-items:center;width:27px;height:27px;background:#20241f;color:#fff;font:900 11px var(--qx-font);font-style:normal}.manifest button.done i{background:#315f48}.manifest button span{font:750 12.5px var(--qx-font)}
  aside{margin-top:14px;padding:12px 14px;border-left:4px solid #b85530;background:#f7f3e9}aside b{color:#b85530;font:900 11px var(--qx-font);letter-spacing:.1em}aside p{margin:4px 0 0;color:#55584f;font:650 12px/1.5 var(--qx-font)}
  button:focus-visible{outline:3px solid #b85530;outline-offset:2px}@media(max-width:680px){.workshop{padding:17px;box-shadow:4px 4px 0 #20241f}.workshop>header{align-items:flex-start;flex-direction:column}.translation{grid-template-columns:1fr}.controls{display:grid;grid-template-columns:1fr}.slips{grid-template-columns:repeat(2,minmax(0,1fr))}.trays{grid-template-columns:1fr}.join-lab{grid-template-columns:1fr}.join-arrow i{transform:rotate(90deg)}.result-strip{align-items:flex-start;flex-direction:column}.cabinet-label{grid-template-columns:1fr}.rows>div{grid-template-columns:1fr 1fr 1fr}}
</style>
