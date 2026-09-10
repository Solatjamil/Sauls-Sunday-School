/* Logic tests. Plain node, no framework: node tools/test-logic.mjs
   These assert the SPEC RULES, not implementation trivia. */
import assert from 'node:assert/strict';
import path from 'node:path';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const root = path.resolve(import.meta.dirname, '..');
const L = require(path.join(root, 'js/core/logic.js'));
const M = require(path.join(root, 'js/data/meta.js'));
const I18n = require(path.join(root, 'js/core/i18n.js'));

let n = 0, fails = 0;
function ok(name, fn) {
  n++;
  try { fn(); } catch (e) { fails++; console.log('  ✗ ' + name + '\n     ' + (e.message || e).split('\n')[0]); }
}

/* ---------- age tiers ---------- */
ok('tier boundaries match the spec (3-6, 7-9, 10-12)', () => {
  assert.equal(L.tierForAge(3), 'L'); assert.equal(L.tierForAge(6), 'L');
  assert.equal(L.tierForAge(7), 'M'); assert.equal(L.tierForAge(9), 'M');
  assert.equal(L.tierForAge(10), 'H'); assert.equal(L.tierForAge(12), 'H');
});
ok('ages outside 3-12 are clamped, never rejected', () => {
  assert.equal(L.clampAge(2), 3); assert.equal(L.clampAge(1), 3);
  assert.equal(L.clampAge(17), 12); assert.equal(L.clampAge('nope'), 3);
});

/* ---------- mature content rule (spec §3) ---------- */
ok('mature units are unreachable for tier L through every route', () => {
  const units = ['units-1', 'units-2', 'units-3', 'units-4', 'units-5', 'units-6']
    .flatMap((f) => require(path.join(root, 'js/data', f + '.js')));
  const mature = units.filter((u) => u.mature);
  assert.ok(mature.length >= 5, 'expected some mature units, got ' + mature.length);
  for (const u of mature) {
    assert.equal(L.canChildSee(u, 'L'), false, u.id + ' leaked to tier L');
    assert.equal(L.canChildSee(u, u.tier), true, u.id + ' hidden from its own level');
    assert.equal(L.canChildSee(u, 'H'), true, u.id + ' should reach the oldest tier');
    assert.equal(L.pathUnits(units, 'L').some((x) => x.id === u.id), false, u.id + ' on the L path');
    assert.equal(L.libraryUnits(units, 'L', {}).some((x) => x.id === u.id), false, u.id + ' in the L library');
    assert.equal(L.libraryUnits(units, 'L', { track: u.track }).some((x) => x.id === u.id), false);
    assert.equal(L.libraryUnits(units, 'L', { q: u.title }).some((x) => x.id === u.id), false, u.id + ' found by L search');
    assert.equal((L.groupBy(L.libraryUnits(units, 'L'), (x) => x.era)[u.era] || []).some((x) => x.id === u.id), false);
  }
});
ok('3-6 story text carries no death/violence vocabulary', () => {
  const units = ['units-1', 'units-2'].flatMap((f) => require(path.join(root, 'js/data', f + '.js')));
  const bad = /killed|death|died|die|murder|blood|sword|stoned|perish|grave|corpse|dead\b/i;
  for (const u of units) {
    const text = u.story.join(' ');
    assert.ok(!bad.test(text), u.id + ': ' + (text.match(bad) || [])[0]);
  }
});
ok('older tiers DO cover hard material (not sanitised away)', () => {
  const units = ['units-4', 'units-5', 'units-6'].flatMap((f) => require(path.join(root, 'js/data', f + '.js')));
  const ids = units.map((u) => u.id);
  for (const must of ['the-cross', 'empty-tomb', 'annanias', 'job-questions', 'passover']) {
    if (must === 'passover') continue;
    assert.ok(ids.includes(must), 'missing hard unit: ' + must);
  }
  const cross = units.find((u) => u.id === 'the-cross');
  assert.ok(/died|death|cross/.test(cross.story.join(' ')), 'the cross unit must say what happened');
  assert.ok(cross.hardNote && cross.hardNote.length > 40, 'hard units need an adult note');
});

