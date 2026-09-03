<script>
  import { onMount } from 'svelte';
  import { supabase, supabaseConfigured } from '../supabase.js';
  import { FREE_ITEMS, canOpen, clearAllowance, openedItems, recordOpen } from '../access.js';

  // One chokepoint for the registration wall.
  //
  // Wrapping the route in App.svelte rather than patching each mission view
  // means there is a single place where the rule lives, and a new mission is
  // covered by existing behaviour instead of by remembering.

  export let itemId = null;

  // 'checking' until the session is known. Rendering the wall before that
  // would flash it at signed-in learners on every page load, which reads as the
  // account not working.
  let state = 'checking';
  let used = 0;

  onMount(() => {
    if (!itemId || !supabaseConfigured) { state = 'open'; return; }

    let mounted = true;
    const decide = session => {
      if (!mounted) return;
      if (session?.user) {
        // An account removes the limit. Clearing the count means a later sign
        // out returns them to a fresh allowance rather than a wall they cannot
        // explain and cannot pass by signing in again.
        clearAllowance();
        state = 'open';
        return;
      }
      used = openedItems().length;
      if (canOpen(itemId)) {
        recordOpen(itemId);
        state = 'open';
      } else {
        state = 'walled';
      }
    };

    supabase.auth.getSession().then(({ data }) => decide(data?.session));
    const { data } = supabase.auth.onAuthStateChange((_event, session) => decide(session));
    return () => { mounted = false; data.subscription.unsubscribe(); };
  });

  $: remaining = Math.max(0, FREE_ITEMS - used);
</script>

{#if state === 'open'}
  <slot />
{:else if state === 'walled'}
  <div class="gate-page">
    <div class="panel">
      <p class="eyebrow">You have opened your {FREE_ITEMS} free lessons</p>
      <h1>Keep going with a free account.</h1>
      <p class="lede">Qubix is free to learn. An account is how your progress is
        saved and how the tutor knows what you are working on.</p>

      <ul>
        <li>Every chapter, mission and workshop, with no further limit</li>
        <li>Ask Qubix, the tutor that answers questions about the lesson</li>
        <li>Progress that follows you to your phone and back</li>
      </ul>

      <div class="actions">
        <a class="primary" href="/signin">Create a free account</a>
        <a class="secondary" href="/signin">I already have one</a>
      </div>

      <p class="fine">Free, and you can delete the account and everything in it
        from the account menu at any time. Qubix is for learners aged 13 and
        over.</p>

      {#if remaining > 0}
        <p class="fine">You have {remaining} of {FREE_ITEMS} left.</p>
      {/if}
    </div>
  </div>
{/if}

<style>
  :global(.qubix-university){height:auto!important;overflow:visible!important}
  :global(html),:global(body),:global(#app){height:auto!important;min-height:100%!important;overflow:visible!important}
  :global(body){position:static!important;overscroll-behavior:auto!important}
  .gate-page{--ink:#241f16;--soft:#6d6558;--rule:#cfc5b0;--paper:#f6f1e8;--card:#fffdf8;--green:#315f48;--clay:#b65c32;min-height:100vh;display:grid;place-items:center;padding:40px 18px;background:var(--paper);color:var(--ink);font-family:var(--qx-font)}
  .panel{width:min(560px,100%);padding:38px;border:3px solid var(--ink);background:var(--card);box-shadow:8px 8px 0 rgba(36,31,22,.15)}
  .eyebrow{margin:0 0 10px;color:var(--clay);font-weight:900;font-size:11px;letter-spacing:.13em;text-transform:uppercase}
  h1{margin:0 0 14px;font:500 clamp(28px,4.4vw,40px)/1.03 Georgia,serif;letter-spacing:-.03em}
  .lede{margin:0 0 20px;font:18px/1.5 Georgia,serif;color:var(--ink)}
  ul{margin:0 0 26px;padding-left:20px;display:grid;gap:9px;color:var(--soft);font-size:15px;line-height:1.5}
  .actions{display:flex;flex-wrap:wrap;gap:12px}
  .primary,.secondary{display:inline-flex;align-items:center;justify-content:center;min-height:50px;padding:12px 22px;border:3px solid var(--ink);font-weight:900;font-size:15px;text-decoration:none}
  .primary{background:var(--green);color:#fff;box-shadow:4px 4px 0 rgba(36,31,22,.2)}
  .primary:hover{transform:translate(1px,1px);box-shadow:3px 3px 0 rgba(36,31,22,.2)}
  .secondary{background:transparent;color:var(--ink)}
  .secondary:hover{background:#efeadf}
  a:focus-visible{outline:3px solid var(--clay);outline-offset:3px}
  .fine{margin:20px 0 0;color:var(--soft);font-size:13px;line-height:1.5}
  @media(max-width:540px){.panel{padding:24px 20px;border-width:2px}.actions>*{width:100%}}
</style>
