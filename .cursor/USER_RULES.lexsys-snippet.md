# Paste into Cursor → Settings → Rules → **User Rules**

Copy the block below into your global User Rules (applies to all projects; keep Lexsys block at the top or use only in Lexsys sessions).

```text
Lexsys monorepo (lexsys): OVERRIDE agent-developer habits.

NEVER run pnpm *:check, *:test, pnpm check, format:check, format, registry:sync, or vitest unless I explicitly say "run verify" or name the command.

Default = Lexsys router: you output a numbered checklist → I run commands → I reply verify passed → then you may do git.

"commit", "push", "PR", or "ff main" does NOT skip verify or format:check. Do not mark checks as passed in PR bodies without my confirmation.
```

Project rule with the same contract: `.cursor/rules/lexsys-agent-mode.mdc` (`alwaysApply: true`).
