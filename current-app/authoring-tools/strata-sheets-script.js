// ============================================================
// STRATA — Google Sheets + Forms script
//
// HOW TO SET UP (one time only):
// 1. Open a new Google Sheet in your Drive
// 2. Extensions → Apps Script
// 3. Delete any existing code, paste this entire file
// 4. Click Save, then Run → onOpen  (approve permissions when asked)
// 5. Back in the Sheet, refresh the page
// 6. You'll see a "Strata ▾" menu appear — click it → "Create Content Form"
// 7. Done. Share the form link with anyone who needs to add content.
//
// ONGOING WORKFLOW:
// - Anyone fills the form (phone, tablet, desktop)
// - Responses land in the Sheet automatically
// - Add a "Status" column, mark rows "Ready" when content is approved
// - Strata menu → "Generate Card Code"
// - Copy the output from the "Generated Code" tab
// - Paste into index.html above the closing ]; in the DECK array
// - Add the matching image to /images
// - Bump the cache version in sw.js
// - git push → live in 30 seconds
// ============================================================

function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('Strata ▾')
    .addItem('① Create Content Form', 'createForm')
    .addSeparator()
    .addItem('② Generate Card Code', 'generateCardCode')
    .addSeparator()
    .addItem('③ Publish to Supabase', 'publishToSupabase')
    .addSeparator()
    .addItem('Help', 'showHelp')
    .addToUi();
}

// ── CREATE FORM ──────────────────────────────────────────────
function createForm() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();

  // Check if a form is already linked
  var existingUrl = ss.getFormUrl();
  if (existingUrl) {
    SpreadsheetApp.getUi().alert(
      'A form is already linked to this sheet.\n\nForm URL:\n' + existingUrl
    );
    return;
  }

  var form = FormApp.create('Strata — Add New Card');
  form.setDescription('Add new physics cards to the Strata deck. Fill in as many layers as you have — blank layers are skipped automatically.');
  form.setCollectEmail(false);
  form.setLimitOneResponsePerUser(false);

  // Act
  form.addListItem()
    .setTitle('Act')
    .setHelpText('Which section does this card belong to?')
    .setRequired(true)
    .setChoiceValues([
      'I · Things move, and something makes them',
      'II · Energy and the idea of change',
      'III · Motion is change stacked on change',
      'IV · The reaching forces & the shape they share',
      'V · One formula to rule them all'
    ]);

  // Title
  form.addTextItem()
    .setTitle('Card Title')
    .setHelpText('Short and concrete. e.g. "Gravity pulls everything" or "Why things orbit"')
    .setRequired(true);

  // Layer 0
  form.addSectionHeaderItem()
    .setTitle('Card Layers')
    .setHelpText('Layer 0 is what people see first (the swipe card). Layers 1–4 are the "dig in" levels. Fill as many as you have content for.');

  form.addParagraphTextItem()
    .setTitle('Layer 0 — The idea (swipe card)')
    .setHelpText('2–3 sentences. The hook. What shows before anyone taps to go deeper.')
    .setRequired(true);

  form.addParagraphTextItem()
    .setTitle('Layer 1 — Concrete example')
    .setHelpText('A real physical scenario. What does this look like in the world? Leave blank to skip.');

  form.addParagraphTextItem()
    .setTitle('Layer 2 — The definition')
    .setHelpText('Plain, exact definition of the concept. Leave blank to skip.');

  form.addParagraphTextItem()
    .setTitle('Layer 3 — In action')
    .setHelpText('The mechanism. Why it works, not just what it is. Leave blank to skip.');

  form.addParagraphTextItem()
    .setTitle('Layer 4 — The law')
    .setHelpText('The governing principle or lead-up to the formula. Leave blank to skip.');

  // Formula
  form.addSectionHeaderItem()
    .setTitle('Formula (optional)')
    .setHelpText('Only fill this if the card has a key equation.');

  form.addTextItem()
    .setTitle('Formula')
    .setHelpText('e.g.  F = m · a   or   E = mc²   Leave blank if none.');

  form.addTextItem()
    .setTitle('Formula explanation')
    .setHelpText('One plain-English line under the formula. e.g. "Force equals mass times acceleration."');

  // Image
  form.addSectionHeaderItem()
    .setTitle('Illustration');

  form.addParagraphTextItem()
    .setTitle('Image description')
    .setHelpText('Describe what the chalkboard illustration should show. Be specific — this goes straight to the image generator. e.g. "Two masses in space with force arrows pointing toward each other, labelled m1 and m2, distance r marked with a dashed line"');

  // Tags
  form.addTextItem()
    .setTitle('Tags')
    .setHelpText('Comma separated topics. e.g.  gravity, force, inverse-square, Newton');

  // Notes
  form.addParagraphTextItem()
    .setTitle('Notes for review')
    .setHelpText('Anything the reviewer should know — sources, uncertainties, tone concerns. Optional.');

  // Link to this sheet
  form.setDestination(FormApp.DestinationType.SPREADSHEET, ss.getId());

  // Add Status column header to the responses sheet
  SpreadsheetApp.flush();
  Utilities.sleep(2000); // Wait for the response sheet to be created
  var responseSheet = ss.getSheetByName('Form Responses 1');
  if (responseSheet) {
    var lastCol = responseSheet.getLastColumn() + 1;
    responseSheet.getRange(1, lastCol).setValue('Status');
    responseSheet.getRange(1, lastCol).setBackground('#f2d585').setFontWeight('bold');
    responseSheet.setColumnWidth(lastCol, 100);
  }

  var ui = SpreadsheetApp.getUi();
  ui.alert(
    '✓ Form created and linked to this sheet!\n\n' +
    'Fill-in link (share this):\n' + form.getPublishedUrl() + '\n\n' +
    'Edit link (for you):\n' + form.getEditUrl() + '\n\n' +
    'Responses will appear in the "Form Responses 1" tab.\n' +
    'Mark rows "Ready" in the Status column when content is approved,\n' +
    'then use Strata ▾ → Generate Card Code.'
  );
}

