import { describe, expect, it } from "vitest"

import {
  isResolvedColorValue,
  resolveLeafValue,
  resolveLeafValueForTheme,
  resolveLeafValues,
  toContrastReadyColor,
} from "../src/engine/resolver/values"
import type { TokenColorValue, TokenTree, TokenUnitValue } from "../src/types"

const blue600Color: TokenColorValue = {
  colorSpace: "oklch",
  components: [0.546, 0.245, 262.881],
}

const fontSizeSm: TokenUnitValue = {
  value: 14,
  unit: "px",
}

const scalarChainFixture: TokenTree = {
  color: {
    blue: {
      600: { $value: "oklch(0.546 0.245 262.881)" },
    },
    primary: { $value: "{color.blue.600}" },
  },
  button: {
    background: { $value: "{color.primary}" },
  },
}

const structuredColorChainFixture: TokenTree = {
  color: {
    blue: {
      600: { $value: blue600Color },
    },
    accent: { $value: "{color.blue.600}" },
  },
  semantic: {
    action: {
      primary: { $value: "{color.accent}" },
    },
  },
}

const unitChainFixture: TokenTree = {
  "font-size": {
    sm: { $value: fontSizeSm },
  },
  typography: {
    control: {
      md: {
        fontSize: { $value: "{font-size.sm}" },
      },
    },
  },
}

const compositeTypographyFixture: TokenTree = {
  "font-size": {
    sm: { $value: fontSizeSm },
  },
  typography: {
    control: {
      md: {
        fontSize: { $value: "{font-size.sm}" },
        fontWeight: { $value: "500" },
      },
    },
  },
}

const themedSourceFixture = {
  foundationTokens: {
    color: {
      neutral: {
        950: {
          $value: {
            colorSpace: "oklch",
            components: [0.15, 0, 0],
          },
        },
      },
    },
  } satisfies TokenTree,
  componentTokens: {} satisfies TokenTree,
}

const lightOverlayTheme = {
  tokens: {
    color: {
      background: {
        overlay: {
          $value: {
            colorSpace: "oklch",
            components: [0, 0, 0],
            alpha: 0.15,
            hex: "#000000",
          },
        },
      },
    },
  } satisfies TokenTree,
}

const darkOverlayTheme = {
  tokens: {
    color: {
      background: {
        overlay: {
          $value: {
            colorSpace: "oklch",
            components: [0, 0, 0],
            alpha: 0.6,
            hex: "#000000",
          },
        },
      },
    },
  } satisfies TokenTree,
}

describe("resolveLeafValue", () => {
  it("resolves scalar alias chains to terminal primitive values", () => {
    const result = resolveLeafValue(scalarChainFixture, "button.background")

    expect(result.errors).toHaveLength(0)
    expect(result.resolved?.value).toBe("oklch(0.546 0.245 262.881)")
    expect(result.resolved?.referenceChain).toEqual([
      "color.primary",
      "color.blue.600",
    ])
  })

  it("resolves structured OKLCH objects through multi-hop semantic chains", () => {
    const result = resolveLeafValue(
      structuredColorChainFixture,
      "semantic.action.primary",
    )

    expect(result.errors).toHaveLength(0)
    expect(result.resolved?.value).toEqual(blue600Color)
    expect(result.resolved?.referenceChain).toEqual([
      "color.accent",
      "color.blue.600",
    ])
    expect(
      isResolvedColorValue(result.resolved?.value as TokenColorValue),
    ).toBe(true)
    expect(
      toContrastReadyColor(result.resolved?.value as TokenColorValue),
    ).toEqual({
      colorSpace: "oklch",
      components: [0.546, 0.245, 262.881],
      alpha: 1,
    })
  })

  it("resolves TokenUnitValue terminals through alias chains", () => {
    const result = resolveLeafValue(
      unitChainFixture,
      "typography.control.md.fontSize",
    )

    expect(result.errors).toHaveLength(0)
    expect(result.resolved?.value).toEqual(fontSizeSm)
    expect(result.resolved?.referenceChain).toEqual(["font-size.sm"])
  })

  it("resolves composite typography slot leaf paths", () => {
    const result = resolveLeafValue(
      compositeTypographyFixture,
      "typography.control.md.fontSize",
    )

    expect(result.errors).toHaveLength(0)
    expect(result.resolved?.value).toEqual(fontSizeSm)
  })

  it("returns an empty reference chain for literal leaf values", () => {
    const result = resolveLeafValue(
      compositeTypographyFixture,
      "typography.control.md.fontWeight",
    )

    expect(result.errors).toHaveLength(0)
    expect(result.resolved?.value).toBe("500")
    expect(result.resolved?.referenceChain).toEqual([])
  })
})

