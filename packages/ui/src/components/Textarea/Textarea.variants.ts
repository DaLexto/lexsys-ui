/**
 * Textarea.variants.ts
 *
 * Defines visual variants using class composition.
 */

import { cva } from "class-variance-authority"
import { disabledStateClasses } from "../../utils/variant-states"

export const textareaVariants = cva(
  [
    "flex w-full min-w-0 border bg-(--nx-textarea-background) text-(--nx-textarea-foreground)",
    "rounded-(--nx-textarea-radius) border-(--nx-textarea-border-color)",
    "font-(family-name:--nx-textarea-font-family) font-(--nx-textarea-font-weight) leading-(--nx-textarea-font-line-height) tracking-(--nx-textarea-font-letter-spacing)",
    "placeholder:text-(--nx-textarea-placeholder-color)",
    "transition-colors duration-(--nx-textarea-transition-duration) ease-(--nx-textarea-transition-easing)",
    "outline-none focus-visible:border-(--nx-textarea-focus-border-color) focus-visible:ring-(length:--nx-textarea-focus-ring-width) focus-visible:ring-(--nx-textarea-focus-ring-color) focus-visible:ring-offset-(length:--nx-textarea-focus-ring-offset) focus-visible:ring-offset-(--nx-textarea-focus-ring-offset-color)",
    "disabled:cursor-not-allowed",
    disabledStateClasses,
    "aria-invalid:border-(--nx-textarea-invalid-border-color) aria-invalid:ring-(--nx-textarea-invalid-ring-color) data-[invalid]:border-(--nx-textarea-invalid-border-color) data-[invalid]:ring-(--nx-textarea-invalid-ring-color)",
  ].join(" "),
  {
    variants: {
      variant: {
        default: "",
        ghost:
          "border-transparent bg-transparent focus-visible:bg-(--nx-textarea-background)",
      },
      size: {
        sm: "min-h-(--nx-textarea-min-height-sm) px-(--nx-textarea-padding-x-sm) py-(--nx-textarea-padding-y-sm) text-(length:--nx-textarea-font-size-sm)",
        md: "min-h-(--nx-textarea-min-height-md) px-(--nx-textarea-padding-x-md) py-(--nx-textarea-padding-y-md) text-(length:--nx-textarea-font-size-md)",
        lg: "min-h-(--nx-textarea-min-height-lg) px-(--nx-textarea-padding-x-lg) py-(--nx-textarea-padding-y-lg) text-(length:--nx-textarea-font-size-lg)",
      },
      resize: {
        none: "resize-none",
        vertical: "resize-y",
        both: "resize",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      resize: "vertical",
    },
  },
)
