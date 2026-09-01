import { chromium } from 'playwright';
const B = process.argv[2] || 'http://localhost:8000';
const b = await chromium.launch();

const open = async (page, seed) => {
  await page.goto(B + '/', { waitUntil: 'domcontentloaded' });
  if (seed) await page.evaluate(seed);
  await page.goto(B + '/start', { waitUntil: 'domcontentloaded' });
  await page.waitForSelector('.now-card, .settling', { timeout: 20000 });
  await page.waitForTimeout(700);
};

// 1 · a learner who has never done anything
{
  const p = await b.newPage({ viewport: { width: 1180, height: 1000 } });
  const errs = []; p.on('pageerror', e => errs.push(String(e).slice(0, 110)));
  await open(p, null);
  console.log('  FRESH LEARNER');
  console.log('    next     :', (await p.textContent('.now-where')).trim());
  console.log('    read card:', (await p.textContent('.card.read b')).trim());
  console.log('    play card:', (await p.textContent('.card.play b')).trim());
  console.log('    tally    :', (await p.textContent('.tally b')).trim());
  console.log('    errors   :', errs.length ? errs.join('|') : 'none');
  await p.close();
}

// 2 · a learner mid-course: first three readings and two missions done
{
  const p = await b.newPage({ viewport: { width: 1180, height: 1000 } });
  await open(p, () => {
    localStorage.setItem('qx.superstore.progress.v1',
      JSON.stringify({ completed: ['checkout', 'read-the-table'], started: new Date().toISOString() }));
    localStorage.setItem('qubix-shared-foundations-SHARED-FOUNDATIONS-PART-ONE-v1',
      JSON.stringify({ study: ['representation', 'observations-variables', 'rows-grain'],
        exercises: [], practice: [], notes: {} }));
  });
  console.log('\n  MID-COURSE LEARNER (3 readings, 2 missions already done elsewhere)');
  console.log('    next     :', (await p.textContent('.now-where')).trim());
  console.log('    read card:', (await p.textContent('.card.read b')).trim());
  console.log('    play card:', (await p.textContent('.card.play b')).trim());
  console.log('    tally    :', (await p.textContent('.tally b')).trim());
  await p.close();
}
await b.close();
