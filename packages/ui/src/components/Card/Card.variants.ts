/**
 * Card.variants.ts
 *
 * Defines Card visual slots using class composition.
 */

import { cva } from "class-variance-authority"

export const cardVariants = cva(
  [
    "rounded-[var(--nx-card-radius)] border border-[var(--nx-card-border-color)]",
    "bg-[var(--nx-card-background)] text-[var(--nx-card-foreground)] transition-colors",
    "duration-[var(--nx-card-transition-duration)] ease-[var(--nx-card-transition-easing)]",
  ].join(" "),
  {
    variants: {
      variant: {
        surface: "",
        muted: "bg-[var(--nx-card-muted-background)]",
      },
    },
    defaultVariants: {
      variant: "surface",
    },
  },
)

export const cardHeaderClassName =
  "grid gap-[var(--nx-card-gap-sm)] p-[var(--nx-card-padding)] pb-[var(--nx-card-header-padding-bottom)]"

export const cardTitleClassName =
  "text-[length:var(--nx-card-title-font-size)] font-[var(--nx-card-title-font-weight)] leading-[var(--nx-card-title-font-line-height)] tracking-[var(--nx-card-title-font-letter-spacing)] text-[var(--nx-card-title-foreground)]"

export const cardDescriptionClassName =
  "text-[length:var(--nx-card-description-font-size)] leading-[var(--nx-card-description-font-line-height)] text-[var(--nx-card-description-foreground)]"

export const cardContentClassName =
  "p-[var(--nx-card-padding)] pt-0 text-[length:var(--nx-card-content-font-size)] leading-[var(--nx-card-content-font-line-height)]"

export const cardFooterClassName =
  "flex items-center gap-[var(--nx-card-gap-md)] p-[var(--nx-card-padding)] pt-0"
