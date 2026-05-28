/**
 * empty.ts
 *
 * Registry metadata for the Empty block.
 */

import type { RegistryItem } from "../registry.types.js"

export const emptyRegistryItem: RegistryItem = {
  name: "empty",
  canonicalName: "Empty",
  version: "0.0.1",
  type: "block",
  category: "layout",
  aliases: ["empty-state"],
  files: [
    "blocks/Empty/Empty.tsx",
    "blocks/Empty/Empty.types.ts",
    "blocks/Empty/Empty.variants.ts",
  ],
  dependencies: ["clsx", "tailwind-merge"],
  registryDependencies: [],
  utilities: ["cn"],
  styles: ["theme"],
  target: "src/components/ui/Empty",
}
