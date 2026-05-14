# Neurex Design System Model

## Status

**LOCKED MENTAL MODEL**

This document defines the design-system flow that should guide token, theme,
component, registry, and delivery work.

The current implementation focus is CLI delivery. Future delivery surfaces, such
as a visual Creator, must fit this model without becoming a separate design
system.

---

## Core Flow

```txt
TOKENS
  raw primitives + semantic meaning

STYLE PRESETS
  design personality / density / radius / component feel

THEME MODES
  light / dark / brand mappings

OUTPUTS
  CSS vars
  Tailwind @theme
  DTCG JSON
  later preset payloads

COMPONENTS
  variants consume semantic tokens

REGISTRY
  install contract and metadata

DELIVERY
  CLI now, Creator later

USER
  owned code
```

Short form:

```txt
TOKENS -> STYLE PRESETS -> THEME MODES -> OUTPUTS -> COMPONENTS -> REGISTRY -> DELIVERY -> USER
```

---

## Responsibilities

### Style Presets

Style presets define the design personality of Neurex.

They may control:

- density
- radius feel
- spacing rhythm
- component token defaults
- color personality through theme-mode mappings

The first official preset is:

```txt
consumer config key: default
token preset id: neurex
name: Neurex Default
brand: neurex
```

Future examples may include `space-indigo`, `graphite`, or other named
presets. Those names are not active contracts until implemented. Today, the
only implemented style personality is Neurex Default.

The CLI config still stores `style: "default"` as the consumer-facing install
alias. The token package currently exposes the implemented preset as
`defaultPresetId = "neurex"` and `neurexPreset`. Documentation and code should
preserve that distinction until the CLI style key is formally wired to token
preset ids.

Current token preset files live under:

```txt
packages/tokens/src/presets/
packages/tokens/src/brand/
```

Style presets are not theme modes.

```txt
Neurex Default
  light
  dark

Neurex Space Indigo
  light
  dark
```

### Tokens

Tokens are the source of truth for design decisions.

Long-term, the canonical token interchange contract is **W3C/DTCG Design
Tokens JSON**. The current codebase still authors tokens in TypeScript files,
but those files use the same DTCG-style shape and act as a typed authoring
wrapper around the intended JSON contract.

Current model:

```txt
TypeScript authoring -> W3C/DTCG Design Tokens JSON -> CSS
```

Target model:

```txt
TypeScript authoring -> W3C/DTCG Design Tokens JSON ─┐
                                                     ├-> CSS
Figma / Tokens Studio -> W3C/DTCG Design Tokens JSON ┘
```

In the target model, the generator should consume the W3C/DTCG-shaped token
tree. TypeScript authoring, Figma, Tokens Studio, and future Creator workflows
may all produce that same JSON contract.

Current implementation now creates an internal `StyleTokenInput` from the
TypeScript authoring files before generating CSS or DTCG JSON. This is the first
boundary toward letting future JSON imports feed the same output generators.
`StyleTokenInput` represents one active preset build, not the full preset
catalog. For example, `createStyleTokenInput({ presetId: "neurex" })` selects
the active style preset, filters compatible theme modes for that preset, and
then feeds CSS and DTCG JSON outputs from that selected context.

Tokens define:

- primitive values
- semantic roles
- component-level token intent

Current primitive families cover color palettes, radius, spacing, size,
typography scales, and motion. Semantic tokens assign meaning to those
primitives before component tokens consume them.

Tokens must not be treated as CSS files. CSS is an output, not the source.

Token authoring uses object trees, not flat token arrays or generated CSS
variable strings. Metadata follows the DTCG-style `$` key convention and may
exist on both token branches and token leaves.

Branch metadata describes a token group without being treated as a token leaf.
Current supported branch metadata:

- `$type`
- `$description`
- `$deprecated`

Every token leaf uses a `{ $value }` object. `$type` should live on the
narrowest shared token group when all child tokens share the same DTCG type.
Leaves may still carry `$type` when they sit inside a mixed group or need a
more specific type than their parent can provide. Leaves may also carry
metadata when the individual token needs documentation or lifecycle status.

Authoring convention:

- prefer group-level `$type` by default, and leaf-level `$type` only when the
  group is mixed or needs an explicit override
- use `$description` on groups when it explains the purpose of a token family
- use `$type` on groups when descendants share one DTCG type, and on leaves
  only when group inheritance cannot express the token type safely
- use `$deprecated` on groups or leaves when a token path remains only for
  migration compatibility
- keep primitive scale leaves compact with `$value` when group metadata can
  carry the shared type

Semantic color tokens use a structured category hierarchy rather than flat
single-level color roles.