// ── GENERATE CARD CODE ───────────────────────────────────────
function generateCardCode() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName('Form Responses 1');

  if (!sheet) {
    SpreadsheetApp.getUi().alert('No "Form Responses 1" sheet found. Create the form first using Strata ▾ → Create Content Form.');
    return;
  }

  var data = sheet.getDataRange().getValues();
  if (data.length < 2) {
    SpreadsheetApp.getUi().alert('No responses yet.');
    return;
  }

  var headers = data[0].map(function(h) { return h.toString().trim(); });

  // Map column names to indices
  function col(name) {
    var idx = headers.indexOf(name);
    return idx >= 0 ? idx : -1;
  }

  var statusCol = col('Status');
  if (statusCol < 0) {
    SpreadsheetApp.getUi().alert('No "Status" column found. Add one to the response sheet and mark rows "Ready".');
    return;
  }

  // Count existing published cards to auto-number new ones
  // (You can override this manually if needed)
  var existingCards = getExistingCardCount(ss);
  var cardNum = existingCards + 1;

  var output = '';
  var count = 0;

  for (var r = 1; r < data.length; r++) {
    var row = data[r];
    var status = (row[statusCol] || '').toString().trim().toLowerCase();
    if (status !== 'ready') continue;

    // Read fields
    var actRaw  = val(row, col('Act'));
    var title   = val(row, col('Card Title'));
    var l0      = val(row, col('Layer 0 — The idea (swipe card)'));
    var l1      = val(row, col('Layer 1 — Concrete example'));
    var l2      = val(row, col('Layer 2 — The definition'));
    var l3      = val(row, col('Layer 3 — In action'));
    var l4text  = val(row, col('Layer 4 — The law'));
    var formula = val(row, col('Formula'));
    var fgloss  = val(row, col('Formula explanation'));

    if (!title || !l0) continue; // Skip incomplete rows

    // Extract act code: "I · Things move..." → "I"
    var act = actRaw.split('·')[0].trim().split(' ')[0];

    // Build layers
    var layers = [
      l0 ? wrap(l0) : null,
      l1 ? wrap(l1) : null,
      l2 ? wrap(l2) : null,
      l3 ? wrap(l3) : null,
      buildLayer4(l4text, formula, fgloss)
    ];

    // Trim trailing nulls
    while (layers.length > 0 && layers[layers.length - 1] === null) {
      layers.pop();
    }

    var kicker  = 'Card ' + pad(cardNum);
    var imgPath = 'images/card-' + pad(cardNum) + '.png';

    output += '  C("' + act + '","' + kicker + '","' + esc(title) + '",[\n';
    layers.forEach(function(l, i) {
      var comma = i < layers.length - 1 ? ',' : '';
      output += l === null
        ? '    null' + comma + '\n'
        : '    "' + esc(l) + '"' + comma + '\n';
    });
    output += '  ],"' + imgPath + '"),\n';

    count++;
    cardNum++;
  }

  if (!output) {
    SpreadsheetApp.getUi().alert('No rows with Status = "Ready" found.\n\nSet the Status column value to "Ready" for any rows you want to generate code for.');
    return;
  }

  var header = [
    '// ─────────────────────────────────────────────────────────',
    '// STRATA — Generated card entries',
    '// Generated: ' + new Date().toLocaleString(),
    '// Cards generated: ' + count,
    '//',
    '// PASTE THIS into index.html, inside the DECK array,',
    '// ABOVE the closing ];',
    '//',
    '// After pasting:',
    '//   1. Add the matching card-NN.png files to /images/',
    '//   2. Bump the CACHE version in sw.js (strata-vN)',
    '//   3. git add . && git commit -m "Add cards X–Y" && git push',
    '// ─────────────────────────────────────────────────────────',
    ''
  ].join('\n');

  var codeSheet = ss.getSheetByName('Generated Code');
  if (!codeSheet) {
    codeSheet = ss.insertSheet('Generated Code');
  } else {
    codeSheet.clearContents();
  }

  codeSheet.getRange(1, 1).setValue(header + '\n' + output);
  codeSheet.setColumnWidth(1, 900);
  ss.setActiveSheet(codeSheet);

  SpreadsheetApp.getUi().alert(
    '✓ Code generated for ' + count + ' card(s)!\n\n' +
    'See the "Generated Code" tab.\n' +
    'Copy everything and paste into index.html above the closing ];'
  );
}

