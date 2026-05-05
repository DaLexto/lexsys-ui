/**
 * Input.variants.ts
 *
 * Defines visual variants using class composition.
 */

import { cva } from "class-variance-authority"

export const inputVariants = cva(
  [
    "flex w-full min-w-0 border bg-[var(--nx-input-background)] text-[var(--nx-input-foreground)]",
    "rounded-[var(--nx-input-radius)] border-[var(--nx-input-border-color)]",
    "font-[var(--nx-input-font-weight)] leading-[var(--nx-input-font-line-height)] tracking-[var(--nx-input-font-letter-spacing)]",
    "placeholder:text-[var(--nx-input-placeholder-color)]",
    "transition-colors duration-[var(--nx-input-transition-duration)] ease-[var(--nx-easing-standard)]",
    "outline-none focus-visible:border-[var(--nx-input-focus-border-color)] focus-visible:ring-2 focus-visible:ring-nx-ring focus-visible:ring-offset-2 focus-visible:ring-offset-nx-background",
    "disabled:cursor-not-allowed disabled:opacity-50",
    "aria-invalid:border-[var(--nx-input-invalid-border-color)] aria-invalid:ring-[var(--nx-input-invalid-ring-color)]",
  ].join(" "),
  {
    variants: {
      variant: {
        default: "",
        ghost:
          "border-transparent bg-transparent focus-visible:bg-[var(--nx-input-background)]",
      },
      size: {
        sm: "h-[var(--nx-input-height-sm)] px-[var(--nx-input-padding-x-sm)] text-[length:var(--nx-input-font-size-sm)]",
        md: "h-[var(--nx-input-height-md)] px-[var(--nx-input-padding-x-md)] text-[length:var(--nx-input-font-size-md)]",
        lg: "h-[var(--nx-input-height-lg)] px-[var(--nx-input-padding-x-lg)] text-[length:var(--nx-input-font-size-lg)]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  },
)
