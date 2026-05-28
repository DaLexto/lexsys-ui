/**
 * Input.variants.ts
 *
 * Defines visual variants using class composition.
 */

import { cva } from "class-variance-authority"
import { disabledStateClasses, invalidStateClasses } from "../../../utils/cn"

export const inputVariants = cva(
  [
    "flex w-full min-w-0 border bg-(--lex-input-background) text-(--lex-input-foreground)",
    "rounded-(--lex-input-radius) border-(--lex-input-border-color)",
    "font-(family-name:--lex-input-font-family) font-(--lex-input-font-weight) leading-(--lex-input-font-line-height) tracking-(--lex-input-font-letter-spacing)",
    "placeholder:text-(--lex-input-placeholder-color)",
    "transition-colors duration-(--lex-input-transition-duration) ease-(--lex-input-transition-easing)",
    "outline-none focus-visible:border-(--lex-input-focus-border-color) focus-visible:ring-(length:--lex-input-focus-ring-width) focus-visible:ring-(--lex-input-focus-ring-color) focus-visible:ring-offset-(length:--lex-input-focus-ring-offset) focus-visible:ring-offset-(--lex-input-focus-ring-offset-color)",
    "disabled:cursor-not-allowed",
    "read-only:cursor-default read-only:bg-(--lex-color-background-subtle) read-only:text-(--lex-color-text-secondary)",
    disabledStateClasses,
    invalidStateClasses,
  ].join(" "),
  {
    variants: {
      variant: {
        default: "",
        ghost:
          "border-transparent bg-transparent focus-visible:bg-(--lex-input-background)",
      },
      size: {
        sm: "h-(--lex-input-height-sm) px-(--lex-input-padding-x-sm) text-(length:--lex-input-font-size-sm)",
        md: "h-(--lex-input-height-md) px-(--lex-input-padding-x-md) text-(length:--lex-input-font-size-md)",
        lg: "h-(--lex-input-height-lg) px-(--lex-input-padding-x-lg) text-(length:--lex-input-font-size-lg)",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  },
)
