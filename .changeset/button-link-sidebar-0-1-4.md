---
"@dalexto/lexsys": patch
"@dalexto/lexsys-cli": patch
"@dalexto/lexsys-registry": patch
---

ButtonLink primitive (`lexsys add button button-link`) for link-styled buttons without hand-wiring `nativeButton={false}`. Sidebar mobile drawer fix: `nativeButton={false}` on `DrawerClose` when nav links use anchor hosts — removes Base UI dev warning. Consumers should run `lexsys update sidebar` and `lexsys add button button-link` as needed.
