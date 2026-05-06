/**
 * Badge.variants.ts
 *
 * Defines Badge visual variants using class composition.
 */

import { cva } from "class-variance-authority"

const neutralTone =
  "[--nx-badge-background:var(--nx-badge-neutral-background)] [--nx-badge-foreground:var(--nx-badge-neutral-foreground)] [--nx-badge-border-color:var(--nx-badge-neutral-border-color)]"

const primaryTone =
  "[--nx-badge-background:var(--nx-badge-primary-background)] [--nx-badge-foreground:var(--nx-badge-primary-foreground)] [--nx-badge-border-color:var(--nx-badge-primary-border-color)]"

const destructiveTone =
  "[--nx-badge-background:var(--nx-badge-destructive-background)] [--nx-badge-foreground:var(--nx-badge-destructive-foreground)] [--nx-badge-border-color:var(--nx-badge-destructive-border-color)]"

export const badgeVariants = cva(
  [
    "inline-flex items-center justify-center whitespace-nowrap border",
    "rounded-[var(--nx-badge-radius)] font-[var(--nx-badge-font-weight)] leading-none",
    "border-[var(--nx-badge-border-color)] bg-[var(--nx-badge-background)] text-[var(--nx-badge-foreground)]",
    "transition-colors duration-[var(--nx-badge-transition-duration)] ease-[var(--nx-badge-transition-easing)]",
  ].join(" "),
  {
    variants: {
      tone: {
        neutral: neutralTone,
        primary: primaryTone,
        destructive: destructiveTone,
      },
      variant: {
        solid: "",
        outline: "[--nx-badge-background:var(--nx-badge-outline-background)]",
      },
      size: {
        sm: "h-[var(--nx-badge-height-sm)] px-[var(--nx-badge-padding-x-sm)] text-[length:var(--nx-badge-font-size-sm)]",
        md: "h-[var(--nx-badge-height-md)] px-[var(--nx-badge-padding-x-md)] text-[length:var(--nx-badge-font-size-md)]",
      },
    },
    defaultVariants: {
      tone: "neutral",
      variant: "solid",
      size: "md",
    },
  },
)
