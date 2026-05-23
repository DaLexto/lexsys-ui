# Neurex Backlog

**Audience:** Maintainers
**Type:** Roadmap / backlog
**Source of truth for:** Active work items, known gaps, next priorities

Long-term tokens platform direction lives in [docs/ROADMAP.md](./ROADMAP.md).

Completed work is tracked in git history. This document only contains items
that are not yet done.

---

## Execution Queue (active)

**Monorepo optimization M1–M7** — see [ROADMAP.md § Monorepo optimization](./ROADMAP.md#monorepo-optimization-planned). Delivered in **one consolidated PR** (`chore/monorepo-optimization` → `dev`); M3–M4 remain planned.

| Phase   | Focus                                                    | Status  |
| ------- | -------------------------------------------------------- | ------- |
| Phase 0 | ROADMAP + REVIEW_TODO publish                            | done    |
| M1      | Infra and DX (filter, CI, turbo, docs)                   | shipped |
| M2      | Quality (Tier 2 tests, playground CI, sandbox checklist) | shipped |
| M5      | Advanced CI (path filters, registry:check on UI PRs)     | shipped |
| M6      | Dependency hygiene (Dependabot, lockfile policy)         | shipped |
| M7      | Maintainer tooling (CONTINUITY, README, CONTRIBUTING)    | shipped |

Previous queue (**E → A → C → B → Docs**) — completed 2026-05-23.

---

## Current State

The P0 and P1 implementation passes are complete:

- CLI install safety (idempotency, conflict detection, `--cwd` scoping, packed template resolution)
- Token foundation (DTCG-shaped source, CSS + DTCG JSON generation, brand layer, theme modes)
- Token platform phases 1–10 (factory authoring through accessibility contrast guard; see [docs/ROADMAP.md](./ROADMAP.md))
- Token engine: resolved value pipeline, composite typography + shadow/border registry, governance graph, WCAG contrast report + CI policy (`docs/RESOLVER_EVOLUTION.md`)
- Post–Phase 10 hardening: contrast pair registry (15 pairs); background compositing; `rgb()` / `hsl()` parsing; build-failing contrast in CSS build; primitive shadow scale `0`–`6` on branch+slot with CSS compose; elevation shadows reference primitive slots
- ScrollArea component (UI, tokens, registry, playground) merged via PR #14 (`884e3eb`)
- `neurex uninstall` removes registry-owned files with dry-run and conflict reporting
- UI render test pilot: ScrollArea, Collapsible, Dialog (`@testing-library/react` + Vitest jsdom)
- Style installation (token CSS wired into consumer project on `neurex init` / `neurex add`)
- Tailwind v4 + Vite init sequence
- Registry validation and publish-safe template resolution
- Documentation alignment with current token/UI contracts (`docs/TOKENS.md`, design system, architecture, CLI, package READMEs)
- Tier 1 test coverage: CLI uninstall orphan cleanup, contrast failure codes + policy tiers, registry style sync helpers (`docs/TESTING.md`)
- Per-package `vitest.config.ts` for Vitest VS Code extension discovery (Vitest 4; no root workspace file)

The current implementation supports: Vite + React + Tailwind v4, `neurex init`, `neurex add`, `neurex update`, all 32 bundled components.

Known gaps below.

---

## P2 — Product and DX

_No active P2 items._

---

## P3 — Architecture Planning

Optional follow-ups after Phases 1–10 (detail in
[docs/RESOLVER_EVOLUTION.md — After Phase 10](./RESOLVER_EVOLUTION.md#after-phase-10)):

- Further expand `SEMANTIC_CONTRAST_PAIRS` (design sign-off per pair)
- Governance promotion to build-failing checks (maintainer policy choice)
- Inset / multi-layer shadow improvements (`shadow.inner` flat string today)
- DTCG composite object `$value` engine phase (option B — after slot model stable)
- Speculative AST evaluator and color/unit math — **deferred**, not scheduled

**Shipped in P3 pass:**

- ~~Extend composite registry beyond typography~~ — shadow/border schemas; elevation shadow pilot; `border.control` group
- ~~Contrast policy CI gate~~ — `contrast.policy.ts`; `governance:report` exits 1 on failures in CI
- ~~Overlay background compositing + overlay contrast pair~~ — compositing over `color.background.base`; `text-primary-on-overlay` pair
- ~~Build-failing contrast~~ — `validateContrastPolicyStrict` in `validateStyleTokenInput` (unless `NEUREX_CONTRAST_POLICY=report`)
- ~~Contrast pair expansion (partial)~~ — danger/secondary action + large-text heading pairs (15 pairs)
- ~~Full primitive shadow migration~~ — `shadow.0`–`shadow.6` branch+slot; elevation refs; CSS compose for primitive + semantic paths

## Known Gaps (no active item yet)

| Gap                                   | Notes                                                                                     |
| ------------------------------------- | ----------------------------------------------------------------------------------------- |
| No broad UI render test coverage      | Expanded batch shipped; remaining components still CVA-only. **M3.1**                     |
| CLI diagnostic command tests          | Covered in `diagnostics.test.ts`.                                                         |
| Install-flow round-trip               | Covered in `install-flow.test.ts`.                                                        |
| Next.js and other framework scaffolds | `neurex init` only supports Vite. **Scheduled: ROADMAP M3.2**                             |
| Remote registry manifest contract     | Remote registry format and trust model are not finalized. **M3.3**                        |
| Governance promotion                  | Selected governance checks are report-only; build-failing promotion is optional. **M3.4** |
| `shadow.inner` inset authoring        | Flat CSS string leaf; no inset slot model yet. **M3.5**                                   |
