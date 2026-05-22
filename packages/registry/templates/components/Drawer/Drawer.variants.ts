/**
 * Drawer.variants.ts
 *
 * Defines visual variants using class composition.
 */

import { cva } from "class-variance-authority"

export const drawerTriggerVariants = cva(
  [
    "inline-flex h-[var(--nx-drawer-trigger-height)] items-center justify-center rounded-[var(--nx-drawer-trigger-radius)]",
    "bg-[var(--nx-drawer-trigger-background)] px-[var(--nx-drawer-trigger-padding-x)] text-[var(--nx-drawer-trigger-foreground)]",
    "text-[length:var(--nx-drawer-trigger-font-size)] font-[var(--nx-drawer-trigger-font-weight)] leading-[var(--nx-drawer-trigger-font-line-height)]",
    "transition-colors duration-[var(--nx-drawer-transition-duration)] ease-[var(--nx-drawer-transition-easing)]",
    "outline-none hover:bg-[var(--nx-drawer-trigger-hover-background)] focus-visible:ring-2 focus-visible:ring-[var(--nx-drawer-focus-ring-color)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--nx-drawer-focus-ring-offset-color)]",
    "disabled:cursor-not-allowed disabled:opacity-50 data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50",
  ].join(" "),
)

export const drawerIndentBackgroundVariants = cva(
  "fixed inset-0 -z-10 bg-[var(--nx-drawer-indent-background)] opacity-0 transition-opacity duration-[var(--nx-drawer-transition-duration)] ease-[var(--nx-drawer-transition-easing)] data-[active]:opacity-100",
)

export const drawerIndentVariants = cva(
  "min-h-dvh origin-top overflow-hidden transition-[border-radius,transform] duration-[var(--nx-drawer-transition-duration)] ease-[var(--nx-drawer-transition-easing)] data-[active]:scale-[var(--nx-drawer-indent-scale)] data-[active]:rounded-[var(--nx-drawer-indent-radius)]",
)

export const drawerBackdropVariants = cva(
  [
    "fixed inset-0 z-[var(--nx-drawer-backdrop-z-index)] bg-[var(--nx-drawer-backdrop-background)] opacity-[var(--nx-drawer-backdrop-opacity)]",
    "transition-opacity duration-[var(--nx-drawer-transition-duration)] ease-[var(--nx-drawer-transition-easing)]",
    "data-[starting-style]:opacity-0 data-[ending-style]:opacity-0",
  ].join(" "),
)

export const drawerViewportVariants = cva(
  "fixed inset-0 z-[var(--nx-drawer-viewport-z-index)] flex overflow-hidden p-[var(--nx-drawer-viewport-padding)]",
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
    "relative flex bg-[var(--nx-drawer-popup-background)] text-[var(--nx-drawer-popup-foreground)] shadow-[var(--nx-drawer-popup-shadow)] outline-none",
    "border border-[var(--nx-drawer-popup-border-color)] transition-[opacity,transform] duration-[calc(var(--nx-drawer-transition-duration)*var(--drawer-swipe-strength,1))] ease-[var(--nx-drawer-transition-easing)]",
    "data-[swiping]:transition-none",
  ].join(" "),
  {
    variants: {
      side: {
        bottom:
          "max-h-[calc(100dvh-(var(--nx-drawer-viewport-padding)*2))] w-[min(calc(100vw-(var(--nx-drawer-viewport-padding)*2)),var(--nx-drawer-popup-max-width))] translate-y-[calc(var(--drawer-snap-point-offset,0px)+var(--drawer-swipe-movement-y,0px))] rounded-t-[var(--nx-drawer-popup-radius)] data-[ending-style]:translate-y-full data-[starting-style]:translate-y-full",
        top: "max-h-[calc(100dvh-(var(--nx-drawer-viewport-padding)*2))] w-[min(calc(100vw-(var(--nx-drawer-viewport-padding)*2)),var(--nx-drawer-popup-max-width))] translate-y-[var(--drawer-swipe-movement-y,0px)] rounded-b-[var(--nx-drawer-popup-radius)] data-[ending-style]:-translate-y-full data-[starting-style]:-translate-y-full",
        right:
          "h-full max-w-[calc(100vw-(var(--nx-drawer-viewport-padding)*2))] translate-x-[var(--drawer-swipe-movement-x,0px)] rounded-l-[var(--nx-drawer-popup-radius)] data-[ending-style]:translate-x-full data-[starting-style]:translate-x-full",
        left: "h-full max-w-[calc(100vw-(var(--nx-drawer-viewport-padding)*2))] translate-x-[var(--drawer-swipe-movement-x,0px)] rounded-r-[var(--nx-drawer-popup-radius)] data-[ending-style]:-translate-x-full data-[starting-style]:-translate-x-full",
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
        className: "min-h-[var(--nx-drawer-popup-height-sm)]",
      },
      {
        side: ["bottom", "top"],
        size: "md",
        className: "min-h-[var(--nx-drawer-popup-height-md)]",
      },
      {
        side: ["bottom", "top"],
        size: "lg",
        className: "min-h-[var(--nx-drawer-popup-height-lg)]",
      },
      {
        side: ["bottom", "top"],
        size: "full",
        className: "min-h-[calc(100dvh-(var(--nx-drawer-viewport-padding)*2))]",
      },
      {
        side: ["left", "right"],
        size: "sm",
        className: "w-[var(--nx-drawer-popup-width-sm)]",
      },
      {
        side: ["left", "right"],
        size: "md",
        className: "w-[var(--nx-drawer-popup-width-md)]",
      },
      {
        side: ["left", "right"],
        size: "lg",
        className: "w-[var(--nx-drawer-popup-width-lg)]",
      },
      {
        side: ["left", "right"],
        size: "full",
        className: "w-[calc(100vw-(var(--nx-drawer-viewport-padding)*2))]",
      },
    ],
    defaultVariants: {
      side: "bottom",
      size: "md",
    },
  },
)

