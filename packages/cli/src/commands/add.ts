import { registryItems } from "@dalexto/lexsys-registry"

import { loadConfig, saveConfig } from "../config/config.js"
import {
  ensureProjectStructure,
  installItemFiles,
  installStyles,
  installUtilities,
} from "../install/installer.js"
import {
  hasInstallConflicts,
  mergeInstallResults,
  printResourceSummary,
} from "../install/results.js"
import type { InstallResourceResult } from "../install/results.js"
import { installDependencies } from "../utils/package-manager.js"
import {
  collectDependencies,
  collectStyles,
  collectUtilities,
  resolveRegistryStyles,
  resolveRegistryUtilities,
  resolveRegistryItems,
} from "../registry/resolver.js"
import type {
  ResolvedRegistryStyle,
  ResolvedRegistryUtility,
} from "../registry/types.js"
import { hasFlag, removeFlags, removeFlagsWithValues } from "../utils/flags.js"
import { promptMultiselect } from "../utils/prompt.js"

const promptSelectItems = async (): Promise<string[]> => {
  return promptMultiselect(
    "Select components to add",
    registryItems.map((item) => ({
      title: `${item.canonicalName} (${item.category})`,
      value: item.name,
    })),
  )
}

export const runAdd = async (args: string[]): Promise<void> => {
  const dryRun = hasFlag(args, "--dry-run", "-d")
  const yes = hasFlag(args, "--yes", "-y")
  const noFallback = hasFlag(args, "--no-fallback")

  let items = removeFlagsWithValues(args, ["--cwd", "-C"])
  items = removeFlags(items, [
    "--dry-run",
    "-d",
    "--yes",
    "-y",
    "--no-fallback",
  ])

  if (!items.length) {
    if (yes) {
      console.log("No components specified. Pass component names to add them.")
      return
    }

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
    console.log(`- components: ${config.paths.components}`)
    console.log(`- utilities: ${config.paths.utilities}`)
    console.log(`- styles: ${config.paths.styles}`)
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
