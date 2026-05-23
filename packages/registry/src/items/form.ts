/**
 * form.ts
 *
 * Registry metadata for the Form component.
 */

import type { RegistryItem } from "../registry.types.js"

export const formRegistryItem: RegistryItem = {
  name: "form",
  canonicalName: "Form",
  version: "0.0.1",
  type: "component",
  category: "forms",
  aliases: [],
  files: [
    "primitives/Form/Form.tsx",
    "primitives/Form/Form.types.ts",
    "primitives/Form/Form.variants.ts",
  ],
  remoteFiles: [
    {
      path: "primitives/Form/Form.tsx",
    },
    {
      path: "primitives/Form/Form.types.ts",
    },
    {
      path: "primitives/Form/Form.variants.ts",
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
  target: "src/components/primitives/Form",
}
