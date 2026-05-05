import { describe, expect, it } from "vitest"
import {
  tabsListVariants,
  tabsTabVariants,
} from "../../../src/components/Tabs/Tabs.variants.js"

describe("tabsVariants", () => {
  it("styles list and active tab state", () => {
    expect(tabsListVariants()).toContain("bg-[var(--nx-tabs-list-background)]")
    expect(tabsTabVariants()).toContain(
      "data-[active]:bg-[var(--nx-tabs-tab-active-background)]",
    )
  })
})
