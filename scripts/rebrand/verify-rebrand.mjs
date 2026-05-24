#!/usr/bin/env node
/**
 * Fail if forbidden neurex/nx branding remains outside allowlist.
 */

import { readFileSync, readdirSync, statSync } from "node:fs"
import { dirname, join, relative, resolve } from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = dirname(fileURLToPath(import.meta.url))
const repoRoot = resolve(__dirname, "../..")
const map = JSON.parse(
  readFileSync(join(__dirname, "rebrand-map.json"), "utf8"),
)

const allowlistSubstrings = [
  "scripts/rebrand/",
  "docs/REBRAND.md",
  "apply-rebrand.mjs",
  "verify-rebrand.mjs",
  "rebrand-map.json",
]

const forbidden = [
  { name: "neurex word", pattern: /\bneurex\b/i },
  { name: "@neurex scope", pattern: /@neurex\// },
  { name: "--nx- css var", pattern: /--nx-/ },
  { name: "nx- semantic class", pattern: /(?<=["'`(\s])nx-/ },
]

const extensions = new Set([
  ".ts",
  ".tsx",
  ".js",
  ".mjs",
  ".json",
  ".md",
  ".mdc",
  ".css",
  ".yml",
  ".yaml",
])

function walkFiles(dir, out = []) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry)
    const rel = relative(repoRoot, full).replaceAll("\\", "/")
    if (map.ignoreDirs.some((d) => rel.split("/").includes(d))) continue
    if (allowlistSubstrings.some((a) => rel.includes(a))) continue
    const st = statSync(full)
    if (st.isDirectory()) walkFiles(full, out)
    else if ([...extensions].some((ext) => full.endsWith(ext))) out.push(full)
  }
  return out
}

let violations = 0

for (const file of walkFiles(repoRoot)) {
  const rel = relative(repoRoot, file).replaceAll("\\", "/")
  const content = readFileSync(file, "utf8")
  if (map.skipSubstrings.some((s) => content.includes(s))) continue

  for (const rule of forbidden) {
    if (rule.pattern.test(content)) {
      console.error(`FAIL [${rule.name}]: ${rel}`)
      violations++
      break
    }
  }
}

if (violations > 0) {
  console.error(`\n${violations} file(s) with forbidden branding.`)
  process.exit(1)
}

console.log(
  "verify-rebrand: OK — no forbidden neurex/@neurex/--nx-/nx- branding.",
)
