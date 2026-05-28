/**
 * Toolbar.variants.ts
 *
 * Defines visual variants using class composition.
 */

import { cva } from "class-variance-authority"
import { disabledStateClasses } from "../../../utils/cn"

export const toolbarRootVariants = cva(
  "flex items-center gap-(--lex-button-padding-x-sm) rounded-(--lex-button-radius) border border-(--lex-button-secondary-border-color) bg-(--lex-button-secondary-background) p-(--lex-button-padding-x-sm)",
  {
    variants: {
      orientation: {
        horizontal: "flex-row",
        vertical: "flex-col",
      },
    },
    defaultVariants: {
      orientation: "horizontal",
    },
  },
)

export const toolbarGroupVariants = cva(
  "flex items-center gap-(--lex-space-1)",
  {
    variants: {
      orientation: {
        horizontal: "flex-row",
        vertical: "flex-col",
      },
    },
    defaultVariants: {
      orientation: "horizontal",
    },
  },
)

export const toolbarButtonVariants = cva(
  [
    "inline-flex h-(--lex-button-height-sm) items-center justify-center rounded-(--lex-button-radius) border border-transparent px-(--lex-button-padding-x-sm)",
    "text-(length:--lex-button-font-size-sm) font-(--lex-button-font-weight) leading-(--lex-button-font-line-height) text-(--lex-button-secondary-foreground)",
    "transition-colors duration-(--lex-button-transition-duration) ease-(--lex-button-transition-easing)",
    "outline-none hover:bg-(--lex-button-secondary-hover-background) focus-visible:ring-(length:--lex-button-focus-ring-width) focus-visible:ring-(--lex-button-focus-ring-color) focus-visible:ring-offset-(length:--lex-button-focus-ring-offset) focus-visible:ring-offset-(--lex-button-focus-ring-offset-color)",
    disabledStateClasses,
  ].join(" "),
)

export const toolbarLinkVariants = cva(
  [
    "inline-flex h-(--lex-button-height-sm) items-center justify-center rounded-(--lex-button-radius) px-(--lex-button-padding-x-sm)",
    "text-(length:--lex-button-font-size-sm) font-(--lex-button-font-weight) leading-(--lex-button-font-line-height) text-(--lex-button-secondary-foreground)",
    "transition-colors duration-(--lex-button-transition-duration) ease-(--lex-button-transition-easing)",
    "outline-none hover:bg-(--lex-button-secondary-hover-background) focus-visible:ring-(length:--lex-button-focus-ring-width) focus-visible:ring-(--lex-button-focus-ring-color) focus-visible:ring-offset-(length:--lex-button-focus-ring-offset) focus-visible:ring-offset-(--lex-button-focus-ring-offset-color)",
    disabledStateClasses,
  ].join(" "),
)

export const toolbarInputVariants = cva(
  [
    "h-(--lex-input-height-sm) min-w-0 rounded-(--lex-input-radius) border border-(--lex-input-border-color) bg-(--lex-input-background) px-(--lex-input-padding-x-sm)",
    "text-(length:--lex-input-font-size-sm) font-(family-name:--lex-input-font-family) font-(--lex-input-font-weight) leading-(--lex-input-font-line-height) text-(--lex-input-foreground)",
    "placeholder:text-(--lex-input-placeholder-color)",
    "transition-colors duration-(--lex-input-transition-duration) ease-(--lex-input-transition-easing)",
    "outline-none focus-visible:border-(--lex-input-focus-border-color) focus-visible:ring-(length:--lex-input-focus-ring-width) focus-visible:ring-(--lex-input-focus-ring-color) focus-visible:ring-offset-(length:--lex-input-focus-ring-offset) focus-visible:ring-offset-(--lex-input-focus-ring-offset-color)",
    disabledStateClasses,
  ].join(" "),
)

export const toolbarSeparatorVariants = cva(
  "shrink-0 bg-(--lex-separator-color)",
  {
    variants: {
      orientation: {
        horizontal: "mx-(--lex-space-1) h-(--lex-separator-thickness) w-full",
        vertical: "my-(--lex-space-1) h-full w-(--lex-separator-thickness)",
      },
    },
    defaultVariants: {
      orientation: "vertical",
    },
  },
)
