import { describe, expect, it } from "vitest"

import {
  resolveReference,
  resolveTokenTreeSafe,
  resolveTokenTreeStrict,
} from "../src/engine/resolver"

import type { TokenLeaf, TokenTree, TokenValue } from "../src/types"

const isRecord = (value: unknown): value is Record<string, unknown> => {
  return typeof value === "object" && value !== null && !Array.isArray(value)
}

const isTokenValue = (value: unknown): value is TokenValue => {
  if (typeof value === "string" || typeof value === "number") {
    return true
  }

  if (!isRecord(value)) {
    return false
  }

  if (typeof value.value === "number" && typeof value.unit === "string") {
    return true
  }

  return (
    typeof value.colorSpace === "string" &&
    Array.isArray(value.components) &&
    value.components.every((component) => typeof component === "number")
  )
}

const isTokenLeaf = (value: unknown): value is TokenLeaf => {
  return isRecord(value) && "$value" in value && isTokenValue(value.$value)
}

const getTokenLeaf = (tree: TokenTree, path: string[]): TokenLeaf => {
  let current: unknown = tree

  for (const segment of path) {
    if (!isRecord(current)) {
      throw new Error(`Expected token branch before "${segment}".`)
    }

    current = current[segment]
  }

  if (!isTokenLeaf(current)) {
    throw new Error(`Expected token leaf at "${path.join(".")}".`)
  }

  return current
}

describe("resolveReference", () => {
  it("resolves a direct token reference to the final primitive value", () => {
    const tokens: TokenTree = {
      color: {
        blue: {
          600: { $value: "oklch(0.546 0.245 262.881)" },
        },
      },
    }

    const result = resolveReference(tokens, "{color.blue.600}")

    expect(result.value).toBe("oklch(0.546 0.245 262.881)")
    expect(result.errors).toHaveLength(0)
    expect(result.warnings).toHaveLength(0)
  })

  it("resolves nested references to the final primitive value", () => {
    const tokens: TokenTree = {
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

    const result = resolveReference(tokens, "{button.background}")

    expect(result.value).toBe("oklch(0.546 0.245 262.881)")
    expect(result.errors).toHaveLength(0)
    expect(result.warnings).toHaveLength(0)
  })

  it("resolves branch references through DEFAULT token leaves", () => {
    const tokens: TokenTree = {
      color: {
        primary: {
          DEFAULT: { $value: "{color.blue.600}" },
          foreground: { $value: "oklch(1 0 0)" },
        },
        blue: {
          600: { $value: "oklch(0.546 0.245 262.881)" },
        },
      },
    }

    const result = resolveReference(tokens, "{color.primary}")

    expect(result.value).toBe("oklch(0.546 0.245 262.881)")
    expect(result.errors).toHaveLength(0)
    expect(result.warnings).toHaveLength(0)
  })
})

describe("resolveTokenTreeStrict", () => {
  it("resolves token leaf values while preserving the token tree shape", () => {
    const tokens: TokenTree = {
      color: {
        white: { $value: "oklch(1 0 0)" },
        blue: {
          600: { $value: "oklch(0.546 0.245 262.881)" },
        },
        primary: { $value: "{color.blue.600}" },
      },
      radius: {
        md: { $value: "0.375rem" },
        control: { $value: "{radius.md}" },
      },
      button: {
        radius: { $value: "{radius.control}" },
        background: { $value: "{color.primary}" },
      },
    }

    const resolved = resolveTokenTreeStrict(tokens)

    expect(getTokenLeaf(resolved, ["color", "white"]).$value).toBe(
      "oklch(1 0 0)",
    )
    expect(getTokenLeaf(resolved, ["color", "primary"]).$value).toBe(
      "oklch(0.546 0.245 262.881)",
    )
    expect(getTokenLeaf(resolved, ["radius", "control"]).$value).toBe(
      "0.375rem",
    )
    expect(getTokenLeaf(resolved, ["button", "radius"]).$value).toBe("0.375rem")
    expect(getTokenLeaf(resolved, ["button", "background"]).$value).toBe(
      "oklch(0.546 0.245 262.881)",
    )
  })

  it("throws when a reference is missing", () => {
    const tokens: TokenTree = {
      color: {
        primary: { $value: "{color.missing}" },
      },
    }

    expect(() => {
      resolveTokenTreeStrict(tokens)
    }).toThrow(/Missing token reference target/)
  })

  it("resolves structured OKLCH objects through nested references", () => {
    const blue600 = {
      colorSpace: "oklch" as const,
      components: [0.546, 0.245, 262.881],
    }
    const tokens: TokenTree = {
      color: {
        blue: {
          600: { $value: blue600 },
        },
        accent: { $value: "{color.blue.600}" },
      },
      button: {
        background: { $value: "{color.accent}" },
      },
    }

    const resolved = resolveTokenTreeStrict(tokens)

    expect(getTokenLeaf(resolved, ["button", "background"]).$value).toEqual(
      blue600,
    )
  })
})

describe("resolveTokenTreeSafe", () => {
  it("collects circular-reference errors in safe mode", () => {
    const result = resolveTokenTreeSafe({
      a: { $value: "{b}" },
      b: { $value: "{a}" },
    })

    expect(
      result.errors.some((error) => error.code === "CIRCULAR_REFERENCE"),
    ).toBe(true)
  })

  it("collects missing-reference warnings in safe mode", () => {
    const result = resolveTokenTreeSafe({
      a: { $value: "{missing.path}" },
    })

    expect(result.errors).toHaveLength(0)
    expect(result.warnings).toHaveLength(1)
    expect(result.warnings[0]?.code).toBe("UNRESOLVED_REFERENCE_LEFT_AS_IS")
  })

  it("leaves unresolved references as-is in non-strict safe mode", () => {
    const result = resolveTokenTreeSafe({
      color: {
        primary: { $value: "{color.missing}" },
      },
    })

    expect(result.errors).toHaveLength(0)
    expect(result.warnings).toHaveLength(1)
    expect(result.warnings[0]?.code).toBe("UNRESOLVED_REFERENCE_LEFT_AS_IS")
    expect(getTokenLeaf(result.tree, ["color", "primary"]).$value).toBe(
      "{color.missing}",
    )
  })

  it("reports when a reference points to a branch without a DEFAULT token leaf", () => {
    const result = resolveTokenTreeSafe({
      color: {
        blue: {
          600: { $value: "oklch(0.546 0.245 262.881)" },
        },
        primary: { $value: "{color.blue}" },
      },
    })

    expect(result.errors).toHaveLength(1)
    expect(result.errors[0]?.code).toBe("REFERENCE_POINTS_TO_BRANCH")
  })
})
