<script>
  // The landing page, rebuilt around a beginner who has never seen the site.
  //
  // The old page asked "reading or doing?" before saying what either was, then
  // gave five volume tabs equal weight when four of them have nothing behind
  // them, and listed the same twelve missions in three places. A newcomer had to
  // make a choice before being told what they were choosing between.
  //
  // So: the map first (where Volume 0 sits, and honestly what exists), then four
  // shelves for the four real things. Everything else lives inside the shelf it
  // belongs to rather than competing on the front page, and the role volumes
  // keep their planned chapters, marked as unwritten rather than quietly implied
  // to be ready.
  import { partsForChapter, writtenChapters, volumeMinutes } from '../lib/content/shared-foundations.js';
  import { MISSIONS, TOTAL_XP, RANKS } from '../lib/game/progress.js';
  import SiteNav from '../lib/components/SiteNav.svelte';
  import SiteFooter from '../lib/components/SiteFooter.svelte';

  const CHAPTERS = [
    ['What data represents', 'Observations, variables, records, tables and how data describes part of the world.'],
    ['Numbers, ratios and change', 'Arithmetic, percentages, rates, units, algebra, functions and graphs.'],
    ['Quality and evidence', 'Missing values, valid types, grain, keys, duplicates, provenance and uncertainty.'],
    ['Statistics before models', 'Distributions, centre, spread, variation, sampling and the language of probability.'],
    ['SQL foundations', 'Select, filter, group, join and check the grain of a result.'],
    ['Python foundations', 'Values, variables, conditions, loops, functions, collections and working with tabular data.'],
    ['Explain what you found', 'Clear tables, charts, written reasoning, reproducibility and responsible communication.']
  ];

  // The role volumes. Their chapters are planned and described, and nothing is
  // written, so every one of them says so rather than looking available.
  const ROLES = [
    {
      id: 'analyst', number: 'I', title: 'Analyst', colour: '#a85a34',
      subtitle: 'Turn trustworthy data into clear representations and decisions',
      outcome: 'Prepare for junior data, business-intelligence and operations analyst work.',
      game: { title: 'Analyst Decision Desk', href: '?mode=game&mission=role-game&role=analyst' },
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
      id: 'engineer', number: 'II', title: 'Data Engineer', colour: '#397f86',
      subtitle: 'Build reliable paths from source systems to usable data',
      outcome: 'Prepare for junior analytics-engineering and data-engineering study.',
      game: { title: 'Pipeline Control', href: '?mode=game&mission=role-game&role=engineer' },
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
      id: 'scientist', number: 'III', title: 'Data Scientist', colour: '#8b5e9b',
      subtitle: 'Use mathematics, code and evidence to study uncertain problems',
      outcome: 'Prepare for junior data-science study without skipping mathematical reasoning.',
      game: { title: 'Investigation Lab', href: '?mode=game&mission=role-game&role=scientist' },
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
      id: 'ml-engineer', number: 'IV', title: 'Machine Learning Engineer', colour: '#b9822f',
      subtitle: 'Turn validated models into dependable software systems',
      outcome: 'Prepare for ML-engineering study by combining mathematical, modelling and software foundations.',
      game: { title: 'Model Operations', href: '?mode=game&mission=role-game&role=ml-engineer' },
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

  const BOOKS = [
    ['What Data Is and Why People Use It', '/library/what-data-is.html', 'The idea of data, before any tool.'],
    ['What a Computer Program Does', '/library/what-a-program-does.html', 'What a machine is actually doing when it runs your instructions.'],
    ['Calculus From The Ground Up', '/library/functions.html', 'Functions and rates of change, built from nothing.'],
    ['The Big Sheet of Graphs', '/library/big-sheet-of-graphs.html', 'Every curve worth knowing, drawn and explained.']
  ];

  const minutes = m => (m < 60 ? `${m} min` : `${Math.floor(m / 60)} h ${String(m % 60).padStart(2, '0')} min`);
  const sessionsFor = i => partsForChapter(i + 1);
  const totalSessions = CHAPTERS.reduce((n, _, i) => n + sessionsFor(i).length, 0);
  const readingTime = minutes(volumeMinutes);
  const firstSessionTime = minutes(partsForChapter(1)[0].minutes);
  const finalRank = RANKS[RANKS.length - 1].title;

  // One shelf may be open at a time. Four expanded at once puts the whole site
  // back on the page, which is the thing this page is trying to stop doing.
  let open = '';
  const toggle = id => (open = open === id ? '' : id);
</script>

<svelte:head>
  <title>Qubix University</title>
  <meta name="description" content="Learn data science from zero: seven chapters, twelve missions inside a working store, and no assumed background." />
</svelte:head>

<section class="landing qx-shell">
  <div class="nav-wrap"><SiteNav /></div>

  <header>
    <p>QUBIX UNIVERSITY</p>
    <h1>Learn data science from zero.</h1>
    <span>No prior data, maths or programming experience is assumed. You read an idea, then use it inside a working store until it is yours.</span>
    <p class="free">No account needed, nothing to pay. Your progress saves on this device.</p>
  </header>

  <!-- The map. A beginner's first question is not "reading or doing", it is
       "what is this and where does it end", so that is answered before any
       choice is offered. -->
  <section class="map" aria-labelledby="map-heading">
    <p class="eyebrow" id="map-heading">WHERE THIS GOES</p>
    <ol class="journey">
      <li class="here">
        <b>Volume 0</b>
        <em>Shared Foundations. What every data role needs before specialising.</em>
        <span class="state on">Written · you are here</span>
      </li>
      <li>
        <b>A role</b>
        <em>Analyst, Data Engineer, Data Scientist or Machine Learning Engineer.</em>
        <span class="state">Planned</span>
      </li>
      <li>
        <b>Deeper projects</b>
        <em>Longer work that uses everything above it.</em>
        <span class="state">Planned</span>
      </li>
    </ol>
    <p class="orient">Start at the left. Volume 0 is {totalSessions} sessions of reading and {MISSIONS.length} missions, and finishing it earns the rank of {finalRank}.</p>
  </section>

  <!-- Four shelves for the four things that exist. Story mode, the role games
       and the mathematics pilot open from inside the shelf they belong to,
       rather than taking a slot of their own on the front page. -->
  <div class="shelf">
    <section class="unit" class:open={open === 'chapters'}>
      <button aria-expanded={open === 'chapters'} on:click={() => toggle('chapters')}>
        <span class="label">CHAPTERS</span>
        <b>Read the idea</b>
        <em>{CHAPTERS.length} chapters · {totalSessions} sessions · {readingTime}</em>
      </button>
      {#if open === 'chapters'}
        <div class="body">
          <ol class="rows">
            {#each CHAPTERS as [title, blurb], i}
              {@const parts = sessionsFor(i)}
              <li>
                <a href={`?mode=game&mission=shared-book&chapter=${i + 1}&session=1`}>
                  <span class="num">{String(i + 1).padStart(2, '0')}</span>
                  <span class="text"><b>{title}</b><em>{blurb}</em></span>
                  <span class="meta">{parts.length} parts</span>
                </a>
              </li>
            {/each}
          </ol>
          <a class="primary" href="?mode=game&mission=shared-book&chapter=1&session=1">Start chapter 01 · {firstSessionTime} <span aria-hidden="true">→</span></a>
        </div>
      {/if}
    </section>

    <section class="unit" class:open={open === 'missions'}>
      <button aria-expanded={open === 'missions'} on:click={() => toggle('missions')}>
        <span class="label">MISSIONS</span>
        <b>Use it in the store</b>
        <em>{MISSIONS.length} missions · {TOTAL_XP.toLocaleString()} XP · {RANKS.length} ranks</em>
      </button>
      {#if open === 'missions'}
        <div class="body">
          <ol class="rows compact">
            {#each MISSIONS as m, i}
              <li>
                <a href={`?mode=game&mission=${m.slug}`}>
                  <span class="num">{String(i + 1).padStart(2, '0')}</span>
                  <span class="text"><b>{m.mission.title}</b><em>{m.teaches}</em></span>
                  <span class="meta">{m.xp} XP</span>
                </a>
              </li>
            {/each}
          </ol>
          <div class="also">
            <a href="?mode=game">The academy · progress and ranks</a>
            <a href="?mode=game&mission=campaign">Story mode · the connected draft</a>
            <a href="?mode=game&mission=role-game">Role games · plans, not built yet</a>
          </div>
          <a class="primary" href="?mode=game&mission=checkout">Play mission 01 · no reading needed <span aria-hidden="true">→</span></a>
        </div>
      {/if}
    </section>

    <section class="unit" class:open={open === 'library'}>
      <button aria-expanded={open === 'library'} on:click={() => toggle('library')}>
        <span class="label">LIBRARY</span>
        <b>Standing references</b>
        <em>{BOOKS.length} books you can read in any order</em>
      </button>
      {#if open === 'library'}
        <div class="body">
          <ol class="rows">
            {#each BOOKS as [title, href, blurb], i}
              <li><a {href}><span class="num">{String(i + 1).padStart(2, '0')}</span><span class="text"><b>{title}</b><em>{blurb}</em></span></a></li>
            {/each}
          </ol>
          <div class="also">
            <a href="/library/index.html">The library shelf</a>
            <a href="/?prototype=variables-and-rates">Mathematics pilot · an experiment in progress</a>
          </div>
        </div>
      {/if}
    </section>

    <section class="unit" class:open={open === 'wiki'}>
      <button aria-expanded={open === 'wiki'} on:click={() => toggle('wiki')}>
        <span class="label">WIKI</span>
        <b>Look something up</b>
        <em>The whole curriculum, ordered by what it needs first</em>
      </button>
      {#if open === 'wiki'}
        <div class="body">
          <p class="plain">Every topic the university intends to teach, in the order its prerequisites allow. Use it to find where a term you have met sits, and what has to come before it.</p>
          <a class="primary" href="?mode=wiki">Open the wiki <span aria-hidden="true">→</span></a>
        </div>
      {/if}
    </section>
  </div>

  <!-- Kept, and marked. These are real plans with described chapters, and none
       of them is written, so the strip says so on every row. -->
  <section class="after" aria-labelledby="after-heading">
    <p class="eyebrow" id="after-heading">WHAT COMES AFTER VOLUME 0</p>
    <p class="orient">Four role volumes, {ROLES.length * 7} chapters planned and described. None is written yet. Volume 0 is the prerequisite for all of them.</p>
    <ol class="volumes">
      {#each ROLES as role}
        <li style={`--role:${role.colour}`}>
          <details>
            <summary>
              <span class="vol">Volume {role.number}</span>
              <span class="text"><b>{role.title}</b><em>{role.subtitle}</em></span>
              <span class="state">Not written yet</span>
            </summary>
            <div class="plan">
              <ol>{#each role.chapters as [title, blurb], i}
                <li><span>{String(i + 1).padStart(2, '0')}</span><b>{title}</b><em>{blurb}</em></li>
              {/each}</ol>
              <p class="outcome">{role.outcome}</p>
              <a href={role.game.href}>{role.game.title} · read the game plan <span aria-hidden="true">→</span></a>
            </div>
          </details>
        </li>
      {/each}
    </ol>
  </section>

  <p class="rule">Every board here is an AI draft under founder review. {writtenChapters} of {CHAPTERS.length} Volume 0 chapters are written.</p>

  <div class="foot-wrap"><SiteFooter compact /></div>
</section>

<style>
  /* The page scrolls as a document. An earlier version scrolled inside its own
     container, so document.scrollHeight stayed at the viewport height and the
     rest of the page was reachable only by a nested scrollbar. */
  :global(.qubix-university){height:auto!important;overflow:visible!important}
  :global(html),:global(body),:global(#app){height:auto!important;min-height:100%;overflow:visible!important;background:#f1ede4}
  :global(body){position:static}

  .landing{--rule:#ddd6c6;--ink:#241f16;--soft:#6d6558;--accent:#5f7355;
           min-height:100vh;max-width:none;padding:0 clamp(16px,5vw,40px) 72px;
           background:#f1ede4;color:var(--ink)}
  .landing>*{max-width:860px;margin-inline:auto}

  header{padding:60px 0 30px}
  header p{margin:0 0 14px;color:var(--accent);font:800 12px var(--qx-font);letter-spacing:.14em}
  header h1{margin:0;font:400 clamp(34px,5.4vw,52px)/1.08 Georgia,serif;letter-spacing:-.02em;text-wrap:balance}
  header span{display:block;margin-top:16px;max-width:62ch;color:var(--soft);font:400 16px/1.6 var(--qx-font)}
  .free{margin:14px 0 0;color:var(--accent);font:600 14.5px var(--qx-font)}

  .eyebrow{margin:0 0 14px;color:var(--accent);font:800 11px var(--qx-font);letter-spacing:.13em}
  .orient{margin:0;max-width:70ch;color:var(--soft);font:400 14.5px/1.6 var(--qx-font)}

  /* The map. Three stops, the first marked as the one you are standing on. */
  .map{padding:26px 0 4px;border-top:1px solid var(--rule)}
  .journey{list-style:none;margin:0 0 18px;padding:0;display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:0}
  .journey li{position:relative;padding:26px 16px 0 0}
  .journey li::before{content:'';position:absolute;top:7px;left:0;width:11px;height:11px;border-radius:50%;
                      border:2px solid var(--rule);background:#f1ede4}
  .journey li::after{content:'';position:absolute;top:12px;left:11px;right:0;height:1px;background:var(--rule)}
  .journey li:last-child::after{display:none}
  .journey li.here::before{border-color:var(--accent);background:var(--accent)}
  .journey b{display:block;font:400 19px Georgia,serif}
  .journey em{display:block;margin-top:5px;color:var(--soft);font:400 14px/1.5 var(--qx-font);font-style:normal}
  .journey .state{display:inline-block;margin-top:9px;color:var(--soft);font:700 11px var(--qx-font);letter-spacing:.07em;text-transform:uppercase}
  .journey .state.on{color:var(--accent)}

  /* Four shelves. Only one opens at a time. */
  .shelf{margin-top:30px;border-top:1px solid var(--rule)}
  .unit{border-bottom:1px solid var(--rule)}
  .unit>button{display:grid;grid-template-columns:110px 1fr;align-items:baseline;gap:6px 18px;
               width:100%;padding:22px 0;border:0;background:none;color:inherit;text-align:left;cursor:pointer}
  .unit>button:hover b{color:var(--accent)}
  .unit .label{grid-row:span 2;color:var(--soft);font:800 11px var(--qx-font);letter-spacing:.12em;padding-top:4px}
  .unit>button b{font:400 23px Georgia,serif}
  .unit>button em{color:var(--soft);font:400 14px var(--qx-font);font-style:normal}
  .unit>button::after{content:'+';position:absolute;right:0;color:var(--soft);font:400 20px var(--qx-font)}
  .unit{position:relative}
  .unit.open>button::after{content:'\2013'}
  .unit .body{padding:0 0 26px}

  .rows{list-style:none;margin:0;padding:0;border-top:1px solid var(--rule)}
  .rows li{border-bottom:1px solid var(--rule)}
  .rows a{display:grid;grid-template-columns:34px 1fr auto;align-items:baseline;gap:16px;
          padding:14px 0;color:var(--ink);text-decoration:none}
  .rows.compact a{padding:11px 0}
  .rows a:hover .text b{color:var(--accent)}
  .num{color:var(--soft);font:500 13px var(--qx-font);font-variant-numeric:tabular-nums}
  .text b{display:block;font:400 17px Georgia,serif}
  .text em{display:block;margin-top:4px;color:var(--soft);font:400 13.5px/1.5 var(--qx-font);font-style:normal}
  .meta{color:var(--soft);font:500 13px var(--qx-font);white-space:nowrap}

  .also{display:grid;gap:9px;margin-top:18px;padding-top:16px;border-top:1px solid var(--rule)}
  .also a{color:var(--soft);font:500 14px var(--qx-font);text-decoration:none;width:max-content;
          border-bottom:1px solid var(--rule);padding-bottom:2px}
  .also a:hover{color:var(--ink);border-color:var(--ink)}
  .plain{margin:0;max-width:66ch;color:var(--soft);font:400 14.5px/1.6 var(--qx-font)}

  a.primary{display:inline-flex;align-items:baseline;gap:.45em;width:max-content;margin-top:20px;
            padding:12px 20px;border-radius:7px;background:var(--accent);color:#fff;
            font:600 14.5px var(--qx-font);text-decoration:none}
  a.primary:hover{background:#4e6046}

  /* The role volumes: present, described, and openly unwritten. */
  .after{padding:36px 0 0}
  .volumes{list-style:none;margin:20px 0 0;padding:0;border-top:1px solid var(--rule)}
  .volumes>li{border-bottom:1px solid var(--rule)}
  .volumes summary{display:grid;grid-template-columns:88px 1fr auto;align-items:baseline;gap:16px;
                   padding:16px 0;cursor:pointer;list-style:none}
  .volumes summary::-webkit-details-marker{display:none}
  .volumes summary:hover .text b{color:var(--role)}
  .vol{color:var(--role);font:700 12px var(--qx-font);letter-spacing:.06em;white-space:nowrap}
  .volumes .state{color:var(--soft);font:500 12px var(--qx-font);white-space:nowrap}
  .plan{padding:4px 0 22px}
  .plan>ol{list-style:none;margin:0;padding:0;display:grid;gap:11px}
  .plan>ol li{display:grid;grid-template-columns:34px 1fr;gap:16px;align-items:baseline}
  .plan>ol span{color:var(--soft);font:500 13px var(--qx-font);font-variant-numeric:tabular-nums}
  .plan>ol b{font:400 16px Georgia,serif}
  .plan>ol em{display:block;margin-top:3px;color:var(--soft);font:400 13.5px/1.5 var(--qx-font);font-style:normal}
  .plan .outcome{margin:18px 0 0;max-width:70ch;color:var(--soft);font:400 14px/1.55 var(--qx-font)}
  .plan>a{display:inline-block;margin-top:14px;color:var(--role);font:600 14px var(--qx-font);
          text-decoration:none;border-bottom:1px solid currentColor;padding-bottom:2px}

  .nav-wrap,  .foot-wrap{max-width:860px;margin-inline:auto}
  .rule{margin:44px auto 0;padding-top:22px;border-top:1px solid var(--rule);
        color:var(--soft);font:400 13.5px/1.6 var(--qx-font)}

  button:focus-visible,a:focus-visible,summary:focus-visible{outline:2px solid var(--accent);outline-offset:3px}

  @media (max-width:760px){
    .journey{grid-template-columns:1fr;gap:4px}
    .journey li{padding:0 0 0 24px}
    .journey li::before{top:5px}
    .journey li::after{top:16px;left:5px;right:auto;bottom:-4px;width:1px;height:auto}
    .unit>button{grid-template-columns:1fr;gap:4px}
    .unit .label{grid-row:auto}
    .rows a,.volumes summary{grid-template-columns:28px 1fr;row-gap:6px}
    .rows .meta,.volumes .state{grid-column:2}
    .volumes summary{grid-template-columns:1fr}
  }
</style>
