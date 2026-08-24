<script>
  import ComputerScreenSimulator from '../lib/components/game/ComputerScreenSimulator.svelte';
  import PixelAsset from '../lib/components/game/PixelAsset.svelte';

  const assets = [
    { kind: 'monitor', name: 'Operations monitor', use: 'Mission computer' },
    { kind: 'database', name: 'Data store', use: 'Tables and history' },
    { kind: 'folder', name: 'Governed folder', use: 'Definitions and files' },
    { kind: 'branch', name: 'Branch building', use: 'Business location' },
    { kind: 'feed', name: 'Branch feed', use: 'Incoming records' },
    { kind: 'alert', name: 'Quality alert', use: 'Traceable issue' },
    { kind: 'clipboard', name: 'Check sheet', use: 'Rules and evidence' },
    { kind: 'server', name: 'Platform server', use: 'System process' }
  ];
</script>

<svelte:head><title>Mission Operations Studio | Qubix University</title><meta name="description" content="Development-only Qubix mission computer and reusable 2D asset studio." /></svelte:head>

<section class="studio qx-shell">
  <header>
    <div><p>2D ASSET WORKSHOP · AI_DRAFT</p><h1>Mission Operations Studio</h1><span>Reusable interface layer for the Qubix Superstore learning world</span></div>
    <nav><a href="?mode=game&mission=foundations">Open role foundations</a><a href="?mode=game&mission=units-measurement">Open active mission</a><a href="?mode=wiki">Learning library</a></nav>
  </header>

  <main>
    <section class="simulator-panel">
      <div class="section-heading"><div><p>COMPUTER SCREEN SIMULATION</p><h2>Corporate HQ operations desk</h2></div><span>INTERACTIVE</span></div>
      <ComputerScreenSimulator />
    </section>

    <aside>
      <div class="section-heading"><div><p>REUSABLE 2D SET</p><h2>Workplace assets</h2></div><span>{assets.length} ASSETS</span></div>
      <p class="guidance">These deterministic SVG assets can be recoloured, animated and reused at any resolution. They carry no technical quantities or unapproved lesson content.</p>
      <div class="asset-grid">
        {#each assets as asset}
          <article><div><PixelAsset kind={asset.kind} label={asset.name} /></div><b>{asset.name}</b><span>{asset.use}</span></article>
        {/each}
      </div>
      <div class="boundary"><b>Curriculum boundary</b><p>Mission 006 remains the active AI draft. Mission 007 is an authoring-only prototype. Later mission entries remain locked interaction shells, not learner boards.</p></div>
    </aside>
  </main>
</section>

<style>
  :global(html),:global(body){overflow:auto;background:#171510}:global(body){position:static}.studio{min-height:100vh;max-width:none;padding:20px clamp(12px,3vw,36px) 34px;background:radial-gradient(circle at 42% 0,#3e3327,#171510 62%);color:#f1ede4;overflow:auto}header{max-width:1400px;margin:0 auto 18px;display:flex;align-items:end;justify-content:space-between;gap:20px}header p,.section-heading p{margin:0 0 5px;color:#d28a5e;font:900 12px var(--qx-font);letter-spacing:.13em}header h1{margin:0;font:700 30px Georgia,serif}header>div>span{display:block;margin-top:5px;color:#bcb19e;font:650 13.5px var(--qx-font)}nav{display:flex;gap:15px}nav a{color:#e2c7b7;font:800 13.5px var(--qx-font);text-decoration:none;border-bottom:1px solid currentColor;padding-bottom:3px}main{max-width:1400px;margin:auto;display:grid;grid-template-columns:minmax(0,1.45fr) minmax(330px,.55fr);gap:17px;align-items:start}.simulator-panel,aside{padding:18px;border:1px solid rgba(255,255,255,.12);border-radius:18px;background:#f1ede4;color:#241f16}.section-heading{display:flex;align-items:start;justify-content:space-between;gap:12px;margin-bottom:14px}.section-heading h2{margin:0;font:700 23px Georgia,serif}.section-heading>span{padding:6px 8px;border-radius:999px;background:#f2e4da;color:#8c4c2e;font:900 11.5px var(--qx-font);letter-spacing:.08em}.guidance{margin:0 0 15px;color:#57503f;font:650 13.5px/1.55 var(--qx-font)}.asset-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px}.asset-grid article{display:grid;justify-items:center;min-height:128px;padding:10px 8px;border:1px solid #e4ddce;border-radius:11px;background:#fff;text-align:center}.asset-grid article div{width:58px;height:58px}.asset-grid b{font:850 12px var(--qx-font)}.asset-grid span{color:#726a58;font:650 11.5px var(--qx-font)}.boundary{margin-top:14px;padding:12px;border-left:4px solid #a85a34;background:#f2e4da}.boundary b{font:900 13px var(--qx-font)}.boundary p{margin:4px 0 0;color:#57503f;font:650 12px/1.5 var(--qx-font)}@media(max-width:980px){main{grid-template-columns:1fr}aside{max-width:none}.asset-grid{grid-template-columns:repeat(4,minmax(0,1fr))}}@media(max-width:650px){.studio{padding:14px 9px 26px}header{align-items:flex-start;flex-direction:column}nav{flex-wrap:wrap}.simulator-panel,aside{padding:11px;border-radius:13px}.asset-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.section-heading h2{font-size:19px}}
</style>
