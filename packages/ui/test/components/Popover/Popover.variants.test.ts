import { describe, expect, test } from "vitest"
import {
  popoverPopupVariants,
  popoverTriggerVariants,
} from "../../../src/components/primitives/Popover/Popover.variants"

describe("Popover variants", () => {
  test("uses component token variables for the trigger", () => {
    expect(popoverTriggerVariants()).toContain(
      "bg-(--lex-popover-trigger-background)",
    )
  })

  test("uses component token variables for the popup", () => {
    expect(popoverPopupVariants()).toContain(
      "bg-(--lex-popover-popup-background)",
    )
  })
})
