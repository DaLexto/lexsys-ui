---
"@dalexto/lexsys": patch
"@dalexto/lexsys-cli": patch
"@dalexto/lexsys-registry": patch
---

Early-preview release on dist-tag **`next`** (`0.0.5`).

- **Fixed** — `lexsys add` for blocks and templates rewrites `@/components/{primitives,blocks,templates}/…` imports to flat sibling paths under `paths.components`
- **Changed** — registry install metadata for blocks and templates is reconciled from UI source (accurate `registryDependencies` and template paths for maintainers publishing `@dalexto/lexsys-registry`)
