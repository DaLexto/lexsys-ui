/**
 * Shared CVA state fragments backed by semantic opacity tokens.
 */

export const disabledStateClasses = [
  "disabled:pointer-events-none disabled:opacity-(--nx-opacity-disabled)",
  "data-[disabled]:pointer-events-none data-[disabled]:opacity-(--nx-opacity-disabled)",
].join(" ")

export const busyStateClasses =
  "aria-busy:cursor-wait aria-busy:opacity-(--nx-opacity-busy)"

export const invalidStateClasses = [
  "aria-invalid:border-(--nx-input-invalid-border-color)",
  "aria-invalid:ring-(--nx-input-invalid-ring-color)",
  "data-[invalid]:border-(--nx-input-invalid-border-color)",
  "data-[invalid]:ring-(--nx-input-invalid-ring-color)",
].join(" ")
