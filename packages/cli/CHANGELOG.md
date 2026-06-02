# Changelog — @dalexto/lexsys-cli

## 0.0.4

### Patch Changes

- [#54](https://github.com/DaLexto/lexsys-ui/pull/54) [`a76b46f`](https://github.com/DaLexto/lexsys-ui/commit/a76b46fd2f35194fbcb7f92347ddb4b0c9262caf) Thanks [@itsalexdev](https://github.com/itsalexdev)! - Table primitive, CLI config migration, and template-drift tooling (0.0.4 @ `next`).
  - Add **Table** compound primitive (`lexsys add table`) with `--lex-table-*` tokens
  - Add **`lexsys reset`** (`--dry-run`, `--with-deps`)
  - **Breaking:** `lexsys.config.json` `installed` is `string[]`; legacy map migrates and persists on load
  - **Changed:** `status` / `update` drift via template hash; registry items drop per-item `version`

- Updated dependencies [[`a76b46f`](https://github.com/DaLexto/lexsys-ui/commit/a76b46fd2f35194fbcb7f92347ddb4b0c9262caf)]:
  - @dalexto/lexsys-registry@0.0.4

## 0.0.3

### Patch Changes

- [`3f80a50`](https://github.com/DaLexto/lexsys-ui/commit/3f80a50b2fefd949d4be97a46c3dddd07aeb3e27) - Token fixes, CardAction compound part, and Empty block.
  - Register missing `meterComponentTokens`; fix DTCG `$value` key in `meter.ts`
  - Add `menu.item.focus.ring.*` tokens (fixes `--lex-menu-item-focus-ring-*` references)
  - Add `size.64` primitive + `sidebar.width` / `commandPalette.list.maxHeight` semantic tokens
  - Add `empty.*` component token namespace (`--lex-empty-*`)
  - Ship `CardAction` as a formal `CardHeader` compound part
  - Add `Empty` block: `Empty / EmptyHeader / EmptyMedia / EmptyTitle / EmptyDescription / EmptyContent`
  - Add `empty` registry item (`type: block`, `category: layout`, `version: 0.0.3`)

- Updated dependencies [[`3f80a50`](https://github.com/DaLexto/lexsys-ui/commit/3f80a50b2fefd949d4be97a46c3dddd07aeb3e27)]:
  - @dalexto/lexsys-registry@0.0.3

## 0.0.2

### Patch Changes

- M4 — entry package + CLI DX
  - add `lexsys` npm entry package (`packages/entry`) so consumers use `npx lexsys@next` instead of `npx @dalexto/lexsys-cli@next`
  - reorganize `packages/cli/src/core/` into domain subfolders (`config/`, `registry/`, `install/`, `scaffold/`, `utils/`)
  - add command aliases: `create` (init), `a` (add), `up` (update), `ls` (list), `st` (status), `dr` (doctor), `rm` (uninstall), `reg` (registry), `cfg` (config)
  - add short flag aliases: `-d` (--dry-run), `-j` (--json), `-s` (--summary), `-l` (--local), `-r` (--remote), `-C` (--cwd), `-p` (--path), `-e` (--exists)
  - add per-command `--help` / `-h` and redesigned global help with grouped sections
  - add guided interactive modes for `init`, `update`, and `uninstall` when run without arguments
  - standardize error output format with `✗ message → suggestion` prefix
  - restore scaffold detection in `runInit()` so existing Vite/Next projects skip the guided prompt

- Updated dependencies []:
  - @dalexto/lexsys-registry@0.0.2

Pre-0.1.0 breaking changes and significant improvements to the CLI package.