export const drawerContentVariants = cva(
  "grid flex-1 content-start gap-[var(--nx-drawer-content-gap)] overflow-auto p-[var(--nx-drawer-content-padding)]",
)

export const drawerHandleVariants = cva(
  "mx-auto mt-[var(--nx-drawer-handle-margin-top)] h-[var(--nx-drawer-handle-height)] w-[var(--nx-drawer-handle-width)] shrink-0 rounded-[var(--nx-drawer-handle-radius)] bg-[var(--nx-drawer-handle-background)]",
)

export const drawerSwipeAreaVariants = cva(
  "fixed z-30 data-[disabled]:pointer-events-none data-[disabled]:opacity-0",
  {
    variants: {
      side: {
        bottom: "inset-x-0 bottom-0 h-[var(--nx-drawer-swipe-area-size)]",
        top: "inset-x-0 top-0 h-[var(--nx-drawer-swipe-area-size)]",
        right: "inset-y-0 right-0 w-[var(--nx-drawer-swipe-area-size)]",
        left: "inset-y-0 left-0 w-[var(--nx-drawer-swipe-area-size)]",
      },
    },
    defaultVariants: {
      side: "bottom",
    },
  },
)

export const drawerTitleVariants = cva(
  "pr-[var(--nx-drawer-title-padding-end)] text-[length:var(--nx-drawer-title-font-size)] font-[var(--nx-drawer-title-font-weight)] leading-[var(--nx-drawer-title-font-line-height)] text-[var(--nx-drawer-title-foreground)]",
)

export const drawerDescriptionVariants = cva(
  "text-[length:var(--nx-drawer-description-font-size)] font-[var(--nx-drawer-description-font-weight)] leading-[var(--nx-drawer-description-font-line-height)] text-[var(--nx-drawer-description-foreground)]",
)

export const drawerCloseVariants = cva(
  [
    "absolute right-[var(--nx-drawer-close-inset)] top-[var(--nx-drawer-close-inset)] inline-flex size-[var(--nx-drawer-close-size)] items-center justify-center rounded-[var(--nx-drawer-close-radius)]",
    "text-[var(--nx-drawer-close-foreground)] outline-none transition-colors duration-[var(--nx-drawer-transition-duration)] ease-[var(--nx-drawer-transition-easing)]",
    "hover:bg-[var(--nx-drawer-close-hover-background)] focus-visible:ring-2 focus-visible:ring-[var(--nx-drawer-focus-ring-color)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--nx-drawer-focus-ring-offset-color)]",
    "disabled:cursor-not-allowed disabled:opacity-50 data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50",
  ].join(" "),
)
