/* Print pack proof.
   This suite exists because a build once produced 57 perfectly valid-looking PNGs
   and 3 PDFs that were entirely blank: ImageMagick rasterised the SVG with its
   internal MSVG coder, dropped every stroke, and exited 0. Exit codes and file
   sizes lied; only the pixels told the truth. So here we decode the pixels. */
import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const root = path.resolve(import.meta.dirname, '..');
const dist = path.join(root, 'dist');
const PRINT = path.join(dist, 'print');

let ok = 0, bad = 0;
const t = (name, fn) => { try { fn(); ok++; } catch (e) { bad++; console.log('  ✗ ' + name + '\n     ' + String(e.message || e).split('\n')[0]); } };

/* ---------- tiny PNG reader (no deps, so `npm test` runs anywhere) ---------- */
function png(buf) {
  assert.equal(buf.readUInt32BE(0), 0x89504e47, 'not a PNG signature');
  let off = 8, ihdr = null, idat = [], palette = null;
  while (off + 8 <= buf.length) {
    const len = buf.readUInt32BE(off);
    const type = buf.toString('ascii', off + 4, off + 8);
    const data = buf.subarray(off + 8, off + 8 + len);
    if (type === 'IHDR') ihdr = { w: data.readUInt32BE(0), h: data.readUInt32BE(4), depth: data[8], color: data[9], interlace: data[12] };
    else if (type === 'PLTE') palette = data;
    else if (type === 'IDAT') idat.push(data);
    else if (type === 'IEND') break;
    off += 12 + len;
  }
  assert.ok(ihdr, 'no IHDR');
  assert.equal(ihdr.interlace, 0, 'interlaced PNG (Adam7) — this reader does not handle it');
  assert.equal(ihdr.depth, 8, 'bit depth ' + ihdr.depth + ' (only 8 supported here)');
  const ch = { 0: 1, 2: 3, 3: 1, 4: 2, 6: 4 }[ihdr.color];
  assert.ok(ch, 'unknown colour type ' + ihdr.color);
  const raw = zlib.inflateSync(Buffer.concat(idat));
  const stride = ihdr.w * ch;
  const out = Buffer.alloc(ihdr.h * stride);
  let p = 0;
  for (let y = 0; y < ihdr.h; y++) {
    const filter = raw[p++];
    const line = raw.subarray(p, p + stride); p += stride;
    const cur = out.subarray(y * stride, (y + 1) * stride);
    const prev = y ? out.subarray((y - 1) * stride, y * stride) : null;
    for (let x = 0; x < stride; x++) {
      const a = x >= ch ? cur[x - ch] : 0, b = prev ? prev[x] : 0, c = (prev && x >= ch) ? prev[x - ch] : 0;
      let v = line[x];
      if (filter === 1) v += a; else if (filter === 2) v += b; else if (filter === 3) v += (a + b) >> 1;
      else if (filter === 4) { const pa = Math.abs(b - c), pb = Math.abs(a - c), pc = Math.abs(a + b - 2 * c); v += (pa <= pb && pa <= pc) ? a : (pb <= pc ? b : c); }
      cur[x] = v & 255;
    }
  }
  return { w: ihdr.w, h: ihdr.h, ch, stride, pixels: out, palette };
}
/* ink coverage: fraction of sampled pixels clearly darker than the paper */
function ink(img, step) {
  step = step || 2;
  let dark = 0, n = 0;
  for (let y = 0; y < img.h; y += step * 4) {
    for (let x = 0; x < img.w; x += step) {
      const o = y * img.stride + x * img.ch;
      let g;
      if (img.ch === 1 && img.palette) { const i = img.pixels[o]; g = (img.palette[i * 3] + img.palette[i * 3 + 1] + img.palette[i * 3 + 2]) / 3; }
      else if (img.ch >= 3) g = (img.pixels[o] * 0.299 + img.pixels[o + 1] * 0.587 + img.pixels[o + 2] * 0.114);
      else g = img.pixels[o];
      n++; if (g < 140) dark++;
    }
  }
  return { dark, n, frac: n ? dark / n : 0 };
}

/* How long is this recording? Decode the frame headers rather than trusting the
   file size — a truncated or silent export has to fail here, not in a classroom. */
