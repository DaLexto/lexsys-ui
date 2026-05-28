/**
 * Alert.variants.ts
 *
 * Defines Alert visual slots using class composition.
 */

import { cva } from "class-variance-authority"

const neutralVariant =
  "border-(--lex-alert-neutral-border-color) bg-(--lex-alert-neutral-background) text-(--lex-alert-neutral-foreground)"

const primaryVariant =
  "border-(--lex-alert-primary-border-color) bg-(--lex-alert-primary-background) text-(--lex-alert-primary-foreground)"

const dangerVariant =
  "border-(--lex-alert-danger-border-color) bg-(--lex-alert-danger-background) text-(--lex-alert-danger-foreground)"

export const alertVariants = cva(
  [
    "grid gap-(--lex-alert-gap) rounded-(--lex-alert-radius) border p-(--lex-alert-padding)",
    "transition-colors duration-(--lex-alert-transition-duration) ease-(--lex-alert-transition-easing)",
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
  "text-(length:--lex-alert-title-font-size) font-(--lex-alert-title-font-weight) leading-(--lex-alert-title-font-line-height)"

export const alertDescriptionClassName =
  "text-(length:--lex-alert-description-font-size) leading-(--lex-alert-description-font-line-height) text-(--lex-alert-description-foreground)"
