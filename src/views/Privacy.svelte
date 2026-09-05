<script>
  // The privacy policy.
  //
  // Written from docs/DATA-INVENTORY.md and then checked against the code,
  // because the inventory had drifted in two places: it lists deletion as "a
  // queue not processed by anything", which migration 0003 fixed, and it does
  // not mention OpenAI at all, which has been a processor since the tutor
  // shipped. Both are corrected here and the inventory needs the same edit.
  //
  // Publishing this does not switch marketing email on. PRIVACY_POLICY_VERSION
  // in src/lib/legal.js is still null, so the opt-in does not render and
  // grantConsent refuses. Setting it is a founder decision taken after reading
  // this page, and check-auth fails the build if it is set while no policy is
  // published.
  import SiteNav from '../lib/components/SiteNav.svelte';
  import SiteFooter from '../lib/components/SiteFooter.svelte';
  import { MINIMUM_AGE } from '../lib/legal.js';

  const UPDATED = '5 September 2026';
</script>

<svelte:head>
  <title>Privacy · Qubix University</title>
  <meta name="description" content="What Qubix University collects, why, who else sees it, and how to have it deleted." />
</svelte:head>

<div class="policy-page">
  <div class="wrap">
    <SiteNav subjects={false} />

    <header>
      <p class="eyebrow">Qubix University</p>
      <h1>Privacy</h1>
      <p class="lede">What we collect, why we have it, who else sees it, and how to make us delete it.</p>
      <p class="stamp">Last updated {UPDATED}</p>
    </header>

    <main>
      <section>
        <h2>The short version</h2>
        <p>You can read and use Qubix without an account, and we do not ask who you
          are. If you make an account we hold your email address and your learning
          progress, so that your place follows you between devices. You can delete
          the account and everything in it yourself, from the account menu, and it
          is erased rather than queued.</p>
        <p>Qubix is for learners aged {MINIMUM_AGE} and over.</p>
      </section>

      <section>
        <h2>What we collect</h2>

        <h3>If you sign in</h3>
        <p>There are two ways in, and they collect different amounts.</p>
        <ul>
          <li><b>Email and password.</b> Your email address, and a password we never
            see in readable form. Supabase stores it hashed.</li>
          <li><b>Google.</b> Your email address, your display name, your avatar image
            address, and the account identifier Google uses to recognise you. We
            receive these from Google only at the moment you choose to sign in that
            way, and we ask for nothing else from your Google account.</li>
        </ul>

        <h3>Your learning progress</h3>
        <p>One record per learner, holding where you had reached, which steps you
          finished, and, per check, how many tries it took and whether you were right
          first time. Nobody but you can read it. That is enforced by the database
          rather than by our code being careful.</p>

        <h3>A record that you asked to be deleted</h3>
        <p>When you delete your account we keep one row saying a deletion was asked
          for and honoured, and the date. It holds no personal detail. It exists so
          we can show the request was carried out.</p>

        <h3>Things that never leave your device</h3>
        <p>Your workbook notes, which door you chose on the learning floor, how many
          free lessons you have opened, and your theme. These sit in your browser.
          They are not sent to us and clearing your browser data removes them.</p>
      </section>

      <section>
        <h2>Who else sees it</h2>
        <table>
          <thead><tr><th>Who</th><th>What reaches them</th><th>Why</th></tr></thead>
          <tbody>
            <tr><td>Supabase</td><td>Your account and your progress</td><td>They run the database and the sign-in</td></tr>
            <tr><td>Google</td><td>The sign-in exchange only</td><td>Only if you choose to sign in with Google</td></tr>
            <tr><td>Vercel</td><td>Your IP address, browser and the pages you request</td><td>They host the site, and we use their analytics</td></tr>
            <tr><td>OpenAI</td><td>The question you type into Ask Qubix, the lesson you are on, and up to four passages of Qubix material</td><td>Only when you ask the tutor something. We ask them not to keep it.</td></tr>
          </tbody>
        </table>
        <p>We do not sell anything to anyone, and we do not use your work to train
          any model.</p>
        <p class="note">Ask Qubix needs an account, so a signed-out learner never
          sends anything to OpenAI. Questions that are not about the subject are
          refused by Qubix before they leave our server at all.</p>
      </section>

      <section>
        <h2>Why we are allowed to hold it</h2>
        <ul>
          <li><b>Your account and your progress</b>, because you asked us for an
            account and saving your place is the thing it does.</li>
          <li><b>Keeping the site up and safe</b>, because a service nobody can run
            securely is no use to anybody. This is what the hosting logs are for.</li>
        </ul>
        <p>We do not currently send marketing email and we are not collecting consent
          for it. If that changes it will be a separate question, asked plainly, with
          an unticked box, and refusing it will never cost you anything.</p>
      </section>

      <section>
        <h2>How long we keep it</h2>
        <p>Your account and progress stay until you delete them. Hosting logs are kept
          by Vercel on their own schedule. The record that a deletion happened
          outlives the account, because it is the evidence the deletion was done.</p>
      </section>

      <section>
        <h2>What you can ask for</h2>
        <table>
          <thead><tr><th>Right</th><th>Where it stands</th></tr></thead>
          <tbody>
            <tr><td>Delete everything</td><td><b>Works now.</b> Account menu, Delete account. It erases your progress and your sign-in, and cannot be undone.</td></tr>
            <tr><td>Stop us using it</td><td>Sign out at any time. Deleting the account is the complete version.</td></tr>
            <tr><td>Correct it</td><td>If you signed in with Google, your name and picture change when you change them at Google.</td></tr>
            <tr><td>Get a copy</td><td><b>Not built yet.</b> Your progress is a small file and we intend to offer it as a download. Until then, ask us and we will send it.</td></tr>
          </tbody>
        </table>
      </section>

      <section>
        <h2>Children</h2>
        <p>Qubix is for learners aged {MINIMUM_AGE} and over. We ask you to confirm
          your age before an account is made. That is a statement you make, not
          something we verify, and we do not record it as a piece of data about you.</p>
      </section>

      <section>
        <h2>Asking us something</h2>
        <p>Write to us and we will answer. If you think we have handled your
          information badly, you can also complain to the Information
          Commissioner's Office at <a href="https://ico.org.uk" rel="noreferrer">ico.org.uk</a>.</p>
      </section>
    </main>

    <SiteFooter compact />
  </div>
