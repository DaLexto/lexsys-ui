import { describe, expect, it } from "vitest"
import {
  accordionPanelVariants,
  accordionTriggerVariants,
} from "../../../src/components/primitives/Accordion/Accordion.variants.js"

describe("accordionVariants", () => {
  it("styles trigger and panel text", () => {
    expect(accordionTriggerVariants()).toContain(
      "hover:bg-(--lsys-accordion-trigger-background-hover)",
    )
    expect(accordionPanelVariants()).toContain(
      "text-(--lsys-accordion-panel-foreground)",
    )
  })
})
