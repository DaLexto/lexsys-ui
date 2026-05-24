/**
 * Separator.variants.ts
 *
 * Defines visual variants using class composition.
 */

import { cva } from "class-variance-authority"

export const separatorVariants = cva("shrink-0 bg-(--lsys-separator-color)", {
  variants: {
    orientation: {
      horizontal: "h-(--lsys-separator-thickness) w-full",
      vertical: "h-full w-(--lsys-separator-thickness)",
    },
  },
  defaultVariants: {
    orientation: "horizontal",
  },
})
