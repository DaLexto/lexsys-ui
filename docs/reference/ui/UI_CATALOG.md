# UI Installable Catalog

**Audience:** Maintainers, contributors, and agents  
**Type:** Catalog / inventory  
**Source of truth for:** Installable surface inventory — compound vs leaf, named exports, registry item name  
**Verified against:** `packages/ui/src/components/`, `packages/registry/src/items/`  
**Last reviewed:** 2026-05-30

---

## On this page

- [Purpose and scope](#purpose-and-scope)
- [Inventory](#inventory)
  - [Primitives (41)](#primitives-41)
  - [Blocks (6)](#blocks-6)
  - [Templates (1)](#templates-1)
- [Out of scope / planned](#out-of-scope-planned)
- [Generation and drift checks](#generation-and-drift-checks)

## Purpose and scope

This catalog answers: **what is installable, compound or leaf, what exports exist, and which registry item installs it.**

- **Rules** (when to use compound vs leaf) → [UI reference](../ui/UI.md), [UI composition](../ui/UI_COMPOSITION.md)
- **Variant compliance** → [UI audit](../ui/UI_AUDIT.md)
- **Registry item fields** → [Registry reference](../registry/REGISTRY.md)

Out of scope here: page-level consumer code, playground-only demos, unpublished internal utilities.

---

## Inventory

<!-- CATALOG:BEGIN -->

_Generated 2026-05-30 — do not edit by hand. Run `pnpm ui:audit:catalog:write` from repo root._

### Primitives (42)

| Component          | Style    | Named exports                                                        | Registry          |
| ------------------ | -------- | -------------------------------------------------------------------- | ----------------- |
| **Accordion**      | compound | `Accordion, AccordionItem, AccordionHeader, … (+2)`                  | `accordion`       |
| **Alert**          | compound | `Alert, AlertTitle, AlertDescription`                                | `alert`           |
| **AlertDialog**    | compound | `AlertDialog, AlertDialogTrigger, AlertDialogPortal, … (+6)`         | `alert-dialog`    |
| **Autocomplete**   | compound | `Autocomplete, AutocompleteTrigger, AutocompleteInputGroup, … (+20)` | `autocomplete`    |
| **Avatar**         | compound | `Avatar, AvatarImage, AvatarFallback`                                | `avatar`          |
| **Badge**          | leaf     | `Badge`                                                              | `badge`           |
| **Button**         | leaf     | `Button`                                                             | `button`          |
| **Card**           | compound | `Card, CardHeader, CardTitle, … (+4)`                                | `card`            |
| **Checkbox**       | compound | `Checkbox, CheckboxIndicator`                                        | `checkbox`        |
| **CheckboxGroup**  | leaf     | `CheckboxGroup`                                                      | `checkbox-group`  |
| **Collapsible**    | compound | `Collapsible, CollapsibleTrigger, CollapsiblePanel`                  | `collapsible`     |
| **Combobox**       | compound | `Combobox, ComboboxLabel, ComboboxTrigger, … (+25)`                  | `combobox`        |
| **ContextMenu**    | compound | `ContextMenu, ContextMenuTrigger, ContextMenuPortal, … (+16)`        | `context-menu`    |
| **Dialog**         | compound | `Dialog, DialogTrigger, DialogPortal, … (+6)`                        | `dialog`          |
| **Drawer**         | compound | `Drawer, DrawerProvider, DrawerIndentBackground, … (+13)`            | `drawer`          |
| **Field**          | compound | `Field, FieldLabel, FieldControl, … (+4)`                            | `field`           |
| **Fieldset**       | compound | `Fieldset, FieldsetLegend`                                           | `fieldset`        |
| **Form**           | leaf     | `Form`                                                               | `form`            |
| **Input**          | leaf     | `Input`                                                              | `input`           |
| **Menu**           | compound | `Menu, MenuTrigger, MenuPortal, … (+18)`                             | `menu`            |
| **Menubar**        | leaf     | `Menubar`                                                            | `menubar`         |
| **Meter**          | compound | `Meter, MeterTrack, MeterIndicator, … (+2)`                          | `meter`           |
| **NavigationMenu** | compound | `NavigationMenu, NavigationMenuList, NavigationMenuItem, … (+10)`    | `navigation-menu` |
| **NumberField**    | compound | `NumberField, NumberFieldGroup, NumberFieldInput, … (+4)`            | `number-field`    |
| **OtpField**       | compound | `OtpField, OtpFieldInput, OtpFieldSeparator`                         | `otp-field`       |
| **Popover**        | compound | `Popover, PopoverTrigger, PopoverPortal, … (+8)`                     | `popover`         |
| **PreviewCard**    | compound | `PreviewCard, PreviewCardTrigger, PreviewCardPortal, … (+6)`         | `preview-card`    |
| **Progress**       | compound | `Progress, ProgressLabel, ProgressTrack, … (+2)`                     | `progress`        |
| **RadioGroup**     | compound | `RadioGroup, RadioGroupItem`                                         | `radio-group`     |
| **ScrollArea**     | compound | `ScrollArea, ScrollAreaViewport, ScrollAreaContent, … (+4)`          | `scroll-area`     |
| **Select**         | compound | `Select, SelectLabel, SelectTrigger, … (+15)`                        | `select`          |
| **Separator**      | leaf     | `Separator`                                                          | `separator`       |
| **Slider**         | compound | `Slider, SliderControl, SliderTrack, … (+4)`                         | `slider`          |
| **Switch**         | compound | `Switch, SwitchThumb`                                                | `switch`          |
| **Table**          | compound | `Table, TableHeader, TableBody, … (+5)`                              | `table`           |
| **Tabs**           | compound | `Tabs, TabsList, TabsTab, TabsPanel`                                 | `tabs`            |
| **Textarea**       | leaf     | `Textarea`                                                           | `textarea`        |
| **Toast**          | compound | `ToastProvider, ToastPortal, ToastViewport, … (+10)`                 | `toast`           |
| **Toggle**         | leaf     | `Toggle`                                                             | `toggle`          |
| **ToggleGroup**    | leaf     | `ToggleGroup`                                                        | `toggle-group`    |
| **Toolbar**        | compound | `Toolbar, ToolbarGroup, ToolbarButton, … (+3)`                       | `toolbar`         |
| **Tooltip**        | compound | `Tooltip, TooltipTrigger, TooltipPortal, … (+3)`                     | `tooltip`         |

### Blocks (6)

| Component          | Style    | Named exports                                                        | Registry          |
| ------------------ | -------- | -------------------------------------------------------------------- | ----------------- |
| **AuthForm**       | compound | `AuthForm, AuthFormHeader, AuthFormContent, … (+2)`                  | `auth-form`       |
| **CommandPalette** | compound | `CommandPalette, CommandPaletteContent, CommandPaletteTitle, … (+8)` | `command-palette` |
| **Empty**          | compound | `Empty, EmptyHeader, EmptyMedia, … (+3)`                             | `empty`           |
| **FormField**      | compound | `FormField, FormFieldItem, FormFieldLabel, … (+3)`                   | `form-field`      |
| **SettingsPanel**  | compound | `SettingsPanel, SettingsPanelHeader, SettingsPanelTitle, … (+3)`     | `settings-panel`  |
| **Sidebar**        | compound | `Sidebar, SidebarHeader, SidebarContent, … (+10)`                    | `sidebar`         |

### Templates (1)

| Component          | Style    | Named exports                                                         | Registry          |
| ------------------ | -------- | --------------------------------------------------------------------- | ----------------- |
| **DashboardShell** | compound | `DashboardShell, DashboardShellSidebar, DashboardShellHeader, … (+2)` | `dashboard-shell` |

**Leaf policy:** only components listed in [UI.md § Intentional leaves](./UI.md#compound-vs-leaf-decision-tree) with a single part export. All blocks and templates are compound-only.

<!-- CATALOG:END -->

---

## Out of scope / planned

| Item                             | Status       | Notes                                         |
| -------------------------------- | ------------ | --------------------------------------------- |
| CommandPalette → Combobox wiring | planned      | M11 Phase 4b — block uses internal list today |
| Creator / export tooling docs    | planned      | See [Roadmap](./ROADMAP.md)                   |
| Page-level consumer layouts      | out of scope | Sandbox-owned; not registry items             |

---

## Generation and drift checks

From repository root:

```bash
pnpm ui:audit:catalog:check   # fail if catalog region drifted from code
pnpm ui:audit:catalog:write   # refresh generated tables in this file
```

`pnpm ui:audit` runs variant compliance **and** catalog check.

---

## Related documentation

- [UI reference](../ui/UI.md) — leaf decision tree and component contract
- [UI composition](../ui/UI_COMPOSITION.md) — composition rules (not inventory)
- [UI audit](../ui/UI_AUDIT.md) — variant compliance
- [Registry reference](../registry/REGISTRY.md) — item contract
