# Lexsys Design System

**Audience:** Maintainers and contributors  
**Type:** Conceptual model + domain specification  
**Source of truth for:** Design system structure, token layers, CSS output contract, component styling model  
**Verified against:** `packages/tokens/src/`, `packages/ui/src/`

Canonical token layer rules live in [Tokens reference](TOKENS.md).  
CLI install behavior lives in [CLI reference](CLI.md).  
Full system shape lives in [Architecture](ARCHITECTURE.md).

---

## What Lexsys is as a design system

Lexsys is a **token-driven, registry-first component system** for React + Tailwind v4.

The styling pipeline:

```txt
Token source (TypeScript)
  ↓ build
Generated CSS (tokens.css + theme.css)
  ↓ installed into consumer project
Consumer project
  ↓ Tailwind utilities + component variants
User's UI
```

Components consume design values through generated CSS variables, not raw color
or spacing literals. Users interact with Tailwind utilities and component
`variant` props. The token layer remains invisible to users unless they need to
override it.

---

## Token system

### Layer order

```txt
primitives → brand → semantics → components
                ↑
           themes override semantics per mode
```

Presets are configuration only — they are not a token layer and do not
participate in resolution.

### Primitives

Raw values: no references, no product meaning.

**18 active primitive groups:**

| Group           | Purpose                                                                                |
| --------------- | -------------------------------------------------------------------------------------- |
| `color`         | Full color scale (neutrals, blue, green, red, orange, purple, yellow, white, black, …) |
| `radius`        | Border radius scale (none → full)                                                      |
| `spacing`       | Spacing scale                                                                          |
| `size`          | Size/dimension scale for controls                                                      |
| `fontFamily`    | Font stack definitions                                                                 |
| `fontSize`      | Font size scale                                                                        |
| `fontWeight`    | Weight values                                                                          |
| `lineHeight`    | Line height scale                                                                      |
| `letterSpacing` | Tracking values                                                                        |
| `motion`        | Duration and easing raw values                                                         |
| `aspectRatio`   | Aspect ratio scale                                                                     |
| `blur`          | Blur values                                                                            |
| `border`        | Border width values                                                                    |
| `breakpoint`    | Responsive breakpoints                                                                 |
| `opacity`       | Opacity scale                                                                          |
| `outline`       | Outline width/offset values                                                            |
| `shadow`        | Shadow definitions                                                                     |
| `zIndex`        | z-index scale                                                                          |

Primitive token source: `packages/tokens/src/primitives/`.

### Brand

Brand tokens reference primitives and express brand identity without usage intent.

**Active brands:** `lexsys`

```typescript
// packages/tokens/src/brand/lexsys.brand.ts
lexsysBrand.color.primary.base  → "{color.orange.500}"
lexsysBrand.color.accent.base   → "{color.blue.500}"
```

Brand tokens MUST NOT contain component-specific names (e.g. `buttonBackground`).  
Keep brand color sets intentionally small (6–8 tokens per brand color).

Brand source: `packages/tokens/src/brand/`.

### Semantics

Semantic tokens assign product meaning. They reference brand tokens for
brand-specific values and primitive tokens for non-brand values.

**11 active semantic groups:**

| Group        | Roles                                                                                                                                                                                                          |
| ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `color`      | `background` (base, surface, subtle, overlay), `text` (primary, secondary, disabled, inverse, link, accent), `feedback` (info/success/warning/danger × background/foreground)                                  |
| `action`     | Interactive state colors: `primary`, `secondary`, `danger` × base/hover/active/disabled                                                                                                                        |
| `border`     | `default`, `strong`, `focus`, `accent`                                                                                                                                                                         |
| `elevation`  | Overlay stacking and shadow roles: `backdrop`, `layer`, `floating`, `toast`, `tooltip`, `shadow` (maps from primitive `z-index.*` and `shadow.*`)                                                              |
| `radius`     | `control`, `selection`, `surface`, `pill`                                                                                                                                                                      |
| `spacing`    | Semantic spacing roles                                                                                                                                                                                         |
| `size`       | Reusable sizing roles (`control`, `selectionControl`, `selectionIndicator`, `area`, `track`, `thumb`) — not component names                                                                                    |
| `motion`     | Duration and easing semantic roles                                                                                                                                                                             |
| `typography` | Font scale semantic roles                                                                                                                                                                                      |
| `outline`    | Focus and state ring roles: `width` (focus, inset, zero), `offset` (focus, zero) — maps from primitive `outline.width.*` and `outline.offset.*`                                                                |
| `layout`     | Responsive layout roles: `viewport` (`sm`–`2xl`, aligned with breakpoint scale), `aspectRatio` (square, standard, photo, portrait, video, ultrawide) — maps from primitive `breakpoint.*` and `aspect-ratio.*` |

Semantic path structure:

- `color.*` — global background, text, and feedback roles
- `action.*` — interactive state colors (not nested under `color`)
- `border.*` — border color roles (not nested under `color`)
- `elevation.*` — stacking and shadow roles (not nested under `color`; components must not reference primitive `z-index.*` or `shadow.*` directly)
- `outline.*` — focus ring width and offset roles (components use these for `focus.ringWidth` / `focus.ringOffset`; do not hardcode Tailwind `ring-2` / `ring-offset-2`)
- `layout.*` — viewport breakpoint and aspect ratio roles (consumers must not reference primitive `breakpoint.*` or `aspect-ratio.*` directly)

Semantic source: `packages/tokens/src/semantics/`.

### Components

Component tokens reference semantic tokens and describe per-component slot
decisions.

**32 dedicated component token files** (41 primitives total — newer Base UI modules inherit semantic tokens until dedicated component slots land):

Accordion, Alert, AlertDialog, Avatar, Badge, Button, Card, Checkbox,
Collapsible, Dialog, Drawer, Field, Fieldset, Form, Input, Menu, Meter,
NumberField, Popover, Progress, RadioGroup, ScrollArea, Separator, Select,
Slider, Switch, Tabs, Textarea, Toast, Toggle, ToggleGroup, Tooltip.

```typescript
// packages/tokens/src/components/button.ts — example slot pattern
buttonComponentTokens.primary.background  → "{action.primary.base}"
buttonComponentTokens.radius              → "{radius.control}"
buttonComponentTokens.focus.ringColor     → "{border.focus}"

// packages/tokens/src/components/dialog.ts — overlay elevation pattern
dialogComponentTokens.backdrop.zIndex     → "{elevation.backdrop.zIndex}"
dialogComponentTokens.popup.shadow        → "{elevation.shadow.raised}"
```

Component source: `packages/tokens/src/components/`.

### Themes

Themes override semantic values per mode. They are not a fifth token layer.

**Active themes:**

| Theme              | Selector | Brand    |
| ------------------ | -------- | -------- |
| `lexsysLightTheme` | `:root`  | `lexsys` |
| `lexsysDarkTheme`  | `.dark`  | `lexsys` |

Theme files reference brand tokens for brand-specific values and primitive
tokens for neutrals and non-brand values. Themes MUST NOT reference component
tokens.

Theme source: `packages/tokens/src/themes/lexsys/`.

### Presets

Presets are configuration — they select which brand, theme modes, and output
combinations to build. They do not hold token values and are not in the
resolution chain.

**Active preset:** `lexsys` / "Lexsys Default"

```typescript
lexsysPreset = {
  id: "lexsys",
  name: "Lexsys Default",
  brand: "lexsys",
  themeModes: ["light", "dark"],
  defaultTheme: "light",
}
```

`default` is the only public CLI style alias today and it resolves to this
preset. The preset-selection API is internal and evolving.

Preset source: `packages/tokens/src/presets/`.

---

## Token authoring

### File structure

Tokens are authored as TypeScript object trees. Each token leaf uses DTCG-shaped
`$value` authoring:

```typescript
// Token leaf
{ $value: "{color.orange.500}" }
{ $value: { value: 16, unit: "px" } }
{ $value: { colorSpace: "oklch", components: [0.7, 0.15, 30], hex: "#f97316" } }

// Branch with type annotation
radius: {
  $type: "dimension",
  control: { $value: "{radius.md}" },
}
```

Supported metadata: `$value`, `$type`, `$description`, `$deprecated`.

### Reference syntax

References use `{dotted.path}` strings:

```typescript
{
  $value: "{brand.color.primary.base}"
} // brand token
{
  $value: "{action.primary.base}"
} // semantic token
{
  $value: "{color.neutral.900}"
} // primitive token
```

The `--lex-` prefix belongs to output generation only. Never use it in token
source files.

### Token types

**Scalar** (single CSS property): `color`, `dimension`, `number`, `duration`,
`cubicBezier`, `fontFamily`, `fontWeight`, `strokeStyle`, `asset`, `string`,
and Lexsys aliases `fontSize`, `lineHeight`, `letterSpacing`.

**Composite** (structured objects): `typography`, `border`, `shadow`,
`transition`, `blur`, `gradient` — reserved, not all generator paths implemented.

**Color values** support either a string reference or a structured object:

```typescript
{ colorSpace: "oklch" | "srgb" | "display-p3", components: number[], alpha?: number, hex?: string }
```

---

## CSS output

### Variable naming

CSS variables follow `--lex-<token-path>` with dots replaced by dashes.
Group name overrides apply at generation time:

| Source name       | CSS name segment |
| ----------------- | ---------------- |
| `spacing`         | `space`          |
| `motion-duration` | `duration`       |
| `motion-easing`   | `easing`         |

Examples:

- `action.primary.base` → `--lex-action-primary-base`
- `radius.control` → `--lex-radius-control`
- `spacing.control.x.md` → `--lex-space-control-x-md`

### Tailwind `@theme`

The generator also produces a Tailwind `@theme` block that maps CSS variables
into Tailwind's design token namespaces:

