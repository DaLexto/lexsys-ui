/**
 * PreviewCard.variants.ts
 *
 * Reuses Popover token-backed classes for preview card surfaces.
 */

import { cva } from "class-variance-authority"
import {
  popoverArrowVariants,
  popoverBackdropVariants,
  popoverPopupVariants,
  popoverPositionerVariants,
  popoverViewportVariants,
} from "../Popover/Popover.variants"

export const previewCardBackdropVariants = popoverBackdropVariants
export const previewCardPositionerVariants = popoverPositionerVariants
export const previewCardPopupVariants = popoverPopupVariants
export const previewCardArrowVariants = popoverArrowVariants
export const previewCardViewportVariants = popoverViewportVariants

export const previewCardTriggerVariants = cva(
  "inline-flex outline-none focus-visible:ring-(length:--lex-popover-focus-ring-width) focus-visible:ring-(--lex-popover-focus-ring-color)",
)
