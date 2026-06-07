# Changelog — @dalexto/lexsys-cli

## 0.1.3

### Patch Changes

- [#108](https://github.com/DaLexto/lexsys-ui/pull/108) [`c66a436`](https://github.com/DaLexto/lexsys-ui/commit/c66a43636b035c667b747136f3a35a34be0984c8) Thanks [@itsalexdev](https://github.com/itsalexdev)! - TOK.7 and TOK.8 token harmonization: component token slots across blocks and templates, spacing literal removal from install variants, motion duration tier retune (`surface` 250ms, `overlayEnter` / `layout` 350ms), and regenerated `tokens.css` / `theme.css`. Consumers should run `lexsys update --sync --styles` (and `lexsys update` on affected blocks) to pick up template and CSS changes.

- Updated dependencies [[`c66a436`](https://github.com/DaLexto/lexsys-ui/commit/c66a43636b035c667b747136f3a35a34be0984c8)]:
  - @dalexto/lexsys-registry@0.1.3

## 0.1.2

### Patch Changes

- [#90](https://github.com/DaLexto/lexsys-ui/pull/90) [`f827fa7`](https://github.com/DaLexto/lexsys-ui/commit/f827fa72e9180365bb42e5dcb25fc86c93909511) Thanks [@itsalexdev](https://github.com/itsalexdev)! - Sidebar enterprise upgrade: `SidebarProvider` desktop collapse, item badge and chrome, nested nav, keyboard a11y, router-aware active helper, collapsible groups, filter input, section separators, right-side and RTL layout, sidebar component tokens, and block template type-import path fixes for consumer installs.

- Updated dependencies [[`f827fa7`](https://github.com/DaLexto/lexsys-ui/commit/f827fa72e9180365bb42e5dcb25fc86c93909511)]:
  - @dalexto/lexsys-registry@0.1.2

## 0.1.1

### Patch Changes

- Updated dependencies []:
  - @dalexto/lexsys-registry@0.1.1

## 0.1.0

### Patch Changes

- Updated dependencies []:
  - @dalexto/lexsys-registry@0.1.0

## 0.0.6

### Patch Changes

- Root pnpm script aliases with `scripts:check` validator, JSDoc generated CSS headers with `Last generated` timestamp, and refreshed registry style templates.

  **Breaking:** installed style files must use the new JSDoc header for CLI auto-update; reinstall styles after upgrading.

- Updated dependencies []:
  - @dalexto/lexsys-registry@0.0.6

## 0.0.5

### Patch Changes

- [`8b096f4`](https://github.com/DaLexto/lexsys-ui/commit/8b096f4a03edd4eed4e1bf6dc117e093b5450a05) - Early-preview release on dist-tag **`next`** (`0.0.5`).
  - **Fixed** — `lexsys add` for blocks and templates rewrites `@/components/{primitives,blocks,templates}/…` imports to flat sibling paths under `paths.components`
  - **Changed** — registry install metadata for blocks and templates is reconciled from UI source (accurate `registryDependencies` and template paths for maintainers publishing `@dalexto/lexsys-registry`)

- Updated dependencies [[`8b096f4`](https://github.com/DaLexto/lexsys-ui/commit/8b096f4a03edd4eed4e1bf6dc117e093b5450a05)]:
  - @dalexto/lexsys-registry@0.0.5

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
