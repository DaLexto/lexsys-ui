#!/usr/bin/env node
/**
 * Renames the CSS variable and BEM class prefix across packages/ui/src
 * and updates cssVarPrefix in generator.config.ts, then regenerates artifacts.
 *
 * Usage:
 *   node scripts/rebrand/rename-prefix.mjs --to lex
 *   node scripts/rebrand/rename-prefix.mjs --to lex --from lsys --dry-run
 */

import { readFileSync, writeFileSync, readdirSync, statSync } from "node:fs"
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

// Read current prefix from generator.config.ts
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

const filesToScan = [...walk(join(ROOT, "packages/ui/src")), configPath]

const changed = []

for (const filePath of filesToScan) {
  const content = readFileSync(filePath, "utf8")
  let updated

  if (filePath === configPath) {
    // Target only the cssVarPrefix value — leave everything else intact
    updated = content.replace(
      /cssVarPrefix:\s*"[^"]+"/,
      `cssVarPrefix: "${to}"`,
    )
  } else {
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
