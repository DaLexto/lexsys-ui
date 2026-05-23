import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import {
  ToastPortal,
  ToastProvider,
  ToastViewport,
} from "../../../src/components/Toast/Toast.js"

describe("Toast render", () => {
  it("renders provider and viewport in the document", () => {
    render(
      <ToastProvider>
        <ToastPortal>
          <ToastViewport placement="bottom-right" aria-label="Notifications" />
        </ToastPortal>
      </ToastProvider>,
    )

    expect(
      screen.getByRole("region", { name: "Notifications" }),
    ).toBeInTheDocument()
  })
})
