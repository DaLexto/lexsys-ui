---
name: token-change-verify
description: >
  Token-layer rules and when to verify after packages/tokens edits. Use when
  editing tokens, TOKENS.md validation, themes, semantics, or component token
  files. For pnpm commands, use $monorepo-verify-gate scenarios tokens or
  tokens-styles-registry.
---

# Token change verify

Canonical rules: [docs/reference/tokens/TOKENS.md](../../docs/reference/tokens/TOKENS.md).

**Verify commands:** do not list `pnpm` steps here — use **[`$monorepo-verify-gate`](../../.cursor/skills/monorepo-verify-gate/SKILL.md)** scenarios **`tokens`** or **`tokens-styles-registry`** (step 4 of [`$agent-workflow`](../../.cursor/skills/agent-workflow/SKILL.md)). Agent plans; **you run**; reply **`verify passed`** or paste errors.

## When to use

- Changes under `packages/tokens/src/` (primitives, brand, semantics, components, themes)
- Generator or validator changes
- Contrast / governance policy updates
- Layer reminders while implementing (below)

## Layer reminders (do not duplicate — see TOKENS.md)

- primitives → brand → semantics → components; themes override semantics
- component tokens reference semantics only
- CSS is generated — never hand-write `tokens.css` / `theme.css` in packages

## Related

- [docs/reference/tokens/RESOLVER_EVOLUTION.md](../../docs/reference/tokens/RESOLVER_EVOLUTION.md) — deferred capabilities
- [`$monorepo-verify-gate`](../../.cursor/skills/monorepo-verify-gate/SKILL.md) — checklist commands
- `$registry-sync` — when UI templates and `src/items/` must follow token/style changes
- [`$agent-workflow`](../../.cursor/skills/agent-workflow/SKILL.md)
