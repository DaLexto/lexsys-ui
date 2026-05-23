# Neurex UI — Layer Model

**Audience:** Maintainers and consumers  
**Type:** Product / architecture direction  
**Status:** Primitives shipped (32 items); blocks and templates planned  
**Source of truth for:** Install layers, composition rules, folder layout  
**Verified against:** `packages/ui`, `packages/registry`, `packages/cli`, consumer sandbox

**Related docs:**

- [REGISTRY.md](./REGISTRY.md) — item metadata contract
- [CLI.md](./CLI.md) — install, config, uninstall
- [ARCHITECTURE.md](./ARCHITECTURE.md) — package boundaries
- [ROADMAP.md](./ROADMAP.md) — sequencing
- [TESTING.md](./TESTING.md) — verification surfaces

---

## Neurex model (three layers)

```txt
Primitive  →  Block  →  Template  →  Page (consumer-owned)
```

| Layer         | Definition                                                                          | Folder                              |
| ------------- | ----------------------------------------------------------------------------------- | ----------------------------------- |
| **Primitive** | One reusable foundation piece. Installs independently. No Neurex component imports. | `src/components/primitives/`        |
| **Block**     | Reusable composition of primitives and/or other blocks.                             | `src/components/blocks/`            |
| **Template**  | Reusable page/layout structure without app data or routing.                         | `src/components/templates/`         |
| **Page**      | Full screen with data and routing. **Not** a registry item.                         | Consumer app (`src/pages/`, routes) |

**Definitions:**

- **Primitive** = standalone reusable foundation piece (`registryDependencies: []`)
- **Block** = reusable composition of lower layers
- **Template** = reusable page/layout shell

Do not use atoms/molecules/organisms in Neurex docs or CLI copy — those names are not part of this model.

---

## Folder layout (monorepo + consumer)

```txt
src/components/
├── primitives/     ← Layer 1 (32 shipped today)
├── blocks/         ← Layer 2 (Sidebar, AuthForm, …)
└── templates/      ← Layer 3 (DashboardTemplate, …)
```

Monorepo reference: [`packages/ui/src/components/`](../packages/ui/src/components/) uses the same three subfolders.

Registry templates: [`packages/registry/templates/`](../packages/registry/templates/) — `primitives/`, `blocks/`, `templates/`.

Foundation (not UI layers): `styles/tokens.css`, `styles/theme.css`, `src/lib/utils.ts`.

---

## Base UI inventory

New Base UI wraps ship as **primitives** (`registryDependencies: []`).

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
| `@base-ui/react/menubar`               | —                                   | missing |
| `@base-ui/react/navigation-menu`       | —                                   | missing |
| `@base-ui/react/toolbar`               | —                                   | missing |

Neurex-only primitives (no dedicated Base UI module): Alert, Badge, Card.

---

## Example block catalog (target)

| Block          | Depends on                        |
| -------------- | --------------------------------- |
| FormField      | field, input                      |
| Sidebar        | button, drawer, menu, scroll-area |
| SettingsPanel  | (planned)                         |
| AuthForm       | (planned)                         |
| CommandPalette | (planned)                         |

## Example template catalog (target)

| Template           | Depends on |
| ------------------ | ---------- |
| DashboardShell     | sidebar    |
| SettingsPageLayout | (planned)  |
| DocsLayout         | (planned)  |

---

## Composition rules

```txt
Primitive   → imports nothing from Neurex components/
Block       → imports primitives/ and/or blocks/
Template    → imports primitives/, blocks/, and/or templates/
Page        → consumer composes any installed layer + app code
```

**Registry metadata** declares **direct** `registryDependencies` only. CLI installs the **transitive closure** on `neurex add`.

```txt
neurex add sidebar
  → registry resolves sidebar.registryDependencies
  → installs blocks/Sidebar + primitives/Menu + primitives/Drawer + …
  → npm deps, cn, theme (deduped)
```

**Base UI** is internal (`@base-ui/react`). Primitives wrap Base UI packages — Neurex does not reimplement Base UI behavior. New Base UI wraps (e.g. NavigationMenu) ship as **primitives** when added.

---

## Registry vs consumer config

| Concern                         | Where                                                                |
| ------------------------------- | -------------------------------------------------------------------- |
| Sidebar depends on Menu, Drawer | `registryDependencies` in registry item metadata                     |
| What is installed               | `installed` map in `neurex.config.json`                              |
| Install path per item           | `target` in registry metadata (e.g. `src/components/blocks/Sidebar`) |

No `installedBy` / provenance graph. Uninstall uses registry graph + remaining `installed` keys (see [CLI.md § uninstall](./CLI.md)).

---

## Current state

### Primitives — shipped

All 32 registry components (`type: "component"`) — Button, Input, Dialog, Drawer, Menu, Field, Select, Toast, Tabs, …

Each follows the three-file contract (`.tsx`, `.types.ts`, `.variants.ts`). Token-backed styling only (`--nx-*`).

### Blocks — not shipped yet

Target examples: Sidebar, SettingsPanel, AuthForm, CommandPalette, DashboardNav, FormField.

### Templates — not shipped yet

Target examples: DashboardTemplate, SettingsTemplate, DocsTemplate.

### Pages — consumer only

Routing, data, and product copy stay in the consumer project.

---

## Install and uninstall (consumer)

```bash
neurex add button
neurex add sidebar --dry-run
neurex uninstall sidebar
neurex uninstall sidebar --with-deps --dry-run
```

- **`neurex add <name>`** — one command for all layers; path from `item.target`
- **Default uninstall** — removes only the named item; prints orphan hints
- **`--with-deps`** — removes registry items no longer needed by any remaining `installed` entry (closure from registry metadata, not `installedBy`)
- **npm packages** — never auto-removed

See [CLI.md](./CLI.md) for `neurex.config.json` schema (`paths.primitives`, `paths.blocks`, `paths.templates`).

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

| Step | Work                                                                |
| ---- | ------------------------------------------------------------------- |
| 1    | Layer docs + registry path contract (`primitives/blocks/templates`) |
| 2    | `ui/` → `primitives/` migration + CLI `item.target` install         |
| 3    | Pilot blocks (FormField, Sidebar) + sandbox verify                  |
| 4    | Templates (DashboardTemplate)                                       |
| 5    | CLI `list` by layer, `--with-deps`, transitive tests                |

Tracked in [REVIEW_TODO.md § UI composition](./REVIEW_TODO.md#ui-composition-primitives-blocks-templates).

---

## Non-goals

- Registry items for product-specific pages
- Replacing primitives with blocks-only workflows
- `installedBy` provenance in consumer config
- Hand-written token CSS
