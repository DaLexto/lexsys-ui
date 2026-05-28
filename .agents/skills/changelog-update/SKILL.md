---
name: changelog-update
description: >
  How to write and update Lexsys CHANGELOG entries after a feature, fix, or breaking
  change merges to dev. Use when adding changelog entries, updating [Unreleased],
  promoting Unreleased to a version block on release, or writing entries for
  CHANGELOG.md, packages/ui/CHANGELOG.md, or packages/cli/CHANGELOG.md.
  Covers ownership model (manually maintained vs Changesets-generated), Keep a
  Changelog section names, consumer-facing tone, footer link format, and which
  package changelogs to never hand-edit.
---

# Changelog Update

Use this skill when you need to write a changelog entry, update `[Unreleased]`,
or promote an Unreleased section to a version block.

---

## Ownership model

Two tiers — know which files to touch before writing anything:

| File                             | Who writes it      | When                                                        |
| -------------------------------- | ------------------ | ----------------------------------------------------------- |
| `CHANGELOG.md` (root)            | Maintainer / agent | Every user-visible change merged to `dev`                   |
| `packages/ui/CHANGELOG.md`       | Maintainer / agent | UI breaking API changes before publish                      |
| `packages/cli/CHANGELOG.md`      | **Changesets**     | Auto-generated on publish — do not hand-edit version blocks |
| `packages/registry/CHANGELOG.md` | **Changesets**     | Auto-generated on publish — do not hand-edit                |
| `packages/entry/CHANGELOG.md`    | **Changesets**     | Auto-generated on publish — do not hand-edit                |

**Default target is always root `CHANGELOG.md`.** Only touch a package changelog when the table above says so.

---

## Procedure

### Step 1 — Identify what changed

Read the diff, PR description, or commit log. Ask: is this change **visible to a consumer** (user of `npx @dalexto/lexsys@next`)?

User-visible changes that go in the changelog:

- New CLI command, flag, or alias
- New installable component, block, or template
- Changed install behavior, output format, or config shape
- Breaking API or prop change
- Security patch in a published dependency

Changes that do NOT go in the changelog:

- Internal refactors, test additions, doc-only changes, tooling bumps, Dependabot version bumps

### Step 2 — Choose the correct section

Use the first matching section:

| Section          | Use for                                         |
| ---------------- | ----------------------------------------------- |
| `### Added`      | New commands, components, flags, features       |
| `### Changed`    | Behavioral changes that are not breaking        |
| `### Fixed`      | Bug fixes visible to consumers                  |
| `### Breaking`   | API, prop, config, or install incompatibilities |
| `### Security`   | Vulnerability fixes in published dependencies   |
| `### Deprecated` | Things going away in a future version           |
| `### Removed`    | Things that are gone                            |
| `### Notes`      | Release logistics, dist-tag policy, known gaps  |

Omit sections that have no entries. Section order must follow the table above.

### Step 3 — Write the entry

Consumer-facing bullet, imperative or noun phrase — not a developer implementation note:

```markdown
<!-- Good -->

- `lexsys add` now accepts multiple component names in a single command

<!-- Good -->

- **Button** — new `danger` variant

<!-- Bad — implementation detail, not consumer-facing -->

- refactored CliError to accept optional suggestion field

<!-- Bad — too vague -->

- improvements to install flow
```

For `### Breaking`, always include a migration note or a link:

```markdown
### Breaking

- **Sidebar** — `items[]` prop removed; use `SidebarContent` + `SidebarGroup` compound parts.
  Migration: [UI_COMPOSITION.md § Compound-first contract](../docs/reference/ui/UI_COMPOSITION.md#compound-first-contract)
```

### Step 4 — Add to `[Unreleased]`

Open root `CHANGELOG.md`. Entries go under `## [Unreleased]`, in the correct section:

```markdown
## [Unreleased]

### Added

- existing entry
- **your new entry here**
```

If the `[Unreleased]` block or the target section does not exist yet, create it at the top of the file, above the latest version block.

### Step 5 — UI breaking changes (if applicable)

If the change is a breaking API change in `packages/ui/src/`, also add to `packages/ui/CHANGELOG.md` under `## Unreleased`. Same format, same rules.

### Step 6 — Footer links (on release only)

When promoting `[Unreleased]` to a version block, update the footer link list at the bottom of `CHANGELOG.md`:

```markdown
[Unreleased]: https://github.com/DaLexto/lexsys-ui/compare/@dalexto/lexsys-cli@0.0.2...HEAD
[0.0.2]: https://github.com/DaLexto/lexsys-ui/compare/@dalexto/lexsys-cli@0.0.1...@dalexto/lexsys-cli@0.0.2
[0.0.1]: https://www.npmjs.com/package/@dalexto/lexsys-cli/v/0.0.1
```

Each new release block gets a comparison link. First release links to npm instead of a diff.

### Step 7 — Verify

```bash
pnpm format:check
```

Changelog entries are markdown-only changes — no package checks required.

---

## Do not

- Hand-edit version blocks in `packages/cli/CHANGELOG.md`, `packages/registry/CHANGELOG.md`, or `packages/entry/CHANGELOG.md` — those are Changesets-managed.
- Mix Changesets `### Patch Changes` format with Keep a Changelog format in the same file.
- Add implementation details, file paths, or internal module names to consumer-facing entries.
- Use `### Planned` for work that is already shipped.
- Leave empty sections (omit a section if it has no entries).

---

## Related

- `$git-commit` — commit the changelog entry after writing
- [docs/operations/DEPLOY.md § Version lane](../docs/operations/DEPLOY.md#version-lane) — dist-tag policy and release promotion
- [Keep a Changelog 1.1.0](https://keepachangelog.com/en/1.1.0/)