// ── PUBLISH TO SUPABASE ──────────────────────────────────────
// Store credentials in Extensions > Apps Script > Project settings
// > Script properties:
//   SUPABASE_URL         https://xxxx.supabase.co
//   SUPABASE_SERVICE_KEY your service_role key (NOT the anon key)
//
// The service_role key bypasses Row-Level Security so the script
// can write to the cards table. Never paste it in client-side code.

function getSupabaseConfig() {
  var props = PropertiesService.getScriptProperties();
  return {
    url: (props.getProperty('SUPABASE_URL') || '').replace(/\/$/, ''),
    key: props.getProperty('SUPABASE_SERVICE_KEY') || ''
  };
}

function getNextSortOrder(config) {
  try {
    var r = UrlFetchApp.fetch(
      config.url + '/rest/v1/cards?select=sort_order&order=sort_order.desc&limit=1',
      { headers: { apikey: config.key, Authorization: 'Bearer ' + config.key },
        muteHttpExceptions: true }
    );
    if (r.getResponseCode() !== 200) return null;
    var data = JSON.parse(r.getContentText());
    return data.length > 0 ? data[0].sort_order + 1 : 1;
  } catch(e) { return null; }
}

function publishToSupabase() {
  var config = getSupabaseConfig();
  if (!config.url || !config.key) {
    SpreadsheetApp.getUi().alert(
      'Supabase not configured.\n\n' +
      'Go to Extensions > Apps Script > Project settings > Script properties and add:\n' +
      '  SUPABASE_URL         https://xxxx.supabase.co\n' +
      '  SUPABASE_SERVICE_KEY your service_role key'
    );
    return;
  }

  var nextOrder = getNextSortOrder(config);
  if (nextOrder === null) {
    SpreadsheetApp.getUi().alert('Cannot reach Supabase. Check SUPABASE_URL and SUPABASE_SERVICE_KEY.');
    return;
  }

  var ss    = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName('Form Responses 1');
  if (!sheet) { SpreadsheetApp.getUi().alert('No "Form Responses 1" sheet found.'); return; }

  var data    = sheet.getDataRange().getValues();
  if (data.length < 2) { SpreadsheetApp.getUi().alert('No responses yet.'); return; }

  var headers   = data[0].map(function(h){ return h.toString().trim(); });
  var statusCol = headers.indexOf('Status');
  if (statusCol < 0) { SpreadsheetApp.getUi().alert('No "Status" column found.'); return; }

  function col(name){ var i = headers.indexOf(name); return i >= 0 ? i : -1; }

  // Subject lookup by act
  var SUBJECT = { I:'physics', II:'physics', III:'maths', IV:'physics', V:'maths' };

  var count  = 0;
  var errors = [];

  for (var r = 1; r < data.length; r++) {
    var row    = data[r];
    var status = (row[statusCol] || '').toString().trim().toLowerCase();
    if (status !== 'ready') continue;

    var actRaw = val(row, col('Act'));
    var title  = val(row, col('Card Title'));
    var l0     = val(row, col('Layer 0 — The idea (swipe card)'));
    if (!title || !l0) continue;

    var act    = actRaw.split('·')[0].trim().split(' ')[0];
    var cardNo = nextOrder + count;
    var kicker = 'Card ' + pad(cardNo);

    var layers = [
      l0 ? wrap(l0) : null,
      val(row, col('Layer 1 — Concrete example'))   ? wrap(val(row, col('Layer 1 — Concrete example')))   : null,
      val(row, col('Layer 2 — The definition'))      ? wrap(val(row, col('Layer 2 — The definition')))      : null,
      val(row, col('Layer 3 — In action'))            ? wrap(val(row, col('Layer 3 — In action')))            : null,
      buildLayer4(val(row, col('Layer 4 — The law')), val(row, col('Formula')), val(row, col('Formula explanation')))
    ];
    while (layers.length > 0 && layers[layers.length - 1] === null) layers.pop();

    var tagsRaw = val(row, col('Tags'));
    var tags = {
      subject:   SUBJECT[act] || 'physics',
      topic:     tagsRaw ? tagsRaw.split(',')[0].trim() : '',
      concept:   tagsRaw ? tagsRaw.replace(/,\s*/g, '; ').trim() : '',
      ground:    'g0',
      buildsOn:  []
    };

    var card = { sort_order: cardNo, act: act, kicker: kicker, title: title,
                 layers: layers, img_url: null, tags: tags };

    var res = UrlFetchApp.fetch(config.url + '/rest/v1/cards', {
      method:  'POST',
      headers: { apikey: config.key, Authorization: 'Bearer ' + config.key,
                 'Content-Type': 'application/json', Prefer: 'return=minimal' },
      payload: JSON.stringify(card),
      muteHttpExceptions: true
    });

    if (res.getResponseCode() === 201) {
      sheet.getRange(r + 1, statusCol + 1).setValue('Published');
      count++;
    } else {
      errors.push('Row ' + (r + 1) + ': HTTP ' + res.getResponseCode() + ' — ' + res.getContentText().substring(0, 120));
    }
  }

  var msg = count > 0
    ? '✓ Published ' + count + ' card(s) to Supabase!\n\nRemember to bump sw.js (strata-vN) and git push.'
    : 'No rows with Status = "Ready" found.';
  if (errors.length > 0) msg += '\n\nErrors:\n' + errors.join('\n');
  SpreadsheetApp.getUi().alert(msg);
}

