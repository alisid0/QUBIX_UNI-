<script>
  // One navigation, used by every hub-level screen.
  //
  // Before this, each view invented its own header links: the academy offered
  // "The wiki / Library / Mathematics", missions offered "Academy / The book",
  // and the foundations landing offered nothing at all, so the Library and the
  // wiki were unreachable from the page most people arrive on.
  //
  // Deliberately text only. No boxes, no fills, one accent on the current
  // place, which is the same restraint the landing was rebuilt with.
  export let current = '';

  const LINKS = [
    { id: 'play', label: 'Play', href: '?mode=game' },
    { id: 'read', label: 'Read', href: '?mode=game&mission=foundations' },
    { id: 'library', label: 'Library', href: '/library/index.html' },
    { id: 'wiki', label: 'Wiki', href: '?mode=wiki' },
    { id: 'maths', label: 'Mathematics', href: '/?prototype=variables-and-rates' }
  ];
</script>

<nav class="site" aria-label="Qubix sections">
  <a class="mark" href="/" aria-label="Qubix University home">Qubix</a>
  <ul>
    {#each LINKS as link}
      <li>
        <a href={link.href} class:on={current === link.id}
          aria-current={current === link.id ? 'page' : undefined}>{link.label}</a>
      </li>
    {/each}
  </ul>
</nav>

<style>
  .site { display: flex; align-items: baseline; gap: clamp(18px, 4vw, 40px);
          padding: 22px 0 20px; flex-wrap: wrap; }
  .mark { color: var(--nav-ink, #241f16); font: 600 17px Georgia, serif;
          text-decoration: none; letter-spacing: -.01em; }
  ul { list-style: none; display: flex; gap: clamp(14px, 2.6vw, 26px); margin: 0; padding: 0;
       flex-wrap: wrap; }
  a { color: var(--nav-soft, #6d6558); text-decoration: none;
      font: 500 15px var(--qx-font); padding-bottom: 3px;
      border-bottom: 2px solid transparent; }
  a:hover { color: var(--nav-ink, #241f16); }
  a.on { color: var(--nav-ink, #241f16); border-bottom-color: var(--nav-accent, #5f7355); }
  a:focus-visible { outline: 2px solid var(--nav-accent, #5f7355); outline-offset: 3px; }
</style>
