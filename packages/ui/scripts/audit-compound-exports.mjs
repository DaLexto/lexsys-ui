#!/usr/bin/env node
/**
 * Parses UI component named exports and registry versions; validates or updates
 * docs/UI_CATALOG.md generated region.
 *
 * Usage (from packages/ui):
 *   node scripts/audit-compound-exports.mjs check
 *   node scripts/audit-compound-exports.mjs write
 */

import { readdirSync, readFileSync, writeFileSync, existsSync } from "node:fs"
import { join, dirname } from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = dirname(fileURLToPath(import.meta.url))
const uiRoot = join(__dirname, "..")
const repoRoot = join(uiRoot, "../..")
const catalogPath = join(repoRoot, "docs/UI_CATALOG.md")
const registryItemsDir = join(repoRoot, "packages/registry/src/items")

const INTENTIONAL_LEAVES = new Set([
  "Button",
  "Input",
  "Badge",
  "Separator",
  "Form",
  "Toggle",
  "ToggleGroup",
  "CheckboxGroup",
  "Menubar",
  "Textarea",
])

const LAYERS = [
  { key: "primitives", label: "Primitives", registryType: "component" },
  { key: "blocks", label: "Blocks", registryType: "block" },
  { key: "templates", label: "Templates", registryType: "block" },
]

const BEGIN_MARKER = "<!-- CATALOG:BEGIN -->"
const END_MARKER = "<!-- CATALOG:END -->"

function parseNamedExports(source) {
  const names = []
  const re = /^export\s*\{([^}]+)\}/gm

  for (const match of source.matchAll(re)) {
    const block = match[1]
    for (const part of block.split(",")) {
      const trimmed = part.trim()
      if (!trimmed || trimmed.startsWith("//")) {
        continue
      }
      const asMatch = trimmed.match(/^(\w+)\s+as\s+(\w+)$/)
      const token = asMatch ? asMatch[2] : trimmed.split(/\s+/)[0]
      if (token && token !== "type") {
        names.push(token)
      }
    }
  }

  return [...new Set(names)]
}

function loadRegistryByCanonicalName() {
  const map = new Map()

  for (const file of readdirSync(registryItemsDir)) {
    if (!file.endsWith(".ts") || file === "index.ts") {
      continue
    }

    const source = readFileSync(join(registryItemsDir, file), "utf-8")
    const canonicalName = source.match(/canonicalName:\s*"([^"]+)"/)?.[1]
    const version = source.match(/version:\s*"([^"]+)"/)?.[1]
    const name = source.match(/name:\s*"([^"]+)"/)?.[1]
    const type = source.match(/type:\s*"([^"]+)"/)?.[1]

    if (canonicalName) {
      map.set(canonicalName, {
        name,
        version: version ?? "?",
        type: type ?? "?",
      })
    }
  }

  return map
}

function classifyStyle(layer, componentName, exports) {
  if (layer === "blocks" || layer === "templates") {
    return "compound"
  }

  const componentExports = exports.filter(
    (name) =>
      !name.startsWith("use") &&
      name !== "createDrawerHandle" &&
      name !== "createMenuHandle" &&
      name !== "createPreviewCardHandle" &&
      name !== "createToastManager",
  )

  if (componentExports.length === 1 && INTENTIONAL_LEAVES.has(componentName)) {
    return "leaf"
  }

  return "compound"
}

function collectComponents() {
  const registry = loadRegistryByCanonicalName()
  const rows = []

  for (const layer of LAYERS) {
    const layerRoot = join(uiRoot, "src/components", layer.key)

    for (const entry of readdirSync(layerRoot, { withFileTypes: true })) {
      if (!entry.isDirectory()) {
        continue
      }

      const name = entry.name
      const tsxPath = join(layerRoot, name, `${name}.tsx`)
      const source = readFileSync(tsxPath, "utf-8")
      const exports = parseNamedExports(source)
      const style = classifyStyle(layer.key, name, exports)
      const reg = registry.get(name)

      rows.push({
        layer: layer.key,
        layerLabel: layer.label,
        name,
        style,
        exports,
        registryName: reg?.name ?? "—",
        registryVersion: reg?.version ?? "—",
        registryType: reg?.type ?? "—",
      })
    }
  }

  return rows.sort((a, b) => {
    const layerOrder = { primitives: 0, blocks: 1, templates: 2 }
    return (
      layerOrder[a.layer] - layerOrder[b.layer] || a.name.localeCompare(b.name)
    )
  })
}

function formatExports(exports) {
  if (exports.length <= 4) {
    return exports.join(", ")
  }

  return `${exports.slice(0, 3).join(", ")}, … (+${exports.length - 3})`
}

function buildGeneratedSection(rows) {
  const lines = []
  lines.push(BEGIN_MARKER)
  lines.push("")
  lines.push(
    `_Generated ${new Date().toISOString().slice(0, 10)} — do not edit by hand. Run \`pnpm ui:audit:catalog:write\` from repo root._`,
  )
  lines.push("")

  for (const layer of LAYERS) {
    const layerRows = rows.filter((row) => row.layer === layer.key)
    lines.push(`### ${layer.label} (${layerRows.length})`)
    lines.push("")
    lines.push("| Component | Style | Named exports | Registry | Version |")
    lines.push("| --------- | ----- | ------------- | -------- | ------- |")

    for (const row of layerRows) {
      lines.push(
        `| **${row.name}** | ${row.style} | \`${formatExports(row.exports)}\` | \`${row.registryName}\` | ${row.registryVersion} |`,
      )
    }

    lines.push("")
  }

  lines.push(
    "**Leaf policy:** only components listed in [UI.md § Intentional leaves](./UI.md#compound-vs-leaf-decision-tree) with a single part export. All blocks and templates are compound-only.",
  )
  lines.push("")
  lines.push(END_MARKER)

  return lines.join("\n")
}

