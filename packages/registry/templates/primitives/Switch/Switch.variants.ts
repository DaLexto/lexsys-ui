/**
 * Switch.variants.ts
 *
 * Defines visual variants using class composition.
 */

import { cva } from "class-variance-authority"

export const switchVariants = cva(
  [
    "inline-flex shrink-0 cursor-pointer items-center rounded-(--lex-switch-radius) border border-transparent bg-(--lex-switch-background) p-(--lex-switch-padding)",
    "transition-colors duration-(--lex-switch-transition-duration) ease-(--lex-switch-transition-easing)",
    "outline-none data-[checked]:bg-(--lex-switch-checked-background)",
    "data-[focused]:ring-(length:--lex-switch-focus-ring-width) data-[focused]:ring-(--lex-switch-focus-ring-color) data-[focused]:ring-offset-(length:--lex-switch-focus-ring-offset) data-[focused]:ring-offset-(--lex-switch-focus-ring-offset-color)",
    "data-[disabled]:cursor-not-allowed data-[disabled]:opacity-(--lex-opacity-disabled)",
  ].join(" "),
  {
    variants: {
      size: {
        sm: "h-(--lex-switch-height-sm) w-(--lex-switch-width-sm)",
        md: "h-(--lex-switch-height-md) w-(--lex-switch-width-md)",
        lg: "h-(--lex-switch-height-lg) w-(--lex-switch-width-lg)",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
)

export const switchThumbVariants = cva(
  [
    "block rounded-(--lex-switch-thumb-radius) bg-(--lex-switch-thumb-background) shadow-sm ring-0",
    "transition-transform duration-(--lex-switch-transition-duration) ease-(--lex-switch-transition-easing)",
  ].join(" "),
  {
    variants: {
      size: {
        sm: "size-(--lex-switch-thumb-size-sm) data-[checked]:translate-x-(--lex-switch-thumb-translate-sm)",
        md: "size-(--lex-switch-thumb-size-md) data-[checked]:translate-x-(--lex-switch-thumb-translate-md)",
        lg: "size-(--lex-switch-thumb-size-lg) data-[checked]:translate-x-(--lex-switch-thumb-translate-lg)",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
)
