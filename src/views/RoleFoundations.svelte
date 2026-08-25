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
  <div class="nav-wrap"><SiteNav subjects={false} /></div>

  <header>
    <p>WELCOME TO QUBIX UNIVERSITY</p>
    <h1>Learn data science from zero.</h1>
    <span>No prior data, maths or programming experience is assumed. Start at chapter one and
      work forward: by the end you can take a messy question, get a trustworthy number out of it,
      and say what it does and does not show.</span>
    <p class="free">No account needed, nothing to pay. Your progress saves on this device.</p>
  </header>

  <!-- The premise, before anything else. The course is two kinds of material and
       a newcomer cannot choose between them until somebody says so plainly. -->
  <section class="premise" aria-labelledby="premise-heading">
    <p class="eyebrow" id="premise-heading">HOW THE COURSE WORKS</p>
    <h2>Two kinds of material, and you need both.</h2>
    <p class="lede">Every session gives you something to understand and something to do with it.
      Reading on its own leaves you able to recognise an idea but not use it. Doing on its own
      leaves you able to follow steps without knowing when they stop applying.</p>

    <div class="halves">
      <article class="half">
        <p class="tag">INFORMATION</p>
        <h3>Material you read</h3>
        <p>Written explanations with worked examples and computed figures. {CHAPTERS.length} chapters,
          {volumeSessions} sessions, each one ending in a single question you answer without looking back.</p>
        <dl>
          <div><dt>Time to read it all</dt><dd>{readingTime}</dd></div>
          <div><dt>First session</dt><dd>{partsForChapter(1)[0].minutes} min</dd></div>
        </dl>
        <a class="primary" href="?mode=game&mission=shared-book&chapter=1&session=1">Start reading <span aria-hidden="true">→</span></a>
      </article>

      <article class="half">
        <p class="tag">PRACTICAL</p>
        <h3>Material you do</h3>
        <p>{MISSIONS.length} missions inside Qubix Superstore, a working shop with real tables and real
          mistakes in them. You make the decision, and the mission tells you what it cost.</p>
        <dl>
          <div><dt>Time to do them all</dt><dd>{doingTime}</dd></div>
          <div><dt>Earns</dt><dd>{TOTAL_XP.toLocaleString()} XP · {RANKS.length} ranks</dd></div>
        </dl>
        <a class="primary alt" href="?mode=game&mission=checkout">Play the first mission <span aria-hidden="true">→</span></a>
      </article>
    </div>

    <p class="together"><b>Together: {bothTime}</b>
      <span>{volumeSessions} sessions of about ten minutes each, and the mission that follows it.
        One a day is a month; a couple of focused evenings will also do it. Nothing is timed and nothing expires.</span></p>
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
  /* The premise. One idea per block, in the order a newcomer asks them. */
  .premise{padding:30px 0 34px;border-top:1px solid var(--rule)}
  .premise h2{margin:0;font:400 clamp(23px,3.4vw,30px)/1.15 Georgia,serif;letter-spacing:-.015em;text-wrap:balance}
  .lede{margin:11px 0 0;max-width:66ch;color:var(--soft);font:400 15.5px/1.6 var(--qx-font)}
  .halves{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px;margin-top:24px}
  .half{padding:20px;border:1px solid var(--rule);border-radius:11px;background:rgba(255,255,255,.4);
        display:flex;flex-direction:column;gap:9px}
  .tag{margin:0;color:var(--accent);font:900 10.5px var(--qx-font);letter-spacing:.14em}
  .half h3{margin:0;font:400 21px Georgia,serif}
  .half>p{margin:0;color:var(--soft);font:400 14px/1.55 var(--qx-font)}
  .half dl{margin:6px 0 0;display:grid;gap:7px;padding-top:12px;border-top:1px solid var(--rule)}
  .half dl div{display:flex;align-items:baseline;justify-content:space-between;gap:12px}
  .half dt{color:var(--soft);font:600 13px var(--qx-font)}
  .half dd{margin:0;color:var(--ink);font:800 14px var(--qx-font);font-variant-numeric:tabular-nums}
  .half .primary{margin-top:12px}
  .primary.alt{background:#8c4c2e}
  .primary.alt:hover{background:#743d24}
  .together{display:flex;align-items:baseline;gap:14px;flex-wrap:wrap;margin:20px 0 0;padding:14px 16px;
            border-radius:10px;background:var(--accent-soft, #efe8dc)}
  .together b{font:800 16px var(--qx-font);font-variant-numeric:tabular-nums}
  .together span{color:var(--soft);font:400 14px var(--qx-font)}

  .learn{padding:30px 0 0;border-top:1px solid var(--rule)}
  .subjects{list-style:none;margin:18px 0 0;padding:0;border-top:1px solid var(--rule)}
  .subjects li{border-bottom:1px solid var(--rule)}
  .subjects a{display:grid;grid-template-columns:34px 1fr auto;align-items:baseline;gap:16px;
              padding:13px 0;color:var(--ink);text-decoration:none}
  .subjects a:hover .text b{color:var(--accent)}

  .stands{padding:32px 0 0;border-top:1px solid var(--rule);margin-top:32px}
  .stats{list-style:none;display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:14px;margin:18px 0 0;padding:0}
  .stats li{display:flex;flex-direction:column;gap:3px}
  .stats b{font:400 26px Georgia,serif;font-variant-numeric:tabular-nums}
  .stats span{color:var(--soft);font:400 13px/1.4 var(--qx-font)}
  .honest{margin:20px 0 0;max-width:70ch;color:var(--soft);font:400 14px/1.6 var(--qx-font)}
  .also-row{display:flex;gap:18px;flex-wrap:wrap;margin-top:18px;padding-top:16px;border-top:1px solid var(--rule)}
  .also-row a{color:var(--soft);font:500 14px var(--qx-font);text-decoration:none;
              border-bottom:1px solid var(--rule);padding-bottom:2px}
  .also-row a:hover{color:var(--ink);border-color:var(--ink)}

  @media(max-width:720px){
    .halves{grid-template-columns:1fr}
    .stats{grid-template-columns:repeat(2,minmax(0,1fr))}
    .subjects a{grid-template-columns:28px 1fr;row-gap:5px}
    .subjects .meta{grid-column:2}
  }

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
