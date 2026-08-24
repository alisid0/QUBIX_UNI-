<script>
  // The site map, as a footer.
  //
  // Every mission and every written chapter reachable from one place, so
  // nothing depends on remembering a URL or finding the right disclosure. It
  // reads its lists from the same modules the pages do, which is why it cannot
  // list a mission that was removed or miss a chapter that was added.
  import { MISSIONS } from '../game/progress.js';
  import { SHARED_FOUNDATIONS } from '../content/shared-foundations.js';

  const CHAPTERS = [
    'What data represents', 'Numbers, ratios and change', 'Quality and evidence',
    'Statistics before models', 'SQL foundations', 'Python foundations', 'Explain what you found'
  ];
</script>

<footer class="site-foot">
  <nav aria-label="All missions">
    <h2>Play</h2>
    <ul>{#each MISSIONS as m, i}
      <li><a href={`?mode=game&mission=${m.slug}`}><span>{String(i + 1).padStart(2, '0')}</span>{m.mission.title}</a></li>
    {/each}</ul>
  </nav>

  <nav aria-label="All chapters">
    <h2>Read</h2>
    <ul>{#each SHARED_FOUNDATIONS as { chapter }}
      <li><a href={`?mode=game&mission=shared-book&chapter=${chapter}&session=1`}><span>{String(chapter).padStart(2, '0')}</span>{CHAPTERS[chapter - 1]}</a></li>
    {/each}</ul>
  </nav>

  <nav aria-label="Elsewhere">
    <h2>Elsewhere</h2>
    <ul>
      <li><a href="?mode=game">The academy</a></li>
      <li><a href="?mode=game&mission=campaign">Story mode</a></li>
      <li><a href="?mode=game&mission=foundations">Foundations</a></li>
      <li><a href="?mode=wiki">Data science wiki</a></li>
      <li><a href="/library/index.html">The library</a></li>
      <li><a href="/library/big-sheet-of-graphs.html">The Big Sheet of Graphs</a></li>
      <li><a href="/library/functions.html">Calculus From The Ground Up</a></li>
      <li><a href="/">Mathematics pilot</a></li>
    </ul>
  </nav>

  <p class="note">Qubix University · published by Arcave Technologies · every board here is an AI draft under founder review.</p>
</footer>

<style>
  .site-foot { margin-top: 64px; padding-top: 30px; border-top: 1px solid var(--nav-rule, #ddd6c6);
               display: grid; gap: 30px clamp(24px, 5vw, 60px);
               grid-template-columns: repeat(auto-fit, minmax(210px, 1fr)); }
  h2 { margin: 0 0 14px; color: var(--nav-soft, #6d6558);
       font: 700 12px var(--qx-font); letter-spacing: .13em; text-transform: uppercase; }
  ul { list-style: none; margin: 0; padding: 0; display: grid; gap: 9px; }
  a { display: flex; gap: 10px; color: var(--nav-ink, #241f16); text-decoration: none;
      font: 400 14.5px/1.4 var(--qx-font); }
  a:hover { color: var(--nav-accent, #5f7355); }
  a:focus-visible { outline: 2px solid var(--nav-accent, #5f7355); outline-offset: 3px; }
  span { flex: none; color: var(--nav-soft, #6d6558); font-variant-numeric: tabular-nums; }
  .note { grid-column: 1 / -1; margin: 6px 0 0; padding-top: 22px;
          border-top: 1px solid var(--nav-rule, #ddd6c6);
          color: var(--nav-soft, #6d6558); font: 400 13.5px/1.6 var(--qx-font); }
</style>
