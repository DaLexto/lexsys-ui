# Neurex Resolver Evolution

**Audience:** Maintainers
**Type:** Vision / implementation plan
**Status:** Phases 1–9 shipped; Phase 10 planned; speculative items deferred
**Source of truth for:** Resolver and governance evolution sequencing after the initial platform pass
**Verified against:** `packages/tokens/src/engine/`, `packages/tokens/src/generators/`

Current enforced rules and build-failing validation live in [docs/TOKENS.md](./TOKENS.md).
Platform phase history lives in [docs/ROADMAP.md](./ROADMAP.md).

---

## Overview

Neurex token validation and analysis split across three cooperating areas:

| Area | Location | Role |
| ---- | -------- | ---- |
| Reference resolver | `packages/tokens/src/engine/resolver/reference/` | Resolve `{dotted.path}` chains; output-agnostic |
| Graph traversal | `packages/tokens/src/engine/resolver/graph/` | Reachability, transitive dependents, dead-primitive analysis |
| Layer validation | `packages/tokens/src/engine/validator/layers/` | Build-failing layer contract enforcement |
| Governance + audit | `packages/tokens/src/engine/governance/` | Non-blocking graph analysis and reports |
| Generator pipeline | `packages/tokens/src/generators/` | CSS/DTCG output; calls validation before generation |
| CLI entrypoints | `packages/tokens/scripts/` | Build output write, governance report, dev hygiene |

Phases 1–9 (factory authoring, layer validation, governance reports, semantic organization, governance hardening, composite token expansion, resolved value pipeline) are complete.
Remaining work is sequenced below as Phase 10 plus explicitly deferred speculative capabilities.

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
  end

  subgraph phase10 [Phase 10 A11y]
    contrast[WCAG contrast guard]
  end

  subgraph speculative [Speculative]
    ast[AST evaluator]
    colorMath[Color math + unit arithmetic]
  end

  shipped --> phase10
  resolvedPipeline --> phase10
  resolvedPipeline --> speculative
```

---

## Shipped Baseline

These capabilities are implemented and enforced today. For build-failing vs
non-blocking behavior, see [docs/TOKENS.md — Validation Status](./TOKENS.md#validation-status).

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
- CLI: `pnpm --filter @neurex/tokens governance:report` (`scripts/governance-report.ts`)

Available reports:

| Report | What it covers |
| ------ | -------------- |
| Metadata inventory | Tokens with `$description` or `$deprecated` |
| Deprecation dependents | Tokens marked `$deprecated` and their **transitive** dependents |
| Metadata dependents | Metadata entries with transitive usage when `$description` or `$deprecated` is set |
| Dead primitives | Primitive leaf paths not reached by upper-layer reference chains |
| Semantic audit | Unused semantic paths, component-intent branches, theme path drift |

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
pnpm --filter @neurex/tokens governance:report
```

Promotion to build-failing checks (zero dead primitives, zero deprecated-with-dependents) requires an explicit maintainer policy — not automatic.

### Composite token expansion (Phase 8)

**Entry points:**

- `packages/tokens/src/engine/composite/` — composite type registry, slot schemas, branch detection, atomic path collection
- `packages/tokens/src/generators/outputs/dtcg/` — normalizes composite branches and resolves slot leaf types from schema
- CSS output — typography slot leaves already flatten to atomic `--nx-*` vars via `flattenTokenTree` (regression-tested)

Typography composite groups (`body`, `heading`, `control`, `label`, `display`, `code`) are authored as **branch + slot leaves** (for example `{typography.control.md.fontSize}`). Phase 8 formalizes that model:

- `$type: "typography"` on all typography role branches
- Schema-driven slot types (`fontFamily`, `fontSize`, `fontWeight`, `lineHeight`, `letterSpacing`)
- DTCG JSON carries composite group metadata and typed atomic slot leaves
- `collectCompositeAtomicPaths` exported for Phase 9 resolved-value work

Default is **on** (no opt-in flag). CSS/Tailwind output is unchanged; DTCG gains composite group `$type` metadata on previously untyped role branches.

---

## Phase Summary

| Phase | Name | Type | Depends on | Entry points |
| ----- | ---- | ---- | ---------- | ------------ |
| 7 | Governance hardening | Shipped | Shipped baseline | `engine/resolver/graph/`, `engine/governance/report/`, `scripts/write-style-outputs.ts` |
| 8 | Composite expansion | Shipped | Shipped baseline | `engine/composite/`, `generators/outputs/dtcg/` |
| 9 | Resolved value pipeline | Shipped | Phases 7–8 | `packages/tokens/src/engine/resolver/values/` |
| 10 | Accessibility guard | Extends validation | Phase 9 | `packages/tokens/src/engine/validator/contrast/` |
| — | Speculative (AST + math) | New subsystem | Phase 9 shipped design | Not scheduled |

---

## Phase 8: Composite Token Expansion

**Status:** Shipped
**Entry points:** `packages/tokens/src/engine/composite/`, `packages/tokens/src/generators/outputs/dtcg/`

### Shipped behavior

- Typography composite role groups declare `$type: "typography"` and fixed slot keys
- CSS generator continues to emit atomic custom properties per slot leaf (for example `--nx-typography-control-md-font-size`)
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
- Phase 10 prep: `isResolvedColorValue` and `toContrastReadyColor` stubs in `values.normalize.ts`

### Distinction from build-time resolution

| API | Purpose | Output |
| --- | ------- | ------ |
| `resolveTokenTree` / `validateStyleTokenInput` | Build-time validation; full-tree clone with inlined `$value` | Used before CSS/DTCG generation |
| `resolveLeafValue` / `resolveLeafValues` | On-demand lookup for governance, contrast, and tooling | Single leaf or batch; preserves refs in source trees |

Default generator behavior is **unchanged**: CSS keeps `var(--nx-*)` references; DTCG preserves alias strings.

### Non-goals (still deferred)

- Replacing CSS/DTCG reference preservation with hardcoded literals
- WCAG contrast checks (Phase 10)
- CSS color string parsing in `toContrastReadyColor` (Phase 10)

---

## Phase 10: Accessibility Guard

**Status:** Planned
**Depends on:** Phase 9 resolved value pipeline

### Target behavior

- Build-time WCAG AA contrast validation on declared semantic foreground/background pairs
- Start as a governance-style report (non-blocking)
- Promote to build-failing only after the pair inventory and threshold policy are agreed

### Non-goals

- Runtime accessibility checks in consumer apps
- Automatic pair discovery without an explicit semantic pair registry

---

## Speculative (Deferred)

**Status:** Not scheduled — no phase number, no near-term commitment

These capabilities require a formal expression evaluator. The current string-match reference resolver cannot evolve incrementally into them. **Do not implement until contrast and governance consumers are stable on the Phase 9 values API.**

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

- **Current enforced rules:** [docs/TOKENS.md](./TOKENS.md)
- **Platform phase history:** [docs/ROADMAP.md](./ROADMAP.md)
- **Actionable backlog:** [docs/REVIEW_TODO.md](./REVIEW_TODO.md)
- **This document:** resolver/governance/generator evolution sequencing only

When a phase ships, update [docs/TOKENS.md](./TOKENS.md) for new build-failing or governance behavior, update [docs/ROADMAP.md](./ROADMAP.md) phase status, and record implementation detail in git history — not by expanding this document with completed checklists.
