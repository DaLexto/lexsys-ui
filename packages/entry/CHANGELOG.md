# lexsys

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
  - @lexsys/cli@0.0.2
