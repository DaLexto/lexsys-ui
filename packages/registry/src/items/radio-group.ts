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
    "components/RadioGroup/RadioGroup.tsx",
    "components/RadioGroup/RadioGroup.types.ts",
    "components/RadioGroup/RadioGroup.variants.ts",
  ],
  remoteFiles: [
    {
      path: "components/RadioGroup/RadioGroup.tsx",
    },
    {
      path: "components/RadioGroup/RadioGroup.types.ts",
    },
    {
      path: "components/RadioGroup/RadioGroup.variants.ts",
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
