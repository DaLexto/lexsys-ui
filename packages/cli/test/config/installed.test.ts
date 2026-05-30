import { describe, expect, test } from "vitest"
import {
  addInstalled,
  isInstalled,
  normalizeInstalled,
  removeInstalled,
} from "../../src/config/installed.js"

describe("installed config helpers", () => {
  test("normalizeInstalled migrates legacy record maps to name lists", () => {
    expect(normalizeInstalled({ button: "0.0.1", card: "0.0.2" })).toEqual([
      "button",
      "card",
    ])
  })

  test("add and remove preserve case-insensitive uniqueness", () => {
    let installed = ["button"]

    installed = addInstalled(installed, "Button")
    expect(installed).toEqual(["button"])

    installed = removeInstalled(installed, "BUTTON")
    expect(installed).toEqual([])
    expect(isInstalled(installed, "button")).toBe(false)
  })
})
