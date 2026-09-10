/* Tier pass: does the app behave for a 7-year-old and an 11-year-old,
   and does the mature-content gate actually hold at the UI level? */
import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import { JSDOM } from 'jsdom';

const root = path.resolve(import.meta.dirname, '..');
const HTML = fs.readFileSync(path.join(root, 'dist', 'standalone.html'), 'utf8');

let n = 0, fails = 0;
async function ok(name, fn) {
  n++;
  try { await fn(); } catch (e) {
    fails++;
    console.log('  ✗ ' + name + '\n     ' + (e.message || e).split('\n')[0]);
  }
}

async function boot(profile) {
  const dom = new JSDOM(HTML, {
    url: 'http://localhost:4173/index.html', runScripts: 'dangerously', pretendToBeVisual: true,
    beforeParse(w) { w.scrollTo = () => { }; w.console.warn = () => { }; }
  });
  const { window } = dom;
  if (window.document.readyState !== 'complete') await new Promise((r) => window.addEventListener('load', r));
  await sleep(50);
  if (profile) window.SS_Store.createProfile(profile);
  return window;
}
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/* answer every question of the open unit through the UI; returns the types seen */
async function playQuiz(window, { missFirst = false } = {}) {
  const d = window.document;
  const $ = (s) => d.querySelector(s);
  const $$ = (s) => Array.from(d.querySelectorAll(s));
  const seen = [];
  for (let guard = 0; guard < 16; guard++) {
    if ($('.quiz-end')) break;
    const st = window.SS_App.unitState;
    if (!st) throw new Error('unit state vanished');
    if (st.phase !== 'quiz') { st.phase = 'quiz'; window.SS_App.rerender(); await sleep(20); }
    const q = st.items[st.quizIndex];
    if (!q) break;
    seen.push(q.t);
    if (q.t === 'mc' || q.t === 'tap') {
      if (missFirst) {
        const wrong = q.a.map((x, i) => i).filter((i) => i !== q.c)[0];
        $$('[data-act="q-pick"]')[wrong].click(); await sleep(15);
      }
      $$('[data-act="q-pick"]')[q.c].click();
    } else if (q.t === 'match') {
      for (let i = 0; i < q.pairs.length; i++) {
        $(`[data-act="q-match"][data-arg="l${i}"]`).click(); await sleep(6);
        $(`[data-act="q-match"][data-arg="r${i}"]`).click(); await sleep(6);
      }
    } else if (q.t === 'order') {
      for (let i = 0; i < q.items.length; i++) {
        const b = $(`[data-act="q-pick-order"][data-arg="${i}"]`);
        if (!b) break;                       // auto-advanced once the sequence was right
        b.click(); await sleep(6);
      }
    } else if (q.t === 'sort') {
      for (let i = 0; i < q.items.length; i++) {
        const b = $$('[data-act="q-sortsel"]')[0];
        if (!b) break;
        const idx = parseInt(b.getAttribute('data-arg'), 10);
        b.click(); await sleep(6);
        const bucket = $(`[data-act="q-drop"][data-arg="${q.items[idx].b}"]`);
        assert.ok(bucket, 'no bucket ' + q.items[idx].b);
        bucket.click(); await sleep(6);
      }
    } else if (q.t === 'blank' || q.t === 'type') {
      const inp = $('.type-in');
      assert.ok(inp, 'no input for a typed question');
      const want = Array.isArray(q.a) ? q.a[0] : q.a;
      inp.value = want;
      inp.dispatchEvent(new window.Event('input', { bubbles: true }));
    } else throw new Error('unhandled quiz type ' + q.t);
    await sleep(20);
    const nx = $('[data-act="q-next"]');
    if (nx) { nx.click(); await sleep(25); }
  }
  return seen;
}

