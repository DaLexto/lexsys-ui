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
    "primitives/Avatar/Avatar.tsx",
    "primitives/Avatar/Avatar.types.ts",
    "primitives/Avatar/Avatar.variants.ts",
  ],
  remoteFiles: [
    {
      path: "primitives/Avatar/Avatar.tsx",
    },
    {
      path: "primitives/Avatar/Avatar.types.ts",
    },
    {
      path: "primitives/Avatar/Avatar.variants.ts",
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
  target: "src/components/primitives/Avatar",
}
