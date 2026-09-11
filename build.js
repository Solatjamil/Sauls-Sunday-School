/* Build step
   1. dist/            → deployable static site (upload to Sundayschool.saulspodship.com)
   2. dist/standalone.html → everything inlined into one file (double-click, or drop
      in an email; also what jsdom tests run against)
   No framework, no bundler, no runtime dependencies. */
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const ROOT = __dirname;
const OUT = path.join(ROOT, 'dist');
const SRC_ORDER = [
  'js/core/logic.js', 'js/core/i18n.js', 'js/data/meta.js',
  'js/data/units-1.js', 'js/data/units-2.js', 'js/data/units-3.js', 'js/data/units-4.js',
  'js/data/units-5.js', 'js/data/units-6.js', 'js/data/units-7.js', 'js/data/units-8.js', 'js/data/units-9.js',
  'js/data/audio.js',
  'js/data/story-i18n.js',
  'js/core/store.js', 'js/core/art.js', 'js/core/speech.js', 'js/core/sync.js',
  'js/app.js', 'js/app2.js'
];
function read(p) { return fs.readFileSync(path.join(ROOT, p), 'utf8'); }
function rmrf(p) { if (fs.existsSync(p)) fs.rmSync(p, { recursive: true, force: true }); }
function copyDir(src, dst) {
  fs.mkdirSync(dst, { recursive: true });
  for (const e of fs.readdirSync(src, { withFileTypes: true })) {
    const s = path.join(src, e.name), d = path.join(dst, e.name);
    if (e.isDirectory()) copyDir(s, d); else fs.copyFileSync(s, d);
  }
}

rmrf(OUT);
fs.mkdirSync(OUT, { recursive: true });
['css', 'js', 'assets', 'sw.js', 'manifest.webmanifest', 'index.html', 'robots.txt', 'sitemap.xml', 'humans.txt', 'llms.txt', '.well-known'].forEach((p) => {
  const s = path.join(ROOT, p);
  if (!fs.existsSync(s)) { console.warn('  missing:', p); return; }
  if (fs.statSync(s).isDirectory()) copyDir(s, path.join(OUT, p));
  else fs.copyFileSync(s, path.join(OUT, p));
});

/* ---- standalone single file ---- */
const css = read('css/app.css');
const js = SRC_ORDER.map((p) => '/* ==== ' + p + ' ==== */\n' + read(p)).join('\n;\n');
const favicon = 'data:image/svg+xml;base64,' + Buffer.from(read('assets/icons/favicon.svg')).toString('base64');
const html = `<!doctype html>
<html lang="en" dir="ltr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover, maximum-scale=5">
<title>Saul’s Sunday School — free Bible learning for ages 3–12</title>
<meta name="description" content="A free, ad-free Bible learning app for kids 3–12 from Saul’s Podship.">
<meta name="theme-color" content="#f2a13b">
<link rel="icon" href="${favicon}">
<style>
${css}
</style>
</head>
<body>
<div id="root" aria-live="polite"></div>
<noscript><div style="font-family:system-ui;padding:24px">This app needs JavaScript turned on.</div></noscript>
<script>
${js}
window.addEventListener('load', function () {
  SS_App.boot({ logic: SS_Logic, i18n: SS_I18n, store: SS_Store, art: SS_Art, speech: SS_Speech, sync: SS_Sync, meta: SS_META });
});
</script>
</body>
</html>`;
fs.writeFileSync(path.join(OUT, 'standalone.html'), html);

/* ---- size report ---- */
const kb = (n) => (n / 1024).toFixed(1) + ' kB';
const unitsTotal = SRC_ORDER.filter((p) => p.includes('units-'))
  .reduce((a, p) => a + fs.statSync(path.join(ROOT, p)).size, 0);
console.log('built dist/');
console.log('  dist/index.html        ', kb(fs.statSync(path.join(OUT, 'index.html')).size));
console.log('  dist css+js+data       ', kb(fs.readdirSync(path.join(OUT, 'js'), { recursive: true })
  .filter((f) => String(f).endsWith('.js')).reduce((a, f) => a + fs.statSync(path.join(OUT, 'js', f)).size, 0) + fs.statSync(path.join(OUT, 'css/app.css')).size));
console.log('  curriculum data        ', kb(unitsTotal));
console.log('  dist/standalone.html   ', kb(Buffer.byteLength(html)), '(single file, no network needed)');

/* classroom print pack: same command, so dist/ is never missing /print/.
   SKIP_PRINT=1 node build.js to skip it. */
const printer = path.join(ROOT, 'tools', 'build-print.mjs');
if (!process.env.SKIP_PRINT && fs.existsSync(printer)) {
  try {
    execFileSync(process.execPath, [printer], { cwd: ROOT, stdio: ['ignore', 'ignore', 'inherit'] });
  } catch (e) { console.warn('  print pack skipped:', String(e.message).slice(0, 60)); }
}
