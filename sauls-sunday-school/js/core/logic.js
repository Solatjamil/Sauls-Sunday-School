/* =====================================================================
   Saul's Sunday School — core logic (pure, side-effect free)
   ---------------------------------------------------------------------
   Deliberately contains NO DOM access so it can be unit-tested in Node.
   Everything here is child-safety first: no failure states, no shaming,
   no timers, growth-oriented framing only.
   ===================================================================== */
(function (root) {
  'use strict';

  /* ---------------- age tiers ---------------- */
  // L = Seedlings 3-6   (mature content never appears here)
  // M = Builders  7-9   (difficult material introduced gently)
  // H = Explorers 10-12 (fuller treatment, hard questions welcome)
  var TIERS = {
    L: { id: 'L', name: 'Seedlings', min: 3, max: 6, quizTypes: ['mc', 'match', 'tap', 'order'], readSize: 'xl', mature: false, skin: 'young', maxItems: 6, maxPairs: 4 },
    M: { id: 'M', name: 'Builders',  min: 7, max: 9, quizTypes: ['mc', 'match', 'tap', 'order', 'blank', 'sort'], readSize: 'lg', mature: true, skin: 'mid', maxItems: 7, maxPairs: 5 },
    H: { id: 'H', name: 'Explorers', min: 10, max: 12, quizTypes: ['mc', 'match', 'tap', 'order', 'blank', 'sort', 'type'], readSize: 'md', mature: true, skin: 'old', maxItems: 8, maxPairs: 6 }
  };
  var AGE_MIN = 3, AGE_MAX = 12;

  function clampAge(age) {
    var n = parseInt(age, 10);
    if (!isFinite(n)) return AGE_MIN;
    return Math.max(AGE_MIN, Math.min(AGE_MAX, n));
  }
  function tierForAge(age) {
    var a = clampAge(age);
    if (a <= TIERS.L.max) return 'L';
    if (a <= TIERS.M.max) return 'M';
    return 'H';
  }
  function quizTypesForTier(tier) {
    return (TIERS[tier] || TIERS.L).quizTypes;
  }
  // Does this unit belong in the child's walkable path?
  function unitInTier(unit, tier) { return unit.tier === tier; }

  /* ---------------- mature content gate ---------------- */
  // A unit flagged `mature` must NEVER be reachable by the 3-6 tier,
  // through any route (path, library, timeline, track, search, deep link).
  var TIER_ORDER = { L: 0, M: 1, H: 2 };
  // Two gates, in this order:
  //   1. a unit written for an older level is not offered to a younger child
  //      (free-roam stays free, but not above their reading age);
  //   2. the mature rule from the spec — violence, death and judgement are
  //      7+ material, and 3-6 get the gentler retelling instead.
  function canChildSee(unit, tier) {
    if (!unit) return false;
    var mine = TIER_ORDER[tier] == null ? 1 : TIER_ORDER[tier];
    var theirs = TIER_ORDER[unit.tier] == null ? 1 : TIER_ORDER[unit.tier];
    if (theirs > mine) return false;
    if (unit.mature && tier === 'L') return false;
    return true;
  }

  /* ---------------- XP, levels, streaks ---------------- */
  // Level curve: gentle early, so a child levels up inside the first session.
  var LEVEL_TITLES = [
    'Little Sprout', 'Promise Watcher', 'Story Listener', 'Light Carrier', 'Shepherd Helper',
    'Verse Keeper', 'Brave Questioner', 'Kind Hands', 'Prayer Warrior', 'Truth Finder',
    'Gospel Walker', 'Faith Builder', 'Hope Keeper', 'Psalm Singer', 'Disciple'
  ];
  // Cumulative XP to REACH a level: +50, +70, +90, ... so the first level-up
  // lands in a child's first sitting, and the curve widens after that.
  function xpForLevel(level) {
    var l = Math.max(1, level | 0);
    if (l <= 1) return 0;
    return 50 * (l - 1) + 10 * (l - 1) * (l - 2);
  }
  function levelForXp(xp) {
    var total = Math.max(0, xp || 0), lvl = 1;
    while (lvl < 99 && total >= xpForLevel(lvl + 1)) lvl++;
    return lvl;
  }
  function levelTitle(level) {
    var i = Math.min(LEVEL_TITLES.length - 1, Math.max(0, level - 1));
    return LEVEL_TITLES[i];
  }
  // Progress toward the NEXT level, expressed only as a gain, never a shortfall.
  function levelProgress(xp) {
    var lvl = levelForXp(xp), cur = xpForLevel(lvl), next = xpForLevel(lvl + 1);
    var gained = xp - cur, need = Math.max(1, next - cur);
    return { level: lvl, title: levelTitle(lvl), gained: gained, need: need, pct: Math.min(100, Math.round((gained / need) * 100)), toNext: Math.max(0, next - xp) };
  }
  function xpAwarded(unit, opts) {
    opts = opts || {};
    if (opts.retryOnly) return 0;                        // a re-play earns a small revisit bonus, not the full unit again
    var base = unit && unit.xp ? unit.xp : 20;
    var bonus = 0;
    if (opts.memoryVerified) bonus += 8;
    if (opts.streakBoost) bonus += Math.min(10, (opts.streakDays || 1) * 2);
    return base + bonus;
  }

  // Streak maths with grace: a missed day never shows as a broken streak to the child.
  function isoDay(d) {
    var x = d instanceof Date ? d : new Date(d);
    var y = x.getFullYear(), m = x.getMonth() + 1, day = x.getDate();
    return y + '-' + (m < 10 ? '0' + m : m) + '-' + (day < 10 ? '0' + day : day);
  }
  function addDays(dateStr, n) {
    var p = String(dateStr).split('-').map(Number);
    var d = new Date(p[0], (p[1] || 1) - 1, p[2] || 1);
    d.setDate(d.getDate() + n);
    return isoDay(d);
  }
  function dayDiff(a, b) {
    var pa = String(a).split('-').map(Number), pb = String(b).split('-').map(Number);
    var da = Date.UTC(pa[0], pa[1] - 1, pa[2]), db = Date.UTC(pb[0], pb[1] - 1, pb[2]);
    return Math.round((db - da) / 86400000);
  }
  function touchStreak(streak, today) {
    var s = { current: 0, best: 0, lastDay: null, graceUsed: 0 };
    if (streak) { s.current = streak.current || 0; s.best = streak.best || 0; s.lastDay = streak.lastDay || null; s.graceUsed = streak.graceUsed || 0; }
    if (s.lastDay === today) return s;                                     // already counted
    if (s.lastDay && dayDiff(s.lastDay, today) === 1) s.current += 1;
    else if (s.lastDay && dayDiff(s.lastDay, today) === 2) { s.current += 1; s.graceUsed += 1; } // one-day grace keeps it alive
    else s.current = 1;
    s.best = Math.max(s.best, s.current);
    s.lastDay = today;
    return s;
  }

  /* ---------------- placement quiz ---------------- */
  // 7 questions, deliberately low-stakes. Scoring recommends a tier; the
  // child/parent can always override, and the wording never implies a grade.
  var PLACEMENT = [
    { id: 'p1', q: 'Who made the sun, the moon and the stars?', a: ['God', 'A king', 'An angel', 'Nobody'], c: 0, tierPoints: { L: 1 } },
    { id: 'p2', q: 'In whose boat did God keep many animals safe?', a: ['Noah', 'Peter', 'Moses', 'Jonah'], c: 0, tierPoints: { L: 1 } },
    { id: 'p3', q: 'How many books are in the Bible (about)?', a: ['66', '12', '100', '4'], c: 0, tierPoints: { M: 1, H: 1 } },
    { id: 'p4', q: 'Which prayer did Jesus teach his friends?', a: ['The Lord\u2019s Prayer', 'The Jesus Prayer', 'A Psalm of David', 'The Shema'], c: 0, tierPoints: { M: 1, H: 1 } },
    { id: 'p5', q: 'Who was swallowed by a big fish?', a: ['Jonah', 'Paul', 'Elijah', 'Daniel'], c: 0, tierPoints: { M: 1 } },
    { id: 'p6', q: 'At Jesus\u2019 baptism, a voice from heaven said\u2026', a: ['\u201cThis is my Son, whom I love\u201d', '\u201cFollow me\u201d', '\u201cBe quiet\u201d', '\u201cGo home\u201d'], c: 0, tierPoints: { H: 2 } },
    { id: 'p7', q: 'Which of these is NOT one of the Ten Commandments?', a: ['Build a big temple', 'Honour your father and mother', 'Do not steal', 'Keep the Sabbath holy'], c: 0, tierPoints: { H: 1 } }
  ];
  function scorePlacement(answers) {
    var pts = { L: 0, M: 0, H: 0 };
    var right = 0;
    PLACEMENT.forEach(function (item, i) {
      var picked = answers && answers[i];
      if (picked === item.c) { right++; Object.keys(item.tierPoints || {}).forEach(function (k) { pts[k] += item.tierPoints[k]; }); }
    });
    // Age carries the most weight; answers only nudge within a band.
    var top = 'L';
    if (pts.H >= 2) top = 'H'; else if (pts.M + pts.H >= 2) top = 'M';
    return { right: right, total: PLACEMENT.length, points: pts, suggested: top };
  }

  /* ---------------- answer normalisation & gentle grading ---------------- */
  var NUMWORDS = { zero: '0', one: '1', two: '2', three: '3', four: '4', five: '5', six: '6', seven: '7', eight: '8', nine: '9', ten: '10', eleven: '11', twelve: '12', forty: '40', fifty: '50', sixty: '60', seventy: '70', hundred: '100', thousand: '1000' };
  function normalize(s) {
    if (s == null) return '';
    var out = String(s)
      .toLowerCase()
      .replace(/[\u2018\u2019]/g, "'")
      .replace(/[\u201c\u201d]/g, '"')
      .replace(/[^\p{L}\p{N}\s]/gu, ' ')
      .replace(/\b(the|a|an|his|her|their)\b/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
    out = out.split(' ').map(function (w) { return NUMWORDS[w] || w; }).join(' ');
    return out;
  }
  function levenshtein(a, b) {
    if (a === b) return 0;
    if (!a.length) return b.length;
    if (!b.length) return a.length;
    var prev = [], cur = [], i, j;
    for (j = 0; j <= b.length; j++) prev[j] = j;
    for (i = 1; i <= a.length; i++) {
      cur[0] = i;
      for (j = 1; j <= b.length; j++) {
        cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
      }
      prev = cur.slice();
    }
    return prev[b.length];
  }
  // Typed answers accept alternatives, typos (1 edit on words > 4 chars),
  // and "contains the answer" for longer explanations. Never a red X.
  function acceptTyped(userAnswer, q) {
    var u = normalize(userAnswer);
    if (!u) return { ok: false, kind: 'empty' };
    var pool = (q.accept || []).concat(q.a ? [q.a] : []);
    var i, n;
    for (i = 0; i < pool.length; i++) {
      n = normalize(pool[i]);
      if (!n) continue;
      if (u === n) return { ok: true, matched: pool[i] };
      if (u.indexOf(n) !== -1 && n.length > 2) return { ok: true, matched: pool[i] };
      if (n.length > 4 && levenshtein(u, n) <= 1) return { ok: true, matched: pool[i], typo: true };
    }
    var words = u.split(' ');
    for (i = 0; i < pool.length; i++) {
      var pw = normalize(pool[i]).split(' ');
      if (pw.length > 1 && pw.every(function (w) { return words.indexOf(w) !== -1; })) return { ok: true, matched: pool[i] };
    }
    return { ok: false, kind: 'try' };
  }
  // Feedback copy: after 2 tries we offer to reveal, then let them move on.
  function retryTone(attempt) {
    if (attempt <= 0) return 'almost';
    if (attempt === 1) return 'nudge';
    if (attempt === 2) return 'hint';
    return 'reveal';
  }
  var GENTLE_LINES = {
    almost: ['Almost! Try that one more time.', 'So close \u2014 have another go.', 'Nearly there! Look at the story again.'],
    nudge: ['Good thinking. One more try?', 'You are getting it. Try a different one.'],
    hint: ['Here is a hint: {hint}', 'Want a small hint? {hint}'],
    reveal: ['Let\u2019s look at it together \u2014 no marks for this one.', 'That one is tricky for everybody. Here it is.'],
    right: ['Yes! Well done.', 'That\u2019s it \u2014 nice one.', 'You know this! ', 'Amen to that.']
  };
  function pickGentle(kind, seed) {
    var arr = GENTLE_LINES[kind] || GENTLE_LINES.right;
    return arr[Math.abs(seed || 0) % arr.length];
  }

  /* ---------------- memory verses: Leitner spaced repetition ---------------- */
  var SRS_INTERVALS = [1, 3, 7, 14, 30, 60];      // days per box
  function srsNew() { return { box: 0, due: 0, seen: 0, right: 0, learned: false }; }
  function srsApply(card, correct, todayIdx) {
    var c = card ? { box: card.box | 0, due: card.due | 0, seen: (card.seen | 0) + 1, right: card.right | 0, learned: !!card.learned } : srsNew();
    c.seen = (card && card.seen ? card.seen : 0) + 1;
    if (correct) {
      c.right += 1;
      c.box = Math.min(SRS_INTERVALS.length - 1, c.box + 1);
      if (c.box >= 3) c.learned = true;
    } else {
      c.box = Math.max(0, c.box - 1);              // softer than a reset to zero
    }
    c.due = todayIdx + SRS_INTERVALS[c.box];
    return c;
  }
  function srsIsDue(card, todayIdx) { return !card || (card.due || 0) <= todayIdx; }
  function srsReward(card) {
    // A card with no review history earns nothing; anything reviewed pays more
    // the further along the schedule it has climbed.
    if (!card || !(card.seen || card.box)) return 0;
    return (card.box | 0) * 4 + (card.learned ? 25 : 0);
  }
  function dayIndex(dateStr) {
    var p = String(dateStr).split('-').map(Number);
    return Math.floor(Date.UTC(p[0], (p[1] || 1) - 1, p[2] || 1) / 86400000);
  }

  /* ---------------- quiz validation & scoring ---------------- */
  function validateUnit(u, opts) {
    opts = opts || {};
    var errs = [];
    if (!u || typeof u !== 'object') return ['unit is not an object'];
    if (!u.id) errs.push('missing id');
    if (!u.title) errs.push(u.id + ': missing title');
    if (!TIERS[u.tier]) errs.push(u.id + ': bad tier ' + u.tier);
    if (['story', 'lesson', 'game'].indexOf(u.mode) === -1) errs.push(u.id + ': bad mode ' + u.mode);
    if (!u.story || !u.story.length) errs.push(u.id + ': missing story text');
    if (!u.quiz || !u.quiz.length) errs.push(u.id + ': missing quiz');
    if (!u.badge || !u.badge.name) errs.push(u.id + ': missing badge');
    else if (opts && opts.artList && u.badge.art && opts.artList.indexOf(u.badge.art) === -1) errs.push(u.id + ': unknown badge art ' + u.badge.art);
    if (opts && opts.artList && u.printable && u.printable.motif && opts.artList.indexOf(u.printable.motif) === -1) errs.push(u.id + ': unknown printable motif ' + u.printable.motif);
    if (!u.memory || !u.memory.text || !u.memory.ref) errs.push(u.id + ': missing memory verse');
    if (u.mature && u.tier === 'L') errs.push(u.id + ': mature flag not allowed in tier L');
    var tdef = TIERS[u.tier] || TIERS.L;
    (u.quiz || []).forEach(function (q, i) {
      var tag = u.id + '.q' + (i + 1);
      if (tdef.quizTypes.indexOf(q.t) === -1) errs.push(tag + ': format ' + q.t + ' not allowed for tier ' + u.tier);
      if (!q || !q.t) { errs.push(tag + ': missing type'); return; }
      if (['mc', 'match', 'order', 'blank', 'sort', 'tap'].indexOf(q.t) === -1) errs.push(tag + ': unknown type ' + q.t);
      if (q.t === 'mc' || q.t === 'tap') {
        if (!q.a || q.a.length < 2) errs.push(tag + ': needs options');
        if (!(q.c >= 0 && q.c < (q.a || []).length)) errs.push(tag + ': bad correct index');
        if (q.a && q.a.length === q.a.filter(function (x) { return normalize(x) === normalize(q.a[q.c]); }).length && q.a.length > 1) errs.push(tag + ': duplicate options');
      }
      if (q.t === 'match') {
        if (!q.pairs || q.pairs.length < 2) errs.push(tag + ': needs >=2 pairs');
        else {
          if (q.pairs.length > (tdef.maxPairs || 6)) errs.push(tag + ': ' + q.pairs.length + ' pairs too many for tier ' + u.tier);
          var seenL = {};
          q.pairs.forEach(function (pr) {
            if (!pr || pr.length !== 2) { errs.push(tag + ': pair needs two sides'); return; }
            var k = normalize(pr[0]);
            if (seenL[k]) errs.push(tag + ': duplicate left side ' + pr[0]);
            seenL[k] = 1;
          });
        }
      }
      if (q.t === 'order') {
        if (!q.items || q.items.length < 3) errs.push(tag + ': needs >=3 items');
        else if (q.items.length > (tdef.maxItems || 8)) errs.push(tag + ': ' + q.items.length + ' steps too many for tier ' + u.tier);
      }
      if (q.t === 'sort') {
        if (!q.buckets || q.buckets.length !== 2) errs.push(tag + ': needs 2 buckets');
        else {
          // every item must name a bucket that exists, or the question can never
          // be passed: the child drops it correctly and is asked to try again
          var bucketIds = {}, used = {};
          q.buckets.forEach(function (x) { bucketIds[x.id] = 1; });
          (q.items || []).forEach(function (x, k) {
            if (!x || !x.b) { errs.push(tag + ' item ' + k + ': no bucket (b)'); return; }
            if (!bucketIds[x.b]) errs.push(tag + ' item ' + k + ': bucket "' + x.b + '" is not one of ' + Object.keys(bucketIds).join('/'));
            used[x.b] = 1;
          });
          if (Object.keys(used).length < 2) errs.push(tag + ': every item lands in the same bucket');
        }
      }
      if (q.t === 'blank' && !q.a && !q.accept) errs.push(tag + ': needs an answer');
    });
    return errs;
  }
  // Score is stored for parents only; the child sees completion, not a percentage.
  /* Which questions does this tier get, and which entry of u.quiz was each one?
     The mapping has to travel with the list: results are keyed by position in the
     filtered list, so scoring against u.quiz instead would credit answers to
     questions the child never saw (and steal credit for the ones they did). */
  function quizItemsForTier(u, tierId) {
    var allowed = quizTypesForTier(tierId);
    var all = (u && u.quiz) || [];
    var items = [], srcIdx = [];
    all.forEach(function (q, i) { if (allowed.indexOf(q.t) !== -1) { items.push(q); srcIdx.push(i); } });
    if (!items.length && all.length) {
      items = all.slice(0, 2);
      srcIdx = items.map(function (q) { return all.indexOf(q); });
    }
    return { items: items, srcIdx: srcIdx };
  }
  function quizScore(items, results) {
    if (!items || !items.length) return { correct: 0, total: 0, pct: 100, neededHelp: 0 };
    var correct = 0, helped = 0;
    items.forEach(function (q, i) {
      var r = results[i] || {};
      if (r.ok && !r.revealed) correct++;
      if (r.revealed) helped++;
    });
    return { correct: correct, total: items.length, pct: Math.round((correct / items.length) * 100), neededHelp: helped };
  }
  function accuracyTrend(log) {
    if (!log || !log.length) return null;
    var last = log.slice(-8);
    var s = last.reduce(function (a, r) { return a + (r.pct || 0); }, 0);
    return Math.round(s / last.length);
  }
  function weakTopics(log, minSeen) {
    var seen = {};
    (log || []).forEach(function (r) {
      var k = r.track || 'other';
      if (!seen[k]) seen[k] = { track: k, tries: 0, missed: 0, units: {} };
      seen[k].tries += (r.total || 0);
      seen[k].missed += ((r.total || 0) - (r.correct || 0));
      seen[k].units[r.unitId] = r.pct;
    });
    var floor = minSeen || 4;
    return Object.keys(seen).map(function (k) {
      var s = seen[k];
      return { track: k, tries: s.tries, missed: s.missed, accuracy: s.tries ? Math.round(((s.tries - s.missed) / s.tries) * 100) : 100, units: Object.keys(s.units) };
    }).filter(function (s) { return s.tries >= floor && s.accuracy < 80; })
      .sort(function (a, b) { return a.accuracy - b.accuracy; });
  }

  /* ---------------- companion growth ---------------- */
  var COMPANIONS = {
    lamb:     { name: 'Lamb',     stages: ['Little Lamb', 'Woolly Lamb', 'Shepherd\u2019s Lamb', 'Lamb of God Follower', 'Lamb in the Flock'] },
    dove:     { name: 'Dove',     stages: ['Baby Dove', 'Soft-wing Dove', 'Olive-branch Dove', 'Sky-writer Dove', 'Dove of Peace'] },
    donkey:   { name: 'Donkey',   stages: ['Little Foal', 'Strong Foal', 'King\u2019s Donkey', 'Palace Colt', 'Joyful Donkey'] },
    hen:      { name: 'Hen',      stages: ['Tiny Chick', 'Feathered Chick', 'Brave Hen', 'Wing-shelter Hen', 'Under-her-wings Hen'] },
    ewe:      { name: 'Ewe',      stages: ['Baby Sheep', 'Woolly Ewe', 'Green-meadow Ewe', 'Still-water Ewe', 'Found Sheep'] },
    camel:    { name: 'Camel',    stages: ['Little Calf-camel', 'Dusty Camel', 'Long-ride Camel', 'Desert Star Camel', 'Caravan Leader'] },
    shepherd: { name: 'Shepherd Helper', stages: ['Small Helper', 'Staff Carrier', 'Lantern Shepherd', 'Ninety-nine Finder', 'Good Shepherd Follower'] },
    lion:     { name: 'Lion Cub', stages: ['Tiny Cub', 'Brave Cub', 'Roaring Cub', 'Judah\u2019s Lion Friend', 'Courageous Lion'] }
  };
  var STAGE_XP = [0, 80, 220, 460, 820];
  function companionStage(xp) {
    var s = 0;
    for (var i = 0; i < STAGE_XP.length; i++) if ((xp || 0) >= STAGE_XP[i]) s = i;
    return s;
  }
  function companionInfo(type, xp) {
    var c = COMPANIONS[type] || COMPANIONS.lamb;
    var st = companionStage(xp);
    return { type: c, key: COMPANIONS[type] ? type : 'lamb', stage: st, stageName: c.stages[st], maxStage: STAGE_XP.length - 1, xpToNext: st === STAGE_XP.length - 1 ? null : STAGE_XP[st + 1] - (xp || 0) };
  }

  /* ---------------- badges, home base ---------------- */
  function badgeIdsFor(completed) {
    return Object.keys(completed || {}).filter(function (k) { return completed[k] && completed[k].badge; });
  }
  // Home base is a 4x3 grid; earned stickers unlock decorables.
  var HOME_SLOTS = 12;
  function homeGrid() { var a = []; for (var i = 0; i < HOME_SLOTS; i++) a.push('s' + i); return a; }
  function placeItem(home, itemId, slotId) {
    var h = { slots: {}, selected: itemId };
    Object.keys(home && home.slots || {}).forEach(function (k) { h.slots[k] = home.slots[k]; });
    Object.keys(h.slots).forEach(function (k) { if (h.slots[k] === itemId) delete h.slots[k]; });
    if (slotId) h.slots[slotId] = itemId;
    return h;
  }

  /* ---------------- curriculum views ---------------- */
  function byId(units, id) { for (var i = 0; i < units.length; i++) if (units[i].id === id) return units[i]; return null; }
  // The guided path is level-matched: only this tier's units, and never a
  // mature unit for a 3-6 child. Free-roam (libraryUnits) is separate.
  function pathUnits(units, tier) {
    return units.filter(function (u) { return u.tier === tier && canChildSee(u, tier); })
      .sort(function (a, b) { return (a.path || 999) - (b.path || 999) || String(a.id).localeCompare(String(b.id)); });
  }
  function libraryUnits(units, tier, filters) {
    filters = filters || {};
    return units.filter(function (u) {
      if (!canChildSee(u, tier)) return false;
      if (filters.testament && u.testament !== filters.testament) return false;
      if (filters.track && u.track !== filters.track) return false;
      if (filters.mode && u.mode !== filters.mode) return false;
      if (filters.onlyUnfinished && uDone(filters.completed, u.id)) return false;
      if (filters.q) {
        var q = normalize(filters.q);
        // Titles and summaries first (precise); then the topic fields a child or
        // teacher would actually search by — badge, track, era, characters, verse.
        var named = normalize([u.title, u.summary, u.badge && u.badge.name, u.track, u.era,
          u.testament, u.memory && (u.memory.ref + ' ' + u.memory.text),
          (u.scripture || []).map(function (x) { return x.ref; }).join(' ')].filter(Boolean).join(' '));
        if (named.indexOf(q) !== -1) return true;
        // last resort: the retelling itself, so "sheep" or "Daniel" still lands
        return normalize((u.story || []).join(' ')).indexOf(q) !== -1;
      }
      return true;
    });
  }
  function uDone(completed, id) { return !!(completed && completed[id] && completed[id].done); }
  function groupBy(units, keyFn) {
    var out = {};
    units.forEach(function (u) { var k = keyFn(u); if (!out[k]) out[k] = []; out[k].push(u); });
    Object.keys(out).forEach(function (k) { out[k].sort(function (a, b) { return (a.when || 0) - (b.when || 0) || (a.path || 0) - (b.path || 0); }); });
    return out;
  }
  function progressOf(units, tier, completed) {
    var pool = pathUnits(units, tier);
    var done = pool.filter(function (u) { return uDone(completed, u.id); }).length;
    return { total: pool.length, done: done, pct: pool.length ? Math.round((done / pool.length) * 100) : 0 };
  }

  /* ---------------- "small number of next steps" ---------------- */
  // The child's home screen must never show a dense dashboard.
  function nextSteps(units, profile) {
    var tier = profile.tier, completed = profile.completed || {};
    var pool = pathUnits(units, tier);
    var nextUnit = null;
    for (var i = 0; i < pool.length; i++) { if (!uDone(completed, pool[i].id)) { nextUnit = pool[i]; break; } }
    if (!nextUnit && pool.length) nextUnit = pool[pool.length - 1];
    var steps = [];
    if (nextUnit) steps.push({ kind: 'continue', unitId: nextUnit.id, labelKey: 'home.continue', art: nextUnit.badge && nextUnit.badge.art });
    var due = dueMemory(profile.srs, dayIndex(isoDay(new Date())));
    if (due.length) steps.push({ kind: 'verse', labelKey: 'home.verse', count: due.length });
    steps.push({ kind: 'library', labelKey: 'home.library' });
    steps.push({ kind: 'companion', labelKey: 'home.play' });
    return { steps: steps.slice(0, 3), nextUnit: nextUnit, dueVerses: due };
  }
  function dueMemory(srs, todayIdx) {
    return Object.keys(srs || {}).filter(function (k) { return srsIsDue(srs[k], todayIdx); });
  }

  /* ---------------- leaderboards ---------------- */
  var REACTIONS = ['clap', 'thumbs', 'wave', 'heart', 'highfive', 'dance', 'bravo', 'praise'];
  var REACTIONS_PER_DAY = 12;
  function isAllowedReaction(id) { return REACTIONS.indexOf(id) !== -1; }
  function canReact(state, today) {
    state = state || { day: null, used: 0 };
    var used = state.day === today ? (state.used | 0) : 0;
    return { ok: used < REACTIONS_PER_DAY, used: used, left: Math.max(0, REACTIONS_PER_DAY - used) };
  }
  function groupCode(rand) {
    var ABC = 'ACDEFGHJKLMNPQRTUVWXY3479', s = '';
    for (var i = 0; i < 6; i++) s += ABC[Math.floor((rand ? rand() : Math.random()) * ABC.length)];
    return s;
  }
  // Private group roster + global "peers on the ship" (offline-simulated).
  function rankRows(members) {
    return members.slice().sort(function (a, b) {
      if ((b.xp || 0) !== (a.xp || 0)) return (b.xp || 0) - (a.xp || 0);
      return String(a.name).localeCompare(String(b.name));
    }).map(function (m, i) {
      var prev = i > 0 ? (members.slice().sort(function (x, y) { return (y.xp || 0) - (x.xp || 0); })[i - 1].xp || 0) : null;
      return {
        rank: i + 1, name: m.name, xp: m.xp || 0, badges: m.badges || 0, units: m.units || 0, you: !!m.you,
        // growth framing: how much MORE than yesterday, never "behind"
        gainedToday: m.gainedToday || 0, aheadOfYou: prev !== null && prev > (m.xp || 0)
      };
    });
  }
  // Deterministic pseudo-random so the simulated global board looks alive
  // but is identical on every reload of the same day.
  function hashSeed(str) {
    var h = 2166136261;
    for (var i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = (h * 16777619) >>> 0; }
    return h >>> 0;
  }
  function rng(seed) {
    var s = seed >>> 0 || 1;
    return function () { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
  }
  function globalPeers(roster, dayKey, selfXp) {
    var rand = rng(hashSeed('podship|' + dayKey));
    return roster.map(function (p) {
      var base = p.base + Math.floor(rand() * 40);
      var drift = Math.floor(rand() * 6) * (rand() > 0.5 ? 1 : 0) * (p.hard ? 25 : 12);
      return { name: p.name, xp: base + drift, badges: Math.max(0, Math.round((base + drift) / 40)), units: Math.round((base + drift) / 55), gainedToday: drift, avatar: p.avatar };
    }).concat([{ name: 'You', xp: selfXp || 0, you: true, gainedToday: 0, avatar: 'you' }]);
  }

  /* ---------------- growth-oriented copy ---------------- */
  // Never "you skipped 3 days", never "26 units left".
  function framingCompleted(done, total) {
    return { big: String(done), small: done === 1 ? 'unit walked' : 'units walked', ofTotal: total ? 'of ' + total + ' on your path' : '', pct: total ? Math.round((done / total) * 100) : 0 };
  }
  function framingStreak(streak) {
    var s = streak ? (streak.current | 0) : 0;
    if (s <= 0) return { line: 'Your streak starts today \u2014 just open one story.', icon: 'spark' };
    if (s === 1) return { line: 'One day of showing up. Nice beginning.', icon: 'flame' };
    return { line: s + ' days of showing up, and counting.', icon: 'flame' };
  }
  function framingLevel(xp) {
    var p = levelProgress(xp);
    return { line: 'Level ' + p.level + ' \u00b7 ' + p.title, detail: p.toNext ? p.toNext + ' XP to the next level' : 'Top level \u2014 well walked' };
  }
  function framingPath(pct) {
    if (pct <= 0) return 'Your path is open in front of you.';
    if (pct < 35) return 'You are on the way \u2014 ' + pct + '% of your path walked.';
    if (pct < 75) return 'Great ground covered: ' + pct + '% of your path.';
    if (pct < 100) return 'Nearly through your path \u2014 ' + pct + '%.';
    return 'Your whole path is walked. Time to explore further.';
  }

  /* ---------------- org verification (church/class) ---------------- */
  // Offline app cannot verify identity, so this models the workflow:
  // pending -> approved by a human on the ministry side. Groups created
  // before approval are private-only and never listed publicly.
  function verifyOrg(org) {
    if (!org || !org.name || String(org.name).trim().length < 3) return { ok: false, reason: 'name' };
    if (!org.leader || String(org.leader).trim().length < 2) return { ok: false, reason: 'leader' };
    var code = String(org.code || '').trim().toUpperCase();
    if (!/^SS-[A-Z0-9]{4,}$/.test(code)) return { ok: false, reason: 'code' };
    return { ok: true, status: 'approved', verifiedAt: Date.now(), name: String(org.name).trim(), leader: String(org.leader).trim(), code: code };
  }
  function canCreateGroup(org, role) {
    if (!org || org.status !== 'approved') return role === 'family' ? 'family' : false;  // families may self-organise
    return role || 'church';
  }
  function canAssignLessons(org) { return !!(org && org.status === 'approved'); }

  /* ---------------- printables ---------------- */
  var PRINT_PAPER = { w: 816, h: 1056, margin: 48 };   // US letter @96dpi
  function printLayout() {
    return { width: PRINT_PAPER.w, height: PRINT_PAPER.h, contentWidth: PRINT_PAPER.w - PRINT_PAPER.margin * 2 };
  }
  function printablePack(unit, opts) {
    opts = opts || {};
    var sheets = [];
    sheets.push({ kind: 'coloring', title: 'Colouring page: ' + unit.title, motif: (unit.printable && unit.printable.motif) || (unit.badge && unit.badge.art) || 'scroll' });
    sheets.push({ kind: 'activity', title: 'Activity sheet: ' + unit.title, unit: unit, answers: !!opts.answers });
    if (unit.printable && unit.printable.craft) sheets.push({ kind: 'craft', title: 'Craft: ' + (unit.printable.craft.title || 'Make it yourself'), steps: unit.printable.craft.steps || [], note: unit.printable.craft.note });
    sheets.push({ kind: 'parent', title: 'Talk about it (for grown-ups)', unit: unit });
    return sheets;
  }

  /* ---------------- offline / sync ---------------- */
  function syncState(profile, now) {
    var pend = (profile && profile.pendingEvents || []).length;
    if (!navigator_on()) return { label: 'This device keeps your work safe', pending: pend, online: false };
    return { label: pend ? pend + (pend === 1 ? ' thing to send' : ' things to send') : 'Everything saved', pending: pend, online: navigator.onLine !== false };
    function navigator_on() { return typeof navigator !== 'undefined' && navigator !== null; }
  }
  var BACKUP_KEYS = ['v', 'profiles', 'activeProfile', 'groups', 'org', 'settings', 'device'];

  /* ---------------- i18n helpers (pure parts) ---------------- */
  function padDigitsFor(tier) { return tier === 'L' ? 2 : tier === 'M' ? 1 : 0; }

  /* ---------------- exports ---------------- */
  var Logic = {
    TIERS: TIERS, LEVEL_TITLES: LEVEL_TITLES, COMPANIONS: COMPANIONS, STAGE_XP: STAGE_XP,
    PLACEMENT: PLACEMENT, REACTIONS: REACTIONS, REACTIONS_PER_DAY: REACTIONS_PER_DAY,
    GENTLE_LINES: GENTLE_LINES, SRS_INTERVALS: SRS_INTERVALS, HOME_SLOTS: HOME_SLOTS,
    clampAge: clampAge, tierForAge: tierForAge, quizTypesForTier: quizTypesForTier, canChildSee: canChildSee, TIER_ORDER: TIER_ORDER,
    xpForLevel: xpForLevel, levelForXp: levelForXp, levelTitle: levelTitle, levelProgress: levelProgress, xpAwarded: xpAwarded,
    isoDay: isoDay, addDays: addDays, dayDiff: dayDiff, touchStreak: touchStreak, dayIndex: dayIndex,
    scorePlacement: scorePlacement, normalize: normalize, levenshtein: levenshtein, acceptTyped: acceptTyped,
    retryTone: retryTone, pickGentle: pickGentle,
    srsNew: srsNew, srsApply: srsApply, srsIsDue: srsIsDue, srsReward: srsReward,
    validateUnit: validateUnit, quizItemsForTier: quizItemsForTier, quizScore: quizScore, accuracyTrend: accuracyTrend, weakTopics: weakTopics,
    companionStage: companionStage, companionInfo: companionInfo, badgeIdsFor: badgeIdsFor, homeGrid: homeGrid, placeItem: placeItem,
    byId: byId, pathUnits: pathUnits, libraryUnits: libraryUnits, uDone: uDone, groupBy: groupBy, progressOf: progressOf,
    nextSteps: nextSteps, dueMemory: dueMemory,
    isAllowedReaction: isAllowedReaction, canReact: canReact, groupCode: groupCode, rankRows: rankRows, hashSeed: hashSeed, rng: rng, globalPeers: globalPeers,
    framingCompleted: framingCompleted, framingStreak: framingStreak, framingLevel: framingLevel, framingPath: framingPath,
    verifyOrg: verifyOrg, canCreateGroup: canCreateGroup, canAssignLessons: canAssignLessons,
    printLayout: printLayout, printablePack: printablePack, syncState: syncState, BACKUP_KEYS: BACKUP_KEYS,
    padDigitsFor: padDigitsFor
  };

  if (typeof module !== 'undefined' && module.exports) module.exports = Logic;
  root.SS_Logic = Logic;
})(typeof window !== 'undefined' ? window : (typeof globalThis !== 'undefined' ? globalThis : this));
