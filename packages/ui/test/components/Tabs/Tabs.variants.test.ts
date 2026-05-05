import { describe, expect, it } from "vitest"
import {
  tabsListVariants,
  tabsTabVariants,
} from "../../../src/components/Tabs/Tabs.variants.js"

describe("tabsVariants", () => {
  it("styles list and active tab state", () => {
    expect(tabsListVariants()).toContain("bg-nx-muted")
    expect(tabsTabVariants()).toContain("data-[active]:bg-nx-background")
  })
})
