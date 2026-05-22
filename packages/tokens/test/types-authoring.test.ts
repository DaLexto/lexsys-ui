import { describe, expect, expectTypeOf, test } from "vitest"
import { buttonComponentTokens } from "../src/components/button.js"
import { createStyleTokenInput, getTokenTree } from "../src/generators/inputs"
import { colorPrimitives } from "../src/primitives/color.js"
import {
  componentTokens as createComponentTokens,
  primitiveTokens as createPrimitiveTokens,
  themeTokens,
} from "../src/types/authoring.js"
import type { PresetDefinition, PrimitiveTokenGroup } from "../src/types"

describe("token authoring factories", () => {
  test("create explicit metadata and token payload boundaries", () => {
    const primitiveGroup = createPrimitiveTokens("space", {
      sm: { $value: "0.5rem" },
    })
    const componentGroup = createComponentTokens("example", {
      radius: { $value: "{radius.control}" },
    })
    const theme = themeTokens(
      {
        name: "light",
        brand: "neurex",
        selector: ":root",
        colorScheme: "light",
      },
      {
        color: {
          background: {
            base: { $value: "{color.white}" },
          },
        },
      },
    )

    expect(primitiveGroup).toEqual({
      meta: { name: "space" },
      tokens: {
        sm: { $value: "0.5rem" },
      },
    })
    expect(componentGroup).toEqual({
      meta: { component: "example" },
      tokens: {
        radius: { $value: "{radius.control}" },
      },
    })
    expect(theme).toMatchObject({
      name: "light",
      brand: "neurex",
      selector: ":root",
      colorScheme: "light",
      tokens: {
        color: {
          background: {
            base: { $value: "{color.white}" },
          },
        },
      },
    })
  })

  test("reads factory groups and legacy groups through the same adapter", () => {
    const legacyGroup: PrimitiveTokenGroup = {
      name: "legacy",
      sample: { $value: "1rem" },
    }

    expect(getTokenTree(colorPrimitives)).toBe(colorPrimitives.tokens)
    expect(getTokenTree(buttonComponentTokens)).toBe(
      buttonComponentTokens.tokens,
    )
    expect(getTokenTree(legacyGroup)).toEqual({
      sample: { $value: "1rem" },
    })
  })

  test("keeps current generator input behavior for migrated pilot groups", () => {
    const input = createStyleTokenInput()

    expect(input.primitiveTokens.color).toBe(colorPrimitives.tokens)
    expect(input.componentTokens.button).toBe(buttonComponentTokens.tokens)
    expect(
      input.themeTokens.find((theme) => theme.name === "light")?.tokens,
    ).toBeDefined()
    expect(
      input.themeTokens.find((theme) => theme.name === "dark")?.tokens,
    ).toBeDefined()
  })

  test("constrains preset defaultTheme to declared themeModes", () => {
    const validPreset = {
      id: "neurex",
      name: "Neurex Default",
      description: "Valid preset fixture.",
      themeModes: ["light", "dark"] as const,
      defaultTheme: "light",
    } satisfies PresetDefinition<readonly ["light", "dark"]>

    expectTypeOf(validPreset.defaultTheme).toEqualTypeOf<"light">()

    const invalidPreset = {
      id: "invalid",
      name: "Invalid",
      description: "Invalid preset fixture.",
      themeModes: ["light"] as const,
      // @ts-expect-error defaultTheme must be one of themeModes.
      defaultTheme: "dark",
    } satisfies PresetDefinition<readonly ["light"]>

    expect(invalidPreset.id).toBe("invalid")
  })
})
