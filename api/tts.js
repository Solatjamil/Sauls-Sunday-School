/* Vercel serverless: mother-tongue TTS proxy.
   Browser audio can play Google Translate speech via same-origin URL
   so mobile WebViews are not blocked. Lang limited to en/ur/hi/ar. */
const ALLOWED = { en: 1, ur: 1, hi: 1, ar: 1 };

module.exports = async function handler(req, res) {
  try {
    if (req.method === 'OPTIONS') {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
      res.status(204).end();
      return;
    }
    if (req.method !== 'GET') {
      res.status(405).json({ error: 'GET only' });
      return;
    }
    var q = req.query || {};
    var lang = String(q.lang || 'en').toLowerCase().split(/[^a-z]/)[0].slice(0, 8);
    var text = String(q.q == null ? '' : q.q).replace(/\s+/g, ' ').trim();
    if (!text) {
      res.status(400).json({ error: 'missing q' });
      return;
    }
    if (text.length > 200) text = text.slice(0, 200);
    var tl = ALLOWED[lang] ? lang : 'en';

    var url = 'https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&tl=' +
      encodeURIComponent(tl) + '&q=' + encodeURIComponent(text);

    var upstream = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Linux; Android 13) AppleWebKit/537.36 Chrome/120.0.0.0 Mobile Safari/537.36',
        'Accept': 'audio/mpeg, audio/*;q=0.9, */*;q=0.8',
        'Referer': 'https://translate.google.com/'
      }
    });

    if (!upstream.ok) {
      res.status(502).json({ error: 'upstream', status: upstream.status });
      return;
    }

    var buf = Buffer.from(await upstream.arrayBuffer());
    if (!buf.length) {
      res.status(502).json({ error: 'empty audio' });
      return;
    }

    res.setHeader('Content-Type', 'audio/mpeg');
    res.setHeader('Cache-Control', 'public, max-age=86400, s-maxage=86400');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('X-SS-TTS', tl);
    res.status(200).send(buf);
  } catch (err) {
    res.status(500).json({ error: String(err && err.message || err) });
  }
};