const BITRATE = {
  1: [0, 32, 40, 48, 56, 64, 80, 96, 112, 128, 160, 192, 224, 256, 320, 0],   // MPEG1 LIII
  2: [0, 8, 16, 24, 32, 40, 48, 56, 64, 80, 96, 112, 128, 144, 160, 0]         // MPEG2 / 2.5 LIII
};
const RATE = [[11025, 12000, 8000], [22050, 24000, 16000], [44100, 48000, 32000]];
function mp3Seconds(buf) {
  let i = 0;
  if (buf.length > 10 && buf.toString('ascii', 0, 3) === 'ID3') {
    i = 10 + ((buf[6] << 21) | (buf[7] << 14) | (buf[8] << 7) | buf[9]);
  }
  let sec = 0, frames = 0, k = i;
  while (k + 4 < buf.length) {
    if (buf[k] !== 0xff || (buf[k + 1] & 0xe0) !== 0xe0) { k++; continue; }
    const ver = (buf[k + 1] >> 3) & 3;           // 3 = MPEG1, 2 = MPEG2, 0 = MPEG2.5
    const layer = (buf[k + 1] >> 1) & 3;         // 1 = Layer III
    if (layer !== 1 || ver === 1) { k++; continue; }
    const brI = (buf[k + 2] >> 4) & 15, srI = (buf[k + 2] >> 2) & 3, pad = (buf[k + 2] >> 1) & 1;
    if (srI === 3) { k++; continue; }
    const mpeg1 = ver === 3;
    const kbps = BITRATE[mpeg1 ? 1 : 2][brI], rate = RATE[mpeg1 ? 2 : (ver === 2 ? 1 : 0)][srI];
    if (!kbps || !rate) { k++; continue; }
    const len = Math.floor((mpeg1 ? 144000 : 72000) * kbps / rate) + pad;
    sec += (mpeg1 ? 1440 : 720) / rate;
    frames++;
    k += Math.max(4, len);
  }
  return frames ? sec : 0;
}

/* ---------------------------------------------------------------- content side */
let units = [];
for (const f of ['units-1', 'units-2', 'units-3', 'units-4', 'units-5', 'units-6']) {
  const p = path.join(root, 'js/data', f + '.js');
  if (fs.existsSync(p)) units = units.concat(require(p));
}
const byTier = { L: [], M: [], H: [] };
units.forEach((u) => (byTier[u.tier] || (byTier[u.tier] = [])).push(u));

t('the print folder survived the build', () => {
  assert.ok(fs.existsSync(PRINT), 'no dist/print/ — run node build.js (it calls tools/build-print.mjs)');
  for (const sub of ['svg', 'png']) assert.ok(fs.existsSync(path.join(PRINT, sub)), 'no dist/print/' + sub);
});

t('every unit has a colouring SVG and a PNG of the same aspect as the sheet', () => {
  for (const u of units) {
    const svg = path.join(PRINT, 'svg', u.id + '-colouring.svg');
    const pngf = path.join(PRINT, 'png', u.id + '-colouring.png');
    assert.ok(fs.existsSync(svg), u.id + ': no svg');
    assert.ok(fs.existsSync(pngf), u.id + ': no png (this is what the PDF is made of)');
    const s = fs.readFileSync(svg, 'utf8');
    assert.ok(/<svg[^>]*xmlns="http:\/\/www\.w3\.org\/2000\/svg"/.test(s), u.id + ': svg lost its xmlns');
    assert.ok(/viewBox="0 0 816 1056"/.test(s), u.id + ': svg lost the sheet-unit viewBox');
    // physical page size, or a printer crops the right third of the picture
    assert.ok(/width="8\.5in"/.test(s) && /height="11in"/.test(s), u.id + ': svg is not sized 8.5in × 11in for letter paper');
    const img = png(fs.readFileSync(pngf));
    assert.equal(img.w, 1224, u.id + ': png is ' + img.w + ' wide, expected 1224');
    assert.ok(Math.abs(img.h / img.w - 1056 / 816) < 0.01, u.id + ': png aspect ' + (img.h / img.w).toFixed(3) + ' is not the page shape');
  }
});

t('no sheet is blank, and no sheet is a black rectangle', () => {
  for (const u of units) {
    const img = png(fs.readFileSync(path.join(PRINT, 'png', u.id + '-colouring.png')));
    const r = ink(img);
    assert.ok(r.frac > 0.0008, u.id + ': ink coverage ' + (r.frac * 100).toFixed(3) + '% — nothing was drawn');
    assert.ok(r.frac < 0.45, u.id + ': ink coverage ' + (r.frac * 100).toFixed(1) + '% — the page is flooded, not outlined');
  }
});

t('a line drawing is actually a line drawing (paper is white at the corners)', () => {
  const img = png(fs.readFileSync(path.join(PRINT, 'png', units[0].id + '-colouring.png')));
  for (const [x, y] of [[3, 3], [img.w - 4, 3], [3, img.h - 4], [img.w - 4, img.h - 4]]) {
    const o = y * img.stride + x * img.ch;
    const px = [img.pixels[o], img.pixels[o + 1] || img.pixels[o], img.pixels[o + 2] || img.pixels[o]];
    assert.ok(Math.min(px[0], px[1], px[2]) > 200, 'corner ' + x + ',' + y + ' is rgb(' + px.join(',') + ') — should be white paper');
  }
});

