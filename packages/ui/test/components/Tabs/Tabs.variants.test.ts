import { describe, expect, it } from "vitest"
import {
  tabsListVariants,
  tabsTabVariants,
} from "../../../src/components/primitives/Tabs/Tabs.variants.js"
import { testCssVarPrefix as p } from "../../config/prefix.js"

describe("tabsVariants", () => {
  it("styles list and active tab state", () => {
    expect(tabsListVariants()).toContain(`bg-(--${p}-tabs-list-background)`)
    expect(tabsTabVariants()).toContain(
      `data-[active]:bg-(--${p}-tabs-tab-active-background)`,
    )
  })
})
