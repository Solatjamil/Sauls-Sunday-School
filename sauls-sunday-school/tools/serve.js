/* Tiny static server for local preview and testing. No dependencies. */
const http = require('http'), fs = require('fs'), path = require('path');
const ROOT = path.resolve(__dirname, '..');
const DIR = process.argv[2] && process.argv[2].startsWith('dist') ? path.join(ROOT, 'dist') : ROOT;
const PORT = +(process.env.PORT || 4173);
const TYPES = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.json': 'application/json; charset=utf-8', '.svg': 'image/svg+xml', '.png': 'image/png', '.webmanifest': 'application/manifest+json', '.ico': 'image/x-icon',
  '.mp3': 'audio/mpeg', '.m4a': 'audio/mp4', '.aac': 'audio/aac', '.ogg': 'audio/ogg', '.opus': 'audio/ogg', '.wav': 'audio/wav', '.weba': 'audio/webm',
  '.pdf': 'application/pdf', '.txt': 'text/plain; charset=utf-8' };
/* A missing asset must 404. Falling back to index.html for /assets/audio/x.mp3 hands
   the <audio> tag an HTML page with status 200, which is worse than a clean error:
   the app cannot tell "no recording here" from "here is your recording". */
const looksLikeFile = (p) => /\.[a-z0-9]{2,5}$/i.test(p);
http.createServer((req, res) => {
  let p = decodeURIComponent(req.url.split('?')[0].split('#')[0]);
  if (p === '/' || p === '') p = '/index.html';
  const file = path.join(DIR, p);
  if (!file.startsWith(DIR)) { res.writeHead(403).end(); return; }
  fs.readFile(file, (err, buf) => {
    if (err) {
      if (looksLikeFile(p)) { res.writeHead(404, { 'content-type': 'text/plain' }).end('not found: ' + p); return; }
      // SPA-ish fallback: unknown route -> index.html
      return fs.readFile(path.join(DIR, 'index.html'), (e2, b2) => {
        if (e2) { res.writeHead(404).end('not found'); return; }
        res.writeHead(200, { 'content-type': TYPES['.html'] }).end(b2);
      });
    }
    res.writeHead(200, { 'content-type': TYPES[path.extname(file)] || 'application/octet-stream', 'cache-control': 'no-cache' }).end(buf);
  });
}).listen(PORT, '0.0.0.0', () => console.log('serving ' + path.relative(ROOT, DIR) + ' on http://0.0.0.0:' + PORT));