describe("resolveLeafValueForTheme", () => {
  it("resolves the same semantic path to different overlay values per theme", () => {
    const lightResult = resolveLeafValueForTheme(
      themedSourceFixture,
      lightOverlayTheme,
      "color.background.overlay",
    )
    const darkResult = resolveLeafValueForTheme(
      themedSourceFixture,
      darkOverlayTheme,
      "color.background.overlay",
    )

    expect(lightResult.errors).toHaveLength(0)
    expect(darkResult.errors).toHaveLength(0)
    expect(lightResult.resolved?.value).toEqual({
      colorSpace: "oklch",
      components: [0, 0, 0],
      alpha: 0.15,
      hex: "#000000",
    })
    expect(darkResult.resolved?.value).toEqual({
      colorSpace: "oklch",
      components: [0, 0, 0],
      alpha: 0.6,
      hex: "#000000",
    })
    expect(
      toContrastReadyColor(lightResult.resolved?.value as TokenColorValue),
    ).toMatchObject({ alpha: 0.15 })
    expect(
      toContrastReadyColor(darkResult.resolved?.value as TokenColorValue),
    ).toMatchObject({ alpha: 0.6 })
  })
})

describe("resolveLeafValues", () => {
  it("batch-resolves all leaf paths when no path list is provided", () => {
    const result = resolveLeafValues(scalarChainFixture)

    expect(result.errors).toHaveLength(0)
    expect(result.values.map((entry) => entry.path).sort()).toEqual([
      "button.background",
      "color.blue.600",
      "color.primary",
    ])
  })
})

describe("resolveLeafValue errors", () => {
  it("reports circular references", () => {
    const result = resolveLeafValue(
      {
        a: { $value: "{b}" },
        b: { $value: "{a}" },
      },
      "a",
    )

    expect(
      result.errors.some((error) => error.code === "CIRCULAR_REFERENCE"),
    ).toBe(true)
  })

  it("reports missing references in strict mode", () => {
    const result = resolveLeafValue(
      {
        color: {
          primary: { $value: "{color.missing}" },
        },
      },
      "color.primary",
      { strict: true },
    )

    expect(
      result.errors.some((error) => error.code === "MISSING_REFERENCE"),
    ).toBe(true)
  })

  it("warns and leaves missing references unresolved in safe mode", () => {
    const result = resolveLeafValue(
      {
        color: {
          primary: { $value: "{color.missing}" },
        },
      },
      "color.primary",
      { strict: false },
    )

    expect(result.errors).toHaveLength(0)
    expect(result.warnings).toHaveLength(1)
    expect(result.resolved?.value).toBe("{color.missing}")
  })

  it("reports when a reference points to a branch without DEFAULT", () => {
    const result = resolveLeafValue(
      {
        color: {
          blue: {
            600: { $value: "oklch(0.546 0.245 262.881)" },
          },
          primary: { $value: "{color.blue}" },
        },
      },
      "color.primary",
    )

    expect(result.errors).toHaveLength(1)
    expect(result.errors[0]?.code).toBe("REFERENCE_POINTS_TO_BRANCH")
  })

  it("reports max depth exceeded for deep alias chains", () => {
    const result = resolveLeafValue(
      {
        a: { $value: "{b}" },
        b: { $value: "{c}" },
        c: { $value: "{d}" },
        d: { $value: "oklch(1 0 0)" },
      },
      "a",
      { maxDepth: 1 },
    )

    expect(
      result.errors.some((error) => error.code === "MAX_DEPTH_EXCEEDED"),
    ).toBe(true)
  })

  it("reports when a path points to a branch instead of a leaf", () => {
    const result = resolveLeafValue(
      {
        color: {
          blue: {
            600: { $value: "oklch(0.546 0.245 262.881)" },
          },
        },
      },
      "color.blue",
    )

    expect(result.errors).toHaveLength(1)
    expect(result.errors[0]?.code).toBe("INVALID_TOKEN_LEAF")
    expect(result.resolved).toBeNull()
  })

  it("reports when a leaf path is missing", () => {
    const result = resolveLeafValue(
      {
        color: {
          primary: { $value: "oklch(1 0 0)" },
        },
      },
      "color.missing",
    )

    expect(result.errors).toHaveLength(1)
    expect(result.errors[0]?.code).toBe("MISSING_REFERENCE")
    expect(result.resolved).toBeNull()
  })
})

describe("values.normalize", () => {
  it("recognizes structured and string color fallbacks", () => {
    expect(isResolvedColorValue(blue600Color)).toBe(true)
    expect(isResolvedColorValue("oklch(1 0 0)")).toBe(true)
    expect(isResolvedColorValue("#ffffff")).toBe(true)
    expect(isResolvedColorValue(fontSizeSm)).toBe(false)
  })

  it("parses oklch and hex string fallbacks for contrast prep", () => {
    expect(toContrastReadyColor("oklch(1 0 0)")).toEqual({
      colorSpace: "oklch",
      components: [1, 0, 0],
      alpha: 1,
    })
    expect(toContrastReadyColor("#ffffff")).toEqual({
      colorSpace: "srgb",
      components: [0, 0, 0],
      alpha: 1,
      hex: "#ffffff",
    })
  })
})
