# Sauls Sunday School — Build Specification

## App Overview
Build "Sauls Sunday School" — a web app (to deploy at **Sundayschool.saulspodship.com**) plus a companion Android app — that teaches kids ages **3–12** about God, Jesus, the Holy Spirit, the Bible, and core Christian concepts at their comprehension level. The app is a full, free, ad-free ministry tool tied directly to the **Saulspodship** brand (shared characters, cross-promotion with saulspodship.com). Theological framing should match Saulspodship's existing content style and stance.

---

## 1. Age Tiers & Personalization
- Age range: **3–12**, split into tiers (e.g., 3–6, 7–11), combined with:
  - An **adaptive flow** that levels a child up as they progress
  - **Manual level selection** available to parent/child at any time
- **Onboarding**: child creates their own profile with just a **name + age picker** — no parent account required to start.
  - Onboarding includes a short, fun **placement quiz (5–8 questions)** on basic Bible familiarity/age to set the starting level.
  - Child picks a **companion type** (lamb, dove, shepherd, etc. — Bible-themed) and names it.
- **Parent dashboard** (optional, separate from child profile): supports multiple child/sibling profiles, with visual progress dashboards (charts + simple summary: units completed, streak, badges) and a detailed drill-down (quiz scores, time spent, weak topics).

## 2. Learning Format
Mix of three modes throughout:
1. **Story/narrative mode** — Bible stories told simply, narrated
2. **Lesson + quiz mode** — teach a concept, then check understanding
3. **Game-based mode** — points, badges, mini-games

Quiz question formats vary by age tier:
- Younger tiers: multiple choice, drag-and-drop/matching
- Older tiers: fill-in-the-blank / typed answers
- All tiers: multiple choice as a baseline

## 3. Content Scope & Curriculum Organization
Full curriculum — not just stories:
- Bible stories (Old & New Testament)
- Core doctrines: Trinity, salvation, prayer, Ten Commandments, etc.
- Character/values lessons: kindness, honesty, forgiveness, etc.

**Organize content three overlapping ways** so kids/parents/teachers can navigate however suits them:
- Chronological Bible timeline (Creation → Revelation)
- Thematic tracks (God, Jesus, Holy Spirit, Church, etc.) — each track internally chronological
- Parallel Old Testament / New Testament tracks

Content is accessible via:
- A **structured curriculum path** (guided, course-like progression)
- A **free-roam library** to jump to any story/topic anytime

**Bible text style**: show the original translation quoted, alongside a simplified kid-friendly retelling.

**Mature content rule**: difficult/mature material (violence, death, judgment) is introduced only in older tiers (7–12). The youngest tier (3–6) avoids these stories entirely, substituting gentler content.

**Initial launch scope**: build out 50+ units — a near-complete curriculum from day one, not a small pilot.

## 4. Gamification & Engagement
- Streaks, XP points, levels
- Collectible badges/stickers per completed unit
- A customizable **"home base"** (room/garden) decorated with earned items
- A **virtual companion** (Bible-themed: lamb, dove, shepherd, etc.) chosen and named by the child at signup, that visibly grows/evolves as they learn
- **Leaderboards**: both a global leaderboard (all users) and private group leaderboards (family/class/church)
- Leaderboard social interaction: pre-set friendly reactions (emoji/stickers) between kids only — **no free text chat**, for child safety

## 5. Prayer & Memory Verse Features
- **Guided prayer prompts** at the end of each lesson
- A **personal prayer journal/list** kids can add their own prayers to
- **Memory verse challenge**: flashcards / spaced repetition system for Scripture memorization, with a rewards boost (XP/badges) for verses memorized

## 6. Audio & Accessibility
- Full voice narration for all stories/lessons
- Read-along mode with word-by-word highlighting (supports pre-readers and literacy)
- Option to read silently (narration off)
- **Multi-language support**: English, Urdu, and expandable to others

## 7. Family & Classroom Modes
- **Individual/solo mode** for kids learning on their own
- **Family devotional mode** and **church classroom group mode**
- **Group creation is restricted to verified church/organization accounts only** — not open to any parent/child, to keep the social/leaderboard layer safe
- **Teacher toolkit** (for verified church/org accounts): assign lessons/units, print materials, track attendance, manage group leaderboards

## 8. Printable Extras
- Printable coloring pages, activity sheets, and craft ideas
- Downloadable PDFs for parents/teachers to print and use offline

## 9. Offline Support
- Hybrid model: downloaded lessons/units work fully offline
- Internet required only for syncing progress and pulling new content

## 10. Notifications
- Gentle, **optional** daily verse/lesson reminder notifications — not aggressive or frequent push

## 11. Branding & Ecosystem Tie-In
- Visual style: cartoonish/animated for younger tiers, more mature illustrated storybook style for older tiers
- Directly integrate Saulspodship branding: shared characters, consistent visual identity, and cross-promotion links between the app and **saulspodship.com**

## 12. Platform & Monetization
- **Platforms**: Web app (deployed at Sundayschool.saulspodship.com) + Android app
- **Monetization**: completely free, no ads — a ministry/goodwill project
- **Build tool**: this spec is intended to be handed to **lmarena.ai agent mode** to generate the app

## 13. UX Design Principles (Critical)
Everything must be designed **from the child's perspective first** — this overrides any temptation toward "efficient" adult-style UI:
- **No intimidating, punitive, or "bully" UI patterns**: no harsh red X's, no shaming language on wrong answers, no countdown pressure timers on quizzes, no aggressive pop-ups or nagging.
- Wrong answers should feel like gentle encouragement to try again ("Almost! Let's try that one more time" tone), never failure or loss.
- Navigation must be extremely simple: large tap targets, minimal text for younger tiers, icon/picture-led menus for pre-readers, clear "back home" path from anywhere.
- Data structures (progress, levels, streaks) should be modeled to always show the child **how far they've come**, not how far behind they are — framing is growth-oriented, not deficit-oriented.
- Avoid overwhelming choice — surface a small number of clear next steps at any given screen (e.g. "Continue your path" + "Explore library" + "Play with [companion]"), not a dense dashboard.
- Parent/teacher dashboards can be more information-dense, but the **child-facing side must stay warm, simple, and pressure-free** at every age tier.

---

## Suggested Build Priorities (for agent mode)
1. Core profile creation + placement quiz + companion selection flow
2. Curriculum data model supporting the three overlapping organization schemes (timeline / thematic / OT-NT) plus structured path + free-roam library
3. Lesson/story player with narration, read-along highlighting, and quiz engine (multi-format, age-tiered)
4. Gamification layer: XP, streaks, badges, home base, companion growth
5. Leaderboards (global + private group) with reaction-only social layer
6. Parent dashboard + progress visualizations
7. Church/org verified accounts + teacher toolkit
8. Prayer journal + memory verse spaced-repetition module
9. Printable/downloadable content generator
10. Offline sync layer
11. Multi-language localization (English, Urdu, extensible)
12. Saulspodship branding integration + cross-promotion links