| Token source prefix | Tailwind namespace |
| ------------------- | ------------------ |
| `color`             | `color`            |
| `duration`          | `duration`         |
| `easing`            | `ease`             |
| `radius`            | `radius`           |
| `size`              | `spacing`          |
| `space`             | `spacing`          |
| `typography`        | `text`             |

This lets consumers use e.g. `text-nx-body-md` or `radius-nx-control` from
Tailwind utilities.

Semantic groups without a mapped namespace (including `layout`, `action`,
`border`, `elevation`, and `outline`) still appear in `@theme` as
`--lex-<token-path>` entries that reference the same `:root` CSS variables.
They are not remapped into Tailwind namespaces such as `breakpoint` or
`aspect`.

### Output files

**Package (`dist/`):**

| File                                        | Contents                                                                                      |
| ------------------------------------------- | --------------------------------------------------------------------------------------------- |
| `dist/tokens.css`                           | All token variables in `:root`                                                                |
| `dist/theme.css`                            | Theme mode overrides (`:root` for light, `.dark` for dark) and Tailwind `@theme inline` block |
| `dist/tokens/dtcg/tokens.tokens.json`       | Full merged DTCG JSON                                                                         |
| `dist/tokens/dtcg/primitives/*.tokens.json` | Per-group primitive DTCG JSON                                                                 |
| `dist/tokens/dtcg/brand/*.tokens.json`      | Per-brand DTCG JSON                                                                           |
| `dist/tokens/dtcg/semantics/*.tokens.json`  | Per-group semantic DTCG JSON                                                                  |
| `dist/tokens/dtcg/components/*.tokens.json` | Per-component DTCG JSON                                                                       |
| `dist/tokens/dtcg/themes/*.tokens.json`     | Per-theme DTCG JSON                                                                           |

**Package exports:**

```json
{
  ".": "./dist/index.js",
  "./tokens.css": "./dist/tokens.css",
  "./theme.css": "./dist/theme.css"
}
```

DTCG JSON files are not exported as a public package contract yet.

**Registry templates (`packages/registry/templates/styles/`):**

`tokens.css` and `theme.css` are also written here by `pnpm tokens:generate:styles`.
These are the files the CLI copies into consumer projects.

All generated files start with:

```css
/* Generated by @dalexto/lexsys-tokens. Do not edit directly. */
```

The CLI uses this header to identify auto-updatable style files (safe to
overwrite on `lexsys update --styles`).

### Build commands

| Command                       | Effect                                            |
| ----------------------------- | ------------------------------------------------- |
| `pnpm tokens:build`           | Compiles TypeScript and writes `dist/` outputs    |
| `pnpm tokens:generate:styles` | Writes both `dist/` and registry template outputs |

---

## Component styling model

### Where tokens connect to components

Component source files (`packages/ui/src/components/<Name>/<Name>.variants.ts`)
use `class-variance-authority` (CVA) to define variants. All visual values are
consumed as CSS variables:

```typescript
// packages/ui/src/components/Button/Button.variants.ts
primary: "bg-(--lex-button-primary-background) text-(--lex-button-primary-foreground)"
```

Variable names for component tokens follow `--lex-<component>-<property>`, where
`<property>` maps from the component token path.

Components MUST NOT use raw Tailwind palette values (e.g. `bg-orange-500`) for
token-controlled properties.

### User styling surface

```tsx
// Variant — token-driven
<Button variant="primary" size="md">Create</Button>

// className override — Tailwind-native
<Button className="w-full">Save</Button>
```

Variants and `className` are additive. `cn()` (`clsx` + `tailwind-merge`)
handles conflict resolution.

### Overriding tokens at runtime

Users MAY override CSS variables in their own stylesheet:

```css
/* Override the primary action base color */
:root {
  --lex-action-primary-base: #16a34a;
}
```

Component token variables cascade from semantic tokens, so overriding a semantic
variable (`--lex-action-primary-base`) affects all components that reference it.

### Base UI

Interactive components wrap `@base-ui/react` primitives for accessibility,
keyboard navigation, focus management, and ARIA behavior. Base UI is an
internal implementation detail — it does not define the public Lexsys component
API shape.

---

## Stability

**Stable (current):**

- Token layer model: primitives → brand → semantics → components
- Active token groups (see tables above)
- Theme selectors: `:root` (light), `.dark` (dark)
- CSS variable prefix `--lex-`
- Generated CSS output paths under `dist/` and `styles/`
- `lexsys` preset / "Lexsys Default"
- `default` CLI style alias → `lexsys` preset
- CSS variable override model for consumer theming
- DTCG JSON as a generated inspection and tooling artifact

**Internal or still evolving:**

- Token authoring module boundaries within `packages/tokens/src/`
- Exact semantic group structure (new groups may be added)
- Composite token type support in generators
- DTCG public JSON package export contract

**Planned but not active contract:**

- Additional presets or CLI style aliases beyond `default` / `lexsys`
- Multiple active brands
- Visual builder / Creator output format
- Remote preset or theme marketplace
