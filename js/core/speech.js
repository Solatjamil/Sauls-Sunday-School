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
          // Keep the full list so Hindi/Arabic/Urdu voices are available.
          // Language preference is applied in pickVoice(), not here.
          Speech.voices = synth.getVoices() || [];
        } catch (e) { Speech.voices = []; }
      };
      grab();
      try { synth.onvoiceschanged = grab; } catch (e) { }
      // some engines only list voices a moment later (Chrome especially)
      setTimeout(grab, 250); setTimeout(grab, 800); setTimeout(grab, 2000);
    },
    /* Which recording belongs to this paragraph?
       Resolution order, so a half-recorded unit still reads out loud:
         1. the generated pack (assets/audio/<unit>/<lang>-<key>.mp3 → js/data/audio.js)
         2. a hand-written unit.audio map, { en: { s0: '…' }, ur: { … } }
         3. null — the caller falls back to the device voice          */
    hasAudioFor: function (unit, lang, key) {
      if (!unit) return null;
      // Never fall back to another language's recording — wrong audio over
      // mother-tongue text makes the narrator sound English-only.
      var l = (lang === 'ur' || lang === 'hi' || lang === 'ar') ? lang : 'en';
      var pack = root.SS_AUDIO && root.SS_AUDIO[unit.id];
      if (pack && pack[l]) {
        var fromPack = pack[l];
        if (key && fromPack[key]) return fromPack[key];
        if (!key) { var first = Object.keys(fromPack)[0]; if (first) return fromPack[first]; }
      }
      var hand = unit.audio;
      if (hand) {
        if (typeof hand === 'string') {
          // bare string = English-only recording; only use for English
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
      if (queue && queue.timer) { clearTimeout(queue.timer); queue.timer = null; }
      if (Speech.audioEl) { try { Speech.audioEl.pause(); Speech.audioEl.currentTime = 0; } catch (e) { } }
      if (synth) {
        try { synth.cancel(); } catch (e) { }
        // Chrome often leaves synthesis "paused" after cancel — unlock for next speak
        try { if (synth.paused) synth.resume(); } catch (e2) { }
      }
      queue = null;
    },
    // Always turn voice back on when the child (or parent) asks to listen
    ensureOn: function () {
      Speech.enabled = true;
      if (!Speech.voices || !Speech.voices.length) Speech.init();
      if (synth) {
        try { if (synth.paused) synth.resume(); } catch (e) { }
      }
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

      // Force-on path: Listen button / auto-narrate always wants real voice.
      // Only stay silent when explicitly requested (opts.forceSilent) or no engine.
      if (opts.forceSilent || (!synth && opts.allowSilentHighlight !== false)) {
        if (opts.allowSilentHighlight === false) { if (state.onDone) state.onDone(); return { mode: 'none' }; }
        var i = 0;
        var step = function () {
          if (!queue || queue !== state) return;
          if (i >= words.length) { setIdx(-1); if (state.onDone) state.onDone(); return; }
          setIdx(i++);
          state.timer = setTimeout(step, (60000 / Speech.WPM) / Math.max(0.5, Speech.rate || 1));
        };
        step();
        return { mode: 'timed' };
      }

      if (!synth) {
        if (state.onDone) state.onDone();
        return { mode: 'none' };
      }

      // Re-enable after "Read quietly" and unlock paused engines
      Speech.ensureOn();

      var langCode = String(opts.langCode || Speech.lang || 'en').toLowerCase().split('-')[0];
      var bcp = opts.lang || Speech.bcp47(langCode);
      var pro = Speech.kidProsody(langCode);
      var rate = (opts.rate != null ? opts.rate : pro.rate);
      var pitch = (opts.pitch != null ? opts.pitch : pro.pitch);

      var gotBoundary = false;
      var finished = false;
      var finish = function () {
        if (finished) return;
        finished = true;
        setIdx(-1);
        if (state.onDone) state.onDone();
      };

      function attachHandlers(u) {
        u.onboundary = function (ev) {
          if (ev && ev.name && ev.name !== 'word') return;
          gotBoundary = true;
          var ch = ev && (ev.charIndex != null ? ev.charIndex : 0);
          var idx = 0;
          for (var k = 0; k < words.length; k++) { if (words[k].start <= ch) idx = k; else break; }
          setIdx(idx);
        };
        u.onend = function () { finish(); };
        u.onerror = function () {
          // Retry strategies keep the SAME mother-tongue text — never switch to English
          // (that made Urdu/Hindi/Arabic "only speak English").
          if (!opts._retryStep) opts._retryStep = 0;
          if (opts._retryStep < 2 && langCode !== 'en') {
            opts._retryStep++;
            try {
              var o2 = {};
              for (var ok in opts) o2[ok] = opts[ok];
              o2.audio = null;
              o2.noAudio = true;
              o2._retryStep = opts._retryStep;
              // 1) force no explicit voice (let engine use lang only)
              // 2) try sibling tongue voice (ur↔hi) still reading original script
              if (opts._retryStep === 1) o2.forceNoVoice = true;
              if (opts._retryStep === 2) o2.allowSibling = true;
              Speech.speakElement(el, text, o2);
              return;
            } catch (err) { }
          }
          finish();
        };
      }

      function buildUtterance(mode) {
        var u = new SpeechSynthesisUtterance(text);
        u.lang = bcp;
        u.rate = rate;
        u.pitch = pitch;
        u.volume = 1;
        if (mode !== 'novoice') {
          var v = Speech.pickVoice(langCode, { allowSibling: !!opts.allowSibling || mode === 'sibling' });
          if (v) {
            try { u.voice = v; } catch (e) { }
            // Only align lang with the voice when it is still the same family
            // (e.g. ur-PK voice). Never adopt en-* from a wrong fallback.
            if (v.lang && Speech.voiceMatchesLang(v, langCode, { allowSibling: !!opts.allowSibling || mode === 'sibling' })) {
              try { u.lang = v.lang; } catch (e2) { }
            }
          }
        }
        attachHandlers(u);
        return u;
      }

      var mode = opts.forceNoVoice ? 'novoice' : (opts.allowSibling ? 'sibling' : 'prefer');
      var u = buildUtterance(mode);

      try { synth.cancel(); } catch (e) { }
      try { if (synth.paused) synth.resume(); } catch (e) { }
      // Chrome drops utterances spoken in the same tick as cancel()
      var launch = function () {
        if (!queue || queue !== state || finished) return;
        try { synth.speak(u); } catch (e) { finish(); return; }
        try { if (synth.paused) synth.resume(); } catch (e2) { }
        setTimeout(function () { try { if (synth && synth.paused) synth.resume(); } catch (e3) { } }, 60);
      };
      setTimeout(launch, 30);

      // engines that never fire boundary events: fall back to a timer
      setTimeout(function () {
        if (gotBoundary || !queue || queue !== state || finished) return;
        var j = 0;
        var step2 = function () {
          if (!queue || queue !== state || finished) return;
          if (j >= words.length) return;
          setIdx(j++);
          state.timer = setTimeout(step2, (60000 / Speech.WPM) / Math.max(0.5, Speech.rate || 1));
        };
        step2();
      }, 900);
      return { mode: 'speech' };
    },
    /* True when a voice belongs to the requested narration family. */
    voiceMatchesLang: function (voice, langCode, opts) {
      opts = opts || {};
      if (!voice) return false;
      var code = String(langCode || 'en').toLowerCase().split('-')[0];
      var hay = ((voice.lang || '') + ' ' + (voice.name || '')).toLowerCase();
      if (code === 'en') return /^en\b/.test((voice.lang || '').toLowerCase()) || /english/.test(hay);
      if (code === 'ur') {
        if (/^ur\b/.test((voice.lang || '').toLowerCase()) || /urdu/.test(hay)) return true;
        if (opts.allowSibling && (/^hi\b/.test((voice.lang || '').toLowerCase()) || /hindi/.test(hay))) return true;
        return false;
      }
      if (code === 'hi') {
        if (/^hi\b/.test((voice.lang || '').toLowerCase()) || /hindi/.test(hay)) return true;
        if (opts.allowSibling && (/^ur\b/.test((voice.lang || '').toLowerCase()) || /urdu/.test(hay))) return true;
        return false;
      }
      if (code === 'ar') {
        return /^ar\b/.test((voice.lang || '').toLowerCase()) || /arabic|naayf|maged|laila|tarik/.test(hay);
      }
      return (voice.lang || '').toLowerCase().indexOf(code) === 0;
    },
    // Prefer a gentle, local parent-like voice for the active narration language.
    // NEVER fall back to English for ur/hi/ar — that made every language speak English.
    pickVoice: function (langHint, opts) {
      opts = opts || {};
      if (!Speech.voices || !Speech.voices.length) {
        try { if (synth) Speech.voices = synth.getVoices() || []; } catch (e) { }
      }
      if (!Speech.voices || !Speech.voices.length) return null;
      if (Speech.voiceURI) {
        var forced = Speech.voices.filter(function (v) { return v.voiceURI === Speech.voiceURI; })[0];
        if (forced) {
          // Ignore a forced English voice when narrating another language
          var want = String(langHint || Speech.lang || 'en').toLowerCase().split('-')[0];
          if (want === 'en' || Speech.voiceMatchesLang(forced, want, { allowSibling: true })) return forced;
        }
      }
      var code = String(langHint || Speech.lang || 'en').toLowerCase().split('-')[0];
      // Match by BCP-47 + product names. English is ONLY for English.
      var prefs = {
        en: [/^en-GB/i, /^en-IN/i, /^en-AU/i, /^en-US/i, /^en\b/i, /english/i],
        ur: [/^ur\b/i, /urdu/i],
        hi: [/^hi\b/i, /hindi/i, /veena|kalpana|lekha/i],
        ar: [/^ar\b/i, /arabic/i, /naayf|maged|laila|tarik|hoda|salma/i]
      };
      // Sibling only when explicitly allowed (retry path) — still not English
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
          return /female|woman|girl|zira|samantha|veena|kalpana|lekha|nicky|anya|helen|google UK.*F|female|neural/i.test(vv.name || '');
        });
        return (soft[0] || list[0]);
      }
      // English may use any remaining English-ish voice; other langs return null
      // so the utterance keeps u.lang and the engine can still synthesize.
      if (code === 'en') return Speech.voices.filter(function (vv) {
        return /^en/i.test(vv.lang || '') || /english/i.test(vv.name || '');
      })[0] || Speech.voices[0] || null;
      return null;
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
    /* List device voices that can narrate this language (for Settings hint). */
    voicesFor: function (langCode) {
      if (!Speech.voices || !Speech.voices.length) {
        try { if (synth) Speech.voices = synth.getVoices() || []; } catch (e) { }
      }
      var code = String(langCode || 'en').toLowerCase().split('-')[0];
      return (Speech.voices || []).filter(function (v) {
        return Speech.voiceMatchesLang(v, code, { allowSibling: code === 'ur' || code === 'hi' });
      });
    },
    speakShort: function (text, lang) {
      if (!Speech.enabled || !synth) return;
      try {
        Speech.ensureOn();
        var code = lang || Speech.lang || 'en';
        var short = String(code).split('-')[0];
        var u = new SpeechSynthesisUtterance(text);
        u.lang = code.indexOf('-') > 0 ? code : Speech.bcp47(short);
        var pro = Speech.kidProsody(short);
        u.rate = pro.rate; u.pitch = pro.pitch;
        var v = Speech.pickVoice(short);
        if (v) {
          try { u.voice = v; } catch (e) { }
          if (v.lang && Speech.voiceMatchesLang(v, short)) {
            try { u.lang = v.lang; } catch (e2) { }
          }
        }
        try { synth.cancel(); } catch (e3) { }
        setTimeout(function () {
          try { synth.speak(u); } catch (e4) { }
          try { if (synth.paused) synth.resume(); } catch (e5) { }
        }, 30);
      } catch (e) { }
    }
  };
  if (typeof root.performance === 'undefined') root.performance = { now: function () { return Date.now(); } };

  if (typeof module !== 'undefined' && module.exports) module.exports = Speech;
  root.SS_Speech = Speech;
})(typeof window !== 'undefined' ? window : (typeof globalThis !== 'undefined' ? globalThis : this));
