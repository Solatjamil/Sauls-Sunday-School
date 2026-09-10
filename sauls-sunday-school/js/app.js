/* =====================================================================
   App core — boot, hash router, onboarding, home, path, library,
   story player and the quiz engine.
   UI principle (spec §13): child-facing screens are warm, big, sparse
   and never punitive. No red X, no timers, no shame copy, and progress
   is always phrased as distance travelled, not distance left.
   ===================================================================== */
(function (root) {
  'use strict';

  var L, I, St, Art, Sp, Sy, M, U = null, views = {}, actions = {};

  var App = {
    route: { name: 'home', arg: null, arg2: null },
    startedAt: 0,
    unitState: null,
    views: views,
    actions: actions
  };

  /* ---------- helpers ---------- */
  function esc(s) { return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
  function t(key, vars) { return I.t(key, vars); }
  function el(html) { var d = document.createElement('div'); d.innerHTML = String(html).trim(); return d.firstElementChild; }
  function units() {
    if (U) return U;
    var all = [];
    ['SS_UNITS_1', 'SS_UNITS_2', 'SS_UNITS_3', 'SS_UNITS_4', 'SS_UNITS_5', 'SS_UNITS_6'].forEach(function (k) {
      if (root[k]) all = all.concat(root[k]);
    });
    // catalogue number + derived depth
    var order = { L: 0, M: 1, H: 2 };
    all.sort(function (a, b) { return (order[a.tier] - order[b.tier]) || (a.path - b.path); });
    all.forEach(function (u, i) { u.n = i + 1; u.total = all.length; });
    all.sort(function (a, b) { return a.when - b.when || a.n - b.n; });
    var byWhen = all.slice();
    all.forEach(function (u) { u.timelineIndex = byWhen.indexOf(u) + 1; });
    U = all;
    return U;
  }
  function unitById(id) { return L.byId(units(), id); }
  function prof() { return St.profile(); }
  function skin() { var p = prof(); return p ? L.TIERS[p.tier].skin : 'mid'; }
  function tier() { var p = prof(); return p ? p.tier : 'M'; }
  function visibleUnits(tierId) { return units().filter(function (u) { return L.canChildSee(u, tierId || tier()); }); }

  function trackName(id) { return (M.TRACKS[id] && M.TRACKS[id].name) || id; }
  function eraName(id) { var e = M.ERAS.filter(function (x) { return x.id === id; })[0]; return e ? e.name : id; }

  /* ============================================================
     RENDER
     ============================================================ */
  function shell(content, opts) {
    opts = opts || {};
    var p = prof();
    var lp = p ? L.levelProgress(p.xp) : null;
    var comp = p ? L.companionInfo(p.companion.type, p.xp) : null;
    var head = '';
    if (!opts.bare) {
      head = '<header class="topbar" data-skin="' + skin() + '">' +
        '<button class="logo-btn" data-act="go-home" aria-label="' + t('nav.back') + '">' + Art.logo(skin()) + '</button>' +
        '<div class="top-mid"><div class="top-name">' + esc(p ? p.name : t('app.name')) + '</div>' +
        '<div class="top-sub">' + (lp ? t('home.level', { n: lp.level, title: lp.title }) : t('app.tagline')) + '</div></div>' +
        '<div class="top-right">' +
        (lp ? '<div class="ring-wrap" title="' + esc(t('comp.toNext', { n: lp.toNext })) + '">' + Art.ring(lp.pct, lp.level) + '</div>' : '') +
        (p ? '<button class="avatar-btn" data-act="go" data-arg="companion" aria-label="' + t('comp.title') + '">' + Art.companion(p.companion.type, comp.stage, { skin: skin(), name: p.companion.name }) + '</button>' : '') +
        (p && p.streak && p.streak.current ? '<span class="chip streak-chip" title="' + esc(t('home.streak', { n: p.streak.current })) + '"><b>' + p.streak.current + '</b> <svg viewBox="0 0 24 24" class="flame"><path d="M12 2c2 5-3 6-1 10 1 2 4 1 4-2 3 3 2 9-3 11-6 2-11-3-9-9 1-4 5-5 6-11z" fill="#f28482"/></svg></span>' : '') +
        '</div></header>';
    }
    var nav = opts.bare ? '' : bottomNav();
    return '<div class="app" data-skin="' + skin() + '" data-tier="' + tier() + '">' + head +
      '<main id="screen" class="screen">' + content + '</main>' + nav + '</div>';
  }

  function bottomNav() {
    var cur = App.route.name;
    function item(name, icon, label) {
      var on = cur === name || (name === 'home' && cur === 'unit') || (name === 'play' && ['garden', 'companion', 'verses'].indexOf(cur) !== -1) || (name === 'pray' && cur === 'pray') || (name === 'more' && ['leader', 'groups', 'parent', 'settings', 'print', 'library'].indexOf(cur) !== -1);
      return '<button class="nav-item' + (on ? ' on' : '') + '" data-act="go" data-arg="' + name + '">' +
        '<span class="nav-ico">' + icon + '</span><span class="nav-lbl">' + esc(label) + '</span></button>';
    }
    return '<nav class="botnav">' +
      item('home', ico('home'), t('nav.home')) +
      item('path', ico('path'), t('nav.path')) +
      item('library', ico('book'), t('nav.library')) +
      item('play', ico('star'), t('nav.play')) +
      item('pray', ico('pray'), t('nav.pray')) +
      item('more', ico('dots'), t('nav.more')) +
      '</nav>';
  }
  function ico(name) {
    var d = {
      home: 'M4 12 L12 4 L20 12 M7 11 V20 H17 V11',
      path: 'M5 20 C5 12 19 14 19 6 M5 20 h14',
      book: 'M5 4 h6 v16 H5 z M13 4 h6 v16 h-6 z',
      star: 'M12 3 l2.6 5.6 L21 9.4 l-4.6 4.2 L17.6 20 L12 17 L6.4 20 l1.2 -6.4 L3 9.4 l6.4 -.8 z',
      pray: 'M12 20 c-4 -2 -6 -6 -6 -10 c0 -3 2 -4 3 -1 l1 4 M12 20 c4 -2 6 -6 6 -10 c0 -3 -2 -4 -3 -1 l-1 4',
      dots: 'M6 12 h.01 M12 12 h.01 M18 12 h.01',
      back: 'M15 5 L8 12 L15 19',
      play: 'M8 5 L19 12 L8 19 z',
      pause: 'M9 5 v14 M15 5 v14',
      stop: 'M7 7 h10 v10 H7 z',
      next: 'M9 5 L16 12 L9 19',
      check: 'M5 13 l4 4 L19 7',
      print: 'M7 9 V4 h10 v5 M7 15 h10 v5 H7 z M5 9 h14 v6 H5 z',
      plus: 'M12 5 v14 M5 12 h14',
      mic: 'M12 4 a3 3 0 0 1 3 3 v4 a3 3 0 0 1 -6 0 V7 a3 3 0 0 1 3 -3 z M6 12 a6 6 0 0 0 12 0 M12 18 v3'
    }[name] || 'M12 12 h0';
    return '<svg viewBox="0 0 24 24" class="ico" aria-hidden="true"><path d="' + d + '" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  }

  function paint() {
    var f = views[App.route.name] || views.home;
    var html = f(App.route.arg, App.route.arg2) || '';
    var screen = document.getElementById('root');
    screen.innerHTML = shell(html, { bare: App.route.name === 'onboard' && !prof() });
    document.body.setAttribute('data-skin', skin());
    document.body.setAttribute('data-tier', tier());   // css/app.css sizes the reading text off this
    document.body.setAttribute('data-route', App.route.name);
    if (App.afterPaint) { var cb = App.afterPaint; App.afterPaint = null; cb(); }
    if (typeof requestAnimationFrame === 'function') requestAnimationFrame(function () {
      var f2 = document.querySelector('[data-focus]'); if (f2) { try { f2.focus(); } catch (e) { } }
    });
  }
  App.rerender = paint;

  function go(name, arg, arg2) {
    App.route = { name: name, arg: arg || null, arg2: arg2 || null };
    var hash = '#/' + name + (arg ? '/' + arg : '') + (arg2 ? '/' + arg2 : '');
    if (root.location.hash !== hash) { try { root.location.hash = hash; } catch (e) { } }
    paint();
    try { window.scrollTo(0, 0); } catch (e) { }
  }
  App.go = go;
  App.el = el; App.esc = esc; App.t = t; App.units = units; App.unitById = unitById;
  App.ico = ico; App.art = function () { return Art; };
  App.skin = skin; App.tier = tier;

  function parseHash() {
    var h = String(root.location.hash || '').replace(/^#\/?/, '');
    var parts = h.split('/').filter(Boolean);
    var name = parts[0] || (prof() ? 'home' : 'onboard');
    if (!views[name]) name = prof() ? 'home' : 'onboard';
    return { name: name, arg: parts[1] || null, arg2: parts[2] || null };
  }
  function syncFromHash() {
    var r = parseHash();
    App.route = r; paint();
  }

  /* ============================================================
     ONBOARDING  (name + age → placement quiz → level → companion)
     ============================================================ */
  var ob = null;
  function onboardView() {
    if (!ob) ob = { step: 0, name: '', age: 6, answers: {}, tier: null, compType: 'lamb', compName: '' };
    var steps = ['welcome', 'name', 'age', 'quiz', 'level', 'companion', 'namepet', 'done'];
    var step = steps[ob.step];
    var dots = '<div class="ob-dots">' + steps.map(function (s, i) { return '<span class="dot' + (i === ob.step ? ' on' : '') + (i < ob.step ? ' past' : '') + '"></span>'; }).join('') + '</div>';
    var body = '';

    if (step === 'welcome') {
      body = '<div class="ob-hero">' + Art.logo('young') +
        '<h1>' + esc(t('onboard.welcome')) + '</h1><p>' + esc(t('onboard.welcomeSub')) + '</p>' +
        '<button class="btn big primary" data-act="ob-next" data-focus>' + esc(t('common.yes')) + ' →</button>' +
        brandCard() + '</div>';
    }
    if (step === 'name') {
      body = '<h1 class="ob-q">' + esc(t('onboard.name')) + '</h1><p class="ob-hint">' + esc(t('onboard.nameHint')) + '</p>' +
        '<input class="big-input" data-ob="name" value="' + esc(ob.name) + '" maxlength="20" autocomplete="off" placeholder="' + esc(t('onboard.name')) + '" data-focus />';
    }
    if (step === 'age') {
      var chips = '';
      for (var a = 3; a <= 12; a++) chips += '<button class="age-chip' + (ob.age === a ? ' on' : '') + '" data-act="ob-age" data-arg="' + a + '"><b>' + a + '</b></button>';
      body = '<h1 class="ob-q">' + esc(t('onboard.age')) + '</h1><div class="age-grid">' + chips + '</div>' +
        '<p class="ob-hint">' + esc(t('onboard.ageHint')) + '</p>' +
        '<p class="tier-note">' + esc(t('onboard.tier' + L.tierForAge(ob.age)) ) + ' · ' + esc(t('lib.' + (L.tierForAge(ob.age) === 'L' ? 'story' : L.tierForAge(ob.age) === 'M' ? 'lesson' : 'game'))) + '</p>';
    }
    if (step === 'quiz') {
      var i = ob.quizIndex || 0;
      var q = L.PLACEMENT[i];
      if (!q) { ob.step++; return onboardView(); }
      body = '<h1 class="ob-q">' + esc(t('onboard.quiz')) + '</h1><p class="ob-hint">' + esc(t('onboard.quizIntro')) + '</p>' +
        '<div class="pq-count">' + (i + 1) + ' / ' + L.PLACEMENT.length + '</div>' +
        '<p class="pq-text">' + esc(q.q) + '</p>' +
        '<div class="pq-opts">' + q.a.map(function (opt, idx) {
          return '<button class="pq-opt' + (ob.answers[i] === idx ? ' on' : '') + '" data-act="ob-answer" data-arg="' + idx + '">' + esc(opt) + '</button>';
        }).join('') + '</div>' +
        '<div class="row">' +
        (i > 0 ? '<button class="btn ghost" data-act="ob-quiz-back">← ' + esc(t('common.back')) + '</button>' : '') +
        '<button class="btn primary" data-act="ob-quiz-next"' + (ob.answers[i] == null ? ' disabled' : '') + '>' + esc(i === L.PLACEMENT.length - 1 ? t('common.done') : t('player.next')) + '</button>' +
        '<button class="btn linkbtn" data-act="ob-skip-quiz">' + esc(t('onboard.quizSkip')) + '</button></div>';
    }
    if (step === 'level') {
      var sc = L.scorePlacement(ob.answers);
      var suggested = ob.tier || sc.suggested;
      body = '<h1 class="ob-q">' + esc(t('onboard.suggested')) + '</h1>' +
        '<div class="tier-cards">' + ['L', 'M', 'H'].map(function (k) {
          var T = L.TIERS[k];
          return '<button class="tier-card' + (suggested === k ? ' on' : '') + (k === 'L' ? ' rec' : '') + '" data-act="ob-tier" data-arg="' + k + '">' +
            Art.motif(k === 'L' ? 'lamb' : k === 'M' ? 'tablet' : 'scroll', { disk: false, scale: 1.1 }) +
            '<b>' + esc(t('onboard.tier' + k)) + '</b><span>' + esc(T.blurb || '') + '</span>' +
            (suggested === k ? '<em class="rec-tag">✓</em>' : '') + '</button>';
        }).join('') + '</div>' +
        '<p class="ob-hint">' + esc(t('onboard.changeLevel')) + ' · ' + esc(t('parent.levelHelp')) + '</p>';
    }
    if (step === 'companion') {
      body = '<h1 class="ob-q">' + esc(t('onboard.companion')) + '</h1><div class="comp-grid">' +
        Object.keys(L.COMPANIONS).map(function (k) {
          return '<button class="comp-card' + (ob.compType === k ? ' on' : '') + '" data-act="ob-comp" data-arg="' + k + '">' +
            Art.companion(k, 0, { skin: L.TIERS[ob.tier || 'L'].skin, scene: false }) + '<b>' + esc(L.COMPANIONS[k].name) + '</b></button>';
        }).join('') + '</div>';
    }
    if (step === 'namepet') {
      var guess = petGuess(ob.compType);
      // the field is pre-filled, so the pre-fill has to be the value — otherwise
      // Next looks tappable and does nothing until the child types
      if (!ob.compName) ob.compName = guess;
      body = '<div class="pet-preview">' + Art.companion(ob.compType, 0, { skin: 'young' }) + '</div>' +
        '<h1 class="ob-q">' + esc(t('onboard.companionName')) + '</h1>' +
        '<input class="big-input" data-ob="compName" value="' + esc(ob.compName || guess) + '" maxlength="18" data-focus />';
    }
    if (step === 'done') {
      body = '<div class="ob-hero">' + Art.companion(ob.compType, 0, { skin: 'young' }) +
        '<h1>' + esc(t('onboard.hello', { name: ob.name || 'Friend' })) + '</h1>' +
        '<p>' + esc(t('home.level', { n: 1, title: L.levelTitle(1) })) + '</p>' +
        '<button class="btn big primary" data-act="ob-finish" data-focus>' + esc(t('onboard.start')) + '</button>' +
        (St.persistent ? '' : '<p class="muted-note ob-note">' + esc(t('sync.tabOnly')) + '</p>') + '</div>';
    }

    var nextDisabled = (step === 'name' && !ob.name) || (step === 'namepet' && !ob.compName);
    return '<div class="onboard" data-skin="young">' + dots + '<div class="ob-body">' + body + '</div>' +
      (['welcome', 'quiz', 'done'].indexOf(step) === -1
        ? '<div class="ob-foot">' + (ob.step > 0 ? '<button class="btn ghost" data-act="ob-back">←</button>' : '') +
        '<button class="btn primary big"' + (nextDisabled ? ' disabled' : '') + ' data-act="ob-next">' + esc(t('player.next')) + ' →</button></div>' : '') +
      '</div>';
  }

  actions['ob-next'] = function () {
    var step = ob.step;
    if (step === 0) { ob.step = 1; return paint(); }
    if (step === 1) { if (!ob.name) return; ob.step = 2; return paint(); }
    if (step === 2) { ob.tier = L.tierForAge(ob.age); ob.quizIndex = 0; ob.step = 3; return paint(); }
    if (step === 3) { return paint(); }
    if (step === 4) { ob.step = 5; return paint(); }
    if (step === 5) { ob.step = 6; return paint(); }
    if (step === 6) { ob.step = 7; return paint(); }
  };
  actions['ob-back'] = function () { if (ob.step > 0) { ob.step--; paint(); } };
  actions['ob-age'] = function (a) { ob.age = parseInt(a, 10) || 6; paint(); };
  actions['ob-answer'] = function (idx) { ob.answers[ob.quizIndex || 0] = parseInt(idx, 10); paint(); };
  actions['ob-quiz-next'] = function () {
    var i = ob.quizIndex || 0;
    if (i >= L.PLACEMENT.length - 1) {
      var sc = L.scorePlacement(ob.answers);
      ob.tier = sc.suggested || L.tierForAge(ob.age);
      ob.step = 4; ob.skipQuiz = true;
    } else ob.quizIndex = i + 1;
    paint();
  };
  actions['ob-quiz-back'] = function () { ob.quizIndex = Math.max(0, (ob.quizIndex || 0) - 1); paint(); };
  actions['ob-skip-quiz'] = function () { ob.tier = L.tierForAge(ob.age); ob.step = 4; paint(); };
  actions['ob-tier'] = function (k) { ob.tier = k; paint(); };
  function petGuess(type) {
    return { lamb: 'Pip', dove: 'Shilo', donkey: 'Colt', hen: 'Nula', ewe: 'Mika', camel: 'Rami', shepherd: 'Obed', lion: 'Asa' }[type] || 'Pip';
  }
  actions['ob-comp'] = function (k) {
    ob.compType = k; ob.step = 6;
    if (!ob.compName) ob.compName = petGuess(k);
    paint();
  };
  actions['ob-finish'] = function () {
    St.createProfile({ name: ob.name, age: ob.age, tier: ob.tier, companionType: ob.compType, companionName: ob.compName });
    St.root.device.seenIntro = true; St.save();
    ob = null; Sp.lang = I.LANGS.filter(function (x) { return x.code === I.lang; })[0] ? I.lang : 'en';
    Sp.init();
    go('home');
    toast(t('home.dailyVerse') + ': ' + M.DAILY_VERSES[M.dailyVerseIndex(L.isoDay(new Date()))].ref);
  };

  /* ============================================================
     HOME — three next steps, nothing else
     ============================================================ */
  function homeView() {
    var p = prof(); if (!p) return onboardView();
    var ns = L.nextSteps(units(), p);
    var prog = L.progressOf(units(), p.tier, p.completed);
    var comp = L.companionInfo(p.companion.type, p.xp);
    var verse = M.DAILY_VERSES[M.dailyVerseIndex(L.isoDay(new Date()))];
    var html = '<div class="hero">' +
      '<div class="hero-comp">' + Art.companion(p.companion.type, comp.stage, { skin: skin(), name: p.companion.name }) + '</div>' +
      '<div class="hero-txt"><div class="hi">' + esc(t('home.hi', { name: p.name })) + '</div>' +
      '<div class="hi-sub">' + esc(L.framingLevel(p.xp).line) + ' · ' + esc(L.framingStreak(p.streak).line) + '</div></div></div>';

    html += '<div class="next-steps">';
    ns.steps.forEach(function (s, i) {
      if (s.kind === 'continue' && s.unitId) {
        var u = unitById(s.unitId);
        html += '<button class="step big-step" data-act="open-unit" data-arg="' + u.id + '">' +
          '<span class="step-art">' + Art.motif(u.badge && u.badge.art || 'scroll', { skin: skin() }) + '</span>' +
          '<span class="step-txt"><em>' + esc(t('home.continue')) + '</em><b>' + esc(u.title) + '</b><i>' + esc(modeLabel(u)) + '</i></span>' +
          '<span class="step-go">' + ico('next') + '</span></button>';
        // the deeper reading beside the shallower one, for the oldest tier only
        if (tier() === 'H' && M.TRACKS[u.track] && M.TRACKS[u.track].volume) {
          html += '<a class="pod-link" href="' + esc(M.BRAND.parentUrl) + '" target="_blank" rel="noopener noreferrer">' +
            esc(M.BRAND.volumeHint.replace('{n}', M.TRACKS[u.track].volume)) + ' ↗</a>';
        }
      } else if (s.kind === 'verse') {
        html += '<button class="step" data-act="go" data-arg="verses"><span class="step-ico">📜</span><span class="step-txt"><em>' + esc(t('home.verse', { n: s.count })) + '</em></span></button>';
      } else if (s.kind === 'library') {
        html += '<button class="step" data-act="go" data-arg="library"><span class="step-ico">📚</span><span class="step-txt"><em>' + esc(t('home.library')) + '</em></span></button>';
      } else if (s.kind === 'companion') {
        html += '<button class="step" data-act="go" data-arg="companion"><span class="step-ico">🐣</span><span class="step-txt"><em>' + esc(t('home.play', { companion: p.companion.name })) + '</em></span></button>';
      }
    });
    html += '</div>';

    html += '<div class="strip">' +
      '<button class="strip-btn" data-act="go" data-arg="garden"><b>' + prog.done + '</b><span>' + esc(t('parent.units')) + '</span></button>' +
      '<button class="strip-btn" data-act="go" data-arg="garden"><b>' + p.badges.length + '</b><span>' + esc(t('parent.badges')) + '</span></button>' +
      '<button class="strip-btn" data-act="go" data-arg="pray"><b>' + (p.prayers ? p.prayers.length : 0) + '</b><span>' + esc(t('pray.title')) + '</span></button></div>';

    html += '<button class="verse-card" data-act="go" data-arg="verses">' +
      '<span class="vc-k">' + esc(t('home.dailyVerse')) + '</span>' +
      '<span class="vc-text">“' + esc(verse.text) + '”</span><span class="vc-ref">' + esc(verse.ref) + '</span></button>';

    html += brandCard();
    return html;
  }
  function modeLabel(u) { return u.mode === 'story' ? t('lib.story') : u.mode === 'lesson' ? t('lib.lesson') : t('lib.game'); }
  function brandCard() {
    var b = M.BRAND;
    return '<div class="brand-card"><div class="bc-top">' + Art.logo(skin()) +
      '<div><b>' + esc(b.parent) + '</b><span>' + esc(b.taglineShort) + '</span></div></div>' +
      '<div class="bc-links">' + b.links.map(function (l) {
        return '<a class="bc-link" href="' + esc(l.url) + '" target="_blank" rel="noopener noreferrer">' + esc(l.label) + ' ↗</a>';
      }).join('') + '</div></div>';
  }

  /* ============================================================
     PATH
     ============================================================ */
  function pathView() {
    var p = prof(); if (!p) return onboardView();
    var pool = L.pathUnits(units(), p.tier);
    var prog = L.progressOf(units(), p.tier, p.completed);
    var html = '<div class="page-head"><h1>' + esc(t('path.title')) + '</h1>' +
      '<p>' + esc(t('path.progress', { done: prog.done, total: prog.total })) + '</p>' +
      '<div class="bar"><span style="width:' + prog.pct + '%"></span></div>' +
      '<p class="framing">' + esc(L.framingPath(prog.pct)) + '</p></div>';

    html += '<div class="path-list">';
    pool.forEach(function (u, i) {
      var done = L.uDone(p.completed, u.id);
      var locked = false;
      if (i > 0 && !L.uDone(p.completed, pool[i - 1].id) && !done) locked = i > 0 && !done;   // soft lock: only a hint, still tappable
      html += '<button class="path-item' + (done ? ' done' : '') + (i === firstUndone(pool, p) ? ' now' : '') + '" data-act="open-unit" data-arg="' + u.id + '">' +
        '<span class="pi-num">' + (done ? '✓' : (i + 1)) + '</span>' +
        '<span class="pi-art">' + Art.motif(u.badge && u.badge.art || 'scroll', { skin: skin() }) + '</span>' +
        '<span class="pi-txt"><b>' + esc(u.title) + '</b><i>' + esc(u.summary) + '</i>' +
        '<em>' + esc(modeLabel(u)) + ' · ' + esc(trackName(u.track)) + ' · ' + u.xp + ' XP</em></span>' +
        (done ? '<span class="pi-badge">' + esc(u.badge.name) + '</span>' : '') +
        '</button>';
    });
    html += '</div>';
    return html;
  }
  function firstUndone(pool, p) {
    for (var i = 0; i < pool.length; i++) if (!L.uDone(p.completed, pool[i].id)) return i;
    return -1;
  }

  /* ============================================================
     LIBRARY — free-roam, three overlapping organisations
     ============================================================ */
  var libState = { mode: 'all', track: null, era: null, testament: null, q: '' };
  function libraryView() {
    var p = prof(); if (!p) return onboardView();
    var html = '<div class="page-head"><h1>' + esc(t('lib.title')) + '</h1>' +
      '<input class="search" data-lib="q" value="' + esc(libState.q) + '" placeholder="' + esc(t('lib.search')) + '"/></div>';
    html += '<div class="tabs">' + [
      ['all', t('lib.all')], ['timeline', t('lib.byTimeline')], ['tracks', t('lib.byTracks')], ['testament', t('lib.byTestament')]
    ].map(function (x) { return '<button class="tab' + (libState.mode === x[0] ? ' on' : '') + '" data-act="lib-mode" data-arg="' + x[0] + '">' + esc(x[1]) + '</button>'; }).join('') + '</div>';

    var filters = { q: libState.q, track: libState.track, era: libState.era, testament: libState.testament };
    if (libState.mode === 'all') {
      html += '<p class="muted-note">' + esc(t('lib.matureHidden')) + '</p>';
      html += unitList(L.libraryUnits(units(), p.tier, filters), p);
    } else if (libState.mode === 'timeline') {
      var grouped = L.groupBy(L.libraryUnits(units(), p.tier, { q: libState.q }), function (u) { return u.era; });
      M.ERAS.forEach(function (era) {
        var list = grouped[era.id] || [];
        if (!list.length) return;
        html += '<div class="era"><div class="era-head"><b>' + esc(era.name) + '</b><span>' + esc(era.span) + '</span></div>' + unitList(list, p) + '</div>';
      });
    } else if (libState.mode === 'tracks') {
      html += '<div class="track-grid">' + Object.keys(M.TRACKS).map(function (k) {
        var tr = M.TRACKS[k];
        var list = L.libraryUnits(units(), p.tier, { track: k, q: libState.q });
        var done = list.filter(function (u) { return L.uDone(p.completed, u.id); }).length;
        return '<button class="track-card" data-act="lib-track" data-arg="' + k + '" style="--tc:' + tr.color + '">' +
          Art.motif(tr.art, { skin: skin(), disk: false, scale: 1 }) +
          '<b>' + esc(tr.name) + '</b><span>' + esc(tr.blurb) + '</span>' +
          '<em>' + done + ' / ' + list.length + '</em></button>';
      }).join('') + '</div>';
      if (libState.track) {
        var list2 = L.libraryUnits(units(), p.tier, { track: libState.track, q: libState.q });
        html += '<div class="era"><div class="era-head"><b>' + esc(M.TRACKS[libState.track].name) + '</b><button class="btn tiny ghost" data-act="lib-track" data-arg="">×</button></div>' + unitList(list2, p) + '</div>';
      }
    } else if (libState.mode === 'testament') {
      html += '<div class="tabs second">' + [['', t('lib.all')], ['ot', t('lib.old')], ['nt', t('lib.new')]].map(function (x) {
        return '<button class="tab' + ((libState.testament || '') === x[0] ? ' on' : '') + '" data-act="lib-test" data-arg="' + x[0] + '">' + esc(x[1]) + '</button>';
      }).join('') + '</div>';
      var f = { testament: libState.testament, q: libState.q };
      var both = L.libraryUnits(units(), p.tier, f);
      html += '<div class="otnt"><div><h3>' + esc(t('lib.old')) + '</h3>' + unitList(both.filter(function (u) { return u.testament === 'ot'; }), p) + '</div>' +
        '<div><h3>' + esc(t('lib.new')) + '</h3>' + unitList(both.filter(function (u) { return u.testament === 'nt'; }), p) + '</div></div>';
    }
    return html;
  }
  function unitList(list, p) {
    if (!list.length) return '<p class="empty">' + esc(t('lib.empty')) + '</p>';
    return '<div class="unit-grid">' + list.map(function (u) {
      var done = L.uDone(p.completed, u.id);
      return '<button class="u-card' + (done ? ' done' : '') + '" data-act="open-unit" data-arg="' + u.id + '">' +
        '<span class="uc-art">' + Art.motif(u.badge && u.badge.art || 'scroll', { skin: skin() }) + '</span>' +
        '<b>' + esc(u.title) + '</b><i>' + esc(u.summary) + '</i>' +
        '<span class="uc-tags">' + (done ? '<em class="tag ok">✓ ' + esc(t('path.done')) + '</em>' : '') +
        '<em class="tag">' + esc(modeLabel(u)) + '</em>' +
        (u.mature ? '<em class="tag nine">7+</em>' : '') + '</span></button>';
    }).join('') + '</div>';
  }
  actions['lib-mode'] = function (m) { libState.mode = m; if (m !== 'tracks') libState.track = null; paint(); };
  actions['lib-track'] = function (k) { libState.track = k || null; libState.mode = 'tracks'; paint(); };
  actions['lib-test'] = function (k) { libState.testament = k || null; paint(); };

  /* ============================================================
     PLAYER — story/lesson/game, narration + read-along, quiz, prayer, reward
     ============================================================ */
  function playerState(unitId) {
    var p = prof();
    if (!App.unitState || App.unitState.unitId !== unitId) {
      var u = unitById(unitId);
      if (!u) return null;
      if (!L.canChildSee(u, p.tier)) return { blocked: true, unit: u };
      // Every per-question answer set is keyed by question index, so each one
      // starts as an object — an array here breaks sequencing questions.
      App.unitState = {
        unitId: unitId, phase: 'cover', page: 0, t0: Date.now(),
        results: {}, attempts: {}, revealed: {}, sel: {}, quizIndex: 0,
        orderPick: {}, orderPool: {}, matchDone: {}, sortPlaced: {},
        matchSel: null, sortSel: null, started: Date.now()
      };
    }
    return App.unitState;
  }
  // Pages are tier-dependent (3-6 reads one paragraph at a time), but the keys are
  // not: every paragraph carries its index in the story, so a recording made for a
  // 7-9 layout still lands on the right words for a 4-year-old.
  function paraPages(u) {
    var per = tier() === 'L' ? 1 : 2;
    var pages = [];
    for (var i = 0; i < u.story.length; i += per) {
      var page = [];
      for (var j = i; j < Math.min(i + per, u.story.length); j++) page.push({ i: j, t: u.story[j] });
      pages.push(page);
    }
    return pages;
  }
  function unitView(unitId) {
    var st = playerState(unitId);
    if (!st) return '<p class="empty">…</p>';
    if (st.blocked) return '<div class="blocked"><h1>' + esc(t('unit.blockedTitle')) + '</h1><p>' + esc(t('unit.blocked')) + '</p><button class="btn primary" data-act="go" data-arg="path">' + esc(t('nav.path')) + '</button></div>';
    var u = unitById(st.unitId);
    var p = prof();
    var done = L.uDone(p.completed, u.id);
    var pages = paraPages(u);
    var html = '';

    html += '<div class="unit-top"><button class="btn ghost round" data-act="go" data-arg="' + (u.tier === tier() ? 'path' : 'library') + '">←</button>' +
      '<div class="unit-title"><b>' + esc(u.title) + '</b><span>' + esc(modeLabel(u)) + ' · ' + esc(trackName(u.track)) + ' · ' + esc(eraName(u.era)) + '</span></div>' +
      '<button class="btn ghost round" data-act="go" data-arg="print" data-arg2="' + u.id + '">' + ico('print') + '</button></div>';

    if (st.phase === 'cover') {
      html += '<div class="cover">' + Art.motif(u.badge && u.badge.art || 'scroll', { skin: skin(), scale: 1.15 }) +
        '<h1>' + esc(u.title) + '</h1><p class="sum">' + esc(u.summary) + '</p>' +
        (u.scripture && u.scripture[0] ? '<p class="cover-quote">“' + esc(u.scripture[0].text) + '” <span>' + esc(u.scripture[0].ref) + '</span></p>' : '') +
        '<div class="cover-btns"><button class="btn big primary" data-act="unit-start">' + esc(done ? t('player.retake') : t('path.start')) + '</button>' +
        '<button class="btn ghost" data-act="unit-silent">' + esc(t('player.silent')) + '</button></div>' +
        (u.hardNote ? '<div class="hard-note"><b>' + esc(t('player.hardNote')) + '</b><p>' + esc(u.hardNote) + '</p></div>' : '') +
        '</div>';
      return html;
    }

    if (st.phase === 'story') {
      var page = pages[st.page] || [];
      html += '<div class="read-bar"><button class="btn primary pill" data-act="narrate">' + ico('play') + '<span>' + esc(t('player.listen')) + '</span></button>' +
        '<button class="btn ghost pill" data-act="narrate-stop">' + ico('stop') + '</button>' +
        '<label class="tog"><input type="checkbox" data-set="readAlong"' + (St.root.settings.readAlong ? ' checked' : '') + '/><span>' + esc(t('player.readAlong')) + '</span></label>' +
        '<button class="btn ghost pill" data-act="rate-toggle">' + esc(t('player.speed')) + ' ×' + Sp.rate + '</button></div>';
      html += '<div class="pages">' + page.map(function (para) { return paraHTML(para.t, 's' + para.i); }).join('') + '</div>';
      if (u.scripture && u.scripture.length) {
        html += '<div class="scripture"><b>' + esc(t('player.original')) + '</b>' +
          u.scripture.map(function (s) { return '<p>“' + esc(s.text) + '” <span>' + esc(s.ref) + ' (WEB)</span></p>'; }).join('') + '</div>';
      }
      var toTeach = !!(u.teach && u.teach.length && tier() !== 'L');
      html += '<div class="page-nav">' +
        (st.page > 0 ? '<button class="btn ghost" data-act="page-back">← ' + esc(t('common.back')) + '</button>' : '<span></span>') +
        '<span class="page-no">' + (st.page + 1) + ' / ' + pages.length + '</span>' +
        (st.page < pages.length - 1 ? '<button class="btn primary" data-act="page-next">' + esc(t('player.next')) + ' →</button>'
          : '<button class="btn primary" data-act="phase" data-arg="' + (toTeach ? 'teach' : 'quiz') + '">' + esc(t(toTeach ? 'player.teach' : 'quiz.title')) + ' →</button>') +
        '</div>';
      if (toTeach) {
        html += '<button class="btn linkbtn" data-act="phase" data-arg="quiz">' + esc(t('quiz.title')) + ' →</button>';
      }
      App.afterPaint = function () { if (St.root.settings.narration && !st.autoPlayed) { st.autoPlayed = true; narrate(); } };
      return html;
    }

    if (st.phase === 'teach') {
      html += '<div class="teach"><h2>' + esc(t('player.teach')) + '</h2><ul>' + u.teach.map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('') + '</ul></div>' +
        '<div class="page-nav"><button class="btn ghost" data-act="phase" data-arg="story">←</button><button class="btn primary" data-act="phase" data-arg="quiz">' + esc(t('quiz.title')) + ' →</button></div>';
      return html;
    }

    if (st.phase === 'quiz') {
      html += quizHTML(u, st);
      return html;
    }

    if (st.phase === 'prayer') {
      html += '<div class="prayer-end">' + Art.motif('hands', { skin: skin(), scale: 1 }) +
        '<h2>' + esc(t('player.prayer')) + '</h2><p class="pray-text">' + esc(u.prayer || 'Dear God, thank You for today. Amen.') + '</p>' +
        '<div class="row"><button class="btn ghost pill" data-act="pray-unit">' + ico('plus') + esc(t('pray.add')) + '</button></div>' +
        '<button class="btn primary big" data-act="finish-unit">' + esc(t('common.done')) + '</button></div>';
      return html;
    }

    if (st.phase === 'reward') {
      var r = st.reward || { xp: 0 };
      html += '<div class="reward">' +
        '<div class="rw-card">' + Art.motif(u.badge && u.badge.art || 'star', { skin: skin(), scale: 1.2 }) +
        '<h1>' + esc(t('player.done')) + '</h1>' +
        '<div class="rw-xp">' + esc(t('player.xp', { n: r.xp })) + '</div>' +
        (r.newBadge ? '<div class="rw-sticker">' + esc(t('player.sticker', { name: r.newBadge.name })) + '</div>' : '') +
        (r.levelUp ? '<div class="rw-level">★ ' + esc(L.levelTitle(L.levelForXp(prof().xp))) + '</div>' : '') +
        '<p class="rw-score">' + esc(t('quiz.summary', { right: r.score.correct, total: r.score.total })) + '</p>' +
        '<p class="rw-note">' + esc(t('quiz.noScores')) + '</p>' +
        '<div class="rw-btns"><button class="btn primary" data-act="go" data-arg="garden">' + esc(t('badge.tap')) + '</button>' +
        '<button class="btn ghost" data-act="go" data-arg="print" data-arg2="' + u.id + '">' + esc(t('player.print')) + '</button></div>' +
        '</div>';
      var pool = L.pathUnits(units(), tier());
      var idx = pool.map(function (x) { return x.id; }).indexOf(u.id);
      var next = idx > -1 && idx < pool.length - 1 ? pool[idx + 1] : null;
      if (next) html += '<button class="step big-step" data-act="open-unit" data-arg="' + next.id + '"><span class="step-art">' + Art.motif(next.badge.art, { skin: skin() }) + '</span><span class="step-txt"><em>' + esc(t('home.continue')) + '</em><b>' + esc(next.title) + '</b></span><span class="step-go">' + ico('next') + '</span></button>';
      if (tier() === 'H' && M.TRACKS[u.track] && M.TRACKS[u.track].volume) {
        html += '<a class="pod-link" href="' + esc(M.BRAND.parentUrl) + '" target="_blank" rel="noopener noreferrer">' + esc(M.BRAND.volumeHint.replace('{n}', M.TRACKS[u.track].volume)) + ' ↗</a>';
      }
      html += '</div>';
      return html;
    }
    return '';
  }

  function paraHTML(text, key) {
    var words = Sp.tokenize(text);
    return '<p class="para" data-para="' + key + '">' + words.map(function (w, i) {
      return '<span class="w" data-i="' + i + '">' + esc(w.text) + '</span>';
    }).join(' ') + '</p>';
  }

  function narrate() {
    var st = App.unitState; if (!st) return;
    var u = unitById(st.unitId);
    var paras = document.querySelectorAll('.para');
    if (!paras.length) return;
    var idx = 0;
    function speakOne() {
      if (idx >= paras.length) { Sp.stop(); return; }
      var elx = paras[idx];
      var text = Array.prototype.map.call(elx.querySelectorAll('.w'), function (w) { return w.textContent; }).join(' ');
      var url = Sp.hasAudioFor(u, I.lang, elx.getAttribute('data-para'));
      Sp.speakElement(elx, text, {
        lang: I.lang === 'ur' ? 'ur-PK' : 'en-GB', audio: url,
        onDone: function () { idx++; setTimeout(speakOne, 220); }
      });
    }
    speakOne();
  }
  actions['narrate'] = function () { narrate(); };
  actions['narrate-stop'] = function () { Sp.stop(); };
  actions['rate-toggle'] = function () {
    Sp.rate = Sp.rate >= 1.3 ? 0.8 : Math.round((Sp.rate + 0.2) * 10) / 10;
    St.setSetting('rate', Sp.rate); paint();
  };
  actions['unit-start'] = function () { var st = App.unitState; st.phase = 'story'; st.t0 = Date.now(); paint(); };
  actions['unit-silent'] = function () { var st = App.unitState; st.phase = 'story'; St.setSetting('narration', false); Sp.enabled = false; paint(); };
  actions['page-next'] = function () { var st = App.unitState; var u = unitById(st.unitId); st.page++; if (st.page >= paraPages(u).length) { st.page = paraPages(u).length - 1; } Sp.stop(); paint(); };
  actions['page-back'] = function () { var st = App.unitState; st.page = Math.max(0, st.page - 1); Sp.stop(); paint(); };
  actions['phase'] = function (ph) { Sp.stop(); var st = App.unitState; st.phase = ph; paint(); };
  actions['open-unit'] = function (id) { App.unitState = null; go('unit', id); };
  actions['pray-unit'] = function () {
    var st = App.unitState; var u = unitById(st.unitId);
    St.addPrayer((u.prayer || '').slice(0, 80).replace(/^(Dear God|God|Jesus),?\s*/i, '') || u.title);
    toast(t('pray.saved'));
  };
  actions['finish-unit'] = function () {
    var st = App.unitState, u = unitById(st.unitId);
    // score the questions this child was actually shown, in the order they saw them
    var score = L.quizScore(st.items && st.items.length ? st.items : u.quiz, st.results);
    var secs = Math.max(20, Math.round((Date.now() - st.t0) / 1000));
    var res = St.completeUnit(u, score, secs);
    st.reward = { xp: res.xp, levelUp: res.levelUp, newBadge: res.newBadge, score: score };
    st.phase = 'reward';
    Sy.flush();
    paint();
    Sp.speakShort(t('quiz.right'));
  };

  /* ============================================================
     QUIZ ENGINE — mc / tap / match / order / blank / sort
     ============================================================ */
  function quizHTML(u, st) {
    var sel = L.quizItemsForTier(u, tier());
    var items = sel.items;
    st.items = items; st.srcIdx = sel.srcIdx;
    var i = st.quizIndex;
    if (i >= items.length) return quizEndHTML(u, st, items);
    var q = items[i];
    var html = '<div class="quiz"><div class="q-top"><span class="q-count">' + (i + 1) + ' / ' + items.length + '</span>' +
      '<span class="q-kind">' + esc(t('quiz.' + (q.t === 'mc' ? 'tapHere' : q.t === 'tap' ? 'tapHere' : q.t))) + '</span></div>' +
      '<h2 class="q-text">' + esc(q.q) + '</h2>';
    var fb = st.fb && st.fb.i === i ? st.fb : null;

    if (q.t === 'mc' || q.t === 'tap') {
      var chosen = st.sel && st.sel[i];
      html += '<div class="opts ' + (q.t === 'tap' ? 'opts-big' : '') + '">' + q.a.map(function (opt, k) {
        var right = st.results[i] && st.results[i].ok && st.results[i].which === k;
        return '<button class="opt' + (right ? ' ok' : '') + (chosen === k ? ' sel' : '') + '" data-act="q-pick" data-arg="' + k + '">' +
          '<span>' + esc(opt) + '</span>' + (right ? '<span class="opt-yes">✓</span>' : '') + '</button>';
      }).join('') + '</div>';
    }
    if (q.t === 'match') html += matchHTML(q, st, i);
    if (q.t === 'order') html += orderHTML(q, st, i);
    if (q.t === 'sort') html += sortHTML(q, st, i);
    if (q.t === 'blank' || q.t === 'type') html += blankHTML(q, st, i);

    html += '<div class="q-actions">' +
      (q.t === 'match' || q.t === 'order' ? '<button class="btn ghost" data-act="q-reset">' + esc(t('player.retake')) + '</button>' : '') +
      (st.attempts[i] > 1 && !st.revealed[i] ? '<button class="btn ghost" data-act="q-reveal">' + esc(t('quiz.reveal')) + '</button>' : '') +
      '</div>';
    if (fb) html += '<div class="feedback ' + fb.kind + '">' + esc(fb.text) + '</div>';
    html += '<div class="q-foot">' + (i > 0 ? '<button class="btn ghost" data-act="q-prev">←</button>' : '<span></span>') +
      '<button class="btn ' + (st.results[i] && st.results[i].ok ? 'primary' : 'ghost') + '" data-act="q-next">' + esc(i === items.length - 1 ? t('quiz.finish') : t('quiz.next')) + '</button></div></div>';
    return html;
  }
  function matchHTML(q, st, qi) {
    var pairs = q.pairs;
    var left = pairs.map(function (p, i) { return { text: p[0], i: i }; });
    var right = pairs.map(function (p, i) { return { text: p[1], i: i }; });
    // stable shuffle derived from the question text
    right = shuffle(right, L.hashSeed(q.q));
    var doneMap = st.matchDone && st.matchDone[qi] ? st.matchDone[qi] : {};
    var sel = st.matchSel;
    function col(i) { return ['#f2a13b', '#5fb2d4', '#7bbf5a', '#e6a0c8', '#8f7bd6', '#f28482'][i % 6]; }
    var g = '<div class="match-wrap"><div class="match-col">' + left.map(function (x) {
      return '<button class="mtile' + (doneMap[x.i] ? ' linked' : '') + (sel && sel.side === 'l' && sel.i === x.i ? ' sel' : '') + '" style="--lc:' + col(x.i) + '" data-act="q-match" data-arg="l' + x.i + '">' + esc(x.text) + '</button>';
    }).join('') + '</div><div class="match-col">' + right.map(function (x) {
      return '<button class="mtile' + (doneMap[x.i] ? ' linked' : '') + (sel && sel.side === 'r' && sel.i === x.i ? ' sel' : '') + '" style="--lc:' + col(x.i) + '" data-act="q-match" data-arg="r' + x.i + '">' + esc(x.text) + '</button>';
    }).join('') + '</div></div>' +
      '<p class="muted-note">' + esc(t('quiz.match')) + '</p>';
    return g;
  }
  function orderHTML(q, st, qi) {
    var pool = st.orderPool && st.orderPool[qi] ? st.orderPool[qi] : (st.orderPool = st.orderPool || {}, st.orderPool[qi] = shuffle(q.items.map(function (x, i) { return { text: x, i: i }; }), L.hashSeed(q.q + 'o')));
    var picked = st.orderPick && st.orderPick[qi] ? st.orderPick[qi] : (st.orderPick = st.orderPick || {}, st.orderPick[qi] = []);
    var rest = pool.filter(function (x) { return picked.indexOf(x.i) === -1; });
    var g = '<div class="order-picked">' + picked.map(function (i) {
      return '<button class="otile done" data-act="q-unpick" data-arg="' + i + '">' + esc(pool[i].text) + '</button>';
    }).join('') + (picked.length ? '' : '<span class="ph">' + esc(t('quiz.order')) + '</span>') + '</div>' +
      '<div class="order-pool">' + rest.map(function (x) {
        return '<button class="otile" data-act="q-pick-order" data-arg="' + x.i + '">' + esc(x.text) + '</button>';
      }).join('') + '</div>';
    return g;
  }
  function sortHTML(q, st, qi) {
    var placed = st.sortPlaced && st.sortPlaced[qi] ? st.sortPlaced[qi] : (st.sortPlaced = st.sortPlaced || {}, st.sortPlaced[qi] = {});
    var sel = st.sortSel;
    var g = '<div class="sort-buckets">' + q.buckets.map(function (b) {
      var items = q.items.filter(function (it, idx) { return placed[idx] === b.id; });
      return '<div class="bucket" data-act="q-drop" data-arg="' + b.id + '"><b>' + esc(b.name) + '</b><div class="b-items">' +
        (items.length ? items.map(function (it) {
          var realIdx = q.items.indexOf(it);
          var right = placed[realIdx] === it.b;
          return '<span class="sitem' + (right ? ' ok' : ' soft') + '" data-act="q-unsort" data-arg="' + realIdx + '">' + esc(it.text) + '</span>';
        }).join('') : '<span class="ph">···</span>') + '</div></div>';
    }).join('') + '</div><div class="sort-pool">' + q.items.map(function (it, idx) {
      if (placed[idx]) return '';
      return '<button class="sitem pick' + (sel === idx ? ' sel' : '') + '" data-act="q-sortsel" data-arg="' + idx + '">' + esc(it.text) + '</button>';
    }).join('') + '</div>';
    return g;
  }
  function blankHTML(q, st, qi) {
    var v = st.typed && st.typed[qi] != null ? st.typed[qi] : '';
    return '<div class="blank"><p class="blank-q">' + esc(q.q) + '</p>' +
      '<input class="type-in" data-act="q-type" data-arg="' + qi + '" value="' + esc(v) + '" autocomplete="off" autocapitalize="sentences" spellcheck="false" placeholder="?" data-focus/>' +
      (q.hint ? '<p class="hint">' + esc(q.hint) + '</p>' : '') + '</div>';
  }
  function quizEndHTML(u, st, items) {
    var score = L.quizScore(items, st.results);
    var html = '<div class="quiz-end">' + Art.companion(prof().companion.type, L.companionStage(prof().xp + 40), { skin: skin() }) +
      '<h2>' + esc(items.length === score.correct ? t('quiz.allCorrect') : t('player.done')) + '</h2>' +
      '<p class="qe-score">' + esc(t('quiz.summary', { right: score.correct, total: score.total })) + '</p>' +
      '<p class="muted-note">' + esc(t('quiz.noScores')) + '</p>' +
      '<div class="qe-btns"><button class="btn ghost" data-act="q-restart">' + esc(t('player.retake')) + '</button>' +
      '<button class="btn primary big" data-act="phase" data-arg="prayer">' + esc(t('player.prayer')) + ' →</button></div></div>';
    return html;
  }
  function shuffle(arr, seed) {
    var out = arr.slice(), rand = L.rng(seed || 1), i, j, tmp;
    for (i = out.length - 1; i > 0; i--) { j = Math.floor(rand() * (i + 1)); tmp = out[i]; out[i] = out[j]; out[j] = tmp; }
    return out;
  }
  function feedback(st, i, kind, text) { st.fb = { i: i, kind: kind, text: text }; }

  actions['q-pick'] = function (k) {
    var st = App.unitState, i = st.quizIndex, q = st.items[i], kk = parseInt(k, 10);
    var right = kk === q.c;
    st.sel = st.sel || {}; st.sel[i] = kk;
    if (right) {
      st.results[i] = { ok: true, which: kk, attempts: st.attempts[i] || 0 };
      feedback(st, i, 'right', L.pickGentle('right', i));
      Sp.speakShort(t('quiz.right'));
    } else {
      st.attempts[i] = (st.attempts[i] || 0) + 1;
      var tone = L.retryTone(st.attempts[i]);
      if (tone === 'hint') feedback(st, i, 'nudge', t('quiz.hint') + ': ' + (q.hint || 'look at the story again'));
      else if (tone === 'reveal') feedback(st, i, 'nudge', t('quiz.reveal'));
      else feedback(st, i, 'nudge', t('quiz.tryAgain'));
      st.results[i] = { ok: false, which: kk };
    }
    paint();
  };
  actions['q-next'] = function () {
    var st = App.unitState, i = st.quizIndex, q = st.items[i];
    if (!st.results[i] || !st.results[i].ok) {
      if (q.t === 'mc' || q.t === 'tap') { st.attempts[i] = (st.attempts[i] || 0) + 1; feedback(st, i, 'nudge', t(L.retryTone(st.attempts[i]) === 'reveal' ? 'quiz.reveal' : 'quiz.tryAgain')); return paint(); }
      if (q.t === 'match') { st.attempts[i] = (st.attempts[i] || 0) + 1; feedback(st, i, 'nudge', t('quiz.nudge')); return paint(); }
      if (q.t === 'order') { checkOrder(st, i, q); return paint(); }
      if (q.t === 'sort') { checkSort(st, i, q); return paint(); }
      if (q.t === 'blank' || q.t === 'type') { checkBlank(st, i, q); return paint(); }
    }
    st.quizIndex = i + 1; paint();
  };
  actions['q-prev'] = function () { var st = App.unitState; st.quizIndex = Math.max(0, st.quizIndex - 1); paint(); };
  actions['q-restart'] = function () {
    var st = App.unitState;
    st.results = {}; st.attempts = {}; st.matchDone = {}; st.orderPick = {}; st.sortPlaced = {};
    st.orderPool = {}; st.sel = {}; st.revealed = {}; st.matchSel = null; st.sortSel = null; st.fb = null;
    st.quizIndex = 0;
    paint();
  };
  actions['q-reveal'] = function () {
    var st = App.unitState, i = st.quizIndex, q = st.items[i];
    st.revealed[i] = 1;
    st.results[i] = { ok: true, revealed: true };
    if (q.t === 'order') { st.orderPick[i] = q.items.map(function (x, k) { return k; }); }
    if (q.t === 'match') { st.matchDone[i] = {}; q.pairs.forEach(function (x, k) { st.matchDone[i][k] = 1; }); }
    if (q.t === 'sort') { st.sortPlaced[i] = {}; q.items.forEach(function (x, k) { st.sortPlaced[i][k] = x.b; }); }
    if (q.t === 'blank' || q.t === 'type') { st.typed[i] = q.a || (q.accept && q.accept[0]) || ''; }
    feedback(st, i, 'reveal', t('quiz.reveal'));
    paint();
  };
  actions['q-reset'] = function () {
    var st = App.unitState, i = st.quizIndex, q = st.items[i];
    if (q.t === 'match') { st.matchDone[i] = {}; }
    if (q.t === 'order') { st.orderPick[i] = []; }
    if (q.t === 'sort') { st.sortPlaced[i] = {}; }
    paint();
  };
  actions['q-match'] = function (arg) {
    var st = App.unitState, i = st.quizIndex, q = st.items[i];
    var side = arg.charAt(0), idx = parseInt(arg.slice(1), 10);
    var sel = st.matchSel;
    if (!sel || sel.side === side) { st.matchSel = { side: side, i: idx }; return paint(); }
    var ok = sel.i === idx;
    st.matchDone = st.matchDone || {}; st.matchDone[i] = st.matchDone[i] || {};
    if (ok) {
      st.matchDone[i][sel.i] = 1;
      var all = q.pairs.every(function (x, k) { return st.matchDone[i][k]; });
      if (all) { st.results[i] = { ok: true, attempts: st.attempts[i] || 0 }; feedback(st, i, 'right', t('quiz.right')); st.matchSel = null; }
      else feedback(st, i, 'right', '✓');
    } else {
      st.attempts[i] = (st.attempts[i] || 0) + 1;
      feedback(st, i, 'nudge', t(L.retryTone(st.attempts[i]) === 'hint' ? 'quiz.hint' : 'quiz.tryAgain') + (q.hint && L.retryTone(st.attempts[i]) === 'hint' ? ': ' + q.hint : ''));
    }
    st.matchSel = null; paint();
  };
  actions['q-pick-order'] = function (k) {
    var st = App.unitState, i = st.quizIndex;
    var q = st.items[i];
    st.orderPick[i].push(parseInt(k, 10));
    // last tile down -> grade it, and if it is right, move on by ourselves:
    // a child should never have to hunt for the Next button
    if (q && st.orderPick[i].length === q.items.length) {
      checkOrder(st, i, q);
      if (st.results[i] && st.results[i].ok) st.quizIndex = i + 1;
    }
    paint();
  };
  actions['q-unpick'] = function (k) {
    var st = App.unitState, i = st.quizIndex;
    st.orderPick[i] = st.orderPick[i].filter(function (x) { return x !== parseInt(k, 10); }); paint();
  };
  function checkOrder(st, i, q) {
    var picked = st.orderPick[i] || [];
    if (picked.length < q.items.length) { feedback(st, i, 'nudge', t('quiz.placeMore')); return; }
    var ok = picked.every(function (v, k) { return v === k; });
    if (ok) { st.results[i] = { ok: true, attempts: st.attempts[i] || 0 }; feedback(st, i, 'right', t('quiz.right')); }
    else { st.attempts[i] = (st.attempts[i] || 0) + 1; feedback(st, i, 'nudge', t('quiz.tryAgain')); }
  }
  actions['q-sortsel'] = function (k) { var st = App.unitState; st.sortSel = parseInt(k, 10); paint(); };
  actions['q-drop'] = function (bucketId) {
    var st = App.unitState, i = st.quizIndex, q = st.items[i];
    if (st.sortSel == null) return;
    st.sortPlaced[i][st.sortSel] = bucketId;
    st.sortSel = null;
    if (q.items.every(function (x, idx) { return st.sortPlaced[i][idx]; })) {
      checkSort(st, i, q);
      if (st.results[i] && st.results[i].ok) st.quizIndex = i + 1;
    }
    paint();
  };
  actions['q-unsort'] = function (k) {
    var st = App.unitState, i = st.quizIndex;
    delete st.sortPlaced[i][parseInt(k, 10)];
    if (st.results[i] && !st.results[i].ok) delete st.results[i];
    paint();
  };
  function checkSort(st, i, q) {
    var placed = st.sortPlaced[i] || {};
    var ok = q.items.every(function (x, idx) { return placed[idx] === x.b; });
    if (ok) { st.results[i] = { ok: true, attempts: st.attempts[i] || 0 }; feedback(st, i, 'right', t('quiz.right')); }
    else {
      st.attempts[i] = (st.attempts[i] || 0) + 1;
      var wrongIdx = q.items.map(function (x, idx) { return placed[idx] !== x.b ? idx : -1; }).filter(function (x) { return x > -1; });
      feedback(st, i, 'nudge', t('quiz.placeMore'));
      wrongIdx.forEach(function (idx) { delete placed[idx]; });
    }
  }
  actions['q-type'] = null;   // handled by input listener
  function checkBlank(st, i, q) {
    var v = (st.typed && st.typed[i]) || '';
    var res = L.acceptTyped(v, { a: q.a, accept: q.accept || [] });
    if (res.ok) { st.results[i] = { ok: true, attempts: st.attempts[i] || 0 }; feedback(st, i, 'right', res.typo ? '✓ ' + t('quiz.right') : t('quiz.right')); }
    else {
      st.attempts[i] = (st.attempts[i] || 0) + 1;
      var tone = L.retryTone(st.attempts[i]);
      feedback(st, i, 'nudge', tone === 'hint' ? t('quiz.hint') + ': ' + (q.hint || '') : (tone === 'reveal' ? t('quiz.reveal') : t('quiz.tryAgain')));
      st.results[i] = { ok: false };
    }
  }

  /* ============================================================
     MORE hub
     ============================================================ */
  function moreView() {
    var p = prof();
    var html = '<div class="page-head"><h1>' + esc(t('nav.more')) + '</h1></div>';
    html += '<div class="tile-grid">' +
      tile('garden', Art.motif('tree', { skin: skin() }), t('base.title')) +
      tile('verses', Art.motif('scroll', { skin: skin() }), t('verse.title')) +
      tile('leader', Art.motif('crown', { skin: skin() }), t('leader.title')) +
      tile('groups', Art.motif('house', { skin: skin() }), t('leader.group')) +
      tile('print', Art.motif('ink', { skin: skin() }), t('print.title')) +
      tile('parent', Art.motif('lantern', { skin: skin() }), t('parent.title')) +
      tile('settings', Art.motif('jar', { skin: skin() }), t('set.title')) +
      '</div>' + brandCard();
    return html;
  }
  function tile(name, art, label) {
    return '<button class="tile" data-act="go" data-arg="' + name + '"><span class="tile-art">' + art + '</span><b>' + esc(label) + '</b></button>';
  }

  /* ============================================================
     PROFILE SWITCHER
     ============================================================ */
  function switchView() {
    var profiles = St.profiles();
    var html = '<div class="page-head"><h1>' + esc(t('parent.sub')) + '</h1></div><div class="child-grid">' +
      profiles.map(function (c) {
        var prog = L.progressOf(units(), c.tier, c.completed);
        return '<button class="child-card' + (c.id === St.root.activeProfile ? ' on' : '') + '" data-act="pick-child" data-arg="' + c.id + '">' +
          Art.companion(c.companion.type, L.companionStage(c.xp), { skin: L.TIERS[c.tier].skin }) +
          '<b>' + esc(c.name) + '</b><span>' + esc(t('path.progress', { done: prog.done, total: prog.total })) + '</span></button>';
      }).join('') +
      '<button class="child-card add" data-act="go" data-arg="onboard"><b>＋ ' + esc(t('parent.add')) + '</b></button></div>';
    return html;
  }
  actions['pick-child'] = function (id) { St.setActive(id); Sp.init(); App.unitState = null; go('home'); };
  actions['go'] = function (name, extra) { if (name === 'unit') return go('unit', extra); go(name); };
  actions['go-home'] = function () { Sp.stop(); go('home'); };

  /* ============================================================
     small UI services: toast, modal
     ============================================================ */
  var toastTimer = null;
  function toast(msg) {
    var n = document.getElementById('toast');
    if (!n) { n = document.createElement('div'); n.id = 'toast'; n.className = 'toast'; document.body.appendChild(n); }
    n.textContent = msg; n.classList.add('on');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { n.classList.remove('on'); }, 2600);
  }
  App.toast = toast;
  function modal(html, opts) {
    var wrap = document.createElement('div');
    wrap.className = 'modal-wrap';
    wrap.innerHTML = '<div class="modal"><div class="modal-body">' + html + '</div></div>';
    document.body.appendChild(wrap);
    wrap.addEventListener('click', function (e) { if (e.target === wrap || e.target.closest('[data-close]')) wrap.remove(); });
    return wrap;
  }
  App.modal = modal;

  /* ============================================================
     EVENTS (single delegated listener)
     ============================================================ */
  function bind() {
    document.addEventListener('click', function (e) {
      var b = e.target.closest('[data-act]');
      if (!b) return;
      var act = b.getAttribute('data-act');
      if (act === 'q-type') return;
      var fn = actions[act];
      if (typeof fn !== 'function') return;
      if (b.disabled) return;
      e.preventDefault();
      fn(b.getAttribute('data-arg'), b.getAttribute('data-arg2'), b);
    });
    document.addEventListener('change', function (e) {
      var n = e.target;
      if (n.matches('[data-ob]')) { ob[n.getAttribute('data-ob')] = n.value.trim(); paint(); }
      if (n.matches('[data-lib]')) { libState[n.getAttribute('data-lib')] = n.value; paint(); }
      if (n.matches('[data-set]')) {
        var k = n.getAttribute('data-set');
        if (k === 'readAlong') St.setSetting('readAlong', n.checked);
        if (k === 'narration') { St.setSetting('narration', n.checked); Sp.enabled = n.checked; if (!n.checked) Sp.stop(); }
      }
      if (n.matches('[data-setting]')) {
        var k2 = n.getAttribute('data-setting');
        St.setSetting(k2, n.type === 'checkbox' ? n.checked : n.value);
        if (k2 === 'rate') Sp.rate = parseFloat(n.value);
        if (k2 === 'voice') Sp.voiceURI = n.value || null;
        if (k2 === 'lang') { Sp.lang = n.value; }
        paint();
      }
      if (n.matches('[data-profile-set]')) {
        var what = n.getAttribute('data-profile-set');
        if (what === 'tier') { St.setTier(n.value); toast(t('parent.level')); }
        paint();
      }
      if (n.matches('[data-comp-name]')) { St.setCompanionName(n.value); }
      if (n.matches('[data-act="q-type"]')) { st_typed(n); }
    });
    document.addEventListener('input', function (e) {
      var n = e.target;
      if (n.matches('[data-ob]')) { ob[n.getAttribute('data-ob')] = n.value.trim(); }
      if (n.matches('[data-lib="q"]')) { libState.q = n.value; debouncePaint(); }
      if (n.matches('[data-act="q-type"]')) { var st = App.unitState; var i = n.getAttribute('data-arg'); st.typed = st.typed || {}; st.typed[i] = n.value; }
      if (n.matches('[data-pray-in]')) { App._prayText = n.value; }
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' && e.target.matches('[data-act="q-type"]')) { e.preventDefault(); var st = App.unitState; checkBlank(st, st.quizIndex, st.items[st.quizIndex]); paint(); }
      if (e.key === 'Enter' && e.target.matches('[data-ob]')) { e.preventDefault(); actions['ob-next'](); }
      if (e.key === 'Escape') { var m = document.querySelector('.modal-wrap'); if (m) m.remove(); else if (App.route.name === 'unit') go('home'); }
    });
    root.addEventListener('hashchange', function () {
      var r = parseHash();
      if (r.name !== App.route.name || r.arg !== App.route.arg) { Sp.stop(); trackTime(); App.route = r; paint(); }
    });
    document.addEventListener('visibilitychange', function () { if (document.hidden) { Sp.stop(); trackTime(); } else if (App.unitState) App.unitState.t0 = Date.now(); });
    setInterval(function () { trackTime(); }, 60000);
  }
  function st_typed(n) { var st = App.unitState; if (!st) return; st.typed = st.typed || {}; st.typed[n.getAttribute('data-arg')] = n.value; }
  function trackTime() {
    var p = prof(); if (!p) return;
    var secs = p._acc ? 0 : 0;
    if (App.startedAt) { var s = Math.round((Date.now() - App.startedAt) / 1000); if (s > 0) { St.addTime(s); App.startedAt = Date.now(); } }
  }
  var paintTimer = null;
  function debouncePaint() { clearTimeout(paintTimer); paintTimer = setTimeout(paint, 260); }

  /* ============================================================
     boot
     ============================================================ */
  App.registerView = function (name, fn) { views[name] = fn; };
  App.registerAction = function (name, fn) { actions[name] = fn; };

  App.boot = function (mods) {
    L = mods.logic; I = mods.i18n; St = mods.store; Art = mods.art; Sp = mods.speech; Sy = mods.sync; M = mods.meta;
    St.load();
    Sp.rate = St.root.settings.rate || 1;
    Sp.enabled = St.root.settings.narration !== false;
    Sp.lang = St.root.settings.lang || 'en';
    Sp.init();
    views.home = homeView; views.onboard = function () { return onboardView(); };
    views.path = pathView; views.library = libraryView; views.unit = unitView; views.more = moreView;
    views.switch = switchView;
    bind();
    App.startedAt = Date.now();
    setInterval(function () { trackTime(); }, 30000);
    App.route = parseHash();
    paint();
    Sy.init(); Sy.registerSW(); Sy.maybeNotify();
    document.body.classList.add('ready');
    return App;
  };

  if (typeof module !== 'undefined' && module.exports) module.exports = App;
  root.SS_App = App;
})(typeof window !== 'undefined' ? window : (typeof globalThis !== 'undefined' ? globalThis : this));
