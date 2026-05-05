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
    "components/Progress/Progress.tsx",
    "components/Progress/Progress.types.ts",
    "components/Progress/Progress.variants.ts",
  ],
  remoteFiles: [
    {
      path: "components/Progress/Progress.tsx",
    },
    {
      path: "components/Progress/Progress.types.ts",
    },
    {
      path: "components/Progress/Progress.variants.ts",
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
  target: "src/components/ui/Progress",
}
