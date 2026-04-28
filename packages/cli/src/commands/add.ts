import prompts from "prompts"
import { registryItems } from "@neurex-ui/registry"

import { loadConfig, saveConfig } from "../core/config.js"
import {
  ensureProjectStructure,
  hasInstallConflicts,
  installItemFiles,
  installStyles,
  installUtilities,
} from "../core/installer.js"
import { installDependencies } from "../core/package-manager.js"
import {
  collectDependencies,
  collectStyles,
  collectUtilities,
  resolveRegistryStyles,
  resolveRegistryItems,
} from "../core/registry-resolver.js"
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
  let styles: ReturnType<typeof resolveRegistryStyles>

  try {
    styles = resolveRegistryStyles(collectStyles(resolvedItems))
  } catch (error) {
    console.log("Failed to resolve registry styles.")
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
    for (const style of styles) {
      console.log(`- ${style.name}`)
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
  const utilitiesResult = await installUtilities(utilities, config)
  const stylesResult = await installStyles(styles, config)

  const successfullyInstalled = []
  for (const item of resolvedItems) {
    const itemResult = await installItemFiles(item, config)
    
    // TODO: Too harsh to block installation of an item if there are conflicts in utilities or styles, 
    // since the item files themselves may not have conflicts. 
    // For now, only block installation if there are conflicts in the item files, 
    // but this may need to be revisited in the future.
    /* if (
      hasInstallConflicts(utilitiesResult) ||
      hasInstallConflicts(stylesResult) ||
      hasInstallConflicts(itemResult)
    ) { */
   if(hasInstallConflicts(itemResult)) {
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
}
