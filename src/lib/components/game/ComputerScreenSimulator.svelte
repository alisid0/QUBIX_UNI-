<script>
  import PixelAsset from './PixelAsset.svelte';

  const apps = [
    { id: 'missions', label: 'Mission queue', icon: 'clipboard' },
    { id: 'feed', label: 'Branch feed', icon: 'feed' },
    { id: 'dictionary', label: 'Data dictionary', icon: 'folder' },
    { id: 'checks', label: 'Quality checks', icon: 'monitor' }
  ];
  const feedRows = [
    { branch: 'B-17', metric: 'freezer_temperature', value: '-18', unit: '°C', state: 'ready' },
    { branch: 'B-08', metric: 'freezer_temperature', value: '0', unit: '°F', state: 'issue' },
    { branch: 'B-22', metric: 'closing_stock', value: '41', unit: 'units', state: 'ready' }
  ];
  const missions = [
    { id: 'FOUNDATIONS', title: 'Role Foundations Library', status: 'PROPOSAL', note: 'Shared base plus four role volumes', href: '?mode=game&mission=foundations' },
    { id: 'STORY MODE', title: 'Data Quality Rotation', status: 'READY', note: 'Missions 001 to 007 in sequence', href: '?mode=game&mission=campaign' },
    { id: 'MISSION 006', title: 'Units and Measurement', status: 'ACTIVE', note: 'Current AI draft under review' },
    { id: 'MISSION 007', title: 'Trace the Number', status: 'PROTOTYPE', note: 'Authoring-only lineage mission', href: '?mode=game&mission=data-lineage' },
    { id: 'PROTOTYPE B', title: 'Constraint Console', status: 'LOCKED', note: 'Interaction shell only' },
    { id: 'PROTOTYPE C', title: 'Branch Incident Desk', status: 'LOCKED', note: 'Interaction shell only' }
  ];

  let activeApp = '';
  let selectedRow = 1;
  let checkRan = false;
  let notice = 'System ready';

  function openApp(id) {
    activeApp = id;
    notice = `${apps.find(app => app.id === id)?.label} opened`;
  }

  function closeApp() {
    activeApp = '';
    checkRan = false;
    notice = 'Returned to desktop';
  }

  function runChecks() {
    checkRan = true;
    selectedRow = 1;
    notice = 'One unit mismatch found in three records';
  }
</script>

