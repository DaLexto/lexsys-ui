import { describe, expect, it } from "vitest"
import {
  accordionPanelVariants,
  accordionTriggerVariants,
} from "../../../src/components/primitives/Accordion/Accordion.variants.js"
import { testCssVarPrefix as p } from "../../config/prefix.js"

describe("accordionVariants", () => {
  it("styles trigger and panel text", () => {
    expect(accordionTriggerVariants()).toContain(
      `hover:bg-(--${p}-accordion-trigger-background-hover)`,
    )
    expect(accordionPanelVariants()).toContain(
      `text-(--${p}-accordion-panel-foreground)`,
    )
  })
})
