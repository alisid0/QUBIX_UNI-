<script>
  // Pixel-art topic icons. Accepts a subject key, a gateway key, or an icon
  // path and resolves it to the right gateway artwork.
  export let subject = 'physics';
  export let accent = '';
  export let size = 32;

  const ALIASES = [
    ['bit', 'computing'], ['comput', 'computing'],
    ['line', 'maths'], ['math', 'maths'],
    ['atom', 'chemistry'], ['chem', 'chemistry'],
    ['unit', 'physics'], ['phys', 'physics']
  ];
  function resolve(value) {
    const key = String(value || '').toLowerCase();
    for (const [needle, name] of ALIASES) if (key.includes(needle)) return name;
    return 'physics';
  }
  const ICONS = {
    maths: '/icons/gateways/line.png',
    computing: '/icons/gateways/bit.png',
    chemistry: '/icons/gateways/atom.png',
    physics: '/icons/gateways/unit.png'
  };
  $: kind = resolve(subject);
</script>

<img
  class="subject-mark"
  src={ICONS[kind]}
  alt={kind}
  width={size}
  height={size}
  style={`--sm:${size}px;--sm-accent:${accent || 'transparent'}`}
/>

<style>
  .subject-mark {
    display: block;
    width: var(--sm);
    height: var(--sm);
    border-radius: clamp(8px, calc(var(--sm) * 0.24), 14px);
    object-fit: cover;
    flex: 0 0 auto;
    box-shadow: 0 0 0 1px color-mix(in srgb, var(--sm-accent) 38%, transparent);
  }
</style>
