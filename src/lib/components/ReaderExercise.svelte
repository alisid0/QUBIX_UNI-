<script>
  import { createEventDispatcher } from 'svelte';

  export let exercise;
  export let completed = false;

  const dispatch = createEventDispatcher();
  let activeId = '';
  let responses = {};
  let order = [];
  let checked = false;
  let correct = false;

  // The reader swaps sessions without remounting its article. Reset local work
  // when the exercise changes, but keep the completion state owned by the
  // chapter progress object in the parent.
  $: if (exercise?.id && exercise.id !== activeId) {
    activeId = exercise.id;
    responses = {};
    order = [];
    checked = false;
    correct = false;
  }

  $: ready = exercise?.type === 'sequence'
    ? order.length === exercise.items.length
    : exercise?.type === 'distribution-build'
      ? exercise.items.every(item => String(responses[`${item.id}-frequency`] ?? '').trim() !== ''
        && String(responses[`${item.id}-cumulative`] ?? '').trim() !== '')
      : exercise?.items.every(item => String(responses[item.id] ?? '').trim() !== '');

  function choose(itemId, value) {
    if (correct || completed) return;
    responses = { ...responses, [itemId]: value };
    checked = false;
  }

  function addToOrder(itemId) {
    if (correct || completed || order.includes(itemId)) return;
    order = [...order, itemId];
    checked = false;
  }

  function undoOrder() {
    if (correct || completed) return;
    order = order.slice(0, -1);
    checked = false;
  }

  function isRight(item) {
    if (exercise.type === 'distribution-build') {
      const frequency = Number(responses[`${item.id}-frequency`]);
      const cumulative = Number(responses[`${item.id}-cumulative`]);
      return frequency === item.frequency
        && Number.isFinite(cumulative)
        && Math.abs(cumulative - item.cumulative) <= (item.tolerance ?? 0.1);
    }
    if (exercise.type === 'numeric' || exercise.type === 'five-number-build') {
      const entered = Number(responses[item.id]);
      return Number.isFinite(entered) && Math.abs(entered - item.answer) <= (item.tolerance ?? 0);
    }
    return responses[item.id] === item.answer;
  }

  function check() {
    if (!ready || completed) return;
    correct = exercise.type === 'sequence'
      ? order.every((id, index) => id === exercise.answer[index])
      : exercise.items.every(isRight);
    checked = true;
    if (correct) dispatch('complete');
  }

  function retry() {
    checked = false;
    correct = false;
    if (exercise.type === 'sequence') order = [];
  }
</script>

