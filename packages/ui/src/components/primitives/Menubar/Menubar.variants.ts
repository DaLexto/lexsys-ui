/**
 * Menubar.variants.ts
 *
 * Defines visual variants using class composition.
 */

import { cva } from "class-variance-authority"

export const menubarVariants = cva(
  "flex items-center gap-(--lsys-menu-list-gap) rounded-(--lsys-menu-radius) border border-(--lsys-menu-trigger-border-color) bg-(--lsys-menu-trigger-background) p-(--lsys-menu-list-padding)",
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
