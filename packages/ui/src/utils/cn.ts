import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export const cn = (...inputs: ClassValue[]): string => {
  return twMerge(clsx(inputs))
}

/**
 * Shared CVA state fragments backed by semantic opacity tokens.
 * Installed consumers import these from `@/lib/utils`.
 */
export const disabledStateClasses = [
  "disabled:pointer-events-none disabled:opacity-(--lex-opacity-disabled)",
  "data-[disabled]:pointer-events-none data-[disabled]:opacity-(--lex-opacity-disabled)",
].join(" ")

export const busyStateClasses =
  "aria-busy:cursor-wait aria-busy:opacity-(--lex-opacity-busy)"

export const invalidStateClasses = [
  "aria-invalid:border-(--lex-input-invalid-border-color)",
  "aria-invalid:ring-(--lex-input-invalid-ring-color)",
  "data-[invalid]:border-(--lex-input-invalid-border-color)",
  "data-[invalid]:ring-(--lex-input-invalid-ring-color)",
].join(" ")

/**
 * Default sideOffset for floating Positioner parts.
 * Matches spacing.overlay.sideOffset (spacing.2 = 0.5rem = 8px at a 16px root).
 */
export const overlayPositionerSideOffset = 8
