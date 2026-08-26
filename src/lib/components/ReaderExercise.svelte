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
    if (exercise.type === 'numeric') {
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
  .sequence-board{display:grid;gap:12px}.sequence-built{display:grid;gap:1px;border:2px solid #20241f;background:#20241f}.sequence-built span{min-height:49px;padding:10px 12px;display:grid;grid-template-columns:30px 1fr;align-items:center;gap:10px;background:#f7f3e9;font:700 12.5px/1.4 var(--qx-font)}
  .sequence-built span b{display:grid;place-items:center;width:27px;height:27px;background:#20241f;color:#fff}.sequence-built span.empty{color:#8b867c;background:#eee8dc}.sequence-built span.right{background:#e3eadf}.sequence-built span.wrong{background:#f6e6de}
  .sequence-source{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:7px}.sequence-source button{text-align:left}.undo{justify-self:start;border:0;border-bottom:1px solid currentColor;background:none;color:#b85530;font:850 11px var(--qx-font);cursor:pointer}
  .exercise-feedback{margin-top:14px;padding:12px 14px;display:grid;gap:3px;border-left:4px solid #b85530;background:#f6e6de;font:700 12.5px/1.45 var(--qx-font)}.exercise-feedback.success{border-color:#315f48;background:#e3eadf}.exercise-feedback span{font-weight:600}
  .exercise-action{width:100%;min-height:44px;margin-top:12px;border:0;background:#315f48;color:#fff;font:900 12px var(--qx-font);letter-spacing:.04em;cursor:pointer}.exercise-action.retry{background:#20241f}.exercise-action:disabled{opacity:.45;cursor:not-allowed}
  button:focus-visible,input:focus-visible{outline:3px solid #b85530;outline-offset:2px}
  @media(max-width:620px){.reader-exercise{padding:18px}.exercise-head{align-items:start}.exercise-head h3{font-size:22px}.sequence-source{grid-template-columns:1fr}.choice-row{display:grid}.choice-row button{width:100%;text-align:left}}
</style>
