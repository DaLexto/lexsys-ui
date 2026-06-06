/**
 * SettingsPageLayout.variants.ts
 *
 * Variant classes for the SettingsPageLayout template.
 */

export const settingsPageLayoutClasses = (): string => {
  return [
    "lex-settings-page-layout",
    "flex min-h-full flex-col",
    "bg-(--lex-color-background-base) text-(--lex-color-text-primary)",
  ].join(" ")
}

export const settingsPageLayoutHeaderClasses = (): string => {
  return "lex-settings-page-layout__header px-(--lex-space-4) pt-(--lex-space-4)"
}

export const settingsPageLayoutBodyClasses = (): string => {
  return [
    "lex-settings-page-layout__body",
    "flex flex-1 flex-col gap-(--lex-space-4)",
    "px-(--lex-space-4) pb-(--lex-space-4)",
    "lg:flex-row lg:items-start",
  ].join(" ")
}

export const settingsPageLayoutNavClasses = (): string => {
  return [
    "lex-settings-page-layout__nav",
    "flex w-full shrink-0 flex-col gap-(--lex-space-3)",
    "lg:w-(--lex-size-settings-page-nav-width,16rem)",
  ].join(" ")
}

export const settingsPageLayoutMainClasses = (): string => {
  return "lex-settings-page-layout__main flex min-w-0 flex-1 flex-col gap-(--lex-space-4)"
}

export const settingsPageLayoutPanelClasses = (): string => {
  return "lex-settings-page-layout__panel w-full"
}
