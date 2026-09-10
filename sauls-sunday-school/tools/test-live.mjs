/* Live check against the DEPLOYED shape (index.html + 15 script files), not the
   single-file build. Needs the preview server up: node tools/serve.js dist */
import assert from 'node:assert/strict';
import { JSDOM } from 'jsdom';
import { spawn } from 'node:child_process';
import path from 'node:path';

/* Self-contained: if no server is given, start one on the built dist/ and stop
   it at the end, so this suite can run inside `npm test`. */
let child = null, BASE = process.env.BASE;
if (!BASE) {
  const port = 4391;
  BASE = 'http://localhost:' + port;
  child = spawn(process.execPath, [path.resolve(import.meta.dirname, 'serve.js'), 'dist'],
    { cwd: path.resolve(import.meta.dirname, '..'), env: { ...process.env, PORT: String(port) }, stdio: 'ignore' });
  await new Promise((res) => setTimeout(res, 700));
}
let ok1 = 0, bad = 0;
const ok = (name, fn) => (async () => { try { await fn(); ok1++; } catch (e) { bad++; console.log('  ✗ ' + name + '\n     ' + (e.message || e).split('\n')[0]); } })();
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const dom = await JSDOM.fromURL(BASE + '/index.html', {
  runScripts: 'dangerously', resources: 'usable', pretendToBeVisual: true
});
const { window } = dom;
window.scrollTo = () => { };
await new Promise((res) => {
  if (window.document.readyState === 'complete') return res();
  window.addEventListener('load', res);
  setTimeout(res, 8000);
});
await sleep(400);
const d = window.document;
const $ = (s) => d.querySelector(s);
const $$ = (s) => Array.from(d.querySelectorAll(s));
const ui = () => (d.getElementById('root')?.textContent || '').replace(/\s+/g, ' ').trim();

await ok('the multi-file page boots (script order is right, no missing global)', () => {
  assert.ok(window.SS_Logic && window.SS_App && window.SS_Art && window.SS_META, 'a global module failed to load');
  assert.equal(typeof window.SS_Logic.validateUnit, 'function');
  assert.ok(window.SS_App.units().length === 57, 'units loaded: ' + window.SS_App.units().length);
  assert.ok($('.app, .onboard'), 'nothing rendered: ' + ui().slice(0, 80));
});
await ok('the stylesheet is linked and served with the rules the app depends on', async () => {
  const link = $('link[rel=stylesheet]');
  assert.ok(link && /css\/app\.css/.test(link.getAttribute('href')), 'no stylesheet link');
  const css = await (await fetch(BASE + '/css/app.css')).text();
  assert.ok(css.length > 20000, 'css looks truncated: ' + css.length);
  // the two rules that change what a child physically sees
  assert.ok(/body\[data-tier="L"\] \.para \{[^}]*font-size:\s*clamp\(23px/.test(css), 'the 3-6 reading-size rule is missing');
  assert.ok(/--tap:\s*(5[2-9]|6[0-9])px/.test(css), 'tap-target token is gone');
  assert.ok(/@media print/.test(css), 'no print styles');
});
await ok('manifest and icons are reachable at the paths the HTML claims', async () => {
  for (const href of ['/manifest.webmanifest', '/assets/icons/favicon.svg', '/sw.js']) {
    const r = await fetch(BASE + href);
    assert.ok(r.ok, href + ' -> ' + r.status);
  }
  const mf = await (await fetch(BASE + '/manifest.webmanifest')).json();
  assert.equal(mf.start_url, './index.html');
  assert.ok(mf.icons.length === 3);
});
await ok('a child can onboard and reach a story over HTTP', async () => {
  const clickIf = (sel) => { const b = $(sel); if (b) { b.click(); return true; } return false; };
  for (let i = 0; i < 14; i++) {
    if ($('[data-act="ob-finish"]')) break;
    const name = $('[data-ob="name"]');
    if (name && !name.value) {
      name.value = 'Test';
      name.dispatchEvent(new window.Event('input', { bubbles: true }));
      name.dispatchEvent(new window.Event('change', { bubbles: true }));
    }
    const pet = $('[data-ob="compName"]');
    if (pet && !pet.value) {
      pet.value = 'Shep';
      pet.dispatchEvent(new window.Event('input', { bubbles: true }));
      pet.dispatchEvent(new window.Event('change', { bubbles: true }));
    }
    if (clickIf('[data-act="ob-comp"]')) { await sleep(40); continue; }     // pick a companion
    if (clickIf('[data-act="ob-skip-quiz"]')) { await sleep(40); continue; }  // adult skips placement
    clickIf('[data-act="ob-next"]');
    await sleep(45);
  }
  const fin = $('[data-act="ob-finish"]');
  assert.ok(fin, 'onboarding never reached the finish button: ' + ui().slice(0, 90));
  fin.click(); await sleep(150);
  assert.ok(/Continue|Story|garden|verses/i.test(ui()), 'no home after onboarding: ' + ui().slice(0, 120));
  window.SS_App.go('unit', 'jonah'); await sleep(90);
  assert.ok(/Jonah/i.test(ui()), 'no unit: ' + ui().slice(0, 120));
  $('[data-act="unit-start"]').click(); await sleep(90);
  assert.ok($('.para'), 'story did not render');
  assert.ok(d.body.getAttribute('data-tier'), 'body[data-tier] missing, so reading sizes are off');
  assert.ok($('svg .art, svg.art, .pages svg, .scripture'), 'no art or scripture block on the story page');
});
await ok('service worker file is scoped to the root and precaches the data files', async () => {
  const txt = await (await fetch(BASE + '/sw.js')).text();
  assert.ok(txt.includes("js/data/units-6.js"), 'sw does not cache the last data file');
  assert.ok(txt.includes('css/app.css'), 'sw does not cache the css');
});
window.close();
if (child) child.kill('SIGTERM');
console.log('\nlive (deployed shape) tests: ' + ok1 + '/' + (ok1 + bad) + (bad ? ' — ' + bad + ' FAILED' : ' passed'));
process.exit(bad ? 1 : 0);  // child is killed with the process