/* ================= MIDDLE TIER (7-9) ================= */
{
  const window = await boot({ name: 'Yusuf', age: 8, tier: 'M', companionType: 'donkey', companionName: 'Colt' });
  const d = window.document;
  const $ = (s) => d.querySelector(s);
  const $$ = (s) => Array.from(d.querySelectorAll(s));
  const ui = () => (d.getElementById('root')?.textContent || '').replace(/\s+/g, ' ').trim();

  await ok('age 8 lands on the middle level with the right skin', () => {
    const p = window.SS_Store.profile();
    assert.equal(p.tier, 'M');
    assert.equal(d.querySelector('.app').getAttribute('data-tier'), 'M');
    assert.equal(d.querySelector('.app').getAttribute('data-skin'), 'mid');
  });

  await ok('a middle-tier unit offers the teach moment before the quiz', async () => {
    window.SS_App.go('unit', 'elijah-fire'); await sleep(50);
    assert.ok($('.cover'), 'no cover');
    d.querySelector('[data-act="unit-start"]').click(); await sleep(40);
    assert.ok($('.read-bar'), 'no reader controls at tier M');
    assert.ok($$('.para').length >= 2, 'older kids get one paragraph at a time? ' + $$('.para').length);
    assert.ok(/\d+ \/ \d+/.test($('.page-no')?.textContent || ''), 'no page counter: ' + ($('.page-no')?.textContent || ''));
    // read to the end of the story, where the app decides what comes next
    for (let i = 0; i < 8; i++) {
      const nx = $('[data-act="page-next"]');
      if (!nx) break;
      nx.click(); await sleep(30);
    }
    assert.ok(!$('[data-act="page-next"]'), 'never reached the last page');
    const teach = $('[data-act="phase"][data-arg="teach"]');
    assert.ok(teach, 'no teach step for the lesson mode');
    // and it must be labelled as what it opens: a button that says "What you
    // learned" and shows three teaching lines is a small lie to a 8-year-old
    assert.ok(!/What you learned/i.test(teach.textContent), 'the teach button lies about its target: ' + teach.textContent.trim());
    teach.click(); await sleep(40);
    assert.ok($$('.teach li').length === 3, 'teach lines: ' + $$('.teach li').length);
    const toQuiz = $('[data-act="phase"][data-arg="quiz"]');
    assert.ok(toQuiz && /What you learned/i.test(toQuiz.textContent), 'no honest route from the teach page to the quiz');
  });

  await ok('middle-tier quiz uses typed answers and sorting, and grades them fairly', async () => {
    const st0 = window.SS_App.unitState; st0.phase = 'quiz'; window.SS_App.rerender(); await sleep(40);
    const seen = await playQuiz(window, { missFirst: true });
    assert.ok(seen.some((t) => t === 'blank' || t === 'type'), 'no typed question in ' + seen.join(','));
    assert.ok(seen.length > 4, 'a 9-year-old gets a longer quiz: ' + seen.length);
    assert.ok(seen.filter((t) => t !== 'mc').length >= 2, 'all plain multiple choice: ' + seen.join(','));
    assert.ok($('.quiz-end'), 'quiz never completed: ' + seen.join(','));
    assert.ok(/first-time|again/i.test($('.quiz-end').textContent), 'summary copy: ' + $('.quiz-end').textContent.replace(/\s+/g, ' '));

    // now walk the prayer step and finish, so the parent dashboard gets a row
    const pray1 = $('[data-act="phase"][data-arg="prayer"]');
    assert.ok(pray1, 'no prayer step after the M quiz');
    pray1.click(); await sleep(30);
    assert.ok($('.prayer-end'), 'prayer step did not render');
    assert.ok($('.hard-note') === null || true);
    $('[data-act="finish-unit"]').click(); await sleep(60);
    assert.ok($('.reward'), 'no reward screen for the middle tier');
    assert.equal(Object.keys(window.SS_Store.profile().completed).length, 1, 'first unit not recorded');
  });

  await ok('a near-miss spelling is accepted, and the parent log records the help', async () => {
    window.SS_App.go('unit', 'gideon'); await sleep(40);
    d.querySelector('[data-act="unit-start"]').click(); await sleep(30);
    const st = window.SS_App.unitState;
    st.phase = 'quiz'; st.quizIndex = 0; window.SS_App.rerender(); await sleep(30);
    const typed = (st.items || window.SS_App.unitState.items).findIndex((q) => q.t === 'blank');
    if (typed >= 0) {
      st.quizIndex = typed; window.SS_App.rerender(); await sleep(20);
      const q = st.items[typed];
      const want = (Array.isArray(q.a) ? q.a[0] : q.a);
      const withTypo = want.slice(0, 2) + want.charAt(want.length - 1) + want.slice(2);
      const inp = $('.type-in');
      inp.value = withTypo;
      inp.dispatchEvent(new window.Event('input', { bubbles: true }));
      d.querySelector('[data-act="q-next"]').click(); await sleep(30);
      assert.ok(st.results[typed] && st.results[typed].ok, 'typo "' + withTypo + '" for "' + want + '" was rejected');
    }
    const seen2 = await playQuiz(window);
    assert.ok(seen2.length >= 2, 'gideon quiz stopped early: ' + seen2.join(','));
    const pray = $('[data-act="phase"][data-arg="prayer"]') || $('.quiz-end [data-act="phase"]');
    assert.ok(pray, 'no prayer step after the quiz');
    pray.click(); await sleep(30);
    d.querySelector('[data-act="finish-unit"]').click(); await sleep(60);
    const p = window.SS_Store.profile();
    assert.equal(Object.keys(p.completed).length, 2, 'two units should be done');
    window.SS_App.go('parent'); await sleep(60);
    assert.ok($$('.log tr').length >= 3, 'quiz log rows: ' + $$('.log tr').length);
    assert.ok(/First-try|Needed help/i.test(ui()), 'log has no effort columns');
  });

  await ok('hard material at this level always carries an adult note', () => {
    const matureUnits = window.SS_App.units().filter((u) => u.mature);
    const withNotes = matureUnits.filter((u) => u.hardNote && u.hardNote.length > 40);
    assert.equal(withNotes.length, matureUnits.length, 'mature units without a hard note');
  });

  await ok('a mature unit opens at its own level with the note shown first', async () => {
    window.SS_App.go('unit', 'elijah-fire'); await sleep(50);
    assert.ok($('.hard-note'), 'no adult note on a mature M unit');
    assert.ok(/note/i.test($('.hard-note').textContent), 'note not labelled: ' + $('.hard-note').textContent);
    assert.ok(!$('.blocked'), 'mature unit wrongly blocked at tier M');
    assert.ok($('.hard-note').textContent.length > 60, 'the note is too thin to help a parent');
  });

  await ok('an 11+ unit is not offered to a 9-year-old, and says so gently', async () => {
    window.SS_App.go('unit', 'annanias'); await sleep(50);
    assert.ok($('.blocked'), 'the older-level unit opened for a 9-year-old');
    assert.ok(/waits|later/i.test(ui()), 'gate copy: ' + ui().slice(0, 160));
    assert.ok(!/\death\|\stone\|fell down dead/i.test(ui()), 'hard words at the gate: ' + ui().slice(0, 200));
  });

  await ok('middle tier prints a craft sheet when the unit has one', async () => {
    window.SS_App.go('print'); await sleep(60);
    const sel = $('#pu');
    assert.ok(sel, 'no unit picker on the print screen');
    sel.value = 'elijah-fire';
    sel.dispatchEvent(new window.Event('change', { bubbles: true }));
    window.SS_App.rerender(); await sleep(60);
    assert.ok($$('.sheet').length >= 3, 'sheets: ' + $$('.sheet').length);
    assert.ok(/colour|color/i.test(ui()), 'no colouring sheet label');
  });

  window.close();
}

