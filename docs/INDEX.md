# Lexsys Documentation Index

**Audience:** Maintainers, contributors, and agents  
**Type:** Routing hub  
**Source of truth for:** Which document owns which topic — not the rules themselves

Use this index to find the canonical document. Do not duplicate domain rules in
[AGENTS.md](../AGENTS.md) or Cursor rules — link here instead.

---

## Start here

| Question                                       | Read                                  |
| ---------------------------------------------- | ------------------------------------- |
| What is Lexsys and how does install flow work? | [ARCHITECTURE.md](./ARCHITECTURE.md)  |
| What should I work on next?                    | [REVIEW_TODO.md](./REVIEW_TODO.md)    |
| Long-term direction and M-phases               | [ROADMAP.md](./ROADMAP.md)            |
| Agent routing and always-on guardrails         | [AGENTS.md](../AGENTS.md)             |
| Human contributor workflow                     | [CONTRIBUTING.md](../CONTRIBUTING.md) |
| Document layout and authoring standards        | [documentation-standards.mdc](../.cursor/rules/documentation-standards.mdc) |

---

## Domain specifications (canonical rules)

| Document                                 | Owns                                                             |
| ---------------------------------------- | ---------------------------------------------------------------- |
| [TOKENS.md](./TOKENS.md)                 | Token layers, references, resolution, validation, CSS generation |
| [REGISTRY.md](./REGISTRY.md)             | Registry items, templates, sync, validation, remote contract     |
| [CLI.md](./CLI.md)                       | `lexsys` commands, flags, config, install behavior               |
| [UI.md](./UI.md)                         | Reference component contract, file structure, Base UI boundaries |
| [UI_VARIANTS.md](./UI_VARIANTS.md)       | Public variant props, CVA rules, styling taxonomy                |
| [UI_COMPOSITION.md](./UI_COMPOSITION.md) | Primitives → blocks → templates; monorepo vs consumer paths      |
| [UI_AUDIT.md](./UI_AUDIT.md)             | Per-component variant compliance inventory                       |
| [STYLE.md](./STYLE.md)                   | TypeScript, React, import/export coding style                    |
| [STYLEGUIDE.md](./STYLEGUIDE.md)         | Component naming, `lsys-` classes, Tailwind patterns             |
| [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md)   | Token authoring guide and design system overview                 |
| [DEPLOY.md](./DEPLOY.md)                 | Build pipeline, npm publish (M10 shipped), artifact contract     |

---

## Workflow and reference

| Document                                         | Owns                                                                                              |
| ------------------------------------------------ | ------------------------------------------------------------------------------------------------- |
| [SCRIPTS.md](./SCRIPTS.md)                       | Monorepo `pnpm` script names, sync workflows, CI gates (**only** place for full script inventory) |
| [TESTING.md](./TESTING.md)                       | Verification surfaces, test coverage by package, sandbox checklist                                |
| [TROUBLESHOOTING.md](./TROUBLESHOOTING.md)       | Common failure modes and diagnostics                                                              |
| [RESOLVER_EVOLUTION.md](./RESOLVER_EVOLUTION.md) | Post–Phase 10 resolver direction (target / deferred work)                                         |

---

## Vision and backlog

| Document                           | Owns                                                            |
| ---------------------------------- | --------------------------------------------------------------- |
| [ROADMAP.md](./ROADMAP.md)         | Tokens phases, monorepo M1–M10 sequencing, UI composition track |
| [REVIEW_TODO.md](./REVIEW_TODO.md) | Active execution queue, known gaps, BO backlog                  |

Roadmap and REVIEW_TODO entries are **future or in-progress work** unless marked
shipped. Current implementation contracts live in domain specs above.

---

## Repo-local agent skills

Task-specific procedures live in [`.agents/skills/`](../.agents/skills/). See
[AGENTS.md § Repo skills](../AGENTS.md#repo-skills).

---

## Package READMEs

| Path                                                          | Purpose                               |
| ------------------------------------------------------------- | ------------------------------------- |
| [packages/ui/README.md](../packages/ui/README.md)             | UI package role and primitive list    |
| [packages/tokens/README.md](../packages/tokens/README.md)     | Tokens package internals (if present) |
| [packages/registry/README.md](../packages/registry/README.md) | Registry package internals            |
| [packages/cli/README.md](../packages/cli/README.md)           | CLI package internals                 |
