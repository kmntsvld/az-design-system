/* QuarterlyTable.jsx — Section B: per-stream quarterly Plan/Fact/Δ with drill-down. */
const { useState: useStateQ } = React;

function fmt(v, measure) {
  if (v === null || v === undefined) return '—';
  if (measure === '%') return (v * 100).toFixed(0) + '%';
  if (measure === '$m') return '$' + v.toFixed(2) + 'm';
  return String(v);
}

function PfCell({ plan, fact, measure, extra }) {
  if (plan == null && fact == null)
    return <td className={`val no-val ${extra}`}><span className="nd">нет данных</span></td>;
  return (
    <td className={`val ${extra}`}>
      <span className="plan-muted">{fmt(plan, measure)}</span>
      <span className="sep">/</span>
      {fact == null ? <span className="nd">нет</span>
                    : <span className="fact">{fmt(fact, measure)}</span>}
    </td>
  );
}

function DeltaCell({ plan, fact, measure }) {
  if (plan == null || fact == null) return <td className="val cg-delta"><span className="nd">—</span></td>;
  const d = fact - plan;
  const body = measure === '%' ? (Math.abs(d) * 100).toFixed(0) + 'pp'
             : measure === '$m' ? '$' + Math.abs(d).toFixed(2) + 'm'
             : Math.abs(d).toFixed(2);
  const sign = d > 0 ? '+' : d < 0 ? '−' : '';
  const cls = d > 0 ? 'd-pos' : d < 0 ? 'd-neg' : '';
  return <td className="val cg-delta"><span className={cls}>{sign}{body}</span></td>;
}

const LVL_BADGE = { L1: 'lvl-L1', L2: 'lvl-L2', L3: 'lvl-L3', L4: 'lvl-L4' };

function MetricRow({ m, depth, collapsed, toggle, nodeId }) {
  const hasKids = m.children && m.children.length > 0;
  return (
    <tr className={`mrow ${m.level === 'L1' ? 'lvl1' : ''}`}>
      <td className="col-metric" style={{ paddingLeft: 6 + depth * 18 }}>
        {hasKids
          ? <span className={`toggle-icon ${collapsed ? 'collapsed' : ''}`} onClick={() => toggle(nodeId)}><Icon name="ChevronDown" size={13} /></span>
          : <span className="toggle-spacer" />}
        <span className={`lvl-badge ${LVL_BADGE[m.level]}`}>{m.level}</span>
        <span className="metric-name">{m.metric}</span>
      </td>
      <td className="col-meta cg-owner">
        {m.owner && m.owner !== '—'
          ? <span className="owner-tag">{m.owner}</span>
          : <span className="owner-tag empty">—</span>}
      </td>
      <td className="col-meta cg-effect"><span className="effect-tag">{m.effect}</span></td>
      <td className="col-meta"><span className="unit-tag">{m.measure}</span></td>
      <td className="val cg-y2025 grp-start">{m.y2025 != null ? '$' + m.y2025.toFixed(2) + 'm' : <span className="nd">—</span>}</td>
      {m.q.map((qq, i) => (
        <React.Fragment key={i}>
          <PfCell plan={qq.plan} fact={qq.fact} measure={m.measure} extra={`cg-q${i+1} grp-start`} />
          <DeltaCell plan={qq.plan} fact={qq.fact} measure={m.measure} />
        </React.Fragment>
      ))}
      <PfCell plan={m.roll.plan} fact={m.roll.fact} measure={m.measure} extra="cg-roll col-roll grp-start" />
      <td className="val cg-roll cg-delta col-roll">
        {m.roll.fact == null ? <span className="nd">—</span> : (() => {
          const d = m.roll.fact - m.roll.plan;
          const body = m.measure === '%' ? (Math.abs(d)*100).toFixed(0)+'pp' : m.measure === '$m' ? '$'+Math.abs(d).toFixed(2)+'m' : Math.abs(d).toFixed(2);
          return <span className={d > 0 ? 'd-pos' : 'd-neg'}>{d>0?'+':'−'}{body}</span>;
        })()}
      </td>
    </tr>
  );
}

function StreamBlock({ block }) {
  const [collapsed, setCollapsed] = useStateQ({});
  const toggle = (id) => setCollapsed(c => ({ ...c, [id]: !c[id] }));
  const rows = [];
  block.metrics.forEach((m, mi) => {
    const nodeId = `${mi}`;
    rows.push(<MetricRow key={nodeId} m={m} depth={0} collapsed={collapsed[nodeId]} toggle={toggle} nodeId={nodeId} />);
    if (m.children && !collapsed[nodeId]) {
      m.children.forEach((c, ci) =>
        rows.push(<MetricRow key={`${nodeId}-${ci}`} m={c} depth={1} collapsed={false} toggle={toggle} nodeId={`${nodeId}-${ci}`} />));
    }
  });
  return (
    <div className="stream-block">
      <div className="stream-head">
        <div className="card-title sm">
          <span className="ico-chip sm"><Icon name="Route" size={14} /></span>
          {block.stream}
          <span className="scope-chip">{block.scope}</span>
          <span className="card-sub">{block.metrics.length} метрик</span>
        </div>
      </div>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th className="col-metric">Метрика</th>
              <th className="col-meta cg-owner">Owner</th>
              <th className="col-meta cg-effect">Effect</th>
              <th className="col-meta">Ед.</th>
              <th className="val cg-y2025 grp-start">4Q25 Факт</th>
              {['1Q26','2Q26','3Q26','4Q26'].map((q,i) => (
                <React.Fragment key={q}>
                  <th className="val grp-start">{q} План/Факт</th>
                  <th className="val cg-delta">{q} Δ</th>
                </React.Fragment>
              ))}
              <th className="val col-roll grp-start">2026 План/Факт</th>
              <th className="val col-roll cg-delta">2026 Δ</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </table>
      </div>
    </div>
  );
}

function QuarterlyTable({ streams }) {
  return (
    <div className="card">
      <div className="card-head">
        <div className="card-title">
          <span className="ico-chip"><Icon name="ChartColumn" size={16} /></span>
          Поквартальный план / факт
          <span className="card-sub">метрики L1–L4 · План / Факт / Δ</span>
        </div>
        <div className="ctrl-row">
          <button className="tool-btn"><Icon name="ChevronsUpDown" size={13} /> Развернуть всё</button>
          <button className="tool-btn"><Icon name="ChevronsDownUp" size={13} /> Свернуть всё</button>
          <button className="tool-btn"><Icon name="Columns3" size={13} /> Колонки</button>
        </div>
      </div>
      {streams.map((b, i) => <StreamBlock key={i} block={b} />)}
    </div>
  );
}

Object.assign(window, { QuarterlyTable });
