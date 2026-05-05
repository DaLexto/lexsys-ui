/**
 * Tabs.variants.ts
 *
 * Defines visual variants using class composition.
 */

import { cva } from "class-variance-authority"

export const tabsRootVariants = cva("grid gap-3")

export const tabsListVariants = cva(
  "inline-flex w-fit items-center rounded-[var(--nx-radius-control)] bg-nx-muted p-1",
)

export const tabsTabVariants = cva(
  [
    "inline-flex items-center justify-center rounded-[calc(var(--nx-radius-control)-2px)] px-3 py-1.5",
    "text-[length:var(--nx-typography-control-sm-font-size)] font-[var(--nx-typography-control-sm-font-weight)] leading-[var(--nx-typography-control-sm-line-height)] text-nx-muted-foreground",
    "transition-colors duration-[var(--nx-duration-control)] ease-[var(--nx-easing-standard)]",
    "outline-none data-[active]:bg-nx-background data-[active]:text-nx-foreground data-[active]:shadow-sm",
    "focus-visible:ring-2 focus-visible:ring-nx-ring",
    "disabled:pointer-events-none disabled:opacity-50",
  ].join(" "),
)

export const tabsPanelVariants = cva(
  "text-[length:var(--nx-typography-body-sm-font-size)] leading-[var(--nx-typography-body-sm-line-height)] text-nx-foreground outline-none focus-visible:ring-2 focus-visible:ring-nx-ring",
)
