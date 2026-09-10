# Spec coverage

Requirement → where it lives → how it is proven. “Tested” means `npm test` fails
if it regresses. Paths are relative to the project root.

| § | Spec requirement | Implementation | Proof |
|---|---|---|---|
| 1 | Three age tiers 3–6 / 7–9 / 10–12 | `logic.tierForAge`, `TIERS` (read size, quiz menu, XP band, `mature` flag) | logic tests: boundaries, clamping |
| 1 | Adaptive level-up + manual override | `logic.levelForXp` / `xpForLevel` curve; `St.setTier`, parent chip row | `test-dom` (“manual level override”), reward flow |
| 1 | Onboarding asks name + age only | `app.js → onboardView` steps `welcome · name · age` | DOM: boots to onboard, 10 age chips |
| 1 | 5–8 question placement quiz | `logic.PLACEMENT` (7 q), `scorePlacement`, skip for an adult | logic: length + suggested tier, all-wrong → youngest |
| 1 | Named, Bible-themed companion | 8 species × 5 stages in `art.companion`, `logic.COMPANIONS`, naming step with a suggested name | DOM: pick → name → persists; art: 606 drawings valid |
| 2 | Story / lesson+quiz / game modes | `unit.mode`, `unitView` phases `cover → story → teach → quiz → prayer → reward`; game = `mode:'game'` units with the tap/order formats | DOM: phase walk |
| 2 | MC baseline; drag-match young, typed older | `quizTypesForTier`: L = mc/tap/match(→tap-to-connect)/order; M adds blank+sort; H full menu | logic + tier tests (typed answers never appear at L) |
| 2 | Original translation quoted beside the kid retelling | `unit.scripture` rendered in `.scripture` with “(WEB)” | DOM: quote present, labelled, non-trivial length |
| 3 | 50+ units | **57** units, all written: 20 L / 20 M / 17 H, 12 379 story words, 276 quiz items | `tools/validate.mjs` |
| 3 | Three overlapping organisation schemes | `era` (8 periods) → timeline; `track` (7 thematic, internally chronological); `testament` → OT/NT column; plus `path` (guided) and the library | DOM: tab-by-tab render |
| 3 | Guided path **and** free-roam | `pathUnits` (level-matched, contiguous) vs `libraryUnits` (search, filters, within reach) | logic: path stays level-matched; tier test: library widens 20 → 40 → 57 |
| 3 | Mature content (violence/death/judgement) 7–12 only, gentler 3–6 | `mature` + `hardNote`; `canChildSee` gate; substitute units written for L | logic: every mature unit absent from path/library/search/era/track for L; **tier test drives the UI from a 4-year-old’s side** and checks the gate never names the locked story; content scan for death vocabulary in 3–6 text; a guard test that the older tiers are *not* sanitised |
| 4 | XP, streaks, badges | `xpAwarded`, `touchStreak` (1-day grace), `badges` from unit `badge`, levels with growth titles | logic: streak grace/reset, “revealed” not double-paid, framing words |
| 4 | Home base | `logic.homeGrid` 12 slots + `app2.js` garden; stickers earned per completed unit | DOM: place → persists in `profile.home.slots` |
| 4 | Companion growth | `companionStage` over `STAGE_XP`, stage pills, no countdown | logic: 5 stages, caps, unknown type falls back |
| 5 | Global + private leaderboards, reaction-only | `rankRows`, `globalPeers` (simulated, labelled `demo`), group board; 8 reactions, 12/day budget | logic: reaction whitelist rejects text; DOM: the social sheet contains **no input**; tier test: group board behind verification |
| 6 | Full narration, read-along highlight, silent option | `speech.js` (Web Speech, word boundary highlight, rate, voice pick), “Read silently” on every cover, `settings.narration`; recorded narration per paragraph via `assets/audio/<unit>/<lang>-<key>.mp3` → `npm run audio` → `js/data/audio.js` | DOM: controls present, graceful with no engine (jsdom has none); DOM: `narrate()` uses the mapped file when present, and when `play()` fails it falls back to the device voice instead of skipping; live test: `audio.js` and the MP3 are served from the deployed tree |
| 6 | Accessibility | `data-focus` on inputs, keyboard `Enter`/`Esc`, `prefers-reduced-motion`, `aria-live` root, focus-visible rings, ≥44 px targets, print + high-contrast blocks | CSS review; DOM: no `.tiny` under 44 px (test reads the stylesheet) |
| 7 | Solo / family / classroom modes | profile switcher (`#/switch`), family groups freely, `groups` teacher toolkit | DOM + tier tests (add a child without corrupting the first) |
| 7 | Group creation only for verified church/org accounts | `verifyOrg` (name, leader, `SS-####` code) → `pending` → confirm; `canCreateGroup`; families exempt | tier test: pending card → approve → church kind unlocked; UI states plainly that this build has no server to verify against |
| 7 | Teacher toolkit: assign, print, attendance, class board | `assignToGroup`, `markAttendance`, class print, per-group board | tier test: assign control exists after verification |
| 7 | Parent dashboard with charts + drill-down | `app2.parentView`: 5 cards, week bars, track bars, `weakTopics` + `parent-drill`, quiz log with first-try/needed-help, time on task, export/import | DOM: cards, chart rects, log rows, effort columns |
| 8 | Printable colouring / activity / craft / parent sheets | `logic.printablePack`, `art.colouringPage`, in-app print window (`printDoc`) with `@page` CSS; `tools/build-print.mjs` → 57 SVG (sized 8.5in × 11in) + 57 PNG + 3 level PDFs + print hub that links every sheet and every PDF | art tests render every motif as a colouring sheet; `tools/test-print.mjs` decodes the pixels of all 57 PNGs (blank *and* flooded pages fail), checks the page aspect, counts PDF pages per tier against the unit count, and resolves every link the hub prints |
| 9 | Hybrid offline | `sw.js` cache-first shell incl. all data; `St` on localStorage; “save all units”; queue of unsent events; `standalone.html` needs no network at all | `syncState` label test; built file is self-contained |
| 10 | Gentle optional daily reminders | `sync.js` notifications, opt-in day picker, one per day, no nagging copy, test button | DOM: settings row exists; nothing fires unprompted |
| 11 | Brand & ecosystem tie-in | `SS_META.BRAND` (name, tagline, links, “50 volumes” hint), brand card at onboarding + More, `.pod-link` volume deep-link on the 10–12 home and reward; skins: cartoonish for 3–6, illustrated/serif for 10–12 | DOM: brand card on the first screen; tier test: pod link, `rel="noopener"` |
| 12 | Web at Sundayschool.saulspodship.com + Android, free, no ads | `docs/DEPLOY.md`; `capacitor.config.json` + `docs/ANDROID.md`; no ad/analytics SDK anywhere; “Free forever. No ads.” stated to the child | grep-for-trackers is trivially clean; nothing in `package.json` except Capacitor + jsdom |
| 13 | Child-first UX overrides | no red X (correct answers mark, misses nudge → hint → reveal), no timers, ≤3 next steps (`nextSteps`), growth framing (`framing*`), icon-led nav, back-home from everywhere, density only on adult screens | logic: framing has no deficit words + no shame words anywhere in copy; DOM: `§13 sweep` over 10 child screens for shame words and clock-like text; `--tap` 52–64 px |
| 13 | Wrong answers feel like encouragement | `GENTLE_LINES` + `pickGentle`, `retryTone`, “Do it again” never “Retry failed” | logic test on the phrase bank |

