/* Topbar.jsx — mulberry top bar: app mark, year toggle, dept chips, search. */
function Topbar({ year, setYear, dept, setDept, depts, search, setSearch }) {
  return (
    <header className="rp-topbar">
      <div className="rp-mark">
        <div className="rp-badge">D&D</div>
        <span className="rp-app">Resource Plan</span>
      </div>
      <div className="rp-vdiv" />
      <div className="rp-pillrow">
        {[2026, 2027].map(y => (
          <button key={y} className={`rp-pill ${year === y ? 'active' : ''}`}
                  onClick={() => setYear(y)}>{y}</button>
        ))}
      </div>
      <div className="rp-vdiv" />
      <div className="rp-chiprow">
        {depts.map(d => (
          <button key={d} className={`dept-chip ${dept === d ? 'active' : ''}`}
                  onClick={() => setDept(d)}>{window.RP_DEPT_LABELS[d] || d}</button>
        ))}
      </div>
      <input className="rp-search" placeholder="Поиск сотрудника..."
             value={search} onChange={e => setSearch(e.target.value)} />
      <span className="rp-live">📡 обновлено 09:14</span>
    </header>
  );
}
Object.assign(window, { Topbar });
