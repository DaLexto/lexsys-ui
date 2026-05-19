# Neurex Token Rules

## Status

LOCKED TOKEN ARCHITECTURE RULES

## Purpose

This document defines the canonical token layer rules, reference rules, theme
override behavior, preset behavior, and build-failing token architecture
violations for Neurex.

Use this document together with:

- docs/ARCHITECTURE.md
- docs/DESIGN_SYSTEM.md
- docs/STYLEGUIDE.md
- docs/STYLE.md

If there is a conflict between token architecture rules and general style
convenience, this document wins for token-system decisions.

---

## Token Layer Rules

### Layer Order

```txt
primitives -> brand -> semantics -> components
                ↑
              themes override semantics per mode
```

---

### Layer Rules

#### Primitives

- Raw values only.
- No references.
- No product meaning.
- Never consumed directly by components.
- Source palette for brand tokens and non-brand semantic values.

#### Brand

- References primitive tokens only.
- Holds brand-level palette decisions.
- Defines which colors represent the brand.
- Never holds usage intent.
- Must not contain names such as `buttonBackground`, `headerText`, or component-specific intent.
- Brand color sets should stay intentionally small, usually 6-8 tokens per brand color.
- Expanding a brand color set requires repeated semantic need.
- Use one file per brand.

#### Semantics

- References brand tokens for brand-specific values.
- References primitive tokens for non-brand values such as neutrals, feedback, and foundation scales.
- Assigns product meaning and role to values.
- Never references component tokens.
- Semantic tokens must represent reusable product meaning.
- One-off visual decisions belong in component tokens.
- Structure semantic tokens by top-level group. Current active groups include
  `color`, `action`, `border`, `motion`, `radius`, `size`, `spacing`, and
  `typography`.
- Current color-related semantics are split by responsibility:
  - `color` owns global background, text, and feedback `bg` / `text` roles.
  - `action` owns interactive state colors such as `primary`, `secondary`, and
    `danger`.
  - `border` owns reusable border color roles such as `default`, `strong`,
    `focus`, and `accent`.
- Do not document current action or border semantics as `color.action.*` or
  `color.border.*`; those are not current token paths.

#### Components

- Target rule: reference semantic tokens only.
- Never reference primitive color, brand, or theme tokens directly.
- Temporary exception: component tokens may reference raw `size.*` or
  `spacing.*` scale tokens only when no semantic `size` or `spacing` role exists
  yet. Do not add new raw scale references when a semantic role can be named
  first.
- Never reference brand tokens directly.
- Never reference theme tokens directly.
- Scoped to one component.
- Use one token file per component.
- Component tokens describe component slot/property decisions, not global product meaning.

#### Themes

- Override semantic token values per mode.
- Themes are not a fifth token layer.
- Reference brand tokens for brand-specific values.
- Reference primitive tokens for non-brand values such as neutrals, feedback, and foundation scales.
- Never reference component tokens.
- Never introduce component-specific intent.
- Default interactive behavior:
  - light mode hover usually moves toward stronger or darker emphasis
  - dark mode hover usually moves toward lighter or brighter emphasis
  - disabled states move toward lower emphasis while preserving accessibility
- Current feedback status roles provide:
  - background
  - text
- Add status-specific border roles only after the semantic and theme token
  groups implement them.
- Use one folder per brand and one file per mode.

#### Presets

- Configuration only.
- Not a token layer.
- Never hold token values.
- Describe which brand, themes, and theme modes should be built.
- Consumed by the generator to select output combinations.
- Never participate in the token resolution chain.

---

### Resolution Chain

Brand-specific path:

```txt
component token
  -> semantic token
    -> brand token
      -> primitive token
        -> concrete value
```

Non-brand/foundation path:

```txt
component token
  -> semantic token
    -> primitive token
      -> concrete value
```

Theme modes override semantic values before component tokens are resolved.

---

### Validation Status

Current build-failing validation covers:

- a reference path does not exist
- a reference chain creates a circular reference
- a theme is missing a mode required by its preset
- invalid DTCG token leaf shape when importing token JSON

Target architecture violations that must become build-failing before the token
contract is considered stable:

- a component token references a primitive token directly
- a component token references a brand token directly
- a component token references a theme token directly
- a semantic token references a component token
- a theme token references a component token
- a brand token contains component-specific intent
