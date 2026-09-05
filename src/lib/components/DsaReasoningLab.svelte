<script>
  import { searchTrace, insertionTrace, appendTrace } from '../content/dsa-course.js';
  export let kind;
  let policy = 'queue';
  let served = [];
  let waiting = ['A', 'B', 'C'];
  let caseIndex = 0;
  const cases = [
    {name:'First match with duplicates',values:[6,2,6,9],target:6},
    {name:'Match at the end',values:[6,2,6,9],target:9},
    {name:'Target absent',values:[6,2,6,9],target:7},
    {name:'Empty input',values:[],target:7}
  ];
  let cursor = 0;
  let prediction = '';
  let committed = false;
  let insertionIndex = 1;
  let count = 9;
  let growthPolicy = 'double';
  $: searchCase = cases[caseIndex];
  $: trace = searchTrace(searchCase.values, searchCase.target);
  $: insert = insertionTrace(['A','B','C','D'], Number(insertionIndex), 'X');
  $: growth = appendTrace(Number(count), growthPolicy);
  $: otherGrowth = appendTrace(Number(count), growthPolicy === 'double' ? 'one' : 'double');
  $: step = growth[cursor - 1];
  function reset() { cursor = 0; prediction = ''; committed = false; }
  function serve() {
    const next = policy === 'queue' ? waiting[0] : waiting.at(-1);
    if (next === undefined) { served = [...served, 'empty']; return; }
    served = [...served, next];
    waiting = policy === 'queue' ? waiting.slice(1) : waiting.slice(0,-1);
  }
</script>

