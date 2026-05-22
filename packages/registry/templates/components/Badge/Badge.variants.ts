/**
 * Badge.variants.ts
 *
 * Defines Badge visual variants using class composition.
 */

import { cva } from "class-variance-authority"

const neutralTone =
  "(--nx-badge-background:--nx-badge-neutral-background) (--nx-badge-foreground:--nx-badge-neutral-foreground) (--nx-badge-border-color:--nx-badge-neutral-border-color)"

const primaryTone =
  "(--nx-badge-background:--nx-badge-primary-background) (--nx-badge-foreground:--nx-badge-primary-foreground) (--nx-badge-border-color:--nx-badge-primary-border-color)"

const destructiveTone =
  "(--nx-badge-background:--nx-badge-destructive-background) (--nx-badge-foreground:--nx-badge-destructive-foreground) (--nx-badge-border-color:--nx-badge-destructive-border-color)"

export const badgeVariants = cva(
  [
    "inline-flex items-center justify-center whitespace-nowrap border",
    "rounded-(--nx-badge-radius) font-(--nx-badge-font-weight) leading-none",
    "border-(--nx-badge-border-color) bg-(--nx-badge-background) text-(--nx-badge-foreground)",
    "transition-colors duration-(--nx-badge-transition-duration) ease-(--nx-badge-transition-easing)",
  ].join(" "),
  {
    variants: {
      tone: {
        neutral: neutralTone,
        primary: primaryTone,
        destructive: destructiveTone,
      },
      variant: {
        solid: "",
        outline: "(--nx-badge-background:--nx-badge-outline-background)",
      },
      size: {
        sm: "h-(--nx-badge-height-sm) px-(--nx-badge-padding-x-sm) text-(length:--nx-badge-font-size-sm)",
        md: "h-(--nx-badge-height-md) px-(--nx-badge-padding-x-md) text-(length:--nx-badge-font-size-md)",
      },
    },
    defaultVariants: {
      tone: "neutral",
      variant: "solid",
      size: "md",
    },
  },
)
