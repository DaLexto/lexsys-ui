/**
 * button.ts
 *
 * Registry metadata for the Button component.
 */

import type { RegistryItem } from "../registry.types.js"

export const buttonRegistryItem: RegistryItem = {
  name: "button",
  canonicalName: "Button",
  type: "component",
  category: "actions",
  aliases: ["button", "btn"],
  files: [
    "components/Button/Button.tsx",
    "components/Button/Button.types.ts",
    "components/Button/Button.variants.ts",
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
  target: "components/ui/Button",
}
