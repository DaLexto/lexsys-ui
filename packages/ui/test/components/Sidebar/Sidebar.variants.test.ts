import { describe, expect, it } from "vitest"
import {
  sidebarGroupClasses,
  sidebarGroupContentClasses,
  sidebarNavClasses,
  sidebarNavItemClasses,
  sidebarNavListClasses,
  sidebarSeparatorClasses,
  sidebarSubListClasses,
} from "../../../src/components/blocks/Sidebar/Sidebar.variants"
import { testCssVarPrefix as p } from "../../config/prefix.js"

describe("Sidebar variants", () => {
  it("uses token-backed nav shell rhythm slots", () => {
    expect(sidebarNavClasses()).toContain(`p-(--${p}-sidebar-nav-padding)`)
    expect(sidebarNavListClasses()).toContain(`gap-(--${p}-sidebar-list-gap)`)
    expect(sidebarSubListClasses()).toContain(`gap-(--${p}-sidebar-list-gap)`)
    expect(sidebarGroupClasses()).toContain(`gap-(--${p}-sidebar-group-gap)`)
    expect(sidebarGroupContentClasses()).toContain(
      `gap-(--${p}-sidebar-group-gap)`,
    )
    expect(sidebarSeparatorClasses()).toContain(
      `my-(--${p}-sidebar-separator-margin-y)`,
    )
  })

  it("uses token-backed item padding and intra-row gap", () => {
    const classes = sidebarNavItemClasses()

    expect(classes).toContain(`gap-(--${p}-sidebar-item-gap)`)
    expect(classes).toContain(`px-(--${p}-sidebar-item-padding-x)`)
    expect(classes).toContain(`py-(--${p}-sidebar-item-padding-y)`)
  })
})
