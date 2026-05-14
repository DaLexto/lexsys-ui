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

Root scripts:

- `pnpm build`
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
pnpm build
pnpm typecheck
pnpm lint
pnpm test
```

If `lint` or `test` are still placeholders, record that explicitly in the release notes or PR.

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
- generated DTCG-compatible token files under `dist/tokens/dtcg/**/*.tokens.json`
- explicit style export paths for CSS outputs
- intentional public export policy for non-CSS token outputs; DTCG JSON files
  are generated but not yet exposed through explicit package exports
- reviewed `sideEffects` metadata; `@neurex/ui` currently does not emit a CSS
  file, so its CSS side-effect declaration remains a pre-publish review item

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
- generated assets referenced by `sideEffects` or package `exports` exist in
  the built package, or are explicitly documented as deferred contract work

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
- update command support in the CLI
- formal public export policy for generated token JSON outputs
- final `@neurex/ui` CSS side-effects policy

Until then, use this document as the minimum build-and-release contract.
