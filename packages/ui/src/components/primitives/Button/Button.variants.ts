/**
 * Button.variants.ts
 *
 * Defines visual variants using class composition.
 */

import { cva } from "class-variance-authority"
import { busyStateClasses, disabledStateClasses } from "../../../utils/cn"

export const buttonVariants = cva(
  [
    "inline-flex items-center justify-center whitespace-nowrap border border-transparent",
    "rounded-(--lsys-button-radius) font-(family-name:--lsys-button-font-family) font-(--lsys-button-font-weight)",
    "transition-colors duration-(--lsys-button-transition-duration) ease-(--lsys-button-transition-easing)",
    "outline-none focus-visible:ring-(length:--lsys-button-focus-ring-width) focus-visible:ring-(--lsys-button-focus-ring-color) focus-visible:ring-offset-(length:--lsys-button-focus-ring-offset) focus-visible:ring-offset-(--lsys-button-focus-ring-offset-color)",
    disabledStateClasses,
    busyStateClasses,
    "text-(length:--lsys-button-font-size-md)",
    "leading-(--lsys-button-font-line-height)",
    "tracking-(--lsys-button-font-letter-spacing)",
  ].join(" "),
  {
    variants: {
      variant: {
        primary:
          "border-(--lsys-button-primary-border-color) bg-(--lsys-button-primary-background) text-(--lsys-button-primary-foreground) hover:bg-(--lsys-button-primary-hover-background)",
        secondary:
          "border-(--lsys-button-secondary-border-color) bg-(--lsys-button-secondary-background) text-(--lsys-button-secondary-foreground) hover:bg-(--lsys-button-secondary-hover-background)",
        ghost:
          "border-transparent bg-transparent text-(--lsys-button-secondary-foreground) hover:bg-(--lsys-button-secondary-hover-background)",
        outline:
          "border-(--lsys-button-secondary-border-color) bg-transparent text-(--lsys-button-secondary-foreground) hover:bg-(--lsys-button-secondary-hover-background)",
        danger:
          "border-(--lsys-button-danger-border-color) bg-(--lsys-button-danger-background) text-(--lsys-button-danger-foreground) hover:bg-(--lsys-button-danger-hover-background)",
      },
      size: {
        xs: [
          "h-(--lsys-button-height-xs)",
          "px-(--lsys-button-padding-x-xs)",
          "text-(length:--lsys-button-font-size-xs)",
        ],
        sm: [
          "h-(--lsys-button-height-sm)",
          "px-(--lsys-button-padding-x-sm)",
          "text-(length:--lsys-button-font-size-sm)",
        ],
        md: [
          "h-(--lsys-button-height-md)",
          "px-(--lsys-button-padding-x-md)",
          "text-(length:--lsys-button-font-size-md)",
        ],
        lg: [
          "h-(--lsys-button-height-lg)",
          "px-(--lsys-button-padding-x-lg)",
          "text-(length:--lsys-button-font-size-lg)",
        ],
        xl: [
          "h-(--lsys-button-height-xl)",
          "px-(--lsys-button-padding-x-xl)",
          "text-(length:--lsys-button-font-size-xl)",
        ],
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
)
