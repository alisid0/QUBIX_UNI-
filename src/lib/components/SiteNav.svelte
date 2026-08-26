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
  // Which chapter is being read, so the subject bar can mark it. 0 means none.
  export let chapter = 0;
  export let subjects = true;
  // The reader has its own top bar, so it takes the subject strip without the
  // section links above it.
  export let links = true;

  const LINKS = [
    { id: 'play', label: 'Play', href: '?mode=game' },
    { id: 'read', label: 'Read', href: '?mode=game&mission=shared-book&chapter=1&session=1' },
    { id: 'library', label: 'Library', href: '/library/index.html' },
    { id: 'wiki', label: 'Wiki', href: '?mode=wiki' },
    { id: 'maths', label: 'Mathematics', href: '/?prototype=variables-and-rates' }
  ];

  // The one genuinely useful thing about a reference site's subject strip: from
  // wherever you are, every subject is one click away, and you can see the whole
  // syllabus without opening anything. Chapter titles are sentences, so they are
  // shortened to the subject each one is actually about.
  const SUBJECTS = [
    [1, 'Data'], [2, 'Numbers'], [3, 'Quality'], [4, 'Statistics'],
    [5, 'SQL'], [6, 'Python'], [7, 'Explaining']
  ];
</script>

{#if links}
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
{/if}

{#if subjects}
  <nav class="subjects" aria-label="Volume 0 chapters">
    <ul>
      {#each SUBJECTS as [n, label]}
        <li>
          <a href={`?mode=game&mission=shared-book&chapter=${n}&session=1`}
            class:on={chapter === n} aria-current={chapter === n ? 'page' : undefined}>
            <span>{String(n).padStart(2, '0')}</span>{label}
          </a>
        </li>
      {/each}
    </ul>
  </nav>
{/if}

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

  /* The subject strip. Scrolls sideways on a narrow screen rather than wrapping
     into three ragged rows, so it stays one readable line of subjects. */
  .subjects { border-top: 1px solid var(--nav-rule, #ddd6c6);
              border-bottom: 1px solid var(--nav-rule, #ddd6c6);
              overflow-x: auto; scrollbar-width: thin; }
  .subjects ul { display: flex; flex-wrap: nowrap; width: max-content; gap: 0; margin: 0; padding: 0; list-style: none; }
  .subjects a { display: inline-flex; align-items: baseline; gap: 7px; white-space: nowrap;
                padding: 11px clamp(11px, 1.6vw, 18px); border-bottom: 2px solid transparent;
                color: var(--nav-soft, #6d6558);
                font: 700 12.5px var(--qx-font); letter-spacing: .07em; text-transform: uppercase; }
  .subjects li:first-child a { padding-left: 0; }
  .subjects a span { color: var(--nav-rule, #c9c0ac); font-weight: 500; letter-spacing: 0;
                     font-variant-numeric: tabular-nums; }
  .subjects a:hover { color: var(--nav-ink, #241f16); background: rgba(0, 0, 0, .022); }
  .subjects a.on { color: var(--nav-ink, #241f16); border-bottom-color: var(--nav-accent, #5f7355); }
  .subjects a.on span { color: var(--nav-accent, #5f7355); }
</style>
