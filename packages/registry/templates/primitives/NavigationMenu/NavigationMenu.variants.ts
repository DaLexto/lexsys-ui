/**
 * NavigationMenu.variants.ts
 *
 * Defines visual variants using class composition.
 */

import { cva } from "class-variance-authority"
import {
  menuArrowVariants,
  menuBackdropVariants,
  menuItemVariants,
  menuPopupVariants,
  menuPositionerVariants,
  menuSubmenuTriggerIconVariants,
  menuTriggerVariants,
  menuViewportVariants,
} from "../Menu/Menu.variants"

export const navigationMenuBackdropVariants = menuBackdropVariants
export const navigationMenuPositionerVariants = menuPositionerVariants
export const navigationMenuPopupVariants = menuPopupVariants
export const navigationMenuViewportVariants = menuViewportVariants
export const navigationMenuArrowVariants = menuArrowVariants
export const navigationMenuTriggerVariants = menuTriggerVariants
export const navigationMenuLinkVariants = menuItemVariants
export const navigationMenuIconVariants = menuSubmenuTriggerIconVariants

export const navigationMenuRootVariants = cva(
  "relative flex max-w-max flex-1 items-center justify-center",
)

export const navigationMenuListVariants = cva(
  "flex flex-1 list-none items-center justify-center gap-(--nx-menu-list-gap) p-(--nx-menu-list-padding)",
)

export const navigationMenuItemVariants = cva("relative")

export const navigationMenuContentVariants = cva(
  "grid gap-(--nx-menu-list-gap) p-(--nx-menu-list-padding)",
)
