<script>
  export let padding = '14px';
  export let accentBorder = false; // highlight border in accent color
</script>

<div class="qx-card" class:accent={accentBorder} style="padding:{padding}">
  <slot />
</div>

<style>
  .qx-card {
    width: 100%;
    max-width: 100%;
    min-width: 0;
    overflow: hidden;
    background: var(--qx-surface);
    border: 1px solid var(--qx-border);
    border-radius: var(--qx-radius-lg);
    box-shadow: var(--qx-shadow-card);
  }
  .qx-card.accent {
    border-color: var(--qx-accent);
    background: var(--qx-accent-soft-2);
  }
</style>
