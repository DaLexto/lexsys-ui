/**
 * Empty.variants.ts
 *
 * Variant classes for the Empty block.
 */

export const emptyClasses = (): string => {
  return [
    "lex-empty",
    "flex w-full flex-col items-center justify-center text-center",
    "gap-(--lex-empty-gap) p-(--lex-empty-padding)",
  ].join(" ")
}

export const emptyHeaderClasses = (): string => {
  return [
    "lex-empty__header",
    "flex flex-col items-center",
    "gap-(--lex-empty-header-gap)",
  ].join(" ")
}

export const emptyMediaClasses = (): string => {
  return [
    "lex-empty__media",
    "flex items-center justify-center",
    "size-(--lex-empty-media-size) text-(--lex-empty-media-foreground)",
  ].join(" ")
}

export const emptyTitleClasses = (): string => {
  return [
    "lex-empty__title",
    "text-(length:--lex-empty-title-font-size) font-(--lex-empty-title-font-weight)",
    "leading-(--lex-empty-title-font-line-height) text-(--lex-empty-title-foreground)",
    "m-0",
  ].join(" ")
}

export const emptyDescriptionClasses = (): string => {
  return [
    "lex-empty__description",
    "text-(length:--lex-empty-description-font-size)",
    "leading-(--lex-empty-description-font-line-height) text-(--lex-empty-description-foreground)",
    "m-0",
  ].join(" ")
}

export const emptyContentClasses = (): string => {
  return "lex-empty__content flex items-center justify-center gap-(--lex-empty-gap)"
}