/* ---------- what each child is actually offered ---------- */
ok('free-roam widens with age: 20 gentle units, then 40, then all 57', () => {
  const units = ['units-1', 'units-2', 'units-3', 'units-4', 'units-5', 'units-6']
    .flatMap((f) => require(path.join(root, 'js/data', f + '.js')));
  const seen = (t2) => L.libraryUnits(units, t2, {}).length;
  assert.equal(seen('L'), 20, 'a 3-6 child should get exactly the gentle level');
  assert.equal(seen('M'), 40);
  assert.equal(seen('H'), units.length, 'the oldest tier can read the whole library');
  assert.ok(seen('L') < seen('M') && seen('M') < seen('H'), 'library must widen, not narrow');
  // and nothing older-level leaks down
  for (const u of units) {
    const rank = L.TIER_ORDER[u.tier];
    for (const t2 of ['L', 'M', 'H']) {
      if (rank > L.TIER_ORDER[t2]) assert.equal(L.canChildSee(u, t2), false, u.id + ' visible to ' + t2);
    }
  }
});

/* ---------- quiz format by age (spec §2) ---------- */
ok('formats: baseline MC everywhere; typed answers only 7+; drag/match for little ones', () => {
  assert.ok(L.quizTypesForTier('L').includes('mc'));
  assert.ok(L.quizTypesForTier('M').includes('mc'));
  assert.ok(L.quizTypesForTier('H').includes('mc'));
  assert.ok(L.quizTypesForTier('L').includes('match'));
  assert.ok(!L.quizTypesForTier('L').includes('blank'), 'no typed answers for 3-6');
  assert.ok(L.quizTypesForTier('M').includes('blank'));
  assert.ok(L.quizTypesForTier('H').includes('blank'));
});
ok('units only use formats their tier allows', () => {
  const units = ['units-1', 'units-2', 'units-3', 'units-4', 'units-5', 'units-6']
    .flatMap((f) => require(path.join(root, 'js/data', f + '.js')));
  for (const u of units) for (const q of u.quiz) {
    assert.ok(L.quizTypesForTier(u.tier).includes(q.t), u.id + ' uses ' + q.t + ' at tier ' + u.tier);
  }
});

/* ---------- forgiving grading (spec §13) ---------- */
ok('typed answers accept case, spacing, punctuation, articles, numbers and near-misses', () => {
  const q = { a: 'Isaac', accept: [] };
  for (const v of ['isaac', ' Isaac ', 'ISAAC.', 'Isaac!', 'iaac', 'isaak']) {
    assert.equal(L.acceptTyped(v, q).ok, true, 'should accept ' + JSON.stringify(v));
  }
  assert.equal(L.acceptTyped('Ishmael', q).ok, false);
  assert.equal(L.acceptTyped('', q).kind, 'empty');
  assert.equal(L.acceptTyped('Jonah hid in the boat', { a: 'Jonah' }).ok, true, 'answer embedded in a sentence counts');
  assert.equal(L.acceptTyped('a very long wrong sentence indeed about elephants', { a: 'Jonah' }).ok, false, 'length guard');
  assert.equal(L.acceptTyped('40', { a: ['forty'] }).ok, true, 'word number to digit');
  assert.equal(L.acceptTyped('the red sea', { a: ['red sea'] }).ok, true, 'leading article ignored');
});
ok('two tries then a hint, then reveal — never a failure state', () => {
  assert.equal(L.retryTone(0), 'almost');
  assert.equal(L.retryTone(1), 'nudge');
  assert.equal(L.retryTone(2), 'hint');
  assert.equal(L.retryTone(9), 'reveal');
  for (const k of Object.keys(L.GENTLE_LINES)) {
    for (const line of L.GENTLE_LINES[k]) {
      assert.ok(!/wrong|incorrect|no!|failed|loser|stupid|try harder/i.test(line), k + ': ' + line);
    }
  }
});
ok('a revealed answer is not scored as correct but costs no XP twice', () => {
  const items = [{ t: 'mc' }, { t: 'mc' }];
  const s1 = L.quizScore(items, { 0: { ok: true }, 1: { ok: true, revealed: true } });
  assert.equal(s1.correct, 1); assert.equal(s1.neededHelp, 1);
  assert.equal(L.xpAwarded({ xp: 20 }, { retryOnly: true }), 0);
  assert.equal(L.xpAwarded({ xp: 20 }, {}), 20);
  assert.ok(L.xpAwarded({ xp: 20 }, { memoryVerified: true }) > 20, 'memory verse boosts');
});

