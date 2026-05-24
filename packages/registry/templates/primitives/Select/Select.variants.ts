/**
 * Select.variants.ts
 *
 * Defines visual variants using class composition.
 */

import { cva } from "class-variance-authority"

export const selectLabelVariants = cva(
  "text-(length:--lsys-select-label-font-size) font-(--lsys-select-label-font-weight) leading-(--lsys-select-label-font-line-height) text-(--lsys-select-label-foreground)",
)

export const selectTriggerVariants = cva(
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

export const selectValueVariants = cva(
  "min-w-0 flex-1 truncate text-left data-[placeholder]:text-(--lsys-select-placeholder-color)",
)

export const selectIconVariants = cva(
  "inline-flex size-(--lsys-select-icon-size) shrink-0 items-center justify-center text-(--lsys-select-icon-foreground) transition-transform duration-(--lsys-select-transition-duration) ease-(--lsys-select-transition-easing) data-[open]:rotate-180",
)

export const selectBackdropVariants = cva(
  "fixed inset-0 z-(--lsys-select-backdrop-z-index) bg-(--lsys-select-backdrop-background) opacity-(--lsys-select-backdrop-opacity) data-[starting-style]:opacity-0 data-[ending-style]:opacity-0",
)

export const selectPositionerVariants = cva(
  "z-(--lsys-select-positioner-z-index)",
)

export const selectPopupVariants = cva(
  [
    "min-w-[var(--anchor-width)] overflow-hidden rounded-(--lsys-select-radius) border",
    "border-(--lsys-select-popup-border-color) bg-(--lsys-select-popup-background) text-(--lsys-select-popup-foreground) shadow-(--lsys-select-popup-shadow)",
    "data-[starting-style]:scale-95 data-[starting-style]:opacity-0 data-[ending-style]:scale-95 data-[ending-style]:opacity-0",
    "origin-[var(--transform-origin)] transition-[opacity,transform] duration-(--lsys-select-transition-duration) ease-(--lsys-select-transition-easing)",
  ].join(" "),
)

export const selectListVariants = cva(
  "grid max-h-(--lsys-select-popup-max-height) gap-(--lsys-select-list-gap) overflow-y-auto p-(--lsys-select-list-padding)",
)

export const selectItemVariants = cva(
  [
    "relative flex min-w-0 cursor-default select-none items-center gap-(--lsys-select-item-gap) rounded-(--lsys-select-item-radius) px-(--lsys-select-item-padding-x) py-(--lsys-select-item-padding-y)",
    "text-(length:--lsys-select-item-font-size) font-(--lsys-select-item-font-weight) leading-(--lsys-select-item-font-line-height) text-(--lsys-select-item-foreground) outline-none",
    "data-[highlighted]:bg-(--lsys-select-item-highlight-background) data-[highlighted]:text-(--lsys-select-item-highlight-foreground)",
    "data-[selected]:bg-(--lsys-select-item-selected-background) data-[selected]:text-(--lsys-select-item-selected-foreground)",
    "data-[disabled]:pointer-events-none data-[disabled]:opacity-(--lsys-opacity-disabled)",
  ].join(" "),
)

export const selectItemIndicatorVariants = cva(
  "inline-flex size-(--lsys-select-item-indicator-size) shrink-0 items-center justify-center text-current",
)

export const selectItemTextVariants = cva("min-w-0 flex-1 truncate")

export const selectArrowVariants = cva(
  "size-(--lsys-select-arrow-size) rotate-45 border border-(--lsys-select-popup-border-color) bg-(--lsys-select-popup-background)",
)

export const selectScrollArrowVariants = cva(
  "flex h-(--lsys-select-scroll-arrow-height) items-center justify-center text-(--lsys-select-icon-foreground)",
)

export const selectGroupVariants = cva("grid gap-(--lsys-select-group-gap)")

export const selectGroupLabelVariants = cva(
  "px-(--lsys-select-item-padding-x) py-(--lsys-select-group-label-padding-y) text-(length:--lsys-select-group-label-font-size) font-(--lsys-select-group-label-font-weight) leading-(--lsys-select-group-label-font-line-height) text-(--lsys-select-group-label-foreground)",
)
