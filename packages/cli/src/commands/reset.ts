import { loadConfig } from "../config/config.js"
import { findInstalledKey, isInstalled } from "../config/installed.js"
import { computeRegistryClosure } from "../registry/closure.js"
import { findItem, resolveRegistryItems } from "../registry/resolver.js"
import { getRegistryItems } from "../registry/provider.js"
import { resetItem } from "../install/update-engine.js"
import { hasFlag, removeFlags, removeFlagsWithValues } from "../utils/flags.js"
import { promptMultiselect } from "../utils/prompt.js"
import { getRegistryProviderResult } from "../registry/provider.js"

const resolveInstalledKey = async (
  name: string,
  installed: string[],
): Promise<string | undefined> => {
  const direct = findInstalledKey(installed, name)

  if (direct) {
    return direct
  }

  const item = await findItem(name)

  if (!item) {
    return undefined
  }

  return findInstalledKey(installed, item.name)
}

export const runReset = async (args: string[]): Promise<void> => {
  const dryRun = hasFlag(args, "--dry-run", "-d")
  const withDeps = hasFlag(args, "--with-deps", "-w")
  const noFallback = hasFlag(args, "--no-fallback")
  const targetArgs = removeFlagsWithValues(
    removeFlags(args, [
      "--dry-run",
      "-d",
      "--with-deps",
      "-w",
      "--no-fallback",
    ]),
    ["--cwd", "-C"],
  )

  const config = await loadConfig()
  const installed = [...(config.installed ?? [])]

  if (!installed.length) {
    console.log("No components installed.")
    return
  }

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

  if (!targetArgs.length) {
    const selected = await promptMultiselect(
      "Select components to reset",
      installed.map((name) => ({ title: name, value: name })),
      { min: 1 },
    )

    if (!selected.length) return

    targetArgs.push(...selected)
  }

  const resetNames = new Set<string>()

  for (const name of targetArgs) {
    const installedKey = await resolveInstalledKey(name, installed)

    if (!installedKey) {
      console.log(`Component "${name}" is not tracked as installed.`)
      continue
    }

    resetNames.add(installedKey)
  }

  if (!resetNames.size) {
    console.log("No installed components matched the request.")
    return
  }

  if (withDeps) {
    const allItems = await getRegistryItems({ fallback: !noFallback })

    for (const rootName of [...resetNames]) {
      const closure = computeRegistryClosure([rootName], allItems)

      for (const dependencyName of closure) {
        if (isInstalled(installed, dependencyName)) {
          resetNames.add(dependencyName)
        }
      }
    }
  }

  const resetItems = await resolveRegistryItems([...resetNames], {
    fallback: !noFallback,
  })

  if (dryRun) {
    console.log("Dry run: no files will be changed.\n")
    console.log("Components:")
    for (const item of resetItems) {
      console.log(`- ${item.canonicalName}`)
    }
    console.log("")
  }

  for (const item of resetItems) {
    await resetItem(item.name, dryRun)
    console.log("")
  }
}
