/**
 * Tabs.variants.ts
 *
 * Defines visual variants using class composition.
 */

import { cva } from "class-variance-authority"
import { disabledStateClasses } from "../../../utils/cn"

export const tabsRootVariants = cva("grid gap-(--lex-tabs-gap)")

export const tabsListVariants = cva(
  "inline-flex w-fit items-center rounded-(--lex-tabs-list-radius) bg-(--lex-tabs-list-background) p-(--lex-tabs-list-padding)",
)

export const tabsTabVariants = cva(
  [
    "inline-flex items-center justify-center rounded-(--lex-tabs-tab-radius) px-(--lex-tabs-tab-padding-x) py-(--lex-tabs-tab-padding-y)",
    "text-(length:--lex-tabs-tab-font-size) font-(--lex-tabs-tab-font-weight) leading-(--lex-tabs-tab-font-line-height) text-(--lex-tabs-tab-foreground)",
    "transition-colors duration-(--lex-tabs-transition-duration) ease-(--lex-tabs-transition-easing)",
    "outline-none data-[active]:bg-(--lex-tabs-tab-active-background) data-[active]:text-(--lex-tabs-tab-active-foreground) data-[active]:shadow-sm",
    "focus-visible:ring-(length:--lex-tabs-focus-ring-width) focus-visible:ring-(--lex-tabs-focus-ring-color)",
    disabledStateClasses,
  ].join(" "),
)

export const tabsPanelVariants = cva(
  "text-(length:--lex-tabs-panel-font-size) leading-(--lex-tabs-panel-font-line-height) text-(--lex-tabs-panel-foreground) outline-none focus-visible:ring-(length:--lex-tabs-focus-ring-width) focus-visible:ring-(--lex-tabs-focus-ring-color)",
)
