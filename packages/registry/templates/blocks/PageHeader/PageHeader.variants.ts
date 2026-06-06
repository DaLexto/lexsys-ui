/**
 * PageHeader.variants.ts
 *
 * Variant classes for the PageHeader block.
 */

export const pageHeaderClasses = (): string => {
  return [
    "lex-page-header",
    "flex flex-col gap-(--lex-space-4)",
    "border-b border-(--lex-border-default) pb-(--lex-space-4)",
  ].join(" ")
}

export const pageHeaderTopClasses = (): string => {
  return "lex-page-header__top flex flex-col gap-(--lex-space-3)"
}

export const pageHeaderHeadingClasses = (): string => {
  return "lex-page-header__heading flex flex-col gap-(--lex-space-1)"
}

export const pageHeaderTitleClasses = (): string => {
  return [
    "lex-page-header__title",
    "m-0 text-(length:--lex-typography-heading-lg-font-size)",
    "font-(--lex-typography-heading-lg-font-weight)",
    "leading-(--lex-typography-heading-lg-font-line-height)",
    "text-(--lex-color-text-primary)",
  ].join(" ")
}

export const pageHeaderDescriptionClasses = (): string => {
  return [
    "lex-page-header__description",
    "m-0 text-(length:--lex-typography-body-sm-font-size)",
    "leading-(--lex-typography-body-sm-font-line-height)",
    "text-(--lex-color-text-secondary)",
  ].join(" ")
}

export const pageHeaderActionsClasses = (): string => {
  return "lex-page-header__actions flex flex-wrap items-center gap-(--lex-space-2)"
}

export const pageHeaderBreadcrumbClasses = (): string => {
  return "lex-page-header__breadcrumb"
}
