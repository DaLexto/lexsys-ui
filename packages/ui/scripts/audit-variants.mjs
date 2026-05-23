#!/usr/bin/env node
/**
 * Scans UI variant files for non-compliant styling literals.
 */

import { readdirSync, readFileSync } from "node:fs"
import { join } from "node:path"

const componentRoot = join(process.cwd(), "src/components")

const rules = [
  {
    id: "opacity-50",
    pattern: /opacity-50\b/,
    message: "Use opacity-(--nx-opacity-disabled) or variant-states helper",
  },
  {
    id: "opacity-60",
    pattern: /opacity-60\b/,
    message: "Use opacity-(--nx-opacity-disabled)",
  },
  {
    id: "opacity-80",
    pattern: /opacity-80\b/,
    message: "Use opacity-(--nx-opacity-busy)",
  },
  {
    id: "raw-viewport-calc",
    pattern: /100vw-2rem/,
    message: "Tokenize viewport inset (calc with --nx-*-viewport-inset)",
  },
  {
    id: "raw-z-index",
    pattern: /\bz-\d+\b/,
    message: "Use token-backed z-index (--nx-*-z-index)",
  },
  {
    id: "leading-none",
    pattern: /leading-none\b/,
    message: "Use component typography line-height token",
  },
  {
    id: "pt-0",
    pattern: /\bpt-0\b/,
    message: "Use semantic padding token",
  },
  {
    id: "compound-className",
    pattern: /compoundVariants:[\s\S]*?className:/,
    message: "Use class: key in compoundVariants",
  },
  {
    id: "destructive-token",
    pattern: /--nx-[a-z-]*destructive/,
    message: "Use danger vocabulary in Neurex token names",
  },
  {
    id: "public-tone",
    pattern: /tone\?:/,
    message: "Use variant prop per UI_VARIANTS.md",
  },
]

const variantFiles = readdirSync(componentRoot, { withFileTypes: true })
  .flatMap((entry) => {
    if (!entry.isDirectory()) {
      return []
    }

    const variantsPath = join(
      componentRoot,
      entry.name,
      `${entry.name}.variants.ts`,
    )

    return [variantsPath]
  })
  .toSorted()

const findings = []

for (const filePath of variantFiles) {
  const source = readFileSync(filePath, "utf-8")
  const relativePath = filePath.replace(`${process.cwd()}/`, "")

  for (const rule of rules) {
    if (rule.pattern.test(source)) {
      findings.push({ file: relativePath, rule: rule.id, message: rule.message })
    }
  }
}

if (findings.length === 0) {
  console.log("ui:audit — no variant compliance findings")
  process.exit(0)
}

console.error("ui:audit — variant compliance findings:\n")

for (const finding of findings) {
  console.error(`- [${finding.rule}] ${finding.file}: ${finding.message}`)
}

process.exit(1)