<section class="computer" aria-label="Interactive Qubix operations computer">
  <div class="bezel">
    <div class="screen">
      <header class="system-bar">
        <div class="brand"><span class="cube">Q</span><b>QUBIX OS</b></div>
        <div class="system-status"><span class="online"></span> HQ LAB · LOCAL</div>
      </header>

      {#if !activeApp}
        <div class="desktop">
          <div class="wallpaper"><span>PRE-INTERN</span><strong>OPERATIONS DESK</strong><small>Training environment · AI_DRAFT</small></div>
          <div class="desktop-icons">
            {#each apps as app}
              <button on:click={() => openApp(app.id)} aria-label={`Open ${app.label}`}>
                <span><PixelAsset kind={app.icon} label="" /></span>
                <b>{app.label}</b>
              </button>
            {/each}
          </div>
        </div>
      {:else}
        <div class="window">
          <div class="window-title">
            <div><span class="window-mark"><PixelAsset kind={apps.find(app => app.id === activeApp)?.icon} /></span><b>{apps.find(app => app.id === activeApp)?.label}</b></div>
            <button on:click={closeApp} aria-label="Close application">×</button>
          </div>

          {#if activeApp === 'missions'}
            <div class="app-content mission-app">
              <p class="app-kicker">MISSION CONTROL</p>
              <h3>Training queue</h3>
              <div class="mission-list">
                {#each missions as mission}
                  <article class:locked={mission.status === 'LOCKED'} class:prototype={mission.status === 'PROTOTYPE'}>
                    <div><small>{mission.id}</small><b>{mission.title}</b><span>{mission.note}</span></div>
                    {#if mission.href}<a href={mission.href}>OPEN {mission.status}</a>{:else}<em>{mission.status}</em>{/if}
                  </article>
                {/each}
              </div>
            </div>
          {:else if activeApp === 'feed'}
            <div class="app-content feed-app">
              <div class="app-heading"><div><p class="app-kicker">BRANCH FEED · 06:00</p><h3>Measurement sample</h3></div><button class="run" on:click={runChecks}>Run unit check</button></div>
              <div class="table-wrap">
                <table>
                  <thead><tr><th>Branch</th><th>Metric</th><th>Value</th><th>Unit</th><th>Status</th></tr></thead>
                  <tbody>{#each feedRows as row,index}<tr class:selected={selectedRow === index} class:issue={checkRan && row.state === 'issue'} on:click={() => selectedRow = index}><td>{row.branch}</td><td>{row.metric}</td><td>{row.value}</td><td>{row.unit}</td><td>{checkRan ? (row.state === 'issue' ? 'REVIEW' : 'READY') : 'UNCHECKED'}</td></tr>{/each}</tbody>
                </table>
              </div>
              <div class:warning={checkRan} class="detail" aria-live="polite">
                {#if checkRan}<span class="asset-icon"><PixelAsset kind="alert" label="Unit mismatch" state="alert" /></span><p><b>Unit mismatch</b><span>B-08 reports °F while the field contract requires °C. Preserve the source value and document the conversion.</span></p>{:else}<span class="asset-icon"><PixelAsset kind="feed" label="Feed record" /></span><p><b>Select a record or run the check</b><span>The simulator will keep the original row visible when it finds a problem.</span></p>{/if}
              </div>
            </div>
          {:else if activeApp === 'dictionary'}
            <div class="app-content dictionary-app">
              <p class="app-kicker">GOVERNED DEFINITIONS</p><h3>Data dictionary</h3>
              <dl><div><dt>freezer_temperature</dt><dd>Air temperature measured inside the branch freezer</dd></div><div><dt>Required unit</dt><dd>degrees Celsius (°C)</dd></div><div><dt>Grain</dt><dd>one freezer at one observation time</dd></div><div><dt>Missing policy</dt><dd>retain blank and raise a quality event</dd></div></dl>
            </div>
          {:else if activeApp === 'checks'}
            <div class="app-content checks-app">
              <p class="app-kicker">QUALITY RULES</p><h3>Available checks</h3>
              <ul><li><span class="asset-icon"><PixelAsset kind="clipboard" state="resolved" /></span><span><b>Required field check</b><small>Detect blank values without replacing evidence</small></span></li><li><span class="asset-icon"><PixelAsset kind="database" /></span><span><b>Declared unit check</b><small>Compare each record with the field contract</small></span></li><li class="locked"><span class="asset-icon"><PixelAsset kind="server" /></span><span><b>Lineage check</b><small>Prototype only · mission content locked</small></span></li></ul>
            </div>
          {/if}
        </div>
      {/if}

      <footer class="taskbar"><button on:click={closeApp} aria-label="Open desktop"><span class="cube">Q</span></button><span aria-live="polite">{notice}</span><time>06:00</time></footer>
    </div>
  </div>
  <div class="stand"><span></span></div>
</section>

<style>
  .computer{width:100%;color:#241f16;font-family:var(--qx-font)}.bezel{padding:14px;border-radius:18px;background:#241f16;box-shadow:0 20px 35px rgba(0,0,0,.28)}.screen{position:relative;aspect-ratio:16/10;min-height:430px;overflow:hidden;border-radius:8px;background:#d8d0be}.system-bar,.taskbar{height:34px;display:flex;align-items:center;justify-content:space-between;padding:0 11px;background:#241f16;color:#f1ede4;font-size:9px;letter-spacing:.08em}.brand,.system-status{display:flex;align-items:center;gap:7px}.cube{display:grid;place-items:center;width:19px;height:19px;border-radius:4px;background:#a85a34;color:#f1ede4;font-weight:900}.online{width:7px;height:7px;border-radius:50%;background:#3e9e2a}.desktop{position:absolute;inset:34px 0;background:linear-gradient(135deg,#f1ede4 0 52%,#e7efdc 52%)}.wallpaper{position:absolute;right:7%;bottom:13%;display:grid;text-align:right}.wallpaper span{color:#8c4c2e;font-size:9px;font-weight:900;letter-spacing:.15em}.wallpaper strong{font:700 clamp(20px,3vw,35px) Georgia,serif}.wallpaper small{margin-top:4px;color:#726a58;font-size:9px}.desktop-icons{position:relative;z-index:1;display:grid;grid-template-columns:repeat(2,92px);gap:12px;padding:22px}.desktop-icons button{display:grid;justify-items:center;gap:5px;min-height:90px;padding:8px;border:1px solid transparent;border-radius:10px;background:transparent;color:#241f16;cursor:pointer}.desktop-icons button:hover,.desktop-icons button:focus-visible{border-color:#a85a34;background:rgba(255,255,255,.55);outline:none}.desktop-icons button span{width:42px;height:42px}.desktop-icons b{font-size:9px}.window{position:absolute;inset:49px 14px 49px;border:1px solid #8f8776;border-radius:10px;overflow:hidden;background:#f1ede4;box-shadow:0 14px 28px rgba(36,31,22,.22)}.window-title{height:36px;display:flex;align-items:center;justify-content:space-between;padding:0 8px;background:#ece7dc;border-bottom:1px solid #d8d0be}.window-title>div{display:flex;align-items:center;gap:7px;font-size:10px}.window-mark{width:22px;height:22px}.window-title>button{width:28px;height:28px;border:0;border-radius:6px;background:transparent;color:#241f16;font-size:20px;cursor:pointer}.window-title>button:hover{background:#f7dcd6;color:#a02d1d}.app-content{height:calc(100% - 36px);box-sizing:border-box;padding:18px;overflow:auto}.app-kicker{margin:0 0 4px;color:#8c4c2e;font-size:8px;font-weight:900;letter-spacing:.14em}.app-content h3{margin:0 0 15px;font:700 22px Georgia,serif}.mission-list{display:grid;gap:8px}.mission-list article{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:10px 12px;border-left:4px solid #3e9e2a;background:#fff}.mission-list article.locked{border-left-color:#9e947e;background:#ece7dc}.mission-list article div{display:grid;gap:2px}.mission-list small{color:#8c4c2e;font-size:7px;font-weight:900;letter-spacing:.12em}.mission-list b{font-size:11px}.mission-list span{color:#726a58;font-size:8px}.mission-list em{padding:5px 7px;border-radius:999px;background:#e7efdc;color:#3c6427;font-size:7px;font-style:normal;font-weight:900}.mission-list .locked em{background:#d8d0be;color:#57503f}.app-heading{display:flex;align-items:flex-start;justify-content:space-between;gap:12px}.run{min-height:35px;padding:0 12px;border:0;border-radius:8px;background:#a85a34;color:#fff;font-size:9px;font-weight:900;cursor:pointer}.table-wrap{overflow-x:auto;border:1px solid #d8d0be}.feed-app table{width:100%;border-collapse:collapse;white-space:nowrap;background:#fff}.feed-app th,.feed-app td{padding:8px;border-bottom:1px solid #e4ddce;text-align:left;font-size:8px}.feed-app th{background:#ece7dc;color:#57503f}.feed-app tr{cursor:pointer}.feed-app tr.selected{background:#f2e4da}.feed-app tr.issue{background:#f7dcd6;color:#a02d1d;font-weight:900}.detail{display:flex;align-items:center;gap:10px;margin-top:12px;padding:10px;background:#ece7dc}.detail.warning{background:#f7dcd6}.asset-icon{display:block;flex:0 0 38px;width:38px;height:38px}.detail p{display:grid;gap:3px;margin:0}.detail b{font-size:10px}.detail span:not(.asset-icon){color:#57503f;font-size:8px;line-height:1.45}.dictionary-app dl{margin:0}.dictionary-app dl div{display:grid;grid-template-columns:150px 1fr;gap:12px;padding:11px 0;border-bottom:1px solid #d8d0be}.dictionary-app dt{font-size:9px;font-weight:900}.dictionary-app dd{margin:0;color:#57503f;font-size:9px}.checks-app ul{display:grid;gap:8px;margin:0;padding:0;list-style:none}.checks-app li{display:flex;align-items:center;gap:12px;padding:11px;background:#fff}.checks-app li.locked{opacity:.62;background:#ece7dc}.checks-app li>span:not(.asset-icon){display:grid;gap:3px}.checks-app li b{font-size:10px}.checks-app li small{color:#726a58;font-size:8px}.taskbar{position:absolute;right:0;bottom:0;left:0}.taskbar button{padding:0;border:0;background:transparent;cursor:pointer}.taskbar>span{margin-right:auto;margin-left:8px;color:#cfc6b4}.taskbar time{font-variant-numeric:tabular-nums}.stand{display:grid;justify-items:center}.stand:before{content:'';width:62px;height:44px;background:#241f16}.stand span{width:150px;height:12px;border-radius:8px 8px 2px 2px;background:#241f16}@media(max-width:620px){.bezel{padding:8px;border-radius:13px}.screen{min-height:500px;aspect-ratio:auto}.desktop-icons{grid-template-columns:repeat(2,minmax(78px,1fr));padding:18px}.wallpaper{right:5%;bottom:8%}.window{inset:44px 7px 43px}.app-content{padding:12px}.app-heading{align-items:stretch;flex-direction:column}.run{width:100%}.dictionary-app dl div{grid-template-columns:1fr;gap:4px}.system-status{display:none}.mission-list article{align-items:flex-start}.mission-list em{white-space:nowrap}.stand{display:none}}@media(prefers-reduced-motion:reduce){*{scroll-behavior:auto}}
  .mission-list article.prototype{border-left-color:#a85a34;background:#f2e4da}.mission-list a{padding:5px 7px;border-radius:999px;background:#a85a34;color:#fff;font-size:7px;font-weight:900;white-space:nowrap;text-decoration:none}.mission-list a:focus-visible{outline:2px solid #241f16;outline-offset:2px}
</style>
