import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import {
  Popover,
  PopoverPopup,
  PopoverPortal,
  PopoverPositioner,
  PopoverTitle,
  PopoverTrigger,
} from "../../../src/components/Popover/Popover.js"

describe("Popover render", () => {
  it("renders popover title when defaultOpen", () => {
    render(
      <Popover defaultOpen>
        <PopoverTrigger>Open popover</PopoverTrigger>
        <PopoverPortal>
          <PopoverPositioner>
            <PopoverPopup className="custom-popover">
              <PopoverTitle>Popover title</PopoverTitle>
            </PopoverPopup>
          </PopoverPositioner>
        </PopoverPortal>
      </Popover>,
    )

    expect(screen.getByText("Popover title")).toBeInTheDocument()
    expect(screen.getByText("Popover title").closest(".custom-popover")).not.toBeNull()
  })
})
