/**
 * Switch.variants.ts
 *
 * Defines visual variants using class composition.
 */

import { cva } from "class-variance-authority"

export const switchVariants = cva(
  [
    "inline-flex shrink-0 cursor-pointer items-center rounded-(--lsys-switch-radius) border border-transparent bg-(--lsys-switch-background) p-(--lsys-switch-padding)",
    "transition-colors duration-(--lsys-switch-transition-duration) ease-(--lsys-switch-transition-easing)",
    "outline-none data-[checked]:bg-(--lsys-switch-checked-background)",
    "data-[focused]:ring-(length:--lsys-switch-focus-ring-width) data-[focused]:ring-(--lsys-switch-focus-ring-color) data-[focused]:ring-offset-(length:--lsys-switch-focus-ring-offset) data-[focused]:ring-offset-(--lsys-switch-focus-ring-offset-color)",
    "data-[disabled]:cursor-not-allowed data-[disabled]:opacity-(--lsys-opacity-disabled)",
  ].join(" "),
  {
    variants: {
      size: {
        sm: "h-(--lsys-switch-height-sm) w-(--lsys-switch-width-sm)",
        md: "h-(--lsys-switch-height-md) w-(--lsys-switch-width-md)",
        lg: "h-(--lsys-switch-height-lg) w-(--lsys-switch-width-lg)",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
)

export const switchThumbVariants = cva(
  [
    "block rounded-(--lsys-switch-thumb-radius) bg-(--lsys-switch-thumb-background) shadow-sm ring-0",
    "transition-transform duration-(--lsys-switch-transition-duration) ease-(--lsys-switch-transition-easing)",
  ].join(" "),
  {
    variants: {
      size: {
        sm: "size-(--lsys-switch-thumb-size-sm) data-[checked]:translate-x-(--lsys-switch-thumb-translate-sm)",
        md: "size-(--lsys-switch-thumb-size-md) data-[checked]:translate-x-(--lsys-switch-thumb-translate-md)",
        lg: "size-(--lsys-switch-thumb-size-lg) data-[checked]:translate-x-(--lsys-switch-thumb-translate-lg)",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
)
