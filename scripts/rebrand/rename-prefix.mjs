#!/usr/bin/env node
/**
 * Renames the CSS variable and BEM class prefix across the codebase and
 * regenerates all build artifacts.
 *
 * WHAT GETS UPDATED
 * -----------------
 * Source files  — packages/ui/src/**  (variant files, cn.ts, etc.)
 *                 packages/tokens/src/generators/outputs/css/** (code comments)
 *                 packages/cli/src/**
 *                 packages/registry/src/**
 * Token config  — packages/tokens/src/generators/generator.config.ts (cssVarPrefix value)
 * Docs          — docs/**\/*.md + root *.md (README, CONTRIBUTING, AGENTS, etc.)
 * Test files    — packages/registry/test/** (fixture CSS var names)
 *                 apps/playground/src/** (live CSS var references)
 * Test configs  — packages/ui/test/config/prefix.ts
 *                 packages/tokens/test/config/prefix.ts
 *                 packages/cli/test/config/prefix.ts
 *                 (single mirrored constants; test assertions use these dynamically)
 *
 * WHAT DOES NOT GET UPDATED
 * -------------------------
 * packages/tokens/test/css-generator.test.ts — intentionally uses cssVarPrefix: "lsys"
 *   as an explicit test input value (not tracking the current brand prefix). The test
 *   verifies that the generator uses whatever prefix is given; the fixture value is arbitrary.
 * packages/ui/test/components/** and packages/cli/test/** — test assertions use
 *   testCssVarPrefix dynamically; they stay correct automatically after this script
 *   updates the test config files above.
 * Package names / import paths — lexsys-* names are intentional and unrelated.
 * Token primitive/semantic values — don't carry the CSS variable prefix.
 *
 * POST-RENAME
 * -----------
 * After writing files, the script automatically runs (in order):
 *   pnpm tokens:generate:styles  — regenerates CSS with the new prefix
 *   pnpm registry:sync           — propagates updated variant templates
 *   pnpm format                  — formats all touched files (Prettier)
 *   pnpm check                   — lint + typecheck + tests (full gate)
 *
 * Usage:
 *   node scripts/rebrand/rename-prefix.mjs --to lex
 *   node scripts/rebrand/rename-prefix.mjs --to lex --from lsys --dry-run
 */

import {
  readFileSync,
  writeFileSync,
  readdirSync,
  statSync,
  existsSync,
} from "node:fs"
import { join, resolve } from "node:path"
import { execSync } from "node:child_process"

const ROOT = resolve(process.cwd())

const args = process.argv.slice(2)
const getArg = (name) => {
  const idx = args.indexOf(name)
  return idx !== -1 ? (args[idx + 1] ?? null) : null
}
const hasFlag = (name) => args.includes(name)

const to = getArg("--to")
const dryRun = hasFlag("--dry-run")

if (!to) {
  console.error(
    "Error: --to <prefix> is required.\n  Example: node scripts/rebrand/rename-prefix.mjs --to lex",
  )
  process.exit(1)
}

// Read current prefix from generator.config.ts (single source of truth)
const configPath = join(
  ROOT,
  "packages/tokens/src/generators/generator.config.ts",
)
const configContent = readFileSync(configPath, "utf8")
const prefixMatch = configContent.match(/cssVarPrefix:\s*"([^"]+)"/)

if (!prefixMatch) {
  console.error("Error: Could not find cssVarPrefix in generator.config.ts")
  process.exit(1)
}

const from = prefixMatch[1]

// Validate --from if provided
const explicitFrom = getArg("--from")
if (explicitFrom && explicitFrom !== from) {
  console.error(
    `Error: --from "${explicitFrom}" does not match current cssVarPrefix "${from}"`,
  )
  process.exit(1)
}

if (from === to) {
  console.log(`Nothing to do — current prefix is already "${to}".`)
  process.exit(0)
}

console.log(
  `\nPrefix rename: "${from}-" → "${to}-"${dryRun ? "  [dry run]" : ""}\n`,
)

// Collect all .ts / .tsx files under a directory
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

const walkMd = (dir) => {
  const results = []
  for (const entry of readdirSync(dir)) {
    const fullPath = join(dir, entry)
    const stat = statSync(fullPath)
    if (stat.isDirectory()) {
      results.push(...walkMd(fullPath))
    } else if (fullPath.endsWith(".md")) {
      results.push(fullPath)
    }
  }
  return results
}

// Test config files — mirrored constants updated by this script so test
// assertions (which import testCssVarPrefix dynamically) stay correct.
const testConfigPaths = [
  join(ROOT, "packages/ui/test/config/prefix.ts"),
  join(ROOT, "packages/tokens/test/config/prefix.ts"),
  join(ROOT, "packages/cli/test/config/prefix.ts"),
].filter(existsSync)

