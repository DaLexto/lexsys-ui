import prompts from "prompts"
import { registryItems } from "@neurex/registry"

import { loadConfig, saveConfig } from "../core/config.js"
import {
  ensureProjectStructure,
  hasInstallConflicts,
  installItemFiles,
  installStyles,
  installUtilities,
  mergeInstallResults,
} from "../core/installer.js"
import type { InstallResourceResult } from "../core/installer.js"
import { installDependencies } from "../core/package-manager.js"
import {
  collectDependencies,
  collectStyles,
  collectUtilities,
  resolveRegistryStyles,
  resolveRegistryUtilities,
  resolveRegistryItems,
} from "../core/registry-resolver.js"
import type {
  ResolvedRegistryStyle,
  ResolvedRegistryUtility,
} from "../core/registry-types.js"
import { hasFlag, removeFlags, removeFlagsWithValues } from "../core/flags.js"

const promptSelectItems = async (): Promise<string[]> => {
  const response: unknown = await prompts({
    type: "multiselect",
    name: "items",
    message: "Select components to add",
    choices: registryItems.map((item) => ({
      title: `${item.canonicalName} (${item.category})`,
      value: item.name,
    })),
  })

  if (typeof response !== "object" || response === null) {
    return []
  }

  const items = (response as { items?: unknown }).items

  if (!Array.isArray(items)) {
    return []
  }

  return items.filter((item): item is string => typeof item === "string")
}

const printResourceSummary = (
  label: string,
  result: InstallResourceResult,
): void => {
  const total =
    result.created.length +
    result.updated.length +
    result.skipped.length +
    result.conflicted.length

  if (!total) {
    console.log(`- ${label}: no changes`)
    return
  }

  const parts = [
    result.created.length ? `${result.created.length} created` : undefined,
    result.updated.length ? `${result.updated.length} updated` : undefined,
    result.skipped.length ? `${result.skipped.length} skipped` : undefined,
    result.conflicted.length
      ? `${result.conflicted.length} conflicted`
      : undefined,
  ].filter((part): part is string => typeof part === "string")

  console.log(`- ${label}: ${parts.join(", ")}`)
}

export const runAdd = async (args: string[]): Promise<void> => {
  const dryRun = hasFlag(args, "--dry-run")
  const yes = hasFlag(args, "--yes")
  const noFallback = hasFlag(args, "--no-fallback")

  let items = removeFlagsWithValues(args, ["--cwd"])
  items = removeFlags(items, ["--dry-run", "--yes", "--no-fallback"])

  void yes

  if (!items.length) {
    items = await promptSelectItems()

    if (!items.length) {
      console.log("No components selected.")
      return
    }
  }

  let resolvedItems

  try {
    resolvedItems = await resolveRegistryItems(items, {
      fallback: !noFallback,
    })
  } catch (error) {
    console.log("Failed to resolve registry.")
    console.log(error instanceof Error ? error.message : String(error))
    process.exitCode = 1
    return
  }
  const dependencies = collectDependencies(resolvedItems)
  const utilities = collectUtilities(resolvedItems)
  const styleNames = collectStyles(resolvedItems)
  let resolvedUtilities: ResolvedRegistryUtility[]
  let styles: ResolvedRegistryStyle[]

  try {
    resolvedUtilities = resolveRegistryUtilities(utilities)
    styles = resolveRegistryStyles(styleNames)
  } catch (error) {
    console.log("Failed to resolve registry shared resources.")
    console.log(error instanceof Error ? error.message : String(error))
    process.exitCode = 1
    return
  }

  const config = await loadConfig()

  if (dryRun) {
    console.log("Dry run: no files or dependencies will be changed.\n")

    console.log("Components:")
    for (const item of resolvedItems) {
      console.log(`- ${item.canonicalName} v${item.version}`)
    }

    console.log("\nDependencies:")
    for (const dependency of dependencies) {
      console.log(`- ${dependency}`)
    }

    console.log("\nUtilities:")
    for (const utility of utilities) {
      console.log(`- ${utility}`)
    }

    console.log("\nStyles:")
    for (const styleName of styleNames) {
      console.log(`- ${styleName}`)
    }

    console.log("\nInstall paths:")
    console.log(`- components: ${config.componentsPath}`)
    console.log(`- utilities: ${config.utilitiesPath}`)
    console.log(`- styles: ${config.stylesPath}`)
    console.log(`- tailwind css: ${config.tailwind.css}`)

    return
  }

  await ensureProjectStructure(config)
  await installDependencies(dependencies)
  const utilitiesResult = await installUtilities(resolvedUtilities, config)
  const stylesResult = await installStyles(styles, config)

  const successfullyInstalled = []
  const itemResults: InstallResourceResult[] = []

  for (const item of resolvedItems) {
    const itemResult = await installItemFiles(item, config)
    itemResults.push(itemResult)

    if (hasInstallConflicts(itemResult)) {
      console.log(
        `${item.canonicalName} was not marked as installed because conflicts were found.`,
      )
    } else {
      successfullyInstalled.push(item)
    }

    console.log("")
  }

  const installed = {
    ...(config.installed ?? {}),
  }

  for (const item of successfullyInstalled) {
    installed[item.name] = item.version
  }

  await saveConfig({
    ...config,
    installed,
  })

  const itemSummary = mergeInstallResults(itemResults)
  const sharedSummary = mergeInstallResults([utilitiesResult, stylesResult])

  console.log("Install summary:")
  printResourceSummary("components", itemSummary)
  printResourceSummary("shared resources", sharedSummary)
  console.log(
    `- tracked components: ${successfullyInstalled.length}/${resolvedItems.length}`,
  )

  if (hasInstallConflicts(sharedSummary)) {
    console.log(
      "Shared resource conflicts were left untouched. Review them before relying on the installed components.",
    )
  }
}
