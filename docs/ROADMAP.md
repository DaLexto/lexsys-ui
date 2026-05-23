# Neurex Tokens Roadmap

**Audience:** Maintainers and token domain owners  
**Type:** Vision / strategy document  
**Status:** Phases 1–10 complete — future direction below is
not a current implementation contract  
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
- Governance reports (metadata, deprecation, dead primitives, semantic audit,
  WCAG contrast) are available via `pnpm --filter @neurex/tokens governance:report`.
  Contrast policy failures fail the `tokens-governance` CI workflow (`ci` tier).
- Semantic token organization is active: nested `color.*` paths, top-level
  `action.*` / `border.*` / `elevation.*`, theme overrides aligned to semantic
  paths.
- Token engine (Phases 7–10): graph traversal, composite typography + shadow/border
  branch+slot registry, on-demand resolved values, WCAG contrast validation on
  registered semantic pairs (15 pairs; overlay compositing; CI + CSS build policy;
  `rgb()` / `hsl()` string parsing for contrast math).
- Post–Phase 10 hardening shipped: primitive shadow scale `0`–`6` on branch+slot
  leaves; `elevation.shadow.*` references primitive slots; CSS `boxShadow`
  composition for primitive and semantic shadow paths.

Canonical current rules and enforcement details live in `docs/TOKENS.md`.

---

## Completed Platform Phases (1–10)

Phases 1–10 are complete. Detailed implementation history lives in git; this
table is the high-level record only.

| Phase                       | Outcome                                                                                |
| --------------------------- | -------------------------------------------------------------------------------------- |
| 1 — Types and factories     | Explicit source-group types and factory helpers                                        |
| 2 — Pilot migration         | Representative primitive, component, and theme sources migrated                        |
| 3 — Full source migration   | All source groups use factories; legacy adapter removed                                |
| 4 — Layer validation        | Build-failing layer contract enforcement                                               |
| 5 — Governance and tooling  | Metadata, deprecation, and dead-token reports                                          |
| 6 — Semantic organization   | Elevation semantics, theme path alignment, feedback wiring, audit                      |
| 7 — Governance hardening    | Transitive dependents, graph module, optional dead-primitive stripping, scripts layout |
| 8 — Composite expansion     | Typography composite registry, DTCG slot typing, atomic path classification            |
| 9 — Resolved value pipeline | On-demand leaf resolution, themed lookup, color normalization for tooling        |
| 10 — Accessibility guard    | WCAG AA contrast report, semantic pair registry, governance CLI integration            |

---

## Future Direction

The items below are planned work, not current contracts.

### Token engine — next direction

Planned hardening and deferred speculative work are documented in
[docs/RESOLVER_EVOLUTION.md — After Phase 10](./RESOLVER_EVOLUTION.md#after-phase-10).
Summary only — do not duplicate detail here.

**Planned (likely next):**

- Further expand `SEMANTIC_CONTRAST_PAIRS` (additional roles beyond the current 15-pair registry)
- Optional promotion of selected governance checks to build-failing
- Inset / multi-layer shadow authoring improvements (`shadow.inner` remains a flat CSS string today)

**Recently shipped (post–Phase 10 queue):**

- Build-failing contrast in `validateStyleTokenInput` (unless `NEUREX_CONTRAST_POLICY=report`)
- Full primitive shadow scale migration (`shadow.0`–`shadow.6` branch+slot) with CSS compose
- `neurex uninstall` metadata-driven removal with dry-run and conflict reporting
- UI render test pilot (`ScrollArea`, `Collapsible`, `Dialog`)

**Deferred (explicit non-goals for now):**

- DTCG composite object `$value` authoring on single leaves (deferred engine phase; branch+slot is current)
- AST expression evaluator and color/unit math (requires new subsystem — see RESOLVER_EVOLUTION)
- Automatic contrast pair discovery without an explicit registry
- Runtime accessibility checks in consumer apps
- Default CSS/DTCG output switching from `var(--nx-*)` refs to hardcoded literals

### Semantic and product gaps

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
