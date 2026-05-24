/**
 * RadioGroup.variants.ts
 *
 * Defines visual variants using class composition.
 */

import { cva } from "class-variance-authority"

export const radioGroupVariants = cva("grid gap-(--lsys-radio-group-gap)", {
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
    "inline-flex shrink-0 items-center justify-center rounded-(--lsys-radio-group-item-radius) border",
    "border-(--lsys-radio-group-item-border-color) bg-(--lsys-radio-group-item-background) text-(--lsys-radio-group-item-foreground)",
    "transition-colors duration-(--lsys-radio-group-transition-duration) ease-(--lsys-radio-group-transition-easing)",
    "outline-none data-[checked]:border-(--lsys-radio-group-item-checked-border-color)",
    "data-[focused]:ring-(length:--lsys-radio-group-focus-ring-width) data-[focused]:ring-(--lsys-radio-group-focus-ring-color) data-[focused]:ring-offset-(length:--lsys-radio-group-focus-ring-offset) data-[focused]:ring-offset-(--lsys-radio-group-focus-ring-offset-color)",
    "data-[disabled]:cursor-not-allowed data-[disabled]:opacity-(--lsys-opacity-disabled)",
  ].join(" "),
  {
    variants: {
      size: {
        sm: "size-(--lsys-radio-group-item-size-sm)",
        md: "size-(--lsys-radio-group-item-size-md)",
        lg: "size-(--lsys-radio-group-item-size-lg)",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
)

export const radioGroupLabelVariants = cva(
  "inline-flex items-center gap-(--lsys-radio-group-label-gap) text-(length:--lsys-radio-group-label-font-size) font-(--lsys-radio-group-label-font-weight) leading-(--lsys-radio-group-label-font-line-height) text-(--lsys-radio-group-label-foreground)",
)

export const radioGroupIndicatorVariants = cva("rounded-full bg-current", {
  variants: {
    size: {
      sm: "size-(--lsys-radio-group-indicator-size-sm)",
      md: "size-(--lsys-radio-group-indicator-size-md)",
      lg: "size-(--lsys-radio-group-indicator-size-lg)",
    },
  },
  defaultVariants: {
    size: "md",
  },
})
