import { describe, expect, it } from "vitest"
import {
  sidebarGroupClasses,
  sidebarGroupContentClasses,
  sidebarItemRowClasses,
  sidebarNavClasses,
  sidebarNavItemClasses,
  sidebarNavItemExpandTriggerClasses,
  sidebarNavItemRowLeadClasses,
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

  it("uses token-backed item padding, min-height, and intra-row gap", () => {
    const classes = sidebarNavItemClasses()

    expect(classes).toContain(`min-h-(--${p}-sidebar-item-height-min)`)
    expect(classes).toContain(`gap-(--${p}-sidebar-item-gap)`)
    expect(classes).toContain(`px-(--${p}-sidebar-item-padding-x)`)
    expect(classes).toContain(`py-(--${p}-sidebar-item-padding-y)`)
  })

  it("uses unified item row shell for split lead and expand trigger", () => {
    expect(sidebarItemRowClasses()).toContain(
      `min-h-(--${p}-sidebar-item-height-min)`,
    )
    expect(sidebarNavItemRowLeadClasses()).toContain("rounded-e-none")
    expect(sidebarNavItemExpandTriggerClasses(true)).toContain(
      `[&>svg]:rotate-180`,
    )
    expect(sidebarNavItemExpandTriggerClasses()).toContain(
      `w-(--${p}-sidebar-item-height-min)`,
    )
  })

  it("uses inset focus ring for dense nav lists", () => {
    const classes = sidebarNavItemClasses()

    expect(classes).toContain(
      `focus-visible:ring-(length:--${p}-sidebar-item-focus-ring-width)`,
    )
    expect(classes).toContain("focus-visible:ring-inset")
    expect(classes).toContain(
      `focus-visible:ring-(--${p}-sidebar-item-focus-ring-color)`,
    )
    expect(classes).not.toContain("ring-offset")
  })
})
