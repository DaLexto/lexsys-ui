/**
 * Form.variants.ts
 *
 * Defines visual variants using class composition.
 */

import { cva } from "class-variance-authority"

export const formVariants = cva(
  "grid gap-(--nx-form-gap) text-(--nx-form-foreground)",
)
