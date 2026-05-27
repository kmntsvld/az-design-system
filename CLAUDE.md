# az-design-system

Minimal brand token library for AstraZeneca D&D IT tools.
Static files only — no build step, no Node.js.

## Files

| File | Purpose |
|---|---|
| `tokens.css` | CSS custom properties — source of truth for all brand values |
| `tokens.js` | `window.AZ_DS` object — same values for React JSX inline styles |

## Adding to a project (git submodule)

```bash
git submodule add https://github.com/kmntsvld/az-design-system design-system
git submodule update --init   # after cloning the parent repo
```

## Connecting in HTML

Add to `<head>` in this order:

```html
<!-- 1. Fallback tokens (in case submodule not initialized) -->
<style>
  :root {
    --color-mulberry: #830051; --color-dark-mulberry: #4d0030;
    --color-magenta: #d0006f; --color-gold: #f0ab00;
    --color-graphite: #3f4444; --color-platinum: #9db0ac;
    --color-light-platinum: #ebefee;
    --sidebar-bg: linear-gradient(180deg, #830051 0%, #4d0030 100%);
    --sidebar-divider: rgba(255,255,255,0.15);
    --sidebar-text-secondary: rgba(255,255,255,0.6);
    --sidebar-text-muted: rgba(255,255,255,0.45);
    --nav-active-bg: rgba(255,255,255,0.2); --nav-hover-bg: rgba(255,255,255,0.1);
    --nav-input-bg: rgba(255,255,255,0.1); --nav-input-border: rgba(255,255,255,0.2);
  }
</style>
<!-- 2. Design system (overrides fallback) -->
<link rel="stylesheet" href="design-system/tokens.css">
<script src="design-system/tokens.js"></script>
<!-- 3. Google Fonts -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@400;700&family=Inter:wght@300;400;700&display=swap" rel="stylesheet">
```

## Using tokens

**In CSS / `<style>` blocks:**
```css
color: var(--color-mulberry);
border: 1px solid var(--sidebar-divider);
```

**In React JSX inline styles:**
```jsx
style={{ background: window.AZ_DS.sidebar.bg }}
style={{ color: window.AZ_DS.colors.mulberry }}
```

## What does NOT belong here

- FTE heatmap colours — functional data visualisation, not brand
- Department badge colours — functional, intentionally non-brand
- Any React components or markup

## Sync rule

When updating a colour value: edit **both** `tokens.css` and `tokens.js`.
`tokens.css` is the human-readable reference; `tokens.js` is the React bridge.
