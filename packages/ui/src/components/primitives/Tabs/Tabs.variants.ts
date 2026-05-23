/**
 * Tabs.variants.ts
 *
 * Defines visual variants using class composition.
 */

import { cva } from "class-variance-authority"
import { disabledStateClasses } from "../../../utils/cn"

export const tabsRootVariants = cva("grid gap-(--nx-tabs-gap)")

export const tabsListVariants = cva(
  "inline-flex w-fit items-center rounded-(--nx-tabs-list-radius) bg-(--nx-tabs-list-background) p-(--nx-tabs-list-padding)",
)

export const tabsTabVariants = cva(
  [
    "inline-flex items-center justify-center rounded-(--nx-tabs-tab-radius) px-(--nx-tabs-tab-padding-x) py-(--nx-tabs-tab-padding-y)",
    "text-(length:--nx-tabs-tab-font-size) font-(--nx-tabs-tab-font-weight) leading-(--nx-tabs-tab-font-line-height) text-(--nx-tabs-tab-foreground)",
    "transition-colors duration-(--nx-tabs-transition-duration) ease-(--nx-tabs-transition-easing)",
    "outline-none data-[active]:bg-(--nx-tabs-tab-active-background) data-[active]:text-(--nx-tabs-tab-active-foreground) data-[active]:shadow-sm",
    "focus-visible:ring-(length:--nx-tabs-focus-ring-width) focus-visible:ring-(--nx-tabs-focus-ring-color)",
    disabledStateClasses,
  ].join(" "),
)

export const tabsPanelVariants = cva(
  "text-(length:--nx-tabs-panel-font-size) leading-(--nx-tabs-panel-font-line-height) text-(--nx-tabs-panel-foreground) outline-none focus-visible:ring-(length:--nx-tabs-focus-ring-width) focus-visible:ring-(--nx-tabs-focus-ring-color)",
)
