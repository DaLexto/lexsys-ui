/**
 * RadioGroup.variants.ts
 *
 * Defines visual variants using class composition.
 */

import { cva } from "class-variance-authority"

export const radioGroupVariants = cva("grid gap-[var(--nx-radio-group-gap)]", {
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
    "inline-flex shrink-0 items-center justify-center rounded-[var(--nx-radio-group-item-radius)] border",
    "border-[var(--nx-radio-group-item-border-color)] bg-[var(--nx-radio-group-item-background)] text-[var(--nx-radio-group-item-foreground)]",
    "transition-colors duration-[var(--nx-radio-group-transition-duration)] ease-[var(--nx-radio-group-transition-easing)]",
    "outline-none data-[checked]:border-[var(--nx-radio-group-item-checked-border-color)]",
    "data-[focused]:ring-2 data-[focused]:ring-[var(--nx-radio-group-focus-ring-color)] data-[focused]:ring-offset-2 data-[focused]:ring-offset-[var(--nx-radio-group-focus-ring-offset-color)]",
    "data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50",
  ].join(" "),
  {
    variants: {
      size: {
        sm: "size-[var(--nx-radio-group-item-size-sm)]",
        md: "size-[var(--nx-radio-group-item-size-md)]",
        lg: "size-[var(--nx-radio-group-item-size-lg)]",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
)

export const radioGroupLabelVariants = cva(
  "inline-flex items-center gap-[var(--nx-radio-group-label-gap)] text-[length:var(--nx-radio-group-label-font-size)] font-[var(--nx-radio-group-label-font-weight)] leading-[var(--nx-radio-group-label-font-line-height)] text-[var(--nx-radio-group-label-foreground)]",
)

export const radioGroupIndicatorVariants = cva("rounded-full bg-current", {
  variants: {
    size: {
      sm: "size-[var(--nx-radio-group-indicator-size-sm)]",
      md: "size-[var(--nx-radio-group-indicator-size-md)]",
      lg: "size-[var(--nx-radio-group-indicator-size-lg)]",
    },
  },
  defaultVariants: {
    size: "md",
  },
})
