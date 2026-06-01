/* az-design-system/tokens.js
   Brand tokens for React JSX inline styles. Keep in sync with tokens.css.
   Usage: <script src="design-system/tokens.js"></script>
   Access: window.AZ_DS.colors.mulberry */

window.AZ_DS = {
  colors: {
    mulberry:      '#830051',
    darkMulberry:  '#4d0030',
    magenta:       '#d0006f',
    gold:          '#f0ab00',
    graphite:      '#3f4444',
    platinum:      '#9db0ac',
    lightPlatinum: '#ebefee',
    white:         '#ffffff',
    purple:        '#3c1053',
    navy:          '#003865',
    lightBlue:     '#68d2df',
    limeGreen:     '#c4d600',
    // Theme-adapted brand inks — substitute on dark surfaces.
    purpleDark:    '#b48ad0',  // light: purple   #3c1053
    graphiteDark:  '#c8cccb',  // light: graphite #3f4444
  },
  sidebar: {
    bg:          'linear-gradient(180deg, #830051 0%, #4d0030 100%)',
    bgDark:      'linear-gradient(180deg, #4d0030 0%, #2a0a1d 100%)',
    divider:     'rgba(255, 255, 255, 0.15)',
    textSecondary: 'rgba(255, 255, 255, 0.6)',
    textMuted:   'rgba(255, 255, 255, 0.45)',
    inputBg:     'rgba(255, 255, 255, 0.1)',
    inputBorder: 'rgba(255, 255, 255, 0.2)',
  },
  nav: {
    activeBg: 'rgba(255, 255, 255, 0.2)',
    hoverBg:  'rgba(255, 255, 255, 0.1)',
  },
  button: {
    primaryBg:    '#830051',
    primaryHover: '#4d0030',
  },
  font: {
    heading: "'Roboto Slab', Georgia, serif",
    body:    "'Inter', -apple-system, sans-serif",
  },
  // Semantic surface/text/border layer for light UI. Pairs with darkMode.
  lightMode: {
    bg: {
      base:       '#eef1f0',
      surface:    '#ffffff',
      surfaceAlt: '#fafbfb',
    },
    tintRow: '#faf7f9',
    text: {
      primary:   '#2b2f2f',
      secondary: '#5e6565',
      muted:     '#90999a',
    },
    border: {
      subtle: '#e6eae9',
      strong: '#d6dcdb',
    },
  },
  // Warm, mulberry-tinted dark surfaces.
  darkMode: {
    bg: {
      base:     '#171219',
      surface1: '#221a26',
      surface2: '#2a2030',
      surface3: '#2f2436',
    },
    tintRow: 'rgba(255, 255, 255, 0.03)',
    text: {
      primary:   '#f1ecef',
      secondary: 'rgba(241, 236, 239, 0.62)',
      muted:     'rgba(241, 236, 239, 0.40)',
      disabled:  'rgba(241, 236, 239, 0.25)',
    },
    border: {
      subtle: 'rgba(255, 255, 255, 0.09)',
      strong: 'rgba(255, 255, 255, 0.16)',
    },
  },
  // Shared status palette (plan-vs-fact dashboards). Each: dot / fg / bg.
  // Part of the brand system — unlike FTE-heatmap & department badges.
  status: {
    light: {
      over:    { dot: '#003865', fg: '#003865', bg: '#e6eef5' },
      ontrack: { dot: '#c4d600', fg: '#5f7000', bg: '#f1f5d6' },
      risk:    { dot: '#f0ab00', fg: '#8a6200', bg: '#fdf1d6' },
      off:     { dot: '#d0006f', fg: '#d0006f', bg: '#fbe0ee' },
      nodata:  { dot: '#9db0ac', fg: '#8a9693', bg: '#eef1f0' },
    },
    dark: {
      over:    { dot: '#68d2df', fg: '#7fdbe6', bg: 'rgba(104, 210, 223, 0.14)' },
      ontrack: { dot: '#c4d600', fg: '#cfe23a', bg: 'rgba(196, 214, 0, 0.14)' },
      risk:    { dot: '#f0ab00', fg: '#f6c244', bg: 'rgba(240, 171, 0, 0.16)' },
      off:     { dot: '#ff4d9d', fg: '#ff77b4', bg: 'rgba(208, 0, 111, 0.22)' },
      nodata:  { dot: '#7d8d8a', fg: 'rgba(240, 235, 239, 0.45)', bg: 'rgba(255, 255, 255, 0.05)' },
    },
  },
};
