/**
 * Drawer.variants.ts
 *
 * Defines visual variants using class composition.
 */

import { cva } from "class-variance-authority"
import { disabledStateClasses } from "@/lib/utils"

export const drawerTriggerVariants = cva(
  [
    "inline-flex h-(--nx-drawer-trigger-height) items-center justify-center rounded-(--nx-drawer-trigger-radius)",
    "bg-(--nx-drawer-trigger-background) px-(--nx-drawer-trigger-padding-x) text-(--nx-drawer-trigger-foreground)",
    "text-(length:--nx-drawer-trigger-font-size) font-(--nx-drawer-trigger-font-weight) leading-(--nx-drawer-trigger-font-line-height)",
    "transition-colors duration-(--nx-drawer-transition-duration) ease-(--nx-drawer-transition-easing)",
    "outline-none hover:bg-(--nx-drawer-trigger-hover-background) focus-visible:ring-(length:--nx-drawer-focus-ring-width) focus-visible:ring-(--nx-drawer-focus-ring-color) focus-visible:ring-offset-(length:--nx-drawer-focus-ring-offset) focus-visible:ring-offset-(--nx-drawer-focus-ring-offset-color)",
    disabledStateClasses,
  ].join(" "),
)

export const drawerIndentBackgroundVariants = cva(
  "fixed inset-0 z-(--nx-drawer-indent-z-index) bg-(--nx-drawer-indent-background) opacity-0 transition-opacity duration-(--nx-drawer-transition-duration) ease-(--nx-drawer-transition-easing) data-[active]:opacity-100",
)

export const drawerIndentVariants = cva(
  "min-h-(--nx-drawer-viewport-max-height) origin-top overflow-hidden transition-[border-radius,transform] duration-(--nx-drawer-transition-duration) ease-(--nx-drawer-transition-easing) data-[active]:scale-(--nx-drawer-indent-scale) data-[active]:rounded-(--nx-drawer-indent-radius)",
)

export const drawerBackdropVariants = cva(
  [
    "fixed inset-0 z-(--nx-drawer-backdrop-z-index) bg-(--nx-drawer-backdrop-background) opacity-(--nx-drawer-backdrop-opacity)",
    "transition-opacity duration-(--nx-drawer-transition-duration) ease-(--nx-drawer-transition-easing)",
    "data-[starting-style]:opacity-0 data-[ending-style]:opacity-0",
  ].join(" "),
)

export const drawerViewportVariants = cva(
  "fixed inset-0 z-(--nx-drawer-viewport-z-index) flex overflow-hidden p-(--nx-drawer-viewport-padding)",
  {
    variants: {
      side: {
        bottom: "items-end justify-center",
        top: "items-start justify-center",
        right: "items-stretch justify-end",
        left: "items-stretch justify-start",
      },
    },
    defaultVariants: {
      side: "bottom",
    },
  },
)

export const drawerPopupVariants = cva(
  [
    "relative flex bg-(--nx-drawer-popup-background) text-(--nx-drawer-popup-foreground) shadow-(--nx-drawer-popup-shadow) outline-none",
    "border border-(--nx-drawer-popup-border-color) transition-[opacity,transform] duration-[calc(var(--nx-drawer-transition-duration)*var(--drawer-swipe-strength,1))] ease-(--nx-drawer-transition-easing)",
    "data-[swiping]:transition-none",
  ].join(" "),
  {
    variants: {
      side: {
        bottom:
          "max-h-[calc(var(--nx-drawer-viewport-max-height)-(var(--nx-drawer-viewport-padding)*2))] w-[min(calc(100vw-(var(--nx-drawer-viewport-inset)*2)),var(--nx-drawer-popup-max-width))] translate-y-[calc(var(--drawer-snap-point-offset,0px)+var(--drawer-swipe-movement-y,0px))] rounded-t-(--nx-drawer-popup-radius) data-[ending-style]:translate-y-full data-[starting-style]:translate-y-full",
        top: "max-h-[calc(var(--nx-drawer-viewport-max-height)-(var(--nx-drawer-viewport-padding)*2))] w-[min(calc(100vw-(var(--nx-drawer-viewport-inset)*2)),var(--nx-drawer-popup-max-width))] translate-y-[var(--drawer-swipe-movement-y,0px)] rounded-b-(--nx-drawer-popup-radius) data-[ending-style]:-translate-y-full data-[starting-style]:-translate-y-full",
        right:
          "h-full max-w-[calc(100vw-(var(--nx-drawer-viewport-inset)*2))] translate-x-[var(--drawer-swipe-movement-x,0px)] rounded-l-(--nx-drawer-popup-radius) data-[ending-style]:translate-x-full data-[starting-style]:translate-x-full",
        left: "h-full max-w-[calc(100vw-(var(--nx-drawer-viewport-inset)*2))] translate-x-[var(--drawer-swipe-movement-x,0px)] rounded-r-(--nx-drawer-popup-radius) data-[ending-style]:-translate-x-full data-[starting-style]:-translate-x-full",
      },
      size: {
        sm: "",
        md: "",
        lg: "",
        full: "",
      },
    },
    compoundVariants: [
      {
        side: ["bottom", "top"],
        size: "sm",
        class: "min-h-(--nx-drawer-popup-height-sm)",
      },
      {
        side: ["bottom", "top"],
        size: "md",
        class: "min-h-(--nx-drawer-popup-height-md)",
      },
      {
        side: ["bottom", "top"],
        size: "lg",
        class: "min-h-(--nx-drawer-popup-height-lg)",
      },
      {
        side: ["bottom", "top"],
        size: "full",
        class:
          "min-h-[calc(var(--nx-drawer-viewport-max-height)-(var(--nx-drawer-viewport-padding)*2))]",
      },
      {
        side: ["left", "right"],
        size: "sm",
        class: "w-(--nx-drawer-popup-width-sm)",
      },
      {
        side: ["left", "right"],
        size: "md",
        class: "w-(--nx-drawer-popup-width-md)",
      },
      {
        side: ["left", "right"],
        size: "lg",
        class: "w-(--nx-drawer-popup-width-lg)",
      },
      {
        side: ["left", "right"],
        size: "full",
        class: "w-[calc(100vw-(var(--nx-drawer-viewport-inset)*2))]",
      },
    ],
    defaultVariants: {
      side: "bottom",
      size: "md",
    },
  },
)

