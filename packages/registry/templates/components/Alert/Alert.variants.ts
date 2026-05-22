/**
 * Alert.variants.ts
 *
 * Defines Alert visual slots using class composition.
 */

import { cva } from "class-variance-authority"

const neutralTone =
  "border-(--nx-alert-neutral-border-color) bg-(--nx-alert-neutral-background) text-(--nx-alert-neutral-foreground)"

const primaryTone =
  "border-(--nx-alert-primary-border-color) bg-(--nx-alert-primary-background) text-(--nx-alert-primary-foreground)"

const destructiveTone =
  "border-(--nx-alert-destructive-border-color) bg-(--nx-alert-destructive-background) text-(--nx-alert-destructive-foreground)"

export const alertVariants = cva(
  [
    "grid gap-(--nx-alert-gap) rounded-(--nx-alert-radius) border p-(--nx-alert-padding)",
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
