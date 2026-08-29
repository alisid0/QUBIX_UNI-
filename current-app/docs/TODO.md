# Qubix — TODO (finalization phase)

**Status:** launch build is live & password-gated (qubix.university).
**Colours locked** (5-colour warm/crafted, Light + Dark). **Typography locked**
(book-like reading + ⋯ settings menu with a Text-size A−/A+ control).
Content = 78 boards / 9 topics. Media so far: 9 illustrations, 6 narrated, 5 3D.

**Workflow:** `npm run dev` → http://localhost:8000 (no gate locally), iterate in
the browser (hot reload), then commit + `npx vercel --prod` + alias to
qubix.university.

---

## ▶ Start here (highest leverage)
1. **Close the loop (UX).** Completion screen after a quiz/topic: score + mastery
   bump + "review your misses" + **next-topic handoff**; plus a "topic complete"
   card on the last board of a topic. Biggest felt improvement, contained build.

## Design foundation (keep locking)
2. **Icons** — unify the set to one stroke weight / style across nav + actions.
3. **Illustration style** — lock a reference-anchored style (the hand-drawn
   animation look), kill the "AI textbook" drift + baked-in text; plan consistent
   regeneration. (The piece you're least happy with.)
4. **Reading-size default** — after living with it, pick the default (one token:
   `--qx-fs-body`).

## Content
5. Final-P editorial pass over the 78 boards.
6. Quizzes for the 3 topics without one (Kinematics, Scale/estimation/errors,
   Molecular architecture).
7. Widen media coverage — audio + illustrations + 3D across more of the 78.

## Product (from the DeepSeek plan; post-launch-ready)
8. **Try-it-first** first session — drop a new user into a hook board, no signup
   wall; soft "save progress" nudge after a couple of boards.
9. **Review / spaced-retrieval pillar** — the assessment engine + daily habit hook
   (also what makes the mastery Map actually fill in).

## Quick wins / decisions
10. Set the privacy contact email (replace `CONTACT_EMAIL_PLACEHOLDER` in
    `public/privacy.html`).
11. Turn on **Vercel Web Analytics** in the dashboard (the `inject()` is already
    wired) so it starts collecting.
12. Decide: ⋯ settings menu on every tab, or Home only (current)?
13. Clear the pre-existing a11y warnings (snippet/lightbox backdrops) + clamp the
    lightbox pan so a zoomed image can't be dragged off-screen.

## When ready to go PUBLIC (not yet — gate stays for now)
- Production/staging code separation is implemented. Before using the test app,
  create the staging Supabase project and add its public URL/anon key to Vercel
  Preview variables; follow `docs/ENVIRONMENTS.md`.
- DONE (2026-07-22): Supabase Auth email signup + confirm-email/SMTP configured
  and delivery confirmed; prod URL set in Site URL + redirect allowlist; Google
  provider configured and sign-in tested end to end; obsolete credentials
  revoked. Phone OTP remains hidden by default; to expose it later, configure an
  SMS provider, then set `VITE_ENABLE_PHONE_AUTH=true`.
- Then the one switch: remove the `BASIC_AUTH_PASSWORD` Vercel env var → public +
  indexable (SEO pages/sitemap/splash are already ready).

---
*Recommended: do #1 first — biggest UX gain, self-contained.*
