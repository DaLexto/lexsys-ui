/**
 * page-header.ts
 *
 * Registry metadata for the PageHeader block.
 */

import type { RegistryItem } from "../registry.types.js";

export const pageHeaderRegistryItem: RegistryItem = {
  name: "page-header",
  canonicalName: "PageHeader",
  type: "block",
  category: "blocks",
  aliases: ["page-title"],
  files: [
    "blocks/PageHeader/PageHeader.tsx",
    "blocks/PageHeader/PageHeader.types.ts",
    "blocks/PageHeader/PageHeader.variants.ts",
  ],
  dependencies: ["clsx", "tailwind-merge"],
  registryDependencies: ["breadcrumb", "button"],
  utilities: ["cn"],
  styles: ["theme"],
  target: "src/components/ui/PageHeader",
};