t('each tier PDF has exactly one page per unit in that tier', () => {
  for (const tier of ['L', 'M', 'H']) {
    const f = path.join(PRINT, 'colouring-' + tier + '.pdf');
    assert.ok(fs.existsSync(f), 'missing ' + path.basename(f));
    const buf = fs.readFileSync(f);
    assert.equal(buf.toString('ascii', 0, 5), '%PDF-', path.basename(f) + ' is not a PDF');
    assert.ok(/%%EOF\s*$/.test(buf.toString('latin1').slice(-32)), path.basename(f) + ' trailing bytes are not an EOF marker');
    const text = buf.toString('latin1');
    const pages = (text.match(/\/Type\s*\/Page[^sA-Za-z]/g) || []).length;
    assert.ok(pages > 0, path.basename(f) + ': no page objects found');
    assert.equal(pages, byTier[tier].length, path.basename(f) + ' has ' + pages + ' pages, but tier ' + tier + ' has ' + byTier[tier].length + ' units');
    const mb = (buf.length / 1048576).toFixed(2);
    assert.ok(buf.length > byTier[tier].length * 2000, path.basename(f) + ' is ' + mb + ' MB for ' + pages + ' pages — too thin to contain the drawings');
  }
});

t('the print hub links every sheet and every PDF, and no link is broken', () => {
  const hub = fs.readFileSync(path.join(PRINT, 'index.html'), 'utf8');
  assert.ok(!/undefined|NaN|\[object Object\]/.test(hub), 'the hub leaked a raw value into the markup');
  for (const u of units) {
    assert.ok(hub.includes('id="' + u.id + '"'), 'hub has no section for ' + u.id);
    assert.ok(hub.includes('href="svg/' + u.id + '-colouring.svg"'), 'hub does not link ' + u.id + ' SVG');
    const pngs = path.join(PRINT, 'png', u.id + '-colouring.png');
    if (fs.existsSync(pngs)) assert.ok(hub.includes('href="png/' + u.id + '-colouring.png"'), 'hub hides the PNG for ' + u.id + ' although it exists');
  }
  for (const tier of ['L', 'M', 'H']) {
    if (fs.existsSync(path.join(PRINT, 'colouring-' + tier + '.pdf'))) {
      assert.ok(hub.includes('href="colouring-' + tier + '.pdf"'), 'the ' + tier + ' PDF is on disk but nothing links to it');
    }
  }
  const hrefs = [...hub.matchAll(/href="([^"#]+)"/g)].map((m) => m[1]).filter((h) => !/^https?:/.test(h));
  assert.ok(hrefs.length >= units.length, 'hub has ' + hrefs.length + ' links for ' + units.length + ' sheets');
  for (const h of new Set(hrefs)) {
    assert.ok(fs.existsSync(path.join(PRINT, path.normalize(h))), 'hub links to a missing file: ' + h);
  }
});

t('a parent can print from the app without the dist folder (in-app sheet renderer still draws)', () => {
  const app = fs.readFileSync(path.join(root, 'js/app2.js'), 'utf8');
  assert.ok(/function printDoc/.test(app), 'printDoc is gone — the in-app print path and this pack must stay in sync');
  const gen = fs.readFileSync(path.join(root, 'tools/build-print.mjs'), 'utf8');
  assert.ok(/resvg/i.test(gen), 'the generator no longer rasterises with resvg (ImageMagick alone produces blank pages)');
  assert.ok(/Resvg/.test(gen) && /haveConvert/.test(gen), 'the resvg/pdf gate is missing');
});

/* --------------------------------------------------------- recorded narration */
t('recorded narration is mapped, shipped, and playable', () => {
  const mod = require(path.join(root, 'js/data/audio.js'));
  const map = mod.SS_AUDIO || {};
  const src = path.join(root, 'assets/audio');
  const onDisk = [];
  if (fs.existsSync(src)) for (const d of fs.readdirSync(src)) {
    const dir = path.join(src, d);
    if (fs.statSync(dir).isDirectory()) fs.readdirSync(dir).forEach((f) => onDisk.push(d + '/' + f));
  }
  const inMap = new Set();
  for (const [unit, langs] of Object.entries(map)) for (const [lang, keys] of Object.entries(langs)) for (const [key, rel] of Object.entries(keys)) {
    const tag = unit + '/' + path.basename(rel);
    inMap.add(tag);
    const abs = path.join(root, rel);
    assert.ok(fs.existsSync(abs), unit + '.' + lang + '.' + key + ' points at ' + rel + ' which does not exist');
    assert.ok(fs.existsSync(path.join(dist, rel)), rel + ' is not in dist/ — the site would 404 the audio');
    const b = fs.readFileSync(abs);
    assert.ok(b.length > 1024, rel + ' is ' + b.length + ' bytes');
    const okHead = b.toString('ascii', 0, 3) === 'ID3' || (b[0] === 0xff && (b[1] & 0xe0) === 0xe0);
    assert.ok(okHead, rel + ' does not start like an MP3 frame');
    const secs = mp3Seconds(b);
    assert.ok(secs && secs > 3 && secs < 75, rel + ' holds ' + (secs ? secs.toFixed(1) + 's' : 'no parseable audio') + ' — expected a spoken paragraph');
  }
  for (const f of onDisk) assert.ok(inMap.has(f), 'assets/audio/' + f + ' is not in the map — run npm run audio');
});

console.log('\nprint tests: ' + ok + '/' + (ok + bad) + (bad ? ' — ' + bad + ' FAILED' : ' passed'));
process.exit(bad ? 1 : 0);
