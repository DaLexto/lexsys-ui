/**
 * Card.variants.ts
 *
 * Defines Card visual slots using class composition.
 */

import { cva } from "class-variance-authority"

export const cardVariants = cva(
  [
    "rounded-(--lex-card-radius) border border-(--lex-card-border-color)",
    "bg-(--lex-card-background) text-(--lex-card-foreground) transition-colors",
    "duration-(--lex-card-transition-duration) ease-(--lex-card-transition-easing)",
  ].join(" "),
  {
    variants: {
      variant: {
        surface: "",
        muted: "bg-(--lex-card-muted-background)",
        default: "",
        outlined: "border-(--lex-border-strong)",
        elevated:
          "border-transparent shadow-(--lex-elevation-shadow-raised-box-shadow)",
        ghost: "border-transparent bg-transparent shadow-none",
      },
    },
    defaultVariants: {
      variant: "surface",
    },
  },
)

export const cardHeaderClassName =
  "grid gap-(--lex-card-gap-sm) p-(--lex-card-padding) pb-(--lex-card-header-padding-bottom)"

export const cardTitleClassName =
  "text-(length:--lex-card-title-font-size) font-(--lex-card-title-font-weight) leading-(--lex-card-title-font-line-height) tracking-(--lex-card-title-font-letter-spacing) text-(--lex-card-title-foreground)"

export const cardDescriptionClassName =
  "text-(length:--lex-card-description-font-size) leading-(--lex-card-description-font-line-height) text-(--lex-card-description-foreground)"

export const cardContentClassName =
  "p-(--lex-card-padding) pt-(--lex-card-content-padding-top) text-(length:--lex-card-content-font-size) leading-(--lex-card-content-font-line-height)"

export const cardFooterClassName =
  "flex items-center gap-(--lex-card-gap-md) p-(--lex-card-padding) pt-(--lex-card-footer-padding-top)"
