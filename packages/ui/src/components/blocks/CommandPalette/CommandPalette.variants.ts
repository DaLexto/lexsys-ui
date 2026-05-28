/**
 * CommandPalette.variants.ts
 *
 * Variant classes for the CommandPalette block.
 */

export const commandPaletteRootClasses =
  "lsys-command-palette flex flex-col gap-(--lsys-space-2)"

export const commandPaletteInputClasses = "w-full"

export const commandPaletteListClasses =
  "flex max-h-(--lsys-size-command-palette-list-max-height,16rem) flex-col"

export const commandPaletteGroupLabelClasses =
  "px-(--lsys-space-3) py-(--lsys-space-1) text-(length:--lsys-typography-label-xs-font-size) font-(--lsys-typography-label-xs-font-weight) text-(--lsys-color-text-secondary)"

export const commandPaletteItemClasses =
  "flex w-full flex-col items-start gap-(--lsys-space-1) rounded-(--lsys-radius-control) px-(--lsys-space-3) py-(--lsys-space-2) text-left text-(--lsys-color-text-primary) outline-none transition-colors hover:bg-(--lsys-action-secondary-hover) focus-visible:bg-(--lsys-action-secondary-hover)"

export const commandPaletteItemDescriptionClasses =
  "text-(length:--lsys-typography-body-xs-font-size) text-(--lsys-color-text-secondary)"

export const commandPaletteEmptyClasses =
  "px-(--lsys-space-3) py-(--lsys-space-4) text-(length:--lsys-typography-body-sm-font-size) text-(--lsys-color-text-secondary)"
