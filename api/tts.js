/* Vercel serverless: mother-tongue TTS proxy for en/ur/hi/ar.
   Fetches Google Translate TTS server-side so the browser plays same-origin audio. */
const ALLOWED = { en: 1, ur: 1, hi: 1, ar: 1 };

function sendJson(res, code, obj) {
  res.statusCode = code;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.end(JSON.stringify(obj));
}

module.exports = async function handler(req, res) {
  try {
    if (req.method === 'OPTIONS') {
      res.statusCode = 204;
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
      res.end();
      return;
    }
    if (req.method !== 'GET') {
      sendJson(res, 405, { error: 'GET only' });
      return;
    }

    var q = req.query || {};
    var lang = String(q.lang || 'en').toLowerCase().split(/[^a-z]/)[0].slice(0, 8);
    var text = String(q.q == null ? '' : q.q).replace(/\s+/g, ' ').trim();
    if (!text) {
      sendJson(res, 400, { error: 'missing q' });
      return;
    }
    if (text.length > 180) text = text.slice(0, 180);
    var tl = ALLOWED[lang] ? lang : 'en';

    // Prefer the .vn host — often less captcha-prone for TTS
    var hosts = [
      'https://translate.google.com',
      'https://translate.googleapis.com'
    ];
    var lastErr = null;
    var buf = null;

    for (var h = 0; h < hosts.length && !buf; h++) {
      var base = hosts[h];
      var url = base + '/translate_tts?ie=UTF-8&client=tw-ob&tl=' +
        encodeURIComponent(tl) + '&q=' + encodeURIComponent(text);
      try {
        var upstream = await fetch(url, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',
            'Accept': '*/*',
            'Accept-Language': 'en-US,en;q=0.9',
            'Referer': 'https://translate.google.com/'
          }
        });
        if (!upstream.ok) {
          lastErr = 'status-' + upstream.status;
          continue;
        }
        var ab = await upstream.arrayBuffer();
        var next = Buffer.from(ab);
        if (next.length < 200) {
          lastErr = 'tiny-' + next.length;
          continue;
        }
        buf = next;
      } catch (e) {
        lastErr = String(e && e.message || e);
      }
    }

    if (!buf) {
      sendJson(res, 502, { error: 'upstream', detail: lastErr });
      return;
    }

    res.statusCode = 200;
    res.setHeader('Content-Type', 'audio/mpeg');
    res.setHeader('Content-Length', String(buf.length));
    res.setHeader('Cache-Control', 'public, max-age=604800, s-maxage=604800, stale-while-revalidate=86400');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('X-SS-TTS', tl);
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.end(buf);
  } catch (err) {
    sendJson(res, 500, { error: String(err && err.message || err) });
  }
};
