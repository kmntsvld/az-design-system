/* helpers.jsx — FTE color scale + shared lookups for the Resource Plan kit. */
const RP = {
  emp:  (id) => window.RP_EMPLOYEES.find(e => e.id === id),
  proj: (id) => window.RP_PROJECTS.find(p => p.id === id),
  // Diverging scale: 100% = ideal (green). Grey idle → orange under → green full → amber/red over.
  cellBg(pct) {
    if (!pct)       return '#f1f5f9';   // 0% — no allocation
    if (pct <= 25)  return '#e2e8f0';   // minimal — neutral grey
    if (pct <= 50)  return '#fb923c';   // under-utilised
    if (pct <= 75)  return '#fde68a';   // slightly under
    if (pct <= 100) return '#86efac';   // ideal ≈ full
    if (pct <= 110) return '#fde68a';   // slightly over
    return '#f87171';                   // overloaded >110%
  },
  cellText(pct) {
    if (!pct)       return '#cbd5e1';
    if (pct <= 25)  return '#64748b';
    if (pct <= 50)  return '#7c2d12';
    if (pct <= 75)  return '#78350f';
    if (pct <= 100) return '#14532d';
    if (pct <= 110) return '#78350f';
    return '#7f1d1d';
  },
  formatCell(pct, mode) {
    if (!pct) return '';
    if (mode === 'days') return Math.round(pct / 100 * 22);
    return pct + '%';
  },
};
window.RP_H = RP;
