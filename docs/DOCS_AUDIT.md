# Docs Audit Matrix

**Audience:** Maintainers and agents  
**Type:** Audit / inventory (temporary)  
**Source of truth for:** Markdown surface classification during enterprise docs pass (D0–D6)  
**Related docs:** [INDEX.md](./INDEX.md), [documentation-standards.mdc](../.cursor/rules/documentation-standards.mdc) (§ Document layout contract)

This is a **read-only working doc**. Classify and route fixes — do not rewrite source docs from this file. Archive or delete after D6 closes the pass.

---

## Purpose and scope

Surfaces audited:

- Root: `README.md`, `CONTRIBUTING.md`, `AGENTS.md`, `CHANGELOG.md`
- `docs/*.md` (19 files today; this file makes 20)
- Package READMEs: `packages/{tokens,ui,registry,cli}/README.md`
- App README: `apps/playground/README.md`

**Legend — status**

| Status               | Meaning                                        |
| -------------------- | ---------------------------------------------- |
| `current`            | Content matches implementation; no known drift |
| `outdated`           | Known stale claims or post-ship wording        |
| `duplicated`         | Same inventory/rules repeated elsewhere        |
| `target`             | Planned doc or section not created yet         |
| `needs verification` | Not yet checked against code this pass         |

**Legend — layout contract**

| Flag      | Meaning                                                          |
| --------- | ---------------------------------------------------------------- |
| `Y`       | Metadata block + H2 order match declared type                    |
| `partial` | Metadata present or mostly aligned; H2 order or type label drift |
| `N`       | Missing metadata or ad-hoc structure                             |

---

## Root surfaces

| Surface                               | Type                 | Audience               | Canonical owner | Status    | Layout    | Action                                          |
| ------------------------------------- | -------------------- | ---------------------- | --------------- | --------- | --------- | ----------------------------------------------- |
| [README.md](../README.md)             | Project overview     | Evaluators, users      | Self (entry)    | `current` | `partial` | Optional: slim **Audience** metadata            |
| [CONTRIBUTING.md](../CONTRIBUTING.md) | Contributor workflow | Contributors           | Self            | `current` | `partial` | Optional: add `---` after metadata              |
| [AGENTS.md](../AGENTS.md)             | Agent routing        | Agents                 | Self            | `current` | `partial` | Optional: slim **Audience** + **Type** metadata |
| [CHANGELOG.md](../CHANGELOG.md)       | Release history      | Maintainers, consumers | Self            | `current` | `N`       | Exempt (Keep a Changelog format); link only     |

---

## docs/ — routing and vision

| Surface                              | Type                  | Audience            | Canonical owner | Status               | Layout    | Action                                                                |
| ------------------------------------ | --------------------- | ------------------- | --------------- | -------------------- | --------- | --------------------------------------------------------------------- |
| [INDEX.md](./INDEX.md)               | Routing hub           | Maintainers, agents | Self            | `current`            | `Y`       | —                                                                     |
| [ARCHITECTURE.md](./ARCHITECTURE.md) | Architecture overview | Maintainers         | Self            | `current`            | `partial` | D3 — optional H2 rename toward contract (“System shape”); keep as hub |
| [ROADMAP.md](./ROADMAP.md)           | Vision / roadmap      | Maintainers         | Self            | `current`            | `partial` | —                                                                     |
| [REVIEW_TODO.md](./REVIEW_TODO.md)   | Roadmap / backlog     | Maintainers         | Self            | `needs verification` | `partial` | Optional: align M11 / UC.7 rows with merged state                     |

---

## docs/ — domain specifications

| Surface                                          | Type                 | Audience               | Canonical owner                                  | Status    | Layout    | Action                                                          |
| ------------------------------------------------ | -------------------- | ---------------------- | ------------------------------------------------ | --------- | --------- | --------------------------------------------------------------- |
| [TOKENS.md](./TOKENS.md)                         | Domain specification | Token owners           | Self                                             | `current` | `Y`       | Align on rewrite only if token contract changes                 |
| [REGISTRY.md](./REGISTRY.md)                     | Domain specification | Maintainers, agents    | Self                                             | `current` | `Y`       | Exemplar for metadata block                                     |
| [CLI.md](./CLI.md)                               | CLI/API reference    | Users, maintainers     | Self                                             | `current` | `Y`       | —                                                               |
| [UI.md](./UI.md)                                 | Domain specification | Maintainers, agents    | Self                                             | `current` | `partial` | —                                                               |
| [UI_VARIANTS.md](./UI_VARIANTS.md)               | Domain specification | Maintainers, agents    | Self                                             | `current` | `partial` | Optional H2 “What it is” rename from “Purpose”                  |
| [UI_COMPOSITION.md](./UI_COMPOSITION.md)         | Domain specification | Maintainers, consumers | Self                                             | `current` | `partial` | —                                                               |
| [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md)           | Conceptual model     | Maintainers            | Self (concept); [TOKENS.md](./TOKENS.md) (rules) | `current` | `partial` | D2 — INDEX note: conceptual overview; canonical rules in TOKENS |
| [RESOLVER_EVOLUTION.md](./RESOLVER_EVOLUTION.md) | Vision / plan        | Maintainers            | Self                                             | `current` | `partial` | D7 → `reference/tokens/`; no rewrite this pass                  |

---

## docs/ — catalogs and audits

