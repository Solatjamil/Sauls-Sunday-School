/* Offline shell: caches the whole app, then serves cache-first for
   same-origin GETs. Content data is bundled in JS, so one cache =
   a fully working app with no network. */
const VER = 'sssd-v11';
const CORE = ['./', './index.html', './css/app.css', './manifest.webmanifest', './robots.txt', './sitemap.xml',
  './js/core/logic.js', './js/core/i18n.js', './js/core/store.js', './js/core/art.js',
  './js/core/speech.js', './js/core/sync.js', './js/app.js', './js/app2.js',
  './js/data/meta.js', './js/data/units-1.js', './js/data/units-2.js', './js/data/units-3.js',
  './js/data/units-4.js', './js/data/units-5.js', './js/data/units-6.js',
  './js/data/audio.js',
  './js/data/story-i18n.js',
  './assets/icons/icon-192.png', './assets/icons/icon-512.png'];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(VER).then((c) => c.addAll(CORE)).then(() => self.skipWaiting()).catch(() => { }));
});
self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== VER).map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  let url; try { url = new URL(req.url); } catch (err) { return; }
  if (url.origin !== self.location.origin) return;
  e.respondWith(
    caches.match(req, { ignoreSearch: true }).then((hit) => {
      if (hit) return hit;
      return fetch(req).then((res) => {
        const copy = res.clone();
        caches.open(VER).then((c) => c.put(req, copy)).catch(() => { });
        return res;
      }).catch(() => caches.match('./index.html'));
    })
  );
});
self.addEventListener('message', (e) => {
  if (e.data === 'skip') self.skipWaiting();
});
