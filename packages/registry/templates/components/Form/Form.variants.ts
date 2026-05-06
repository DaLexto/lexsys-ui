/**
 * Form.variants.ts
 *
 * Defines visual variants using class composition.
 */

import { cva } from "class-variance-authority"

export const formVariants = cva(
  "grid gap-[var(--nx-form-gap)] text-[var(--nx-form-foreground)]",
)
