import { describe, expect, it } from "vitest"
import {
  accordionPanelVariants,
  accordionTriggerVariants,
} from "../../../src/components/Accordion/Accordion.variants.js"

describe("accordionVariants", () => {
  it("styles trigger and panel text", () => {
    expect(accordionTriggerVariants()).toContain("hover:bg-nx-muted")
    expect(accordionPanelVariants()).toContain("text-nx-muted-foreground")
  })
})
