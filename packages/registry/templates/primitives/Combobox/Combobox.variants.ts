/**
 * Combobox.variants.ts
 *
 * Defines visual variants using class composition.
 */

import { cva } from "class-variance-authority"
import { disabledStateClasses } from "@/lib/utils"

export const comboboxLabelVariants = cva(
  "text-(length:--lsys-select-label-font-size) font-(--lsys-select-label-font-weight) leading-(--lsys-select-label-font-line-height) text-(--lsys-select-label-foreground)",
)

export const comboboxTriggerVariants = cva(
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

export const comboboxInputGroupVariants = cva(
  [
    "inline-flex w-full min-w-0 flex-wrap items-center gap-(--lsys-select-trigger-gap) rounded-(--lsys-select-radius) border",
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
        sm: "min-h-(--lsys-select-height-sm) px-(--lsys-select-padding-x-sm) text-(length:--lsys-select-font-size-sm)",
        md: "min-h-(--lsys-select-height-md) px-(--lsys-select-padding-x-md) text-(length:--lsys-select-font-size-md)",
        lg: "min-h-(--lsys-select-height-lg) px-(--lsys-select-padding-x-lg) text-(length:--lsys-select-font-size-lg)",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
)

export const comboboxInputVariants = cva(
  [
    "min-w-[4rem] flex-1 border-0 bg-transparent text-(--lsys-select-foreground) outline-none",
    "font-(family-name:--lsys-select-font-family) font-(--lsys-select-font-weight) leading-(--lsys-select-font-line-height) tracking-(--lsys-select-font-letter-spacing)",
    "placeholder:text-(--lsys-select-placeholder-color)",
    "disabled:cursor-not-allowed",
    disabledStateClasses,
  ].join(" "),
  {
    variants: {
      size: {
        sm: "py-(--lsys-select-padding-x-sm) text-(length:--lsys-select-font-size-sm)",
        md: "py-(--lsys-select-padding-x-md) text-(length:--lsys-select-font-size-md)",
        lg: "py-(--lsys-select-padding-x-lg) text-(length:--lsys-select-font-size-lg)",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
)

export const comboboxValueVariants = cva(
  "min-w-0 flex-1 truncate text-left data-[placeholder]:text-(--lsys-select-placeholder-color)",
)

export const comboboxIconVariants = cva(
  "inline-flex size-(--lsys-select-icon-size) shrink-0 items-center justify-center text-(--lsys-select-icon-foreground) transition-transform duration-(--lsys-select-transition-duration) ease-(--lsys-select-transition-easing) data-[open]:rotate-180",
)

export const comboboxClearVariants = cva(
  [
    "inline-flex size-(--lsys-select-icon-size) shrink-0 items-center justify-center rounded-(--lsys-select-item-radius) text-(--lsys-select-icon-foreground)",
    "transition-colors duration-(--lsys-select-transition-duration) ease-(--lsys-select-transition-easing)",
    "hover:bg-(--lsys-select-item-highlight-background) hover:text-(--lsys-select-item-highlight-foreground)",
    "data-[disabled]:pointer-events-none data-[disabled]:opacity-(--lsys-opacity-disabled)",
  ].join(" "),
)

export const comboboxBackdropVariants = cva(
  "fixed inset-0 z-(--lsys-select-backdrop-z-index) bg-(--lsys-select-backdrop-background) opacity-(--lsys-select-backdrop-opacity) data-[starting-style]:opacity-0 data-[ending-style]:opacity-0",
)

export const comboboxPositionerVariants = cva(
  "z-(--lsys-select-positioner-z-index)",
)

export const comboboxPopupVariants = cva(
  [
    "min-w-[var(--anchor-width)] overflow-hidden rounded-(--lsys-select-radius) border",
    "border-(--lsys-select-popup-border-color) bg-(--lsys-select-popup-background) text-(--lsys-select-popup-foreground) shadow-(--lsys-select-popup-shadow)",
    "data-[starting-style]:scale-95 data-[starting-style]:opacity-0 data-[ending-style]:scale-95 data-[ending-style]:opacity-0",
    "origin-[var(--transform-origin)] transition-[opacity,transform] duration-(--lsys-select-transition-duration) ease-(--lsys-select-transition-easing)",
  ].join(" "),
)

export const comboboxListVariants = cva(
  "grid max-h-(--lsys-select-popup-max-height) gap-(--lsys-select-list-gap) overflow-y-auto p-(--lsys-select-list-padding)",
)

export const comboboxItemVariants = cva(
  [
    "relative flex min-w-0 cursor-default select-none items-center gap-(--lsys-select-item-gap) rounded-(--lsys-select-item-radius) px-(--lsys-select-item-padding-x) py-(--lsys-select-item-padding-y)",
    "text-(length:--lsys-select-item-font-size) font-(--lsys-select-item-font-weight) leading-(--lsys-select-item-font-line-height) text-(--lsys-select-item-foreground) outline-none",
    "data-[highlighted]:bg-(--lsys-select-item-highlight-background) data-[highlighted]:text-(--lsys-select-item-highlight-foreground)",
    "data-[selected]:bg-(--lsys-select-item-selected-background) data-[selected]:text-(--lsys-select-item-selected-foreground)",
    "data-[disabled]:pointer-events-none data-[disabled]:opacity-(--lsys-opacity-disabled)",
  ].join(" "),
)

export const comboboxItemIndicatorVariants = cva(
  "inline-flex size-(--lsys-select-item-indicator-size) shrink-0 items-center justify-center text-current",
)

export const comboboxArrowVariants = cva(
  "size-(--lsys-select-arrow-size) rotate-45 border border-(--lsys-select-popup-border-color) bg-(--lsys-select-popup-background)",
)

export const comboboxGroupVariants = cva("grid gap-(--lsys-select-group-gap)")

export const comboboxGroupLabelVariants = cva(
  "px-(--lsys-select-item-padding-x) py-(--lsys-select-group-label-padding-y) text-(length:--lsys-select-group-label-font-size) font-(--lsys-select-group-label-font-weight) leading-(--lsys-select-group-label-font-line-height) text-(--lsys-select-group-label-foreground)",
)

export const comboboxEmptyVariants = cva(
  "px-(--lsys-select-item-padding-x) py-(--lsys-select-item-padding-y) text-(length:--lsys-select-item-font-size) text-(--lsys-select-placeholder-color)",
)

export const comboboxStatusVariants = cva(
  "px-(--lsys-select-item-padding-x) py-(--lsys-select-item-padding-y) text-(length:--lsys-select-item-font-size) text-(--lsys-select-placeholder-color)",
)

export const comboboxChipsVariants = cva(
  "flex min-w-0 flex-1 flex-wrap items-center gap-(--lsys-select-item-gap)",
)

export const comboboxChipVariants = cva(
  [
    "inline-flex max-w-full items-center gap-(--lsys-select-item-gap) rounded-(--lsys-select-item-radius) border border-(--lsys-select-border-color)",
    "bg-(--lsys-select-item-selected-background) px-(--lsys-select-item-padding-x) py-(--lsys-select-item-padding-y)",
    "text-(length:--lsys-select-item-font-size) font-(--lsys-select-item-font-weight) text-(--lsys-select-item-selected-foreground)",
    "data-[disabled]:pointer-events-none data-[disabled]:opacity-(--lsys-opacity-disabled)",
  ].join(" "),
)

export const comboboxChipRemoveVariants = cva(
  [
    "inline-flex size-(--lsys-select-item-indicator-size) shrink-0 items-center justify-center rounded-(--lsys-select-item-radius) text-current",
    "hover:bg-(--lsys-select-item-highlight-background) hover:text-(--lsys-select-item-highlight-foreground)",
  ].join(" "),
)

export const comboboxRowVariants = cva("flex min-w-0 items-center")

export const comboboxCollectionVariants = cva("contents")

export const comboboxSeparatorVariants = cva(
  "mx-(--lsys-select-item-padding-x) my-(--lsys-select-group-label-padding-y) h-(--lsys-separator-thickness) bg-(--lsys-separator-color)",
)
