/**
 * dashboard-shell.ts
 *
 * Registry metadata for the DashboardShell template.
 */

import type { RegistryItem } from "../registry.types.js"

export const dashboardShellRegistryItem: RegistryItem = {
  name: "dashboard-shell",
  canonicalName: "DashboardShell",
  version: "0.0.1",
  type: "block",
  category: "layout",
  aliases: ["dashboard-template"],
  files: [
    "templates/DashboardShell/DashboardShell.tsx",
    "templates/DashboardShell/DashboardShell.types.ts",
    "templates/DashboardShell/DashboardShell.variants.ts",
  ],
  dependencies: ["class-variance-authority", "clsx", "tailwind-merge"],
  registryDependencies: ["sidebar"],
  utilities: ["cn"],
  styles: ["theme"],
  target: "src/components/ui/DashboardShell",
}