</div>

<style>
  :global(.qubix-university){height:auto!important;overflow:visible!important}
  :global(html),:global(body),:global(#app){height:auto!important;min-height:100%!important;overflow:visible!important}
  :global(body){position:static!important;overscroll-behavior:auto!important}

  .policy-page{--ink:#241f16;--soft:#6d6558;--rule:#cfc5b0;--paper:#f6f1e8;--card:#fffdf8;--green:#315f48;--clay:#b65c32;
               min-height:100vh;background:var(--paper);color:var(--ink);font-family:var(--qx-font)}
  .wrap{width:min(760px,calc(100% - 36px));margin:0 auto;padding-bottom:58px}

  header{padding:34px 0 26px;border-bottom:3px solid var(--ink)}
  .eyebrow{margin:0 0 9px;color:var(--clay);font-weight:900;font-size:11px;letter-spacing:.13em;text-transform:uppercase}
  h1{margin:0;font:500 clamp(34px,5vw,48px)/1 Georgia,serif;letter-spacing:-.035em}
  .lede{margin:14px 0 0;font:18px/1.55 Georgia,serif;color:var(--ink)}
  .stamp{margin:12px 0 0;color:var(--soft);font:650 13px var(--qx-font)}

  main{padding-top:8px}
  section{margin-top:34px}
  h2{margin:0 0 12px;font:500 25px/1.15 Georgia,serif;letter-spacing:-.02em}
  h3{margin:22px 0 8px;font:800 14px var(--qx-font);letter-spacing:.03em}
  p{margin:0 0 13px;font:400 16px/1.68 var(--qx-font);color:#403a30}
  ul{margin:0 0 13px;padding-left:20px;display:grid;gap:9px;font:400 16px/1.6 var(--qx-font);color:#403a30}
  b{font-weight:800;color:var(--ink)}
  a{color:var(--green)}
  a:focus-visible{outline:3px solid var(--clay);outline-offset:3px}
  .note{padding:12px 14px;border-left:4px solid var(--green);background:#e7efe1;font-size:15px}

  table{border-collapse:collapse;width:100%;margin:0 0 13px;background:var(--card);border:1px solid var(--rule)}
  th,td{padding:10px 13px;border-bottom:1px solid var(--rule);text-align:left;
        font:400 14.5px/1.55 var(--qx-font);color:#403a30;vertical-align:top}
  th{background:#efe9dd;font-weight:900;font-size:11.5px;letter-spacing:.06em;text-transform:uppercase;color:var(--soft)}
  tbody tr:last-child td{border-bottom:0}

  @media(max-width:560px){
    .wrap{width:min(100% - 20px,760px)}
    table{display:block;overflow-x:auto}
  }
</style>
