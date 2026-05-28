/**
 * Form.variants.ts
 *
 * Defines visual variants using class composition.
 */

import { cva } from "class-variance-authority"

export const formVariants = cva(
  "grid gap-(--lex-form-gap) text-(--lex-form-foreground)",
)
