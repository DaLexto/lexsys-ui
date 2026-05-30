# Lexsys Roadmap

**Audience:** Maintainers (tokens domain owners and monorepo maintainers)  
**Type:** Vision / strategy and roadmap/backlog  
**Status:** Tokens phases 1–10 complete; monorepo M1–M8, M10, M11 **shipped**; UI
composition pilots **shipped** (PR #28); `0.0.3` @ `next` **shipped** (2026-05-28 — token fixes, CardAction, Empty block); blocks/templates optimization **shipped** (BO.1–BO.7) — see phase tables below for current vs future work  
**Source of truth for:** Long-term direction after the platform pass **and**
monorepo optimization sequencing  
**Verified against:** `packages/tokens/src/` and monorepo workspace layout
**Last reviewed:** 2026-05-30

---

## On this page

- [Current State](#current-state)
- [Completed Platform Phases (1–10)](#completed-platform-phases-1-10)
- [Future Direction](#future-direction)
  - [Token engine — next direction](#token-engine-next-direction)
  - [Semantic and product gaps](#semantic-and-product-gaps)
- [Monorepo optimization](#monorepo-optimization)
  - [Execution discipline](#execution-discipline)
  - [Phase overview](#phase-overview)
  - [M1 — Infra and DX](#m1-infra-and-dx)
  - [M2 — Quality and verification](#m2-quality-and-verification)
  - [M3 — Product and architecture backlog](#m3-product-and-architecture-backlog)
  - [M4 — Entry + CLI DX](#m4-entry-cli-dx)
  - [M5 — Advanced CI](#m5-advanced-ci)
  - [M6 — Dependency hygiene](#m6-dependency-hygiene)
  - [M7 — Maintainer and tooling](#m7-maintainer-and-tooling)
  - [M12 — CLI command optimization](#m12-cli-command-optimization)
  - [M8 — CLI cleanup and deduplication](#m8-cli-cleanup-and-deduplication)
  - [M10 — Release readiness](#m10-release-readiness)
  - [Explicitly deferred](#explicitly-deferred)
  - [PR sequence](#pr-sequence)
  - [Verification gates](#verification-gates)
- [Document Ownership](#document-ownership)
- [UI polish track (post-M3)](#ui-polish-track-post-m3)
- [UI composition — three layers (pilots shipped)](#ui-composition-three-layers-pilots-shipped)
  - [UI composition track](#ui-composition-track)
- [M11 — Compound-first API](#m11-compound-first-api)
- [Component standardization (shipped)](#component-standardization-shipped)
- [Maintenance Workflow](#maintenance-workflow)

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

Canonical current rules and enforcement details live in `docs/reference/tokens/TOKENS.md`.

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
[Resolver evolution — After Phase 10](./reference/tokens/RESOLVER_EVOLUTION.md#after-phase-10).
Summary only — do not duplicate detail here.

**Planned (likely next):**

- Further expand `SEMANTIC_CONTRAST_PAIRS` (additional roles beyond the current 15-pair registry)

**Recently shipped (post–Phase 10 queue):**

- Build-failing contrast in `validateStyleTokenInput` (unless `LEXSYS_CONTRAST_POLICY=report`)
- Full primitive shadow scale migration (`shadow.0`–`shadow.6` branch+slot) with CSS compose
- `shadow.inner` inset slot model (branch+slot with `inset: true`; CSS compose prepends `inset`)
- Semantic audit **`error`-severity** failures fail `pnpm tokens:governance:report` in CI (`LEXSYS_GOVERNANCE_POLICY=ci`; override with `report`)
- Broad UI render coverage (42/42 primitives; M3 baseline was 32/32)
- Remote registry manifest contract (`parseRemoteRegistry`, optional `styles`, local fallback)
- Next.js App Router minimal scaffold (`lexsys init next`; pinned Next.js 15.3.3)
- `lexsys uninstall` metadata-driven removal with dry-run and conflict reporting
- UI render test pilot (`ScrollArea`, `Collapsible`, `Dialog`)

**Deferred (explicit non-goals for now):**

- DTCG composite object `$value` authoring on single leaves (deferred engine phase; branch+slot is current)
- AST expression evaluator and color/unit math (requires new subsystem — see RESOLVER_EVOLUTION)
- Automatic contrast pair discovery without an explicit registry
- Runtime accessibility checks in consumer apps
- Default CSS/DTCG output switching from `var(--lex-*)` refs to hardcoded literals

### Semantic and product gaps

- Stronger governance workflows around token ownership and change review
- Additional presets or CLI style aliases beyond `default` / `lexsys`

Active backlog items live in `docs/REVIEW_TODO.md`.

---

## Monorepo optimization

Status: **M1–M11 and M10 shipped**; **M12 planned** — see [Backlog execution queue](./REVIEW_TODO.md#execution-queue-active).  
Active execution queue: [`docs/REVIEW_TODO.md`](./REVIEW_TODO.md)  
Command details: [`docs/operations/SCRIPTS.md`](../operations/SCRIPTS.md) (link only — no script inventory here)

Balanced sequencing: **M1 infra → M2 quality → M3 product → M4 entry + CLI DX → M5
advanced CI → M6 deps → M7 maintainer tooling → … → M10 release**.

### Execution discipline

| Granularity        | Rule                                                                                                                                                  |
| ------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| Sub-item (`Mx.y`)  | One conventional commit when done                                                                                                                     |
| Phase (`M1`–`M10`) | One implementation PR when all sub-items on the phase branch pass verification                                                                        |
| Post-phase         | Docs sync PR after merge if ROADMAP/REVIEW_TODO/handbooks lag (see [Testing docs](../operations/TESTING.md), [Deploy guide](../operations/DEPLOY.md)) |

Branch per phase off `dev` (e.g. `chore/m1-infra-dx`). Record shipped implementation detail in git history, not in this section body.

### Phase overview

| Phase | Name                     | Status  | Outcome (summary)                                                                                 | Primary docs                          |
| ----- | ------------------------ | ------- | ------------------------------------------------------------------------------------------------- | ------------------------------------- |
| M1    | Infra and DX             | shipped | Filter fix, baseline CI (`pnpm check`), turbo inputs, DEPLOY/SCRIPTS alignment                    | SCRIPTS.md, DEPLOY.md                 |
| M2    | Quality and verification | shipped | Tier 2 tests, playground build CI, consumer sandbox checklist                                     | TESTING.md, AGENTS.md                 |
| M3    | Product and architecture | shipped | UI render 32/32, Next init, remote registry contract, governance + shadow.inner                   | REVIEW_TODO.md, RESOLVER_EVOLUTION.md |
| M4    | Entry + CLI DX           | shipped | `@dalexto/lexsys` entry package, CLI aliases/flags/guided modes/help redesign, src reorganization | CLI.md, DEPLOY.md                     |
| M5    | Advanced CI              | shipped | Path-filter jobs, `registry:check` on UI PRs, optional `pnpm audit`                               | SCRIPTS.md, `.github/workflows/`      |
| M6    | Dependency hygiene       | shipped | Renovate/Dependabot, frozen lockfile policy, Node 24 alignment                                    | DEPLOY.md                             |
| M7    | Maintainer and tooling   | shipped | README/CONTRIBUTING, agent skills, eslint/tsconfig gaps, optional turbo remote cache              | AGENTS.md, `.agents/skills/`          |
| M8    | CLI cleanup              | shipped | Dead export removal, `--yes` wiring, results merge, registry type unification, shared helpers     | CLI.md                                |
| M10   | Release readiness        | shipped | First npm `0.0.1` @ `next` (2026-05-24); Changesets + publish CI; `0.1.0` @ `latest` later        | DEPLOY.md                             |
| M12   | CLI command optimization | planned | Command audit, merge candidates, cleanup, UX polish — small PRs                                   | CLI.md, REVIEW_TODO.md                |

### M1 — Infra and DX

Status: shipped

#### M1.1 — Fix pnpm filter collision

- **Problem:** Root workspace and CLI package shared the name `lexsys`; `pnpm --filter lexsys` matched both.
- **Status (R0):** CLI npm name is `@dalexto/lexsys-cli`; root stays `lexsys`. Root scripts use `pnpm --filter ./packages/cli …`.

#### M1.2 — Add primary CI workflow

- **Problem:** Only token governance runs in CI today; SCRIPTS.md describes `pnpm check` as pre-merge gate without enforcement.
- **Target:** Add `.github/workflows/ci.yml` — `pull_request` and push to `dev`/`main`, Node 24, `pnpm install --frozen-lockfile`, `pnpm check`.
- **Verification:** CI green on phase branch; keep existing tokens-governance workflow for token paths.

#### M1.3 — Turbo cache hygiene

- **Target:** Add explicit `inputs` per task in `turbo.json` so cache invalidates on config and test file changes.
- **Verification:** `pnpm check` on phase branch.

#### M1.4 — Trim redundant CLI check work

- **Problem:** Turbo `check` already has `dependsOn: ["^build"]`, but CLI `check` also runs inline registry build.
- **Target:** Remove inline `@dalexto/lexsys-registry build` from CLI `check`; rely on turbo graph.
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
- **Verification:** `pnpm --filter ./packages/cli check` — see [Testing docs](../operations/TESTING.md).

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

- Minimal App Router starter via `lexsys init next [directory]`; pinned Next.js 15.3.3; Tailwind v4 via PostCSS.

#### M3.3 — Remote registry contract

- Manifest parser (`{ version, items, styles? }` or legacy item array); validation parity with local registry; trust model documented in CLI.md and ARCHITECTURE.md.

#### M3.4 — Governance build promotion

- `LEXSYS_GOVERNANCE_POLICY` tier (`report` / `ci`); semantic audit **`error`-severity** issues fail `pnpm tokens:governance:report` in CI.

#### M3.5 — Token engine items

- `shadow.inner` migrated to branch+slot with `inset: true`; CSS compose prepends `inset` in composed `box-shadow`.

**Phase PR:** `chore(m3): product and architecture backlog`

### M4 — Entry + CLI DX

Status: **shipped** — see [Backlog § M4](./REVIEW_TODO.md#m4--entry--cli-dx-shipped) for sub-item detail.

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

#### M7.1 — Agent and backlog handoff

- Session state via git + [Backlog](./REVIEW_TODO.md); point to ROADMAP for phase status.

#### M7.2 — Contributor onboarding

- README maintainer block; optional docs/contributors/CONTRIBUTING.md linking git-commits rules.

#### M7.3 — ESLint / TypeScript gaps

- Audit playground coverage vs root eslint/tsconfig.base.json.

#### M7.4 — Turbo remote cache (optional)

- Document opt-in Vercel Remote Cache in DEPLOY.md; not required at current repo size.

**Phase PR:** `docs(m7): maintainer onboarding and tooling`

#### Post-M7 — GitHub label sync (shipped)

- Strict namespaced label manifest (`.github/labels.yml`) synced via `github-label-sync` and [`.github/workflows/labels-sync.yml`](../.github/workflows/labels-sync.yml).

### M12 — CLI command optimization

Status: **planned** — backlog only; no implementation contract yet.

Post–M8 polish: command naming audit, overlapping-command merge candidates,
targeted cleanup, and UX improvements. Execute as **small–medium PRs** (one
M12.x item per PR). Track sub-items in [Backlog § M12](./REVIEW_TODO.md#m12--cli-command-optimization-planned).

| Item  | Focus                                     |
| ----- | ----------------------------------------- |
| M12.1 | Command name / alias audit                |
| M12.2 | Overlap analysis (merge vs keep separate) |
| M12.3 | Dead code and output deduplication        |
| M12.4 | Guided mode, flags, error hint polish     |
| M12.5 | Reserved for follow-up proposals          |

**Verification:** `pnpm cli:check` per sub-item; sandbox smoke when behavior changes.

---

### M8 — CLI cleanup and deduplication

Status: **shipped**

Dead-code removal and targeted deduplication across `packages/cli/src/`. No behavior changes except proper `--yes` wiring. Sub-items tracked in [Backlog § M8](./REVIEW_TODO.md#m8--cli-cleanup-and-deduplication-shipped).

| Item | Focus                                                                          |
| ---- | ------------------------------------------------------------------------------ |
| M8.1 | Remove unused exports + unreachable `index.ts` footer                          |
| M8.2 | Wire `--yes` flag in `add` / `update` commands                                 |
| M8.3 | Merge `install/results.ts` + `install/uninstall-results.ts`                    |
| M8.4 | Unify `RegistryCommandResult` / `RegistryProviderResult` + dedupe remote fetch |
| M8.5 | Extract shared `prompts` multiselect helper to `utils/prompt.ts`               |
| M8.6 | Extract shared scaffold helpers to `scaffold/scaffold-helpers.ts`              |

**Verification:** `pnpm cli:check` after each sub-item.

---

### M10 — Release readiness

Status: **shipped** (2026-05-24) — `@dalexto/lexsys-cli@0.0.1` and `@dalexto/lexsys-registry@0.0.1` on npm
dist-tag **`next`**. Stable MVP **`0.1.0`** on **`latest`** remains a later milestone.

**Publish-day checklist (canonical):** [Deploy guide § Pre-release gate](../operations/DEPLOY.md#pre-release-gate)

**Execution track:** [Backlog § M10](./REVIEW_TODO.md#m10--release-readiness-shipped-2026-05-24)

#### M10.0 — Publish scope and version lane

- npm packages: `@dalexto/lexsys-cli` + `@dalexto/lexsys-registry` only (not `@dalexto/lexsys-ui`, not `@dalexto/lexsys-tokens`)
- Version lane: `0.0.x` @ `next` → `0.1.0` @ `latest`

#### M10.1 — CHANGELOG

- Root `CHANGELOG.md` (Keep a Changelog) + pointer in DEPLOY.md.

#### M10.2 — Publish audit

- Align package versions, `exports`, and `files` fields.
- `pnpm publish:pack-audit` (pack tarball smoke).

#### M10.3 — Publish automation

- Changesets fixed group (`@dalexto/lexsys-cli` + `@dalexto/lexsys-registry`).
- GitHub Actions publish workflow; `NPM_TOKEN`; dist-tag **`next`**.

#### M10.4 — First publish

- Follow [Deploy guide § Pre-release gate](../operations/DEPLOY.md#pre-release-gate).
- Post-publish: `npx @dalexto/lexsys@next init vite` smoke.

**Phase PR:** `chore(m10): release readiness` (may split into M10.0–M10.3 PRs)

### Explicitly deferred

| Item                              | Why deferred                                                                                                                                                                               |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `apps/docs` public docs site      | Placeholder only; `docs/*.md` + README sufficient pre-publish; revisit post-M10                                                                                                            |
| Playground dark/brand demos       | Out of scope — playground is maintenance-only monorepo smoke; consumer UX belongs in sandbox/SaaS ([Testing docs § Verification surfaces](../operations/TESTING.md#verification-surfaces)) |
| `@vitest/ui` browser dashboard    | Decided overkill                                                                                                                                                                           |
| Visual regression / screenshots   | Overkill for current coverage                                                                                                                                                              |
| Changesets / npm provenance       | Changesets **shipped** (M10); npm provenance deferred                                                                                                                                      |
| Next.js scaffold, remote registry | **Shipped in M3** — `lexsys init next`; remote manifest contract                                                                                                                           |

### PR sequence

**Delivered (2026-05-22):** Phase 0 + **M1, M2, M5, M6, M7** shipped in one consolidated PR
[#18](https://github.com/DaLexto/lexsys-ui/pull/18) (`chore/monorepo-optimization` → `dev`) instead of
separate per-phase PRs. Commit discipline remained one commit per sub-item (`Mx.y`). **M3** and **M4** shipped in follow-up PRs to `dev`. **M10 shipped** (2026-05-24).

| PR      | Phase | Title sketch                                        | Delivery                              |
| ------- | ----- | --------------------------------------------------- | ------------------------------------- |
| 0–7     | M1–M7 | `chore: monorepo optimization M1–M7` (consolidated) | **PR #18** — single PR                |
| 3a–3b   | M3    | Product slices + docs sync                          | **shipped** (consolidated PR → `dev`) |
| 4a–4b   | M4    | Entry + CLI DX + docs sync                          | **shipped**                           |
| 10a–10b | M10   | Release readiness + docs sync                       | **shipped** (2026-05-24)              |

Original per-phase sketch (reference if splitting future work):

| PR    | Phase   | Title sketch                                             |
| ----- | ------- | -------------------------------------------------------- |
| 0     | Phase 0 | `docs(roadmap): add monorepo optimization phases M1–M10` |
| 1a    | M1      | `chore(m1): infra and DX`                                |
| 1b    | M1      | `docs(roadmap): mark M1 shipped` (if needed)             |
| 2a    | M2      | `test(m2): quality and verification`                     |
| 2b    | M2      | `docs(testing): sync M2 coverage` (if needed)            |
| 5a–5b | M5      | Advanced CI + docs sync                                  |
| 6a–6b | M6      | Dependency hygiene + docs sync                           |
| 7a–7b | M7      | Maintainer tooling + docs sync                           |

### Verification gates

| Layer           | Command                                                                                        |
| --------------- | ---------------------------------------------------------------------------------------------- |
| Per sub-item    | Scoped `pnpm tokens:check`, `ui:check`, `registry:check`, `pnpm --filter ./packages/cli check` |
| Per phase       | Full `pnpm check` on phase branch                                                              |
| After UI/tokens | `pnpm sync:all && pnpm registry:check`                                                         |

---

## Document Ownership

- `docs/ROADMAP.md` owns long-term direction after the initial platform pass and
  monorepo optimization sequencing (M1–M10 section above).
- `docs/reference/tokens/TOKENS.md` owns current token rules, layer definitions, and generated
  output contracts.
- `docs/REVIEW_TODO.md` owns actionable active work and known gaps.
- `docs/reference/tokens/RESOLVER_EVOLUTION.md` owns resolver-specific target architecture.
- `docs/operations/SCRIPTS.md` owns monorepo script names and sync workflows.
- `docs/operations/TESTING.md` owns test coverage tiers and when-to-run checks.
- `docs/operations/DEPLOY.md` owns release and build contract.
- `docs/reference/ui/UI_VARIANTS.md` owns the canonical UI variant prop contract and CVA rules.
- `docs/reference/ui/UI_AUDIT.md` owns the per-component compliance inventory.
- `docs/reference/ui/UI_COMPOSITION.md` owns the UI composition model (primitives → blocks → templates → pages).

## UI polish track (post-M3)

Pre-0.1.0 hardening: unified `variant` / `size` / `appearance` API, `danger` vocabulary,
semantic opacity tokens, and `pnpm ui:audit` automation. See [UI variants](./reference/ui/UI_VARIANTS.md)
and [UI audit](./reference/ui/UI_AUDIT.md). Sequenced PR0–PR4 on `dev`; breaking changes acceptable pre-publish.

---

## UI composition — three layers (pilots shipped)

**Status:** **PR #28** merged to `dev`. Monorepo reference layout uses
`primitives/`, `blocks/`, and `templates/`; consumer install stays flat under
`paths.components` (`src/components/ui/<CanonicalName>/` with import rewrite).
Blocks (FormField, SettingsPanel, Sidebar, AuthForm, CommandPalette, Empty) and template (DashboardShell) are registry +
CLI installable — **optimization pass complete** (BO.1–BO.7; CI install smoke, render tests, registry template-import audit).

Lexsys uses a **three-layer** install model (not Atomic Design atoms/molecules/organisms in docs or CLI):

| Layer      | Monorepo reference                                                 | Consumer install (`lexsys add`)               |
| ---------- | ------------------------------------------------------------------ | --------------------------------------------- |
| Primitives | Shipped (41 components + tokens + `cn`)                            | `src/components/ui/<CanonicalName>/`          |
| Blocks     | FormField, SettingsPanel, Sidebar, AuthForm, CommandPalette, Empty | Same flat path; cross-layer imports rewritten |
| Templates  | Pilot (DashboardShell)                                             | Same flat path                                |
| Pages      | —                                                                  | Always consumer-owned                         |

Canonical mapping, composition rules, folder layout, and CLI contract:
[UI composition](./reference/ui/UI_COMPOSITION.md).

### UI composition track

| Step | Outcome                                                                                        | Status            |
| ---- | ---------------------------------------------------------------------------------------------- | ----------------- |
| 1    | Layer docs + registry composition validators                                                   | **shipped**       |
| 2    | Monorepo `primitives/blocks/templates` + flat CLI install (`paths.components`, import rewrite) | **shipped** (#28) |
| 3    | Pilot blocks + template + CI verify (install smoke, render tests)                              | **shipped**       |
| 4    | Blocks/templates optimization (BO.1–BO.7)                                                      | **shipped**       |
| 5    | Additional blocks/templates beyond pilot set                                                   | planned           |
| 6    | Base UI primitive expansion (Autocomplete … PreviewCard)                                       | **shipped** (#30) |

**Optimization context:** Consumer sandbox QA (PulseDesk) found mobile Sidebar nav
layout issues and invalidated “primitives-ready → blocks-ready” without integration
testing. BO.1–BO.7 fixed; narrow-viewport sandbox checklist remains manual ([Testing docs](../operations/TESTING.md)).
Tracked in [Backlog § Blocks/templates optimization](./REVIEW_TODO.md#blocks--templates-optimization-backlog).

Execution queue: [Backlog § UI composition](./REVIEW_TODO.md#ui-composition-primitives-blocks-templates).

---

## M11 — Compound-first API

**Status:** shipped on `dev` (merged [PR #34](https://github.com/DaLexto/lexsys-ui/pull/34), 2026-05-24)

**Goal:** 100% compound-first installable API — named slot parts, no config blobs
(`items[]`, `mode`-driven auto-fields), full Base UI part re-exports where
applicable, blocks compose primitives/blocks only.

Canonical contract: [UI composition § Compound-first contract](./reference/ui/UI_COMPOSITION.md#compound-first-contract).

| Phase | Outcome                                                        | Status  |
| ----- | -------------------------------------------------------------- | ------- |
| 0     | Governance docs, CHANGELOG breaking stub, REVIEW_TODO UC.7     | shipped |
| 1A    | Unbundle Switch, Slider, Progress, Checkbox sub-parts          | shipped |
| 1B    | Autocomplete/Combobox/Menu/Drawer Base UI export gaps          | shipped |
| 2     | FormField + AuthForm compound; FieldControl fix                | shipped |
| 3     | Sidebar full compound API                                      | shipped |
| 4     | CommandPalette compound parts                                  | shipped |
| 5     | SettingsPanel + DashboardShell compound                        | shipped |
| 6     | Sandbox migration (compound-only pages)                        | shipped |
| 7     | Tests, registry sync, version bumps to `0.0.2`, docs alignment | shipped |

**Delivered:** compound-first installable API on `dev` — branch `feat/compound-first-api`
merged via PR #34. See [UI catalog](./reference/ui/UI_CATALOG.md) for the post-M11 inventory.

---

## Component standardization (shipped)

**Status:** shipped — CS.1–CS.8 all complete.

**Delivered:** canonical authoring patterns for primitives, blocks, and templates —
CVA vs `*Classes()`, props/ref/className standards, compound API consistency,
`lex-` CSS var prefix with rebrand script, `$ui-authoring` hub skill, and
`ui-component-authoring.mdc` Cursor rule.

Execution queue: [Backlog § CS](./REVIEW_TODO.md#cs--component-standardization).

Canonical docs:
[UI reference](./reference/ui/UI.md),
[UI variants](./reference/ui/UI_VARIANTS.md),
[UI composition](./reference/ui/UI_COMPOSITION.md).

---

## Maintenance Workflow

- Update `docs/ROADMAP.md` when future direction or sequencing changes.
- When an M-phase ships: update phase **Status** row (`planned` → `shipped`) and
  sub-item notes briefly; record implementation detail in git, not roadmap body.
- Execution rhythm: one commit per `Mx.y` → one PR per phase → post-merge docs
  PR if ROADMAP/REVIEW_TODO/handbooks lag.
- Sync `docs/REVIEW_TODO.md` when M-phases start or finish.
- Update `docs/reference/tokens/TOKENS.md` when current token behavior or enforced rules change.
- Record completed implementation details in git history, not in this roadmap
  body.

---

## Related documentation

- [Backlog](REVIEW_TODO.md) — active execution queue
- [Tokens reference](reference/tokens/TOKENS.md) — current token rules
- [Resolver evolution](reference/tokens/RESOLVER_EVOLUTION.md) — deferred resolver work
- [Scripts reference](operations/SCRIPTS.md) — monorepo commands
- [Deploy guide](operations/DEPLOY.md) — release contract
