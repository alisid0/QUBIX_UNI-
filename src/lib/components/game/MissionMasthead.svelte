<script>
  import SiteNav from '../SiteNav.svelte';

  export let eyebrow = '';
  export let title = '';
  export let roomId = '';
  export let roomName = '';
  export let progress = 0;
  export let meta = '';

  $: safeProgress = Math.max(0, Math.min(100, Number(progress) || 0));
</script>

<div class="masthead">
  <div class="nav-wrap"><SiteNav current="play" subjects={false} /></div>

  <header class="hero">
    <div class="copy">
      <p>{eyebrow}</p>
      <h1>{title}</h1>
      {#if meta}<span>{meta}</span>{/if}
    </div>

    {#if roomId && roomName}
      <a class="room" href={`?mode=game&mission=store&room=${roomId}`} aria-label={`Open ${roomName} on the Superstore map`}>
        <img src={`/rooms/${roomId}.webp`} alt="" loading="eager" />
        <span><small>WORK LOCATION</small><b>{roomName}</b><em>Open room →</em></span>
      </a>
    {/if}
  </header>

  <div class="progress" aria-label={`Mission ${Math.round(safeProgress)}% complete`}>
    <span style={`width:${safeProgress}%`}></span>
  </div>
</div>

<style>
  .masthead{--nav-ink:#20241f;--nav-soft:#62695f;--nav-rule:#c8c1b1;--nav-accent:#315f48;
            width:min(100%,1120px);margin-inline:auto;padding-inline:clamp(16px,5vw,56px);box-sizing:border-box}
  .hero{display:flex;align-items:end;justify-content:space-between;gap:32px;padding:44px 0 26px}
  .copy{min-width:0}
  .copy p{margin:0 0 8px;color:#b85530;font:900 11.5px var(--qx-font);letter-spacing:.14em;text-transform:uppercase}
  h1{max-width:780px;margin:0;color:#20241f;font:400 clamp(40px,6.2vw,68px)/.98 Georgia,serif;letter-spacing:-.035em;text-wrap:balance}
  .copy>span{display:block;margin-top:12px;color:#62695f;font:800 11.5px var(--qx-font);letter-spacing:.08em;text-transform:uppercase}
  .room{flex:0 0 260px;display:grid;grid-template-columns:112px 1fr;min-height:88px;border:1px solid #9c998d;
        background:#f7f3e9;color:#20241f;text-decoration:none;overflow:hidden;box-shadow:5px 5px 0 rgba(32,36,31,.12)}
  .room img{width:100%;height:100%;min-height:88px;object-fit:cover;object-position:center;image-rendering:auto;background:#ebe5d8}
  .room>span{display:flex;flex-direction:column;justify-content:center;padding:11px 12px}
  .room small{color:#b85530;font:900 11px var(--qx-font);letter-spacing:.13em}
  .room b{margin-top:3px;font:400 17px Georgia,serif}
  .room em{margin-top:8px;color:#315f48;font:800 11px var(--qx-font);font-style:normal;letter-spacing:.04em}
  .room:hover{border-color:#20241f}.room:focus-visible{outline:3px solid #315f48;outline-offset:3px}
  .progress{width:100%;height:5px;margin:0 0 28px;background:#c8c1b1;overflow:hidden}
  .progress span{display:block;height:100%;background:#315f48;transition:width .35s ease}
  @media(max-width:760px){.hero{align-items:start;flex-direction:column;padding-top:34px}.room{width:min(100%,330px);flex-basis:auto}.progress{margin-bottom:22px}}
  @media(max-width:520px){.masthead{padding-inline:16px}.hero{gap:20px;padding-bottom:20px}h1{font-size:43px}.room{grid-template-columns:96px 1fr;min-height:78px}.room img{min-height:78px}.room em{margin-top:5px}}
  @media(prefers-reduced-motion:reduce){.progress span{transition:none}}
</style>
