import { getInstallLayer } from "./install-layer.js"
import type { RegistryItem } from "./registry.types.js"

export const validateRegistryComposition = (
  items: RegistryItem[],
): string[] => {
  const errors: string[] = []
  const itemsByName = new Map(items.map((item) => [item.name, item]))

  const visitCycle = (
    name: string,
    stack: string[],
    visited: Set<string>,
  ): void => {
    if (stack.includes(name)) {
      errors.push(
        `Registry dependency cycle detected: ${[...stack, name].join(" -> ")}`,
      )
      return
    }

    if (visited.has(name)) {
      return
    }

    visited.add(name)
    const item = itemsByName.get(name)

    if (!item) {
      return
    }

    for (const dep of item.registryDependencies) {
      visitCycle(dep, [...stack, name], visited)
    }
  }

  for (const item of items) {
    visitCycle(item.name, [], new Set())
  }

  for (const item of items) {
    const itemLayer = getInstallLayer(item)

    if (!itemLayer) {
      continue
    }

    if (itemLayer === "primitive" && item.registryDependencies.length > 0) {
      errors.push(
        `Registry primitive "${item.name}" MUST NOT declare registryDependencies`,
      )
    }

    if (itemLayer !== "block" && itemLayer !== "template") {
      continue
    }

    for (const depName of item.registryDependencies) {
      const dep = itemsByName.get(depName)

      if (!dep) {
        continue
      }

      const depLayer = getInstallLayer(dep)

      if (!depLayer) {
        errors.push(
          `Registry item "${item.name}" depends on "${depName}" with invalid install layer metadata`,
        )
        continue
      }

      if (itemLayer === "block" && depLayer === "template") {
        errors.push(
          `Registry block "${item.name}" MUST NOT depend on template "${depName}"`,
        )
      }
    }
  }

  return errors
}
