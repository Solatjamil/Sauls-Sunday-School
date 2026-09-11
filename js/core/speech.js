/* =====================================================================
   Narration + read-along word highlighting.
   Uses the device's own speech engine (works offline, no audio files),
   and accepts an optional recorded-audio URL per unit: if a unit has
   `audio[lang]` (or `audio`), the player switches to that instead.

   Critical mobile rule: speechSynthesis.speak() must run inside the
   user-gesture turn when possible. Deferring with setTimeout after a
   Listen tap drops the activation and the engine stays silent.
   ===================================================================== */
(function (root) {
  'use strict';

  var synth = root.speechSynthesis || null;
  var queue = null;               // active read-along state
  var gen = 0;                    // bumps on every stop/speak to ignore stale callbacks
  var unlockDone = false;

  var Speech = {
    supported: !!synth,
    voices: [],
    rate: 1,
    enabled: true,
    lang: 'en',
    voiceURI: null,
    audioEl: null,
    WPM: 165,
    lastError: null,
    lastMode: null,

    init: function () {
      if (!synth) return;
      var grab = function () {
        try {
          Speech.voices = synth.getVoices() || [];
        } catch (e) { Speech.voices = []; }
      };
      grab();
      try { synth.onvoiceschanged = grab; } catch (e) { }
      setTimeout(grab, 250);
      setTimeout(grab, 800);
      setTimeout(grab, 2000);
    },

    /* Matching-language recording only — never play English audio over ur/hi/ar text. */
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
        if (typeof hand === 'string') {
          return l === 'en' && !key ? hand : null;
        }
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
      if (Speech.audioEl) {
        try { Speech.audioEl.onended = null; Speech.audioEl.onerror = null; } catch (e0) { }
        try { Speech.audioEl.pause(); Speech.audioEl.currentTime = 0; } catch (e) { }
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

    /* Cheap unlock so later autoplay/chain speaks are less likely to be blocked. */
    unlock: function () {
      if (!synth || unlockDone) return;
      try {
        var u = new SpeechSynthesisUtterance(' ');
        u.volume = 0;
        u.rate = 1;
        u.onend = u.onerror = function () { };
        synth.speak(u);
        synth.cancel();
        unlockDone = true;
      } catch (e) { }
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
    /* Extra lang tags to try if the primary one is rejected by the engine. */
    langFallbacks: function (code) {
      var map = {
        en: ['en-GB', 'en-US', 'en-IN', 'en-AU', 'en'],
        ur: ['ur-PK', 'ur-IN', 'ur', 'hi-IN', 'hi'],
        hi: ['hi-IN', 'hi', 'en-IN'],
        ar: ['ar-SA', 'ar-EG', 'ar-AE', 'ar-XA', 'ar']
      };
      return map[code] || map.en;
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

    /* Never return an English voice for ur/hi/ar. */
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
        return Speech.voiceMatchesLang(v, code, { allowSibling: code === 'ur' || code === 'hi' });
      });
    },

    /* Core speak. opts.immediate=true keeps user-gesture (Listen button). */
    speakElement: function (el, text, opts) {
      opts = opts || {};
      if (opts.noAudio) opts.audio = null;

      // New generation — invalidates any in-flight utterance callbacks
      gen++;
      var myGen = gen;

      if (queue && queue.timer) { clearTimeout(queue.timer); queue.timer = null; }
      if (queue && queue.launchTimer) { clearTimeout(queue.launchTimer); queue.launchTimer = null; }
      if (Speech.audioEl) {
        try { Speech.audioEl.onended = null; Speech.audioEl.onerror = null; } catch (e0) { }
        try { Speech.audioEl.pause(); } catch (e1) { }
      }
      // Cancel previous TTS only if we are not about to speak in the same gesture
      // with immediate mode — still need cancel to clear queue, then speak ASAP.
      if (synth) {
        try { synth.cancel(); } catch (e) { }
        try { if (synth.paused) synth.resume(); } catch (e2) { }
      }

      var words = Speech.tokenize(text);
      var spans = el && el.querySelectorAll ? Array.prototype.slice.call(el.querySelectorAll('.w')) : [];
      var state = { words: words, spans: spans, i: -1, el: el, onDone: opts.onDone, gen: myGen, timer: null, launchTimer: null };
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
        // clear before callback so next speak can start cleanly
        if (queue === state) queue = null;
        if (cb) cb();
      };

      var stillMine = function () {
        return myGen === gen && queue === state && !state.done;
      };

      /* ---- recorded audio path ---- */
      if (opts.audio) {
        var a = Speech.audioEl || (Speech.audioEl = new Audio());
        a.src = opts.audio;
        a.playbackRate = Speech.rate || 1;
        var fellBack = false;
        var fallback = function () {
          if (fellBack || !stillMine()) return;
          fellBack = true;
          if (state.timer) { clearTimeout(state.timer); state.timer = null; }
          var o = {};
          for (var k in opts) o[k] = opts[k];
          o.audio = null;
          o.noAudio = true;
          o.immediate = opts.immediate;
          Speech.speakElement(el, text, o);
        };
        a.onended = function () {
          if (!stillMine()) return;
          setIdx(-1);
          finish();
        };
        a.onerror = fallback;
        var tick = function () {
          if (!stillMine()) return;
          var frac = (a.duration && a.duration > 0) ? (a.currentTime / a.duration) : 0;
          setIdx(Math.max(0, Math.min(words.length - 1, Math.floor(frac * words.length))));
          state.timer = setTimeout(tick, 120);
        };
        var started = null;
        try { started = a.play(); } catch (e) { fallback(); Speech.lastMode = 'speech-after-audio-miss'; return { mode: 'speech-after-audio-miss' }; }
        if (started && typeof started.then === 'function') {
          started.then(function () { if (!fellBack && stillMine()) tick(); }, fallback);
        } else if (isFinite(a.duration) && a.duration > 0) {
          tick();
        } else {
          fallback();
        }
        Speech.lastMode = 'audio';
        return { mode: 'audio' };
      }

      /* ---- silent / no engine ---- */
      if (opts.forceSilent || !synth) {
        if (opts.allowSilentHighlight === false || !synth) {
          // still highlight on a timer so UX isn't frozen
        }
        if (!synth && opts.allowSilentHighlight === false) {
          finish();
          Speech.lastMode = 'none';
          return { mode: 'none' };
        }
        var i = 0;
        var step = function () {
          if (!stillMine()) return;
          if (i >= words.length) { finish(); return; }
          setIdx(i++);
          state.timer = setTimeout(step, (60000 / Speech.WPM) / Math.max(0.5, Speech.rate || 1));
        };
        step();
        Speech.lastMode = synth ? 'timed' : 'timed-no-synth';
        return { mode: 'timed' };
      }

      Speech.ensureOn();
      Speech.unlock();

      var langCode = String(opts.langCode || Speech.lang || 'en').toLowerCase().split('-')[0];
      var tags = Speech.langFallbacks(langCode);
      if (opts.lang && tags.indexOf(opts.lang) === -1) tags = [opts.lang].concat(tags);
      var pro = Speech.kidProsody(langCode);
      var rate = (opts.rate != null ? opts.rate : pro.rate);
      var pitch = (opts.pitch != null ? opts.pitch : pro.pitch);
      var gotBoundary = false;
      var tryIdx = opts._tryIdx || 0;

      function makeUtterance(tag, withVoice) {
        var u = new SpeechSynthesisUtterance(String(text));
        u.lang = tag;
        u.rate = rate;
        u.pitch = pitch;
        u.volume = 1;
        if (withVoice) {
          var v = Speech.pickVoice(langCode, {
            allowSibling: !!opts.allowSibling || tryIdx > 0
          });
          if (v) {
            try { u.voice = v; } catch (e) { }
            if (v.lang && Speech.voiceMatchesLang(v, langCode, { allowSibling: true })) {
              try { u.lang = v.lang; } catch (e2) { }
            }
          }
        }
        return u;
      }

      function wire(u) {
        u.onboundary = function (ev) {
          if (!stillMine()) return;
          if (ev && ev.name && ev.name !== 'word') return;
          gotBoundary = true;
          var ch = ev && (ev.charIndex != null ? ev.charIndex : 0);
          var idx = 0;
          for (var k = 0; k < words.length; k++) {
            if (words[k].start <= ch) idx = k; else break;
          }
          setIdx(idx);
        };
        u.onend = function () {
          if (!stillMine()) return;
          finish();
        };
        u.onerror = function (ev) {
          if (!stillMine()) return;
          // "interrupted" / "canceled" from our own stop/cancel — ignore
          var err = (ev && ev.error) || '';
          Speech.lastError = err || 'error';
          if (err === 'interrupted' || err === 'canceled' || err === 'cancelled') {
            return;
          }
          // Try next strategy while keeping the SAME text (never rewrite to English)
          var next = tryIdx + 1;
          if (next < 6) {
            var o2 = {};
            for (var ok in opts) o2[ok] = opts[ok];
            o2.audio = null;
            o2.noAudio = true;
            o2._tryIdx = next;
            o2.immediate = false; // chain may leave gesture; still try
            // 0: voice+primary tag (already tried)
            // 1: no voice + primary
            // 2: voice + next tag
            // 3: no voice + next tag
            // …
            Speech.speakElement(el, text, o2);
            return;
          }
          // Last resort: timed highlight so the page still advances
          var i2 = 0;
          var step2 = function () {
            if (!stillMine()) return;
            if (i2 >= words.length) { finish(); return; }
            setIdx(i2++);
            state.timer = setTimeout(step2, (60000 / Speech.WPM) / Math.max(0.5, Speech.rate || 1));
          };
          step2();
        };
      }

      // Strategy selection from tryIdx
      var tag = tags[Math.min(tryIdx >> 1, tags.length - 1)];
      var useVoice = (tryIdx % 2 === 0) && !opts.forceNoVoice;
      if (tryIdx >= 2) opts.allowSibling = true;
      var u = makeUtterance(tag, useVoice);
      wire(u);

      var launch = function () {
        if (!stillMine()) return;
        try {
          if (synth.paused) synth.resume();
        } catch (e0) { }
        try {
          synth.speak(u);
        } catch (e) {
          Speech.lastError = String(e && e.message || e);
          finish();
          return;
        }
        // Chrome sometimes leaves the queue paused
        try { if (synth.paused) synth.resume(); } catch (e2) { }
        setTimeout(function () {
          try { if (synth && synth.paused) synth.resume(); } catch (e3) { }
        }, 40);
        // Watchdog: if nothing started in 1.2s, resume or fail forward
        setTimeout(function () {
          if (!stillMine()) return;
          try {
            if (synth.paused) synth.resume();
            // speaking=false and pending=false right after speak → engine dropped it
            if (!synth.speaking && !synth.pending) {
              u.onerror({ error: 'not-started' });
            }
          } catch (e4) { }
        }, 1200);
      };

      // IMPORTANT: Listen path must speak in the same turn as the tap.
      // Only delay when we just canceled a previous utterance mid-flight
      // and the caller is a chain (paragraph 2+), not the first gesture.
      if (opts.immediate) {
        launch();
      } else {
        state.launchTimer = setTimeout(launch, 40);
      }

      // Highlight timer if engine never fires boundary events
      setTimeout(function () {
        if (!stillMine() || gotBoundary) return;
        var j = 0;
        var stepH = function () {
          if (!stillMine() || gotBoundary) return;
          if (j >= words.length) return;
          setIdx(j++);
          state.timer = setTimeout(stepH, (60000 / Speech.WPM) / Math.max(0.5, Speech.rate || 1));
        };
        stepH();
      }, 700);

      Speech.lastMode = 'speech';
      return { mode: 'speech', lang: u.lang, tryIdx: tryIdx };
    },

    speakShort: function (text, lang) {
      if (!synth) return;
      try {
        Speech.ensureOn();
        Speech.unlock();
        var code = lang || Speech.lang || 'en';
        var short = String(code).split('-')[0];
        var u = new SpeechSynthesisUtterance(String(text));
        u.lang = String(code).indexOf('-') > 0 ? code : Speech.bcp47(short);
        var pro = Speech.kidProsody(short);
        u.rate = pro.rate;
        u.pitch = pro.pitch;
        u.volume = 1;
        var v = Speech.pickVoice(short);
        if (v) {
          try { u.voice = v; } catch (e) { }
        }
        try { synth.cancel(); } catch (e2) { }
        // keep short prompts in the gesture if any
        try { synth.speak(u); } catch (e3) { }
        try { if (synth.paused) synth.resume(); } catch (e4) { }
      } catch (e) { }
    }
  };

  if (typeof root.performance === 'undefined') {
    root.performance = { now: function () { return Date.now(); } };
  }

  if (typeof module !== 'undefined' && module.exports) module.exports = Speech;
  root.SS_Speech = Speech;
})(typeof window !== 'undefined' ? window : (typeof globalThis !== 'undefined' ? globalThis : this));
