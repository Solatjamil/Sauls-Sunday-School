/* Classroom print pack.
   The app renders printable sheets on screen (Print screen → Print/Save as PDF).
   This tool pre-renders the same sheets for every unit into dist/print/ so a
   church can bulk-print: SVG + PNG colouring pages, one PDF per level, and a
   print-ready HTML hub with all four sheet kinds per unit.

   node tools/build-print.mjs            (needs ImageMagick's `convert` for PNG/PDF)
*/
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { execFileSync } from 'node:child_process';
const require = createRequire(import.meta.url);
const root = path.resolve(import.meta.dirname, '..');
const OUT = path.join(root, 'dist', 'print');
const L = require(path.join(root, 'js/core/logic.js'));
const A = require(path.join(root, 'js/core/art.js'));
const M = require(path.join(root, 'js/data/meta.js'));
const units = ['units-1', 'units-2', 'units-3', 'units-4', 'units-5', 'units-6']
  .flatMap((f) => require(path.join(root, 'js/data', f + '.js')));

const esc = (s) => String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const line = (n = 3) => Array.from({ length: n }, () => '<div class="line"></div>').join('');

function svgDoc(inner) {
  const m = inner.match(/^<svg\b([^>]*)>/);
  if (!m) return inner;
  // keep the viewBox, drop the app-only attributes, and never leave a second xmlns behind.
  // Size is physical: a 1224px-wide SVG prints 12.75in across and loses a third of the
  // page in the printer's margins. The raster step overrides this with fitTo anyway.
  const attrs = m[1]
    .replace(/\s?class="[^"]*"/g, '')
    .replace(/\s?role="img"/g, '')
    .replace(/\s?aria-label="[^"]*"/g, '')
    .replace(/\s?xmlns="[^"]*"/g, '')
    .replace(/\s?width="[^"]*"/g, '')
    .replace(/\s?height="[^"]*"/g, '');
  return '<?xml version="1.0" encoding="UTF-8"?>\n<svg width="8.5in" height="11in"' + attrs + ' xmlns="http://www.w3.org/2000/svg">' +
    inner.slice(m[0].length).replace(/<\/svg>\s*$/, '') + '</svg>';
}

function colouringSVG(u) {
  const sheet = L.printablePack(u, {})[0];
  return A.colouringPage(sheet.motif, u.title);
}

function activityHTML(u, answers) {
  const rows = (u.quiz || []).map((q, i) => {
    const kind = { mc: 'Circle the right answer', tap: 'Tap and say', match: 'Draw a line to match each pair', order: 'Number these in order', sort: 'Sort each word into the right box', blank: 'Write the answer', type: 'Write the answer' }[q.t] || 'Answer';
    let body = '';
    if (q.a) body = '<ol type="A" class="opts">' + q.a.map((x) => '<li>' + esc(x) + '</li>').join('') + '</ol>';
    if (q.pairs) body = '<table class="pairs"><tr>' +
      '<td><ol>' + q.pairs.map((p) => '<li>' + esc(p[0]) + '</li>').join('') + '</ol></td>' +
      '<td><ol>' + q.pairs.map((p) => '<li>' + esc(p[1]) + '</li>').join('') + '</ol></td></tr></table>';
    if (q.items && !q.buckets) body = '<ol class="blanklist">' + q.items.map(() => '<li>__________</li>').join('') + '</ol><p class="tiny">The list: ' + q.items.map((x) => esc(typeof x === 'string' ? x : x.text)).join(' · ') + '</p>';
    if (q.items && q.buckets) body = '<p class="tiny">' + q.items.map((x) => esc(x.text)).join(' · ') + '</p><p><b>' + q.buckets.map((b) => esc(b.name)).join(' | ') + '</b></p>';
    const key = q.t === 'mc' || q.t === 'tap' ? q.a[q.c]
      : q.t === 'order' ? q.items.map((x) => typeof x === 'string' ? x : x.text).join(' → ')
        : q.t === 'match' ? q.pairs.map((p) => p[0] + ' — ' + p[1]).join('; ')
          : q.t === 'sort' ? q.items.map((x) => x.text + ' → ' + ((q.buckets.find((b) => b.id === x.b) || {}).name || x.b)).join('; ')
            : (Array.isArray(q.a) ? q.a[0] : q.a);
    return '<div class="q"><b>' + (i + 1) + '.</b> ' + esc(q.q) +
      ' <span class="tiny">(' + esc(kind) + ')</span>' + body +
      (answers ? '<p class="ans">Answer: ' + esc(key) + '</p>' : '') + '</div>';
  }).join('');
  return '<h2>' + esc(u.title) + ' — activity sheet</h2>' +
    '<p class="tiny">Memory verse: “' + esc(u.memory.text) + '” (' + esc(u.memory.ref) + ')</p>' + rows;
}

