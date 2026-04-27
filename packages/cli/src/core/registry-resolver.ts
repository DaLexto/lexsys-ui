import type { RegistryItem } from "@neurex-ui/registry";
import { validateRegistryItem } from "@neurex-ui/registry";
import { getRegistryItems } from "./registry-provider.js";
import { findClosestValue } from "./suggestions.js";

interface RegistryResolverOptions {
  fallback?: boolean;
}

const normalizeName = (name: string): string => {
  return name.toLowerCase();
};

export const findItem = async (
  name: string,
  options: RegistryResolverOptions = {},
): Promise<RegistryItem | undefined> => {
  const items = await getRegistryItems(options);
  const normalizedName = normalizeName(name);

  const item = items.find(
    (registryItem) =>
      normalizeName(registryItem.name) === normalizedName ||
      normalizeName(registryItem.canonicalName) === normalizedName ||
      registryItem.aliases.some(
        (alias) => normalizeName(alias) === normalizedName,
      ),
  );

  if (item) {
    validateRegistryItem(item);
  }

  return item;
};

export const resolveRegistryItems = async (
  names: string[],
  options: RegistryResolverOptions = {},
): Promise<RegistryItem[]> => {
  const items = await getRegistryItems(options);
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

    validateRegistryItem(item);

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
