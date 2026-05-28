/**
 * Autocomplete.variants.ts
 *
 * Defines visual variants using class composition.
 */

import { cva } from "class-variance-authority"
import { disabledStateClasses } from "../../../utils/cn"

export const autocompleteTriggerVariants = cva(
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

export const autocompleteInputGroupVariants = cva(
  [
    "inline-flex w-full min-w-0 items-center gap-(--lex-select-trigger-gap) rounded-(--lex-select-radius) border",
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

export const autocompleteInputVariants = cva(
  [
    "min-w-0 flex-1 border-0 bg-transparent text-(--lex-select-foreground) outline-none",
    "font-(family-name:--lex-select-font-family) font-(--lex-select-font-weight) leading-(--lex-select-font-line-height) tracking-(--lex-select-font-letter-spacing)",
    "placeholder:text-(--lex-select-placeholder-color)",
    "disabled:cursor-not-allowed",
    disabledStateClasses,
  ].join(" "),
  {
    variants: {
      size: {
        sm: "text-(length:--lex-select-font-size-sm)",
        md: "text-(length:--lex-select-font-size-md)",
        lg: "text-(length:--lex-select-font-size-lg)",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
)

export const autocompleteValueVariants = cva(
  "min-w-0 flex-1 truncate text-left data-[placeholder]:text-(--lex-select-placeholder-color)",
)

export const autocompleteIconVariants = cva(
  "inline-flex size-(--lex-select-icon-size) shrink-0 items-center justify-center text-(--lex-select-icon-foreground) transition-transform duration-(--lex-select-transition-duration) ease-(--lex-select-transition-easing) data-[open]:rotate-180",
)

export const autocompleteClearVariants = cva(
  [
    "inline-flex size-(--lex-select-icon-size) shrink-0 items-center justify-center rounded-(--lex-select-item-radius) text-(--lex-select-icon-foreground)",
    "transition-colors duration-(--lex-select-transition-duration) ease-(--lex-select-transition-easing)",
    "hover:bg-(--lex-select-item-highlight-background) hover:text-(--lex-select-item-highlight-foreground)",
    "data-[disabled]:pointer-events-none data-[disabled]:opacity-(--lex-opacity-disabled)",
  ].join(" "),
)

export const autocompleteBackdropVariants = cva(
  "fixed inset-0 z-(--lex-select-backdrop-z-index) bg-(--lex-select-backdrop-background) opacity-(--lex-select-backdrop-opacity) data-[starting-style]:opacity-0 data-[ending-style]:opacity-0",
)

export const autocompletePositionerVariants = cva(
  "z-(--lex-select-positioner-z-index)",
)

export const autocompletePopupVariants = cva(
  [
    "min-w-[var(--anchor-width)] overflow-hidden rounded-(--lex-select-radius) border",
    "border-(--lex-select-popup-border-color) bg-(--lex-select-popup-background) text-(--lex-select-popup-foreground) shadow-(--lex-select-popup-shadow)",
    "data-[starting-style]:scale-95 data-[starting-style]:opacity-0 data-[ending-style]:scale-95 data-[ending-style]:opacity-0",
    "origin-[var(--transform-origin)] transition-[opacity,transform] duration-(--lex-select-transition-duration) ease-(--lex-select-transition-easing)",
  ].join(" "),
)

export const autocompleteListVariants = cva(
  "grid max-h-(--lex-select-popup-max-height) gap-(--lex-select-list-gap) overflow-y-auto p-(--lex-select-list-padding)",
)

export const autocompleteItemVariants = cva(
  [
    "relative flex min-w-0 cursor-default select-none items-center gap-(--lex-select-item-gap) rounded-(--lex-select-item-radius) px-(--lex-select-item-padding-x) py-(--lex-select-item-padding-y)",
    "text-(length:--lex-select-item-font-size) font-(--lex-select-item-font-weight) leading-(--lex-select-item-font-line-height) text-(--lex-select-item-foreground) outline-none",
    "data-[highlighted]:bg-(--lex-select-item-highlight-background) data-[highlighted]:text-(--lex-select-item-highlight-foreground)",
    "data-[selected]:bg-(--lex-select-item-selected-background) data-[selected]:text-(--lex-select-item-selected-foreground)",
    "data-[disabled]:pointer-events-none data-[disabled]:opacity-(--lex-opacity-disabled)",
  ].join(" "),
)

export const autocompleteArrowVariants = cva(
  "size-(--lex-select-arrow-size) rotate-45 border border-(--lex-select-popup-border-color) bg-(--lex-select-popup-background)",
)

export const autocompleteGroupVariants = cva(
  "grid gap-(--lex-select-group-gap)",
)

export const autocompleteGroupLabelVariants = cva(
  "px-(--lex-select-item-padding-x) py-(--lex-select-group-label-padding-y) text-(length:--lex-select-group-label-font-size) font-(--lex-select-group-label-font-weight) leading-(--lex-select-group-label-font-line-height) text-(--lex-select-group-label-foreground)",
)

export const autocompleteEmptyVariants = cva(
  "px-(--lex-select-item-padding-x) py-(--lex-select-item-padding-y) text-(length:--lex-select-item-font-size) text-(--lex-select-placeholder-color)",
)

export const autocompleteStatusVariants = cva(
  "px-(--lex-select-item-padding-x) py-(--lex-select-item-padding-y) text-(length:--lex-select-item-font-size) text-(--lex-select-placeholder-color)",
)

export const autocompleteRowVariants = cva("flex min-w-0 items-center")

export const autocompleteCollectionVariants = cva("contents")

export const autocompleteSeparatorVariants = cva(
  "mx-(--lex-select-item-padding-x) my-(--lex-select-group-label-padding-y) h-(--lex-separator-thickness) bg-(--lex-separator-color)",
)
