---
"@dalexto/lexsys": patch
"@dalexto/lexsys-cli": patch
"@dalexto/lexsys-registry": patch
---

Token fixes, CardAction compound part, and Empty block.

- Register missing `meterComponentTokens`; fix DTCG `$value` key in `meter.ts`
- Add `menu.item.focus.ring.*` tokens (fixes `--lex-menu-item-focus-ring-*` references)
- Add `size.64` primitive + `sidebar.width` / `commandPalette.list.maxHeight` semantic tokens
- Add `empty.*` component token namespace (`--lex-empty-*`)
- Ship `CardAction` as a formal `CardHeader` compound part
- Add `Empty` block: `Empty / EmptyHeader / EmptyMedia / EmptyTitle / EmptyDescription / EmptyContent`
- Add `empty` registry item (`type: block`, `category: layout`, `version: 0.0.3`)