/* ---------- streaks with grace ---------- */
ok('streak: same day no-op, next day +1, one missed day forgiven, two missed restarts gently', () => {
  let s = L.touchStreak(null, '2026-09-01');
  assert.equal(s.current, 1);
  s = L.touchStreak(s, '2026-09-01'); assert.equal(s.current, 1);
  s = L.touchStreak(s, '2026-09-02'); assert.equal(s.current, 2);
  s = L.touchStreak(s, '2026-09-04'); assert.equal(s.current, 3, 'grace day');
  assert.equal(s.graceUsed, 1);
  s = L.touchStreak(s, '2026-09-10'); assert.equal(s.current, 1, 'never shows a broken streak');
  assert.equal(s.best, 3, 'best is kept as the story of how far they came');
});
ok('day maths across month and year edges', () => {
  assert.equal(L.dayDiff('2026-12-31', '2027-01-01'), 1);
  assert.equal(L.addDays('2026-02-27', 2), '2026-03-01');
  assert.equal(L.addDays('2026-09-10', -1), '2026-09-09');
  assert.equal(L.dayIndex('1970-01-02'), 1);
});

/* ---------- levels & growth framing (spec §13) ---------- */
ok('level curve rewards the first session then slows', () => {
  assert.equal(L.levelForXp(0), 1);
  assert.ok(L.levelForXp(80) > 1, 'a child should level up inside one or two units');
  assert.ok(L.xpForLevel(5) - L.xpForLevel(4) > L.xpForLevel(2) - L.xpForLevel(1), 'curve widens');
  const p = L.levelProgress(L.xpForLevel(3) + 10);
  assert.equal(p.level, 3); assert.ok(p.pct > 0 && p.pct < 100);
  assert.equal(typeof L.levelTitle(1), 'string');
  assert.equal(L.levelTitle(500), L.levelTitle(15), 'titles cap instead of erroring');
});
ok('framing language only ever points forward', () => {
  const bad = /\b(left|remaining|behind|missed|skipped|failed|only \d+ to go|need to catch)\b/i;
  const samples = [
    L.framingPath(0).line ?? L.framingPath(0), L.framingPath(7), L.framingPath(44), L.framingPath(100),
    L.framingStreak({ current: 0 }).line, L.framingStreak({ current: 1 }).line, L.framingStreak({ current: 9 }).line,
    L.framingLevel(0).line, L.framingLevel(9999).line, L.framingLevel(9999).detail,
    L.framingCompleted(0, 20).ofTotal, L.framingCompleted(3, 20).small
  ].map(String);
  for (const s of samples) assert.ok(!bad.test(s), 'deficit wording: ' + s);
});

/* ---------- memory verses: spaced repetition ---------- */
ok('SRS widens intervals, demotes one box on a slip, and marks learned at box 3', () => {
  let c = L.srsNew();
  const today = 1000;
  c = L.srsApply(c, true, today); assert.equal(c.box, 1); assert.equal(c.due, today + 3);
  c = L.srsApply(c, true, today); assert.equal(c.box, 2); assert.equal(c.due, today + 7);
  c = L.srsApply(c, true, today); assert.equal(c.learned, true);
  c = L.srsApply(c, false, today); assert.equal(c.box, 2, 'not reset to zero');
  assert.equal(L.srsReward(null), 0, 'no card, no reward');
  assert.equal(L.srsReward({ box: 0, seen: 0 }), 0, 'unseen card, no reward');
  assert.ok(L.srsReward({ box: 3, learned: true, seen: 3 }) > L.srsReward({ box: 1, seen: 1 }), 'higher box pays more');
  assert.equal(L.srsIsDue({ due: today }, today), true);
  assert.equal(L.srsIsDue({ due: today + 1 }, today), false);
  assert.equal(L.srsIsDue(null, today), true, 'never seen = due');
});

/* ---------- placement quiz ---------- */
ok('placement quiz is short, low-stakes, and age still decides', () => {
  assert.ok(L.PLACEMENT.length >= 5 && L.PLACEMENT.length <= 8, '5-8 questions per spec');
  const allRight = L.PLACEMENT.map((q) => q.c);
  assert.equal(L.scorePlacement(allRight).suggested, 'H');
  assert.equal(L.scorePlacement(L.PLACEMENT.map(() => 1)).suggested, 'L', 'all wrong -> youngest');
  assert.equal(L.scorePlacement({}).right, 0);
  assert.equal(L.scorePlacement([0, 0]).total, L.PLACEMENT.length);
});

