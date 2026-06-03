/* DecisionPanel.jsx — three decision cards + group/view toggles + heat legend. */
function DecisionPanel({ metrics, metricFilter, setMetricFilter, groupBy, setGroupBy,
                         viewMode, setViewMode, shownCount, totalCount }) {
  const cards = [
    { key:'overloaded', icon:'🔴', label:'Перегружены сейчас',
      value:metrics.overloaded, unit:'чел.', bg:'#fef2f2', border:'#fecaca', vc:'#dc2626' },
    { key:'releasing',  icon:'🟡', label:'Высвобождаются через 3 мес.',
      value:metrics.releasing, unit:'FTE', bg:'#fffbeb', border:'#fde68a', vc:'#d97706' },
    { key:'available',  icon:'🟢', label:'Слабозагружены (<50%)',
      value:metrics.available, unit:'чел.', bg:'#f0fdf4', border:'#bbf7d0', vc:'#16a34a' },
  ];
  const seg = (val, set, opts) => (
    <div className="rp-seg">
      {opts.map(([m, l]) => (
        <button key={m} className={val === m ? 'active' : ''} onClick={() => set(m)}>{l}</button>
      ))}
    </div>
  );
  return (
    <div className="rp-decision">
      {cards.map(c => (
        <div key={c.key} className="metric-card"
             onClick={() => setMetricFilter(f => f === c.key ? null : c.key)}
             style={{ background:c.bg, flex:1,
                      border:`1px solid ${metricFilter === c.key ? c.vc : c.border}`,
                      boxShadow: metricFilter === c.key ? `0 0 0 2px ${c.vc}33` : 'none' }}>
          <span style={{ fontSize:20 }}>{c.icon}</span>
          <div style={{ flex:1, minWidth:0 }}>
            <div style={{ fontSize:11, color:'#64748b', marginBottom:2 }}>{c.label}</div>
            <div style={{ fontSize:22, fontWeight:700, color:c.vc, lineHeight:1 }}>
              {c.value}<span style={{ fontSize:13, fontWeight:500, color:'#94a3b8', marginLeft:4 }}>{c.unit}</span>
            </div>
          </div>
          {metricFilter === c.key && <span style={{ fontSize:10, color:c.vc, fontWeight:600 }}>фильтр ×</span>}
        </div>
      ))}
      <div className="rp-controls">
        {seg(groupBy, setGroupBy, [['project','По проектам'],['dept','По отделам'],['none','Все']])}
        {seg(viewMode, setViewMode, [['fte','FTE %'],['days','Ч/д']])}
        <span style={{ fontSize:11, color:'#94a3b8' }}>{shownCount} из {totalCount} сотр.</span>
        <div className="rp-legend">
          {[['#e2e8f0','≤25%'],['#fb923c','≤50%'],['#fde68a','≤75%'],['#86efac','100%'],['#f87171','>110%']].map(([bg,l]) => (
            <div key={l}><span style={{ background:bg }} />{l}</div>
          ))}
        </div>
      </div>
    </div>
  );
}
Object.assign(window, { DecisionPanel });
