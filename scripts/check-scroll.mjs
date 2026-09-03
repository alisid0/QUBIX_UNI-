// The page must scroll, not a box inside it.
//
// global.css pins html and body to height 100% with overflow hidden, which every
// full-page view has to undo. There are two ways to undo it and only one works.
//
//   overflow: visible  — the viewport scrolls. Correct.
//   overflow: auto     — body becomes a viewport-height scroll container. The
//                        document never scrolls, so window.scrollY stays 0,
//                        window.scrollTo does nothing, and on some setups the
//                        mouse wheel does nothing either.
//
// This has now been fixed three times. Once for the wheel, once for the reader's
// "Next session" button, which changed the session and left the learner at the
// bottom of the page because scrolling to the top was a no-op, and once for the
// views this guard found still carrying it.
//
// It is invisible in review: the file looks deliberate, the page renders, and
// the bug only shows when something tries to move the scroll position.
//
//   npm run check:scroll

import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const dir = u => new URL(u, import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1');
const VIEWS = dir('../src/views/');

let bad = 0;
const ok = (label, pass, detail = '') => {
  if (!pass) bad++;
  console.log(`   ${pass ? 'PASS' : '**FAIL**'}  ${label}${detail ? '  ' + detail : ''}`);
};

let checked = 0, overriding = 0;

for (const file of readdirSync(VIEWS).filter(f => f.endsWith('.svelte'))) {
  const name = file.replace('.svelte', '');
  const src = readFileSync(join(VIEWS, file), 'utf8');
  const style = (src.match(/<style>[\s\S]*<\/style>/) || [''])[0];
  if (!style) continue;
  // A view that manages its own scroll panes says so in the file, so the
  // exception is a decision somebody wrote down rather than a list kept here.
  if (/scroll:\s*internal/.test(src)) continue;
  checked += 1;

  // Every rule in this file that targets html or body and sets overflow.
  // The gap that let the front door ship unscrollable on a phone.
  //
  // Everything below only ran for views that override html or body, so a view
  // that overrode nothing and instead built its own scroll container was
  // skipped entirely and passed. That is what LearningFloor did from 8e71e41,
  // and what ChangeLab had done for longer: height:100% plus overflow-y:auto
  // on the page root, inside a shell pinned to the viewport. The document never
  // scrolls, and iOS Safari handles the nested container worst of all.
  //
  // A view that genuinely needs an inner pane still says `scroll: internal` in
  // the file and is skipped above.
  const innerScroller = [...style.matchAll(/\{([^}]*)\}/g)]
    .map(m => m[1])
    .some(body => /height\s*:\s*100%/.test(body) && /overflow(-y)?\s*:\s*auto/.test(body));
  ok(`${name} does not scroll a box instead of the page`, !innerScroller,
    innerScroller ? 'height: 100% with overflow-y: auto on a page root — let the document scroll'
      : '');

  const rules = [...style.matchAll(/:global\((?:html|body)\)[^{]*\{([^}]*)\}/g)]
    .map(m => m[1])
    .filter(body => /overflow\s*:/.test(body));
  if (!rules.length) continue;
  overriding += 1;

  const values = rules.map(r => (r.match(/overflow\s*:\s*([a-z]+)/) || [])[1]).filter(Boolean);
  const wrong = values.filter(v => v !== 'visible');

  ok(`${name} lets the page scroll`, wrong.length === 0,
    wrong.length ? `sets overflow: ${[...new Set(wrong)].join(', ')} on html or body — use visible`
      : `overflow: ${values.join(', ')}`);
}

console.log(`\n${bad ? `${bad} view(s) stop the page scrolling` : 'all checks pass'}`
  + `, ${overriding} of ${checked} views override html or body overflow`);
process.exit(bad ? 1 : 0);
