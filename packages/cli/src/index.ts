#!/usr/bin/env node

import { mkdir, copyFile, access } from "node:fs/promises"
import { constants } from "node:fs"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"
import { registryItems } from "@neurex-ui/registry"

const [, , command, ...args] = process.argv

const cliFilePath = fileURLToPath(import.meta.url)
const cliDistDir = dirname(cliFilePath)
const repoRoot = join(cliDistDir, "..", "..", "..")
const registryTemplatesRoot = join(repoRoot, "packages", "registry", "templates")

const fileExists = async (path: string): Promise<boolean> => {
  try {
    await access(path, constants.F_OK)
    return true
  } catch {
    return false
  }
}

const findItem = (name: string) => {
  const normalizedName = name.toLowerCase()

  return registryItems.find(
    (item) =>
      item.name.toLowerCase() === normalizedName ||
      item.canonicalName.toLowerCase() === normalizedName ||
      item.aliases.some((alias) => alias.toLowerCase() === normalizedName)
  )
}

const installItemFiles = async (itemName: string): Promise<void> => {
  const item = findItem(itemName)

  if (!item) {
    console.log(`Component "${itemName}" not found.`)
    process.exit(1)
  }

  console.log(`Installing ${item.canonicalName}...\n`)

  for (const file of item.files) {
    const sourcePath = join(registryTemplatesRoot, file)
    const fileName = file.split("/").at(-1)

    if (!fileName) {
      console.log(`Invalid registry file path: ${file}`)
      process.exit(1)
    }

    const targetPath = join(process.cwd(), item.target, fileName)

    await mkdir(dirname(targetPath), { recursive: true })

    if (await fileExists(targetPath)) {
      console.log(`Skipped existing file: ${targetPath}`)
      continue
    }

    await copyFile(sourcePath, targetPath)
    console.log(`Created: ${targetPath}`)
  }

  console.log("\nDone.")
}

if (command === "list") {
  console.log("Available Neurex UI components:\n")

  for (const item of registryItems) {
    console.log(`- ${item.canonicalName} (${item.category})`)
  }

  process.exit(0)
}

if (command === "add") {
  const name = args[0]

  if (!name) {
    console.log("Please specify a component name.")
    process.exit(1)
  }

  await installItemFiles(name)
  process.exit(0)
}

console.log("Neurex UI CLI\n")
console.log("Available commands:")
console.log("- list")
console.log("- add <component>")