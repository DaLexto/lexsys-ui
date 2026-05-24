/**
 * Toolbar.variants.ts
 *
 * Defines visual variants using class composition.
 */

import { cva } from "class-variance-authority"
import { disabledStateClasses } from "../../../utils/cn"

export const toolbarRootVariants = cva(
  "flex items-center gap-(--lsys-button-padding-x-sm) rounded-(--lsys-button-radius) border border-(--lsys-button-secondary-border-color) bg-(--lsys-button-secondary-background) p-(--lsys-button-padding-x-sm)",
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
  "flex items-center gap-(--lsys-space-1)",
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
    "inline-flex h-(--lsys-button-height-sm) items-center justify-center rounded-(--lsys-button-radius) border border-transparent px-(--lsys-button-padding-x-sm)",
    "text-(length:--lsys-button-font-size-sm) font-(--lsys-button-font-weight) leading-(--lsys-button-font-line-height) text-(--lsys-button-secondary-foreground)",
    "transition-colors duration-(--lsys-button-transition-duration) ease-(--lsys-button-transition-easing)",
    "outline-none hover:bg-(--lsys-button-secondary-hover-background) focus-visible:ring-(length:--lsys-button-focus-ring-width) focus-visible:ring-(--lsys-button-focus-ring-color) focus-visible:ring-offset-(length:--lsys-button-focus-ring-offset) focus-visible:ring-offset-(--lsys-button-focus-ring-offset-color)",
    disabledStateClasses,
  ].join(" "),
)

export const toolbarLinkVariants = cva(
  [
    "inline-flex h-(--lsys-button-height-sm) items-center justify-center rounded-(--lsys-button-radius) px-(--lsys-button-padding-x-sm)",
    "text-(length:--lsys-button-font-size-sm) font-(--lsys-button-font-weight) leading-(--lsys-button-font-line-height) text-(--lsys-button-secondary-foreground)",
    "transition-colors duration-(--lsys-button-transition-duration) ease-(--lsys-button-transition-easing)",
    "outline-none hover:bg-(--lsys-button-secondary-hover-background) focus-visible:ring-(length:--lsys-button-focus-ring-width) focus-visible:ring-(--lsys-button-focus-ring-color) focus-visible:ring-offset-(length:--lsys-button-focus-ring-offset) focus-visible:ring-offset-(--lsys-button-focus-ring-offset-color)",
    disabledStateClasses,
  ].join(" "),
)

export const toolbarInputVariants = cva(
  [
    "h-(--lsys-input-height-sm) min-w-0 rounded-(--lsys-input-radius) border border-(--lsys-input-border-color) bg-(--lsys-input-background) px-(--lsys-input-padding-x-sm)",
    "text-(length:--lsys-input-font-size-sm) font-(family-name:--lsys-input-font-family) font-(--lsys-input-font-weight) leading-(--lsys-input-font-line-height) text-(--lsys-input-foreground)",
    "placeholder:text-(--lsys-input-placeholder-color)",
    "transition-colors duration-(--lsys-input-transition-duration) ease-(--lsys-input-transition-easing)",
    "outline-none focus-visible:border-(--lsys-input-focus-border-color) focus-visible:ring-(length:--lsys-input-focus-ring-width) focus-visible:ring-(--lsys-input-focus-ring-color) focus-visible:ring-offset-(length:--lsys-input-focus-ring-offset) focus-visible:ring-offset-(--lsys-input-focus-ring-offset-color)",
    disabledStateClasses,
  ].join(" "),
)

export const toolbarSeparatorVariants = cva(
  "shrink-0 bg-(--lsys-separator-color)",
  {
    variants: {
      orientation: {
        horizontal: "mx-(--lsys-space-1) h-(--lsys-separator-thickness) w-full",
        vertical: "my-(--lsys-space-1) h-full w-(--lsys-separator-thickness)",
      },
    },
    defaultVariants: {
      orientation: "vertical",
    },
  },
)
