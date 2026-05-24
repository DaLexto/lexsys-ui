#!/usr/bin/env node
/**
 * Apply Lexsys rebrand replacements from rebrand-map.json.
 *
 * Usage:
 *   node scripts/rebrand/apply-rebrand.mjs --phase workspace
 *   node scripts/rebrand/apply-rebrand.mjs --phase all --write
 *   node scripts/rebrand/apply-rebrand.mjs --rename-files --write
 */

import {
  readFileSync,
  writeFileSync,
  renameSync,
  mkdirSync,
  rmdirSync,
  readdirSync,
  statSync,
} from "node:fs"
import { dirname, join, relative, resolve } from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = dirname(fileURLToPath(import.meta.url))
const repoRoot = resolve(__dirname, "../..")
const mapPath = join(__dirname, "rebrand-map.json")
const map = JSON.parse(readFileSync(mapPath, "utf8"))

const args = process.argv.slice(2)
const write = args.includes("--write")
const phaseArg =
  args.find((a) => a.startsWith("--phase="))?.split("=")[1] ??
  (args.includes("--phase") ? args[args.indexOf("--phase") + 1] : null)
const renameFiles = args.includes("--rename-files")

function shouldSkipFile(filePath) {
  const rel = relative(repoRoot, filePath).replaceAll("\\", "/")
  if (rel.startsWith("scripts/rebrand/")) return true
  if (map.ignoreDirs.some((d) => rel.split("/").includes(d))) return true
  return false
}

function shouldSkipContent(content, filePath) {
  const rel = relative(repoRoot, filePath).replaceAll("\\", "/")
  if (rel.startsWith("scripts/rebrand/")) return true
  if (
    content.includes("npm.im/neurex") ||
    content.includes("KarkAngelo114/Neurex")
  ) {
    return true
  }
  return false
}

function applyReplacements(content, filePath) {
  let next = content
  const rel = relative(repoRoot, filePath).replaceAll("\\", "/")

  next = next.replaceAll("@neurex/", "@lexsys/")
  next = next.replaceAll("neurex.config.json", "lexsys.config.json")
  next = next.replaceAll("--nx-", "--lsys-")
  next = next.replaceAll("Neurex", map.brand.productTitle.to)
  next = next.replace(/(?<=["'`(\s])nx-/g, "lsys-")
  next = next.replace(/^nx-/gm, "lsys-")

  if (rel.endsWith("generator.config.ts")) {
    next = next.replace(/cssVarPrefix:\s*"nx"/, 'cssVarPrefix: "lsys"')
    next = next.replace(/tailwindPrefix:\s*"nx"/, 'tailwindPrefix: "twix"')
    next = next.replace("@neurex/tokens", "@lexsys/tokens")
  }

  if (!shouldSkipContent(content, filePath)) {
    next = next.replace(/\bneurex\b/g, map.brand.product.to)
  }

  next = next.replace(/\bneurexPreset\b/g, "lexsysPreset")
  next = next.replace(/\bneurexBrand\b/g, "lexsysBrand")
  next = next.replace(/themes\/neurex\//g, "themes/lexsys/")
  next = next.replace(/neurex\.preset/g, "lexsys.preset")
  next = next.replace(/neurex\.brand/g, "lexsys.brand")

  return next
}

function walkFiles(dir, out = []) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry)
    if (shouldSkipFile(full)) continue
    const st = statSync(full)
    if (st.isDirectory()) {
      walkFiles(full, out)
    } else {
      out.push(full)
    }
  }
  return out
}

const RECURSIVE = "\0RECURSE\0"

function matchGlob(relPosix, pattern) {
  if (!pattern.includes("*")) return relPosix === pattern
  const regex = new RegExp(
    `^${pattern
      .replace(/\./g, "\\.")
      .replace(/\*\*\//g, RECURSIVE)
      .replace(/\*\*/g, "[^/]*")
      .replace(/\*/g, "[^/]*")
      .replaceAll(RECURSIVE, "(?:[^/]+/)*")}$`,
  )
  return regex.test(relPosix)
}

function collectFiles(phase) {
  const phases = phase === "all" ? Object.keys(map.phases) : [phase]
  const patterns = phases.flatMap((name) => {
    const cfg = map.phases[name]
    if (!cfg) {
      console.error(`Unknown phase: ${name}`)
      process.exit(1)
    }
    return cfg.globs
  })

  const all = walkFiles(repoRoot)
  return all.filter((file) => {
    const rel = relative(repoRoot, file).replaceAll("\\", "/")
    return patterns.some((p) => matchGlob(rel, p))
  })
}

function runRenames() {
  let count = 0
  for (const { from, to } of map.fileRenames) {
    const fromPath = join(repoRoot, from)
    const toPath = join(repoRoot, to)
    mkdirSync(dirname(toPath), { recursive: true })
    if (write) {
      renameSync(fromPath, toPath)
      console.log(`rename: ${from} → ${to}`)
    } else {
      console.log(`[dry-run] rename: ${from} → ${to}`)
    }
    count++
  }
  const oldThemeDir = join(repoRoot, "packages/tokens/src/themes/neurex")
  try {
    if (write) rmdirSync(oldThemeDir)
  } catch {
    /* not empty or gone */
  }
  return count
}

function runPhase(phase) {
  const files = collectFiles(phase)
  let changed = 0

  for (const file of files) {
    const original = readFileSync(file, "utf8")
    const updated = applyReplacements(original, file)
    if (updated !== original) {
      if (write) writeFileSync(file, updated, "utf8")
      console.log(`${write ? "write" : "dry-run"}: ${relative(repoRoot, file)}`)
      changed++
    }
  }

  return { files: files.length, changed }
}

if (renameFiles) {
  const n = runRenames()
  console.log(`\n${write ? "Renamed" : "Would rename"} ${n} file(s).`)
  process.exit(0)
}

if (!phaseArg) {
  console.error("Usage: node apply-rebrand.mjs --phase <name|all> [--write]")
  console.error("       node apply-rebrand.mjs --rename-files [--write]")
  console.error(`Phases: ${Object.keys(map.phases).join(", ")}, all`)
  process.exit(1)
}

const result = runPhase(phaseArg)
console.log(
  `\nPhase "${phaseArg}": ${result.changed}/${result.files} file(s) ${write ? "updated" : "would change"}.`,
)
