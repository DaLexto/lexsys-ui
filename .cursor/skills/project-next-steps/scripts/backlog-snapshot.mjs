#!/usr/bin/env node
/**
 * Read-only extract from docs/REVIEW_TODO.md for $project-next-steps.
 * Not source of truth — paste output into Project snapshot only.
 */
import { execSync } from "node:child_process"
import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))

function findRepoRoot(start) {
  let dir = start
  for (let i = 0; i < 12; i++) {
    if (fs.existsSync(path.join(dir, "docs", "REVIEW_TODO.md"))) return dir
    const parent = path.dirname(dir)
    if (parent === dir) break
    dir = parent
  }
  return null
}

function parseMarkdownTable(lines) {
  const rows = []
  for (const line of lines) {
    if (!line.trim().startsWith("|") || line.includes("---")) continue
    const cells = line
      .split("|")
      .slice(1, -1)
      .map((c) => c.trim())
    if (cells.length) rows.push(cells)
  }
  return rows
}

function extractSection(content, heading) {
  const re = new RegExp(
    `^## ${heading.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\s*$`,
    "m",
  )
  const match = content.match(re)
  if (!match || match.index === undefined) return ""
  const start = match.index + match[0].length
  const rest = content.slice(start)
  const next = rest.search(/^## /m)
  return next === -1 ? rest : rest.slice(0, next)
}

function gitBranch(cwd) {
  try {
    return execSync("git branch --show-current", {
      cwd,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    }).trim()
  } catch {
    return "(unknown)"
  }
}

const repoRoot = findRepoRoot(path.resolve(__dirname, "..", "..", "..", ".."))
if (!repoRoot) {
  console.error(
    "Could not find repo root (docs/REVIEW_TODO.md). Run from Lexsys monorepo.",
  )
  process.exit(1)
}

const todoPath = path.join(repoRoot, "docs", "REVIEW_TODO.md")
const content = fs.readFileSync(todoPath, "utf8")
const branch = gitBranch(repoRoot)

const inactiveStatus = new Set([
  "shipped",
  "done",
  "completed",
  "resolved",
  "cancelled",
])

const queueSection = extractSection(content, "Execution Queue (active)")
const queueLines = queueSection.split("\n")
const queueRows = parseMarkdownTable(queueLines)
const queueHeader = queueRows[0]
const queueActive = queueRows.slice(1).filter((row) => {
  const status = (row[row.length - 1] || "").toLowerCase()
  return status && !inactiveStatus.has(status)
})

const gapsSection = extractSection(content, "Known Gaps")
const gapRows = parseMarkdownTable(gapsSection.split("\n"))
const gapHeader = gapRows[0]
const gapBody = gapRows
  .slice(1)
  .filter((row) => row[0] && !row[0].startsWith("Resolved"))

const lines = [
  "## Project snapshot (script extract)",
  "",
  `- Branch: ${branch}`,
  `- Source: docs/REVIEW_TODO.md`,
  `- Generated: ${new Date().toISOString().slice(0, 10)}`,
  "",
  "### Execution queue (not shipped/done)",
]

if (queueActive.length === 0) {
  lines.push(
    "",
    "_No active execution-queue rows — use post-queue mode (Known Gaps, planned tracks)._",
  )
} else {
  lines.push("")
  if (queueHeader) lines.push(`| ${queueHeader.join(" | ")} |`)
  if (queueHeader) lines.push(`| ${queueHeader.map(() => "---").join(" | ")} |`)
  for (const row of queueActive) {
    lines.push(`| ${row.join(" | ")} |`)
  }
}

lines.push("", "### Known Gaps")
if (gapBody.length === 0) {
  lines.push("", "_No gap rows parsed._")
} else {
  lines.push("")
  if (gapHeader) lines.push(`| ${gapHeader.join(" | ")} |`)
  if (gapHeader) lines.push(`| ${gapHeader.map(() => "---").join(" | ")} |`)
  for (const row of gapBody) {
    lines.push(`| ${row.join(" | ")} |`)
  }
}

lines.push(
  "",
  "_Classify and prioritize per procedures.md — script does not rank items._",
)

console.log(lines.join("\n"))
