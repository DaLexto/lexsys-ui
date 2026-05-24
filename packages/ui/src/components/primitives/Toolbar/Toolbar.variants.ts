/**
 * Toolbar.variants.ts
 *
 * Defines visual variants using class composition.
 */

import { cva } from "class-variance-authority"
import { disabledStateClasses } from "../../../utils/cn"

export const toolbarRootVariants = cva(
  "flex items-center gap-(--nx-button-padding-x-sm) rounded-(--nx-button-radius) border border-(--nx-button-secondary-border-color) bg-(--nx-button-secondary-background) p-(--nx-button-padding-x-sm)",
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
  "flex items-center gap-(--nx-space-1)",
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
    "inline-flex h-(--nx-button-height-sm) items-center justify-center rounded-(--nx-button-radius) border border-transparent px-(--nx-button-padding-x-sm)",
    "text-(length:--nx-button-font-size-sm) font-(--nx-button-font-weight) leading-(--nx-button-font-line-height) text-(--nx-button-secondary-foreground)",
    "transition-colors duration-(--nx-button-transition-duration) ease-(--nx-button-transition-easing)",
    "outline-none hover:bg-(--nx-button-secondary-hover-background) focus-visible:ring-(length:--nx-button-focus-ring-width) focus-visible:ring-(--nx-button-focus-ring-color) focus-visible:ring-offset-(length:--nx-button-focus-ring-offset) focus-visible:ring-offset-(--nx-button-focus-ring-offset-color)",
    disabledStateClasses,
  ].join(" "),
)

export const toolbarLinkVariants = cva(
  [
    "inline-flex h-(--nx-button-height-sm) items-center justify-center rounded-(--nx-button-radius) px-(--nx-button-padding-x-sm)",
    "text-(length:--nx-button-font-size-sm) font-(--nx-button-font-weight) leading-(--nx-button-font-line-height) text-(--nx-button-secondary-foreground)",
    "transition-colors duration-(--nx-button-transition-duration) ease-(--nx-button-transition-easing)",
    "outline-none hover:bg-(--nx-button-secondary-hover-background) focus-visible:ring-(length:--nx-button-focus-ring-width) focus-visible:ring-(--nx-button-focus-ring-color) focus-visible:ring-offset-(length:--nx-button-focus-ring-offset) focus-visible:ring-offset-(--nx-button-focus-ring-offset-color)",
    disabledStateClasses,
  ].join(" "),
)

export const toolbarInputVariants = cva(
  [
    "h-(--nx-input-height-sm) min-w-0 rounded-(--nx-input-radius) border border-(--nx-input-border-color) bg-(--nx-input-background) px-(--nx-input-padding-x-sm)",
    "text-(length:--nx-input-font-size-sm) font-(family-name:--nx-input-font-family) font-(--nx-input-font-weight) leading-(--nx-input-font-line-height) text-(--nx-input-foreground)",
    "placeholder:text-(--nx-input-placeholder-color)",
    "transition-colors duration-(--nx-input-transition-duration) ease-(--nx-input-transition-easing)",
    "outline-none focus-visible:border-(--nx-input-focus-border-color) focus-visible:ring-(length:--nx-input-focus-ring-width) focus-visible:ring-(--nx-input-focus-ring-color) focus-visible:ring-offset-(length:--nx-input-focus-ring-offset) focus-visible:ring-offset-(--nx-input-focus-ring-offset-color)",
    disabledStateClasses,
  ].join(" "),
)

export const toolbarSeparatorVariants = cva(
  "shrink-0 bg-(--nx-separator-color)",
  {
    variants: {
      orientation: {
        horizontal: "mx-(--nx-space-1) h-(--nx-separator-thickness) w-full",
        vertical: "my-(--nx-space-1) h-full w-(--nx-separator-thickness)",
      },
    },
    defaultVariants: {
      orientation: "vertical",
    },
  },
)
