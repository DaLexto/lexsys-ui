/**
 * radio-group.ts
 *
 * Registry metadata for the RadioGroup component.
 */

import type { RegistryItem } from "../registry.types.js"

export const radioGroupRegistryItem: RegistryItem = {
  name: "radio-group",
  canonicalName: "RadioGroup",
  version: "0.0.1",
  type: "component",
  category: "forms",
  aliases: ["radio"],
  files: [
    "primitives/RadioGroup/RadioGroup.tsx",
    "primitives/RadioGroup/RadioGroup.types.ts",
    "primitives/RadioGroup/RadioGroup.variants.ts",
  ],
  remoteFiles: [
    {
      path: "primitives/RadioGroup/RadioGroup.tsx",
    },
    {
      path: "primitives/RadioGroup/RadioGroup.types.ts",
    },
    {
      path: "primitives/RadioGroup/RadioGroup.variants.ts",
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
  target: "src/components/ui/RadioGroup",
}
