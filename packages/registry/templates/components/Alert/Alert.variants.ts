/**
 * Alert.variants.ts
 *
 * Defines Alert visual slots using class composition.
 */

import { cva } from "class-variance-authority"

const neutralTone =
  "[--nx-alert-background:var(--nx-alert-neutral-background)] [--nx-alert-foreground:var(--nx-alert-neutral-foreground)] [--nx-alert-border-color:var(--nx-alert-neutral-border-color)]"

const primaryTone =
  "[--nx-alert-background:var(--nx-alert-primary-background)] [--nx-alert-foreground:var(--nx-alert-primary-foreground)] [--nx-alert-border-color:var(--nx-alert-primary-border-color)]"

const destructiveTone =
  "[--nx-alert-background:var(--nx-alert-destructive-background)] [--nx-alert-foreground:var(--nx-alert-destructive-foreground)] [--nx-alert-border-color:var(--nx-alert-destructive-border-color)]"

export const alertVariants = cva(
  [
    "grid gap-[var(--nx-alert-gap)] rounded-[var(--nx-alert-radius)] border p-[var(--nx-alert-padding)]",
    "border-[var(--nx-alert-border-color)] bg-[var(--nx-alert-background)] text-[var(--nx-alert-foreground)]",
    "transition-colors duration-[var(--nx-alert-transition-duration)] ease-[var(--nx-alert-transition-easing)]",
  ].join(" "),
  {
    variants: {
      tone: {
        neutral: neutralTone,
        primary: primaryTone,
        destructive: destructiveTone,
      },
    },
    defaultVariants: {
      tone: "neutral",
    },
  },
)

export const alertTitleClassName =
  "text-[length:var(--nx-alert-title-font-size)] font-[var(--nx-alert-title-font-weight)] leading-[var(--nx-alert-title-font-line-height)]"

export const alertDescriptionClassName =
  "text-[length:var(--nx-alert-description-font-size)] leading-[var(--nx-alert-description-font-line-height)] text-[var(--nx-alert-description-foreground)]"