| Surface                          | Type                | Audience            | Canonical owner                                             | Status    | Layout    | Action |
| -------------------------------- | ------------------- | ------------------- | ----------------------------------------------------------- | --------- | --------- | ------ |
| [UI_AUDIT.md](./UI_AUDIT.md)     | Catalog / inventory | Maintainers         | Self (variants); [UI_VARIANTS.md](./UI_VARIANTS.md) (rules) | `current` | `partial` | —      |
| [UI_CATALOG.md](./UI_CATALOG.md) | Catalog / inventory | Maintainers, agents | Self                                                        | `current` | `Y`       | —      |

---

## docs/ — workflow and operations

| Surface                                    | Type                  | Audience                  | Canonical owner | Status    | Layout    | Action                                                   |
| ------------------------------------------ | --------------------- | ------------------------- | --------------- | --------- | --------- | -------------------------------------------------------- |
| [SCRIPTS.md](./SCRIPTS.md)                 | Scripts reference     | Maintainers, agents       | Self            | `current` | `partial` | D5 — add `docs:catalog:check` when script exists         |
| [TESTING.md](./TESTING.md)                 | How-to / verification | Maintainers, agents       | Self            | `current` | `partial` | —                                                        |
| [DEPLOY.md](./DEPLOY.md)                   | Domain spec (release) | Maintainers               | Self            | `current` | `N`       | D3 — add bold metadata block; map H2s to layout contract |
| [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) | Troubleshooting       | Maintainers, contributors | Self            | `current` | `partial` | D7 → `operations/`                                       |

---

## docs/ — contributor style

| Surface                          | Type                    | Audience             | Canonical owner | Status    | Layout    | Action               |
| -------------------------------- | ----------------------- | -------------------- | --------------- | --------- | --------- | -------------------- |
| [STYLE.md](./STYLE.md)           | Contributor style guide | Contributors, agents | Self            | `current` | `partial` | D7 → `contributors/` |
| [STYLEGUIDE.md](./STYLEGUIDE.md) | Contributor style guide | Contributors, agents | Self            | `current` | `partial` | D7 → `contributors/` |

---

## Package and app READMEs

| Surface                                                       | Type                | Audience            | Canonical owner                             | Status    | Layout    | Action                                           |
| ------------------------------------------------------------- | ------------------- | ------------------- | ------------------------------------------- | --------- | --------- | ------------------------------------------------ |
| [packages/ui/README.md](../packages/ui/README.md)             | Package reference   | Maintainers, agents | Self; domain → [UI.md](./UI.md)             | `current` | `Y`       | —                                                |
| [packages/tokens/README.md](../packages/tokens/README.md)     | Package reference   | Maintainers         | Self; domain → [TOKENS.md](./TOKENS.md)     | `current` | `partial` | Add slim **Audience** + **Type** metadata        |
| [packages/registry/README.md](../packages/registry/README.md) | Package reference   | Maintainers         | Self; domain → [REGISTRY.md](./REGISTRY.md) | `current` | `Y`       | —                                                |
| [packages/cli/README.md](../packages/cli/README.md)           | Package reference   | Maintainers         | Self; domain → [CLI.md](./CLI.md)           | `current` | `Y`       | —                                                |
| [apps/playground/README.md](../apps/playground/README.md)     | App smoke reference | Maintainers         | [TESTING.md](./TESTING.md)                  | `current` | `partial` | Optional: align **Role** → **Audience** metadata |

---

## Cross-cutting duplication map

| Content                             | Canonical owner (target)    | Also appears in                                            | Phase             |
| ----------------------------------- | --------------------------- | ---------------------------------------------------------- | ----------------- |
| Installable compound/leaf inventory | **UI_CATALOG.md** (D1)      | README, UI_COMPOSITION § Current state, packages/ui/README | D1, D3            |
| Variant compliance rows             | UI_AUDIT.md                 | —                                                          | D4 (scope fix)    |
| Composition rules                   | UI_COMPOSITION.md           | UI.md (links only)                                         | D3 (dedup lists)  |
| Monorepo script names               | SCRIPTS.md                  | DEPLOY, TESTING (links OK)                                 | —                 |
| M-phase status                      | ROADMAP + REVIEW_TODO       | INDEX, AGENTS                                              | D2, D3            |
| Document layout rules               | documentation-standards.mdc | INDEX, CONTRIBUTING, docs-routing                          | D-Format **done** |

---

## Pass checklist (close in D6)

| ID       | Item                                             | Owner phase | Done |
| -------- | ------------------------------------------------ | ----------- | ---- |
| D-Format | Layout contract in documentation-standards.mdc   | D-Format    | yes  |
| D0       | This audit matrix                                | D0          | yes  |
| D1       | UI_CATALOG.md + audit script                     | D1          | yes  |
| D2       | INDEX refresh (M11, catalog row)                 | D2          | yes  |
| D3       | Dedup README, UI_COMPOSITION, UI.md, ROADMAP M11 | D3          | yes  |
| D4       | UI_AUDIT scope + stale rows                      | D4          | yes  |
| D5       | docs-alignment skill + SCRIPTS catalog check     | D5          | —    |
| D6       | format:check + catalog:check                     | D6          | —    |
| D7       | Folder migration (reference-by-package)          | Later       | —    |

---

## Related docs

- [INDEX.md](./INDEX.md) — routing hub
- [documentation-standards.mdc](../.cursor/rules/documentation-standards.mdc) — layout contract (D-Format)
- [REVIEW_TODO.md](./REVIEW_TODO.md) — execution queue (may absorb open doc items)
