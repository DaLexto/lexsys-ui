# Neurex Roadmap

**Audience:** Maintainers (tokens domain owners and monorepo maintainers)  
**Type:** Vision / strategy and roadmap/backlog  
**Status:** Tokens phases 1–10 complete; monorepo M1–M7 **planned** — not
current implementation contract  
**Source of truth for:** Long-term direction after the platform pass **and**
monorepo optimization sequencing  
**Verified against:** `packages/tokens/src/` and monorepo workspace layout

**Related docs:**

- `docs/TOKENS.md` - canonical current token rules and layer/reference contract
- `docs/REVIEW_TODO.md` - active actionable backlog and known gaps
- `docs/RESOLVER_EVOLUTION.md` - resolver-specific planned evolution
- `docs/SCRIPTS.md` - monorepo `pnpm` script names and sync workflows
- `docs/TESTING.md` - test coverage tiers and when-to-run checks
- `docs/DEPLOY.md` - release and build contract

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
  WCAG contrast) are available via `pnpm tokens:governance:report`.
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
| 9 — Resolved value pipeline | On-demand leaf resolution, themed lookup, color normalization for tooling              |
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

**Recently shipped (post–Phase 10 queue):**

- Build-failing contrast in `validateStyleTokenInput` (unless `NEUREX_CONTRAST_POLICY=report`)
- Full primitive shadow scale migration (`shadow.0`–`shadow.6` branch+slot) with CSS compose
- `shadow.inner` inset slot model (branch+slot with `inset: true`; CSS compose prepends `inset`)
- Semantic audit **`error`-severity** failures fail `pnpm tokens:governance:report` in CI (`NEUREX_GOVERNANCE_POLICY=ci`; override with `report`)
- Broad UI render coverage (32/32 components)
- Remote registry manifest contract (`parseRemoteRegistry`, optional `styles`, local fallback)
- Next.js App Router minimal scaffold (`neurex init next`; pinned Next.js 15.3.3)
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

## Monorepo optimization (planned)

Status: **planned** — not current implementation contract.  
Active execution queue: [`docs/REVIEW_TODO.md`](./REVIEW_TODO.md)  
Command details: [`docs/SCRIPTS.md`](./SCRIPTS.md) (link only — no script inventory here)

Balanced sequencing: **M1 infra → M2 quality → M3 product → M4 release → M5
advanced CI → M6 deps → M7 maintainer tooling**.

### Execution discipline

| Granularity       | Rule                                                                                                                     |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------ |
| Sub-item (`Mx.y`) | One conventional commit when done                                                                                        |
| Phase (`M1`–`M7`) | One implementation PR when all sub-items on the phase branch pass verification                                           |
| Post-phase        | Docs sync PR after merge if ROADMAP/REVIEW_TODO/handbooks lag (see [TESTING.md](./TESTING.md), [DEPLOY.md](./DEPLOY.md)) |

Branch per phase off `dev` (e.g. `chore/m1-infra-dx`). Record shipped implementation detail in git history, not in this section body.

### Phase overview

| Phase | Name                     | Status  | Outcome (summary)                                                                 | Primary docs                          |
| ----- | ------------------------ | ------- | --------------------------------------------------------------------------------- | ------------------------------------- |
| M1    | Infra and DX             | shipped | Filter fix, baseline CI (`pnpm check`), turbo inputs, DEPLOY/SCRIPTS alignment    | SCRIPTS.md, DEPLOY.md                 |
| M2    | Quality and verification | shipped | Tier 2 tests, playground build CI, consumer sandbox checklist                     | TESTING.md, AGENTS.md                 |
| M3    | Product and architecture | shipped | UI render 32/32, Next init, remote registry contract, governance + shadow.inner   | REVIEW_TODO.md, RESOLVER_EVOLUTION.md |
| M4    | Release readiness        | planned | CHANGELOG, versioning, publish flow (pre-0.1.0)                                   | DEPLOY.md                             |
| M5    | Advanced CI              | shipped | Path-filter jobs, `registry:check` on UI PRs, optional `pnpm audit`               | SCRIPTS.md, `.github/workflows/`      |
| M6    | Dependency hygiene       | shipped | Renovate/Dependabot, frozen lockfile policy, Node 24 alignment                    | DEPLOY.md                             |
| M7    | Maintainer and tooling   | shipped | CONTINUITY/README/CONTRIBUTING, eslint/tsconfig gaps, optional turbo remote cache | AGENTS.md, `.agent/CONTINUITY.md`     |

