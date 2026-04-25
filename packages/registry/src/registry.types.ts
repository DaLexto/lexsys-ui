/**
 * registry.types.ts
 *
 * Shared registry metadata types.
 */

export type RegistryItemType = "component" | "utility" | "style"

export type RegistryItemCategory =
  | "actions"
  | "forms"
  | "overlays"
  | "navigation"
  | "feedback"
  | "layout"
  | "data-display"
  | "utilities"

export interface RegistryItem {
  name: string
  canonicalName: string
  type: RegistryItemType
  category: RegistryItemCategory
  aliases: string[]
  files: string[]
  dependencies: string[]
  registryDependencies: string[]
  utilities: string[]
  styles: string[]
  target: string
}