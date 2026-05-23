import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import {
  ScrollArea,
  ScrollAreaContent,
  ScrollAreaScrollbar,
  ScrollAreaThumb,
  ScrollAreaViewport,
} from "../../../src/components/ScrollArea/ScrollArea.js"

describe("ScrollArea render", () => {
  it("renders scrollable content and merges root className", () => {
    const { container } = render(
      <ScrollArea className="custom-scroll-area">
        <ScrollAreaViewport>
          <ScrollAreaContent>
            <p>Scrollable panel copy</p>
          </ScrollAreaContent>
        </ScrollAreaViewport>
        <ScrollAreaScrollbar orientation="vertical">
          <ScrollAreaThumb />
        </ScrollAreaScrollbar>
      </ScrollArea>,
    )

    expect(screen.getByText("Scrollable panel copy")).toBeInTheDocument()
    expect(container.firstElementChild).toHaveClass("custom-scroll-area")
  })
})
