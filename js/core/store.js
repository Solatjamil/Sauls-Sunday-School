/* =====================================================================
   Persistence — profiles on the device.
   Guarded so it degrades to memory when storage is blocked (sandboxed
   iframes, private mode, file://) instead of throwing at a child.
   ===================================================================== */
(function (root) {
  'use strict';
  var KEY = 'sssd.v1';
  var mem = null;                                   // in-memory fallback

  function L() { return root.SS_Logic; }
  function I() { return root.SS_I18n; }

  function readRaw() {
    try {
      var s = root.localStorage.getItem(KEY);
      return s ? JSON.parse(s) : null;
    } catch (e) { return mem; }
  }
  function writeRaw(obj) {
    mem = obj;
    try { root.localStorage.setItem(KEY, JSON.stringify(obj)); return true; }
    catch (e) { return false; }                     // quota or blocked storage
  }

  var Store = {
    persistent: true,
    root: null,

    fresh: function () {
      return {
        v: 1, createdAt: Date.now(),
        activeProfile: null, profiles: {},
        groups: [],                                 // {id,code,name,kind,orgId,members:[{name,xp,profileId,you}]}
        org: { status: 'none' },                    // none | pending | approved
        settings: { lang: 'en', narrLang: 'en', narration: true, readAlong: true, rate: 1, voice: null, silent: false },
        device: { reactionState: { day: null, used: 0 }, lastNotifiedDay: null, peersDay: null, peers: [], seenIntro: false }
      };
    },
    load: function () {
      var r = readRaw();
      if (!r || typeof r !== 'object') { r = Store.fresh(); Store.persistent = false; writeRaw(r); }
      var f = Store.fresh();
      Object.keys(f).forEach(function (k) { if (r[k] === undefined) r[k] = f[k]; });
      Store.root = r;
      Store.persistent = (function () { try { return root.localStorage.getItem(KEY) != null; } catch (e) { return false; } })();
      I().set(r.settings.lang || 'en');
      return r;
    },
    save: function () { return writeRaw(Store.root); },

    profile: function () {
      var r = Store.root; if (!r) return null;
      return r.activeProfile ? (r.profiles[r.activeProfile] || null) : null;
    },
    profiles: function () { return Object.keys(Store.root.profiles).map(function (k) { return Store.root.profiles[k]; }); },

    newProfileId: function () { return 'p' + Date.now().toString(36) + Math.floor(Math.random() * 1e4).toString(36); },

    createProfile: function (data) {
      var r = Store.root, id = Store.newProfileId();
      var age = L().clampAge(data.age);
      r.profiles[id] = {
        id: id, name: String(data.name || 'Friend').slice(0, 20), age: age,
        tier: data.tier || L().tierForAge(age), tierLocked: !!data.tierLocked,
        createdAt: Date.now(),
        companion: { type: data.companionType || 'lamb', name: (data.companionName || 'Pip').slice(0, 18) },
        xp: 0, streak: { current: 0, best: 0, lastDay: null, graceUsed: 0 },
        completed: {}, badges: [], srs: {}, prayers: [], quizLog: [], timeLog: {},
        home: { slots: {} }, offlineUnits: [], pendingEvents: [],
        settings: {}
      };
      r.activeProfile = id;
      Store.save();
      return r.profiles[id];
    },
    setActive: function (id) {
      if (Store.root.profiles[id]) { Store.root.activeProfile = id; Store.save(); }
      return Store.profile();
    },
    removeProfile: function (id) {
      var r = Store.root;
      delete r.profiles[id];
      if (r.activeProfile === id) r.activeProfile = Object.keys(r.profiles)[0] || null;
      Store.save();
    },
    // Every mutation goes through here: save + queue for sync.
    mutate: function (fn, eventType) {
      var p = Store.profile();
      if (!p) return null;
      var out = fn(p);
      p.updatedAt = Date.now();
      if (eventType) {
        p.pendingEvents = p.pendingEvents || [];
        p.pendingEvents.push({ type: eventType, at: Date.now(), day: L().isoDay(new Date()) });
        if (p.pendingEvents.length > 400) p.pendingEvents = p.pendingEvents.slice(-400);
      }
      Store.save();
      return out;
    },

    completeUnit: function (unit, score, timeSec) {
      var r = Store.root, p = Store.profile();
      if (!p || !unit) return null;
      var day = L().isoDay(new Date());
      var already = p.completed[unit.id] && p.completed[unit.id].done;
      var streak = L().touchStreak(p.streak, day);
      var xpGain = L().xpAwarded(unit, { streakBoost: !already, streakDays: streak.current, retryOnly: already });
      p.streak = streak;
      p.completed[unit.id] = {
        done: true, at: Date.now(), day: day,
        pct: score.pct, correct: score.correct, total: score.total, neededHelp: score.neededHelp,
        timeSec: (p.completed[unit.id] && p.completed[unit.id].timeSec || 0) + (timeSec | 0),
        badge: unit.badge && unit.badge.name ? unit.id : p.completed[unit.id] && p.completed[unit.id].badge,
        attempts: ((p.completed[unit.id] && p.completed[unit.id].attempts) || 0) + 1
      };
      p.xp += xpGain;
      p.timeLog[day] = (p.timeLog[day] || 0) + (timeSec | 0);
      if (unit.badge && unit.badge.name && p.badges.indexOf(unit.id) === -1) p.badges.push(unit.id);
      p.quizLog.push({ unitId: unit.id, track: unit.track, tier: unit.tier, at: Date.now(), day: day, pct: score.pct, correct: score.correct, total: score.total, neededHelp: score.neededHelp });
      if (p.quizLog.length > 300) p.quizLog = p.quizLog.slice(-300);
      Store.save();
      p.pendingEvents.push({ type: 'unit-complete', unitId: unit.id, day: day, at: Date.now() });
      Store.save();
      return { xp: xpGain, levelUp: L().levelForXp(p.xp - xpGain) < L().levelForXp(p.xp), streak: streak.current, newBadge: unit.badge };
    },
    addTime: function (seconds) {
      var p = Store.profile(); if (!p) return;
      var day = L().isoDay(new Date());
      p.timeLog[day] = (p.timeLog[day] || 0) + seconds;
      Store.save();
    },
    addXp: function (n, reason) {
      var p = Store.profile(); if (!p) return;
      p.xp = Math.max(0, p.xp + n);
      p.pendingEvents.push({ type: 'xp', n: n, reason: reason || null, at: Date.now() });
      Store.save();
    },
    addPrayer: function (text) {
      var p = Store.profile(); if (!p || !text) return null;
      var item = { id: 'pr' + Date.now().toString(36), text: String(text).slice(0, 160), createdAt: Date.now(), prayed: 0, answered: false, day: L().isoDay(new Date()) };
      p.prayers.unshift(item);
      if (p.prayers.length > 200) p.prayers = p.prayers.slice(0, 200);
      Store.save();
      return item;
    },
    toggleAnswered: function (id) {
      var p = Store.profile(); if (!p) return;
      p.prayers.forEach(function (x) { if (x.id === id) x.answered = !x.answered; });
      Store.save();
    },
    markPrayed: function (id) {
      var p = Store.profile(); if (!p) return;
      p.prayers.forEach(function (x) { if (x.id === id) x.prayed = (x.prayed || 0) + 1; });
      Store.save();
    },
    removePrayer: function (id) {
      var p = Store.profile(); if (!p) return;
      p.prayers = p.prayers.filter(function (x) { return x.id !== id; });
      Store.save();
    },
    srsReview: function (verseId, correct, xpReward) {
      var p = Store.profile(); if (!p) return null;
      var today = L().dayIndex(L().isoDay(new Date()));
      var prev = p.srs[verseId];
      var next = L().srsApply(prev, correct, today);
      // pay the "learned it" bonus once, on the card itself — never as a fake card
      if (next.learned && !(prev && prev.awarded)) { next.awarded = 1; p.xp += (xpReward || 25); }
      p.srs[verseId] = next;
      Store.save();
      return next;
    },
    setCompanionName: function (name) {
      var p = Store.profile(); if (!p) return;
      p.companion.name = String(name || p.companion.name).slice(0, 18);
      Store.save();
    },
    setCompanionType: function (type) {
      var p = Store.profile(); if (!p) return;
      p.companion.type = type; Store.save();
    },
    placeSticker: function (unitId, slot) {
      var p = Store.profile(); if (!p) return;
      p.home = L().placeItem(p.home, unitId, slot);
      Store.save();
    },
    clearSlot: function (slot) {
      var p = Store.profile(); if (!p) return;
      if (p.home && p.home.slots) delete p.home.slots[slot];
      Store.save();
    },
    setTier: function (tier) {
      var p = Store.profile(); if (!p) return;
      p.tier = tier; p.tierLocked = true;
      Store.save();
    },
    setName: function (name) {
      var p = Store.profile(); if (!p) return;
      p.name = String(name || p.name || 'Friend').trim().slice(0, 20) || 'Friend';
      Store.save();
      return p;
    },
    setAge: function (age, opts) {
      opts = opts || {};
      var p = Store.profile(); if (!p) return;
      var a = L().clampAge(age);
      p.age = a;
      // Keep level matched to age unless a grown-up locked a custom level
      if (opts.retier) {
        p.tier = L().tierForAge(a);
        p.tierLocked = !!opts.lock;
      } else if (!p.tierLocked) {
        p.tier = L().tierForAge(a);
      }
      Store.save();
      return p;
    },
    // Save several profile fields in one write (Settings form)
    updateProfile: function (data) {
      var p = Store.profile(); if (!p) return null;
      data = data || {};
      if (data.name != null) p.name = String(data.name || 'Friend').trim().slice(0, 20) || 'Friend';
      if (data.age != null) {
        p.age = L().clampAge(data.age);
        if (data.retier || !p.tierLocked) p.tier = L().tierForAge(p.age);
      }
      if (data.tier != null && (data.tier === 'L' || data.tier === 'M' || data.tier === 'H')) {
        p.tier = data.tier;
        p.tierLocked = true;
      }
      if (data.companionName != null) {
        p.companion = p.companion || { type: 'lamb', name: 'Pip' };
        p.companion.name = String(data.companionName || p.companion.name || 'Pip').trim().slice(0, 18) || 'Pip';
      }
      if (data.companionType != null && data.companionType) {
        p.companion = p.companion || { type: 'lamb', name: 'Pip' };
        p.companion.type = data.companionType;
      }
      p.updatedAt = Date.now();
      Store.save();
      return p;
    },
    // Force a full disk write + return whether storage is working
    saveNow: function () {
      var ok = Store.save();
      Store.persistent = (function () {
        try { return root.localStorage.getItem(KEY) != null; } catch (e) { return false; }
      })();
      return { ok: !!ok, persistent: !!Store.persistent };
    },
    setSetting: function (k, v) {
      Store.root.settings[k] = v;
      if (k === 'lang') I().set(v);
      Store.save();
    },
    setOffline: function (unitId, on) {
      var p = Store.profile(); if (!p) return;
      p.offlineUnits = p.offlineUnits || [];
      var i = p.offlineUnits.indexOf(unitId);
      if (on && i === -1) p.offlineUnits.push(unitId);
      if (!on && i !== -1) p.offlineUnits.splice(i, 1);
      Store.save();
    },
    // ---- groups & orgs ----
    createGroup: function (name, kind) {
      var r = Store.root;
      var code = L().groupCode();
      var g = { id: 'g' + Date.now().toString(36), code: code, name: String(name || 'Our group').slice(0, 28), kind: kind || 'family', createdAt: Date.now(), members: [], assignments: [], attendance: {} };
      r.groups.push(g);
      Store.save();
      return g;
    },
    joinGroup: function (code) {
      var r = Store.root, p = Store.profile();
      var g = r.groups.filter(function (x) { return String(x.code).toUpperCase() === String(code).trim().toUpperCase(); })[0];
      if (!g) return { ok: false, reason: 'notfound' };
      if (g.members.some(function (m) { return m.profileId === (p && p.id); })) return { ok: false, reason: 'in' };
      g.members.push({ profileId: p && p.id, name: p ? p.name : 'Friend', xp: p ? p.xp : 0, you: true, added: Date.now() });
      Store.save();
      return { ok: true, group: g };
    },
    leaveGroup: function (id) {
      var r = Store.root, p = Store.profile();
      r.groups.forEach(function (g) { if (g.id === id) g.members = g.members.filter(function (m) { return m.profileId !== (p && p.id); }); });
      Store.save();
    },
    assignToGroup: function (groupId, unitId) {
      var g = Store.root.groups.filter(function (x) { return x.id === groupId; })[0];
      if (!g) return;
      g.assignments = g.assignments || [];
      if (g.assignments.indexOf(unitId) === -1) g.assignments.push(unitId);
      Store.save();
    },
    markAttendance: function (groupId, name, present) {
      var g = Store.root.groups.filter(function (x) { return x.id === groupId; })[0];
      if (!g) return;
      var day = L().isoDay(new Date());
      g.attendance = g.attendance || {};
      g.attendance[day] = g.attendance[day] || {};
      if (present) g.attendance[day][name] = 1; else delete g.attendance[day][name];
      Store.save();
    },
    applyOrg: function (data) {
      var res = L().verifyOrg(data);
      if (!res.ok) {
        Store.root.org = { status: 'none', reason: res.reason };
        Store.save();
        return Store.root.org;
      }
      // A real deployment checks this against a church register over HTTPS.
      // This build has no server, so the application waits for a leader to
      // confirm it on this device — never auto-approved, so the gate is real.
      Store.root.org = { status: 'pending', name: res.name, leader: res.leader, code: res.code, submittedAt: Date.now() };
      Store.save();
      return Store.root.org;
    },
    approveOrgDemo: function () {
      var o = Store.root.org;
      o.status = 'approved'; o.verifiedAt = Date.now();
      if (!o.code) o.code = 'SS-DEMO1';
      Store.root.org = o; Store.save();
    },
    sendReaction: function (groupId, targetName, reactionId) {
      var r = Store.root, today = L().isoDay(new Date());
      if (!L().isAllowedReaction(reactionId)) return { ok: false, reason: 'reaction' };
      var gate = L().canReact(r.device.reactionState, today);
      if (!gate.ok) return { ok: false, reason: 'limit', left: 0 };
      r.device.reactionState = { day: today, used: gate.used + 1 };
      var g = r.groups.filter(function (x) { return x.id === groupId; })[0];
      if (g) {
        g.reactions = g.reactions || [];
        g.reactions.push({ to: targetName, by: (Store.profile() || {}).name || 'You', r: reactionId, at: Date.now() });
        if (g.reactions.length > 200) g.reactions = g.reactions.slice(-200);
      }
      Store.save();
      return { ok: true, left: gate.left - 1 };
    },

    exportJSON: function () { return JSON.stringify(Store.root, null, 2); },
    importJSON: function (text) {
      var data = JSON.parse(text);
      if (!data || !data.profiles) throw new Error('Not a Saul’s Sunday School backup file.');
      Store.root = data; Store.save();
      return true;
    }
  };

  if (typeof module !== 'undefined' && module.exports) module.exports = Store;
  root.SS_Store = Store;
})(typeof window !== 'undefined' ? window : (typeof globalThis !== 'undefined' ? globalThis : this));
