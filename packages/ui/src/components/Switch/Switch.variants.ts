/**
 * Switch.variants.ts
 *
 * Defines visual variants using class composition.
 */

import { cva } from "class-variance-authority"

export const switchVariants = cva(
  [
    "inline-flex shrink-0 cursor-pointer items-center rounded-full border border-transparent bg-nx-muted p-0.5",
    "transition-colors duration-[var(--nx-duration-control)] ease-[var(--nx-easing-standard)]",
    "outline-none data-[checked]:bg-nx-primary",
    "data-[focused]:ring-2 data-[focused]:ring-nx-ring data-[focused]:ring-offset-2 data-[focused]:ring-offset-nx-background",
    "data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50",
  ].join(" "),
  {
    variants: {
      size: {
        sm: "h-5 w-9",
        md: "h-6 w-11",
        lg: "h-7 w-13",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
)

export const switchThumbVariants = cva(
  [
    "block rounded-full bg-nx-background shadow-sm ring-0",
    "transition-transform duration-[var(--nx-duration-control)] ease-[var(--nx-easing-standard)]",
  ].join(" "),
  {
    variants: {
      size: {
        sm: "size-4 data-[checked]:translate-x-4",
        md: "size-5 data-[checked]:translate-x-5",
        lg: "size-6 data-[checked]:translate-x-6",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
)
