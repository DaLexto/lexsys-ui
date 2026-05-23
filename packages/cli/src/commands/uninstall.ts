import type { RegistryItem } from "@neurex/registry"
import { loadConfig, saveConfig } from "../core/config.js"
import {
  uninstallItemFiles,
  uninstallStyles,
  uninstallUtilities,
} from "../core/installer.js"
import { hasFlag, removeFlags, removeFlagsWithValues } from "../core/flags.js"
import {
  collectDependencies,
  collectStyles,
  collectUtilities,
  findItem,
  resolveRegistryItems,
  resolveRegistryStyles,
  resolveRegistryUtilities,
} from "../core/registry-resolver.js"
import type {
  ResolvedRegistryStyle,
  ResolvedRegistryUtility,
} from "../core/registry-types.js"
import {
  hasUninstallConflicts,
  mergeUninstallResults,
  printUninstallSummary,
} from "../core/uninstall-results.js"

const normalizeInstalledKey = (name: string): string => {
  return name.toLowerCase()
}

const resolveInstalledItems = async (
  installed: Record<string, string>,
): Promise<RegistryItem[]> => {
  const names = Object.keys(installed)

  if (!names.length) {
    return []
  }

  return resolveRegistryItems(names)
}

const collectOrphanedSharedResources = (
  removedItems: RegistryItem[],
  remainingItems: RegistryItem[],
): {
  utilities: string[]
  styles: string[]
} => {
  const removedUtilities = collectUtilities(removedItems)
  const removedStyles = collectStyles(removedItems)
  const remainingUtilities = new Set(collectUtilities(remainingItems))
  const remainingStyles = new Set(collectStyles(remainingItems))

  return {
    utilities: removedUtilities.filter((utility) => {
      return !remainingUtilities.has(utility)
    }),
    styles: removedStyles.filter((style) => {
      return !remainingStyles.has(style)
    }),
  }
}

export const runUninstall = async (args: string[]): Promise<void> => {
  const dryRun = hasFlag(args, "--dry-run")
  const noFallback = hasFlag(args, "--no-fallback")
  const targetArgs = removeFlagsWithValues(
    removeFlags(args, ["--dry-run", "--no-fallback"]),
    ["--cwd"],
  )

  if (!targetArgs.length) {
    console.log("Please specify components to uninstall.")
    return
  }

  const config = await loadConfig()
  const installed = config.installed ?? {}
  const resolvedTargets: RegistryItem[] = []
  const notTracked: string[] = []

  for (const name of targetArgs) {
    const item = await findItem(name, { fallback: !noFallback })

    if (!item) {
      console.log(`Component "${name}" not found in registry.`)
      continue
    }

    const installedKey = Object.keys(installed).find((key) => {
      return normalizeInstalledKey(key) === normalizeInstalledKey(item.name)
    })

    if (!installedKey) {
      notTracked.push(name)
      console.log(`Component "${name}" is not tracked as installed.`)
      continue
    }

    resolvedTargets.push(item)
  }

  if (!resolvedTargets.length) {
    if (!notTracked.length) {
      console.log("No installed components matched the request.")
    }

    return
  }

  const remainingInstalled = { ...installed }

  for (const item of resolvedTargets) {
    const installedKey = Object.keys(remainingInstalled).find((key) => {
      return normalizeInstalledKey(key) === normalizeInstalledKey(item.name)
    })

    if (installedKey) {
      delete remainingInstalled[installedKey]
    }
  }

  if (dryRun) {
    console.log("Dry run: no files will be removed.\n")

    console.log("Components:")
    for (const item of resolvedTargets) {
      console.log(
        `- ${item.canonicalName} v${installed[item.name] ?? "unknown"}`,
      )
    }

    const dryRunRemainingItems = await resolveInstalledItems(remainingInstalled)
    const dryRunOrphans = collectOrphanedSharedResources(
      resolvedTargets,
      dryRunRemainingItems,
    )

    console.log("\nDependencies (not removed automatically):")
    for (const dependency of collectDependencies(resolvedTargets)) {
      console.log(`- ${dependency}`)
    }

    console.log("\nShared resources eligible for removal:")
    for (const utility of dryRunOrphans.utilities) {
      console.log(`- utility: ${utility}`)
    }
    for (const style of dryRunOrphans.styles) {
      console.log(`- style: ${style}`)
    }

    return
  }

  const itemResults = []
  const successfullyUninstalled: RegistryItem[] = []

  for (const item of resolvedTargets) {
    const itemResult = await uninstallItemFiles(item, config)
    itemResults.push(itemResult)

    if (hasUninstallConflicts(itemResult)) {
      console.log(
        `${item.canonicalName} remains tracked because modified files were left in place.`,
      )
    } else {
      successfullyUninstalled.push(item)
    }

    console.log("")
  }

  const postUninstallInstalled = { ...installed }

  for (const item of successfullyUninstalled) {
    const installedKey = Object.keys(postUninstallInstalled).find((key) => {
      return normalizeInstalledKey(key) === normalizeInstalledKey(item.name)
    })

    if (installedKey) {
      delete postUninstallInstalled[installedKey]
    }
  }

  const remainingItems = await resolveInstalledItems(postUninstallInstalled)
  const orphanedResources = collectOrphanedSharedResources(
    successfullyUninstalled,
    remainingItems,
  )

  let resolvedUtilities: ResolvedRegistryUtility[] = []
  let resolvedStyles: ResolvedRegistryStyle[] = []

  if (orphanedResources.utilities.length || orphanedResources.styles.length) {
    try {
      resolvedUtilities = resolveRegistryUtilities(orphanedResources.utilities)
      resolvedStyles = resolveRegistryStyles(orphanedResources.styles)
    } catch (error) {
      console.log("Failed to resolve registry shared resources.")
      console.log(error instanceof Error ? error.message : String(error))
      process.exitCode = 1
      return
    }
  }

  const utilitiesResult = await uninstallUtilities(resolvedUtilities, config)
  const stylesResult = await uninstallStyles(resolvedStyles, config)

  const updatedInstalled = {
    ...installed,
  }

  for (const item of successfullyUninstalled) {
    const installedKey = Object.keys(updatedInstalled).find((key) => {
      return normalizeInstalledKey(key) === normalizeInstalledKey(item.name)
    })

    if (installedKey) {
      delete updatedInstalled[installedKey]
    }
  }

  await saveConfig({
    ...config,
    installed: updatedInstalled,
  })

  const itemSummary = mergeUninstallResults(itemResults)
  const sharedSummary = mergeUninstallResults([utilitiesResult, stylesResult])

  console.log("Uninstall summary:")
  printUninstallSummary("components", itemSummary)
  printUninstallSummary("shared resources", sharedSummary)
  console.log(
    `- untracked components: ${successfullyUninstalled.length}/${resolvedTargets.length}`,
  )

  if (
    hasUninstallConflicts(mergeUninstallResults([itemSummary, sharedSummary]))
  ) {
    console.log(
      "Some files were left in place because they differ from registry templates.",
    )
  }
}
