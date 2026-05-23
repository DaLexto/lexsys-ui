/**
 * Avatar.variants.ts
 *
 * Defines visual variants using class composition.
 */

import { cva } from "class-variance-authority"

export const avatarVariants = cva(
  [
    "inline-flex shrink-0 items-center justify-center overflow-hidden border border-(--nx-avatar-border-color)",
    "bg-(--nx-avatar-background) text-(--nx-avatar-foreground)",
    "font-(--nx-avatar-font-weight) leading-(--nx-avatar-font-line-height)",
  ].join(" "),
  {
    variants: {
      size: {
        sm: "size-(--nx-avatar-size-sm) text-(length:--nx-avatar-font-size-sm)",
        md: "size-(--nx-avatar-size-md) text-(length:--nx-avatar-font-size-md)",
        lg: "size-(--nx-avatar-size-lg) text-(length:--nx-avatar-font-size-lg)",
      },
      shape: {
        circle: "rounded-(--nx-avatar-radius-circle)",
        square: "rounded-(--nx-avatar-radius-square)",
      },
    },
    defaultVariants: {
      size: "md",
      shape: "circle",
    },
  },
)

export const avatarImageVariants = cva(
  "size-full object-cover transition-opacity duration-(--nx-avatar-transition-duration) ease-(--nx-avatar-transition-easing) data-[starting-style]:opacity-0 data-[ending-style]:opacity-0",
)

export const avatarFallbackVariants = cva(
  "flex size-full items-center justify-center bg-(--nx-avatar-fallback-background) text-(--nx-avatar-fallback-foreground)",
)