function craftHTML(u) {
  const c = u.printable && u.printable.craft;
  if (!c) return '';
  return '<h2>Craft: ' + esc(c.title || u.title) + '</h2>' +
    (c.steps ? '<ol>' + c.steps.map((x) => '<li>' + esc(x) + '</li>').join('') + '</ol>' : '') +
    (c.note ? '<p class="tiny">' + esc(c.note) + '</p>' : '') + line(1);
}

function parentHTML(u) {
  return '<h2>' + esc(u.title) + ' — for grown-ups</h2>' +
    '<p><b>What the lesson teaches</b></p><ul>' + (u.teach || []).map((x) => '<li>' + esc(x) + '</li>').join('') + '</ul>' +
    '<p><b>The text it comes from</b></p><ul>' + (u.scripture || []).map((s) => '<li>“' + esc(s.text) + '” — ' + esc(s.ref) + ' (WEB)</li>').join('') + '</ul>' +
    (u.hardNote ? '<p class="hard"><b>Hard parts.</b> ' + esc(u.hardNote) + '</p>' : '') +
    '<p><b>Ask around the table</b></p><ul>' + ((u.printable && u.printable.prompts) || []).map((x) => '<li>' + esc(x) + '</li>').join('') + '</ul>' +
    '<p><b>Pray together</b></p><p>“' + esc(u.prayer) + '”</p>';
}

function sheetPage(u, answers) {
  return '<section class="sheet">' +
    '<div class="art">' + colouringSVG(u) + '</div>' +
    '</section>' +
    '<section class="sheet">' + activityHTML(u, answers) + '</section>' +
    (craftHTML(u) ? '<section class="sheet">' + craftHTML(u) + '</section>' : '') +
    '<section class="sheet">' + parentHTML(u) + '</section>';
}

/* ---------- write ---------- */
fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(path.join(OUT, 'svg'), { recursive: true });
fs.mkdirSync(path.join(OUT, 'png'), { recursive: true });

let Resvg = null;
try { Resvg = (require('@resvg/resvg-js')).Resvg; } catch (e) { Resvg = null; }
const haveConvert = fs.existsSync('/usr/bin/convert');
// resvg is exact; ImageMagick here has no SVG delegate and silently renders
// blank pages, so it is only used for PNG -> PDF, never for SVG -> PNG.
function rasterise(svgText, outPng, width) {
  if (Resvg) {
    const png = new Resvg(svgText, { fitTo: { mode: 'width', value: width }, background: 'white' }).render().asPng();
    fs.writeFileSync(outPng, png);
    return true;
  }
  return false;
}
const toc = [];
let sheets = 0;
const hasPng = new Set();
for (const u of units) {
  const svg = svgDoc(colouringSVG(u));
  fs.writeFileSync(path.join(OUT, 'svg', u.id + '-colouring.svg'), svg);
  sheets++;
  try {
    if (!rasterise(svg, path.join(OUT, 'png', u.id + '-colouring.png'), 1224)) {
      fs.copyFileSync(path.join(OUT, 'svg', u.id + '-colouring.svg'), path.join(OUT, 'png', u.id + '-colouring.svg'));
    } else {
      hasPng.add(u.id);
    }
  } catch (e) { console.warn('  png failed for ' + u.id + ': ' + String(e.message).slice(0, 60)); }
  toc.push({ id: u.id, title: u.title, tier: u.tier, track: u.track });
}

