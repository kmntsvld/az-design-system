/* Sample data for the Metrics Dashboard UI kit.
   Cosmetic recreation — realistic shape, not the real portfolio numbers.
   Mirrors the source domain: Goal → Digital/Non-Digital → Value Stream →
   Metric (L1–L4), with cumulative quarterly Plan/Fact in $m or %. */
window.MD_DATA = {
  // Section A — yearly efficiency target rollup (% derived from m$ / 2.48)
  yearly: {
    years: [2025, 2026, 2027, 2028],
    rows: [
      { kind: 'target', label: 'Efficiency target', m: [12.40, 24.80, null, null] },
      { kind: 'scope',  label: 'Digital',           m: [4.10, 7.90, null, null] },
      { kind: 'stream', label: 'OCM',               m: [3.10, 5.70, null, null] },
      { kind: 'stream', label: 'Эффективность',     m: [0.80, 2.00, null, null] },
      { kind: 'stream', label: 'Автоматизация',     m: [0.20, 0.20, null, null] },
      { kind: 'scope',  label: 'Non-Digital',       m: [8.30, 16.90, null, null] },
    ],
  },
  // Section B — per-stream quarterly Plan/Fact. q = [{plan,fact}] for Q1..Q4 (cumulative/YTD).
  streams: [
    {
      scope: 'Digital', stream: 'OCM', measure: '$m',
      metrics: [
        { level:'L1', metric:'Effect $ m', owner:'Куманцов В.', effect:'Cost avoidance', measure:'$m',
          y2025:3.10, q:[{plan:0.20,fact:0.18},{plan:0.90,fact:0.84},{plan:2.10,fact:null},{plan:5.70,fact:null}], roll:{plan:5.70,fact:0.84},
          children:[
            { level:'L2', metric:'OCM adoption rate', owner:'Алмаев Т.', effect:'Adoption', measure:'%',
              q:[{plan:0.30,fact:0.28},{plan:0.55,fact:0.51},{plan:0.75,fact:null},{plan:0.90,fact:null}], roll:{plan:0.90,fact:0.51} },
            { level:'L3', metric:'Trained users', owner:'—', effect:'', measure:'#',
              q:[{plan:120,fact:118},{plan:240,fact:236},{plan:360,fact:null},{plan:480,fact:null}], roll:{plan:480,fact:236} },
          ]},
      ],
    },
    {
      scope: 'Digital', stream: 'Эффективность', measure: '$m',
      metrics: [
        { level:'L1', metric:'Effect $ m', owner:'Балагуров Е.', effect:'Productivity', measure:'$m',
          y2025:0.80, q:[{plan:0.40,fact:0.42},{plan:0.90,fact:0.95},{plan:1.50,fact:null},{plan:2.00,fact:null}], roll:{plan:2.00,fact:0.95},
          children:[
            { level:'L2', metric:'Process cycle time', owner:'—', effect:'Lead time', measure:'%',
              q:[{plan:-0.10,fact:-0.12},{plan:-0.22,fact:-0.20},{plan:-0.35,fact:null},{plan:-0.50,fact:null}], roll:{plan:-0.50,fact:-0.20} },
          ]},
      ],
    },
    {
      scope: 'Non-Digital', stream: 'Cost base', measure: '$m',
      metrics: [
        { level:'L1', metric:'Effect $ m', owner:'PMO D&D', effect:'Cost reduction', measure:'$m',
          y2025:8.30, q:[{plan:3.20,fact:3.05},{plan:7.10,fact:6.80},{plan:12.0,fact:null},{plan:16.9,fact:null}], roll:{plan:16.9,fact:6.80} },
        { level:'L2', metric:'Vendor consolidation', owner:'—', effect:'Spend', measure:'$m',
          q:[{plan:1.10,fact:1.00},{plan:2.40,fact:2.30},{plan:4.0,fact:null},{plan:5.5,fact:null}], roll:{plan:5.5,fact:2.30} },
      ],
    },
  ],
};
