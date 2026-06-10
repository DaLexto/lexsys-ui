/**
 * CommandPalette.variants.ts
 *
 * Variant classes for the CommandPalette block.
 */

export const commandPaletteRootClasses =
  "lex-command-palette flex flex-col gap-(--lex-command-palette-root-gap)";

export const commandPaletteInputClasses = "w-full";

export const commandPaletteListClasses =
  "flex max-h-(--lex-command-palette-list-max-height) flex-col";

export const commandPaletteGroupLabelClasses =
  "px-(--lex-command-palette-group-label-padding-x) py-(--lex-command-palette-group-label-padding-y) text-(length:--lex-typography-label-xs-font-size) font-(--lex-typography-label-xs-font-weight) text-(--lex-color-text-secondary)";

export const commandPaletteItemClasses =
  "flex w-full flex-col items-start gap-(--lex-command-palette-item-gap) rounded-(--lex-command-palette-item-radius) px-(--lex-command-palette-item-padding-x) py-(--lex-command-palette-item-padding-y) text-left text-(--lex-command-palette-item-foreground) outline-none transition-colors hover:bg-(--lex-command-palette-item-hover-background) focus-visible:bg-(--lex-command-palette-item-hover-background)";

export const commandPaletteItemDescriptionClasses =
  "text-(length:--lex-typography-body-xs-font-size) text-(--lex-command-palette-item-description-foreground)";

export const commandPaletteEmptyClasses =
  "px-(--lex-command-palette-empty-padding-x) py-(--lex-command-palette-empty-padding-y) text-(length:--lex-typography-body-sm-font-size) text-(--lex-color-text-secondary)";
