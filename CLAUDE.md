# az-design-system

Minimal brand token library for AstraZeneca D&D IT tools.
Static files only — no build step, no Node.js.

Single source of truth for AstraZeneca brand colours and fonts.
Consumer apps (Metrics-Dashboard, Resource-Plan) load tokens via CDN.

## Правила работы

> **git = единственный канон.** У Claude нет памяти между сессиями и
> устройствами. Всё важное должно жить в закоммиченных файлах.

- **Бренд-токены — только в этом репо.** Цвета/шрифты приходят в приложения
  через CDN (`@main`). В приложениях бренд-значения не хардкодить.
- **Перед правкой токенов — спросить:** «это на весь бренд или только для
  этого экрана?» Только экран → менять локально в приложении, не здесь.
- **При правке токенов — менять оба файла:** `tokens.css` И `tokens.js`.
- **Перед `git push` — спрашивать подтверждение.** После пуша CDN `@main`
  раздаёт новые значения во все приложения (кэш jsDelivr ~12 ч).
- Если этот репо недоступен в текущей сессии — оставить
  `TODO(design-system): …` в Tech Debt нужного репо; доделать позже.

## Файлы

| Файл | Содержимое |
|---|---|
| `tokens.css` | CSS custom properties — все актуальные значения с комментариями |
| `tokens.js` | `window.AZ_DS` — те же значения для React / JSX inline styles |

> Актуальные значения токенов — читать в `tokens.css`, не в этом файле.
> Там же комментарии по группам: примитивы, светлая/тёмная тема, статусы.

## Подключение через CDN

```html
<!-- 1. Fallback (на случай недоступности CDN) -->
<style>
  :root { --color-mulberry:#830051; --color-dark-mulberry:#4d0030; }
</style>
<!-- 2. Design system -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/kmntsvld/az-design-system@main/tokens.css">
<script src="https://cdn.jsdelivr.net/gh/kmntsvld/az-design-system@main/tokens.js"></script>
<!-- 3. Google Fonts -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@400;700&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
```

**Версионирование:** `@main` = всегда свежее (для прототипов).
Для прода — пин по тегу (`@v1.2.0`) или копия файлов в сборку.

> Раньше использовался git submodule — отказались: не работал в облачных
> сессиях и провоцировал дрейф копий.

## Использование токенов

**CSS:**
```css
color: var(--color-mulberry);
background: var(--dark-bg-surface-1);
border: 1px solid var(--dark-border);
```

**React JSX:**
```jsx
style={{ background: window.AZ_DS.sidebar.bg }}
style={{ color: window.AZ_DS.colors.mulberry }}
```

**Темы** (`--light-*` / `--dark-*`) — референсные, не применяются автоматически.
Приложение само решает когда их использовать:
```css
html[data-theme="dark"] { --page-bg: var(--dark-bg-base); }
```

## Что НЕ входит в систему

- FTE heatmap colours — функциональная визуализация, не бренд
- Department badge colours — функциональные, намеренно вне бренда
- React-компоненты и разметка

Статус-токены (`over` / `ontrack` / `risk` / `off` / `nodata`) — **входят**:
это семантический бренд-слой. Структура и значения — в `tokens.css`.
