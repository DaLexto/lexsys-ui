import type { RegistryItem } from "@neurex-ui/registry";
import { getRegistryItems } from "./registry-provider.js";
import { findClosestValue } from "./suggestions.js";

const normalizeName = (name: string): string => {
  return name.toLowerCase();
};

export const findItem = async (
  name: string,
): Promise<RegistryItem | undefined> => {
  const items = await getRegistryItems();
  const normalizedName = normalizeName(name);

  return items.find(
    (item) =>
      normalizeName(item.name) === normalizedName ||
      normalizeName(item.canonicalName) === normalizedName ||
      item.aliases.some((alias) => normalizeName(alias) === normalizedName),
  );
};

export const resolveRegistryItems = async (
  names: string[],
): Promise<RegistryItem[]> => {
  const items = await getRegistryItems();
  const resolved = new Map<string, RegistryItem>();

  const findLocalItem = (name: string): RegistryItem | undefined => {
    const normalizedName = normalizeName(name);

    return items.find(
      (item) =>
        normalizeName(item.name) === normalizedName ||
        normalizeName(item.canonicalName) === normalizedName ||
        item.aliases.some((alias) => normalizeName(alias) === normalizedName),
    );
  };

  const visit = (name: string): void => {
    const item = findLocalItem(name);

    if (!item) {
      const availableNames = items.flatMap((registryItem) => [
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

    const key = normalizeName(item.canonicalName);

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