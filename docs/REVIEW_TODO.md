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
- Token engine: resolved value pipeline, composite typography, governance graph, WCAG contrast report (`docs/RESOLVER_EVOLUTION.md`)
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

- Expand `SEMANTIC_CONTRAST_PAIRS` and agree contrast policy (thresholds, build-failing vs report-only)
- Extend composite registry beyond typography
- Broader color parsing for contrast math (`rgb()`, `hsl()`)
- Speculative AST evaluator and color/unit math — **deferred**, not scheduled

## Known Gaps (no active item yet)

| Gap                                   | Notes                                                                              |
| ------------------------------------- | ---------------------------------------------------------------------------------- |
| `neurex uninstall` not implemented    | Command exists in CLI surface but has no behavior. Tracked in `docs/CLI.md`.       |
| No render tests for UI components     | Only CVA class output is tested. No `@testing-library/react` coverage.             |
| Next.js and other framework scaffolds | `neurex init` only supports Vite. Other frameworks are not detected or scaffolded. |
| Remote registry manifest contract     | Remote registry format and trust model are not finalized.                          |
