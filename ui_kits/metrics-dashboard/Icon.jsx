/* Icon.jsx — React-native Lucide renderer.
   Renders straight from window.lucide.icons[Name] = [tag, rootAttrs, [ [childTag, attrs], … ]],
   so React fully owns the <svg> (no createIcons() DOM-mutation crashes on re-render). */
function Icon({ name, size = 18, sw = 2, color = 'currentColor', style, className }) {
  const node = window.lucide && window.lucide.icons && window.lucide.icons[name];
  if (!node) return null;
  const children = node[2] || [];
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24"
         fill="none" stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round"
         className={className} style={style}>
      {children.map(([tag, attrs], i) => React.createElement(tag, { key: i, ...attrs }))}
    </svg>
  );
}
window.Icon = Icon;
