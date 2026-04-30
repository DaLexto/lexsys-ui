/**
 * Card.variants.ts
 *
 * Defines Card visual slots using class composition.
 */

import { cva } from "class-variance-authority"

export const cardVariants = cva(
  [
    "rounded-[var(--nx-radius-lg)] border border-nx-border",
    "text-nx-surface-foreground transition-colors",
    "duration-[var(--nx-duration-fast)] ease-[var(--nx-easing-standard)]",
  ].join(" "),
  {
    variants: {
      variant: {
        surface: "bg-nx-surface",
        muted: "bg-nx-muted",
      },
    },
    defaultVariants: {
      variant: "surface",
    },
  },
)

export const cardHeaderClassName =
  "grid gap-[var(--nx-space-1)] p-[var(--nx-space-6)] pb-[var(--nx-space-4)]"

export const cardTitleClassName =
  "text-lg font-semibold leading-none tracking-normal text-nx-foreground"

export const cardDescriptionClassName =
  "text-sm leading-relaxed text-nx-muted-foreground"

export const cardContentClassName =
  "p-[var(--nx-space-6)] pt-0 text-sm leading-relaxed"

export const cardFooterClassName =
  "flex items-center gap-[var(--nx-space-3)] p-[var(--nx-space-6)] pt-0"
