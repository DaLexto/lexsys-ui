# Neurex Backlog

**Audience:** Maintainers
**Type:** Roadmap / backlog
**Source of truth for:** Active work items, known gaps, next priorities

Long-term tokens platform direction lives in [docs/ROADMAP.md](./ROADMAP.md).

Completed work is tracked in git history. This document only contains items
that are not yet done.

---

## Current State

The P0 and P1 implementation passes are complete:

- CLI install safety (idempotency, conflict detection, `--cwd` scoping, packed template resolution)
- Token foundation (DTCG-shaped source, CSS + DTCG JSON generation, brand layer, theme modes)
- Token platform phases 1–10 (factory authoring through accessibility contrast guard; see [docs/ROADMAP.md](./ROADMAP.md))
- Token engine: resolved value pipeline, composite typography + shadow/border registry, governance graph, WCAG contrast report + CI policy (`docs/RESOLVER_EVOLUTION.md`)
- Post–Phase 10 hardening: contrast pair registry (11 pairs including overlay); background compositing; `rgb()` / `hsl()` parsing for contrast math (`engine/shared/color-string.parse.ts`); composite shadow pilot on `elevation.shadow.floating` / `raised`
- Style installation (token CSS wired into consumer project on `neurex init` / `neurex add`)
- Tailwind v4 + Vite init sequence
- Registry validation and publish-safe template resolution
- Documentation alignment with current token/UI contracts (`docs/TOKENS.md`, design system, architecture, CLI, package READMEs)

The current implementation supports: Vite + React + Tailwind v4, `neurex init`, `neurex add`, `neurex update`, all 31 bundled components.

Known gaps below.

---

## P2 — Product and DX

_No active P2 items._

---

## P3 — Architecture Planning

Optional follow-ups after Phases 1–10 (detail in
[docs/RESOLVER_EVOLUTION.md — After Phase 10](./RESOLVER_EVOLUTION.md#after-phase-10)):

- Further expand `SEMANTIC_CONTRAST_PAIRS` (danger-action patterns, large-text roles)
- Promote contrast to build-failing (`build` tier in `validateStyleTokenInput`)
- Full shadow primitive migration and slot-based `box-shadow` CSS composition
- DTCG composite object `$value` engine phase (option B — after slot model stable)
- Speculative AST evaluator and color/unit math — **deferred**, not scheduled

**Shipped in P3 pass:**

- ~~Extend composite registry beyond typography~~ — shadow/border schemas; elevation shadow pilot; `border.control` group
- ~~Contrast policy CI gate~~ — `contrast.policy.ts`; `governance:report` exits 1 on failures in CI
- ~~Overlay background compositing + overlay contrast pair~~ — compositing over `color.background.base`; `text-primary-on-overlay` pair

## Known Gaps (no active item yet)

| Gap                                   | Notes                                                                              |
| ------------------------------------- | ---------------------------------------------------------------------------------- |
| `neurex uninstall` not implemented    | Command exists in CLI surface but has no behavior. Tracked in `docs/CLI.md`.       |
| No render tests for UI components     | Only CVA class output is tested. No `@testing-library/react` coverage.             |
| Next.js and other framework scaffolds | `neurex init` only supports Vite. Other frameworks are not detected or scaffolded. |
| Remote registry manifest contract     | Remote registry format and trust model are not finalized.                          |
