/**
 * Badge.variants.ts
 *
 * Defines Badge visual variants using class composition.
 */

import { cva } from "class-variance-authority"

const neutralSolid =
  "border-(--lex-badge-neutral-border-color) bg-(--lex-badge-neutral-background) text-(--lex-badge-neutral-foreground)"

const neutralOutline =
  "border-(--lex-badge-neutral-border-color) bg-(--lex-badge-outline-background) text-(--lex-badge-neutral-foreground)"

const primarySolid =
  "border-(--lex-badge-primary-border-color) bg-(--lex-badge-primary-background) text-(--lex-badge-primary-foreground)"

const primaryOutline =
  "border-(--lex-badge-primary-border-color) bg-(--lex-badge-outline-background) text-(--lex-badge-primary-border-color)"

const dangerSolid =
  "border-(--lex-badge-danger-border-color) bg-(--lex-badge-danger-background) text-(--lex-badge-danger-foreground)"

const dangerOutline =
  "border-(--lex-badge-danger-border-color) bg-(--lex-badge-outline-background) text-(--lex-badge-danger-border-color)"

const successSolid =
  "border-(--lex-color-feedback-success-foreground) bg-(--lex-color-feedback-success-background) text-(--lex-color-feedback-success-foreground)"

const successOutline =
  "border-(--lex-color-feedback-success-foreground) bg-(--lex-badge-outline-background) text-(--lex-color-feedback-success-foreground)"

const warningSolid =
  "border-(--lex-color-feedback-warning-foreground) bg-(--lex-color-feedback-warning-background) text-(--lex-color-feedback-warning-foreground)"

const warningOutline =
  "border-(--lex-color-feedback-warning-foreground) bg-(--lex-badge-outline-background) text-(--lex-color-feedback-warning-foreground)"

export const badgeVariants = cva(
  [
    "inline-flex items-center justify-center whitespace-nowrap border",
    "rounded-(--lex-badge-radius) font-(--lex-badge-font-weight) leading-(--lex-badge-font-line-height)",
    "transition-colors duration-(--lex-badge-transition-duration) ease-(--lex-badge-transition-easing)",
  ].join(" "),
  {
    variants: {
      variant: {
        neutral: "",
        primary: "",
        success: "",
        warning: "",
        danger: "",
      },
      appearance: {
        solid: "",
        outline: "",
      },
      size: {
        sm: "h-(--lex-badge-height-sm) px-(--lex-badge-padding-x-sm) text-(length:--lex-badge-font-size-sm)",
        md: "h-(--lex-badge-height-md) px-(--lex-badge-padding-x-md) text-(length:--lex-badge-font-size-md)",
      },
    },
    compoundVariants: [
      { variant: "neutral", appearance: "solid", class: neutralSolid },
      { variant: "neutral", appearance: "outline", class: neutralOutline },
      { variant: "primary", appearance: "solid", class: primarySolid },
      { variant: "primary", appearance: "outline", class: primaryOutline },
      { variant: "success", appearance: "solid", class: successSolid },
      { variant: "success", appearance: "outline", class: successOutline },
      { variant: "warning", appearance: "solid", class: warningSolid },
      { variant: "warning", appearance: "outline", class: warningOutline },
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
