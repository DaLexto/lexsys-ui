/**
 * RadioGroup.variants.ts
 *
 * Defines visual variants using class composition.
 */

import { cva } from "class-variance-authority"

export const radioGroupVariants = cva("grid gap-(--nx-radio-group-gap)", {
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
    "inline-flex shrink-0 items-center justify-center rounded-(--nx-radio-group-item-radius) border",
    "border-(--nx-radio-group-item-border-color) bg-(--nx-radio-group-item-background) text-(--nx-radio-group-item-foreground)",
    "transition-colors duration-(--nx-radio-group-transition-duration) ease-(--nx-radio-group-transition-easing)",
    "outline-none data-[checked]:border-(--nx-radio-group-item-checked-border-color)",
    "data-[focused]:ring-(length:--nx-radio-group-focus-ring-width) data-[focused]:ring-(--nx-radio-group-focus-ring-color) data-[focused]:ring-offset-(length:--nx-radio-group-focus-ring-offset) data-[focused]:ring-offset-(--nx-radio-group-focus-ring-offset-color)",
    "data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50",
  ].join(" "),
  {
    variants: {
      size: {
        sm: "size-(--nx-radio-group-item-size-sm)",
        md: "size-(--nx-radio-group-item-size-md)",
        lg: "size-(--nx-radio-group-item-size-lg)",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
)

export const radioGroupLabelVariants = cva(
  "inline-flex items-center gap-(--nx-radio-group-label-gap) text-(length:--nx-radio-group-label-font-size) font-(--nx-radio-group-label-font-weight) leading-(--nx-radio-group-label-font-line-height) text-(--nx-radio-group-label-foreground)",
)

export const radioGroupIndicatorVariants = cva("rounded-full bg-current", {
  variants: {
    size: {
      sm: "size-(--nx-radio-group-indicator-size-sm)",
      md: "size-(--nx-radio-group-indicator-size-md)",
      lg: "size-(--nx-radio-group-indicator-size-lg)",
    },
  },
  defaultVariants: {
    size: "md",
  },
})
