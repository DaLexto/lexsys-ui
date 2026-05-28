/**
 * Drawer.variants.ts
 *
 * Defines visual variants using class composition.
 */

import { cva } from "class-variance-authority"
import { disabledStateClasses } from "../../../utils/cn"

export const drawerTriggerVariants = cva(
  [
    "inline-flex h-(--lex-drawer-trigger-height) items-center justify-center rounded-(--lex-drawer-trigger-radius)",
    "bg-(--lex-drawer-trigger-background) px-(--lex-drawer-trigger-padding-x) text-(--lex-drawer-trigger-foreground)",
    "text-(length:--lex-drawer-trigger-font-size) font-(--lex-drawer-trigger-font-weight) leading-(--lex-drawer-trigger-font-line-height)",
    "transition-colors duration-(--lex-drawer-transition-duration) ease-(--lex-drawer-transition-easing)",
    "outline-none hover:bg-(--lex-drawer-trigger-hover-background) focus-visible:ring-(length:--lex-drawer-focus-ring-width) focus-visible:ring-(--lex-drawer-focus-ring-color) focus-visible:ring-offset-(length:--lex-drawer-focus-ring-offset) focus-visible:ring-offset-(--lex-drawer-focus-ring-offset-color)",
    disabledStateClasses,
  ].join(" "),
)

export const drawerIndentBackgroundVariants = cva(
  "fixed inset-0 z-(--lex-drawer-indent-z-index) bg-(--lex-drawer-indent-background) opacity-0 transition-opacity duration-(--lex-drawer-transition-duration) ease-(--lex-drawer-transition-easing) data-[active]:opacity-100",
)

export const drawerIndentVariants = cva(
  "min-h-(--lex-drawer-viewport-max-height) origin-top overflow-hidden transition-[border-radius,transform] duration-(--lex-drawer-transition-duration) ease-(--lex-drawer-transition-easing) data-[active]:scale-(--lex-drawer-indent-scale) data-[active]:rounded-(--lex-drawer-indent-radius)",
)

export const drawerBackdropVariants = cva(
  [
    "fixed inset-0 z-(--lex-drawer-backdrop-z-index) bg-(--lex-drawer-backdrop-background) opacity-(--lex-drawer-backdrop-opacity)",
    "transition-opacity duration-(--lex-drawer-transition-duration) ease-(--lex-drawer-transition-easing)",
    "data-[starting-style]:opacity-0 data-[ending-style]:opacity-0",
  ].join(" "),
)

export const drawerViewportVariants = cva(
  "fixed inset-0 z-(--lex-drawer-viewport-z-index) flex overflow-hidden p-(--lex-drawer-viewport-padding)",
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
    "relative flex bg-(--lex-drawer-popup-background) text-(--lex-drawer-popup-foreground) shadow-(--lex-drawer-popup-shadow) outline-none",
    "border border-(--lex-drawer-popup-border-color) transition-[opacity,transform] duration-[calc(var(--lex-drawer-transition-duration)*var(--drawer-swipe-strength,1))] ease-(--lex-drawer-transition-easing)",
    "data-[swiping]:transition-none",
  ].join(" "),
  {
    variants: {
      side: {
        bottom:
          "max-h-[calc(var(--lex-drawer-viewport-max-height)-(var(--lex-drawer-viewport-padding)*2))] w-[min(calc(100vw-(var(--lex-drawer-viewport-inset)*2)),var(--lex-drawer-popup-max-width))] translate-y-[calc(var(--drawer-snap-point-offset,0px)+var(--drawer-swipe-movement-y,0px))] rounded-t-(--lex-drawer-popup-radius) data-[ending-style]:translate-y-full data-[starting-style]:translate-y-full",
        top: "max-h-[calc(var(--lex-drawer-viewport-max-height)-(var(--lex-drawer-viewport-padding)*2))] w-[min(calc(100vw-(var(--lex-drawer-viewport-inset)*2)),var(--lex-drawer-popup-max-width))] translate-y-[var(--drawer-swipe-movement-y,0px)] rounded-b-(--lex-drawer-popup-radius) data-[ending-style]:-translate-y-full data-[starting-style]:-translate-y-full",
        right:
          "h-full max-w-[calc(100vw-(var(--lex-drawer-viewport-inset)*2))] translate-x-[var(--drawer-swipe-movement-x,0px)] rounded-l-(--lex-drawer-popup-radius) data-[ending-style]:translate-x-full data-[starting-style]:translate-x-full",
        left: "h-full max-w-[calc(100vw-(var(--lex-drawer-viewport-inset)*2))] translate-x-[var(--drawer-swipe-movement-x,0px)] rounded-r-(--lex-drawer-popup-radius) data-[ending-style]:-translate-x-full data-[starting-style]:-translate-x-full",
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
        class: "min-h-(--lex-drawer-popup-height-sm)",
      },
      {
        side: ["bottom", "top"],
        size: "md",
        class: "min-h-(--lex-drawer-popup-height-md)",
      },
      {
        side: ["bottom", "top"],
        size: "lg",
        class: "min-h-(--lex-drawer-popup-height-lg)",
      },
      {
        side: ["bottom", "top"],
        size: "full",
        class:
          "min-h-[calc(var(--lex-drawer-viewport-max-height)-(var(--lex-drawer-viewport-padding)*2))]",
      },
      {
        side: ["left", "right"],
        size: "sm",
        class: "w-(--lex-drawer-popup-width-sm)",
      },
      {
        side: ["left", "right"],
        size: "md",
        class: "w-(--lex-drawer-popup-width-md)",
      },
      {
        side: ["left", "right"],
        size: "lg",
        class: "w-(--lex-drawer-popup-width-lg)",
      },
      {
        side: ["left", "right"],
        size: "full",
        class: "w-[calc(100vw-(var(--lex-drawer-viewport-inset)*2))]",
      },
    ],
    defaultVariants: {
      side: "bottom",
      size: "md",
    },
  },
)

