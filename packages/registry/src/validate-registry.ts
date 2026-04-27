import type { RegistryItem } from "./registry.types.js";

export const validateRegistry = (items: RegistryItem[]): void => {
  const availableNames = new Set(items.map((item) => item.name));

  for (const item of items) {
    for (const dependency of item.registryDependencies) {
      if (!availableNames.has(dependency)) {
        throw new Error(
          `Registry item "${item.name}" references missing registry dependency: ${dependency}`,
        );
      }
    }
  }
};