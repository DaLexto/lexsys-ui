/**
 * card.ts
 *
 * Registry metadata for the Card component.
 */

import type { RegistryItem } from "../registry.types.js"

export const cardRegistryItem: RegistryItem = {
  name: "card",
  canonicalName: "Card",
  type: "component",
  category: "layout",
  aliases: ["panel", "surface"],
  files: [
    "primitives/Card/Card.tsx",
    "primitives/Card/Card.types.ts",
    "primitives/Card/Card.variants.ts",
  ],
  remoteFiles: [
    {
      path: "primitives/Card/Card.tsx",
    },
    {
      path: "primitives/Card/Card.types.ts",
    },
    {
      path: "primitives/Card/Card.variants.ts",
    },
  ],
  dependencies: ["class-variance-authority", "clsx", "tailwind-merge"],
  registryDependencies: [],
  utilities: ["cn"],
  styles: ["theme"],
  target: "src/components/ui/Card",
}
