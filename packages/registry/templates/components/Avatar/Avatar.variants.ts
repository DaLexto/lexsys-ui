/**
 * Avatar.variants.ts
 *
 * Defines visual variants using class composition.
 */

import { cva } from "class-variance-authority"

export const avatarVariants = cva(
  [
    "inline-flex shrink-0 items-center justify-center overflow-hidden border border-[var(--nx-avatar-border-color)]",
    "bg-[var(--nx-avatar-background)] text-[var(--nx-avatar-foreground)]",
    "font-[var(--nx-avatar-font-weight)] leading-none",
  ].join(" "),
  {
    variants: {
      size: {
        sm: "size-[var(--nx-avatar-size-sm)] text-[length:var(--nx-avatar-font-size-sm)]",
        md: "size-[var(--nx-avatar-size-md)] text-[length:var(--nx-avatar-font-size-md)]",
        lg: "size-[var(--nx-avatar-size-lg)] text-[length:var(--nx-avatar-font-size-lg)]",
      },
      shape: {
        circle: "rounded-[var(--nx-avatar-radius-circle)]",
        square: "rounded-[var(--nx-avatar-radius-square)]",
      },
    },
    defaultVariants: {
      size: "md",
      shape: "circle",
    },
  },
)

export const avatarImageVariants = cva(
  "size-full object-cover transition-opacity duration-[var(--nx-avatar-transition-duration)] ease-[var(--nx-avatar-transition-easing)] data-[starting-style]:opacity-0 data-[ending-style]:opacity-0",
)

export const avatarFallbackVariants = cva(
  "flex size-full items-center justify-center bg-[var(--nx-avatar-fallback-background)] text-[var(--nx-avatar-fallback-foreground)]",
)
