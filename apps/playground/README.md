# Lexsys Playground

**Audience:** Maintainers  
**Type:** Package README  
**Source of truth for:** Playground role and local verification commands  
**Verified against:** `apps/playground/`  
**Last reviewed:** 2026-05-30

---

The playground imports `@dalexto/lexsys-ui` from the workspace and built token CSS. Use it for a quick wiring check after UI or token changes. Consumer truth (CLI install, templates, real layouts) lives in an external sandbox — see [docs/operations/TESTING.md § Verification surfaces](../../docs/operations/TESTING.md#verification-surfaces).

**Policy:** maintenance-only. Do not add product UX or new demos here unless the change explicitly targets `apps/playground/**`.

## Commands

```sh
pnpm playground:dev       # local Vite dev server
pnpm playground:check     # lint + typecheck
pnpm playground:build     # production build (builds tokens + UI first)
```

Run from the repository root.

## Category navigation

Sticky nav jumps to component categories. Each section wraps existing panel demos — no new install path.

| Category     | Anchor                   | Panel                                         |
| ------------ | ------------------------ | --------------------------------------------- |
| Brand        | `#category-brand`        | Token swatches, semantic color demos          |
| Layout       | `#category-layout`       | Viewport tokens, aspect ratios, ScrollArea    |
| Actions      | `#category-actions`      | Button, Input                                 |
| Forms        | `#category-forms`        | Field, Form, Fieldset, inputs, Select, Switch |
| Overlays     | `#category-overlays`     | Dialog, Drawer, Popover, Menu, Tooltip, Toast |
| Surfaces     | `#category-surfaces`     | Alert, Avatar, Badge, Card, Meter, Progress   |
| Interactions | `#category-interactions` | Accordion, Collapsible, Tabs, Toggle, Slider  |

Toggle **Light / Dark** in the header to verify theme CSS. Brand preset switching belongs in sandbox or SaaS — not here.

## Source layout

```
src/
├── main.tsx           — shell, category nav, theme toggle
├── *-panel.tsx        — existing component demos by category
├── examples.tsx       — shared example data
└── styles.css         — playground layout (not shipped to consumers)
```
