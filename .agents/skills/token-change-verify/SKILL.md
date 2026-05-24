---
name: token-change-verify
description: >
  Verify Neurex token layer edits — tokens:check, governance report, style
  generation, registry style sync. Use when editing packages/tokens, TOKENS.md
  validation, themes, semantics, or component token files.
---

# Token change verify

Canonical rules: [docs/TOKENS.md](../../docs/TOKENS.md).

## When to use

- Changes under `packages/tokens/src/` (primitives, brand, semantics, components, themes)
- Generator or validator changes
- Contrast / governance policy updates

## Procedure

1. Run token package gate:

```sh
pnpm tokens:check
```

2. Regenerate CSS outputs when source tokens changed:

```sh
pnpm tokens:generate:styles
```

3. If registry style templates must match:

```sh
pnpm sync:styles
pnpm registry:check
```

4. Optional governance report (CI policy):

```sh
pnpm tokens:governance:report
```

5. If UI variants reference new/changed `--nx-*` variables, ensure UI still passes:

```sh
pnpm ui:check
```

## Layer reminders (do not duplicate — see TOKENS.md)

- primitives → brand → semantics → components; themes override semantics
- component tokens reference semantics only
- CSS is generated — never hand-write `tokens.css` / `theme.css` in packages

## Related

- [docs/RESOLVER_EVOLUTION.md](../../docs/RESOLVER_EVOLUTION.md) — deferred capabilities
- `$registry-sync` / `pnpm sync:all` when style templates change
- `$monorepo-check-gate`
