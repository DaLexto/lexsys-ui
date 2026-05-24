# Lexsys Deploy Guide

## Purpose

This document defines the current build and release expectations for the `lexsys` monorepo.

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
Pull requests use path-filtered jobs; pushes to `dev`/`main` also run a full
`pnpm check`. Token-path PRs also run
[tokens-governance](../.github/workflows/tokens-governance.yml).

### Lockfile and dependency updates

- CI MUST use `pnpm install --frozen-lockfile` — do not commit hand-edited
  `pnpm-lock.yaml` without running install locally.
- Dependabot opens weekly update PRs via
  [`.github/dependabot.yml`](../.github/dependabot.yml); review grouped bumps
  before merge.
- Node version MUST match root `engines` and CI (Node 24).
- `pnpm audit --audit-level=high` runs as a non-blocking CI job; fix high
  severity issues before release when practical.

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

Because Lexsys is registry-first, release quality is not just about compiled code.

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

## Publish surface (npm)

Lexsys is **registry-first**: consumers install via the `@lexsys/cli` package
(`lexsys` binary); they do not import `@lexsys/ui` as a runtime library.

| Package             | npm name           | Publish? | Role                                          |
| ------------------- | ------------------ | -------- | --------------------------------------------- |
| `packages/cli`      | `@lexsys/cli`      | **Yes**  | CLI binary (`lexsys`); primary consumer entry |
| `packages/registry` | `@lexsys/registry` | **Yes**  | Runtime dep of CLI; templates + metadata      |
| `packages/ui`       | `@lexsys/ui`       | **No**   | Monorepo reference; copies ship via registry  |
| `packages/tokens`   | `@lexsys/tokens`   | **No**   | Token CSS ships in registry style templates   |
| Root workspace      | `lexsys`           | **No**   | Monorepo orchestrator only                    |

Token CSS reaches consumers through registry style templates
(`templates/styles/tokens.css`, `theme.css`), not through a separate npm install
of `@lexsys/tokens`.

---

## Version lane

| Milestone  | Version | npm dist-tag | Meaning                                      |
| ---------- | ------- | ------------ | -------------------------------------------- |
| First npm  | `0.0.1` | `next`       | Early preview; breaking changes still likely |
| Iterations | `0.0.x` | `next`       | Changesets patch/minor on the 0.0 line       |
| MVP stable | `0.1.0` | `latest`     | Public MVP commitment — future milestone     |

Install for early preview:

```bash
npx @lexsys/cli@next init vite my-app
```

Do not publish `@lexsys/ui` or `@lexsys/tokens` until there is an explicit product
decision and DEPLOY.md is updated.

---

## M10 implementation track (before first publish)

Land on `dev` (then ff `main`) before running the first publish checklist:

| Step  | Deliverable                                                       | Owner doc            |
| ----- | ----------------------------------------------------------------- | -------------------- |
| M10.0 | Publish surface + version lane docs (this section)                | DEPLOY.md            |
| M10.1 | Root `CHANGELOG.md` (Keep a Changelog)                            | CHANGELOG.md         |
| M10.2 | Package metadata audit; `pnpm publish:pack-audit`                 | SCRIPTS.md           |
| M10.3 | Changesets (fixed `@lexsys/cli` + `@lexsys/registry`); publish CI | `.github/workflows/` |
| M10.4 | First publish `0.0.1` @ `next` + post-publish smoke               | This checklist       |