// Root-level markdown files (README, CONTRIBUTING, AGENTS, etc.)
const rootMdFiles = readdirSync(ROOT)
  .filter((f) => f.endsWith(".md"))
  .map((f) => join(ROOT, f))

// packages/tokens/test/css-generator.test.ts is intentionally excluded —
// it uses cssVarPrefix: "lsys" as an explicit test fixture, not the brand prefix.
const CSS_GENERATOR_TEST = join(
  ROOT,
  "packages/tokens/test/css-generator.test.ts",
)

const filesToScan = [
  // Source — UI variants, CLI, registry, token CSS generator comments
  ...walk(join(ROOT, "packages/ui/src")),
  ...walk(join(ROOT, "packages/cli/src")),
  ...walk(join(ROOT, "packages/registry/src")),
  ...walk(join(ROOT, "packages/tokens/src/generators/outputs/css")),
  // Docs — all markdown
  ...walkMd(join(ROOT, "docs")),
  ...rootMdFiles,
  // Tests — registry fixture vars + playground live CSS var references
  // (CLI test assertions use testCssVarPrefix dynamically — no bulk scan needed)
  ...walk(join(ROOT, "packages/registry/test")),
  ...walk(join(ROOT, "apps/playground/src"), [".ts", ".tsx", ".css"]),
  // Token config + test config mirrors
  configPath,
  ...testConfigPaths,
].filter((f) => f !== CSS_GENERATOR_TEST)

const changed = []

for (const filePath of filesToScan) {
  const content = readFileSync(filePath, "utf8")
  let updated

  if (filePath === configPath) {
    // Targeted replace — only the cssVarPrefix value, nothing else
    updated = content.replace(
      /cssVarPrefix:\s*"[^"]+"/,
      `cssVarPrefix: "${to}"`,
    )
  } else if (testConfigPaths.includes(filePath)) {
    // Targeted replace — only the testCssVarPrefix value
    updated = content.replace(
      /export const testCssVarPrefix\s*=\s*"[^"]+"/,
      `export const testCssVarPrefix = "${to}"`,
    )
  } else {
    // Bulk replace of all prefix occurrences (source files + docs)
    updated = content.replaceAll(`${from}-`, `${to}-`)
  }

  if (updated !== content) {
    const relPath = filePath.replace(ROOT + "\\", "").replace(ROOT + "/", "")
    changed.push({ relPath, updated, filePath })
  }
}

if (changed.length === 0) {
  console.log("No files contained the prefix — nothing changed.")
  process.exit(0)
}

// SI.3 — categorize changed files for summary
const categorize = (relPath) => {
  const p = relPath.replace(/\\/g, "/")
  if (p.includes("test/config/prefix.ts")) return "test-configs"
  if (p.endsWith(".md")) return "docs"
  if (p.includes("/src/")) return "source"
  return "other"
}

const counts = { source: 0, docs: 0, "test-configs": 0, other: 0 }
for (const { relPath } of changed) counts[categorize(relPath)]++

console.log(`Files to modify (${changed.length}):`)
for (const { relPath } of changed) {
  console.log(`  ${dryRun ? "[dry]" : "✓"} ${relPath}`)
}

if (dryRun) {
  console.log(
    "\nDry run complete — no files written. Remove --dry-run to apply.\n",
  )
  process.exit(0)
}

// Write files
for (const { filePath, updated } of changed) {
  writeFileSync(filePath, updated, "utf8")
}

// Post-rename: regenerate CSS, sync registry, format, check
console.log("\nRunning post-rename tasks...")

try {
  console.log("  → pnpm tokens:generate:styles")
  execSync("pnpm tokens:generate:styles", { stdio: "inherit", cwd: ROOT })

  console.log("  → pnpm registry:sync")
  execSync("pnpm registry:sync", { stdio: "inherit", cwd: ROOT })

  console.log("  → pnpm format")
  execSync("pnpm format", { stdio: "inherit", cwd: ROOT })

  console.log("  → pnpm check")
  execSync("pnpm check", { stdio: "inherit", cwd: ROOT })

  // SI.3 — per-category summary
  console.log(`\nDone. "${from}-" renamed to "${to}-"`)
  console.log(`  ${changed.length} files changed:`)
  if (counts.source) console.log(`    source      ${counts.source}`)
  if (counts.docs) console.log(`    docs        ${counts.docs}`)
  if (counts["test-configs"]) console.log(`    test-configs ${counts["test-configs"]}`)
  if (counts.other) console.log(`    other       ${counts.other}`)
  console.log()
} catch (err) {
  console.error("\nPost-rename task failed:", err.message)
  process.exit(1)
}
