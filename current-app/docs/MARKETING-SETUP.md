# Qubix marketing setup

Last updated: 2026-07-18

This document is the current marketing handover for Qubix. It covers the free
foundation needed for the Android closed beta and public launch. Do not start
paid advertising until onboarding, activation, and early retention have been
measured with real testers.

## Current state

Already available:

- approximately 60 statically generated SEO pages;
- a generated sitemap and robots file;
- Open Graph, Twitter, and structured-data metadata;
- privacy-friendly Vercel Analytics integration in the application code;
- draft Play Store title, short description, and full description;
- verified Google Search Console ownership for `arcavetech.co.uk`;
- an isolated staging application for testing marketing and onboarding changes;
- a documented Discord community structure for beta feedback.

Outstanding technical marketing issues:

- canonical, Open Graph, structured-data, robots, and sitemap URLs still point
  at `https://qubix.university`;
- `qubix.arcavetech.co.uk` is still attached to staging and must move to the
  production Vercel project before becoming the canonical public address;
- the current Open Graph image is an ordinary lesson image rather than a
  dedicated 1200 x 630 Qubix social card;
- no beta/waitlist conversion page or signup funnel is implemented;
- no UTM naming convention or campaign reporting sheet exists;
- Vercel Analytics is wired in code but production dashboard collection still
  needs to be confirmed;
- the final production sitemap has not yet been submitted in Search Console.

Do not change canonical URLs until the custom Qubix domain has been moved from
staging to the production deployment and verified there.

## Launch objective

The first marketing milestone is not a large public audience. It is a useful
closed-beta cohort of 20 to 50 Android testers who will complete lessons, return
to the product, and provide structured feedback.

The intended funnel is:

```text
short educational content
-> Qubix landing page
-> join Android beta
-> install closed test
-> complete first lesson/workshop
-> submit feedback
-> become a launch user
```

## Positioning draft

Primary message:

> Qubix makes difficult STEM ideas visual, interactive and manageable, one
> small concept at a time.

Short message:

> Visual STEM learning, one concept at a time.

Do not claim that Qubix is a complete curriculum, guarantees exam results, or
already matches the maturity of established commercial learning platforms.

Audience decision still required:

- recommended first audience: independent learners and adults aged 16+;
- alternative: direct GCSE/A-level positioning, which would require different
  curriculum, safeguarding, privacy, parent, school, and acquisition choices.

Do not lock launch copy or targeting until the founder confirms this choice.

## Beta landing page

Create a public marketing page with:

- one clear headline and product explanation;
- a 20 to 30 second product demonstration;
- three concrete benefits;
- examples from physics, maths, chemistry, and computing;
- an Android beta signup call to action;
- clear free-during-beta wording;
- privacy, terms, and support links;
- Arcave Technologies trust/company information;
- no login requirement merely to view the page.

The beta form should collect only:

- email address;
- Google/Android testing email;
- broad learning interest;
- optional consent to provide feedback.

Do not collect age, school, address, or other unnecessary personal data.

## Initial channels

Keep the channel set small enough to publish consistently:

- LinkedIn: company progress, founder story, product decisions, and milestones;
- YouTube Shorts: 20 to 40 second visual STEM explanations;
- Instagram/Reels: reuse the strongest vertical teaching videos;
- Reddit: useful subject explanations and transparent beta invitations where
  community rules allow them;
- Discord: tester support, structured feedback, bugs, and release notes;
- email: beta access, changelog, and launch notification.

Reserve consistent Qubix/Arcave handles before broad promotion. Do not create or
purchase accounts without founder control of recovery email, 2FA, and ownership.

## Launch asset pack

Prepare:

1. A dedicated 1200 x 630 social-preview image.
2. A Google Play feature graphic.
3. Six to eight polished Android screenshots.
4. One 30-second product demonstration.
5. Three short STEM teaching videos.
6. One founder introduction.
7. One closed-beta invitation post.
8. One concise press/product description.
9. Consistent avatar, biography, and links for every public channel.

Store-listing descriptions must accurately describe current features, lead with
the clearest value in the first sentences, and avoid unsupported testimonials
or endorsements.

## Measurement

Track the funnel rather than follower count:

- landing-page visits;
- beta signup conversion;
- campaign/source UTM;
- Play test opt-ins;
- completed registrations;
- first lesson opened;
- first lesson completed;
- first workshop completed;
- day-one and day-seven return;
- feedback submitted.

The primary early relationship is:

```text
visitor -> tester -> activated learner -> returning learner
```

Use a consistent UTM scheme:

```text
utm_source=<platform>
utm_medium=<organic|email|community|creator>
utm_campaign=android_closed_beta
utm_content=<asset-or-post-id>
```

## Google Play marketing sequence

1. Finish developer identity and phone verification.
2. Produce and test the signed Android App Bundle.
3. Start with internal testing.
4. Recruit a small closed-test cohort.
5. Improve the product and store listing from observed behaviour and feedback.
6. Consider Google Play pre-registration only when the application, declarations,
   and store assets are close to production.

Google Play pre-registration campaigns have a 90-day limit, so starting one
before the product is ready creates avoidable launch pressure. Testers who
already have a test build installed also do not receive the normal
pre-registration launch notification.

Official references:

- Store listing best practices:
  https://support.google.com/googleplay/android-developer/answer/13393723
- Internal and closed testing:
  https://support.google.com/googleplay/android-developer/answer/9845334
- Pre-registration:
  https://support.google.com/googleplay/android-developer/answer/9859047

## Ordered marketing actions

1. Confirm the first launch audience.
2. Reserve founder-controlled social handles with 2FA.
3. Design the beta landing page and minimal signup form against staging.
4. Add the dedicated social-preview image and launch asset templates.
5. Confirm production analytics and implement UTM reporting.
6. Move `qubix.arcavetech.co.uk` to the production Vercel project.
7. Replace every old Vercel canonical/metadata/sitemap reference with the final
   production domain.
8. Submit the final sitemap in the verified Search Console property.
9. Produce the first three educational videos and beta invitation material.
10. Recruit internal testers, then 20 to 50 closed-beta testers.
11. Measure activation and return before considering paid advertising or a Play
    pre-registration campaign.

## Do not spend on yet

- paid social advertising;
- influencer sponsorships;
- press-release distribution services;
- large video-production packages;
- search advertising;
- broad app-install campaigns.

Spending should wait until Qubix has a stable Android build, a measured landing
page, reliable onboarding, and evidence that early learners return.

