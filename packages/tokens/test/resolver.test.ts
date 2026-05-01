import { describe, expect, it } from "vitest"

import {
  resolveReference,
  resolveTokenTreeSafe,
  resolveTokenTreeStrict,
} from "../src/resolver"

import type { TokenTree } from "../src/types"

describe("resolveReference", () => {
  it("resolves a direct token reference to the final primitive value", () => {
    const tokens: TokenTree = {
      color: {
        blue: {
          600: { value: "oklch(0.546 0.245 262.881)" },
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
          600: { value: "oklch(0.546 0.245 262.881)" },
        },
        primary: { value: "{color.blue.600}" },
      },
      button: {
        background: { value: "{color.primary}" },
      },
    }

    const result = resolveReference(tokens, "{button.background}")

    expect(result.value).toBe("oklch(0.546 0.245 262.881)")
    expect(result.errors).toHaveLength(0)
    expect(result.warnings).toHaveLength(0)
  })
})

describe("resolveTokenTreeStrict", () => {
  it("resolves token leaf values while preserving the token tree shape", () => {
    const tokens: TokenTree = {
      color: {
        white: { value: "oklch(1 0 0)" },
        blue: {
          600: { value: "oklch(0.546 0.245 262.881)" },
        },
        primary: { value: "{color.blue.600}" },
      },
      radius: {
        md: { value: "0.375rem" },
        control: { value: "{radius.md}" },
      },
      button: {
        radius: { value: "{radius.control}" },
        background: { value: "{color.primary}" },
      },
    }

    const resolved = resolveTokenTreeStrict(tokens)

    expect(resolved.color.white.value).toBe("oklch(1 0 0)")
    expect(resolved.color.primary.value).toBe("oklch(0.546 0.245 262.881)")
    expect(resolved.radius.control.value).toBe("0.375rem")
    expect(resolved.button.radius.value).toBe("0.375rem")
    expect(resolved.button.background.value).toBe(
      "oklch(0.546 0.245 262.881)",
    )
  })

  it("throws when a reference is missing", () => {
    const tokens: TokenTree = {
      color: {
        primary: { value: "{color.missing}" },
      },
    }

    expect(() => {
      resolveTokenTreeStrict(tokens)
    }).toThrow(/Missing token reference target/)
  })
})

describe("resolveTokenTreeSafe", () => {
  it("collects circular-reference errors in safe mode", () => {
    const result = resolveTokenTreeSafe({
      a: { value: "{b}" },
      b: { value: "{a}" },
    })

    expect(
      result.errors.some((error) => error.code === "CIRCULAR_REFERENCE"),
    ).toBe(true)
  })

  it("collects missing-reference warnings in safe mode", () => {
    const result = resolveTokenTreeSafe({
      a: { value: "{missing.path}" },
    })

    expect(result.errors).toHaveLength(0)
    expect(result.warnings).toHaveLength(1)
    expect(result.warnings[0]?.code).toBe("UNRESOLVED_REFERENCE_LEFT_AS_IS")
  })

  it("leaves unresolved references as-is in non-strict safe mode", () => {
    const result = resolveTokenTreeSafe({
      color: {
        primary: { value: "{color.missing}" },
      },
    })

    expect(result.errors).toHaveLength(0)
    expect(result.warnings).toHaveLength(1)
    expect(result.warnings[0]?.code).toBe("UNRESOLVED_REFERENCE_LEFT_AS_IS")
    expect(result.tree.color.primary.value).toBe("{color.missing}")
  })

  it("reports when a reference points to a branch instead of a token leaf", () => {
    const result = resolveTokenTreeSafe({
      color: {
        blue: {
          600: { value: "oklch(0.546 0.245 262.881)" },
        },
        primary: { value: "{color.blue}" },
      },
    })

    expect(result.errors).toHaveLength(1)
    expect(result.errors[0]?.code).toBe("REFERENCE_POINTS_TO_BRANCH")
  })
})