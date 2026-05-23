/**
 * fieldset.ts
 *
 * Registry metadata for the Fieldset component.
 */

import type { RegistryItem } from "../registry.types.js"

export const fieldsetRegistryItem: RegistryItem = {
  name: "fieldset",
  canonicalName: "Fieldset",
  version: "0.0.1",
  type: "component",
  category: "forms",
  aliases: [],
  files: [
    "primitives/Fieldset/Fieldset.tsx",
    "primitives/Fieldset/Fieldset.types.ts",
    "primitives/Fieldset/Fieldset.variants.ts",
  ],
  remoteFiles: [
    {
      path: "primitives/Fieldset/Fieldset.tsx",
    },
    {
      path: "primitives/Fieldset/Fieldset.types.ts",
    },
    {
      path: "primitives/Fieldset/Fieldset.variants.ts",
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
  target: "src/components/ui/Fieldset",
}
