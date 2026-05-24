import { describe, expect, test } from "vitest"
import {
  popoverPopupVariants,
  popoverTriggerVariants,
} from "../../../src/components/primitives/Popover/Popover.variants"

describe("Popover variants", () => {
  test("uses component token variables for the trigger", () => {
    expect(popoverTriggerVariants()).toContain(
      "bg-(--lsys-popover-trigger-background)",
    )
  })

  test("uses component token variables for the popup", () => {
    expect(popoverPopupVariants()).toContain(
      "bg-(--lsys-popover-popup-background)",
    )
  })
})
