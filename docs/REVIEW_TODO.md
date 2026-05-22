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
- Token platform phases 1–5 (factory authoring, layer validation, governance reports)
- Semantic token organization (elevation group, theme path alignment, feedback wiring, semantic audit, component size/spacing semantic migration)
- Style installation (token CSS wired into consumer project on `neurex init` / `neurex add`)
- Tailwind v4 + Vite init sequence
- Registry validation and publish-safe template resolution
- Documentation alignment with current token/UI contracts (`docs/TOKENS.md`, design system, architecture, CLI, package READMEs)
- Resolver evolution phased plan (`docs/RESOLVER_EVOLUTION.md` — Phases 7–10 + speculative)

The current implementation supports: Vite + React + Tailwind v4, `neurex init`, `neurex add`, `neurex update`, all 31 bundled components.

Known gaps below.

---

## P2 — Product and DX

_No active P2 items._

---

## P3 — Architecture Planning

_No active P3 items. Resolver evolution is sequenced in `docs/RESOLVER_EVOLUTION.md` (Phase 7 governance hardening through Phase 10 accessibility guard, plus deferred speculative AST/math)._

## Known Gaps (no active item yet)

| Gap                                   | Notes                                                                              |
| ------------------------------------- | ---------------------------------------------------------------------------------- |
| `neurex uninstall` not implemented    | Command exists in CLI surface but has no behavior. Tracked in `docs/CLI.md`.       |
| No render tests for UI components     | Only CVA class output is tested. No `@testing-library/react` coverage.             |
| Next.js and other framework scaffolds | `neurex init` only supports Vite. Other frameworks are not detected or scaffolded. |
| Remote registry manifest contract     | Remote registry format and trust model are not finalized.                          |
