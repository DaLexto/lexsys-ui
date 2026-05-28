/**
 * RadioGroup.variants.ts
 *
 * Defines visual variants using class composition.
 */

import { cva } from "class-variance-authority"

export const radioGroupVariants = cva("grid gap-(--lex-radio-group-gap)", {
  variants: {
    orientation: {
      horizontal: "grid-flow-col justify-start",
      vertical: "grid-flow-row",
    },
  },
  defaultVariants: {
    orientation: "vertical",
  },
})

export const radioGroupItemVariants = cva(
  [
    "inline-flex shrink-0 items-center justify-center rounded-(--lex-radio-group-item-radius) border",
    "border-(--lex-radio-group-item-border-color) bg-(--lex-radio-group-item-background) text-(--lex-radio-group-item-foreground)",
    "transition-colors duration-(--lex-radio-group-transition-duration) ease-(--lex-radio-group-transition-easing)",
    "outline-none data-[checked]:border-(--lex-radio-group-item-checked-border-color)",
    "data-[focused]:ring-(length:--lex-radio-group-focus-ring-width) data-[focused]:ring-(--lex-radio-group-focus-ring-color) data-[focused]:ring-offset-(length:--lex-radio-group-focus-ring-offset) data-[focused]:ring-offset-(--lex-radio-group-focus-ring-offset-color)",
    "data-[disabled]:cursor-not-allowed data-[disabled]:opacity-(--lex-opacity-disabled)",
  ].join(" "),
  {
    variants: {
      size: {
        sm: "size-(--lex-radio-group-item-size-sm)",
        md: "size-(--lex-radio-group-item-size-md)",
        lg: "size-(--lex-radio-group-item-size-lg)",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
)

export const radioGroupLabelVariants = cva(
  "inline-flex items-center gap-(--lex-radio-group-label-gap) text-(length:--lex-radio-group-label-font-size) font-(--lex-radio-group-label-font-weight) leading-(--lex-radio-group-label-font-line-height) text-(--lex-radio-group-label-foreground)",
)

export const radioGroupIndicatorVariants = cva("rounded-full bg-current", {
  variants: {
    size: {
      sm: "size-(--lex-radio-group-indicator-size-sm)",
      md: "size-(--lex-radio-group-indicator-size-md)",
      lg: "size-(--lex-radio-group-indicator-size-lg)",
    },
  },
  defaultVariants: {
    size: "md",
  },
})
