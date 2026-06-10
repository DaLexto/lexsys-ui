import type { Ref } from "react";
/**
 * ButtonLink.types.ts
 *
 * Public types for ButtonLink — button chrome on anchor or custom link hosts.
 */

import type { ButtonProps } from "../Button/Button.types";

export interface ButtonLinkProps extends Omit<
  ButtonProps,
  "type" | "nativeButton" | "render" | "ref"
> {
  ref?: Ref<HTMLAnchorElement>;
  href: string;
  /** Override host element (e.g. Next.js `Link`). Must include `href`. */
  render?: ButtonProps["render"];
}
