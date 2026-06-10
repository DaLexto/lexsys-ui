/**
 * settings-page-layout.ts
 *
 * Registry metadata for the SettingsPageLayout block.
 */

import type { RegistryItem } from "../registry.types.js";

export const settingsPageLayoutRegistryItem: RegistryItem = {
  name: "settings-page-layout",
  canonicalName: "SettingsPageLayout",
  type: "block",
  category: "layout",
  aliases: ["settings-template", "settings-layout"],
  files: [
    "templates/SettingsPageLayout/SettingsPageLayout.tsx",
    "templates/SettingsPageLayout/SettingsPageLayout.types.ts",
    "templates/SettingsPageLayout/SettingsPageLayout.variants.ts",
  ],
  dependencies: ["clsx", "tailwind-merge"],
  registryDependencies: ["page-header", "settings-panel"],
  utilities: ["cn"],
  styles: ["theme"],
  target: "src/components/ui/SettingsPageLayout",
};
