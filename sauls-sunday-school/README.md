# Saul’s Sunday School

A free, ad-free Bible learning app for ages 3–12 — the children’s ministry of
[Saul’s Podship](https://saulspodship.com). Built to run on the web at
**SundaySchool.saulspodship.com** and inside an Android shell, with the same code.

A child types her name and her age, meets her companion, and starts walking a path
of narrated Bible stories, lessons, quizzes, memory verses and prayer. A parent gets
a dashboard. A teacher gets a class board. Nobody gets an advertisement, a data
sale, or a red X.

---

## Run it

```bash
node tools/serve.js            # serve the source at http://localhost:4173
node build.js                  # write dist/ (deployable) + dist/standalone.html
node tools/validate.mjs        # content report: 57 units, formats, mature gating
npm test                       # 704 checks: 33 engine, 606 drawings, 34 app-flow, 16 age-tier,
                               # 8 print-pack, 5 against the deployed multi-file page, 2 on a
                               # device that refuses to store anything
node tools/build-print.mjs     # classroom print pack: SVG, PNG, PDF, print hub
npm run audio                  # map whatever is in assets/audio/ into js/data/audio.js
```

There is no build system to trust. The site is plain HTML, CSS and ES5-style
script tags: open `index.html` and it works. `dist/standalone.html` is the whole
app — CSS, JS and all 57 lessons — in **one file (≈500 kB)** that can be emailed,
dropped on a stick drive, or opened offline in any browser.

## What is here

| | |
|---|---|
| **Curriculum** | 57 complete units (20 for ages 3–6, 20 for 7–9, 17 for 10–12): story text, quoted Scripture (WEB) beside the retelling, 276 quiz items, teach points, memory verse, prayer, badge, printable pack |
| **Three modes** | Story · Lesson + quiz · Game, per unit, with the quiz format chosen by age |
| **Three ways in** | Bible timeline · 7 thematic tracks (each chronological) · parallel Old / New Testament — plus a guided path *and* a free-roam library with search |
| **Adaptive level** | 5–8 question placement quiz at onboarding, automatic level-up, manual parent override at any time |
| **Companion** | 8 Bible creatures (lamb, dove, donkey, hen, ewe, camel, shepherd, lion), 5 growth stages, drawn as procedural SVG, named by the child |
| **Reward** | XP, levels with growth titles, streaks with a grace day, badges, a home-base garden the child decorates with earned stickers |
| **Social** | Global and class leaderboards with **reaction-only** interaction (8 emoji, 12/day, no free text, ever) |
| **Prayer & memory** | Prayer journal with five prompt modes; memory verses on a spaced-repetition schedule (1/3/7/14/30/60 days) |
| **Narration** | Full read-aloud with word-by-word highlight, silent mode, speed control — and recorded narration per paragraph: drop MP3s in `assets/audio/<unit>/`, `npm run audio`, done. Un-recorded paragraphs keep the browser voice |
| **Grown-ups** | Optional parent dashboard: charts, quiz log with “needed help” column, weak-topic drill-down, time on task, level override, backup/restore, print progress |
| **Classroom** | Family groups freely; class/church groups behind verified-organisation gating; assign units, attendance, class board, bulk print |
| **Print** | Colouring, activity, craft and “talk about it” sheets per unit — on screen, and pre-rendered by `tools/build-print.mjs` to letter-sized SVG, 1224 px PNG, one PDF per age level and a print hub (every page pixel-checked by the test suite) |
| **Languages** | English and Urdu (RTL, 248 keys each, parity tested). Add a language by adding one dictionary |
| **Offline** | Service worker + a full local store; every unit can be cached to the device |

## The rules this app is written to

`docs/SPEC-COVERAGE.md` maps every requirement to its code and its test. The
non-negotiable ones, enforced by tests rather than hope:

- **No shaming.** No red X, no “wrong!”, no countdown timer, no streak-guilt.
  A missed answer gets a nudge, then a hint, then the answer — the child never
  reaches a fail state. `tools/test-logic.mjs` fails the build on shame words
  and on deficit phrasing in *any* level of copy.
- **Mature content is 7+.** Violence, death and judgement stay in the 7–12
  material; 3–6 get gentler units written for them. Enforced in the data
  (`mature: true`), in the engine (`canChildSee`), and in the UI — the gate
  message does not even name the locked story. Tested from the child’s side.
- **Density is for adults.** Child screens: one idea, big targets (52–64 px),
  at most three next steps. The parent and teacher screens are the only dense
  views, by rule (`css/app.css` §skin tokens).
- **Nothing leaves the device in this build.** No accounts, no analytics, no ads.
  Anything that would need a server — global board peers, church verification,
  cloud sync — is simulated locally and **labelled as simulated on screen**.

## Layout

```
index.html            shell; loads data → core → app (no bundler)
css/app.css           design layer: three skins, RTL, print, reduced-motion, contrast
js/core/logic.js      the whole engine: pure, no DOM, unit-testable
js/core/{i18n,store,speech,sync,art}.js
js/app.js             shell, router, onboarding, home, path, library, player, quiz, reward
js/app2.js            companion, garden, prayer, verses, leaderboards, groups, parent, print, settings
js/data/meta.js       tracks, eras, roster, brand, daily verses, prayer modes
js/data/units-1..6.js the 57 lessons
tools/                validate, build-print, tests, serve
docs/                 deploy, content, android, spec coverage
dist/                 built output (gitignore-able; regenerated by node build.js)
capacitor.config.json        Android wrap (Capacitor)
```

See `docs/` for deployment, content authoring, Android packaging and the spec map.
Scripture: World English Bible (public domain).
