/**
 * Menubar.variants.ts
 *
 * Defines visual variants using class composition.
 */

import { cva } from "class-variance-authority"

export const menubarVariants = cva(
  "flex items-center gap-(--nx-menu-list-gap) rounded-(--nx-menu-radius) border border-(--nx-menu-trigger-border-color) bg-(--nx-menu-trigger-background) p-(--nx-menu-list-padding)",
  {
    variants: {
      orientation: {
        horizontal: "flex-row",
        vertical: "flex-col",
      },
    },
    defaultVariants: {
      orientation: "horizontal",
    },
  },
)
