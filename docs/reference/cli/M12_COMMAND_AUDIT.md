# M12.1 — CLI command audit

**Audience:** Maintainers  
**Type:** Audit artifact (M12 track)  
**Source of truth for:** Command inventory, alias map, help grouping, overlap and cleanup candidates for M12.2–M12.4  
**Verified against:** `packages/cli/src/index.ts`, `packages/cli/src/commands/help.ts`, `docs/reference/cli/CLI.md`  
**Last reviewed:** 2026-05-30

---

## On this page

- [Summary](#summary)
- [Command inventory](#command-inventory)
- [Help grouping](#help-grouping)
- [Alias map](#alias-map)
- [Flag consistency](#flag-consistency)
- [Overlap analysis (M12.2 input)](#overlap-analysis-m12.2-input)
- [Cleanup candidates (M12.3)](#cleanup-candidates-m12.3)
- [UX candidates (M12.4)](#ux-candidates-m12.4)
- [CLI.md alignment](#climd-alignment)

---

## Summary

The CLI exposes **12 user-facing commands** (including meta `help` / `version`) routed in
`index.ts`. Naming and aliases match M4.4–M4.5; root help groups match the **Scaffold /
Components / Inspect / Meta** layout from M4.8.

**M12.1 outcome:** inventory complete; no renames required before M12.2. Highest-value
follow-ups are **status vs doctor** scope (M12.2), **help/flag doc drift** on
`uninstall` (M12.3), and **`add --yes` with no args** behavior (M12.4).

---

## Command inventory

| Canonical   | Alias(s) | Help group | Guided (no args)  | Primary responsibility                                    |
| ----------- | -------- | ---------- | ----------------- | --------------------------------------------------------- |
| `init`      | `create` | Scaffold   | Yes (framework)   | Scaffold Vite/Next + Lexsys init sequence                 |
| `add`       | `a`      | Components | Yes (multiselect) | Install registry items + deps/styles/utilities            |
| `update`    | `up`     | Components | Yes (multiselect) | Refresh installed files; `--all`, styles, utilities, sync |
| `reset`     | —        | Components | Yes (multiselect) | Restore templates from registry                           |
| `uninstall` | `rm`     | Components | Yes (multiselect) | Remove installed files; optional `--with-deps`            |
| `list`      | `ls`     | Inspect    | No                | List registry catalog (`--json`)                          |
| `status`    | `st`     | Inspect    | No                | Drift vs registry for `installed` items                   |
| `doctor`    | `dr`     | Inspect    | No                | Project paths + registry connectivity + file existence    |
| `registry`  | `reg`    | Inspect    | No                | Registry source/manifest introspection (flag modes)       |
| `config`    | `cfg`    | Inspect    | No                | Config path, existence, remote URL get/set                |
| `version`   | `-v`     | Meta       | No                | Print CLI version                                         |
| `help`      | `-h`     | Meta       | No                | Root or per-command help                                  |

**Routing:** `index.ts` dispatches by string match; unknown commands throw `CliError`.
`--cwd` / `-C` is parsed once at the top level and applies to all commands.

---

## Help grouping

Root `runHelp()` sections (`help.ts`) vs `index.ts` dispatch — **aligned**.

| Section    | Commands                                         | Notes                             |
| ---------- | ------------------------------------------------ | --------------------------------- |
| Scaffold   | `init`, `create`                                 | Single implementation (`runInit`) |
| Components | `add`, `update`, `reset`, `uninstall`            | Mutating install lifecycle        |
| Inspect    | `list`, `status`, `doctor`, `registry`, `config` | Read-only / diagnostic            |
| Meta       | `version`, `help`                                | No project mutation               |

Per-command `COMMAND_HELP` entries exist for all dispatched commands except `version`
(version has no `lexsys version --help` branch — only `-v` / `--version` at root).

---

## Alias map

| Full        | Alias    | In `index.ts` | In root help | In `CLI.md` |
| ----------- | -------- | ------------- | ------------ | ----------- |
| `init`      | `create` | Yes           | Yes          | Yes         |
| `add`       | `a`      | Yes           | Yes          | Yes         |
| `update`    | `up`     | Yes           | Yes          | Yes         |
| `list`      | `ls`     | Yes           | Yes          | Yes         |
| `status`    | `st`     | Yes           | Yes          | Yes         |
| `doctor`    | `dr`     | Yes           | Yes          | Yes         |
| `uninstall` | `rm`     | Yes           | Yes          | Yes         |
| `registry`  | `reg`    | Yes           | Yes          | Yes         |
| `config`    | `cfg`    | Yes           | Yes          | Yes         |

**No alias:** `reset` (distinct verb; avoids collision with git/npm mental models).

**Meta flags as pseudo-commands:** `--help` / `-h`, `--version` / `-v` — consistent.

---

## Flag consistency

### Parsed at `index.ts` (global)

| Flag        | Alias | Commands receiving pre-parsed options      |
| ----------- | ----- | ------------------------------------------ |
| `--cwd`     | `-C`  | All (via `setCwd` before dispatch)         |
| `--help`    | `-h`  | Per-command `runHelpFor` or root `runHelp` |
| `--version` | `-v`  | `version` only                             |

### Per-command flags (representative)

| Flag / behavior    | add | update | reset | uninstall | list | status | doctor | registry | config |
| ------------------ | --- | ------ | ----- | --------- | ---- | ------ | ------ | -------- | ------ |
| `--dry-run` `-d`   | ✓   | ✓      | ✓     | ✓         | —    | —      | —      | —        | —      |
| `--yes` `-y`       | ✓   | ✓      | —     | —         | —    | —      | —      | —        | —      |
| `--no-fallback`    | ✓   | ✓      | ✓     | ✓\*       | ✓    | ✓      | ✓      | ✓        | —      |
| `--with-deps` `-w` | —   | —      | ✓     | ✓         | —    | —      | —      | —        | —      |
| `--json` `-j`      | —   | —      | —     | —         | ✓    | —      | —      | —        | —      |
| Guided picker      | ✓   | ✓      | ✓     | ✓         | —    | —      | —      | —        | —      |

\* `uninstall` implements `--no-fallback` in `uninstall.ts` but **does not document it** in
`COMMAND_HELP` or root global examples — M12.3 doc fix.

Root help advertises `--yes` as global; only **add** and **update** honor it. Acceptable
if documented as “where supported”; avoid implying all guided commands respect `-y`.

---

## Overlap analysis (M12.2 input)

### `status` vs `doctor`

| Aspect              | `status`                               | `doctor`                                     |
| ------------------- | -------------------------------------- | -------------------------------------------- |
| Config / paths      | No                                     | Yes (`package.json`, paths.\*, tailwind.css) |
| Registry resolve    | Yes (fail fast)                        | Yes (with source/fallback/items summary)     |
| Installed list      | Yes                                    | Yes (if `installed` non-empty)               |
| Per-component check | **Template drift** (`component-drift`) | **Directory exists** on disk                 |
| Output style        | `- name (status text)`                 | `✓` / `×` checklist                          |
| Empty installed     | Early message, exit 0                  | Skips component section                      |

**Overlap:** both iterate `config.installed` and hit the registry. **Different jobs:**
`status` = sync state; `doctor` = filesystem + registry health.

**M12.2 decision (2026-05-30):** **Keep separate** (option 1). Help copy in `help.ts` and
`CLI.md` now cross-reference drift (`status`) vs setup health (`doctor`). No merge or
deprecation in `0.0.x`.

### `registry` vs `list`

No merge candidate — `list` is catalog; `registry` is provider/debug (`--source`, `--local`,
`--remote`, `--summary`).

### `config` vs `doctor`

`config` is read/write URL and path metadata; `doctor` does not mutate config. No merge.

---

## Cleanup candidates (M12.3)

| ID    | Finding                                                              | Suggested fix                                         |
| ----- | -------------------------------------------------------------------- | ----------------------------------------------------- |
| C12.1 | `uninstall` help omits `--no-fallback` (implemented)                 | **Shipped** — `COMMAND_HELP` + `CLI.md`               |
| C12.2 | `version` has no `lexsys version --help`                             | Deferred — use root `-v` / `--version` only           |
| C12.3 | Root help lists global `--yes`; limited command support              | **Shipped** — root help + `CLI.md` global table       |
| C12.4 | `status` / `doctor` both print registry failure messages differently | **Shipped** — `utils/registry-errors.ts`              |
| C12.5 | Dispatch boilerplate in `index.ts` (repeated `--help` blocks)        | Optional thin `dispatchCommand` helper — low priority |

---

## UX candidates (M12.4)

| ID    | Finding                                                                   | Suggested fix                                  |
| ----- | ------------------------------------------------------------------------- | ---------------------------------------------- |
| U12.1 | `add --yes` with no component names prints message and exits (no install) | Document; or treat as “confirm guided” vs skip |
| U12.2 | `reset` / `uninstall` guided modes lack `--yes` for non-interactive CI    | Optional `-y` + required args policy           |
| U12.3 | `doctor` exit code 1 on registry fail; `status` same — good               | Document exit codes in CLI.md                  |
| U12.4 | `registry` with no flags — behavior undocumented in audit table           | Confirm default output in CLI.md spot-check    |

One PR per item per M12 scope.

---

## CLI.md alignment

| Area           | Status | Notes                                              |
| -------------- | ------ | -------------------------------------------------- |
| Alias table    | OK     | Matches `index.ts`                                 |
| Global options | OK     | `--cwd`, `--no-fallback`, help/version             |
| `status`       | OK     | Drift semantics documented                         |
| `doctor`       | OK     | Checklist documented; overlap with status implicit |
| `uninstall`    | OK     | `--no-fallback` documented (C12.1)                 |
| `reset`        | OK     | Present in reference                               |

Canonical user reference remains [CLI.md](./CLI.md). This file is the **M12 maintainer
audit**; update when M12.2–M12.4 ship behavior changes.

---

## Next step

**M12.3:** Optional — C12.5 dispatch boilerplate in `index.ts` (low priority).
**M12.4:** UX items U12.1–U12.4 — one PR per row.
