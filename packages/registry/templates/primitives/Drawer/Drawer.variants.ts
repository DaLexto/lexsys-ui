/**
 * Drawer.variants.ts
 *
 * Defines visual variants using class composition.
 */

import { cva } from "class-variance-authority"
import { disabledStateClasses } from "@/lib/utils"

export const drawerTriggerVariants = cva(
  [
    "inline-flex h-(--lsys-drawer-trigger-height) items-center justify-center rounded-(--lsys-drawer-trigger-radius)",
    "bg-(--lsys-drawer-trigger-background) px-(--lsys-drawer-trigger-padding-x) text-(--lsys-drawer-trigger-foreground)",
    "text-(length:--lsys-drawer-trigger-font-size) font-(--lsys-drawer-trigger-font-weight) leading-(--lsys-drawer-trigger-font-line-height)",
    "transition-colors duration-(--lsys-drawer-transition-duration) ease-(--lsys-drawer-transition-easing)",
    "outline-none hover:bg-(--lsys-drawer-trigger-hover-background) focus-visible:ring-(length:--lsys-drawer-focus-ring-width) focus-visible:ring-(--lsys-drawer-focus-ring-color) focus-visible:ring-offset-(length:--lsys-drawer-focus-ring-offset) focus-visible:ring-offset-(--lsys-drawer-focus-ring-offset-color)",
    disabledStateClasses,
  ].join(" "),
)

export const drawerIndentBackgroundVariants = cva(
  "fixed inset-0 z-(--lsys-drawer-indent-z-index) bg-(--lsys-drawer-indent-background) opacity-0 transition-opacity duration-(--lsys-drawer-transition-duration) ease-(--lsys-drawer-transition-easing) data-[active]:opacity-100",
)

export const drawerIndentVariants = cva(
  "min-h-(--lsys-drawer-viewport-max-height) origin-top overflow-hidden transition-[border-radius,transform] duration-(--lsys-drawer-transition-duration) ease-(--lsys-drawer-transition-easing) data-[active]:scale-(--lsys-drawer-indent-scale) data-[active]:rounded-(--lsys-drawer-indent-radius)",
)

export const drawerBackdropVariants = cva(
  [
    "fixed inset-0 z-(--lsys-drawer-backdrop-z-index) bg-(--lsys-drawer-backdrop-background) opacity-(--lsys-drawer-backdrop-opacity)",
    "transition-opacity duration-(--lsys-drawer-transition-duration) ease-(--lsys-drawer-transition-easing)",
    "data-[starting-style]:opacity-0 data-[ending-style]:opacity-0",
  ].join(" "),
)

export const drawerViewportVariants = cva(
  "fixed inset-0 z-(--lsys-drawer-viewport-z-index) flex overflow-hidden p-(--lsys-drawer-viewport-padding)",
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
    "relative flex bg-(--lsys-drawer-popup-background) text-(--lsys-drawer-popup-foreground) shadow-(--lsys-drawer-popup-shadow) outline-none",
    "border border-(--lsys-drawer-popup-border-color) transition-[opacity,transform] duration-[calc(var(--lsys-drawer-transition-duration)*var(--drawer-swipe-strength,1))] ease-(--lsys-drawer-transition-easing)",
    "data-[swiping]:transition-none",
  ].join(" "),
  {
    variants: {
      side: {
        bottom:
          "max-h-[calc(var(--lsys-drawer-viewport-max-height)-(var(--lsys-drawer-viewport-padding)*2))] w-[min(calc(100vw-(var(--lsys-drawer-viewport-inset)*2)),var(--lsys-drawer-popup-max-width))] translate-y-[calc(var(--drawer-snap-point-offset,0px)+var(--drawer-swipe-movement-y,0px))] rounded-t-(--lsys-drawer-popup-radius) data-[ending-style]:translate-y-full data-[starting-style]:translate-y-full",
        top: "max-h-[calc(var(--lsys-drawer-viewport-max-height)-(var(--lsys-drawer-viewport-padding)*2))] w-[min(calc(100vw-(var(--lsys-drawer-viewport-inset)*2)),var(--lsys-drawer-popup-max-width))] translate-y-[var(--drawer-swipe-movement-y,0px)] rounded-b-(--lsys-drawer-popup-radius) data-[ending-style]:-translate-y-full data-[starting-style]:-translate-y-full",
        right:
          "h-full max-w-[calc(100vw-(var(--lsys-drawer-viewport-inset)*2))] translate-x-[var(--drawer-swipe-movement-x,0px)] rounded-l-(--lsys-drawer-popup-radius) data-[ending-style]:translate-x-full data-[starting-style]:translate-x-full",
        left: "h-full max-w-[calc(100vw-(var(--lsys-drawer-viewport-inset)*2))] translate-x-[var(--drawer-swipe-movement-x,0px)] rounded-r-(--lsys-drawer-popup-radius) data-[ending-style]:-translate-x-full data-[starting-style]:-translate-x-full",
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
        class: "min-h-(--lsys-drawer-popup-height-sm)",
      },
      {
        side: ["bottom", "top"],
        size: "md",
        class: "min-h-(--lsys-drawer-popup-height-md)",
      },
      {
        side: ["bottom", "top"],
        size: "lg",
        class: "min-h-(--lsys-drawer-popup-height-lg)",
      },
      {
        side: ["bottom", "top"],
        size: "full",
        class:
          "min-h-[calc(var(--lsys-drawer-viewport-max-height)-(var(--lsys-drawer-viewport-padding)*2))]",
      },
      {
        side: ["left", "right"],
        size: "sm",
        class: "w-(--lsys-drawer-popup-width-sm)",
      },
      {
        side: ["left", "right"],
        size: "md",
        class: "w-(--lsys-drawer-popup-width-md)",
      },
      {
        side: ["left", "right"],
        size: "lg",
        class: "w-(--lsys-drawer-popup-width-lg)",
      },
      {
        side: ["left", "right"],
        size: "full",
        class: "w-[calc(100vw-(var(--lsys-drawer-viewport-inset)*2))]",
      },
    ],
    defaultVariants: {
      side: "bottom",
      size: "md",
    },
  },
)

