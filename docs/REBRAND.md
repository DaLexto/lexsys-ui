# Lexsys Rebrand (Neurex → Lexsys)

**Audience:** Maintainers  
**Type:** Migration reference  
**Status:** R0 — in progress on `feat/r0-lexsys-rebrand` (blocks M10 publish)

This document records the **Neurex → Lexsys** rename applied across the monorepo
before the first npm release. There are no published consumers yet; this is an
internal dev-phase rename.

---

## Naming map

| Layer                         | Before                             | After                                                             |
| ----------------------------- | ---------------------------------- | ----------------------------------------------------------------- |
| Product / CLI binary          | `neurex`                           | `lexsys`                                                          |
| npm CLI package               | (unscoped `neurex`, taken on npm)  | `@lexsys/cli`                                                     |
| npm registry package          | `@neurex/registry`                 | `@lexsys/registry`                                                |
| Monorepo root workspace       | `neurex`                           | `lexsys` (orchestrator only; not published)                       |
| Consumer config file          | `neurex.config.json`               | `lexsys.config.json`                                              |
| CSS variable prefix           | `--nx-*`                           | `--lsys-*`                                                        |
| Tailwind `@theme` prefix      | `--color-nx-*`, `--radius-nx-*`, … | `--color-twix-*`, `--radius-twix-*`, … (`tailwindPrefix: "twix"`) |
| Semantic CSS classes          | `nx-*`                             | `lsys-*`                                                          |
| Token brand / preset / themes | `neurex.*`, `themes/neurex/`       | `lexsys.*`, `themes/lexsys/`                                      |

**Unchanged on purpose:**

- GitHub repository path (`DaLexto/neurex`) — local folder name may stay `neurex`
- CLI executable name after install: **`lexsys`** (bin maps to `@lexsys/cli`)

---

## npm install (after M10)

Early preview:

```bash
npx @lexsys/cli@next init vite my-app
```

Publish surface: [`DEPLOY.md` § Publish surface](./DEPLOY.md#publish-surface-npm).

---

## Maintainer scripts

Scripts live in [`scripts/rebrand/`](../scripts/rebrand/).

```bash
# Dry-run all phases
node scripts/rebrand/apply-rebrand.mjs --phase all

# Apply replacements
node scripts/rebrand/apply-rebrand.mjs --phase all --write

# Fail if forbidden branding remains
node scripts/rebrand/verify-rebrand.mjs
```

Phases in [`rebrand-map.json`](../scripts/rebrand/rebrand-map.json): `workspace`,
`cli`, `tokens`, `variants`, `docs`.

After a rebrand pass:

```bash
pnpm tokens:generate:styles
pnpm registry:sync
pnpm check
```

---

## Verification gate

`verify-rebrand.mjs` fails on:

- word `neurex` (case-insensitive)
- `@neurex/` scope
- `--nx-` CSS vars
- `nx-` semantic class prefixes in strings

Allowlisted: `scripts/rebrand/`, this file, and external npm package references
documented in `rebrand-map.json` `skipSubstrings` (unrelated packages on npm).

---

## R0 checklist

| Step | Deliverable                                    | Status                             |
| ---- | ---------------------------------------------- | ---------------------------------- |
| R0.1 | Rebrand scripts + this doc                     | done                               |
| R0.2 | `apply-rebrand --write` + verify pass          | done                               |
| R0.3 | `@lexsys/cli` publish surface in DEPLOY/README | done                               |
| R0.4 | Legacy config fallback                         | **skipped** (no users pre-publish) |
| R0.5 | `tokens:generate:styles` + `registry:sync`     | done                               |
| R0.6 | Token test expectations (`lsys` / `twix`)      | done                               |
| R0.7 | `REBRAND.md` + REVIEW_TODO R0 track            | this doc                           |
| R0.8 | `pnpm check` + PR to `dev`                     | check green; PR pending            |

Track status in [REVIEW_TODO.md § R0](./REVIEW_TODO.md#r0--lexsys-rebrand).
