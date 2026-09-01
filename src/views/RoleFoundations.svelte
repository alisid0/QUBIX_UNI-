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
  import { SHARED_FOUNDATIONS, partsForChapter, writtenChapters, volumeMinutes, volumeStudyMinutes,
    volumePlayMinutes, volumeSessions } from '../lib/content/shared-foundations.js';
  import { MISSIONS, TOTAL_XP, RANKS } from '../lib/game/progress.js';
  import { ROOMS } from '../lib/game/store-map.js';
  import SiteNav from '../lib/components/SiteNav.svelte';
  import SiteFooter from '../lib/components/SiteFooter.svelte';
  import WorkshopAssistant from '../lib/components/WorkshopAssistant.svelte';
  import { HOME_ASSISTANT } from '../lib/content/home-assistant.js';

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

  // The floor was five rooms of hardcoded HTML with hand-tuned insets, beside a
  // label claiming nine. It reads the real room list now, so the picture and the
  // count cannot disagree, and every card opens that room on the floor plan.
  const startRoom = ROOMS.find(r => r.spots.some(sp => sp.slug === MISSIONS[0].slug));
  const floorRooms = ROOMS.filter(r => r.spots.length || r.planned);
  const minutes = m => (m < 60 ? `${m} min` : `${Math.floor(m / 60)} h ${String(m % 60).padStart(2, '0')} min`);
  const sessionsFor = i => partsForChapter(i + 1);
  // The two halves, quoted apart. Every session declares reading minutes and
  // doing minutes; only their sum was ever shown, which told a newcomer how
  // long the whole thing takes without saying what kind of time it is.
  const readingTime = minutes(volumeStudyMinutes);
  const doingTime = minutes(volumePlayMinutes);
  const bothTime = minutes(volumeMinutes);
  // Chapters that send you to a mission written for them, rather than one
  // borrowed from elsewhere. Derived, because a hardcoded count drifts silently:
  // this one was written as 4 and was really 6, and working it out found that
  // the Analyst Decision Desk names chapter 07 session 03 as its home while that
  // session was linking somewhere else entirely.
  const ownGames = SHARED_FOUNDATIONS.filter(({ chapter, book }) =>
    book.sessions.some(s => {
      const slug = (s.practice.href.match(/mission=([a-z-]+)/) || [])[1];
      return slug && MISSIONS.some(m => m.slug === slug && m.reading?.chapter === chapter);
    })).length;
  const firstSessionTime = minutes(partsForChapter(1)[0].minutes);

  const STARTS = Object.freeze([
    Object.freeze({
      key: 'DATA', tone: 'rust', kicker: 'Best first step', title: 'New to data?',
      text: 'Learn what a row, column and record actually mean before touching a tool.',
      action: 'Start from zero', href: '/learn/data-foundations/chapter/1/session/1'
    }),
    Object.freeze({
      key: 'SQL', tone: 'green', kicker: 'Run real queries', title: 'Curious about SQL?',
      text: 'Ask a real Superstore database a question and see the rows change.',
      action: 'Open the SQL sandbox', href: '/tools/data-console'
    }),
    Object.freeze({
      key: 'PY', tone: 'blue', kicker: 'Read code calmly', title: 'Want to learn Python?',
      text: 'Begin with values, names and types—no coding experience assumed.',
      action: 'Start the Python briefing', href: '/learn/data-foundations/chapter/6/session/1'
    }),
    Object.freeze({
      key: 'STATS', tone: 'purple', kicker: 'Think before models', title: 'Here for statistics?',
      text: 'Look at distributions and variation before trusting a single average.',
      action: 'Explore statistics', href: '/learn/data-foundations/chapter/4/session/1'
    })
  ]);
</script>

<svelte:head>
  <title>Qubix University</title>
  <meta name="description" content={`Learn data science from zero through seven short chapters and ${MISSIONS.length} practical missions inside Qubix Superstore.`} />
</svelte:head>

