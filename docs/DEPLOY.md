# Deploying the web app

## Static host (any of these)

```bash
node build.js                     # writes dist/
```

`dist/` is a complete static site: `index.html`, `css/`, `js/`, `sw.js`,
`manifest.webmanifest`, `assets/`, plus the print pack when you run
`node tools/build-print.mjs`. Upload it anywhere that serves files.

**nginx**

```nginx
server {
  server_name sundayschool.saulspodship.com;
  root /var/www/sauls-sunday-school/dist;
  index index.html;
  # the service worker must be served from the origin root
  location = /sw.js { add_header Cache-Control "no-cache"; types { } default_type "text/javascript"; }
  location ~* \.(js|css|png|svg|webmanifest)$ { add_header Cache-Control "public, max-age=31536000, immutable"; }
  location / { try_files $uri $uri/ /index.html; }
}
```

**Netlify** — build command `node build.js`, publish directory `dist`.
**Cloudflare Pages / GitHub Pages / S3+CloudFront** — publish `dist`, no config needed.
**Shared hosting (cPanel)** — upload the contents of `dist/` into `public_html/`.

HTTPS is required for the service worker, notifications and speech-voice
selection on some browsers. Let’s Encrypt is enough.

## Updating the app without stranding anyone

`sw.js` keys its cache with `sssd-v2`. When you ship new code:

1. bump the version in `sw.js` (and `manifest.webmanifest` if you like),
2. rebuild, upload.

Old caches are deleted on activation, so a device that has been offline
picks the whole new app up on its next connection. Nothing else needs clearing,
because all content data ships inside the JS.

## Domain and brand notes

- Suggested host: `sundayschool.saulspodship.com` (lower-case in DNS; the
  display name stays “Saul’s Sunday School”).
- The app links out to the parent brand from the More screen and, for the
  10–12 level, beside the next lesson on the path. All brand strings live in
  `js/data/meta.js → SS_META.BRAND`, so renaming or re-pointing the brand is a
  one-object edit.
- Add to the parent site’s nav: “Sunday School → /”.

## Recorded narration

Every lesson already reads aloud in the browser’s own voice (free, offline,
40+ languages, no cost per child). Recorded narration is an upgrade you can
apply one paragraph at a time.

**Drop the files in — that is the whole process:**

```
assets/audio/<unitId>/<lang>-<key>.mp3        e.g. assets/audio/jonah/en-s0.mp3
```

`<key>` is the paragraph’s `data-para` key, which is its index in the unit’s
`story` array: `s0`, `s1`, … It is deliberately *not* the page number, because
ages 3–6 see one paragraph per page and ages 7–12 see two — one recording serves
both. `npm run audio` (run by `npm test` and by `build.js`) turns whatever is on
disk into `js/data/audio.js`, a tiny map the player prefers over the device
voice. It rejects anything it cannot attach to a real paragraph, so a typo in a
filename is a build message, not a silent gap.

Partial packs work by design: a unit with three of six paragraphs recorded reads
those three in the studio voice and the other three in the browser voice, in the
same run. If a file is missing on the device — an offline stick-drive copy, a
CDN that 404s, a mobile browser that refuses to start audio — playback falls back
to the device voice instead of skipping the paragraph.

To host the audio elsewhere, keep the same shape and hand-write it on the unit
instead:

```js
audio: { en: { s0: 'https://cdn.saulspodship.com/sssd/jonah/en-s0.mp3' } }
```

The service worker caches audio on first play (cache-first for same-origin GETs),
so a unit that has been read once still reads offline afterwards.

### Two host settings that matter for audio

1. **Send the right MIME type.** `audio/mpeg` for `.mp3`, `audio/mp4` for `.m4a`.
   Some browsers refuse to decode an MP3 served as `application/octet-stream`.
2. **Let a missing asset be a 404.** An SPA fallback that answers every unknown
   path with `index.html` and status 200 turns a missing recording into a
   successful response containing HTML. `tools/serve.js` 404s anything with a
   file extension for exactly this reason; do the same in nginx:

```nginx
location /assets/ {
  try_files $uri =404;            # not: $uri /index.html
}
```

## Verifying a deploy

```bash
node tools/serve.js dist && curl -s localhost:4173/index.html | head -3
npm test        # 693 checks: 32 engine logic, 606 drawings, 32 app-flow,
                # 16 age-tier, 5 live against the deployed multi-file page,
                # 2 on a device that refuses to store anything
node tools/validate.mjs
```