// ── HELPERS ──────────────────────────────────────────────────
function val(row, idx) {
  if (idx < 0 || idx >= row.length) return '';
  return (row[idx] || '').toString().trim();
}

function wrap(text) {
  // Split on double newlines for paragraphs, single newlines become spaces
  var paras = text.split(/\n\n+/).map(function(p) {
    return p.replace(/\n/g, ' ').trim();
  }).filter(function(p) { return p.length > 0; });
  return paras.map(function(p) { return '<p>' + p + '</p>'; }).join('');
}

function buildLayer4(text, formula, gloss) {
  if (!text && !formula) return null;
  var out = text ? wrap(text) : '';
  if (formula) {
    out += "<div class='formula'>" + formula;
    if (gloss) out += "<span class='gloss'>" + gloss + "</span>";
    out += "</div>";
  }
  return out;
}

function esc(s) {
  return s.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
}

function pad(n) {
  return n < 10 ? '0' + n : '' + n;
}

function getExistingCardCount(ss) {
  // Returns 11 by default (the current published deck size).
  // Update this number manually as you publish batches.
  // Or just check what the last card number in index.html is.
  var countSheet = ss.getSheetByName('Settings');
  if (countSheet) {
    var v = parseInt(countSheet.getRange('B1').getValue());
    if (!isNaN(v)) return v;
  }
  return 11; // Default: 11 cards already published
}

function showHelp() {
  SpreadsheetApp.getUi().alert(
    'STRATA — Content workflow\n\n' +
    '① Anyone fills the form on any device (phone, tablet, desktop)\n' +
    '② Responses land in the "Form Responses 1" tab automatically\n' +
    '③ Review the content, add a "Status" column, mark rows "Ready"\n' +
    '④ Strata ▾ → Generate Card Code\n' +
    '⑤ Copy the output from the "Generated Code" tab\n' +
    '⑥ Paste into index.html above the closing ];\n' +
    '⑦ Add matching card-NN.png images to /images/\n' +
    '⑧ Bump CACHE version in sw.js\n' +
    '⑨ git push → live in ~30 seconds\n\n' +
    'For help: open the project in Claude Code'
  );
}