const answers = true;
const AGE = { L: 'ages 3–6', M: 'ages 7–9', H: 'ages 10–12' };
const body = units.map((u) => {
  const files = ['svg/' + u.id + '-colouring.svg'].concat(hasPng.has(u.id) ? ['png/' + u.id + '-colouring.png'] : []);
  return '<h1 class="unit-head" id="' + esc(u.id) + '">' + esc(AGE[u.tier] || '') + ' · ' + esc(u.title) + '</h1>' +
    '<p class="tiny noprint">Just this unit: ' + files.map((f) =>
      '<a href="' + f + '">' + f.replace(/^.*\//, '').replace(/^.*\./, '').toUpperCase() + '</a>').join(' · ') +
    ' <span class="tiny">— open it and print that one page</span></p>' +
    sheetPage(u, answers);
}).join('\n<hr class="pagebreak">\n');

/* ---------- per-level PDF of the colouring pages ---------- */
let pdfs = [];
const pdfLinks = [];
const pngMode = Resvg ? 'png' : null;
if (haveConvert && pngMode) {
  for (const tierId of ['L', 'M', 'H']) {
    const pngs = units.filter((u) => u.tier === tierId && hasPng.has(u.id))
      .map((u) => path.join(OUT, 'png', u.id + '-colouring.png'));
    if (!pngs.length) continue;
    const out = path.join(OUT, 'colouring-' + tierId + '.pdf');
    try { execFileSync('/usr/bin/convert', pngs.concat([out]), { stdio: 'pipe' }); pdfs.push(path.relative(root, out) + ' (' + pngs.length + ' pages)'); pdfLinks.push(path.basename(out)); }
    catch (e) { console.warn('  pdf failed for tier ' + tierId + ': ' + String(e.message).slice(0, 70)); }
  }
}

/* ---------- the hub, last, so it can link files that now exist ---------- */
const index = '<!doctype html><html lang="en"><head><meta charset="utf-8">' +
  '<title>' + esc(M.BRAND.name) + ' — printable pack</title><style>' +
  '@page{size:letter portrait;margin:12mm}' +
  'body{font-family:Georgia,"Times New Roman",serif;color:#222;margin:0 auto;max-width:8in;padding:16px}' +
  'h1.unit-head{font-size:22px;margin:26px 0 6px;border-bottom:2px solid #222;padding-bottom:4px}' +
  'h2{font-size:18px;margin:16px 0 6px}.sheet{page-break-after:always}' +
  '.art svg{width:100%;height:auto;border:1px solid #ccc}' +
  '.q{margin:8px 0;padding:7px 0;border-bottom:1px dashed #bbb}.opts{margin:4px 0 0 18px}' +
  '.line{height:22px;border-bottom:1px solid #999;margin:10px 0}' +
  '.tiny{font-size:11px;color:#555}.ans{font-size:11px;color:#000;background:#f1f1f1;padding:4px 6px;display:inline-block}' +
  '.hard{background:#f7f1e6;padding:8px;border-left:3px solid #b9762a;font-size:13px}' +
  'table.pairs{width:100%}table.pairs td{width:50%;vertical-align:top}' +
  '.pagebreak{border:0;page-break-after:always}' +
  '.bar{display:flex;gap:10px;flex-wrap:wrap;align-items:center;margin:12px 0}' +
  '.bar a,.bar button{font:inherit;font-size:14px;padding:9px 14px;border:1px solid #222;border-radius:8px;background:#fff;color:#222;text-decoration:none}' +
  '@media print{.noprint{display:none}}</style></head><body>' +
  '<div class="noprint"><h1 style="font-size:26px">' + esc(M.BRAND.name) + ' — printable pack</h1>' +
  '<p>' + units.length + ' units × colouring, activity, craft and grown-up sheets. ' +
  'Use your browser’s Print dialog (letter, portrait, margins “none”, background graphics on) and choose “Save as PDF”.</p>' +
  '<p class="bar"><button onclick="window.print()">Print everything</button>' +
  (pdfLinks.length ? '<span>or download one level, colouring pages only:</span>' +
    pdfLinks.map((f) => {
      const id = f.replace(/^colouring-/, '').replace(/\.pdf$/, '');
      return '<a href="' + f + '">' + esc(AGE[id] || id) + ' <span class="tiny">PDF</span></a>';
    }).join(' · ') : '') + '</p>' +
  (pdfLinks.length ? '<p class="tiny">Each level PDF is one colouring page per unit. The activity, craft and grown-up sheets live on this page — print the pages you want.</p>' : '') +
  '<h2 style="font-size:16px">Contents</h2>' +
  '<ol>' + toc.map((t) => '<li><a href="#' + esc(t.id) + '">' + esc(t.title) + '</a> <span class="tiny">' + esc(t.tier) + ' · ' + esc((M.TRACKS[t.track] || {}).name || t.track) + '</span></li>').join('') + '</ol></div>' +
  '<hr class="pagebreak">' + body +
  '<p class="tiny">' + esc(M.BRAND.name) + ' · free forever, no ads · ' + esc(M.BRAND.appUrl) + ' · scripture from the World English Bible (public domain)</p>' +
  '</body></html>';
fs.writeFileSync(path.join(OUT, 'index.html'), index);

const svgN = fs.readdirSync(path.join(OUT, 'svg')).length;
const pngN = fs.existsSync(path.join(OUT, 'png')) ? fs.readdirSync(path.join(OUT, 'png')).filter((f) => f.endsWith('.png')).length : 0;
console.log('print pack written to ' + path.relative(root, OUT) + '/');
console.log('  colouring SVGs : ' + svgN + ' (' + sheets + ' sheets, one per unit, sized 8.5in × 11in)');
console.log('  colouring PNGs : ' + pngN + (pngMode ? ' (1224px, rendered with @resvg/resvg-js)' : '  — skipped'));
if (!pngMode) console.log('  note: install @resvg/resvg-js for PNG/PDF output; the SVGs and the print hub still work.');
console.log('  hub file       : ' + path.relative(root, path.join(OUT, 'index.html')) + ' (' + (fs.statSync(path.join(OUT, 'index.html')).size / 1024).toFixed(0) + ' kB, links ' + pdfLinks.length + ' PDFs + ' + (svgN + pngN) + ' sheets)');
if (pdfs.length) console.log('  level PDFs     : ' + pdfs.join(', '));
