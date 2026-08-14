<script>
  export let formula = '';
  export let gloss = '';
</script>

<div class="formula">
  {@html formula}
  {#if gloss}
    <span class="gloss">{gloss}</span>
  {/if}
</div>

<style>
  .formula {
    font-family: var(--hand);
    font-weight: 700;
    font-size: clamp(19px, 2.9vw, 25px);
    color: #fff;
    background: rgba(0, 0, 0, 0.22);
    border: 1.5px dashed var(--chalk-green);
    padding: 14px 18px;
    margin: 18px 0;
    border-radius: var(--radius-sm);
    line-height: 1.45;
    transform: rotate(-0.4deg);
    box-shadow: 0 2px 0 rgba(0, 0, 0, 0.2);
  }
  .gloss {
    display: block;
    font-family: var(--hand);
    font-weight: 400;
    font-size: 0.72em;
    color: var(--chalk-dim);
    margin-top: 7px;
    font-style: normal;
  }
</style>
