<script>
  // The site map, as a footer.
  //
  // Every mission and every written chapter reachable from one place, so
  // nothing depends on remembering a URL or finding the right disclosure. It
  // reads its lists from the same modules the pages do, which is why it cannot
  // list a mission that was removed or miss a chapter that was added.
  import { MISSIONS } from '../game/progress.js';
  import { SHARED_FOUNDATIONS } from '../content/shared-foundations.js';

  // On a page that already lists every mission and every chapter, repeating both
  // in the footer is the same twenty-four links a second time, and that is most
  // of what made the home page feel crowded. Compact drops the two lists the
  // page already carries and keeps the destinations nothing else links to, so
  // everything stays reachable from the same screen without being said twice.
  export let compact = false;

  // Taken from the chapters themselves, which is what the note above this file
  // already claimed. It was a hand-written list of seven titles beside eight
  // chapters, so the footer rendered "08undefined" where Chance and Inference
  // should have been: the exact failure the missions list is derived to avoid,
  // in the half of the same component that was not.
  const chapterTitle = chapter =>
    SHARED_FOUNDATIONS.find(c => c.chapter === chapter)?.book.title || '';

  // Only what nothing else on the page links to. Story mode, the wiki and the
  // library sat here as well as in the landing page's own row, which is the same
  // destination offered twice on one screen.
  const ELSEWHERE = [
    ['/library/big-sheet-of-graphs.html', 'The Big Sheet of Graphs'],
    ['/library/functions.html', 'Calculus From The Ground Up']
  ];
</script>

{#if compact}
  <footer class="site-foot compact">
    <nav aria-label="Elsewhere on the site">
      <h2>Elsewhere</h2>
      <ul>{#each ELSEWHERE as [href, label]}<li><a {href}>{label}</a></li>{/each}</ul>
    </nav>
    <p class="note">Qubix University · published by Arcave Technologies · every board here is an AI draft under founder review.</p>
  </footer>
{:else}
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
      <li><a href={`?mode=game&mission=shared-book&chapter=${chapter}&session=1`}><span>{String(chapter).padStart(2, '0')}</span>{chapterTitle(chapter)}</a></li>
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
      <li><a href="/?prototype=variables-and-rates">Mathematics pilot</a></li>
    </ul>
  </nav>

  <p class="note">Qubix University · published by Arcave Technologies · every board here is an AI draft under founder review.</p>
</footer>
{/if}

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
  /* One row of links rather than three columns of them. */
  .compact { grid-template-columns: 1fr; gap: 18px; }
  .compact ul { grid-auto-flow: column; grid-template-columns: none;
                justify-content: start; gap: 8px 26px; flex-wrap: wrap; }
  @media (max-width: 760px) { .compact ul { grid-auto-flow: row; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); } }
  .note { grid-column: 1 / -1; margin: 6px 0 0; padding-top: 22px;
          border-top: 1px solid var(--nav-rule, #ddd6c6);
          color: var(--nav-soft, #6d6558); font: 400 13.5px/1.6 var(--qx-font); }
</style>
