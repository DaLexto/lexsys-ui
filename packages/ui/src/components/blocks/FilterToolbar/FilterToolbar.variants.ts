/**
 * FilterToolbar.variants.ts
 *
 * Variant classes for the FilterToolbar block.
 */

export const filterToolbarClasses = (): string => {
  return [
    "lex-filter-toolbar",
    "flex flex-wrap items-center gap-(--lex-space-2)",
    "rounded-(--lex-radius-control)",
    "border border-(--lex-border-default)",
    "bg-(--lex-color-background-subtle)",
    "p-(--lex-space-2)",
  ].join(" ")
}

export const filterToolbarSearchClasses = (): string => {
  return "lex-filter-toolbar__search min-w-(--lex-size-filter-toolbar-search-min-width,12rem) flex-1"
}

export const filterToolbarSelectTriggerClasses = (): string => {
  return "lex-filter-toolbar__select min-w-(--lex-size-filter-toolbar-select-min-width,8rem)"
}