### M1 — Infra and DX

Status: shipped

#### M1.1 — Fix pnpm filter collision

- **Problem:** Root and `packages/cli` are both named `neurex`; `pnpm --filter neurex` matches both packages.
- **Target:** Standardize CLI root aliases to `pnpm --filter ./packages/cli …` in root `package.json`; update SCRIPTS.md and TESTING.md.
- **Verification:** `pnpm --filter ./packages/cli check` runs CLI package only — see [TESTING.md](./TESTING.md).

#### M1.2 — Add primary CI workflow

- **Problem:** Only token governance runs in CI today; SCRIPTS.md describes `pnpm check` as pre-merge gate without enforcement.
- **Target:** Add `.github/workflows/ci.yml` — `pull_request` and push to `dev`/`main`, Node 24, `pnpm install --frozen-lockfile`, `pnpm check`.
- **Verification:** CI green on phase branch; keep existing tokens-governance workflow for token paths.

#### M1.3 — Turbo cache hygiene

- **Target:** Add explicit `inputs` per task in `turbo.json` so cache invalidates on config and test file changes.
- **Verification:** `pnpm check` on phase branch.

#### M1.4 — Trim redundant CLI check work

- **Problem:** Turbo `check` already has `dependsOn: ["^build"]`, but CLI `check` also runs inline registry build.
- **Target:** Remove inline `@neurex/registry build` from CLI `check`; rely on turbo graph.
- **Verification:** `pnpm --filter ./packages/cli check`.

#### M1.5 — Docs and deploy contract cleanup

- **Target:** Remove stale placeholder lines in DEPLOY.md; document CI workflow in SCRIPTS.md; fix format:check stragglers blocking `pnpm check`.
- **Verification:** `pnpm check` repo-wide.

**Phase PR:** `chore(m1): infra and DX`  
**Post-merge docs:** ROADMAP status → shipped; REVIEW_TODO sync; SCRIPTS/DEPLOY if not in phase PR.

### M2 — Quality and verification

Status: shipped

#### M2.1 — Tier 2 CLI diagnostic tests

- **Target:** Tests for `doctor`, `status`, `list`, and `config` in `packages/cli/test/commands/`.
- **Verification:** `pnpm --filter ./packages/cli check` — see [TESTING.md](./TESTING.md).

#### M2.2 — Install round-trip smoke

- **Target:** Extend install-flow: `add` → `update --styles` → `uninstall` in temp-dir smoke test.
- **Verification:** `pnpm --filter ./packages/cli check`.

#### M2.3 — UI render batch

- **Target:** Render smoke tests for Toast, Select, Field, Switch, Tabs, Alert.
- **Verification:** `pnpm ui:check`.

#### M2.4 — Playground build in CI

- **Target:** Run `playground:build` in CI when `apps/playground/**` changes (minimal path filter).
- **Verification:** CI workflow on playground-touching changes.

#### M2.5 — Consumer sandbox checklist

- **Target:** Document maintainer verification against external consumer sandbox in TESTING.md and AGENTS.md (not CI).
- **Verification:** Docs only; `pnpm format:check`.

**Phase PR:** `test(m2): quality and verification`

### M3 — Product and architecture backlog

Status: shipped

#### M3.1 — Broad UI render coverage

- Render smoke tests for all 32 bundled components (DOM, className merge, key ARIA roles).

#### M3.2 — Next.js scaffold

- Minimal App Router starter via `neurex init next [directory]`; pinned Next.js 15.3.3; Tailwind v4 via PostCSS.

#### M3.3 — Remote registry contract

- Manifest parser (`{ version, items, styles? }` or legacy item array); validation parity with local registry; trust model documented in CLI.md and ARCHITECTURE.md.

#### M3.4 — Governance build promotion

- `NEUREX_GOVERNANCE_POLICY` tier (`report` / `ci`); semantic audit **`error`-severity** issues fail `pnpm tokens:governance:report` in CI.

#### M3.5 — Token engine items

- `shadow.inner` migrated to branch+slot with `inset: true`; CSS compose prepends `inset` in composed `box-shadow`.

**Phase PR:** `chore(m3): product and architecture backlog`

### M4 — Release readiness

Status: planned — when approaching first npm publish (`0.1.0`).

#### M4.1 — CHANGELOG

- Root `CHANGELOG.md` (Keep a Changelog) + pointer in DEPLOY.md.

