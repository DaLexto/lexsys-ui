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
import { findOrphanInstalledItems } from "../core/registry-closure.js"
import { getRegistryItems } from "../core/registry-provider.js"
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

const removeInstalledKey = (
  installed: Record<string, string>,
  itemName: string,
): void => {
  const installedKey = Object.keys(installed).find((key) => {
    return normalizeInstalledKey(key) === normalizeInstalledKey(itemName)
  })

  if (installedKey) {
    delete installed[installedKey]
  }
}

export const runUninstall = async (args: string[]): Promise<void> => {
  const dryRun = hasFlag(args, "--dry-run")
  const withDeps = hasFlag(args, "--with-deps")
  const noFallback = hasFlag(args, "--no-fallback")
  const targetArgs = removeFlagsWithValues(
    removeFlags(args, ["--dry-run", "--with-deps", "--no-fallback"]),
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
    removeInstalledKey(remainingInstalled, item.name)
  }

  const allItems = await getRegistryItems({ fallback: !noFallback })
  const orphanItems = withDeps
    ? findOrphanInstalledItems(
        resolvedTargets.map((item) => item.name),
        remainingInstalled,
        allItems,
      )
    : findOrphanInstalledItems(
        resolvedTargets.map((item) => item.name),
        remainingInstalled,
        allItems,
      )

  const orphanHints = withDeps ? [] : orphanItems

  const allRemovalTargets = [
    ...resolvedTargets,
    ...(withDeps ? orphanItems : []),
  ].filter((item, index, array) => {
    return array.findIndex((entry) => entry.name === item.name) === index
  })

  if (dryRun) {
    console.log("Dry run: no files will be removed.\n")

    console.log("Components:")
    for (const item of resolvedTargets) {
      console.log(
        `- ${item.canonicalName} v${installed[item.name] ?? "unknown"}`,
      )
    }

    if (withDeps && orphanItems.length) {
      console.log("\nOrphan registry items (--with-deps):")
      for (const item of orphanItems) {
        console.log(`- ${item.canonicalName}`)
      }
    }

    if (!withDeps && orphanHints.length) {
      console.log(
        "\nPossible orphan registry items (use --with-deps to remove):",
      )
      for (const item of orphanHints) {
        console.log(`- ${item.canonicalName}`)
      }
    }

    const postOrphanRemaining = { ...remainingInstalled }

    for (const item of withDeps ? orphanItems : []) {
      removeInstalledKey(postOrphanRemaining, item.name)
    }

    const dryRunOrphans = collectOrphanedSharedResources(
      allRemovalTargets,
      await resolveInstalledItems(postOrphanRemaining),
    )

    console.log(
      "\nDependencies (npm packages are never removed automatically):",
    )
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

  for (const item of allRemovalTargets) {
    const itemResult = await uninstallItemFiles(item)
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
    removeInstalledKey(postUninstallInstalled, item.name)
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
    removeInstalledKey(updatedInstalled, item.name)
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
    `- untracked components: ${successfullyUninstalled.length}/${allRemovalTargets.length}`,
  )

  if (
    hasUninstallConflicts(mergeUninstallResults([itemSummary, sharedSummary]))
  ) {
    console.log(
      "Some files were left in place because they differ from registry templates.",
    )
  }
}
