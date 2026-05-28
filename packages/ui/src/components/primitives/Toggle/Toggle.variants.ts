/**
 * Toggle.variants.ts
 *
 * Defines visual variants using class composition.
 */

import { cva } from "class-variance-authority"
import { disabledStateClasses } from "../../../utils/cn"

export const toggleVariants = cva(
  [
    "inline-flex items-center justify-center rounded-(--lex-toggle-radius) border",
    "border-(--lex-toggle-border-color) bg-(--lex-toggle-background) text-(--lex-toggle-foreground)",
    "font-(family-name:--lex-toggle-font-family) font-(--lex-toggle-font-weight) leading-(--lex-toggle-font-line-height) tracking-(--lex-toggle-font-letter-spacing)",
    "transition-colors duration-(--lex-toggle-transition-duration) ease-(--lex-toggle-transition-easing)",
    "outline-none hover:bg-(--lex-toggle-hover-background) data-[pressed]:border-(--lex-toggle-pressed-border-color) data-[pressed]:bg-(--lex-toggle-pressed-background) data-[pressed]:text-(--lex-toggle-pressed-foreground)",
    "focus-visible:ring-(length:--lex-toggle-focus-ring-width) focus-visible:ring-(--lex-toggle-focus-ring-color) focus-visible:ring-offset-(length:--lex-toggle-focus-ring-offset) focus-visible:ring-offset-(--lex-toggle-focus-ring-offset-color)",
    disabledStateClasses,
  ].join(" "),
  {
    variants: {
      size: {
        sm: "h-(--lex-toggle-height-sm) px-(--lex-toggle-padding-x-sm) text-(length:--lex-toggle-font-size-sm)",
        md: "h-(--lex-toggle-height-md) px-(--lex-toggle-padding-x-md) text-(length:--lex-toggle-font-size-md)",
        lg: "h-(--lex-toggle-height-lg) px-(--lex-toggle-padding-x-lg) text-(length:--lex-toggle-font-size-lg)",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
)
