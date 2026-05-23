import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import {
  Collapsible,
  CollapsiblePanel,
  CollapsibleTrigger,
} from "../../../src/components/Collapsible/Collapsible.js"

describe("Collapsible render", () => {
  it("renders trigger and panel when defaultOpen", () => {
    render(
      <Collapsible defaultOpen className="custom-collapsible">
        <CollapsibleTrigger>Toggle section</CollapsibleTrigger>
        <CollapsiblePanel>Expanded panel body</CollapsiblePanel>
      </Collapsible>,
    )

    expect(
      screen.getByRole("button", { name: "Toggle section" }),
    ).toBeInTheDocument()
    expect(screen.getByText("Expanded panel body")).toBeVisible()
  })
})
