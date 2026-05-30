# lexsys CLI

**Audience:** Maintainers, contributors, and agents
**Type:** Package README
**Source of truth for:** Package role, command surface, core module boundaries
**Full CLI reference:** [docs/reference/cli/CLI.md](../../docs/reference/cli/CLI.md)
**Verified against:** `packages/cli/src/`

---

## Package Role

`packages/cli` is the command-line installer. It reads registry metadata from
`@dalexto/lexsys-registry` and installs components, utilities, and styles into consumer
projects.

This package owns:

- the `lexsys` binary entry point
- all CLI commands and their argument parsing
- consumer project detection (Vite, Tailwind, package manager)
- idempotent file installation and conflict reporting
- `lexsys.config.json` read/write lifecycle

This package does not own:

- registry item metadata (owned by `@dalexto/lexsys-registry`)
- install templates (owned by `@dalexto/lexsys-registry/templates`)
- design token source (owned by `@dalexto/lexsys-tokens`)
- component implementations (owned by `@dalexto/lexsys-ui`)

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
| `lexsys reset [component]`     | Restore components from registry templates (backup + overwrite)             |
| `lexsys list`                  | List available registry components                                          |
| `lexsys status`                | Show installed components and template drift vs registry                    |
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

## Source layout

Domain modules under `packages/cli/src/`: `config/`, `install/`, `registry/`,
`commands/`, `scaffold/`, `utils/`. Command behavior and config schema:
[docs/reference/cli/CLI.md](../../docs/reference/cli/CLI.md).

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

- `@dalexto/lexsys-registry` — registry metadata and templates
- `prompts` — interactive CLI prompts
