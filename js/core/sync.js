/* =====================================================================
   Offline + sync layer.
   The app is offline-first: everything works with no network, progress
   queues locally, and a sync adapter pushes the queue when a server is
   attached. With no server (this build) the adapter is a local stub that
   marks events as synced after a short delay — swap Sync.adapter for a
   real API client and nothing else changes.
   ===================================================================== */
(function (root) {
  'use strict';
  var Sync = {
    mode: 'local',            // 'local' | 'api'
    adapter: {
      push: function (events) {
        // PRODUCTION: return fetch('/api/v1/sync', {method:'POST', body: JSON.stringify({events})})
        return new Promise(function (res) { setTimeout(function () { res({ ok: true, accepted: events.length, mode: 'local' }); }, 350); });
      },
      pull: function () { return Promise.resolve({ ok: true, changes: 0, mode: 'local' }); }
    },
    busy: false,
    lastAt: null,
    lastError: null,

    pending: function () {
      var St = root.SS_Store, p = St && St.profile();
      return (p && p.pendingEvents) ? p.pendingEvents.length : 0;
    },
    online: function () { return typeof navigator === 'undefined' ? true : navigator.onLine !== false; },
    flush: function () {
      var St = root.SS_Store, S = root.SS_Sync;
      var p = St.profile();
      if (!p || S.busy) return Promise.resolve({ ok: false, skipped: true });
      if (!S.online()) return Promise.resolve({ ok: false, offline: true });
      var events = (p.pendingEvents || []).slice();
      if (!events.length) return Promise.resolve({ ok: true, accepted: 0 });
      S.busy = true;
      return S.adapter.push(events).then(function (r) {
        S.busy = false; S.lastAt = Date.now();
        if (r && r.ok) { p.pendingEvents = []; St.save(); }
        return r;
      }).catch(function (e) { S.busy = false; S.lastError = String(e && e.message || e); return { ok: false, error: S.lastError }; });
    },
    init: function () {
      var S = root.SS_Sync;
      if (typeof addEventListener !== 'undefined') {
        addEventListener('online', function () { S.flush(); if (root.SS_App) root.SS_App.rerender(); });
        addEventListener('offline', function () { if (root.SS_App) root.SS_App.rerender(); });
      }
      setInterval(function () { if (S.pending() > 3 && S.online()) S.flush(); }, 25000);
    },
    // ---- backups ----
    download: function (text, filename, mime) {
      try {
        var blob = new Blob([text], { type: mime || 'application/json' });
        var url = URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.href = url; a.download = filename; document.body.appendChild(a); a.click();
        setTimeout(function () { document.body.removeChild(a); URL.revokeObjectURL(url); }, 200);
        return true;
      } catch (e) { return false; }
    },
    pickFile: function (cb) {
      var inp = document.createElement('input');
      inp.type = 'file'; inp.accept = '.json,application/json';
      inp.onchange = function () {
        var f = inp.files && inp.files[0]; if (!f) return;
        var r = new FileReader();
        r.onload = function () { cb(String(r.result)); };
        r.readAsText(f);
      };
      inp.click();
    },
    // ---- gentle daily notification ----
    notifications: {
      supported: (typeof Notification !== 'undefined' && Notification !== null),
      permission: function () { return Sync.notifications.supported ? Notification.permission : 'unsupported'; },
      ask: function (cb) {
        if (!Sync.notifications.supported) { if (cb) cb('unsupported'); return; }
        try {
          if (Notification.permission === 'granted') { if (cb) cb('granted'); return; }
          var r = Notification.requestPermission(function (p) { if (cb) cb(p); });
          if (r && r.then) r.then(function (p) { if (cb) cb(p); });
        } catch (e) { if (cb) cb('denied'); }
      },
      show: function (title, body) {
        if (!Sync.notifications.supported || Notification.permission !== 'granted') return false;
        try { new Notification(title, { body: body, tag: 'sssd-daily', silent: false }); return true; }
        catch (e) { return false; }
      }
    },
    maybeNotify: function () {
      var St = root.SS_Store, M = root.SS_META, L = root.SS_Logic;
      var r = St.root, s = r.settings;
      if (!s || !s.notify || !s.notifyDay) return false;
      var today = L.isoDay(new Date());
      if (r.device.lastNotifiedDay === today) return false;
      var want = String(s.notifyDay);                     // "HH:MM"
      var now = new Date();
      var nowMin = now.getHours() * 60 + now.getMinutes();
      var wm = want.split(':'); var wantMin = (+wm[0]) * 60 + (+wm[1] || 0);
      if (nowMin < wantMin) return false;
      var v = M.DAILY_VERSES[M.dailyVerseIndex(today)];
      r.device.lastNotifiedDay = today; St.save();
      return Sync.notifications.show(v.ref, v.text);
    },
    // ---- service worker ----
    registerSW: function () {
      if (typeof navigator === 'undefined' || !navigator.serviceWorker) return false;
      if (location.protocol !== 'https:' && !/^https?:\/\/(localhost|127\.)/.test(location.origin)) {
        // file:// or plain http on a LAN: SW needs a secure context
        if (location.protocol === 'file:') return false;
      }
      try { navigator.serviceWorker.register('sw.js').catch(function () { }); return true; }
      catch (e) { return false; }
    }
  };
  if (typeof module !== 'undefined' && module.exports) module.exports = Sync;
  root.SS_Sync = Sync;
})(typeof window !== 'undefined' ? window : (typeof globalThis !== 'undefined' ? globalThis : this));
