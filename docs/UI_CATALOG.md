# UI Installable Catalog

**Audience:** Maintainers, contributors, and agents  
**Type:** Catalog / inventory  
**Source of truth for:** Installable surface inventory — compound vs leaf, named exports, registry version  
**Verified against:** `packages/ui/src/components/`, `packages/registry/src/items/`  
**Related docs:** [UI.md](./UI.md) (leaf decision tree), [UI_COMPOSITION.md](./UI_COMPOSITION.md) (composition rules), [UI_AUDIT.md](./UI_AUDIT.md) (variant compliance), [REGISTRY.md](./REGISTRY.md) (item contract)

---

## Purpose and scope

This catalog answers: **what is installable, compound or leaf, what exports exist, and what registry version ships.**

- **Rules** (when to use compound vs leaf) → [UI.md](./UI.md), [UI_COMPOSITION.md](./UI_COMPOSITION.md)
- **Variant compliance** → [UI_AUDIT.md](./UI_AUDIT.md)
- **Registry item fields** → [REGISTRY.md](./REGISTRY.md)

Out of scope here: page-level consumer code, playground-only demos, unpublished internal utilities.

---

## Inventory

<!-- CATALOG:BEGIN -->

_Generated 2026-05-24 — do not edit by hand. Run `pnpm ui:audit:catalog:write` from repo root._

### Primitives (41)

| Component          | Style    | Named exports                                                        | Registry          | Version |
| ------------------ | -------- | -------------------------------------------------------------------- | ----------------- | ------- |
| **Accordion**      | compound | `Accordion, AccordionItem, AccordionHeader, … (+2)`                  | `accordion`       | 0.0.1   |
| **Alert**          | compound | `Alert, AlertTitle, AlertDescription`                                | `alert`           | 0.0.1   |
| **AlertDialog**    | compound | `AlertDialog, AlertDialogTrigger, AlertDialogPortal, … (+6)`         | `alert-dialog`    | 0.0.1   |
| **Autocomplete**   | compound | `Autocomplete, AutocompleteTrigger, AutocompleteInputGroup, … (+20)` | `autocomplete`    | 0.0.2   |
| **Avatar**         | compound | `Avatar, AvatarImage, AvatarFallback`                                | `avatar`          | 0.0.1   |
| **Badge**          | leaf     | `Badge`                                                              | `badge`           | 0.0.1   |
| **Button**         | leaf     | `Button`                                                             | `button`          | 0.0.1   |
| **Card**           | compound | `Card, CardHeader, CardTitle, … (+3)`                                | `card`            | 0.0.1   |
| **Checkbox**       | compound | `Checkbox, CheckboxIndicator`                                        | `checkbox`        | 0.0.2   |
| **CheckboxGroup**  | leaf     | `CheckboxGroup`                                                      | `checkbox-group`  | 0.0.1   |
| **Collapsible**    | compound | `Collapsible, CollapsibleTrigger, CollapsiblePanel`                  | `collapsible`     | 0.0.1   |
| **Combobox**       | compound | `Combobox, ComboboxLabel, ComboboxTrigger, … (+25)`                  | `combobox`        | 0.0.2   |
| **ContextMenu**    | compound | `ContextMenu, ContextMenuTrigger, ContextMenuPortal, … (+16)`        | `context-menu`    | 0.0.1   |
| **Dialog**         | compound | `Dialog, DialogTrigger, DialogPortal, … (+6)`                        | `dialog`          | 0.0.1   |
| **Drawer**         | compound | `Drawer, DrawerProvider, DrawerIndentBackground, … (+13)`            | `drawer`          | 0.0.2   |
| **Field**          | compound | `Field, FieldLabel, FieldControl, … (+4)`                            | `field`           | 0.0.1   |
| **Fieldset**       | compound | `Fieldset, FieldsetLegend`                                           | `fieldset`        | 0.0.1   |
| **Form**           | leaf     | `Form`                                                               | `form`            | 0.0.1   |
| **Input**          | leaf     | `Input`                                                              | `input`           | 0.0.1   |
| **Menu**           | compound | `Menu, MenuTrigger, MenuPortal, … (+18)`                             | `menu`            | 0.0.2   |
| **Menubar**        | leaf     | `Menubar`                                                            | `menubar`         | 0.0.1   |
| **Meter**          | compound | `Meter, MeterTrack, MeterIndicator, … (+2)`                          | `meter`           | 0.0.1   |
| **NavigationMenu** | compound | `NavigationMenu, NavigationMenuList, NavigationMenuItem, … (+10)`    | `navigation-menu` | 0.0.1   |
| **NumberField**    | compound | `NumberField, NumberFieldGroup, NumberFieldInput, … (+4)`            | `number-field`    | 0.0.1   |
| **OtpField**       | compound | `OtpField, OtpFieldInput, OtpFieldSeparator`                         | `otp-field`       | 0.0.1   |
| **Popover**        | compound | `Popover, PopoverTrigger, PopoverPortal, … (+8)`                     | `popover`         | 0.0.1   |
| **PreviewCard**    | compound | `PreviewCard, PreviewCardTrigger, PreviewCardPortal, … (+6)`         | `preview-card`    | 0.0.1   |
| **Progress**       | compound | `Progress, ProgressLabel, ProgressTrack, … (+2)`                     | `progress`        | 0.0.2   |
| **RadioGroup**     | compound | `RadioGroup, RadioGroupItem`                                         | `radio-group`     | 0.0.1   |
| **ScrollArea**     | compound | `ScrollArea, ScrollAreaViewport, ScrollAreaContent, … (+4)`          | `scroll-area`     | 0.0.1   |
| **Select**         | compound | `Select, SelectLabel, SelectTrigger, … (+15)`                        | `select`          | 0.0.1   |
| **Separator**      | leaf     | `Separator`                                                          | `separator`       | 0.0.1   |
| **Slider**         | compound | `Slider, SliderControl, SliderTrack, … (+4)`                         | `slider`          | 0.0.2   |
| **Switch**         | compound | `Switch, SwitchThumb`                                                | `switch`          | 0.0.2   |
| **Tabs**           | compound | `Tabs, TabsList, TabsTab, TabsPanel`                                 | `tabs`            | 0.0.1   |
| **Textarea**       | leaf     | `Textarea`                                                           | `textarea`        | 0.0.1   |
| **Toast**          | compound | `ToastProvider, ToastPortal, ToastViewport, … (+10)`                 | `toast`           | 0.0.1   |
| **Toggle**         | leaf     | `Toggle`                                                             | `toggle`          | 0.0.1   |
| **ToggleGroup**    | leaf     | `ToggleGroup`                                                        | `toggle-group`    | 0.0.1   |
| **Toolbar**        | compound | `Toolbar, ToolbarGroup, ToolbarButton, … (+3)`                       | `toolbar`         | 0.0.1   |
| **Tooltip**        | compound | `Tooltip, TooltipTrigger, TooltipPortal, … (+3)`                     | `tooltip`         | 0.0.1   |

