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

## Verification policy (maintainer contract)

Canonical detail: [docs/TESTING.md § Verification surfaces](./TESTING.md#verification-surfaces).

- **`apps/playground`** — monorepo smoke, **maintenance-only** (~10–20% focus). Optional `pnpm playground:dev`; category nav for quick scans. Do not build product UX here unless the PR explicitly targets `apps/playground/**`.
- **Consumer sandbox** — **consumer truth** (~80–90% focus) for CLI, registry, template, and install-artifact PRs. Manual checklist — not CI.
- **Playground dark/brand demos** — deferred; consumer UX belongs in sandbox/SaaS ([ROADMAP.md § Explicitly deferred](./ROADMAP.md#explicitly-deferred)).
- **Change workflow** — branch off `dev` → implement → docs alignment → PR to `dev` last; **`main` untouched** unless explicitly requested ([AGENTS.md § Change workflow](../AGENTS.md#change-workflow)).

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
- Broad UI render coverage: all 32 bundled components have render smoke tests
- Next.js App Router minimal scaffold (`neurex init next`; pinned Next.js 15.3.3)
- Remote registry manifest contract (`parseRemoteRegistry`, optional `styles`, local fallback)
- Governance CI promotion: semantic audit **`error`-severity** fails `pnpm tokens:governance:report` (`NEUREX_GOVERNANCE_POLICY`)
- `shadow.inner` inset slot model (branch+slot with `inset: true`)
- Style installation (token CSS wired into consumer project on `neurex init` / `neurex add`)
- Tailwind v4 + Vite or Next.js init sequence
- Registry validation and publish-safe template resolution
- Documentation alignment with current token/UI contracts (`docs/TOKENS.md`, design system, architecture, CLI, package READMEs)
- Tier 1 test coverage: CLI uninstall orphan cleanup, contrast failure codes + policy tiers, registry style sync helpers (`docs/TESTING.md`)
- Per-package `vitest.config.ts` for Vitest VS Code extension discovery (Vitest 4; no root workspace file)
- UI package polish (PR #24, `c619a85`): unified variant API, `danger` vocabulary, semantic opacity, viewport inset tokens, `pnpm ui:audit` ([UI_VARIANTS.md](./UI_VARIANTS.md))
- Post–PR #24 ship (PR #25, `af729d5`): CLI `--sync` / `--utilities`, overlay token semantics, blocking `ui:audit`, full variant token sweep ([UI_VARIANTS.md](./UI_VARIANTS.md), [CLI.md](./CLI.md))

The current implementation supports: Vite or Next.js App Router + React + Tailwind v4, `neurex init`, `neurex add`, `neurex update`, all 32 bundled components.

Known gaps below.

---

## P2 — Product and DX

### UI composition (Atomic Design)

Canonical layer model: [docs/ATOMIC_DESIGN.md](./ATOMIC_DESIGN.md). Roadmap sequencing:
[ROADMAP.md § UI composition](./ROADMAP.md#ui-composition--atomic-design-planned).

**Today:** atoms shipped (32 registry components + token CSS). Molecules, organisms,
and templates are composed manually in consumer apps (sandbox proves the gap).

**Target:** optional registry **blocks** so consumers can `neurex add` composed patterns
or still compose atoms only. **Higher blocks compose lower blocks** — atoms → molecules →
organisms → templates; no layer skipping. **`neurex add <block>` installs the full transitive
closure** (smaller blocks + atoms + npm deps + utilities + styles) via `registryDependencies`.

| Item | Layer     | Status  | Notes                                                                                       |
| ---- | --------- | ------- | ------------------------------------------------------------------------------------------- |
| AD.1 | All       | planned | Block metadata + compositional rules; direct `registryDependencies`; CLI transitive install |
| AD.2 | Molecules | planned | Pilot 2–3 items (e.g. form field row, menu trigger row)                                     |
| AD.3 | Organisms | planned | Pilot sidebar nav or settings panel from sandbox learnings                                  |
| AD.4 | Templates | planned | Dashboard layout shell; migrate sandbox layout CSS where appropriate                        |
| AD.5 | Pages     | n/a     | Document: pages stay consumer-owned; examples only in sandbox/docs                          |
| AD.6 | CLI       | planned | `list` / `add` UX for blocks category; docs in CLI.md                                       |
| AD.7 | CLI       | planned | Transitive install smoke tests (block → molecules → atoms); registry dep-graph validator    |

**In flight (atom layer, pre-M5):** Menu collision fix + Toast type surfaces on branch
`fix/sandbox-menu-toast-qa` — sandbox QA, not block delivery.

---

## P3 — Architecture Planning

Optional follow-ups after Phases 1–10 (detail in
[docs/RESOLVER_EVOLUTION.md — After Phase 10](./RESOLVER_EVOLUTION.md#after-phase-10)):

- Further expand `SEMANTIC_CONTRAST_PAIRS` (design sign-off per pair)
- DTCG composite object `$value` engine phase (option B — after slot model stable)
- Speculative AST evaluator and color/unit math — **deferred**, not scheduled

**Shipped in P3 pass:**

- ~~Extend composite registry beyond typography~~ — shadow/border schemas; elevation shadow pilot; `border.control` group
- ~~Contrast policy CI gate~~ — `contrast.policy.ts`; `governance:report` exits 1 on failures in CI
- ~~Overlay background compositing + overlay contrast pair~~ — compositing over `color.background.base`; `text-primary-on-overlay` pair
- ~~Build-failing contrast~~ — `validateContrastPolicyStrict` in `validateStyleTokenInput` (unless `NEUREX_CONTRAST_POLICY=report`)
- ~~Contrast pair expansion (partial)~~ — danger/secondary action + large-text heading pairs (15 pairs)
- ~~Full primitive shadow migration~~ — `shadow.0`–`shadow.6` branch+slot; elevation refs; CSS compose for primitive + semantic paths
- ~~Broad UI render coverage~~ — 32/32 components (M3.1)
- ~~Next.js scaffold~~ — `neurex init next` App Router minimal (M3.2)
- ~~Remote registry contract~~ — manifest parser + validation (M3.3)
- ~~Governance promotion (semantic audit errors)~~ — `NEUREX_GOVERNANCE_POLICY` (M3.4)
- ~~`shadow.inner` inset slot~~ — branch+slot + CSS compose (M3.5)
- ~~UI package polish~~ — PR #24 (`c619a85`): `variant`/`appearance`/`danger` API, 32-component token compliance, `pnpm ui:audit` ([UI_VARIANTS.md](./UI_VARIANTS.md))

## Known Gaps (no active item yet)

| Gap                                      | Notes                                                                                                                                                       |
| ---------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| CVA state helpers in consumer `utils.ts` | Shipped on installed `utils.ts` including `overlayPositionerSideOffset`. Refresh via `neurex update --utilities --sync`.                                    |
| Select popup overlap / scroll chrome     | Fixed in PR #25: `alignItemWithTrigger={false}` default, anchor-width popup, shared `size.overlay.list.maxHeight`, scroll arrows documented in UI_VARIANTS. |
| CLI diagnostic command tests             | Covered in `diagnostics.test.ts`.                                                                                                                           |
| Install-flow round-trip                  | Covered in `install-flow.test.ts`.                                                                                                                          |
| Remote registry signatures / allowlist   | Deferred post-M4 — manifest fetch is HTTPS-only; no checksum or host allowlist yet.                                                                         |
