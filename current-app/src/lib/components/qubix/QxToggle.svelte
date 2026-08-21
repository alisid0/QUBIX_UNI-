<script>
  export let checked = false;
  export let onChange;
</script>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-static-element-interactions -->
<span class="qx-toggle" class:on={checked} role="switch" aria-checked={checked} tabindex="0" on:click={() => onChange?.(!checked)}>
  <span class="knob"></span>
</span>

<style>
  .qx-toggle {
    width: 42px;
    height: 24px;
    border-radius: var(--qx-radius-pill);
    background: var(--qx-border-2);
    position: relative;
    display: inline-block;
    cursor: pointer;
    transition: background 0.15s;
  }
  .qx-toggle.on { background: var(--qx-accent); }
  .knob {
    position: absolute;
    top: 2px;
    left: 2px;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #ffffff;
    transition: left 0.15s;
  }
  .qx-toggle.on .knob { left: 20px; }
</style>
