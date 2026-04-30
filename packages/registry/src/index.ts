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

export { alertRegistryItem } from "./items/alert.js"
export { buttonRegistryItem } from "./items/button.js"
export { cardRegistryItem } from "./items/card.js"
export { badgeRegistryItem } from "./items/badge.js"
export { themeRegistryStyle } from "./styles/theme.js"
export { cnRegistryUtility } from "./utilities/cn.js"

import { alertRegistryItem } from "./items/alert.js"
import { badgeRegistryItem } from "./items/badge.js"
import { buttonRegistryItem } from "./items/button.js"
import { cardRegistryItem } from "./items/card.js"
import { themeRegistryStyle } from "./styles/theme.js"
import { cnRegistryUtility } from "./utilities/cn.js"

export const registryVersion = "0.0.1"

export interface RegistryManifest {
  version: string
  items: RegistryItem[]
  styles: RegistryStyle[]
  utilities: RegistryUtility[]
}

export const registryItems: RegistryItem[] = [
  alertRegistryItem,
  badgeRegistryItem,
  buttonRegistryItem,
  cardRegistryItem,
]
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
