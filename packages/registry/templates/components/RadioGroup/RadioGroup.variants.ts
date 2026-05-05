/**
 * RadioGroup.variants.ts
 *
 * Defines visual variants using class composition.
 */

import { cva } from "class-variance-authority"

export const radioGroupVariants = cva("grid gap-2", {
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
    "inline-flex size-4 shrink-0 items-center justify-center rounded-full border border-nx-border bg-nx-background text-nx-primary",
    "transition-colors duration-[var(--nx-duration-control)] ease-[var(--nx-easing-standard)]",
    "outline-none data-[checked]:border-nx-primary",
    "data-[focused]:ring-2 data-[focused]:ring-nx-ring data-[focused]:ring-offset-2 data-[focused]:ring-offset-nx-background",
    "data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50",
  ].join(" "),
  {
    variants: {
      size: {
        sm: "size-3.5",
        md: "size-4",
        lg: "size-5",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
)

export const radioGroupLabelVariants = cva(
  "inline-flex items-center gap-2 text-[length:var(--nx-typography-label-sm-font-size)] font-[var(--nx-typography-label-sm-font-weight)] leading-[var(--nx-typography-label-sm-line-height)] text-nx-foreground",
)
