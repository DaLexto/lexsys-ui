/**
 * command-palette.ts
 *
 * Registry metadata for the CommandPalette block.
 */

import type { RegistryItem } from "../registry.types.js"

export const commandPaletteRegistryItem: RegistryItem = {
  name: "command-palette",
  canonicalName: "CommandPalette",
  type: "block",
  category: "blocks",
  aliases: ["command-menu", "kbar"],
  files: [
    "blocks/CommandPalette/CommandPalette.tsx",
    "blocks/CommandPalette/CommandPalette.types.ts",
    "blocks/CommandPalette/CommandPalette.variants.ts",
  ],
  dependencies: ["class-variance-authority", "clsx", "tailwind-merge"],
  registryDependencies: ["dialog", "input", "scroll-area", "separator"],
  utilities: ["cn"],
  styles: ["theme"],
  target: "src/components/ui/CommandPalette",
}