<section class="landing qx-shell">
  <div class="nav-wrap"><SiteNav subjects={false} /></div>

  <header class="hero">
    <div class="hero-copy">
      <p>NO EXPERIENCE NEEDED · START WHERE YOU ARE</p>
      <h1>Learn data science by doing the work.</h1>
      <span>Short briefings explain the idea. Practical missions let you use it inside Qubix
        Superstore. Build confidence from your first table to SQL, Python, statistics and clear decisions.</span>
      <div class="hero-actions">
        <a class="clock-in" href="/learn/data-foundations/chapter/1/session/1">Start the guided path <span aria-hidden="true">→</span></a>
        <a class="quiet-action" href="#choose-your-start">Choose a topic</a>
      </div>
      <p class="free"><span>✓ Free to begin</span><span>✓ No account needed</span><span>✓ Progress saves here</span></p>
    </div>

    <aside class="briefing" aria-labelledby="briefing-title">
      <div class="briefing-top"><span>SHIFT BRIEFING · 001</span><b>{firstSessionTime}</b></div>
      <p>CHAPTER 01 · DATA FOUNDATIONS</p>
      <h2 id="briefing-title">Data is a record, not reality.</h2>
      <span>A customer buys a lamp. Which details become evidence—and which disappear?</span>
      <div class="task"><b>YOUR TASK</b><span>Inspect the checkout record and decide what the store can honestly claim.</span></div>
      <a href="/learn/data-foundations/chapter/1/session/1">Open your first briefing <span aria-hidden="true">→</span></a>
    </aside>
  </header>

  <section class="starter" id="choose-your-start" aria-labelledby="starter-heading">
    <div class="starter-heading">
      <div><p class="eyebrow">CHOOSE YOUR WAY IN</p><h2 id="starter-heading">Curious about one skill? Start there.</h2></div>
      <p>You can explore a topic now or follow the complete path from the beginning. There is no wrong door.</p>
    </div>
    <div class="starter-grid">
      {#each STARTS as item}
        <a class={`starter-card ${item.tone}`} href={item.href}>
          <div class="starter-top"><span>{item.key}</span><em>{item.kicker}</em></div>
          <h3>{item.title}</h3><p>{item.text}</p>
          <b>{item.action} <span aria-hidden="true">→</span></b>
        </a>
      {/each}
    </div>
  </section>

  <section class="floor" id="training-floor" aria-labelledby="floor-heading">
    <div class="floor-heading">
      <div><p class="eyebrow">THE TRAINING FLOOR</p><h2 id="floor-heading">Every concept has a room and a consequence.</h2></div>
      <span>{MISSIONS.length} MISSIONS · {floorRooms.length} ROOMS · {RANKS.length} RANKS</span>
    </div>
    <div class="floor-map">
      {#each floorRooms as r}
        <a class="room" class:start={r.id === startRoom?.id} class:planned={r.planned}
           href={`?mode=game&mission=store&room=${r.id}`}>
          <img class="shot" src={`/rooms/${r.id}-thumb.webp`} alt="" loading="lazy" decoding="async" />
          <span class="body">
            <b>{r.name}</b>
            <small>{r.planned ? "Planned, not built yet" : r.blurb}</small>
            {#if r.spots.length}<em>{r.spots.length} mission{r.spots.length > 1 ? "s" : ""}</em>{/if}
          </span>
          {#if r.id === startRoom?.id}<span class="you-are-here">YOU START HERE</span>{/if}
        </a>
      {/each}
    </div>
  </section>

  <section class="method" aria-label="How Qubix teaches">
    <article><b>01</b><div><h3>Read the briefing</h3><span>One focused idea in plain language.</span></div></article>
    <article><b>02</b><div><h3>Work the mission</h3><span>Apply it to realistic Superstore evidence.</span></div></article>
    <article><b>03</b><div><h3>Explain the cost</h3><span>Show what the result can and cannot support.</span></div></article>
  </section>

  <section class="premise" aria-labelledby="premise-heading">
    <p class="eyebrow" id="premise-heading">THE COMPLETE FOUNDATION</p>
    <h2>Reading and missions stay together.</h2>
    <p class="lede">Every session gives you something to understand and something to do with it.
      Nothing is timed and nothing expires.</p>
    <div class="halves">
      <article class="half"><p class="tag">BRIEFINGS</p><h3>{volumeSessions} reading sessions</h3><p>Written explanations, worked examples and one focused check.</p><dl><div><dt>Total reading time</dt><dd>{readingTime}</dd></div><div><dt>First briefing</dt><dd>{firstSessionTime}</dd></div></dl></article>
      <article class="half"><p class="tag">MISSIONS</p><h3>{MISSIONS.length} practical investigations</h3><p>Make decisions inside Qubix Superstore and see what each mistake costs.</p><dl><div><dt>Total mission time</dt><dd>{doingTime}</dd></div><div><dt>Earn</dt><dd>{TOTAL_XP.toLocaleString()} XP · {RANKS.length} ranks</dd></div></dl></article>
    </div>
    <p class="together"><b>Complete path: {bothTime}</b><span>One session a day is about a month; focused learners can finish sooner.</span></p>
  </section>

  <!-- What you will actually be able to do, chapter by chapter. -->
  <section class="learn" aria-labelledby="learn-heading">
    <p class="eyebrow" id="learn-heading">WHAT YOU WILL LEARN</p>
    <ol class="subjects">
      {#each CHAPTERS as [title, blurb], i}
        {@const parts = sessionsFor(i)}
        <li>
          <a href={`?mode=game&mission=shared-book&chapter=${i + 1}&session=1`}>
            <span class="num">{String(i + 1).padStart(2, '0')}</span>
            <span class="text"><b>{title}</b><em>{blurb}</em></span>
            <span class="meta">{parts.length} sessions</span>
          </a>
        </li>
      {/each}
    </ol>
  </section>

  <!-- Where the course actually stands. Written plainly, including the parts
       that are not built, because the alternative is a learner finding out. -->
  <section class="stands" aria-labelledby="stands-heading">
    <p class="eyebrow" id="stands-heading">WHERE THE COURSE STANDS TODAY</p>
    <ul class="stats">
      <li><b>{writtenChapters} of {CHAPTERS.length}</b><span>Volume 0 chapters written</span></li>
      <li><b>{volumeSessions}</b><span>reading sessions</span></li>
      <li><b>{MISSIONS.length}</b><span>missions playable</span></li>
      <li><b>{ownGames} of {CHAPTERS.length}</b><span>chapters with their own game</span></li>
    </ul>
    <p class="honest">Volume 0 is complete and playable end to end. The four role volumes after it are
      planned and described but not written, and three of their games are plans rather than games.
      Everything here is an AI draft under founder review.</p>
    <div class="also-row">
      <!-- Only what the nav above does not already carry. Play, Library, Wiki
           and Mathematics live there, and repeating them here put the same four
           destinations on one screen twice. -->
      <a href="?mode=game&mission=store">The Superstore floor · every mission in its room</a>
      <a href="?mode=game&mission=campaign">Story mode · the connected draft</a>
    </div>
  </section>

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

  <section class="final-cta" aria-labelledby="final-cta-heading">
    <div><p class="eyebrow">YOUR FIRST 12 MINUTES</p><h2 id="final-cta-heading">One briefing. One decision. Start there.</h2><p>You do not need to choose a career path or know a tool before beginning.</p></div>
    <div class="final-actions"><a href="/learn/data-foundations/chapter/1/session/1">Begin the first briefing <span aria-hidden="true">→</span></a><a href="/tools/data-console">Or explore SQL</a></div>
  </section>


  <div class="foot-wrap"><SiteFooter compact /></div>

  <!-- The front door. Production serves this view at /, not Home.svelte, so
       this is the screen a newcomer actually meets. Wayfinding only. -->
  <WorkshopAssistant spec={HOME_ASSISTANT} />
</section>

<style>
  /* The page scrolls as a document. An earlier version scrolled inside its own
     container, so document.scrollHeight stayed at the viewport height and the
     rest of the page was reachable only by a nested scrollbar. */
  :global(.qubix-university){height:auto!important;overflow:visible!important}
  :global(html),:global(body),:global(#app){height:auto!important;min-height:100%;overflow:visible!important;background:#f1ede4}
  :global(body){position:static}

  .landing{--rule:#c8c1b1;--ink:#20241f;--soft:#62695f;--accent:#315f48;--signal:#b85530;--panel:#fbf8f1;
           min-height:100vh;max-width:none;padding:0 0 72px;background:#e9e3d7;color:var(--ink)}
  .landing>*{max-width:1160px;margin-inline:auto}
  .nav-wrap{padding-inline:clamp(16px,5vw,56px)}
  .learn,.stands,.after,.foot-wrap{max-width:860px;padding-inline:clamp(16px,4vw,32px)}

  .hero{position:relative;display:grid;grid-template-columns:minmax(0,1fr) minmax(310px,.72fr);gap:7%;overflow:hidden;
        padding:76px clamp(20px,5vw,64px) 70px;border:1px solid var(--rule);border-radius:0 0 30px 30px;
        background:radial-gradient(circle at 12% 12%,rgba(255,255,255,.86),transparent 32%),
                   radial-gradient(circle at 86% 20%,rgba(184,85,48,.13),transparent 28%),
                   linear-gradient(rgba(93,91,78,.065) 1px,transparent 1px),linear-gradient(90deg,rgba(93,91,78,.065) 1px,transparent 1px),#eee8dc;
        background-size:auto,auto,28px 28px,28px 28px,auto}
  .hero-copy{align-self:center}
  .hero-copy>p:first-child{margin:0 0 16.5px;color:var(--signal);font:800 11.5px var(--qx-font);letter-spacing:.17em}
  .hero-copy h1{max-width:670px;margin:0;font:400 clamp(42px,5.4vw,66px)/.98 Georgia,serif;letter-spacing:-.045em;text-wrap:balance}
  .hero-copy>span{display:block;margin-top:22px;max-width:59ch;color:var(--soft);font:400 16.5px/1.65 var(--qx-font)}
  .hero-actions{display:flex;flex-wrap:wrap;gap:11.5px;margin-top:28px}
  .hero-actions a{display:inline-flex;align-items:center;justify-content:center;gap:14px;min-height:52px;padding:0 21px;border-radius:12px;color:var(--ink);font:800 14px var(--qx-font);text-decoration:none;transition:transform .18s ease,box-shadow .18s ease,background .18s ease}
  .hero-actions a:hover{transform:translateY(-2px)}
  .hero-actions .clock-in{background:var(--signal);color:#fff;box-shadow:0 8px 20px rgba(139,58,29,.19)}
  .hero-actions .clock-in:hover{box-shadow:0 12px 25px rgba(139,58,29,.25)}
  .hero-actions .quiet-action{border:1px solid var(--rule);background:rgba(251,248,241,.78)}
  .free{display:flex;flex-wrap:wrap;gap:8px 17px;margin:17px 0 0;color:var(--soft);font:650 11.5px var(--qx-font);letter-spacing:.02em}.free span{white-space:nowrap}

  .briefing{align-self:center;padding:25px;border:4px solid var(--ink);border-radius:18px;background:var(--panel);box-shadow:12px 14px 0 rgba(32,36,31,.14)}
  .briefing-top{display:flex;justify-content:space-between;gap:13px;color:var(--accent);font:800 11.5px var(--qx-font);letter-spacing:.12em}
  .briefing>p{margin:27px 0 0;color:var(--soft);font:600 11.5px var(--qx-font);letter-spacing:.1em}
  .briefing h2{margin:11px 0 0;font:400 30px/1.06 Georgia,serif}
  .briefing>span{display:block;margin-top:15px;color:var(--soft);font:400 14px/1.55 var(--qx-font)}
  .task{margin-top:19px;padding:15px;border-left:3px solid var(--signal);border-radius:0 10px 10px 0;background:#eee5d8}
  .task b,.task span{display:block}.task b{color:var(--signal);font:800 11px var(--qx-font);letter-spacing:.12em}
  .task span{margin-top:5px;font:500 14px/1.5 var(--qx-font)}
  .briefing>a{display:flex;align-items:center;justify-content:space-between;min-height:48px;margin-top:19px;padding:0 16px;border-radius:10px;background:var(--ink);color:#f7f3e9;
              font:800 13px var(--qx-font);text-decoration:none;transition:background .18s ease,transform .18s ease}.briefing>a:hover{background:var(--accent);transform:translateY(-1px)}

  .starter{padding:58px clamp(20px,5vw,64px) 64px}.starter-heading{display:grid;grid-template-columns:minmax(0,1fr) minmax(260px,.58fr);gap:40px;align-items:end}.starter-heading h2{margin:0;font:400 clamp(30px,4vw,42px)/1.05 Georgia,serif;letter-spacing:-.025em;text-wrap:balance}.starter-heading>p{margin:0;color:var(--soft);font:500 15px/1.6 var(--qx-font)}
  .starter-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:13px;margin-top:29px}.starter-card{--card:#315f48;position:relative;display:flex;min-width:0;min-height:260px;flex-direction:column;padding:20px;border:1px solid rgba(32,36,31,.16);border-radius:17px;background:var(--panel);box-shadow:0 4px 0 rgba(32,36,31,.08);color:var(--ink);text-decoration:none;overflow:hidden;transition:transform .18s ease,box-shadow .18s ease,border-color .18s ease}.starter-card:before{content:"";position:absolute;inset:0 0 auto;height:6px;background:var(--card)}.starter-card:hover{transform:translateY(-5px);border-color:var(--card);box-shadow:0 14px 30px rgba(32,36,31,.12)}.starter-card.rust{--card:#b85530}.starter-card.blue{--card:#47745d}.starter-card.purple{--card:#9a713e}.starter-top{display:flex;align-items:center;justify-content:space-between;gap:10px}.starter-top>span{display:grid;place-items:center;min-width:50px;height:34px;padding:0 9px;border-radius:9px;background:color-mix(in srgb,var(--card) 13%,white);color:var(--card);font:900 11px var(--qx-font);letter-spacing:.08em}.starter-top em{color:var(--soft);font:750 11px var(--qx-font);font-style:normal;text-align:right}.starter-card h3{margin:28px 0 0;font:400 24px/1.05 Georgia,serif}.starter-card p{margin:10px 0 22px;color:var(--soft);font:500 14px/1.55 var(--qx-font)}.starter-card>b{display:flex;align-items:center;justify-content:space-between;margin-top:auto;color:var(--card);font:850 12.5px var(--qx-font)}

  .floor{padding:54px clamp(20px,5vw,64px) 62px;border:1px solid var(--rule);border-radius:28px;background:var(--panel);box-shadow:0 12px 35px rgba(32,36,31,.07)}
  .floor-heading{display:flex;align-items:end;justify-content:space-between;gap:24px}
  .floor-heading h2{margin:0;font:400 clamp(26px,3.1vw,34px)/1.1 Georgia,serif;text-wrap:balance}
  .floor-heading>span{color:var(--soft);font:700 11.5px var(--qx-font);letter-spacing:.11em;white-space:nowrap}
  .floor-map{display:grid;grid-template-columns:repeat(auto-fit,minmax(212px,1fr));gap:14px;margin-top:30px}
  .room{position:relative;display:flex;flex-direction:column;border:1px solid #cfc7b8;border-radius:15px;
        background:#f1ecdf;color:var(--ink);text-decoration:none;overflow:hidden;box-shadow:0 3px 0 rgba(32,36,31,.08);transition:transform .18s ease,box-shadow .18s ease,border-color .18s ease}
  .room:hover{transform:translateY(-4px);border-color:var(--signal);box-shadow:0 12px 23px rgba(32,36,31,.12)}
  .room .shot{display:block;width:100%;aspect-ratio:16/10;object-fit:cover;background:#ded8c8;transition:transform .25s ease}.room:hover .shot{transform:scale(1.025)}
  .room .body{display:grid;gap:5px;padding:11px 13px 13px}
  .room b{font:800 12.5px var(--qx-font);letter-spacing:.09em}
  .room small{color:var(--soft);font:500 13.5px/1.45 var(--qx-font)}
  .room em{color:var(--signal);font:700 12px var(--qx-font);font-style:normal}
  .room.start{border:2px solid var(--signal);background:#fff8ee}
  .room.planned .shot{opacity:.5}
  .you-are-here{position:absolute;top:9px;left:9px;padding:5px 10px;background:var(--signal);color:#fff;
                font:800 11px var(--qx-font);letter-spacing:.1em}

  .method{display:grid;grid-template-columns:repeat(3,1fr);margin-top:18px;border-radius:20px;background:var(--ink);color:#f3eee3;overflow:hidden;box-shadow:0 10px 24px rgba(32,36,31,.15)}
  .method article{display:flex;gap:15px;padding:22px clamp(18px,3vw,34px);border-right:1px solid rgba(243,238,227,.2)}
  .method article:last-child{border:0}.method article>b{color:#de7952;font:400 19px Georgia,serif}
  .method article div{display:grid;gap:5px}.method h3{margin:0;font:400 16.5px Georgia,serif}
  .method article span{color:#bcb8ad;font:400 13px/1.45 var(--qx-font)}

  .eyebrow{margin:0 0 15px;color:var(--accent);font:800 11.5px var(--qx-font);letter-spacing:.13em}
  .orient{margin:0;max-width:70ch;color:var(--soft);font:400 15.5px/1.6 var(--qx-font)}

  .num{color:var(--soft);font:500 15px var(--qx-font);font-variant-numeric:tabular-nums}
  .text b{display:block;font:400 17px Georgia,serif}
  .text em{display:block;margin-top:4px;color:var(--soft);font:400 15px/1.5 var(--qx-font);font-style:normal}
  .meta{color:var(--soft);font:500 15px var(--qx-font);white-space:nowrap}

  /* The role volumes: present, described, and openly unwritten. */
  .after{padding:54px 0 0}
  .volumes{list-style:none;display:grid;gap:10px;margin:22px 0 0;padding:0}
  .volumes>li{border:1px solid var(--rule);border-radius:13px;background:rgba(251,248,241,.55);overflow:hidden}
  .volumes summary{display:grid;grid-template-columns:88px 1fr auto;align-items:baseline;gap:16.5px;
                   min-height:66px;padding:14px 17px;cursor:pointer;list-style:none;transition:background .18s ease}
  .volumes summary::-webkit-details-marker{display:none}
  .volumes summary:hover{background:#fbf8f1}.volumes summary:hover .text b{color:var(--role)}
  .vol{color:var(--role);font:700 13px var(--qx-font);letter-spacing:.06em;white-space:nowrap}
  .volumes .state{color:var(--soft);font:500 13px var(--qx-font);white-space:nowrap}
  .plan{padding:8px 18px 22px;border-top:1px solid var(--rule);background:#fbf8f1}
  .plan>ol{list-style:none;margin:0;padding:0;display:grid;gap:11.5px}
  .plan>ol li{display:grid;grid-template-columns:34px 1fr;gap:16.5px;align-items:baseline}
  .plan>ol span{color:var(--soft);font:500 15px var(--qx-font);font-variant-numeric:tabular-nums}
  .plan>ol b{font:400 16.5px Georgia,serif}
  .plan>ol em{display:block;margin-top:3px;color:var(--soft);font:400 15px/1.5 var(--qx-font);font-style:normal}
  .plan .outcome{margin:19px 0 0;max-width:70ch;color:var(--soft);font:400 15px/1.55 var(--qx-font)}
  .plan>a{display:inline-block;margin-top:15px;color:var(--role);font:600 15px var(--qx-font);
          text-decoration:none;border-bottom:1px solid currentColor;padding-bottom:2px}

  .nav-wrap,.foot-wrap{margin-inline:auto}

  button:focus-visible,a:focus-visible,summary:focus-visible{outline:2px solid var(--accent);outline-offset:3px}
  /* The premise. One idea per block, in the order a newcomer asks them. */
  .premise{max-width:860px;margin-top:62px;padding:38px clamp(20px,4vw,38px);border:1px solid var(--rule);border-radius:22px;background:rgba(251,248,241,.62);box-shadow:0 8px 25px rgba(32,36,31,.055)}
  .premise h2{margin:0;font:400 clamp(23px,3.4vw,30px)/1.15 Georgia,serif;letter-spacing:-.015em;text-wrap:balance}
  .lede{margin:11.5px 0 0;max-width:66ch;color:var(--soft);font:400 16.5px/1.6 var(--qx-font)}
  .halves{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:15px;margin-top:24px}
  .half{padding:22px;border:1px solid var(--rule);border-radius:14px;background:#fbf8f1;box-shadow:0 3px 0 rgba(32,36,31,.05);
        display:flex;flex-direction:column;gap:11px}
  .tag{margin:0;color:var(--accent);font:900 13px var(--qx-font);letter-spacing:.14em}
  .half h3{margin:0;font:400 22px Georgia,serif}
  .half>p{margin:0;color:var(--soft);font:400 15px/1.55 var(--qx-font)}
  .half dl{margin:6px 0 0;display:grid;gap:7px;padding-top:13px;border-top:1px solid var(--rule)}
  .half dl div{display:flex;align-items:baseline;justify-content:space-between;gap:13px}
  .half dt{color:var(--soft);font:600 15px var(--qx-font)}
  .half dd{margin:0;color:var(--ink);font:800 15px var(--qx-font);font-variant-numeric:tabular-nums}
  .together{display:flex;align-items:baseline;gap:15px;flex-wrap:wrap;margin:20px 0 0;padding:15px 16.5px;
            border-radius:11.5px;background:var(--accent-soft, #efe8dc)}
  .together b{font:800 16.5px var(--qx-font);font-variant-numeric:tabular-nums}
  .together span{color:var(--soft);font:400 15px var(--qx-font)}

  .learn{padding:58px 0 0}
  .subjects{list-style:none;display:grid;gap:8px;margin:20px 0 0;padding:0}
  .subjects li{border:1px solid var(--rule);border-radius:11px;background:rgba(251,248,241,.5);overflow:hidden}
  .subjects a{display:grid;grid-template-columns:34px 1fr auto;align-items:baseline;gap:16.5px;
              padding:16px 18px;color:var(--ink);text-decoration:none;transition:background .18s ease,transform .18s ease}
  .subjects a:hover{background:#fbf8f1;transform:translateX(3px)}.subjects a:hover .text b{color:var(--accent)}

  .stands{padding:32px;border:1px solid var(--rule);border-radius:18px;margin-top:54px;background:rgba(49,95,72,.065)}
  .stats{list-style:none;display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:15px;margin:19px 0 0;padding:0}
  .stats li{display:flex;flex-direction:column;gap:3px}
  .stats b{font:400 27px Georgia,serif;font-variant-numeric:tabular-nums}
  .stats span{color:var(--soft);font:400 15px/1.4 var(--qx-font)}
  .honest{margin:20px 0 0;max-width:70ch;color:var(--soft);font:400 15px/1.6 var(--qx-font)}
  .also-row{display:flex;gap:19px;flex-wrap:wrap;margin-top:19px;padding-top:16.5px;border-top:1px solid var(--rule)}
  .also-row a{color:var(--soft);font:500 15px var(--qx-font);text-decoration:none;
              border-bottom:1px solid var(--rule);padding-bottom:2px}
  .also-row a:hover{color:var(--ink);border-color:var(--ink)}

  .final-cta{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:36px;align-items:center;max-width:920px!important;margin-top:64px!important;padding:34px clamp(22px,4vw,42px);border-radius:22px;background:var(--ink);color:#f7f3e9;box-shadow:0 14px 32px rgba(32,36,31,.18)}.final-cta .eyebrow{color:#ea8b66}.final-cta h2{margin:0;font:400 clamp(27px,4vw,38px)/1.08 Georgia,serif;text-wrap:balance}.final-cta div>p:last-child{margin:12px 0 0;color:#c9c4b8;font:500 15px/1.55 var(--qx-font)}.final-actions{display:grid;gap:9px;min-width:225px}.final-actions a{display:flex;align-items:center;justify-content:space-between;min-height:49px;padding:0 16px;border:1px solid rgba(255,255,255,.22);border-radius:10px;color:#f7f3e9;font:800 13px var(--qx-font);text-decoration:none}.final-actions a:first-child{border-color:var(--signal);background:var(--signal)}.final-actions a:hover{border-color:#f7f3e9}

  @media(max-width:720px){
    .hero{grid-template-columns:1fr;gap:34px;padding:43px 20px}
    .hero-copy h1{font-size:42px}
    .briefing{box-shadow:7px 11px 0 rgba(32,36,31,.14)}
    .floor{padding:40px 20px 48px}
    .floor-heading{align-items:start;flex-direction:column}
    .floor-heading>span{white-space:normal}
    .method{grid-template-columns:1fr}
    .method article{border-right:0;border-bottom:1px solid rgba(243,238,227,.2)}
    .halves{grid-template-columns:1fr}
    .starter-heading{grid-template-columns:1fr;gap:15px}.starter-grid{grid-template-columns:repeat(2,minmax(0,1fr))}
    .final-cta{grid-template-columns:1fr}.final-actions{min-width:0}
    .stats{grid-template-columns:repeat(2,minmax(0,1fr))}
    .subjects a{grid-template-columns:28px 1fr;row-gap:5px}
    .subjects .meta{grid-column:2}
  }

  @media (max-width:760px){
    .volumes summary{grid-template-columns:1fr}
    .volumes .state{grid-column:auto}
  }

  @media(max-width:430px){
    .hero-copy h1{font-size:34px}
    .hero-actions{display:grid}
    .hero-actions a{justify-content:center}
    .starter{padding-inline:16px}.starter-grid{grid-template-columns:1fr}.starter-card{min-height:230px}
    .stands{padding:24px 18px}.final-cta{grid-template-columns:1fr;margin-inline:14px!important}.final-actions{min-width:0}
  }

  @media(prefers-reduced-motion:reduce){.hero-actions a,.briefing>a,.starter-card,.room,.room .shot,.subjects a{transition:none}.hero-actions a:hover,.briefing>a:hover,.starter-card:hover,.room:hover,.subjects a:hover{transform:none}.room:hover .shot{transform:none}}
</style>