function extractGeneratedSection(content) {
  const start = content.indexOf(BEGIN_MARKER)
  const end = content.indexOf(END_MARKER)

  if (start === -1 || end === -1) {
    return null
  }

  return content.slice(start, end + END_MARKER.length)
}

function rowCheckSignature(rows) {
  return JSON.stringify(
    rows.map((row) => ({
      name: row.name,
      style: row.style,
      registryName: row.registryName,
      registryVersion: row.registryVersion,
      exportCount: row.exports?.length ?? row.exportCount,
    })),
  )
}

function parseExportList(display) {
  const plus = display.match(/… \(\+(\d+)\)/)
  if (plus) {
    const head = display.replace(/, … \(\+\d+\)/, "").split(", ")
    return head.length + Number(plus[1])
  }

  return display.split(", ").filter(Boolean).length
}

function parseCatalogFromMarkdown(content) {
  const section = extractGeneratedSection(content)
  if (!section) {
    return null
  }

  const rows = []

  for (const line of section.split("\n")) {
    if (!line.startsWith("| **")) {
      continue
    }

    const cells = line
      .split("|")
      .map((cell) => cell.trim())
      .filter(Boolean)

    if (cells.length < 5) {
      continue
    }

    const name = cells[0].replace(/\*\*/g, "")
    const exportDisplay = cells[2].replace(/^`|`$/g, "")
    const exportCount = parseExportList(exportDisplay)

    rows.push({
      name,
      style: cells[1],
      registryName: cells[3].replace(/`/g, ""),
      registryVersion: cells[4],
      exportCount,
    })
  }

  return rows
}

function signaturesMatch(expectedRows, content) {
  const parsed = parseCatalogFromMarkdown(content)
  if (!parsed || parsed.length !== expectedRows.length) {
    return false
  }

  return rowCheckSignature(expectedRows) === rowCheckSignature(parsed)
}

const CATALOG_TEMPLATE = `# UI Installable Catalog

**Audience:** Maintainers, contributors, and agents  
**Type:** Catalog / inventory  
**Source of truth for:** Installable surface inventory — compound vs leaf, named exports, registry version  
**Verified against:** \`packages/ui/src/components/\`, \`packages/registry/src/items/\`  
**Related docs:** [UI.md](./UI.md) (leaf decision tree), [UI_COMPOSITION.md](./UI_COMPOSITION.md) (composition rules), [UI_AUDIT.md](./UI_AUDIT.md) (variant compliance), [REGISTRY.md](./REGISTRY.md) (item contract)

---

## Purpose and scope

This catalog answers: **what is installable, compound or leaf, what exports exist, and what registry version ships.**

- **Rules** (when to use compound vs leaf) → [UI.md](./UI.md), [UI_COMPOSITION.md](./UI_COMPOSITION.md)
- **Variant compliance** → [UI_AUDIT.md](./UI_AUDIT.md)
- **Registry item fields** → [REGISTRY.md](./REGISTRY.md)

Out of scope here: page-level consumer code, playground-only demos, unpublished internal utilities.

---

## Inventory

{{GENERATED}}

---

## Generation and drift checks

From repository root:

\`\`\`bash
pnpm ui:audit:catalog:check   # fail if catalog region drifted from code
pnpm ui:audit:catalog:write   # refresh generated tables in this file
\`\`\`

\`pnpm ui:audit\` runs variant compliance **and** catalog check.

---

## Related docs

- [INDEX.md](./INDEX.md) — documentation routing
- [UI.md § Compound vs leaf decision tree](./UI.md#compound-vs-leaf-decision-tree)
- [UI_COMPOSITION.md § Compound-first contract](./UI_COMPOSITION.md#compound-first-contract)
`

function ensureCatalogFile(generated) {
  if (!existsSync(catalogPath)) {
    return CATALOG_TEMPLATE.replace("{{GENERATED}}", generated)
  }

  const content = readFileSync(catalogPath, "utf-8")

  if (!content.includes(BEGIN_MARKER)) {
    throw new Error(
      `${catalogPath} exists but is missing ${BEGIN_MARKER} markers — add ## Inventory section with markers`,
    )
  }

  const existing = extractGeneratedSection(content)
  if (existing === generated) {
    return content
  }

  const start = content.indexOf(BEGIN_MARKER)
  const end = content.indexOf(END_MARKER) + END_MARKER.length
  return content.slice(0, start) + generated + content.slice(end)
}

const mode = process.argv[2] ?? "check"

if (mode !== "check" && mode !== "write") {
  console.error("Usage: audit-compound-exports.mjs <check|write>")
  process.exit(1)
}

const rows = collectComponents()
const generated = buildGeneratedSection(rows)

if (mode === "write") {
  const next = ensureCatalogFile(generated)
  writeFileSync(catalogPath, next, "utf-8")
  console.log(`ui:audit:catalog — wrote ${catalogPath}`)
  process.exit(0)
}

if (!existsSync(catalogPath)) {
  console.error(
    "ui:audit:catalog — docs/UI_CATALOG.md missing; run with write first",
  )
  process.exit(1)
}

const content = readFileSync(catalogPath, "utf-8")

if (extractGeneratedSection(content) === null) {
  console.error("ui:audit:catalog — catalog markers missing")
  process.exit(1)
}

if (!signaturesMatch(rows, content)) {
  console.error(
    "ui:audit:catalog — docs/UI_CATALOG.md drifted from packages/ui exports or registry versions",
  )
  console.error("Run: pnpm ui:audit:catalog:write")
  process.exit(1)
}

console.log(`ui:audit:catalog — OK (${rows.length} components)`)
