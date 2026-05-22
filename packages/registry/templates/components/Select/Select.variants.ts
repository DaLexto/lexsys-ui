/**
 * Select.variants.ts
 *
 * Defines visual variants using class composition.
 */

import { cva } from "class-variance-authority"

export const selectLabelVariants = cva(
  "text-[length:var(--nx-select-label-font-size)] font-[var(--nx-select-label-font-weight)] leading-[var(--nx-select-label-font-line-height)] text-[var(--nx-select-label-foreground)]",
)

export const selectTriggerVariants = cva(
  [
    "inline-flex w-full min-w-0 items-center justify-between gap-[var(--nx-select-trigger-gap)] rounded-[var(--nx-select-radius)] border",
    "border-[var(--nx-select-border-color)] bg-[var(--nx-select-background)] text-[var(--nx-select-foreground)]",
    "[font-family:var(--nx-select-font-family)] font-[var(--nx-select-font-weight)] leading-[var(--nx-select-font-line-height)] tracking-[var(--nx-select-font-letter-spacing)]",
    "transition-colors duration-[var(--nx-select-transition-duration)] ease-[var(--nx-select-transition-easing)]",
    "outline-none data-[focused]:border-[var(--nx-select-focus-border-color)] data-[focused]:ring-[length:var(--nx-select-focus-ring-width)] data-[focused]:ring-[var(--nx-select-focus-ring-color)] data-[focused]:ring-offset-[length:var(--nx-select-focus-ring-offset)] data-[focused]:ring-offset-[var(--nx-select-focus-ring-offset-color)]",
    "data-[invalid]:border-[var(--nx-select-invalid-border-color)] data-[invalid]:ring-[length:var(--nx-select-invalid-ring-width)] data-[invalid]:ring-[var(--nx-select-invalid-ring-color)]",
    "data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50",
  ].join(" "),
  {
    variants: {
      size: {
        sm: "h-[var(--nx-select-height-sm)] px-[var(--nx-select-padding-x-sm)] text-[length:var(--nx-select-font-size-sm)]",
        md: "h-[var(--nx-select-height-md)] px-[var(--nx-select-padding-x-md)] text-[length:var(--nx-select-font-size-md)]",
        lg: "h-[var(--nx-select-height-lg)] px-[var(--nx-select-padding-x-lg)] text-[length:var(--nx-select-font-size-lg)]",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
)

export const selectValueVariants = cva(
  "min-w-0 flex-1 truncate text-left data-[placeholder]:text-[var(--nx-select-placeholder-color)]",
)

export const selectIconVariants = cva(
  "inline-flex size-[var(--nx-select-icon-size)] shrink-0 items-center justify-center text-[var(--nx-select-icon-foreground)] transition-transform duration-[var(--nx-select-transition-duration)] ease-[var(--nx-select-transition-easing)] data-[open]:rotate-180",
)

export const selectBackdropVariants = cva(
  "fixed inset-0 z-[var(--nx-select-backdrop-z-index)] bg-[var(--nx-select-backdrop-background)] opacity-20 data-[starting-style]:opacity-0 data-[ending-style]:opacity-0",
)

export const selectPositionerVariants = cva(
  "z-[var(--nx-select-positioner-z-index)]",
)

export const selectPopupVariants = cva(
  [
    "max-h-[var(--nx-select-popup-max-height)] overflow-hidden rounded-[var(--nx-select-radius)] border",
    "border-[var(--nx-select-popup-border-color)] bg-[var(--nx-select-popup-background)] text-[var(--nx-select-popup-foreground)] shadow-[var(--nx-select-popup-shadow)]",
    "data-[starting-style]:scale-95 data-[starting-style]:opacity-0 data-[ending-style]:scale-95 data-[ending-style]:opacity-0",
    "origin-[var(--transform-origin)] transition-[opacity,transform] duration-[var(--nx-select-transition-duration)] ease-[var(--nx-select-transition-easing)]",
  ].join(" "),
)

export const selectListVariants = cva(
  "grid gap-[var(--nx-select-list-gap)] overflow-y-auto p-[var(--nx-select-list-padding)]",
)

export const selectItemVariants = cva(
  [
    "relative flex min-w-0 cursor-default select-none items-center gap-[var(--nx-select-item-gap)] rounded-[var(--nx-select-item-radius)] px-[var(--nx-select-item-padding-x)] py-[var(--nx-select-item-padding-y)]",
    "text-[length:var(--nx-select-item-font-size)] font-[var(--nx-select-item-font-weight)] leading-[var(--nx-select-item-font-line-height)] text-[var(--nx-select-item-foreground)] outline-none",
    "data-[highlighted]:bg-[var(--nx-select-item-highlight-background)] data-[highlighted]:text-[var(--nx-select-item-highlight-foreground)]",
    "data-[selected]:bg-[var(--nx-select-item-selected-background)] data-[selected]:text-[var(--nx-select-item-selected-foreground)]",
    "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
  ].join(" "),
)

export const selectItemIndicatorVariants = cva(
  "inline-flex size-[var(--nx-select-item-indicator-size)] shrink-0 items-center justify-center text-current",
)

export const selectItemTextVariants = cva("min-w-0 flex-1 truncate")

export const selectArrowVariants = cva(
  "size-[var(--nx-select-arrow-size)] rotate-45 border border-[var(--nx-select-popup-border-color)] bg-[var(--nx-select-popup-background)]",
)

export const selectScrollArrowVariants = cva(
  "flex h-[var(--nx-select-scroll-arrow-height)] items-center justify-center text-[var(--nx-select-icon-foreground)]",
)

export const selectGroupVariants = cva("grid gap-[var(--nx-select-group-gap)]")

export const selectGroupLabelVariants = cva(
  "px-[var(--nx-select-item-padding-x)] py-[var(--nx-select-group-label-padding-y)] text-[length:var(--nx-select-group-label-font-size)] font-[var(--nx-select-group-label-font-weight)] leading-[var(--nx-select-group-label-font-line-height)] text-[var(--nx-select-group-label-foreground)]",
)
