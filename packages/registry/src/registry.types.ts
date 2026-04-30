/**
 * registry.types.ts
 *
 * Shared registry metadata types.
 */

export type RegistryItemType = "component" | "utility" | "style"

export interface RegistryFile {
  path: string
  remoteUrl?: string
}

export interface RegistryStyleFile {
  path: string
  target: string
}

export interface RegistryStyle {
  name: string
  version: string
  files: RegistryStyleFile[]
}

export interface RegistryUtility {
  name: string
  path: string
  target: string
}

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
  version: string
  type: RegistryItemType
  category: RegistryItemCategory
  aliases: string[]
  files: string[]
  remoteFiles?: RegistryFile[]
  dependencies: string[]
  registryDependencies: string[]
  utilities: string[]
  styles: string[]
  target: string
}
