/**
 * Badge.variants.ts
 *
 * Defines Badge visual variants using class composition.
 */

import { cva } from "class-variance-authority"

const neutralSolid =
  "border-(--nx-badge-neutral-border-color) bg-(--nx-badge-neutral-background) text-(--nx-badge-neutral-foreground)"

const neutralOutline =
  "border-(--nx-badge-neutral-border-color) bg-(--nx-badge-outline-background) text-(--nx-badge-neutral-foreground)"

const primarySolid =
  "border-(--nx-badge-primary-border-color) bg-(--nx-badge-primary-background) text-(--nx-badge-primary-foreground)"

const primaryOutline =
  "border-(--nx-badge-primary-border-color) bg-(--nx-badge-outline-background) text-(--nx-badge-primary-border-color)"

const dangerSolid =
  "border-(--nx-badge-danger-border-color) bg-(--nx-badge-danger-background) text-(--nx-badge-danger-foreground)"

const dangerOutline =
  "border-(--nx-badge-danger-border-color) bg-(--nx-badge-outline-background) text-(--nx-badge-danger-border-color)"

export const badgeVariants = cva(
  [
    "inline-flex items-center justify-center whitespace-nowrap border",
    "rounded-(--nx-badge-radius) font-(--nx-badge-font-weight) leading-(--nx-badge-font-line-height)",
    "transition-colors duration-(--nx-badge-transition-duration) ease-(--nx-badge-transition-easing)",
  ].join(" "),
  {
    variants: {
      variant: {
        neutral: "",
        primary: "",
        danger: "",
      },
      appearance: {
        solid: "",
        outline: "",
      },
      size: {
        sm: "h-(--nx-badge-height-sm) px-(--nx-badge-padding-x-sm) text-(length:--nx-badge-font-size-sm)",
        md: "h-(--nx-badge-height-md) px-(--nx-badge-padding-x-md) text-(length:--nx-badge-font-size-md)",
      },
    },
    compoundVariants: [
      { variant: "neutral", appearance: "solid", class: neutralSolid },
      { variant: "neutral", appearance: "outline", class: neutralOutline },
      { variant: "primary", appearance: "solid", class: primarySolid },
      { variant: "primary", appearance: "outline", class: primaryOutline },
      { variant: "danger", appearance: "solid", class: dangerSolid },
      { variant: "danger", appearance: "outline", class: dangerOutline },
    ],
    defaultVariants: {
      variant: "neutral",
      appearance: "solid",
      size: "md",
    },
  },
)
