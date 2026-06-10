/**
 * Breadcrumb.variants.ts
 *
 * Defines visual variants using class composition.
 */

import { cva } from "class-variance-authority";

export const breadcrumbRootVariants = cva("w-full");

export const breadcrumbListVariants = cva(
  "flex flex-wrap items-center gap-(--lex-breadcrumb-list-gap) break-words text-(length:--lex-breadcrumb-link-font-size) leading-(--lex-breadcrumb-link-font-line-height)",
);

export const breadcrumbItemVariants = cva(
  "inline-flex items-center gap-(--lex-breadcrumb-item-gap)",
);

export const breadcrumbLinkVariants = cva(
  [
    "text-(--lex-breadcrumb-link-foreground) font-(--lex-breadcrumb-link-font-weight) transition-colors duration-(--lex-breadcrumb-transition-duration) ease-(--lex-breadcrumb-transition-easing)",
    "hover:text-(--lex-breadcrumb-link-hover-foreground)",
    "outline-none focus-visible:underline",
  ].join(" "),
);

export const breadcrumbPageVariants = cva(
  "font-(--lex-breadcrumb-page-font-weight) text-(--lex-breadcrumb-page-foreground)",
);

export const breadcrumbSeparatorVariants = cva(
  "inline-flex items-center text-(--lex-breadcrumb-separator-foreground)",
);

export const breadcrumbEllipsisVariants = cva(
  "inline-flex h-(--lex-breadcrumb-ellipsis-size) w-(--lex-breadcrumb-ellipsis-size) items-center justify-center text-(--lex-breadcrumb-ellipsis-foreground)",
);