Track status in [REVIEW_TODO.md § M10](./REVIEW_TODO.md#m10--release-readiness).

---

## First release checklist (`0.0.1` @ `next`)

Use this when cutting the **first** npm release. Repeat phases 2–5 for later
`0.0.x` bumps; skip phase 0 once M10 tooling is shipped.

### Phase 0 — Repo prerequisites (M10 PRs merged to `main`)

- [ ] Publish scope documented (only `@lexsys/cli` + `@lexsys/registry`)
- [ ] Package metadata: `private: false`, `repository`, `license`, `files`, `exports`
- [ ] Root `CHANGELOG.md` with `[0.0.1]` section
- [ ] Changesets: fixed group `@lexsys/cli` + `@lexsys/registry`
- [ ] Publish CI workflow on `main`
- [ ] `pnpm publish:pack-audit` passes locally
- [ ] `pnpm check` green on `main`
- [ ] `pnpm sync:all && pnpm registry:check` before pack

### Phase 1 — npm / GitHub setup (one-time)

- [ ] npm org `@lexsys` with publish access for `@lexsys/cli` and `@lexsys/registry`
- [ ] GitHub secret `NPM_TOKEN` (Automation token)
- [ ] Dist-tag policy: **`next`** for `0.0.x` (not `latest`)

### Phase 2 — Pre-publish smoke (local, no monorepo link)

```bash
pnpm build
pnpm sync:all
pnpm check
pnpm publish:pack-audit
```

In a clean temp directory:

```bash
npm install /path/to/lexsys-cli-0.0.1.tgz
npx lexsys --version
npx lexsys init vite smoke-pack
cd smoke-pack
npx lexsys add button
pnpm build
```

- [ ] `init vite` works
- [ ] `add button` works
- [ ] Production build passes
- [ ] (Optional) `add dashboard-shell` + build

### Phase 3 — Changesets → version `0.0.1`

- [ ] Add changeset for first release (fixed bump both packages)
- [ ] Merge to `dev` → ff `main` per [AGENTS.md § Change workflow](../AGENTS.md#change-workflow)
- [ ] Merge Changesets **Version Packages** PR on `main`
- [ ] Version PR bumps **both** `@lexsys/cli` and `@lexsys/registry` to `0.0.1`

### Phase 4 — Publish

- [ ] CI publish job on `main` succeeds
- [ ] npm shows `@lexsys/cli@0.0.1` and `@lexsys/registry@0.0.1` tagged **`next`**
- [ ] (Optional) Git tag `v0.0.1` on publish commit

### Phase 5 — Post-publish smoke (real consumer)

In a **new** temp directory (no local monorepo):

```bash
npx @lexsys/cli@next init vite smoke-npm
cd smoke-npm
npx @lexsys/cli@next add button
pnpm build
```

- [ ] `npx @lexsys/cli@next` works from npm (not pack tarball)
- [ ] README Quick Start matches `@next` install path

**Recommended (non-blocking for 0.0.1):** consumer sandbox narrow-viewport pass —
see [TESTING.md § Consumer sandbox verification](./TESTING.md#consumer-sandbox-verification).

### Phase 6 — Docs and backlog

- [ ] CHANGELOG `[0.0.1]` date filled
- [ ] README states early preview + `@next`
- [ ] REVIEW_TODO / ROADMAP: M10 partial shipped (`0.0.1` @ `next`); `0.1.0` → `latest` remains future

### Ready to publish?

All three must be **yes**:

1. `pnpm publish:pack-audit` passes
2. Fresh install from **pack tarball** (not link) works
3. Changesets + publish CI merged on `main`

### Explicitly out of scope for `0.0.1`

- npm provenance
- Remote registry signatures / allowlist ([REVIEW_TODO Known Gaps](./REVIEW_TODO.md#known-gaps))
- Publishing `@lexsys/ui` or `@lexsys/tokens`
- `apps/docs` public site
- Moving to dist-tag **`latest`** (that is the **`0.1.0`** milestone)

---

## Transition to `0.1.0` (`latest`)

When declaring public MVP stable:

1. Changeset minor bump → `0.1.0`
2. Publish with dist-tag **`latest`** (update publish CI / Changesets config)
3. README: `npx @lexsys/cli` without `@next`
4. Mark M10 **shipped** in [ROADMAP.md](./ROADMAP.md) and [REVIEW_TODO.md](./REVIEW_TODO.md)

---

## Future Work

Still deferred after first `0.0.1` @ `next`:

- npm provenance
- Remote registry trust (signatures, allowlist) — post-M10
- Optional npm package for `@lexsys/tokens`
- `apps/docs` public site — post-`0.1.0` / post-M10

Registry validation (`pnpm registry:check`), generated token CSS
(`styles/tokens.css`, `styles/theme.css`), and `lexsys update` with `--sync` /
`--utilities` / `--styles` are **shipped** — see [CLI.md](./CLI.md) and
[SCRIPTS.md](./SCRIPTS.md).

---

## Optional: Turbo remote cache

At current repo size, local turbo cache is sufficient. Maintainers MAY opt into
[Vercel Remote Cache](https://turbo.build/docs/core-concepts/remote-caching) if
CI duration grows — configure `TURBO_TOKEN` and `TURBO_TEAM` in GitHub Actions
secrets and enable remote cache in CI only after measuring baseline job times.
