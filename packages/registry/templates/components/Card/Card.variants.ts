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
    "duration-[var(--nx-card-transition-duration)] ease-[var(--nx-easing-standard)]",
  ].join(" "),
  {
    variants: {
      variant: {
        surface: "",
        muted: "bg-nx-muted",
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
  "text-lg font-semibold leading-none tracking-normal text-nx-foreground"

export const cardDescriptionClassName =
  "text-sm leading-relaxed text-nx-muted-foreground"

export const cardContentClassName =
  "p-[var(--nx-card-padding)] pt-0 text-sm leading-relaxed"

export const cardFooterClassName =
  "flex items-center gap-[var(--nx-card-gap-md)] p-[var(--nx-card-padding)] pt-0"
