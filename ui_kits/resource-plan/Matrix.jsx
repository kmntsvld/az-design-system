/* Matrix.jsx — the FTE allocation matrix: sticky head + first column, heat cells,
   group header rows, expandable employee rows, project sub-rows. */
const { useState: useStateM } = React;

function GroupHeaderRow({ label, count, fteLabel, expanded, onToggle }) {
  const CUR = window.RP_CUR_MONTH;
  return (
    <tr onClick={onToggle} style={{ cursor:'pointer', userSelect:'none' }}>
      <td className="grp-name">
        <span style={{ fontSize:12, marginRight:6, color:'#475569' }}>{expanded ? '▾' : '▸'}</span>
        <strong style={{ fontSize:12, color:'#1e293b' }}>{label}</strong>
        <span style={{ color:'#94a3b8', fontSize:11, marginLeft:6 }}>{count} чел.</span>
      </td>
      <td className="grp-ytg">{fteLabel}</td>
      {Array(12).fill(null).map((_, i) => (
        <td key={i} className="grp-cell" style={{ borderLeft: i === CUR ? '2px solid #3b82f6' : undefined }} />
      ))}
    </tr>
  );
}

function HeatRow({ name, ytg, fte, viewMode, indent, sub, tip }) {
  const { cellBg, cellText, formatCell } = window.RP_H;
  const CUR = window.RP_CUR_MONTH, MONTHS = window.RP_MONTHS;
  return (
    <>
      <td className={sub ? 'm-name sub' : 'm-name'} style={{ paddingLeft: indent }} title={name}>
        {sub ? name : (
          <span style={{ display:'flex', alignItems:'center', gap:6 }}>
            <span style={{ fontSize:10, color:'#94a3b8', flexShrink:0 }}>{tip}</span>
            <span style={{ overflow:'hidden', textOverflow:'ellipsis', fontSize:12, color:'#1e293b' }}>{name}</span>
          </span>
        )}
      </td>
      <td className="m-ytg" style={{ color: ytg >= 95 ? '#16a34a' : ytg >= 50 ? '#d97706' : '#94a3b8' }}>{ytg}%</td>
      {fte.map((pct, i) => (
        <td key={i} className="m-cell"
            style={{ background:cellBg(pct), color:cellText(pct), height: sub ? 24 : 32,
                     opacity: sub ? 0.85 : 1, borderLeft: i === CUR ? '2px solid #3b82f6' : undefined }}>
          {formatCell(pct, viewMode)}
        </td>
      ))}
    </>
  );
}

function EmployeeRow({ employee, allocs, expanded, onToggle, viewMode }) {
  const CUR = window.RP_CUR_MONTH, proj = window.RP_H.proj;
  const eAllocs = allocs.filter(a => a.eid === employee.id);
  const monthTotals = Array(12).fill(0);
  eAllocs.forEach(a => a.fte.forEach((v, i) => { monthTotals[i] += v; }));
  const rem = 12 - CUR;
  const ytg = Math.round(eAllocs.reduce((s, a) => s + a.fte.slice(CUR).reduce((x, y) => x + y, 0), 0) / rem);
  return (
    <>
      <tr className={`m-row ${expanded ? 'expanded' : ''}`} onClick={onToggle}>
        <HeatRow name={employee.name} ytg={ytg} fte={monthTotals} viewMode={viewMode} indent={12} tip={expanded ? '▾' : '▸'} />
      </tr>
      {expanded && eAllocs.map(a => {
        const p = proj(a.pid); if (!p) return null;
        const pytg = Math.round(a.fte.slice(CUR).reduce((s, v) => s + v, 0) / rem);
        return <tr key={a.id} className="proj-row"><HeatRow name={p.name} ytg={pytg} fte={a.fte} viewMode={viewMode} indent={28} sub /></tr>;
      })}
    </>
  );
}

function ProjEmpRow({ employee, alloc, viewMode }) {
  const CUR = window.RP_CUR_MONTH;
  const ytg = Math.round(alloc.fte.slice(CUR).reduce((s, v) => s + v, 0) / (12 - CUR));
  return <tr className="proj-emp-row"><HeatRow name={employee.name} ytg={ytg} fte={alloc.fte} viewMode={viewMode} indent={24} sub /></tr>;
}

function Matrix({ rows, firstColLabel }) {
  const MONTHS = window.RP_MONTHS, CUR = window.RP_CUR_MONTH;
  return (
    <div className="matrix-wrap">
      <table className="matrix-table">
        <thead>
          <tr>
            <th className="h-name">{firstColLabel} <span className="sort">⇅</span></th>
            <th className="h-ytg">FTE YtG <span className="sort">↓</span></th>
            {MONTHS.map((m, i) => (
              <th key={i} className={`h-month ${i === CUR ? 'cur' : ''}`}>
                {m}{i === CUR && <div className="now">сейчас</div>}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    </div>
  );
}

Object.assign(window, { Matrix, GroupHeaderRow, EmployeeRow, ProjEmpRow });
