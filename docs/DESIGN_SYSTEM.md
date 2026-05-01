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
TOKENS -> THEMES -> OUTPUTS -> COMPONENTS -> REGISTRY -> DELIVERY -> USER
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
id: default
name: Neurex Default
```

Future examples may include `space-indigo`, `graphite`, or other named
presets. Those names are not active contracts until implemented.

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

They define:

- primitive values
- semantic roles
- component-level token intent

Tokens must not be treated as CSS files. CSS is an output, not the source.

Token authoring uses object trees, not flat token arrays or generated CSS
variable strings. Group metadata lives beside token branches, and every token
leaf uses a `{ value }` object so future metadata can be added without changing
the shape:

```ts
export const motionSemantics = {
  name: "motion",
  duration: {
    control: { value: "{motion.duration.fast}" },
    surface: { value: "{motion.duration.fast}" },
  },
}
```

References use string aliases such as `{motion.duration.fast}`. The `--nx`
prefix belongs to output generation only, never to token authoring files.

The preferred dependency flow is:

```txt
primitive token -> semantic token -> component token -> component class
```

For example, `Neurex Default` maps `--nx-radius-control` to the primitive
radius scale, Button maps `--nx-button-radius` to `--nx-radius-control`, and
the Button class consumes `--nx-button-radius`.

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

### Delivery

Delivery surfaces install or generate user-owned code from registry contracts.

Current delivery:

- CLI

Future delivery:

- Creator visual builder

Creator should produce registry-compatible output and reuse the same install and
update rules rather than becoming a parallel system.

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
