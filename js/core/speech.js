/* =====================================================================
   Narration + read-along word highlighting.

   Paths:
     1. Matching-language recorded MP3
     2. Device speechSynthesis when a REAL voice for that language exists
     3. Online mother-tongue TTS via /api/tts (blob fetch — reliable on mobile)
     4. Timed highlight if offline / blocked

   Mobile rules:
     - audio.play() needs a user gesture the first time (Listen tap)
     - Do not auto-start cloud narration without a gesture (chips only change text)
     - Fetch→blob→play avoids flaky remote <audio src> + poisoned element state
     - Never speak English audio over ur/hi/ar text
   ===================================================================== */
(function (root) {
  'use strict';

  var synth = root.speechSynthesis || null;
  var queue = null;
  var gen = 0;
  var unlockDone = false;
  var blobCache = {}; // key -> { url, ts }
  var BLOB_MAX = 80;

  var Speech = {
    supported: !!(synth || root.Audio),
    voices: [],
    rate: 1,
    enabled: true,
    lang: 'en',
    voiceURI: null,
    audioEl: null,
    WPM: 150,
    lastError: null,
    lastMode: null,
    cloudEnabled: true,
    needsGesture: false, // set true when cloud auto-play was blocked

    init: function () {
      if (!synth) return;
      var grab = function () {
        try { Speech.voices = synth.getVoices() || []; } catch (e) { Speech.voices = []; }
      };
      grab();
      try { synth.onvoiceschanged = grab; } catch (e) { }
      setTimeout(grab, 250);
      setTimeout(grab, 800);
      setTimeout(grab, 2000);
    },

    hasAudioFor: function (unit, lang, key) {
      if (!unit) return null;
      var l = (lang === 'ur' || lang === 'hi' || lang === 'ar') ? lang : 'en';
      var pack = root.SS_AUDIO && root.SS_AUDIO[unit.id];
      if (pack && pack[l]) {
        var fromPack = pack[l];
        if (key && fromPack[key]) return fromPack[key];
        if (!key) {
          var first = Object.keys(fromPack)[0];
          if (first) return fromPack[first];
        }
      }
      var hand = unit.audio;
      if (hand) {
        if (typeof hand === 'string') return l === 'en' && !key ? hand : null;
        var m = hand[l];
        if (m && key && m[key]) return m[key];
        if (m && !key) {
          var fk = Object.keys(m)[0];
          if (fk) return m[fk];
        }
      }
      return null;
    },

    stop: function () {
      gen++;
      if (queue && queue.timer) { clearTimeout(queue.timer); queue.timer = null; }
      if (queue && queue.launchTimer) { clearTimeout(queue.launchTimer); queue.launchTimer = null; }
      if (queue && queue.abort) {
        try { queue.abort.abort(); } catch (eA) { }
      }
      var a = Speech.audioEl;
      if (a) {
        try {
          a.onended = null;
          a.onerror = null;
          a.ontimeupdate = null;
          a.oncanplay = null;
          a.pause();
        } catch (e) { }
        // Do NOT removeAttribute('src') + load() — that poisons some WebViews
        try {
          a.src = 'data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAESsAACJWAAACABAAZGF0YQAAAAA=';
          a.pause();
        } catch (e2) { }
      }
      if (synth) {
        try { synth.cancel(); } catch (e) { }
        try { if (synth.paused) synth.resume(); } catch (e2) { }
      }
      queue = null;
    },

    ensureOn: function () {
      Speech.enabled = true;
      if (!Speech.voices || !Speech.voices.length) Speech.init();
      if (synth) {
        try { if (synth.paused) synth.resume(); } catch (e) { }
      }
    },

    unlock: function () {
      if (unlockDone) return;
      unlockDone = true;
      try {
        if (synth) {
          var u = new SpeechSynthesisUtterance(' ');
          u.volume = 0;
          u.onend = u.onerror = function () { };
          synth.speak(u);
          synth.cancel();
        }
      } catch (e) { }
      try {
        var a = new Audio();
        a.muted = true;
        a.src = 'data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAESsAACJWAAACABAAZGF0YQAAAAA=';
        var p = a.play();
        if (p && p.then) p.then(function () { try { a.pause(); } catch (e4) { } }).catch(function () { });
      } catch (e2) { }
    },

    pause: function () {
      try { if (synth) synth.pause(); } catch (e) { }
      if (Speech.audioEl) { try { Speech.audioEl.pause(); } catch (e) { } }
    },
    resume: function () {
      try { if (synth) synth.resume(); } catch (e) { }
      if (Speech.audioEl) { try { Speech.audioEl.play(); } catch (e) { } }
    },

    tokenize: function (text) {
      var out = [], re = /\S+/g, m;
      while ((m = re.exec(text))) out.push({ text: m[0], start: m.index, end: m.index + m[0].length });
      return out;
    },

    bcp47: function (code) {
      return ({ en: 'en-GB', ur: 'ur-PK', hi: 'hi-IN', ar: 'ar-SA' })[code] || 'en-GB';
    },
    cloudTl: function (code) {
      return ({ en: 'en', ur: 'ur', hi: 'hi', ar: 'ar' })[code] || 'en';
    },
    kidProsody: function (code) {
      var base = Speech.rate || 1;
      if (code === 'ur' || code === 'hi' || code === 'ar') {
        return { rate: Math.max(0.72, Math.min(1.05, base * 0.9)), pitch: 1.06 };
      }
      return { rate: base, pitch: 1.02 };
    },

    voiceMatchesLang: function (voice, langCode, opts) {
      opts = opts || {};
      if (!voice) return false;
      var code = String(langCode || 'en').toLowerCase().split('-')[0];
      var vlang = String(voice.lang || '').toLowerCase();
      var hay = (vlang + ' ' + (voice.name || '')).toLowerCase();
      if (code === 'en') return /^en\b/.test(vlang) || /english/.test(hay);
      if (code === 'ur') {
        if (/^ur\b/.test(vlang) || /urdu/.test(hay)) return true;
        if (opts.allowSibling && (/^hi\b/.test(vlang) || /hindi/.test(hay))) return true;
        return false;
      }
      if (code === 'hi') {
        if (/^hi\b/.test(vlang) || /hindi/.test(hay)) return true;
        if (opts.allowSibling && (/^ur\b/.test(vlang) || /urdu/.test(hay))) return true;
        return false;
      }
      if (code === 'ar') {
        return /^ar\b/.test(vlang) || /arabic|naayf|maged|laila|tarik|hoda|salma/.test(hay);
      }
      return vlang.indexOf(code) === 0;
    },

    pickVoice: function (langHint, opts) {
      opts = opts || {};
      if (!Speech.voices || !Speech.voices.length) {
        try { if (synth) Speech.voices = synth.getVoices() || []; } catch (e) { }
      }
      if (!Speech.voices || !Speech.voices.length) return null;
      var code = String(langHint || Speech.lang || 'en').toLowerCase().split('-')[0];

      if (Speech.voiceURI) {
        var forced = Speech.voices.filter(function (v) { return v.voiceURI === Speech.voiceURI; })[0];
        if (forced && (code === 'en' || Speech.voiceMatchesLang(forced, code, { allowSibling: true }))) {
          return forced;
        }
      }

      var prefs = {
        en: [/^en-GB/i, /^en-IN/i, /^en-AU/i, /^en-US/i, /^en\b/i, /english/i],
        ur: [/^ur\b/i, /urdu/i],
        hi: [/^hi\b/i, /hindi/i, /veena|kalpana|lekha/i],
        ar: [/^ar\b/i, /arabic/i, /naayf|maged|laila|tarik|hoda|salma/i]
      };
      if (opts.allowSibling) {
        if (code === 'ur') prefs.ur = prefs.ur.concat([/^hi\b/i, /hindi/i]);
        if (code === 'hi') prefs.hi = prefs.hi.concat([/^ur\b/i, /urdu/i]);
      }
      var tests = prefs[code] || prefs.en;
      var i, list, soft, hay;
      for (i = 0; i < tests.length; i++) {
        list = Speech.voices.filter(function (vv) {
          hay = ((vv.lang || '') + ' ' + (vv.name || ''));
          return tests[i].test(hay);
        });
        if (!list.length) continue;
        soft = list.filter(function (vv) {
          return /female|woman|girl|zira|samantha|veena|kalpana|lekha|nicky|anya|helen|google UK.*F|neural|natural/i.test(vv.name || '');
        });
        return soft[0] || list[0];
      }
      if (code === 'en') {
        return Speech.voices.filter(function (vv) {
          return /^en/i.test(vv.lang || '') || /english/i.test(vv.name || '');
        })[0] || Speech.voices[0] || null;
      }
      return null;
    },

    voicesFor: function (langCode) {
      if (!Speech.voices || !Speech.voices.length) {
        try { if (synth) Speech.voices = synth.getVoices() || []; } catch (e) { }
      }
      var code = String(langCode || 'en').toLowerCase().split('-')[0];
      return (Speech.voices || []).filter(function (v) {
        return Speech.voiceMatchesLang(v, code, { allowSibling: false });
      });
    },

    hasNativeVoice: function (langCode) {
      return Speech.voicesFor(langCode).length > 0;
    },

    online: function () {
      try { return root.navigator ? root.navigator.onLine !== false : true; } catch (e) { return true; }
    },

    /* Mother-tongue cloud is more reliable than missing/broken device packs. */
    usesCloud: function (langCode) {
      if (!Speech.cloudEnabled || !Speech.online()) return false;
      var code = String(langCode || 'en').toLowerCase().split('-')[0];
      if (code === 'en') return !Speech.hasNativeVoice('en');
      // Always prefer cloud for ur/hi/ar on web — device packs are rare and flaky.
      // If a real native voice exists, still allow device first only when forceDevice.
      return true;
    },

    chunkText: function (text, maxLen) {
      maxLen = maxLen || 140;
      text = String(text || '').replace(/\s+/g, ' ').trim();
      if (!text) return [];
      if (text.length <= maxLen) return [text];
      var parts = [];
      var re = /[^۔.!?؟\n]+[۔.!?؟\n]*/g;
      var bits = text.match(re) || [text];
      var buf = '';
      for (var i = 0; i < bits.length; i++) {
        var b = bits[i].trim();
        if (!b) continue;
        if ((buf + ' ' + b).trim().length <= maxLen) {
          buf = (buf ? buf + ' ' : '') + b;
        } else {
          if (buf) parts.push(buf);
          if (b.length <= maxLen) {
            buf = b;
          } else {
            var words = b.split(/\s+/);
            buf = '';
            for (var w = 0; w < words.length; w++) {
              if ((buf + ' ' + words[w]).trim().length <= maxLen) {
                buf = (buf ? buf + ' ' : '') + words[w];
              } else {
                if (buf) parts.push(buf);
                buf = words[w];
              }
            }
          }
        }
      }
      if (buf) parts.push(buf);
      return parts.length ? parts : [text.slice(0, maxLen)];
    },

    cloudUrl: function (text, langCode) {
      var tl = Speech.cloudTl(langCode);
      var isNative = false;
      try {
        if (root.Capacitor && root.Capacitor.isNativePlatform && root.Capacitor.isNativePlatform()) {
          isNative = true;
        }
      } catch (e) { }
      try {
        if (!isNative && root.location && root.location.protocol !== 'file:' && root.location.host) {
          return '/api/tts?lang=' + encodeURIComponent(tl) + '&q=' + encodeURIComponent(text);
        }
      } catch (e2) { }
      return 'https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&tl=' +
        encodeURIComponent(tl) + '&q=' + encodeURIComponent(text);
    },

    cacheKey: function (text, langCode) {
      return Speech.cloudTl(langCode) + '|' + String(text);
    },

    putBlob: function (key, url) {
      try {
        var keys = Object.keys(blobCache);
        if (keys.length >= BLOB_MAX) {
          var oldest = keys.sort(function (a, b) { return (blobCache[a].ts || 0) - (blobCache[b].ts || 0); })[0];
          if (oldest) {
            try { root.URL.revokeObjectURL(blobCache[oldest].url); } catch (e) { }
            delete blobCache[oldest];
          }
        }
        blobCache[key] = { url: url, ts: Date.now() };
      } catch (e2) { }
    },

    /* Fetch TTS as blob (with retries). Same-origin /api/tts is reliable. */
    fetchCloudBlob: function (text, langCode, signal) {
      var key = Speech.cacheKey(text, langCode);
      if (blobCache[key] && blobCache[key].url) {
        return Promise.resolve(blobCache[key].url);
      }
      var url = Speech.cloudUrl(text, langCode);
      var attempts = 0;

      function once() {
        attempts++;
        return fetch(url, {
          method: 'GET',
          credentials: 'omit',
          cache: 'force-cache',
          signal: signal
        }).then(function (res) {
          if (!res.ok) throw new Error('tts-http-' + res.status);
          return res.blob();
        }).then(function (blob) {
          if (!blob || !blob.size) throw new Error('tts-empty');
          // Reject JSON error bodies masquerading as 200
          if (blob.type && /json|text/.test(blob.type) && blob.size < 500) {
            throw new Error('tts-not-audio');
          }
          var obj = root.URL.createObjectURL(blob);
          Speech.putBlob(key, obj);
          return obj;
        }).catch(function (err) {
          if (signal && signal.aborted) throw err;
          if (attempts < 3) {
            return new Promise(function (resolve, reject) {
              setTimeout(function () {
                once().then(resolve, reject);
              }, 250 * attempts);
            });
          }
          throw err;
        });
      }
      return once();
    },

    getAudioEl: function () {
      if (!Speech.audioEl) Speech.audioEl = new Audio();
      return Speech.audioEl;
    },

    playBlobUrl: function (blobUrl, rate) {
      return new Promise(function (resolve, reject) {
        var a = Speech.getAudioEl();
        try {
          a.onended = null;
          a.onerror = null;
          a.ontimeupdate = null;
          a.oncanplay = null;
          a.pause();
        } catch (e0) { }
        var settled = false;
        var done = function (err) {
          if (settled) return;
          settled = true;
          a.onended = null;
          a.onerror = null;
          if (err) reject(err);
          else resolve();
        };
        a.onended = function () { done(null); };
        a.onerror = function () { done(new Error('audio-error')); };
        try { a.playbackRate = rate || 1; } catch (e1) { }
        a.src = blobUrl;
        var p;
        try { p = a.play(); } catch (e2) { done(e2); return; }
        if (p && typeof p.then === 'function') {
          p.then(function () { /* playing */ }, function (err) { done(err || new Error('play-rejected')); });
        }
      });
    },

    /* Play cloud narration: fetch blobs then play sequentially. */
    speakWithCloud: function (el, text, opts, state, setIdx, finish, stillMine) {
      var langCode = String(opts.langCode || Speech.lang || 'en').toLowerCase().split('-')[0];
      var chunks = Speech.chunkText(text, 140);
      if (!chunks.length) { finish(); return { mode: 'none' }; }
      var rate = Math.max(0.75, Math.min(1.25, opts.rate != null ? opts.rate : (Speech.rate || 1)));
      Speech.lastMode = 'cloud';
      Speech.needsGesture = false;

      var ac = null;
      try { ac = new AbortController(); } catch (e) { }
      state.abort = ac;
      var signal = ac && ac.signal;
      var words = state.words;
      var ci = 0;

      function highlightForChunk(frac) {
        if (!stillMine()) return;
        var chunkWords = Math.max(1, Math.ceil(words.length / chunks.length));
        var startW = ci * chunkWords;
        var endW = Math.min(words.length, (ci === chunks.length - 1) ? words.length : startW + chunkWords);
        var wi = startW + Math.floor(frac * Math.max(1, endW - startW));
        setIdx(Math.max(startW, Math.min(endW - 1, wi)));
      }

      function playNext() {
        if (!stillMine()) return;
        if (ci >= chunks.length) {
          finish();
          return;
        }
        var piece = chunks[ci];
        Speech.fetchCloudBlob(piece, langCode, signal).then(function (blobUrl) {
          if (!stillMine()) return;
          var a = Speech.getAudioEl();
          a.ontimeupdate = function () {
            if (!stillMine()) return;
            var frac = (a.duration && a.duration > 0) ? (a.currentTime / a.duration) : 0;
            highlightForChunk(frac);
          };
          return Speech.playBlobUrl(blobUrl, rate).then(function () {
            if (!stillMine()) return;
            highlightForChunk(1);
            ci++;
            // Small gap between chunks — keeps rate-limit happier
            setTimeout(function () { playNext(); }, 120);
          });
        }).catch(function (err) {
          if (!stillMine()) return;
          Speech.lastError = String(err && err.message || err);
          // play() rejected without gesture
          if (/NotAllowedError|play-rejected|user didn't interact|not allowed/i.test(Speech.lastError)) {
            Speech.needsGesture = true;
            Speech.lastMode = 'needs-gesture';
            finish();
            return;
          }
          // Skip bad chunk once; if first chunk fails hard, stop
          if (ci === 0 && chunks.length === 1) {
            finish();
            return;
          }
          ci++;
          setTimeout(function () { playNext(); }, 180);
        });
      }

      playNext();
      return { mode: 'cloud', chunks: chunks.length };
    },

    speakWithDevice: function (el, text, opts, state, setIdx, finish, stillMine) {
      if (!synth) return null;
      var langCode = String(opts.langCode || Speech.lang || 'en').toLowerCase().split('-')[0];
      var voice = Speech.pickVoice(langCode, { allowSibling: !!opts.allowSibling });
      if (langCode !== 'en' && !voice) return null;

      var pro = Speech.kidProsody(langCode);
      var u = new SpeechSynthesisUtterance(String(text));
      u.lang = opts.lang || (voice && voice.lang) || Speech.bcp47(langCode);
      u.rate = opts.rate != null ? opts.rate : pro.rate;
      u.pitch = opts.pitch != null ? opts.pitch : pro.pitch;
      u.volume = 1;
      if (voice) {
        try { u.voice = voice; } catch (e) { }
        if (voice.lang) {
          try { u.lang = voice.lang; } catch (e2) { }
        }
      }
      var gotBoundary = false;
      u.onboundary = function (ev) {
        if (!stillMine()) return;
        if (ev && ev.name && ev.name !== 'word') return;
        gotBoundary = true;
        var ch = ev && (ev.charIndex != null ? ev.charIndex : 0);
        var idx = 0;
        var words = state.words;
        for (var k = 0; k < words.length; k++) {
          if (words[k].start <= ch) idx = k; else break;
        }
        setIdx(idx);
      };
      u.onend = function () { if (stillMine()) finish(); };
      u.onerror = function (ev) {
        if (!stillMine()) return;
        var err = (ev && ev.error) || '';
        Speech.lastError = err || 'error';
        if (err === 'interrupted' || err === 'canceled' || err === 'cancelled') return;
        if (Speech.cloudEnabled && Speech.online() && !opts._usedCloud) {
          opts._usedCloud = true;
          Speech.speakWithCloud(el, text, opts, state, setIdx, finish, stillMine);
          return;
        }
        var i2 = 0;
        var step2 = function () {
          if (!stillMine()) return;
          if (i2 >= state.words.length) { finish(); return; }
          setIdx(i2++);
          state.timer = setTimeout(step2, (60000 / Speech.WPM) / Math.max(0.5, Speech.rate || 1));
        };
        step2();
      };

      try { if (synth.paused) synth.resume(); } catch (e0) { }
      try { synth.speak(u); } catch (e) {
        Speech.lastError = String(e && e.message || e);
        return null;
      }
      try { if (synth.paused) synth.resume(); } catch (e2) { }

      setTimeout(function () {
        if (!stillMine() || gotBoundary) return;
        var j = 0;
        var stepH = function () {
          if (!stillMine() || gotBoundary) return;
          if (j >= state.words.length) return;
          setIdx(j++);
          state.timer = setTimeout(stepH, (60000 / Speech.WPM) / Math.max(0.5, Speech.rate || 1));
        };
        stepH();
      }, 700);

      setTimeout(function () {
        if (!stillMine()) return;
        try {
          if (synth.paused) synth.resume();
          if (!synth.speaking && !synth.pending && Speech.online() && !opts._usedCloud) {
            opts._usedCloud = true;
            try { synth.cancel(); } catch (e) { }
            Speech.speakWithCloud(el, text, opts, state, setIdx, finish, stillMine);
          }
        } catch (e4) { }
      }, 1000);

      Speech.lastMode = 'speech';
      return { mode: 'speech', lang: u.lang };
    },

    speakElement: function (el, text, opts) {
      opts = opts || {};
      if (opts.noAudio) opts.audio = null;

      gen++;
      var myGen = gen;

      if (queue && queue.timer) { clearTimeout(queue.timer); queue.timer = null; }
      if (queue && queue.launchTimer) { clearTimeout(queue.launchTimer); queue.launchTimer = null; }
      if (queue && queue.abort) {
        try { queue.abort.abort(); } catch (eA) { }
      }
      if (Speech.audioEl) {
        try {
          Speech.audioEl.onended = null;
          Speech.audioEl.onerror = null;
          Speech.audioEl.ontimeupdate = null;
          Speech.audioEl.pause();
        } catch (e1) { }
      }
      if (synth) {
        try { synth.cancel(); } catch (e) { }
        try { if (synth.paused) synth.resume(); } catch (e2) { }
      }

      var words = Speech.tokenize(text);
      var spans = el && el.querySelectorAll ? Array.prototype.slice.call(el.querySelectorAll('.w')) : [];
      var state = { words: words, spans: spans, i: -1, el: el, onDone: opts.onDone, gen: myGen, timer: null, launchTimer: null, done: false, abort: null };
      queue = state;

      var setIdx = function (i) {
        if (myGen !== gen || !queue || queue !== state) return;
        if (i === state.i) return;
        if (state.i >= 0 && spans[state.i]) spans[state.i].classList.remove('lit');
        state.i = i;
        if (spans[i]) {
          spans[i].classList.add('lit');
          try { spans[i].scrollIntoView({ block: 'nearest', behavior: 'smooth' }); } catch (e) { }
        }
        if (opts.onWord) opts.onWord(i);
      };

      var finish = function () {
        if (myGen !== gen || !queue || queue !== state) return;
        if (state.done) return;
        state.done = true;
        setIdx(-1);
        var cb = state.onDone;
        if (queue === state) queue = null;
        if (cb) cb();
      };

      var stillMine = function () {
        return myGen === gen && queue === state && !state.done;
      };

      var langCode = String(opts.langCode || Speech.lang || 'en').toLowerCase().split('-')[0];

      /* 1) Recorded pack */
      if (opts.audio) {
        Speech.lastMode = 'audio';
        var aRec = Speech.getAudioEl();
        aRec.onended = null;
        aRec.onerror = null;
        aRec.ontimeupdate = null;
        aRec.src = opts.audio;
        try { aRec.playbackRate = Speech.rate || 1; } catch (eR) { }
        var fell = false;
        var toTts = function () {
          if (fell || !stillMine()) return;
          fell = true;
          var o = {};
          for (var k in opts) o[k] = opts[k];
          o.audio = null;
          o.noAudio = true;
          Speech.speakElement(el, text, o);
        };
        aRec.ontimeupdate = function () {
          if (!stillMine()) return;
          var frac = (aRec.duration && aRec.duration > 0) ? (aRec.currentTime / aRec.duration) : 0;
          setIdx(Math.max(0, Math.min(words.length - 1, Math.floor(frac * words.length))));
        };
        aRec.onended = function () { if (stillMine()) finish(); };
        aRec.onerror = toTts;
        try {
          var pr = aRec.play();
          if (pr && typeof pr.then === 'function') pr.then(function () { }, toTts);
        } catch (ePlay) { toTts(); }
        return { mode: 'audio' };
      }

      if (opts.forceSilent) {
        var i = 0;
        var step = function () {
          if (!stillMine()) return;
          if (i >= words.length) { finish(); return; }
          setIdx(i++);
          state.timer = setTimeout(step, (60000 / Speech.WPM) / Math.max(0.5, Speech.rate || 1));
        };
        step();
        Speech.lastMode = 'timed';
        return { mode: 'timed' };
      }

      Speech.ensureOn();
      if (opts.immediate) Speech.unlock();

      var wantCloud = Speech.usesCloud(langCode) && !opts.forceDevice && !opts._skipCloud;

      /* Auto-start without gesture + cloud = blocked on mobile.
         Skip sound and wait for Listen (caller can toast). */
      if (wantCloud && opts.immediate === false && !opts.allowBackgroundAudio) {
        Speech.needsGesture = true;
        Speech.lastMode = 'needs-gesture';
        // Still light up words slowly so the page doesn't feel dead
        var ig = 0;
        var stepG = function () {
          if (!stillMine()) return;
          if (ig >= words.length) { finish(); return; }
          setIdx(ig++);
          state.timer = setTimeout(stepG, (60000 / Speech.WPM) / Math.max(0.5, Speech.rate || 1));
        };
        stepG();
        return { mode: 'needs-gesture' };
      }

      /* 2) Cloud for ur/hi/ar (and en without device voice) */
      if (wantCloud) {
        return Speech.speakWithCloud(el, text, opts, state, setIdx, finish, stillMine);
      }

      /* 3) Device TTS */
      if (synth && (langCode === 'en' || Speech.hasNativeVoice(langCode) || opts.forceDevice)) {
        var dev = Speech.speakWithDevice(el, text, opts, state, setIdx, finish, stillMine);
        if (dev) return dev;
        if (Speech.cloudEnabled && Speech.online()) {
          return Speech.speakWithCloud(el, text, opts, state, setIdx, finish, stillMine);
        }
      }

      if (Speech.cloudEnabled && Speech.online()) {
        return Speech.speakWithCloud(el, text, opts, state, setIdx, finish, stillMine);
      }

      var i2 = 0;
      var step2 = function () {
        if (!stillMine()) return;
        if (i2 >= words.length) { finish(); return; }
        setIdx(i2++);
        state.timer = setTimeout(step2, (60000 / Speech.WPM) / Math.max(0.5, Speech.rate || 1));
      };
      step2();
      Speech.lastMode = 'timed-offline';
      return { mode: 'timed' };
    },

    speakShort: function (text, lang) {
      try {
        Speech.ensureOn();
        Speech.unlock();
        var code = lang || Speech.lang || 'en';
        var short = String(code).split('-')[0];
        var dummy = { querySelectorAll: function () { return []; } };
        Speech.speakElement(dummy, String(text), {
          langCode: short,
          lang: Speech.bcp47(short),
          immediate: true
        });
      } catch (e) { }
    }
  };

  if (typeof root.performance === 'undefined') {
    root.performance = { now: function () { return Date.now(); } };
  }

  if (typeof module !== 'undefined' && module.exports) module.exports = Speech;
  root.SS_Speech = Speech;
})(typeof window !== 'undefined' ? window : (typeof globalThis !== 'undefined' ? globalThis : this));
