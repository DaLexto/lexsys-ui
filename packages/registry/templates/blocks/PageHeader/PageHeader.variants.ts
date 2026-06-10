/**
 * PageHeader.variants.ts
 *
 * Variant classes for the PageHeader block.
 */

export const pageHeaderClasses = (): string => {
  return [
    "lex-page-header",
    "flex flex-col gap-(--lex-page-header-root-gap)",
    "border-b border-(--lex-page-header-root-border-color)",
    "pb-(--lex-page-header-root-padding-bottom)",
  ].join(" ");
};

export const pageHeaderTopClasses = (): string => {
  return "lex-page-header__top flex flex-col gap-(--lex-page-header-top-gap)";
};

export const pageHeaderHeadingClasses = (): string => {
  return "lex-page-header__heading flex flex-col gap-(--lex-page-header-heading-gap)";
};

export const pageHeaderTitleClasses = (): string => {
  return [
    "lex-page-header__title",
    "m-0 text-(length:--lex-typography-heading-lg-font-size)",
    "font-(--lex-typography-heading-lg-font-weight)",
    "leading-(--lex-typography-heading-lg-font-line-height)",
    "text-(--lex-color-text-primary)",
  ].join(" ");
};

export const pageHeaderDescriptionClasses = (): string => {
  return [
    "lex-page-header__description",
    "m-0 text-(length:--lex-typography-body-sm-font-size)",
    "leading-(--lex-typography-body-sm-font-line-height)",
    "text-(--lex-color-text-secondary)",
  ].join(" ");
};

export const pageHeaderActionsClasses = (): string => {
  return "lex-page-header__actions flex flex-wrap items-center gap-(--lex-page-header-actions-gap)";
};

export const pageHeaderBreadcrumbClasses = (): string => {
  return "lex-page-header__breadcrumb";
};