<section class="reader-exercise" aria-labelledby={`exercise-${exercise.id}`}>
  <div class="exercise-head">
    <div><span>APPLIED EXERCISE</span><h3 id={`exercise-${exercise.id}`}>{exercise.title}</h3></div>
    <b class:done={completed || correct}>{completed || correct ? 'COMPLETE ✓' : exercise.type.toUpperCase()}</b>
  </div>
  <p class="instruction">{exercise.instruction}</p>

  {#if exercise.type === 'classify'}
    <div class="exercise-items">
      {#each exercise.items as item, index}
        <article class:wrong={checked && !isRight(item)} class:right={checked && isRight(item)}>
          <p><b>{index + 1}.</b> {item.prompt}</p>
          <div class="choice-row">
            {#each exercise.options as [value, label]}
              <button class:selected={responses[item.id] === value} aria-pressed={responses[item.id] === value}
                on:click={() => choose(item.id, value)} disabled={completed || correct}>{label}</button>
            {/each}
          </div>
          {#if checked}<small>{isRight(item) ? item.why : 'Re-read the process described in the record, then choose again.'}</small>{/if}
        </article>
      {/each}
    </div>
  {:else if exercise.type === 'numeric'}
    <div class="exercise-items numeric-items">
      {#each exercise.items as item, index}
        <article class:wrong={checked && !isRight(item)} class:right={checked && isRight(item)}>
          <label for={`${exercise.id}-${item.id}`}><b>{index + 1}.</b> {item.prompt}</label>
          <div class="number-entry"><input id={`${exercise.id}-${item.id}`} type="number" inputmode="decimal"
              value={responses[item.id] ?? ''} on:input={(event) => choose(item.id, event.currentTarget.value)}
              disabled={completed || correct} /><span>{item.suffix}</span></div>
          {#if checked}<small>{isRight(item) ? item.why : 'That number does not match the stated baseline and unit. Calculate it again.'}</small>{/if}
        </article>
      {/each}
    </div>
  {:else if exercise.type === 'decision-path'}
    <div class="decision-path">
      <div class="scenario"><span>THE REQUEST</span><b>{exercise.scenario.title}</b><p>{exercise.scenario.brief}</p></div>
      {#each exercise.items as item, index}
        <article class:wrong={checked && !isRight(item)} class:right={checked && isRight(item)}>
          <header><b>{index + 1}</b><span>{item.stage}</span></header>
          <p>{item.prompt}</p>
          <div class="path-options">
            {#each item.options as [value, label]}
              <button class:selected={responses[item.id] === value} aria-pressed={responses[item.id] === value}
                on:click={() => choose(item.id, value)} disabled={completed || correct}>{label}</button>
            {/each}
          </div>
          {#if checked}<small>{isRight(item) ? item.why : item.retry}</small>{/if}
        </article>
      {/each}
    </div>
  {:else if exercise.type === 'distribution-build'}
    <div class="distribution-build">
      <div class="raw-values"><span>RAW BASKETS · ITEMS IN EACH</span><b>{exercise.values.join(' · ')}</b></div>
      <div class="distribution-table" role="table" aria-label="Build a frequency distribution">
        <div class="distribution-row heading" role="row">
          <span role="columnheader">Items</span><span role="columnheader">Frequency</span><span role="columnheader">Cumulative %</span>
        </div>
        {#each exercise.items as item}
          <div class="distribution-row" class:wrong={checked && !isRight(item)} class:right={checked && isRight(item)} role="row">
            <b role="cell">{item.label}</b>
            <div role="cell"><label><span class="sr-only">Frequency for {item.label} items</span><input type="number" min="0" inputmode="numeric"
              value={responses[`${item.id}-frequency`] ?? ''} on:input={(event) => choose(`${item.id}-frequency`, event.currentTarget.value)} disabled={completed || correct} /></label></div>
            <div role="cell"><label class="pct"><span class="sr-only">Cumulative percentage through {item.label} items</span><input type="number" min="0" max="100" step="0.1" inputmode="decimal"
              value={responses[`${item.id}-cumulative`] ?? ''} on:input={(event) => choose(`${item.id}-cumulative`, event.currentTarget.value)} disabled={completed || correct} /><i>%</i></label></div>
            {#if checked}<small>{isRight(item) ? item.why : 'Recount this value, then divide the running total through this row by the total number of baskets.'}</small>{/if}
          </div>
        {/each}
      </div>
    </div>
  {:else if exercise.type === 'five-number-build'}
    <div class="five-number-build">
      <div class="raw-values"><span>ORDERED VALUES</span><b>{exercise.values.join(' · ')}</b></div>
      <div class="five-number-grid">
        {#each exercise.items as item, index}
          <label class:wrong={checked && !isRight(item)} class:right={checked && isRight(item)} for={`${exercise.id}-${item.id}`}>
            <span>{index < 5 ? `POINT ${index + 1}` : 'DERIVED'}</span>
            <b>{item.label}</b>
            <div><input id={`${exercise.id}-${item.id}`} type="number" step="any" inputmode="decimal"
              value={responses[item.id] ?? ''} on:input={(event) => choose(item.id, event.currentTarget.value)}
              disabled={completed || correct} />{#if item.suffix}<i>{item.suffix}</i>{/if}</div>
            {#if checked}<small>{isRight(item) ? item.why : item.retry}</small>{/if}
          </label>
        {/each}
      </div>
    </div>
  {:else if exercise.type === 'sequence'}
    <div class="sequence-board">
      <div class="sequence-built" aria-label="Your sequence">
        {#each order as id, index}
          <span class:wrong={checked && id !== exercise.answer[index]} class:right={checked && id === exercise.answer[index]}>
            <b>{index + 1}</b>{exercise.items.find(item => item.id === id)?.label}
          </span>
        {/each}
        {#each Array(Math.max(0, exercise.items.length - order.length)) as _, index}
          <span class="empty"><b>{order.length + index + 1}</b>Choose the next card</span>
        {/each}
      </div>
      <div class="sequence-source">
        {#each exercise.items as item}
          <button on:click={() => addToOrder(item.id)} disabled={order.includes(item.id) || completed || correct}>{item.label}</button>
        {/each}
      </div>
      {#if order.length && !correct && !completed}<button class="undo" on:click={undoOrder}>Undo last card</button>{/if}
    </div>
  {/if}

  {#if checked}
    <div class="exercise-feedback" class:success={correct} role="status">
      <b>{correct ? 'Exercise complete.' : 'Not yet.'}</b>
      <span>{correct ? (exercise.why || 'Every response is supported by the evidence above.') : 'Review the marked item or reset the sequence and try again.'}</span>
    </div>
  {/if}

  {#if completed && !checked}
    <div class="exercise-feedback success"><b>Exercise saved ✓</b><span>This applied step is part of your chapter progress.</span></div>
  {:else if checked && !correct}
    <button class="exercise-action retry" on:click={retry}>Try again</button>
  {:else if !correct}
    <button class="exercise-action" on:click={check} disabled={!ready}>Check the whole exercise</button>
  {/if}
</section>

<style>
  .reader-exercise{margin-top:32px;padding:24px;border:1px solid #9c998d;background:#e8e1d3;color:#20241f}
  .exercise-head{display:flex;align-items:start;justify-content:space-between;gap:16px;padding-bottom:16px;border-bottom:2px solid #20241f}
  .exercise-head span{color:#b85530;font:900 11.5px var(--qx-font);letter-spacing:.14em}
  .exercise-head h3{margin:5px 0 0;font:400 25px/1.08 Georgia,serif}
  .exercise-head>b{flex:none;padding:6px 8px;border:1px solid #20241f;font:900 11px var(--qx-font);letter-spacing:.08em}
  .exercise-head>b.done{background:#315f48;color:#fff}
  .instruction{margin:16px 0;color:#5f615a;font:650 13.5px/1.55 var(--qx-font)}
  .exercise-items{display:grid;gap:12px}.exercise-items article{padding:15px;border:1px solid #b8b0a0;background:#f7f3e9}
  .exercise-items article.right{border:2px solid #315f48;background:#edf2e9}.exercise-items article.wrong{border:2px solid #b85530;background:#f6e6de}
  .exercise-items p,.numeric-items label{display:block;margin:0 0 11px;font:700 14px/1.5 Georgia,serif}
  .exercise-items p b,.numeric-items label b{color:#b85530}
  .choice-row{display:flex;flex-wrap:wrap;gap:7px}.choice-row button,.sequence-source button{min-height:38px;padding:8px 11px;border:1px solid #8e8b81;background:#fff;color:#20241f;font:800 11.5px/1.3 var(--qx-font);cursor:pointer}
  .choice-row button.selected{border:2px solid #315f48;background:#e3eadf}.choice-row button:disabled,.sequence-source button:disabled{cursor:default;opacity:.58}
  article small{display:block;margin-top:10px;color:#4d5f48;font:700 11.5px/1.45 var(--qx-font)}article.wrong small{color:#8d3b27}
  .number-entry{display:flex;align-items:stretch;max-width:350px}.number-entry input{min-width:0;width:150px;padding:10px;border:2px solid #20241f;background:#fff;font:800 16px ui-monospace,monospace}.number-entry span{display:grid;place-items:center;padding:0 12px;background:#20241f;color:#fff;font:800 11px var(--qx-font)}
  .decision-path{display:grid;gap:10px}.decision-path .scenario{padding:16px;border:2px solid #20241f;background:#20241f;color:#fff;box-shadow:4px 4px 0 #b85530}
  .decision-path .scenario span{color:#e4a37c;font:900 11px var(--qx-font);letter-spacing:.13em}.decision-path .scenario b{display:block;margin-top:4px;font:700 19px Georgia,serif}.decision-path .scenario p{margin:6px 0 0;color:#e8e1d3;font:600 13px/1.5 var(--qx-font)}
  .decision-path article{padding:15px;border:1px solid #b8b0a0;background:#f7f3e9}.decision-path article.right{border:2px solid #315f48;background:#edf2e9}.decision-path article.wrong{border:2px solid #b85530;background:#f6e6de}
  .decision-path header{display:flex;align-items:center;gap:9px}.decision-path header b{display:grid;place-items:center;width:27px;height:27px;background:#20241f;color:#fff;font:900 11px var(--qx-font)}.decision-path header span{color:#b85530;font:900 11px var(--qx-font);letter-spacing:.11em}
  .decision-path article>p{margin:10px 0 11px;font:700 14px/1.5 Georgia,serif}.path-options{display:grid;gap:7px}.path-options button{min-height:42px;padding:9px 11px;border:1px solid #8e8b81;background:#fff;color:#20241f;font:750 11.5px/1.4 var(--qx-font);text-align:left;cursor:pointer}.path-options button.selected{border:2px solid #315f48;background:#e3eadf}.path-options button:disabled{cursor:default;opacity:.58}
  .distribution-build{display:grid;gap:12px}.raw-values{padding:13px 15px;border:2px solid #20241f;background:#f7f3e9}.raw-values span{display:block;color:#b85530;font:900 11px var(--qx-font);letter-spacing:.12em}.raw-values b{display:block;margin-top:6px;font:800 14px/1.5 ui-monospace,Menlo,Consolas,monospace;word-spacing:4px}
  .distribution-table{border:2px solid #20241f;background:#20241f;display:grid;gap:1px}.distribution-row{display:grid;grid-template-columns:minmax(70px,.7fr) 1fr 1.25fr;align-items:center;gap:10px;padding:9px 11px;background:#f7f3e9}.distribution-row.heading{min-height:34px;background:#20241f;color:#fff;font:900 11px var(--qx-font);letter-spacing:.06em}.distribution-row.right{background:#edf2e9}.distribution-row.wrong{background:#f6e6de}.distribution-row>b{font:850 13px var(--qx-font)}.distribution-row>div,.distribution-row label{display:flex;min-width:0}.distribution-row input{width:100%;min-width:0;height:38px;padding:7px 9px;border:1px solid #8e8b81;background:#fff;color:#20241f;font:800 14px ui-monospace,monospace}.distribution-row .pct{display:grid;width:100%;grid-template-columns:1fr auto}.distribution-row .pct i{display:grid;place-items:center;padding:0 9px;background:#20241f;color:#fff;font:800 11px var(--qx-font);font-style:normal}.distribution-row small{grid-column:1/-1;margin:0;color:#4d5f48;font:700 11.5px/1.4 var(--qx-font)}.distribution-row.wrong small{color:#8d3b27}.sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0}
  .five-number-build{display:grid;gap:12px}.five-number-grid{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:1px;border:2px solid #20241f;background:#20241f}.five-number-grid label{display:flex;min-width:0;min-height:136px;padding:12px;flex-direction:column;background:#f7f3e9}.five-number-grid label:nth-child(n+6){grid-column:span 2}.five-number-grid label:last-child{grid-column:span 3}.five-number-grid label.right{background:#edf2e9}.five-number-grid label.wrong{background:#f6e6de}.five-number-grid label>span{color:#b85530;font:900 11px var(--qx-font);letter-spacing:.1em}.five-number-grid label>b{margin:4px 0 10px;font:700 15px Georgia,serif}.five-number-grid label>div{display:flex;margin-top:auto}.five-number-grid input{width:100%;min-width:0;height:40px;padding:7px 9px;border:2px solid #20241f;background:#fff;color:#20241f;font:800 15px ui-monospace,monospace}.five-number-grid i{display:grid;place-items:center;padding:0 8px;background:#20241f;color:#fff;font:800 11px var(--qx-font);font-style:normal}.five-number-grid small{min-height:32px;color:#4d5f48}.five-number-grid label.wrong small{color:#8d3b27}
  .sequence-board{display:grid;gap:12px}.sequence-built{display:grid;gap:1px;border:2px solid #20241f;background:#20241f}.sequence-built span{min-height:49px;padding:10px 12px;display:grid;grid-template-columns:30px 1fr;align-items:center;gap:10px;background:#f7f3e9;font:700 12.5px/1.4 var(--qx-font)}
  .sequence-built span b{display:grid;place-items:center;width:27px;height:27px;background:#20241f;color:#fff}.sequence-built span.empty{color:#8b867c;background:#eee8dc}.sequence-built span.right{background:#e3eadf}.sequence-built span.wrong{background:#f6e6de}
  .sequence-source{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:7px}.sequence-source button{text-align:left}.undo{justify-self:start;border:0;border-bottom:1px solid currentColor;background:none;color:#b85530;font:850 11px var(--qx-font);cursor:pointer}
  .exercise-feedback{margin-top:14px;padding:12px 14px;display:grid;gap:3px;border-left:4px solid #b85530;background:#f6e6de;font:700 12.5px/1.45 var(--qx-font)}.exercise-feedback.success{border-color:#315f48;background:#e3eadf}.exercise-feedback span{font-weight:600}
  .exercise-action{width:100%;min-height:44px;margin-top:12px;border:0;background:#315f48;color:#fff;font:900 12px var(--qx-font);letter-spacing:.04em;cursor:pointer}.exercise-action.retry{background:#20241f}.exercise-action:disabled{opacity:.45;cursor:not-allowed}
  button:focus-visible,input:focus-visible{outline:3px solid #b85530;outline-offset:2px}
  @media(max-width:620px){.reader-exercise{padding:18px}.exercise-head{align-items:start}.exercise-head h3{font-size:22px}.sequence-source{grid-template-columns:1fr}.choice-row{display:grid}.choice-row button{width:100%;text-align:left}.decision-path .scenario{box-shadow:3px 3px 0 #b85530}.distribution-row{grid-template-columns:52px 1fr 1.2fr;gap:7px;padding:8px}.distribution-row.heading{font-size:11px;letter-spacing:0}.five-number-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.five-number-grid label:nth-child(n){grid-column:span 1}.five-number-grid label:last-child{grid-column:span 2}}
</style>
