<script>
  import { keywordFor, keywordPath } from '../content/learning-keywords.js';

  export let sections = [];
  export let keywordIds = [];
  export let returnHref = '';

  const escapePattern = value => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

  function segmentParagraph(text, entries, seen) {
    let cursor = 0;
    const pieces = [];

    while (cursor < text.length) {
      let nearest = null;
      for (const entry of entries) {
        if (seen.has(entry.slug)) continue;
        const pattern = new RegExp(`\\b(${entry.aliases.map(escapePattern).join('|')})\\b`, 'i');
        const match = pattern.exec(text.slice(cursor));
        if (!match) continue;
        const index = cursor + match.index;
        if (!nearest || index < nearest.index) nearest = { entry, index, text: match[0] };
      }

      if (!nearest) {
        pieces.push({ text: text.slice(cursor), keyword: null });
        break;
      }
      if (nearest.index > cursor) pieces.push({ text: text.slice(cursor, nearest.index), keyword: null });
      pieces.push({ text: nearest.text, keyword: nearest.entry });
      seen.add(nearest.entry.slug);
      cursor = nearest.index + nearest.text.length;
    }
    return pieces;
  }

  function prepare(nextSections, ids) {
    const entries = ids.map(keywordFor).filter(Boolean);
    const seen = new Set();
    return {
      entries,
      sections: nextSections.map(section => ({
        ...section,
        paragraphs: section.paragraphs.map(paragraph => segmentParagraph(paragraph, entries, seen))
      }))
    };
  }

  $: prepared = prepare(sections, keywordIds);
</script>

{#if prepared.entries.length}
  <aside class="key-terms" aria-labelledby="key-terms-title">
    <div class="terms-heading"><span>KEY TERMS</span><b id="key-terms-title">Words worth keeping</b><small>Select a term for its Wiki explanation.</small></div>
    <div class="term-list">
      {#each prepared.entries as entry}
        <a href={keywordPath(entry.slug, returnHref)} title={`${entry.term}: ${entry.short}`}>
          <b>{entry.term}</b><span>{entry.short}</span><em>Wiki →</em>
        </a>
      {/each}
    </div>
  </aside>
{/if}

{#each prepared.sections as section}
  <section class="reading-section">
    <h3>{section.heading}</h3>
    {#each section.paragraphs as paragraph}
      <p>{#each paragraph as piece}{#if piece.keyword}<a class="keyword" href={keywordPath(piece.keyword.slug, returnHref)} title={`${piece.keyword.term}: ${piece.keyword.short}`}>{piece.text}<span aria-hidden="true">↗</span></a>{:else}{piece.text}{/if}{/each}</p>
    {/each}
    {#if section.images?.length}
      <div class="section-art" class:pair={section.images.length > 1}>
        {#each section.images as art}
          <figure>
            <img src={art.src} alt={art.alt} width="720" height="1280" loading="lazy" decoding="async" />
            {#if art.caption}<figcaption>{art.caption}</figcaption>{/if}
          </figure>
        {/each}
      </div>
    {/if}
  </section>
{/each}

<style>
  /* Drawn frames are 9:16, so at the full width of a reading column one would
     stand about 1,400px tall and push the text off the screen. They are sized
     by height instead and sit centred, which is also why two of them fit side
     by side when a section carries a pair. */
  .section-art { display: flex; justify-content: center; gap: 14px; margin: 22px 0 6px; }
  .section-art figure { margin: 0; flex: 0 1 auto; max-width: 100%; }
  .section-art img {
    display: block; width: auto; height: auto; max-height: 420px; max-width: 100%;
    border: 2px solid #241f16; background: #f1ede4;
  }
  .section-art.pair img { max-height: 340px; }
  .section-art figcaption {
    margin-top: 7px; max-width: 26ch;
    color: #6d6558; font: 600 12.5px/1.45 var(--qx-font);
  }
  @media (max-width: 620px) {
    .section-art { flex-direction: column; align-items: center; }
    .section-art img, .section-art.pair img { max-height: 360px; }
    .section-art figcaption { max-width: none; text-align: center; }
  }

  .key-terms { margin: 22px 0 32px; border: 4px solid #241f16; background: #f7f3e9; box-shadow: 7px 7px 0 rgba(36,31,22,.14); }
  .terms-heading { padding: 16px 18px; display: grid; grid-template-columns: auto 1fr; gap: 2px 12px; align-items: baseline; border-bottom: 1px solid #cfc6b4; }
  .terms-heading span { color: #8c4c2e; font: 900 11px var(--qx-font); letter-spacing: .14em; }
  .terms-heading b { font: 700 17px Georgia, serif; }
  .terms-heading small { grid-column: 2; color: #6d6558; font: 500 12.5px/1.4 var(--qx-font); }
  .term-list { display: grid; grid-template-columns: repeat(2, minmax(0,1fr)); }
  .term-list a { min-height: 88px; padding: 14px 16px; display: grid; grid-template-columns: 1fr auto; gap: 5px 12px; color: #241f16; text-decoration: none; border-right: 1px solid #cfc6b4; border-bottom: 1px solid #cfc6b4; }
  .term-list a:nth-child(2n) { border-right: 0; }
  .term-list a:hover, .term-list a:focus-visible { background: #eef1e9; outline: 3px solid #5f7355; outline-offset: -3px; }
  .term-list b { font: 800 14px var(--qx-font); }
  .term-list span { grid-column: 1 / -1; color: #625a49; font: 500 13px/1.4 var(--qx-font); }
  .term-list em { grid-column: 2; grid-row: 1; color: #4e6548; font: 900 11px var(--qx-font); font-style: normal; letter-spacing: .05em; }
  .reading-section { margin-top: 30px; }
  .reading-section h3 { margin: 0 0 10px; color: #241f16; font: 700 22px/1.2 Georgia, serif; }
  .reading-section p { margin: 0 0 14px; color: #403a30; font: 400 16px/1.72 var(--qx-font); }
  .keyword { display: inline; padding: 1px 3px 2px; color: #274f3c; font-weight: 800; text-decoration-line: underline; text-decoration-color: #7d9a76; text-decoration-thickness: 2px; text-underline-offset: 3px; background: #e7eee3; border-radius: 2px; }
  .keyword span { margin-left: 2px; font-size: .68em; vertical-align: top; }
  .keyword:hover, .keyword:focus-visible { color: #fff; background: #315f48; outline: 2px solid #315f48; outline-offset: 1px; }
  @media (max-width: 600px) {
    .key-terms { box-shadow: 5px 5px 0 rgba(36,31,22,.14); }
    .terms-heading { grid-template-columns: 1fr; }
    .terms-heading small { grid-column: 1; }
    .term-list { grid-template-columns: 1fr; }
    .term-list a, .term-list a:nth-child(2n) { border-right: 0; }
  }
</style>
