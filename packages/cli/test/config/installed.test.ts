import { describe, expect, test } from "vitest"
import {
  addInstalled,
  isInstalled,
  isLegacyInstalledRecord,
  normalizeInstalled,
  removeInstalled,
} from "../../src/config/installed.js"

describe("installed config helpers", () => {
  test("isLegacyInstalledRecord detects record-shaped installed maps", () => {
    expect(isLegacyInstalledRecord({ button: "0.0.1" })).toBe(true)
    expect(isLegacyInstalledRecord(["button"])).toBe(false)
    expect(isLegacyInstalledRecord(undefined)).toBe(false)
  })

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
