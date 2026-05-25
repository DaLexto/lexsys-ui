# Changelog — @lexsys/cli

## 0.0.2

### Patch Changes

- M4 — entry package + CLI DX
  - add `lexsys` npm entry package (`packages/entry`) so consumers use `npx lexsys@next` instead of `npx @lexsys/cli@next`
  - reorganize `packages/cli/src/core/` into domain subfolders (`config/`, `registry/`, `install/`, `scaffold/`, `utils/`)
  - add command aliases: `create` (init), `a` (add), `up` (update), `ls` (list), `st` (status), `dr` (doctor), `rm` (uninstall), `reg` (registry), `cfg` (config)
  - add short flag aliases: `-d` (--dry-run), `-j` (--json), `-s` (--summary), `-l` (--local), `-r` (--remote), `-C` (--cwd), `-p` (--path), `-e` (--exists)
  - add per-command `--help` / `-h` and redesigned global help with grouped sections
  - add guided interactive modes for `init`, `update`, and `uninstall` when run without arguments
  - standardize error output format with `✗ message → suggestion` prefix
  - restore scaffold detection in `runInit()` so existing Vite/Next projects skip the guided prompt

- Updated dependencies []:
  - @lexsys/registry@0.0.2

Pre-0.1.0 breaking changes and significant improvements to the CLI package.

## Unreleased — M4 (Entry + CLI DX)

### New: `lexsys` npm entry package

- Published as `lexsys` on npm — users now run `npx lexsys@latest` instead of `npx @lexsys/cli@latest`.
- Thin shim in `packages/entry/bin.js`; all logic stays in `@lexsys/cli`.
- `lexsys` and `@lexsys/cli` are version-locked via Changesets `fixed[]`.

### Command aliases

| Command     | Alias    |
| ----------- | -------- |
| `init`      | `create` |
| `add`       | `a`      |
| `update`    | `up`     |
| `list`      | `ls`     |
| `status`    | `st`     |
| `uninstall` | `rm`     |
| `doctor`    | `dr`     |
| `registry`  | `reg`    |
| `config`    | `cfg`    |

### Short flag aliases

| Long flag     | Short | Commands                     |
| ------------- | ----- | ---------------------------- |
| `--dry-run`   | `-d`  | `add`, `update`, `uninstall` |
| `--yes`       | `-y`  | `add`, `update`              |
| `--force`     | `-f`  | `update`                     |
| `--all`       | `-a`  | `update`                     |
| `--styles`    | `-S`  | `update`                     |
| `--utilities` | `-u`  | `update`                     |
| `--json`      | `-j`  | `list`                       |
| `--summary`   | `-s`  | `registry`                   |
| `--local`     | `-l`  | `registry`                   |
| `--remote`    | `-r`  | `registry`                   |
| `--with-deps` | `-w`  | `uninstall`                  |
| `--cwd`       | `-C`  | global                       |

### Guided modes

- `lexsys create` / `lexsys init` without arguments → interactive framework + project name picker.
- `lexsys up` without arguments → multi-select picker of installed components.
- `lexsys rm` without arguments → multi-select picker of installed components.

### Per-command help

- `lexsys <command> --help` / `-h` now shows command-specific help instead of the global help.

### Help output redesign

- Commands grouped by category: Scaffold / Components / Inspect / Meta.
- Aliases visible in the main help output.
- `Run lexsys <command> --help` hint at the bottom.

### Error output standardization

- All errors now print with a consistent `✗ message` prefix.
- `CliError` accepts an optional `suggestion` field.
- Unknown command errors include a "Did you mean?" hint via `suggestions.ts`.
- Every error ends with `Run lexsys --help to see available commands.`

### Internal: src/ reorganization

- `src/core/` split into domain subfolders: `registry/`, `install/`, `scaffold/`, `utils/`, `config/`.
- `src/core/` now contains only CLI infrastructure: `cli-error`, `context`, `flags`, `fs`, `hash`, `backup`.
- File renames: `registry-types.ts` → `registry/types.ts`, `install-results.ts` → `install/results.ts`, `vite-scaffold.ts` → `scaffold/vite.ts`, etc.
- No public API change — `package.json` exports and `bin` are unchanged.
