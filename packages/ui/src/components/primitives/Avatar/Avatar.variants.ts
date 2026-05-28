/**
 * Avatar.variants.ts
 *
 * Defines visual variants using class composition.
 */

import { cva } from "class-variance-authority"

export const avatarVariants = cva(
  [
    "inline-flex shrink-0 items-center justify-center overflow-hidden border border-(--lex-avatar-border-color)",
    "bg-(--lex-avatar-background) text-(--lex-avatar-foreground)",
    "font-(--lex-avatar-font-weight) leading-(--lex-avatar-font-line-height)",
  ].join(" "),
  {
    variants: {
      size: {
        sm: "size-(--lex-avatar-size-sm) text-(length:--lex-avatar-font-size-sm)",
        md: "size-(--lex-avatar-size-md) text-(length:--lex-avatar-font-size-md)",
        lg: "size-(--lex-avatar-size-lg) text-(length:--lex-avatar-font-size-lg)",
      },
      shape: {
        circle: "rounded-(--lex-avatar-radius-circle)",
        square: "rounded-(--lex-avatar-radius-square)",
      },
    },
    defaultVariants: {
      size: "md",
      shape: "circle",
    },
  },
)

export const avatarImageVariants = cva(
  "size-full object-cover transition-opacity duration-(--lex-avatar-transition-duration) ease-(--lex-avatar-transition-easing) data-[starting-style]:opacity-0 data-[ending-style]:opacity-0",
)

export const avatarFallbackVariants = cva(
  "flex size-full items-center justify-center bg-(--lex-avatar-fallback-background) text-(--lex-avatar-fallback-foreground)",
)
