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
    "components/Button/Button.tsx",
    "components/Button/Button.types.ts",
    "components/Button/Button.variants.ts",
  ],
  remoteFiles: [
    {
      path: "components/Button/Button.tsx",
    },
    {
      path: "components/Button/Button.types.ts",
    },
    {
      path: "components/Button/Button.variants.ts",
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
