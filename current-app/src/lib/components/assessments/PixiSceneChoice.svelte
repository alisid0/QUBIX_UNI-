<script>
  import { onDestroy, onMount } from 'svelte';

  export let mode = 'growth';
  export let scene = 'exponential';
  export let prompt = 'Read the animated scene.';
  export let options = [];
  export let correctOption = '';
  export let correctFeedback = 'Correct.';
  export let incorrectFeedback = 'Not yet. Watch what the motion is showing.';
  export let onDone = () => {};

  let host;
  let app;
  let ticker;
  let resizeObserver;
  let selected = null;
  let submitted = false;
  let correct = false;
  let shuffledOptions = [];
  let optionsKey = '';

  const palette = {
    ink: 0x252638,
    muted: 0x6f7484,
    accent: 0x4c6fff,
    green: 0x35a85a,
    yellow: 0xf1b94e,
    coral: 0xe56b6f,
    blueSoft: 0xdde7ff,
    panel: 0xf8f8fb,
    wire: 0x353849
  };

  function shuffle(list = []) {
    const shuffled = [...list];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  function choose(id) {
    if (submitted) return;
    selected = id;
  }

  function submit() {
    correct = selected === correctOption;
    submitted = true;
  }

  function finish() {
    onDone(correct ? 1 : 0, 1);
  }

  function drawRect(graphics, x, y, width, height, color, radius = 0) {
    if (graphics.roundRect && radius) {
      graphics.roundRect(x, y, width, height, radius).fill(color);
      return;
    }
    if (graphics.rect) {
      graphics.rect(x, y, width, height).fill(color);
      return;
    }
    graphics.beginFill(color);
    graphics.drawRect(x, y, width, height);
    graphics.endFill();
  }

  function drawCircle(graphics, x, y, radius, color) {
    if (graphics.circle) {
      graphics.circle(x, y, radius).fill(color);
      return;
    }
    graphics.beginFill(color);
    graphics.drawCircle(x, y, radius);
    graphics.endFill();
  }

  function drawLine(graphics, points, color, width = 4) {
    if (graphics.moveTo && graphics.stroke) {
      graphics.moveTo(points[0][0], points[0][1]);
      for (const point of points.slice(1)) graphics.lineTo(point[0], point[1]);
      graphics.stroke({ color, width, cap: 'round', join: 'round' });
      return;
    }
    graphics.lineStyle(width, color);
    graphics.moveTo(points[0][0], points[0][1]);
    for (const point of points.slice(1)) graphics.lineTo(point[0], point[1]);
  }

  function clearStage() {
    if (!app?.stage) return;
    app.stage.removeChildren();
    if (ticker) {
      app.ticker.remove(ticker);
      ticker = null;
    }
  }

  function drawGrowth(pixi) {
    clearStage();
    const { Graphics } = pixi;
    const width = app.renderer.width;
    const height = app.renderer.height;
    const root = new Graphics();
    const bars = scene === 'linear'
      ? [2, 4, 6, 8, 10]
      : scene === 'decay'
        ? [16, 8, 4, 2, 1]
        : [1, 2, 4, 8, 16];
    const max = Math.max(...bars);
    const gap = 12;
    const barWidth = Math.max(28, (width - gap * (bars.length + 1)) / bars.length);
    const baseY = height - 28;
    drawLine(root, [[12, baseY], [width - 12, baseY]], palette.muted, 2);

    bars.forEach((value, index) => {
      const x = gap + index * (barWidth + gap);
      const h = Math.max(20, (value / max) * (height - 66));
      const color = scene === 'decay' ? palette.coral : index > 2 ? palette.green : palette.accent;
      drawRect(root, x, baseY - h, barWidth, h, color, 7);
      drawCircle(root, x + barWidth / 2, baseY - h - 9, 5, palette.yellow);
    });

    let phase = 0;
    ticker = () => {
      phase += 0.045;
      root.alpha = 0.92 + Math.sin(phase) * 0.08;
    };
    app.stage.addChild(root);
    app.ticker.add(ticker);
  }

  function drawCircuit(pixi) {
    clearStage();
    const { Graphics } = pixi;
    const width = app.renderer.width;
    const height = app.renderer.height;
    const circuit = new Graphics();
    const dots = new Graphics();
    const top = 54;
    const bottom = height - 54;
    const left = 34;
    const right = width - 34;

    drawRect(circuit, left - 16, height / 2 - 22, 22, 44, palette.yellow, 4);
    drawCircle(circuit, left - 5, height / 2 - 10, 4, palette.ink);
    drawCircle(circuit, left - 5, height / 2 + 10, 4, palette.ink);

    if (scene === 'parallel') {
      drawLine(circuit, [[left, height / 2], [left + 34, height / 2], [left + 34, top], [right - 34, top], [right - 34, height / 2], [right, height / 2]], palette.wire, 5);
      drawLine(circuit, [[left + 34, height / 2], [left + 34, bottom], [right - 34, bottom], [right - 34, height / 2]], palette.wire, 5);
      drawCircle(circuit, right + 2, top, 12, palette.blueSoft);
      drawCircle(circuit, right + 2, bottom, 12, palette.blueSoft);
      drawCircle(circuit, right + 2, top, 5, palette.accent);
      drawCircle(circuit, right + 2, bottom, 5, palette.accent);
    } else {
      drawLine(circuit, [[left, height / 2], [left + 50, height / 2], [left + 50, top], [right - 46, top], [right - 46, height / 2], [right, height / 2]], palette.wire, 5);
      drawCircle(circuit, width * 0.46, top, 12, palette.blueSoft);
      drawCircle(circuit, width * 0.68, top, 12, palette.blueSoft);
      drawCircle(circuit, width * 0.46, top, 5, palette.accent);
      drawCircle(circuit, width * 0.68, top, 5, palette.accent);
    }

    function pathPoint(t) {
      if (scene === 'parallel') {
        const branch = t % 1 < 0.5 ? top : bottom;
        const p = (t * 2) % 1;
        const x = left + 42 + p * (right - left - 84);
        return [x, branch];
      }
      const x = left + 50 + (t % 1) * (right - left - 96);
      return [x, top];
    }

    let time = 0;
    ticker = (frame) => {
      time += frame.deltaTime * 0.018;
      dots.clear();
      for (let i = 0; i < 7; i++) {
        const [x, y] = pathPoint(time + i / 7);
        drawCircle(dots, x, y, 5, palette.green);
      }
    };

    app.stage.addChild(circuit);
    app.stage.addChild(dots);
    app.ticker.add(ticker);
  }

  function drawBond(pixi) {
    clearStage();
    const { Graphics } = pixi;
    const width = app.renderer.width;
    const height = app.renderer.height;
    const bond = new Graphics();
    const electrons = new Graphics();
    const midY = height / 2;
    const leftX = width * 0.34;
    const rightX = width * 0.66;

    drawCircle(bond, leftX, midY, 34, palette.blueSoft);
    drawCircle(bond, rightX, midY, 34, palette.blueSoft);
    drawCircle(bond, leftX, midY, 16, palette.accent);
    drawCircle(bond, rightX, midY, 16, scene === 'ionic' ? palette.coral : palette.green);

    if (scene === 'ionic') {
      drawLine(bond, [[leftX + 46, midY], [rightX - 46, midY]], palette.coral, 3);
      drawCircle(bond, rightX - 8, midY - 42, 6, palette.yellow);
    } else if (scene === 'metallic') {
      for (let x = width * 0.24; x <= width * 0.76; x += 32) {
        drawCircle(bond, x, midY - 46, 5, palette.yellow);
        drawCircle(bond, x + 12, midY + 46, 5, palette.yellow);
      }
    } else {
      drawLine(bond, [[leftX + 24, midY], [rightX - 24, midY]], palette.wire, 5);
    }

    let phase = 0;
    ticker = (frame) => {
      phase += frame.deltaTime * 0.05;
      electrons.clear();
      if (scene === 'ionic') {
        const x = leftX + 50 + ((Math.sin(phase) + 1) / 2) * (rightX - leftX - 100);
        drawCircle(electrons, x, midY - 4, 6, palette.yellow);
      } else if (scene === 'metallic') {
        for (let i = 0; i < 8; i++) {
          const x = width * 0.2 + ((phase * 18 + i * 38) % (width * 0.6));
          drawCircle(electrons, x, midY + Math.sin(phase + i) * 34, 5, palette.yellow);
        }
      } else {
        drawCircle(electrons, width / 2 + Math.cos(phase) * 16, midY - 18, 6, palette.yellow);
        drawCircle(electrons, width / 2 + Math.cos(phase + Math.PI) * 16, midY + 18, 6, palette.yellow);
      }
    };

    app.stage.addChild(bond);
    app.stage.addChild(electrons);
    app.ticker.add(ticker);
  }

  function drawScene(pixi) {
    if (!app) return;
    if (mode === 'circuit') {
      drawCircuit(pixi);
    } else if (mode === 'bond') {
      drawBond(pixi);
    } else {
      drawGrowth(pixi);
    }
  }

  onMount(async () => {
    const pixi = await import('pixi.js');
    app = new pixi.Application();
    await app.init({
      width: Math.max(300, host.clientWidth || 360),
      height: 210,
      antialias: true,
      autoDensity: true,
      resolution: Math.min(window.devicePixelRatio || 1, 2),
      backgroundColor: palette.panel,
      backgroundAlpha: 1
    });
    app.canvas.setAttribute('aria-hidden', 'true');
    host.appendChild(app.canvas);
    drawScene(pixi);

    resizeObserver = new ResizeObserver(() => {
      const nextWidth = Math.max(300, host.clientWidth || 360);
      app.renderer.resize(nextWidth, 210);
      drawScene(pixi);
    });
    resizeObserver.observe(host);
  });

  onDestroy(() => {
    if (ticker && app) app.ticker.remove(ticker);
    resizeObserver?.disconnect();
    app?.destroy(true, { children: true, texture: true });
  });

  $: {
    const nextKey = options.map((option) => option.id).join('|');
    if (nextKey !== optionsKey) {
      optionsKey = nextKey;
      shuffledOptions = shuffle(options);
      selected = null;
      submitted = false;
      correct = false;
    }
  }
</script>

<div class="pixi-choice">
  <div class="prompt">{prompt}</div>
  <div class="scene" bind:this={host}></div>

  <div class="options">
    {#each shuffledOptions as opt}
      <button
        class:selected={selected === opt.id}
        class:right={submitted && opt.id === correctOption}
        class:wrong={submitted && selected === opt.id && opt.id !== correctOption}
        on:click={() => choose(opt.id)}
      >
        <span>{opt.label}</span>
        {#if opt.note}<small>{opt.note}</small>{/if}
      </button>
    {/each}
  </div>

  {#if !submitted}
    <button class="submit-btn" disabled={!selected} on:click={submit}>Check scene</button>
  {:else}
    <div class="feedback" class:correct={correct} class:incorrect={!correct}>
      {correct ? correctFeedback : incorrectFeedback}
    </div>
    <button class="continue-btn" on:click={finish}>Continue</button>
  {/if}
</div>

<style>
  .pixi-choice {
    width: 100%;
    max-width: 390px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 14px;
  }

  .prompt {
    color: var(--qx-text);
    font-size: 15px;
    font-weight: 780;
    line-height: 1.42;
    text-align: center;
  }

  .scene {
    width: 100%;
    height: 210px;
    overflow: hidden;
    border: 1.5px solid var(--qx-border);
    border-radius: 8px;
    background: var(--qx-surface-2);
  }

  .scene :global(canvas) {
    display: block;
    width: 100%;
    height: 210px;
  }

  .options {
    width: 100%;
    display: grid;
    gap: 8px;
  }

  .options button {
    min-height: 48px;
    border-radius: 8px;
    border: 1.5px solid var(--qx-border-2);
    background: var(--qx-surface);
    color: var(--qx-text);
    font-family: var(--qx-font);
    cursor: pointer;
    text-align: left;
    padding: 10px 12px;
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .options button span {
    font-size: 14px;
    font-weight: 850;
  }

  .options button small {
    color: var(--qx-text-faint);
    font-size: 11px;
    font-weight: 650;
  }

  .options button.selected {
    border-color: var(--qx-accent);
    background: var(--qx-accent-soft);
    color: var(--qx-accent-text);
  }

  .options button.right {
    border-color: var(--qx-green);
    background: var(--qx-green-soft);
    color: var(--qx-green-text);
  }

  .options button.wrong {
    border-color: var(--qx-danger);
    background: var(--qx-danger-soft);
    color: var(--qx-danger-text);
  }

  .submit-btn,
  .continue-btn {
    min-height: 42px;
    width: 100%;
    border-radius: 999px;
    border: none;
    background: var(--qx-accent);
    color: #fff;
    font-family: var(--qx-font);
    font-size: 14px;
    font-weight: 850;
    cursor: pointer;
  }

  .submit-btn:disabled {
    opacity: 0.45;
    cursor: default;
  }

  .feedback {
    width: 100%;
    box-sizing: border-box;
    padding: 12px;
    border-radius: 8px;
    font-size: 13px;
    font-weight: 720;
    line-height: 1.45;
    text-align: center;
  }

  .feedback.correct {
    background: var(--qx-green-soft);
    color: var(--qx-green-text);
  }

  .feedback.incorrect {
    background: var(--qx-danger-soft);
    color: var(--qx-danger-text);
  }
</style>
