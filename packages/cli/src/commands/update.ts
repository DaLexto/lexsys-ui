import { loadConfig, saveConfig } from "../core/config.js"
import { findItem } from "../core/registry-resolver.js"
import { resolveRegistryStyles } from "../core/registry-resolver.js"
import { checkItemUpdate } from "../core/update-engine.js"
import { hasFlag, removeFlags, removeFlagsWithValues } from "../core/flags.js"
import { getRegistryProviderResult } from "../core/registry-provider.js"
import { installStyles } from "../core/installer.js"
import {
  hasInstallConflicts,
  printResourceSummary,
} from "../core/install-results.js"
import type { NeurexConfig } from "../core/config.js"

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
  config: NeurexConfig,
  dryRun: boolean,
): Promise<void> => {
  const styles = resolveRegistryStyles(styleUpdateNames)

  if (dryRun) {
    console.log("Dry run: no style files will be changed.\n")
    console.log("Styles:")
    for (const style of styles) {
      console.log(`- ${style.name} v${style.version}`)
      for (const file of style.files) {
        console.log(`  ~ ${config.stylesPath}/${file.target}`)
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

export const runUpdate = async (args: string[]): Promise<void> => {
  let changed = false

  const dryRun = hasFlag(args, "--dry-run")
  const force = hasFlag(args, "--force")
  const yes = hasFlag(args, "--yes")
  const noFallback = hasFlag(args, "--no-fallback")
  const stylesOnly = hasFlag(args, "--styles") || args.includes("styles")

  const targetArgs = removeFlags(removeFlagsWithValues(args, ["--cwd"]), [
    "--dry-run",
    "--force",
    "--yes",
    "--no-fallback",
    "--styles",
    "styles",
  ])

  const config = await loadConfig()
  const installed = config.installed ?? {}

  // 🔥 registry strict check (no-fallback support)
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

  if (stylesOnly) {
    await runStylesUpdate(config, dryRun)
    return
  }

  if (!Object.keys(installed).length) {
    console.log("No Neurex components are currently tracked.")
    return
  }

  if (args.includes("--all")) {
    console.log("Checking installed Neurex components:\n")

    for (const [name, version] of Object.entries(installed)) {
      const didUpdate = await checkItemUpdate(
        name,
        version,
        dryRun,
        config.componentsPath,
        force,
      )

      const item = await findItem(name)

      if (didUpdate && item) {
        installed[name] = item.version
        changed = true
      }
    }

    if (changed) {
      await saveConfig({
        ...config,
        installed,
      })
    }

    return
  }

  if (!targetArgs.length) {
    console.log("Please specify components to update or use --all.")
    return
  }

  for (const name of targetArgs) {
    const installedKey = await resolveInstalledKey(name, installed)

    if (!installedKey) {
      console.log(`Component "${name}" is not tracked as installed.`)
      continue
    }

    const didUpdate = await checkItemUpdate(
      installedKey,
      installed[installedKey],
      dryRun,
      config.componentsPath,
      force,
    )

    const item = await findItem(installedKey)

    if (didUpdate && item) {
      installed[installedKey] = item.version
      changed = true
    }
  }

  if (changed) {
    await saveConfig({
      ...config,
      installed,
    })
  }
}
