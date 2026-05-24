# lexsys CLI

**Audience:** Maintainers, contributors, and agents
**Type:** Package README
**Source of truth for:** Package role, command surface, core module boundaries
**Full CLI reference:** [docs/reference/cli/CLI.md](../../docs/reference/cli/CLI.md)
**Verified against:** `packages/cli/src/`

---

## Package Role

`packages/cli` is the command-line installer. It reads registry metadata from
`@lexsys/registry` and installs components, utilities, and styles into consumer
projects.

This package owns:

- the `lexsys` binary entry point
- all CLI commands and their argument parsing
- consumer project detection (Vite, Tailwind, package manager)
- idempotent file installation and conflict reporting
- `lexsys.config.json` read/write lifecycle

This package does not own:

- registry item metadata (owned by `@lexsys/registry`)
- install templates (owned by `@lexsys/registry/templates`)
- design token source (owned by `@lexsys/tokens`)
- component implementations (owned by `@lexsys/ui`)

---

## Binary

```
lexsys
```

Installed via `npm install -g lexsys` or run directly with `pnpm exec lexsys`.

---

## Command Surface

| Command                        | Purpose                                                                     |
| ------------------------------ | --------------------------------------------------------------------------- |
| `lexsys init`                  | Initialize inside an existing supported Vite app                            |
| `lexsys init vite [directory]` | Scaffold a new Vite + React consumer                                        |
| `lexsys init next [directory]` | Scaffold a new Next.js App Router consumer (pinned Next.js 15.3.3)          |
| `lexsys add <component>`       | Install one or more components into the consumer project                    |
| `lexsys update [component]`    | Update installed components; `--sync`, `--utilities`, `--styles`, `--force` |
| `lexsys list`                  | List available registry components                                          |
| `lexsys status`                | Show installed component versions vs registry versions                      |
| `lexsys doctor`                | Check project health and config validity                                    |
| `lexsys config`                | Read or modify `lexsys.config.json`                                         |
| `lexsys registry`              | Inspect the active registry source                                          |
| `lexsys uninstall <component>` | Remove installed component files when they match registry templates         |
| `lexsys version`               | Print CLI version                                                           |
| `lexsys help`                  | Print command list                                                          |

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
| `core/config.ts`            | Read/write `lexsys.config.json`; defines `LexsysConfig` schema and defaults |
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

Full `lexsys.config.json` schema (all fields, defaults, aliases) and install idempotency rules (created / updated / skipped / conflicted states, conflict detection, backup behavior): [docs/reference/cli/CLI.md](../../docs/reference/cli/CLI.md).

---

## Development

Root aliases (full list: [docs/operations/SCRIPTS.md](../../docs/operations/SCRIPTS.md)):

```sh
pnpm cli:build
pnpm cli:typecheck
pnpm cli:check
```

---

## Dependencies

- `@lexsys/registry` — registry metadata and templates
- `prompts` — interactive CLI prompts
