/**
 * Switch.variants.ts
 *
 * Defines visual variants using class composition.
 */

import { cva } from "class-variance-authority"

export const switchVariants = cva(
  [
    "inline-flex shrink-0 cursor-pointer items-center rounded-(--nx-switch-radius) border border-transparent bg-(--nx-switch-background) p-(--nx-switch-padding)",
    "transition-colors duration-(--nx-switch-transition-duration) ease-(--nx-switch-transition-easing)",
    "outline-none data-[checked]:bg-(--nx-switch-checked-background)",
    "data-[focused]:ring-(length:--nx-switch-focus-ring-width) data-[focused]:ring-(--nx-switch-focus-ring-color) data-[focused]:ring-offset-(length:--nx-switch-focus-ring-offset) data-[focused]:ring-offset-(--nx-switch-focus-ring-offset-color)",
    "data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50",
  ].join(" "),
  {
    variants: {
      size: {
        sm: "h-(--nx-switch-height-sm) w-(--nx-switch-width-sm)",
        md: "h-(--nx-switch-height-md) w-(--nx-switch-width-md)",
        lg: "h-(--nx-switch-height-lg) w-(--nx-switch-width-lg)",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
)

export const switchThumbVariants = cva(
  [
    "block rounded-(--nx-switch-thumb-radius) bg-(--nx-switch-thumb-background) shadow-sm ring-0",
    "transition-transform duration-(--nx-switch-transition-duration) ease-(--nx-switch-transition-easing)",
  ].join(" "),
  {
    variants: {
      size: {
        sm: "size-(--nx-switch-thumb-size-sm) data-[checked]:translate-x-(--nx-switch-thumb-translate-sm)",
        md: "size-(--nx-switch-thumb-size-md) data-[checked]:translate-x-(--nx-switch-thumb-translate-md)",
        lg: "size-(--nx-switch-thumb-size-lg) data-[checked]:translate-x-(--nx-switch-thumb-translate-lg)",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
)
