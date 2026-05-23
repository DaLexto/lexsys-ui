/**
 * button.ts
 *
 * Registry metadata for the Button component.
 */

import type { RegistryItem } from "../registry.types.js"

export const buttonRegistryItem: RegistryItem = {
  name: "button",
  canonicalName: "Button",
  version: "0.0.1",
  type: "component",
  category: "actions",
  aliases: ["btn"],
  files: [
    "primitives/Button/Button.tsx",
    "primitives/Button/Button.types.ts",
    "primitives/Button/Button.variants.ts",
  ],
  remoteFiles: [
    {
      path: "primitives/Button/Button.tsx",
    },
    {
      path: "primitives/Button/Button.types.ts",
    },
    {
      path: "primitives/Button/Button.variants.ts",
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
  target: "src/components/ui/Button",
}