export const drawerContentVariants = cva(
  "grid flex-1 content-start gap-(--nx-drawer-content-gap) overflow-auto p-(--nx-drawer-content-padding)",
)

export const drawerHandleVariants = cva(
  "mx-auto mt-(--nx-drawer-handle-margin-top) h-(--nx-drawer-handle-height) w-(--nx-drawer-handle-width) shrink-0 rounded-(--nx-drawer-handle-radius) bg-(--nx-drawer-handle-background)",
)

export const drawerSwipeAreaVariants = cva(
  "fixed z-(--nx-drawer-handle-z-index) data-[disabled]:pointer-events-none data-[disabled]:opacity-0",
  {
    variants: {
      side: {
        bottom: "inset-x-0 bottom-0 h-(--nx-drawer-swipe-area-size)",
        top: "inset-x-0 top-0 h-(--nx-drawer-swipe-area-size)",
        right: "inset-y-0 right-0 w-(--nx-drawer-swipe-area-size)",
        left: "inset-y-0 left-0 w-(--nx-drawer-swipe-area-size)",
      },
    },
    defaultVariants: {
      side: "bottom",
    },
  },
)

export const drawerTitleVariants = cva(
  "pr-(--nx-drawer-title-padding-end) text-(length:--nx-drawer-title-font-size) font-(--nx-drawer-title-font-weight) leading-(--nx-drawer-title-font-line-height) text-(--nx-drawer-title-foreground)",
)

export const drawerDescriptionVariants = cva(
  "text-(length:--nx-drawer-description-font-size) font-(--nx-drawer-description-font-weight) leading-(--nx-drawer-description-font-line-height) text-(--nx-drawer-description-foreground)",
)

export const drawerCloseVariants = cva(
  [
    "absolute right-(--nx-drawer-close-inset) top-(--nx-drawer-close-inset) inline-flex size-(--nx-drawer-close-size) items-center justify-center rounded-(--nx-drawer-close-radius)",
    "text-(--nx-drawer-close-foreground) outline-none transition-colors duration-(--nx-drawer-transition-duration) ease-(--nx-drawer-transition-easing)",
    "hover:bg-(--nx-drawer-close-hover-background) focus-visible:ring-(length:--nx-drawer-focus-ring-width) focus-visible:ring-(--nx-drawer-focus-ring-color) focus-visible:ring-offset-(length:--nx-drawer-focus-ring-offset) focus-visible:ring-offset-(--nx-drawer-focus-ring-offset-color)",
    disabledStateClasses,
  ].join(" "),
)

export const drawerCloseInlineVariants = cva(
  [
    "relative inline-flex w-auto items-center outline-none",
    "focus-visible:ring-(length:--nx-drawer-focus-ring-width) focus-visible:ring-(--nx-drawer-focus-ring-color) focus-visible:ring-offset-(length:--nx-drawer-focus-ring-offset) focus-visible:ring-offset-(--nx-drawer-focus-ring-offset-color)",
    disabledStateClasses,
  ].join(" "),
)
