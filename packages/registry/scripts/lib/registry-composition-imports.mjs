/**
 * Keep in sync with src/registry-composition-imports.ts
 */

const COMPOSITION_IMPORT_PATTERNS = [
  /from "\.\.\/\.\.\/(primitives|blocks|templates)\/([A-Za-z0-9]+)\//g,
  /from "@\/components\/(primitives|blocks|templates)\/([A-Za-z0-9]+)/g,
];

export const toRegistryItemName = (canonicalName) => {
  return canonicalName.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
};

export const extractRegistryCompositionImports = (source) => {
  const names = new Set();

  for (const pattern of COMPOSITION_IMPORT_PATTERNS) {
    for (const match of source.matchAll(pattern)) {
      names.add(toRegistryItemName(match[2]));
    }
  }

  return [...names].sort((a, b) => a.localeCompare(b));
};

export const getRegistryDependenciesFromTemplateContents = (contents) => {
  const names = new Set();

  for (const content of contents) {
    for (const name of extractRegistryCompositionImports(content)) {
      names.add(name);
    }
  }

  return [...names].sort((a, b) => a.localeCompare(b));
};