export const drawerContentVariants = cva(
  "grid flex-1 content-start gap-(--lex-drawer-content-gap) overflow-auto p-(--lex-drawer-content-padding)",
)

export const drawerHandleVariants = cva(
  "mx-auto mt-(--lex-drawer-handle-margin-top) h-(--lex-drawer-handle-height) w-(--lex-drawer-handle-width) shrink-0 rounded-(--lex-drawer-handle-radius) bg-(--lex-drawer-handle-background)",
)

export const drawerSwipeAreaVariants = cva(
  "fixed z-(--lex-drawer-handle-z-index) data-[disabled]:pointer-events-none data-[disabled]:opacity-0",
  {
    variants: {
      side: {
        bottom: "inset-x-0 bottom-0 h-(--lex-drawer-swipe-area-size)",
        top: "inset-x-0 top-0 h-(--lex-drawer-swipe-area-size)",
        right: "inset-y-0 right-0 w-(--lex-drawer-swipe-area-size)",
        left: "inset-y-0 left-0 w-(--lex-drawer-swipe-area-size)",
      },
    },
    defaultVariants: {
      side: "bottom",
    },
  },
)

export const drawerTitleVariants = cva(
  "pr-(--lex-drawer-title-padding-end) text-(length:--lex-drawer-title-font-size) font-(--lex-drawer-title-font-weight) leading-(--lex-drawer-title-font-line-height) text-(--lex-drawer-title-foreground)",
)

export const drawerDescriptionVariants = cva(
  "text-(length:--lex-drawer-description-font-size) font-(--lex-drawer-description-font-weight) leading-(--lex-drawer-description-font-line-height) text-(--lex-drawer-description-foreground)",
)

export const drawerCloseVariants = cva(
  [
    "absolute right-(--lex-drawer-close-inset) top-(--lex-drawer-close-inset) inline-flex size-(--lex-drawer-close-size) items-center justify-center rounded-(--lex-drawer-close-radius)",
    "text-(--lex-drawer-close-foreground) outline-none transition-colors duration-(--lex-drawer-transition-duration) ease-(--lex-drawer-transition-easing)",
    "hover:bg-(--lex-drawer-close-hover-background) focus-visible:ring-(length:--lex-drawer-focus-ring-width) focus-visible:ring-(--lex-drawer-focus-ring-color) focus-visible:ring-offset-(length:--lex-drawer-focus-ring-offset) focus-visible:ring-offset-(--lex-drawer-focus-ring-offset-color)",
    disabledStateClasses,
  ].join(" "),
)

export const drawerCloseInlineVariants = cva(
  [
    "relative inline-flex w-auto items-center outline-none",
    "focus-visible:ring-(length:--lex-drawer-focus-ring-width) focus-visible:ring-(--lex-drawer-focus-ring-color) focus-visible:ring-offset-(length:--lex-drawer-focus-ring-offset) focus-visible:ring-offset-(--lex-drawer-focus-ring-offset-color)",
    disabledStateClasses,
  ].join(" "),
)
