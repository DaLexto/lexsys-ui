import { describe, expect, it } from "vitest"

import { createStyleTokenInput } from "../src/generators/inputs/input.source"
import { createStyleOutputs } from "../src/generators/generator.create"
import {
  createTokenGovernanceReport,
  formatTokenGovernanceReport,
} from "../src/engine/governance"
import type { TokenGovernanceInput } from "../src/engine/governance"

const createFixtureInput = (
  overrides: Partial<TokenGovernanceInput> = {},
): TokenGovernanceInput => {
  const base = createStyleTokenInput()

  return {
    primitiveTokens: base.primitiveTokens,
    brandTokens: base.brandTokens,
    semanticTokens: base.semanticTokens,
    componentTokens: base.componentTokens,
    foundationTokens: base.foundationTokens,
    themeTokens: base.themeTokens,
    ...overrides,
  }
}

describe("createTokenGovernanceReport", () => {
  it("builds a report for the current Neurex token graph without changing outputs", () => {
    const input = createStyleTokenInput()
    const report = createTokenGovernanceReport(input)

    expect(report.metadata.length).toBeGreaterThan(0)
    expect(report.deprecations).toEqual([])
    expect(formatTokenGovernanceReport(report)).toContain(
      "Token Governance Report",
    )
  })

  it("lists metadata entries with descriptions or deprecation flags", () => {
    const report = createTokenGovernanceReport(
      createFixtureInput({
        primitiveTokens: {
          spacing: {
            legacy: {
              $description: "Legacy spacing token.",
              $deprecated: "Use spacing.control tokens instead.",
              $value: "0.25rem",
            },
          },
        },
        semanticTokens: {},
        brandTokens: {},
        componentTokens: {},
        foundationTokens: {
          spacing: {
            legacy: {
              $description: "Legacy spacing token.",
              $deprecated: "Use spacing.control tokens instead.",
              $value: "0.25rem",
            },
          },
        },
        themeTokens: [],
      }),
    )

    expect(report.metadata).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          path: "spacing.legacy",
          layer: "primitive",
          deprecated: "Use spacing.control tokens instead.",
        }),
      ]),
    )
  })

  it("reports dependents of deprecated tokens", () => {
    const report = createTokenGovernanceReport(
      createFixtureInput({
        primitiveTokens: {
          spacing: {
            legacy: {
              $deprecated: true,
              $value: "0.25rem",
            },
          },
        },
        foundationTokens: {
          spacing: {
            legacy: {
              $deprecated: true,
              $value: "0.25rem",
            },
            panel: {
              padding: { $value: "{spacing.legacy}" },
            },
          },
        },
        semanticTokens: {
          spacing: {
            panel: {
              padding: { $value: "{spacing.legacy}" },
            },
          },
        },
        brandTokens: {},
        componentTokens: {
          card: {
            padding: { $value: "{spacing.panel.padding}" },
          },
        },
        themeTokens: [],
      }),
    )

    expect(report.deprecations).toEqual([
      expect.objectContaining({
        path: "spacing.legacy",
        layer: "primitive",
        dependents: expect.arrayContaining([
          expect.objectContaining({
            layer: "semantic",
            sourcePath: "spacing.panel.padding",
          }),
          expect.objectContaining({
            layer: "component",
            sourcePath: "card.padding",
          }),
        ]),
      }),
    ])
  })

  it("lists transitive dependents on metadata entries with description only", () => {
    const report = createTokenGovernanceReport(
      createFixtureInput({
        primitiveTokens: {
          spacing: {
            legacy: {
              $description: "Legacy spacing token.",
              $value: "0.25rem",
            },
          },
        },
        foundationTokens: {
          spacing: {
            legacy: {
              $description: "Legacy spacing token.",
              $value: "0.25rem",
            },
            panel: {
              padding: { $value: "{spacing.legacy}" },
            },
          },
        },
        semanticTokens: {
          spacing: {
            panel: {
              padding: { $value: "{spacing.legacy}" },
            },
          },
        },
        brandTokens: {},
        componentTokens: {},
        themeTokens: [],
      }),
    )

    expect(report.metadata).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          path: "spacing.legacy",
          dependents: expect.arrayContaining([
            expect.objectContaining({
              layer: "semantic",
              sourcePath: "spacing.panel.padding",
            }),
          ]),
        }),
      ]),
    )
  })

  it("formats transitive dependent counts in the governance report", () => {
    const report = createTokenGovernanceReport(
      createFixtureInput({
        primitiveTokens: {
          spacing: {
            legacy: {
              $deprecated: true,
              $value: "0.25rem",
            },
          },
        },
        foundationTokens: {
          spacing: {
            legacy: {
              $deprecated: true,
              $value: "0.25rem",
            },
            panel: {
              padding: { $value: "{spacing.legacy}" },
            },
          },
        },
        semanticTokens: {
          spacing: {
            panel: {
              padding: { $value: "{spacing.legacy}" },
            },
          },
        },
        brandTokens: {},
        componentTokens: {
          card: {
            padding: { $value: "{spacing.panel.padding}" },
          },
        },
        themeTokens: [],
      }),
    )

    expect(formatTokenGovernanceReport(report)).toContain(
      "2 transitive dependent(s)",
    )
  })

  it("detects dead primitive tokens not referenced by upper layers", () => {
    const report = createTokenGovernanceReport(
      createFixtureInput({
        primitiveTokens: {
          spacing: {
            used: { $value: "0.25rem" },
            unused: { $value: "0.5rem" },
          },
        },
        foundationTokens: {
          spacing: {
            used: { $value: "0.25rem" },
            unused: { $value: "0.5rem" },
          },
        },
        semanticTokens: {
          spacing: {
            panel: {
              padding: { $value: "{spacing.used}" },
            },
          },
        },
        brandTokens: {},
        componentTokens: {},
        themeTokens: [],
      }),
    )

    expect(report.deadTokens).toEqual([{ path: "spacing.unused" }])
  })

  it("does not change generated style outputs", () => {
    const before = createStyleOutputs()
    createTokenGovernanceReport(createStyleTokenInput())
    const after = createStyleOutputs()

    expect(after.tokensCss).toBe(before.tokensCss)
    expect(after.themeCss).toBe(before.themeCss)
    expect(after.tokenJsonFiles).toEqual(before.tokenJsonFiles)
  })
})
