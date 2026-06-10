/**
 * Pagination.variants.ts
 *
 * Defines visual variants using class composition.
 */

import { cva } from "class-variance-authority";
import { disabledStateClasses } from "../../../utils/cn";

export const paginationRootVariants = cva("mx-auto flex w-full justify-center");

export const paginationContentVariants = cva(
  "flex flex-row flex-wrap items-center gap-(--lex-pagination-gap)",
);

export const paginationItemVariants = cva("inline-flex items-center");

export const paginationLinkVariants = cva(
  [
    "inline-flex items-center justify-center border border-(--lex-pagination-link-border-color) bg-(--lex-pagination-link-background)",
    "text-(--lex-pagination-link-foreground) transition-colors duration-(--lex-pagination-transition-duration) ease-(--lex-pagination-transition-easing)",
    "rounded-(--lex-pagination-link-radius) font-(--lex-pagination-link-font-weight) leading-(--lex-pagination-link-font-line-height)",
    "outline-none hover:bg-(--lex-pagination-link-hover-background)",
    "focus-visible:ring-(length:--lex-pagination-focus-ring-width) focus-visible:ring-(--lex-pagination-focus-ring-color) focus-visible:ring-offset-(length:--lex-pagination-focus-ring-offset) focus-visible:ring-offset-(--lex-pagination-focus-ring-offset-color)",
    disabledStateClasses,
  ].join(" "),
  {
    variants: {
      isActive: {
        true: "border-(--lex-pagination-link-active-background) bg-(--lex-pagination-link-active-background) text-(--lex-pagination-link-active-foreground) hover:bg-(--lex-pagination-link-active-background)",
        false: "",
      },
      size: {
        sm: "h-(--lex-pagination-link-height-sm) min-w-(--lex-pagination-link-height-sm) px-(--lex-pagination-link-padding-x-sm) text-(length:--lex-pagination-link-font-size-sm)",
        md: "h-(--lex-pagination-link-height-md) min-w-(--lex-pagination-link-height-md) px-(--lex-pagination-link-padding-x-md) text-(length:--lex-pagination-link-font-size-md)",
      },
    },
    defaultVariants: {
      isActive: false,
      size: "md",
    },
  },
);

export const paginationEllipsisVariants = cva(
  "inline-flex h-(--lex-pagination-ellipsis-size) w-(--lex-pagination-ellipsis-size) items-center justify-center text-(--lex-pagination-ellipsis-foreground)",
);
