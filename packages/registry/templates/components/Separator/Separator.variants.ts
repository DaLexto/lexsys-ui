/**
 * Separator.variants.ts
 *
 * Defines visual variants using class composition.
 */

import { cva } from "class-variance-authority"

export const separatorVariants = cva("shrink-0 bg-(--nx-separator-color)", {
  variants: {
    orientation: {
      horizontal: "h-(--nx-separator-thickness) w-full",
      vertical: "h-full w-(--nx-separator-thickness)",
    },
  },
  defaultVariants: {
    orientation: "horizontal",
  },
})