#### M4.2 — Publish audit

- Align package versions, `exports`, and `files` fields.

#### M4.3 — Publish sequence

- Documented release sequence in DEPLOY.md.

**Phase PR:** `chore(m4): release readiness`

### M5 — Advanced CI

Status: shipped — prerequisite: M1 baseline `ci.yml` merged.

#### M5.1 — Path-filter job matrix

- Split checks by path: tokens, ui, registry, cli, playground, root config/docs.

#### M5.2 — Registry drift on UI PRs

- Ensure `registry:check` (includes template sync) runs on UI-touching PRs.

#### M5.3 — Optional security audit

- Non-blocking `pnpm audit --audit-level=high` job or weekly schedule; policy in DEPLOY.md.

**Phase PR:** `ci(m5): advanced path-filter workflow`

### M6 — Dependency hygiene

Status: shipped

#### M6.1 — Automated update PRs

- Dependabot or Renovate config; group related deps; weekly schedule.

#### M6.2 — Lockfile policy

- CI uses `pnpm install --frozen-lockfile`; document in DEPLOY.md.

#### M6.3 — Dependency audit

- Align peer deps (React 19), turbo pin vs semver range decision.

**Phase PR:** `chore(m6): dependency hygiene`

### M7 — Maintainer and tooling

Status: shipped

#### M7.1 — Agent continuity workflow

- Refresh CONTINUITY PLAN/PROGRESS when M-phases ship; point to ROADMAP for phase status.

#### M7.2 — Contributor onboarding

- README maintainer block; optional CONTRIBUTING.md linking git-commits rules.

#### M7.3 — ESLint / TypeScript gaps

- Audit playground coverage vs root eslint/tsconfig.base.json.

#### M7.4 — Turbo remote cache (optional)

- Document opt-in Vercel Remote Cache in DEPLOY.md; not required at current repo size.

**Phase PR:** `docs(m7): maintainer onboarding and tooling`

#### Post-M7 — GitHub label sync (shipped)

- Strict namespaced label manifest (`.github/labels.yml`) synced via `github-label-sync` and [`.github/workflows/labels-sync.yml`](../.github/workflows/labels-sync.yml).

### Explicitly deferred

