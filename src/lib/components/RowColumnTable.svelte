<script>
  // One table, with a row band and a column band that can be lit independently.
  //
  // Built for the Read the Table mission and reused verbatim by the row-column
  // figure in the session 2 briefing, so the picture a learner studies and the
  // thing they then operate are the same component. They cannot drift.
  //
  // Highlighting is never colour alone: a lit row and a lit column each carry a
  // border and a marker in the gutter as well, so the meaning survives colour
  // blindness, greyscale printing and a forced-colours mode.

  export let headers = [];
  export let rows = [];
  export let highlightRow = null;      // row index, or null
  export let highlightColumn = null;   // column index, or null
  export let caption = '';
  export let compact = false;

  $: litRow = Number.isInteger(highlightRow) ? highlightRow : null;
  $: litCol = Number.isInteger(highlightColumn) ? highlightColumn : null;

  // Spelled out for a screen reader, because a band of colour says nothing.
  $: description = [
    caption || `A table with ${rows.length} rows and ${headers.length} columns.`,
    litRow !== null ? `Row ${litRow + 1} is highlighted: ${rows[litRow]?.join(', ')}.` : '',
    litCol !== null ? `The ${headers[litCol]} column is highlighted, containing ${rows.map(r => r[litCol]).join(', ')}.` : ''
  ].filter(Boolean).join(' ');
</script>

<div class="rct" class:compact>
  <div class="scroll">
    <table role="img" aria-label={description}>
      <thead>
        <tr>
          <th class="gutter" aria-hidden="true"></th>
          {#each headers as head, c}
            <th class:lit={c === litCol}>{head}{#if c === litCol}<i aria-hidden="true">▾</i>{/if}</th>
          {/each}
        </tr>
      </thead>
      <tbody>
        {#each rows as row, r}
          <tr class:lit={r === litRow}>
            <td class="gutter" aria-hidden="true">{#if r === litRow}▸{/if}</td>
            {#each row as cell, c}
              <td class:lit-col={c === litCol} class:both={r === litRow && c === litCol}>{cell}</td>
            {/each}
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</div>

<style>
  .rct { --lit: #a85a34; --lit-soft: #f6e6db; --col: #3e9e2a; --col-soft: #e7f1e2; }
  .scroll { overflow-x: auto; }

  table { width: 100%; border-collapse: collapse; font: 600 14px var(--qx-font, system-ui); }
  .compact table { font-size: 13px; }

  /* Colour is set explicitly. Inheriting it left the cells a washed-out grey
     against cream, which was legible in the source and not on the screen. */
  th, td { padding: 9px 12px; text-align: left; white-space: nowrap;
           color: #241f16; border-bottom: 1px solid #e0d8c8; }
  tbody { background: #fff; }
  th { font: 800 11.5px var(--qx-font, system-ui); letter-spacing: .07em; text-transform: uppercase;
       color: #6d6558; border-bottom: 2px solid #241f16; }

  .gutter { width: 18px; padding: 9px 0 9px 4px; color: var(--lit); font-weight: 900; }

  /* A lit row: filled band, a rule top and bottom, and a marker in the gutter. */
  tr.lit td { background: var(--lit-soft); color: #241f16; font-weight: 800;
              border-top: 2px solid var(--lit); border-bottom: 2px solid var(--lit); }

  /* A lit column: filled band, a rule each side, and a caret under its heading. */
  th.lit { color: #2c6b1c; border-bottom-color: var(--col); }
  th.lit i { margin-left: 5px; font-style: normal; }
  td.lit-col, th.lit { background: var(--col-soft);
                       box-shadow: inset 2px 0 0 var(--col), inset -2px 0 0 var(--col); }

  /* Where they cross, both bands are visible rather than one winning. */
  td.both { background: #efe4cf; box-shadow: inset 2px 0 0 var(--col), inset -2px 0 0 var(--col); }

  @media (max-width: 620px) {
    th, td { padding: 8px 9px; }
    table { font-size: 13px; }
  }

  @media (forced-colors: active) {
    tr.lit td { border-top: 2px solid CanvasText; border-bottom: 2px solid CanvasText; }
    td.lit-col, th.lit { box-shadow: inset 2px 0 0 CanvasText, inset -2px 0 0 CanvasText; }
  }
</style>
