import type { RegistryItem } from "./registry.types.js";

const isEmpty = (value: string): boolean => {
  return !value || !value.trim();
};

export const validateRegistryItem = (item: RegistryItem): void => {
  if (isEmpty(item.name)) {
    throw new Error("Registry item has invalid 'name'");
  }

  if (isEmpty(item.canonicalName)) {
    throw new Error(`Registry item "${item.name}" has invalid 'canonicalName'`);
  }

  if (isEmpty(item.version)) {
    throw new Error(`Registry item "${item.name}" has invalid 'version'`);
  }

  if (!item.files || !item.files.length) {
    throw new Error(
      `Registry item "${item.name}" must define at least one file`,
    );
  }

  for (const file of item.files) {
    if (isEmpty(file)) {
      throw new Error(`Registry item "${item.name}" has invalid file entry`);
    }
  }

  if (item.dependencies) {
    for (const dep of item.dependencies) {
      if (isEmpty(dep)) {
        throw new Error(`Registry item "${item.name}" has invalid dependency`);
      }
    }
  }

  if (item.utilities) {
    for (const util of item.utilities) {
      if (isEmpty(util)) {
        throw new Error(`Registry item "${item.name}" has invalid utility`);
      }
    }
  }

  for (const file of item.files) {
    if (!file.includes(item.canonicalName)) {
      throw new Error(
        `Registry item "${item.name}" has file path that does not match canonicalName: ${file}`,
      );
    }
  }
};
