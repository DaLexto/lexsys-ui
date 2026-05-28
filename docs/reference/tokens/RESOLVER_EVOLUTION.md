# Lexsys Resolver Evolution

**Audience:** Maintainers
**Type:** Vision / implementation plan
**Status:** Phases 1–10 shipped; speculative items deferred
**Source of truth for:** Resolver and governance evolution sequencing after the initial platform pass
**Verified against:** `packages/tokens/src/engine/`, `packages/tokens/src/generators/`

Current enforced rules and build-failing validation live in [docs/reference/tokens/TOKENS.md](../tokens/TOKENS.md).
Platform phase history lives in [docs/ROADMAP.md](../../ROADMAP.md).

---

## Overview

Lexsys token validation and analysis split across three cooperating areas:

| Area               | Location                                                  | Role                                                          |
| ------------------ | --------------------------------------------------------- | ------------------------------------------------------------- |
| Reference resolver | `packages/tokens/src/engine/resolver/reference/`          | Resolve `{dotted.path}` chains; output-agnostic               |
| Resolved values    | `packages/tokens/src/engine/resolver/values/`             | On-demand leaf resolution and color normalization for tooling |
| Color string parse | `packages/tokens/src/engine/shared/color-string.parse.ts` | Shared `rgb()` / `hsl()` parsing for contrast normalization   |
| Graph traversal    | `packages/tokens/src/engine/resolver/graph/`              | Reachability, transitive dependents, dead-primitive analysis  |
| Layer validation   | `packages/tokens/src/engine/validator/layers/`            | Build-failing layer contract enforcement                      |
| Contrast guard     | `packages/tokens/src/engine/validator/contrast/`          | WCAG AA report + CI policy gate on registered semantic pairs  |
| Governance + audit | `packages/tokens/src/engine/governance/`                  | Non-blocking graph analysis and reports                       |
| Generator pipeline | `packages/tokens/src/generators/`                         | CSS/DTCG output; calls validation before generation           |
| CLI entrypoints    | `packages/tokens/scripts/`                                | Build output write, governance report, dev hygiene            |

Phases 1–10 (factory authoring through accessibility contrast guard) are complete.
Next work is **planned hardening and expansion** (below) plus **speculative** AST/math (deferred).

```mermaid
flowchart TB
  subgraph shipped [Shipped Baseline]
    resolver[Reference resolver]
    graph[Graph traversal]
    layerVal[Layer validation]
    govReports[Governance + semantic audit reports]
    deadStrip[Optional dead-primitive stripping]
    composite[Composite token expansion]
    resolvedPipeline[Resolved leaf value pipeline]
    contrast[WCAG contrast guard]
  end

  subgraph speculative [Speculative]
    ast[AST evaluator]
    colorMath[Color math + unit arithmetic]
  end

  shipped --> speculative
  contrast --> speculative
```

---

## Shipped Baseline

