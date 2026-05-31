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
  },
  sidebar: {
    bg:          'linear-gradient(180deg, #830051 0%, #4d0030 100%)',
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
  darkMode: {
    bg: {
      base:     '#111118',
      surface1: '#16121e',
      surface2: '#1a1020',
      surface3: '#131a28',
    },
    text: {
      primary:   'rgba(255, 255, 255, 0.90)',
      secondary: 'rgba(255, 255, 255, 0.82)',
      muted:     'rgba(255, 255, 255, 0.50)',
      disabled:  'rgba(255, 255, 255, 0.25)',
    },
    border: {
      subtle: 'rgba(255, 255, 255, 0.07)',
      strong: 'rgba(255, 255, 255, 0.14)',
    },
  },
};
