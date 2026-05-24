/**
 * Avatar.variants.ts
 *
 * Defines visual variants using class composition.
 */

import { cva } from "class-variance-authority"

export const avatarVariants = cva(
  [
    "inline-flex shrink-0 items-center justify-center overflow-hidden border border-(--lsys-avatar-border-color)",
    "bg-(--lsys-avatar-background) text-(--lsys-avatar-foreground)",
    "font-(--lsys-avatar-font-weight) leading-(--lsys-avatar-font-line-height)",
  ].join(" "),
  {
    variants: {
      size: {
        sm: "size-(--lsys-avatar-size-sm) text-(length:--lsys-avatar-font-size-sm)",
        md: "size-(--lsys-avatar-size-md) text-(length:--lsys-avatar-font-size-md)",
        lg: "size-(--lsys-avatar-size-lg) text-(length:--lsys-avatar-font-size-lg)",
      },
      shape: {
        circle: "rounded-(--lsys-avatar-radius-circle)",
        square: "rounded-(--lsys-avatar-radius-square)",
      },
    },
    defaultVariants: {
      size: "md",
      shape: "circle",
    },
  },
)

export const avatarImageVariants = cva(
  "size-full object-cover transition-opacity duration-(--lsys-avatar-transition-duration) ease-(--lsys-avatar-transition-easing) data-[starting-style]:opacity-0 data-[ending-style]:opacity-0",
)

export const avatarFallbackVariants = cva(
  "flex size-full items-center justify-center bg-(--lsys-avatar-fallback-background) text-(--lsys-avatar-fallback-foreground)",
)
