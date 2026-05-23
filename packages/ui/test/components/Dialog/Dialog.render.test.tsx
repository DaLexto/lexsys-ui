import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import {
  Dialog,
  DialogBackdrop,
  DialogDescription,
  DialogPopup,
  DialogPortal,
  DialogTitle,
  DialogViewport,
} from "../../../src/components/Dialog/Dialog.js"

describe("Dialog render", () => {
  it("renders dialog title and description when defaultOpen", () => {
    render(
      <Dialog defaultOpen>
        <DialogPortal>
          <DialogBackdrop />
          <DialogViewport>
            <DialogPopup className="custom-dialog-popup">
              <DialogTitle>Confirm action</DialogTitle>
              <DialogDescription>
                This dialog copy is visible to assistive tech.
              </DialogDescription>
            </DialogPopup>
          </DialogViewport>
        </DialogPortal>
      </Dialog>,
    )

    expect(
      screen.getByRole("dialog", { name: "Confirm action" }),
    ).toBeInTheDocument()
    expect(
      screen.getByText("This dialog copy is visible to assistive tech."),
    ).toBeInTheDocument()
    expect(screen.getByRole("dialog")).toHaveClass("custom-dialog-popup")
  })
})
