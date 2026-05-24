/**
 * Badge.variants.ts
 *
 * Defines Badge visual variants using class composition.
 */

import { cva } from "class-variance-authority"

const neutralSolid =
  "border-(--lsys-badge-neutral-border-color) bg-(--lsys-badge-neutral-background) text-(--lsys-badge-neutral-foreground)"

const neutralOutline =
  "border-(--lsys-badge-neutral-border-color) bg-(--lsys-badge-outline-background) text-(--lsys-badge-neutral-foreground)"

const primarySolid =
  "border-(--lsys-badge-primary-border-color) bg-(--lsys-badge-primary-background) text-(--lsys-badge-primary-foreground)"

const primaryOutline =
  "border-(--lsys-badge-primary-border-color) bg-(--lsys-badge-outline-background) text-(--lsys-badge-primary-border-color)"

const dangerSolid =
  "border-(--lsys-badge-danger-border-color) bg-(--lsys-badge-danger-background) text-(--lsys-badge-danger-foreground)"

const dangerOutline =
  "border-(--lsys-badge-danger-border-color) bg-(--lsys-badge-outline-background) text-(--lsys-badge-danger-border-color)"

const successSolid =
  "border-(--lsys-color-feedback-success-foreground) bg-(--lsys-color-feedback-success-background) text-(--lsys-color-feedback-success-foreground)"

const successOutline =
  "border-(--lsys-color-feedback-success-foreground) bg-(--lsys-badge-outline-background) text-(--lsys-color-feedback-success-foreground)"

const warningSolid =
  "border-(--lsys-color-feedback-warning-foreground) bg-(--lsys-color-feedback-warning-background) text-(--lsys-color-feedback-warning-foreground)"

const warningOutline =
  "border-(--lsys-color-feedback-warning-foreground) bg-(--lsys-badge-outline-background) text-(--lsys-color-feedback-warning-foreground)"

export const badgeVariants = cva(
  [
    "inline-flex items-center justify-center whitespace-nowrap border",
    "rounded-(--lsys-badge-radius) font-(--lsys-badge-font-weight) leading-(--lsys-badge-font-line-height)",
    "transition-colors duration-(--lsys-badge-transition-duration) ease-(--lsys-badge-transition-easing)",
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
        sm: "h-(--lsys-badge-height-sm) px-(--lsys-badge-padding-x-sm) text-(length:--lsys-badge-font-size-sm)",
        md: "h-(--lsys-badge-height-md) px-(--lsys-badge-padding-x-md) text-(length:--lsys-badge-font-size-md)",
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
