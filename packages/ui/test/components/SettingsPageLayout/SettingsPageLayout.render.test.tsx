import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import {
  SettingsPageLayout,
  SettingsPageLayoutBody,
  SettingsPageLayoutHeader,
  SettingsPageLayoutMain,
  SettingsPageLayoutNav,
  SettingsPageLayoutPanel,
  SettingsPageLayoutPanelContent,
  SettingsPageLayoutPanelHeader,
  SettingsPageLayoutPanelTitle,
} from "../../../src/components/templates/SettingsPageLayout/SettingsPageLayout.js"
import {
  PageHeaderHeading,
  PageHeaderTitle,
} from "../../../src/components/blocks/PageHeader/PageHeader.js"

describe("SettingsPageLayout render", () => {
  it("renders header, nav, and settings panel content", () => {
    render(
      <SettingsPageLayout className="custom-settings-layout">
        <SettingsPageLayoutHeader>
          <PageHeaderHeading>
            <PageHeaderTitle>Settings</PageHeaderTitle>
          </PageHeaderHeading>
        </SettingsPageLayoutHeader>
        <SettingsPageLayoutBody>
          <SettingsPageLayoutNav>
            <button type="button">Profile</button>
          </SettingsPageLayoutNav>
          <SettingsPageLayoutMain>
            <SettingsPageLayoutPanel>
              <SettingsPageLayoutPanelHeader>
                <SettingsPageLayoutPanelTitle>
                  Profile
                </SettingsPageLayoutPanelTitle>
              </SettingsPageLayoutPanelHeader>
              <SettingsPageLayoutPanelContent>
                Profile form fields
              </SettingsPageLayoutPanelContent>
            </SettingsPageLayoutPanel>
          </SettingsPageLayoutMain>
        </SettingsPageLayoutBody>
      </SettingsPageLayout>,
    )

    expect(
      screen.getByRole("heading", { name: "Settings" }),
    ).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "Profile" })).toBeInTheDocument()
    expect(screen.getByText("Profile form fields")).toBeInTheDocument()

    const layout = screen
      .getByText("Profile form fields")
      .closest(".custom-settings-layout")
    expect(layout).not.toBeNull()
  })
})
