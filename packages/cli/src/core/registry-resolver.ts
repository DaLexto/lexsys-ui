import { registryItems } from "@neurex-ui/registry";
import type { RegistryItem } from "@neurex-ui/registry";
import { findClosestValue } from "./suggestions.js";

export const findItem = (name: string): RegistryItem | undefined => {
  const normalizedName = name.toLowerCase();

  return registryItems.find(
    (item) =>
      item.name.toLowerCase() === normalizedName ||
      item.canonicalName.toLowerCase() === normalizedName ||
      item.aliases.some((alias) => alias.toLowerCase() === normalizedName),
  );
};

export const resolveRegistryItems = (names: string[]): RegistryItem[] => {
  const resolved = new Map<string, RegistryItem>();

  const visit = (name: string): void => {
    const item = findItem(name);

    if (!item) {
      const availableNames = registryItems.flatMap((registryItem) => [
        registryItem.name,
        registryItem.canonicalName,
        ...registryItem.aliases,
      ]);

      const suggestion = findClosestValue(name, availableNames);

      console.log(`Component "${name}" not found.`);

      if (suggestion) {
        console.log(`Did you mean "${suggestion}"?`);
      }

      process.exit(1);
    }

    const key = item.canonicalName.toLowerCase();

    if (resolved.has(key)) {
      return;
    }

    resolved.set(key, item);

    for (const dependency of item.registryDependencies) {
      visit(dependency);
    }
  };

  for (const name of names) {
    visit(name);
  }

  return Array.from(resolved.values());
};

export const collectDependencies = (items: RegistryItem[]): string[] => {
  return Array.from(new Set(items.flatMap((item) => item.dependencies)));
};

export const collectUtilities = (items: RegistryItem[]): string[] => {
  return Array.from(new Set(items.flatMap((item) => item.utilities)));
};
