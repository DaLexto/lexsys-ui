import { describe, expect, it } from "vitest"
import {
  sidebarBrandClasses,
  sidebarFooterClasses,
  sidebarGroupClasses,
  sidebarGroupContentClasses,
  sidebarGroupLabelClasses,
  sidebarMobileBarClasses,
  sidebarItemDisclosureRowClasses,
  sidebarItemIconClasses,
  sidebarItemRowClasses,
  sidebarItemTrailingClasses,
  sidebarNavClasses,
  sidebarNavItemClasses,
  sidebarNavItemDisclosureLeadClasses,
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
    expect(sidebarSeparatorClasses()).toContain(
      `mx-(--${p}-sidebar-separator-margin-x)`,
    )
  })

  it("uses token-backed brand, footer, mobile bar, and group label shell slots", () => {
    expect(sidebarBrandClasses()).toContain(
      `px-(--${p}-sidebar-brand-padding-x)`,
    )
    expect(sidebarBrandClasses()).toContain(
      `border-(--${p}-sidebar-brand-border-color)`,
    )
    expect(sidebarFooterClasses()).toContain(
      `p-(--${p}-sidebar-footer-padding)`,
    )
    expect(sidebarMobileBarClasses()).toContain(
      `gap-(--${p}-sidebar-mobile-bar-gap)`,
    )
    expect(sidebarMobileBarClasses()).not.toContain(`--${p}-space-`)
    expect(sidebarGroupLabelClasses()).toContain(
      `gap-(--${p}-sidebar-group-label-gap)`,
    )
    expect(sidebarGroupLabelClasses()).not.toContain(`--${p}-space-`)
  })

  it("uses token-backed item padding, min-height, and intra-row gap", () => {
    const classes = sidebarNavItemClasses()

    expect(classes).toContain(`min-h-(--${p}-sidebar-item-height-min)`)
    expect(classes).toContain(`gap-(--${p}-sidebar-item-gap)`)
    expect(classes).toContain(`px-(--${p}-sidebar-item-padding-x)`)
    expect(classes).toContain(`py-(--${p}-sidebar-item-padding-y)`)
  })

  it("uses trailing slot inside item shell for badge and shortcut", () => {
    expect(sidebarItemTrailingClasses()).toContain("ms-auto")
    expect(sidebarItemTrailingClasses()).toContain(
      `gap-(--${p}-sidebar-item-gap)`,
    )
    expect(sidebarItemTrailingClasses()).toContain("lex-sidebar__item-trailing")
  })

  it("uses disclosure row shell for split lead and expand trigger", () => {
    expect(sidebarItemDisclosureRowClasses()).toContain(
      `min-h-(--${p}-sidebar-item-height-min)`,
    )
    expect(sidebarItemDisclosureRowClasses()).toContain(
      "lex-sidebar__item-row--disclosure",
    )
    expect(sidebarNavItemDisclosureLeadClasses()).toContain("rounded-e-none")
    expect(sidebarNavItemDisclosureLeadClasses()).toContain("bg-transparent")
    expect(sidebarNavItemRowLeadClasses()).toContain("rounded-e-none")
    expect(sidebarNavItemExpandTriggerClasses(true, "disclosure")).toContain(
      `[&>svg]:rotate-180`,
    )
    expect(sidebarNavItemExpandTriggerClasses(false, "disclosure")).toContain(
      "hover:bg-transparent",
    )
    expect(sidebarItemRowClasses()).toContain(
      `min-h-(--${p}-sidebar-item-height-min)`,
    )
    expect(sidebarNavItemExpandTriggerClasses()).toContain(
      `w-(--${p}-sidebar-item-height-min)`,
    )
  })

  it("bumps nav icon size in desktop icon-collapsed mode", () => {
    const classes = sidebarItemIconClasses()

    expect(classes).toContain(`size-(--${p}-sidebar-item-icon-size)`)
    expect(classes).toContain(
      `md:group-data-[collapsed=true]/sidebar:size-(--${p}-sidebar-item-icon-size-collapsed)`,
    )
    expect(classes).toContain(`duration-(--${p}-sidebar-transition-duration)`)
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
