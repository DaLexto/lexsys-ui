/**
 * FilterToolbar.variants.ts
 *
 * Variant classes for the FilterToolbar block.
 */

export const filterToolbarClasses = (): string => {
  return [
    "lex-filter-toolbar",
    "flex flex-wrap items-center gap-(--lex-toolbar-root-gap)",
    "rounded-(--lex-toolbar-radius)",
    "border border-(--lex-toolbar-root-border-color)",
    "bg-(--lex-toolbar-root-background)",
    "p-(--lex-toolbar-root-padding)",
  ].join(" ");
};

export const filterToolbarGroupClasses = (): string => {
  return [
    "lex-filter-toolbar__group flex flex-wrap items-center gap-(--lex-toolbar-group-gap)",
  ].join(" ");
};

export const filterToolbarSearchClasses = (): string => {
  return "lex-filter-toolbar__search min-w-(--lex-size-filter-toolbar-search-min-width,12rem) flex-1";
};

export const filterToolbarSelectTriggerClasses = (): string => {
  return "lex-filter-toolbar__select min-w-(--lex-size-filter-toolbar-select-min-width,8rem)";
};
