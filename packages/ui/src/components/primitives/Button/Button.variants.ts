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
    "rounded-(--lex-button-radius) font-(family-name:--lex-button-font-family) font-(--lex-button-font-weight)",
    "transition-colors duration-(--lex-button-transition-duration) ease-(--lex-button-transition-easing)",
    "outline-none focus-visible:ring-(length:--lex-button-focus-ring-width) focus-visible:ring-(--lex-button-focus-ring-color) focus-visible:ring-offset-(length:--lex-button-focus-ring-offset) focus-visible:ring-offset-(--lex-button-focus-ring-offset-color)",
    disabledStateClasses,
    busyStateClasses,
    "text-(length:--lex-button-font-size-md)",
    "leading-(--lex-button-font-line-height)",
    "tracking-(--lex-button-font-letter-spacing)",
  ].join(" "),
  {
    variants: {
      variant: {
        primary:
          "border-(--lex-button-primary-border-color) bg-(--lex-button-primary-background) text-(--lex-button-primary-foreground) hover:bg-(--lex-button-primary-hover-background)",
        secondary:
          "border-(--lex-button-secondary-border-color) bg-(--lex-button-secondary-background) text-(--lex-button-secondary-foreground) hover:bg-(--lex-button-secondary-hover-background)",
        ghost:
          "border-transparent bg-transparent text-(--lex-button-secondary-foreground) hover:bg-(--lex-button-secondary-hover-background)",
        outline:
          "border-(--lex-button-secondary-border-color) bg-transparent text-(--lex-button-secondary-foreground) hover:bg-(--lex-button-secondary-hover-background)",
        danger:
          "border-(--lex-button-danger-border-color) bg-(--lex-button-danger-background) text-(--lex-button-danger-foreground) hover:bg-(--lex-button-danger-hover-background)",
      },
      size: {
        xs: [
          "h-(--lex-button-height-xs)",
          "px-(--lex-button-padding-x-xs)",
          "text-(length:--lex-button-font-size-xs)",
        ],
        sm: [
          "h-(--lex-button-height-sm)",
          "px-(--lex-button-padding-x-sm)",
          "text-(length:--lex-button-font-size-sm)",
        ],
        md: [
          "h-(--lex-button-height-md)",
          "px-(--lex-button-padding-x-md)",
          "text-(length:--lex-button-font-size-md)",
        ],
        lg: [
          "h-(--lex-button-height-lg)",
          "px-(--lex-button-padding-x-lg)",
          "text-(length:--lex-button-font-size-lg)",
        ],
        xl: [
          "h-(--lex-button-height-xl)",
          "px-(--lex-button-padding-x-xl)",
          "text-(length:--lex-button-font-size-xl)",
        ],
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
)
