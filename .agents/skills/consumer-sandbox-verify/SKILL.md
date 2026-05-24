---
name: consumer-sandbox-verify
description: >
  Manual consumer sandbox checklist for CLI, registry, template, and
  blocks/templates PRs. Use for neurex add, dashboard-shell, Sidebar mobile,
  PulseDesk sandbox, install smoke, or pre-PR consumer verification.
---

# Consumer sandbox verification

External project outside the monorepo — example: `D:\PLAYGROUND\sandbox-neurex`.

Policy: [docs/TESTING.md § Verification surfaces](../../docs/TESTING.md#verification-surfaces).

## When required

- Changes to `packages/cli/`, `packages/registry/`, install templates, or blocks/templates
- Before PRs that affect what users install (not optional for those paths)
- **Not** a substitute for `pnpm cli:check` / `pnpm registry:check` — run both

## Prerequisites

- Built CLI/registry from branch under test:

```sh
pnpm --filter @neurex/registry build && pnpm --filter neurex build
```

- Link or install CLI into sandbox per your local workflow.

## Base checklist

1. Link or install CLI from monorepo branch.
2. **Vite regression:** `neurex add <component>` (or re-init if scaffold changed); `neurex update --styles`; production build.
3. **Next.js smoke:** fresh dir — `neurex init next`; `neurex add button`; build.
4. Spot-check `paths.components`, `neurex.config.json`, token CSS imports.
5. If styles changed: confirm `styles/tokens.css` and `styles/theme.css` update.

## Blocks/templates checklist

When FormField, Sidebar, or DashboardShell change:

1. Fresh or updated: `neurex add dashboard-shell` (transitive closure).
2. Flat layout: `src/components/ui/DashboardShell/`, `Sidebar/` — no `blocks/` or `templates/` in consumer tree.
3. Narrow viewport (`< md`): drawer opens; nav items stack vertically (`DrawerClose appearance="inline"`).
4. `neurex uninstall dashboard-shell --dry-run` and `--with-deps --dry-run` — orphan hints sane.
5. Compare drawer to playground overlays panel if Sidebar/Drawer composition changed.

## Refresh after conflicts

Delete installed component folders, then re-add:

```sh
neurex add drawer sidebar dashboard-shell
```

## Record failures

Log gaps in [docs/REVIEW_TODO.md](../../docs/REVIEW_TODO.md) — sandbox is manual, not CI.

## Related

- `$registry-sync`
- `$monorepo-check-gate`
- [docs/REVIEW_TODO.md § Blocks/templates optimization backlog](../../docs/REVIEW_TODO.md#blocks--templates-optimization-backlog)
