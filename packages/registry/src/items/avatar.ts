/**
 * avatar.ts
 *
 * Registry metadata for the Avatar component.
 */

import type { RegistryItem } from "../registry.types.js"

export const avatarRegistryItem: RegistryItem = {
  name: "avatar",
  canonicalName: "Avatar",
  version: "0.0.1",
  type: "component",
  category: "data-display",
  aliases: [],
  files: [
    "components/Avatar/Avatar.tsx",
    "components/Avatar/Avatar.types.ts",
    "components/Avatar/Avatar.variants.ts",
  ],
  remoteFiles: [
    {
      path: "components/Avatar/Avatar.tsx",
    },
    {
      path: "components/Avatar/Avatar.types.ts",
    },
    {
      path: "components/Avatar/Avatar.variants.ts",
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
  target: "src/components/ui/Avatar",
}