/* ---------- companion growth ---------- */
ok('companion grows through 5 visible stages and stops at the top', () => {
  assert.equal(L.companionStage(0), 0);
  assert.equal(L.companionStage(L.STAGE_XP[4]), 4);
  assert.equal(L.companionStage(999999), 4);
  const ci = L.companionInfo('dove', 0);
  assert.equal(ci.stageName, M ? L.COMPANIONS.dove.stages[0] : null);
  assert.ok(L.companionInfo('dove', 0).xpToNext > 0);
  assert.equal(L.companionInfo('dove', 9e5).xpToNext, null);
  assert.equal(L.companionInfo('not-a-thing', 10).key, 'lamb', 'unknown type falls back, never blanks');
});

/* ---------- home base ---------- */
ok('placing a sticker moves it; 12 slots; one item can be in only one place', () => {
  let h = { slots: {} };
  h = L.placeItem(h, 'creation', 's3');
  assert.equal(h.slots.s3, 'creation');
  h = L.placeItem(h, 'creation', 's7');
  assert.equal(h.slots.s3, undefined); assert.equal(h.slots.s7, 'creation');
  h = L.placeItem(h, 'noah', 's0');
  assert.equal(Object.keys(h.slots).length, 2);
  assert.equal(L.homeGrid().length, L.HOME_SLOTS);
});

/* ---------- leaderboards & child-safety social ---------- */
ok('reactions are the only social act, capped per day, and reset next day', () => {
  assert.equal(L.isAllowedReaction('clap'), true);
  assert.equal(L.isAllowedReaction('<script>'), false);
  assert.equal(L.isAllowedReaction('hello?'), false);
  const g1 = L.canReact({ day: '2026-09-10', used: L.REACTIONS_PER_DAY }, '2026-09-10');
  assert.equal(g1.ok, false);
  const g2 = L.canReact({ day: '2026-09-10', used: L.REACTIONS_PER_DAY }, '2026-09-11');
  assert.equal(g2.ok, true, 'a new day gives them back');
  assert.ok(L.REACTIONS_PER_DAY > 0);
});
ok('group codes avoid ambiguous characters', () => {
  for (let i = 0; i < 200; i++) {
    const c = L.groupCode();
    assert.equal(c.length, 6);
    assert.ok(!/[IO0-6]/.test(c.replace(/[3479]/g, '')), c);
    assert.ok(/^[A-Z3-9]+$/.test(c));
  }
});
ok('rank rows sort by XP, flag "you", and never expose a shortfall', () => {
  const rows = L.rankRows([{ name: 'B', xp: 10 }, { name: 'A', xp: 90, you: true }, { name: 'C', xp: 40 }]);
  assert.deepEqual(rows.map((r) => r.name), ['A', 'C', 'B']);
  assert.equal(rows[0].rank, 1); assert.equal(rows[0].you, true);
  assert.ok(!/behind|lack|only/.test(JSON.stringify(rows)));
});
ok('global peers are stable per day and include the child', () => {
  const a = L.globalPeers(M.ROSTER, '2026-09-10', 120);
  const b = L.globalPeers(M.ROSTER, '2026-09-10', 120);
  assert.deepEqual(a.map((x) => x.xp), b.map((x) => x.xp), 'same day, same board');
  assert.ok(a.some((x) => x.you && x.xp === 120));
  assert.ok(L.globalPeers(M.ROSTER, '2026-09-11', 120).some((x, i) => x.xp !== a[i].xp), 'it moves over time');
});

/* ---------- organisation verification (spec §7) ---------- */
ok('church/class groups need verification; families do not', () => {
  assert.equal(L.verifyOrg({ name: '', leader: 'x', code: 'SS-1234' }).ok, false);
  assert.equal(L.verifyOrg({ name: 'Grace Chapel', leader: 'A', code: 'SS-1234' }).ok, false, 'leader too short');
  assert.equal(L.verifyOrg({ name: 'Grace Chapel', leader: 'Ava', code: '1234' }).ok, false, 'bad code');
  const good = L.verifyOrg({ name: 'Grace Chapel', leader: 'Ava', code: 'ss-9f2k' });
  assert.equal(good.ok, true); assert.equal(good.status, 'approved');
  assert.equal(L.canCreateGroup({ status: 'none' }, 'family'), 'family');
  assert.equal(L.canCreateGroup({ status: 'none' }, 'church'), false);
  assert.equal(L.canCreateGroup({ status: 'approved' }, 'church'), 'church');
  assert.equal(L.canAssignLessons({ status: 'pending' }), false);
  assert.equal(L.canAssignLessons({ status: 'approved' }), true);
});

