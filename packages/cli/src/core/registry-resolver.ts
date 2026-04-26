import { registryItems } from "@neurex-ui/registry";
import type { RegistryItem } from "@neurex-ui/registry";

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
      console.log(`Component "${name}" not found.`);
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