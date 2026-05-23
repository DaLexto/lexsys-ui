import { describe, expect, it } from "vitest"
import {
  collapsiblePanelVariants,
  collapsibleTriggerVariants,
  collapsibleVariants,
} from "../../../src/components/primitives/Collapsible/Collapsible.variants.js"

describe("collapsibleVariants", () => {
  it("includes token-backed surface, trigger, and panel classes", () => {
    expect(collapsibleVariants({ variant: "surface" })).toContain(
      "border-(--nx-collapsible-border-color)",
    )
    expect(collapsibleTriggerVariants()).toContain(
      "data-[panel-open]:[&>svg]:rotate-45",
    )
    expect(collapsiblePanelVariants()).toContain(
      "pb-(--nx-collapsible-panel-padding-bottom)",
    )
  })
})
