# Neurex Tokens Roadmap

**Audience:** Maintainers and token domain owners  
**Type:** Vision / strategy document  
**Status:** Phases 1–5 complete; future direction below — not a current
implementation contract  
**Source of truth for:** Long-term tokens platform direction after the initial
platform pass  
**Verified against:** `packages/tokens/src/` current state

**Related docs:**

- `docs/TOKENS.md` - canonical current token rules and layer/reference contract
- `docs/REVIEW_TODO.md` - active actionable backlog and known gaps
- `docs/RESOLVER_EVOLUTION.md` - resolver-specific planned evolution

---

## Current State

Current implementation:

- TypeScript token files are the source of truth for authoring.
- Token leaves use nested DTCG-shaped `$value` authoring.
- CSS and W3C/DTCG JSON are generated outputs.
- Token groups use factory helpers with explicit `{ meta, tokens }` boundaries.
- Build-failing validation covers reference integrity, preset theme coverage,
  invalid DTCG leaf shape, and token layer contract violations.
- Governance reports (metadata, deprecation, dead primitives) are available via
  `createTokenGovernanceReport` and `pnpm --filter @neurex/tokens governance:report`.

Canonical current rules and enforcement details live in `docs/TOKENS.md`.

---

## Completed Platform Phases (1–5)

Phases 1–5 are complete. Detailed implementation history lives in git; this
table is the high-level record only.

| Phase | Outcome |
| ----- | ------- |
| 1 — Types and factories | Explicit source-group types and factory helpers |
| 2 — Pilot migration | Representative primitive, component, and theme sources migrated |
| 3 — Full source migration | All source groups use factories; legacy adapter removed |
| 4 — Layer validation | Build-failing layer contract enforcement |
| 5 — Governance and tooling | Metadata, deprecation, and dead-token reports |

---

## Future Direction

The items below are planned work, not current contracts.

### Resolver and generator evolution

- Expression evaluation, color math, and unit-aware arithmetic
- Composite token expansion in generators
- Contrast and accessibility guards at build time
- Metadata propagation through full resolution chains
- Optional stripping of dead primitives from generated output

Resolver-specific planning lives in `docs/RESOLVER_EVOLUTION.md`.

### Semantic and product gaps

- Semantic elevation/layering roles wired from existing primitive z-index and
  shadow scales (see `docs/REVIEW_TODO.md`)
- Additional semantic groups such as `elevation`, `outline`, and `layout`

### Authoring and tooling

- Stronger governance workflows around token ownership and change review
- Additional presets or CLI style aliases beyond `default` / `neurex`

Active backlog items live in `docs/REVIEW_TODO.md`.

---

## Document Ownership

- `docs/ROADMAP.md` owns long-term direction after the initial platform pass.
- `docs/TOKENS.md` owns current token rules, layer definitions, and generated
  output contracts.
- `docs/REVIEW_TODO.md` owns actionable active work and known gaps.
- `docs/RESOLVER_EVOLUTION.md` owns resolver-specific target architecture.

## Maintenance Workflow

- Update `docs/ROADMAP.md` when future direction or sequencing changes.
- Update `docs/REVIEW_TODO.md` when work becomes actionable.
- Update `docs/TOKENS.md` when current token behavior or enforced rules change.
- Record completed implementation details in git history, not in this roadmap
  body.
