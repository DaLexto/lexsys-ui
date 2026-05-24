/**
 * Alert.variants.ts
 *
 * Defines Alert visual slots using class composition.
 */

import { cva } from "class-variance-authority"

const neutralVariant =
  "border-(--lsys-alert-neutral-border-color) bg-(--lsys-alert-neutral-background) text-(--lsys-alert-neutral-foreground)"

const primaryVariant =
  "border-(--lsys-alert-primary-border-color) bg-(--lsys-alert-primary-background) text-(--lsys-alert-primary-foreground)"

const dangerVariant =
  "border-(--lsys-alert-danger-border-color) bg-(--lsys-alert-danger-background) text-(--lsys-alert-danger-foreground)"

export const alertVariants = cva(
  [
    "grid gap-(--lsys-alert-gap) rounded-(--lsys-alert-radius) border p-(--lsys-alert-padding)",
    "transition-colors duration-(--lsys-alert-transition-duration) ease-(--lsys-alert-transition-easing)",
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
  "text-(length:--lsys-alert-title-font-size) font-(--lsys-alert-title-font-weight) leading-(--lsys-alert-title-font-line-height)"

export const alertDescriptionClassName =
  "text-(length:--lsys-alert-description-font-size) leading-(--lsys-alert-description-font-line-height) text-(--lsys-alert-description-foreground)"
