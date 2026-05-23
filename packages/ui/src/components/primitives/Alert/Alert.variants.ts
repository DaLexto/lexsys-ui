/**
 * Alert.variants.ts
 *
 * Defines Alert visual slots using class composition.
 */

import { cva } from "class-variance-authority"

const neutralVariant =
  "border-(--nx-alert-neutral-border-color) bg-(--nx-alert-neutral-background) text-(--nx-alert-neutral-foreground)"

const primaryVariant =
  "border-(--nx-alert-primary-border-color) bg-(--nx-alert-primary-background) text-(--nx-alert-primary-foreground)"

const dangerVariant =
  "border-(--nx-alert-danger-border-color) bg-(--nx-alert-danger-background) text-(--nx-alert-danger-foreground)"

export const alertVariants = cva(
  [
    "grid gap-(--nx-alert-gap) rounded-(--nx-alert-radius) border p-(--nx-alert-padding)",
    "transition-colors duration-(--nx-alert-transition-duration) ease-(--nx-alert-transition-easing)",
  ].join(" "),
  {
    variants: {
      variant: {
        neutral: neutralVariant,
        primary: primaryVariant,
        danger: dangerVariant,
      },
    },
    defaultVariants: {
      variant: "neutral",
    },
  },
)

export const alertTitleClassName =
  "text-(length:--nx-alert-title-font-size) font-(--nx-alert-title-font-weight) leading-(--nx-alert-title-font-line-height)"

export const alertDescriptionClassName =
  "text-(length:--nx-alert-description-font-size) leading-(--nx-alert-description-font-line-height) text-(--nx-alert-description-foreground)"
