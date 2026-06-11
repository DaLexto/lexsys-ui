/**
 * Badge.variants.ts
 *
 * Defines Badge visual variants using class composition.
 */

import { cva } from "class-variance-authority";

// --- solid ---
const neutralSolid =
  "border-(--lex-badge-neutral-border-color) bg-(--lex-badge-neutral-background) text-(--lex-badge-neutral-foreground)";

const primarySolid =
  "border-(--lex-badge-primary-border-color) bg-(--lex-badge-primary-background) text-(--lex-badge-primary-foreground)";

const successSolid =
  "border-(--lex-color-feedback-success-foreground) bg-(--lex-color-feedback-success-background) text-(--lex-color-feedback-success-foreground)";

const warningSolid =
  "border-(--lex-color-feedback-warning-foreground) bg-(--lex-color-feedback-warning-background) text-(--lex-color-feedback-warning-foreground)";

const dangerSolid =
  "border-(--lex-badge-danger-border-color) bg-(--lex-badge-danger-background) text-(--lex-badge-danger-foreground)";

// --- subtle ---
const neutralSubtle =
  "border-transparent bg-(--lex-badge-neutral-subtle-background) text-(--lex-badge-neutral-subtle-foreground)";

const primarySubtle =
  "border-transparent bg-(--lex-badge-primary-subtle-background) text-(--lex-badge-primary-subtle-foreground)";

const successSubtle =
  "border-transparent bg-(--lex-color-feedback-success-background) text-(--lex-color-feedback-success-foreground)";

const warningSubtle =
  "border-transparent bg-(--lex-color-feedback-warning-background) text-(--lex-color-feedback-warning-foreground)";

const dangerSubtle =
  "border-transparent bg-(--lex-color-feedback-danger-background) text-(--lex-color-feedback-danger-foreground)";

// --- outline ---
const neutralOutline =
  "border-(--lex-badge-neutral-border-color) bg-(--lex-badge-outline-background) text-(--lex-badge-neutral-foreground)";

const primaryOutline =
  "border-(--lex-badge-primary-border-color) bg-(--lex-badge-outline-background) text-(--lex-badge-primary-border-color)";

const successOutline =
  "border-(--lex-color-feedback-success-foreground) bg-(--lex-badge-outline-background) text-(--lex-color-feedback-success-foreground)";

const warningOutline =
  "border-(--lex-color-feedback-warning-foreground) bg-(--lex-badge-outline-background) text-(--lex-color-feedback-warning-foreground)";

const dangerOutline =
  "border-(--lex-badge-danger-border-color) bg-(--lex-badge-outline-background) text-(--lex-badge-danger-border-color)";

// --- ghost ---
const neutralGhost =
  "border-transparent bg-transparent text-(--lex-badge-neutral-ghost-foreground)";

const primaryGhost =
  "border-transparent bg-transparent text-(--lex-badge-primary-ghost-foreground)";

const successGhost =
  "border-transparent bg-transparent text-(--lex-color-feedback-success-foreground)";

const warningGhost =
  "border-transparent bg-transparent text-(--lex-color-feedback-warning-foreground)";

const dangerGhost =
  "border-transparent bg-transparent text-(--lex-color-feedback-danger-foreground)";

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
        subtle: "",
        outline: "",
        ghost: "",
      },
      size: {
        xs: "h-(--lex-badge-height-xs) px-(--lex-badge-padding-x-xs) text-(length:--lex-badge-font-size-xs)",
        sm: "h-(--lex-badge-height-sm) px-(--lex-badge-padding-x-sm) text-(length:--lex-badge-font-size-sm)",
        md: "h-(--lex-badge-height-md) px-(--lex-badge-padding-x-md) text-(length:--lex-badge-font-size-md)",
        lg: "h-(--lex-badge-height-lg) px-(--lex-badge-padding-x-lg) text-(length:--lex-badge-font-size-lg)",
        xl: "h-(--lex-badge-height-xl) px-(--lex-badge-padding-x-xl) text-(length:--lex-badge-font-size-xl)",
      },
    },
    compoundVariants: [
      // solid
      { variant: "neutral", appearance: "solid", class: neutralSolid },
      { variant: "primary", appearance: "solid", class: primarySolid },
      { variant: "success", appearance: "solid", class: successSolid },
      { variant: "warning", appearance: "solid", class: warningSolid },
      { variant: "danger", appearance: "solid", class: dangerSolid },
      // subtle
      { variant: "neutral", appearance: "subtle", class: neutralSubtle },
      { variant: "primary", appearance: "subtle", class: primarySubtle },
      { variant: "success", appearance: "subtle", class: successSubtle },
      { variant: "warning", appearance: "subtle", class: warningSubtle },
      { variant: "danger", appearance: "subtle", class: dangerSubtle },
      // outline
      { variant: "neutral", appearance: "outline", class: neutralOutline },
      { variant: "primary", appearance: "outline", class: primaryOutline },
      { variant: "success", appearance: "outline", class: successOutline },
      { variant: "warning", appearance: "outline", class: warningOutline },
      { variant: "danger", appearance: "outline", class: dangerOutline },
      // ghost
      { variant: "neutral", appearance: "ghost", class: neutralGhost },
      { variant: "primary", appearance: "ghost", class: primaryGhost },
      { variant: "success", appearance: "ghost", class: successGhost },
      { variant: "warning", appearance: "ghost", class: warningGhost },
      { variant: "danger", appearance: "ghost", class: dangerGhost },
    ],
    defaultVariants: {
      variant: "neutral",
      appearance: "solid",
      size: "sm",
    },
  },
);
