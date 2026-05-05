/**
 * Checkbox.variants.ts
 *
 * Defines visual variants using class composition.
 */

import { cva } from "class-variance-authority"

export const checkboxVariants = cva(
  [
    "inline-flex size-4 shrink-0 items-center justify-center rounded-[var(--nx-radius-sm)] border border-nx-border bg-nx-background text-nx-primary-foreground",
    "transition-colors duration-[var(--nx-duration-control)] ease-[var(--nx-easing-standard)]",
    "outline-none data-[checked]:border-nx-primary data-[checked]:bg-nx-primary",
    "data-[indeterminate]:border-nx-primary data-[indeterminate]:bg-nx-primary",
    "data-[focused]:ring-2 data-[focused]:ring-nx-ring data-[focused]:ring-offset-2 data-[focused]:ring-offset-nx-background",
    "data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50",
  ].join(" "),
  {
    variants: {
      size: {
        sm: "size-3.5 text-[10px]",
        md: "size-4 text-[11px]",
        lg: "size-5 text-xs",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
)

export const checkboxLabelVariants = cva(
  "inline-flex items-center gap-2 text-[length:var(--nx-typography-label-sm-font-size)] font-[var(--nx-typography-label-sm-font-weight)] leading-[var(--nx-typography-label-sm-line-height)] text-nx-foreground",
)
