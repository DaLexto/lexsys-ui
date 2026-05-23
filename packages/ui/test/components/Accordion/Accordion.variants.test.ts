import { describe, expect, it } from "vitest"
import {
  accordionPanelVariants,
  accordionTriggerVariants,
} from "../../../src/components/primitives/Accordion/Accordion.variants.js"

describe("accordionVariants", () => {
  it("styles trigger and panel text", () => {
    expect(accordionTriggerVariants()).toContain(
      "hover:bg-(--nx-accordion-trigger-background-hover)",
    )
    expect(accordionPanelVariants()).toContain(
      "text-(--nx-accordion-panel-foreground)",
    )
  })
})
