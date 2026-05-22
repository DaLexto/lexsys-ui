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
- Semantic token organization (elevation group, theme path alignment, feedback wiring, semantic audit)
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

### TODO: Turn resolver roadmap into an implementation plan

**Problem:**

`docs/RESOLVER_EVOLUTION.md` captures long-term resolver capabilities (AST
evaluation, color math, contrast diagnostics, composite expansion, metadata
propagation) but it is not sequenced into implementable phases beyond the work
already shipped (layer validation and governance reports).

**Direction:**

- Review `docs/RESOLVER_EVOLUTION.md` against the current
  `packages/tokens/src/resolver/` and generator architecture.
- Split the vision into phases: what extends the current resolver, what needs a
  new subsystem, what is speculative.
- Keep speculative items (AST evaluator, color math engine) clearly separated
  from near-term work.
- Update `docs/RESOLVER_EVOLUTION.md` with the phased plan once sequencing is
  decided.

**Status:** Not started. Layer validation and governance reporting are already
implemented; this item covers the remaining resolver evolution only.

---

## Known Gaps (no active item yet)

| Gap                                   | Notes                                                                              |
| ------------------------------------- | ---------------------------------------------------------------------------------- |
| `neurex uninstall` not implemented    | Command exists in CLI surface but has no behavior. Tracked in `docs/CLI.md`.       |
| No render tests for UI components     | Only CVA class output is tested. No `@testing-library/react` coverage.             |
| Next.js and other framework scaffolds | `neurex init` only supports Vite. Other frameworks are not detected or scaffolded. |
| Remote registry manifest contract     | Remote registry format and trust model are not finalized.                          |
