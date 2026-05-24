# Contributing to Neurex

**Audience:** Maintainers and contributors

## Setup

1. Clone the repo and install from the root: `pnpm install`
2. Use Node 24 (see root `package.json` `engines`).
3. Branch off **`dev`** for feature work. Do not commit to **`main`** unless explicitly requested.

## Change workflow

For non-trivial changes, follow [AGENTS.md § Change workflow](./AGENTS.md#change-workflow):

1. Branch off **`dev`**
2. Implement on the branch
3. Docs alignment / update when contracts change
4. Verify (`pnpm check` and scoped checks)
5. Open PR **to `dev` last** — never target **`main`** without explicit user request

## Before opening a PR

Run the merge gate:

```bash
pnpm check
```

Use scoped checks when touching one package — see [docs/SCRIPTS.md](./docs/SCRIPTS.md) and [docs/TESTING.md](./docs/TESTING.md).

**Verification split** ([docs/TESTING.md § Verification surfaces](./docs/TESTING.md#verification-surfaces)):

- Package changes → scoped `pnpm *:check`
- CLI/registry/template changes → external sandbox checklist ([Consumer sandbox verification](./docs/TESTING.md#consumer-sandbox-verification))
- Playground → optional quick UI glance (`pnpm playground:dev`); not consumer truth

After UI or token changes that affect install artifacts:

```bash
pnpm sync:all && pnpm registry:check
```

## Commits

Use [Conventional Commits](https://www.conventionalcommits.org/) with monorepo scopes (`tokens`, `ui`, `registry`, `cli`, `docs`, `ci`, …). See `.cursor/rules/git-commits.mdc` for repository conventions.

## GitHub labels

Issues and pull requests use the namespaced label set in [`.github/labels.yml`](./.github/labels.yml). Apply labels that match the change:

| Namespace      | When to use                                                                                 |
| -------------- | ------------------------------------------------------------------------------------------- |
| `type:*`       | Change kind — mirrors commit types (`type:feat`, `type:fix`, `type:docs`, …)                |
| `area:*`       | Primary package or surface (`area:tokens`, `area:cli`, `area:repo`, …)                      |
| `priority:*`   | Issue triage only (`priority:critical`, `priority:high`, `priority:medium`, `priority:low`) |
| `status:*`     | Workflow state (`status:needs-triage`, `status:blocked`, `status:ready-for-review`)         |
| `meta:*`       | Cross-cutting flags (`meta:breaking-change`, `meta:good-first-issue`, `meta:help-wanted`)   |
| `automation:*` | Bot PRs (`automation:dependencies`, `automation:github-actions`)                            |

The manifest is synced in **strict** mode: labels not listed in `.github/labels.yml` are removed on sync. Edit the manifest in a PR; CI runs a dry-run preview. Sync applies on merge to `dev`/`main`. See [docs/SCRIPTS.md](./docs/SCRIPTS.md) § GitHub label sync.

## Documentation

- **Routing hub:** [docs/INDEX.md](./docs/INDEX.md)
- Roadmap and phase sequencing: [docs/ROADMAP.md](./docs/ROADMAP.md)
- Active backlog: [docs/REVIEW_TODO.md](./docs/REVIEW_TODO.md)
- Script names (do not duplicate elsewhere): [docs/SCRIPTS.md](./docs/SCRIPTS.md)
- Post-change doc pass: [`.agents/skills/docs-alignment/SKILL.md`](./.agents/skills/docs-alignment/SKILL.md)

## Consumer verification

When changing CLI or registry behavior, follow the external sandbox checklist in [docs/TESTING.md](./docs/TESTING.md) § [Consumer sandbox verification](./docs/TESTING.md#consumer-sandbox-verification). Surface roles: [§ Verification surfaces](./docs/TESTING.md#verification-surfaces).
