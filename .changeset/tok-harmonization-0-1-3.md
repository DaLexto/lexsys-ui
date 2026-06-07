---
"@dalexto/lexsys": patch
"@dalexto/lexsys-cli": patch
"@dalexto/lexsys-registry": patch
---

TOK.7 and TOK.8 token harmonization: component token slots across blocks and templates, spacing literal removal from install variants, motion duration tier retune (`surface` 250ms, `overlayEnter` / `layout` 350ms), and regenerated `tokens.css` / `theme.css`. Consumers should run `lexsys update --sync --styles` (and `lexsys update` on affected blocks) to pick up template and CSS changes.
