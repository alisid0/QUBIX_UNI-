<script>
  import { onMount, onDestroy } from 'svelte';

  // spec: { xRange: [xMin, yMin, xMax, yMax], points: [...], lines: [...] }
  export let spec = {};

  let container;
  let ggbApplet;
  let loaded = false;
  let failed = false;

  const GGB_SCRIPT = 'https://www.geogebra.org/apps/deployggb.js';

  function loadScript(src) {
    return new Promise((resolve, reject) => {
      if (window.GGBApplet) return resolve();
      const s = document.createElement('script');
      s.src = src; s.async = true;
      s.onload = resolve;
      s.onerror = () => reject(new Error('GeoGebra script failed'));
      document.head.appendChild(s);
    });
  }

  function buildCommands() {
    const cmds = [];
    const [xMin, xMax] = spec.xRange || [-5, 5];
    const [yMin, yMax] = spec.yRange || [-5, 5];

    // Each point
    for (const p of spec.points || []) {
      if (p.label) {
        cmds.push(`${p.label.replace(/[^A-Za-z0-9]/g,'')} = (${p.x}, ${p.y})`);
      } else {
        cmds.push(`(${p.x}, ${p.y})`);
      }
    }

    // Each line
    for (const l of spec.lines || []) {
      if (l.x1 !== undefined) {
        cmds.push(`Segment((${l.x1},${l.y1}),(${l.x2},${l.y2}))`);
      } else if (l.m !== undefined) {
        cmds.push(`f(x)=${l.m}*x+${l.c ?? 0}`);
      }
    }

    // Segments
    for (const s of spec.segments || []) {
      cmds.push(`Segment((${s.x1},${s.y1}),(${s.x2},${s.y2}))`);
    }

    // Set view
    cmds.push(`ZoomIn(${xMin},${yMin},${xMax},${yMax})`);

    return cmds.join('\n');
  }

  onMount(async () => {
    try {
      await loadScript(GGB_SCRIPT);
    } catch (e) {
      failed = true;
      return;
    }

    const params = {
      appName: 'graphing',
      width: 420, height: 420,
      showToolBar: false,
      showAlgebraInput: false,
      showMenuBar: false,
      showResetIcon: false,
      enableLabelDrags: false,
      enableShiftDragZoom: true,
      enableRightClick: false,
      showZoomButtons: false,
      enableCAS: false,
      borderColor: '#d4d8dd',
      perspective: 'G',
      scaleContainerClass: 'ggb-container',
      appletOnLoad(api) {
        ggbApplet = api;
        api.setPerspective('G');
        try {
          api.evalCommand(buildCommands());
        } catch (_) {}
        loaded = true;
      }
    };

    const applet = new window.GGBApplet(params, true);
    applet.inject(container);
  });

  onDestroy(() => {
    if (ggbApplet && typeof ggbApplet.remove === 'function') {
      try { ggbApplet.remove(); } catch (_) {}
    }
    ggbApplet = null;
  });
</script>

<div class="ggb-wrap">
  {#if failed}
    <div class="ggb-fallback">Could not load graphing calculator.</div>
  {:else}
    <div bind:this={container} class="ggb-container" class:loaded></div>
  {/if}
</div>

<style>
  .ggb-wrap {
    width: 100%;
    border-radius: 8px;
    overflow: hidden;
    border: 1px solid #d4d8dd;
    background: #fff;
  }
  .ggb-container {
    width: 100%;
    aspect-ratio: 1;
  }
  .ggb-container.loaded { min-height: 320px; }
  .ggb-fallback {
    display: flex; align-items: center; justify-content: center;
    height: 280px; color: var(--qx-text-faint); font-size: 14px;
  }
</style>
