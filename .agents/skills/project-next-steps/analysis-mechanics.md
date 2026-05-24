# Analysis mechanics (supplementary)

Timeless probes for **`$project-next-steps`**. Active backlog lives in
[docs/REVIEW_TODO.md](../../docs/REVIEW_TODO.md) and [docs/ROADMAP.md](../../docs/ROADMAP.md) —
do not duplicate queue items here.

---

## Document read map

| Question                       | Primary doc                                                | Secondary                             |
| ------------------------------ | ---------------------------------------------------------- | ------------------------------------- |
| What to do next?               | REVIEW_TODO § Execution Queue, Known Gaps, open P-sections | ROADMAP phase tables                  |
| Long-term sequencing?          | ROADMAP                                                    | REVIEW_TODO cross-links               |
| Token platform done vs future? | ROADMAP § Tokens                                           | RESOLVER_EVOLUTION § After Phase 10   |
| Install/CLI behavior?          | CLI.md                                                     | registry README, `packages/cli/test/` |
| Component catalog?             | UI_COMPOSITION.md, packages/ui/README.md                   | registry item count                   |
| Verification expectations?     | TESTING.md                                                 | SCRIPTS.md                            |
| Publish readiness?             | DEPLOY.md                                                  | ROADMAP planned release phases        |

---

## Extract from REVIEW_TODO (living backlog)

Read these sections every analysis — content changes as work ships:

| Section                    | Use for                                           |
| -------------------------- | ------------------------------------------------- |
| Execution Queue table      | Rows with `in progress` or `planned`              |
| Track tables (e.g. BO, UC) | `partial`, `in progress`, "not yet marked stable" |
| Known Gaps                 | High-priority open gaps                           |
| P2 / P3 open bullets       | Product and architecture follow-ups               |

Cross-check ROADMAP **Explicitly deferred** before recommending deferred-looking items.

---

## Doc health grep (generic)

Run from repo root when checking drift — adjust patterns as catalog evolves:

```sh
# Status vocabulary in backlog docs
rg "in progress|partial|planned|deferred|shipped" docs/REVIEW_TODO.md docs/ROADMAP.md

# Known Gaps and execution queue headings still present
rg "^## (Execution Queue|Known Gaps)" docs/REVIEW_TODO.md

# Stale count claims vs package READMEs (example — verify owner docs)
rg "\bprimitives?\b|\binstallable\b" docs README.md packages/ui/README.md
```

Interpret hits in context. `shipped` in phase tables is expected.

If docs disagree with code, flag drift and use **`$docs-alignment`** before feature recommendations.

---

## Layer spot-checks (by track)

Probe only layers tied to candidate next steps.

### Tokens

- `pnpm tokens:check`
- `pnpm tokens:governance:report` when governance is relevant
- Rules: [docs/TOKENS.md](../../docs/TOKENS.md)

### UI + registry

- Catalog layout: `packages/ui/src/` (primitives, blocks, templates)
- `pnpm registry:check` — templates match UI
- `pnpm ui:audit` when variant/token compliance is in scope

### CLI + consumer path

- `pnpm cli:check`
- Tests under `packages/cli/test/`
- Sandbox checklist: [docs/TESTING.md](../../docs/TESTING.md)

### Composition (blocks / templates)

- Open rows in REVIEW_TODO composition / optimization sections (not hardcoded IDs)
- Missing verification gates called out in Known Gaps
- **`$consumer-sandbox-verify`** when recommending install-artifact work

---

## Maturity labels (quick reference)

| Label           | Use when                                                           |
| --------------- | ------------------------------------------------------------------ |
| **Stable**      | Shipped + verification gate + docs aligned                         |
| **Pilot**       | Shipped but REVIEW_TODO says not yet stable or track still partial |
| **Partial**     | Status column or table says partial                                |
| **Planned**     | REVIEW_TODO or ROADMAP row with no implementation yet              |
| **Deferred**    | ROADMAP § Explicitly deferred or REVIEW_TODO deferred note         |
| **Speculative** | Target doc marks work as deferred / not scheduled                  |

---

## Prioritization tie-breakers (timeless)

1. Finish **in progress** execution-queue rows before starting new tracks
2. Close **Known Gaps** entries
3. Resolve **partial** rows on the active track before expanding catalog
4. **Foundation before expansion** — CI gates, install smoke, registry sync, contracts
5. **Planned** rows with defined scope in REVIEW_TODO/ROADMAP (skip reserved/TBD slots)
6. **Deferred / speculative** only when user explicitly wants R&D

When release is approaching, weight items that map to [DEPLOY.md](../../docs/DEPLOY.md) and ROADMAP release-readiness phases — read current phase name from ROADMAP, do not assume a fixed M-number.
