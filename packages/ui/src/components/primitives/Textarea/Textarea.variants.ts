/**
 * Textarea.variants.ts
 *
 * Defines visual variants using class composition.
 */

import { cva } from "class-variance-authority"
import { disabledStateClasses } from "../../../utils/cn"

export const textareaVariants = cva(
  [
    "flex w-full min-w-0 border bg-(--lex-textarea-background) text-(--lex-textarea-foreground)",
    "rounded-(--lex-textarea-radius) border-(--lex-textarea-border-color)",
    "font-(family-name:--lex-textarea-font-family) font-(--lex-textarea-font-weight) leading-(--lex-textarea-font-line-height) tracking-(--lex-textarea-font-letter-spacing)",
    "placeholder:text-(--lex-textarea-placeholder-color)",
    "transition-colors duration-(--lex-textarea-transition-duration) ease-(--lex-textarea-transition-easing)",
    "outline-none focus-visible:border-(--lex-textarea-focus-border-color) focus-visible:ring-(length:--lex-textarea-focus-ring-width) focus-visible:ring-(--lex-textarea-focus-ring-color) focus-visible:ring-offset-(length:--lex-textarea-focus-ring-offset) focus-visible:ring-offset-(--lex-textarea-focus-ring-offset-color)",
    "disabled:cursor-not-allowed",
    disabledStateClasses,
    "aria-invalid:border-(--lex-textarea-invalid-border-color) aria-invalid:ring-(--lex-textarea-invalid-ring-color) data-[invalid]:border-(--lex-textarea-invalid-border-color) data-[invalid]:ring-(--lex-textarea-invalid-ring-color)",
  ].join(" "),
  {
    variants: {
      variant: {
        default: "",
        ghost:
          "border-transparent bg-transparent focus-visible:bg-(--lex-textarea-background)",
      },
      size: {
        sm: "min-h-(--lex-textarea-min-height-sm) px-(--lex-textarea-padding-x-sm) py-(--lex-textarea-padding-y-sm) text-(length:--lex-textarea-font-size-sm)",
        md: "min-h-(--lex-textarea-min-height-md) px-(--lex-textarea-padding-x-md) py-(--lex-textarea-padding-y-md) text-(length:--lex-textarea-font-size-md)",
        lg: "min-h-(--lex-textarea-min-height-lg) px-(--lex-textarea-padding-x-lg) py-(--lex-textarea-padding-y-lg) text-(length:--lex-textarea-font-size-lg)",
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
