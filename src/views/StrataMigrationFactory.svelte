<script>
  import { theme } from '../lib/stores/theme.js';
  import { audit, allItems, paths, engines, systems, media, decisions, decisionLabels, reviewPrinciples } from '../strata-migration/content.js';

  const STORAGE_KEY = 'qubix-strata-migration-review-v2';
  const tabs = [
    ['overview','Overview'], ['path','40 curriculum paths'], ['engine','36 interaction engines'],
    ['system','19 systems'], ['media','5 media groups'], ['manifest','Decision manifest']
  ];
  const sourceForTab = tab => tab === 'path' ? paths : tab === 'engine' ? engines : tab === 'system' ? systems : tab === 'media' ? media : allItems;
  const initialReview = () => ({ decisions:Object.fromEntries(allItems.map(item => [item.key,item.recommendation])), reviewed:{}, notes:{} });
  function loadReview() {
    try {
      const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
      if (stored?.decisions) return { ...initialReview(), ...stored, decisions:{...initialReview().decisions,...stored.decisions} };
    } catch (_) {}
    return initialReview();
  }
  let review = loadReview();
  let activeTab = 'overview';
  let selectedKey = paths[0].key;
  let search = '';
  let scopeFilter = 'all';
  let decisionFilter = 'all';
  let copied = false;

  $: source = sourceForTab(activeTab);
  $: scopes = [...new Set(source.map(item => item.subject || item.family || item.scope || 'media'))].sort();
  $: filtered = source.filter(item => {
    const haystack = `${item.id} ${item.name || item.type} ${item.reason} ${item.target || ''} ${(item.workshops || []).join(' ')}`.toLowerCase();
    const scope = item.subject || item.family || item.scope || 'media';
    return (!search || haystack.includes(search.toLowerCase()))
      && (scopeFilter === 'all' || scope === scopeFilter)
      && (decisionFilter === 'all' || review.decisions[item.key] === decisionFilter);
  });
  $: selected = allItems.find(item => item.key === selectedKey) || filtered[0] || allItems[0];
  $: reviewedCount = allItems.filter(item => review.reviewed[item.key]).length;
  $: decisionCounts = Object.fromEntries(decisions.map(d => [d, allItems.filter(item => review.decisions[item.key] === d).length]));
  $: ready = reviewedCount === allItems.length;
  $: manifest = buildManifest(review, reviewedCount);

  function persist(next) {
    review = next;
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch (_) {}
  }
  function setDecision(item, value) { persist({ ...review, decisions:{...review.decisions,[item.key]:value} }); }
  function setReviewed(item, value) { persist({ ...review, reviewed:{...review.reviewed,[item.key]:value} }); }
  function setNote(item, value) { persist({ ...review, notes:{...review.notes,[item.key]:value} }); }
  function openTab(tab) {
    activeTab = tab; search = ''; scopeFilter = 'all'; decisionFilter = 'all';
    const first = sourceForTab(tab)[0]; if (first) selectedKey = first.key;
  }
  function buildManifest(reviewState, explicitReviewedCount) {
    const lines = [
      `STRATA MIGRATION DECISION MANIFEST · ${audit.refreshed}`,
      `Evidence: origin/main ${audit.commit}; ${audit.boards} live boards / ${audit.floors} floors`,
      `Review: ${explicitReviewedCount}/${allItems.length} items reviewed`, ''
    ];
    for (const decision of decisions) {
      lines.push(decisionLabels[decision].toUpperCase());
      for (const item of allItems.filter(row => reviewState.decisions[row.key] === decision)) {
        const note = reviewState.notes[item.key] ? ` · NOTE: ${reviewState.notes[item.key]}` : '';
        lines.push(`- ${item.key} · ${item.name || item.type}${reviewState.reviewed[item.key] ? ' · REVIEWED' : ' · UNREVIEWED'}${note}`);
      }
      lines.push('');
    }
    lines.push('This manifest records migration intent only. It does not approve or release curriculum.');
    return lines.join('\n');
  }
  async function copyManifest() {
    try { await navigator.clipboard.writeText(manifest); copied = true; window.setTimeout(() => (copied=false), 1600); } catch (_) { copied = false; }
  }
