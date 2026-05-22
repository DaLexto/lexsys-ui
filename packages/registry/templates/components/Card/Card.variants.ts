/**
 * Card.variants.ts
 *
 * Defines Card visual slots using class composition.
 */

import { cva } from "class-variance-authority"

export const cardVariants = cva(
  [
    "rounded-(--nx-card-radius) border border-(--nx-card-border-color)",
    "bg-(--nx-card-background) text-(--nx-card-foreground) transition-colors",
    "duration-(--nx-card-transition-duration) ease-(--nx-card-transition-easing)",
  ].join(" "),
  {
    variants: {
      variant: {
        surface: "",
        muted: "bg-(--nx-card-muted-background)",
      },
    },
    defaultVariants: {
      variant: "surface",
    },
  },
)

export const cardHeaderClassName =
  "grid gap-(--nx-card-gap-sm) p-(--nx-card-padding) pb-(--nx-card-header-padding-bottom)"

export const cardTitleClassName =
  "text-(length:--nx-card-title-font-size) font-(--nx-card-title-font-weight) leading-(--nx-card-title-font-line-height) tracking-(--nx-card-title-font-letter-spacing) text-(--nx-card-title-foreground)"

export const cardDescriptionClassName =
  "text-(length:--nx-card-description-font-size) leading-(--nx-card-description-font-line-height) text-(--nx-card-description-foreground)"

export const cardContentClassName =
  "p-(--nx-card-padding) pt-0 text-(length:--nx-card-content-font-size) leading-(--nx-card-content-font-line-height)"

export const cardFooterClassName =
  "flex items-center gap-(--nx-card-gap-md) p-(--nx-card-padding) pt-0"
