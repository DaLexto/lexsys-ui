import { describe, expect, it } from "vitest"
import {
  dashboardShellClasses,
  dashboardShellContentClasses,
  dashboardShellHeaderClasses,
  dashboardShellMainClasses,
} from "../../../src/components/templates/DashboardShell/DashboardShell.variants"
import { testCssVarPrefix as p } from "../../config/prefix.js"

describe("DashboardShell variants", () => {
  it("uses dashboard-shell component tokens for root and main chrome", () => {
    expect(dashboardShellClasses()).toContain(
      `bg-(--${p}-dashboard-shell-root-background)`,
    )
    expect(dashboardShellClasses()).toContain(
      `text-(--${p}-dashboard-shell-root-foreground)`,
    )
    expect(dashboardShellMainClasses()).toContain(
      `bg-(--${p}-dashboard-shell-main-background)`,
    )
    expect(dashboardShellClasses()).not.toContain(`--${p}-space-`)
  })

  it("uses dashboard-shell component tokens for header and content padding", () => {
    expect(dashboardShellHeaderClasses()).toContain(
      `px-(--${p}-dashboard-shell-header-padding-x)`,
    )
    expect(dashboardShellHeaderClasses()).toContain(
      `py-(--${p}-dashboard-shell-header-padding-y)`,
    )
    expect(dashboardShellHeaderClasses()).toContain(
      `border-(--${p}-dashboard-shell-header-border-color)`,
    )
    expect(dashboardShellContentClasses()).toContain(
      `p-(--${p}-dashboard-shell-content-padding)`,
    )
    expect(dashboardShellHeaderClasses()).not.toContain(`--${p}-space-`)
    expect(dashboardShellContentClasses()).not.toContain(`--${p}-space-`)
  })
})
