/* Header.jsx — top bar: logo, title, upload button, theme segmented toggle (Lucide icons). */
function ThemeToggle({ theme, setTheme }) {
  return (
    <div className="theme-seg" role="tablist">
      <button className={`theme-seg-btn ${theme === 'light' ? 'active' : ''}`} onClick={() => setTheme('light')}>
        <Icon name="Sun" size={14} /> Светлая
      </button>
      <button className={`theme-seg-btn ${theme === 'dark' ? 'active' : ''}`} onClick={() => setTheme('dark')}>
        <Icon name="Moon" size={14} /> Тёмная
      </button>
    </div>
  );
}

function Header({ theme, setTheme }) {
  return (
    <header className="md-header">
      <div className="md-header-left">
        <img src="../../assets/az-logo.png" alt="AstraZeneca" className="az-logo-img" />
        <div className="md-divider" />
        <div className="md-titlewrap">
          <div className="md-title">Operational Efficiency</div>
          <div className="md-eyebrow">Портфель D&amp;D · Dashboard <span className="v2">v2</span></div>
        </div>
      </div>
      <div className="md-header-right">
        <span className="file-label loaded"><Icon name="CircleCheck" size={13} /> portfolio.xlsx</span>
        <button className="upload-btn"><Icon name="Upload" size={15} /> Загрузить Data</button>
        <ThemeToggle theme={theme} setTheme={setTheme} />
      </div>
    </header>
  );
}

Object.assign(window, { Header, ThemeToggle });
