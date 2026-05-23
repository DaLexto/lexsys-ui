# Neurex Troubleshooting

**Audience:** Maintainers, contributors, and users
**Type:** Troubleshooting reference
**Source of truth for:** Known failure modes and their verified fixes
**Verified against:** `packages/cli/src/`, `packages/tokens/src/`, `packages/registry/src/`

Each entry includes a symptom, cause, and fix verified against the source.

---

## CLI

### `neurex: command not found`

**Cause:** The CLI binary is not installed or not in PATH.

**Fix:**

```sh
# Install globally
npm install -g neurex

# Or run via pnpm exec in the consumer project
pnpm exec neurex init
```

---

### `Unknown command: <command>`

**Cause:** The command is not recognized. Possible typo or unsupported command.

**Fix:** Run `neurex help` to see the current command list. Supported commands:
`init`, `add`, `update`, `list`, `status`, `doctor`, `config`, `registry`,
`uninstall`, `version`, `help`.

---

### `neurex init` fails with missing `neurex.config.json`

**Cause:** `init` has not been run yet, or was run in a different directory.

**Fix:**

```sh
neurex init          # run in the consumer project root
# or
neurex --cwd /path/to/project init
```

---

### `neurex add` reports all files as conflicted

**Cause:** The files already exist in the consumer project with content that
does not match the current registry template. The CLI detected user edits.

**Fix:** Review the conflict. If you want to overwrite with the latest template:

```sh
neurex update <component>
```

If you want to keep your edits, the conflict is intentional — no action needed.

---

### `neurex add` silently skips a component

**Cause:** The installed version matches the registry template exactly. The CLI
correctly skipped the unchanged files.

**Fix:** Run `neurex status` to confirm the installed version. If you expect an
update, run `neurex update <component>`.

---

### `neurex init` does not wire Tailwind CSS

**Cause:** The CLI looks for the `tailwind.css` path from `neurex.config.json`
(default: `src/style.css`). If the file does not exist, the Tailwind import is
not injected.

**Fix:** Create the CSS entrypoint file before running `neurex init`, or set
the correct path in `neurex.config.json`:

```json
{ "tailwind": { "css": "src/styles/globals.css" } }
```

---

### Registry source falls back to local when remote is set

**Cause:** The remote registry URL in `neurex.config.json` is unreachable or
returns an invalid response.

**Fix:**

```sh
neurex registry --source   # check which source is active
neurex config --set-registry-url ""  # clear the URL to force local
```

---

## Tokens

### Token build fails with `MISSING_REFERENCE`

**Cause:** A token references a path that does not exist in the merged token tree.

**Example error:**

```
[MISSING_REFERENCE] Cannot resolve reference "{action.primary.hover}" at "button.primary.hoverBackground"
```

**Fix:** Check that the referenced token exists at the exact path. Reference paths
are case-sensitive. Verify the group name matches the group's `name` or `component`
field (e.g. `action`, not `actions`).

---

### Token build fails with `CIRCULAR_REFERENCE`

**Cause:** Two or more tokens form a reference cycle.

**Fix:** Trace the chain printed in the error. One of the tokens in the cycle
must be replaced with a concrete value or a reference to a token outside the cycle.

---

### Token build fails with `REFERENCE_POINTS_TO_BRANCH`

**Cause:** A token references an intermediate branch node, not a leaf with `$value`.

**Example:**

```
{color.primary}   ← this is a branch, not a leaf
{color.primary.base}  ← correct, this is a leaf
```

**Fix:** Update the reference to point to a specific leaf node.

---

### CSS output contains wrong variable name

**Cause:** The CSS variable name is derived from the token path with group name
overrides applied (`spacing→space`, `motion-duration→duration`, `motion-easing→easing`).

**Fix:** Check `packages/tokens/src/generators/generator.config.ts` for the full
override map. Do not invent variable names manually — they are generated output.

---

### Token CSS file is empty or outdated

**Cause:** The token build has not been run, or only the package outputs were
built without updating the registry templates.

**Fix:**

```sh
pnpm tokens:generate:styles   # regenerate dist + registry style templates
pnpm registry:check           # verify style templates are in sync
```

---

## Registry

### `pnpm registry:check` fails with template drift

**Cause:** A UI component was edited but `pnpm registry:sync` was not run.

**Fix:**

```sh
pnpm registry:sync    # sync UI source → registry templates
pnpm registry:check   # verify (should pass now)
```

---

### `validateRegistryItem` throws for a new item

**Cause:** The new registry item is missing a required field or has an invalid
`category` or `type` value.

**Fix:** Check the `RegistryItem` type in `packages/registry/src/registry.types.ts`.
All fields are required except `remoteFiles`. Valid `category` values: `actions`,
`forms`, `overlays`, `navigation`, `feedback`, `layout`, `data-display`, `utilities`.

---

## Build and Typecheck

### `pnpm typecheck` fails in `packages/cli` or `packages/registry`

**Cause:** These packages use `NodeNext` module resolution. All relative imports
MUST end in `.js`, even when the source file is `.ts`.

**Fix:** Check the failing import. Add the `.js` extension:

```ts
import { fileExists } from "./fs.js" // correct
import { fileExists } from "./fs" // incorrect for NodeNext
```

---

### `pnpm build` fails for `packages/tokens` with validation errors

**Cause:** The token pipeline runs reference validation during the build. A
missing, circular, or malformed reference will throw and stop output generation.

**Fix:** Run `pnpm tokens:check` to see the full error output, then fix the
failing token reference.

---

### Playground fails to build after token changes

**Cause:** The playground depends on the built token CSS. If `@neurex/tokens`
has not been rebuilt after token source changes, the playground uses stale output.

**Fix:**

```sh
pnpm tokens:build
pnpm playground:build
# or for dev
pnpm tokens:build && pnpm playground:dev
```