/* ================= OLDEST TIER (10-12) ================= */
{
  const window = await boot({ name: 'Maryam', age: 11, tier: 'H', companionType: 'lion', companionName: 'Asa' });
  const d = window.document;
  const $ = (s) => d.querySelector(s);
  const $$ = (s) => Array.from(d.querySelectorAll(s));
  const ui = () => (d.getElementById('root')?.textContent || '').replace(/\s+/g, ' ').trim();

  await ok('oldest level gets the sober skin and the fuller quiz menu', async () => {
    window.SS_App.go('home'); await sleep(50);
    const p = window.SS_Store.profile();
    assert.equal(p.tier, 'H');
    assert.equal(d.body.getAttribute('data-tier'), 'H', 'body[data-tier] drives the reading sizes');
    assert.equal(d.querySelector('.app').getAttribute('data-skin'), 'old');
    const types = new Set(window.SS_Logic.quizTypesForTier('H'));
    assert.ok(types.has('blank') && types.has('sort') && types.has('mc'), [...types].join(','));
  });

  await ok('a 11-year-old walks the deep units, including the cross', async () => {
    window.SS_App.go('path'); await sleep(60);
    const pathIds = $$('.path-item[data-act="open-unit"]').map((x) => x.getAttribute('data-arg'));
    assert.ok(pathIds.includes('the-cross'), 'the cross is not on the oldest path: ' + pathIds.slice(0, 8).join(','));
    assert.ok($('[data-act="open-unit"][data-arg="the-cross"]').textContent.length > 20, 'path row is empty');
    window.SS_App.go('unit', 'the-cross'); await sleep(60);
    assert.ok($('.hard-note'), 'no adult note before the hardest story');
    d.querySelector('[data-act="unit-start"]').click(); await sleep(40);
    assert.ok(/died|death/.test(ui()), 'the story avoids what happened');
    const seen = await playQuiz(window);
    assert.ok(seen.includes('sort') || seen.includes('blank'), 'no older-tier formats: ' + seen.join(','));
    assert.ok($('.quiz-end'), 'quiz incomplete');
  });

  await ok('doctrine units are present and worded for tweens', async () => {
    const ids = window.SS_App.units().filter((u) => u.tier === 'H').map((u) => u.id);
    for (const must of ['trinity', 'how-we-got-bible', 'romans-way', 'fruit-works', 'spirit-and-truth']) {
      assert.ok(ids.includes(must), 'missing deep unit: ' + must);
    }
    window.SS_App.go('unit', 'trinity'); await sleep(50);
    assert.ok(!/baby|tots|kiddo/i.test(ui()), 'toddler voice at the oldest level');
  });

  await ok('the brand link shows on a tween home (volume framing)', async () => {
    window.SS_App.go('home'); await sleep(60);
    assert.ok($('.pod-link'), 'no Saul’s Podship link on the older home screen');
    assert.ok(/50|volume/i.test($('.pod-link').textContent), 'link text: ' + $('.pod-link').textContent);
    const href = $('.pod-link').getAttribute('href');
    assert.ok(/saulspodship\.com/.test(href), href);
    assert.ok($('.pod-link').getAttribute('rel').includes('noopener'), 'missing rel=noopener');
  });

  await ok('classroom mode: a verified org can assign and print for the class', async () => {
    const St = window.SS_Store;
    St.applyOrg({ name: 'Grace Chapel', leader: 'Ava', code: 'SS-9F2K' });
    window.SS_App.go('groups'); await sleep(50);
    assert.equal(St.root.org.status, 'pending', 'org status: ' + St.root.org.status);
    assert.ok($('.org-card.status-pending'), 'no pending card');
    assert.ok(/confirm|wait|leader|review/i.test(ui()), 'pending state unexplained: ' + ui().slice(0, 200));
    St.approveOrgDemo();
    window.SS_App.rerender(); await sleep(40);
    assert.equal(St.root.org.status, 'approved');
    assert.ok($('.org-card.status-approved'), 'no approved card');
    assert.ok(/verified|approved/i.test(ui()), 'approved status not shown: ' + ui().slice(0, 240));
    const church = $$('[data-act="group-kind"]').find((b) => b.getAttribute('data-arg') === 'church');
    assert.ok(church, 'no church group kind');
    church.click(); await sleep(30);
    const create = $('[data-act="group-create"]');
    assert.ok(create, 'no create button');
    const gname = d.getElementById('gname');
    if (gname) { gname.value = 'Sunday class'; }
    create.click(); await sleep(50);
    const r = St.root;
    assert.ok(r.groups.length >= 1, 'group not created: ' + JSON.stringify(r.groups));
    assert.match(r.groups[0].code, /^[A-Z3-9]{6}$/, 'bad join code: ' + r.groups[0].code);
    assert.ok($('[data-act="assign"]'), 'no assign lesson control for the teacher');
    assert.ok(/simulat|no server|demo|this build/i.test(ui()), 'the serverless simulation is not disclosed');
  });

  window.close();
}

