import { describe, expect, test } from "vitest"
import {
  popoverPopupVariants,
  popoverTriggerVariants,
} from "../../../src/components/Popover/Popover.variants"

describe("Popover variants", () => {
  test("uses component token variables for the trigger", () => {
    expect(popoverTriggerVariants()).toContain(
      "bg-[var(--nx-popover-trigger-background)]",
    )
  })

  test("uses component token variables for the popup", () => {
    expect(popoverPopupVariants()).toContain(
      "bg-[var(--nx-popover-popup-background)]",
    )
  })
})
