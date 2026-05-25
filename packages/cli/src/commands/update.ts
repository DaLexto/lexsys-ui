import { loadConfig, saveConfig } from "../config/config.js"
import {
  collectUtilities,
  findItem,
  resolveRegistryStyles,
  resolveRegistryUtilities,
} from "../registry/resolver.js"
import { checkItemUpdate } from "../install/update-engine.js"
import { hasFlag, removeFlags, removeFlagsWithValues } from "../core/flags.js"
import { getRegistryProviderResult } from "../registry/provider.js"
import { installStyles, updateUtilities } from "../install/installer.js"
import {
  hasInstallConflicts,
  printResourceSummary,
} from "../install/results.js"
import type { LexsysConfig } from "../config/config.js"

const styleUpdateNames = ["theme"]

const resolveInstalledKey = async (
  name: string,
  installed: Record<string, string>,
): Promise<string | undefined> => {
  if (installed[name]) {
    return name
  }

  const item = await findItem(name)

  if (!item) {
    return undefined
  }

  return installed[item.name] ? item.name : undefined
}

const runStylesUpdate = async (
  config: LexsysConfig,
  dryRun: boolean,
): Promise<void> => {
  const styles = resolveRegistryStyles(styleUpdateNames)

  if (dryRun) {
    console.log("Dry run: no style files will be changed.\n")
    console.log("Styles:")
    for (const style of styles) {
      console.log(`- ${style.name} v${style.version}`)
      for (const file of style.files) {
        console.log(`  ~ ${config.paths.styles}/${file.target}`)
      }
    }
    console.log(`\nTailwind CSS entrypoint: ${config.tailwind.css}`)
    return
  }

  const result = await installStyles(styles, config)

  console.log("Style update summary:")
  printResourceSummary("styles", result)

  if (hasInstallConflicts(result)) {
    console.log(
      "Style conflicts were left untouched. Review them before relying on the generated theme output.",
    )
  }
}

const runUtilitiesUpdate = async (
  config: LexsysConfig,
  installed: Record<string, string>,
  dryRun: boolean,
  force: boolean,
): Promise<void> => {
  const installedItems = (
    await Promise.all(
      Object.keys(installed).map(async (name) => findItem(name)),
    )
  ).filter((item): item is NonNullable<typeof item> => Boolean(item))

  const utilityNames = collectUtilities(installedItems)

  if (!utilityNames.length) {
    console.log("No shared utilities are tracked for installed components.")
    return
  }

  const utilities = resolveRegistryUtilities(utilityNames)

  if (dryRun) {
    console.log("Dry run: no utility files will be changed.\n")
    console.log("Utilities:")
    for (const utility of utilities) {
      console.log(`- ${utility.name}`)
      console.log(`  ~ ${config.paths.utilities}/${utility.target}`)
    }
    return
  }

  const result = await updateUtilities(utilities, config, force)

  console.log("Utility update summary:")
  printResourceSummary("utilities", result)

  if (hasInstallConflicts(result)) {
    console.log(
      "Utility conflicts were left untouched. Re-run with --force to overwrite after creating backups.",
    )
  }
}

const runComponentUpdates = async (
  config: LexsysConfig,
  installed: Record<string, string>,
  targetNames: string[],
  dryRun: boolean,
  force: boolean,
  sync: boolean,
): Promise<boolean> => {
  let changed = false

  if (!Object.keys(installed).length) {
    console.log("No Lexsys components are currently tracked.")
    return false
  }

  console.log("Checking installed Lexsys components:\n")

  for (const name of targetNames) {
    const version = installed[name]

    if (!version) {
      continue
    }

    const didUpdate = await checkItemUpdate(name, version, dryRun, force, sync)

    const item = await findItem(name)

    if (didUpdate && item) {
      installed[name] = item.version
      changed = true
    }
  }

  return changed
}

export const runUpdate = async (args: string[]): Promise<void> => {
  const dryRun = hasFlag(args, "--dry-run")
  const force = hasFlag(args, "--force")
  const yes = hasFlag(args, "--yes")
  const noFallback = hasFlag(args, "--no-fallback")
  const sync = hasFlag(args, "--sync")
  const stylesFlag = hasFlag(args, "--styles") || args.includes("styles")
  const utilitiesFlag = hasFlag(args, "--utilities")
  const updateAll = args.includes("--all")

  const targetArgs = removeFlags(removeFlagsWithValues(args, ["--cwd"]), [
    "--dry-run",
    "--force",
    "--yes",
    "--no-fallback",
    "--styles",
    "styles",
    "--sync",
    "--utilities",
    "--all",
  ])

  const config = await loadConfig()
  const installed = { ...(config.installed ?? {}) }

  try {
    await getRegistryProviderResult({
      fallback: !noFallback,
    })
  } catch (error) {
    console.log("Failed to resolve registry.")
    console.log(error instanceof Error ? error.message : String(error))
    process.exitCode = 1
    return
  }

  if (yes) {
    console.log("Auto-confirm mode is enabled.")
  }

  const shouldUpdateComponents = updateAll || targetArgs.length > 0
  const resourcesOnly = (stylesFlag || utilitiesFlag) && !shouldUpdateComponents

  if (resourcesOnly) {
    if (stylesFlag) {
      await runStylesUpdate(config, dryRun)
    }

    if (utilitiesFlag) {
      await runUtilitiesUpdate(config, installed, dryRun, force)
    }

    return
  }

  if (!shouldUpdateComponents && !stylesFlag && !utilitiesFlag) {
    console.log("Please specify components to update or use --all.")
    return
  }

  if (stylesFlag) {
    await runStylesUpdate(config, dryRun)
  }

  if (utilitiesFlag) {
    await runUtilitiesUpdate(config, installed, dryRun, force)
  }

  if (!shouldUpdateComponents) {
    return
  }

  let changed = false

  if (updateAll) {
    changed = await runComponentUpdates(
      config,
      installed,
      Object.keys(installed),
      dryRun,
      force,
      sync,
    )
  } else {
    for (const name of targetArgs) {
      const installedKey = await resolveInstalledKey(name, installed)

      if (!installedKey) {
        console.log(`Component "${name}" is not tracked as installed.`)
        continue
      }

      const didUpdateOne = await runComponentUpdates(
        config,
        installed,
        [installedKey],
        dryRun,
        force,
        sync,
      )

      if (didUpdateOne) {
        changed = true
      }
    }
  }

  if (changed) {
    await saveConfig({
      ...config,
      installed,
    })
  }
}