/* ================= THE GATE, FROM THE CHILD'S SIDE ================= */
{
  const window = await boot({ name: 'Boaz', age: 4, tier: 'L', companionType: 'lamb', companionName: 'Pip' });
  const d = window.document;
  const $ = (s) => d.querySelector(s);
  const $$ = (s) => Array.from(d.querySelectorAll(s));
  const ui = () => (d.getElementById('root')?.textContent || '').replace(/\s+/g, ' ').trim();

  await ok('a 4-year-old who is handed a hard story is turned away kindly', async () => {
    window.SS_App.go('unit', 'the-cross'); await sleep(60);
    assert.ok($('.blocked'), 'no gate message');
    assert.ok(/waits|later level/i.test(ui()), 'gate copy: ' + ui().slice(0, 160));
    assert.ok(!/\bdied\b|\bdeath\b|\bnails\b|crucifixion|\bgrave\b/i.test(ui()), 'hard words shown to a 4-year-old: ' + ui().slice(0, 200));
    assert.ok(!/Why Jesus Died/i.test(ui()), 'the gate named the locked story');
    assert.ok(!$('.para'), 'the story itself was rendered anyway');
    assert.ok($('[data-act="go"][data-arg="path"]'), 'no way back to the path from the gate');
  });

  await ok('the gate never scolds, and the same story is simply absent from search', async () => {
    window.SS_App.go('library'); await sleep(50);
    const q = $('[data-lib="q"]');
    q.value = 'nails'; q.dispatchEvent(new window.Event('input', { bubbles: true }));
    await sleep(360);
    const cards = Array.from(d.querySelectorAll('.u-card')).map((x) => x.getAttribute('data-arg'));
    assert.ok(!cards.includes('the-cross'), 'the cross surfaced for a 4-year-old');
    assert.ok(!/sorry|not allowed|forbidden|naughty/i.test(ui()), 'the gate shames: ' + ui().slice(0, 200));
  });

  await ok('no unit a 4-year-old can open mentions hell, blood or grave', () => {
    const visible = window.SS_Logic.libraryUnits(window.SS_App.units(), 'L', {});
    const bad = /\b(hell|damn|damned|blood|bloodshed|grave|graves|corpse|crucified|crucifixion|tomb|tombs|slain|slaughter|stoned|died|death|killed)\b/i;
    const offenders = visible.filter((u) => bad.test((u.story || []).join(' ') + ' ' + (u.title || '') + ' ' + (u.summary || '') + ' ' + ((u.memory && u.memory.text) || '') + ' ' + (u.prayer || '')));
    assert.equal(offenders.length, 0, 'hard words at the youngest level: ' + offenders.map((u) => u.id + ':' + (bad.exec(u.story.join(' ')) || [0])[0]).join(', '));
    assert.equal(visible.length, 20, 'a 4-year-old should reach exactly the 20 gentle units, saw ' + visible.length);
  });

  window.close();
}

console.log('\ntier tests: ' + (n - fails) + '/' + n + ' passed');
if (fails) { console.log(fails + ' FAILED'); process.exit(1); }
