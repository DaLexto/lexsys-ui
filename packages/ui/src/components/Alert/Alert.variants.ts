/**
 * Alert.variants.ts
 *
 * Defines Alert visual slots using class composition.
 */

import { cva } from "class-variance-authority"

const neutralTone =
  "(--nx-alert-background:--nx-alert-neutral-background) (--nx-alert-foreground:--nx-alert-neutral-foreground) (--nx-alert-border-color:--nx-alert-neutral-border-color)"

const primaryTone =
  "(--nx-alert-background:--nx-alert-primary-background) (--nx-alert-foreground:--nx-alert-primary-foreground) (--nx-alert-border-color:--nx-alert-primary-border-color)"

const destructiveTone =
  "(--nx-alert-background:--nx-alert-destructive-background) (--nx-alert-foreground:--nx-alert-destructive-foreground) (--nx-alert-border-color:--nx-alert-destructive-border-color)"

export const alertVariants = cva(
  [
    "grid gap-(--nx-alert-gap) rounded-(--nx-alert-radius) border p-(--nx-alert-padding)",
    "border-(--nx-alert-border-color) bg-(--nx-alert-background) text-(--nx-alert-foreground)",
    "transition-colors duration-(--nx-alert-transition-duration) ease-(--nx-alert-transition-easing)",
  ].join(" "),
  {
    variants: {
      tone: {
        neutral: neutralTone,
        primary: primaryTone,
        destructive: destructiveTone,
      },
    },
    defaultVariants: {
      tone: "neutral",
    },
  },
)

export const alertTitleClassName =
  "text-(length:--nx-alert-title-font-size) font-(--nx-alert-title-font-weight) leading-(--nx-alert-title-font-line-height)"

export const alertDescriptionClassName =
  "text-(length:--nx-alert-description-font-size) leading-(--nx-alert-description-font-line-height) text-(--nx-alert-description-foreground)"
