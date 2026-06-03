---
name: astrazeneca-design
description: Use this skill to generate well-branded interfaces and assets for AstraZeneca (specifically the D&D / Data & Digital IT internal-tooling brand application), either for production or throwaway prototypes/mocks/etc. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping.
user-invocable: true
---

Read the `README.md` file within this skill, and explore the other available files.

If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out and
create static HTML files for the user to view. If working on production code, you can copy
assets and read the rules here to become an expert in designing with this brand.

If the user invokes this skill without any other guidance, ask them what they want to build or
design, ask some questions, and act as an expert designer who outputs HTML artifacts _or_
production code, depending on the need.

## What's here
- `README.md` — full context: company/product, content & visual foundations, iconography, index.
- `colors_and_type.css` — brand color primitives, light/dark semantic layers, type roles & scale. Load this first.
- `assets/` — AstraZeneca logo (`az-logo.png`) + white knockout (`az-logo-white.png` for dark/mulberry surfaces).
- `preview/` — small specimen cards (type, color, spacing, components, brand).
- `ui_kits/metrics-dashboard/` — Operational Efficiency Dashboard (React kit, light/dark, plan-vs-fact tables).
- `ui_kits/resource-plan/` — Resource Plan FTE matrix (React kit).

## Fast rules (defaults — confirm if it matters)
- **Mulberry `#830051` is the one dominant brand color.** Dark Mulberry `#4d0030` for hover/gradient-dark.
  Gold `#f0ab00` = signal/total. Magenta `#d0006f` = highlight/off-track. Neutrals carry structure.
  Accent inks (Purple/Navy/Light Blue/Lime) only as tiny data-viz/status dots — never bg or body text.
- **Type:** Roboto Slab (headings), Inter (body/UI + numbers via tabular figures). All Google Fonts.
- **Brand gradients:** mulberry→dark-mulberry only (180° sidebar, 135° topbar). No other gradients.
- **Surfaces are flat & solid** — no background imagery, patterns, or glassmorphism. Cards: 14px radius,
  1px hairline border, minimal `shadow-sm`. Restrained, fast CSS transitions (0.1–0.4s). No bounce/parallax.
- **Voice:** terse, operational, impersonal; product UI is in **Russian**. Emoji used only as functional
  status/section markers — never decorative. No custom icon font exists (Lucide is a flagged suggestion).
- **Status semantics:** over / on-track / risk / off / no-data — each a dot/fg/bg triad, both themes.

Setup snippet for any new page:
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@400;700&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="colors_and_type.css">
<!-- opt into dark mode: <html data-theme="dark"> -->
```
