# UI Kit — Operational Efficiency Dashboard

High-fidelity recreation of AstraZeneca D&D's **Operational Efficiency Dashboard** (the
`Metrics-Dashboard` product). Plan/Fact/Δ tracking across a Goal → Digital/Non-Digital →
Value Stream → Metric (L1–L4) hierarchy, with a yearly target rollup and a drill-down
quarterly table. Light **and** dark theme — the dashboard's signature.

> Cosmetic recreation. The real app parses an uploaded `.xlsx` and computes aggregation/YTD
> client-side; this kit bakes in representative sample data (`data.js`) and reproduces the
> **look and interactions** (drill-down expand/collapse, theme toggle), not the data engine.

## Run
Open `index.html` (React + Babel via CDN — needs HTTP, not `file://`). Tokens come from
`../../colors_and_type.css`; logo from `../../assets/`.

## Components
| File | What it renders |
|---|---|
| `Header.jsx` | Logo + title + upload button + light/dark `ThemeToggle`. Logo knocks out to white on dark. |
| `YearlyPlan.jsx` | Section A — yearly efficiency-target table (% and m$), mulberry year heads, tinted target/scope/stream rows. |
| `QuarterlyTable.jsx` | Section B — per-stream blocks with `MetricRow`, `PfCell` (plan/fact), `DeltaCell`, L1–L4 level badges, gold rollup column, drill-down. |
| `app.jsx` | Theme state + composition. |
| `data.js` | Sample portfolio data (`window.MD_DATA`). |

## Brand notes
- Full brand application: mulberry primary, gold signal/rollup, Inter tabular-figure data, status
  deltas (lime/magenta), warm mulberry-tinted dark surfaces.
- Theme switches `html[data-theme]`; semantic vars flip in `index.html`'s `<style>`.
- Source: https://github.com/kmntsvld/Metrics-Dashboard (`dashboard-v2.html`).
