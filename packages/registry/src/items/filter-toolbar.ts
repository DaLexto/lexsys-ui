/**
 * filter-toolbar.ts
 *
 * Registry metadata for the FilterToolbar block.
 */

import type { RegistryItem } from "../registry.types.js";

export const filterToolbarRegistryItem: RegistryItem = {
  name: "filter-toolbar",
  canonicalName: "FilterToolbar",
  type: "block",
  category: "blocks",
  aliases: ["table-filters", "list-filters"],
  files: [
    "blocks/FilterToolbar/FilterToolbar.tsx",
    "blocks/FilterToolbar/FilterToolbar.types.ts",
    "blocks/FilterToolbar/FilterToolbar.variants.ts",
  ],
  dependencies: ["clsx", "tailwind-merge"],
  registryDependencies: ["button", "input", "select", "toolbar"],
  utilities: ["cn"],
  styles: ["theme"],
  target: "src/components/ui/FilterToolbar",
};
