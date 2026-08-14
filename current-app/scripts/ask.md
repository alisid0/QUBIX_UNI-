# Problem: Playwright cannot click an ElevenLabs file upload zone

## Context

I am automating the ElevenLabs image generator UI using Playwright (Node.js).
The browser is Brave, connected via `chromium.connectOverCDP('http://localhost:9222')`.

After generating an image, I need to upload the saved PNG as a "reference image" for the next generation. The upload zone is a button with `role="presentation"` which Playwright marks as **not-enabled**, causing all click attempts to fail.

## The element (from live DOM inspection)

```html
<button
  tabindex="0"
  type="button"
  role="presentation"
  data-agent-id="file-upload-_r_qj_"
  class="bg-gray-alpha-100 h-[74px] aspect-[1.72] rounded-xl border border-dashed border-transparent flex items-center justify-center transition duration-200 overflow-hidden relative outline-foreground"
>
  <!-- contains child elements including an SVG icon and "Image refs" text -->
</button>
```

## Terminal errors we have seen

### Error 1: `btn.click({ force: true })` — still checks actionability
```
locator.click: Timeout 30000ms exceeded.
  - waiting for locator('button:has-text("Image refs")').first()
  - locator resolved to <button tabindex="0" type="button" role="presentation" ...>
  - attempting click action
  - 2 × waiting for element to be visible, enabled and stable
    - element is not enabled
  - retrying click action
```

`force: true` is supposed to bypass actionability checks but Playwright still rejects the `role="presentation"` element as not-enabled.

### Error 2: `page.evaluate(() => zone.click())` — did not trigger filechooser
We tried bypassing Playwright with a raw DOM click:
```js
const [fileChooser] = await Promise.all([
  page.waitForEvent('filechooser', { timeout: 12_000 }),
  page.evaluate(() => {
    const zone = document.querySelector('[data-agent-id^="file-upload-"]');
    if (zone) zone.click();
  }),
]);
```
The Promise resolved (no timeout error) but `fileChooser.setFiles()` may not have actually registered the file, OR the `filechooser` event didn't fire and we caught the evaluate resolve instead.

## Current `uploadReference` function (the one that needs fixing)

```js
async function uploadReference(page, imgPath) {
  await sleep(2000);

  // Strategy 1: raw DOM click via evaluate
  try {
    const [fileChooser] = await Promise.all([
      page.waitForEvent('filechooser', { timeout: 12_000 }),
      page.evaluate(() => {
        const zone = document.querySelector('[data-agent-id^="file-upload-"]')
                  || document.querySelector('button[role="presentation"]');
        if (zone) zone.click();
      }),
    ]);
    await fileChooser.setFiles(imgPath);
    await sleep(1500);
    console.log(`    📎 Reference uploaded`);
    return;
  } catch (e1) {
    console.warn(`    ⚠  DOM click fallthrough: ${e1.message.slice(0, 80)}`);
  }

  // Strategy 2: set files directly on any file input
  try {
    const inputs = page.locator('input[type="file"]');
    const count  = await inputs.count();
    for (let i = 0; i < count; i++) {
      try {
        await inputs.nth(i).setInputFiles(imgPath, { timeout: 3000 });
        await sleep(1500);
        console.log(`    📎 Reference uploaded (file input ${i})`);
        return;
      } catch (_) {}
    }
  } catch (_) {}

  // Strategy 3: DataTransfer drop event
  try {
    const imgData = Array.from(readFileSync(imgPath));
    await page.evaluate(({ data, name }) => {
      const blob = new Blob([new Uint8Array(data)], { type: 'image/png' });
      const file = new File([blob], name, { type: 'image/png' });
      const dt   = new DataTransfer();
      dt.items.add(file);
      const zone = document.querySelector('[data-agent-id^="file-upload-"]')
                || document.querySelector('button[role="presentation"]');
      if (!zone) return;
      zone.dispatchEvent(new DragEvent('dragenter', { dataTransfer: dt, bubbles: true }));
      zone.dispatchEvent(new DragEvent('drop',      { dataTransfer: dt, bubbles: true }));
    }, { data: imgData, name: imgPath.split(/[\\/]/).pop() });
    await sleep(1500);
    console.log(`    📎 Reference uploaded (drop)`);
    return;
  } catch (_) {}

  console.warn('    ⚠  Could not upload reference — continuing without it');
}
```

## What I need

A drop-in replacement for the `uploadReference(page, imgPath)` function that reliably:

1. Opens the file chooser dialog triggered by clicking the `[data-agent-id^="file-upload-"]` button
2. Sets the file to `imgPath` (absolute Windows path, e.g. `C:\Users\ali10\strata\public\media\frames\bb-1000\f0\frame-1.png`)
3. Waits for the upload to register in the ElevenLabs UI before returning

Key constraints:
- Using Playwright with Chromium (ConnectOverCDP to Brave browser)
- The button has `role="presentation"` — Playwright's actionability system blocks it
- There is definitely a hidden `<input type="file">` inside or near the upload zone (standard pattern for drag-drop upload components)
- `page.waitForEvent('filechooser')` should work if the click actually propagates correctly

Return ONLY the fixed function as a single JavaScript fenced code block. No explanation.
