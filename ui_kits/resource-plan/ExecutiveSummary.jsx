/* ExecutiveSummary.jsx — three mini charts: dept load, monthly trend, distribution. */
function MiniBar({ value, max, color }) {
  return (
    <div style={{ flex:1, background:'#f1f5f9', borderRadius:3, height:12, position:'relative', overflow:'hidden' }}>
      <div style={{ position:'absolute', left:0, top:0, bottom:0,
                    width:`${Math.min(value / Math.max(max,1) * 100, 100)}%`,
                    background:color, borderRadius:3, transition:'width 0.4s' }} />
    </div>
  );
}

function ExecutiveSummary({ allocs }) {
  const CUR = window.RP_CUR_MONTH, MONTHS = window.RP_MONTHS, emp = window.RP_H.emp;

  // dept load (current month)
  const deptMap = {};
  allocs.forEach(a => {
    const e = emp(a.eid); if (!e) return;
    const d = window.RP_DEPT_LABELS[e.dept] || e.dept;
    if (!deptMap[d]) deptMap[d] = { total:0, emps:new Set() };
    deptMap[d].total += a.fte[CUR] || 0; deptMap[d].emps.add(a.eid);
  });
  const deptData = Object.entries(deptMap)
    .map(([d, { total, emps }]) => ({ label:d, avg:Math.round(total / emps.size) }))
    .sort((a, b) => b.avg - a.avg);

  // monthly trend
  const monthData = MONTHS.map((m, i) => {
    const emps = new Set(allocs.filter(a => a.fte[i] > 0).map(a => a.eid));
    const total = allocs.reduce((s, a) => s + (a.fte[i] || 0), 0);
    return { m, avg: emps.size ? Math.round(total / emps.size) : 0, i };
  });

  // distribution
  const empFte = {};
  allocs.forEach(a => { empFte[a.eid] = (empFte[a.eid] || 0) + (a.fte[CUR] || 0); });
  const vals = Object.values(empFte).filter(v => v > 0);
  const dist = [
    { label:'>100%',   count:vals.filter(v => v > 100).length,            color:'#f87171', tc:'#7f1d1d' },
    { label:'76–100%', count:vals.filter(v => v > 75 && v <= 100).length, color:'#fb923c', tc:'#7c2d12' },
    { label:'51–75%',  count:vals.filter(v => v > 50 && v <= 75).length,  color:'#fde68a', tc:'#78350f' },
    { label:'≤50%',    count:vals.filter(v => v > 0 && v <= 50).length,   color:'#86efac', tc:'#14532d' },
  ];
  const distTotal = dist.reduce((s, d) => s + d.count, 0);
  const stat = { fontSize:11, color:'#64748b', fontWeight:600, textTransform:'uppercase', letterSpacing:'0.04em', marginBottom:8 };

  return (
    <div className="rp-summary">
      <div style={{ flex:1.2, minWidth:0 }}>
        <div style={stat}>Загрузка по отделам</div>
        {deptData.map(({ label, avg }) => (
          <div key={label} style={{ display:'flex', alignItems:'center', gap:8, marginBottom:5 }}>
            <span style={{ fontSize:11, color:'#64748b', width:64, flexShrink:0, textAlign:'right' }}>{label}</span>
            <MiniBar value={avg} max={120} color={avg > 100 ? '#f87171' : avg > 75 ? '#fb923c' : avg > 50 ? '#fde68a' : '#86efac'} />
            <span style={{ fontSize:11, fontWeight:700, width:32, textAlign:'right',
                           color: avg > 100 ? '#dc2626' : avg > 75 ? '#ea580c' : '#16a34a' }}>{avg}%</span>
          </div>
        ))}
      </div>
      <div style={{ flex:1, minWidth:0 }}>
        <div style={stat}>Средний FTE — {window.RP_CUR_YEAR}</div>
        <div style={{ display:'flex', alignItems:'flex-end', gap:2, height:64 }}>
          {monthData.map(({ m, avg, i }) => (
            <div key={m} style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', gap:2 }}>
              <div style={{ width:'100%', minHeight:2, height:`${Math.max(avg / 100 * 56, 2)}px`,
                            background: i === CUR ? '#3b82f6' : avg > 100 ? '#f87171' : avg > 75 ? '#fb923c' : '#86efac',
                            borderRadius:'3px 3px 0 0', opacity: i < CUR ? 0.4 : 1 }} />
              <span style={{ fontSize:9, color: i === CUR ? '#3b82f6' : '#94a3b8', fontWeight: i === CUR ? 700 : 400 }}>{m[0]}</span>
            </div>
          ))}
        </div>
      </div>
      <div style={{ flex:0.85, minWidth:0 }}>
        <div style={stat}>Структура загрузки</div>
        <div style={{ display:'flex', gap:6, marginBottom:10 }}>
          {dist.map(({ label, count, color, tc }) => (
            <div key={label} style={{ flex:1, textAlign:'center' }}>
              <div style={{ fontSize:22, fontWeight:700, color:tc, lineHeight:1 }}>{count}</div>
              <div style={{ fontSize:10, color:'#94a3b8', marginTop:2, lineHeight:1.3 }}>{label}</div>
              <div style={{ width:'100%', height:5, background:color, borderRadius:3, marginTop:4 }} />
            </div>
          ))}
        </div>
        <div style={{ display:'flex', height:8, borderRadius:4, overflow:'hidden', background:'#f1f5f9' }}>
          {dist.map(({ count, color }, i) => (
            <div key={i} style={{ flex: count / Math.max(distTotal,1), background:color }} />
          ))}
        </div>
      </div>
    </div>
  );
}
Object.assign(window, { ExecutiveSummary });
