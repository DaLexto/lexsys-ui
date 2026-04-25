#!/usr/bin/env node

import { registryItems } from "@neurex-ui/registry"

const [, , command, ...args] = process.argv

const findItem = (name: string) => {
  return registryItems.find(
    (item) =>
      item.name === name ||
      item.canonicalName.toLowerCase() === name.toLowerCase() ||
      item.aliases.includes(name)
  )
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

  const item = findItem(name)

  if (!item) {
    console.log(`Component "${name}" not found.`)
    process.exit(1)
  }

  console.log(`Installing ${item.canonicalName}...\n`)

  console.log("Files:")
  for (const file of item.files) {
    console.log(`- ${file}`)
  }

  console.log("\nTarget:")
  console.log(item.target)

  process.exit(0)
}

console.log("Neurex UI CLI\n")
console.log("Available commands:")
console.log("- list")
console.log("- add <component>")