Current color semantic groups:

```txt
  color.background.{base,surface,subtle,overlay}
  color.text.{primary,secondary,disabled,inverse,link,accent}
  color.border.{default,strong,focus,accent}
  color.feedback.{info,success,warning,danger}.{bg,text,border}
  color.action.{primary,secondary,danger}.{base,hover,active,disabled}
```

### Theme Modes

Theme modes map semantic token roles to concrete values inside a style preset.

Initial theme modes should support:

- light
- dark

The model must allow future custom or brand theme modes without changing
component APIs.

### Outputs

Outputs are generated artifacts derived from tokens and themes.

Initial outputs should include:

- CSS custom properties
- Tailwind `@theme` mappings
- W3C/DTCG Design Tokens JSON for token interop workflows

Current install output paths are:

```txt
styles/tokens.css
styles/theme.css
```

Current package build output also includes:

```txt
dist/tokens.css
dist/theme.css
dist/tokens.tokens.json
dist/tokens/primitives.tokens.json
dist/tokens/brand.tokens.json
dist/tokens/semantics.tokens.json
dist/tokens/components.tokens.json
dist/tokens/presets.tokens.json
dist/tokens/themes/neurex.light.tokens.json
dist/tokens/themes/neurex.dark.tokens.json
```

`tokens.tokens.json` is generated from the current TypeScript token authoring wrapper
as a merged convenience artifact for tools that want one file. The canonical
interop shape is also emitted as separate layer files under `dist/tokens`,
following the Style Dictionary-style source glob model. Individual layer files
do not wrap their payload in `"primitives"` or `"semantics"` keys; the folder
and file names carry that context. JSON output preserves token reference strings
such as `{radius.control}`, while DTCG `$type` values are carried from authoring
or inferred from either the token path or referenced token path when available.

Future outputs may include:

- preset payloads
- theme exchange formats

Output generation must remain deterministic. Do not handwrite generated CSS as
the design source of truth.

### Components

Components consume semantic tokens through classes, variables, and variant
recipes.

Components should not depend directly on primitive values such as a specific
blue, radius, or spacing scale value.

Interactive components should wrap Base UI behavior primitives when Base UI
provides the required state, keyboard, focus, aria, positioning, or form
behavior. Plain structural components may use regular HTML when no behavior
primitive exists. This keeps the public Neurex API consistent while letting
Base UI own complex behavior.

Public component API rules:

- exported component symbols should have matching `XProps` public types
- implementation exports stay at the bottom of component files
- component source uses package-local imports
- registry templates use consumer aliases such as `@/lib/utils`
- variants consume semantic/component tokens, not primitive literals
- `className` remains available for Tailwind-native user overrides

### Registry

The registry is the source of truth for install and delivery contracts.

It defines:

- files to install
- dependencies
- registry dependencies
- utilities
- styles and theme outputs required by an item
- target paths

The registry must not become the source of truth for design values.

Component template files are synced from `packages/ui/src/components` into
`packages/registry/templates/components`. Registry item metadata remains
manually authored or generator-assisted because it encodes install contracts,
not component implementation details.

### Delivery

Delivery surfaces install or generate user-owned code from registry contracts.

Current delivery:

- CLI

Future delivery:

- Creator visual builder

Creator should produce registry-compatible output and reuse the same install and
update rules rather than becoming a parallel system.

The current stable delivery target is Vite through:

```txt
neurex init vite [directory]
neurex init
neurex add <component>
```

### User Project

Installed code belongs to the user.

The system must preserve:

- safe installs
- idempotency
- no silent overwrites
- clear conflict reporting
- editable generated code

---

## Guiding Principle

Neurex should feel shadcn-like at the DX layer, but the design-system foundation
must be token-driven:

```txt
shadcn-like delivery experience
real token/theme engine underneath
generated outputs as installable artifacts
```

---

## Stability Boundary

Stable/current:

- `default` consumer config alias for Neurex Default
- internal token preset id `neurex` for Neurex Default
- light and dark theme mode output
- CSS custom property output under `styles/`
- DTCG-compatible `tokens.tokens.json` package output
- Tailwind v4 consumer styling model
- Vite-oriented CLI delivery
- user-owned component source installed under `src/components/ui`
- registry metadata as the install contract

Internal/evolving:

- token authoring module boundaries
- exact style preset authoring API and CLI config mapping
- remote registry/versioning policy
- update/uninstall migration behavior
- public export policy for generated JSON token payloads

Planned but not active contract:

- additional framework starters
- style presets beyond Neurex Default
- visual Creator UI
- marketplace or remote preset delivery
