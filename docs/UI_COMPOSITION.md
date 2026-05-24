# Lexsys UI — Composition Model

**Audience:** Maintainers and consumers  
**Type:** Domain specification  
**Source of truth for:** Install layers, composition rules, monorepo vs consumer layout  
**Verified against:** `packages/ui`, `packages/registry`, `packages/cli`, consumer sandbox

**Related docs:**

- [UI_CATALOG.md](./UI_CATALOG.md) — installable inventory (compound/leaf, exports, versions)
- [REGISTRY.md](./REGISTRY.md) — item metadata contract
- [CLI.md](./CLI.md) — install, config, uninstall
- [ARCHITECTURE.md](./ARCHITECTURE.md) — package boundaries
- [ROADMAP.md](./ROADMAP.md) — sequencing
- [TESTING.md](./TESTING.md) — verification surfaces
- [REVIEW_TODO.md § Blocks/templates optimization backlog](./REVIEW_TODO.md#blocks--templates-optimization-backlog) — known gaps

---

## Lexsys model (three layers)

```txt
Primitive  →  Block  →  Template  →  Page (consumer-owned)
```

| Layer         | Definition                                                                          | Monorepo folder               | Consumer install path               |
| ------------- | ----------------------------------------------------------------------------------- | ----------------------------- | ----------------------------------- |
| **Primitive** | One reusable foundation piece. Installs independently. No Lexsys component imports. | `packages/ui/.../primitives/` | `src/components/ui/<Name>/`         |
| **Block**     | Reusable composition of primitives and/or other blocks.                             | `packages/ui/.../blocks/`     | `src/components/ui/<Name>/`         |
| **Template**  | Reusable page/layout structure without app data or routing.                         | `packages/ui/.../templates/`  | `src/components/ui/<Name>/`         |
| **Page**      | Full screen with data and routing. **Not** a registry item.                         | —                             | Consumer app (`src/pages/`, routes) |

**Definitions:**

- **Primitive** = standalone reusable foundation piece (`registryDependencies: []`)
- **Block** = reusable composition of lower layers
- **Template** = reusable page/layout shell

Do not use atoms/molecules/organisms in Lexsys docs or CLI copy — those names are not part of this model.

---

## Folder layout

**Monorepo reference** (`packages/ui/src/components/`):

```txt
primitives/     ← 41 shipped primitives
blocks/         ← FormField, SettingsPanel, Sidebar, AuthForm, CommandPalette (pilot)
templates/      ← DashboardShell (pilot)
```

**Registry templates** mirror the same three folders under
`packages/registry/templates/`.

**Consumer project** (after `lexsys add`):

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

**Status:** `shipped` = in registry + CLI; `planned` = in [Base UI docs](https://base-ui.com/react/components) but not yet a Lexsys primitive.

| Base UI module                         | Lexsys primitive                    | Status  |
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
| `@base-ui/react/autocomplete`          | Autocomplete                        | shipped |
| `@base-ui/react/checkbox-group`        | CheckboxGroup                       | shipped |
| `@base-ui/react/combobox`              | Combobox                            | shipped |
| `@base-ui/react/context-menu`          | ContextMenu                         | shipped |
| `@base-ui/react/menubar`               | Menubar                             | shipped |
| `@base-ui/react/navigation-menu`       | NavigationMenu                      | shipped |
| `@base-ui/react/otp-field`             | OtpField                            | shipped |
| `@base-ui/react/preview-card`          | PreviewCard                         | shipped |
| `@base-ui/react/toolbar`               | Toolbar                             | shipped |

Lexsys-only primitives (no dedicated Base UI module): Alert, Badge, Card.

**Planned primitive sequencing (completed):** Autocomplete + Combobox → OtpField → NavigationMenu → ContextMenu + Toolbar → CheckboxGroup → Menubar + PreviewCard.

Base UI **utilities** (CSP Provider, Direction Provider, `mergeProps`, `useRender`) stay internal — not registry primitives.

---

## Block catalog

| Block          | Status | Depends on                            |
| -------------- | ------ | ------------------------------------- |
| FormField      | pilot  | field, input                          |
| SettingsPanel  | pilot  | card                                  |
| Sidebar        | pilot  | button, drawer, scroll-area           |
| AuthForm       | pilot  | card, input, button, separator        |
| CommandPalette | pilot  | dialog, input, scroll-area, separator |

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
Primitive   → imports nothing from Lexsys components/
Block       → imports primitives/ and/or blocks/ (monorepo paths)
Template    → imports primitives/, blocks/, and/or templates/
Page        → consumer composes any installed layer + app code
```

**Registry metadata** declares **direct** `registryDependencies` only. CLI installs the **transitive closure** on `lexsys add`.

```txt
lexsys add dashboard-shell
  → resolves dashboard-shell.registryDependencies (sidebar, …)
  → installs templates/DashboardShell + blocks/Sidebar + primitives/…
  → copies to src/components/ui/<Name>/ with import rewrite
  → npm deps, cn, theme (deduped)
```

**Base UI** is internal (`@base-ui/react`). Primitives wrap Base UI packages — Lexsys does not reimplement Base UI behavior.

Composition rules are build-validated via `validateRegistryComposition` at
`pnpm registry:check`. See [REGISTRY.md](./REGISTRY.md).

---

## Compound-first contract

Every installable surface uses **named compound parts** that compose like LEGO.
Consumers assemble Lexsys parts only — not raw `div` / `label` / `onChange` soup
when a Lexsys part exists.

### Architecture rules

1. **Primitive with Base UI parts** → flat named sibling exports + `displayName`
   on each part ([UI.md](./UI.md) wrapper checklist).
2. **Lexsys-only layout primitive** (Card, Alert) → same named-export pattern.
3. **True atom** (single DOM node, no slots) → leaf OK: `Button`, `Input`,
   `Badge`, `Separator`, `Form`, `Toggle`, `Menubar`.
4. **Block** → exports **2+ named parts**; composes primitives/blocks only;
   **no raw `<label>`** when `FieldLabel` exists; **no raw nav list markup**
   when the block exports `SidebarItem`.
5. **Template** → layout slots (`DashboardShellSidebar`, `DashboardShellMain`);
   no data arrays.
6. **Page (consumer)** → blocks + compounds only; zero form field markup.

### Naming convention

Flat named exports (not Base UI dot notation):

```tsx
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarGroup,
  SidebarItem,
} from "@/components/ui/Sidebar/Sidebar"
```

| Base UI part          | Lexsys export        |
| --------------------- | -------------------- |
| `NavigationMenu.Root` | `NavigationMenu`     |
| `NavigationMenu.List` | `NavigationMenuList` |
| `NavigationMenu.Item` | `NavigationMenuItem` |

### Custom Lexsys parts

When Base UI has no part, create a Lexsys compound part from existing Lexsys
primitives/leafs (`Button`, `Field`, `Card`, `ScrollArea`, `Separator`). Raw HTML
is allowed only as an **internal implementation detail** of a Lexsys part — never
as the consumer-facing composition API.

### Variant propagation

Compound parents expose shared defaults via React context. Child parts may
override explicitly; resolved props pass to the Lexsys primitive they compose.

```txt
child explicit prop > parent context default > primitive default
```

```tsx
<NavigationBar itemVariant="ghost" itemSize="sm">
  <NavigationBarItem>Dashboard</NavigationBarItem>
  <NavigationBarItem variant="secondary">Settings</NavigationBarItem>
</NavigationBar>
```

Rules:

- Parent compounds may expose defaults (`itemVariant`, `itemSize`, `density`, …).
- Child props always win over parent context.
- Use typed context hooks — no React children introspection/cloning as primary mechanism.

### Good vs bad (consumer)

```tsx
// Good — compound LEGO
<Sidebar>
  <SidebarHeader />
  <SidebarContent>
    <SidebarGroup>
      <SidebarItemLink href="/">Dashboard</SidebarItemLink>
    </SidebarGroup>
  </SidebarContent>
</Sidebar>

// Bad — config blob + raw markup
<Sidebar items={[{ id: "1", label: "Dashboard", href: "/" }]} />
<div><label htmlFor="email">Email</label><Input onChange={…} /></div>
```

### Breaking migration (compound-first track)

Tracked in [ROADMAP.md § M11](./ROADMAP.md#m11--compound-first-api). After
implementation, touched registry items bump to **`0.0.2`**.

| Old API                                       | New API                                                                                |
| --------------------------------------------- | -------------------------------------------------------------------------------------- |
| `<Sidebar items={[…]} />`                     | `<Sidebar><SidebarContent><SidebarGroup>…</SidebarGroup></SidebarContent></Sidebar>`   |
| `<CommandPalette items={[…]} onSelect={…} />` | compound `CommandPaletteItem` children                                                 |
| `<AuthForm mode="login" onSubmit={…} />`      | `<AuthForm><AuthFormHeader>…</AuthFormHeader><Field>…</Field></AuthForm>`              |
| `<FormField label="Email" … />`               | `<FormField><FormFieldLabel>…</FormFieldLabel><FormFieldControl /></FormField>`        |
| `<DashboardShell sidebarItems={[…]} />`       | `<DashboardShell><DashboardShellSidebar><Sidebar>…</Sidebar></DashboardShellSidebar>…` |

Execution queue: [REVIEW_TODO.md § UC.7](./REVIEW_TODO.md#ui-composition-primitives-blocks-templates).

---

## Registry vs consumer config

| Concern                  | Where                                            |
| ------------------------ | ------------------------------------------------ |
| Layer dependencies       | `registryDependencies` in registry item metadata |
| What is installed        | `installed` map in `lexsys.config.json`          |
| Install path per item    | `target` → `src/components/ui/<CanonicalName>`   |
| Components root override | `paths.components` in `lexsys.config.json`       |

No `installedBy` / provenance graph. Uninstall uses registry graph + remaining
`installed` keys (see [CLI.md § uninstall](./CLI.md)).

---

## Current state

Installable inventory (47 items — compound vs leaf, named exports, registry
version): **[UI_CATALOG.md](./UI_CATALOG.md)**.

Pilot blocks and templates remain installable; stability and sandbox QA gaps are
tracked in [REVIEW_TODO.md § Blocks/templates optimization backlog](./REVIEW_TODO.md#blocks--templates-optimization-backlog).

**Pages** — routing, data, and product copy stay in the consumer project only.

---

## Install and uninstall (consumer)

```bash
lexsys add button
lexsys add dashboard-shell --dry-run
lexsys uninstall sidebar
lexsys uninstall sidebar --with-deps --dry-run
```

- **`lexsys add <name>`** — one command for all layers; path from `item.target`
- **Default uninstall** — removes only the named item; prints orphan hints
- **`--with-deps`** — removes registry items no longer needed by any remaining `installed` entry
- **npm packages** — never auto-removed

See [CLI.md](./CLI.md) for `lexsys.config.json` (`paths.components`, aliases).

---

## Verification

| Layer              | Primary surface            |
| ------------------ | -------------------------- |
| Primitives         | Monorepo playground (~20%) |
| Blocks + templates | Consumer sandbox (~80%)    |

Workflow: edit `packages/ui` → `pnpm registry:sync` → `lexsys update` in sandbox — never hand-edit registry templates or installed consumer source.

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
| 4    | Blocks/templates optimization pass (BO.1–BO.7)            | in progress |
| 5    | Additional blocks/templates beyond pilot set              | planned     |
| 6    | Base UI primitive expansion (9 modules above)             | shipped     |

Tracked in [REVIEW_TODO.md § UI composition](./REVIEW_TODO.md#ui-composition-primitives-blocks-templates).

---

## Non-goals

- Registry items for product-specific pages
- Replacing primitives with blocks-only workflows
- Consumer folder layout mirroring monorepo layer depth by default
- `installedBy` provenance in consumer config
- Hand-written token CSS
