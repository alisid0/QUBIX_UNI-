<script>
  // One real purchase, recorded two ways.
  //
  // The event sits at the top. Underneath, the same checkout as one purchase
  // row on the left and as three product-line rows on the right, each table
  // labelled with what one of its rows represents.
  //
  // Shared by the session 3 figure and the Name the Grain mission, so the
  // picture a learner studies and the thing they answer questions about are
  // one component.
  //
  // There is no receipt spike here and nothing suggesting that counting
  // receipts differs from counting completed sales. In an ordinary shop it does
  // not, and an earlier drawing that implied otherwise argued against the
  // lesson it was illustrating.

  export let event = { title: 'One purchase', detail: '3 products · paid once' };
  export let left = { name: 'purchase', rows: 1, label: 'One row represents one completed purchase.' };
  export let right = { name: 'purchased_items', rows: 3, label: 'One row represents one product line within a purchase.' };
  export let items = ['Oat milk 1L', 'Rye loaf', 'Tinned tomatoes'];
  export let highlight = null;   // 'left' | 'right' | null

  const bars = n => Array.from({ length: n }, (_, i) => i);
</script>

<figure class="grain">
  <div class="event" role="img"
       aria-label={`${event.title}: ${event.detail}. ${items.join(', ')}.`}>
    <span class="tag">ONE REAL EVENT</span>
    <b>{event.title}</b>
    <small>{event.detail}</small>
    <ul class="items">{#each items as item}<li>{item}</li>{/each}</ul>
  </div>

  <div class="down" aria-hidden="true"><i></i><i></i></div>

  <div class="tables">
    <div class="table" class:lit={highlight === 'left'}>
      <span class="tag">{left.name}</span>
      <b>{left.rows} {left.rows === 1 ? 'row' : 'rows'}</b>
      <div class="bars" aria-hidden="true">{#each bars(left.rows) as _}<i></i>{/each}</div>
      <p>{left.label}</p>
    </div>
    <div class="table" class:lit={highlight === 'right'}>
      <span class="tag">{right.name}</span>
      <b>{right.rows} {right.rows === 1 ? 'row' : 'rows'}</b>
      <div class="bars" aria-hidden="true">{#each bars(right.rows) as _}<i></i>{/each}</div>
      <p>{right.label}</p>
    </div>
  </div>
</figure>

<style>
  .grain { margin: 0; display: grid; justify-items: center; gap: 0; }

  .tag { font: 900 11px var(--qx-font, system-ui); letter-spacing: .11em;
         text-transform: uppercase; color: #8c4c2e; }

  .event { min-width: 250px; max-width: 340px; padding: 14px 20px; text-align: center;
           display: grid; justify-items: center; gap: 3px;
           border: 3px solid #241f16; border-radius: 12px; background: #f6e6db;
           box-shadow: 5px 5px 0 rgba(32, 36, 31, .14); }
  .event b { font: 700 21px Georgia, serif; color: #241f16; }
  .event small { color: #6d6558; font: 600 12.5px var(--qx-font, system-ui); }

  .items { display: flex; flex-wrap: wrap; justify-content: center; gap: 5px;
           margin: 8px 0 0; padding: 0; list-style: none; }
  .items li { padding: 3px 9px; border: 1px solid #c9bda6; border-radius: 20px;
              background: #fffdf7; color: #4a4436;
              font: 600 11.5px var(--qx-font, system-ui); }

  .down { display: flex; gap: 46px; height: 26px; }
  .down i { width: 2px; background: #241f16; position: relative; }
  .down i::after { content: ''; position: absolute; bottom: 0; left: -4px;
                   border: 5px solid transparent; border-top-color: #241f16; }

  .tables { width: 100%; display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
  .table { padding: 14px; display: grid; justify-items: start; gap: 4px;
           border: 2px solid #cbbfa6; border-radius: 10px; background: #fff; }
  .table.lit { border-color: #a85a34; box-shadow: 0 0 0 3px #f6e6db; }
  .table b { font: 800 17px var(--qx-font, system-ui); color: #241f16; }
  .table p { margin: 6px 0 0; color: #4a4436;
             font: 650 12.5px/1.45 var(--qx-font, system-ui); }

  .bars { display: flex; flex-wrap: wrap; gap: 4px; margin-top: 4px; }
  .bars i { display: block; width: 24px; height: 9px; border-radius: 2px; background: #c98c5e; }

  /* At phone width the two tables stack, and the arrows become one. */
  @media (max-width: 620px) {
    .tables { grid-template-columns: 1fr; }
    .down { gap: 0; }
    .event { min-width: 0; width: 100%; }
  }

  @media (forced-colors: active) {
    .table.lit { border-color: CanvasText; }
    .bars i { background: CanvasText; }
  }
</style>
