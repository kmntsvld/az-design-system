# UI Kit — Resource Plan D&D

High-fidelity recreation of AstraZeneca D&D's **Resource Plan** tool (the `Resource-Plan`
product). An FTE allocation matrix — employees × 12 months — with a decision panel, an
executive summary (three mini charts), and project/department grouping.

> Cosmetic recreation. The real app reads a SharePoint/Excel snapshot; this kit bakes in
> sample employees, projects, and allocations (`data.js`) and reproduces the **look and the
> live interactions** (filter by decision card, group by project/dept/none, expand a row to
> its project sub-rows, FTE %/ч-д toggle, search).

## Run
Open `index.html` (React + Babel via CDN — needs HTTP, not `file://`). Tokens from
`../../colors_and_type.css`.

## Components
| File | What it renders |
|---|---|
| `Topbar.jsx` | Mulberry gradient bar: "D&D" mark, year pills, department chips, search, live-data tag. |
| `DecisionPanel.jsx` | Three decision cards (overloaded / releasing / available) + group-by & view-mode segmented toggles + heat legend. |
| `ExecutiveSummary.jsx` | `MiniBar` dept-load chart, monthly-trend bars (current month in blue), load-distribution. |
| `Matrix.jsx` | `Matrix` table (sticky head + first col), `GroupHeaderRow`, `EmployeeRow` (expands to `HeatRow` project sub-rows), `ProjEmpRow`. |
| `helpers.jsx` | `window.RP_H` — FTE heat scale (`cellBg`/`cellText`) + lookups. |
| `app.jsx` | All state, filtering, grouping, metrics. |
| `data.js` | Sample roster & allocations. |

## Brand notes
- Mulberry topbar + brand-accented controls over **Tailwind slate** chrome (`#f8fafc`,
  `#e2e8f0`, `#64748b`) — faithful to the real product, a known divergence from the brand
  neutral ramp.
- **FTE heat scale is functional data-viz, not brand** — emerald→amber→red. Do not restyle.
- Current-month marker is a functional blue (`#3b82f6`), not brand decoration.
- Source: https://github.com/kmntsvld/Resource-Plan (`index.html`).
