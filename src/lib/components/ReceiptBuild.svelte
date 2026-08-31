<script>
  // One product through the checkout, value by value.
  //
  // The session says a value enters a record in one of three ways: observed at
  // the event, looked up from details already stored, or calculated from other
  // values. This asks that question of five real values from one purchase, and
  // builds the receipt line as the learner gets them right.
  //
  // The build-up is the point. By the last value the learner is looking at a
  // finished receipt where every figure is tagged with where it came from,
  // which is the thing the session claims and otherwise only asserts.

  import { createEventDispatcher } from 'svelte';

  export let values = [];
  export let origins = [];
  export let product = { name: 'Oat milk 1L', line: '2 × £1.85 = £3.70' };
  export let completed = false;

  const dispatch = createEventDispatcher();

  let round = 0;
  let picked = null;
  let answered = false;
  let correct = false;
  let placed = 0;

  $: current = values[round];
  $: last = round === values.length - 1;
  $: done = values.slice(0, placed);

  // A second press cannot get in. The early return below reads the settled flag
  // that this same handler set, so the second press is rejected by the first
  // one having already happened, and the buttons are disabled from the next
  // render onward.
  //
  // A no-op flag used to sit here, set true and false again inside one
  // synchronous handler. It read like protection and blocked nothing.

  function pick(index) {
    if (answered || completed || !current) return;
    picked = index;
    answered = true;
    correct = index === current.origin;
    if (correct) placed = round + 1;
  }

  function next() {
    if (!correct) return;
    picked = null; answered = false; correct = false;
    if (!last) { round += 1; return; }
    dispatch('complete');
  }

  function again() { picked = null; answered = false; correct = false; }
</script>

