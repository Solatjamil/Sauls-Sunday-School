/* =====================================================================
   Narration + read-along word highlighting.
   Uses the device's own speech engine (works offline, no audio files),
   and accepts an optional recorded-audio URL per unit: if a unit has
   `audio[lang]` (or `audio`), the player switches to that instead.
   ===================================================================== */
(function (root) {
  'use strict';

  var synth = root.speechSynthesis || null;
  var queue = null;               // {utter, words, i, timer, el, onDone}
  var Speech = {
    supported: !!synth,
    voices: [],
    rate: 1,
    enabled: true,
    lang: 'en',
    voiceURI: null,
    audioEl: null,
    WPM: 165,                     // fallback estimate when boundary events are missing

    init: function () {
      if (!synth) return;
      var grab = function () {
        try {
          Speech.voices = (synth.getVoices() || []).filter(function (v) { return /^en|^ur/i.test(v.lang); });
          if (!Speech.voices.length) Speech.voices = synth.getVoices() || [];
        } catch (e) { Speech.voices = []; }
      };
      grab();
      try { synth.onvoiceschanged = grab; } catch (e) { }
      // some engines only list voices a moment later
      setTimeout(grab, 250); setTimeout(grab, 1200);
    },
    /* Which recording belongs to this paragraph?
       Resolution order, so a half-recorded unit still reads out loud:
         1. the generated pack (assets/audio/<unit>/<lang>-<key>.mp3 → js/data/audio.js)
         2. a hand-written unit.audio map, { en: { s0: '…' }, ur: { … } }
         3. null — the caller falls back to the device voice          */
    hasAudioFor: function (unit, lang, key) {
      if (!unit) return null;
      var l = (lang === 'ur') ? 'ur' : 'en';
      var pack = root.SS_AUDIO && root.SS_AUDIO[unit.id];
      if (pack) {
        var fromPack = pack[l] || pack.en;
        if (fromPack) {
          if (key && fromPack[key]) return fromPack[key];
          if (!key) { var first = Object.keys(fromPack)[0]; if (first) return fromPack[first]; }
        }
      }
      var hand = unit.audio;
      if (hand) {
        var m = typeof hand === 'string' ? null : (hand[l] || hand.en);
        if (m && key && m[key]) return m[key];
        if (typeof hand === 'string' && !key) return hand;
      }
      return null;
    },
    stop: function () {
      if (queue && queue.timer) { clearTimeout(queue.timer); queue.timer = null; }
      if (Speech.audioEl) { try { Speech.audioEl.pause(); Speech.audioEl.currentTime = 0; } catch (e) { } }
      if (synth) { try { synth.cancel(); } catch (e) { } }
      queue = null;
    },
    pause: function () { try { if (synth) synth.pause(); } catch (e) { } if (Speech.audioEl) { try { Speech.audioEl.pause(); } catch (e) { } } },
    resume: function () { try { if (synth) synth.resume(); } catch (e) { } if (Speech.audioEl) { try { Speech.audioEl.play(); } catch (e) { } } },

    tokenize: function (text) {
      var out = [], re = /\S+/g, m;
      while ((m = re.exec(text))) out.push({ text: m[0], start: m.index, end: m.index + m[0].length });
      return out;
    },
    // speak one element: el contains <span class="word"> children already
    speakElement: function (el, text, opts) {
      opts = opts || {};
      if (opts.noAudio) opts.audio = null;
      Speech.stop();
      var words = Speech.tokenize(text);
      var spans = el.querySelectorAll ? Array.prototype.slice.call(el.querySelectorAll('.w')) : [];
      var state = { words: words, spans: spans, i: -1, el: el, onDone: opts.onDone };
      queue = state;

      var setIdx = function (i) {
        if (i === state.i) return;
        if (state.i >= 0 && spans[state.i]) spans[state.i].classList.remove('lit');
        state.i = i;
        if (spans[i]) { spans[i].classList.add('lit'); try { spans[i].scrollIntoView({ block: 'nearest', behavior: 'smooth' }); } catch (e) { } }
        if (opts.onWord) opts.onWord(i);
      };

      var useAudio = opts.audio;
      if (useAudio) {
        var a = Speech.audioEl || (Speech.audioEl = new Audio());
        a.src = useAudio; a.playbackRate = Speech.rate;
        var fellBack = false;
        var fallback = function () {
          if (fellBack || !queue || queue !== state) return;
          fellBack = true;                       // once per paragraph
          clearTimeout(state.timer); state.timer = null;
          // no recording on this device (file not shipped, offline, blocked
          // autoplay): keep reading, just use the voice the browser has
          var o = {}; for (var k in opts) o[k] = opts[k];
          o.audio = null; o.noAudio = true;
          Speech.speakElement(el, text, o);
        };
        a.onended = function () { setIdx(-1); if (state.onDone) state.onDone(); };
        a.onerror = fallback;
        var tick = function () {
          if (!queue || queue !== state) return;
          var frac = (a.duration && a.duration > 0) ? (a.currentTime / a.duration) : 0;
          setIdx(Math.max(0, Math.min(words.length - 1, Math.floor(frac * words.length))));
          state.timer = setTimeout(tick, 120);
        };
        var started = null;
        try { started = a.play(); } catch (e) { fallback(); return { mode: 'speech-after-audio-miss' }; }
        // one handler pair on one promise: attaching .catch and .then separately
        // leaves the second chain unhandled, and mobile Safari rejects play()
        // whenever the tap gesture did not come from the user
        if (started && typeof started.then === 'function') {
          started.then(function () { if (!fellBack) tick(); }, fallback);
        } else if (isFinite(a.duration) && a.duration > 0) {
          tick();                                  // engine returned no promise but is playing
        } else {
          fallback();                              // no real media support here: use the device voice
        }
        return { mode: 'audio' };
      }

      if (!Speech.enabled || !synth) {                        // silent read mode
        if (opts.allowSilentHighlight === false) { if (state.onDone) state.onDone(); return { mode: 'none' }; }
        var i = 0;
        var step = function () {
          if (!queue || queue !== state) return;
          if (i >= words.length) { setIdx(-1); if (state.onDone) state.onDone(); return; }
          setIdx(i++);
          state.timer = setTimeout(step, (60000 / Speech.WPM) / Speech.rate);
        };
        step();
        return { mode: 'timed' };
      }

      var u = new SpeechSynthesisUtterance(text);
      var langCode = opts.langCode || Speech.lang || 'en';
      u.lang = opts.lang || Speech.bcp47(langCode);
      var pro = Speech.kidProsody(langCode);
      u.rate = (opts.rate != null ? opts.rate : pro.rate);
      u.pitch = (opts.pitch != null ? opts.pitch : pro.pitch);
      u.volume = 1;
      var v = Speech.pickVoice(langCode);
      if (v) { try { u.voice = v; } catch (e) { } }

      var gotBoundary = false;
      u.onboundary = function (ev) {
        if (ev && ev.name && ev.name !== 'word') return;
        gotBoundary = true;
        var ch = ev && (ev.charIndex != null ? ev.charIndex : 0);
        var idx = 0;
        for (var k = 0; k < words.length; k++) { if (words[k].start <= ch) idx = k; else break; }
        setIdx(idx);
      };
      u.onend = function () { setIdx(-1); if (state.onDone) state.onDone(); };
      u.onerror = function () { setIdx(-1); if (state.onDone) state.onDone(); };
      try { synth.cancel(); } catch (e) { }
      try { synth.speak(u); } catch (e) { if (state.onDone) state.onDone(); return { mode: 'error' }; }

      // engines that never fire boundary events: fall back to a timer
      setTimeout(function () {
        if (gotBoundary || !queue || queue !== state) return;
        var j = 0;
        var step2 = function () {
          if (!queue || queue !== state) return;
          if (j >= words.length) return;
          setIdx(j++);
          state.timer = setTimeout(step2, (60000 / Speech.WPM) / Speech.rate);
        };
        step2();
      }, 900);
      return { mode: 'speech' };
    },
    // Prefer a gentle, local parent-like voice for the active narration language.
    pickVoice: function (langHint) {
      if (!Speech.voices || !Speech.voices.length) return null;
      if (Speech.voiceURI) {
        var forced = Speech.voices.filter(function (v) { return v.voiceURI === Speech.voiceURI; })[0];
        if (forced) return forced;
      }
      var code = (langHint || Speech.lang || 'en').toLowerCase();
      var prefs = {
        en: [/^en-GB/i, /^en-IN/i, /^en-AU/i, /^en/i],
        ur: [/^ur/i, /^hi/i, /^en-IN/i, /^en/i],
        hi: [/^hi/i, /^en-IN/i, /^ur/i, /^en/i],
        ar: [/^ar/i, /^ar-SA/i, /^ar-EG/i, /^en/i]
      };
      var tests = prefs[code] || prefs.en;
      var i, list, soft;
      for (i = 0; i < tests.length; i++) {
        list = Speech.voices.filter(function (v) { return tests[i].test(v.lang || '') || tests[i].test(v.name || ''); });
        if (!list.length) continue;
        // Prefer female / softer-named voices when available (parent-to-child feel)
        soft = list.filter(function (v) {
          return /female|woman|girl|zira|samantha|veena|kalpana|lekha|nicky|anya|helen|google.*f/i.test(v.name || '');
        });
        return (soft[0] || list[0]);
      }
      return Speech.voices[0];
    },
    bcp47: function (code) {
      return ({ en: 'en-GB', ur: 'ur-PK', hi: 'hi-IN', ar: 'ar-SA' })[code] || 'en-GB';
    },
    // Slightly slower + warmer for kids in mother-tongue modes
    kidProsody: function (code) {
      var base = Speech.rate || 1;
      if (code === 'ur' || code === 'hi' || code === 'ar') {
        return { rate: Math.max(0.75, Math.min(1.05, base * 0.92)), pitch: 1.08 };
      }
      return { rate: base, pitch: 1.02 };
    },
    speakShort: function (text, lang) {
      if (!Speech.enabled || !synth) return;
      try {
        var code = lang || Speech.lang || 'en';
        // allow full bcp47 or short code
        var short = String(code).split('-')[0];
        var u = new SpeechSynthesisUtterance(text);
        u.lang = code.indexOf('-') > 0 ? code : Speech.bcp47(short);
        var pro = Speech.kidProsody(short);
        u.rate = pro.rate; u.pitch = pro.pitch;
        var v = Speech.pickVoice(short); if (v) { try { u.voice = v; } catch (e) { } }
        synth.speak(u);
      } catch (e) { }
    }
  };
  if (typeof root.performance === 'undefined') root.performance = { now: function () { return Date.now(); } };

  if (typeof module !== 'undefined' && module.exports) module.exports = Speech;
  root.SS_Speech = Speech;
})(typeof window !== 'undefined' ? window : (typeof globalThis !== 'undefined' ? globalThis : this));
