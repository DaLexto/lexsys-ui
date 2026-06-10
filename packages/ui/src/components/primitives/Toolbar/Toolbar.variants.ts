/**
 * Toolbar.variants.ts
 *
 * Defines visual variants using class composition.
 */

import { cva } from "class-variance-authority";
import { disabledStateClasses } from "../../../utils/cn";

export const toolbarRootVariants = cva(
  "flex items-center gap-(--lex-toolbar-root-gap) rounded-(--lex-toolbar-radius) border border-(--lex-toolbar-root-border-color) bg-(--lex-toolbar-root-background) p-(--lex-toolbar-root-padding)",
  {
    variants: {
      orientation: {
        horizontal: "flex-row",
        vertical: "flex-col",
      },
    },
    defaultVariants: {
      orientation: "horizontal",
    },
  },
);

export const toolbarGroupVariants = cva(
  "flex items-center gap-(--lex-toolbar-group-gap)",
  {
    variants: {
      orientation: {
        horizontal: "flex-row",
        vertical: "flex-col",
      },
    },
    defaultVariants: {
      orientation: "horizontal",
    },
  },
);

export const toolbarButtonVariants = cva(
  [
    "inline-flex h-(--lex-toolbar-button-height) items-center justify-center rounded-(--lex-toolbar-radius) border border-transparent px-(--lex-toolbar-button-padding-x)",
    "text-(length:--lex-toolbar-button-font-size) font-(--lex-toolbar-button-font-weight) leading-(--lex-toolbar-button-font-line-height) text-(--lex-toolbar-button-foreground)",
    "transition-colors duration-(--lex-toolbar-transition-duration) ease-(--lex-toolbar-transition-easing)",
    "outline-none hover:bg-(--lex-toolbar-button-hover-background) focus-visible:ring-(length:--lex-toolbar-button-focus-ring-width) focus-visible:ring-(--lex-toolbar-button-focus-ring-color) focus-visible:ring-offset-(length:--lex-toolbar-button-focus-ring-offset) focus-visible:ring-offset-(--lex-toolbar-button-focus-ring-offset-color)",
    disabledStateClasses,
  ].join(" "),
);

export const toolbarLinkVariants = cva(
  [
    "inline-flex h-(--lex-toolbar-link-height) items-center justify-center rounded-(--lex-toolbar-radius) px-(--lex-toolbar-link-padding-x)",
    "text-(length:--lex-toolbar-link-font-size) font-(--lex-toolbar-link-font-weight) leading-(--lex-toolbar-link-font-line-height) text-(--lex-toolbar-link-foreground)",
    "transition-colors duration-(--lex-toolbar-transition-duration) ease-(--lex-toolbar-transition-easing)",
    "outline-none hover:bg-(--lex-toolbar-link-hover-background) focus-visible:ring-(length:--lex-toolbar-link-focus-ring-width) focus-visible:ring-(--lex-toolbar-link-focus-ring-color) focus-visible:ring-offset-(length:--lex-toolbar-link-focus-ring-offset) focus-visible:ring-offset-(--lex-toolbar-link-focus-ring-offset-color)",
    disabledStateClasses,
  ].join(" "),
);

export const toolbarInputVariants = cva(
  [
    "h-(--lex-toolbar-input-height) min-w-0 rounded-(--lex-toolbar-input-radius) border border-(--lex-toolbar-input-border-color) bg-(--lex-toolbar-input-background) px-(--lex-toolbar-input-padding-x)",
    "text-(length:--lex-toolbar-input-font-size) font-(family-name:--lex-toolbar-input-font-family) font-(--lex-toolbar-input-font-weight) leading-(--lex-toolbar-input-font-line-height) text-(--lex-toolbar-input-foreground)",
    "placeholder:text-(--lex-toolbar-input-placeholder-color)",
    "transition-colors duration-(--lex-toolbar-transition-duration) ease-(--lex-toolbar-transition-easing)",
    "outline-none focus-visible:border-(--lex-toolbar-input-focus-border-color) focus-visible:ring-(length:--lex-toolbar-input-focus-ring-width) focus-visible:ring-(--lex-toolbar-input-focus-ring-color) focus-visible:ring-offset-(length:--lex-toolbar-input-focus-ring-offset) focus-visible:ring-offset-(--lex-toolbar-input-focus-ring-offset-color)",
    disabledStateClasses,
  ].join(" "),
);

export const toolbarSeparatorVariants = cva(
  "shrink-0 bg-(--lex-separator-color)",
  {
    variants: {
      orientation: {
        horizontal:
          "mx-(--lex-toolbar-separator-margin) h-(--lex-separator-thickness) w-full",
        vertical:
          "my-(--lex-toolbar-separator-margin) h-full w-(--lex-separator-thickness)",
      },
    },
    defaultVariants: {
      orientation: "vertical",
    },
  },
);
