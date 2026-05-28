#!/usr/bin/env node
/**
 * Renames the CSS variable and BEM class prefix across the codebase and
 * regenerates all build artifacts.
 *
 * WHAT GETS UPDATED
 * -----------------
 * Source files  — packages/ui/src/**  (variant files, cn.ts, etc.)
 * Token config  — packages/tokens/src/generators/generator.config.ts (cssVarPrefix value)
 * Docs          — docs/**\/*.md (all prefix examples in documentation)
 * Test configs  — packages/ui/test/config/prefix.ts
 *                 packages/tokens/test/config/prefix.ts
 *                 (single mirrored constants; test assertions use these dynamically)
 *
 * WHAT DOES NOT GET UPDATED
 * -------------------------
 * Test assertions themselves — they import testCssVarPrefix from the test config
 *   files above, so they stay correct automatically after this script runs.
 * Package names / import paths — lexsys-* names are intentional and unrelated.
 * Token source files — primitive/semantic token values don't carry the CSS prefix.
 *
 * POST-RENAME
 * -----------
 * After writing files, the script automatically runs:
 *   pnpm tokens:generate:styles  — regenerates CSS with the new prefix
 *   pnpm registry:sync           — propagates updated variant templates
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
].filter(existsSync)

const filesToScan = [
  ...walk(join(ROOT, "packages/ui/src")),
  ...walkMd(join(ROOT, "docs")),
  configPath,
  ...testConfigPaths,
]

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

// Post-rename: regenerate CSS and sync registry templates
console.log("\nRunning post-rename tasks...")

try {
  console.log("  → pnpm tokens:generate:styles")
  execSync("pnpm tokens:generate:styles", { stdio: "inherit", cwd: ROOT })

  console.log("  → pnpm registry:sync")
  execSync("pnpm registry:sync", { stdio: "inherit", cwd: ROOT })

  console.log(
    `\nDone. "${from}-" renamed to "${to}-" across ${changed.length} files.\n`,
  )
} catch (err) {
  console.error("\nPost-rename task failed:", err.message)
  process.exit(1)
}
