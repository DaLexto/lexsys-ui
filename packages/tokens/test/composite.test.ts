import { describe, expect, it } from "vitest"

import {
  collectCompositeAtomicPaths,
  getCompositeBranchInfo,
  isCompositeBranch,
  normalizeCompositeBranches,
  resolveCompositeSlotType,
} from "../src/engine/composite"
import type { TokenTree } from "../src/types"

const typographyControlFixture: TokenTree = {
  control: {
    md: {
      fontFamily: { $value: "{typography.family.sans}" },
      fontSize: { $value: "{font-size.sm}" },
      fontWeight: { $value: "{font-weight.medium}" },
      lineHeight: { $value: "{line-height.tight}" },
      letterSpacing: { $value: "{letter-spacing.normal}" },
    },
  },
}

describe("composite resolver", () => {
  it("detects typography role groups by slot pattern", () => {
    expect(isCompositeBranch(typographyControlFixture.control)).toBe(true)
    expect(
      getCompositeBranchInfo(typographyControlFixture.control ?? {}),
    ).toEqual({
      compositeType: "typography",
      path: [],
    })
  })

  it("does not treat typography family groups as composite role groups", () => {
    const familyBranch: TokenTree = {
      family: {
        $type: "fontFamily",
        sans: { $value: "{font-family.sans}" },
      },
    }

    expect(isCompositeBranch(familyBranch.family)).toBe(false)
  })

  it("normalizes missing typography $type on role groups", () => {
    const normalized = normalizeCompositeBranches(typographyControlFixture)

    expect(normalized.control?.$type).toBe("typography")
    expect(normalized.control?.md?.fontSize).toEqual({
      $value: "{font-size.sm}",
    })
  })

  it("collects dotted paths for composite slot leaves", () => {
    const paths = collectCompositeAtomicPaths(typographyControlFixture)

    expect(paths).toEqual([
      {
        compositeType: "typography",
        path: "control.md.fontFamily",
      },
      {
        compositeType: "typography",
        path: "control.md.fontSize",
      },
      {
        compositeType: "typography",
        path: "control.md.fontWeight",
      },
      {
        compositeType: "typography",
        path: "control.md.lineHeight",
      },
      {
        compositeType: "typography",
        path: "control.md.letterSpacing",
      },
    ])
  })

  it("resolves composite slot types from schema", () => {
    expect(resolveCompositeSlotType("typography", "fontSize")).toBe("fontSize")
    expect(resolveCompositeSlotType("typography", "lineHeight")).toBe("number")
    expect(resolveCompositeSlotType("typography", "unknown")).toBeUndefined()
  })
})
