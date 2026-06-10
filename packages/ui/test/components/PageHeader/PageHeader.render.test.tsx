import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import {
  PageHeader,
  PageHeaderAction,
  PageHeaderActions,
  PageHeaderBreadcrumb,
  PageHeaderBreadcrumbItem,
  PageHeaderBreadcrumbLink,
  PageHeaderBreadcrumbList,
  PageHeaderBreadcrumbPage,
  PageHeaderDescription,
  PageHeaderHeading,
  PageHeaderTitle,
  PageHeaderTop,
} from "../../../src/components/blocks/PageHeader/PageHeader.js";

describe("PageHeader render", () => {
  it("renders title, description, breadcrumb, and actions", () => {
    render(
      <PageHeader className="custom-page-header">
        <PageHeaderTop>
          <PageHeaderBreadcrumb>
            <PageHeaderBreadcrumbList>
              <PageHeaderBreadcrumbItem>
                <PageHeaderBreadcrumbLink href="/">
                  Home
                </PageHeaderBreadcrumbLink>
              </PageHeaderBreadcrumbItem>
              <PageHeaderBreadcrumbItem>
                <PageHeaderBreadcrumbPage>Users</PageHeaderBreadcrumbPage>
              </PageHeaderBreadcrumbItem>
            </PageHeaderBreadcrumbList>
          </PageHeaderBreadcrumb>
          <PageHeaderHeading>
            <PageHeaderTitle>Users</PageHeaderTitle>
            <PageHeaderDescription>
              Manage workspace members.
            </PageHeaderDescription>
          </PageHeaderHeading>
        </PageHeaderTop>
        <PageHeaderActions>
          <PageHeaderAction>Add user</PageHeaderAction>
        </PageHeaderActions>
      </PageHeader>,
    );

    expect(screen.getByRole("heading", { name: "Users" })).toBeInTheDocument();
    expect(screen.getByText("Manage workspace members.")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Home" })).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Add user" }),
    ).toBeInTheDocument();

    const header = screen
      .getByRole("heading", { name: "Users" })
      .closest(".custom-page-header");
    expect(header).not.toBeNull();
  });
});
