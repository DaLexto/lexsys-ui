/**
 * Separator.variants.ts
 *
 * Defines visual variants using class composition.
 */

import { cva } from "class-variance-authority"

export const separatorVariants = cva(
  "shrink-0 bg-[var(--nx-separator-color)]",
  {
    variants: {
      orientation: {
        horizontal: "h-[var(--nx-separator-thickness)] w-full",
        vertical: "h-full w-[var(--nx-separator-thickness)]",
      },
    },
    defaultVariants: {
      orientation: "horizontal",
    },
  },
)
