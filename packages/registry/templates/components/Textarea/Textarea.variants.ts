/**
 * Textarea.variants.ts
 *
 * Defines visual variants using class composition.
 */

import { cva } from "class-variance-authority"

export const textareaVariants = cva(
  [
    "flex w-full min-w-0 border bg-[var(--nx-textarea-background)] text-[var(--nx-textarea-foreground)]",
    "rounded-[var(--nx-textarea-radius)] border-[var(--nx-textarea-border-color)]",
    "[font-family:var(--nx-textarea-font-family)] font-[var(--nx-textarea-font-weight)] leading-[var(--nx-textarea-font-line-height)] tracking-[var(--nx-textarea-font-letter-spacing)]",
    "placeholder:text-[var(--nx-textarea-placeholder-color)]",
    "transition-colors duration-[var(--nx-textarea-transition-duration)] ease-[var(--nx-textarea-transition-easing)]",
    "outline-none focus-visible:border-[var(--nx-textarea-focus-border-color)] focus-visible:ring-2 focus-visible:ring-[var(--nx-textarea-focus-ring-color)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--nx-textarea-focus-ring-offset-color)]",
    "disabled:cursor-not-allowed disabled:opacity-50 data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50",
    "aria-invalid:border-[var(--nx-textarea-invalid-border-color)] aria-invalid:ring-[var(--nx-textarea-invalid-ring-color)] data-[invalid]:border-[var(--nx-textarea-invalid-border-color)] data-[invalid]:ring-[var(--nx-textarea-invalid-ring-color)]",
  ].join(" "),
  {
    variants: {
      variant: {
        default: "",
        ghost:
          "border-transparent bg-transparent focus-visible:bg-[var(--nx-textarea-background)]",
      },
      size: {
        sm: "min-h-[var(--nx-textarea-min-height-sm)] px-[var(--nx-textarea-padding-x-sm)] py-[var(--nx-textarea-padding-y-sm)] text-[length:var(--nx-textarea-font-size-sm)]",
        md: "min-h-[var(--nx-textarea-min-height-md)] px-[var(--nx-textarea-padding-x-md)] py-[var(--nx-textarea-padding-y-md)] text-[length:var(--nx-textarea-font-size-md)]",
        lg: "min-h-[var(--nx-textarea-min-height-lg)] px-[var(--nx-textarea-padding-x-lg)] py-[var(--nx-textarea-padding-y-lg)] text-[length:var(--nx-textarea-font-size-lg)]",
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
