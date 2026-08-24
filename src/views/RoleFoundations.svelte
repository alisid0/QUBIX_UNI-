<script>
  import { partsForChapter, writtenChapters, volumeMinutes } from '../lib/content/shared-foundations.js';
  import { MISSIONS } from '../lib/game/progress.js';
  import SiteNav from '../lib/components/SiteNav.svelte';
  import SiteFooter from '../lib/components/SiteFooter.svelte';
  const shared = {
    id: 'shared', number: '0', title: 'Shared Foundations', subtitle: 'What every data role should understand before specialising', colour: '#5f7355',
    bookHref: '?mode=game&mission=shared-book',
    game: { title: 'Data Quality Rotation', description: 'Practise the shared foundations across seven connected Superstore missions.', href: '?mode=game&mission=campaign', state: 'FOUNDATIONAL PLAYABLE DRAFT' },
    chapters: [
      ['What data represents', 'Observations, variables, records, tables and how data describes part of the world.'],
      ['Numbers, ratios and change', 'Arithmetic, percentages, rates, units, algebra, functions and graphs.'],
      ['Quality and evidence', 'Missing values, valid types, grain, keys, duplicates, provenance and uncertainty.'],
      ['Statistics before models', 'Distributions, centre, spread, variation, sampling and the language of probability.'],
      ['SQL foundations', 'Select, filter, group, join and check the grain of a result.'],
      ['Python foundations', 'Values, variables, conditions, loops, functions, collections and working with tabular data.'],
      ['Explain what you found', 'Clear tables, charts, written reasoning, reproducibility and responsible communication.']
    ]
  };

  const roles = [
    {
      id: 'analyst', number: 'I', title: 'Analyst Foundations', subtitle: 'Turn trustworthy data into clear representations and decisions', colour: '#a85a34', icon: '▥',
      outcome: 'Prepare for junior data, business-intelligence and operations analyst work.',
      game: { title: 'Analyst Decision Desk', description: 'Practise the foundations of turning a simple question into a clear representation.', href: '?mode=game&mission=role-game&role=analyst', state: 'FOUNDATIONAL GAME PLAN' },
      chapters: [
        ['Frame a useful question', 'Translate a business problem into measures, comparisons and a clear unit of analysis.'],
        ['Query with SQL', 'Filter, join, aggregate and use window functions without silently changing grain.'],
        ['Represent data clearly', 'Choose tables and charts by purpose, then label scales, units and uncertainty honestly.'],
        ['Describe patterns', 'Use distributions, centre, spread, segments and time comparisons without overclaiming.'],
        ['Define business metrics', 'Build traceable measures, denominators, cohorts and time windows.'],
        ['Build a decision view', 'Combine spreadsheets, notebooks or BI tools into a governed dashboard.'],
        ['Explain and recommend', 'Separate evidence from interpretation and communicate a decision with limitations.']
      ]
    },
    {
      id: 'engineer', number: 'II', title: 'Data Engineer Foundations', subtitle: 'Build reliable paths from source systems to usable data', colour: '#397f86', icon: '▤',
      outcome: 'Prepare for junior analytics-engineering and data-engineering study.',
      game: { title: 'Pipeline Control', description: 'Practise the basic parts of a pipeline, the order they run and the checks between them.', href: '?mode=game&mission=role-game&role=engineer', state: 'FOUNDATIONAL GAME PLAN' },
      chapters: [
        ['Program with Python', 'Use functions, modules, files, errors, tests and data structures to build maintainable processes.'],
        ['Model relational data', 'Use keys, constraints, normal forms, dimensions and facts to preserve meaning.'],
        ['Write production SQL', 'Transform data predictably, test assumptions and inspect query plans.'],
        ['Move and store data', 'Understand files, APIs, databases, warehouses, batch jobs and streaming fundamentals.'],
        ['Build a pipeline', 'Separate ingestion, validation, transformation and publishing into restartable steps.'],
        ['Operate for reliability', 'Use data contracts, quality checks, logs, lineage, orchestration and alerts.'],
        ['Protect the platform', 'Apply access control, secrets hygiene, retention, cost awareness and recovery basics.']
      ]
    },
    {
      id: 'scientist', number: 'III', title: 'Data Scientist Foundations', subtitle: 'Use mathematics, code and evidence to study uncertain problems', colour: '#8b5e9b', icon: '∿',
      outcome: 'Prepare for junior data-science study without skipping mathematical reasoning.',
      game: { title: 'Investigation Lab', description: 'Practise asking a measurable question, examining variation and judging simple evidence.', href: '?mode=game&mission=role-game&role=scientist', state: 'FOUNDATIONAL GAME PLAN' },
      chapters: [
        ['Compute with Python and SQL', 'Manipulate, join, visualise and test data reproducibly.'],
        ['Probability', 'Events, conditional probability, independence, random variables and common distributions.'],
        ['Statistical inference', 'Sampling, bias, estimation, confidence intervals, hypothesis tests and practical significance.'],
        ['Vectors and matrices', 'Represent observations, features and linear transformations with geometric meaning.'],
        ['Calculus and optimisation', 'Understand rates of change, derivatives, gradients, loss and numerical optimisation.'],
        ['Build and evaluate models', 'Frame prediction tasks, split data, establish baselines and compare suitable metrics.'],
        ['Reason from model evidence', 'Interpret results, examine failure modes and communicate uncertainty and limitations.']
      ]
    },
    {
      id: 'ml-engineer', number: 'IV', title: 'Machine Learning Engineer Foundations', subtitle: 'Turn validated models into dependable software systems', colour: '#b9822f', icon: '◇',
      outcome: 'Prepare for ML-engineering study by combining mathematical, modelling and software foundations.',
      game: { title: 'Model Operations', description: 'Practise the basic model lifecycle from inputs and training to checking an output.', href: '?mode=game&mission=role-game&role=ml-engineer', state: 'FOUNDATIONAL GAME PLAN' },
      chapters: [
        ['Mathematics for learning systems', 'Algebra, functions, vectors, matrices, probability, statistics, derivatives and gradients.'],
        ['Programming and algorithms', 'Python, data structures, complexity, testing, version control and maintainable design.'],
        ['Machine-learning foundations', 'Features, objectives, training, regularisation, validation and model families.'],
        ['Data and training pipelines', 'Create reproducible datasets, transformations, experiments and model artefacts.'],
        ['Serve a model', 'Use APIs, batch inference, containers and compute resources to make predictions available.'],
        ['Operate the system', 'Monitor latency, data quality, drift, model quality, failures and rollback.'],
        ['Build responsibly', 'Address privacy, security, robustness, fairness, explainability and human oversight.']
      ]
    }
  ];

  const requestedRole = new URLSearchParams(window.location.search).get('role');
  let selected = roles.some(role => role.id === requestedRole) ? requestedRole : 'shared';
  $: volume = selected === 'shared' ? shared : roles.find(role => role.id === selected);

  // Asked, not hardcoded. A chapter becomes clickable here by being added to
  // the registry, which is the only place that knows what exists.
  const partsFor = (v, chapterIndex) => (v.id === 'shared' ? partsForChapter(chapterIndex + 1) : []);

  const minutes = m => (m < 60 ? `${m} min` : `${Math.floor(m / 60)} h ${String(m % 60).padStart(2, '0')} min`);
  // Read from the book rather than typed here, so the two cannot disagree.
  $: readingTime = minutes(volumeMinutes);
  $: written = volume.id === 'shared' ? writtenChapters : 0;
