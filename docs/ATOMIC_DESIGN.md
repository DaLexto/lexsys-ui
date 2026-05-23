# Neurex UI — Atomic Design

**Audience:** Maintainers and consumers  
**Type:** Product / architecture direction  
**Status:** **Planned** — atoms shipped today; higher layers are roadmap  
**Source of truth for:** How Neurex UI layers compose from tokens through pages  
**Verified against:** `packages/ui`, `packages/registry`, consumer sandbox patterns

**Related docs:**

- [ARCHITECTURE.md](./ARCHITECTURE.md) — package boundaries and install flow
- [ROADMAP.md](./ROADMAP.md) — sequencing (UI composition track)
- [REVIEW_TODO.md](./REVIEW_TODO.md) — actionable backlog items
- [UI_VARIANTS.md](./UI_VARIANTS.md) — atom-level variant API
- [TESTING.md](./TESTING.md) — verification surfaces (playground vs sandbox)

---

## Goal

Neurex ships **atoms** today and evolves toward **optional composed layers**
(molecules → organisms → templates). Consumers can:

1. Install and compose atoms themselves (full ownership), or
2. Install higher-level registry **blocks** when Neurex provides them.

Pages remain **consumer-owned** — Neurex does not ship product-specific screens.

Every layer MUST compose **only from layers below it** (atoms → molecules →
organisms → templates). Higher blocks reuse existing Neurex blocks — they MUST NOT
re-implement primitives. This keeps the system **scalable**: new organisms ship
without forking atoms; new templates assemble existing organisms.

---

## Layer model

Brad Frost's Atomic Design layers, mapped to Neurex:

| Layer | Neurex meaning | Ownership | Install path (target) |
| ----- | -------------- | --------- | --------------------- |
| **Atoms** | Tokens, utilities, primitive UI components | Neurex registry | `neurex add button` → `src/components/ui/` |
| **Molecules** | Small composed UI (field row, menu trigger + label, button group) | Neurex blocks (planned) | `neurex add …` → e.g. `src/components/blocks/` |
| **Organisms** | Larger sections (sidebar nav, settings panel, auth form shell) | Neurex blocks (planned) | Same as molecules |
| **Templates** | Page shells without real data (dashboard layout, auth layout) | Neurex blocks (planned) | e.g. `src/layouts/` or consumer choice |
| **Pages** | Full screens with app data and routing | **Consumer** | `src/pages/`, `src/routes/`, app router segments |

```txt
tokens (--nx-*)     atoms (Button, Menu, Field, …)
       ↓                      ↓
              molecules (FieldRow, NavItem, …)     ← planned registry blocks
                          ↓
              organisms (SidebarNav, SettingsForm) ← planned registry blocks
                          ↓
              templates (DashboardShell, AuthLayout) ← planned registry blocks
                          ↓
              pages (Overview, Settings, Billing)  ← consumer app only
```

Each arrow is a **composition** edge: the upper layer imports and assembles the
lower layer. Same rule applies in the monorepo reference, registry templates, and
consumer projects after install.

---

## Compositional rules (scalability)

**Core rule:** build up, never sideways or down.

| Layer | MAY compose from | MUST NOT |
| ----- | ---------------- | -------- |
| **Molecules** | Atoms, tokens, utilities | Duplicate atom markup/styles inline |
| **Organisms** | Molecules, atoms | Rebuild a molecule inline instead of importing the block |
| **Templates** | Organisms, molecules, atoms | Hardcode page data, routing, or business logic |
| **Pages** | Templates, organisms, molecules, atoms | — (consumer app) |

### Block composition

Higher registry **blocks** use **existing Neurex blocks** from lower layers:

```txt
Button + Field + Label          →  FormField (molecule)
FormField + MenuTriggerRow      →  SettingsFieldGroup (molecule)
NavItem + ScrollArea + Menu     →  AppSidebar (organism)
AppSidebar + DashboardTopbar    →  DashboardShell (template)
```

**Examples (target):**

- `AppSidebar` (organism) imports `NavItem`, `WorkspaceSwitcher` (molecules) — not raw
  `Button`/`Menu` wiring copied from scratch unless no molecule exists yet.
- `DashboardShell` (template) imports `AppSidebar` + `DashboardTopbar` (organisms) — not
  a monolithic sidebar copy-pasted into the layout file.

When a needed molecule does not exist, **add the molecule first**, then compose the
organism. Do not skip layers to ship faster.

### Registry metadata

Each block declares **direct** `registryDependencies` only (atoms and lower-layer
blocks it imports). The CLI resolves the **full transitive tree** automatically —
consumers run one command, not manual install of every layer.

```txt
neurex add app-sidebar
  → resolves app-sidebar
  → resolves nav-item, workspace-switcher, scroll-area, menu, button, …
  → installs all registry files + npm deps + utilities + styles (deduped)
```

**Composable dependency installation (required):**

| Resource | Transitive? | Mechanism |
| -------- | ----------- | --------- |
| Registry items (atoms + blocks) | **Yes** | `resolveRegistryItems` recursive `registryDependencies` visit |
| npm `dependencies` | **Yes** | `collectDependencies` over resolved items |
| `utilities` (`cn`, …) | **Yes** | `collectUtilities` over resolved items |
| `styles` (`theme`, token CSS) | **Yes** | `collectStyles` over resolved items |

Rules:

- **Direct deps in metadata** — block authors list what they import, not every transitive atom
- **CLI installs the closure** — larger blocks MUST NOT require manual `neurex add` of each lower block
- **Idempotent** — re-running `neurex add` on an installed block skips unchanged files; missing deps are still installed
- **Validator (planned)** — registry build MUST reject unknown deps, layer violations (organism → organism wrong direction optional), and circular `registryDependencies`

