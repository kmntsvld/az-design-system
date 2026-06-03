/* YearlyPlan.jsx — Section A: yearly efficiency target summary (% and m$). */
function YearlyPlan({ data }) {
  const { years, rows } = data;
  const PCT_BASE = 2.48; // 24.8 m$ ⇒ 100%; %/year = m / PCT_BASE * 10

  const cells = (m) => years.map((y, i) => {
    const v = m[i];
    if (v === null || v === undefined) {
      return (
        <React.Fragment key={i}>
          <td className="val grp-start"><span className="tbd">TBD</span></td>
          <td className="val"><span className="tbd">—</span></td>
        </React.Fragment>
      );
    }
    const pct = (v / PCT_BASE).toFixed(1);
    return (
      <React.Fragment key={i}>
        <td className="val grp-start">{pct}%</td>
        <td className="val">${v.toFixed(2)}m</td>
      </React.Fragment>
    );
  });

  return (
    <div className="card">
      <div className="card-head">
        <div className="card-title">
          <span className="ico-chip"><Icon name="Target" size={16} /></span>
          Годовой план
          <span className="card-sub">Efficiency target · 2025–2028 · % и abs., m$</span>
        </div>
      </div>
      <div className="table-wrap">
        <table className="yearly">
          <thead>
            <tr>
              <th className="col-metric" rowSpan={2}>Показатель</th>
              {years.map(y => <th key={y} className="yr grp-start" colSpan={2}>{y}</th>)}
            </tr>
            <tr>
              {years.map(y => (
                <React.Fragment key={y}>
                  <th className="sub grp-start">%</th><th className="sub">m$</th>
                </React.Fragment>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r, idx) => (
              <tr key={idx} className={r.kind}>
                <td className="col-metric lbl">{r.kind === 'stream' ? ' – ' + r.label : r.label}</td>
                {cells(r.m)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

Object.assign(window, { YearlyPlan });
