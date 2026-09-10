/* =====================================================================
   Art — all visuals are generated inline SVG. No image files, so the
   app works offline, prints cleanly, and can be recoloured per tier.
   viewBox is always 0 0 100 100 unless stated.
   ===================================================================== */
(function (root) {
  'use strict';

  var PAL = {
    young: { ink: '#4a3b2f', line: 3.2, bg: '#fff7e8', a: '#f9c74f', b: '#90be6d', c: '#577590', d: '#f28482' },
    mid:   { ink: '#33302b', line: 2.6, bg: '#fdfaf3', a: '#e9a13b', b: '#4f9d69', c: '#3d6b8c', d: '#cf5c56' },
    old:   { ink: '#2b2622', line: 2.1, bg: '#fbf7ef', a: '#c98b2e', b: '#3f7d5a', c: '#2f5d7c', d: '#a8453f' }
  };
  function pal(skin) { return PAL[skin] || PAL.mid; }

  function svg(inner, opts) {
    opts = opts || {};
    var vb = opts.vb || '0 0 100 100';
    return '<svg viewBox="' + vb + '" role="img" aria-label="' + esc(opts.label || '') + '"' +
      (opts.cls ? ' class="' + opts.cls + '"' : '') + (opts.style ? ' style="' + opts.style + '"' : '') +
      ' xmlns="http://www.w3.org/2000/svg">' + inner + '</svg>';
  }
  /* Attribute strings from call sites are written casually ('stroke="x"' with no
     leading space, sometimes duplicating fill). Browsers forgive that, an XML
     parser does not — and printing goes through an XML parser. Normalise here. */
  function attrs(extra, taken) {
    if (!extra) return '';
    var out = '', re = /([a-zA-Z-]+)\s*=\s*"([^"]*)"/g, m, seen = {};
    taken.concat([]).forEach(function (k) { seen[k] = 1; });
    while ((m = re.exec(String(extra)))) {
      if (seen[m[1]]) continue;
      seen[m[1]] = 1;
      out += ' ' + m[1] + '="' + m[2] + '"';
    }
    return out;
  }
  function esc(s) { return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }

  /* ---------- primitives ---------- */
  function c(x, y, r, fill, extra) { return '<circle cx="' + x + '" cy="' + y + '" r="' + r + '" fill="' + fill + '"' + attrs(extra, ['cx', 'cy', 'r', 'fill']) + ' />'; }
  function e(x, y, rx, ry, fill, extra) { return '<ellipse cx="' + x + '" cy="' + y + '" rx="' + rx + '" ry="' + ry + '" fill="' + fill + '"' + attrs(extra, ['cx', 'cy', 'rx', 'ry', 'fill']) + ' />'; }
  function r(x, y, w, h, fill, rx, extra) { return '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="' + (rx || 0) + '" fill="' + fill + '"' + attrs(extra, ['x', 'y', 'width', 'height', 'rx', 'fill']) + ' />'; }
  function p(d, fill, extra) { return '<path d="' + d + '" fill="' + (fill || 'none') + '"' + attrs(extra, ['d', 'fill']) + ' />'; }
  function ln(x1, y1, x2, y2, stroke, w) { return '<line x1="' + x1 + '" y1="' + y1 + '" x2="' + x2 + '" y2="' + y2 + '" stroke="' + stroke + '" stroke-width="' + (w || 2) + '" stroke-linecap="round" />'; }
  function eye(x, y, r0, col) { return c(x, y, r0 || 2.4, col || '#2b2622') + c((x || 0) - 0.7, (y || 0) - 0.7, (r0 || 2.4) * 0.32, '#fff'); }
  function blush(x, y) { return e(x, y, 3.4, 2.1, 'rgba(240,120,110,.45)'); }
  function txt(x, y, s, size, fill, anchor) {
    return '<text x="' + x + '" y="' + y + '" font-size="' + (size || 8) + '" fill="' + (fill || '#33302b') + '" text-anchor="' + (anchor || 'middle') + '" font-family="ui-rounded, \u201cNunito\u201d, system-ui, sans-serif">' + esc(s) + '</text>';
  }

  /* ================= COMPANIONS ================= */
  // Each type returns { body, face, extras } so stages can layer growth.
  var COMP = {
    lamb: function (P, s) {
      var g = '';
      g += e(50, 62, 24 + s * 1.4, 18 + s, '#fffdf8', 'stroke="' + P.ink + '"');
      for (var i = 0; i < 7; i++) g += c(32 + i * 6, 48 + (i % 2 ? 4 : 0), 6.4, '#fffdf8', 'stroke="' + P.ink + '" stroke-width="1.5"');
      g += e(50, 40, 12 + s * 0.5, 10, '#fdf3e7', 'stroke="' + P.ink + '"');
      g += p('M38 36 q-8 -6 -6 4 q1 6 8 3', '#fdf3e7', 'stroke="' + P.ink + '" stroke-width="1.6"');
      g += p('M62 36 q8 -6 6 4 q-1 6 -8 3', '#fdf3e7', 'stroke="' + P.ink + '" stroke-width="1.6"');
      g += eye(45.5, 40) + eye(54.5, 40);
      g += p('M47 45 q3 3 6 0', 'none', 'stroke="' + P.ink + '" stroke-width="1.6" fill="none"');
      g += ln(40, 78, 40, 88, P.ink, P.line) + ln(60, 78, 60, 88, P.ink, P.line);
      return g;
    },
    dove: function (P, s) {
      var g = '';
      g += e(50, 58, 15 + s, 11 + s * 0.6, '#ffffff', 'stroke="' + P.ink + '"');
      g += c(64, 46, 8 + s * 0.4, '#ffffff', 'stroke="' + P.ink + '"');
      g += p('M70 46 l9 2 l-9 3 z', P.a, 'stroke="' + P.ink + '" stroke-width="1.4"');
      g += eye(65, 44.5, 2);
      g += p('M44 54 q-14 -8 -18 4 q10 4 18 2 z', '#f4f1ea', 'stroke="' + P.ink + '" stroke-width="1.8"');
      g += ln(50, 69, 50, 76, P.ink, 1.6) + ln(55, 69, 55, 76, P.ink, 1.6);
      if (s >= 2) g += p('M20 40 q10 -14 22 -6', 'none', 'stroke="' + P.b + '" stroke-width="2"') + e(20, 40, 4, 2.2, P.b);
      return g;
    },
    donkey: function (P, s) {
      var g = '';
      g += e(50, 60, 22 + s * 1.2, 14, '#b9a99a', 'stroke="' + P.ink + '"');
      g += e(70, 42, 11, 9, '#c6b7a8', 'stroke="' + P.ink + '"');
      g += p('M64 32 q-4 -12 2 -12 q5 1 4 12 z', '#b9a99a', 'stroke="' + P.ink + '" stroke-width="1.6"');
      g += p('M74 32 q4 -12 -2 -12 q-5 1 -3 12 z', '#b9a99a', 'stroke="' + P.ink + '" stroke-width="1.6"');
      g += eye(72, 42, 2.2);
      g += e(79, 46, 4, 3, '#e0d6cc', 'stroke="' + P.ink + '" stroke-width="1.4"');
      g += ln(36, 72, 36, 86, P.ink, P.line) + ln(58, 72, 58, 86, P.ink, P.line);
      g += p('M28 52 q-8 6 -4 14', 'none', 'stroke="' + P.ink + '" stroke-width="2"');
      return g;
    },
    hen: function (P, s) {
      var g = '';
      g += e(50, 60, 17 + s, 14, '#f2c9a0', 'stroke="' + P.ink + '"');
      g += c(62, 44, 8.5, '#f2c9a0', 'stroke="' + P.ink + '"');
      g += p('M58 35 q4 -7 8 0 q-4 -2 -8 0', P.d, 'stroke="' + P.ink + '" stroke-width="1.2"');
      g += p('M66 44 l8 1 l-8 3 z', P.a, 'stroke="' + P.ink + '" stroke-width="1.2"');
      g += eye(63, 43, 2);
      g += p('M42 56 q-10 -4 -12 6 q8 4 14 -1 z', '#e0b285', 'stroke="' + P.ink + '" stroke-width="1.6"');
      g += ln(46, 74, 46, 82, P.ink, 1.8) + ln(54, 74, 54, 82, P.ink, 1.8);
      if (s >= 3) for (var i = 0; i < 3; i++) g += c(30 + i * 6, 80, 3.2, '#fff6df', 'stroke="' + P.ink + '" stroke-width="1.2"');
      return g;
    },
    ewe: function (P, s) {
      var g = COMP.lamb(P, s);
      return g + e(50, 66, 8, 4, 'rgba(255,255,255,.6)');
    },
    camel: function (P, s) {
      var g = '';
      g += e(48, 60, 20 + s, 12, '#d8a86b', 'stroke="' + P.ink + '"');
      g += p('M40 52 q4 -10 8 0', '#d8a86b', 'stroke="' + P.ink + '" stroke-width="1.8" fill="#d8a86b"');
      g += p('M56 52 q4 -10 8 0', '#d8a86b', 'stroke="' + P.ink + '" stroke-width="1.8" fill="#d8a86b"');
      g += p('M66 56 q10 -2 8 -14 q-1 -6 -6 -6', 'none', 'stroke="' + P.ink + '" stroke-width="4.4"');
      g += c(74, 34, 7, '#d8a86b', 'stroke="' + P.ink + '"');
      g += p('M78 33 l6 1 l-6 3 z', '#b98d53', 'stroke="' + P.ink + '" stroke-width="1.2"');
      g += eye(75, 32, 2);
      g += ln(38, 70, 38, 88, P.ink, P.line) + ln(58, 70, 58, 88, P.ink, P.line);
      return g;
    },
    shepherd: function (P, s) {
      var g = '';
      g += p('M50 30 q-14 0 -13 16 l26 0 q1 -16 -13 -16', '#e9dcc6', 'stroke="' + P.ink + '"');
      g += c(50, 46, 9, '#f6dcc0', 'stroke="' + P.ink + '"');
      g += eye(47, 45, 1.9) + eye(53, 45, 1.9);
      g += p('M47 49 q3 2.5 6 0', 'none', 'stroke="' + P.ink + '" stroke-width="1.5"');
      g += p('M40 58 q10 -6 20 0 l3 24 l-26 0 z', P.c, 'stroke="' + P.ink + '"');
      g += ln(70, 34, 70, 84, '#8b6a45', 3.4);
      g += p('M70 34 q8 2 8 9', 'none', 'stroke="' + P.ink + '" stroke-width="2.4"');
      if (s >= 1) g += ln(30, 62, 30, 84, '#8b6a45', 2.6);
      return g;
    },
    lion: function (P, s) {
      var g = '';
      for (var i = 0; i < 12; i++) {
        var a = (i / 12) * Math.PI * 2;
        g += c(50 + Math.cos(a) * 17, 48 + Math.sin(a) * 15, 6, '#c1793f');
      }
      g += c(50, 48, 14, '#e9a94f', 'stroke="' + P.ink + '"');
      g += e(50, 55, 7, 5, '#f6dcae', 'stroke="' + P.ink + '" stroke-width="1.2"');
      g += eye(45, 46, 2.1) + eye(55, 46, 2.1);
      g += p('M47 54 q3 3 6 0', 'none', 'stroke="' + P.ink + '" stroke-width="1.5"');
      g += p('M50 51 l-2 2 l4 0 z', '#7a4b28');
      g += e(50, 74, 13, 8, '#e9a94f', 'stroke="' + P.ink + '"');
      g += ln(42, 81, 42, 88, P.ink, 2.4) + ln(58, 81, 58, 88, P.ink, 2.4);
      return g;
    }
  };

  function companion(type, stage, opts) {
    opts = opts || {};
    var P = pal(opts.skin);
    var fn = COMP[type] || COMP.lamb;
    var s = Math.max(0, Math.min(4, stage | 0));
    var g = '';
    g += e(50, 90, 26, 5, 'rgba(0,0,0,.06)');
    if (opts.scene !== false) {
      g += c(50, 50, 42, 'rgba(255,255,255,.0)');
      if (s >= 4) g += p('M14 62 q14 -30 36 -30 q22 0 36 30', 'none', 'stroke="' + P.a + '" stroke-width="2" opacity=".7"');
    }
    g += '<g transform="translate(50,58) scale(' + (0.8 + s * 0.07) + ') translate(-50,-58)">' + fn(P, s) + '</g>';
    // stage tokens: sparkles grow with the companion
    if (s >= 1) g += c(18, 30, 1.8 + s * 0.5, P.a);
    if (s >= 2) g += c(84, 34, 1.8 + s * 0.4, P.b);
    if (s >= 3) g += p('M82 20 l2 5 l5 2 l-5 2 l-2 5 l-2 -5 l-5 -2 l5 -2 z', P.a);
    if (s >= 4) g += p('M14 18 l2 5 l5 2 l-5 2 l-2 5 l-2 -5 l-5 -2 l5 -2 z', P.d);
    return svg(g, { label: (opts.name || type) + ', stage ' + (s + 1), cls: 'art art-comp' });
  }

  /* ================= BADGE / STICKER / MOTIF ART ================= */
  var MOTIF = {
    sun: function (P) { return c(50, 50, 16, P.a) + (function () { var s = ''; for (var i = 0; i < 8; i++) { var a = i * Math.PI / 4; s += ln(50 + Math.cos(a) * 22, 50 + Math.sin(a) * 22, 50 + Math.cos(a) * 32, 50 + Math.sin(a) * 32, P.a, 3.4); } return s; })() + eye(45, 48, 2) + eye(55, 48, 2) + p('M44 55 q6 6 12 0', 'none', 'stroke="' + P.ink + '" stroke-width="1.8"'); },
    star: function (P) { return p('M50 18 l9 20 l22 3 l-16 15 l4 21 l-19 -11 l-19 11 l4 -21 l-16 -15 l22 -3 z', P.a, 'stroke="' + P.ink + '" stroke-width="2"'); },
    rainbow: function (P) { var s = ''; var cols = [P.d, P.a, '#ffe066', P.b, P.c, '#8f7bd6']; for (var i = 0; i < 6; i++) s += p('M' + (18 + i * 5) + ' 78 a' + (32 - i * 2.5) + ' ' + (32 - i * 2.5) + ' 0 0 1 ' + (64 - i * 5) + ' 0', 'none', 'stroke="' + cols[i] + '" stroke-width="4"'); return s + c(20, 76, 6, '#fff', 'stroke="' + P.ink + '"') + c(80, 76, 6, '#fff', 'stroke="' + P.ink + '"'); },
    ark: function (P) { return p('M16 62 q34 22 68 0 l-8 16 q-26 8 -52 0 z', '#a9743f', 'stroke="' + P.ink + '"') + r(32, 40, 36, 22, '#c9995f', 4, 'stroke="' + P.ink + '" stroke-width="2"') + p('M32 40 l18 -12 l18 12', '#8f6b3d', 'stroke="' + P.ink + '" stroke-width="2"') + eye(45, 51, 1.8) + eye(55, 51, 1.8); },
    lamb: function (P) { return COMP.lamb(P, 1); },
    ewe: function (P) { return COMP.ewe(P, 1); },
    dove: function (P) { return COMP.dove(P, 1); },
    hen: function (P) { return COMP.hen(P, 1); },
    lion: function (P) { return COMP.lion(P, 1); },
    donkey: function (P) { return COMP.donkey(P, 1); },
    camel: function (P) { return COMP.camel(P, 1); },
    shepherd: function (P) { return COMP.shepherd(P, 1); },
    fish: function (P) { return e(48, 52, 20, 12, P.c, 'stroke="' + P.ink + '"') + p('M68 52 l14 -9 l0 18 z', P.c, 'stroke="' + P.ink + '" stroke-width="2"') + eye(38, 49, 2.2, '#fff') + p('M50 44 q6 8 0 16', 'none', 'stroke="' + P.ink + '" stroke-width="1.6"'); },
    loaves: function (P) { return e(38, 58, 15, 10, '#e6c48a', 'stroke="' + P.ink + '"') + e(62, 62, 13, 9, '#e6c48a', 'stroke="' + P.ink + '"') + p('M30 54 q8 -10 16 0', 'none', 'stroke="' + P.ink + '" stroke-width="1.6"') + r(28, 70, 46, 6, '#b98a52', 3); },
    basket: function (P) { return p('M24 48 h52 l-6 32 q-20 6 -40 0 z', '#cf9c5c', 'stroke="' + P.ink + '"') + ln(24, 56, 76, 56, P.ink, 1.6) + ln(26, 64, 74, 64, P.ink, 1.4) + p('M34 48 q16 -18 32 0', 'none', 'stroke="' + P.ink + '" stroke-width="2.4"'); },
    tablet: function (P) { return p('M22 30 q0 -8 8 -8 h14 q6 0 6 8 v46 q0 6 -6 6 h-16 q-6 0 -6 -6 z', '#8c8a86', 'stroke="' + P.ink + '"') + p('M50 30 q0 -8 8 -8 h14 q8 0 8 8 v46 q0 6 -6 6 h-16 q-6 0 -6 -6 z', '#9d9b97', 'stroke="' + P.ink + '"') + (function () { var s = ''; for (var i = 0; i < 5; i++) { s += ln(28, 34 + i * 8, 44, 34 + i * 8, '#fff', 2); s += ln(56, 34 + i * 8, 72, 34 + i * 8, '#fff', 2); } return s; })(); },
    flame: function (P) { return p('M50 20 q20 22 8 40 q14 -4 12 14 q-4 16 -20 16 q-18 0 -20 -16 q-2 -18 12 -14 q-12 -18 -8 -40 z', P.a, 'stroke="' + P.ink + '" stroke-width="2"') + p('M50 52 q8 8 0 18 q-8 -8 0 -18', '#fff6df'); },
    crown: function (P) { return p('M24 66 l4 -30 l12 12 l10 -20 l10 20 l12 -12 l4 30 z', P.a, 'stroke="' + P.ink + '" stroke-width="2"') + r(24, 64, 52, 8, '#d9a63f', 3, 'stroke="' + P.ink + '" stroke-width="1.6"') + c(40, 70, 2.4, P.d) + c(50, 70, 2.4, P.b) + c(60, 70, 2.4, P.c); },
    cross: function (P) { return r(44, 20, 12, 60, '#8b6a45', 2, 'stroke="' + P.ink + '"') + r(28, 36, 44, 12, '#8b6a45', 2, 'stroke="' + P.ink + '"') + p('M20 80 q30 -12 60 0', 'none', 'stroke="' + P.b + '" stroke-width="3"'); },
    emptytomb: function (P) { return p('M20 78 q0 -34 30 -34 q30 0 30 34 z', '#a9a6a1', 'stroke="' + P.ink + '"') + e(50, 78, 12, 10, '#2b2622') + c(74, 60, 12, '#efe8db', 'stroke="' + P.ink + '" stroke-width="2"') + p('M18 78 h64', 'none', 'stroke="' + P.ink + '" stroke-width="2.4"'); },
    shield: function (P) { return p('M50 18 l28 10 v22 q0 22 -28 32 q-28 -10 -28 -32 v-22 z', P.c, 'stroke="' + P.ink + '" stroke-width="2.4"') + p('M50 30 v40 M36 48 h28', 'none', 'stroke="#fff" stroke-width="3.4"'); },
    scroll: function (P) { return r(24, 26, 52, 48, '#f5e9cf', 4, 'stroke="' + P.ink + '" stroke-width="2"') + c(24, 26, 6, '#e4d3b3', 'stroke="' + P.ink + '"') + c(76, 74, 6, '#e4d3b3', 'stroke="' + P.ink + '"') + (function () { var s = ''; for (var i = 0; i < 4; i++) s += ln(32, 38 + i * 9, 68, 38 + i * 9, '#c9b98f', 2); return s; })(); },
    tree: function (P) { return r(46, 58, 8, 24, '#8b6a45', 3) + c(50, 44, 20, P.b, 'stroke="' + P.ink + '" stroke-width="2"') + c(34, 52, 12, P.b) + c(66, 52, 12, P.b) + c(44, 40, 4, P.d) + c(58, 46, 4, P.d); },
    well: function (P) { return r(30, 50, 40, 26, '#a9a6a1', 4, 'stroke="' + P.ink + '"') + p('M30 50 h40', 'none', 'stroke="' + P.ink + '" stroke-width="2"') + r(34, 56, 32, 8, '#5f9ec2', 2) + ln(50, 26, 50, 50, '#8b6a45', 3) + p('M28 30 h44 l-6 -12 h-32 z', '#8b6a45', 'stroke="' + P.ink + '"'); },
    lantern: function (P) { return ln(50, 16, 50, 26, P.ink, 2.4) + p('M34 26 h32 l6 40 q-22 8 -44 0 z', P.a, 'stroke="' + P.ink + '" stroke-width="2"') + c(50, 48, 7, '#fff6df') + r(32, 66, 36, 6, P.ink, 3); },
    harp: function (P) { return p('M28 78 q-4 -50 44 -56', 'none', 'stroke="#8b6a45" stroke-width="5"') + ln(28, 78, 72, 22, P.ink, 2.4) + (function () { var s = ''; for (var i = 0; i < 5; i++) s += ln(34 + i * 8, 74 - i * 4, 34 + i * 8, 30 + i * 6, '#d8c48f', 1.6); return s; })(); },
    beehive: function (P) { return p('M30 74 q-4 -34 20 -40 q24 6 20 40 z', P.a, 'stroke="' + P.ink + '" stroke-width="2"') + (function () { var s = ''; for (var i = 0; i < 3; i++) s += ln(30, 52 + i * 9, 70, 52 + i * 9, P.ink, 1.6); return s; })() + c(78, 34, 3.4, '#2b2622') + p('M74 34 q4 -6 8 0', 'none', 'stroke="#fff" stroke-width="1.4"'); },
    hive: function (P) { return MOTIF.beehive(P); },
    manger: function (P) { return p('M26 54 h48 l-8 22 h-32 z', '#c9995f', 'stroke="' + P.ink + '" stroke-width="2"') + ln(50, 76, 40, 90, '#8b6a45', 3) + ln(50, 76, 60, 90, '#8b6a45', 3) + c(50, 46, 9, '#ffe9c9', 'stroke="' + P.ink + '"') + p('M44 44 q6 5 12 0', 'none', 'stroke="' + P.ink + '" stroke-width="1.5"') + c(50, 20, 5, P.a); },
    vine: function (P) { return p('M20 80 q14 -34 30 -20 q16 14 30 -20', 'none', 'stroke="' + P.b + '" stroke-width="3.4"') + (function () { var s = ''; var xs = [30, 42, 54, 66, 76]; for (var i = 0; i < xs.length; i++) s += c(xs[i], 58 + (i % 2 ? 6 : -4), 5, '#7c5aa6'); return s; })(); },
    cage: function (P) { return r(30, 30, 40, 46, 'none', 4, 'stroke="' + P.ink + '" stroke-width="2.4"') + (function () { var s = ''; for (var i = 1; i < 5; i++) s += ln(30 + i * 8, 30, 30 + i * 8, 76, P.ink, 1.6); return s; })() + c(50, 26, 6, 'none', 'stroke="' + P.ink + '" stroke-width="2.2"') + p('M70 76 q10 -10 4 -22', 'none', 'stroke="' + P.a + '" stroke-width="2.4"'); },
    jar: function (P) { return p('M36 34 h28 l-4 10 q10 20 -10 34 q-20 -14 -10 -34 z', '#d9c39b', 'stroke="' + P.ink + '" stroke-width="2"') + r(34, 28, 32, 8, '#b98a52', 3, 'stroke="' + P.ink + '" stroke-width="1.6"'); },
    stones: function (P) { return c(34, 70, 11, '#a9a6a1', 'stroke="' + P.ink + '"') + c(52, 66, 12, '#9a968f', 'stroke="' + P.ink + '"') + c(68, 72, 9, '#b3b0ab', 'stroke="' + P.ink + '"') + c(44, 50, 6, '#cfcac2', 'stroke="' + P.ink + '"'); },
    sling: function (P) {
      // a shepherd's sling with the stone loaded, and the arc it swings
      return p('M10 34 q26 -22 58 -2', 'none', 'stroke="' + P.ink + '" stroke-width="1.4" stroke-dasharray="6 5"') +
        ln(66, 40, 54, 60, P.ink, 1.8) + ln(66, 40, 62, 64, P.ink, 1.8) +
        p('M48 58 q12 -6 20 4 q-8 12 -22 6 z', P.bg || '#fff', 'stroke="' + P.ink + '" stroke-width="2"') +
        c(58, 60, 5.6, '#fff', 'stroke="' + P.ink + '" stroke-width="1.8"') +
        c(74, 26, 3.2, '#fff', 'stroke="' + P.ink + '" stroke-width="1.4"') +
        p('M22 78 q16 10 34 4', 'none', 'stroke="' + P.ink + '" stroke-width="1.2"');
    },
    cloak: function (P) {
      // a robe with a clasp and a torn hem — Saul's cloak, David cutting it away
      return p('M32 26 q18 -10 36 0 l8 44 q-26 10 -52 0 z', P.c, 'stroke="' + P.ink + '" stroke-width="2"') +
        p('M36 30 l-6 36 M64 30 l6 36', 'none', 'stroke="' + P.ink + '" stroke-width="1.2"') +
        p('M24 70 l6 10 l6 -8 l6 8 l6 -10 l6 10 l6 -8 l6 8 l6 -10 l6 10 l5 -8', 'none', 'stroke="' + P.ink + '" stroke-width="1.6"') +
        c(50, 24, 4, P.a, 'stroke="' + P.ink + '" stroke-width="1.4"');
    },
    coat: function (P) { return p('M34 26 h32 l6 46 q-22 8 -44 0 z', P.a, 'stroke="' + P.ink + '" stroke-width="2"') + (function () { var s = ''; for (var i = 0; i < 4; i++) s += ln(34 + i * 10, 30, 32 + i * 10, 70, [P.d, P.b, P.c, '#8f7bd6'][i], 3); return s; })(); },
    boat: function (P) { return p('M20 62 q30 18 60 0 l-8 16 q-22 6 -44 0 z', '#a9743f', 'stroke="' + P.ink + '"') + ln(50, 62, 50, 26, '#8b6a45', 3) + p('M50 28 q20 8 2 22 z', '#f3ede2', 'stroke="' + P.ink + '" stroke-width="1.8"') + p('M14 84 q8 -6 16 0 q8 6 16 0 q8 -6 16 0 q8 6 16 0', 'none', 'stroke="' + P.c + '" stroke-width="2.6"'); },
    gate: function (P) { return r(24, 30, 12, 50, '#a9a6a1', 3, 'stroke="' + P.ink + '"') + r(64, 30, 12, 50, '#a9a6a1', 3, 'stroke="' + P.ink + '"') + p('M36 44 q14 -16 28 0', 'none', 'stroke="' + P.ink + '" stroke-width="3"') + ln(36, 60, 64, 60, '#8b6a45', 3); },
    heart: function (P) { return p('M50 80 C18 58 24 30 42 30 q8 0 8 8 q0 -8 8 -8 c18 0 24 28 -16 50 z', P.d, 'stroke="' + P.ink + '" stroke-width="2"'); },
    olive: function (P) { return ln(50, 84, 50, 44, '#8b6a45', 3.4) + c(40, 40, 9, P.b) + c(60, 36, 8, P.b) + c(50, 28, 7, '#7fa658') + c(44, 48, 3.4, '#4f6b3a'); },
    city: function (P) { return p('M18 78 v-26 l10 -8 v-10 l10 8 v-16 l12 -10 l12 10 v16 l10 -8 v10 l10 8 v26 z', '#efe8db', 'stroke="' + P.ink + '" stroke-width="2"') + (function () { var s = ''; for (var i = 0; i < 4; i++) s += r(28 + i * 12, 60, 7, 10, P.a, 2); return s; })() + c(50, 34, 4, P.a); },
    ink: function (P) { return ln(62, 24, 40, 62, '#d8c48f', 3) + p('M36 62 q10 6 14 -4 l8 14 q-16 10 -30 -2 z', P.c, 'stroke="' + P.ink + '"') + r(24, 60, 22, 18, '#8f7bd6', 4, 'stroke="' + P.ink + '" stroke-width="2"'); },
    anchor: function (P) { return c(50, 26, 7, 'none', 'stroke="' + P.ink + '" stroke-width="3"') + ln(50, 33, 50, 76, P.ink, 3.4) + ln(38, 44, 62, 44, P.ink, 3) + p('M26 62 q8 22 24 16 q16 6 24 -16', 'none', 'stroke="' + P.ink + '" stroke-width="3.6"'); },
    ear: function (P) { return p('M40 76 q-14 -10 -8 -34 q6 -22 24 -18 q16 4 12 22 q-4 14 -16 12 q-8 -2 -6 -12', 'none', 'stroke="' + P.ink + '" stroke-width="3.2"'); },
    hands: function (P) { return p('M26 66 q-6 -20 6 -30 q8 -6 10 6 l2 14', 'none', 'stroke="' + P.ink + '" stroke-width="3"') + p('M74 66 q6 -20 -6 -30 q-8 -6 -10 6 l-2 14', 'none', 'stroke="' + P.ink + '" stroke-width="3"') + e(50, 76, 22, 8, P.a, 'opacity=".5"'); },
    drop: function (P) { return p('M50 22 q22 30 0 46 q-22 -16 0 -46 z', P.c, 'stroke="' + P.ink + '" stroke-width="2"'); },
    kite: function (P) { return p('M50 18 l24 26 l-24 30 l-24 -30 z', P.d, 'stroke="' + P.ink + '" stroke-width="2"') + ln(50, 18, 50, 74, '#fff', 1.6) + ln(26, 44, 74, 44, '#fff', 1.6) + p('M50 74 q8 6 0 12 q-8 6 0 10', 'none', 'stroke="' + P.a + '" stroke-width="2"'); },
    wall: function (P) { return r(18, 40, 64, 40, '#c2b6a5', 3, 'stroke="' + P.ink + '" stroke-width="2"') + (function () { var s = ''; for (var y = 0; y < 3; y++) for (var x = 0; x < 4; x++) s += r(22 + x * 16 + (y % 2 ? 8 : 0), 44 + y * 12, 14, 10, 'none', 2, 'stroke="' + P.ink + '" stroke-width="1.2"'); return s; })(); },
    tomb: function (P) { return MOTIF.emptytomb(P); },
    house: function (P) { return p('M24 50 l26 -20 l26 20 v30 q-26 8 -52 0 z', '#e8dcc6', 'stroke="' + P.ink + '" stroke-width="2"') + r(44, 58, 14, 20, '#8b6a45', 2, 'stroke="' + P.ink + '"') + c(50, 42, 5, P.a) + r(28, 54, 10, 10, P.c, 2); },
    fig: function (P) { return MOTIF.tree(P); },
    tablet2: function (P) { return MOTIF.tablet(P); }
  };

  function motif(name, opts) {
    opts = opts || {};
    var P = pal(opts.skin);
    var fn = MOTIF[name] || MOTIF.scroll;
    var g = '';
    if (opts.disk !== false) g += c(50, 50, 46, opts.diskColor || 'rgba(255,255,255,.72)', 'stroke="' + P.ink + '" stroke-width="' + (opts.ring || 1.4) + '"');
    g += '<g transform="translate(50,50) scale(' + (opts.scale || 0.78) + ') translate(-50,-50)">' + fn(P, 0) + '</g>';
    return svg(g, { label: name, cls: 'art art-motif' + (opts.cls ? ' ' + opts.cls : '') });
  }


  /* ---------- story theatre (tier L) — big cartoon slides a 3-year-old can "read" ---------- */
  function sky(P, night) {
    var g = '';
    if (night) {
      g += r(0, 0, 100, 70, '#1e2a4a');
      g += c(78, 18, 8, '#f4e9c2');
      for (var i = 0; i < 10; i++) g += c(10 + (i * 9) % 70, 8 + (i * 7) % 28, 1.1, '#fff8d6');
    } else {
      g += r(0, 0, 100, 70, '#b7e0f5');
      g += c(82, 18, 10, P.a);
    }
    g += r(0, 68, 100, 32, night ? '#2f4a3a' : '#8fbf6e');
    return g;
  }
  function kidFigure(P, x, y, scale) {
    scale = scale || 1;
    var g = '<g transform="translate(' + x + ',' + y + ') scale(' + scale + ')">';
    g += c(0, -18, 7, '#f2c9a0', 'stroke="' + P.ink + '" stroke-width="1.4"');
    g += p('M-8 -8 q8 -6 16 0 v18 q-8 6 -16 0 z', P.d, 'stroke="' + P.ink + '" stroke-width="1.4"');
    g += ln(-5, 12, -5, 24, P.ink, 2) + ln(5, 12, 5, 24, P.ink, 2);
    g += eye(-2.5, -19, 1.3) + eye(2.5, -19, 1.3);
    g += p('M-2 -14 q2 2 4 0', 'none', 'stroke="' + P.ink + '" stroke-width="1.2"');
    g += '</g>';
    return g;
  }
  function narratorFigure(P, x, y) {
    var g = '<g transform="translate(' + x + ',' + y + ')">';
    g += c(0, -22, 8, '#f2c9a0', 'stroke="' + P.ink + '" stroke-width="1.5"');
    g += p('M-12 -10 q12 -8 24 0 v22 q-12 8 -24 0 z', P.c, 'stroke="' + P.ink + '" stroke-width="1.5"');
    g += eye(-3, -23, 1.5) + eye(3, -23, 1.5);
    g += p('M-3 -17 q3 3 6 0', 'none', 'stroke="' + P.ink + '" stroke-width="1.3"');
    // open book
    g += p('M-14 6 l14 -4 l14 4 l-14 8 z', '#fff6df', 'stroke="' + P.ink + '" stroke-width="1.4"');
    g += ln(0, 2, 0, 14, P.ink, 1.2);
    g += '</g>';
    return g;
  }
  function listeningChild(opts) {
    opts = opts || {};
    var P = pal(opts.skin || 'young');
    var g = r(0, 0, 100, 100, '#ffe8c2');
    g += r(8, 58, 84, 34, '#f4d9a8', 10, 'stroke="' + P.ink + '" stroke-width="1.5"');
    g += kidFigure(P, 50, 62, 1.35);
    // headphones / listening arcs
    g += p('M34 48 q-10 -6 -6 -18', 'none', 'stroke="' + P.c + '" stroke-width="2.4" stroke-linecap="round"');
    g += p('M66 48 q10 -6 6 -18', 'none', 'stroke="' + P.c + '" stroke-width="2.4" stroke-linecap="round"');
    g += c(32, 48, 5, P.c, 'stroke="' + P.ink + '" stroke-width="1.2"');
    g += c(68, 48, 5, P.c, 'stroke="' + P.ink + '" stroke-width="1.2"');
    return svg(g, { label: 'child listening', cls: 'art art-listen' });
  }

  // Per-unit slide recipes: each entry is a function(P, pageIndex) → svg guts
  var STORY_SCENES = {
    creation: function (P, i) {
      var g = sky(P, i === 0);
      if (i === 0) {
        g += c(50, 36, 14, P.a, 'stroke="' + P.ink + '" stroke-width="2"');
        g += p('M36 36 q14 -16 28 0 q-14 10 -28 0', '#fff6c8', 'opacity=".7"');
      } else if (i === 1) {
        g = sky(P, false);
        g += r(0, 0, 50, 70, '#ffe9a8');
        g += r(50, 0, 50, 70, '#1e2a4a');
        g += c(25, 22, 10, P.a);
        g += c(75, 22, 8, '#f4e9c2');
        g += txt(25, 58, 'DAY', 8, P.ink);
        g += txt(75, 58, 'NIGHT', 8, '#f4e9c2');
      } else if (i === 2) {
        g = sky(P, false);
        g += r(0, 55, 100, 45, '#6db3d8');
        g += r(0, 62, 100, 38, '#8fbf6e');
        g += MOTIF.tree(P);
        g += c(18, 78, 5, P.d) + c(30, 82, 4, P.a);
      } else if (i === 3) {
        g = sky(P, false);
        g += c(78, 18, 11, P.a);
        g += c(22, 22, 7, '#f4e9c2');
        for (var k = 0; k < 10; k++) g += c(10 + k * 9, 12 + (k % 3) * 7, 1.5 + (k % 2), '#fff8d6');
        g += e(28, 78, 10, 5, P.c, 'stroke="' + P.ink + '"') + e(52, 82, 8, 4, P.c, 'stroke="' + P.ink + '"');
        g += c(74, 68, 5, '#fff', 'stroke="' + P.ink + '"');
        g += p('M74 64 q10 -12 4 -2', '#fff', 'stroke="' + P.ink + '" stroke-width="1.4"');
      } else if (i === 4) {
        g = sky(P, false);
        g += kidFigure(P, 38, 70, 1.2);
        g += kidFigure(P, 62, 70, 1.2);
        g += c(50, 28, 10, P.a, 'stroke="' + P.ink + '"');
        g += p('M40 28 q10 -12 20 0 q-10 8 -20 0', '#fff6c8', 'opacity=".75"');
      } else {
        g = sky(P, false);
        g += r(18, 40, 64, 36, '#fff6df', 10, 'stroke="' + P.ink + '" stroke-width="2"');
        g += c(50, 30, 12, P.a);
        g += txt(50, 62, 'REST', 10, P.ink);
      }
      return g;
    },
    garden: function (P, i) {
      var g = sky(P, false);
      g += MOTIF.tree(P);
      if (i === 0) {
        g += c(22, 78, 6, P.d) + c(78, 80, 5, P.a);
      } else if (i === 1) {
        g += kidFigure(P, 50, 78, 1.1);
      } else if (i === 2) {
        g += p('M20 70 q30 -40 60 0', 'none', 'stroke="' + P.b + '" stroke-width="4"');
        g += c(50, 48, 6, P.d, 'stroke="' + P.ink + '"');
      } else {
        g += c(50, 40, 14, P.a, 'opacity=".35"');
        g += kidFigure(P, 50, 78, 1);
      }
      return g;
    },
    noah: function (P, i) {
      var g = '';
      if (i <= 1) {
        g = sky(P, false);
        g += MOTIF.ark(P);
        if (i === 1) {
          g += c(22, 78, 5, '#c9a07a') + c(78, 80, 5, '#ddd'); // animals
          g += e(30, 82, 6, 3, P.c);
        }
      } else if (i === 2) {
        g = r(0, 0, 100, 100, '#4a6d8c');
        g += MOTIF.ark(P);
        g += p('M0 70 q20 8 40 0 q20 -8 40 0 q10 4 20 0 v30 h-100 z', '#3d6b8c');
      } else if (i === 3) {
        g = r(0, 0, 100, 55, '#7aa0c2');
        g += r(0, 50, 100, 50, '#3d6b8c');
        g += MOTIF.ark(P);
        for (var rdrop = 0; rdrop < 12; rdrop++) g += ln(8 + rdrop * 8, 8, 5 + rdrop * 8, 22, '#d7e9f7', 1.6);
      } else if (i === 4) {
        g = sky(P, false);
        g += MOTIF.ark(P);
        g += c(70, 30, 4, '#fff') + p('M70 34 l0 8', P.ink) + c(74, 42, 3, P.b); // bird + leaf
      } else {
        g = sky(P, false);
        g += MOTIF.ark(P);
        // rainbow arcs
        g += p('M10 55 q40 -50 80 0', 'none', 'stroke="#f28482" stroke-width="3" fill="none"');
        g += p('M14 58 q36 -44 72 0', 'none', 'stroke="#f9c74f" stroke-width="3" fill="none"');
        g += p('M18 61 q32 -38 64 0', 'none', 'stroke="#90be6d" stroke-width="3" fill="none"');
      }
      return g;
    },
    'abraham-stars': function (P, i) {
      var g = sky(P, i >= 1);
      if (i === 0) g += kidFigure(P, 50, 78, 1.15);
      if (i >= 1) {
        for (var s = 0; s < 18; s++) g += c(8 + (s * 17) % 90, 10 + (s * 11) % 40, 1.3 + (s % 3) * 0.4, '#fff8d6');
      }
      if (i >= 2) g += kidFigure(P, 50, 80, 1.1);
      if (i >= 3) g += c(50, 28, 10, P.a, 'opacity=".4"');
      return g;
    },
    samuel: function (P, i) {
      var g = sky(P, i >= 1 && i <= 3);
      g += r(20, 40, 60, 40, '#e8dcc6', 6, 'stroke="' + P.ink + '" stroke-width="2"'); // room / temple
      g += kidFigure(P, 50, 70, 1.1);
      if (i >= 1) {
        // voice waves
        g += p('M20 28 q15 -10 30 0', 'none', 'stroke="' + P.a + '" stroke-width="2.5" fill="none"');
        g += p('M25 34 q12 -8 24 0', 'none', 'stroke="' + P.a + '" stroke-width="2" fill="none"');
      }
      if (i >= 4) g += c(50, 24, 8, P.a, 'opacity=".5"');
      return g;
    },
    'david-shepherd': function (P, i) {
      var g = sky(P, false);
      g += r(0, 70, 100, 30, '#9ccf7a');
      // sheep
      g += c(30, 78, 7, '#fff') + c(28, 74, 4, '#fff') + c(50, 80, 6, '#fff') + c(70, 78, 7, '#fff');
      if (i >= 1) g += kidFigure(P, 55, 68, 1);
      if (i >= 2) {
        g += ln(62, 60, 78, 48, P.ink, 2);
        g += c(80, 46, 3, P.a); // sling stone path
      }
      if (i >= 3) g += MOTIF.star(P);
      return g;
    },
    jonah: function (P, i) {
      var g = '';
      if (i === 0) {
        g = sky(P, false);
        g += r(0, 60, 100, 40, '#6db3d8');
        g += kidFigure(P, 40, 70, 1);
        g += p('M55 55 q30 0 35 20', 'none', 'stroke="' + P.ink + '" stroke-width="2"'); // path away
      } else if (i === 1 || i === 2) {
        g = sky(P, false);
        g += r(0, 55, 100, 45, '#3d6b8c');
        g += p('M20 60 q20 -18 40 0 l-6 14 q-14 4 -28 0 z', '#a9743f', 'stroke="' + P.ink + '"'); // boat
        if (i === 2) for (var w = 0; w < 5; w++) g += p('M' + (10 + w * 18) + ' 70 q8 8 16 0', 'none', 'stroke="#d7e9f7" stroke-width="2"');
      } else if (i === 3 || i === 4) {
        g = r(0, 0, 100, 100, '#1b4a5e');
        g += MOTIF.fish(P);
        if (i === 4) g += kidFigure(P, 48, 52, 0.7);
      } else {
        g = sky(P, false);
        g += r(0, 60, 100, 40, '#6db3d8');
        g += kidFigure(P, 50, 70, 1.1);
        g += c(50, 28, 10, P.a, 'opacity=".45"');
      }
      return g;
    },
    'daniel-lions': function (P, i) {
      var g = '';
      if (i <= 1) {
        g = sky(P, false);
        g += r(25, 35, 50, 45, '#d9cbb3', 4, 'stroke="' + P.ink + '"');
        g += kidFigure(P, 50, 62, 1);
        if (i === 1) g += p('M20 30 q15 -12 30 0', 'none', 'stroke="' + P.a + '" stroke-width="2.5" fill="none"');
      } else if (i === 2 || i === 3) {
        g = r(0, 0, 100, 100, '#3a342c');
        g += r(15, 20, 70, 70, '#2a2520', 8, 'stroke="' + P.ink + '" stroke-width="2"'); // den
        g += kidFigure(P, 50, 55, 1);
        g += MOTIF.lion(P);
        if (i === 3) {
          // calm hearts
          g += c(28, 30, 3, P.d) + c(72, 28, 3, P.d);
        }
      } else {
        g = sky(P, false);
        g += kidFigure(P, 50, 70, 1.15);
        g += c(50, 28, 12, P.a, 'opacity=".4"');
        g += MOTIF.star(P);
      }
      return g;
    },
    lights: function (P, i) {
      var g = sky(P, i % 2 === 1);
      g += c(50, 40, 16, P.a);
      for (var n = 0; n < 6; n++) g += c(20 + n * 12, 18, 1.5, '#fff8d6');
      return g;
    },
    rainbow: function (P, i) {
      var g = sky(P, false);
      g += p('M10 60 q40 -55 80 0', 'none', 'stroke="#f28482" stroke-width="4" fill="none"');
      g += p('M14 63 q36 -48 72 0', 'none', 'stroke="#f9c74f" stroke-width="4" fill="none"');
      g += p('M18 66 q32 -42 64 0', 'none', 'stroke="#90be6d" stroke-width="4" fill="none"');
      g += p('M22 69 q28 -36 56 0', 'none', 'stroke="#577590" stroke-width="4" fill="none"');
      if (i >= 2) g += kidFigure(P, 50, 78, 1);
      return g;
    }
  };

  // Gentle cartoon motion helpers (SMIL) — slow, soft, not sharp
  function bob(inner, dur, amp) {
    dur = dur || 3.2; amp = amp || 1.4;
    return '<g class="motion-bob">' + inner +
      '<animateTransform attributeName="transform" type="translate" values="0 0; 0 -' + amp + '; 0 0; 0 ' + (amp * 0.6) + '; 0 0" keyTimes="0;0.25;0.5;0.75;1" dur="' + dur + 's" repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.2 1;0.4 0 0.2 1;0.4 0 0.2 1;0.4 0 0.2 1"/></g>';
  }
  function sway(inner, dur, deg) {
    dur = dur || 4.5; deg = deg || 2.2;
    return '<g class="motion-sway" transform-origin="50 80">' + inner +
      '<animateTransform attributeName="transform" type="rotate" values="-' + deg + ' 50 80; ' + deg + ' 50 80; -' + deg + ' 50 80" dur="' + dur + 's" repeatCount="indefinite" calcMode="spline" keySplines="0.37 0 0.63 1;0.37 0 0.63 1"/></g>';
  }
  function drift(inner, dur, dx) {
    dur = dur || 6; dx = dx || 2;
    return '<g class="motion-drift">' + inner +
      '<animateTransform attributeName="transform" type="translate" values="0 0; ' + dx + ' 0; 0 0; -' + dx + ' 0; 0 0" dur="' + dur + 's" repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.2 1;0.4 0 0.2 1;0.4 0 0.2 1;0.4 0 0.2 1"/></g>';
  }
  function twinkle(cx, cy, r, color, delay) {
    return '<circle cx="' + cx + '" cy="' + cy + '" r="' + r + '" fill="' + (color || '#fff8d6') + '" opacity="0.85">' +
      '<animate attributeName="opacity" values="0.35;1;0.35" dur="2.8s" begin="' + (delay || 0) + 's" repeatCount="indefinite"/>' +
      '<animate attributeName="r" values="' + r + ';' + (r * 1.35) + ';' + r + '" dur="2.8s" begin="' + (delay || 0) + 's" repeatCount="indefinite"/></circle>';
  }

  function storyScene(unitId, pageIndex, opts) {
    opts = opts || {};
    var P = pal(opts.skin || 'young');
    var fn = STORY_SCENES[unitId];
    var g = '';
    // soft rounded frame
    g += r(1, 1, 98, 98, P.bg, 12, 'stroke="' + P.ink + '" stroke-width="1.6"');
    var body = '';
    if (fn) {
      body = fn(P, pageIndex || 0);
    } else {
      body = sky(P, false);
      body += '<g transform="translate(50,48) scale(0.9) translate(-50,-50)">' + (MOTIF.scroll(P)) + '</g>';
      body += kidFigure(P, 78, 78, 0.85);
    }
    // Soft ambient motion over the whole scene (slow breathe + tiny sway)
    if (opts.animate !== false) {
      g += bob(sway(body, 5.5, 1.6), 4.2, 1.1);
      // floating sparkles
      g += twinkle(18, 16, 1.2, '#fff6c8', 0);
      g += twinkle(82, 22, 1.0, '#ffe0a0', 0.7);
      g += twinkle(30, 28, 0.9, '#fff', 1.4);
    } else {
      g += body;
    }
    // page pips
    var total = opts.total || 1;
    var pi = pageIndex || 0;
    for (var d = 0; d < Math.min(total, 8); d++) {
      g += c(50 - (Math.min(total, 8) - 1) * 4 + d * 8, 94, d === pi ? 2.6 : 1.5, d === pi ? P.a : '#cfc3b0');
    }
    return svg(g, { vb: '0 0 100 100', label: 'story picture', cls: 'art art-story-scene soft-cartoon' });
  }

  /* ---------- logo: a little ship under a cross-sail ---------- */
  function logo(P0) {
    var P = pal(P0 || 'mid');
    var g = '';
    g += p('M14 62 q36 20 72 0 l-8 16 q-28 8 -56 0 z', '#3d6b8c', 'stroke="' + P.ink + '" stroke-width="2"');
    g += ln(50, 60, 50, 18, P.ink, 3.2);
    g += ln(38, 30, 62, 30, P.ink, 3.2);
    g += p('M50 20 q18 12 2 26 z', P.a, 'stroke="' + P.ink + '" stroke-width="1.6"');
    g += p('M50 20 q-18 12 -2 26 z', P.d, 'stroke="' + P.ink + '" stroke-width="1.6"');
    g += p('M12 86 q9 -6 18 0 q9 6 18 0 q9 -6 18 0 q9 6 18 0', 'none', 'stroke="' + P.c + '" stroke-width="2.6"');
    return svg(g, { label: 'Saul’s Podship', cls: 'art art-logo' });
  }

  /* ---------- home base garden ---------- */
  function garden(slots, opts) {
    opts = opts || {};
    var P = pal(opts.skin);
    var g = '<defs><linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#cfe8f5"/><stop offset="1" stop-color="#f4f0e2"/></linearGradient></defs>';
    g += r(0, 0, 100, 62, 'url(#sky)');
    g += r(0, 60, 100, 40, '#a9c98d');
    g += c(84, 18, 9, P.a);
    var cells = [];
    for (var i = 0; i < 12; i++) {
      var cx = 8 + (i % 4) * 22, cy = 42 + Math.floor(i / 4) * 18;
      var item = opts.items && opts.items[i];
      g += '<g class="slot" data-slot="s' + i + '" style="cursor:pointer">' +
        r(cx, cy, 20, 16, item ? 'rgba(255,255,255,.55)' : 'rgba(255,255,255,.22)', 4, 'stroke="' + P.ink + '" stroke-width=".9" stroke-dasharray="' + (item ? '' : '3 3') + '"') +
        (item ? '<g transform="translate(' + (cx + 1) + ',' + (cy - 4) + ') scale(.19)">' + (MOTIF[item] ? MOTIF[item](P, 1) : MOTIF.tree(P, 1)) + '</g>' : '') +
        '</g>';
      cells.push(cx);
    }
    return svg(g, { label: 'your garden', cls: 'art art-garden' });
  }

  /* ---------- charts (inline SVG, no libraries) ---------- */
  function bars(data, opts) {
    opts = opts || {};
    var W = opts.w || 320, H = opts.h || 120, pad = 24;
    var max = Math.max(1, Math.max.apply(null, data.map(function (d) { return d.v || 0; })));
    var bw = (W - pad * 2) / Math.max(1, data.length);
    var g = '';
    data.forEach(function (d, i) {
      var h = Math.round(((d.v || 0) / max) * (H - 40));
      var x = pad + i * bw;
      g += r(x + bw * 0.16, H - 22 - h, bw * 0.68, Math.max(2, h), d.color || '#f2a13b', 4);
      g += txt(x + bw / 2, H - 8, d.label, 9, '#6b645c');
      if (d.v) g += txt(x + bw / 2, H - 26 - h, String(d.v), 9, '#6b645c');
    });
    g += ln(pad - 4, H - 22, W - pad + 4, H - 22, '#cfc7bb', 1.4);
    return svg(g, { vb: '0 0 ' + W + ' ' + H, label: opts.label || 'chart', cls: 'art chart' });
  }
  function donut(pct, opts) {
    opts = opts || {};
    var R = 38, C = 2 * Math.PI * R;
    var v = Math.max(0, Math.min(100, pct || 0));
    var g = c(50, 50, R, 'none', 'stroke="#eee6da" stroke-width="12"') +
      '<circle cx="50" cy="50" r="' + R + '" fill="none" stroke="' + (opts.color || '#7bbf5a') + '" stroke-width="12" stroke-linecap="round" transform="rotate(-90 50 50)" stroke-dasharray="' + (C * v / 100) + ' ' + C + '"/>' +
      txt(50, 54, v + '%', 16, '#33302b');
    return svg(g, { label: opts.label || (v + ' per cent'), cls: 'art chart' });
  }
  function spark(values, opts) {
    opts = opts || {};
    var W = 300, H = 60, max = Math.max(1, Math.max.apply(null, values.concat([1])));
    var step = (W - 10) / Math.max(1, values.length - 1);
    var pts = values.map(function (v, i) { return (5 + i * step) + ',' + (H - 6 - (v / max) * (H - 14)); }).join(' ');
    return svg('<polyline points="' + pts + '" fill="none" stroke="' + (opts.color || '#577590') + '" stroke-width="2.6" stroke-linecap="round"/>', { vb: '0 0 ' + W + ' ' + H, label: 'trend', cls: 'art chart' });
  }

  /* ---------- colouring page (stroke only, print size 816x1056) ---------- */
  function colouringPage(motifName, title, opts) {
    var P = pal('old');
    var name = MOTIF[motifName] ? motifName : 'scroll';
    var W = 816, H = 1056;
    var g = '';
    g += r(20, 20, W - 40, H - 40, 'none', 10, 'stroke="#111" stroke-width="3"');
    g += '<g transform="translate(408,120)"><text x="0" y="0" text-anchor="middle" font-size="34" font-family="Georgia, serif">' + esc(title || '') + '</text></g>';
    // the drawing is the point of a colouring page: it gets the whole middle of the sheet
    g += '<g transform="translate(408,548) scale(7.6) translate(-50,-50)">' + lineVersion(name) + '</g>';
    g += '<g transform="translate(408,940)"><text x="0" y="0" text-anchor="middle" font-size="20" font-family="Georgia, serif">Name: ______________________</text></g>';
    return svg(g, { vb: '0 0 ' + W + ' ' + H, label: 'colouring page', cls: 'art colouring' });
  }
  // rebuild motif art with black outlines and no fills for colouring
  function lineVersion(name) {
    var stub = { ink: '#111', line: 3, bg: '#fff', a: 'none', b: '#fff', c: '#fff', d: '#fff' };
    var fn = MOTIF[name] || MOTIF.scroll;
    var inner = fn(stub, 1)
      // no fills at all: on a colouring page every region has to stay visible,
      // and a filled shape on top of another one hides its outline
      .replace(/fill="[^"]*"/g, 'fill="none"')
      .replace(/stroke="[^"]*"/g, 'stroke="#111"')
      // drop per-shape widths so the single inherited width below survives the page scale
      .replace(/stroke-width="[^"]*"/g, '')
      .replace(/stroke-dasharray="([^"]*)"/g, 'stroke-dasharray="$1" ');
    return '<g stroke-width="0.36">' + inner + '</g>';
  }

  /* ---------- reaction stickers (leaderboard-only social) ---------- */
  var REACT = {
    clap: 'M28 62 q-8 -22 8 -30 q6 -2 6 6 l0 16 M72 62 q8 -22 -8 -30 q-6 -2 -6 6 l0 16',
    thumbs: 'M40 70 v-28 q0 -12 10 -12 q4 0 4 8 l0 8 h14 q8 0 6 10 l-4 16 q-2 6 -8 6 h-22 z',
    wave: 'M22 58 q8 -10 16 0 q8 10 16 0 q8 -10 16 0 q8 10 8 10',
    heart: 'M50 76 C22 58 26 32 42 32 q8 0 8 8 q0 -8 8 -8 c16 0 20 26 -8 44 z',
    highfive: 'M30 68 l0 -24 q0 -6 6 -6 q6 0 6 6 l0 -12 q0 -6 6 -6 q6 0 6 6 l0 -8 q0 -6 6 -6 q6 0 6 6 l0 10 q6 -4 8 4 l2 22 q2 10 -8 10 h-20 q-8 0 -10 -8 z',
    dance: 'M50 26 m-8 0 a8 8 0 1 0 16 0 a8 8 0 1 0 -16 0 M50 36 l0 22 M50 40 l-16 -8 M50 40 l16 -6 M50 58 l-14 20 M50 58 l14 18',
    bravo: 'M30 74 q-6 -26 8 -34 l4 12 l0 -28 q0 -6 6 -6 q6 0 6 6 l0 22 l6 -18 q2 -6 8 -2 q4 4 2 10 l-4 20 l6 -12 q4 -4 8 0 q2 4 0 10 l-8 22 q-4 12 -16 12 h-14 q-10 0 -14 -8 z',
    praise: 'M50 20 q10 14 0 26 q-10 -12 0 -26 M30 78 h40 M50 46 v32'
  };
  function reaction(id) {
    var d = REACT[id] || REACT.clap;
    return svg('<path d="' + d + '" fill="none" stroke="currentColor" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>', { label: id, cls: 'art art-react' });
  }

  /* ---------- progress ring for the child header ---------- */
  function ring(pct, label) {
    var R = 16, C = 2 * Math.PI * R;
    var g = '<circle cx="20" cy="20" r="' + R + '" fill="none" stroke="rgba(255,255,255,.4)" stroke-width="5"/>' +
      '<circle cx="20" cy="20" r="' + R + '" fill="none" stroke="#fff" stroke-width="5" stroke-linecap="round" transform="rotate(-90 20 20)" stroke-dasharray="' + (C * Math.min(100, pct) / 100) + ' ' + C + '"/>' +
      '<text x="20" y="24" text-anchor="middle" font-size="11" fill="#3a352e" font-weight="700">' + esc(label != null ? label : pct) + '</text>';
    return svg(g, { vb: '0 0 40 40', label: 'progress', cls: 'art art-ring' });
  }

  var Art = {
    PAL: PAL, pal: pal, companion: companion, motif: motif, MOTIF: MOTIF, logo: logo,
    garden: garden, bars: bars, donut: donut, spark: spark, colouringPage: colouringPage,
    reaction: reaction, ring: ring, storyScene: storyScene, listeningChild: listeningChild,
    esc: esc
  };
  if (typeof module !== 'undefined' && module.exports) module.exports = Art;
  root.SS_Art = Art;
})(typeof window !== 'undefined' ? window : (typeof globalThis !== 'undefined' ? globalThis : this));
