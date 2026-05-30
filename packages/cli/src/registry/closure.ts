import type { RegistryItem } from "@dalexto/lexsys-registry"

export const computeRegistryClosure = (
  rootNames: string[],
  items: RegistryItem[],
): Set<string> => {
  const closure = new Set<string>()

  const visit = (name: string): void => {
    const item = items.find(
      (registryItem) => registryItem.name.toLowerCase() === name.toLowerCase(),
    )

    if (!item || closure.has(item.name)) {
      return
    }

    closure.add(item.name)

    for (const dependency of item.registryDependencies) {
      visit(dependency)
    }
  }

  for (const name of rootNames) {
    visit(name)
  }

  return closure
}

export const findOrphanInstalledItems = (
  removedTargetNames: string[],
  remainingInstalled: string[],
  items: RegistryItem[],
): RegistryItem[] => {
  const remainingNames = remainingInstalled
  const removedDependencyNames = new Set<string>()

  for (const removedName of removedTargetNames) {
    const closure = computeRegistryClosure([removedName], items)

    for (const name of closure) {
      const isRemovedTarget = removedTargetNames.some((targetName) => {
        return targetName.toLowerCase() === name.toLowerCase()
      })

      if (!isRemovedTarget) {
        removedDependencyNames.add(name)
      }
    }
  }

  return remainingNames
    .map((name) =>
      items.find(
        (registryItem) =>
          registryItem.name.toLowerCase() === name.toLowerCase(),
      ),
    )
    .filter((item): item is RegistryItem => Boolean(item))
    .filter((item) => removedDependencyNames.has(item.name))
}
