---
"@dalexto/lexsys": minor
"@dalexto/lexsys-cli": minor
"@dalexto/lexsys-registry": minor
---

Table primitive, CLI config migration, and template-drift tooling (0.0.4 @ `next`).

- Add **Table** compound primitive (`lexsys add table`) with `--lex-table-*` tokens
- Add **`lexsys reset`** (`--dry-run`, `--with-deps`)
- **Breaking:** `lexsys.config.json` `installed` is `string[]`; legacy map migrates and persists on load
- **Changed:** `status` / `update` drift via template hash; registry items drop per-item `version`
