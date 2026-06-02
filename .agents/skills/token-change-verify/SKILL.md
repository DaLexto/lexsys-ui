---
name: token-change-verify
description: >
  Token-layer verification checklist after packages/tokens edits. Agent plans
  commands from this skill; user runs them unless they ask the agent to run.
  Use when editing tokens, TOKENS.md validation, themes, semantics, or
  component token files.
---

# Token change verify

Canonical rules: [docs/reference/tokens/TOKENS.md](../../docs/reference/tokens/TOKENS.md).

**Handoff:** Output a **numbered checklist** from the procedure below; **do not run** `pnpm` unless the user explicitly asks. Wait for pass or pasted errors. For multi-package work, prefer [`$agent-workflow`](../../.cursor/skills/agent-workflow/SKILL.md) step 4.

## When to use

- Changes under `packages/tokens/src/` (primitives, brand, semantics, components, themes)
- Generator or validator changes
- Contrast / governance policy updates

## Procedure (user runs; agent plans)

Issue these in order; skip steps that do not apply to the diff:

```sh
pnpm tokens:check
pnpm tokens:generate:styles    # when source tokens changed
pnpm sync:styles               # when registry style templates must match
pnpm registry:check
pnpm tokens:governance:report  # optional; CI policy
pnpm ui:check                  # when UI variants reference new/changed CSS vars
```

If registry templates need a full sync after style changes, add `$registry-sync` steps to the checklist.

## Layer reminders (do not duplicate — see TOKENS.md)

- primitives → brand → semantics → components; themes override semantics
- component tokens reference semantics only
- CSS is generated — never hand-write `tokens.css` / `theme.css` in packages

## Related

- [docs/reference/tokens/RESOLVER_EVOLUTION.md](../../docs/reference/tokens/RESOLVER_EVOLUTION.md) — deferred capabilities
- `$registry-sync` — when UI templates and `src/items/` must follow token/style changes
- [`$agent-workflow`](../../.cursor/skills/agent-workflow/SKILL.md)
- `$monorepo-check-gate` — path → command map for broader diffs
