# Neurex Deploy Guide

## Purpose

This document defines the current build and release expectations for the `neurex` monorepo.

The repository is still early-stage, so this guide focuses on build artifacts and publish-readiness rules more than on a finalized release pipeline.

---

## Monorepo Build Model

The repository uses:

- `pnpm` workspaces
- `turbo` task orchestration
- per-package TypeScript builds

Workspace layout:

```txt
apps/*
packages/*
```

Root scripts (full reference: [SCRIPTS.md](./SCRIPTS.md)):

- `pnpm build`
- `pnpm check`
- `pnpm typecheck`
- `pnpm lint`
- `pnpm test`

---

## Package Build Contract

Each publish-oriented package should build from `src/` into `dist/`.

Rules:

- `src/` is source only
- `dist/` is the distributable output
- package `exports` must point to `dist`
- publishable files must be explicit in `package.json`

Current package roles:

- `packages/ui` -> reference component package
- `packages/registry` -> registry metadata and templates
- `packages/cli` -> executable installer
- `packages/tokens` -> token source and generated style outputs

---

## Required Checks Before Release

Before any release or publish attempt, run:

```bash
pnpm check
```

See [SCRIPTS.md](./SCRIPTS.md) for per-package build and verify commands.

CI runs `pnpm check` on pull requests and pushes to `dev`/`main` via
[`.github/workflows/ci.yml`](../.github/workflows/ci.yml) (Node 24, frozen lockfile).
Token-path PRs also run [tokens-governance](../.github/workflows/tokens-governance.yml).

---

## Dist Expectations

### UI Package

- compiled JS in `dist`
- generated type declarations in `dist`
- explicit exports only
- accurate `sideEffects` for shipped CSS

### Registry Package

- compiled metadata entrypoints in `dist`
- templates included in package files
- no deep-import dependency on repository-only paths at runtime

### CLI Package

- compiled executable entry in `dist`
- working `bin` mapping
- runtime access only to publishable package assets

### Tokens Package

- compiled token entrypoints in `dist`
- generated CSS artifacts in `dist`
- generated W3C/DTCG token JSON artifacts under `dist/tokens/dtcg`
- explicit style export paths
- no public JSON export contract until package metadata intentionally exposes one

---

## Registry and Template Release Rules

Because Neurex is registry-first, release quality is not just about compiled code.

Registry templates are validated as synced install artifacts. They should remain
in sync with `packages/ui` through the registry sync check, not through
template-only ambient type shims.

A valid release must keep these in sync:

- registry metadata
- registry templates
- CLI install behavior
- shared utilities

If any of those drift apart, the release is incomplete even if TypeScript builds pass.

---

## Publish-Readiness Checklist

Before declaring a package publish-ready, verify:

- package `exports` are explicit
- `files` includes only intended distributable assets
- templates needed by the CLI are included where required
- no package depends on another package's private `src` structure
- the CLI does not assume repository-only file paths in published usage
- versioning strategy is intentionally chosen for runtime dependencies

---

## Release Notes Expectations

Release notes should call out:

- new installable components
- new shared utilities
- CLI behavior changes
- config format changes
- breaking template or token changes
- any manual consumer migration required

If there is no consumer-facing impact, say that explicitly.

---

## Future Work

This guide should be expanded when the repository adds:

- a formal package publish flow
- versioning and changelog policy
- automated registry validation
- generated token CSS outputs
- update command support in the CLI

Until then, use this document as the minimum build-and-release contract.
