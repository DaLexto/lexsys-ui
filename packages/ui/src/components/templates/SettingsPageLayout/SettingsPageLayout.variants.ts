/**
 * SettingsPageLayout.variants.ts
 *
 * Variant classes for the SettingsPageLayout template.
 */

export const settingsPageLayoutClasses = (): string => {
  return [
    "lex-settings-page-layout",
    "flex min-h-full flex-col",
    "bg-(--lex-settings-page-layout-root-background)",
    "text-(--lex-settings-page-layout-root-foreground)",
  ].join(" ");
};

export const settingsPageLayoutHeaderClasses = (): string => {
  return [
    "lex-settings-page-layout__header",
    "px-(--lex-settings-page-layout-header-padding-x)",
    "pt-(--lex-settings-page-layout-header-padding-top)",
  ].join(" ");
};

export const settingsPageLayoutBodyClasses = (): string => {
  return [
    "lex-settings-page-layout__body",
    "flex flex-1 flex-col gap-(--lex-settings-page-layout-body-gap)",
    "px-(--lex-settings-page-layout-body-padding-x)",
    "pb-(--lex-settings-page-layout-body-padding-bottom)",
    "lg:flex-row lg:items-start",
  ].join(" ");
};

export const settingsPageLayoutNavClasses = (): string => {
  return [
    "lex-settings-page-layout__nav",
    "flex w-full shrink-0 flex-col gap-(--lex-settings-page-layout-nav-gap)",
    "lg:w-(--lex-settings-page-layout-nav-width)",
  ].join(" ");
};

export const settingsPageLayoutMainClasses = (): string => {
  return [
    "lex-settings-page-layout__main",
    "flex min-w-0 flex-1 flex-col gap-(--lex-settings-page-layout-main-gap)",
  ].join(" ");
};

export const settingsPageLayoutPanelClasses = (): string => {
  return "lex-settings-page-layout__panel w-full";
};
