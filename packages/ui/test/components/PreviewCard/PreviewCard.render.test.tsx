import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import {
  PreviewCard,
  PreviewCardPopup,
  PreviewCardPortal,
  PreviewCardPositioner,
  PreviewCardTrigger,
  PreviewCardViewport,
} from "../../../src/components/primitives/PreviewCard/PreviewCard.js"

describe("PreviewCard render", () => {
  it("renders preview content when defaultOpen", () => {
    render(
      <PreviewCard defaultOpen>
        <PreviewCardTrigger>Product</PreviewCardTrigger>
        <PreviewCardPortal>
          <PreviewCardPositioner>
            <PreviewCardPopup className="custom-preview-card">
              <PreviewCardViewport>Preview details</PreviewCardViewport>
            </PreviewCardPopup>
          </PreviewCardPositioner>
        </PreviewCardPortal>
      </PreviewCard>,
    )

    expect(screen.getByText("Preview details")).toBeInTheDocument()
    expect(
      screen.getByText("Preview details").closest(".custom-preview-card"),
    ).not.toBeNull()
  })
})
