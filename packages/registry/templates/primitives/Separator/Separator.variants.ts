/**
 * Separator.variants.ts
 *
 * Defines visual variants using class composition.
 */

import { cva } from "class-variance-authority"

export const separatorVariants = cva("shrink-0 bg-(--lex-separator-color)", {
  variants: {
    orientation: {
      horizontal: "h-(--lex-separator-thickness) w-full",
      vertical: "h-full w-(--lex-separator-thickness)",
    },
  },
  defaultVariants: {
    orientation: "horizontal",
  },
})
