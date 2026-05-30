/**
 * checkbox-group.ts
 *
 * Registry metadata for the CheckboxGroup component.
 */

import type { RegistryItem } from "../registry.types.js"

export const checkboxGroupRegistryItem: RegistryItem = {
  name: "checkbox-group",
  canonicalName: "CheckboxGroup",
  type: "component",
  category: "forms",
  aliases: [],
  files: [
    "primitives/CheckboxGroup/CheckboxGroup.tsx",
    "primitives/CheckboxGroup/CheckboxGroup.types.ts",
    "primitives/CheckboxGroup/CheckboxGroup.variants.ts",
  ],
  remoteFiles: [
    {
      path: "primitives/CheckboxGroup/CheckboxGroup.tsx",
    },
    {
      path: "primitives/CheckboxGroup/CheckboxGroup.types.ts",
    },
    {
      path: "primitives/CheckboxGroup/CheckboxGroup.variants.ts",
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
  target: "src/components/ui/CheckboxGroup",
}
