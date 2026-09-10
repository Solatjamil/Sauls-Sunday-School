# Writing and checking lessons

All curriculum lives in `js/data/units-1.js` … `units-6.js`. Each file pushes plain
objects into a global array; nothing else. No build step, no markdown pipeline.

## Unit shape

```js
{
  id: 'jonah', title: 'Jonah and the Big Fish', tier: 'L', mode: 'story',
  track: 'values', testament: 'ot', era: 'judges', when: 22, path: 9, xp: 18,
  gentle: true,                      // 3-6 marker: the softer telling
  // mature: true, hardNote: '…'    // 7-12 only, see the rules below
  summary: 'One line a child could repeat.',
  ur: { title: '…', summary: '…', story: ['…'], scripture: [{ ref: '…', text: '…' }] },
  scripture: [{ ref: 'Jonah 2:9', text: 'Salvation is of Yahweh.' }],   // quoted translation, verbatim
  story: ['paragraph one', 'paragraph two', …],       // the kid retelling
  teach: ['three doctrine lines'],                    // shown for M / H
  quiz: [
    { t: 'mc',  q: '…', a: ['right','x','y','z'], c: 0, hint: '…' },
    { t: 'tap', q: '…', a: [ … ], c: 2, hint: '…' },                  // youngest: big tap cards
    { t: 'match', q: '…', pairs: [['left','right'], …], hint: '…' },  // tap-to-connect, not drag
    { t: 'order', q: '…', items: ['first','second', …], hint: '…' },  // data order IS the answer
    { t: 'sort',  q: '…', buckets: [{ id: 'ot', name: 'Old Testament' }, …],
                 items: [{ text: '…', b: 'ot' }, …], hint: '…' },
    { t: 'blank', q: '…', a: 'Isaac', accept: ['laughter'], hint: '…' } // 7+ only; typo-tolerant
  ],
  memory: { ref: 'Genesis 1:1', text: 'In the beginning God created…' },
  prayer: 'Dear God, …',                                   // first person, one breath
  badge: { name: 'Big Fish', art: 'fish', note: '…' },
  printable: {
    motif: 'fish', title: '…', prompts: ['ask this','and this','and this'],
    craft: { title: '…', steps: ['…','…'], note: '…' }
  },
  // audio is usually NOT written here: drop MP3s in assets/audio/ and
  // `npm run audio` generates the map. A hand-written override looks like:
  // audio: { en: { s0: 'assets/audio/jonah/en-s0.mp3' }, ur: { … } }
}
```

## Recordings, and the keys that tie them to text

Every paragraph of `story` is rendered with `data-para="s0"`, `"s1"`, … — its
index **in the story array**, not in a page. That is the hook a recording uses:

```
assets/audio/<unitId>/<lang>-<key>.mp3          assets/audio/jonah/en-s0.mp3
```

Why per paragraph rather than one file per lesson: pages are tier-dependent
(ages 3–6 get one paragraph per page, 7–12 get two), so a single file cannot
serve both — and a unit can then be recorded in pieces, with the browser voice
covering whichever paragraphs have no file yet.

`npm run audio` (also run by `npm test` and `build.js`) scans that folder and
writes `js/data/audio.js`. It refuses to stay quiet about mistakes:

```
audio: 6 clip(s) for 1 unit(s), language(s): en → js/data/audio.js
  ! jonah: “en-s7.mp3” is not a paragraph of this unit (expected s0, s1, s2, s3, s4, s5)
  ! daniel-lion: no such unit, but 3 recording(s) in assets/audio/daniel-lion
```

Keys `teach`, `memory` and `prayer` are accepted for future use; the story
paragraphs are the ones the player reads today.

## The six rules that decide whether a lesson is finished

1. **Every quiz item carries `hint`.** The retry ladder is: gentle nudge → your
   hint → reveal. No hint means a child hits a wall.
2. **Quoted Scripture verbatim, next to the retelling.** The app prints
   “from the WEB” and never paraphrases inside the quote block. WEB or KJV only
   (public domain).
3. **Mature material — death, violence, divine judgement — belongs to 7–12.**
   Set `mature: true` **and** `hardNote` (an adult-facing sentence about how you
   handled it and what to say if a child asks more). A 3–6 unit must not contain
   the theme at all; substitute the softer angle. Tests enforce both directions:
   nothing hard reaches the youngest tier, and the older tiers are *not*
   sanitised (there is a test that fails if the cross stops saying He died).
4. **`when` is the chronological slot** (global, 1–57); `path` is the position
   inside the tier’s own guided path; `track` / `era` / `testament` place it in
   the three library views. Overlapping by design: one lesson can sit in the
   Exodus era, the “God keeps promises” track, and the Old Testament column.
5. **Every `sort` item names a bucket that exists.** `{ text: '…', b: 'a' }` —
   the key is `b`. A misspelling there used to pass validation and left a child
   dropping an item into a bucket that does not exist, forever. The validator now
   checks each item’s `b` against the declared bucket ids and that both buckets
   actually get used.
6. **Growth language, never deficit language.** “3 more to walk”, never
   “17 left”. “First-try answers 4 of 5”, never “2 wrong”. The i18n files are
   scanned for shame words; so is every child screen in the DOM test.

## Checking your work

```bash
node tools/validate.mjs
# units loaded : 57
# by tier      : L=20  M=20  H=17
# mature-gated : 11 (must be invisible to tier L)
# quiz items   : 276
# story words  : 12379
# validation   : all units pass
```

The validator refuses: a quiz item with a `hint` after the array close, duplicate
options, a `c` index out of range, a `match` with a repeated right side, a tier-L
unit marked `mature`, a unit whose `xp` is off-band, a tier path with a gap, and
any unit missing `memory` / `prayer` / `badge` / `printable`.

Then `npm test` (engine, art, both child flows) and `node build.js`.

## Adding a language

1. Copy the English block in `js/core/i18n.js` to a new `ur`-style dictionary and
   translate. `LANGS` gains `{ code, name, dir }`.
2. Add a `ur` (or `ps`, `ar`, …) object to each unit: `title`, `summary`,
   `story[]`, `scripture[].text`. Anything you leave out falls back to English,
   so partial translation is safe to ship.
3. RTL is handled by logical properties in the stylesheet; `dir` is set from the
   language table. Do not add `left`/`right` rules for new components — use
   `margin-inline-start` and friends.

Parity is tested: every key used in the app must exist in both dictionaries, and
the `{variable}` placeholders must match.