<section class="lab" aria-labelledby="lab-heading">
  <p class="eyebrow">Predict → trace → explain</p>
  <h2 id="lab-heading">{kind === 'contract' ? 'Same records. Different removal rule.' : kind === 'search' ? 'Inspect only what the algorithm inspects' : kind === 'insertion' ? 'Move the values yourself, one step at a time' : 'Find the expensive appends'}</h2>
  {#if kind === 'contract'}
    <p>Requests arrived A, then B, then C. Predict which request each rule returns twice. Then compare with the trace.</p>
    <label>Removal rule <select bind:value={policy} on:change={() => {waiting = ['A','B','C']; served = []; reset();}}><option value="queue">Queue · oldest first</option><option value="stack">Stack · newest first</option></select></label>
    <label>Predict the first returned request <input type="text" maxlength="20" bind:value={prediction} disabled={committed}/></label>
    <button disabled={committed || !String(prediction).trim()} on:click={() => committed = true}>Commit prediction</button>
    <div class="slots" aria-label="Waiting requests, oldest to newest">{#each waiting as value}<div class="slot"><span>waiting</span><strong>{value}</strong></div>{/each}{#if !waiting.length}<p>No requests remain.</p>{/if}</div>
    <button on:click={serve} disabled={!committed || served.at(-1) === 'empty'}>Remove next request</button>
    <button class="secondary" on:click={() => {waiting = ['A','B','C']; served = []; reset();}}>Reset requests</button>
    <p class="result" aria-live="polite">Returned: {served.length ? served.join(' → ') : 'nothing yet'}</p>
    {#if served.length}<p>You predicted {prediction} first. The rule returned {served[0]} first.</p>{/if}
    {#if served.length >= 2}<p>Each successful removal changes length by one. A queue protects arrival order; a stack protects recency. Try removing from the empty collection: its defined result is “empty”, and no item is removed.</p>{/if}
  {:else if kind === 'search'}
    <label>Test case <select bind:value={caseIndex} on:change={reset}>{#each cases as item,i}<option value={i}>{item.name}</option>{/each}</select></label>
    <p>Target: <strong>{searchCase.target}</strong>. Contract: return the first matching index, or −1. Count only value comparisons.</p>
    <p>Input before searching: <strong>[{searchCase.values.join(', ')}]</strong>. The trace below reveals each comparison as it executes.</p>
    <label>Your predicted number of comparisons <input type="number" min="0" max="4" bind:value={prediction} disabled={committed}/></label>
    <button disabled={committed || prediction === '' || prediction === undefined} on:click={() => committed = true}>Commit prediction</button>
    <div class="slots" aria-label="Search trace">{#each searchCase.values as value,i}<div class="slot" class:active={cursor > 0 && trace.steps[cursor-1]?.index === i}><span>index {i}</span><strong>{i < cursor ? value : '?'}</strong><small>{i < cursor ? value === searchCase.target ? 'match' : 'ruled out' : 'uninspected'}</small></div>{/each}{#if !searchCase.values.length}<p>Empty sequence: there is no slot 0.</p>{/if}</div>
    <button disabled={!committed || cursor >= trace.steps.length} on:click={() => cursor += 1}>Compare next value</button>
    <p class="result" aria-live="polite">Comparisons: {cursor}{#if committed && cursor === trace.steps.length} · Return {trace.result}. Your prediction: {prediction}. {Number(prediction) === trace.steps.length ? 'Prediction matched.' : 'Compare your count with the trace.'}{/if}</p>
    {#if cursor > 0}<p>Before the next comparison, the inspected positions with mismatches have been ruled out. {trace.steps[cursor-1]?.match ? 'The first match ends the search; later duplicates do not need inspection.' : 'A mismatch is evidence about one position, not the rest of the sequence.'}</p>{/if}
    <button class="secondary" on:click={reset}>Try this case again</button>
  {:else if kind === 'insertion'}
    <p>Insert X into [A, B, C, D]. Capacity is 5 and length is 4. Predict the number of old items that move. The new-item write is counted separately.</p>
    <label>Insertion position <select bind:value={insertionIndex} on:change={reset}>{#each [0,1,2,3,4] as i}<option value={i}>{i}{i === 4 ? ' · append' : ''}</option>{/each}</select></label>
    <label>Your predicted old-item moves <input type="number" min="0" max="4" bind:value={prediction} disabled={committed}/></label>
    <button disabled={committed || prediction === '' || prediction === undefined} on:click={() => committed = true}>Commit prediction</button>
    <div class="slots" aria-label="Array insertion trace">{#each insert[cursor].slots as value,i}<div class="slot"><span>index {i}</span><strong>{value ?? 'spare'}</strong></div>{/each}</div>
    <p class="result" aria-live="polite">{insert[cursor].note} · {insert[cursor].moves} moves · {insert[cursor].writes} slot writes</p>
    <button disabled={!committed || cursor >= insert.length - 1} on:click={() => cursor += 1}>Execute next instruction</button>
    <button class="secondary" on:click={reset}>Reset trace</button>
    {#if cursor === insert.length - 1}<p>Your prediction was {prediction}; the trace moved {insert[cursor].moves} old items. The rule is n − i = 4 − {insertionIndex}. Relative order is preserved, and length is now 5. Try an insertion at the opposite end and explain the change.</p>{/if}
  {:else}
    <p>Start empty with capacity 1. Count copies of old values plus writes of new values. Allocation overhead is excluded. Compare the same number of appends under two policies.</p>
    <div class="controls"><label>Appends <select bind:value={count} on:change={reset}>{#each [5,9,16,17,32] as n}<option value={n}>{n}</option>{/each}</select></label><label>Growth policy <select bind:value={growthPolicy} on:change={reset}><option value="double">Double capacity</option><option value="one">Add one slot</option></select></label></div>
    <label>Predict final capacity <input type="number" min="1" max="64" bind:value={prediction} disabled={committed}/></label>
    <button disabled={committed || prediction === '' || prediction === undefined} on:click={() => committed = true}>Commit prediction</button>
    <div class="metrics" aria-live="polite"><p>Length <strong>{step?.length ?? 0}</strong></p><p>Capacity <strong>{step?.capacity ?? 1}</strong></p><p>This append <strong>{step?.cost ?? 0} writes</strong></p><p>Total <strong>{step?.writes ?? 0} writes</strong></p></div>
    <div class="bars" aria-label="Cost of each executed append">{#each growth.slice(0,cursor) as item}<div class="bar-row"><span>#{item.length}</span><meter min="0" max={Number(count)} value={item.cost} aria-label={`Append ${item.length}: ${item.cost} writes`}></meter><strong>{item.cost}</strong></div>{/each}</div>
    <button disabled={!committed || cursor === growth.length} on:click={() => cursor += 1}>Execute one append</button><button class="secondary" disabled={!committed || cursor === growth.length} on:click={() => cursor = growth.length}>Run remaining appends</button>
    <button class="secondary" on:click={reset}>Reset experiment</button>
    {#if cursor === growth.length}
      <p class="result">Predicted capacity: {prediction}. Actual: {step.capacity}. {Number(prediction) === step.capacity ? 'Prediction matched.' : 'Look for each point where length reached capacity.'}</p>
      <div class="table-wrap"><table><caption>Identical workload: {count} appends</caption><thead><tr><th>Policy</th><th>Old-value copies</th><th>Total writes</th><th>Final spare slots</th></tr></thead><tbody>{#each [{name:growthPolicy === 'double' ? 'Doubling' : 'Add one',result:step},{name:growthPolicy === 'double' ? 'Add one' : 'Doubling',result:otherGrowth.at(-1)}] as row}<tr><th>{row.name}</th><td>{row.result.copies}</td><td>{row.result.writes}</td><td>{row.result.capacity - row.result.length}</td></tr>{/each}</tbody></table></div>
      <p>Find the largest bar. That is a single-operation cost. Compare it with the total divided by {count}. A good average cannot guarantee that every operation meets a deadline.</p>
    {/if}
  {/if}
</section>

<style>
  .lab{border:1px solid var(--qx-border-2);padding:clamp(18px,4vw,32px);background:var(--qx-surface);border-radius:var(--qx-radius-sm);margin:24px 0}.eyebrow{color:var(--qx-accent-text);font-size:.875rem;font-weight:800}h2{font-size:1.6rem;line-height:1.25}p{line-height:1.7}label{display:flex;flex-direction:column;gap:8px;margin:18px 0;font-weight:700}select,input{background:var(--qx-bg);color:var(--qx-text);font:inherit;padding:10px;border:1px solid var(--qx-border-2);border-radius:6px;max-width:100%;min-height:44px}input{width:160px}button{background:var(--qx-text);color:var(--qx-bg);font:inherit;font-weight:700;border:1px solid var(--qx-text);padding:12px 16px;border-radius:6px;margin:6px 8px 6px 0;min-height:44px;cursor:pointer}button.secondary{color:var(--qx-text);background:transparent}button:disabled{opacity:.5;cursor:default}:is(button,select,input):focus-visible{outline:3px solid var(--qx-accent);outline-offset:3px}.slots{display:flex;flex-wrap:wrap;gap:8px;margin:24px 0}.slot{display:grid;text-align:center;min-width:78px;gap:6px;padding:12px;background:var(--qx-bg);border:2px solid var(--qx-border-2);border-radius:6px}.slot strong{font-size:1.35rem}.slot span,.slot small{font-size:.875rem}.slot.active{border-color:var(--qx-accent)}.result{font-weight:700;border-left:3px solid var(--qx-accent);padding:8px 16px}.controls{display:flex;gap:24px;flex-wrap:wrap}.metrics{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}.metrics p{padding:12px;background:var(--qx-bg);margin:12px 0}.metrics strong{display:block;font-size:1.3rem}.bars{max-height:360px;overflow:auto}.bar-row{display:grid;grid-template-columns:42px 1fr 36px;align-items:center;gap:12px;min-height:30px;font-size:.875rem}.bar-row meter{width:100%;height:20px}.table-wrap{overflow-x:auto}table{width:100%;border-collapse:collapse;font-size:.875rem}th,td{text-align:left;border-bottom:1px solid var(--qx-border-2);padding:12px}caption{text-align:left;font-weight:800;padding:16px 0}@media(max-width:500px){.slot{min-width:60px;padding:8px}.metrics{gap:6px}}
</style>
