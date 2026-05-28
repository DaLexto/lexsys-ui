/**
 * Select.variants.ts
 *
 * Defines visual variants using class composition.
 */

import { cva } from "class-variance-authority"

export const selectLabelClasses =
  "text-(length:--lex-select-label-font-size) font-(--lex-select-label-font-weight) leading-(--lex-select-label-font-line-height) text-(--lex-select-label-foreground)"

export const selectTriggerVariants = cva(
  [
    "inline-flex w-full min-w-0 items-center justify-between gap-(--lex-select-trigger-gap) rounded-(--lex-select-radius) border",
    "border-(--lex-select-border-color) bg-(--lex-select-background) text-(--lex-select-foreground)",
    "font-(family-name:--lex-select-font-family) font-(--lex-select-font-weight) leading-(--lex-select-font-line-height) tracking-(--lex-select-font-letter-spacing)",
    "transition-colors duration-(--lex-select-transition-duration) ease-(--lex-select-transition-easing)",
    "outline-none data-[focused]:border-(--lex-select-focus-border-color) data-[focused]:ring-(length:--lex-select-focus-ring-width) data-[focused]:ring-(--lex-select-focus-ring-color) data-[focused]:ring-offset-(length:--lex-select-focus-ring-offset) data-[focused]:ring-offset-(--lex-select-focus-ring-offset-color)",
    "data-[invalid]:border-(--lex-select-invalid-border-color) data-[invalid]:ring-(length:--lex-select-invalid-ring-width) data-[invalid]:ring-(--lex-select-invalid-ring-color)",
    "data-[disabled]:cursor-not-allowed data-[disabled]:opacity-(--lex-opacity-disabled)",
  ].join(" "),
  {
    variants: {
      size: {
        sm: "h-(--lex-select-height-sm) px-(--lex-select-padding-x-sm) text-(length:--lex-select-font-size-sm)",
        md: "h-(--lex-select-height-md) px-(--lex-select-padding-x-md) text-(length:--lex-select-font-size-md)",
        lg: "h-(--lex-select-height-lg) px-(--lex-select-padding-x-lg) text-(length:--lex-select-font-size-lg)",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
)

export const selectValueClasses =
  "min-w-0 flex-1 truncate text-left data-[placeholder]:text-(--lex-select-placeholder-color)"

export const selectIconClasses =
  "inline-flex size-(--lex-select-icon-size) shrink-0 items-center justify-center text-(--lex-select-icon-foreground) transition-transform duration-(--lex-select-transition-duration) ease-(--lex-select-transition-easing) data-[open]:rotate-180"

export const selectBackdropClasses =
  "fixed inset-0 z-(--lex-select-backdrop-z-index) bg-(--lex-select-backdrop-background) opacity-(--lex-select-backdrop-opacity) data-[starting-style]:opacity-0 data-[ending-style]:opacity-0"

export const selectPositionerClasses = "z-(--lex-select-positioner-z-index)"

export const selectPopupClasses = [
  "min-w-[var(--anchor-width)] overflow-hidden rounded-(--lex-select-radius) border",
  "border-(--lex-select-popup-border-color) bg-(--lex-select-popup-background) text-(--lex-select-popup-foreground) shadow-(--lex-select-popup-shadow)",
  "data-[starting-style]:scale-95 data-[starting-style]:opacity-0 data-[ending-style]:scale-95 data-[ending-style]:opacity-0",
  "origin-[var(--transform-origin)] transition-[opacity,transform] duration-(--lex-select-transition-duration) ease-(--lex-select-transition-easing)",
].join(" ")

export const selectListClasses =
  "grid max-h-(--lex-select-popup-max-height) gap-(--lex-select-list-gap) overflow-y-auto p-(--lex-select-list-padding)"

export const selectItemClasses = [
  "relative flex min-w-0 cursor-default select-none items-center gap-(--lex-select-item-gap) rounded-(--lex-select-item-radius) px-(--lex-select-item-padding-x) py-(--lex-select-item-padding-y)",
  "text-(length:--lex-select-item-font-size) font-(--lex-select-item-font-weight) leading-(--lex-select-item-font-line-height) text-(--lex-select-item-foreground) outline-none",
  "data-[highlighted]:bg-(--lex-select-item-highlight-background) data-[highlighted]:text-(--lex-select-item-highlight-foreground)",
  "data-[selected]:bg-(--lex-select-item-selected-background) data-[selected]:text-(--lex-select-item-selected-foreground)",
  "data-[disabled]:pointer-events-none data-[disabled]:opacity-(--lex-opacity-disabled)",
].join(" ")

export const selectItemIndicatorClasses =
  "inline-flex size-(--lex-select-item-indicator-size) shrink-0 items-center justify-center text-current"

export const selectItemTextClasses = "min-w-0 flex-1 truncate"

export const selectArrowClasses =
  "size-(--lex-select-arrow-size) rotate-45 border border-(--lex-select-popup-border-color) bg-(--lex-select-popup-background)"

export const selectScrollArrowClasses =
  "flex h-(--lex-select-scroll-arrow-height) items-center justify-center text-(--lex-select-icon-foreground)"

export const selectGroupClasses = "grid gap-(--lex-select-group-gap)"

export const selectGroupLabelClasses =
  "px-(--lex-select-item-padding-x) py-(--lex-select-group-label-padding-y) text-(length:--lex-select-group-label-font-size) font-(--lex-select-group-label-font-weight) leading-(--lex-select-group-label-font-line-height) text-(--lex-select-group-label-foreground)"
