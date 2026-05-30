/**
 * badge.ts
 *
 * Registry metadata for the Badge component.
 */

import type { RegistryItem } from "../registry.types.js"

export const badgeRegistryItem: RegistryItem = {
  name: "badge",
  canonicalName: "Badge",
  type: "component",
  category: "data-display",
  aliases: ["tag", "label"],
  files: [
    "primitives/Badge/Badge.tsx",
    "primitives/Badge/Badge.types.ts",
    "primitives/Badge/Badge.variants.ts",
  ],
  remoteFiles: [
    {
      path: "primitives/Badge/Badge.tsx",
    },
    {
      path: "primitives/Badge/Badge.types.ts",
    },
    {
      path: "primitives/Badge/Badge.variants.ts",
    },
  ],
  dependencies: ["class-variance-authority", "clsx", "tailwind-merge"],
  registryDependencies: [],
  utilities: ["cn"],
  styles: ["theme"],
  target: "src/components/ui/Badge",
}
