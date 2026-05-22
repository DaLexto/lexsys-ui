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
    expect(resolveCompositeSlotType("shadow", "blur")).toBe("dimension")
    expect(resolveCompositeSlotType("border", "style")).toBe("strokeStyle")
    expect(resolveCompositeSlotType("typography", "unknown")).toBeUndefined()
  })

  it("detects shadow role groups by slot pattern", () => {
    const shadowFixture: TokenTree = {
      shadow: {
        floating: {
          color: {
            $value: {
              colorSpace: "oklch",
              components: [0, 0, 0],
              alpha: 0.12,
            },
          },
          offsetX: { $value: "0" },
          offsetY: { $value: "8px" },
          blur: { $value: "16px" },
          spread: { $value: "0" },
          boxShadow: { $value: "0 8px 16px 0 oklch(0 0 0 / 0.12)" },
        },
      },
    }

    expect(isCompositeBranch(shadowFixture.shadow)).toBe(true)
    expect(getCompositeBranchInfo(shadowFixture.shadow ?? {})).toEqual({
      compositeType: "shadow",
      path: [],
    })

    const paths = collectCompositeAtomicPaths(shadowFixture)
    expect(paths.map((entry) => entry.path)).toEqual([
      "shadow.floating.color",
      "shadow.floating.offsetX",
      "shadow.floating.offsetY",
      "shadow.floating.blur",
      "shadow.floating.spread",
    ])
  })

  it("detects border composite role groups", () => {
    const borderFixture: TokenTree = {
      control: {
        color: { $value: "{color.neutral.200}" },
        width: { $value: "{border.thin}" },
        style: { $value: "solid" },
      },
    }

    expect(isCompositeBranch(borderFixture.control)).toBe(true)
    expect(getCompositeBranchInfo(borderFixture.control ?? {})).toEqual({
      compositeType: "border",
      path: [],
    })
  })
})
