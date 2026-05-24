/**
 * Autocomplete.variants.ts
 *
 * Defines visual variants using class composition.
 */

import { cva } from "class-variance-authority"
import { disabledStateClasses } from "@/lib/utils"

export const autocompleteTriggerVariants = cva(
  [
    "inline-flex w-full min-w-0 items-center justify-between gap-(--lsys-select-trigger-gap) rounded-(--lsys-select-radius) border",
    "border-(--lsys-select-border-color) bg-(--lsys-select-background) text-(--lsys-select-foreground)",
    "font-(family-name:--lsys-select-font-family) font-(--lsys-select-font-weight) leading-(--lsys-select-font-line-height) tracking-(--lsys-select-font-letter-spacing)",
    "transition-colors duration-(--lsys-select-transition-duration) ease-(--lsys-select-transition-easing)",
    "outline-none data-[focused]:border-(--lsys-select-focus-border-color) data-[focused]:ring-(length:--lsys-select-focus-ring-width) data-[focused]:ring-(--lsys-select-focus-ring-color) data-[focused]:ring-offset-(length:--lsys-select-focus-ring-offset) data-[focused]:ring-offset-(--lsys-select-focus-ring-offset-color)",
    "data-[invalid]:border-(--lsys-select-invalid-border-color) data-[invalid]:ring-(length:--lsys-select-invalid-ring-width) data-[invalid]:ring-(--lsys-select-invalid-ring-color)",
    "data-[disabled]:cursor-not-allowed data-[disabled]:opacity-(--lsys-opacity-disabled)",
  ].join(" "),
  {
    variants: {
      size: {
        sm: "h-(--lsys-select-height-sm) px-(--lsys-select-padding-x-sm) text-(length:--lsys-select-font-size-sm)",
        md: "h-(--lsys-select-height-md) px-(--lsys-select-padding-x-md) text-(length:--lsys-select-font-size-md)",
        lg: "h-(--lsys-select-height-lg) px-(--lsys-select-padding-x-lg) text-(length:--lsys-select-font-size-lg)",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
)

export const autocompleteInputGroupVariants = cva(
  [
    "inline-flex w-full min-w-0 items-center gap-(--lsys-select-trigger-gap) rounded-(--lsys-select-radius) border",
    "border-(--lsys-select-border-color) bg-(--lsys-select-background) text-(--lsys-select-foreground)",
    "font-(family-name:--lsys-select-font-family) font-(--lsys-select-font-weight) leading-(--lsys-select-font-line-height) tracking-(--lsys-select-font-letter-spacing)",
    "transition-colors duration-(--lsys-select-transition-duration) ease-(--lsys-select-transition-easing)",
    "outline-none data-[focused]:border-(--lsys-select-focus-border-color) data-[focused]:ring-(length:--lsys-select-focus-ring-width) data-[focused]:ring-(--lsys-select-focus-ring-color) data-[focused]:ring-offset-(length:--lsys-select-focus-ring-offset) data-[focused]:ring-offset-(--lsys-select-focus-ring-offset-color)",
    "data-[invalid]:border-(--lsys-select-invalid-border-color) data-[invalid]:ring-(length:--lsys-select-invalid-ring-width) data-[invalid]:ring-(--lsys-select-invalid-ring-color)",
    "data-[disabled]:cursor-not-allowed data-[disabled]:opacity-(--lsys-opacity-disabled)",
  ].join(" "),
  {
    variants: {
      size: {
        sm: "h-(--lsys-select-height-sm) px-(--lsys-select-padding-x-sm) text-(length:--lsys-select-font-size-sm)",
        md: "h-(--lsys-select-height-md) px-(--lsys-select-padding-x-md) text-(length:--lsys-select-font-size-md)",
        lg: "h-(--lsys-select-height-lg) px-(--lsys-select-padding-x-lg) text-(length:--lsys-select-font-size-lg)",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
)

export const autocompleteInputVariants = cva(
  [
    "min-w-0 flex-1 border-0 bg-transparent text-(--lsys-select-foreground) outline-none",
    "font-(family-name:--lsys-select-font-family) font-(--lsys-select-font-weight) leading-(--lsys-select-font-line-height) tracking-(--lsys-select-font-letter-spacing)",
    "placeholder:text-(--lsys-select-placeholder-color)",
    "disabled:cursor-not-allowed",
    disabledStateClasses,
  ].join(" "),
  {
    variants: {
      size: {
        sm: "text-(length:--lsys-select-font-size-sm)",
        md: "text-(length:--lsys-select-font-size-md)",
        lg: "text-(length:--lsys-select-font-size-lg)",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
)

export const autocompleteValueVariants = cva(
  "min-w-0 flex-1 truncate text-left data-[placeholder]:text-(--lsys-select-placeholder-color)",
)

export const autocompleteIconVariants = cva(
  "inline-flex size-(--lsys-select-icon-size) shrink-0 items-center justify-center text-(--lsys-select-icon-foreground) transition-transform duration-(--lsys-select-transition-duration) ease-(--lsys-select-transition-easing) data-[open]:rotate-180",
)

export const autocompleteClearVariants = cva(
  [
    "inline-flex size-(--lsys-select-icon-size) shrink-0 items-center justify-center rounded-(--lsys-select-item-radius) text-(--lsys-select-icon-foreground)",
    "transition-colors duration-(--lsys-select-transition-duration) ease-(--lsys-select-transition-easing)",
    "hover:bg-(--lsys-select-item-highlight-background) hover:text-(--lsys-select-item-highlight-foreground)",
    "data-[disabled]:pointer-events-none data-[disabled]:opacity-(--lsys-opacity-disabled)",
  ].join(" "),
)

export const autocompleteBackdropVariants = cva(
  "fixed inset-0 z-(--lsys-select-backdrop-z-index) bg-(--lsys-select-backdrop-background) opacity-(--lsys-select-backdrop-opacity) data-[starting-style]:opacity-0 data-[ending-style]:opacity-0",
)

export const autocompletePositionerVariants = cva(
  "z-(--lsys-select-positioner-z-index)",
)

export const autocompletePopupVariants = cva(
  [
    "min-w-[var(--anchor-width)] overflow-hidden rounded-(--lsys-select-radius) border",
    "border-(--lsys-select-popup-border-color) bg-(--lsys-select-popup-background) text-(--lsys-select-popup-foreground) shadow-(--lsys-select-popup-shadow)",
    "data-[starting-style]:scale-95 data-[starting-style]:opacity-0 data-[ending-style]:scale-95 data-[ending-style]:opacity-0",
    "origin-[var(--transform-origin)] transition-[opacity,transform] duration-(--lsys-select-transition-duration) ease-(--lsys-select-transition-easing)",
  ].join(" "),
)

export const autocompleteListVariants = cva(
  "grid max-h-(--lsys-select-popup-max-height) gap-(--lsys-select-list-gap) overflow-y-auto p-(--lsys-select-list-padding)",
)

export const autocompleteItemVariants = cva(
  [
    "relative flex min-w-0 cursor-default select-none items-center gap-(--lsys-select-item-gap) rounded-(--lsys-select-item-radius) px-(--lsys-select-item-padding-x) py-(--lsys-select-item-padding-y)",
    "text-(length:--lsys-select-item-font-size) font-(--lsys-select-item-font-weight) leading-(--lsys-select-item-font-line-height) text-(--lsys-select-item-foreground) outline-none",
    "data-[highlighted]:bg-(--lsys-select-item-highlight-background) data-[highlighted]:text-(--lsys-select-item-highlight-foreground)",
    "data-[selected]:bg-(--lsys-select-item-selected-background) data-[selected]:text-(--lsys-select-item-selected-foreground)",
    "data-[disabled]:pointer-events-none data-[disabled]:opacity-(--lsys-opacity-disabled)",
  ].join(" "),
)

export const autocompleteArrowVariants = cva(
  "size-(--lsys-select-arrow-size) rotate-45 border border-(--lsys-select-popup-border-color) bg-(--lsys-select-popup-background)",
)

export const autocompleteGroupVariants = cva(
  "grid gap-(--lsys-select-group-gap)",
)

export const autocompleteGroupLabelVariants = cva(
  "px-(--lsys-select-item-padding-x) py-(--lsys-select-group-label-padding-y) text-(length:--lsys-select-group-label-font-size) font-(--lsys-select-group-label-font-weight) leading-(--lsys-select-group-label-font-line-height) text-(--lsys-select-group-label-foreground)",
)

export const autocompleteEmptyVariants = cva(
  "px-(--lsys-select-item-padding-x) py-(--lsys-select-item-padding-y) text-(length:--lsys-select-item-font-size) text-(--lsys-select-placeholder-color)",
)

export const autocompleteStatusVariants = cva(
  "px-(--lsys-select-item-padding-x) py-(--lsys-select-item-padding-y) text-(length:--lsys-select-item-font-size) text-(--lsys-select-placeholder-color)",
)

export const autocompleteRowVariants = cva("flex min-w-0 items-center")

export const autocompleteCollectionVariants = cva("contents")

export const autocompleteSeparatorVariants = cva(
  "mx-(--lsys-select-item-padding-x) my-(--lsys-select-group-label-padding-y) h-(--lsys-separator-thickness) bg-(--lsys-separator-color)",
)
