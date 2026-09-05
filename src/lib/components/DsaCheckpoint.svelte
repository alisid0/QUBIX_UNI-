<script>
  import { createEventDispatcher } from 'svelte';
  import { answerIsCorrect } from '../content/dsa-course.js';
  export let question;
  export let restored = null;
  const dispatch = createEventDispatcher();
  let answer = restored?.answer ?? (question.options ? null : '');
  let checked = restored?.checked ?? false;
  let solved = restored?.solved ?? false;
  let hint = false;
  let attempts = restored?.attempts ?? 0;
  $: correct = checked && answerIsCorrect(question, answer);
  function check() {
    attempts += 1; checked = true;
    solved = answerIsCorrect(question,answer);
    dispatch('record',{id:question.id,answer,checked,solved,attempts});
  }
</script>

<section class="question">
  <h3>{question.prompt}</h3>
  {#if question.options}
    <fieldset disabled={solved}><legend>Choose an answer</legend>{#each question.options as option,i}<label class:selected={answer === i}><input type="radio" name={question.id} value={i} bind:group={answer} on:change={() => checked = false}/><span>{option}</span></label>{/each}</fieldset>
  {:else}
    <label class="number">Your answer <input type="number" bind:value={answer} disabled={solved} on:input={() => checked = false}/></label>
  {/if}
  <div class="actions"><button disabled={solved || answer === null || answer === '' || answer === undefined} on:click={check}>{solved ? 'Correct · checked' : 'Check reasoning'}</button><button class="hint" on:click={() => hint = !hint} aria-expanded={hint}>{hint ? 'Hide hint' : 'Give me a hint'}</button></div>
  {#if hint}<p class="hint-text">{question.hint}</p>{/if}
  {#if checked}<p class="feedback" class:correct aria-live="polite"><strong>{correct ? 'Correct. ' : 'Reconsider. '}</strong>{question.options ? question.feedback[answer] : correct ? question.feedback : 'Use the hint to trace the operation and count the requested quantity. Try again.'}</p>{/if}
</section>

<style>
  .question{border-top:1px solid var(--qx-border-2);padding:24px 0}h3{font-size:1.15rem;line-height:1.5}fieldset{padding:0;border:0}legend{font-size:.875rem;margin-bottom:12px}label{display:flex;gap:12px;align-items:flex-start;padding:12px;margin:8px 0;border:1px solid var(--qx-border-2);border-radius:6px;line-height:1.6;cursor:pointer}label.selected{border-color:var(--qx-accent);background:var(--qx-accent-soft)}input[type=radio]{margin-top:7px;accent-color:var(--qx-accent);min-width:18px;min-height:18px}.number{display:flex;flex-direction:column;border:0;padding:0}input[type=number]{font:inherit;background:var(--qx-surface);color:var(--qx-text);padding:12px;width:160px;border:1px solid var(--qx-border-2);border-radius:6px}button{font:inherit;font-weight:700;min-height:44px;background:var(--qx-text);color:var(--qx-bg);padding:10px 16px;border:1px solid var(--qx-text);border-radius:6px;cursor:pointer}button.hint{background:transparent;color:var(--qx-text)}button:disabled{opacity:.55;cursor:default}.actions{display:flex;flex-wrap:wrap;gap:12px;margin-top:16px}.feedback,.hint-text{line-height:1.7;padding:16px;background:var(--qx-surface-2);border-left:3px solid var(--qx-accent)}.feedback.correct{border-left-color:var(--qx-green-text)}:is(input,button):focus-visible{outline:3px solid var(--qx-accent);outline-offset:3px}
</style>
