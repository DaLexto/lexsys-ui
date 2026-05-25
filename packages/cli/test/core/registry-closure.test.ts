import { describe, expect, test } from "vitest"
import { sidebarRegistryItem } from "@lexsys/registry"
import { registryItems } from "@lexsys/registry"
import {
  computeRegistryClosure,
  findOrphanInstalledItems,
} from "../../src/registry/closure.js"

describe("registry closure", () => {
  test("computes transitive registryDependencies", () => {
    const closure = computeRegistryClosure(["sidebar"], registryItems)

    expect(closure.has("sidebar")).toBe(true)
    expect(closure.has("button")).toBe(true)
    expect(closure.has("drawer")).toBe(true)
    expect(closure.has("scroll-area")).toBe(true)
    expect(closure.has("menu")).toBe(false)
  })

  test("finds orphan items after removing a block with --with-deps semantics", () => {
    const remainingInstalled = {
      drawer: "0.0.1",
    }

    const orphans = findOrphanInstalledItems(
      [sidebarRegistryItem.name],
      remainingInstalled,
      registryItems,
    )

    expect(orphans.map((item) => item.name).sort()).toEqual(["drawer"])
  })
})
