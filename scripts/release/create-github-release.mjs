#!/usr/bin/env node
// Create one GitHub release after npm publish: tag lexsys@<version>, title Lexsys <version>.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs"
import { execSync } from "node:child_process"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"

const scriptDir = dirname(fileURLToPath(import.meta.url))
const root = join(scriptDir, "../..")

const exec = (cmd) => {
  console.log(`> ${cmd}`)
  execSync(cmd, { cwd: root, stdio: "inherit" })
}

const execQuiet = (cmd) => {
  try {
    execSync(cmd, { cwd: root, stdio: "pipe" })
    return true
  } catch {
    return false
  }
}

const version = JSON.parse(
  readFileSync(join(root, "packages/entry/package.json"), "utf8"),
).version
const tag = `lexsys@${version}`
const title = `Lexsys ${version}`

if (execQuiet(`gh release view "${tag}"`)) {
  console.log(`Release ${tag} already exists — skipping.`)
  process.exit(0)
}

const extractNotes = (releaseVersion) => {
  const changelog = readFileSync(join(root, "CHANGELOG.md"), "utf8")
  const header = `## [${releaseVersion}]`
  const start = changelog.indexOf(header)

  if (start === -1) {
    throw new Error(`CHANGELOG.md has no section ${header}`)
  }

  const after = changelog.slice(start + header.length)
  const next = after.search(/\r?\n## \[/)
  const section = (next === -1 ? after : after.slice(0, next)).trim()

  return section.replace(/^\s*-\s*\d{4}-\d{2}-\d{2}\s*\n?/, "").trim() || title
}

const notesDir = join(root, ".tmp")
mkdirSync(notesDir, { recursive: true })
const notesFile = join(notesDir, `release-notes-${version}.md`)
writeFileSync(notesFile, extractNotes(version), "utf8")

const target = process.env.GITHUB_SHA ?? "HEAD"
exec(
  `gh release create "${tag}" --title "${title}" --notes-file "${notesFile}" --target "${target}"`,
)

console.log(`Created GitHub release ${title} (${tag})`)
