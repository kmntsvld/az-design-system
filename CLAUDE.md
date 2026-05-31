# az-design-system

Minimal brand token library for AstraZeneca D&D IT tools.
Static files only — no build step, no Node.js.

This repo is the **single source of truth** for AstraZeneca brand colours and
fonts. Consumer apps (Metrics-Dashboard, Resource-Plan) load these tokens via
CDN — see "Connecting in HTML" below.

## Правила работы (общие для всех трёх репо)

> **git = единственный канон.** У Claude нет памяти между сессиями и
> устройствами (ПК / Mac / телефон-облако / VPS). Всё важное должно жить в
> закоммиченных файлах — иначе потеряется. Не «Claude запомнит», а «записано здесь».

- **Бренд-токены — только в этом репо.** Цвета/шрифты приходят в приложения с
  CDN (`@main`). В приложениях бренд-значения не хардкодить.
- **Промоушен дизайн-решений** (например, новое из Claude Design, которое
  понравилось) — когда правка затрагивает бренд-широкие токены ИЛИ пользователь
  говорит «закинь в дизайн-систему: …»:
  1. **Сначала спросить:** «это на весь бренд или только для этого экрана?»
     — только экран → менять локально в приложении; весь бренд → шаги ниже.
  2. Править `tokens.css` **И** `tokens.js` (оба файла!).
  3. **Спросить, пушить ли в git** (пользователь может забыть). После пуша
     CDN `@main` раздаёт новые значения во все приложения.
  4. Если этот репо недоступен в текущей сессии (облако/телефон с одним репо) —
     оставить пометку `TODO(design-system): …` в разделе Tech Debt того репо,
     где идёт работа; следующая сессия с доступом доделает.
- **Перед любым `git push` — спрашивать подтверждение.**

## Files

| File | Purpose |
|---|---|
| `tokens.css` | CSS custom properties — source of truth for all brand values |
| `tokens.js` | `window.AZ_DS` object — same values for React JSX inline styles |

## Adding to a project (CDN, не submodule)

Подключение через jsDelivr по ветке `main` — **без git submodule**.
Обновляется само: после пуша в этот репо новые токены раздаются всем
приложениям (кэш jsDelivr ~12 ч). Ничего инициализировать/обновлять в
приложении не нужно.

> Раньше использовался git submodule — отказались: он не работал в облачных и
> мобильных сессиях, не давал версионирования и провоцировал дрейф копий.

**Версионирование:** ветка `@main` = всегда свежее (для прототипов).
Для прод — пин по git-тегу (`@v1.2.0`) или копия файлов в сборку, чтобы не
зависеть от внешнего CDN.

## Connecting in HTML

Add to `<head>` in this order:

```html
<!-- 1. Fallback tokens (in case the CDN is unreachable) -->
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
<!-- 2. Design system from CDN (overrides fallback) -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/kmntsvld/az-design-system@main/tokens.css">
<script src="https://cdn.jsdelivr.net/gh/kmntsvld/az-design-system@main/tokens.js"></script>
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

## Dark Mode Tokens

`tokens.css` и `tokens.js` содержат набор `--dark-*` токенов / `window.AZ_DS.darkMode.*`.
Это **референсные значения** — они не применяются автоматически.
Приложение само решает когда их использовать:

```css
/* Вариант 1: явный класс/атрибут */
html[data-theme="dark"] {
  --page-bg:   var(--dark-bg-base);
  --text:      var(--dark-text);
  --border:    var(--dark-border);
}

/* Вариант 2: системные настройки */
@media (prefers-color-scheme: dark) {
  :root {
    --page-bg: var(--dark-bg-base);
  }
}
```

**Поверхности (от глубокой к приподнятой):**
| Токен | Hex | Применение |
|---|---|---|
| `--dark-bg-base` | `#111118` | Фон страницы |
| `--dark-bg-surface-1` | `#16121e` | Карточки, панели |
| `--dark-bg-surface-2` | `#1a1020` | Контролы, шапки секций |
| `--dark-bg-surface-3` | `#131a28` | Приподнятые строки |

**Текст:**
| Токен | Opacity | Применение |
|---|---|---|
| `--dark-text` | 90% | Основной текст |
| `--dark-text-secondary` | 82% | Вторичный текст |
| `--dark-text-muted` | 50% | Метки, подписи |
| `--dark-text-disabled` | 25% | Неактивные элементы |

**Границы:** `--dark-border` (7% white) / `--dark-border-strong` (14% white)

## What does NOT belong here

- FTE heatmap colours — functional data visualisation, not brand
- Department badge colours — functional, intentionally non-brand
- Any React components or markup

## Sync rule

When updating a colour value: edit **both** `tokens.css` and `tokens.js`.
`tokens.css` is the human-readable reference; `tokens.js` is the React bridge.