</script>

<div class="migration-shell">
  <header>
    <div class="identity"><span class="mark">S</span><span><b>STRATA MIGRATION FACTORY</b><small>Complete inventory · independent authoring review</small></span></div>
    <div class="header-actions"><span class="pill">MIGRATION REVIEW · NOT CURRICULUM</span><button class="theme" aria-label="Toggle colour theme" on:click={() => theme.toggle()}>{$theme === 'dark' ? '◑' : '◐'}</button></div>
  </header>

  <main>
    <section class="hero">
      <div><span class="micro">LIVE AUDIT {audit.refreshed} · ORIGIN/MAIN {audit.commit}</span><h1>Finalize what moves from Strata</h1><p>Every live curriculum path, rendered workshop interaction, media class and application system has its own recommendation. Change a decision only after reading its alignment, dependencies and migration boundary.</p></div>
      <div class="progress-card"><span>REVIEWED</span><b>{reviewedCount}<i> / {allItems.length}</i></b><div><i style={`width:${reviewedCount/allItems.length*100}%`}></i></div><small>{ready ? 'Manifest ready to record' : `${allItems.length-reviewedCount} decisions still need founder review`}</small></div>
    </section>

    <nav class="tabs" aria-label="Migration review areas">{#each tabs as tab}<button class:on={activeTab===tab[0]} aria-pressed={activeTab===tab[0]} on:click={() => openTab(tab[0])}>{tab[1]}</button>{/each}</nav>

    {#if activeTab === 'overview'}
      <section class="overview">
        <div class="metric-grid">
          <article><span>LIVE CONTENT</span><b>{audit.boards}</b><p>boards · {audit.floors} floors</p></article>
          <article><span>CURRICULUM</span><b>{audit.paths}</b><p>paths across 4 subjects</p></article>
          <article><span>WORKSHOPS</span><b>{audit.workshopRoutes}</b><p>named and II/III routes</p></article>
          <article><span>GAME ENGINES</span><b>{audit.interactionTypes}</b><p>rendered interaction types</p></article>
          <article><span>CHALLENGES</span><b>{audit.challengeGenerators}</b><p>generator families/functions</p></article>
          <article><span>MEDIA</span><b>{audit.resolvedMediaFloors}</b><p>resolved floors on {audit.resolvedMediaBoards} boards</p></article>
        </div>

        <div class="overview-grid">
          <section class="card"><h2>Current alignment</h2><div class="alignment-list"><span><b>NOW</b> Functions, coordinate work, lines/gradients, motion, vectors and forces</span><span><b>NEXT</b> Units and scale, then trigonometry after its missing prerequisites</span><span><b>LATER</b> Limits, differentiation, momentum and all unmapped subject strands</span><span><b>NEVER COPY</b> Supabase, auth, user data, deployment linkage and old UI chrome</span></div></section>
          <section class="card"><h2>Migration rules</h2><ol>{#each reviewPrinciples as principle}<li>{principle}</li>{/each}</ol></section>
          <section class="card decision-summary"><h2>Recommended manifest</h2>{#each decisions as d}<button on:click={() => { activeTab='manifest'; decisionFilter=d; }}><span class={`dot ${d}`}></span><b>{decisionLabels[d]}</b><em>{decisionCounts[d]}</em></button>{/each}</section>
          <section class="card evidence"><h2>Evidence boundary</h2><p><b>{audit.supabaseBoards}</b> boards use current production Supabase text; <b>{audit.fallbackBoards}</b> use bundled fallbacks. The old working checkout was not treated as live evidence. Media numbers come from the current Reader resolver, not draft prompt inventories.</p><p>The audit also found {audit.svelteComponents} Svelte components, including {audit.assessmentComponents} assessment components, {audit.contentModules} content modules and {audit.publicMediaFiles} public media files.</p></section>
        </div>
      </section>
    {:else if activeTab === 'manifest'}
      <section class="manifest-view">
        <div class:ready class="manifest-status"><b>{ready ? 'READY TO RECORD' : 'REVIEW INCOMPLETE'}</b><span>{reviewedCount} of {allItems.length} items have an explicit reviewed mark.</span></div>
        <div class="manifest-actions"><button on:click={copyManifest}>{copied ? 'COPIED' : 'COPY MANIFEST'}</button><span>Copying does not commit, approve or deploy anything.</span></div>
        <pre>{manifest}</pre>
      </section>
    {:else}
      <section class="workspace">
        <div class="filters">
          <label>SEARCH<input aria-label="Search migration inventory" bind:value={search} placeholder="ID, topic, component or workshop"/></label>
          <label>SCOPE<select aria-label="Filter migration scope" bind:value={scopeFilter}><option value="all">All scopes</option>{#each scopes as scope}<option value={scope}>{scope}</option>{/each}</select></label>
          <label>DECISION<select aria-label="Filter migration decision" bind:value={decisionFilter}><option value="all">All decisions</option>{#each decisions as d}<option value={d}>{decisionLabels[d]}</option>{/each}</select></label>
          <span>{filtered.length} shown</span>
        </div>

        <div class="inventory-layout">
          <div class="inventory-list" aria-label="Migration inventory">
            {#each filtered as item}
              <button class:on={selected?.key===item.key} on:click={() => (selectedKey=item.key)}>
                <span class={`dot ${review.decisions[item.key]}`}></span>
                <span class="item-copy"><b>{item.name || item.type}</b><small>{item.id} · {item.subject || item.family || item.scope || 'media'}</small></span>
                {#if item.boards}<em>{item.boards} BB</em>{:else if item.count}<em>{item.count}</em>{/if}
                <i class:done={review.reviewed[item.key]}>{review.reviewed[item.key] ? '✓' : '○'}</i>
              </button>
            {:else}<p class="empty">No migration items match these filters.</p>{/each}
          </div>

          {#if selected}
            <article class="detail">
              <div class="detail-head"><span class={`kind ${selected.kind}`}>{selected.kind}</span><small>{selected.id}</small><h2>{selected.name || selected.type}</h2><p>{selected.reason}</p></div>
              <div class="facts">
                <div><span>ALIGNMENT</span><b>{selected.alignment}</b></div>
                <div><span>DEPENDENCY</span><b>{selected.dependency || 'curriculum'}</b></div>
                {#if selected.target}<div><span>QUBIX TARGET</span><b>{selected.target}</b></div>{/if}
                {#if selected.boards}<div><span>LIVE CONTENT</span><b>{selected.boards} boards</b></div>{/if}
                {#if selected.component}<div><span>COMPONENT</span><b>{selected.component}</b></div>{/if}
                {#if selected.count}<div><span>COUNT</span><b>{selected.count}</b></div>{/if}
              </div>
              {#if selected.workshops?.length}<section class="workshops"><span>GAMIFIED WORKSHOPS</span><div>{#each selected.workshops as workshop}<code>{workshop}</code>{/each}</div></section>{/if}
              <section class="decision"><span>MIGRATION DECISION</span><div>{#each decisions as d}<button aria-pressed={review.decisions[selected.key]===d} class:on={review.decisions[selected.key]===d} class={d} on:click={() => setDecision(selected,d)}>{decisionLabels[d]}</button>{/each}</div></section>
              <label class="notes">FOUNDER NOTE<textarea aria-label={`Founder note for ${selected.name || selected.type}`} value={review.notes[selected.key] || ''} on:input={e => setNote(selected,e.currentTarget.value)} placeholder="Optional reason, condition or target board"></textarea></label>
              <label class="reviewed"><input type="checkbox" checked={!!review.reviewed[selected.key]} on:change={e => setReviewed(selected,e.currentTarget.checked)}/><span><b>I have reviewed this migration boundary</b><small>This records review intent only. It does not approve curriculum.</small></span></label>
            </article>
          {/if}
        </div>
      </section>
    {/if}
  </main>
</div>

<style>
  .migration-shell{width:100%;height:100%;overflow-x:hidden;overflow-y:auto;overscroll-behavior-y:contain;-webkit-overflow-scrolling:touch;background:radial-gradient(ellipse at 50% 3%,var(--qx-bg-radial),var(--qx-bg) 76%);color:var(--qx-text);font-family:var(--qx-font)}
  header{position:sticky;top:0;z-index:20;display:flex;align-items:center;justify-content:space-between;gap:18px;min-height:70px;padding:9px clamp(14px,4vw,48px);border-bottom:1px solid var(--qx-border);background:color-mix(in srgb,var(--qx-bg) 92%,transparent);backdrop-filter:blur(14px)}.identity,.header-actions{display:flex;align-items:center;gap:11px}.identity>span:last-child{display:grid;gap:3px}.identity b{font-size:11px;letter-spacing:.14em}.identity small{color:var(--qx-text-faint);font-size:9px}.mark{display:grid;place-items:center;width:38px;height:38px;border:1px solid var(--qx-accent);border-radius:50%;color:var(--qx-accent-text);font-family:serif;font-size:18px}.pill{border:1px solid var(--qx-border-2);border-radius:999px;padding:6px 10px;color:var(--qx-text-faint);font-size:8px;font-weight:900;letter-spacing:.08em}.theme{width:38px;height:38px;border:1px solid var(--qx-border);border-radius:50%;background:var(--qx-surface);color:var(--qx-text);cursor:pointer}
  main{width:min(1220px,calc(100% - 28px));margin:0 auto;padding:34px 0 68px}.hero{display:grid;grid-template-columns:1fr 260px;gap:32px;align-items:end}.micro{color:var(--qx-accent-text);font-size:9px;font-weight:900;letter-spacing:.09em}.hero h1{margin:8px 0 10px;font-size:clamp(32px,5vw,56px);line-height:1.02}.hero p{max-width:76ch;margin:0;color:var(--qx-text-2);font-size:14px;line-height:1.62}.progress-card{display:grid;gap:7px;border:1px solid var(--qx-border);border-radius:14px;background:var(--qx-surface);padding:15px}.progress-card>span{color:var(--qx-text-faint);font-size:8px;font-weight:900}.progress-card>b{font-size:29px}.progress-card b i{color:var(--qx-text-faint);font-size:14px;font-style:normal}.progress-card>div{height:6px;overflow:hidden;border-radius:999px;background:var(--qx-surface-3)}.progress-card>div i{display:block;height:100%;background:var(--qx-green)}.progress-card small{color:var(--qx-text-2);font-size:9px}
  .tabs{display:flex;gap:6px;margin:28px 0 22px;padding-bottom:8px;overflow-x:auto}.tabs button{flex:0 0 auto;min-height:42px;border:1px solid var(--qx-border);border-radius:10px;background:var(--qx-surface);color:var(--qx-text-2);padding:8px 12px;font-size:9px;font-weight:900;cursor:pointer}.tabs button.on{border-color:var(--qx-accent);background:var(--qx-accent-soft);color:var(--qx-accent-text)}
  .metric-grid{display:grid;grid-template-columns:repeat(6,1fr);gap:9px}.metric-grid article{display:grid;gap:5px;border:1px solid var(--qx-border);border-radius:13px;background:var(--qx-surface);padding:13px}.metric-grid span{color:var(--qx-text-faint);font-size:8px;font-weight:900}.metric-grid b{font-size:24px}.metric-grid p{margin:0;color:var(--qx-text-2);font-size:9px;line-height:1.3}.overview-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-top:12px}.card{border:1px solid var(--qx-border);border-radius:15px;background:var(--qx-surface);padding:17px}.card h2{margin:0 0 12px;font-size:16px}.card p,.card li{color:var(--qx-text-2);font-size:11px;line-height:1.55}.card ol{display:grid;gap:7px;margin:0;padding-left:20px}.alignment-list{display:grid;gap:8px}.alignment-list span{display:grid;grid-template-columns:62px 1fr;gap:9px;color:var(--qx-text-2);font-size:11px;line-height:1.45}.alignment-list b{color:var(--qx-accent-text);font-size:9px}.decision-summary{display:grid;grid-template-columns:1fr 1fr;gap:7px}.decision-summary h2{grid-column:1/-1}.decision-summary button{display:flex;align-items:center;gap:8px;border:1px solid var(--qx-border);border-radius:9px;background:var(--qx-surface-2);color:var(--qx-text);padding:8px;cursor:pointer}.decision-summary button b{font-size:10px}.decision-summary button em{margin-left:auto;color:var(--qx-text-faint);font-size:11px;font-style:normal}.dot{width:9px;height:9px;flex:0 0 auto;border-radius:50%;background:var(--qx-text-faint)}.dot.migrate{background:var(--qx-green)}.dot.adapt{background:var(--qx-accent)}.dot.defer{background:var(--qx-yellow)}.dot.reject{background:var(--qx-danger)}.dot.infrastructure{background:var(--qx-text-dim)}
  .filters{display:grid;grid-template-columns:1fr 180px 190px auto;gap:9px;align-items:end;margin-bottom:10px}.filters label,.notes{display:grid;gap:5px;color:var(--qx-text-faint);font-size:8px;font-weight:900}.filters input,.filters select,.notes textarea{width:100%;box-sizing:border-box;border:1px solid var(--qx-border);border-radius:9px;background:var(--qx-surface);color:var(--qx-text);padding:9px 10px;font:inherit}.filters>span{padding:10px;color:var(--qx-text-faint);font-size:9px}.inventory-layout{display:grid;grid-template-columns:minmax(300px,.82fr) minmax(440px,1.18fr);gap:12px;align-items:start}.inventory-list{max-height:670px;overflow:auto;border:1px solid var(--qx-border);border-radius:14px;background:var(--qx-surface);padding:7px}.inventory-list>button{display:grid;grid-template-columns:auto 1fr auto auto;gap:9px;align-items:center;width:100%;min-height:56px;border:1px solid transparent;border-radius:9px;background:transparent;color:var(--qx-text);padding:8px;text-align:left;cursor:pointer}.inventory-list>button:hover,.inventory-list>button.on{border-color:var(--qx-border-2);background:var(--qx-surface-2)}.item-copy{display:grid;gap:3px}.item-copy b{font-size:11px}.item-copy small{color:var(--qx-text-faint);font-size:8px}.inventory-list em{color:var(--qx-text-faint);font-size:8px;font-style:normal}.inventory-list i{display:grid;place-items:center;width:22px;height:22px;border-radius:50%;color:var(--qx-text-faint);font-size:11px;font-style:normal}.inventory-list i.done{background:var(--qx-green-soft);color:var(--qx-green-text)}.empty{padding:20px;color:var(--qx-text-faint);font-size:11px}
  .detail{position:sticky;top:82px;display:grid;gap:14px;border:1px solid var(--qx-border);border-radius:15px;background:var(--qx-surface);padding:18px;box-shadow:var(--qx-shadow-card)}.detail-head{display:grid;grid-template-columns:auto 1fr;gap:5px 9px}.kind{width:max-content;border-radius:999px;background:var(--qx-accent-soft);color:var(--qx-accent-text);padding:5px 8px;font-size:8px;font-weight:900;text-transform:uppercase}.detail-head small{align-self:center;color:var(--qx-text-faint);font-size:8px}.detail-head h2,.detail-head p{grid-column:1/-1}.detail-head h2{margin:5px 0 0;font-size:22px}.detail-head p{margin:0;color:var(--qx-text-2);font-size:11px;line-height:1.55}.facts{display:grid;grid-template-columns:repeat(2,1fr);gap:7px}.facts div{display:grid;gap:4px;border:1px solid var(--qx-border);border-radius:9px;background:var(--qx-surface-2);padding:9px}.facts span,.workshops>span,.decision>span{color:var(--qx-text-faint);font-size:8px;font-weight:900}.facts b{font-size:10px;line-height:1.35}.workshops{display:grid;gap:7px}.workshops>div{display:flex;flex-wrap:wrap;gap:5px}.workshops code{border:1px solid var(--qx-border);border-radius:7px;background:var(--qx-surface-2);padding:5px 7px;color:var(--qx-text-2);font-size:8px}.decision{display:grid;gap:7px}.decision>div{display:flex;flex-wrap:wrap;gap:5px}.decision button{min-height:36px;border:1px solid var(--qx-border);border-radius:8px;background:var(--qx-surface-2);color:var(--qx-text-2);padding:7px 9px;font-size:8px;font-weight:900;cursor:pointer}.decision button.on{border-color:var(--qx-accent);background:var(--qx-accent-soft);color:var(--qx-accent-text)}.decision button.migrate.on{border-color:var(--qx-green);background:var(--qx-green-soft);color:var(--qx-green-text)}.decision button.reject.on{border-color:var(--qx-danger);background:var(--qx-danger-soft);color:var(--qx-danger-text)}.notes textarea{min-height:72px;resize:vertical;font-size:10px;line-height:1.45}.reviewed{display:flex;align-items:flex-start;gap:10px;border:1px solid var(--qx-border);border-radius:10px;background:var(--qx-surface-2);padding:10px;cursor:pointer}.reviewed input{width:18px;height:18px;accent-color:var(--qx-green)}.reviewed span{display:grid;gap:3px}.reviewed b{font-size:10px}.reviewed small{color:var(--qx-text-faint);font-size:8px}
  .manifest-status{display:flex;justify-content:space-between;gap:12px;border:1px solid var(--qx-danger);border-radius:12px;background:var(--qx-danger-soft);color:var(--qx-danger-text);padding:13px}.manifest-status.ready{border-color:var(--qx-green);background:var(--qx-green-soft);color:var(--qx-green-text)}.manifest-status b{font-size:11px}.manifest-status span{font-size:9px}.manifest-actions{display:flex;align-items:center;gap:12px;margin:12px 0}.manifest-actions button{min-height:40px;border:1px solid var(--qx-accent);border-radius:9px;background:var(--qx-accent-soft);color:var(--qx-accent-text);padding:8px 12px;font-size:9px;font-weight:900;cursor:pointer}.manifest-actions span{color:var(--qx-text-faint);font-size:9px}.manifest-view pre{max-height:620px;overflow:auto;white-space:pre-wrap;border:1px solid var(--qx-border);border-radius:14px;background:var(--qx-surface);padding:17px;color:var(--qx-text-2);font:10px/1.55 ui-monospace,SFMono-Regular,Consolas,monospace}
  @media(max-width:900px){.metric-grid{grid-template-columns:repeat(3,1fr)}.inventory-layout{grid-template-columns:1fr}.detail{position:static}.inventory-list{max-height:430px}}
  @media(max-width:620px){header{align-items:flex-start}.pill{display:none}main{width:min(100% - 18px,1220px);padding-top:24px}.hero{grid-template-columns:1fr}.progress-card{width:auto}.metric-grid{grid-template-columns:repeat(2,1fr)}.overview-grid{grid-template-columns:1fr}.filters{grid-template-columns:1fr 1fr}.filters label:first-child{grid-column:1/-1}.filters>span{display:none}.facts{grid-template-columns:1fr}.manifest-status{display:grid}.alignment-list span{grid-template-columns:54px 1fr}}
</style>
