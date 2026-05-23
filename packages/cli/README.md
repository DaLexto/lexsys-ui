# neurex CLI

**Audience:** Maintainers, contributors, and agents
**Type:** Package README
**Source of truth for:** Package role, command surface, core module boundaries
**Full CLI reference:** [docs/CLI.md](../../docs/CLI.md)
**Verified against:** `packages/cli/src/`

---

## Package Role

`packages/cli` is the command-line installer. It reads registry metadata from
`@neurex/registry` and installs components, utilities, and styles into consumer
projects.

This package owns:

- the `neurex` binary entry point
- all CLI commands and their argument parsing
- consumer project detection (Vite, Tailwind, package manager)
- idempotent file installation and conflict reporting
- `neurex.config.json` read/write lifecycle

This package does not own:

- registry item metadata (owned by `@neurex/registry`)
- install templates (owned by `@neurex/registry/templates`)
- design token source (owned by `@neurex/tokens`)
- component implementations (owned by `@neurex/ui`)

---

## Binary

```
neurex
```

Installed via `npm install -g neurex` or run directly with `pnpm exec neurex`.

---

## Command Surface

| Command                        | Purpose                                                                         |
| ------------------------------ | ------------------------------------------------------------------------------- |
| `neurex init`                  | Initialize a consumer project — installs Tailwind, wires styles, creates config |
| `neurex add <component>`       | Install one or more components into the consumer project                        |
| `neurex update [component]`    | Update installed components to latest registry version                          |
| `neurex list`                  | List available registry components                                              |
| `neurex status`                | Show installed component versions vs registry versions                          |
| `neurex doctor`                | Check project health and config validity                                        |
| `neurex config`                | Read or modify `neurex.config.json`                                             |
| `neurex registry`              | Inspect the active registry source                                              |
| `neurex uninstall <component>` | Remove installed component files when they match registry templates             |
| `neurex version`               | Print CLI version                                                               |
| `neurex help`                  | Print command list                                                              |

### Global flags

| Flag            | Purpose                                                       |
| --------------- | ------------------------------------------------------------- |
| `--cwd <path>`  | Override working directory for all operations                 |
| `--yes`         | Skip confirmation prompts                                     |
| `--no-fallback` | Disable fallback to local registry when remote is unavailable |

---

## Core Modules

| Module                      | Role                                                                        |
| --------------------------- | --------------------------------------------------------------------------- |
| `core/config.ts`            | Read/write `neurex.config.json`; defines `NeurexConfig` schema and defaults |
| `core/installer.ts`         | File copy, conflict detection, idempotent installs                          |
| `core/registry-provider.ts` | Selects local vs remote registry source                                     |
| `core/registry-resolver.ts` | Resolves registry items, utilities, and styles from active registry         |
| `core/tailwind-setup.ts`    | Detects and wires Tailwind v4 CSS entrypoint                                |
| `core/vite-scaffold.ts`     | Detects and patches Vite config for Tailwind plugin                         |
| `core/package-manager.ts`   | Detects npm/pnpm/yarn and runs installs                                     |
| `core/context.ts`           | Process-level `cwd` override via `--cwd` flag                               |
| `core/flags.ts`             | Shared flag parsing utilities                                               |
| `core/cli-error.ts`         | Typed CLI error class and top-level error handler                           |

---

## Config Schema and Install Behavior

Full `neurex.config.json` schema (all fields, defaults, aliases) and install idempotency rules (created / updated / skipped / conflicted states, conflict detection, backup behavior): [docs/CLI.md](../../docs/CLI.md).

---

## Development

Root aliases (full list: [docs/SCRIPTS.md](../../docs/SCRIPTS.md)):

```sh
pnpm cli:build
pnpm cli:typecheck
pnpm cli:check
```

---

## Dependencies

- `@neurex/registry` — registry metadata and templates
- `prompts` — interactive CLI prompts
