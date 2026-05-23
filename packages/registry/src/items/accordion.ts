/**
 * accordion.ts
 *
 * Registry metadata for the Accordion component.
 */

import type { RegistryItem } from "../registry.types.js"

export const accordionRegistryItem: RegistryItem = {
  name: "accordion",
  canonicalName: "Accordion",
  version: "0.0.1",
  type: "component",
  category: "data-display",
  aliases: ["collapse"],
  files: [
    "primitives/Accordion/Accordion.tsx",
    "primitives/Accordion/Accordion.types.ts",
    "primitives/Accordion/Accordion.variants.ts",
  ],
  remoteFiles: [
    {
      path: "primitives/Accordion/Accordion.tsx",
    },
    {
      path: "primitives/Accordion/Accordion.types.ts",
    },
    {
      path: "primitives/Accordion/Accordion.variants.ts",
    },
  ],
  dependencies: [
    "@base-ui/react",
    "class-variance-authority",
    "clsx",
    "tailwind-merge",
  ],
  registryDependencies: [],
  utilities: ["cn"],
  styles: ["theme"],
  target: "src/components/ui/Accordion",
}
