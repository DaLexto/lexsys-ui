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
    "components/Dialog/Dialog.tsx",
    "components/Dialog/Dialog.types.ts",
    "components/Dialog/Dialog.variants.ts",
  ],
  remoteFiles: [
    {
      path: "components/Dialog/Dialog.tsx",
    },
    {
      path: "components/Dialog/Dialog.types.ts",
    },
    {
      path: "components/Dialog/Dialog.variants.ts",
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
