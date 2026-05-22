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
- Governance reports (metadata, deprecation, dead primitives) are available via
  `createTokenGovernanceReport` and `pnpm --filter @neurex/tokens governance:report`.
- Semantic token organization is active: nested `color.*` paths, top-level
  `action.*` / `border.*` / `elevation.*`, theme overrides aligned to semantic
  paths, and semantic audit reporting via `createSemanticAuditReport`.

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
| 9 — Resolved value pipeline | On-demand leaf resolution, themed lookup, contrast prep stubs                          |
| 10 — Accessibility guard    | WCAG AA contrast report, semantic pair registry, governance CLI integration            |

---

## Future Direction

The items below are planned work, not current contracts.

### Resolver and generator evolution

Deferred speculative work is sequenced in
[docs/RESOLVER_EVOLUTION.md](./RESOLVER_EVOLUTION.md):

| Phase | Focus                                                    | Status        |
| ----- | -------------------------------------------------------- | ------------- |
| —     | Speculative AST evaluator and color/unit math (deferred) | Not scheduled |

Do not duplicate phase detail here — update RESOLVER_EVOLUTION when sequencing changes.

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
