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

primitives -> brand -> semantics -> components
                ↑
              themes override semantics per mode

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
- Structure semantic tokens by category, such as `background`, `text`, `border`, `feedback`, and `action`.

#### Components

- Reference semantic tokens only.
- Never reference primitive tokens directly.
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
- Every feedback status requires a full semantic triad:
  - background
  - text
  - border
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

component token
  -> semantic token
    -> brand token
      -> primitive token
        -> concrete value

Non-brand/foundation path:

component token
  -> semantic token
    -> primitive token
      -> concrete value

Theme modes override semantic values before component tokens are resolved.

---

### Build-Failing Violations

The build must fail when:

- a component token references a primitive token directly
- a component token references a brand token directly
- a component token references a theme token directly
- a semantic token references a component token
- a theme token references a component token
- a reference path does not exist
- a reference chain creates a circular reference
- a theme is missing a mode required by its preset
- a brand token contains component-specific intent