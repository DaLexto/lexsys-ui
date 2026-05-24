/**
 * Textarea.variants.ts
 *
 * Defines visual variants using class composition.
 */

import { cva } from "class-variance-authority"
import { disabledStateClasses } from "@/lib/utils"

export const textareaVariants = cva(
  [
    "flex w-full min-w-0 border bg-(--lsys-textarea-background) text-(--lsys-textarea-foreground)",
    "rounded-(--lsys-textarea-radius) border-(--lsys-textarea-border-color)",
    "font-(family-name:--lsys-textarea-font-family) font-(--lsys-textarea-font-weight) leading-(--lsys-textarea-font-line-height) tracking-(--lsys-textarea-font-letter-spacing)",
    "placeholder:text-(--lsys-textarea-placeholder-color)",
    "transition-colors duration-(--lsys-textarea-transition-duration) ease-(--lsys-textarea-transition-easing)",
    "outline-none focus-visible:border-(--lsys-textarea-focus-border-color) focus-visible:ring-(length:--lsys-textarea-focus-ring-width) focus-visible:ring-(--lsys-textarea-focus-ring-color) focus-visible:ring-offset-(length:--lsys-textarea-focus-ring-offset) focus-visible:ring-offset-(--lsys-textarea-focus-ring-offset-color)",
    "disabled:cursor-not-allowed",
    disabledStateClasses,
    "aria-invalid:border-(--lsys-textarea-invalid-border-color) aria-invalid:ring-(--lsys-textarea-invalid-ring-color) data-[invalid]:border-(--lsys-textarea-invalid-border-color) data-[invalid]:ring-(--lsys-textarea-invalid-ring-color)",
  ].join(" "),
  {
    variants: {
      variant: {
        default: "",
        ghost:
          "border-transparent bg-transparent focus-visible:bg-(--lsys-textarea-background)",
      },
      size: {
        sm: "min-h-(--lsys-textarea-min-height-sm) px-(--lsys-textarea-padding-x-sm) py-(--lsys-textarea-padding-y-sm) text-(length:--lsys-textarea-font-size-sm)",
        md: "min-h-(--lsys-textarea-min-height-md) px-(--lsys-textarea-padding-x-md) py-(--lsys-textarea-padding-y-md) text-(length:--lsys-textarea-font-size-md)",
        lg: "min-h-(--lsys-textarea-min-height-lg) px-(--lsys-textarea-padding-x-lg) py-(--lsys-textarea-padding-y-lg) text-(length:--lsys-textarea-font-size-lg)",
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
