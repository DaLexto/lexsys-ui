# Neurex UI — Composition Model

**Audience:** Maintainers and consumers  
**Type:** Domain specification  
**Status:** Primitives shipped (32); pilot blocks (FormField, Sidebar) and template (DashboardShell) shipped — optimization pass open  
**Source of truth for:** Install layers, composition rules, monorepo vs consumer layout  
**Verified against:** `packages/ui`, `packages/registry`, `packages/cli`, consumer sandbox

**Related docs:**

- [REGISTRY.md](./REGISTRY.md) — item metadata contract
- [CLI.md](./CLI.md) — install, config, uninstall
- [ARCHITECTURE.md](./ARCHITECTURE.md) — package boundaries
- [ROADMAP.md](./ROADMAP.md) — sequencing
- [TESTING.md](./TESTING.md) — verification surfaces
- [REVIEW_TODO.md § Blocks/templates optimization backlog](./REVIEW_TODO.md#blocks--templates-optimization-backlog) — known gaps

---

## Neurex model (three layers)

```txt
Primitive  →  Block  →  Template  →  Page (consumer-owned)
```

| Layer         | Definition                                                                          | Monorepo folder               | Consumer install path               |
| ------------- | ----------------------------------------------------------------------------------- | ----------------------------- | ----------------------------------- |
| **Primitive** | One reusable foundation piece. Installs independently. No Neurex component imports. | `packages/ui/.../primitives/` | `src/components/ui/<Name>/`         |
| **Block**     | Reusable composition of primitives and/or other blocks.                             | `packages/ui/.../blocks/`     | `src/components/ui/<Name>/`         |
| **Template**  | Reusable page/layout structure without app data or routing.                         | `packages/ui/.../templates/`  | `src/components/ui/<Name>/`         |
| **Page**      | Full screen with data and routing. **Not** a registry item.                         | —                             | Consumer app (`src/pages/`, routes) |

**Definitions:**

- **Primitive** = standalone reusable foundation piece (`registryDependencies: []`)
- **Block** = reusable composition of lower layers
- **Template** = reusable page/layout shell

Do not use atoms/molecules/organisms in Neurex docs or CLI copy — those names are not part of this model.

---

## Folder layout

**Monorepo reference** (`packages/ui/src/components/`):

```txt
primitives/     ← 32 shipped primitives
blocks/         ← FormField, Sidebar (pilot)
templates/      ← DashboardShell (pilot)
```

**Registry templates** mirror the same three folders under
`packages/registry/templates/`.

**Consumer project** (after `neurex add`):

```txt
src/components/ui/<CanonicalName>/   ← flat install for all layers
src/lib/utils.ts
styles/tokens.css
styles/theme.css
```

The CLI installs from `item.target` (flat `ui/`) and rewrites cross-layer
imports at install time so consumers do not mirror monorepo folder depth. See
[REGISTRY.md](./REGISTRY.md) and [CLI.md](./CLI.md).

Foundation (not UI layers): token CSS, `cn` utility, npm dependencies.

---

## Base UI inventory

New Base UI wraps ship as **primitives** (`registryDependencies: []`).

**Status:** `shipped` = in registry + CLI; `planned` = in [Base UI docs](https://base-ui.com/react/components) but not yet a Neurex primitive.

| Base UI module                         | Neurex primitive                    | Status  |
| -------------------------------------- | ----------------------------------- | ------- |
| `@base-ui/react/accordion`             | Accordion                           | shipped |
| `@base-ui/react/alert-dialog`          | AlertDialog                         | shipped |
| `@base-ui/react/avatar`                | Avatar                              | shipped |
| `@base-ui/react/button`                | Button                              | shipped |
| `@base-ui/react/checkbox`              | Checkbox                            | shipped |
| `@base-ui/react/collapsible`           | Collapsible                         | shipped |
| `@base-ui/react/dialog`                | Dialog                              | shipped |
| `@base-ui/react/drawer`                | Drawer                              | shipped |
| `@base-ui/react/field`                 | Field, Input, Textarea, NumberField | shipped |
| `@base-ui/react/fieldset`              | Fieldset                            | shipped |
| `@base-ui/react/form`                  | Form                                | shipped |
| `@base-ui/react/input`                 | Input                               | shipped |
| `@base-ui/react/menu`                  | Menu                                | shipped |
| `@base-ui/react/meter`                 | Meter                               | shipped |
| `@base-ui/react/number-field`          | NumberField                         | shipped |
| `@base-ui/react/popover`               | Popover                             | shipped |
| `@base-ui/react/progress`              | Progress                            | shipped |
| `@base-ui/react/radio` / `radio-group` | RadioGroup                          | shipped |
| `@base-ui/react/scroll-area`           | ScrollArea                          | shipped |
| `@base-ui/react/select`                | Select                              | shipped |
| `@base-ui/react/separator`             | Separator                           | shipped |
| `@base-ui/react/slider`                | Slider                              | shipped |
| `@base-ui/react/switch`                | Switch                              | shipped |
| `@base-ui/react/tabs`                  | Tabs                                | shipped |
| `@base-ui/react/toast`                 | Toast                               | shipped |
| `@base-ui/react/toggle`                | Toggle                              | shipped |
| `@base-ui/react/toggle-group`          | ToggleGroup                         | shipped |
| `@base-ui/react/tooltip`               | Tooltip                             | shipped |
| `@base-ui/react/autocomplete`          | Autocomplete                        | planned |
| `@base-ui/react/checkbox-group`        | CheckboxGroup                       | planned |
| `@base-ui/react/combobox`              | Combobox                            | planned |
| `@base-ui/react/context-menu`          | ContextMenu                         | planned |
| `@base-ui/react/menubar`               | Menubar                             | planned |
| `@base-ui/react/navigation-menu`       | NavigationMenu                      | planned |
| `@base-ui/react/otp-field`             | OtpField                            | planned |
| `@base-ui/react/preview-card`          | PreviewCard                         | planned |
| `@base-ui/react/toolbar`               | Toolbar                             | planned |

Neurex-only primitives (no dedicated Base UI module): Alert, Badge, Card.

**Planned primitive sequencing (suggested):** Autocomplete + Combobox → OtpField → NavigationMenu → ContextMenu + Toolbar → CheckboxGroup → Menubar + PreviewCard (lower priority until product need).

Base UI **utilities** (CSP Provider, Direction Provider, `mergeProps`, `useRender`) stay internal — not registry primitives.

---

## Block catalog

| Block          | Status  | Depends on                        |
| -------------- | ------- | --------------------------------- |
| FormField      | pilot   | field, input                      |
| Sidebar        | pilot   | button, drawer, menu, scroll-area |
| SettingsPanel  | planned | —                                 |
| AuthForm       | planned | —                                 |
| CommandPalette | planned | —                                 |

## Template catalog

| Template           | Status  | Depends on |
| ------------------ | ------- | ---------- |
| DashboardShell     | pilot   | sidebar    |
| SettingsPageLayout | planned | —          |
| DocsLayout         | planned | —          |

Pilot blocks/templates are installable but not yet marked stable — see
optimization backlog in [REVIEW_TODO.md](./REVIEW_TODO.md).

---

## Composition rules

```txt
Primitive   → imports nothing from Neurex components/
Block       → imports primitives/ and/or blocks/ (monorepo paths)
Template    → imports primitives/, blocks/, and/or templates/
Page        → consumer composes any installed layer + app code
```

**Registry metadata** declares **direct** `registryDependencies` only. CLI installs the **transitive closure** on `neurex add`.

```txt
neurex add dashboard-shell
  → resolves dashboard-shell.registryDependencies (sidebar, …)
  → installs templates/DashboardShell + blocks/Sidebar + primitives/…
  → copies to src/components/ui/<Name>/ with import rewrite
  → npm deps, cn, theme (deduped)
```

**Base UI** is internal (`@base-ui/react`). Primitives wrap Base UI packages — Neurex does not reimplement Base UI behavior.

Composition rules are build-validated via `validateRegistryComposition` at
`pnpm registry:check`. See [REGISTRY.md](./REGISTRY.md).

---

## Registry vs consumer config

| Concern                  | Where                                            |
| ------------------------ | ------------------------------------------------ |
| Layer dependencies       | `registryDependencies` in registry item metadata |
| What is installed        | `installed` map in `neurex.config.json`          |
| Install path per item    | `target` → `src/components/ui/<CanonicalName>`   |
| Components root override | `paths.components` in `neurex.config.json`       |

No `installedBy` / provenance graph. Uninstall uses registry graph + remaining
`installed` keys (see [CLI.md § uninstall](./CLI.md)).

---

## Current state

### Primitives — shipped

All 32 registry components (`type: "component"`) — Button, Input, Dialog, Drawer, Menu, Field, Select, Toast, Tabs, …

Each follows the three-file contract (`.tsx`, `.types.ts`, `.variants.ts`). Token-backed styling only (`--nx-*`).

### Blocks — pilot shipped

FormField, Sidebar — registry + CLI installable; sandbox QA in progress.

### Templates — pilot shipped

DashboardShell — registry + CLI installable; sandbox QA in progress.

### Pages — consumer only

Routing, data, and product copy stay in the consumer project.

---

## Install and uninstall (consumer)

```bash
neurex add button
neurex add dashboard-shell --dry-run
neurex uninstall sidebar
neurex uninstall sidebar --with-deps --dry-run
```

- **`neurex add <name>`** — one command for all layers; path from `item.target`
- **Default uninstall** — removes only the named item; prints orphan hints
- **`--with-deps`** — removes registry items no longer needed by any remaining `installed` entry
- **npm packages** — never auto-removed

See [CLI.md](./CLI.md) for `neurex.config.json` (`paths.components`, aliases).

---

## Verification

| Layer              | Primary surface            |
| ------------------ | -------------------------- |
| Primitives         | Monorepo playground (~20%) |
| Blocks + templates | Consumer sandbox (~80%)    |

Workflow: edit `packages/ui` → `pnpm registry:sync` → `neurex update` in sandbox — never hand-edit registry templates or installed consumer source.

---

## Package mapping

| Package             | Role                                  |
| ------------------- | ------------------------------------- |
| `packages/tokens`   | Foundation (CSS variables)            |
| `packages/ui`       | Reference primitives/blocks/templates |
| `packages/registry` | Metadata + install templates          |
| `packages/cli`      | Metadata-driven install               |
| `apps/playground`   | Primitive smoke tests                 |
| Consumer sandbox    | Block/template truth                  |

---

## Sequencing

| Step | Work                                                      | Status      |
| ---- | --------------------------------------------------------- | ----------- |
| 1    | Layer docs + registry validators                          | shipped     |
| 2    | Monorepo `primitives/blocks/templates` + flat CLI install | shipped     |
| 3    | Pilot blocks + template + sandbox verify                  | in progress |
| 4    | Blocks/templates optimization pass (BO.1–BO.7)            | planned     |
| 5    | Additional blocks/templates beyond pilot set              | planned     |
| 6    | Base UI primitive expansion (10 planned modules above)    | planned     |

Tracked in [REVIEW_TODO.md § UI composition](./REVIEW_TODO.md#ui-composition-primitives-blocks-templates).

---

## Non-goals

- Registry items for product-specific pages
- Replacing primitives with blocks-only workflows
- Consumer folder layout mirroring monorepo layer depth by default
- `installedBy` provenance in consumer config
- Hand-written token CSS