### Blocks (5)

| Component          | Style    | Named exports                                                        | Registry          | Version |
| ------------------ | -------- | -------------------------------------------------------------------- | ----------------- | ------- |
| **AuthForm**       | compound | `AuthForm, AuthFormHeader, AuthFormContent, … (+2)`                  | `auth-form`       | 0.0.2   |
| **CommandPalette** | compound | `CommandPalette, CommandPaletteContent, CommandPaletteTitle, … (+8)` | `command-palette` | 0.0.2   |
| **FormField**      | compound | `FormField, FormFieldItem, FormFieldLabel, … (+3)`                   | `form-field`      | 0.0.2   |
| **SettingsPanel**  | compound | `SettingsPanel, SettingsPanelHeader, SettingsPanelTitle, … (+3)`     | `settings-panel`  | 0.0.2   |
| **Sidebar**        | compound | `Sidebar, SidebarHeader, SidebarContent, … (+10)`                    | `sidebar`         | 0.0.2   |

### Templates (1)

| Component          | Style    | Named exports                                                         | Registry          | Version |
| ------------------ | -------- | --------------------------------------------------------------------- | ----------------- | ------- |
| **DashboardShell** | compound | `DashboardShell, DashboardShellSidebar, DashboardShellHeader, … (+2)` | `dashboard-shell` | 0.0.2   |

**Leaf policy:** only components listed in [UI.md § Intentional leaves](./UI.md#compound-vs-leaf-decision-tree) with a single part export. All blocks and templates are compound-only.

<!-- CATALOG:END -->

---

## Out of scope / planned

| Item                             | Status       | Notes                                         |
| -------------------------------- | ------------ | --------------------------------------------- |
| CommandPalette → Combobox wiring | planned      | M11 Phase 4b — block uses internal list today |
| Creator / export tooling docs    | planned      | See [ROADMAP.md](./ROADMAP.md)                |
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

## Related docs

- [INDEX.md](./INDEX.md) — documentation routing
- [UI.md § Compound vs leaf decision tree](./UI.md#compound-vs-leaf-decision-tree)
- [UI_COMPOSITION.md § Compound-first contract](./UI_COMPOSITION.md#compound-first-contract)
