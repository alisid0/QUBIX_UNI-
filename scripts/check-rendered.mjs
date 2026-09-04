import { chromium } from 'playwright';

// The checks that need a browser, because three bugs in a row did.
//
// The other guards read source and are good at it: contrast ratios, palette
// drift, a view with no way home, a page root that scrolls a box instead of the
// document. All of them passed while, in order:
//
//   the front door would not scroll on a phone,
//   the stage toggle updated its state and never re-rendered,
//   and the whole floor threw on load and drew nothing at all.
//
// Every one was found by a person opening the page. This is the smallest thing
// that would have caught all three: load it, look at it, press something.
//
// Deliberately NOT in prebuild. Vercel's build image has no browser, so wiring
// it there would fail every deploy for a reason unrelated to the code. Run it
// against a preview before shipping something structural:
//
//   npm run build && npx vite preview --port 4173
//   npm run check:rendered
//
// Vercel's analytics script only exists on Vercel, so its 404 in local preview
// is expected and ignored rather than being a failure everyone learns to skip.

const BASE = process.argv[2] || 'http://localhost:4173';
const EXPECTED_STAGES = 6;
const IGNORED = [/_vercel\/insights/];

let failed = false;
const check = (condition, label, detail = '') => {
  console.log(`   ${condition ? 'PASS' : '**FAIL**'}  ${label}${detail ? `  ${detail}` : ''}`);
  if (!condition) failed = true;
};

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 1000 } });

const errors = [];
const failedRequests = [];
page.on('pageerror', e => errors.push(String(e).split('\n')[0]));
page.on('response', r => {
  if (r.status() >= 400 && !IGNORED.some(re => re.test(r.url()))) {
    failedRequests.push(`${r.status()} ${r.url()}`);
  }
});

try {
  await page.goto(BASE + '/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(900);

  const stages = await page.$$eval('.stage-head h3', els => els.map(e => e.textContent.trim()));
  check(stages.length === EXPECTED_STAGES,
    `the floor draws all ${EXPECTED_STAGES} stages`, stages.join(', ') || 'nothing rendered');
  check(errors.length === 0, 'the floor loads without throwing', errors.slice(0, 2).join(' | '));

  // The toggle that silently did nothing for a day.
  const toggles = await page.$$('.stage-toggle');
  check(toggles.length === EXPECTED_STAGES, 'every stage has a toggle', `${toggles.length} found`);

  let mathsToggle = null;
  for (const toggle of toggles) {
    if (/10 steps/.test(await toggle.textContent())) mathsToggle = toggle;
  }
  check(Boolean(mathsToggle), 'the Mathematics stage is on the floor');

  if (mathsToggle) {
    const before = (await page.$$('.pair-row.single .asset')).length;
    await mathsToggle.click();
    await page.waitForTimeout(400);
    const after = await page.$$eval('.pair-row.single .asset', els => els.map(e => ({
      title: e.querySelector('b')?.textContent.trim(),
      href: e.getAttribute('href')
    })));
    check(before === 0 && after.length === 10,
      'pressing the toggle actually reveals the steps', `${before} then ${after.length}`);
    check(after.every(c => /\?board=\d+$/.test(c.href || '')),
      'every board card carries its own address');

    // A deep link that lands on a remembered board rather than the asked-for one
    // is the failure this cannot see from the markup alone.
    const target = after[7];
    if (target?.href) {
      await page.goto(new URL(target.href, BASE).toString(), { waitUntil: 'networkidle' });
      await page.waitForTimeout(700);
      const heading = await page.$eval('h1, h2', el => el.textContent.trim()).catch(() => '');
      check(heading === target.title,
        'a board link opens that board', `asked for "${target.title}", landed on "${heading}"`);
    }
  }

  check(failedRequests.length === 0, 'nothing 404s', failedRequests.slice(0, 3).join(' | '));

  // The founder's no-credit authoring route. Its value is the handoff, so test
  // the whole handoff rather than merely checking that the four panels exist.
  const workshop = await browser.newPage({ viewport: { width: 1280, height: 1000 } });
  await workshop.goto(BASE + '/builder', { waitUntil: 'networkidle' });
  const workshopHeading = await workshop.$eval('h1', element => element.textContent.trim());
  check(workshopHeading === 'Qubix Draft Workshop', 'the Draft Workshop renders');

  const conversation = Array.from({ length: 24 }, (_, index) =>
    `${index % 2 ? 'Assistant' : 'User'}: Message ${index + 1} about probability.`).join('\n');
  await workshop.fill('#transcript', conversation);
  await workshop.fill('#draft-title', 'Events and outcomes');
  await workshop.click('.primary');
  const handoff = await workshop.inputValue('#handoff-prompt');
  check(handoff.includes('Message 5') && handoff.includes('Message 24') && !handoff.includes('Message 4\n'),
    'the rendered workshop hands off only the latest twenty messages');

  const returnedDraft = `# Events and outcomes
Status: AI_DRAFT
## Conversation decisions captured
Teach probability with an everyday event. ${'Evidence. '.repeat(30)}
## Assumptions made
Learners know fractions.
## Learning objective
Describe events and outcomes.
## Prerequisites
Fractions and ratios.
## Read
Explain the standard terms.
## Play
Compare expected and observed results.
## Assessment
Explain a small sample.
## Open founder decisions
Choose the dataset.
## Evidence or source material still needed
Confirm provenance.
## Founder review checklist
- Review scope.`;
  await workshop.fill('#returned-draft', returnedDraft);
  const readiness = await workshop.$eval('.score', element => element.textContent.replace(/\s+/g, ' ').trim());
  check(/11\/11.*Ready for founder review/.test(readiness),
    'the rendered workshop validates a complete returned draft');
  const desktopOverflow = await workshop.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
  check(!desktopOverflow, 'the Draft Workshop has no desktop horizontal overflow');

  const mobileWorkshop = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await mobileWorkshop.goto(BASE + '/builder', { waitUntil: 'networkidle' });
  const mobileLayout = await mobileWorkshop.evaluate(() => ({
    horizontalOverflow: document.documentElement.scrollWidth > document.documentElement.clientWidth,
    scrollable: document.documentElement.scrollHeight > document.documentElement.clientHeight,
    bodyPosition: getComputedStyle(document.body).position
  }));
  check(!mobileLayout.horizontalOverflow && mobileLayout.scrollable && mobileLayout.bodyPosition === 'static',
    'the Draft Workshop scrolls the document on a phone without horizontal overflow');
  await mobileWorkshop.close();
  await workshop.close();
} catch (error) {
  check(false, 'the page could be loaded at all', `${error.message} — is a preview running on ${BASE}?`);
} finally {
  await browser.close();
}

console.log(failed
  ? '\nRendered checks failed. The page is not doing what the source says.\n'
  : '\nthe floor renders, the toggle opens it, and a board link opens that board\n');
process.exit(failed ? 1 : 0);