| Item                              | Why deferred                                                                                                                                                                 |
| --------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `apps/docs` public docs site      | Placeholder only; `docs/*.md` + README sufficient pre-publish; revisit post-M4                                                                                               |
| Playground dark/brand demos       | Out of scope — playground is maintenance-only monorepo smoke; consumer UX belongs in sandbox/SaaS ([TESTING.md § Verification surfaces](./TESTING.md#verification-surfaces)) |
| `@vitest/ui` browser dashboard    | Decided overkill                                                                                                                                                             |
| Visual regression / screenshots   | Overkill for current coverage                                                                                                                                                |
| Changesets / npm provenance       | M4 release phase                                                                                                                                                             |
| Next.js scaffold, remote registry | **Shipped in M3** — `neurex init next`; remote manifest contract                                                                                                             |

### PR sequence

**Delivered (2026-05-22):** Phase 0 + **M1, M2, M5, M6, M7** shipped in one consolidated PR
[#18](https://github.com/DaLexto/neurex/pull/18) (`chore/monorepo-optimization` → `dev`) instead of
separate per-phase PRs. Commit discipline remained one commit per sub-item (`Mx.y`). **M3 shipped** in consolidated PR to `dev`. M4 remains planned.

| PR    | Phase | Title sketch                                        | Delivery                              |
| ----- | ----- | --------------------------------------------------- | ------------------------------------- |
| 0–7   | M1–M7 | `chore: monorepo optimization M1–M7` (consolidated) | **PR #18** — single PR                |
| 3a–3b | M3    | Product slices + docs sync                          | **shipped** (consolidated PR → `dev`) |
| 4a–4b | M4    | Release readiness + docs sync                       | planned                               |

Original per-phase sketch (reference if splitting future work):

| PR    | Phase   | Title sketch                                            |
| ----- | ------- | ------------------------------------------------------- |
| 0     | Phase 0 | `docs(roadmap): add monorepo optimization phases M1–M7` |
| 1a    | M1      | `chore(m1): infra and DX`                               |
| 1b    | M1      | `docs(roadmap): mark M1 shipped` (if needed)            |
| 2a    | M2      | `test(m2): quality and verification`                    |
| 2b    | M2      | `docs(testing): sync M2 coverage` (if needed)           |
| 5a–5b | M5      | Advanced CI + docs sync                                 |
| 6a–6b | M6      | Dependency hygiene + docs sync                          |
| 7a–7b | M7      | Maintainer tooling + docs sync                          |

### Verification gates

| Layer           | Command                                                                                        |
| --------------- | ---------------------------------------------------------------------------------------------- |
| Per sub-item    | Scoped `pnpm tokens:check`, `ui:check`, `registry:check`, `pnpm --filter ./packages/cli check` |
| Per phase       | Full `pnpm check` on phase branch                                                              |
| After UI/tokens | `pnpm sync:all && pnpm registry:check`                                                         |

---

## Document Ownership

- `docs/ROADMAP.md` owns long-term direction after the initial platform pass and
  monorepo optimization sequencing (M1–M7 section above).
- `docs/TOKENS.md` owns current token rules, layer definitions, and generated
  output contracts.
- `docs/REVIEW_TODO.md` owns actionable active work and known gaps.
- `docs/RESOLVER_EVOLUTION.md` owns resolver-specific target architecture.
- `docs/SCRIPTS.md` owns monorepo script names and sync workflows.
- `docs/TESTING.md` owns test coverage tiers and when-to-run checks.
- `docs/DEPLOY.md` owns release and build contract.
- `docs/UI_VARIANTS.md` owns the canonical UI variant prop contract and CVA rules.
- `docs/UI_AUDIT.md` owns the per-component compliance inventory.
- `docs/ATOMIC_DESIGN.md` owns the UI composition layer model (atoms → pages).

## UI polish track (post-M3)

Pre-0.1.0 hardening: unified `variant` / `size` / `appearance` API, `danger` vocabulary,
semantic opacity tokens, and `pnpm ui:audit` automation. See [UI_VARIANTS.md](./UI_VARIANTS.md)
and [UI_AUDIT.md](./UI_AUDIT.md). Sequenced PR0–PR4 on `dev`; breaking changes acceptable pre-publish.

---

## UI composition — Atomic Design (planned)

**Status:** planned — atoms shipped; higher layers are roadmap, not current contract.

Neurex UI follows [Atomic Design](https://atomicdesign.bradfrost.com/) layers:

| Layer     | Neurex today                            | Target                                              |
| --------- | --------------------------------------- | --------------------------------------------------- |
| Atoms     | Shipped (32 components + tokens + `cn`) | Maintain and extend                                 |
| Molecules | Consumer composes manually              | Optional registry blocks                            |
| Organisms | Consumer composes manually              | Optional registry blocks (e.g. sidebar, form shell) |
| Templates | Consumer layout CSS                     | Optional layout shells via registry                 |
| Pages     | Consumer-owned                          | Always consumer-owned                               |

Canonical mapping, compositional rules (blocks compose lower blocks), package boundaries,
and dual consumer paths: [ATOMIC_DESIGN.md](./ATOMIC_DESIGN.md).

### UI composition track (Atomic Design)

Status: **planned** — after current atom polish and sandbox QA fixes land on `dev`.

| Sub-item | Outcome                                                                               |
| -------- | ------------------------------------------------------------------------------------- |
| UC.1     | Block registry conventions, metadata shape, **compositional rules** (layer-only deps) |
| UC.2     | Pilot molecules (2–3 composed patterns)                                               |
| UC.3     | Pilot organism (sidebar or settings panel from sandbox)                               |
| UC.4     | Template shell + sandbox migration                                                    |
| UC.5     | CLI/docs UX for `neurex add` blocks                                                   |
| UC.6     | Transitive dependency install tests + registry dep-graph validation                   |

Execution queue: [REVIEW_TODO.md § UI composition](./REVIEW_TODO.md#ui-composition-atomic-design).

---

## Maintenance Workflow

- Update `docs/ROADMAP.md` when future direction or sequencing changes.
- When an M-phase ships: update phase **Status** row (`planned` → `shipped`) and
  sub-item notes briefly; record implementation detail in git, not roadmap body.
- Execution rhythm: one commit per `Mx.y` → one PR per phase → post-merge docs
  PR if ROADMAP/REVIEW_TODO/handbooks lag.
- Sync `docs/REVIEW_TODO.md` when M-phases start or finish.
- Update `docs/TOKENS.md` when current token behavior or enforced rules change.
- Record completed implementation details in git history, not in this roadmap
  body.