<div class="receipt-build">
  <p class="progress" aria-live="polite">
    {completed ? 'The whole receipt line is accounted for' : `Value ${round + 1} of ${values.length}`}
  </p>

  <div class="slip" aria-label={`The receipt so far: ${done.length} of ${values.length} values placed`}>
    <p class="slip-head">{product.name}</p>
    <dl>
      {#each values as value, i}
        <div class:filled={i < placed} class:blank={i >= placed}>
          <dt>{value.field}</dt>
          <dd>
            {#if i < placed}
              <b>{value.value}</b>
              <span class="from">{origins[value.origin].short}</span>
            {:else}
              <b class="unknown">not placed yet</b>
            {/if}
          </dd>
        </div>
      {/each}
    </dl>
    {#if placed === values.length}
      <p class="slip-total">{product.line}</p>
    {/if}
  </div>

  {#if current && !completed}
    <div class="asking">
      <p class="value-shown"><span>{current.field}</span><b>{current.value}</b></p>
      <p class="question" id="origin-question">Where did this value come from?</p>
    </div>

    <div class="choices" role="group" aria-labelledby="origin-question">
      {#each origins as origin, i}
        <button
          class="choice"
          class:picked={picked === i}
          class:right={answered && correct && picked === i}
          class:wrong={answered && !correct && picked === i}
          class:answer={answered && !correct && i === current.origin}
          aria-pressed={picked === i}
          disabled={answered}
          on:click={() => pick(i)}>{origin.label}</button>
      {/each}
    </div>

    <div class="feedback" role="status" aria-live="polite">
      {#if answered && correct}
        <p class="good"><b>Yes.</b> {current.why}</p>
      {:else if answered}
        <p class="not-yet"><b>Not that one.</b> {current.why}</p>
      {:else}
        <p class="waiting">Think about whether the checkout read it, already knew it, or worked it out.</p>
      {/if}
    </div>

    {#if answered && correct}
      <button class="advance" on:click={next}>{last ? 'Finish the receipt' : 'Next value'}</button>
    {:else if answered}
      <button class="advance retry" on:click={again}>Try this one again</button>
    {/if}
  {:else}
    <p class="all-done">Five values, three different origins. The scanner read two of them, the
      product record already held two, and the till worked the last one out. A wrong total can
      come from any of the three, and they go wrong in different ways.</p>
  {/if}
</div>

<style>
  .receipt-build { display: grid; gap: 13px; }

  .progress { margin: 0; color: #6d6558; font: 800 11px var(--qx-font, system-ui);
              letter-spacing: .1em; text-transform: uppercase; }

  /* A receipt, not a table: narrow, monospaced figures, a torn look at the top. */
  .slip { max-width: 420px; padding: 15px 18px; border: 2px solid #20241f; border-radius: 4px;
          background: #fffdf7; }
  .slip-head { margin: 0 0 10px; padding-bottom: 9px; border-bottom: 2px dashed #cbbfa6;
               font: 800 15px var(--qx-font, system-ui); color: #20241f; }
  .slip dl { display: grid; gap: 6px; margin: 0; }
  .slip dl > div { display: flex; justify-content: space-between; align-items: baseline; gap: 12px;
                   padding: 5px 0; border-bottom: 1px dotted #ded6c6; }
  .slip dt { color: #8b8375; font: 700 12px ui-monospace, Consolas, monospace; }
  .slip dd { margin: 0; text-align: right; }
  .slip dd b { display: block; font: 800 15px ui-monospace, Consolas, monospace; color: #20241f; }
  .slip dd b.unknown { color: #a09781; font: 650 12.5px var(--qx-font, system-ui); font-style: italic; }
  /* The origin is named in words beside every placed value, so the receipt is
     readable without relying on the tint. */
  .from { display: inline-block; margin-top: 3px; padding: 2px 7px; border-radius: 10px;
          background: #f6e6db; color: #8c4c2e;
          font: 800 11px var(--qx-font, system-ui); letter-spacing: .04em; }
  .slip .filled { border-bottom-style: solid; border-bottom-color: #cfe0c6; }
  .slip-total { margin: 11px 0 0; padding-top: 10px; border-top: 2px dashed #cbbfa6;
                text-align: right; font: 800 17px ui-monospace, Consolas, monospace; color: #8c4c2e; }

  .asking { display: grid; gap: 8px; }
  .value-shown { margin: 0; display: flex; align-items: baseline; gap: 12px; flex-wrap: wrap;
                 padding: 12px 15px; border: 2px solid #20241f; border-radius: 10px;
                 background: #f6e6db; }
  .value-shown span { color: #8c4c2e; font: 700 12.5px ui-monospace, Consolas, monospace; }
  .value-shown b { font: 800 24px var(--qx-font, system-ui); color: #20241f; overflow-wrap: anywhere; }
  .question { margin: 0; font: 700 18px/1.35 Georgia, serif; color: #20241f; }

  .choices { display: grid; gap: 8px; }
  .choice { width: 100%; min-height: 46px; padding: 11px 15px; text-align: left; cursor: pointer;
            border: 2px solid #cbbfa6; border-radius: 10px; background: #fff; color: #20241f;
            font: 650 15px/1.35 var(--qx-font, system-ui); }
  .choice:hover:not(:disabled) { border-color: #a85a34; }
  .choice:focus-visible { outline: 3px solid #a85a34; outline-offset: 2px; }
  .choice.picked { border-color: #20241f; }
  .choice.right { border-color: #3e9e2a; background: #e7f1e2; color: #2c6b1c; }
  .choice.right::after { content: ' — correct'; font-weight: 800; }
  .choice.wrong { border-color: #b3402e; background: #f7e7e3; }
  .choice.wrong::after { content: ' — not this one'; font-weight: 800; color: #8c3a2a; }
  .choice.answer { border-color: #3e9e2a; }
  .choice.answer::after { content: ' — this one'; font-weight: 800; color: #2c6b1c; }
  .choice:disabled { cursor: default; }

  .feedback { min-height: 44px; }
  .feedback p { margin: 0; font: 600 14px/1.5 var(--qx-font, system-ui); }
  .good { color: #2c6b1c; }
  .not-yet { color: #8c3a2a; }
  .waiting { color: #8b8375; }

  .advance { min-height: 46px; padding: 0 20px; border: 0; border-radius: 11px; cursor: pointer;
             background: #20241f; color: #fff; font: 800 15px var(--qx-font, system-ui); }
  .advance.retry { background: #fffdf7; color: #20241f; border: 2px solid #20241f; }
  .advance:focus-visible { outline: 3px solid #a85a34; outline-offset: 2px; }

  .all-done { margin: 0; color: #4a4436; font: 600 15px/1.6 var(--qx-font, system-ui); max-width: 62ch; }

  @media (max-width: 620px) {
    .slip { max-width: none; }
    .question { font-size: 16.5px; }
    .value-shown b { font-size: 20px; }
  }

  @media (forced-colors: active) {
    .choice.right, .choice.answer, .choice.wrong { border-color: CanvasText; }
    .slip .filled { border-bottom-color: CanvasText; }
  }
</style>
