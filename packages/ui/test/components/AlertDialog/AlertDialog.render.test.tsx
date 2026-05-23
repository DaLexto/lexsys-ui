import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import {
  AlertDialog,
  AlertDialogBackdrop,
  AlertDialogDescription,
  AlertDialogPopup,
  AlertDialogPortal,
  AlertDialogTitle,
  AlertDialogViewport,
} from "../../../src/components/primitives/AlertDialog/AlertDialog.js"

describe("AlertDialog render", () => {
  it("renders alert dialog title when defaultOpen", () => {
    render(
      <AlertDialog defaultOpen>
        <AlertDialogPortal>
          <AlertDialogBackdrop />
          <AlertDialogViewport>
            <AlertDialogPopup className="custom-alert-dialog">
              <AlertDialogTitle>Delete item?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogPopup>
          </AlertDialogViewport>
        </AlertDialogPortal>
      </AlertDialog>,
    )

    expect(
      screen.getByRole("alertdialog", { name: "Delete item?" }),
    ).toBeInTheDocument()
    expect(
      screen.getByText("This action cannot be undone."),
    ).toBeInTheDocument()
    expect(screen.getByRole("alertdialog")).toHaveClass("custom-alert-dialog")
  })
})
