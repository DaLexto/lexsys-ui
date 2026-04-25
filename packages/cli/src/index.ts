#!/usr/bin/env node

/**
 * Neurex UI CLI entry point.
 */

import { registryItems } from "@neurex-ui/registry"

const [, , command] = process.argv

if (command === "list") {
  console.log("Available Neurex UI components:")
  console.log("")

  for (const item of registryItems) {
    console.log(`- ${item.canonicalName} (${item.category})`)
  }

  process.exit(0)
}

console.log("Neurex UI CLI")
console.log("")
console.log("Available commands:")
console.log("- list")