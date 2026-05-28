/**
 * CommandPalette.variants.ts
 *
 * Variant classes for the CommandPalette block.
 */

export const commandPaletteRootClasses =
  "lex-command-palette flex flex-col gap-(--lex-space-2)"

export const commandPaletteInputClasses = "w-full"

export const commandPaletteListClasses =
  "flex max-h-(--lex-size-command-palette-list-max-height,16rem) flex-col"

export const commandPaletteGroupLabelClasses =
  "px-(--lex-space-3) py-(--lex-space-1) text-(length:--lex-typography-label-xs-font-size) font-(--lex-typography-label-xs-font-weight) text-(--lex-color-text-secondary)"

export const commandPaletteItemClasses =
  "flex w-full flex-col items-start gap-(--lex-space-1) rounded-(--lex-radius-control) px-(--lex-space-3) py-(--lex-space-2) text-left text-(--lex-color-text-primary) outline-none transition-colors hover:bg-(--lex-action-secondary-hover) focus-visible:bg-(--lex-action-secondary-hover)"

export const commandPaletteItemDescriptionClasses =
  "text-(length:--lex-typography-body-xs-font-size) text-(--lex-color-text-secondary)"

export const commandPaletteEmptyClasses =
  "px-(--lex-space-3) py-(--lex-space-4) text-(length:--lex-typography-body-sm-font-size) text-(--lex-color-text-secondary)"
