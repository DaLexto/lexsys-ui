# Neurex Backlog

**Audience:** Maintainers
**Type:** Roadmap / backlog
**Source of truth for:** Active work items, known gaps, next priorities

Long-term tokens platform direction lives in [docs/ROADMAP.md](./ROADMAP.md).

Completed work is tracked in git history. This document only contains items
that are not yet done.

---

## Execution Queue (active)

Order: **E → A → C → B → Docs alignment** — **completed** (2026-05-23).

| Step | Track            | Goal                                                                  | Status |
| ---- | ---------------- | --------------------------------------------------------------------- | ------ |
| E    | Hygiene          | Refresh agent/backlog state after PR #14; fix stale counts            | done   |
| A    | Tokens hardening | Full primitive shadow slot migration + contrast/governance follow-ups | done   |
| C    | Quality          | UI render tests (pilot components)                                    | done   |
| B    | CLI product      | Implement `neurex uninstall`                                          | done   |
| Docs | Alignment pass   | Sync ROADMAP, RESOLVER_EVOLUTION, rules, cross-links                  | done   |

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

| Gap                                   | Notes                                                                              |
| ------------------------------------- | ---------------------------------------------------------------------------------- |
| No broad UI render test coverage      | Pilot only (ScrollArea, Collapsible, Dialog). Most components still use CVA tests. |
| CLI diagnostic command tests          | `doctor`, `status`, `list`, and `config` have no dedicated tests yet.              |
| Install-flow round-trip               | `add` → `update` → `uninstall` not covered end-to-end in temp-dir smoke tests.     |
| Next.js and other framework scaffolds | `neurex init` only supports Vite. Other frameworks are not detected or scaffolded. |
| Remote registry manifest contract     | Remote registry format and trust model are not finalized.                          |
| Governance promotion                  | Selected governance checks are report-only; build-failing promotion is optional.   |
| `shadow.inner` inset authoring        | Flat CSS string leaf; no inset slot model yet.                                     |
