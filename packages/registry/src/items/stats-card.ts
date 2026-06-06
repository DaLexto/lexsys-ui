/**
 * stats-card.ts
 *
 * Registry metadata for the StatsCard block.
 */

import type { RegistryItem } from "../registry.types.js"

export const statsCardRegistryItem: RegistryItem = {
  name: "stats-card",
  canonicalName: "StatsCard",
  type: "block",
  category: "blocks",
  aliases: ["metric-card", "kpi-card"],
  files: [
    "blocks/StatsCard/StatsCard.tsx",
    "blocks/StatsCard/StatsCard.types.ts",
    "blocks/StatsCard/StatsCard.variants.ts",
  ],
  dependencies: ["clsx", "tailwind-merge"],
  registryDependencies: ["card"],
  utilities: ["cn"],
  styles: ["theme"],
  target: "src/components/ui/StatsCard",
}
