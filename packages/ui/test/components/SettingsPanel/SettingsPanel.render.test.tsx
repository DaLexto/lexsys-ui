import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import { SettingsPanel } from "../../../src/components/blocks/SettingsPanel/SettingsPanel.js"

describe("SettingsPanel render", () => {
  it("composes Card with title, description, and children", () => {
    render(
      <SettingsPanel
        title="Profile"
        description="Update your account details."
        className="custom-panel"
      >
        Form content
      </SettingsPanel>,
    )

    expect(screen.getByRole("heading", { name: "Profile" })).toBeInTheDocument()
    expect(screen.getByText("Update your account details.")).toBeInTheDocument()
    expect(screen.getByText("Form content")).toBeInTheDocument()

    const panel = screen.getByText("Form content").closest(".custom-panel")
    expect(panel).not.toBeNull()
  })

  it("renders optional footer actions", () => {
    render(
      <SettingsPanel
        title="Notifications"
        footer={<button type="button">Save</button>}
      >
        Toggle settings
      </SettingsPanel>,
    )

    expect(screen.getByRole("button", { name: "Save" })).toBeInTheDocument()
    expect(screen.getByText("Toggle settings")).toBeInTheDocument()
  })
})
