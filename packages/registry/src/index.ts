/**
 * Public entry point for @neurex/registry.
 *
 * This package contains registry metadata used by the Neurex CLI.
 */

export type {
  RegistryFile,
  RegistryItem,
  RegistryItemCategory,
  RegistryItemType,
  RegistryStyle,
  RegistryStyleFile,
  RegistryUtility,
} from "./registry.types.js"
import type {
  RegistryItem,
  RegistryStyle,
  RegistryUtility,
} from "./registry.types.js"

export { buttonRegistryItem } from "./items/button.js"
export { themeRegistryStyle } from "./styles/theme.js"
export { cnRegistryUtility } from "./utilities/cn.js"

import { buttonRegistryItem } from "./items/button.js"
import { themeRegistryStyle } from "./styles/theme.js"
import { cnRegistryUtility } from "./utilities/cn.js"

export const registryVersion = "0.0.1"

export interface RegistryManifest {
  version: string
  items: RegistryItem[]
  styles: RegistryStyle[]
  utilities: RegistryUtility[]
}

export const registryItems: RegistryItem[] = [buttonRegistryItem]
export const registryStyles: RegistryStyle[] = [themeRegistryStyle]
export const registryUtilities: RegistryUtility[] = [cnRegistryUtility]

export const registryManifest: RegistryManifest = {
  version: registryVersion,
  items: registryItems,
  styles: registryStyles,
  utilities: registryUtilities,
}

export { validateRegistryItem } from "./validate-registry-item.js"
export { validateRegistry } from "./validate-registry.js"
