/**
 * settings-panel.ts
 *
 * Registry metadata for the SettingsPanel block.
 */

import type { RegistryItem } from "../registry.types.js"

export const settingsPanelRegistryItem: RegistryItem = {
  name: "settings-panel",
  canonicalName: "SettingsPanel",
  version: "0.0.1",
  type: "block",
  category: "blocks",
  aliases: ["settings-section"],
  files: [
    "blocks/SettingsPanel/SettingsPanel.tsx",
    "blocks/SettingsPanel/SettingsPanel.types.ts",
    "blocks/SettingsPanel/SettingsPanel.variants.ts",
  ],
  dependencies: ["class-variance-authority", "clsx", "tailwind-merge"],
  registryDependencies: ["card"],
  utilities: ["cn"],
  styles: ["theme"],
  target: "src/components/ui/SettingsPanel",
}
