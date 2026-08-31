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
</script>

<svelte:head>
  <title>Qubix University</title>
  <meta name="description" content={`Learn data science from zero through seven short chapters and ${MISSIONS.length} practical missions inside Qubix Superstore.`} />
</svelte:head>

<section class="landing qx-shell">
  <div class="nav-wrap"><SiteNav subjects={false} /></div>

  <header class="hero">
    <div class="hero-copy">
      <p>WELCOME, NEW STARTER</p>
      <h1>Learn data science on the shop floor.</h1>
      <span>Read the idea, enter Qubix Superstore, and make the decision yourself. Start from zero
        and work toward SQL, Python, statistics and clear communication.</span>
      <div class="hero-actions">
        <a class="clock-in" href="?mode=game&mission=shared-book&chapter=1&session=1">Begin your first briefing</a>
        <a class="quiet-action" href="/study">Take a 40-minute study seat</a>
        <a class="quiet-action" href="#training-floor">See how it works</a>
      </div>
      <p class="free">Free · No account needed · Progress saves on this device</p>
    </div>

    <aside class="briefing" aria-labelledby="briefing-title">
      <div class="briefing-top"><span>SHIFT BRIEFING · 001</span><b>{firstSessionTime}</b></div>
      <p>CHAPTER 01 · DATA FOUNDATIONS</p>
      <h2 id="briefing-title">Data is a record, not reality.</h2>
      <span>A customer buys a lamp. Which details become evidence—and which disappear?</span>
      <div class="task"><b>YOUR TASK</b><span>Inspect the checkout record and decide what the store can honestly claim.</span></div>
      <a href="?mode=game&mission=shared-book&chapter=1&session=1">Open briefing <span aria-hidden="true">→</span></a>
    </aside>
  </header>

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
      <a href="/study">Study rooms · 40 minutes at your level</a>
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

  .landing{--rule:#c8c1b1;--ink:#20241f;--soft:#62695f;--accent:#315f48;--signal:#b85530;--panel:#f7f3e9;
           min-height:100vh;max-width:none;padding:0 0 72px;background:#e6e0d2;color:var(--ink)}
  .landing>*{max-width:1120px;margin-inline:auto}
  .nav-wrap{padding-inline:clamp(16px,5vw,56px)}
  .learn,.stands,.after,.foot-wrap{max-width:860px;padding-inline:clamp(16px,4vw,32px)}

  .hero{display:grid;grid-template-columns:minmax(0,1fr) minmax(310px,.72fr);gap:7%;
        padding:64px clamp(20px,5vw,64px) 58px;border-top:1px solid var(--rule);
        background-image:linear-gradient(rgba(93,91,78,.08) 1px,transparent 1px),linear-gradient(90deg,rgba(93,91,78,.08) 1px,transparent 1px);
        background-size:28px 28px}
  .hero-copy{align-self:center}
  .hero-copy>p:first-child{margin:0 0 16.5px;color:var(--signal);font:800 11.5px var(--qx-font);letter-spacing:.17em}
  .hero-copy h1{margin:0;font:400 clamp(34px,4.4vw,52px)/1.01 Georgia,serif;letter-spacing:-.035em;text-wrap:balance}
  .hero-copy>span{display:block;margin-top:22px;max-width:59ch;color:var(--soft);font:400 16.5px/1.65 var(--qx-font)}
  .hero-actions{display:flex;flex-wrap:wrap;gap:11.5px;margin-top:28px}
  .hero-actions a{display:inline-flex;padding:15px 19px;color:var(--ink);font:800 15px var(--qx-font);text-decoration:none}
  .hero-actions .clock-in{background:var(--signal);color:#fff}
  .hero-actions .quiet-action{border:1px solid var(--rule);background:rgba(247,243,233,.6)}
  .free{margin:15px 0 0;color:var(--soft);font:500 11.5px var(--qx-font);letter-spacing:.04em}

  .briefing{align-self:center;padding:23px;border:6px solid var(--ink);background:var(--panel);box-shadow:11.5px 13px 0 rgba(32,36,31,.14)}
  .briefing-top{display:flex;justify-content:space-between;gap:13px;color:var(--accent);font:800 11.5px var(--qx-font);letter-spacing:.12em}
  .briefing>p{margin:27px 0 0;color:var(--soft);font:600 11.5px var(--qx-font);letter-spacing:.1em}
  .briefing h2{margin:11px 0 0;font:400 30px/1.06 Georgia,serif}
  .briefing>span{display:block;margin-top:15px;color:var(--soft);font:400 14px/1.55 var(--qx-font)}
  .task{margin-top:19px;padding:15px;border-left:3px solid var(--signal);background:#ebe5d8}
  .task b,.task span{display:block}.task b{color:var(--signal);font:800 11px var(--qx-font);letter-spacing:.12em}
  .task span{margin-top:5px;font:500 14px/1.5 var(--qx-font)}
  .briefing>a{display:flex;justify-content:space-between;margin-top:19px;padding:13px 15px;background:var(--ink);color:#f7f3e9;
              font:800 13px var(--qx-font);text-decoration:none}

  .floor{padding:46px clamp(20px,5vw,64px) 56px;background:var(--panel)}
  .floor-heading{display:flex;align-items:end;justify-content:space-between;gap:24px}
  .floor-heading h2{margin:0;font:400 clamp(26px,3.1vw,34px)/1.1 Georgia,serif;text-wrap:balance}
  .floor-heading>span{color:var(--soft);font:700 11.5px var(--qx-font);letter-spacing:.11em;white-space:nowrap}
  .floor-map{display:grid;grid-template-columns:repeat(auto-fit,minmax(212px,1fr));gap:12px;
             margin-top:30px;padding:13px;border:5px solid var(--ink);background:#e9e4d6}
  .room{position:relative;display:flex;flex-direction:column;border:1px solid #aaa895;
        background:#e6e0d2;color:var(--ink);text-decoration:none;overflow:hidden}
  .room:hover{border-color:var(--signal)}
  .room .shot{display:block;width:100%;aspect-ratio:16/10;object-fit:cover;background:#ded8c8}
  .room .body{display:grid;gap:5px;padding:11px 13px 13px}
  .room b{font:800 12.5px var(--qx-font);letter-spacing:.09em}
  .room small{color:var(--soft);font:500 13.5px/1.45 var(--qx-font)}
  .room em{color:var(--signal);font:700 12px var(--qx-font);font-style:normal}
  .room.start{border:2px solid var(--signal)}
  .room.planned .shot{opacity:.5}
  .you-are-here{position:absolute;top:9px;left:9px;padding:5px 10px;background:var(--signal);color:#fff;
                font:800 11px var(--qx-font);letter-spacing:.1em}

  .method{display:grid;grid-template-columns:repeat(3,1fr);background:var(--ink);color:#f3eee3}
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
  .after{padding:34px 0 0}
  .volumes{list-style:none;margin:20px 0 0;padding:0;border-top:1px solid var(--rule)}
  .volumes>li{border-bottom:1px solid var(--rule)}
  .volumes summary{display:grid;grid-template-columns:88px 1fr auto;align-items:baseline;gap:16.5px;
                   padding:16.5px 0;cursor:pointer;list-style:none}
  .volumes summary::-webkit-details-marker{display:none}
  .volumes summary:hover .text b{color:var(--role)}
  .vol{color:var(--role);font:700 13px var(--qx-font);letter-spacing:.06em;white-space:nowrap}
  .volumes .state{color:var(--soft);font:500 13px var(--qx-font);white-space:nowrap}
  .plan{padding:4px 0 22px}
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
  .premise{max-width:860px;padding:42px clamp(16px,4vw,32px) 38px;border-top:1px solid var(--rule)}
  .premise h2{margin:0;font:400 clamp(23px,3.4vw,30px)/1.15 Georgia,serif;letter-spacing:-.015em;text-wrap:balance}
  .lede{margin:11.5px 0 0;max-width:66ch;color:var(--soft);font:400 16.5px/1.6 var(--qx-font)}
  .halves{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:15px;margin-top:24px}
  .half{padding:20px;border:1px solid var(--rule);border-radius:11.5px;background:rgba(255,255,255,.4);
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

  .learn{padding:30px 0 0;border-top:1px solid var(--rule)}
  .subjects{list-style:none;margin:19px 0 0;padding:0;border-top:1px solid var(--rule)}
  .subjects li{border-bottom:1px solid var(--rule)}
  .subjects a{display:grid;grid-template-columns:34px 1fr auto;align-items:baseline;gap:16.5px;
              padding:15px 0;color:var(--ink);text-decoration:none}
  .subjects a:hover .text b{color:var(--accent)}

  .stands{padding:32px 0 0;border-top:1px solid var(--rule);margin-top:32px}
  .stats{list-style:none;display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:15px;margin:19px 0 0;padding:0}
  .stats li{display:flex;flex-direction:column;gap:3px}
  .stats b{font:400 27px Georgia,serif;font-variant-numeric:tabular-nums}
  .stats span{color:var(--soft);font:400 15px/1.4 var(--qx-font)}
  .honest{margin:20px 0 0;max-width:70ch;color:var(--soft);font:400 15px/1.6 var(--qx-font)}
  .also-row{display:flex;gap:19px;flex-wrap:wrap;margin-top:19px;padding-top:16.5px;border-top:1px solid var(--rule)}
  .also-row a{color:var(--soft);font:500 15px var(--qx-font);text-decoration:none;
              border-bottom:1px solid var(--rule);padding-bottom:2px}
  .also-row a:hover{color:var(--ink);border-color:var(--ink)}

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
  }
</style>
