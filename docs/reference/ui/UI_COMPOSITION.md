# Lexsys UI — Composition Model

**Audience:** Maintainers and consumers  
**Type:** Domain specification  
**Source of truth for:** Install layers, composition rules, monorepo vs consumer layout  
**Verified against:** `packages/ui`, `packages/registry`, `packages/cli`, consumer sandbox
**Last reviewed:** 2026-06-08

---

## On this page

- [Lexsys model (three layers)](#lexsys-model-three-layers)
- [Folder layout](#folder-layout)
- [Base UI inventory](#base-ui-inventory)
- [Block catalog](#block-catalog)
- [Template catalog](#template-catalog)
- [Composition rules](#composition-rules)
- [Compound-first contract](#compound-first-contract)
  - [Architecture rules](#architecture-rules)
  - [Naming convention](#naming-convention)
  - [Custom Lexsys parts](#custom-lexsys-parts)
  - [Variant propagation](#variant-propagation)
  - [Good vs bad (consumer)](#good-vs-bad-consumer)
  - [Link hosts (Button, DrawerClose)](#link-hosts-button-drawerclose)
  - [Breaking migration (compound-first track)](#breaking-migration-compound-first-track)
- [Registry vs consumer config](#registry-vs-consumer-config)
- [Current state](#current-state)
- [Install and uninstall (consumer)](#install-and-uninstall-consumer)
- [Verification](#verification)
- [Package mapping](#package-mapping)
- [Sequencing](#sequencing)
- [Non-goals](#non-goals)

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
primitives/     ← 46 shipped primitives
blocks/         ← FormField, SettingsPanel, Sidebar, AuthForm, CommandPalette, Empty, PageHeader, StatsCard, FilterToolbar, DataTable
templates/      ← DashboardShell, SettingsPageLayout
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
[Registry reference](../registry/REGISTRY.md) and [CLI reference](../cli/CLI.md).

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

Lexsys-only primitives (no dedicated Base UI module): Alert, Badge, Breadcrumb, Card, DatePicker, Pagination, Table.

| Lexsys primitive | Registry item | UC id | Status  |
| ---------------- | ------------- | ----- | ------- |
| Pagination       | `pagination`  | UC.8  | shipped |
| Breadcrumb       | `breadcrumb`  | UC.9  | shipped |
| DatePicker       | `date-picker` | UC.10 | shipped |

**Planned primitive sequencing (completed):** Autocomplete + Combobox → OtpField → NavigationMenu → ContextMenu + Toolbar → CheckboxGroup → Menubar + PreviewCard → Pagination + Breadcrumb + DatePicker (UC.8–UC.10).

Base UI **utilities** (CSP Provider, Direction Provider, `mergeProps`, `useRender`) stay internal — not registry primitives.

---

## Block catalog

| Block          | Status                             | Depends on                                                                           |
| -------------- | ---------------------------------- | ------------------------------------------------------------------------------------ |
| FormField      | shipped                            | field, input                                                                         |
| SettingsPanel  | shipped                            | card                                                                                 |
| Sidebar        | shipped (SB.\* enterprise upgrade) | badge, button, collapsible, drawer, input, scroll-area, separator; deferred: tooltip |
| AuthForm       | shipped                            | card, input, button, separator                                                       |
| CommandPalette | shipped                            | dialog, combobox, scroll-area, separator                                             |
| Empty          | shipped                            | —                                                                                    |
| PageHeader     | shipped                            | button, breadcrumb                                                                   |
| StatsCard      | shipped                            | card                                                                                 |
| FilterToolbar  | shipped                            | toolbar, input, button, select                                                       |
| DataTable      | shipped                            | table, pagination                                                                    |

## Sidebar block

Enterprise navigation shell — mobile Drawer overlay + desktop persistent column.
Tracked in [Backlog § SB](../../REVIEW_TODO.md#sb-sidebar-enterprise-upgrade);
roadmap step 7.

### Base UI primitive map (SB.1)

Base UI has **no** dedicated app-sidebar primitive. Lexsys `Sidebar` composes
existing primitives:

| Surface                            | Base UI module                   | Lexsys primitive | Role in Sidebar                                                                                                      |
| ---------------------------------- | -------------------------------- | ---------------- | -------------------------------------------------------------------------------------------------------------------- |
| Mobile overlay                     | `@base-ui/react/dialog` (Drawer) | `Drawer`         | Slide-in nav below `md`; `side=left`, swipe-to-close                                                                 |
| Desktop column                     | — (plain layout)                 | —                | Persistent `<aside>` shell; **not** Drawer                                                                           |
| Scrollable nav                     | —                                | `ScrollArea`     | `SidebarContent` viewport                                                                                            |
| Nested groups                      | `@base-ui/react/collapsible`     | `Collapsible`    | Item-level: `SidebarSubList` + `Collapsible`; section-level: `SidebarGroupCollapsible*` (SB.17)                      |
| Icon rail tooltips (planned SB.7+) | `@base-ui/react/tooltip`         | `Tooltip`        | Label hints when `collapsible="icon"`                                                                                |
| Row badges                         | —                                | `Badge`          | `SidebarItemBadge`                                                                                                   |
| Menu selection tokens              | `@base-ui/react/menu`            | `Menu`           | **Not** used for Sidebar nav chrome — Menu checked tokens are for transient overlays, not persistent nav (see SB.11) |

**Rule:** Drawer is mobile-only. Desktop collapse (SB.5) uses CSS width/translate on
the desktop shell — not a second Drawer instance.

### Wrapper audit (SB.2)

| Finding                                                                  | Verdict                                  | Resolution                                            |
| ------------------------------------------------------------------------ | ---------------------------------------- | ----------------------------------------------------- |
| Compound export shape (`Sidebar*` flat named exports)                    | OK — matches CS.4 compound-first         | Keep                                                  |
| `SidebarMobileContext` for drawer close-on-select                        | OK — typed context, not children cloning | Keep                                                  |
| Template drift: sandbox `partitionSidebarChildren` + mobile header strip | Bug — monorepo source behind consumer    | **Shipped SB.3**                                      |
| Nav items used Menu checked tokens (`--lex-menu-item-checked-*`)         | Wrong semantic layer for persistent nav  | **Shipped SB.11** — `--lex-sidebar-item-*`            |
| No `SidebarProvider` / desktop collapse API                              | Missing feature (not a wrapper bug)      | **Shipped SB.5** — `SidebarProvider` + collapse modes |
| `Select` ref asymmetry (CS.4)                                            | Unrelated to Sidebar                     | No Sidebar change                                     |

### Shipped compound tree (today)

```tsx
<SidebarProvider collapsible="icon">
  <DashboardShell>
    <DashboardShellSidebar>
      <Sidebar>
        <SidebarMobileHeader>
          {/* md:hidden strip — SB.3 */}
        </SidebarMobileHeader>
        <SidebarHeader>
          PulseDesk
          <SidebarCollapseTrigger>Toggle sidebar</SidebarCollapseTrigger>
        </SidebarHeader>
        <SidebarContent>
          <SidebarInput aria-label="Filter navigation" placeholder="Filter…" />
          <SidebarGroup>
            <SidebarGroupLabel>Main</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarList>
                <SidebarItem>
                  <SidebarItemLink href="/" active>
                    Dashboard
                  </SidebarItemLink>
                </SidebarItem>
              </SidebarList>
            </SidebarGroupContent>
          </SidebarGroup>
          <SidebarSeparator />
          <SidebarGroup>{/* … */}</SidebarGroup>
        </SidebarContent>
        <SidebarFooter />
        <SidebarTrigger />
        <SidebarRail />
      </Sidebar>
    </DashboardShellSidebar>
    <DashboardShellBody>
      <DashboardShellHeader>Page title</DashboardShellHeader>
      <DashboardShellMain>{/* page */}</DashboardShellMain>
    </DashboardShellBody>
  </DashboardShell>
</SidebarProvider>
```

Nav item active state: **variant A** — subtle background tint + left accent bar
(`--lex-sidebar-item-accent-*`). Tokens: `packages/tokens/src/components/sidebar.ts`
(SB.19). Desktop collapse width/label fade: `--lex-sidebar-transition-*` →
`motion.duration.layout` (target tier **slow** — see [Motion rhythm](../tokens/DESIGN_SYSTEM.md#motion-rhythm-duration-tiers), TOK.8). Mobile drawer overlay:
`motion.duration.overlayEnter` / `overlayExit`, `motion.easing.easeIn` / `easeOut`
(SB.18).

### Enterprise API — locked naming (SB.4)

Inspiration only: [shadcn Sidebar](https://ui.shadcn.com/docs/components/radix/sidebar).
Lexsys naming is fixed:

| shadcn              | Lexsys                                      | Notes                                          |
| ------------------- | ------------------------------------------- | ---------------------------------------------- |
| `SidebarMenu`       | **`SidebarList`**                           | Shipped — `<ul>` nav list                      |
| `SidebarMenuItem`   | **`SidebarItem`**                           | Shipped — `<li>` wrapper                       |
| `SidebarMenuBadge`  | **`SidebarItemBadge`**                      | Shipped SB.7 — row adornment, not shell chrome |
| `SidebarMenuButton` | **`SidebarItemLink` / `SidebarItemButton`** | Shipped — split by element                     |

**Do not use:** `SidebarBadge`, `SidebarMenuBadge`.

**Naming rule:** row-level = `SidebarItem*`; group-level = `SidebarGroup*`; shell-level =
`Sidebar*` / `SidebarProvider`.

#### Layer 0 — context and shell (SB.5 shipped)

| Export                   | Role                                                                       |
| ------------------------ | -------------------------------------------------------------------------- |
| `SidebarProvider`        | Shipped SB.5 — `open`, `collapsed`, `setOpen`, `toggleSidebar`, `isMobile` |
| `useSidebar`             | Shipped SB.5 — triggers outside the aside (header collapse button)         |
| `Sidebar`                | Shipped SB.5 — `side`, `collapsible` (`none` \| `icon` \| `offcanvas`)     |
| `SidebarRail`            | Shipped SB.5 — desktop edge affordance to expand/collapse                  |
| `SidebarTrigger`         | Shipped — mobile drawer open                                               |
| `SidebarCollapseTrigger` | Shipped SB.5 — desktop-only collapse toggle                                |

**Collapse modes:** `none` (fixed width) · `icon` (rail + hidden labels via
`.sidebar-expandable`) · `offcanvas` (panel slides off-canvas). Animation uses
`--lex-sidebar-transition-*` and global motion semantics — not Drawer on desktop.

#### Layer 1 — item chrome (SB.7 / SB.8 shipped)

**One row = one painted shell.** Badge, shortcut, and label share the same
hover/focus chrome — trailing content lives **inside** the link/button, not as a
sibling (matches shadcn `SidebarMenuButton` + trailing badge pattern).

```tsx
<SidebarItem>
  <SidebarItemLink href="/inbox" active>
    <SidebarItemIcon>
      <Inbox />
    </SidebarItemIcon>
    <SidebarExpandable>Inbox</SidebarExpandable>
    <SidebarItemTrailing>
      <SidebarItemBadge variant="neutral">24</SidebarItemBadge>
      <SidebarItemShortcut>⌘K</SidebarItemShortcut>
    </SidebarItemTrailing>
  </SidebarItemLink>
</SidebarItem>
```

| Export                  | Role                                                                           |
| ----------------------- | ------------------------------------------------------------------------------ |
| `SidebarItemIcon`       | Shipped SB.8 — fixed icon slot (`--lex-sidebar-item-icon-size`)                |
| `SidebarItemTrailing`   | Shipped — `ms-auto` cluster for badge + shortcut inside the item shell         |
| `SidebarItemBadge`      | Shipped SB.7 — trailing count; auto `dot` when icon-collapsed on desktop       |
| `SidebarItemAction`     | Shipped SB.8 — row hover action (ghost `Button`; `showOnHover` default `true`) |
| `SidebarItemShortcut`   | Shipped SB.8 — `<kbd>` hint; hidden in icon collapse                           |
| `SidebarGroupAction`    | Shipped SB.8 — ghost `Button` in `SidebarGroupLabel` row                       |
| `SidebarItemAdornments` | **Deprecated** — external sibling; use `SidebarItemTrailing` inside the shell  |

`SidebarItem` layout: `relative flex flex-col items-stretch`; variants in
`Sidebar.variants.ts` — no consumer CSS hacks.

#### Layer 2 — nested nav (SB.9 shipped)

Disclosure rows use `SidebarItemRow variant="disclosure"` so the link lead and
expand trigger share one row shell. Trailing badge/shortcut stay inside the link;
only the chevron sits outside the link cell.

```tsx
<SidebarItem>
  <Collapsible variant="plain" defaultOpen>
    <SidebarItemRow variant="disclosure">
      <SidebarItemLink href="/settings" chrome="disclosureLead" active>
        <SidebarItemIcon>
          <Settings />
        </SidebarItemIcon>
        <SidebarExpandable>Settings</SidebarExpandable>
        <SidebarItemTrailing>
          <SidebarItemBadge>3</SidebarItemBadge>
        </SidebarItemTrailing>
      </SidebarItemLink>
      <SidebarItemExpandTrigger variant="disclosure" open={open} />
    </SidebarItemRow>
    <CollapsiblePanel className="p-0">
      <SidebarSubList>
        <SidebarItem>
          <SidebarSubItemLink href="/settings/profile" active>
            Profile
          </SidebarSubItemLink>
        </SidebarItem>
      </SidebarSubList>
    </CollapsiblePanel>
  </Collapsible>
</SidebarItem>
```

| Export                 | Role                                                           |
| ---------------------- | -------------------------------------------------------------- |
| `SidebarSubList`       | Shipped SB.9 — indented nested `<ul>`; hidden in icon collapse |
| `SidebarSubItemLink`   | Shipped SB.9 — nested `<a>` with extra indent + active chrome  |
| `SidebarSubItemButton` | Shipped SB.9 — nested `<button>` row                           |

Install **`collapsible`** with `sidebar` for expandable item parents (Layer 2) and
section folds (Layer 8).

#### Layer 3 — keyboard a11y (SB.12 shipped)

`SidebarContent` renders a `<nav>` with `onKeyDown` roving focus across
`.lex-sidebar__item` links and buttons (ArrowUp/Down, Home, End). Skips
`disabled` / `aria-disabled` / hidden items.

`SidebarItemLink` and `SidebarSubItemLink` set `aria-current="page"` when
`active` is true.

#### Layer 4 — router-aware active state (SB.13 shipped)

Lexsys does **not** bundle a router. Consumers pass `active` explicitly.
`isSidebarNavActive(pathname, href, options?)` ships with the Sidebar block —
router-agnostic matcher. **Default:** exact pathname match (`end: true`). Pass
`end: false` for section parents that should stay active on nested routes.

**Flat nav (React Router `useLocation`):**

```tsx
import { useLocation } from "react-router-dom"
import {
  isSidebarNavActive,
  SidebarItem,
  SidebarItemIcon,
  SidebarItemLink,
} from "@/components/ui/Sidebar/Sidebar"

const location = useLocation()

<SidebarItem>
  <SidebarItemLink
    href="/billing"
    active={isSidebarNavActive(location.pathname, "/billing")}
  >
    <SidebarItemIcon>
      <CreditCard />
    </SidebarItemIcon>
    <SidebarExpandable>Billing</SidebarExpandable>
  </SidebarItemLink>
</SidebarItem>
```

**Nested section parent (`end: false`) + child (`end: true`):**

```tsx
<SidebarItemLink
  href="/settings"
  active={isSidebarNavActive(location.pathname, "/settings", { end: false })}
>
  Settings
</SidebarItemLink>

<SidebarSubItemLink
  href="/settings/profile"
  active={isSidebarNavActive(location.pathname, "/settings/profile", {
    end: true,
  })}
>
  Profile
</SidebarSubItemLink>
```

**`NavLink` / `useMatch` (optional):** prefer `isSidebarNavActive` for
consistent prefix rules. If you already use `NavLink`, map `isActive` to
`SidebarItemLink` `active` — keep `href` on `SidebarItemLink` for semantics;
avoid nesting two anchors.

**Anti-pattern:** `active={location.pathname === item.path}` breaks for nested
routes and the root path (`"/"` matches everything with loose equality tricks).

#### Layer 5 — disabled + loading rows (SB.14 shipped)

Set `disabled` on `SidebarItem` (inherited by child link/button) or directly on
`SidebarItemLink` / `SidebarItemButton` / sub-item parts. Disabled anchors use
`aria-disabled`, `tabIndex={-1}`, and skip keyboard roving focus.

```tsx
<SidebarItem disabled>
  <SidebarItemLink href="/billing">Billing</SidebarItemLink>
</SidebarItem>
```

Async nav: render `SidebarItemSkeleton` inside `SidebarItem` (icon + label
pulse). Use `indent` for nested `SidebarSubList` placeholders.

| Export                | Role                                   |
| --------------------- | -------------------------------------- |
| `SidebarItemSkeleton` | Shipped SB.14 — per-row loading chrome |

#### Layer 6 — inline nav filter (SB.15 shipped)

`SidebarInput` wraps the `input` primitive — compact `size="sm"` + `variant="ghost"`
defaults, `type="search"`. Place above `SidebarList` inside `SidebarContent` (or in
`SidebarHeader`). Hidden in icon collapse. Consumer filters visible rows in app code.

```tsx
<SidebarContent>
  <SidebarInput
    aria-label="Filter navigation"
    placeholder="Filter…"
    value={query}
    onChange={(event) => setQuery(event.target.value)}
  />
  <SidebarList>{/* filtered items */}</SidebarList>
</SidebarContent>
```

| Export         | Role                                     |
| -------------- | ---------------------------------------- |
| `SidebarInput` | Shipped SB.15 — inline nav search/filter |

**Registry deps (sidebar block):** `badge`, `button`, `collapsible`, `drawer`,
`input`, `scroll-area`, `separator`.

#### Layer 7 — `side="right"` + RTL (SB.16 shipped)

`SidebarProvider` / `Sidebar` accept `side?: "left" | "right"` (default `"left"`).
Shell exposes `data-side` on the root `<aside>`. Right-side offcanvas, drawer
swipe, and desktop border follow `side`. Item chrome uses **logical** spacing
(`start`/`end`, `ms`/`ps`/`border-s`) so `dir="rtl"` on a layout ancestor mirrors
indent, active accent, row actions, and sub-lists without extra props.

```tsx
<SidebarProvider side="right" collapsible="icon">
  <Sidebar>{/* … */}</Sidebar>
</SidebarProvider>

// RTL app shell
<html dir="rtl">
  <SidebarProvider side="left">{/* inline-start accent + sub-indent */}</SidebarProvider>
</html>
```

Active item accent: `before:start-0` (left / inline-start); flips to
`before:end-0` when `data-side="right"`.

#### Layer 8 — collapsible sections (SB.17 shipped)

Fold whole `SidebarGroup` sections (distinct from Layer 2 item-level
`Collapsible` + `SidebarSubList`). Wrap the group in `SidebarGroupCollapsible`;
put `SidebarGroupCollapsibleTrigger` inside `SidebarGroupLabel` (pairs with
`SidebarGroupAction`). Panel wraps `SidebarGroupContent`.

```tsx
<SidebarGroupCollapsible defaultOpen>
  <SidebarGroup>
    <SidebarGroupLabel>
      <SidebarGroupCollapsibleTrigger>Developer</SidebarGroupCollapsibleTrigger>
      <SidebarGroupAction aria-label="Add tool">+</SidebarGroupAction>
    </SidebarGroupLabel>
    <SidebarGroupCollapsiblePanel>
      <SidebarGroupContent>
        <SidebarList>{/* … */}</SidebarList>
      </SidebarGroupContent>
    </SidebarGroupCollapsiblePanel>
  </SidebarGroup>
</SidebarGroupCollapsible>
```

| Export                           | Role                                                            |
| -------------------------------- | --------------------------------------------------------------- |
| `SidebarGroupCollapsible`        | Shipped SB.17 — `Collapsible` root (`variant` fixed to `plain`) |
| `SidebarGroupCollapsibleTrigger` | Shipped SB.17 — group label row toggle + chevron                |
| `SidebarGroupCollapsiblePanel`   | Shipped SB.17 — zero-padding panel for group body               |

#### Layer 9 — section dividers (SB.10 shipped)

`SidebarSeparator` wraps the `separator` primitive — horizontal inset divider
between groups (alternative to `SidebarGroupLabel` headers). Place inside
`SidebarContent`, `SidebarHeader`, or `SidebarFooter`.

```tsx
<SidebarContent>
  <SidebarGroup>{/* Main */}</SidebarGroup>
  <SidebarSeparator />
  <SidebarGroup>{/* Account */}</SidebarGroup>
</SidebarContent>
```

| Export             | Role                                             |
| ------------------ | ------------------------------------------------ |
| `SidebarSeparator` | Shipped SB.10 — inset horizontal section divider |

#### DashboardShell + Sidebar (SB.10 shipped)

`DashboardShell` is the installable layout template for app shells. Wrap
`Sidebar` in `DashboardShellSidebar`; place page chrome in `DashboardShellBody`.
Enterprise desktop collapse: wrap the shell in `SidebarProvider` and place
`SidebarCollapseTrigger` in `SidebarHeader` (see compound tree above).

| Export                  | Role                                |
| ----------------------- | ----------------------------------- |
| `DashboardShell`        | Root flex shell (`md:flex-row`)     |
| `DashboardShellSidebar` | Slot for `Sidebar` block            |
| `DashboardShellBody`    | Column for header + scrollable main |
| `DashboardShellHeader`  | Top bar inside main column          |
| `DashboardShellMain`    | Page content viewport               |

---

## Template catalog

| Template           | Status  | Depends on                  |
| ------------------ | ------- | --------------------------- |
| DashboardShell     | shipped | sidebar                     |
| SettingsPageLayout | shipped | settings-panel, page-header |
| DocsLayout         | planned | —                           |

Pilot blocks and `DashboardShell` are installable and **stable** after the BO.1–BO.7
pass (CI install smoke + render tests). Narrow-viewport sandbox QA remains manual —
see [Testing docs § Consumer sandbox verification](../../operations/TESTING.md#consumer-sandbox-verification).

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
`pnpm registry:check`. See [Registry reference](../registry/REGISTRY.md).

---

## Compound-first contract

Every installable surface uses **named compound parts** that compose like LEGO.
Consumers assemble Lexsys parts only — not raw `div` / `label` / `onChange` soup
when a Lexsys part exists.

### Architecture rules

1. **Primitive with Base UI parts** → flat named sibling exports + `displayName`
   on each part ([UI reference](../ui/UI.md) wrapper checklist).
2. **Lexsys-only layout primitive** (Card, Alert) → same named-export pattern.
3. **True atom** (single DOM node, no slots) → leaf OK: `Button`, `ButtonLink`,
   `Input`, `Badge`, `Separator`, `Form`, `Toggle`, `Menubar`.
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

### Link hosts (Button, DrawerClose)

Base UI `Button` and `DrawerClose` default to `nativeButton={true}` — they expect a
`<button>` host. When `render` points at an anchor or framework `Link`, set
`nativeButton={false}` (or use Lexsys helpers that already do).

| Pattern                         | Host        | Lexsys helper / fix                                      |
| ------------------------------- | ----------- | -------------------------------------------------------- |
| Profile nav in app chrome       | Next `Link` | `ButtonLink` or `Button` + `nativeButton={false}`        |
| Mobile sidebar row              | `<a>`       | `SidebarItemLink` (sets `nativeButton={false}` on close) |
| Drawer dismiss on custom anchor | `<a>`       | `DrawerClose` + `nativeButton={false}` + `render={<a>}`  |

**Preferred — `ButtonLink`** (`lexsys add button button-link` — `button-link` reuses `Button` variant tokens):

```tsx
import { ButtonLink } from "@/components/ui/ButtonLink/ButtonLink"
;<ButtonLink href="/profile" variant="outline">
  Profile
</ButtonLink>
```

Default host is a plain `<a>`. For Next.js App Router prefetch, override `render`:

```tsx
import Link from "next/link"
import { ButtonLink } from "@/components/ui/ButtonLink/ButtonLink"
;<ButtonLink href="/profile" render={<Link href="/profile" />}>
  Profile
</ButtonLink>
```

**Manual `Button` + `Link`** (same contract, more typing):

```tsx
import Link from "next/link"
import { Button } from "@/components/ui/Button/Button"
;<Button nativeButton={false} render={<Link href="/profile" />}>
  Profile
</Button>
```

**`DrawerClose` + anchor** — always pair `appearance="inline"` with
`nativeButton={false}` when `render` is `<a>` or `Link`:

```tsx
<DrawerClose
  appearance="inline"
  nativeButton={false}
  render={<a href="/settings" />}
>
  Settings
</DrawerClose>
```

### Breaking migration (compound-first track)

Tracked in [Roadmap § M11](./ROADMAP.md#m11-compound-first-api). After
implementation, touched registry items bump to **`0.0.2`**.

| Old API                                       | New API                                                                                |
| --------------------------------------------- | -------------------------------------------------------------------------------------- |
| `<Sidebar items={[…]} />`                     | `<Sidebar><SidebarContent><SidebarGroup>…</SidebarGroup></SidebarContent></Sidebar>`   |
| `<CommandPalette items={[…]} onSelect={…} />` | compound `CommandPaletteItem` children                                                 |
| `<AuthForm mode="login" onSubmit={…} />`      | `<AuthForm><AuthFormHeader>…</AuthFormHeader><Field>…</Field></AuthForm>`              |
| `<FormField label="Email" … />`               | `<FormField><FormFieldLabel>…</FormFieldLabel><FormFieldControl /></FormField>`        |
| `<DashboardShell sidebarItems={[…]} />`       | `<DashboardShell><DashboardShellSidebar><Sidebar>…</Sidebar></DashboardShellSidebar>…` |

Execution queue: [Backlog § UC.7](../../REVIEW_TODO.md#ui-composition-primitives-blocks-templates).

---

## Registry vs consumer config

| Concern                  | Where                                            |
| ------------------------ | ------------------------------------------------ |
| Layer dependencies       | `registryDependencies` in registry item metadata |
| What is installed        | `installed` map in `lexsys.config.json`          |
| Install path per item    | `target` → `src/components/ui/<CanonicalName>`   |
| Components root override | `paths.components` in `lexsys.config.json`       |

No `installedBy` / provenance graph. Uninstall uses registry graph + remaining
`installed` keys (see [CLI reference § uninstall](../cli/CLI.md)).

---

## Current state

Installable inventory (**58** items — compound vs leaf, named exports, registry
version): **[UI catalog](../ui/UI_CATALOG.md)**.

Pilot blocks and templates remain installable; stability and sandbox QA gaps are
tracked in [Backlog § Blocks/templates optimization](../../REVIEW_TODO.md#blocks-templates-optimization-backlog).

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

See [CLI reference](../cli/CLI.md) for `lexsys.config.json` (`paths.components`, aliases).

---

## Verification

| Layer              | Primary surface            |
| ------------------ | -------------------------- |
| Primitives         | Monorepo playground (~20%) |
| Blocks + templates | Consumer sandbox (~80%)    |

Workflow: edit `packages/ui` → `pnpm registry:sync` (templates + reconciled `src/items/`) → `lexsys update` in sandbox — never hand-edit registry templates or installed consumer source.

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

| Step | Work                                                      | Status                                                                       |
| ---- | --------------------------------------------------------- | ---------------------------------------------------------------------------- |
| 1    | Layer docs + registry validators                          | shipped                                                                      |
| 2    | Monorepo `primitives/blocks/templates` + flat CLI install | shipped                                                                      |
| 3    | Pilot blocks + template + sandbox verify                  | shipped                                                                      |
| 4    | Blocks/templates optimization pass (BO.1–BO.7)            | shipped                                                                      |
| 5    | Additional blocks/templates beyond pilot set              | planned                                                                      |
| 6    | Base UI primitive expansion (9 modules above)             | shipped                                                                      |
| 7    | Sidebar enterprise upgrade (SB.1–SB.20)                   | shipped — [Backlog § SB](../../REVIEW_TODO.md#sb-sidebar-enterprise-upgrade) |

Tracked in [Backlog § UI composition](../../REVIEW_TODO.md#ui-composition-primitives-blocks-templates).

---

## Non-goals

- Registry items for product-specific pages
- Replacing primitives with blocks-only workflows
- Consumer folder layout mirroring monorepo layer depth by default
- `installedBy` provenance in consumer config
- Hand-written token CSS

---

## Related documentation

- [UI catalog](UI_CATALOG.md) — installable inventory (compound/leaf, exports)
- [Registry reference](../registry/REGISTRY.md) — item metadata contract
- [CLI reference](../cli/CLI.md) — install and config
- [UI reference](UI.md) — component contract
