import { describe, expect, it } from "vitest"
import {
  accordionPanelVariants,
  accordionTriggerVariants,
} from "../../../src/components/Accordion/Accordion.variants.js"

describe("accordionVariants", () => {
  it("styles trigger and panel text", () => {
    expect(accordionTriggerVariants()).toContain(
      "hover:bg-[var(--nx-accordion-trigger-background-hover)]",
    )
    expect(accordionPanelVariants()).toContain(
      "text-[var(--nx-accordion-panel-foreground)]",
    )
  })
})
