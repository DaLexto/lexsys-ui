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

const readRepoFile = (relativePath) =>
  readFileSync(join(root, relativePath), "utf8")

const sliceChangelogSection = (changelog, header) => {
  const start = changelog.indexOf(header)
  if (start === -1) {
    return null
  }

  const after = changelog.slice(start + header.length)
  const next = after.search(/\r?\n## (\[)?/)
  const section = (next === -1 ? after : after.slice(0, next)).trim()

  return section.replace(/^\s*-\s*\d{4}-\d{2}-\d{2}\s*\n?/, "").trim() || null
}

const formatEntryChangelog = (section) =>
  section
    .replace(/^### Patch Changes\s*/m, "### Changed\n\n")
    .replace(/\n- Updated dependencies[\s\S]*$/m, "")
    .trim()

const extractNotes = (releaseVersion) => {
  const rootSection = sliceChangelogSection(
    readRepoFile("CHANGELOG.md"),
    `## [${releaseVersion}]`,
  )
  if (rootSection) {
    return rootSection
  }

  const entrySection = sliceChangelogSection(
    readRepoFile("packages/entry/CHANGELOG.md"),
    `## ${releaseVersion}`,
  )
  if (entrySection) {
    return formatEntryChangelog(entrySection)
  }

  return `Lexsys ${releaseVersion}. See CHANGELOG.md for details.`
}

const isPublishedOnNpm = (releaseVersion) => {
  try {
    const published = execSync(
      `npm view @dalexto/lexsys@${releaseVersion} version --registry https://registry.npmjs.org`,
      { cwd: root, encoding: "utf8", stdio: "pipe" },
    ).trim()

    return published === releaseVersion
  } catch {
    return false
  }
}

const version = JSON.parse(readRepoFile("packages/entry/package.json")).version
const tag = `lexsys@${version}`
const title = `Lexsys ${version}`

if (execQuiet(`gh release view "${tag}"`)) {
  console.log(`Release ${tag} already exists — skipping.`)
  process.exit(0)
}

if (!isPublishedOnNpm(version)) {
  console.log(
    `@dalexto/lexsys@${version} is not on npm yet — skipping GitHub release.`,
  )
  process.exit(0)
}

const resolveTarget = (ref) => {
  try {
    return execSync(`git rev-parse ${ref}^{commit}`, {
      cwd: root,
      encoding: "utf8",
      stdio: "pipe",
    }).trim()
  } catch {
    return ref
  }
}

const notesDir = join(root, ".tmp")
mkdirSync(notesDir, { recursive: true })
const notesFile = join(notesDir, `release-notes-${version}.md`)
writeFileSync(notesFile, extractNotes(version), "utf8")

const target = resolveTarget(process.env.GITHUB_SHA ?? "HEAD")
exec(
  `gh release create "${tag}" --title "${title}" --notes-file "${notesFile}" --target "${target}"`,
)

console.log(`Created GitHub release ${title} (${tag})`)
