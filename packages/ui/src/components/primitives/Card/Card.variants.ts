/**
 * Card.variants.ts
 *
 * Defines Card visual slots using class composition.
 */

import { cva } from "class-variance-authority"

export const cardVariants = cva(
  [
    "rounded-(--lsys-card-radius) border border-(--lsys-card-border-color)",
    "bg-(--lsys-card-background) text-(--lsys-card-foreground) transition-colors",
    "duration-(--lsys-card-transition-duration) ease-(--lsys-card-transition-easing)",
  ].join(" "),
  {
    variants: {
      variant: {
        surface: "",
        muted: "bg-(--lsys-card-muted-background)",
      },
    },
    defaultVariants: {
      variant: "surface",
    },
  },
)

export const cardHeaderClassName =
  "grid gap-(--lsys-card-gap-sm) p-(--lsys-card-padding) pb-(--lsys-card-header-padding-bottom)"

export const cardTitleClassName =
  "text-(length:--lsys-card-title-font-size) font-(--lsys-card-title-font-weight) leading-(--lsys-card-title-font-line-height) tracking-(--lsys-card-title-font-letter-spacing) text-(--lsys-card-title-foreground)"

export const cardDescriptionClassName =
  "text-(length:--lsys-card-description-font-size) leading-(--lsys-card-description-font-line-height) text-(--lsys-card-description-foreground)"

export const cardContentClassName =
  "p-(--lsys-card-padding) pt-(--lsys-card-content-padding-top) text-(length:--lsys-card-content-font-size) leading-(--lsys-card-content-font-line-height)"

export const cardFooterClassName =
  "flex items-center gap-(--lsys-card-gap-md) p-(--lsys-card-padding) pt-(--lsys-card-footer-padding-top)"
