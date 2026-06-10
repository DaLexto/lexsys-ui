import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import {
  StatsCard,
  StatsCardContent,
  StatsCardDescription,
  StatsCardFooter,
  StatsCardHeader,
  StatsCardTitle,
  StatsCardTrend,
  StatsCardValue,
} from "../../../src/components/blocks/StatsCard/StatsCard.js";

describe("StatsCard render", () => {
  it("renders metric value, trend, and footer", () => {
    render(
      <StatsCard className="custom-stats-card">
        <StatsCardHeader>
          <StatsCardTitle>Active users</StatsCardTitle>
          <StatsCardDescription>Last 30 days</StatsCardDescription>
        </StatsCardHeader>
        <StatsCardContent>
          <StatsCardValue>1,284</StatsCardValue>
          <StatsCardTrend>+12% from last month</StatsCardTrend>
        </StatsCardContent>
        <StatsCardFooter>
          <button type="button">View report</button>
        </StatsCardFooter>
      </StatsCard>,
    );

    expect(screen.getByText("Active users")).toBeInTheDocument();
    expect(screen.getByText("1,284")).toBeInTheDocument();
    expect(screen.getByText("+12% from last month")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "View report" }),
    ).toBeInTheDocument();

    const card = screen.getByText("1,284").closest(".custom-stats-card");
    expect(card).not.toBeNull();
  });
});
