# Project next steps — procedures

Timeless probes for **`$project-next-steps`**. Active backlog lives in
[docs/REVIEW_TODO.md](../../docs/REVIEW_TODO.md) and [docs/ROADMAP.md](../../docs/ROADMAP.md) —
do not duplicate queue items here.

**Run commands only when the user asks** — otherwise suggest them in the output.

---

## Quick snapshot script

When the user wants a fast backlog extract (optional):

```sh
node .cursor/skills/project-next-steps/scripts/backlog-snapshot.mjs
```

Paste stdout into **Project snapshot**. The script is read-only; REVIEW_TODO remains source of truth.

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

## Post-queue mode

When execution-queue rows are mostly `shipped` / `done` and only `planned` remains (e.g. M12, SI):

1. **Known Gaps** — primary signal (open regardless of phase status)
2. **Planned track items** — follow dependency order (e.g. SI.4 before SI.5)
3. **Next release milestone** — REVIEW_TODO § M10 "Next milestone" line when publish is near
4. **Reserved / TBD ROADMAP phases** — do not treat as urgent until defined
5. **Catalog expansion** — deprioritize until foundation rows close
6. **Cleanup** — [§ Cleanup signal probes](#cleanup-signal-probes) when user wants debt candidates

---

## Doc health grep (generic)

Suggest the user run from repo root when checking drift — adjust patterns as catalog evolves:

```sh
rg "in progress|partial|planned|deferred|shipped" docs/REVIEW_TODO.md docs/ROADMAP.md
rg "^## (Execution Queue|Known Gaps)" docs/REVIEW_TODO.md
rg "\bprimitives?\b|\binstallable\b" docs README.md packages/ui/README.md
```

Interpret hits in context. `shipped` in phase tables is expected.

If docs disagree with code, flag drift and use **`$docs-authoring`** ([alignment](../docs-authoring/procedures.md#alignment)) before feature recommendations.

---

## Layer spot-checks (by track)

Probe only layers tied to candidate next steps. Listed `pnpm` commands are **suggestions for the user** (or via **`$monorepo-verify-gate`** / **`$agent-workflow`**) — do not run during analysis unless they ask.

### Tokens

- `pnpm tokens:check`
- `pnpm tokens:governance:report` when governance is relevant
- Rules: [docs/reference/tokens/TOKENS.md](../../docs/reference/tokens/TOKENS.md)

### UI + registry

- Catalog layout: `packages/ui/src/` (primitives, blocks, templates)
- `pnpm registry:check` — templates match UI
- `pnpm ui:audit` when variant/token compliance is in scope

### CLI + consumer path

- `pnpm cli:check` (ESLint + types — catches unused imports/vars)
- Tests under `packages/cli/test/`
- Install verification: [docs/operations/TESTING.md](../../docs/operations/TESTING.md)

### Composition (blocks / templates)

- Open rows in REVIEW_TODO composition / optimization sections (not hardcoded IDs)
- Missing verification gates called out in Known Gaps
- Point to **`$monorepo-verify-gate`** when recommending install-artifact work

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

## Cleanup signal probes

Suggest these when the execution queue is empty or when the user asks for cleanup.
Interpret hits in context — not every match is a problem. **Do not run unless the user asks.**

```sh
# Stale version numbers in doc headers
rg "0\.0\.[0-9]" docs/ROADMAP.md docs/REVIEW_TODO.md docs/operations/DEPLOY.md

# Status labels that may need doc closure
rg "\(in progress\)" docs/REVIEW_TODO.md docs/ROADMAP.md

# Duplicate exported type names in CLI (manual review of hits)
rg "^(export )?(interface|type) [A-Z]" packages/cli/src/ -g "*.ts" -h | sort | uniq -d

# Scaffold duplication hints
rg "^const write|^export const write" packages/cli/src/scaffold/ -g "*.ts"

# Leftover TODO / FIXME / HACK in CLI source
rg "TODO|FIXME|HACK" packages/cli/src/ -g "*.ts"

# Unused code / lint — prefer package check over rg heuristics
pnpm cli:check
```

**Dead exports:** `rg` alone cannot prove unused exports; suggest `pnpm cli:check` or dedicated tooling (e.g. ts-prune) if the user wants a deeper pass.

---

## Prioritization

Apply in order (read **current** queue from REVIEW_TODO each time):

1. Finish **in progress** execution-queue rows — do not start parallel tracks
2. Close **Known Gaps** entries (non-deferred)
3. Resolve **partial** rows on the active track before catalog expansion
4. **Foundation before expansion** — CI gates, install smoke, registry sync, contracts
5. **Planned** rows with defined scope — skip reserved/TBD phases until ROADMAP defines them
6. **Deferred / speculative** last — only if user explicitly wants R&D

**High leverage** (prefer when multiple options exist):

- Closes an **in progress** or **partial** REVIEW_TODO row
- Adds a **missing verification gate** named in Known Gaps or TESTING.md
- Fixes **doc/code drift** that misroutes future agents
- Advances **release readiness** per current ROADMAP + DEPLOY.md (when publish is near)

**Low leverage** (deprioritize unless requested):

- New catalog items while active track has open partial rows
- Playground product UX (maintenance-only per TESTING.md)
- Rewrites without broken architecture contracts
- Re-doing work marked **shipped** in REVIEW_TODO or ROADMAP

When release is approaching, weight items that map to [DEPLOY.md](../../docs/operations/DEPLOY.md) and ROADMAP release-readiness phases — read the current phase name from ROADMAP; do not assume a fixed M-number.
