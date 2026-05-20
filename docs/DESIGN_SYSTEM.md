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
  later Creator JSON/presets

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

The current implementation has two names for the first style:

```txt
CLI/config style alias: default
token package preset id: neurex
name: Neurex Default
brand: neurex
```

Future examples may include `space-indigo`, `graphite`, or other named
presets. Those names are not active contracts until implemented. Today,
`default` is the only public CLI style alias, and it resolves to the current
token package preset id `neurex`. The exact public preset-selection API remains
internal and evolving.

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

Detailed token architecture rules are defined in `docs/TOKENS.md`.

Tokens define:

- primitive values
- brand-level palette decisions
- semantic roles
- component-level token intent

The canonical token dependency model is:

    primitives -> brand -> semantics -> components

Themes override semantic values per mode. Themes are not a fifth token layer.

    primitives -> brand -> semantics -> components
                    ↑
                  themes override semantics per mode

Presets are configuration. They may select a brand, theme modes, density,
radius feel, spacing rhythm, component defaults, and output combinations, but
they never participate in the token resolution chain.

Token authoring uses object trees, not flat token arrays or generated CSS
variable strings. Group metadata lives beside token branches, and token leaves
use DTCG-compatible `$value` authoring.

TypeScript token files are the implementation source of truth. W3C/DTCG Design
Tokens JSON is a generated interchange contract and supported package/tooling
input boundary, not a replacement source of truth.

References use string aliases such as `{brand.color.accent}` or
`{action.primary.base}`. The `--nx` prefix belongs to output generation only,
never to token authoring files.

The preferred dependency flow is:

    component token
      -> semantic token
        -> brand token or primitive token
          -> concrete value

Brand-specific semantic values should reference brand tokens. Non-brand semantic
values, such as neutral, feedback, or foundation values, may reference primitive
tokens directly.

Components must consume semantic or component tokens. They must not depend
directly on primitive values such as a specific color scale, radius step,
spacing step, or raw motion duration.

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
- W3C/DTCG Design Tokens JSON artifacts for package/tooling workflows

Current install output paths are:

```txt
styles/tokens.css
styles/theme.css
```

Current package build output paths are:

```txt
dist/tokens.css
dist/theme.css
dist/tokens/dtcg/tokens.tokens.json
dist/tokens/dtcg/primitives/*.tokens.json
dist/tokens/dtcg/brand/*.tokens.json
dist/tokens/dtcg/semantics/*.tokens.json
dist/tokens/dtcg/components/*.tokens.json
dist/tokens/dtcg/themes/*.tokens.json
```

The CSS files are the current public style exports. The DTCG files are generated
package artifacts for inspection, validation, design-tool exchange, and future
tooling; a public JSON package export contract is still deferred.

Future outputs may include:

- Creator JSON
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

- `default` CLI style alias resolving to the `neurex` / `Neurex Default` token preset
- light and dark theme mode output
- CSS custom property output under `styles/`
- Tailwind v4 consumer styling model
- Vite-oriented CLI delivery
- user-owned component source installed under `src/components/ui`
- registry metadata as the install contract

Internal/evolving:

- token authoring module boundaries
- exact style preset authoring API
- remote registry/versioning policy
- update/uninstall migration behavior
- generated Creator payload formats

Planned but not active contract:

- additional framework starters
- CLI style aliases or token presets beyond `default` / `neurex`
- visual Creator UI
- marketplace or remote preset delivery