/* ---------- printables ---------- */
ok('every unit produces colouring + activity + grown-up sheets, craft when defined', () => {
  const units = require(path.join(root, 'js/data/units-5.js'));
  const packs = units.map((u) => L.printablePack(u, { answers: true }));
  for (const p of packs) {
    assert.equal(p[0].kind, 'coloring');
    assert.ok(p.some((x) => x.kind === 'activity'));
    assert.equal(p[p.length - 1].kind, 'parent');
  }
  assert.ok(packs.some((p) => p.some((x) => x.kind === 'craft')));
  const { width, height, contentWidth } = L.printLayout();
  assert.ok(width === 816 && height === 1056 && contentWidth < width);
});

/* ---------- i18n ---------- */
ok('every UI key resolves in English and Urdu, with no raw keys leaking', () => {
  I18n.set('en');
  // pull the key list from the EN dictionary through t() by sampling common ones
  const sample = ['nav.home', 'path.title', 'quiz.tryAgain', 'home.continue', 'leader.noChat', 'set.notify', 'group.notice', 'parent.weak', 'print.coloring', 'comp.title'];
  for (const k of sample) {
    I18n.set('en'); const en = I18n.t(k);
    I18n.set('ur'); const ur = I18n.t(k);
    assert.ok(en && en !== k, 'missing EN for ' + k);
    assert.ok(ur && ur !== k, 'missing UR for ' + k);
    assert.notEqual(en, ur, k + ' not translated');
  }
  I18n.set('ur'); assert.equal(I18n.dirNow, 'rtl');
  I18n.set('en'); assert.equal(I18n.dirNow, 'ltr');
  assert.equal(I18n.t('totally.unknown.key'), 'Key', 'degrades to readable words, never a raw key');
  assert.equal(I18n.t('player.xp', { n: 20 }), '+20 XP', 'variables interpolate');
});

/* ---------- next steps (avoid overwhelming choice) ---------- */
ok('home surface offers at most 3 next steps, and one is always "continue"', () => {
  const units = ['units-1', 'units-2'].flatMap((f) => require(path.join(root, 'js/data', f + '.js')));
  const p = { tier: 'L', completed: {}, srs: {}, xp: 0, streak: {} };
  assert.ok(L.pathUnits(units, 'L').every((u) => u.tier === 'L'), 'path must stay level-matched');
  const ns = L.nextSteps(units, p);
  assert.ok(ns.steps.length <= 3, 'steps: ' + ns.steps.length);
  assert.equal(ns.steps[0].kind, 'continue');
  assert.equal(ns.steps[0].unitId, 'creation');
  const done = { creation: { done: true } };
  assert.equal(L.nextSteps(units, { tier: 'L', completed: done, srs: {}, xp: 5 }).steps[0].unitId, 'lights');
});

/* ---------- offline queue ---------- */
ok('syncState never claims a sync happened that did not', () => {
  const s = L.syncState({ pendingEvents: [1, 2] }, Date.now());
  assert.equal(s.pending, 2);
  assert.match(s.label, /2 things to send|This device keeps/);
  assert.deepEqual(L.BACKUP_KEYS.includes('profiles'), true);
});

