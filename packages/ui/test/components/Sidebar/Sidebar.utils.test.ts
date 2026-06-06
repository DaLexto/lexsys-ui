import { describe, expect, it } from "vitest"
import { isSidebarNavActive } from "../../../src/components/blocks/Sidebar/Sidebar.utils.js"

describe("isSidebarNavActive", () => {
  it("matches root only with default end semantics", () => {
    expect(isSidebarNavActive("/", "/")).toBe(true)
    expect(isSidebarNavActive("/billing", "/")).toBe(false)
  })

  it("matches exact paths by default", () => {
    expect(isSidebarNavActive("/billing", "/billing")).toBe(true)
    expect(isSidebarNavActive("/billing/extra", "/billing")).toBe(false)
  })

  it("supports prefix matching when end is false", () => {
    expect(
      isSidebarNavActive("/settings/profile", "/settings", { end: false }),
    ).toBe(true)
    expect(isSidebarNavActive("/settings", "/settings", { end: false })).toBe(
      true,
    )
    expect(
      isSidebarNavActive("/settings-old", "/settings", { end: false }),
    ).toBe(false)
  })

  it("forces exact match when end is true", () => {
    expect(
      isSidebarNavActive("/settings/profile", "/settings", { end: true }),
    ).toBe(false)
  })

  it("strips query, hash, and trailing slashes", () => {
    expect(isSidebarNavActive("/billing?tab=1", "/billing")).toBe(true)
    expect(isSidebarNavActive("/billing/", "/billing")).toBe(true)
    expect(isSidebarNavActive("billing", "/billing")).toBe(true)
  })
})
