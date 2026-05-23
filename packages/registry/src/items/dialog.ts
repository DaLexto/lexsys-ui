/**
 * dialog.ts
 *
 * Registry metadata for the Dialog component.
 */

import type { RegistryItem } from "../registry.types.js"

export const dialogRegistryItem: RegistryItem = {
  name: "dialog",
  canonicalName: "Dialog",
  version: "0.0.1",
  type: "component",
  category: "overlays",
  aliases: [],
  files: [
    "primitives/Dialog/Dialog.tsx",
    "primitives/Dialog/Dialog.types.ts",
    "primitives/Dialog/Dialog.variants.ts",
  ],
  remoteFiles: [
    {
      path: "primitives/Dialog/Dialog.tsx",
    },
    {
      path: "primitives/Dialog/Dialog.types.ts",
    },
    {
      path: "primitives/Dialog/Dialog.variants.ts",
    },
  ],
  dependencies: [
    "@base-ui/react",
    "class-variance-authority",
    "lucide-react",
    "clsx",
    "tailwind-merge",
  ],
  registryDependencies: [],
  utilities: ["cn"],
  styles: ["theme"],
  target: "src/components/ui/Dialog",
}