## Deliberate deviations, stated plainly

1. **No backend in this build** (your chosen scope). Everything that needs a
   server — global board peers, church verification against a registry, cloud
   sync, cross-device class rosters — runs locally and is labelled on screen
   (`demo` tags, “No server in this build” note on the org card and groups
   notice). The data shapes are the ones a real API would fill; `sync.js` is the
   seam.
2. **Narration is the browser voice by default.** One unit — Jonah — is fully
   recorded (6 clips, 91 s) as the worked example, because a slot nobody has used
   is a promise. The rest are not blocked on anything: drop MP3s in the folder,
   run `npm run audio`, and each recorded paragraph switches over while the
   unrecorded ones keep the device voice.
3. **Drag-and-drop is tap-to-connect** on matching questions at every tier: on a
   phone in a pocket, drag is the least reliable gesture for a 5-year-old, and
   the spec’s own §13 (large targets, no failure states) outranks the gesture
   wording in §2. Typed answers for the older tiers are kept exactly as specified.
4. **Urdu covers the whole UI and the unit titles/summaries/story**; if a
   translation field is missing, the app falls back to English rather than
   rendering a raw key.
5. The library offers every unit **at or below** the child’s level, not above it
   (see §3 free-roam + mature rule together): a 5-year-old may roam all 20
   gentle units, not read a 9-year-old’s lesson about blood and graves.

## Not built (honest list)

- Real accounts, server-side rosters, push delivery, and cross-device sync.
- iOS build (spec asked for web + Android).
- Recorded narration for the other 56 units (the convention, the generator, the
  fallback and the tests are built; one unit is recorded end to end).
- A signed Play-Store artefact: `android/` is generated on a machine with the SDK;
  `docs/ANDROID.md` has the exact commands and the icon/splash assets are pre-made.
