/* app.jsx — Resource Plan: state, filtering, grouping, metrics. */
const { useState, useMemo } = React;

function App() {
  const EMPLOYEES = window.RP_EMPLOYEES, ALLOCS = window.RP_ALLOCS;
  const CUR = window.RP_CUR_MONTH, emp = window.RP_H.emp, proj = window.RP_H.proj;
  const depts = ['Все', ...Array.from(new Set(EMPLOYEES.map(e => e.dept).filter(Boolean))).sort()];

  const [year, setYear]               = useState(2026);
  const [dept, setDept]               = useState('Все');
  const [search, setSearch]           = useState('');
  const [expanded, setExpanded]       = useState(null);
  const [viewMode, setViewMode]       = useState('fte');
  const [groupBy, setGroupBy]         = useState('project');
  const [metricFilter, setMetricFilter] = useState(null);
  const [collapsed, setCollapsed]     = useState(() => new Set());
  const [showSummary, setShowSummary] = useState(true);

  // metrics
  const metrics = useMemo(() => {
    const ef = {};
    ALLOCS.forEach(a => {
      const e = emp(a.eid); if (!e) return;
      if (dept !== 'Все' && e.dept !== dept) return;
      ef[a.eid] = (ef[a.eid] || 0) + (a.fte[CUR] || 0);
    });
    const overloaded = Object.values(ef).filter(f => f > 100).length;
    const available  = Object.values(ef).filter(f => f > 0 && f < 50).length;
    const futureM = Math.min(CUR + 3, 11);
    let releasing = 0; const seen = new Set();
    ALLOCS.forEach(a => {
      const e = emp(a.eid); if (!e) return;
      if (dept !== 'Все' && e.dept !== dept) return;
      if (!seen.has(a.eid)) {
        const now = ef[a.eid] || 0;
        const fut = ALLOCS.filter(x => x.eid === a.eid).reduce((s, x) => s + (x.fte[futureM] || 0), 0);
        if (now > 0 && fut === 0) { releasing += now; seen.add(a.eid); }
      }
    });
    return { overloaded, available, releasing: Math.round(releasing / 100 * 10) / 10 };
  }, [dept]);

  // filtered employees
  const filteredEmps = useMemo(() => {
    const q = search.toLowerCase();
    return EMPLOYEES.filter(e => {
      if (dept !== 'Все' && e.dept !== dept) return false;
      if (q && !e.name.toLowerCase().includes(q) && !e.role.toLowerCase().includes(q)) return false;
      const total = ALLOCS.filter(a => a.eid === e.id).reduce((s, a) => s + (a.fte[CUR] || 0), 0);
      if (metricFilter === 'overloaded') return total > 100;
      if (metricFilter === 'available')  return total > 0 && total < 50;
      if (metricFilter === 'releasing') {
        const fut = ALLOCS.filter(a => a.eid === e.id).reduce((s, a) => s + (a.fte[Math.min(CUR+3,11)] || 0), 0);
        return total > 0 && fut === 0;
      }
      return true;
    });
  }, [dept, search, metricFilter]);
  const filteredIds = useMemo(() => new Set(filteredEmps.map(e => e.id)), [filteredEmps]);

  const toggleExpand = (id) => setExpanded(p => p === id ? null : id);
  const toggleGroup  = (k) => setCollapsed(p => { const n = new Set(p); n.has(k) ? n.delete(k) : n.add(k); return n; });
  const itemsYtg = (items) => { const n = 12 - CUR; return items.reduce((s, { a }) => s + a.fte.slice(CUR).reduce((x, v) => x + v, 0) / n, 0); };

  // build rows
  let rows = [];
  if (groupBy === 'none') {
    rows = filteredEmps.map(e => (
      <EmployeeRow key={e.id} employee={e} allocs={ALLOCS} expanded={expanded === e.id}
                   onToggle={() => toggleExpand(e.id)} viewMode={viewMode} />
    ));
  } else if (groupBy === 'dept') {
    const groups = {};
    filteredEmps.forEach(e => { (groups[e.dept] = groups[e.dept] || []).push(e); });
    rows = Object.entries(groups).flatMap(([d, emps]) => {
      const key = 'dept:' + d, isExp = !collapsed.has(key);
      const items = emps.flatMap(e => ALLOCS.filter(a => a.eid === e.id).map(a => ({ e, a })));
      const out = [<GroupHeaderRow key={key} label={window.RP_DEPT_LABELS[d] || d} count={emps.length}
        fteLabel={`${(itemsYtg(items)/100).toFixed(1)} FTE`} expanded={isExp} onToggle={() => toggleGroup(key)} />];
      if (isExp) emps.forEach(e => out.push(
        <EmployeeRow key={e.id} employee={e} allocs={ALLOCS} expanded={expanded === e.id}
                     onToggle={() => toggleExpand(e.id)} viewMode={viewMode} />));
      return out;
    });
  } else {
    const groups = {};
    ALLOCS.forEach(a => {
      if (!filteredIds.has(a.eid)) return;
      const e = emp(a.eid); if (!e) return;
      if (!groups[a.pid]) groups[a.pid] = { emps:new Set(), items:[] };
      groups[a.pid].emps.add(a.eid); groups[a.pid].items.push({ e, a });
    });
    rows = Object.entries(groups).flatMap(([pid, { emps, items }]) => {
      const p = proj(pid); if (!p) return [];
      const key = 'proj:' + pid, isExp = !collapsed.has(key);
      const out = [<GroupHeaderRow key={key} label={p.name} count={emps.size}
        fteLabel={`${(itemsYtg(items)/100).toFixed(1)} FTE`} expanded={isExp} onToggle={() => toggleGroup(key)} />];
      if (isExp) items.forEach(({ e, a }) => out.push(
        <ProjEmpRow key={a.id} employee={e} alloc={a} viewMode={viewMode} />));
      return out;
    });
  }

  const firstColLabel = groupBy === 'project' ? 'Проект / Сотрудник' : 'Сотрудник';

  return (
    <div className="rp-app">
      <Topbar year={year} setYear={setYear} dept={dept} setDept={setDept} depts={depts}
              search={search} setSearch={setSearch} />
      <DecisionPanel metrics={metrics} metricFilter={metricFilter} setMetricFilter={setMetricFilter}
                     groupBy={groupBy} setGroupBy={setGroupBy} viewMode={viewMode} setViewMode={setViewMode}
                     shownCount={filteredEmps.length} totalCount={EMPLOYEES.length} />
      <div className="rp-summary-toggle" onClick={() => setShowSummary(s => !s)}>
        <span style={{ fontSize:11, color:'#64748b' }}>{showSummary ? '▾' : '▸'}</span>
        <span style={{ fontSize:12, fontWeight:600, color:'#475569', fontFamily:'var(--font-display)' }}>Executive Summary</span>
      </div>
      {showSummary && <ExecutiveSummary allocs={ALLOCS} />}
      {filteredEmps.length === 0
        ? <div className="rp-empty">Нет данных за {year} год для выбранного фильтра</div>
        : <Matrix rows={rows} firstColLabel={firstColLabel} />}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
