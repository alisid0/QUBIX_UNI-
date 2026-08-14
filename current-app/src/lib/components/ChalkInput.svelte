<script>
  export let label = '';
  export let type = 'text';
  export let placeholder = '';
  export let value = '';
  export let error = '';
  let el;

  export function focus() { if (el) el.focus(); }
</script>

<div class="input-wrap">
  {#if label}
    <label class="input-label" for="input-{label}">{label}</label>
  {/if}
  <input
    id="input-{label}"
    type={type}
    {placeholder}
    bind:this={el}
    class:has-error={error}
    class="chalk-input"
    value={value}
    on:input={(e) => value = e.target.value}
    on:focus
    on:blur
  />
  {#if error}
    <span class="input-error">{error}</span>
  {/if}
</div>

<style>
  .input-wrap {
    display: flex;
    flex-direction: column;
    gap: 5px;
    width: 100%;
  }
  .input-label {
    font-family: var(--print);
    font-size: 12px;
    letter-spacing: 0.04em;
    color: var(--chalk-green);
    text-transform: uppercase;
  }
  .chalk-input {
    font-family: var(--hand);
    font-size: 16px;
    color: var(--chalk);
    background: rgba(0, 0, 0, 0.22);
    border: 1.5px dashed var(--chalk-faint);
    border-radius: 12px;
    padding: 14px 16px;
    min-height: var(--tap-target);
    outline: none;
    transition: border-color 0.2s;
    width: 100%;
  }
  .chalk-input:focus {
    border-color: var(--chalk-yellow);
  }
  .chalk-input::placeholder {
    color: var(--chalk-faint);
    opacity: 0.6;
  }
  .chalk-input.has-error {
    border-color: #e07a5f;
  }
  .input-error {
    font-family: var(--print);
    font-size: 11.5px;
    color: #e07a5f;
  }
</style>
