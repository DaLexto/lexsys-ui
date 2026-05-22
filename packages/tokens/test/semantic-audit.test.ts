import { describe, expect, it } from "vitest"

import { createStyleTokenInput } from "../src/generators/inputs/input.source"
import { createSemanticAuditReport } from "../src/governance"

describe("createSemanticAuditReport", () => {
  it("reports a clean audit after semantic organization fixes", () => {
    const input = createStyleTokenInput()
    const report = createSemanticAuditReport({
      primitiveTokens: input.primitiveTokens,
      brandTokens: input.brandTokens,
      semanticTokens: input.semanticTokens,
      componentTokens: input.componentTokens,
      foundationTokens: input.foundationTokens,
      themeTokens: input.themeTokens,
    })

    expect(report.semanticPathCount).toBeGreaterThan(0)
    expect(report.referencedSemanticPathCount).toBeGreaterThan(0)
    expect(
      report.issues.filter((issue) => {
        return issue.kind !== "unused-semantic"
      }),
    ).toEqual([])
    expect(
      report.issues.some((issue) => {
        return issue.path === "color.feedback.info.background"
      }),
    ).toBe(false)
  })

  it("detects unused semantic paths", () => {
    const input = createStyleTokenInput()

    const report = createSemanticAuditReport({
      primitiveTokens: input.primitiveTokens,
      brandTokens: input.brandTokens,
      semanticTokens: {
        ...input.semanticTokens,
        color: {
          ...(input.semanticTokens.color as object),
          orphan: {
            unused: { $value: "{color.neutral.100}" },
          },
        },
      },
      componentTokens: input.componentTokens,
      foundationTokens: {
        ...input.foundationTokens,
        color: {
          ...(input.foundationTokens.color as object),
          orphan: {
            unused: { $value: "{color.neutral.100}" },
          },
        },
      },
      themeTokens: input.themeTokens,
    })

    expect(report.issues).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          kind: "unused-semantic",
          path: "color.orphan.unused",
        }),
      ]),
    )
  })

  it("detects component-intent semantic branches", () => {
    const input = createStyleTokenInput()

    const report = createSemanticAuditReport({
      primitiveTokens: input.primitiveTokens,
      brandTokens: input.brandTokens,
      semanticTokens: {
        ...input.semanticTokens,
        size: {
          ...(input.semanticTokens.size as object),
          dialog: {
            maxWidth: { $value: "{size.128}" },
          },
        },
      },
      componentTokens: input.componentTokens,
      foundationTokens: input.foundationTokens,
      themeTokens: input.themeTokens,
    })

    expect(report.issues).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          kind: "component-intent",
          path: "size.dialog",
        }),
      ]),
    )
  })

  it("detects theme overrides nested under color instead of top-level groups", () => {
    const input = createStyleTokenInput()

    const report = createSemanticAuditReport({
      primitiveTokens: input.primitiveTokens,
      brandTokens: input.brandTokens,
      semanticTokens: input.semanticTokens,
      componentTokens: input.componentTokens,
      foundationTokens: input.foundationTokens,
      themeTokens: [
        {
          name: "light",
          tokens: {
            color: {
              border: {
                default: { $value: "{color.neutral.200}" },
              },
            },
          },
        },
      ],
    })

    expect(report.issues).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          kind: "theme-path-mismatch",
          path: "color.border",
          themeName: "light",
        }),
      ]),
    )
  })
})