export const drawerContentVariants = cva(
  "grid flex-1 content-start gap-(--lsys-drawer-content-gap) overflow-auto p-(--lsys-drawer-content-padding)",
)

export const drawerHandleVariants = cva(
  "mx-auto mt-(--lsys-drawer-handle-margin-top) h-(--lsys-drawer-handle-height) w-(--lsys-drawer-handle-width) shrink-0 rounded-(--lsys-drawer-handle-radius) bg-(--lsys-drawer-handle-background)",
)

export const drawerSwipeAreaVariants = cva(
  "fixed z-(--lsys-drawer-handle-z-index) data-[disabled]:pointer-events-none data-[disabled]:opacity-0",
  {
    variants: {
      side: {
        bottom: "inset-x-0 bottom-0 h-(--lsys-drawer-swipe-area-size)",
        top: "inset-x-0 top-0 h-(--lsys-drawer-swipe-area-size)",
        right: "inset-y-0 right-0 w-(--lsys-drawer-swipe-area-size)",
        left: "inset-y-0 left-0 w-(--lsys-drawer-swipe-area-size)",
      },
    },
    defaultVariants: {
      side: "bottom",
    },
  },
)

export const drawerTitleVariants = cva(
  "pr-(--lsys-drawer-title-padding-end) text-(length:--lsys-drawer-title-font-size) font-(--lsys-drawer-title-font-weight) leading-(--lsys-drawer-title-font-line-height) text-(--lsys-drawer-title-foreground)",
)

export const drawerDescriptionVariants = cva(
  "text-(length:--lsys-drawer-description-font-size) font-(--lsys-drawer-description-font-weight) leading-(--lsys-drawer-description-font-line-height) text-(--lsys-drawer-description-foreground)",
)

export const drawerCloseVariants = cva(
  [
    "absolute right-(--lsys-drawer-close-inset) top-(--lsys-drawer-close-inset) inline-flex size-(--lsys-drawer-close-size) items-center justify-center rounded-(--lsys-drawer-close-radius)",
    "text-(--lsys-drawer-close-foreground) outline-none transition-colors duration-(--lsys-drawer-transition-duration) ease-(--lsys-drawer-transition-easing)",
    "hover:bg-(--lsys-drawer-close-hover-background) focus-visible:ring-(length:--lsys-drawer-focus-ring-width) focus-visible:ring-(--lsys-drawer-focus-ring-color) focus-visible:ring-offset-(length:--lsys-drawer-focus-ring-offset) focus-visible:ring-offset-(--lsys-drawer-focus-ring-offset-color)",
    disabledStateClasses,
  ].join(" "),
)

export const drawerCloseInlineVariants = cva(
  [
    "relative inline-flex w-auto items-center outline-none",
    "focus-visible:ring-(length:--lsys-drawer-focus-ring-width) focus-visible:ring-(--lsys-drawer-focus-ring-color) focus-visible:ring-offset-(length:--lsys-drawer-focus-ring-offset) focus-visible:ring-offset-(--lsys-drawer-focus-ring-offset-color)",
    disabledStateClasses,
  ].join(" "),
)
