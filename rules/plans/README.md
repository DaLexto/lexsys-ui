# Rules plans (Talas 1 sandbox)

Temporary workspace for **new** Cursor domain rules before you move them to `.cursor/rules/`.

| Artifact | Purpose |
| -------- | ------- |
| [RULES_CATALOG.md](./RULES_CATALOG.md) | **Conclusions only** — after we agree each proposal |
| [proposals/](./proposals/) | One discussion file per candidate rule (**start here**) |
| `<name>.md` | Implementation plan — after catalog says NEED |
| [typescript.md](./typescript.md) | `typescript.mdc` |
| [code-commenting.md](./code-commenting.md) | `code-commenting.mdc` |
| [ui-components.md](./ui-components.md) | `ui-components.mdc` |
| [testing.md](./testing.md) | `testing.mdc` |
| [documentation.md](./documentation.md) | `documentation.mdc` |
| [../../RULES_REPLACEMENT_MAP.txt](../../RULES_REPLACEMENT_MAP.txt) | Old `.cursor/rules/` → new file mapping |

**Authoring guide (required when writing any `rules/*.mdc`):** [.cursor/rules/cursor-rules.mdc](../../.cursor/rules/cursor-rules.mdc) — frontmatter, single responsibility, size budget, scope / required / forbidden. Read it before each rule; per-rule `<name>.md` plans add Lexsys-specific content only.

**Verification section:** optional per `cursor-rules.mdc` — add only when it prevents a real mistake agents repeat; skip if redundant with “Do not” + links (e.g. `typescript.mdc` has no § Verification).

**Not loaded by Cursor** until files live under `.cursor/rules/`.

**Waves:** 1 = rules (here) → 2 = skills refactor → 3 = full repo link alignment.
