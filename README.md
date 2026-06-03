# AstraZeneca Design System

A working brand + product design system for **AstraZeneca D&D IT** (Data & Digital) internal tooling. It packages the brand foundations (color, type, status semantics), real visual assets (logo), and high-fidelity UI-kit recreations of the two live products that consume the brand tokens.

> **Source of truth.** Brand tokens originate in the canonical repo
> [`kmntsvld/az-design-system`](https://github.com/kmntsvld/az-design-system) and are
> consumed by two product apps via CDN. This design-system project mirrors those tokens
> and adds documentation, preview cards, UI kits, and a reusable skill. To explore the
> originals (and do an even better job building on this brand), browse:
> - **Brand tokens:** https://github.com/kmntsvld/az-design-system (`tokens.css`, `tokens.js`, `CLAUDE.md`)
> - **Product 1 — Metrics Dashboard:** https://github.com/kmntsvld/Metrics-Dashboard (`dashboard.html`, `dashboard-v2.html`)
> - **Product 2 — Resource Plan:** https://github.com/kmntsvld/Resource-Plan (`index.html`, React + Tailwind)

---

## Company & product context

**AstraZeneca** is a global biopharmaceutical company. This design system is **not** the
consumer pharma brand site — it is the brand system as applied by the internal **D&D IT**
team to its **operational tooling**. Everything here is data-dense, plan-vs-fact, decision-support
software for an internal corporate audience. All product UI copy is in **Russian**.

Two products consume the brand tokens:

| Product | What it is | Stack | Brand fit |
|---|---|---|---|
| **Operational Efficiency Dashboard** | Plan/Fact/Δ metrics across a Goal → Digital/Non-Digital → Value Stream → Project → Metric (L1–L4) hierarchy. Drill-down tables, quarterly columns, yearly rollups, executive summary. | Single-file HTML + CSS + JS (no framework). Light **and** dark theme. | Full brand application — mulberry, gold, status palette, Inter tabular-figure data, level badges. The most "on-brand" surface. |
| **Resource Plan D&D** | FTE allocation matrix: employees × months, grouped by project/department, with an executive summary and decision cards (overloaded / releasing / under-loaded). | React 18 + Babel + Tailwind (CDN, no build). Light only. | Mulberry topbar + brand accents over Tailwind **slate** neutrals; functional FTE heat scale (non-brand). |

Both are prototypes (static data snapshots, no auth) on a clear path to production. They share
the brand-token CDN so a token change propagates to both.

---

## Repository index (this project)

| Path | What it is |
|---|---|
| `README.md` | This file — context, content & visual foundations, iconography, index. |
| `colors_and_type.css` | Brand color primitives, light/dark semantic layers, type roles & scale. Start here for any build. |
| `SKILL.md` | Agent-Skills-compatible entry point for generating AstraZeneca-branded artifacts. |
| `assets/` | Logo (magenta wordmark + helix) and a white knockout for dark surfaces. |
| `preview/` | Small HTML specimen cards that populate the Design System tab. |
| `ui_kits/metrics-dashboard/` | UI kit: the Operational Efficiency Dashboard (HTML/CSS/JS recreation). |
| `ui_kits/resource-plan/` | UI kit: the Resource Plan FTE matrix (React/JSX recreation). |

There is no slide template in the source material, so no `slides/` folder was created.

---

## Brand foundations at a glance

**Colors** — Primary: Mulberry `#830051`, Dark Mulberry `#4d0030`, Magenta `#d0006f`, Gold `#f0ab00`.
Neutrals: Graphite `#3f4444`, Platinum `#9db0ac`, Light Platinum `#ebefee`, White.
Accents (sparingly, never as background or body text): Purple `#3c1053`, Navy `#003865`,
Light Blue `#68d2df`, Lime Green `#c4d600`.

**Type** — Display/headings: **Roboto Slab** (400, 700). Body/UI: **Inter** (300, 400, 700).
Data/numbers: **Inter** with tabular figures (`tnum`) — the same family as body text, no separate mono face. Both are Google Fonts, loaded by CDN
in the host page (the source apps do the same — see `colors_and_type.css` header for the link).

---

## CONTENT FUNDAMENTALS

How copy is written across these tools.

- **Language: Russian, throughout the product UI.** Labels, column headers, empty states,
  tooltips, button text — all Russian. English survives only for established domain terms and
  acronyms: *FTE, YtG, YTD, PhB, План/Факт, Effect $m, L1–L4, D&D, PMO, OSP, Scrum Master*.
  Mixed Cyrillic/Latin in one string is normal and expected (e.g. "Средний FTE — 2026",
  "1Q26 План/Факт", "Загрузка по отделам").
- **Tone: terse, operational, neutral.** This is internal decision-support tooling, not marketing.
  Copy is functional and dense; no slogans, no encouragement, no exclamation. Sentence fragments
  and abbreviations are preferred over full sentences ("Файл не загружен", "Нет данных за 2026 год
  для выбранного фильтра", "82 из 120 сотр.").
- **Voice: impersonal / system-as-narrator.** No "you", no "we". The UI states facts about data
  ("Перегружены сейчас", "Высвобождаются через 3 мес."). Imperatives appear only as direct
  instructions to the user in empty states ("Загрузите Excel с листом **Data**, чтобы построить
  годовую сводку.").
- **Casing.** Titles and section headers use sentence case in Russian ("Годовой план",
  "Поквартальный план / факт", "Структура загрузки"). Table column micro-heads are **UPPERCASE**
  with wide letter-spacing ("ПОКАЗАТЕЛЬ", "OWNER", "EFFECT"). Level badges are uppercase: L1–L4.
- **Numbers & units are explicit.** Currency as `$5.70m`, percentages as `82%`, FTE as `1.4 FTE`,
  deltas with explicit sign and unit (`+0.20m`, `−2pp`). "Plan / Fact" is rendered as muted-plan
  `/` bold-fact. Missing data is never blank-blank — it reads "нет данных", "—", or "TBD".
- **Emoji: used, but only as functional status/section markers** in the products — never decorative.
  Seen: 🎯 (goal/target section), 📊 (table section), 🎵 ("Jazz" value-stream block), 🔴🟡🟢
  (decision-card status: overloaded / releasing / available), ☀️🌙 (theme toggle), ⬆ (upload),
  📡 (live-data indicator), ⚙ (column settings), ▾▸ (expand/collapse), ⇅↑↓ (sort). Treat these as
  a constrained icon vocabulary, not as brand personality. **Do not add new decorative emoji.**
- **Example strings (verbatim from the products):**
  - "Operational Efficiency Dashboard" · "Годовой план" · "Efficiency target · 2025–2028 · % и abs., m$"
  - "Поквартальный план / факт" · "метрики L1–L4 · План / Факт / Δ" · "▾ Развернуть всё" · "⚙ Колонки"
  - "Resource Plan" · "Перегружены сейчас" · "Высвобождаются через 3 мес." · "Слабозагружены (<50%)"
  - "Поиск сотрудника..." · "По проектам / По отделам / Все" · "FTE % / Ч/д" · "FTE YtG"

---

## VISUAL FOUNDATIONS

The brand reads as **modern / tech, data-first, quietly premium**. Mulberry does the heavy
lifting; everything else stays calm so the numbers are the loudest thing on screen.

- **Color usage.** Mulberry `#830051` is the single dominant brand color — sidebar/topbar
  gradient, primary buttons, active states, key accents, focus ring. Dark Mulberry `#4d0030`
  is its hover/pressed and the dark end of every brand gradient. Gold `#f0ab00` is the
  signal color (alerts, the "rollup/total" column tint, "releasing FTE"). Magenta `#d0006f`
  is for highlights, badges, "off-track". Neutrals carry all structure. The four accent inks
  (Purple, Navy, Light Blue, Lime Green) appear **only** as small data-viz/status dots — a
  brandbook rule forbids them as backgrounds or body text.
- **Gradients.** Exactly two, both mulberry→dark-mulberry: a vertical sidebar gradient
  `linear-gradient(180deg, #830051 0%, #4d0030 100%)` and a 135° topbar variant. No rainbow,
  no blue-purple SaaS gradients, no decorative mesh. Dark theme deepens to `#4d0030 → #2a0a1d`.
- **Backgrounds.** Flat solid surfaces — never imagery, never patterns or textures behind UI.
  Light: page `#eef1f0`, cards `#ffffff`, controls `#fafbfb`. Dark: warm mulberry-tinted
  neutrals from `#171219` (page) up through `#221a26 / #2a2030 / #2f2436` as elevation rises.
  (The Resource-Plan app uses Tailwind slate `#f8fafc / #f1f5f9 / #e2e8f0` for its chrome — a
  known divergence from the brand neutral ramp; the Dashboard uses the brand ramp correctly.)
- **Cards.** Solid surface, `1px` hairline border (`#e6eae9` light / `rgba(255,255,255,0.09)`
  dark), `14px` radius ("rounded-xl"), `overflow:hidden` so headers clip cleanly. A card head
  sits on the slightly-tinted `surface-alt`/`tint-row` with a bottom hairline. Shadows are
  minimal — `shadow-sm` (`0 1px 2–3px rgba(0,0,0,0.06–0.08)`); the data, not elevation, is the
  focus. Menus/popovers get a stronger drop shadow (`0 8px 28px`).
- **Corner radii.** Cards `14px`; menus/inputs/larger controls `10px`; buttons/segments `7–9px`;
  small chips/swatches `4–6px`; pills (dept chips, year toggles) fully rounded `20px`.
- **Borders & dividers.** Hairline 1px everywhere. Stronger 2px borders mark structural
  boundaries: sticky-column right edge, table-head bottom, period-group column starts, and the
  current-month marker (a 2px blue `#3b82f6` left border — a deliberate functional, non-brand
  indicator). Table-head bottom uses a translucent mulberry `rgba(131,0,81,0.55)` in dark theme.
- **Row tinting.** Group/total rows get a faint mulberry wash (`#f7eef4` light /
  `rgba(131,0,81,0.16)` dark); generic zebra/hover tint is `#faf7f9` / `rgba(255,255,255,0.03)`.
  The rollup ("итог") column carries a gold tint (`rgba(240,171,0,0.06)`) with a gold top text.
- **Typography in practice.** Roboto Slab gives headings a confident slab-serif weight against
  Inter's neutral UI text; Inter's tabular figures (tnum) keep number columns aligned — numbers and labels share one family. Body is
  small and dense (13px base, 11–12px in tables, 9.5px uppercase micro-heads) — appropriate for
  data tools, not for marketing pages.
- **Status system.** Five semantic states — over (navy/light-blue) · ontrack (green) · risk (gold)
  · off (magenta) · nodata (platinum) — each a triad of dot/text/chip-bg, defined for both themes.
  Used for plan-vs-fact health, never decoratively.
- **Animation.** Restrained and fast. CSS transitions `0.1–0.4s` on `background`, `filter`,
  `transform`, `width` (bar charts grow with `width 0.4s`). Hover = subtle (`brightness(0.92)`
  on heat cells, faint tint on rows, color shift on buttons). Cards lift `translateY(-1px)` on
  hover. Expand/collapse chevrons rotate. No bounce, no spring, no parallax, no looping/decorative
  motion. Respect data legibility over flourish.
- **Hover / press states.** Buttons: mulberry → dark-mulberry on hover. Tool buttons: border &
  text shift to mulberry. Nav items: `rgba(255,255,255,0.1)` hover / `0.2` active over the
  mulberry sidebar. Dept pills invert to white-on-mulberry when active. Press states rely on the
  hover-darken rather than scale-shrink.
- **Transparency & blur.** Used for layering over the mulberry sidebar/topbar only —
  white at 10–20% opacity for inputs, dividers, nav backgrounds. No backdrop-blur/glassmorphism;
  surfaces are solid. Dark-theme tints use low-opacity white overlays.
- **Imagery & illustration.** Essentially none — this is data tooling. The only raster asset is
  the logo. No photography, no spot illustration, no iconographic hero art. If imagery is ever
  needed, keep it cool/neutral and secondary to data.
- **Layout rules.** Sticky topbar/header (`z-index` high). Sticky first column + sticky table
  head for large matrices. Fixed-height chrome (topbar 56px, card heads ~48px) with a single
  scrolling data region. Generous but not loose padding (`14–28px`). Content is full-width and
  utilitarian — no narrow centered "marketing" column.

---

## ICONOGRAPHY

The brand's icon approach is **minimal and pragmatic — there is no custom icon font or SVG icon
set in the source.** Document and follow this honestly rather than inventing one.

- **No bundled icon library.** Neither product ships an icon font, SVG sprite, or PNG icon set.
  Iconography is carried almost entirely by a **small, deliberate set of Unicode glyphs and emoji
  used as functional markers** (see CONTENT FUNDAMENTALS for the full list):
  - **Geometric/UI glyphs:** `▾` `▸` (expand/collapse), `⇅` `↑` `↓` (sort), `×` (clear/dismiss),
    `·` (separator), `—` (no-data), `/` (plan/fact separator). These are the workhorse icons.
  - **Emoji as status/section markers (functional, not decorative):** 🎯 📊 🎵 (section heads),
    🔴 🟡 🟢 (decision-card status), ☀️ 🌙 (theme), ⬆ (upload), ⚙ (settings), 📡 (live data).
  - **Color dots** (`<span>` with a brand/status background, 8–12px, `border-radius` round) stand
    in for status icons in legends and chips.
  - **A "D&D" text badge** (Roboto Slab on a translucent-white rounded square) serves as the app
    mark in the Resource-Plan topbar, in place of an icon.
- **Logo, not icon.** The one true brand asset is the AstraZeneca wordmark+helix logo
  (`assets/az-logo.png`, magenta wordmark + gold helix on transparent). On dark/mulberry
  surfaces use the white knockout (`assets/az-logo-white.png`). The Dashboard shows the logo at
  ~26px tall in its header beside a hairline divider and the page title.
- **Recommendation when you need more icons.** If a new surface genuinely needs a richer icon set,
  add **Lucide** (https://lucide.dev) via CDN — its thin, geometric, single-stroke style matches the
  modern/tech, low-decoration aesthetic and pairs well with Inter. **This is a substitution, not
  something present in the source — flag it to the user and keep usage sparse.** Do not introduce a
  heavy filled icon style; it would fight the restrained brand.

> ⚠️ **Substitution flag:** No icon system exists in the brand repos. The Lucide recommendation
> above is the system's own suggestion, not AstraZeneca canon. Confirm with the user before
> standardizing on it.

---

## How to build with this system

1. Load fonts + tokens in your `<head>`:
   ```html
   <link rel="preconnect" href="https://fonts.googleapis.com">
   <link href="https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@400;700&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
   <link rel="stylesheet" href="colors_and_type.css">
   ```
   (In the live products these come from the jsDelivr CDN of `az-design-system@main`; this project
   vendors the same values in `colors_and_type.css`.)
2. Use semantic vars: `var(--color-mulberry)`, `var(--bg-surface)`, `var(--text)`, `var(--font-display)`.
   Opt into dark mode with `<html data-theme="dark">`.
3. For product UI, pull components from `ui_kits/<product>/`.
4. Keep mulberry dominant, accents tiny, neutrals structural, data in mono. Restrained motion.

---

## Caveats & substitutions

- **Fonts** are loaded from Google Fonts CDN (Roboto Slab, Inter) exactly as the
  source apps do — no local `.ttf` files were vendored. Both are standard Google Fonts, so
  this is a faithful match, not a substitution.
- **No icon set** exists in the source (see ICONOGRAPHY). Lucide is a *suggested* addition only.
- **No slide template** was provided, so no sample slides were produced.
- The **Resource-Plan** chrome uses Tailwind slate neutrals rather than the brand neutral ramp —
  the UI kit reproduces this faithfully (it's the real product), but new brand surfaces should
  prefer the `--*-platinum` / surface ramp from `colors_and_type.css`.
