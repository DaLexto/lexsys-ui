import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import {
  Tooltip,
  TooltipPopup,
  TooltipPortal,
  TooltipPositioner,
  TooltipTrigger,
} from "../../../src/components/primitives/Tooltip/Tooltip.js"

describe("Tooltip render", () => {
  it("renders tooltip content when defaultOpen", () => {
    render(
      <Tooltip defaultOpen>
        <TooltipTrigger>Info</TooltipTrigger>
        <TooltipPortal>
          <TooltipPositioner>
            <TooltipPopup className="custom-tooltip">
              Helpful tooltip text
            </TooltipPopup>
          </TooltipPositioner>
        </TooltipPortal>
      </Tooltip>,
    )

    expect(screen.getByText("Helpful tooltip text")).toBeInTheDocument()
    expect(
      screen.getByText("Helpful tooltip text").closest(".custom-tooltip"),
    ).not.toBeNull()
  })
})
