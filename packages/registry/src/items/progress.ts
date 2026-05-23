/**
 * progress.ts
 *
 * Registry metadata for the Progress component.
 */

import type { RegistryItem } from "../registry.types.js"

export const progressRegistryItem: RegistryItem = {
  name: "progress",
  canonicalName: "Progress",
  version: "0.0.1",
  type: "component",
  category: "feedback",
  aliases: ["progress-bar"],
  files: [
    "primitives/Progress/Progress.tsx",
    "primitives/Progress/Progress.types.ts",
    "primitives/Progress/Progress.variants.ts",
  ],
  remoteFiles: [
    {
      path: "primitives/Progress/Progress.tsx",
    },
    {
      path: "primitives/Progress/Progress.types.ts",
    },
    {
      path: "primitives/Progress/Progress.variants.ts",
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
  target: "src/components/primitives/Progress",
}
