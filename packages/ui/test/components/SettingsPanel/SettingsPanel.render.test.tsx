import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import {
  SettingsPanel,
  SettingsPanelContent,
  SettingsPanelDescription,
  SettingsPanelFooter,
  SettingsPanelHeader,
  SettingsPanelTitle,
} from "../../../src/components/blocks/SettingsPanel/SettingsPanel.js"

describe("SettingsPanel render", () => {
  it("composes Card compound parts with title, description, and children", () => {
    render(
      <SettingsPanel className="custom-panel">
        <SettingsPanelHeader>
          <SettingsPanelTitle>Profile</SettingsPanelTitle>
          <SettingsPanelDescription>
            Update your account details.
          </SettingsPanelDescription>
        </SettingsPanelHeader>
        <SettingsPanelContent>Form content</SettingsPanelContent>
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
      <SettingsPanel>
        <SettingsPanelHeader>
          <SettingsPanelTitle>Notifications</SettingsPanelTitle>
        </SettingsPanelHeader>
        <SettingsPanelContent>Toggle settings</SettingsPanelContent>
        <SettingsPanelFooter>
          <button type="button">Save</button>
        </SettingsPanelFooter>
      </SettingsPanel>,
    )

    expect(screen.getByRole("button", { name: "Save" })).toBeInTheDocument()
    expect(screen.getByText("Toggle settings")).toBeInTheDocument()
  })
})
