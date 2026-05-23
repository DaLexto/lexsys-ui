import { describe, expect, test } from "vitest"
import { sidebarRegistryItem } from "@neurex/registry"
import { registryItems } from "@neurex/registry"
import {
  computeRegistryClosure,
  findOrphanInstalledItems,
} from "../../src/core/registry-closure.js"

describe("registry closure", () => {
  test("computes transitive registryDependencies", () => {
    const closure = computeRegistryClosure(["sidebar"], registryItems)

    expect(closure.has("sidebar")).toBe(true)
    expect(closure.has("button")).toBe(true)
    expect(closure.has("drawer")).toBe(true)
    expect(closure.has("menu")).toBe(true)
    expect(closure.has("scroll-area")).toBe(true)
  })

  test("finds orphan items after removing a block with --with-deps semantics", () => {
    const remainingInstalled = {
      menu: "0.0.1",
      drawer: "0.0.1",
    }

    const orphans = findOrphanInstalledItems(
      [sidebarRegistryItem.name],
      remainingInstalled,
      registryItems,
    )

    expect(orphans.map((item) => item.name).sort()).toEqual(["drawer", "menu"])
  })
})
