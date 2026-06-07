#!/usr/bin/env node
import { execSync } from "node:child_process"
import { readdirSync, readFileSync } from "node:fs"
import { join } from "node:path"

export const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

export const readEntryVersion = (root) => {
  const pkg = JSON.parse(
    readFileSync(join(root, "packages/entry/package.json"), "utf8"),
  )
  return pkg.version
}

export const listPendingChangesets = (root) => {
  const dir = join(root, ".changeset")
  try {
    return readdirSync(dir).filter(
      (name) => name.endsWith(".md") && name.toLowerCase() !== "readme.md",
    )
  } catch {
    return []
  }
}

export const isPublishedOnNpm = (
  version,
  { root = process.cwd(), exec = execSync } = {},
) => {
  try {
    const published = exec(
      `npm view @dalexto/lexsys@${version} version --registry https://registry.npmjs.org`,
      { cwd: root, encoding: "utf8", stdio: "pipe" },
    ).trim()
    return published === version
  } catch {
    return false
  }
}

export const waitForNpmPublish = async (
  version,
  {
    root = process.cwd(),
    exec = execSync,
    attempts = Number(process.env.NPM_POLL_ATTEMPTS ?? 30),
    delayMs = Number(process.env.NPM_POLL_DELAY_MS ?? 10_000),
  } = {},
) => {
  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    if (isPublishedOnNpm(version, { root, exec })) {
      console.log(
        `npm: @dalexto/lexsys@${version} visible (attempt ${attempt}/${attempts})`,
      )
      return true
    }
    if (attempt < attempts) {
      console.log(
        `npm: @dalexto/lexsys@${version} not visible yet — retry ${attempt}/${attempts} in ${delayMs}ms`,
      )
      await sleep(delayMs)
    }
  }
  return false
}

export const githubReleaseExists = (
  tag,
  { root = process.cwd(), exec = execSync } = {},
) => {
  try {
    exec(`gh release view "${tag}"`, { cwd: root, stdio: "pipe" })
    return true
  } catch {
    return false
  }
}

export const readRepoFile = (root, relativePath) =>
  readFileSync(join(root, relativePath), "utf8")

export const sliceChangelogSection = (changelog, header) => {
  const start = changelog.indexOf(header)
  if (start === -1) {
    return null
  }

  const after = changelog.slice(start + header.length)
  const next = after.search(/\r?\n## (\[)?/)
  const section = (next === -1 ? after : after.slice(0, next)).trim()

  return section.replace(/^\s*-\s*\d{4}-\d{2}-\d{2}\s*\n?/, "").trim() || null
}

export const hasRootChangelogSection = (version, root = process.cwd()) =>
  sliceChangelogSection(
    readRepoFile(root, "CHANGELOG.md"),
    `## [${version}]`,
  ) !== null

export const readChangelogFooterUrl = (version, root = process.cwd()) => {
  const footer = readRepoFile(root, "CHANGELOG.md")
  const escaped = version.replace(/\./g, "\\.")
  const match = footer.match(
    new RegExp(`^\\[${escaped}\\]:\\s*(\\S+)\\s*$`, "m"),
  )
  return match?.[1] ?? null
}

export const extractEntryPrLinks = (version, root = process.cwd()) => {
  const section = sliceChangelogSection(
    readRepoFile(root, "packages/entry/CHANGELOG.md"),
    `## ${version}`,
  )
  if (!section) {
    return []
  }

  const seen = new Set()
  const links = []
  for (const match of section.matchAll(
    /\[#(\d+)\]\((https:\/\/github\.com\/[^)]+)\)/g,
  )) {
    if (!seen.has(match[1])) {
      seen.add(match[1])
      links.push({ number: match[1], url: match[2] })
    }
  }
  return links
}

const formatEntryChangelog = (section) =>
  section
    .replace(/^### Patch Changes\s*/m, "### Changed\n\n")
    .replace(/\n- Updated dependencies[\s\S]*$/m, "")
    .trim()

export const extractReleaseNotesBody = (version, root = process.cwd()) => {
  const rootSection = sliceChangelogSection(
    readRepoFile(root, "CHANGELOG.md"),
    `## [${version}]`,
  )
  if (rootSection) {
    return rootSection
  }

  const entrySection = sliceChangelogSection(
    readRepoFile(root, "packages/entry/CHANGELOG.md"),
    `## ${version}`,
  )
  if (entrySection) {
    return formatEntryChangelog(entrySection)
  }

  return `Lexsys ${version}. See CHANGELOG.md for details.`
}

export const buildReleaseNotesLinks = (version, root = process.cwd()) => {
  const compareUrl = readChangelogFooterUrl(version, root)
  const prLinks = extractEntryPrLinks(version, root)
  if (!compareUrl && prLinks.length === 0) {
    return ""
  }

  const lines = ["", "---", "", "### Links", ""]
  if (compareUrl) {
    lines.push(`- [Full diff](${compareUrl})`)
  }
  for (const pr of prLinks) {
    lines.push(`- [PR #${pr.number}](${pr.url})`)
  }
  return lines.join("\n")
}

export const buildReleaseNotes = (version, root = process.cwd()) =>
  `${extractReleaseNotesBody(version, root)}${buildReleaseNotesLinks(version, root)}`
