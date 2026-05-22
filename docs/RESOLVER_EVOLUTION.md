# Neurex Resolver Roadmap

**Audience:** Maintainers
**Type:** Vision/strategy document
**Status:** Planned — nothing described here is currently implemented
**Current implementation:** `packages/tokens/src/resolver/`

This document captures planned evolution for the token resolver. All sections
describe future direction. No section in this document is a current-state
contract. For the current resolver behavior, see `docs/TOKENS.md`.

Parent tokens platform roadmap: [docs/ROADMAP.md](./ROADMAP.md).

---

## Current State

The current resolver (`packages/tokens/src/resolver/`) is a reference-chain
resolver that:

- validates token reference format (`{dotted.path}`)
- detects missing references
- detects circular references
- detects max-depth violations (50 hops)
- detects invalid token leaf shape
- operates in strict or safe mode
- is output-agnostic (no CSS, Tailwind, or DTCG knowledge)

Build-failing validation and target architecture violations are documented in
`docs/TOKENS.md`.

---

## 1. Planned: Layer Enforcement

**Current:** layer contract violations are build-failing via
`validateTokenLayerContractsStrict` in `packages/tokens/src/resolver/layer-validation.ts`.

**Target:** extend enforcement with governance reports described in Phase 5 of
`docs/ROADMAP.md`.

---

## 2. Planned: Color and Math Engine

The resolver does not currently evaluate expressions. Token values are stored
and output as-is.

**Target capabilities:**

- OKLCH-aware color transformations:
  - Example: `oklch-modify({brand.color.primary}, l -10%)`
- Unit-aware arithmetic across `rem`, `px`, `%` with configurable base font size

These require a formal expression evaluator. The current string-match resolver
cannot support them.

---

## 3. Planned: Composite Token Expansion

The resolver currently treats composite token leaves (e.g. `typography.body.md`)
as opaque objects.

**Target:** composite tokens are expanded into individual atomic variables while
preserving internal reference links (e.g. the `fontSize` slot continues
resolving through `{font.size.base}`).

---

## 4. Planned: Accessibility Guard

**Target:** build-time contrast validation between semantic foreground and
background token pairs. Build fails if a pairing does not meet WCAG AA.

This requires resolved color values and a color contrast evaluator, neither of
which the current resolver produces.

---

## 5. Planned: Metadata Propagation

**Current:** governance reports list token metadata and flag deprecated tokens with
direct dependents via `createTokenGovernanceReport`.

**Target:** `$description` and `$deprecated` metadata propagates through the full
resolution chain to component output, not only direct reference matches.

---

## 6. Planned: Dead Token Detection

**Current:** governance reports list primitive leaf tokens not reached by upper-layer
reference chains.

**Target:** optional generator stripping of unused primitives from CSS/DTCG output.

---

## 7. Planned: AST Evaluator

Supporting color math and unit-aware arithmetic requires moving beyond regex
pattern matching to a formal AST approach:

1. **Tokenizer** — breaks complex values like `({space.md} * 2) + 4px` into
   atomic tokens
2. **Parser** — builds a precedence-aware operation tree
3. **Evaluator** — resolves references and evaluates math and color expressions
4. **Serializer** — formats output for a specific generator target

This is a significant implementation change and is not planned for the near term.
