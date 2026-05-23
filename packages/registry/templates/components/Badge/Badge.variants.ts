/**
 * Badge.variants.ts
 *
 * Defines Badge visual variants using class composition.
 */

import { cva } from "class-variance-authority"

export const badgeVariants = cva(
  [
    "inline-flex items-center justify-center whitespace-nowrap border",
    "rounded-(--nx-badge-radius) font-(--nx-badge-font-weight) leading-none",
    "transition-colors duration-(--nx-badge-transition-duration) ease-(--nx-badge-transition-easing)",
  ].join(" "),
  {
    variants: {
      tone: {
        neutral: "",
        primary: "",
        destructive: "",
      },
      variant: {
        solid: "",
        outline: "",
      },
      size: {
        sm: "h-(--nx-badge-height-sm) px-(--nx-badge-padding-x-sm) text-(length:--nx-badge-font-size-sm)",
        md: "h-(--nx-badge-height-md) px-(--nx-badge-padding-x-md) text-(length:--nx-badge-font-size-md)",
      },
    },
    compoundVariants: [
      {
        tone: "neutral",
        variant: "solid",
        class:
          "border-(--nx-badge-neutral-border-color) bg-(--nx-badge-neutral-background) text-(--nx-badge-neutral-foreground)",
      },
      {
        tone: "neutral",
        variant: "outline",
        class:
          "border-(--nx-badge-neutral-border-color) bg-(--nx-badge-outline-background) text-(--nx-badge-neutral-foreground)",
      },
      {
        tone: "primary",
        variant: "solid",
        class:
          "border-(--nx-badge-primary-border-color) bg-(--nx-badge-primary-background) text-(--nx-badge-primary-foreground)",
      },
      {
        tone: "primary",
        variant: "outline",
        class:
          "border-(--nx-badge-primary-border-color) bg-(--nx-badge-outline-background) text-(--nx-badge-primary-border-color)",
      },
      {
        tone: "destructive",
        variant: "solid",
        class:
          "border-(--nx-badge-destructive-border-color) bg-(--nx-badge-destructive-background) text-(--nx-badge-destructive-foreground)",
      },
      {
        tone: "destructive",
        variant: "outline",
        class:
          "border-(--nx-badge-destructive-border-color) bg-(--nx-badge-outline-background) text-(--nx-badge-destructive-border-color)",
      },
    ],
    defaultVariants: {
      tone: "neutral",
      variant: "solid",
      size: "md",
    },
  },
)
