/**
 * Menubar.variants.ts
 *
 * Defines visual variants using class composition.
 */

import { cva } from "class-variance-authority"

export const menubarVariants = cva(
  "flex items-center gap-(--lex-menu-list-gap) rounded-(--lex-menu-radius) border border-(--lex-menu-trigger-border-color) bg-(--lex-menu-trigger-background) p-(--lex-menu-list-padding)",
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
