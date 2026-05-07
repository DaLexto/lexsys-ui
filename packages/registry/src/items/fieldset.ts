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
    "components/Fieldset/Fieldset.tsx",
    "components/Fieldset/Fieldset.types.ts",
    "components/Fieldset/Fieldset.variants.ts",
  ],
  remoteFiles: [
    {
      path: "components/Fieldset/Fieldset.tsx",
    },
    {
      path: "components/Fieldset/Fieldset.types.ts",
    },
    {
      path: "components/Fieldset/Fieldset.variants.ts",
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
