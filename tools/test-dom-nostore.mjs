/* Does the app survive a device where storage is denied? (sandboxed iframe,
   file:// in some browsers, private-mode quota errors) */
import fs from 'node:fs'; import path from 'node:path'; import assert from 'node:assert/strict';
import { JSDOM } from 'jsdom';
const root = '/home/user/sauls-sunday-school';
const dom = new JSDOM(fs.readFileSync(path.join(root, 'dist/standalone.html'), 'utf8'), {
  url: 'http://localhost/', runScripts: 'dangerously', pretendToBeVisual: true,
  beforeParse(w) {
    w.scrollTo = () => {};
    w.console.warn = () => {};
    Object.defineProperty(w, 'localStorage', {
      configurable: true,
      get() { throw new DOMException('The user denied access', 'SecurityError'); }
    });
  }
});
const { window } = dom; const d = window.document;
if (d.readyState !== 'complete') await new Promise(r => window.addEventListener('load', r));
await new Promise(r => setTimeout(r, 250));
const $ = s => d.querySelector(s), $$ = s => Array.from(d.querySelectorAll(s));
const ui = () => (d.getElementById('root')?.textContent || '').replace(/\s+/g, ' ').trim();
try {
  assert.ok($('.onboard, .app'), 'nothing rendered at all');
  $('[data-act="ob-next"]').click(); await new Promise(r => setTimeout(r, 60));
  const inp = $('[data-ob="name"]'); inp.value = 'Guest';
  inp.dispatchEvent(new window.Event('change', { bubbles: true }));
  $('[data-act="ob-next"]').click(); await new Promise(r => setTimeout(r, 40));
  $$('[data-act="ob-age"]')[3].click(); await new Promise(r => setTimeout(r, 40));
  $('[data-act="ob-next"]').click(); await new Promise(r => setTimeout(r, 40));
  $('[data-act="ob-skip-quiz"]') && $('[data-act="ob-skip-quiz"]').click();
  await new Promise(r => setTimeout(r, 60));
  if ($('[data-act="ob-next"]')) $('[data-act="ob-next"]').click();
  await new Promise(r => setTimeout(r, 60));
  $('[data-act="ob-comp"]') && $('[data-act="ob-comp"]').click();
  await new Promise(r => setTimeout(r, 60));
  if ($('[data-act="ob-next"]')) $('[data-act="ob-next"]').click();
  await new Promise(r => setTimeout(r, 60));
  const fin = $('[data-act="ob-finish"]');
  assert.ok(fin, 'onboarding stalled without storage: ' + ui().slice(0, 120));
  const reviewUi = ui();          // the screen the grown-up reads before finishing
  fin.click(); await new Promise(r => setTimeout(r, 150));
  assert.ok(window.SS_Store.profile(), 'profile was not created in memory');
  assert.ok(/Continue|Story/i.test(ui()), 'home missing: ' + ui().slice(0, 120));
  assert.equal(window.SS_Store.persistent, false, 'the app did not notice storage is unavailable');
  window.SS_App.go('unit', 'jonah'); await new Promise(r => setTimeout(r, 80));
  $('[data-act="unit-start"]').click(); await new Promise(r => setTimeout(r, 80));
  assert.ok($('.para'), 'story cannot be read without storage');
  window.SS_App.go && 0;
console.log('storage-denied run: ok — app runs in memory, persistent flag =', window.SS_Store.persistent);
  assert.ok(/blocking saved data/i.test(reviewUi), 'the grown-up is never told nothing will be kept at the end of onboarding: ' + reviewUi.slice(-160));
  // and the parent screen says it too, in the language the family chose
  window.SS_App.go('parent'); await new Promise(r => setTimeout(r, 80));
  assert.ok(/blocking saved data/i.test(ui()), 'the parent view does not disclose the storage state');
  window.SS_I18n.set('ur');
  window.SS_App.go('onboard'); await new Promise(r => setTimeout(r, 80));
  window.close();
} catch (e) {
  try { window.close(); } catch (x) { }
  console.log('no-storage tests FAILED: ' + e.message);
  process.exit(1);
}
console.log('no-storage tests: ok — the app runs, and says out loud that nothing is kept');
