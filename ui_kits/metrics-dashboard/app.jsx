/* app.jsx — composes the Operational Efficiency Dashboard kit. */
const { useState: useStateApp, useEffect: useEffectApp } = React;

function App() {
  const [theme, setTheme] = useStateApp('light');
  useEffectApp(() => { document.documentElement.setAttribute('data-theme', theme); }, [theme]);
  const data = window.MD_DATA;
  return (
    <React.Fragment>
      <Header theme={theme} setTheme={setTheme} />
      <div className="page-content">
        <YearlyPlan data={data.yearly} />
        <QuarterlyTable streams={data.streams} />
      </div>
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
