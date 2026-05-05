/**
 * Tabs.variants.ts
 *
 * Defines visual variants using class composition.
 */

import { cva } from "class-variance-authority"

export const tabsRootVariants = cva("grid gap-[var(--nx-tabs-gap)]")

export const tabsListVariants = cva(
  "inline-flex w-fit items-center rounded-[var(--nx-tabs-list-radius)] bg-[var(--nx-tabs-list-background)] p-[var(--nx-tabs-list-padding)]",
)

export const tabsTabVariants = cva(
  [
    "inline-flex items-center justify-center rounded-[var(--nx-tabs-tab-radius)] px-[var(--nx-tabs-tab-padding-x)] py-[var(--nx-tabs-tab-padding-y)]",
    "text-[length:var(--nx-tabs-tab-font-size)] font-[var(--nx-tabs-tab-font-weight)] leading-[var(--nx-tabs-tab-font-line-height)] text-[var(--nx-tabs-tab-foreground)]",
    "transition-colors duration-[var(--nx-tabs-transition-duration)] ease-[var(--nx-tabs-transition-easing)]",
    "outline-none data-[active]:bg-[var(--nx-tabs-tab-active-background)] data-[active]:text-[var(--nx-tabs-tab-active-foreground)] data-[active]:shadow-sm",
    "focus-visible:ring-2 focus-visible:ring-[var(--nx-tabs-focus-ring-color)]",
    "disabled:pointer-events-none disabled:opacity-50",
  ].join(" "),
)

export const tabsPanelVariants = cva(
  "text-[length:var(--nx-tabs-panel-font-size)] leading-[var(--nx-tabs-panel-font-line-height)] text-[var(--nx-tabs-panel-foreground)] outline-none focus-visible:ring-2 focus-visible:ring-[var(--nx-tabs-focus-ring-color)]",
)
