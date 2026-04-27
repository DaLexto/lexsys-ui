import type { RegistryItem } from "./registry.types.js";

export const validateRegistryItem = (item: RegistryItem): void => {
  if (!item.name) {
    throw new Error("Registry item is missing 'name'");
  }

  if (!item.canonicalName) {
    throw new Error(`Registry item "${item.name}" is missing 'canonicalName'`);
  }

  if (!item.version) {
    throw new Error(`Registry item "${item.name}" is missing 'version'`);
  }

  if (!item.files || !item.files.length) {
    throw new Error(
      `Registry item "${item.name}" must define at least one file`,
    );
  }

  for (const file of item.files) {
    if (typeof file !== "string" || !file.length) {
      throw new Error(`Registry item "${item.name}" has invalid file entry`);
    }
  }

  if (item.dependencies) {
    for (const dep of item.dependencies) {
      if (typeof dep !== "string") {
        throw new Error(`Registry item "${item.name}" has invalid dependency`);
      }
    }
  }

  if (item.utilities) {
    for (const util of item.utilities) {
      if (typeof util !== "string") {
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