</script>

<svelte:head><title>Role Foundations | Qubix University</title><meta name="description" content="Play ten data missions, then read the foundations behind them." /></svelte:head>

<section class="library qx-shell" style={`--volume:${volume.colour}`}>
  <SiteNav current="read" />
  <header>
    <p>QUBIX UNIVERSITY · AI_DRAFT</p>
    <h1>Foundations before specialisation.</h1>
    <span>Play a mission. Read the chapter behind it. Then continue.</span>
  </header>

  <!-- One band, not three. The ten mission links are all still here, one press
       away, rather than ten cards competing with the contents below them. -->
  <section class="start">
    <div>
      <h2>{MISSIONS.length} playable missions</h2>
      <span>Fifteen minutes each. Progress is kept. No reading required first.</span>
    </div>
    <div class="start-actions">
      <a class="primary" href="?mode=game">Open the academy <span aria-hidden="true">→</span></a>
      <a href="?mode=game&mission=campaign">Story mode</a>
    </div>
    <details class="all-missions">
      <summary>All {MISSIONS.length} missions</summary>
      <ol>{#each MISSIONS as m, i}
        <li><a href={`?mode=game&mission=${m.slug}`}><b>{String(i + 1).padStart(2, '0')}</b><span>{m.mission.title}</span><em>{m.xp} XP</em></a></li>
      {/each}</ol>
    </details>
  </section>

  <nav aria-label="Foundation volumes">
    <button class:active={selected === 'shared'} on:click={() => selected = 'shared'}>Volume 0 · Shared</button>
    {#each roles as role}<button class:active={selected === role.id} on:click={() => selected = role.id}>Volume {role.number} · {role.title.replace(' Foundations','')}</button>{/each}
  </nav>

  <main>
    <div class="volume-head">
      <div>
        <p>VOLUME {volume.number} · {volume.chapters.length} CHAPTERS · {written} WRITTEN</p>
        <h2>{volume.title}</h2>
        <span>{volume.subtitle}</span>
      </div>
      {#if volume.bookHref}<a class="primary" href={volume.bookHref}>Begin Part One · {readingTime} <span aria-hidden="true">→</span></a>{/if}
    </div>

    <ol class="contents">{#each volume.chapters as chapter,index}
      {@const part = partsFor(volume, index)}
      <li class:planned={!part.length}>
        {#if part.length}
          <!-- The parts are collapsed. Seven chapters expanded at once put
               twenty-eight rows on the page before anybody had chosen one. -->
          <details>
            <summary>
              <span class="num">{String(index + 1).padStart(2,'0')}</span>
              <span class="name"><b>{chapter[0]}</b><em>{chapter[1]}</em></span>
              <span class="meta">{part.length} parts</span>
            </summary>
            <ul class="parts">
              {#each part as session}
                <li><a href={`${volume.bookHref}&chapter=${index + 1}&session=${session.n}`}>{session.n}. {session.title}<em>{minutes(session.minutes)}</em></a></li>
              {/each}
              <li><a class="read" href={`${volume.bookHref}&chapter=${index + 1}&session=1`}>Read the chapter <span aria-hidden="true">→</span></a></li>
            </ul>
          </details>
        {:else}
          <div class="row">
            <span class="num">{String(index + 1).padStart(2,'0')}</span>
            <span class="name"><b>{chapter[0]}</b><em>{chapter[1]}</em></span>
            <span class="meta">Not written yet</span>
          </div>
        {/if}
      </li>
    {/each}</ol>

    <section class="companion">
      <p>COMPANION GAME · {volume.game.state}</p>
      <h3>{volume.game.title}</h3>
      <span>{volume.game.description}</span>
      <a href={volume.game.href}>{selected === 'shared' ? 'Play the connected draft' : 'Open the game plan'} <span aria-hidden="true">→</span></a>
    </section>

    <p class="outcome">{selected === 'shared'
      ? 'This volume prevents learners from entering a role path with hidden gaps in maths, data, SQL, Python or communication.'
      : volume.outcome}{#if selected !== 'shared'} Begins after Volume 0 · Shared Foundations.{/if}</p>
  </main>

  <p class="rule">Everyone completes Volume 0, then a role foundation, then deeper projects. Every chapter: explain one idea · show one worked example · ask one focused question · recall it later.</p>

  <SiteFooter />
</section>

<style>
  /* Minimalist pass. One accent, one surface, one rule colour, four type
     sizes. The page scrolls as a document: the previous version scrolled
     inside .library, so document.scrollHeight stayed at the viewport height
     and the rest of the contents was reachable only by a nested scrollbar. */
  :global(.qubix-university){height:auto!important;overflow:visible!important}
  :global(html),:global(body),:global(#app){height:auto!important;min-height:100%;overflow:auto!important;background:#f4f1ea}
  :global(body){position:static}

  .library{--rule:#ddd6c6;--ink:#241f16;--soft:#6d6558;
           min-height:100vh;max-width:none;padding:0 clamp(16px,5vw,40px) 72px;
           background:#f4f1ea;color:var(--ink)}
  .library>*{max-width:820px;margin-inline:auto}

  header{padding:64px 0 26px}
  header p{margin:0 0 14px;color:var(--volume);font:800 12px var(--qx-font);letter-spacing:.14em}
  header h1{margin:0;font:400 clamp(34px,5.4vw,52px)/1.08 Georgia,serif;letter-spacing:-.02em;text-wrap:balance}
  header span{display:block;margin-top:14px;color:var(--soft);font:400 16px/1.6 var(--qx-font)}

  .start{padding:26px 0 30px;border-top:1px solid var(--rule);border-bottom:1px solid var(--rule);
         display:grid;gap:18px}
  .start h2{margin:0;font:400 24px Georgia,serif}
  .start>div>span{display:block;margin-top:6px;color:var(--soft);font:400 15px/1.55 var(--qx-font)}
  .start-actions{display:flex;align-items:center;gap:20px;flex-wrap:wrap}
  a.primary{display:inline-block;padding:12px 22px;border-radius:6px;background:var(--volume);color:#fff;
            text-decoration:none;font:600 15px var(--qx-font);white-space:nowrap}
  a.primary:hover{background:var(--ink)}
  .start-actions>a:not(.primary){color:var(--soft);font:500 15px var(--qx-font);text-decoration:none;border-bottom:1px solid var(--rule);padding-bottom:2px}
  .start-actions>a:not(.primary):hover{color:var(--ink);border-color:var(--ink)}

  details summary{cursor:pointer;min-height:24px;list-style:none}
  details summary::-webkit-details-marker{display:none}
  .all-missions>summary{color:var(--soft);font:500 15px var(--qx-font)}
  .all-missions>summary::before{content:'+ ';color:var(--volume)}
  .all-missions[open]>summary::before{content:'– '}
  .all-missions ol{list-style:none;margin:16px 0 0;padding:0;display:grid;gap:1px;background:var(--rule);border:1px solid var(--rule)}
  .all-missions li{background:#f4f1ea}
  .all-missions a{display:flex;align-items:baseline;gap:14px;padding:11px 14px;color:var(--ink);text-decoration:none;font:400 15px var(--qx-font)}
  .all-missions a:hover{background:#fff}
  .all-missions b{color:var(--soft);font:500 14px var(--qx-font);font-variant-numeric:tabular-nums}
  .all-missions span{flex:1;min-width:0}
  .all-missions em{color:var(--soft);font:500 14px var(--qx-font);font-style:normal}

  nav{display:flex;gap:14px 24px;padding:22px 0;flex-wrap:wrap}
  nav button{padding:0 0 6px;border:0;border-bottom:2px solid transparent;background:none;color:var(--soft);
             font:500 15px var(--qx-font);white-space:nowrap;cursor:pointer}
  nav button.active{color:var(--ink);border-bottom-color:var(--volume)}
  nav button:hover{color:var(--ink)}
  nav button:focus-visible,a:focus-visible,summary:focus-visible{outline:2px solid var(--volume);outline-offset:3px}

  .volume-head{padding:34px 0 22px;display:flex;align-items:flex-end;justify-content:space-between;gap:24px;flex-wrap:wrap}
  .volume-head p{margin:0 0 10px;color:var(--volume);font:700 12px var(--qx-font);letter-spacing:.12em}
  .volume-head h2{margin:0;font:400 32px Georgia,serif;letter-spacing:-.015em}
  .volume-head span{display:block;margin-top:8px;max-width:46ch;color:var(--soft);font:400 15px/1.55 var(--qx-font)}

  ol.contents{list-style:none;margin:0;padding:0;border-top:1px solid var(--rule)}
  ol.contents>li{border-bottom:1px solid var(--rule)}
  ol.contents>li.planned{color:var(--soft)}
  summary,.row{display:grid;grid-template-columns:34px 1fr auto;align-items:baseline;gap:16px;padding:18px 0}
  summary:hover .name b{color:var(--volume)}
  .num{color:var(--soft);font:500 14px var(--qx-font);font-variant-numeric:tabular-nums}
  .name b{display:block;font:400 19px Georgia,serif}
  .name em{display:block;margin-top:5px;color:var(--soft);font:400 14.5px/1.5 var(--qx-font);font-style:normal}
  .meta{color:var(--soft);font:500 14px var(--qx-font);white-space:nowrap}
  details[open] .meta::after{content:' ▾'}

  ul.parts{list-style:none;margin:0 0 20px;padding:0 0 0 50px;display:grid;gap:1px}
  ul.parts a{display:flex;align-items:baseline;justify-content:space-between;gap:16px;padding:10px 0;
             color:var(--ink);text-decoration:none;font:400 15px var(--qx-font);border-bottom:1px solid var(--rule)}
  ul.parts a:hover{color:var(--volume)}
  ul.parts em{color:var(--soft);font:500 14px var(--qx-font);font-style:normal;white-space:nowrap}
  ul.parts a.read{color:var(--volume);font-weight:600;border-bottom:0}

  .companion{margin-top:38px;padding:24px 0;border-top:1px solid var(--rule);border-bottom:1px solid var(--rule)}
  .companion p{margin:0 0 10px;color:var(--volume);font:700 12px var(--qx-font);letter-spacing:.12em}
  .companion h3{margin:0;font:400 22px Georgia,serif}
  .companion span{display:block;margin-top:8px;max-width:56ch;color:var(--soft);font:400 15px/1.55 var(--qx-font)}
  .companion a{display:inline-block;margin-top:14px;color:var(--volume);font:600 15px var(--qx-font);text-decoration:none;border-bottom:1px solid currentColor;padding-bottom:2px;white-space:nowrap}

  .outcome{margin:24px 0 0;max-width:62ch;color:var(--soft);font:400 15px/1.6 var(--qx-font)}

  .rule{margin:34px 0 0;max-width:70ch;color:var(--soft);font:400 14px/1.6 var(--qx-font)}
  /* The shared nav and site map take their colours from the volume in view. */
  .library{--nav-ink:var(--ink);--nav-soft:var(--soft);--nav-rule:var(--rule);--nav-accent:var(--volume)}

  @media(max-width:620px){
    header{padding:40px 0 20px}
    summary,.row{grid-template-columns:28px 1fr;row-gap:8px}
    .meta{grid-column:2}
    ul.parts{padding-left:28px}
    .volume-head{align-items:flex-start}
  }
</style>
