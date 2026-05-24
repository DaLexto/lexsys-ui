/**
 * ContextMenu.variants.ts
 *
 * Reuses Menu variant classes for context menu surfaces and items.
 */

import { cva } from "class-variance-authority"
import {
  menuArrowVariants,
  menuBackdropVariants,
  menuGroupLabelVariants,
  menuGroupVariants,
  menuItemIndicatorVariants,
  menuItemTextVariants,
  menuItemVariants,
  menuPopupVariants,
  menuPositionerVariants,
  menuSeparatorVariants,
  menuSubmenuTriggerIconVariants,
  menuTriggerVariants,
} from "../Menu/Menu.variants"

export const contextMenuBackdropVariants = menuBackdropVariants
export const contextMenuPositionerVariants = menuPositionerVariants
export const contextMenuPopupVariants = menuPopupVariants
export const contextMenuArrowVariants = menuArrowVariants
export const contextMenuItemVariants = menuItemVariants
export const contextMenuItemIndicatorVariants = menuItemIndicatorVariants
export const contextMenuItemTextVariants = menuItemTextVariants
export const contextMenuGroupVariants = menuGroupVariants
export const contextMenuGroupLabelVariants = menuGroupLabelVariants
export const contextMenuSeparatorVariants = menuSeparatorVariants
export const contextMenuSubmenuTriggerVariants = menuTriggerVariants
export const contextMenuSubmenuTriggerIconVariants =
  menuSubmenuTriggerIconVariants

export const contextMenuTriggerVariants = cva(
  "outline-none focus-visible:ring-(length:--lsys-menu-focus-ring-width) focus-visible:ring-(--lsys-menu-focus-ring-color)",
)
