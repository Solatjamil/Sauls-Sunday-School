/* =====================================================================
   App part 2 — companion & garden, prayer journal, memory verses (SRS),
   leaderboards + groups, teacher toolkit, parent dashboard, printables,
   settings. All child-facing screens stay sparse and warm; only the
   grown-up screens are information-dense.
   ===================================================================== */
(function (root) {
  'use strict';
  var App = root.SS_App, L = root.SS_Logic, I = root.SS_I18n, St = root.SS_Store,
    Art = root.SS_Art, Sp = root.SS_Speech, Sy = root.SS_Sync, M = root.SS_META;
  function t(k, v) { return I.t(k, v); }
  function esc(s) { return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
  function prof() { return St.profile(); }
  function skin() { var p = prof(); return p ? L.TIERS[p.tier].skin : 'mid'; }
  function units() { return App.units(); }
  function toast(m) { App.toast(m); }
  var A = {};   // actions
  var st = { verseFlow: null, gardenSel: null, leaderTab: 'global', printUnit: null, printAnswers: true, groupKind: 'family', orgForm: {}, attDay: L.isoDay(new Date()), peerRefresh: 0 };

  /* ============================ COMPANION ============================ */
  var LINES = {
    L: ['You did that well.', 'I like listening to God with you.', 'God made you on purpose.', 'Want to read one more story?', 'You are my favourite learner.'],
    M: ['That was a good answer.', 'I remember when that one was hard for us.', 'Questions are allowed. God can take them.', 'Shall we keep going a little further?', 'You are growing.'],
    H: ['You are getting dangerous with a Bible verse.', 'Real faith asks real questions.', 'What did you not agree with today?', 'Keep the long ones — psalms suit you now.', 'You noticed something I missed.']
  };
  function companionView() {
    var p = prof(); if (!p) return '';
    var ci = L.companionInfo(p.companion.type, p.xp);
    var html = '<div class="comp-page">' +
      '<div class="comp-stage">' + Art.companion(p.companion.type, ci.stage, { skin: skin(), name: p.companion.name }) + '</div>' +
      '<h1>' + esc(p.companion.name) + '</h1>' +
      '<p class="comp-sub">' + esc(t('comp.stage', { n: ci.stage + 1, name: ci.stageName })) + '</p>' +
      '<div class="grow-bar"><span style="width:' + Math.round(((p.xp - L.STAGE_XP[ci.stage]) / Math.max(1, (ci.xpToNext || 1))) * 100) + '%"></span></div>' +
      '<p class="muted-note">' + esc(ci.xpToNext ? t('comp.toNext', { n: ci.xpToNext }) : t('comp.maxed')) + '</p>';

    html += '<div class="stages">' + L.STAGE_XP.map(function (need, i) {
      return '<span class="stage-pill' + (i <= ci.stage ? ' on' : '') + '" title="+' + need + ' XP">' + (i + 1) + '·' + esc(ci.type.stages[i]) + '</span>';
    }).join('') + '</div>';

    html += '<div class="row wrap">' +
      '<button class="btn primary" data-act="comp-talk">💬 ' + esc(t('comp.talk')) + '</button>' +
      '<button class="btn ghost" data-act="comp-hug">🤍 ' + esc(t('comp.hug')) + '</button>' +
      '<button class="btn ghost" data-act="go" data-arg="verses">📜 ' + esc(t('comp.line')) + '</button>' +
      '<button class="btn ghost" data-act="comp-rename">✏️ ' + esc(t('comp.rename')) + '</button></div>';

    if (st.lastLine) html += '<div class="say-bubble">' + esc(st.lastLine) + '</div>';
    html += '<div class="comp-choose"><h3>' + esc(t('onboard.companion')) + '</h3><div class="comp-grid">' +
      Object.keys(L.COMPANIONS).map(function (k) {
        return '<button class="comp-card' + (p.companion.type === k ? ' on' : '') + '" data-act="comp-pick" data-arg="' + k + '">' +
          Art.companion(k, Math.min(1, ci.stage), { skin: skin(), scene: false }) + '<b>' + esc(L.COMPANIONS[k].name) + '</b></button>';
      }).join('') + '</div></div>';
    html += '</div>';
    return html;
  }
  A['comp-talk'] = function () {
    var p = prof(); var arr = LINES[p.tier];
    st.lastLine = p.companion.name + ': “' + arr[Math.floor(Math.random() * arr.length)] + '”';
    Sp.speakShort(st.lastLine); paint();
  };
  A['comp-hug'] = function () { st.lastLine = '🤍'; Sp.speakShort('Ah. Nice.'); paint(); setTimeout(function () { st.lastLine = null; paint(); }, 1400); };
  A['comp-rename'] = function () {
    var p = prof();
    App.modal('<h3>' + esc(t('comp.rename')) + '</h3><input class="big-input" id="rn" value="' + esc(p.companion.name) + '" maxlength="18"/>' +
      '<div class="row"><button class="btn primary" data-act="comp-rename-save">' + esc(t('common.save')) + '</button><button class="btn ghost" data-close>' + esc(t('common.cancel')) + '</button></div>');
    setTimeout(function () { var n = document.getElementById('rn'); if (n) n.focus(); }, 60);
  };
  A['comp-rename-save'] = function () {
    var n = document.getElementById('rn');
    if (n && n.value.trim()) { St.setCompanionName(n.value.trim()); toast(t('comp.renamed')); }
    var m = document.querySelector('.modal-wrap'); if (m) m.remove(); paint();
  };
  A['comp-pick'] = function (k) { St.setCompanionType(k); paint(); };

  /* ============================ GARDEN ============================ */
  function gardenView() {
    var p = prof(); if (!p) return '';
    var earned = p.badges.map(function (id) { var u = App.unitById(id); return u ? { id: id, art: (u.badge && u.badge.art) || 'scroll', name: u.badge.name } : null; }).filter(Boolean);
    var slots = L.homeGrid();
    var sel = st.gardenSel;
    var html = '<div class="page-head"><h1>' + esc(t('base.title')) + '</h1><p>' + esc(t('base.hint')) + '</p></div>';
    html += '<div class="garden">' + slots.map(function (slot, i) {
      var itemId = p.home && p.home.slots[slot];
      var item = itemId ? earned.filter(function (x) { return x.id === itemId; })[0] : null;
      return '<button class="gslot' + (item ? ' filled' : '') + '" data-act="garden-slot" data-arg="' + slot + '">' +
        (item ? Art.motif(item.art, { skin: skin(), disk: false, scale: 1 }) : '<span class="gs-plus">＋</span>') +
        '</button>';
    }).join('') + '</div>';

    html += '<h3 class="sh">' + esc(t('parent.badges')) + ' · ' + earned.length + '</h3>';
    html += '<div class="sticker-shelf">' + (earned.length ? earned.map(function (x) {
      var placed = Object.keys(p.home.slots).some(function (k) { return p.home.slots[k] === x.id; });
      return '<button class="stk' + (sel === x.id ? ' sel' : '') + (placed ? ' placed' : '') + '" data-act="garden-pick" data-arg="' + x.id + '">' +
        Art.motif(x.art, { skin: skin(), disk: false, scale: 1 }) + '<b>' + esc(x.name) + '</b></button>';
    }).join('') : '<p class="empty">' + esc(t('base.locked')) + '</p>') + '</div>';
    if (sel) html += '<p class="muted-note center">' + esc(t('badge.tap')) + '</p>';
    return html;
  }
  A['garden-pick'] = function (id) { st.gardenSel = st.gardenSel === id ? null : id; paint(); };
  A['garden-slot'] = function (slot) {
    var p = prof();
    if (st.gardenSel) { St.placeSticker(st.gardenSel, slot); st.gardenSel = null; }
    else if (p.home.slots[slot]) St.clearSlot(slot);
    paint();
  };

  /* ============================ PRAYER ============================ */
  function prayView() {
    var p = prof(); if (!p) return '';
    var html = '<div class="page-head"><h1>' + esc(t('pray.title')) + '</h1></div>';
    html += '<div class="pray-modes">' + M.PRAYER_MODES.map(function (m) {
      return '<button class="pmode" data-act="pray-mode" data-arg="' + m.id + '">' + Art.motif(m.art, { skin: skin(), disk: false, scale: 1.05 }) + '<b>' + esc(m.name) + '</b></button>';
    }).join('') + '</div>';
    if (st.prayPrompt) {
      html += '<div class="prompt-card"><b>' + esc(st.prayPrompt.name) + '</b><p>' + esc(st.prayPrompt.ask) + '</p>' +
        '<div class="pray-words">' + st.prayPrompt.words.map(function (w) { return '<span class="w' + (st.prayShown && st.prayShown[w.k] ? ' lit' : '') + '" data-act="pray-word" data-arg="' + w.k + '">' + esc(w.v) + '</span>'; }).join(' ') + '</div>' +
        '<button class="btn ghost" data-act="pray-next-word">Next</button></div>';
    }
    html += '<div class="add-pray"><input class="big-input" data-pray-in placeholder="' + esc(t('pray.placeholder')) + '" maxlength="160"/>' +
      '<button class="btn primary" data-act="pray-add">＋ ' + esc(t('pray.add')) + '</button></div>';
    html += '<div class="pray-list">' + (p.prayers.length ? p.prayers.map(function (x) {
      return '<div class="pray-item' + (x.answered ? ' answered' : '') + '">' +
        '<button class="pray-x" data-act="pray-del" data-arg="' + x.id + '">×</button>' +
        '<p>' + esc(x.text) + '</p>' +
        '<div class="row wrap"><button class="btn tiny ghost" data-act="pray-prayed" data-arg="' + x.id + '">🙏 ' + esc(t('pray.mark')) + (x.prayed ? ' (' + x.prayed + ')' : '') + '</button>' +
        '<button class="btn tiny ghost" data-act="pray-answered" data-arg="' + x.id + '">✓ ' + esc(t('pray.answered')) + '</button>' +
        '<span class="muted-note">' + esc(L.isoDay(new Date(x.createdAt))) + '</span></div></div>';
    }).join('') : '<p class="empty">' + esc(t('pray.empty')) + '</p>') + '</div>';
    return html;
  }
  A['pray-mode'] = function (id) {
    var m = M.PRAYER_MODES.filter(function (x) { return x.id === id; })[0];
    var words = m.ask.split(/\s+/).map(function (w, i) { return { k: i, v: w }; });
    st.prayPrompt = { name: m.name, ask: m.ask, words: words };
    st.prayShown = {}; paint();
  };
  A['pray-next-word'] = function () {
    if (!st.prayPrompt) return;
    var n = st.prayPrompt.words.length;
    st.prayShown = {}; for (var i = 0; i < Math.min(n, ((st.prayCount = (st.prayCount || 0) + 4))); i++) st.prayShown[i] = 1;
    if (st.prayCount >= n) { st.prayCount = 0; }
    paint();
  };
  A['pray-add'] = function () {
    var inp = document.querySelector('[data-pray-in]');
    var v = (inp && inp.value || '').trim() || App._prayText || '';
    if (!v) { toast(t('pray.placeholder')); return; }
    St.addPrayer(v); App._prayText = ''; toast(t('pray.saved')); paint();
  };
  A['pray-prayed'] = function (id) { St.markPrayed(id); paint(); };
  A['pray-answered'] = function (id) { St.toggleAnswered(id); paint(); };
  A['pray-del'] = function (id) { St.removePrayer(id); paint(); };

  /* ============================ MEMORY VERSES (SRS) ============================ */
  function versePool() {
    var p = prof();
    return units().filter(function (u) { return L.canChildSee(u, p.tier) && u.memory; }).map(function (u) {
      return { id: u.id, ref: u.memory.ref, text: u.memory.text, short: u.memory.short, title: u.title };
    });
  }
  function trackName(k) {
    var tr = M.TRACKS[k];
    return tr ? tr.name : (k ? String(k).replace(/-/g, ' ') : '—');
  }

  function versesView() {
    var p = prof(); if (!p) return '';
    var pool = versePool();
    var today = L.dayIndex(L.isoDay(new Date()));
    var due = pool.filter(function (v) { return L.srsIsDue(p.srs[v.id], today); });
    var learned = pool.filter(function (v) { return p.srs[v.id] && p.srs[v.id].learned; });
    var html = '<div class="page-head"><h1>' + esc(t('verse.title')) + '</h1>' +
      '<p>' + esc(due.length ? t('verse.due', { n: due.length }) : t('verse.empty')) + ' · ' + learned.length + ' ' + esc(t('verse.learned')) + '</p></div>';
    html += '<p class="muted-note center">' + esc(t('verse.tip')) + '</p>';
    if (st.verseFlow) {
      var v = st.verseFlow.v;
      var boxes = p.srs[v.id] ? p.srs[v.id].box : 0;
      html += '<div class="flash">' +
        '<div class="fl-top"><span>' + esc(v.title) + '</span><span>' + esc(v.ref) + '</span></div>' +
        '<div class="fl-boxes">' + [0, 1, 2, 3, 4, 5].map(function (i) { return '<i class="' + (i <= boxes ? 'on' : '') + '"></i>'; }).join('') + '</div>' +
        '<p class="fl-text">' + (st.verseFlow.shown ? esc(v.text) : esc(v.text.replace(/\S+/g, '⬤⬤⬤'))) + '</p>' +
        '<div class="row wrap">' +
        (st.verseFlow.shown
          ? '<button class="btn ghost" data-act="verse-helped">🤔 ' + esc(t('verse.Helped')) + '</button><button class="btn primary" data-act="verse-knew">✓ ' + esc(t('verse.iKnew')) + '</button>'
          : '<button class="btn primary big" data-act="verse-show">' + esc(t('verse.show')) + '</button>') +
        '<button class="btn linkbtn" data-act="verse-quit">✕</button></div></div>';
      return html;
    }
    html += '<div class="verse-list">' + pool.map(function (v) {
      var c = p.srs[v.id];
      var isDue = L.srsIsDue(c, today);
      return '<button class="vrow' + (isDue ? ' due' : '') + (c && c.learned ? ' learned' : '') + '" data-act="verse-start" data-arg="' + v.id + '">' +
        '<span class="vr-art">' + Art.motif('scroll', { skin: skin(), disk: false, scale: 1.1 }) + '</span>' +
        '<b>' + esc(v.ref) + '</b><i>' + esc(v.text.slice(0, 72)) + (v.text.length > 72 ? '…' : '') + '</i>' +
        '<em>' + (c && c.learned ? '✓ ' + esc(t('verse.learned')) : isDue ? esc(t('verse.due', { n: 1 })) : '') + '</em></button>';
    }).join('') + '</div>';
    return html;
  }
  A['verse-start'] = function (id) { var v = versePool().filter(function (x) { return x.id === id; })[0]; st.verseFlow = { v: v, shown: false, t0: Date.now() }; paint(); };
  A['verse-show'] = function () { st.verseFlow.shown = true; paint(); };
  A['verse-quit'] = function () { st.verseFlow = null; paint(); };
  A['verse-knew'] = function () { reviewVerse(true); };
  A['verse-helped'] = function () { reviewVerse(false); };
  function reviewVerse(correct) {
    var v = st.verseFlow.v;
    St.srsReview(v.id, correct, L.srsReward({ box: 3, learned: true }));
    toast(t('verse.done', { n: 8 + (correct ? 6 : 0) }));
    var pool = versePool().filter(function (x) { return L.srsIsDue(prof().srs[x.id], L.dayIndex(L.isoDay(new Date()))) && x.id !== v.id; });
    st.verseFlow = pool.length ? { v: pool[0], shown: false } : null;
    paint();
  }

  /* ============================ LEADERBOARDS ============================ */
  function leaderView() {
    var p = prof(); if (!p) return '';
    var today = L.isoDay(new Date());
    var rows = [];
    if (st.leaderTab === 'global') {
      rows = L.globalPeers(M.ROSTER, today, p.xp);
    } else {
      var mine = St.root.groups.filter(function (g) { return g.members.some(function (m) { return m.profileId === p.id; }); });
      if (!mine.length) return '<div class="page-head"><h1>' + esc(t('leader.group')) + '</h1><p class="empty">' + esc(t('leader.none')) + '</p></div>' + groupForms();
      rows = mine[0].members.map(function (m) {
        var pr = St.root.profiles[m.profileId];
        return { name: m.name, xp: pr ? pr.xp : m.xp, you: m.profileId === p.id, groupId: mine[0].id, simulated: m.simulated };
      }).concat(mine[0].members.length < 3 ? [{ name: 'Demo friend 🌱', xp: 60 + (L.hashSeed(today) % 90), simulated: true, groupId: mine[0].id }] : []);
    }
    var me = p;
    var ranked = L.rankRows(rows.map(function (r) {
      return { name: r.name, xp: r.xp, you: r.you, groupId: r.groupId, simulated: r.simulated, badges: me.badges.length, units: Object.keys(me.completed).length };
    }));
    var myRank = ranked.filter(function (r) { return r.you; })[0] || { rank: 1 };

    var html = '<div class="page-head"><h1>' + esc(t('leader.title')) + '</h1>' +
      '<div class="tabs">' + [['global', t('leader.global')], ['group', t('leader.group')]].map(function (x) {
        return '<button class="tab' + (st.leaderTab === x[0] ? ' on' : '') + '" data-act="leader-tab" data-arg="' + x[0] + '">' + esc(x[1]) + '</button>';
      }).join('') + '</div></div>';
    html += '<p class="muted-note">' + esc(t('leader.rank')) + (st.leaderTab === 'global' ? ' · ' + esc(t('leader.offlineNote')) : '') + '</p>';
    if (st.leaderTab === 'global') html += '<div class="you-banner">' + esc(t('leader.you')) + ' · #' + myRank.rank + ' · ' + p.xp + ' XP</div>';

    html += '<ol class="lb">' + ranked.map(function (r) {
      return '<li class="lbrow' + (r.you ? ' you' : '') + '">' +
        '<span class="lb-rank">' + r.rank + '</span>' +
        '<span class="lb-name">' + esc(r.name) + (r.simulated ? ' <em class="sim">demo</em>' : '') + '</span>' +
        '<span class="lb-xp">' + r.xp + ' XP</span>' +
        (r.gainedToday ? '<span class="lb-gain">' + esc(t('leader.gained', { n: r.gainedToday })) + '</span>' : '') +
        (!r.you ? '<button class="btn tiny ghost react-btn" data-act="react-open" data-arg="' + esc(r.name) + '">' + esc(t('leader.reacts')) + '</button>' : '') +
        '</li>';
    }).join('') + '</ol>';
    var gate = L.canReact(St.root.device.reactionState, today);
    html += '<p class="center muted-note">' + esc(t('leader.reactsLeft', { n: gate.left })) + ' · ' + esc(t('leader.noChat')) + '</p>';
    html += groupForms();
    return html;
  }
  function groupForms() {
    var mine = St.root.groups.filter(function (g) { return g.members.some(function (m) { return m.profileId === prof().id; }); });
    var html = '<div class="gbox"><h3>' + esc(t('leader.join')) + '</h3>' +
      '<div class="row"><input class="code-in" id="jcode" maxlength="6" placeholder="' + esc(t('leader.code')) + '" autocapitalize="characters"/>' +
      '<button class="btn primary" data-act="group-join">' + esc(t('leader.join')) + '</button></div>' +
      '<p class="muted-note">' + esc(t('leader.codeHint')) + '</p></div>';
    html += '<div class="gbox"><h3>' + esc(t('leader.create')) + '</h3><div class="row wrap">' +
      [['family', t('group.family')], ['class', t('group.class')], ['church', t('group.church')]].map(function (k) {
        var allowed = L.canCreateGroup(St.root.org, k[0]);
        return '<button class="btn ghost' + (st.groupKind === k[0] ? ' on' : '') + (allowed ? '' : ' off') + '" data-act="group-kind" data-arg="' + k[0] + '">' + esc(k[1]) + (allowed ? '' : ' 🔒') + '</button>';
      }).join('') + '</div>' +
      '<p class="muted-note">' + esc(t('group.notice')) + '</p>' +
      '<div class="row"><input class="big-input" id="gname" placeholder="' + esc(t('group.nameAsk')) + '"/>' +
      '<button class="btn primary" data-act="group-create">' + esc(t('leader.create')) + '</button></div></div>';
    html += '<div class="gbox"><h3>' + esc(t('group.family')) + '</h3>' +
      '<p class="muted-note">' + esc(t('group.familyNote')) + '</p>' +
      '<div class="row"><input class="big-input" id="fg" placeholder="' + esc(t('group.familyGuess', { name: prof().name || 'our' })) + '"/>' +
      '<button class="btn primary" data-act="family-create">' + esc(t('leader.create')) + '</button></div></div>';
    if (mine.length) {
      html += '<div class="gbox"><h3>' + esc(t('leader.group')) + '</h3>' + mine.map(function (g) {
        return '<div class="grow-row"><b>' + esc(g.name) + '</b><code>' + esc(g.code) + '</code>' +
          '<button class="btn tiny ghost" data-act="group-leave" data-arg="' + g.id + '">' + esc(t('leader.leave')) + '</button></div>';
      }).join('') + '</div>';
    }
    return html;
  }
  A['leader-tab'] = function (k) { st.leaderTab = k; paint(); };
  A['group-kind'] = function (k) { st.groupKind = k; paint(); };
  A['group-join'] = function () {
    var n = document.getElementById('jcode');
    var r = St.joinGroup(n ? n.value : '');
    if (!r.ok) toast(r.reason === 'notfound' ? t('leader.none') : '✓'); else { toast(t('leader.joined')); St.sendReaction(r.group.id, 'Everyone', 'clap'); }
    paint();
  };
  A['group-create'] = function () {
    var n = document.getElementById('gname');
    var allowed = L.canCreateGroup(St.root.org, st.groupKind);
    if (st.groupKind !== 'family' && !allowed) { toast(t('group.notice')); go2('groups'); return; }
    var g = St.createGroup(n && n.value ? n.value : (t('group.' + st.groupKind)), st.groupKind);
    St.joinGroup(g.code);
    toast(g.code); paint();
  };
  A['group-leave'] = function (id) { St.leaveGroup(id); toast(t('leader.left')); paint(); };
  A['react-open'] = function (name) {
    var gid = null;
    if (st.leaderTab === 'group') {
      var mine = St.root.groups.filter(function (g) { return g.members.some(function (m) { return m.profileId === prof().id; }); })[0];
      gid = mine ? mine.id : null;
    }
    st.reactTo = { name: name, groupId: gid };
    App.modal('<h3>' + esc(t('leader.reacts')) + ' → ' + esc(name) + '</h3><div class="react-grid">' +
      L.REACTIONS.map(function (r) { return '<button class="react-pick" data-act="react-send" data-arg="' + r + '">' + Art.reaction(r) + '<b>' + esc(r) + '</b></button>'; }).join('') +
      '</div><p class="muted-note">' + esc(t('leader.noChat')) + '</p>');
  };
  A['react-send'] = function (r) {
    var who = st.reactTo ? st.reactTo.name : 'friend';
    var gid = st.reactTo ? st.reactTo.groupId : null;
    var res = St.sendReaction(gid, who, r);
    if (!res.ok) { toast(res.reason === 'limit' ? t('leader.reactsLeft', { n: 0 }) : '· · ·'); return; }
    var m = document.querySelector('.modal-wrap'); if (m) m.remove();
    toast('🎉 ' + who + ' · ' + t('leader.reactsLeft', { n: res.left }));
  };

  /* ============================ GROUPS / TEACHER ============================ */
  function groupsView() {
    var org = St.root.org;
    var html = '<div class="page-head"><h1>' + esc(t('leader.group')) + '</h1><p>' + esc(t('group.notice')) + '</p></div>';
    html += '<div class="org-card status-' + esc(org.status) + '">' +
      '<h3>' + esc(org.status === 'approved' ? t('group.verified') : org.status === 'pending' ? t('group.pending') : t('group.apply')) + '</h3>';
    if (org.status === 'none') {
      html += '<input class="big-input" data-org="name" placeholder="' + esc(t('group.orgName')) + '"/>' +
        '<input class="big-input" data-org="leader" placeholder="' + esc(t('group.leader')) + '"/>' +
        '<input class="big-input" data-org="code" placeholder="' + esc(t('group.codeAsk')) + '"/>' +
        '<button class="btn primary" data-act="org-apply">' + esc(t('group.submit')) + '</button>' +
        '<p class="muted-note">Demo note: a real deployment needs a human on the ministry side to check the code — this build cannot verify anyone by itself.</p>';
    } else {
      html += '<div class="kv"><span>' + esc(t('group.orgName')) + '</span><b>' + esc(org.name || '—') + '</b></div>' +
        '<div class="kv"><span>' + esc(t('group.leader')) + '</span><b>' + esc(org.leader || '—') + '</b></div>' +
        (org.status === 'pending' ? '<button class="btn ghost" data-act="org-approve">' + esc(t('group.approve')) + '</button>' : '<div class="kv"><span>' + esc(t('group.verified')) + '</span><b>✓</b></div>') +
        '<p class="muted-note">' + esc(t('group.simNote')) + '</p>';
    }
    html += '</div>';

    if (org.status === 'approved') {
      var groups = St.root.groups;
      if (!groups.length) html += '<p class="empty">' + esc(t('leader.none')) + '</p>';
      groups.forEach(function (g) {
        var days = Object.keys(g.attendance || {}).sort().slice(-5).reverse();
        html += '<div class="tbox"><h3>' + esc(g.name) + ' <code>' + esc(g.code) + '</code> <em class="tag">' + esc(t('group.' + g.kind)) + '</em></h3>';
        html += '<h4>' + esc(t('group.assign')) + '</h4><div class="assign-grid">' +
          L.pathUnits(units(), (prof() || {}).tier || 'M').slice(0, 8).map(function (u) {
            var on = (g.assignments || []).indexOf(u.id) !== -1;
            return '<button class="chip' + (on ? ' on' : '') + '" data-act="assign" data-arg="' + g.id + '|' + u.id + '">' + esc(u.title) + '</button>';
          }).join('') + '</div>';
        html += '<h4>' + esc(t('group.attendance')) + ' · ' + esc(st.attDay) + '</h4>' +
          '<div class="att">' + (g.members.length ? g.members.map(function (m) {
            var here = g.attendance[st.attDay] && g.attendance[st.attDay][m.name];
            return '<button class="chip' + (here ? ' on' : '') + '" data-act="att" data-arg="' + g.id + '|' + esc(m.name) + '">' + esc(m.name) + '</button>';
          }).join('') : '<p class="muted-note">' + esc(t('leader.none')) + '</p>') + '</div>';
        html += '<div class="row"><button class="btn tiny ghost" data-act="att-day">Change day</button>' +
          '<button class="btn tiny ghost" data-act="print-class" data-arg="' + g.id + '">' + esc(t('group.printAll')) + '</button></div>';
        if (days.length) {
          html += '<p class="muted-note">' + days.map(function (d) { return d + ': ' + Object.keys(g.attendance[d]).length; }).join(' · ') + '</p>';
        }
        html += '</div>';
      });
    }
    html += groupForms();
    return html;
  }
  A['org-apply'] = function () {
    var d = {}; document.querySelectorAll('[data-org]').forEach(function (n) { d[n.getAttribute('data-org')] = n.value; });
    var res = St.applyOrg(d);
    toast(res.status === 'approved' ? t('group.verified') : t('group.pending'));
    paint();
  };
  A['org-approve'] = function () { St.approveOrgDemo(); toast(t('group.verified')); paint(); };
  A['assign'] = function (arg) { var a = arg.split('|'); St.assignToGroup(a[0], a[1]); toast(t('group.assigned')); paint(); };
  A['att'] = function (arg) { var a = arg.split('|'); var g = St.root.groups.filter(function (x) { return x.id === a[0]; })[0]; var here = g.attendance[st.attDay] && g.attendance[st.attDay][a[1]]; St.markAttendance(a[0], a[1], !here); paint(); };
  A['att-day'] = function () { st.attDay = L.addDays(st.attDay, -1); paint(); };
  A['family-create'] = function () {
    var n = document.getElementById('fg');
    var g = St.createGroup(n && n.value ? n.value : 'Our family', 'family');
    St.joinGroup(g.code); toast(g.code); paint();
  };

  /* ============================ PARENT DASHBOARD ============================ */
  function parentView() {
    var p = prof(); if (!p) return '';
    var pool = L.pathUnits(units(), p.tier);
    var prog = L.progressOf(units(), p.tier, p.completed);
    var today = L.isoDay(new Date());
    var days = []; for (var i = 6; i >= 0; i--) days.push(L.addDays(today, -i));
    var week = days.map(function (d) { return { label: d.slice(8), v: Math.round((p.timeLog[d] || 0) / 60), color: '#5fb2d4' }; });
    var log = p.quizLog || [];
    var acc = L.accuracyTrend(log);
    var weak = L.weakTopics(log);
    var tracks = Object.keys(M.TRACKS).map(function (k) {
      var all = units().filter(function (u) { return u.track === k && L.canChildSee(u, p.tier); });
      var done = all.filter(function (u) { return L.uDone(p.completed, u.id); }).length;
      return { label: M.TRACKS[k].name, v: done, color: M.TRACKS[k].color };
    });
    var totalTime = Object.keys(p.timeLog).reduce(function (a, k) { return a + p.timeLog[k]; }, 0);

    var html = '<div class="page-head dens"><h1>' + esc(t('parent.title')) + '</h1><p>' + esc(t('parent.sub')) + '</p>' +
      '<div class="kids">' + St.profiles().map(function (c) {
        return '<button class="kid' + (c.id === St.root.activeProfile ? ' on' : '') + '" data-act="pick-child" data-arg="' + c.id + '">' + esc(c.name) + '</button>';
      }).join('') + '<button class="kid add" data-act="go" data-arg="onboard">＋' + esc(t('parent.add')) + '</button>' +
      '<button class="kid ghost" data-act="parent-remove">🗑 ' + esc(t('parent.remove')) + '</button></div></div>';

    html += '<div class="cards">' +
      card(t('parent.units'), prog.done + '/' + prog.total, Art.donut(prog.pct, { color: '#7bbf5a' })) +
      card(t('parent.streak'), (p.streak.best || 0) + '🔥', null) +
      card(t('parent.badges'), String(p.badges.length), null) +
      card(t('parent.time'), Math.round(totalTime / 60) + ' min', null) +
      card(t('parent.accuracy'), acc == null ? '—' : acc + '%', acc == null ? null : Art.donut(acc, { color: '#f2a13b' })) +
      '</div>';

    html += '<div class="grid2">' +
      '<section><h3>' + esc(t('parent.week')) + '</h3>' + Art.bars(week, { w: 340, h: 130 }) + '</section>' +
      '<section><h3>' + esc(t('parent.overview')) + '</h3>' + Art.bars(tracks, { w: 340, h: 150 }) + '</section></div>';

    html += '<section><h3>' + esc(t('parent.weak')) + '</h3>' + (weak.length ? '<ul class="weak">' + weak.map(function (w) {
      return '<li><b>' + esc(trackName(w.track)) + '</b><span>' + w.accuracy + '% · ' + w.units.length + ' ' + esc(t('path.title')) + '</span>' +
        '<button class="btn tiny ghost" data-act="parent-drill" data-arg="' + w.track + '">Review</button></li>';
    }).join('') + '</ul>' : '<p class="muted-note">' + esc(t('parent.noweak')) + '</p>') + '</section>';

    var first = log.length ? log[log.length - 1].day : '—';
    html += '<section><h3>' + esc(t('parent.log')) + ' (' + log.length + ')</h3>' +
      (log.length ? '<table class="log"><tr><th>Date</th><th>Unit</th><th>Topic</th><th>First-try</th><th>Needed help</th></tr>' +
        log.slice(-14).reverse().map(function (r) {
          var u = App.unitById(r.unitId) || {};
          return '<tr><td>' + esc(r.day) + '</td><td>' + esc(u.title || r.unitId) + '</td><td>' + esc(trackName(r.track)) + '</td><td>' + r.correct + '/' + r.total + '</td><td>' + (r.neededHelp || 0) + '</td></tr>';
        }).join('') + '</table>' : '<p class="muted-note">' + esc(t('parent.firstTime')) + '</p>') + '</section>';

    var hardUnits = units().filter(function (u) { return u.tier === p.tier && u.mature; });
    html += '<section class="prof-edit-mini"><h3>' + esc(t('set.profile')) + '</h3>' +
      '<p class="muted-note">' + esc(p.name) + ' · ' + p.age + ' · ' + esc(t('onboard.tier' + p.tier)) + '</p>' +
      '<button class="btn primary" data-act="go" data-arg="settings">' + esc(t('set.saveProfile')) + ' / ' + esc(t('set.profile')) + '</button></section>';

    html += '<section><h3>' + esc(t('parent.level')) + '</h3><p class="muted-note">' + esc(t('parent.levelHelp')) + '</p>' +
      '<div class="row wrap">' + ['L', 'M', 'H'].map(function (k) {
        return '<button class="chip' + (p.tier === k ? ' on' : '') + '" data-act="parent-tier" data-arg="' + k + '">' + esc(t('onboard.tier' + k)) + '</button>';
      }).join('') + '</div>' +
      '<p class="muted-note">' + esc(t('parent.hard')) + ': ' + hardUnits.length + '</p></section>';

    html += '<section><h3>' + esc(t('parent.lang')) + '</h3><div class="row wrap">' + I.LANGS.map(function (l) {
      return '<button class="chip' + (I.lang === l.code ? ' on' : '') + '" data-act="set-lang" data-arg="' + l.code + '">' + esc(l.name) + '</button>';
    }).join('') + '</div></section>';

    html += '<section><h3>Data</h3><div class="row wrap">' +
      '<button class="btn ghost" data-act="export">' + esc(t('parent.export')) + '</button>' +
      '<button class="btn ghost" data-act="import">' + esc(t('parent.import')) + '</button>' +
      '<button class="btn ghost" data-act="print-progress">' + esc(t('parent.print')) + '</button>' +
      '<button class="btn ghost" data-act="go" data-arg="print">' + esc(t('print.title')) + '</button>' +
      '</div><p class="muted-note">' + esc(t('sync.saved')) + (St.persistent ? '' : ' ' + esc(t('sync.tabOnly'))) + ' · ' +
      esc(Sy.pending() ? t('sync.pend', { n: Sy.pending() }) : t('sync.none')) + '</p></section>';

    if (!log.length && !prog.done) html += '<p class="empty big">' + esc(t('parent.nodata')) + '</p>';
    return html;
  }
  function card(label, value, art) {
    return '<div class="pcard"><span class="pv">' + esc(value) + '</span><span class="pl">' + esc(label) + '</span>' + (art ? '<div class="pa">' + art + '</div>' : '') + '</div>';
  }
  A['parent-tier'] = function (k) { St.setTier(k); toast(t('parent.level')); paint(); };
  A['parent-remove'] = function () {
    var p = prof();
    if (!p) return;
    if (!window.confirm(t('parent.confirmRemove'))) return;
    St.removeProfile(p.id); App.unitState = null;
    go2(prof() ? 'home' : 'onboard');
  };
  A['parent-drill'] = function (track) {
    var p = prof();
    var pool = units().filter(function (u) { return u.track === track && L.canChildSee(u, p.tier); });
    var pick = pool.filter(function (u) { return !L.uDone(p.completed, u.id); })[0] || pool[0];
    if (pick) go2('unit', pick.id);
  };
  A['export'] = function () {
    var ok = Sy.download(St.exportJSON(), 'sauls-sunday-school-backup-' + L.isoDay(new Date()) + '.json');
    toast(ok ? t('sync.saved') : '⚠ ' + t('sync.saved'));
  };
  A['import'] = function () {
    Sy.pickFile(function (text) {
      try { St.importJSON(text); Sp.init(); toast('✓'); go2('home'); }
      catch (e) { toast(String(e.message || e)); }
    });
  };
  A['print-progress'] = function () { printDoc(progressHTML(), 'progress'); };

  /* ============================ PRINTABLES ============================ */
  function printView(unitId) {
    var p = prof(); if (!p) return '';
    var list = L.pathUnits(units(), p.tier);
    var u = unitId ? App.unitById(unitId) : (st.printUnit ? App.unitById(st.printUnit) : list[0]);
    st.printUnit = u ? u.id : null;
    var html = '<div class="page-head"><h1>' + esc(t('print.title')) + '</h1></div>';
    html += '<div class="unit-pick"><select data-act="print-pick" id="pu">' + list.map(function (x) {
      return '<option value="' + x.id + '"' + (u && u.id === x.id ? ' selected' : '') + '>' + esc(x.n + '. ' + x.title) + '</option>';
    }).join('') + '</select>' +
      '<label class="tog"><input type="checkbox" data-act="print-answers"' + (st.printAnswers ? ' checked' : '') + '/><span>' + esc(t('print.answers')) + '</span></label></div>';
    if (!u) return html;
    var sheets = L.printablePack(u, { answers: st.printAnswers });
    html += '<div class="sheet-grid">' + sheets.map(function (s, i) {
      return '<button class="sheet" data-act="print-open" data-arg="' + i + '">' +
        (s.kind === 'coloring' ? Art.colouringPage(s.motif || 'scroll', u.title) : '<div class="sheet-lines">' + sheetPreview(s, u) + '</div>') +
        '<b>' + esc(t('print.' + (s.kind === 'coloring' ? 'coloring' : s.kind === 'activity' ? 'activity' : s.kind === 'craft' ? 'craft' : 'parent'))) + '</b></button>';
    }).join('') + '</div>';
    html += '<div class="row wrap"><button class="btn primary" data-act="print-open" data-arg="all">' + esc(t('print.open')) + '</button>' +
      '<button class="btn ghost" data-act="print-download">' + esc(t('print.download')) + '</button></div>' +
      '<p class="muted-note">' + esc(t('print.tip')) + '</p>';
    return html;
  }
  function sheetPreview(s, u) {
    if (s.kind === 'activity') return '<p>' + esc(u.title) + '</p>' + (u.quiz || []).slice(0, 3).map(function (q) { return '<span class="sl">' + esc(q.q) + '</span>'; }).join('');
    if (s.kind === 'craft') return '<p>' + esc(s.title) + '</p>' + (s.steps || []).map(function (x) { return '<span class="sl">• ' + esc(x) + '</span>'; }).join('');
    return '<p>' + esc(u.title) + '</p><span class="sl">' + esc(u.memory.ref) + '</span><span class="sl">' + esc(t('player.grownUp')) + '</span>';
  }
  function printDoc(bodyHTML, name) {
    var win = null;
    try { win = window.open('', '_blank', 'width=840,height=1000'); } catch (e) { win = null; }
    if (win && win.document) {
      win.document.write('<!doctype html><html><head><meta charset="utf-8"><title>' + esc(name) + ' — ' + esc(M.BRAND.name) + '</title>' +
        '<style>@page{size:letter portrait;margin:12mm}body{font-family:Georgia,"Times New Roman",serif;color:#222;margin:0;padding:16px}' +
        'h1{font-size:26px;margin:0 0 4px}h2{font-size:19px;margin:18px 0 6px}svg{max-width:100%;height:auto}' +
        '.sheet{page-break-after:always}.q{margin:6px 0;padding:6px 0;border-bottom:1px dashed #bbb}.line{height:22px;border-bottom:1px solid #999;margin:10px 0}' +
        '.foot{font-size:11px;color:#666;margin-top:14px}.answers{background:#f4f4f4;padding:8px;font-size:12px}' +
        '@media print{button{display:none}}</style></head><body>' + bodyHTML +
        '<p class="foot">' + esc(M.BRAND.name) + ' · free, no ads · ' + esc(M.BRAND.appUrl) + '</p>' +
        '<script>window.onload=function(){try{window.print()}catch(e){}}<\/script></body></html>');
      win.document.close();
      return;
    }
    Sy.download('<!doctype html><meta charset="utf-8"><title>' + esc(name) + '</title><body>' + bodyHTML + '</body>', name + '.html', 'text/html');
    toast(t('print.download'));
  }
  A['print-open'] = function (idx) {
    var u = App.unitById(st.printUnit); if (!u) return;
    var sheets = L.printablePack(u, { answers: st.printAnswers });
    var pick = idx === 'all' ? sheets : [sheets[parseInt(idx, 10)]];
    printDoc(pick.map(function (s) { return sheetHTML(s, u); }).join(''), u.id);
  };
  A['print-download'] = function () {
    var u = App.unitById(st.printUnit); if (!u) return;
    printDoc(L.printablePack(u, { answers: st.printAnswers }).map(function (s) { return sheetHTML(s, u); }).join(''), u.id + '-pack');
  };
  A['print-pick'] = null;
  function sheetHTML(s, u) {
    if (s.kind === 'coloring') return '<div class="sheet"><h1>' + esc(s.title) + '</h1>' + Art.colouringPage(s.motif || 'scroll', u.title) + '</div>';
    if (s.kind === 'activity') {
      return '<div class="sheet"><h1>' + esc(u.title) + '</h1><h2>' + esc(t('print.activity')) + '</h2>' +
        '<p><i>' + esc(u.summary) + '</i></p>' +
        (u.scripture || []).map(function (q) { return '<p class="q">Quote: “' + esc(q.text) + '” — ' + esc(q.ref) + '</p>'; }).join('') +
        '<h2>Questions</h2>' + (u.quiz || []).map(function (q, i) {
          var body = q.t === 'mc' || q.t === 'tap' ? q.a.map(function (a) { return '<div class="q">☐ ' + esc(a) + '</div>'; }).join('')
            : q.t === 'order' ? q.items.map(function () { return '<div class="line"></div>'; }).join('')
              : q.t === 'match' ? q.pairs.map(function (p) { return '<div class="q">' + esc(p[0]) + ' __________ ' + '</div>'; }).join('')
                : q.t === 'sort' ? q.buckets.map(function (b) { return '<div class="q"><b>' + esc(b.name) + '</b><div class="line"></div><div class="line"></div></div>'; }).join('')
                  : '<div class="line"></div>';
          return '<h2>' + (i + 1) + '. ' + esc(q.q) + '</h2>' + body;
        }).join('') +
        (st.printAnswers ? '<p class="answers"><b>Answers:</b> ' + esc((u.quiz || []).map(function (q, i) {
          if (q.t === 'mc' || q.t === 'tap') return (i + 1) + ')' + q.a[q.c];
          if (q.t === 'blank') return (i + 1) + ')' + (q.a || q.accept && q.accept[0]);
          if (q.t === 'order') return (i + 1) + ')' + q.items.join(' → ');
          if (q.t === 'match') return (i + 1) + ')' + q.pairs.map(function (p) { return p[0] + '=' + p[1]; }).join(', ');
          if (q.t === 'sort') return (i + 1) + ')' + q.items.map(function (x) { return x.text + '→' + x.b; }).join(', ');
          return (i + 1) + ')?';
        }).join(' · ')) + '</p>' : '') + '</div>';
    }
    if (s.kind === 'craft') {
      return '<div class="sheet"><h1>' + esc(s.title) + '</h2><h2>' + esc(t('print.craft')) + '</h2><ol>' +
        (s.steps || []).map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('') + '</ol>' +
        (s.note ? '<p><b>Note:</b> ' + esc(s.note) + '</p>' : '') + '</div>';
    }
    return '<div class="sheet"><h1>' + esc(t('print.parent')) + '</h1><h2>' + esc(u.title) + '</h2>' +
      '<p>' + esc(u.summary) + '</p>' +
      (u.hardNote ? '<h2>Hard parts</h2><p>' + esc(u.hardNote) + '</p>' : '') +
      '<h2>Talk about it</h2>' + ((u.teach && u.teach.length ? u.teach : [u.memory.ref])).map(function (x) { return '<p class="q">• ' + esc(x) + '</p>'; }).join('') +
      '<h2>Memory verse</h2><p>' + esc(u.memory.text) + ' — ' + esc(u.memory.ref) + '</p>' +
      '<h2>Prayer</h2><p>' + esc(u.prayer) + '</p>' +
      '<h2>More from ' + esc(M.BRAND.parent) + '</h2><p>' + esc(M.BRAND.parentUrl) + '</p></div>';
  }
  function progressHTML() {
    var p = prof();
    var prog = L.progressOf(units(), p.tier, p.completed);
    var rows = L.pathUnits(units(), p.tier).map(function (u) {
      var c = p.completed[u.id];
      return '<div class="q"><b>' + esc(u.title) + '</b> — ' + (c && c.done ? 'done ' + c.day + ' · ' + c.correct + '/' + c.total : 'not started') + '</div>';
    }).join('');
    return '<h1>' + esc(p.name) + ' · ' + esc(L.TIERS[p.tier].name) + ' · age ' + p.age + '</h1>' +
      '<p>' + esc(t('path.progress', { done: prog.done, total: prog.total })) + ' · ' + esc(L.framingLevel(p.xp).line) + ' · ' + esc(t('home.streak', { n: p.streak.best })) + '</p>' +
      '<h2>' + esc(t('path.title')) + '</h2>' + rows;
  }
  function printClassPack(groupId) {
    var g = St.root.groups.filter(function (x) { return x.id === groupId; })[0];
    if (!g) return;
    var body = '<h1>' + esc(g.name) + ' — class pack</h1><p>Code ' + esc(g.code) + ' · ' + esc(L.isoDay(new Date())) + '</p>' +
      '<h2>Assigned units</h2>' + (g.assignments || []).map(function (id) {
        var u = App.unitById(id); if (!u) return '';
        return '<div class="sheet"><h2>' + esc(u.title) + '</h2><p>' + esc(u.summary) + '</p><p><b>Verse:</b> ' + esc(u.memory.text) + ' (' + esc(u.memory.ref) + ')</p>' + Art.colouringPage(u.printable.motif, u.title) + '</div>';
      }).join('') +
      '<h2>Attendance</h2><div class="line"></div><div class="line"></div><div class="line"></div>';
    printDoc(body, 'class-pack');
  }
  A['print-class'] = function (id) { printClassPack(id); };

  /* ============================ SETTINGS ============================ */
  function settingsView() {
    var s = St.root.settings;
    var p = prof();
    var voices = (Sp.voices || []).slice(0, 40);
    var html = '<div class="page-head"><h1>' + esc(t('set.title')) + '</h1></div>';

    // ---- Profile (name, age, level, companion) — editable + saved on device ----
    if (p) {
      var ageChips = '';
      for (var a = 3; a <= 12; a++) {
        ageChips += '<button type="button" class="age-chip' + (p.age === a ? ' on' : '') + '" data-act="prof-age" data-arg="' + a + '"><b>' + a + '</b></button>';
      }
      var tierChips = ['L', 'M', 'H'].map(function (k) {
        return '<button type="button" class="chip' + (p.tier === k ? ' on' : '') + '" data-act="prof-tier" data-arg="' + k + '">' + esc(t('onboard.tier' + k)) + '</button>';
      }).join('');
      var compGrid = Object.keys(L.COMPANIONS).map(function (k) {
        return '<button type="button" class="comp-card' + (p.companion.type === k ? ' on' : '') + '" data-act="prof-comp" data-arg="' + k + '">' +
          Art.companion(k, 0, { skin: L.TIERS[p.tier].skin, scene: false }) +
          '<b>' + esc(L.COMPANIONS[k].name) + '</b></button>';
      }).join('');
      var storageNote = St.persistent ? t('set.storageOk') : t('set.storageNo');
      html += '<section class="prof-edit">' +
        '<h3>' + esc(t('set.profile')) + '</h3>' +
        '<p class="muted-note">' + esc(t('set.profileHint')) + '</p>' +
        '<label class="field"><span>' + esc(t('set.name')) + '</span>' +
        '<input class="big-input" id="set-name" maxlength="20" value="' + esc(p.name) + '" autocomplete="nickname"/></label>' +
        '<div class="field"><span>' + esc(t('set.age')) + '</span><div class="age-grid">' + ageChips + '</div></div>' +
        '<div class="field"><span>' + esc(t('set.level')) + '</span><div class="row wrap">' + tierChips + '</div>' +
        '<button type="button" class="btn linkbtn" data-act="prof-retier">' + esc(t('set.levelAuto')) + '</button></div>' +
        '<div class="field"><span>' + esc(t('set.companion')) + '</span><div class="comp-grid">' + compGrid + '</div></div>' +
        '<label class="field"><span>' + esc(t('set.companionName')) + '</span>' +
        '<input class="big-input" id="set-comp-name" maxlength="18" value="' + esc(p.companion.name) + '"/></label>' +
        '<div class="row wrap">' +
        '<button type="button" class="btn primary big" data-act="prof-save">' + esc(t('set.saveProfile')) + '</button>' +
        '<button type="button" class="btn ghost" data-act="go" data-arg="switch">' + esc(t('parent.switch')) + '</button>' +
        '<button type="button" class="btn ghost" data-act="go" data-arg="onboard">＋ ' + esc(t('parent.add')) + '</button>' +
        '</div>' +
        '<p class="muted-note" id="set-storage-note">' + esc(storageNote) + '</p>' +
        '</section>';
    } else {
      html += '<section><p class="muted-note">' + esc(t('parent.firstTime')) + '</p>' +
        '<button class="btn primary" data-act="go" data-arg="onboard">' + esc(t('parent.add')) + '</button></section>';
    }

    html += '<section><h3>' + esc(t('parent.lang')) + '</h3><div class="row wrap">' + I.LANGS.map(function (l) {
      return '<button class="chip' + (I.lang === l.code ? ' on' : '') + '" data-act="set-lang" data-arg="' + l.code + '">' + esc(l.name) + '</button>';
    }).join('') + '</div></section>';

    html += '<section><h3>' + esc(t('player.voiceLang')) + '</h3><div class="row wrap">' +
      (root.SS_StoryI18n ? root.SS_StoryI18n.VOICE_LANGS : [{ code: 'en', label: 'English' }, { code: 'ur', label: 'اردو' }, { code: 'hi', label: 'हिन्दी' }, { code: 'ar', label: 'عربي' }]).map(function (v) {
        return '<button class="chip' + ((s.narrLang || 'en') === v.code ? ' on' : '') + '" data-act="set-narr-lang" data-arg="' + v.code + '">' + esc(v.label) + '</button>';
      }).join('') + '</div><p class="muted-note">' + esc(t('player.voiceLangHint')) + '</p></section>';

    html += '<section><h3>' + esc(t('set.narration')) + '</h3>' +
      '<label class="tog"><input type="checkbox" data-setting="narration"' + (s.narration !== false ? ' checked' : '') + '/><span>' + esc(t('player.listen')) + '</span></label>' +
      '<label class="tog"><input type="checkbox" data-setting="readAlong"' + (s.readAlong !== false ? ' checked' : '') + '/><span>' + esc(t('set.readalong')) + '</span></label>' +
      '<div class="row"><label class="sld">' + esc(t('set.rate')) + '<input type="range" min="0.7" max="1.4" step="0.1" value="' + (s.rate || 1) + '" data-setting="rate"/></label></div>' +
      (voices.length ? '<div class="row"><select data-setting="voice"><option value="">' + esc(t('set.defaultVoice')) + '</option>' + voices.map(function (v) {
        return '<option value="' + esc(v.voiceURI) + '"' + (s.voice === v.voiceURI ? ' selected' : '') + '>' + esc(v.name + ' · ' + v.lang) + '</option>';
      }).join('') + '</select></div>' : '<p class="muted-note">This browser reported no voices. The app still works: it highlights words on a timer instead.</p>') +
      '</section>';

    var np = Sy.notifications.permission();
    html += '<section><h3>' + esc(t('set.notify')) + '</h3>' +
      '<label class="tog"><input type="checkbox" data-setting="notify"' + (s.notify ? ' checked' : '') + '/><span>' + esc(t('set.notifyOn')) + '</span></label>' +
      '<div class="row"><input type="time" value="' + esc(s.notifyDay || '07:30') + '" data-setting="notifyDay"/><button class="btn tiny ghost" data-act="notify-test">Test</button></div>' +
      '<p class="muted-note">' + esc(np === 'unsupported' ? 'This browser has no notification support; the daily verse card still appears in the app.' : 'Permission: ' + np) + ' · once a day, never more.</p></section>';

    html += '<section><h3>' + esc(t('set.offline')) + '</h3>' +
      '<button class="btn ghost" data-act="offline-all">' + esc(t('set.offlineOn')) + ' (' + L.pathUnits(units(), (prof() || { tier: 'M' }).tier).length + ')</button>' +
      '<p class="muted-note">' + esc(Sy.online() ? 'Online' : t('sync.now')) + ' · ' + esc(Sy.pending() ? t('sync.pend', { n: Sy.pending() }) : t('sync.none')) + '</p></section>';

    html += '<section><h3>' + esc(t('set.backup')) + '</h3>' +
      '<p class="muted-note">' + esc(t('set.backupHint')) + '</p>' +
      '<div class="row wrap">' +
      '<button class="btn ghost" data-act="export">' + esc(t('parent.export')) + '</button>' +
      '<button class="btn ghost" data-act="import">' + esc(t('parent.import')) + '</button>' +
      '<button class="btn ghost" data-act="prof-save-now">' + esc(t('set.saveProfile')) + '</button>' +
      '</div></section>';

    html += '<section><h3>' + esc(t('safe.title')) + '</h3><p class="muted-note">' + esc(t('safe.body')) + '</p></section>';
    html += '<section><h3>' + esc(t('set.about')) + '</h3><p>' + esc(t('set.aboutText')) + '</p>' +
      '<a class="pod-link" href="' + esc(M.BRAND.parentUrl) + '" target="_blank" rel="noopener noreferrer">' + esc(t('set.visited')) + ' ↗</a></section>';
    html += '<section><button class="btn ghost dangerish" data-act="reset-profile">' + esc(t('set.reset')) + '</button></section>';
    return html;
  }


  A['prof-age'] = function (a) {
    var age = parseInt(a, 10);
    // Only highlight until Save — keep draft on the inputs via live update
    St.setAge(age, { retier: false });
    paint();
  };
  A['prof-tier'] = function (k) {
    St.setTier(k);
    toast(t('parent.level'));
    paint();
  };
  A['prof-retier'] = function () {
    var p = prof(); if (!p) return;
    St.setAge(p.age, { retier: true, lock: false });
    // unlock auto tier
    p = prof(); if (p) { p.tierLocked = false; St.save(); }
    toast(t('set.levelAuto'));
    paint();
  };
  A['prof-comp'] = function (k) {
    St.setCompanionType(k);
    paint();
  };
  A['prof-save'] = function () {
    var p = prof(); if (!p) return;
    var nameEl = document.getElementById('set-name');
    var compEl = document.getElementById('set-comp-name');
    var name = nameEl ? nameEl.value : p.name;
    var cname = compEl ? compEl.value : (p.companion && p.companion.name);
    St.updateProfile({
      name: name,
      age: p.age,
      tier: p.tier,
      companionType: p.companion && p.companion.type,
      companionName: cname
    });
    var res = St.saveNow ? St.saveNow() : { ok: St.save(), persistent: St.persistent };
    if (res.ok) toast(t('set.saved'));
    else toast(t('set.saveFailed'));
    paint();
  };
  A['prof-save-now'] = function () {
    var res = St.saveNow ? St.saveNow() : { ok: St.save(), persistent: St.persistent };
    toast(res.ok ? t('set.saved') : t('set.saveFailed'));
    paint();
  };

  A['set-lang'] = function (code) {
    St.setSetting('lang', code); paint();
  };
  A['notify-ask'] = function () { Sy.notifications.ask(function (p) { toast('🔔 ' + p); paint(); }); };
  A['notify-test'] = function () {
    var v = M.DAILY_VERSES[M.dailyVerseIndex(L.isoDay(new Date()))];
    var ok = Sy.notifications.show(v.ref, v.text);
    if (!ok) { Sy.notifications.ask(function () { toast(t('got.it') + ': ' + v.ref); }); } else toast('🔔');
  };
  A['offline-all'] = function () {
    var pool = L.pathUnits(units(), prof().tier);
    pool.forEach(function (u) { St.setOffline(u.id, true); });
    toast(t('set.offlineOn') + ' · ' + pool.length);
    paint();
  };
  A['reset-profile'] = function () {
    if (!window.confirm(t('set.reset') + '?')) return;
    St.removeProfile(prof().id); App.unitState = null; go2(prof() ? 'home' : 'onboard');
  };

  /* ============================ boot glue ============================ */
  function paint() { App.rerender(); }
  function go2(n, a) { App.go(n, a); }
  Object.keys(A).forEach(function (k) { App.registerAction(k, A[k]); });
  App.registerView('companion', companionView);
  App.registerView('garden', gardenView);
  App.registerView('pray', prayView);
  App.registerView('verses', versesView);
  App.registerView('leader', leaderView);
  App.registerView('groups', groupsView);
  App.registerView('parent', parentView);
  App.registerView('print', function (arg) { return printView(arg); });
  App.registerView('settings', settingsView);

  // extra plumbing the app needs
  if (!root.SS_App_hooks) {
    document.addEventListener('change', function (e) {
      var n = e.target;
      if (n.matches && n.matches('#pu')) { st.printUnit = n.value; paint(); }
      if (n.matches && n.matches('[data-act="print-answers"]')) { st.printAnswers = n.checked; paint(); }
      if (n.matches && n.matches('[data-org]')) { st.orgForm[n.getAttribute('data-org')] = n.value; }
      if (n.matches && n.matches('[data-setting="notifyDay"]')) { St.setSetting('notifyDay', n.value); }
    });
    root.SS_App_hooks = 1;
  }
  root.SS_App2 = { st: st, printDoc: printDoc };
})(typeof window !== 'undefined' ? window : globalThis);
