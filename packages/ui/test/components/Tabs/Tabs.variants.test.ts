import { describe, expect, it } from "vitest"
import {
  tabsListVariants,
  tabsTabVariants,
} from "../../../src/components/primitives/Tabs/Tabs.variants.js"

describe("tabsVariants", () => {
  it("styles list and active tab state", () => {
    expect(tabsListVariants()).toContain("bg-(--nx-tabs-list-background)")
    expect(tabsTabVariants()).toContain(
      "data-[active]:bg-(--nx-tabs-tab-active-background)",
    )
  })
})
