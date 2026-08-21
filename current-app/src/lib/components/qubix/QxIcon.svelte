<script>
  export let name = 'home';
  export let size = 20;

  const PATHS = {
    home: '<path d="M3 11l9-8 9 8"/><path d="M5 10v10h14V10"/>',
    topics: '<path d="M9 4L3 6v14l6-2 6 2 6-2V4l-6 2-6-2z"/><path d="M9 4v14M15 6v14"/>',
    stats: '<path d="M4 20V10M10 20V4M16 20v-7"/>',
    workshop: '<path d="M4 5h16"/><path d="M7 5v14"/><path d="M17 5v14"/><path d="M7 19h10"/><path d="M10 9h4"/><path d="M10 13h4"/>',
    map: '<path d="M12 21s7-6 7-11a7 7 0 10-14 0c0 5 7 11 7 11z"/><circle cx="12" cy="10" r="2.5"/>',
    snippets: '<path d="M12 3l2 5 5 2-5 2-2 5-2-5-5-2 5-2 2-5z"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="M20 20l-3-3"/>',
    shuffle: '<path d="M16 3h5v5M21 3l-7 7M8 21H3v-5M3 21l7-7M21 16v5h-5M14 14l7 7M3 8V3h5M10 10L3 3"/>',
    bookmark: '<path d="M6 4v16l6-5 6 5V4z"/>',
    lock: '<rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 018 0v3"/>',
    chevronLeft: '<path d="M15 18l-6-6 6-6"/>',
    chevronRight: '<path d="M9 18l6-6-6-6"/>',
    chevronUp: '<path d="M18 15l-6-6-6 6"/>',
    chevronDown: '<path d="M6 9l6 6 6-6"/>',
    volume: '<path d="M11 5L6 9H3v6h3l5 4V5z"/><path d="M16 8a5 5 0 010 8"/>',
    like: '<path d="M12 21s-7-4.5-9.5-9C1 9 2.5 6 6 6c2 0 3 1.2 3.8 2.3C10.6 7.2 11.6 6 14 6c3.5 0 5 3 3.5 6-2.5 4.5-9.5 9-9.5 9z"/>',
    save: '<path d="M6 4v16l6-5 6 5V4z"/>',
    check: '<path d="M20 6L9 17l-5-5"/>'
  };

  const FILLED = new Set(['heart']);
  const FILL_PATHS = {
    heart: '<path d="M12 21s-7-4.5-9.5-9C1 9 2.5 6 6 6c2 0 3 1.2 3.8 2.3C10.6 7.2 11.6 6 14 6c3.5 0 5 3 3.5 6-2.5 4.5-9.5 9-9.5 9z"/>',
    flame: '<path d="M12 2c1 3-1 4-2 6s0 4 2 4 3-2 2-5c2 1 4 4 4 7a6 6 0 11-12 0c0-4 4-6 6-12z"/>'
  };

  $: filled = FILLED.has(name) || name === 'flame';
  $: markup = filled ? (FILL_PATHS[name] || '') : (PATHS[name] || '');
</script>

{#if filled}
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">{@html markup}</svg>
{:else}
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">{@html markup}</svg>
{/if}