These capabilities are implemented and enforced today. For build-failing vs
non-blocking behavior, see [docs/reference/tokens/TOKENS.md — Validation Status](../tokens/TOKENS.md#validation-status).

### Reference resolver

**Entry point:** `packages/tokens/src/engine/resolver/reference/reference.resolver.ts`

- Validates reference format (`{dotted.path}`)
- Detects missing references, branch references, circular chains, and max-depth violations (50 hops)
- Validates token leaf shape during resolution
- Operates in strict or safe mode
- Output-agnostic — no CSS, Tailwind, or DTCG knowledge

Invoked at build time via `validateStyleTokenInput` in
`packages/tokens/src/generators/inputs/input.source.ts`.

### Layer validation

**Entry point:** `packages/tokens/src/engine/validator/layers/layers.validator.ts`

Build-failing layer contract checks:

- Component tokens must not reference primitive, brand, or theme-only tokens directly
- Semantic tokens must not reference component tokens
- Theme tokens must not reference component tokens
- Brand tokens must not use component-specific intent branches

Runs before reference resolution during `validateStyleTokenInput`.

### Graph traversal (shared)

**Entry point:** `packages/tokens/src/engine/resolver/graph/graph.resolver.ts`

- Expands reference chains through `foundationTokens` (`expandReferencedPaths`)
- Collects upper-layer references and used primitive paths
- Finds **transitive** dependents for deprecated/metadata targets
- Powers governance reports and optional dead-primitive stripping

### Governance and semantic audit (non-blocking)

**Entry points:**

- `packages/tokens/src/engine/governance/report/report.governance.ts`
- `packages/tokens/src/engine/governance/audit/audit.governance.ts`
- CLI: `pnpm tokens:governance:report` (`scripts/governance-report.ts`)

Available reports:

| Report                 | What it covers                                                                     |
| ---------------------- | ---------------------------------------------------------------------------------- |
| Metadata inventory     | Tokens with `$description` or `$deprecated`                                        |
| Deprecation dependents | Tokens marked `$deprecated` and their **transitive** dependents                    |
| Metadata dependents    | Metadata entries with transitive usage when `$description` or `$deprecated` is set |
| Dead primitives        | Primitive leaf paths not reached by upper-layer reference chains                   |
| Semantic audit         | Unused semantic paths, component-intent branches, theme path drift                 |

These reports analyze the token graph but do not change CSS or DTCG output by default.

### Optional dead-primitive stripping (Phase 7)

**Entry points:** `createStyleOutputs({ stripDeadPrimitives: true })` in `generator.create.ts`; CLI flag on `scripts/write-style-outputs.ts`:

```sh
node dist/scripts/write-style-outputs.js --package --strip-dead-primitives
```

Default is **off**. When enabled, unreached primitive leaves are omitted from CSS/DTCG output after full-graph validation.

### Governance CI (documented hook)

Recommended non-blocking PR check when `packages/tokens/**` changes:

```sh
pnpm tokens:governance:report
```

Promotion to build-failing checks (zero dead primitives, zero deprecated-with-dependents) requires an explicit maintainer policy — not automatic.

### Composite token expansion (Phase 8)

**Entry points:**

- `packages/tokens/src/engine/composite/` — composite type registry, slot schemas, branch detection, atomic path collection
- `packages/tokens/src/generators/outputs/dtcg/` — normalizes composite branches and resolves slot leaf types from schema
- CSS output — typography slot leaves already flatten to atomic `--lex-*` vars via `flattenTokenTree` (regression-tested)

Typography composite groups (`body`, `heading`, `control`, `label`, `display`, `code`) are authored as **branch + slot leaves** (for example `{typography.control.md.fontSize}`). Phase 8 formalizes that model:

- `$type: "typography"` on all typography role branches
- Schema-driven slot types (`fontFamily`, `fontSize`, `fontWeight`, `lineHeight`, `letterSpacing`)
- DTCG JSON carries composite group metadata and typed atomic slot leaves
- `collectCompositeAtomicPaths` exported for Phase 9 resolved-value work

**Post–Phase 10 extension:** shadow and border composite schemas registered in
`COMPOSITE_TYPE_REGISTRY` (`elevation.shadow.floating` / `raised` pilot with slot
leaves + transitional `boxShadow`; `border.control` group). DTCG composite **object**
`$value` leaves on a single token remain a deferred engine phase — see
[After Phase 10](#after-phase-10).

Default is **on** (no opt-in flag). CSS/Tailwind output is unchanged; DTCG gains composite group `$type` metadata on previously untyped role branches.

---

## Phase Summary

| Phase | Name                     | Type          | Depends on                    | Entry points                                                                            |
| ----- | ------------------------ | ------------- | ----------------------------- | --------------------------------------------------------------------------------------- |
| 7     | Governance hardening     | Shipped       | Shipped baseline              | `engine/resolver/graph/`, `engine/governance/report/`, `scripts/write-style-outputs.ts` |
| 8     | Composite expansion      | Shipped       | Shipped baseline              | `engine/composite/`, `generators/outputs/dtcg/`                                         |
| 9     | Resolved value pipeline  | Shipped       | Phases 7–8                    | `packages/tokens/src/engine/resolver/values/`                                           |
| 10    | Accessibility guard      | Shipped       | Phase 9                       | `packages/tokens/src/engine/validator/contrast/`                                        |
| —     | Post–Phase 10 hardening  | Planned       | Phase 10 shipped              | See [After Phase 10](#after-phase-10)                                                   |
| —     | Speculative (AST + math) | New subsystem | Stable values + contrast APIs | Not scheduled — see [Speculative (Deferred)](#speculative-deferred)                     |

---

## Phase 8: Composite Token Expansion

**Status:** Shipped
**Entry points:** `packages/tokens/src/engine/composite/`, `packages/tokens/src/generators/outputs/dtcg/`

### Shipped behavior

- Typography composite role groups declare `$type: "typography"` and fixed slot keys
- CSS generator continues to emit atomic custom properties per slot leaf (for example `--lex-typography-control-md-font-size`)
- DTCG generator normalizes composite branches and resolves slot leaf `$type` from the composite schema instead of path heuristics alone
- `collectCompositeAtomicPaths`, `normalizeCompositeBranches`, and `resolveCompositeSlotType` are exported from the engine for Phase 9

### Authoring model (unchanged)

Components keep slot references such as `{typography.control.md.fontSize}`. Composite groups remain branch + slot leaves, not object `$value` leaves.

### Non-goals (still deferred)

- Structured composite object `$value` leaves (future shadow/border migration)
- Expression evaluation or color math

---

## Phase 9: Resolved Value Pipeline

**Status:** Shipped
**Entry points:** `packages/tokens/src/engine/resolver/values/`, `packages/tokens/src/engine/shared/tree.utils.ts`

### Shipped behavior

- On-demand resolved leaf values via `resolveLeafValue`, `resolveLeafValues`, and `resolveLeafValueForTheme`
- Alias chain resolution reuses `resolveReferenceChain` — the same core logic as build-time `resolveTokenTree`
- Terminal values include structured OKLCH objects and `TokenUnitValue` shapes already authored in source
- Composite typography slot paths (for example `typography.control.md.fontSize`) resolve to atomic terminal values
- Theme-aware lookup merges `foundationTokens` + `theme.tokens` + `componentTokens` before resolving
- `isResolvedColorValue` and `toContrastReadyColor` in `values.normalize.ts` (OKLCH objects, `oklch()` / `#hex` / `rgb()` / `hsl()` strings via `engine/shared/color-string.parse.ts`)

### Distinction from build-time resolution

| API                                            | Purpose                                                      | Output                                               |
| ---------------------------------------------- | ------------------------------------------------------------ | ---------------------------------------------------- |
| `resolveTokenTree` / `validateStyleTokenInput` | Build-time validation; full-tree clone with inlined `$value` | Used before CSS/DTCG generation                      |
| `resolveLeafValue` / `resolveLeafValues`       | On-demand lookup for governance, contrast, and tooling       | Single leaf or batch; preserves refs in source trees |

Default generator behavior is **unchanged**: CSS keeps `var(--lex-*)` references; DTCG preserves alias strings.

### Non-goals (still deferred)

- Replacing CSS/DTCG reference preservation with hardcoded literals
- Exporting the full engine API from the `@dalexto/lexsys-tokens` package root entrypoint (engine remains internal to the tokens package today)

---

## Phase 10: Accessibility Guard

**Status:** Shipped
**Entry points:** `packages/tokens/src/engine/validator/contrast/`, `packages/tokens/scripts/governance-report.ts`

### Shipped behavior

- Explicit semantic foreground/background pair registry in `contrast.pairs.ts`
- WCAG AA normal-text threshold (4.5:1) and large-text (3:1) via `contrast.policy.ts` / `contrast.math.ts`
- Themed resolution through `resolveLeafValueForTheme` (Phase 9 values pipeline)
- Semi-transparent background compositing over `color.background.base` before ratio checks
- `createContrastValidationReport` appended to `pnpm tokens:governance:report`
- CI enforcement: `evaluateContrastPolicy` exits with code 1 when tier is `ci` (override with `LEXSYS_CONTRAST_POLICY=report` locally)
- OKLCH object and string parsing (`oklch()`, `#hex`, `rgb()`, `hsl()`) via `values.normalize.ts` and `engine/shared/color-string.parse.ts`

**Two-layer model:** design-time pair registry + WCAG math here; runtime a11y in consumer apps (axe-core, manual review) complements but does not replace token checks.

### Registered pairs

Eleven semantic foreground/background pairs in `contrast.pairs.ts` (text-on-base/surface/subtle/overlay, feedback roles, primary-action inverse). Further expansion (danger-action patterns, large-text pairs) remains optional.

### Non-goals (still deferred)

- Build-failing contrast enforcement in `validateStyleTokenInput` via `validateContrastPolicyStrict` (unless `LEXSYS_CONTRAST_POLICY=report`)
- Runtime accessibility checks in consumer apps
- Automatic pair discovery without the explicit registry

---

## After Phase 10

**Status:** Planned and known gaps — not current implementation contracts.

Phases 1–10 delivered the token engine baseline. The items below are the
recommended next evolution track. High-level platform summary lives in
[docs/ROADMAP.md](../../ROADMAP.md). Actionable backlog items belong in
[docs/REVIEW_TODO.md](./REVIEW_TODO.md).

### Planned (likely next, no phase number yet)

| Track                      | Target behavior                                                                | Status                                                                                                                     |
| -------------------------- | ------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------- |
| Contrast pair expansion    | Add semantic pairs beyond the current 15-pair registry                         | Partial — danger/secondary action + large-text heading pairs shipped; further pairs need design sign-off                   |
| Contrast build promotion   | Build-failing contrast when `SEMANTIC_CONTRAST_PAIRS` fail WCAG AA             | **Shipped** — `validateContrastPolicyStrict` in `validateStyleTokenInput`                                                  |
| Shadow primitive migration | Primitive shadow scale on branch+slot; slot-based `box-shadow` CSS composition | **Shipped** — `shadow.0`–`shadow.6`; `elevation.shadow.*` refs primitive slots; `shadow.inner` uses inset slot             |
| Governance promotion       | Make selected governance checks build-failing                                  | **Shipped** — semantic audit **`error`-severity** fails `pnpm tokens:governance:report` in CI (`LEXSYS_GOVERNANCE_POLICY`) |

None of the above require the speculative AST evaluator. They extend shipped
engine modules (`contrast/`, `composite/`, `governance/`, `values/`).

### Deferred (explicit non-goals for now)

| Capability                                                            | Reason deferred                                                                                                        |
| --------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| AST expression evaluator (`({space.md} * 2) + 4px`)                   | Requires a new tokenizer/parser/evaluator subsystem; string-match alias resolution cannot grow into this incrementally |
| OKLCH modify / color math (`oklch-modify(...)`, `%` lightness shifts) | Depends on AST + structured color math, not alias walking                                                              |
| Unit arithmetic across `rem` / `px` / `%`                             | Depends on AST + base-font context; out of scope for reference resolver                                                |
| Automatic contrast pair discovery                                     | Semantic usage pairs are product decisions; registry must stay explicit                                                |
| Runtime a11y checks in consumer apps                                  | Tokens package validates design-time semantics only                                                                    |
| DTCG Resolver Module JSON documents                                   | Lexsys uses its own merge + alias model; no interchange requirement today                                              |
| Replacing CSS `var(--lex-*)` with resolved literals in default output | Breaks Lexsys consumer model and DTCG alias preservation by design                                                     |

### Known gaps (current state, not bugs)

- **Contrast policy tiers** — `evaluateContrastPolicy` fails `governance:report` in CI (`ci` tier) and CSS build fails via `validateContrastPolicyStrict` unless `LEXSYS_CONTRAST_POLICY=report`.
- **Governance policy tiers** — semantic audit issues with `severity: "error"` fail `pnpm tokens:governance:report` when tier is `ci` (default in CI). Override locally with `LEXSYS_GOVERNANCE_POLICY=report`. Dead-token and deprecation reports remain informational.
- **Engine imports are internal** — `packages/tokens/src/engine/` is for build pipeline, tests, and governance scripts; not a published `@dalexto/lexsys-tokens` root export today.
- **Composite object `$value` leaves** — authoring uses branch + slot leaves (typography, shadow, border); DTCG-native single-leaf composite objects remain a deferred engine phase.
- **`shadow.inner`** — inset shadow uses branch+slot leaves (`color`, offsets, blur, `inset: true`); CSS compose prepends `inset` in composed `box-shadow`.

---

## Speculative (Deferred)

**Status:** Not scheduled — no phase number, no near-term commitment

These capabilities require a formal expression evaluator. The current
string-match reference resolver cannot evolve incrementally into them.

**Prerequisite:** Planned post–Phase 10 work (contrast pair expansion, composite
migration, optional governance promotion) should stabilize first. Values and
contrast APIs from Phases 9–10 are the intended foundation for any future math
layer — not a blocker for the planned tracks above.

### AST evaluator subsystem

1. **Tokenizer** — breaks complex values like `({space.md} * 2) + 4px` into atomic tokens
2. **Parser** — builds a precedence-aware operation tree
3. **Evaluator** — resolves references and evaluates math and color expressions
4. **Serializer** — formats output for a specific generator target

### Color and unit math

- OKLCH-aware transformations (for example `oklch-modify({brand.color.primary}, l -10%)`)
- Unit-aware arithmetic across `rem`, `px`, `%` with configurable base font size

---

## Document Ownership

- **Current enforced rules:** [docs/reference/tokens/TOKENS.md](../tokens/TOKENS.md)
- **Platform phase history:** [docs/ROADMAP.md](../../ROADMAP.md)
- **Actionable backlog:** [docs/REVIEW_TODO.md](./REVIEW_TODO.md)
- **This document:** resolver/governance/generator evolution sequencing only

When a phase ships, update [docs/reference/tokens/TOKENS.md](../tokens/TOKENS.md) for new build-failing or governance behavior, update [docs/ROADMAP.md](../../ROADMAP.md) phase status, and record implementation detail in git history — not by expanding this document with completed checklists.
