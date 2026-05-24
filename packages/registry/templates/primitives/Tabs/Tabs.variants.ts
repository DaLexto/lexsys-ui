/**
 * Tabs.variants.ts
 *
 * Defines visual variants using class composition.
 */

import { cva } from "class-variance-authority"
import { disabledStateClasses } from "@/lib/utils"

export const tabsRootVariants = cva("grid gap-(--lsys-tabs-gap)")

export const tabsListVariants = cva(
  "inline-flex w-fit items-center rounded-(--lsys-tabs-list-radius) bg-(--lsys-tabs-list-background) p-(--lsys-tabs-list-padding)",
)

export const tabsTabVariants = cva(
  [
    "inline-flex items-center justify-center rounded-(--lsys-tabs-tab-radius) px-(--lsys-tabs-tab-padding-x) py-(--lsys-tabs-tab-padding-y)",
    "text-(length:--lsys-tabs-tab-font-size) font-(--lsys-tabs-tab-font-weight) leading-(--lsys-tabs-tab-font-line-height) text-(--lsys-tabs-tab-foreground)",
    "transition-colors duration-(--lsys-tabs-transition-duration) ease-(--lsys-tabs-transition-easing)",
    "outline-none data-[active]:bg-(--lsys-tabs-tab-active-background) data-[active]:text-(--lsys-tabs-tab-active-foreground) data-[active]:shadow-sm",
    "focus-visible:ring-(length:--lsys-tabs-focus-ring-width) focus-visible:ring-(--lsys-tabs-focus-ring-color)",
    disabledStateClasses,
  ].join(" "),
)

export const tabsPanelVariants = cva(
  "text-(length:--lsys-tabs-panel-font-size) leading-(--lsys-tabs-panel-font-line-height) text-(--lsys-tabs-panel-foreground) outline-none focus-visible:ring-(length:--lsys-tabs-focus-ring-width) focus-visible:ring-(--lsys-tabs-focus-ring-color)",
)
