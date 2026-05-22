/**
 * Switch.variants.ts
 *
 * Defines visual variants using class composition.
 */

import { cva } from "class-variance-authority"

export const switchVariants = cva(
  [
    "inline-flex shrink-0 cursor-pointer items-center rounded-[var(--nx-switch-radius)] border border-transparent bg-[var(--nx-switch-background)] p-[var(--nx-switch-padding)]",
    "transition-colors duration-[var(--nx-switch-transition-duration)] ease-[var(--nx-switch-transition-easing)]",
    "outline-none data-[checked]:bg-[var(--nx-switch-checked-background)]",
    "data-[focused]:ring-[length:var(--nx-switch-focus-ring-width)] data-[focused]:ring-[var(--nx-switch-focus-ring-color)] data-[focused]:ring-offset-[length:var(--nx-switch-focus-ring-offset)] data-[focused]:ring-offset-[var(--nx-switch-focus-ring-offset-color)]",
    "data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50",
  ].join(" "),
  {
    variants: {
      size: {
        sm: "h-[var(--nx-switch-height-sm)] w-[var(--nx-switch-width-sm)]",
        md: "h-[var(--nx-switch-height-md)] w-[var(--nx-switch-width-md)]",
        lg: "h-[var(--nx-switch-height-lg)] w-[var(--nx-switch-width-lg)]",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
)

export const switchThumbVariants = cva(
  [
    "block rounded-[var(--nx-switch-thumb-radius)] bg-[var(--nx-switch-thumb-background)] shadow-sm ring-0",
    "transition-transform duration-[var(--nx-switch-transition-duration)] ease-[var(--nx-switch-transition-easing)]",
  ].join(" "),
  {
    variants: {
      size: {
        sm: "size-[var(--nx-switch-thumb-size-sm)] data-[checked]:translate-x-[var(--nx-switch-thumb-translate-sm)]",
        md: "size-[var(--nx-switch-thumb-size-md)] data-[checked]:translate-x-[var(--nx-switch-thumb-translate-md)]",
        lg: "size-[var(--nx-switch-thumb-size-lg)] data-[checked]:translate-x-[var(--nx-switch-thumb-translate-lg)]",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
)
