import { describe, expect, it } from "vitest"
import {
  settingsPageLayoutBodyClasses,
  settingsPageLayoutClasses,
  settingsPageLayoutHeaderClasses,
  settingsPageLayoutMainClasses,
  settingsPageLayoutNavClasses,
} from "../../../src/components/templates/SettingsPageLayout/SettingsPageLayout.variants"
import { testCssVarPrefix as p } from "../../config/prefix.js"

describe("SettingsPageLayout variants", () => {
  it("uses settings-page-layout component tokens for root chrome", () => {
    expect(settingsPageLayoutClasses()).toContain(
      `bg-(--${p}-settings-page-layout-root-background)`,
    )
    expect(settingsPageLayoutClasses()).not.toContain(`--${p}-space-`)
  })

  it("uses settings-page-layout component tokens for header, body, nav, and main", () => {
    expect(settingsPageLayoutHeaderClasses()).toContain(
      `px-(--${p}-settings-page-layout-header-padding-x)`,
    )
    expect(settingsPageLayoutBodyClasses()).toContain(
      `gap-(--${p}-settings-page-layout-body-gap)`,
    )
    expect(settingsPageLayoutNavClasses()).toContain(
      `lg:w-(--${p}-settings-page-layout-nav-width)`,
    )
    expect(settingsPageLayoutMainClasses()).toContain(
      `gap-(--${p}-settings-page-layout-main-gap)`,
    )
    expect(settingsPageLayoutBodyClasses()).not.toContain(`--${p}-space-`)
  })
})
