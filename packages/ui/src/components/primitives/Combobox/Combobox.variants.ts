/**
 * Combobox.variants.ts
 *
 * Defines visual variants using class composition.
 */

import { cva } from "class-variance-authority"
import { disabledStateClasses } from "../../../utils/cn"

export const comboboxLabelVariants = cva(
  "text-(length:--nx-select-label-font-size) font-(--nx-select-label-font-weight) leading-(--nx-select-label-font-line-height) text-(--nx-select-label-foreground)",
)

export const comboboxTriggerVariants = cva(
  [
    "inline-flex w-full min-w-0 items-center justify-between gap-(--nx-select-trigger-gap) rounded-(--nx-select-radius) border",
    "border-(--nx-select-border-color) bg-(--nx-select-background) text-(--nx-select-foreground)",
    "font-(family-name:--nx-select-font-family) font-(--nx-select-font-weight) leading-(--nx-select-font-line-height) tracking-(--nx-select-font-letter-spacing)",
    "transition-colors duration-(--nx-select-transition-duration) ease-(--nx-select-transition-easing)",
    "outline-none data-[focused]:border-(--nx-select-focus-border-color) data-[focused]:ring-(length:--nx-select-focus-ring-width) data-[focused]:ring-(--nx-select-focus-ring-color) data-[focused]:ring-offset-(length:--nx-select-focus-ring-offset) data-[focused]:ring-offset-(--nx-select-focus-ring-offset-color)",
    "data-[invalid]:border-(--nx-select-invalid-border-color) data-[invalid]:ring-(length:--nx-select-invalid-ring-width) data-[invalid]:ring-(--nx-select-invalid-ring-color)",
    "data-[disabled]:cursor-not-allowed data-[disabled]:opacity-(--nx-opacity-disabled)",
  ].join(" "),
  {
    variants: {
      size: {
        sm: "h-(--nx-select-height-sm) px-(--nx-select-padding-x-sm) text-(length:--nx-select-font-size-sm)",
        md: "h-(--nx-select-height-md) px-(--nx-select-padding-x-md) text-(length:--nx-select-font-size-md)",
        lg: "h-(--nx-select-height-lg) px-(--nx-select-padding-x-lg) text-(length:--nx-select-font-size-lg)",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
)

export const comboboxInputGroupVariants = cva(
  [
    "inline-flex w-full min-w-0 flex-wrap items-center gap-(--nx-select-trigger-gap) rounded-(--nx-select-radius) border",
    "border-(--nx-select-border-color) bg-(--nx-select-background) text-(--nx-select-foreground)",
    "font-(family-name:--nx-select-font-family) font-(--nx-select-font-weight) leading-(--nx-select-font-line-height) tracking-(--nx-select-font-letter-spacing)",
    "transition-colors duration-(--nx-select-transition-duration) ease-(--nx-select-transition-easing)",
    "outline-none data-[focused]:border-(--nx-select-focus-border-color) data-[focused]:ring-(length:--nx-select-focus-ring-width) data-[focused]:ring-(--nx-select-focus-ring-color) data-[focused]:ring-offset-(length:--nx-select-focus-ring-offset) data-[focused]:ring-offset-(--nx-select-focus-ring-offset-color)",
    "data-[invalid]:border-(--nx-select-invalid-border-color) data-[invalid]:ring-(length:--nx-select-invalid-ring-width) data-[invalid]:ring-(--nx-select-invalid-ring-color)",
    "data-[disabled]:cursor-not-allowed data-[disabled]:opacity-(--nx-opacity-disabled)",
  ].join(" "),
  {
    variants: {
      size: {
        sm: "min-h-(--nx-select-height-sm) px-(--nx-select-padding-x-sm) text-(length:--nx-select-font-size-sm)",
        md: "min-h-(--nx-select-height-md) px-(--nx-select-padding-x-md) text-(length:--nx-select-font-size-md)",
        lg: "min-h-(--nx-select-height-lg) px-(--nx-select-padding-x-lg) text-(length:--nx-select-font-size-lg)",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
)

export const comboboxInputVariants = cva(
  [
    "min-w-[4rem] flex-1 border-0 bg-transparent text-(--nx-select-foreground) outline-none",
    "font-(family-name:--nx-select-font-family) font-(--nx-select-font-weight) leading-(--nx-select-font-line-height) tracking-(--nx-select-font-letter-spacing)",
    "placeholder:text-(--nx-select-placeholder-color)",
    "disabled:cursor-not-allowed",
    disabledStateClasses,
  ].join(" "),
  {
    variants: {
      size: {
        sm: "py-(--nx-select-padding-x-sm) text-(length:--nx-select-font-size-sm)",
        md: "py-(--nx-select-padding-x-md) text-(length:--nx-select-font-size-md)",
        lg: "py-(--nx-select-padding-x-lg) text-(length:--nx-select-font-size-lg)",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
)

export const comboboxValueVariants = cva(
  "min-w-0 flex-1 truncate text-left data-[placeholder]:text-(--nx-select-placeholder-color)",
)

export const comboboxIconVariants = cva(
  "inline-flex size-(--nx-select-icon-size) shrink-0 items-center justify-center text-(--nx-select-icon-foreground) transition-transform duration-(--nx-select-transition-duration) ease-(--nx-select-transition-easing) data-[open]:rotate-180",
)

export const comboboxClearVariants = cva(
  [
    "inline-flex size-(--nx-select-icon-size) shrink-0 items-center justify-center rounded-(--nx-select-item-radius) text-(--nx-select-icon-foreground)",
    "transition-colors duration-(--nx-select-transition-duration) ease-(--nx-select-transition-easing)",
    "hover:bg-(--nx-select-item-highlight-background) hover:text-(--nx-select-item-highlight-foreground)",
    "data-[disabled]:pointer-events-none data-[disabled]:opacity-(--nx-opacity-disabled)",
  ].join(" "),
)

export const comboboxBackdropVariants = cva(
  "fixed inset-0 z-(--nx-select-backdrop-z-index) bg-(--nx-select-backdrop-background) opacity-(--nx-select-backdrop-opacity) data-[starting-style]:opacity-0 data-[ending-style]:opacity-0",
)

export const comboboxPositionerVariants = cva(
  "z-(--nx-select-positioner-z-index)",
)

export const comboboxPopupVariants = cva(
  [
    "min-w-[var(--anchor-width)] overflow-hidden rounded-(--nx-select-radius) border",
    "border-(--nx-select-popup-border-color) bg-(--nx-select-popup-background) text-(--nx-select-popup-foreground) shadow-(--nx-select-popup-shadow)",
    "data-[starting-style]:scale-95 data-[starting-style]:opacity-0 data-[ending-style]:scale-95 data-[ending-style]:opacity-0",
    "origin-[var(--transform-origin)] transition-[opacity,transform] duration-(--nx-select-transition-duration) ease-(--nx-select-transition-easing)",
  ].join(" "),
)

export const comboboxListVariants = cva(
  "grid max-h-(--nx-select-popup-max-height) gap-(--nx-select-list-gap) overflow-y-auto p-(--nx-select-list-padding)",
)

export const comboboxItemVariants = cva(
  [
    "relative flex min-w-0 cursor-default select-none items-center gap-(--nx-select-item-gap) rounded-(--nx-select-item-radius) px-(--nx-select-item-padding-x) py-(--nx-select-item-padding-y)",
    "text-(length:--nx-select-item-font-size) font-(--nx-select-item-font-weight) leading-(--nx-select-item-font-line-height) text-(--nx-select-item-foreground) outline-none",
    "data-[highlighted]:bg-(--nx-select-item-highlight-background) data-[highlighted]:text-(--nx-select-item-highlight-foreground)",
    "data-[selected]:bg-(--nx-select-item-selected-background) data-[selected]:text-(--nx-select-item-selected-foreground)",
    "data-[disabled]:pointer-events-none data-[disabled]:opacity-(--nx-opacity-disabled)",
  ].join(" "),
)

export const comboboxItemIndicatorVariants = cva(
  "inline-flex size-(--nx-select-item-indicator-size) shrink-0 items-center justify-center text-current",
)

export const comboboxArrowVariants = cva(
  "size-(--nx-select-arrow-size) rotate-45 border border-(--nx-select-popup-border-color) bg-(--nx-select-popup-background)",
)

export const comboboxGroupVariants = cva("grid gap-(--nx-select-group-gap)")

export const comboboxGroupLabelVariants = cva(
  "px-(--nx-select-item-padding-x) py-(--nx-select-group-label-padding-y) text-(length:--nx-select-group-label-font-size) font-(--nx-select-group-label-font-weight) leading-(--nx-select-group-label-font-line-height) text-(--nx-select-group-label-foreground)",
)

export const comboboxEmptyVariants = cva(
  "px-(--nx-select-item-padding-x) py-(--nx-select-item-padding-y) text-(length:--nx-select-item-font-size) text-(--nx-select-placeholder-color)",
)

export const comboboxStatusVariants = cva(
  "px-(--nx-select-item-padding-x) py-(--nx-select-item-padding-y) text-(length:--nx-select-item-font-size) text-(--nx-select-placeholder-color)",
)

export const comboboxChipsVariants = cva(
  "flex min-w-0 flex-1 flex-wrap items-center gap-(--nx-select-item-gap)",
)

export const comboboxChipVariants = cva(
  [
    "inline-flex max-w-full items-center gap-(--nx-select-item-gap) rounded-(--nx-select-item-radius) border border-(--nx-select-border-color)",
    "bg-(--nx-select-item-selected-background) px-(--nx-select-item-padding-x) py-(--nx-select-item-padding-y)",
    "text-(length:--nx-select-item-font-size) font-(--nx-select-item-font-weight) text-(--nx-select-item-selected-foreground)",
    "data-[disabled]:pointer-events-none data-[disabled]:opacity-(--nx-opacity-disabled)",
  ].join(" "),
)

export const comboboxChipRemoveVariants = cva(
  [
    "inline-flex size-(--nx-select-item-indicator-size) shrink-0 items-center justify-center rounded-(--nx-select-item-radius) text-current",
    "hover:bg-(--nx-select-item-highlight-background) hover:text-(--nx-select-item-highlight-foreground)",
  ].join(" "),
)

export const comboboxRowVariants = cva("flex min-w-0 items-center")

export const comboboxCollectionVariants = cva("contents")

export const comboboxSeparatorVariants = cva(
  "mx-(--nx-select-item-padding-x) my-(--nx-select-group-label-padding-y) h-(--nx-separator-thickness) bg-(--nx-separator-color)",
)
