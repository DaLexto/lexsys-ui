# Token verify procedures

Step-by-step work for [`$token-verify`](./SKILL.md). Contract: [TOKENS.md](../../docs/reference/tokens/TOKENS.md). Commands: [`$monorepo-verify-gate`](../monorepo-verify-gate/SKILL.md) only — not duplicated here.

---

## Verify scenarios

Pick the verify-gate scenario from what you changed. Agent loads **`$monorepo-verify-gate`** step 4; you run the checklist.

| Change set                                                                   | Scenario                                                                                  |
| ---------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| Token source / resolver / generator only (no registry style drift)           | **`tokens`**                                                                              |
| Token CSS generator output must update `packages/registry/templates/styles/` | **`tokens-styles-registry`**                                                              |
| Tokens + UI in one slice                                                     | **`tokens`**, then **`ui-registry`** or **`tokens-styles-registry`** as the diff dictates |
| Overlay / elevation tokens affecting installed block CSS                     | Add **`tokens-styles-registry`** when style templates must match                          |

Human sync table: [SCRIPTS.md § Sync workflows](../../docs/operations/SCRIPTS.md#sync-workflows). Root aliases: `pnpm sync:all` → `registry:sync` + `tokens:generate:styles`.

---

## Post-generate review

After the user runs **`tokens-styles-registry`** (or `tokens:generate:styles` then `registry:check`):

1. Expect updates under `packages/tokens/dist` (built CSS outputs).
2. Expect `packages/registry/templates/styles/{tokens,theme}.css` — **never** hand-edit.
3. `pnpm registry:check` compares style templates to token output via `check-registry-styles-sync.mjs`.
4. If UI install templates also changed, user may need **`$registry-sync`** / **`ui-registry`** separately.

---

## Scripts pipeline

| Command / script                                           | Role                                                                   |
| ---------------------------------------------------------- | ---------------------------------------------------------------------- |
| `pnpm tokens:check`                                        | Lint, typecheck, test `@dalexto/lexsys-tokens`                         |
| `pnpm tokens:generate:styles`                              | Write dist + registry `templates/styles/` via `write-style-outputs.ts` |
| `packages/tokens/scripts/governance-report.ts`             | Optional governance / contrast reporting                               |
| `packages/registry/scripts/check-registry-styles-sync.mjs` | Drift check (may build tokens dist first)                              |
| `pnpm registry:styles:sync`                                | Alias for `tokens:generate:styles` through registry filter             |

---

## Cross-skill handoff

| Situation                                         | Skill / scenario                                                                                            |
| ------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| Only token layers changed                         | **`tokens`**                                                                                                |
| Registry style templates must match new token CSS | **`tokens-styles-registry`** (includes `sync:all` path when both UI and token CSS changed — see SCRIPTS.md) |
| UI component templates / items                    | **`$registry-sync`** + **`ui-registry`** — not this skill                                                   |

---

## Commit split

Prefer `feat(tokens)` first. If `templates/styles/` or registry style outputs changed, follow with `feat(registry)` or note `pnpm tokens:generate:styles` in the registry commit body. Policy: [git-commits.mdc](../../.cursor/rules/git-commits.mdc).
