<script>
  // Four values, one at a time. What job does this value do?
  //
  // The choices are all plain-language roles: identifies, orders, counts,
  // measures. The formal name arrives afterwards, as the reveal, once the
  // learner has already worked out what the value is for. That order is the
  // point of the activity. Handing somebody "nominal" and then asking them to
  // apply it is vocabulary; asking what a barcode is for and then telling them
  // the word for it is a definition.
  //
  // Ported from a review-document script that wrote into data-type-* hooks.
  // The rounds are state here, so this behaves like the rest of the reader.

  import { createEventDispatcher } from 'svelte';

  export let cases = [];
  export let completed = false;

  const dispatch = createEventDispatcher();

  let round = 0;
  let picked = null;
  let answered = false;
  let correct = false;
  let done = 0;

  $: current = cases[round];
  $: last = round === cases.length - 1;

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
    correct = index === current.correct;
  }

  function next() {
    if (!correct || !current) return;
    done = round + 1;
    picked = null; answered = false; correct = false;
    if (!last) { round += 1; return; }
    dispatch('complete');
  }

  function again() {
    picked = null; answered = false; correct = false;
  }
</script>

<div class="value-role">
  <p class="progress" aria-live="polite">
    {completed ? 'All four values done' : `Value ${round + 1} of ${cases.length}`}
  </p>

  {#if current && !completed}
    <div class="record">
      <p class="where"><span>Appears in</span><b>{current.context}</b></p>
      <p class="cell"><span>{current.field}</span><b>{current.value}</b></p>
    </div>

    <p class="question" id="value-question">{current.prompt}</p>

    <div class="choices" role="group" aria-labelledby="value-question">
      {#each current.options as label, i}
        <button
          class="choice"
          class:picked={picked === i}
          class:right={answered && correct && picked === i}
          class:wrong={answered && !correct && picked === i}
          class:answer={answered && !correct && i === current.correct}
          aria-pressed={picked === i}
          disabled={answered}
          on:click={() => pick(i)}>{label}</button>
      {/each}
    </div>

    <div class="feedback" role="status" aria-live="polite">
      {#if answered && correct}
        <p class="good"><b>Yes.</b> {current.explanation}</p>
      {:else if answered}
        <p class="not-yet"><b>Not that one.</b> {current.explanation}</p>
      {:else}
        <p class="waiting">Read the value in its record, then say what job it does.</p>
      {/if}
    </div>

    {#if answered && correct}
      <!-- The name comes last, and only once. -->
      <div class="term">
        <span>THE NAME FOR THAT</span>
        <b>{current.term}</b>
      </div>
      <button class="advance" on:click={next}>{last ? 'Finish' : 'Next value'}</button>
    {:else if answered}
      <button class="advance retry" on:click={again}>Try this one again</button>
    {/if}
  {:else}
    <p class="all-done">Four values, four jobs. Two of them identify or order something and two
      of them measure or count it, and what you may do with a value follows from which it is.</p>
  {/if}
</div>

<style>
  .value-role { display: grid; gap: 13px; }

  .progress { margin: 0; color: #6d6558; font: 800 11px var(--qx-font, system-ui);
              letter-spacing: .1em; text-transform: uppercase; }

  .record { display: grid; gap: 9px; padding: 14px 16px;
            border: 2px solid #20241f; border-radius: 10px; background: #fffdf7; }
  .where { margin: 0; display: flex; align-items: baseline; gap: 8px; }
  .where span { color: #8b8375; font: 700 11px var(--qx-font, system-ui);
                letter-spacing: .09em; text-transform: uppercase; }
  .where b { font: 800 14px var(--qx-font, system-ui); color: #20241f; }
  .cell { margin: 0; display: flex; align-items: baseline; gap: 12px; flex-wrap: wrap;
          padding-top: 9px; border-top: 1px solid #e0d8c8; }
  .cell span { font: 700 12.5px ui-monospace, Consolas, monospace; color: #8c4c2e; }
  .cell b { font: 800 26px var(--qx-font, system-ui); color: #20241f; overflow-wrap: anywhere; }

  .question { margin: 0; font: 700 18px/1.35 Georgia, serif; color: #20241f; }

  .choices { display: grid; gap: 8px; }
  .choice { width: 100%; min-height: 46px; padding: 11px 15px; text-align: left; cursor: pointer;
            border: 2px solid #cbbfa6; border-radius: 10px; background: #fff; color: #20241f;
            font: 650 15px/1.35 var(--qx-font, system-ui); }
  .choice:hover:not(:disabled) { border-color: #a85a34; }
  .choice:focus-visible { outline: 3px solid #a85a34; outline-offset: 2px; }
  .choice.picked { border-color: #20241f; }
  /* Marked in words as well as colour. */
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

  .term { display: grid; gap: 2px; padding: 12px 16px; border-left: 4px solid #a85a34;
          background: #f6e6db; }
  .term span { color: #8c4c2e; font: 800 11px var(--qx-font, system-ui); letter-spacing: .11em; }
  .term b { font: 800 19px var(--qx-font, system-ui); color: #20241f; }

  .advance { min-height: 46px; padding: 0 20px; border: 0; border-radius: 11px; cursor: pointer;
             background: #20241f; color: #fff; font: 800 15px var(--qx-font, system-ui); }
  .advance.retry { background: #fffdf7; color: #20241f; border: 2px solid #20241f; }
  .advance:focus-visible { outline: 3px solid #a85a34; outline-offset: 2px; }

  .all-done { margin: 0; color: #4a4436; font: 600 15px/1.6 var(--qx-font, system-ui); max-width: 62ch; }

  @media (max-width: 620px) {
    .question { font-size: 16.5px; }
    .cell b { font-size: 21px; }
  }

  @media (forced-colors: active) {
    .choice.right, .choice.answer, .choice.wrong { border-color: CanvasText; }
  }
</style>
