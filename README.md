# az-design-system

Brand token library for AstraZeneca D&D IT tools. Static files — no build step required.

## Quick start

```bash
# Add to your project
git submodule add https://github.com/kmntsvld/az-design-system design-system

# After cloning a project that uses this
git submodule update --init
```

Then add to your HTML `<head>`:

```html
<link rel="stylesheet" href="design-system/tokens.css">
<script src="design-system/tokens.js"></script>
```

See `CLAUDE.md` for full integration instructions and token reference.

## Colours

| Token | Value | Name |
|---|---|---|
| `--color-mulberry` | `#830051` | Mulberry (primary) |
| `--color-dark-mulberry` | `#4d0030` | Dark Mulberry |
| `--color-magenta` | `#d0006f` | Magenta |
| `--color-gold` | `#f0ab00` | Gold |
| `--color-graphite` | `#3f4444` | Graphite |
| `--color-platinum` | `#9db0ac` | Platinum |
| `--color-light-platinum` | `#ebefee` | Light Platinum |
| `--color-purple` | `#3c1053` | Purple (accent) |
| `--color-navy` | `#003865` | Navy (accent) |
| `--color-light-blue` | `#68d2df` | Light Blue (accent) |
| `--color-lime-green` | `#c4d600` | Lime Green (accent) |

## Fonts

- **Headings:** Roboto Slab (400, 700)
- **Body:** Inter (300, 400, 700)

Load from Google Fonts in the host page (see CLAUDE.md).
