#!/usr/bin/env node
/**
 * One-time conversion script.
 *
 * Converts hardcoded CSS var prefix strings in test assertions to use the
 * testCssVarPrefix helper, so future `pnpm tokens:re-prefix` runs keep tests
 * in sync without touching them directly.
 *
 * BEFORE:
 *   expect(cls).toContain("bg-(--lex-button-radius)")
 *
 * AFTER:
 *   import { testCssVarPrefix as p } from "../../config/prefix.js"
 *   expect(cls).toContain(`bg-(--${p}-button-radius)`)
 *
 * Targets:
 *   - packages/ui/test/components/**\/*.test.ts
 *   - packages/tokens/test/generator.test.ts
 *
 * Safe to re-run (idempotent — skips files that already have the import).
 */

import { readFileSync, writeFileSync, readdirSync, statSync } from "node:fs"
import { join, resolve, sep as pathSep } from "node:path"

const ROOT = resolve(process.cwd())
const CURRENT_PREFIX = "lex"

// Collect test files to convert
const walk = (dir, exts = [".ts", ".tsx"]) => {
  const results = []
  for (const entry of readdirSync(dir)) {
    const fullPath = join(dir, entry)
    const stat = statSync(fullPath)
    if (stat.isDirectory()) {
      results.push(...walk(fullPath, exts))
    } else if (exts.some((ext) => fullPath.endsWith(ext))) {
      results.push(fullPath)
    }
  }
  return results
}

const UI_TEST_DIR = join(ROOT, "packages/ui/test/components")
const GENERATOR_TEST = join(ROOT, "packages/tokens/test/generator.test.ts")
const CLI_TEST_DIR = join(ROOT, "packages/cli/test")

/**
 * Transforms string literals containing `--{prefix}-` into template literals
 * using `--${p}-`. Handles multiple occurrences within a single string.
 *
 * "bg-(--lex-a) text-(--lex-b)"
 * → `bg-(--${p}-a) text-(--${p}-b)`
 */
const convertStringLiterals = (content, prefix) => {
  return content.replace(/"([^"]*)"/g, (match, inner) => {
    if (!inner.includes(`--${prefix}-`)) return match
    const transformed = inner.replaceAll(`--${prefix}-`, "--${p}-")
    return "`" + transformed + "`"
  })
}

/**
 * Adds the testCssVarPrefix import after the last complete import statement.
 * Handles both single-line and multi-line imports correctly:
 *   single-line: import { foo } from "..."
 *   multi-line end: } from "..."
 */
const addImport = (content, importStatement) => {
  if (content.includes("testCssVarPrefix")) return content

  const lines = content.split("\n")
  let lastImportEndIdx = -1

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    // Single-line import: import ... from "..."
    if (/^import .+ from ["']/.test(line)) {
      lastImportEndIdx = i
    }
    // Closing of a multi-line import: } from "..."
    if (/^} from ["']/.test(line)) {
      lastImportEndIdx = i
    }
  }

  if (lastImportEndIdx === -1) {
    return importStatement + "\n\n" + content
  }

  lines.splice(lastImportEndIdx + 1, 0, importStatement)
  return lines.join("\n")
}

const changed = []

// --- packages/ui/test/components/**/*.test.ts ---
const UI_IMPORT =
  'import { testCssVarPrefix as p } from "../../config/prefix.js"'

for (const filePath of walk(UI_TEST_DIR)) {
  const content = readFileSync(filePath, "utf8")

  if (!content.includes(`--${CURRENT_PREFIX}-`)) continue

  let updated = convertStringLiterals(content, CURRENT_PREFIX)
  updated = addImport(updated, UI_IMPORT)

  if (updated !== content) {
    const relPath = filePath.replace(ROOT + "\\", "").replace(ROOT + "/", "")
    changed.push({ relPath, filePath, updated })
  }
}

// --- packages/tokens/test/generator.test.ts ---
const TOKENS_IMPORT =
  'import { testCssVarPrefix as p } from "./config/prefix.js"'

const genContent = readFileSync(GENERATOR_TEST, "utf8")
if (genContent.includes(`--${CURRENT_PREFIX}-`)) {
  let updated = convertStringLiterals(genContent, CURRENT_PREFIX)
  updated = addImport(updated, TOKENS_IMPORT)

  if (updated !== genContent) {
    const relPath = GENERATOR_TEST.replace(ROOT + "\\", "").replace(
      ROOT + "/",
      "",
    )
    changed.push({ relPath, filePath: GENERATOR_TEST, updated })
  }
}

// --- packages/cli/test/**/*.test.ts ---
// All CLI test files sit one level below test/ (test/commands/, test/install/, etc.)
// so the config is always at "../config/prefix.js" relative to each file.
// Exclude test/config/ itself — those files define testCssVarPrefix, not use it.
const CLI_IMPORT =
  'import { testCssVarPrefix as p } from "../config/prefix.js"'

for (const filePath of walk(CLI_TEST_DIR).filter(
  (f) => !f.includes(`${pathSep}config${pathSep}`),
)) {
  const content = readFileSync(filePath, "utf8")

  if (!content.includes(`--${CURRENT_PREFIX}-`)) continue

  let updated = convertStringLiterals(content, CURRENT_PREFIX)
  updated = addImport(updated, CLI_IMPORT)

  if (updated !== content) {
    const relPath = filePath.replace(ROOT + "\\", "").replace(ROOT + "/", "")
    changed.push({ relPath, filePath, updated })
  }
}

// --- Summary + write ---
if (changed.length === 0) {
  console.log("Nothing to convert — all test files already use dynamic prefix.")
  process.exit(0)
}

console.log(`\nConverting ${changed.length} test files to dynamic prefix:\n`)
for (const { relPath, filePath, updated } of changed) {
  console.log(`  ✓ ${relPath}`)
  writeFileSync(filePath, updated, "utf8")
}

console.log(`\nDone. Run pnpm ui:check && pnpm tokens:check to verify.\n`)
