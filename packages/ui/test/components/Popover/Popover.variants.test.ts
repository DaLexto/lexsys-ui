import { describe, expect, test } from "vitest"
import {
  popoverPopupVariants,
  popoverTriggerVariants,
} from "../../../src/components/primitives/Popover/Popover.variants"
import { testCssVarPrefix as p } from "../../config/prefix.js"

describe("Popover variants", () => {
  test("uses component token variables for the trigger", () => {
    expect(popoverTriggerVariants()).toContain(
      `bg-(--${p}-popover-trigger-background)`,
    )
  })

  test("uses component token variables for the popup", () => {
    expect(popoverPopupVariants()).toContain(
      `bg-(--${p}-popover-popup-background)`,
    )
  })
})
