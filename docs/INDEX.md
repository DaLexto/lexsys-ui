# Lexsys Documentation Index

**Audience:** Maintainers, contributors, and agents  
**Type:** Routing hub  
**Source of truth for:** Which document owns which topic — not the rules themselves
**Last reviewed:** 2026-05-30

---

Use this index to find the canonical document. Do not duplicate domain rules in
[AGENTS.md](../AGENTS.md) or Cursor rules — link here instead.

**Doc types:** routing hub · domain specification · catalog / inventory · workflow · vision / backlog

**Layout:** `docs/reference/{tokens,ui,registry,cli}/` · `docs/operations/` · `docs/contributors/` · root hub docs below

---

## Start here

| Question                                       | Read                                                                        |
| ---------------------------------------------- | --------------------------------------------------------------------------- |
| What is Lexsys and how does install flow work? | [ARCHITECTURE.md](./ARCHITECTURE.md)                                        |
| What is installable — compound vs leaf?        | [UI_CATALOG.md](./reference/ui/UI_CATALOG.md)                               |
| What should I work on next?                    | [REVIEW_TODO.md](./REVIEW_TODO.md)                                          |
| Long-term direction and M-phases               | [ROADMAP.md](./ROADMAP.md)                                                  |
| Agent routing and always-on guardrails         | [AGENTS.md](../AGENTS.md)                                                   |
| Human contributor workflow                     | [CONTRIBUTING.md](./contributors/CONTRIBUTING.md)                           |
| Document layout and authoring standards        | [documentation-standards.mdc](../.cursor/rules/documentation-standards.mdc) |

---

## Reference — tokens

| Document                                                          | Owns                                                             |
| ----------------------------------------------------------------- | ---------------------------------------------------------------- |
| [TOKENS.md](./reference/tokens/TOKENS.md)                         | Token layers, references, resolution, validation, CSS generation |
| [DESIGN_SYSTEM.md](./reference/tokens/DESIGN_SYSTEM.md)           | Conceptual token/design overview — canonical rules in TOKENS.md  |
| [RESOLVER_EVOLUTION.md](./reference/tokens/RESOLVER_EVOLUTION.md) | Post–Phase 10 resolver direction (target / deferred work)        |

---

## Reference — UI

| Document                                              | Owns                                                             |
| ----------------------------------------------------- | ---------------------------------------------------------------- |
| [UI.md](./reference/ui/UI.md)                         | Reference component contract, file structure, Base UI boundaries |
| [UI_VARIANTS.md](./reference/ui/UI_VARIANTS.md)       | Public variant props, CVA rules, styling taxonomy                |
| [UI_COMPOSITION.md](./reference/ui/UI_COMPOSITION.md) | Primitives → blocks → templates; compound-first composition      |
| [UI_CATALOG.md](./reference/ui/UI_CATALOG.md)         | Installable surface — compound vs leaf, named exports (49 items) |
| [UI_AUDIT.md](./reference/ui/UI_AUDIT.md)             | **Variant / CVA compliance only** — composition → UI_CATALOG.md  |

Drift check: `pnpm ui:audit:catalog:check` — see [UI_CATALOG.md § Generation](./reference/ui/UI_CATALOG.md#generation-and-drift-checks).

---

## Reference — registry and CLI

| Document                                        | Owns                                                         |
| ----------------------------------------------- | ------------------------------------------------------------ |
| [REGISTRY.md](./reference/registry/REGISTRY.md) | Registry items, templates, sync, validation, remote contract |
| [CLI.md](./reference/cli/CLI.md)                | `lexsys` commands, flags, config, install behavior           |

---

## Operations

| Document                                              | Owns                                                                                              |
| ----------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| [SCRIPTS.md](./operations/SCRIPTS.md)                 | Monorepo `pnpm` script names, sync workflows, CI gates (**only** place for full script inventory) |
| [TESTING.md](./operations/TESTING.md)                 | Verification surfaces, test coverage by package, sandbox checklist                                |
| [DEPLOY.md](./operations/DEPLOY.md)                   | Build pipeline, npm publish (M10 shipped), artifact contract                                      |
| [TROUBLESHOOTING.md](./operations/TROUBLESHOOTING.md) | Common failure modes and diagnostics                                                              |

---

## Contributors

| Document                                          | Owns                                                |
| ------------------------------------------------- | --------------------------------------------------- |
| [CONTRIBUTING.md](./contributors/CONTRIBUTING.md) | Human contributor workflow, PR gates, labels        |
| [STYLE.md](./contributors/STYLE.md)               | TypeScript, React, import/export coding style       |
| [STYLEGUIDE.md](./contributors/STYLEGUIDE.md)     | Component naming, `lex-` classes, Tailwind patterns |

---

## Vision and backlog

| Document                           | Owns                                                                |
| ---------------------------------- | ------------------------------------------------------------------- |
| [ROADMAP.md](./ROADMAP.md)         | Tokens phases, monorepo **M1–M11** sequencing, UI composition track |
| [REVIEW_TODO.md](./REVIEW_TODO.md) | Active execution queue, known gaps, BO backlog                      |

Roadmap and REVIEW_TODO entries are **future or in-progress work** unless marked
shipped. Current implementation contracts live in reference docs and catalogs above.

---

## Repo-local agent skills

Task-specific procedures live in [`.agents/skills/`](../.agents/skills/). See
[AGENTS.md § Repo skills](../AGENTS.md#repo-skills). Layout authoring:
[`$docs-authoring`](../.agents/skills/docs-authoring/SKILL.md). Freshness pass:
[`$docs-alignment`](../.agents/skills/docs-alignment/SKILL.md).

---

## Package READMEs

| Path                                                          | Purpose                                                                                |
| ------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| [packages/ui/README.md](../packages/ui/README.md)             | UI package role — compound/leaf detail → [UI_CATALOG.md](./reference/ui/UI_CATALOG.md) |
| [packages/tokens/README.md](../packages/tokens/README.md)     | Tokens package internals                                                               |
| [packages/registry/README.md](../packages/registry/README.md) | Registry package internals                                                             |
| [packages/cli/README.md](../packages/cli/README.md)           | CLI package internals                                                                  |