Current state: transitive registry resolution is **implemented** for atoms today
(`packages/cli/src/core/registry-resolver.ts`). Block items are not in the registry yet;
this contract applies when blocks ship (UC.1 / AD.1).

Blocks MUST NOT assume sibling blocks exist unless declared — undeclared imports break
install guarantees.

### Styling and tokens

- All layers use `--nx-*` tokens and atom/block components
- Layout-specific CSS in consumer `style.css` is for **page/template shell gaps only** —
  not a second design system duplicating block internals
- No raw Tailwind palette shortcuts at any layer

### Consumer scalability

After install, blocks are **user-owned source**. Consumers MAY:

- Compose installed blocks the same way Neurex does (organism from molecules)
- Fork a block locally and swap one molecule without touching atoms
- Stay on atoms-only and ignore higher blocks entirely

The composition model is the same for Neurex maintainers and consumers — only ownership
and customization depth differ.

---

## Current state (shipped)

### Atoms — yes

| Kind | Location | Notes |
| ---- | -------- | ----- |
| Design tokens | `styles/tokens.css`, `styles/theme.css` | Generated from `@neurex/tokens`; `--nx-*` CSS variables |
| Utilities | `src/lib/cn.ts` (installed) | `cn`, CVA state helpers |
| UI primitives | 32 registry components | `Button`, `Menu`, `Field`, `Dialog`, `Toast`, … |

Each atom follows the component file contract (`ComponentName.tsx`, `.types.ts`,
`.variants.ts`). Styling uses token-backed Tailwind transport (`bg-(--nx-*)`), not
Tailwind palette defaults.

### Molecules, organisms, templates — not shipped as registry items

Consumers compose atoms manually (see external sandbox: sidebar, forms, layout CSS
in `src/style.css`). That is intentional for the registry-first MVP but explains
why composed UI can look raw until blocks exist.

### Pages — consumer only

Routing, data fetching, and business copy live in the consumer project. Neurex docs
and sandbox may show **examples**, not installable product pages.

---

## Target behavior (planned)

### Registry blocks

Introduce a registry item category (or `type: block`) for installable composed
patterns:

- **Molecules first** — low coupling, reusable across apps (`FormField`, `MenuTriggerRow`)
- **Organisms next** — opinionated sections (`AppSidebar`, `SettingsNav`, `LoginForm`)
- **Templates last** — layout shells consumers fill with pages

Blocks MUST:

- Compose **only** from lower layers (atoms and/or existing lower blocks) — see
  [Compositional rules](./ATOMIC_DESIGN.md#compositional-rules-scalability)
- Declare **direct** imports in `registryDependencies`; CLI installs the **transitive
  closure** automatically — see
  [Composable dependency installation](./ATOMIC_DESIGN.md#registry-metadata)
- Remain user-owned after install (same idempotent / no silent overwrite rules as atoms)
- Use `--nx-*` tokens and composed components — no raw Tailwind palette shortcuts
- Ship with sandbox verification as consumer truth ([TESTING.md § Verification surfaces](./TESTING.md#verification-surfaces))

Blocks MUST NOT:

- Re-implement atom behavior inline (duplicate Button/Menu/Field markup)
- Skip a layer permanently (organism that inlines molecule logic instead of importing it)
- Introduce undeclared dependencies on other blocks

### Dual path for consumers

| Consumer need | Path |
| ------------- | ---- |
| Full control, custom design system integration | Atoms only + own composition |
| Fast start, Neurex-default look | Atoms + optional blocks/templates |
| Hybrid | Install organism, customize locally (user-owned code) |

---

## Package mapping

| Monorepo package | Atomic layers |
| ---------------- | ------------- |
| `packages/tokens` | Foundation for all layers (not a UI layer) |
| `packages/ui` | Atom reference implementations; block references when added |
| `packages/registry` | Atom templates today; block templates planned |
| `packages/cli` | Installs atoms and blocks via metadata — no hardcoded layout logic |
| `apps/playground` | Atom smoke / variant checks only (~10–20% focus) |
| Consumer sandbox | Molecule+ composition truth (~80–90% focus) |

---

## Sequencing (roadmap)

Tracked as **UI composition track** in [ROADMAP.md](./ROADMAP.md#ui-composition--atomic-design-planned).

Suggested order:

1. **UC.1** — Block registry conventions, metadata shape, and compositional rules (layer deps, no skip-layer shortcuts)
2. **UC.2** — Pilot molecules (2–3 items, e.g. form field row, nav item)
3. **UC.3** — Pilot organism (sidebar nav or settings panel from sandbox learnings)
4. **UC.4** — Template shell (dashboard layout) + sandbox migration
5. **UC.5** — CLI/docs UX for `neurex add` blocks (category, dependencies, docs)
6. **UC.6** — Transitive install tests + registry validator (unknown deps, cycles, layer rules)

Active execution items: [REVIEW_TODO.md § UI composition](./REVIEW_TODO.md#ui-composition-atomic-design).

---

## Non-goals

- Neurex MUST NOT ship full SaaS pages as registry items
- Blocks MUST NOT replace atoms — atoms remain the stable primitive layer
- Blocks MUST NOT bypass lower layers — compose existing blocks upward (scalable hierarchy)
- Playground MUST NOT become the primary place for organism/page polish
- Generated `.nx-*` utility classes (Option C spike) is a separate styling transport
  decision — compatible with this layer model but not required for UC.1

---

## Maintenance

- Update this doc when a layer ships or registry block conventions change
- When adding a block: sync `packages/ui` reference → `pnpm registry:sync` → sandbox verify
- Record shipped block names in git history; keep this doc at layer-level summary only