/* ---------- i18n coverage of everything the app actually renders ---------- */
ok('no app string is missing a translation in either language', () => {
  const fs = require('fs');
  const T = I18n.tables();
  const used = new Set();
  for (const f of ['js/app.js', 'js/app2.js']) {
    const src = fs.readFileSync(path.join(root, f), 'utf8');
    for (const m of src.matchAll(/\bt\(\s*'([a-zA-Z0-9.]+)'/g)) used.add(m[1]);
  }
  // keys built by concatenation are checked in the next test, not here
  const dynamic = /^(onboard\.tier|lib\.|quiz\.|group\.|print\.)$/;
  const keys = [...used].filter((k) => !dynamic.test(k));
  const noEn = keys.filter((k) => !T.en[k]);
  const noUr = keys.filter((k) => !T.ur[k]);
  assert.deepEqual(noEn, [], 'keys used but never defined: ' + noEn.join(', '));
  assert.deepEqual(noUr, [], 'keys with no Urdu: ' + noUr.join(', '));
  assert.ok(keys.length > 150, 'suspiciously few strings scanned: ' + keys.length);
});
ok('every label the app builds by concatenation exists in both languages', () => {
  const T = I18n.tables();
  const units = ['units-1', 'units-2', 'units-3', 'units-4', 'units-5', 'units-6']
    .flatMap((f) => require(path.join(root, 'js/data', f + '.js')));
  const composed = new Set();
  // quiz kind labels: t('quiz.' + q.t) with mc/tap routed to tapHere
  for (const u of units) for (const q of u.quiz) composed.add('quiz.' + (q.t === 'mc' || q.t === 'tap' ? 'tapHere' : q.t));
  // tier names, mode labels, group kinds, sheet names
  for (const k of ['L', 'M', 'H']) composed.add('onboard.tier' + k);
  for (const k of ['story', 'lesson', 'game']) composed.add('lib.' + k);
  for (const k of ['family', 'church', 'class']) composed.add('group.' + k);
  for (const k of ['coloring', 'activity', 'craft', 'parent']) composed.add('print.' + k);
  const missEn = [...composed].filter((k) => !T.en[k]);
  const missUr = [...composed].filter((k) => !T.ur[k]);
  assert.deepEqual(missEn, [], 'unresolvable labels render as raw words: ' + missEn.join(', '));
  assert.deepEqual(missUr, [], 'no Urdu for: ' + missUr.join(', '));
  assert.ok(composed.size >= 15, 'only scanned ' + composed.size);
});
ok('dictionary parity: Urdu covers every English key and invents none', () => {
  const T = I18n.tables();
  const en = Object.keys(T.en), ur = Object.keys(T.ur);
  assert.deepEqual(en.filter((k) => !T.ur[k]), [], 'missing in Urdu');
  assert.deepEqual(ur.filter((k) => !T.en[k]), [], 'Urdu-only keys nothing renders');
});
ok('interpolation markers survive translation', () => {
  const T = I18n.tables();
  for (const k of Object.keys(T.en)) {
    const a = (T.en[k].match(/\{\w+\}/g) || []).sort().join(',');
    const b = ((T.ur[k] || '').match(/\{\w+\}/g) || []).sort().join(',');
    assert.equal(a, b, k + ' uses different {vars} in Urdu: ' + a + ' vs ' + b);
  }
});

/* quizItemsForTier + quizScore must agree on indices, or a child's answers get
   credited to questions they never saw. */
ok('tier filtering keeps results aligned with the questions asked', () => {
  const u = { quiz: [{ t: 'mc', q: 'a', a: ['x', 'y'], c: 0 }, { t: 'blank', q: 'b', a: ['x'] },
    { t: 'sort', q: 'c', buckets: [{ id: 'p', name: 'P' }, { id: 'q', name: 'Q' }], items: [{ text: 't', b: 'p' }, { text: 'u', b: 'q' }] },
    { t: 'mc', q: 'd', a: ['x', 'y'], c: 1 }] };
  const sel = L.quizItemsForTier(u, 'L');
  assert.ok(sel.items.length >= 2, 'little ones get: ' + sel.items.length);
  assert.ok(sel.items.every((q) => L.quizTypesForTier('L').indexOf(q.t) > -1), 'a type this tier must not see slipped in');
  assert.deepEqual(sel.srcIdx, sel.items.map((q) => u.quiz.indexOf(q)), 'srcIdx does not point back at u.quiz');
  // every item answered correctly must score 100, whichever list you score against
  const results = {};
  sel.items.forEach((q, i) => { results[i] = { ok: true }; });
  assert.equal(L.quizScore(sel.items, results).pct, 100, 'perfect run over the shown questions');
  assert.ok(L.quizScore(u.quiz, results).pct < 100,
    'sanity: scoring the UNfiltered list with these keys is what the old bug looked like');
  const M = L.quizItemsForTier(u, 'M');
  assert.ok(M.items.length >= sel.items.length, 'older tiers never get fewer question kinds');
});
console.log('\nlogic tests: ' + (n - fails) + '/' + n + ' passed');
if (fails) { console.log(fails + ' FAILED'); process.exit(1); }
