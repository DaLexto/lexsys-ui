# Contributing to Neurex

**Audience:** Maintainers and contributors

## Setup

1. Clone the repo and install from the root: `pnpm install`
2. Use Node 24 (see root `package.json` `engines`).
3. Branch off `dev` for feature work.

## Before opening a PR

Run the merge gate:

```bash
pnpm check
```

Use scoped checks when touching one package — see [docs/SCRIPTS.md](./docs/SCRIPTS.md) and [docs/TESTING.md](./docs/TESTING.md).

After UI or token changes that affect install artifacts:

```bash
pnpm sync:all && pnpm registry:check
```

## Commits

Use [Conventional Commits](https://www.conventionalcommits.org/) with monorepo scopes (`tokens`, `ui`, `registry`, `cli`, `docs`, `ci`, …). See `.cursor/rules/git-commits.mdc` for repository conventions.

## Documentation

- Roadmap and phase sequencing: [docs/ROADMAP.md](./docs/ROADMAP.md)
- Active backlog: [docs/REVIEW_TODO.md](./docs/REVIEW_TODO.md)
- Script names (do not duplicate elsewhere): [docs/SCRIPTS.md](./docs/SCRIPTS.md)

## Consumer verification

When changing CLI or registry behavior, follow the external sandbox checklist in [docs/TESTING.md](./docs/TESTING.md) § Consumer sandbox verification.
